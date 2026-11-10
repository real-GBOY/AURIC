import { useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import BigCTA from '../components/layout/BigCTA';
import { PlayButton } from '../components/ui/Icons';
import { Screen } from '../components/ui/Media';
import { Reveal, TitleReveal } from '../components/ui/Reveal';
import { CTA_HREF } from '../lib/site';
import { isAr, t } from '../lib/i18n';
import { EASE, drop, inView, rise, stagger } from '../lib/motion';
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap';
import { AuricMark } from '../components/Logo';

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
          {n} / {t('AURIC', 'أوريك')} {name}
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
    { id: 'create', w: t('Create', 'إبداع'), l: t('01 · Video · design · voice', '01 · فيديو · تصميم · صوت') },
    { id: 'strategy', w: t('Strategy', 'استراتيجية'), l: t('02 · Plans · content', '02 · خطط · محتوى') },
    { id: 'build', w: t('Build', 'تطوير'), l: t('03 · Websites · apps · AI', '03 · مواقع · تطبيقات · ذكاء اصطناعي') },
    { id: 'manage', w: t('Manage', 'إدارة'), l: t('04 · Delivery', '04 · التسليم'), outline: true },
  ];
  return (
    <section className="pb-24 pt-12 md:pt-16">
      <div className="wrap flex flex-col gap-14">
        <div className="flex flex-col gap-7" data-hero-out>
          <span className="lab !text-gold">{t('Services', 'الخدمات')}</span>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <TitleReveal lines={[<>{t('One partner', 'شريك واحد')}<span className="text-gold">.</span></>]} style={{ fontSize: 'clamp(52px,10vw,150px)' }} />
            <motion.p className="copy max-w-[30ch] pb-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              {t('Four divisions planned together, so every part of your project fits.', 'أربعة أقسام تُخطَّط معًا، لتتكامل كل أجزاء مشروعك.')}
            </motion.p>
          </div>
        </div>
        <motion.nav aria-label="Divisions" initial="hidden" animate="visible" variants={stagger(0.1, 0.35)}>
          {idx.map((d) => (
            <motion.a
              key={d.id}
              href={`#${d.id}`}
              variants={{ hidden: { opacity: 0, x: isAr ? 30 : -30 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } } }}
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
    <section id="create" data-expand data-stack className="bg-cream py-[88px] text-[#141414] md:py-[120px]">
      <div className="wrap">
        <Chapter n="01" name={t('Create', 'إبداع')} line={t('Video, design, motion and voice from one directed team.', 'فيديو وتصميم وموشن وصوت من فريق واحد بإدارة واحدة.')} cream />
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
            <span className="slot bottom-4 left-[18px]">{t('Video edit · your work', 'مونتاج فيديو · من أعمالك')}</span>
          </motion.div>
          <motion.div variants={drop} className="relative col-span-2 flex items-end rounded-[10px] bg-gold p-5 md:col-[8/13] md:row-[1/3]">
            <span className="font-display text-[64px] font-extrabold leading-[.9] tracking-[-0.05em]">Aa</span>
            <span className="slot bottom-4 right-[18px] !text-[#141414]">{t('Brand identity', 'هوية بصرية')}</span>
          </motion.div>
          <motion.div variants={drop} className="relative rounded-[10px] bg-[#141414] md:col-[8/11] md:row-[3/5]">
            <span className="slot bottom-[14px] left-4">{t('Poster', 'بوستر')}</span>
          </motion.div>
          <motion.div variants={drop} className="relative rounded-[10px] bg-sand md:col-[11/13] md:row-[3/5]">
            <span className="slot bottom-3 left-[14px] !text-[#4a4740]">{t('Motion', 'موشن')}</span>
          </motion.div>
        </motion.div>
        <ServiceList
          cream
          items={t(['Graphic Design', 'Visual Design', 'Creative Direction', 'Content Creation', 'Video Editing', 'Audio Editing', 'Voiceover Production', 'Motion Graphics', 'Creative Marketing Assets'], ['تصميم جرافيك', 'تصميم بصري', 'إدارة إبداعية', 'صناعة المحتوى', 'مونتاج الفيديو', 'هندسة الصوت', 'التعليق الصوتي', 'موشن جرافيك', 'مواد تسويقية إبداعية'])}
        />
        <ChapterFoot note={t('Brand identities · Social and ad creatives · Reels · Motion · Voiceovers · Print', 'هويات بصرية · تصاميم سوشيال وإعلانات · ريلز · موشن · تعليق صوتي · مطبوعات')} cta={t('Discuss creative work', 'ناقش عملًا إبداعيًا')} dark />
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
        <Chapter n="02" name={t('Strategy', 'استراتيجية')} line={t('A plan before anything is made, so every piece of content has a job.', 'خطة قبل أي تنفيذ، ليكون لكل قطعة محتوى هدف.')} />
        <div className="mb-16 grid items-start gap-14 lg:grid-cols-2">
          <div className="flex flex-col gap-[14px] rounded-[10px] bg-surface p-[30px]">
            <div className="flex justify-between">
              <span className="h3 !text-[17px]">{t('Content calendar', 'تقويم المحتوى')}</span>
              <span className="lab !text-[11px] !text-gold">{t('Example layout', 'مثال توضيحي')}</span>
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
              { w: t('Plan', 'نخطط'), d: t('Goals, audience and message', 'الأهداف والجمهور والرسالة'), cls: 'text-gold' },
              { w: t('Make', 'ننفّذ'), d: t('Produced by AURIC Create', 'من إنتاج أوريك إبداع'), cls: '' },
              { w: t('Publish', 'ننشر'), d: t('On a calendar, reviewed monthly', 'وفق تقويم، مع مراجعة شهرية'), cls: 'stroke-cream' },
            ].map((r) => (
              <motion.div key={r.w} variants={rise} className="flex flex-wrap items-baseline gap-5 border-b border-[var(--line)] py-[22px]">
                <span className={`font-display text-[44px] font-extrabold leading-none tracking-[-0.05em] md:text-[56px] ${r.cls}`}>{r.w}</span>
                <span className="copy !text-[15px]">{r.d}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <ServiceList items={t(['Marketing Planning', 'Digital Strategy', 'Content Strategy', 'Campaign Planning', 'Digital Presence Strategy', 'Creative Marketing', 'Brand Communication Planning'], ['تخطيط تسويقي', 'استراتيجية رقمية', 'استراتيجية المحتوى', 'تخطيط الحملات', 'استراتيجية الحضور الرقمي', 'تسويق إبداعي', 'تخطيط تواصل العلامة'])} />
        <ChapterFoot note={t("We plan and measure. We don't promise guaranteed results.", 'نخطط ونقيس، ولا نعد بنتائج مضمونة.')} noteIsLab cta={t('Discuss a plan', 'ناقش خطة')} />
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
        <Chapter n="03" name={t('Build', 'تطوير')} line={t('Websites, apps and systems, engineered on a tested foundation.', 'مواقع وتطبيقات وأنظمة مبنية على أساس مُجرَّب.')} />
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
          items={t(['Custom Software', 'Web Development', 'Mobile Apps', 'Digital Platforms', 'Business Systems', 'Internal Tools', 'AI Integration', 'AI Automation', 'Process Automation', 'APIs and Integrations', 'Digital Products'], ['برمجيات مخصصة', 'تطوير المواقع', 'تطبيقات الجوال', 'منصات رقمية', 'أنظمة الأعمال', 'أدوات داخلية', 'دمج الذكاء الاصطناعي', 'أتمتة بالذكاء الاصطناعي', 'أتمتة العمليات', 'واجهات برمجية وتكاملات', 'منتجات رقمية'])}
        />
        <ChapterFoot note="Mizan · Atlas · HotelOS · Nova · create-auric" noteIsLab cta={t('Discuss a build', 'ناقش مشروعًا تقنيًا')} />
      </div>
    </section>
  );
}

/* 04 · Manage — scroll-driven process: a gold dial fills as each stage lights up (S5) */
const MANAGE_STEPS = [
  { t: t('Brief', 'الموجز'), d: t('Scope and plan agreed', 'اتفاق على النطاق والخطة'), x: t('Kick-off call · written scope · timeline', 'مكالمة انطلاق · نطاق مكتوب · جدول زمني') },
  { t: t('Team', 'الفريق'), d: t('The right specialists briefed', 'المتخصصون المناسبون على اطلاع'), x: t('Designers · editors · strategists · engineers', 'مصممون · محررون · استراتيجيون · مهندسون') },
  { t: t('Make', 'التنفيذ'), d: t('Weekly updates', 'تحديثات أسبوعية'), x: t('Shared progress you can follow', 'تقدّم مشترك يمكنك متابعته') },
  { t: t('Review', 'المراجعة'), d: t('Checked before you see it', 'مُراجَع قبل أن تراه'), x: t('Quality and brand check by AURIC', 'فحص الجودة والهوية من أوريك') },
  { t: t('Deliver', 'التسليم'), d: t('On time, supported after', 'في الموعد، مع دعم بعده'), x: t('Handover, files and aftercare', 'تسليم الملفات والدعم بعد التسليم') },
];
const MANAGE_SERVICES = t(['Project Management', 'Digital Project Coordination', 'Production Coordination', 'Resource Management', 'Delivery Planning', 'Quality Assurance'], ['إدارة المشاريع', 'تنسيق المشاريع الرقمية', 'تنسيق الإنتاج', 'إدارة الموارد', 'تخطيط التسليم', 'ضمان الجودة']);
const RING = 2 * Math.PI * 120;

function Manage() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(-1);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Desktop / tablet: the dial fills and the stages light up with the scroll.
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const q = gsap.utils.selector(root);
        gsap.set(q('.mg-ring'), { strokeDasharray: RING, strokeDashoffset: RING });
        const st = ScrollTrigger.create({
          trigger: q('.mg-steps')[0],
          start: 'top 60%',
          end: 'bottom 55%',
          scrub: 0.6,
          animation: gsap
            .timeline()
            .to(q('.mg-ring'), { strokeDashoffset: 0, ease: 'none' }, 0)
            .to(q('.mg-sun'), { rotate: 360, ease: 'none' }, 0),
          onUpdate: (self) => setActive(Math.min(MANAGE_STEPS.length - 1, Math.floor(self.progress * MANAGE_STEPS.length))),
          onLeaveBack: () => setActive(-1),
        });
        return () => st.kill();
      });
      // Phones: a gold line draws down beside the stages.
      mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
        const el = root.current!;
        gsap.fromTo(
          el.querySelector('.mg-line'),
          { scaleY: 0 },
          { scaleY: 1, ease: 'none', scrollTrigger: { trigger: el.querySelector('.mg-steps'), start: 'top 75%', end: 'bottom 60%', scrub: true } },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const shown = Math.max(active, 0);
  const lit = (i: number) => active === -1 || i === active;

  return (
    <section ref={root} id="manage" data-stack className="py-[88px] md:py-[120px]">
      <div className="wrap">
        <Chapter n="04" name={t('Manage', 'إدارة')} line={t('One owner coordinating every specialist, deadline and review.', 'مسؤول واحد ينسّق كل متخصص وموعد ومراجعة.')} outline />

        <div className="grid gap-10 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14">
          {/* The dial sticks while the stages scroll past */}
          <div className="hidden md:block">
            <div className="sticky top-28 flex flex-col items-center gap-6">
              <div className="relative aspect-square w-full max-w-[340px]">
                <svg viewBox="0 0 280 280" className="absolute inset-0 h-full w-full -rotate-90" aria-hidden="true">
                  <circle cx="140" cy="140" r="120" fill="none" stroke="rgba(244,241,232,.1)" strokeWidth="2" />
                  <circle className="mg-ring" cx="140" cy="140" r="120" fill="none" stroke="#dca733" strokeWidth="3" strokeLinecap="round" />
                  {MANAGE_STEPS.map((_, i) => {
                    const a = (i / MANAGE_STEPS.length) * Math.PI * 2;
                    const done = i <= active;
                    return (
                      <circle
                        key={i}
                        cx={140 + 120 * Math.cos(a)}
                        cy={140 + 120 * Math.sin(a)}
                        r={done ? 7 : 5}
                        fill={done ? '#dca733' : '#0a0a0b'}
                        stroke="#dca733"
                        strokeWidth="2"
                        style={{ transition: 'r .3s, fill .3s' }}
                      />
                    );
                  })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
                  <span className="mg-sun inline-flex text-gold">
                    <AuricMark size={58} />
                  </span>
                  <span className="lab mt-2" aria-live="polite">
                    <span className="text-gold">{pad(shown + 1)}</span> / {pad(MANAGE_STEPS.length)}
                  </span>
                  <span className="font-display text-[28px] font-extrabold leading-none tracking-[-0.04em]">{MANAGE_STEPS[shown].t}</span>
                </div>
              </div>
              <p className="copy max-w-[30ch] text-center !text-[15px]">{t('One owner keeps every stage moving, so you always know where your project is.', 'مسؤول واحد يحرّك كل مرحلة، فتعرف دائمًا أين وصل مشروعك.')}</p>
            </div>
          </div>

          {/* The stages */}
          <ol className="mg-steps relative m-0 list-none p-0 ps-8 md:ps-0">
            <span aria-hidden="true" className="absolute bottom-0 start-[7px] top-0 w-px bg-[rgba(244,241,232,.12)] md:hidden" />
            <span aria-hidden="true" className="mg-line absolute bottom-0 start-[7px] top-0 w-[2px] origin-top bg-gold md:hidden" />
            {MANAGE_STEPS.map((s, i) => {
              const last = i === MANAGE_STEPS.length - 1;
              const on = i === active;
              const solid = on || (active === -1 && (i === 0 || last));
              return (
                <li
                  key={s.t}
                  className={`relative flex flex-col gap-3 border-t border-[var(--line)] py-8 transition-opacity duration-500 md:min-h-[34vh] md:justify-center md:py-10 ${lit(i) ? 'opacity-100' : 'md:opacity-30'}`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute -start-8 top-10 h-[15px] w-[15px] md:hidden ${last ? 'rotate-45 bg-gold' : 'rounded-full border-2 border-gold bg-ink'}`}
                  />
                  <div className="flex items-baseline gap-5">
                    <span className={`num-xl text-[52px] transition-colors duration-500 md:text-[84px] ${solid ? 'text-gold' : 'stroke-gold'}`}>{pad(i + 1)}</span>
                    <span
                      className={`font-display font-extrabold leading-none tracking-[-0.045em] transition-[color,transform] duration-500 ${on ? 'translate-x-3 text-gold rtl:-translate-x-3' : ''} ${last && active === -1 ? 'text-gold' : ''}`}
                      style={{ fontSize: 'clamp(30px,3.6vw,52px)' }}
                    >
                      {s.t}
                    </span>
                  </div>
                  <p className="copy max-w-[40ch]">{s.d}</p>
                  <span className="lab">{s.x}</span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* What Manage covers — its own section so the stacked Manage scene above
   (which eases back and dims) doesn't affect it; this block slides over it. */
function ManageServices() {
  return (
    <section className="bg-ink pb-[88px] pt-14 md:pb-[120px] md:pt-16">
      <div className="wrap">
        <div className="flex flex-col gap-8 border-t border-[var(--line)] pt-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-4">
            <span className="lab !text-gold">{t('What Manage covers', 'ما تشمله الإدارة')}</span>
            <ul className="m-0 flex list-none flex-wrap gap-[10px] p-0" data-pop>
              {MANAGE_SERVICES.map((sv) => (
                <li
                  key={sv}
                  className="rounded-full border border-[var(--line-strong)] px-5 py-3 font-display text-[15px] font-medium transition-colors hover:border-gold hover:text-gold md:text-[17px]"
                >
                  {sv}
                </li>
              ))}
            </ul>
          </div>
          <a href={CTA_HREF} className="btn btn-gold shrink-0 self-start lg:self-auto">
            {t('Discuss a project', 'ناقش مشروعك')}
          </a>
        </div>
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
      <ManageServices />
      <BigCTA dark lines={[t('Not sure?', 'لست متأكدًا؟'), <span className="text-gold">{t("Let's talk.", 'لنتحدث.')}</span>]} size="clamp(52px,10vw,150px)" />
    </Layout>
  );
}
