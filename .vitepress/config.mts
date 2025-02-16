import { defineConfig } from 'vitepress'
import d2 from 'vitepress-plugin-d2'
import { Layout, Theme, FileType } from 'vitepress-plugin-d2/dist/config'
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
    config: (md) => {
      md.use(d2, {
        forceAppendix: false,
        layout: Layout.ELK,
        theme: Theme.NEUTRAL_DEFAULT,
        darkTheme: Theme.DARK_MUAVE,
        padding: 100,
        animatedInterval: 0,
        timeout: 120,
        sketch: false,
        center: false,
        scale: -1,
        target: "*",
        fontItalic: null,
        fontBold: null,
        fontSemiBold: null,
        fileType: FileType.SVG,
        directory: "d2-diagrams",
      })
    }
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
    zh: { label: '简体中文', ...zh },
  },
})
