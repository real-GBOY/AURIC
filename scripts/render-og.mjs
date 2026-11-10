// Renders scripts/og/og.html to public/og-image.png (1200x630) with headless Chrome.
//   npm run og
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const candidates = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);
const chrome = candidates.find((p) => existsSync(p));
if (!chrome) throw new Error('Chrome not found. Set CHROME_PATH to your chrome executable.');

const out = `${root}public/og-image.png`;
const page = pathToFileURL(`${root}scripts/og/og.html`).href;
const r = spawnSync(chrome, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', '--window-size=1200,630', '--virtual-time-budget=12000', `--screenshot=${out}`, page], { stdio: 'inherit' });
process.exit(r.status ?? 0);
