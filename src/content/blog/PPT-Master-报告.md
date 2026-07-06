---
title: "PPT Master（ppt-master）深度调研报告"
date: "2026-07-05"
tags: ["AI","调研","PPT","自动化","工具"]
summary: "| **开发方** | **Hugo He（何雨果）**，独立开发者 |"
---

# PPT Master（ppt-master）深度调研报告

> **调研日期**：2026-07-05  
> **资料来源**：GitHub、新浪科技、CSDN、Trendshift、WPS 官方、Beautiful.ai Blog 等多渠道交叉验证

---

## 1. 开发者与公司背景

| 维度 | 详情 |
|------|------|
| **开发方** | **Hugo He（何雨果）**，独立开发者 |
| **国家/地区** | 中国 |
| **职业背景** | 投融资行业从业者，持有 **CPA**（注册会计师）、**CPV**（注册资产评估师）、**Consulting Engineer (Investment)**（咨询工程师-投资）三重专业资质 |
| **GitHub** | [@hugohe3](https://github.com/hugohe3) |
| **个人网站** | [hehugo.com](https://www.hehugo.com/) |
| **融资阶段** | **零融资，纯独立开发**。未接受任何风险投资，无大厂背书。通过 API 中转商（PackyCode、APIKEY.FUN、RunAPI、优云智算）的 affiliate 赞助维持运营 |

> **来源**：[新浪科技报道](https://finance.sina.cn/2026-05-01/detail-inhwmrev0208202.d.html?vt=4) 明确证实：*"同期没有融资，没有大厂背书，就是一个独立开发者做出来的。"*

---

## 2. 底层技术栈

PPT Master 本身**不自带大模型**，而是作为 AI IDE（Claude Code / Cursor / VS Code Copilot 等）中的 **Skill/工作流** 运行，通过 IDE 所接入的大模型来驱动生成。开发者推荐的最佳模型搭配：

- **Claude 系列**（Claude Opus / Sonnet）：凭借 ~1M Token 的超大上下文窗口，适合一次处理长篇文档
- **DeepSeek V4**：成本极低，约 ¥0.6 可生成两份 PPT
- **GPT-4o / GPT-5**：综合能力强
- **Gemini 系列**：多模态处理文档
- **gpt-image-2 / DALL·E**：用于 AI 配图生成

### 核心技术架构（差异化创新）

```
输入文档 → 预处理(Markdown) → AI三角色协作 → 逐页SVG生成 → Python脚本SVG→DrawingML → 原生.pptx
```

- **三角色接力工作流**：Strategist（内容策划）→ Image Generator（配图生成）→ Executor（格式转换），模拟人类制作 PPT 的思维链条
- **SVG → DrawingML 转换引擎**：SVG 和 DrawingML 本质同为 2D 矢量格式，转换是"方言翻译"而非格式跨越，这是其能产出**真正可编辑 PPTX** 的技术关键
- **Python 后处理管道**：字体检测、渐变优化、形状去重、动画注入等

---

## 3. 开源属性与商业模式

| 维度 | 详情 |
|------|------|
| **开源/闭源** | **完全开源** |
| **开源协议** | **MIT 协议**（最宽松，可自由使用、修改、商用） |
| **定价模式** | **完全免费**。唯一开销 = 调用大模型 API 的 Token 费用 |
| **用户参考成本** | DeepSeek V4：约 ¥0.6/份 PPT；Claude Opus：约 ¥0.5–3/份；VS Code Copilot：最低 $0.08/份 |
| **隐私安全** | 文件全程本地处理，不上传任何第三方服务器 |
| **盈利方式** | 通过 API 中转商 affiliate 推广获得赞助，不向用户收费 |

---

## 4. 功能全景解析

**主要功能**（一句话概括）：将任意格式文档（PDF/Word/Markdown/URL/文本/Excel）通过 AI 生成为**原生可编辑的 PowerPoint (.pptx) 文件**，每一页、每个文本框和图表都能在 PPT 中直接修改。

### 核心功能与核心技术

| # | 核心功能 | 背后关键技术 |
|---|---------|------------|
| **1** | **原生可编辑 PPTX 输出** | 独创 **SVG → DrawingML 矢量转换引擎**。AI 生成结构化 SVG，Python 脚本将其编译为 PowerPoint 原生形状（文本框、矩形、渐变、图表），每个元素可在 PPT 中逐项修改，非位图截图 |
| **2** | **20+ 布局模板 × 52+ 可视化图表模板** | 覆盖 MBB 咨询级、学术答辩、科技风、品牌风、政务风等场景。内置战略模型图、架构图、流程图等标准化图表模板 + **6700+ 矢量图标库**（Tabler/Phosphor/Simple Icons） |
| **3** | **多角色 AI 协作工作流** | **Strategist → Image Generator → Executor** 三角色接力。支持 12 种 AI 生图后端（gpt-image-2、DALL·E、Gemini 等），自动生成演讲者备注并转为多语言 TTS 语音旁白，支持原生动画和页面转场 |

### 其他亮点功能

- **10+ 画布格式**：标准 16:9/4:3、小红书 (3:4)、朋友圈 (1:1)、Story (9:16) 等
- **语音旁白**：从演讲者备注自动生成 TTS 音频，可导出为视频
- **自定义 PPTX 模板**：可上传自己的 .pptx 作为母版，AI 遵循企业品牌风格
- **多 IDE 兼容**：Claude Code、Codex、Cursor、VS Code Copilot、Codebuddy

---

## 5. 主要竞品清单

| #   | 竞品                                  | 定位                            | 备注                                     |
| --- | ----------------------------------- | ----------------------------- | -------------------------------------- |
| 1   | **Gamma**                           | 一站式 AI 文档/网页/幻灯片生成平台          | $680M Series B 融资，估值 $2.1B，2026 年市场领导者 |
| 2   | **Beautiful.ai**                    | 品牌级 AI 幻灯片设计工具                | Smart Slide 自动布局引擎，品牌管控最强              |
| 3   | **WPS AI / 博思 AIPPT**               | 中文用户专属 AI PPT 工具              | 中文理解最优，完美 PPTX 导出，免费                   |
| 4   | **Microsoft Copilot in PowerPoint** | 深度集成 Microsoft 365 生态         | 从 SharePoint/OneDrive 文档直接创建，企业级       |
| 5   | **Plus AI**                         | PowerPoint/Google Slides 原生插件 | 零迁移成本，完美原生 PPTX 导出                     |

> 注：**Tome** 已于 2026 年 3 月退出 AI Slides 市场，转向销售自动化，不再作为竞品。

---

## 6. 与竞品的横向比较

| 对比维度 | **PPT Master** | **Gamma** | **Beautiful.ai** | **WPS AI** | **Plus AI** |
|:---|:---|:---|:---|:---|:---|
| **价格** | 免费（仅 Token 费 ≈ ¥0.5–3/份） | $8–15/月 | $12–45/月 | 免费 | $15–25/月 |
| **PPTX 可编辑性** | ⭐⭐⭐⭐⭐ 原生可编辑 | ⭐⭐⭐ 布局偶有偏移 | ⭐⭐⭐⭐ 强 | ⭐⭐⭐⭐⭐ 原生可编辑 | ⭐⭐⭐⭐⭐ 原生可编辑 |
| **易用性与上手门槛** | ⭐⭐ 需配置 Python 环境 + AI IDE | ⭐⭐⭐⭐⭐ 开箱即用 | ⭐⭐⭐⭐ 引导式体验 | ⭐⭐⭐⭐⭐ 开箱即用 | ⭐⭐⭐⭐ 安装插件即可 |
| **设计自由度** | ⭐⭐⭐⭐⭐ 全开放可定制 | ⭐⭐⭐ 卡片式布局约束 | ⭐⭐⭐ Smart Slide 规则约束 | ⭐⭐⭐ 模板驱动 | ⭐⭐⭐⭐ 原生 PPT 全功能 |
| **中文支持** | ⭐⭐⭐⭐ 好 | ⭐⭐ 一般 | ⭐⭐ 一般 | ⭐⭐⭐⭐⭐ 最优 | ⭐⭐ 一般 |
| **生态与集成能力** | ⭐⭐⭐ 依赖 AI IDE 生态 | ⭐⭐⭐⭐ 多格式 + 协作 | ⭐⭐⭐⭐ 团队协作 + 品牌库 | ⭐⭐⭐⭐⭐ WPS 生态深度集成 | ⭐⭐⭐⭐⭐ Office/Google 双生态 |

### 各竞品最适用的细分场景

| 工具 | 最佳适用场景 |
|------|------------|
| **PPT Master** | 需要**完全可编辑的 PPTX**、预算有限、对设计有高要求的独立创作者；咨询/金融从业者；学术答辩 |
| **Gamma** | 快速从 brief 生成现代化幻灯片、Web 原生展示优先、团队协作场景 |
| **Beautiful.ai** | 企业品牌团队、需要强制设计一致性、多人协作的品牌化幻灯片 |
| **WPS AI** | 中文内容为主、WPS 用户、国内办公生态、预算敏感 |
| **Plus AI** | 深度依赖 PowerPoint/Google Slides 原生工作流、需要零迁移成本的企业用户 |

---

## 7. 版本迭代信息

| 维度 | 详情 |
|------|------|
| **首次公开发布** | 2026 年 Q1（具体 v1.0.0 日期暂无公开信息） |
| **当前最新稳定版**（截至 2026-07-05） | **v2.11.0**（发布于 2026-06-20） |
| **更新频率** | **极高频率迭代**。项目在约 3 个月内从 v1.x 迭代至 v2.11.0，平均每周发布 1–2 个版本 |
| **Star 增长** | 2026 年 5–7 月呈爆发增长：从约 4,600 Star → **35,000+ Star**，GitHub Trending 多榜登顶 |
| **仓库地址** | [github.com/hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) |
| **安装方式** | Claude Code 插件市场：`/plugin marketplace add hugohe3/ppt-master` |

---

## 一句话锐评

> **免费开源、输出真正可编辑，是 2026 年最值得重点关注的 AI PPT 工具，尤其适合独立创作者和咨询/金融/学术场景。**

---

*Sources: [GitHub](https://github.com/hugohe3/ppt-master) · [Trendshift](https://trendshift.io/repositories/25760) · [CSDN 技术拆解](https://blog.csdn.net/keshi_curry/article/details/160112855) · [新浪科技](https://finance.sina.cn/2026-05-01/detail-inhwmrev0208202.d.html) · [WPS AI 对比](https://www.wps.cn/article/LxFqa1ik.html) · [Beautiful.ai Blog](https://www.beautiful.ai/blog/best-ai-presentation-makers) · [GitCode 报道](https://gitcode.csdn.net/69f5e5ec54b52172bc7156a6.html) · [SourcePulse](https://www.sourcepulse.org/projects/20851718)*
