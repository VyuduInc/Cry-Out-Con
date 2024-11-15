import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['three'],
  },
  resolve: {
    alias: {
      'locomotive-scroll': 'locomotive-scroll/dist/locomotive-scroll.modern.js'
    }
  }
});