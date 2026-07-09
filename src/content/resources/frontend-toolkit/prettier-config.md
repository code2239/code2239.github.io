---
title: "Prettier 格式化配置模板"
date: "2026-07-06"
summary: "一套适用于前端项目的 Prettier 配置，专注于代码一致性而非个人偏好。"
tags: ["Prettier", "配置", "格式化"]
files:
  - filename: "prettier-config.json"
    label: ".prettierrc 配置模板"
    size: "0.5 KB"
    format: "json"
sourceUrl: "https://prettier.io/docs/en/configuration.html"
---

## 说明

这套 Prettier 配置的设计原则是"最小化 diff"——选择那些能减少行内差异、提高 code review 效率的选项。

### 配置要点

- `singleQuote: true` — 与 JSX/TSX 保持一致
- `semi: true` — 避免 ASI 歧义
- `trailingComma: "all"` — 减少新增项时的 diff
- `printWidth: 100` — 适应宽屏，减少不必要的换行