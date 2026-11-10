import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import BigCTA from '../components/layout/BigCTA';
import EntryMedia from '../components/work/EntryMedia';
import { PlayButton } from '../components/ui/Icons';
import { DesignSlot, ReelSlot, Screen, VideoSlot } from '../components/ui/Media';
import { Reveal, TitleReveal } from '../components/ui/Reveal';
import { ARCHIVE, FEED, FILTERS, INDEX, type Entry, type Group } from '../lib/projects';
import { SHOWREEL } from '../lib/content';
import { EASE, inView, rise, stagger, useDragScroll } from '../lib/motion';

const pad = (n: number) => String(n).padStart(2, '0');
type F = 'all' | Group;

function ChapterHead({ n, title, right, cream = false }: { n?: string; title: string; right: React.ReactNode; cream?: boolean }) {
  return (
    <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
      <div className="flex flex-col gap-[14px]">
        {n && <span className={`font-display text-[15px] font-bold ${cream ? 'text-gold-deep' : 'text-gold'}`}>{n}</span>}
        <h2 className="h2">{title}</h2>
      </div>
      {right}
    </Reveal>
  );
}

/* A1 · Giant title over the reel (desktop) / title inside a vertical reel (phone) */
function Hero() {
  return (
    <section className="relative overflow-hidden pt-5 md:pt-14">
      {/* Desktop */}
      <div className="hidden md:block">
        <div className="wrap relative z-[2] flex flex-wrap items-end justify-between gap-6">
          <TitleReveal lines={[<>Work<span className="text-gold">.</span></>]} className="mega" style={{ fontSize: 'clamp(96px,17vw,250px)', lineHeight: 0.82, letterSpacing: '-0.06em' }} />
          <motion.div className="flex max-w-[340px] flex-col gap-[10px] pb-[18px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <span className="lab !text-gold">Selected work · 2025—2026</span>
            <p className="copy !text-base">Video, design, content and digital products. Made by one team.</p>
          </motion.div>
        </div>
        <motion.div className="wrap relative z-[1] -mt-9" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.9, ease: EASE }}>
          <VideoSlot ratio="21/9" label="Showreel · autoplay, muted loop" src={SHOWREEL.src} playSize={88} radius={10}>
            {!SHOWREEL.src && <span className="slot bottom-5 right-[22px] !text-[11px] !text-cream">00:00 / 01:30</span>}
          </VideoSlot>
        </motion.div>
      </div>
      {/* Phone */}
      <div className="wrap pb-7 md:hidden">
        <motion.div
          className="ph relative flex aspect-[9/13] flex-col justify-end rounded-2xl p-[18px]"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <PlayButton size={50} className="absolute left-[18px] top-[18px]" />
          <span className="slot left-20 top-[30px]">Showreel · autoplay · your video</span>
          <TitleReveal lines={[<>Work<span className="text-gold">.</span></>]} className="mega" style={{ fontSize: 92, lineHeight: 0.82, letterSpacing: '-0.06em' }} />
          <span className="lab mt-[14px] !text-cream">Video · design · content · websites</span>
        </motion.div>
      </div>
    </section>
  );
}

function IndexPreview({ e }: { e: Entry }) {
  if (e.type === 'img') return <Screen src={e.img!} alt={e.name} ratio="4/3" />;
  if (e.type === 'design')
    return (
      <div className="flex aspect-[4/3] flex-col justify-between rounded-lg bg-cream p-[26px] text-[#141414]">
        <span className="font-display text-[96px] font-extrabold leading-[.9] tracking-[-0.05em]">Aa</span>
        <span className="lab !text-gold-deep">Design preview · your work</span>
      </div>
    );
  return <VideoSlot ratio="4/3" label="Video preview · plays on hover" radius={8} />;
}

