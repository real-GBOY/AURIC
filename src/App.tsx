import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRight,
  BarChart3,
  Megaphone,
  Target,
  Users,
  Zap,
  CheckCircle2,
} from "lucide-react";

function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-slate-950" />
            </div>
            <span className="text-xl font-semibold tracking-tight">
              GrowthKit
            </span>
          </motion.div>
          <div className="hidden md:flex items-center gap-8">
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#work">Work</NavLink>
            <NavLink href="#about">About</NavLink>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#10b981" }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 bg-emerald-500 text-slate-950 font-medium rounded-lg transition-colors"
            >
              Get Started
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-6 pt-20"
      >
        {/* Background gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 rounded-full blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
            className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/20 to-emerald-500/20 rounded-full blur-3xl"
          />
        </div>

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-10 max-w-5xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700/50 rounded-full text-sm text-slate-300 mb-8"
          >
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            Trusted by 300+ brands worldwide
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          >
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
              Your Growth,
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Amplified
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            A data-driven marketing agency helping startups become industry
            leaders. We blend strategy, creativity, and technology to deliver
            measurable results.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-semibold rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-500/25"
            >
              Start Your Growth Journey
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(30, 41, 59, 1)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-slate-800/50 border border-slate-700 font-medium rounded-xl"
            >
              View Case Studies
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <Stat value="300+" label="Clients Served" delay={1.1} />
            <Stat value="$2.5B+" label="Revenue Generated" delay={1.2} />
            <Stat value="40%" label="Avg. Growth Rate" delay={1.3} />
            <Stat value="98%" label="Client Retention" delay={1.4} />
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center pt-2"
          >
            <motion.div className="w-1 h-2 bg-slate-500 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <span className="text-emerald-400 font-medium tracking-wider uppercase text-sm mb-4 block">
              What We Do
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Growth-Focused Services
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Every strategy we create is designed with one goal in mind:
              accelerating your business growth.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              icon={<Megaphone className="w-7 h-7" />}
              title="Digital Advertising"
              description="Multi-channel campaigns across Meta, Google, TikTok, and LinkedIn. We optimize for ROI, not just reach."
              features={["Paid Social", "Search PPC", "Retargeting", "Analytics"]}
              delay={0.1}
            />
            <ServiceCard
              icon={<BarChart3 className="w-7 h-7" />}
              title="Growth Strategy"
              description="Data-driven roadmaps that identify your highest-leverage opportunities and fastest paths to scale."
              features={["Market Analysis", "Competitive Intel", "Funnel Design", "KPI Tracking"]}
              delay={0.2}
            />
            <ServiceCard
              icon={<Target className="w-7 h-7" />}
              title="Conversion Optimization"
              description="Turn more visitors into customers through landing pages, UX improvements, and A/B testing."
              features={["Landing Pages", "User Research", "A/B Testing", "Personalization"]}
              delay={0.3}
            />
            <ServiceCard
              icon={<Users className="w-7 h-7" />}
              title="Brand Development"
              description="Build a brand that resonates. From positioning to visual identity to messaging frameworks."
              features={["Positioning", "Visual Identity", "Voice & Tone", "Guidelines"]}
              delay={0.4}
            />
            <ServiceCard
              icon={<Zap className="w-7 h-7" />}
              title="Marketing Automation"
              description="Scale your marketing without scaling your team. Email sequences, workflows, and integrations."
              features={["Email Sequences", "CRM Setup", "Workflows", "Lead Scoring"]}
              delay={0.5}
              className="md:col-span-2 lg:col-span-1"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-emerald-700 to-slate-900" />

            {/* Animated pattern overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_1px)] bg-[length:40px_40px]" />
            </div>

            {/* Glow effects */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-400 rounded-full blur-3xl"
            />

            <div className="relative z-10 p-12 md:p-16 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl md:text-5xl font-bold mb-6"
              >
                Ready to Accelerate Your Growth?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-emerald-100 text-lg mb-10 max-w-xl mx-auto"
              >
                Join 300+ companies that have transformed their marketing with
                GrowthKit. Let's discuss how we can help you reach your goals.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 bg-white text-emerald-700 font-semibold rounded-xl flex items-center gap-2 shadow-xl"
                >
                  Schedule a Call
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/10 backdrop-blur border border-white/20 font-medium rounded-xl"
                >
                  View Pricing
                </motion.button>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-emerald-200"
              >
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Free strategy session
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  No long-term contracts
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Results in 30 days
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-slate-950" />
            </div>
            <span className="font-semibold">GrowthKit</span>
          </div>
          <p className="text-slate-500 text-sm">
            © 2024 GrowthKit. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      whileHover={{ color: "#10b981" }}
      className="text-slate-400 hover:text-emerald-400 transition-colors"
    >
      {children}
    </motion.a>
  );
}

function Stat({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
        {value}
      </div>
      <div className="text-slate-500 text-sm mt-1">{label}</div>
    </motion.div>
  );
}

function ServiceCard({
  icon,
  title,
  description,
  features,
  delay,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  delay: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className={`group relative bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-emerald-500/50 transition-colors ${className || ""}`}
    >
      {/* Gradient hover effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10">
        <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center text-slate-950 mb-6 group-hover:scale-110 transition-transform">
          {icon}
        </div>

        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-slate-400 mb-6 leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-2">
          {features.map((feature) => (
            <span
              key={feature}
              className="text-xs px-3 py-1.5 bg-slate-800/80 text-slate-300 rounded-full border border-slate-700/50"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default App;
