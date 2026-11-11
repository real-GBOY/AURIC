import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import BigCTA from '../components/layout/BigCTA';
import { Reveal, TitleReveal } from '../components/ui/Reveal';
import { EASE, inView, rise, stagger } from '../lib/motion';
import { t } from '../lib/i18n';

const isRtl = () => typeof document !== 'undefined' && document.dir === 'rtl';

// Founder details and portraits. Leave `photo` empty to show the labelled placeholder.
const FOUNDER = {
  first: t('Mahmoud', 'محمود'),
  last: t('Nayel', 'نايل'),
  role: t('Founder and CEO', 'المؤسس والرئيس التنفيذي'),
  linkedin: '',
  photo: '/team/mahmoud-nayel.webp',
  bio: t('[Short bio: your background and what you lead at AURIC.]', '[نبذة قصيرة: خلفيتك وما تقوده في أوريك.]'),
};

// Second lead, shown under the founder with the layout mirrored. Fill in the details and add a photo
// (leave `photo` empty to show the labelled placeholder). Delete this block and its section to remove it.
const LEAD = {
  first: t('Sherif', 'شريف'),
  last: t('Ashraf', 'أشرف'),
  role: t('Creative Director', 'المدير الإبداعي'),
  linkedin: '',
  photo: '/team/sherif-ashraf.webp',
  bio: t('[Short bio: background and what this person leads at AURIC.]', '[نبذة قصيرة: الخلفية وما يقوده هذا الشخص في أوريك.]'),
};

/** Only confirmed members. Empty entries render as placeholders. */
const CORE: { name: string; role: string; photo: string }[] = [
  { name: t('[Name]', '[الاسم]'), role: t('[Role]', '[الدور]'), photo: '' },
  { name: t('[Name]', '[الاسم]'), role: t('[Role]', '[الدور]'), photo: '' },
  { name: t('[Name]', '[الاسم]'), role: t('[Role]', '[الدور]'), photo: '' },
  { name: t('[Name]', '[الاسم]'), role: t('[Role]', '[الدور]'), photo: '' },
];

const NETWORK = [
  ...t(
    ['Graphic designers', 'Video editors', 'Motion designers', 'Voiceover artists', 'Audio editors', 'Copywriters', 'Content creators', 'Marketing strategists', 'Software engineers', 'AI specialists', 'Project managers'],
    ['مصممو جرافيك', 'محررو فيديو', 'مصممو موشن', 'معلقون صوتيون', 'مهندسو صوت', 'كتّاب محتوى', 'صنّاع محتوى', 'استراتيجيو تسويق', 'مهندسو برمجيات', 'متخصصو ذكاء اصطناعي', 'مديرو مشاريع'],
  ),
];

const STEPS = [
  { t: t('Your brief', 'موجزك'), d: t('One conversation, one lead.', 'محادثة واحدة، ومسؤول واحد.') },
  { t: t('The right team', 'الفريق المناسب'), d: t('Specialists picked for the job.', 'متخصصون يُختارون للمهمة.') },
  { t: t('Made together', 'صُنع معًا'), d: t('Design, content and code to one plan.', 'تصميم ومحتوى وبرمجة وفق خطة واحدة.') },
  { t: t('Reviewed', 'مُراجَع'), d: t('Checked before you see it.', 'يُراجَع قبل أن تراه.') },
  { t: t('Delivered', 'مُسلَّم'), d: t('On time, one point of contact.', 'في الموعد، ونقطة تواصل واحدة.') },
];

/* T2 · portrait: greyscale until hover */
function Portrait({ photo, alt, ratio, color = false, children }: { photo: string; alt: string; ratio: string; color?: boolean; children?: React.ReactNode }) {
  return (
    <div data-tilt className="ph group relative overflow-hidden rounded-[10px]" style={{ aspectRatio: ratio }}>
      {photo ? (
        <img src={photo} alt={alt} loading="lazy" className={`absolute inset-0 h-full w-full max-w-none object-cover ${color ? '' : 'grayscale group-hover:grayscale-0'} transition-[filter,transform] duration-700 group-hover:scale-[1.03]`} />
      ) : null}
      {children}
    </div>
  );
}

