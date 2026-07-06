---
title: "Superpowers 技能触发方式全览"
date: "2026-07-05"
tags: ["Superpowers", "Skill", "Claude Code"]
categories: ["superpowers"]
summary: "Superpowers 14 个技能的触发机制全解析——语义匹配、关键词匹配与手动调用。"
---

# Superpowers 技能触发方式全览

> **日期**: 2026-07-04  
> **技能总数**: 14 个  
> **触发机制**: 语义匹配 — AI 根据对话内容自动判断是否需要调用技能

---

## 一、什么是"触发"

Superpowers 技能的触发机制是 **语义匹配** —— AI 会根据你的对话内容自动判断是否需要调用某个技能。技能文件中的 `description` 字段（必须以 `Use when...` 开头）定义了触发条件。

你不需要精确地说某个命令，只需要描述你的需求，AI 就会匹配对应的技能。

---

## 二、全部 14 个技能的触发条件

---

### 1. `using-superpowers` — 入口技能

| 项目 | 说明 |
|------|------|
| **触发条件** | **每次对话开始时自动触发** |
| **典型 prompt** | 任何对话的开头都触发，不需要你显式调用 |

**作用**：建立"技能优先"规则——要求 AI 在任何回复或行动前先检查是否有适用的技能。

---

### 2. `brainstorming` — 设计前头脑风暴

| 项目 | 说明 |
|------|------|
| **触发条件** | 任何创意工作：创建功能、构建组件、添加功能、修改行为 |
| **关键词信号** | `build`, `create`, `add a feature`, `make`, `develop`, `写一个`, `做一个`, `开发` |

**触发示例**：

```text
帮我写一个 todo app
Build a CLI tool for managing notes
Add a dark mode toggle to the settings
Make a function that converts CSV to JSON
我想做一个聊天机器人
```

**不触发**：纯 bug 修复、纯代码审查、纯问题回答

---

### 3. `systematic-debugging` — 系统性调试

| 项目 | 说明 |
|------|------|
| **触发条件** | 遇到任何 bug、测试失败、意外行为、性能问题、构建失败 |
| **关键词信号** | `bug`, `crash`, `error`, `fail`, `doesn't work`, `broken`, `报错`, `崩溃`, `不工作` |

**触发示例**：

```text
The app crashes when I click submit
Tests are failing after the latest commit
Search returns empty results even though data exists
Why does this function return undefined?
点击按钮后页面直接崩溃了
```

---

### 4. `test-driven-development` — 测试驱动开发

| 项目 | 说明 |
|------|------|
| **触发条件** | 实现任何功能或修复 bug 时，在写实现代码之前 |
| **关键词信号** | `implement`, `add function`, `fix bug`（与实现相关） |

**触发示例**：

```text
Add a function that validates email addresses
Implement retry logic for API calls
Fix the login bug
创建一个用户注册功能
```

---

### 5. `verification-before-completion` — 完成前验证

| 项目 | 说明 |
|------|------|
| **触发条件** | AI 即将声称工作完成、修复成功、测试通过时，提交或创建 PR 前 |
| **关键词信号** | 任何表示"完成/成功"的陈述之前 |

你不需要显式触发它——这是一个**内部纪律检查**。当 AI 准备说"完成了"时，它必须先运行验证命令。

---

### 6. `requesting-code-review` — 请求代码审查

| 项目 | 说明 |
|------|------|
| **触发条件** | 完成任务后、实现主要功能后、合并前 |
| **关键词信号** | `review`, `check my code`, `before merge`, `审查`, `检查代码` |

**触发示例**：

```text
Review my changes before I merge
Check the code quality
合并前帮我审查一下
I just finished the feature, can you review?
```

---

### 7. `receiving-code-review` — 接收代码审查反馈

| 项目 | 说明 |
|------|------|
| **触发条件** | 接收到代码审查反馈时，特别是在实施建议之前 |
| **关键词信号** | 用户或 reviewer agent 给出代码反馈/建议时 |

不需要你显式触发——当有人给你代码反馈时自动生效。

---

### 8. `writing-plans` — 编写实施计划

| 项目 | 说明 |
|------|------|
| **触发条件** | 已有 spec 或需求，需要进行多步骤任务，在写代码之前 |
| **关键词信号** | brainstorming 完成后自然触发，`plan`, `计划` |

**触发示例**：

```text
Write an implementation plan for the authentication feature
为这个功能写一个实施计划
（brainstorming 完成设计后自动触发）
```

---

### 9. `executing-plans` — 执行实施计划

| 项目 | 说明 |
|------|------|
| **触发条件** | 有书面实施计划，需要在独立会话中执行 |
| **关键词信号** | `execute the plan`, `follow the plan`, `执行计划` |

**触发示例**：

```text
Execute the plan in docs/superpowers/plans/auth-plan.md
按照计划文件执行
```

---

### 10. `subagent-driven-development` — 子代理驱动开发

| 项目 | 说明 |
|------|------|
| **触发条件** | 在当前会话中执行包含独立任务的实施计划 |
| **关键词信号** | writing-plans 完成后选择 "Subagent-Driven" 模式 |

**触发示例**：

```text
（writing-plans 生成计划后）
Use subagent-driven development to execute this plan
```

---

### 11. `dispatching-parallel-agents` — 并行代理分发

| 项目 | 说明 |
|------|------|
| **触发条件** | 面对 2+ 个独立任务（不共享状态、无顺序依赖） |
| **关键词信号** | `multiple failures`, `unrelated`, `independent`, `in parallel`, `多个`, `同时` |

