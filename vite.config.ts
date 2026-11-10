import { copyFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Copies the built index.html to 404.html. Vercel serves 404.html (with a real
 * 404 status) for any path not listed in vercel.json; the app then renders the
 * AURIC 404 page.
 */
const notFoundPage = (): Plugin => ({
  name: 'auric-404-page',
  apply: 'build',
  closeBundle() {
    const index = resolve(__dirname, 'dist/index.html');
    if (existsSync(index)) copyFileSync(index, resolve(__dirname, 'dist/404.html'));
  },
});

export default defineConfig({
  plugins: [react(), notFoundPage()],
});
