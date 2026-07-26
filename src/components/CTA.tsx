import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Eyebrow from './Eyebrow';
import { fadeUp, scaleIn, gridStagger } from '../lib/variants';
import { WRAP } from '../lib/data';

export default function CTA() {
  const [email, setEmail] = useState('');
  const [note,  setNote]  = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setNote('✗ Enter a valid email to continue');
      return;
    }
    setNote('✓ Got it — check your inbox for the call link.');
    setEmail('');
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
          style={{ fontSize: 'clamp(18px,4.4vw,48px)', textShadow: '3px 3px 0 rgba(198,164,85,0.3)', marginTop: '26px' }}
          variants={scaleIn}
        >
          Ready To Build Your <span className="text-gold">Competitive Advantage</span>?
        </motion.h2>

        <motion.form
          onSubmit={handleSubmit}
          className="flex gap-3 max-w-[540px] mx-auto flex-wrap justify-center"
          variants={fadeUp}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="flex-1 min-w-[240px] border border-[var(--line)] rounded text-cream text-[13px] px-[18px] py-4 outline-none transition-colors duration-200 focus:border-gold"
            style={{ background: 'var(--surface)', fontFamily: '"IBM Plex Mono"', letterSpacing: '0.03em', color: 'var(--cream)' }}
            required
          />
          <motion.button
            type="submit"
            className="inline-flex items-center gap-2 px-[28px] py-4 rounded text-[12px] tracking-[0.14em] uppercase"
            style={{ background: 'var(--gold)', border: '1px solid var(--gold)', color: '#161616', fontFamily: '"IBM Plex Mono"' }}
            whileHover={{ y: -2, boxShadow: '3px 3px 0 #E8E8C6' }}
            transition={{ duration: 0.2 }}
          >
            Send It <ArrowRight size={14} />
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
          No pitch decks, no pressure. Drop your email and we'll send a 15-minute intro call link. Every business has the potential to lead — let's build what gets you there.
        </motion.p>
      </motion.div>
    </section>
  );
}
