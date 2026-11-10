import type { RefObject } from 'react';
import { gsap, MQ, useGSAP } from './gsap';

/**
 * Desktop: pins the section and turns vertical scrolling into horizontal travel
 * through the strip (scrubbed). Phones, tablets and reduced motion keep the
 * native swipe / drag strip.
 */
export function usePinnedStrip(section: RefObject<HTMLElement>, strip: RefObject<HTMLElement>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.desktop, () => {
        const s = strip.current;
        if (!s) return;
        const rtl = document.dir === 'rtl';
        gsap.set(s, { overflow: 'visible', cursor: 'default' });
        const distance = () => Math.max(0, s.scrollWidth - s.clientWidth);
        if (distance() < 40) return;
        gsap.to(s, {
          x: () => (rtl ? distance() : -distance()),
          ease: 'none',
          scrollTrigger: {
            trigger: section.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: section },
  );
}
