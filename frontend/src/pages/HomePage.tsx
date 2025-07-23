import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NewsletterSubscribe from '../components/NewsletterSubscribe';
import CodeDemoComponent from '../components/CodeDemoComponent';
import PerformanceBenchmarks from '../components/PerformanceBenchmarks';
import UXEnhancement from '../components/UXEnhancement';
import { ScrollReveal, HoverEffect, TypewriterEffect, CountUpAnimation } from '../components/AnimationEnhancement';
import { PageLoader } from '../components/LoadingStates';
import { analytics } from '../utils/analytics';
import { performanceMonitor } from '../utils/performance';
import { useSiteConfig } from '../hooks/useSiteConfig';
import { useResponsive } from '../hooks/useResponsive';

/**
 * QWEN3 CODER Single Page Application Homepage
 * Integrates all features: Hero, Features, Showcase, Reviews, FAQ
 * Reference structure from https://qwen3coder.com/
 */
const HomePage: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const { contentConfig, siteConfig, seoConfig, loading, error, isReady } = useSiteConfig();
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const [scrollY, setScrollY] = useState(0);
  
  // 滚动监听
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // 滚动进入视口动画
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      });
    }, observerOptions);
    
    // 观察所有需要动画的元素
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach((el) => observer.observe(el));
    
    return () => {
      animateElements.forEach((el) => observer.unobserve(el));
    };
  }, []);
  
  // FAQ结构化数据
  React.useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How does QWEN3 CODER generate intelligent code?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "QWEN3 CODER uses advanced artificial intelligence to understand your coding requirements and generate intelligent code solutions. Our multi-layer AI architecture analyzes context, plans optimal approaches, generates clean code, and provides optimization suggestions automatically."
          }
        },
        {
          "@type": "Question",
          "name": "What programming languages does QWEN3 CODER support?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "QWEN3 CODER supports over 50 programming languages including Python, JavaScript, Java, C++, Go, Rust, TypeScript, and more. Our AI understands language-specific patterns, best practices, and can seamlessly work across different tech stacks."
          }
        },
        {
          "@type": "Question",
          "name": "What makes QWEN3 CODER different from other AI coding tools?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Unlike traditional coding assistants, QWEN3 CODER uses proprietary agentic AI algorithms with multi-round interaction capabilities, intelligent planning, and decision-making. Our technology handles complex software architecture and provides contextual understanding for professional development."
          }
        },
        {
          "@type": "Question",
          "name": "How can I integrate QWEN3 CODER into my development workflow?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "QWEN3 CODER offers seamless integration with popular IDEs including VS Code, IntelliJ, and more. We provide plugins, API access, and command-line tools. All integrations maintain your existing workflow while enhancing productivity."
          }
        },
        {
          "@type": "Question",
          "name": "How does QWEN3 CODER handle code privacy and security?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We maintain enterprise-grade security with SOC 2 Type II compliance. All code is encrypted with AES-256, processed in secure environments, and never stored permanently. We're GDPR compliant with options for on-premise deployment."
          }
        },
        {
          "@type": "Question",
          "name": "What support resources does QWEN3 CODER provide?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "We offer comprehensive support including 24/7 developer chat, coding tutorials, technical documentation, community forum, and live coding sessions. Professional plans include dedicated support with 2-hour response time."
          }
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      const scripts = document.querySelectorAll('script[type="application/ld+json"]');
      scripts.forEach(script => {
        if (script.textContent?.includes('"@type": "FAQPage"')) {
          script.remove();
        }
      });
    };
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // 显示加载状态
  if (loading || !isReady) {
    return <PageLoader isLoading={true} message={loading ? "加载中..." : "准备中..."} />;
  }

  // 显示错误状态
  if (error) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">加载失败</div>
          <div className="text-gray-400">{error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            重新加载
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* UX Enhancement Components */}
      <UXEnhancement />
      
      {/* Main Content */}
      <main id="main-content" role="main" tabIndex={-1}>
      {/* Hero Section */}
      <section className="relative py-32 pt-40 overflow-hidden min-h-screen flex items-center">
        {/* 背景效果 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-gray-900"></div>
        <div className="absolute inset-0 bg-[url('/images/qwen3-coder/backgrounds/stars-texture.png')] opacity-20"></div>
        
        {/* 视差背景效果 */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-gray-900/10"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        ></div>
        
        {/* 动态背景粒子效果 */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-300 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            {/* 主标题 */}
            <ScrollReveal direction="fade" delay={200}>
              <h1 className={`${isMobile ? 'text-5xl' : isTablet ? 'text-7xl' : 'text-9xl'} font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent leading-tight`}>
                <TypewriterEffect 
                  text={contentConfig?.hero.title || 'QWEN3 CODER'}
                  speed={100}
                  className="inline-block"
                />
              </h1>
            </ScrollReveal>
              
            {/* 副标题 */}
            <ScrollReveal direction="up" delay={400}>
              <p className={`${isMobile ? 'text-lg' : isTablet ? 'text-xl' : 'text-3xl'} text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed`}>
                {contentConfig?.hero.description || '用智能AI驱动的代码生成技术，革命性地改变您的开发工作流程。几分钟内创建专业级软件解决方案。'}
              </p>
            </ScrollReveal>
              
            {/* 行动按钮 */}
            <ScrollReveal direction="up" delay={600}>
              <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} gap-6 justify-center mb-16`}>
                <HoverEffect effect="scale" intensity="medium">
                  <a href="https://qwen3coder.com/try" target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-xl font-semibold text-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/25 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-950">
                    立即开始编程
                  </a>
                </HoverEffect>
                <HoverEffect effect="lift" intensity="subtle">
                  <a href="https://qwen3coder.com/examples" target="_blank" rel="noopener noreferrer" className="bg-transparent border-2 border-gray-400 text-gray-300 hover:bg-gray-800 hover:border-gray-300 px-10 py-5 rounded-xl font-semibold text-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-gray-950">
                    查看代码示例
                  </a>
                </HoverEffect>
              </div>
            </ScrollReveal>
            {/* 特色标签 */}
            <div className="flex flex-wrap gap-4 justify-center animate-fade-in" style={{animationDelay: '0.9s'}}>
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full px-6 py-3 text-gray-300 hover:bg-gray-700/50 transition-all duration-300">
                <span className="text-blue-400 mr-2">⚡</span>
                即时代码生成
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full px-6 py-3 text-gray-300 hover:bg-gray-700/50 transition-all duration-300">
                <span className="text-purple-400 mr-2">🤖</span>
                AI智能驱动
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full px-6 py-3 text-gray-300 hover:bg-gray-700/50 transition-all duration-300">
                <span className="text-green-400 mr-2">💻</span>
                多语言支持
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full px-6 py-3 text-gray-300 hover:bg-gray-700/50 transition-all duration-300">
                <span className="text-yellow-400 mr-2">🎯</span>
                生产级就绪
              </div>
            </div>
          </div>
        </div>
        
        {/* 底部滚动指示器 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>
      
      {/* Interactive Code Demo Section */}
      <section id="demo" className="relative py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              实时代码演示
            </h2>
            <p className="text-xl text-gray-400">
              体验QWEN3 CODER的强大功能，实时生成高质量代码
            </p>
          </div>
          
          <div id="demo">
            <CodeDemoComponent />
          </div>
        </div>
      </section>

      {/* Performance Benchmarks Section */}
      <PerformanceBenchmarks />

      {/* Features Section */}
      <section id="features" className="relative py-24 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 animate-on-scroll">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 text-white">
              用 QWEN3 CODER 革新您的开发体验
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-5xl mx-auto leading-relaxed">
              体验下一代AI驱动的代码生成技术，享受我们全面的专业功能套件。从智能代码分析到无缝框架集成，QWEN3 CODER 为您提供创建卓越软件解决方案所需的一切。
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* AI-Powered Code Generation */}
            <div className="group bg-gray-800 rounded-xl p-8 hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 animate-on-scroll">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="text-3xl">🤖</div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">AI智能代码生成</h3>
              <p className="text-gray-400 leading-relaxed">
                QWEN3 CODER 利用前沿人工智能技术分析和生成您的代码。我们的先进神经网络理解编程模式、架构和最佳实践，从需求到实现创建无缝的代码解决方案。在每一行代码中体验机器学习的强大力量。
              </p>
            </div>
            
            {/* Real-Time Code Generation */}
            <div className="group bg-gray-800 rounded-xl p-8 hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/10 animate-on-scroll" style={{animationDelay: '0.1s'}}>
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="text-3xl">⚡</div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-yellow-400 transition-colors">实时代码生成</h3>
              <p className="text-gray-400 leading-relaxed">
                观看您的代码解决方案实时生成。我们优化的处理管道在30秒内提供生产就绪的代码，同时不妥协质量。非常适合需要快速周转时间同时保持专业标准的开发者。
              </p>
            </div>
            
            {/* Advanced Framework Integration */}
            <div className="group bg-gray-800 rounded-xl p-8 hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10 animate-on-scroll" style={{animationDelay: '0.2s'}}>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="text-3xl">🔧</div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-green-400 transition-colors">高级框架集成</h3>
              <p className="text-gray-400 leading-relaxed">
                使用我们的专有技术与流行框架和库无缝集成。QWEN3 CODER 理解项目结构、依赖关系和编码模式，创建与您现有代码库完美集成的超兼容代码。
              </p>
            </div>
            
            {/* Customizable Code Patterns */}
            <div className="group bg-gray-800 rounded-xl p-8 hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 animate-on-scroll" style={{animationDelay: '0.3s'}}>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="text-3xl">🎨</div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-400 transition-colors">可定制代码模式</h3>
              <p className="text-gray-400 leading-relaxed">
                通过广泛的自定义选项掌控您的开发愿景。调整编码风格、设计模式、架构方法、命名约定、文档级别和优化策略。创建独特且易于维护的代码，在任何项目中都脱颖而出。
              </p>
            </div>
            
            {/* Multi-Language Support */}
            <div className="group bg-gray-800 rounded-xl p-8 hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 animate-on-scroll" style={{animationDelay: '0.4s'}}>
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="text-3xl">💻</div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-indigo-400 transition-colors">多语言支持</h3>
              <p className="text-gray-400 leading-relaxed">
                通过我们全面的语言支持在任何地方部署您的代码。无论是用于数据科学的Python、Web开发的JavaScript、企业级的Java，还是微服务的Go，QWEN3 CODER确保您的代码在所有平台和环境中完美运行。
              </p>
            </div>
            
            {/* Enterprise-Grade Security */}
            <div className="group bg-gray-800 rounded-xl p-8 hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/10 animate-on-scroll" style={{animationDelay: '0.5s'}}>
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="text-3xl">🔒</div>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-red-400 transition-colors">企业级安全</h3>
              <p className="text-gray-400 leading-relaxed">
                信任我们强大的安全基础设施来保护您的代码。通过端到端加密、安全云处理和自动数据清理，您的开发资产始终安全。我们严格遵守全球隐私法规和行业标准。
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Reviews Section */}
      <section id="reviews" className="relative py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              用户评价
            </h2>
            <p className="text-xl text-gray-400">
              加入数千名已经改变工作流程的开发者行列
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* User Review 1 */}
            <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all duration-300 animate-on-scroll">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  SC
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-white">Sarah Chen</h3>
                  <p className="text-gray-400 text-sm">Frontend Developer</p>
                </div>
              </div>
              <p className="text-gray-300">
                "Qwen3-Coder transformed my development workflow! My coding productivity increased by 300% after using this AI tool. Absolutely phenomenal results."
              </p>
            </div>
            
            {/* User Review 2 */}
            <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all duration-300 animate-on-scroll" style={{animationDelay: '0.1s'}}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  MR
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-white">Michael Rodriguez</h3>
                  <p className="text-gray-400 text-sm">Full-Stack Engineer</p>
                </div>
              </div>
              <p className="text-gray-300">
                "As a full-stack engineer, I'm amazed by the code quality. The generated code is production-ready and the architecture patterns are incredibly accurate."
              </p>
            </div>
            
            {/* User Review 3 */}
            <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all duration-300 animate-on-scroll" style={{animationDelay: '0.2s'}}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  ET
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-white">Emma Thompson</h3>
                  <p className="text-gray-400 text-sm">Tech Lead</p>
                </div>
              </div>
              <p className="text-gray-300">
                "This tool has become essential for our development projects. The quick code generation and professional results are exactly what we needed."
              </p>
            </div>
            
            {/* User Review 4 */}
            <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all duration-300 animate-on-scroll" style={{animationDelay: '0.3s'}}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold">
                  DK
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-white">David Kim</h3>
                  <p className="text-gray-400 text-sm">Software Architect</p>
                </div>
              </div>
              <p className="text-gray-300">
                "The architectural quality of the generated code is mind-blowing. It's like having a professional development team at your fingertips."
              </p>
            </div>
            
            {/* User Review 5 */}
            <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all duration-300 animate-on-scroll" style={{animationDelay: '0.4s'}}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                  LW
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-white">Lisa Wang</h3>
                  <p className="text-gray-400 text-sm">DevOps Engineer</p>
                </div>
              </div>
              <p className="text-gray-300">
                "Our deployment efficiency skyrocketed after incorporating this tool. The ease of use and quick code generation make it perfect for daily development."
              </p>
            </div>
            
            {/* User Review 6 */}
            <div className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-all duration-300 animate-on-scroll" style={{animationDelay: '0.5s'}}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                  JA
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-white">James Anderson</h3>
                  <p className="text-gray-400 text-sm">Senior Developer</p>
                </div>
              </div>
              <p className="text-gray-300">
                "Finally, a tool that delivers professional code without the complexity. The AI understanding of patterns and architecture is remarkable."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section id="faq" className="py-20 relative bg-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              关于QWEN3 CODER的一切
            </h2>
            <p className="text-xl text-gray-400">
              关于我们AI驱动代码生成器的详细问答
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {[
              {
                question: "How does QWEN3 CODER generate code?",
                answer: "QWEN3 CODER uses advanced artificial intelligence to analyze your requirements and create production-ready code. Our 4-layer AI architecture understands context, plans optimal architecture, generates clean code, and optimizes for performance automatically."
              },
              {
                question: "What types of projects work best with QWEN3 CODER?",
                answer: "For optimal results, provide clear requirements with specific functionality needs and technical constraints. Projects with well-defined scope, clear objectives, and detailed specifications work best. We support all major programming languages and frameworks."
              },
              {
                question: "What makes QWEN3 CODER different from other code generation tools?",
                answer: "Unlike traditional code generators, QWEN3 CODER uses proprietary AI algorithms to create intelligent code with unprecedented architectural quality. Our technology automatically handles complex design patterns and code optimization for professional results."
              },
              {
                question: "How can I optimize my code for different environments?",
                answer: "QWEN3 CODER offers optimized code templates for all major environments: microservices for cloud deployment, monolithic architecture for traditional systems, and serverless functions for modern platforms. All outputs maintain perfect compatibility across environments."
              },
              {
                question: "How does QWEN3 CODER handle data privacy and security?",
                answer: "We maintain enterprise-grade security with SOC 2 Type II compliance. All code is encrypted with AES-256, processed in secure environments, and automatically deleted after 30 days. We're GDPR compliant with EU data residency options."
              },
              {
                question: "What support resources does QWEN3 CODER provide?",
                answer: "We offer comprehensive support including 24/7 live chat, coding tutorials, technical documentation, developer community forum, and webinar training sessions. Professional plans include dedicated support with 4-hour response time."
              }
            ].map((faq, index) => (
              <div key={index} className="mb-4 bg-gray-800 rounded-xl animate-on-scroll" style={{animationDelay: `${index * 0.1}s`}}>
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left p-6 hover:bg-gray-700 transition-colors rounded-xl"
                >
                  <h3 className="text-lg font-semibold text-white flex items-center justify-between">
                    {faq.question}
                    <span className="text-2xl text-gray-400 transition-transform duration-300" style={{transform: openFAQ === index ? 'rotate(45deg)' : 'rotate(0deg)'}}>
                      +
                    </span>
                  </h3>
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-6 animate-fade-in">
                    <p className="text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 在页面底部添加订阅区块 */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <NewsletterSubscribe />
        </div>
      </section>
      </main>
    </div>
  );
};

export default HomePage;
