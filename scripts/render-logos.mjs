// Renders the client logo lockups in scripts/logos/logos.html to transparent PNGs in public/clients/.
//   npm run logos
// Each element with class "lockup" becomes public/clients/<id>.png, at 3x for sharp edges.
import { spawn } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const chrome = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean).find((p) => existsSync(p));
if (!chrome) throw new Error('Chrome not found. Set CHROME_PATH.');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const port = 9361;
const proc = spawn(chrome, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${join(tmpdir(), 'auric-logos-profile')}`, '--allow-file-access-from-files', '--hide-scrollbars', '--disable-gpu', 'about:blank'], { stdio: 'ignore' });

try {
  let page;
  for (let i = 0; i < 50 && !page; i++) {
    try { page = (await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find((t) => t.type === 'page'); } catch { /* starting */ }
    if (!page) await sleep(200);
  }
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 0;
  const pending = new Map();
  const events = new Map();
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (m.id) { pending.get(m.id)?.(m); pending.delete(m.id); } else events.get(m.method)?.();
  };
  const send = (method, params = {}) => new Promise((res, rej) => { const i2 = ++id; pending.set(i2, (m) => (m.error ? rej(new Error(m.error.message)) : res(m.result))); ws.send(JSON.stringify({ id: i2, method, params })); });

  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1400, height: 900, deviceScaleFactor: 3, mobile: false });
  await send('Emulation.setDefaultBackgroundColorOverride', { color: { r: 0, g: 0, b: 0, a: 0 } });
  const loaded = new Promise((r) => events.set('Page.loadEventFired', r));
  await send('Page.navigate', { url: pathToFileURL(join(root, 'scripts/logos/logos.html')).href });
  await loaded;
  await send('Runtime.evaluate', { expression: 'window.ready', awaitPromise: true });
  const { result } = await send('Runtime.evaluate', {
    expression: 'JSON.stringify([...document.querySelectorAll(".lockup")].map(e => { const r = e.getBoundingClientRect(); return { id: e.id, x: r.x, y: r.y, w: r.width, h: r.height }; }))',
    returnByValue: true,
  });
  const out = join(root, 'public/clients');
  mkdirSync(out, { recursive: true });
  for (const b of JSON.parse(result.value)) {
    const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { x: b.x, y: b.y, width: b.w, height: b.h, scale: 1 } });
    writeFileSync(join(out, `${b.id}.png`), Buffer.from(shot.data, 'base64'));
    console.log(`clients/${b.id}.png  ${Math.round(b.w * 3)}x${Math.round(b.h * 3)}`);
  }
  ws.close();
} finally {
  proc.kill();
}
