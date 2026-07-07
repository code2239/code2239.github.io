# 导航栏新增「项目」与「笔记」栏目 — 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在网站导航栏中添加「项目」和「笔记」两个栏目，各自以 Astro Content Collection 管理，对标 blog 架构。

**Architecture:** 新增两个 Astro content collection（projects、notes），对应 4 个路由页面（列表 + 详情），新建 ProjectCard、ProjectLayout、NotesFilter 三个组件，修改 content.config.ts 和 Navigation.astro 两个文件。

**Tech Stack:** Astro 5, Tailwind CSS 4, TypeScript, Markdown (content collections)

## Global Constraints

- 所有颜色使用 `var(--color-xxx)` CSS 变量，禁止硬编码颜色值
- 不引入新 CSS 框架或 UI 库
- 不引入客户端 JS 框架，交互仅用 vanilla JS 内联 `<script>`
- 遵循现有 Astro 组件结构约定（import → Props → 数据逻辑 → 模板 → style → script）
- 移动端优先，断点 `sm:`(640px) `md:`(768px) `lg:`(1024px)
- 验证方式为 `npm run build` 是否通过

## File Structure

```
新建:
  src/content/projects/xingyouhuanyu-site.md    # 示例项目
  src/content/notes/csapp-reading-notes.md      # 示例笔记
  src/components/ProjectCard.astro              # 项目卡片（封面图 + 技术栈标签 + 链接）
  src/layouts/ProjectLayout.astro               # 项目详情布局（封面大图 + prose + 按钮）
  src/features/notes/NotesFilter.astro          # 笔记侧边栏（分类筛选 + 标签筛选）
  src/pages/projects/index.astro                # 项目列表（卡片网格）
  src/pages/projects/[...slug].astro            # 项目详情
  src/pages/notes/index.astro                   # 笔记列表（侧边栏筛选）
  src/pages/notes/[...slug].astro               # 笔记详情

修改:
  src/content.config.ts                         # 新增 projects + notes collection
  src/components/Navigation.astro               # 扩展 links 数组
```

---

### Task 1: 注册 Content Collections + 创建示例内容

**Files:**
- Modify: `src/content.config.ts`
- Create: `src/content/projects/xingyouhuanyu-site.md`
- Create: `src/content/notes/csapp-reading-notes.md`

**Interfaces:**
- Produces: `getCollection("projects")` 返回类型 `{ id: string, data: { title, date, summary, tags, github?, demo?, image?, featured } }`
- Produces: `getCollection("notes")` 返回类型 `{ id: string, data: { title, date, summary, tags, source?, category? } }`

- [ ] **Step 1: 更新 content.config.ts**

修改 `src/content.config.ts`，在现有 `blog` collection 基础上新增 `projects` 和 `notes`：

```typescript
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

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(),
    summary: z.string(),
    tags: z.array(z.string()),
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const notes = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(),
    summary: z.string(),
    tags: z.array(z.string()),
    source: z.string().optional(),
    category: z.enum(["reading", "learning", "research"]).optional(),
  }),
});

export const collections = { blog, projects, notes };
```

- [ ] **Step 2: 创建示例项目 Markdown**

创建 `src/content/projects/` 目录，写入 `src/content/projects/xingyouhuanyu-site.md`：

```markdown
---
title: "星游寰宇"
date: "2026-07-07"
summary: "基于 Astro 5 构建的个人技术博客，支持 Markdown 内容管理、分类筛选、RSS 订阅，部署在 GitHub Pages。"
tags: ["Astro", "TypeScript", "Tailwind CSS"]
github: "https://github.com/code2239/xingyouhuanyu-site"
featured: true
---

## 项目简介

星游寰宇是我的个人技术博客，基于 Astro 5 构建。主要功能包括：

- **Markdown 内容管理**：所有文章以 `.md` 格式存放在 content collection 中
- **分类与标签系统**：文章可按层级分类和扁平标签两种维度筛选
- **RSS 订阅**：自动生成 RSS Feed
- **响应式设计**：移动端优先，适配各尺寸屏幕

## 技术架构

- **框架**：Astro 5
- **样式**：Tailwind CSS 4 + CSS 变量设计 Token
- **部署**：GitHub Pages + GitHub Actions CI/CD
- **字体**：Inter + JetBrains Mono
```

