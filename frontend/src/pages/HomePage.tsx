import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSiteConfig } from '../hooks/useSiteConfig';
import { useResponsive } from '../hooks/useResponsive';

/**
 * Nano Banana AI Homepage
 * 展示Google未公开的Nano-Banana AI图像生成模型分析
 */
const HomePage: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const { contentConfig, siteConfig, loading, error, isReady } = useSiteConfig();
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const [scrollY, setScrollY] = useState(0);
  
  // Scroll listener for parallax effects
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-amber-400 to-cyan-400 bg-clip-text text-transparent">
                Nano•Banana
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-slate-300 mb-8 font-light">
              Google's Unreleased AI Image Generation Model
            </p>
            <p className="text-lg text-slate-400 max-w-4xl mx-auto leading-relaxed mb-12">
              Comprehensive analysis of the speculative Nano-Banana AI model. Discover revolutionary image generation capabilities, 
              technical insights, and performance benchmarks of Google's mysterious lightweight model.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link
                to="/analysis"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-amber-500 rounded-lg hover:from-purple-700 hover:to-amber-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Explore Analysis
              </Link>
              <Link
                to="/capabilities"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-purple-400 border-2 border-purple-400 rounded-lg hover:bg-purple-400 hover:text-white transition-all duration-200"
              >
                View Capabilities
              </Link>
            </div>

            {/* Feature Badges */}
            <div className="flex flex-wrap justify-center gap-4">
              {['Lightweight Architecture', 'Advanced Image Generation', 'Superior Editing Capabilities', 'Anonymous Community Tested'].map((badge, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-slate-800/50 border border-purple-500/30 rounded-full text-sm text-purple-300 backdrop-blur-sm"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Floating particles animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-amber-400 rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animation: 'float 6s ease-in-out infinite'
              }}
            />
          ))}
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Revolutionary AI Model Capabilities
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Discover what makes Nano-Banana a breakthrough in image generation technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 border border-purple-600/20 hover:border-amber-500/40 transition-all duration-300 hover:transform hover:-translate-y-2">
              <div className="text-4xl mb-6">🔬</div>
              <h3 className="text-2xl font-bold text-white mb-4">Nano Architecture</h3>
              <p className="text-slate-300 mb-6">
                Inspired by Google's Gemini Nano, this lightweight model delivers powerful image generation with optimized resource usage.
              </p>
              <ul className="text-slate-400 space-y-2">
                <li>• Optimized Resource Usage</li>
                <li>• Scalable Deployment</li>
                <li>• Edge Computing Ready</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 border border-purple-600/20 hover:border-amber-500/40 transition-all duration-300 hover:transform hover:-translate-y-2">
              <div className="text-4xl mb-6">🎨</div>
              <h3 className="text-2xl font-bold text-white mb-4">Complex Scene Generation</h3>
              <p className="text-slate-300 mb-6">
                Exceptional ability to generate intricate scenes in single prompts, from surreal macro photography to sci-fi landscapes.
              </p>
              <ul className="text-slate-400 space-y-2">
                <li>• Single-Prompt Complexity</li>
                <li>• Photorealistic Details</li>
                <li>• Creative Composition</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 border border-purple-600/20 hover:border-amber-500/40 transition-all duration-300 hover:transform hover:-translate-y-2">
              <div className="text-4xl mb-6">✨</div>
              <h3 className="text-2xl font-bold text-white mb-4">"Amazing" Image Editing</h3>
              <p className="text-slate-300 mb-6">
                Community testers report superior image editing capabilities compared to OpenAI models, excelling in inpainting and outpainting.
              </p>
              <ul className="text-slate-400 space-y-2">
                <li>• Advanced Inpainting</li>
                <li>• Seamless Outpainting</li>
                <li>• Content-Aware Editing</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 border border-purple-600/20 hover:border-amber-500/40 transition-all duration-300 hover:transform hover:-translate-y-2">
              <div className="text-4xl mb-6">🎯</div>
              <h3 className="text-2xl font-bold text-white mb-4">Exceptional Prompt Following</h3>
              <p className="text-slate-300 mb-6">
                Demonstrates remarkable ability to understand and execute complex textual descriptions with high accuracy.
              </p>
              <ul className="text-slate-400 space-y-2">
                <li>• Complex Instruction Understanding</li>
                <li>• Multi-Element Consistency</li>
                <li>• Style Preservation</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 border border-purple-600/20 hover:border-amber-500/40 transition-all duration-300 hover:transform hover:-translate-y-2">
              <div className="text-4xl mb-6">🍌</div>
              <h3 className="text-2xl font-bold text-white mb-4">"Banana" Legacy</h3>
              <p className="text-slate-300 mb-6">
                Named after the 2018 Google research where AI misidentified bananas as toasters, symbolizing evolution from recognition errors to generation mastery.
              </p>
              <ul className="text-slate-400 space-y-2">
                <li>• Adversarial Research Foundation</li>
                <li>• Recognition to Generation Evolution</li>
                <li>• Google AI Heritage</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 border border-purple-600/20 hover:border-amber-500/40 transition-all duration-300 hover:transform hover:-translate-y-2">
              <div className="text-4xl mb-6">👥</div>
              <h3 className="text-2xl font-bold text-white mb-4">Community Validated</h3>
              <p className="text-slate-300 mb-6">
                Tested anonymously on Chatbot Arena (lmarena.ai) by the AI community, receiving praise for exceptional performance.
              </p>
              <ul className="text-slate-400 space-y-2">
                <li>• Anonymous Community Testing</li>
                <li>• Chatbot Arena Validation</li>
                <li>• Peer Recognition</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Highlights */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Performance Highlights</h2>
            <p className="text-xl text-slate-300">Impressive metrics from community testing and analysis</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 border border-purple-600/20">
                <div className="text-4xl font-bold text-purple-400 mb-2">95%+</div>
                <div className="text-white font-semibold mb-2">Prompt Accuracy</div>
                <div className="text-sm text-slate-400">Complex instruction following</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 border border-amber-600/20">
                <div className="text-4xl font-bold text-amber-400 mb-2">&lt; 10s</div>
                <div className="text-white font-semibold mb-2">Generation Speed</div>
                <div className="text-sm text-slate-400">Average generation time</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 border border-cyan-600/20">
                <div className="text-4xl font-bold text-cyan-400 mb-2">4.8/5</div>
                <div className="text-white font-semibold mb-2">Image Quality</div>
                <div className="text-sm text-slate-400">Community rating</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-8 border border-green-600/20">
                <div className="text-4xl font-bold text-green-400 mb-2">92%</div>
                <div className="text-white font-semibold mb-2">Edit Success</div>
                <div className="text-sm text-slate-400">Successful modifications</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Section - Nano Banana AI Generated Examples */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-amber-400 to-cyan-400 bg-clip-text text-transparent">
                Generated Examples
              </span>
            </h2>
            <p className="text-xl text-slate-300 mb-4">
              Explore real image generation examples from Nano-Banana AI model
            </p>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
              These images showcase the model's capabilities in creating diverse, high-quality content across different styles and subjects.
            </p>
          </div>

          {/* Image Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[
              {
                src: '/images/nano-banana-new-image-model-examples-v0-0uypne6v8uif1.webp',
                alt: 'Nano Banana AI Generated Image Example 1',
                title: 'Creative Composition'
              },
              {
                src: '/images/nano-banana-new-image-model-examples-v0-c8b9mo2b7uif1.webp',
                alt: 'Nano Banana AI Generated Image Example 2',
                title: 'Artistic Style'
              },
              {
                src: '/images/nano-banana-new-image-model-examples-v0-df0pa95b8uif1.webp',
                alt: 'Nano Banana AI Generated Image Example 3',
                title: 'Detailed Rendering'
              },
              {
                src: '/images/nano-banana-new-image-model-examples-v0-f6benr39auif1.webp',
                alt: 'Nano Banana AI Generated Image Example 4',
                title: 'Complex Scene'
              },
              {
                src: '/images/nano-banana-new-image-model-examples-v0-gioq3ao79uif1.webp',
                alt: 'Nano Banana AI Generated Image Example 5',
                title: 'Visual Storytelling'
              },
              {
                src: '/images/nano-banana-new-image-model-examples-v0-o7dv8xyx9uif1.webp',
                alt: 'Nano Banana AI Generated Image Example 6',
                title: 'Photorealistic Quality'
              },
              {
                src: '/images/nano-banana-new-image-model-examples-v0-ve4kg44rauif1.webp',
                alt: 'Nano Banana AI Generated Image Example 7',
                title: 'Innovative Design'
              }
            ].map((image, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl overflow-hidden border border-purple-600/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold text-sm mb-1">{image.title}</h3>
                    <p className="text-slate-300 text-xs">Generated by Nano-Banana AI</p>
                  </div>
                </div>
                {/* Hover overlay with gradient border effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 via-amber-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* Gallery Footer */}
          <div className="text-center mt-12">
            <p className="text-slate-400 mb-6">
              These examples demonstrate Nano-Banana AI's versatility in generating high-quality images across various styles and subjects.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['High Resolution', 'Diverse Styles', 'Prompt Accuracy', 'Creative Freedom'].map((feature, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-slate-800/50 border border-amber-500/30 rounded-full text-sm text-amber-300 backdrop-blur-sm"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-300">Everything you need to know about Nano-Banana AI research</p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "What is Google's Nano-Banana AI model?",
                answer: "Nano-Banana is reportedly Google's unreleased text-to-image AI model, discovered through anonymous community testing. It combines lightweight architecture (inspired by 'Nano' like Gemini Nano) with advanced image generation capabilities. The name references Google's 2018 adversarial attack research involving banana misclassification."
              },
              {
                question: "How was Nano-Banana discovered?",
                answer: "Nano-Banana was discovered through anonymous testing on Chatbot Arena (lmarena.ai), where AI community members test models without knowing their identity. Testers began noticing exceptional performance in image generation and editing tasks."
              },
              {
                question: "How does Nano-Banana compare to other AI models?",
                answer: "Based on community testing, Nano-Banana demonstrates superior image editing capabilities compared to OpenAI models, with 'amazing' inpainting and outpainting quality. It excels in complex scene generation from single prompts and shows exceptional prompt-following accuracy."
              },
              {
                question: "What are Nano-Banana's known limitations?",
                answer: "Current limitations include occasional logical inconsistencies (like impossible geographical features), physics violations in fluid dynamics, and text rendering challenges (particularly with non-Latin scripts). These issues are similar to other current generation models."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl border border-purple-600/20">
                <button
                  className="w-full px-8 py-6 text-left focus:outline-none"
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                    <span className="text-purple-400 text-2xl">
                      {openFAQ === index ? '−' : '+'}
                    </span>
                  </div>
                </button>
                {openFAQ === index && (
                  <div className="px-8 pb-6">
                    <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl p-12 border border-purple-600/20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Explore the Future of AI Image Generation
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Dive deeper into Nano-Banana's capabilities and research findings
            </p>
            <p className="text-slate-400 mb-12 max-w-2xl mx-auto">
              Join the research community in analyzing this breakthrough AI model. Explore technical analysis, 
              performance benchmarks, and the fascinating evolution from adversarial vulnerabilities to generation mastery.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/analysis"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-amber-500 rounded-lg hover:from-purple-700 hover:to-amber-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                View Technical Analysis
              </Link>
              <Link
                to="/capabilities"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-purple-400 border-2 border-purple-400 rounded-lg hover:bg-purple-400 hover:text-white transition-all duration-200"
              >
                See Capabilities
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
              <span>✓ Comprehensive model analysis</span>
              <span>✓ Performance benchmarks vs leading models</span>
              <span>✓ Historical research context</span>
              <span>✓ Community testing insights</span>
            </div>
          </div>
        </div>
      </section>

      {/* CSS for animations is handled in index.css */}
    </div>
  );
};

export default HomePage;
