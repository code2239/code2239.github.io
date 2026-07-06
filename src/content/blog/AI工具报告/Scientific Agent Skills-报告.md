---
title: "scientific-agent-skills 深度调研报告"
date: "2026-07-05"
tags: ["AI","调研","Skill","自动化","工具","科研"]
summary: "- **开发方**：**K-Dense Inc.**，由 Timothy Kassis 与 David Zhang 联合创立，最初从 Biostate AI 内部数据基础设施孵化而来，后独立为公司实体"
---

# scientific-agent-skills 深度调研报告

> **调研时间**：2026-07-05 | **调研对象**：`K-Dense-AI/scientific-agent-skills` | **来源**：GitHub 仓库、Web 搜索、公开报道

---

## 1. 开发者与公司背景

- **开发方**：**K-Dense Inc.**，由 Timothy Kassis 与 David Zhang 联合创立，最初从 Biostate AI 内部数据基础设施孵化而来，后独立为公司实体
- **所属国家/地区**：美国（硅谷），但创始团队有印度/华人背景；入选 2026 年 Accel Atoms AI Cohort 的 5 家印度 AI 初创之一
- **融资阶段**：
  - **2026 年 3 月**入选 **Accel Atoms × Google AI Futures Fund 联合 AI Cohort**（从 4000+ 全球申请者中遴选 5 家）
  - 获得 Accel 与 Google AI Futures Fund 各 50% 的 **高达 $2M 联合投资**
  - 额外获得 Google Cloud / Gemini / DeepMind **$350K 算力额度**
  - 已获 **GSK、Zeiss、Ford、MIT、Harvard Medical School、Stanford、UPenn** 等顶级机构采用
- **来源依据**：Accel Atoms 官方公告 (2026.03.16)、Moneycontrol、Business Standard 等媒体报道

---

## 2. 底层技术栈

- `scientific-agent-skills` **不是 AI 模型本身**，而是基于 **Agent Skills 开放标准**（由 Anthropic 于 2025 年 10 月发布，12 月开源规范）构建的 **可组合 Skill 目录**
- **运行在 Claude Code / Cursor / Codex / Pi / Antigravity / Hermes / Goose / OpenHands** 等 40+ 种 AI Agent 宿主机上，底层推理能力由各宿主的大模型提供（Claude、GPT、Gemini 等）
- 每个 Skill 是一个包含 `SKILL.md`（YAML frontmatter + Markdown 指令）+ `references/`（按需加载文档）+ `scripts/`（可执行脚本）+ `assets/`（模板资源）的目录
- 采用 **Progressive Disclosure（渐进式加载）** 架构：Level 1（name + description ~100 tokens）→ Level 2（SKILL.md <500 行 ~5K tokens）→ Level 3（references/ 按需加载，无上限）
- 含 **100+ 个科学数据库 MCP 连接器**：PubChem、ChEMBL、UniProt、COSMIC、ClinicalTrials.gov、USPTO 等
- 安全审计层：**Cisco AI Defense Skill Scanner** 每周全量扫描 + 每 PR 增量扫描，结果写入 `SECURITY.md`（3644 行）

**结论**：该软件非 AI 原生模型，而是基于 Agent Skills 开放标准的「科学领域可复用技能包市场」。

---

## 3. 开源属性与商业模式

- **开源/闭源**：**完全开源**，托管于 `https://github.com/K-Dense-AI/scientific-agent-skills`
- **开源协议**：基于 Agent Skills 开放标准（Apache 2.0 兼容）；技能本身与 GitHub 仓库均公开可 Fork
- **定价模式**：
  - **Skills 免费** — `npx skills add K-Dense-AI/scientific-agent-skills` 一键安装
  - **K-Dense BYOK** — 免费开源的桌面端 AI Co-Scientist（自带 API Key 使用），内置全部 140+ 技能 + 326 工作流模板
  - **企业定制** — 面向 GSK、Zeiss 等大客户的合规/安全部署服务（推测为企业收入来源）
  - **商业化路径** — 类似 npm registry 的「平台型」思路：技能免费 → 生态锁定 → 企业增值服务

