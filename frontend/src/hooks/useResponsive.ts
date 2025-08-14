import { useState, useEffect } from 'react';

/**
 * Responsive Design Hook
 * Responsive design hook that provides breakpoint detection, device type identification and other features
 * Supports Task 2.3 responsive design improvement requirements
 */

// Breakpoint definitions
export const breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const;

export type Breakpoint = keyof typeof breakpoints;

// Device types
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

// Screen orientation
export type Orientation = 'portrait' | 'landscape';

// Responsive state interface
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
 * Get current breakpoint
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
 * Get device type
 */
const getDeviceType = (width: number): DeviceType => {
  if (width < breakpoints.md) return 'mobile';
  if (width < breakpoints.lg) return 'tablet';
  return 'desktop';
};

/**
 * Get screen orientation
 */
const getOrientation = (width: number, height: number): Orientation => {
  return width > height ? 'landscape' : 'portrait';
};

/**
 * Detect if it's a touch device
 */
const isTouchDevice = (): boolean => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

/**
 * Responsive design hook
 */
export const useResponsive = (): ResponsiveState => {
  const [state, setState] = useState<ResponsiveState>(() => {
    // Server-side rendering compatibility handling
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
      // Debounce handling to avoid frequent updates
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
 * Breakpoint matching hook
 * @param breakpoint Target breakpoint
 * @param direction Matching direction: 'up' means greater than or equal, 'down' means less than or equal, 'only' means exact match
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
 * Media query hook
 * @param query CSS media query string
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
 * Viewport size hook
 */
export const useViewport = () => {
  const { width, height } = useResponsive();
  return { width, height };
};

/**
 * Device detection hook
 */
export const useDevice = () => {
  const { deviceType, isTouch, pixelRatio, orientation } = useResponsive();
  return { deviceType, isTouch, pixelRatio, orientation };
};

export default useResponsive;