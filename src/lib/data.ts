import { Monitor, Boxes, Sparkles, Workflow, LayoutDashboard, Plug } from 'lucide-react';

export const WRAP = 'max-w-[1480px] mx-auto px-[var(--edge)]';

export const SERVICES = [
  { Icon: Monitor,        title: 'High-Performance Websites', desc: 'Fast, polished sites engineered to convert — built end to end, not assembled from templates.' },
  { Icon: Boxes,          title: 'Custom Web Applications',   desc: 'Purpose-built software designed around the way your business actually operates.' },
  { Icon: Sparkles,       title: 'AI-Powered Solutions',      desc: 'Practical AI that automates work, surfaces insight, and compounds your advantage.' },
  { Icon: Workflow,       title: 'Business Process Automation', desc: 'Automation and internal systems that remove friction and free your team to focus.' },
  { Icon: LayoutDashboard, title: 'Dashboards & Analytics',   desc: 'Portals and dashboards that turn scattered data into decisions your team can act on.' },
  { Icon: Plug,           title: 'API Integrations',          desc: 'Clean, reliable integrations that connect your systems and scale with you.' },
];

export const HERO_ICONS = [
  { Icon: Monitor,         label: 'High-Performance Websites' },
  { Icon: Boxes,           label: 'Custom Web Applications' },
  { Icon: Sparkles,        label: 'AI-Powered Solutions' },
  { Icon: Workflow,        label: 'Business Process Automation' },
  { Icon: LayoutDashboard, label: 'Dashboards & Analytics' },
  { Icon: Plug,            label: 'API Integrations' },
];

export const WORKS = [
  { title: 'Nova',               cat: 'Enterprise ERP + CRM Platform',  tag: 'Web + Mobile', year: "'25", bg: 'linear-gradient(135deg,#C6A455 0%,#241d0f 100%)', span: 'col-span-1 sm:col-span-3', href: '/work/nova', image: '/work/nova/dashboard-overview.jpg' },
  { title: 'Ajwadi',             cat: 'Collaboration & Project Management Platform', tag: 'Web + Mobile', year: "'25", bg: 'linear-gradient(135deg,#2f6e6a 0%,#101f1e 100%)', span: 'col-span-1 sm:col-span-3', href: '/work/ajwadi', image: '/work/ajwadi/dashboard-overview.png' },
  { title: 'Enactix',            cat: 'Student Org Management Platform', tag: 'Web + Mobile', year: "'25", bg: 'linear-gradient(135deg,#6a4a8f 0%,#1c1228 100%)', span: 'col-span-1 sm:col-span-2', href: '/work/enactix', image: '/work/enactix/dashboard-overview.jpg' },
  { title: 'Weavolution',        cat: 'Sustainability & Circular Economy Platform', tag: 'Web', year: "'25", bg: 'linear-gradient(135deg,#3f5fb7 0%,#0d1530 100%)', span: 'col-span-1 sm:col-span-2', href: '/work/weavolution', image: '/work/weavolution/home-hero.png' },
  { title: 'Build Art',          cat: 'Interior Design & Fit-Out Marketing Site', tag: 'Web', year: "'25", bg: 'linear-gradient(135deg,#b7913f 0%,#2b210d 100%)', span: 'col-span-1 sm:col-span-2', href: '/work/build-art', image: '/work/build-art/hero.png' },
];

// ─── Case study projects ───────────────────────────────────────────────────────

export interface CaseStudyProject {
  title: string;
  category: string;
  tagline: string;
  year: string;
  link: string;
  overview: string[];
  modules: { title: string; desc: string }[];
  modulesLabel?: string;
  features: string[];
  techGroups: { label: string; items: string[] }[];
  architecture?: string;
  impact: string;
  dashboardImages: { src: string; alt: string }[];
  dashboardLabel?: string;
  mobileImages: { src: string; alt: string }[];
}

