import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/node_modules/three/src/math/') || id.endsWith('/three/src/constants.js')) return 'three-math';
        },
      },
    },
  },
});
