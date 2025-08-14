#!/usr/bin/env node

/**
 * Browser Tools MCP 服务器启动脚本
 * 用于启动和管理 Qwen3-Coder 项目的浏览器工具服务器
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// 配置文件路径
const CONFIG_PATH = path.join(__dirname, 'browser-tools-config.json');
const LOG_DIR = path.join(__dirname, 'logs');

/**
 * 确保日志目录存在
 */
function ensureLogDirectory() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
    console.log('✅ 日志目录已创建:', LOG_DIR);
  }
}

/**
 * 确保截图目录存在
 */
function ensureScreenshotDirectory() {
  const screenshotDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
    console.log('✅ 截图目录已创建:', screenshotDir);
  }
}

/**
 * 读取配置文件
 */
function loadConfig() {
  try {
    const configData = fs.readFileSync(CONFIG_PATH, 'utf8');
    return JSON.parse(configData);
  } catch (error) {
    console.error('❌ 无法读取配置文件:', error.message);
    process.exit(1);
  }
}

/**
 * 检查端口是否可用
 */
function checkPort(port) {
  return new Promise((resolve) => {
    const net = require('net');
    const server = net.createServer();
    
    server.listen(port, () => {
      server.once('close', () => resolve(true));
      server.close();
    });
    
    server.on('error', () => resolve(false));
  });
}

/**
 * 启动 Browser Tools MCP 服务器
 */
async function startBrowserToolsServer() {
  console.log('🚀 启动 Browser Tools MCP 服务器...');
  
  // 确保必要目录存在
  ensureLogDirectory();
  ensureScreenshotDirectory();
  
  // 加载配置
  const config = loadConfig();
  console.log('📋 配置文件已加载:', CONFIG_PATH);
  
  // 检查端口可用性
  const portAvailable = await checkPort(config.server.port);
  if (!portAvailable) {
    console.error(`❌ 端口 ${config.server.port} 已被占用`);
    process.exit(1);
  }
  
  // 设置环境变量
  const env = {
    ...process.env,
    BROWSER_TOOLS_CONFIG_PATH: CONFIG_PATH,
    BROWSER_TOOLS_LOG_LEVEL: config.logging.level,
    BROWSER_TOOLS_PORT: config.server.port.toString(),
    BROWSER_TOOLS_HOST: config.server.host,
    PUPPETEER_EXECUTABLE_PATH: process.env.PUPPETEER_EXECUTABLE_PATH || ''
  };
  
  // 启动 Browser Tools MCP 服务器
  const browserToolsProcess = spawn('npx', ['browser-tools-mcp', '--config', CONFIG_PATH], {
    env,
    stdio: ['inherit', 'pipe', 'pipe'],
    cwd: __dirname
  });
  
  // 处理输出
  browserToolsProcess.stdout.on('data', (data) => {
    const message = data.toString().trim();
    console.log('🔧 Browser Tools:', message);
    
    // 写入日志文件
    if (config.logging.file.enabled) {
      const logFile = path.join(LOG_DIR, 'browser-tools.log');
      const timestamp = new Date().toISOString();
      fs.appendFileSync(logFile, `[${timestamp}] ${message}\n`);
    }
  });
  
  browserToolsProcess.stderr.on('data', (data) => {
    const error = data.toString().trim();
    console.error('❌ Browser Tools Error:', error);
    
    // 写入错误日志
    if (config.logging.file.enabled) {
      const logFile = path.join(LOG_DIR, 'browser-tools-error.log');
      const timestamp = new Date().toISOString();
      fs.appendFileSync(logFile, `[${timestamp}] ${error}\n`);
    }
  });
  
  browserToolsProcess.on('close', (code) => {
    if (code === 0) {
      console.log('✅ Browser Tools 服务器正常关闭');
    } else {
      console.error(`❌ Browser Tools 服务器异常退出，退出码: ${code}`);
    }
  });
  
  browserToolsProcess.on('error', (error) => {
    console.error('❌ 启动 Browser Tools 服务器失败:', error.message);
    process.exit(1);
  });
  
  // 优雅关闭处理
  process.on('SIGINT', () => {
    console.log('\n🛑 正在关闭 Browser Tools 服务器...');
    browserToolsProcess.kill('SIGTERM');
    setTimeout(() => {
      browserToolsProcess.kill('SIGKILL');
      process.exit(0);
    }, 5000);
  });
  
  process.on('SIGTERM', () => {
    console.log('🛑 收到终止信号，关闭 Browser Tools 服务器...');
    browserToolsProcess.kill('SIGTERM');
  });
  
  console.log(`✅ Browser Tools MCP 服务器已启动`);
  console.log(`📍 服务地址: http://${config.server.host}:${config.server.port}`);
  console.log(`🎯 测试目标: ${config.tools.testing.baseUrl}`);
  console.log(`📝 日志目录: ${LOG_DIR}`);
  console.log(`📸 截图目录: ${path.join(__dirname, 'screenshots')}`);
  console.log('\n可用功能:');
  console.log('  🔍 网页抓取 (Web Scraping)');
  console.log('  🤖 浏览器自动化 (Browser Automation)');
  console.log('  📸 截图功能 (Screenshots)');
  console.log('  📄 PDF 生成 (PDF Generation)');
  console.log('  🧪 自动化测试 (Automated Testing)');
  console.log('\n按 Ctrl+C 停止服务器');
}

/**
 * 显示帮助信息
 */
function showHelp() {
  console.log(`
🔧 Browser Tools MCP 服务器管理工具

使用方法:
  node start-browser-tools.js [选项]

选项:
  --help, -h     显示帮助信息
  --config, -c   指定配置文件路径
  --port, -p     指定服务器端口
  --headless     启用无头模式
  --debug        启用调试模式

示例:
  node start-browser-tools.js
  node start-browser-tools.js --port 3335
  node start-browser-tools.js --debug
`);
}

// 解析命令行参数
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  showHelp();
  process.exit(0);
}

// 启动服务器
startBrowserToolsServer().catch((error) => {
  console.error('❌ 启动失败:', error.message);
  process.exit(1);
});