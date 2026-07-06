# 博客层级分类系统 · 实现方案

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为博客增加手动维护的层级分类系统，一篇文章可归属多个分类，侧边栏展示分类树，每个分类拥有独立详情页。

**Architecture:** frontmatter `categories` 字段 + 分类定义数据文件 + Astro 动态路由生成分类详情页 + PostFilter 侧边栏渲染分类树。与标签系统完全独立。

**Tech Stack:** Astro 5, TypeScript, Tailwind CSS

## 全局约束

- 向后兼容：旧文章不加 categories 字段完全不受影响
- 分类与标签独立运作，侧边栏分开显示
- 一篇文章可属于多个分类
- 分类树支持无限层级（路径 slug：`ai-tools/claude-code`）
- 分类详情页路径：`/blog/category/一级/二级`

---

## 文件架构

```
修改:
  src/content.config.ts                       —— 新增 categories 字段到 blog schema
  src/components/PostFilter.astro             —— 新增分类树区域（标签筛选上方）
  src/pages/blog/index.astro                  —— 传入分类数据给 PostFilter

新建:
  src/lib/categories.ts                       —— 分类树定义（纯数据文件，手动维护）
  src/lib/categoryTree.ts                     —— 分类工具函数（拍平、构建树、统计）
  src/pages/blog/category/[...slug].astro     —— 分类详情页
```

### 各文件职责

| 文件 | 职责 |
|------|------|
| `src/lib/categories.ts` | 纯数据：分类树结构定义，手动维护 |
| `src/lib/categoryTree.ts` | 纯函数：展开树为扁平映射、构建带计数的渲染树 |
| `src/pages/blog/category/[...slug].astro` | 分类详情页：面包屑 + 描述 + 子分类卡片 + 文章列表 |
| `src/components/PostFilter.astro` | 侧边栏上部新增"分类浏览"区域 |
| `src/content.config.ts` | 新增 `categories` 可选字段 |

### 数据流

```
categories.ts (树定义)
        ↓
blog/index.astro (遍历文章 → 统计每节点文章数)
        ↓
PostFilter.astro (渲染分类树)
        ↓
用户点击 → /blog/category/ai-tools
        ↓
[...slug].astro (查描述 + 筛选文章 + 渲染页面)
```

---

## 任务拆解

### Task 1: 扩展文章 Schema

**Files:**
- Modify: `src/content.config.ts`

- [ ] **Step 1: 新增 categories 字段**

```ts
// src/content.config.ts
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()),
    summary: z.string(),
    categories: z.array(z.string()).optional(),
  }),
});

export const collections = { blog };
```

- [ ] **Step 2: 验证构建**

```bash
npm run build
```

预期：所有旧文章（无 categories）正常编译通过。

- [ ] **Step 3: Commit**

```bash
git add src/content.config.ts
git commit -m "feat: blog schema 新增 categories 字段"
```

---

### Task 2: 分类定义数据文件

**Files:**
- Create: `src/lib/categories.ts`

- [ ] **Step 1: 创建分类定义文件**

```ts
// src/lib/categories.ts
export interface CategoryDef {
  slug: string;
  label: string;
  description?: string;
  children?: CategoryDef[];
}

export const categoryTree: CategoryDef[] = [
  {
    slug: "ai-tools",
    label: "AI 工具",
    description: "各类 AI 工具的介绍、使用指南与能力边界分析。",
    children: [
      {
        slug: "claude-code",
        label: "Claude Code",
        description: "Anthropic 推出的命令行 AI 编码助手，支持 Skills、Hook、Agent 等高级功能。",
      },
      {
        slug: "dify",
        label: "Dify",
        description: "开源 LLM 应用开发平台，支持可视化编排 AI 工作流。",
      },
    ],
  },
  {
    slug: "research",
    label: "研究调研",
    description: "针对 AI Agent、Skills 生态、开发工具链等方向的技术调研报告。",
  },
  {
    slug: "guides",
    label: "指南教程",
    description: "工具使用教程、环境搭建指南、最佳实践总结。",
  },
];
```

- [ ] **Step 2: 验证编译**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/categories.ts
git commit -m "feat: 添加分类树定义数据文件"
```

---

### Task 3: 分类工具函数

**Files:**
- Create: `src/lib/categoryTree.ts`

- [ ] **Step 1: 创建工具函数**

```ts
// src/lib/categoryTree.ts
import { categoryTree, type CategoryDef } from "./categories";

/** 将嵌套分类树拍平为 slug → 节点映射 */
export function flatCategories(): Map<string, CategoryDef> {
  const map = new Map<string, CategoryDef>();

  function walk(nodes: CategoryDef[], parent: string) {
    for (const node of nodes) {
      const fullSlug = parent ? `${parent}/${node.slug}` : node.slug;
      map.set(fullSlug, { ...node, slug: fullSlug });
      if (node.children?.length) walk(node.children, fullSlug);
    }
  }

  walk(categoryTree, "");
  return map;
}

