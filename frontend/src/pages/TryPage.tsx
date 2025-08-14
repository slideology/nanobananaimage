import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

/**
 * Nano Banana AI Online Demo Page
 * Embedded analysis platform for live demonstration
 */
const TryPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Main Content: Only iframe, no extra header */}
      <div className="flex-1 relative" style={{paddingTop: 0}}>
        {/* Loading Overlay */}
        <div className="absolute inset-0 bg-gray-950 flex items-center justify-center z-10" id="loading-overlay">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <p className="text-gray-300">Loading Nano Banana AI analysis environment...</p>
          </div>
        </div>
        {/* Iframe Container: full height minus nav */}
        <div className="relative w-full" style={{height: 'calc(100vh - 64px)', marginTop: 0}}>
          <iframe
            src="https://nanobanana-ai-analysis.hf.space/"
            className="w-full h-full border-0"
            title="Nano Banana AI Analysis Demo"
            onLoad={() => {
              const overlay = document.getElementById('loading-overlay');
              if (overlay) overlay.style.display = 'none';
            }}
            onError={() => {
              const overlay = document.getElementById('loading-overlay');
              if (overlay) {
                overlay.innerHTML = `
                  <div class=\"text-center\">
                    <div class=\"text-red-400 mb-4\">
                      <svg class=\"w-12 h-12 mx-auto\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
                        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z\"></path>
                      </svg>
                    </div>
                    <p class=\"text-gray-300 mb-4\">Failed to load. Please check your network connection.</p>
                    <button onclick=\"window.location.reload()\" class=\"px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors\">
                      Reload
                    </button>
                  </div>
                `;
              }
            }}
          />
        </div>
        {/* Floating Back Button */}
        <Link
          to="/"
          className="fixed left-6 bottom-6 z-20 flex items-center px-4 py-2 bg-gray-900/90 hover:bg-gray-800 text-white rounded-full shadow-lg transition-colors"
          style={{boxShadow: '0 2px 8px rgba(0,0,0,0.15)'}}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </Link>
      </div>
      {/* Footer Info Bar */}
      <div className="bg-gray-900 border-t border-gray-800 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center space-x-4">
              <span>🔗 Official Demo</span>
              <span>•</span>
              <span>⚡ Real-time AI Code Generation</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>🛡️ Secure Environment</span>
              <span>•</span>
              <span>📱 Responsive Design</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryPage;