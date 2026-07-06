---
title: "科研AI系统：开发者技能路线图"
date: "2026-07-06"
tags: ["科研AI", "Program-0", "技术调研"]
summary: "科研AI系统：开发者技能路线图"
categories: ["program-0"]
---


> 目标：一个人能独立开发、可视化、调试、部署整套 7 模块系统。
> 前提：已有基础 Python 编程能力。

---

## 一、技能全景图

```
                     ┌──────────────────────────┐
                     │      部署与运维            │
                     │  Docker · docker-compose   │
                     │  Linux 基础 · Git          │
                     └────────────┬─────────────┘
                                  │
    ┌─────────────────────────────┼─────────────────────────────┐
    │                             │                             │
┌───▼──────────┐    ┌─────────────▼───────────┐    ┌───────────▼──────────┐
│  数据处理层   │    │      AI/LLM 核心层       │    │   可观测性层          │
│              │    │                         │    │                       │
│ Docling API  │    │ LangChain / LangGraph   │    │ Dagster (管道编排)     │
│ JSON/Markdown│    │ HuggingFace Transformers│    │ LangFuse (LLM追踪)     │
│ Pydantic     │    │ Prompt Engineering      │    │ Grafana+Prometheus     │
│              │    │ Structured Outputs      │    │ Streamlit (仪表盘)     │
└──────────────┘    │ OpenAI/Anthropic API    │    └───────────────────────┘
                    │ Neo4j + Cypher          │
                    └─────────────────────────┘
```

**核心原则：不必精通所有，但必须理解每层的"最小可用子集"。**

---

## 二、分层学习路线

### 🔴 Tier 1 — 必须会（开工前，约 2 周）

| 技能 | 学到什么程度 | 检验标准 |
|:---|:---|:---|
| **Python 3.12+** | 装饰器、类型注解、async/await | 能写出 @snapshot 装饰器 |
| **LangChain / LangGraph** | StateGraph 定义节点和边、ChatModel 调用、StructuredOutput | 能定义 3 节点 DAG 并跑通 |
| **OpenAI / Anthropic API** | Chat Completions、JSON Mode、Batch API | 能用 structured output 提取论文实体 |
| **JSON / Pydantic** | BaseModel、Field、验证器 | 能定义 Entity/Relation/Hypothesis 数据模型 |
| **Git** | clone, commit, branch, merge | — |

---

### 🟡 Tier 2 — 开发中边做边学（约 3 周）

| 技能 | 对应模块 | 学到什么程度 | 预计 |
|:---|:---|:---|:---:|
| **Docling** | 模块1 | DocumentConverter API、输出格式选择 | 半天 |
| **HuggingFace Transformers** | 模块2 | AutoModelForTokenClassification、pipeline("ner")、SciBERT | 2天 |
| **Neo4j + Cypher** | 模块4 | MERGE、MATCH、CREATE、索引、LLMGraphTransformer | 3天 |
| **Prompt Engineering** | 模块2/3/5/6/7 | Few-shot、CoT、角色设定、Schema 约束 | 1周（持续迭代） |
| **BERTopic** | 模块5 | fit_transform、调参、离群点处理 | 1天 |
| **Streamlit** | 全局 | st.write、st.dataframe、st.columns、st.selectbox | 2天 |
| **Docker** | 部署 | Dockerfile、docker-compose.yml、volume 挂载 | 2天 |

---

### 🟢 Tier 3 — Phase 2+ 再学（约 3 周）

| 技能 | 用途 | 预计 |
|:---|:---|:---:|
| **Dagster** | 管道 DAG 可视化、资产谱系、运行历史 | 3天 |
| **LangFuse** | LLM Trace、Token 成本、Prompt 版本管理 | 2天 |
| **Grafana + Prometheus** | 时序指标、告警规则 | 3天 |
| **微调 LoRA/QLoRA** | 用标注数据微调 SciBERT 替代 API | 1周 |
| **FastAPI** | 将管道封装为 REST API | 2天 |
| **Neo4j GDS 库** | 图算法（中心度、社区检测、路径查找） | 2天 |

