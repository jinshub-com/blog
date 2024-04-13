import { defineConfig } from 'vitepress'
import { en } from './en'
import { zh } from './zh'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "JinsHub Blog",
  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,
  markdown: {
    math: true,
  },
  sitemap: {
    hostname: 'https://blog.jinshub.com',
  },
  head: [
    ['script', { src: 'https://plausible.jinshub.com/js/script.js', 'data-domain': 'blog.jinshub.com', defer: '' }],
  ],
  themeConfig: {
    logo: { src: '/jinshub-blog-logo.svg', width: 24, height: 24 },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/jinshub-com' },
    ],
    search: {
      provider: 'local',
    },
  },
  locales: {
    root: { label: 'English', ...en },
    // zh: { label: '简体中文', ...zh },
  },
})
