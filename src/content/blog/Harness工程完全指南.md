---
title: "Harness 工程完全指南"
date: "2026-07-05"
tags: ["Harness", "工程", "Claude Code"]
summary: "Harness 工程概念、主流开源项目与小型项目实践方法系统梳理。"
---

# Harness 工程完全指南

> 本文档系统梳理 Harness 工程的概念、主流开源项目、以及在小型项目中的实践方法。

---

## 目录

- [第一部分：什么是 Harness 工程](#第一部分什么是-harness-工程)
- [第二部分：Harness 要解决的七大核心问题](#第二部分harness-要解决的七大核心问题)
- [第三部分：GitHub 主流 Harness 项目全景](#第三部分github-主流-harness-项目全景)
- [第四部分：小型项目如何落地 Harness](#第四部分小型项目如何落地-harness)
- [第五部分：Claude Code Harness 能力速查](#第五部分claude-code-harness-能力速查)
- [第六部分：快速上手 Checklist](#第六部分快速上手-checklist)

---

## 第一部分：什么是 Harness 工程

### 一句话定义

> **Harness 工程是一种系统化的 AI 代理（Agent）编排与质量保障方法论。它把人类软件工程中经过验证的实践——Code Review、CI/CD、TDD、安全审计、知识管理——适配到 AI 辅助开发的工作流中，让 AI 从"一个聪明的助手"变成"一个可靠的工程团队"。**

### 核心思想

**不靠单次对话碰运气，而是用工程化的流程来约束和指导 AI 的工作。**

```
❌ 朴素方式：用户 → "帮我做X" → AI尝试一步完成 → 质量不可控

✅ Harness 方式：
   用户 → "帮我做X"
        → Brainstorming（明确需求）
        → Plan（制定计划）
        → Agent A（实现模块1）  Agent B（实现模块2）  Agent C（写测试）
        → Code Review（检查质量）
        → Security Scan（安全检查）
        → Verification（运行验证）
        → 交付
```

### 五层架构

| 层次 | 作用 | 类比 |
|------|------|------|
| **Agent 层** | 专业化子代理，各擅其长 | 团队中的不同角色（前端、后端、测试、安全） |
| **Skill 层** | 预定义的工作流程模板 | 公司的 SOP 文档 |
| **Hook 层** | 自动化触发规则 | CI/CD Pipeline 的触发器 |
| **Workflow 层** | 多 Agent 协作编排 | 项目管理的看板和流程 |
| **Memory 层** | 跨会话持久化 | 团队的 Wiki 和知识库 |

---

## 第二部分：Harness 要解决的七大核心问题

### 1. 🎲 非确定性输出

**问题**：AI 每次回答可能不同，同一需求两次生成代码质量差异大。

**Harness 解法**：
- Review Agent 作为质量守门人，不合格就重来
- 结构化输出 Schema 强制格式约束
- Skill 固化成功流程，编码为可重用模板

### 2. 🧠 上下文窗口瓶颈

**问题**：单个 AI 注意力有限，复杂项目塞不进去。

**Harness 解法**：
- 多 Agent 分治：每个 Agent 只读自己相关部分
- Agent 隔离上下文：每个子任务用独立新窗口
- Workflow pipeline 阶段化：每阶段只传入必要信息

### 3. 🔗 多步骤任务编排

**问题**：复杂工程任务不是"一问一答"能完成的，需要有序的多步协作。

**Harness 解法**：Brainstorming → Plan → Parallel Execute → Review → Verify → Deliver

### 4. 🛡️ 安全性与破坏性操作

**问题**：AI 可能误删文件、执行危险命令、泄露敏感信息。

**Harness 解法**：
- Sandbox / Worktree 隔离，在副本中操作
- Security Scanner Agent 自动检测密钥和凭证
- Permission 系统 + Hook 拦截危险操作

### 5. 📊 质量一致性

**问题**：不同人 + AI 产出的代码质量参差不齐。

**Harness 解法**：
- 多维度 Review Agent（语言专项、安全、性能、可访问性）
- TDD Skill 强制测试先行
- Performance Agent 自动 profiling

### 6. 🔄 反馈循环断裂

**问题**：传统开发中"写代码 → 发现问题 → 修复"循环太慢。

**Harness 解法**：写代码 → Agent 即时 Review → 即时修复 → Agent 再验证 → 通过 → 才提交

### 7. 🏗️ 知识流失

**问题**：每次对话结束，上下文和决策全部丢失。

**Harness 解法**：
- Memory 系统持久化关键决策和偏好
- Skill 系统编码成功模式为可调用模板
- CLAUDE.md + CODEMAPS 结构化文档

---

## 第三部分：GitHub 主流 Harness 项目全景

### 分类一：AI 编程 Harness（终端/IDE 内的 AI 编程工具）

#### 1. Aider ⭐ 45,000+

| 维度 | 详情 |
|------|------|
| **仓库** | [Aider-AI/aider](https://github.com/Aider-AI/aider) |
| **一句话** | 终端内的 AI 结对编程工具 |
| **核心功能** | 支持 100+ 语言、15+ LLM 提供商（Claude、GPT、DeepSeek、Gemini 等）、Git 深度集成 |
| **独特技术** | **Repository Map**（tree-sitter 理解全代码库）；**Edit Format 系统**（自动匹配 diff/whole/udiff 策略）；**Architect/Editor** 分体模式（强模型规划 + 廉价模型执行，大幅降低成本） |
| **适用场景** | 个人开发者、小团队、需要切换多个 LLM 的场景 |
| **许可证** | Apache 2.0 |

#### 2. Claude Code（Anthropic）⭐ 快速增长

| 维度 | 详情 |
|------|------|
| **仓库** | [anthropics/claude-code](https://github.com/anthropics/claude-code) |
| **一句话** | Anthropic 的终端原生 Agentic 编程工具 |
| **核心功能** | 自主探索代码库、多文件编辑、运行命令、Git 操作 |
| **独特技术** | **Agent + Skill + Hook + Workflow 四层架构**；70+ 专业子代理；Worktree 隔离沙箱；Memory 持久化；多 Agent 并行协作 |
| **适用场景** | 复杂多步骤任务、需要自动化审查和质量保障的项目 |
| **许可证** | 专有（免费使用） |

#### 3. SWE-agent ⭐ 15,000+

| 维度 | 详情 |
|------|------|
| **仓库** | [princeton-nlp/SWE-agent](https://github.com/princeton-nlp/SWE-agent) |
| **一句话** | Princeton 出品，将 LLM 转化为软件工程 Agent |
| **核心功能** | 自定义 Linux 环境 + ACI（Agent-Computer Interface）命令 |
| **独特技术** | 自定义 ACI 命令集；LM-centric 设计；SWE-bench 上首次实现 12.47% 解决率 |
| **适用场景** | 学术研究、AI 编程能力评估、自定义 Agent 开发 |
| **许可证** | MIT |

#### 4. OpenHands（原 OpenDevin）⭐ 48,000+

| 维度 | 详情 |
|------|------|
| **仓库** | [All-Hands-AI/OpenHands](https://github.com/All-Hands-AI/OpenHands) |
| **一句话** | Web IDE 风格的全功能 AI 代理框架 |
| **核心功能** | 沙盒执行、多 LLM 支持、交互式调试、Web 可视化界面 |
| **独特技术** | 沙盒化代码执行；Web 界面可视化监控 Agent 工作；广泛工具集成 |
| **适用场景** | 需要安全隔离的代码执行、可视化监控 AI 工作过程 |
| **许可证** | MIT |

---

### 分类二：多 Agent 编排 Harness

#### 5. MetaGPT ⭐ 50,000+

| 维度 | 详情 |
|------|------|
| **仓库** | [FoundationAgents/MetaGPT](https://github.com/FoundationAgents/MetaGPT) |
| **一句话** | 模拟完整软件公司的 SOP，输入一句话 → 输出完整软件工程产物 |
| **核心功能** | 内置产品经理、架构师、项目经理、工程师等 AI 角色；全流程自动化 |
| **独特技术** | **`Code = SOP(Team)`** 理念；ICLR 2025 口头报告；MGX.dev 商业平台 |
| **适用场景** | 从零生成项目原型、理解 AI 软件开发流程 |
| **许可证** | MIT |

#### 6. AutoGen（Microsoft）⭐ 35,000+

| 维度 | 详情 |
|------|------|
| **仓库** | [microsoft/autogen](https://github.com/microsoft/autogen) |
| **一句话** | 微软的多 Agent 对话框架 |
| **核心功能** | Agent 之间自主对话、辩论、协作；Human-in-the-Loop |
| **独特技术** | Multi-Agent Conversation 模式；嵌套对话；代码执行沙箱 |
| **适用场景** | 需要多个 AI 角色辩论验证的复杂决策任务 |
| **许可证** | CC-BY-4.0 / MIT |

#### 7. CrewAI ⭐ 20,000+

| 维度 | 详情 |
|------|------|
| **仓库** | [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) |
| **一句话** | 角色扮演式多 Agent 编排框架 |
| **核心功能** | 为 Agent 定义角色、目标、背景故事和工具；Sequential + Hierarchical 流程 |
| **独特技术** | 角色扮演降低编排门槛；Crew Flows 事件驱动；跨 Crew 协作 |
| **适用场景** | 非技术人员设计 Agent 工作流、内容生成、研究辅助 |
| **许可证** | Elastic License 2.0 |

#### 8. LangChain / LangGraph ⭐ 95,000+

| 维度 | 详情 |
|------|------|
| **仓库** | [langchain-ai/langchain](https://github.com/langchain-ai/langchain) |
| **一句话** | LLM 应用开发的事实标准框架 |
| **核心功能** | Chain、Tool、Memory、Retriever 组件化设计；LangGraph 有状态图编排 |
| **独特技术** | 生态最丰富；LangGraph 支持循环和条件分支的有状态执行；与几乎所有 LLM 和工具集成 |
| **适用场景** | 需要高度可定制化的 LLM 应用开发 |
| **许可证** | MIT |

#### 9. Dify ⭐ 50,000+

| 维度 | 详情 |
|------|------|
| **仓库** | [langgenius/dify](https://github.com/langgenius/dify) |
| **一句话** | 可视化 LLM 应用开发平台 |
| **核心功能** | 拖拽式工作流编排；内置 RAG 管道；Prompt IDE 带版本控制；可自托管 |
| **独特技术** | Visual workflow builder；文档摄入→分块→嵌入→检索 全流程；API-first 设计 |
| **适用场景** | 非开发者构建 AI 应用、企业需要私有化部署 |
| **许可证** | Apache 2.0 |

---

### 分类三：评估 Harness

#### 10. lm-evaluation-harness ⭐ 7,000+

| 维度 | 详情 |
|------|------|
| **仓库** | [EleutherAI/lm-evaluation-harness](https://github.com/EleutherAI/lm-evaluation-harness) |
| **一句话** | LLM 能力统一评估框架 |
| **核心功能** | 1000+ 评测任务；统一 CLI/Python API；多模型后端 |
| **独特技术** | 驱动 HuggingFace Open LLM Leaderboard；可重现的固定 few-shot；权重和微平均 |
| **适用场景** | 模型选型、性能对比、学术研究 |

#### 11. SWE-bench ⭐ 3,000+

| 维度 | 详情 |
|------|------|
| **仓库** | [princeton-nlp/SWE-bench](https://github.com/princeton-nlp/SWE-bench) |
| **一句话** | 用真实 GitHub Issue 评估 AI 编程能力 |
| **核心功能** | 真实 Bug 修复任务；SWE-bench Verified 子集 |
| **独特技术** | 从 GitHub 仓库直接提取任务；多语言支持 |
| **适用场景** | AI 编程工具选型、了解 AI 编程真实水平 |

---

### 分类四：DevOps 平台

#### 12. Harness.io ⭐ 33,800+

| 维度 | 详情 |
|------|------|
| **仓库** | [harness/harness](https://github.com/harness/harness) |
| **一句话** | 企业级 AI-Native CI/CD 平台 |
| **核心功能** | Drone CI（开源）；Test Intelligence；Continuous Verification；Cloud Cost Management |
| **独特技术** | Test Intelligence 构建加速 8x；Policy-as-Code（OPA）；SLSA L3 合规 |
| **适用场景** | 大中型企业的多云交付和成本管理 |

---

### 全景对比总表

| 类别 | 项目 | 星标 | 核心定位 |
|------|------|------|---------|
| AI 编程 | Aider | 45k+ | 终端 AI 结对编程 |
| AI 编程 | Claude Code | 快速增长 | 多步骤编排 + 安全沙箱 |
| AI 编程 | SWE-agent | 15k+ | AI 操作计算机界面设计 |
| AI 编程 | OpenHands | 48k+ | 可视化沙盒 AI 开发环境 |
| 多 Agent | MetaGPT | 50k+ | 软件工程全流程自动化 |
| 多 Agent | AutoGen | 35k+ | 多 Agent 对话辩论 |
| 多 Agent | CrewAI | 20k+ | 角色扮演式 Agent 编排 |
| 多 Agent | LangChain | 95k+ | LLM 应用标准化框架 |
| 多 Agent | Dify | 50k+ | 可视化 AI 应用构建 |
| 评估 | lm-eval-harness | 7k+ | LLM 能力统一测量 |
| 评估 | SWE-bench | 3k+ | AI 编程能力真实评测 |
| DevOps | Harness.io | 33k+ | 企业 CI/CD 与云成本管理 |

---

## 第四部分：小型项目如何落地 Harness

> 你的项目是小型桌面应用和网页维护，以下是**务实可落地**的做法。

### 原则：重实用，轻流程

| 大项目的做法 | 小项目的适配 |
|-------------|-------------|
| 完整的 CI/CD Pipeline | 手动触发 + Claude Code 帮你跑 |
| 专职 Code Review | 写完代码用 Review Agent 过一遍 |
| 自动化测试套件 | Agent 帮你写关键路径的测试 |
| 安全扫描 Pipeline | 改完涉及用户数据的代码，跑一次 Security Scan |
| 知识管理 Wiki | CLAUDE.md + Memory 文件 |

### 桌面应用开发工作流

```
1. 需求阶段
   "帮我实现一个截图功能"
   → 先告诉我你的想法 → 我帮你做 Brainstorming，理清需求

2. 计划阶段
   → 产出实现计划（改哪些文件、需要什么库、数据流如何）
   → 你确认后开始写代码

3. 实现阶段
   → 按计划逐步实现
   → 每完成一个模块，用对应语言的专业 Agent Review

4. 验证阶段
   → 编译运行，修复构建错误
   → 手动测试关键流程

5. 提交阶段
   → 清理代码、写 Commit Message
```

### 网页维护工作流

```
1. 发现问题或接受需求
   "首页加载太慢了" 或 "要加一个搜索框"

2. 诊断或设计
   → Performance Agent 分析性能问题
   → 或 Brainstorming 明确新功能需求

3. 实现
   → 改代码 → React/Vue Review Agent 检查
   → 有安全问题？Security Review Agent 扫描

4. 验证
   → E2E Runner 跑关键用户流程
   → 浏览器中实际看一眼

5. 上线
   → 构建、部署
```

### 常用命令速查

```bash
/code-review          # 审查当前改动
/security-review      # 扫描安全漏洞
/simplify             # 清理冗余代码
/verify               # 端到端验证你的改动是否真的有效
/init                 # 生成 CLAUDE.md，让 Claude 了解你的项目
/fewer-permission-prompts  # 让常用命令不再每次弹窗确认
```

### 配置示例：`.claude/settings.json`

```json
{
  "hooks": {
    "post:write": [
      {
        "matcher": "*.tsx|*.jsx|*.vue",
        "cmd": "/code-review --effort low"
      }
    ]
  }
}
```

> 配置后：每次写完前端组件，自动触发轻量级审查。

---

## 第五部分：Claude Code Harness 能力速查

### 专业 Agent（部分精选）

| Agent | 用途 | 何时使用 |
|-------|------|---------|
| `code-reviewer` | 通用代码审查 | 写完代码后 |
| `react-reviewer` | React 专项审查 | 改了 .tsx/.jsx |
| `vue-reviewer` | Vue 专项审查 | 改了 .vue |
| `python-reviewer` | Python 专项审查 | 改了 .py |
| `typescript-reviewer` | TS 类型审查 | TypeScript 项目 |
| `security-reviewer` | 安全漏洞扫描 | 涉及用户输入、认证 |
| `performance-optimizer` | 性能分析 | 页面慢、卡顿 |
| `build-error-resolver` | 构建错误修复 | 编译/构建失败 |
| `react-build-resolver` | React 构建修复 | React 构建失败 |
| `refactor-cleaner` | 死代码清理 | 代码库变乱 |
| `e2e-runner` | 端到端测试 | 验证关键流程 |
| `silent-failure-hunter` | 静默失败检测 | 错误被悄悄吞掉 |
| `a11y-architect` | 无障碍审查 | 确保 UI 可访问 |
| `doc-updater` | 文档更新 | 维护项目文档 |

### 核心 Skill 流程（部分精选）

| Skill | 用途 | 触发时机 |
|-------|------|---------|
| `brainstorming` | 需求分析和方案设计 | 开始任何创造性工作前 |
| `writing-plans` | 编写实施计划 | 有需求后、动手前 |
| `executing-plans` | 执行实施计划 | 计划确认后 |
| `subagent-driven-development` | 多任务并行开发 | 多个独立任务 |
| `systematic-debugging` | 系统化调试 | 遇到 Bug |
| `test-driven-development` | 测试驱动开发 | 写新功能或修 Bug |
| `verification-before-completion` | 完成前验证 | 任务快结束时 |
| `requesting-code-review` | 请求代码审查 | 完成重要功能后 |
| `receiving-code-review` | 处理审查反馈 | 收到 Review 意见后 |
| `finishing-a-development-branch` | 完成开发分支 | 功能完成准备合并 |

---

## 第六部分：快速上手 Checklist

### 第一天：建立基础

- [ ] 在项目根目录告诉 Claude：**"帮我初始化这个项目"** → 生成 CLAUDE.md
- [ ] 告诉 Claude 你的技术栈偏好 → 写入 Memory
- [ ] 试一次完整流程：提需求 → Brainstorming → 实现 → Code Review → 验证

### 第一周：形成习惯

- [ ] 每次写代码前先说需求，让 Claude 帮你做 Brainstorming
- [ ] 每次写完代码后运行 `/code-review`
- [ ] 遇到 Bug 时使用 `systematic-debugging` skill
- [ ] 涉及用户输入/认证的代码，主动运行 `/security-review`

### 第一个月：自动化

- [ ] 配置 `.claude/settings.json` 添加自动 Review Hook
- [ ] 建立项目的 Memory 文件（架构决策、命名规范、常见坑）
- [ ] 尝试一次多 Agent 并行任务

---

## 附录：关键概念速查表

| 概念 | 一句话解释 |
|------|-----------|
| **Agent** | 一个专精某项任务的 AI 子代理 |
| **Skill** | 预定义的、经过验证的工作流程 |
| **Hook** | 在特定时机自动触发的动作 |
| **Workflow** | 多 Agent 的编排脚本（pipeline/parallel） |
| **Memory** | 跨会话持久化的知识条目 |
| **CLAUDE.md** | 项目的"欢迎文档"，Claude 每次会话都会加载 |
| **Worktree** | Git 的隔离分支，用于安全地在副本中操作 |
| **Schema** | 结构化输出格式，强制 Agent 返回特定格式数据 |

---

> **最后的话**：Harness 工程的本质不是工具多强大，而是**把每一次 AI 交互都当成一次工程交付来对待**。对于小型项目，不需要搭建复杂的 CI/CD Pipeline——只要坚持"先想再做、写完就审、改完就验"三个习惯，就已经在享受 Harness 工程的核心价值了。
