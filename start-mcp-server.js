#!/usr/bin/env node

/**
 * Browser MCP 服务器启动脚本
 * 用于启动和管理 Qwen3-Coder 项目的浏览器自动化测试服务器
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// 配置文件路径
const CONFIG_PATH = path.join(__dirname, '../mcp-server-config.json');
const LOG_DIR = path.join(__dirname, '../logs');

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
 * 启动 MCP 服务器
 */
async function startMCPServer() {
  console.log('🚀 启动 Browser MCP 服务器...');
  
  // 确保日志目录存在
  ensureLogDirectory();
  
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
    MCP_CONFIG_PATH: CONFIG_PATH,
    MCP_LOG_LEVEL: config.logging.level,
    MCP_PORT: config.server.port.toString(),
    PLAYWRIGHT_BROWSERS_PATH: path.join(__dirname, '../node_modules/playwright')
  };
  
  // 启动 MCP 服务器
  const mcpProcess = spawn('npx', ['@browsermcp/mcp'], {
    env,
    stdio: ['inherit', 'pipe', 'pipe'],
    cwd: path.join(__dirname, '..')
  });
  
  // 处理输出
  mcpProcess.stdout.on('data', (data) => {
    const message = data.toString().trim();
    console.log('📡 MCP:', message);
    
    // 写入日志文件
    if (config.logging.file.enabled) {
      const logFile = path.join(LOG_DIR, 'mcp-server.log');
      const timestamp = new Date().toISOString();
      fs.appendFileSync(logFile, `[${timestamp}] ${message}\n`);
    }
  });
  
  mcpProcess.stderr.on('data', (data) => {
    const error = data.toString().trim();
    console.error('❌ MCP Error:', error);
    
    // 写入错误日志
    if (config.logging.file.enabled) {
      const logFile = path.join(LOG_DIR, 'mcp-error.log');
      const timestamp = new Date().toISOString();
      fs.appendFileSync(logFile, `[${timestamp}] ${error}\n`);
    }
  });
  
  mcpProcess.on('close', (code) => {
    if (code === 0) {
      console.log('✅ MCP 服务器正常关闭');
    } else {
      console.error(`❌ MCP 服务器异常退出，退出码: ${code}`);
    }
  });
  
  mcpProcess.on('error', (error) => {
    console.error('❌ 启动 MCP 服务器失败:', error.message);
    process.exit(1);
  });
  
  // 优雅关闭处理
  process.on('SIGINT', () => {
    console.log('\n🛑 正在关闭 MCP 服务器...');
    mcpProcess.kill('SIGTERM');
    setTimeout(() => {
      mcpProcess.kill('SIGKILL');
      process.exit(0);
    }, 5000);
  });
  
  process.on('SIGTERM', () => {
    console.log('🛑 收到终止信号，关闭 MCP 服务器...');
    mcpProcess.kill('SIGTERM');
  });
  
  console.log(`✅ MCP 服务器已启动`);
  console.log(`📍 服务地址: http://${config.server.host}:${config.server.port}`);
  console.log(`📊 测试目标: ${config.testing.baseUrl}`);
  console.log(`📝 日志目录: ${LOG_DIR}`);
  console.log('\n按 Ctrl+C 停止服务器');
}

/**
 * 显示帮助信息
 */
function showHelp() {
  console.log(`
🔧 Browser MCP 服务器管理工具

使用方法:
  node start-mcp-server.js [选项]

选项:
  --help, -h     显示帮助信息
  --config, -c   指定配置文件路径
  --port, -p     指定服务器端口
  --headless     启用无头模式
  --debug        启用调试模式

示例:
  node start-mcp-server.js
  node start-mcp-server.js --port 3334
  node start-mcp-server.js --debug
`);
}

// 解析命令行参数
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h')) {
  showHelp();
  process.exit(0);
}

// 启动服务器
startMCPServer().catch((error) => {
  console.error('❌ 启动失败:', error.message);
  process.exit(1);
});