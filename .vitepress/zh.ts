import { defineConfig } from 'vitepress'

export const zh = defineConfig({
  lang: 'zh-Hans',
  description: '在 JinsHub Blog 上发现技术见解。找到实用指南和深入的技术细节。',
  themeConfig: {
    nav: [
      {
        text: 'Rust',
        link: '/zh/rust/what-is-rust',
        activeMatch: '/zh/rust/'
      },
    ],
    sidebar: {
      '/zh/rust/': {
        base: '/zh/rust/', items: [
          {
            text: '简介',
            collapsed: false,
            items: [
              { text: '什么是 Rust?', link: 'what-is-rust' },
              { text: '摘要和测验', link: 'summaries-quizzes' },
            ]
          },
        ]
      },
    },
  },
})
