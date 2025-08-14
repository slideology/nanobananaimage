# 通过 GitHub 部署到 Cloudflare Pages 指南

## 项目状态
✅ 项目已成功推送到 GitHub: https://github.com/slideology/nanobananaimage

## 部署步骤

### 第一步：登录 Cloudflare Pages
1. 访问 [Cloudflare Pages](https://pages.cloudflare.com/)
2. 使用您的 Cloudflare 账户登录
3. 如果没有账户，请先注册一个免费账户

### 第二步：连接 GitHub 仓库
1. 在 Cloudflare Pages 控制台中，点击 **"Create a project"**
2. 选择 **"Connect to Git"**
3. 选择 **"GitHub"** 作为 Git 提供商
4. 授权 Cloudflare 访问您的 GitHub 账户
5. 在仓库列表中找到并选择 **"slideology/nanobananaimage"**

### 第三步：配置构建设置
在项目配置页面中设置以下参数：

#### 基本设置
- **Project name**: `nanobananaimage`
- **Production branch**: `main`

#### 构建设置
- **Framework preset**: `Next.js`
- **Build command**: `cd frontend && npm install && npm run build`
- **Build output directory**: `frontend/dist`
- **Root directory**: `/` (保持为根目录)

#### 环境变量（如果需要）
- **NODE_VERSION**: `18`
- **NPM_VERSION**: `latest`

### 第四步：部署项目
1. 点击 **"Save and Deploy"**
2. Cloudflare 将自动开始构建和部署过程
3. 构建过程大约需要 3-5 分钟
4. 部署完成后，您将获得一个 `.pages.dev` 域名

### 第五步：配置自定义域名
1. 在项目设置中，找到 **"Custom domains"** 部分
2. 点击 **"Set up a custom domain"**
3. 输入您的域名：`nanobananaimage.org`
4. 按照提示配置 DNS 记录：
   - 添加 CNAME 记录：`nanobananaimage.org` → `your-project.pages.dev`
   - 或添加 A 记录指向 Cloudflare 的 IP 地址

### 第六步：配置重定向和页面规则
在 **"Functions"** 或 **"Redirects"** 部分添加以下规则：

```
# 重定向规则
/api/* /api/:splat 200
/*    /index.html 200
```

### 第七步：启用 HTTPS
1. 在 **"SSL/TLS"** 设置中
2. 确保启用 **"Always Use HTTPS"**
3. 设置 SSL 证书为 **"Full"** 或 **"Full (strict)"**

## 自动部署

### GitHub 集成优势
- ✅ 每次推送到 `main` 分支时自动部署
- ✅ 支持预览部署（Pull Request）
- ✅ 回滚到之前的版本
- ✅ 构建日志和错误追踪

### 更新网站
要更新网站内容，只需：
1. 在本地修改代码
2. 提交更改：`git add . && git commit -m "更新描述"`
3. 推送到 GitHub：`git push origin main`
4. Cloudflare 将自动检测更改并重新部署

## 验证部署

### 检查项目
1. 访问分配的 `.pages.dev` 域名
2. 确保所有页面正常加载
3. 测试响应式设计（移动端和桌面端）
4. 检查所有链接和图片是否正常显示

### 性能优化
- 启用 Cloudflare 的 CDN 加速
- 配置缓存规则
- 启用 Brotli 压缩
- 使用 Cloudflare 的图片优化功能

## 常见问题解决

### 构建失败
如果构建失败，检查：
1. `package.json` 中的依赖是否正确
2. 构建命令是否正确
3. Node.js 版本是否兼容

### 页面无法访问
1. 检查构建输出目录是否正确
2. 确保 `index.html` 在正确的位置
3. 检查重定向规则

### 自定义域名问题
1. 确保 DNS 记录已正确配置
2. 等待 DNS 传播（可能需要 24-48 小时）
3. 检查域名注册商的设置

## 监控和维护

### 设置监控
- 配置 Cloudflare Analytics
- 设置正常运行时间监控
- 启用错误日志记录

### 定期维护
- 定期更新依赖包
- 监控网站性能
- 备份重要配置

## 联系支持
如果遇到问题：
- Cloudflare 文档：https://developers.cloudflare.com/pages/
- Cloudflare 社区：https://community.cloudflare.com/
- GitHub Issues：在项目仓库中创建 issue

---

**注意**：确保您的 GitHub 仓库是公开的，或者您有 Cloudflare Pages 的付费计划来部署私有仓库。