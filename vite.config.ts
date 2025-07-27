import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/

const API_URL = process.env.VITE_API_BASE_URL || 'http://localhost:1323'

export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: API_URL,
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, '/'),
      },
    },
  },
})
