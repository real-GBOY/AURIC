import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AuricMark } from '../Logo';
import { WORKSPACE } from '../../lib/content';
import { t } from '../../lib/i18n';
import { gsap, MQ, ScrollTrigger, useGSAP } from '../../lib/gsap';
import { EASE } from '../../lib/motion';

/*
 * Your AURIC Workspace (part of Manage, not a separate product).
 * A gold scene: on desktop it pins and the workspace window builds itself as you scroll,
 * one part per word (See · Know · Ask · Approve · 24/7). Phones, tablets and reduced
 * motion get the finished window, animating once when it comes into view.
 * WORKSPACE.live in lib/content switches "coming" to "included".
 */

const INK = '#141414';
const pad = (n: number) => String(n).padStart(2, '0');

const STEPS = [
  { w: t('See', 'شاهد'), d: t('Every stage, live.', 'كل مرحلة، مباشرة.') },
  { w: t('Know', 'اعرف'), d: t("Who's on it.", 'من يعمل عليه.') },
  { w: t('Ask', 'اطلب'), d: t('Request anything.', 'اطلب أي شيء.') },
  { w: t('Approve', 'وافق'), d: t('Review in one place.', 'راجع من مكان واحد.') },
  { w: '24/7', d: t('Always open.', 'متاحة دائمًا.') },
];
const LAST = STEPS.length - 1;

/** One part of the window: dim until its step is reached, ringed while it is the current one. */
function Zone({ i, active, children, className = '' }: { i: number; active: number; children: ReactNode; className?: string }) {
  const reached = active >= i;
  const current = active === i;
  return (
    <div
      className={`relative rounded-[10px] transition-[opacity,box-shadow] duration-500 ${reached ? 'opacity-100' : 'opacity-[.22]'} ${className}`}
      style={{ boxShadow: current ? '0 0 0 1.5px #dca733' : '0 0 0 1px rgba(244,241,232,.08)' }}
    >
      {children}
    </div>
  );
}

const STATUS = [
  { s: t('Sent', 'أُرسل'), c: 'text-[#96928a]' },
  { s: t('In progress', 'قيد التنفيذ'), c: 'text-gold' },
  { s: t('Done', 'تم'), c: 'text-[#7fd18b]' },
];

