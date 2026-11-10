import { motion } from 'framer-motion';
import Layout from '../components/layout/Layout';
import BigCTA from '../components/layout/BigCTA';
import { Reveal, TitleReveal } from '../components/ui/Reveal';
import { EASE, inView, rise, stagger } from '../lib/motion';

// Founder details and portraits. Leave `photo` empty to show the labelled placeholder.
const FOUNDER = {
  first: 'Mahmoud',
  last: 'Nayel',
  role: 'Founder',
  linkedin: '',
  photo: '',
  bio: '[Short bio: your background and what you lead at AURIC.]',
};

/** Only confirmed members. Empty entries render as placeholders. */
const CORE: { name: string; role: string; photo: string }[] = [
  { name: '[Name]', role: '[Role]', photo: '' },
  { name: '[Name]', role: '[Role]', photo: '' },
  { name: '[Name]', role: '[Role]', photo: '' },
  { name: '[Name]', role: '[Role]', photo: '' },
];

const NETWORK = [
  'Graphic designers', 'Video editors', 'Motion designers', 'Voiceover artists', 'Audio editors', 'Copywriters',
  'Content creators', 'Marketing strategists', 'Software engineers', 'AI specialists', 'Project managers',
];

const STEPS = [
  { t: 'Your brief', d: 'One conversation, one lead.' },
  { t: 'The right team', d: 'Specialists picked for the job.' },
  { t: 'Made together', d: 'Design, content and code to one plan.' },
  { t: 'Reviewed', d: 'Checked before you see it.' },
  { t: 'Delivered', d: 'On time, one point of contact.' },
];

/* T2 · portrait: greyscale until hover */
function Portrait({ photo, alt, ratio, children }: { photo: string; alt: string; ratio: string; children?: React.ReactNode }) {
  return (
    <div className="ph group relative overflow-hidden rounded-[10px]" style={{ aspectRatio: ratio }}>
      {photo ? (
        <img src={photo} alt={alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover grayscale transition-[filter,transform] duration-700 group-hover:scale-[1.03] group-hover:grayscale-0" />
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
        <div className="wrap flex flex-wrap items-end justify-between gap-8">
          <TitleReveal
            lines={['The', <>people<span className="text-gold">.</span></>]}
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
            <span className="lab !text-gold">Founder</span>
            <span className="lab">01</span>
          </div>
          <div className="grid items-end gap-6 md:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={inView} transition={{ duration: 0.9, ease: EASE }}>
              <Portrait photo={FOUNDER.photo} alt={`${FOUNDER.first} ${FOUNDER.last}`} ratio="4/5">
                {!FOUNDER.photo && <span className="lab absolute left-6 top-[22px] !text-[11px] !text-gold">Portrait · placeholder</span>}
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
              <Reveal className="flex flex-wrap gap-6 border-t border-[rgba(244,241,232,.14)] pt-[18px]">
                <span className="lab !text-gold">{FOUNDER.role}</span>
                <a href={FOUNDER.linkedin || '#'} className="lab tap !text-cream hover:!text-gold" target={FOUNDER.linkedin ? '_blank' : undefined} rel="noreferrer">
                  LinkedIn ↗
                </a>
              </Reveal>
              <Reveal as="p" className="copy max-w-[40ch]">
                {FOUNDER.bio}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Core team */}
      <section className="bg-bg py-20 md:py-[120px]">
        <div className="wrap">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 className="h2">Core team</h2>
            <span className="lab">02 · confirmed members only</span>
          </Reveal>
          <motion.div className="grid grid-cols-2 gap-5 lg:grid-cols-4" initial="hidden" whileInView="visible" viewport={inView} variants={stagger(0.1)}>
            {CORE.map((m, i) => (
              <motion.div key={i} variants={rise} className={`flex flex-col gap-[14px] ${i % 2 ? 'mt-10' : ''}`}>
                <Portrait photo={m.photo} alt={m.name} ratio="3/4">
                  <span className="num-xl stroke-gold absolute left-4 top-3 text-[44px] [-webkit-text-stroke-width:1.2px]">{String(i + 1).padStart(2, '0')}</span>
                  {!m.photo && <span className="lab absolute bottom-[14px] left-4 !text-[11px] !text-gold">Portrait · placeholder</span>}
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
              <h2 className="h2">Extended network</h2>
              <p className="copy max-w-[48ch]">Specialists we brief, review and manage. They work through AURIC, so quality stays ours.</p>
            </div>
            <span className="lab">03</span>
          </Reveal>
          <motion.p
            className="m-0"
            animate={{ x: [0, -18, 0, 14, 0] }}
            transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
          >
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
          </motion.p>
        </div>
      </section>

      {/* How we work together */}
      <section className="bg-bg py-20 md:py-[120px]">
        <div className="wrap">
          <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <h2 className="h2">How we work together</h2>
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

      <BigCTA lines={['Work', <>with us<span className="text-gold">.</span></>]} size="clamp(60px,10vw,150px)" />
    </Layout>
  );
}
