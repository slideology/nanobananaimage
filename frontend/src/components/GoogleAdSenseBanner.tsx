import React from 'react';

/**
 * Google AdSense automatic ad mode component
 * Automatic ads do not need to render any tags, AdSense will automatically insert ads at appropriate positions on the page.
 * Just ensure that the automatic ad script has been correctly included in public/index.html.
 */
const GoogleAdSenseBanner: React.FC = () => {
  // In automatic ad mode, return null and do not render any content
  return null;
};

export default GoogleAdSenseBanner;
