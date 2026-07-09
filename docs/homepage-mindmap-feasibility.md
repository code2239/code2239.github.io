# 首页脑图导航——可行性分析报告

> 日期：2026-07-08 | 项目：星游寰宇 (xingyouhuanyu-site)

## 需求

删除首页以下三个区域：

1. Hero 区——"我专注于 AI Agent 协作..." 介绍文字
2. 最新文章区——6 篇最新文章卡片
3. 话题标签区——标签云

替换为：**一张本网站内容的交互式脑图生成动画**。

---

## 结论

**✅ 完全可行。** 开发周期约 1.5 小时，改动 1 个文件 ([index.astro](src/pages/index.astro))。

---

## 现状分析

### 当前首页结构

```
┌──────────────────────────────────────┐
│  🌐 星游寰宇                          │  ← 保留：标题
│  exploring AI · agents · tools       │  ← 保留：副标题
│  [GitHub] [Email]                    │  ← 保留：社交链接
│ ──────────────────────────────────── │
│  💬 "我专注于 AI Agent 协作..."       │  ← 🗑️ 删除
│ ──────────────────────────────────── │
│  📰 最新文章 (6 篇卡片)               │  ← 🗑️ 删除
│ ──────────────────────────────────── │
│  🏷️ 话题标签云                        │  ← 🗑️ 删除
└──────────────────────────────────────┘
```

### 替换后首页结构

```
┌──────────────────────────────────────┐
│  🌐 星游寰宇                          │  ← 保留
│  exploring AI · agents · tools       │  ← 保留
│  [GitHub] [Email]                    │  ← 保留
│ ──────────────────────────────────── │
│                                      │
│         🧠 交互式脑图                  │
│                                      │
│     ┌─── AI工具报告 (9篇)             │
│     │    ├─ DeepSeek 报告             │
│     │    ├─ LangGraph 报告            │
│  星游├─── Claude (3篇)               │
│  寰宇├─── Agent与Skills (4篇)        │
│     ├─── GitHub (3篇)               │
│     ├─── 项目                        │
│     │    ├─ Program 0               │
│     │    └─ 金刚石绝缘化              │
│     └─── 日记 / 关于                 │
│                                      │
│     [节点逐个弹出动画]                 │
│     [点击节点 → 跳转页面]              │
│                                      │
└──────────────────────────────────────┘
```

---

## 技术方案

### 数据来源

在 Astro 构建时从内容集合自动生成：

```
getCollection("blog")     → 37 篇文章，按 category 分组
getCollection("projects") → 2 个项目
getCollection("notes")    → 1 篇笔记
categories.ts             → 7 个分类定义（含 label、description）
```

构建时生成嵌套 Markdown 大纲（markmap 的输入格式）：

```markdown
# 星游寰宇
## AI 工具报告 (9)
### [DeepSeek 报告](/blog/AI工具报告/DeepSeek-报告)
### [LangGraph 报告](/blog/AI工具报告/LangGraph-报告)
### ...
## Claude (3)
### [Claude Code Skills 生态](/blog/Claude/Claude-Code-Skills-生态全景报告)
### ...
## 项目
### [Program 0](/projects/program-0)
### [金刚石绝缘化](/projects/diamond-insulation)
## [日记](/notes)
## [关于](/about)
```

### 渲染引擎：[markmap](https://github.com/markmap/markmap)

| 属性 | 值 |
|------|-----|
| 许可证 | MIT |
| 框架依赖 | 无（纯 vanilla JS + SVG） |
| 体积 | ~40KB (gzip ~12KB) |
| CDN | jsDelivr |
| 交互 | 缩放、拖拽、节点折叠/展开、点击链接 |
| 动画 | 内置节点过渡动画 |

### 动画方案

分三个层次，可按需选择：

| 层次 | 效果 | 实现方式 |
|------|------|----------|
| **1. 整体入场** | 脑图从中心向外扩散出现 | CSS `@keyframes` scale + opacity |
| **2. 逐层展开** | 一级节点 → 二级节点 → 三级节点依次弹出 | markmap `foldAll()` + 定时 `unfold()` |
| **3. 粒子背景** | 节点间有微弱光点流动 | Canvas 背景层（可选，增加氛围） |

推荐**层次 1 + 2**，既有视觉冲击力，又不至于太复杂：

