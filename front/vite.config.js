import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    // In dev, the contact form's /api calls go to the Express server.
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
