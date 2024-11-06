import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/apiip': {
        target: 'https://apiip.net',
        changeOrigin: true,
        secure: false,  // You might want to set this to true if the target uses SSL correctly
        logLevel: 'debug',  // Add this to see detailed proxy logs
      },
    },
  },
});
