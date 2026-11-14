import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { SOFTWARE } from './src/lib/projects';
import { CREATIVE_PROJECTS } from './src/lib/creative';
import { NOT_FOUND, PAGES, SITE, headTags, projectMeta, urlFor, type Lang, type Meta } from './src/lib/seo';

/** Pages that exist but should stay out of search results (none right now). */
const NOINDEX = new Set<string>();

const LANGS: Lang[] = ['en', 'ar'];
const projectByPath = new Map(SOFTWARE.map((p) => [`/work/${p.slug}`, p]));
const creativeByPath = new Map(CREATIVE_PROJECTS.map((p) => [`/work/${p.slug}`, p]));
/** Every real page path (without the /ar prefix). */
const PATHS = [...Object.keys(PAGES), ...projectByPath.keys(), ...creativeByPath.keys()];

const metaOf = (path: string, lang: Lang): Meta => {
  const page = PAGES[path];
  if (page) return page[lang];
  const creative = creativeByPath.get(path);
  if (creative) return creative.meta[lang];
  const project = projectByPath.get(path);
  return project ? projectMeta(project.name, project.line, lang) : PAGES['/'][lang];
};

const START = '<!--seo:start-->';
const END = '<!--seo:end-->';
const withTags = (html: string, tags: string) => {
  const a = html.indexOf(START);
  const b = html.indexOf(END);
  return a < 0 || b < 0 ? html : `${html.slice(0, a)}${START}\n    ${tags}\n    ${END}${html.slice(b + END.length)}`;
};

/**
 * SEO at build time. The app is a single-page app, but crawlers and link-preview bots
 * (WhatsApp, LinkedIn, X) read the raw HTML, so each route gets its own HTML file with
 * the right title, description, canonical, hreflang, share tags and structured data.
 * Also writes sitemap.xml and the 404 page (served with a real 404 status by Vercel).
 */
const seo = (): Plugin => ({
  name: 'auric-seo',
  // Dev server and build: fill the marker for the page being requested.
  transformIndexHtml: {
    order: 'pre',
    handler(html, ctx) {
      const url = (ctx.originalUrl || '/').split('?')[0].replace(/\/+$/, '') || '/';
      const lang: Lang = /^\/ar(\/|$)/.test(url) ? 'ar' : 'en';
      const path = url.replace(/^\/ar/, '') || '/';
      const known = PATHS.includes(path) ? path : '/';
      return withTags(html, headTags(known, lang, metaOf(known, lang), { noindex: NOINDEX.has(known) }));
    },
  },
  closeBundle() {
    const dist = resolve(__dirname, 'dist');
    const indexFile = resolve(dist, 'index.html');
    if (!existsSync(indexFile)) return;
    const base = readFileSync(indexFile, 'utf-8');
    const write = (file: string, html: string) => {
      mkdirSync(dirname(file), { recursive: true });
      writeFileSync(file, html);
    };

    for (const lang of LANGS) {
      for (const path of PATHS) {
        let html = withTags(base, headTags(path, lang, metaOf(path, lang), { noindex: NOINDEX.has(path) }));
        if (lang === 'ar') html = html.replace('<html lang="en">', '<html lang="ar" dir="rtl">');
        const dir = lang === 'ar' ? resolve(dist, 'ar', path === '/' ? '' : path.slice(1)) : path === '/' ? dist : resolve(dist, path.slice(1));
        write(resolve(dir, 'index.html'), html);
      }
    }

    // 404: same app shell, marked noindex.
    const notFound = headTags('/', 'en', NOT_FOUND.en, { noindex: true })
      .split(/\r?\n/)
      .filter((line) => !/rel="(canonical|alternate)"|og:url|og:locale/.test(line))
      .join(String.fromCharCode(10));
    write(resolve(dist, '404.html'), withTags(base, notFound));

    // Sitemap with language alternates.
    const urls = PATHS.filter((p) => !NOINDEX.has(p));
    const entry = (path: string, lang: Lang) =>
      `  <url>\n    <loc>${urlFor(path, lang)}</loc>\n` +
      LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${urlFor(path, l)}"/>`).join('\n') +
      `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${urlFor(path, 'en')}"/>\n  </url>`;
    const sitemap =
      '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
      LANGS.flatMap((l) => urls.map((p) => entry(p, l))).join('\n') +
      '\n</urlset>\n';
    write(resolve(dist, 'sitemap.xml'), sitemap);
    if (!existsSync(resolve(dist, 'robots.txt'))) copyFileSync(resolve(__dirname, 'public/robots.txt'), resolve(dist, 'robots.txt'));
    console.log(`[auric-seo] ${PATHS.length * LANGS.length} pages, ${urls.length * LANGS.length} in sitemap (${SITE})`);
  },
});

export default defineConfig({
  plugins: [react(), seo()],
});
