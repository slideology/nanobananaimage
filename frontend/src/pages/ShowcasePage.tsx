import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { Code, Play, Star, Users, Zap, CheckCircle, ArrowRight, Github, ExternalLink } from 'lucide-react';

/**
 * Nano Banana AI Research Showcase Page
 * Display real analysis cases and research insights
 */
const ShowcasePage: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Project showcase data
  const showcaseProjects = [
    {
      id: 1,
      title: 'E-commerce Platform Backend API',
      description: 'Comprehensive analysis of Nano Banana AI model architecture, including neural network layers, attention mechanisms, and computational efficiency insights.',
      tech: ['Node.js', 'Express', 'MongoDB', 'JWT'],
      image: '/images/showcase/ecommerce-api.jpg',
      demoUrl: 'https://demo.nanobananaimage.org/architecture',
      githubUrl: 'https://github.com/nanobanana-ai/architecture-analysis',
      stats: {
        linesOfCode: '2,500+',
        timeReduced: '85%',
        testCoverage: '95%'
      },
      features: [
        'Auto-generate CRUD operations',
        'Intelligent data validation',
        'Secure authentication mechanism',
        'Complete API documentation'
      ]
    },
    {
      id: 2,
      title: 'React Admin Dashboard',
      description: 'Modern admin dashboard system based on React and TypeScript, including data visualization, permission management, real-time notifications and other functions.',
      tech: ['React', 'TypeScript', 'Ant Design', 'Chart.js'],
      image: '/images/showcase/admin-dashboard.jpg',
      demoUrl: 'https://demo.nanobananaimage.org/benchmarks',
      githubUrl: 'https://github.com/nanobanana-ai/performance-benchmarks',
      stats: {
        linesOfCode: '3,200+',
        timeReduced: '78%',
        testCoverage: '92%'
      },
      features: [
        'Responsive design',
        'Component-based architecture',
        'State management optimization',
        'Performance monitoring integration'
      ]
    },
    {
      id: 3,
      title: 'Microservices Architecture',
      description: 'Enterprise-level microservices architecture solution, including service discovery, load balancing, circuit breaker, distributed tracing and other core components.',
      tech: ['Spring Boot', 'Docker', 'Kubernetes', 'Redis'],
      image: '/images/showcase/microservices.jpg',
      demoUrl: 'https://demo.nanobananaimage.org/training-insights',
      githubUrl: 'https://github.com/nanobanana-ai/training-analysis',
      stats: {
        linesOfCode: '5,000+',
        timeReduced: '90%',
        testCoverage: '88%'
      },
      features: [
        'Automatic service discovery',
        'Intelligent load balancing',
        'Distributed configuration management',
        'Real-time monitoring and alerting'
      ]
    }
  ];

  // Code generation demo data
  const codeDemos = [
    {
      title: 'REST API Generation',
      description: 'Input data model, automatically generate complete REST API',
      input: `// User model definition
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}`,
      output: `// Auto-generated user API controller
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
      title: 'React Component Generation',
      description: 'Describe UI requirements, generate complete React components',
      input: `// Requirements description
Create a user card component that displays user avatar, name, email and role,
supports edit and delete operations, using Tailwind CSS styles`,
      output: `// Auto-generated user card component
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
            Edit
          </button>
          <button 
            onClick={() => onDelete(user.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};`
    },
    {
      title: 'Database Model Generation',
      description: 'Generate database models and migration files based on business requirements',
      input: `// Business requirements
E-commerce system needs product management functionality, including basic product information,
category, inventory, price and other fields, supporting multi-specification products`,
      output: `// Auto-generated product model
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

  // User success stories
  const successStories = [
    {
      name: 'Zhang Wei',
      role: 'Full-stack Developer',
      company: 'Internet Company',
      avatar: '/images/testimonials/zhang-wei.jpg',
      story: 'After using Nano Banana AI analysis, our research efficiency increased by 3 times. Model insights that originally took weeks to understand can now be grasped in days, with much deeper technical understanding.',
      project: 'Enterprise CRM System',
      timeReduced: '70%',
      rating: 5
    },
    {
      name: 'Li Xiaoming',
      role: 'Frontend Developer',
      company: 'Tech Startup Company',
      avatar: '/images/testimonials/li-xiaoming.jpg',
      story: 'Nano Banana AI\'s architecture analysis feature is so comprehensive! It not only reveals basic model structure, but also provides deep insights into training methodologies and performance optimization.',
      project: 'Online Education Platform',
      timeReduced: '65%',
      rating: 5
    },
    {
      name: 'Wang Fang',
      role: 'Backend Developer',
      company: 'Fintech Company',
      avatar: '/images/testimonials/wang-fang.jpg',
      story: 'The microservices architecture generation feature helped us quickly build the entire system architecture, including service discovery, configuration management, etc., saving a lot of time.',
      project: 'Financial Risk Control System',
      timeReduced: '80%',
      rating: 5
    }
  ];

  // Play demo animation
  const playDemo = (index: number) => {
    setActiveDemo(index);
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 3000);
  };

  return (
    <>
      <SEOHead 
        title="Research Showcase - Nano Banana AI"
        description="View real analysis cases of Nano Banana AI, including model architecture studies, performance benchmarks, training insights, etc., to understand the comprehensive capabilities of AI research analysis."
        type="website"
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 py-20 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Project Showcase
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                  Witness the Power of AI Programming
                </span>
              </h1>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                Explore real analysis cases of Nano Banana AI, from basic model insights to complex architectural studies,
                experience how AI code generation technology revolutionarily improves development efficiency.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                  <div className="text-2xl font-bold text-white">50+</div>
                  <div className="text-gray-300">Successful Projects</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                  <div className="text-2xl font-bold text-white">80%</div>
                  <div className="text-gray-300">Time Saved</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
                  <div className="text-2xl font-bold text-white">95%</div>
                  <div className="text-gray-300">Code Quality</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project showcase */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Real Project Cases</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These are all research analyses actually conducted on Nano Banana AI, demonstrating the comprehensive capabilities of AI model analysis in different scenarios
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
                        <div className="text-sm text-gray-500">Lines of Code</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{project.stats.timeReduced}</div>
                        <div className="text-sm text-gray-500">Time Saved</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-purple-600">{project.stats.testCoverage}</div>
                        <div className="text-sm text-gray-500">Test Coverage</div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Core Features</h4>
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
                        Live Demo
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

        {/* Code generation demo */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Code Generation Demo</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                See how Nano Banana AI analysis transforms complex AI models into understandable insights
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
                        <span className="text-sm">Generating...</span>
                      </div>
                    )}
                    <button
                      onClick={() => playDemo(activeDemo)}
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      Run Demo
                    </button>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-gray-300 mb-6">{codeDemos[activeDemo].description}</p>
                  
                  <div className="grid lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
                        <Code className="w-4 h-4" />
                        Input
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
                        Generated Code
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

        {/* User success stories */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">User Success Stories</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Hear how real researchers use Nano Banana AI analysis to improve research efficiency and achieve breakthrough insights
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
                      <span className="text-gray-600">Project: {story.project}</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded font-medium">
                        Saved {story.timeReduced}
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
              Ready to Start Your AI Programming Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of researchers and experience the AI analysis revolution brought by Nano Banana AI
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ShowcasePage;