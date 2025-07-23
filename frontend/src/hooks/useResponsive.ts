import { useState, useEffect } from 'react';

/**
 * Responsive Design Hook
 * 响应式设计钩子，提供断点检测、设备类型识别等功能
 * 支持Task 2.3的响应式设计改进需求
 */

// 断点定义
export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const;

export type Breakpoint = keyof typeof breakpoints;

// 设备类型
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

// 屏幕方向
export type Orientation = 'portrait' | 'landscape';

// 响应式状态接口
export interface ResponsiveState {
  width: number;
  height: number;
  breakpoint: Breakpoint;
  deviceType: DeviceType;
  orientation: Orientation;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouch: boolean;
  pixelRatio: number;
}

/**
 * 获取当前断点
 */
const getCurrentBreakpoint = (width: number): Breakpoint => {
  if (width >= breakpoints['2xl']) return '2xl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  return 'xs';
};

/**
 * 获取设备类型
 */
const getDeviceType = (width: number): DeviceType => {
  if (width < breakpoints.md) return 'mobile';
  if (width < breakpoints.lg) return 'tablet';
  return 'desktop';
};

/**
 * 获取屏幕方向
 */
const getOrientation = (width: number, height: number): Orientation => {
  return width > height ? 'landscape' : 'portrait';
};

/**
 * 检测是否为触摸设备
 */
const isTouchDevice = (): boolean => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

/**
 * 响应式设计钩子
 */
export const useResponsive = (): ResponsiveState => {
  const [state, setState] = useState<ResponsiveState>(() => {
    // 服务端渲染兼容性处理
    if (typeof window === 'undefined') {
      return {
        width: 1024,
        height: 768,
        breakpoint: 'lg',
        deviceType: 'desktop',
        orientation: 'landscape',
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isTouch: false,
        pixelRatio: 1
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const breakpoint = getCurrentBreakpoint(width);
    const deviceType = getDeviceType(width);
    const orientation = getOrientation(width, height);
    const isTouch = isTouchDevice();
    const pixelRatio = window.devicePixelRatio || 1;

    return {
      width,
      height,
      breakpoint,
      deviceType,
      orientation,
      isMobile: deviceType === 'mobile',
      isTablet: deviceType === 'tablet',
      isDesktop: deviceType === 'desktop',
      isTouch,
      pixelRatio
    };
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      // 防抖处理，避免频繁更新
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const breakpoint = getCurrentBreakpoint(width);
        const deviceType = getDeviceType(width);
        const orientation = getOrientation(width, height);
        const isTouch = isTouchDevice();
        const pixelRatio = window.devicePixelRatio || 1;

        setState({
          width,
          height,
          breakpoint,
          deviceType,
          orientation,
          isMobile: deviceType === 'mobile',
          isTablet: deviceType === 'tablet',
          isDesktop: deviceType === 'desktop',
          isTouch,
          pixelRatio
        });
      }, 100);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return state;
};

/**
 * 断点匹配钩子
 * @param breakpoint 目标断点
 * @param direction 匹配方向：'up' 表示大于等于，'down' 表示小于等于，'only' 表示仅匹配
 */
export const useBreakpoint = (
  breakpoint: Breakpoint,
  direction: 'up' | 'down' | 'only' = 'up'
): boolean => {
  const { width } = useResponsive();
  const targetWidth = breakpoints[breakpoint];

  switch (direction) {
    case 'up':
      return width >= targetWidth;
    case 'down':
      return width <= targetWidth;
    case 'only':
      const breakpointKeys = Object.keys(breakpoints) as Breakpoint[];
      const currentIndex = breakpointKeys.indexOf(breakpoint);
      const nextBreakpoint = breakpointKeys[currentIndex + 1];
      const nextWidth = nextBreakpoint ? breakpoints[nextBreakpoint] : Infinity;
      return width >= targetWidth && width < nextWidth;
    default:
      return false;
  }
};

/**
 * 媒体查询钩子
 * @param query CSS媒体查询字符串
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    setMatches(mediaQuery.matches);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
};

/**
 * 视口尺寸钩子
 */
export const useViewport = () => {
  const { width, height } = useResponsive();
  return { width, height };
};

/**
 * 设备检测钩子
 */
export const useDevice = () => {
  const { deviceType, isTouch, pixelRatio, orientation } = useResponsive();
  return { deviceType, isTouch, pixelRatio, orientation };
};

export default useResponsive;