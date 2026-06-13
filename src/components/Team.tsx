import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Nav from './Nav';
import Footer from './Footer';
import CountUp from './CountUp';
import SectionHead from './SectionHead';
import Eyebrow from './Eyebrow';
import {
  fadeUp, fadeLeft, fadeRight, scaleIn,
  gridStagger, tightStagger, headerStagger, cardHover,
} from '../lib/variants';
import {
  WRAP, FOUNDERS, PLAYERS, CULTURE_VALUES, TEAM_STATS, OPEN_ROLES,
  type TeamMember,
} from '../lib/data';

// ─── Photo placeholder ────────────────────────────────────────────────────────

function PhotoSlot({ name }: { name: string }) {
  const initials = name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-3"
      style={{
        background: 'var(--surface-2)',
        backgroundImage: 'repeating-linear-gradient(45deg, rgba(232,232,198,0.03) 0, rgba(232,232,198,0.03) 1px, transparent 0, transparent 50%)',
        backgroundSize: '10px 10px',
      }}
    >
      <span
        className="font-pixel text-muted leading-none"
        style={{ fontSize: 'clamp(18px,3vw,32px)' }}
      >
        {initials}
      </span>
      <span className="text-[9px] tracking-[0.18em] uppercase text-muted opacity-60">
        Photo · {name.split(' ')[0].toUpperCase()}
      </span>
    </div>
  );
}

// ─── Member card ─────────────────────────────────────────────────────────────

