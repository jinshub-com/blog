import { defineConfig, mergeConfig } from 'vitest/config'
import { defineConfig as defineViteConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const viteConfig = defineViteConfig({
  plugins: [
    vue(),
  ],
})

export default mergeConfig(viteConfig, defineConfig({
  test: {
    // `.open` property of details element is not supported by happy-dom
    // environment: "happy-dom",
    environment: "jsdom",
  }
}))
