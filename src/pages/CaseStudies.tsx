import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import BigCTA from '../components/layout/BigCTA';
import { PlayButton } from '../components/ui/Icons';
import { TitleReveal } from '../components/ui/Reveal';
import { CASE_STUDIES, FILTERS, type Group } from '../lib/projects';
import { EASE } from '../lib/motion';

type F = 'all' | Group;

/* W1 title reveal · W2 project cards stack and lift as you scroll */
export default function CaseStudies() {
  const [f, setF] = useState<F>('all');
  const list = CASE_STUDIES.filter((p) => f === 'all' || p.group === f);
  const pattern = ['full', 'half', 'half'] as const;

  return (
    <Layout>
      <section className="pb-16 pt-10 md:pt-14">
        <div className="wrap flex flex-col gap-10">
          <div className="flex flex-wrap items-end justify-between gap-8">
            <TitleReveal
              lines={['Case', <>studies<span className="text-gold">.</span></>]}
              style={{ fontSize: 'clamp(64px,13vw,200px)', lineHeight: 0.84, letterSpacing: '-0.06em' }}
            />
            <motion.div className="flex max-w-[340px] flex-col gap-[14px] pb-[18px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <span className="lab !text-gold">{list.length} projects</span>
              <p className="copy !text-base">The story behind each project: the goal, what we made and how it came together.</p>
              <a href="/work" className="lab !text-cream hover:!text-gold">Visual portfolio →</a>
            </motion.div>
          </div>
          <div className="no-scrollbar -mx-5 flex gap-[10px] overflow-x-auto border-t border-[var(--line)] px-5 pt-7 md:mx-0 md:flex-wrap md:px-0" role="group" aria-label="Filter case studies">
            {FILTERS.map((d) => (
              <button key={d.id} type="button" className="chip" aria-pressed={f === d.id} onClick={() => setF(d.id)}>
                {d.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-[100px] md:pb-[140px]">
        <motion.div layout className="wrap grid grid-cols-12 gap-x-6 gap-y-14 md:gap-y-[72px]">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => {
              let cls: 'full' | 'half' = pattern[i % 3];
              if (cls === 'half' && i % 3 === 1 && i === list.length - 1) cls = 'full';
              const full = cls === 'full';
              return (
                <motion.a
                  key={p.name}
                  layout
                  href={p.href}
                  className={`group col-span-12 flex flex-col ${full ? '' : 'md:col-span-6'}`}
                  initial={{ opacity: 0, y: 70, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.8, ease: EASE }}
                >
                  <div
                    className="relative overflow-hidden rounded-xl border border-[rgba(244,241,232,.1)] bg-surface"
                    style={{ aspectRatio: full ? '21/9' : '4/3' }}
                  >
                    {p.type === 'img' && (
                      <img src={p.img} alt={p.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover object-left-top transition-transform duration-700 group-hover:scale-[1.03]" />
                    )}
                    {(p.type === 'video' || p.type === 'reel') && (
                      <div className="ph absolute inset-0 !border-0">
                        <PlayButton size={72} className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2" />
                      </div>
                    )}
                    {p.type === 'design' && (
                      <div className="absolute inset-0 flex items-start justify-end bg-cream p-7">
                        <span className="font-display text-[80px] font-extrabold leading-[.85] tracking-[-0.06em] text-gold md:text-[120px]">Aa</span>
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-[rgba(10,10,11,.92)] to-transparent" />
                    <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-5 md:inset-x-7 md:bottom-6">
                      <span
                        className="min-w-0 break-words font-display font-extrabold leading-[.9] tracking-[-0.05em] text-cream"
                        style={{ fontSize: full ? 'clamp(44px,9vw,130px)' : 'clamp(32px,4.4vw,64px)' }}
                      >
                        {p.name}
                      </span>
                      <span className="lab shrink-0 whitespace-nowrap !text-gold">
                        {String(i + 1).padStart(2, '0')}<span className="hidden sm:inline"> · View →</span>
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-[18px] md:grid-cols-4">
                    {[
                      ['Type', p.kind, true],
                      ['Category', p.cat],
                      ['Services', p.services],
                      ['Year', p.year],
                    ].map(([k, v, gold]) => (
                      <div key={k as string} className="flex flex-col gap-[6px]">
                        <span className="lab">{k}</span>
                        <span className={`text-[15px] ${gold ? 'text-gold' : ''}`}>{v}</span>
                      </div>
                    ))}
                  </div>
                </motion.a>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </section>

      <BigCTA dark lines={['Next one', <>is <span className="text-gold">yours.</span></>]} size="clamp(56px,9vw,140px)" />
    </Layout>
  );
}
