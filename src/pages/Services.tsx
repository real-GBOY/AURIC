import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import Layout from '../components/layout/Layout';
import BigCTA from '../components/layout/BigCTA';
import { PlayButton } from '../components/ui/Icons';
import { Screen } from '../components/ui/Media';
import { Reveal, TitleReveal } from '../components/ui/Reveal';
import { PACKAGES } from '../lib/content';
import { CTA_HREF } from '../lib/site';
import { EASE, drop, inView, rise, stagger } from '../lib/motion';

const pad = (n: number) => String(n).padStart(2, '0');

/* Numbered service list (two columns on desktop). */
function ServiceList({ items, cream = false }: { items: string[]; cream?: boolean }) {
  return (
    <motion.ul
      className="grid list-none gap-x-10 p-0 lg:grid-cols-2"
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      variants={stagger(0.04)}
    >
      {items.map((s, i) => (
        <motion.li
          key={s}
          variants={rise}
          className={`flex items-center justify-between border-b py-[18px] font-display font-medium tracking-[-0.01em] ${
            cream ? 'border-[rgba(20,20,20,.16)]' : 'border-[rgba(244,241,232,.14)]'
          }`}
          style={{ fontSize: 'clamp(18px,1.6vw,24px)' }}
        >
          {s}
          <span className={`font-mono text-[11px] tracking-[0.1em] ${cream ? 'text-gold-deep' : 'text-muted'}`}>{pad(i + 1)}</span>
        </motion.li>
      ))}
    </motion.ul>
  );
}

/* Chapter header: "01 / AURIC Create" + giant word + one line. */
function Chapter({ n, name, line, cream = false, outline = false }: { n: string; name: string; line: string; cream?: boolean; outline?: boolean }) {
  return (
    <div className="mb-14 flex flex-wrap items-end justify-between gap-6 lg:flex-nowrap">
      <div className="flex min-w-0 max-w-full flex-col gap-[10px] lg:shrink-0" data-scrub-x="-4">
        <span className={`lab ${cream ? '!text-gold-deep' : '!text-gold'}`}>
          {n} / AURIC {name}
        </span>
        <TitleReveal
          as="h2"
          onLoad={false}
          style={{ fontSize: 'clamp(64px,12vw,180px)' }}
          lines={[
            <>
              <span className={outline ? 'stroke-cream [-webkit-text-stroke-width:2px]' : ''}>{name}</span>
              <span className="text-gold">.</span>
            </>,
          ]}
        />
      </div>
      <Reveal as="p" className={`max-w-[34ch] text-[18px] leading-[1.5] ${cream ? 'text-[#4a4740]' : 'text-copy'}`}>
        {line}
      </Reveal>
    </div>
  );
}

function ChapterFoot({ note, cta, dark = false, noteIsLab = false }: { note?: ReactNode; cta: string; dark?: boolean; noteIsLab?: boolean }) {
  return (
    <div className={`mt-12 flex flex-wrap items-center gap-5 ${note ? 'justify-between' : 'justify-end'}`}>
      {note && <span className={noteIsLab ? 'lab' : 'text-[15px] text-[#4a4740]'}>{note}</span>}
      <a href={CTA_HREF} className={`btn ${dark ? 'btn-dark' : 'btn-gold'}`}>
        {cta}
      </a>
    </div>
  );
}

/* S1 · Hero with the division index */
function Hero() {
  const idx = [
    { id: 'create', w: 'Create', l: '01 · Video · design · voice' },
    { id: 'strategy', w: 'Strategy', l: '02 · Plans · content' },
    { id: 'build', w: 'Build', l: '03 · Websites · apps · AI' },
    { id: 'manage', w: 'Manage', l: '04 · Delivery', outline: true },
  ];
  return (
    <section className="pb-24 pt-12 md:pt-16">
      <div className="wrap flex flex-col gap-14">
        <div className="flex flex-col gap-7" data-hero-out>
          <span className="lab !text-gold">Services</span>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <TitleReveal lines={[<>One partner<span className="text-gold">.</span></>]} style={{ fontSize: 'clamp(52px,10vw,150px)' }} />
            <motion.p className="copy max-w-[30ch] pb-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              Four divisions planned together, so every part of your project fits.
            </motion.p>
          </div>
        </div>
        <motion.nav aria-label="Divisions" initial="hidden" animate="visible" variants={stagger(0.1, 0.35)}>
          {idx.map((d) => (
            <motion.a
              key={d.id}
              href={`#${d.id}`}
              variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } } }}
              className="group flex flex-col gap-2 border-b border-[var(--line)] py-[22px] sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
            >
              <span
                className={`font-display font-extrabold leading-[.95] tracking-[-0.05em] transition-colors group-hover:text-gold ${d.outline ? 'stroke-gold' : ''}`}
                style={{ fontSize: 'clamp(44px,6vw,92px)' }}
              >
                {d.w}
              </span>
              <span className="lab">{d.l}</span>
            </motion.a>
          ))}
        </motion.nav>
      </div>
    </section>
  );
}

