import React, { useEffect, useRef } from 'react';

/**
 * AdBanner Component - Used to embed third-party ads in the page
 * 
 * This component loads ad scripts on mount and provides a container for displaying ad content
 * The ad script automatically injects content into the container with the specified ID
 */
const AdBanner: React.FC = () => {
  const adContainerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef<boolean>(false);

  useEffect(() => {
    // Avoid loading script repeatedly
    if (scriptLoaded.current) return;
    
    // Create ad script element
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = '//pl26268265.effectiveratecpm.com/1ab4dfad6c3ca77c5a53383982f92cc3/invoke.js';
    
    // Mark as loaded after script loading is complete
    script.onload = () => {
      scriptLoaded.current = true;
      console.log('Ad script loaded successfully');
    };
    
    // Handle script loading failure
    script.onerror = (error) => {
      console.error('Ad script loading failed:', error);
    };
    
    // Add script to document
    document.head.appendChild(script);
    
    // Cleanup when component unmounts
    return () => {
      // Script can be removed here if needed
      // But usually ad scripts remain in the page once loaded
    };
  }, []);

  return (
    <div className="ad-banner-container my-8">
      {/* Ad container, ID must match the ID specified in the ad script */}
      <div id="container-1ab4dfad6c3ca77c5a53383982f92cc3" ref={adContainerRef}></div>
    </div>
  );
};

export default AdBanner;
