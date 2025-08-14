import React, { useRef, useEffect, useState } from 'react';
import { useMediaQuery } from '../hooks/useResponsive';

/**
 * Animation Enhancement Components
 * Animation enhancement component collection providing parallax scrolling, entrance animations, hover effects, etc.
 * Supports Task 2.3 interactive animation enhancement requirements
 */

// Parallax scrolling component
export const ParallaxContainer: React.FC<{
  children: React.ReactNode;
  speed?: number;
  className?: string;
}> = ({ children, speed = 0.5, className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * -speed;
      
      setOffset(rate);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, prefersReducedMotion]);

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        transform: prefersReducedMotion ? 'none' : `translateY(${offset}px)`
      }}
    >
      {children}
    </div>
  );
};

// Scroll-triggered animation component
export const ScrollReveal: React.FC<{
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}> = ({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 600,
  threshold = 0.1,
  className = '' 
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const getTransform = () => {
    if (prefersReducedMotion || isVisible) return 'none';
    
    switch (direction) {
      case 'up': return 'translateY(30px)';
      case 'down': return 'translateY(-30px)';
      case 'left': return 'translateX(30px)';
      case 'right': return 'translateX(-30px)';
      default: return 'none';
    }
  };

  const getOpacity = () => {
    if (prefersReducedMotion) return 1;
    return isVisible ? 1 : (direction === 'fade' ? 0 : 1);
  };

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        transform: getTransform(),
        opacity: getOpacity(),
        transition: prefersReducedMotion ? 'none' : `all ${duration}ms ease-out ${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

// Hover effect component
export const HoverEffect: React.FC<{
  children: React.ReactNode;
  effect?: 'scale' | 'lift' | 'glow' | 'rotate' | 'slide';
  intensity?: 'subtle' | 'medium' | 'strong';
  className?: string;
}> = ({ children, effect = 'scale', intensity = 'medium', className = '' }) => {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const getHoverClasses = () => {
    if (prefersReducedMotion) return '';

    const intensityMap = {
      subtle: { scale: 'hover:scale-102', lift: 'hover:-translate-y-1', glow: 'hover:shadow-lg', rotate: 'hover:rotate-1', slide: 'hover:translate-x-1' },
      medium: { scale: 'hover:scale-105', lift: 'hover:-translate-y-2', glow: 'hover:shadow-xl', rotate: 'hover:rotate-2', slide: 'hover:translate-x-2' },
      strong: { scale: 'hover:scale-110', lift: 'hover:-translate-y-3', glow: 'hover:shadow-2xl', rotate: 'hover:rotate-3', slide: 'hover:translate-x-3' }
    };

    return `transition-all duration-300 ease-out ${intensityMap[intensity][effect]}`;
  };

  return (
    <div className={`${getHoverClasses()} ${className}`}>
      {children}
    </div>
  );
};

// Pulse animation component
export const PulseAnimation: React.FC<{
  children: React.ReactNode;
  color?: string;
  duration?: number;
  className?: string;
}> = ({ children, color = 'blue', duration = 2000, className = '' }) => {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div 
      className={`relative ${className}`}
      style={{
        animation: `pulse-${color} ${duration}ms ease-in-out infinite`
      }}
    >
      {children}
      <style>{`
        @keyframes pulse-${color} {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
          }
        }
      `}</style>
    </div>
  );
};

// Typewriter effect component
export const TypewriterEffect: React.FC<{
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}> = ({ text, speed = 50, delay = 0, className = '', onComplete }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(text);
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else {
        onComplete?.();
      }
    }, currentIndex === 0 ? delay : speed);

    return () => clearTimeout(timer);
  }, [currentIndex, text, speed, delay, onComplete, prefersReducedMotion]);

  return (
    <span className={className}>
      {displayText}
      {!prefersReducedMotion && currentIndex < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
};

// Number counting animation component
export const CountUpAnimation: React.FC<{
  end: number;
  start?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}> = ({ 
  end, 
  start = 0, 
  duration = 2000, 
  decimals = 0, 
  prefix = '', 
  suffix = '', 
  className = '' 
}) => {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    if (prefersReducedMotion) {
      setCount(end);
      return;
    }

    const startTime = Date.now();
    const startValue = start;
    const endValue = end;
    const totalChange = endValue - startValue;

    const timer = setInterval(() => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Use easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = startValue + (totalChange * easeOutQuart);
      
      setCount(currentValue);
      
      if (progress >= 1) {
        clearInterval(timer);
        setCount(endValue);
      }
    }, 16); // 60fps

    return () => clearInterval(timer);
  }, [isVisible, start, end, duration, prefersReducedMotion]);

  return (
    <span ref={elementRef} className={className}>
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>
  );
};

// Floating animation component
export const FloatingAnimation: React.FC<{
  children: React.ReactNode;
  direction?: 'vertical' | 'horizontal' | 'both';
  intensity?: number;
  duration?: number;
  className?: string;
}> = ({ 
  children, 
  direction = 'vertical', 
  intensity = 10, 
  duration = 3000, 
  className = '' 
}) => {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const getAnimation = () => {
    switch (direction) {
      case 'vertical':
        return `float-vertical-${intensity}`;
      case 'horizontal':
        return `float-horizontal-${intensity}`;
      case 'both':
        return `float-both-${intensity}`;
      default:
        return 'none';
    }
  };

  return (
    <div 
      className={className}
      style={{
        animation: `${getAnimation()} ${duration}ms ease-in-out infinite`
      }}
    >
      {children}
      <style>{`
        @keyframes float-vertical-${intensity} {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-${intensity}px); }
        }
        @keyframes float-horizontal-${intensity} {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(${intensity}px); }
        }
        @keyframes float-both-${intensity} {
          0%, 100% { transform: translate(0px, 0px); }
          25% { transform: translate(${intensity}px, -${intensity}px); }
          50% { transform: translate(0px, -${intensity * 2}px); }
          75% { transform: translate(-${intensity}px, -${intensity}px); }
        }
      `}</style>
    </div>
  );
};

export default {
  ParallaxContainer,
  ScrollReveal,
  HoverEffect,
  PulseAnimation,
  TypewriterEffect,
  CountUpAnimation,
  FloatingAnimation
};