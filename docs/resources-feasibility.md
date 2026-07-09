# 资源（Resources）功能可行性分析

> 日期：2026-07-09
> 状态：方案确认完毕，待实施

## 需求理解

在网站上新增"资源"板块，用于公开资源和文件的下载：

1. 支持多种文件格式下载（zip、pdf 等）
2. 每个下载文件有一一对应的 Markdown 说明文件（原始链接 + 简介）
3. **像 projects 一样支持分组/子目录结构**
4. **列表页需要标签筛选侧边栏**
5. **详情页需要侧边栏（同级导航）**

## 技术方案

### 方案选型：Content Collection + `public/` 静态文件

完全沿用现有 blog/projects/notes 的 content collection 模式，列表/详情/侧边栏模式从 blog 和 projects 两边复用。

### 内容模型

在 `src/content.config.ts` 中新增 `resources` 集合：

```typescript
const resources = defineCollection({
  schema: z.object({
    title: z.string(),           // 资源名称
    date: z.string(),            // 发布日期
    summary: z.string(),         // 简介
    tags: z.array(z.string()),   // 标签（如 "电子书", "工具", "模板"）
    files: z.array(z.object({
      filename: z.string(),      // public/resources/files/ 下的实际文件名
      label: z.string(),         // 下载按钮上的显示名
      size: z.string().optional(),     // 可读文件大小，如 "12.5 MB"
      format: z.string().optional(),   // 格式，如 "zip", "pdf"
    })),
    sourceUrl: z.string().url().optional(),  // 原始来源链接
  }),
});
```

### 目录结构

```
src/
├── content/
│   └── resources/              # 资源说明 markdown
│       ├── my-resource.md      # 根级资源（无分组）
│       └── ebooks/             # 分组目录（如 projects 的 diamond-insulation/）
│           ├── index.md        # 分组概览页
│           └── some-ebook.md   # 分组下的子资源
├── pages/
│   └── resources/
│       ├── index.astro         # 资源列表页（带侧边栏筛选）
│       └── [...slug].astro     # 资源详情页（带侧边栏导航）
└── features/
    └── resources/              # 资源功能模块（自包含）
        ├── ResourceSidebar.astro       # 平级导航（仿 ProjectSidebar）
        ├── ResourceTreeSidebar.astro   # 树形导航（仿 ProjectTreeSidebar）
        └── ResourceFilter.astro        # 标签筛选侧边栏（仿 PostFilter + TagFilter）

public/
└── resources/
    └── files/                  # 实际可下载文件
        ├── my-file.zip
        └── another-file.pdf
```

### 路由设计

| URL | 入口 | 说明 |
|-----|------|------|
| `/resources` | `pages/resources/index.astro` | 资源列表页（带筛选侧边栏） |
| `/resources/[...slug]` | `pages/resources/[...slug].astro` | 单个资源/分组概览 |
| `/resources/files/<file>` | `public/resources/files/` | 静态文件直接下载 |

**路由冲突**：`public/resources/files/` 不会与 `[...slug].astro` 冲突 — Astro 优先匹配静态文件。

### 列表页设计（仿 blog/index.astro）

```
ResourceLayout.astro（仿 BlogLayout）
├── 侧边栏（220px，sticky）
│   └── ResourceFilter.astro
│       ├── 搜索框（可选，仿 BlogSearch）
│       └── 标签筛选（仿 TagFilter，vanilla JS client-side 过滤）
└── 内容区
    ├── 根级资源卡片 grid（仿 projects grid + card-hover）
    └── 分组卡片（仿 projects 的 group card）
```

筛选逻辑：复用 `filter-controller.js` 模式，给每个资源卡片加 `data-tags` 属性，点击标签按钮 client-side 过滤。

### 详情页设计（仿 projects/[...slug].astro）

```
Layout（复用现有 Layout.astro）
└── 详情区（仿 ProjectLayout 样式）
    ├── 侧边栏（如为分组内子资源）
    │   ├── ResourceSidebar（平级文章） 或
    │   └── ResourceTreeSidebar（嵌套树形）
    └── 正文区
        ├── 标题 + 日期 + 标签
        ├── Markdown 正文（简介/说明）
        ├── 下载按钮区（每个文件一个按钮，含大小和格式信息）
        ├── 原始来源链接
        └── 返回链接
```

