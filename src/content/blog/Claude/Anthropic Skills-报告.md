---
title: "Anthropic Skills（anthropics/skills）深度调研报告"
date: "2026-07-05"
tags: ["AI","调研","Skill","Anthropic","自动化","工具","科研"]
categories: ["claude"]
summary: "Anthropic 由 **Dario Amodei**（CEO）和 **Daniela Amodei**（总裁）于 2021 年联合创立："
---

# Anthropic Skills（anthropics/skills）深度调研报告

> 生成日期：2026-07-05
>
> 调研方法：多源联网搜索，信息交叉验证

---

## 1. 开发者与公司背景

### 开发方全称
**Anthropic**（全称 Anthropic PBC），美国人工智能公司，总部位于加利福尼亚州旧金山。

### 创始人基本信息
Anthropic 由 **Dario Amodei**（CEO）和 **Daniela Amodei**（总裁）于 2021 年联合创立：

- **Dario Amodei**：前 OpenAI 研究副总裁，领导了 GPT-2、GPT-3 的研发工作；普林斯顿大学物理学博士（计算神经科学方向）
- **Daniela Amodei**：前 OpenAI 安全与政策副总裁，前 Stripe 员工

核心创始团队还包括 **Tom Brown**（GPT-3 首席作者）、**Sam McCandlish**、**Jared Kaplan** 等前 OpenAI 核心研究人员。

### 团队规模
- **2025 年底**：约 1,000–1,500 人（快速增长中）
- **2026 年**：继续快速扩张，特别是在产品工程、开发者关系和安全研究团队

### 公司盈利情况
- Anthropic 已从非营利转型为 **公共利益公司（Public Benefit Corporation）**
- 累计融资超 **$137 亿**（截至 2026 年 Q1），投资方包括 Google（超 $30 亿）、Amazon（$40 亿+）、Spark Capital、Samsung 等
- 估值：2026 年初估值约 **$600–$800 亿**
- 营收：2025 年 ARR 超 **$10 亿**，主要由 API 订阅与企业客户贡献
- 核心产品线：Claude 模型家族（Haiku/Sonnet/Fable/Mythos）、Claude Code（开发者工具）、Claude.ai（消费版）、Agent Skills 生态

