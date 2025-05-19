import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  base: '/RecsHaven/', // <-- Set base for GitHub Pages
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    open: true,
    hot: true,
    allowedHosts: [
      '9bba-2401-4900-1cb5-3cc0-7969-9ccc-f71a-19db.ngrok-free.app'
    ]
  },
  build: {
    outDir: './dist',
    emptyOutDir: true
  }
})
