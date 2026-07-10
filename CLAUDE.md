# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

星游寰宇 (xingyouhuanyu-site) 是一个基于 **Astro 5** 构建的中文技术博客，部署在 **GitHub Pages** (`https://code2239.github.io`)。文章通过 Astro 内容集合系统管理，涵盖 AI Agent 协作、Claude 生态、开发工具链等主题。

## 常用命令

```bash
npm run dev          # 启动开发服务器 (localhost:4321)
npm run build        # 构建生产版本到 dist/（部署前必须通过）
npm run preview      # 本地预览生产构建
npx tsc --noEmit     # TypeScript 检查（.astro 内部 TS 需通过构建验证）
```

- 没有测试框架，验证方式为 `npm run build` 是否通过。

## 架构

### 分层结构（关注点分离）

```
src/
├── pages/          # 路由层 — 文件即路由，控制数据获取与页面组装
├── layouts/        # 页面级布局 — 定义页面骨架
├── components/     # 通用 UI 组件 — 无业务逻辑，纯渲染
├── features/       # 功能模块 — 可独立插拔的功能单元
├── lib/            # 纯逻辑 — 不含 Astro 语法，跨框架可复用
├── content/        # 内容源 — Markdown 文章，与代码完全解耦
└── styles/         # 全局样式 — 设计 Token + Tailwind + 排版
```

### 组件层次

```
Layout.astro (src/components/)   ← HTML 根，导入 global.css
├── Navigation.astro (header)    ← 粘性顶栏，响应式汉堡菜单
├── <slot />                     ← 页面内容
└── Navigation.astro (footer)    ← 页脚

BlogLayout.astro                 ← 博客列表骨架
├── PostFilter.astro             ← 侧边栏：搜索 + 分类树 + 标签筛选
└── <slot />                     ← 文章列表

BlogPost.astro                   ← 文章详情骨架
├── ReadingProgress.astro        ← 顶部进度条（src/features/blog/）
├── TableOfContents.astro        ← 桌面端侧边 TOC
├── BackToTop.astro              ← 回到顶部按钮（src/features/blog/）
├── CopyButton.astro             ← 代码块复制按钮（src/features/blog/）
├── LinkPreview.astro            ← 链接预览卡片（src/features/blog/）
└── <slot />                     ← Markdown 正文
```

### 路由映射

| URL | 入口 | 说明 |
|-----|------|------|
| `/` | `pages/index.astro` | 首页 |
| `/about` | `pages/about.astro` | 关于页 |
| `/blog` | `pages/blog/index.astro` | 博客列表，带侧边栏筛选 |
| `/blog/xxx` | `pages/blog/[...slug].astro` | 单篇文章 |
| `/blog/category/xxx` | `pages/blog/category/[...slug].astro` | 分类详情 |
| `/notes` | `pages/notes/index.astro` | 日记列表 |
| `/notes/xxx` | `pages/notes/[...slug].astro` | 单篇日记 |
| `/projects` | `pages/projects/index.astro` | 项目列表 |
| `/projects/xxx` | `pages/projects/[...slug].astro` | 项目子页面 |
| `/resources` | `pages/resources/index.astro` | 资源列表 |
| `/resources/xxx` | `pages/resources/[...slug].astro` | 资源子页面 |
| `/rss.xml` | `pages/rss.xml.ts` | RSS Feed |
| `/posts.json` | `pages/posts.json.ts` | 文章 JSON API |
| `/search-index.json` | `pages/search-index.json.ts` | 搜索索引 |
| `/404` | `pages/404.astro` | 404 页面 |

### 数据流（单一真相来源）

```
src/lib/config.ts          →  站点元信息（名称、社交链接）
src/lib/categories.ts      →  分类树定义（纯数据，手动维护）
src/lib/categoryTree.ts    →  分类算法（拍平、构建带计数树）
src/lib/tagUtils.ts        →  标签统计（泛型，跨集合复用）

文章 Markdown (content/blog/)
  →  Astro content collection (content.config.ts 定义 Zod schema)
  →  getCollection("blog") 在页面中获取
  →  排序/筛选/传参给组件渲染
```

## 内容模型

Schema 定义在 `src/content.config.ts`。四个内容集合各有独立的 Zod schema，不同内容类型有不同的字段约束。

```yaml
# blog
title: string         - 文章标题
date: string          - 发布日期 (YYYY-MM-DD)
tags: string[]        - 扁平标签列表
summary: string       - 摘要，用于卡片和 meta description
categories: string[]  - 可选，必须引用 categories.ts 中已定义的 slug

# notes
title / date / summary / tags + source(可选) + category(reading|learning|research，可选)

# projects
title / date / summary / tags + github(url, 可选) + demo(url, 可选) + image(可选) + featured(boolean, 默认 false)

# resources
title / date / summary / tags + files[{filename, label, size?, format?}] + sourceUrl(url, 可选)
```

新增文章 = 在 `src/content/<集合>/` 下创建 `.md` 文件，不改任何组件。

---