**触发示例**：

```text
I have 3 unrelated test failures in different files
Fix these independent issues simultaneously
这 3 个 bug 互不相关，帮我同时修
这些文件之间没有依赖，可以并行处理
```

---

### 12. `finishing-a-development-branch` — 完成开发分支

| 项目 | 说明 |
|------|------|
| **触发条件** | 实现完成、所有测试通过、需要决定如何集成工作 |
| **关键词信号** | `finish`, `complete`, `merge`, `PR`, `done with`, `开发完了`, `完成` |

**触发示例**：

```text
I'm done with the feature, what should I do next?
All tests pass, ready to merge
开发完成了，下一步是什么？
```

---

### 13. `using-git-worktrees` — Git 工作树隔离

| 项目 | 说明 |
|------|------|
| **触发条件** | 开始需要环境隔离的功能工作，或在执行实施计划之前 |
| **关键词信号** | `worktree`, `isolated`, `workspace`, `隔离`, `干净环境` |

**触发示例**：

```text
I want to start feature work in an isolated workspace
Set up a clean environment for this feature
帮我在隔离环境中开发这个功能
```

---

### 14. `writing-skills` — 编写技能

| 项目 | 说明 |
|------|------|
| **触发条件** | 创建新技能、编辑已有技能、部署前验证技能 |
| **关键词信号** | `create a skill`, `write a skill`, `edit skill`, `new skill`, `写一个技能` |

**触发示例**：

```text
Create a new skill for database migration workflows
Edit the brainstorming skill to add a new step
帮我写一个 CI/CD 部署的技能
```

---

## 三、触发优先级规则

当多个技能同时匹配时，按以下优先级：

```text
1. using-superpowers （总是最先加载，建立"技能优先"规则）
       │
2. 流程技能（brainstorming、systematic-debugging） → 先定方法
       │
3. 实现技能（TDD、writing-plans、subagent-driven-development） → 再执行
```

**经验法则**：

| 你的需求 | 触发链 |
|----------|--------|
| "Let's build X" | `brainstorming` → `writing-plans` → `TDD` |
| "Fix this bug" | `systematic-debugging` → `TDD` |

---

## 四、一句话速查表

| 你想做的事 | 说这句话 | 触发技能 |
|-----------|---------|----------|
| 开发新功能 | "帮我做一个XXX" | `brainstorming` |
| 修 bug | "这里有个 bug" | `systematic-debugging` |
| 写代码 | "实现一个XXX函数" | `test-driven-development` |
| 声称完成 | （自动触发） | `verification-before-completion` |
| 代码审查 | "帮我 review 代码" | `requesting-code-review` |
| 收到反馈 | （自动触发） | `receiving-code-review` |
| 写计划 | "写个实施计划" | `writing-plans` |
| 执行计划 | "按计划执行" | `executing-plans` |
| 子代理执行 | "用子代理执行" | `subagent-driven-development` |
| 并行任务 | "这几个互不相关，同时做" | `dispatching-parallel-agents` |
| 隔离开发 | "在隔离环境开发" | `using-git-worktrees` |
| 完成收尾 | "开发完了" | `finishing-a-development-branch` |
| 写技能 | "创建一个新技能" | `writing-skills` |

---

## 五、完整技能依赖拓扑图

```text
                    using-superpowers (入口)
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
         brainstorming  systematic-  test-driven-
                        debugging    development
              │            │            │
              ▼            │            │
        writing-plans      │            │
              │            │            │
    ┌─────────┼─────────┐  │            │
    ▼         ▼         ▼  │            │
  executing- subagent-  dis-           │
  plans     driven-   patching-        │
            dev       parallel         │
    │         │         │              │
    └─────────┼─────────┘              │
              ▼                        │
    finishing-a-branch                 │
              │                        │
              ▼                        ▼
    requesting-code-review    verification-before-completion
              │                        │
              ▼                        │
    receiving-code-review              │
                                       │
    ┌──────────────────────────────────┘
    │
    ├── using-git-worktrees (基础设施)
    └── writing-skills (基础设施)
```

---

## 六、技能分类速查

### 流程编排技能（7 个）

| 技能 | 角色 | 触发时机 |
|------|------|----------|
| `using-superpowers` | 入口守卫 | 每次对话开始 |
| `brainstorming` | 设计探索 | 创意/功能请求 |
| `writing-plans` | 计划编写 | 设计批准后 |
| `executing-plans` | 计划执行 | 有书面计划时 |
| `subagent-driven-development` | 子代理执行 | 含独立任务的计划 |
| `dispatching-parallel-agents` | 并行任务 | 多个独立任务 |
| `finishing-a-development-branch` | 收尾 | 开发全部完成 |

### 质量纪律技能（5 个）

| 技能 | 角色 | 触发时机 |
|------|------|----------|
| `test-driven-development` | TDD 执法 | 写任何实现代码前 |
| `systematic-debugging` | 调试方法论 | 遇到任何 bug 时 |
| `verification-before-completion` | 验证门禁 | 声称完成前 |
| `requesting-code-review` | 审查发起 | 任务完成/合并前 |
| `receiving-code-review` | 审查响应 | 收到反馈时 |

### 基础设施技能（2 个）

| 技能 | 角色 | 触发时机 |
|------|------|----------|
| `using-git-worktrees` | 环境隔离 | 需要干净工作空间 |
| `writing-skills` | 技能编写 | 创建/编辑技能 |
