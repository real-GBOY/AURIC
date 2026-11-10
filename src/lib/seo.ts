// SEO source of truth: titles, descriptions and the helpers that build <head> tags.
// Used twice: at build time (vite.config.ts writes a real HTML file per route, so crawlers and
// link-preview bots see the right tags without running JavaScript) and in the browser
// (setPageMeta keeps the tags right during development and for client-side changes).
// No browser APIs at module level: this file is also imported by Node.

import { CONTACT, SOCIALS } from './site';
export const SITE = 'https://auric404.me';
export const SITE_NAME = 'AURIC';
export const OG_IMAGE = `${SITE}/og-image.png`;

export type Lang = 'en' | 'ar';
export type Meta = { title: string; description: string };

type Pair = { en: Meta; ar: Meta };

/** Static pages, keyed by path without the /ar prefix. */
export const PAGES: Record<string, Pair> = {
  '/': {
    en: {
      title: 'AURIC — Your Digital Partner',
      description:
        'AURIC is your digital partner: video, design, strategy, websites and apps from one team with one point of contact.',
    },
    ar: {
      title: 'أوريك — شريكك الرقمي',
      description: 'أوريك شريكك الرقمي: فيديو وتصميم واستراتيجية ومواقع وتطبيقات من فريق واحد ونقطة تواصل واحدة.',
    },
  },
  '/services': {
    en: {
      title: 'Services — Create, Strategy, Build, Manage | AURIC',
      description:
        'Four divisions planned together: Create (video, design, motion, voice), Strategy, Build (websites, apps, AI) and Manage. One partner for the whole project.',
    },
    ar: {
      title: 'الخدمات — إبداع، استراتيجية، تطوير، إدارة | أوريك',
      description: 'أربعة أقسام تُخطَّط معًا: إبداع (فيديو وتصميم وموشن وصوت) واستراتيجية وتطوير (مواقع وتطبيقات وذكاء اصطناعي) وإدارة.',
    },
  },
  '/work': {
    en: {
      title: 'Work — Video, Design, Content and Digital Products | AURIC',
      description:
        'Selected AURIC work: video and motion, design and branding, content and social, websites and apps. Made by one team.',
    },
    ar: {
      title: 'الأعمال — فيديو وتصميم ومحتوى ومنتجات رقمية | أوريك',
      description: 'أعمال مختارة من أوريك: فيديو وموشن، تصميم وهوية، محتوى وسوشيال، مواقع وتطبيقات. من فريق واحد.',
    },
  },
  '/case-studies': {
    en: {
      title: 'Case Studies — How Our Projects Came Together | AURIC',
      description: 'The story behind each AURIC project: the goal, what we made and how it came together.',
    },
    ar: {
      title: 'دراسات الحالة — كيف اكتملت مشاريعنا | أوريك',
      description: 'القصة وراء كل مشروع من أوريك: الهدف، وما صنعناه، وكيف اكتمل.',
    },
  },
  '/case-studies/creative': {
    en: {
      title: 'Creative Case Study Template | AURIC',
      description: 'The layout AURIC uses for creative case studies: film, concept, frames, brand in use and credits.',
    },
    ar: {
      title: 'قالب دراسة حالة إبداعية | أوريك',
      description: 'التصميم الذي تستخدمه أوريك لدراسات الحالة الإبداعية: الفيلم والمفهوم واللقطات والعلامة في الاستخدام.',
    },
  },
  '/team': {
    en: {
      title: 'Team — The People Behind AURIC',
      description:
        'Designers, editors, strategists and engineers working as one team, so your project has one owner. Led by founder Mahmoud Nayel.',
    },
    ar: {
      title: 'الفريق — الناس وراء أوريك',
      description: 'مصممون ومحررون واستراتيجيون ومهندسون يعملون كفريق واحد ليكون لمشروعك مسؤول واحد. بقيادة المؤسس محمود نايل.',
    },
  },
  '/contact': {
    en: {
      title: 'Start a Project — Contact AURIC',
      description:
        'Tell AURIC about your project in two minutes. Only your name and email are required; we reply with a call link and a first plan.',
    },
    ar: {
      title: 'ابدأ مشروعك — تواصل مع أوريك',
      description: 'أخبر أوريك عن مشروعك في دقيقتين. الاسم والبريد فقط مطلوبان، ونرد برابط مكالمة وخطة أولى.',
    },
  },
};

/** Meta for one project's case study page. */
export const projectMeta = (name: string, line: string, lang: Lang): Meta =>
  lang === 'ar'
    ? { title: `${name} — دراسة حالة | أوريك`, description: `دراسة حالة مشروع ${name} من أوريك.` }
    : { title: `${name} — Case Study | AURIC`, description: `${name}: ${line}` };

