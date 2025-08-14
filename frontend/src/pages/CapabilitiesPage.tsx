import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSiteConfig } from '../hooks/useSiteConfig';
import { useResponsive } from '../hooks/useResponsive';

/**
 * Nano-Banana AI Capabilities Showcase Page
 * 展示图像生成能力、编辑功能和示例作品
 */
const CapabilitiesPage: React.FC = () => {
  const { contentConfig } = useSiteConfig();
  const { isMobile, isTablet } = useResponsive();
  const [activeCategory, setActiveCategory] = useState('all');

  const capabilities = [
    {
      id: 'macro',
      category: 'photorealistic',
      title: 'Surreal Macro Photography',
      description: 'Hyperrealistic macro photography of insects with crystalline features, demonstrating exceptional detail generation.',
      prompt: 'Hyperrealistic macro photography of a metallic blue beetle with crystalline wings perched on a dewdrop-covered flower petal, morning golden hour lighting',
      tags: ['Macro', 'Surreal', 'Photorealistic', 'Detail'],
      complexity: 'Advanced'
    },
    {
      id: 'scifi',
      category: 'complex-scenes',
      title: 'Science Fiction Landscapes',
      description: 'Complex futuristic cityscapes and alien environments generated in single prompts.',
      prompt: 'Vast alien cityscape with crystalline spires reaching into purple nebula skies, floating platforms connected by energy bridges',
      tags: ['Sci-Fi', 'Architecture', 'Atmospheric', 'Futuristic'],
      complexity: 'Expert'
    },
    {
      id: 'editing',
      category: 'image-editing',
      title: 'Advanced Image Editing',
      description: 'Sophisticated inpainting and outpainting examples that impressed community testers.',
      prompt: 'Seamless object removal and replacement with context-aware background generation',
      tags: ['Inpainting', 'Outpainting', 'Editing', 'Seamless'],
      complexity: 'Advanced'
    },
    {
      id: 'portraits',
      category: 'characters',
      title: 'Character Generation',
      description: 'High-quality character and portrait generation with consistent features and expressions.',
      prompt: 'Professional portrait of a cyberpunk character with neon-lit eyes and intricate facial tattoos',
      tags: ['Portraits', 'Characters', 'Consistent', 'Expression'],
      complexity: 'Advanced'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Capabilities', icon: '🎯' },
    { id: 'photorealistic', name: 'Photorealistic', icon: '📸' },
    { id: 'complex-scenes', name: 'Complex Scenes', icon: '🏙️' },
    { id: 'image-editing', name: 'Image Editing', icon: '✨' },
    { id: 'characters', name: 'Characters', icon: '👤' }
  ];

  const filteredCapabilities = activeCategory === 'all' 
    ? capabilities 
    : capabilities.filter(cap => cap.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-amber-400 to-cyan-400 bg-clip-text text-transparent">
                Nano-Banana Capabilities
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Explore the impressive range of image generation and editing capabilities that make Nano-Banana stand out in the AI model landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-purple-600 to-amber-500 text-white shadow-lg'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-600'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {filteredCapabilities.map((capability) => (
              <div
                key={capability.id}
                className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 border border-purple-600/20 hover:border-amber-500/40 transition-all duration-300 hover:transform hover:-translate-y-2"
              >
                <div className="mb-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-white">{capability.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      capability.complexity === 'Expert' 
                        ? 'bg-red-900/50 text-red-300 border border-red-500/30'
                        : 'bg-amber-900/50 text-amber-300 border border-amber-500/30'
                    }`}>
                      {capability.complexity}
                    </span>
                  </div>
                  <p className="text-slate-300 mb-4 leading-relaxed">
                    {capability.description}
                  </p>
                </div>

                {/* Placeholder for generated image */}
                <div className="bg-slate-900/50 rounded-xl p-8 mb-6 border border-purple-500/20">
                  <div className="aspect-video bg-gradient-to-br from-purple-900/30 via-slate-800 to-amber-900/30 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-4">🎨</div>
                      <div className="text-slate-400 text-sm">Generated Image Example</div>
                      <div className="text-purple-400 text-xs mt-2">[Placeholder]</div>
                    </div>
                  </div>
                </div>

                {/* Prompt */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-amber-400 mb-2">Example Prompt:</h4>
                  <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                    <p className="text-slate-300 text-sm italic">"{capability.prompt}"</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {capability.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-900/30 text-purple-300 text-sm rounded-full border border-purple-500/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Strengths */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Key Strengths</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 border border-purple-600/20">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-bold text-purple-400 mb-4">Single-Prompt Complexity</h3>
                <p className="text-slate-300">
                  Generate intricate scenes with multiple elements, detailed compositions, and complex interactions in a single prompt.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 border border-amber-600/20">
                <div className="text-4xl mb-4">✨</div>
                <h3 className="text-xl font-bold text-amber-400 mb-4">"Amazing" Editing</h3>
                <p className="text-slate-300">
                  Superior image editing capabilities including seamless inpainting, outpainting, and content-aware modifications.
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 border border-cyan-600/20">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-cyan-400 mb-4">Exceptional Prompt Following</h3>
                <p className="text-slate-300">
                  Remarkable ability to understand and execute complex textual descriptions with high accuracy and consistency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Performance Highlights</h2>
          
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 border border-purple-600/20">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">95%+</div>
                <div className="text-white font-semibold mb-2">Prompt Accuracy</div>
                <div className="text-sm text-slate-400">Complex instruction following</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-amber-400 mb-2">&lt; 10s</div>
                <div className="text-white font-semibold mb-2">Generation Speed</div>
                <div className="text-sm text-slate-400">Average generation time</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">4.8/5</div>
                <div className="text-white font-semibold mb-2">Image Quality</div>
                <div className="text-sm text-slate-400">Community rating</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">92%</div>
                <div className="text-white font-semibold mb-2">Edit Success</div>
                <div className="text-sm text-slate-400">Successful modifications</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Compare Performance</h2>
          <p className="text-xl text-slate-300 mb-8">
            See how Nano-Banana stacks up against other leading AI image generation models.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/benchmarks"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-amber-500 rounded-lg hover:from-purple-700 hover:to-amber-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              View Benchmarks
            </Link>
            <Link
              to="/research"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-purple-400 border-2 border-purple-400 rounded-lg hover:bg-purple-400 hover:text-white transition-all duration-200"
            >
              Research Findings
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CapabilitiesPage; 