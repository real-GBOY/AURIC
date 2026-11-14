import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import BigCTA from '../components/layout/BigCTA';
import EntryMedia from '../components/work/EntryMedia';
import { PlayButton } from '../components/ui/Icons';
import { LoopVideo, Photo, PlayableVideo, ReelPreview, Screen, VideoSlot, WorkPreview } from '../components/ui/Media';
import { Reveal, TitleReveal } from '../components/ui/Reveal';
import { ARCHIVE, FEED, FILTERS, INDEX, type Entry, type Group } from '../lib/projects';
import { CREATIVE_PROJECTS, creativeBySlug } from '../lib/creative';
import { EVENT_RECAP, FILMS, SHOWREEL } from '../lib/content';
import { ARROW, t } from '../lib/i18n';
import { EASE, inView, rise, stagger, useDragScroll } from '../lib/motion';
import { usePinnedStrip } from '../lib/usePinnedStrip';

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
        <div className="wrap relative z-[2] flex flex-wrap items-end justify-between gap-6" data-hero-out>
          <TitleReveal lines={[<>{t('Work', 'الأعمال')}<span className="text-gold">.</span></>]} className="mega" style={{ fontSize: 'clamp(96px,17vw,250px)', lineHeight: 0.82, letterSpacing: '-0.06em' }} />
          <motion.div className="flex max-w-[340px] flex-col gap-[10px] pb-[58px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <span className="lab !text-gold">{t('Selected work · 2025—2026', 'أعمال مختارة · 2025—2026')}</span>
            <p className="copy !text-base">{t('Video, design, content and digital products. Made by one team.', 'فيديو وتصميم ومحتوى ومنتجات رقمية، من فريق واحد.')}</p>
            <a href="/case-studies" className="btn btn-line mt-2 w-fit !min-h-11 !px-5 !text-[14px]">{t('Read the case studies', 'اقرأ دراسات الحالة')} {ARROW}</a>
          </motion.div>
        </div>
        <motion.div className="wrap relative z-[1] -mt-9" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.9, ease: EASE }}>
          <div className="overflow-hidden rounded-[10px]" data-scrub-scale="0.9" data-cursor="view">
            <VideoSlot ratio="21/9" label={t('AURIC showreel', 'الفيديو التعريفي لأوريك')} src={SHOWREEL.src} poster={SHOWREEL.poster} playSize={88} radius={10}>
              {!SHOWREEL.src && <span className="slot bottom-5 right-[22px] !text-[11px] !text-cream">00:00 / 01:30</span>}
            </VideoSlot>
          </div>
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
          {SHOWREEL.vertical ? (
            <>
              <LoopVideo src={SHOWREEL.vertical} poster={SHOWREEL.posterVertical} label={t('AURIC showreel', 'الفيديو التعريفي لأوريك')} className="rounded-2xl" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-[rgba(10,10,11,.92)] via-[rgba(10,10,11,.25)] to-transparent" />
            </>
          ) : (
            <>
              <PlayButton size={50} className="absolute left-[18px] top-[18px]" />
              <span className="slot left-20 top-[30px]">{t('Showreel · autoplay · your video', 'الفيديو التعريفي · فيديو من أعمالك')}</span>
            </>
          )}
          <TitleReveal lines={[<>{t('Work', 'الأعمال')}<span className="text-gold">.</span></>]} className="mega relative z-[1]" style={{ fontSize: 92, lineHeight: 0.82, letterSpacing: '-0.06em' }} />
          <span className="lab relative z-[1] mt-[14px] !text-cream">{t('Video · design · content · websites', 'فيديو · تصميم · محتوى · مواقع')}</span>
        </motion.div>
      </div>
    </section>
  );
}

function IndexPreview({ e }: { e: Entry }) {
  if (e.type === 'img') return <Screen src={e.img!} alt={e.name} ratio="4/3" />;
  return <EntryMedia e={e} ratio="4/3" />;
}

