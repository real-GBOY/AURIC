import Logo from '../Logo';
import { WhatsAppIcon } from '../ui/Icons';
import { CONTACT, CTA_HREF, SOCIALS, emailHref, whatsappHref } from '../../lib/site';
import { href, t } from '../../lib/i18n';

const FOOTER_PAGES = [
  { label: 'Services', ar: 'الخدمات', href: '/services' },
  { label: 'Work', ar: 'الأعمال', href: '/work' },
  { label: 'Case studies', ar: 'دراسات الحالة', href: '/case-studies' },
  { label: 'Team', ar: 'الفريق', href: '/team' },
  { label: 'Start a Project', ar: 'ابدأ مشروعك', href: CTA_HREF },
];

const linkCls = 'tap text-[15px] text-cream transition-colors hover:text-gold md:min-h-0';

export default function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-ink pb-10 pt-[72px]">
      <div className="wrap flex flex-col gap-14">
        <div className="flex flex-wrap items-end justify-between gap-8 border-b border-[var(--line)] pb-12">
          <a
            href={href(CTA_HREF)}
            className="font-display font-extrabold leading-[.95] tracking-[-0.05em] transition-colors hover:text-gold"
            style={{ fontSize: 'clamp(40px,5.4vw,80px)' }}
          >
            {t("Let's work", 'لنعمل')}
            <br />
            {t('together', 'معًا')}<span className="text-gold">.</span>
          </a>
          <a
            href={whatsappHref()}
            className="inline-flex min-h-14 items-center gap-3 rounded-full bg-whatsapp px-[26px] text-base font-semibold text-ink transition-transform hover:-translate-y-0.5"
          >
            <WhatsAppIcon /> {t('Chat on WhatsApp', 'تحدث معنا على واتساب')}
          </a>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-10">
          <div className="col-span-2 flex flex-col gap-[14px] md:col-span-1">
            <Logo size={26} />
            <p className="max-w-[28ch] text-[15px] leading-[1.55] text-copy">
              {t('Your digital partner for creativity, strategy, technology and execution.', 'شريكك الرقمي في الإبداع والاستراتيجية والتقنية والتنفيذ.')}
            </p>
          </div>
          <div className="col-span-2 flex flex-col md:col-span-1 md:gap-[10px]">
            <span className="lab mb-1 md:mb-0">{t('Contact', 'تواصل')}</span>
            <a href={emailHref()} className={linkCls}>
              {CONTACT.email || CONTACT.emailLabel}
            </a>
            <a href={whatsappHref()} className={linkCls} dir="ltr">
              {CONTACT.whatsapp ? `+${CONTACT.whatsapp}` : CONTACT.whatsappLabel}
            </a>
            <span className="text-[15px] text-copy">{t(CONTACT.city, CONTACT.cityAr)}</span>
          </div>
          <div className="flex flex-col md:gap-[10px]">
            <span className="lab mb-1 md:mb-0">{t('Follow', 'تابعنا')}</span>
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href || '#'} className={linkCls} target={s.href ? '_blank' : undefined} rel="noreferrer">
                {t(s.label, s.ar)} ↗
              </a>
            ))}
          </div>
          <div className="flex flex-col md:gap-[10px]">
            <span className="lab mb-1 md:mb-0">{t('Pages', 'الصفحات')}</span>
            {FOOTER_PAGES.map((p) => (
              <a key={p.href} href={href(p.href)} className={linkCls}>
                {t(p.label, p.ar)}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-3 border-t border-[var(--line)] pt-[22px]">
          <span className="lab" dir="ltr">© 2026 AURIC</span>
          <span className="lab">auric404.me</span>
        </div>
      </div>
    </footer>
  );
}