### 信条与远景
- **核心理念**：构建安全、有益、诚实的 AI 系统
- **对 Skills 生态的定位**：将 Agent Skills 打造为**跨平台、开放标准的 AI 能力封装规范**，使 Claude 不仅能"思考"（模型能力），还能"执行"（技能驱动的专业化行动）
- **近期举措**：2025 年 12 月将 Agent Skills 作为开放标准发布（[agentskills.io](https://agentskills.io)），推动全行业采纳
- **远景**：让 AI Agent 像"下载 App"一样简单——用技能的标准化封装降低 Agent 定制门槛

### 官网链接
- Anthropic 官网：[https://www.anthropic.com](https://www.anthropic.com)
- Agent Skills 规范站：[https://agentskills.io](https://agentskills.io)
- Skills 仓库：[https://github.com/anthropics/skills](https://github.com/anthropics/skills)
- DeepLearning.AI 课程：[Agent Skills with Anthropic](https://www.deeplearning.ai/courses/agent-skills-with-anthropic)

> **信息来源**：[Anthropic 官网](https://www.anthropic.com)、[DeepLearning.AI](https://www.deeplearning.ai)、[GitHub anthropics/skills](https://github.com/anthropics/skills)

---

## 2. 底层技术栈

### 基础大模型
Anthropic Skills **基于 Anthropic 自研的 Claude 模型家族**：

| 模型 | 说明 |
|------|------|
| **Claude Opus 4.8** | 旗舰级，最强推理与编码能力 |
| **Claude Sonnet 5** | 速度与性能均衡，最广泛使用 |
| **Claude Fable 5 / Mythos 5** | Mythos 级模型梯队（2025–2026 年最新推出） |
| **Claude Haiku 4.5** | 轻量快速，低延迟场景 |

Skills **并非独立模型**，而是**基于 Claude 能力之上的指令集 + 工具调用编排层**。

### 是否支持自选模型
**不直接支持**。Skills 是为 Claude 生态设计的指令封装格式，不跨模型供应商。但 Skills 标准（[agentskills.io](https://agentskills.io)）是**开放标准**，其他模型供应商（包括 OpenAI、Google、Microsoft）已宣布支持 Agent Skills 格式。

### 核心技术架构

| 层次 | 技术 | 说明 |
|------|------|------|
| **格式层** | **SKILL.md + YAML Frontmatter** | 纯文本、Git 友好的技能定义格式 |
| **加载层** | **渐进式加载（Progressive Disclosure）** | 3 级逐层加载：元数据 → 正文 → 引用文件 |
| **执行层** | Claude 工具调用 + Agent 编排 | 技能被触发后，Claude 按指令行动 |
| **连接层** | **MCP（Model Context Protocol）** | Skills 可调用 MCP 工具获取外部数据 |
| **打包层** | 文件夹 + `.claude-plugin` | 插件市场分发与版本管理 |

> **说明**：Agent Skills **非独立 AI 模型产品**，而是基于 Claude 模型的指令封装与编排层，不涉及独立的基础大模型训练。

> **信息来源**：[Anthropic Skills Blog](https://claude.com/blog/equipping-agents-for-the-real-world-with-agent-skills)、[agentskills.io](https://agentskills.io)

---

## 3. 开源属性与商业模式

### 开源协议（双许可证模式）

| 分类 | 包含技能 | 协议 | 性质 |
|------|----------|------|:----:|
| **示例技能** | Creative、Development、Enterprise 等 13+ 个技能 | **Apache 2.0** | ✅ 完全开源 |
| **文档处理技能** | docx、pdf、pptx、xlsx | **Source-available** | 🔒 仅供参阅 |

官方 README 原文：
> *"Many skills in this repo are open source (Apache 2.0). We've also included the document creation & editing skills that power Claude's document capabilities under the hood... These are source-available, not open source."*

### 定价模式

| 层次 | 价格 | 说明 |
|------|------|------|
| **Skills 仓库** | **完全免费** | GitHub 公开仓库，Apache 2.0 |
| **Claude.ai 使用** | **免费版可用** | 部分 Skills 已预置在 Claude.ai 中 |
| **Claude API + Skills** | **按 API 调用量付费** | 模型调用费（约 $3–$15/百万 token） |
| **Claude Code + Skills** | **Pro 订阅 $20/月** | 含 Skills 插件系统 |
| **文档处理 Skills** | **Claude 订阅可访问** | 内置在 Claude 产品能力中 |

### 商业模式
Anthropic 的 Skills 策略是典型的 **生态驱动型商业模式**：
1. **开源设标准**：通过 Apache 2.0 开源 + 开放标准发布，吸引社区贡献
2. **核心能力付费**：文档处理等高价值技能闭源，仅通过 Claude 产品提供
3. **插件市场分发**：通过 Claude Code 的 Plugin Marketplace 分发，推动订阅
4. **培训课程**：与 DeepLearning.AI 联合推出免费课程，培养开发者生态

> **信息来源**：[GitHub README](https://github.com/anthropics/skills)、[Skywork.ai Guide](https://skywork.ai/blog/claude-skills-repository-ultimate-guide-2/)

---

## 4. 功能全景解析

### 主要功能
> 用**标准化的 Markdown 指令包**封装 AI Agent 的专业能力，使 Claude 能针对特定任务"即插即用"——开发者只需写一个文件夹，Claude 就能按指令自动执行复杂工作流。

### 核心功能与关键技术

#### 4.1 SKILL.md 规范与 YAML Frontmatter（格式标准）

**技术**：标准化的元数据 + 指令封装格式

每个 Skill 的核心是一个 `SKILL.md` 文件，以 YAML Frontmatter 定义元数据：

```yaml
---
name: skill-identifier
description: 简洁地说明什么时候以及为什么使用这个技能
---
```

**关键字段**：
- `name`：技能标识符（最长 64 字符，小写字母数字+连字符）
- `description`：技能说明与使用时机（最长 1024 字符，是触发匹配的关键）
- 无强制分类标签——通过描述语的语义匹配触发

**SKILL.md 正文**：使用**祈使句**书写指令，标明目标、边界、输入输出契约。建议控制在 2,000–5,000 词以内。更深层的内容放到 `references/` 子目录中。

**参考**：[agentskills.io 规范](https://agentskills.io)、[SKILL.md 格式参考](https://github.com/williamzujkowski/standards/blob/master/docs/guides/SKILL_FORMAT_SPEC.md)

#### 4.2 渐进式加载（Progressive Disclosure）—— 核心技术创新

**技术**：三级分层上下文加载策略

这是 Skills 体系**最核心的创新**，解决了几十年来 AI 插件/工具系统的"上下文膨胀"问题：

| 级别 | 内容 | 何时加载 | 开销 |
|:----:|------|----------|:----:|
| **Level 1** | YAML 元数据（name + description） | 始终在上下文 | ~100 token/技能 |
| **Level 2** | SKILL.md 正文 | 技能被触发时加载 | <5,000 token |
| **Level 3** | 引用文件（scripts/、references/、assets/） | 按需，仅当显式引用时 | 无上限 |

**效果**：安装 16 个技能，元数据共约 1,600 token——不到一次 API 调用的 2%。相比传统方法将全部指令装入上下文的做法，**节省约 90% 的上下文预算**。

**参考**：[agent-skills-sdk PyPI](https://pypi.org/project/agent-skills-sdk/)

#### 4.3 Skill Creator（元技能——构建技能的技能）

**技术**：意图捕获 → SKILL.md 编写 → 并行测试 → 人工评审 → 持续迭代

这是仓库中最具创新性的技能——一个**可以自动构建其他技能**的元技能。当用户用自然语言描述需求时，`skill-creator` 自动：
1. 捕获意图并将其结构化
2. 生成包含正确 YAML Frontmatter 的 SKILL.md
3. 运行多个并行测试实例评估触发准确率和执行质量
4. 提交给人类评审
5. 迭代优化至满意

**参考**：[Ultimate Guide to claude skill-creator](https://skywork.ai/blog/ai-bot/claude-skill-creator-ultimate-guide/)

#### 4.4 MCP Builder（MCP 服务端脚手架生成）

**技术**：四阶段工作流自动化

自动生成符合 MCP（Model Context Protocol）规范的服务端项目。四阶段：调研与计划 → 实现（项目结构、工具 Schema）→ 审查与测试（代码质量、MCP Inspector）→ 评估验证。

#### 4.5 Claude API Skill（全文档化 API 参考技能）

7 种语言自动检测（Python、TypeScript、Java、Go、Ruby、C#、PHP），涵盖模型选择决策树、自适应思考、提示缓存优化、迁移指南等。开发者无需离开开发环境即可获得准确 API 参考。

#### 4.6 旗下 17 个官方技能总览

| 类别 | 技能名称 |
|------|----------|
| **文档处理** | docx、pdf、pptx、xlsx |
| **创意设计** | algorithmic-art、canvas-design、frontend-design、slack-gif-creator、theme-factory |
| **开发技术** | claude-api、mcp-builder、webapp-testing、web-artifacts-builder |
| **企业通信** | brand-guidelines、doc-coauthoring、internal-comms |
| **元技能** | **skill-creator** |

#### 4.7 跨平台兼容性

Skills 被设计为**开放标准**，支持平台包括：
- **Claude.ai**（消费级 Web 应用）
- **Claude Code**（CLI 和 IDE 扩展）
- **Claude API / Agent SDK**（开发者集成）
- **Cursor / Copilot / Codex**（第三方已宣布支持）

---

## 5. 功能实现案例

### 案例：用 Skill Creator 创建一个"代码审查"技能

**场景**：开发者希望 Claude 能按团队标准自动审查 Python 代码。

**Step 1：自然语言描述需求**（在 Claude Code 中）

> "帮我创建一个代码审查技能，检查 Python 代码的类型标注完整性、文档字符串覆盖率和异常处理。"

**Step 2：Skill Creator 自动生成**

Skill Creator 自动创建工作目录：

```
code-review-python/
├── SKILL.md
├── references/
│   ├── type-checking-guide.md
│   └── exception-patterns.md
└── scripts/
    └── check_type_coverage.py
```

**Step 3：自动生成的 SKILL.md**

```markdown
---
name: code-review-python
description: 检查 Python 代码的类型标注完整性、文档字符串覆盖率和异常处理约定。
---

# Python Code Review Skill

执行以下步骤审查 Python 代码：

1. **类型标注检查** — 检查所有函数签名是否包含类型标注
   - 缺失率 > 20% → 标记为 Warning
   - 导入 TYPE_CHECKING 模式是否符合约定
2. **文档字符串覆盖率** — ...
3. **异常处理** — ...
```

**Step 4：并行测试验证**

Skill Creator 自动运行 5 个测试用例（含已知有问题的代码），评估：
- 触发准确率（Trigger Accuracy）：92%
- 审查全面性评分：87%
- 误报率：3%

**Step 5：交付给人类审查**

开发者确认后，技能生效——后续提交的 Python 代码都会自动经过该技能的审查流程。

**效果**：原本需要团队 Leader 花费 30 分钟手动审查的代码，现在 Claude 在数秒内完成，且一致性更高。

> **信息来源**：[Ultimate Guide](https://skywork.ai/blog/ai-bot/claude-skill-creator-ultimate-guide/)

---

## 6. 主要竞品清单

| 序号 | 竞品 | 开发商 | 定位 | 优势 | 劣势 |
|:---:|------|--------|------|------|------|
| 1 | **OpenAI Custom GPTs** | OpenAI | ChatGPT 内的无代码定制助手 | ChatGPT 用户基数大；UI 构建无需编码 | **锁定在 ChatGPT 生态**；不可移植；无开放标准 |
| 2 | **OpenAI Actions** | OpenAI | GPT 的工具调用与 API 扩展 | 平台级集成 | 碎片化；2026 年重新整合中 |
| 3 | **MCP（Model Context Protocol）** | Anthropic / Linux Foundation | AI 工具连接协议（"AI 的 USB-C"） | 开源标准、多厂商支持、工具级互联 | **协议层**而非流程层；不解决指令编排问题 |
| 4 | **LangChain / LangGraph** | LangChain Inc. | Agent 编排框架（Python/JS SDK） | 定制化极强；企业级状态控制 | 框架耦合重；学习曲线陡 |
| 5 | **Dify / Coze** | 开源社区 / 字节跳动 | 低代码 AI 应用构建平台 | 可视化编排；多模型支持 | 平台绑定；不跨工具链 |
| 6 | **AutoGen** | 微软 | 对话驱动多 Agent 框架 | 灵活拓扑；Azure 生态 | 非技能封装标准；流程不可控 |
| 7 | **Skills Marketplace** | 特赞等 | 第三方社区 Skills 市场 | 平台聚合能力 | 依赖 Skills 标准，非标准制定者 |

---

## 7. 与竞品的横向比较

| 对比维度 | **Anthropic Skills** | **OpenAI Custom GPTs** | **MCP** | **LangChain** |
|:---|:---|:---|:---|:---|
| **价格** | **开源免费**（Apache 2.0）+ Claude $20/月起 | ChatGPT Plus $20/月 | **开源免费** | 开源免费（MIT）/ LangSmith 付费 |
| **核心能力** | Agent 流程封装与渐进加载；**跨平台标准化** | 无代码定制 ChatGPT 行为 | 工具/API 标准化连接协议 | Agent 编排与控制框架 |
| **易用性与上手门槛** | **极低** - 会写 Markdown 即可 | **极低** - UI 操作无需代码 | 中等 - 需部署 MCP Server | 较高 - 需理解图论与框架概念 |
| **开放性与生态** | ✅ **开放标准**，跨多平台通用 | ❌ **锁定 ChatGPT**，不可导出 | ✅ **开放标准**，Linux Foundation 治理 | ✅ 开源，但框架绑定 |

### 各竞品最适用的细分应用场景

| 竞品 | 最佳场景 |
|------|----------|
| **Anthropic Skills** | **AI Agent 的标准化指令封装**——编码规范、合规流程、多步领域任务、组织知识固化 |
| **OpenAI Custom GPTs** | ChatGPT 内的**快速内部问答机器人**，简单知识库绑定 |
| **MCP** | **连接外部系统/API/数据库**——与 Skills 互补而非替代（MCP 管连接，Skills 管流程） |
| **LangChain/LangGraph** | **企业级复杂 Agent 工作流**——精确状态控制、条件分支、人工介入 |
| **Dify/Coze** | **非技术团队的可视化 Agent 搭建**——快速原型，无需写代码 |

---

## 8. 版本迭代信息

### 首次公开发布
- **仓库创建**：2025 年 9 月 22 日
- **Agent Skills 标准首次亮相**：2025 年 10 月（随 Claude 能力更新）
- **标准开放化发布**：2025 年 12 月 18 日（[agentskills.io](https://agentskills.io) 上线 + 博客发布）

### 关键迭代节点

| 时间 | 事件 |
|:----:|------|
| **2025-09-22** | 仓库创建，初始提交 |
| **2025-10** | Agent Skills 首次亮相，含文档处理 Skills |
| **2025-12-18** | 全面开放标准，发布《Equipping agents for the real world》博客 |
| **2025-12** | DeepLearning.AI 推出免费 Skills 课程 |
| **2026-01** | 社区 Skills 数量爆发式增长 |
| **2026-01-29** | Anthropic 发布 33 页官方 Skills 构建指南 |
| **2026 Q1** | OpenAI、Google、Microsoft 宣布支持 Agent Skills |
| **2026-04** | Claude Code 插件市场集成 Skills；第三方 Skills Marketplace 上线 |
| **2026-05~06** | 社区技能超 35,000 个 |

### 更新频率
- **2025 Q4**：密集迭代期，数周一次更新
- **2026 Q1~Q2**：每月 2–4 次提交，持续增加新技能和示例
- **当前（2026-07）**：进入**生态维护期**——核心仓库本身趋于稳定，社区生态呈爆发式增长

> **信息来源**：[GitHub anthropics/skills](https://github.com/anthropics/skills)、[Anthropic Blog](https://claude.com/blog/equipping-agents-for-the-real-world-with-agent-skills)

---

## 一句话锐评

> **`anthropics/skills` 可能是 2025–2026 年对整个 AI Agent 行业影响最深远的一个仓库**——它用"会写 Markdown 就能封装 AI 能力"的简单理念，定义了一个被 OpenAI、Google、Microsoft 全行业采纳的开放标准。如果你在构建任何 AI Agent 应用，**理解渐进式加载和 SKILL.md 规范将直接影响你 Agent 架构的上下文效率和可扩展性**。它不是最炫酷的技术发明，但它是让 AI Agent "真正可用"的最重要的基础设施之一。值得每一位 AI 开发者深入学习。

---

> **文件生成信息**：本报告基于 2026-07-05 的网络搜索数据生成，部分数据（如 GitHub Stars 数、社区技能数量）可能持续变化。建议以各来源链接中的最新数据为准。
