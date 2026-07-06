---
title: "科研AI系统：输入输出定义 · 桌面应用可行性分析"
date: "2026-07-06"
tags: ["科研AI", "Program-0", "技术调研"]
summary: "科研AI系统：输入输出定义 · 桌面应用可行性分析"
categories: ["program-0"]
---


---

## 一、输入：你喂给它什么？

### 必选输入

| 输入 | 格式 | 说明 |
|:---|:---|:---|
| **科研论文** | PDF / DOCX / PPTX / HTML / LaTeX / 扫描件 | 单篇或批量拖入 |
| **领域配置** | YAML（一次性） | 定义关注的实体类型和关系类型 |

```yaml
# domain_config.yaml — 一次性配置
domain: biomedical
entity_types: [Gene, Protein, Compound, Disease, Method, Dataset, Pathway]
relation_types: [inhibits, activates, binds_to, treats, causes, expresses]
review_dimensions: [novelty, feasibility, methodological_rigor, potential_impact]
```

### 可选输入

| 输入 | 格式 | 用途 |
|:---|:---|:---|
| 实验数据 | CSV / Excel | 论文补充数据，增强认知压缩 |
| 科研笔记 | Markdown / 文本 | 个性化假设生成 |
| 已有知识库 | RDF / OWL / Neo4j dump | 导入已有领域图谱 |
| 人工反馈 | UI 操作 | 对假设点赞/踩，反馈到 Elo 系统 |

### 输入生命周期

```
拖入 PDF → 模块1 解析 → 模块2 抽取 → 模块4 入图谱
                                          ↓
          （更多论文 → 图谱增长 → 模块5 认知压缩 → 模块6 假设 → 模块7 评审）
```

---

## 二、输出：你从它那里得到什么？

### 11 项输出清单

| # | 输出 | 格式 | 模块 | 用途 |
|:---:|:---|:---|:---:|:---|
| 1 | 结构化文档 | Markdown + JSON（段落/表格/公式） | 1 | 替代手动阅读 |
| 2 | 实体列表 | JSON（类型/位置/置信度） | 2 | 快速定位关键实体 |
| 3 | 关系三元组 | JSON（含来源段落编号） | 2 | 知识图谱原料 |
| 4 | 实验步骤 DAG | JSON + Mermaid.js 可视化 | 3 | 复现实验 |
| 5 | 知识图谱 | Neo4j 数据库 | 4 | 跨论文知识网络 |
| 6 | 图谱可视化 | 交互式 HTML（社区着色） | 4 | 一眼看到知识结构 |
| 7 | 主题聚类报告 | JSON（簇/主题词/代表论文） | 5 | 领域全景图 |
| 8 | 矛盾/空白报告 | JSON（矛盾/空白/趋势） | 5 | 决定下一步研究方向 |
| 9 | 假设排名列表 | JSON（排序/评分/证据） | 6 | 指导实验设计 |
| 10 | 评审报告 | JSON（多维度评分/审稿意见） | 7 | 筛选高价值假设 |
| 11 | 管道健康报告 | Streamlit 仪表盘 | 全局 | 确认系统正常 |

### 单篇论文的完整输出目录

```
data/paper_tgfb_2025/
├── 00_raw.pdf
├── 01_docling_output.json          # 结构化文档
├── 02a_scibert_entities.json       # 47个实体
├── 02b_llmie_relations.json        # 31条关系
├── 03_experiment_dag.json + .html  # 实验DAG + 可视化
├── 04_neo4j_import_log.json        # 入库日志
├── 05_bertopic_cluster.json        # 归入簇 #7
├── 06_hypotheses.json              # 3个假设
├── 07_review_report.json           # 评审报告
└── _pipeline_metadata.json         # 耗时/版本/状态
```

---

## 三、桌面应用可行性：三条路线

### 核心矛盾

你的系统依赖多个服务进程，不是单个可执行文件：

