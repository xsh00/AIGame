import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: './',  // 生成相对路径（必须在顶层）
  plugins: [vue()],
  build: {
    // 输出目录
    outDir: 'dist',
    // 内联所有资源
    assetsInlineLimit: 100000000,
    rollupOptions: {
      output: {
        // 将所有 JS 打包成单个文件
        manualChunks: undefined,
        // 自定义输出文件名
        entryFileNames: 'game.js',
        assetFileNames: 'game.[ext]'
      }
    },
    // 压缩（使用 esbuild，无需额外依赖）
    minify: 'esbuild'
  }
})

