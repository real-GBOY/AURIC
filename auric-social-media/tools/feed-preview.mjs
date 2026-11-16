// Builds feed-preview.png: the 12 covers as the Instagram profile grid shows them
// (newest first, three columns, each 4:5 post cropped to the 3:4 grid tile).
//   node auric-social-media/tools/feed-preview.mjs
import { createRequire } from 'node:module';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const sharp = createRequire(join(root, '../package.json'))('sharp');

const W = 360, H = 480, GAP = 6;                         // 3:4 tile
const posts = readdirSync(join(root, 'posts')).sort().reverse();   // newest (12) first
const tiles = await Promise.all(posts.map(async (p, i) => {
  // 1080x1350 → 3:4 centre crop = 1012x1350
  const input = await sharp(join(root, 'posts', p, 'export', 'slide-01.png'))
    .extract({ left: 34, top: 0, width: 1012, height: 1350 }).resize(W, H).toBuffer();
  return { input, left: (i % 3) * (W + GAP), top: Math.floor(i / 3) * (H + GAP) };
}));
const rows = Math.ceil(posts.length / 3);
await sharp({ create: { width: W * 3 + GAP * 2, height: H * rows + GAP * (rows - 1), channels: 3, background: '#ffffff' } })
  .composite(tiles).png().toFile(join(root, 'feed-preview.png'));
console.log('feed-preview.png');
