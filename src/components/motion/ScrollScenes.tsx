import { useEffect } from 'react';
import { gsap, ScrollTrigger, SplitText, MQ, whenFontsReady } from '../../lib/gsap';

/**
 * Site-wide creative scroll animations (they find their targets themselves):
 *
 *  • Section headings (h2.h2, [data-split])  letters flip up out of word masks
 *  • Media (.frame screens, .ph slots)         clip-wipe reveal, image settles from a zoom
 *  • Big numbers (.num-xl)                     scramble through digits, then land
 *  • [data-scrub-words]                        statement text lights up word by word as you scroll
 *  • [data-expand]                             section grows from an inset card to full-bleed
 *  • [data-pop] > *                            children pop in one after another
 *  • [data-tilt]                               3D tilt that follows the mouse (desktop)
 *
 * Arabic headings split by word so letters stay joined. Everything is skipped for
 * reduced motion. Elements already on screen at load are left alone (the hero has
 * its own entrance), and anything inside the page-transition curtain is ignored.
 */
export default function ScrollScenes() {
  useEffect(() => {
    const mm = gsap.matchMedia();
    const rtl = document.dir === 'rtl';

    mm.add(MQ.motion, () => {
      let alive = true;
      const ctx = gsap.context(() => {});
      const below = (el: Element) => el.getBoundingClientRect().top > window.innerHeight * 0.92;
      const visible = (el: Element) => (el as HTMLElement).offsetParent !== null || getComputedStyle(el).position === 'fixed';
      const skip = (el: Element) => !!el.closest('[aria-hidden="true"], [class*="z-[200]"], h1');

      const build = () => {
        if (!alive) return;
        ctx.add(() => {
          // 1 · Headings: letters flip up out of their word masks
          gsap.utils.toArray<HTMLElement>('h2.h2, [data-split]').forEach((el) => {
            if (skip(el) || !visible(el) || !below(el) || el.querySelector('[data-fit-line]')) return;
            const split = SplitText.create(el, { type: rtl ? 'words' : 'words,chars', mask: 'words' });
            gsap.from(rtl ? split.words : split.chars, {
              yPercent: 115,
              rotate: rtl ? 0 : 8,
              opacity: 0,
              duration: 1,
              ease: 'expo.out',
              stagger: rtl ? 0.06 : 0.022,
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            });
          });

          // 2 · Media: clip-wipe reveal, inner image settles from a zoom
          ScrollTrigger.batch(
            gsap.utils.toArray<HTMLElement>('main .frame, main .ph').filter((el) => !skip(el) && visible(el) && below(el) && !el.closest('[data-pop]')),
            {
              start: 'top 90%',
              once: true,
              onEnter: (batch) => {
                gsap.fromTo(
                  batch,
                  { clipPath: 'inset(100% 0% 0% 0% round 12px)' },
                  { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 1.2, ease: 'expo.inOut', stagger: 0.12, clearProps: 'clipPath' },
                );
                const imgs = batch.flatMap((b) => Array.from(b.querySelectorAll(':scope > img:not([data-parallax]), :scope > picture > img:not([data-parallax])')));
                if (imgs.length) gsap.fromTo(imgs, { scale: 1.25 }, { scale: 1, duration: 1.6, ease: 'expo.out', stagger: 0.12, clearProps: 'transform' });
              },
            },
          );

          // 3 · Big numbers scramble, then land
          gsap.utils.toArray<HTMLElement>('main .num-xl').forEach((el) => {
            if (skip(el) || !visible(el) || !below(el)) return;
            const text = el.textContent || '';
            gsap.to(el, {
              duration: 0.9,
              ease: 'none',
              scrambleText: { text, chars: '0123456789', speed: 0.5 },
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            });
          });

          // 4 · Statement text lights up word by word, tied to scroll
          gsap.utils.toArray<HTMLElement>('[data-scrub-words]').forEach((el) => {
            if (!visible(el)) return;
            // aria 'none': keep the words readable (they sit inside links and paragraphs; an aria-label on those is not allowed)
            const split = SplitText.create(el, { type: 'words', aria: 'none' });
            gsap.fromTo(split.words, { opacity: 0.14 }, {
              opacity: 1,
              ease: 'none',
              stagger: 0.1,
              scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 48%', scrub: true },
            });
          });

          // 5 · Sections grow from an inset card to full-bleed
          gsap.utils.toArray<HTMLElement>('[data-expand]').forEach((el) => {
            if (!visible(el)) return;
            gsap.fromTo(el, { clipPath: 'inset(6% 5% 6% 5% round 36px)' }, {
              clipPath: 'inset(0% 0% 0% 0% round 0px)',
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 25%', scrub: true },
            });
          });

          // 6 · Grids pop in one after another
          gsap.utils.toArray<HTMLElement>('[data-pop]').forEach((el) => {
            if (!visible(el) || !below(el)) return;
            gsap.from(el.children, {
              scale: 0.6,
              opacity: 0,
              y: 30,
              duration: 0.9,
              ease: 'back.out(1.8)',
              stagger: { each: 0.07, from: 'center' },
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            });
          });
        });
      };

      // Split text only once fonts are in, so letter boxes are measured right.
      whenFontsReady(() => requestAnimationFrame(build));

      // 7 · 3D tilt on hover (fine pointers only)
      const fine = window.matchMedia(MQ.pointer).matches;
      const onMove = (e: PointerEvent) => {
        const el = (e.target as HTMLElement).closest<HTMLElement>('[data-tilt]');
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        gsap.to(el, { rotateY: x * 7, rotateX: -y * 7, transformPerspective: 1100, duration: 0.6, ease: 'power3.out' });
      };
      const onOut = (e: PointerEvent) => {
        const el = (e.target as HTMLElement).closest<HTMLElement>('[data-tilt]');
        if (el && !el.contains(e.relatedTarget as Node)) gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.9, ease: 'elastic.out(1, 0.5)' });
      };
      if (fine) {
        document.addEventListener('pointermove', onMove, { passive: true });
        document.addEventListener('pointerout', onOut);
      }

      return () => {
        alive = false;
        document.removeEventListener('pointermove', onMove);
        document.removeEventListener('pointerout', onOut);
        ctx.revert();
      };
    });

    return () => mm.revert();
  }, []);

  return null;
}
