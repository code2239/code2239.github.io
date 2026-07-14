---
title: "OpenScience调研报告"
date: "2026-07-13"
summary: "调研范围：OpenScience 及其关联项目 Open Science Desktop 的完整调研"
tags: ["AI4S", "open-source", "research-platform", "AI-workbench"]
category: "research"
---

# OpenScience（Open Science Desktop）调研报告

> **调研范围**：OpenScience 及其关联项目 Open Science Desktop 的完整调研
> **调研日期**：2026 年 7 月 13 日
> **方法**：基于 WebSearch 的深度研究工作流

---

## 1. 开发者与公司背景

### 开发方全称

OpenScience 由 **Synthetic Sciences Inc.** 开发并维护。该公司有两个关联项目：

| 项目 | GitHub 组织 | 定位 | 开源协议 |
| :--- | :--- | :--- | :--- |
| **OpenScience** | [synthetic-sciences/openscience](https://github.com/synthetic-sciences/openscience) | AI 科研工作台（商业 + 开源） | Apache 2.0 |
| **Open Science Desktop** | [ai4s-research/open-science](https://github.com/ai4s-research/open-science) | 纯社区驱动的桌面科研工作台 | MIT |

两个项目高度同源，均定位为"Claude Science 的开源平替"，本文以 **OpenScience** 为主进行调研。

- **所属国家/地区**：美国加利福尼亚州旧金山（San Francisco, CA）
- **公司注册时间**：2025 年

### 创始人基本信息

| 创始人 | 年龄 | 背景 | 亮点 |
| :--- | :---: | :--- | :--- |
| **Aayam Bansal** | 18 岁 | 曾发明并专利化 AI 骨科袜子并成功出售；搭建 COVID-19 基础设施服务 5 万+日活用户 | 印度德里公学 Ruby Park 校友 |
| **Ishaan Gangwani** | — | 印度 IOAI 国家队选拔 Top 排名，USACO 铂金级；竞技编程背景 | 在 NUS、CMU、MIT CSAIL 参与 ML 研究 |

两人在 NUS、CMU 和 MIT CSAIL 做 ML 研究期间相识，共同在 **NeurIPS、ICML、AAAI** 等顶会 workshop 发表过论文。

### 团队规模

- 核心团队：**2 位创始人**
- YC 创业阶段，暂未大规模招聘
- GitHub 上有开源社区贡献者

### 融资与盈利情况

| 轮次 | 金额 | 来源 |
| :--- | :---: | :--- |
| Pre-YC 融资 | **$140 万** | 天使投资 |
| YC W26 标准投资 | **$50 万** | Y Combinator |
| **总计** | **$190 万** | |

目前处于早期创业阶段，产品免费（BYOK 模式），通过 **Atlas** 托管平台探索商业化。

### 发展规划

- **短期**：完善 250+ 科研技能包，稳定 v0.1 核心功能
- **中期**：增加 HPC/Slurm 计算支持、R 语言内核、Windows 安装程序
- **长期**：构建开放的科研 AI 生态——"没有一个公司应该垄断人类用于探索和发现的工具"

### 官网/链接

- GitHub 仓库：[github.com/synthetic-sciences/openscience](https://github.com/synthetic-sciences/openscience)
- 社区版（MIT）：[github.com/ai4s-research/open-science](https://github.com/ai4s-research/open-science)
- YC 页面：[ycombinator.com/companies/synthetic-sciences](https://www.ycombinator.com/companies/synthetic-sciences)
- 官方网站：[openscience.sh](https://www.openscience.sh/)

> **信息源**：
> - [YC Launch: Synthetic Sciences](https://www.ycombinator.com/launches/PY9-synthetic-sciences-ai-co-scientists-for-end-to-end-scientific-research)
> - [美国湾区时报 - YC W26 Demo Day](https://americanbazaaronline.com/2026/03/31/yc-w26-demo-day-highlights-rising-influence-of-ia-entrepreneurs-477926/)
> - [StartupHub.ai - Claude's Corner: Synthetic Sciences](https://www.startuphub.ai/ai-news/claudes-corner/2026/claudes-corner-synthetic-sciences-yc-w2026)
> - [Tracxn - Synthetic Sciences 公司档案](https://tracxn.com/d/companies/synthetic-sciences/___f7WC7QV9OrzfL-bXazCwLZzWz8Ibpuk7gmUD0XfeZk)
> - [Extruct.ai - Synthetic Sciences 融资分析](https://www.extruct.ai/hub/syntheticsciences-ai/)

---

## 2. 底层技术栈

### 核心技术定位

OpenScience 是 **AI4S（AI for Science）科研工作台**，而非 AI 原生软件。其核心是一个**模型无关的 AI 代理编排引擎**，不涉及也不依赖单一基础大模型。

### 技术架构

```
┌─────────────────────────────────────────────────────┐
│                   Tauri 2 Desktop Shell               │
│         (React + TypeScript + Vite frontend)          │
├─────────────────────────────────────────────────────┤
│                  OpenCode Agent Runtime                │
│    (单二进制 sidecar，管理模型调用、技能执行、MCP)       │
├────────────┬────────────┬──────────────┬─────────────┤
│ Agent Skill│ Agent Skill│ Agent Skill  │ External    │
│  Core      │  Core      │  Core        │ MCP Server  │
│ (Plan→Exec)│ (Research) │ (Write)      │ (自定义)    │
├────────────┴────────────┴──────────────┴─────────────┤
│              Model Provider Layer                     │
│  OpenRouter │ OpenAI │ Anthropic │ Ollama │ 150+ APIs │
└─────────────────────────────────────────────────────┘
```

### 核心技术组件

| 组件 | 技术 | 说明 |
| :--- | :--- | :--- |
| **桌面壳层** | **Tauri 2** + React + TypeScript + Vite | 跨平台（macOS/Windows/Linux），比 Electron 更轻量 |
| **AI Agent 运行时** | **OpenCode**（单二进制 sidecar） | 管理所有模型调用、技能执行、MCP 通信；UI 从不直接对接模型 |
| **技能包系统** | TypeScript agent skills | 7 个内置核心技能 + 250+ 扩展技能包 |
| **模型连接层** | OpenRouter / 自定义 API | **模型无关**：支持 ~150 家模型提供商 |
| **MCP（模型上下文协议）** | MCP 标准协议 | 可接入自定义数据源、数据库、计算资源 |
| **可追溯性系统** | `provenance.jsonl` | 每次写入追加版本，全链路可追溯 |
| **SDK 层** | `OpenCodeClient` | 隔离 UI 与运行时，技能/MCP/模型提供商可插拔 |

### 支持的大模型

OpenScience 支持**自由切换**以下所有模型（甚至同一会话中混合使用）：

| 类别 | 支持范围 |
| :--- | :--- |
| ☁️ **云端商业模型** | Claude (Opus/Sonnet/Haiku)、GPT-4o/4.1、DeepSeek-V3/R1、GLM-4、Gemini 2.5、Gemma、Mistral、Llama 3 | 
| 🏠 **本地模型** | **Ollama**（任意开源模型，完全离线运行） |
| 🔗 **聚合平台** | OpenRouter（150+ 提供商）、OpenAI 兼容接口、Anthropic 接口 |
| 🆓 **内置免费模型** | 零配置即用（有限额度） |

> **与传统 AI4S 工具的关键差异**：OpenScience **不绑定**任何一个模型。你可以用 Claude 做文献规划，用 DeepSeek 写代码，用本地 Ollama 处理隐私数据——在同一工作流内自由切换。

### 参考文献

- [Tauri 2 框架](https://v2.tauri.app/)
- [MCP 协议（Model Context Protocol）](https://modelcontextprotocol.io/)
- [OpenRouter 模型聚合](https://openrouter.ai/)
- [Ollama 本地模型](https://ollama.ai/)

> **信息源**：
> - [GitHub: synthetic-sciences/openscience](https://github.com/synthetic-sciences/openscience)
> - [极客公园 - Open Science Desktop 登顶 AI4S 评测榜首](https://www.geekpark.net/news/367207)
> - [泡泡网报道](https://www.pcpop.com/article/6940144.shtml)

---

## 3. 开源属性与商业模式

### 开源属性

| 属性 | 说明 |
| :--- | :--- |
| **开源状态** | ✅ **完全开源**（核心开源） |
| **开源协议** | **Apache 2.0**（synthetic-sciences/openscience）/ **MIT**（ai4s-research/open-science） |
| **代码可审计** | ✅ 全部源代码公开，可审计、可 Fork、可扩展 |
| **社区贡献** | ✅ 开放 PR 和 Issue |

### 商业模式

| 模式 | 价格 | 说明 |
| :--- | :---: | :--- |
| **自托管（BYOK）** | **完全免费** 🆓 | 自带 API Key（OpenAI/Anthropic/DeepSeek 等），或使用 Ollama 本地模型完全免费 |
| **Atlas 托管平台** | 付费（按量计费） | 托管钱包 + 多模型访问 + 持久化研究图谱 + 云端算力 |
| **商业使用** | **免费** | Apache 2.0 协议无商业限制 |

### 与竞品的价格对比

| 平台 | 免费方案 | 付费方案 |
| :--- | :--- | :--- |
| **OpenScience** | ✅ 完整功能免费（BYOK / 本地模型） | Atlas 按量计费 |
| **Claude Science** | ❌ 无免费方案 | Pro $20/月 → Max $100-200/月 → 企业定制 |
| **Codex CLI** | 有基础免费额度 | 按 token 计费 |

> **信息源**：
> - [GitHub LICENSE - Apache 2.0](https://github.com/synthetic-sciences/openscience/blob/main/LICENSE)
> - [KuCoin News - OpenScience Launch](https://www.kucoin.com/news/flash/openscience-launches-as-open-source-alternative-to-claude-science)

---

## 4. 功能全景解析

### 核心价值

> **一个开源的、模型无关的 AI 科研工作台，让研究人员用自然语言指令自动化完成文献调研→实验设计→代码执行→论文写作的全流程科研流水线。**

目标用户：学术研究人员、计算科学家、材料科学家、生物信息学家、AI4S 从业者

### 核心功能与关键技术

#### 🎯 端到端科研自动化流水线

```
用户输入科研目标
    ↓
[1] Plan（AI 制定研究计划）→ 用户审批
    ↓
[2] Execute（AI 自主执行：检索文献→写代码→跑实验→分析数据）
    ↓
[3] Artifacts（生成图表、表格、中间结果）
    ↓
[4] Review（自动审核：查证引用、验证计算、检查逻辑）
    ↓
输出：可复现的完整科研记录
```

**关键技术**：**多 Agent 协作架构**——主 Agent 负责任务分解 + 多个 Specialist Agent 负责子任务 + Reviewer Agent 负责事实核查。全部通过 OpenCode 运行时编排。

#### 📚 7 个内置 Agent Skill 模块

| 技能模块 | 功能 | 输出 |
| :--- | :--- | :--- |
| **research-explorer** | 主题探索、研究前沿扫描 | 研究趋势报告 |
| **literature-survey** | 自动化文献综述生成 | **6-20 页**综述，**60+** 真实学术引用 |
| **experiment-suite** | 实验设计 + 代码生成 | 可运行代码 + 出版级图表 |
| **paper-writer** | 论文自动撰写 | **8-14 页**研究论文草稿 |
| **mindmap-render** | 思维导图可视化 | 研究路线图 |
| **integrity-auditor** | 完整性审计 | 源验证报告 |
| **ai4s-agent** | AI4S 核心代理 | 跨模块协调 |

#### 🔬 250+ 科研技能包

覆盖领域包括但不限于：
- **机器学习**：DeepSpeed、PEFT、TRL、模型评估
- **生物学**：分子生物学、临床生物信息学、化学信息学
- **物理学**：计算物理、量子化学
- **化学**：计算化学、分子模拟
- **通用**：文献检索、LaTeX 排版、图表绘制、云计算

#### 🔗 科学数据连接器

直接对接 **30+ 科学数据库**：

| 类别 | 数据库 |
| :--- | :--- |
| 学术文献 | **arXiv**、**PubMed**、**Crossref**、**Semantic Scholar**、bioRxiv/medRxiv |
| 化学 | **PubChem**、**ChEMBL** |
| 生物 | **UniProt**、**PDB**、**Ensembl** |
| 临床 | **ClinicalTrials.gov** |
| 其他 | 通过 **MCP 协议**可接入任意自定义数据库 |

#### 📝 全链路可追溯性（Provenance）

每次操作（代码执行、图生成、数据查询）都追加记录到 `provenance.jsonl`：

```
原文 → 引用的论文（已解析至 Crossref/arXiv/PubMed）
图表 → 生成它的代码 + 输入数据 + 运行环境 + 模型版本
数据 → 来源数据库 + 查询时间
```

支持 **一键回滚** 到任意历史版本。

#### 🔐 隐私与安全

- **本地优先**：所有数据、代码、会话默认存储在本地
- **审批关卡**：每次命令执行、依赖安装、文件删除、网络访问都需要用户显式同意
- **Ollama 支持**：完全离线运行，零数据离开本机

### 关键技术参考文献

- [OpenCode Agent Runtime](https://github.com/synthetic-sciences/openscience/tree/main/runtime)
- [MCP 协议规范](https://modelcontextprotocol.io/)
- [Tauri 2 框架文档](https://v2.tauri.app/)
- [ResearchClawBench 基准](https://www.geekpark.net/news/367207)

> **信息源**：
> - [GitHub: synthetic-sciences/openscience - README](https://github.com/synthetic-sciences/openscience)
> - [极客公园深度报道](https://www.geekpark.net/news/367207)
> - [北京智源社区 - Claude Science 开源平替](https://hub.baai.ac.cn/view/56174)

---

## 5. 功能实现案例

### 案例 1：自动化材料科学文献综述

**场景**：一位材料科学研究者想了解"等变图神经网络在晶体结构预测中的最新进展"。

**操作**：
1. 在 OpenScience 中输入："Write a comprehensive literature review on equivariant GNNs for crystal structure prediction"
2. OpenScience 的 `literature-survey` 技能自动：搜索 **arXiv/Semantic Scholar** → 提取 **60+ 篇相关论文** → 按主题组织章节 → 生成 **15 页综述**
3. Reviewer Agent 自动核查：每篇引用是否真实存在、数据是否可追溯
4. 用户可选择导出为 Markdown / LaTeX / PDF

**输出**：带真实引用链接的完整文献综述，所有引用均通过 Crossref/arXiv/PubMed 验证。

### 案例 2：新材料性质预测实验

**场景**：研究者想预测一批新型钙钛矿材料的带隙，并生成发表级图表。

**操作**：
1. 输入 CSV 格式的晶体结构数据
2. OpenScience 的 `experiment-suite` 自动：选择合适模型 → 编写 Python 脚本 → 运行预测 → 生成带误差棒的带隙分布图
3. 所有代码、数据、结果一并记录到 `provenance.jsonl`
4. 结果可直接导入 `paper-writer` 生成论文草稿

**输出**：可复现的完整实验包（代码 + 数据 + 图表 + 参数配置）

### 案例 3：跨模型协作研究

**场景**：研究者想结合不同模型的优势完成一项研究。

**操作**：
1. 用 **Claude** 规划研究框架（强推理能力）
2. 用 **GPT-4o** 编写数据分析代码（强编码能力）
3. 用 **本地 Ollama 模型** 处理涉及未公开数据的部分

**全在同一个 OpenScience 会话中完成**，无需切换工具。

### 案例网址

- [Project OpenScience GitHub 官方示例](https://github.com/synthetic-sciences/openscience)
- [极客公园 - 登顶 AI4S 评测报道](https://www.geekpark.net/news/367207)
- [北京智源社区 - Claude Science 开源平替介绍](https://hub.baai.ac.cn/view/56174)

> **信息源**：上述案例根据 OpenScience 官方文档和媒体报道的综合描述整理。

---

## 6. 主要竞品清单

OpenScience 所处的赛道是 **"AI 驱动的科研自动化工作台"**，主要竞品如下：

| # | 竞品 | 开发商 | 定位 | 优势 | 劣势 |
| :---: | :--- | :--- | :--- | :--- | :--- |
| 1 | **Claude Science** | Anthropic | 闭源 AI 科研工作台 | Claude 深度集成、3D 分子渲染、企业级支持 | 仅支持 Claude、仅 macOS/Linux、付费 |
| 2 | **Codex CLI** | OpenAI | AI 编码 + 科研助手 | GPT-4.1 代码能力 | 非科研专用、缺乏文献综述能力 |
| 3 | **OpenAI4S** | 北大 Yuan 团队 | 开源 AI4S 平台 | 超低成本（¥9.9/月）、Code-as-Action 架构 | 技能包少于 OpenScience（24 个） |
| 4 | **K-Dense BYOK** | nikemaul | BYOK 科研平台 | 30 个模型 × 10 家服务商 | 社区较小、不够成熟 |
| 5 | **Claude Science for Win** | JWM0203 | Windows 原生 Claude Science | 60+ 数据库连接器 | 仅绑定 Claude |
| 6 | **ResearchCopilot** | — | 科研 AI 助手 | 专注文献管理 | 功能范围较窄 |
| 7 | **Elicit** | Elicit | 文献检索 + 分析 | 成熟的文献工作流 | 非端到端科研平台 |
| 8 | **NotebookLM** | Google | AI 笔记 + 研究辅助 | Gemini 集成 | 非开源、功能有限 |

> **信息源**：
> - [GitHub: PKU-YuanGroup/OpenAI4S](https://github.com/PKU-YuanGroup/OpenAI4S)
> - [GitHub: nikemaul/k-dense-byok](https://github.com/nikemaul/k-dense-byok)
> - [GitHub: JWM0203/Claude-Science-for-win](https://github.com/JWM0203/Claude-Science-for-win)
> - [Elicit 官网](https://elicit.com/)
> - [Google NotebookLM](https://notebooklm.google.com/)

---

## 7. 与竞品的横向比较（表格形式）

### 核心竞品对比

| 对比维度 | **OpenScience** 🥇 | Claude Science | Codex CLI | OpenAI4S |
| :--- | :--- | :--- | :--- | :--- |
| **价格** | **免费**（BYOK / 本地 Ollama 零成本） | Pro $20/月 → 企业定制 | 有免费额度 | **¥9.9/月**起 |
| **开源协议** | **Apache 2.0 / MIT** ✅ | ❌ 闭源 | ❌ 闭源 | ✅ 开源 |
| **模型自由度** | ⭐⭐⭐⭐⭐ 任选 Claude/GPT/DeepSeek/GLM/本地 | ⭐⭐ 仅 Claude | ⭐⭐⭐ GPT 系列 | ⭐⭐⭐⭐ Claude/GPT/Gemini/豆包 |
| **本地运行** | ✅ **完全本地优先**（Ollama 离线可用） | ❌ 需云端 | ❌ 需云端 | ✅ 支持 |
| **平台支持** | macOS / Windows / Linux | macOS / Linux 仅 | macOS / Linux 仅 | Web 端 |
| **ResearchClawBench** | **22.8 🥇 #1** | 21.5 🥈 | 18.4 🥉 | 暂无公开 |
| **科研技能包** | **250+ 个** | ~60 个 | ~20 个（编码为主） | 24 个 |
| **文献综述能力** | ✅ **6-20 页综述，60+ 引用** | ✅ 有 | ❌ 无 | ❌ 无 |
| **论文写作** | ✅ 8-14 页论文草稿 | ✅ 有 | ❌ 无 | ❌ 无 |
| **可追溯性** | ✅ `provenance.jsonl` 全链路追踪 | ✅ 图表有追踪 | ❌ 有限 | ❌ 有限 |
| **科学数据库连接** | 30+ | 60+ | 无 | 有限 |
| **安装复杂度** | ⭐⭐⭐⭐ 一行命令 | ⭐⭐⭐ 下载安装 | ⭐⭐⭐ 需配置 | ⭐⭐⭐⭐ Web 即用 |
| **企业支持** | 开发中（Atlas） | ✅ 成熟 | ❌ | ❌ |

### 各竞品最适用的细分场景

| 竞品 | 最适合场景 |
| :--- | :--- |
| **OpenScience** 🥇 | 需要模型自由、重视数据隐私、预算有限的学术研究团队 |
| **Claude Science** | 已深度嵌入 Anthropic 生态、需要 3D 分子渲染和企业级支持的商业研究 |
| **Codex CLI** | 纯代码驱动的计算实验，不需要文献综述能力的场景 |
| **OpenAI4S** | 预算极度有限（¥9.9/月）、需要快速上手 AI4S 但不需要全流程科研 |
| **K-Dense BYOK** | 需要最大模型选择面（30 种模型）、不介意社区较小 |
| **NotebookLM** | 个人文献笔记管理，不做端到端科研 |

> **信息源**：对比数据综合自 ResearchClawBench 公开排行榜、各产品 GitHub 页面、媒体报道。

---

## 8. 版本迭代信息

### OpenScience（Synthetic Sciences）

| 版本 | 发布日期 | 关键内容 |
| :--- | :--- | :--- |
| **v0.1**（初始发布） | **2026 年 7 月 3 日** | 首个公开版本，Apache 2.0 开源，7 个内置 Agent Skill |
| 目前最新 | 2026 年 7 月 13 日 | 发布 10 天，GitHub 已获 **2,195 ⭐**、311 Forks |
| 更新频率 | **日更/周更** | 早期快速迭代阶段 |

### Open Science Desktop（ai4s-research 社区版）

| 版本 | 发布日期 | 关键内容 |
| :--- | :--- | :--- |
| 初始发布 | 2026 年 7 月初 | MIT 协议，Tauri 2 桌面版 |
| 目前最新 | 2026 年 7 月 | ResearchClawBench #1（22.8 分） |

### 已知 Roadmap

| 计划内容 | 时间线 |
| :--- | :--- |
| 3D 分子/蛋白质结构渲染器 | 短期（2026 Q3） |
| R 语言内核支持 | 短期（2026 Q3） |
| Windows 安装程序 | 短期（2026 Q3） |
| 更大规模的多文件项目管理 | 中期 |
| HPC / Slurm 计算支持 | 中期 |
| Atlas 托管平台正式版 | 中期 |

> **信息源**：
> - [GitHub 仓库](https://github.com/synthetic-sciences/openscience)
> - [GitHub: ai4s-research/open-science - 技术设计文档](https://github.com/ai4s-research/open-science)
> - [极客公园 2026 年 7 月 9 日报道](https://www.geekpark.net/news/367207)

---

## 一句话锐评

> **OpenScience 是 2026 年 AI4S 领域最值得关注的开源黑马：一次开发，任意模型，全流程科研自动化。以 Apache 2.0 + ResearchClawBench #1 + 250+ 技能包的组合拳，在模型自由度和开放性上碾压 Claude Science。虽然 v0.1 还很早期，但对于重视数据主权和模型选择自由度的学术团队，这是一个不容忽视的选择。适合需要多模型协作、重视可复现性和隐私保护的 AI4S 研究者。** 🚀

---

## 附录：核心信息源链接汇总

### 官方仓库与网站
- [OpenScience GitHub（synthetic-sciences）](https://github.com/synthetic-sciences/openscience)
- [Open Science Desktop GitHub（ai4s-research）](https://github.com/ai4s-research/open-science)
- [OpenScience 官方网站](https://www.openscience.sh/)
- [YC Synthetic Sciences 页面](https://www.ycombinator.com/companies/synthetic-sciences)
- [YC Launch 公告](https://www.ycombinator.com/launches/PY9-synthetic-sciences-ai-co-scientists-for-end-to-end-scientific-research)

### 媒体报道
- [极客公园 - 登顶 AI4S 评测榜首](https://www.geekpark.net/news/367207)
- [泡泡网报道](https://www.pcpop.com/article/6940144.shtml)
- [中国产业经济信息网报道](https://www.cinic.org.cn/zgzz/qy/1644067.html)
- [北京智源社区 - Claude Science 开源平替](https://hub.baai.ac.cn/view/56174)
- [KuCoin News - OpenScience Launch](https://www.kucoin.com/news/flash/openscience-launches-as-open-source-alternative-to-claude-science)
- [StartupHub.ai - Synthetic Sciences 报道](https://www.startuphub.ai/ai-news/claudes-corner/2026/claudes-corner-synthetic-sciences-yc-w2026)
- [美国湾区时报 - YC W26 Demo Day](https://americanbazaaronline.com/2026/03/31/yc-w26-demo-day-highlights-rising-influence-of-ia-entrepreneurs-477926/)

### 竞品参考
- [Claude Science（Anthropic）](https://claude.ai/science)
- [OpenAI4S - GitHub](https://github.com/PKU-YuanGroup/OpenAI4S)
- [K-Dense BYOK - GitHub](https://github.com/nikemaul/k-dense-byok)
- [Claude Science for Win - GitHub](https://github.com/JWM0203/Claude-Science-for-win)
