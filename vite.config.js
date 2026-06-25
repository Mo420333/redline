import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// Production builds are served from the /redline/ repo path on GitHub Pages;
// local dev stays at root.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/redline/' : '/',
  plugins: [react(), tailwindcss()],
}))
