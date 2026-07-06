---
title: "科研AI系统：可视化与调试方案（全开源版）"
date: "2026-07-06"
tags: ["科研AI", "Program-0", "技术调研"]
summary: "科研AI系统：可视化与调试方案（全开源版）"
categories: ["program-0"]
---


> 所有推荐工具均为 **OSI 认证开源许可证**，可免费自托管，无商业依赖。

---

## 一、方案总览：6 层全开源可视化栈

```
┌─────────────────────────────────────────────────────────┐
│ 第 6 层：业务仪表盘       Streamlit (Apache 2.0)          │
│         论文列表 · 模块状态 · 健康告警 · 假设排名          │
├─────────────────────────────────────────────────────────┤
│ 第 5 层：知识图谱可视化    Neo4j Browser + Graphify (MIT) │
│         节点-边浏览 · 社区检测着色 · 交互式 HTML           │
├─────────────────────────────────────────────────────────┤
│ 第 4 层：指标监控          Grafana + Prometheus           │
│         延迟分布 · 吞吐量 · 错误率 · 资源使用              │
├─────────────────────────────────────────────────────────┤
│ 第 3 层：数据快照          自建 @snapshot (30行, 自持)     │
│         每个模块的输入/输出 · 版本化存储 · 可回溯           │
├─────────────────────────────────────────────────────────┤
│ 第 2 层：LLM 调用的 Trace   LangFuse (MIT)                │
│         Prompt → LLM → Response · Token 消耗 · 延迟分解    │
├─────────────────────────────────────────────────────────┤
│ 第 1 层：管道 DAG 编排      Dagster (MIT) 或 LangGraph     │
│         模块依赖图 · 运行状态着色 · 资产谱系                │
└─────────────────────────────────────────────────────────┘
```

**全部 6 层均可免费自托管，总成本 = 一台 8GB 内存的 VPS（约 $40/月）。**

---

## 二、逐层详解

### 第 1 层：管道 DAG 可视化 —— Dagster (MIT)

**LangGraph 管流程，Dagster 管可视化。** 二者互补：LangGraph 负责运行，Dagster 负责"让人看到".

```
Dagster 的资产谱系（Asset Lineage）视图：

         ┌──────────┐
         │ raw_pdf  │  ← 原始 PDF
         └────┬─────┘
              │
         ┌────▼─────┐
         │ docling  │  ← 模块1：DoclingDocument
         └────┬─────┘
              │
    ┌─────────┼─────────┐
    │         │         │
┌───▼───┐ ┌──▼───┐ ┌───▼──────┐
│entities│ │rels  │ │methods_md│  ← 模块2：实体+关系，模块3：Methods
└───┬───┘ └──┬───┘ └───┬──────┘
    │        │         │
┌───▼────────▼───┐ ┌──▼──────────┐
│   neo4j_kg     │ │  exp_dag    │  ← 模块4：图谱，模块3：DAG
└───────┬────────┘ └─────────────┘
        │
  ┌─────▼──────┐
  │ bertopic   │  ← 模块5：认知压缩
  └─────┬──────┘
        │
  ┌─────▼──────┐
  │ hypotheses │  ← 模块6：灵感生成
  └─────┬──────┘
        │
  ┌─────▼──────┐
  │  reviews   │  ← 模块7：多智能体评估
  └────────────┘
```

**集成方式（嵌入 Dagster，不改 LangGraph 逻辑）：**

```python
from dagster import asset, AssetExecutionContext
from langgraph.graph import StateGraph

@asset
def docling_output(context: AssetExecutionContext) -> dict:
    """模块1：文档解析"""
    result = docling.convert("paper.pdf")
    context.add_output_metadata({"paragraphs": len(result["paragraphs"])})
    return result

@asset
def entities_and_relations(context: AssetExecutionContext, docling_output: dict) -> dict:
    """模块2：信息抽取，依赖模块1的输出"""
    entities = scibert_ner(docling_output["markdown"])
    relations = llmie_extract(docling_output["markdown"], entities)
    context.add_output_metadata({"entities": len(entities), "relations": len(relations)})
    return {"entities": entities, "relations": relations}

@asset
def neo4j_knowledge_graph(entities_and_relations: dict) -> str:
    """模块4：写入 Neo4j"""
    written = write_to_neo4j(entities_and_relations)
    return f"Written {written} nodes"

# 启动：dagster dev → 浏览器打开 http://localhost:3000 → 看到上面的资产谱系图
```

**为什么选 Dagster 而非 Airflow/Prefect？**
| | Dagster | Airflow | Prefect |
|:---|:---:|:---:|:---:|
| DAG 可视化 | ✅ 原生资产谱系 | ✅ DAG 图 | ❌ 静态 Graphviz |
| 数据血缘追踪 | ✅ 自动追踪 | ❌ 无 | ❌ 无 |
| 许可证 | MIT | Apache 2.0 | Apache 2.0 |
| 学习曲线 | 中 | 高 | 低 |
| 适合本场景 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |

---

### 第 2 层：LLM 调用的 Trace —— LangFuse (MIT)

