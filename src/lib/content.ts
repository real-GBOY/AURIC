// Shared marketing content for the redesigned pages.
// Anything in [brackets] is a placeholder waiting for real material.

import { t } from './i18n';

export type DivisionKey = 'create' | 'strategy' | 'build' | 'manage';

/**
 * Your AURIC Workspace (part of Manage). Keep `live: false` until clients can actually sign in:
 * the site then says it is coming. Set `live: true` and the wording becomes "included with every
 * engagement" everywhere (Services section, Manage chip, Manage descriptions on Home).
 */
export const WORKSPACE = { live: false };

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
    desc: WORKSPACE.live
      ? 'One owner for every specialist, deadline and review, and a private workspace where you follow it all.'
      : 'One owner coordinating every specialist, deadline and review, start to finish.',
    phoneDesc: WORKSPACE.live
      ? 'One point of contact, and a private workspace to follow every project.'
      : 'One point of contact who keeps the project on time and on brief.',
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
  {
    // Drafted for Husam to approve before it goes live (Social Lens, Dubai · instagram.com/7usammm).
    quote: t(
      'AURIC works like an extension of our own team. They understood our brand from the first call, kept us in the loop at every step, and delivered work we were proud to put in front of our clients.',
      'أوريك تعمل كأنها جزء من فريقنا. فهموا علامتنا من أول مكالمة، وأبقونا على اطلاع في كل خطوة، وسلّموا عملًا نفخر بأن نقدّمه لعملائنا.',
    ),
    name: t('Husam', 'حسام'),
    role: t('CEO · Social Lens', 'الرئيس التنفيذي · سوشال لنس'),
    photo: '/clients/husam.webp',
    placeholder: '',
  },
  {
    // Drafted for Mohamed to approve before it goes live (Ajwadi, Saudi Arabia).
    quote: t(
      'AURIC built Ajwadi with us from the ground up: the platform, the admin dashboard and the mobile app. They think like product people, not just developers, and they were with us at every launch.',
      'بنت أوريك منصة أجوادي معنا من الصفر: المنصة ولوحة الإدارة وتطبيق الجوال. يفكرون كأصحاب منتج لا كمبرمجين فقط، وكانوا معنا في كل إطلاق.',
    ),
    name: t('Mohamed Barom', 'محمد باروم'),
    role: t('CEO · Ajwadi, KSA', 'الرئيس التنفيذي · أجوادي، السعودية'),
    photo: '',
    placeholder: '',
  },
];

/** Client logos (image paths). Empty entries render as labelled placeholders. */
// White transparent PNGs, shown as an endless strip on Home. Made by `npm run logos` (scripts/logos/logos.html)
// except Digitmask and Carlo Bay, which are the supplied artwork turned white. Empty `src` = labelled placeholder.
export const CLIENT_LOGOS: { name: string; src: string }[] = [
  { name: 'Digitmask', src: '/clients/digitmask.png' },
  { name: 'Ajwadi, a platform for hiring freelancers in KSA', src: '/clients/ajwadi-wordmark.png' },
  { name: 'Mizan, law firm system', src: '/clients/mizan.png' },
  { name: 'Atlas, real estate OS', src: '/clients/atlas.png' },
  { name: 'Social Lens, media agency in Dubai', src: '/clients/sociallens.png' },
  { name: 'SmileSuite, dental clinic management', src: '/clients/smilesuite.png' },
  { name: 'Lumen Labs, dental supplies and lab', src: '/clients/lumenlabs.png' },
  { name: 'Carlo Bay Accademia', src: '/clients/carlobay.png' },
  { name: 'Zaan, salon management in Saudi Arabia', src: '/clients/zaan.png' },
];

/**
 * Showreel videos, rendered from scripts/reel/reel.html with `npm run reel` (real AURIC work only).
 * Empty `src` = placeholder.
 */
/**
 * Real AURIC video work. `teaser` is a short silent clip that loops on the card; clicking
 * opens `src` (with sound) in the player. Sources: E:\Clients\AURIC\NEW\Data Videos.
 */
export const FILMS = {
  brandFilm: {
    src: '/media/brand-film.mp4',
    teaser: '/media/brand-film-teaser.mp4',
    poster: '/media/brand-film-poster.webp',
    title: t('TCG brand film', 'فيلم TCG'),
  },
  reel: {
    src: '/media/reel.mp4',
    teaser: '/media/reel.mp4',
    poster: '/media/reel-poster.webp',
    title: t('TCG reel', 'ريل TCG'),
  },
};

/** Green Teaching Kitchen event recap (vertical). */
export const EVENT_RECAP = {
  src: '/media/event-recap.mp4',
  teaser: '/media/event-recap.mp4',
  poster: '/media/event-recap-poster.webp',
  title: t('Green Teaching Kitchen recap', 'ملخص المطبخ التعليمي الأخضر'),
};

export const SHOWREEL = {
  src: '/media/showreel.mp4',
  poster: '/media/showreel-poster.webp',
  vertical: '/media/showreel-vertical.mp4',
  posterVertical: '/media/showreel-vertical-poster.webp',
};