/** The workspace window. `on(i)` says whether part i has played its animation. */
function Window({ active, live }: { active: number; live: boolean }) {
  const on = (i: number) => live && active >= i;
  const [status, setStatus] = useState(0);
  const [approved, setApproved] = useState(false);
  const [now, setNow] = useState('');

  // Ask: the request walks from sent to done.
  useEffect(() => {
    if (!on(2)) return setStatus(0);
    const a = window.setTimeout(() => setStatus(1), 450);
    const b = window.setTimeout(() => setStatus(2), 1300);
    return () => (window.clearTimeout(a), window.clearTimeout(b));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [live, active >= 2]);

  // Approve: the button is pressed and the stamp lands.
  useEffect(() => {
    if (!on(3)) return setApproved(false);
    const a = window.setTimeout(() => setApproved(true), 650);
    return () => window.clearTimeout(a);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [live, active >= 3]);

  // 24/7: a real clock.
  useEffect(() => {
    const tick = () => setNow(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="rounded-[16px] bg-ink p-3 text-cream shadow-[0_40px_80px_-30px_rgba(20,20,20,.65)] md:p-4" aria-hidden="true">
      {/* 24/7 · top bar */}
      <Zone i={4} active={active} className="mb-3 flex items-center justify-between gap-3 px-4 py-3">
        <span className="flex items-center gap-2">
          <AuricMark size={18} className="text-gold" />
          <span className="lab !text-[10px] !text-cream">{t('Your workspace', 'مساحة عملك')}</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            {on(4) && <span className="absolute inset-0 animate-ping rounded-full bg-[#7fd18b] opacity-70" />}
            <span className={`relative h-2 w-2 rounded-full ${on(4) ? 'bg-[#7fd18b]' : 'bg-charcoal'}`} />
          </span>
          <span className="font-mono text-[11px] text-copy" dir="ltr">
            {t('Open', 'متاحة')} · {now}
          </span>
        </span>
      </Zone>

      <div className="grid gap-3 sm:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        {/* See · progress */}
        <Zone i={0} active={active} className="flex flex-col gap-4 p-4 sm:col-span-2 md:p-5">
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-display text-[18px] font-bold tracking-[-0.03em] md:text-[22px]">{t('Brand film + website', 'فيلم العلامة + الموقع')}</span>
            <motion.span className="num-xl text-[30px] text-gold md:text-[40px]" animate={{ opacity: on(0) ? 1 : 0.4 }}>
              {on(0) ? '64%' : '0%'}
            </motion.span>
          </div>
          <div className="h-[6px] overflow-hidden rounded-full bg-[rgba(244,241,232,.08)]">
            <motion.div className="h-full rounded-full bg-gold" initial={false} animate={{ width: on(0) ? '64%' : '4%' }} transition={{ duration: 1.1, ease: EASE }} />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[t('Plan', 'خطة'), t('Make', 'تنفيذ'), t('Review', 'مراجعة'), t('Deliver', 'تسليم')].map((s, i) => (
              <motion.span
                key={s}
                initial={false}
                animate={{ opacity: on(0) ? 1 : 0.35 }}
                transition={{ delay: on(0) ? 0.25 + i * 0.12 : 0 }}
                className={`lab truncate rounded-full border px-1 py-[6px] text-center !text-[9px] !tracking-[0.06em] sm:px-2 sm:!text-[10px] sm:!tracking-[0.12em] ${on(0) && i === 1 ? 'border-gold bg-gold !text-[#141414]' : on(0) && i < 1 ? 'border-gold !text-gold' : 'border-[rgba(244,241,232,.16)]'}`}
              >
                {s}
              </motion.span>
            ))}
          </div>
        </Zone>

        {/* Know · team */}
        <Zone i={1} active={active} className="flex flex-col justify-between gap-4 p-4 md:p-5">
          <span className="lab !text-[10px]">{t('Your team', 'فريقك')}</span>
          <div className="flex flex-col gap-3">
            {[
              { x: 'SA', r: t('Account lead', 'مسؤولة الحساب') },
              { x: 'YN', r: t('Video', 'فيديو') },
              { x: 'LH', r: t('Web', 'ويب') },
            ].map((m, i) => (
              <motion.div
                key={m.x}
                className="flex items-center gap-3"
                initial={false}
                animate={on(1) ? { opacity: 1, y: 0 } : { opacity: 0, y: -14 }}
                transition={{ duration: 0.5, ease: EASE, delay: on(1) ? i * 0.12 : 0 }}
              >
                <span className={`grid h-8 w-8 place-items-center rounded-full font-display text-[10px] font-bold text-[#141414] ${i === 0 ? 'bg-gold' : 'bg-cream'}`}>{m.x}</span>
                <span className="text-[13.5px] text-copy">{m.r}</span>
              </motion.div>
            ))}
          </div>
        </Zone>

        <div className="flex flex-col gap-3">
          {/* Ask · request */}
          <Zone i={2} active={active} className="flex flex-col gap-3 p-4 md:p-5">
            <span className="lab !text-[10px]">{t('Request', 'طلب')}</span>
            <span className="text-[14.5px]">{t('Swap the hero photo', 'تغيير صورة الواجهة')}</span>
            <AnimatePresence mode="wait">
              <motion.span key={status} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }} className={`lab !text-[10.5px] ${STATUS[status].c}`}>
                ● {STATUS[status].s}
              </motion.span>
            </AnimatePresence>
          </Zone>

          {/* Approve · deliverable */}
          <Zone i={3} active={active} className="relative flex flex-col gap-3 overflow-hidden bg-cream p-4 text-[#141414] md:p-5">
            <span className="font-display text-[14px] font-bold tracking-[-0.02em]">{t('Brand film · v3', 'فيلم العلامة · نسخة 3')}</span>
            <span className={`lab self-start rounded-full px-3 py-[6px] !text-[10px] transition-colors ${approved ? 'bg-[#141414] !text-cream' : 'border border-[#141414] !text-[#141414]'}`}>
              {approved ? t('✓ Approved', '✓ تمت الموافقة') : t('Approve', 'موافقة')}
            </span>
            <AnimatePresence>
              {approved && (
                <motion.span
                  className="absolute end-3 top-3 grid h-14 w-14 place-items-center rounded-full border-2 border-gold-deep font-display text-[9px] font-extrabold uppercase leading-[1.1] tracking-[0.04em] text-gold-deep"
                  initial={{ scale: 2.2, opacity: 0, rotate: -30 }}
                  animate={{ scale: 1, opacity: 1, rotate: -12 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 18 }}
                >
                  <AuricMark size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </Zone>
        </div>
      </div>
    </div>
  );
}

export default function Workspace() {
  const live = WORKSPACE.live;
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const win = useRef<HTMLDivElement>(null);
  const inView = useInView(win, { once: true, margin: '-15% 0px' });
  // Without the pinned scene (phones, tablets, reduced motion) the window shows everything.
  const desktop = () => typeof window !== 'undefined' && window.matchMedia(MQ.desktop).matches;
  const [pinned, setPinned] = useState(desktop);
  const [active, setActive] = useState(() => (desktop() ? -1 : LAST));

  // Desktop with motion allowed → pinned scene. Decided first, so the pin measures the final layout.
  useEffect(() => {
    const m = window.matchMedia(MQ.desktop);
    const on = () => {
      setPinned(m.matches);
      setActive(m.matches ? -1 : LAST);
    };
    on();
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, []);

  useGSAP(
    () => {
      if (!pinned || !stage.current) return;
      const q = gsap.utils.selector(stage);
      const st = ScrollTrigger.create({
        trigger: stage.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * 2.6}`,
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        animation: gsap
          .timeline()
          .fromTo(q('.ws-bar'), { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: 1 }, 0)
          .fromTo(q('.ws-win'), { scale: 0.88, rotate: -2 }, { scale: 1, rotate: 0, ease: 'power2.out', duration: 0.3 }, 0),
        onUpdate: (self) => setActive(self.progress < 0.04 ? -1 : Math.min(LAST, Math.floor(((self.progress - 0.04) / 0.92) * STEPS.length))),
      });
      // Sections below were measured without this pin's extra scroll length.
      const id = requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => {
        cancelAnimationFrame(id);
        st.kill();
      };
    },
    { scope: section, dependencies: [pinned], revertOnUpdate: true },
  );

  const shown = Math.max(active, 0);

  return (
    <section ref={section} id="workspace" className="overflow-x-clip bg-gold text-[#141414]">
      {/* Intro */}
      <div className="wrap flex flex-col gap-6 pb-12 pt-[88px] md:pb-16 md:pt-[120px]">
        <div className="flex flex-wrap items-center gap-3">
          <span className="lab !text-[#141414]">{t('Manage · Your AURIC Workspace', 'الإدارة · مساحة عملك في أوريك')}</span>
          <span className="lab rounded-full bg-[#141414] px-3 py-[6px] !text-[10px] !text-gold">
            {live ? t('Included with every engagement', 'مشمولة مع كل تعاون') : t('Coming to every engagement', 'قادمة مع كل تعاون')}
          </span>
        </div>
        <h2 className="h2 max-w-[14ch]" style={{ fontSize: 'clamp(46px, 8.4vw, 128px)', lineHeight: 0.9 }}>
          {t('Your project,', 'مشروعك')} <span style={{ color: 'transparent', WebkitTextStroke: `1.5px ${INK}` }}>{t('always in view.', 'أمامك دائمًا.')}</span>
        </h2>
      </div>

      {/* Scene */}
      <div ref={stage} className={`relative ${pinned ? 'flex h-screen items-center' : 'pb-[88px] md:pb-[120px]'}`}>
        <div className="wrap grid w-full items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          {/* The word */}
          <div className={pinned ? 'flex flex-col gap-5' : 'hidden'}>
            <span className="lab !text-[#141414]">
              <span className="font-semibold">{pad(shown + 1)}</span> / {pad(STEPS.length)}
            </span>
            {/* Sized from the column's own width (container units), so the longest word, "Approve", always fits. */}
            <div className="relative overflow-hidden [container-type:inline-size]">
              <div className="h-[1.08em]" style={{ fontSize: 'min(140px, 18cqw)' }} />
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={shown}
                  className="absolute inset-x-0 top-0 block whitespace-nowrap font-display font-extrabold leading-[1.02] tracking-[-0.055em]"
                  style={{ fontSize: 'min(140px, 18cqw)' }}
                  initial={{ y: '100%' }}
                  animate={{ y: '0%' }}
                  exit={{ y: '-100%' }}
                  transition={{ duration: 0.55, ease: EASE }}
                >
                  {STEPS[shown].w}
                </motion.span>
              </AnimatePresence>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.p key={shown} className="font-display text-[22px] font-medium tracking-[-0.02em]" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                {STEPS[shown].d}
              </motion.p>
            </AnimatePresence>
            <div className="mt-4 flex gap-2" aria-hidden="true">
              {STEPS.map((s, i) => (
                <span key={s.w} className={`h-[3px] flex-1 rounded-full transition-colors duration-300 ${i <= active ? 'bg-[#141414]' : 'bg-[rgba(20,20,20,.18)]'}`} />
              ))}
            </div>
          </div>

          <div ref={win} className="ws-win origin-center">
            <Window active={active} live={pinned || inView} />
          </div>

          {/* Phones / tablets: the five words as a list */}
          <ol className={pinned ? 'hidden' : 'm-0 grid list-none grid-cols-1 p-0 sm:grid-cols-2'}>
            {STEPS.map((s, i) => (
              <motion.li
                key={s.w}
                className={`flex items-baseline gap-4 border-t border-[rgba(20,20,20,.2)] py-5 ${i === LAST ? 'sm:col-span-2' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: EASE, delay: (i % 2) * 0.08 }}
              >
                <span className="font-display text-[40px] font-extrabold leading-none tracking-[-0.05em]">{s.w}</span>
                <span className="text-[15px]">{s.d}</span>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* scroll progress through the scene */}
        {pinned && <span aria-hidden="true" className="ws-bar absolute inset-x-0 bottom-0 h-[3px] origin-left bg-[#141414] rtl:origin-right" />}
      </div>

      {/* One line, said once */}
      <p className="sr-only">
        {t(
          'Every AURIC client gets a private workspace to follow progress, see the team, send requests, approve work and reach us 24/7.',
          'كل عميل في أوريك يحصل على مساحة عمل خاصة يتابع فيها التقدم، ويرى فريقه، ويرسل طلباته، ويوافق على العمل، ويصل إلينا على مدار الساعة.',
        )}
      </p>
      <div className="wrap pb-16">
        <p className="lab border-t border-[rgba(20,20,20,.2)] pt-6 !text-[#141414]">{t('Private to your company · only the people you invite', 'خاصة بشركتك · لا يراها إلا من تدعوهم')}</p>
      </div>
    </section>
  );
}