/** 渲染用节点 */
export interface TreeNode {
  label: string;
  slug: string;
  count: number;
  children: TreeNode[];
}

/**
 * 构建带计数的分类树。
 * count = 本分类文章数 + 所有子分类文章数之和。
 */
export function buildCategoryTree(
  postCategories: Array<{ categories: string[] }>
): TreeNode[] {
  const flat = flatCategories();
  const countMap = new Map<string, number>();

  for (const post of postCategories) {
    for (const c of post.categories) {
      const parts = c.split("/");
      for (let i = 0; i < parts.length; i++) {
        const ancestor = parts.slice(0, i + 1).join("/");
        countMap.set(ancestor, (countMap.get(ancestor) ?? 0) + 1);
      }
    }
  }

  function toTree(nodes: CategoryDef[], parentSlug: string): TreeNode[] {
    return nodes.map((node) => {
      const slug = parentSlug ? `${parentSlug}/${node.slug}` : node.slug;
      const children = node.children?.length ? toTree(node.children, slug) : [];
      const childrenCount = children.reduce((s, c) => s + c.count, 0);
      const ownCount = countMap.get(slug) ?? 0;
      return { label: node.label, slug, count: ownCount + childrenCount, children };
    });
  }

  return toTree(categoryTree, "");
}

/** 展平为带深度的列表，用于侧边栏渲染（Astro 不支持递归组件） */
export interface FlatNode {
  label: string;
  slug: string;
  count: number;
  depth: number;
}

export function flattenTree(nodes: TreeNode[], depth = 0): FlatNode[] {
  return nodes.flatMap((n) => {
    const self: FlatNode = { label: n.label, slug: n.slug, count: n.count, depth };
    return [self, ...flattenTree(n.children, depth + 1)];
  });
}
```

- [ ] **Step 2: 验证**

```bash
npx tsc --noEmit && npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/categoryTree.ts
git commit -m "feat: 添加分类树工具函数"
```

---

### Task 4: 分类详情页路由

**Files:**
- Create: `src/pages/blog/category/[...slug].astro`

- [ ] **Step 1: 创建动态路由**

```astro
---
// src/pages/blog/category/[...slug].astro
import { getCollection } from "astro:content";
import Layout from "../../../components/Layout.astro";
import ArticleCard from "../../../components/ArticleCard.astro";
import { flatCategories } from "../../../lib/categoryTree";

export async function getStaticPaths() {
  const flat = flatCategories();
  return [...flat.keys()].map((slug) => ({ params: { slug } }));
}

const { slug } = Astro.params;
const flat = flatCategories();
const cat = flat.get(slug!);

if (!cat) return Astro.redirect("/blog");

const allPosts = await getCollection("blog");
const candidateSlugs = [slug!];
for (const [s] of flat) {
  if (s.startsWith(slug! + "/")) candidateSlugs.push(s);
}

const posts = allPosts
  .filter((p) =>
    (p.data.categories ?? []).some((c) =>
      candidateSlugs.some((cs) => c.startsWith(cs))
    )
  )
  .sort(
    (a, b) =>
      new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );

const slugParts = slug!.split("/");
const breadcrumbs = slugParts.map((part, i) => {
  const href = "/blog/category/" + slugParts.slice(0, i + 1).join("/");
  const node = flat.get(slugParts.slice(0, i + 1).join("/"));
  return { label: node?.label ?? part, href };
});

const subcategories = cat.children ?? [];
---

<Layout title={`${cat.label} — 分类`}>
  <div class="px-6 xl:px-12 pt-12 pb-16">
    <nav class="mb-4 flex items-center gap-1.5 text-sm text-[var(--color-text-tertiary)]">
      <a href="/blog" class="no-underline hover:text-[var(--color-accent)] transition-colors">博客</a>
      {breadcrumbs.map((b, i) => (
        <>
          <span>/</span>
          {i < breadcrumbs.length - 1 ? (
            <a href={b.href} class="no-underline hover:text-[var(--color-accent)] transition-colors">{b.label}</a>
          ) : (
            <span class="text-[var(--color-text)] font-medium">{b.label}</span>
          )}
        </>
      ))}
    </nav>

    <h1 class="text-3xl font-semibold mb-2">{cat.label}</h1>
    {cat.description && (
      <p class="text-[var(--color-text-secondary)] mb-6 leading-relaxed">{cat.description}</p>
    )}

    {subcategories.length > 0 && (
      <section class="mb-10">
        <h2 class="text-lg font-semibold mb-4">子分类</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {subcategories.map((sub) => (
            <a href={`/blog/category/${slug}/${sub.slug}`} class="card-hover p-4 no-underline group">
              <h3 class="text-sm font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors mb-1">
                {sub.label}
              </h3>
              {sub.description && (
                <p class="text-xs text-[var(--color-text-tertiary)] leading-relaxed line-clamp-2 m-0">
                  {sub.description}
                </p>
              )}
            </a>
          ))}
        </div>
      </section>
    )}

    <section>
      <h2 class="text-lg font-semibold mb-4">文章 ({posts.length} 篇)</h2>
      {posts.length === 0 ? (
        <p class="text-[var(--color-text-tertiary)] py-8 text-center">该分类下暂无文章。</p>
      ) : (
        <div class="flex flex-col gap-4">
          {posts.map((post) => (
            <div class="post-item" data-tags={post.data.tags.join(",")}>
              <ArticleCard
                title={post.data.title}
                date={post.data.date}
                summary={post.data.summary}
                tags={post.data.tags}
                href={`/blog/${post.id.replace(/\.md$/, "")}`}
              />
            </div>
          ))}
        </div>
      )}
    </section>
  </div>
