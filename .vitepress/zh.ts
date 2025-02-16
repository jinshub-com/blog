import { defineConfig } from 'vitepress'

export const zh = defineConfig({
  lang: 'zh-Hans',
  description: '分享技术见解，实用指南和最佳实践',
  themeConfig: {
    nav: [
      // {
      //   text: 'Rust',
      //   link: '/zh/rust/what-is-rust',
      //   activeMatch: '/zh/rust/'
      // },
      {
        text: 'Web 开发全面指南',
        link: '/zh/web-dev-guide/1-hello-web',
        activeMatch: '/zh/web-dev-guide/'
      },
    ],
    // sidebar: {
    //   '/zh/rust/': {
    //     base: '/zh/rust/', items: [
    //       {
    //         text: '简介',
    //         collapsed: false,
    //         items: [
    //           { text: '什么是 Rust?', link: 'what-is-rust' },
    //           { text: '摘要和测验', link: 'summaries-quizzes' },
    //         ]
    //       },
    //     ]
    //   },
    // },
  },
})
