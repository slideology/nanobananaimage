import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const BlogPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Nano Banana AI Blog - AI Model Analysis Technology Insights';
  }, []);

  const blogPosts = [
    {
      id: 'ai-video-revolution',
      title: 'The AI Video Generation Revolution',
      excerpt: 'Discover how AI is transforming model analysis with Nano Banana AI technology.',
      date: '2024-01-15',
      category: 'Technology',
      image: '/images/nano-banana-ai/blog/ai-revolution.jpg'
    },
    {
      id: 'education-case-study',
      title: 'Transforming Education with AI Videos',
      excerpt: 'How universities use Nano Banana AI to improve research understanding.',
      date: '2024-01-12',
      category: 'Education',
      image: '/images/nano-banana-ai/blog/education.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">Nano Banana AI Blog</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Insights, tutorials, and case studies about AI-powered video generation technology
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-gray-900 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-2xl">📹</span>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-blue-400 text-sm font-medium">{post.category}</span>
                  <span className="text-gray-400 text-sm">{post.date}</span>
                </div>
                
                <h2 className="text-xl font-bold text-white mb-3 hover:text-blue-400 transition-colors">
                  <Link to={`/blog/${post.id}`}>
                    {post.title}
                  </Link>
                </h2>
                
                <p className="text-gray-300 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <Link 
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium"
                >
                  Read More
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-gray-300 mb-8">
            Get the latest insights about AI video generation technology
          </p>
          <Link 
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
          >
            Explore Nano Banana AI
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;