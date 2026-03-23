import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    console.log('***env.back_end_API_URL: '+env.back_end_API_URL+' ***\n');
    return {
      server: {
        port: 3000,
        proxy: {
          '/api': {
            target: env.back_end_API_URL || 'http://localhost:5000',
            changeOrigin: true,
          }
        },
        allowedHosts: [ 
          'matrix-comic-container-candy.trycloudflare.com' 
        ]
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, 'src'),
        }
      }
    };
});
