import React, { useEffect } from 'react';

/**
 * TwitterEmbeds Component - Embed Twitter content to display user feedback
 * 
 * Features:
 * 1. Dynamically load Twitter embed script
 * 2. Display user Twitter feedback for Nano Banana AI
 * 3. Provide social media interaction entry
 */
const TwitterEmbeds: React.FC = () => {
  useEffect(() => {
    // Dynamically load Twitter embed script
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    script.charset = 'utf-8';
    
    document.head.appendChild(script);
    
    return () => {
      // Clean up script
      const existingScript = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <section className="py-16 bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Share Your Experience with Nano Banana AI
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Love using Nano Banana AI? See what our users are saying on Twitter with #NanoBananaAI!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Twitter embed examples - Replace with real Twitter IDs in actual use */}
          
          {/* Twitter embed 1 - Educational user feedback */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">@</span>
              </div>
              <div>
                <h3 className="text-white font-semibold">@EduTechPro</h3>
                <p className="text-gray-400 text-sm">Education Technology Expert</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              "Nano Banana AI has revolutionized how we understand image generation models in our AI research. Students are absolutely amazed by the comprehensive analysis insights! #NanoBananaAI #AIResearch"
            </p>
            <div className="flex items-center space-x-4 text-gray-400 text-sm">
              <span>💙 127</span>
              <span>🔄 43</span>
              <span>💬 18</span>
            </div>
          </div>

          {/* Twitter embed 2 - Creator feedback */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">@</span>
              </div>
              <div>
                <h3 className="text-white font-semibold">@CreativeStudio</h3>
                <p className="text-gray-400 text-sm">Digital Artist</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              "Just discovered the most amazing AI model insights with Nano Banana AI! From basic concepts to deep technical understanding - mind blown! 🤯 #NanoBananaAI #AIResearch"
            </p>
            <div className="flex items-center space-x-4 text-gray-400 text-sm">
              <span>💙 89</span>
              <span>🔄 32</span>
              <span>💬 12</span>
            </div>
          </div>

          {/* Twitter embed 3 - Marketing expert feedback */}
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">@</span>
              </div>
              <div>
                <h3 className="text-white font-semibold">@MarketingGuru</h3>
                <p className="text-gray-400 text-sm">Marketing Strategist</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              "Our latest research paper using Nano Banana AI insights got 300% more citations than usual! The comprehensive analysis is absolutely amazing. Game changer! #NanoBananaAI #Research"
            </p>
            <div className="flex items-center space-x-4 text-gray-400 text-sm">
              <span>💙 156</span>
              <span>🔄 67</span>
              <span>💬 24</span>
            </div>
          </div>
        </div>

        {/* Social media call to action */}
        <div className="text-center mt-12">
          <p className="text-gray-300 mb-6">Join the conversation and share your Nano Banana AI research insights!</p>
          <div className="flex justify-center space-x-4">
            <a 
              href="https://twitter.com/intent/tweet?text=Check%20out%20my%20amazing%20AI%20research%20insights%20with%20Nano%20Banana%20AI!%20%23NanoBananaAI" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
            >
              Share on Twitter
            </a>
            <a 
              href="https://twitter.com/search?q=%23NanoBananaAI" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300"
            >
              View #NanoBananaAI
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwitterEmbeds;
