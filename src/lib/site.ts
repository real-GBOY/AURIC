// Single place for contact details and navigation.
// Values in [brackets] are placeholders: replace them with the real details before launch.

export const CONTACT = {
  email: '', // e.g. 'hello@auric404.me'
  emailLabel: '[hello@yourdomain.com]',
  whatsapp: '', // international format, digits only, e.g. '201001234567'
  whatsappLabel: '[+20 WhatsApp number]',
  city: '[City], Egypt',
  cityAr: '[المدينة]، مصر',
};

export const SOCIALS = [
  { label: 'Instagram', ar: 'إنستغرام', href: '' },
  { label: 'LinkedIn', ar: 'لينكدإن', href: '' },
  { label: 'Behance', ar: 'بيهانس', href: '' },
  { label: 'TikTok', ar: 'تيك توك', href: '' },
];

/** WhatsApp chat link. Falls back to the Start a Project page until a number is set. */
export const whatsappHref = (text = "Hi AURIC, I'd like to talk about a project.") =>
  CONTACT.whatsapp ? `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}` : '/contact';

export const emailHref = () => (CONTACT.email ? `mailto:${CONTACT.email}` : '/contact');

export const NAV = [
  { label: 'Services', ar: 'الخدمات', href: '/services' },
  { label: 'Work', ar: 'الأعمال', href: '/work' },
  { label: 'Team', ar: 'الفريق', href: '/team' },
  { label: 'Contact', ar: 'تواصل', href: '/contact' },
];

/** Full list used by the phone menu and the footer. */
export const PAGES = [
  { label: 'Home', ar: 'الرئيسية', href: '/' },
  { label: 'Services', ar: 'الخدمات', href: '/services' },
  { label: 'Work', ar: 'الأعمال', href: '/work' },
  { label: 'Case studies', ar: 'دراسات الحالة', href: '/case-studies' },
  { label: 'Team', ar: 'الفريق', href: '/team' },
];

export const CTA_HREF = '/contact';
