import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  site: process.env.SITE_URL || 'https://code2239.github.io',
  markdown: {
    shikiConfig: {
      theme: 'css-variables',
    },
  },
});