```
0.0s   根节点弹出
0.3s   一级节点依次展开（stagger 80ms）
0.8s   二级节点批量展开
1.5s   动画完成，进入可交互状态
```

---

## 实现要点

### 文件改动

| 文件 | 改动内容 |
|------|----------|
| `src/pages/index.astro` | 重写：删除 3 个 section，新增脑图容器 + 客户端脚本 |
| 布局 | 保持不变（Layout + Navigation 照旧） |

只改 1 个文件。

### 关键代码结构

```astro
---
// 构建时：从内容集合生成脑图数据
const posts = await getCollection("blog");
const projects = await getCollection("projects");

// 按分类分组博客文章
const categoryMap = new Map();
posts.forEach(p => {
  const cat = p.data.categories?.[0] || "uncategorized";
  if (!categoryMap.has(cat)) categoryMap.set(cat, []);
  categoryMap.get(cat).push(p);
});

// 生成 Markdown 大纲
const mindmapMD = generateMindmapMarkdown(categoryMap, projects);
---

<Layout>
  <!-- 保留：标题 + 社交链接 -->
  <section>
    <h1>星游寰宇</h1>
    <p>exploring AI · agents · tools</p>
    <a href="...">GitHub</a> <a href="...">Email</a>
  </section>

  <!-- 新增：脑图 -->
  <section>
    <svg id="mindmap" style="width:100%;height:600px"></svg>
  </section>
</Layout>

<script>
  import { Markmap, loadCSS, loadJS } from "markmap-lib/view";
  // 1. 解析 Markdown → 脑图树
  // 2. 渲染到 SVG
  // 3. 执行逐层展开动画
</script>
```

### 响应式策略

| 视口 | 脑图布局 |
|------|----------|
| 桌面 (>1024px) | 全宽居中，高度 600px，横向展开 |
| 平板 (768-1024px) | 高度 500px，默认折叠深层节点 |
| 手机 (<768px) | 高度 400px，仅展开 2 层，支持双指缩放 |

---

## 风险与缓解

| 风险 | 缓解 |
|------|------|
| markmap 40KB 增加首页加载 | 按需加载（`client:load`），gzip 后仅 12KB |
| 脑图节点太多（37+ 篇文章） | 首页只展开 2 层，深层节点默认折叠 |
| SEO——删除了文字摘要 | 在 `<meta description>` 和隐藏 `<h2>` 中保留关键文字 |
| 移动端脑图太小 | 支持缩放 + 双击聚焦 + 横屏提示 |
| 动画卡顿 | 使用 `requestAnimationFrame`，限制同时动画的节点数 |
| 用户找不到原来底部的内容 | 保留顶部导航栏（Blog / Projects / Notes / About） |

---

## 备选方案对比

| 方案 | 描述 | 体积 | 动画效果 |
|------|------|------|----------|
| **markmap**（推荐） | Markdown → 脑图，MIT | 40KB | ⭐⭐⭐ 内置过渡 |
| **D3.js force graph** | 力导向图，自由发散 | 80KB | ⭐⭐⭐⭐ 物理动画 |
| **vis-network** | graphify 同款，力导向 | 200KB | ⭐⭐ 较重 |
| **纯 CSS/SVG 手写** | 完全自定义 | <5KB | ⭐⭐⭐⭐⭐ 完全可控 |

如果追求独特视觉风格，D3.js 力导向图是更好的选择（节点从随机位置飞入，逐渐收敛成稳定结构）。但开发成本高不少。

---

## 建议实施步骤

1. **先跑通 markmap**——在首页渲染静态脑图，节点可点击跳转
2. **加入逐层展开动画**——`foldAll()` + 定时 `unfold()`
3. **调优视觉**——颜色、字体、间距匹配设计系统
4. **移动端适配**——响应式高度 + 缩放手势
5. **保留可选的文字入口**——在脑图下方加一行小字链接到 blog/projects

---

## 预期效果

访问首页时：
1. 标题和脑图容器先出现
2. 根节点"星游寰宇"从中心弹出
3. 一级分类节点依次展开（AI 工具报告 → Claude → Agent 与 Skills → ...）
4. 文章节点批量淡入
5. 用户可点击任意节点跳转，或缩放/拖拽探索
6. 页面底部保留导航链接作为辅助入口

整个动画约 1.5 秒，之后进入可交互状态。
