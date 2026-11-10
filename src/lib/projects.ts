// Portfolio registry used by Work (showcase), Case studies and the case study pages.
// Real software projects come from data.ts; creative entries in [brackets] are
// placeholders for the video, design and content work still to be added.

import {
  ADMIT_PROJECT, AJWADI_PROJECT, ATLAS_PROJECT, BUILD_ART_PROJECT, CLINIC_OS_PROJECT, ENACTIX_PROJECT,
  HOTEL_OS_PROJECT, MIZAN_PROJECT, NOVA_PROJECT, OPTICARE_PROJECT, RAQIB_PROJECT, WEAVOLUTION_PROJECT,
  type CaseStudyProject,
} from './data';

export type Group = 'video' | 'design' | 'content' | 'apps';
export type MediaType = 'img' | 'video' | 'design' | 'reel' | 'term';

export type Entry = {
  name: string;
  /** Short category, e.g. "Law firm". */
  cat: string;
  /** Client project · AURIC product · Showcase · Your work … */
  kind: string;
  services: string;
  year: string;
  group: Group;
  type: MediaType;
  img?: string;
  href: string;
  desc: string;
};

export type SoftwareProject = Entry & { slug: string; data: CaseStudyProject; line: string };

const sw = (
  slug: string,
  data: CaseStudyProject,
  meta: { cat: string; kind: string; services: string; line: string; img?: string },
): SoftwareProject => ({
  slug,
  data,
  name: data.title,
  cat: meta.cat,
  kind: meta.kind,
  services: meta.services,
  year: data.year,
  group: 'apps',
  type: 'img',
  img: meta.img ?? data.dashboardImages[0]?.src,
  href: `/work/${slug}`,
  desc: meta.line,
  line: meta.line,
});

/** Software case studies, in portfolio order. */
export const SOFTWARE: SoftwareProject[] = [
  sw('mizan', MIZAN_PROJECT, { cat: 'Law firm', kind: 'Client project', services: 'Design · Web · Mobile · AI', line: 'Practice management for a law firm, in Arabic and English.', img: '/work/mizan/dashboard.png' }),
  sw('atlas', ATLAS_PROJECT, { cat: 'Real estate', kind: 'AURIC product', services: 'Platform · AI', line: 'A real-estate operating system with an AI copilot.', img: '/work/atlas/dashboard.png' }),
  sw('hotel-os', HOTEL_OS_PROJECT, { cat: 'Hospitality', kind: 'Showcase', services: 'Platform · Website', line: 'Hotel operations and the booking website guests use.', img: '/work/hotel-os/dashboard.png' }),
  sw('nova', NOVA_PROJECT, { cat: 'Enterprise, UAE', kind: 'Client project', services: 'ERP · Mobile app', line: 'An ERP with CRM modules and an employee mobile app.' }),
  sw('ajwadi', AJWADI_PROJECT, { cat: 'Collaboration', kind: 'Project', services: 'Web · Mobile', line: 'Projects, contracts, messaging and payments in one platform.' }),
  sw('raqib', RAQIB_PROJECT, { cat: 'Security & inspection', kind: 'AURIC product', services: 'Platform · Offline app', line: 'Field inspections and quality control that work offline.', img: '/work/raqib/dashboard.png' }),
  sw('admit', ADMIT_PROJECT, { cat: 'Ticketing', kind: 'AURIC product', services: 'Platform', line: 'Event ticketing with manual payment checks.', img: '/work/admit/dashboard.png' }),
  sw('clinic-os', CLINIC_OS_PROJECT, { cat: 'Healthcare', kind: 'Project', services: 'Platform on Odoo', line: 'A clinic operating system from reception to lab.', img: '/work/clinic-os/reception-dashboard.png' }),
  sw('enactix', ENACTIX_PROJECT, { cat: 'Student organisations', kind: 'Project', services: 'Web · Mobile', line: 'Management for student organisations and chapters.' }),
  sw('weavolution', WEAVOLUTION_PROJECT, { cat: 'Sustainability', kind: 'Project', services: 'Website', line: 'A circular-economy platform and marketplace.', img: '/work/weavolution/home-hero.png' }),
  sw('build-art', BUILD_ART_PROJECT, { cat: 'Interior design', kind: 'Project', services: 'Website', line: 'A marketing site for an interior fit-out studio.', img: '/work/build-art/hero.png' }),
  sw('opticare', OPTICARE_PROJECT, { cat: 'Healthcare', kind: 'Project', services: 'Platform', line: 'Clinic management for eye-care practices.' }),
];

