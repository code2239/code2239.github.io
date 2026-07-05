---
title: "⚡ Superpowers 深度调研报告"
date: "2026-07-05"
tags: ["AI","调研","Superpowers","自动化","工具"]
summary: "- **作者全称**：**Jesse Vincent**（GitHub 账号 **@obra**）"
---

# ⚡ Superpowers 深度调研报告

> **调研日期**：2026-07-05  
> **项目地址**：[https://github.com/obra/superpowers](https://github.com/obra/superpowers)

---

## 1. 开发者与公司背景

**开发方信息**：
- **作者全称**：**Jesse Vincent**（GitHub 账号 **@obra**）
- **所属公司**：**Prime Radiant**（2025 年创立，位于美国加州伯克利）
- **国籍**：🇺🇸 美国

**创始人简历**：
Jesse Vincent 是一位拥有 25+ 年经验的开源软件老兵：

| 时期 | 成就 |
|---|---|
| **1994 年** | 在 Wesleyan 大学创建 **Request Tracker (RT)**，全球最广泛使用的开源工单系统 |
| **2001 年** | 创立 **Best Practical Solutions** 公司，为 RT 提供商业支持 |
| **2005–2008 年** | 担任 **Perl 5 项目负责人（Pumpking）**，发布 Perl 5.12 和 5.14，将 Perl 从无规律发布改为固定周期发布 |
| **2010 年代** | 创建 **K-9 Mail** Android 客户端（后被 Mozilla 收购，成为 Thunderbird for Android 的前身） |
| **2010 年代** | 联合创办 **Keyboardio**，设计制造高端人体工学机械键盘 |
| **2021 年** | 联合创办 **VaccinateCA**，帮助美国人寻找疫苗 |
| **2025 年** | 创办 **Prime Radiant**，聚焦 AI Agent 工具链；**2025 年 10 月 9 日**发布 Superpowers |

**团队规模**：目前为个人项目，由 Jesse Vincent 主导开发，社区贡献者持续参与。

**盈利情况**：**完全免费 + 开源**，通过 GitHub Sponsors 接受赞助。无付费版本、无企业版。

**信条与理念**：
> _"AI 编码代理缺少的不是能力——而是纪律。"_

核心理念：**Process over Prompt（流程优于提示词）**。通过编码化的工程方法论让 AI 遵循有纪律的开发流程，而不是靠更聪明的提示词。

**信息源**：
- [GitHub: obra/superpowers](https://github.com/obra/superpowers)
- [Superpowers Skills Framework | Ry Walker Research](https://rywalker.com/research/superpowers-skills-framework)
- [腾讯云：Superpowers 深度解析](https://cloud.tencent.com.cn/developer/article/2671288)
- [Towards AI 评测](https://pub.towardsai.net/i-tested-jesse-vincents-175k-star-plugin-plain-markdown-makes-sonnet-4-6-cheat-past-opus-4-7-04687feac7c0)

---

## 2. 底层技术栈

该软件**非 AI 原生**，不涉及基础大模型。

| 层级 | 技术 |
|---|---|
| **核心技术** | **纯 Markdown 指令集**（14+ 个 SKILL.md 文件）|
| **注入机制** | 通过 Claude Code Hooks / Plugin 系统在会话启动时注入 ~2000 token 的引导指令 |
| **运行环境** | Claude Code（首选）/ Cursor / Codex CLI / OpenCode / Gemini CLI / GitHub Copilot CLI / Kimi Code / Pi / Antigravity 等 8+ 平台 |
| **实现语言** | Markdown（SKILL.md）+ 少量 JSON（配置文件）|
| **存储** | 无服务器 / 无数据库 —— 纯文件系统 |

**架构说明**：Superpowers 不是一个独立的应用程序或库，而是一套**方法论即代码**的 Markdown 指令文件。它在 AI 编程助手的会话上下文注入工程流程，引导 AI 遵循结构化的开发步骤（头脑风暴 → 规划 → 执行 → 测试 → 审查）。

**信息源**：
- [Superpowers v6.0.0 Release](https://newreleases.io/project/github/obra/superpowers/release/v6.0.0)
- [Superpowers 深度分析](http://mp.weixin.qq.com/s?__biz=MzA3MDg1NTg0OQ==&mid=2649301772&idx=1&sn=be889eaa18e2585fbb2c22a0b28ae694)

---

## 3. 开源属性与商业模式

### 开源属性
**MIT 协议** —— 完全开源，代码托管于 [GitHub: obra/superpowers](https://github.com/obra/superpowers)

| 项目 | 详情 |
|---|---|
| **开源协议** | **MIT License**（完全开放，商业/个人均可免费使用） |
| **源代码** | 公开且完整（核心 14+ 个 SKILL.md 文件及配置文件） |
| **是否需要账户** | 不需要 —— 无账户、无登录、无需 License Key |

### 定价模式

| 层级 | 价格 | 说明 |
|---|---|---|
| 🆓 **社区版** | **免费** | 完整功能，无任何限制 |
| 💰 **付费版** | ❌ 不存在 | 无企业版、无付费功能、无订阅 |
| 🤝 **赞助** | 可选 | 通过 GitHub Sponsors 支持作者 |

**模式本质**：**开源 + 赞助模式（Open Source + Sponsorship）**。项目 100% 免费，作者通过社区认可的品牌效应获得咨询和赞助收入。

**信息源**：
- [GitHub: obra/superpowers（查看 LICENSE）](https://github.com/obra/superpowers)
- [Dupple: Best Claude Code Skills 2026](https://dupple.com/learn/best-claude-code-skills-2026)
- [Ry Walker Research](https://rywalker.com/research/superpowers-skills-framework)

---

## 4. 功能全景解析

### 主要功能（50 字概括）
> 为 Claude Code 等 AI 编程助手注入**工程纪律**的开源技能框架，通过结构化工作流将 AI 从"代码生成器"进化为"资深工程师"。

### 核心功能与核心技术

| # | 核心功能 | 背后关键技术/方法论 |
|---|---|---|
| **1** | **7 阶段开发工作流** | 全局性的开发流程管控：**头脑风暴 → 编写计划 → Git 隔离 → 子代理开发 → TDD 强制 → 代码审查 → 分支完成**。每个阶段都有对应的 SKILL.md 文件定义 AI 的行为规范。 |
| **2** | **TDD 强制（红/绿/重构）** | 采用测试驱动开发的核心约束："**没有失败的测试，不允许写生产代码**"。三个阶段强制检查：RED（写测试）- GREEN（写代码）- REFACTOR（优化）。 |
| **3** | **子代理隔离开发（Subagent）** | 每个原子任务分配给一个**独立的 AI 会话（fresh context）** 去完成，避免长会话中的上下文退化（context decay）问题。这是 v4.0.0 引入的重大革新。 |
| **4** | **Git Worktree 隔离** | 自动创建独立的 Git Worktree 分支工作区，确保主分支代码不受实验性修改干扰。 |
| **5** | **分阶段代码审查** | 每个交付物经过两轮审查：**规范合规审查（Spec Compliance）→ 代码质量审查（Code Quality）**。v6.0.0 优化为单审查人以降低 token 消耗。 |

### 14 个核心技能（Skills）

| 类别 | 技能 |
|---|---|
| **初始化与规划** | `brainstorming`（头脑风暴）、`writing-plans`（编写计划）、`executing-plans`（执行计划） |
| **开发** | `subagent-driven-development`（子代理开发）、`test-driven-development`（TDD） |
| **代码质量** | `code-review`（代码审查）、`requesting-code-review`（请求审查）、`receiving-code-review`（接收审查） |
| **工程流程** | `using-git-worktrees`（Git 隔离）、`verification-before-completion`（完成前验证） |
| **辅助** | `using-superpowers`（使用引导）、`writing-skills`（编写自定义技能） |

### 实战案例：chardet 重写

Superpowers 的典型效能展示是 **chardet 编码检测库的完全重写（v7.0.0）**：

- **性能提升 41 倍**
- 准确率从 **94.5% → 96.8%**
- 创建 **2,161 个测试文件**
- 覆盖 **99 种编码格式**

这个案例被广泛引用，证明结构化工作流对 AI 代码质量的显著提升。

**信息源**：
- [Superpowers v6.0.0 Release Notes](https://newreleases.io/project/github/obra/superpowers/release/v6.0.0)
- [204K Star 的 Superpowers 框架保姆级教程](https://cloud.tencent.com.cn/developer/article/2676405)
- [Superpowers 让 AI 从"游侠"变成"将军"](https://cloud.tencent.com.cn/developer/article/2650750)

---

## 5. 主要竞品清单

| 竞品 | 开发商 | 定位 | 对比本产品优势 | 对比本产品劣势 |
|---|---|---|---|---|
| **GSD (Get Shit Done)** | gsd-build 社区 | 有状态的工作流编排系统，支持长任务持久化、崩溃恢复 | 支持状态持久化、并行任务、崩溃恢复 | 社区规模小（51K stars）、无 TDD 强制、认知复杂度高 |
| **mattpocock/skills** | Matt Pocock（个人） | TypeScript 类型安全技能库，手动触发 | TypeScript 原生类型安全、无侵入、按需调用 | 无自动化工作流、无子代理隔离、无 Git worktree 管理 |
| **anthropics/skills** | Anthropic（官方） | Claude 官方参考技能集，含演示和文档技能 | 官方维护、稳定可靠、与 Claude 版本最贴合 | 功能较基础、无工程方法论强制、无 TDD |
| **gstack** | gstack 社区 | 多视角决策评审框架（23 个角色） | 多角色评审视角丰富、适合架构决策 | 不提供完整开发工作流、侧重评审而非全过程 |

**信息源**：
- [Superpowers 和 GSD：两套方案对比](https://cloud.tencent.com.cn/developer/article/2689449)
- [GitHub 上 1400+ Claude Code Skills 真正在用的就这几个](https://cloud.tencent.cn/developer/article/2671303)

---

## 6. 与竞品的横向比较

| 对比维度 | **Superpowers** | **GSD (Get Shit Done)** | **mattpocock/skills** | **anthropics/skills** |
|---|---|---|---|---|
| **价格** | 🆓 完全免费（MIT） | 🆓 免费（MIT） | 🆓 免费（MIT） | 🆓 免费（MIT） |
| **工程质量** | ⭐⭐⭐⭐⭐ TDD 强制 + 双轮审查 | ⭐⭐⭐ 强在编排，非工程纪律 | ⭐⭐⭐ TypeScript 安全 | ⭐⭐ 基础示范性技能 |
| **易用性与上手门槛** | ⭐⭐⭐ 全流程较重，简单任务过重 | ⭐⭐ 概念复杂，学习曲线陡峭 | ⭐⭐⭐⭐⭐ 轻量按需调用 | ⭐⭐⭐⭐ 简单易懂 |
| **生态影响力** | ⭐⭐⭐⭐⭐ 200K+ stars，68K+ 安装 | ⭐⭐⭐ 51K stars | ⭐⭐⭐ 97K stars | ⭐⭐⭐⭐ 138K stars |

**各竞品最适用场景**：
- **Superpowers**：复杂多文件功能开发、需要长期维护的生产代码、对测试覆盖有刚性要求的项目
- **GSD**：长时间运行的 AI 编码会话、需要状态持久化和崩溃恢复的复杂场景
- **mattpocock/skills**：TypeScript 项目中的轻量级按需技能调用，不想引入繁重工作流的团队
- **anthropics/skills**：学习如何编写 Claude Code 技能的参考模板、文档处理等官方基础技能

---

## 7. 版本迭代信息

| 项目 | 详情 |
|---|---|
| **首次公开发布** | **2025 年 10 月 9 日**（与 Anthropic Claude Code Plugin 系统同日上线） |
| **当前最新版本**（截至 2026-07-05） | **v6.0.0+**（2026 年 6 月发布） |
| **更新频率** | **周更** —— 社区 PR 活跃，作者持续高频迭代 |

### 主要版本里程碑

| 版本 | 日期 | 重点内容 |
|---|---|---|
| v1.0.0 | 2025-10-09 | 初始发布，7 个核心技能 |
| v4.0.0 | 2025-12 | **子代理驱动开发**（Subagent-Driven Development）引入 |
| v5.0.0 | 2026-04 | 平台扩展，支持 Cursor、Codex 等 |
| v5.1.0 | 2026-05-04 | 稳定性改进 |
| v6.0.0 | 2026-06 | **重大重构**：单审查人模式（降低~50% token消耗）、计划预检、各平台兼容性重写 |

### GitHub 统计（截至 2026-07-05）

| 指标 | 数值 |
|---|---|
| **Stars** | ~200K–230K+ |
| **Forks** | ~19K–20K |
| **Marketplace 安装量** | 68K+（官方市场）/ 300K+（总估计） |
| **核心技能数** | 14+ |

**信息源**：
- [GitHub Releases: obra/superpowers](https://github.com/obra/superpowers/releases)
- [newreleases.io: superpowers v6.0.0](https://newreleases.io/project/github/obra/superpowers/release/v6.0.0)

---

## 一句话锐评

> **Claude Code 生态中影响力最大的开源技能框架——用 2000 token 的 Markdown 指令把 AI 编程从"快"变成"可靠"，适合生产级代码和 TDD 必选项，但简单脚本慎用以免被流程压垮。** 如果"快"比"稳"重要，请跳过。

---

## 参考来源

1. [GitHub: obra/superpowers](https://github.com/obra/superpowers)
2. [腾讯云：Superpowers 深度解析](https://cloud.tencent.com.cn/developer/article/2671288)
3. [腾讯云：204K Star 保姆级教程](https://cloud.tencent.com.cn/developer/article/2676405)
4. [腾讯云：Superpowers 和 GSD 对比](https://cloud.tencent.com.cn/developer/article/2689449)
5. [腾讯云：1400+ Skills 真正在用的就这几个](https://cloud.tencent.cn/developer/article/2671303)
6. [知乎：Superpowers 全面技术教程](https://zhuanlan.zhihu.com/p/2030628504719639855)
7. [知乎：给 Claude Code 装上方法论](https://zhuanlan.zhihu.com/p/2032415548605194334)
8. [Ry Walker Research](https://rywalker.com/research/superpowers-skills-framework)
9. [Towards AI 评测](https://pub.towardsai.net/i-tested-jesse-vincents-175k-star-plugin-plain-markdown-makes-sonnet-4-6-cheat-past-opus-4-7-04687feac7c0)
10. [Dupple: Best Claude Code Skills 2026](https://dupple.com/learn/best-claude-code-skills-2026)
11. [newreleases.io: Superpowers v6.0.0](https://newreleases.io/project/github/obra/superpowers/release/v6.0.0)
