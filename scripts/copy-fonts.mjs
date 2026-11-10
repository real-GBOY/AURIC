// Copies the self-hosted web fonts from node_modules into public/fonts (committed).
//   npm run fonts
// Latin subsets for the Latin fonts; Arabic subsets for the Arabic fonts. fonts.css lists them.
import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const out = join(root, 'public/fonts');
mkdirSync(out, { recursive: true });

const FILES = [
  ['@fontsource-variable/unbounded/files/unbounded-latin-wght-normal.woff2', 'unbounded-latin.woff2'],
  ['@fontsource-variable/geist/files/geist-latin-wght-normal.woff2', 'geist-latin.woff2'],
  ['@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2', 'geist-mono-latin.woff2'],
  ['@fontsource/press-start-2p/files/press-start-2p-latin-400-normal.woff2', 'press-start-2p-latin.woff2'],
  ['@fontsource-variable/alexandria/files/alexandria-arabic-wght-normal.woff2', 'alexandria-arabic.woff2'],
  ['@fontsource-variable/alexandria/files/alexandria-latin-wght-normal.woff2', 'alexandria-latin.woff2'],
  ['@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-400-normal.woff2', 'ibm-plex-sans-arabic-arabic-400.woff2'],
  ['@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-500-normal.woff2', 'ibm-plex-sans-arabic-arabic-500.woff2'],
  ['@fontsource/ibm-plex-sans-arabic/files/ibm-plex-sans-arabic-arabic-600-normal.woff2', 'ibm-plex-sans-arabic-arabic-600.woff2'],
];

for (const [from, to] of FILES) copyFileSync(join(root, 'node_modules', from), join(out, to));
console.log(`fonts: ${FILES.length} files → public/fonts`);
