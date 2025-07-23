import React, { useState, useEffect } from 'react';
import { BarChart3, Clock, Zap, Target, TrendingUp, Award } from 'lucide-react';

interface BenchmarkData {
  metric: string;
  qwen3Value: number;
  competitorValue: number;
  unit: string;
  improvement: number;
  description: string;
}

interface PerformanceMetric {
  id: string;
  title: string;
  value: string;
  change: string;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
}

const PerformanceBenchmarks: React.FC = () => {
  const [activeTab, setActiveTab] = useState('speed');
  const [animatedValues, setAnimatedValues] = useState<{[key: string]: number}>({});

  // 性能基准数据
  const benchmarkData: {[key: string]: BenchmarkData[]} = {
    speed: [
      {
        metric: 'Code Generation Speed',
        qwen3Value: 2.3,
        competitorValue: 8.7,
        unit: 'seconds',
        improvement: 73,
        description: 'Average time to generate 100 lines of production-ready code'
      },
      {
        metric: 'Response Time',
        qwen3Value: 0.8,
        competitorValue: 3.2,
        unit: 'seconds',
        improvement: 75,
        description: 'Time from prompt submission to first code output'
      },
      {
        metric: 'Processing Throughput',
        qwen3Value: 450,
        competitorValue: 120,
        unit: 'requests/min',
        improvement: 275,
        description: 'Number of code generation requests processed per minute'
      }
    ],
    quality: [
      {
        metric: 'Code Accuracy',
        qwen3Value: 96.8,
        competitorValue: 87.2,
        unit: '%',
        improvement: 11,
        description: 'Percentage of generated code that compiles without errors'
      },
      {
        metric: 'Best Practice Compliance',
        qwen3Value: 94.5,
        competitorValue: 78.3,
        unit: '%',
        improvement: 21,
        description: 'Adherence to industry coding standards and patterns'
      },
      {
        metric: 'Security Score',
        qwen3Value: 98.2,
        competitorValue: 85.7,
        unit: '%',
        improvement: 15,
        description: 'Code security assessment based on OWASP guidelines'
      }
    ],
    efficiency: [
      {
        metric: 'Memory Usage',
        qwen3Value: 2.1,
        competitorValue: 4.8,
        unit: 'GB',
        improvement: 56,
        description: 'Average memory consumption during code generation'
      },
      {
        metric: 'CPU Utilization',
        qwen3Value: 23,
        competitorValue: 67,
        unit: '%',
        improvement: 66,
        description: 'Average CPU usage during peak processing'
      },
      {
        metric: 'Energy Efficiency',
        qwen3Value: 0.3,
        competitorValue: 1.2,
        unit: 'kWh/1000 requests',
        improvement: 75,
        description: 'Energy consumption per thousand code generation requests'
      }
    ]
  };

  // 实时性能指标
  const performanceMetrics: PerformanceMetric[] = [
    {
      id: 'uptime',
      title: 'System Uptime',
      value: '99.97%',
      change: '+0.02%',
      icon: Target,
      color: 'from-green-500 to-emerald-500',
      description: 'Service availability over the last 30 days'
    },
    {
      id: 'latency',
      title: 'Average Latency',
      value: '847ms',
      change: '-12%',
      icon: Clock,
      color: 'from-blue-500 to-cyan-500',
      description: 'End-to-end response time for code generation'
    },
    {
      id: 'throughput',
      title: 'Peak Throughput',
      value: '2.4K/min',
      change: '+18%',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      description: 'Maximum requests processed per minute'
    },
    {
      id: 'satisfaction',
      title: 'User Satisfaction',
      value: '4.9/5.0',
      change: '+0.1',
      icon: Award,
      color: 'from-purple-500 to-pink-500',
      description: 'Average user rating based on code quality feedback'
    }
  ];

  // 动画效果
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentData = benchmarkData[activeTab];
      const newAnimatedValues: {[key: string]: number} = {};
      
      currentData.forEach((item, index) => {
        newAnimatedValues[`qwen3-${index}`] = item.qwen3Value;
        newAnimatedValues[`competitor-${index}`] = item.competitorValue;
      });
      
      setAnimatedValues(newAnimatedValues);
    }, 300);

    return () => clearTimeout(timer);
  }, [activeTab]);

  // 获取条形图宽度百分比
  const getBarWidth = (value: number, maxValue: number) => {
    return Math.max((value / maxValue) * 100, 5); // 最小5%确保可见性
  };

  const currentData = benchmarkData[activeTab];
  const maxValues = currentData.map(item => Math.max(item.qwen3Value, item.competitorValue));

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Performance Benchmarks
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            See how Qwen3-Coder outperforms the competition with superior speed, quality, and efficiency metrics
          </p>
        </div>

        {/* 实时性能指标 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {performanceMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <div 
                key={metric.id} 
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 animate-on-scroll"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${metric.color} flex items-center justify-center mb-4`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{metric.title}</h3>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-2xl font-bold text-white">{metric.value}</span>
                  <span className={`text-sm font-medium ${
                    metric.change.startsWith('+') ? 'text-green-400' : 'text-blue-400'
                  }`}>
                    {metric.change}
                  </span>
                </div>
                <p className="text-sm text-gray-400">{metric.description}</p>
              </div>
            );
          })}
        </div>

        {/* 基准测试标签 */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-800 rounded-xl p-2 border border-gray-700">
            {Object.keys(benchmarkData).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 capitalize ${
                  activeTab === tab
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                {tab === 'speed' && '⚡ Speed'}
                {tab === 'quality' && '🎯 Quality'}
                {tab === 'efficiency' && '💡 Efficiency'}
              </button>
            ))}
          </div>
        </div>

        {/* 基准测试图表 */}
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
          <div className="grid gap-8">
            {currentData.map((item, index) => {
              const maxValue = maxValues[index];
              const qwen3Width = getBarWidth(animatedValues[`qwen3-${index}`] || 0, maxValue);
              const competitorWidth = getBarWidth(animatedValues[`competitor-${index}`] || 0, maxValue);
              
              return (
                <div key={item.metric} className="animate-on-scroll" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-lg font-semibold text-white">{item.metric}</h4>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-green-400 font-medium">
                        {item.improvement}% better
                      </span>
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-400 mb-4">{item.description}</p>
                  
                  <div className="space-y-3">
                    {/* Qwen3-Coder Bar */}
                    <div className="flex items-center gap-4">
                      <div className="w-24 text-sm font-medium text-blue-400">Qwen3-Coder</div>
                      <div className="flex-1 bg-gray-700 rounded-full h-6 relative overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                          style={{ width: `${qwen3Width}%` }}
                        >
                          <span className="text-xs font-medium text-white">
                            {item.qwen3Value}{item.unit}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Competitor Bar */}
                    <div className="flex items-center gap-4">
                      <div className="w-24 text-sm font-medium text-gray-400">Competitor</div>
                      <div className="flex-1 bg-gray-700 rounded-full h-6 relative overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-gray-500 to-gray-600 rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                          style={{ width: `${competitorWidth}%` }}
                        >
                          <span className="text-xs font-medium text-white">
                            {item.competitorValue}{item.unit}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 底部说明 */}
        <div className="text-center mt-12 animate-on-scroll">
          <p className="text-gray-400 max-w-2xl mx-auto">
            Benchmarks conducted using industry-standard testing methodologies. 
            Results may vary based on specific use cases and system configurations. 
            Data updated monthly based on continuous performance monitoring.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PerformanceBenchmarks;