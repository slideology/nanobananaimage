import { useState, useEffect } from 'react';

// 配置文件类型定义
export interface SiteConfig {
  site: {
    name: string;
    url: string;
    logo: {
      light: string;
      dark: string;
      favicon: string;
    };
    brand: {
      primaryColor: string;
      secondaryColor: string;
      accentColor: string;
    };
    company: {
      name: string;
      address: string;
      email: string;
      phone: string;
    };
    social: {
      twitter: string;
      facebook: string;
      instagram: string;
      linkedin: string;
      youtube: string;
    };
    analytics: {
      googleAnalyticsId: string;
      facebookPixelId: string;
      hotjarId: string;
    };
    features: {
      multiLanguage: boolean;
      darkMode: boolean;
      newsletter: boolean;
      blog: boolean;
      ecommerce: boolean;
    };
  };
}

export interface ContentConfig {
  hero: {
    title: string;
    subtitle: string;
    description: string;
    primaryCTA: {
      text: string;
      link: string;
    };
    secondaryCTA: {
      text: string;
      link: string;
    };
    features: Array<{
      text: string;
      icon: string;
    }>;
    backgroundImage: string;
  };
  features: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
      icon: string;
      image: string;
    }>;
  };
  showcase: {
    title: string;
    subtitle: string;
    items: Array<{
      title: string;
      description: string;
      image: string;
      category: string;
    }>;
  };
  reviews: {
    title: string;
    subtitle: string;
    items: Array<{
      name: string;
      role: string;
      avatar: string;
      content: string;
      rating: number;
    }>;
  };
  faq: {
    title: string;
    subtitle: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  };
}

export interface SEOConfig {
  defaults: {
    title: string;
    description: string;
    keywords: string[];
    image: string;
  };
  titleTemplate: string;
  descriptionTemplate: string;
  pages: Record<string, {
    title: string;
    description: string;
    keywords: string[];
    canonicalUrl: string;
    ogImage: string;
  }>;
  structuredData: {
    organization: any;
    website: any;
    softwareApplication: any;
    faqPage: any;
  };
  openGraph: {
    type: string;
    siteName: string;
    locale: string;
  };
  twitter: {
    card: string;
    site: string;
    creator: string;
  };
  keywordCategories: Record<string, string[]>;
  hreflang: Array<{
    lang: string;
    url: string;
  }>;
}

export interface ThemeConfig {
  colors: {
    primary: Record<string, string>;
    secondary: Record<string, string>;
    accent: Record<string, string>;
    neutral: Record<string, string>;
    success: Record<string, string>;
    warning: Record<string, string>;
    error: Record<string, string>;
    info: Record<string, string>;
  };
  gradients: Record<string, string>;
  typography: {
    fontFamily: {
      sans: string[];
      serif: string[];
      mono: string[];
    };
    fontSize: Record<string, string>;
    fontWeight: Record<string, number>;
    lineHeight: Record<string, number>;
  };
  spacing: {
    section: Record<string, string>;
    container: Record<string, string>;
    padding: Record<string, string>;
  };
  borderRadius: Record<string, string>;
  boxShadow: Record<string, string>;
  animation: {
    duration: Record<string, string>;
    easing: Record<string, string>;
    effects: Record<string, string>;
  };
  components: {
    button: Record<string, any>;
    card: Record<string, any>;
    input: Record<string, any>;
    badge: Record<string, any>;
  };
  layout: {
    header: Record<string, any>;
    footer: Record<string, any>;
    section: Record<string, any>;
  };
  breakpoints: Record<string, string>;
  zIndex: Record<string, number>;
}

// Hook for loading and managing site configuration
export const useSiteConfig = () => {
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [contentConfig, setContentConfig] = useState<ContentConfig | null>(null);
  const [seoConfig, setSeoConfig] = useState<SEOConfig | null>(null);
  const [themeConfig, setThemeConfig] = useState<ThemeConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadConfigs = async () => {
      try {
        setLoading(true);
        
        // 并行加载所有配置文件
        const [siteResponse, contentResponse, seoResponse, themeResponse] = await Promise.all([
          fetch('/config/site-config.json'),
          fetch('/config/content-config.json'),
          fetch('/config/seo-config.json'),
          fetch('/config/theme-config.json')
        ]);

        if (!siteResponse.ok || !contentResponse.ok || !seoResponse.ok || !themeResponse.ok) {
          throw new Error('Failed to load configuration files');
        }

        const [site, content, seo, theme] = await Promise.all([
          siteResponse.json(),
          contentResponse.json(),
          seoResponse.json(),
          themeResponse.json()
        ]);

        setSiteConfig(site);
        setContentConfig(content);
        setSeoConfig(seo);
        setThemeConfig(theme);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        console.error('Error loading site configuration:', err);
      } finally {
        setLoading(false);
      }
    };

    loadConfigs();
  }, []);

  return {
    siteConfig,
    contentConfig,
    seoConfig,
    themeConfig,
    loading,
    error,
    // 辅助方法
    isReady: !loading && !error && siteConfig && contentConfig && seoConfig && themeConfig
  };
};

// 获取特定页面的SEO配置
export const usePageSEO = (pageName: string) => {
  const { seoConfig } = useSiteConfig();
  
  if (!seoConfig) return null;
  
  const pageConfig = seoConfig.pages[pageName] || {};
  
  return {
    title: pageConfig.title || seoConfig.defaults.title,
    description: pageConfig.description || seoConfig.defaults.description,
    keywords: pageConfig.keywords || seoConfig.defaults.keywords,
    canonicalUrl: pageConfig.canonicalUrl,
    ogImage: pageConfig.ogImage || seoConfig.defaults.image,
    structuredData: seoConfig.structuredData
  };
};

// 获取主题颜色
export const useThemeColors = () => {
  const { themeConfig } = useSiteConfig();
  return themeConfig?.colors || null;
};

// 获取响应式断点
export const useBreakpoints = () => {
  const { themeConfig } = useSiteConfig();
  return themeConfig?.breakpoints || null;
};

export default useSiteConfig;