// scripts/validate-categories.mjs
// Check that every category referenced in blog frontmatter exists in
// src/lib/categories.ts. Run: node scripts/validate-categories.mjs

import { readFileSync, readdirSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const root = join(__dirname, "..");
const blogDir = join(root, "src", "content", "blog");

// Minimal YAML frontmatter parser (no dependency needed).
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const yaml = match[1];
  let inCategories = false;
  const categories = [];
  for (const line of yaml.split("\n")) {
    if (/^categories\s*:/.test(line)) {
      inCategories = true;
      const inline = line.match(/^categories\s*:\s*\[(.+)\]/);
      if (inline) {
        for (const item of inline[1].split(",")) {
          const v = item.trim().replace(/^["']|["']$/g, "");
          if (v) categories.push(v);
        }
        inCategories = false;
      }
    } else if (inCategories) {
      const item = line.match(/^\s*-\s+(.+)/);
      if (item) {
        categories.push(item[1].trim().replace(/^["']|["']$/g, ""));
      } else if (/^\S/.test(line)) {
        inCategories = false;
      }
    }
  }
  return { categories };
}

// Mirrors src/lib/categories.ts categoryTree root slugs.
const validSlugs = new Set([
  "claude",
  "ai-tools",
  "github",
  "superpowers",
  "ppt-master",
  "agent-skills",
  "misc",
]);

function collectMdFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) results.push(...collectMdFiles(full));
    else if (extname(entry.name) === ".md") results.push(full);
  }
  return results;
}

const mdFiles = collectMdFiles(blogDir);
const usedSlugs = new Set();
let errors = 0;

for (const file of mdFiles) {
  const raw = readFileSync(file, "utf-8");
  const fm = parseFrontmatter(raw);
  for (const cat of fm.categories || []) {
    const rootSlug = cat.split("/")[0];
    usedSlugs.add(rootSlug);
    if (!validSlugs.has(rootSlug)) {
      console.error(
        `ERROR: ${file.replace(root, "")} — unknown category root "${rootSlug}". Add it to src/lib/categories.ts.`
      );
      errors++;
    }
  }
}

for (const slug of validSlugs) {
  if (!usedSlugs.has(slug)) {
    console.warn(
      `WARNING: category "${slug}" is defined in categories.ts but not used by any article.`
    );
  }
}

if (errors > 0) {
  console.error(`\n${errors} category error(s) found.`);
  process.exit(1);
}

console.log(`OK: ${mdFiles.length} articles validated, ${usedSlugs.size} categories in use.`);