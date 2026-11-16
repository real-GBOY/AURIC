// Safe-zone check: renders every slide headlessly and lists any text or logo outside the platform safe zone.
//   node auric-social-media/tools/check.mjs            Instagram (post.html + extras.html) and LinkedIn (?fmt=li)
//   node auric-social-media/tools/check.mjs 04         only post 04
// Zones are defined in assets/brand.js (?check=1) and drawn by ?guides=1.
import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const chrome = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean).find((p) => existsSync(p));
const only = process.argv.slice(2);
let bad = 0;

function check(file, i, w, h, extra) {
  const url = `${pathToFileURL(file).href}?s=${i}&check=1${extra}`;
  const r = spawnSync(chrome, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--virtual-time-budget=6000', '--allow-file-access-from-files', `--window-size=${w},${h}`, '--dump-dom', url], { encoding: 'utf8', timeout: 60000 });
  const m = /<pre id="safe-report">([\s\S]*?)<\/pre>/.exec(r.stdout || '');
  return m ? m[1].replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&gt;/g, '>') : 'NO REPORT';
}

for (const dir of readdirSync(join(root, 'posts')).sort()) {
  if (only.length && !only.some((p) => dir.startsWith(p))) continue;
  for (const name of ['post.html', 'extras.html']) {
    const file = join(root, 'posts', dir, name);
    if (!existsSync(file)) continue;
    const slides = [...readFileSync(file, 'utf8').matchAll(/<section class="slide([^"]*)"/g)];
    const runs = name === 'post.html' ? [['instagram', '', 1080, 1350], ['linkedin', '&fmt=li', 1080, 1080]] : [['extras', '', 0, 0]];
    for (const [label, extra, W, H] of runs) {
      slides.forEach((m, k) => {
        const story = /\bstory\b/.test(m[1]);
        if (label === 'extras' && !story) return;
        const [w, h] = label === 'extras' ? [1080, 1920] : [W, H];
        const rep = check(file, k + 1, w, h, extra);
        if (rep !== 'OK') { bad++; console.log(`✗ ${dir} ${label} #${k + 1}\n  ${rep.split('\n').join('\n  ')}`); }
        else console.log(`✓ ${dir} ${label} #${k + 1}`);
      });
    }
  }
}
console.log(bad ? `\n${bad} slide(s) outside the safe zone` : '\nAll slides inside the safe zones');
process.exit(bad ? 1 : 0);
