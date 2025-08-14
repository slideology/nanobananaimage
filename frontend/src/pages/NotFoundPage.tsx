import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* 404 Image */}
        <div className="mb-8 flex justify-center">
          <img 
            src="/images/placeholders/404-totoro-300x200.svg" 
            alt="404 Error" 
            className="w-64 h-auto"
          />
        </div>
        
        {/* 404 Text */}
        <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
        
        {/* Description */}
        <p className="text-gray-600 mb-8">
          The page you're looking for seems to have disappeared into the infinite AI research! Don't worry, you can return to the homepage to continue exploring Nano Banana AI.
        </p>
        
        {/* Back to Home Button */}
        <Link 
          to="/" 
          className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Back to Home
        </Link>
        
        {/* Decorative Elements - Footprints */}
        <div className="mt-12 flex justify-center space-x-4">
          <div className="w-4 h-4 rounded-full bg-gray-300"></div>
          <div className="w-4 h-4 rounded-full bg-gray-300"></div>
          <div className="w-4 h-4 rounded-full bg-gray-300"></div>
          <div className="w-4 h-4 rounded-full bg-gray-300"></div>
          <div className="w-4 h-4 rounded-full bg-gray-300"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
