import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Qwen3-Coder About Us Page
 * Introduction to Qwen3-Coder's mission, team and technology philosophy
 */
const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-earth-blue via-cosmic-purple to-stellar-silver py-20 overflow-hidden">
        <div className="absolute inset-0 bg-stars opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              关于我们
              <span className="text-gradient bg-gradient-to-r from-solar-gold to-stellar-silver bg-clip-text text-transparent block">
                重新定义编程体验
              </span>
            </h1>
            <p className="text-xl text-white/90 mb-8">
              我们是一群充满激情的技术创新者，致力于用AI技术重新定义编程体验的边界，
              让每个开发者都能享受智能化、高效率的代码创作过程。
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-space-dark mb-6">我们的故事</h2>
              <p className="text-xl text-gray-600">
                从一个大胆的想法到革命性的技术突破
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-space-dark mb-6">突破编程边界</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Qwen3-Coder诞生于一个简单而深刻的观察：开发者对代码复杂性的理解往往受到传统开发工具的限制。
                  我们想象，如果能创造一种技术，让任何编程想法都能无缝转化为高质量的代码实现，
                  这将为软件开发、教育和创新带来怎样的变革？
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  2024年，我们的团队开始了这个挑战。通过结合前沿的AI技术、自然语言处理和深度学习算法，
                  我们开发出了世界首个真正具备"Agentic编程"能力的AI系统。
                </p>
                <blockquote className="border-l-4 border-earth-blue pl-6 italic text-gray-600">
                  "我们相信最好的技术应该扩展人类的创造边界，而不仅仅是模仿现有的编程模式。"
                  <cite className="block mt-2 text-sm font-medium text-space-dark">- Qwen3-Coder 创始团队</cite>
                </blockquote>
              </div>
              
              <div className="bg-gradient-to-br from-earth-blue/5 to-cosmic-purple/5 rounded-2xl p-8">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-earth-blue to-cosmic-purple rounded-full flex items-center justify-center animate-float">
                    <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-space-dark mb-4">技术里程碑</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">概念验证</span>
                      <span className="text-earth-blue font-medium">2024年3月</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">核心算法突破</span>
                      <span className="text-cosmic-purple font-medium">2024年8月</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">平台正式发布</span>
                      <span className="text-solar-gold font-medium">2025年1月</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 bg-gradient-to-b from-earth-blue/5 to-cosmic-purple/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-space-dark mb-6">我们的使命</h2>
            <p className="text-xl text-gray-600 mb-12">
              通过AI技术革命性地改变编程体验，让每个开发者都能享受智能化、高效率的代码创作过程
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Mission 1 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-earth-blue/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-10 h-10 text-earth-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-space-dark mb-3">编程教育革新</h3>
                <p className="text-gray-600 text-sm">让复杂的编程概念变得直观易懂，提升学习效率和编程技能</p>
              </div>

              {/* Mission 2 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-cosmic-purple/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-10 h-10 text-cosmic-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-space-dark mb-3">创意实现</h3>
                <p className="text-gray-600 text-sm">为开发者和创作者提供新的代码表达维度，释放创造潜能</p>
              </div>

              {/* Mission 3 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-solar-gold/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-10 h-10 text-solar-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-space-dark mb-3">技术研究</h3>
                <p className="text-gray-600 text-sm">助力软件工程和算法研究的创新，推动技术边界的突破</p>
              </div>

              {/* Mission 4 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-stellar-silver/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-10 h-10 text-stellar-silver" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-space-dark mb-3">技术普惠</h3>
                <p className="text-gray-600 text-sm">让先进的AI编程技术惠及更多开发者，促进数字化平等</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-space-dark mb-6">核心团队</h2>
              <p className="text-xl text-gray-600">
                来自全球顶尖科技公司和研究机构的专家团队
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-earth-blue to-cosmic-purple rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-space-dark mb-2">AI研究团队</h3>
                <p className="text-cosmic-purple font-medium mb-3">人工智能专家</p>
                <p className="text-gray-600 text-sm">
                  来自斯坦福、MIT等顶尖机构的AI研究者，专精于自然语言处理和代码生成技术
                </p>
              </div>

              {/* Team Member 2 */}
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-cosmic-purple to-solar-gold rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-space-dark mb-2">产品设计团队</h3>
                <p className="text-solar-gold font-medium mb-3">用户体验专家</p>
                <p className="text-gray-600 text-sm">
                  丰富的开发者工具产品设计经验，致力于让复杂的AI技术变得简单易用
                </p>
              </div>

              {/* Team Member 3 */}
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-solar-gold to-earth-blue rounded-full flex items-center justify-center mb-6 mx-auto">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-space-dark mb-2">工程团队</h3>
                <p className="text-earth-blue font-medium mb-3">技术架构师</p>
                <p className="text-gray-600 text-sm">
                  来自Google、Apple等科技巨头的资深工程师，构建稳定可扩展的技术架构
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-to-b from-earth-blue/5 to-cosmic-purple/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-space-dark mb-6">我们的价值观</h2>
              <p className="text-xl text-gray-600">
                指引我们前进的核心原则
              </p>
            </div>

            <div className="space-y-8">
              {/* Value 1 */}
              <div className="card p-8 flex items-start space-x-6">
                <div className="w-16 h-16 bg-earth-blue/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-earth-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-space-dark mb-3">创新突破</h3>
                  <p className="text-gray-600">
                    我们始终追求技术突破，永不满足于现状，敢于挑战看似不可能的目标。
                    每一次创新都是为了让技术更好地服务于开发者的需求。
                  </p>
                </div>
              </div>

              {/* Value 2 */}
              <div className="card p-8 flex items-start space-x-6">
                <div className="w-16 h-16 bg-cosmic-purple/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-cosmic-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-space-dark mb-3">开发者优先</h3>
                  <p className="text-gray-600">
                    我们始终将开发者需求放在首位，致力于创造真正有价值的产品体验。
                    技术的复杂性应该隐藏在简单易用的界面背后。
                  </p>
                </div>
              </div>

              {/* Value 3 */}
              <div className="card p-8 flex items-start space-x-6">
                <div className="w-16 h-16 bg-solar-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-solar-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-space-dark mb-3">开放共享</h3>
                  <p className="text-gray-600">
                    我们相信知识和技术的力量在于分享。通过开放的态度和协作精神，
                    我们希望与全球的开发者、研究者和创作者一起推动技术进步。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-space-dark via-cosmic-purple to-earth-blue text-stellar-silver">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            加入我们的
            <span className="text-gradient bg-gradient-to-r from-solar-gold to-stellar-silver bg-clip-text text-transparent">探索之旅</span>
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            无论您是开发者、设计师、研究者还是创作者，我们都欢迎您加入 Qwen3-Coder 生态系统，
            一起探索AI编程技术的无限可能。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/resources" 
              className="btn-primary bg-gradient-to-r from-solar-gold to-earth-blue text-space-dark hover:from-solar-gold/90 hover:to-earth-blue/90 px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              获取开发资源
            </Link>
            
            <Link 
              to="/applications" 
              className="btn-secondary bg-transparent border-2 border-stellar-silver text-stellar-silver hover:bg-stellar-silver/10 px-8 py-3 rounded-full font-medium transition-all duration-300"
            >
              查看应用案例
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
