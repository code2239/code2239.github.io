export const siteConfig = {
  name: "星游寰宇",
  tagline: "探索技术与协作的无限可能",
  description: "星游寰宇的个人网站——技术文章、项目展示与思考笔记",
  author: "星游寰宇",
  social: {
    github: "https://github.com/xingyouhuanyu",
    email: "xingyouhuanyu@example.com",
  },
} as const;

export const projectsData = [
  {
    name: "Agent 团队协作调研",
    description:
      "对 Claude Code 多代理系统的深入分析——Skills、Agents、Workflows 三者的概念、关系与实践。",
    tags: ["Agent", "Claude Code", "Workflow"],
    url: "/blog/skills-and-agents-qa-summary",
  },
  {
    name: "多代理开源前端工具汇总",
    description:
      "ChatDev、MetaGPT、AutoGen Studio 等七大多代理协作平台的功能对比与选型建议。",
    tags: ["开源", "前端", "AutoGen"],
    url: "/blog/multi-agent-collaboration-frontend-tools",
  },
] as const;
