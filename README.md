# apifox-mcp-server

这是一个按 Stdio 实现 Model Context Protocol 的服务器，用于访问 Apifox API 数据。

实现 MCP 服务器与 Apifox 平台交互的功能，允许 AI 助手直接获取 API 接口定义信息。

## 功能特性

### 工具

- `get_api_endpoint_info` - 获取 Apifox 的接口定义信息
  - 接收 projectId 和 endpointId 作为必需参数
  - 返回包括请求头、请求方式、请求参数、响应参数、响应头等详细 API 定义

## 安装配置

要在 Cursor 中使用此服务器，请添加以下服务器配置:

```json
{
  "mcpServers": {
    "Apifox-MCP": {
      "command": "npx",
      "args": ["@juzi965/apifox-mcp-server"],
      "env": {
        "APIFOX_AUTH": "..."
      }
    }
  }
}
```

### 环境变量

该服务器需要以下环境变量:

- `APIFOX_AUTH`: Apifox 的认证令牌

## 使用方法
<img width="337" alt="image" src="https://github.com/user-attachments/assets/9688b499-7774-4f06-bfa0-d4f80412156e" />

复制协作链接到 Cursor 中，让它帮你完成
- 入参的TS类型定义
- 出参的TS类型定义
- 接口调用方法的定义
  <img width="1264" alt="Xnip2025-06-19_14-30-13" src="https://github.com/user-attachments/assets/801002bb-c529-47e7-b52c-a6f909bbcd10" />


## 调试

由于 MCP 服务器通过标准输入输出(stdio)通信，调试可能比较困难。我们推荐使用[MCP Inspector](https://github.com/modelcontextprotocol/inspector)，可通过以下命令启动:

```bash
npm run inspector
```

Inspector 将提供一个 URL，可在浏览器中访问调试工具。
