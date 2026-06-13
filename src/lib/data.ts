import { Layers, Monitor, Play, Target, FileText, TrendingUp } from 'lucide-react';

export const WRAP = 'max-w-[1480px] mx-auto px-[var(--edge)]';

export const SERVICES = [
  { Icon: Layers,     title: 'Brand Identity',   desc: 'Logos, systems and guidelines built to scale from a sticker to a skyscraper.' },
  { Icon: Monitor,    title: 'Web Design',        desc: 'Sites that load fast, read clean and convert — designed and built end to end.' },
  { Icon: Play,       title: 'Motion & Video',    desc: 'Title sequences, product films and looping graphics with arcade-grade polish.' },
  { Icon: Target,     title: 'Campaign Strategy', desc: 'Big ideas with a plan attached — positioning, messaging and rollout.' },
  { Icon: FileText,   title: 'Content Systems',   desc: 'Templates and toolkits so your team can keep the brand alive without us.' },
  { Icon: TrendingUp, title: 'Growth Marketing',  desc: 'Testing, iterating and scaling the channels that actually move the needle.' },
];

export const HERO_ICONS = [
  { Icon: Layers,     label: 'Brand Identity' },
  { Icon: Monitor,    label: 'Web Design' },
  { Icon: Play,       label: 'Motion & Video' },
  { Icon: Target,     label: 'Campaign Strategy' },
  { Icon: FileText,   label: 'Content Systems' },
  { Icon: TrendingUp, label: 'Growth Marketing' },
];

export const WORKS = [
  { title: 'Neon Diner Co.',   cat: 'Identity / Packaging', tag: 'Branding', year: "'25", bg: 'linear-gradient(135deg,#FF6B35 0%,#3a1f14 100%)', span: 'col-span-1 sm:col-span-3' },
  { title: 'Tidepool Finance', cat: 'Web / Product',        tag: 'Web',      year: "'25", bg: 'linear-gradient(135deg,#2f6e6a 0%,#101f1e 100%)', span: 'col-span-1 sm:col-span-3' },
  { title: 'Arcade Records',   cat: 'Motion / Film',        tag: 'Motion',   year: "'24", bg: 'linear-gradient(135deg,#6a4a8f 0%,#1c1228 100%)', span: 'col-span-1 sm:col-span-2' },
  { title: 'Golden Hour',      cat: 'Campaign',             tag: 'Campaign', year: "'24", bg: 'linear-gradient(135deg,#b7913f 0%,#2b210d 100%)', span: 'col-span-1 sm:col-span-2' },
  { title: 'Bluebox Labs',     cat: 'Strategy / Naming',    tag: 'Strategy', year: "'23", bg: 'linear-gradient(135deg,#3f5fb7 0%,#0d1530 100%)', span: 'col-span-1 sm:col-span-2' },
];

export const STEPS = [
  { n: '01', title: 'Discover', desc: 'We dig into your market, audience and goals before touching pixels.' },
  { n: '02', title: 'Strategy', desc: 'Positioning and a clear creative direction everyone can rally behind.' },
  { n: '03', title: 'Execute',  desc: 'Design and build in tight loops, shipping work you can see and feel.' },
  { n: '04', title: 'Launch',   desc: 'We deploy, measure and hand you the keys with systems to keep going.' },
];

export const QUOTES = [
  { q: "They rebuilt our entire identity in six weeks and somehow made it feel like us — only sharper. Sales decks finally land in the room.", name: 'Mara Reyes',  co: 'CMO, Tidepool Finance',   init: 'MR' },
  { q: "Most studios talk in mood boards. 3-300 talks in outcomes — and then delivers them, early. Easiest creative partner we've had.",      name: 'Devon Kane', co: 'Founder, Arcade Records', init: 'DK' },
];

export const STATS_BAR = [
  { target: 47, suffix: '',  label: 'Projects' },
  { target: 58, suffix: '',  label: 'Happy Clients' },
  { target: 98, suffix: '%', label: 'Retention' },
  { target: 6,  suffix: '',  label: 'Yrs In The Game' },
];

// ─── Team page ───────────────────────────────────────────────────────────────

export interface TeamMember {
  id: string; name: string; role: string; lvl: string; bio: string;
  links: { label: string; href: string }[];
}

