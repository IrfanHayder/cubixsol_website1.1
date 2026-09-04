import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, Globe } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { processSteps, whyChoose } from '../data/content';
import Breadcrumb from '../components/Breadcrumb';
import CtaBanner from '../components/CtaBanner';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';
import { useServices } from '../context/ServicesContext';
import { formatInline } from '../utils/formatText';

const steps = Array.isArray(processSteps) ? processSteps : [];
const reasons = Array.isArray(whyChoose) ? whyChoose : [];

export default function Services() {
  const { services: rawServices, loading, resolveIcon } = useServices();

  const services = (Array.isArray(rawServices) ? rawServices : [])
    .filter((s) => s && s.slug)
    .map((s) => ({
      slug: s.slug,
      title: s.title || s.slug,
      menuTitle: s.menuTitle,
      desc: s.desc || '',
      color: s.color || 'text-primary-600 bg-primary-50',
      icon: s.icon,
      heroImage: s.heroImage,
      gradient: s.gradient,
    }));


  if (loading) {
    return (
      <div>
        <Breadcrumb current="Services" />
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-400">
          <LucideIcons.Loader2 className="w-8 h-8 animate-spin text-primary-600" />
          <span className="text-sm font-medium">Loading services...</span>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Breadcrumb current="Services" />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-14 lg:pb-20">
        <Reveal className="max-w-3xl" scale>
          <p className="eyebrow mb-3">Our Services</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-ink mb-5 tracking-tight">
            Powerful digital solutions that drive{' '}
            <span className="bg-clip-text text-transparent bg-primary-gradient">real results</span>
          </h1>
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl leading-relaxed">
            Strategy, design, engineering and growth — under one roof. Pick a service to see how we
            deliver, or tell us your goal and we will map the right path.
          </p>
          <div className="flex flex-wrap gap-4 mt-6 text-sm font-medium text-gray-500">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-primary-600" /> Modern stack
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-primary-600" /> Scalable & secure
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-primary-600" /> Transparent delivery
            </span>
          </div>
        </Reveal>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
        {services.length === 0 ? (
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
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${s.color} group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-6 h-6" />
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

      <section className="bg-gray-50 py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-xl mx-auto mb-12">
            <p className="eyebrow mb-3">Our Process</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink mb-3">
              How we work
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              A clear path from idea to launch — and continuous improvement after.
            </p>
          </Reveal>
          <Stagger
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6"
            staggerDelay={0.08}
          >
            {steps.map((p) => (
              <StaggerItem key={p.step}>
                <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 h-full shadow-card hover:shadow-elev transition-shadow">
                  <span className="text-xl sm:text-2xl font-extrabold text-primary-200">
                    {p.step}
                  </span>
                  <h3 className="font-bold text-ink text-sm sm:text-base mt-2 mb-1">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{p.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <Reveal className="bg-primary-50/70 rounded-3xl border border-primary-100/60 p-6 sm:p-10 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="eyebrow mb-3">Why Cubixsol</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink mb-4">
                More than just delivery
              </h2>
              <p className="text-gray-500 mb-6 text-sm sm:text-base leading-relaxed">
                Quality, transparency and long-term partnership are built into how we scope, build
                and support every engagement.
              </p>
              <Link to="/contact" className="btn-primary">
                Let's work together <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {reasons.map((w) => {
                const WhyIcon = resolveIcon(w.icon);
                return (
                  <div
                    key={w.title}
                    className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-card"
                  >
                    <span className="w-10 h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center mb-3">
                      <WhyIcon className="w-5 h-5" />
                    </span>
                    <h3 className="font-bold text-sm text-ink mb-1">{w.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{w.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-20">
        <Reveal className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-10 shadow-card">
          <h2 className="text-xl sm:text-2xl font-extrabold text-ink mb-6 text-center">
            What you can expect on every project
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              'Dedicated project communication',
              'Milestone-based delivery',
              'Clean, documented code',
              'Post-launch support options',
            ].map((item) => (
              <div key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                <CheckCircle2 className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <CtaBanner />
    </div>
  );
}
