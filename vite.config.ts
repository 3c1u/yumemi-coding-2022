/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': `${__dirname}/src`,
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: 'src/vitest.setup.ts',
  },
})
