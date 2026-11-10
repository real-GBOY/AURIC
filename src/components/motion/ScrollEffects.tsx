import { useEffect } from 'react';
import { gsap, ScrollTrigger, MQ } from '../../lib/gsap';

/**
 * Scroll-linked effects declared with data attributes, so any section can opt in:
 *
 *   data-parallax="0.15"   moves against the scroll by ±15% of its height (scrubbed)
 *   data-scrub-scale="0.88" grows from 0.88 to 1 as it rises into view
 *   data-scrub-zoom="1.15"  zooms from 1.15 to 1 while it crosses the screen (images)
 *   data-scrub-x="-8"       drifts sideways by -8% while it crosses the screen
 *   data-hero-out           eases up and fades a little as the page scrolls away from it
 *   data-draw               scales from 0 to full width as it crosses (lines, progress bars)
 *
 * Elements carrying these attributes must not also be animated on transform by
 * Framer Motion; put the attribute on a wrapper instead. All effects are off for
 * reduced motion, and parallax / zoom are desktop-and-tablet only.
 */
export default function ScrollEffects() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(MQ.motion, () => {
      const q = <T extends Element = HTMLElement>(sel: string) => gsap.utils.toArray<T>(sel);
      const wide = window.matchMedia('(min-width: 768px)').matches;

      if (wide) {
        q('[data-parallax]').forEach((el) => {
          const s = parseFloat(el.dataset.parallax || '0.12');
          gsap.fromTo(el, { yPercent: -s * 100 }, {
            yPercent: s * 100,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          });
        });

        q('[data-scrub-zoom]').forEach((el) => {
          gsap.fromTo(el, { scale: parseFloat(el.dataset.scrubZoom || '1.15') }, {
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          });
        });
      }

      q('[data-scrub-scale]').forEach((el) => {
        gsap.fromTo(el, { scale: parseFloat(el.dataset.scrubScale || '0.9'), borderRadius: 28 }, {
          scale: 1,
          borderRadius: 12,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'center center', scrub: 0.6 },
        });
      });

      q('[data-scrub-x]').forEach((el) => {
        gsap.fromTo(el, { xPercent: 0 }, {
          xPercent: parseFloat(el.dataset.scrubX || '-8'),
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });

      q('[data-hero-out]').forEach((el) => {
        gsap.to(el, {
          yPercent: -12,
          opacity: 0.35,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
        });
      });

      q('[data-draw]').forEach((el) => {
        gsap.fromTo(el, { scaleX: 0, transformOrigin: document.dir === 'rtl' ? 'right center' : 'left center' }, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 35%', scrub: 0.5 },
        });
      });
    });

    // Fonts and lazy images change the page height; re-measure every scene.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh).catch(() => {});
    window.addEventListener('load', refresh);
    const ro = new ResizeObserver(() => ScrollTrigger.refresh());
    ro.observe(document.body);

    return () => {
      window.removeEventListener('load', refresh);
      ro.disconnect();
      mm.revert();
    };
  }, []);

  return null;
}