export default function Team() {
  return (
    <Layout>
      {/* T1 · Title reveal */}
      <section className="pb-16 pt-10 md:pb-[88px] md:pt-14">
        <div className="wrap flex flex-wrap items-end justify-between gap-8" data-hero-out>
          <TitleReveal
            lines={t([<>The</>, <>people<span className="text-gold">.</span></>], [<>الفريق</>, <>والناس<span className="text-gold">.</span></>])}
            style={{ fontSize: 'clamp(72px,15vw,230px)', lineHeight: 0.84, letterSpacing: '-0.06em' }}
          />
          <motion.p className="copy max-w-[36ch] pb-[18px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            Designers, editors, strategists and engineers, working as one team so your project has one owner.
          </motion.p>
        </div>
      </section>

      {/* Founder */}
      <section className="pb-20 md:pb-[120px]">
        <div className="wrap">
          <div className="mb-7 flex items-end justify-between">
            <span className="lab !text-gold">{FOUNDER.role}</span>
            <span className="lab">01</span>
          </div>
          <div className="grid items-end gap-6 md:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={inView} transition={{ duration: 0.9, ease: EASE }}>
              <Portrait photo={FOUNDER.photo} alt={`${FOUNDER.first} ${FOUNDER.last}`} ratio="4/5" color>
                {!FOUNDER.photo && <span className="lab absolute left-6 top-[22px] !text-[11px] !text-gold">{t('Portrait · placeholder', 'صورة · مساحة مؤقتة')}</span>}
              </Portrait>
            </motion.div>
            <div className="flex flex-col gap-[22px] pb-3">
              <TitleReveal
                as="h2"
                onLoad={false}
                className="font-display font-extrabold leading-[.88] tracking-[-0.055em]"
                style={{ fontSize: 'clamp(52px,7vw,110px)' }}
                lines={[FOUNDER.first, <>{FOUNDER.last}<span className="text-gold">.</span></>]}
              />
              <Reveal className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-[rgba(244,241,232,.14)] pt-[18px]">
                <span className="font-display text-[clamp(22px,2.4vw,34px)] font-bold leading-none tracking-[-0.03em] text-gold">{FOUNDER.role}</span>
                {FOUNDER.linkedin && (
                  <a href={FOUNDER.linkedin} className="lab tap !text-cream hover:!text-gold" target="_blank" rel="noreferrer">
                    LinkedIn ↗
                  </a>
                )}
              </Reveal>
              <Reveal as="p" className="copy max-w-[40ch]">
                {FOUNDER.bio}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Second lead: same block as the founder, mirrored (text left, portrait right) */}
      <section className="pb-20 md:pb-[120px]">
        <div className="wrap">
          <div className="mb-7 flex items-end justify-between">
            <span className="lab !text-gold">{LEAD.role}</span>
            <span className="lab">02</span>
          </div>
          <div className="grid items-end gap-6 md:grid-cols-2">
            <motion.div className="md:order-2" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={inView} transition={{ duration: 0.9, ease: EASE }}>
              <Portrait photo={LEAD.photo} alt={`${LEAD.first} ${LEAD.last}`} ratio="4/5">
                {!LEAD.photo && <span className="lab absolute left-6 top-[22px] !text-[11px] !text-gold">{t('Portrait · placeholder', 'صورة · مساحة مؤقتة')}</span>}
              </Portrait>
            </motion.div>
            <div className="flex flex-col gap-[22px] pb-3 md:order-1">
              <TitleReveal
                as="h2"
                onLoad={false}
                className="font-display font-extrabold leading-[.88] tracking-[-0.055em]"
                style={{ fontSize: 'clamp(52px,7vw,110px)' }}
                lines={[LEAD.first, <>{LEAD.last}<span className="text-gold">.</span></>]}
              />
              <Reveal className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-[rgba(244,241,232,.14)] pt-[18px]">
                <span className="font-display text-[clamp(22px,2.4vw,34px)] font-bold leading-none tracking-[-0.03em] text-gold">{LEAD.role}</span>
                {LEAD.linkedin && (
                  <a href={LEAD.linkedin} className="lab tap !text-cream hover:!text-gold" target="_blank" rel="noreferrer">
                    LinkedIn ↗
                  </a>
                )}
              </Reveal>
              <Reveal as="p" className="copy max-w-[40ch]">
                {LEAD.bio}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Core team */}
      <section data-stack className="bg-bg py-20 md:py-[120px]">
        <div className="wrap">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 className="h2">{t('Core team', 'الفريق الأساسي')}</h2>
            <span className="lab">{t('03 · confirmed members only', '03 · الأعضاء المؤكدون فقط')}</span>
          </Reveal>
          <motion.div className="grid grid-cols-2 gap-5 lg:grid-cols-4" initial="hidden" whileInView="visible" viewport={inView} variants={stagger(0.1)}>
            {CORE.map((m, i) => (
              <motion.div key={i} variants={rise} className={`flex flex-col gap-[14px] ${i % 2 ? 'mt-10' : ''}`}>
                <Portrait photo={m.photo} alt={m.name} ratio="3/4">
                  <span className="num-xl stroke-gold absolute left-4 top-3 text-[44px] [-webkit-text-stroke-width:1.2px]">{String(i + 1).padStart(2, '0')}</span>
                  {!m.photo && <span className="lab absolute bottom-[14px] left-4 !text-[11px] !text-gold">{t('Portrait · placeholder', 'صورة · مساحة مؤقتة')}</span>}
                </Portrait>
                <span className="h3 !text-[19px]">{m.name}</span>
                <span className="lab">{m.role}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* T3 · Extended network: names drift slowly */}
      <section className="overflow-hidden py-20 md:py-[120px]">
        <div className="wrap">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div className="flex flex-col gap-[14px]">
              <h2 className="h2">{t('Extended network', 'الشبكة الموسّعة')}</h2>
              <p className="copy max-w-[48ch]">{t('Specialists we brief, review and manage. They work through AURIC, so quality stays ours.', 'متخصصون نوجّههم ونراجع عملهم وندير مشاريعهم. يعملون من خلال أوريك، فتبقى الجودة مسؤوليتنا.')}</p>
            </div>
            <span className="lab">04</span>
          </Reveal>
          <p className="m-0" data-scrub-x={isRtl() ? '6' : '-6'} data-scrub-words>
            {NETWORK.map((n, i) => (
              // Each name carries its own "/" so a separator never starts a line.
              <motion.span
                key={n}
                className="inline font-display font-bold leading-[1.25] tracking-[-0.04em]"
                style={{ fontSize: 'clamp(26px,3.6vw,54px)' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={inView}
                transition={{ delay: i * 0.05, duration: 0.6 }}
              >
                <span className={(i + 1) % 3 === 0 ? 'stroke-gold [-webkit-text-stroke-width:1.2px]' : ''}>{n}</span>
                {i < NETWORK.length - 1 && <b className="font-light text-charcoal">{' / '}</b>}
              </motion.span>
            ))}
          </p>
        </div>
      </section>

      {/* How we work together */}
      <section className="bg-bg py-20 md:py-[120px]">
        <div className="wrap">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 className="h2">{t('How we work together', 'كيف نعمل معًا')}</h2>
            <span className="lab">04</span>
          </Reveal>
          <motion.ol
            className="m-0 grid list-none grid-cols-2 border-t border-[rgba(244,241,232,.14)] p-0 lg:grid-cols-5"
            initial="hidden"
            whileInView="visible"
            viewport={inView}
            variants={stagger(0.1)}
          >
            {STEPS.map((s, i) => (
              <motion.li
                key={s.t}
                variants={rise}
                className={`flex flex-col gap-3 border-b border-[rgba(244,241,232,.14)] py-6 ${i === 4 ? 'col-span-2' : i % 2 === 0 ? 'border-e pe-4' : 'ps-4'} lg:col-span-1 lg:border-b-0 lg:border-e lg:px-5 lg:pb-0 lg:pt-[30px] lg:first:ps-0 lg:last:border-e-0`}
              >
                <span className={`num-xl text-[48px] md:text-[72px] ${i === 0 || i === 4 ? 'text-gold' : 'stroke-gold'}`}>{String(i + 1).padStart(2, '0')}</span>
                <span className="h3 !text-[19px]">{s.t}</span>
                <p className="copy !text-[15px]">{s.d}</p>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      <BigCTA lines={t([<>Work</>, <>with us<span className="text-gold">.</span></>], [<>اعمل</>, <>معنا<span className="text-gold">.</span></>])} size="clamp(60px,10vw,150px)" />
    </Layout>
  );
}
