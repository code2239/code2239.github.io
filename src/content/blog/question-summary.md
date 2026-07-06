---
title: "咨询问题分类总结"
date: "2026-07-06"
tags: ["科研AI", "Program-0", "技术调研"]
summary: "咨询问题分类总结"
categories: ["program-0/questions"]
---


> 对话日期：2026-07-06  
> 主题：科研AI系统 · 技术可行性分析与开发路线图

---

## 一、能力边界确认（1 个问题）

| # | 问题 | 结论 |
|:---:|:---|:---|
| 1 | 你单次输出文本的上限是多少？ | ~32,000 token，完整报告需分多次输出 |

---

## 二、报告生成策略（3 次决策）

| # | 决策点 | 你的选择 |
|:---:|:---|:---|
| 2 | 搜索策略 | **C**：先搜索全部 7 个模块，再逐模块输出 |
| 3 | 输出格式 | **B**：每个模块独立 Markdown 文件，最后汇总 |
| 4 | 执行方案 | 批准 Phase 1→4 |

---

## 三、模块技术选型（7 个模块报告）

| 模块 | 推荐方案 | 许可证 |
|:---|:---|:---|
| 1. 文档理解 | Docling (IBM) + OpenDataLoader fallback | MIT / Apache 2.0 |
| 2. 信息抽取 | SciBERT (NER) + LLM-IE (关系抽取) | Apache 2.0 |
| 3. 实验流程 | LLM Structured Output 自建 | 自建 |
| 4. 知识图谱 | Neo4j Community + LangChain GraphRAG | GPLv3 |
| 5. 认知压缩 | BERTopic + LLM 增强聚类 | MIT |
| 6. 灵感生成 | Open AI Co-Scientist (LLNL) | MIT |
| 7. 多智能体评估 | MARS + Equilibrium + Elo | 方法复现 / MIT |

**集成方案**：单进程 LangGraph 管道，预留 4 个微服务拆分点。

---

## 四、已有开源方案复用（1 个深度调研）

| # | 问题 | 核心结论 |
|:---:|:---|:---|
| 5 | 各模块有没有现成的集成开源工程？ | **有。** 12 个候选方案。复用 6 个已有项目后，MVP 开发周期从 12 个月压缩至 **5 个月（节省 60%）** |

| 复用对象 | 覆盖模块 | 作用 |
|:---|:---|:---|
| PARNESS | 骨架 | YAML DAG 管线编排 |
| Docling + PaperQA2 | 模块1 | 文档解析 + RAG |
| Ontology-Learning | 模块2+4 | PDF→Neo4j 全链路 |
| Graphify (AI Research Toolkit) | 模块4+5 | 社区检测 + 图谱可视化 |
| Kosmos | 模块6+7 | 假设生成 + 8维评审 |

---

## 五、可观测性与调试（2 个问题）

| # | 问题 | 核心结论 |
|:---:|:---|:---|
| 6 | 如何做可视化？如何定位 bug？ | 三层体系：DAG 可视化（Dagster）→ LLM Trace（LangFuse）→ 数据快照（@snapshot）。15 项模块级健康检查 + Streamlit 仪表盘（~200 行 Python） |
| 7 | 能全部用开源免费的吗？ | **能。** LangSmith→LangFuse (MIT)，Datadog→Grafana+Prometheus。6 层全开源栈。**$0 软件费 + ~$40/月 VPS** |

---

## 六、开发者技能路线（1 个问题）

| # | 问题 | 核心结论 |
|:---:|:---|:---|
| 8 | 我应该掌握哪些工具和技能？ | **核心只 5 样**：LangGraph + Prompt Engineering + Neo4j+Cypher + Docker + Pydantic。其余 10+ 工具每样 1-3 天。总学习约 **8 周** |

---

## 七、系统定义（3 个问题）

| # | 问题 | 核心结论 |
|:---:|:---|:---|
| 9 | 有哪些功能？可扩展性如何？ | **7 大功能 + 1 基建**。扩展性：新增模块 ⭐⭐⭐⭐⭐、替换实现 ⭐⭐⭐⭐⭐、跨领域 ⭐⭐⭐⭐ |
| 10 | 输入输出是什么？能做桌面吗？ | **输入**：PDF + YAML 配置。**输出**：11 项（文档→实体→图谱→假设→评审）。桌面化：Phase 2 用 Tauri 包壳（+1 月） |
| 12 | 系统整体能实现什么？ | 一句话：**喂论文进去，吐出可验证的科研假设和同行评审报告**，附带知识图谱和可视化仪表盘 |

---

## 八、领域配置（2 个问题）

| # | 问题 | 核心结论 |
|:---:|:---|:---|
| 11 | 领域配置是什么？ | 一份 YAML，定义"关注什么实体、什么关系、怎么评审"。相当于系统的"学科眼镜"。**换领域 = 改 YAML = 5 分钟** |
| 12 | 数据该去哪里找？ | 各有免费权威来源：实体→UMLS/Wikidata/ChEBI，关系→ChemProt/GO，工具→bio.tools。**总计约 4 小时** |

---

## 产出文件清单

| 文件 | 大小 | 内容 |
|:---|:---:|:---|
| `final-report.md` | 6 KB | 执行摘要 + 结论 + 启动建议 |
| `integration-and-plan.md` | 18 KB | 集成方案 + 4阶段计划 + 5类风险评估 |
| `module-1-doc-understanding.md` | 11 KB | 文档理解：Docling 推荐 |
| `module-2-info-extraction.md` | 10 KB | 信息抽取：SciBERT+LLM-IE |
| `module-3-experiment-flow.md` | 9 KB | 实验流程：LLM Structured Output |
| `module-4-knowledge-graph.md` | 9 KB | 知识图谱：Neo4j+LangChain |
| `module-5-cognitive-compression.md` | 8 KB | 认知压缩：BERTopic+LLM |
| `module-6-inspiration-gen.md` | 7 KB | 灵感生成：Co-Scientist (LLNL/MIT) |
| `module-7-multi-agent-eval.md` | 7 KB | 多智能体评估：MARS+Equilibrium+Elo |
| `existing-solutions-survey.md` | 14 KB | 12 个已有开源方案调研 |
| `observability-debugging-guide.md` | 15 KB | 可视化+调试（全开源，含 docker-compose） |
| `developer-skills-roadmap.md` | 6 KB | 技能路线图（5 核心 + 10 周计划） |
| `input-output-desktop-feasibility.md` | 8 KB | IO定义 + 桌面应用分析（3条路线） |
| `domain-config-data-sources.md` | 7 KB | 领域配置数据来源地图 |
| `question-summary.md` | 本文 | 全部问题分类总结 |

---

*总结日期：2026-07-06*