function MemberCard({ member }: { member: TeamMember }) {
  return (
    <motion.article
      variants={scaleIn}
      className="border border-[var(--line)] rounded overflow-hidden flex flex-col group"
      style={{ background: 'var(--surface)' }}
      whileHover={{ borderColor: '#FF6B35', y: -3, boxShadow: '4px 4px 0 #FF6B35', transition: { duration: 0.2 } }}
    >
      {/* Photo */}
      <div className="relative aspect-square overflow-hidden border-b border-[var(--line)]">
        <div className="w-full h-full grayscale contrast-[1.05] transition-[filter] duration-300 group-hover:grayscale-0 group-hover:contrast-100">
          <PhotoSlot name={member.name} />
        </div>
        {/* Scanline overlay */}
        <div className="absolute inset-0 panel-scan pointer-events-none" />
        {/* LVL badge */}
        <span
          className="absolute top-[10px] right-[10px] z-[2] text-[9px] tracking-[0.12em] uppercase text-cream border border-[var(--line)] px-2 py-1 rounded-[3px]"
          style={{ background: 'rgba(22,22,22,0.78)' }}
        >
          {member.lvl}
        </span>
      </div>

      {/* Info */}
      <div className="p-[18px_20px_22px] flex flex-col gap-2 flex-1">
        <div className="text-[12px] text-cream leading-[1.5]">{member.name}</div>
        <div className="text-[11px] text-orange tracking-[0.12em] uppercase">{member.role}</div>
        <p className="text-[12px] text-muted leading-[1.8] mt-1 flex-1">{member.bio}</p>
        <div className="mt-auto pt-[14px] flex gap-2 flex-wrap">
          {member.links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-[9px] tracking-[0.1em] uppercase text-muted border border-[var(--line)] rounded-[3px] px-[9px] py-[5px] transition-colors duration-200 hover:border-orange hover:text-orange"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

// ─── Team grid ────────────────────────────────────────────────────────────────

function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[var(--gap)]"
      variants={gridStagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {members.map((m) => <MemberCard key={m.id} member={m} />)}
    </motion.div>
  );
}

// ─── Team page ────────────────────────────────────────────────────────────────

const MARQUEE_ROLES = ['Designers', 'Engineers', 'Writers', 'Strategists', 'Motion Artists', 'Players One Through Twelve'];

export default function Team() {
  return (
    <div className="min-h-screen">
      <Nav />

      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <header
        className="relative overflow-hidden border-b border-[var(--line)]"
        style={{ padding: 'clamp(120px,16vh,168px) 0 clamp(54px,8vw,90px)' }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px)',
            backgroundSize: '64px 64px',
            WebkitMaskImage: 'radial-gradient(circle at 30% 30%,#000 0%,transparent 70%)',
            maskImage: 'radial-gradient(circle at 30% 30%,#000 0%,transparent 70%)',
          }}
        />
        <div className="absolute inset-0 scanline z-[3]" />

        <div className={`relative z-[4] ${WRAP}`}>
          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-[clamp(24px,4vw,48px)] items-end">

            <motion.div variants={headerStagger} initial="hidden" animate="visible">
              <motion.div variants={fadeLeft} className="mb-[26px]">
                <Eyebrow>Player Select</Eyebrow>
              </motion.div>
              <motion.h1
                className="font-pixel text-cream leading-[1.28]"
                style={{ fontSize: 'clamp(30px,7vw,72px)', textShadow: '4px 4px 0 rgba(0,0,0,0.4)' }}
                variants={fadeLeft}
              >
                MEET THE{' '}
                <span className="text-orange">CREW</span>
              </motion.h1>
            </motion.div>

            <motion.p
              className="text-muted leading-[1.95] pb-[6px]"
              style={{ fontSize: 'clamp(13px,1.4vw,16px)', maxWidth: '46ch' }}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, ease: 'circOut', delay: 0.25 }}
            >
              Twelve humans across four time zones, one shared high score. Senior hands on every project — no juniors hidden behind the curtain, no work shipped that we wouldn't put our names on.
            </motion.p>

          </div>
        </div>
      </header>

      {/* ── ROLE MARQUEE ───────────────────────────────────────────────── */}
      <motion.div
        className="overflow-hidden whitespace-nowrap py-4 border-b border-[var(--line)]"
        style={{ background: 'var(--bg-deep)' }}
        aria-hidden="true"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'circOut' }}
        viewport={{ once: true }}
      >
        <div className="inline-flex animate-marquee">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="text-[13px] tracking-[0.2em] uppercase text-cream px-[10px] inline-flex items-center gap-6"
            >
              {MARQUEE_ROLES.map((r, j) => (
                <span key={j} className="inline-flex items-center gap-6">
                  {r}
                  <span className="text-orange">·</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ── FOUNDERS ───────────────────────────────────────────────────── */}
      <section className="border-b border-[var(--line)]" style={{ padding: 'clamp(64px,9vw,116px) 0' }}>
        <div className={WRAP}>
          <SectionHead title="The Founders" tag="[ 01 — LEADERSHIP ]" />
          <TeamGrid members={FOUNDERS} />
        </div>
      </section>

      {/* ── THE PLAYERS ────────────────────────────────────────────────── */}
      <section className="border-b border-[var(--line)]" style={{ padding: 'clamp(64px,9vw,116px) 0' }}>
        <div className={WRAP}>
          <SectionHead title="The Players" tag="[ 02 — THE CREW ]" />
          <TeamGrid members={PLAYERS} />
        </div>
      </section>

      {/* ── HOW WE ROLL ────────────────────────────────────────────────── */}
      <section className="border-b border-[var(--line)]" style={{ padding: 'clamp(64px,9vw,116px) 0', background: 'var(--bg-deep)' }}>
        <div className={WRAP}>
          <SectionHead title="How We Roll" tag="[ 03 — CULTURE ]" />

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-[var(--gap)]"
            variants={gridStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {CULTURE_VALUES.map(({ glyph, title, body }) => (
              <motion.div
                key={title}
                variants={scaleIn}
                className="border border-[var(--line)] rounded p-[30px_26px] group"
                style={{ background: 'var(--surface)' }}
                whileHover={cardHover}
              >
                <div className="w-[46px] h-[46px] border border-[var(--line)] rounded grid place-items-center text-[18px] text-orange mb-[22px] transition-all duration-200 group-hover:border-orange group-hover:bg-[rgba(255,107,53,0.08)]">
                  {glyph}
                </div>
                <h3 className="font-pixel text-[11px] text-cream leading-[1.6] mb-[14px]">{title}</h3>
                <p className="text-[13px] text-muted leading-[1.85]">{body}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ──────────────────────────────────────────────────── */}
      <section style={{ background: 'var(--bg-deep)', borderBottom: '1px solid var(--line)' }}>
        <motion.div
          className={`${WRAP} grid grid-cols-2 lg:grid-cols-4`}
          variants={tightStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {TEAM_STATS.map(({ target, symbol, label }) => (
            <motion.div
              key={label}
              variants={fadeUp}
              className="text-center border-r border-[var(--line)] last:border-r-0"
              style={{ padding: 'clamp(40px,6vw,68px) 26px' }}
            >
              <div
                className="font-semibold leading-none tracking-normal text-cream"
                style={{ fontSize: 'clamp(30px,4.4vw,52px)' }}
              >
                {symbol ? (
                  <span>{symbol}</span>
                ) : (
                  <CountUp target={target} />
                )}
              </div>
              <div className="text-[11px] tracking-[0.18em] uppercase text-muted mt-4">{label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── OPEN ROLES / CTA ───────────────────────────────────────────── */}
      <section
        id="join"
        className="relative text-center border-b border-[var(--line)] overflow-hidden"
        style={{ background: 'var(--bg-deep)', padding: 'clamp(64px,9vw,116px) 0' }}
      >
        <div className="absolute inset-0 scanline" style={{ opacity: 0.7 }} />

        <motion.div
          className={`relative z-[2] ${WRAP}`}
          variants={gridStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.div variants={fadeUp} className="mb-[24px]">
            <Eyebrow>Now Recruiting</Eyebrow>
          </motion.div>

          <motion.h2
            className="font-pixel text-cream mx-auto leading-[1.5] max-w-[20ch] mb-[34px]"
            style={{ fontSize: 'clamp(18px,4.4vw,44px)', textShadow: '3px 3px 0 rgba(0,0,0,0.4)' }}
            variants={scaleIn}
          >
            Want To Join{' '}
            <span className="text-orange">Player 13?</span>
          </motion.h2>

          {/* Role rows */}
          <motion.div
            className="flex flex-col gap-3 max-w-[760px] mx-auto text-left mb-[34px]"
            variants={gridStagger}
          >
            {OPEN_ROLES.map(({ title, meta }) => (
              <motion.a
                key={title}
                href="/#contact"
                className="flex items-center justify-between gap-4 border border-[var(--line)] rounded p-[18px_22px] transition-colors duration-200 hover:border-orange"
                style={{ background: 'var(--surface)' }}
                variants={fadeUp}
                whileHover={{ x: 3, boxShadow: '-3px 3px 0 #FF6B35', borderColor: '#FF6B35', transition: { duration: 0.2 } }}
              >
                <div>
                  <div className="text-[12px] text-cream tracking-[0.04em]">{title}</div>
                  <div className="text-[10px] text-muted tracking-[0.12em] uppercase mt-[6px]">{meta}</div>
                </div>
                <span className="text-[11px] text-orange tracking-[0.12em] uppercase whitespace-nowrap">
                  Apply →
                </span>
              </motion.a>
            ))}
          </motion.div>

          <motion.p
            className="text-[13px] text-muted max-w-[48ch] mx-auto leading-[1.9] mb-[34px]"
            variants={fadeUp}
          >
            Don't see your role? We're always happy to meet good people. Send a hello and show us what you're proud of.
          </motion.p>

          <motion.div className="flex flex-wrap gap-4 justify-center" variants={fadeUp}>
            <a
              href="/#contact"
              className="inline-flex items-center gap-[10px] px-[26px] py-4 rounded text-[12px] tracking-[0.14em] uppercase border group transition-all duration-200 hover:-translate-y-0.5"
              style={{ background: 'var(--orange)', borderColor: 'var(--orange)', color: '#161616' }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '3px 3px 0 #E8E8C6')}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
            >
              Drop Us A Line
              <span className="transition-transform duration-200 group-hover:translate-x-[5px]">
                <ArrowRight size={13} />
              </span>
            </a>
            <a
              href="/#work"
              className="inline-flex items-center gap-[10px] px-[26px] py-4 rounded text-[12px] tracking-[0.14em] uppercase border border-cream text-cream transition-all duration-200 hover:border-orange hover:text-orange hover:-translate-y-0.5"
            >
              See The Work
            </a>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
