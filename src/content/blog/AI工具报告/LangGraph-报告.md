---
title: "LangGraph 调研报告"
date: "2026-7-5"
tags: ["AI","调研","LangGraph","自动化","工具","科研"]
categories: ["ai-tools"]
summary: "- **开发方全称**：LangChain Inc."
---

# LangGraph 调研报告

> **调研日期**：2026年7月5日

---

## 1. 开发者与公司背景

- **开发方全称**：LangChain Inc.
- **所属国家/地区**：美国加州旧金山（San Francisco, CA）
- **创始人基本信息**：
  - **Harrison Chase** — 联合创始人 & CEO。本科毕业于哈佛大学，主修数学与计算机科学。曾任职于 **Robust Intelligence**（AI 安全初创公司）担任 ML 工程师。2022年10月以业余项目形式创建 LangChain，项目在发布后八周内成为 GitHub 增长最快的仓库。被公认为"AI Agent 框架"类别的开创者。
  - **Ankush Gola** — 联合创始人，与 Harrison Chase 共同创立 LangChain Inc.，深度参与 LangChain 和 LangGraph 的架构设计。
- **团队规模**：未公开具体数字，但公司已获得 Benchmark、Sequoia Capital、IVP 等顶级风投投资，预计团队在 100-200 人规模。
- **盈利情况**：采用 **开源核心 + 商业平台（LangSmith）** 模式盈利。LangSmith 商业化收入支撑公司运营，企业客户包括 Elastic、GitLab、Rakuten、Morningstar 等。LangChain 框架累计下载量已超过 **10 亿次**，LangSmith 处理了 **150 亿条追踪记录和 100 万亿 tokens**，服务于 300+ 企业客户。
- **融资情况**：
  - **Seed 轮**：Benchmark 领投（金额未披露）
  - **Series A**：约 **$3500 万**，Sequoia Capital 领投，估值约 **$2 亿**（2023年5月）
  - **Series B**：IVP 领投（金额未披露）
