---
title: "OpenScience调研报告"
date: "2026-07-11"
summary: "生成日期：2026-07-11"
tags: ["research", "openscience", "AI", "scientific-research", "open-source"]
category: "research"
source: "web"
---

# OpenScience 调研报告

> 生成日期：2026-07-11

---

## 1. 开发者与公司背景

### 开发方全称
**Synthetic Sciences**，总部位于美国加利福尼亚州旧金山。

### 创始人基本信息

| 创始人 | 背景 |
|--------|------|
| **Ishaan Gangwani** | 联合创始人。顶级编程竞赛背景（USACO 铂金组）。曾在 NUS、CMU、MIT CSAIL 参与 ML 研究。 |
| **Aayam Bansal** | 联合创始人。年仅 18 岁，曾构建并专利出售 AI 骨科袜；搭建过服务 5 万+ 日活用户的 COVID-19 基础设施。 |

两人在 **NUS、CMU 和 MIT CSAIL** 从事 ML 研究期间相识，并曾在 **NeurIPS、ICML 和 AAAI 研讨会** 上共同发表论文。

### 团队规模
- **2 人核心团队**（两位联合创始人），整体员工 1-10 人
- Y Combinator 2026 冬季批次（YC W26）孵化

### 盈利情况
- 早期初创阶段，已获 **140 万美元融资**（YC 预孵化融资）
- YC W26 批次中至少 **14 家已突破 100 万美元 ARR 的公司之一**
- 商业模式：免费开源版（引流）+ Atlas 托管平台（收费）

### 发展信条与远景
> "科学 AI 应该是开放的。没有哪一家公司应该垄断科学发现的工具。"

**近期规划**：完善 OpenScience 开源工作台 → 打造 Atlas 托管平台 → 构建全自主 AI 科学家基础设施

