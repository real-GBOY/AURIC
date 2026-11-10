// Single place for contact details and navigation.
// Values in [brackets] are placeholders: replace them with the real details before launch.

export const CONTACT = {
  email: '', // e.g. 'hello@auric404.me'
  emailLabel: '[hello@yourdomain.com]',
  whatsapp: '', // international format, digits only, e.g. '201001234567'
  whatsappLabel: '[+20 WhatsApp number]',
  city: '[City], Egypt',
};

export const SOCIALS = [
  { label: 'Instagram', href: '' },
  { label: 'LinkedIn', href: '' },
  { label: 'Behance', href: '' },
  { label: 'TikTok', href: '' },
];

/** WhatsApp chat link. Falls back to the Start a Project page until a number is set. */
export const whatsappHref = (text = "Hi AURIC, I'd like to talk about a project.") =>
  CONTACT.whatsapp ? `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}` : '/contact';

export const emailHref = () => (CONTACT.email ? `mailto:${CONTACT.email}` : '/contact');

export const NAV = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Team', href: '/team' },
  { label: 'Contact', href: '/contact' },
];

/** Full list used by the phone menu and the footer. */
export const PAGES = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Case studies', href: '/case-studies' },
  { label: 'Team', href: '/team' },
];

export const CTA_HREF = '/contact';
