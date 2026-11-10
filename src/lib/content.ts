// Shared marketing content for the redesigned pages.
// Anything in [brackets] is a placeholder waiting for real material.

export type DivisionKey = 'create' | 'strategy' | 'build' | 'manage';

export const DIVISIONS: { key: DivisionKey; name: string; short: string; desc: string; phoneDesc: string }[] = [
  {
    key: 'create',
    name: 'Create',
    short: 'Video · design · voice',
    desc: 'Video editing, graphic design, motion graphics, voiceover and content, made to one standard.',
    phoneDesc: 'Video, design, motion, voiceover and content people remember.',
  },
  {
    key: 'strategy',
    name: 'Strategy',
    short: 'Marketing · content',
    desc: 'Marketing and content plans, campaigns and calendars, so every piece has a job.',
    phoneDesc: 'Brand, marketing and content plans that give every piece a job.',
  },
  {
    key: 'build',
    name: 'Build',
    short: 'Websites · apps · AI',
    desc: 'Websites, mobile apps, business systems and AI automation, engineered to last.',
    phoneDesc: 'Websites, apps and systems built around how you work.',
  },
  {
    key: 'manage',
    name: 'Manage',
    short: 'One owner',
    desc: 'One owner coordinating every specialist, deadline and review, start to finish.',
    phoneDesc: 'One point of contact who keeps the project on time and on brief.',
  },
];

export const MARQUEE_WORDS = ['Video', 'Design', 'Motion', 'Voiceover', 'Strategy', 'Websites', 'Apps', 'Automation'];

export const STEPS = [
  { title: 'Plan', desc: 'Goals, audience and the plan to reach them.' },
  { title: 'Create', desc: 'Video, design and content made to the plan.' },
  { title: 'Build', desc: 'Websites and apps when the project needs them.' },
  { title: 'Deliver', desc: 'Reviewed, on time, and supported after.' },
];

export const AUDIENCES = [
  { label: 'Businesses', href: '/services#build' },
  { label: 'Startups', href: '/services#build' },
  { label: 'Entrepreneurs', href: '/services#strategy' },
  { label: 'Professionals', href: '/services#create' },
  { label: 'Personal brands', href: '/services#create' },
];

export const PACKAGES = [
  {
    name: 'Digital Launch',
    who: 'New businesses and rebrands',
    items: ['Brand identity', 'Website', 'Social media kit', 'Launch video', 'First-month content plan'],
    time: '4–8 weeks',
    featured: true,
  },
  {
    name: 'Growth Retainer',
    who: 'Brands that need steady content',
    items: ['Monthly content plan', 'Designs and posts', 'Edited videos and reels', 'Monthly review'],
    time: 'Monthly',
  },
  {
    name: 'Personal Brand Kit',
    who: 'Founders, professionals, creators',
    items: ['Personal identity', 'Portfolio website', 'Content plan', 'Short videos with voiceover'],
    time: '3–6 weeks',
  },
  {
    name: 'Business System',
    who: 'Companies with manual operations',
    items: ['Paid systems diagnostic', 'Web or mobile system', 'Automation and integrations', 'Training and support'],
    time: '8–16 weeks',
  },
];

/** Client quotes: only real clients, with their permission. Empty quote = placeholder card. */
export const QUOTES = [
  { quote: '', name: '[Client name]', role: '[Role · Company]', placeholder: '[A real quote from client 1 about working with AURIC and what changed.]' },
  { quote: '', name: '[Client name]', role: '[Role · Company]', placeholder: '[A real quote from client 2 about working with AURIC and what changed.]' },
];

/** Client logos (image paths). Empty entries render as labelled placeholders. */
export const CLIENT_LOGOS: { name: string; src: string }[] = Array.from({ length: 6 }, () => ({ name: 'Client logo', src: '' }));

/** Showreel video file (e.g. '/media/showreel.mp4'). Empty = placeholder. */
export const SHOWREEL = { src: '', vertical: '' };
