import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { 
  Code, 
  Zap, 
  Shield, 
  Globe, 
  Settings, 
  Users, 
  CheckCircle, 
  ArrowRight, 
  Cpu, 
  Database, 
  Cloud, 
  Lock,
  Sparkles,
  Target,
  Layers,
  GitBranch
} from 'lucide-react';

/**
 * Qwen3-Coder 功能特性详细页面
 * 展示所有功能特性的详细信息和技术规格
 */
const FeaturesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('ai-generation');
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  // 功能分类数据
  const featureCategories = [
    {
      id: 'ai-generation',
      name: 'AI代码生成',
      icon: Sparkles,
      description: '智能代码生成核心功能'
    },
    {
      id: 'development-tools',
      name: '开发工具',
      icon: Code,
      description: '完整的开发工具链'
    },
    {
      id: 'integration',
      name: '集成能力',
      icon: Layers,
      description: '强大的系统集成功能'
    },
    {
      id: 'security',
      name: '安全保障',
      icon: Shield,
      description: '企业级安全防护'
    }
  ];

  // 详细功能数据
  const detailedFeatures = {
    'ai-generation': [
      {
        id: 'smart-completion',
        title: 'AI智能代码补全',
        description: '基于上下文的智能代码补全，支持多种编程语言和框架',
        icon: Target,
        features: [
          '实时代码建议',
          '上下文感知补全',
          '多语言支持',
          '框架特定优化'
        ],
        techSpecs: {
          '响应时间': '< 100ms',
          '准确率': '95%+',
          '支持语言': '20+',
          '框架支持': '50+'
        }
      },
      {
        id: 'code-generation',
        title: '自然语言转代码',
        description: '将自然语言描述转换为高质量的可执行代码',
        icon: Cpu,
        features: [
          '自然语言理解',
          '代码结构优化',
          '最佳实践应用',
          '注释自动生成'
        ],
        techSpecs: {
          '生成速度': '< 2s',
          '代码质量': 'A级',
          '语言覆盖': '15+',
          '成功率': '92%+'
        }
      },
      {
        id: 'refactoring',
        title: '智能代码重构',
        description: '自动识别代码问题并提供重构建议和实现',
        icon: GitBranch,
        features: [
          '代码异味检测',
          '性能优化建议',
          '结构重组',
          '安全漏洞修复'
        ],
        techSpecs: {
          '检测准确率': '98%+',
          '优化提升': '30%+',
          '支持模式': '100+',
          '自动化率': '85%+'
        }
      }
    ],
    'development-tools': [
      {
        id: 'multi-language',
        title: '多语言支持',
        description: '支持主流编程语言和最新技术栈',
        icon: Globe,
        features: [
          'JavaScript/TypeScript',
          'Python/Java/C++',
          'Go/Rust/Swift',
          'React/Vue/Angular'
        ],
        techSpecs: {
          '编程语言': '20+',
          '框架支持': '50+',
          '更新频率': '每月',
          '兼容性': '99%+'
        }
      },
      {
        id: 'real-time-collab',
        title: '实时协作开发',
        description: '支持团队实时协作和代码同步',
        icon: Users,
        features: [
          '实时代码同步',
          '冲突自动解决',
          '版本控制集成',
          '团队权限管理'
        ],
        techSpecs: {
          '同步延迟': '< 50ms',
          '并发用户': '1000+',
          '冲突解决': '自动',
          '数据一致性': '100%'
        }
      },
      {
        id: 'debugging',
        title: '智能调试助手',
        description: 'AI驱动的调试工具，快速定位和解决问题',
        icon: Settings,
        features: [
          '错误自动检测',
          '调试建议生成',
          '性能瓶颈分析',
          '测试用例生成'
        ],
        techSpecs: {
          '检测速度': '实时',
          '准确率': '94%+',
          '覆盖范围': '全栈',
          '修复建议': '智能'
        }
      }
    ],
    'integration': [
      {
        id: 'api-integration',
        title: 'API集成中心',
        description: '一键集成常用API和第三方服务',
        icon: Database,
        features: [
          '预置API模板',
          '自动认证配置',
          '数据格式转换',
          '错误处理机制'
        ],
        techSpecs: {
          'API数量': '500+',
          '集成时间': '< 5分钟',
          '成功率': '99%+',
          '维护状态': '自动'
        }
      },
      {
        id: 'cloud-deploy',
        title: '云端部署',
        description: '支持多云平台的一键部署和管理',
        icon: Cloud,
        features: [
          '多云平台支持',
          '自动扩缩容',
          '监控告警',
          '成本优化'
        ],
        techSpecs: {
          '云平台': 'AWS/Azure/GCP',
          '部署时间': '< 10分钟',
          '可用性': '99.9%+',
          '自动化': '完全'
        }
      },
      {
        id: 'database-ops',
        title: '数据库操作',
        description: '智能数据库设计和操作优化',
        icon: Database,
        features: [
          '数据库设计建议',
          'SQL查询优化',
          '数据迁移工具',
          '性能监控'
        ],
        techSpecs: {
          '数据库类型': '10+',
          '优化提升': '50%+',
          '迁移成功率': '99%+',
          '监控精度': '秒级'
        }
      }
    ],
    'security': [
      {
        id: 'code-security',
        title: '代码安全扫描',
        description: '全面的代码安全漏洞检测和修复',
        icon: Lock,
        features: [
          '漏洞自动检测',
          '安全修复建议',
          '合规性检查',
          '威胁情报集成'
        ],
        techSpecs: {
          '检测类型': '100+',
          '准确率': '96%+',
          '修复率': '90%+',
          '合规标准': '20+'
        }
      },
      {
        id: 'data-protection',
        title: '数据保护',
        description: '企业级数据加密和隐私保护',
        icon: Shield,
        features: [
          '端到端加密',
          '访问控制',
          '审计日志',
          '隐私合规'
        ],
        techSpecs: {
          '加密标准': 'AES-256',
          '访问控制': 'RBAC',
          '日志保留': '7年',
          '合规认证': 'SOC2/ISO27001'
        }
      },
      {
        id: 'enterprise-grade',
        title: '企业级安全',
        description: '满足企业级安全要求的完整解决方案',
        icon: Users,
        features: [
          'SSO单点登录',
          '多因子认证',
          '权限管理',
          '安全审计'
        ],
        techSpecs: {
          'SSO协议': 'SAML/OAuth',
          '认证方式': '10+',
          '权限粒度': '细粒度',
          '审计覆盖': '100%'
        }
      }
    ]
  };

  const currentFeatures = detailedFeatures[activeCategory as keyof typeof detailedFeatures] || [];

  return (
    <>
      <SEOHead 
        title="功能特性 - Qwen3-Coder"
        description="探索Qwen3-Coder的强大功能特性：AI代码生成、智能开发工具、系统集成和企业级安全保障。"
        type="website"
      />
      
      <div className="min-h-screen bg-gray-950 text-white">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-gray-900/20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                强大的
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  功能特性
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                探索Qwen3-Coder的完整功能生态系统，从AI代码生成到企业级安全保障，
                为您的开发工作流程提供全方位支持。
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to="/showcase" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                >
                  查看演示 <ArrowRight className="w-4 h-4" />
                </Link>
                <a 
                  href="https://pollo.ai?ref=ytayndd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-600 hover:border-blue-400 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-blue-600/10"
                >
                  立即体验
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {featureCategories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`p-6 rounded-xl transition-all duration-300 text-left ${
                      activeCategory === category.id
                        ? 'bg-blue-600 shadow-lg shadow-blue-600/25'
                        : 'bg-gray-800 hover:bg-gray-700'
                    }`}
                  >
                    <IconComponent className="w-8 h-8 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-300">{category.description}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Detailed Features */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {currentFeatures.map((feature) => {
                const IconComponent = feature.icon;
                const isActive = activeFeature === feature.id;
                
                return (
                  <div
                    key={feature.id}
                    className={`bg-gray-800 rounded-xl p-6 transition-all duration-300 cursor-pointer ${
                      isActive ? 'ring-2 ring-blue-400 shadow-lg shadow-blue-400/25' : 'hover:bg-gray-700'
                    }`}
                    onClick={() => setActiveFeature(isActive ? null : feature.id)}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-blue-600 rounded-lg">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{feature.title}</h3>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-6">{feature.description}</p>
                    
                    {/* Feature List */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-blue-400 mb-3">核心功能</h4>
                      <ul className="space-y-2">
                        {feature.features.map((item, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Tech Specs - Show when active */}
                    {isActive && (
                      <div className="border-t border-gray-700 pt-6">
                        <h4 className="text-sm font-semibold text-blue-400 mb-3">技术规格</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(feature.techSpecs).map(([key, value]) => (
                            <div key={key} className="text-sm">
                              <div className="text-gray-400">{key}</div>
                              <div className="font-semibold text-white">{value}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-4 text-sm text-blue-400">
                      {isActive ? '点击收起详情' : '点击查看技术规格'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Performance Metrics */}
        <section className="py-16 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">性能指标</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                我们的功能特性经过严格测试和优化，确保为您提供最佳的开发体验。
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">95%+</div>
                <div className="text-gray-300">代码生成准确率</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">&lt;100ms</div>
                <div className="text-gray-300">平均响应时间</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">99.9%</div>
                <div className="text-gray-300">系统可用性</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">50%+</div>
                <div className="text-gray-300">开发效率提升</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">准备好体验这些强大功能了吗？</h2>
              <p className="text-xl text-blue-100 mb-8">
                立即开始使用Qwen3-Coder，让AI为您的开发工作流程赋能。
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="https://pollo.ai?ref=ytayndd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                >
                  免费开始 <ArrowRight className="w-4 h-4" />
                </a>
                <Link 
                  to="/contact" 
                  className="border border-white/30 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-white/10"
                >
                  联系销售
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default FeaturesPage;