- [ ] **Step 3: 创建示例笔记 Markdown**

创建 `src/content/notes/` 目录，写入 `src/content/notes/csapp-reading-notes.md`：

```markdown
---
title: "《深入理解计算机系统》读书笔记"
date: "2026-07-01"
summary: "阅读 CSAPP 的笔记整理，涵盖信息表示、处理器架构、内存层次等核心概念。"
tags: ["计算机系统", "CSAPP", "读书笔记"]
source: "《深入理解计算机系统》（Computer Systems: A Programmer's Perspective）第三版"
category: "reading"
---

## 第一章：计算机系统漫游

计算机系统由硬件和系统软件组成，它们共同工作来运行应用程序。理解编译系统如何工作非常重要：

1. **优化程序性能**：了解机器代码及编译器将不同 C 语句转化为机器代码的方式
2. **理解链接时错误**：大型软件系统中链接器报告的错误往往难以调试
3. **避免安全漏洞**：缓冲区溢出错误是许多安全漏洞的根源

## 第二章：信息的表示和处理

### 信息存储

大多数计算机使用 8 位的块（字节）作为最小的可寻址内存单元。机器级程序将内存视为一个非常大的字节数组，称为**虚拟内存**。

### 十六进制表示法

一个字节由 8 位组成，二进制表示取值范围为 `00000000₂` 到 `11111111₂`。用十六进制表示，取值范围为 `00₁₆` 到 `FF₁₆`。
```

- [ ] **Step 4: 验证 collections 注册成功**

```bash
cd xingyouhuanyu-site && npx astro build 2>&1 | tail -10
```

预期：构建过程中无 content collection schema 相关报错。

---

### Task 2: 更新导航栏链接

**Files:**
- Modify: `src/components/Navigation.astro:8-11`

**Interfaces:**
- Produces: header 和 footer 各显示 4 个链接（博客、项目、笔记、关于）

- [ ] **Step 1: 扩展 links 数组**

修改 `src/components/Navigation.astro` 第 8-11 行，在"博客"和"关于"之间插入"项目"和"笔记"：

```astro
const links = [
  { href: "/blog", label: "博客" },
  { href: "/projects", label: "项目" },
  { href: "/notes", label: "笔记" },
  { href: "/about", label: "关于" },
];
```

- [ ] **Step 2: 确认渲染逻辑无需改动**

第 32 行的 `links.map`（桌面端）、第 57 行的 `links.map`（移动端菜单）、第 75 行（footer）均已遍历整个 `links` 数组，新增的两个条目会自动渲染，无需额外代码。

---

### Task 3: ProjectCard 组件

**Files:**
- Create: `src/components/ProjectCard.astro`

**Interfaces:**
- Consumes: Props `{ title, date, summary, tags, image?, github?, demo?, href }`
- Produces: 项目卡片元素，包含上图下文、技术栈标签、GitHub/Demo 链接

- [ ] **Step 1: 创建 ProjectCard.astro**

写入 `src/components/ProjectCard.astro`：

```astro
---
import TagList from "./TagList.astro";

interface Props {
  title: string;
  date: string;
  summary: string;
  tags: string[];
  image?: string;
  github?: string;
  demo?: string;
  href: string;
}

const { title, date, summary, tags, image, github, demo, href } = Astro.props;
---

<article class="card-hover overflow-hidden h-full flex flex-col">
  <a href={href} class="no-underline flex flex-col h-full group">
    <!-- Cover image or placeholder -->
    {
      image ? (
        <div class="aspect-[16/9] overflow-hidden bg-[var(--color-bg-tertiary)]">
          <img
            src={image}
            alt={title}
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      ) : (
        <div class="aspect-[16/9] bg-gradient-to-br from-[var(--color-accent-soft)] to-[var(--color-bg-tertiary)] flex items-center justify-center">
          <svg class="w-10 h-10 text-[var(--color-text-tertiary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" />
          </svg>
        </div>
      )
    }

    <!-- Text content -->
    <div class="p-5 flex flex-col flex-1">
      <h3 class="text-base font-semibold mb-1 text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-1">
        {title}
      </h3>
      <p class="text-sm text-[var(--color-text-tertiary)] mb-2">{date}</p>
      <p class="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-3 line-clamp-2">
        {summary}
      </p>
      <div class="mt-auto">
        <TagList tags={tags} />
      </div>
    </div>
  </a>

  <!-- External links (outside the main card link, so they don't navigate away) -->
  {(github || demo) && (
    <div class="px-5 pb-4 flex items-center gap-3 border-t border-[var(--color-border)] pt-3">
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          class="text-xs text-[var(--color-text-tertiary)] no-underline hover:text-[var(--color-accent)] transition-colors flex items-center gap-1"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
          GitHub
        </a>
      )}
      {demo && (
        <a
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          class="text-xs text-[var(--color-text-tertiary)] no-underline hover:text-[var(--color-accent)] transition-colors flex items-center gap-1"
        >
          <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          Live Demo
        </a>
      )}
    </div>
  )}
</article>
```

