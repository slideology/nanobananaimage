import React, { useState, useEffect } from 'react';

/**
 * UX Enhancement Component
 * User experience enhancement component with scroll progress indicator, back-to-top button, keyboard navigation support and other features
 * Implements Task 2.3 user experience optimization requirements
 */
const UXEnhancement: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Listen to scroll progress and back-to-top button display
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      setScrollProgress(progress);
      setShowBackToTop(scrollTop > 300);
    };

    // Detect if user prefers reduced motion
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

  // Back to top functionality
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: isReducedMotion ? 'auto' : 'smooth'
    });
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt + T: Back to top
      if (e.altKey && e.key === 't') {
        e.preventDefault();
        scrollToTop();
      }
      
      // Alt + H: Jump to main content
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
      {/* Scroll progress indicator */}
      <div 
        className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50 origin-left transition-transform duration-150"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Back to top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg z-50 flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
            isReducedMotion ? '' : 'transform hover:scale-110'
          }`}
          aria-label="Back to page top"
          title="Back to top (Alt + T)"
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

      {/* Skip to main content link (accessibility) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onFocus={(e) => {
          // Ensure link is visible when focused
          e.target.classList.remove('sr-only');
        }}
        onBlur={(e) => {
          // Hide when focus is lost
          e.target.classList.add('sr-only');
        }}
      >
        Skip to main content (Alt + H)
      </a>

      {/* Keyboard navigation hint (only shown during keyboard navigation) */}
      <div 
        className="sr-only" 
        aria-live="polite" 
        aria-atomic="true"
        id="keyboard-navigation-help"
      >
        Keyboard navigation hint: Press Alt + T to go back to top, press Alt + H to jump to main content
      </div>
    </>
  );
};

export default UXEnhancement;