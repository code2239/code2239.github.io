---
title: "🏆 GitHub 星标前 30 的 Claude Code Skills 排行榜"
date: "2026-07-05"
tags: ["AI","Claude Code","GitHub","Skill","排行","自动化","工具"]
summary: "- **开发者**：Jesse Vincent（Prime Radiant，前 Anthropic 工程师 / Perl 前负责人 / RT 工单系统创建者）"
---

# 🏆 GitHub 星标前 30 的 Claude Code Skills 排行榜

> **调研日期**：2026-07-05  
> **说明**：每个 Skill 包含开发者信息、星标数、功能简介（能做什么）和解决的问题（为什么需要它），最后附可点击的 GitHub 链接。

---

## 🥇 S 级 — 生态级（>100K ⭐）

### 1️⃣ obra/superpowers — ⭐ ~235K
- **开发者**：Jesse Vincent（Prime Radiant，前 Anthropic 工程师 / Perl 前负责人 / RT 工单系统创建者）
- **功能简介**：Claude Code 生态最核心的元技能框架。提供 14+ 个可组合的子技能（brainstorming、writing-plans、executing-plans、test-driven-development、code-review 等）和 5 个内置子代理。强制执行 7 阶段开发工作流：头脑风暴→编写计划→Git Worktree 隔离→子代理驱动开发→TDD（红/绿/重构）→代码审查→分支完成。
- **解决的问题**：AI 编程没有纪律——容易跳过规划直接写代码、不做测试、缺乏代码审查。Superpowers 用"铁律（Iron Laws）"强制 AI 像资深工程师一样按流程交付，提升长期代码质量和可维护性。
- 🔗 [obra/superpowers](https://github.com/obra/superpowers)

### 2️⃣ affaan-m/everything-claude-code — ⭐ ~183K
- **开发者**：affaan-m（个人开发者）
- **功能简介**：全能型 Skill 大礼包，Anthropic Hackathon 获奖项目。包含 28 个预配置 Agent、119 个独立 Skill、60 条自定义命令，覆盖从代码开发、测试、部署到文档的全流程。跨平台兼容（Claude Code / Codex CLI / Gemini CLI 等）。
- **解决的问题**：一次性安装 100+ Skill 太麻烦，单个 Skill 分别配置耗时。这个包让你一次安装搞定所有场景，无需分别寻找和配置。
- 🔗 [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code)

### 3️⃣ anthropics/skills（官方） — ⭐ ~154K
- **开发者**：Anthropic 官方团队（美国旧金山）
- **功能简介**：Anthropic 官方维护的第一方技能库。核心技能包括：PDF 文档解析、DOCX 文档生成、PPTX 演示文稿创建、XLSX 电子表格处理、frontend-design（50 种视觉风格方向，277K+ 安装）、MCP-builder（自定义 MCP 服务器脚手架）、webapp-testing（端到端 Web 测试工作流）。
- **解决的问题**：社区 Skill 品质参差不齐，存在提示注入或过时内容风险。官方出品保证了与 Claude Code 版本的完美兼容和长期维护，适合作为基底 Skill。
- 🔗 [anthropics/skills](https://github.com/anthropics/skills)

### 4️⃣ forrestchang/andrej-karpathy-skills — ⭐ ~180K
- **开发者**：forrestchang（基于 Andrej Karpathy 的 AI 编码理念提炼）
- **功能简介**：仅 70 行 Markdown 的极简行为约束技能。提炼自 Karpathy 对 LLM 编码失败模式的系统分析。核心原则：Think Before Coding（先思考再编码）、Simplicity First（简洁优先）、Surgical Changes（外科手术式改动，少改多留）、Never Ignore Errors（永远不要忽略错误）、Read Before Write（先读再写）。
- **解决的问题**：AI 代码最常见的毛病——不读上下文就改代码、改得太多太激进、忽略错误继续执行。这 70 行像"行为护栏"一样纠正 AI 的工作习惯，成本几乎为零。是星标/行数比最高的项目。
- 🔗 [forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills)

### 5️⃣ garrytan/gstack — ⭐ ~97K
- **开发者**：Garry Tan（Y Combinator CEO、连续创业者、初期投资人）
- **功能简介**：23 个 AI 专业角色技能，每个角色有独立的视角和工作规范。角色包括：CEO（战略视角）、工程师（编码实现）、设计师（UI/UX）、代码审查员（Code Review）、QA（测试覆盖）、CSO（安全视角）、发布经理（发布流程）等。采用 Sprint 迭代式开发流程。
- **解决的问题**：单一 AI 视角太窄，容易忽略安全性、测试覆盖、商业可行性等维度。gstack 让 AI 在多个角色视角间切换审查，确保交付物经过全方位验证。
- 🔗 [garrytan/gstack](https://github.com/garrytan/gstack)

### 6️⃣ mattpocock/skills — ⭐ ~84K
- **开发者**：Matt Pocock（TypeScript 社区知名教育家、Total TypeScript 创始人）
- **功能简介**：从 Matt Pocock 个人 .claude 目录中提取的 17 个实战技能。涵盖 TypeScript 类型安全最佳实践、React 组件设计模式、测试策略、代码重构、错误处理等。每个技能都是经过大量真实项目验证的。
- **解决的问题**：TypeScript 类型复杂，AI 经常生成类型不安全的代码（any 滥用、类型断言过度、泛型误用）。这套技能让 AI 拥有 TypeScript 专家的类型安全意识。
- 🔗 [mattpocock/skills](https://github.com/mattpocock/skills)

### 7️⃣ JuliusBrussee/caveman — ⭐ ~75K
- **开发者**：Julius Brussee（个人开发者）
- **功能简介**：Token 节省终极武器。核心策略极其简单直接：去除 AI 输出中的叙述性废话（narrative fluff，如"需要注意的是"/"值得注意的是"/"综上所述"）、冗余解释、重复内容、不必要的礼貌用语。实测可减少约 65% 的输出 Token。
- **解决的问题**：AI 默认输出模式啰嗦——喜欢加背景说明、过度解释、重复自己。API 按 Token 计费，保守估计浪费 30–65% 的 Token 在无信息量的话上。caveman 把 AI 从"礼貌助理"模式切换到"直接高效"模式。
- 🔗 [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman)

### 8️⃣ farion1231/cc-switch — ⭐ ~72K
- **开发者**：farion1231（个人开发者）
- **功能简介**：多 AI 工具切换管理器。桌面级应用，支持一键在 Claude Code / OpenAI Codex CLI / Google Gemini CLI 之间切换。提供统一的配置界面管理各工具的 API Key、模型参数和快捷键。
- **解决的问题**：同时使用多个 AI 编程工具的用户需要频繁切换上下文，手动切换效率低且容易混淆。cc-switch 提供中心化管理，一键切换跨平台 AI 编程环境。
- 🔗 [farion1231/cc-switch](https://github.com/farion1231/cc-switch)

### 9️⃣ shanraisshan/claude-code-best-practice — ⭐ ~54K
- **开发者**：shanraisshan（个人开发者）
- **功能简介**：Claude Code 深度使用百科全书。涵盖 Agent 配置、命令大全、Skills 管理、Hooks 系统、MCP（Model Context Protocol）服务器配置、权限管理。收录 80+ 经过社区验证的实用技巧和最佳实践。
- **解决的问题**：Claude Code 配置项繁多（CLAUDE.md / .claude/rules / hooks / MCP / skills），新手不知道从何下手，老手也可能遗漏某些功能。这份百科全书提供了系统化的配置指南。
- 🔗 [shanraisshan/claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice)

### 🔟 ruvnet/ruflo — ⭐ ~51K
- **开发者**：ruvnet（个人/团队）
- **功能简介**：多 Agent 蜂群式协作编排工具。核心概念是"Bee-swarm Collaboration"——多个 Agent 像蜂群一样分工协作，互相通信，同步进度。内置 RAG（检索增强生成）管道，支持从知识库提取上下文后协作完成任务。
- **解决的问题**：单 Agent 面对复杂多步骤任务时容易上下文丢失、遗忘进度、偏离目标。ruflo 让多个 Agent 像团队一样分工协作，各自负责不同子任务，大幅提升复杂任务的完成质量。
- 🔗 [ruvnet/ruflo](https://github.com/ruvnet/ruflo)

---

## 🥇 A 级 — 高价值（30K–100K ⭐）

### 11️⃣ safishamsi/graphify — ⭐ ~48K
- **开发者**：Safi Shamsi（个人开发者）
- **功能简介**：基于 tree-sitter 的代码知识图谱生成工具。自动分析代码库的模块结构、函数调用关系、依赖链，生成交互式知识图谱可视化。支持多语言（JavaScript/TypeScript/Python/Rust 等）。
- **解决的问题**：理解陌生代码库需要大量时间人工追踪调用关系和依赖链。graphify 自动生成代码关系图谱，让 AI 和开发者都能快速把握代码架构全貌。
- 🔗 [safishamsi/graphify](https://github.com/safishamsi/graphify)

### 12️⃣ hesreallyhim/awesome-claude-code — ⭐ ~43K
- **开发者**：hesreallyhim（社区维护者）
- **功能简介**：Claude Code 生态最受信任的资源索引大全。分类收录了 Skills、Hooks、Agent 配置、MCP 服务器、插件、教程、示例工程的精选列表。持续更新，社区贡献活跃。
- **解决的问题**：Claude Code 生态膨胀迅速（1400+ Skills），质量参差不齐，筛选成本高。这份精选列表帮你快速找到高质量的资源。
- 🔗 [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)

### 13️⃣ addyosmani/agent-skills — ⭐ ~42K
- **开发者**：Addy Osmani（Google 首席工程师、Chrome 开发团队）
- **功能简介**：软件开发全生命周期（SDLC）技能集。覆盖性能分析（Performance）、调试策略（Debugging）、架构设计（Architecture）、测试覆盖（Testing）、代码审查（Code Review）、发布工程（Release Engineering）等阶段。
- **解决的问题**：AI 编码时往往只关注"写出能跑的代码"，忽略性能、架构、测试等工程维度。这些技能确保 AI 在开发全生命周期中保持工程水准。
- 🔗 [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills)

### 14️⃣ sickn33/antigravity-awesome-skills — ⭐ ~38K
- **开发者**：sickn33（社区开发者）
- **功能简介**：1,450+ 社区技能的超级合集。通过 npm 包一键安装，覆盖代码质量、测试、部署、安全、文档、CI/CD 等几乎所有开发环节。采用基于角色的 Starter Pack 分组（如"React 开发者包""DevOps 包"）。
- **解决的问题**：逐个查找和安装 Skill 效率太低。这个合集提供了"一次安装，按需激活"的模式，按角色打包常用技能组合。
- 🔗 [sickn33/antigravity-awesome-skills](https://github.com/sickn33/antigravity-awesome-skills)

### 15️⃣ wshobson/agents — ⭐ ~35K
- **开发者**：wshobson（个人开发者）
- **功能简介**：150+ 预构建 Agent 技能，覆盖代码生成、调试、文档编写、测试生成、部署脚本等。支持多平台运行（Claude Code + Gemini CLI），统一的接口规范。
- **解决的问题**：在不同 AI 编程工具间切换时，配置和习惯需要重新适应。这 150+ 技能提供了一致的跨平台开发体验。
- 🔗 [wshobson/agents](https://github.com/wshobson/agents)

### 16️⃣ ComposioHQ/awesome-claude-skills — ⭐ ~35K
- **开发者**：ComposioHQ（Agent 工具集成平台团队）
- **功能简介**：850+ SaaS 集成连接器的技能化封装。让 Claude Code 可以直接调用 GitHub、Gmail、Slack、Jira、Notion、Google Sheets、Salesforce 等 850+ 外部服务的 API。每个集成都封装为独立的 Skill。
- **解决的问题**：AI 只能生成文本，无法直接操作外部工具和 API。这 850+ 集成让 AI 像使用工具一样调用外部服务，实现真正的自动化工作流。
- 🔗 [ComposioHQ/awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills)

### 17️⃣ pbakaus/impeccable — ⭐ ~28K
- **开发者**：Paul Bakaus（前 Google 开发者体验主管、Web 标准专家）
- **功能简介**：AI 前端设计语言系统。提供 21 条命令（audit/refine/polish/critique/animate/distill 等），从视觉层次、排版韵律、间距系统、色彩对比、交互反馈等维度提升 AI 生成的 UI 品质。277K+ 安装量。
- **解决的问题**：AI 生成的前端界面千篇一律——灰色背景、圆角卡片、居中布局，缺乏设计品味。impeccable 相当于给 AI 装上"设计师的眼睛"，从审美维度审查和优化 UI。
- 🔗 [pbakaus/impeccable](https://github.com/pbakaus/impeccable)

### 18️⃣ OthmanAdi/planning-with-files — ⭐ ~24K
- **开发者**：Othman Adi（个人开发者）
- **功能简介**：Manus 风格的持久化文件规划系统。核心理念：文件系统是"磁盘"，上下文是"RAM"。所有任务规划写入 Markdown 文件持久化，即使会话中断或崩溃，重新打开也能从断点继续。支持任务分解、进度追踪、依赖管理。
- **解决的问题**：AI 会话一旦关闭或超时，之前的规划和分析全部丢失（上下文没了）。planning-with-files 把所有进度持久化到文件系统，类似 IDE 的断点续传。
- 🔗 [OthmanAdi/planning-with-files](https://github.com/OthmanAdi/planning-with-files)

### 19️⃣ blader/humanizer — ⭐ ~23K
- **开发者**：blader（个人开发者）
- **功能简介**：去除 AI 写作痕迹的专业技能。针对 AI 文本最明显的特征：Em-dash 过度滥用（——）、模棱两可的措辞（"值得注意的是""可能会"）、机器人式的排比结构、不必要的概括总结。输出更像人类自然写作。
- **解决的问题**：AI 写的文本有明显的机器感——读起来像教科书或官方文档，缺乏人类写作的自然节奏和变化。humanizer 把 AI 文本从"机器人模式"切换到"人类模式"。
- 🔗 [blader/humanizer](https://github.com/blader/humanizer)

### 20️⃣ VoltAgent/awesome-agent-skills — ⭐ ~21K
- **开发者**：VoltAgent（社区组织）
- **功能简介**：官方团队技能合集，汇集了来自 Anthropic、Google、Vercel、Stripe、Cloudflare、Netlify、Sentry 等知名科技公司的官方 Skill。每个技能都经过对应公司团队的审核和维护。
- **解决的问题**：社区 Skill 质量不可控，大公司的官方 Skill 在品质和安全性上更有保障。适合企业环境或对代码质量要求高的场景。
- 🔗 [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills)

---

## 🥈 B 级 — 值得关注（5K–20K ⭐）

### 21️⃣ supermemoryai/supermemory — ⭐ ~17K
- **开发者**：supermemoryai（社区团队）
- **功能简介**：跨会话持久化记忆引擎。让 Claude Code 能跨会话记住用户的项目偏好、代码风格偏好、常用配置。支持 MCP 协议集成，具备最先进的上下文召回机制。
- **解决的问题**：每次新的 Claude Code 会话都是"白板"，没有之前的记忆。supermemory 让 AI 像人一样拥有长期记忆，不用每次重复配置。
- 🔗 [supermemoryai/supermemory](https://github.com/supermemoryai/supermemory)

### 22️⃣ alirezarezvani/claude-skills — ⭐ ~15K
- **开发者**：Alireza Rezvani（个人开发者）
- **功能简介**：330+ 跨领域技能库，30+ 预设 Agent，70+ 自定义 Slash 命令。覆盖工程开发、市场营销、产品管理、合规审计等多个业务领域。不限于技术场景。
- **解决的问题**：大部分 Skill 只面向程序员，但产品经理、市场人员、合规团队也需要 AI 辅助。这套技能将 Claude Code 的应用面从工程扩展到商业全场景。
- 🔗 [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills)

### 23️⃣ Lum1104/Understand-Anything — ⭐ ~12K
- **开发者**：Lum1104（个人开发者）
- **功能简介**：代码库到交互式知识图谱的转换工具。采用多 Agent 管线自动分析代码库结构、数据流、依赖关系，生成带 Web 仪表盘的可视化知识图谱。支持点击展开、搜索、路径分析等交互功能。
- **解决的问题**：进入一个大型陌生代码库，不知道从哪里开始理解。Understand-Anything 自动构建代码的"知识地图"，大幅降低 onboarding 成本。
- 🔗 [Lum1104/Understand-Anything](https://github.com/Lum1104/Understand-Anything)

### 24️⃣ Jeffallan/claude-skills — ⭐ ~10K
- **开发者**：Jeff Allan（个人开发者）
- **功能简介**：66 个全栈开发专项技能的完整包。将 Claude Code 变为资深全栈工程师，涵盖前端（React/Vue）、后端（Node/Python）、数据库（SQL/NoSQL）、DevOps（Docker/K8s）、安全（OWASP Top 10）等。
- **解决的问题**：AI 在某个栈之外的知识不足，比如前端专家不清楚后端安全最佳实践。这套全栈技能覆盖整个技术栈，减少跨领域的盲区。
- 🔗 [Jeffallan/claude-skills](https://github.com/Jeffallan/claude-skills)

### 25️⃣ VoltAgent/awesome-openclaw-skills — ⭐ ~8K
- **开发者**：VoltAgent（社区组织）
- **功能简介**：5,200+ 由 OpenClaw 社区构建的 Skill 合集，从 13,729 个社区技能中精选而来。涵盖从基础开发到专业领域的广泛场景。
- **解决的问题**：OpenClaw 生态碎片化严重，社区贡献的 13K+ 技能难以筛选。这份精选合集帮你省去筛选成本，直接获取社区验证过的高质量技能。
- 🔗 [VoltAgent/awesome-openclaw-skills](https://github.com/VoltAgent/awesome-openclaw-skills)

### 26️⃣ slavingia/skills — ⭐ ~7.5K
- **开发者**：Sahil Lavingia（Gumroad 创始人、《The Minimalist Entrepreneur》作者）
- **功能简介**：10 个基于精益创业方法论的创始人技能。包括：find-community（找社区）、validate-idea（验证想法）、mvp（最小可行产品）、pricing（定价策略）、growth（增长）、fundraising（融资）等。
- **解决的问题**：创业者用 AI 辅助创业时，AI 缺乏对创业阶段的理解（什么时候该验证？什么时候该定价？）。这些技能给 AI 注入了精益创业方法论，聚焦"什么阶段该做什么事"。
- 🔗 [slavingia/skills](https://github.com/slavingia/skills)

### 27️⃣ SimoneAvogadro/android-reverse-engineering-skill — ⭐ ~6K
- **开发者**：Simone Avogadro（个人开发者）
- **功能简介**：Android APK 反编译与安全分析助手技能。支持 APK 解包、Manifest 分析、Smali 代码查看、签名验证、敏感权限检测、安全漏洞识别等逆向工程全流程。
- **解决的问题**：Android 应用安全分析需要大量专业工具和知识，手动操作繁琐且容易遗漏。这个技能将标准逆向工程流程自动化，降低安全分析的门槛。
- 🔗 [SimoneAvogadro/android-reverse-engineering-skill](https://github.com/SimoneAvogadro/android-reverse-engineering-skill)

### 28️⃣ SawyerHood/dev-browser — ⭐ ~6K
- **开发者**：SawyerHood（个人开发者）
- **功能简介**：为 Claude Code 提供真实浏览器环境的工具。AI 可以自主导航网页、点击按钮、填写表单、提取页面数据、截图验证。与 Playwright 集成，支持跨页面交互。
- **解决的问题**：AI 无法直接和真实网页交互，限制了大量 Web 自动化场景（数据采集、表单填写、UI 测试）。dev-browser 给了 AI 一个"真实的浏览器窗口"。
- 🔗 [SawyerHood/dev-browser](https://github.com/SawyerHood/dev-browser)

### 29️⃣ trailofbits/skills — ⭐ ~5.6K
- **开发者**：Trail of Bits（全球顶级网络安全审计公司，美国纽约）
- **功能简介**：由世界顶级安全审计公司 Trail of Bits 出品的 12+ 安全专项技能。涵盖漏洞检测、代码审计、供应链安全、Crypto 安全、智能合约审计、二进制分析等专业安全领域。
- **解决的问题**：AI 对安全的理解通常停留在表层（知道 SQL 注入但不懂高级漏洞）。Trail of Bits 的安全技能为 AI 植入了专业安全审计师的思维方式，提升代码安全质量。
- 🔗 [trailofbits/skills](https://github.com/trailofbits/skills)

### 30️⃣ travisvn/awesome-claude-skills — ⭐ ~5K
- **开发者**：travisvn（个人开发者）
- **功能简介**：Claude Code 工作流定制化精选列表。聚焦于如何通过 Skill 优化日常开发工作流，包括编辑器集成、命令别名、快捷键绑定、模板配置等提升效率的技巧。
- **解决的问题**：Claude Code 默认配置只适合通用场景，但每个团队和个人的工作习惯不同。这份列表帮你找到最适合自己工作流的高效配置组合。
- 🔗 [travisvn/awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills)

---

## 📊 分类速览

| 类别 | 代表 | ⭐ | 解决的问题 |
|------|------|:--:|-----------|
| 🧠 元技能框架 | Superpowers | ~235K | AI 编程缺乏纪律和流程 |
| 📦 全能大礼包 | everything-claude-code | ~183K | 安装和管理众多 Skill 太麻烦 |
| 📐 行为约束 | Karpathy Skills | ~180K | AI 代码行为不够简洁严谨 |
| 🏛️ 官方出品 | anthropics/skills | ~154K | 社区 Skill 品质参差不齐 |
| 💼 创始人视角 | gstack | ~97K | 单一 AI 视角太窄 |
| 🦾 TypeScript 专精 | mattpocock/skills | ~84K | AI 生成类型不安全的代码 |
| ⚡ Token 优化 | caveman | ~75K | AI 输出过于啰嗦浪费 Token |
| 🎨 前端设计 | impeccable | ~28K | AI UI 千篇一律缺乏设计品味 |
| 📋 持久化规划 | planning-with-files | ~24K | 会话中断后规划全部丢失 |
| ✍️ AI 去味 | humanizer | ~23K | AI 文本机器感太重 |
| 🔒 安全审计 | trailofbits/skills | ~5.6K | AI 对安全的认知停留在表层 |

---

## ⭐ 推荐 Top 5 必装组合（按安装顺序）

| 优先级 | Skill | 为什么需要 |
|:-----:|-------|-----------|
| 🥇 | **Karpathy Skills** | 70 行即插即用，纠正 AI 行为习惯，成本几乎为零 |
| 🥇 | **anthropics/skills（官方）** | 品质基线，官方保障，选 frontend-design 即可 |
| 🥇 | **Superpowers**（或 gstack） | 建立 TDD + 审查的开发纪律，长期质量保障 |
| 🥈 | **caveman** | 省 65% Token = 省 65% 成本，立刻见效 |
| 🥉 | **planning-with-files** | 持久化任务规划，再也不怕会话中断 |
