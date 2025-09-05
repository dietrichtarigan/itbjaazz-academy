import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: 'index.html',
        modules: 'modules/index.html'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})