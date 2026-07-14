---
title: "Agentic Commerce 智能体商务调研报告"
date: "2026-07-11"
summary: "Forrester《2026 十大新兴技术》中最接近商业落地的趋势——AI 智能体替你完成购物全流程"
tags: ["research", "ai", "agentic-commerce", "forrester", "ecommerce"]
category: "research"
---

# Agentic Commerce（智能体商务）深度调研报告

> Forrester《2026 十大新兴技术》中最接近商业落地的趋势——AI 智能体替你完成购物全流程

---

## 1. 提出者与研究机构

### 提出机构
**Forrester Research**（福瑞斯特研究公司）——与 **Gartner、IDC** 并称全球 IT 研究三巨头，1983 年成立于美国马萨诸塞州剑桥市。

Agentic Commerce 在 Forrester《Top 10 Emerging Technologies 2026: Beyond Chat》报告中被列为**交互层（Interact）**四大技术之一，与 Layer Zero Experience、Physical AI & Robotics、Autonomous Transportation 并列。

### 核心分析师

| 姓名 | 角色 | 专注领域 |
|:---|:---|:---|
| **Emily Pfeiffer** | 首席分析师，商务技术 | Agentic Commerce、B2C/B2B 商务平台、OMS、商品搜索与发现。提出 **FIRE 愿景**（Flexible, Inexpensive, Rapid, Easy）和 **Function-First Tech Buying 框架** |
| **Chuck Gahun** | 副总裁、首席分析师 | 共同领导 Agentic Commerce 研究方向，联合发布《The State of Agentic Commerce (Q2 2026)》报告 |

### 关键报告

| 报告名称 | 类型 | 时间 |
|:---|:---|:---|
| *Top 10 Emerging Technologies 2026: Beyond Chat* | 年度旗舰趋势报告 | 2026 年 4 月 |
| *The State of Agentic Commerce in Mid-2026* | 行业状态更新 | 2026 年中 |
| *Welcome To The Layer Zero Experience*（含 Agentic Commerce 章节） | 专题深研 | 2026 年 6 月 |
| *Agentic Commerce In 2026: What's Real, What's Coming, And What To Do Now* | 行动指南 | 2026 年 |
| *Opportunity Assessment For Answer Engine Selling: Forrester's Five C's Checklist* | 自查框架 | 2026 年 |

### Emily Pfeiffer 标志性观点

> *"Agentic Commerce 目前只是部分存在，在很多领域才刚刚起步，而且它可能……并不好。听到它是个大事、你必须立刻拥有它、你已经落后了——首先，不要慌。没有人真正搞明白了。"*