</Layout>
```

- [ ] **Step 2: 构建验证**

```bash
npm run build
```

预期：dist 下生成所有分类页面。

- [ ] **Step 3: Commit**

```bash
git add src/pages/blog/category/
git commit -m "feat: 添加分类详情页动态路由"
```

---

### Task 5: 侧边栏分类树

**Files:**
- Modify: `src/components/PostFilter.astro`
- Modify: `src/pages/blog/index.astro`

- [ ] **Step 1: PostFilter 新增 Props + 导入**

```ts
// PostFilter.astro frontmatter 顶部新增:
import type { FlatNode } from "../lib/categoryTree";

interface Props {
  allTags: TagEntry[];
  totalPosts: number;
  categoryNodes: FlatNode[];
}
```

- [ ] **Step 2: 搜索框和标签之间插入分类树**

```astro
<!-- Category tree -->
{categoryNodes.length > 0 && (
  <div>
    <p class="text-xs font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider mb-3">分类浏览</p>
    <div class="flex flex-col gap-0.5" id="category-tree">
      {categoryNodes.map((node) => (
        <a
          href={`/blog/category/${node.slug}`}
          class="sidebar-cat"
          style={`padding-left: ${0.625 + node.depth * 0.75}rem`}
        >
          <span class="truncate">{node.label}</span>
          <span class="sidebar-tag-count">{node.count}</span>
        </a>
      ))}
    </div>
  </div>
)}
```

- [ ] **Step 3: 添加分类样式**

```css
.sidebar-cat {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0.375rem 0.625rem;
  font-size: 0.8125rem;
  font-family: var(--font-sans);
  color: var(--color-text-secondary);
  text-decoration: none;
  border-radius: 6px;
  transition: background 150ms ease, color 150ms ease;
}
.sidebar-cat:hover { background: var(--color-bg-secondary); color: var(--color-text); }
.sidebar-cat.active { background: var(--color-accent-soft); color: var(--color-accent); font-weight: 500; }
```

- [ ] **Step 4: blog/index.astro 传入分类数据**

```astro
import { buildCategoryTree, flattenTree } from "../lib/categoryTree";

const categoryNodes = flattenTree(
  buildCategoryTree(posts.map((p) => ({ categories: p.data.categories ?? [] })))
);

<PostFilter allTags={allTags} totalPosts={posts.length} categoryNodes={categoryNodes} />
```

- [ ] **Step 5: 构建验证**

```bash
npm run build && npm run dev
```

访问 `/blog` 确认侧边栏同时显示分类浏览和标签筛选。

- [ ] **Step 6: Commit**

```bash
git add src/components/PostFilter.astro src/pages/blog/index.astro src/lib/categoryTree.ts
git commit -m "feat: 侧边栏新增分类树导航"
```

---

### Task 6: 端到端验证与推送

- [ ] **Step 1: 完整构建**

```bash
npm run build
```

- [ ] **Step 2: 验收清单**

- [ ] `/blog` 侧边栏显示分类树（AI工具、研究调研、指南教程）
- [ ] `/blog/category/ai-tools` 面包屑 + 描述 + 子分类卡片 + 文章列表
- [ ] 标签筛选独立正常工作
- [ ] 无 categories 的旧文章不出现在分类下

- [ ] **Step 3: 推送**

```bash
git add . && git commit -m "chore: 分类系统端到端验证通过" && git push
```

---

## 使用示例

文章 frontmatter 加一行即可：

```yaml
---
title: "Claude Code Skills 调研"
categories: ["ai-tools/claude-code"]
tags: ["Claude Code", "Skills"]
---
```

## 扩展分类树

编辑 `src/lib/categories.ts` 添加节点：

```ts
children: [
  { slug: "cursor", label: "Cursor", description: "AI 代码编辑器" },
]
```

## 预估

| Task | 内容 | 时间 |
|------|------|------|
| 1 | Schema 扩展 | 5 min |
| 2 | 分类定义文件 | 5 min |
| 3 | 工具函数 | 15 min |
| 4 | 分类详情页 | 20 min |
| 5 | 侧边栏导航 | 25 min |
| 6 | 验证推送 | 10 min |
| **合计** | | **~80 min** |
