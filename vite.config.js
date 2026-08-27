import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@data': path.resolve(__dirname, './src/data'),
    },
  },
  build: {
    chunkSizeWarningLimit: 2500,
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('@excalidraw')) return 'vendor-excalidraw';
            if (id.includes('mermaid')) return 'vendor-mermaid';
            if (id.includes('cytoscape') || id.includes('dagre') || id.includes('d3')) return 'vendor-diagrams';
            if (id.includes('monaco-editor') || id.includes('@monaco-editor')) return 'vendor-monaco';
            if (id.includes('prismjs')) return 'vendor-prism';
            if (id.includes('katex') || id.includes('react-katex')) return 'vendor-katex';
            if (id.includes('xlsx') || id.includes('jspdf') || id.includes('jszip') || id.includes('file-saver')) return 'vendor-docs';
            if (id.includes('fabric') || id.includes('dom-to-image') || id.includes('html-to-image')) return 'vendor-canvas';
            if (id.includes('framer-motion')) return 'vendor-motion';
            if (id.includes('lucide-react') || id.includes('@heroicons')) return 'vendor-icons';
            if (id.includes('react-router') || id.includes('react-router-dom') || id.includes('react-router-hash-link')) return 'vendor-router';
            if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler') || id.includes('react-helmet')) return 'vendor-react-core';
            return 'vendor-misc';
          }
        },
      },
    },
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