/* 01 · Create — cream editorial with dropping collage (S2) */
function Create() {
  return (
    <section id="create" data-expand className="bg-cream py-[88px] text-[#141414] md:py-[120px]">
      <div className="wrap">
        <Chapter n="01" name="Create" line="Video, design, motion and voice from one directed team." cream />
        <motion.div
          className="mb-16 grid grid-cols-2 gap-4 [grid-auto-rows:120px] md:grid-cols-12 md:[grid-auto-rows:96px]"
          data-parallax="0.06"
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          variants={stagger(0.12)}
        >
          <motion.div variants={drop} className="relative col-span-2 row-span-2 flex items-center justify-center rounded-[10px] bg-[#141414] md:col-[1/8] md:row-[1/5]">
            <PlayButton size={80} />
            <span className="slot bottom-4 left-[18px]">Video edit · your work</span>
          </motion.div>
          <motion.div variants={drop} className="relative col-span-2 flex items-end rounded-[10px] bg-gold p-5 md:col-[8/13] md:row-[1/3]">
            <span className="font-display text-[64px] font-extrabold leading-[.9] tracking-[-0.05em]">Aa</span>
            <span className="slot bottom-4 right-[18px] !text-[#141414]">Brand identity</span>
          </motion.div>
          <motion.div variants={drop} className="relative rounded-[10px] bg-[#141414] md:col-[8/11] md:row-[3/5]">
            <span className="slot bottom-[14px] left-4">Poster</span>
          </motion.div>
          <motion.div variants={drop} className="relative rounded-[10px] bg-sand md:col-[11/13] md:row-[3/5]">
            <span className="slot bottom-3 left-[14px] !text-[#4a4740]">Motion</span>
          </motion.div>
        </motion.div>
        <ServiceList
          cream
          items={['Graphic Design', 'Visual Design', 'Creative Direction', 'Content Creation', 'Video Editing', 'Audio Editing', 'Voiceover Production', 'Motion Graphics', 'Creative Marketing Assets']}
        />
        <ChapterFoot note="Brand identities · Social and ad creatives · Reels · Motion · Voiceovers · Print" cta="Discuss creative work" dark />
      </div>
    </section>
  );
}

const CAL = [
  'g', 'd', 'c', 'd', 'g', 'd', 'd',
  'd', 'c', 'd', 'g', 'd', 'c', 'd',
  'g', 'd', 'd', 'c', 'd', 'g', 'd',
];

