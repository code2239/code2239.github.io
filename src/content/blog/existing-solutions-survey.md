---
title: "已有集成方案调研：有哪些现成的开源工程？"
date: "2026-07-06"
tags: ["科研AI", "Program-0", "技术调研"]
summary: "已有集成方案调研：有哪些现成的开源工程？"
categories: ["program-0"]
---


> 调研日期：2026-07-06  
> 核心问题：每个模块是否已有现成的集成开源工程，能否"拿来即用"而非从零开发？

---

## 一、总览：12 个候选集成方案

按覆盖模块数量排序：

| 方案 | 模块1<br>文档 | 模块2<br>抽取 | 模块3<br>实验DAG | 模块4<br>图谱 | 模块5<br>压缩 | 模块6<br>灵感 | 模块7<br>评估 | 许可证 | 成熟度 |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---|:---|
| **PARNESS** | ✅ | ✅ | — | ✅ | ✅ | 🟡 | 🟡 | 待确认 | ⭐⭐⭐⭐ v1.0 |
| **AI Research Toolkit** | ✅ | ✅ | — | ✅ | ✅ | 🟡 | — | MIT? | ⭐⭐⭐ beta |
| **Kosmos** | 🟡 | 🟡 | ✅实验执行 | ✅ Neo4j | — | ✅ | ✅ 8维 | MIT? | ⭐⭐⭐ alpha |
| **ResearchAgent_Datainsight** | ✅ | ✅ | — | ✅ | ✅ | 🟡 | — | 开源 | ⭐⭐⭐ |
| **GRD (GetResearchDone)** | ✅ | ✅ | ✅ | ✅ Tesserae | — | ✅ | ✅ | 开源 | ⭐⭐⭐⭐ |
| **Ontology-Learning** | ✅ | ✅ | — | ✅ Neo4j | — | — | — | 开源 | ⭐⭐⭐ |
| **KG-RDF-LLM** | ✅ | ✅ | — | ✅ RDF | — | — | — | 开源 | ⭐⭐⭐ |
| **Empirica** | ✅ | ✅ | — | ✅ 3D | — | ✅ | — | 开源 | ⭐⭐ hackathon |
| **ResearchAgent** | 🟡 | ✅ | — | ✅ 关系图 | — | ✅ | — | 开源 | ⭐⭐⭐⭐ NAACL'25 |
| **Paper Circle** | ✅ | ✅ | — | ✅ 类型KG | — | — | — | 开源 | ⭐⭐⭐⭐⭐ ACL'26 |
| **PaperQA2** | ✅ | 🟡 证据 | — | — | ✅ RAG | — | — | MIT | ⭐⭐⭐⭐⭐ 8.6K⭐ |
| **Intelliscope** | — | 🟡 | — | ✅ Hetionet | — | ✅ 生物医药 | — | 开源 | ⭐⭐⭐ |

> 图例：✅ = 模块有实现 | 🟡 = 部分/间接覆盖 | — = 未覆盖

---

## 二、逐个方案深度分析

### 1. PARNESS ⭐ 最完整的端到端方案