> **信息源**：
> - [Forrester - Top 10 Emerging Technologies 2026: Beyond Chat](https://www.forrester.com/blogs/forresters-top-10-emerging-technologies-for-2026-beyond-chat/)
> - [Forrester - The State of Agentic Commerce in Mid-2026](https://www.forrester.com/blogs/the-state-of-agentic-commerce-in-mid-2026/)
> - [Emily Pfeiffer - Forrester Analyst Bio](https://www.forrester.com/analyst-bio/emily-pfeiffer/BIO14604)
> - [Forrester - Agentic Commerce In 2026: What's Real, What's Coming](https://www.forrester.com/customer-experience/agentic-commerce-in-2026-whats-real-whats-coming-and-what-to-do-now/)
> - [Forrester - Five C's Checklist](https://www.forrester.com/report/opportunity-assessment-for-answer-engine-selling-forresters-five-cs-checklist/RES196915)
> - [Forrester x Algolia - How Agents Are Changing Commerce](https://www.algolia.com/resources/asset/forrester-how-agents-are-changing-commerce-forever)

---

## 2. 底层技术栈

Agentic Commerce 不是单一产品，而是由多层技术汇聚而成的**商务范式**。其技术栈与 [[Layer Zero Experience 深度调研报告]] 高度重合，但增加了支付与履约层。

### 2.1 技术架构

```
┌────────────────────────────────────────────────────────┐
│                   用户界面层                             │
│   ChatGPT / 电商App / 智能眼镜 / 语音助手 / 浏览器       │
├────────────────────────────────────────────────────────┤
│                   智能体编排层                           │
│   意图理解 → 商品发现 → 比价 → 谈判 → 下单 → 履约跟踪    │
├──────────────┬──────────────┬─────────────────────────┤
│  通信协议层   │   支付协议层   │      数据层              │
│  ACP / UCP   │  AP2 / x402  │  商品图床 / 库存 API     │
│  MCP / A2A   │  Agent Pay   │  实时定价 / 物流追踪      │
│              │  ACE / TAP   │  用户画像 / 身份令牌       │
├──────────────┴──────────────┴─────────────────────────┤
│                   基础设施层                             │
│             LLM + 多智能体系统 + 云 + 加密               │
└────────────────────────────────────────────────────────┘
```

### 2.2 核心技术详解

#### 协议之争：三大标准

| 协议 | 维护方 | 定位 | 推出时间 | 状态 |
|:---|:---|:---|:---:|:---:|
| **ACP**（Agentic Commerce Protocol） | OpenAI + Stripe | AI Agent 结账、支付授权标准 | 2025.9 | ✅ 已在 ChatGPT 运行 |
| **UCP**（Universal Commerce Protocol） | Google + Shopify/Walmart/Visa/Mastercard | 端到端商务编排（发现→结账→履约） | 2026.1 | ✅ 已用于 Google Search AI Mode |
| **AP2**（Agent Payments Protocol） | Google + FIDO 联盟 | 信任/授权层，专注资金安全 | 2026 | ✅ 已捐给 FIDO 联盟 |
| **x402** | Coinbase / Linux 基金会 | 稳定币小额支付（HTTP 402） | 2025 | ⚠️ 早期采用（周均 50 万笔） |

**关键观察**：Stripe 同时出现在 ACP 和 UCP 的阵营中，说明大零售商很可能需要同时支持多个协议。

#### MCP 作为通用连接层

Anthropic 的 **MCP（Model Context Protocol）** 已成为 ACP 和 UCP 共同依赖的底层通信协议——Agent 通过 MCP 调用商品目录、库存查询、下单等工具。

> **信息源**：
> - [ACP GitHub 仓库 - OpenAI + Stripe](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol)
> - [Klaviyo - 什么是 ACP？](https://www.klaviyo.com/solutions/ai/what-is-agentic-commerce-protocol)
> - [OG1O - ACP/UCP/MCP 三大阵营](https://www.og1o.com/en/resources/blog/agentic-commerce-three-camps-ucp-acp-mcp)
> - [Chainstack - Agentic Payments Landscape](https://chainstack.com/the-agentic-payments-landscape/)
> - [Sunrate - Protocol Wars](https://www.sunrate.com/blog/industryinsights/the-protocol-wars-how-competing-agentic-ai-payment-standards-will-shape-b2b-cross-border-transactions/)

---

## 3. 开源属性与商业模式

### 3.1 协议的开源状态

| 协议 | 许可证 | 开源？ | 说明 |
|:---|:---|:---:|:---|
| **ACP** | Apache 2.0 | ✅ 开源 | 规范、SDK 均在 GitHub 公开 |
| **UCP** | 开放标准 | ✅ 文档公开 | 由 Google 及联盟成员共同维护 |
| **AP2** | 捐赠给 FIDO 联盟 | ✅ 开放标准 | 身份验证层 |
| **x402** | MIT | ✅ 开源 | Linux 基金会托管 |

### 3.2 商业模式

Agentic Commerce 的核心商业模式分为三层：

#### 平台层（收取交易佣金）

| 平台 | 模式 | 佣金结构 |
|:---|:---|:---|
| **OpenAI ChatGPT Shopping** | Agent 代下单，平台抽佣 | 交易额的一定比例（具体未公开） |
| **Perplexity "Buy with Pro"** | AI 导购 + 便捷结账 | PayPal 作为收单行，Perplexity 从交易中分成 |
| **Amazon Buy for Me** | 闭环内完成三方网站购物 | 亚马逊收取履约处理费 |

#### 工具层（按用量 / 订阅收费）

| 厂商 | 产品 | 定价 |
|:---|:---|:---|
| **Stripe** | Agentic Commerce Suite + ACP 工具 | 按交易处理量计费 |
| **Salesforce** | Agentforce 360 | 基于消费量定价 |
| **commercetools** | Agentic Jumpstart | 企业定制报价 |
| **Google** | Vertex AI Agent Builder | 按 API 调用量 / token 计费 |

#### 数据层（从"SEO"到"GEO"）

零售商需要为 AI Agent 优化商品数据（Generative Engine Optimization，GEO），这将催生新的数据服务市场——商品目录结构化、实时价格/库存 API、AI 友好型内容策略等。

### 3.3 关键转变

> **App 时代** = 谁拥有最好的界面 + 最多的流量
> **Agentic Commerce 时代** = 谁拥有最好的判断力 + 最结构化的数据

> **信息源**：
> - [ACP GitHub (Apache 2.0)](https://github.com/agentic-commerce-protocol/agentic-commerce-protocol)
> - [Stripe Agentic Commerce Suite](https://stactize.com/artikel/stripes-agentic-commerce-protocol-what-it-means-for-saas-companies-selling-through-cloud-marketplaces/)
> - [AlixPartners - AI Shopping Agents](https://www.alixpartners.com/insights/102mvwb/ai-shopping-agents-customer-gains-retailer-gains-and-what-retailers-stand-to-l/)

---

## 4. 功能全景解析

### 4.1 核心定位

> **AI 智能体自主为用户完成购物全过程——从商品发现、比价、谈判到决策执行和下单支付，人类只需设定目标，AI 代为完成。**

这不是某个 App 的新功能，而是**电商范式的根本转变**：买方从"人操作界面"变成"人委托 AI"，卖方从"为人类用户优化界面"变成"为 AI Agent 优化数据"。

### 4.2 购物全流程对比

| 环节 | 传统电商（人操作） | Agentic Commerce（AI 代劳） |
|:---|:---|:---|
| 🛒 **发现商品** | 用户搜索关键词 → 浏览列表 | AI 理解意图 → 自动匹配商品 |
| 🔍 **比较筛选** | 用户手动比价、看评价 | AI 跨平台比价、聚合评价摘要 |
| 💬 **咨询** | 用户问客服（或 ChatGPT 问完再去网站） | AI Agent 直接与商家 API 交互询价 |
| 🛍️ **下单** | 用户填写购物车 → 自己点"购买" | AI 自动装车 → AI 点"购买" |
| 💳 **支付** | 用户输入卡号/扫码 | AI 使用授权令牌自动支付 |
| 📦 **履约跟踪** | 用户手动查物流 | AI 主动推送物流更新 |
| ↩️ **退换货** | 用户发起退换流程 | AI（未来）自动识别问题并启动退换 |

### 4.3 核心能力

#### 🎯 能力一：意图驱动的商品发现
- **技术**：LLM 理解自然语言购物需求（"我下周要去露营，预算 2000 以内"），自动映射到商品属性
- **差异化**：不再是"关键词匹配"，而是**意图匹配**
- **案例**：Perplexity 用户说"推荐适合敏感肌的防晒霜"，AI 自动检索成分表 + 用户评价 + 价格，输出推荐

#### 🎯 能力二：跨平台自主比价与谈判
- **技术**：多智能体系统，买方 Agent 和卖方 Agent 自动协商
- **案例**：Anthropic 2026 年 4 月 "Project Deal" 实验——Claude 作为买方 Agent 自动在不同商家间比价谈判，最终成交
- **关键**：从"人比价"到"AI 自动撮合"

#### 🎯 能力三：零点击结账（Zero-Click Buying）
- **技术**：ACP / UCP 协议 + 共享支付令牌（SPT）
- **效果**：用户在 ChatGPT 里说"买这个"→ AI 直接下单完成，**用户不需要点任何按钮**
- **Forrester 将其列为 2026 年关键趋势**

#### 🎯 能力四：持续性智能购物（Always-On Shopping）
- **技术**：AI 持续监控价格变动、库存状态、新品上架
- **案例**：Amazon Auto Buy——用户设定价格目标，Rufus 自动监控并在达标时自动下单
- **效果**：购物从"一次性行为"变为"持续委托"

### 4.4 Forrester 两种环境划分

| 环境 | 含义 | 成熟度 | 代表案例 |
|:---|:---|:---:|:---|
| **自有环境（Owned）** | 品牌自己控制的购物平台 | 🟢 1-2 年内可落地 | 品牌电商站内的 AI 导购 |
| **非自有环境（Non-Owned）** | 第三方 AI 平台（ChatGPT、Gemini、Perplexity） | 🟡 还需 3 年以上 | ChatGPT 代你下单 |
| **混合环境** | AI 发现 + 官网成交 | 🟢 现在正在发生 | Walmart Sparky 在 ChatGPT 内导购跳转至 Walmart 结账 |

> **信息源**：
> - [Retail Brew - 2026: 零点击购买元年](https://www.retailbrew.com/stories/2026/01/09/2026-the-year-of-zero-click-buying)
> - [Digital Commerce 360 - Anthropic/OpenAI/Google 在 Agentic Commerce 的动作](https://www.digitalcommerce360.com/2026/04/30/ecommerce-trends-what-anthropic-openai-and-google-are-each-doing-in-agentic-commerce/)
> - [AlixPartners - AI Shopping Agents: Customer & Retailer Gains](https://www.alixpartners.com/insights/102mvwb/ai-shopping-agents-customer-gains-retailer-gains-and-what-retailers-stand-to-l/)
> - [Forrester - Five C's Checklist](https://www.forrester.com/report/opportunity-assessment-for-answer-engine-selling-forresters-five-cs-checklist/RES196915)

---

## 5. 功能实现案例

### 案例一：ChatGPT + ACP 即时购物（OpenAI + Stripe）

**场景**：用户在 ChatGPT 中想买一个 Etsy 手工艺品。

**流程**：
```
用户： "帮我找一个手工制作的陶瓷咖啡杯，预算 300 以内"
ChatGPT： 搜索 Etsy 商品目录 → 展示 3 个推荐 → "这个可以吗？"
用户： "就这个吧"
ChatGPT： 调用 ACP 协议 → 使用用户的 Stripe 授权令牌 → 完成下单
用户： 收到确认消息 + 物流跟踪
```
**关键数据**：全程在 ChatGPT 对话内完成，用户未打开 Etsy 的网站或 App。

**后期调整（2026.3）**：OpenAI 调整策略，将购买流程改回由零售商自己的 App/网站完成，ChatGPT 专注商品发现阶段，降低支付合规风险。

---

### 案例二：Amazon Rufus + Buy for Me + Auto Buy（亚马逊闭环）

**场景**：用户想在 Amazon 上买一款电子产品，但发现另一家网站更便宜。

**流程**：
```
用户： "找到 Sony WH-1000XM6 耳机的最低价"
Rufus： 检索 Amazon 自营 + 第三方网站 → "Best Buy 上 2499 元，比 Amazon 便宜 200"
用户： "帮我买"
Buy for Me： 自动跳转到 Best Buy 网站 → 使用 Amazon 已保存的支付信息 →
              代为填写地址/支付信息 → 完成下单
              买家全程未离开 Amazon App
```
**核心数据**：
- Rufus 月活用户同比增长 **115%**，参与度增长 **400%**
- 使用 Rufus 的用户购买转化率提高 **60%**
- Rufus 2025 年驱动约 **120 亿美元增量年化销售额**
- Auto Buy 用户平均节省约 **20%**

**2026.5 更新**：Amazon 将 Rufus 和 Alexa+ 合并为 **Alexa for Shopping**，免费向所有用户开放。

---

### 案例三：Walmart Sparky 多步购物规划（开放生态路线）

**场景**：用户要准备一个 8 人烧烤聚会。

**流程**：
```
用户： "帮我规划周末 8 人烧烤聚会，预算 500 元"
[在 Walmart App 内 / ChatGPT 内 / Google Gemini 内]

Sparky： 
 ① 推荐烧烤食材清单（肉类、蔬菜、调料、炭火）
 ② 自动对比价格（Walmart 自有 + 第三方卖家）
 ③ 生成购物清单 → 一键加入购物车
 ④ 建议搭配饮品和一次性餐具
 ⑤ 自动选择配送时间（确保周六上午到货）

用户： "再加一听可乐"
Sparky： 更新购物车 → 确认总价 → 用户确认 → 下单
```
**核心数据**：
- 约半数 Walmart App 用户尝试过 Sparky
- Sparky 用户的客单价比普通用户高 **35%**
- Walmart 采取"开放路线"：Sparky 已嵌入 ChatGPT 和 Gemini，但结账回流至 Walmart 站内（站内转化率是 ChatGPT 内的 **3 倍**）

---

### 案例四：Perplexity "Buy with Pro" + PayPal（研究驱动购物）

**场景**：用户在 Perplexity 上研究新手机。

**流程**：
```
用户： "2026 年最好的拍照手机是哪个？"

Perplexity： 
 ① 搜索并对比多篇评测
 ② 输出对比表格（Pixel 11 Pro vs iPhone 17 Pro vs Galaxy S26 Ultra）
 ③ 附上实时价格（来自 Wayfair/NewEgg/BestBuy 等）
 ④ 用户选中后直接在 Perplexity 内完成购买

用户： "买 Pixel 11 Pro"
Perplexity： 调用 PayPal 授权 → Instant Buy 完成下单
```
**关键数据**：Perplexity 放弃了广告模式（高管称广告"侵蚀信任"），全面转向**商务分成**作为收入来源。2025 年 11 月起 "Buy with Pro" 向所有美国用户免费开放。

> **信息源**：
> - [Amazon Q4 2025 - AI Shopping Push](https://www.pymnts.com/amazon/2026/amazon-q4-results-show-agentic-shopping-push-beyond-ai-spending/)
> - [Modern Retail - Amazon Rufus 增长数据](https://www.modernretail.co/technology/amazon-says-its-ai-shopping-assistant-is-gaining-traction-with-rufus-users-up-115/)
> - [Walmart Sparky - eMarketer](https://www.emarketer.com/content/walmart-bets-on-agentic-ai-with-advertising-assistant-sparky-ads)
> - [Perplexity Shopping - AdExchanger](https://www.adexchanger.com/daily-news-roundup/friday-20022026/)
> - [Flywheel Digital - Amazon Rufus 分析](https://www.flywheeldigital.com.cn/resources/insights/service/10784.html)

---

## 6. 主要竞品/阵营

Agentic Commerce 不是单个产品的竞争，而是**生态路线之争**。以下为主要竞争阵营：

### 6.1 阵营概览

| 阵营 | 核心玩家 | 策略 | 口号 |
|:---|:---|:---|:---|
| 🔒 **闭环生态** | Amazon（Rufus + Buy for Me + Auto Buy → Alexa for Shopping） | 一切在亚马逊内完成，甚至屏蔽 ChatGPT 爬取商品目录 | "你是我的顾客" |
| 🤝 **开放伙伴** | OpenAI（ACP）+ Google（UCP）+ 零售商联盟 | 制定开放标准，联合零售商共建 | "AI 作为购物入口" |
| 🏪 **零售商自建** | Walmart Sparky、Target、Best Buy | 在第三方 AI 平台做导购，引导回官网成交 | "掌控客户关系" |
| 🔍 **研究驱动** | Perplexity + PayPal | AI 搜索起家，购物作为变现手段 | "研究完直接买" |
| 🏢 **企业平台** | Salesforce Agentforce、commercetools、Shopify | 为品牌商提供 Agentic Commerce 基础设施 | "赋能商家" |

### 6.2 各阵营详细对比

#### 🔒 亚马逊阵营
- **核心**：Rufus（AI 导购）+ Buy for Me（跨站代买）+ Auto Buy（自动下单）
- **策略**：让用户**永远不需要离开亚马逊**。甚至从 Google Shopping 撤回了广告投放
- **优势**：Prime 会员基数、物流网络、消费者信任
- **劣势**：封闭生态，对第三方商家议价能力过强

#### 🤝 开放阵营（OpenAI + Google）
- **核心**：
  - OpenAI：ChatGPT Shopping + ACP + Stripe
  - Google：Search AI Mode + UCP + Shopping Graph（500 亿+商品列表）
- **策略**：成为用户购物的"AI 入口"，零售商接入即可
- **优势**：用户触达面广（ChatGPT 8 亿用户、Google 搜索数十亿用户）
- **劣势**：支付合规复杂、跨平台体验一致性难保证

#### 🏪 零售商阵营
- **核心**：Walmart Sparky 最具代表性
- **策略**：积极入驻第三方 AI 平台做商品发现，但**引导回自有站结账**
- **优势**：掌控客户数据和关系、站内转化率更高（Walmart 发现站内转化是 ChatGPT 内的 3 倍）
- **劣势**：需要在所有 AI 平台上保持存在感，运维复杂度高

#### 🔍 Perplexity 阵营
- **核心**：研究能力（多源对比）+ "Buy with Pro" + PayPal 收单
- **策略**：AI 搜索 → 购物推荐 → 一键购买，走交易分成模式
- **优势**：用户带着研究意图来，天然适合购物决策
- **劣势**：规模远小于 ChatGPT 和 Google

> **信息源**：
> - [AlixPartners - AI Shopping Agents](https://www.alixpartners.com/insights/102mvwb/ai-shopping-agents-customer-gains-retailer-gains-and-what-retailers-stand-to-l/)
> - [Digital Commerce 360 - Agentic Commerce 路线对比](https://www.digitalcommerce360.com/2026/04/30/ecommerce-trends-what-anthropic-openai-and-google-are-each-doing-in-agentic-commerce/)
> - [Klaviyo - ACP 详解](https://www.klaviyo.com/solutions/ai/what-is-agentic-commerce-protocol)
> - [OG1O - 三大阵营](https://www.og1o.com/en/resources/blog/agentic-commerce-three-camps-ucp-acp-mcp)

---

## 7. 与竞品的横向比较

| 对比维度 | **Forrester Agentic Commerce 理念蓝图** | **亚马逊闭环路线** | **ChatGPT ACP 路线** | **Google UCP 路线** | **零售商自建路线（Walmart）** |
|:---|:---|:---|:---|:---|:---|
| **费用/定价** | 理念免费；实现取决于供应商定价 | Prime $139/年 + Buy for Me 处理费 | ChatGPT Plus $20/月 + ACP 交易佣金 | 搜索免费；UCP 交易手续费 | 免费使用 Sparky；商品在 Walmart 正常定价 |
| **覆盖范围** | 🟢 理想是全平台跨商家 | 🔴 仅 Amazon 生态及有限三方网站 | 🟡 已接入 Etsy/Shopify/Walmart，持续扩展 | 🟢 Google Shopping Graph 500亿+商品 | 🟡 Walmart 自营 + 第三方卖家 |
| **自主程度** | 🟢 AI 全自主（理念目标） | 🟡 半自主（设价 Auto Buy / 需确认代买） | 🟡 半自主（ChatGPT 推 → 用户确认后下单） | 🟡 半自主（AI Mode 推荐 + 结账） | 🟡 半自主（Sparky 规划 + 用户确认） |
| **商品数据质量要求** | 🟢 理念上要求极高 | 🟢 Amazon 内部数据规范 | 🔴 合作商家数据参差不齐 | 🟡 依赖商家自行提交高质量 feed | 🟢 Walmart 有 Listing Quality Score |
| **对商家友好度** | 🟢 理念开放 | 🔴 封闭生态，议价强势 | 🟡 开放但有平台抽佣 | 🟢 开放标准，联盟治理 | 🟢 合作导向，开放接入第三方 AI 平台 |
| **2026 年成熟度** | 🔴 理念超前，大规模仍需时间 | 🟡 已运行（Rufus + Buy for Me） | 🟡 已上线，策略调整中 | 🟡 2026.1 发布，早期采用 | 🟢 Sparky 已在 Walmart App/ ChatGPT/ Gemini 运行 |

### 各阵营最适用的场景

| 阵营 | 最佳适用场景 |
|:---|:---|
| **亚马逊闭环** | Prime 会员日常购物（快消品、日用品、标品），追求"无脑下单" |
| **ChatGPT ACP** | 需要自然语言对话的购物决策（礼品推荐、旅行规划），适合小型商家接入 |
| **Google UCP** | 复杂比价场景（电子产品、家电），利用 Google 搜索的天然对比优势 |
| **零售商自建（Walmart 等）** | 需要购物规划指导的场景（聚会、装修、菜谱），品牌希望保留客户关系 |
| **Perplexity** | 研究驱动的高决策成本购物（数码产品、汽车、投资品） |

---

## 8. 版本迭代与时间线

### 8.1 关键里程碑

| 时间 | 事件 | 意义 |
|:---:|:---|:---|
| **2024.7** | Amazon 在美国推出 Rufus AI 导购 | Agentic Commerce 最早的产品雏形 |
| **2025.5** | Perplexity 宣布 PayPal 合作，开启 AI 内购 | AI 电商的第一个"研究-购买"闭环 |
| **2025.6** | Walmart 推出 Sparky AI 购物助手 | 零售商自建路线起跑 |
| **2025.9** | **OpenAI + Stripe 发布 ACP（Agentic Commerce Protocol）**，ChatGPT 内嵌即时结账 | Agentic Commerce 的"协议元年"开启 |
| **2025 黑五季** | Salesforce AI 影响 **$670 亿**全球销售额（占 20%） | 数据证明 AI 购物的商业规模 |
| **2025.11** | Amazon 推出 **Auto Buy**（设价自动下单） | 从"AI 推荐"进入"AI 代买" |
| **2025.12** | Perplexity "Buy with Pro" 向全美免费开放；Adobe 报告 AI 流量同比暴增 **693%** | Agentic Commerce 从早期采用进入主流 |
| **2026.1** | **Google 联合 Shopify/Walmart/Visa/Mastercard 发布 UCP** | 开放路线正式挑战 ACP |
| **2026.3** | OpenAI 调整策略：ChatGPT 聚焦商品发现，结账交回零售商 App | 行业在"AI 内闭环"和"开放导流"之间探索 |
| **2026.4** | **Forrester 发布《2026 十大新兴技术》，Agentic Commerce 列入交互层**；Anthropic 启动 "Project Deal" 多 Agent 谈判实验 | 权威机构正式认定 + 多 Agent 商务实验 |
| **2026.5** | Amazon 合并 Rufus + Alexa+ 为 **Alexa for Shopping** | 亚马逊路线的战略升级 |
| **2026.5** | Google I/O 发布 UCP 扩展（Universal Cart + YouTube 购物 + AP2 集成） | UCP 生态加速扩展 |
| **2026.6** | ACP 规范更新（v2026-04-17）：新增购物车、商品 Feed、订单管理、MCP 集成 | 标准协议持续完善 |

### 8.2 市场数据增长线

| 年份 | 全球市场规模 | 关键指标 |
|:---:|:---|:---|
| **2025** | ~$57 亿 | Agentic Commerce 元年（Retail Brew 称为"诞生之年"） |
| **2026** | ~$77 亿 | 协议标准竞争、多路线并行探索 |
| **2030（预测）** | ~$300-500 亿 | Bain 预测占电商 15-25%；McKinsey 预测全球 $3-5 万亿零售额受 AI 影响 |
| **2033（预测）** | ~$655 亿 | Grand View Research 预测（CAGR 35.7%） |

### 8.3 未来发展预测

| 时间段 | 预期进展 |
|:---|:---|
| **2026-2027** | 协议标准竞争持续（ACP vs UCP）；零售商大规模建设 GEO（生成式引擎优化）；零点击购买从小众走向常见 |
| **2027-2029** | 互操作性标准确立；多 Agent 谈判成为部分品类常态；AI 购物的信任和隐私框架成熟 |
| **2029+** | Gartner 预测 20% 以上数字商务交易通过 AI 平台执行；Deloitte 预测 25% 全球电商由 AI Agent 驱动 |

> **信息源**：
> - [Grand View Research - Agentic Commerce Market 2026-2033](https://www.grandviewresearch.com/industry-analysis/agentic-commerce-market-report)
> - [Retail Brew - 2025: The Birth of Agentic Commerce](https://www.retailbrew.com/stories/2025/12/17/2025-the-birth-of-agentic-commerce)
> - [commercetools - Agentic Commerce Stats 2026](https://Commercetools.com/blog/agentic-commerce-stats-enterprise-guide)
> - [Bain/McKinsey/J.P. Morgan 预测（via Grand View）](https://www.grandviewresearch.com/industry-analysis/agentic-commerce-market-report)
> - [Gartner - 2026 技术趋势](https://www.gartner.com/en/information-technology/topics/technology-trends)

---

## 一句话锐评

**Agentic Commerce 是 2026 年 AI 浪潮中最"软硬结合"的商业趋势**——它不是科幻，Amazon Rufus、ChatGPT 购物、Walmart Sparky 已在真实产生交易额。但行业仍处在"协议混战 + 各自摸索"的阶段，没有一家找到完美答案。**对零售商的核心忠告：不要慌，但必须现在就开始结构化你的商品数据。** 因为在 Agentic Commerce 的世界里，**如果你的数据不能被 AI 读懂，你就不存在于消费者的选择列表中。**

---

> **报告生成日期**：2026 年 7 月 11 日
> **关联阅读**：
> - [[Layer Zero Experience 深度调研报告]]（Agentic Commerce 是其核心应用场景之一）
> - [[Obsidian Skills AI 智能体与 Obsidian 的桥梁]]
