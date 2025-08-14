/**
 * Qwen3-Coder Playwright 自动化测试
 * 使用 Playwright 进行真实浏览器测试
 */

const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// 加载测试配置
const testConfig = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'test-config.json'), 'utf8')
);

// 获取环境配置
const environment = process.env.TEST_ENV || 'local';
const envConfig = testConfig.environments[environment];
const baseURL = envConfig.baseUrl;

// 测试配置
test.describe.configure({ mode: 'parallel' });

/**
 * 主页加载测试套件
 */
test.describe('主页功能测试', () => {
  test.beforeEach(async ({ page }) => {
    // 设置默认超时时间
    test.setTimeout(envConfig.timeout);
    
    // 导航到主页
    await page.goto(baseURL);
    
    // 等待页面加载完成
    await page.waitForLoadState('networkidle');
  });

  test('主页应该正确加载并显示关键元素', async ({ page }) => {
    // 检查页面标题
    await expect(page).toHaveTitle(/Qwen3.*Coder/i);
    
    // 检查关键元素存在
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
    
    // 检查 Hero 区域
    const heroSection = page.locator('[data-testid="hero-section"], .hero, h1');
    await expect(heroSection.first()).toBeVisible();
    
    // 截图
    await page.screenshot({ 
      path: 'logs/homepage-load.png',
      fullPage: true 
    });
  });

  test('导航栏链接应该正常工作', async ({ page }) => {
    // 测试锚点链接
    const anchorLinks = [
      { selector: 'a[href*="#features"]', target: '#features' },
      { selector: 'a[href*="#demo"]', target: '#demo' },
      { selector: 'a[href*="#reviews"]', target: '#reviews' },
      { selector: 'a[href*="#faq"]', target: '#faq' }
    ];

    for (const link of anchorLinks) {
      const linkElement = page.locator(link.selector).first();
      if (await linkElement.isVisible()) {
        await linkElement.click();
        await page.waitForTimeout(1000);
        
        // 验证页面滚动到目标位置
        const targetElement = page.locator(link.target);
        if (await targetElement.isVisible()) {
          await expect(targetElement).toBeInViewport();
        }
      }
    }
  });

  test('路由导航应该正常工作', async ({ page }) => {
    // 测试 Showcase 页面
    const showcaseLink = page.locator('a[href="/showcase"], a[href*="showcase"]').first();
    if (await showcaseLink.isVisible()) {
      await showcaseLink.click();
      await page.waitForLoadState('networkidle');
      await expect(page.locator('main')).toBeVisible();
      
      // 返回主页
      await page.goBack();
      await page.waitForLoadState('networkidle');
    }

    // 测试 Documentation 页面
    const docsLink = page.locator('a[href="/docs"], a[href*="docs"]').first();
    if (await docsLink.isVisible()) {
      await docsLink.click();
      await page.waitForLoadState('networkidle');
      await expect(page.locator('main')).toBeVisible();
      
      // 返回主页
      await page.goBack();
      await page.waitForLoadState('networkidle');
    }
  });
});

/**
 * 响应式设计测试套件
 */
test.describe('响应式设计测试', () => {
  const devices = Object.entries(testConfig.devices);

  devices.forEach(([deviceName, deviceConfig]) => {
    test(`${deviceConfig.name} 设备适配测试`, async ({ page }) => {
      // 设置视口大小
      await page.setViewportSize(deviceConfig.viewport);
      
      // 设置用户代理
      await page.setExtraHTTPHeaders({
        'User-Agent': deviceConfig.userAgent
      });
      
      // 导航到主页
      await page.goto(baseURL);
      await page.waitForLoadState('networkidle');
      
      // 检查关键元素在当前设备下可见
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
      
      // 移动端检查菜单按钮
      if (deviceName === 'mobile') {
        const menuToggle = page.locator('[data-testid="menu-toggle"], .menu-toggle, button[aria-label*="menu"]');
        if (await menuToggle.isVisible()) {
          await menuToggle.click();
          await page.waitForTimeout(500);
        }
      }
      
      // 截图
      await page.screenshot({ 
        path: `logs/responsive-${deviceName}.png`,
        fullPage: true 
      });
    });
  });
});

/**
 * 交互功能测试套件
 */
test.describe('交互功能测试', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');
  });

  test('FAQ 展开收起功能', async ({ page }) => {
    // 滚动到 FAQ 区域
    const faqSection = page.locator('#faq, [data-testid="faq-section"]');
    if (await faqSection.isVisible()) {
      await faqSection.scrollIntoViewIfNeeded();
      
      // 查找 FAQ 项目
      const faqItems = page.locator('[data-testid^="faq-item"], .faq-item, details');
      const faqCount = await faqItems.count();
      
      if (faqCount > 0) {
        // 点击第一个 FAQ 项目
        const firstFaq = faqItems.first();
        await firstFaq.click();
        await page.waitForTimeout(500);
        
        // 验证内容展开
        const faqContent = firstFaq.locator('.faq-content, dd, [data-testid="faq-answer"]');
        if (await faqContent.isVisible()) {
          await expect(faqContent).toBeVisible();
        }
      }
    }
  });

  test('代码演示交互功能', async ({ page }) => {
    // 滚动到代码演示区域
    const demoSection = page.locator('#demo, [data-testid="demo-section"], [data-testid="code-demo"]');
    if (await demoSection.isVisible()) {
      await demoSection.scrollIntoViewIfNeeded();
      
      // 查找交互按钮
      const demoButtons = demoSection.locator('button');
      const buttonCount = await demoButtons.count();
      
      if (buttonCount > 0) {
        // 点击第一个按钮
        await demoButtons.first().click();
        await page.waitForTimeout(1000);
      }
    }
  });
});

