import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: 'index.html',
        'module-1-test': 'module-1-test.html'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})