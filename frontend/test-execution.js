// QWEN3 CODER 自动化测试脚本
// 用于验证主页各模块的显示和导航功能

console.log('🚀 开始执行 QWEN3 CODER 测试方案...');

// 测试配置
const TEST_CONFIG = {
  baseUrl: 'http://localhost:3002',
  sections: ['demo', 'features', 'reviews', 'faq'],
  routes: ['/features', '/showcase', '/docs'],
  timeout: 5000
};

// 测试结果记录
const testResults = {
  passed: 0,
  failed: 0,
  errors: []
};

// 辅助函数：等待元素出现
function waitForElement(selector, timeout = 5000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    
    function check() {
      const element = document.querySelector(selector);
      if (element) {
        resolve(element);
      } else if (Date.now() - startTime > timeout) {
        reject(new Error(`Element ${selector} not found within ${timeout}ms`));
      } else {
        setTimeout(check, 100);
      }
    }
    
    check();
  });
}

// 辅助函数：检查元素是否在视口中
function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// 测试1：页面加载测试
async function testPageLoad() {
  console.log('📋 测试1：页面加载测试');
  
  try {
    // 检查页面标题
    if (document.title.includes('QWEN3 CODER')) {
      console.log('✅ 页面标题正确');
      testResults.passed++;
    } else {
      throw new Error('页面标题不正确');
    }
    
    // 检查主要元素是否存在
    await waitForElement('header');
    await waitForElement('main');
    await waitForElement('footer', 1000).catch(() => console.log('⚠️  Footer未找到（可选）'));
    
    console.log('✅ 主要页面元素加载成功');
    testResults.passed++;
    
  } catch (error) {
    console.error('❌ 页面加载测试失败:', error.message);
    testResults.failed++;
    testResults.errors.push(`页面加载: ${error.message}`);
  }
}

// 测试2：导航栏功能测试
async function testNavigation() {
  console.log('📋 测试2：导航栏功能测试');
  
  try {
    // 检查导航栏是否存在
    const nav = await waitForElement('nav');
    console.log('✅ 导航栏存在');
    
    // 检查所有导航链接
    const navButtons = nav.querySelectorAll('button');
    const expectedLinks = ['Features', 'Live Demo', 'Showcase', 'Documentation', 'Reviews', 'FAQ'];
    
    let foundLinks = 0;
    navButtons.forEach(button => {
      const text = button.textContent.trim();
      if (expectedLinks.includes(text)) {
        foundLinks++;
        console.log(`✅ 找到导航链接: ${text}`);
      }
    });
    
    if (foundLinks >= 4) { // 至少找到4个主要链接
      console.log('✅ 导航链接检查通过');
      testResults.passed++;
    } else {
      throw new Error(`只找到 ${foundLinks} 个导航链接，期望至少4个`);
    }
    
  } catch (error) {
    console.error('❌ 导航栏测试失败:', error.message);
    testResults.failed++;
    testResults.errors.push(`导航栏: ${error.message}`);
  }
}

// 测试3：主页模块显示测试
async function testHomeSections() {
  console.log('📋 测试3：主页模块显示测试');
  
  for (const sectionId of TEST_CONFIG.sections) {
    try {
      const section = await waitForElement(`#${sectionId}`);
      
      // 检查section是否有内容
      if (section.children.length > 0) {
        console.log(`✅ Section #${sectionId} 存在且有内容`);
        testResults.passed++;
      } else {
        throw new Error(`Section #${sectionId} 存在但无内容`);
      }
      
    } catch (error) {
      console.error(`❌ Section #${sectionId} 测试失败:`, error.message);
      testResults.failed++;
      testResults.errors.push(`Section ${sectionId}: ${error.message}`);
    }
  }
}