---

## 4. 功能全景解析

### 核心价值

**将任何 AI Agent 升级为领域感知的「AI Scientist」**——提供 140+ 个可组合的科研技能包，覆盖 17 个科学领域，被 160,000+ 科学家使用。

### 技能分类矩阵（140+ Skills）

| 技能类别 | 数量 | 典型案例 |
|:---|:---|:---|
| **科学数据库连接器** | 100+ | PubChem、ChEMBL、UniProt、COSMIC、ClinicalTrials.gov、FRED、USPTO；BioServices（~40 服务）、BioPython（38 NCBI 子库）、gget（20+ 基因组数据库） |
| **Python 科研包优化技能** | 70+ | RDKit、Scanpy、PyTorch Lightning、scikit-learn、OpenMM、MDAnalysis、scVelo、TimesFM、PennyLane、Qiskit |
| **科学平台集成技能** | 9+ | Benchling、DNAnexus、LatchBio、OMERO、Protocols.io、Opentrons |
| **分析与交流工具** | 30+ | 文献综述、科学写作、同行评审、学术海报、幻灯片、Mermaid 图表 |
| **研究与临床工具** | 10+ | 假设生成、基金申请书写作、临床决策支持、法规合规 |

### 覆盖 17 个科学领域

🧬 生物信息学与基因组学 · 🧪 化学信息学与药物发现 · 🔬 蛋白质组学与质谱 · 🏥 临床研究与精准医学 · 🖼️ 医学影像与数字病理 · 🤖 机器学习与 AI · 🔮 材料科学与化学 · 🌌 物理学与天文学 · ⚙️ 工程与仿真 · 🌍 地理空间科学与遥感 · 🧪 实验室自动化 · 🔬 多组学与系统生物学 · 🧬 蛋白工程与设计 · 🎓 科研方法论

### 三大核心技术优势

1. **Progressive Disclosure（渐进式加载）**：147 个技能通过三级加载机制管理上下文窗口——100 tokens 发现（全部技能）→ 5000 tokens 激活（单一技能）→ 无限 tokens 执行（按需引用），避免上下文窗口爆炸
2. **双源安全审计**：Cisco AI Defense Skill Scanner 三层扫描器（行为扫描 + 触发器扫描 + LLM-as-judge 评估），每周全量 + 每 PR 增量扫描，产出的 `SECURITY.md` 达 3644 行，满足 GxP / ISO 13485 合规要求
3. **文件级溯源（Provenance）**：三层版本控制 —— package 级（`pyproject.toml` version）→ Skill 级（`metadata.version`）→ 安全级（Git tag/SHA pin），支持可复现安装

---

## 5. 主要竞品清单

| 竞品 | GitHub Stars | 定位 | 与 scientific-agent-skills 的关系 |
|:---|:---|:---|:---|
| **anthropics/skills** | ~151K | Anthropic 官方 Agent Skills 示例（~10 个通用技能：pptx/pdf/docx） | 同标准，但无科学垂直深度；最大威胁（若 Anthropic 扩展科学领域） |
| **obra/superpowers** | ~228K | 软件工程 Agent 方法论与技能框架 | 不同领域竞品——科学 vs 软件工程 |
| **deepanalyze** | ~4.2K | 端到端数据科学 Agent | 单体架构，非模块化技能库 |
| **paper-search-mcp** | ~1.7K | MCP 论文检索 | 单一功能，非全链路 |
| **huggingface/skills** | ~10.6K | Hugging Face 生态 Agent Skills | 机器学习/模型生态，非全科学领域 |

