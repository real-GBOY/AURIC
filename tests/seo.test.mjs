// Checks the built site (run `npm run build` first):  npm test
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const SITE = 'https://auric404.me';

function pages(dir = dist, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) {
      if (name !== 'assets' && name !== 'fonts') pages(p, out);
    } else if (name === 'index.html' || name === '404.html') out.push(p);
  }
  return out;
}
const read = (p) => readFileSync(p, 'utf8');
const tag = (html, re) => (html.match(re) || [])[1];

const files = pages();
const routes = files.filter((f) => !f.endsWith('404.html'));

test('the build produced every page', () => {
  assert.ok(routes.length >= 36, `only ${routes.length} pages`);
  assert.ok(existsSync(join(dist, '404.html')), '404.html missing');
  assert.ok(existsSync(join(dist, 'sitemap.xml')), 'sitemap.xml missing');
});

test('every page has its own title and description', () => {
  const titles = new Set();
  const descs = new Set();
  for (const f of routes) {
    const html = read(f);
    const title = tag(html, /<title>([^<]+)<\/title>/);
    const desc = tag(html, /<meta name="description" content="([^"]+)"/);
    assert.ok(title, `${f}: no title`);
    assert.ok(desc, `${f}: no description`);
    assert.ok(!titles.has(title), `${f}: duplicate title "${title}"`);
    assert.ok(!descs.has(desc), `${f}: duplicate description`);
    titles.add(title);
    descs.add(desc);
  }
});

test('canonical, share tags and language point at the live domain', () => {
  for (const f of routes) {
    const html = read(f);
    assert.match(tag(html, /<link rel="canonical" href="([^"]+)"/) || '', new RegExp('^' + SITE), `${f}: canonical`);
    assert.match(tag(html, /<meta property="og:image" content="([^"]+)"/) || '', new RegExp('^' + SITE), `${f}: og:image`);
    assert.ok(!html.includes('auric-navy.vercel.app'), `${f}: old domain`);
    assert.ok(html.includes('hreflang'), `${f}: hreflang`);
  }
});

test('the 404 page is not indexable', () => {
  assert.match(read(join(dist, '404.html')), /noindex/);
});

test('the sitemap lists every indexable page', () => {
  const xml = read(join(dist, 'sitemap.xml'));
  const count = (xml.match(/<loc>/g) || []).length;
  assert.ok(count >= 36, `sitemap has ${count} entries`);
  assert.ok(xml.includes(`${SITE}/work`), 'missing /work');
});
