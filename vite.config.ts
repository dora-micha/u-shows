import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  plugins: [vue(), svgLoader(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,vue}'],
      exclude: ['**/*.spec.ts']
    }
  }
})
