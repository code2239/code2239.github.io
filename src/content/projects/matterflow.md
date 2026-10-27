---
title: "MatterFlow · 材料计算智能助手"
date: "2026-10-27"
summary: "从结构和计算需求出发，体验可拖动的任务编排、依赖校验、核时费用与模拟回放。在线版使用离线规则演示，并提供可连接真实 Agent 的本机版。"
tags: ["材料计算", "AI Agent", "交互 Demo"]
demo: "https://code2239.github.io/projects/matterflow-demo/index.html"
image: "/images/projects/matterflow.png"
featured: true
---

## 打开 Demo

**[在线体验 MatterFlow →](/projects/matterflow-demo/index.html)**

把一个材料计算想法，整理成看得懂、可以修改、能够核算成本的工作流。

## 可以体验什么

- **结构与需求规划**：使用公开的硅结构样例，或上传 POSCAR / 完整有序的 P1 CIF，再描述优化结构、单点能、能带或态密度等需求。
- **节点编排**：拖动、添加和移除步骤，调整依赖；程序检查循环和必要的数据来源。
- **成本核算**：填写各任务运行时间、核数与核时单价，查看累计费用及并行任务的关键路径。未知耗时显示“待估算”。
- **上下文助手与技能管理**：查看当前步骤的解释与规则建议，体验 Skill 的编辑和启用界面。
- **导出与模拟回放**：下载当前方案、VASP 输入模板与 Python 运行脚本，或预览明确标记的模拟进度和示意结果。

## 在线演示与本机完整版

在线版完全在浏览器中运行，方案保存在当前浏览器；上传的结构和技能不发送到服务器。规划与问答采用离线规则，**没有真实模型调用，也不会运行 VASP**。声子、磁性等专业任务可保留为草案，对应执行器尚待接入。

**[下载本机完整版源码 ZIP](/projects/matterflow-demo/matterflow-local.zip)**，安装依赖后可连接自己的 Codex 或 Claude Code，并通过 pymatgen 处理一般 CIF。下载包包含源码与公开样例，不含账号、密钥、个人结构或计算记录。

真实计算仍需自己的授权 VASP、PBE 势库和计算资源。成本是人工填写后的估算，数值精度与科学结果需要独立验证。
