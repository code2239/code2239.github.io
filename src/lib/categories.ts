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

];