| 维度 | 详情 |
|:---|:---|
| **全称** | PARNESS: A Paper Harness for End-to-End Automated Scientific Research |
| **来源** | arXiv:2605.05258 (2026年5月) |
| **GitHub** | [github.com/gtrhythm/PARNESS](https://github.com/gtrhythm/PARNESS) |
| **覆盖模块** | 1-文档解析, 2-信息抽取, 4-知识图谱索引, 5-认知压缩, 🟡6-灵感, 🟡7-评估 |
| **核心能力** | DAG 声明式 YAML 工作流编排；全文 PDF 解析 + 图表索引为类型对象；知识图谱索引（论文/想法/实验/代码跨实体链接）；场景化检索（相似/矛盾/跨领域/反直觉）；跨运行知识累积；可扩展给 Claude Code/Cursor/Copilot/OpenCode Agent |
| **不足** | 灵感生成和评估依赖外部 Agent 扩展（非原生实现）；实验流程 DAG 非核心功能 |
| **推荐度** | ⭐⭐⭐⭐⭐ **最推荐作为系统骨架**——提供了管线编排 + 知识索引的完整框架，直接复用它连接其余模块 |

---

### 2. Kosmos ⭐ 最接近"AI 科学家"愿景

| 维度 | 详情 |
|:---|:---|
| **全称** | Kosmos: An AI Scientist for Autonomous Discovery |
| **来源** | arXiv:2511.02824 |
| **GitHub** | [github.com/jimmc414/Kosmos](https://github.com/jimmc414/Kosmos) |
| **覆盖模块** | 🟡1/2-文献综述, 3-实验执行(Docker沙箱), 4-Neo4j KG(1025行模块), 6-假设生成(70/30探索-利用), 7-8维ScholarEval评审 |
| **核心能力** | 全自主研究循环（假设→实验→验证）；Neo4j 知识图谱；8 维度评估（新颖性/可行性/严谨性/影响力等）；多 LLM 提供商（Anthropic/OpenAI/LiteLLM）；~3,700 测试用例 |
| **不足** | v0.2.0-alpha 仍为早期版本；模块1/2 依赖外部库（非自研）；未覆盖认知压缩 |
| **推荐度** | ⭐⭐⭐⭐ **模块6+7的最佳参考实现**——ScholarEval 8维评估体系可直接借鉴 |

---

### 3. AI Research Toolkit ⭐ 面向研究生的"全家桶"

| 维度 | 详情 |
|:---|:---|
| **全称** | AI Research Toolkit — Full-pipeline AI-assisted academic research workflow |
| **来源** | GitHub: [debug-zhuweijian/ai-research-toolkit](https://github.com/debug-zhuweijian/ai-research-toolkit) |
| **覆盖模块** | 1-MinerU PDF解析, 2-信息抽取, 4-Graphify KG(社区检测+HTML可视化), 5-知识库, 🟡6-头脑风暴 |
| **核心能力** | 7 阶段管线（发现→处理→分析→写作→知识库→展示→编排）；集成 20+ 数据库；Graphify 社区检测知识图谱（交互式 HTML 可视化 + GraphRAG-ready JSON）；Claude Code 原生 slash 命令 |
| **不足** | v0.3.0-beta.2 仍为测试版；灵感生成仅做头脑风暴支持；无实验流程 DAG |
| **推荐度** | ⭐⭐⭐⭐ **模块1+2+4+5的最佳参考实现**——Graphify 的交互式知识图谱可视化极其实用 |

---

### 4. PaperQA2 (FutureHouse) ⭐ 科学文献 RAG 的事实标准

| 维度 | 详情 |
|:---|:---|
| **全称** | PaperQA2 — High accuracy RAG for answering questions from scientific documents |
| **来源** | arXiv:2409.13740 |
| **GitHub** | [github.com/Future-House/paper-qa](https://github.com/Future-House/paper-qa) |
| **覆盖模块** | 1-多PDF阅读器(Docling/PyMuPDF/nemotron), 🟡2-引文证据抽取, 5-高精度RAG问答 |
| **核心能力** | Agentic RAG 三阶段（搜索→收集证据→生成含引用的回答）；元数据感知嵌入（Semantic Scholar/Crossref/OpenAlex/Unpaywall 自动获取引用数/期刊质量/撤稿检查）；RAG-QA Arena 科学基准 SOTA（超第二名 12.4%）；MIT 许可证；pip install 即用 |
| **不足** | 不构建持久化知识图谱；不支持假设生成和评审；聚焦于"问答"而非"发现" |
| **推荐度** | ⭐⭐⭐⭐⭐ **模块1的最佳文档问答引擎**——可作为 Docling 的上层 Q&A 封装 |

---

### 5. GRD (GetResearchDone) ⭐ 最激进的自主研究循环

| 维度 | 详情 |
|:---|:---|
| **全称** | GetResearchDone — Autonomous Research Agent |
| **来源** | npm: `@jokerized/getresearchdone` |
| **覆盖模块** | 1-文献摄入, 2-实体抽取, 3-实验执行, 4-Tesserae KG, 6-假设生成, 7-评估判定 |
| **核心能力** | 8 阶段自主循环（SEED→GROUND→HYPOTHESIZE→DESIGN→RUN→MEASURE→LEARN→DECIDE）；Tesserae 知识图谱（混合检索：词汇+图+语义）；KNOWHOW.md + DEAD-ENDS.md 失败知识累积（负结果不丢失）；92.2% 代码由自身循环自举生成 |
| **不足** | npm 生态（不适合 Python 技术栈）；"实验"偏向代码执行而非湿实验 |
| **推荐度** | ⭐⭐⭐ **模块6+7的算法灵感来源**——研究循环设计和 DEAD-ENDS 注册表思想值得学习 |

---

### 6. Ontology-Learning Pipeline ⭐ 最干净的 Neo4j 知识图谱管线

| 维度 | 详情 |
|:---|:---|
| **全称** | Ontology Extraction and Schema Alignment Pipeline |
| **来源** | GitHub: [itssnehin/Ontology-Learning](https://github.com/itssnehin/Ontology-Learning) |
| **覆盖模块** | 1-marker PDF→Markdown, 2-GPT-4o zero-shot实体/关系抽取, 4-Neo4j 知识图谱(:OntologyClass schema) |
| **核心能力** | 全链路：PDF→Markdown→LLM抽取→混合决策引擎(语义+词汇相似度)→Neo4j写入；人工审核 Flask Dashboard；评估套件（概念饱和/F1/模型诊断）；跨文档实体去重 |
| **不足** | 仅覆盖 3 个模块；不支持认知压缩/灵感生成 |
| **推荐度** | ⭐⭐⭐⭐ **模块1→2→4的最佳端到端参考**——管线最清晰的 Neo4j 集成实现 |

---

### 7-12. 其他方案速览

| 方案 | 一句话描述 | 最值得借鉴的部分 |
|:---|:---|:---|
| **KG-RDF-LLM** | PDF→RDF KG + SPARQL + Streamlit UI | RDF 标准互操作的参考实现 |
| **Empirica** | 生物医学 2D/3D 知识图谱 + 假设生成 | 3D 可交互知识图谱可视化 |
| **ResearchAgent** | 清华×KAIST NAACL'25，种子论文→实体关系图→假设生成 | 最轻量的假设生成管线(纯API，零GPU) |
| **Paper Circle** | MBZUAI ACL'26 Oral，多源发现+类型化KG+溯源 | 多源论文发现 + 确定性审计日志 |
| **ResearchAgent_Datainsight** | 7 Agent LangGraph，含gap/consensus检测 | 多智能体 gap/共识检测架构 |
| **Intelliscope** | 生物医学 Hetionet KG + 假设→湿实验方案 | 领域KG(Hetionet)集成 |

---

## 三、模块级"现成方案"可用性评估

| 模块 | 是否有现成的开源方案？ | 推荐复用对象 |
|:---|:---|:---|
| **1. 文档理解** | ✅ **完全现成** | Docling + PaperQA2 组合已是事实标准 |
| **2. 信息抽取** | ✅ **完全现成** | Ontology-Learning 的 GPT-4o 抽取管线 + SciBERT |
| **3. 实验流程DAG** | ❌ **无现成方案** | 所有 12 个集成平台均未覆盖；只能自建 LLM Structured Output |
| **4. 知识图谱** | ✅ **完全现成** | Ontology-Learning (Neo4j) 或 KG-RDF-LLM (RDF/SPARQL) |
| **5. 认知压缩** | 🟡 **部分现成** | BERTopic 聚类（独立工具）+ AI Research Toolkit 的 Graphify 社区检测 |
| **6. 灵感生成** | ✅ **现成可用** | Kosmos 或 ResearchAgent 的假设生成管线 |
| **7. 多智能体评估** | 🟡 **部分现成** | Kosmos ScholarEval (8维) + GRD 判定逻辑 |

---

## 四、推荐的"拼装方案"

### 🏆 最优策略：不重复造轮子，组装现有开源组件

```
┌───────────────────────────────────────────────────────────┐
│ 系统骨架：PARNESS (YAML DAG 管线编排 + 跨运行知识累积)        │
├───────────────────────────────────────────────────────────┤
│ 模块1：Docling + PaperQA2 (MIT, pip install 即用)          │
│ 模块2：Ontology-Learning 的 LLM 抽取管线                    │
│        + SciBERT 本地 NER (降低 API 成本)                   │
│ 模块3：自建 LLM Structured Output → DAG (⚠️ 无现成方案)     │
│ 模块4：Ontology-Learning 的 Neo4j 写入管线                   │
│        + Graphify 社区检测 + 交互式 HTML 可视化              │
│ 模块5：BERTopic + AI Research Toolkit 的 Graphify           │
│        + PaperQA2 的 RAG 引擎做证据检索                     │
│ 模块6：Kosmos 假设生成 + Elo 排序 (1025行 KG 模块可复用)    │
│ 模块7：Kosmos ScholarEval (8维) + MARS 角色架构            │
└───────────────────────────────────────────────────────────┘
```

### 开发量估算

| 类型 | 涉及模块 | 预计开发量 | 说明 |
|:---|:---|:---|:---|
| **直接复用** | 1, 2(部分), 4 | ~2 周集成 | pip install + API 配置 + 数据格式适配 |
| **参考改写** | 6, 7 | ~4 周适配 | 基于 Kosmos 代码改写，适配本项目数据格式 |
| **组合开发** | 5 | ~4 周 | BERTopic + Graphify + LLM 增强层 |
| **从零自建** | 3 | ~6 周 | 无现成方案，需从提示工程→评测→迭代 |
| **骨架集成** | PARNESS 管线 | ~3 周 | YAML 工作流定义 + 组件注册 |
| **总计** | | **~19 周 (≈5 个月)** | vs 从零全栈开发的 ≈12 个月 |

**核心结论：通过复用 6 个已有开源项目作为子系统，预计可将 MVP 开发周期从 12 个月压缩至 5 个月，节省约 60% 的开发工作量。**

---

## 五、风险提示

| 风险 | 影响方案 | 说明 |
|:---|:---|:---|
| **PARNESS 太新** | 骨架层 | 2026年5月论文，社区验证不足。降级方案：直接用 LangGraph 替代 PARNESS 做编排 |
| **Kosmos 仍在 alpha** | 模块6,7 | v0.2.0 早期版本。建议仅复用算法逻辑，不直接依赖其代码 |
| **Ontology-Learning 依赖 GPT-4o** | 模块2 | API 成本可能较高。备选：切换到本地 Llama-3.1 微调 |
| **模块3 无任何现成方案** | 模块3 | 建议 Phase 1 先跳过（或做简化版段落分类），Phase 2 再攻坚 |
| **npm 生态方案（GRD）** | 模块6,7 | 不适合 Python 为主的统一技术栈，仅借鉴设计思想 |

---

## 六、与之前模块报告的对比

| 之前推荐 | 本调研结论 | 变化 |
|:---|:---|:---|
| 模块1: Docling | 维持 + 增加 PaperQA2 作为上层 Q&A 封装 | **增强** |
| 模块2: SciBERT + LLM-IE 自建 | 可参考 Ontology-Learning 的 GPT-4o 抽取管线 | **加速** |
| 模块3: LLM Structured Output 自建 | 无变化（无现成方案） | 不变 |
| 模块4: Neo4j + LangChain | 可参考 Ontology-Learning 的完整 Neo4j 管线 | **加速** |
| 模块5: BERTopic + LLM 自建 | 可复用 Graphify 的社区检测 + 交互式可视化 | **加速** |
| 模块6: Open AI Co-Scientist | 可参考 Kosmos 假设生成 + Elo 排序 | **可选替代** |
| 模块7: MARS + Equilibrium | 可参考 Kosmos ScholarEval (8维) | **增强** |

---

*调研日期：2026-07-06 | 搜索来源：Google Web Search + GitHub + arXiv + npm*