下载按钮实现：直接 `<a href="/resources/files/xxx.zip" download>` 即可触发浏览器下载，无需 JS。文件大小和格式从 frontmatter 读取，纯展示。

### 设计模式复用矩阵

| 模式 | 来源 | 说明 |
|------|------|------|
| 列表页侧边栏布局 | BlogLayout.astro | 220px sidebar + 内容区 grid |
| 标签筛选 | TagFilter.astro + filter-controller.js | 标签按钮 + client-side 过滤 |
| 列表卡片 grid | projects/index.astro | 分组卡片 + 根级卡片 |
| 详情页布局 | ProjectLayout.astro | 标题 + 标签 + 正文 + 底部链接 |
| 平级侧边栏 | ProjectSidebar.astro | 同级文章导航 |
| 树形侧边栏 | ProjectTreeSidebar.astro | 嵌套目录导航 |
| 分组逻辑 | projects/[...slug].astro | 按 id 前缀检测分组 |
| 标签统计 | lib/tagUtils.ts | getTagCounts 泛型函数直接复用 |
| 导航条目 | Navigation.astro | 新增"资源"链接 |

## 改动清单

### 核心改动（6 个文件，中等偏大）

| # | 文件 | 操作 | 说明 |
|---|------|------|------|
| 1 | `src/content.config.ts` | **修改** | 新增 resources 集合定义 |
| 2 | `src/components/Navigation.astro` | **修改** | links 数组加 `{ href: "/resources", label: "资源" }` |
| 3 | `src/pages/resources/index.astro` | **新建** | 资源列表页（分组 + 筛选） |
| 4 | `src/pages/resources/[...slug].astro` | **新建** | 资源详情页 + 分组概览 |
| 5 | `src/features/resources/ResourceSidebar.astro` | **新建** | 平级导航侧边栏 |
| 6 | `src/features/resources/ResourceTreeSidebar.astro` | **新建** | 树形导航侧边栏 |

### 可选改动

| # | 文件 | 操作 | 说明 |
|---|------|------|------|
| 7 | `src/features/resources/ResourceFilter.astro` | **新建** | 如果资源标签筛选需要独立封装 |
| 8 | `public/resources/files/` | **新建目录** | 存放可下载文件 |

> **注意**：7 和 8 不算代码改动。实际代码改动为 6 个文件（新建 4 + 修改 2）。按 CLAUDE.md 标准属于"中偏大"改动，需先确认方案再动手。✅ 已完成。

## 与 CLAUDE.md 约束的合规检查

| 约束 | 状态 |
|------|------|
| 禁止硬编码颜色 — 全部使用 `var(--color-xxx)` | ✅ 复用现有组件，天然合规 |
| 禁止引入新 CSS 框架/UI 库 | ✅ 无新依赖 |
| 禁止客户端 JS 框架 — vanilla JS | ✅ 筛选逻辑复用 `filter-controller.js` 模式，纯 vanilla |
| 组件 6 段式模板 | ✅ 新建组件按此规范 |
| 功能模块放在 `src/features/<类别>/` | ✅ 放在 `src/features/resources/` |
| 内容/代码分离 | ✅ 资源内容在 `src/content/resources/`，功能代码在 `src/features|pages/` |

## 边界情况与风险

1. **GitHub Pages 限制**：单文件 ≤ 100MB，仓库 ≤ 1GB。建议单文件 ≤ 50MB。
2. **构建时间**：`public/` 文件直接拷贝，大文件会拖慢部署。
3. **文件名冲突**：`public/resources/files/` 放所有文件，同名需人工避免。
4. **分组 slug 冲突**：如果资源 slug 叫 `files`，会与 `public/resources/files/` 冲突。需要在 `[...slug].astro` 中检测并 404。
5. **下载计数**：不做。纯静态站点，需要后端。
6. **空分组**：像 projects 一样处理 — 不显示空分组卡片。

## 结论

**可行，完全符合现有架构和 CLAUDE.md 全部约束。**

方案最大限度地复用了现有代码模式（BlogLayout 侧边栏 + ProjectLayout 详情 + ProjectSidebar 导航 + TagFilter 筛选），改动 6 个文件，零新依赖。router 冲突可控，边界情况清晰。