/* A2 · Interactive index: hover a project, the preview swaps */
function ProjectIndex() {
  const [i, setI] = useState(0);
  const cur = INDEX[i];
  return (
    <section className="hidden py-[120px] md:block">
      <div className="wrap">
        <ChapterHead
          title="The index"
          right={
            <div className="flex flex-wrap items-baseline gap-6">
              <span className="lab">Hover a project · preview changes</span>
              <a href="/case-studies" className="lab !text-gold">All case studies →</a>
            </div>
          }
        />
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div role="list">
            {INDEX.map((e, k) => {
              const on = k === i;
              return (
                <a
                  key={e.name}
                  href={e.href}
                  role="listitem"
                  onMouseEnter={() => setI(k)}
                  onFocus={() => setI(k)}
                  className={`grid w-full grid-cols-[48px_minmax(0,1fr)_auto] items-baseline gap-4 border-b border-[var(--line)] py-[22px] transition-colors ${on ? 'text-gold' : ''}`}
                >
                  <span className={`lab ${on ? '!text-gold' : ''}`}>{pad(k + 1)}</span>
                  <span className="font-display font-semibold leading-[1.1] tracking-[-0.02em]" style={{ fontSize: 'clamp(22px,2.4vw,34px)' }}>
                    <motion.span className="inline-block" animate={{ x: on ? 10 : 0 }} transition={{ duration: 0.3, ease: EASE }}>
                      {e.name}
                    </motion.span>
                  </span>
                  <span className={`lab ${on ? '!text-gold' : ''}`}>{e.cat}</span>
                </a>
              );
            })}
          </div>
          <div className="sticky top-24 flex flex-col gap-4">
            <AnimatePresence mode="wait">
              <motion.div key={cur.name} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.3 }}>
                <IndexPreview e={cur} />
              </motion.div>
            </AnimatePresence>
            <div className="flex items-baseline justify-between gap-3">
              <span className="h3">{cur.name}</span>
              <span className="lab !text-gold">{cur.kind}</span>
            </div>
            <p className="copy !text-[15px]">{cur.desc}</p>
            <a href={cur.href} className="lab !text-cream hover:!text-gold">Open case study →</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Chapter 01 · Video filmstrip (A3) */
