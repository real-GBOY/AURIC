import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '../../lib/gsap';

const STACK_MQ = '(min-width: 768px) and (prefers-reduced-motion: no-preference)';

/**
 * Overlapping sections, used sparingly as showpiece moments: a section marked
 * data-stack holds in place once its end reaches the bottom of the screen, and
 * the block after it slides up over it (rounded top, soft shadow) while the held
 * one eases back and dims. Tablet and desktop only; off for reduced motion.
 * Don't mark a section whose next block pins its own sideways strip.
 */
export default function StackSections() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(STACK_MQ, () => {
      let alive = true;
      const ctx = gsap.context(() => {});
      const shown = (el: Element | null): el is HTMLElement =>
        !!el && el instanceof HTMLElement && getComputedStyle(el).display !== 'none' && el.offsetHeight > 0;

      const build = () => {
        if (!alive) return;
        const main = document.querySelector('main');
        const footer = document.querySelector('footer');
        if (!main) return;

        // Top-level blocks in page order (unwrap pin-spacers and plain wrappers like the phone feed).
        const blocks: HTMLElement[] = [];
        for (const child of Array.from(main.children) as HTMLElement[]) {
          if (child.classList.contains('pin-spacer')) blocks.push(child.firstElementChild as HTMLElement);
          else if (child.tagName === 'SECTION' || child.tagName === 'DIV') blocks.push(child);
        }
        if (shown(footer)) blocks.push(footer);
        const visible = blocks.filter(shown);

        ctx.add(() => {
          visible.forEach((el, i) => {
            const next = visible[i + 1];
            if (!next || el === footer || el.dataset.stack === undefined) return;
            if (el.parentElement?.classList.contains('pin-spacer')) return; // already pins its own strip
            if (next.parentElement?.classList.contains('pin-spacer')) return; // a pinned strip can't slide over

            // The incoming block must be opaque and stack above the held one.
            const nextBg = getComputedStyle(next).backgroundColor;
            gsap.set(next, {
              position: 'relative',
              zIndex: 2,
              backgroundColor: nextBg === 'rgba(0, 0, 0, 0)' || nextBg === 'transparent' ? '#0a0a0b' : nextBg,
              borderTopLeftRadius: 32,
              borderTopRightRadius: 32,
              boxShadow: '0 -28px 60px rgba(0,0,0,.45)',
            });
            const elBg = getComputedStyle(el).backgroundColor;
            if (elBg === 'rgba(0, 0, 0, 0)' || elBg === 'transparent') gsap.set(el, { backgroundColor: '#0a0a0b' });

            const tall = el.offsetHeight > window.innerHeight;
            const cover = () => Math.min(next.offsetHeight, window.innerHeight);

            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: el,
                start: tall ? 'bottom bottom' : 'top top',
                end: () => `+=${cover()}`,
                pin: true,
                pinSpacing: false,
                scrub: true,
                invalidateOnRefresh: true,
              },
            });
            tl.to(el, { scale: 0.93, opacity: 0.35, borderRadius: 32, transformOrigin: '50% 100%', ease: 'none' });
          });
        });

        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      };

      // Wait for fonts and the page's own pins (strips) so measurements are final.
      const run = () => requestAnimationFrame(() => requestAnimationFrame(build));
      document.fonts?.ready.then(run).catch(run) ?? run();

      return () => {
        alive = false;
        ctx.revert();
      };
    });

    return () => mm.revert();
  }, []);

  return null;
}
