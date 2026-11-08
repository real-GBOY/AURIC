import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Eyebrow from './Eyebrow';
import { fadeUp, scaleIn, gridStagger } from '../lib/variants';
import { WRAP } from '../lib/data';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const PROJECT_TYPES = [
  'High-Performance Website',
  'Custom Web Application',
  'Mobile App',
  'AI-Powered Solution',
  'Business Automation',
  'Dashboard & Analytics',
  'API Integration',
  'Something Else',
];

const fieldClass =
  'w-full border border-[var(--line)] rounded text-cream text-[13px] px-[18px] py-4 outline-none transition-colors duration-200 focus:border-gold disabled:opacity-60 placeholder:text-muted';
const fieldStyle = { background: 'var(--surface)', fontFamily: '"IBM Plex Mono"', letterSpacing: '0.03em', color: 'var(--cream)' };

export default function CTA() {
  const [name,    setName]      = useState('');
  const [email,   setEmail]     = useState('');
  const [project, setProject]   = useState('');
  const [message, setMessage]   = useState('');
  const [note,    setNote]      = useState('');
  const [sending, setSending]   = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setNote('✗ Tell us your name');
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setNote('✗ Enter a valid email to continue');
      return;
    }

    setSending(true);
    setNote('');
    try {
      // Variable names match the "Contact Us" EmailJS template:
      // {{title}} in the subject, {{name}}, {{email}}, {{time}}, {{message}} in the body.
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: name.trim(),
          email,
          reply_to: email,
          title: project || 'New project inquiry',
          time: new Date().toLocaleString(),
          message: [
            `Project type: ${project || 'Not specified'}`,
            '',
            message.trim() || '(No details provided)',
          ].join('\n'),
        },
        { publicKey: PUBLIC_KEY }
      );
      setNote('✓ Got it — we’ll be in touch soon.');
      setName('');
      setEmail('');
      setProject('');
      setMessage('');
    } catch (err) {
      console.error('EmailJS send failed:', err);
      setNote('✗ Something went wrong — please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative text-center border-b border-[var(--line)] overflow-hidden"
      style={{ background: 'var(--bg-deep)', padding: 'clamp(64px,9vw,120px) 0' }}
    >
      <div className="absolute inset-0 hero-grid-bg" style={{ opacity: 0.5 }} />

      <motion.div
        className={`relative z-[2] ${WRAP}`}
        variants={gridStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <motion.div variants={fadeUp}>
          <Eyebrow className="mb-[26px]">Let's Talk</Eyebrow>
        </motion.div>

        <motion.h2
          className="font-pixel text-cream mx-auto mb-[30px] leading-[1.5] max-w-[20ch]"
          style={{ fontSize: 'clamp(18px,4.4vw,48px)', textShadow: '3px 3px 0 rgba(220,167,51,0.3)', marginTop: '26px' }}
          variants={scaleIn}
        >
          Ready To Build Your <span className="text-gold">Competitive Advantage</span>?
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[640px] mx-auto text-left"
          variants={fadeUp}
          noValidate
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            aria-label="Your name"
            autoComplete="name"
            disabled={sending}
            className={fieldClass}
            style={fieldStyle}
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            aria-label="Email"
            autoComplete="email"
            disabled={sending}
            className={fieldClass}
            style={fieldStyle}
            required
          />
          <select
            value={project}
            onChange={(e) => setProject(e.target.value)}
            aria-label="What do you need?"
            disabled={sending}
            className={`${fieldClass} sm:col-span-2 cursor-pointer ${project ? '' : '!text-muted'}`}
            style={fieldStyle}
          >
            <option value="">What do you need? (optional)</option>
            {PROJECT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us a bit about your project (optional)"
            aria-label="Project details"
            rows={4}
            maxLength={2000}
            disabled={sending}
            className={`${fieldClass} sm:col-span-2 resize-y min-h-[110px]`}
            style={fieldStyle}
          />
          <motion.button
            type="submit"
            disabled={sending}
            className="sm:col-span-2 justify-self-center inline-flex items-center gap-2 px-[28px] py-4 rounded text-[12px] tracking-[0.14em] uppercase disabled:opacity-60"
            style={{ background: 'var(--gold)', border: '1px solid var(--gold)', color: '#161616', fontFamily: '"IBM Plex Mono"' }}
            whileHover={sending ? {} : { y: -2, boxShadow: '3px 3px 0 #E8E8C6' }}
            transition={{ duration: 0.2 }}
          >
            {sending ? 'Sending…' : 'Send It'} {!sending && <ArrowRight size={14} />}
          </motion.button>
        </motion.form>

        <AnimatePresence>
          {note && (
            <motion.div
              className="text-[11px] tracking-[0.1em] uppercase mt-[18px]"
              style={{ color: 'var(--gold)' }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              {note}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.p
          className="text-[13px] text-muted max-w-[48ch] mx-auto mt-7 leading-[1.9]"
          variants={fadeUp}
        >
          No pitch decks, no pressure. Tell us what you're building and we'll send a 15-minute intro call link. Every business has the potential to lead — let's build what gets you there.
        </motion.p>
      </motion.div>
    </section>
  );
}
