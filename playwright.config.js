/**
 * Playwright 测试配置文件/**
 * 为 Nano Banana AI 项目配置浏览器自动化测试
 */

const { defineConfig, devices } = require('@playwright/test');
const path = require('path');

/**
 * 环境配置
 */
const TEST_ENV = process.env.TEST_ENV || 'local';
const CI = !!process.env.CI;

// 基础 URL 配置
const BASE_URLS = {
  local: 'http://localhost:3002',
  staging: 'https://nano-banana-ai-staging.vercel.app',
  production: 'https://nano-banana-ai.vercel.app'
};

module.exports = defineConfig({
  // 测试目录
  testDir: './',
  
  // 测试文件匹配模式
  testMatch: '**/playwright-tests.spec.js',
  
  // 全局超时设置
  timeout: 30000,
  
  // 期望超时
  expect: {
    timeout: 5000
  },
  
  // 失败时的重试次数
  retries: CI ? 2 : 1,
  
  // 并行工作进程数
  workers: CI ? 2 : undefined,
  
  // 报告器配置
  reporter: [
    ['html', { outputFolder: 'logs/playwright-report' }],
    ['json', { outputFile: 'logs/test-results.json' }],
    ['junit', { outputFile: 'logs/test-results.xml' }],
    ['list']
  ],
  
  // 全局设置
  use: {
    // 基础 URL
    baseURL: 'http://localhost:3001',
    
    // 浏览器上下文选项
    viewport: { width: 1280, height: 720 },
    
    // 忽略 HTTPS 错误
    ignoreHTTPSErrors: true,
    
    // 截图设置
    screenshot: 'only-on-failure',
    
    // 视频录制
    video: 'retain-on-failure',
    
    // 追踪设置
    trace: 'retain-on-failure',
    
    // 操作超时
    actionTimeout: 10000,
    
    // 导航超时
    navigationTimeout: 30000,
    
    // 用户代理
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Playwright-Test'
  },
  
  // 输出目录
  outputDir: 'logs/test-results',
  
  // 项目配置 - 不同浏览器和设备组合
  projects: [
    // 桌面浏览器测试
    {
      name: 'chromium-desktop',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 }
      },
    },
    // 暂时禁用 Firefox 和 WebKit，因为浏览器未安装
    // {
    //   name: 'firefox-desktop',
    //   use: { 
    //     ...devices['Desktop Firefox'],
    //     viewport: { width: 1920, height: 1080 }
    //   },
    // },
    // {
    //   name: 'webkit-desktop',
    //   use: { 
    //     ...devices['Desktop Safari'],
    //     viewport: { width: 1920, height: 1080 }
    //   },
    // },
    
    // 平板设备测试
    {
      name: 'tablet-portrait',
      use: {
        ...devices['iPad Pro'],
        viewport: { width: 768, height: 1024 }
      },
    },
    {
      name: 'tablet-landscape',
      use: {
        ...devices['iPad Pro landscape'],
        viewport: { width: 1024, height: 768 }
      },
    },
    
    // 移动设备测试
    {
      name: 'mobile-chrome',
      use: {
        ...devices['Pixel 5'],
        viewport: { width: 375, height: 667 }
      },
    },
    // 暂时禁用 Safari 移动端
    // {
    //   name: 'mobile-safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //     viewport: { width: 375, height: 667 }
    //   },
    // },
    
    // 高分辨率显示器测试
    {
      name: 'high-dpi',
      use: {
        ...devices['Desktop Chrome HiDPI'],
        viewport: { width: 1920, height: 1080 },
        deviceScaleFactor: 2
      },
    }
  ],
  
  // Web 服务器配置（用于本地测试）
  webServer: TEST_ENV === 'local' ? {
    command: 'cd frontend && npm run preview',
    port: 3002,
    timeout: 120000,
    reuseExistingServer: !CI,
    stdout: 'pipe',
    stderr: 'pipe'
  } : undefined,
  
  // 全局设置和拆卸
  globalSetup: path.join(__dirname, 'tests/global-setup.js'),
  globalTeardown: path.join(__dirname, 'tests/global-teardown.js'),
  
  // 测试匹配忽略
  testIgnore: [
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**'
  ],
  
  // 元数据
  metadata: {
    project: 'Nano Banana AI',
    environment: TEST_ENV,
    ci: CI,
    timestamp: new Date().toISOString()
  },
  
  // 实验性功能
  experimentalCTSupportMode: 'service'
});