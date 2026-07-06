---
title: "模块 2.3：实验流程抽取模块 · 技术发现与选型"
date: "2026-07-06"
tags: ["科研AI", "Program-0", "技术调研"]
summary: "模块 2.3：实验流程抽取模块 · 技术发现与选型"
categories: ["program-0/tech-report"]
---


---

## 1. 问题定义（Task Deconstruction）

**本质工程问题：** 从科研论文的"方法"（Methods）章节中自动提取实验操作步骤，构建有向无环图（DAG），其中节点表示操作单元（如"DNA提取→PCR扩增→凝胶电泳→数据分析"），边表示步骤间的依赖关系和数据流。

**输入：** 论文 Methods 章节文本（来自模块1）  
**输出：** 步骤化 DAG（节点=步骤，边=依赖/数据流），含工具名称、版本号、参数配置  
**核心难点：**
- 实验描述的自由文本格式多样化（段落叙事 vs 编号列表 vs 隐含步骤）
- 步骤边界模糊（"细胞在37°C下培养24小时后，用PBS洗涤三次，然后用胰蛋白酶消化" → 需拆分为4步）
- 工具/参数/版本的精确提取（如 "ImageJ v1.53t"）
- 隐含步骤的推断（论文中省略的"常识性"操作）
- 跨段落甚至跨论文的流程拼合

---

## 2. 技术范式广泛搜索（Broad Search）

### 2.1 基于规则的方法
- **正则表达式 + 关键词匹配** — 基于 "first/then/next/finally" 等时序指示词拆分步骤；基于工具白名单匹配软件名。
- **protocols.io 结构化协议解析** — 已有 30,000+ 结构化实验协议可作为训练数据。

### 2.2 经典 ML/NLP 方法
- **SciBERT + PU Learning** — 正样本-无标签学习识别工作流描述段落（F1=0.9772）。
- **Flan-T5 + 提示学习** — 生成工作流短语，将自由文本压缩为结构化步骤描述。

### 2.3 基于 LLM 的方法
- **BioWorkflow (2025)** — LLM+RAG 框架，从 PDF 中恢复约 80% 的工作流步骤（vs 传统工具 20%）。
- **GPT-4o + CoT 分解** — 链式思考（Chain-of-Thought）提示逐句分解为操作步骤 DAG。

### 2.4 基于图结构的方法
- **DAG 约束解码** — 在 LLM 生成时施加 DAG 结构约束，确保输出的步骤图无环。
- **BCO (BioCompute Object)** — IEEE 2791-2020 标准格式，BioWorkflow 的输出目标格式。

### 2.5 混合方法
- **research_workflow (ZH-heng)** — SciBERT 段落识别 + Flan-T5 短语生成 + ChatGPT 分类的完整管线。
- **KG-guided LLM** — 知识图谱引导 LLM 生成结构化实验协议（2025 年 ChemRxiv 探索，后被撤回，说明领域仍不成熟）。

---

## 3. 候选技术清单（Candidate Technologies ≥ 3）

### 候选1：research_workflow (Zhang & Zhang, 2025)

