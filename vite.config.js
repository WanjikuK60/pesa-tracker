import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves the site at /<repo-name>/, so assets need this prefix.
  base: '/pesa-tracker/',
})
