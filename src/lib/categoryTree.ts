// src/lib/categoryTree.ts
import { categoryTree, type CategoryDef } from "./categories";

/** 将嵌套分类树拍平为 slug → 节点映射 */
export function flatCategories(): Map<string, CategoryDef> {
  const map = new Map<string, CategoryDef>();

  function walk(nodes: CategoryDef[], parent: string) {
    for (const node of nodes) {
      const fullSlug = parent ? `${parent}/${node.slug}` : node.slug;
      map.set(fullSlug, { ...node, slug: fullSlug });
      if (node.children?.length) walk(node.children, fullSlug);
    }
  }

  walk(categoryTree, "");
  return map;
}

/** 渲染用节点 */
export interface TreeNode {
  label: string;
  slug: string;
  count: number;
  children: TreeNode[];
}

/**
 * 构建带计数的分类树。
 * count = 本分类文章数 + 所有子分类文章数之和。
 */
export function buildCategoryTree(
  postCategories: Array<{ categories: string[] }>
): TreeNode[] {
  const flat = flatCategories();
  const countMap = new Map<string, number>();

  for (const post of postCategories) {
    for (const c of post.categories) {
      const parts = c.split("/");
      for (let i = 0; i < parts.length; i++) {
        const ancestor = parts.slice(0, i + 1).join("/");
        countMap.set(ancestor, (countMap.get(ancestor) ?? 0) + 1);
      }
    }
  }

  function toTree(nodes: CategoryDef[], parentSlug: string): TreeNode[] {
    return nodes.map((node) => {
      const slug = parentSlug ? `${parentSlug}/${node.slug}` : node.slug;
      const children = node.children?.length ? toTree(node.children, slug) : [];
      const childrenCount = children.reduce((s, c) => s + c.count, 0);
      const ownCount = countMap.get(slug) ?? 0;
      return { label: node.label, slug, count: ownCount + childrenCount, children };
    });
  }

  return toTree(categoryTree, "");
}

/** 展平为带深度的列表，用于侧边栏渲染（Astro 不支持递归组件） */
export interface FlatNode {
  label: string;
  slug: string;
  count: number;
  depth: number;
}

export function flattenTree(nodes: TreeNode[], depth = 0): FlatNode[] {
  return nodes.flatMap((n) => {
    const self: FlatNode = { label: n.label, slug: n.slug, count: n.count, depth };
    return [self, ...flattenTree(n.children, depth + 1)];
  });
}