---

### Task 4: ProjectLayout + 项目详情页

**Files:**
- Create: `src/layouts/ProjectLayout.astro`
- Create: `src/pages/projects/[...slug].astro`

**Interfaces:**
- ProjectLayout consumes Props: `{ title, date, tags, github?, demo?, image? }`，renders `<slot />` for Markdown body
- [...slug].astro consumes: `getCollection("projects")` → renders ProjectLayout

- [ ] **Step 1: 创建 ProjectLayout.astro**

写入 `src/layouts/ProjectLayout.astro`：

```astro
---
import Layout from "../components/Layout.astro";
import TagList from "../components/TagList.astro";

interface Props {
  title: string;
  date: string;
  tags: string[];
  github?: string;
  demo?: string;
  image?: string;
}

const { title, date, tags, github, demo, image } = Astro.props;
---

<Layout title={title}>
  <div class="px-6 xl:px-12 pt-12 pb-16">
    <article class="max-w-content">
      <header class="mb-10 text-center">
        <h1 class="text-3xl font-semibold mb-3 tracking-tight">{title}</h1>
        <div class="flex items-center justify-center gap-2 text-[var(--color-text-tertiary)] text-sm">
          <time datetime={date}>{date}</time>
          {tags.length > 0 && (
            <>
              <span class="text-[var(--color-border)]">·</span>
              <TagList tags={tags} />
            </>
          )}
        </div>
      </header>

      <!-- Cover image -->
      {image && (
        <div class="mb-10 -mx-6 sm:mx-0 rounded-none sm:rounded-xl overflow-hidden border border-[var(--color-border)]">
          <img
            src={image}
            alt={title}
            class="w-full h-auto object-cover"
          />
        </div>
      )}

      <!-- Markdown body -->
      <div class="prose prose-neutral max-w-none">
        <slot />
      </div>

      <!-- Action buttons -->
      {(github || demo) && (
        <div class="flex items-center justify-center gap-4 mt-12 pt-8 border-t border-[var(--color-border)]">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-sm font-medium no-underline hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub
            </a>
          )}
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--color-accent)] text-white text-sm font-medium no-underline hover:opacity-90 transition-opacity"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              Live Demo
            </a>
          )}
        </div>
      )}

      <div class="mt-12 pt-8 border-t border-[var(--color-border)]">
        <a
          href="/projects"
          class="text-sm text-[var(--color-text-secondary)] no-underline hover:text-[var(--color-text)] transition-colors duration-150"
        >
          &larr; 返回项目列表
        </a>
      </div>
    </article>
  </div>
</Layout>
```

- [ ] **Step 2: 创建项目详情页路由**

写入 `src/pages/projects/[...slug].astro`：

```astro
---
import { getCollection, render } from "astro:content";
import ProjectLayout from "../../layouts/ProjectLayout.astro";

export async function getStaticPaths() {
  const projects = await getCollection("projects");
  return projects.map((p) => ({
    params: { slug: p.id.replace(/\.md$/, "") },
    props: { project: p },
  }));
}

const { project } = Astro.props;
const { Content } = await render(project);
---

<ProjectLayout
  title={project.data.title}
  date={project.data.date}
  tags={project.data.tags}
  github={project.data.github}
  demo={project.data.demo}
  image={project.data.image}
>
  <Content />
</ProjectLayout>
```

---

### Task 5: 项目列表页

**Files:**
- Create: `src/pages/projects/index.astro`

**Interfaces:**
- Consumes: `getCollection("projects")`
- Produces: 项目卡片网格页面，按日期倒序排列

