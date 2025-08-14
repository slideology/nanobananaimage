import React from 'react';
import SEOHead from '../components/SEOHead';
import { FileText, Users, Shield, AlertTriangle, Scale, Gavel } from 'lucide-react';

/**
 * 服务条款页面组件
 * 提供详细的服务使用条款和用户协议
 */
const TermsOfServicePage: React.FC = () => {
  return (
    <>
      {/* SEO 头部信息 */}
      <SEOHead
        title="Terms of Service - NANO BANANA AI"
        description="Read the terms and conditions for using NANO BANANA AI services. Our comprehensive terms of service outline user rights, responsibilities, and service guidelines."
        url="https://nanobananaimage.org/terms-of-service"
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
                  <FileText className="w-12 h-12 text-indigo-400" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Terms of Service
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Please read these terms carefully before using our services. By accessing NANO BANANA AI, you agree to these terms.
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
            
            {/* 服务接受部分 */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Users className="w-6 h-6 text-indigo-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">Acceptance of Terms</h2>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-800">
                <div className="space-y-4 text-slate-300">
                  <p>
                    By accessing and using NANO BANANA AI ("the Service"), you accept and agree to be bound by the terms 
                    and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                  </p>
                  <div className="bg-indigo-900/20 border border-indigo-800/30 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">Important Notice</h4>
                    <p className="text-sm">
                      These terms constitute a legally binding agreement between you and NANO BANANA AI. 
                      Please read them carefully and contact us if you have any questions.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 服务描述部分 */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Shield className="w-6 h-6 text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">Service Description</h2>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-800">
                <div className="space-y-4 text-slate-300">
                  <p>
                    NANO BANANA AI provides analysis and research tools for Google's unreleased image generation models. 
                    Our services include:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-white mb-3">Research Tools</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• AI model performance analysis</li>
                        <li>• Technical benchmarking</li>
                        <li>• Research documentation</li>
                        <li>• Comparative studies</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-3">Educational Content</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• Technical insights and tutorials</li>
                        <li>• Industry analysis</li>
                        <li>• Best practices guides</li>
                        <li>• Community discussions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 用户责任部分 */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <AlertTriangle className="w-6 h-6 text-yellow-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">User Responsibilities</h2>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-800">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Acceptable Use</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-green-900/20 border border-green-800/30 rounded-lg p-4">
                        <h4 className="font-semibold text-green-400 mb-2">✓ Allowed Activities</h4>
                        <ul className="space-y-1 text-sm text-slate-300">
                          <li>• Academic and research purposes</li>
                          <li>• Educational content creation</li>
                          <li>• Technical analysis and discussion</li>
                          <li>• Sharing insights with attribution</li>
                        </ul>
                      </div>
                      <div className="bg-red-900/20 border border-red-800/30 rounded-lg p-4">
                        <h4 className="font-semibold text-red-400 mb-2">✗ Prohibited Activities</h4>
                        <ul className="space-y-1 text-sm text-slate-300">
                          <li>• Commercial exploitation without permission</li>
                          <li>• Reverse engineering or hacking attempts</li>
                          <li>• Spreading misinformation</li>
                          <li>• Violating intellectual property rights</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Account Security</h3>
                    <ul className="space-y-2 text-slate-300">
                      <li>• You are responsible for maintaining the confidentiality of your account</li>
                      <li>• Notify us immediately of any unauthorized use</li>
                      <li>• Use strong passwords and enable two-factor authentication when available</li>
                      <li>• Do not share your account credentials with others</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* 知识产权部分 */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Scale className="w-6 h-6 text-cyan-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">Intellectual Property</h2>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-800">
                <div className="space-y-4 text-slate-300">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Our Content</h3>
                    <p>
                      All content, features, and functionality of NANO BANANA AI, including but not limited to text, 
                      graphics, logos, icons, images, audio clips, and software, are the exclusive property of 
                      NANO BANANA AI and are protected by copyright, trademark, and other intellectual property laws.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">User Content</h3>
                    <p>
                      You retain ownership of any content you submit to our service. However, by submitting content, 
                      you grant us a non-exclusive, worldwide, royalty-free license to use, modify, and display 
                      your content in connection with our services.
                    </p>
                  </div>
                  
                  <div className="bg-cyan-900/20 border border-cyan-800/30 rounded-lg p-4">
                    <h4 className="font-semibold text-cyan-400 mb-2">Research Attribution</h4>
                    <p className="text-sm">
                      When using our research findings or analysis in your work, please provide appropriate 
                      attribution to NANO BANANA AI and include a link to our website.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 免责声明部分 */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <AlertTriangle className="w-6 h-6 text-orange-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">Disclaimers & Limitations</h2>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-800">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Service Availability</h3>
                    <ul className="space-y-2 text-slate-300">
                      <li>• We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service</li>
                      <li>• Scheduled maintenance may temporarily affect service availability</li>
                      <li>• We reserve the right to modify or discontinue services with notice</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Information Accuracy</h3>
                    <ul className="space-y-2 text-slate-300">
                      <li>• Our analysis is based on available information and research</li>
                      <li>• We cannot guarantee the accuracy of all predictions or assessments</li>
                      <li>• Users should verify information independently for critical decisions</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-900/20 border border-orange-800/30 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-400 mb-2">Limitation of Liability</h4>
                    <p className="text-sm text-slate-300">
                      NANO BANANA AI shall not be liable for any indirect, incidental, special, consequential, 
                      or punitive damages resulting from your use of our services.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 服务修改部分 */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Gavel className="w-6 h-6 text-purple-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">Service Modifications</h2>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-800">
                <div className="space-y-4 text-slate-300">
                  <p>
                    We reserve the right to modify, suspend, or discontinue any part of our service at any time. 
                    We will provide reasonable notice of significant changes when possible.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-white mb-3">Types of Changes</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• Feature updates and improvements</li>
                        <li>• Security enhancements</li>
                        <li>• User interface modifications</li>
                        <li>• Terms and policy updates</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-3">Notification Methods</h4>
                      <ul className="space-y-2 text-sm">
                        <li>• Email notifications to registered users</li>
                        <li>• Website announcements</li>
                        <li>• In-app notifications</li>
                        <li>• Social media updates</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 争议解决部分 */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Scale className="w-6 h-6 text-green-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">Dispute Resolution</h2>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-800">
                <div className="space-y-4 text-slate-300">
                  <p>
                    We are committed to resolving any disputes fairly and efficiently. Please contact us first 
                    to attempt to resolve any issues informally.
                  </p>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-slate-800/50 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">Step 1: Direct Contact</h4>
                      <p className="text-sm">Reach out to our support team with your concern</p>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">Step 2: Mediation</h4>
                      <p className="text-sm">If needed, we'll engage in good faith mediation</p>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-2">Step 3: Arbitration</h4>
                      <p className="text-sm">Final resolution through binding arbitration</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 联系信息部分 */}
            <section className="mb-12">
              <div className="flex items-center mb-6">
                <Users className="w-6 h-6 text-indigo-400 mr-3" />
                <h2 className="text-2xl font-bold text-white">Contact Information</h2>
              </div>
              <div className="bg-slate-900/50 rounded-lg p-6 border border-slate-800">
                <div className="space-y-4 text-slate-300">
                  <p>
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-white mb-2">Legal Inquiries</h4>
                      <p>legal@nanobananaimage.org</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">General Support</h4>
                      <p>support@nanobananaimage.org</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 条款更新部分 */}
            <section className="mb-12">
              <div className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 rounded-lg p-6 border border-indigo-800/30">
                <h3 className="text-xl font-semibold text-white mb-4">Terms Updates</h3>
                <p className="text-slate-300">
                  We may update these Terms of Service from time to time. We will notify users of any material 
                  changes by posting the new Terms of Service on this page and updating the "Last updated" date. 
                  Your continued use of the service after any changes constitutes acceptance of the new terms.
                </p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfServicePage;