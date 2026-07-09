# 站点性能优化分析

> 日期：2026-07-09

## 现状诊断

| 资源 | 大小 | 加载范围 | 影响 |
|------|------|----------|------|
| `search-index.json` | **424 KB** 🚨 | 首次搜索时 fetch | 最大瓶颈 — 首次搜索需下载 424KB |
| `SearchModal JS` | 65 KB (gzip 23 KB) | 所有页面（Navigation 引用） | 中等 — 23KB gzip 可接受 |
| `NotesFilter JS` | 56 KB (gzip 16 KB) | 仅 /notes 页 | 低 — 单页面，含日历组件 |
| 大型 HTML 页面 | 60-180 KB | 单篇文章 | 低 — 长文章内容本身体积大 |

## 瓶颈 1: search-index.json 424KB 🚨

### 根因

`save()` 序列化了 Orama 的全部内部数据结构——Radix 树、倒排索引、词频表等，比原始文档数据大了 10 倍：

```
76 篇文档 × ~500 字节/篇 = ~40KB 原始数据
save() 输出 = 424KB（10 倍膨胀）
```

同时因大小写处理，每条数据存了两份（`title` + `displayTitle`、`summary` + `displaySummary`）。

**影响**：3G 网络下首次搜索需等待 ~2.3 秒才能下载完索引。

### 优化方案

构建时只发原始文档数组（~30KB），客户端收到后 `insertMultiple` + mandarin tokenizer 实时构建索引：

```
构建时: 收集文档 → 输出 JSON 文档数组（~30KB）
客户端: fetch → insertMultiple（~100ms）→ 搜索
```

改动：`search-index.json.ts` 去掉 `save()`，直接输出文档数组；`SearchModal.astro` 改用 `insertMultiple` 替代 `load`。

| 指标 | 优化前 | 优化后 |
|------|--------|--------|
| 索引下载量 | 424 KB | ~30 KB |
| 首次搜索延迟 | 2.3s (3G) | ~0.3s (3G) |
| 客户端索引构建 | 0ms | ~100ms（可忽略） |

## 瓶颈 2: SearchModal JS 在非搜索页面也被加载

### 根因

`Navigation.astro` 在每页都渲染 `SearchModal`，导致 Orama + tokenizer 的 JS bundle（23KB gzip）在所有页面都加载。

### 优化方案

将 `<script>` 改为动态导入 —— 用户点击搜索图标或按 `Ctrl+K` 时才加载 JS：

```astro
// Navigation.astro script
searchTrigger.addEventListener("click", async () => {
  const { default: initSearch } = await import("../features/search/search-init.js");
  initSearch();
});
```

这需要把 SearchModal 的 JS 逻辑抽成独立模块。改动约 3 个文件。

| 指标 | 优化前 | 优化后 |
|------|--------|--------|
| 首页 JS 体积 | 23 KB + 其他 | 无搜索 JS |
| 搜索触发延迟 | 0ms | ~50ms（import 开销，可预加载） |
| 实现方式 | 可以用 `link rel="modulepreload"` 预加载消除延迟 |

## 瓶颈 3: 低优先级

### 3a. 413KB CS51 压缩 CSS

几个博客文章因为代码高亮（Shiki）生成大量 CSS，但不是每页都加载，影响有限。

### 3b. 大型 HTML 页面（60-180KB）

长文章自然产生大 HTML，属于正常范畴。

## 改动清单（优化 1 + 2）

| # | 文件 | 操作 |
|---|------|------|
| 1 | `src/pages/search-index.json.ts` | 修改 — 去掉 save()，直接输出文档数组 |
| 2 | `src/features/search/SearchModal.astro` | 修改 — 改用 insertMultiple + 动态导入 |
| 3 | `src/components/Navigation.astro` | 修改 — 触发搜索时动态加载 |

**3 个文件，小改动**。

## CLAUDE.md 合规

| 约束 | 状态 |
|------|------|
| 无新依赖 | ✅ 无 npm 包变动 |
| 无新框架 | ✅ 纯重构 |
| 构建必过 | ✅ |

## 结论

两个优化都是纯重构，不改功能。效果：首页 JS 减少 ~23KB（动态加载搜索），搜索索引下载从 424KB 降至 ~30KB。建议一起实施。