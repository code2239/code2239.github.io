# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

星游寰宇 (xingyouhuanyu-site) 是一个基于 **Astro 5** 构建的中文技术博客，部署在 **GitHub Pages** (`https://code2239.github.io`)。16 篇 Markdown 文章通过 Astro 内容集合系统管理，涵盖 AI Agent 协作、Claude 生态、开发工具链等主题。

## 常用命令

```bash
npm run dev          # 启动开发服务器 (localhost:4321)
npm run build        # 构建生产版本到 dist/
npm run preview      # 本地预览生产构建
```

- **没有测试框架**，验证方式为 `npm run build` 是否通过。
- **TypeScript 检查**：`npx tsc --noEmit`，但 `.astro` 文件内部 TS 需通过构建来验证。

## 架构

### 分层结构

```
src/
├── pages/          # 路由层 — 文件即路由，控制数据获取与页面组装
├── layouts/        # 页面级布局 — 定义页面骨架（侧边栏 + 内容 网格）
├── components/     # 通用 UI 组件 — 无业务逻辑，纯渲染
├── features/blog/  # 博客功能模块 — 可独立插拔的功能单元
├── lib/            # 纯逻辑 — 配置、分类树算法、不含 Astro 语法
├── content/blog/   # 内容源 — Markdown 文章，通过 Astro content collection 管理
└── styles/         # 全局样式 — 设计 Token + Tailwind + 排版
```

### 组件层次（嵌套关系）

```
Layout.astro                      ← HTML 根，导入 global.css
├── Navigation.astro (header)     ← 粘性顶栏，响应式汉堡菜单
├── <slot />                      ← 页面内容
└── Navigation.astro (footer)     ← 页脚

BlogLayout.astro                  ← 博客列表骨架
├── PostFilter.astro              ← 侧边栏：搜索 + 分类树 + 标签筛选
│   ├── BlogSearch.astro
│   ├── CategoryNav.astro
│   └── TagFilter.astro
└── <slot />                      ← 文章列表

BlogPost.astro                    ← 文章详情骨架
├── ReadingProgress.astro         ← 顶部进度条
├── TableOfContents.astro         ← 桌面端侧边 TOC
├── <slot /> (Markdown 正文)
└── 上一篇/下一篇 导航
```

### 路由映射

| URL | 入口 | 说明 |
|-----|------|------|
| `/` | `pages/index.astro` | 首页：Hero + 最新 6 篇 + 标签云 |
| `/about` | `pages/about.astro` | 关于页 |
| `/blog` | `pages/blog/index.astro` | 博客列表，带侧边栏筛选 |
| `/blog/xxx` | `pages/blog/[...slug].astro` | 单篇文章，slug = 文件名去 .md |
| `/blog/category/xxx` | `pages/blog/category/[...slug].astro` | 分类详情页 |
| `/rss.xml` | `pages/rss.xml.ts` | RSS Feed |
| `/posts.json` | `pages/posts.json.ts` | 文章 JSON API |
| `/404` | `pages/404.astro` | 404 页面 |

### 数据流

```
src/lib/config.ts          →  站点元信息（名称、社交链接）
src/lib/categories.ts      →  分类树定义（纯数据，手动维护）
src/lib/categoryTree.ts    →  分类算法（展平、构建带计数树、展平为 FlatNode[]）

文章 Markdown (content/blog/)
  →  Astro content collection (content.config.ts 定义 schema)
  →  getCollection("blog") 在页面中获取
  →  排序/筛选/传参给组件渲染
```

## 内容模型

每篇文章的 frontmatter schema 定义在 `src/content.config.ts`：

```yaml
title: string         # 文章标题
date: string          # 发布日期 (YYYY-MM-DD 或 YYYY-M-D)
tags: string[]        # 扁平标签列表
summary: string       # 摘要，用于卡片和 meta description
categories: string[]  # 可选，路径式分类如 ["program-0/tech-report"]
```

分类系统采用**路径 slug** 表示层级关系（如 `program-0/tech-report`），一篇文章可归属多个分类。分类与标签是两套独立系统，侧边栏分开显示。

## 设计系统

### 不允许做的事

- **禁止硬编码颜色值** — 所有颜色必须使用 `var(--color-xxx)` CSS 变量。如需新颜色，在 `global.css` 的 `:root` 中定义再使用。
- **禁止引入新的 CSS 框架或 UI 库** — 现有方案是 Tailwind 4 + 自定义 CSS 变量 + `@tailwindcss/typography`，不应引入 shadcn/ui、Bootstrap 等。
- **禁止引入客户端 JS 框架** — 所有交互用内联 `<script>` 的 vanilla JS 实现，不引入 React/Vue/Svelte 等。

### 设计 Token（`global.css`）

- **颜色**：暖白基调 `#fcfcf9` + 灰阶 text-secondary/tertiary + 蓝调 accent `#2d6aed`
- **字体**：`var(--font-sans)` = Inter + 系统字体回退（含中文字体 PingFang SC, Microsoft YaHei），`var(--font-mono)` = JetBrains Mono
- **阴影**：三级层次 `--shadow-sm/md/lg`
- **Shiki 代码高亮**：`--astro-code-*` 变量控制，主题为 `css-variables`

### 复用模式

| 类名 | 用途 |
|------|------|
| `.max-w-content` | 内容区最大宽度 48rem，水平居中，带 padding |
| `.card-hover` | 卡片容器：边框、圆角、上浮 + 发光边框悬停效果 |
| `.fade-in` | 列表项交错淡入动画（最多支持 10 个子元素） |
| `.prose` | Tailwind Typography 排版，用于文章正文 |

### 响应式策略

- **移动端优先**，断点 `sm:`(640px) `md:`(768px) `lg:`(1024px)
- 导航栏：移动端汉堡菜单（`menu-btn` + `mobile-menu`），sm 以上显示桌面链接
- 博客列表：md 以上 grid 侧边栏(220px) + 内容，移动端侧边栏在上
- 文章详情：lg 以上 grid TOC(14rem) + 正文，移动端隐藏 TOC

## 组件开发约定

### Astro 组件结构

```astro
---
// 1. import 语句
// 2. Props 接口定义
// 3. 数据逻辑
---
<!-- 4. 模板渲染 -->
<!-- 5. <style> 内联样式（组件级 CSS） -->
<!-- 6. <script> 客户端脚本（vanilla JS） -->
```

### 新增文章

在 `src/content/blog/` 下创建 `.md` 文件，文件名将成为 URL slug。frontmatter 必须包含 `title`、`date`、`tags`、`summary`，可选 `categories`。分类必须引用 `src/lib/categories.ts` 中已定义的 slug。

### 新增功能模块

新功能放在 `src/features/<类别>/` 目录下，保持独立。如需在侧边栏添加功能，修改 `src/components/PostFilter.astro` 进行组装（该文件同时管理侧边栏的 JS 交互逻辑）。

### 新增分类

编辑 `src/lib/categories.ts` 的 `categoryTree` 数组，添加带 `slug`、`label`、`description` 的节点。子分类通过 `children` 数组嵌套定义。

## CI/CD

GitHub Actions 工作流 (`.github/workflows/deploy.yml`)：
- 触发：`push` 到 `main` 分支
- 使用 Node 22，`npm ci` → `npm run build` → 部署 `dist/` 到 GitHub Pages
- 部署前必须先通过 `npm run build` 验证