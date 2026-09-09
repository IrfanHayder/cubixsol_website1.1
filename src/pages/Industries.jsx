import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Layers,
  Cpu,
  CheckCircle2,
  Plus,
  Minus,
  HelpCircle,
  Sparkles,
  Building2,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';
import DynamicIcon from '../components/DynamicIcon';
import { apiFetch } from '../utils/api';
import { formatInline, FormatRichText } from '../utils/formatText';

const defaultPageData = {
  heroEyebrow: 'Where we deliver',
  heroTitle: 'Industry-Specific Software Development Services',
  heroDesc:
    'Cubixsol provides **industry software development services** to address the operational demands, customer expectations, and technical requirements of your market. We understand your domain and combine that knowledge with product strategy, design, engineering, and system integration to build powerful software that achieves your business goals.',
  heroButtonText: 'Discuss Your Project',
  heroButtonLink: '/contact',
  heroBadges: [
    'Domain-Aware Engineering',
    'Regulated Compliance (HIPAA, PCI DSS)',
    'Modern Scalable Architecture',
    'Custom Third-Party Integrations',
  ],

  builtAroundEyebrow: 'Tailored Solutions',
  builtAroundTitle: 'Software Built Around Your Industry',
  builtAroundDesc:
    'Every industry faces distinct challenges, which is why we develop industry-specific software to address them. We develop each product based on the industry’s users, processes, integrations, security risks, and regulatory requirements. Our specialists deliver industry-focused software solutions across eight key verticals to modernize outdated systems, improve customer experiences, and support future growth.',
  builtAroundPoints: [
    {
      title: 'User & Workflow Centric',
      desc: 'Tailored to the specific daily operating workflows of your teams and end users.',
    },
    {
      title: 'Security & Regulatory Compliance',
      desc: 'Built-in protection adhering to HIPAA, PCI DSS, SOC 2, and data privacy regulations.',
    },
    {
      title: 'API & Legacy System Integration',
      desc: 'Interoperable connections with CRM, ERP, payment gateways, and core platforms.',
    },
    {
      title: 'Scalable Cloud Architecture',
      desc: 'Engineered for high traffic volume, fault tolerance, and zero-downtime operations.',
    },
  ],

  industriesSectionEyebrow: 'Industries We Serve',
  industriesSectionTitle: 'Industries We Serve',
  industriesSectionIntro:
    'Our teams combine technical expertise with practical industry knowledge. From regulated healthcare platforms to high-traffic ecommerce stores, we build reliable digital products around the way each business operates.',

  domainExpertiseEyebrow: 'Strategic Advantage',
  domainExpertiseTitle: 'Why Domain Expertise Matters',
  domainExpertiseParagraphs: [
    'Software development decisions carry different consequences in every industry. A healthcare platform must protect sensitive patient information, while a fintech product must secure financial transactions. E-commerce and travel platforms must process heavy traffic without disrupting the customer journey.',
    'We consider industry-specific requirements from the beginning. We assess user roles, business workflows, system dependencies, data security, and relevant standards such as HIPAA and PCI DSS where applicable. Our approach reduces avoidable rework, supports faster decision-making, and produces software suited to real operating conditions rather than generic assumptions.',
  ],
  domainExpertisePillars: [
    {
      title: 'Context-Driven Architecture',
      desc: 'Technical decisions tailored to actual industry constraints and user requirements.',
    },
    {
      title: 'Security & Compliance from Day 1',
      desc: 'Built with strict industry standards such as HIPAA, PCI DSS, and data privacy laws.',
    },
    {
      title: 'Zero Rework & Fast Delivery',
      desc: 'Clear understanding of industry workflows prevents costly revisions and speeds rollout.',
    },
  ],

  ctaEyebrow: "Let's Collaborate",
  ctaTitle: 'Let’s Build Something Amazing Together',
  ctaDesc:
    'Turn your industry knowledge into a digital product that works for your customers and operations. Partner with Cubixsol to plan, design, develop, and scale software built around your market.',
  ctaButtonText: 'Start Your Project',
  ctaButtonLink: '/contact',

  faqEyebrow: 'FAQ',
  faqTitle: 'Frequently Asked Questions',
  faqIntro:
    'Explore answers to key questions about our industry-specific software development capabilities.',
  faqs: [
    {
      q: 'Does Cubixsol have experience with industry-specific software?',
      a: "Yes. We build software for healthcare, SaaS, fintech, logistics, real estate, education, ecommerce, and travel businesses. We design the development process around each industry's users, workflows, and technical requirements.",
    },
    {
      q: 'Can you integrate the software with our existing systems?',
      a: 'Yes. We can connect your product with CRM, ERP, payment, accounting, analytics, inventory, communication, and other third-party platforms through available APIs or custom integrations.',
    },
    {
      q: 'Can we review relevant project examples?',
      a: 'Yes. Share your industry and project requirements with our team. We will present the most relevant work, capabilities, or technical approach based on your product goals and confidentiality restrictions.',
    },
  ],
};

