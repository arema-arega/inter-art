import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default defineConfig({
  base: '/inter-art/client/', // Update this to match your repository name and structure
  assetsDir: 'assets', // Update this to match your actual assets directory
  plugins: [react()],
  server: {
      proxy: {
          "/api": {
          target: "http://localhost:5000",
          changeOrigin: true,
          secure: false
          },
      },
  },

  build: {
    outDir: 'build',
  },
})