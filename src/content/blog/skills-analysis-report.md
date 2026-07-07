---
title: "Skills 分析报告"
date: "2026-07-07"
tags: []
summary: "Skills 分析与评估报告"
categories: []
---
# Skills 分析报告

> 生成日期：2026-07-07
> 环境：LobeHub / Claude Code

---

## 一、概述

本报告对当前系统中 **cc-switch**（`~/.cc-switch/skills/`）管理的 65 个 skills 进行了分类整理和运行速度影响分析，并以用户提问为主线记录完整分析过程。

---

## 二、全部分类汇总

### 1️⃣ Nature 期刊系列（15 个）

专为 Nature 家族期刊论文的全流程写作、翻译、审稿、配图、文献管理。

| Skill | 用途 | 速度影响 |
|-------|------|:--------:|
| `nature-academic-search` | 多源文献检索 | 🔴 高 |
| `nature-citation` | 引用格式/管理 | 🟢 低 |
| `nature-data` | 数据可用性声明 | 🟡 中 |
| `nature-downloader` | 文献全文下载 | 🔴 高 |
| `nature-experiment-log` | 实验日志 | 🟢 低 |
| `nature-figure` | 科学配图 | 🔴 高 |
| `nature-literature-pipeline` | 文献梳理流水线 | 🔴 高 |
| `nature-paper-to-patent` | 论文转专利 | 🟡 中 |
| `nature-paper2ppt` | 论文转PPT | 🟡 中 |
| `nature-polishing` | 语言润色 | 🟡 中 |
| `nature-proposal-writer` | 基金申请写作 | 🟡 中 |
| `nature-reader` | 论文精读/翻译 | 🟡 中 |
| `nature-response` | 审稿意见回复 | 🟢 低 |
| `nature-reviewer` | 模拟审稿 | 🟢 低 |
| `nature-writing` | 论文写作 | 🟢 低 |

### 2️⃣ 数据科学 / 机器学习（12 个）

科学计算、ML 框架、数据分析库的最佳实践和代码示例。

| Skill | 用途 | 速度影响 |
|-------|------|:--------:|
| `matplotlib` | Python 科学绘图 | 🟢 低 |
| `nextflow` | 生物信息工作流 | 🟢 低 |
| `optimize-for-gpu` | GPU 优化 | 🟢 低 |
| `polars` | DataFrame 库 | 🟢 低 |
| `pymatgen` | 材料科学计算 | 🟢 低 |
| `pymoo` | 多目标优化 | 🟢 低 |
| `pytorch-lightning` | PyTorch 训练框架 | 🟢 低 |
| `rowan` | 四元数/旋转运算 | 🟢 低 |
| `scikit-learn` | 机器学习经典库 | 🟢 低 |
| `shap` | 模型可解释性 | 🟢 低 |
| `torch-geometric` | 图神经网络 | 🟢 低 |
| `umap-learn` | 降维可视化 | 🟢 低 |

> **重要说明**：这 12 个 skills 本质上只是**代码范例和最佳实践指南**，不会实际运行对应的 ML 框架。它们不会产生网络 I/O 或大量输出，对运行速度**基本无影响**。

### 3️⃣ 通用科研学术（9 个）

科研方法设计、统计、文献管理、假设生成。

| Skill | 用途 | 速度影响 |
|-------|------|:--------:|
| `citation-management` | 学术引用管理 | 🟡 中 |
| `database-lookup` | 科学数据库查询 | 🟡 中 |
| `experimental-design` | 实验设计 | 🟢 低 |
| `hypothesis-generation` | 假设生成 | 🟢 低 |
| `hugging-science` | 科研方法论 | 🟢 低 |
| `literature-review` | 文献综述 | 🟡 中 |
| `paper-lookup` | 论文查找 | 🟢 低 |
| `scientific-brainstorming` | 科研头脑风暴 | 🟢 低 |
| `statistical-power` | 统计功效分析 | 🟢 低 |

### 4️⃣ 学术写作出图（5 个）

学术图表、可视化、学术写作规范。

| Skill | 用途 | 速度影响 |
|-------|------|:--------:|
| `scientific-schematics` | 科学示意图 | 🟢 低 |
| `scientific-slides` | 学术幻灯片 | 🟢 低 |
| `scientific-visualization` | 科学数据可视化 | 🟢 低 |
| `scientific-writing` | 学术写作指导 | 🟢 低 |
| `what-if-oracle` | 反事实分析 | 🟢 低 |

### 5️⃣ 设计 / 前端（7 个）

UI 设计、前端开发、创意编码。

| Skill | 用途 | 速度影响 |
|-------|------|:--------:|
| `algorithmic-art` | 算法艺术(p5.js) | 🟢 低 |
| `brand-guidelines` | 品牌规范 | 🟢 低 |
| `canvas-design` | 画布设计 | 🟡 中 |
| `frontend-design` | 前端设计 | 🟢 低 |
| `theme-factory` | 主题工厂 | 🟢 低 |
| `web-artifacts-builder` | Web 组件构建 | 🟡 中 |
| `webapp-testing` | Web 测试 | 🔴 高 |

