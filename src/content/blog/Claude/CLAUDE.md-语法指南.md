---
title: "CLAUDE.md 语法指南"
date: "2026-07-05"
tags: ["AI","CLAUDE.md"]
summary: "纯 Markdown，没有特殊头部要求，直接书写即可："
---

# CLAUDE.md 语法指南

> CLAUDE.md 是 Claude Code 的项目指令配置文件，使用纯 Markdown 格式书写。

---

## 1. 基本格式

纯 Markdown，没有特殊头部要求，直接书写即可：

```markdown
# 项目名称

## 技术栈
- 前端：React + TypeScript
- 后端：Python FastAPI

## 编码规范
- 使用 2 空格缩进
- 遵循 ESLint 配置
```

---

## 2. `@` 文件导入语法

引用其他文件内容，相对路径基于**当前 CLAUDE.md 所在目录**：

```markdown
参考 @README 了解项目概述，@package.json 查看可用命令。

## 代码规范
详见 @docs/code-style.md
```

**规则**：
- 支持递归导入，最深 **5 层**
- 包裹反引号（`` @README ``）则保持原样输出，不解析

---

## 3. `.claude/rules/` 模块化规则

将指令拆成多个 `.md` 文件，使用 **YAML frontmatter** 限定适用路径：

```markdown
---
paths:
  - "src/api/**/*.ts"
  - "src/**/*.{ts,tsx}"
---
# API 开发规则
- 所有端点必须包含输入验证
- 错误响应统一格式 { error: string }
```

| 规则 | 说明 |
|---|---|
| **无 `paths` 字段** | 会话启动时即加载 |
| **有 `paths` 字段** | 仅当操作匹配文件时加载 |

---

## 4. 文件层级与加载顺序

CLAUDE.md 按层级自动加载（从系统级到项目级**拼接**，非覆盖）：

| 作用域 | 位置 | 用途 |
|---|---|---|
| **组织策略** | `/etc/claude-code/CLAUDE.md`（Linux） | IT 管理的全局规则 |
| **用户全局** | `~/.claude/CLAUDE.md` | 个人偏好，跨项目生效 |
| **项目根目录** | `./CLAUDE.md` 或 `./.claude/CLAUDE.md` | 团队共享项目指令 |
| **本地（已 gitignore）** | `./CLAUDE.local.md` | 个人项目偏好 |
| **子目录** | `./subfolder/CLAUDE.md` | 限定子目录范围 |

### 目录结构示例

```
your-project/
├── CLAUDE.md              # 项目级指令（最常用）
├── CLAUDE.local.md        # 个人偏好（已 .gitignore）
├── subfolder/
│   └── CLAUDE.md          # 子目录专用指令
└── .claude/
    ├── CLAUDE.md
    └── rules/
        ├── code-style.md
        ├── testing.md
        └── security.md
```

---

## 5. HTML 注释（零 token 成本）

```markdown
<!-- 这行注释仅对人类可见，不会消耗 Claude 的上下文 token -->
```

---

## 6. 引用 AGENTS.md

如果项目已有 AGENTS.md，无需重写：

```markdown
@AGENTS.md

## Claude Code 专用指令
- 修改 src/billing/ 下的代码时请先建 plan
```

---

## 7. 最佳实践

| 准则       | 说明                                     |
| -------- | -------------------------------------- |
| **简洁**   | 每行都被当作强指令，避免冗长                         |
| **具体**   | "使用 2 空格缩进" ✅ / "代码格式规范" ❌             |
| **长度**   | 每文件 **200 行以内**，800–1500 tokens 为宜     |
| **不要放**  | API 密钥、密码、安全漏洞详情                       |
| **自动生成** | 在项目目录运行 `/init` 可自动分析代码库生成初始 CLAUDE.md |
| **实时添加** | 会话中按 `#` 热键可临时补充指令                     |

---

## 8. 完整示例

```markdown
# My Project

@README

## 编码规范
- TypeScript strict 模式
- 使用 2 空格缩进

## 测试
- 所有 PR 必须通过 `npm test`
- 覆盖率不低于 80%

## Git 工作流
- 从 main 分支切 feature branch
- 提交信息遵循 Conventional Commits
```

---

**官方文档**：[code.claude.com/docs/en/memory](https://code.claude.com/docs/en/memory)
