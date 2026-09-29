import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  Layers,
  Users,
  Users2,
  UserPlus,
  Building2,
  HelpCircle,
  Clock,
  Zap,
  Briefcase,
  Rocket,
  Award,
  Globe2,
  Code2,
  GraduationCap,
  Plane,
  HeartPulse,
  DollarSign,
  ShoppingBag,
  Cloud,
  Star,
  Cpu,
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import CtaBanner from '../components/CtaBanner';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';
import DynamicIcon from '../components/DynamicIcon';
import { useServices } from '../context/ServicesContext';
import { useEstimateModal } from '../context/EstimateModalContext';
import { formatInline, FormatRichText } from '../utils/formatText';
import { apiFetch } from '../utils/api';
import { useSEO } from '../utils/seo';

const cleanTitle = (str) =>
  !str || typeof str !== 'string'
    ? str
    : str.replace(/[:*\s]+$/, '').replace(/^[:*\s]+/, '').trim();

// Curated concise descriptions for a clean, uniform, and balanced 2-3 line card layout
const SERVICE_SHORT_DESCS = {
  'ghl-automation':
    'Scale operations with custom GoHighLevel snapshots, pipeline automations, and multi-channel triggers.',
  'hubspot-crm':
    'Full HubSpot CRM architecture, custom deal pipelines, lifecycle stages, and automated lead routing.',
  'ai-workflows':
    'Transform manual operations into intelligent workflows using modern LLMs, automated agents, and document processing.',
  'ai-chatbots':
    'Custom AI chatbots trained on your business knowledge base for 24/7 support and lead qualification.',
  'email-lead-nurture':
    'Turn prospects into loyal customers with automated drip sequences, behavioral triggers, and high deliverability.',
  'shopify-development':
    'Build and scale high-converting Shopify and Shopify Plus e-commerce stores tailored to your brand.',
  'pms-integration':
    'Connect Property Management Systems with direct booking websites, OTAs, channel managers, and payment gateways.',
  'custom-web-development':
    'Fast, secure, and responsive web platforms and applications engineered with modern frameworks for scale.',
  'mobile-app-development':
    'Intuitive native and cross-platform applications for iOS and Android with high-performance backends.',
  'ai-development':
    'Practical AI applications, predictive models, and custom LLM integrations that automate complex workflows.',
  'cloud-solutions':
    'Cloud architecture, AWS infrastructure, Kubernetes, DevOps automation, and 24/7 reliability management.',
  'ui-ux-design':
    'User-centered interface design, UX research, wireframes, and interactive prototypes crafted for conversion.',
  'ecommerce-solutions':
    'Custom digital storefronts, marketplace integrations, and secure multi-currency payment checkout systems.',
  'laravel-development':
    'High-performance Laravel web applications, REST APIs, and backend architectures built for speed and security.',
  'ios-app-development':
    'High-performing native iOS applications built with Swift and SwiftUI for the Apple ecosystem.',
  'android-development':
    'Native Android applications engineered with Kotlin for scalability, reliability, and business growth.',
  'api-development':
    'Scalable REST and GraphQL APIs, third-party software integrations, and microservices architecture.',
  'devops-engineering':
    'CI/CD pipeline automation, Docker containerization, cloud monitoring, and zero-downtime deployments.',
  'qa-testing':
    'Comprehensive automated and manual software testing, security audits, and cross-browser QA validation.',
  'data-migration-services':
    'Zero-downtime database migration, legacy system modernization, and secure cloud data transfer.',
};

const getCleanDesc = (s) => {
  if (s?.slug && SERVICE_SHORT_DESCS[s.slug]) {
    return SERVICE_SHORT_DESCS[s.slug];
  }
  if (!s?.desc) return '';
  const raw = String(s.desc).trim();
  if (raw.length > 160) {
    const firstPeriod = raw.indexOf('.');
    if (firstPeriod > 40 && firstPeriod < 150) {
      return raw.slice(0, firstPeriod + 1);
    }
    return raw.slice(0, 140).trim() + '...';
  }
  return raw;
};

