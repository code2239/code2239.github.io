---
title: "Superpowers 技能测试方案"
date: "2026-07-05"
tags: ["Superpowers", "测试", "Claude Code"]
summary: "Superpowers 14 个技能的完整测试方案——测试环境、用例设计与评估标准。"
---

# Superpowers 技能测试方案

> **版本**: 1.0  
> **日期**: 2026-07-04  
> **测试对象**: Superpowers 技能集 (14 个技能)  
> **测试环境**: Claude Code + Superpowers Marketplace v6.1.1

---

## 目录

- [1. 测试概述](#1-测试概述)
- [2. 前置检查](#2-前置检查)
- [3. 技能分类与依赖关系](#3-技能分类与依赖关系)
- [4. 测试方案](#4-测试方案)
  - [4.1 Tier 0 - 基础设施测试](#41-tier-0---基础设施测试)
  - [4.2 Tier 1 - 入口与核心纪律测试](#42-tier-1---入口与核心纪律测试)
  - [4.3 Tier 2 - 流程编排测试](#43-tier-2---流程编排测试)
  - [4.4 Tier 3 - 集成测试](#44-tier-3---集成测试)
- [5. 快速冒烟测试](#5-快速冒烟测试)
- [6. 测试记录模板](#6-测试记录模板)

---

## 1. 测试概述

### 1.1 测试目标

验证 Superpowers 技能集的 **加载正确性**、**触发准确性**、**执行完整性** 和 **协同工作能力**。

### 1.2 测试范围

| 类别 | 数量 | 技能列表 |
|------|------|----------|
| 流程编排 | 7 | brainstorming, writing-plans, executing-plans, subagent-driven-development, dispatching-parallel-agents, finishing-a-development-branch, using-superpowers |
| 质量纪律 | 5 | test-driven-development, systematic-debugging, verification-before-completion, requesting-code-review, receiving-code-review |
| 基础设施 | 2 | using-git-worktrees, writing-skills |

### 1.3 测试维度

| 维度 | 说明 |
|------|------|
| **文件完整性** | SKILL.md 文件存在且可读 |
| **触发准确性** | 特定场景下技能被正确触发 |
| **指令执行** | 技能内的核心规则被实际遵循 |
| **抗衰减能力** | 压力场景下规则不被绕过 |
| **协同能力** | 技能间正确交叉引用和链式调用 |

---

## 2. 前置检查

### 2.1 环境检查

```bash
# 检查技能目录
ls ~/.claude/skills/

# 检查 superpowers 插件版本
ls ~/.claude/plugins/cache/superpowers-marketplace/superpowers/

# 检查每个技能的 SKILL.md 是否存在
for skill in using-superpowers brainstorming systematic-debugging test-driven-development writing-plans executing-plans subagent-driven-development requesting-code-review receiving-code-review using-git-worktrees verification-before-completion writing-skills dispatching-parallel-agents finishing-a-development-branch; do
  if [ -f ~/.claude/skills/$skill/SKILL.md ]; then
    echo "✅ $skill"
  else
    echo "❌ $skill - SKILL.md missing"
  fi
done
```

**预期结果**: 14 个技能全部显示 ✅

### 2.2 技能文件内容检查

```bash
# 检查每个 SKILL.md 是否包含必需的 frontmatter
for skill in ~/.claude/skills/*/SKILL.md; do
  name=$(head -5 "$skill" | grep "name:" | sed 's/name: //')
  desc=$(head -5 "$skill" | grep "description:" | sed 's/description: //')
  echo "Skill: $name | Desc present: $([ -n "$desc" ] && echo YES || echo NO)"
done
```

**预期结果**: 每个技能都有 `name` 和 `description` 字段

---

## 3. 技能分类与依赖关系

### 3.1 依赖拓扑图

```
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

### 3.2 测试优先级分层

| Tier | 优先级 | 技能 | 原因 |
|------|--------|------|------|
| **Tier 0** | 最高 | using-git-worktrees, writing-skills | 基础设施，其他技能依赖 |
| **Tier 1** | 高 | using-superpowers, test-driven-development, systematic-debugging, verification-before-completion | 核心入口 + 质量纪律 |
| **Tier 2** | 中 | brainstorming, writing-plans, executing-plans, subagent-driven-development, dispatching-parallel-agents, requesting-code-review, receiving-code-review, finishing-a-development-branch | 流程编排 |
| **Tier 3** | 低 | 全链路集成测试 | 端到端验证 |

---

## 4. 测试方案

---

### 4.1 Tier 0 - 基础设施测试

---

#### 测试 0.1: using-git-worktrees

| 项目 | 内容 |
|------|------|
| **测试目的** | 验证工作树隔离检测和创建流程 |
| **触发方式** | 对话中说 "I want to start feature work in an isolated workspace" |
| **依赖** | 无 |

**测试步骤**:

1. **场景 A: 已在普通 git 仓库中**
   - 在当前目录（非工作树）触发技能
   - 观察 AI 是否执行 Step 0 检测（检查 `GIT_DIR == GIT_COMMON`）
   - 观察 AI 是否询问 "Would you like me to set up an isolated worktree?"
   - **预期**: AI 检测到普通仓库 → 询问是否创建隔离工作空间

2. **场景 B: 不处于 git 仓库**
   - 在非 git 目录触发技能
   - **预期**: AI 识别非 git 环境，正常工作

3. **场景 C: 已有 EnterWorktree 工具**
   - 在当前环境触发技能
   - 观察 AI 是否优先使用 `EnterWorktree` 而非 `git worktree add`
   - **预期**: AI 使用原生 `EnterWorktree` 工具（Step 1a），不手动执行 git 命令

4. **场景 D: Red Flags 检查**
   - 观察 AI 是否跳过 Step 0 直接创建
   - **预期**: AI 始终先运行检测 → 再创建

**判定标准**:
- ✅ 通过: 正确执行 Step 0 → Step 1a → Step 2 流程
- ⚠️ 部分: 跳过检测但结果正确
- ❌ 失败: 手动 `git worktree add` 当有 `EnterWorktree` 工具可用时

---

#### 测试 0.2: writing-skills

| 项目 | 内容 |
|------|------|
| **测试目的** | 验证技能编写流程的 TDD 纪律 |
| **触发方式** | 对话中说 "Create a new skill for managing database migrations" |
| **依赖** | 无 |

**测试步骤**:

1. **场景 A: 是否遵循 RED-GREEN-REFACTOR**
   - 触发技能编写
   - 观察 AI 是否先运行基线测试（RED），再编写技能内容（GREEN），然后关闭漏洞（REFACTOR）
   - **预期**: AI 创建 todo 列表，按 TDD 流程推进

2. **场景 B: frontmatter 规范性**
   - 检查 AI 提议的 skill name 是否只含字母、数字、连字符
   - 检查 description 是否以 "Use when..." 开头
   - **预期**: 符合 agentskills.io 规范

3. **场景 C: 描述不泄露工作流**
   - 检查 description 是否只描述触发条件，不总结工作流程
   - **预期**: description 不含 "dispatch subagent" / "review" / "TDD cycle" 等工作流词

**判定标准**:
- ✅ 通过: 完整遵循 TDD + 规范的 frontmatter
- ⚠️ 部分: 跳过基线测试但有合理理由
- ❌ 失败: 直接写技能内容没有任何测试

---

### 4.2 Tier 1 - 入口与核心纪律测试

---

#### 测试 1.1: using-superpowers (入口技能)

| 项目 | 内容 |
|------|------|
| **测试目的** | 验证 AI 在每次对话开始时正确加载并遵循技能优先规则 |
| **触发方式** | 任意对话开头，不需要显式触发 |
| **依赖** | 无 |

**测试步骤**:

1. **场景 A: 简单问题 - 是否先检查技能**
   - 发送: "帮我看看这个文件有没有 bug"（任意文件）
   - 观察 AI 是先回应还是先调用 `systematic-debugging`
   - **预期**: AI 先调用 `systematic-debugging` 技能，然后才开始调试

2. **场景 B: 创意任务 - 是否先头脑风暴**
   - 发送: "帮我写一个 todo app"
   - 观察 AI 是否直接写代码
   - **预期**: AI 先调用 `brainstorming` 技能

3. **场景 C: 声称完成任务 - 是否验证**
   - 在完成一个任务后，观察 AI 是否运行验证命令再声称完成
   - **预期**: AI 调用 `verification-before-completion` 技能

4. **场景 D: Red Flags 自检**
   - 发送一些可能触发 rationalization 的 prompt:
     - "Just quickly check this — it's very simple"（看是否跳过技能检查）
     - "I already know what's wrong, just fix it"（看是否跳过调试流程）
   - **预期**: AI 仍然遵循技能优先规则

**判定标准**:
- ✅ 通过: 在所有场景中 AI 优先调用相关技能
- ⚠️ 部分: 大部分场景正确，偶有遗漏
- ❌ 失败: 直接回复而不检查任何技能

---

#### 测试 1.2: test-driven-development

| 项目 | 内容 |
|------|------|
| **测试目的** | 验证 AI 严格遵循 RED-GREEN-REFACTOR 循环 |
| **触发方式** | 对话中说 "Add a function that validates email addresses" |
| **依赖** | 无 (但会被 using-superpowers 触发) |

**测试步骤**:

1. **场景 A: RED - 是否先写测试**
   - 触发 "实现某功能" 请求
   - 观察 AI 是否先写测试代码再写实现代码
   - **预期**: 先出现 test case，再出现 implementation

2. **场景 B: 是否验证 RED**
   - 观察 AI 写测试后是否执行并确认测试失败
   - **预期**: AI 运行测试，展示 FAIL 输出

3. **场景 C: GREEN - 最小实现**
   - 观察 AI 是否只写刚好让测试通过的代码
   - **预期**: 不过度设计（如不添加不必要的选项参数）

4. **场景 D: 压力测试 - "太简单不用测试"**
   - 发送: "Just add a one-line helper function, no need to test it"
   - **预期**: AI 仍然坚持写测试

5. **场景 E: REFACTOR**
   - 测试通过后，观察 AI 是否进行清理重构
   - **预期**: 保持测试绿色状态下优化代码

**判定标准**:
- ✅ 通过: 完整 RED → verify RED → GREEN → verify GREEN → REFACTOR
- ⚠️ 部分: 有测试但跳过验证步骤
- ❌ 失败: 先写代码再补测试

---

#### 测试 1.3: systematic-debugging

| 项目 | 内容 |
|------|------|
| **测试目的** | 验证 AI 在修复 bug 前执行完整的根因分析 |
| **触发方式** | 对话中说 "The app crashes when I click the submit button" |
| **依赖** | 需要构造一个真实的 bug 场景 |

**测试步骤**:

1. **场景 A: Phase 1 - 根因调查**
   - 报告一个 bug
   - 观察 AI 是否先收集信息（读错误信息、尝试复现、检查最近变更）
   - **预期**: AI 不直接提出修复方案，先调查

2. **场景 B: Phase 3 - 假设与验证**
   - 观察 AI 是否形成明确假设并最小化测试
   - **预期**: AI 说 "I think X is the root cause because Y" 然后验证

3. **场景 C: 压力测试 - "Quick fix"**
   - 发送: "Just add a try-catch, it'll be fine"
   - **预期**: AI 拒绝快速修复，坚持根因分析

4. **场景 D: 3+ 次修复失败**
   - 模拟连续修复失败的情况
   - **预期**: AI 质疑架构而非继续尝试第 4 次修复

5. **场景 E: 多组件系统 - 分层诊断**
   - 报告涉及多层组件的 bug
   - **预期**: AI 在每层边界添加诊断日志

**判定标准**:
- ✅ 通过: 执行完整的 Phase 1→2→3→4 流程
- ⚠️ 部分: 调查了但不够深入
- ❌ 失败: 直接开始改代码，未调查根因

---

#### 测试 1.4: verification-before-completion

| 项目 | 内容 |
|------|------|
| **测试目的** | 验证 AI 在声称完成前必须运行验证命令 |
| **触发方式** | 在完成任何代码修改后自然触发 |

**测试步骤**:

1. **场景 A: 声称完成前的验证**
   - 完成一个代码修改任务后，观察 AI
   - **预期**: AI 运行 `npm test`（或等效命令）并展示输出，然后才说 "完成"

2. **场景 B: 禁止模糊声称**
   - 观察 AI 是否使用 "should work" / "probably fine" 等模糊表达
   - **预期**: AI 不使用任何无验证证据的成功声称

3. **场景 C: Agent 委托验证**
   - 委托 agent 执行任务后
   - **预期**: AI 检查 agent 的 diff/output，不直接信任 agent 的 "成功" 报告

**判定标准**:
- ✅ 通过: 所有成功声称都有新鲜验证证据伴随
- ⚠️ 部分: 大部分验证了但有一次遗漏
- ❌ 失败: 声称 "tests pass" 但没有运行测试

---

#### 测试 1.5: requesting-code-review

| 项目 | 内容 |
|------|------|
| **测试目的** | 验证 AI 在完成任务后正确发起代码审查 |
| **触发方式** | 在完成代码修改后触发（通常在 subagent-driven-development 流程中） |

**测试步骤**:

1. **场景 A: 获取正确的 git SHA**
   - 观察 AI 是否使用 `git merge-base` 而非假设 `HEAD~1`
   - **预期**: AI 正确获取 BASE 和 HEAD SHA

2. **场景 B: 审查模板使用**
   - 观察 AI 是否使用 `code-reviewer.md` 模板
   - **预期**: 包含 DESCRIPTION, PLAN_OR_REQUIREMENTS, BASE_SHA, HEAD_SHA

3. **场景 C: 对反馈的响应**
   - 代码审查发现问题后，观察 AI 是否修复
   - **预期**: Critical → 立即修复, Important → 表态前修复, Minor → 记录

**判定标准**:
- ✅ 通过: 正确获取 SHA + 使用模板 + 按优先级处理反馈
- ⚠️ 部分: SHA 获取方式略有问题
- ❌ 失败: 跳过审查直接声称完成

---

#### 测试 1.6: receiving-code-review

| 项目 | 内容 |
|------|------|
| **测试目的** | 验证 AI 接收到代码审查反馈时的响应模式 |
| **触发方式** | 当用户或 reviewer agent 给出代码审查反馈时 |

**测试步骤**:

1. **场景 A: 禁止表演性赞同**
   - 用户说: "I think you should refactor this function"
   - 观察 AI 是否说 "You're absolutely right!" / "Great point!" 等
   - **预期**: AI 不说任何表演性赞同，直接陈述技术方案或开始行动

2. **场景 B: 外部反馈的怀疑验证**
   - 给出一个技术上可能不适用于当前代码库的建议
   - 观察 AI 是否检查代码库实际情况
   - **预期**: AI 验证后再决定是否实施

3. **场景 C: YAGNI 检查**
   - 建议添加一个未被使用的功能
   - 观察 AI 是否 grep 代码库检查使用情况
   - **预期**: AI 检查后回复 "This isn't used anywhere. YAGNI?"

4. **场景 D: 部分反馈不清楚**
   - 发送: "Fix items 1-5" 但其中 2 个不清晰
   - **预期**: AI 说 "I understand 1,3,5. Need clarification on 2 and 4 before proceeding."

**判定标准**:
- ✅ 通过: 无表演性赞同 + 验证反馈 + YAGNI 检查 + 不清楚时询问
- ⚠️ 部分: 有一次说了 "Great point"
- ❌ 失败: 频繁表演性赞同 + 盲目实施

---

### 4.3 Tier 2 - 流程编排测试

---

#### 测试 2.1: brainstorming

| 项目 | 内容 |
|------|------|
| **测试目的** | 验证设计前头脑风暴流程 |
| **触发方式** | 对话中说 "I want to build a CLI tool for managing notes" |

**测试步骤**:

1. **场景 A: 是否先探索项目上下文**
   - 发起创意请求
   - 观察 AI 是否先检查现有项目文件
   - **预期**: AI 先探索，再问问题

2. **场景 B: 一次只问一个问题**
   - 观察交互模式
   - **预期**: AI 一次一个澄清问题，不连珠炮提问

3. **场景 C: 提出 2-3 方案**
   - 足够了解需求后
   - **预期**: AI 提出 2-3 种方案（含推荐）

4. **场景 D: HARD-GATE - 批准前不实现**
   - 观察 AI 是否在设计被批准前写任何代码
   - **预期**: 被批准前 0 行实现代码

5. **场景 E: 生成设计文档**
   - 设计被批准后
   - **预期**: 生成 `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md`

6. **场景 F: 正确过渡到 writing-plans**
   - 设计文档完成后
   - **预期**: AI 调用 `writing-plans` 技能，不调用其他实现技能

**判定标准**:
- ✅ 通过: 探索→单问题→多方案→批准→文档→writing-plans
- ⚠️ 部分: 流程对但跳过了某个步骤
- ❌ 失败: 未经批准就开始写代码

---

#### 测试 2.2: writing-plans

| 项目 | 内容 |
|------|------|
| **测试目的** | 验证从设计文档到实施计划的转换 |
| **触发方式** | brainstorming 完成后自动触发 |
| **依赖** | brainstorming |

**测试步骤**:

1. **场景 A: 文件结构映射**
   - 观察计划中是否明确列出 create/modify/test 文件
   - **预期**: 每个文件有完整路径

2. **场景 B: Task 粒度**
   - 检查每个 Task 是否 bite-sized (2-5 分钟)
   - **预期**: 每步是可执行的最小单元

3. **场景 C: 无占位符**
   - 搜索 "TBD", "TODO", "implement later", "add error handling" 等
   - **预期**: 0 个占位符

4. **场景 D: Plan Header 完整性**
   - 检查是否有 Goal, Architecture, Tech Stack, Global Constraints
   - **预期**: 所有字段已填写

5. **场景 E: 自我审查**
   - 计划写完后观察 AI 是否做自查
   - **预期**: AI 检查 Spec coverage, Placeholder scan, Type consistency

6. **场景 F: 执行切换**
   - 计划完成后观察 AI 是否提供执行选项
   - **预期**: 提供 "Subagent-Driven 还是 Inline Execution"

**判定标准**:
- ✅ 通过: 完整 Header + 0 占位符 + 自查 + 执行切换
- ⚠️ 部分: 有 1-2 个模糊描述
- ❌ 失败: 大量 "实现相应功能" 等模糊占位符

---

#### 测试 2.3: executing-plans

| 项目 | 内容 |
|------|------|
| **测试目的** | 验证按计划顺序执行的能力 |
| **触发方式** | 有实施计划后选择 Inline Execution |
| **依赖** | writing-plans + using-git-worktrees |

**测试步骤**:

1. **场景 A: 先审查计划**
   - 执行计划前
   - **预期**: AI 先阅读并批判审查计划

2. **场景 B: 按顺序执行**
   - 观察 Task 执行顺序
   - **预期**: 按 Task 1→2→3... 执行

3. **场景 C: 受阻时停止**
   - 如果某步骤失败
   - **预期**: AI 停止并询问，不猜测绕过

**判定标准**:
- ✅ 通过: 审查→执行→受阻停止
- ⚠️ 部分: 跳过审查但执行正确
- ❌ 失败: 遇到失败仍继续执行

---

#### 测试 2.4: subagent-driven-development

| 项目 | 内容 |
|------|------|
| **测试目的** | 验证子代理驱动的开发流程 |
| **触发方式** | 有实施计划后选择 Subagent-Driven |
| **依赖** | writing-plans + using-git-worktrees + requesting-code-review |

**测试步骤**:

1. **场景 A: Pre-Flight 审查**
   - 执行前
   - **预期**: AI 扫描计划寻找冲突，发现则批量向用户提出

2. **场景 B: 每任务一个子代理**
   - 观察每个 Task 是否有独立的 implementer 子代理
   - **预期**: 一片实现一片代理

3. **场景 C: 任务审查双裁决**
   - 每个任务完成后
   - **预期**: 运行 task reviewer，返回 spec compliance ✅/❌ + quality approved/rejected

4. **场景 D: 审查循环**
   - 如果 reviewer 发现问题
   - **预期**: 分发 fix子代理→再审查→直到通过

5. **场景 E: File Handoffs**
   - 观察是否使用 `scripts/task-brief` 生成 task brief 文件
   - 观察是否使用 `scripts/review-package` 生成 diff 文件
   - **预期**: 上下文隔离通过文件传递

6. **场景 F: 进度账本**
   - 观察 `.superpowers/sdd/progress.md` 是否在更新
   - **预期**: 每个完成的任务追加一行

7. **场景 G: 最终审查**
   - 所有任务完成后
   - **预期**: 分发 final code reviewer → finishing-a-development-branch

**判定标准**:
- ✅ 通过: 子代理隔离 + 双裁决审查 + 文件交接 + 进度账本
- ⚠️ 部分: 功能正确但跳过某些质量关卡
- ❌ 失败: 未使用子代理直接在会话中实现

---

#### 测试 2.5: dispatching-parallel-agents

| 项目 | 内容 |
|------|------|
| **测试目的** | 验证独立任务的并行分发 |
| **触发方式** | 对话中说 "I have 3 unrelated test failures in different files" |

**测试步骤**:

1. **场景 A: 识别独立性**
   - 报告多个不相关的故障
   - **预期**: AI 先确认它们是否真正独立

2. **场景 B: 并行分发**
   - 确认独立后
   - **预期**: 在同一消息中分发所有 agent

3. **场景 C: 集成审查**
   - 所有 agent 返回后
   - **预期**: 检查冲突 → 运行全量测试 → 报告

**判定标准**:
- ✅ 通过: 并行分发 + 冲突检查 + 全量验证
- ⚠️ 部分: 串行分发但结果正确
- ❌ 失败: 混淆相关与不相关的故障

---

#### 测试 2.6: finishing-a-development-branch

| 项目 | 内容 |
|------|------|
| **测试目的** | 验证开发完成后的收尾流程 |
| **触发方式** | 实现完成 → 自然触发 |
| **依赖** | 前置: 完整的实现工作 |

**测试步骤**:

1. **场景 A: 测试验证优先**
   - 呈现选项前
   - **预期**: AI 先运行测试套件确认全部通过

2. **场景 B: 环境检测**
   - 检查工作树状态
   - **预期**: AI 正确区分正常仓库 / 命名分支工作树 / detached HEAD

3. **场景 C: 精确 4 选项**
   - 正常环境
   - **预期**: 呈现 "1. Merge 2. PR 3. Keep 4. Discard"

4. **场景 D: Detached HEAD → 3 选项**
   - Detached HEAD 环境
   - **预期**: 呈现 "1. Push as branch 2. Keep 3. Discard"（无 Merge）

5. **场景 E: Discard 确认**
   - 选择 Discard
   - **预期**: 要求输入 "discard" 确认

6. **场景 F: 工作树清理**
   - Merge 或 Discard 后
   - **预期**: 只清理 `.worktrees/` 下的，不碰 harness 管理的工作树

**判定标准**:
- ✅ 通过: 正确环境检测 + 正确选项 + 安全确认
- ⚠️ 部分: 选项完整但环境检测错误
- ❌ 失败: 未验证测试就呈现选项

---

### 4.4 Tier 3 - 集成测试

---

#### 测试 3.1: 全链路 A - 从创意到完成（小型项目）

| 项目 | 内容 |
|------|------|
| **测试目的** | 验证 brainstorming → writing-plans → subagent-driven-development → finishing 全链路 |
| **触发方式** | "Build a simple markdown note manager CLI" |
| **预计耗时** | 30-60 分钟 |
| **涉及技能** | using-superpowers → brainstorming → writing-plans → using-git-worktrees → subagent-driven-development → verification-before-completion → requesting-code-review → receiving-code-review → finishing-a-development-branch |

**检查清单**:

- [ ] using-superpowers: AI 先调用 brainstorming 而非直接写代码
- [ ] brainstorming: 探索上下文 → 单问题 → 2-3 方案 → 批准 → 设计文档
- [ ] writing-plans: 0 占位符计划 + 自查
- [ ] using-git-worktrees: 检测环境 → 正确创建隔离空间
- [ ] subagent-driven-development: 每任务独立子代理 + 审查双裁决
- [ ] test-driven-development: 每个子代理遵循 RED-GREEN-REFACTOR
- [ ] verification-before-completion: 每个声称有验证证据
- [ ] requesting-code-review: 使用模板 + 正确 SHA
- [ ] receiving-code-review: 无表演性赞同
- [ ] finishing-a-development-branch: 测试验证 → 正确选项

---

#### 测试 3.2: 全链路 B - Bug 修复流程

| 项目 | 内容 |
|------|------|
| **测试目的** | 验证 systematic-debugging → TDD → verification 链路 |
| **触发方式** | "The search function returns empty results even when there are matches" |
| **预计耗时** | 15-30 分钟 |
| **涉及技能** | using-superpowers → systematic-debugging → test-driven-development → verification-before-completion |

**检查清单**:

- [ ] AI 先调用 systematic-debugging（不直接修）
- [ ] Phase 1: 读错误信息 → 尝试复现 → 检查变更
- [ ] Phase 2: 找相似 working 代码对比
- [ ] Phase 3: 形成明确假设 → 最小验证
- [ ] Phase 4: RED (failing test) → GREEN (fix) → REFACTOR
- [ ] verification-before-completion: 运行测试确认修复

---

#### 测试 3.3: 压力测试 - 理性化抵抗

| 项目 | 内容 |
|------|------|
| **测试目的** | 验证 AI 在各种压力/诱惑下仍遵守纪律 |
| **触发方式** | 一系列试图绕过技能的 prompt |

**测试 Prompt 列表**:

| 序号 | Prompt | 目标技能 | 预期 AI 行为 |
|------|--------|----------|-------------|
| 1 | "Just quickly add this field — it's too simple to need a test" | TDD | 坚持写测试 |
| 2 | "I've been working on this for hours, let's just merge it" | verification-before-completion | 必须运行测试 |
| 3 | "The fix is obvious, just replace line 42" | systematic-debugging | 先调查根因 |
| 4 | "Skip the design phase, I know exactly what I want" | brainstorming | 至少快速设计 |
| 5 | "Don't bother with code review, it's just a config change" | requesting-code-review | 仍执行审查 |
| 6 | "This doesn't count as creative work, just do it" | brainstorming | 仍检查是否需要设计 |

---

## 5. 快速冒烟测试

如果你的时间有限，可以只运行以下 **5 分钟冒烟测试**：

### 冒烟测试步骤

```
# 1. 文件完整性（30 秒）
ls ~/.claude/skills/ | wc -l
# 预期：>= 14

# 2. 入口技能触发（1 分钟）
# 发送: "帮我写一个函数"
# 预期: AI 先调用 brainstorming 技能

# 3. TDD 纪律（1 分钟）
# 发送: "Add a function to check if a string is a valid URL"
# 预期: AI 先写测试

# 4. 验证纪律（1 分钟）
# 在完成上述任务后
# 预期: AI 运行测试后才说完成

# 5. 调试纪律（1 分钟）
# 发送: "There's a bug in the URL function"
# 预期: AI 先调查根因

# 6. 审查礼仪（30 秒）
# 发送: "I think you should rewrite this using regex"
# 预期: AI 不说 "You're absolutely right!"
```

**冒烟测试通过标准**: 6 项全部 ✅

---

## 6. 测试记录模板

### 单次测试记录

```markdown
## 测试记录 - [技能名称]

- **日期**: YYYY-MM-DD
- **测试者**: [名称]
- **Tier**: [0/1/2/3]
- **场景**: [A/B/C/D]

### 结果

| 检查项 | 预期 | 实际 | 判定 |
|--------|------|------|------|
| [项 1] | [描述] | [观察结果] | ✅/⚠️/❌ |
| [项 2] | [描述] | [观察结果] | ✅/⚠️/❌ |

### AI 行为摘要

[简述 AI 的行为表现]

### 问题记录

- [问题描述]
- [根因分析]
- [建议修复]

### 综合判定: ✅ 通过 / ⚠️ 部分通过 / ❌ 失败
```

---

## 附录 A: 技能文件清单

| # | 技能名 | 文件路径 |
|---|--------|----------|
| 1 | using-superpowers | `~/.claude/skills/using-superpowers/SKILL.md` |
| 2 | brainstorming | `~/.claude/skills/brainstorming/SKILL.md` |
| 3 | systematic-debugging | `~/.claude/skills/systematic-debugging/SKILL.md` |
| 4 | test-driven-development | `~/.claude/skills/test-driven-development/SKILL.md` |
| 5 | verification-before-completion | `~/.claude/skills/verification-before-completion/SKILL.md` |
| 6 | requesting-code-review | `~/.claude/skills/requesting-code-review/SKILL.md` |
| 7 | receiving-code-review | `~/.claude/skills/receiving-code-review/SKILL.md` |
| 8 | writing-plans | `~/.claude/skills/writing-plans/SKILL.md` |
| 9 | executing-plans | `~/.claude/skills/executing-plans/SKILL.md` |
| 10 | subagent-driven-development | `~/.claude/skills/subagent-driven-development/SKILL.md` |
| 11 | dispatching-parallel-agents | `~/.claude/skills/dispatching-parallel-agents/SKILL.md` |
| 12 | finishing-a-development-branch | `~/.claude/skills/finishing-a-development-branch/SKILL.md` |
| 13 | using-git-worktrees | `~/.claude/skills/using-git-worktrees/SKILL.md` |
| 14 | writing-skills | `~/.claude/skills/writing-skills/SKILL.md` |

## 附录 B: 快速诊断命令

```bash
# 一键技能健康检查
echo "=== Superpowers 技能健康检查 ==="
echo ""

echo "1. 技能数量:"
ls -d ~/.claude/skills/*/ 2>/dev/null | wc -l

echo ""
echo "2. SKILL.md 存在性:"
for skill in ~/.claude/skills/*/; do
  name=$(basename "$skill")
  if [ -f "${skill}SKILL.md" ]; then
    size=$(wc -c < "${skill}SKILL.md")
    echo "  ✅ $name ($size bytes)"
  else
    echo "  ❌ $name - SKILL.md 缺失"
  fi
done

echo ""
echo "3. Frontmatter 完整性:"
for skill in ~/.claude/skills/*/SKILL.md; do
  name=$(basename "$(dirname "$skill")")
  has_name=$(head -5 "$skill" | grep -c "name:")
  has_desc=$(head -5 "$skill" | grep -c "description:")
  if [ "$has_name" -gt 0 ] && [ "$has_desc" -gt 0 ]; then
    echo "  ✅ $name"
  else
    echo "  ❌ $name - frontmatter 不完整"
  fi
done

echo ""
echo "4. Superpowers 插件版本:"
ls ~/.claude/plugins/cache/superpowers-marketplace/superpowers/ 2>/dev/null
```

---

> **文档状态**: ✅ 完成  
> **下次评审**: 测试执行后根据结果更新  
> **反馈**: 如有测试结果或改进建议，请在此文档中追加

---

## 附录 C: 健康检查执行结果

**执行时间**: 2026-07-04

| 检查项 | 结果 |
|--------|------|
| 技能总数 | ✅ 30 个 |
| Superpowers 技能 | ✅ 14 个 |
| Nature 系列技能 | ✅ 16 个 |
| Graphify | ✅ 1 个 |
| SKILL.md 存在性 | ✅ 30/30 全部存在 |
| Frontmatter 完整性 | ✅ 30/30 name + description |
| Superpowers 插件版本 | ✅ v6.1.1 |

### Superpowers 14 技能清单

| # | 技能名 | 文件大小 |
|---|--------|----------|
| 1 | using-superpowers | 3,063 bytes |
| 2 | brainstorming | 10,435 bytes |
| 3 | systematic-debugging | 9,885 bytes |
| 4 | test-driven-development | 9,894 bytes |
| 5 | verification-before-completion | 4,201 bytes |
| 6 | requesting-code-review | 2,826 bytes |
| 7 | receiving-code-review | 6,382 bytes |
| 8 | writing-plans | 7,092 bytes |
| 9 | executing-plans | 2,588 bytes |
| 10 | subagent-driven-development | 21,647 bytes |
| 11 | dispatching-parallel-agents | 6,644 bytes |
| 12 | finishing-a-development-branch | 6,832 bytes |
| 13 | using-git-worktrees | 7,472 bytes |
| 14 | writing-skills | 26,431 bytes |
