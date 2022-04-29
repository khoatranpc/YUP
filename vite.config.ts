import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [tsconfigPaths(), react()],
    server: {
      port: +process.env.VITE_PORT,
      proxy: {
        '/api': {
          target: process.env.VITE_BACKEND_API_ENDPOINT,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  });
};
