---
title: "AI Scientist调研报告"
date: "2026-07-11"
summary: "生成日期：2026-07-11"
tags: ["research", "ai-scientist", "autonomous-research", "AI4S", "scientific-discovery"]
category: "research"
source: "web"
---

# AI Scientist 调研报告

> 生成日期：2026-07-11

---

## 1. 开发者与公司背景

AI Scientist 并非单一产品，而是 2025-2026 年爆发的一个**新兴领域**，目前主要由三条路线并行推进。

### 1.1 路线一：Sakana AI —— "The AI Scientist"概念奠基者

| 项目 | 详情 |
|------|------|
| **公司** | **Sakana AI**（东京），2023 年 7 月成立 |
| **估值** | ~$26 亿（独角兽），日本最快达到独角兽的 AI 公司 |
| **投资者** | NVIDIA、Google、Khosla Ventures、Lux Capital |
| **核心理念** | "鱼群智能"——受自然界启发的进化算法，而非单纯扩大 LLM |

**创始人团队**：

| 人物 | 角色 | 背景 |
|------|------|------|
| **David Ha** | CEO | 前 Google Brain 研究员，Time 2025 AI 100 入选者 |
| **Llion Jones** | CTO | **Transformer 八位原作者之一**（"Attention Is All You Need"），前 Google 8 年 |
| **Ren Ito（伊藤錬）** | 董事长/COO | 前日本外务省官员、世界银行 11 年、Stability AI COO |

2025 年中，Sakana AI 发布 **"The AI Scientist"**——全球首个端到端全自动科研系统，奠基论文 2026 年 3 月登上 **《Nature》正刊**。

