import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  Layers,
  Users,
  Building2,
  HelpCircle,
  Clock,
  Zap,
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import CtaBanner from '../components/CtaBanner';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';
import { useServices } from '../context/ServicesContext';
import { formatInline, FormatRichText } from '../utils/formatText';
import { apiFetch } from '../utils/api';
import { useSEO } from '../utils/seo';

const defaultPageData = {
  heroEyebrow: 'Our Services',
  heroTitle: 'Powerful digital solutions that drive real results',
  heroDesc:
    'Strategy, design, engineering and growth — under one roof. Pick a service to see how we deliver, or tell us your goal and we will map the right path.',
  heroButtonText: 'Get a Free Project Consultation',
  heroButtonLink: '/contact#contact-form',
  heroBadges: ['Modern stack', 'Scalable & secure', 'Transparent delivery'],

  processEyebrow: 'Our Process',
  processTitle: 'Our Proven Development Process',
  processIntro: '',
  processSteps: [
    {
      step: '01',
      title: 'Discover',
      desc: 'We clarify your business goals, users, requirements, technical constraints, budget, and success criteria.',
    },
    {
      step: '02',
      title: 'Plan',
      desc: 'Our team defines the scope, technology, architecture, priorities, milestones, and delivery roadmap.',
    },
    {
      step: '03',
      title: 'Design and Develop',
      desc: 'Designers create the user experience while developers build, review, and integrate each product component.',
    },
    {
      step: '04',
      title: 'Test and Launch',
      desc: 'We test functionality, usability, compatibility, security, and performance before managing a controlled deployment.',
    },
    {
      step: '05',
      title: 'Support',
      desc: 'After launch, we monitor performance, resolve issues, deliver updates, and help your product evolve.',
    },
  ],

  whyChooseEyebrow: 'Why Choose Us',
  whyChooseTitle: 'Why Businesses Choose Cubixsol',
  whyChooseIntro:
    'Businesses **outsource custom software development services** to us when they need specialized expertise without expanding every internal function. You can expect a clear scope, practical recommendations, visible progress, quality assurance, and continued post-launch support.',
  whyChooseItems: [
    {
      title: 'Business-first planning',
      desc: 'We connect technical decisions to user needs, operational requirements, and commercial goals.',
    },
    {
      title: 'Cross-functional expertise',
      desc: 'Developers, designers, QA specialists, consultants, and marketers collaborate throughout delivery.',
    },
    {
      title: 'Enterprise-ready thinking',
      desc: 'Our **custom enterprise software development services** prioritize scalability, integrations, maintainability, and long-term product performance.',
    },
    {
      title: 'Transparent execution',
      desc: 'Defined milestones, regular communication, testing, and documented feedback keep the project moving in the right direction.',
    },
  ],

  engagementEyebrow: 'Engagement Models',
  engagementTitle: 'Flexible Engagement Models, Including Staff Augmentation',
  engagementIntro: '',
  engagementItems: [
    {
      title: 'Project-Based Development',
      desc: 'Choose a defined scope, timeline, and delivery plan for a website, application, integration, migration, or digital campaign.',
    },
    {
      title: 'Dedicated Team',
      desc: 'Secure a consistent multidisciplinary team that works exclusively or primarily on your product and long-term roadmap.',
    },
    {
      title: 'Staff Augmentation Services',
      desc: 'Fill specific skill gaps, increase delivery capacity, or add specialists to an existing team while retaining direct project control.',
    },
    {
      title: 'MVP and Startup Development',
      desc: 'Validate an idea quickly with focused features, rapid feedback, controlled costs, and a roadmap for future product growth.',
    },
  ],

  industriesEyebrow: 'Industries',
  industriesTitle: 'Industries We Serve',
  industriesIntro:
    'Cubixsol adapts its technology and delivery approach to the workflows, users, and compliance needs of different sectors.',
  industriesItems: [
    {
      title: 'Education',
      desc: 'Learning platforms, student portals, and administrative systems',
    },
    {
      title: 'Travel',
      desc: 'Booking platforms, integrations, and customer applications',
    },
    {
      title: 'Healthcare',
      desc: 'Patient-facing tools and operational software',
    },
    {
      title: 'FinTech',
      desc: 'Secure financial platforms and payment integrations',
    },
    {
      title: 'E-commerce',
      desc: 'Online stores, marketplaces, and retail automation',
    },
    {
      title: 'SaaS',
      desc: 'Subscription platforms and cloud-based business products',
    },
  ],

  ctaEyebrow: 'Ready to Start?',
  ctaTitle: 'Ready to Start Your Project? Let’s Talk',
  ctaDesc:
    'Move from idea to execution with reliable **custom software development services** built around your users, operations, and growth plans.',
  ctaButtonText: 'Discuss Your Project',
  ctaButtonLink: '/contact',

  faqEyebrow: 'FAQ',
  faqTitle: 'Frequently Asked Questions',
  faqIntro: '',
  faqs: [
    {
      q: 'How much do custom software development services cost?',
      a: 'Cost depends on the project’s features, technical complexity, integrations, platforms, timeline, and team requirements. We review your scope before providing a customized estimate.',
    },
    {
      q: 'How long does a software development project take?',
      a: 'A focused MVP may take considerably less time than a multi-platform enterprise system. After discovery, we provide a roadmap with realistic phases, milestones, and delivery estimates.',
    },
    {
      q: 'Which Cubixsol service should I choose?',
      a: 'Start with the outcome, not the technology. Share the problem you need to solve, and our team will recommend the appropriate service, platform, and engagement model.',
    },
    {
      q: 'Does Cubixsol provide post-launch support?',
      a: 'Yes. Support can include issue resolution, performance monitoring, security updates, feature improvements, integrations, optimization, and ongoing product maintenance.',
    },
    {
      q: 'Do you work with both startups and enterprises?',
      a: 'Yes. Startups can use MVP development to validate ideas, while established businesses can engage Cubixsol for modernization, integrations, dedicated teams, and enterprise platforms.',
    },
    {
      q: 'How can I find custom software development services near me?',
      a: 'Location should not be your only selection criterion. Compare relevant experience, communication, technical capability, delivery process, and post-launch support. Our experts collaborate with clients through remote and regional teams.',
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
      title: s.cardTitle || s.title || s.slug,
      fullTitle: s.title || s.slug,
      cardTitle: s.cardTitle,
      menuTitle: s.menuTitle,
      desc: s.desc || '',
      color: s.color || 'text-primary-600 bg-primary-50',
      icon: s.icon,
      heroImage: s.heroImage,
      gradient: s.gradient,
    }));

  const processSteps = Array.isArray(pageData.processSteps) ? pageData.processSteps : [];
  const whyChooseItems = Array.isArray(pageData.whyChooseItems) ? pageData.whyChooseItems : [];
  const engagementItems = Array.isArray(pageData.engagementItems) ? pageData.engagementItems : [];
  const industriesItems = Array.isArray(pageData.industriesItems) ? pageData.industriesItems : [];
  const faqs = Array.isArray(pageData.faqs) ? pageData.faqs : [];
  const heroBadges = Array.isArray(pageData.heroBadges) ? pageData.heroBadges : [];

  return (
    <div>
      <Breadcrumb current="Services" />

      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-14 lg:pb-20">
        <Reveal className="max-w-3xl" scale>
          <p className="eyebrow mb-3">{pageData.heroEyebrow || 'Our Services'}</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-ink mb-5 tracking-tight">
            {pageData.heroTitle ? (
              formatInline(pageData.heroTitle)
            ) : (
              <>
                Powerful digital solutions that drive{' '}
                <span className="bg-clip-text text-transparent bg-primary-gradient">real results</span>
              </>
            )}
          </h1>
          {pageData.heroDesc && (
            <p className="text-gray-500 text-base sm:text-lg max-w-2xl leading-relaxed">
              {formatInline(pageData.heroDesc)}
            </p>
          )}

          {/* CTA Action Button & Badges */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            {pageData.heroButtonText && (
              <Link
                to={pageData.heroButtonLink || '/contact#contact-form'}
                className="btn-primary inline-flex items-center justify-center gap-2.5 self-start shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition-all text-sm font-bold"
              >
                <span>{pageData.heroButtonText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}

            {heroBadges.length > 0 && (
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm font-medium text-gray-500">
                {heroBadges.map((badge, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-primary-600 shrink-0" /> {badge}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </section>

      {/* 2. SERVICES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
        {servicesLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
            <LucideIcons.Loader2 className="w-8 h-8 animate-spin text-primary-600" />
            <span className="text-sm font-medium">Loading services...</span>
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-10 text-gray-500">No services available.</div>
        ) : (
          <Stagger
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6"
            staggerDelay={0.07}
          >
            {services.map((s) => {
              const IconComponent = resolveIcon(s.icon);
              return (
                <StaggerItem key={s.slug} hover>
                  <Link
                    to={`/${s.slug}`}
                    className="group card h-full flex flex-col hover:shadow-elev hover:-translate-y-1.5 transition-all duration-300 !p-5 sm:!p-6"
                  >
                    <span
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${s.color} group-hover:scale-110 transition-transform duration-300 shadow-sm`}
                    >
                      <IconComponent className="w-8 h-8 object-contain" />
                    </span>
                    <h2 className="font-bold text-ink text-lg mb-2 group-hover:text-primary-600 transition-colors">
                      {s.title}
                    </h2>
                    <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-4">
                      {formatInline(s.desc)}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600">
                      Learn more
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        )}
      </section>

      {/* 3. PROVEN PROCESS SECTION */}
      {processSteps.length > 0 && (
        <section className="bg-gray-50 py-16 lg:py-24 border-y border-gray-100/80">
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
                <StaggerItem key={idx}>
                  <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 h-full shadow-card hover:shadow-elev hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <span className="inline-block text-2xl sm:text-3xl font-black bg-gradient-to-r from-primary-600 to-brand-cyan bg-clip-text text-transparent mb-3">
                        {p.step || String(idx + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-extrabold text-ink text-base sm:text-lg mb-2">
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
          <Reveal className="bg-gradient-to-br from-primary-50/80 via-white to-cyan-50/50 rounded-3xl border border-primary-100/70 p-6 sm:p-10 lg:p-14 shadow-card">
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
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-gradient text-white text-sm font-bold shadow-soft hover:shadow-elev hover:gap-3 transition-all"
                >
                  Let's Work Together <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
                {whyChooseItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 border border-gray-100/90 shadow-card hover:shadow-elev hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-8 h-8 rounded-xl bg-primary-100/70 text-primary-700 flex items-center justify-center mb-3.5 font-bold text-xs">
                      <ShieldCheck className="w-4 h-4 text-primary-600" />
                    </div>
                    <h3 className="font-bold text-sm sm:text-base text-ink mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                      {formatInline(item.desc)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* 5. FLEXIBLE ENGAGEMENT MODELS */}
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
              {engagementItems.map((item, idx) => (
                <StaggerItem key={idx}>
                  <div className="bg-white rounded-2xl border border-gray-100 p-6 h-full shadow-card hover:shadow-elev hover:border-primary-200 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-50 to-cyan-50 border border-cyan-100 text-[#00a4d8] flex items-center justify-center mb-4">
                        <Users className="w-5 h-5 text-primary-600" />
                      </div>
                      <h3 className="font-extrabold text-ink text-base sm:text-lg mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                        {formatInline(item.desc)}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* 6. INDUSTRIES WE SERVE */}
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
            {industriesItems.map((item, idx) => (
              <StaggerItem key={idx}>
                <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 shadow-card hover:shadow-elev hover:border-cyan-200 hover:-translate-y-1 transition-all duration-300 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-ink text-base mb-1">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                      {formatInline(item.desc)}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
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
                        className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left font-bold text-ink text-sm sm:text-base hover:text-primary-600 transition"
                      >
                        <span>{item.q}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-primary-600 shrink-0 transition-transform duration-300 ${
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
