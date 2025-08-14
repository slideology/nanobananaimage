/**
 * Browser MCP 设置验证脚本
 * 验证所有配置文件和依赖是否正确安装
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * 验证项目
 */
class SetupVerifier {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.success = [];
  }

  /**
   * 运行所有验证
   */
  async runAllChecks() {
    console.log('🔍 开始验证 Browser MCP 设置...');
    console.log('=' .repeat(50));

    this.checkFiles();
    this.checkDependencies();
    this.checkDirectories();
    this.checkScripts();
    await this.checkPlaywright();
    this.checkMCPServer();

    this.printResults();
    return this.errors.length === 0;
  }

  /**
   * 检查必要文件
   */
  checkFiles() {
    console.log('📁 检查配置文件...');
    
    const requiredFiles = [
      'mcp-server-config.json',
      'start-mcp-server.js',
      'browser-tests.js',
      'test-config.json',
      'playwright.config.js',
      'playwright-tests.spec.js',
      '.lighthouserc.json',
      '.github/workflows/browser-tests.yml',
      'tests/global-setup.js',
      'tests/global-teardown.js'
    ];

    requiredFiles.forEach(file => {
      if (fs.existsSync(file)) {
        this.success.push(`✅ ${file}`);
      } else {
        this.errors.push(`❌ 缺少文件: ${file}`);
      }
    });
  }

  /**
   * 检查依赖
   */
  checkDependencies() {
    console.log('📦 检查依赖包...');
    
    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      const allDeps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies
      };

      const requiredDeps = [
        '@browsermcp/mcp',
        '@playwright/test'
      ];

      requiredDeps.forEach(dep => {
        if (allDeps[dep]) {
          this.success.push(`✅ ${dep}: ${allDeps[dep]}`);
        } else {
          this.errors.push(`❌ 缺少依赖: ${dep}`);
        }
      });

      // 检查脚本
      const requiredScripts = [
        'mcp:start',
        'mcp:test',
        'test:browser',
        'test:all'
      ];

      requiredScripts.forEach(script => {
        if (packageJson.scripts && packageJson.scripts[script]) {
          this.success.push(`✅ 脚本: ${script}`);
        } else {
          this.warnings.push(`⚠️  缺少脚本: ${script}`);
        }
      });

    } catch (error) {
      this.errors.push(`❌ 读取 package.json 失败: ${error.message}`);
    }
  }

  /**
   * 检查目录结构
   */
  checkDirectories() {
    console.log('📂 检查目录结构...');
    
    const requiredDirs = [
      'tests',
      '.github/workflows'
    ];

    requiredDirs.forEach(dir => {
      if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
        this.success.push(`✅ 目录: ${dir}`);
      } else {
        this.errors.push(`❌ 缺少目录: ${dir}`);
      }
    });

    // 检查日志目录是否可创建
    const logsDir = 'logs';
    try {
      if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir, { recursive: true });
      }
      this.success.push(`✅ 日志目录: ${logsDir}`);
    } catch (error) {
      this.errors.push(`❌ 无法创建日志目录: ${error.message}`);
    }
  }

  /**
   * 检查脚本可执行性
   */
  checkScripts() {
    console.log('🔧 检查脚本可执行性...');
    
    const scripts = [
      'start-mcp-server.js',
      'browser-tests.js'
    ];

    scripts.forEach(script => {
      try {
        const content = fs.readFileSync(script, 'utf8');
        if (content.includes('module.exports') || content.includes('async function')) {
          this.success.push(`✅ 脚本格式: ${script}`);
        } else {
          this.warnings.push(`⚠️  脚本格式可能有问题: ${script}`);
        }
      } catch (error) {
        this.errors.push(`❌ 读取脚本失败: ${script}`);
      }
    });
  }

  /**
   * 检查 Playwright
   */
  async checkPlaywright() {
    console.log('🎭 检查 Playwright...');
    
    try {
      // 检查 Playwright 是否安装
      execSync('npx playwright --version', { stdio: 'pipe' });
      this.success.push('✅ Playwright CLI 可用');

      // 检查浏览器
      try {
        const result = execSync('npx playwright install --dry-run', { stdio: 'pipe', encoding: 'utf8' });
        if (result.includes('chromium')) {
          this.success.push('✅ Chromium 浏览器已安装');
        } else {
          this.warnings.push('⚠️  Chromium 浏览器可能未安装');
        }
      } catch (error) {
        this.warnings.push('⚠️  无法检查浏览器安装状态');
      }

    } catch (error) {
      this.errors.push('❌ Playwright 未正确安装');
    }
  }

  /**
   * 检查 MCP 服务器
   */
  checkMCPServer() {
    console.log('🖥️  检查 MCP 服务器...');
    
    try {
      // 检查配置文件格式
      const config = JSON.parse(fs.readFileSync('mcp-server-config.json', 'utf8'));
      if (config.server && config.browser && config.testing) {
        this.success.push('✅ MCP 服务器配置格式正确');
      } else {
        this.warnings.push('⚠️  MCP 服务器配置可能不完整');
      }

      // 检查 @browsermcp/mcp 是否可执行
      try {
        execSync('npx @browsermcp/mcp --help', { stdio: 'pipe' });
        this.success.push('✅ @browsermcp/mcp 可执行');
      } catch (error) {
        this.warnings.push('⚠️  @browsermcp/mcp 可能无法执行');
      }

    } catch (error) {
      this.errors.push(`❌ MCP 服务器配置错误: ${error.message}`);
    }
  }

  /**
   * 打印结果
   */
  printResults() {
    console.log('\n' + '=' .repeat(50));
    console.log('📊 验证结果汇总');
    console.log('=' .repeat(50));

    if (this.success.length > 0) {
      console.log('\n🎉 成功项目:');
      this.success.forEach(item => console.log(`  ${item}`));
    }

    if (this.warnings.length > 0) {
      console.log('\n⚠️  警告项目:');
      this.warnings.forEach(item => console.log(`  ${item}`));
    }

    if (this.errors.length > 0) {
      console.log('\n❌ 错误项目:');
      this.errors.forEach(item => console.log(`  ${item}`));
    }

    console.log('\n' + '=' .repeat(50));
    
    if (this.errors.length === 0) {
      console.log('🎊 恭喜！Browser MCP 设置验证通过！');
      console.log('\n📋 下一步操作:');
      console.log('  1. 运行: npm run mcp:start (启动 MCP 服务器)');
      console.log('  2. 运行: npm run test:browser (执行浏览器测试)');
      console.log('  3. 查看: logs/ 目录中的测试结果');
    } else {
      console.log('💥 设置验证失败，请修复上述错误后重试。');
      process.exit(1);
    }
  }
}

// 运行验证
if (require.main === module) {
  const verifier = new SetupVerifier();
  verifier.runAllChecks().catch(error => {
    console.error('验证过程出错:', error);
    process.exit(1);
  });
}

module.exports = SetupVerifier;