**注**：在「科学领域 Agent Skills 市场」中，scientific-agent-skills 目前**无直接同等体量的竞品**——通用库（如 anthropics/skills）缺乏科学垂直深度，而科学工具（如 DeepAnalyze）缺乏模块化技能生态。

---

## 6. 与竞品的横向比较

| 对比维度 | scientific-agent-skills | anthropics/skills | superpowers | deepanalyze | huggingface/skills |
|:---|:---|:---|:---|:---|:---|
| 价格 | **免费** | **免费** | **免费** | 免费 | **免费** |
| 技能数量 | **147 个科学技能** | ~10 个通用技能 | ~30 个工程技能 | 单体 Agent | ~50 个 ML 技能 |
| 易用性 | `npx` 一键安装，40+ 宿主兼容 | Claude Code 原生 | Hermes/Superpowers 生态 | pip install | Hugging Face 生态 |
| 生态与集成能力 | **极强**：100+ 数据库 + 40+ Agent 宿主 + 326 工作流模板 | 中：仅 Anthropic 生态 | 强：软件工程全链路 | 弱：独立 Agent | 强：HF 模型/数据集生态 |
| 安全合规 | **独有**：Cisco 扫描 + SECURITY.md + GxP 就绪 | 无 | 无 | 无 | 无 |

**各竞品最佳适用场景**：
- **scientific-agent-skills**：生命科学/化学/医学/AI 跨领域科研 Agent，需要数据库连接 + 包技能 + 合规审计 + 多宿主部署
- **anthropics/skills**：基础文档生成（PPT/PDF/DOCX），无科学深度需求
- **superpowers**：软件工程全流程（TDD/Code Review/Bug Fix），不适配科研
- **deepanalyze**：单一数据分析任务，不需要模块化技能生态
- **huggingface/skills**：ML 模型训练/部署/推理，HF 生态绑定

---

## 7. 版本迭代信息

- **首次公开发布**：约 **2025 年 10-11 月**（Agent Skills 标准发布后不久，仓库创建）
- **当前最新稳定版**（截至 2026-07-05）：**v2.53.0**（频繁更新）
- **更新频率**：**极高**——几乎每周都有新 release，持续添加新技能与改进已有技能
- **关键里程碑**：
  - **半年内**从 0 到 **27,000+ GitHub Stars**
  - 从初始几十个技能扩展到 **147 个技能 + 100+ 数据库连接器**
  - **2026 年 3 月**入选 Accel × Google AI Futures Fund Cohort
- **仓库活跃度**：高活跃度（社区 PR 频繁，如 feat: add Exa AI-powered search tool #143）

---

## 8. 关联生态（K-Dense 全家桶）

| 项目 | 用途 |
|:---|:---|
| **K-Dense BYOK** | 免费开源的桌面 AI Co-Scientist（"Kady"），内置全部 140+ 技能 + 326 工作流模板 + 229 数据库，本地运行 + 自带 API Key |
| **scientific-agents** | 503 个 AGENTS.md 专家 Profile（如 Bayesian Statistician、Causal Inference Scientist），教 Agent 以资深科学家方式推理 |
| **science-superpowers** | 可组合的计算科学方法论技能——预注册（Pre-registration）方法论（科学的 TDD） |
| **mimeo** | 将专家思维克隆为 SKILL.md 或 AGENTS.md 的工具 |
| **karpathy** | 基于 Claude Agent SDK + Google ADK 的 Agentic ML Engineer |

### 安装方式

```bash
npx skills add K-Dense-AI/scientific-agent-skills  # 标准方式（所有平台）
gh skill install K-Dense-AI/scientific-agent-skills # GitHub CLI
git clone https://github.com/K-Dense-AI/scientific-agent-skills.git ~/.agents/skills/scientific-agent-skills  # 手动
```

---

## 一句话锐评

> **科学领域的 npm registry**——147 技能 + 100 数据库 + 40 宿主，合规就绪的全栈「AI Scientist」基础设施。
