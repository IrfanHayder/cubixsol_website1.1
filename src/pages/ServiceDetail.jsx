import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
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
import { useServices } from '../context/ServicesContext';

export default function ServiceDetail() {
  const { slug } = useParams();
  const { services, loading, resolveIcon } = useServices();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3 text-gray-400">
        <LucideIcons.Loader2 className="w-8 h-8 animate-spin text-primary-600" />
        <span className="text-sm font-medium">Loading service details...</span>
      </div>
    );
  }

  const service = (Array.isArray(services) ? services : []).find((s) => s.slug === slug);

  if (!service) return <Navigate to="/services" replace />;

  const others = (Array.isArray(services) ? services : []).filter((s) => s.slug !== slug).slice(0, 3);
  const IconComponent = resolveIcon(service.icon);
  const features = Array.isArray(service?.features) ? service.features : [];
  const tech = Array.isArray(service.tech) ? service.tech : [];
  const outcomes = Array.isArray(service.outcomes) ? service.outcomes : [];

  const isUx = slug === 'ui-ux-design';
  const isMobile = slug === 'mobile-app-development';
  const isIos = slug === 'ios-development';
  const isAndroid = slug === 'android-development';
  const isAppJourney = isMobile || isIos || isAndroid;
  const isDevOps = slug === 'devops';

  const scrollToForm = (e) => {
    e.preventDefault();
    document
      .getElementById(isAppJourney ? 'app-journey' : 'service-inquiry')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div>
      <Breadcrumb current={service.title} items={[{ label: 'Services', to: '/services' }]} />

      <section
        id="overview"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12 lg:pb-16 scroll-mt-28"
      >
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <Reveal direction="right" scale>
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-primary-600 mb-5 transition"
            >
              <ArrowLeft className="w-4 h-4" /> All services
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${service.color || 'text-primary-600 bg-primary-50'}`}
              >
                <IconComponent className="w-6 h-6" />
              </span>
              <p className="eyebrow !mb-0">{service.title}</p>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-ink tracking-tight leading-[1.15] mb-4">
              {service.title}
            </h1>
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
              {service.longDesc || service.desc}
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href={isAppJourney ? '#app-journey' : '#service-inquiry'}
                onClick={scrollToForm}
                className="btn-primary"
              >
                Let's Talk <ArrowRight className="w-4 h-4" />
              </a>
              <Link to="/projects" className="btn-outline">
                See related work
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5 max-w-xl">
              <a
                href="https://www.goodfirms.co/company/cubixsol"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-100 bg-white px-3 py-2 shadow-sm hover:border-primary-200 hover:shadow-md transition"
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
                className="inline-flex items-center gap-2 rounded-xl border border-gray-100 bg-white px-3 py-2 shadow-sm hover:border-primary-200 hover:shadow-md transition"
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
                className={`absolute -inset-3 rounded-[1.75rem] bg-gradient-to-br ${service.gradient || 'from-primary-500 to-primary-700'} opacity-20 blur-2xl`}
              />
              <div className="relative rounded-3xl overflow-hidden shadow-elev aspect-[4/3] bg-gray-100">
                {service.heroImage ? (
                  <img
                    src={service.heroImage}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                    width={1000}
                    height={750}
                  />
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-br ${service.gradient || 'from-primary-500 to-primary-700'} flex items-center justify-center`}
                  >
                    <IconComponent className="w-28 h-28 text-white/90" strokeWidth={1.25} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="inline-flex items-center gap-2 bg-white/95 backdrop-blur text-ink text-xs font-bold px-3 py-1.5 rounded-full shadow">
                    <IconComponent className="w-3.5 h-3.5 text-primary-600" />
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
          <section id="capabilities" className="scroll-mt-28 pb-12 lg:pb-16">
            <Reveal className="mb-6">
              <p className="eyebrow mb-2">What's included</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">Capabilities</h2>
            </Reveal>
            {features.length > 0 ? (
              <Stagger className="grid sm:grid-cols-2 gap-3 sm:gap-4" staggerDelay={0.05}>
                {features.map((f) => (
                  <StaggerItem key={f} hover>
                    <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-card flex gap-3 h-full hover:-translate-y-0.5 hover:shadow-elev transition-all">
                      <CheckCircle2 className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                      <p className="text-sm font-medium text-ink leading-relaxed">{f}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            ) : null}
          </section>

          <section id="tech-outcomes" className="scroll-mt-28 pb-12 lg:pb-16">
            <div className="grid sm:grid-cols-2 gap-8">
              <Reveal direction="right">
                <p className="eyebrow mb-2">Stack</p>
                <h2 className="text-xl sm:text-2xl font-extrabold text-ink mb-4">
                  Technologies we use
                </h2>
                <div className="flex flex-wrap gap-2">
                  {tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 rounded-full text-sm font-semibold bg-primary-50 text-primary-700 border border-primary-100"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Reveal>
              <Reveal direction="left" delay={0.1}>
                <p className="eyebrow mb-2">Impact</p>
                <h2 className="text-xl sm:text-2xl font-extrabold text-ink mb-4">
                  Typical outcomes
                </h2>
                <ul className="space-y-2.5">
                  {outcomes.map((o) => (
                    <li key={o} className="flex items-center gap-2.5 text-sm text-gray-600">
                      <span className="w-2 h-2 rounded-full bg-primary-500 shrink-0" />
                      {o}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </section>

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

          <div className="-mx-4 sm:mx-0">
            <SuccessStories serviceSlug={slug} serviceTitle={service.title} />
          </div>

          <section id="other-services" className="scroll-mt-28 py-12 lg:py-16">
            <Reveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
              <div>
                <p className="eyebrow mb-2">Explore more</p>
                <h2 className="text-xl sm:text-2xl font-extrabold text-ink">Other services</h2>
              </div>
              <Link
                to="/services"
                className="text-sm font-semibold text-primary-600 inline-flex items-center gap-1 hover:gap-2 transition-all"
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
                      to={`/services/${s.slug}`}
                      className="block bg-white rounded-2xl border border-gray-100 p-5 shadow-card hover:shadow-elev hover:-translate-y-1 transition-all h-full"
                    >
                      <span
                        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color || 'text-primary-600 bg-primary-50'}`}
                      >
                        <OtherIcon className="w-5 h-5" />
                      </span>
                      <h3 className="font-bold text-ink mb-1">{s.title}</h3>
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{s.desc}</p>
                    </Link>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </section>
        </div>
      </div>

      {isAppJourney && (
        <div id="app-journey" className="scroll-mt-28">
          <AppJourneyWizard serviceTitle={service.title} />
        </div>
      )}
      {!isAppJourney && (
        <div id="service-inquiry" className="scroll-mt-28">
          <ServiceInquiryForm defaultService={service.title} />
        </div>
      )}

      <CtaBanner />
    </div>
  );
}
