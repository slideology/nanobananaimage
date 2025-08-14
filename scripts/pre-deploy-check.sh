#!/bin/bash

# 部署前检查脚本
# 验证项目是否准备好部署到 Cloudflare Pages

set -e
export PATH="/usr/local/bin:/usr/bin:/bin:$PATH"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 打印函数
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_header() {
    echo -e "\n${BLUE}=== $1 ===${NC}"
}

# 检查计数器
PASSED=0
FAILED=0
WARNINGS=0

check_pass() {
    print_success "$1"
    ((PASSED++))
}

check_fail() {
    print_error "$1"
    ((FAILED++))
}

check_warning() {
    print_warning "$1"
    ((WARNINGS++))
}

echo -e "${BLUE}🚀 Nano Banana AI - Cloudflare Pages 部署前检查${NC}\n"

# 检查必需工具
print_header "检查必需工具"

if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    check_pass "Node.js 已安装 ($NODE_VERSION)"
else
    check_fail "Node.js 未安装"
fi

if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    check_pass "npm 已安装 ($NPM_VERSION)"
else
    check_fail "npm 未安装"
fi

if command -v wrangler &> /dev/null; then
    WRANGLER_VERSION=$(wrangler --version)
    check_pass "Wrangler CLI 已安装 ($WRANGLER_VERSION)"
else
    check_warning "Wrangler CLI 未安装 - 运行 'npm install -g wrangler' 安装"
fi

# 检查项目结构
print_header "检查项目结构"

if [ -f "frontend/package.json" ]; then
    check_pass "frontend/package.json 存在"
else
    check_fail "frontend/package.json 不存在"
fi

if [ -f "frontend/vite.config.ts" ]; then
    check_pass "frontend/vite.config.ts 存在"
else
    check_fail "frontend/vite.config.ts 不存在"
fi

if [ -f "wrangler.toml" ]; then
    check_pass "wrangler.toml 配置文件存在"
else
    check_fail "wrangler.toml 配置文件不存在"
fi

# 检查部署配置文件
print_header "检查部署配置文件"

if [ -f "frontend/public/_redirects" ]; then
    check_pass "_redirects 文件存在（SPA 路由支持）"
else
    check_fail "_redirects 文件不存在 - SPA 路由可能无法正常工作"
fi

if [ -f "frontend/public/_headers" ]; then
    check_pass "_headers 文件存在（安全和缓存配置）"
else
    check_warning "_headers 文件不存在 - 建议添加安全头配置"
fi

if [ -f "frontend/public/sitemap.xml" ]; then
    check_pass "sitemap.xml 存在（SEO 优化）"
else
    check_warning "sitemap.xml 不存在 - 建议添加站点地图"
fi

if [ -f "frontend/public/robots.txt" ]; then
    check_pass "robots.txt 存在（搜索引擎配置）"
else
    check_warning "robots.txt 不存在 - 建议添加搜索引擎配置"
fi

# 检查构建配置
print_header "检查构建配置"

cd frontend

if grep -q '"build"' package.json; then
    check_pass "构建脚本已配置"
else
    check_fail "package.json 中缺少构建脚本"
fi

if grep -q 'vite build' package.json; then
    check_pass "使用 Vite 构建工具"
else
    check_warning "未检测到 Vite 构建配置"
fi

# 测试构建
print_header "测试构建过程"

print_info "正在安装依赖..."
if npm ci --silent; then
    check_pass "依赖安装成功"
else
    check_fail "依赖安装失败"
fi

print_info "正在测试构建..."
if npm run build --silent; then
    check_pass "项目构建成功"
    
    if [ -d "dist" ]; then
        DIST_SIZE=$(du -sh dist | cut -f1)
        check_pass "构建产物生成成功 (大小: $DIST_SIZE)"
        
        # 检查关键文件
        if [ -f "dist/index.html" ]; then
            check_pass "index.html 存在于构建产物中"
        else
            check_fail "index.html 不存在于构建产物中"
        fi
        
        if [ -d "dist/assets" ]; then
            check_pass "静态资源目录存在"
        else
            check_warning "静态资源目录不存在"
        fi
    else
        check_fail "构建产物目录 (dist) 不存在"
    fi
else
    check_fail "项目构建失败"
fi

cd ..

# 检查 Cloudflare 配置
print_header "检查 Cloudflare 配置"

if grep -q "nanobananaimage" wrangler.toml; then
    check_pass "项目名称已配置"
else
    check_warning "wrangler.toml 中项目名称可能需要调整"
fi

if grep -q "nanobananaimage.org" wrangler.toml; then
    check_pass "自定义域名已配置"
else
    check_warning "自定义域名未配置"
fi

# 检查部署脚本
print_header "检查部署脚本"

if [ -f "scripts/deploy-cloudflare.sh" ]; then
    if [ -x "scripts/deploy-cloudflare.sh" ]; then
        check_pass "Cloudflare 部署脚本存在且可执行"
    else
        check_warning "部署脚本存在但不可执行 - 运行 'chmod +x scripts/deploy-cloudflare.sh'"
    fi
else
    check_fail "Cloudflare 部署脚本不存在"
fi

# 总结
print_header "检查总结"

echo -e "${GREEN}✅ 通过: $PASSED${NC}"
echo -e "${YELLOW}⚠️  警告: $WARNINGS${NC}"
echo -e "${RED}❌ 失败: $FAILED${NC}"

if [ $FAILED -eq 0 ]; then
    echo -e "\n${GREEN}🎉 项目已准备好部署到 Cloudflare Pages!${NC}"
    echo -e "${BLUE}💡 下一步:${NC}"
    echo -e "   1. 运行 'wrangler login' 登录 Cloudflare"
    echo -e "   2. 运行 './scripts/deploy-cloudflare.sh production' 部署"
    echo -e "   3. 在 Cloudflare Dashboard 中配置自定义域名"
else
    echo -e "\n${RED}⚠️  发现 $FAILED 个问题需要解决后才能部署${NC}"
    echo -e "${BLUE}💡 请查看上述错误信息并修复后重新运行检查${NC}"
fi

if [ $WARNINGS -gt 0 ]; then
    echo -e "\n${YELLOW}💡 建议处理 $WARNINGS 个警告以获得更好的部署体验${NC}"
fi

echo -e "\n${BLUE}📖 详细部署指南请查看: CLOUDFLARE_DEPLOYMENT.md${NC}"

exit $FAILED