> **信息源**：[Sakana AI 公司信息](https://sakana.ai/company-info/) · [36氪 估值报道](https://m.36kr.com/p/3559654966459522) · [The Hindu NVIDIA投资](https://www.thehindu.com/sci-tech/technology/ai-scientist-maker-sakana-ai-gets-funding-from-nvidia/article68604562.ece) · [Nature 论文](https://www.nature.com/articles/s41586-026-10265-5)

### 1.2 路线二：Anthropic —— Claude Science 科研工作台

| 项目 | 详情 |
|------|------|
| **公司** | **Anthropic**（美国旧金山）|
| **发布** | 2026 年 6 月 30 日 |
| **定位** | 面向科学家的 AI 工作台（AI Workbench），非新模型 |
| **定价** | 包含在 Claude 订阅中（Pro $20/月起），无单独定价 |
| **资助计划** | 50 个科研项目最高 $30,000 Claude 额度 |

> **信息源**：[Anthropic 官方公告](https://www.anthropic.com/news/claude-science-ai-workbench) · [TFN 报道](https://techfundingnews.com/anthropic-launches-claude-science-and-google-and-openai-are-already-racing-to-match-it/) · [Nature 专题](https://www.nature.com/articles/d41586-026-02091-6)

### 1.3 路线三：Synthetic Sciences —— OpenScience 开源平替

| 项目 | 详情 |
|------|------|
| **公司** | Synthetic Sciences（旧金山），YC W26 |
| **GitHub** | [synthetic-sciences/openscience](https://github.com/synthetic-sciences/openscience) |
| **定位** | Claude Science 的完全免费开源替代 |
| **协议** | Apache 2.0 |

详见 [[AI相关/AI工具/AI4S/openscience/OpenScience调研报告]]。

---

## 2. 底层技术架构

### 2.1 "The AI Scientist"（Sakana AI）端到端架构

```
┌─────────────────────────────────────────────────────┐
│                 The AI Scientist                      │
├─────────────────────────────────────────────────────┤
│  ① 构思（Ideation）                                  │
│     └─ Semantic Scholar API 扫描文献                  │
│     └─ 生成新研究假说 → 与已有工作计算相似度过滤       │
│     └─ 新颖性评分（盲测中 AI 想法新颖度超越人类）      │
├─────────────────────────────────────────────────────┤
│  ② 实验（Experimentation）                           │
│     └─ 自动编写 Python 代码（模板/自由两种模式）       │
│     └─ 运行实验 → 自动检测错误 → 调试修复             │
│     └─ 生成图表和可视化                               │
├─────────────────────────────────────────────────────┤
│  ③ 写稿（Manuscript Generation）                     │
│     └─ 生成完整 LaTeX 论文（含摘要、方法、结果、引用）  │
│     └─ 自动生成相关工作章节                           │
├─────────────────────────────────────────────────────┤
│  ④ 审稿（Automated Peer Review）                     │
│     └─ AI 审稿人自我评估（69% 准确率接近人类水平）     │
│     └─ 可迭代改进论文质量                             │
└─────────────────────────────────────────────────────┘
```

**关键指标**：每篇论文成本 ~$6-15，耗时约 3.5 小时人工参与

### 2.2 Claude Science（Anthropic）多智能体工作台

```
┌─────────────────────────────────────────┐
│          Coordinating Agent（协调代理）     │
│  理解用户目标 → 分解任务 → 分派子代理      │
├─────────────────────────────────────────┤
│  60+ 专业子代理 & 工具                    │
│  ├─ 基因组学 / 蛋白质组学                 │
│  ├─ 结构生物学（3D 蛋白渲染）              │
│  ├─ 化学信息学 / 文献检索                 │
│  └─ NVIDIA BioNeMo 集成（Evo 2 等）      │
├─────────────────────────────────────────┤
│  Reviewer Agent（审阅代理）               │
│  独立核查：引用真实性、计算正确性          │
├─────────────────────────────────────────┤
│  算力层：本地 / SSH / HPC 集群 / Modal    │
└─────────────────────────────────────────┘
```

**关键能力**：
- 每张图表附完整出处（代码+环境+对话历史）
- 支持 60+ 科学数据库（UniProt、PDB、Ensembl、ChEMBL 等）
- 可追溯、可复现

### 2.3 OpenScience（Synthetic Sciences）开源架构

详见 [[AI相关/AI工具/AI4S/openscience/OpenScience调研报告#2-底层技术栈]]。

架构核心：**Research Harness（研究编排器）** → 模型无关模型路由器 → 290+ 技能包 + 30+ 数据库连接器

### 2.4 业界评测：RCBench 自主科研能力基准

上海AI Lab 发布的 ResearchClawBench 覆盖 **40 项 Nature/Science 真实科研任务**：

| 指标 | AI 最佳（Claude Code）| 人类基准 |
|------|:-------------------:|:--------:|
| **总分** | **21.5** | **50** |
| 写作专业性 | **70+** | — |
| 核心科研内容 | **12-21** | — |
| **失败原因：路径偏差** | **89%** | — |

> 化学是所有 AI 的共同盲区。AI 会写论文但还不太会做科研。

> **信息源**：[Nature The AI Scientist 论文](https://www.nature.com/articles/s41586-026-10265-5) · [UBC 报道](https://science.ubc.ca/news/2026-03/new-ai-scientist-conducts-its-own-research) · [Scientific American](https://www.scientificamerican.com/article/ai-wrote-a-scientific-paper-that-passed-peer-review/) · [知乎 RCBench 评测](https://zhuanlan.zhihu.com/p/2058484335074863040) · [Anthropic 官方](https://www.anthropic.com/news/claude-science-ai-workbench)

---

## 3. 开源属性与商业模式

### 3.1 各产品对比

| 产品 | 开源状态 | 定价 | 商业模式 |
|------|---------|------|---------|
| **The AI Scientist（Sakana AI）** | ⚠️ 论文开源，产品未公开发布 | — | 研发阶段 |
| **Claude Science（Anthropic）** | ❌ 闭源 | $20-200/月（含在 Claude 订阅）| SaaS 订阅 |
| **OpenScience（Synthetic Sciences）** | ✅ **Apache 2.0 完全开源** | **完全免费**（BYOK）| 开源 → Atlas 托管平台增值 |
| **AI Scientist v3（社区版）** | ✅ 开源 | 免费 | 社区维护 |

### 3.2 资助与激励

| 项目 | 额度 | 截止 |
|------|------|------|
| Anthropic AI for Science 资助 | 最高 **$30,000** Claude 额度 × 50 项目 | 2026.07.15 |
| Modal 算力补充 | 最高 **$2,000** 算力额度/项目 | 同上 |
| Anthropic 生命科学黑客松 | **$100,000** 奖金池 | 2026.07.07-13 |

> **信息源**：[Anthropic 官方公告](https://www.anthropic.com/news/claude-science-ai-workbench) · [GitHub OpenScience](https://github.com/synthetic-sciences/openscience) · [Hugging Face AI Scientist v3](https://huggingface.co/blog/alexshengzhili/aiscientist)

---

## 4. 功能全景解析

### 主要功能（一句话概括）
> AI Scientist 让 AI 自主完成"假设→实验→论文→审稿"的全科研流程，实现 10 倍速科研。

### 核心功能

#### 4.1 🔬 全自主科研闭环

| 阶段 | 传统科研 | AI Scientist |
|------|---------|-------------|
| 📚 **文献调研** | 数周手动检索 | 分钟级自动扫描（Semantic Scholar/60+ 数据库）|
| 💡 **假说生成** | 依赖个人经验 | 基于文献挖掘提出新颖假说（盲测新颖度超人类）|
| 💻 **代码实验** | 手动编写+调试 | 自动生成代码→运行→纠错→完成 |
| 📊 **数据分析** | 手动统计分析 | 自动分析+生成可视化图表 |
| ✍️ **论文撰写** | 数天到数周 | 自动生成 LaTeX 完整论文 |
| 🔍 **同行评审** | 数月等待 | 自动审稿（69% 准确率），可迭代改进 |

#### 4.2 🧠 多智能体协作（Claude Science）
- **协调代理**（Coordinating Agent）：理解目标、分解任务、分派子代理
- **60+ 专业子代理**：基因组学、蛋白质组学、结构生物学、化学信息学等
- **审阅代理**（Reviewer Agent）：独立核查引用和计算错误——"AI 内部同行评审"

#### 4.3 🔗 可追溯与可复现
- 每张图表附精确代码、运行环境、对话历史
- 支持本地部署，敏感数据不离开实验室

#### 4.4 🖥️ 灵活算力调度
- 从单 GPU 到数百 GPU 扩展
- 支持 SSH、HPC 集群、Modal 云端
- OpenScience 支持本地 Jupyter 内核 + 云端算力

#### 4.5 🧪 AI Scientist v3 改进
- 基于 Claude Code 重构，去掉 ~5000 行编排代码
- 支持多种模型（Claude、Gemini）
- 引入深度 Reviewer Agent 审计机制
- 已运行 15+ 研究想法，覆盖 8 个领域

> **信息源**：[Nature 论文](https://www.nature.com/articles/s41586-026-10265-5) · [Nature 专题指南](https://www.nature.com/articles/d41586-026-02091-6) · [Hugging Face v3](https://huggingface.co/blog/alexshengzhili/aiscientist)

---

## 5. 功能实现案例

### 案例 1：Allen Institute —— 文献综述从 2 年到几周

**场景**：神经科学家 Jérôme Lecoq 需要撰写一篇关于特定神经科学领域的全面文献综述。

**传统方式**：手动检索数百篇论文→阅读→归纳→撰写，预计耗时 **近 2 年**

**Claude Science 方式**：
```
1. 输入：研究主题描述
2. Claude Science 协调代理：
   ├─ 60+ 数据库自动检索相关文献
   ├─ 子代理并行阅读和摘要
   └─ 审阅代理核查引用真实性
3. 输出：10 篇深度综述（每篇 100+ 页），附 AI 审核的引用
```

**结果**：**几周完成**，相当于 **10 倍加速**

### 案例 2：UCSF 脑瘤中心 —— 基因组分析 1/10 时间

**场景**：胶质瘤种系变异分析——识别与脑瘤相关的遗传变异。

**结果**：分析时间缩短为原来的 **1/10**，结果经独立实验验证通过。

### 案例 3：Stanford 遗传学 —— 30 分钟 vs 31 人 9 个月

Stanford 遗传学家 Euan Ashley 用 AI Scientist 分析自己的全基因组，**30 分钟完成**。2010 年同样任务需要 **31 位科学家 9 个月**。

### 案例 4：The AI Scientist —— 首篇通过同行评审的 AI 论文

2025 年，Sakana AI 生成的论文在 **ICLR Workshop** 得分 **6.33/10**，超过接收线。这是史上第一篇纯 AI 撰写论文通过学术评审。

> **信息源**：[Nature 2026.07 专题](https://www.nature.com/articles/d41586-026-02091-6) · [Scientific American](https://www.scientificamerican.com/article/ai-wrote-a-scientific-paper-that-passed-peer-review/) · [UBC 报道](https://science.ubc.ca/news/2026-03/new-ai-scientist-conducts-its-own-research) · [C114 Claude Science 报道](https://www.c114.net.cn/industry/95697.html)

---

## 6. 主要竞品清单

| # | 产品 | 开发商 | 定位 | 核心优势 | 核心劣势 |
|---|------|--------|------|---------|---------|
| 1 | **The AI Scientist** | Sakana AI（东京）| 端到端全自动科研发现 | 全自主闭环、Nature 论文、Transformer 原作者团队 | 未产品化、仅限计算领域 |
| 2 | **Claude Science** | Anthropic（旧金山）| AI 科研工作台 | 60+ 数据库、多智能体、审阅代理、可复现 | 闭源、仅 Claude 模型、付费 |
| 3 | **OpenScience** | Synthetic Sciences（YC W26）| 开源 AI 科研工作台 | 完全免费、模型无关、290+ 技能包、本地优先 | 早期阶段、生态待成熟 |
| 4 | **Google Co-Scientist** | Google DeepMind | 假设生成引擎 | AlphaFold/Genome 独家 | 闭源、仅 Google 模型 |
| 5 | **GPT-Rosalind** | OpenAI | 生物推理专用模型 | GeneBench-Pro 基准 | 仅推理、非全流程 |
| 6 | **PaperOrchestra** | Google Cloud AI | 论文撰写自动化 | 实验日志→论文一站式 | 仅写稿、非全流程 |
| 7 | **AI Scientist v3** | 社区（Alex Li）| 开源 AI Scientist 重构 | 基于 Claude Code、多模型支持 | 社区维护 |
| 8 | **FARS** | Analemma | 高速论文生成 | 166 篇论文/417 小时 | 质量参差 |

> **信息源**：[Nature 专题](https://www.nature.com/articles/d41586-026-02091-6) · [TFN 报道](https://techfundingnews.com/anthropic-launches-claude-science-and-google-and-openai-are-already-racing-to-match-it/) · [Enago 综述](https://www.enago.com/responsible-ai-movement/resources/ai-scientists-autonomous-research-systems-2026)

---

## 7. 与竞品的横向比较

| 对比维度 | **The AI Scientist**（Sakana） | **Claude Science**（Anthropic） | **OpenScience**（Synthetic） | **Google Co-Scientist** |
|:---|:---|:---|:---|:---|
| **价格** | 未产品化 | $20-200/月 | ✅ **完全免费** | 付费（未公开）|
| **全流程闭环** | ✅ **端到端**（构思→审稿）| ✅ 全流程工作台 | ✅ 全流程工作台 | ⚠️ 偏假设生成 |
| **数据库连接** | Semantic Scholar | **60+ 科学数据库** | **30+ 科学数据库** | 30+（含 AlphaFold）|
| **模型自由度** | 取决于实现 | ❌ 仅 Claude | ✅ **任意模型** | ❌ 仅 Google |
| **开源** | ⚠️ 论文开源 | ❌ 闭源 | ✅ **Apache 2.0** | ❌ 闭源 |
| **平台支持** | — | ❌ 仅 macOS/Linux | ✅ **Win/Mac/Linux** | ✅ Web |
| **审阅代理** | ✅ 自我审稿 | ✅ Reviewer Agent | ⚠️ 批评代理 | ❌ 无 |
| **实际实验室验证** | ⚠️ 概念验证 | ✅ **Allen/UCSF/Stanford** 已验证 | ⚠️ 早期 | ⚠️ 剑桥/Stanford |
| **核心能力** | 全自主论文生产 | 科研工作台+10倍速 | 开源+模型自由 | 假设生成+AlphaFold |

### 各竞品最适用场景

| 产品 | 最佳场景 |
|------|---------|
| **Claude Science** | 有预算的实验室，需要开箱即用的集成科研工作台 |
| **OpenScience** | 追求模型自由、数据主权、零成本的学术团队 |
| **The AI Scientist（Sakana）** | 探索 AI 自主科研上限的研究机构 |
| **Google Co-Scientist** | 依赖 AlphaFold 的结构生物学团队 |
| **GPT-Rosalind** | 生物推理 API 集成场景 |

> **信息源**：[Nature 专题](https://www.nature.com/articles/d41586-026-02091-6) · [Anthropic 官方](https://www.anthropic.com/news/claude-science-ai-workbench) · [TFN](https://techfundingnews.com/anthropic-launches-claude-science-and-google-and-openai-are-already-racing-to-match-it/)

---

## 8. 版本迭代信息

### 8.1 "The AI Scientist"（Sakana AI）时间线

| 时间 | 事件 | 意义 |
|------|------|------|
| **2023.07** | Sakana AI 成立 | — |
| **2025 年中** | **The AI Scientist v1 发布** | 全球首个端到端全自动科研系统 |
| **2025** | AI 论文通过 ICLR Workshop 评审（6.33/10）| **史上首篇纯 AI 论文通过同行评审** |
| **2026.03** | **《Nature》正刊发表**（Vol. 651, pp. 914-919）| 学术顶刊认证 |
| **2026 在研** | The AI Scientist v2+ | 持续迭代 |

### 8.2 Claude Science（Anthropic）时间线

| 时间 | 事件 | 意义 |
|------|------|------|
| **2026.06.30** | **Claude Science 公开测试版发布** | AI Scientist 赛道最大玩家入场 |
| **2026.07.07-13** | 生命科学黑客松（$100,000 奖金池）| 开发者生态建设 |
| **2026.07.15** | AI for Science 资助申请截止 | 50 个项目×$30,000 额度 |
| **2026.09-12** | 资助项目运行期 | 首批落地验证 |

### 8.3 OpenScience 时间线

详见 [[AI相关/AI工具/AI4S/openscience/OpenScience调研报告#8-版本迭代信息]]。

### 8.4 学术诚信基准

| 基准 | 发布 | 发现 |
|------|------|------|
| **SciIntegrity-Bench** | 2026.05 | AI Scientist 整体"问题率" **34.2%** |
| **RCBench** | 2026 | 最佳 AI 仅 21.5/50 分，**89% 失败源于路径偏差** |
| **核心问题** | — | AI 在数据缺失时倾向于**捏造数据**（完成度偏见）|

### 8.5 更新频率
- **Sakana AI**：以论文形式发布，不定期
- **Claude Science**：月度功能更新（随 Claude 模型更新节奏）
- **OpenScience**：早期快速迭代（周更/双周更）
- **社区版 AI Scientist v3**：持续活跃开发

> **信息源**：[Nature 论文](https://www.nature.com/articles/s41586-026-10265-5) · [Scientific American](https://www.scientificamerican.com/article/ai-wrote-a-scientific-paper-that-passed-peer-review/) · [Hugging Face v3](https://huggingface.co/blog/alexshengzhili/aiscientist) · [Anthropic 官方](https://www.anthropic.com/news/claude-science-ai-workbench) · [百度百科 AI Scientist](https://baike.baidu.com/item/The%20AI%20Scientist) · [BAAI RCBench](https://hub-assets-cache.baai.ac.cn/view/56020)

---

## 一句话锐评

> **AI Scientist 不是来取代科学家的，而是来重新定义"做科研"这件事的——当 AI 能在几周完成两年的文献综述、30 分钟分析完 31 人 9 个月的基因组数据时，科学家终于可以放下"技工"的包袱，回归到提问题、看方向、做判断的本职。2026 年最激动人心的不是 AI 能写论文了，而是它正在把"科学"还给科学家。**

---

*本报告基于 2026 年 7 月 11 日的公开信息编制。AI Scientist 领域处于爆发期，信息更新迅速。*

**核心信息源汇总**：
- [Nature 正刊：The AI Scientist](https://www.nature.com/articles/s41586-026-10265-5)
- [Nature 专题：Which AI scientist suits your lab?](https://www.nature.com/articles/d41586-026-02091-6)
- [Anthropic 官方：Claude Science 发布](https://www.anthropic.com/news/claude-science-ai-workbench)
- [Scientific American：AI 论文通过同行评审](https://www.scientificamerican.com/article/ai-wrote-a-scientific-paper-that-passed-peer-review/)
- [Sakana AI 公司信息](https://sakana.ai/company-info/)
- [GitHub OpenScience](https://github.com/synthetic-sciences/openscience)
- [Hugging Face AI Scientist v3](https://huggingface.co/blog/alexshengzhili/aiscientist)
- [UBC 报道：New AI scientist conducts its own research](https://science.ubc.ca/news/2026-03/new-ai-scientist-conducts-its-own-research)
- [TFN：Anthropic vs Google vs OpenAI](https://techfundingnews.com/anthropic-launches-claude-science-and-google-and-openai-are-already-racing-to-match-it/)
- [Enago 综述：AI Scientists Are Here](https://www.enago.com/responsible-ai-movement/resources/ai-scientists-autonomous-research-systems-2026)
- [知乎 RCBench 自主科研评测](https://zhuanlan.zhihu.com/p/2058484335074863040)
- [百度百科 The AI Scientist](https://baike.baidu.com/item/The%20AI%20Scientist)
- [36氪 Sakana AI 报道](https://m.36kr.com/p/3559654966459522)
- [C114 Claude Science 报道](https://www.c114.net.cn/industry/95697.html)
