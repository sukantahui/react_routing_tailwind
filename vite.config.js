import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // 👈 needed for resolve.alias

export default defineConfig({
  base: '/', // 🔁 Replace with your folder name in WAMP
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),       // points to project-root/assets
      '@data': path.resolve(__dirname, './src/data'), // optional, for data
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // default is 500 KB
  },
  optimizeDeps: {
    exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/core', '@ffmpeg/util'],
  },
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
});