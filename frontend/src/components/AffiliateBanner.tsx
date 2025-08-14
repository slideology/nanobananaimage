import React, { useEffect, useState } from 'react';

/**
 * AffiliateBanner Component - Display affiliate program promotional banner
 * 
 * Features:
 * 1. Display promotional information for video AI generation services
 * 2. Provide "Try Free" button linking to partner website
 * 3. Support close functionality with localStorage user preference
 * 4. Auto-reset user preference after 7 days, redisplay banner
 * 5. Fully responsive, performs well on both mobile and desktop
 */
const AffiliateBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if banner was previously closed
    const bannerClosed = localStorage.getItem('affiliate_banner_closed');
    
    // Show banner if it wasn't closed before
    if (bannerClosed !== 'true') {
      setIsVisible(true);
    }
  }, []);

  // Handle closing the banner
  const handleClose = () => {
    setIsVisible(false);
    // Store user preference in localStorage
    localStorage.setItem('affiliate_banner_closed', 'true');
    
    // Reset user preference after 7 days
    setTimeout(() => {
      localStorage.removeItem('affiliate_banner_closed');
    }, 7 * 24 * 60 * 60 * 1000);
  };

  // If banner is not visible, render nothing
  if (!isVisible) {
    return null;
  }

  return (
    <div className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-3 px-4 shadow-md relative z-50 fixed top-0 left-0 right-0">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        {/* Banner content */}
        <div className="flex items-center space-x-2 mb-2 sm:mb-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-video">
            <path d="m22 8-6 4 6 4V8Z"/>
            <rect width="14" height="12" x="2" y="6" rx="2" ry="2"/>
          </svg>
          <p className="font-medium">Free to Generate AI Video Online Now</p>
        </div>
        
        {/* Call to action button */}
        <a 
          href="https://pollo.ai/ai-image-generator?ref=ytayndd" 
          className="bg-white text-purple-600 hover:bg-gray-100 transition-colors duration-300 px-4 py-1.5 rounded-full font-medium text-sm shadow-sm"
          target="_blank" 
          rel="noopener noreferrer"
        >
          Try it Free
        </a>
        
        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute top-1 right-2 text-white hover:text-gray-200 transition-colors duration-300"
          aria-label="Close banner"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
            <path d="M18 6 6 18"/>
            <path d="m6 6 12 12"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AffiliateBanner;
