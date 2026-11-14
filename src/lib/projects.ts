// Portfolio registry used by Work (showcase), Case studies and the case study pages.
// Real software projects come from data.ts; real creative work (films, reels, identities)
// comes from creative.ts.

import { CREATIVE_PROJECTS, type CreativeProject } from './creative';
import {
  ADMIT_PROJECT, AJWADI_PROJECT, ATLAS_PROJECT, BUILD_ART_PROJECT, CLINIC_OS_PROJECT, ENACTIX_PROJECT,
  HOTEL_OS_PROJECT, MIZAN_PROJECT, NOVA_PROJECT, OPTICARE_PROJECT, RAQIB_PROJECT, WEAVOLUTION_PROJECT,
  type CaseStudyProject,
} from './data';
import { isAr } from './i18n';

/** Arabic for the short display strings (project write-ups stay in English for now). */
const AR: Record<string, string> = {
  // types
  'Client project': 'مشروع عميل', 'AURIC product': 'منتج أوريك', Showcase: 'عرض توضيحي', Project: 'مشروع',
  'Your work': 'من أعمالك', 'Internal tool': 'أداة داخلية',
  // categories
  'Law firm': 'مكتب محاماة', 'Real estate': 'عقارات', Hospitality: 'الضيافة', 'Enterprise, UAE': 'شركات، الإمارات',
  Collaboration: 'التعاون', 'Security & inspection': 'الأمن والتفتيش', Ticketing: 'التذاكر', Healthcare: 'الرعاية الصحية',
  'Student organisations': 'المنظمات الطلابية', Sustainability: 'الاستدامة', 'Interior design': 'التصميم الداخلي',
  Video: 'فيديو', Branding: 'هوية بصرية', Content: 'محتوى', Motion: 'موشن', Design: 'تصميم',
  'Video + voiceover': 'فيديو وتعليق صوتي', 'Developer tool': 'أداة للمطورين',
  // services
  'Design · Web · Mobile · AI': 'تصميم · ويب · جوال · ذكاء اصطناعي', 'Platform · AI': 'منصة · ذكاء اصطناعي',
  'Platform · Website': 'منصة · موقع', 'ERP · Mobile app': 'نظام ERP · تطبيق جوال', 'Web · Mobile': 'ويب · جوال',
  'Platform · Offline app': 'منصة · تطبيق يعمل دون اتصال', Platform: 'منصة', 'Platform on Odoo': 'منصة على Odoo',
  Website: 'موقع', 'Video · Motion': 'فيديو · موشن', 'Video · Motion · Voiceover': 'فيديو · موشن · تعليق صوتي',
  'Branding · Design': 'هوية · تصميم', 'Strategy · Content · Reels': 'استراتيجية · محتوى · ريلز',
  'Motion graphics': 'موشن جرافيك', 'Print · Social design': 'مطبوعات · تصاميم سوشيال',
  'Video · Voiceover': 'فيديو · تعليق صوتي', 'Content · Social': 'محتوى · سوشيال', 'Developer tooling': 'أدوات للمطورين',
  // one-liners
  'Practice management for a law firm, in Arabic and English.': 'إدارة مكتب محاماة بالعربية والإنجليزية.',
  'A real-estate operating system with an AI copilot.': 'نظام تشغيل للتطوير العقاري مع مساعد ذكي.',
  'Hotel operations and the booking website guests use.': 'تشغيل الفندق وموقع الحجز الذي يستخدمه الضيوف.',
  'An ERP with CRM modules and an employee mobile app.': 'نظام ERP مع وحدات CRM وتطبيق جوال للموظفين.',
  'Projects, contracts, messaging and payments in one platform.': 'المشاريع والعقود والمراسلة والمدفوعات في منصة واحدة.',
  'Field inspections and quality control that work offline.': 'تفتيش ميداني ومراقبة جودة تعمل دون اتصال.',
  'Event ticketing with manual payment checks.': 'تذاكر الفعاليات مع التحقق اليدوي من الدفع.',
  'A clinic operating system from reception to lab.': 'نظام تشغيل للعيادات من الاستقبال حتى المعمل.',
  'Management for student organisations and chapters.': 'إدارة المنظمات الطلابية وفروعها.',
  'A circular-economy platform and marketplace.': 'منصة وسوق للاقتصاد الدائري.',
  'A marketing site for an interior fit-out studio.': 'موقع تسويقي لاستوديو تصميم وتشطيب داخلي.',
  'Clinic management for eye-care practices.': 'إدارة عيادات طب العيون.',
  'The starter AURIC uses for every build.': 'القالب الذي تبدأ به أوريك كل مشروع تقني.',
  // placeholders
  '[Showreel]': '[الفيديو التعريفي]', '[Brand film]': '[فيلم العلامة]', '[Brand identity]': '[هوية بصرية]',
  '[Reels campaign]': '[حملة ريلز]', '[Motion piece]': '[عمل موشن]', '[Poster series]': '[سلسلة بوسترات]',
  '[Product video]': '[فيديو منتج]', '[Social content]': '[محتوى سوشيال]', '[Content campaign]': '[حملة محتوى]',
  '[Year]': '[السنة]',
  'Your strongest video work, cut into one reel.': 'أقوى أعمالك في الفيديو، في مقطع واحد.',
  'A brand film, directed, edited and voiced.': 'فيلم للعلامة: إخراج ومونتاج وتعليق صوتي.',
  'A full identity: logo, colors, type and applications.': 'هوية كاملة: الشعار والألوان والخطوط وتطبيقاتها.',
  'A series of reels and posts planned and produced together.': 'سلسلة ريلز ومنشورات خُطط لها ونُفذت معًا.',
  'Motion graphics for a launch or campaign.': 'موشن جرافيك لإطلاق أو حملة.',
  'Posters and print for an event or brand.': 'بوسترات ومطبوعات لفعالية أو علامة.',
  'A product video with voiceover.': 'فيديو منتج مع تعليق صوتي.',
  'Social content produced every month.': 'محتوى سوشيال يُنتج كل شهر.',
  // filters
  All: 'الكل', 'Video & motion': 'فيديو وموشن', 'Design & branding': 'تصميم وهوية', 'Content & social': 'محتوى وسوشيال',
  'Websites & apps': 'مواقع وتطبيقات',
};
const L = (s: string) => (isAr ? AR[s] ?? s : s);

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
  /** Silent clip that loops in previews (video and reel work). */
  teaser?: string;
  vertical?: boolean;
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
  cat: L(meta.cat),
  kind: L(meta.kind),
  services: L(meta.services),
  year: data.year,
  group: 'apps',
  type: 'img',
  img: meta.img ?? data.dashboardImages[0]?.src,
  href: `/work/${slug}`,
  desc: L(meta.line),
  line: L(meta.line),
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

