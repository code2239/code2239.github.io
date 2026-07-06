---
title: "Hook（钩子）完整解读 — 它是什么，能做什么？"
date: "2026-07-05"
tags: ["AI","调研","Hook","自动化","工具"]
categories: ["misc"]
summary: "正常流程：   A  →  B  →  C  →  D"
---

# Hook（钩子）完整解读 — 它是什么，能做什么？

> **报告日期**：2026-07-05  
> **关键词**：Hook、事件驱动、工具拦截、Claude Code、自动化

---

## 一、什么是 Hook？

**Hook（钩子）** 是一种编程/系统设计模式，允许你在某个流程的**特定时间点**插入自定义逻辑，从而改变或扩展其行为——而不需要修改原有代码。

### 核心思想

```
正常流程：   A  →  B  →  C  →  D

带 Hook：    A  →  B  → [★ Hook 点] →  C  →  D
                            │
                        ┌───┴───┐
                        │ 你的  │
                        │ 自定义 │
                        │ 逻辑  │
                        └───────┘
```

系统在关键节点**主动问**："你要不要在这里做点什么？"——你说"要"，然后注入自己的逻辑。

---

## 二、Hook 的通用特征

| 特征 | 说明 |
|------|------|
| **事件驱动** | 在特定事件发生时触发，而非持续运行 |
| **非侵入性** | 不需要修改原始系统的源代码 |
| **可插拔** | 可以动态添加/移除，不影响核心流程 |
| **可组合** | 多个 Hook 可以链式执行或并行触发 |
| **上下文感知** | 能访问触发点的上下文数据（输入、输出、状态） |

---

## 三、Hook 在不同领域的形态

### 3.1 Git Hooks — 版本控制自动化

Git 在执行特定操作（commit、push、merge）的**前后**，会检查 `.git/hooks/` 目录下是否有对应脚本，有则自动执行。

```
pre-commit         → 提交前：运行 lint、格式化、检查密钥泄露
prepare-commit-msg → 自动生成提交信息模板
commit-msg         → 校验提交信息格式
pre-push           → 推送前：运行测试、检查分支名
post-merge         → 合并后：自动更新依赖
post-receive       → 推送接收后：触发 CI/CD
```

**示例：防止提交调试代码**
```bash
#!/bin/sh
# .git/hooks/pre-commit
if grep -r "debugger" --include="*.js" .; then
  echo "包含 debugger 语句，禁止提交"
  exit 1
fi
```

### 3.2 React Hooks — 前端状态管理

React 16.8 引入，让你在**函数组件**中使用状态和副作用，无需写 class。

```jsx
function Counter() {
  const [count, setCount] = useState(0);     // 状态 Hook
  useEffect(() => {                           // 生命周期 Hook
    document.title = `点击了 ${count} 次`;
  }, [count]);

  return <button onClick={() => setCount(c + 1)}>{count}</button>;
}
```

| 常用 Hook                   | 作用                  |
| ------------------------- | ------------------- |
| `useState`                | 声明状态变量              |
| `useEffect`               | 处理副作用（请求、订阅、DOM 操作） |
| `useContext`              | 访问全局上下文             |
| `useCallback` / `useMemo` | 性能优化                |

### 3.3 Webhook — 系统间的事件通知

**Webhook 是"反向 API"**：不是你的程序去轮询问"有没有新消息"，而是系统在事件发生时**主动 HTTP 回调你的 URL**。

```
GitHub Push Event
        │
        ▼
   HTTP POST ──────────→ 你的服务器（CI/CD、部署、通知）
   (包含事件数据)
```

| 场景        | 发送方           | 接收方                    |
| --------- | ------------- | ---------------------- |
| 代码推送触发 CI | GitHub/GitLab | Jenkins/GitHub Actions |
| 支付成功通知    | Stripe        | 你的订单系统                 |
| 新工单提醒     | Jira/Zendesk  | Slack/企业微信             |

### 3.4 操作系统 Hook

- **Windows 消息 Hook**（`SetWindowsHookEx`）：拦截键盘、鼠标、窗口消息
- **Linux ptrace**：拦截系统调用（调试器、沙箱的基础）
- **FUSE（Filesystem in Userspace）**：拦截文件系统操作

### 3.5 编辑器/IDE Hook

- **VS Code 扩展 API**：`onDidSaveTextDocument`、`onDidChangeActiveTextEditor`
- **Vim autocommand**：`BufWritePre`、`FileReadPost`

---

## 四、重点：Claude Code / ECC 中的 Hook

这是你当前环境中最相关的应用场景。

### 4.1 基本原理

Hook 定义在 `.claude/settings.json` 中，拦截 AI 对**工具**（Read、Write、Bash、Edit 等）的调用，在**调用前**或**调用后**注入自定义逻辑。

```jsonc
{
  "hooks": {
    "BeforeToolCall": {           // 工具执行前触发
      "Bash": {
        "handler": "检查命令是否包含危险操作"
      }
    },
    "AfterToolCall": {            // 工具执行后触发
      "Read": {
        "handler": "自动格式化读取内容，追加提醒"
      }
    }
  }
}
```

### 4.2 触发层级图

