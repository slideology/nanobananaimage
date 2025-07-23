import React from 'react';

/**
 * Loading States Component
 * 加载状态组件，提供多种加载状态的UI展示
 * 包含骨架屏、加载动画、错误状态等，提升用户体验
 */

// 骨架屏组件
export const SkeletonLoader: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-gray-700 rounded-md h-4 w-3/4 mb-2"></div>
      <div className="bg-gray-700 rounded-md h-4 w-1/2 mb-2"></div>
      <div className="bg-gray-700 rounded-md h-4 w-5/6"></div>
    </div>
  );
};

// 卡片骨架屏
export const CardSkeleton: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 animate-pulse">
      <div className="bg-gray-700 rounded-md h-6 w-1/3 mb-4"></div>
      <div className="space-y-2">
        <div className="bg-gray-700 rounded-md h-4 w-full"></div>
        <div className="bg-gray-700 rounded-md h-4 w-4/5"></div>
        <div className="bg-gray-700 rounded-md h-4 w-3/5"></div>
      </div>
      <div className="mt-4 bg-gray-700 rounded-md h-10 w-24"></div>
    </div>
  );
};

// 加载旋转器
export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg 
        className="animate-spin text-blue-500" 
        fill="none" 
        viewBox="0 0 24 24"
        aria-label="加载中"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
};

// 脉冲加载动画
export const PulseLoader: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex space-x-2 ${className}`}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"
          style={{
            animationDelay: `${i * 0.2}s`,
            animationDuration: '1.4s'
          }}
        />
      ))}
    </div>
  );
};

// 进度条组件
export const ProgressBar: React.FC<{ 
  progress: number; 
  className?: string;
  showPercentage?: boolean;
}> = ({ progress, className = '', showPercentage = false }) => {
  const clampedProgress = Math.max(0, Math.min(100, progress));
  
  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-400">加载进度</span>
        {showPercentage && (
          <span className="text-sm text-gray-400">{Math.round(clampedProgress)}%</span>
        )}
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${clampedProgress}%` }}
          role="progressbar"
          aria-valuenow={clampedProgress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};

// 错误状态组件
export const ErrorState: React.FC<{ 
  message?: string;
  onRetry?: () => void;
  className?: string;
}> = ({ 
  message = '加载失败，请重试', 
  onRetry,
  className = '' 
}) => {
  return (
    <div className={`text-center py-8 ${className}`}>
      <div className="mb-4">
        <svg 
          className="w-16 h-16 text-red-500 mx-auto" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" 
          />
        </svg>
      </div>
      <p className="text-gray-400 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          重试
        </button>
      )}
    </div>
  );
};

// 空状态组件
export const EmptyState: React.FC<{ 
  message?: string;
  action?: React.ReactNode;
  className?: string;
}> = ({ 
  message = '暂无数据', 
  action,
  className = '' 
}) => {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="mb-4">
        <svg 
          className="w-16 h-16 text-gray-500 mx-auto" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" 
          />
        </svg>
      </div>
      <p className="text-gray-500 mb-4">{message}</p>
      {action}
    </div>
  );
};

// 页面加载覆盖层
export const PageLoader: React.FC<{ 
  isLoading: boolean;
  message?: string;
}> = ({ isLoading, message = '页面加载中...' }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-gray-800 rounded-xl p-8 shadow-2xl border border-gray-700">
        <div className="flex flex-col items-center space-y-4">
          <LoadingSpinner size="lg" />
          <p className="text-gray-300 text-lg">{message}</p>
        </div>
      </div>
    </div>
  );
};

// 懒加载包装器
export const LazyWrapper: React.FC<{
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}> = ({ children, fallback = <CardSkeleton />, className = '' }) => {
  return (
    <div className={className}>
      <React.Suspense fallback={fallback}>
        {children}
      </React.Suspense>
    </div>
  );
};

export default {
  SkeletonLoader,
  CardSkeleton,
  LoadingSpinner,
  PulseLoader,
  ProgressBar,
  ErrorState,
  EmptyState,
  PageLoader,
  LazyWrapper
};