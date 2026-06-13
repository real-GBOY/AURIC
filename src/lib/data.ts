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
