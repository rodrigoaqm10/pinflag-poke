import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/pinflag-poke/', // <-- usa /<tu-repo>/
  test: { environment: 'jsdom', setupFiles: './vitest.setup.js' }
})
