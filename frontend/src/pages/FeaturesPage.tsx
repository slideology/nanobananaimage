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
 * Nano Banana AI Features Detail Page
 * Comprehensive display of all analysis features and capabilities
 */
const FeaturesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('ai-generation');
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  // Feature category data
  const featureCategories = [
    {
      id: 'ai-generation',
      name: 'AI Code Generation',
      icon: Sparkles,
      description: 'Core intelligent code generation features'
    },
    {
      id: 'development-tools',
      name: 'Development Tools',
      icon: Code,
      description: 'Complete development toolchain'
    },
    {
      id: 'integration',
      name: 'Integration Capabilities',
      icon: Layers,
      description: 'Powerful system integration features'
    },
    {
      id: 'security',
      name: 'Security Assurance',
      icon: Shield,
      description: 'Enterprise-grade security protection'
    }
  ];

  // Detailed feature data
  const detailedFeatures = {
    'ai-generation': [
      {
        id: 'smart-completion',
        title: 'AI Smart Code Completion',
        description: 'Context-based intelligent code completion supporting multiple programming languages and frameworks',
        icon: Target,
        features: [
          'Real-time code suggestions',
          'Context-aware completion',
          'Multi-language support',
          'Framework-specific optimization'
        ],
        techSpecs: {
          'Response Time': '< 100ms',
          'Accuracy': '95%+',
          'Supported Languages': '20+',
          'Framework Support': '50+'
        }
      },
      {
        id: 'code-generation',
        title: 'Natural Language to Code',
        description: 'Convert natural language descriptions into high-quality executable code',
        icon: Cpu,
        features: [
          'Natural language understanding',
          'Code structure optimization',
          'Best practices application',
          'Automatic comment generation'
        ],
        techSpecs: {
          'Generation Speed': '< 2s',
          'Code Quality': 'A-grade',
          'Language Coverage': '15+',
          'Success Rate': '92%+'
        }
      },
      {
        id: 'refactoring',
        title: 'Intelligent Code Refactoring',
        description: 'Automatically identify code issues and provide refactoring suggestions and implementations',
        icon: GitBranch,
        features: [
          'Code smell detection',
          'Performance optimization suggestions',
          'Structure reorganization',
          'Security vulnerability fixes'
        ],
        techSpecs: {
          'Detection Accuracy': '98%+',
          'Optimization Improvement': '30%+',
          'Supported Patterns': '100+',
          'Automation Rate': '85%+'
        }
      }
    ],
    'development-tools': [
      {
        id: 'multi-language',
        title: 'Multi-Language Support',
        description: 'Support for mainstream programming languages and latest technology stacks',
        icon: Globe,
        features: [
          'JavaScript/TypeScript',
          'Python/Java/C++',
          'Go/Rust/Swift',
          'React/Vue/Angular'
        ],
        techSpecs: {
          'Programming Languages': '20+',
          'Framework Support': '50+',
          'Update Frequency': 'Monthly',
          'Compatibility': '99%+'
        }
      },
      {
        id: 'real-time-collab',
        title: 'Real-time Collaborative Development',
        description: 'Support for team real-time collaboration and code synchronization',
        icon: Users,
        features: [
          'Real-time code sync',
          'Automatic conflict resolution',
          'Version control integration',
          'Team permission management'
        ],
        techSpecs: {
          'Sync Latency': '< 50ms',
          'Concurrent Users': '1000+',
          'Conflict Resolution': 'Automatic',
          'Data Consistency': '100%'
        }
      },
      {
        id: 'debugging',
        title: 'Intelligent Debugging Assistant',
        description: 'AI-driven debugging tools for quick problem identification and resolution',
        icon: Settings,
        features: [
          'Automatic error detection',
          'Debug suggestion generation',
          'Performance bottleneck analysis',
          'Test case generation'
        ],
        techSpecs: {
          'Detection Speed': 'Real-time',
          'Accuracy': '94%+',
          'Coverage': 'Full-stack',
          'Fix Suggestions': 'Intelligent'
        }
      }
    ],
    'integration': [
      {
        id: 'api-integration',
        title: 'API Integration Center',
        description: 'One-click integration with popular APIs and third-party services',
        icon: Database,
        features: [
          'Pre-built API templates',
          'Automatic authentication setup',
          'Data format conversion',
          'Error handling mechanisms'
        ],
        techSpecs: {
          'API Count': '500+',
          'Integration Time': '< 5 minutes',
          'Success Rate': '99%+',
          'Maintenance': 'Automatic'
        }
      },
      {
        id: 'cloud-deploy',
        title: 'Cloud Deployment',
        description: 'One-click deployment and management across multiple cloud platforms',
        icon: Cloud,
        features: [
          'Multi-cloud platform support',
          'Auto-scaling',
          'Monitoring and alerts',
          'Cost optimization'
        ],
        techSpecs: {
          'Cloud Platforms': 'AWS/Azure/GCP',
          'Deployment Time': '< 10 minutes',
          'Availability': '99.9%+',
          'Automation': 'Complete'
        }
      },
      {
        id: 'database-ops',
        title: 'Database Operations',
        description: 'Intelligent database design and operation optimization',
        icon: Database,
        features: [
          'Database design recommendations',
          'SQL query optimization',
          'Data migration tools',
          'Performance monitoring'
        ],
        techSpecs: {
          'Database Types': '10+',
          'Optimization Improvement': '50%+',
          'Migration Success Rate': '99%+',
          'Monitoring Precision': 'Second-level'
        }
      }
    ],
    'security': [
      {
        id: 'code-security',
        title: 'Code Security Scanning',
        description: 'Comprehensive code security vulnerability detection and remediation',
        icon: Lock,
        features: [
          'Automatic vulnerability detection',
          'Security fix recommendations',
          'Compliance checking',
          'Threat intelligence integration'
        ],
        techSpecs: {
          'Detection Types': '100+',
          'Accuracy': '96%+',
          'Fix Rate': '90%+',
          'Compliance Standards': '20+'
        }
      },
      {
        id: 'data-protection',
        title: 'Data Protection',
        description: 'Enterprise-grade data encryption and privacy protection',
        icon: Shield,
        features: [
          'End-to-end encryption',
          'Access control',
          'Audit logging',
          'Privacy compliance'
        ],
        techSpecs: {
          'Encryption Standard': 'AES-256',
          'Access Control': 'RBAC',
          'Log Retention': '7 years',
          'Compliance Certifications': 'SOC2/ISO27001'
        }
      },
      {
        id: 'enterprise-grade',
        title: 'Enterprise-Grade Security',
        description: 'Complete solution meeting enterprise-level security requirements',
        icon: Users,
        features: [
          'SSO single sign-on',
          'Multi-factor authentication',
          'Permission management',
          'Security auditing'
        ],
        techSpecs: {
          'SSO Protocols': 'SAML/OAuth',
          'Authentication Methods': '10+',
          'Permission Granularity': 'Fine-grained',
          'Audit Coverage': '100%'
        }
      }
    ]
  };

  const currentFeatures = detailedFeatures[activeCategory as keyof typeof detailedFeatures] || [];

  return (
    <>
      <SEOHead 
        title="Features - Nano Banana AI"
        description="Explore Nano Banana AI's comprehensive analysis features: model architecture insights, performance benchmarks, training methodologies, and research findings."
        type="website"
      />
      
      <div className="min-h-screen bg-gray-950 text-white">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-gray-900/20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Powerful
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Features
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Explore Nano Banana AI's complete analysis ecosystem, from model architecture to performance insights,
                providing comprehensive support for your development workflow.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to="/showcase" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                >
                  View Demo <ArrowRight className="w-4 h-4" />
                </Link>
                <a 
                  href="https://pollo.ai/ai-image-generator?ref=ytayndd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-600 hover:border-blue-400 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-blue-600/10"
                >
                  Try Now
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
                      <h4 className="text-sm font-semibold text-blue-400 mb-3">Core Features</h4>
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
                        <h4 className="text-sm font-semibold text-blue-400 mb-3">Technical Specifications</h4>
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
                      {isActive ? 'Click to collapse details' : 'Click to view technical specs'}
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
              <h2 className="text-3xl font-bold mb-4">Performance Metrics</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Our features have been rigorously tested and optimized to ensure the best development experience for you.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-400 mb-2">95%+</div>
                <div className="text-gray-300">Code Generation Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">&lt;100ms</div>
                <div className="text-gray-300">Average Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">99.9%</div>
                <div className="text-gray-300">System Availability</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">50%+</div>
                <div className="text-gray-300">Development Efficiency Improvement</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Experience These Powerful Features?</h2>
              <p className="text-xl text-blue-100 mb-8">
                Start exploring Nano Banana AI analysis now and gain unprecedented insights into Google's latest AI innovation.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a 
                  href="https://pollo.ai/ai-image-generator?ref=ytayndd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                >
                  Start Free <ArrowRight className="w-4 h-4" />
                </a>
                <Link 
                  to="/contact" 
                  className="border border-white/30 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:bg-white/10"
                >
                  Contact Sales
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