---
title: "🔮 Obsidian 深度调研报告"
date: "2026-07-05"
tags: ["AI","调研","Obsidian","工具","科研"]
summary: "- **Shida Li（李世达）** 与 **Erica Xu** 联合创立。二人均为加拿大滑铁卢大学毕业生，本科同学。在创办 Obsidian 之前，二人曾开发大纲工具 **Dynalist**。"
---

# 🔮 Obsidian 深度调研报告

> **调研日期**：2026-07-05

---

## 1. 开发者与公司背景

**开发方全称**：Dynalist Inc.（加拿大注册企业）

**所属国家/地区**：🇨🇦 加拿大。公司无固定办公室，全员远程办公。

**创始人基本信息**：
- **Shida Li（李世达）** 与 **Erica Xu** 联合创立。二人均为加拿大滑铁卢大学毕业生，本科同学。在创办 Obsidian 之前，二人曾开发大纲工具 **Dynalist**。
- 现任 CEO 为 **Steph Ango**。

**团队规模**：截至2026年，核心工程师仅 **3–4 人**，公司总人数控制在 **12 人以内**。创始人公开承诺永远不超过 12 人。公司还养了一只办公室猫 Sandy。

**盈利情况**：年营收约 **2,500 万美元**（2025年数据），净利润率超过 60%。完全自筹资金，**从未接受任何风险投资**，从第一天起即盈利。

**信条与发展规划**：
- 核心理念：**"File over App"（文件优先于应用）**——数据以纯文本 Markdown 存储在用户本地，不做任何数据采集。
- 内部文化：不开会、不设 HR/销售/行政岗位，全部使用异步沟通。
- 远景：保持小而美，永不追求增长到大规模团队。