export const FOUNDERS: TeamMember[] = [
  { id: 'm-ari',  name: 'Ari Nakamura', role: 'Founder / Creative Dir.',  lvl: 'LVL 99', bio: 'Started 3-300 in a garage with a CRT and a dream. Leads brand vision.',        links: [{ label: 'Email', href: '#' }, { label: 'LinkedIn', href: '#' }] },
  { id: 'm-rae',  name: 'Rae Okafor',   role: 'Partner / Strategy Lead',  lvl: 'LVL 98', bio: 'Turns fuzzy ambitions into sharp plans. Keeps the work honest and on-target.',  links: [{ label: 'Email', href: '#' }, { label: 'LinkedIn', href: '#' }] },
  { id: 'm-kit',  name: 'Kit Vasquez',  role: 'Partner / Tech Lead',      lvl: 'LVL 97', bio: 'Builds the things that ship. Believes fast sites are a feature, not a luxury.', links: [{ label: 'Email', href: '#' }, { label: 'GitHub',   href: '#' }] },
  { id: 'm-juno', name: 'Juno Park',    role: 'Partner / Ops & Producer', lvl: 'LVL 96', bio: 'Makes the trains run. The reason deadlines feel calm instead of cursed.',        links: [{ label: 'Email', href: '#' }, { label: 'LinkedIn', href: '#' }] },
];

export const PLAYERS: TeamMember[] = [
  { id: 'm-sol',   name: 'Sol Bergström',  role: 'Brand Designer',     lvl: 'P-05', bio: 'Logos, marks & type. Collects vintage arcade flyers.',           links: [{ label: 'Dribbble',  href: '#' }] },
  { id: 'm-mira',  name: 'Mira Haddad',    role: 'Motion Designer',    lvl: 'P-06', bio: 'Makes pixels move. Former game studio animator.',                links: [{ label: 'Reel',      href: '#' }] },
  { id: 'm-theo',  name: 'Theo Lindqvist', role: 'Front-End Engineer', lvl: 'P-07', bio: 'Ships clean code & obsesses over load times.',                   links: [{ label: 'GitHub',    href: '#' }] },
  { id: 'm-nadia', name: 'Nadia Cruz',     role: 'Copywriter',         lvl: 'P-08', bio: 'Words that punch. Reformed journalist, current pun dealer.',     links: [{ label: 'Portfolio', href: '#' }] },
  { id: 'm-bo',    name: 'Bo Tanaka',      role: 'Art Director',       lvl: 'P-09', bio: 'Sets the visual bar. Always one reference deeper.',              links: [{ label: 'Behance',   href: '#' }] },
  { id: 'm-lena',  name: 'Lena Moreau',    role: 'UX Designer',        lvl: 'P-10', bio: 'Flows & systems. Sketches wireframes on diner napkins.',         links: [{ label: 'Dribbble',  href: '#' }] },
  { id: 'm-omar',  name: 'Omar Reyes',     role: 'Growth Strategist',  lvl: 'P-11', bio: 'Channels & experiments. Lives in the analytics dashboard.',      links: [{ label: 'LinkedIn',  href: '#' }] },
  { id: 'm-yuki',  name: 'Yuki Sato',      role: 'Producer',           lvl: 'P-12', bio: 'Keeps projects on-rails. Owns the studio playlist.',            links: [{ label: 'Email',     href: '#' }] },
];

export const CULTURE_VALUES = [
  { glyph: '◈', title: 'Senior By Default', body: 'No work gets passed to a junior to figure out. The people you meet are the people who build it.' },
  { glyph: '►', title: 'Ship, Then Polish',  body: "We'd rather show you something rough on Friday than something perfect that's three weeks late." },
  { glyph: '✦', title: 'Play More',          body: 'Game nights, side projects, and a budget for the weird ideas. Curiosity keeps the work sharp.' },
];

export const TEAM_STATS = [
  { target: 12, symbol: null, label: 'Crew Members' },
  { target: 4,  symbol: null, label: 'Time Zones' },
  { target: 6,  symbol: null, label: 'Yrs Together' },
  { target: 0,  symbol: '∞',  label: 'Coffee Consumed' },
];

export const OPEN_ROLES = [
  { title: 'Senior Brand Designer',      meta: 'Full-time · Remote / Hybrid' },
  { title: 'Front-End Engineer',         meta: 'Full-time · Remote' },
  { title: 'Motion Designer (Contract)', meta: '3-month · Remote' },
];
