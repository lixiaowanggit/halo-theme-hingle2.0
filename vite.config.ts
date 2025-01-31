import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';
import UnoCSS from 'unocss/vite';
import unocssConfig from './uno.config';

export default defineConfig({
  plugins: [
    UnoCSS({
      ...unocssConfig,
      inspector: true,
      mode: 'global',
    }),
  ],
  build: {
    outDir: fileURLToPath(new URL('./templates/assets/dist', import.meta.url)),
    emptyOutDir: true,
    lib: {
      formats: ['iife'],
      entry: path.resolve(__dirname, 'src/main.ts'),
      name: 'main',
      fileName: 'main',
    },
    rollupOptions: {
      output: {
        assetFileNames: 'main.[ext]', // 确保 CSS 文件名为 main.css
      },
    },
  },
});
