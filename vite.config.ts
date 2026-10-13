import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          react: ['react', 'react-dom'],
          motion: ['animejs', 'lenis'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: false,
    host: true,
    watch: {
      ignored: ['**/video/**', '**/videos/**', '**/*.mp4'],
    },
  },
});