### 6️⃣ 办公文档 / 模板（10 个）

Office 文档处理、模板创作。

| Skill | 用途 | 速度影响 |
|-------|------|:--------:|
| `doc-coauthoring` | 文档协作 | 🟢 低 |
| `docx` | Word 文档处理 | 🟢 低 |
| `infographics` | 信息图制作 | 🟢 低 |
| `markdown-mermaid-writing` | Markdown + Mermaid 图表 | 🟡 中 |
| `pdf` | PDF 文件处理 | 🟢 低 |
| `ppt-master` | PPT 高级处理 | 🟢 低 |
| `pptx` | PPT 文件处理 | 🟢 低 |
| `skill-creator` | 技能创建器 | 🟢 低 |
| `template` | 模板工具 | 🟢 低 |
| `xlsx` | Excel 文件处理 | 🟢 低 |

### 7️⃣ 开发工具 / 其他（7 个）

开发辅助、工具链、趣味工具。

| Skill | 用途 | 速度影响 |
|-------|------|:--------:|
| `claude-api` | Claude API 工具 | 🟢 低 |
| `graphify` | 代码知识图谱 | 🟡 中 |
| `internal-comms` | 内部沟通 | 🟢 低 |
| `karpathy-guidelines` | AI 工程原则 | 🟢 低 |
| `mcp-builder` | MCP 服务器构建 | 🟡 中 |
| `modal` | 云函数/GPU 计算 | 🟢 低 |
| `slack-gif-creator` | Slack 动图 | 🟢 低 |

---

## 三、速度影响全景图

### 评级标准

| 评级 | 含义 | 典型原因 |
|:----:|------|----------|
| 🔴 高 | 明显拖慢速度 | 多轮网络 I/O、浏览器操作、大量输出 token |
| 🟡 中 | 取决于任务复杂度 | 中等输出量、轻度外部查询 |
| 🟢 低 | 基本不影响 | 纯模板/指南/代码范例 |

### 影响分布

```
高影响 (🔴)    ████████████████  7 个  (10.8%)
中影响 (🟡)    ████████████████  12 个 (18.5%)
低影响 (🟢)    ████████████████████████████████  46 个 (70.7%)
```

### 高影响 Skills 完整列表

在 LobeHub 上追求速度时，建议**按需加载**以下 7 个 skills：

| # | Skill | 拖慢原因 |
|:-:|-------|----------|
| 1 | `nature-academic-search` | 多源文献搜索（PubMed、CrossRef、arXiv），每次独立网络请求 |
| 2 | `nature-downloader` | 查找 + 下载 PDF 全文，大量 I/O |
| 3 | `nature-figure` | 生成复杂 Python/R 科学图，大量输出 token（SVG/PDF/TIFF） |
| 4 | `webapp-testing` | 操作 Chrome DevTools 浏览器，资源消耗大 |
| 5 | `citation-management` | Google Scholar / PubMed 搜索验证引用 |
| 6 | `database-lookup` | 78 个科学数据库 REST API 查询 |
| 7 | `literature-review` | 多轮文献搜索 |

---

## 四、已删除的技能记录

### Superpowers 6.1.1（14 个 skills）

来自 `superpowers@superpowers-marketplace` 插件

| 删除的技能 | 用途分类 |
|------------|----------|
| `brainstorming` | 流程类 |
| `dispatching-parallel-agents` | 流程类 |
| `executing-plans` | 流程类 |
| `finishing-a-development-branch` | 流程类 |
| `receiving-code-review` | 流程类 |
| `requesting-code-review` | 流程类 |
| `subagent-driven-development` | 流程类 |
| `systematic-debugging` | 流程类 |
| `test-driven-development` | 流程类 |
| `using-git-worktrees` | 流程类 |
| `using-superpowers` | 流程类 |
| `verification-before-completion` | 流程类 |
| `writing-plans` | 流程类 |
| `writing-skills` | 流程类 |

### UI/UX Pro Max 2.6.2（6 个 skills）

来自 `ui-ux-pro-max@ui-ux-pro-max-skill` 插件

| 删除的技能 | 用途分类 |
|------------|----------|
| `banner-design` | 设计类 |
| `brand` | 设计类 |
| `design` | 设计类 |
| `design-system` | 设计类 |
| `slides` | 设计类 |
| `ui-styling` | 设计类 |

---

## 五、总结

1. **总数**：当前系统共 65 个 skills，来自 cc-switch 独立管理的 skill 仓库
2. **学术类占主导**：Nature 系列（15）+ 通用科研（9）+ 学术出图（5）= **29 个，占 44.6%**
3. **速度安全**：**70.7% 的 skills 对运行速度基本无影响**，它们只是提供提示模板和代码范例
4. **关注焦点**：仅 7 个高影响 skills 需要注意，主要集中在**多源文献搜索**和**浏览器操作**场景
5. **LobeHub 优化建议**：如追求速度，可考虑不加载或按需加载那 7 个高影响 skills，其余 58 个可放心保留

---

*报告生成完毕。*
