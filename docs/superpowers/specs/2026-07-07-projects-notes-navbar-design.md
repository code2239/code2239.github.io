# 导航栏新增「项目」与「笔记」栏目 — 设计文档

**日期**: 2026-07-07
**状态**: 已确认

## 概述

在现有导航栏中添加「项目」和「笔记」两个栏目，各自以独立 Astro Content Collection 管理内容，完全对标现有博客架构。

- **博客**: 正式技术文章（现有，不变）
- **项目**: 项目作品集展示（新增）
- **笔记**: 读书/学习/研究笔记整理（新增）

## 内容模型

### Projects Collection

Schema（`content/projects/*.md` frontmatter）:

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | string | yes | 项目名称 |
| `date` | string | yes | 完成日期 (YYYY-MM-DD) |
| `summary` | string | yes | 简短描述 |
| `tags` | string[] | yes | 技术栈标签 |
| `github` | string | no | GitHub 仓库 URL |
| `demo` | string | no | 在线演示 URL |
| `image` | string | no | 封面图路径 (public/images/ 下) |
| `featured` | boolean | no | 是否在首页展示（默认 false） |

### Notes Collection

Schema（`content/notes/*.md` frontmatter）:

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | string | yes | 笔记标题 |
| `date` | string | yes | 创建日期 |
| `summary` | string | yes | 摘要 |
| `tags` | string[] | yes | 标签 |
| `source` | string | no | 来源（书名/课程名/文章链接） |
| `category` | enum | no | `"reading"` / `"learning"` / `"research"` |

## 路由

| URL | 入口文件 | 说明 |
|-----|---------|------|
| `/projects` | `pages/projects/index.astro` | 项目列表，卡片网格 |
| `/projects/[slug]` | `pages/projects/[...slug].astro` | 项目详情 |
| `/notes` | `pages/notes/index.astro` | 笔记列表，侧边栏筛选 |
| `/notes/[slug]` | `pages/notes/[...slug].astro` | 笔记详情 |

## 导航栏变更

`Navigation.astro` 的 `links` 数组扩展为：

```
[博客, 项目, 笔记, 关于]
```

header 和 footer 同步更新，移动端汉堡菜单自动包含新增链接。

## 组件与布局

### ProjectCard.astro（新建）
- 封面图（或无图占位）+ 项目名 + 摘要 + 技术栈标签 + GitHub/Demo 链接
- 复用 `.card-hover` 效果
- 点击整张卡片进入详情页

### ProjectLayout.astro（新建）
- 项目名称 + 日期 + 标签
- 封面大图
- Markdown 正文 (prose)
- GitHub / Live Demo 链接按钮

### 笔记列表页（侧边栏筛选）
- 复用 `BlogLayout.astro` 的侧边栏结构
- 新建 `NotesFilter.astro`：笔记类型筛选（读书/学习/研究）+ 标签筛选
- 笔记卡片复用 `ArticleCard.astro`

### 笔记详情页
- 直接复用 `BlogPost.astro` 布局（进度条 + TOC + prose）
- 不显示「上一篇/下一篇」导航
- 顶部增加来源信息行

## 文件变更清单

### 新建
```
src/content/projects/              # 项目 markdown（示例至少 1 篇）
src/content/notes/                 # 笔记 markdown（示例至少 1 篇）
src/pages/projects/index.astro     # 项目列表
src/pages/projects/[...slug].astro # 项目详情
src/pages/notes/index.astro        # 笔记列表
src/pages/notes/[...slug].astro    # 笔记详情
src/components/ProjectCard.astro   # 项目卡片
src/layouts/ProjectLayout.astro    # 项目详情布局
src/features/notes/NotesFilter.astro # 笔记侧边栏筛选
```

### 修改
```
src/content.config.ts              # 新增 projects + notes collection
src/components/Navigation.astro    # 扩展 links 数组
```

## 设计约束

- 所有颜色使用 `var(--color-xxx)` CSS 变量
- 不引入新 CSS 框架或 UI 库
- 不引入客户端 JS 框架（vanilla JS 仅用于汉堡菜单等已有交互）
- 遵循现有 Astro 组件结构约定（import → Props → 数据逻辑 → 模板 → style → script）
- 移动端优先，断点 `sm:` `md:` `lg:`

## 后续扩展（不在本次范围）

- 首页集成：展示精选项目和最近笔记
- RSS/JSON API 支持项目与笔记
- 笔记支持 TOC（和博客一样）