**LangSmith 的开源替代。** 2026年被 ClickHouse 收购，MIT 许可证不变。29,844 Stars。

**对比：**
| | LangFuse | LangSmith |
|:---|:---|:---|
| 许可证 | **MIT** | 闭源商业 |
| 自托管 | ✅ Docker 一键部署 | ❌ 仅企业版 |
| 免费额度 | **50K obs/月** (自托管=无限) | 5K traces/月 |
| 1M events/月成本 | **~$101** (云) / **$0** (自托管) | ~$2,514 |
| 框架绑定 | 无绑定（原生 OpenTelemetry） | LangChain/LangGraph |
| Prompt 管理 | ✅ | ✅ |
| 评估/数据集 | ✅ | ✅ |

**5 分钟自托管部署：**

```bash
# 克隆仓库
git clone https://github.com/langfuse/langfuse.git
cd langfuse

# Docker Compose 一键启动（Postgres + ClickHouse + Redis + LangFuse）
docker compose up -d

# 访问 http://localhost:3000
```

**Python 集成（仅需 3 行，替换 LangSmith）：**

```python
# 将之前的 LangSmith 3 行替换为这 3 行
os.environ["LANGFUSE_SECRET_KEY"] = "sk-lf-..."
os.environ["LANGFUSE_PUBLIC_KEY"] = "pk-lf-..."
os.environ["LANGFUSE_HOST"] = "http://localhost:3000"  # 自托管地址

# LangChain callback 自动生效，无需改任何业务代码
from langfuse.langchain import CallbackHandler
langfuse_handler = CallbackHandler()

# 在 LangChain/LangGraph 调用时传入
chain.invoke({"input": "..."}, config={"callbacks": [langfuse_handler]})
```

**Trace 视图效果：**

```
┌──────────────────────────────────────────────────────┐
│ 📄 paper_123.pdf                      [总耗时 28.1s]  │
│  ├─ ✅ Docling.convert()   [1.2s]   12段落 3表格      │
│  ├─ ✅ SciBERT NER         [0.8s]   47实体            │
│  │   └─ 📊 Token: 2,341 in → 156 out                  │
│  ├─ ✅ GPT-4o-mini RE      [2.1s]   31关系            │
│  │   └─ 📊 Token: 3,892 in → 412 out   Cost: $0.0007  │
│  ├─ ✅ Neo4j MERGE         [0.3s]   78节点写入         │
│  ├─ ⚠️ GPT-4o-mini Gap     [12s]   超时重试1次         │
│  │   └─ 📊 Token: 15,234 in → 89 out   Cost: $0.0023  │
│  └─ ✅ MARS Evaluate       [8s]    3假设评分完成       │
│      ├─ 📊 审稿人A: Token 4,201 → 234                  │
│      ├─ 📊 审稿人B: Token 4,198 → 256                  │
│      └─ 📊 Meta-Reviewer: Token 2,891 → 312            │
└──────────────────────────────────────────────────────┘
```

---

### 第 3 层：数据快照 —— 自建（30行代码，零依赖）

与之前方案相同，继续使用 `@snapshot` 装饰器。它不依赖任何外部服务，纯文件系统。

```python
# 代码见上一版本，此处省略
```

---

### 第 4 层：指标监控 —— Grafana + Prometheus（AGPLv3 / Apache 2.0）

当管道从"单篇论文处理"扩展到"批量处理 1000 篇"时，需要时序指标。

**监控的指标：**
- 每篇论文的总处理时间
- 每个模块的 P50/P95/P99 延迟
- 每小时处理的论文数（吞吐量）
- 错误率（按模块拆分）
- LLM API Token 消耗趋势
- Neo4j 查询延迟和连接池

**Prometheus 埋点（15行）：**

```python
from prometheus_client import Counter, Histogram, Gauge

# 定义指标
papers_processed = Counter('papers_total', 'Total papers processed', ['status'])
module_latency = Histogram('module_duration_seconds', 'Module latency', ['module'])
llm_tokens = Counter('llm_tokens_total', 'LLM token usage', ['model', 'direction'])
neo4j_nodes = Gauge('neo4j_total_nodes', 'Total nodes in KG')

# 在模块中埋点
@module_latency.labels(module="docling").time()
def run_docling(pdf_path):
    result = docling.convert(pdf_path)
    papers_processed.labels(status="success").inc()
    return result
```

**Grafana 仪表盘（JSON 导入即可）：**

| 面板 | 图表类型 | 内容 |
|:---|:---|:---|
| 论文处理吞吐量 | 时序折线图 | 每小时处理数 |
| 模块延迟分布 | 热力图 | 各模块 P50/P95/P99 |
| LLM 成本趋势 | 堆叠面积图 | Token 消耗 × 模型 |
| 错误率 | 状态时间线 | 按模块拆分 |
| KG 规模 | 单值 + 趋势 | 节点数/关系数增长 |

---

### 第 5 层：知识图谱可视化 —— Neo4j Browser + Graphify

