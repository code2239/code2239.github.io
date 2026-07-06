# GitHub Pages 部署方式对比

## 两种 Source 模式

GitHub Pages 提供两种部署方式，在 `Settings → Pages → Build and deployment → Source` 中选择：

| | Deploy from a branch | GitHub Actions |
|---|---|---|
| **工作原理** | GitHub 自动从指定分支读取静态文件并部署 | 你自己的工作流负责构建 + 部署 |
| **适用场景** | 纯 HTML/CSS/JS，无需构建步骤 | 需要 `npm build` 等构建步骤的项目 |
| **部署内容** | 分支根目录或 `/docs` 文件夹的全部文件 | 工作流中 `upload-pages-artifact` 上传的内容 |
| **构建在哪里** | 无构建步骤，直接部署原始文件 | 在 GitHub Actions runner 上执行构建 |

---

## Deploy from a branch（分支部署）

```
你推送代码 → GitHub 直接把 gh-pages 分支的内容部署到服务器
```

**优点：**
- 配置最简单
- 不消耗 Actions 额度
- 适合纯静态站点（HTML 直接写好的）

**缺点：**
- 不能执行构建命令（没有 `npm run build`）
- 每次部署需要先手动构建、再把产物推送到部署分支

---

## GitHub Actions（工作流部署）

```
你推送代码 → Actions 运行 npm run build → 上传构建产物 → GitHub 部署产物
```

**优点：**
- 支持任意构建步骤（npm、pip、docker、自定义脚本）
- 适合 Astro/Next.js/VuePress 等需要编译的框架
- 部署内容 = 构建产物，和源码分支完全分离

**缺点：**
- 消耗 GitHub Actions 免费额度（公开仓库无限，私有仓库 2000 分钟/月）
- 配置稍复杂

---

## 你的项目为什么必须用 GitHub Actions

你的网站是 Astro 框架构建的：

```
源码 (src/*.astro, *.md)  ──无法直接部署──→  浏览器
              │
              ▼
       npm run build（Astro 编译）
              │
              ▼
          dist/ 目录（纯 HTML/CSS/JS）──可以部署──→  浏览器
```

如果用 "Deploy from a branch"：
- GitHub 会把 `src/*.astro` 和 `.md` 文件直接当网站部署，浏览器无法识别
- 必须在本地手动 `npm run build`，再把 `dist/` 推到一个分支

用 "GitHub Actions"：
- 推送源码后，Actions 自动执行 `npm run build`
- 构建产物自动部署，全程无需手动操作

**这也解释了之前为什么部署一直报错**：原来的 workflow 用的是 `peaceiris/actions-gh-pages@v4`（把 dist 推到 gh-pages 分支），但 Source 选的可能是 GitHub Actions，两者不匹配导致部署失败。
