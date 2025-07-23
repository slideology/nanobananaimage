import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AffiliateBanner from './components/AffiliateBanner';
import SEOHead from './components/SEOHead';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ShowcasePage from './pages/ShowcasePage';
import FeaturesPage from './pages/FeaturesPage';
import DocsPage from './pages/DocsPage';
import NotFoundPage from './pages/NotFoundPage';

// 保留的页面引入
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <SEOHead />
      <AffiliateBanner />
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/showcase" element={<ShowcasePage />} />
          <Route path="/docs" element={<DocsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* 博客功能保留 */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:postId" element={<BlogPostPage />} />

          {/* 其他功能页面（如需要） */}
          <Route path="/pricing" element={<div className="min-h-screen bg-gray-950 text-white flex items-center justify-center"><div className="text-center"><h1 className="text-4xl font-bold mb-4">Pricing</h1><p className="text-gray-400">Coming Soon</p></div></div>} />
          <Route path="/privacy-policy" element={<div className="min-h-screen bg-gray-950 text-white flex items-center justify-center"><div className="text-center"><h1 className="text-4xl font-bold mb-4">Privacy Policy</h1><p className="text-gray-400">Coming Soon</p></div></div>} />
          <Route path="/terms-of-service" element={<div className="min-h-screen bg-gray-950 text-white flex items-center justify-center"><div className="text-center"><h1 className="text-4xl font-bold mb-4">Terms of Service</h1><p className="text-gray-400">Coming Soon</p></div></div>} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