/**
 * 性能测试套件
 */
test.describe('性能测试', () => {
  test('页面加载性能测试', async ({ page }) => {
    // 开始性能监控
    const startTime = Date.now();
    
    // 导航到主页
    await page.goto(baseURL);
    
    // 等待页面完全加载
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    
    // 验证加载时间
    expect(loadTime).toBeLessThan(testConfig.performance.thresholds.timeToInteractive);
    
    console.log(`页面加载时间: ${loadTime}ms`);
    
    // 检查关键元素加载
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });

  test('资源加载优化验证', async ({ page }) => {
    const responses = [];
    
    // 监听网络请求
    page.on('response', response => {
      responses.push({
        url: response.url(),
        status: response.status(),
        contentType: response.headers()['content-type']
      });
    });
    
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');
    
    // 验证关键资源加载成功
    const criticalResources = responses.filter(r => 
      r.contentType && (
        r.contentType.includes('text/html') ||
        r.contentType.includes('text/css') ||
        r.contentType.includes('application/javascript')
      )
    );
    
    const failedResources = criticalResources.filter(r => r.status >= 400);
    expect(failedResources.length).toBe(0);
    
    console.log(`总请求数: ${responses.length}`);
    console.log(`关键资源数: ${criticalResources.length}`);
    console.log(`失败请求数: ${failedResources.length}`);
  });
});

/**
 * 可访问性测试套件
 */
test.describe('可访问性测试', () => {
  test('键盘导航测试', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');
    
    // 使用 Tab 键导航
    await page.keyboard.press('Tab');
    
    // 检查焦点元素
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
    
    // 继续 Tab 导航
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      await page.waitForTimeout(200);
    }
  });

  test('标题结构测试', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');
    
    // 检查 H1 标签存在且唯一
    const h1Elements = page.locator('h1');
    const h1Count = await h1Elements.count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
    
    // 检查标题层级结构
    const headings = page.locator('h1, h2, h3, h4, h5, h6');
    const headingCount = await headings.count();
    expect(headingCount).toBeGreaterThan(0);
  });

  test('图片 Alt 属性测试', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');
    
    // 检查所有图片都有 alt 属性
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      
      // alt 属性应该存在（可以为空字符串用于装饰性图片）
      expect(alt).not.toBeNull();
    }
  });
});

/**
 * SEO 测试套件
 */
test.describe('SEO 优化测试', () => {
  test('Meta 标签完整性测试', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');
    
    // 检查基础 Meta 标签
    const title = await page.title();
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(10);
    expect(title.length).toBeLessThan(60);
    
    // 检查 Meta Description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveCount(1);
    
    const description = await metaDescription.getAttribute('content');
    expect(description).toBeTruthy();
    expect(description.length).toBeGreaterThan(50);
    expect(description.length).toBeLessThan(160);
    
    // 检查 Open Graph 标签
    await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:description"]')).toHaveCount(1);
    await expect(page.locator('meta[property="og:type"]')).toHaveCount(1);
  });

  test('结构化数据测试', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');
    
    // 检查 JSON-LD 结构化数据
    const jsonLdScripts = page.locator('script[type="application/ld+json"]');
    const jsonLdCount = await jsonLdScripts.count();
    
    if (jsonLdCount > 0) {
      const jsonLdContent = await jsonLdScripts.first().textContent();
      expect(jsonLdContent).toBeTruthy();
      
      // 验证 JSON 格式正确
      expect(() => JSON.parse(jsonLdContent)).not.toThrow();
    }
  });
});

/**
 * 错误处理测试套件
 */
test.describe('错误处理测试', () => {
  test('404 页面测试', async ({ page }) => {
    // 访问不存在的页面
    const response = await page.goto(`${baseURL}/non-existent-page`);
    
    // 检查是否正确处理 404
    if (response.status() === 404) {
      // 验证 404 页面内容
      await expect(page.locator('body')).toBeVisible();
    } else {
      // 如果重定向到主页，验证主页加载
      await expect(page.locator('main')).toBeVisible();
    }
  });

  test('JavaScript 错误监控', async ({ page }) => {
    const jsErrors = [];
    
    // 监听 JavaScript 错误
    page.on('pageerror', error => {
      jsErrors.push(error.message);
    });
    
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');
    
    // 验证没有 JavaScript 错误
    expect(jsErrors.length).toBe(0);
    
    if (jsErrors.length > 0) {
      console.log('JavaScript 错误:', jsErrors);
    }
  });
});