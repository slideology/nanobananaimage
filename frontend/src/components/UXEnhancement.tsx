import React, { useState, useEffect } from 'react';

/**
 * UX Enhancement Component
 * 用户体验增强组件，包含滚动进度指示器、返回顶部按钮、键盘导航支持等功能
 * 实现Task 2.3的用户体验优化需求
 */
const UXEnhancement: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // 监听滚动进度和返回顶部按钮显示
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      setScrollProgress(progress);
      setShowBackToTop(scrollTop > 300);
    };

    // 检测用户是否偏好减少动画
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleMotionChange);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 返回顶部功能
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: isReducedMotion ? 'auto' : 'smooth'
    });
  };

  // 键盘导航支持
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + T: 返回顶部
      if (e.altKey && e.key === 't') {
        e.preventDefault();
        scrollToTop();
      }
      
      // Alt + H: 跳转到主要内容
      if (e.altKey && e.key === 'h') {
        e.preventDefault();
        const mainContent = document.querySelector('main') || document.querySelector('[role="main"]');
        if (mainContent) {
          (mainContent as HTMLElement).focus();
          mainContent.scrollIntoView({ behavior: isReducedMotion ? 'auto' : 'smooth' });
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isReducedMotion]);

  return (
    <>
      {/* 滚动进度指示器 */}
      <div 
        className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50 origin-left transition-transform duration-150"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
        role="progressbar"
        aria-label="页面滚动进度"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* 返回顶部按钮 */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg z-50 flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
            isReducedMotion ? '' : 'transform hover:scale-110'
          }`}
          aria-label="返回页面顶部"
          title="返回顶部 (Alt + T)"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 10l7-7m0 0l7 7m-7-7v18" 
            />
          </svg>
        </button>
      )}

      {/* 跳转到主要内容的链接（无障碍访问） */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onFocus={(e) => {
          // 确保链接在获得焦点时可见
          e.target.classList.remove('sr-only');
        }}
        onBlur={(e) => {
          // 失去焦点时隐藏
          e.target.classList.add('sr-only');
        }}
      >
        跳转到主要内容 (Alt + H)
      </a>

      {/* 键盘导航提示（仅在键盘导航时显示） */}
      <div 
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
        id="keyboard-navigation-help"
      >
        键盘导航提示：按 Alt + T 返回顶部，按 Alt + H 跳转到主要内容
      </div>
    </>
  );
};

export default UXEnhancement;