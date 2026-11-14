// Creative case studies: real AURIC video, motion and design work.
// Each project has its own page at /work/<slug> (src/pages/CreativeCaseStudy.tsx).
// Kept free of React so vite.config.ts can read it for the build-time SEO pages.
//
// Sources: E:\Clients\AURIC\NEW\Data Videos (TCG film and reel), Behance (ELK Café),
// scripts/reel (AURIC showreel). Frames are stills pulled from the real videos.

import { t } from './i18n';
import type { Group } from './projects';

export type Frame = { src: string; cap: string };
export type Piece = { src: string; alt: string; shape: 'post' | 'story' | 'wide' };

export type CreativeProject = {
  slug: string;
  name: string;
  client: string;
  cat: string;
  kind: string;
  services: string;
  year: string;
  /** One line: what we made and for whom. */
  line: string;
  group: Group;
  /** How the work is shown: a wide film, a vertical reel, or design pieces. */
  type: 'video' | 'reel' | 'design';
  cover: string;
  film?: { src: string; teaser: string; poster: string; title: string; vertical?: boolean; length: string };
  brief: string;
  made: string;
  frames?: Frame[];
  pieces?: Piece[];
  palette?: { hex: string; name: string }[];
  deliverables: string[];
  credits: [string, string][];
  /** SEO, both languages (the build reads these directly). */
  meta: { en: { title: string; description: string }; ar: { title: string; description: string } };
};

const f = (slug: string, n: number, cap: string): Frame => ({ src: `/work/${slug}/frame-${n}.jpg`, cap });