export const NOVA_PROJECT: CaseStudyProject = {
  title: 'Nova',
  category: 'Enterprise ERP System with Integrated CRM Modules',
  tagline: 'A comprehensive ERP platform with integrated CRM modules — a React web dashboard for administrators and managers, alongside a React Native mobile app for employee self-service and real-time communication.',
  year: '2025',
  link: 'https://nova-front-me.vercel.app/',
  overview: [
    "Developed the frontend of a comprehensive Enterprise Resource Planning (ERP) system with integrated Customer Relationship Management (CRM) modules for a UAE-based company. The platform consists of a React web dashboard for administrators and managers, alongside a React Native mobile application that empowers employees with self-service capabilities and real-time communication.",
    "The ERP platform centralizes business operations across Human Resources, Finance, Legal, Customer Support, and Internal Communications, while the CRM modules streamline customer interactions, support workflows, and team collaboration. Built with scalability and performance in mind, the system supports hundreds of daily business operations through a modern, responsive interface.",
  ],
  modules: [
    { title: 'Human Resources (HRMS)', desc: 'Employee management, attendance, leave, overtime, payroll, contracts, and document management.' },
    { title: 'CRM', desc: 'Customer records, communication, support tickets, and relationship management.' },
    { title: 'Finance', desc: 'Payroll processing, invoices, vouchers, and financial operations.' },
    { title: 'Legal', desc: 'Case management, compliance tracking, and legal documentation.' },
    { title: 'Communication', desc: 'Real-time one-to-one and group messaging with file sharing, voice messages, and live notifications.' },
    { title: 'Employee Self-Service Mobile App', desc: 'Attendance, requests, profile management, assets, documents, announcements, and biometric authentication.' },
  ],
  features: [
    'Enterprise-grade ERP architecture with integrated CRM capabilities',
    'Role-based access control (RBAC) with granular permissions',
    'Attendance management (check-in/out, breaks, location-aware workflows)',
    'Leave, overtime, and attendance request management',
    'Payroll and financial operations',
    'Employee profiles, contracts, company assets, and document management',
    'Real-time chat, notifications, and collaboration powered by Socket.IO',
    'Customer support ticketing with live conversations',
    'Push notifications and in-app alerts',
    'Face ID & Fingerprint authentication',
    'Arabic & English multilingual support with full RTL compatibility',
    'Responsive UI optimized for both desktop and mobile experiences',
  ],
  techGroups: [
    { label: 'Web',    items: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'TanStack Query', 'Socket.IO', 'Firebase', 'Axios'] },
    { label: 'Mobile', items: ['React Native (Expo)', 'TypeScript', 'NativeWind', 'TanStack Query', 'Socket.IO', 'Firebase', 'Axios'] },
  ],
  impact: "Contributed to building a production-ready enterprise platform that digitizes core business operations through a unified ERP ecosystem with CRM capabilities. The project strengthened our team's expertise in architecting scalable frontend applications, implementing complex business workflows, integrating real-time systems, and delivering seamless cross-platform experiences for enterprise users.",
  dashboardImages: [
    { src: '/work/nova/dashboard-overview.jpg',  alt: 'Nova dashboard overview' },
    { src: '/work/nova/dashboard-members.jpg',   alt: 'Nova members grid view' },
    { src: '/work/nova/dashboard-documents.png', alt: 'Nova member documents panel' },
    { src: '/work/nova/dashboard-attendance.jpg', alt: 'Nova attendance management' },
    { src: '/work/nova/dashboard-settings.jpg',  alt: 'Nova settings and assets' },
  ],
  mobileImages: [
    { src: '/work/nova/mobile-home.jpg',              alt: 'Nova mobile app home screen' },
    { src: '/work/nova/mobile-requests.jpg',          alt: 'Nova mobile requests menu' },
    { src: '/work/nova/mobile-requests-details.jpg',  alt: 'Nova mobile request details' },
    { src: '/work/nova/mobile-profile.jpg',           alt: 'Nova mobile profile and attendance' },
    { src: '/work/nova/mobile-messages.jpg',          alt: 'Nova mobile messages' },
    { src: '/work/nova/mobile-messages-2.jpg',        alt: 'Nova mobile messages thread' },
  ],
};

