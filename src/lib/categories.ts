// src/lib/categories.ts
export interface CategoryDef {
  slug: string;
  label: string;
  description?: string;
  children?: CategoryDef[];
}

export const categoryTree: CategoryDef[] = [
  {
    slug: "claude",
    label: "Claude",
    description: "Anthropic Claude 生态相关文章，包括 Skills、CLAUDE.md、Agent 等。",
  },
  {
    slug: "ai-tools",
    label: "AI 工具报告",
    description: "各类 AI 工具的调研与测评报告。",
  },
  {
    slug: "github",
    label: "GitHub",
    description: "GitHub AI 功能、星标项目分析等。",
  },
  {
    slug: "superpowers",
    label: "Superpowers",
    description: "Superpowers Skills 生态、触发条件与测试计划。",
  },
  {
    slug: "ppt-master",
    label: "PPT-Master",
    description: "PPT-Master 的调研、美化指南与 Token 分析。",
  },
  {
    slug: "agent-skills",
    label: "Agent 与 Skills",
    description: "AI Agent 协作、Agent-Skills 调用与 QA 总结。",
  },
  {
    slug: "misc",
    label: "其他",
    description: "其他技术与工具相关的文章。",
  },
  {
    slug: "program-0",
    label: "Program 0",
    description: "科研 AI 系统——从论文到假设的全自动研究操作系统技术方案。",
    children: [
      {
        slug: "claude-md",
        label: "1. claude.md 文件",
        description: "技术发现驱动研究 Agent 的角色定义与核心能力。",
      },
      {
        slug: "tech-report",
        label: "2. 技术可行性报告",
        description: "系统总览、集成方案与 7 个核心模块的详细设计。",
      },
      {
        slug: "existing-solutions",
        label: "3. 现有技术分析",
        description: "当前市场上已有解决方案的调研与对比。",
      },
      {
        slug: "learning-curve",
        label: "4. 学习曲线",
        description: "开发者技能路线图与项目上手路径。",
      },
      {
        slug: "final-output",
        label: "5. 项目最终呈现",
        description: "领域配置、桌面端可行性、可观测性与调试。",
      },
      {
        slug: "questions",
        label: "6. 部分提问",
        description: "咨询过程中的关键问题分类总结。",
      },
    ],
  },
];
