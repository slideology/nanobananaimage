import React, { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'NANO BANANA AI - Google Unreleased Image Generation Model Analysis',
  description = 'Explore comprehensive analysis of Google\'s unreleased Nano Banana AI image generation model. Technical insights, performance benchmarks, and research findings.',
  image = 'https://nanobananaimage.org/images/nano-banana-ai/social/og-image.jpg',
  url = typeof window !== 'undefined' ? window.location.href : 'https://nanobananaimage.org',
  type = 'website',
  structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': 'Nano Banana AI',
    'description': 'Intelligent Code Generation and Development Tool',
    'applicationCategory': 'MultimediaApplication',
    'operatingSystem': 'Web',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'author': {
      '@type': 'Organization',
      'name': 'Nano Banana AI Research Team',
    'url': 'https://nanobananaimage.org'
    }
  }
}) => {
  useEffect(() => {
    // Set page title
    document.title = title;

    // Function to create or update meta tags
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Set basic meta tags
    setMetaTag('description', description);
    setMetaTag('viewport', 'width=device-width, initial-scale=1.0');
    setMetaTag('theme-color', '#0f172a');
    setMetaTag('robots', 'index, follow');
    setMetaTag('googlebot', 'index, follow');
    setMetaTag('keywords', 'NANO BANANA AI, Google AI, image generation, neural networks, machine learning, AI research, model analysis');
  setMetaTag('author', 'Nano Banana AI Research Team');
  setMetaTag('copyright', 'Nano Banana AI');

    // Set Open Graph tags
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:image', image, true);
    setMetaTag('og:url', url, true);
    setMetaTag('og:type', type, true);
    setMetaTag('og:site_name', 'Nano Banana AI', true);

    // Set Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:site', '@NanoBananaAI');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', image);

    // Set structured data
    let structuredDataScript = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!structuredDataScript) {
      structuredDataScript = document.createElement('script');
      structuredDataScript.type = 'application/ld+json';
      document.head.appendChild(structuredDataScript);
    }
    structuredDataScript.textContent = JSON.stringify(structuredData);

    // Set canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = url;

    // Cleanup function
    return () => {
      // Add cleanup logic here if needed
    };
  }, [title, description, image, url, type, structuredData]);

  return null; // This component doesn't render any content
};

export default SEOHead;