import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { Code, Play, Star, Users, Zap, CheckCircle, ArrowRight, Github, ExternalLink } from 'lucide-react';

/**
 * Qwen3-Coder 项目展示页面
 * 展示实际项目案例、代码生成演示和用户成功案例
 */
const ShowcasePage: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // 项目案例数据
  const showcaseProjects = [
    {
      id: 1,
      title: '电商平台后端API',
      description: '使用Qwen3-Coder生成完整的电商平台RESTful API，包括用户管理、商品管理、订单处理等核心功能。',
      tech: ['Node.js', 'Express', 'MongoDB', 'JWT'],
      image: '/images/showcase/ecommerce-api.jpg',
      demoUrl: 'https://demo.qwen3coder.com/ecommerce',
      githubUrl: 'https://github.com/qwen3coder/ecommerce-api',
      stats: {
        linesOfCode: '2,500+',
        timeReduced: '85%',
        testCoverage: '95%'
      },
      features: [
        '自动生成CRUD操作',
        '智能数据验证',
        '安全认证机制',
        '完整的API文档'
      ]
    },
    {
      id: 2,
      title: 'React管理后台',
      description: '基于React和TypeScript的现代化管理后台系统，包含数据可视化、权限管理、实时通知等功能。',
      tech: ['React', 'TypeScript', 'Ant Design', 'Chart.js'],
      image: '/images/showcase/admin-dashboard.jpg',
      demoUrl: 'https://demo.qwen3coder.com/admin',
      githubUrl: 'https://github.com/qwen3coder/admin-dashboard',
      stats: {
        linesOfCode: '3,200+',
        timeReduced: '78%',
        testCoverage: '92%'
      },
      features: [
        '响应式设计',
        '组件化架构',
        '状态管理优化',
        '性能监控集成'
      ]
    },
    {
      id: 3,
      title: '微服务架构',
      description: '企业级微服务架构解决方案，包含服务发现、负载均衡、熔断器、分布式追踪等核心组件。',
      tech: ['Spring Boot', 'Docker', 'Kubernetes', 'Redis'],
      image: '/images/showcase/microservices.jpg',
      demoUrl: 'https://demo.qwen3coder.com/microservices',
      githubUrl: 'https://github.com/qwen3coder/microservices',
      stats: {
        linesOfCode: '5,000+',
        timeReduced: '90%',
        testCoverage: '88%'
      },
      features: [
        '服务自动发现',
        '智能负载均衡',
        '分布式配置管理',
        '实时监控告警'
      ]
    }
  ];

  // 代码生成演示数据
  const codeDemos = [
    {
      title: 'REST API 生成',
      description: '输入数据模型，自动生成完整的REST API',
      input: `// 用户模型定义
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}`,
      output: `// 自动生成的用户API控制器
@Controller('/api/users')
export class UserController {
  @Get()
  async getUsers(): Promise<User[]> {
    return await this.userService.findAll();
  }
  
  @Post()
  async createUser(@Body() userData: CreateUserDto): Promise<User> {
    return await this.userService.create(userData);
  }
  
  @Get('/:id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return await this.userService.findById(id);
  }
}`
    },
    {
      title: 'React组件生成',
      description: '描述UI需求，生成完整的React组件',
      input: `// 需求描述
创建一个用户卡片组件，显示用户头像、姓名、邮箱和角色，
支持编辑和删除操作，使用Tailwind CSS样式`,
      output: `// 自动生成的用户卡片组件
interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-4">
        <img 
          src={user.avatar || '/default-avatar.png'} 
          alt={user.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
          <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
            {user.role}
          </span>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => onEdit(user)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded"
          >
            编辑
          </button>
          <button 
            onClick={() => onDelete(user.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded"
          >
            删除
          </button>
        </div>
      </div>
    </div>
  );
};`
    },
    {
      title: '数据库模型生成',
      description: '根据业务需求生成数据库模型和迁移文件',
      input: `// 业务需求
电商系统需要商品管理功能，包含商品基本信息、
分类、库存、价格等字段，支持多规格商品`,
      output: `// 自动生成的商品模型
@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 200 })
  name: string;

  @Column('text')
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('int')
  stock: number;

  @ManyToOne(() => Category, category => category.products)
  category: Category;

  @OneToMany(() => ProductVariant, variant => variant.product)
  variants: ProductVariant[];

  @Column({ type: 'json', nullable: true })
  images: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}`
    }
  ];

  // 用户成功案例
  const successStories = [
    {
      name: '张伟',
      role: '全栈开发工程师',
      company: '某互联网公司',
      avatar: '/images/testimonials/zhang-wei.jpg',
      story: '使用Qwen3-Coder后，我的开发效率提升了3倍。原本需要一周完成的功能，现在2天就能搞定，而且代码质量更高。',
      project: '企业级CRM系统',
      timeReduced: '70%',
      rating: 5
    },
    {
      name: '李小明',
      role: '前端开发工程师',
      company: '某科技创业公司',
      avatar: '/images/testimonials/li-xiaoming.jpg',
      story: 'Qwen3-Coder的React组件生成功能太强大了！不仅能生成基础组件，还能处理复杂的状态管理和业务逻辑。',
      project: '在线教育平台',
      timeReduced: '65%',
      rating: 5
    },
    {
      name: '王芳',
      role: '后端开发工程师',
      company: '某金融科技公司',
      avatar: '/images/testimonials/wang-fang.jpg',
      story: '微服务架构的生成功能帮我们快速搭建了整套系统架构，包括服务发现、配置管理等，节省了大量时间。',
      project: '金融风控系统',
      timeReduced: '80%',
      rating: 5
    }
  ];

  // 播放演示动画
  const playDemo = (index: number) => {
    setActiveDemo(index);
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 3000);
  };

  return (
    <>
      <SEOHead 
        title="项目展示 - Qwen3-Coder"
        description="查看使用Qwen3-Coder构建的真实项目案例，包括电商平台、管理后台、微服务架构等，了解AI代码生成的强大能力。"
        type="website"
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                项目展示
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  见证AI编程的力量
                </span>
              </h1>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                探索使用Qwen3-Coder构建的真实项目案例，从简单的API到复杂的微服务架构，
                体验AI代码生成技术如何革命性地提升开发效率。
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                  <div className="text-2xl font-bold text-white">50+</div>
                  <div className="text-gray-300">成功项目</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                  <div className="text-2xl font-bold text-white">80%</div>
                  <div className="text-gray-300">时间节省</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                  <div className="text-2xl font-bold text-white">95%</div>
                  <div className="text-gray-300">代码质量</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 项目案例展示 */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">真实项目案例</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                这些都是使用Qwen3-Coder实际构建的项目，展示了AI代码生成在不同场景下的强大能力
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {showcaseProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span key={tech} className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-white text-sm">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">{project.stats.linesOfCode}</div>
                        <div className="text-sm text-gray-500">代码行数</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{project.stats.timeReduced}</div>
                        <div className="text-sm text-gray-500">时间节省</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600">{project.stats.testCoverage}</div>
                        <div className="text-sm text-gray-500">测试覆盖</div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">核心功能</h4>
                      <ul className="space-y-1">
                        {project.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex gap-3">
                      <a 
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <Play className="w-4 h-4" />
                        在线演示
                      </a>
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg font-medium transition-colors flex items-center justify-center"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 代码生成演示 */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">代码生成演示</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                看看Qwen3-Coder如何将你的想法转化为高质量的代码
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {codeDemos.map((demo, index) => (
                  <button
                    key={index}
                    onClick={() => playDemo(index)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                      activeDemo === index
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {demo.title}
                  </button>
                ))}
              </div>

              <div className="bg-gray-800 rounded-xl overflow-hidden">
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                  <h3 className="text-lg font-semibold">{codeDemos[activeDemo].title}</h3>
                  <div className="flex items-center gap-2">
                    {isPlaying && (
                      <div className="flex items-center gap-2 text-green-400">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-sm">生成中...</span>
                      </div>
                    )}
                    <button
                      onClick={() => playDemo(activeDemo)}
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      运行演示
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-gray-300 mb-6">{codeDemos[activeDemo].description}</p>
                  
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
                        <Code className="w-4 h-4" />
                        输入
                      </h4>
                      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-sm text-gray-300">
                          <code>{codeDemos[activeDemo].input}</code>
                        </pre>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        生成的代码
                      </h4>
                      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-sm text-green-400">
                          <code>{codeDemos[activeDemo].output}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 用户成功案例 */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">用户成功案例</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                听听真实用户如何使用Qwen3-Coder提升开发效率，实现项目成功
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {successStories.map((story, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <img 
                      src={story.avatar} 
                      alt={story.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{story.name}</h3>
                      <p className="text-sm text-gray-600">{story.role}</p>
                      <p className="text-sm text-gray-500">{story.company}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-gray-700 mb-4 italic leading-relaxed">
                    "{story.story}"
                  </blockquote>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">项目: {story.project}</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded font-medium">
                        节省 {story.timeReduced}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">
              准备开始你的AI编程之旅？
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              加入数千名开发者的行列，体验Qwen3-Coder带来的编程效率革命
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                立即开始
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                联系我们
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ShowcasePage;