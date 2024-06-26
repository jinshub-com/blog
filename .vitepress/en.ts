import { defineConfig } from 'vitepress'

export const en = defineConfig({
  lang: 'en',
  description: 'Discover tech insights at JinsHub Blog. Find hands-on guides and in-depth tech details.',
  themeConfig: {
    nav: [
      {
        text: 'Rust Book Quizzes',
        link: '/rust-book-quizzes/introduction',
        activeMatch: '/rust-book-quizzes/'
      },
    ],
    sidebar: {
      '/rust-book-quizzes/': {
        base: '/rust-book-quizzes/', items: [
          {
            text: 'Rust Book Quizzes',
            collapsed: false,
            items: [
              { text: 'Introduction', link: 'introduction' },
              { text: 'Getting Started', link: '1-getting-started' },
              { text: 'Guessing Game', link: '2-programming-a-guessing-game' },
              { text: 'Common Concepts', link: '3-common-programming-concepts' },
              { text: 'Progress', link: 'progress' },
            ]
          },
        ]
      },
    },
  },
})
