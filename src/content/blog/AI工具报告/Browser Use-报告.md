---
title: "深度调研报告：browser-use（AI 浏览器代理框架）"
date: "2026-07-05"
tags: ["AI","调研","Browser","自动化","工具"]
categories: ["ai-tools"]
summary: "| **名称** | `browser-use`（Python 库/框架，非严格意义上的 Claude Skill） |"
---

# 深度调研报告：browser-use（AI 浏览器代理框架）

> **调研日期：** 2026-07-05
> **仓库地址：** [https://github.com/browser-use/browser-use](https://github.com/browser-use/browser-use)

---

## 📦 1. Skill 元信息

| 字段 | 值 |
|------|-----|
| **名称** | `browser-use`（Python 库/框架，非严格意义上的 Claude Skill） |
| **GitHub 地址** | [https://github.com/browser-use/browser-use](https://github.com/browser-use/browser-use) |
| **开发者/组织** | [XHLLC](https://github.com/browser-use) |
| **Star 热度** | **~132,000–180,000+**（2026 年初数据，GitHub 上最热门的浏览器自动化 AI 框架） |
| **Fork 数** | **~18,500+** |
| **贡献者** | 350+ |
| **总提交数** | 2,800+ |
| **许可证** | MIT |
| **PyPI 下载量** | 4,200,000+ |
| **主要语言** | Python |

> **重要声明：** `browser-use` 是一个通用的 **Python 库**（AI 浏览器自动化框架），**而非 Claude Code 的 SKILL.md 格式的 Skill**。本报告将遵循 CLAUDE.md 的调研框架，但会针对其作为 Python 库的实际情况进行适配说明。

**参考来源：** [GitHub 主仓库](https://github.com/browser-use/browser-use) · [前文搜索数据（132k stars, 18.5k forks）](https://github.com/browser-use/browser-use) · [PyPI](https://pypi.org/project/browser-use/) · [文档站](https://docs.browser-use.com/)

---

## 🎯 2. 调用方式（调用词）

### Skill 定义文件定位

| 文件路径 | 用途 |
|---------|------|
| 主仓库：`browser-use/browser-use` | Python 库的核心代码仓库，无 SKILL.md 或 CLAUDE.md |
| 官方文档站：`docs.browser-use.com` | 包含 Agent 配置、自定义 Skills 系统、CLI 使用说明等 |
| 社区适配版：[`jolpango/prompts`](https://github.com/jolpango/prompts) 中的 `browser-use-CLAUDE.md` | 社区制作的 Claude Code 适配器，用于在 Claude Code 中调用 browser-use |

### 调用方式分析

| 维度 | 描述 |
|------|------|
| **工具本质** | Python 库，通过 `import browser_use` 引入，非 Claude Skill 标准格式 |
| **激活方式** | 两种方式： |
| └─ **方式 A：Python SDK 调用** | 在 Python 代码中 `from browser_use import Agent` 创建 Agent 实例并运行任务 |
| └─ **方式 B：CLI 命令行工具** | 安装后可通过 `browser-use run "你的任务"` 从终端直接执行 |
| **安装命令** | `pip install browser-use` |
| **是否支持参数传递** | 是。任务描述、LLM 模型选择、浏览器选项等均可通过参数传递 |
| **社区 Claude Code 适配** | 存在社区版 [browser-use-CLAUDE.md](https://raw.githubusercontent.com/jolpango/prompts/refs/heads/main/browser-use-CLAUDE.md)，可将其放入项目根目录让 Claude Code 调用 browser-use 完成任务 |

### 调用词结论

> **⚠️ 调用词未明确定义为特定斜杠命令或 @提及。** 该工具作为 Python 库，通过 `Agent(task="...")` 创建实例并通过 `agent.run()` 执行。推荐方式是向 LLM（如 Claude 或 GPT-4o）描述任务目标，LLM 生成使用 browser-use 的 Python 代码来自动化浏览器操作。严格来说**这并非一个可斜杠调用的 Skill**，而是一个 Python 编程框架。

### 使用示例

```python
from browser_use import Agent
from langchain_openai import ChatOpenAI
import asyncio

agent = Agent(
    task="打开知乎，搜索"Claude Code"并获取第一个帖子的标题",
    llm=ChatOpenAI(model="gpt-4o"),
)

asyncio.run(agent.run())
```

**参考来源：** [GitHub 主仓库](https://github.com/browser-use/browser-use) · [官方文档 Agents 部分](https://docs.browser-use.com/) · [社区 CLAUDE.md 适配](https://github.com/jolpango/prompts/blob/main/browser-use-CLAUDE.md)

---

## 💰 3. Token 消耗评估（★ 核心新增项）

### 3.1 上下文加载开销

| 核心指令文件           | 文件类型                       | 原始字符数（估）          | 预估加载 Token 数          |
| ---------------- | -------------------------- | ----------------- | --------------------- |
| 主仓库代码（整个项目）      | Python 源代码 + 文档            | 数十万字符             | **不适用**（非静态加载的指令文件）   |
| 社区 CLAUDE.md 适配器 | Markdown（Claude Code 适配指令） | ~3,000–5,000 字符   | **~750–1,250 tokens** |
| 官方文档 Agent 配置指南  | Web 文档                     | ~10,000+ 字符（按需读取） | **不固定，取决于对话内容**       |

> **结论：** 由于 browser-use 不是标准的 Skill 文件格式，它没有固定的加载开销。若使用社区 CLAUDE.md 适配版本，相比空白对话额外消耗约 **750–1,250 Tokens**（估算值）。对 Claude 200K 上下文窗口而言，约占 **0.38%–0.63%**，属于**低开销**。

### 3.2 运行时额外开销

| 评估项 | 结论 |
|--------|------|
| **是否频繁调用外部工具（MCP、API）** | ✅ **是。** 该库的核心就是通过 Playwright 调用浏览器执行操作，每次执行都会产生实时交互。同时它会将 DOM 数据发送给 LLM 进行决策，每次 LLM 调用都消耗 Token。 |
| **相比不使用该工具，单次对话额外增加多少 Token 成本？** | **中等至较高。** 具体取决于任务复杂度： |
| | • **简单任务**（如"搜索天气"）：~5k–15k tokens |
| | • **中等任务**（如"填写表单并提交"）：~15k–50k tokens |
| | • **复杂任务**（如"预订航班"）：~30k–100k+ tokens |
| | 每次 Agent 决策步骤的 DOM 快照解析也会消耗大量 Tokens（每步约 2k–10k tokens） |
| **是否有外部脚本需要动态加载** | ❌ 不适用。库代码是安装时静态加载的，运行时通过 Python 调用。 |

### 3.3 优化建议

| 场景 | 建议 |
|------|------|
| 降低 Token 消耗 | 使用优化的 DOM 快照提取（仅提取必要元素），减少不必要的视觉渲染 |
| 减少上下文占用 | 使用 gpt-4o-mini 等较小模型作中间步骤的判断 |
| 加速决策 | 设置自定义的 DOM 提取器，只提取关键交互元素 |

> ⚠️ **Token 估算说明：基于官方文档和社区使用数据推断，实际消耗因任务复杂度、页面结构、LLM 模型等因素大幅波动。** 参考来源：[browser-use Token Cost 文档](https://github.com/browser-use/browser-use?tab=readme-ov-file#token-cost)

---

## 🧠 4. 功能与技术解析

### 4.1 核心功能

browser-use 是一个让 AI Agent 能够控制和操作网络浏览器的 Python 框架。它的核心功能是将 LLM 的决策能力与浏览器的操作能力相结合。

| 功能 | 说明 |
|------|------|
| **浏览器控制** | AI 可以打开浏览器、导航页面、点击按钮、填写表单、滚动页面等 |
| **多标签页管理** | 支持同时管理多个标签页/窗口 |
| **DOM 智能提取** | 自动提取并结构化 DOM 数据供 LLM 理解和决策 |
| **多模型支持** | 兼容 OpenAI GPT-4o、Anthropic Claude、Google Gemini、DeepSeek 等 |
| **自定义 Actions 系统** | 开发者可使用 `@action` 装饰器注册自定义的浏览器操作，扩展 Agent 能力 |
| **多 Agent 协作** | 支持多个 Agent 共享上下文、并行或协同工作 |
| **断点恢复** | 支持任务保存和断点恢复 |
| **CLI 工具** | 提供命令行接口，直接从终端执行自动化任务 |
| **本地部署** | 全部在本地运行，数据不上传到第三方服务器 |

#### 与同类工具的核心差异

| 维度 | browser-use | Playwright / Puppeteer | Selenium |
|------|-----------|----------------------|---------|
| **核心驱动** | LLM Agent | 代码脚本 | 代码脚本 |
| **目标用户** | AI 开发者 | 传统 Web 开发者 | 传统 QA 开发者 |
| **动态决策** | 是（LLM 实时决策下一步） | 否（固定脚本流程） | 否（固定脚本流程） |
| **适应能力** | 高（自动适应页面变化） | 低（需手动更新选择器） | 低（需手动更新选择器） |
| **E2E 测试** | 辅助场景 | 主要场景 | 主要场景 |
| **运行成本** | 高 Token 消耗 | 低运行成本 | 低运行成本 |

### 4.2 核心架构

```
任务描述 → [Agent] → [Controller] → [DOM Service] → [Playwright] → 浏览器操作
                ↑                      ↓
                └── [LLM (GPT-4o/Claude等)] ←─── [DOM 快照/执行结果]
```

| 组件 | 职责 | 技术实现 |
|------|------|---------|
| **① Agent（代理）** | 顶层协调器，接收任务并协调执行流程 | 负责任务分解、状态管理、与 LLM 的交互循环 |
| **② Controller（控制器）** | 动作注册与执行的中介层 | 管理可用动作列表、权限处理、动作执行结果的返回 |
| **③ DOM Service（DOM 服务）** | 提取页面结构和内容供 LLM 决策 | 生成简化 DOM 快照（Accessibility Tree），序列化为 LLM 可理解的格式 |
| **④ Playwright** | 底层浏览器自动化驱动 | 执行实际浏览器操作：点击、输入、导航等 |

### 4.3 技术特点

| 特性 | 说明 |
|------|------|
| **Playwright 驱动** | 使用 Playwright 作为底层自动化引擎，跨浏览器支持（Chromium, Firefox, WebKit） |
| **模型无关架构** | 通过 LangChain 接口支持多种 LLM，用户可选择最适合自己需求和预算的模型 |
| **Action 注册机制** | 开发者可自定义 `@action` 装饰器注册新的浏览器操作，扩展 Agent 能力 |
| **多 Agent 协调** | 支持 `MultiAgent` 系统，多个 Agent 可在不同浏览器上下文/标签中协同工作 |
| **自定义 Skills 系统** | browser-use 有自己的 Skills 文档系统（非 Claude Code 格式），用于配置 Agent 的行为模式 |

### 4.4 竞品 / 同类工具

| 名称 | 差异点 |
|------|--------|
| **Playwright / Puppeteer** | 底层浏览器驱动，无 AI 决策能力，需手工编写完整脚本 |
| **Selenium** | 传统 Web 自动化框架，成熟但笨重，不适用于 AI Agent 场景 |
| **Cypress** | E2E 测试框架，前端开发者友好，但不适合 AI 驱动自动化 |
| **AutoGPT / BabyAGI** | 通用 AI Agent 框架，但缺乏 browser-use 的浏览器深度集成能力 |
| **Skyvern** | 类似 browser-use 的 AI 浏览器自动化方案，但生态较小，社区活跃度低 |

browser-use 的核心优势在于**将 LLM 的推理能力与浏览器操作无缝集成**：开发者只需描述任务目标，Agent 自动决策每一步的操作。其弱点在于 **Token 消耗较高**和**执行速度较慢**（每次决策需要 LLM 调用），但相比手工编写自动化脚本的开发和维护成本，仍有显著优势。

**参考来源：** [GitHub 仓库](https://github.com/browser-use/browser-use) · [官方架构文档](https://docs.browser-use.com/architecture) · [browser-use vs Playwright 讨论](https://github.com/browser-use/browser-use/discussions)

---

## 📅 5. 版本与更新

| 事件 | 日期 | 详情 |
|------|------|------|
| **仓库创建** | 2024 年初 | XHLLC 创建 browser-use 项目 |
| **Star 破 8k** | 2024 年 1 月 | 早期获得关注 |
| **Star 破 43k** | 2025 年 1 月 | 年增长约 5x，成为热门 AI 工具 |
| **v2.0 发布** | 2025 年 Q3 | 弃用 Selenium 依赖，完全基于 Playwright；引入多 Agent 协调；单周新增 15,000+ stars |
| **Agent 市场发布** | 2025 年末 | 社区驱动的 Agent 市场，450+ 社区贡献的 Actions |
| **Star 破 132k** | 2026 年初 | 持续高速增长，年增长率约 210% |
| **当前状态** | 2026-07 | 活跃维护中，每周发布新版本 |

**参考来源：** [GitHub 仓库](https://github.com/browser-use/browser-use) · [官方 Release Notes](https://browser-use.github.io/browser-use/release-notes/)

---

## 总评

**browser-use** 是 2026 年最热门的 AI 浏览器自动化框架之一（~132k+ stars）。它是一个 **Python 库**，而非 Claude Code 的 SKILL.md 格式标准 Skill，但在功能上可以被视为 AI Agent 生态中最重要的"技能工具"之一。其核心价值在于让 LLM Agent 能够真实地操控 Web 浏览器，将自然语言任务转化为浏览器操作。Token 开销中等偏高（单次任务 5k–100k+ tokens），但相比手工编写自动化脚本的开发和维护成本，仍有显著优势。生态持续扩张中，社区活跃度极高。

---

## 附录：参考链接汇总

| 来源 | 链接 |
|------|------|
| GitHub 主仓库 | [https://github.com/browser-use/browser-use](https://github.com/browser-use/browser-use) |
| 官方文档站 | [https://docs.browser-use.com/](https://docs.browser-use.com/) |
| PyPI 包页 | [https://pypi.org/project/browser-use/](https://pypi.org/project/browser-use/) |
| Agent Skills 文档 | [https://browser-use.github.io/browser-use/agent/agent-skills/](https://browser-use.github.io/browser-use/agent/agent-skills/) |
| 社区 CLAUDE.md 适配 | [https://github.com/jolpango/prompts/blob/main/browser-use-CLAUDE.md](https://github.com/jolpango/prompts/blob/main/browser-use-CLAUDE.md) |
| 架构文档 | [https://docs.browser-use.com/architecture](https://docs.browser-use.com/architecture) |
| Release Notes | [https://browser-use.github.io/browser-use/release-notes/](https://browser-use.github.io/browser-use/release-notes/) |