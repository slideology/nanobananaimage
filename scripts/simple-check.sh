#!/bin/bash

# 简化的部署前检查脚本
echo "🚀 Cloudflare Pages 部署检查"
echo ""

# 检查基本工具
echo "=== 检查工具 ==="
if command -v node >/dev/null 2>&1; then
    echo "✅ Node.js: $(node --version)"
else
    echo "❌ Node.js 未安装"
    exit 1
fi

if command -v npm >/dev/null 2>&1; then
    echo "✅ npm: $(npm --version)"
else
    echo "❌ npm 未安装"
    exit 1
fi

if command -v wrangler >/dev/null 2>&1; then
    echo "✅ Wrangler CLI: $(wrangler --version)"
else
    echo "⚠️  Wrangler CLI 未安装 - 需要运行: npm install -g wrangler"
fi

echo ""
echo "=== 检查项目文件 ==="

# 检查关键文件
if [ -f "frontend/package.json" ]; then
    echo "✅ frontend/package.json 存在"
else
    echo "❌ frontend/package.json 不存在"
    exit 1
fi

if [ -f "wrangler.toml" ]; then
    echo "✅ wrangler.toml 存在"
else
    echo "❌ wrangler.toml 不存在"
    exit 1
fi

if [ -f "frontend/public/_redirects" ]; then
    echo "✅ _redirects 文件存在"
else
    echo "⚠️  _redirects 文件不存在"
fi

if [ -f "frontend/public/_headers" ]; then
    echo "✅ _headers 文件存在"
else
    echo "⚠️  _headers 文件不存在"
fi

echo ""
echo "=== 测试构建 ==="

cd frontend

echo "正在安装依赖..."
if npm ci --silent; then
    echo "✅ 依赖安装成功"
else
    echo "❌ 依赖安装失败"
    exit 1
fi

echo "正在构建项目..."
if npm run build --silent; then
    echo "✅ 项目构建成功"
    if [ -d "dist" ]; then
        echo "✅ 构建产物生成: $(du -sh dist | cut -f1)"
    else
        echo "❌ 构建产物目录不存在"
        exit 1
    fi
else
    echo "❌ 项目构建失败"
    exit 1
fi

cd ..

echo ""
echo "🎉 项目已准备好部署!"
echo ""
echo "下一步:"
echo "1. 运行 'wrangler login' 登录 Cloudflare"
echo "2. 运行 './scripts/deploy-cloudflare.sh production' 部署"
echo "3. 在 Cloudflare Dashboard 中配置域名"
echo ""
echo "详细指南: CLOUDFLARE_DEPLOYMENT.md"