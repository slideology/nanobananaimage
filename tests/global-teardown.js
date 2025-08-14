/**
 * Playwright 全局拆卸
 * 在所有测试完成后执行的清理操作
 */

const fs = require('fs');
const path = require('path');

/**
 * 全局拆卸函数
 */
async function globalTeardown(config) {
  console.log('🧹 开始全局测试清理...');
  
  const logsDir = path.join(process.cwd(), 'logs');
  
  try {
    // 读取测试会话信息
    const sessionPath = path.join(logsDir, 'test-session.json');
    let testSession = {};
    
    if (fs.existsSync(sessionPath)) {
      testSession = JSON.parse(fs.readFileSync(sessionPath, 'utf8'));
    }
    
    // 更新测试会话信息
    testSession.endTime = new Date().toISOString();
    testSession.duration = testSession.startTime ? 
      new Date(testSession.endTime) - new Date(testSession.startTime) : 0;
    
    // 收集测试结果统计
    const testResultsPath = path.join(logsDir, 'test-results.json');
    let testResults = {};
    
    if (fs.existsSync(testResultsPath)) {
      testResults = JSON.parse(fs.readFileSync(testResultsPath, 'utf8'));
    }
    
    // 生成测试摘要
    const summary = {
      session: testSession,
      results: testResults,
      artifacts: {
        screenshots: countFiles(path.join(logsDir, 'screenshots')),
        videos: countFiles(path.join(logsDir, 'videos')),
        traces: countFiles(path.join(logsDir, 'traces')),
        reports: fs.existsSync(path.join(logsDir, 'playwright-report'))
      },
      timestamp: new Date().toISOString()
    };
    
    // 保存测试摘要
    fs.writeFileSync(
      path.join(logsDir, 'test-summary.json'),
      JSON.stringify(summary, null, 2)
    );
    
    // 生成简化的测试报告
    generateSimpleReport(summary, logsDir);
    
    // 清理临时文件
    cleanupTempFiles(logsDir);
    
    console.log('✅ 全局清理完成');
    console.log(`⏱️  测试耗时: ${formatDuration(testSession.duration)}`);
    console.log(`📊 测试摘要已保存: ${path.join(logsDir, 'test-summary.json')}`);
    
  } catch (error) {
    console.error('❌ 全局清理失败:', error.message);
  }
}

/**
 * 统计目录中的文件数量
 */
function countFiles(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) return 0;
    return fs.readdirSync(dirPath).filter(file => {
      return fs.statSync(path.join(dirPath, file)).isFile();
    }).length;
  } catch (error) {
    return 0;
  }
}

/**
 * 生成简化的测试报告
 */
function generateSimpleReport(summary, logsDir) {
  const reportLines = [
    '# 🧪 Qwen3-Coder 浏览器测试报告',
    '',
    `**测试时间**: ${summary.session.startTime} - ${summary.session.endTime}`,
    `**测试环境**: ${summary.session.environment}`,
    `**基础URL**: ${summary.session.baseURL}`,
    `**测试耗时**: ${formatDuration(summary.session.duration)}`,
    `**CI环境**: ${summary.session.ci ? '是' : '否'}`,
    '',
    '## 📊 测试项目',
    ...(summary.session.projects || []).map(project => `- ${project}`),
    '',
    '## 🎯 测试产物',
    `- 截图数量: ${summary.artifacts.screenshots}`,
    `- 视频数量: ${summary.artifacts.videos}`,
    `- 追踪文件: ${summary.artifacts.traces}`,
    `- HTML报告: ${summary.artifacts.reports ? '已生成' : '未生成'}`,
    '',
    '## 📋 测试结果',
    summary.results.suites ? 
      `- 测试套件: ${summary.results.suites.length}` : '- 测试套件: 未知',
    summary.results.tests ? 
      `- 测试用例: ${summary.results.tests.length}` : '- 测试用例: 未知',
    '',
    '---',
    `*报告生成时间: ${summary.timestamp}*`
  ];
  
  fs.writeFileSync(
    path.join(logsDir, 'test-report.md'),
    reportLines.join('\n')
  );
}

/**
 * 清理临时文件
 */
function cleanupTempFiles(logsDir) {
  const tempFiles = [
    'test-session.json'
  ];
  
  tempFiles.forEach(file => {
    const filePath = path.join(logsDir, file);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
        console.log(`🗑️  清理临时文件: ${file}`);
      } catch (error) {
        console.warn(`⚠️  清理临时文件失败: ${file}`);
      }
    }
  });
}

/**
 * 格式化持续时间
 */
function formatDuration(ms) {
  if (!ms || ms < 0) return '未知';
  
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  if (hours > 0) {
    return `${hours}小时${minutes % 60}分钟${seconds % 60}秒`;
  } else if (minutes > 0) {
    return `${minutes}分钟${seconds % 60}秒`;
  } else {
    return `${seconds}秒`;
  }
}

module.exports = globalTeardown;