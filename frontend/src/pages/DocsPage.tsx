import React, { useState } from 'react';
import { Book, Code, FileText, Zap, Shield, Globe, ChevronRight, Copy, Check } from 'lucide-react';
import { useSiteConfig } from '../hooks/useSiteConfig';

/**
 * 技术文档页面组件
 * 提供API文档、开发者指南、集成示例和故障排除指南
 */
const DocsPage: React.FC = () => {
  const { siteConfig } = useSiteConfig();
  const [activeTab, setActiveTab] = useState('api');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  /**
   * 复制代码到剪贴板
   * @param code - 要复制的代码字符串
   * @param id - 代码块的唯一标识
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

  // API端点配置
  const apiEndpoints = [
    {
      method: 'POST',
      endpoint: '/api/v1/generate',
      description: '生成代码',
      params: {
        prompt: 'string - 代码生成提示',
        language: 'string - 目标编程语言',
        framework: 'string - 可选框架',
        complexity: 'string - 复杂度级别 (simple|medium|complex)'
      },
      example: `{
  "prompt": "创建一个React Todo组件",
  "language": "javascript",
  "framework": "react",
  "complexity": "medium"
}`
    },
    {
      method: 'POST',
      endpoint: '/api/v1/optimize',
      description: '优化现有代码',
      params: {
        code: 'string - 要优化的代码',
        language: 'string - 编程语言',
        optimization_type: 'string - 优化类型 (performance|readability|security)'
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
      description: '代码审查',
      params: {
        code: 'string - 要审查的代码',
        language: 'string - 编程语言',
        review_level: 'string - 审查级别 (basic|detailed|comprehensive)'
      },
      example: `{
  "code": "const users = data.filter(user => user.active == true)",
  "language": "javascript",
  "review_level": "detailed"
}`
    }
  ];

  // 集成示例
  const integrationExamples = [
    {
      title: 'JavaScript/Node.js',
      language: 'javascript',
      code: `// 安装SDK
npm install qwen3-coder-sdk

// 基本使用
const { Qwen3Coder } = require('qwen3-coder-sdk');

const client = new Qwen3Coder({
  apiKey: 'your-api-key',
  baseURL: 'https://api.qwen3coder.com'
});

async function generateCode() {
  try {
    const result = await client.generate({
      prompt: '创建一个Express.js路由处理器',
      language: 'javascript',
      framework: 'express'
    });
    
    console.log('生成的代码:', result.code);
    console.log('说明:', result.explanation);
  } catch (error) {
    console.error('生成失败:', error.message);
  }
}`
    },
    {
      title: 'Python',
      language: 'python',
      code: `# 安装SDK
pip install qwen3-coder-python

# 基本使用
from qwen3_coder import Qwen3Coder

client = Qwen3Coder(
    api_key="your-api-key",
    base_url="https://api.qwen3coder.com"
)

def generate_code():
    try:
        result = client.generate(
            prompt="创建一个FastAPI端点",
            language="python",
            framework="fastapi"
        )
        
        print(f"生成的代码: {result.code}")
        print(f"说明: {result.explanation}")
    except Exception as error:
        print(f"生成失败: {error}")

if __name__ == "__main__":
    generate_code()`
    },
    {
      title: 'cURL',
      language: 'bash',
      code: `# 直接API调用
curl -X POST https://api.qwen3coder.com/api/v1/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-api-key" \
  -d '{
    "prompt": "创建一个Go HTTP服务器",
    "language": "go",
    "complexity": "medium"
  }'

# 响应示例
{
  "success": true,
  "data": {
    "code": "package main\n\nimport (\n  \"fmt\"\n  \"net/http\"\n)\n\nfunc main() {\n  http.HandleFunc(\"/\", handler)\n  fmt.Println(\"Server starting on :8080\")\n  http.ListenAndServe(\":8080\", nil)\n}\n\nfunc handler(w http.ResponseWriter, r *http.Request) {\n  fmt.Fprintf(w, \"Hello, World!\")\n}",
    "explanation": "这是一个简单的Go HTTP服务器...",
    "suggestions": ["添加错误处理", "使用路由器"]
  }
}`
    }
  ];

  // 故障排除指南
  const troubleshooting = [
    {
      issue: 'API密钥无效',
      solution: '请确保您的API密钥正确，并且账户有足够的配额。检查密钥是否已过期。',
      code: 'HTTP 401 Unauthorized'
    },
    {
      issue: '请求超时',
      solution: '复杂的代码生成可能需要更长时间。建议增加超时时间或简化提示。',
      code: 'HTTP 408 Request Timeout'
    },
    {
      issue: '生成的代码质量不佳',
      solution: '尝试提供更详细和具体的提示。包含上下文信息和期望的代码风格。',
      code: '优化提示示例："创建一个React函数组件，使用TypeScript，包含props类型定义"'
    },
    {
      issue: '不支持的编程语言',
      solution: '查看支持的语言列表。我们持续添加新语言支持。',
      code: 'HTTP 400 Bad Request'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* 页面头部 */}
      <div className="relative pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              技术文档
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                开发者指南
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              完整的API文档、集成示例和最佳实践，帮助您快速集成Qwen3-Coder
            </p>
          </div>
        </div>
      </div>

      {/* 导航标签 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { id: 'api', label: 'API文档', icon: Code },
            { id: 'guide', label: '开发者指南', icon: Book },
            { id: 'examples', label: '集成示例', icon: FileText },
            { id: 'troubleshooting', label: '故障排除', icon: Shield }
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

      {/* 内容区域 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* API文档 */}
        {activeTab === 'api' && (
          <div className="space-y-8">
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Code className="w-8 h-8 text-blue-400" />
                API端点
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
                        <h4 className="text-white font-semibold mb-3">参数</h4>
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
                          <h4 className="text-white font-semibold">请求示例</h4>
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
                              {copiedCode === `api-${index}` ? '已复制' : '复制'}
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

        {/* 开发者指南 */}
        {activeTab === 'guide' && (
          <div className="space-y-8">
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Book className="w-8 h-8 text-purple-400" />
                快速开始
              </h2>
              
              <div className="space-y-8">
                <div className="bg-gray-900/50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                    获取API密钥
                  </h3>
                  <p className="text-gray-300 mb-4">
                    首先，您需要在我们的开发者控制台注册账户并获取API密钥。
                  </p>
                  <div className="bg-blue-900/30 border border-blue-600 rounded-lg p-4">
                    <p className="text-blue-200 text-sm">
                      💡 提示：请妥善保管您的API密钥，不要在客户端代码中暴露。
                    </p>
                  </div>
                </div>

                <div className="bg-gray-900/50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                    选择集成方式
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
                      <Zap className="w-8 h-8 text-yellow-400 mb-3" />
                      <h4 className="text-white font-semibold mb-2">REST API</h4>
                      <p className="text-gray-400 text-sm">直接调用HTTP API，适合任何编程语言</p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
                      <Code className="w-8 h-8 text-green-400 mb-3" />
                      <h4 className="text-white font-semibold mb-2">SDK</h4>
                      <p className="text-gray-400 text-sm">使用官方SDK，提供更好的开发体验</p>
                    </div>
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-600">
                      <Globe className="w-8 h-8 text-blue-400 mb-3" />
                      <h4 className="text-white font-semibold mb-2">Web界面</h4>
                      <p className="text-gray-400 text-sm">通过Web界面快速测试和原型开发</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/50 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                    最佳实践
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-white font-medium">提供清晰的提示</h4>
                        <p className="text-gray-400 text-sm">详细描述您想要的代码功能、风格和约束条件</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-white font-medium">迭代优化</h4>
                        <p className="text-gray-400 text-sm">使用生成的代码作为起点，通过多次迭代达到最佳效果</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-white font-medium">代码审查</h4>
                        <p className="text-gray-400 text-sm">始终审查生成的代码，确保符合您的安全和质量标准</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 集成示例 */}
        {activeTab === 'examples' && (
          <div className="space-y-8">
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <FileText className="w-8 h-8 text-green-400" />
                集成示例
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
                          {copiedCode === `example-${index}` ? '已复制' : '复制代码'}
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

        {/* 故障排除 */}
        {activeTab === 'troubleshooting' && (
          <div className="space-y-8">
            <div className="bg-gray-800/50 rounded-2xl p-8 border border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Shield className="w-8 h-8 text-red-400" />
                常见问题解决
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
                <h3 className="text-xl font-semibold text-white mb-3">需要更多帮助？</h3>
                <p className="text-blue-200 mb-4">
                  如果您遇到的问题不在上述列表中，请联系我们的技术支持团队。
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="mailto:support@qwen3coder.com"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    发送邮件
                  </a>
                  <a
                    href="#"
                    className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    在线聊天
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