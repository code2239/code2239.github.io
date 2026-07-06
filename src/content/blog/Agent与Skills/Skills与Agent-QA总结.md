---
title: "Skills 与 Agents 问答总结"
date: "2026-07-04"
tags: ["Claude Code", "Agent", "Skill", "Workflow"]
categories: ["agent-skills"]
summary: "关于 Claude Code 多代理系统的 12 轮问答——涵盖 Skill/Agent/Workflow 概念、能力边界控制、协同工作模式、单代理与多代理决策框架。"
---

> 整理日期：2026-07-04
> 来源：对话中关于 Claude Code 多代理系统的 12 轮问答

---

## 一、基础概念

### 三个核心概念的区别

| 概念 | 是什么 | 调用方式 | 例子 |
|------|--------|----------|------|
| **Skill** | 工作流指令集，告诉你怎么做 | `Skill` 工具 | `superpowers:brainstorming` |
| **Agent** | 独立 AI 实例，负责执行具体任务 | `Agent` 工具 | `ecc:code-reviewer` |
| **Workflow** | 编排脚本，协调多个 Agent 协作 | `Workflow` 工具 | `review-changes` |

**类比：Skill = 剧本 + 导演，Agent = 演员，Workflow = 拍摄计划**

---

## 二、Skill 和 Agent 的关系

### 核心原则

```
Skill（主对话中运行，全工具权限）
  │
  ├─ Agent 工具 → 启动 ecc:security-reviewer（只有 Read/Grep/Glob/Bash）
  ├─ Agent 工具 → 启动 ecc:react-reviewer（只有 Read/Grep/Glob/Bash）
  └─ Agent 工具 → 启动 implementer（可以 Write/Edit）
```

- **Skill 调 Agent**：Skill 运行在主对话中，通过 `Agent` 工具分派任务
- **Agent 的能力边界由 tools 列表决定**：给什么工具，就能做什么
- **Skill 不越权**：因为 Skill 只会调用该调的 Agent
- **Agent 不越权**：因为它的工具集从定义上就被锁死了

### Skill 和 Agent 的职责分工

| 角色 | 职责 | 你的工具 |
|------|------|----------|
| **规划者** | 分析需求 → 拆解任务 → 排优先级 | Stage 1+2（brainstorming + writing-plans） |
| **协调者** | 分配任务 → 管理依赖 → 仲裁分歧 | Stage 4（subagent-driven-development） |
| **执行者** | 接收任务 → 实现 → 交付 | Task implementer 子代理 |

---

## 三、Agent 的能力边界控制

### 三种控制方式

| 方式 | 机制 | 强度 |
|------|------|:---:|
| **工具限制** | `tools: Read, Grep, Glob` — 没给的工具永远用不了 | 硬 |
| **System Prompt 约束** | prompt 里写"你只能做 X，禁止做 Y" | 软 |
| **调用者控制** | Skill/主 Agent 选择性地调用特定 Agent | 中 |

### 示例：创建一个受限 Agent

```yaml
# .claude/agents/my-reviewer.md
---
name: my-reviewer
description: 只审查，不写代码
tools: Read, Grep, Glob
model: sonnet
---

你只能审查代码质量，不能修改任何文件。
```

### 能否设置只使用特定 Skill 的 Agent？

**不能直接设置"Skill 白名单"**——Skill 是全局注册表。但可以通过以下方式实现：

1. **不给 Skill 工具**（`tools` 里不写 `Skill`）— 硬隔离
2. **System Prompt 约束** — prompt 里写"你只能用 X、Y 两个技能"
3. **写专用 Skill** — Skill 本身是全局的，但内容决定了只有特定 Agent 会用它

### 能否设置只使用特定 Agent 的 Skill？

**不能直接设置"Agent 白名单"**——但可以通过以下方式实现：

1. **Skill 里写死调用哪个 Agent** — Skill 的指令明确指定 Agent 类型
2. **限制 Skill 调用者的工具** — 不让 Skill 调用者有 `Agent` 工具

---

## 四、自定义 Agent 和自定义 Skill

### 自定义 Agent

在 `.claude/agents/` 下创建 `.md` 文件即可：

```
.claude/agents/
  ├─ snake-logic-reviewer.md     → 专审游戏逻辑
  ├─ snake-canvas-reviewer.md    → 专审 Canvas 渲染
  └─ snake-ux-reviewer.md        → 专审键盘交互
```

