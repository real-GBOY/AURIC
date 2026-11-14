import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { DivisionKey } from '../../lib/content';
import { t } from '../../lib/i18n';
import { AuricMark } from '../Logo';
import { PlayButton } from '../ui/Icons';
import { Photo, Screen, WorkPreview } from '../ui/Media';
import { FILMS } from '../../lib/content';

const BARS = [30, 75, 50, 95, 40, 85, 60, 30, 70];
const EASE = [0.22, 1, 0.36, 1] as const;

/** Steps through 0..n-1 every `ms` (stays on the last step for reduced motion). */
function useStep(n: number, ms: number) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(reduce ? n - 1 : 0);
  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % n), ms);
    return () => window.clearInterval(id);
  }, [n, ms, reduce]);
  return reduce ? n - 1 : i;
}

/** The visual shown for each division (desktop sticky preview and phone accordion). */
export default function DivisionPreview({ k, compact = false }: { k: DivisionKey; compact?: boolean }) {
  if (k === 'create') return <CreatePreview compact={compact} />;
  if (k === 'strategy') return <StrategyPreview compact={compact} />;
  if (k === 'build') return <BuildPreview compact={compact} />;
  return <ManagePreview compact={compact} />;
}

/* ─── Create: real work — the TCG film, ELK Café's identity and a story ──── */
function CreatePreview({ compact }: { compact: boolean }) {
  const box = compact ? 'h-[150px] rounded-[10px]' : 'aspect-[4/5] rounded-[10px]';
  return compact ? (
    <div className={`${box} grid grid-cols-[2fr_1fr] gap-2 bg-cream p-[10px]`}>
      <div className="relative overflow-hidden rounded-md bg-[#141414]">
        <WorkPreview img="/work/tcg-brand-film/cover.jpg" teaser={FILMS.brandFilm.teaser} alt={t('TCG brand film', 'فيلم TCG')} sizes="300px" className="absolute inset-0" imgClassName="object-cover" />
        <PlayButton size={38} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="overflow-hidden rounded-md bg-[#40564a]">
        <Photo src="/work/elk/post-1.jpg" alt={t('ELK Café post', 'منشور مقهى إلك')} sizes="150px" className="h-full w-full object-cover object-top" />
      </div>
    </div>
  ) : (
    <div className={`${box} grid grid-cols-2 grid-rows-[2fr_1fr_1fr] gap-[10px] bg-cream p-4`}>
      <div className="relative col-span-2 overflow-hidden rounded-md bg-[#141414]">
        <WorkPreview img="/work/tcg-brand-film/cover.jpg" teaser={FILMS.brandFilm.teaser} alt={t('TCG brand film', 'فيلم TCG')} sizes="480px" className="absolute inset-0" imgClassName="object-cover" />
        <PlayButton size={52} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        <span className="slot bottom-[10px] left-3 rounded bg-[rgba(10,10,11,.75)] px-2 py-1">{t('Brand film · TCG', 'فيلم علامة · TCG')}</span>
      </div>
      <div className="overflow-hidden rounded-md bg-[#40564a]">
        <Photo src="/work/elk/cover.jpg" alt={t('ELK Café identity', 'هوية مقهى إلك')} sizes="240px" className="h-full w-full object-cover object-[50%_18%]" />
      </div>
      <div className="overflow-hidden rounded-md bg-[#40564a]">
        <Photo src="/work/elk/post-3.jpg" alt={t('ELK Café post', 'منشور مقهى إلك')} sizes="240px" className="h-full w-full object-cover object-[50%_25%]" />
      </div>
      <div className="col-span-2 flex items-center gap-[3px] rounded-md bg-[#141414] px-[14px]" aria-hidden="true">
        {BARS.map((h, i) => (
          <motion.span
            key={i}
            className="flex-1 bg-gold"
            initial={{ height: '20%' }}
            animate={{ height: [`${h}%`, `${Math.max(20, 100 - h)}%`, `${h}%`] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.08, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Strategy: a real campaign plan ────────────────────────────────────── */
const FUNNEL = [
  { stage: t('Awareness', 'الوعي'), via: t('Reels · ads', 'ريلز · إعلانات'), w: 100 },
  { stage: t('Interest', 'الاهتمام'), via: t('Posts · stories', 'منشورات · ستوري'), w: 68 },
  { stage: t('Leads', 'العملاء المحتملون'), via: t('Landing page', 'صفحة هبوط'), w: 42 },
  { stage: t('Clients', 'العملاء'), via: t('Follow-up', 'المتابعة'), w: 24 },
];
const WEEK = [
  ['M', 'reel'], ['T', 'post'], ['W', ''], ['T', 'story'], ['F', 'reel'], ['S', ''], ['S', 'post'],
] as const;

function StrategyPreview({ compact }: { compact: boolean }) {
  const rows = (
    <div className={`flex flex-col ${compact ? 'gap-[7px]' : 'gap-[12px]'}`}>
      {FUNNEL.map((f, i) => (
        <div key={f.stage} className="flex flex-col gap-[5px]">
          <div className="flex items-baseline justify-between gap-3">
            <span className={`font-display font-bold tracking-[-0.02em] text-cream ${compact ? 'text-[13px]' : 'text-[17px]'}`}>{f.stage}</span>
            <span className={`lab ${compact ? '!text-[9px]' : '!text-[11px]'}`}>{f.via}</span>
          </div>
          <div className={`overflow-hidden rounded-full bg-[rgba(244,241,232,.08)] ${compact ? 'h-[6px]' : 'h-[9px]'}`}>
            <motion.div
              className="h-full origin-left rounded-full"
              style={{ width: `${f.w}%`, background: i === FUNNEL.length - 1 ? '#DCA733' : `rgba(220,167,51,${0.35 + i * 0.15})` }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: EASE }}
            />
          </div>
        </div>
      ))}
    </div>
  );

  if (compact) {
    return (
      <div className="flex h-[170px] flex-col justify-center gap-2 rounded-[10px] bg-surface px-4 py-3">
        <span className="lab !text-[10px] !text-gold">{t('Campaign plan · funnel', 'خطة الحملة · مسار العميل')}</span>
        {rows}
      </div>
    );
  }

  return (
    <div className="flex aspect-[4/5] flex-col gap-5 rounded-[10px] bg-surface p-6 lg:p-7">
      <div className="flex items-center justify-between gap-3">
        <span className="lab !text-gold">{t('Campaign plan', 'خطة الحملة')}</span>
        <span className="lab rounded-full border border-[rgba(244,241,232,.2)] px-3 py-1 !text-[10px]">{t('Example', 'مثال')}</span>
      </div>
      <div className="font-display text-[22px] font-bold leading-[1.1] tracking-[-0.03em] text-cream lg:text-[26px]">
        {t('From first view to signed client.', 'من أول مشاهدة إلى عميل متعاقد.')}
      </div>
      {rows}
      {/* the week, planned */}
      <div className="mt-auto flex flex-col gap-2">
        <span className="lab !text-[11px]">{t('This week', 'هذا الأسبوع')}</span>
        <div className="grid grid-cols-7 gap-[6px]">
          {WEEK.map(([d, kind], i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center gap-[6px] rounded-md border border-[rgba(244,241,232,.08)] bg-ink py-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 + i * 0.05, duration: 0.4 }}
            >
              <span className="lab !text-[9px]">{d}</span>
              <span
                className={`h-[7px] w-[60%] rounded-full ${kind === 'reel' ? 'bg-gold' : kind === 'post' ? 'bg-cream' : kind === 'story' ? 'border border-gold' : 'bg-[rgba(244,241,232,.08)]'}`}
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </div>
        <div className="flex gap-4">
          {[['bg-gold', t('Reel', 'ريل')], ['bg-cream', t('Post', 'منشور')], ['border border-gold', t('Story', 'ستوري')]].map(([c, l]) => (
            <span key={l} className="lab flex items-center gap-[6px] !text-[10px]">
              <i className={`inline-block h-[7px] w-[14px] rounded-full ${c}`} /> {l}
            </span>
          ))}
        </div>
      </div>
      {/* reach, trending up */}
      <svg viewBox="0 0 300 60" className="h-[52px] w-full" aria-hidden="true">
        <motion.path
          d="M0 52 C 40 50, 60 44, 90 40 S 150 34, 180 24 S 250 10, 300 6"
          fill="none"
          stroke="#DCA733"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, delay: 0.5, ease: EASE }}
        />
        <motion.circle cx="300" cy="6" r="4" fill="#DCA733" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.8 }} />
      </svg>
    </div>
  );
}

/* ─── Build: wireframe → design → live ──────────────────────────────────── */
const STAGES = [t('Wireframe', 'الهيكل'), t('Design', 'التصميم'), t('Live', 'إطلاق')];

function Wireframe() {
  const line = { stroke: 'rgba(244,241,232,.45)', strokeWidth: 1.2, fill: 'none' };
  const shapes = [
    <rect key="a" x="4" y="4" width="52" height="92" rx="3" {...line} />,
    <rect key="b" x="64" y="4" width="132" height="14" rx="3" {...line} />,
    <rect key="c" x="64" y="26" width="40" height="28" rx="3" {...line} />,
    <rect key="d" x="110" y="26" width="40" height="28" rx="3" {...line} />,
    <rect key="e" x="156" y="26" width="40" height="28" rx="3" {...line} />,
    <rect key="f" x="64" y="62" width="86" height="34" rx="3" {...line} />,
    <rect key="g" x="156" y="62" width="40" height="34" rx="3" {...line} />,
  ];
  return (
    <svg viewBox="0 0 200 100" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
      {shapes.map((s, i) => (
        <motion.g key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.08 }}>
          {s}
        </motion.g>
      ))}
    </svg>
  );
}

function DesignBlocks() {
  const blocks = [
    ['2% 4%', '26%', '92%', '#202023'],
    ['32% 4%', '66%', '14%', '#2a2a2e'],
    ['32% 26%', '20%', '28%', '#DCA733'],
    ['55% 26%', '20%', '28%', '#F4F1E8'],
    ['78% 26%', '20%', '28%', '#D9D4C7'],
    ['32% 62%', '43%', '34%', '#F4F1E8'],
    ['78% 62%', '20%', '34%', '#DCA733'],
  ];
  return (
    <div className="relative h-full w-full bg-[#141414]">
      {blocks.map(([pos, w, h, c], i) => {
        const [left, top] = pos.split(' ');
        return (
          <motion.span
            key={i}
            className="absolute rounded-[4px]"
            style={{ left, top, width: w, height: h, background: c }}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.06, duration: 0.4, ease: EASE }}
          />
        );
      })}
    </div>
  );
}

