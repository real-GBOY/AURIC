import { motion } from 'framer-motion';
import { Reveal } from '../ui/Reveal';
import { AuricMark } from '../Logo';
import { WORKSPACE } from '../../lib/content';
import { t } from '../../lib/i18n';
import { EASE, inView, rise, stagger } from '../../lib/motion';

const pad = (n: number) => String(n).padStart(2, '0');

/* What the client gets from it, written as benefits, not features. */
const BENEFITS = [
  {
    t: t('Always know where things stand', 'تعرف دائمًا أين وصل العمل'),
    d: t('Stages, milestones and deadlines for every project, so you never have to ask for an update.', 'مراحل كل مشروع ومحطاته ومواعيده أمامك، فلا تحتاج أن تسأل عن آخر المستجدات.'),
  },
  {
    t: t('Know who owns what', 'تعرف من المسؤول عن ماذا'),
    d: t('See the people and teams on your project, and who is responsible for each task.', 'ترى الأشخاص والفرق في مشروعك، ومن المسؤول عن كل مهمة.'),
  },
  {
    t: t('Ask for anything, anytime', 'اطلب ما تريد، في أي وقت'),
    d: t('Send revisions, new tasks or extra services with files and a priority. Each request gets an owner, and anything that changes scope, budget or timing is agreed with you first.', 'أرسل التعديلات والمهام الجديدة والخدمات الإضافية مع الملفات والأولوية. لكل طلب مسؤول، وأي تغيير في النطاق أو الميزانية أو الموعد نتفق عليه معك أولًا.'),
  },
  {
    t: t('One conversation, not ten', 'محادثة واحدة بدل عشر'),
    d: t('Discussions, updates and approvals live with the project, searchable, instead of scattered across WhatsApp and email.', 'النقاشات والتحديثات والموافقات مع المشروع نفسه وقابلة للبحث، بدل أن تتوزع بين واتساب والبريد.'),
  },
  {
    t: t('Review and approve in one place', 'راجع ووافق من مكان واحد'),
    d: t('Preview designs, videos and files, comment on the exact piece, approve or ask for changes, and find every past version.', 'استعرض التصاميم والفيديوهات والملفات، وعلّق على القطعة نفسها، ووافق أو اطلب تعديلًا، وارجع لأي نسخة سابقة.'),
  },
  {
    t: t('Open whenever you need it', 'متاحة متى احتجتها'),
    d: t('Reach the workspace and raise a request or support ticket 24/7, and follow it to the answer.', 'ادخل مساحة العمل وأرسل طلبًا أو تذكرة دعم على مدار الساعة، وتابعها حتى الرد.'),
  },
];

const COMPARE = [
  { who: t('Typical agency', 'الوكالة المعتادة'), line: t('Updates arrive when someone remembers to send them.', 'التحديثات تصلك عندما يتذكر أحد أن يرسلها.') },
  { who: t('Freelancer', 'المستقل'), line: t('One person, one inbox, and no one covering when they are away.', 'شخص واحد وبريد واحد، ولا أحد يغطي عند غيابه.') },
  { who: 'AURIC', line: t('Every project in one place, every task owned, all of it visible to you.', 'كل مشروع في مكان واحد، ولكل مهمة مسؤول، وكله أمامك.'), us: true },
];