- [ ] **Step 1: 创建项目列表页**

写入 `src/pages/projects/index.astro`：

```astro
---
import { getCollection } from "astro:content";
import Layout from "../../components/Layout.astro";
import ProjectCard from "../../components/ProjectCard.astro";

const projects = await getCollection("projects");
const sortedProjects = projects.sort(
  (a, b) =>
    new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
);
---

<Layout title="项目">
  <div class="px-6 xl:px-12 pt-12 pb-16">
    <div class="max-w-content">
      <h1 class="text-3xl font-semibold mb-2">
        项目
        {projects.length > 0 && (
          <span class="text-[var(--color-text-tertiary)] text-xl font-normal"> ({projects.length} 个)</span>
        )}
      </h1>
      <p class="text-[var(--color-text-secondary)] mb-10">项目作品展示</p>

      {projects.length > 0 ? (
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sortedProjects.map((project) => (
            <div class="fade-in h-full">
              <ProjectCard
                title={project.data.title}
                date={project.data.date}
                summary={project.data.summary}
                tags={project.data.tags}
                image={project.data.image}
                github={project.data.github}
                demo={project.data.demo}
                href={`/projects/${project.id.replace(/\.md$/, "")}`}
              />
            </div>
          ))}
        </div>
      ) : (
        <p class="text-center text-[var(--color-text-tertiary)] py-12">暂无项目。</p>
      )}
    </div>
  </div>
</Layout>
```

---

### Task 6: NotesFilter 组件

**Files:**
- Create: `src/features/notes/NotesFilter.astro`

**Interfaces:**
- Consumes Props: `{ allTags: Array<[string, number]>, totalNotes: number, categoryCounts: Record<string, number> }`
- Produces: 侧边栏筛选组件（笔记类型按钮 + 标签筛选），输出 HTML + vanilla JS 筛选逻辑

- [ ] **Step 1: 创建 NotesFilter.astro**

写入 `src/features/notes/NotesFilter.astro`：

