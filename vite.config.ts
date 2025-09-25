/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  plugins: [react()],
  
  // Vite CSS config goes here
  css: {
    postcss: {
      plugins: [
        autoprefixer(),
        // add other PostCSS plugins if needed
      ],
    },
  },

  // Vitest config
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vite.setup.ts', // ← add this
  },
})