/* A2 · Interactive index: hover a project, the preview swaps */
function ProjectIndex() {
  const [i, setI] = useState(0);
  const cur = INDEX[i];
  return (
    <section className="hidden py-[120px] md:block">
      <div className="wrap">
        <ChapterHead
          title={t('The index', 'الفهرس')}
          right={
            <div className="flex flex-wrap items-baseline gap-6">
              <span className="lab">{t('Hover a project · preview changes', 'مرّر على مشروع · تتغير المعاينة')}</span>
              <a href="/case-studies" className="lab tap !text-gold">{t('All case studies', 'كل دراسات الحالة')} {ARROW}</a>
            </div>
          }
        />
        <div className="grid items-start gap-8 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:grid-cols-2 lg:gap-12">
          <ul className="m-0 list-none p-0">
            {INDEX.map((e, k) => {
              const on = k === i;
              return (
                <li key={e.href}>
                  <a
                    href={e.href}
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
                </li>
              );
            })}
          </ul>
          <div className="sticky top-24 flex flex-col gap-4" data-tilt>
            <AnimatePresence mode="wait">
              <motion.div key={cur.href} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.3 }}>
                <IndexPreview e={cur} />
              </motion.div>
            </AnimatePresence>
            <div className="flex items-baseline justify-between gap-3">
              <span className="h3">{cur.name}</span>
              <span className="lab !text-gold">{cur.kind}</span>
            </div>
            <p className="copy !text-[15px]">{cur.desc}</p>
            <a href={cur.href} className="lab tap !text-cream hover:!text-gold">{t('Open case study', 'افتح دراسة الحالة')} {ARROW}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Chapter 01 · Video filmstrip (A3) */
function VideoChapter() {
  const ref = useDragScroll<HTMLUListElement>();
  const section = useRef<HTMLElement>(null);
  usePinnedStrip(section, ref);
  // Real video work, each playing in place, with its frames trailing behind it.
  const films = CREATIVE_PROJECTS.filter((p) => p.type === 'video' && p.film);
  return (
    <section ref={section} className="hidden overflow-hidden bg-bg py-[120px] md:block">
      <div className="wrap">
        <ChapterHead n="01" title={t('Video & motion', 'فيديو وموشن')} right={<span className="lab">{t('Drag or scroll sideways', 'اسحب أو مرّر جانبيًا')} {ARROW}</span>} />
        <ul ref={ref} className="strip m-0 list-none p-0" aria-label={t('Video projects', 'مشاريع الفيديو')}>
          {films.flatMap((p) => [
            <li key={p.slug} className="w-[620px]">
              <div className="flex flex-col gap-[14px]">
                <PlayableVideo film={p.film!} ratio="16/9" radius={8} playSize={64} />
                <span className="flex items-baseline justify-between gap-4">
                  <a href={`/work/${p.slug}`} className="h3 !text-[18px] hover:text-gold">
                    {p.name} {ARROW}
                  </a>
                  <span className="lab">{p.services}</span>
                </span>
              </div>
            </li>,
            ...(p.frames ?? []).slice(1, 3).map((fr) => (
              <li key={fr.src} className="w-[360px]">
                <a href={`/work/${p.slug}`} data-cursor="view" className="group flex flex-col gap-[14px]">
                  <WorkPreview img={fr.src} alt={fr.cap} ratio="16/9" sizes="360px" className="rounded-lg transition-transform duration-500 group-hover:scale-[1.02]" imgClassName="object-cover" />
                  <span className="lab">{fr.cap}</span>
                </a>
              </li>
            )),
          ])}
        </ul>
      </div>
    </section>
  );
}