const defaultPageData = {
  heroEyebrow: 'Our Services',
  heroTitle: 'Powerful digital solutions that drive real results',
  heroDesc:
    'Strategy, design, engineering, and cloud growth — under one roof. Pick a service to see how we deliver, or tell us your goal and we will map the right path.',
  heroButtonText: 'Get a Free Project Consultation',
  heroButtonLink: '/contact#contact-form',
  heroBadges: ['Modern Tech Stack', 'Scalable & Secure', 'Transparent Sprint Delivery'],

  processEyebrow: 'Our Process',
  processTitle: 'Our Proven Development Process',
  processIntro: 'A structured, agile sprint workflow designed to take your product from concept to launch with total clarity.',
  processSteps: [
    {
      step: '01',
      title: 'Discover',
      desc: 'We clarify your business goals, target audience, technical constraints, and key success metrics.',
      icon: '/uploads/media-1790257307933-564950446.svg',
    },
    {
      step: '02',
      title: 'Plan',
      desc: 'Our architects define system scope, technology stack, sprint priorities, and delivery milestones.',
      icon: '/uploads/media-1790257307933-360229398.svg',
    },
    {
      step: '03',
      title: 'Design & Develop',
      desc: 'Designers craft intuitive UX while engineers write clean, modular, and well-tested code.',
      icon: '/uploads/media-1790257307933-25615094.svg',
    },
    {
      step: '04',
      title: 'Test & Launch',
      desc: 'Rigorous automated testing, security audits, and performance checks before controlled deployment.',
      icon: '/uploads/media-1790257307934-884499517.svg',
    },
    {
      step: '05',
      title: 'Support & Scale',
      desc: 'Post-launch monitoring, proactive updates, SLA guarantees, and continuous feature enhancements.',
      icon: '/uploads/media-1790257307933-424705272.svg',
    },
  ],

  whyChooseEyebrow: 'Why Choose Us',
  whyChooseTitle: 'Why Businesses Choose Cubixsol',
  whyChooseIntro:
    'Businesses **outsource custom software development services** to us when they need specialized engineering expertise without the overhead of hiring in-house. You get clear scope, predictable sprints, visible progress, and long-term technical support.',
  whyChooseItems: [
    {
      title: 'Business-First Planning',
      desc: 'We align architectural decisions directly with your business ROI, operational efficiency, and revenue goals.',
      icon: '/uploads/media-1789629897582-729673598.svg',
    },
    {
      title: 'Cross-Functional Expertise',
      desc: 'Full-stack engineers, cloud architects, UI/UX designers, and QA specialists collaborate across every sprint.',
      icon: '/uploads/media-1789629897944-669462569.svg',
    },
    {
      title: 'Enterprise Scalability',
      desc: 'Modular, microservice-ready architectures designed to handle millions of requests with high uptime and security.',
      icon: '/uploads/media-1789629898314-560238011.svg',
    },
    {
      title: 'Transparent Execution',
      desc: 'Weekly sprint demos, shared Kanban boards, and continuous communication ensure complete visibility.',
      icon: '/uploads/media-1789629898681-73665576.svg',
    },
  ],

  engagementEyebrow: 'Engagement Models',
  engagementTitle: 'Flexible Engagement Models Tailored to Your Needs',
  engagementIntro: 'Choose the ideal collaboration model that matches your product stage, timeline, and team structure.',
  engagementItems: [
    {
      title: 'Project-Based Development',
      desc: 'Defined scope, fixed timeline, and clear milestone deliverables for turnkey websites, apps, and integrations.',
      icon: Briefcase,
    },
    {
      title: 'Dedicated Team',
      desc: 'An agile, full-time engineering squad that works exclusively on your product roadmap and tech backlog.',
      icon: Users2,
    },
    {
      title: 'Staff Augmentation',
      desc: 'Rapidly scale your existing team with senior developers and specialists while maintaining direct management.',
      icon: UserPlus,
    },
    {
      title: 'MVP & Startup Sprint',
      desc: 'Fast-track your idea to market in 4-8 weeks with focused core features, rapid feedback, and controlled budget.',
      icon: Rocket,
    },
  ],

  industriesEyebrow: 'Industries We Serve',
  industriesTitle: 'Tailored Technology for Every Industry',
  industriesIntro:
    'Cubixsol adapts its technology and delivery approach to the workflows, compliance requirements, and user expectations of different sectors.',
  industriesItems: [
    {
      title: 'Education & EdTech',
      desc: 'Custom learning management systems (LMS), student portals, and interactive digital classrooms.',
      icon: GraduationCap,
    },
    {
      title: 'Travel & Hospitality',
      desc: 'Direct booking engines, PMS integrations, multi-channel syncing, and guest management software.',
      icon: Plane,
    },
    {
      title: 'Healthcare & MedTech',
      desc: 'Secure patient portals, telemedicine tools, and HIPAA-compliant healthcare management platforms.',
      icon: HeartPulse,
    },
    {
      title: 'FinTech & Banking',
      desc: 'Secure payment gateways, financial analytics dashboards, and automated transaction systems.',
      icon: DollarSign,
    },
    {
      title: 'E-Commerce & Retail',
      desc: 'Custom e-commerce platforms, multi-vendor marketplaces, and automated inventory systems.',
      icon: ShoppingBag,
    },
    {
      title: 'SaaS & Enterprise Cloud',
      desc: 'Multi-tenant subscription platforms, scalable microservices, and modern API architectures.',
      icon: Cloud,
    },
  ],

  ctaEyebrow: 'Ready to Start?',
  ctaTitle: 'Ready to Build Your Next Digital Product?',
  ctaDesc:
    'Partner with an experienced engineering team. Tell us your goals and we will deliver a tailored proposal, roadmap, and estimate.',
  ctaButtonText: 'Discuss Your Project',
  ctaButtonLink: '/contact',

  faqEyebrow: 'FAQ',
  faqTitle: 'Frequently Asked Questions',
  faqIntro: 'Got questions? Here are quick answers about our services, process, and working model.',
  faqs: [
    {
      q: 'How much do custom software development services cost?',
      a: 'Cost depends on features, technical complexity, third-party integrations, platforms (web/mobile), and timeline. We review your scope and provide a transparent, milestone-based estimate before starting.',
    },
    {
      q: 'How long does a software development project take?',
      a: 'A focused MVP typically takes 4 to 8 weeks, while complex enterprise platforms require 3 to 6 months. During discovery, we provide a clear roadmap with realistic sprint milestones.',
    },
    {
      q: 'Which Cubixsol service should I choose?',
      a: 'Start with your business goal rather than a specific tool. Share the challenge you are solving, and our architects will recommend the right tech stack, service package, and engagement model.',
    },
    {
      q: 'Does Cubixsol provide ongoing post-launch support?',
      a: 'Yes. We offer continuous SLA-backed maintenance, security monitoring, infrastructure scaling, bug fixing, and ongoing feature enhancements.',
    },
    {
      q: 'Do you work with both early startups and established enterprises?',
      a: 'Yes. Startups partner with us for rapid MVP launches, while enterprises rely on us for legacy modernization, complex integrations, cloud DevOps, and dedicated engineering squads.',
    },
    {
      q: 'How do you ensure code quality and project transparency?',
      a: 'We follow strict CI/CD pipelines, automated testing, peer code reviews, and weekly live sprint demos. You have full access to Jira/Trello boards, GitHub repositories, and staging links.',
    },
  ],

  seo: {
    metaTitle: 'Software Development & IT Consulting Services | Cubixsol',
    metaDescription:
      'Explore Cubixsol’s full suite of custom web development, mobile apps, AI products, cloud DevOps, and UI/UX design services designed to scale your business.',
    keywords:
      'custom software development, web development, mobile apps, AI development, cloud devops, ui ux design, cubixsol services',
    ogTitle: 'Software Development & IT Consulting Services | Cubixsol',
    ogDescription:
      'Explore Cubixsol’s full suite of custom web development, mobile apps, AI products, cloud DevOps, and UI/UX design services designed to scale your business.',
  },
};

