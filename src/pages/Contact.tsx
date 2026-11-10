import { useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import Layout from '../components/layout/Layout';
import { AuricMark } from '../components/Logo';
import { WhatsAppIcon } from '../components/ui/Icons';
import { TitleReveal } from '../components/ui/Reveal';
import { CONTACT, SOCIALS, emailHref, whatsappHref } from '../lib/site';
import { ARROW, LANG, t } from '../lib/i18n';
import { inView, rise, stagger } from '../lib/motion';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Options keep an English value (what lands in the email you receive) and a label in the visitor's language.
type Opt = { en: string; ar: string };
const o = (en: string, ar: string): Opt => ({ en, ar });
const label = (x: Opt) => t(x.en, x.ar);

const WHO = [o('business', 'شركة'), o('startup', 'شركة ناشئة'), o('personal brand', 'علامة شخصية'), o('professional', 'مهني'), o('individual', 'فرد')];
const SERVICES = [
  o('Video & motion', 'فيديو وموشن'), o('Graphic design', 'تصميم جرافيك'), o('Voiceover & audio', 'تعليق صوتي وصوتيات'),
  o('Content & social', 'محتوى وسوشيال'), o('Marketing plan', 'خطة تسويق'), o('Website', 'موقع'),
  o('App or system', 'تطبيق أو نظام'), o('AI automation', 'أتمتة بالذكاء الاصطناعي'), o('Not sure yet', 'لست متأكدًا بعد'),
];
const BUDGET = [o('open to discuss', 'مفتوحة للنقاش'), o('a small project', 'صغيرة'), o('a medium project', 'متوسطة'), o('a large project', 'كبيرة')];
const TIME = [o("when it's ready", 'عندما يكون جاهزًا'), o('as soon as possible', 'في أقرب وقت'), o('within 1–3 months', 'خلال 1–3 أشهر'), o('in 3+ months', 'بعد أكثر من 3 أشهر')];

// Spam protection (client side): a hidden trap field bots fill in, a minimum time on the page,
// a short pause between sends, and length limits.
const MIN_FILL_MS = 2500;
const COOLDOWN_MS = 60_000;
const COOLDOWN_KEY = 'auric:last-send';
const LIMITS = { name: 100, company: 120, goal: 300, email: 160 };

type Status = 'idle' | 'sending' | 'sent' | 'error';

function useBrief() {
  const pkg = new URLSearchParams(window.location.search).get('package') ?? '';
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [who, setWho] = useState(WHO[0].en);
  const [svc, setSvc] = useState<string[]>([]);
  const [goal, setGoal] = useState(pkg ? `talk about the ${pkg} package` : '');
  const [budget, setBudget] = useState(BUDGET[0].en);
  const [time, setTime] = useState(TIME[0].en);
  const [email, setEmail] = useState('');
  const [trap, setTrap] = useState(''); // hidden field: humans never see it, bots fill it in
  const [status, setStatus] = useState<Status>('idle');
  const [note, setNote] = useState('');
  const openedAt = useRef(Date.now());

  const toggle = (s: string) => setSvc((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'sending' || status === 'sent') return;
    if (!name.trim()) return setNote(t('Tell us your name', 'أخبرنا باسمك'));
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return setNote(t('Enter a valid email so we can reply', 'أدخل بريدًا إلكترونيًا صحيحًا لنتمكن من الرد'));

    // A bot filled the hidden field: pretend it worked and send nothing.
    if (trap) {
      setNote('');
      return setStatus('sent');
    }
    if (Date.now() - openedAt.current < MIN_FILL_MS) return setNote(t('Please take a moment and try again.', 'من فضلك انتظر لحظة وحاول مرة أخرى.'));
    try {
      const last = Number(localStorage.getItem(COOLDOWN_KEY) || 0);
      if (Date.now() - last < COOLDOWN_MS) return setNote(t('You just sent a message. Please wait a minute before sending another.', 'لقد أرسلت رسالة للتو. انتظر دقيقة قبل إرسال أخرى.'));
    } catch {
      /* storage can be unavailable (private mode); skip the pause */
    }

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
            `Site language: ${LANG === 'ar' ? 'Arabic' : 'English'}`,
          ]
            .filter(Boolean)
            .join('\n'),
        },
        { publicKey: PUBLIC_KEY },
      );
      try {
        localStorage.setItem(COOLDOWN_KEY, String(Date.now()));
      } catch {
        /* ignore */
      }
      setStatus('sent');
    } catch (err) {
      console.error('EmailJS send failed:', err);
      setStatus('error');
      setNote(t('Something went wrong. Please try again or message us on WhatsApp.', 'حدث خطأ ما. حاول مرة أخرى أو راسلنا على واتساب.'));
    }
  };

  return { name, setName, company, setCompany, who, setWho, svc, toggle, goal, setGoal, budget, setBudget, time, setTime, email, setEmail, trap, setTrap, status, note, submit };
}

