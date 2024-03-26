import { defineConfig } from 'vitepress'

export const en = defineConfig({
  lang: 'en',
  description: 'Discover tech insights at JinsHub Blog. Find hands-on guides and in-depth tech details.',
  themeConfig: {
    nav: [
      {
        text: 'Rust',
        link: '/rust/what-is-rust',
        activeMatch: '/rust/'
      },
    ],
    sidebar: {
      '/rust/': {
        base: '/rust/', items: [
          {
            text: 'Introduction',
            collapsed: false,
            items: [
              { text: 'What is Rust?', link: 'what-is-rust' },
              { text: 'Summaries & Quizzes', link: 'summaries-quizzes' },
            ]
          },
        ]
      },
    },
  },
})
