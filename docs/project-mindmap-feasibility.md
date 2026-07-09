# 项目脑图导航——可行性分析报告

> 日期：2026-07-08 | 项目：星游寰宇 (xingyouhuanyu-site)

## 需求

在每个项目页面的每一页都加入一个交互式脑图：

- 脑图可使用 `/graphify` skill 生成
- 每个节点对应一个项目子页面
- 节点是可点击的超链接
- 读者通过脑图快速抓取项目关键信息

---

## 结论

**✅ 完全可行。** 推荐 Graphify + Markmap 混合方案，开发周期约 1 小时。

---

## 现有资产盘点

| 资产 | 位置 | 作用 |
|------|------|------|
| 项目内容 | `src/content/projects/program-0/` (17 篇) | 脑图节点来源 |
| 项目内容 | `src/content/projects/diamond-insulation/` (17 篇) | 同上 |
| 内容 Schema | `src/content.config.ts` | 每篇有 title、date、summary、tags |
| 项目侧边栏 | `src/features/projects/ProjectTreeSidebar.astro` | 已有树形结构（无交互脑图） |
| Graphify | `~/.claude/skills/graphify/` | 可对内容目录生成知识图谱 |
| Graphify 产物 | `graphify-out/` (186KB) | 已对整个网站跑过一次，127 节点、161 边、13 社区 |
| 项目布局 | `src/layouts/ProjectLayout.astro` | 已有 sidebar slot，可直接嵌入脑图 |

---

## 两条实现路径

### 路径 A：Graphify + Markmap（语义驱动）

```
src/content/projects/program-0/*.md
        │
        ▼  /graphify
      graph.json (节点 + 边 + 社区检测)
        │
        ▼  后处理脚本：节点 → URL 映射 → Markdown 大纲
      mindmap.md (嵌套列表 + 超链接)
        │
        ▼  markmap 渲染
      🧠 交互式脑图 HTML
```

**优点：**

- Graphify 自动发现文章间的**语义关联**（交叉引用、共同主题）
- 社区检测自动分组相关页面
- 连接线展示"这篇文章和那篇文章相关"（不是孤立节点）
- 不是简单树，而是有横向关联的**真正知识图谱**

**缺点：**

- 需要运行 graphify 构建步骤（或 CI 中自动化）
- 图结构 → URL 映射需要额外后处理脚本

---

### 路径 B：纯 Markmap（结构驱动）

```
src/content/projects/program-0/*.md
        │
        ▼  Astro content collection
      读取 frontmatter + 文件路径结构
        │
        ▼  生成 Markdown 大纲
      mindmap.md
        │
        ▼  markmap 渲染
      🧠 交互式脑图 HTML
```

**优点：**

- 纯 Astro 端实现，无额外构建步骤
- 节点天然对应页面 URL（从 content collection 直接读取）
- 实现速度快（约 30 分钟，改 2 个文件）
- 内容变更后自动反映

**缺点：**

- 只是树形/层级结构，没有语义关联
- 不支持跨分支的连接线
- 结构完全依赖文件夹层级或手动定义的分类

---

## 推荐技术栈：Markmap

无论选哪条路径，渲染层统一使用 [**markmap**](https://github.com/markmap/markmap)。

| 属性 | 值 |
|------|-----|
| 仓库 | [markmap/markmap](https://github.com/markmap/markmap) |
| 官网 | [markmap.js.org](https://markmap.js.org) |
| 许可证 | MIT |
| 框架依赖 | 无（纯 vanilla JS） |
| 集成方式 | 一个 `<script>` 标签 CDN 引入 |
| 交互能力 | 鼠标滚轮缩放、拖拽平移、点击折叠/展开节点 |
| 链接支持 | 节点天然支持 `<a>` 超链接 |
| 体积 | ~40KB（gzip ~12KB） |
| npm | `npm install markmap-lib markmap-view` |

### 使用方法

输入 Markdown 大纲：

```markdown
# Program 0
## 模块 1: 文档理解
### [概述](module-1-doc-understanding)
### [实现细节](implementation)
## 模块 2: 信息抽取
### [架构设计](module-2-info-extraction)
## 模块 3: 实验流程
### ...
```

自动渲染为：

```
              ┌── 概述 ─── 🔗 /projects/program-0/module-1-doc-understanding
              │
 模块1: 文档理解 ──┼── 实现细节
              │
Program 0 ─── 模块2: 信息抽取 ─── 架构设计
              │
 模块3: 实验流程 ─── ...
              │
              ...
```

---

## 推荐方案：A + B 混合

1. **先跑 `/graphify src/content/projects/program-0/`**——对单个项目目录生成知识图谱（非整个网站）
2. **写一个后处理脚本**——从 `graph.json` 提取节点，映射到项目页面 URL，生成 Markdown 大纲
3. **嵌入 markmap**——在 `ProjectLayout` 的 sidebar 中作为可折叠区块
4. **每个子页面也显示**——sidebar 中高亮当前页面节点
5. **CI 自动化**——`npm run build` 前自动跑 graphify（可选）

---

## 最终效果预览

```
┌─ 项目页面 sidebar ─────────────────────┐
│                                         │
│  📁 文件夹导航 (现有)                     │
│  ├── 提示词                              │
│  ├── 参考文献                            │
│  └── 总结文档                            │
│                                         │
│  🧠 脑图导航 (新增)                       │
│  ┌─────────────────────────────────┐    │
│  │     ┌── 文档理解                  │    │
│  │     │   ├─ 概述 ● (当前页)        │    │
│  │     │   └─ 实现细节               │    │
│  │ 项目 ├── 信息抽取                  │    │
│  │     ├── 实验流程                  │    │
│  │     ├── 知识图谱                  │    │
│  │     └── ...                      │    │
│  │  [🔍 缩放] [📋 全屏]              │    │
│  └─────────────────────────────────┘    │
│                                         │
└─────────────────────────────────────────┘
```

---

## 风险与缓解

| 风险点 | 缓解措施 |
|--------|----------|
| graph.html 当前 ~100KB 太重 | markmap 渲染只需 ~40KB（gzip 12KB） |
| 节点太多导致脑图拥挤 | 默认折叠深层节点，只展开 2 层 |
| 移动端触摸体验差 | 手机端折叠为按钮，点击展开脑图弹窗 |
| 构建时间增加 | 脑图数据在构建时生成，不影响运行时加载 |
| Graphify 语义节点不直接对应页面 URL | 后处理脚本做 label → slug 映射 |
| 文章间缺乏实质性链接导致图稀疏 | 仍然回退到路径 B 的层级结构 |

---

## 下一步

建议先走**路径 B（纯 Markmap）**快速验证：

1. 安装 `markmap-lib` + `markmap-view`（npm，MIT）
2. 在 `ProjectLayout.astro` 中添加脑图容器
3. 写一个 Astro 组件 `MindMap.astro`，从 content collection 生成 Markdown 大纲并用 markmap 渲染
4. 在 `program-0.astro` 和 `diamond-insulation.astro` 中嵌入
5. 评估效果后再决定是否引入 Graphify 的语义关联

**预计开发时间：** 30 分钟 | **改动文件：** 3 个