| 维度 | 详情 |
|:---|:---|
| **全称** | Automated Generation of Research Workflows from Academic Papers: A Full-text Mining Framework |
| **功能描述** | 三阶段管线：(1) SciBERT + PU Learning 识别工作流描述段落（**F1=0.9772**）；(2) Flan-T5 + 提示学习生成工作流短语（ROUGE-1=0.45）；(3) ChatGPT few-shot 将短语分类为"数据准备/处理/分析"（**精确率=0.958**）。输出可视化流程图+趋势分析。支持 20 年 NLP 文献的大规模分析。 |
| **为什么适用** | 三者中唯一**开源且代码可直接获取**的完整管线；学术文献设计的专用方案；产出可视化 DAG 流程图。 |
| **存在性验证** | 发表于 *Journal of Informetrics* (2025)；GitHub 仓库公开可访问。 |
| **来源链接** | GitHub: [https://github.com/ZH-heng/research_workflow](https://github.com/ZH-heng/research_workflow) |
| **许可证** | 经搜索未在 README 中明确标注（需联系作者确认；代码仓库已公开可见） |
| **活跃度** | 2025 年发布；学术研究项目，更新频率较低。 |

---

### 候选2：BioWorkflow (2025, Briefings in Bioinformatics)

| 维度 | 详情 |
|:---|:---|
| **全称** | BioWorkflow: Retrieving Comprehensive Bioinformatics Workflows from Publications |
| **功能描述** | 西安交通大学开发。LLM+RAG 框架：PDF 解析为文本/表格/图片的统一索引 → 层级查询分解 → 迭代上下文检索 → 组装为有向工作流（步骤、工具、版本、参数）。**恢复约 80% 工作流步骤**（vs 传统工具 20%），**比 GPT-4o-mini 基线提升 20%+**。将人工策展时间从 1-2 小时缩短至 3-5 分钟/论文。输出 BCO 兼容 JSON。 |
| **为什么适用** | 性能最强的实验流程提取方案（80% 恢复率）；专为生物信息学文献设计（与科研场景高度匹配）；输出 BCO IEEE 标准格式；证据可追溯（每个步骤链接到原文位置）。 |
| **存在性验证** | 发表于 *Briefings in Bioinformatics* (2025 年 11 月)，DOI: 10.1093/bib/bbaf571；PubMed: PMID 41206112。 |
| **来源链接** | 论文: [https://doi.org/10.1093/bib/bbaf571](https://doi.org/10.1093/bib/bbaf571) |
| **许可证** | ⚠️ **代码尚未开源**（据 2025 年末社区评论确认"目前还未开源"）；建议联系作者或关注后续发布。 |
| **活跃度** | 学术论文阶段，代码待发布。 |

---

### 候选3：LLM + Structured Output Pipeline (自建)

| 维度 | 详情 |
|:---|:---|
| **全称** | LLM-based Experiment Protocol to DAG Pipeline（基于 LLM 的实验流程 DAG 转换管线） |
| **功能描述** | 直接使用 GPT-4o / Claude Sonnet，通过结构化输出（JSON Schema 定义的 DAG 格式）将 Methods 文本转化为步骤图。方法：(1) 用模块2的实体抽取结果标注工具名/参数；(2) few-shot 示例定义步骤粒度标准；(3) 输出为 Mermaid.js 兼容的 DAG 描述或 Python networkx 图。 |
| **为什么适用** | 零开发成本即可验证可行性；LLM 强大的自然语言理解能力可处理自由的实验文本描述；结构化输出确保 DAG 格式正确；可自定义输出 Schema 适配下游模块。 |
| **存在性验证** | OpenAI Structured Outputs 功能于 2024 年 8 月发布；2025 年临床实验方案抽取研究（J. Clinical & Translational Science）验证了 LLM+RAG 方法的可行性。 |
| **来源链接** | OpenAI Structured Outputs: [https://platform.openai.com/docs/guides/structured-outputs](https://platform.openai.com/docs/guides/structured-outputs) |
| **许可证** | 商业 API 服务；自建管线代码可 MIT 许可 |
| **活跃度** | 持续可用；API 稳定性高。 |

---

## 4. 横向对比分析（Comparative Matrix）

| 维度 | research_workflow | BioWorkflow | LLM + Structured Output |
|:---|:---:|:---:|:---:|
| **步骤恢复率** | ⭐⭐⭐ 中等（段落级） | ⭐⭐⭐⭐⭐ ~80% | ⭐⭐⭐⭐ (取决于提示) |
| **工具/参数提取** | ⭐⭐ 有限 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **证据可追溯性** | ⭐⭐ 弱 | ⭐⭐⭐⭐⭐ (链接原文) | ⭐⭐ 弱（幻觉风险） |
| **工程复杂度** | ⭐⭐⭐⭐ 较高（三阶段） | ⭐⭐⭐⭐ 较高（RAG系统） | ⭐⭐ 简单（API调用） |
| **运行成本** | ⭐⭐⭐⭐ 低（本地模型） | ⭐⭐⭐ 中（LLM+Embedding） | ⭐⭐⭐ 中（API按量） |
| **可解释性** | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| **开源可用性** | ⭐⭐⭐⭐ 代码公开 | ⭐ 代码未开源 | ⭐⭐⭐⭐⭐ (API可用) |
| **领域适配** | ⭐⭐⭐ NLP/通用 | ⭐⭐⭐⭐⭐ 生物信息学 | ⭐⭐⭐⭐⭐ 高度灵活 |
| **输出格式** | 可视化流程图 | BCO JSON 标准 | 自定义 Schema |
| **社区活跃度** | ⭐⭐ 学术项目 | ⭐⭐ 论文阶段 | ⭐⭐⭐⭐⭐ |

---

## 5. 推荐方案及理由（Selection & Justification）

### 🏆 MVP 阶段推荐：LLM + Structured Output（自建管线）

**核心理由：**

1. **领域内工具均不成熟** — BioWorkflow 代码未开源，research_workflow 仅做段落级分类（非完整步骤 DAG）。当前没有任何可直接部署的开源实验流程 DAG 提取工具。

2. **LLM 自建管线是最低风险路径** — 利用 GPT-4o / Claude Sonnet 的结构化输出能力，可在 1-2 周内构建 MVP 验证管线，快速评估领域内 Methods 文本的提取质量。

3. **可与模块2协同** — 模块2已部署的 LLM-IE 管线可直接复用 API Key、提示模板和输出解析代码。

4. **渐进式优化** — 先用 LLM 产出标注数据（human-in-the-loop 修正），积累 500-1000 篇标注后，微调开源模型（如 Llama-3.1-8B 或 Qwen-2.5-7B）替代 API 调用，降低成本。

### 淘汰其他方案的理由：

| 淘汰方案 | 淘汰原因 |
|:---|:---|
| **BioWorkflow** | 代码未开源，无法部署；论文发表于 2025 年 11 月，发布时间太短，社区验证不足 |
| **research_workflow** | 虽代码公开，但仅覆盖"段落识别+短语分类"（未做完整步骤 DAG 提取）；设计面向 NLP 文献元分析，非实验流程提取 |
| **protocols.io / BCO** | 结构化协议标准虽好，但需人工录入，不符合本系统的自动化目标 |

### 🔮 进阶阶段建议：

- **Phase 2-3**：BioWorkflow 如有开源计划，评估后可作为第二轮引擎。使用自建管线积累的标注数据微调专用模型。引入 BCO (IEEE 2791) 作为标准输出格式。
- **Phase 4**：构建端到端的 LLM+KG 混合管线——先查知识图谱中的已知实验模板，再引导 LLM 做步骤对齐和参数填充。

---

*报告生成时间：2026-07-06 | 基于截至 2026 年 7 月的网络搜索结果*
