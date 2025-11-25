import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    base: './', // important so paths work correctly in built files
    server: {
      port: 5173, // local dev server
      host: '0.0.0.0',
    },
    build: {
      outDir: 'dist', // matches server.js static serving
      assetsDir: 'assets', // optional, Vite will put images, fonts here
      sourcemap: false,
    },
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // point '@' to src folder
      },
    },
  };
});