```
用户输入自然语言
        │
        ▼
  [AI 模型理解意图]    ←── 这里用 Skill（自然语言匹配）
        │
        ▼
  [AI 决定调用工具]    ←── AI 选择 Read / Write / Bash 等
        │
        ▼
 ┌──── Before Hook ────┐  ←── 拦截点 1：修改参数、添加约束
 │                      │
 ▼                      │
  工具执行               │
 ▼                      │
 │                      │
 └──── After Hook ──────┘  ←── 拦截点 2：处理结果、添加注释
        │
        ▼
  [AI 收到结果，继续推理]
```

### 4.3 能做什么（实际用例）

| 用途 | Hook 点 | 实现效果 |
|------|---------|---------|
| **安全防护** | `BeforeToolCall: Bash` | 检测 `rm -rf /`、`DROP DATABASE` 等危险命令，要求确认 |
| **数据保护** | `BeforeToolCall: Write` | 检测 `.env`、`private.key` 等文件写入，添加警告 |
| **自动格式化** | `AfterToolCall: Read` | 读取代码文件时自动添加行号或高亮 |
| **规范强制** | `BeforeToolCall: Write` | 写入文件时自动插入 License 头或 `@ts-check` |
| **元数据注入** | `AfterToolCall: Bash` | Git 命令后自动显示分支状态 |
| **错误自动修复** | `AfterToolCall: Bash` | 命令失败时分析错误并建议修复方案 |
| **成本控制** | `BeforeToolCall: Read` | 大文件读取前警告 Token 消耗 |
| **审计日志** | `AfterToolCall: 所有工具` | 记录所有工具调用（JSONL 格式） |

### 4.4 不能做什么

| 不能 | 原因 |
|------|------|
| 自动检测用户意图 | Hook 只看工具调用，不看对话上下文 |
| 触发 Skill | Skill 调用在模型层决策，Hook 在工具层执行 |
| 修改模型行为 | Hook 只能操作工具输入/输出，不能改模型本身的推理 |
| 跨会话持久状态 | Hook 每次会话重新加载，无内置持久化 |

---

## 五、Hook VS Skill：核心差异

| 维度 | Hook | Skill |
|------|------|-------|
| **拦截层** | 工具调用层 | 意图识别层 |
| **触发方式** | 特定工具被调用时 | 用户自然语言或 `/` 命令 |
| **作用范围** | 修改工具行为/输出 | 加载领域指令到上下文 |
| **配置位置** | `settings.json` | `.claude/skills/` 目录 |
| **编写难度** | 简单（几条规则） | 中等（完整指令集） |
| **灵活性** | 低（固定格式） | 高（自由定义流程） |

**两者的关系：互补，不互替。**

- **Hook** = "工具怎么执行"（管手脚）
- **Skill** = "AI 怎么做"（管大脑）

---

## 六、实战：一个完整的 Hook 配置示例

```jsonc
// .claude/settings.json
{
  "hooks": {
    "BeforeToolCall": {
      "Bash": {
        "handler": [
          "检查命令是否包含：rm -rf、DROP、DELETE FROM、shutdown、format",
          "如果包含，提示用户确认（展示完整命令）"
        ]
      },
      "Write": {
        "handler": [
          "如果目标文件是 .env、*.key、*secret*、*password*：",
          "  在文件内容前追加注释：'此文件包含敏感信息，请确认不提交到版本控制'",
          "如果目标文件是 *.ts、*.tsx、*.js：",
          "  如果文件没有 @ts-check 注释，在第一行前追加 '// @ts-check'"
        ]
      },
      "Read": {
        "handler": [
          "如果文件大小 > 100KB：",
          "  警告：'大文件读取可能消耗大量 Token，建议指定行范围'"
        ]
      }
    },
    "AfterToolCall": {
      "Bash": {
        "handler": [
          "如果 exitCode !== 0：",
          "  分析错误输出，提取关键错误信息",
          "  提供 1-2 条修复建议"
        ]
      }
    }
  }
}
```

---

## 七、总结

| 问题 | 答案 |
|------|------|
| **Hook 是什么？** | 在流程的关键节点插入自定义逻辑的机制 |
| **核心优势？** | 非侵入、可插拔、事件驱动 |
| **在 Claude Code 中怎么用？** | 通过 `settings.json` 拦截工具调用 |
| **能拦截什么？** | Read、Write、Bash、Edit 等所有工具调用 |
| **能拦截 Skill 调用吗？** | 不能，Skill 调用发生在模型层 |
| **适合什么场景？** | 安全检查、格式规范、错误处理、自动化约束 |

> **一句话总结**：Hook 是**"在正确的时间做正确的事"**——让系统在关键节点停下来问你要做什么，而你无需改动系统本身的一行代码。

---

## 参考链接

- [Claude Code 官方文档 - Hooks](https://docs.anthropic.com/en/docs/claude-code/overview)
- [Git Hooks 官方文档](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)
- [React Hooks 官方文档](https://react.dev/reference/react)
- [Webhooks 概念解析](https://en.wikipedia.org/wiki/Webhook)

---

*基于静态文件大小估算，实际消耗因对话长度而异。*