## 功能模块（src/features/）

| 目录 | 内容 | 说明 |
|------|------|------|
| `features/blog/` | ReadingProgress, BackToTop, CopyButton, LinkPreview, BlogSearch, CategoryNav, TagFilter, filter-controller.js | 博客文章页交互组件 + 列表页筛选 |
| `features/search/` | SearchModal.astro, search-init.ts | 全局搜索（Ctrl+K） |
| `features/notes/` | NotesFilter.astro | 日记列表筛选 |
| `features/projects/` | ProjectSidebar.astro, ProjectTreeSidebar.astro | 项目页侧边栏 |
| `features/resources/` | ResourceFilter.astro, ResourceSidebar.astro, ResourceTreeSidebar.astro | 资源页侧边栏与筛选 |

---

## 设计系统（零容忍）

### 必须遵守

- **禁止硬编码颜色** — 全部使用 `var(--color-xxx)` CSS 变量
- **禁止引入新 CSS 框架或 UI 库** — 只允许 Tailwind 4 + 自定义 CSS 变量 + `@tailwindcss/typography`
- **禁止引入客户端 JS 框架** — 所有交互用内联 `<script>` 的 vanilla JS，不引入 React/Vue/Svelte

### 设计 Token（`tokens.css` 为唯一来源）

- **颜色**：暖白基调 `#fcfcf9` + 灰阶 text-secondary/tertiary + 蓝调 accent `#2d6aed`
- **字体**：`var(--font-sans)` = Inter + PingFang SC + Microsoft YaHei；`var(--font-mono)` = JetBrains Mono
- **阴影**：三级层次 `--shadow-sm/md/lg`
- **Shiki 代码高亮**：`--astro-code-*` 变量，主题为 `css-variables`

### 复用模式

| 类名 | 用途 |
|------|------|
| `.max-w-content` | 内容区最大宽度 48rem，水平居中，带 padding |
| `.card-hover` | 卡片容器：边框、圆角、上浮 + 发光边框悬停效果 |
| `.fade-in` | 列表项交错淡入动画（最多 10 个子元素） |
| `.prose` | Tailwind Typography 排版，用于文章正文 |

### 响应式策略

- 移动端优先，断点 `sm:`(640px) `md:`(768px) `lg:`(1024px)
- 导航栏：移动端汉堡菜单，sm 以上桌面链接
- 博客列表：md 以上 grid 侧边栏(220px) + 内容
- 文章详情：lg 以上 grid TOC(14rem) + 正文

---

## 组件开发约定

每个 `.astro` 文件按 6 段式模板组织：

```astro
---
// 1. import 语句
// 2. Props 接口定义
// 3. 数据逻辑
---
<!-- 4. 模板渲染 -->
<!-- 5. <style> 内联样式 -->
<!-- 6. <script> 客户端脚本（vanilla JS） -->
```

- 新功能模块放在 `src/features/<类别>/`，保持自包含
- 新分类编辑 `src/lib/categories.ts` 的 `categoryTree` 数组

---

## 工作流程

### 任务启动

1. **图谱优先**：涉及多文件的代码审查、架构重构、跨模块功能、跨文件 bug 排查时，先读取 `graphify-out/GRAPH_REPORT.md` 获取 God Nodes 排名、社区结构和循环依赖信息，再深入具体文件。单文件改动可跳过。
2. **先分析后编码**：中大型改动先做可行性分析，明确范围、技术选型和风险。大改动输出到 `docs/`。

### 改动规模控制

| 规模 | 文件数 | 流程 |
|------|--------|------|
| 小 | 1-2 | 直接改 |
| 中 | 3-5 | 先确认方案再动手 |
| 大 | 5+ 或架构变更 | 先写可行性分析到 `docs/`，确认后再实施 |

### 外部依赖引入标准

引入任何新 npm 包前，需全部满足：
- [ ] 零框架依赖（纯 vanilla JS 库）
- [ ] MIT 或 Apache 2.0 协议
- [ ] 体积合理（gzip < 50KB）
- [ ] 能通过 CSS 变量适配设计系统

### 内容与代码分离

新增/修改文章 → 只改 `src/content/` 下的 `.md` 文件。新增/修改功能 → 只改 `src/features|components|lib/`。两类改动分开提交。

---

## 质量门禁

### 构建必过

`npm run build` 通过是提交和部署的前提。失败时优先排查 Astro SSR 兼容问题（`window`/`document` 在服务端不可用）。

### 提交规范

```
<type>: <description>

type: feat / fix / docs / style / refactor
一次提交只做一个逻辑改动
commit message 用英文
```

---

## CI/CD

GitHub Actions 工作流 (`.github/workflows/`)：

| 文件 | 触发 | 说明 |
|------|------|------|
| `deploy.yml` | push 到 `main` | Node 22，`npm ci` → `npm run build` → 部署 `dist/` 到 GitHub Pages |
| `deploy-dev.yml` | 手动触发 | 开发分支部署 |
| `ci.yml` | PR / push | 持续集成检查 |