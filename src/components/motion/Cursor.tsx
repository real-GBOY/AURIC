import { useEffect, useRef } from 'react';
import { gsap, MQ } from '../../lib/gsap';

/**
 * Desktop-only cursor follower and magnetic buttons.
 * - A gold ring trails the pointer, grows over links and shows a label over
 *   elements with data-cursor="view" / "drag".
 * - Buttons (.btn and [data-magnetic]) lean toward the pointer and spring back.
 * The native cursor stays visible; nothing runs on touch or reduced motion.
 */
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MQ.pointer, () => {
      const el = ring.current!;
      gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0 });
      const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3' });
      let state = '';

      const setState = (next: string, text = '') => {
        if (next === state) return;
        state = next;
        label.current!.textContent = text;
        gsap.to(el, {
          width: next === 'label' ? 88 : next === 'link' ? 54 : 22,
          height: next === 'label' ? 88 : next === 'link' ? 54 : 22,
          backgroundColor: next === 'label' ? '#dca733' : 'rgba(220,167,51,0)',
          borderColor: next === 'link' ? 'rgba(220,167,51,.9)' : 'rgba(220,167,51,.55)',
          duration: 0.35,
          ease: 'power3.out',
        });
        gsap.to(label.current, { opacity: next === 'label' ? 1 : 0, duration: 0.2 });
      };

      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse') return;
        gsap.to(el, { opacity: 1, duration: 0.3, overwrite: 'auto' });
        xTo(e.clientX);
        yTo(e.clientY);
        const t = e.target as HTMLElement;
        const tagged = t.closest<HTMLElement>('[data-cursor]');
        if (tagged) setState('label', tagged.dataset.cursor === 'drag' ? 'Drag' : 'View');
        else if (t.closest('a,button,[role="button"],label,select,input,textarea')) setState('link');
        else setState('dot');
      };
      const onLeave = () => gsap.to(el, { opacity: 0, duration: 0.3 });

      // Magnetic buttons
      const magnets = new WeakMap<HTMLElement, { x: gsap.QuickToFunc; y: gsap.QuickToFunc }>();
      const getMagnet = (b: HTMLElement) => {
        let m = magnets.get(b);
        if (!m) {
          m = { x: gsap.quickTo(b, 'x', { duration: 0.5, ease: 'power3' }), y: gsap.quickTo(b, 'y', { duration: 0.5, ease: 'power3' }) };
          magnets.set(b, m);
        }
        return m;
      };
      let active: HTMLElement | null = null;
      const onMagnetMove = (e: PointerEvent) => {
        const b = (e.target as HTMLElement).closest<HTMLElement>('.btn, [data-magnetic]');
        if (active && active !== b) {
          gsap.to(active, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
          active = null;
        }
        if (!b) return;
        active = b;
        const r = b.getBoundingClientRect();
        const m = getMagnet(b);
        m.x((e.clientX - (r.left + r.width / 2)) * 0.28);
        m.y((e.clientY - (r.top + r.height / 2)) * 0.35);
      };

      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointermove', onMagnetMove, { passive: true });
      document.documentElement.addEventListener('pointerleave', onLeave);
      return () => {
        window.removeEventListener('pointermove', onMove);
        window.removeEventListener('pointermove', onMagnetMove);
        document.documentElement.removeEventListener('pointerleave', onLeave);
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <div
      ref={ring}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[150] hidden h-[22px] w-[22px] items-center justify-center rounded-full border border-[rgba(220,167,51,.55)] opacity-0 [@media(hover:hover)_and_(pointer:fine)]:flex"
    >
      <span ref={label} className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-[#141414] opacity-0" />
    </div>
  );
}
