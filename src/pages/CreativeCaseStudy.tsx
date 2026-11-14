import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import BigCTA from '../components/layout/BigCTA';
import { Photo, PlayableVideo } from '../components/ui/Media';
import { Reveal, TitleReveal } from '../components/ui/Reveal';
import { CREATIVE_PROJECTS, type CreativeProject } from '../lib/creative';
import { EASE, inView, rise, stagger, useDragScroll } from '../lib/motion';
import { usePinnedStrip } from '../lib/usePinnedStrip';
import { ARROW, LANG, isAr, t } from '../lib/i18n';
import { setPageMeta } from '../lib/seo';

/**
 * Case study for creative work (films, reels, identities). Every section is driven by the
 * project's data in lib/creative.ts and only appears when the project has that material.
 */

function Story({ label, children, first = false }: { label: string; children: React.ReactNode; first?: boolean }) {
  return (
    <Reveal className={`grid gap-[14px] border-b border-[var(--line)] py-10 md:grid-cols-[200px_minmax(0,1fr)] md:gap-10 md:py-12 ${first ? 'border-t' : ''}`}>
      <span className="lab !text-gold">{label}</span>
      <p className="big m-0" data-scrub-words>
        {children}
      </p>
    </Reveal>
  );
}

function Frames({ p }: { p: CreativeProject }) {
  const strip = useDragScroll<HTMLDivElement>();
  const section = useRef<HTMLElement>(null);
  usePinnedStrip(section, strip);
  const tall = p.type === 'reel';
  return (
    <section ref={section} className="overflow-hidden py-20 md:py-[120px]">
      <div className="wrap">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <h2 className="h2">{t('Frames', 'لقطات')}</h2>
          <span className="lab">
            {t('Stills from the final cut', 'لقطات من النسخة النهائية')} · {t('drag sideways', 'اسحب جانبيًا')} {ARROW}
          </span>
        </Reveal>
        <div ref={strip} className="strip pb-[14px]">
          {p.frames!.map((fr) => (
            <figure key={fr.src} className={`m-0 flex flex-col gap-[10px] ${tall ? 'w-[220px] md:w-[260px]' : 'w-[300px] sm:w-[420px] md:w-[560px]'}`}>
              <div className={`overflow-hidden rounded-[10px] bg-surface ${tall ? 'aspect-[9/16]' : 'aspect-video'}`}>
                <Photo src={fr.src} alt={fr.cap} sizes={tall ? '260px' : '(min-width: 768px) 560px, 80vw'} className="h-full w-full object-cover" />
              </div>
              <figcaption className="lab">{fr.cap}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pieces({ p }: { p: CreativeProject }) {
  const posts = p.pieces!.filter((x) => x.shape === 'post');
  const stories = p.pieces!.filter((x) => x.shape === 'story');
  return (
    <section data-stack className="overflow-hidden bg-bg py-20 md:py-[120px]">
      <div className="wrap">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <h2 className="h2">{t('The work', 'العمل')}</h2>
          <span className="lab">
            {posts.length} {t('posts', 'منشورات')} · {stories.length} {t('stories', 'ستوريز')}
          </span>
        </Reveal>
        <motion.div className="grid gap-[18px] md:grid-cols-3" initial="hidden" whileInView="visible" viewport={inView} variants={stagger(0.1)}>
          {posts.map((x) => (
            <motion.figure key={x.src} variants={rise} className="m-0 flex flex-col gap-[10px]">
              <div className="aspect-[4/5] overflow-hidden rounded-xl bg-surface">
                <Photo src={x.src} alt={x.alt} sizes="(min-width: 768px) 33vw, 100vw" className="h-full w-full object-cover object-top" />
              </div>
              <figcaption className="lab">{x.alt}</figcaption>
            </motion.figure>
          ))}
        </motion.div>
        {stories.length > 0 && (
          <motion.div className="mt-[18px] grid grid-cols-2 gap-[18px] md:grid-cols-4" initial="hidden" whileInView="visible" viewport={inView} variants={stagger(0.08)}>
            {stories.map((x, i) => (
              <motion.figure key={x.src} variants={rise} className={`m-0 flex flex-col gap-[10px] ${i % 2 ? 'md:mt-12' : ''}`}>
                <div className="aspect-[9/16] overflow-hidden rounded-[22px] border-[5px] border-surface-2 bg-surface">
                  <Photo src={x.src} alt={x.alt} sizes="(min-width: 768px) 25vw, 50vw" className="h-full w-full object-cover" />
                </div>
                <figcaption className="lab">{x.alt}</figcaption>
              </motion.figure>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

function Palette({ p }: { p: CreativeProject }) {
  return (
    <section data-expand className="bg-cream py-20 text-[#141414] md:py-[120px]">
      <div className="wrap">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <h2 className="h2">{t('The look', 'الهوية')}</h2>
          <span className="lab !text-gold-deep">{t('Colour · type · pattern', 'الألوان · الخطوط · النقش')}</span>
        </Reveal>
        <motion.div className="grid grid-cols-2 gap-4 md:grid-cols-12" initial="hidden" whileInView="visible" viewport={inView} variants={stagger(0.1)}>
          <motion.div variants={rise} className="col-span-2 row-span-2 overflow-hidden rounded-[10px] md:col-[1/6] md:row-[1/3]">
            {/* A story (the cover is already shown at the top of the page) */}
            {(() => {
              const look = p.pieces?.find((x) => x.shape === 'story') ?? { src: p.cover, alt: p.name };
              return <Photo src={look.src} alt={look.alt} sizes="(min-width: 768px) 40vw, 100vw" className="h-full max-h-[620px] w-full object-cover object-top" />;
            })()}
          </motion.div>
          <div className="col-span-2 grid grid-cols-2 gap-4 md:col-[6/13]">
            {p.palette!.map((c) => (
              <motion.div key={c.hex} variants={rise} className="flex aspect-[4/3] flex-col justify-end gap-1 rounded-[10px] p-4" style={{ background: c.hex }}>
                <span className={`font-display text-[17px] font-bold tracking-[-0.02em] ${c.hex === '#e7ddc8' ? 'text-[#141414]' : 'text-cream'}`}>{c.name}</span>
                <span className={`lab !text-[11px] ${c.hex === '#e7ddc8' ? '!text-[#4a4740]' : '!text-cream'}`} dir="ltr">
                  {c.hex.toUpperCase()}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function CreativeCaseStudy({ project: p }: { project: CreativeProject }) {
  useEffect(() => {
    setPageMeta(`/work/${p.slug}`, LANG, p.meta[LANG]);
  }, [p]);

  const next = CREATIVE_PROJECTS[(CREATIVE_PROJECTS.indexOf(p) + 1) % CREATIVE_PROJECTS.length];
  const tall = !!p.film?.vertical;

  return (
    <Layout>
      {/* Title */}
      <section className="overflow-hidden pt-8 md:pt-12">
        <div className="wrap flex flex-col gap-7" data-hero-out>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <a href="/work" className="lab tap hover:!text-gold">
              {isAr ? '→' : '←'} {t('Work', 'الأعمال')}
            </a>
            <span className="lab !text-gold">{t('Creative case study', 'دراسة حالة إبداعية')}</span>
          </div>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <TitleReveal lines={[<>{p.name}<span className="text-gold">.</span></>]} style={{ fontSize: 'clamp(52px,11vw,170px)', lineHeight: 0.86, letterSpacing: '-0.06em' }} />
            <motion.p className="big max-w-[26ch] pb-4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.7, ease: EASE }}>
              {p.line}
            </motion.p>
          </div>
          <div className="grid grid-cols-2 border-y border-[rgba(244,241,232,.14)] md:grid-cols-4">
            {[
              [t('Client', 'العميل'), p.client],
              [t('Field', 'المجال'), p.cat],
              [t('Services', 'الخدمات'), p.services, true],
              [t('Year', 'السنة'), p.year],
            ].map(([k, v, gold], n) => (
              <div key={k as string} className={`flex flex-col gap-2 py-[22px] ${n % 2 ? 'pl-[22px]' : ''} md:pl-[22px] md:first:pl-0 ${n < 3 ? 'md:border-r md:border-[rgba(244,241,232,.14)]' : ''}`}>
                <span className="lab">{k}</span>
                <span className={`text-[16px] md:text-[17px] ${gold ? 'text-gold' : ''}`}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The film / the reel / the hero pieces */}
      <section className="pb-20 pt-10 md:pb-[120px] md:pt-12">
        <motion.div className="wrap" initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={inView} transition={{ duration: 0.9, ease: EASE }}>
          {p.film && !tall && (
            <div className="flex flex-col gap-3">
              <PlayableVideo film={p.film} ratio="16/9" radius={14} playSize={104} />
              <span className="lab">
                {t('Full film with sound', 'الفيلم كاملًا بالصوت')} · {p.film.length}
              </span>
            </div>
          )}
          {p.film && tall && (
            <div className="grid items-center gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
              <div className="mx-auto w-full max-w-[380px]">
                <PlayableVideo film={p.film} ratio="9/16" vertical radius={28} playSize={72} style={{ border: '8px solid #202023' }} />
              </div>
              <div className="flex flex-col gap-5">
                <span className="lab !text-gold">{t('Vertical · 9:16', 'عمودي · 9:16')} · {p.film.length}</span>
                <p className="big m-0">{t('Made for the first second of a scroll. Tap to watch with sound.', 'مصنوع للثانية الأولى من التصفح. اضغط للمشاهدة بالصوت.')}</p>
              </div>
            </div>
          )}
          {!p.film && p.pieces && (
            <div className="grid gap-4 md:grid-cols-12">
              <div className="overflow-hidden rounded-[14px] md:col-span-5">
                <Photo src={p.cover} alt={t(`${p.name} cover`, `غلاف ${p.name}`)} sizes="(min-width: 768px) 40vw, 100vw" eager className="h-full w-full object-cover object-top" />
              </div>
              <div className="grid grid-cols-2 gap-4 md:col-span-7">
                {p.pieces.filter((x) => x.shape === 'post').slice(0, 2).map((x) => (
                  <div key={x.src} className="overflow-hidden rounded-[14px]">
                    <Photo src={x.src} alt={x.alt} sizes="(min-width: 768px) 30vw, 50vw" eager className="h-full w-full object-cover object-top" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </section>

      {/* The story */}
      <section className="pb-20 md:pb-[120px]">
        <div className="wrap">
          <Story label={t('The brief', 'الموجز')} first>
            {p.brief}
          </Story>
          <Story label={t('What we made', 'ما صنعناه')}>{p.made}</Story>
        </div>
      </section>

      {p.palette && <Palette p={p} />}
      {p.frames && <Frames p={p} />}
      {p.pieces && <Pieces p={p} />}

      {/* Deliverables and credits */}
      <section className="bg-bg py-20 md:py-24">
        <div className="wrap grid gap-14 md:grid-cols-2">
          <div>
            <h2 className="h2 mb-8">{t('Delivered', 'ما تم تسليمه')}</h2>
            <motion.ul className="m-0 list-none p-0" initial="hidden" whileInView="visible" viewport={inView} variants={stagger(0.06)}>
              {p.deliverables.map((d, i) => (
                <motion.li key={d} variants={rise} className="flex items-baseline gap-4 border-t border-[var(--line)] py-4 text-[17px]">
                  <span className="lab !text-gold">{String(i + 1).padStart(2, '0')}</span>
                  {d}
                </motion.li>
              ))}
            </motion.ul>
          </div>
          <div>
            <h2 className="h2 mb-8">{t('Credits', 'فريق العمل')}</h2>
            <motion.div className="grid grid-cols-2 gap-6" initial="hidden" whileInView="visible" viewport={inView} variants={stagger(0.08)}>
              {p.credits.map(([r, n], i) => (
                <motion.div key={r} variants={rise} className={`flex flex-col gap-2 border-t-2 pt-[18px] ${i === 0 ? 'border-gold' : 'border-[rgba(244,241,232,.2)]'}`}>
                  <span className="lab">{r}</span>
                  <span className="text-[17px]">{n}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Next project */}
      <section className="border-t border-[var(--line)] py-16 md:py-20">
        <a href={`/work/${next.slug}`} className="wrap group flex flex-wrap items-end justify-between gap-6" data-cursor="view">
          <span className="flex flex-col gap-3">
            <span className="lab">{t('Next project', 'المشروع التالي')}</span>
            <span className="font-display font-extrabold leading-[.9] tracking-[-0.05em] transition-colors group-hover:text-gold" style={{ fontSize: 'clamp(40px,7vw,104px)' }}>
              {next.name}
            </span>
          </span>
          <span className="lab tap !text-gold">
            {next.services} {ARROW}
          </span>
        </a>
      </section>

      <BigCTA lines={[<>{t('Want one', 'تريد مثله')}<span className="text-gold">?</span></>]} size="clamp(56px,9vw,140px)" />
    </Layout>
  );
}
