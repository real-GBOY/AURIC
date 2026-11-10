import { useEffect } from 'react';
import { isAr, toAr } from '../lib/i18n';

/**
 * On Arabic pages, points every internal link at its /ar version — including
 * links rendered later (filters, accordions) — so visitors stay in Arabic.
 * The EN switch is marked hreflang="en" and left alone.
 */
export default function ArabicLinks() {
  useEffect(() => {
    if (!isAr) return;
    const fix = (root: ParentNode) => {
      root.querySelectorAll<HTMLAnchorElement>('a[href^="/"]:not([hreflang="en"])').forEach((a) => {
        const h = a.getAttribute('href')!;
        const next = toAr(h);
        if (next !== h) a.setAttribute('href', next);
      });
    };
    fix(document);
    const mo = new MutationObserver((records) => {
      for (const r of records) {
        if (r.type === 'attributes' && r.target instanceof HTMLAnchorElement) fix(r.target.parentNode ?? document);
        r.addedNodes.forEach((n) => n instanceof Element && fix(n.parentNode ?? n));
      }
    });
    mo.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['href'] });
    return () => mo.disconnect();
  }, []);
  return null;
}