export const AJWADI_PROJECT: CaseStudyProject = {
  title: 'Ajwadi',
  category: 'End-to-End Collaboration & Project Management Platform',
  tagline: 'A production-ready platform that streamlines collaboration, project management, contracts, communication and financial operations through a unified web dashboard and mobile application.',
  year: '2025',
  link: 'https://ajwadi-front.vercel.app/',
  overview: [
    "Developed the frontend for Ajwadi, a production-ready platform that streamlines collaboration, project management, contracts, communication, and financial operations through a unified web dashboard and mobile application. Designed for real-world use, the platform provides organizations with complete visibility and control over daily operations while delivering a seamless experience for end users.",
    "The solution consists of a powerful administrative dashboard for platform management and a cross-platform mobile application that enables users to discover opportunities, collaborate on projects, manage contracts, communicate in real time, and handle financial transactions from anywhere.",
  ],
  modules: [
    { title: 'User & Identity', desc: 'User and identity management with verification workflows.' },
    { title: 'Projects & Contracts', desc: 'Project, proposal, and contract lifecycle management.' },
    { title: 'Communication', desc: 'Real-time messaging and notifications.' },
    { title: 'Finance', desc: 'Wallet, transactions, and financial operations.' },
    { title: 'Trust & Safety', desc: 'Reports, complaints, and trust & safety management.' },
    { title: 'Platform Administration', desc: 'Platform administration, analytics, and operational monitoring.' },
  ],
  features: [
    'Role-based authentication and authorization',
    'Centralized platform monitoring and analytics',
    'User onboarding and identity verification',
    'End-to-end project and proposal workflows',
    'Contract management and collaboration',
    'Real-time one-to-one communication powered by Socket.IO',
    'Secure file management and document sharing',
    'Integrated wallet with transaction and withdrawal tracking',
    'Push notifications and in-app alerts',
    'Responsive interfaces optimized for both web and mobile',
  ],
  techGroups: [
    { label: 'Web Dashboard',       items: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Axios', 'Socket.IO'] },
    { label: 'Mobile Application',  items: ['React Native (Expo)', 'TypeScript', 'React Navigation', 'Axios', 'Secure Storage', 'Socket.IO'] },
    { label: 'Backend Integration', items: ['Node.js', 'Express', 'Sequelize', 'PostgreSQL', 'Redis', 'JWT Authentication', 'AWS (S3, SNS, SQS)'] },
  ],
  architecture: "The platform follows a modular, scalable architecture where core business domains — including Authentication, Users, Projects, Contracts, Chat, Finance, and Platform Management — are separated into maintainable modules. This enables independent feature evolution while ensuring a cohesive and reliable user experience across both web and mobile applications.",
  impact: "Ajwadi demonstrates our team's ability to build large-scale, production-ready digital platforms that combine complex business workflows, real-time communication, secure authentication, and financial operations into a unified ecosystem. The project strengthened our expertise in developing scalable frontend architectures, integrating enterprise-grade backend services, and delivering intuitive user experiences across multiple platforms.",
  dashboardImages: [
    { src: '/work/ajwadi/dashboard-overview.png',   alt: 'Ajwadi admin dashboard overview' },
    { src: '/work/ajwadi/dashboard-complaints.png', alt: 'Ajwadi complaints and trust & safety panel' },
    { src: '/work/ajwadi/dashboard-detail.png',     alt: 'Ajwadi platform administration detail view' },
  ],
  mobileImages: [
    { src: '/work/ajwadi/mobile-home-client.png',   alt: 'Ajwadi mobile home screen for clients' },
    { src: '/work/ajwadi/mobile-home-provider.png', alt: 'Ajwadi mobile home screen for service providers' },
    { src: '/work/ajwadi/mobile-projects.png',      alt: 'Ajwadi mobile my projects screen' },
    { src: '/work/ajwadi/mobile-proposal.png',      alt: 'Ajwadi mobile proposal screen' },
    { src: '/work/ajwadi/mobile-contract.png',      alt: 'Ajwadi mobile official work contract screen' },
    { src: '/work/ajwadi/mobile-message.png',       alt: 'Ajwadi mobile messaging screen' },
  ],
};

export const ENACTIX_PROJECT: CaseStudyProject = {
  title: 'Enactix',
  category: 'Student Organization Management Platform',
  tagline: 'A comprehensive organization management platform that digitizes and streamlines operations for Enactus branches and student organizations — a web dashboard for leadership, alongside a cross-platform mobile app for members.',
  year: '2025',
  link: 'https://enactix.vercel.app/',
  overview: [
    "Developed Enactix, a comprehensive organization management platform designed to digitize and streamline operations for Enactus branches and student organizations. Originally built to solve operational challenges within Enactus Menoufia, the platform evolved into a scalable solution capable of supporting multiple chapters with role-based workflows, real-time collaboration, attendance management, and organizational analytics.",
    "The platform consists of a web dashboard for administrators and leadership teams, alongside a cross-platform mobile application that empowers members with day-to-day operational tools. Together, they create a connected ecosystem that centralizes communication, attendance, tasks, events, and organizational management.",
  ],
  modules: [
    { title: 'Organization & Chapters', desc: 'Organization and chapter management across multiple branches.' },
    { title: 'Roles & Permissions', desc: 'Multi-level role and permission management (RBAC).' },
    { title: 'Teams & Members', desc: 'Team, member, and leadership management.' },
    { title: 'Tasks & Events', desc: 'Task and event management, plus a QR-based attendance system.' },
    { title: 'Communication', desc: 'Real-time messaging and announcements.' },
    { title: 'Analytics & Media', desc: 'Activity logs, operational analytics, notifications, and media sharing.' },
  ],
  features: [
    'Multi-role dashboard supporting administrators, chapter leaders, team heads, and members',
    'Granular role-based access control (RBAC)',
    'Chapter, team, and member management',
    'Task assignment and event coordination',
    'Secure QR attendance with HMAC verification',
    'Offline attendance queue with automatic synchronization',
    'Real-time chat, group conversations, and online presence',
    'Voice messages, file sharing, and media attachments',
    'Push notifications and announcements',
    'Operational analytics and activity tracking',
    'Biometric authentication (Face ID & Fingerprint)',
    'Arabic & English multilingual support',
    'Cross-platform synchronization between web and mobile',
  ],
  techGroups: [
    { label: 'Web Dashboard',       items: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'TanStack Query', 'Zustand', 'Framer Motion', 'Socket.IO', 'Firebase'] },
    { label: 'Mobile Application',  items: ['React Native (Expo)', 'TypeScript', 'NativeWind', 'TanStack Query', 'Expo Router', 'AsyncStorage', 'Axios', 'Socket.IO', 'Firebase'] },
    { label: 'Backend Integration', items: ['Node.js', 'Express', 'PostgreSQL', 'Sequelize', 'AWS S3'] },
  ],
  architecture: "Enactix was designed as a scalable, modular platform that separates core organizational domains — including Members, Chapters, Teams, Attendance, Tasks, Events, Communication, and Administration — into maintainable modules. The web dashboard and mobile application share the same backend ecosystem, enabling real-time synchronization across devices while supporting offline-first workflows for environments with unreliable internet connectivity. A key technical challenge was designing a secure attendance system using HMAC-signed QR codes, combined with offline queueing, local persistence, automatic synchronization, and real-time updates. This ensured reliable attendance tracking during events even when network connectivity was unstable.",
  impact: "Enactix showcases our team's ability to design and build large-scale management platforms from the ground up, transforming real operational challenges into scalable digital solutions. The project strengthened our expertise in system architecture, role-based authorization, real-time communication, offline-first mobile experiences, cross-platform synchronization, and building software around real organizational workflows. It also reflects a product mindset — starting with a problem experienced firsthand and evolving it into a platform designed to serve student organizations at scale.",
  dashboardImages: [
    { src: '/work/enactix/dashboard-overview.jpg',   alt: 'Enactix dashboard overview with insights' },
    { src: '/work/enactix/dashboard-chapters.jpg',   alt: 'Enactix chapters management' },
    { src: '/work/enactix/dashboard-users.jpg',      alt: 'Enactix all users management' },
    { src: '/work/enactix/dashboard-payments.jpg',   alt: 'Enactix payments management' },
    { src: '/work/enactix/dashboard-attendance.jpg', alt: 'Enactix event QR attendance codes' },
  ],
  mobileImages: [
    { src: '/work/enactix/mobile-home.jpg',               alt: 'Enactix mobile member overview' },
    { src: '/work/enactix/mobile-tasks.jpg',              alt: 'Enactix mobile tasks screen' },
    { src: '/work/enactix/mobile-president-overview.jpg', alt: 'Enactix mobile president quick stats' },
    { src: '/work/enactix/mobile-chapter-overview.jpg',   alt: 'Enactix mobile chapter overview and analytics' },
    { src: '/work/enactix/mobile-chats.jpg',              alt: 'Enactix mobile chats screen' },
    { src: '/work/enactix/mobile-groups.jpg',              alt: 'Enactix mobile group messages screen' },
  ],
};