export const softwareBySlug = (slug: string) => SOFTWARE.find((p) => p.slug === slug);

const CREATIVE_HREF = '/case-studies/creative';
const ph = (name: string, cat: string, group: Group, type: MediaType, services: string, desc: string): Entry => ({
  name, cat, kind: 'Your work', services, year: '[Year]', group, type, href: CREATIVE_HREF, desc,
});

/** Creative placeholders (replace with real projects as they are added). */
export const CREATIVE = {
  showreel: ph('[Showreel]', 'Video', 'video', 'video', 'Video · Motion', 'Your strongest video work, cut into one reel.'),
  brandFilm: ph('[Brand film]', 'Video', 'video', 'video', 'Video · Motion · Voiceover', 'A brand film, directed, edited and voiced.'),
  identity: ph('[Brand identity]', 'Branding', 'design', 'design', 'Branding · Design', 'A full identity: logo, colors, type and applications.'),
  reels: ph('[Reels campaign]', 'Content', 'content', 'reel', 'Strategy · Content · Reels', 'A series of reels and posts planned and produced together.'),
  motion: ph('[Motion piece]', 'Motion', 'video', 'video', 'Motion graphics', 'Motion graphics for a launch or campaign.'),
  posters: ph('[Poster series]', 'Design', 'design', 'design', 'Print · Social design', 'Posters and print for an event or brand.'),
  productVideo: ph('[Product video]', 'Video + voiceover', 'video', 'video', 'Video · Voiceover', 'A product video with voiceover.'),
  social: ph('[Social content]', 'Content', 'content', 'reel', 'Content · Social', 'Social content produced every month.'),
  campaign: ph('[Content campaign]', 'Content', 'content', 'video', 'Strategy · Content · Reels', 'A series of reels and posts planned and produced together.'),
};

const S = Object.fromEntries(SOFTWARE.map((p) => [p.slug, p])) as Record<string, SoftwareProject>;

export const CREATE_AURIC: Entry = {
  name: 'create-auric', cat: 'Developer tool', kind: 'Internal tool', services: 'Developer tooling', year: '2026',
  group: 'apps', type: 'term', href: '/work', desc: 'The starter AURIC uses for every build.',
};

/** Work page archive: everything, mixed formats. */
export const ARCHIVE: Entry[] = [
  CREATIVE.showreel, CREATIVE.identity, S.mizan, CREATIVE.reels, CREATIVE.motion, S.atlas, CREATIVE.posters, S['hotel-os'],
  CREATIVE.productVideo, S.nova, CREATIVE.social, S.raqib, S.admit, S['clinic-os'], S.weavolution, CREATE_AURIC,
];

/** Phone feed order. */
export const FEED: Entry[] = [
  CREATIVE.showreel, S.mizan, CREATIVE.identity, CREATIVE.reels, CREATIVE.motion, S.atlas, CREATIVE.posters, S['hotel-os'],
  CREATIVE.productVideo, S.nova, CREATIVE.social, S.raqib, S.admit, S['clinic-os'], S.weavolution, CREATE_AURIC,
];

/** Work page index (A2). */
export const INDEX: Entry[] = [
  CREATIVE.showreel, CREATIVE.identity, S.mizan, CREATIVE.motion, CREATIVE.campaign, S.atlas, CREATIVE.posters, S['hotel-os'],
];

/** Case studies page (deep dives). */
export const CASE_STUDIES: Entry[] = [
  S.mizan, CREATIVE.brandFilm, CREATIVE.identity, S.atlas, S['hotel-os'], CREATIVE.campaign, S.nova, CREATIVE.posters,
  S.raqib, S.admit, S['clinic-os'], S.ajwadi,
];

export const FILTERS: { id: 'all' | Group; name: string }[] = [
  { id: 'all', name: 'All' },
  { id: 'video', name: 'Video & motion' },
  { id: 'design', name: 'Design & branding' },
  { id: 'content', name: 'Content & social' },
  { id: 'apps', name: 'Websites & apps' },
];