```astro
---
interface TagEntry {
  0: string;
  1: number;
}

interface Props {
  allTags: TagEntry[];
  totalNotes: number;
  categoryCounts: Record<string, number>;
}

const { allTags, totalNotes, categoryCounts } = Astro.props;

const categories = [
  { value: "", label: "全部", count: totalNotes },
  { value: "reading", label: "读书笔记", count: categoryCounts.reading || 0 },
  { value: "learning", label: "学习笔记", count: categoryCounts.learning || 0 },
  { value: "research", label: "研究记录", count: categoryCounts.research || 0 },
];
---

<div class="space-y-5">
  <!-- Category filter -->
  <div>
    <h3 class="text-xs font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider mb-2">笔记类型</h3>
    <div class="flex flex-wrap gap-1.5">
      {categories.map((cat) => (
        <button
          class={`note-cat-btn text-xs px-2.5 py-1 rounded-full border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors cursor-pointer ${
            cat.value === "" ? "active bg-[var(--color-accent)] text-white border-[var(--color-accent)]" : "bg-transparent text-[var(--color-text-secondary)]"
          }`}
          data-category={cat.value}
        >
          {cat.label} ({cat.count})
        </button>
      ))}
    </div>
  </div>

  <!-- Tag filter -->
  <div>
    <h3 class="text-xs font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider mb-2">标签</h3>
    <div class="flex flex-wrap gap-1.5">
      {allTags.map(([tag, count]) => (
        <button
          class="note-tag-btn text-xs px-2.5 py-1 rounded-full bg-transparent border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors cursor-pointer"
          data-tag={tag}
        >
          {tag} ({count})
        </button>
      ))}
    </div>
  </div>
</div>

<script>
  function initNotesFilter() {
    const catBtns = document.querySelectorAll<HTMLButtonElement>(".note-cat-btn");
    const tagBtns = document.querySelectorAll<HTMLButtonElement>(".note-tag-btn");
    const items = document.querySelectorAll<HTMLElement>(".note-item");
    const emptyEl = document.getElementById("notes-filter-empty");

    let activeCategory = "";
    let activeTag = "";

    function updateVisibility() {
      let visibleCount = 0;

      items.forEach((item) => {
        const itemCategory = item.getAttribute("data-category") || "";
        const itemTags = item.getAttribute("data-tags") || "";

        const catMatch = !activeCategory || itemCategory === activeCategory;
        const tagMatch = !activeTag || itemTags.split(",").includes(activeTag);

        if (catMatch && tagMatch) {
          item.style.display = "";
          visibleCount++;
        } else {
          item.style.display = "none";
        }
      });

      if (emptyEl) emptyEl.style.display = visibleCount === 0 ? "block" : "none";
    }

    catBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        activeCategory = btn.getAttribute("data-category") || "";
        catBtns.forEach((b) => {
          const isActive = b.getAttribute("data-category") === activeCategory;
          if (isActive) {
            b.className = b.className.replace(/bg-transparent text-\[var\(--color-text-secondary\)\]/, "bg-[var(--color-accent)] text-white border-[var(--color-accent)]");
          } else {
            b.className = b.className.replace(/bg-\[var\(--color-accent\)\] text-white border-\[var\(--color-accent\)\]/, "bg-transparent text-[var(--color-text-secondary)]");
          }
        });
        const url = new URL(window.location.href);
        activeCategory ? url.searchParams.set("category", activeCategory) : url.searchParams.delete("category");
        window.history.replaceState({}, "", url.toString());
        updateVisibility();
      });
    });

    tagBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const tag = btn.getAttribute("data-tag") || "";
        if (activeTag === tag) {
          activeTag = "";
          const allTagBtns = document.querySelectorAll<HTMLButtonElement>(".note-tag-btn");
          allTagBtns.forEach((b) => {
            b.classList.remove("active");
            b.classList.remove("bg-[var(--color-accent)]", "text-white", "border-[var(--color-accent)]");
          });
        } else {
          activeTag = tag;
          tagBtns.forEach((b) => {
            const match = b.getAttribute("data-tag") === activeTag;
            if (match) {
              b.classList.add("active", "bg-[var(--color-accent)]", "text-white", "border-[var(--color-accent)]");
            } else {
              b.classList.remove("active", "bg-[var(--color-accent)]", "text-white", "border-[var(--color-accent)]");
            }
          });
        }
        const url = new URL(window.location.href);
        activeTag ? url.searchParams.set("tag", activeTag) : url.searchParams.delete("tag");
        window.history.replaceState({}, "", url.toString());
        updateVisibility();
      });
    });

    // Handle initial URL params
    const params = new URLSearchParams(window.location.search);
    const initialCategory = params.get("category") || "";
    const initialTag = params.get("tag") || "";
    if (initialCategory) {
      activeCategory = initialCategory;
      catBtns.forEach((b) => b.classList.toggle("active", b.getAttribute("data-category") === activeCategory));
    }
    if (initialTag) {
      activeTag = initialTag;
      tagBtns.forEach((b) => b.classList.toggle("active", b.getAttribute("data-tag") === activeTag));
    }
    updateVisibility();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initNotesFilter);
  } else {
    initNotesFilter();
  }
</script>
```

---

### Task 7: 笔记列表页

**Files:**
- Create: `src/pages/notes/index.astro`

**Interfaces:**
- Consumes: `getCollection("notes")`, `NotesFilter.astro`, `ArticleCard.astro`
- Produces: 笔记列表页（侧边栏筛选 + 卡片列表）

- [ ] **Step 1: 创建笔记列表页**

写入 `src/pages/notes/index.astro`：