export const WEAVOLUTION_PROJECT: CaseStudyProject = {
  title: 'Weavolution',
  category: 'Sustainability & Circular Economy Platform',
  tagline: 'A modern marketing website for an Enactus sustainability initiative that transforms textile waste into high-value recycled products — showcasing mission, products, impact and partnership opportunities.',
  year: '2025',
  link: 'https://wevo-project-mu.vercel.app/',
  overview: [
    "Developed Weavolution, a modern marketing website for an Enactus sustainability initiative focused on transforming textile waste into high-value recycled products. The platform serves as the organization's digital presence, showcasing its mission, product portfolio, environmental impact, and partnership opportunities while helping raise awareness and attract potential collaborators, customers, and supporters.",
    "Designed with a responsive, component-based architecture, the website provides an engaging user experience through smooth animations, interactive product exploration, and impact-driven storytelling, allowing visitors to discover the initiative's recycled products and understand its social and environmental contributions.",
  ],
  modulesLabel: 'Core Sections',
  modules: [
    { title: 'Landing Page', desc: 'Landing page with mission and impact overview.' },
    { title: 'Product Catalog', desc: 'Product catalog with category filtering.' },
    { title: 'Product Showcase', desc: 'Individual product showcase pages.' },
    { title: 'Impact Section', desc: 'Environmental & social impact section.' },
    { title: 'Partnerships', desc: 'Partnership information and inquiry page.' },
    { title: 'Our Story', desc: "Organization story and mission." },
    { title: 'Contact & FAQs', desc: 'Contact page with FAQs and communication channels.' },
  ],
  features: [
    'Responsive multi-page experience built with React Router',
    'Interactive product catalog with client-side category filtering',
    'Dynamic product detail pages',
    'Animated impact statistics and performance counters',
    'Scroll-triggered animations using Framer Motion',
    'Responsive navigation with mobile menu',
    'SEO-friendly metadata and social sharing support',
    'Partnership and contact inquiry forms',
    'Reusable component-based UI architecture',
    'Optimized asset loading and code splitting for improved performance',
  ],
  techGroups: [
    { label: 'Stack', items: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router', 'Framer Motion', 'Lucide React'] },
  ],
  architecture: "The application follows a modular frontend architecture built around reusable layout and section components. Routing is handled with React Router, while shared UI elements such as the navigation bar, footer, hero section, impact section, and product showcase are composed into a cohesive user experience. Performance is optimized through Vite's code splitting and lightweight client-side rendering, making the website fast, maintainable, and easy to extend as the initiative grows.",
  impact: "Weavolution demonstrates our team's ability to build modern, responsive marketing platforms that effectively communicate a product's vision and impact through clean design and intuitive user experiences. The project strengthened our skills in component-driven frontend development, responsive design, animation, SEO optimization, and creating digital experiences that support real-world initiatives by increasing visibility, credibility, and engagement.",
  dashboardLabel: 'The Website',
  dashboardImages: [
    { src: '/work/weavolution/home-hero.png',            alt: 'Weavolution homepage hero section' },
    { src: '/work/weavolution/impact-overview.png',       alt: 'Weavolution impact overview and textile waste crisis' },
    { src: '/work/weavolution/environmental-impact.png',  alt: 'Weavolution environmental impact statistics' },
    { src: '/work/weavolution/product-detail.png',        alt: 'Weavolution product detail page for 3D printing filament' },
  ],
  mobileImages: [],
};

export const BUILD_ART_PROJECT: CaseStudyProject = {
  title: 'Build Art',
  category: 'Interior Design & Fit-Out Marketing Website',
  tagline: 'A modern marketing and lead-generation website for an interior design and fit-out company — showcasing services, process and client testimonials, and converting visitors into project inquiries.',
  year: '2025',
  link: 'https://build-art-kohl.vercel.app/',
  overview: [
    "Build Art is a marketing website for an interior design and fit-out company, designed to present the studio's services, design philosophy, process and social proof to prospective clients and funnel them toward a project inquiry. The target audience — new homeowners, villa owners, real estate investors, and clinic, office or retail owners — expects a polished, trustworthy first impression, so the site leans on smooth animation and clean visual storytelling to build that credibility from the first scroll.",
    "The experience is built around two routes: a rich single-page home experience covering services, process, design philosophy and testimonials, and a dedicated project-inquiry page for visitors ready to start a conversation.",
  ],
  modulesLabel: 'Core Sections',
  modules: [
    { title: 'Hero', desc: 'Headline, animated statistics counter and layered hero imagery.' },
    { title: 'Services', desc: 'Overview of interior design and fit-out service offerings.' },
    { title: 'Process', desc: 'A step-by-step explainer of how a project comes together.' },
    { title: 'Design Philosophy', desc: 'Accordion-style section covering the studio’s approach and FAQs.' },
    { title: 'Testimonials', desc: 'Client testimonials in a sliding carousel.' },
    { title: 'Project Inquiry', desc: 'A dedicated "Start Your Project" form plus newsletter signup.' },
  ],
  features: [
    'Two-route experience (home + dedicated project-inquiry page) with hash-anchor scroll navigation',
    'Fully responsive, mobile-first layout with fluid typography',
    'Animated mobile navigation menu with scroll lock',
    'Scroll-triggered section animations powered by a centralized Framer Motion variant system',
    'Animated statistics counter on the hero section',
    'Custom accordion component for design philosophy and FAQs',
    'Hand-built infinite-loop testimonial carousel with responsive card counts',
    'Project inquiry and newsletter signup forms',
    'Custom hand-authored SVG icon set alongside Lucide icons',
    'Performance-tuned asset loading and dependency bundling',
  ],
  techGroups: [
    { label: 'Stack', items: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'React Router', 'Framer Motion', 'Lucide React'] },
  ],
  architecture: "Build Art follows a simple page-composition architecture: two routes — Home and a dedicated project-inquiry page — each assemble a stack of self-contained section components (Navbar, Hero, Services, Process, Testimonials, CTA, Newsletter and Footer). A centralized Framer Motion variant system (fadeInUp, staggerContainer, slideInLeft/Right, scaleIn) is shared across every section, giving the site a coherent motion language without duplicating animation logic in each component. The architecture is intentionally lightweight for a static marketing site, and built to extend cleanly if the project-inquiry and newsletter forms are wired to a backend down the line.",
  impact: "Build Art showcases our team's craft in front-end animation and interaction design — from a hand-built infinite-loop testimonial carousel to a centralized motion system that gives every section a coherent, professional feel. The project reinforced our approach to building fast, polished marketing sites that turn visitor attention into qualified leads.",
  dashboardLabel: 'The Website',
  dashboardImages: [
    { src: '/work/build-art/hero.png',               alt: 'Build Art homepage hero section' },
    { src: '/work/build-art/design-philosophy.png',  alt: 'Build Art design philosophy accordion section' },
    { src: '/work/build-art/process-steps.png',      alt: 'Build Art three-step process section' },
    { src: '/work/build-art/testimonials.png',       alt: 'Build Art client testimonials carousel' },
  ],
  mobileImages: [],
};

