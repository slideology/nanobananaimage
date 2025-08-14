# Cloudflare Pages 部署指南

本指南将帮助您将 Nano Banana AI 网站部署到 Cloudflare Pages，并绑定到 nanobananaimage.org 域名。

## 📋 部署前检查清单

### ✅ 项目配置检查

您的项目已经具备以下 Cloudflare Pages 部署所需的配置：

1. **构建配置** ✅
   - `frontend/package.json` 包含正确的构建脚本
   - `frontend/vite.config.ts` 配置了正确的构建输出目录 (`dist`)
   - 构建命令: `npm run build`
   - 输出目录: `frontend/dist`

2. **路由配置** ✅
   - `frontend/public/_redirects` 文件配置了 SPA 路由重定向
   - 支持 React Router 的客户端路由

3. **安全配置** ✅
   - `frontend/public/_headers` 文件配置了安全头和缓存策略
   - 包含 XSS 保护、内容类型检查等安全措施

4. **SEO 配置** ✅
   - `frontend/public/sitemap.xml` 站点地图
   - `frontend/public/robots.txt` 搜索引擎配置
   - 各页面包含完整的 SEO 元数据

5. **Cloudflare 配置** ✅
   - `wrangler.toml` Cloudflare 项目配置文件
   - `scripts/deploy-cloudflare.sh` 自动化部署脚本

## 🚀 部署步骤

### 方法一：使用自动化脚本（推荐）

1. **安装 Wrangler CLI**（如果尚未安装）
   ```bash
   npm install -g wrangler
   ```

2. **登录 Cloudflare**
   ```bash
   wrangler login
   ```
   这将打开浏览器，请登录您的 Cloudflare 账户并授权。

3. **运行部署脚本**
   ```bash
   # 部署到生产环境
   ./scripts/deploy-cloudflare.sh production
   
   # 或部署到测试环境
   ./scripts/deploy-cloudflare.sh staging
   ```

### 方法二：手动部署

1. **构建项目**
   ```bash
   cd frontend
   npm ci
   npm run build
   ```

2. **部署到 Cloudflare Pages**
   ```bash
   cd ..
   wrangler pages deploy frontend/dist --project-name=nanobananaimage
   ```

## 🌐 域名配置

### 在 Cloudflare Dashboard 中配置自定义域名

1. **登录 Cloudflare Dashboard**
   - 访问 [dash.cloudflare.com](https://dash.cloudflare.com)
   - 选择您的账户

2. **进入 Pages 项目**
   - 点击左侧菜单的 "Pages"
   - 选择 "nanobananaimage" 项目

3. **添加自定义域名**
   - 点击 "Custom domains" 标签
   - 点击 "Set up a custom domain"
   - 输入 `nanobananaimage.org`
   - 点击 "Continue"

4. **配置 DNS 记录**
   - 如果域名已在 Cloudflare 管理，系统会自动添加 CNAME 记录
   - 如果域名在其他服务商，请按照提示添加 CNAME 记录：
     ```
     Type: CNAME
     Name: @
     Target: nanobananaimage.pages.dev
     ```

5. **添加 www 子域名**（可选）
   - 重复上述步骤，添加 `www.nanobananaimage.org`
   - 或在 DNS 中添加：
     ```
     Type: CNAME
     Name: www
     Target: nanobananaimage.pages.dev
     ```

## 🔧 高级配置

### 环境变量配置

如果您的应用需要环境变量：

1. 在 Cloudflare Pages 项目设置中
2. 进入 "Settings" > "Environment variables"
3. 添加所需的环境变量

### 构建配置优化

当前构建配置已优化：
- 使用 ESBuild 进行快速构建
- 代码分割优化加载性能
- 静态资源长期缓存
- 安全头配置

## 📊 部署后验证

### 检查项目状态

1. **访问网站**
   - 生产环境: https://nanobananaimage.org
   - Cloudflare Pages URL: https://nanobananaimage.pages.dev

2. **验证功能**
   - [ ] 首页正常加载
   - [ ] 路由跳转正常
   - [ ] 图片上传功能正常
   - [ ] 隐私政策和服务条款页面可访问
   - [ ] 移动端响应式布局正常

3. **性能检查**
   - 使用 [PageSpeed Insights](https://pagespeed.web.dev/) 检查性能
   - 使用 [GTmetrix](https://gtmetrix.com/) 检查加载速度

## 🔄 持续部署

### 设置 Git 集成（推荐）

1. **连接 Git 仓库**
   - 在 Cloudflare Pages 项目设置中
   - 选择 "Settings" > "Builds & deployments"
   - 连接您的 GitHub/GitLab 仓库

2. **配置自动部署**
   - 生产分支: `main` 或 `master`
   - 构建命令: `cd frontend && npm run build`
   - 构建输出目录: `frontend/dist`

3. **预览部署**
   - 每个 Pull Request 都会自动创建预览部署
   - 便于测试新功能

## 🛠️ 故障排除

### 常见问题

1. **构建失败**
   - 检查 `frontend/package.json` 中的依赖版本
   - 确保 Node.js 版本兼容（推荐 18.x 或更高）

2. **路由 404 错误**
   - 确认 `_redirects` 文件存在于 `frontend/public/` 目录
   - 检查文件内容是否正确

3. **域名解析问题**
   - 使用 `dig` 或 `nslookup` 检查 DNS 记录
   - 等待 DNS 传播（通常 24-48 小时）

4. **SSL 证书问题**
   - Cloudflare 会自动提供 SSL 证书
   - 如有问题，检查 SSL/TLS 设置为 "Full" 或 "Full (strict)"

### 获取帮助

- [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
- [Cloudflare 社区](https://community.cloudflare.com/)
- 项目 Issues: 在项目仓库中创建 Issue

## 📈 监控和分析

### Cloudflare Analytics

1. **访问分析**
   - 在 Cloudflare Dashboard 中查看 "Analytics" 标签
   - 监控访问量、带宽使用等

2. **Web Analytics**
   - 启用 Cloudflare Web Analytics
   - 获得详细的用户行为数据

### 性能监控

- 设置 Lighthouse CI 进行持续性能监控
- 使用 Cloudflare 的 Speed 标签监控加载时间

---

🎉 **恭喜！** 您的 Nano Banana AI 网站现在已经成功部署到 Cloudflare Pages！

如果您遇到任何问题，请参考故障排除部分或联系技术支持。