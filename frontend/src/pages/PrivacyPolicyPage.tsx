import React from 'react';
import SEOHead from '../components/SEOHead';
import { Shield, Eye, Lock, Database, UserCheck, Mail } from 'lucide-react';

/**
 * 隐私政策页面组件
 * 提供详细的隐私保护政策和数据处理说明
 */
const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      {/* SEO 头部信息 */}
      <SEOHead
        title="Privacy Policy - NANO BANANA AI"
        description="Learn about how NANO BANANA AI protects your privacy and handles your data. Our comprehensive privacy policy explains our data collection, usage, and protection practices."
        url="https://nanobananaimage.org/privacy-policy"
        type="article"
      />

      {/* 页面主体内容 */}
      <div className="min-h-screen bg-slate-950 text-white">
        {/* 页面头部区域 */}
        <div className="bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-cyan-900/20 py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-indigo-600/20 rounded-full">
                  <Shield className="w-12 h-12 text-indigo-400" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Privacy Policy
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Your privacy is important to us. This policy explains how we collect, use, and protect your information.
              </p>
              <div className="mt-6 text-sm text-slate-400">
                Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>
          </div>
        </div>

        {/* 主要内容区域 */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="prose prose-invert prose-lg max-w-none">
            
            {/* 信息收集部分 */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Eye className="w-6 h-6 text-indigo-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">Information We Collect</h2>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-800">
                <h3 className="text-xl font-semibold text-white mb-4">Personal Information</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• Email address (when you contact us or subscribe to updates)</li>
                  <li>• Name and contact information (when provided voluntarily)</li>
                  <li>• Communication preferences</li>
                </ul>
                
                <h3 className="text-xl font-semibold text-white mb-4 mt-6">Usage Information</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• Pages visited and time spent on our website</li>
                  <li>• Browser type, device information, and IP address</li>
                  <li>• Referral sources and search terms used</li>
                  <li>• Interaction with our AI model analysis tools</li>
                </ul>
              </div>
            </section>

            {/* 信息使用部分 */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Database className="w-6 h-6 text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">How We Use Your Information</h2>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-800">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Service Improvement</h3>
                    <ul className="space-y-2 text-slate-300 text-sm">
                      <li>• Enhance user experience</li>
                      <li>• Improve AI model analysis accuracy</li>
                      <li>• Develop new features</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Communication</h3>
                    <ul className="space-y-2 text-slate-300 text-sm">
                      <li>• Respond to inquiries</li>
                      <li>• Send important updates</li>
                      <li>• Provide technical support</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* 数据保护部分 */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Lock className="w-6 h-6 text-cyan-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">Data Protection & Security</h2>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-800">
                <div className="space-y-4 text-slate-300">
                  <p>
                    We implement industry-standard security measures to protect your personal information:
                  </p>
                  <ul className="space-y-2">
                    <li>• <strong>Encryption:</strong> All data transmission is encrypted using SSL/TLS</li>
                    <li>• <strong>Access Control:</strong> Limited access to personal data on a need-to-know basis</li>
                    <li>• <strong>Regular Audits:</strong> Periodic security assessments and updates</li>
                    <li>• <strong>Data Minimization:</strong> We only collect data necessary for our services</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 用户权利部分 */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <UserCheck className="w-6 h-6 text-green-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">Your Rights</h2>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-800">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Data Access & Control</h3>
                    <ul className="space-y-2 text-slate-300 text-sm">
                      <li>• Request access to your personal data</li>
                      <li>• Correct inaccurate information</li>
                      <li>• Delete your personal data</li>
                      <li>• Export your data</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Communication Preferences</h3>
                    <ul className="space-y-2 text-slate-300 text-sm">
                      <li>• Opt-out of marketing communications</li>
                      <li>• Update contact preferences</li>
                      <li>• Withdraw consent</li>
                      <li>• File complaints with authorities</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Cookies 和追踪部分 */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Eye className="w-6 h-6 text-yellow-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">Cookies & Tracking</h2>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-800">
                <div className="space-y-4 text-slate-300">
                  <p>
                    We use cookies and similar technologies to improve your experience:
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-slate-800/50 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">Essential Cookies</h4>
                      <p className="text-sm">Required for basic website functionality</p>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">Analytics Cookies</h4>
                      <p className="text-sm">Help us understand how you use our site</p>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">Preference Cookies</h4>
                      <p className="text-sm">Remember your settings and preferences</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 联系信息部分 */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Mail className="w-6 h-6 text-indigo-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">Contact Us</h2>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-800">
                <div className="space-y-4 text-slate-300">
                  <p>
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-white mb-2">Email</h4>
                      <p>privacy@nanobananaimage.org</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">Response Time</h4>
                      <p>We typically respond within 48 hours</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 政策更新部分 */}
            <section className="mb-12">
              <div className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 rounded-lg p-6 border border-indigo-800/30">
                <h3 className="text-xl font-semibold text-white mb-4">Policy Updates</h3>
                <p className="text-slate-300">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes 
                  by posting the new Privacy Policy on this page and updating the "Last updated" date. 
                  We encourage you to review this Privacy Policy periodically.
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicyPage;