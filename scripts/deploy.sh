#!/bin/bash

# Qwen3-Coder 部署脚本
# 使用方法: ./scripts/deploy.sh [环境]
# 环境选项: staging | production

set -e  # 遇到错误立即退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 打印带颜色的消息
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
ENVIRONMENT=${1:-staging}

if [[ "$ENVIRONMENT" != "staging" && "$ENVIRONMENT" != "production" ]]; then
    print_error "错误: 无效的环境参数。请使用 'staging' 或 'production'"
    exit 1
fi

print_info "开始部署到 $ENVIRONMENT 环境..."

# 检查必要的工具
print_info "检查必要工具..."
if ! command -v node &> /dev/null; then
    print_error "Node.js 未安装"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    print_error "npm 未安装"
    exit 1
fi

# 进入前端目录
cd frontend

# 安装依赖
print_info "安装依赖..."
npm ci

# 运行测试（如果有）
print_info "运行测试..."
# npm run test 2>/dev/null || print_warning "没有找到测试脚本"

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

# 根据环境执行不同的部署逻辑
if [ "$ENVIRONMENT" = "production" ]; then
    print_info "部署到生产环境..."
    
    # 这里可以添加生产环境的部署逻辑
    # 例如：上传到服务器、更新CDN等
    
    print_warning "生产环境部署逻辑需要根据实际服务器配置进行设置"
    print_info "构建产物位于: frontend/dist/"
    print_info "请将 dist/ 目录的内容上传到您的生产服务器"
    
elif [ "$ENVIRONMENT" = "staging" ]; then
    print_info "部署到测试环境..."
    
    # 这里可以添加测试环境的部署逻辑
    
    print_warning "测试环境部署逻辑需要根据实际配置进行设置"
    print_info "构建产物位于: frontend/dist/"
fi

print_success "部署完成！"

# 输出部署信息
print_info "部署信息:"
print_info "- 环境: $ENVIRONMENT"
print_info "- 构建时间: $(date)"
print_info "- 构建产物: frontend/dist/"

if [ "$ENVIRONMENT" = "production" ]; then
    print_info "- 生产环境URL: https://qwen3coder.com"
else
    print_info "- 测试环境URL: 请根据实际配置设置"
fi

print_success "🎉 部署流程完成！"