export default function Industries() {
  const [pageData, setPageData] = useState(defaultPageData);
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    let cancelled = false;

    // Load both page content and industries collection
    Promise.all([
      apiFetch('pages/industries').catch(() => defaultPageData),
      apiFetch('industries').catch(() => []),
    ])
      .then(([pageRes, indRes]) => {
        if (!cancelled) {
          if (pageRes && pageRes.slug) {
            setPageData((prev) => ({
              ...prev,
              ...pageRes,
              heroBadges: Array.isArray(pageRes.heroBadges) ? pageRes.heroBadges : prev.heroBadges,
              builtAroundPoints: Array.isArray(pageRes.builtAroundPoints)
                ? pageRes.builtAroundPoints
                : prev.builtAroundPoints,
              domainExpertiseParagraphs: Array.isArray(pageRes.domainExpertiseParagraphs)
                ? pageRes.domainExpertiseParagraphs
                : prev.domainExpertiseParagraphs,
              domainExpertisePillars: Array.isArray(pageRes.domainExpertisePillars)
                ? pageRes.domainExpertisePillars
                : prev.domainExpertisePillars,
              faqs: Array.isArray(pageRes.faqs) && pageRes.faqs.length > 0 ? pageRes.faqs : prev.faqs,
            }));
          }
          if (Array.isArray(indRes) && indRes.length > 0) {
            setIndustries(indRes);
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Error fetching industries data:', err);
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const getIndustryLinkText = (title) => {
    return `Explore Our ${title} Software Development Services`;
  };

  return (
    <div className="bg-white overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-gradient-to-b from-primary-50/40 via-white to-white py-16 sm:py-20 lg:py-24">
        {/* Subtle Ambient Background */}
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-primary-100/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-cyan-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100/80 text-[#00a4d8] text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
                <Sparkles size={13} className="text-[#00a4d8]" />
                <span>{pageData.heroEyebrow || 'Where we deliver'}</span>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight leading-[1.15] mb-6">
                {pageData.heroTitle || 'Industry-Specific Software Development Services'}
              </h1>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed mb-8">
                {formatInline(
                  pageData.heroDesc ||
                    'Cubixsol provides industry software development services to address the operational demands, customer expectations, and technical requirements of your market. We understand your domain and combine that knowledge with product strategy, design, engineering, and system integration to build powerful software that achieves your business goals.',
                  { strongClass: 'font-bold text-ink' }
                )}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <Link
                  to={pageData.heroButtonLink || '/contact'}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-primary-gradient text-white font-bold text-sm sm:text-base shadow-soft hover:shadow-elev hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <span>{pageData.heroButtonText || 'Discuss Your Project'}</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="#industries-grid"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white border border-gray-200 text-sm sm:text-base font-semibold text-ink hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
                >
                  View Verticals <ChevronRight size={16} className="text-gray-400" />
                </a>
              </div>
            </Reveal>

            {/* Hero Badges */}
            {Array.isArray(pageData.heroBadges) && pageData.heroBadges.length > 0 && (
              <Reveal delay={0.2}>
                <div className="flex flex-wrap gap-2.5 pt-4 border-t border-gray-100">
                  {pageData.heroBadges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gray-50 border border-gray-200/70 text-xs font-semibold text-gray-700"
                    >
                      <CheckCircle2 size={13} className="text-[#00a4d8]" />
                      {badge}
                    </span>
                  ))}
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* 2. SOFTWARE BUILT AROUND YOUR INDUSTRY */}
      <section className="py-14 sm:py-18 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-ink to-slate-950 text-white p-8 sm:p-12 lg:p-14 overflow-hidden shadow-2xl border border-white/10">
          {/* Subtle Accent Glow */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-primary-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4">
                <Layers size={13} />
                <span>{pageData.builtAroundEyebrow || 'Tailored Solutions'}</span>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug mb-5">
                {pageData.builtAroundTitle || 'Software Built Around Your Industry'}
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
                {formatInline(
                  pageData.builtAroundDesc ||
                    'Every industry faces distinct challenges, which is why we develop industry-specific software to address them. We develop each product based on the industry’s users, processes, integrations, security risks, and regulatory requirements. Our specialists deliver industry-focused software solutions across eight key verticals to modernize outdated systems, improve customer experiences, and support future growth.',
                  { strongClass: 'font-bold text-white' }
                )}
              </p>
            </Reveal>

            {/* Value Points Grid */}
            {Array.isArray(pageData.builtAroundPoints) && pageData.builtAroundPoints.length > 0 && (
              <Reveal delay={0.15}>
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 pt-4">
                  {pageData.builtAroundPoints.map((pt, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-cyan-400/30 transition-all duration-200"
                    >
                      <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5 border border-cyan-400/30">
                        <CheckCircle2 size={16} />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-white mb-1">
                          {pt.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                          {pt.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* 3. INDUSTRIES WE SERVE GRID (8 VERTICAL CARDS) */}
      <section id="industries-grid" className="py-12 lg:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-[#00a4d8] text-xs font-bold uppercase tracking-wider mb-3">
            <Building2 size={13} />
            <span>{pageData.industriesSectionEyebrow || 'Industries We Serve'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-4">
            {pageData.industriesSectionTitle || 'Industries We Serve'}
          </h2>
          <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
            {pageData.industriesSectionIntro ||
              'Our teams combine technical expertise with practical industry knowledge. From regulated healthcare platforms to high-traffic ecommerce stores, we build reliable digital products around the way each business operates.'}
          </p>
        </Reveal>

        {loading ? (
          <div className="text-center py-20 text-gray-400 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-primary-500 border-t-transparent animate-spin" />
            <span className="text-sm font-medium">Loading industries...</span>
          </div>
        ) : industries.length === 0 ? (
          <div className="text-center py-16 text-gray-400 bg-gray-50 rounded-2xl border border-gray-100">
            No industries found.
          </div>
        ) : (
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7" staggerDelay={0.05}>
            {industries.map((ind) => {
              const linkText = getIndustryLinkText(ind.title);
              return (
                <StaggerItem key={ind.slug} hover>
                  <Link
                    to={`/industries/${ind.slug}`}
                    className="group relative flex flex-col h-full rounded-3xl border border-gray-100/90 bg-white p-6 sm:p-7 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_22px_45px_-12px_rgba(0,164,216,0.18)] hover:border-cyan-200 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden justify-between"
                  >
                    <div>
                      {/* Icon container with brand cyan-blue gradient */}
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-50/80 border border-cyan-100/90 flex items-center justify-center mb-5 group-hover:bg-gradient-to-br group-hover:from-[#00a4d8] group-hover:via-[#0284c7] group-hover:to-[#0369a1] group-hover:border-transparent group-hover:shadow-xl group-hover:shadow-[#00a4d8]/35 group-hover:ring-4 group-hover:ring-cyan-100/70 group-hover:scale-110 group-hover:-translate-y-1 group-hover:rotate-2 transition-all duration-300 ease-out shrink-0 overflow-hidden">
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        <DynamicIcon
                          icon={ind.icon}
                          title={ind.title}
                          className="w-8 h-8 sm:w-9 sm:h-9 object-contain text-[#00a4d8] group-hover:text-white transition-all duration-300 ease-out group-hover:scale-115 group-hover:-rotate-2 group-hover:brightness-0 group-hover:invert group-hover:drop-shadow-[0_2px_8px_rgba(255,255,255,0.8)]"
                        />
                      </div>

                      <h3 className="text-xl sm:text-2xl font-extrabold text-ink mb-2.5 group-hover:text-[#00a4d8] transition-colors duration-300">
                        {ind.title}
                      </h3>

                      <p className="text-sm text-gray-600 leading-relaxed mb-6">
                        {formatInline(ind.desc || ind.short, {
                          strongClass: 'font-bold text-ink',
                        })}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#00a4d8] group-hover:text-[#0284c7] group-hover:gap-2 transition-all">
                        {linkText} <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                      <span className="w-2 h-2 rounded-full bg-cyan-200 group-hover:bg-[#00a4d8] transition-colors shrink-0" />
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        )}
      </section>

      {/* 4. WHY DOMAIN EXPERTISE MATTERS */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-gray-50/70 via-white to-gray-50/40 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Title & Paragraphs */}
            <div className="lg:col-span-7 space-y-6">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-100/80 text-[#00a4d8] text-xs font-bold uppercase tracking-wider mb-2">
                  <ShieldCheck size={13} />
                  <span>{pageData.domainExpertiseEyebrow || 'Strategic Advantage'}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight leading-snug">
                  {pageData.domainExpertiseTitle || 'Why Domain Expertise Matters'}
                </h2>
              </Reveal>

              <div className="space-y-4 text-gray-600 text-base sm:text-lg leading-relaxed">
                {(pageData.domainExpertiseParagraphs || []).map((pText, idx) => (
                  <Reveal key={idx} delay={0.05 * (idx + 1)}>
                    <p>{formatInline(pText, { strongClass: 'font-bold text-ink' })}</p>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Right Column: Strategic Pillars */}
            <div className="lg:col-span-5 space-y-4">
              <Reveal delay={0.1}>
                <h3 className="text-xs font-bold text-ink/70 uppercase tracking-wider mb-3">
                  Our Engineering Commitments
                </h3>
              </Reveal>

              <div className="space-y-3.5">
                {(pageData.domainExpertisePillars || []).map((pillar, idx) => (
                  <Reveal key={idx} delay={0.1 + idx * 0.05}>
                    <div className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-cyan-200 transition-all duration-200 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-50 to-cyan-100/80 text-[#00a4d8] flex items-center justify-center font-extrabold text-sm shrink-0 mt-0.5 border border-cyan-200/60">
                        0{idx + 1}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-ink mb-1">{pillar.title}</h4>
                        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LET'S BUILD SOMETHING AMAZING TOGETHER (CTA BANNER) */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-primary-600 via-indigo-600 to-cyan-600 text-white p-8 sm:p-12 lg:p-16 text-center overflow-hidden shadow-xl">
          {/* Subtle Decorative Backdrop Elements */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-80 h-80 bg-cyan-300/15 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <Reveal>
              <span className="inline-block text-xs font-extrabold tracking-widest text-cyan-200 uppercase mb-3">
                {pageData.ctaEyebrow || "Let's Collaborate"}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-4 text-white">
                {pageData.ctaTitle || 'Let’s Build Something Amazing Together'}
              </h2>
              <p className="text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed mb-8">
                {pageData.ctaDesc ||
                  'Turn your industry knowledge into a digital product that works for your customers and operations. Partner with Cubixsol to plan, design, develop, and scale software built around your market.'}
              </p>
              <Link
                to={pageData.ctaButtonLink || '/contact'}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-ink font-bold text-sm sm:text-base shadow-elev hover:bg-gray-50 hover:scale-105 transition-all duration-300 group"
              >
                <span>{pageData.ctaButtonText || 'Start Your Project'}</span>
                <ArrowRight size={18} className="text-[#00a4d8] group-hover:translate-x-1 transition-transform" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 6. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-14 sm:py-18 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 text-[#00a4d8] text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle size={13} />
            <span>{pageData.faqEyebrow || 'FAQ'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-3">
            {pageData.faqTitle || 'Frequently Asked Questions'}
          </h2>
          {pageData.faqIntro && (
            <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
              {pageData.faqIntro}
            </p>
          )}
        </Reveal>

        <div className="space-y-4">
          {(pageData.faqs || []).map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <Reveal key={idx} delay={idx * 0.04}>
                <div
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'border-[#00a4d8]/40 bg-white shadow-md'
                      : 'border-gray-100 bg-white hover:border-gray-200'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 select-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-base sm:text-lg text-ink leading-snug">
                      {faq.q}
                    </span>
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? 'bg-[#00a4d8] text-white'
                          : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                      }`}
                    >
                      {isOpen ? <Minus size={15} /> : <Plus size={15} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-50 animate-in fade-in duration-200">
                      {formatInline(faq.a, { strongClass: 'font-bold text-ink' })}
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
