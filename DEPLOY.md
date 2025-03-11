# 智能高考志愿填报应用 - Deno部署指南

本文档提供了如何将智能高考志愿填报应用部署到Deno Deploy平台的详细步骤。

## 前提条件

1. 安装Deno运行时环境
2. 安装deployctl工具
3. 拥有Deno Deploy账号

## 安装Deno

如果您尚未安装Deno，可以使用项目中提供的安装脚本：

### Windows
```powershell
# 在PowerShell中运行
.\install-deno.ps1
```

### macOS/Linux
```bash
curl -fsSL https://deno.land/x/install/install.sh | sh
```

## 安装deployctl

```bash
deno install --allow-read --allow-write --allow-env --allow-net --allow-run --no-check -r -f https://deno.land/x/deploy/deployctl.ts
```

## 本地测试

在部署前，建议先在本地测试应用：

```bash
# 使用deno任务运行
deno task start

# 或直接运行
deno run --allow-net --allow-read --allow-env main.js
```

访问 http://localhost:8000 确认应用正常运行。

## 部署到Deno Deploy

### 1. 登录Deno Deploy

```bash
deployctl login
```

### 2. 创建新项目

在Deno Deploy控制台(https://dash.deno.com/projects)创建一个新项目，例如"college-advisor"。

### 3. 部署应用

```bash
# 使用deno任务部署
deno task deploy

# 或直接使用deployctl部署
deployctl deploy --project=college-advisor --prod main.js
```

### 4. 配置环境变量

在Deno Deploy控制台为您的项目设置以下环境变量：

- `PORT`: 通常不需要设置，Deno Deploy会自动处理
- `API_KEY`: 您的API密钥
- `API_URL`: API服务地址

## 项目结构说明

```
/
├── main.js              # 应用入口文件
├── services/            # 服务模块
│   └── ai_service.js    # AI服务接口
├── public/              # 静态资源
│   ├── index.html       # 主页面
│   ├── css/             # 样式文件
│   └── js/              # 客户端脚本
├── deno.json            # Deno配置文件
└── import_map.json      # 导入映射配置
```

## 注意事项

1. 确保所有文件路径使用相对路径，避免使用绝对路径
2. 敏感信息（如API密钥）应通过环境变量配置，不要硬编码在代码中
3. 静态文件服务路径可能需要根据Deno Deploy环境调整

## 故障排除

如果部署后遇到问题：

1. 检查Deno Deploy控制台中的日志
2. 确认环境变量是否正确设置
3. 验证静态文件是否正确部署

## 更新部署

当您需要更新应用时，只需再次运行部署命令：

```bash
deno task deploy
```

## 相关资源

- [Deno官方文档](https://deno.land/manual)
- [Deno Deploy文档](https://deno.com/deploy/docs)
- [deployctl文档](https://deno.com/deploy/docs/deployctl)