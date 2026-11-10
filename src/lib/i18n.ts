// Language is decided by the URL: /ar and /ar/... are Arabic (right to left), everything else English.
// Only the Home page has an Arabic version so far; other links from Arabic pages go to the English pages.

export type Lang = 'en' | 'ar';

const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';

export const LANG: Lang = /^\/ar(\/|$)/.test(pathname) ? 'ar' : 'en';
export const isAr = LANG === 'ar';

/** Pick the string for the current language. */
export const t = <T,>(en: T, ar: T): T => (isAr ? ar : en);

/** Pages that exist in Arabic. */
const AR_PAGES = new Set(['/']);

/** Link to the Arabic version of a page when it exists, otherwise the English page. */
export const href = (path: string) => {
  if (!isAr) return path;
  const [base, hash] = path.split('#');
  return AR_PAGES.has(base) ? `/ar${base === '/' ? '' : base}${hash ? `#${hash}` : ''}` : path;
};

/** The same page in the other language (falls back to the other language's home). */
export const otherLangHref = () => {
  if (isAr) {
    const rest = pathname.replace(/^\/ar/, '') || '/';
    return rest;
  }
  const base = pathname.replace(/\/+$/, '') || '/';
  return AR_PAGES.has(base) ? `/ar${base === '/' ? '' : base}` : '/ar';
};

/** Arrow that points forward in the reading direction. */
export const ARROW = isAr ? '←' : '→';
