---
title: "虚拟机 Web 开发环境指南"
date: "2026-07-08"
summary: "在 Ubuntu 虚拟机中开发网页的优势分析：环境一致、快照还原、隔离干净，以及完整的开发环境搭建步骤。"
tags: ["开发环境", "虚拟机", "Linux"]
category: "learning"
---

> 场景：Windows 11 Pro 客户机 → Ubuntu 虚拟机，用于 Web 开发。

---

## 一、在虚拟机里开发网页的好处

相对于在 Windows 客户机上直接开发：

### 1.1 环境和生产服务器一致

99% 的网站最终部署在 Linux 服务器上：

```
Windows 开发 → 部署到 Linux  → "我本地明明是好的啊？"
Ubuntu 开发 → 部署到 Linux  → 一模一样的运行环境
```

文件路径、权限、进程管理、环境变量，开发和上线跑在同一套系统上，**消除"环境差异导致的诡异 bug"**。

### 1.2 快照：随意试错，一键还原

这是虚拟机最大的优势：

```
装了个依赖把环境搞崩了？    → 还原快照，30 秒恢复
想尝试重构但不确定会不会翻车？→ 拍个快照，放心改
升级 Node 版本导致项目跑不起来？→ 还原，继续干活
```

Windows 上做实验出了事，可能要折腾半天。虚拟机里 **拍快照 → 随便折腾 → 不行就还原**，零心理负担。

### 1.3 环境隔离，干净纯粹

| 问题 | Windows 客户机 | Ubuntu 虚拟机 |
|------|---------------|---------------|
| 装过各种全局工具，版本冲突 | 常见 | 全新环境，按需安装 |
| 某个旧项目的配置影响新项目 | 可能 | 完全隔离 |
| 系统更新导致开发环境挂了 | 时有发生 | 更新前拍快照，挂了秒还原 |
| 试了个工具卸载不干净 | 残留文件找半天 | 还原快照，干干净净 |

### 1.4 贴近真实的 Linux 工作流

Web 开发大量工具链天生为 Linux 设计：

- `npm` / `pnpm` 脚本的路径分隔符（`/` vs `\`）
- Docker 原生运行（Windows Docker 底层也是跑 Linux 虚拟机）
- 各种 CLI 工具首选 Linux 支持
- Nginx、Redis、数据库都是 Linux 一等公民

在 Linux 上开发，跟着教程敲命令不用改来改去。

### 1.5 便于迁移和复制

```
换电脑了？      → 导出虚拟机，新电脑导入，零配置恢复
队友要搭环境？  → 分享虚拟机镜像，环境完全一致
想同时测多个环境？→ 复制虚拟机，分别装不同版本的依赖
```

---

## 二、虚拟机环境搭建

### 2.1 选择虚拟机平台

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

### 2.2 创建虚拟机

- 建议配置：**4GB+ 内存、2 核 CPU、40GB+ 硬盘**
- 操作系统：Ubuntu Server 或 Desktop
- 网络：Default Switch（NAT）或 Internal Switch（主机通信）

### 2.3 安装开发工具

```bash
sudo apt update && sudo apt upgrade -y

# Node.js
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# Git
sudo apt install -y git
```

---

## 三、文件传输方案对比

### 3.1 共享文件夹（不推荐用于开发）

| 问题 | 影响 |
|------|------|
| `node_modules` 损坏 | Windows 和 Linux 文件系统差异，`npm install` 报权限错误、符号链接失败 |
| 热更新失效 | Linux `inotify` 无法监听共享文件夹的文件变动 |
| 权限混乱 | `chmod` 不生效，文件权限是虚拟的 |
| 性能差 | 大量小文件（如 `node_modules`）读写极慢 |

**结论：共享文件夹可以传文件，但不能用于开发。**

### 3.2 推荐方案

| 方案 | 适用场景 | 命令 |
|------|---------|------|
| **Git clone**（最佳） | 代码已在 Git 仓库 | `git clone <仓库地址>` |
| **scp 一次性传输** | 没有 Git 仓库时 | `scp -r 项目路径 user@IP:/home/user/` |
| **VS Code Remote-SSH**（最推荐工作流） | 日常开发 | 安装 Remote-SSH 插件 → 连接 `user@虚拟机IP` |

### 3.3 VS Code Remote-SSH 工作流

```
代码存在虚拟机本地磁盘 → 编辑器在客户机 VS Code → 体验和本地开发完全一样
```

---

## 四、开发工作流总结

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
4. 开发前拍快照，出问题秒还原
5. 开发环境和生产服务器保持一致

---

## 核心总结

```
Windows 开发            Ubuntu 虚拟机开发

本地方便但和生产不一致    ✅ 和生产环境一模一样
改坏了调试半天          ✅ 快照秒还原
环境越用越乱            ✅ 干净隔离，不行就重建
一些工具兼容性差        ✅ Linux 原生支持
换机器重新配环境        ✅ 导出导入即用
```

> **一句话：虚拟机让你在生产服务器上开发，但保留了随时反悔的能力。**