/** A branded preview of the workspace (illustrative content, not a real client). */
function Preview() {
  const stages = [t('Plan', 'خطة'), t('Make', 'تنفيذ'), t('Review', 'مراجعة'), t('Deliver', 'تسليم')];
  const requests = [
    { r: t('Swap the hero photo', 'تغيير صورة الواجهة'), s: t('In progress', 'قيد التنفيذ'), who: t('Design', 'تصميم'), c: 'text-gold' },
    { r: t('Add Arabic subtitles', 'إضافة ترجمة عربية'), s: t('Done', 'تم'), who: t('Video', 'فيديو'), c: 'text-[#7fd18b]' },
    { r: t('New landing page', 'صفحة هبوط جديدة'), s: t('Awaiting your approval', 'بانتظار موافقتك'), who: t('Scope', 'النطاق'), c: 'text-cream' },
  ];
  return (
    <div className="frame overflow-hidden" aria-hidden="true">
      <div className="frame-bar">
        <i />
        <i />
        <i />
      </div>
      <div className="flex flex-col gap-4 p-5 md:p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-2">
            <AuricMark size={20} className="text-gold" />
            <span className="lab !text-cream">{t('Your workspace', 'مساحة عملك')}</span>
          </span>
          <span className="lab !text-[10px]">{t('Preview', 'معاينة')}</span>
        </div>

        {/* project */}
        <div className="rounded-lg border border-[var(--line)] bg-ink p-4">
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-display text-[19px] font-bold tracking-[-0.03em]">{t('Brand film + website', 'فيلم العلامة + الموقع')}</span>
            <span className="lab !text-gold">64%</span>
          </div>
          <div className="mt-3 h-[6px] overflow-hidden rounded-full bg-[rgba(244,241,232,.08)]">
            <motion.div className="h-full origin-left rounded-full bg-gold" style={{ width: '64%' }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={inView} transition={{ duration: 1.1, ease: EASE }} />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {stages.map((s, i) => (
              <span key={s} className={`lab rounded-full border px-2 py-[5px] text-center !text-[10px] ${i < 1 ? 'border-gold !text-gold' : i === 1 ? 'border-gold bg-gold !text-[#141414]' : 'border-[rgba(244,241,232,.16)]'}`}>
                {i < 1 ? '✓ ' : ''}
                {s}
              </span>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-3">
            <span className="flex -space-x-2 rtl:space-x-reverse">
              {['SA', 'MN', 'DV'].map((x, i) => (
                <span key={x} className={`grid h-8 w-8 place-items-center rounded-full border-2 border-ink font-display text-[10px] font-bold ${i === 0 ? 'bg-gold text-[#141414]' : 'bg-cream text-[#141414]'}`}>
                  {x}
                </span>
              ))}
            </span>
            <span className="lab !text-[10px]">{t('Video · Design · Dev', 'فيديو · تصميم · برمجة')}</span>
          </div>
        </div>

        {/* requests */}
        <div className="flex flex-col">
          <span className="lab mb-2 !text-[10px]">{t('Your requests', 'طلباتك')}</span>
          {requests.map((q) => (
            <div key={q.r} className="flex items-center justify-between gap-3 border-t border-[var(--line)] py-[10px]">
              <span className="text-[14px] text-cream">{q.r}</span>
              <span className="flex shrink-0 items-center gap-2">
                <span className="lab !text-[9px]">{q.who}</span>
                <span className={`lab !text-[10px] ${q.c}`}>{q.s}</span>
              </span>
            </div>
          ))}
        </div>

        {/* deliverable */}
        <div className="flex items-center justify-between gap-3 rounded-lg bg-cream p-3 text-[#141414]">
          <span className="font-display text-[14px] font-bold">{t('Brand film · version 3', 'فيلم العلامة · النسخة 3')}</span>
          <span className="flex gap-2">
            <span className="lab rounded-full bg-[#141414] px-3 py-[5px] !text-[10px] !text-cream">{t('Approve', 'موافقة')}</span>
            <span className="lab rounded-full border border-[#141414] px-3 py-[5px] !text-[10px] !text-[#141414]">{t('Changes', 'تعديل')}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Your AURIC Workspace: part of Manage, included with working with AURIC (not a separate product).
 * WORKSPACE.live in lib/content switches the wording from "coming" to "included".
 */
export default function Workspace() {
  const live = WORKSPACE.live;
  return (
    <section id="workspace" className="border-t border-[var(--line)] bg-ink py-[88px] md:py-[120px]">
      <div className="wrap">
        <Reveal className="mb-12 flex flex-col gap-5 md:mb-16">
          <div className="flex flex-wrap items-center gap-3">
            <span className="lab !text-gold">{t('Manage · Your AURIC Workspace', 'الإدارة · مساحة عملك في أوريك')}</span>
            <span className="lab rounded-full border border-gold px-3 py-1 !text-[10px] !text-gold">
              {live ? t('Included with every engagement', 'مشمولة مع كل تعاون') : t('Coming to every engagement', 'قادمة مع كل تعاون')}
            </span>
          </div>
          <h2 className="h2 max-w-[16ch]">{t('Your project, always in view.', 'مشروعك أمامك، دائمًا.')}</h2>
          <p className="copy max-w-[58ch]">
            {live
              ? t('Every AURIC client gets a private workspace: one place to follow progress, talk to the team, review work and ask for anything, without chasing anyone for an update.', 'كل عميل في أوريك يحصل على مساحة عمل خاصة: مكان واحد يتابع فيه التقدم، ويتحدث مع الفريق، ويراجع العمل، ويطلب ما يحتاجه، دون أن يلاحق أحدًا للسؤال عن جديد.')
              : t('Every AURIC client will get a private workspace: one place to follow progress, talk to the team, review work and ask for anything, without chasing anyone for an update.', 'سيحصل كل عميل في أوريك على مساحة عمل خاصة: مكان واحد يتابع فيه التقدم، ويتحدث مع الفريق، ويراجع العمل، ويطلب ما يحتاجه، دون أن يلاحق أحدًا للسؤال عن جديد.')}
          </p>
        </Reveal>

        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <motion.ol className="m-0 grid list-none gap-x-10 gap-y-9 p-0 sm:grid-cols-2" initial="hidden" whileInView="visible" viewport={inView} variants={stagger(0.08)}>
            {BENEFITS.map((b, i) => (
              <motion.li key={b.t} variants={rise} className="flex flex-col gap-3 border-t border-[var(--line)] pt-5">
                <span className="lab !text-gold">{pad(i + 1)}</span>
                <span className="font-display text-[22px] font-bold leading-[1.1] tracking-[-0.03em] md:text-[24px]">{b.t}</span>
                <p className="copy !text-[15px]">{b.d}</p>
              </motion.li>
            ))}
          </motion.ol>
          <div className="lg:sticky lg:top-28">
            <Preview />
          </div>
        </div>

        {/* Why it matters: the difference from an agency or a freelancer */}
        <div className="mt-16 grid gap-4 md:mt-20 md:grid-cols-3">
          {COMPARE.map((c) => (
            <div key={c.who} className={`flex flex-col gap-3 rounded-xl p-6 ${c.us ? 'bg-gold text-[#141414]' : 'border border-[var(--line)]'}`}>
              <span className={`lab ${c.us ? '!text-[#141414]' : ''}`}>{c.who}</span>
              <span className={`font-display text-[20px] font-bold leading-[1.15] tracking-[-0.03em] ${c.us ? '' : 'text-cream'}`}>{c.line}</span>
            </div>
          ))}
        </div>

        <p className="lab mt-10 max-w-[90ch] !normal-case !tracking-normal !text-[13px] leading-[1.7]">
          {t(
            'Private to your company: only the people you invite can see your projects. Open 24/7 for requests and support tickets; response times are agreed in your contract, with a clear path for anything urgent.',
            'خاصة بشركتك: لا يرى مشاريعك إلا من تدعوهم. متاحة على مدار الساعة للطلبات وتذاكر الدعم، وأوقات الرد متفق عليها في عقدك، مع مسار واضح لأي أمر عاجل.',
          )}
        </p>
      </div>
    </section>
  );
}