**Neo4j Browser**（随 Community Edition 免费提供）：

```cypher
// 在 Neo4j Browser 中执行，直接看到交互式图
MATCH p=(gene:Gene {name: "TGFB1"})-[r*1..3]-(target)
RETURN p LIMIT 100
```

**Graphify**（来自 AI Research Toolkit，MIT）：

```python
# 导出为带社区检测着色的交互式 HTML
from graphify import GraphExporter
exporter = GraphExporter(neo4j_driver)
exporter.export_html(
    query="MATCH (n)-[r]->(m) RETURN n, r, m LIMIT 500",
    output="data/kg_2026-07-06.html",
    community_detection=True,   # Leiden 算法自动着色
    title="科研知识图谱 — TGF-β 信号通路"
)
```

**替代方案：**
| 工具 | 许可证 | 特点 |
|:---|:---|:---|
| **Cytoscape.js** | MIT | JS 库，可嵌入 Streamlit |
| **vis-network** | MIT | JS 库，力导向布局 |
| **Gephi** | GPLv3 | 桌面应用，大规模图分析 |

---

### 第 6 层：业务仪表盘 —— Streamlit (Apache 2.0)

（代码同上一版本，此处省略 Streamlit 100 行仪表盘代码）

---

## 三、全开源与半开源的对比

| 需求 | 商业方案 | 全开源方案 | 许可证 |
|:---|:---|:---|:---|
| 管道追踪 (Trace) | LangSmith | **LangFuse** | MIT |
| 管道 DAG 可视化 | LangGraph (无UI) | **Dagster** | MIT |
| LLM 调用监控 | LangSmith | **LangFuse** | MIT |
| 时序指标 | Datadog | **Grafana + Prometheus** | AGPLv3 / Apache 2.0 |
| 日志聚合 | Datadog | **Grafana Loki** (可选) | AGPLv3 |
| 图可视化 | Neo4j Aura | **Neo4j Community + Graphify** | GPLv3 / MIT |
| 业务仪表盘 | — | **Streamlit** | Apache 2.0 |
| 数据快照 | — | **自建 30行** | 自持 |
| 健康检查 | — | **自建 60行** | 自持 |

**全部加起来，自托管月成本：一台 8GB VPS + 200GB 磁盘 ≈ $40/月。**

---

## 四、部署方案：docker-compose 一键启动全部

```yaml
# docker-compose.yml — 科研AI系统可视化基础设施
version: '3.8'

services:
  # 1. 管道追踪
  langfuse:
    image: langfuse/langfuse:latest
    ports: ["3000:3000"]
    environment:
      DATABASE_URL: postgresql://postgres:postgres@postgres:5432/langfuse
      CLICKHOUSE_URL: http://clickhouse:8123
    depends_on: [postgres, clickhouse]

  # 2. 管道编排可视化
  dagster:
    image: dagster/dagster:latest
    ports: ["3001:3000"]
    volumes: ["./pipelines:/opt/dagster/app"]

  # 3. 指标监控
  prometheus:
    image: prom/prometheus:latest
    ports: ["9090:9090"]
    volumes: ["./prometheus.yml:/etc/prometheus/prometheus.yml"]

  grafana:
    image: grafana/grafana:latest
    ports: ["3002:3000"]
    environment:
      GF_AUTH_ANONYMOUS_ENABLED: "true"

  # 4. 知识图谱
  neo4j:
    image: neo4j:2025.06-community
    ports: ["7474:7474", "7687:7687"]
    environment:
      NEO4J_AUTH: neo4j/password

  # 5. 业务仪表盘
  streamlit:
    build: ./dashboard
    ports: ["8501:8501"]
    volumes: ["./data:/app/data"]

  # 基础设施
  postgres:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: postgres

  clickhouse:
    image: clickhouse/clickhouse-server:latest
```

**启动：**
```bash
docker compose up -d
# 然后访问：
# LangFuse:  http://localhost:3000  (管道 Trace)
# Dagster:   http://localhost:3001  (DAG 可视化)
# Grafana:   http://localhost:3002  (指标监控)
# Neo4j:     http://localhost:7474  (图谱浏览)
# Streamlit: http://localhost:8501  (业务仪表盘)
```

---

## 五、总结

| 你之前的担忧 | 全开源答案 |
|:---|:---|
| "没有 LangSmith 怎么追踪？" | LangFuse (MIT)，功能对等，自托管零成本 |
| "管道流程怎么可视化？" | Dagster (MIT)，原生资产谱系图，比 LangSmith 还直观 |
| "LLM 调用和成本怎么监控？" | LangFuse 自动记录每笔调用的 Token 和成本 |
| "知识图谱怎么可视化？" | Neo4j Browser 免费 + Graphify 导出交互式 HTML |
| "服务器指标怎么看？" | Grafana + Prometheus，业界标准 |
| "全部要多少钱？" | **$0 软件许可费 + ~$40/月 VPS = 纯开源** |

---

*更新日期：2026-07-06 | 基于 LangFuse 2026年被 ClickHouse 收购后的最新状态*