export const CREATIVE_PROJECTS: CreativeProject[] = [
  {
    slug: 'tcg-brand-film',
    name: t('TCG brand film', 'فيلم TCG'),
    client: 'TCG',
    cat: t('Recruitment · Dubai & New York', 'توظيف · دبي ونيويورك'),
    kind: t('Client work', 'عمل لعميل'),
    services: t('Interviews · Edit · Motion graphics', 'مقابلات · مونتاج · موشن جرافيك'),
    year: '2026',
    line: t(
      'A six-minute film where the people behind a recruitment firm tell its story, from Dubai to New York.',
      'فيلم مدته ست دقائق يروي فيه أصحاب شركة توظيف قصتها، من دبي إلى نيويورك.',
    ),
    group: 'video',
    type: 'video',
    cover: '/work/tcg-brand-film/cover.jpg',
    film: {
      src: '/media/brand-film.mp4',
      teaser: '/media/brand-film-teaser.mp4',
      poster: '/media/brand-film-poster.webp',
      title: t('TCG brand film', 'فيلم TCG'),
      length: '05:57',
    },
    brief: t(
      'TCG places senior talent for fast-growing companies and was opening in New York. They needed one film that explains who they are, how they work and why clients trust them, told by their own people rather than a voiceover.',
      'تعمل TCG على توظيف الكفاءات القيادية للشركات سريعة النمو، وكانت تفتتح مكتبها في نيويورك. احتاجت فيلمًا واحدًا يشرح من هي وكيف تعمل ولماذا يثق بها عملاؤها، بأصوات فريقها لا بتعليق صوتي.',
    ),
    made: t(
      'A documentary-style edit built from long interviews: we found the story in the footage, cut it to six minutes, and added clean motion graphics for the facts that matter, like the niche, eight years in headhunting and the move from Dubai to New York.',
      'مونتاج بأسلوب وثائقي من مقابلات طويلة: وجدنا القصة داخل المادة المصورة، واختصرناها إلى ست دقائق، وأضفنا موشن جرافيك واضحًا للحقائق المهمة مثل التخصص وثماني سنوات في الاستقطاب والانتقال من دبي إلى نيويورك.',
    ),
    frames: [
      f('tcg-brand-film', 1, t('00:37 · Supporting fintech startups', '00:37 · دعم الشركات الناشئة في التقنية المالية')),
      f('tcg-brand-film', 2, t('01:52 · Chapter one, the vision', '01:52 · الفصل الأول، الرؤية')),
      f('tcg-brand-film', 3, t('02:52 · Eight years in headhunting', '02:52 · ثماني سنوات في الاستقطاب')),
      f('tcg-brand-film', 4, t('04:22 · How a day runs', '04:22 · كيف يسير اليوم')),
      f('tcg-brand-film', 5, t('05:22 · Growth by referral', '05:22 · النمو عبر التوصيات')),
      f('tcg-brand-film', 6, t('05:37 · Dubai to New York', '05:37 · من دبي إلى نيويورك')),
    ],
    deliverables: t(
      ['Six-minute brand film', 'Interview edit and story structure', 'Motion graphics and lower thirds', 'Burned-in captions'],
      ['فيلم علامة مدته ست دقائق', 'مونتاج المقابلات وبناء القصة', 'موشن جرافيك وعناوين سفلية', 'ترجمة مدمجة'],
    ),
    credits: [
      [t('Edit', 'المونتاج'), 'AURIC Create'],
      [t('Motion graphics', 'الموشن جرافيك'), 'AURIC Create'],
      [t('Client', 'العميل'), 'TCG'],
    ],
    meta: {
      en: { title: 'TCG Brand Film — Case Study | AURIC', description: 'A six-minute documentary-style brand film for TCG, a recruitment firm going from Dubai to New York: interview edit, motion graphics and finish by AURIC.' },
      ar: { title: 'فيلم TCG — دراسة حالة | أوريك', description: 'فيلم علامة بأسلوب وثائقي مدته ست دقائق لشركة التوظيف TCG من دبي إلى نيويورك: مونتاج المقابلات والموشن جرافيك والإنهاء من أوريك.' },
    },
  },
  {
    slug: 'elk-cafe',
    name: t('ELK Café', 'مقهى إلك'),
    client: 'ELK Café',
    cat: t('Café · Saudi Arabia', 'مقهى · السعودية'),
    kind: t('Client work', 'عمل لعميل'),
    services: t('Identity · Social design', 'هوية · تصميم سوشيال'),
    year: '2025',
    line: t(
      'A Saudi National Day identity for ELK Café, carried across posts, stories and the feed.',
      'هوية اليوم الوطني السعودي لمقهى إلك، ممتدة عبر المنشورات والستوريز والصفحة.',
    ),
    group: 'design',
    type: 'design',
    cover: '/work/elk/cover.jpg',
    brief: t(
      'ELK Café wanted to celebrate Saudi National Day with offers that feel part of the moment, not a generic sale: one look that could run for the whole of September on every post and story.',
      'أراد مقهى إلك الاحتفال باليوم الوطني السعودي بعروض تشعر بأنها جزء من المناسبة لا تخفيضات عامة: هوية واحدة تستمر طوال سبتمبر على كل منشور وستوري.',
    ),
    made: t(
      'A National Day system built around the line "عزّنا بطبعنا": a magenta band with a Sadu-inspired pattern, warm product photography of ELK\'s own drinks, and bold Arabic headlines for each offer, laid out as a week-by-week plan.',
      'نظام لليوم الوطني مبني حول عبارة "عزّنا بطبعنا": شريط أرجواني بنقش مستوحى من السدو، وتصوير دافئ لمشروبات إلك نفسها، وعناوين عربية عريضة لكل عرض، ضمن خطة أسبوعية.',
    ),
    pieces: [
      { src: '/work/elk/post-1.jpg', alt: t('Post: Our hospitality, our offers', 'منشور: كرمنا بعروضنا'), shape: 'post' },
      { src: '/work/elk/story-1.jpg', alt: t('Story: today\'s coffee for less', 'ستوري: قهوة اليوم بسعر أوفر'), shape: 'story' },
      { src: '/work/elk/post-2.jpg', alt: t('Post: a flavour that brings us together', 'منشور: نكهة تجمعنا'), shape: 'post' },
      { src: '/work/elk/story-2.jpg', alt: t('Story: Saudi latte offer', 'ستوري: عرض سعودي لاتيه'), shape: 'story' },
      { src: '/work/elk/post-3.jpg', alt: t('Post: our flavours are different', 'منشور: نكهاتنا غير'), shape: 'post' },
      { src: '/work/elk/story-3.jpg', alt: t('Story: pistachio latte offer', 'ستوري: عرض بيستاشيو لاتيه'), shape: 'story' },
      { src: '/work/elk/story-4.jpg', alt: t('Story: don\'t miss our offers', 'ستوري: لا تفوتوا عروضنا'), shape: 'story' },
    ],
    palette: [
      { hex: '#40564a', name: t('Najd green', 'أخضر نجدي') },
      { hex: '#8b1e5a', name: t('Sadu magenta', 'أرجواني السدو') },
      { hex: '#e7ddc8', name: t('Cup cream', 'كريمي الكوب') },
      { hex: '#c8963e', name: t('Coffee gold', 'ذهبي القهوة') },
    ],
    deliverables: t(
      ['National Day look and line', 'Three feed posts', 'Five stories', 'Feed grid plan', 'September content plan'],
      ['هوية اليوم الوطني وعبارته', 'ثلاثة منشورات', 'خمس ستوريز', 'تخطيط شبكة الصفحة', 'خطة محتوى سبتمبر'],
    ),
    credits: [
      [t('Design', 'التصميم'), 'Ziad Elrefaey'],
      [t('Client', 'العميل'), 'ELK Café'],
    ],
    meta: {
      en: { title: 'ELK Café Saudi National Day — Case Study | AURIC', description: 'A Saudi National Day identity for ELK Café: the "عزّنا بطبعنا" look, posts, stories and a September content plan by AURIC.' },
      ar: { title: 'مقهى إلك لليوم الوطني — دراسة حالة | أوريك', description: 'هوية اليوم الوطني السعودي لمقهى إلك: عبارة "عزّنا بطبعنا" والمنشورات والستوريز وخطة محتوى سبتمبر من أوريك.' },
    },
  },
  {
    slug: 'tcg-reel',
    name: t('TCG reel', 'ريل TCG'),
    client: 'TCG',
    cat: t('Recruitment · Social', 'توظيف · سوشيال'),
    kind: t('Client work', 'عمل لعميل'),
    services: t('Edit · Motion · Captions', 'مونتاج · موشن · ترجمة'),
    year: '2026',
    line: t('A 46-second vertical reel that introduces TCG\'s founder and the firm\'s move into the US.', 'ريل عمودي مدته 46 ثانية يقدّم مؤسس TCG وتوسّع الشركة إلى أمريكا.'),
    group: 'content',
    type: 'reel',
    cover: '/work/tcg-reel/cover.jpg',
    film: {
      src: '/media/reel.mp4',
      teaser: '/media/reel.mp4',
      poster: '/media/reel-poster.webp',
      title: t('TCG reel', 'ريل TCG'),
      vertical: true,
      length: '00:46',
    },
    brief: t(
      'TCG needed short content that works in the first second of a scroll: who the founder is, what the firm does, and why the US move matters, without losing the premium tone of their brand film.',
      'احتاجت TCG محتوى قصيرًا ينجح من الثانية الأولى أثناء التصفح: من هو المؤسس، وماذا تفعل الشركة، ولماذا يهم التوسع إلى أمريكا، دون أن تفقد النبرة الراقية لفيلمها.',
    ),
    made: t(
      'A fast vertical edit that mixes interview, phone footage and city shots with kinetic captions, animated role cards and a branded end card, all in TCG\'s purple, made for Instagram and LinkedIn.',
      'مونتاج عمودي سريع يمزج المقابلة ولقطات الهاتف ومشاهد المدينة مع ترجمة متحركة وبطاقات أدوار متحركة وخاتمة بهوية الشركة، كلها بلون TCG البنفسجي، لإنستغرام ولينكدإن.',
    ),
    frames: [
      f('tcg-reel', 1, t('00:00 · The founder', '00:00 · المؤسس')),
      f('tcg-reel', 2, t('00:05 · The team, ranked', '00:05 · الفريق بالترتيب')),
      f('tcg-reel', 3, t('00:09 · Becoming a better recruiter', '00:09 · ليصبح موظِّفًا أفضل')),
      f('tcg-reel', 4, t('00:14 · Bigger roles', '00:14 · أدوار أكبر')),
      f('tcg-reel', 5, t('00:37 · More presence in the US', '00:37 · حضور أكبر في أمريكا')),
      f('tcg-reel', 6, t('00:46 · This is TCG', '00:46 · هذه هي TCG')),
    ],
    deliverables: t(
      ['46-second vertical reel', 'Kinetic captions', 'Animated role cards', 'Branded end card'],
      ['ريل عمودي مدته 46 ثانية', 'ترجمة متحركة', 'بطاقات أدوار متحركة', 'خاتمة بهوية العلامة'],
    ),
    credits: [
      [t('Edit & motion', 'المونتاج والموشن'), 'AURIC Create'],
      [t('Client', 'العميل'), 'TCG'],
    ],
    meta: {
      en: { title: 'TCG Reel — Case Study | AURIC', description: 'A 46-second vertical reel for TCG introducing its founder and its move into the US: fast edit, kinetic captions and motion by AURIC.' },
      ar: { title: 'ريل TCG — دراسة حالة | أوريك', description: 'ريل عمودي مدته 46 ثانية لشركة TCG يقدّم مؤسسها وتوسعها إلى أمريكا: مونتاج سريع وترجمة متحركة وموشن من أوريك.' },
    },
  },
  {
    slug: 'auric-showreel',
    name: t('AURIC showreel', 'الفيديو التعريفي لأوريك'),
    client: 'AURIC',
    cat: t('AURIC · Brand', 'أوريك · العلامة'),
    kind: t('AURIC', 'أوريك'),
    services: t('Motion design · Edit', 'تصميم موشن · مونتاج'),
    year: '2026',
    line: t('Our own showreel: every AURIC service in about thirty seconds, built entirely in motion.', 'فيديو أوريك التعريفي: كل خدماتنا في نحو ثلاثين ثانية، مصمم بالكامل بالموشن.'),
    group: 'video',
    type: 'video',
    cover: '/work/auric-showreel/cover.jpg',
    film: {
      src: '/media/showreel.mp4',
      teaser: '/media/showreel.mp4',
      poster: '/media/showreel-poster.webp',
      title: t('AURIC showreel', 'الفيديو التعريفي لأوريك'),
      length: '00:36',
    },
    brief: t(
      'We needed one piece that shows the whole studio at a glance, video, design, content and software, and that runs on the website as a silent loop as well as on social.',
      'احتجنا عملًا واحدًا يعرض الاستوديو كله في لمحة، فيديو وتصميم ومحتوى وبرمجيات، ويعمل على الموقع كحلقة صامتة وعلى السوشيال أيضًا.',
    ),
    made: t(
      'A motion piece built from our own identity, real product screens and real edits: kinetic type, the AURIC mark, a live Premiere timeline and our software, cut in two shapes, 21:9 for the web and 4:5 for phones.',
      'عمل موشن مبني من هويتنا وشاشات منتجاتنا الحقيقية ومونتاجنا الحقيقي: طباعة متحركة وشعار أوريك وخط زمني حقيقي من بريمير وبرمجياتنا، بمقاسين: 21:9 للموقع و4:5 للهاتف.',
    ),
    frames: [
      f('auric-showreel', 1, t('00:03 · Your idea, launched', '00:03 · فكرتك، منطلقة')),
      f('auric-showreel', 2, t('00:08 · Video & motion', '00:08 · فيديو وموشن')),
      f('auric-showreel', 3, t('00:14 · Content plans', '00:14 · خطط المحتوى')),
      f('auric-showreel', 4, t('00:16 · Software: Mizan', '00:16 · البرمجيات: ميزان')),
      f('auric-showreel', 5, t('00:27 · Everything, one team', '00:27 · كل شيء، فريق واحد')),
      f('auric-showreel', 6, t('00:31 · End card', '00:31 · الخاتمة')),
    ],
    deliverables: t(
      ['21:9 web showreel', '4:5 vertical cut', 'Poster frames', 'Silent loop for the site'],
      ['فيديو تعريفي 21:9 للموقع', 'نسخة عمودية 4:5', 'صور غلاف', 'حلقة صامتة للموقع'],
    ),
    credits: [
      [t('Direction', 'الإخراج'), 'AURIC Create'],
      [t('Motion design', 'تصميم الموشن'), 'AURIC Create'],
      [t('Product screens', 'شاشات المنتجات'), 'AURIC Build'],
      [t('Edit', 'المونتاج'), 'AURIC Create'],
    ],
    meta: {
      en: { title: 'AURIC Showreel — Case Study | AURIC', description: 'How AURIC made its own showreel: every service in thirty seconds of motion design, real product screens and real edits, in 21:9 and 4:5.' },
      ar: { title: 'الفيديو التعريفي لأوريك — دراسة حالة | أوريك', description: 'كيف صنعت أوريك فيديوها التعريفي: كل الخدمات في ثلاثين ثانية من الموشن وشاشات منتجات حقيقية ومونتاج حقيقي، بمقاسي 21:9 و4:5.' },
    },
  },
];

export const creativeBySlug = (slug: string) => CREATIVE_PROJECTS.find((p) => p.slug === slug);
