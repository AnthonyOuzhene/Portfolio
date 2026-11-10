import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

const contentDir = fileURLToPath(new URL('../back/src/data', import.meta.url));

// Reloads the browser when site content (back/src/data/*.json) changes,
// once the API has had time to restart with the new data.
function reloadOnContentChange() {
  return {
    name: 'reload-on-content-change',
    apply: 'serve',
    configureServer(server) {
      server.watcher.add(contentDir);
      let timer;
      server.watcher.on('change', (file) => {
        if (!file.startsWith(contentDir)) return;
        clearTimeout(timer);
        timer = setTimeout(() => server.ws.send({ type: 'full-reload' }), 600);
      });
    },
  };
}

export default defineConfig({
  plugins: [vue(), reloadOnContentChange()],
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
