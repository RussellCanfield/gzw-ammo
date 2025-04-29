import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { federation } from '@module-federation/vite';
import { resolve } from 'path';
import { dependencies } from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? 'https://gzw-ammo-analyzer-remote.pages.dev/' : '',
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'ammo_analyzer',
      manifest: true,
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App.tsx',
      },
      shared: {
        react: {
          requiredVersion: dependencies.react,
          singleton: true,
        },
        "react-dom": {
          requiredVersion: dependencies['react-dom'],
          singleton: true,
        }
      },
    }),
  ],
  build: {
    target: 'chrome89',
    outDir: 'dist-module',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        app: resolve(__dirname, 'src/App.tsx'),
      }
    }
  }
})