// src/lib/categories.ts
export interface CategoryDef {
  slug: string;
  label: string;
  description?: string;
  children?: CategoryDef[];
}

export const categoryTree: CategoryDef[] = [
  {
    slug: "ai-tools",
    label: "AI 工具",
    description: "各类 AI 工具的介绍、使用指南与能力边界分析。",
    children: [
      {
        slug: "claude-code",
        label: "Claude Code",
        description: "Anthropic 推出的命令行 AI 编码助手，支持 Skills、Hook、Agent 等高级功能。",
      },
      {
        slug: "dify",
        label: "Dify",
        description: "开源 LLM 应用开发平台，支持可视化编排 AI 工作流。",
      },
    ],
  },
  {
    slug: "research",
    label: "研究调研",
    description: "针对 AI Agent、Skills 生态、开发工具链等方向的技术调研报告。",
  },
  {
    slug: "guides",
    label: "指南教程",
    description: "工具使用教程、环境搭建指南、最佳实践总结。",
  },
];