**Agent 来源不限于内置**：
- 本地 `.md` 文件（最直接）
- MCP 连接外部 Agent（如 LobeHub）
- Workflow 脚本内联定义
- API 对接外部模型

### 自定义 Skill

Skills 是全局注册表，可以在 `.claude/skills/` 下创建。自定义 Agent 可以在其 system prompt 中指定使用哪些 Skill。

```
.claude/
  ├─ agents/
  │   └─ snake-logic-reviewer.md   → prompt 里限制只用 audit 类 Skill
  └─ skills/
      └─ snake-logic-audit.md      → 专为 logic-reviewer 写的专用 Skill
```

### 自定义 Agent 能拥有私有 Skill 吗？

**不能。** Skill 是全局的，不属于任何 Agent。但可以通过 prompt 约束 Agent 只能用指定 Skill。

---

## 五、Agent 协同工作模式

### Claude Code 内置的三种协同模式

| 模式 | 工具 | 适用场景 |
|------|------|----------|
| **点对点通信** | `SendMessage` | 简单指派 |
| **编排式协同** | `Workflow` | 多 Agent 并行 + 流水线 |
| **议事会** | `ecc:council` | 多 Agent 讨论决策 |

### 对应你已有的 5 Stage 工作流

```
Stage 1: brainstorming        → 设计
Stage 2: writing-plans         → 计划（精确到函数签名）
Stage 3: using-git-worktrees   → 隔离环境
Stage 4: subagent-driven-dev   → 批量分发 implementer + reviewer
Stage 5: finishing             → 收尾合并
```

### 开源前端应用（外部参考）

| 项目 | 最接近的模式 |
|------|------------|
| **ChatDev** | 代理逐轮开会讨论 |
| **MetaGPT** | SOP 驱动的结构化会议 + 文档产出 |
| **AutoGen Studio** | 拖拽设计代理团队，Web UI |
| **AgentVerse** | 议事会（Council）模式 |

详见 `multi-agent-collaboration-frontend-tools.md`

---

## 六、单代理 vs 多代理决策框架

### 对比表

| 维度 | 单代理 | 多代理 |
|------|:---:|:---:|
| 简单任务效率 | ✅ 高 | ❌ 杀鸡用牛刀 |
| 复杂任务质量 | ⚠️ 容易遗漏 | ✅ 专业深度 + 交叉验证 |
| 并行任务速度 | ❌ 串行瓶颈 | ✅ 3-10x 加速 |
| Token 成本 | ✅ 低 | ❌ 1.5-3x |
| 运维复杂度 | ✅ 简单 | ❌ 需要编排 |
| 错误率 | ⚠️ 自审盲区 | ✅ 对抗验证减少遗漏 |
| 串行任务延迟 | ✅ 无通信开销 | ❌ 通信开销叠加 |

### 决策原则

```
任务是否独立可拆分？
  ├─ 是 → 任务是否复杂到单代理不可靠？
  │        ├─ 是 → 用多代理 ✅
  │        └─ 否 → 单代理足够
  └─ 否 → 任务天然串行？
           ├─ 是 → 单代理更高效 ✅（除非需要对抗验证）
           └─ 否 → 重新审视任务分解方式
```

**核心原则：多代理不是银弹——它解决的是"单代理能力边界"问题，代价是 token、延迟和编排复杂度。**

---

## 七、架构全景图

```
┌─────────────────────────────────────────────────────┐
│                    你的 Claude Code 环境               │
│                                                       │
│  Skills（剧本）          Agents（演员）                 │
│  ┌──────────────┐      ┌──────────────────────┐      │
│  │ brainstorming │──▶  │ ecc:architect         │      │
│  │ writing-plans │──▶  │ Plan                  │      │
│  │ subagent-dev  │──▶  │ implementer           │      │
│  │               │──▶  │ ecc:code-reviewer     │      │
│  │               │──▶  │ ecc:security-reviewer │      │
│  │ finishing     │──▶  │ ecc:doc-updater       │      │
│  └──────────────┘      └──────────────────────┘      │
│                                                       │
│  自定义扩展                                          │
│  ┌──────────────┐      ┌──────────────────────┐      │
│  │ 自定义 Skill  │──▶  │ 自定义 Agent (.md)    │      │
│  └──────────────┘      │ MCP 外部 Agent        │      │
│                         │ API 对接模型          │      │
│                         └──────────────────────┘      │
└─────────────────────────────────────────────────────┘
```
