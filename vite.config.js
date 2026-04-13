import { defineConfig } from 'vite'
import { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  resolve: {
    alias: { '@': resolve(__dirname, 'src') }
  },
  build: {
    rollupOptions: {
      input: {
        main:      resolve(__dirname, 'index.html'),
        mission:   resolve(__dirname, 'mission.html'),
        resources: resolve(__dirname, 'resources.html'),
        unions:    resolve(__dirname, 'unions.html'),
        news:      resolve(__dirname, 'news.html'),
        contact:   resolve(__dirname, 'contact.html'),
        dashboard: resolve(__dirname, 'dashboard.html'),
      },
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:4000'
    }
  }
})
