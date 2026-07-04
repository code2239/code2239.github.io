---
title: "多代理「开会」模式 — 开源前端应用汇总"
date: "2026-07-04"
tags: ["Agent", "开源", "前端", "ChatDev", "AutoGen"]
summary: "ChatDev / MetaGPT / AutoGen Studio / AgentVerse / CrewAI / LangGraph / OpenAgents 七大多代理开源前端应用逐一详解与选型建议。"
---

> 整理日期：2026-07-04
> 覆盖范围：ChatDev / MetaGPT / AutoGen Studio / AgentVerse / CrewAI / LangGraph / OpenAgents

---

## 一、概览表

| 项目 | GitHub | 会议可视化 | 结构化产出 | 部署难度 | 最像"开会" |
|------|--------|:---:|:---:|:---:|:---:|
| **ChatDev** | `OpenBMB/ChatDev` | ⭐⭐⭐⭐⭐ | 代码 | 低 | ✅ 最像 |
| **MetaGPT** | `geekan/MetaGPT` | ⭐⭐⭐⭐ | PRD/设计图/代码 | 中 | ✅ |
| **AutoGen Studio** | `microsoft/autogen` | ⭐⭐⭐⭐ | 灵活配置 | 低 | ✅ |
| **AgentVerse** | `OpenBMB/AgentVerse` | ⭐⭐⭐ | 灵活 | 低 | ✅ |
| **CrewAI** | `crewAIInc/crewAI` | ⭐⭐ | 灵活 | 低 | 一般 |
| **LangGraph Studio** | `langchain-ai/langgraph` | ⭐⭐⭐ | DAG 状态图 | 中 | 调试向 |
| **OpenAgents** | `xlang-ai/OpenAgents` | ⭐⭐ | 工具输出 | 低 | ❌ 非核心 |

---

## 二、逐项详解

### 1. ChatDev — 虚拟软件公司，代理逐轮开会

