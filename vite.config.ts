import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Increase limit slightly to avoid warnings for vendor chunks that are understandably large
    chunkSizeWarningLimit: 1000, 
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Separate node_modules into stable chunks
          if (id.includes('node_modules')) {
            // Core React stuff
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            // Heavy AI SDK - isolate it so other pages don't load it
            if (id.includes('@google/genai')) {
              return 'vendor-genai';
            }
            // Icon library
            if (id.includes('lucide-react')) {
              return 'vendor-ui';
            }
            // All other vendors
            return 'vendor';
          }
        },
      },
    },
  },
});