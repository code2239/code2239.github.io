---
title: "科研AI系统 · 技术可行性分析报告"
date: "2026-07-06"
tags: ["科研AI", "Program-0", "技术调研"]
summary: "科研AI系统 · 技术可行性分析报告"
categories: ["program-0"]
---


---

## 第一章：执行摘要

### 系统目标
构建一个从科研论文（PDF）到科研灵感（可验证假设）的全自动 AI 系统。输入为 PDF/文档，输出为知识图谱、实验流程图、研究空白地图、排序后的科研假设及多智能体评审结果。

### 总体可行性结论
**✅ 条件性启动——技术可行，建议立即启动 MVP 开发。**

所有 7 个核心模块均找到了 ≥3 个可验证的候选技术。关键路径上的模块（1-文档理解、2-信息抽取、4-知识图谱）技术成熟度高，开源可用性强。瓶颈模块（3-实验流程抽取、5-认知压缩）虽部分候选技术未开源，但 LLM 自建方案可替代。

### 建议总工期
**12–15 个月** 从 MVP 到完整系统（Phase 1–3），Phase 4 为持续优化阶段。

---

## 第二章：模块级推荐技术汇总

| 模块 | 推荐方案 | 许可证 | 来源链接 |
|:---|:---|:---|:---|
| **1. 文档理解** | Docling (IBM) + 双引擎 fallback OpenDataLoader PDF | MIT / Apache 2.0 | [GitHub](https://github.com/DS4SD/docling) |
| **2. 信息抽取** | SciBERT (NER) + LLM-IE (关系抽取) | Apache 2.0 / API | [GitHub](https://github.com/allenai/scibert) |
| **3. 实验流程** | LLM Structured Output 自建管线 | 自建 MIT | [OpenAI Structured Outputs](https://platform.openai.com/docs/guides/structured-outputs) |
| **4. 知识图谱** | Neo4j Community Ed. + LangChain GraphRAG | GPLv3 | [Neo4j](https://neo4j.com/product/community-edition/) |
| **5. 认知压缩** | BERTopic + LLM 增强聚类 | MIT | [GitHub](https://github.com/MaartenGr/BERTopic) |
| **6. 灵感生成** | Open AI Co-Scientist (LLNL) | MIT | [GitHub](https://github.com/LLNL/open-ai-co-scientist) |
| **7. 多智能体评估** | MARS 架构 + Equilibrium 校准 + Co-Scientist Elo | 方法复现 / MIT | [HuggingFace](https://huggingface.co/papers/2509.20502) |

---

## 第三章：技术栈总览（Unified Tech Stack）

### 基础设施层
| 组件 | 选型 | 许可证 |
|:---|:---|:---|
| 编程语言 | Python 3.12+ | PSF |
| 编排框架 | LangChain + LangGraph | MIT |
| 图数据库 | Neo4j 2025.06 Community Ed. | GPLv3 |
| 向量数据库 | Qdrant (Phase 2+) | Apache 2.0 |
| 容器化 | Docker + docker-compose | Apache 2.0 |
| LLM API | OpenAI (GPT-5.4-mini/nano) + Claude (Haiku) | 商业 |
| 本地模型 | SciBERT, Flan-T5, Llama-3.1 (Phase 3) | Apache 2.0 |

### 数据流格式
- **模块间格式**：JSON (Python dict) + DoclingDocument
- **图谱查询**：Cypher
- **LLM 接口**：OpenAI-compatible Chat API
- **输出**：JSON + Markdown + Mermaid.js DAG

---

## 第四章：分阶段路线图速览

| 阶段 | 时间 | 目标 | 核心技术 | 月成本(硬件+API) |
|:---|:---|:---|:---|:---|
| **Phase 1 MVP** | 0–3 月 | PDF→图谱→基础假设 | Docling + SciBERT + Neo4j + Co-Scientist 简化版 | ~$830 |
| **Phase 2 扩展** | 3–6 月 | 完整管线 + 认知压缩 | + 实验DAG + BERTopic + MARS 评审 | ~$1,600 |
| **Phase 3 集成** | 6–12 月 | 灵感→评估 全闭环 | + 跨学科迁移 + GraphRAG 全局检索 + API | ~$6,000 |
| **Phase 4 优化** | 12 月+ | 自训练模型 + 大规模 | 微调替代API + 分布式 + 实时监控 | ~$8,200 |

---

## 第五章：关键风险与缓解优先级

| 优先级 | 风险 | 缓解措施 |
|:---:|:---|:---|
| **P0** | LLM 幻觉导致不可信输出 | 证据溯源 + KG 事实校验 + 10% 人工抽检 |
| **P0** | 实验流程抽取质量不达标 | LLM 自建 fallback + 准备人工标注数据 |
| **P1** | AI 审稿分数膨胀无区分度 | 标定实验量化偏差 + 使用 Elo 相对排序 |
| **P1** | PDF 格式多样性导致解析失败 | 双引擎 fallback + 格式白名单 |
| **P2** | 许可证合规（GPLv3/AGPL） | Phase 3 前法律审查 + 准备替代方案 |
| **P2** | LangChain 版本 API 变动 | 版本冻结 + 自建抽象层 |

---

## 第六章：结论与启动建议

### 建议：✅ 立即启动 Phase 1 MVP

**启动前确认事项：**
1. ☐ 确定目标科研领域（建议先聚焦 1 个学科，如"生物信息学"或"材料科学"）
2. ☐ 确认团队配备（至少 1 名 AI/NLP 工程师 + 1 名后端工程师 + 1 名兼职领域科学家）
3. ☐ 申请 LLM API 额度（OpenAI Batch API + Anthropic API）
4. ☐ 准备 GPU 服务器（1× RTX 4090，部署 Docling + SciBERT）
5. ☐ 收集第一批种子论文（建议 50-100 篇目标领域的代表性 PDF）

**MVP 交付时间线：**
- 第 1-2 周：环境搭建（Docling + SciBERT + Neo4j + LangChain）
- 第 3-6 周：模块1+2+4 串联（PDF→Markdown→实体/关系→图谱）
- 第 7-10 周：模块5 基础版（BERTopic 聚类 + 简单缺口检测）
- 第 11-12 周：模块6 简化版（Co-Scientist Generation + Ranking）
- 第 13 周：集成测试 + Streamlit UI + 领域科学家评估

### 不建议立即启动的情况：
- 如果团队中没有 NLP/ML 工程经验的人员
- 如果目标领域没有可用的 PDF 论文资源（或以扫描件为主）
- 如果对 LLM API 成本的月度预算 < $100

---

## 附录：全部模块报告索引

| 文件 | 模块 | 推荐方案 |
|:---|:---|:---|
| [module-1-doc-understanding.md](module-1-doc-understanding.md) | 文档理解 | Docling (MIT) |
| [module-2-info-extraction.md](module-2-info-extraction.md) | 信息抽取 | SciBERT + LLM-IE |
| [module-3-experiment-flow.md](module-3-experiment-flow.md) | 实验流程抽取 | LLM Structured Output |
| [module-4-knowledge-graph.md](module-4-knowledge-graph.md) | 知识图谱 | Neo4j + LangChain |
| [module-5-cognitive-compression.md](module-5-cognitive-compression.md) | 认知压缩 | BERTopic + LLM |
| [module-6-inspiration-gen.md](module-6-inspiration-gen.md) | 灵感生成 | Open AI Co-Scientist |
| [module-7-multi-agent-eval.md](module-7-multi-agent-eval.md) | 多智能体评估 | MARS + Equilibrium + Elo |
| [integration-and-plan.md](integration-and-plan.md) | 集成方案 + 分阶段计划 + 风险评估 | — |

---

*报告生成时间：2026-07-06*  
*搜索来源：Google Web Search + GitHub + arXiv + HuggingFace + PubMed + 学术会议论文集（AAAI, ACL, EMNLP, ICML, CLEF）*  
*所有技术方案均已附可验证的来源链接，详见各模块报告*