export default function Services() {
  const { services: rawServices, loading: servicesLoading, resolveIcon } = useServices();
  const { openEstimateModal } = useEstimateModal();
  const [openFaq, setOpenFaq] = useState(0);

  // Cached state for 0ms initial render
  const [pageData, setPageData] = useState(() => {
    try {
      const cached = localStorage.getItem('cubixsol_page_services_cache');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && parsed.heroTitle) return { ...defaultPageData, ...parsed };
      }
    } catch (_) {}
    return defaultPageData;
  });

  // SEO Hook
  useSEO(pageData?.seo, {
    title: pageData?.heroTitle || 'Software Development & IT Consulting Services | Cubixsol',
    description: pageData?.heroDesc,
    keywords: 'custom software development, web development, mobile apps, AI development, cubixsol',
  });

  useEffect(() => {
    let cancelled = false;
    async function fetchPageContent() {
      try {
        const data = await apiFetch('pages/services');
        if (!cancelled && data && data.slug) {
          const merged = { ...defaultPageData, ...data };
          setPageData(merged);
          try {
            localStorage.setItem('cubixsol_page_services_cache', JSON.stringify(merged));
          } catch (_) {}
        }
      } catch (err) {
        console.error('Error fetching services page content:', err);
      }
    }
    fetchPageContent();
    return () => {
      cancelled = true;
    };
  }, []);

  const services = (Array.isArray(rawServices) ? rawServices : [])
    .filter((s) => s && s.slug)
    .map((s) => ({
      slug: s.slug,
      title: s.cardTitle || s.menuTitle || s.title || s.slug,
      fullTitle: s.title || s.slug,
      cardTitle: s.cardTitle,
      menuTitle: s.menuTitle,
      desc: getCleanDesc(s),
      color: s.color || 'text-[#00a4d8] bg-sky-50',
      icon: s.icon,
      heroImage: s.heroImage,
      gradient: s.gradient,
    }));

  const [visibleCount, setVisibleCount] = useState(12);

  const processSteps = Array.isArray(pageData.processSteps) ? pageData.processSteps : [];
  const whyChooseItems = Array.isArray(pageData.whyChooseItems) ? pageData.whyChooseItems : [];
  const engagementItems = Array.isArray(pageData.engagementItems) ? pageData.engagementItems : [];
  const industriesItems = Array.isArray(pageData.industriesItems) ? pageData.industriesItems : [];
  const faqs = Array.isArray(pageData.faqs) ? pageData.faqs : [];
  const heroBadges = Array.isArray(pageData.heroBadges) ? pageData.heroBadges : [];

  const defaultEngagementIcons = [Briefcase, Users2, UserPlus, Rocket];
  const defaultIndustryIcons = [GraduationCap, Plane, HeartPulse, DollarSign, ShoppingBag, Cloud];

  return (
    <div className="bg-white overflow-hidden">
      <Breadcrumb current="All Services" />

      {/* 1. HERO SECTION — Modern, Branded & Dynamic */}
      <section className="relative pt-6 pb-14 lg:pt-10 lg:pb-20 overflow-hidden">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none z-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-[#00a4d8]/15 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-bl from-[#5d53a3]/12 to-[#1f62dd]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8">
              <Reveal direction="right">
                {/* Pill Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-sky-50 to-cyan-50 border border-cyan-200/80 text-[#00a4d8] text-xs font-extrabold uppercase tracking-widest mb-5 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#00a4d8] animate-pulse" />
                  <span>{pageData.heroEyebrow || 'Full-Suite Digital Engineering'}</span>
                </div>

                {/* Primary Heading */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.15] text-ink tracking-tight mb-5">
                  Powerful Digital Solutions Built to Accelerate{' '}
                  <span className="bg-clip-text text-transparent bg-[linear-gradient(135deg,#00a4d8_0%,#1f62dd_50%,#5d53a3_100%)]">
                    Business Growth
                  </span>
                </h1>

                {/* Description */}
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
                  {pageData.heroDesc ||
                    'Strategy, product design, full-stack engineering, and AI automation — under one roof. Explore our core services or partner with our engineers to build custom software that scales.'}
                </p>

                {/* Action CTA & Trust Badges */}
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  {pageData.heroButtonLink && !pageData.heroButtonLink.startsWith('/contact') ? (
                    <Link
                      to={pageData.heroButtonLink}
                      className="btn-primary inline-flex items-center justify-center gap-2.5 shadow-lg shadow-sky-500/20 text-sm font-bold"
                    >
                      <span>{pageData.heroButtonText || 'Get a Free Consultation'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={openEstimateModal}
                      className="btn-primary inline-flex items-center justify-center gap-2.5 shadow-lg shadow-sky-500/20 text-sm font-bold cursor-pointer"
                    >
                      <span>{pageData.heroButtonText || 'Get a Free Consultation'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                  <Link to="/projects" className="btn-outline">
                    View Our Portfolio
                  </Link>
                </div>

                {heroBadges.length > 0 && (
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-gray-600">
                    {heroBadges.map((badge, idx) => (
                      <span key={idx} className="inline-flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-cyan-100/80 text-[#00a4d8] flex items-center justify-center shrink-0">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </span>
                        {badge}
                      </span>
                    ))}
                  </div>
                )}
              </Reveal>
            </div>

            {/* Right Metric Card Floating Showcase */}
            <div className="lg:col-span-4 hidden lg:block">
              <Reveal direction="left" delay={0.15}>
                <div className="bg-gradient-to-br from-white/95 via-white to-sky-50/50 backdrop-blur-md rounded-3xl p-7 border border-cyan-100/80 shadow-[0_20px_45px_-12px_rgba(0,164,216,0.15)] relative">
                  <div className="flex items-center gap-3.5 mb-5 pb-5 border-b border-gray-100">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00a4d8] to-[#1f62dd] text-white flex items-center justify-center shadow-md">
                      <Rocket className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-wider text-[#00a4d8]">
                        High-Velocity Delivery
                      </p>
                      <h2 className="text-base font-extrabold text-ink">
                        Agile Sprint Engineering
                      </h2>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { label: 'Client Satisfaction', val: '98%', icon: Star },
                      { label: 'Digital Products Shipped', val: '200+', icon: Layers },
                      { label: 'Active Support Uptime', val: '99.9%', icon: ShieldCheck },
                    ].map((m, i) => {
                      const Icon = m.icon;
                      return (
                        <div
                          key={i}
                          className="flex items-center justify-between p-3 rounded-xl bg-white border border-gray-100/80 shadow-xs"
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className="w-4 h-4 text-[#00a4d8]" />
                            <span className="text-xs font-semibold text-gray-600">{m.label}</span>
                          </div>
                          <span className="text-xs font-extrabold text-ink bg-cyan-50 px-2 py-0.5 rounded-md text-[#00a4d8]">
                            {m.val}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <p className="mt-5 text-[11px] text-gray-400 text-center">
                    Dedicated squads tailored to your exact tech requirements.
                  </p>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SERVICES GRID — Clean Header Layout (Icon in Front of Name) & Balanced Descriptions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="eyebrow mb-2.5">Core Capabilities</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-3">
            Explore Our Comprehensive Services
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            From web & mobile apps to AI automation and cloud DevOps, find the specialized solution your product needs.
          </p>
        </div>

        {servicesLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
            <LucideIcons.Loader2 className="w-8 h-8 animate-spin text-[#00a4d8]" />
            <span className="text-sm font-medium">Loading services...</span>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-10 text-gray-500">No services available.</div>
        ) : (
          <>
            <Stagger
              className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6"
              staggerDelay={0.04}
            >
              {services.slice(0, visibleCount).map((s) => (
                <StaggerItem key={s.slug} hover>
                  <Link
                    to={`/${s.slug}`}
                    className="group bg-white rounded-2xl p-5 sm:p-6 border border-gray-100/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_-12px_rgba(0,164,216,0.16)] hover:border-cyan-200 hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col justify-between"
                  >
                    <div>
                      {/* Icon and Title Side-by-Side (Name in Front of Icon) */}
                      <div className="flex items-center gap-3.5 mb-3.5">
                        <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-50/80 border border-cyan-100/90 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#00a4d8] group-hover:via-[#0284c7] group-hover:to-[#0369a1] group-hover:border-transparent group-hover:shadow-md group-hover:shadow-[#00a4d8]/30 group-hover:scale-105 transition-all duration-300 ease-out shrink-0 overflow-hidden p-2">
                          <DynamicIcon
                            icon={s.icon}
                            alt={s.title}
                            title={s.title}
                            className="w-6 h-6 object-contain text-[#00a4d8] group-hover:brightness-0 group-hover:invert transition-all duration-300"
                            fallbackName="Building2"
                          />
                        </div>
                        <h3 className="font-extrabold text-ink text-base leading-snug group-hover:text-[#00a4d8] transition-colors line-clamp-2">
                          {formatInline(cleanTitle(s.cardTitle || s.menuTitle || s.title))}
                        </h3>
                      </div>

                      {/* Balanced, Clean 2-3 Line Short Description */}
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3 min-h-[3.6rem]">
                        {formatInline(s.desc)}
                      </p>
                    </div>

                    {/* Clean Footer Link */}
                    <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#00a4d8] group-hover:text-[#1f62dd] transition-colors">
                        Learn more
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>

            {/* Load More Button — Shows when more than 3 rows (12 items) exist */}
            {visibleCount < services.length && (
              <div className="text-center mt-12 flex flex-col items-center justify-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => Math.min(prev + 12, services.length))}
                  className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full border border-gray-200 bg-white text-ink text-sm sm:text-base font-bold shadow-xs hover:shadow-md hover:border-cyan-300 hover:text-[#00a4d8] transition-all duration-300 active:scale-95 cursor-pointer"
                >
                  <span>Load More Services</span>
                  <ChevronDown className="w-4 h-4 text-[#00a4d8] group-hover:translate-y-0.5 transition-transform duration-300" />
                </button>
                <span className="text-xs text-gray-400">
                  Showing {Math.min(visibleCount, services.length)} of {services.length} services
                </span>
              </div>
            )}
          </>
        )}
      </section>

      {/* 3. PROVEN PROCESS SECTION */}
      {processSteps.length > 0 && (
        <section className="bg-gray-50/70 py-16 lg:py-24 border-y border-gray-100/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center max-w-2xl mx-auto mb-14">
              <p className="eyebrow mb-3">{pageData.processEyebrow || 'Our Process'}</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink mb-3 tracking-tight">
                {pageData.processTitle || 'Our Proven Development Process'}
              </h2>
              {pageData.processIntro && (
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                  {formatInline(pageData.processIntro)}
                </p>
              )}
            </Reveal>
            <Stagger
              className={`grid grid-cols-1 sm:grid-cols-2 ${
                processSteps.length <= 4
                  ? 'lg:grid-cols-4'
                  : processSteps.length === 5
                  ? 'lg:grid-cols-5'
                  : 'lg:grid-cols-3'
              } gap-4 sm:gap-6`}
              staggerDelay={0.08}
            >
              {processSteps.map((p, idx) => (
                <StaggerItem key={idx} hover>
                  <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 h-full shadow-card hover:shadow-elev hover:border-cyan-200 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-block text-2xl sm:text-3xl font-extrabold bg-clip-text text-transparent bg-[linear-gradient(135deg,#00a4d8_0%,#1f62dd_100%)]">
                          {p.step || String(idx + 1).padStart(2, '0')}
                        </span>
                        {(p.icon || p.image) && (
                          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-100 flex items-center justify-center p-2 group-hover:scale-110 group-hover:bg-white group-hover:border-cyan-300 transition-all shadow-xs">
                            <DynamicIcon
                              icon={p.icon || p.image}
                              alt={p.title}
                              title={p.title}
                              className="w-6 h-6 object-contain"
                              fallbackName="Building2"
                            />
                          </div>
                        )}
                      </div>
                      <h3 className="font-extrabold text-ink text-base sm:text-lg mb-2 group-hover:text-[#00a4d8] transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                        {formatInline(p.desc)}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* 4. WHY BUSINESSES CHOOSE CUBIXSOL */}
      {whyChooseItems.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Reveal className="bg-gradient-to-br from-sky-50/70 via-white to-cyan-50/50 rounded-3xl border border-cyan-100/80 p-6 sm:p-10 lg:p-14 shadow-card">
            <div className="grid lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-5">
                <p className="eyebrow mb-3">{pageData.whyChooseEyebrow || 'Why Choose Us'}</p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink mb-4 leading-tight">
                  {pageData.whyChooseTitle || 'Why Businesses Choose Cubixsol'}
                </h2>
                {pageData.whyChooseIntro && (
                  <p className="text-gray-600 mb-8 text-sm sm:text-base leading-relaxed">
                    {formatInline(pageData.whyChooseIntro)}
                  </p>
                )}
                <Link
                  to="/contact"
                  className="btn-primary shadow-lg shadow-sky-500/20"
                >
                  Let's Work Together <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
                {whyChooseItems.map((item, idx) => {
                  const getWhyChooseIcon = (it, i) => {
                    if (it?.icon) return it.icon;
                    const title = (it?.title || '').toLowerCase();
                    if (title.includes('business') || title.includes('planning'))
                      return '/uploads/media-1789629897582-729673598.svg';
                    if (title.includes('cross') || title.includes('expertise'))
                      return '/uploads/media-1789629897944-669462569.svg';
                    if (title.includes('enterprise'))
                      return '/uploads/media-1789629898314-560238011.svg';
                    if (title.includes('transparent') || title.includes('execution'))
                      return '/uploads/media-1789629898681-73665576.svg';
                    const list = [
                      '/uploads/media-1789629897582-729673598.svg',
                      '/uploads/media-1789629897944-669462569.svg',
                      '/uploads/media-1789629898314-560238011.svg',
                      '/uploads/media-1789629898681-73665576.svg',
                    ];
                    return list[i % list.length] || 'ShieldCheck';
                  };

                  const iconSrc = getWhyChooseIcon(item, idx);

                  return (
                    <div
                      key={idx}
                      className="group bg-white/95 backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-gray-100/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_-12px_rgba(0,164,216,0.16)] hover:border-cyan-200 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-start"
                    >
                      <div className="flex items-center gap-3.5 mb-3.5">
                        <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-50/80 border border-cyan-100/90 flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-[#00a4d8] group-hover:via-[#0284c7] group-hover:to-[#0369a1] group-hover:border-transparent group-hover:shadow-md group-hover:shadow-[#00a4d8]/30 group-hover:scale-105 transition-all duration-300 ease-out shrink-0 overflow-hidden">
                          <DynamicIcon
                            icon={iconSrc}
                            title={item.title}
                            className="w-6 h-6 sm:w-6.5 sm:h-6.5 object-contain text-[#00a4d8] group-hover:brightness-0 group-hover:invert transition-all duration-300"
                          />
                        </div>
                        <h3 className="font-extrabold text-base sm:text-lg text-ink leading-snug group-hover:text-[#00a4d8] transition-colors">
                          {formatInline(cleanTitle(item.title))}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                        {formatInline(item.desc)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* 5. FLEXIBLE ENGAGEMENT MODELS — Name Aligned in Front of Icon */}
      {engagementItems.length > 0 && (
        <section className="bg-gray-50/70 py-16 lg:py-24 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center max-w-3xl mx-auto mb-14">
              <p className="eyebrow mb-3">{pageData.engagementEyebrow || 'Engagement Models'}</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink mb-3 tracking-tight">
                {pageData.engagementTitle ||
                  'Flexible Engagement Models, Including Staff Augmentation'}
              </h2>
              {pageData.engagementIntro && (
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                  {formatInline(pageData.engagementIntro)}
                </p>
              )}
            </Reveal>

            <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.07}>
              {engagementItems.map((item, idx) => {
                const ModelIcon = defaultEngagementIcons[idx % defaultEngagementIcons.length] || Users2;
                return (
                  <StaggerItem key={idx} hover>
                    <div className="group bg-white rounded-2xl border border-gray-100 hover:border-cyan-200 p-6 h-full shadow-card hover:shadow-elev hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
                      <div>
                        {/* Name in Front of Icon */}
                        <div className="flex items-center gap-3.5 mb-3.5">
                          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-50/80 border border-cyan-100 flex items-center justify-center text-[#00a4d8] group-hover:bg-gradient-to-br group-hover:from-[#00a4d8] group-hover:to-[#1f62dd] group-hover:text-white transition-all duration-300 shrink-0 shadow-xs">
                            <ModelIcon className="w-5 h-5" />
                          </div>
                          <h3 className="font-extrabold text-ink text-base sm:text-lg leading-snug group-hover:text-[#00a4d8] transition-colors">
                            {formatInline(cleanTitle(item.title))}
                          </h3>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                          {formatInline(item.desc)}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>
      )}

      {/* 6. INDUSTRIES WE SERVE — Name Aligned in Front of Icon */}
      {industriesItems.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <Reveal className="text-center max-w-3xl mx-auto mb-14">
            <p className="eyebrow mb-3">{pageData.industriesEyebrow || 'Industries'}</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink mb-3 tracking-tight">
              {pageData.industriesTitle || 'Industries We Serve'}
            </h2>
            {pageData.industriesIntro && (
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                {formatInline(pageData.industriesIntro)}
              </p>
            )}
          </Reveal>

          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.06}>
            {industriesItems.map((item, idx) => {
              const IndIcon = defaultIndustryIcons[idx % defaultIndustryIcons.length] || Building2;
              return (
                <StaggerItem key={idx} hover>
                  <div className="group bg-white rounded-2xl border border-gray-100 hover:border-cyan-200 p-5 sm:p-6 shadow-card hover:shadow-elev hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-start">
                    <div className="flex items-center gap-3.5 mb-3">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-50 to-cyan-50 border border-cyan-100 text-[#00a4d8] flex items-center justify-center shrink-0 group-hover:bg-gradient-to-br group-hover:from-[#00a4d8] group-hover:to-[#1f62dd] group-hover:text-white transition-all duration-300 shadow-xs">
                        <IndIcon className="w-5 h-5" />
                      </div>
                      <h3 className="font-extrabold text-ink text-base sm:text-lg leading-snug group-hover:text-[#00a4d8] transition-colors">
                        {formatInline(cleanTitle(item.title))}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                      {formatInline(item.desc)}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </section>
      )}

      {/* 7. FREQUENTLY ASKED QUESTIONS */}
      {faqs.length > 0 && (
        <section className="bg-[#f8fafc] py-16 lg:py-24 border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center mb-12">
              <p className="eyebrow mb-2">{pageData.faqEyebrow || 'FAQ'}</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink">
                {pageData.faqTitle || 'Frequently Asked Questions'}
              </h2>
              {pageData.faqIntro && (
                <p className="text-gray-500 text-sm sm:text-base mt-2">
                  {formatInline(pageData.faqIntro)}
                </p>
              )}
            </Reveal>
            <div className="space-y-3">
              {faqs.map((item, i) => {
                const open = openFaq === i;
                return (
                  <Reveal key={i} delay={i * 0.04}>
                    <div className="rounded-2xl bg-white border border-gray-100 overflow-hidden shadow-card transition-all">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(open ? -1 : i)}
                        className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left font-bold text-ink text-sm sm:text-base hover:text-[#00a4d8] transition"
                      >
                        <span>{item.q}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-[#00a4d8] shrink-0 transition-transform duration-300 ${
                            open ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {open && (
                        <div className="px-5 sm:px-6 pb-5 text-xs sm:text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-3.5">
                          {formatInline(item.a)}
                        </div>
                      )}
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 8. CTA BANNER */}
      <CtaBanner
        eyebrow={pageData.ctaEyebrow || 'Ready to Start?'}
        title={pageData.ctaTitle || 'Ready to Start Your Project? Let’s Talk'}
        desc={
          pageData.ctaDesc ||
          'Move from idea to execution with reliable custom software development services built around your users, operations, and growth plans.'
        }
        buttonText={pageData.ctaButtonText || 'Discuss Your Project'}
        buttonLink={pageData.ctaButtonLink || '/contact'}
      />
    </div>
  );
}
