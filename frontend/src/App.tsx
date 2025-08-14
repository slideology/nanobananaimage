import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AffiliateBanner from './components/AffiliateBanner';
import SEOHead from './components/SEOHead';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AnalysisPage from './pages/AnalysisPage';
import CapabilitiesPage from './pages/CapabilitiesPage';
import BenchmarksPage from './pages/BenchmarksPage';
import NotFoundPage from './pages/NotFoundPage';

// Retained page imports
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <SEOHead />
      <AffiliateBanner />
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="/capabilities" element={<CapabilitiesPage />} />
          <Route path="/benchmarks" element={<BenchmarksPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Blog functionality retained */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:postId" element={<BlogPostPage />} />

          {/* Legacy redirects for SEO */}
          <Route path="/features" element={<AnalysisPage />} />
          <Route path="/showcase" element={<CapabilitiesPage />} />
          <Route path="/docs" element={<BenchmarksPage />} />

          {/* Placeholder pages */}
          <Route path="/research" element={<div className="min-h-screen bg-slate-950 text-white flex items-center justify-center"><div className="text-center"><h1 className="text-4xl font-bold mb-4">Research Findings</h1><p className="text-slate-400">Coming Soon</p></div></div>} />
          <Route path="/limitations" element={<div className="min-h-screen bg-slate-950 text-white flex items-center justify-center"><div className="text-center"><h1 className="text-4xl font-bold mb-4">Technical Limitations</h1><p className="text-slate-400">Coming Soon</p></div></div>} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
