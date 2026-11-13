// Renders scripts/reel/reel.html into the showreel videos, frame by frame, with headless Chrome
// and ffmpeg (both must be installed; set CHROME_PATH / FFMPEG_PATH if they are not found).
//   npm run reel              -> both cuts
//   npm run reel -- wide      -> public/media/showreel.mp4 (+ poster)
//   npm run reel -- tall      -> public/media/showreel-vertical.mp4 (+ poster)
// Every frame is captured at an exact timestamp (no real-time playback), so renders are identical.
import { spawn, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync, writeFileSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const FPS = 30;
const CUTS = {
  // poster = the second at which the poster frame is taken
  wide: { w: 1920, h: 824, out: 'showreel', crf: 26, poster: 31.0 }, // the end card
  tall: { w: 1080, h: 1350, out: 'showreel-vertical', crf: 27, poster: 22.0 }, // the phones shot: caption at the top, clear of page headlines laid over it
};

const chrome = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean).find((p) => existsSync(p));
if (!chrome) throw new Error('Chrome not found. Set CHROME_PATH.');
const ffmpeg = process.env.FFMPEG_PATH || 'ffmpeg';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function cdpConnect(port) {
  for (let i = 0; i < 50; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
      const page = list.find((t) => t.type === 'page');
      if (page) {
        const ws = new WebSocket(page.webSocketDebuggerUrl);
        await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
        let id = 0;
        const pending = new Map();
        const listeners = new Map();
        ws.onmessage = (e) => {
          const m = JSON.parse(e.data);
          if (m.id && pending.has(m.id)) {
            const { res, rej } = pending.get(m.id);
            pending.delete(m.id);
            m.error ? rej(new Error(m.error.message)) : res(m.result);
          } else if (m.method && listeners.has(m.method)) listeners.get(m.method)(m.params);
        };
        const send = (method, params = {}) => new Promise((res, rej) => { const i2 = ++id; pending.set(i2, { res, rej }); ws.send(JSON.stringify({ id: i2, method, params })); });
        const once = (method) => new Promise((res) => listeners.set(method, (p) => { listeners.delete(method); res(p); }));
        return { send, once, close: () => ws.close() };
      }
    } catch { /* not up yet */ }
    await sleep(200);
  }
  throw new Error('Could not connect to Chrome DevTools.');
}

async function renderCut(name) {
  const cut = CUTS[name];
  const frames = join(tmpdir(), `auric-reel-${name}`);
  rmSync(frames, { recursive: true, force: true });
  mkdirSync(frames, { recursive: true });
  const profile = join(tmpdir(), `auric-reel-profile-${name}`);
  const port = name === 'wide' ? 9351 : 9352;
  const proc = spawn(chrome, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, '--allow-file-access-from-files', '--hide-scrollbars', '--force-device-scale-factor=1', '--disable-gpu', `--window-size=${cut.w},${cut.h}`, 'about:blank'], { stdio: 'ignore' });
  try {
    const cdp = await cdpConnect(port);
    await cdp.send('Page.enable');
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: cut.w, height: cut.h, deviceScaleFactor: 1, mobile: false });
    const loaded = cdp.once('Page.loadEventFired');
    await cdp.send('Page.navigate', { url: `${pathToFileURL(join(root, 'scripts/reel/reel.html')).href}?layout=${name}` });
    await loaded;
    const ready = await cdp.send('Runtime.evaluate', { expression: 'window.ready', awaitPromise: true, returnByValue: true });
    const missing = ready.result.value || [];
    if (missing.length) throw new Error(`Images failed to load: ${missing.join(', ')}`);
    // Stills mode (for checking the composition): REEL_STILLS="1.2,6,14" writes PNGs to REEL_STILLS_DIR and stops.
    if (process.env.REEL_STILLS) {
      const dir = process.env.REEL_STILLS_DIR || frames;
      mkdirSync(dir, { recursive: true });
      for (const t of process.env.REEL_STILLS.split(',').map(Number)) {
        await cdp.send('Runtime.evaluate', { expression: `seek(${t})` });
        const shot = await cdp.send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: cut.w, height: cut.h, scale: 1 } });
        writeFileSync(join(dir, `${name}-${t.toFixed(1)}.png`), Buffer.from(shot.data, 'base64'));
      }
      cdp.close();
      console.log(`stills written to ${dir}`);
      return;
    }
    const { result } = await cdp.send('Runtime.evaluate', { expression: 'window.DURATION', returnByValue: true });
    const total = Math.round(result.value * FPS);
    const t0 = Date.now();
    for (let f = 0; f < total; f++) {
      await cdp.send('Runtime.evaluate', { expression: `seek(${(f / FPS).toFixed(5)})` });
      const shot = await cdp.send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: cut.w, height: cut.h, scale: 1 } });
      writeFileSync(join(frames, `${String(f).padStart(5, '0')}.png`), Buffer.from(shot.data, 'base64'));
      if (f % 90 === 0) process.stdout.write(`  ${name}: frame ${f}/${total} (${((Date.now() - t0) / 1000).toFixed(0)}s)\n`);
    }
    cdp.close();
  } finally {
    proc.kill();
  }

  const outDir = join(root, 'public/media');
  mkdirSync(outDir, { recursive: true });
  const mp4 = join(outDir, `${cut.out}.mp4`);
  const enc = spawnSync(ffmpeg, ['-y', '-loglevel', 'error', '-framerate', String(FPS), '-i', join(frames, '%05d.png'), '-c:v', 'libx264', '-preset', 'slow', '-crf', String(cut.crf), '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-an', mp4], { stdio: 'inherit' });
  if (enc.status !== 0) throw new Error('ffmpeg encode failed');
  // Poster: a strong frame (shown before the video plays and for reduced motion).
  const poster = join(outDir, `${cut.out}-poster.webp`);
  const pf = String(Math.round(cut.poster * FPS)).padStart(5, '0');
  spawnSync(ffmpeg, ['-y', '-loglevel', 'error', '-i', join(frames, `${pf}.png`), '-q:v', '82', poster], { stdio: 'inherit' });
  rmSync(frames, { recursive: true, force: true });
  console.log(`${name}: ${mp4} ${(statSync(mp4).size / 1048576).toFixed(2)} MB, poster ${(statSync(poster).size / 1024).toFixed(0)} KB`);
}

const which = process.argv[2];
for (const name of which ? [which] : Object.keys(CUTS)) await renderCut(name);