export const STEPS = [
  { n: '01', title: 'Discover', desc: 'We study your business, customers and operations to define measurable objectives.' },
  { n: '02', title: 'Design',   desc: 'We craft intuitive user experiences built around real goals, not templates.' },
  { n: '03', title: 'Build',    desc: 'We engineer scalable systems using modern technologies, in tight, visible loops.' },
  { n: '04', title: 'Optimize', desc: 'We continuously improve for performance, security and long-term success.' },
];

export const QUOTES = [
  { q: "Auric rebuilt our entire analytics stack in a way that finally matched how we actually work. Decisions that took a week now take an afternoon.", name: 'Mara Reyes',  co: 'CMO, Meridian Analytics', init: 'MR' },
  { q: "Most vendors sell software. Auric sold us an outcome — and then engineered a system that delivered it, on time. Easiest technology partner we've had.", name: 'Devon Kane', co: 'Founder, Vantage Portal', init: 'DK' },
];

export const STATS_BAR = [
  { target: 8,  suffix: '',  label: 'Products Delivered' },
  { target: 3,  suffix: '',  label: 'Businesses Partnered' },
  { target: 98, suffix: '%', label: 'Client Retention' },
  { target: 6,  suffix: '',  label: 'Years Building Advantage' },
];

// ─── Team page ───────────────────────────────────────────────────────────────

