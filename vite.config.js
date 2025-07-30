import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/cnat/', // 🔁 Replace with your folder name in WAMP
  plugins: [react()],
});