// Home page copy in English and Arabic. The Arabic is a first draft:
// have a native copywriter review it before launch.

import type { DivisionKey } from './content';
import { isAr } from './i18n';

type Copy = {
  eyebrow: string;
  eyebrowRight: string;
  hero: [string, string, string, string];
  heroText: string;
  start: string;
  explore: string;
  showreel: string;
  showreelPhone: string;
  marquee: string[];
  whatWeDo: string;
  hover: string;
  tap: string;
  divisions: { key: DivisionKey; name: string; short: string; desc: string; phoneDesc: string; see: string }[];
  selected: [string, string];
  fullPortfolio: string;
  allWork: string;
  caseStudies: string;
  work: { brandFilm: string; video: string; identity: string; design: string; yourVideo: string; yourDesign: string; mizan: string; mizanTag: string; mizanTagPhone: string; reel: string; content: string };
  how: [string, string];
  howRight: string;
  howRightPhone: string;
  steps: { title: string; desc: string; phone: string }[];
  whoLabel: string;
  audiences: string[];
  you: string;
  ways: [string, string];
  waysLink: string;
  startHere: string;
  packages: { name: string; who: string }[];
  priced: string;
  clients: [string, string];
  clientsRight: string;
  clientsRightPhone: string;
  quotes: string[];
  clientName: string;
  clientRole: string;
  logo: string;
  cta: [string, string];
  badge: string;
};

const EN: Copy = {
  eyebrow: 'AURIC — Your digital partner',
  eyebrowRight: 'Creative · Strategy · Technology · Delivery',
  hero: ['Your idea', 'planned,', 'built,', 'launched'],
  heroText: 'You bring the idea. We handle the video, design, strategy, website or app, with one team and one point of contact.',
  start: 'Start a Project',
  explore: 'Explore Our Work',
  showreel: 'Showreel · autoplay, muted loop · your video',
  showreelPhone: 'Showreel · vertical cut · your video',
  marquee: ['Video', 'Design', 'Motion', 'Voiceover', 'Strategy', 'Websites', 'Apps', 'Automation'],
  whatWeDo: 'What we do',
  hover: 'Hover a division',
  tap: 'Tap to open',
  divisions: [
    { key: 'create', name: 'Create', short: 'Video · design · voice', desc: 'Video editing, graphic design, motion graphics, voiceover and content, made to one standard.', phoneDesc: 'Video, design, motion, voiceover and content people remember.', see: 'See Create services' },
    { key: 'strategy', name: 'Strategy', short: 'Marketing · content', desc: 'Marketing and content plans, campaigns and calendars, so every piece has a job.', phoneDesc: 'Brand, marketing and content plans that give every piece a job.', see: 'See Strategy services' },
    { key: 'build', name: 'Build', short: 'Websites · apps · AI', desc: 'Websites, mobile apps, business systems and AI automation, engineered to last.', phoneDesc: 'Websites, apps and systems built around how you work.', see: 'See Build services' },
    { key: 'manage', name: 'Manage', short: 'One owner', desc: 'One owner coordinating every specialist, deadline and review, start to finish.', phoneDesc: 'One point of contact who keeps the project on time and on brief.', see: 'See Manage services' },
  ],
  selected: ['Selected', 'work'],
  fullPortfolio: 'Full portfolio',
  allWork: 'All work',
  caseStudies: 'Case studies',
  work: { brandFilm: '[Brand film]', video: 'Video', identity: '[Brand identity]', design: 'Design', yourVideo: 'Your video', yourDesign: 'Your design', mizan: 'Mizan', mizanTag: 'Client project · App', mizanTagPhone: 'App', reel: '[Reel]', content: 'Content' },
  how: ['How we', 'work'],
  howRight: 'One partner, start to finish',
  howRightPhone: 'Start to finish',
  steps: [
    { title: 'Plan', desc: 'Goals, audience and the plan to reach them.', phone: 'Goals, audience and the plan.' },
    { title: 'Create', desc: 'Video, design and content made to the plan.', phone: 'Video, design and content.' },
    { title: 'Build', desc: 'Websites and apps when the project needs them.', phone: 'Websites and apps when needed.' },
    { title: 'Deliver', desc: 'Reviewed, on time, and supported after.', phone: 'On time, supported after.' },
  ],
  whoLabel: 'Who we work with',
  audiences: ['Businesses', 'Startups', 'Entrepreneurs', 'Professionals', 'Personal brands'],
  you: 'You.',
  ways: ['Ways to work', 'with us'],
  waysLink: "See what's included",
  startHere: 'Start here',
  packages: [
    { name: 'Digital Launch', who: 'New businesses and rebrands' },
    { name: 'Growth Retainer', who: 'Brands that need steady content' },
    { name: 'Personal Brand Kit', who: 'Founders, professionals, creators' },
    { name: 'Business System', who: 'Companies with manual operations' },
  ],
  priced: 'Every project is priced after a short call',
  clients: ['Clients', 'say'],
  clientsRight: 'Real clients only · with permission',
  clientsRightPhone: 'With permission',
  quotes: [
    '[A real quote from client 1 about working with AURIC and what changed.]',
    '[A real quote from client 2 about working with AURIC and what changed.]',
  ],
  clientName: '[Client name]',
  clientRole: '[Role · Company]',
  logo: 'Client logo',
  cta: ["Let's make", 'it real'],
  badge: 'START A PROJECT · AURIC · START A PROJECT · AURIC · ',
};

