import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import BigCTA from '../components/layout/BigCTA';
import DivisionPreview from '../components/home/DivisionPreview';
import { CalendarPill, CodePill, DeliveredPill, TimelinePill } from '../components/home/HeroPills';
import { AuricMark } from '../components/Logo';
import { DesignSlot, ReelSlot, Screen, VideoSlot } from '../components/ui/Media';
import { Reveal } from '../components/ui/Reveal';
import { AUDIENCES, CLIENT_LOGOS, PACKAGES, QUOTES, SHOWREEL, type DivisionKey } from '../lib/content';
import { HOME as C } from '../lib/home-copy';
import { ARROW, href, isAr } from '../lib/i18n';
import { CTA_HREF } from '../lib/site';
import { EASE, inView, lineUp, pillGrow, rise, stagger, useDragScroll } from '../lib/motion';

const pad = (n: number) => String(n).padStart(2, '0');

/* ─── H1 · Hero: giant lines with inline media pills ─────────────────────── */
function Hero() {
  const line = 'flex flex-wrap items-center gap-[clamp(14px,2vw,28px)] transition-colors hover:text-gold';
  const pill = (node: React.ReactNode, delay: number) => (
    <motion.span
      className="hidden origin-left md:inline-flex rtl:origin-right"
      variants={pillGrow}
      transition={{ delay }}
    >
      {node}
    </motion.span>
  );
  const rows: { href: string; content: React.ReactNode }[] = [
    { href: href('/services#create'), content: <><span className="mega">{C.hero[0]}</span>{pill(<TimelinePill />, 0.5)}</> },
    { href: href('/services#strategy'), content: <>{pill(<CalendarPill />, 0.62)}<span className="mega">{C.hero[1]}</span></> },
    { href: href('/services#build'), content: <><span className="mega">{C.hero[2]}</span>{pill(<CodePill />, 0.74)}</> },
    { href: href('/services#manage'), content: <>{pill(<DeliveredPill />, 0.86)}<span className="mega">{C.hero[3]}<span className="text-gold">.</span></span></> },
  ];

  return (
    <section className="relative pb-9 pt-7 md:pb-14 md:pt-16">
      <div className="wrap flex flex-col">
        <div className="mb-[22px] flex flex-wrap items-center justify-between gap-4 md:mb-[18px]">
          <span className="lab !text-gold">{C.eyebrow}</span>
          <span className="lab hidden md:inline">{C.eyebrowRight}</span>
        </div>

        <motion.h1 className="flex flex-col gap-[6px] md:gap-[clamp(8px,1.2vw,16px)]" initial="hidden" animate="visible" variants={stagger(0.12)}>
          {rows.map((r) => (
            <span key={r.href} className="block overflow-hidden pb-[0.05em]">
              <motion.a href={r.href} className={line} variants={lineUp}>
                {r.content}
              </motion.a>
            </span>
          ))}
        </motion.h1>

        {/* Phone: the four pills become one row under the headline */}
        <motion.div className="mt-[26px] flex gap-2 md:hidden" initial="hidden" animate="visible" variants={stagger(0.08, 0.6)}>
          {[TimelinePill, CalendarPill, CodePill, DeliveredPill].map((P, i) => (
            <motion.span key={i} className="flex flex-1 origin-left rtl:origin-right" variants={pillGrow}>
              <P size="sm" />
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          className="mt-[26px] flex flex-col gap-6 md:mt-9 md:flex-row md:flex-wrap md:items-end md:justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7, ease: EASE }}
        >
          <p className="copy max-w-[44ch]">
            {C.heroText}
          </p>
          <div className="flex flex-col gap-[10px] sm:flex-row sm:gap-3">
            <a href={href(CTA_HREF)} className="btn btn-gold">{C.start}</a>
            <a href="/work" className="btn btn-line">{C.explore}</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── H2 · Showreel ──────────────────────────────────────────────────────── */
function Showreel() {
  return (
    <motion.section
      className="pb-9 md:pb-10"
      initial={{ opacity: 0, scale: 0.97 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={inView}
      transition={{ duration: 0.9, ease: EASE }}
    >
      <div className="wrap">
        <div className="hidden md:block">
          <VideoSlot ratio="21/9" label={C.showreel} src={SHOWREEL.src} playSize={96} />
        </div>
        <div className="md:hidden">
          <VideoSlot ratio="4/5" label={C.showreelPhone} src={SHOWREEL.vertical || SHOWREEL.src} playSize={76} radius={14} />
        </div>
      </div>
    </motion.section>
  );
}

/* ─── H3 · Service marquee ───────────────────────────────────────────────── */
function Marquee() {
  const words = [...C.marquee, ...C.marquee];
  return (
    <div className="group overflow-hidden whitespace-nowrap border-y border-[rgba(244,241,232,.1)] py-6 md:py-10" aria-hidden="true">
      <div className="inline-flex animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {words.map((w, i) => (
          <span
            key={i}
            className={`pl-[22px] font-display text-[38px] font-extrabold tracking-[-0.04em] md:pl-10 md:text-[64px] ${i % 2 ? 'stroke-gold' : ''}`}
          >
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── H4 · Divisions: hover list + sticky preview (desktop), accordion (phone) ─ */
function Divisions() {
  const [active, setActive] = useState(0);
  const [openKey, setOpenKey] = useState<DivisionKey | null>('create');
  const cur = C.divisions[active];

  return (
    <section className="py-[72px] md:py-[120px]">
      <div className="wrap">
        <Reveal className="mb-6 flex flex-wrap items-end justify-between gap-6 md:mb-8">
          <h2 className="h2">{C.whatWeDo}</h2>
          <span className="lab hidden md:inline">{C.hover}</span>
          <span className="lab md:hidden">{C.tap}</span>
        </Reveal>

        {/* Desktop */}
        <div className="hidden items-start gap-12 md:grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <div>
            {C.divisions.map((d, i) => {
              const on = i === active;
              return (
                <button
                  key={d.key}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={on}
                  className={`grid w-full grid-cols-[72px_minmax(0,1fr)_auto] items-center gap-5 border-b border-[var(--line)] py-[26px] text-start transition-colors ${on ? 'text-gold' : ''}`}
                >
                  <span className={`lab ${on ? '!text-gold' : ''}`}>{pad(i + 1)}</span>
                  <span className="font-display font-bold leading-none tracking-[-0.04em]" style={{ fontSize: 'clamp(34px,4.4vw,64px)' }}>
                    <motion.span className="inline-block" animate={{ x: on ? (isAr ? -12 : 12) : 0 }} transition={{ duration: 0.35, ease: EASE }}>
                      {d.name}
                    </motion.span>
                  </span>
                  <span className={`lab ${on ? '!text-gold' : ''}`}>
                    {d.short}
                    {on ? ` ${ARROW}` : ''}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="sticky top-24 flex flex-col gap-[18px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={cur.key}
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <DivisionPreview k={cur.key} />
              </motion.div>
            </AnimatePresence>
            <p className="copy">{cur.desc}</p>
            <a href={href(`/services#${cur.key}`)} className="lab !text-cream hover:!text-gold">
              {cur.see} {ARROW}
            </a>
          </div>
        </div>

        {/* Phone accordion */}
        <div className="md:hidden">
          {C.divisions.map((d, i) => {
            const open = openKey === d.key;
            return (
              <div key={d.key} className="border-b border-[var(--line)]">
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenKey(open ? null : d.key)}
                  className={`flex w-full items-center gap-[14px] py-5 text-start ${open ? 'text-gold' : ''}`}
                >
                  <span className={`lab ${open ? '!text-gold' : ''}`}>{pad(i + 1)}</span>
                  <span className="flex-1 font-display text-[36px] font-bold leading-none tracking-[-0.04em]">{d.name}</span>
                  <span className={`text-2xl ${open ? '' : 'text-muted'}`}>{open ? '−' : '+'}</span>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-4 pb-[22px]">
                        <DivisionPreview k={d.key} compact />
                        <p className="copy !text-[15px]">{d.phoneDesc}</p>
                        <a href={href(`/services#${d.key}`)} className="lab !text-cream">
                          {d.see} {ARROW}
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── H5 · Selected work strip ───────────────────────────────────────────── */
function SelectedWork() {
  const ref = useDragScroll<HTMLDivElement>();
  const [page, setPage] = useState(0);
  const cards = [
    { title: C.work.brandFilm, tag: C.work.video, href: '/work', w: 'w-[300px] md:w-[640px]', media: <VideoSlot ratio="16/10" label={C.work.yourVideo} radius={10} className="hidden md:flex" />, phone: <VideoSlot ratio="4/5" label={C.work.yourVideo} radius={12} className="md:hidden" /> },
    { title: C.work.identity, tag: C.work.design, href: '/work', w: 'w-[300px] md:w-[400px]', media: <DesignSlot ratio="4/5" label={C.work.yourDesign} />, phone: null },
    { title: C.work.mizan, tag: C.work.mizanTag, href: '/work/mizan', w: 'w-[300px] md:w-[640px]', media: <><Screen src="/work/mizan/dashboard.png" alt="Mizan dashboard" ratio="16/10" className="hidden md:block" /><Screen src="/work/mizan/dashboard.png" alt="Mizan dashboard" ratio="4/5" className="md:hidden" /></>, phone: null },
    { title: C.work.reel, tag: C.work.content, href: '/work', w: 'hidden md:flex md:w-[300px]', media: <ReelSlot />, phone: null },
  ];

  return (
    <section className="overflow-hidden bg-bg py-[72px] md:py-[120px]">
      <div className="wrap">
        <Reveal className="mb-6 flex flex-wrap items-end justify-between gap-6 md:mb-10">
          <h2 className="h2">
            {C.selected[0]} <br className="md:hidden" />
            {C.selected[1]}
          </h2>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a href="/case-studies" className="lab !text-cream hover:!text-gold">
              {C.caseStudies} {ARROW}
            </a>
            <a href="/work" className="lab !text-gold">
              <span className="hidden md:inline">{C.fullPortfolio} {ARROW}</span>
              <span className="md:hidden">{C.allWork} {ARROW}</span>
            </a>
          </div>
        </Reveal>
        <motion.div
          ref={ref}
          className="strip no-scrollbar -mx-5 scroll-px-5 gap-[14px] px-5 md:mx-0 md:scroll-px-0 md:gap-5 md:px-0 md:[scrollbar-width:thin]"
          onScroll={(e) => {
            const el = e.currentTarget;
            setPage(Math.round(el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth) * 2));
          }}
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          variants={stagger(0.1)}
        >
          {cards.map((c) => (
            <motion.a key={c.title} href={c.href} className={`flex flex-col gap-[10px] md:gap-[14px] ${c.w}`} variants={rise}>
              {c.media}
              {c.phone}
              <span className="flex justify-between gap-3">
                <span className="h3">{c.title}</span>
                <span className="lab">{c.tag}</span>
              </span>
            </motion.a>
          ))}
        </motion.div>
        <div className="mt-4 flex gap-[6px] md:hidden" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span key={i} className={`h-1 rounded-sm transition-all ${i === page ? 'w-[22px] bg-gold' : 'w-2 bg-charcoal'}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── How we work ────────────────────────────────────────────────────────── */
function HowWeWork() {
  return (
    <section className="py-[72px] md:py-[120px]">
      <div className="wrap">
        <Reveal className="mb-6 flex flex-wrap items-end justify-between gap-6 md:mb-10">
          <h2 className="h2">
            {C.how[0]} <br className="md:hidden" />
            {C.how[1]}
          </h2>
          <span className="lab">
            <span className="hidden md:inline">{C.howRight}</span>
            <span className="md:hidden">{C.howRightPhone}</span>
          </span>
        </Reveal>
        <motion.ol
          className="grid grid-cols-2 border-t border-[var(--line)] lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          variants={stagger(0.1)}
        >
          {C.steps.map((s, i) => (
            <motion.li
              key={s.title}
              variants={rise}
              className={`flex flex-col gap-[10px] border-b border-[var(--line)] py-[22px] md:gap-[14px] md:pb-0 md:pt-8 lg:border-b-0 ${
                i % 2 === 0 ? 'border-e pe-[14px] md:pe-6' : 'ps-[14px] md:ps-6'
              } lg:border-e lg:px-6 lg:first:ps-0 lg:last:border-e-0`}
            >
              <span className={`num-xl text-[54px] md:text-[96px] ${i === 0 || i === 3 ? 'text-gold' : 'stroke-gold'}`}>{pad(i + 1)}</span>
              <span className="h3">{s.title}</span>
              <p className="copy !text-[14px] md:!text-base"><span className="md:hidden">{s.phone}</span><span className="hidden md:inline">{s.desc}</span></p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}

/* ─── Who we work with ───────────────────────────────────────────────────── */
function WhoWeWorkWith() {
  const word = 'font-display font-bold tracking-[-0.04em] leading-[1.25] md:leading-[1.15]';
  return (
    <section className="bg-bg py-[72px] md:py-[120px]">
      <div className="wrap">
        <span className="lab mb-5 block !text-gold md:mb-7">{C.whoLabel}</span>
        <Reveal as="p" className="m-0">
          {AUDIENCES.map((a, i) => (
            <span key={a.label} className="inline">
              <a href={a.href} className={`${word} whitespace-nowrap transition-colors hover:text-gold`} style={{ fontSize: 'clamp(30px,4vw,60px)' }}>
                {C.audiences[i]}
              </a>{' '}
              <span className="px-[.25em] font-display font-light text-charcoal" style={{ fontSize: 'clamp(30px,4vw,60px)' }}>/</span>{' '}
            </span>
          ))}
          <a href={href(CTA_HREF)} className={`${word} text-gold`} style={{ fontSize: 'clamp(30px,4vw,60px)' }}>
            {C.you}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── H7 · Ways to work with us ──────────────────────────────────────────── */
function Packages() {
  return (
    <section className="border-t border-[rgba(244,241,232,.1)] py-[72px] md:py-[110px]">
      <div className="wrap">
        <Reveal className="mb-6 flex flex-wrap items-end justify-between gap-6 md:mb-7">
          <h2 className="h2 !font-extrabold">
            {C.ways[0]} <br className="md:hidden" />
            {C.ways[1]}
          </h2>
          <a href="/services#packages" className="lab hidden !text-gold md:inline">
            {C.waysLink} {ARROW}
          </a>
        </Reveal>
        <motion.div initial="hidden" whileInView="visible" viewport={inView} variants={stagger(0.08)}>
          {PACKAGES.map((p, i) => (
            <motion.a
              key={p.name}
              href="/services#packages"
              variants={rise}
              whileHover={{ y: -4 }}
              className="group flex flex-col gap-[6px] border-b border-[var(--line)] py-5 md:grid md:grid-cols-[70px_minmax(0,1fr)_auto] md:items-center md:gap-5 md:py-[26px]"
            >
              <span className="flex items-center justify-between">
                <span className="lab !text-gold">
                  {pad(i + 1)}
                  {p.featured && <span className="md:hidden"> · {C.startHere}</span>}
                </span>
                <span className="text-gold md:hidden">{ARROW}</span>
              </span>
              <span className="font-display font-extrabold leading-none tracking-[-0.045em] transition-colors group-hover:text-gold" style={{ fontSize: 'clamp(28px,3.4vw,50px)' }}>
                {C.packages[i].name}
              </span>
              <span className="text-[14px] text-muted md:lab">{C.packages[i].who}<span className="hidden md:inline"> {ARROW}</span></span>
            </motion.a>
          ))}
        </motion.div>
        <p className="lab mt-[18px] md:hidden">{C.priced}</p>
      </div>
    </section>
  );
}

/* ─── H8 · Client proof ──────────────────────────────────────────────────── */
function ClientProof() {
  return (
    <section className="bg-bg py-[72px] md:py-[120px]">
      <div className="wrap">
        <Reveal className="mb-6 flex flex-wrap items-end justify-between gap-6 md:mb-12">
          <h2 className="h2 !font-extrabold">
            {C.clients[0]} <br className="md:hidden" />
            {C.clients[1]}<span className="text-gold">.</span>
          </h2>
          <span className="lab">
            <span className="hidden md:inline">{C.clientsRight}</span>
            <span className="md:hidden">{C.clientsRightPhone}</span>
          </span>
        </Reveal>
        <motion.div
          className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-[14px] overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0"
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          variants={stagger(0.15)}
        >
          {QUOTES.map((q, i) => (
            <motion.figure
              key={i}
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.9 } } }}
              className={`m-0 flex w-[310px] shrink-0 snap-start flex-col gap-5 rounded-[14px] px-[22px] py-[26px] md:w-auto md:gap-7 md:px-[34px] md:py-9 ${
                q.quote ? 'border border-[var(--line)] bg-surface' : 'border border-dashed border-[rgba(244,241,232,.25)]'
              }`}
            >
              <span className="font-display text-[76px] font-extrabold leading-[.6] text-gold md:text-[110px]" aria-hidden="true">“</span>
              <blockquote className="m-0 font-display font-medium leading-[1.35] tracking-[-0.015em]" style={{ fontSize: 'clamp(19px,1.9vw,27px)' }}>
                {q.quote || C.quotes[i]}
              </blockquote>
              <figcaption className="flex items-center gap-[14px]">
                <span className="h-10 w-10 rounded-full border border-dashed border-[rgba(244,241,232,.3)] bg-surface-2 md:h-12 md:w-12" />
                <span className="flex flex-col gap-1">
                  <span className="text-base font-semibold">{q.quote ? q.name : C.clientName}</span>
                  <span className="lab !text-[10.5px]">{q.quote ? q.role : C.clientRole}</span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
        <div className="mt-7 grid grid-cols-3 gap-[10px] md:mt-14 md:grid-cols-6 md:gap-[14px]">
          {CLIENT_LOGOS.map((l, i) =>
            l.src ? (
              <img key={i} src={l.src} alt={l.name} className="h-16 w-full object-contain md:h-[84px]" />
            ) : (
              <div key={i} className="lab flex h-16 items-center justify-center rounded-[10px] border border-dashed border-[rgba(244,241,232,.2)] !text-[9px] !text-dim md:h-[84px] md:!text-[10px]">
                {C.logo}
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── H6 · Closing CTA with spinning badge ───────────────────────────────── */
function SpinningBadge() {
  return (
    <div aria-hidden="true" className="absolute bottom-[30px] end-[4%] hidden h-[190px] w-[190px] lg:block">
      <div className="absolute inset-0 animate-spin-slow motion-reduce:animate-none">
        <svg viewBox="0 0 200 200" width="190" height="190" className="block overflow-visible">
          <defs>
            <path id="home-badge" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
          </defs>
          <circle cx="100" cy="100" r="96" fill="none" stroke="rgba(244,241,232,.18)" strokeWidth="1" />
          <text fontFamily="Geist Mono, monospace" fontSize="13" fontWeight="500" fill="#f4f1e8">
            <textPath href="#home-badge" textLength="486" lengthAdjust="spacing">
              {C.badge}
            </textPath>
          </text>
        </svg>
      </div>
      <AuricMark size={64} className="absolute left-[63px] top-[63px] text-gold" />
    </div>
  );
}

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Showreel />
      <Marquee />
      <Divisions />
      <SelectedWork />
      <HowWeWork />
      <WhoWeWorkWith />
      <Packages />
      <ClientProof />
      <BigCTA
        lines={[
          <>{C.cta[0]}</>,
          <>
            {C.cta[1]}<span className="text-gold">.</span>
          </>,
        ]}
        size="clamp(52px,11vw,170px)"
        secondary={{ label: C.explore, href: '/work' }}
      >
        <SpinningBadge />
      </BigCTA>
    </Layout>
  );
}
