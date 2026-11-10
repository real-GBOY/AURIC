import { useLayoutEffect, type RefObject } from 'react';

/**
 * Shrinks a headline's font size so its widest line fits the element's width.
 * Lines are elements matching `lineSelector` inside the element, laid out as
 * nowrap inline-blocks so their natural width can be measured. The font size
 * set in CSS/props stays the maximum; it is only ever reduced.
 */
export function useFitText<T extends HTMLElement>(ref: RefObject<T>, lineSelector = '[data-fit-line]') {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const original = el.style.fontSize;

    const fit = () => {
      el.style.fontSize = original;
      const lines = el.querySelectorAll<HTMLElement>(lineSelector);
      const targets = lines.length ? Array.from(lines) : [el];
      const widest = Math.max(...targets.map((n) => n.scrollWidth));
      const avail = el.clientWidth;
      if (avail > 0 && widest > avail) {
        const px = parseFloat(getComputedStyle(el).fontSize);
        el.style.fontSize = `${Math.floor(px * (avail / widest) * 0.98)}px`;
      }
    };

    fit();
    const ro = new ResizeObserver(() => fit());
    if (el.parentElement) ro.observe(el.parentElement);
    document.fonts?.ready.then(fit).catch(() => {});
    return () => ro.disconnect();
  }, [ref, lineSelector]);
}