**信息源**：
- [Obsidian 7 人团队年入 2500 万美元](https://m.163.com/dy/article/KPS0PFGC05119734.html)
- [Obsidian 产品哲学播客](https://podscan.fm/podcasts/kua-guo-chuan-men-er-ji-hua/episodes/560obsidian-de-chan-pin-zhe-xue-bu-kai-hui-bu-rong-zi-bu-tong-zhi-shi-jie-yi-ge-7-ren-tuan-dui-ru-he-zuo-chu-qian-wan-ji-bi-ji-gong-ju)
- [Obsidian 官宣免费商用](https://obsidian.md/blog/free-for-work/)
- [Wikipedia: Obsidian (software)](https://en.wikipedia.org/wiki/Obsidian_(software))

---

## 2. 底层技术栈

该软件**非 AI 原生**，不涉及基础大模型。

| 层级 | 技术 |
|---|---|
| **桌面框架** | **Electron**（基于 Chromium + Node.js） |
| **编程语言** | TypeScript / JavaScript / HTML / CSS |
| **编辑器核心** | CodeMirror 6 |
| **文件格式** | 纯文本 **Markdown**（`.md`），无专有格式 |
| **数据存储** | 本地文件系统，无服务器端数据库 |
| **跨平台** | Windows / macOS / Linux / iOS / Android |

**Architecture note**：Obsidian 明确不提供 Web 版，因其架构依赖直接访问本地文件系统。这种设计既是技术选择，也是其"本地优先"哲学的体现。

**AI 扩展方式**：Obsidian 本身不是 AI 软件，但社区插件生态已接入 ChatGPT、Claude、DeepSeek 等多种 LLM，通过插件实现 RAG 检索增强、AI 问答、自动标签等功能。这些均为第三方社区实现，非官方内置。

**信息源**：
- [Wikipedia: Obsidian (software)](https://en.wikipedia.org/wiki/Obsidian_(software))
- [ClickUp Obsidian Review 2026](https://clickup.com/learn/topic/productivity/tools/obsidian/#key-features)

---

## 3. 开源属性与商业模式

### 开源属性
**闭源**。应用程序源代码不公开。但笔记采用**开放的纯文本 Markdown 格式**，用户数据完全自主可控——即使 Obsidian 停止运营，所有笔记直接用任何文本编辑器打开，零锁定。

团队公开解释不选择开源的原因：
1. 开源不自动等于安全（没有昂贵第三方审计的开源同样有风险）
2. 代码审查耗时超过编码本身
3. 额外维护成本会影响产品开发进度
4. 希望不用 VC 资金也能养活团队

### 定价模式（2026 年当前）

| 层级 | 价格 | 说明 |
|---|---|---|
| **个人使用** | **免费** 🆓 | 完整功能无限制，所有社区插件可用 |
| **商用** | **免费** 🆓 | 2025年2月起永久免费（此前$50/人/年） |
| **Obsidian Sync** | **$4–5/月** | 端到端加密跨设备同步 + 版本历史 |
| **Obsidian Publish** | **$8–10/月** | 笔记发布为静态网站，支持自定义域名 |
| **Catalyst 支持者** | **$25 一次性** | 抢先体验 insider 版 + 社区徽章 |

**模式本质**：**"免费核心 + 付费便利服务"（Freemium）**。核心产品完全免费，仅对云同步和发布功能收费。付费用户不到总用户的 1%，但已足以支撑千万美元级营收。

**信息源**：
- [Obsidian License 页面](https://obsidian.md/zh/license)
- [Obsidian 免费商用公告](https://obsidian.md/blog/free-for-work/)
- [Obsidian 定价页面](https://obsidian.md/pricing)

---

## 4. 功能全景解析

### 主要功能（50 字概括）
> 以本地 Markdown 为基础的个人知识管理工具，通过双向链接与知识图谱构建互联知识网络，面向深度思考者与写作者。

### 核心功能与核心技术

| 核心功能                       | 关键技术说明                                                                                                        |
| -------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **双向链接与知识图谱**              | `[[]]` Wiki 链接语法自动建立反向链接；基于 Canvas/WebGL 的交互式图谱可视化，支持按标签/文件夹着色、深度控制、3D 视图扩展。                                  |
| **Bases 核心插件**（2025年旗舰新功能） | 将 YAML frontmatter 元数据转换为类数据库视图（列表/表格/卡片/日历），支持拖拽、筛选、排序、公式计算，全程不依赖外部数据库。                                      |
| **2,700+ 社区插件生态**          | 插件 API 基于 TypeScript，开发者可自由扩展功能。热门插件覆盖：Excalidraw（手绘风格画图，>600万下载）、看板管理、间隔重复（Spaced Repetition）、思维导图、AI 对话集成等。 |
| **Canvas 无限画布**            | 将笔记、图片、PDF、卡片拖拽到任意位置的可视化工作区，适合头脑风暴与项目规划。                                                                      |
| **CLI 命令行工具**（v1.12 新增）    | 支持命令行创建文件、搜索笔记、切换任务状态、执行 JavaScript 脚本。                                                                       |

**信息源**：
- [Obsidian 官方功能页](https://obsidian.md/features)
- [Obsidian GitHub Release 页面](https://github.com/obsidianmd/obsidian-releases/releases)
- [MakeUseOf Obsidian 可视化插件](https://www.makeuseof.com/obsidian-plugins-visualize-notes/)

---

## 5. 主要竞品清单

| 竞品                | 开发商                    | 定位                              | 本产品优势                    | 本产品劣势                   |
| ----------------- | ---------------------- | ------------------------------- | ------------------------ | ----------------------- |
| **Notion**        | Notion Labs Inc.（美国）   | All-in-One 工作空间（笔记+数据库+看板+项目管理） | 不支持离线、数据在云端、Markdown 不完整 | 团队协作极强、AI 功能原生集成、模板生态丰富 |
| **Logseq**        | Logseq 开源社区            | 开源大纲式双链笔记                       | 插件生态远小于 Obsidian、UI 粗糙   | 完全开源免费、块级引用强大、内建任务管理    |
| **Roam Research** | Roam Research Inc.（美国） | 网络化思维/块引用先驱                     | 纯云端需联网、$15/月价格高、AI 生态弱   | 块引用开创者、daily notes 流程极佳 |
| **Bear**          | Shiny Frog（意大利）        | Apple 生态极简 Markdown 写作          | 仅限 Apple、无图谱/双链          | 设计精美、写作体验极佳、上手零门槛       |
| **Tana**          | Tana AS（挪威）            | AI 原生大纲知识管理                     | 非开源、生态尚在初期               | AI 自动分类/组织能力强、交互新颖      |

---

## 6. 与竞品的横向比较

| 对比维度 | **Obsidian** | **Notion** | **Logseq** | **Roam Research** | **Bear** |
|---|---|---|---|---|---|
| **价格** | 免费（同步 $4-5/月） | 免费 / $10+/月 | 🆓 完全免费开源 | $15/月 | 免费 / $2.99/月 |
| **性能/离线能力** | ⭐⭐⭐⭐⭐ 完全离线，秒开 | ⭐⭐ 离线极弱 | ⭐⭐⭐⭐⭐ 完全离线 | ⭐⭐ 纯云端需联网 | ⭐⭐⭐⭐ iCloud 同步 |
| **易用性与上手门槛** | ⭐⭐⭐ 学习曲线陡峭 | ⭐⭐⭐⭐⭐ 开箱即用 | ⭐⭐⭐ 大纲式需适应 | ⭐⭐ 概念抽象门槛高 | ⭐⭐⭐⭐⭐ 极简无门槛 |
| **生态与集成能力** | ⭐⭐⭐⭐⭐ 2700+ 插件，Git 兼容 | ⭐⭐⭐⭐ 模板+集成+AI | ⭐⭐⭐ 插件有限，Git 兼容 | ⭐⭐ 几乎无生态 | ⭐ 封闭生态 |

**各竞品最适用场景**：
- **Obsidian**：深度个人知识管理、科研笔记、程序员编程笔记、需要数据主权者
- **Notion**：团队协作的项目管理、数据库驱动的信息组织、需要 AI 辅助的业务场景
- **Logseq**：偏好大纲式思维、注重开源和隐私、日常日志记录
- **Roam Research**：学术研究、自下而上的知识构建、非线性思维流
- **Bear**：Apple 纯血用户、日常轻量写作、追求极简美学

---

## 7. 版本迭代信息

| 项目 | 详情 |
|---|---|
| **首次公开发布（Beta）** | **2020 年 3 月 30 日**，版本号 v0.0.1 |
| **首个正式稳定版（1.0.0）** | **2022 年 10 月 13 日**（经历 2 年半公测） |
| **当前最新稳定版**（截至 2026-07-05） | **v1.13.1**（2026 年 6 月 9 日发布） |
| **更新频率** | **约 18 天/次**，年均约 20 个版本，属于高频迭代 |

### 近年重要版本里程碑

| 版本 | 日期 | 重点内容 |
|---|---|---|
| v1.0.0 | 2022-10-13 | 首个正式稳定版 |
| v1.9.0 | 2025-05-22 | **Bases 核心插件**（数据库式笔记管理） |
| v1.11.7 | 2026-02-05 | 外观设置重构、全屏模式、浮动导航栏 |
| v1.12.0 | 2026-02-11 | **CLI 命令行工具**、Community Hub、图片缩放 |
| v1.13.0 | 2026-05-29 | 设置面板重构（搜索+键盘导航） |
| v1.13.1 | 2026-06-09 | 当前最新版本（insider 预览版） |

**信息源**：
- [Obsidian GitHub Releases](https://github.com/obsidianmd/obsidian-releases/releases)
- [Wikipedia: Obsidian (software)](https://en.wikipedia.org/wiki/Obsidian_(software))

---

## 一句话锐评

> **不上云、不融资、不加班——7人团队用纯文本 Markdown 打赢了百亿独角兽，知识管理领域最值得关注的"反 VC"创业样本。** 适合深度知识构建者、研究者和数据主权洁癖者，但团队协作场景不建议用。
