// Language is decided by the URL: /ar and /ar/... are Arabic (right to left), everything else English.
// Every page exists in both languages. Links inside Arabic pages are rewritten to their /ar version
// (see ArabicLinks), so visitors stay in Arabic as they browse.

export type Lang = 'en' | 'ar';

const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';

export const LANG: Lang = /^\/ar(\/|$)/.test(pathname) ? 'ar' : 'en';
export const isAr = LANG === 'ar';

/** The current path without the /ar prefix ("/ar/services" → "/services"). */
export const basePath = pathname.replace(/^\/ar(?=\/|$)/, '').replace(/\/+$/, '') || '/';

/** Pick the string for the current language. */
export const t = <T,>(en: T, ar: T): T => (isAr ? ar : en);

/** Turn an internal path into its Arabic version ("/work#x" → "/ar/work#x"). */
export const toAr = (path: string) => {
  if (!path.startsWith('/') || path.startsWith('//') || /^\/ar(\/|$|\?|#)/.test(path)) return path;
  return path === '/' ? '/ar' : path.replace(/^\/(?=[?#]|$)/, '/ar').replace(/^\/(?!ar(?:[/?#]|$))/, '/ar/');
};

/** Link to the current language's version of an internal page. */
export const href = (path: string) => (isAr ? toAr(path) : path);

/** The same page in the other language. */
export const otherLangHref = () => (isAr ? basePath : toAr(basePath));

/** Arrow that points forward in the reading direction. */
export const ARROW = isAr ? '←' : '→';
