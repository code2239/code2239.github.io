# 全局搜索可行性分析

> 日期：2026-07-09
> 状态：待确认

## 需求理解

在网站导航栏添加全局搜索功能，用户可以跨所有内容类型（博客、项目、日记、资源）搜索，快速定位到目标页面。

## 现状分析

### 现有搜索/筛选模式（均为局部、单集合）

| 位置 | 实现 | 范围 | 方式 |
|------|------|------|------|
| 博客侧边栏 | BlogSearch.astro + filter-controller.js | blog 集合 | 文本搜索 + 标签筛选，client-side |
| 日记侧边栏 | NotesFilter.astro | notes 集合 | 分类 + 标签 + 日历筛选 |
| 资源侧边栏 | ResourceFilter.astro | resources 集合 | 标签筛选 |

共性：都是页面内的局部筛选，通过 `data-tags` / `data-category` 属性在已有 DOM 上做 `display:none` 隐藏/显示，不适合跨页面全局搜索。

### 现有可复用资产

- `posts.json.ts` — 已有将 content collection 序列化为 JSON 的模式
- `BlogSearch.astro` — 搜索输入框样式 + 交互（搜索图标、清除按钮）可直接复用
- `filter-controller.js` — 文本搜索的 `updateVisibility` 逻辑可参考

## 技术方案

### 核心决策：客户端搜索，构建时预生成索引

纯静态站点无法做服务端搜索。方案：

```
构建时生成 search-index.json (所有集合的标题/摘要/标签/URL)
  → 用户点击导航栏搜索图标
  → 弹出搜索模态框，fetch search-index.json
  → 用户输入关键词，client-side 匹配 + 排序
  → 点击结果跳转到对应页面
```

### 搜索模态框 UX（方案 A）

这是最常见的全局搜索模式（GitHub、Algolia DocSearch、VitePress 等均用此方案）：

```
导航栏右侧： [博客] [项目] [日记] [资源] [关于]  [🔍]   ← 搜索图标按钮

点击后：
┌─────────────────────────────────────────┐
│  🔍  [搜索文章、项目、日记...        ] ✕ │  ← 输入框 + 关闭
│─────────────────────────────────────────│
│  结果 (5)                                │
│  ┌─────────────────────────────────────┐ │
│  │ 📄 博  Astro 5 速查表               │ │  ← 类型图标 + 标题
│  │        Astro 5 常用 API ...          │ │  ← 摘要片段
│  │        tags: Astro, 前端            │ │
│  ├─────────────────────────────────────┤ │
│  │ 📦 资  Astro 5 官方文档速查表       │ │
│  │        2 个文件 · pdf, zip          │ │
│  └─────────────────────────────────────┘ │
│                                         │
│  快捷键：Ctrl+K  导航：↑↓  确认：Enter  │
└─────────────────────────────────────────┘
```

### 搜索索引结构

```typescript
// /search-index.json
interface SearchEntry {
  title: string;       // 标题
  summary: string;     // 摘要
  href: string;        // 目标链接
  type: "blog" | "projects" | "notes" | "resources";  // 内容类型
  tags: string[];      // 标签
  date: string;        // 日期（用于排序）
}
```

### 搜索算法

纯 client-side vanilla JS，无需任何库：

1. **获取**：fetch `/search-index.json`（首次触发时加载，后续缓存）
2. **匹配**：对每条条目计算匹配得分
   - 标题精确匹配 → 最高权重 (10)
   - 标题包含关键词 → 高权重 (8)
   - 摘要包含关键词 → 中权重 (4)
   - 标签匹配 → 低权重 (2)
   - 多个关键词命中 → 累加得分
3. **排序**：按得分降序，同分按日期降序
4. **渲染**：去重（最多 20 条），高亮匹配文本
5. **防抖**：输入 200ms 后触发搜索

### 无 npm 依赖

`search-index.json.ts` 使用 Astro 内置的 `getCollection`，搜索匹配使用原生 JS 字符串操作（`includes`、`indexOf`），不需要任何 npm 包。**零新依赖。**