| 服务 | 内存 | 是否必须 |
|:---|:---:|:---:|
| Python 管道进程 | 4-16 GB | ✅ 核心 |
| Neo4j 图数据库 (Java) | 2-8 GB | ✅ 核心 |
| LangFuse | 1-2 GB | 🔶 可降级 |
| Dagster | 1 GB | 🔶 可降级 |
| Prometheus + Grafana | 1.5 GB | 🔶 Phase 2 |
| Streamlit | 0.5 GB | 🔶 可嵌入桌面壳 |

```
路线 A                           路线 B                         路线 C
壳子包装 (推荐 MVP)               瘦客户端+云端                  纯桌面 (最理想最贵)
┌────────────────────┐     ┌──────────────────┐         ┌──────────────────────┐
│ Tauri / Electron   │     │ Tauri + 前端 UI  │         │ 原生桌面              │
│ ┌────────────────┐ │     │ ┌──────────────┐ │         │ Python embedded      │
│ │ Streamlit UI   │ │     │ │ Vue/React UI │ │         │ Neo4j→SQLite(轻量)   │
│ └───────┬────────┘ │     │ └──────┬───────┘ │         │ Cytoscape.js 可视化   │
│ ┌───────▼────────┐ │     │ ┌──────▼───────┐ │         │ 全功能本地            │
│ │ Docker Desktop │ │     │ │ REST API     │ │         │ 100% 离线            │
│ │ 后台运行全部   │ │     │ │ 云端 GPU     │ │         │ 零配置                │
│ │ 7 个服务       │ │     │ └──────────────┘ │         │ 安装包 ~500 MB        │
│ └────────────────┘ │     │ 客户端极轻·可协作│         │ 需 16GB+ 内存         │
│ 开发成本：最低     │     └──────────────────┘         └──────────────────────┘
└────────────────────┘
```

### 路线对比

| 维度 | A: 壳子包装 | B: 瘦客户端 | C: 纯桌面 |
|:---|:---:|:---:|:---:|
| 开发成本 | ⭐⭐⭐⭐⭐ 最低 | ⭐⭐⭐ | ⭐ 最高 |
| 离线可用 | 首次联网拉镜像 | ❌ 需联网 | ✅ 完全离线 |
| 用户安装难度 | 需 Docker Desktop | 无需任何依赖 | 双击安装 |
| 性能上限 | 全功能 | 云端 GPU 更强 | 受限于本地硬件 |
| 多用户协作 | ❌ | ✅ 天然支持 | ❌ |
| 隐私 | ✅ 全本地 | ⚠️ PDF 上传云端 | ✅ 全本地 |
| 安装包大小 | ~200 MB + Docker | ~20 MB | ~500 MB |

---

## 四、推荐分阶段路线

```
Phase 1（3 个月）Web 优先
  └─ Streamlit Web UI，浏览器访问 localhost:8501
  └─ 功能已可用，只是不像"桌面应用"

Phase 2（+1 个月）桌面壳
  └─ Tauri 壳 + 内嵌 Streamlit
  └─ 自动管理 docker-compose 启停
  └─ 系统托盘图标 + 通知
  └─ 用户感受：双击图标 → 窗口 → 和 Web 版一模一样

Phase 3（+3 个月）云+端混合
  └─ Tauri + 原生前端 UI (Vue)
  └─ 本地模式：SQLite + Cytoscape.js (<100篇)
  └─ 云端模式：一键切换远程 GPU

Phase 4（+6 个月）纯桌面
  └─ Nuitka 编译 Python → 单文件 exe
  └─ 所有服务进程内嵌
  └─ 完全离线，双击即用
```

---

## 五、一句话总结

| 问题 | 答案 |
|:---|:---|
| 输入 | PDF/DOCX 论文 + 领域配置 YAML + 可选数据/笔记/已有图谱 |
| 输出 | 结构化文档 · 知识图谱 · 实验DAG · 认知地图 · 排序假设 · 评审报告 · 健康仪表盘 |
| 能做桌面吗 | ✅ 能。推荐先用 Web 版跑通 MVP，+1 个月加 Tauri 壳，就能体验"桌面应用"的感觉 |

---

*编写日期：2026-07-06*