const AR: Copy = {
  eyebrow: 'أوريك — شريكك الرقمي',
  eyebrowRight: 'إبداع · استراتيجية · تقنية · تنفيذ',
  hero: ['فكرتك', 'نخطط لها،', 'نبنيها،', 'ونطلقها'],
  heroText: 'أنت تأتي بالفكرة، ونحن نتولى الفيديو والتصميم والاستراتيجية والموقع أو التطبيق، بفريق واحد ونقطة تواصل واحدة.',
  start: 'ابدأ مشروعك',
  explore: 'شاهد أعمالنا',
  showreel: 'الفيديو التعريفي · فيديو من أعمالك',
  showreelPhone: 'الفيديو التعريفي · فيديو من أعمالك',
  marquee: ['فيديو', 'تصميم', 'موشن', 'تعليق صوتي', 'استراتيجية', 'مواقع', 'تطبيقات', 'أتمتة'],
  whatWeDo: 'ماذا نقدّم',
  hover: 'مرّر على القسم',
  tap: 'اضغط للفتح',
  divisions: [
    { key: 'create', name: 'إبداع', short: 'فيديو · تصميم · موشن · تعليق صوتي', desc: 'فيديو وتصميم وموشن وتعليق صوتي ومحتوى يبقى في الذاكرة.', phoneDesc: 'فيديو وتصميم وموشن وتعليق صوتي ومحتوى يبقى في الذاكرة.', see: 'خدمات إبداع' },
    { key: 'strategy', name: 'استراتيجية', short: 'هوية · تسويق · خطة محتوى', desc: 'خطط للهوية والتسويق والمحتوى تعطي كل قطعة هدفًا واضحًا.', phoneDesc: 'خطط للهوية والتسويق والمحتوى تعطي كل قطعة هدفًا واضحًا.', see: 'خدمات استراتيجية' },
    { key: 'build', name: 'تطوير', short: 'مواقع · تطبيقات · أنظمة', desc: 'مواقع وتطبيقات وأنظمة مبنية حول طريقة عملك.', phoneDesc: 'مواقع وتطبيقات وأنظمة مبنية حول طريقة عملك.', see: 'خدمات تطوير' },
    { key: 'manage', name: 'إدارة', short: 'فريق واحد · نقطة تواصل واحدة', desc: 'نقطة تواصل واحدة تحافظ على المشروع في موعده وحسب المطلوب.', phoneDesc: 'نقطة تواصل واحدة تحافظ على المشروع في موعده وحسب المطلوب.', see: 'خدمات إدارة' },
  ],
  selected: ['أعمال', 'مختارة'],
  fullPortfolio: 'كل الأعمال',
  allWork: 'كل الأعمال',
  caseStudies: 'دراسات الحالة',
  work: { brandFilm: '[فيلم العلامة]', video: 'فيديو', identity: '[هوية بصرية]', design: 'تصميم', yourVideo: 'فيديو من أعمالك', yourDesign: 'تصميمك هنا', mizan: 'ميزان', mizanTag: 'مشروع عميل · تطبيق', mizanTagPhone: 'تطبيق', reel: '[ريل]', content: 'محتوى' },
  how: ['كيف', 'نعمل'],
  howRight: 'شريك واحد من البداية للنهاية',
  howRightPhone: 'من البداية للنهاية',
  steps: [
    { title: 'نخطط', desc: 'الأهداف والجمهور والخطة للوصول إليهم.', phone: 'الأهداف والجمهور والخطة.' },
    { title: 'نبدع', desc: 'فيديو وتصميم ومحتوى حسب الخطة.', phone: 'فيديو وتصميم ومحتوى.' },
    { title: 'نبني', desc: 'مواقع وتطبيقات عندما يحتاجها المشروع.', phone: 'مواقع وتطبيقات عند الحاجة.' },
    { title: 'نسلّم', desc: 'بمراجعة دقيقة، في الموعد، ومع دعم بعد التسليم.', phone: 'في الموعد ومع دعم بعدها.' },
  ],
  whoLabel: 'نعمل مع',
  audiences: ['الشركات', 'الشركات الناشئة', 'رواد الأعمال', 'المهنيين', 'العلامات الشخصية'],
  you: 'وأنت.',
  ways: ['طرق العمل', 'معنا'],
  waysLink: 'السعر يُحدد بعد مكالمة قصيرة',
  startHere: 'ابدأ من هنا',
  packages: [
    { name: 'الإطلاق الرقمي', who: 'للمشاريع الجديدة وإعادة بناء العلامة' },
    { name: 'باقة النمو الشهرية', who: 'للعلامات التي تحتاج محتوى مستمرًا' },
    { name: 'العلامة الشخصية', who: 'لرواد الأعمال والمهنيين وصنّاع المحتوى' },
    { name: 'نظام الأعمال', who: 'للشركات ذات العمليات اليدوية' },
  ],
  priced: 'السعر يُحدد بعد مكالمة قصيرة',
  clients: ['ماذا يقول', 'عملاؤنا'],
  clientsRight: 'عملاء حقيقيون فقط · بإذنهم',
  clientsRightPhone: 'بإذنهم',
  quotes: ['[اقتباس حقيقي من العميل ١ عن تجربته مع أوريك.]', '[اقتباس حقيقي من العميل ٢ عن تجربته مع أوريك.]'],
  clientName: '[اسم العميل]',
  clientRole: '[المنصب · الشركة]',
  logo: 'شعار عميل',
  cta: ['لنجعلها', 'حقيقة'],
  badge: 'ابدأ مشروعك · AURIC · ابدأ مشروعك · AURIC · ',
};

export const HOME: Copy = isAr ? AR : EN;
