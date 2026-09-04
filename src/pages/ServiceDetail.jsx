import { Link, useParams, Navigate } from 'react-router-dom';
import { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Zap,
  HelpCircle,
  Briefcase,
  Layers,
  Award,
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import CtaBanner from '../components/CtaBanner';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';
import ServiceSubTabs from '../components/ServiceSubTabs';
import DesignLabFlip from '../components/DesignLabFlip';
import ServiceInquiryForm from '../components/ServiceInquiryForm';
import BestPractices from '../components/BestPractices';
import IosHighlights from '../components/IosHighlights';
import AndroidHighlights from '../components/AndroidHighlights';
import AppJourneyWizard from '../components/AppJourneyWizard';
import DevOpsProcess from '../components/DevOpsProcess';
import SuccessStories from '../components/SuccessStories';
import DynamicIcon from '../components/DynamicIcon';
import { useServices } from '../context/ServicesContext';
import { useSEO } from '../utils/seo';

function formatText(text) {

  if (!text) return null;
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function ServiceDetail() {
  const { slug } = useParams();
  const { services, loading, resolveIcon } = useServices();
  const [openFaq, setOpenFaq] = useState(null);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3 text-gray-400">
        <LucideIcons.Loader2 className="w-8 h-8 animate-spin text-[#00a4d8]" />
        <span className="text-sm font-medium">Loading service details...</span>
      </div>
    );
  }

  const service = (Array.isArray(services) ? services : []).find(
    (s) =>
      s.slug === slug ||
      (slug === 'graphic-designing' && (s.slug === 'graphic-design' || s.slug === 'graphic-designing')) ||
      (slug === 'graphic-design' && (s.slug === 'graphic-design' || s.slug === 'graphic-designing')) ||
      (slug === 'ecommerce-solutions' && (s.slug === 'ecommerce' || s.slug === 'ecommerce-solutions' || s.slug === 'ecommerce-development')) ||
      (slug === 'ecommerce-development' && (s.slug === 'ecommerce' || s.slug === 'ecommerce-solutions' || s.slug === 'ecommerce-development'))
  );

  if (!service) return <Navigate to="/services" replace />;

  const others = (Array.isArray(services) ? services : []).filter((s) => s.slug !== slug).slice(0, 3);
  const IconComponent = resolveIcon(service.icon);
  const features = Array.isArray(service?.features) ? service.features : [];
  const tech = Array.isArray(service.tech) ? service.tech : [];
  const outcomes = Array.isArray(service.outcomes) ? service.outcomes : [];
  const subServices = Array.isArray(service.subServicesItems) ? service.subServicesItems : [];
  const whyChooseItems = Array.isArray(service.whyChooseItems) ? service.whyChooseItems : [];
  const processSteps = Array.isArray(service.serviceProcessSteps) ? service.serviceProcessSteps : [];
  const businessTypes = Array.isArray(service.businessTypesItems) ? service.businessTypesItems : [];
  const faqs = Array.isArray(service?.faqs) ? service.faqs : [];

  useSEO(service?.seo, {
    title: service?.title,
    description: service?.desc || service?.longDesc,
    keywords: `${service?.title}, ${features.slice(0, 4).join(', ')}, Cubixsol`,
    heroImage: service?.heroImage,
  });

  const isUx = slug === 'ui-ux-design';

  const isMobile = slug === 'mobile-app-development';
  const isIos = slug === 'ios-development';
  const isAndroid = slug === 'android-development';
  const isAppJourney = isMobile || isIos || isAndroid;
  const isDevOps = slug === 'devops' || slug === 'cloud-solutions';

  const scrollToForm = (e) => {
    e.preventDefault();
    document
      .getElementById(isAppJourney ? 'app-journey' : 'service-inquiry')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="bg-white">
      <Breadcrumb current={service.title} items={[{ label: 'Services', to: '/services' }]} />

      {/* Hero Section */}
      <section
        id="overview"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 lg:pb-16 scroll-mt-28"
      >
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <Reveal direction="right" scale>
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-[#00a4d8] mb-5 transition"
            >
              <ArrowLeft className="w-4 h-4" /> All services
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-50 to-cyan-50 border border-cyan-100 flex items-center justify-center text-[#00a4d8] shadow-sm">
                <IconComponent className="w-6 h-6 object-contain" />
              </span>
              <p className="eyebrow !mb-0">{service.menuTitle || service.title}</p>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-ink tracking-tight leading-[1.18] mb-4">
              {service.title}
            </h1>

            {service.heroSubtitle && (
              <p className="text-base sm:text-lg font-bold text-[#00a4d8] mb-3">
                {service.heroSubtitle}
              </p>
            )}

            <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4 max-w-xl">
              {formatText(service.longDesc || service.desc)}
            </p>

            {service.additionalParagraph && (
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
                {formatText(service.additionalParagraph)}
              </p>
            )}

            <div className="flex flex-wrap gap-3">
              <a
                href={isAppJourney ? '#app-journey' : '#service-inquiry'}
                onClick={scrollToForm}
                className="btn-primary"
              >
                {service.ctaPrimaryText || "Let's Talk"} <ArrowRight className="w-4 h-4" />
              </a>
              <Link to="/projects" className="btn-outline">
                {service.ctaSecondaryText || 'See related work'}
              </Link>
            </div>

            {/* Trust badges under CTAs */}
            <div className="mt-7 flex flex-wrap gap-3 max-w-xl">
              <a
                href="https://www.goodfirms.co/company/cubixsol"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-100 bg-white px-3 py-2 shadow-sm hover:border-cyan-200 hover:shadow-md transition"
              >
                <span className="w-8 h-8 rounded-lg bg-gradient-to-b from-[#4b8bff] to-[#1a56db] flex flex-col items-center justify-center text-white shrink-0">
                  <span className="text-[5px] font-black leading-none">GF</span>
                  <span className="text-[4px] font-bold bg-orange-500 px-0.5 rounded-[1px] mt-0.5">
                    P
                  </span>
                </span>
                <span className="text-left">
                  <span className="block text-[11px] font-bold text-ink leading-tight">
                    GoodFirms
                  </span>
                  <span className="block text-[10px] text-gray-500">Profile</span>
                </span>
              </a>
              <a
                href="https://clutch.co/profile/cubixsol"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-100 bg-white px-3 py-2 shadow-sm hover:border-cyan-200 hover:shadow-md transition"
              >
                <span className="w-8 h-8 rounded-lg bg-[#16325c] flex flex-col items-center justify-center text-white shrink-0">
                  <span className="text-[5px] font-bold text-sky-300 leading-none">TOP</span>
                  <span className="text-[7px] font-black leading-none">Clutch</span>
                </span>
                <span className="text-left">
                  <span className="block text-[11px] font-bold text-ink leading-tight">Clutch</span>
                  <span className="block text-[10px] text-gray-500">Verified</span>
                </span>
              </a>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <div className="relative">
              <div
                className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-cyan-400/20 via-sky-400/10 to-blue-500/15 opacity-50 blur-2xl pointer-events-none"
              />
              <div className="relative rounded-3xl overflow-hidden shadow-elev aspect-[4/3] bg-gray-100 border border-gray-100">
                {service.heroImage ? (
                  <img
                    src={service.heroImage}
                    alt={service.title}
                    className="w-full h-full"
                    loading="eager"
                    decoding="async"
                    width={1000}
                    height={750}
                  />
                ) : (
                  <div
                    className="w-full h-full bg-gradient-to-br from-[#00a4d8] via-[#0284c7] to-[#0369a1] flex items-center justify-center"
                  >
                    <IconComponent className="w-28 h-28 text-white/90" strokeWidth={1.25} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4">
                  <span className="inline-flex items-center gap-2 bg-white/95 backdrop-blur text-ink text-xs font-bold px-3.5 py-1.5 rounded-full shadow-md">
                    <IconComponent className="w-3.5 h-3.5 text-[#00a4d8]" />
                    {service.title}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-w-0">

          {/* Sub-Services Grid Section (if provided) */}
          {subServices.length > 0 && (
            <section id="sub-services" className="scroll-mt-28 py-12 lg:py-16 border-t border-gray-100">
              <Reveal className="max-w-3xl mb-10">
                <p className="eyebrow mb-2">Specialized Expertise</p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-4">
                  {service.subServicesTitle || 'Our Specialized Services'}
                </h2>
                {service.subServicesIntro && (
                  <p className="text-gray-500 text-base leading-relaxed">
                    {formatText(service.subServicesIntro)}
                  </p>
                )}
              </Reveal>

              <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6" staggerDelay={0.06}>
                {subServices.map((sub, idx) => (
                  <StaggerItem key={sub.title || idx} hover>
                    <div className="group relative bg-white rounded-3xl border border-gray-100 p-6 sm:p-7 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_-10px_rgba(0,164,216,0.12)] hover:border-cyan-200 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between">
                      <div>
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-sky-50 to-cyan-50 border border-cyan-100/80 flex items-center justify-center text-[#00a4d8] font-black text-sm mb-5 group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-[#00a4d8] group-hover:to-[#0284c7] group-hover:text-white transition-all duration-300">
                          {String(idx + 1).padStart(2, '0')}
                        </div>
                        <h3 className="font-extrabold text-ink text-lg sm:text-xl mb-2.5 group-hover:text-[#00a4d8] transition-colors">
                          {sub.title}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                          {formatText(sub.desc)}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </section>
          )}

          {/* Capabilities Section */}
          {features.length > 0 && (
            <section id="capabilities" className="scroll-mt-28 py-12 lg:py-14 border-t border-gray-100">
              <Reveal className="mb-8">
                <p className="eyebrow mb-2">What's included</p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">Key Capabilities</h2>
              </Reveal>
              <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4" staggerDelay={0.04}>
                {features.map((f) => (
                  <StaggerItem key={f} hover>
                    <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-card flex gap-3.5 h-full hover:-translate-y-0.5 hover:shadow-elev hover:border-cyan-100 transition-all">
                      <CheckCircle2 className="w-5 h-5 text-[#00a4d8] shrink-0 mt-0.5" />
                      <p className="text-sm font-semibold text-ink leading-relaxed">{f}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </section>
          )}

          {/* Why Choose Cubixsol Section (if provided) */}
          {whyChooseItems.length > 0 && (
            <section id="why-choose" className="scroll-mt-28 py-12 lg:py-16 border-t border-gray-100">
              <Reveal className="max-w-3xl mb-10">
                <p className="eyebrow mb-2">Why Partner With Us</p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-3">
                  {service.whyChooseTitle || `Why Choose Cubixsol for ${service.title}?`}
                </h2>
                {service.whyChooseIntro && (
                  <p className="text-gray-500 text-base leading-relaxed">
                    {formatText(service.whyChooseIntro)}
                  </p>
                )}
              </Reveal>

              <div className="grid lg:grid-cols-2 gap-8 items-start">
                <Stagger className="grid sm:grid-cols-2 gap-4 lg:col-span-2" staggerDelay={0.05}>
                  {whyChooseItems.map((item, idx) => (
                    <StaggerItem key={item.title || idx} hover>
                      <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-7 shadow-card hover:shadow-elev hover:border-cyan-200 transition-all h-full">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-50 to-cyan-50 text-[#00a4d8] flex items-center justify-center mb-4">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-extrabold text-ink mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                          {formatText(item.desc)}
                        </p>
                      </div>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </section>
          )}

          {/* Delivery Process Roadmap Section (if provided) */}
          {processSteps.length > 0 && (
            <div id="process" className="scroll-mt-28">
              {processSteps.some((s) => (s.image && s.image.trim()) || (Array.isArray(s.points) && s.points.length > 0)) ? (
                <DevOpsProcess
                  steps={processSteps}
                  title={service.serviceProcessTitle || 'Our Structured Process'}
                  intro={service.serviceProcessIntro}
                />
              ) : (
                <section className="py-12 lg:py-16 border-t border-gray-100">
                  <Reveal className="max-w-3xl mb-10">
                    <p className="eyebrow mb-2">Methodology</p>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-2">
                      {service.serviceProcessTitle || 'Our Structured Process'}
                    </h2>
                    {service.serviceProcessIntro && (
                      <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                        {formatText(service.serviceProcessIntro)}
                      </p>
                    )}
                  </Reveal>

                  <Stagger className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4" staggerDelay={0.05}>
                    {processSteps.map((step, idx) => (
                      <StaggerItem key={step.title || idx}>
                        <div className="relative bg-white rounded-3xl border border-gray-100 p-5 sm:p-6 shadow-card hover:shadow-elev hover:border-cyan-200 transition-all h-full flex flex-col justify-between">
                          <div>
                            <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-sky-50 to-cyan-50 border border-cyan-100 text-[#00a4d8] font-black text-xs mb-4">
                              {step.stepNumber || `0${idx + 1}`}
                            </span>
                            <h3 className="font-extrabold text-ink text-base mb-2">
                              {step.title}
                            </h3>
                            <p className="text-xs text-gray-500 leading-relaxed">
                              {formatText(step.desc)}
                            </p>
                          </div>
                        </div>
                      </StaggerItem>
                    ))}
                  </Stagger>
                </section>
              )}
            </div>
          )}


          {/* Business Types Section (if provided) */}
          {businessTypes.length > 0 && (
            <section id="business-types" className="scroll-mt-28 py-12 lg:py-16 border-t border-gray-100">
              <Reveal className="max-w-3xl mb-10">
                <p className="eyebrow mb-2">Tailored Solutions</p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-3">
                  {service.businessTypesTitle || 'Solutions for Your Industry & Business'}
                </h2>
                {service.businessTypesIntro && (
                  <p className="text-gray-500 text-base leading-relaxed">
                    {formatText(service.businessTypesIntro)}
                  </p>
                )}
              </Reveal>

              <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.05}>
                {businessTypes.map((item, idx) => (
                  <StaggerItem key={item.title || idx} hover>
                    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-card hover:shadow-elev hover:border-cyan-200 transition-all h-full">
                      <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#00a4d8] flex items-center justify-center mb-4">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <h3 className="font-extrabold text-ink text-lg mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {formatText(item.desc)}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </section>
          )}

          {/* Technologies & Outcomes Section */}
          <section id="tech-outcomes" className="scroll-mt-28 py-12 lg:py-16 border-t border-gray-100">
            <div className="grid lg:grid-cols-2 gap-10">
              <Reveal direction="right">
                <p className="eyebrow mb-2">Stack & Tools</p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-ink mb-4">
                  {service.techTitle || 'Technologies we use'}
                </h2>
                {service.techDesc && (
                  <p className="text-sm sm:text-base text-gray-500 leading-relaxed mb-6 whitespace-pre-line">
                    {service.techDesc}
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  {tech.map((t) => (
                    <span
                      key={t}
                      className="px-3.5 py-1.5 rounded-xl text-sm font-bold bg-sky-50/80 text-[#00a4d8] border border-cyan-100 shadow-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Reveal>

              <Reveal direction="left" delay={0.1}>
                <p className="eyebrow mb-2">Impact</p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-ink mb-4">
                  Typical Outcomes
                </h2>
                <div className="space-y-3">
                  {outcomes.map((o) => (
                    <div
                      key={o}
                      className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50/80 border border-gray-100 text-sm font-semibold text-ink"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-[#00a4d8] shrink-0" />
                      {o}
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </section>

          {/* Pricing Card Section (if provided) */}
          {(service.pricingSectionTitle || service.pricingSectionText) && (
            <section id="pricing" className="scroll-mt-28 py-10">
              <div className="rounded-3xl bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-50/70 border border-cyan-100 p-8 sm:p-10 shadow-sm">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-ink mb-3">
                  {service.pricingSectionTitle || 'Transparent, Value-Focused Pricing'}
                </h2>
                <p className="text-gray-600 text-base leading-relaxed mb-6 max-w-3xl">
                  {formatText(service.pricingSectionText)}
                </p>
                <a
                  href={isAppJourney ? '#app-journey' : '#service-inquiry'}
                  onClick={scrollToForm}
                  className="btn-primary inline-flex"
                >
                  Request a Custom Estimate <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </section>
          )}

          {/* Interactive modules */}
          {isMobile && (
            <div id="best-practices" className="scroll-mt-28 -mx-4 sm:mx-0">
              <BestPractices />
            </div>
          )}
          {isIos && (
            <div id="ios-highlights" className="scroll-mt-28 -mx-4 sm:mx-0">
              <IosHighlights />
            </div>
          )}
          {isAndroid && (
            <div id="android-highlights" className="scroll-mt-28 -mx-4 sm:mx-0">
              <AndroidHighlights />
            </div>
          )}
          {isDevOps && (
            <div id="devops-process" className="scroll-mt-28 -mx-4 sm:mx-0">
              <DevOpsProcess />
            </div>
          )}
          {isUx && (
            <div id="ux-services" className="scroll-mt-28 -mx-4 sm:-mx-6 lg:mx-0">
              <ServiceSubTabs />
            </div>
          )}
          {isUx && (
            <>
              <section className="bg-white py-10">
                <div className="max-w-3xl mx-auto px-4 text-center">
                  <p className="eyebrow mb-2">Design culture</p>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-ink">
                    From research to polished interfaces — one continuous practice
                  </h2>
                </div>
              </section>
              <div id="design-lab" className="scroll-mt-28 -mx-4 sm:-mx-6 lg:mx-0">
                <DesignLabFlip />
              </div>
            </>
          )}

          {/* Frequently Asked Questions (FAQs) Section */}
          {faqs.length > 0 && (
            <section id="faqs" className="scroll-mt-28 py-12 lg:py-16 border-t border-gray-100">
              <Reveal className="max-w-3xl mb-10">
                <p className="eyebrow mb-2">Got Questions?</p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-3">
                  Frequently Asked Questions
                </h2>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                  Everything you need to know about our {service.title.toLowerCase()} process, pricing, and delivery.
                </p>
              </Reveal>

              <div className="space-y-3 max-w-4xl">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={faq.q || idx}
                      className={`rounded-2xl border transition-all duration-200 overflow-hidden ${isOpen
                          ? 'border-cyan-200 bg-sky-50/40 shadow-sm'
                          : 'border-gray-100 bg-white hover:border-gray-200'
                        }`}
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 font-bold text-ink text-base sm:text-lg focus:outline-none"
                      >
                        <span className="flex items-center gap-3">
                          <span className="text-xs font-black text-[#00a4d8] bg-sky-100/80 px-2 py-1 rounded-lg">
                            Q{idx + 1}
                          </span>
                          {faq.q}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#00a4d8]' : ''
                            }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-100/60">
                          {formatText(faq.a)}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* Success Stories */}
          <div className="-mx-4 sm:mx-0">
            <SuccessStories serviceSlug={slug} serviceTitle={service.title} />
          </div>

          {/* Other Services */}
          <section id="other-services" className="scroll-mt-28 py-12 lg:py-16 border-t border-gray-100">
            <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
              <div>
                <p className="eyebrow mb-2">Explore more</p>
                <h2 className="text-xl sm:text-2xl font-extrabold text-ink">Other Services</h2>
              </div>
              <Link
                to="/services"
                className="text-sm font-semibold text-[#00a4d8] inline-flex items-center gap-1 hover:gap-2 transition-all"
              >
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </Reveal>

            <Stagger className="grid sm:grid-cols-3 gap-5" staggerDelay={0.07}>
              {others.map((s) => {
                const OtherIcon = resolveIcon(s.icon);
                return (
                  <StaggerItem key={s.slug}>
                    <Link
                      to={`/${s.slug}`}
                      className="group block bg-white rounded-3xl border border-gray-100 p-6 shadow-card hover:shadow-elev hover:border-cyan-200 hover:-translate-y-1 transition-all h-full"
                    >
                      <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-sky-50 to-cyan-50 border border-cyan-100 text-[#00a4d8] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                        <OtherIcon className="w-5 h-5 object-contain" />
                      </span>
                      <h3 className="font-extrabold text-ink mb-1.5 group-hover:text-[#00a4d8] transition-colors">
                        {s.title}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                        {s.desc}
                      </p>
                    </Link>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </section>
        </div>
      </div>

      {/* Inquiry Form */}
      {isAppJourney ? (
        <div id="app-journey" className="scroll-mt-28">
          <AppJourneyWizard serviceTitle={service.title} />
        </div>
      ) : (
        <div id="service-inquiry" className="scroll-mt-28">
          <ServiceInquiryForm defaultService={service.title} />
        </div>
      )}

      {/* Custom or Global CTA Banner */}
      <CtaBanner
        eyebrow={service.ctaBannerEyebrow}
        title={service.ctaBannerTitle}
        desc={service.ctaBannerDesc}
        buttonText={service.ctaBannerButtonText}
        buttonLink={service.ctaBannerButtonLink}
      />
    </div>
  );
}
