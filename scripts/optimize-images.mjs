// Makes responsive WebP copies of every project screenshot, and the app icons.
//   npm run images
// For public/work/<project>/<name>.png|jpg it writes <name>-800.webp and <name>-1600.webp next to it
// (never upscaling). The originals stay as the fallback. Safe to re-run: files already newer than
// their source are skipped. Commit the generated files.
import { existsSync, readdirSync, statSync } from 'node:fs';
import { join, extname, basename } from 'node:path';
import sharp from 'sharp';

const ROOT = new URL('../public/work/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const PUBLIC = new URL('../public/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const WIDTHS = [800, 1600];

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]));

let made = 0;
let before = 0;
let after = 0;
for (const file of walk(ROOT)) {
  const ext = extname(file).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;
  const stem = file.slice(0, -ext.length);
  const meta = await sharp(file).metadata();
  before += statSync(file).size;
  for (const w of WIDTHS) {
    const out = `${stem}-${w}.webp`;
    const width = Math.min(w, meta.width ?? w);
    if (!existsSync(out) || statSync(out).mtimeMs < statSync(file).mtimeMs) {
      await sharp(file).resize({ width, withoutEnlargement: true }).webp({ quality: 80, effort: 5 }).toFile(out);
      made++;
    }
    if (w === 1600) after += statSync(out).size;
  }
}
console.log(`images: ${made} written · originals ${(before / 1048576).toFixed(1)} MB → largest WebP set ${(after / 1048576).toFixed(1)} MB`);

// App icons from the favicon
const svg = join(PUBLIC, 'favicon.svg');
await sharp(svg, { density: 512 }).resize(180, 180).png().toFile(join(PUBLIC, 'apple-touch-icon.png'));
console.log(`icons: ${basename(join(PUBLIC, 'apple-touch-icon.png'))}`);
