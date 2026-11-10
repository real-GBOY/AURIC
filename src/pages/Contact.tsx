import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import Layout from '../components/layout/Layout';
import { AuricMark } from '../components/Logo';
import { WhatsAppIcon } from '../components/ui/Icons';
import { TitleReveal } from '../components/ui/Reveal';
import { CONTACT, SOCIALS, emailHref, whatsappHref } from '../lib/site';
import { inView, rise, stagger } from '../lib/motion';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const WHO = ['business', 'startup', 'personal brand', 'professional', 'individual'];
const SERVICES = ['Video & motion', 'Graphic design', 'Voiceover & audio', 'Content & social', 'Marketing plan', 'Website', 'App or system', 'AI automation', 'Not sure yet'];
const BUDGET = ['open to discuss', 'a small project', 'a medium project', 'a large project'];
const TIME = ["when it's ready", 'as soon as possible', 'within 1–3 months', 'in 3+ months'];

type Status = 'idle' | 'sending' | 'sent' | 'error';

function useBrief() {
  const pkg = new URLSearchParams(window.location.search).get('package') ?? '';
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [who, setWho] = useState(WHO[0]);
  const [svc, setSvc] = useState<string[]>([]);
  const [goal, setGoal] = useState(pkg ? `talk about the ${pkg} package` : '');
  const [budget, setBudget] = useState(BUDGET[0]);
  const [time, setTime] = useState(TIME[0]);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [note, setNote] = useState('');

  const toggle = (s: string) => setSvc((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setNote('Tell us your name');
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return setNote('Enter a valid email so we can reply');
    setNote('');
    setStatus('sending');
    try {
      // Variable names match the existing "Contact Us" EmailJS template.
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: name.trim(),
          email,
          reply_to: email,
          title: svc.length ? `New project: ${svc.join(', ')}` : 'New project inquiry',
          time: new Date().toLocaleString(),
          message: [
            `Name: ${name.trim()}${company.trim() ? ` from ${company.trim()}` : ''}`,
            `I'm a: ${who}`,
            `Needs help with: ${svc.join(', ') || 'Not specified'}`,
            `Goal: ${goal.trim() || 'Not specified'}`,
            `Budget: ${budget}`,
            `Timeline: ${time}`,
            pkg ? `Package: ${pkg}` : '',
          ].filter(Boolean).join('\n'),
        },
        { publicKey: PUBLIC_KEY },
      );
      setStatus('sent');
    } catch (err) {
      console.error('EmailJS send failed:', err);
      setStatus('error');
      setNote('Something went wrong. Please try again or message us on WhatsApp.');
    }
  };

  return { name, setName, company, setCompany, who, setWho, svc, toggle, goal, setGoal, budget, setBudget, time, setTime, email, setEmail, status, note, submit };
}

type Brief = ReturnType<typeof useBrief>;

function Badge({ size, text }: { size: number; text: string }) {
  return (
    <div aria-hidden="true" className="relative shrink-0" style={{ width: size, height: size }}>
      <div className="absolute inset-0 animate-spin-slow motion-reduce:animate-none">
        <svg viewBox="0 0 200 200" width={size} height={size} className="block overflow-visible">
          <defs>
            <path id={`cb-${size}`} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
          </defs>
          <circle cx="100" cy="100" r="96" fill="none" stroke="rgba(244,241,232,.18)" strokeWidth="1" />
          <text fontFamily="Geist Mono, monospace" fontSize={size < 150 ? 15 : 13} fontWeight="500" fill="#f4f1e8">
            <textPath href={`#cb-${size}`} textLength="486" lengthAdjust="spacing">
              {text}
            </textPath>
          </text>
        </svg>
      </div>
      <AuricMark size={size * 0.34} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gold" />
    </div>
  );
}