/* 02 · Strategy — calendar fills cell by cell (S3) */
function Strategy() {
  return (
    <section id="strategy" className="py-[88px] md:py-[120px]">
      <div className="wrap">
        <Chapter n="02" name="Strategy" line="A plan before anything is made, so every piece of content has a job." />
        <div className="mb-16 grid items-start gap-14 lg:grid-cols-2">
          <div className="flex flex-col gap-[14px] rounded-[10px] bg-surface p-[30px]">
            <div className="flex justify-between">
              <span className="h3 !text-[17px]">Content calendar</span>
              <span className="lab !text-[11px] !text-gold">Example layout</span>
            </div>
            <motion.div
              className="grid grid-cols-7 gap-2 [grid-auto-rows:44px] md:[grid-auto-rows:56px]"
              aria-hidden="true"
              initial="hidden"
              whileInView="visible"
              viewport={inView}
              variants={stagger(0.045)}
            >
              {CAL.map((c, i) => (
                <motion.span
                  key={i}
                  className="rounded"
                  variants={{
                    hidden: { backgroundColor: '#2a2a2e', scale: 0.7, opacity: 0.4 },
                    visible: { backgroundColor: c === 'g' ? '#dca733' : c === 'c' ? '#f4f1e8' : '#2a2a2e', scale: 1, opacity: 1, transition: { duration: 0.35 } },
                  }}
                />
              ))}
            </motion.div>
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={inView} variants={stagger(0.12)}>
            {[
              { w: 'Plan', d: 'Goals, audience and message', cls: 'text-gold' },
              { w: 'Make', d: 'Produced by AURIC Create', cls: '' },
              { w: 'Publish', d: 'On a calendar, reviewed monthly', cls: 'stroke-cream' },
            ].map((r) => (
              <motion.div key={r.w} variants={rise} className="flex flex-wrap items-baseline gap-5 border-b border-[var(--line)] py-[22px]">
                <span className={`font-display text-[44px] font-extrabold leading-none tracking-[-0.05em] md:text-[56px] ${r.cls}`}>{r.w}</span>
                <span className="copy !text-[15px]">{r.d}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <ServiceList items={['Marketing Planning', 'Digital Strategy', 'Content Strategy', 'Campaign Planning', 'Digital Presence Strategy', 'Creative Marketing', 'Brand Communication Planning']} />
        <ChapterFoot note="We plan and measure. We don't promise guaranteed results." noteIsLab cta="Discuss a plan" />
      </div>
    </section>
  );
}

/* 03 · Build — real screens slide up into place (S4) */
function Build() {
  const up = (delay: number) => ({
    initial: { opacity: 0, y: 80 },
    whileInView: { opacity: 1, y: 0 },
    viewport: inView,
    transition: { duration: 0.8, delay, ease: EASE },
  });
  return (
    <section id="build" className="overflow-hidden bg-bg py-[88px] md:py-[120px]">
      <div className="wrap">
        <Chapter n="03" name="Build" line="Websites, apps and systems, engineered on a tested foundation." />
        <div className="relative mb-16 h-[340px] sm:h-[460px] md:h-[560px]">
          <motion.div className="absolute left-0 top-0 z-[1] h-[62%] w-[78%] md:h-[400px] md:w-[60%]" {...up(0)}>
            <div className="h-full" data-parallax="0.04"><Screen src="/work/atlas/dashboard.png" alt="Atlas dashboard" className="h-full" /></div>
          </motion.div>
          <motion.div className="absolute left-[16%] top-[38%] z-[2] h-[58%] w-[70%] shadow-[0_30px_60px_rgba(0,0,0,.55)] md:left-[34%] md:top-[130px] md:h-[380px] md:w-[48%]" {...up(0.15)}>
            <div className="h-full" data-parallax="0.12"><Screen src="/work/hotel-os/website-booking.png" alt="HotelOS booking website" className="h-full" /></div>
          </motion.div>
          <motion.div className="absolute right-0 top-[10%] z-[3] h-[78%] w-[28%] shadow-[0_30px_60px_rgba(0,0,0,.55)] md:top-10 md:h-[420px] md:w-[200px]" {...up(0.3)}>
            <div className="h-full" data-parallax="0.22"><Screen src="/work/ajwadi/mobile-home-client.png" alt="Ajwadi mobile app" bar={false} radius={28} className="h-full" /></div>
          </motion.div>
        </div>
        <ServiceList
          items={['Custom Software', 'Web Development', 'Mobile Apps', 'Digital Platforms', 'Business Systems', 'Internal Tools', 'AI Integration', 'AI Automation', 'Process Automation', 'APIs and Integrations', 'Digital Products']}
        />
        <ChapterFoot note="Mizan · Atlas · HotelOS · Nova · create-auric" noteIsLab cta="Discuss a build" />
      </div>
    </section>
  );
}

/* 04 · Manage — delivery track ticks one by one (S5) */
function Manage() {
  const steps = [
    { t: 'Brief', d: 'Scope and plan agreed' },
    { t: 'Team', d: 'The right specialists briefed' },
    { t: 'Make', d: 'Weekly updates' },
    { t: 'Review', d: 'Checked before you see it' },
    { t: 'Deliver', d: 'On time, supported after' },
  ];
  return (
    <section id="manage" className="py-[88px] md:py-[120px]">
      <div className="wrap">
        <Chapter n="04" name="Manage" line="One owner coordinating every specialist, deadline and review." outline />
        <div className="relative mb-16 pt-[30px]">
          <div
            aria-hidden="true"
            data-draw
            className="absolute left-[25px] top-[56px] hidden h-[2px] origin-left bg-gradient-to-r from-gold to-[rgba(220,167,51,.2)] md:right-0 md:block"
          />
          <motion.div className="grid gap-5 sm:grid-cols-2 md:grid-cols-5" initial="hidden" whileInView="visible" viewport={inView} variants={stagger(0.25, 0.2)}>
            {steps.map((s, i) => {
              const last = i === steps.length - 1;
              return (
                <motion.div key={s.t} variants={rise} className="relative flex flex-row items-center gap-4 md:flex-col md:items-start md:gap-3">
                  {last ? (
                    <span className="m-1 h-11 w-11 shrink-0 rotate-45 bg-gold" />
                  ) : (
                    <motion.span
                      className="h-[52px] w-[52px] shrink-0 rounded-full border-2 border-gold"
                      variants={{ hidden: { backgroundColor: '#0a0a0b' }, visible: { backgroundColor: i === 0 ? '#dca733' : '#0a0a0b' } }}
                    />
                  )}
                  <span className="flex flex-col gap-1 md:gap-3">
                    <span className={`h3 !text-[18px] ${last ? 'text-gold' : ''}`}>{s.t}</span>
                    <span className="copy !text-[14px]">{s.d}</span>
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
        <ServiceList items={['Project Management', 'Digital Project Coordination', 'Production Coordination', 'Resource Management', 'Delivery Planning', 'Quality Assurance']} />
        <ChapterFoot cta="Discuss a project" />
      </div>
    </section>
  );
}

/* S6 · Ways to work with us — package cards rise in a stagger */
function Packages() {
  return (
    <section id="packages" className="border-t border-[rgba(244,241,232,.1)] bg-ink py-[88px] md:py-[120px]">
      <div className="wrap">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-8">
          <TitleReveal
            as="h2"
            onLoad={false}
            className="font-display font-extrabold leading-[.9] tracking-[-0.045em]"
            style={{ fontSize: 'clamp(44px,7vw,104px)' }}
            lines={['Ways to work', <>with us<span className="text-gold">.</span></>]}
          />
          <Reveal as="p" className="copy max-w-[34ch] pb-[10px]">
            Pick the package closest to what you need. Every project is priced after a short call.
          </Reveal>
        </div>
        <motion.div
          className="grid gap-[18px] sm:grid-cols-2 xl:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          variants={stagger(0.12)}
        >
          {PACKAGES.map((p, i) => {
            const f = !!p.featured;
            return (
              <motion.div
                key={p.name}
                variants={{ hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } } }}
                whileHover={{ y: -6 }}
                className={`flex min-h-[460px] flex-col gap-[18px] rounded-[14px] px-[26px] py-[30px] md:min-h-[520px] ${
                  f ? 'bg-gold text-ink' : 'border border-[var(--line)] bg-surface'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`lab ${f ? '!text-[#3a3010]' : ''}`}>{pad(i + 1)}</span>
                  {f && <span className="lab rounded-full bg-ink px-[10px] py-[5px] !text-[11px] !text-gold">Start here</span>}
                </div>
                <h3 className="font-display text-[30px] font-extrabold leading-none tracking-[-0.045em]">{p.name}</h3>
                <span className={`text-[15px] ${f ? 'text-[#3a3010]' : 'text-muted'}`}>{p.who}</span>
                <ul className="m-0 flex-1 list-none p-0">
                  {p.items.map((it) => (
                    <li
                      key={it}
                      className={`flex items-baseline gap-[10px] border-b py-[9px] text-[15px] leading-[1.45] ${f ? 'border-[rgba(10,10,11,.15)]' : 'border-[rgba(244,241,232,.1)]'}`}
                    >
                      <span className={f ? 'text-ink' : 'text-gold'}>+</span>
                      {it}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between gap-3">
                  <span className={`lab ${f ? '!text-[#3a3010]' : ''}`}>{p.time}</span>
                  <a href={`${CTA_HREF}?package=${encodeURIComponent(p.name)}`} className={`tap text-[15px] font-semibold ${f ? 'text-ink hover:underline' : 'hover:text-gold'}`}>
                    Ask about this →
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default function Services() {
  return (
    <Layout>
      <Hero />
      <Create />
      <Strategy />
      <Build />
      <Manage />
      <Packages />
      <BigCTA dark lines={['Not sure?', <span className="text-gold">Let's talk.</span>]} size="clamp(52px,10vw,150px)" />
    </Layout>
  );
}