### 链接
- [YC 公司页面](https://www.ycombinator.com/companies/synthetic-sciences)
- [YC 产品发布](https://www.ycombinator.com/launches/PY9-synthetic-sciences-ai-co-scientists-for-end-to-end-scientific-research)
- [GitHub 仓库](https://github.com/synthetic-sciences/openscience)
- [Dev.to 技术分析](https://dev.to/renolu/openscience-runs-the-whole-research-loop-not-just-the-reading-3kp)

> **信息源**：[Y Combinator 官方页面](https://www.ycombinator.com/companies/synthetic-sciences) · [Tracxn 公司档案](https://tracxn.com/d/companies/synthetic-sciences/___f7WC7QV9OrzfL-bXazCwLZzWz8Ibpuk7gmUD0XfeZk) · [Extruct.ai 融资数据](https://www.extruct.ai/hub/syntheticsciences-ai/) · [American Bazaar Online](https://americanbazaaronline.com/2026/03/31/yc-w26-demo-day-highlights-rising-influence-of-ia-entrepreneurs-477926/)

---

## 2. 底层技术栈

> **OpenScience 是 AI 原生科研工作台，深度依赖大语言模型作为核心推理引擎。**

### 调用的基础大模型
模型无关（Model-Agnostic），支持任意模型：

| 类别 | 支持 |
|------|------|
| **Anthropic** | Claude 全系列（Opus、Sonnet、Haiku）|
| **OpenAI** | GPT-4o、GPT-5 系列 |
| **Google** | Gemini 全系列 |
| **国产模型** | DeepSeek、GLM（智谱）、豆包（字节）|
| **开源本地** | Ollama（Llama、Qwen、Mistral 等）|
| **聚合平台** | OpenRouter |

### 核心技术架构

```
Browser Workspace UI → Local Server (Bun)
  ├── Agent Runtime → Research Harness
  │   ├─ research agent（主研究代理）
  │   ├─ biology / physics / ml specialist
  │   ├─ critique sub-agent（批评审阅）
  │   └─ lit-review sub-agent（文献综述）
  ├── Tool Layer
  │   ├─ Shell + Editor + LSP
  │   ├─ MCP Servers
  │   ├─ Scientific Connectors (30+)
  │   └─ Skills + Plugins (290+)
  └── Model Router → Anthropic / OpenAI / Google / Local
```

### 技术栈

| 组件 | 选型 |
|------|------|
| **运行时** | Bun + TypeScript |
| **后端** | CLI 服务器、模型路由、会话管理、技能引擎 |
| **前端** | 浏览器工作台（文件树、编辑器、终端、内联渲染）|
| **插件系统** | LSP、MCP 服务器、自定义代理/命令 |
| **工作流** | Plan → Approve → Execute → Artifacts → Review |
| **配置** | `~/.config/openscience/openscience.json` |

> **信息源**：[GitHub README](https://github.com/synthetic-sciences/openscience) · [Dev.to 架构分析](https://dev.to/renolu/openscience-runs-the-whole-research-loop-not-just-the-reading-3kp) · [PyTorchKR 社区讨论](https://discuss.pytorch.kr/t/openscience-ai/11185)

---

## 3. 开源属性与商业模式

### 开源
- **Apache License 2.0** 完全开源
- 所有代码在 GitHub 公开：https://github.com/synthetic-sciences/openscience

### 定价

| 层级 | 价格 | 说明 |
|------|------|------|
| **OpenScience（开源版）** | **完全免费** | 自带 API Key，所有功能完整可用 |
| **Atlas（托管平台）** | **付费**（未公开） | 托管模型、云端算力、持久化研究图谱 |

> 开源版 **始终免费**，功能不受限，Atlas 仅为可选的托管增值服务。

> **信息源**：[GitHub LICENSE](https://github.com/synthetic-sciences/openscience) · [YC 产品发布](https://www.ycombinator.com/launches/PY9-synthetic-sciences-ai-co-scientists-for-end-to-end-scientific-research)

---

## 4. 功能全景解析

### 主要功能
> 覆盖科研全流程的 AI 工作台——从文献检索、假设生成、代码实验到论文撰写，模型任选、数据本地化。

### 核心功能

#### 4.1 🔄 全科研流程闭环

| 阶段 | 功能 |
|------|------|
| 📚 **文献检索** | 自动搜索 30+ 数据库，生成结构化综述 |
| 💡 **假设生成** | 基于文献挖掘自动提出可检验的科学假设 |
| 💻 **代码编写** | AI 生成实验代码，支持 Python/R |
| 🧪 **实验执行** | 本地 Jupyter 内核运行，结果实时可视化 |
| 📊 **数据分析** | 统计检验、可视化、结果解读 |
| ✍️ **论文撰写** | LaTeX 排版、图表生成、学术写作润色 |

**关键技术**：多代理编排（Multi-Agent Orchestration）

#### 4.2 🧠 模型无关架构

- 同一研究中不同步骤可使用不同模型
- 通过 Ollama 支持本地模型，完全离线可用
- **关键技术**：统一模型路由器（Model Router）

#### 4.3 🧰 290+ 研究技能包

| 领域 | 示例 |
|------|------|
| ML 工程 | DeepSpeed、PEFT、TRL |
| 分子生物学 | 蛋白质结构、基因序列 |
| 化学信息学 | 分子性质预测、虚拟筛选 |
| 文献出版 | LaTeX、学术图表 |
| 数据分析 | 统计检验、回归、聚类 |

**关键技术**：可扩展 Skill 引擎，社区可贡献新技能

#### 4.4 🔌 30+ 科学数据库连接器

UniProt、PDB、Ensembl、NCBI、ChEMBL、PubChem、arXiv、PubMed、Semantic Scholar、OpenAlex、Crossref、bioRxiv、ClinicalTrials.gov

**关键技术**：MCP（Model Context Protocol）标准化协议

#### 4.5 🔐 本地优先

- 所有数据、API Key 存储在本机
- 出处追踪：`provenance.jsonl` 记录完整版本历史

> **信息源**：[GitHub README](https://github.com/synthetic-sciences/openscience) · [YC Launch](https://www.ycombinator.com/launches/PY9-synthetic-sciences-ai-co-scientists-for-end-to-end-scientific-research)

---

## 5. 功能实现案例

### 案例：药物靶点发现与初步验证

**场景**：探索 EGFR 蛋白的新可药性结合位点。

**流程**：
1. **文献检索** → 自动查询 arXiv/PubMed/Semantic Scholar → 返回 15 篇论文结构化摘要
2. **获取蛋白结构** → PDB 连接器下载野生型与 T790M 突变体结构 → 内联 3D 渲染
3. **假设生成** → 批评代理交叉验证 → 输出 3 个可能的别构结合位点
4. **代码生成与执行** → 自动编写分子对接脚本（AutoDock Vina）+ 结合自由能预测
5. **结果分析** → 生成结合亲和力热力图 + LaTeX 论文草稿

**结果**：原本 2-3 周的工作压缩到数小时，所有步骤可追溯、可复现。

---

## 6. 主要竞品清单

| # | 竞品 | 开发商 | 定位 | 优势 | 劣势 |
|---|------|--------|------|------|------|
| 1 | **Claude Science** | Anthropic | 付费 AI 科研工作台 | 60+ 数据库、审阅代理、强复现性 | 闭源、模型锁定、仅 macOS/Linux |
| 2 | **Google Co-Scientist** | Google | 假设生成引擎 | AlphaFold 独家 | 闭源、数据上云 |
| 3 | **GPT-Rosalind** | OpenAI | 生物推理模型 | GeneBench-Pro 基准 | 仅推理、闭源 |
| 4 | **OpenAI4S** | 北京大学 | 廉价科研 AI | 9.9 元/月豆包 API | 技能包较少 |
| 5 | **UniScientist** | UniPat AI | 开源科研模型 | 30B 开源模型 | 非工作台 |

> **信息源**：[Nature 2026.07](https://www.nature.com/articles/d41586-026-02091-6) · [TechFundingNews](https://techfundingnews.com/anthropic-launches-claude-science-and-google-and-openai-are-already-racing-to-match-it/) · [BAAI 智源社区](https://hub.baai.ac.cn/view/56174)

---

## 7. 与竞品的横向比较

| 对比维度 | **OpenScience** | **Claude Science** | **Google Co-Scientist** | **OpenAI4S** |
|:---|:---|:---|:---|:---|
| **价格** | ✅ **完全免费** | ❌ $20/月起 | ❌ 付费 | ✅ ~9.9 元/月 |
| **性能** | ⭐⭐⭐⭐ 取决于模型 | ⭐⭐⭐⭐⭐ 审查代理强 | ⭐⭐⭐⭐ 假设生成突出 | ⭐⭐⭐ 有限覆盖 |
| **易用性** | ⭐⭐⭐⭐ `npx synsci` | ⭐⭐⭐ 仅 macOS/Linux | ⭐⭐⭐ Cloud 配置 | ⭐⭐⭐⭐ 简单配置 |
| **生态** | ⭐⭐⭐⭐⭐ 30+ 数据库+MCP | ⭐⭐⭐⭐ 60+ 数据库 | ⭐⭐⭐⭐ AlphaFold 独家 | ⭐⭐⭐ 豆包生态 |

### 各竞品最适用场景

| 竞品 | 最佳场景 |
|------|---------|
| **OpenScience** | 追求模型自由、数据主权和低成本的学术实验室 |
| **Claude Science** | 有预算的大型实验室和药企 |
| **Google Co-Scientist** | 早期假设生成、结构生物学 |
| **GPT-Rosalind** | 生物推理 API 集成 |
| **OpenAI4S** | 预算极有限的国内研究者 |

> **信息源**：[Nature 2026.07](https://www.nature.com/articles/d41586-026-02091-6) · [HTX Insights](https://www.htx.com/en-in/news/claude-science-completes-two-years-work-in-a-few-weeks-is-10-Gu1DuGd6/)

---

## 8. 版本迭代信息

### 首次发布
- **2026 年 7 月**（紧跟 Claude Science 2026.06.30 之后）

### 当前状态
- 早期快速迭代阶段
- 安装：`npx synsci` 或 `npm install -g @synsci/openscience`

### 已知里程碑

| 时间 | 事件 |
|------|------|
| 2025 年 | Synthetic Sciences 成立；$140 万预孵化融资 |
| 2026 年初 | 入选 Y Combinator W26 批次 |
| 2026 年 6-7 月 | **OpenScience 公开发布** |
| 2026 年 7 月 | Nature 专题文章收录对比 |

> **信息源**：[GitHub 仓库](https://github.com/synthetic-sciences/openscience) · [YC 公司页面](https://www.ycombinator.com/companies/synthetic-sciences) · [Nature](https://www.nature.com/articles/d41586-026-02091-6)

---

## 一句话锐评

> **OpenScience 是一位"反叛者"——当三大 AI 巨头争相将科研工具锁进各自的生态围墙时，它以完全开源、模型自由、本地优先的姿态杀出，290+技能包和30+数据库连接器的配置甚至反超付费竞品。如果你在乎数据主权和工具自主权，这是当下最具战略价值的科研 AI 选择。**

---

*本报告基于 2026 年 7 月 11 日的公开信息编制。*

**核心信息源汇总**：[GitHub](https://github.com/synthetic-sciences/openscience) · [YC 公司页](https://www.ycombinator.com/companies/synthetic-sciences) · [YC Launch](https://www.ycombinator.com/launches/PY9-synthetic-sciences-ai-co-scientists-for-end-to-end-scientific-research) · [Nature](https://www.nature.com/articles/d41586-026-02091-6) · [Dev.to](https://dev.to/renolu/openscience-runs-the-whole-research-loop-not-just-the-reading-3kp) · [BAAI 智源社区](https://hub.baai.ac.cn/view/56174) · [TechFundingNews](https://techfundingnews.com/anthropic-launches-claude-science-and-google-and-openai-are-already-racing-to-match-it/) · [HTX Insights](https://www.htx.com/en-in/news/claude-science-completes-two-years-work-in-a-few-weeks-is-10-Gu1DuGd6/) · [Tracxn](https://tracxn.com/d/companies/synthetic-sciences/___f7WC7QV9OrzfL-bXazCwLZzWz8Ibpuk7gmUD0XfeZk)