export interface TeamMember {
  id: string; name: string; role: string; lvl: string; bio: string;
  links: { label: string; href: string }[];
}

export const FOUNDERS: TeamMember[] = [
  { id: 'm-ari',  name: 'Ari Nakamura', role: 'Founder / CEO',              lvl: 'FOUNDER', bio: 'Started Auric to prove technology could be a genuine competitive advantage, not just an expense. Leads company vision.', links: [{ label: 'Email', href: '#' }, { label: 'LinkedIn', href: '#' }] },
  { id: 'm-rae',  name: 'Rae Okafor',   role: 'Partner / Head of Product',  lvl: 'PARTNER', bio: 'Turns business goals into clear product strategy. Keeps every engagement outcome-driven.',                             links: [{ label: 'Email', href: '#' }, { label: 'LinkedIn', href: '#' }] },
  { id: 'm-kit',  name: 'Kit Vasquez',  role: 'Partner / Head of Engineering', lvl: 'PARTNER', bio: 'Builds the systems that ship and scale. Believes fast, secure software is a feature, not a luxury.',                links: [{ label: 'Email', href: '#' }, { label: 'GitHub',   href: '#' }] },
  { id: 'm-juno', name: 'Juno Park',    role: 'Partner / Head of Delivery', lvl: 'PARTNER', bio: 'Runs the engagements end to end. The reason deadlines feel calm instead of chaotic.',                                   links: [{ label: 'Email', href: '#' }, { label: 'LinkedIn', href: '#' }] },
];

