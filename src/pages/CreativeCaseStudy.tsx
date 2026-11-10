import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import BigCTA from '../components/layout/BigCTA';
import { VideoSlot } from '../components/ui/Media';
import { Reveal, TitleReveal } from '../components/ui/Reveal';
import { EASE, drop, inView, rise, stagger, useDragScroll } from '../lib/motion';
import { usePinnedStrip } from '../lib/usePinnedStrip';

// Template for creative work (brand films, identities, campaigns).
// Everything in [brackets] is a placeholder: duplicate this page per project and
// swap in the real film, frames, moodboard and brand images.

function Story({ label, children, first = false }: { label: string; children: React.ReactNode; first?: boolean }) {
  return (
    <Reveal className={`grid gap-[14px] border-b border-[var(--line)] py-10 md:grid-cols-[200px_minmax(0,1fr)] md:gap-10 md:py-12 ${first ? 'border-t' : ''}`}>
      <span className="lab !text-gold">{label}</span>
      <p className="big m-0">{children}</p>
    </Reveal>
  );
}

const slot = (label: string, cls = '', dark = true) => (
  <span className={`slot bottom-[14px] left-4 ${dark ? '' : '!text-[#4a4740]'} ${cls}`}>{label}</span>
);

export default function CreativeCaseStudy() {
  const [after, setAfter] = useState(false);
  const frames = useDragScroll<HTMLDivElement>();
  const framesSection = useRef<HTMLElement>(null);
  usePinnedStrip(framesSection, frames);

  return (
    <Layout>
      {/* V1 · Title reveal */}
      <section className="overflow-hidden pt-8 md:pt-12">
        <div className="wrap flex flex-col gap-7" data-hero-out>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <a href="/case-studies" className="lab tap hover:!text-gold">← Case studies</a>
            <span className="lab !text-gold">Creative case study · template</span>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <TitleReveal lines={[<>[Project]<span className="text-gold">.</span></>]} style={{ fontSize: 'clamp(56px,14vw,210px)', lineHeight: 0.84, letterSpacing: '-0.06em' }} />
            <motion.p className="big max-w-[20ch] pb-4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.7, ease: EASE }}>
              [One line: what we made and for whom.]
            </motion.p>
          </div>
          <div className="grid grid-cols-2 border-y border-[rgba(244,241,232,.14)] md:grid-cols-4">
            {[
              ['Client', '[Client name]'],
              ['Type', 'Brand film · Identity', true],
              ['Services', 'Direction · Edit · Motion · Voice'],
              ['Year', '[Year]'],
            ].map(([k, v, gold], n) => (
              <div key={k as string} className={`flex flex-col gap-2 py-[22px] ${n % 2 ? 'pl-[22px]' : ''} md:pl-[22px] md:first:pl-0 ${n < 3 ? 'md:border-r md:border-[rgba(244,241,232,.14)]' : ''}`}>
                <span className="lab">{k}</span>
                <span className={`text-[16px] md:text-[17px] ${gold ? 'text-gold' : ''}`}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* V2 · The film */}
      <section className="pb-20 pt-10 md:pb-[120px] md:pt-12">
        <motion.div className="wrap" initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={inView} transition={{ duration: 0.9, ease: EASE }}>
          <div className="overflow-hidden rounded-[14px]" data-scrub-scale="0.88" data-cursor="view">
          <VideoSlot ratio="16/9" label="Final film · your video" playSize={104} radius={14}>
            <span className="slot bottom-[22px] right-6 !text-[11px] !text-cream">01:30</span>
          </VideoSlot>
          </div>
        </motion.div>
      </section>

      <section className="pb-20 md:pb-[120px]">
        <div className="wrap">
          <Story label="The brief" first>
            [What the client asked for, in one or two sentences. The audience, the problem and the goal.]
          </Story>
          <Story label="The idea">[The creative idea in one line, and why it fits the brand.]</Story>
        </div>
      </section>

      {/* V3 · Moodboard pieces drop in */}
      <section className="bg-cream py-20 text-[#141414] md:py-[120px]">
        <div className="wrap">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 className="h2">The concept</h2>
            <span className="lab !text-gold-deep">Palette · type · references</span>
          </Reveal>
          <motion.div
            className="grid grid-cols-2 gap-4 [grid-auto-rows:150px] md:grid-cols-12 md:[grid-auto-rows:110px]"
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            variants={stagger(0.12)}
          >
            <motion.div variants={drop} className="relative col-span-2 row-span-2 rounded-[10px] bg-[#141414] md:col-[1/6] md:row-[1/4]">{slot('Reference image')}</motion.div>
            <motion.div variants={drop} className="flex items-end rounded-[10px] bg-gold p-[18px] md:col-[6/9] md:row-[1/3]">
              <span className="font-display text-[56px] font-extrabold leading-[.9] tracking-[-0.05em] md:text-[64px]">Aa</span>
            </motion.div>
            <motion.div variants={drop} className="grid grid-cols-4 gap-2 md:col-[9/13] md:row-[1/2]">
              {['#141414', '#dca733', '#d9d4c7', '#7a5a12'].map((c) => (
                <span key={c} className="rounded-md" style={{ background: c }} />
              ))}
            </motion.div>
            <motion.div variants={drop} className="relative rounded-[10px] bg-sand md:col-[9/13] md:row-[2/4]">{slot('Storyboard sketch', '', false)}</motion.div>
            <motion.div variants={drop} className="relative col-span-2 rounded-[10px] bg-[#141414] md:col-[6/9] md:row-[3/4]">{slot('Mood still')}</motion.div>
          </motion.div>
        </div>
      </section>

      {/* V4 · Frames drag sideways */}
      <section ref={framesSection} className="overflow-hidden py-20 md:py-[120px]">
        <div className="wrap">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 className="h2">Frames</h2>
            <span className="lab">Drag sideways →</span>
          </Reveal>
          <div ref={frames} className="strip pb-[14px]">
            {[
              ['Frame 01', '00:04 · Opening'],
              ['Frame 02', '00:18 · Product'],
              ['Frame 03', '00:42 · Motion graphic'],
              ['Frame 04', '01:20 · End card'],
            ].map(([f, cap]) => (
              <figure key={f} className="m-0 flex w-[300px] flex-col gap-[10px] sm:w-[420px] md:w-[520px]">
                <div className="ph aspect-video rounded-[10px]" role="img" aria-label={`Placeholder: ${f}`}>
                  <span className="slot bottom-3 left-[14px]">{f}</span>
                </div>
                <figcaption className="lab">{cap}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* V5 · Brand pieces slide in */}
      <section className="overflow-hidden bg-bg py-20 md:py-[120px]">
        <div className="wrap">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 className="h2">The brand in use</h2>
            <span className="lab">Poster · social · packaging</span>
          </Reveal>
          <motion.div
            className="grid grid-cols-2 gap-[18px] [grid-auto-rows:160px] md:grid-cols-12 md:[grid-auto-rows:120px]"
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            variants={stagger(0.12)}
          >
            {[
              { cls: 'col-span-2 row-span-2 md:col-[1/5] md:row-[1/5]', x: -60, node: (
                <div className="flex h-full flex-col justify-between rounded-xl bg-cream p-[22px] text-[#141414]">
                  <span className="font-display text-[48px] font-extrabold leading-[.9] tracking-[-0.05em] md:text-[56px]">Poster</span>
                  <span className="lab !text-gold-deep">Your design</span>
                </div>
              ) },
              { cls: 'md:col-[5/9] md:row-[1/3]', x: 0, node: <div className="ph h-full rounded-xl">{slot('Social post')}</div> },
              { cls: 'row-span-2 md:col-[9/13] md:row-[1/5]', x: 60, node: (
                <div className="flex h-full items-center justify-center rounded-xl bg-ink">
                  <div className="ph aspect-[9/19] w-[56%] rounded-[26px] !border-[6px] !border-surface-2">{slot('Story', '!left-[14px] !bottom-3')}</div>
                </div>
              ) },
              { cls: 'md:col-[5/9] md:row-[3/5]', x: 0, node: <div className="ph h-full rounded-xl">{slot('Packaging / merch')}</div> },
            ].map((b, n) => (
              <motion.div key={n} className={b.cls} variants={{ hidden: { opacity: 0, x: b.x, y: b.x ? 0 : 40 }, visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.8, ease: EASE } } }}>
                {b.node}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* V6 · Before / after toggle */}
      <section className="py-20 md:py-[120px]">
        <div className="wrap">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
            <h2 className="h2">
              Before <span className="text-gold">/</span> after
            </h2>
            <div className="flex gap-[10px]" role="group" aria-label="Show before or after">
              <button type="button" className="chip" aria-pressed={!after} onClick={() => setAfter(false)}>Before</button>
              <button type="button" className="chip" aria-pressed={after} onClick={() => setAfter(true)}>After</button>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] md:aspect-[21/9]">
            <AnimatePresence mode="wait" initial={false}>
              {after ? (
                <motion.div
                  key="after"
                  className="absolute inset-0 flex items-center justify-center bg-gold"
                  initial={{ clipPath: 'inset(0 100% 0 0)' }}
                  animate={{ clipPath: 'inset(0 0% 0 0)' }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <span className="font-display text-[48px] font-extrabold tracking-[-0.05em] text-ink md:text-[72px]">After</span>
                  <span className="slot bottom-5 left-[22px] !text-ink">The new brand · your image</span>
                </motion.div>
              ) : (
                <motion.div key="before" className="ph absolute inset-0 flex items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <span className="font-display text-[48px] font-extrabold tracking-[-0.05em] text-charcoal md:text-[72px]">Before</span>
                  <span className="slot bottom-5 left-[22px]">The old brand · your image</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Credits */}
      <section className="bg-bg py-20 md:py-24">
        <div className="wrap">
          <h2 className="h2 mb-9">Credits</h2>
          <motion.div className="grid grid-cols-2 gap-6 md:grid-cols-4" initial="hidden" whileInView="visible" viewport={inView} variants={stagger(0.08)}>
            {['Creative direction', 'Edit', 'Motion', 'Voiceover'].map((r, n) => (
              <motion.div key={r} variants={rise} className={`flex flex-col gap-2 border-t-2 pt-[18px] ${n === 0 ? 'border-gold' : 'border-[rgba(244,241,232,.2)]'}`}>
                <span className="lab">{r}</span>
                <span className="text-[17px]">[Name]</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <BigCTA lines={[<>Want one<span className="text-gold">?</span></>]} size="clamp(56px,9vw,140px)" />
    </Layout>
  );
}
