import Logo from '../Logo';
import { WhatsAppIcon } from '../ui/Icons';
import { CONTACT, CTA_HREF, SOCIALS, emailHref, whatsappHref } from '../../lib/site';

const FOOTER_PAGES = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Case studies', href: '/case-studies' },
  { label: 'Team', href: '/team' },
  { label: 'Start a Project', href: CTA_HREF },
];

const linkCls = 'text-[15px] text-cream transition-colors hover:text-gold';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-ink pb-10 pt-[72px]">
      <div className="wrap flex flex-col gap-14">
        <div className="flex flex-wrap items-end justify-between gap-8 border-b border-[var(--line)] pb-12">
          <a
            href={CTA_HREF}
            className="font-display font-extrabold leading-[.95] tracking-[-0.05em] transition-colors hover:text-gold"
            style={{ fontSize: 'clamp(40px,5.4vw,80px)' }}
          >
            Let's work
            <br />
            together<span className="text-gold">.</span>
          </a>
          <a
            href={whatsappHref()}
            className="inline-flex min-h-14 items-center gap-3 rounded-full bg-whatsapp px-[26px] text-base font-semibold text-ink transition-transform hover:-translate-y-0.5"
          >
            <WhatsAppIcon /> Chat on WhatsApp
          </a>
        </div>

        <div className="grid gap-10" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))' }}>
          <div className="flex flex-col gap-[14px]">
            <Logo size={26} />
            <p className="max-w-[28ch] text-[15px] leading-[1.55] text-copy">
              Your digital partner for creativity, strategy, technology and execution.
            </p>
          </div>
          <div className="flex flex-col gap-[10px]">
            <span className="lab">Contact</span>
            <a href={emailHref()} className={linkCls}>
              {CONTACT.email || CONTACT.emailLabel}
            </a>
            <a href={whatsappHref()} className={linkCls}>
              {CONTACT.whatsapp ? `+${CONTACT.whatsapp}` : CONTACT.whatsappLabel}
            </a>
            <span className="text-[15px] text-copy">{CONTACT.city}</span>
          </div>
          <div className="flex flex-col gap-[10px]">
            <span className="lab">Follow</span>
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href || '#'} className={linkCls} target={s.href ? '_blank' : undefined} rel="noreferrer">
                {s.label} ↗
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-[10px]">
            <span className="lab">Pages</span>
            {FOOTER_PAGES.map((p) => (
              <a key={p.href} href={p.href} className={linkCls}>
                {p.label}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-3 border-t border-[var(--line)] pt-[22px]">
          <span className="lab">© 2026 AURIC</span>
          <span className="lab">auric404.me</span>
        </div>
      </div>
    </footer>
  );
}