export const PLAYERS: TeamMember[] = [
  { id: 'm-sol',   name: 'Sol Bergström',  role: 'Product Designer',        lvl: 'DESIGN',      bio: 'Designs interfaces people trust on first use. Obsesses over the small details.',        links: [{ label: 'Dribbble',  href: '#' }] },
  { id: 'm-mira',  name: 'Mira Haddad',    role: 'AI / ML Engineer',        lvl: 'AI',          bio: 'Builds the models and pipelines behind our AI-powered solutions.',                        links: [{ label: 'GitHub',    href: '#' }] },
  { id: 'm-theo',  name: 'Theo Lindqvist', role: 'Front-End Engineer',      lvl: 'ENGINEERING', bio: 'Ships clean, fast interfaces and obsesses over load times.',                              links: [{ label: 'GitHub',    href: '#' }] },
  { id: 'm-nadia', name: 'Nadia Cruz',     role: 'Backend Engineer',        lvl: 'ENGINEERING', bio: 'Designs the APIs and infrastructure that everything else depends on.',                    links: [{ label: 'GitHub',    href: '#' }] },
  { id: 'm-bo',    name: 'Bo Tanaka',      role: 'UX Researcher',           lvl: 'PRODUCT',     bio: 'Grounds every decision in how customers actually use the product.',                       links: [{ label: 'LinkedIn',  href: '#' }] },
  { id: 'm-lena',  name: 'Lena Moreau',    role: 'Solutions Architect',     lvl: 'ENGINEERING', bio: 'Designs the systems and integrations that let clients scale without rebuilding.',         links: [{ label: 'LinkedIn',  href: '#' }] },
  { id: 'm-omar',  name: 'Omar Reyes',     role: 'Digital Strategist',      lvl: 'STRATEGY',    bio: 'Connects business goals to the right technology roadmap.',                                links: [{ label: 'LinkedIn',  href: '#' }] },
  { id: 'm-yuki',  name: 'Yuki Sato',      role: 'Delivery Manager',        lvl: 'DELIVERY',    bio: 'Keeps every engagement on-track, on-budget and on-message.',                              links: [{ label: 'Email',     href: '#' }] },
];

export const CULTURE_VALUES = [
  { glyph: '◈', title: 'Craftsmanship', body: 'Every detail matters. Quality is never accidental.' },
  { glyph: '✦', title: 'Innovation',    body: 'We embrace emerging technologies to solve real business challenges.' },
  { glyph: '◎', title: 'Partnership',   body: "Our clients' success defines our success." },
  { glyph: '▣', title: 'Integrity',     body: 'Honest communication, transparency and accountability guide every project.' },
  { glyph: '►', title: 'Excellence',    body: 'We hold ourselves to the highest standards in everything we create.' },
  { glyph: '◆', title: 'Impact',        body: 'Every product should create measurable value.' },
];

export const TEAM_STATS = [
  { target: 12, symbol: null, label: 'Team Members' },
  { target: 4,  symbol: null, label: 'Time Zones' },
  { target: 6,  symbol: null, label: 'Years Together' },
  { target: 0,  symbol: '∞',  label: 'Cups Of Coffee' },
];
