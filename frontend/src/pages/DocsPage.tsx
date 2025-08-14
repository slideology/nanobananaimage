import React, { useState } from 'react';
import { Book, Code, FileText, Zap, Shield, Globe, ChevronRight, Copy, Check } from 'lucide-react';
import { useSiteConfig } from '../hooks/useSiteConfig';

/**
 * Technical Documentation Page Component
 * Provides API documentation, developer guides, integration examples and troubleshooting guides
 */
const DocsPage: React.FC = () => {
  const { siteConfig } = useSiteConfig();
  const [activeTab, setActiveTab] = useState('api');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  /**
 * Copy code to clipboard
 * @param code - Code string to copy
 * @param id - Unique identifier for the code block
 */
  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  // API endpoint configuration
  const apiEndpoints = [
    {
      method: 'POST',
      endpoint: '/api/v1/generate',
      description: 'Generate code',
      params: {
        prompt: 'string - Code generation prompt',
        language: 'string - Target programming language',
        framework: 'string - Optional framework',
        complexity: 'string - Complexity level (simple|medium|complex)'
      },
      example: `{
  "prompt": "Create a React Todo component",
  "language": "javascript",
  "framework": "react",
  "complexity": "medium"
}`
    },
    {
      method: 'POST',
      endpoint: '/api/v1/optimize',
      description: 'Optimize existing code',
      params: {
        code: 'string - Code to optimize',
        language: 'string - Programming language',
        optimization_type: 'string - Optimization type (performance|readability|security)'
      },
      example: `{
  "code": "function fibonacci(n) { if(n <= 1) return n; return fibonacci(n-1) + fibonacci(n-2); }",
  "language": "javascript",
  "optimization_type": "performance"
}`
    },
    {
      method: 'POST',
      endpoint: '/api/v1/review',
      description: 'Code review',
      params: {
        code: 'string - Code to review',
        language: 'string - Programming language',
        review_level: 'string - Review level (basic|detailed|comprehensive)'
      },
      example: `{
  "code": "const users = data.filter(user => user.active == true)",
  "language": "javascript",
  "review_level": "detailed"
}`
    }
  ];

  // Integration examples
  const integrationExamples = [
    {
      title: 'JavaScript/Node.js',
      language: 'javascript',
      code: `// Install SDK
npm install nano-banana-ai-sdk

// Basic usage
const { NanoBananaAI } = require('nano-banana-ai-sdk');

const client = new NanoBananaAI({
  apiKey: 'your-api-key',
  baseURL: 'https://api.nanobanana-ai.com'
});

async function generateCode() {
  try {
    const result = await client.generate({
      prompt: 'Create an Express.js route handler',
      language: 'javascript',
      framework: 'express'
    });
    
    console.log('Generated code:', result.code);
    console.log('Explanation:', result.explanation);
  } catch (error) {
    console.error('Generation failed:', error.message);
  }
}`
    },
    {
      title: 'Python',
      language: 'python',
      code: `# Install SDK
pip install nano-banana-ai-python

# Basic usage
from nano_banana_ai import NanoBananaAI

client = NanoBananaAI(
    api_key="your-api-key",
    base_url="https://api.nanobanana-ai.com"
)

def generate_code():
    try:
        result = client.generate(
            prompt="Create a FastAPI endpoint",
            language="python",
            framework="fastapi"
        )
        
        print(f"Generated code: {result.code}")
        print(f"Explanation: {result.explanation}")
    except Exception as error:
        print(f"Generation failed: {error}")

if __name__ == "__main__":
    generate_code()`
    },
    {
      title: 'cURL',
      language: 'bash',
      code: `# Direct API call
curl -X POST https://api.nanobanana-ai.com/api/v1/analyze \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-api-key" \
  -d '{
    "prompt": "Create a Go HTTP server",
    "language": "go",
    "complexity": "medium"
  }'

# Response example
{
  "success": true,
  "data": {
    "code": "package main\n\nimport (\n  \"fmt\"\n  \"net/http\"\n)\n\nfunc main() {\n  http.HandleFunc(\"/\", handler)\n  fmt.Println(\"Server starting on :8080\")\n  http.ListenAndServe(\":8080\", nil)\n}\n\nfunc handler(w http.ResponseWriter, r *http.Request) {\n  fmt.Fprintf(w, \"Hello, World!\")\n}",
    "explanation": "This is a simple Go HTTP server...",
    "suggestions": ["Add error handling", "Use router"]
  }
}`
    }
  ];

  // Troubleshooting guide
  const troubleshooting = [
    {
      issue: 'Invalid API key',
    solution: 'Please ensure your API key is correct and your account has sufficient quota. Check if the key has expired.',
      code: 'HTTP 401 Unauthorized'
    },
    {
      issue: 'Request timeout',
    solution: 'Complex code generation may take longer. Consider increasing timeout or simplifying the prompt.',
      code: 'HTTP 408 Request Timeout'
    },
    {
      issue: 'Poor generated code quality',
    solution: 'Try providing more detailed and specific prompts. Include context information and expected code style.',
    code: 'Optimized prompt example: "Create a React functional component using TypeScript with props type definitions"'
    },
    {
      issue: 'Unsupported programming language',
    solution: 'Check the list of supported languages. We continuously add support for new languages.',
      code: 'HTTP 400 Bad Request'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Page header */}
      <div className="relative pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Technical Documentation
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Developer Guide
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Complete API documentation, integration examples and best practices to help you quickly integrate Nano Banana AI
            </p>
          </div>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { id: 'api', label: 'API Documentation', icon: Code },
          { id: 'guide', label: 'Developer Guide', icon: Book },
          { id: 'examples', label: 'Integration Examples', icon: FileText },
          { id: 'troubleshooting', label: 'Troubleshooting', icon: Shield }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Content area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* API Documentation */}
        {activeTab === 'api' && (
          <div className="space-y-8">
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Code className="w-8 h-8 text-blue-400" />
                API Endpoints
              </h2>
              <div className="space-y-6">
                {apiEndpoints.map((endpoint, index) => (
                  <div key={index} className="bg-gray-900/50 rounded-xl p-6 border border-gray-600">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        endpoint.method === 'POST' ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'
                      }`}>
                        {endpoint.method}
                      </span>
                      <code className="text-blue-400 font-mono">{endpoint.endpoint}</code>
                    </div>
                    <p className="text-gray-300 mb-4">{endpoint.description}</p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-white font-semibold mb-3">Parameters</h4>
                        <div className="space-y-2">
                          {Object.entries(endpoint.params).map(([key, value]) => (
                            <div key={key} className="flex flex-col">
                              <code className="text-blue-400 font-mono text-sm">{key}</code>
                              <span className="text-gray-400 text-sm">{value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-white font-semibold">Request Example</h4>
                          <button
                            onClick={() => copyToClipboard(endpoint.example, `api-${index}`)}
                            className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                          >
                            {copiedCode === `api-${index}` ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                            <span className="text-sm">
                              {copiedCode === `api-${index}` ? 'Copied' : 'Copy'}
                            </span>
                          </button>
                        </div>
                        <pre className="bg-gray-900 rounded-lg p-4 text-sm text-gray-300 overflow-x-auto">
                          <code>{endpoint.example}</code>
                        </pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Developer Guide */}
        {activeTab === 'guide' && (
          <div className="space-y-8">
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Book className="w-8 h-8 text-purple-400" />
                Quick Start
              </h2>
              
              <div className="space-y-8">
                <div className="bg-gray-900/50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    Get API Key
                  </h3>
                  <p className="text-gray-300 mb-4">
                    First, you need to register an account in our developer console and get an API key.
                  </p>
                  <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-4">
                    <p className="text-blue-200 text-sm">
                      💡 Tip: Please keep your API key secure and do not expose it in client-side code.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-900/50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                    Choose Integration Method
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
                      <Zap className="w-8 h-8 text-yellow-400 mb-3" />
                      <h4 className="text-white font-semibold mb-2">REST API</h4>
                      <p className="text-gray-400 text-sm">Direct HTTP API calls, suitable for any programming language</p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
                      <Code className="w-8 h-8 text-green-400 mb-3" />
                      <h4 className="text-white font-semibold mb-2">SDK</h4>
                      <p className="text-gray-400 text-sm">Use official SDK for better development experience</p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
                      <Globe className="w-8 h-8 text-blue-400 mb-3" />
                      <h4 className="text-white font-semibold mb-2">Web Interface</h4>
              <p className="text-gray-400 text-sm">Quick testing and prototyping through web interface</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                    Best Practices
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-white font-medium">Provide Clear Prompts</h4>
                        <p className="text-gray-400 text-sm">Describe in detail the code functionality, style, and constraints you want</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-white font-medium">Iterative Optimization</h4>
                        <p className="text-gray-400 text-sm">Use generated code as a starting point and iterate multiple times for best results</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-white font-medium">Code Review</h4>
                        <p className="text-gray-400 text-sm">Always review generated code to ensure it meets your security and quality standards</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Integration Examples */}
        {activeTab === 'examples' && (
          <div className="space-y-8">
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <FileText className="w-8 h-8 text-green-400" />
                Integration Examples
              </h2>
              
              <div className="space-y-6">
                {integrationExamples.map((example, index) => (
                  <div key={index} className="bg-gray-900/50 rounded-xl p-6 border border-gray-600">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-white">{example.title}</h3>
                      <button
                        onClick={() => copyToClipboard(example.code, `example-${index}`)}
                        className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
                      >
                        {copiedCode === `example-${index}` ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                        <span className="text-sm">
                          {copiedCode === `example-${index}` ? 'Copied' : 'Copy Code'}
                        </span>
                      </button>
                    </div>
                    <pre className="bg-gray-900 rounded-lg p-4 text-sm text-gray-300 overflow-x-auto">
                      <code>{example.code}</code>
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Troubleshooting */}
        {activeTab === 'troubleshooting' && (
          <div className="space-y-8">
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Shield className="w-8 h-8 text-red-400" />
                Troubleshooting Guide
              </h2>
              
              <div className="space-y-6">
                {troubleshooting.map((item, index) => (
                  <div key={index} className="bg-gray-900/50 rounded-xl p-6 border border-gray-600">
                    <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                      <span className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-sm font-bold">
                        !
                      </span>
                      {item.issue}
                    </h3>
                    <p className="text-gray-300 mb-4">{item.solution}</p>
                    <div className="bg-gray-800 rounded-lg p-3">
                      <code className="text-red-400 text-sm">{item.code}</code>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 bg-blue-900/30 border border-blue-600 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Need More Help?</h3>
                <p className="text-blue-200 mb-4">
                  If your issue is not listed above, please contact our technical support team.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="mailto:support@nanobanana-ai.com"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Send Email
                  </a>
                  <a
                    href="#"
                    className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Live Chat
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocsPage;