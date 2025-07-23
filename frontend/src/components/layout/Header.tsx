import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';

import { useResponsive } from '../../hooks/useResponsive';

/**
 * Qwen3-Coder 单页应用导航栏组件
 * 适配单页应用，包含锚点导航和固定导航栏效果
 * 支持AffiliateBanner的动态高度调整
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [bannerHeight, setBannerHeight] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const { isMobile, isTablet } = useResponsive();
  
  // Navigation links data - Mixed navigation (anchor + page routing)
  const navLinks = [
    { name: 'Features', path: '/features', type: 'route' },
    { name: 'Live Demo', path: '#demo', type: 'anchor' },
    { name: 'Showcase', path: '/showcase', type: 'route' },
    { name: 'Documentation', path: '/docs', type: 'route' },
    { name: 'Reviews', path: '#reviews', type: 'anchor' },
    { name: 'FAQ', path: '#faq', type: 'anchor' },
  ];
  
  // 监听滚动事件和Banner高度变化
  useEffect(() => {
    const updateBannerHeight = () => {
      const bannerElement = document.querySelector('[class*="bg-gradient-to-r from-indigo-500"]');
      setBannerHeight(bannerElement ? bannerElement.clientHeight : 0);
    };
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
      
      // 检测当前激活的区块
      const sections = ['demo', 'showcase', 'features', 'reviews', 'faq'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      setActiveSection(currentSection || '');
    };

    // 初始化Banner高度
    updateBannerHeight();
    
    // 监听窗口大小变化和滚动
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateBannerHeight);
    
    // 使用MutationObserver监听Banner的显示/隐藏
    const observer = new MutationObserver(updateBannerHeight);
    const targetNode = document.body;
    observer.observe(targetNode, { childList: true, subtree: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateBannerHeight);
      observer.disconnect();
    };
  }, []);
  
  // 判断当前导航链接是否激活
  const isActive = (link: { path: string; type: string }) => {
    if (link.type === 'route') {
      return location.pathname === link.path;
    } else {
      const section = link.path.replace('#', '');
      return activeSection === section;
    }
  };
  
  // 切换移动端菜单显示状态
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 处理导航点击
  const handleNavigation = (link: { path: string; type: string }) => {
    if (link.type === 'route') {
      navigate(link.path);
    } else {
      const sectionId = link.path.replace('#', '');
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
      style={{ top: `${bannerHeight}px` }}
      role="banner"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo区域 */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg p-1"
            aria-label="Home"
          >
            <img
              src="/favicon.ico"
              alt="Qwen3-Coder Logo"
              className="w-8 h-8 rounded-full"
            />
            <span className={`font-bold text-white ${isMobile ? 'text-xl' : 'text-2xl'}`}>Qwen3-Coder</span>
          </Link>
          
          {/* 桌面端导航菜单 */}
          <nav 
            className="hidden md:flex space-x-8"
            role="navigation"
            aria-label="Primary navigation"
          >
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNavigation(link)}
                className={`font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1 ${
                  isActive(link)
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-gray-300 hover:text-blue-400'
                }`}
                aria-current={isActive(link) ? 'page' : undefined}
              >
                {link.name}
              </button>
            ))}
          </nav>
          
          {/* User actions area */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="https://pollo.ai?ref=ytayndd"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Try Now
            </a>
          </div>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded p-2"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div 
            id="mobile-menu"
            className="md:hidden mt-4 py-4 border-t border-gray-700"
          >
            <nav 
              className="flex flex-col space-y-4"
              role="navigation"
              aria-label="Mobile navigation"
            >
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => handleNavigation(link)}
                  className={`font-medium transition-colors duration-200 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-2 py-1 ${
                    isActive(link)
                      ? 'text-blue-400'
                      : 'text-gray-300 hover:text-blue-400'
                  }`}
                  aria-current={isActive(link) ? 'page' : undefined}
                >
                  {link.name}
                </button>
              ))}
              <div className="flex flex-col space-y-2 pt-2">
                <a 
                  href="https://pollo.ai?ref=ytayndd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 text-left"
                >
                  Try Now
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