```astro
---
import { getCollection } from "astro:content";
import Layout from "../../components/Layout.astro";
import ArticleCard from "../../components/ArticleCard.astro";
import NotesFilter from "../../features/notes/NotesFilter.astro";

const notes = await getCollection("notes");

const sortedNotes = notes.sort(
  (a, b) =>
    new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
);

// Compute tag counts
const tagCounts = new Map<string, number>();
notes.forEach((n) => n.data.tags.forEach((t) => tagCounts.set(t, (tagCounts.get(t) || 0) + 1)));
const allTags: Array<[string, number]> = [...tagCounts.entries()]
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

// Compute category counts
const categoryCounts: Record<string, number> = {};
notes.forEach((n) => {
  const cat = n.data.category || "uncategorized";
  categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
});
---

<Layout
  title="笔记"
  description="读书笔记、学习笔记与研究记录"
>
  <div class="px-6 xl:px-12 pt-12 pb-16">
    <div class="blog-layout">
      <!-- Sidebar -->
      <aside class="blog-sidebar">
        <div class="sticky top-20 space-y-6">
          <NotesFilter allTags={allTags} totalNotes={notes.length} categoryCounts={categoryCounts} />
        </div>
      </aside>

      <!-- Main content -->
      <div class="blog-content">
        <h1 class="text-3xl font-semibold mb-2">
          笔记
          {notes.length > 0 && (
            <span class="text-[var(--color-text-tertiary)] text-xl font-normal"> ({notes.length} 篇)</span>
          )}
        </h1>
        <p class="text-[var(--color-text-secondary)] mb-10">读书笔记、学习笔记与研究记录</p>

        {notes.length > 0 ? (
          <div class="flex flex-col gap-4">
            {sortedNotes.map((note) => (
              <div
                class="note-item"
                data-category={note.data.category || ""}
                data-tags={note.data.tags.join(",")}
              >
                <ArticleCard
                  title={note.data.title}
                  date={note.data.date}
                  summary={note.data.summary}
                  tags={note.data.tags}
                  href={`/notes/${note.id.replace(/\.md$/, "")}`}
                />
              </div>
            ))}
          </div>
        ) : (
          <p class="text-center text-[var(--color-text-tertiary)] py-12">暂无笔记。</p>
        )}

        <p id="notes-filter-empty" class="text-center text-[var(--color-text-tertiary)] py-12" style="display: none;">
          没有找到匹配的笔记。
        </p>
      </div>
    </div>
  </div>
</Layout>

<style>
  .blog-layout { display: block; }
  .blog-sidebar { margin-bottom: 2rem; }
  .blog-content { min-width: 0; }

  @media (min-width: 768px) {
    .blog-layout {
      display: grid;
      grid-template-columns: 220px 1fr;
      gap: 3rem;
      align-items: start;
    }
    .blog-sidebar { margin-bottom: 0; }
  }
</style>
```

---

### Task 8: 笔记详情页

**Files:**
- Create: `src/pages/notes/[...slug].astro`

**Interfaces:**
- Consumes: `getCollection("notes")`, `BlogPost.astro`
- Produces: 笔记详情页（复用 BlogPost 布局，不含上一篇/下一篇，增加来源信息行）

- [ ] **Step 1: 创建笔记详情页路由**

写入 `src/pages/notes/[...slug].astro`：

```astro
---
import { getCollection, render } from "astro:content";
import BlogPost from "../../layouts/BlogPost.astro";

export async function getStaticPaths() {
  const notes = await getCollection("notes");
  return notes.map((n) => ({
    params: { slug: n.id.replace(/\.md$/, "") },
    props: { note: n },
  }));
}

const { note } = Astro.props;
const { Content, headings } = await render(note);

const bodyText = note.body || "";
const wordCount = bodyText.length;
---

<BlogPost
  title={note.data.title}
  date={note.data.date}
  tags={note.data.tags}
  headings={headings}
  wordCount={wordCount}
  prevPost={null}
  nextPost={null}
>
  <!-- Source info line -->
  {note.data.source && (
    <div class="mb-6 px-4 py-2.5 rounded-lg bg-[var(--color-accent-soft)] border border-[var(--color-border)] text-sm text-[var(--color-text-secondary)]">
      <span class="text-[var(--color-text-tertiary)]">来源：</span>
      {note.data.source}
    </div>
  )}

  <Content />

  <div>
    <a
      href="/notes"
      class="text-sm text-[var(--color-text-secondary)] no-underline hover:text-[var(--color-text)] transition-colors duration-150"
    >
      &larr; 返回笔记列表
    </a>
  </div>
</BlogPost>
```

---

### Task 9: 构建验证

**Files:**
- None（验证步骤）

- [ ] **Step 1: 运行生产构建**

```bash
cd xingyouhuanyu-site && npm run build
```

预期：`npm run build` 无错退出。`dist/` 目录下包含：
- `dist/projects/index.html`
- `dist/projects/xingyouhuanyu-site/index.html`
- `dist/notes/index.html`
- `dist/notes/csapp-reading-notes/index.html`

- [ ] **Step 2: Commit**

```bash
cd xingyouhuanyu-site
git add .
git commit -m "feat: add projects and notes sections to navbar with content collections"
```