/** Real creative work (video, design, content), each with its own case study page (src/lib/creative.ts). */
const cr = (p: CreativeProject): Entry => ({
  name: p.name,
  cat: p.cat,
  kind: p.kind,
  services: p.services,
  year: p.year,
  group: p.group,
  type: p.type,
  img: p.type === 'design' ? (p.pieces?.[0]?.src ?? p.cover) : p.cover,
  teaser: p.film?.teaser,
  vertical: p.film?.vertical,
  href: `/work/${p.slug}`,
  desc: p.line,
});
const C = Object.fromEntries(CREATIVE_PROJECTS.map((p) => [p.slug, cr(p)])) as Record<string, Entry>;

/** Named shortcuts for the pages that place a specific piece. */
export const CREATIVE = {
  showreel: C['auric-showreel'],
  brandFilm: C['tcg-brand-film'],
  identity: C['elk-cafe'],
  reel: C['tcg-reel'],
};

const S = Object.fromEntries(SOFTWARE.map((p) => [p.slug, p])) as Record<string, SoftwareProject>;

export const CREATE_AURIC: Entry = {
  name: 'create-auric', cat: L('Developer tool'), kind: L('Internal tool'), services: L('Developer tooling'), year: '2026',
  group: 'apps', type: 'term', href: '/work', desc: L('The starter AURIC uses for every build.'),
};

/** Work page archive: everything, mixed formats. */
export const ARCHIVE: Entry[] = [
  CREATIVE.brandFilm, CREATIVE.identity, S.mizan, CREATIVE.reel, S.atlas, CREATIVE.showreel, S['hotel-os'],
  S.nova, S.ajwadi, S.raqib, S.admit, S['clinic-os'], S.enactix, S.weavolution, S['build-art'], S.opticare, CREATE_AURIC,
];

/** Phone feed order. */
export const FEED: Entry[] = [
  CREATIVE.brandFilm, S.mizan, CREATIVE.identity, CREATIVE.reel, S.atlas, CREATIVE.showreel, S['hotel-os'],
  S.nova, S.ajwadi, S.raqib, S.admit, S['clinic-os'], S.enactix, S.weavolution, S['build-art'], S.opticare, CREATE_AURIC,
];

/** Work page index (A2). */
export const INDEX: Entry[] = [
  CREATIVE.brandFilm, CREATIVE.identity, S.mizan, CREATIVE.reel, S.atlas, CREATIVE.showreel, S['hotel-os'], S.nova,
];

/** Case studies page (deep dives). */
export const CASE_STUDIES: Entry[] = [
  S.mizan, CREATIVE.brandFilm, CREATIVE.identity, S.atlas, S['hotel-os'], CREATIVE.reel, S.nova, CREATIVE.showreel,
  S.raqib, S.admit, S['clinic-os'], S.ajwadi,
];

export const FILTERS: { id: 'all' | Group; name: string }[] = [
  { id: 'all', name: L('All') },
  { id: 'video', name: L('Video & motion') },
  { id: 'design', name: L('Design & branding') },
  { id: 'content', name: L('Content & social') },
  { id: 'apps', name: L('Websites & apps') },
];