**GitHub**: [OpenBMB/ChatDev](https://github.com/OpenBMB/ChatDev)

**核心概念**: 模拟一家完整的虚拟软件公司，AI 代理扮演 CEO、CTO、程序员、测试员等角色，在聊天面板中逐轮讨论，从需求一路走到交付代码。

**前端形态**:
- 多窗口聊天面板，实时展示代理对话
- 分阶段可视化：需求分析 → 系统设计 → 编码 → 测试 → 文档
- 每个阶段切换发言人，可以看到不同代理"发言"

**会议模式**:
- 使用 Chat Chain（对话链）机制
- 代理之间按顺序发言，逐轮推进
- 每个阶段有明确的主持人和参与者

**技术栈**: Python 后端 + Web 前端（Gradio 或自研）

**适合场景**: 想直观看到代理如何通过"开会"协作完成软件开发任务

---

### 2. MetaGPT — SOP 驱动的结构化会议

**GitHub**: [geekan/MetaGPT](https://github.com/geekan/MetaGPT)

**核心概念**: 更进一步——代理不仅聊天，还按**标准作业流程（SOP）**产出结构化文档。产品经理出 PRD，架构师出系统设计，工程师编码，所有产出物在共享工作空间可见。

**前端形态**:
- Dashboard 仪表盘 + 文档共享区
- 消息池（Message Pool）：所有代理读写共享消息
- 结构化输出可视化：PRD 文档、架构图、API 设计、代码

**会议模式**:
- SOP 驱动的逐角色发言（严格顺序）
- 产品经理启动 → 架构师回应 → 工程师实现
- 每个发言附带结构化产物（不只是聊天文字）

**技术栈**: Python 后端 + Web 前端

**适合场景**: 需要代理产出不只是代码，而是完整文档链（PRD → 设计 → 代码 → 测试报告）

---

### 3. AutoGen Studio — 微软的低代码多代理工作台

**GitHub**: [microsoft/autogen](https://github.com/microsoft/autogen)

**核心概念**: 微软出品，最成熟的 Web 拖拽界面，可设计、测试、监控多代理工作流。内置多种群聊模式（GroupChat / RoundRobin / SelectorGroupChat）。

**前端形态**:
- **拖拽式画布**：可视化设计代理、工具和对话流
- **实时对话监控**：观察多个代理在聊天室中互动
- **JSON 配置导出**：代理团队定义可保存为声明式配置
- **内置测试 Playground**：直接在上面对话测试

**会议模式**:

| 模式 | 描述 |
|------|------|
| `RoundRobinGroupChat` | 代理轮流发言 |
| `SelectorGroupChat` | 智能选择下一个发言人 |
| `Swarm` | 代理之间可相互移交任务 |
| `MagenticOne` | 多代理单协调者模式 |

**部署**:

```bash
pip install autogenstudio
autogenstudio ui --port 8081
```

**技术栈**: Python 后端 (FastAPI) + React 前端

**适合场景**: 需要图形化拖拽设计代理团队，不需要写代码

---

### 4. AgentVerse — 多代理社会模拟与议事会

**GitHub**: [OpenBMB/AgentVerse](https://github.com/OpenBMB/AgentVerse)

**核心概念**: 聚焦于多代理**社会模拟**，支持多种协作拓扑（垂直/水平/混合），其中"议事会"（council）模式让多代理围绕一个话题群组讨论。

**前端形态**:
- Web 聊天界面，展示多代理对话流
- 支持自定义代理数量和角色
- 对话历史可视化

**会议模式**:
- Council（议事会）：所有代理平等讨论
- Vertical（垂直）：层级式委派
- Horizontal（水平）：并行协作

**技术栈**: Python + Web UI

**适合场景**: 想研究代理社会行为和群体决策过程

---

### 5. CrewAI — 角色驱动的代理团队

**GitHub**: [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI)

**核心概念**: 强调给每个代理分配**角色（role）、目标（goal）、背景故事（backstory）**。代理像真实团队成员一样协作，有顺序执行和层级委派两种模式。

**前端形态**:
- 官方 Web 监控面板（功能不如 AutoGen Studio 丰富）
- 社区有多个第三方前端（CrewAI UI、AgentForge 等）
- 偏向"任务管理面板"而非"聊天室"

**会议模式**:
- Sequential：链式顺序执行
- Hierarchical：管理者代理分配任务给下属

**代码示例**:

```python
from crewai import Agent, Task, Crew

researcher = Agent(
    role="市场研究员",
    goal="分析目标市场的竞争格局",
    backstory="你是一名拥有20年经验的市场研究专家"
)

analyst = Agent(
    role="数据分析师",
    goal="从研究数据中提取关键洞察",
    backstory="你擅长从复杂数据中找出规律"
)

crew = Crew(agents=[researcher, analyst], tasks=[...])
crew.kickoff()
```

**技术栈**: Python

**适合场景**: 需要代理有不同的"人格"和专业背景的生产级任务

---

### 6. LangGraph Studio — 面向开发者的调试 IDE

**GitHub**: [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph)

**核心概念**: LangChain 出品，用**状态机/有向图**建模代理工作流。Studio 是可视化调试工具，不是"开会 UI"，但你可以看到代理在每个节点的状态变化。

**前端形态**:
- 图形编辑器：可视化设计代理流程图
- 状态检查器：在每一步观察代理的内部状态
- 流式事件追踪：实时看到数据如何在节点间流转
- 人机交互断点：在关键节点插入人工审批

**会议模式**: 不直接模拟会议，而是建模为状态图（适合复杂分支逻辑）

**技术栈**: Python + React (Studio)

**适合场景**: 需要精确控制代理协作逻辑的开发者

---

### 7. OpenAgents — 代理工具平台（非会议向）

**GitHub**: [xlang-ai/OpenAgents](https://github.com/xlang-ai/OpenAgents)

**核心概念**: 偏向**人-代理交互**而非代理间会议。提供类 ChatGPT 插件界面，让代理使用 200+ 工具完成任务。有代理市场可分享/部署代理。

**前端形态**: 聊天式 UI（类似 ChatGPT Plugins）

**会议模式**: ❌ 不在此项目重点范围内

---

## 三、与你当前 Claude Code 环境的对应关系

你的 Claude Code 已有以下相关能力：

| Claude Code 能力 | 对应开源项目的理念 |
|------------------|-------------------|
| **`ecc:council`** 技能 | 类似 AgentVerse 的 Council 模式 |
| **`ecc:team-agent-orchestration`** | 类似 CrewAI 的团队编排 |
| **`Workflow` 脚本编排** | 类似 AutoGen 的 workflow 定义 |
| **`SendMessage` 代理通信** | 底层消息传递（所有框架的基础） |
| **100+ 专业代理** | 类似 MetaGPT 的角色分配 |

---

## 四、选型建议

| 你的需求 | 推荐 |
|----------|------|
| 想看代理"开会聊天"的全过程 | **ChatDev** |
| 需要代理产出完整文档链 | **MetaGPT** |
| 想拖拽设计代理团队，不写代码 | **AutoGen Studio** |
| 想研究代理群体行为 | **AgentVerse** |
| 生产环境需要角色化代理 | **CrewAI** |
| 需要精确控制协作流程 | **LangGraph** |
| 想在 Claude Code 内直接使用 | **Workflow + ecc:council** |

---

## 五、快速启动命令

```bash
# ChatDev
git clone https://github.com/OpenBMB/ChatDev.git
cd ChatDev && pip install -r requirements.txt
python run.py --task "build a snake game"

# AutoGen Studio
pip install autogenstudio
autogenstudio ui --port 8081

# MetaGPT
git clone https://github.com/geekan/MetaGPT.git
cd MetaGPT && pip install -e .
python startup.py "write a snake game in python"

# CrewAI
pip install crewai
# 然后写你自己的 crew 脚本

# AgentVerse
git clone https://github.com/OpenBMB/AgentVerse.git
cd AgentVerse && pip install -r requirements.txt
```

---

## 六、相关资源

- [AutoGen 官方文档](https://microsoft.github.io/autogen/)
- [ChatDev 论文](https://arxiv.org/abs/2307.07924)
- [MetaGPT 论文](https://arxiv.org/abs/2308.00352)
- [LangGraph 文档](https://langchain-ai.github.io/langgraph/)
- [CrewAI 文档](https://docs.crewai.com/)
