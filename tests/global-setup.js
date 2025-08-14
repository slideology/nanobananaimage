/**
 * Playwright 全局设置
 * 在所有测试开始前执行的初始化操作
 */

const fs = require('fs');
const path = require('path');

/**
 * 全局设置函数
 */
async function globalSetup(config) {
  console.log('🚀 开始全局测试设置...');
  
  // 创建必要的目录
  const directories = [
    'logs',
    'logs/screenshots',
    'logs/videos',
    'logs/traces',
    'logs/playwright-report'
  ];
  
  directories.forEach(dir => {
    const dirPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`📁 创建目录: ${dir}`);
    }
  });
  
  // 清理旧的测试结果
  const logsDir = path.join(process.cwd(), 'logs');
  if (fs.existsSync(logsDir)) {
    const files = fs.readdirSync(logsDir);
    const oldFiles = files.filter(file => {
      const filePath = path.join(logsDir, file);
      const stats = fs.statSync(filePath);
      const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      return stats.isFile() && stats.mtime < dayAgo;
    });
    
    oldFiles.forEach(file => {
      try {
        fs.unlinkSync(path.join(logsDir, file));
        console.log(`🗑️  清理旧文件: ${file}`);
      } catch (error) {
        console.warn(`⚠️  清理文件失败: ${file}`);
      }
    });
  }
  
  // 记录测试开始时间
  const testSession = {
    startTime: new Date().toISOString(),
    environment: process.env.TEST_ENV || 'local',
    baseURL: config.use?.baseURL || 'http://localhost:3002',
    projects: config.projects?.map(p => p.name) || [],
    ci: !!process.env.CI
  };
  
  fs.writeFileSync(
    path.join(logsDir, 'test-session.json'),
    JSON.stringify(testSession, null, 2)
  );
  
  console.log('✅ 全局设置完成');
  console.log(`📊 测试环境: ${testSession.environment}`);
  console.log(`🌐 基础URL: ${testSession.baseURL}`);
  console.log(`🎯 测试项目: ${testSession.projects.join(', ')}`);
}

module.exports = globalSetup;