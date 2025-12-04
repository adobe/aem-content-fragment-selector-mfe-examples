import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import basicSsl from '@vitejs/plugin-basic-ssl';

// externals
const externals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  '@aem-sites/content-fragment-selector':
    '',
};

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: Object.keys(externals),
    },
  },
  plugins: [react(), basicSsl()],
  server: {
    port: 8080,
  },
  define: {
    global: {},
  },
  resolve: {
    alias: {
      '@aem-sites/content-fragment-selector':
        externals['@aem-sites/content-fragment-selector'],
    },
  },
});
