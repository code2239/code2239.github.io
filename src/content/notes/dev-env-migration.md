---
title: "网站开发环境：从客户机迁移到虚拟机"
date: "2026-07-08"
summary: "Windows 客户机到 Ubuntu 虚拟机的 Web 开发环境迁移指南，含文件传输方案对比与 VS Code Remote-SSH 工作流。"
tags: ["开发环境", "虚拟机", "VS Code", "Remote-SSH"]
category: "learning"
---

> 场景：Windows 11 Pro 客户机 → Ubuntu 虚拟机，用于 Web 开发。

---

## 一、虚拟机环境搭建

### 1.1 选择虚拟机平台

| 平台 | 特点 |
|------|------|
| **Hyper-V**（推荐） | Windows 11 Pro 自带，性能好 |
| VMware Workstation | 功能强，快照好用 |
| VirtualBox | 免费开源，跨平台 |

Windows 11 Pro 启用 Hyper-V：

```powershell
# PowerShell（管理员）
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V-All
```

### 1.2 创建虚拟机

- 建议配置：**4GB+ 内存、2 核 CPU、40GB+ 硬盘**
- 操作系统：Ubuntu Server 或 Desktop
- 网络：Default Switch（NAT）或 Internal Switch（主机通信）

### 1.3 安装开发工具

```bash
sudo apt update && sudo apt upgrade -y

# Node.js
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# Git
sudo apt install -y git
```

---

## 二、文件传输方案对比

### 2.1 共享文件夹（不推荐用于开发）

| 问题 | 影响 |
|------|------|
| `node_modules` 损坏 | Windows 和 Linux 文件系统差异，`npm install` 报权限错误、符号链接失败 |
| 热更新失效 | Linux `inotify` 无法监听共享文件夹的文件变动 |
| 权限混乱 | `chmod` 不生效，文件权限是虚拟的 |
| 性能差 | 大量小文件（如 `node_modules`）读写极慢 |

**结论：共享文件夹可以传文件，但不能用于开发。**

### 2.2 推荐方案

| 方案 | 适用场景 | 命令 |
|------|---------|------|
| **Git clone**（最佳） | 代码已在 Git 仓库 | `git clone <仓库地址>` |
| **scp 一次性传输** | 没有 Git 仓库时 | `scp -r 项目路径 user@IP:/home/user/` |
| **VS Code Remote-SSH**（最推荐工作流） | 日常开发 | 安装 Remote-SSH 插件 → 连接 `user@虚拟机IP` |

### 2.3 VS Code Remote-SSH 工作流

```
代码存在虚拟机本地磁盘 → 编辑器在客户机 VS Code → 体验和本地开发完全一样
```

---

## 三、为什么用 Git 管理项目

### 3.1 核心能力

| 能力 | 没有 Git | 有 Git |
|------|---------|--------|
| **多机同步** | 手动 scp，容易覆盖错 | `git pull` 一键同步 |
| **回退** | Ctrl+Z 仅最近几步 | `git reset` 回到任意历史版本 |
| **撤销改动** | 祈祷有备份 | `git checkout -- 文件名` 秒还原 |
| **改动追溯** | 靠记忆 | `git diff` 精确到每一行 |
| **提交历史** | 靠记忆 | `git log` + 提交信息记录每次原因 |
| **分支实验** | 复制文件夹 `项目-实验版` | `git branch` 开分支，满意合并，不满意删除 |
| **换机器/重装** | 拷贝整个文件夹 | `git clone` → `npm install`，一分钟恢复 |
| **多人协作** | 传 zip 包 | 同一套流程，无需改变工作方式 |

### 3.2 核心命令

```bash
# 日常使用
git add .
git commit -m "描述你做了什么"
git push

# 同步远程
git pull

# 回退
git reset --hard <提交ID>

# 撤销单个文件的改动
git checkout -- 文件名
```

### 3.3 Git 的本质

> **存档 + 时光机 + 同步器**

对于客户机 ↔ 虚拟机两台机器开发的场景，Git 几乎是必需的，否则同步问题会非常痛苦。

---

## 四、Git 版本管理策略

### 4.1 Git 不强制任何规范

你可以随便提交、随便回退，不制定任何策略也能用。

### 4.2 三个低成本高收益的习惯（推荐）

**① 提交信息写清楚**

```bash
# ❌ 不好
git commit -m "update"
git commit -m "改"

# ✅ 好
git commit -m "修复首页导航栏在移动端错位的问题"
git commit -m "添加用户登录的表单验证"
```

**② 提交粒度小**

一次提交只做一个改动，回退时精准不影响其他。

**③ 用标签标记里程碑**

```bash
git tag v1.0 -m "首页+导航完成，已验证可部署"

# 出问题时精准回退
git checkout v1.0
```

### 4.3 什么时候需要正式版本策略

| 情况 | 需要什么 |
|------|---------|
| 项目上线，有人在用 | 至少用 `git tag` 标记发布版本 |
| 多人协作 | 约定分支规则（`main` 稳定，开发在别的分支） |
| 对用户展示版本号 | 语义化版本：`v1.2.3` |
| 需同时维护旧版本 | 分支策略 + 标签 |

### 4.4 总结

```
个人项目（客户机 + 虚拟机开发）：

必须做：  git commit 写清楚改了什么  ← 免费，收益巨大
建议做：  用 git tag 标记稳定节点   ← 5 秒操作，回退时省半小时
不需要：  制定正式版本管理流程      ← 等项目上线有人用了再说
```

---

## 五、开发工作流总结

```
客户机 VS Code（Remote-SSH）──> 虚拟机（代码 + 运行环境）
                                    │
                              git push / git pull
                                    │
                                 GitHub
```

1. 代码用 Git 托管在虚拟机本地磁盘
2. 客户机通过 VS Code Remote-SSH 连接编辑
3. `git push/pull` 实现备份和多机同步
4. `git tag` 标记稳定版本
5. 提交信息写清楚，方便以后回退
