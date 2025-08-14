#!/bin/bash

# Cloudflare Pages 部署脚本
# 使用方法: ./scripts/deploy-cloudflare.sh [staging|production]

set -e  # 遇到错误立即退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # 无颜色

# 打印彩色消息
print_message() {
    echo -e "${2}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

print_success() {
    print_message "$1" "$GREEN"
}

print_error() {
    print_message "$1" "$RED"
}

print_warning() {
    print_message "$1" "$YELLOW"
}

print_info() {
    print_message "$1" "$BLUE"
}

# 检查参数
ENVIRONMENT=${1:-production}

if [[ "$ENVIRONMENT" != "staging" && "$ENVIRONMENT" != "production" ]]; then
    print_error "错误: 无效的环境参数。请使用 'staging' 或 'production'"
    exit 1
fi

print_info "开始部署到 Cloudflare Pages ($ENVIRONMENT 环境)..."

# 检查必需工具
print_info "检查必需工具..."
if ! command -v node &> /dev/null; then
    print_error "Node.js 未安装"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    print_error "npm 未安装"
    exit 1
fi

if ! command -v npx &> /dev/null; then
    print_error "npx 未安装"
    exit 1
fi

# 检查是否安装了 wrangler
if ! command -v wrangler &> /dev/null; then
    print_warning "Wrangler CLI 未安装，正在安装..."
    npm install -g wrangler
fi

# 进入项目根目录
cd "$(dirname "$0")/.."

# 清理之前的构建
print_info "清理之前的构建..."
rm -rf frontend/dist
rm -rf frontend/node_modules/.cache

# 进入前端目录
cd frontend

# 安装依赖
print_info "安装依赖..."
npm ci

# 构建项目
print_info "构建项目..."
npm run build

if [ $? -ne 0 ]; then
    print_error "构建失败"
    exit 1
fi

print_success "构建完成"

# 检查构建产物
if [ ! -d "dist" ]; then
    print_error "构建产物目录不存在"
    exit 1
fi

print_info "构建产物大小:"
du -sh dist/

# 返回项目根目录
cd ..

# 部署到 Cloudflare Pages
print_info "部署到 Cloudflare Pages..."

if [ "$ENVIRONMENT" = "production" ]; then
    print_info "部署到生产环境..."
    wrangler pages deploy frontend/dist --project-name=nanobananaimage --env=production
else
    print_info "部署到测试环境..."
    wrangler pages deploy frontend/dist --project-name=nanobananaimage-staging --env=staging
fi

if [ $? -ne 0 ]; then
    print_error "部署失败"
    exit 1
fi

print_success "部署完成!"

# 输出部署信息
print_info "部署信息:"
print_info "- 环境: $ENVIRONMENT"
print_info "- 构建时间: $(date)"
print_info "- 构建产物: frontend/dist/"

if [ "$ENVIRONMENT" = "production" ]; then
    print_info "- 生产环境 URL: https://nanobananaimage.org"
    print_info "- Cloudflare Pages URL: https://nanobananaimage.pages.dev"
else
    print_info "- 测试环境 URL: https://nanobananaimage-staging.pages.dev"
fi

print_success "🎉 Cloudflare Pages 部署完成!"
print_info "💡 提示: 如果这是首次部署，请在 Cloudflare Dashboard 中配置自定义域名"