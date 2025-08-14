import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Copy, Check, Zap, Globe, Brain, BarChart3 } from 'lucide-react';

interface CodeExample {
  id: string;
  title: string;
  description: string;
  language: string;
  prompt: string;
  code: string;
  executionTime: number;
  complexity: string;
  category: 'generation' | 'multilang' | 'agentic' | 'performance';
}

const CodeDemoComponent: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState<string>('generation');
  const [currentExample, setCurrentExample] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [displayedCode, setDisplayedCode] = useState<string>('');
  const [copiedStates, setCopiedStates] = useState<{[key: string]: boolean}>({});

  // Code example data
  const codeExamples: CodeExample[] = [
    // Real-time code generation demo
    {
      id: 'react-component',
      title: 'React Todo Component',
      description: 'Generate a complete React todo list component with TypeScript',
      language: 'typescript',
      prompt: 'Create a React todo list component with add, delete, and toggle functionality',
      code: `import React, { useState } from 'react';
import { Trash2, Plus, Check } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: inputValue,
        completed: false
      }]);
      setInputValue('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Todo List</h2>
      
      <div className="flex mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          className="flex-1 px-3 py-2 border rounded-l-md"
          placeholder="Add a new todo..."
        />
        <button
          onClick={addTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
        >
          <Plus size={20} />
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map(todo => (
          <li key={todo.id} className="flex items-center gap-2 p-2 border rounded">
            <button
              onClick={() => toggleTodo(todo.id)}
              className={\`p-1 rounded \${todo.completed ? 'bg-green-500 text-white' : 'bg-gray-200'}\`}
            >
              <Check size={16} />
            </button>
            <span className={\`flex-1 \${todo.completed ? 'line-through text-gray-500' : ''}\`}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="p-1 text-red-500 hover:bg-red-100 rounded"
            >
              <Trash2 size={16} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;`,
      executionTime: 2.3,
      complexity: 'Intermediate',
      category: 'generation'
    },
    {
      id: 'python-api',
      title: 'FastAPI REST API',
      description: 'Generate a complete Python FastAPI with CRUD operations',
      language: 'python',
      prompt: 'Create a FastAPI application with user management endpoints',
      code: `from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy import create_engine, Column, Integer, String, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel
from typing import List

# Database setup
SQLALCHEMY_DATABASE_URL = "sqlite:///./users.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Database model
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    name = Column(String)
    is_active = Column(Boolean, default=True)

Base.metadata.create_all(bind=engine)

# Pydantic models
class UserBase(BaseModel):
    email: str
    name: str

class UserCreate(UserBase):
    pass

class UserResponse(UserBase):
    id: int
    is_active: bool
    
    class Config:
        orm_mode = True

# FastAPI app
app = FastAPI(title="User Management API", version="1.0.0")

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/users/", response_model=UserResponse)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = User(email=user.email, name=user.name)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users/", response_model=List[UserResponse])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = db.query(User).offset(skip).limit(limit).all()
    return users

@app.get("/users/{user_id}", response_model=UserResponse)
def read_user(user_id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.put("/users/{user_id}", response_model=UserResponse)
def update_user(user_id: int, user: UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    db_user.email = user.email
    db_user.name = user.name
    db.commit()
    db.refresh(db_user)
    return db_user

@app.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    db.delete(db_user)
    db.commit()
    return {"message": "User deleted successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)`,
      executionTime: 3.1,
      complexity: 'Advanced',
      category: 'generation'
    },
    // Multi-language support showcase
    {
      id: 'go-microservice',
      title: 'Go Microservice',
      description: 'Generate a Go microservice with gRPC and HTTP endpoints',
      language: 'go',
      prompt: 'Create a Go microservice for user authentication with gRPC and REST APIs',
      code: `package main

import (
	"context"
	"fmt"
	"log"
	"net"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
	"google.golang.org/grpc"
	pb "./proto/auth"
)

type AuthService struct {
	pb.UnimplementedAuthServiceServer
	users map[string]*User
}

type User struct {
	ID       string \`json:"id"\`
	Username string \`json:"username"\`
	Password string \`json:"-"\`
	Email    string \`json:"email"\`
}

type LoginRequest struct {
	Username string \`json:"username" binding:"required"\`
	Password string \`json:"password" binding:"required"\`
}

type TokenResponse struct {
	Token string \`json:"token"\`
	User  *User  \`json:"user"\`
}

var jwtSecret = []byte("your-secret-key")

func NewAuthService() *AuthService {
	return &AuthService{
		users: make(map[string]*User),
	}
}

func (s *AuthService) Register(ctx context.Context, req *pb.RegisterRequest) (*pb.AuthResponse, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, fmt.Errorf("failed to hash password: %v", err)
	}

	user := &User{
		ID:       fmt.Sprintf("user_%d", len(s.users)+1),
		Username: req.Username,
		Password: string(hashedPassword),
		Email:    req.Email,
	}

	s.users[req.Username] = user

	token, err := s.generateToken(user)
	if err != nil {
		return nil, fmt.Errorf("failed to generate token: %v", err)
	}

	return &pb.AuthResponse{
		Token: token,
		User: &pb.User{
			Id:       user.ID,
			Username: user.Username,
			Email:    user.Email,
		},
	}, nil
}

func (s *AuthService) Login(ctx context.Context, req *pb.LoginRequest) (*pb.AuthResponse, error) {
	user, exists := s.users[req.Username]
	if !exists {
		return nil, fmt.Errorf("user not found")
	}

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password))
	if err != nil {
		return nil, fmt.Errorf("invalid credentials")
	}

	token, err := s.generateToken(user)
	if err != nil {
		return nil, fmt.Errorf("failed to generate token: %v", err)
	}

	return &pb.AuthResponse{
		Token: token,
		User: &pb.User{
			Id:       user.ID,
			Username: user.Username,
			Email:    user.Email,
		},
	}, nil
}

func (s *AuthService) generateToken(user *User) (string, error) {
	claims := jwt.MapClaims{
		"user_id":  user.ID,
		"username": user.Username,
		"email":    user.Email,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}

func setupHTTPServer(authService *AuthService) {
	r := gin.Default()

	r.POST("/register", func(c *gin.Context) {
		var req LoginRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// Convert to gRPC request and call service
		grpcReq := &pb.RegisterRequest{
			Username: req.Username,
			Password: req.Password,
			Email:    req.Username + "@example.com",
		}

		resp, err := authService.Register(context.Background(), grpcReq)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, TokenResponse{
			Token: resp.Token,
			User: &User{
				ID:       resp.User.Id,
				Username: resp.User.Username,
				Email:    resp.User.Email,
			},
		})
	})

	r.POST("/login", func(c *gin.Context) {
		var req LoginRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		grpcReq := &pb.LoginRequest{
			Username: req.Username,
			Password: req.Password,
		}

		resp, err := authService.Login(context.Background(), grpcReq)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, TokenResponse{
			Token: resp.Token,
			User: &User{
				ID:       resp.User.Id,
				Username: resp.User.Username,
				Email:    resp.User.Email,
			},
		})
	})

	log.Println("HTTP server starting on :8080")
	log.Fatal(http.ListenAndServe(":8080", r))
}

func main() {
	authService := NewAuthService()

	// Start gRPC server
	go func() {
		lis, err := net.Listen("tcp", ":50051")
		if err != nil {
			log.Fatalf("Failed to listen: %v", err)
		}

		s := grpc.NewServer()
		pb.RegisterAuthServiceServer(s, authService)

		log.Println("gRPC server starting on :50051")
		if err := s.Serve(lis); err != nil {
			log.Fatalf("Failed to serve: %v", err)
		}
	}()

	// Start HTTP server
	setupHTTPServer(authService)
}`,
      executionTime: 4.2,
      complexity: 'Expert',
      category: 'multilang'
    },
    // Agentic capabilities demonstration
    {
      id: 'agentic-planning',
      title: 'Multi-Step Project Planning',
      description: 'AI agent breaks down complex project into manageable tasks',
      language: 'typescript',
      prompt: 'Plan and implement a complete e-commerce platform with microservices architecture',
      code: `// AI Agent Planning Output
// Project: E-commerce Platform with Microservices

interface ProjectPlan {
  phase: string;
  tasks: Task[];
  dependencies: string[];
  estimatedTime: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  complexity: number;
  technologies: string[];
  deliverables: string[];
}

// Phase 1: Core Infrastructure
const phase1: ProjectPlan = {
  phase: "Infrastructure Setup",
  tasks: [
    {
      id: "task-1.1",
      title: "API Gateway Setup",
      description: "Configure Kong/Nginx as API gateway with rate limiting and authentication",
      priority: "high",
      complexity: 7,
      technologies: ["Kong", "Docker", "Kubernetes"],
      deliverables: ["Gateway configuration", "Docker compose", "K8s manifests"]
    },
    {
      id: "task-1.2",
      title: "Service Discovery",
      description: "Implement Consul/Eureka for service registration and discovery",
      priority: "high",
      complexity: 6,
      technologies: ["Consul", "Docker", "Go"],
      deliverables: ["Service registry", "Health checks", "Load balancing"]
    },
    {
      id: "task-1.3",
      title: "Message Queue",
      description: "Setup RabbitMQ/Kafka for async communication between services",
      priority: "medium",
      complexity: 5,
      technologies: ["RabbitMQ", "Kafka", "Docker"],
      deliverables: ["Message broker", "Topic configuration", "Consumer groups"]
    }
  ],
  dependencies: [],
  estimatedTime: "2 weeks"
};

// Phase 2: Core Services
const phase2: ProjectPlan = {
  phase: "Core Microservices",
  tasks: [
    {
      id: "task-2.1",
      title: "User Service",
      description: "User authentication, authorization, and profile management",
      priority: "high",
      complexity: 8,
      technologies: ["Node.js", "JWT", "PostgreSQL", "Redis"],
      deliverables: ["Auth API", "User CRUD", "Session management"]
    },
    {
      id: "task-2.2",
      title: "Product Catalog Service",
      description: "Product management, categories, inventory tracking",
      priority: "high",
      complexity: 7,
      technologies: ["Java", "Spring Boot", "MongoDB", "Elasticsearch"],
      deliverables: ["Product API", "Search functionality", "Inventory system"]
    },
    {
      id: "task-2.3",
      title: "Order Management Service",
      description: "Order processing, payment integration, order tracking",
      priority: "high",
      complexity: 9,
      technologies: ["Python", "FastAPI", "PostgreSQL", "Stripe API"],
      deliverables: ["Order API", "Payment processing", "Order tracking"]
    }
  ],
  dependencies: ["task-1.1", "task-1.2"],
  estimatedTime: "4 weeks"
};

// Phase 3: Advanced Features
const phase3: ProjectPlan = {
  phase: "Advanced Features",
  tasks: [
    {
      id: "task-3.1",
      title: "Recommendation Engine",
      description: "ML-based product recommendations using collaborative filtering",
      priority: "medium",
      complexity: 9,
      technologies: ["Python", "TensorFlow", "Apache Spark", "Redis"],
      deliverables: ["ML model", "Recommendation API", "Real-time suggestions"]
    },
    {
      id: "task-3.2",
      title: "Analytics Service",
      description: "Real-time analytics dashboard for business metrics",
      priority: "medium",
      complexity: 6,
      technologies: ["Go", "InfluxDB", "Grafana", "Apache Kafka"],
      deliverables: ["Analytics API", "Dashboard", "Real-time metrics"]
    }
  ],
  dependencies: ["task-2.1", "task-2.2", "task-2.3"],
  estimatedTime: "3 weeks"
};

// AI Agent Implementation Strategy
class ProjectAgent {
  private phases: ProjectPlan[];
  
  constructor() {
    this.phases = [phase1, phase2, phase3];
  }
  
  generateImplementationPlan(): string {
    let plan = "# E-commerce Platform Implementation Plan\n\n";
    
    this.phases.forEach((phase, index) => {
      plan += \`## Phase \${index + 1}: \${phase.phase}\n\`;
      plan += \`**Estimated Time:** \${phase.estimatedTime}\n\n\`;
      
      phase.tasks.forEach(task => {
        plan += \`### \${task.title}\n\`;
        plan += \`- **Priority:** \${task.priority}\n\`;
        plan += \`- **Complexity:** \${task.complexity}/10\n\`;
        plan += \`- **Technologies:** \${task.technologies.join(', ')}\n\`;
        plan += \`- **Description:** \${task.description}\n\n\`;
      });
    });
    
    return plan;
  }
  
  estimateProjectDuration(): number {
    // Calculate total weeks based on dependencies and parallel execution
    return this.phases.reduce((total, phase) => {
      const weeks = parseInt(phase.estimatedTime.split(' ')[0]);
      return total + weeks;
    }, 0);
  }
  
  identifyRisks(): string[] {
    return [
      "Service communication complexity",
      "Data consistency across microservices",
      "Performance bottlenecks in high-traffic scenarios",
      "Security vulnerabilities in API gateway",
      "Deployment and orchestration complexity"
    ];
  }
}

// Usage Example
const agent = new ProjectAgent();
console.log(agent.generateImplementationPlan());
console.log(\`Total estimated duration: \${agent.estimateProjectDuration()} weeks\`);
console.log("Identified risks:", agent.identifyRisks());`,
      executionTime: 5.8,
      complexity: 'Expert',
      category: 'agentic'
    },
    // Performance benchmark showcase
    {
      id: 'performance-benchmark',
      title: 'Performance Optimization',
      description: 'Optimized algorithm with performance benchmarks and analysis',
      language: 'rust',
      prompt: 'Optimize a data processing algorithm for maximum performance',
      code: `use std::time::Instant;
use rayon::prelude::*;
use std::collections::HashMap;
use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
struct DataPoint {
    id: u64,
    value: f64,
    category: String,
    timestamp: u64,
}

#[derive(Debug)]
struct PerformanceMetrics {
    execution_time_ms: u128,
    memory_usage_mb: f64,
    throughput_ops_per_sec: f64,
    cpu_utilization: f64,
}

struct DataProcessor {
    data: Vec<DataPoint>,
    cache: HashMap<String, Vec<f64>>,
}

impl DataProcessor {
    fn new(data: Vec<DataPoint>) -> Self {
        Self {
            data,
            cache: HashMap::new(),
        }
    }
    
    // Optimized parallel processing with SIMD operations
    fn process_parallel(&mut self) -> PerformanceMetrics {
        let start = Instant::now();
        let initial_memory = self.get_memory_usage();
        
        // Parallel processing with chunking for optimal cache usage
        let chunk_size = (self.data.len() / rayon::current_num_threads()).max(1000);
        
        let results: Vec<_> = self.data
            .par_chunks(chunk_size)
            .map(|chunk| {
                // SIMD-optimized operations
                let mut local_results = Vec::with_capacity(chunk.len());
                
                for point in chunk {
                    // Complex mathematical operations optimized for performance
                    let processed_value = self.optimize_calculation(point.value);
                    local_results.push(processed_value);
                }
                
                local_results
            })
            .collect();
        
        // Flatten results and update cache
        let flattened: Vec<f64> = results.into_iter().flatten().collect();
        self.update_cache_optimized(&flattened);
        
        let execution_time = start.elapsed().as_millis();
        let final_memory = self.get_memory_usage();
        
        PerformanceMetrics {
            execution_time_ms: execution_time,
            memory_usage_mb: final_memory - initial_memory,
            throughput_ops_per_sec: (self.data.len() as f64 / execution_time as f64) * 1000.0,
            cpu_utilization: self.calculate_cpu_utilization(),
        }
    }
    
    // Baseline single-threaded implementation for comparison
    fn process_sequential(&mut self) -> PerformanceMetrics {
        let start = Instant::now();
        let initial_memory = self.get_memory_usage();
        
        let mut results = Vec::with_capacity(self.data.len());
        
        for point in &self.data {
            let processed_value = self.basic_calculation(point.value);
            results.push(processed_value);
        }
        
        self.update_cache_basic(&results);
        
        let execution_time = start.elapsed().as_millis();
        let final_memory = self.get_memory_usage();
        
        PerformanceMetrics {
            execution_time_ms: execution_time,
            memory_usage_mb: final_memory - initial_memory,
            throughput_ops_per_sec: (self.data.len() as f64 / execution_time as f64) * 1000.0,
            cpu_utilization: 25.0, // Estimated single-core usage
        }
    }
    
    #[inline(always)]
    fn optimize_calculation(&self, value: f64) -> f64 {
        // Optimized mathematical operations using fast approximations
        let x = value * 1.5;
        let y = x.powi(2) + x.sqrt();
        let z = y.sin() * y.cos();
        
        // Fast inverse square root approximation (Quake algorithm)
        let result = if z != 0.0 {
            1.0 / z.sqrt()
        } else {
            0.0
        };
        
        result * 100.0
    }
    
    fn basic_calculation(&self, value: f64) -> f64 {
        // Basic implementation without optimizations
        let x = value * 1.5;
        let y = x * x + x.sqrt();
        let z = y.sin() * y.cos();
        
        if z != 0.0 {
            100.0 / z.sqrt()
        } else {
            0.0
        }
    }
    
    fn update_cache_optimized(&mut self, results: &[f64]) {
        // Optimized cache update with batch operations
        let categories: Vec<String> = self.data
            .par_iter()
            .map(|point| point.category.clone())
            .collect();
        
        let mut category_map: HashMap<String, Vec<f64>> = HashMap::new();
        
        for (i, category) in categories.iter().enumerate() {
            category_map
                .entry(category.clone())
                .or_insert_with(Vec::new)
                .push(results[i]);
        }
        
        self.cache = category_map;
    }
    
    fn update_cache_basic(&mut self, results: &[f64]) {
        // Basic cache update
        self.cache.clear();
        
        for (i, point) in self.data.iter().enumerate() {
            self.cache
                .entry(point.category.clone())
                .or_insert_with(Vec::new)
                .push(results[i]);
        }
    }
    
    fn get_memory_usage(&self) -> f64 {
        // Simplified memory usage calculation
        let data_size = self.data.len() * std::mem::size_of::<DataPoint>();
        let cache_size = self.cache.len() * 64; // Estimated
        (data_size + cache_size) as f64 / 1024.0 / 1024.0
    }
    
    fn calculate_cpu_utilization(&self) -> f64 {
        // Estimated CPU utilization for parallel processing
        rayon::current_num_threads() as f64 * 85.0 / 100.0 * 100.0
    }
}

// Benchmark runner
fn run_performance_benchmark() {
    // Generate test data
    let test_data: Vec<DataPoint> = (0..1_000_000)
        .map(|i| DataPoint {
            id: i as u64,
            value: (i as f64) * 0.1,
            category: format!("category_{}", i % 10),
            timestamp: i as u64,
        })
        .collect();
    
    println!("🚀 Performance Benchmark Results");
    println!("=================================");
    println!("Dataset size: {} records", test_data.len());
    println!();
    
    // Sequential processing benchmark
    let mut processor_seq = DataProcessor::new(test_data.clone());
    let metrics_seq = processor_seq.process_sequential();
    
    println!("📊 Sequential Processing:");
    println!("  Execution time: {} ms", metrics_seq.execution_time_ms);
    println!("  Memory usage: {:.2} MB", metrics_seq.memory_usage_mb);
    println!("  Throughput: {:.0} ops/sec", metrics_seq.throughput_ops_per_sec);
    println!("  CPU utilization: {:.1}%", metrics_seq.cpu_utilization);
    println!();
    
    // Parallel processing benchmark
    let mut processor_par = DataProcessor::new(test_data);
    let metrics_par = processor_par.process_parallel();
    
    println!("⚡ Parallel Processing (Optimized):");
    println!("  Execution time: {} ms", metrics_par.execution_time_ms);
    println!("  Memory usage: {:.2} MB", metrics_par.memory_usage_mb);
    println!("  Throughput: {:.0} ops/sec", metrics_par.throughput_ops_per_sec);
    println!("  CPU utilization: {:.1}%", metrics_par.cpu_utilization);
    println!();
    
    // Performance improvement analysis
    let speedup = metrics_seq.execution_time_ms as f64 / metrics_par.execution_time_ms as f64;
    let throughput_improvement = (metrics_par.throughput_ops_per_sec / metrics_seq.throughput_ops_per_sec - 1.0) * 100.0;
    
    println!("📈 Performance Improvements:");
    println!("  Speedup: {:.2}x faster", speedup);
    println!("  Throughput improvement: {:.1}%", throughput_improvement);
    println!("  Memory efficiency: {:.1}% better", 
             (1.0 - metrics_par.memory_usage_mb / metrics_seq.memory_usage_mb) * 100.0);
}

fn main() {
    run_performance_benchmark();
}`,
      executionTime: 1.2,
      complexity: 'Expert',
      category: 'performance'
    }
  ];

  // Demo category configuration
  const demoCategories = [
    {
      id: 'generation',
      title: 'Real-time Code Generation',
      icon: Zap,
      description: 'Watch AI generate production-ready code in seconds',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'multilang',
      title: 'Multi-language Support',
      icon: Globe,
      description: 'Generate code in 50+ programming languages',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'agentic',
      title: 'Agentic Programming',
      icon: Brain,
      description: 'AI agents plan and execute complex projects',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'performance',
      title: 'Performance Benchmarks',
      icon: BarChart3,
      description: 'Optimized code with detailed performance metrics',
      color: 'from-orange-500 to-red-500'
    }
  ];

  // Get examples for current category
  const getCurrentExamples = () => {
    return codeExamples.filter(example => example.category === activeDemo);
  };

  // Typewriter effect
  useEffect(() => {
    const examples = getCurrentExamples();
    if (examples.length === 0) return;

    const currentCode = examples[currentExample]?.code || '';
    setDisplayedCode('');
    setIsTyping(true);

    let index = 0;
    const timer = setInterval(() => {
      if (index < currentCode.length) {
        setDisplayedCode(currentCode.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 20); // Adjust typing speed

    return () => clearInterval(timer);
  }, [activeDemo, currentExample]);

  // Copy code functionality
  const copyCode = async (code: string, exampleId: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedStates(prev => ({ ...prev, [exampleId]: true }));
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [exampleId]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const currentExamples = getCurrentExamples();
  const currentExampleData = currentExamples[currentExample];

  return (
    <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700">
      {/* Demo category selection */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-6">Interactive Code Demonstrations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {demoCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => {
                  setActiveDemo(category.id);
                  setCurrentExample(0);
                }}
                className={`p-4 rounded-xl border transition-all duration-300 text-left ${
                  activeDemo === category.id
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                }`}
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center mb-3`}>
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-semibold text-white mb-1">{category.title}</h4>
                <p className="text-sm text-gray-400">{category.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Code demo area */}
      {currentExampleData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left side: Example info and controls */}
          <div>
            <div className="bg-gray-800 rounded-xl p-6 mb-6">
              <h4 className="text-xl font-bold text-white mb-2">{currentExampleData.title}</h4>
              <p className="text-gray-300 mb-4">{currentExampleData.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                  {currentExampleData.language}
                </span>
                <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                  {currentExampleData.complexity}
                </span>
                <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                  {currentExampleData.executionTime}s
                </span>
              </div>
              
              <div className="bg-gray-700 rounded-lg p-4">
                <h5 className="text-sm font-semibold text-gray-300 mb-2">Prompt:</h5>
                <p className="text-gray-400 text-sm italic">"{currentExampleData.prompt}"</p>
              </div>
            </div>

            {/* Example switching */}
            {currentExamples.length > 1 && (
              <div className="flex gap-2 mb-4">
                {currentExamples.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentExample(index)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentExample === index
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    Example {index + 1}
                  </button>
                ))}
              </div>
            )}

            {/* Control buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setCurrentExample(0);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Restart Demo
              </button>
              
              <button
                onClick={() => copyCode(currentExampleData.code, currentExampleData.id)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                {copiedStates[currentExampleData.id] ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {copiedStates[currentExampleData.id] ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
          </div>

          {/* Right side: Code display */}
          <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-sm text-gray-400">{currentExampleData.language}</span>
            </div>
            
            <div className="p-4 h-96 overflow-auto">
              <pre className="text-sm text-gray-300 font-mono leading-relaxed">
                <code>{displayedCode}</code>
                {isTyping && (
                  <span className="inline-block w-2 h-5 bg-blue-400 ml-1 animate-pulse"></span>
                )}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeDemoComponent;