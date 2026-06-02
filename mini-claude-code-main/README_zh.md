# Ai Agent

[English](README.md) | [中文](README_zh.md)

一个轻量级的 AI 编程助手 CLI 工具，由 LLM 驱动。

## 概述

Ai Agent 是一个最小实现的 AI 编程助手，它允许 LLM 模型通过一组强大的工具直接与您的代码库进行交互。它提供了一个命令行界面，使 AI 能够：

- 读取和写入文件
- 执行 shell 命令
- 编辑文件中的文本
- 导航项目结构

此工具旨在与 LLM 模型一起使用，以提供交互式编码体验，AI 可以直接对您的代码库进行更改。

## 功能特性

- **编程助手**：使用大型语言模型作为核心 AI 引擎
- **文件操作**：支持读取、写入和编辑文件
- **Shell 执行**：可以在项目工作区中执行 shell 命令
- **MCP 集成**：支持 Model Context Protocol，可连接多种 MCP 服务器扩展功能
- **Skills 系统**：支持 Anthropic Skills 规范，可安装和调用专业技能
- **上下文压缩**：智能的自动和手动上下文压缩，处理长对话的 token 限制
- **实时状态栏**：显示 MCP 连接状态和上下文使用率，一目了然
- **安全限制**：防止路径遍历和危险命令执行
- **实时反馈**：在执行过程中提供视觉反馈
- **模块化架构**：组织良好的代码库，便于维护和扩展

## 技术栈

- TypeScript
- Node.js
- Anthropic AI SDK
- MCP (Model Context Protocol) SDK

## 前提条件

- Node.js >= 16.0.0
- Anthropic 兼容的 API 密钥
- 代理 LLM 模型

## 快速启动

最快的启动方式：

1. 设置环境变量：

```bash
export ANTHROPIC_API_KEY="your-api-key-here"
export ANTHROPIC_BASE_URL="your-anthropic-compatible-api-base-url"
export ANTHROPIC_MODEL="model-name"
```

2. 使用 npx 直接运行（无需安装）：

```bash
npx -y ai-agent
```

就是这么简单！助手会启动，你可以开始与它交互。

## 安装

```bash
npm install -g ai-agent
```

或者从源码克隆并构建：

```bash
git clone https://github.com/yugongzhilv/Ai-Agent.git
cd Ai-Agent
npm install
```

## 配置

将您的 Anthropic API 密钥设置为环境变量：

```bash
export ANTHROPIC_API_KEY="your-api-key-here"
export ANTHROPIC_BASE_URL="your-anthropic-compatible-api-base-url"
export ANTHROPIC_MODEL="model-name"
```

## 安装依赖

```bash
npm install
```

## 构建项目

```bash
npm run build
```

## 运行项目

### 开发模式运行

```bash
npm run dev
```

### 生产模式运行

```bash
npm run build
npm start
```

## 使用方法

启动程序后，您可以在终端中与代码助手进行交互：

1. 输入您的需求或问题
2. 助手将自动分析并执行相应的操作（如文件修改、命令执行等）
3. 查看执行结果和输出

输入 `exit` 或 `quit` 退出程序。

### 可用命令

- `/help` - 显示帮助信息
- `/clear` - 清屏
- `/history` - 显示对话历史
- `/reset` - 重置对话历史
- `/compact` - 手动压缩对话历史为摘要
- `/stats` - 显示上下文使用统计
- `/save` - 保存当前对话到文件
- `/load` - 从文件加载对话历史
- `/todo` - 显示待办事项状态
- `/skills` - 管理和调用技能 (list/read)
- `exit/quit` - 退出程序

### 上下文压缩

Ai Agent 支持智能的上下文压缩功能，可以处理长对话的 token 限制问题：

- **自动压缩**：当 token 使用率达到 92% 时自动触发，透明地压缩对话历史为摘要
- **手动压缩**：使用 `/compact` 命令手动压缩对话历史
- **统计查看**：使用 `/stats` 命令查看当前的 token 使用情况

详细说明请参阅 [上下文压缩文档](docs/CONTEXT_COMPRESSION_zh.md) ([English](docs/CONTEXT_COMPRESSION.md))。

### 实时状态栏

在每次命令后显示实时状态信息：

```
┌──────────────────────────────────────────────────────────────────────────────┐
│ 🔌 MCP: 2 │ 🟢 Context: 45% │ 💬 Msgs: 67 │ 🎯 Skills: 3 │ 🤖 Agents: 2      │
└──────────────────────────────────────────────────────────────────────────────┘
```

- **MCP 状态**：显示已连接的 MCP 服务器数量
- **上下文使用率**：用颜色编码显示上下文使用百分比
  - 🟢 绿色 (0-74%): 正常
  - 🟡 黄色 (75-91%): 警告
  - 🔴 红色 (92-100%): 临界（即将自动压缩）
- **消息数量**：当前对话的消息总数
- **Skills 数量**：已安装的技能数量
- **Agents 数量**：自定义 Agent 数量（通过 `/agents` 创建）

详细说明请参阅 [状态栏文档](docs/STATUS_BAR_zh.md) ([English](docs/STATUS_BAR.md))。

## Skills 系统

Ai Agent 支持 Anthropic Skills 规范，允许你安装和使用技能来扩展 AI 的能力。

### 什么是 Skills？

Skills 是包含专业指令和资源的文档，帮助 AI 更好地完成特定任务。例如：

- PDF 处理技能
- Excel 数据分析技能
- 代码审查技能
- 数据库迁移技能

### 快速开始

1. 创建技能目录：

```bash
mkdir -p .mini-cc/skills/my-skill
```

2. 创建 SKILL.md 文件：

```bash
cat > .mini-cc/skills/my-skill/SKILL.md << 'EOF'
---
name: my-skill
description: Description of what this skill does
---

# My Skill

## Instructions

[Your skill instructions here...]
EOF
```

3. 在 Ai Agent 中使用：

```bash
/skills list              # 列出所有可用技能
/skills read my-skill     # 读取技能内容
```

详细文档请参阅：

- [Skills 使用指南 (中文)](docs/SKILLS_zh.md)
- [Skills Guide (English)](docs/SKILLS.md)

## MCP 集成

Ai Agent 支持 Model Context Protocol (MCP)，可以连接各种 MCP 服务器来扩展功能。

### 配置 MCP 服务器

1. 在项目根目录创建 `.mcp.json` 文件：

```bash
cp .mcp.example.json .mcp.json
```

2. 编辑配置文件添加你需要的 MCP 服务器。

支持三种传输方式：

- **stdio**: 本地进程通信（默认）
- **streamable_http**: HTTP 远程服务器（推荐）
- **sse**: 旧版 HTTP/SSE（已弃用）

```json
{
  "mcpServers": [
    {
      "name": "filesystem",
      "transport": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/path/to/directory"
      ]
    },
    {
      "name": "remote-service",
      "transport": "streamable_http",
      "url": "https://your-mcp-server.example.com/mcp"
    }
  ]
}
```

详细的 MCP 配置和使用说明，请参阅：

- [MCP 集成指南](docs/MCP_GUIDE_zh.md)
- [MCP 传输方式详解](docs/MCP_TRANSPORT_zh.md)

### 交互示例

```
User: 创建一个名为 hello.js 的新文件，打印 "Hello, World!"
Assistant: 我将创建一个名为 hello.js 的新文件，打印 "Hello, World!"。

Tool: write_file
{
  "path": "hello.js",
  "content": "console.log('Hello, World!');\n"
}

Result: wrote 26 bytes to hello.js

我已经创建了 hello.js 文件，其中包含一个简单的程序，在控制台打印 "Hello, World!"。您可以使用 `node hello.js` 运行它。
```

## 安全性

该助手包含全面的安全措施：

- **增强的命令检测**：使用基于正则表达式的模式匹配来阻止危险命令
  - 文件系统破坏（`rm -rf /`、`mkfs`、`dd`）
  - 权限提升（`sudo`、`su`）
  - 系统控制（`shutdown`、`reboot`、`poweroff`）
  - 远程代码执行（`curl | bash`、`wget | sh`）
  - Fork 炸弹和资源耗尽
  - 以及更多（50+种模式）
- **路径遍历防护**：限制文件访问到当前工作目录
- **超时保护**：所有命令执行默认 30 秒超时
- **安全命令白名单**：常见开发命令绕过检查以获得更好的性能
- **详细的错误消息**：命令被阻止时提供清晰的反馈

详细的安全信息，请参阅 [安全文档](docs/SECURITY_zh.md)

## 开发

### 版本管理

本项目使用自动化脚本进行版本管理。

快速参考：

```bash
# 仅更新版本号
npm run version:patch  # 0.5.0 -> 0.5.1
npm run version:minor  # 0.5.1 -> 0.6.0
npm run version:major  # 0.5.1 -> 1.0.0
```

所有版本号会自动从 `package.json` 同步。

### 添加新工具

要向助手添加新工具：

1. 在 `src/tools/` 目录中创建新文件
2. 实现工具功能
3. 将工具定义添加到 `src/tools/tools.ts`
4. 更新 `src/tools/dispatcher.ts` 中的分发器以处理新工具

### 代码组织

代码库遵循模块化架构：

- **config**：配置和环境变量
- **core**：核心助手逻辑和主执行循环
- **tools**：单个工具实现和工具管理
- **types**：TypeScript 类型定义
- **utils**：常见操作的实用函数
- **scripts**：构建和发布自动化脚本

## 贡献

欢迎贡献！请随时提交 Pull Request。

1. Fork 仓库
2. 创建您的功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

该项目基于 MIT 许可证 - 详情请见 [LICENSE](LICENSE) 文件。

## 致谢

- 该项目受到 [shareAI-lab/mini_claude_code](https://github.com/shareAI-lab/mini_claude_code) 和 [shareAI-lab/Kode](https://github.com/shareAI-lab/Kode) 的启发
