# HTTP到HTTPS重定向配置指南

## 概述
为了确保网站安全，我们需要将所有HTTP请求自动重定向到HTTPS。这个指南将详细说明如何配置HTTP到HTTPS的重定向。

## 已完成的配置

### 1. _redirects 文件配置
我已经在 `frontend/public/_redirects` 文件中添加了以下重定向规则：

```
# HTTP到HTTPS重定向配置
# 强制所有HTTP请求重定向到HTTPS
http://nanobananaimage.org/*    https://nanobananaimage.org/:splat    301!
http://www.nanobananaimage.org/*    https://www.nanobananaimage.org/:splat    301!

# WWW到非WWW重定向（可选）
https://www.nanobananaimage.org/*    https://nanobananaimage.org/:splat    301!
```

**解释：**
- `301!` 表示永久重定向，感叹号确保这个规则优先执行
- `:splat` 保留原始URL路径
- 同时处理带www和不带www的域名

### 2. _headers 文件配置
我已经在 `frontend/public/_headers` 文件中添加了HSTS安全头：

```
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
```

**解释：**
- `max-age=31536000`：告诉浏览器在一年内强制使用HTTPS
- `includeSubDomains`：包括所有子域名
- `preload`：允许加入HSTS预加载列表

## Cloudflare Pages 额外配置

### 在Cloudflare控制台中的设置

1. **登录Cloudflare控制台**
   - 访问 https://dash.cloudflare.com/
   - 选择你的域名 `nanobananaimage.org`

2. **SSL/TLS设置**
   - 进入 "SSL/TLS" 选项卡
   - 将加密模式设置为 "Full" 或 "Full (strict)"
   - 启用 "Always Use HTTPS"

3. **页面规则（Page Rules）**
   如果需要额外保障，可以添加页面规则：
   ```
   http://*nanobananaimage.org/*
   设置：Always Use HTTPS
   ```

4. **边缘证书**
   - 确保 "Universal SSL" 已启用
   - 检查证书状态为 "Active"

## 验证重定向是否生效

### 方法1：浏览器测试
1. 在浏览器地址栏输入：`http://nanobananaimage.org`
2. 按回车，应该自动跳转到：`https://nanobananaimage.org`
3. 检查地址栏是否显示锁图标

### 方法2：命令行测试
```bash
curl -I http://nanobananaimage.org
```
应该返回301重定向状态码和Location头指向HTTPS版本。

### 方法3：在线工具
- 使用 https://www.redirect-checker.org/
- 输入HTTP版本的URL
- 检查是否正确重定向到HTTPS

## 安全最佳实践

### 1. HSTS预加载
考虑将域名提交到HSTS预加载列表：
- 访问 https://hstspreload.org/
- 提交你的域名
- 这将确保浏览器永远不会通过HTTP访问你的网站

### 2. 内容安全策略（CSP）
在_headers文件中可以添加：
```
Content-Security-Policy: upgrade-insecure-requests
```

### 3. 定期检查
- 定期测试重定向是否正常工作
- 监控SSL证书到期时间
- 检查安全头是否正确设置

## 常见问题解决

### 问题1：重定向不生效
**可能原因：**
- DNS缓存问题
- Cloudflare缓存问题
- 配置文件语法错误

**解决方案：**
1. 清除浏览器缓存
2. 在Cloudflare控制台清除缓存
3. 检查_redirects文件语法
4. 等待DNS传播（最多48小时）

### 问题2：混合内容警告
**可能原因：**
- 页面中包含HTTP资源（图片、CSS、JS等）

**解决方案：**
1. 将所有资源链接改为HTTPS
2. 使用相对路径
3. 添加CSP头 `upgrade-insecure-requests`

### 问题3：证书错误
**可能原因：**
- SSL证书未正确配置
- 证书过期

**解决方案：**
1. 检查Cloudflare SSL设置
2. 确保Universal SSL已启用
3. 联系Cloudflare支持

## 部署说明

配置文件已经更新，当你下次部署到Cloudflare Pages时，这些重定向规则将自动生效。

### 部署步骤：
1. 提交代码到GitHub
2. Cloudflare Pages会自动检测更改
3. 重新构建和部署
4. 测试重定向是否正常工作

## 监控和维护

### 定期检查项目：
- [ ] HTTP到HTTPS重定向正常
- [ ] SSL证书有效且未过期
- [ ] HSTS头正确设置
- [ ] 没有混合内容警告
- [ ] 所有子域名都支持HTTPS

---

**注意：** 这些配置确保了网站的安全性，防止中间人攻击和数据泄露。HTTPS重定向是现代网站的基本安全要求。