### 路由设计

| URL | 入口 | 说明 |
|-----|------|------|
| `/search-index.json` | `pages/search-index.json.ts` | 搜索索引 JSON（构建时生成） |

搜索模态框不需要独立路由，作为 Navigation 的子组件在所有页面可用。

### 目录结构

```
src/
├── pages/
│   └── search-index.json.ts           # 新增 — 构建时生成搜索索引
├── features/
│   └── search/
│       └── SearchModal.astro          # 新增 — 搜索模态框
└── components/
    └── Navigation.astro               # 修改 — 添加搜索图标按钮
```

### 交互细节

| 触发方式 | 行为 |
|----------|------|
| 点击 🔍 图标 | 打开搜索模态框，自动聚焦输入框 |
| `Ctrl+K` / `Cmd+K` | 打开搜索模态框（全局快捷键） |
| `Esc` | 关闭模态框 |
| `↑` `↓` | 在结果列表上下移动高亮 |
| `Enter` | 跳转到高亮的结果 |
| 点击模态框背景 | 关闭模态框（除点击内容区外） |
| 输入框清空 | 隐藏结果列表 |
| 无匹配结果 | 显示"未找到"提示 |

### 响应式

- 桌面端 (≥640px)：居中模态框，max-width 640px，max-height 80vh
- 移动端 (<640px)：全屏覆盖，顶部搜索栏 + 结果区

## 改动清单

| # | 文件 | 操作 | 说明 |
|---|------|------|------|
| 1 | `src/pages/search-index.json.ts` | 新建 | 构建时收集所有集合的标题/摘要/标签/URL |
| 2 | `src/features/search/SearchModal.astro` | 新建 | 搜索模态框：输入框 + 结果列表 + 键盘导航 |
| 3 | `src/components/Navigation.astro` | 修改 | header 部分加搜索图标按钮 + import SearchModal |

**共 3 个文件（2 新建 + 1 修改）**，按 CLAUDE.md 标准属于"小"改动。

## 与 CLAUDE.md 约束的合规检查

| 约束 | 状态 | 说明 |
|------|------|------|
| 禁止硬编码颜色 | ✅ | 全部使用 CSS 变量 |
| 禁止新 CSS/JS 框架 | ✅ | 纯 vanilla JS |
| 禁止引入新 npm 包 | ✅ | 零新依赖，只用 Astro 内置 API |
| 组件 6 段式模板 | ✅ | SearchModal 按此规范 |
| 功能放在 features/ | ✅ | `src/features/search/` |
| 构建必过 | ✅ | 纯静态，不涉及 SSR |

## 边界情况

| 场景 | 处理 |
|------|------|
| 搜索索引为空 | fetch 失败时静默降级，显示"搜索不可用" |
| 索引 JSON 体积 | 4 个集合总计 ~60 条目，每条 ~200 字节，总计 ~12KB，可接受 |
| 中文输入法 | 使用 `input` 事件而非 `keydown`，中文输入法 composing 不过滤 |
| 重复标题 | 按类型和日期区分，不合并 |
| 快速连续输入 | 200ms 防抖 + AbortController 取消未完成的 fetch |
| 构建时内容更新 | 索引在构建时生成，静态。push 后自动更新。 |

## 潜在扩展（本次不做）

- 全文搜索（需要更大的索引或外部搜索服务）
- 搜索高亮片段（当前只用摘要）
- 搜索结果分面筛选（按类型过滤）

## 结论

**可行，风险低，完全符合现有架构和 CLAUDE.md 全部约束。**

方案用构建时生成的 JSON 索引 + client-side 搜索，零新依赖，只改动 3 个文件。搜索模态框 UX 是业界标准模式（Ctrl+K），交互完善（键盘导航、防抖、中文输入法兼容）。

### 待确认

1. 搜索索引是否包含所有 4 个内容集合（blog / projects / notes / resources）？还是只包含部分？
2. 是否需要支持 Ctrl+K 快捷键打开搜索？