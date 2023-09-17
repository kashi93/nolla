import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { vite } from "nolla-core"
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [
    vite(),
    react(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./lib/resources/src', import.meta.url))
    }
  },
})