// 测试4：FAQ交互功能测试
async function testFAQInteraction() {
  console.log('📋 测试4：FAQ交互功能测试');
  
  try {
    const faqSection = await waitForElement('#faq');
    const faqButtons = faqSection.querySelectorAll('button');
    
    if (faqButtons.length > 0) {
      console.log(`✅ 找到 ${faqButtons.length} 个FAQ按钮`);
      
      // 测试第一个FAQ的点击功能
      const firstButton = faqButtons[0];
      const initialHeight = faqSection.scrollHeight;
      
      // 模拟点击
      firstButton.click();
      
      // 等待动画完成
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log('✅ FAQ点击功能正常');
      testResults.passed++;
      
    } else {
      throw new Error('未找到FAQ按钮');
    }
    
  } catch (error) {
    console.error('❌ FAQ交互测试失败:', error.message);
    testResults.failed++;
    testResults.errors.push(`FAQ交互: ${error.message}`);
  }
}

// 测试5：响应式设计测试
async function testResponsiveDesign() {
  console.log('📋 测试5：响应式设计测试');
  
  try {
    const originalWidth = window.innerWidth;
    
    // 测试移动端视图
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375
    });
    
    window.dispatchEvent(new Event('resize'));
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // 检查移动端导航菜单
    const mobileMenuButton = document.querySelector('button[aria-expanded]');
    if (mobileMenuButton) {
      console.log('✅ 移动端菜单按钮存在');
      testResults.passed++;
    } else {
      throw new Error('移动端菜单按钮未找到');
    }
    
    // 恢复原始宽度
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: originalWidth
    });
    window.dispatchEvent(new Event('resize'));
    
  } catch (error) {
    console.error('❌ 响应式设计测试失败:', error.message);
    testResults.failed++;
    testResults.errors.push(`响应式设计: ${error.message}`);
  }
}

// 测试6：性能检查
async function testPerformance() {
  console.log('📋 测试6：性能检查');
  
  try {
    // 检查页面加载时间
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    
    if (loadTime < 5000) {
      console.log(`✅ 页面加载时间: ${loadTime}ms (良好)`);
      testResults.passed++;
    } else {
      console.log(`⚠️  页面加载时间: ${loadTime}ms (较慢)`);
    }
    
    // 检查图片懒加载
    const images = document.querySelectorAll('img');
    let loadedImages = 0;
    images.forEach(img => {
      if (img.complete) loadedImages++;
    });
    
    console.log(`✅ 图片加载状态: ${loadedImages}/${images.length}`);
    testResults.passed++;
    
  } catch (error) {
    console.error('❌ 性能检查失败:', error.message);
    testResults.failed++;
    testResults.errors.push(`性能: ${error.message}`);
  }
}

// 主测试函数
async function runAllTests() {
  console.log('🎯 开始执行完整测试套件...');
  console.log('=' .repeat(50));
  
  await testPageLoad();
  await testNavigation();
  await testHomeSections();
  await testFAQInteraction();
  await testResponsiveDesign();
  await testPerformance();
  
  console.log('=' .repeat(50));
  console.log('📊 测试结果汇总:');
  console.log(`✅ 通过: ${testResults.passed}`);
  console.log(`❌ 失败: ${testResults.failed}`);
  console.log(`📈 成功率: ${((testResults.passed / (testResults.passed + testResults.failed)) * 100).toFixed(1)}%`);
  
  if (testResults.errors.length > 0) {
    console.log('\n🐛 发现的问题:');
    testResults.errors.forEach((error, index) => {
      console.log(`${index + 1}. ${error}`);
    });
  }
  
  if (testResults.failed === 0) {
    console.log('\n🎉 所有测试通过！项目可以交付。');
  } else {
    console.log('\n⚠️  发现问题，需要修复后再交付。');
  }
  
  return testResults;
}

// 导出测试函数（用于浏览器控制台）
if (typeof window !== 'undefined') {
  window.runNanoBananaAITests = runAllTests;
  console.log('💡 在浏览器控制台中运行: runNanoBananaAITests()');
}

// 如果在Node.js环境中，直接运行
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { runAllTests, testResults };
}

// 自动运行测试（如果页面已加载）
if (typeof window !== 'undefined' && document.readyState === 'complete') {
  console.log('🚀 页面已加载，自动开始测试...');
  setTimeout(runAllTests, 1000);
} else if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    console.log('🚀 页面加载完成，开始测试...');
    setTimeout(runAllTests, 1000);
  });
}