---

## 三、10 周学习与实践路线

```
Week 1   LangGraph 基础 + OpenAI Structured Output
         练手：输入论文摘要 → 输出 JSON 实体

Week 2   Docling + HuggingFace SciBERT
         练手：解析 10 篇 arXiv PDF，看 SciBERT 识别出多少实体

Week 3   Neo4j + LangChain GraphRAG
         练手：把 10 篇结果入图，在 Neo4j Browser 中浏览

Week 4   串联模块 1→2→4（第一个端到端管线）
         练手：一篇你熟悉的论文，验证图谱是否正确

Week 5   BERTopic + 基础认知压缩
         练手：50 篇论文主题聚类，看分出了哪些主题

Week 6   Co-Scientist 假设生成
         练手：生成 10 个假设，人工评估"值得做/不值得做"

Week 7   MARS 多智能体评审 + Elo 排序
         练手：比较 AI 评分和人工评估的一致性

Week 8   Streamlit 仪表盘 + 可视化集成
         练手：让同事用界面探索论文和假设

Week 9   Docker 容器化，docker-compose 一键启动
         练手：在另一台机器上 clone → compose up → 跑通

Week 10  集成测试 + 批量处理 50 篇论文 + 演示
```

---

## 四、你真正需要掌握的只有 5 样核心

| # | 核心技能 | 一句话 |
|:---:|:---|:---|
| 1 | **LangGraph** | 你的"操作系统"——所有 7 个模块在它上面运行 |
| 2 | **Prompt Engineering** | LLM 调用质量决定所有 AI 模块的上限 |
| 3 | **Neo4j + Cypher** | 知识图谱是系统的"记忆体"，Cypher 是访问它的语言 |
| 4 | **Docker** | 让所有东西在任何机器上一键启动 |
| 5 | **Pydantic** | 定义模块间输入/输出的 Schema，是模块间的"合同" |

> 其他所有工具（Docling、SciBERT、BERTopic、Co-Scientist、Streamlit、Dagster、LangFuse）都是围绕这 5 个核心的"插件"——每个学 1-3 天即可上手。

---

## 五、学习资源

### 官方文档（免费且最好）

| 学什么 | 入口 | 上手时间 |
|:---|:---|:---:|
| LangGraph | [langchain-ai.github.io/langgraph/tutorials](https://langchain-ai.github.io/langgraph/tutorials/) | 半天 |
| Docling | [ds4sd.github.io/docling](https://ds4sd.github.io/docling/) | 1小时 |
| Neo4j + LangChain | [neo4j.com/docs](https://neo4j.com/docs/) + LangChain Graph 教程 | 半天 |
| HuggingFace NLP | [huggingface.co/learn](https://huggingface.co/learn) | 2天 |
| Dagster | [docs.dagster.io/tutorial](https://docs.dagster.io/tutorial) | 2小时 |
| LangFuse | [langfuse.com/docs](https://langfuse.com/docs) | 1小时 |
| Streamlit | [docs.streamlit.io/get-started](https://docs.streamlit.io/get-started) | 1小时 |

### 开源项目参考（读代码比读文档快）

| 项目 | 学什么 | 关键文件 |
|:---|:---|:---|
| [Ontology-Learning](https://github.com/itssnehin/Ontology-Learning) | PDF→Neo4j 全链路 | `pipeline.py` |
| [Kosmos](https://github.com/jimmc414/Kosmos) | 假设生成 + Elo + Neo4j | `core/knowledge_graph.py` |
| [AI Research Toolkit](https://github.com/debug-zhuweijian/ai-research-toolkit) | Graphify 可视化 + 模块编排 | `graphify/` 目录 |
| [PaperQA2](https://github.com/Future-House/paper-qa) | 科学文献 RAG 工程实践 | `paperqa/agents/` |

---

*编写日期：2026-07-06*