/* Chapter 02 · Design poster wall on cream (A4) */
function DesignChapter() {
  const tile = { hidden: { opacity: 0, clipPath: 'inset(100% 0 0 0)' }, visible: { opacity: 1, clipPath: 'inset(0% 0 0 0)', transition: { duration: 0.8, ease: EASE } } };
  return (
    <section data-expand className="hidden bg-cream py-[120px] text-[#141414] md:block">
      <div className="wrap">
        <ChapterHead
          n="02"
          title={t('Design & branding', 'تصميم وهوية')}
          cream
          right={
            <span className="flex flex-wrap gap-x-6">
              <a href="/work/elk-cafe" className="lab tap !text-gold-deep hover:!text-[#141414]">ELK Café {ARROW}</a>
              <a href="/work/digitmask" className="lab tap !text-gold-deep hover:!text-[#141414]">Digitmask {ARROW}</a>
            </span>
          }
        />
        <motion.div
          className="grid grid-cols-2 gap-4 [grid-auto-rows:200px] lg:grid-cols-12 lg:[grid-auto-rows:120px]"
          data-parallax="0.05"
          initial="hidden"
          whileInView="visible"
          viewport={inView}
          variants={stagger(0.12)}
        >
          {/* ELK Café · Saudi National Day identity (real work, public/work/elk) */}
          <motion.div variants={tile} className="relative col-span-2 row-span-2 overflow-hidden rounded-lg bg-[#40564a] lg:col-[1/6] lg:row-[1/5]">
            <Photo src="/work/elk/cover.jpg" alt={t('ELK Café identity, the logo and the September plan', 'هوية مقهى إلك، الشعار وخطة سبتمبر')} sizes="(min-width: 1024px) 40vw, 100vw" className="h-full w-full object-cover object-top" />
            <span className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[rgba(10,10,11,.85)] via-[rgba(10,10,11,.45)] to-transparent" aria-hidden="true" />
            <span className="absolute bottom-[18px] left-5 flex flex-col gap-1">
              <span className="font-display text-[26px] font-extrabold leading-none tracking-[-0.04em] text-cream lg:text-[34px]">ELK Café</span>
              <span className="lab !text-gold">{t('Identity · Saudi National Day', 'هوية · اليوم الوطني السعودي')}</span>
            </span>
          </motion.div>
          <motion.a href="/work/digitmask" variants={tile} className="relative overflow-hidden rounded-lg bg-[#6d249e] lg:col-[6/9] lg:row-[1/3]">
            <Photo src="/work/digitmask/cover.jpg" alt={t('Digitmask visual identity', 'هوية ديجت ماسك البصرية')} sizes="(min-width: 1024px) 25vw, 50vw" className="h-full w-full object-cover object-[30%_50%]" />
            <span className="slot bottom-[14px] left-4 rounded bg-[rgba(10,10,11,.75)] px-2 py-1">Digitmask</span>
          </motion.a>
          <motion.div variants={tile} className="relative overflow-hidden rounded-lg bg-[#40564a] lg:col-[9/13] lg:row-[1/4]">
            <Photo src="/work/elk/post-2.jpg" alt={t('ELK Café National Day post', 'منشور اليوم الوطني لمقهى إلك')} sizes="(min-width: 1024px) 33vw, 50vw" className="h-full w-full object-cover object-top" />
          </motion.div>
          <motion.a href="/work/digitmask" variants={tile} className="relative overflow-hidden rounded-lg bg-[#6d249e] lg:col-[6/9] lg:row-[3/5]">
            <Photo src="/work/digitmask/signage.jpg" alt={t('Digitmask office signage: From vision to task', 'لافتة مكتب ديجت ماسك: من الرؤية إلى المهمة')} sizes="(min-width: 1024px) 25vw, 50vw" className="h-full w-full object-cover object-[45%_50%]" />
          </motion.a>
          <motion.div variants={tile} className="flex gap-2 rounded-lg bg-[#141414] p-[14px] lg:col-[9/13] lg:row-[4/5]" role="img" aria-label={t('ELK Café and Digitmask colours', 'ألوان مقهى إلك وديجت ماسك')}>
            {['#40564a', '#8b1e5a', '#6d249e', '#ff7212'].map((c) => (
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
    <section data-stack className="hidden py-[120px] md:block">
      <div className="wrap">
        <ChapterHead n="03" title={t('Content & social', 'محتوى وسوشيال')} right={<span className="lab">{t('Reels · events · stories · brand visuals', 'ريلز · فعاليات · ستوريز · مرئيات العلامة')}</span>} />
        <motion.div className="grid grid-cols-5 gap-3 lg:gap-4" initial="hidden" whileInView="visible" viewport={inView} variants={stagger(0.1)}>
          {(() => {
            const elk = (creativeBySlug('elk-cafe')?.pieces ?? []).filter((x) => x.shape === 'story');
            // A mix of clients and formats: a reel, stories and brand visuals.
            // Videos (play in place with sound) alternate with stills (open the case study).
            const row: { key: string; label: string; href: string; film?: typeof FILMS.reel; story?: { src: string; alt: string } }[] = [
              { key: 'reel', label: t('TCG · reel, plays with sound', 'TCG · ريل يعمل بالصوت'), href: '/work/tcg-reel', film: FILMS.reel },
              { key: 'elk-1', label: t('ELK Café · National Day story', 'مقهى إلك · ستوري اليوم الوطني'), href: '/work/elk-cafe', story: elk[0] },
              { key: 'gtk', label: t('Green Teaching Kitchen · event recap', 'المطبخ التعليمي الأخضر · ملخص فعالية'), href: '/work/green-teaching-kitchen', film: EVENT_RECAP },
              { key: 'dm-1', label: t('Digitmask · app icon', 'ديجت ماسك · أيقونة التطبيق'), href: '/work/digitmask', story: { src: '/work/digitmask/social-2.jpg', alt: t('Digitmask app icon on a phone', 'أيقونة ديجت ماسك على الهاتف') } },
              { key: 'dm-2', label: t('Digitmask · billboard', 'ديجت ماسك · لوحة إعلانية'), href: '/work/digitmask', story: { src: '/work/digitmask/social-3.jpg', alt: t('Digitmask billboard', 'لوحة ديجت ماسك الإعلانية') } },
            ];
            return row.filter((it) => it.film || it.story);
          })().map((it, n) => (
            <motion.div
              key={it.key}
              variants={{ hidden: { opacity: 0, y: 70 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } }}
              className={`flex flex-col gap-3 ${n % 2 === 1 ? 'mt-8 lg:mt-12' : ''}`}
            >
              <motion.div animate={{ y: [0, n % 2 ? 8 : -8, 0] }} transition={{ duration: 5 + n * 0.4, repeat: Infinity, ease: 'easeInOut' }}>
                {it.story ? (
                  <a href={it.href} data-cursor="view" className="block">
                    <WorkPreview img={it.story.src} alt={it.story.alt} ratio="9/16" sizes="20vw" className="rounded-[22px] border-[6px] border-surface-2" imgClassName="object-cover" />
                  </a>
                ) : (
                  <PlayableVideo film={it.film!} ratio="9/16" vertical radius={22} playSize={48} style={{ border: '6px solid #202023' }} />
                )}
              </motion.div>
              <a href={it.href} className="lab hover:!text-gold">
                {it.label}
              </a>
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
    <section className="hidden overflow-hidden bg-bg py-[120px] md:block">
      <div className="wrap">
        <ChapterHead n="04" title={t('Websites & apps', 'مواقع وتطبيقات')} right={<a href="/work/mizan" className="lab tap !text-gold">{t('Mizan case study', 'دراسة حالة ميزان')} {ARROW}</a>} />
        <div className="relative h-[520px] lg:h-[600px]">
          <motion.a href="/work/atlas" className="absolute left-0 top-5 z-[1] h-[360px] w-[58%] lg:h-[420px]" {...up(0)}>
            <div className="h-full" data-parallax="0.05"><Screen src="/work/atlas/dashboard.png" alt="Atlas dashboard" className="h-full" /></div>
          </motion.a>
          <motion.a href="/work/mizan" className="absolute left-[30%] top-[130px] z-[2] h-[340px] w-[52%] shadow-[0_30px_60px_rgba(0,0,0,.55)] lg:h-[400px]" {...up(0.15)}>
            <div className="h-full" data-parallax="0.14"><Screen src="/work/mizan/dashboard.png" alt="Mizan dashboard" className="h-full" /></div>
          </motion.a>
          <motion.a href="/work/digitmask-erp" className="absolute right-0 top-0 z-[3] h-[380px] w-[180px] shadow-[0_30px_60px_rgba(0,0,0,.55)] lg:h-[420px] lg:w-[200px]" {...up(0.3)}>
            <div className="h-full" data-parallax="0.24"><Screen src="/work/nova/mobile-home.jpg" alt="Digitmask mobile app" bar={false} radius={28} className="h-full" /></div>
          </motion.a>
          <div className="absolute bottom-0 left-0 z-[4] flex flex-wrap gap-7">
            {[['Mizan', t('Client project', 'مشروع عميل')], ['Atlas', t('AURIC product', 'منتج أوريك')], ['Digitmask', t('Client project', 'مشروع عميل')]].map(([n, k]) => (
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
    <div className={`flex gap-[10px] ${className}`} role="group" aria-label={t('Filter the work', 'تصفية الأعمال')}>
      {FILTERS.map((d) => {
        const n = d.id === 'all' ? list.length : list.filter((p) => p.group === d.id).length;
        return (
          <button key={d.id} type="button" className="chip md:!rounded md:!text-[14px]" aria-pressed={f === d.id} onClick={() => setF(d.id)}>
            {d.name} <span className="opacity-80">{n}</span>
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
        <ChapterHead n="05" title={t('The archive', 'الأرشيف')} right={<span className="lab">{items.length} {t('projects', 'مشروعًا')}</span>} />
        <FilterChips f={f} setF={setF} list={ARCHIVE} className="mb-10 flex-wrap" />
        <motion.div layout className="grid grid-cols-2 gap-x-5 gap-y-9 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {items.map((p) => (
              <motion.a
                key={p.href}
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
                  <span className="lab !text-[11px]">{p.cat}</span>
                </span>
                <span className="lab !text-[11px] !text-gold">{p.kind}</span>
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
          <span className="lab">{items.length} {t('projects', 'مشروعًا')}</span>
          <span className="lab !text-gold">{t('Tap a project', 'اضغط على مشروع')}</span>
        </div>
        <motion.div layout className="grid grid-cols-2 gap-x-3 gap-y-5 [grid-auto-flow:dense]">
          {items.map((p) => {
            const wide = p.type === 'img' || p.type === 'video' || p.type === 'term';
            return (
              <motion.a key={p.href} layout href={p.href} className={`flex flex-col gap-[10px] ${wide ? 'col-span-2' : ''}`} initial="hidden" whileInView="visible" viewport={inView} variants={rise}>
                {p.type === 'img' && <Screen src={p.img!} alt={`${p.name} screen`} ratio="16/10" />}
                {p.type === 'video' && <WorkPreview img={p.img!} teaser={p.teaser} alt={`${p.name}, ${p.services}`} ratio="16/10" sizes="100vw" className="rounded-xl" imgClassName="object-cover" play />}
                {p.type === 'design' && <WorkPreview img={p.img!} alt={`${p.name}, ${p.services}`} ratio="4/5" sizes="50vw" className="rounded-xl" />}
                {p.type === 'reel' && <ReelPreview img={p.img!} teaser={p.teaser} alt={`${p.name}, ${p.services}`} ratio="4/5" className="rounded-[18px]" />}
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
            <span className="lab !text-[#3a3010]">{t('Deep dives', 'قراءة معمّقة')}</span>
            <span className="font-display text-[28px] font-extrabold leading-none tracking-[-0.04em]">{t('Case studies', 'دراسات الحالة')}</span>
          </span>
          <span className="text-[28px]">{ARROW}</span>
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
      <BigCTA dark lines={[<>{t('Yours', 'مشروعك')}<span className="text-gold">?</span></>]} text={t('Your project could be the next one here.', 'قد يكون مشروعك هو التالي هنا.')} size="clamp(64px,10vw,150px)" />
    </Layout>
  );
}

