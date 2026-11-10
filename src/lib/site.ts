// Single place for contact details and navigation.
// Anything still in [brackets] elsewhere in the site is a placeholder to replace before launch.

export const CONTACT = {
  email: 'auric404@gmail.com',
  emailLabel: 'auric404@gmail.com',
  whatsapp: '201026597474', // international format, digits only
  whatsappLabel: '+20 102 659 7474',
  city: 'New Maadi, Cairo, Egypt',
  cityAr: 'المعادي الجديدة، القاهرة، مصر',
};

// Only accounts with a real link are listed. Add Behance, TikTok and others here when they exist.
export const SOCIALS = [
  { label: 'Instagram', ar: 'إنستغرام', href: 'https://www.instagram.com/auric404/' },
  { label: 'LinkedIn', ar: 'لينكدإن', href: 'https://www.linkedin.com/company/auric-co/' },
];

/** WhatsApp chat link. Falls back to the Start a Project page until a number is set. */
export const whatsappHref = (text = "Hi AURIC, I'd like to talk about a project.") =>
  CONTACT.whatsapp ? `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}` : '/contact';

export const emailHref = () => (CONTACT.email ? `mailto:${CONTACT.email}` : '/contact');

export const NAV = [
  { label: 'Services', ar: 'الخدمات', href: '/services' },
  { label: 'Work', ar: 'الأعمال', href: '/work' },
  { label: 'Case studies', ar: 'دراسات الحالة', href: '/case-studies' },
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
  { label: 'Contact', ar: 'تواصل', href: '/contact' },
];

export const CTA_HREF = '/contact';