function BuildPreview({ compact }: { compact: boolean }) {
  const step = useStep(3, 2400);
  const pills = (
    <div className="flex gap-[6px]">
      {STAGES.map((s, i) => (
        <span
          key={s}
          className={`lab rounded-full px-3 py-[5px] transition-colors duration-500 ${compact ? '!text-[9px]' : '!text-[10px]'} ${i === step ? 'bg-gold !text-[#141414]' : i < step ? 'border border-gold !text-gold' : 'border border-[rgba(244,241,232,.2)]'}`}
        >
          {String(i + 1).padStart(2, '0')} {s}
        </span>
      ))}
    </div>
  );
  const browser = (
    <div className="frame relative h-full w-full">
      <div className="frame-bar" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="relative" style={{ height: 'calc(100% - 28px)' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            className="absolute inset-0 p-[6px]"
            initial={{ clipPath: 'inset(0% 100% 0% 0%)' }}
            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {step === 0 && <Wireframe />}
            {step === 1 && <DesignBlocks />}
            {step === 2 && <Photo src="/work/atlas/dashboard.png" alt={t('Atlas, live', 'أطلس بعد الإطلاق')} sizes="(min-width: 768px) 40vw, 90vw" className="h-full w-full rounded-[4px] object-cover object-left-top" />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );

  if (compact) {
    return (
      <div className="flex h-[170px] flex-col gap-2 rounded-[10px] bg-bg p-3">
        {pills}
        <div className="min-h-0 flex-1">{browser}</div>
      </div>
    );
  }

  return (
    <div className="relative flex aspect-[4/5] flex-col gap-4 overflow-hidden rounded-[10px] bg-bg p-5 lg:p-6">
      <div className="flex items-center justify-between gap-3">
        <span className="lab !text-gold">{t('From sketch to shipped', 'من الفكرة إلى الإطلاق')}</span>
      </div>
      {pills}
      <div className="h-[54%]">{browser}</div>
      {/* code that ships it */}
      <div className="rounded-lg border border-[rgba(244,241,232,.1)] bg-[#0e0e10] p-4 font-mono text-[12px] leading-[1.7]" dir="ltr">
        <div><span className="text-gold">const</span> <span className="text-cream">app</span> = build(<span className="text-sand">design</span>);</div>
        <div><span className="text-gold">await</span> <span className="text-cream">deploy</span>(app);</div>
        <AnimatePresence>
          {step === 2 && (
            <motion.div key="ok" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-[#7fd18b]">
              ✓ {t('Deployed · live for users', 'تم النشر · متاح للمستخدمين')}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* the mobile app lands on launch */}
      <AnimatePresence>
        {step === 2 && (
          <motion.div
            key="phone"
            className="absolute bottom-4 end-4 h-[42%] w-[26%]"
            initial={{ y: 60, opacity: 0, rotate: 6 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <Screen src="/work/nova/mobile-home.jpg" alt={t('Digitmask mobile app', 'تطبيق ديجت ماسك')} bar={false} radius={16} className="h-full shadow-[0_20px_50px_rgba(0,0,0,.6)]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Manage: one owner, every specialist ───────────────────────────────── */
const ORBIT = [
  t('Video', 'فيديو'),
  t('Design', 'تصميم'),
  t('Copy', 'كتابة'),
  t('Ads', 'إعلانات'),
  t('Dev', 'برمجة'),
  t('QA', 'مراجعة'),
];
const STATUS = [
  t('Brief agreed', 'تم الاتفاق على الموجز'),
  t('Team assigned', 'تم تعيين الفريق'),
  t('In review', 'قيد المراجعة'),
  t('Delivered', 'تم التسليم'),
];

function Orbit({ className = '', hub = 20 }: { className?: string; hub?: number }) {
  const reduce = useReducedMotion();
  const R = 38; // orbit radius, % of the box
  return (
    <div className={`relative aspect-square ${className}`} aria-hidden="true">
      {/* rings */}
      <div className="absolute inset-[12%] rounded-full border border-dashed border-[rgba(244,241,232,.18)]" />
      <div className="absolute inset-[30%] rounded-full border border-[rgba(220,167,51,.25)]" />
      {/* hub */}
      <motion.div
        className="absolute left-1/2 top-1/2 flex items-center justify-center text-gold"
        style={{ width: `${hub}%`, height: `${hub}%`, x: '-50%', y: '-50%' }}
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      >
        <AuricMark size={64} className="h-full w-full text-gold" />
      </motion.div>
      {/* specialists orbit; labels counter-rotate so they stay upright */}
      <motion.div className="absolute inset-0" animate={reduce ? undefined : { rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}>
        {ORBIT.map((name, i) => {
          const a = (i / ORBIT.length) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + Math.cos(a) * R;
          const y = 50 + Math.sin(a) * R;
          return (
            <div key={name}>
              {/* a signal travels from the specialist to the hub */}
              {!reduce && (
                <motion.span
                  className="absolute -ms-[2.5px] -mt-[2.5px] h-[5px] w-[5px] rounded-full bg-gold"
                  animate={{ left: [`${x}%`, '50%'], top: [`${y}%`, '50%'], opacity: [0, 1, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.45, ease: 'easeIn' }}
                />
              )}
              <motion.div
                className="absolute"
                style={{ left: `${x}%`, top: `${y}%`, x: '-50%', y: '-50%' }}
                animate={reduce ? undefined : { rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              >
                <span className="lab block whitespace-nowrap rounded-full border border-[rgba(244,241,232,.22)] bg-ink px-[10px] py-[5px] !text-[10px] !text-cream">
                  {name}
                </span>
              </motion.div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

function ManagePreview({ compact }: { compact: boolean }) {
  const step = useStep(STATUS.length, 1800);
  const done = step === STATUS.length - 1;
  const status = (
    <div className="flex items-center justify-between gap-3 rounded-full border border-[rgba(244,241,232,.14)] bg-ink py-[6px] pe-[14px] ps-[6px]">
      <span className="flex items-center gap-[10px]">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-cream font-display text-[11px] font-bold text-[#141414]">{t('You', 'أنت')}</span>
        <span className="lab !text-[10px]">{t('One point of contact', 'نقطة تواصل واحدة')}</span>
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={step}
          className={`lab !text-[10px] ${done ? '!text-gold' : '!text-cream'}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {done ? '◆ ' : '● '}
          {STATUS[step]}
        </motion.span>
      </AnimatePresence>
    </div>
  );

  if (compact) {
    return (
      <div className="flex h-[170px] items-center gap-3 rounded-[10px] bg-surface px-3">
        <Orbit className="h-[150px] shrink-0" hub={22} />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <span className="font-display text-[18px] font-bold leading-[1.05] tracking-[-0.03em]">{t('One owner, every specialist.', 'مسؤول واحد، وكل المتخصصين.')}</span>
          <AnimatePresence mode="wait">
            <motion.span key={step} className={`lab !text-[10px] ${done ? '!text-gold' : ''}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {done ? '◆ ' : '● '}
              {STATUS[step]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div className="flex aspect-[4/5] flex-col items-center justify-between rounded-[10px] bg-surface p-6 lg:p-7">
      <div className="flex w-full items-center justify-between gap-3">
        <span className="lab !text-gold">{t('One owner', 'مسؤول واحد')}</span>
        <span className="lab !text-[10px]">{t('Every specialist, coordinated', 'كل المتخصصين بتنسيق واحد')}</span>
      </div>
      <Orbit className="w-full max-w-[300px]" />
      {/* the single line from AURIC to you */}
      <div className="flex w-full flex-col items-center gap-3">
        <span className="h-6 w-px bg-gradient-to-b from-gold to-transparent" aria-hidden="true" />
        <div className="w-full">{status}</div>
      </div>
    </div>
  );
}
