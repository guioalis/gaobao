# VuePress与Deno集成部署指南

本文档提供了如何将VuePress静态网站与Deno后端服务集成部署的详细步骤。

## 项目架构

本项目包含两个主要部分：
1. **VuePress静态网站**：提供用户界面和基本内容展示
2. **Deno后端服务**：提供API接口和数据处理功能

## 部署流程

### 1. 构建VuePress静态网站

首先，需要构建VuePress静态网站：

```bash
# 构建VuePress静态网站
npm run docs:build
```

这将在`docs/.vuepress/dist`目录下生成静态网站文件。

### 2. 配置Deno静态文件服务

修改`main.js`文件，确保Deno可以正确提供VuePress构建的静态文件：

```javascript
// 静态文件服务 - 修改为指向VuePress构建目录
if (pathname === "/" || pathname.startsWith("/") && !pathname.startsWith("/api/")) {
  const filePath = pathname === "/" ? "/index.html" : pathname;
  return await serveFile(req, join(Deno.cwd(), "docs/.vuepress/dist", filePath));
}
```

### 3. 创建部署脚本

创建一个部署脚本`deploy.js`，自动化部署流程：

```javascript
// deploy.js
async function deploy() {
  // 1. 构建VuePress静态网站
  console.log("构建VuePress静态网站...");
  const buildProcess = Deno.run({
    cmd: ["npm", "run", "docs:build"],
    stdout: "piped"
  });
  await buildProcess.status();
  
  // 2. 部署到Deno Deploy
  console.log("部署到Deno Deploy...");
  const deployProcess = Deno.run({
    cmd: ["deployctl", "deploy", "--project=college-advisor", "--prod", "main.js"],
    stdout: "piped"
  });
  await deployProcess.status();
  
  console.log("部署完成！");
}

deploy();
```

### 4. 配置deno.json

确保`deno.json`包含集成部署所需的任务：

```json
{
  "tasks": {
    "start": "deno run --allow-net --allow-read --allow-env main.js",
    "build": "deno compile --output dist/app --allow-net --allow-read --allow-env main.js",
    "deploy": "deployctl deploy --project=college-advisor --prod main.js",
    "build:vuepress": "npm run docs:build",
    "deploy:all": "npm run docs:build && deno task deploy"
  }
}
```

## 本地测试集成环境

在部署前，可以在本地测试集成环境：

```bash
# 构建VuePress静态网站
npm run docs:build

# 启动Deno服务
deno task start
```

访问 http://localhost:8000 确认应用正常运行。

## 注意事项

1. **路径处理**：确保Deno服务正确处理VuePress的路由和静态资源路径
2. **API接口**：VuePress前端通过fetch调用Deno提供的API接口
3. **环境变量**：在Deno Deploy平台上配置必要的环境变量
4. **静态资源**：确保VuePress的静态资源（CSS、JavaScript、图片等）能被正确访问

## 故障排除

如果集成部署后遇到问题：

1. 检查浏览器控制台是否有资源加载错误
2. 验证API请求路径是否正确
3. 确认Deno服务是否正确处理静态文件请求
4. 检查VuePress构建输出是否完整

## 相关资源

- [VuePress文档](https://vuepress.vuejs.org/)
- [Deno Deploy文档](https://deno.com/deploy/docs)
- [静态网站与API集成最佳实践](https://deno.com/blog/deploy-static-files)