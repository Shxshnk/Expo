import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
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