type Brief = ReturnType<typeof useBrief>;

/** Hidden trap field. Off-screen and out of the tab order, so real visitors never meet it. */
function Trap({ b }: { b: Brief }) {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', width: 1, height: 1, margin: -1, overflow: 'hidden', clip: 'rect(0 0 0 0)', whiteSpace: 'nowrap' }}>
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" value={b.trap} onChange={(e) => b.setTrap(e.target.value)} />
      </label>
    </div>
  );
}

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
          {t("✓ Got it — we'll be in touch soon.", '✓ وصلتنا رسالتك — سنتواصل معك قريبًا.')}
        </motion.span>
      ) : b.note ? (
        <motion.span key="note" role="alert" className="lab !text-[#e8916f]" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          {b.note}
        </motion.span>
      ) : (
        <motion.span key="hint" className="lab" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {t('Name and email required', 'الاسم والبريد الإلكتروني مطلوبان')}
          {big ? t(' · everything else optional', ' · الباقي اختياري') : ''}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

const sendLabel = (b: Brief) => (b.status === 'sending' ? t('Sending…', 'جارٍ الإرسال…') : b.status === 'sent' ? t('Sent', 'تم الإرسال') : t('Send it', 'أرسل'));

/* P2 · Desktop: fill-in-the-blanks sentence. Blanks underline as you type. */
function SentenceForm({ b }: { b: Brief }) {
  const blank =
    'mx-[6px] border-0 border-b-2 border-gold bg-transparent px-1 align-baseline font-display font-semibold tracking-[-0.02em] text-cream outline-none transition-colors placeholder:text-[#3f3c38] focus:border-cream disabled:opacity-60';
  const sel = `${blank} cursor-pointer appearance-none pe-[10px] [&>option]:bg-surface [&>option]:text-base [&>option]:text-cream`;
  const sent = b.status === 'sent';
  const sentence = 'font-display font-semibold leading-[1.6] tracking-[-0.02em] text-dim';
  const size = { fontSize: 'clamp(22px,2.4vw,36px)' };
  return (
    <form onSubmit={b.submit} noValidate className="wrap relative hidden lg:block">
      <Trap b={b} />
      <p className={sentence} style={size}>
        {t("Hi AURIC, I'm", 'مرحبًا أوريك، أنا')}
        <input aria-label={t('Your name', 'اسمك')} className={blank} style={{ width: 320, fontSize: 'inherit' }} placeholder={t('your name', 'اسمك')} autoComplete="name" maxLength={LIMITS.name} value={b.name} onChange={(e) => b.setName(e.target.value)} disabled={sent} />
        {t('from', 'من')}
        <input aria-label={t('Company or brand', 'الشركة أو العلامة')} className={blank} style={{ width: 440, fontSize: 'inherit' }} placeholder={t('company or brand', 'الشركة أو العلامة')} autoComplete="organization" maxLength={LIMITS.company} value={b.company} onChange={(e) => b.setCompany(e.target.value)} disabled={sent} />
        {t(". I'm a", '. وأنا')}
        <select aria-label={t('Who you are', 'من أنت')} className={sel} style={{ width: 330, fontSize: 'inherit' }} value={b.who} onChange={(e) => b.setWho(e.target.value)} disabled={sent}>
          {WHO.map((w) => <option key={w.en} value={w.en}>{label(w)}</option>)}
        </select>
        {t('and I need help with', 'وأحتاج مساعدة في')}
      </p>
      <div className="my-[18px] flex flex-wrap gap-[10px]" role="group" aria-label={t('Services you need', 'الخدمات التي تحتاجها')}>
        {SERVICES.map((s) => (
          <button key={s.en} type="button" className="chip !min-h-12 !px-5 !text-base" aria-pressed={b.svc.includes(s.en)} onClick={() => b.toggle(s.en)} disabled={sent}>
            {label(s)}
          </button>
        ))}
      </div>
      <p className={sentence} style={size}>
        {t('The goal is to', 'هدفي هو')}
        <input aria-label={t('Your goal', 'هدفك')} className={blank} style={{ width: 620, fontSize: 'inherit' }} placeholder={t('launch our new brand', 'إطلاق علامتنا الجديدة')} maxLength={LIMITS.goal} value={b.goal} onChange={(e) => b.setGoal(e.target.value)} disabled={sent} />
        {t('. My budget is', '. وميزانيتي')}
        <select aria-label={t('Budget', 'الميزانية')} className={sel} style={{ width: 440, fontSize: 'inherit' }} value={b.budget} onChange={(e) => b.setBudget(e.target.value)} disabled={sent}>
          {BUDGET.map((w) => <option key={w.en} value={w.en}>{label(w)}</option>)}
        </select>
        {t("and I'd like it", 'وأريده')}
        <select aria-label={t('Timeline', 'الموعد')} className={sel} style={{ width: 500, fontSize: 'inherit' }} value={b.time} onChange={(e) => b.setTime(e.target.value)} disabled={sent}>
          {TIME.map((w) => <option key={w.en} value={w.en}>{label(w)}</option>)}
        </select>
        {t('. Reach me at', '. راسلني على')}
        <input aria-label={t('Your email', 'بريدك الإلكتروني')} dir="ltr" type="email" className={blank} style={{ width: 440, fontSize: 'inherit' }} placeholder={t('your email', 'بريدك الإلكتروني')} autoComplete="email" maxLength={LIMITS.email} value={b.email} onChange={(e) => b.setEmail(e.target.value)} disabled={sent} />.
      </p>
      <div className="mt-14 flex flex-wrap items-center gap-7">
        <motion.button
          type="submit"
          disabled={b.status === 'sending' || sent}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex min-h-[76px] items-center gap-4 rounded-full bg-gold px-10 font-display text-[22px] font-bold tracking-[-0.02em] text-[#141414] transition-colors hover:bg-gold-hi disabled:opacity-60"
        >
          {sendLabel(b)} <span aria-hidden="true">{ARROW}</span>
        </motion.button>
        <Status b={b} big />
      </div>
    </form>
  );
}

/* One question of the phone brief. Defined outside StepForm so inputs keep focus while typing. */
function Step({ n, label: title, children }: { n: string; label: string; children: React.ReactNode }) {
  return (
    <motion.div className="flex flex-col gap-3" variants={rise}>
      <span className="lab flex gap-[10px] !text-gold">
        <span>{n}</span>
        <span className="text-muted">{title}</span>
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
  const chips = (list: Opt[], on: (s: string) => boolean, pick: (s: string) => void, groupLabel: string) => (
    <div className="flex flex-wrap gap-2" role="group" aria-label={groupLabel}>
      {list.map((s) => (
        <button key={s.en} type="button" className="chip !min-h-10 !px-4 !text-[14px]" aria-pressed={on(s.en)} onClick={() => pick(s.en)}>
          {label(s)}
        </button>
      ))}
    </div>
  );
  return (
    <motion.form onSubmit={b.submit} noValidate className="relative flex flex-col gap-10 lg:hidden" initial="hidden" whileInView="visible" viewport={inView} variants={stagger(0.08)}>
      <Trap b={b} />
      <Step n="01" label={t('Who', 'من')}>
        <p className={q}>{t("Hi AURIC, I'm", 'مرحبًا أوريك، أنا')}</p>
        <input aria-label={t('Your name', 'اسمك')} className={input} placeholder={t('your name', 'اسمك')} autoComplete="name" maxLength={LIMITS.name} value={b.name} onChange={(e) => b.setName(e.target.value)} />
        <p className={q}>{t('from', 'من')}</p>
        <input aria-label={t('Company or brand', 'الشركة أو العلامة')} className={input} placeholder={t('company or brand', 'الشركة أو العلامة')} autoComplete="organization" maxLength={LIMITS.company} value={b.company} onChange={(e) => b.setCompany(e.target.value)} />
        <p className={`${q} mt-[6px]`}>{t("I'm a", 'وأنا')}</p>
        {chips(WHO, (s) => b.who === s, b.setWho, t('Who you are', 'من أنت'))}
      </Step>
      <Step n="02" label={t('What', 'ماذا')}>
        <p className={q}>{t('and I need help with', 'وأحتاج مساعدة في')}</p>
        {chips(SERVICES, (s) => b.svc.includes(s), b.toggle, t('Services you need', 'الخدمات التي تحتاجها'))}
      </Step>
      <Step n="03" label={t('Why', 'لماذا')}>
        <p className={q}>{t('The goal is to', 'هدفي هو')}</p>
        <input aria-label={t('Your goal', 'هدفك')} className={input} placeholder={t('launch our new brand', 'إطلاق علامتنا الجديدة')} maxLength={LIMITS.goal} value={b.goal} onChange={(e) => b.setGoal(e.target.value)} />
      </Step>
      <Step n="04" label={t('When', 'متى')}>
        <p className={q}>{t("I'd like it", 'أريده')}</p>
        {chips(TIME, (s) => b.time === s, b.setTime, t('Timeline', 'الموعد'))}
        <p className={`${q} mt-[6px]`}>{t('and my budget is', 'وميزانيتي')}</p>
        {chips(BUDGET, (s) => b.budget === s, b.setBudget, t('Budget', 'الميزانية'))}
      </Step>
      <Step n="05" label={t('Reply', 'الرد')}>
        <p className={q}>{t('Reach me at', 'راسلني على')}</p>
        <input aria-label={t('Your email', 'بريدك الإلكتروني')} dir="ltr" type="email" className={input} placeholder={t('your email', 'بريدك الإلكتروني')} autoComplete="email" maxLength={LIMITS.email} value={b.email} onChange={(e) => b.setEmail(e.target.value)} />
      </Step>
      <div className="flex flex-col gap-[14px]">
        <button type="submit" disabled={b.status === 'sending' || b.status === 'sent'} className="btn btn-gold w-full !min-h-[60px] !rounded-md font-display !text-[18px] disabled:opacity-60">
          {sendLabel(b)} {ARROW}
        </button>
        <Status b={b} />
      </div>
    </motion.form>
  );
}

export default function Contact() {
  const b = useBrief();
  const next = [
    { t: t('We read it', 'نقرأ طلبك'), d: t('A real person reviews your brief.', 'شخص حقيقي يراجع موجزك.') },
    { t: t('We call', 'نتصل بك'), d: t('A 15-minute call to understand the project.', 'مكالمة من 15 دقيقة لفهم المشروع.') },
    { t: t('You get a plan', 'تحصل على خطة'), d: t('Scope, timeline and a quote.', 'النطاق والجدول الزمني وعرض السعر.') },
  ];
  const ig = SOCIALS.find((s) => s.label === 'Instagram');

  return (
    <Layout mobileCta="fab">
      {/* P1 · Title reveal and spinning badge */}
      <section className="overflow-hidden pb-8 pt-8 md:pb-16 md:pt-14">
        <div className="wrap flex flex-wrap items-end justify-between gap-8" data-hero-out>
          <div className="flex w-full items-end justify-between gap-3 md:w-auto md:justify-start md:gap-10">
            <TitleReveal
              lines={t([<>Let's</>, <>talk<span className="text-gold">.</span></>], [<>لنتحدّث<span className="text-gold">.</span></>])}
              style={{ fontSize: 'clamp(72px,15vw,230px)', lineHeight: 0.84, letterSpacing: '-0.06em' }}
            />
            <div className="mb-[6px] md:hidden">
              <Badge size={104} text="LET'S TALK · AURIC · LET'S TALK · AURIC · " />
            </div>
            <div className="mb-5 hidden md:block">
              <Badge size={180} text="TELL US WHAT YOU NEED · AURIC · LET'S TALK · AURIC · " />
            </div>
          </div>
          <motion.div className="flex max-w-[320px] flex-col gap-[14px] md:pb-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <span className="lab hidden !text-gold md:inline">{t('Start a project', 'ابدأ مشروعًا')}</span>
            <p className="copy !text-base">
              <span className="md:hidden">{t('Fastest reply on WhatsApp. Or fill in the short brief below; only your name and email are required.', 'الرد الأسرع على واتساب. أو املأ الموجز القصير أدناه؛ الاسم والبريد الإلكتروني فقط مطلوبان.')}</span>
              <span className="hidden md:inline">{t('Fill in the blanks. Only your name and email are required. We reply with a call link and a first plan.', 'املأ الفراغات. الاسم والبريد الإلكتروني فقط مطلوبان. نرد برابط مكالمة وخطة أولى.')}</span>
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
            <span className="font-display text-[22px] font-bold tracking-[-0.03em]">{t('WhatsApp us', 'راسلنا على واتساب')}</span>
            <span className="text-[13px]">
              <bdi>{CONTACT.whatsapp ? `+${CONTACT.whatsapp}` : '[+20 number]'}</bdi> · {t('usually within the hour', 'عادةً خلال ساعة')}
            </span>
          </span>
          <WhatsAppIcon />
        </motion.a>
        <a href={emailHref()} className="flex flex-col gap-[6px] rounded-[14px] border border-[rgba(244,241,232,.2)] p-4">
          <span className="lab">{t('Email', 'البريد')}</span>
          <span className="truncate text-[14px]" dir="ltr">{CONTACT.email || '[hello@…]'}</span>
        </a>
        <a href={ig?.href || '#'} className="flex flex-col gap-[6px] rounded-[14px] border border-[rgba(244,241,232,.2)] p-4">
          <span className="lab">{t('Instagram', 'إنستغرام')}</span>
          <span className="text-[14px]" dir="ltr">[@auric]</span>
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
