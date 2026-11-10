import { useRef } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import BigCTA from '../components/layout/BigCTA';
import { Screen } from '../components/ui/Media';
import { FitLine, Reveal, TitleReveal } from '../components/ui/Reveal';
import { SOFTWARE, type SoftwareProject } from '../lib/projects';
import { usePinnedStrip } from '../lib/usePinnedStrip';
import { EASE, inView, rise, stagger, useDragScroll } from '../lib/motion';

const pad = (n: number) => String(n).padStart(2, '0');

function Story({ label, children, first = false, muted = false }: { label: string; children: React.ReactNode; first?: boolean; muted?: boolean }) {
  return (
    <Reveal className={`grid gap-[14px] border-b border-[var(--line)] py-10 md:grid-cols-[200px_minmax(0,1fr)] md:gap-10 md:py-12 ${first ? 'border-t' : ''}`}>
      <span className="lab !text-gold">{label}</span>
      <div data-scrub-words className={`font-display font-medium leading-[1.4] tracking-[-0.01em] ${muted ? 'text-copy' : ''}`} style={{ fontSize: 'clamp(18px,1.7vw,25px)' }}>
        {children}
      </div>
    </Reveal>
  );
}

export default function CaseStudy({ project: p }: { project: SoftwareProject }) {
  const d = p.data;
  const i = SOFTWARE.findIndex((s) => s.slug === p.slug);
  const next = SOFTWARE[(i + 1) % SOFTWARE.length];
  const strip = useDragScroll<HTMLDivElement>();
  const stripSection = useRef<HTMLElement>(null);
  usePinnedStrip(stripSection, strip);
  const screens = [
    ...d.dashboardImages.map((im) => ({ ...im, phone: false })),
    ...d.mobileImages.map((im) => ({ ...im, phone: true })),
  ];
  const hero = p.img ?? d.dashboardImages[0]?.src;
  const isGithub = d.link.includes('github.com');

  return (
    <Layout>
      {/* C1 · Title reveal */}
      <section className="overflow-hidden pt-8 md:pt-12">
        <div className="wrap flex flex-col gap-7" data-hero-out>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <a href="/case-studies" className="lab tap hover:!text-gold">← Case studies</a>
            <span className="lab !text-gold">Case study · {pad(i + 1)}</span>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <TitleReveal
              lines={[<>{d.title}<span className="text-gold">.</span></>]}
              style={{ fontSize: 'clamp(64px,17vw,250px)', lineHeight: 0.82, letterSpacing: '-0.06em' }}
            />
            <motion.p className="big max-w-[20ch] pb-4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.7, ease: EASE }}>
              {p.line}
            </motion.p>
          </div>
          <motion.div
            className="grid grid-cols-2 border-y border-[rgba(244,241,232,.14)] md:grid-cols-4"
            initial="hidden"
            animate="visible"
            variants={stagger(0.08, 0.5)}
          >
            {[
              ['Type', p.kind, true],
              ['Client', p.cat],
              ['Services', p.services],
              ['Year', p.year],
            ].map(([k, v, gold], n) => (
              <motion.div
                key={k as string}
                variants={rise}
                className={`flex flex-col gap-2 py-[22px] ${n % 2 ? 'pl-[22px]' : ''} md:pl-[22px] md:first:pl-0 ${n < 3 ? 'md:border-r md:border-[rgba(244,241,232,.14)]' : ''}`}
              >
                <span className="lab">{k}</span>
                <span className={`text-[16px] md:text-[17px] ${gold ? 'text-gold' : ''}`}>{v}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* C2 · Main screen zooms out to fit */}
      {hero && (
        <section className="pb-20 pt-10 md:pb-[120px] md:pt-12">
          <div className="wrap">
            <motion.div
              className="overflow-hidden rounded-[10px]"
              initial={{ clipPath: 'inset(6% 6% 6% 6% round 10px)' }}
              whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 10px)' }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.1, ease: EASE }}
            >
              <motion.div initial={{ scale: 1.15 }} whileInView={{ scale: 1 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 1.4, ease: EASE }}>
                <Screen src={hero} alt={`${d.title} main screen`} className="aspect-[4/3] md:aspect-[16/8.5]" />
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Story */}
      <section className="pb-20 md:pb-[120px]">
        <div className="wrap">
          <Story label="The objective" first>
            {d.overview[0]}
          </Story>
          {d.overview[1] && <Story label="What we did">{d.overview[1]}</Story>}
          <Story label="Deliverables" muted>
            {d.modules.map((m) => m.title).join(' · ')}
          </Story>
        </div>
      </section>

      {/* C3 · Screen strip */}
      {screens.length > 1 && (
        <section ref={stripSection} className="overflow-hidden bg-bg py-20 md:py-[120px]">
          <div className="wrap">
            <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <h2 className="h2">Inside the product</h2>
              <span className="lab">Drag sideways →</span>
            </Reveal>
            <div ref={strip} className="strip !gap-6 pb-[14px]">
              {screens.map((s, n) => (
                <figure key={s.src} className={`m-0 flex flex-col gap-3 ${s.phone ? 'w-[220px] md:w-[260px]' : 'w-[300px] sm:w-[520px] md:w-[720px]'}`}>
                  <Screen src={s.src} alt={s.alt} ratio={s.phone ? '9/19' : '16/10'} bar={!s.phone} radius={s.phone ? 26 : undefined} />
                  <figcaption className="lab">
                    {pad(n + 1)} · {s.alt.replace(new RegExp(`^${d.title}\\s*`, 'i'), '')}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="py-20 md:py-[120px]">
        <div className="wrap">
          <Reveal>
            <h2 className="h2 mb-10">What it does</h2>
          </Reveal>
          <motion.ol className="m-0 grid list-none gap-x-8 p-0 md:grid-cols-2 lg:grid-cols-3" initial="hidden" whileInView="visible" viewport={inView} variants={stagger(0.08)}>
            {d.features.slice(0, 6).map((f, n) => (
              <motion.li key={f} variants={rise} className="flex flex-col gap-[14px] border-t border-[rgba(244,241,232,.14)] py-[30px]">
                <span className={`num-xl text-[48px] md:text-[56px] ${n === 0 || n === 5 ? 'text-gold' : 'stroke-gold'}`}>{pad(n + 1)}</span>
                <span className="font-display text-[19px] font-medium leading-[1.3] md:text-[22px]">{f}</span>
              </motion.li>
            ))}
          </motion.ol>
          <Reveal className="mt-10 flex flex-col gap-4 border-t border-[var(--line)] pt-8">
            <span className="lab !text-gold">Built with</span>
            <div className="flex flex-wrap gap-2" data-pop>
              {Array.from(new Set(d.techGroups.flatMap((g) => g.items))).map((t) => (
                <span key={t} className="rounded-full border border-[var(--line-strong)] px-[14px] py-[6px] text-[14px] text-copy">
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* The result */}
      <section className="pb-20 md:pb-[100px]">
        <div className="wrap">
          <Story label="The result" first>
            {d.impact}
          </Story>
        </div>
      </section>

      {/* C4 · Next project wipes in on hover */}
      <a href={next.href} className="group relative block overflow-hidden bg-bg">
        <span aria-hidden="true" className="absolute inset-0 origin-left scale-x-0 bg-gold transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-x-100" />
        <section className="relative py-20 md:py-[110px]">
          <div className="wrap grid items-center gap-12 md:grid-cols-2">
            <div className="flex flex-col gap-[18px] transition-colors duration-500 group-hover:text-ink">
              <span className="lab !text-gold transition-colors duration-500 group-hover:!text-ink">Next project</span>
              <FitLine className="font-display font-extrabold leading-[.82] tracking-[-0.06em]" style={{ fontSize: 'clamp(44px,7.5vw,120px)' }}>
                {next.name} →
              </FitLine>
              <span className="lab transition-colors duration-500 group-hover:!text-ink">
                {next.kind} · {next.cat}
              </span>
            </div>
            {next.img && <div data-parallax="0.1"><Screen src={next.img} alt={`${next.name} screen`} ratio="16/10" className="transition-transform duration-700 group-hover:-rotate-1 group-hover:scale-[1.02]" /></div>}
          </div>
        </section>
      </a>

      <BigCTA
        lines={[<>Need one<span className="text-gold">?</span></>]}
        size="clamp(56px,9vw,140px)"
        secondary={{ label: isGithub ? 'View on GitHub ↗' : 'Visit live demo ↗', href: d.link, external: true }}
      />
    </Layout>
  );
}
