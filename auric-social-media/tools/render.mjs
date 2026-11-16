// Exports every post to PNG (and carousels to a LinkedIn-ready PDF) with headless Chrome.
//   node auric-social-media/tools/render.mjs            all posts
//   node auric-social-media/tools/render.mjs 04 07      only posts whose folder starts with 04 or 07
// Each posts/<NN-name>/post.html holds 1080x1350 slides; extras.html (optional) holds stories and LinkedIn sizes.
// Output: posts/<NN-name>/export/slide-01.png …, carousel.pdf, and extras by their data-name.
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const chrome = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean).find((p) => existsSync(p));
if (!chrome) throw new Error('Chrome not found. Set CHROME_PATH.');

const only = process.argv.slice(2);
const base = ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', '--virtual-time-budget=6000', '--allow-file-access-from-files'];

function sizeOf(cls) {
  if (/\bli\b/.test(cls)) return [1200, 627];
  if (/\bstory\b/.test(cls)) return [1080, 1920];
  if (/\bsq\b/.test(cls)) return [1080, 1080];
  return [1080, 1350];
}

function shoot(file, i, w, h, out) {
  const url = `${pathToFileURL(file).href}?s=${i}`;
  const r = spawnSync(chrome, [...base, `--window-size=${w},${h}`, `--screenshot=${out}`, url], { stdio: 'pipe', timeout: 60000 });
  if (r.status !== 0 || !existsSync(out)) throw new Error(`render failed: ${out}\n${r.stderr}`);
}

// Logo exports (assets/logo/logo-sheet.html → assets/logo/*.png)
if (!only.length || only.includes('logo')) {
  const file = join(root, 'assets/logo/logo-sheet.html');
  const html = readFileSync(file, 'utf8');
  [...html.matchAll(/<section class="slide([^"]*)"([^>]*)>/g)].forEach((m, k) => {
    const name = /data-name="([^"]+)"/.exec(m[2])[1];
    shoot(file, k + 1, 1080, 1080, join(root, `assets/logo/${name}.png`));
    console.log(`logo → assets/logo/${name}.png`);
  });
}

const postsDir = join(root, 'posts');
for (const dir of readdirSync(postsDir).sort()) {
  if (only.length && !only.some((p) => dir.startsWith(p))) continue;
  const folder = join(postsDir, dir);
  const out = join(folder, 'export');
  mkdirSync(out, { recursive: true });
  for (const name of ['post.html', 'extras.html']) {
    const file = join(folder, name);
    if (!existsSync(file)) continue;
    const html = readFileSync(file, 'utf8');
    const slides = [...html.matchAll(/<section class="slide([^"]*)"([^>]*)>/g)];
    slides.forEach((m, k) => {
      const [w, h] = sizeOf(m[1]);
      const named = /data-name="([^"]+)"/.exec(m[2]);
      const png = join(out, named ? `${named[1]}.png` : `slide-${String(k + 1).padStart(2, '0')}.png`);
      shoot(file, k + 1, w, h, png);
      console.log(`${dir}/${name} #${k + 1} → ${png.slice(root.length)}`);
    });
    if (name === 'post.html' && slides.length > 1) {
      const pdf = join(out, 'carousel.pdf');
      spawnSync(chrome, [...base, '--no-pdf-header-footer', `--print-to-pdf=${pdf}`, pathToFileURL(file).href], { stdio: 'pipe', timeout: 60000 });
      console.log(`${dir} → carousel.pdf`);
    }
  }
}
