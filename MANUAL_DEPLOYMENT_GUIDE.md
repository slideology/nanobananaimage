# 手动部署到 Cloudflare Pages 指南

本指南将详细介绍如何手动将项目部署到 Cloudflare Pages，无需使用脚本或命令行工具。

## 📋 部署前准备

### 1. 确保项目已准备就绪
- 确认所有域名配置已更新为 `nanobananaimage.org`
- 确认项目可以正常构建
- 确认所有必要的配置文件存在

### 2. 注册 Cloudflare 账户
1. 访问 [Cloudflare官网](https://www.cloudflare.com/)
2. 点击 "Sign Up" 注册账户
3. 验证邮箱并完成账户设置

## 🚀 手动部署步骤

### 步骤 1: 构建项目

1. **打开终端或命令提示符**
   - Mac: 按 `Cmd + 空格`，输入 "Terminal"
   - Windows: 按 `Win + R`，输入 "cmd"

2. **进入项目目录**
   ```bash
   cd /Users/dahuang/CascadeProjects/内容站/nanobananaimage
   ```

3. **进入前端目录并安装依赖**
   ```bash
   cd frontend
   npm install
   ```

4. **构建项目**
   ```bash
   npm run build
   ```
   
   构建完成后，会在 `frontend/dist` 目录生成静态文件。

### 步骤 2: 登录 Cloudflare Pages

1. 访问 [Cloudflare Pages](https://pages.cloudflare.com/)
2. 使用你的 Cloudflare 账户登录
3. 点击 "Create a project" 创建新项目

### 步骤 3: 选择部署方式

1. **选择 "Upload assets" 选项**
   - 这是手动上传文件的方式
   - 适合不使用 Git 仓库的情况

2. **或者选择 "Connect to Git" 选项**
   - 如果你的代码已经上传到 GitHub/GitLab
   - 可以实现自动部署

### 步骤 4A: 手动上传文件（推荐）

1. **准备上传文件**
   - 打开 `frontend/dist` 文件夹
   - 选择所有文件和文件夹
   - 创建一个 ZIP 压缩包

2. **上传到 Cloudflare Pages**
   - 在 Cloudflare Pages 界面中
   - 拖拽 ZIP 文件到上传区域
   - 或点击 "Select from computer" 选择文件

3. **配置项目设置**
   - **项目名称**: `nanobananaimage`
   - **生产分支**: `main`（如果使用 Git）
   - **构建命令**: `npm run build`（如果使用 Git）
   - **构建输出目录**: `dist`（如果使用 Git）

### 步骤 4B: 连接 Git 仓库（可选）

1. **选择代码仓库**
   - 选择 GitHub、GitLab 或 Bitbucket
   - 授权 Cloudflare 访问你的仓库
   - 选择 `nanobananaimage` 仓库

2. **配置构建设置**
   - **框架预设**: `Vite`
   - **构建命令**: `cd frontend && npm install && npm run build`
   - **构建输出目录**: `frontend/dist`
   - **根目录**: `/`

### 步骤 5: 配置环境变量（如果需要）

1. 在项目设置中找到 "Environment variables"
2. 添加必要的环境变量：
   ```
   NODE_VERSION=18
   NPM_VERSION=latest
   ```

### 步骤 6: 部署项目

1. **开始部署**
   - 点击 "Save and Deploy" 按钮
   - 等待部署完成（通常需要 2-5 分钟）

2. **查看部署状态**
   - 在 Cloudflare Pages 控制台查看部署进度
   - 部署成功后会显示绿色的 "Success" 状态

### 步骤 7: 配置自定义域名

1. **添加自定义域名**
   - 在项目设置中找到 "Custom domains"
   - 点击 "Set up a custom domain"
   - 输入 `nanobananaimage.org`

2. **配置 DNS 记录**
   - 在你的域名注册商处添加 CNAME 记录
   - 或者将域名的 DNS 服务器指向 Cloudflare

3. **等待 DNS 生效**
   - DNS 更改通常需要 24-48 小时生效
   - 可以使用在线 DNS 检查工具验证

## 🔧 部署后配置

### 1. 配置重定向规则

在 Cloudflare Pages 项目设置中：

1. **页面规则**
   - 添加 `www.nanobananaimage.org/*` → `nanobananaimage.org/$1`
   - 设置为 301 永久重定向

2. **SPA 路由支持**
   - 确保 `_redirects` 文件已包含在构建输出中
   - 内容应该是：`/* /index.html 200`

### 2. 配置安全头

确保 `_headers` 文件包含以下内容：
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

### 3. 配置缓存

在 Cloudflare 控制台中：
1. 进入 "Caching" 设置
2. 设置适当的缓存规则
3. 启用 "Always Online" 功能

## 📊 验证部署

### 1. 功能测试
- [ ] 网站可以正常访问
- [ ] 所有页面链接正常工作
- [ ] 图片和资源正常加载
- [ ] 响应式设计在移动设备上正常

### 2. SEO 检查
- [ ] robots.txt 可访问
- [ ] sitemap.xml 可访问
- [ ] Meta 标签正确显示
- [ ] Open Graph 数据正确

### 3. 性能测试
- 使用 [PageSpeed Insights](https://pagespeed.web.dev/) 测试
- 使用 [GTmetrix](https://gtmetrix.com/) 测试
- 检查 Core Web Vitals 指标

## 🔄 更新部署

### 手动更新
1. 在本地重新构建项目
2. 在 Cloudflare Pages 控制台上传新的构建文件
3. 等待部署完成

### 自动更新（如果使用 Git）
1. 将代码推送到 Git 仓库
2. Cloudflare Pages 会自动检测更改并重新部署

## ❗ 常见问题

### 问题 1: 部署失败
**解决方案**:
- 检查构建日志中的错误信息
- 确保所有依赖都已正确安装
- 检查 Node.js 版本兼容性

### 问题 2: 404 错误
**解决方案**:
- 确保 `_redirects` 文件存在
- 检查路由配置是否正确
- 验证构建输出目录设置

### 问题 3: 域名无法访问
**解决方案**:
- 检查 DNS 记录是否正确
- 等待 DNS 传播完成
- 使用 DNS 检查工具验证

### 问题 4: SSL 证书问题
**解决方案**:
- Cloudflare 会自动提供 SSL 证书
- 等待证书生成完成（通常几分钟）
- 检查 SSL/TLS 设置

## 📞 获取帮助

如果遇到问题，可以：
1. 查看 [Cloudflare Pages 文档](https://developers.cloudflare.com/pages/)
2. 访问 [Cloudflare 社区论坛](https://community.cloudflare.com/)
3. 联系 Cloudflare 技术支持

---

**恭喜！** 🎉 你已经成功将网站部署到 Cloudflare Pages。现在你的网站可以通过 `nanobananaimage.org` 访问了！