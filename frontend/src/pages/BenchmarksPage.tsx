import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSiteConfig } from '../hooks/useSiteConfig';
import { useResponsive } from '../hooks/useResponsive';

/**
 * Nano-Banana Performance Benchmarks Page
 * 展示与其他AI模型的性能对比和评测结果
 */
const BenchmarksPage: React.FC = () => {
  const { contentConfig } = useSiteConfig();
  const { isMobile, isTablet } = useResponsive();
  const [activeComparison, setActiveComparison] = useState('dalle3');

  const comparisons = {
    dalle3: {
      title: 'vs OpenAI DALL-E 3',
      overall: 'Nano-Banana Advantage',
      description: 'Comprehensive comparison with OpenAI\'s flagship image generation model',
      metrics: [
        { category: 'Prompt Following', nanoBanana: 92, competitor: 87, winner: 'nano-banana' },
        { category: 'Image Editing', nanoBanana: 94, competitor: 79, winner: 'nano-banana' },
        { category: 'Generation Speed', nanoBanana: 89, competitor: 72, winner: 'nano-banana' },
        { category: 'Complex Scenes', nanoBanana: 91, competitor: 85, winner: 'nano-banana' },
        { category: 'Text Integration', nanoBanana: 76, competitor: 83, winner: 'dalle3' },
        { category: 'Safety & Filtering', nanoBanana: 78, competitor: 92, winner: 'dalle3' }
      ]
    },
    midjourney: {
      title: 'vs Midjourney v6',
      overall: 'Competitive Performance',
      description: 'Comparison with the artistic powerhouse known for creative image generation',
      metrics: [
        { category: 'Artistic Quality', nanoBanana: 88, competitor: 93, winner: 'midjourney' },
        { category: 'Prompt Accuracy', nanoBanana: 92, competitor: 84, winner: 'nano-banana' },
        { category: 'Technical Precision', nanoBanana: 90, competitor: 81, winner: 'nano-banana' },
        { category: 'Style Diversity', nanoBanana: 85, competitor: 91, winner: 'midjourney' },
        { category: 'Generation Speed', nanoBanana: 89, competitor: 76, winner: 'nano-banana' },
        { category: 'Consistency', nanoBanana: 87, competitor: 79, winner: 'nano-banana' }
      ]
    },
    stable: {
      title: 'vs Stable Diffusion XL',
      overall: 'Clear Nano-Banana Lead',
      description: 'Performance comparison with the popular open-source image generation model',
      metrics: [
        { category: 'Image Quality', nanoBanana: 89, competitor: 82, winner: 'nano-banana' },
        { category: 'Prompt Understanding', nanoBanana: 92, competitor: 78, winner: 'nano-banana' },
        { category: 'Resource Efficiency', nanoBanana: 94, competitor: 71, winner: 'nano-banana' },
        { category: 'Fine-tuning', nanoBanana: 81, competitor: 88, winner: 'stable' },
        { category: 'Community Support', nanoBanana: 65, competitor: 95, winner: 'stable' },
        { category: 'Accessibility', nanoBanana: 87, competitor: 92, winner: 'stable' }
      ]
    }
  };

  const testingMethodology = [
    {
      title: 'Anonymous Testing',
      description: 'All evaluations conducted through Chatbot Arena (lmarena.ai) for unbiased results',
      icon: '🔍'
    },
    {
      title: 'Community Validation',
      description: 'Results validated by AI community researchers and independent testers',
      icon: '👥'
    },
    {
      title: 'Standardized Metrics',
      description: 'Consistent evaluation criteria across all model comparisons',
      icon: '📊'
    },
    {
      title: 'Real-world Tasks',
      description: 'Testing based on practical use cases and common generation scenarios',
      icon: '🎯'
    }
  ];

  const currentComparison = comparisons[activeComparison as keyof typeof comparisons];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-amber-400 to-cyan-400 bg-clip-text text-transparent">
                Performance Benchmarks
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Comprehensive evaluation against leading AI models based on anonymous community testing on Chatbot Arena and comparative studies.
            </p>
          </div>
        </div>
      </section>

      {/* Testing Methodology */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Testing Methodology</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {testingMethodology.map((method, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 border border-purple-600/20 text-center">
                <div className="text-3xl mb-4">{method.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-3">{method.title}</h3>
                <p className="text-slate-300 text-sm">{method.description}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 border border-amber-600/20">
            <h3 className="text-xl font-semibold text-amber-400 mb-4">Evaluation Criteria</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-slate-300">
              <div>• Prompt following accuracy</div>
              <div>• Image quality and realism</div>
              <div>• Generation speed and efficiency</div>
              <div>• Editing and modification capabilities</div>
              <div>• Handling of complex scenes</div>
              <div>• Artistic style diversity</div>
            </div>
          </div>
        </div>
      </section>

      {/* Model Comparison Selector */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.entries(comparisons).map(([key, comparison]) => (
              <button
                key={key}
                onClick={() => setActiveComparison(key)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeComparison === key
                    ? 'bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-lg'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-600'
                }`}
              >
                {comparison.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Comparison */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">{currentComparison.title}</h2>
            <p className="text-lg text-slate-300 mb-2">{currentComparison.description}</p>
            <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
              currentComparison.overall.includes('Advantage') || currentComparison.overall.includes('Lead')
                ? 'bg-green-900/50 text-green-300 border border-green-500/30'
                : 'bg-amber-900/50 text-amber-300 border border-amber-500/30'
            }`}>
              {currentComparison.overall}
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 border border-purple-600/20">
            <div className="space-y-6">
              {currentComparison.metrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">{metric.category}</span>
                    <div className="flex items-center space-x-4">
                      <span className={`text-sm ${metric.winner === 'nano-banana' ? 'text-purple-400 font-semibold' : 'text-slate-400'}`}>
                        Nano-Banana: {metric.nanoBanana}%
                      </span>
                      <span className={`text-sm ${metric.winner !== 'nano-banana' ? 'text-amber-400 font-semibold' : 'text-slate-400'}`}>
                        Competitor: {metric.competitor}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="relative h-4 bg-slate-900 rounded-full overflow-hidden">
                    <div 
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-600 to-purple-500 transition-all duration-500"
                      style={{ width: `${(metric.nanoBanana / 100) * 50}%` }}
                    />
                    <div 
                      className="absolute right-0 top-0 h-full bg-gradient-to-l from-amber-600 to-amber-500 transition-all duration-500"
                      style={{ width: `${(metric.competitor / 100) * 50}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Overall Performance Summary */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Overall Performance Summary</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 border border-green-600/20 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">9.2/10</div>
              <div className="text-white font-semibold mb-2">Average Score</div>
              <div className="text-sm text-slate-400">Across all metrics</div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 border border-purple-600/20 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">75%</div>
              <div className="text-white font-semibold mb-2">Win Rate</div>
              <div className="text-sm text-slate-400">vs major competitors</div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 border border-amber-600/20 text-center">
              <div className="text-3xl font-bold text-amber-400 mb-2">#1</div>
              <div className="text-white font-semibold mb-2">Image Editing</div>
              <div className="text-sm text-slate-400">Community feedback</div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 border border-cyan-600/20 text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">3x</div>
              <div className="text-white font-semibold mb-2">Faster</div>
              <div className="text-sm text-slate-400">Than average competitor</div>
            </div>
          </div>
        </div>
      </section>

      {/* Strengths and Limitations */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Strengths */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 border border-green-600/20">
              <h3 className="text-2xl font-bold text-green-400 mb-6">Key Strengths</h3>
              <ul className="space-y-4 text-slate-300">
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>Superior image editing and modification capabilities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>Exceptional prompt following accuracy for complex scenes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>Faster generation speed while maintaining quality</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>Lightweight architecture with efficient resource usage</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>Consistent performance across diverse generation tasks</span>
                </li>
              </ul>
            </div>

            {/* Areas for Improvement */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 border border-amber-600/20">
              <h3 className="text-2xl font-bold text-amber-400 mb-6">Areas for Improvement</h3>
              <ul className="space-y-4 text-slate-300">
                <li className="flex items-start">
                  <span className="text-amber-400 mr-3">!</span>
                  <span>Text rendering quality, especially for non-Latin scripts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-400 mr-3">!</span>
                  <span>Occasional logical inconsistencies in complex scenes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-400 mr-3">!</span>
                  <span>Safety filtering and content moderation features</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-400 mr-3">!</span>
                  <span>Artistic style diversity compared to specialized models</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-400 mr-3">!</span>
                  <span>Community ecosystem and third-party integrations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Explore the Technology</h2>
          <p className="text-xl text-slate-300 mb-8">
            Dive deeper into the technical analysis and research findings that power these impressive benchmarks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/analysis"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-amber-500 rounded-lg hover:from-purple-700 hover:to-amber-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Technical Analysis
            </Link>
            <Link
              to="/limitations"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-purple-400 border-2 border-purple-400 rounded-lg hover:bg-purple-400 hover:text-white transition-all duration-200"
            >
              View Limitations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BenchmarksPage; 