- **发展规划**：2026年3月与 **NVIDIA** 宣布企业级 AI Agent 平台合作，加速 LangGraph 执行引擎；推出 **Deep Agents**（长运行工作负载框架）并排名深度研究基准 #1；愿景是成为企业 AI Agent 时代的核心基础设施。
- **网站/主页**：
  - LangChain 官网：[https://www.langchain.com](https://www.langchain.com)
  - LangGraph GitHub：[https://github.com/langchain-ai/langgraph](https://github.com/langchain-ai/langgraph)
  - LangSmith：[https://smith.langchain.com](https://smith.langchain.com)

> **信息源**：[IVP 投资页面](https://www.ivp.com/content/langchain-the-platform-for-the-enterprise-ai-agent-era/) | [Taskade 历史总结](https://www.taskade.com/blog/langchain-history) | [LangChain 官网](https://www.langchain.com) | [NVIDIA 合作公告](https://www.langchain.com/blog/nvidia-enterprise)

---

## 2. 底层技术栈

LangGraph 是一个 **AI 原生**的智能体编排框架，其核心技术栈如下：

### 基础大模型

LangGraph **不绑定任何大模型**，它是一个通用编排层，可以调用任何 LLM 提供商：
- **OpenAI**（GPT-4o、GPT-5.x、o-series）
- **Anthropic**（Claude 3.5/4.x/5）
- **Google**（Gemini 2.5 Pro、Gemini 3.x）
- **开源模型**（Llama、Qwen、DeepSeek 等通过 Ollama/vLLM）
- **任何兼容 OpenAI 协议的端点**
> LangGraph 本身不调用大模型——它通过 LangChain 的 Model I/O 抽象层与各类模型交互，或直接通过 provider SDK 调用。

### 自研大模型

**否**。LangGraph 不提供自研大模型，其核心竞争力在于**编排框架**而非模型能力。

### 是否支持用户自己使用 API 调用大模型

**是**。用户需要自带 LLM API Key，LangGraph 通过 LangChain 的模型抽象层调用。

### 核心技术架构

| 层级 | 技术 | 说明 |
|:---|:---|:---|
| **编排引擎** | **StateGraph** | 有状态的图结构引擎，支持节点、边、条件路由、循环 |
| **图执行** | Pregel 风格 | 受 Google Pregel 和 Apache Beam 启发，支持节点级并行 |
| **状态持久化** | Checkpointer | SQLite / Postgres 后端，支持时间旅行调试 |
| **流式处理** | Streaming API v3 | 内容块级协议，支持 run.values / messages / lifecycle / subgraphs 四种投影 |
| **语言支持** | Python + TypeScript/JavaScript | 双语言 SDK，API 语义一致 |

### 核心能力

| 能力 | 描述 |
|:---|:---|
| **循环/图** | 智能体可循环回退（如搜索结果不足时重新检索） |
| **条件分支** | `add_conditional_edges` 基于运行时状态路由执行 |
| **持久化状态** | TypedDict 状态模式 + Checkpointer（SQLite / Postgres） |
| **人机交互** | `interrupt()` 原语暂停图执行，数小时/天后恢复 |
| **子图** | 将专用智能体作为一等节点组合到父图中 |
| **并行扇出** | `Send()` 原语实现并发节点执行 |

> **信息源**：[LangGraph 官方文档](https://langchain-ai.github.io/langgraph/) | [FutureAGI 指南](https://futureagi.com/glossary/langgraph/) | [What is LangGraph 2026](https://futureagi.com/blog/what-is-langgraph-2026/) | [LangGraph v1.2 深度解析](https://dev.to/x4nent/langgraph-12-deep-dive-per-node-timeouts-error-handlers-graceful-shutdown-deltachannel--2mp2)

---

## 3. 开源属性与商业模式

### 开源属性

| 产品 | 开源状态 | 协议 | 说明 |
|:---|:---|:---|:---|
| **LangGraph Core** | ✅ 完全开源 | **MIT** | Python 和 JS SDK 免费使用 |
| **LangChain Core** | ✅ 完全开源 | MIT | 高层面向 LLM 应用的框架 |
| **LangSmith** | ❌ 闭源 | 专有 | 可观测性/测试/监控/部署平台 |
| **LangGraph Platform** | ⚠️ 核心开源 + 托管服务 | MIT + 付费托管 | 自托管免费，云托管收费 |

### 定价模式（2026年最新）

#### LangGraph 核心库 — **免费**（MIT 协议）
- 无使用限制，自托管
- 可用于任何场景（个人、商业、企业）

#### LangGraph Platform（托管服务）

| 套餐 | 价格 | 主要特点 |
|:---|:---|:---|
| **Developer** | **免费** | 自托管 Lite 容器，最多 100 万节点/年 |
| **Plus** | **$39/用户/月** + $0.001/节点 + 待机费 | 云端 SaaS，最多10用户，cron调度，缓存 |
| **Enterprise** | **定制报价** | 自托管/混合/云，SSO/RBAC，SOC2，SLA |

#### LangSmith（商业可观测性平台）

| 套餐 | 价格 | 追踪记录 | 保留期 |
|:---|:---|:---|:---|
| **Developer** | **免费** | 5,000条/月 | 14天 |
| **Plus** | **$39/用户/月** | 10万条/月（超额 $0.50/千条） | 400天 |
| **Enterprise** | **定制报价**（年付） | 无限 | 自定义 |

> **典型企业成本**：自托管 Enterprise 通常 **$10万+/年**（社区报告参考）

### 商业模式总结

**开源核心（LangGraph/LangChain）吸引开发者 → 商业平台（LangSmith）变现 → 企业级托管（LangGraph Platform）增值。** 这一模式类似 MongoDB 或 GitLab 的"Open Core"策略。

> **信息源**：[LangGraph 平台定价](https://agentsapis.com/langchain/langgraph-pricing/) | [LangSmith 定价](https://pecollective.com/tools/langchain-pricing/) | [ZenML 定价分析](https://www.zenml.io/blog/langgraph-pricing) | [LangChain 定价](https://techjacksolutions.com/ai-tools/langchain/langchain-pricing/)

---

## 4. 功能全景解析

### 主要功能

> 一个**有状态、可循环、支持人机交互的图结构智能体编排框架**，用于构建复杂的、持久化的多智能体协作工作流。目标用户为 AI 应用开发者、智能体工程师和需要生产级编排的企业团队。

### 核心功能与核心技术

#### ① StateGraph：有状态图引擎（核心创新）

LangGraph 的核心是 `StateGraph`——一个有向图结构的状态机。节点（Node）执行逻辑，边（Edge）定义数据流向，条件边（Conditional Edge）根据运行时状态动态路由。

- **关键技术**：受 **Google Pregel** 和 **Apache Beam** 启发的大规模图计算模型
- **独特价值**：支持**循环**（智能体可自反馈）、**条件分支**、**并行扇出**
- **参考文献**：[LangGraph 概念文档](https://langchain-ai.github.io/langgraph/concepts/high_level/)

#### ② Checkpointer：持久化与时间旅行调试

每个图执行步骤的状态可序列化存储到 SQLite 或 Postgres。支持：
- **故障恢复**：执行中断后可从中断点恢复
- **时间旅行调试（Time-Travel Debugging）**：回退到任意历史检查点，修改状态后重放
- **人机交互（Human-in-the-Loop）**：`interrupt_before` 在指定节点前暂停，等待人工审批后继续

- **关键技术**：基于 TypedDict 的状态模式 + 序列化检查点机制
- **参考文献**：[LangGraph 持久化文档](https://langchain-ai.github.io/langgraph/concepts/persistence/)

#### ③ 子图（Subgraph）组合

子图可作为一等节点嵌入父图，实现模块化的智能体组合。支持不同团队的专用智能体作为"微服务"独立开发后组合到超级图中。

- **关键技术**：图的递归组合（Recursive Graph Composition）

#### ④ 流式处理 v3（Streaming API v3）

2026年5月 v1.2.0 引入的第三代流式 API，支持四种投影模式：
| 投影 | 说明 |
|:---|:---|
| `run.values` | 完整的运行状态快照 |
| `run.messages` | ChatModel 流（文本、推理过程、工具调用、用量） |
| `run.lifecycle` | 节点生命周期事件 |
| `run.subgraphs` | 子图的独立流 |

- **参考文献**：[LangGraph v1.2 流式文档](https://dev.to/x4nent/langgraph-12-deep-dive-per-node-timeouts-error-handlers-graceful-shutdown-deltachannel--2mp2)

#### ⑤ 节点级容错（v1.2，2026年5月）

每个节点可独立配置：
- **超时策略**：`run_timeout`（硬限时）+ `idle_timeout`（空闲超时，流式 LLM 适用）
- **重试策略**：`RetryPolicy(max_attempts=3)`
- **错误处理器**：Saga 补偿模式——节点失败时执行补偿逻辑（如支付失败后释放库存）
- **优雅关闭**：`request_drain()` 保存可恢复检查点，用于部署安全重启

#### ⑥ Send() 并行扇出

`Send()` 原语允许将图执行自动并行化到多个节点，每个节点接收自定义状态切片。比传统 map-reduce 更灵活。

#### ⑦ 与 LangChain 的互补关系

| 对比项 | LangChain | LangGraph |
|:---|:---|:---|
| 定位 | 高阶 Agent 框架 | 低阶编排运行时 |
| 架构 | 线性 LCEL 管道 | 有状态循环图 |
| 控制粒度 | 抽象封装 | 完全透明 |
| 适用场景 | RAG、单轮工具调用 | 复杂多步、持久化工作流 |

> **关键事实**：自 2025年10月 v1.0 GA 起，LangChain 的 `create_agent` 函数底层运行在 LangGraph 的执行引擎上——两者是非竞争性的互补关系。

> **信息源**：[LangGraph 官方教程](https://langchain-ai.github.io/langgraph/tutorials/) | [LangGraph v1.2 深度解析](https://dev.to/x4nent/langgraph-12-deep-dive-per-node-timeouts-error-handlers-graceful-shutdown-deltachannel--2mp2) | [LangChain vs LangGraph 对比](https://atlan.com/know/ai-agent/ai-agent-memory/langchain-vs-langgraph/) | [FutureAGI 指南](https://futureagi.com/glossary/langgraph/)

---

## 5. 功能实现案例

### 案例：构建一个带人工审批的客户支持智能体

**场景**：电商平台的退款处理工作流——需要 AI 自动判断退款资格，但超过 $500 的退款需要人工经理审批。

**代码实现**（简化版）：

```python
from typing import TypedDict, Literal
from langgraph.graph import StateGraph, START, END
from langgraph.checkpoint.memory import MemorySaver

# 定义状态模式
class RefundState(TypedDict):
    order_id: str
    amount: float
    reason: str
    customer_tier: str  # "normal" | "vip"
    eligibility: str | None
    approved: bool | None

# 节点 1：自动核查退款资格
def check_eligibility(state: RefundState) -> dict:
    if state["amount"] <= 500:
        return {"eligibility": "auto_approved"}
    else:
        return {"eligibility": "needs_review"}

# 节点 2：执行退款（自动化）
def process_refund(state: RefundState) -> dict:
    print(f"💸 已处理订单 {state['order_id']} 退款 ${state['amount']}")
    return {"approved": True}

# 节点 3：人工审批（人机交互中断点）
def human_approval(state: RefundState):
    print(f"⚠️ 需要人工审批：订单 {state['order_id']} 退款 ${state['amount']}")
    # interrupt_before 会在此暂停，等待外部输入
    return {}

# 条件边：根据资格决定路由
def route_after_check(state: RefundState) -> Literal["human_approval", "process_refund"]:
    if state["eligibility"] == "needs_review":
        return "human_approval"
    return "process_refund"

# 构建图
builder = StateGraph(RefundState)
builder.add_node("check_eligibility", check_eligibility)
builder.add_node("process_refund", process_refund)
builder.add_node("human_approval", human_approval)

builder.add_edge(START, "check_eligibility")
builder.add_conditional_edges("check_eligibility", route_after_check)
builder.add_edge("human_approval", "process_refund")
builder.add_edge("process_refund", END)

# 编译（带内存检查点，支持人机交互恢复）
graph = builder.compile(checkpointer=MemorySaver())

# 执行
result = graph.invoke(
    {"order_id": "ORD-12345", "amount": 1200, "reason": "商品破损", "customer_tier": "vip"},
    config={"configurable": {"thread_id": "refund-12345"}}
)
```

**执行流程**：

1. `check_eligibility` 节点运行 → 金额 $1200 > $500 → `eligibility="needs_review"`
2. 条件边路由到 `human_approval` 节点
3. **人机交互中断**：系统暂停，等待经理确认或拒绝
4. 经理通过 API / UI 提交审批结果
5. 从断点恢复 → 继续到 `process_refund` → 执行退款
6. 整个执行过程记录到检查点，可随时回放审计

**结果**：一个可审计、可中断、可恢复的智能体工作流，自动处理简单退款，人工处理复杂退款。

> **参考**：[LangGraph 人机交互教程](https://langchain-ai.github.io/langgraph/tutorials/human_in_the_loop/) | [LangGraph 快速入门](https://langchain-ai.github.io/langgraph/tutorials/introduction/)

---

## 6. 主要竞品清单

| 竞品 | 开发商 | 定位 | 优势 | 劣势 |
|:---|:---|:---|:---|:---|
| **CrewAI** | CrewAI Inc. | 角色化多智能体协作框架（Agent + Task + Crew） | 上手极快，YAML 配置，角色化抽象直观 | token 消耗高（2-3x），控制粒度不如 LangGraph |
| **AutoGen（AG2）** | Microsoft | 会话式多智能体框架（GroupChat） | 原生 UserProxyAgent，Azure 集成 | ⛔ **2025年底已进入维护模式**，不推荐新项目使用 |
| **Microsoft Agent Framework（MAF）** | Microsoft | AutoGen 的官方继承者 | 图工作流 + 多智能体模式，Azure 原生 | 较新，社区不如 LangGraph 活跃 |
| **OpenAI Agents SDK** | OpenAI | 智能体循环 + 交接（Handoffs） | OpenAI 生态原生，简单易用 | 强绑定 OpenAI，灵活性不足 |
| **Claude Agent SDK** | Anthropic | 单智能体循环 + 子智能体 | Anthropic 原生，工具使用强大 | 不适用于复杂的图编排场景 |
| **Temporal** | Temporal Technologies | 通用持久化工作流引擎 | 企业级可靠性，10年+生产验证 | 非 AI 专用，无 LLM 抽象层 |
| **n8n** | n8n GmbH | 可视化工作流自动化平台 | 低代码/无代码，400+ 集成 | 非 AI 原生，图执行能力有限 |
| **Dify** | Dify Inc. | LLMOps 可视化平台 | 可视化编排，内置 RAG，生态丰富 | 侧重应用层，底层图控制不如 LangGraph |

> **信息源**：[Zenodo 编排框架对比](https://zenodo.org/records/19109057) | [FutureAGI 三方对比](https://futureagi.com/blog/crewai-vs-langgraph-vs-autogen-2026/) | [RaftLabs 框架对比](https://www.raftlabs.com/blog/ai-agent-framework-comparison) | [n8n vs LangGraph](https://agentmodeai.com/compare/n8n-vs-langgraph-vs-temporal/)

---

## 7. 与竞品的横向比较

| 对比维度 | **LangGraph** | **CrewAI** | **AutoGen（已维护模式）** | **OpenAI Agents SDK** | **Microsoft Agent Framework** |
|:---|:---|:---|:---|:---|:---|
| **价格** | 核心免费 + 托管 $39/月起 | 开源免费 + 云服务 $29/月起 | 开源免费 | 开源免费（需 OpenAI API） | 开源免费（需 Azure） |
| **性能/Token 效率** | ✅ **最佳**（结构化工作流最低成本 ~$12-18/天/千任务） | ❌ 高消耗（~2-3× LangGraph） | ❌ 最高消耗（~20-40% 高于 LangGraph） | 中等（取决于 Agent 循环次数） | 待基准测试 |
| **易用性与上手门槛** | **较高**：StateGraph 图模型需学习 | **最低**：角色/任务/团队抽象直观 | 中等：GroupChat 模式易理解 | **较低**：API 风格简洁 | 中等：需了解 Azure 生态 |
| **生态与集成能力** | **极强**：600+ LangChain 集成，MCP，与 NVIDIA 合作 | 强：快速增长的工具生态 | 中等（已停滞）：Azure 集成为主 | 弱：仅 OpenAI 生态 | 中等：Azure & Microsoft 生态 |
| **GitHub Stars** | ~32,000 | ~51,000 | ~58,000（含遗留热度） | ~25,000 | ~8,000 |
| **持久化/HITL** | ✅ **一等公民** | ◐ 部分 | ◐ 部分 | ❌ 无原生支持 | ✅ 原生支持 |
| **生产就绪度** | ✅ **高**（Klarna、LinkedIn、Uber 等在生产中使用） | ✅ 中等-高 | ⛔ 不推荐新项目 | 中等 | 发展中 |

### 各竞品最适用的细分应用场景

- **LangGraph** — 适合需要**持久化状态、高可靠性、人机交互、复杂条件分支**的生产级智能体系统。金融合规、医疗审批、电商客服等需要审计追踪的场景
- **CrewAI** — 适合内容生成管道、研究报告撰写、快速原型开发——"一周之内的 MVP"
- **AutoGen** — **不推荐新项目使用**（维护模式）。存量 AutoGen 项目建议迁移至 LangGraph 或 Microsoft Agent Framework
- **OpenAI Agents SDK** — 适合已深度绑定 OpenAI 生态的单智能体和简单交接场景
- **Microsoft Agent Framework** — 适合 Azure 原生企业，替代 AutoGen 的 Microsoft 官方路径
- **Temporal** — 适合非 AI 场景的通用持久化工作流，或与 LangGraph 组合使用（LangGraph 做 AI 编排，Temporal 做底层持久化）

> **信息源**：[FutureAGI CrewAI vs LangGraph vs AutoGen](https://futureagi.com/blog/crewai-vs-langgraph-vs-autogen-2026/) | [Zenodo 框架对比论文](https://zenodo.org/records/19109057) | [IEEE 混合架构论文](https://ieeexplore.ieee.org/document/11481053) | [AI Agent Frameworks 2026](https://www.langchain.com/resources/ai-agent-frameworks)

---

## 8. 版本迭代信息

| 版本 | 发布日期 | 主要更新 |
|:---|:---|:---|
| **初始发布** | 2024年 Q2 | 首个公开版本，支持循环图、基本状态管理 |
| **0.1.x** | 2024下半年 | 早期迭代，基础状态管理、图执行 |
| **0.3.x** | 2025年1-4月 | 0.3.31-0.3.34，CLI 改进，API 精炼 |
| **0.4.x** | 2025年4-6月 | 0.4.0-0.4.10，预构建智能体改进 |
| **0.5.x** | 2025年6-7月 | 0.5.0-0.5.4，检查点功能增强 |
| **v0.6.0** | **2025年7月** ⭐ | **重要里程碑** — 新的 Context API，取代 `config['configurable']`，类型安全运行时上下文注入 |
| **v1.0.0** | **2025年10月20日** 🎉 | **正式发布（GA）** — 持久化执行、检查点恢复、人机交互，承诺不引入破坏性变更直至 v2.0 |
| **1.0.7** | 2026年1月 | 企业级强化 |
| **1.0.8-1.0.10rc1** | 2026年2-3月 | 子图持久化修复，顺序中断处理 |
| **v1.1.0** | **2026年3月10日** | 类型安全流式/调用（`version="v2"`），Pydantic/dataclass 强制类型转换，`GraphOutput` |
| **v1.2.0** | **2026年5月12日** ⭐ | **节点级超时/重试/错误处理，优雅关闭，DeltaChannel，Streaming API v3** |
| **1.2.1-1.2.6** | 2026年5-6月 | 嵌套子图检查点修复，v3 流中止处理，稳定性修复 |

- **首次公开发布**：2024年 Q2（GitHub 初始发布）
- **当前最新稳定版**：**v1.2.6**（2026年6月）
- **更新频率**：**高频迭代** — 自发布以来已累计 270+ 个 PyPI 版本，2025-2026 年月均 2-3 个版本
- **未来规划**：v2.0 在路线图中，承诺从 v1.0 开始无破坏性变更

> **信息源**：[GitHub Releases](https://github.com/langchain-ai/langgraph/releases) | [Snyk 版本追踪](https://security.snyk.io/package/pip/langgraph/versions) | [LangGraph v1.2 深度解析](https://dev.to/x4nent/langgraph-12-deep-dive-per-node-timeouts-error-handlers-graceful-shutdown-deltachannel--2mp2)

---

## 总结：LangChain 家族产品关系图

```
┌─────────────────────────────────────────────────────────────┐
│                    LangChain Inc. 产品家族                    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐   │
│  │   LangChain   │    │   LangGraph  │    │  LangSmith   │   │
│  │  (开源, MIT)  │    │  (开源, MIT) │    │ (闭源, 付费)  │   │
│  │  高阶 Agent   │◄──►│  低阶编排     │◄──►│  可观测性     │   │
│  │   框架        │    │   运行时      │    │  平台        │   │
│  └──────────────┘    └──────┬───────┘    └──────────────┘   │
│                             │                               │
│                    ┌────────▼────────┐                      │
│                    │ LangGraph       │                      │
│                    │ Platform        │                      │
│                    │ (托管服务, 付费) │                      │
│                    └─────────────────┘                      │
│                                                             │
│  企业客户: Elastic · GitLab · Klarna · LinkedIn · Uber ·    │
│  Rakuten · Morningstar · 300+ 企业客户                       │
│  累计下载: 10亿+ · LangSmith: 150亿+ 追踪 · 100万亿+ tokens  │
└─────────────────────────────────────────────────────────────┘
```

---

## 一句话锐评

**LangGraph 是 2026 年生产级 AI Agent 编排的事实标准——不是因为它最容易上手，而是因为它是唯一将持久化状态、人机交互、时间旅行调试、节点级容错和条件循环等生产级需求集于一身且经过大规模验证的开源框架。** Klarna、LinkedIn、Uber 等头部企业已在生产环境验证其可靠性。学习曲线虽陡，但对于任何需要构建严肃多智能体系统的团队来说，这笔投入是值得的——而如果你只是想做快速原型，CrewAI 可能是更好的起点。

> **信息源**：[LangChain 官网](https://www.langchain.com) | [LangGraph GitHub](https://github.com/langchain-ai/langgraph) | [LangGraph 文档](https://langchain-ai.github.io/langgraph/)
