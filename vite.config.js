import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // 🔁 Replace with your folder name in WAMP
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // default is 500 KB
  },
});