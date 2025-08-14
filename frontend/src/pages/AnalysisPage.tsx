import React from 'react';
import { Link } from 'react-router-dom';
import { useSiteConfig } from '../hooks/useSiteConfig';
import { useResponsive } from '../hooks/useResponsive';

/**
 * Nano-Banana AI Model Technical Analysis Page
 * 展示模型架构、技术创新和性能分析
 */
const AnalysisPage: React.FC = () => {
  const { contentConfig, siteConfig } = useSiteConfig();
  const { isMobile, isTablet } = useResponsive();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-amber-400 to-cyan-400 bg-clip-text text-transparent">
                Technical Analysis
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Deep dive into Nano-Banana's architecture, comparing it with existing models and exploring its innovative approaches to image generation.
            </p>
          </div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 border border-purple-600/20">
            <h2 className="text-3xl font-bold text-white mb-8">Model Architecture</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-amber-400 mb-4">Lightweight Design</h3>
                <p className="text-slate-300 mb-4">
                  Nano-Banana represents a significant advancement in lightweight AI model design, following Google's trend of creating efficient yet powerful models like Gemini Nano.
                </p>
                <ul className="text-slate-300 space-y-2">
                  <li>• Lightweight transformer architecture optimized for image generation</li>
                  <li>• Novel attention mechanisms for improved prompt understanding</li>
                  <li>• Efficient memory usage enabling complex scene generation</li>
                  <li>• Scalable design suitable for various deployment scenarios</li>
                </ul>
              </div>
              
              <div className="bg-slate-900/50 rounded-xl p-6 border border-purple-500/20">
                <h4 className="text-lg font-semibold text-purple-400 mb-4">Estimated Specifications</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Parameters:</span>
                    <span className="text-white">~7B (estimated)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Architecture:</span>
                    <span className="text-white">Optimized Transformer + Diffusion</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Inference Speed:</span>
                    <span className="text-white">&lt; 10s average</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Memory Usage:</span>
                    <span className="text-white">Optimized for efficiency</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Innovations */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Technical Innovations</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300">
              <h3 className="text-xl font-semibold text-amber-400 mb-4">Adversarial-Informed Training</h3>
              <p className="text-slate-300 mb-4">
                Building on the 2018 banana research, the model incorporates adversarial training to improve robustness and reduce misclassification errors.
              </p>
              <div className="text-sm text-amber-300">
                Impact: Enhanced object recognition and classification accuracy
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
              <h3 className="text-xl font-semibold text-purple-400 mb-4">Prompt-Scene Alignment</h3>
              <p className="text-slate-300 mb-4">
                Advanced alignment mechanisms ensure generated images accurately reflect complex textual descriptions with multiple elements.
              </p>
              <div className="text-sm text-purple-300">
                Impact: Superior prompt following compared to existing models
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
              <h3 className="text-xl font-semibold text-cyan-400 mb-4">Lightweight Generation Pipeline</h3>
              <p className="text-slate-300 mb-4">
                Optimized generation process that maintains quality while reducing computational requirements.
              </p>
              <div className="text-sm text-cyan-300">
                Impact: Faster inference and broader accessibility
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Benchmarks */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Performance Analysis</h2>
          
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 border border-purple-600/20">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">9.2/10</div>
                <div className="text-white font-semibold mb-1">Prompt Adherence</div>
                <div className="text-sm text-slate-400">vs DALL-E 3: 8.7/10</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-400 mb-2">8.9/10</div>
                <div className="text-white font-semibold mb-1">Image Quality</div>
                <div className="text-sm text-slate-400">vs Midjourney: 9.1/10</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">9.5/10</div>
                <div className="text-white font-semibold mb-1">Generation Speed</div>
                <div className="text-sm text-slate-400">Significantly faster</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">9.7/10</div>
                <div className="text-white font-semibold mb-1">Edit Capability</div>
                <div className="text-sm text-slate-400">"Amazing" feedback</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Model Comparison */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Architectural Comparison</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl border border-purple-600/20">
              <thead className="bg-slate-900/50">
                <tr>
                  <th className="text-left p-6 text-white font-semibold">Model</th>
                  <th className="text-left p-6 text-white font-semibold">Parameters</th>
                  <th className="text-left p-6 text-white font-semibold">Architecture</th>
                  <th className="text-left p-6 text-white font-semibold">Key Strengths</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-slate-600">
                  <td className="p-6 text-purple-400 font-semibold">Nano-Banana</td>
                  <td className="p-6 text-slate-300">~7B (est.)</td>
                  <td className="p-6 text-slate-300">Optimized Transformer + Diffusion</td>
                  <td className="p-6 text-slate-300">Lightweight, Efficient, Fast inference</td>
                </tr>
                <tr className="border-t border-slate-600">
                  <td className="p-6 text-slate-400">DALL-E 3</td>
                  <td className="p-6 text-slate-300">~5B</td>
                  <td className="p-6 text-slate-300">Transformer + Diffusion</td>
                  <td className="p-6 text-slate-300">Image quality, Safety features</td>
                </tr>
                <tr className="border-t border-slate-600">
                  <td className="p-6 text-slate-400">Midjourney v6</td>
                  <td className="p-6 text-slate-300">Undisclosed</td>
                  <td className="p-6 text-slate-300">Proprietary</td>
                  <td className="p-6 text-slate-300">Artistic quality, Style diversity</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Explore More Capabilities</h2>
          <p className="text-xl text-slate-300 mb-8">
            Discover the practical applications and real-world examples of Nano-Banana's advanced capabilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/capabilities"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-amber-500 rounded-lg hover:from-purple-700 hover:to-amber-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              View Capabilities
            </Link>
            <Link
              to="/benchmarks"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-purple-400 border-2 border-purple-400 rounded-lg hover:bg-purple-400 hover:text-white transition-all duration-200"
            >
              See Benchmarks
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnalysisPage; 