export const NOT_FOUND: Pair = {
  en: { title: 'Page not found | AURIC', description: "This page doesn't exist. Your next project still can." },
  ar: { title: 'الصفحة غير موجودة | أوريك', description: 'هذه الصفحة غير موجودة. لكن مشروعك القادم يمكن أن يوجد.' },
};

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** Absolute URL of a page ("/work", "en") → https://auric404.me/work, ("/work", "ar") → .../ar/work. */
export const urlFor = (path: string, lang: Lang) => {
  const base = path === '/' ? '' : path;
  return lang === 'ar' ? `${SITE}/ar${base}` : `${SITE}${base || '/'}`;
};

/** Breadcrumb trail for inner pages. */
const crumbs = (path: string, lang: Lang, title: string) => {
  const items = [{ name: lang === 'ar' ? 'أوريك' : 'AURIC', url: urlFor('/', lang) }];
  if (path === '/') return items;
  const parts = path.split('/').filter(Boolean);
  if (parts[0] === 'work' && parts[1]) items.push({ name: lang === 'ar' ? 'الأعمال' : 'Work', url: urlFor('/work', lang) });
  if (parts[0] === 'case-studies' && parts[1]) items.push({ name: lang === 'ar' ? 'دراسات الحالة' : 'Case studies', url: urlFor('/case-studies', lang) });
  items.push({ name: title.split(/ [—|] /)[0], url: urlFor(path, lang) });
  return items;
};

/** Structured data (JSON-LD) for a page. */
export const jsonLd = (path: string, lang: Lang, meta: Meta) => {
  const graph: Record<string, unknown>[] = [];
  if (path === '/') {
    graph.push(
      {
        '@type': 'Organization',
        '@id': `${SITE}/#organization`,
        name: SITE_NAME,
        url: SITE,
        logo: `${SITE}/favicon.svg`,
        description: PAGES['/'].en.description,
        founder: { '@type': 'Person', name: 'Mahmoud Nayel' },
        email: CONTACT.email,
        telephone: `+${CONTACT.whatsapp}`,
        address: { '@type': 'PostalAddress', addressLocality: 'New Maadi, Cairo', addressCountry: 'EG' },
        sameAs: SOCIALS.map((x) => x.href),
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE}/#website`,
        url: SITE,
        name: SITE_NAME,
        inLanguage: ['en', 'ar'],
        publisher: { '@id': `${SITE}/#organization` },
      },
    );
  } else {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: crumbs(path, lang, meta.title).map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url })),
    });
    if (path.startsWith('/work/')) {
      graph.push({
        '@type': 'CreativeWork',
        name: meta.title.split(/ [—|] /)[0],
        description: meta.description,
        url: urlFor(path, lang),
        inLanguage: lang,
        creator: { '@id': `${SITE}/#organization` },
      });
    }
  }
  return { '@context': 'https://schema.org', '@graph': graph };
};

/** The full set of SEO tags for the <head>, as an HTML string (used at build time). */
export const headTags = (path: string, lang: Lang, meta: Meta, opts: { noindex?: boolean } = {}) => {
  const url = urlFor(path, lang);
  const locale = lang === 'ar' ? 'ar_AR' : 'en_US';
  const alt = lang === 'ar' ? 'en_US' : 'ar_AR';
  const lines = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    opts.noindex ? '<meta name="robots" content="noindex" />' : '<meta name="robots" content="index, follow, max-image-preview:large" />',
    `<link rel="canonical" href="${url}" />`,
    `<link rel="alternate" hreflang="en" href="${urlFor(path, 'en')}" />`,
    `<link rel="alternate" hreflang="ar" href="${urlFor(path, 'ar')}" />`,
    `<link rel="alternate" hreflang="x-default" href="${urlFor(path, 'en')}" />`,
    '<meta property="og:type" content="website" />',
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    `<meta property="og:image:alt" content="AURIC — Your idea planned, built, launched." />`,
    `<meta property="og:locale" content="${locale}" />`,
    `<meta property="og:locale:alternate" content="${alt}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
  ];
  if (!opts.noindex) lines.push(`<script type="application/ld+json">${JSON.stringify(jsonLd(path, lang, meta)).replace(/</g, '\\u003c')}</script>`);
  return lines.join('\n    ');
};

/** Browser side: keep the tags in sync with the current page. */
export const setPageMeta = (path: string, lang: Lang, meta: Meta) => {
  if (typeof document === 'undefined') return;
  document.title = meta.title;
  const set = (sel: string, attr: string, value: string) => {
    const el = document.head.querySelector(sel);
    if (el) el.setAttribute(attr, value);
  };
  const url = urlFor(path, lang);
  set('meta[name="description"]', 'content', meta.description);
  set('link[rel="canonical"]', 'href', url);
  set('meta[property="og:title"]', 'content', meta.title);
  set('meta[property="og:description"]', 'content', meta.description);
  set('meta[property="og:url"]', 'content', url);
  set('meta[name="twitter:title"]', 'content', meta.title);
  set('meta[name="twitter:description"]', 'content', meta.description);
};