function Status({ b, big = false }: { b: Brief; big?: boolean }) {
  return (
    <AnimatePresence mode="wait">
      {b.status === 'sent' ? (
        <motion.span key="ok" role="status" className={`lab !text-gold ${big ? '!text-[13px]' : '!text-[12px]'}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          ✓ Got it — we'll be in touch soon.
        </motion.span>
      ) : b.note ? (
        <motion.span key="note" role="alert" className="lab !text-[#e8916f]" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          {b.note}
        </motion.span>
      ) : (
        <motion.span key="hint" className="lab" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          Name and email required{big ? ' · everything else optional' : ''}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

/* P2 · Desktop: fill-in-the-blanks sentence. Blanks underline as you type. */
function SentenceForm({ b }: { b: Brief }) {
  const blank =
    'mx-[6px] border-0 border-b-2 border-gold bg-transparent px-1 align-baseline font-display font-semibold tracking-[-0.02em] text-cream outline-none transition-colors placeholder:text-[#3f3c38] focus:border-cream disabled:opacity-60';
  const sel = `${blank} cursor-pointer appearance-none pr-[10px] [&>option]:bg-surface [&>option]:text-base [&>option]:text-cream`;
  const sent = b.status === 'sent';
  return (
    <form onSubmit={b.submit} noValidate className="wrap relative hidden lg:block">
      <p className="font-display font-semibold leading-[1.6] tracking-[-0.02em] text-dim" style={{ fontSize: 'clamp(22px,2.4vw,36px)' }}>
        Hi AURIC, I'm
        <input aria-label="Your name" className={blank} style={{ width: 320, fontSize: 'inherit' }} placeholder="your name" autoComplete="name" value={b.name} onChange={(e) => b.setName(e.target.value)} disabled={sent} />
        from
        <input aria-label="Company or brand" className={blank} style={{ width: 440, fontSize: 'inherit' }} placeholder="company or brand" autoComplete="organization" value={b.company} onChange={(e) => b.setCompany(e.target.value)} disabled={sent} />. I'm a
        <select aria-label="Who you are" className={sel} style={{ width: 330, fontSize: 'inherit' }} value={b.who} onChange={(e) => b.setWho(e.target.value)} disabled={sent}>
          {WHO.map((w) => <option key={w}>{w}</option>)}
        </select>
        and I need help with
      </p>
      <div className="my-[18px] flex flex-wrap gap-[10px]" role="group" aria-label="Services you need">
        {SERVICES.map((s) => (
          <button key={s} type="button" className="chip !min-h-12 !px-5 !text-base" aria-pressed={b.svc.includes(s)} onClick={() => b.toggle(s)} disabled={sent}>
            {s}
          </button>
        ))}
      </div>
      <p className="font-display font-semibold leading-[1.6] tracking-[-0.02em] text-dim" style={{ fontSize: 'clamp(22px,2.4vw,36px)' }}>
        The goal is to
        <input aria-label="Your goal" className={blank} style={{ width: 620, fontSize: 'inherit' }} placeholder="launch our new brand" value={b.goal} onChange={(e) => b.setGoal(e.target.value)} disabled={sent} />. My budget is
        <select aria-label="Budget" className={sel} style={{ width: 440, fontSize: 'inherit' }} value={b.budget} onChange={(e) => b.setBudget(e.target.value)} disabled={sent}>
          {BUDGET.map((w) => <option key={w}>{w}</option>)}
        </select>
        and I'd like it
        <select aria-label="Timeline" className={sel} style={{ width: 500, fontSize: 'inherit' }} value={b.time} onChange={(e) => b.setTime(e.target.value)} disabled={sent}>
          {TIME.map((w) => <option key={w}>{w}</option>)}
        </select>
        . Reach me at
        <input aria-label="Your email" type="email" className={blank} style={{ width: 440, fontSize: 'inherit' }} placeholder="your email" autoComplete="email" value={b.email} onChange={(e) => b.setEmail(e.target.value)} disabled={sent} />.
      </p>
      <div className="mt-14 flex flex-wrap items-center gap-7">
        <motion.button
          type="submit"
          disabled={b.status === 'sending' || sent}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex min-h-[76px] items-center gap-4 rounded-full bg-gold px-10 font-display text-[22px] font-bold tracking-[-0.02em] text-[#141414] transition-colors hover:bg-gold-hi disabled:opacity-60"
        >
          {b.status === 'sending' ? 'Sending…' : sent ? 'Sent' : 'Send it'} <span aria-hidden="true">→</span>
        </motion.button>
        <Status b={b} big />
      </div>
    </form>
  );
}

/* One question of the phone brief. Defined outside StepForm so inputs keep focus while typing. */
function Step({ n, label, children }: { n: string; label: string; children: React.ReactNode }) {
  return (
    <motion.div className="flex flex-col gap-3" variants={rise}>
      <span className="lab flex gap-[10px] !text-gold">
        <span>{n}</span>
        <span className="text-muted">{label}</span>
      </span>
      {children}
    </motion.div>
  );
}

/* P2 · Phone (and tablet): the brief one question at a time, with tap chips. */
function StepForm({ b }: { b: Brief }) {
  const q = 'font-display text-[24px] font-medium leading-[1.3] tracking-[-0.015em]';
  const input =
    'w-full rounded-none border-0 border-b-2 border-[rgba(244,241,232,.3)] bg-transparent pb-[10px] pt-2 font-display text-[22px] font-medium text-gold outline-none transition-colors placeholder:text-dim focus:border-gold';
  const chips = (list: string[], on: (s: string) => boolean, pick: (s: string) => void, label: string) => (
    <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
      {list.map((s) => (
        <button key={s} type="button" className="chip !min-h-10 !px-4 !text-[14px]" aria-pressed={on(s)} onClick={() => pick(s)}>
          {s}
        </button>
      ))}
    </div>
  );
  return (
    <motion.form onSubmit={b.submit} noValidate className="flex flex-col gap-10 lg:hidden" initial="hidden" whileInView="visible" viewport={inView} variants={stagger(0.08)}>
      <Step n="01" label="Who">
        <p className={q}>Hi AURIC, I'm</p>
        <input aria-label="Your name" className={input} placeholder="your name" autoComplete="name" value={b.name} onChange={(e) => b.setName(e.target.value)} />
        <p className={q}>from</p>
        <input aria-label="Company or brand" className={input} placeholder="company or brand" autoComplete="organization" value={b.company} onChange={(e) => b.setCompany(e.target.value)} />
        <p className={`${q} mt-[6px]`}>I'm a</p>
        {chips(WHO, (s) => b.who === s, b.setWho, 'Who you are')}
      </Step>
      <Step n="02" label="What">
        <p className={q}>and I need help with</p>
        {chips(SERVICES, (s) => b.svc.includes(s), b.toggle, 'Services you need')}
      </Step>
      <Step n="03" label="Why">
        <p className={q}>The goal is to</p>
        <input aria-label="Your goal" className={input} placeholder="launch our new brand" value={b.goal} onChange={(e) => b.setGoal(e.target.value)} />
      </Step>
      <Step n="04" label="When">
        <p className={q}>I'd like it</p>
        {chips(TIME, (s) => b.time === s, b.setTime, 'Timeline')}
        <p className={`${q} mt-[6px]`}>and my budget is</p>
        {chips(BUDGET, (s) => b.budget === s, b.setBudget, 'Budget')}
      </Step>
      <Step n="05" label="Reply">
        <p className={q}>Reach me at</p>
        <input aria-label="Your email" type="email" className={input} placeholder="your email" autoComplete="email" value={b.email} onChange={(e) => b.setEmail(e.target.value)} />
      </Step>
      <div className="flex flex-col gap-[14px]">
        <button type="submit" disabled={b.status === 'sending' || b.status === 'sent'} className="btn btn-gold w-full !min-h-[60px] !rounded-md font-display !text-[18px] disabled:opacity-60">
          {b.status === 'sending' ? 'Sending…' : b.status === 'sent' ? 'Sent' : 'Send it →'}
        </button>
        <Status b={b} />
      </div>
    </motion.form>
  );
}

export default function Contact() {
  const b = useBrief();
  const next = [
    { t: 'We read it', d: 'A real person reviews your brief.' },
    { t: 'We call', d: 'A 15-minute call to understand the project.' },
    { t: 'You get a plan', d: 'Scope, timeline and a quote.' },
  ];
  const ig = SOCIALS.find((s) => s.label === 'Instagram');

  return (
    <Layout mobileCta="fab">
      {/* P1 · Title reveal and spinning badge */}
      <section className="overflow-hidden pb-8 pt-8 md:pb-16 md:pt-14">
        <div className="wrap flex flex-wrap items-end justify-between gap-8" data-hero-out>
          <div className="flex w-full items-end justify-between gap-3 md:w-auto md:justify-start md:gap-10">
            <TitleReveal lines={["Let's", <>talk<span className="text-gold">.</span></>]} style={{ fontSize: 'clamp(72px,15vw,230px)', lineHeight: 0.84, letterSpacing: '-0.06em' }} />
            <div className="mb-[6px] md:hidden">
              <Badge size={104} text="LET'S TALK · AURIC · LET'S TALK · AURIC · " />
            </div>
            <div className="mb-5 hidden md:block">
              <Badge size={180} text="TELL US WHAT YOU NEED · AURIC · LET'S TALK · AURIC · " />
            </div>
          </div>
          <motion.div className="flex max-w-[320px] flex-col gap-[14px] md:pb-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <span className="lab hidden !text-gold md:inline">Start a project</span>
            <p className="copy !text-base">
              <span className="md:hidden">Fastest reply on WhatsApp. Or fill in the short brief below; only your name and email are required.</span>
              <span className="hidden md:inline">Fill in the blanks. Only your name and email are required. We reply with a call link and a first plan.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* P3 · Quick channels, WhatsApp first (phones) */}
      <section className="wrap grid grid-cols-2 gap-[10px] pb-10 md:hidden">
        <motion.a
          href={whatsappHref()}
          className="col-span-2 flex items-center justify-between rounded-[14px] bg-whatsapp p-5 text-ink"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ delay: 1, duration: 0.8, ease: 'easeInOut' }}
        >
          <span className="flex flex-col gap-1">
            <span className="font-display text-[22px] font-bold tracking-[-0.03em]">WhatsApp us</span>
            <span className="text-[13px]">{CONTACT.whatsapp ? `+${CONTACT.whatsapp}` : '[+20 number]'} · usually within the hour</span>
          </span>
          <WhatsAppIcon />
        </motion.a>
        <a href={emailHref()} className="flex flex-col gap-[6px] rounded-[14px] border border-[rgba(244,241,232,.2)] p-4">
          <span className="lab">Email</span>
          <span className="truncate text-[14px]">{CONTACT.email || '[hello@…]'}</span>
        </a>
        <a href={ig?.href || '#'} className="flex flex-col gap-[6px] rounded-[14px] border border-[rgba(244,241,232,.2)] p-4">
          <span className="lab">Instagram</span>
          <span className="text-[14px]">[@auric]</span>
        </a>
      </section>

      {/* P2 · The brief */}
      <section className="border-t border-[rgba(244,241,232,.1)] pb-16 pt-11 md:pb-[120px] md:pt-16">
        <div className="wrap lg:!max-w-none lg:!px-0">
          <SentenceForm b={b} />
          <StepForm b={b} />
        </div>
      </section>

      {/* What happens next */}
      <section className="bg-bg py-14 md:py-24">
        <motion.div className="wrap grid gap-[22px] md:grid-cols-3 md:gap-8" initial="hidden" whileInView="visible" viewport={inView} variants={stagger(0.12)}>
          {next.map((s, i) => (
            <motion.div
              key={s.t}
              variants={rise}
              className={`grid grid-cols-[64px_1fr] items-start gap-[14px] border-t-2 pt-4 md:flex md:flex-col md:gap-3 md:pt-[22px] ${i === 0 ? 'border-gold' : 'border-[rgba(244,241,232,.25)]'}`}
            >
              <span className={`num-xl text-[40px] md:text-[56px] ${i === 0 ? 'text-gold' : 'stroke-gold'}`}>{String(i + 1).padStart(2, '0')}</span>
              <span className="flex flex-col gap-[6px] md:gap-3">
                <span className="font-display text-[17px] font-semibold md:text-[20px]">{s.t}</span>
                <p className="copy !text-[14px] md:!text-[15px]">{s.d}</p>
              </span>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </Layout>
  );
}