function VideoChapter() {
  const ref = useDragScroll<HTMLDivElement>();
  const items = [
    ['[Brand film]', 'Video edit'],
    ['[Motion graphics]', 'Motion'],
    ['[Product video]', 'Video + voiceover'],
    ['[Event recap]', 'Video edit'],
  ];
  return (
    <section className="hidden overflow-hidden bg-bg py-[120px] md:block">
      <div className="wrap">
        <ChapterHead n="01" title="Video & motion" right={<span className="lab">Drag or scroll sideways →</span>} />
        <div ref={ref} className="strip" role="list" aria-label="Video projects">
          {items.map(([t, tag]) => (
            <a key={t} href="/case-studies/creative" role="listitem" className="group flex w-[560px] flex-col gap-[14px]">
              <div className="transition-transform duration-500 group-hover:scale-[1.02]">
                <VideoSlot ratio="16/9" label="Your video" radius={8} />
              </div>
              <span className="flex justify-between">
                <span className="h3 !text-[18px]">{t}</span>
                <span className="lab">{tag}</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Chapter 02 · Design poster wall on cream (A4) */
function DesignChapter() {
  const tile = { hidden: { opacity: 0, clipPath: 'inset(100% 0 0 0)' }, visible: { opacity: 1, clipPath: 'inset(0% 0 0 0)', transition: { duration: 0.8, ease: EASE } } };
  return (
    <section className="hidden bg-cream py-[120px] text-[#141414] md:block">
      <div className="wrap">
        <ChapterHead n="02" title="Design & branding" cream right={<span className="lab !text-[#4a4740]">Brand identities · posters · social design</span>} />
        <motion.div
          className="grid grid-cols-2 gap-4 [grid-auto-rows:200px] lg:grid-cols-12 lg:[grid-auto-rows:120px]"
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          variants={stagger(0.12)}
        >
          <motion.div variants={tile} className="relative flex items-end rounded-lg bg-[#141414] p-[22px] lg:col-[1/6] lg:row-[1/5]">
            <span className="font-display text-[56px] font-extrabold leading-[.9] tracking-[-0.05em] text-cream lg:text-[72px]">
              Brand
              <br />
              identity
            </span>
            <span className="slot bottom-[22px] right-[22px]">Your design</span>
          </motion.div>
          <motion.div variants={tile} className="relative rounded-lg bg-gold lg:col-[6/9] lg:row-[1/3]">
            <span className="slot bottom-[14px] left-4 !text-[#141414]">Logo system</span>
          </motion.div>
          <motion.div variants={tile} className="relative rounded-lg bg-sand lg:col-[9/13] lg:row-[1/4]">
            <span className="slot bottom-[14px] left-4 !text-[#4a4740]">Poster</span>
          </motion.div>
          <motion.div variants={tile} className="relative rounded-lg bg-surface-2 lg:col-[6/9] lg:row-[3/5]">
            <span className="slot bottom-[14px] left-4">Social post</span>
          </motion.div>
          <motion.div variants={tile} className="flex gap-2 rounded-lg bg-[#141414] p-[14px] lg:col-[9/13] lg:row-[4/5]" aria-label="Colour palette">
            {['#dca733', '#f4f1e8', '#3c8f6a', '#2f7db7'].map((c) => (
              <span key={c} className="flex-1 rounded" style={{ background: c }} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* Chapter 03 · Reels floating in phone frames (A5) */
function ContentChapter() {
  return (
    <section className="hidden py-[120px] md:block">
      <div className="wrap">
        <ChapterHead n="03" title="Content & social" right={<span className="lab">Reels · campaigns · content plans</span>} />
        <motion.div className="grid grid-cols-3 gap-4 lg:grid-cols-5" initial="hidden" whileInView="visible" viewport={inView} variants={stagger(0.1)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <motion.div
              key={n}
              variants={{ hidden: { opacity: 0, y: 70 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}
              className={`flex flex-col gap-3 ${n % 2 === 0 ? 'lg:mt-12' : ''}`}
            >
              <motion.div animate={{ y: [0, n % 2 ? -8 : 8, 0] }} transition={{ duration: 5 + n * 0.4, repeat: Infinity, ease: 'easeInOut' }}>
                <ReelSlot label={`Reel ${pad(n)}`} />
              </motion.div>
              <span className="lab">[Reel {pad(n)}]</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* Chapter 04 · Real screens stacking on scroll (A6) */
function SoftwareChapter() {
  const up = (d: number) => ({ initial: { opacity: 0, y: 90 }, whileInView: { opacity: 1, y: 0 }, viewport: inView, transition: { duration: 0.9, delay: d, ease: EASE } });
  return (
    <section className="hidden overflow-hidden bg-bg pb-[140px] pt-[120px] md:block">
      <div className="wrap">
        <ChapterHead n="04" title="Websites & apps" right={<a href="/work/mizan" className="lab !text-gold">Mizan case study →</a>} />
        <div className="relative h-[560px] lg:h-[640px]">
          <motion.a href="/work/atlas" className="absolute left-0 top-10 z-[1] h-[360px] w-[58%] lg:h-[420px]" {...up(0)}>
            <Screen src="/work/atlas/dashboard.png" alt="Atlas dashboard" className="h-full" />
          </motion.a>
          <motion.a href="/work/mizan" className="absolute left-[30%] top-[150px] z-[2] h-[340px] w-[52%] shadow-[0_30px_60px_rgba(0,0,0,.55)] lg:h-[400px]" {...up(0.15)}>
            <Screen src="/work/mizan/dashboard.png" alt="Mizan dashboard" className="h-full" />
          </motion.a>
          <motion.a href="/work/nova" className="absolute right-0 top-5 z-[3] h-[380px] w-[180px] shadow-[0_30px_60px_rgba(0,0,0,.55)] lg:h-[420px] lg:w-[200px]" {...up(0.3)}>
            <Screen src="/work/nova/mobile-home.jpg" alt="Nova mobile app" bar={false} radius={28} className="h-full" />
          </motion.a>
          <div className="absolute bottom-0 left-0 z-[4] flex flex-wrap gap-7">
            {[['Mizan', 'Client project'], ['Atlas', 'AURIC product'], ['Nova', 'Client project']].map(([n, k]) => (
              <span key={n} className="lab">
                <span className="text-cream">{n}</span> · {k}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FilterChips({ f, setF, list, className = '' }: { f: F; setF: (f: F) => void; list: Entry[]; className?: string }) {
  return (
    <div className={`flex gap-[10px] ${className}`} role="group" aria-label="Filter the work">
      {FILTERS.map((d) => {
        const n = d.id === 'all' ? list.length : list.filter((p) => p.group === d.id).length;
        return (
          <button key={d.id} type="button" className="chip md:!rounded md:!text-[14px]" aria-pressed={f === d.id} onClick={() => setF(d.id)}>
            {d.name} <span className="opacity-60">{n}</span>
          </button>
        );
      })}
    </div>
  );
}

/* Archive · every project, filterable (desktop) */
function Archive() {
  const [f, setF] = useState<F>('all');
  const items = ARCHIVE.filter((p) => f === 'all' || p.group === f);
  return (
    <section className="hidden py-[120px] md:block">
      <div className="wrap">
        <ChapterHead n="05" title="The archive" right={<span className="lab">{items.length} projects</span>} />
        <FilterChips f={f} setF={setF} list={ARCHIVE} className="mb-10 flex-wrap" />
        <motion.div layout className="grid grid-cols-2 gap-x-5 gap-y-9 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {items.map((p) => (
              <motion.a
                key={p.name}
                layout
                href={p.href}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col gap-[14px] [&_.frame]:transition-colors [&_.ph]:transition-colors hover:[&_.frame]:border-gold hover:[&_.ph]:border-gold"
              >
                <EntryMedia e={p} />
                <span className="flex items-baseline justify-between gap-[10px]">
                  <span className="h3 !text-[18px]">{p.name}</span>
                  <span className="lab !text-[10.5px]">{p.cat}</span>
                </span>
                <span className="lab !text-[10.5px] !text-gold">{p.kind}</span>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

/* Phone · sticky chips (A2) and the dense two-column feed (A3) */
function PhoneFeed() {
  const [f, setF] = useState<F>('all');
  const items = FEED.filter((p) => f === 'all' || p.group === f);
  return (
    <div className="md:hidden">
      <div className="sticky top-16 z-30 border-y border-[rgba(244,241,232,.1)] bg-ink py-3">
        <FilterChips f={f} setF={setF} list={FEED} className="no-scrollbar overflow-x-auto px-5 [&_.chip]:!min-h-10 [&_.chip]:!px-4 [&_.chip]:!text-[14px]" />
      </div>
      <section className="wrap pb-16 pt-6">
        <div className="mb-4 flex justify-between">
          <span className="lab">{items.length} projects</span>
          <span className="lab !text-gold">Tap a project</span>
        </div>
        <motion.div layout className="grid grid-cols-2 gap-x-3 gap-y-5 [grid-auto-flow:dense]">
          {items.map((p) => {
            const wide = p.type === 'img' || p.type === 'video' || p.type === 'term';
            return (
              <motion.a key={p.name} layout href={p.href} className={`flex flex-col gap-[10px] ${wide ? 'col-span-2' : ''}`} initial="hidden" whileInView="visible" viewport={inView} variants={rise}>
                {p.type === 'img' && <Screen src={p.img!} alt={`${p.name} screen`} ratio="16/10" />}
                {p.type === 'video' && <VideoSlot ratio="16/10" label="Your video" playSize={50} />}
                {p.type === 'design' && <DesignSlot ratio="4/5" size={46} className="!rounded-xl !p-[14px]" />}
                {p.type === 'reel' && (
                  <div className="ph flex aspect-[4/5] items-center justify-center rounded-[18px] border-[5px] !border-surface-2">
                    <PlayButton size={40} />
                  </div>
                )}
                {p.type === 'term' && (
                  <div className="rounded-xl border border-[rgba(244,241,232,.14)] bg-[#0f0f10] p-5 font-mono text-[14px] leading-[1.8] text-copy">
                    <span className="text-gold">$</span> npx create-auric my-app
                    <br />
                    <span className="text-dim">✓ project ready</span>
                  </div>
                )}
                {wide ? (
                  <span className="flex justify-between gap-[10px]">
                    <span className="h3">{p.name}</span>
                    <span className="lab">{p.type === 'video' ? p.cat : p.kind}</span>
                  </span>
                ) : (
                  <>
                    <span className="h3 !text-[15px]">{p.name}</span>
                    <span className="lab -mt-[6px]">{p.cat}</span>
                  </>
                )}
              </motion.a>
            );
          })}
        </motion.div>
      </section>
      <section className="wrap pb-6">
        <a href="/case-studies" className="flex items-center justify-between rounded-[14px] bg-gold px-5 py-6 text-[#141414]">
          <span className="flex flex-col gap-[6px]">
            <span className="lab !text-[#3a3010]">Deep dives</span>
            <span className="font-display text-[28px] font-extrabold leading-none tracking-[-0.04em]">Case studies</span>
          </span>
          <span className="text-[28px]">→</span>
        </a>
      </section>
    </div>
  );
}

export default function Work() {
  return (
    <Layout>
      <Hero />
      <PhoneFeed />
      <ProjectIndex />
      <VideoChapter />
      <DesignChapter />
      <ContentChapter />
      <SoftwareChapter />
      <Archive />
      <BigCTA dark lines={[<>Yours<span className="text-gold">?</span></>]} text="Your project could be the next one here." size="clamp(64px,10vw,150px)" />
    </Layout>
  );
}

