import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist-single',
    base: './',
    lib: {
      entry: 'src/main-single.js',
      name: 'MemoryGame',
      formats: ['iife'],
      fileName: () => 'memory-game.js'
    },
    rollupOptions: {
      output: {
        // 将所有内容打包到一个文件
        inlineDynamicImports: true,
        // 不分割代码
        manualChunks: undefined
      }
    },
    minify: 'esbuild',
    // 将 CSS 内联到 JS 中
    cssCodeSplit: false
  },
  define: {
    'process.env.NODE_ENV': '"production"'
  }
})

