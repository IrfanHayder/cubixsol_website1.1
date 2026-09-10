import { Link, useParams, Navigate } from 'react-router-dom';
import { useState } from 'react';
import {
  ArrowLeft, ArrowRight, CheckCircle2, Quote, ChevronDown,
  Target, Layers, Shield, Zap, Users, LineChart,
} from 'lucide-react';
import * as Icons from 'lucide-react';
import { industries } from '../data/content';
import { useServices } from '../context/ServicesContext';
import CtaBanner from '../components/CtaBanner';
import ServiceInquiryForm from '../components/ServiceInquiryForm';
import EducationIndustrySections from '../components/EducationIndustrySections';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';
import DynamicIcon from '../components/DynamicIcon';


const approach = [
  { icon: Target, title: 'Domain-first discovery', body: 'We learn your regulations, users, and constraints before proposing stack or scope.' },
  { icon: Layers, title: 'Modular delivery', body: 'Ship value in slices — MVP to scale — without locking you into a monolith of waste.' },
  { icon: Shield, title: 'Security minded', body: 'Access, data handling, and integrations designed with real operational risk in mind.' },
  { icon: Zap, title: 'Speed with clarity', body: 'Short feedback loops, visible progress, and decisions you can track.' },
];

const faqsFor = (title) => [
  {
    q: `Do you have ${title} experience?`,
    a: `Yes. We staff teams that have shipped in ${title.toLowerCase()} contexts and adapt patterns to your market, compliance needs, and users.`,
  },
  {
    q: 'Can you work with our existing systems?',
    a: 'Most engagements include integrations with tools you already run — APIs, data sync, SSO, or phased replacement where needed.',
  },
  {
    q: 'How do projects usually start?',
    a: 'A focused discovery or pilot clarifies goals, risks, and a practical first release — then we scale delivery with clear milestones.',
  },
  {
    q: 'Who owns the code and product?',
    a: 'Ownership is defined in your contract. We typically transfer deliverables to you and can support handover to your internal team.',
  },
];

export default function IndustryDetail() {
  const { slug } = useParams();
  const { services, resolveIcon } = useServices();
  const ind = industries.find((i) => i.slug === slug);
  const [faqOpen, setFaqOpen] = useState(0);
  if (!ind) return <Navigate to="/industries" replace />;

  const Icon = Icons[ind.icon] || Icons.Building2;
  const others = industries.filter((i) => i.slug !== slug).slice(0, 4);
  const relatedServices = services.slice(0, 6);
  const educationFaqs = [
    {
      q: 'Have you built education products before?',
      a: 'Yes. We ship education-focused digital products and accessibility tools — including Image to Text for OCR on worksheets and scans, plus learning and school communication experiences tailored to institutions.',
    },
    {
      q: 'Can you work with our existing SIS or LMS?',
      a: 'Most education projects include integrations — SSO, student information systems, payments, or content providers — via APIs and phased rollout.',
    },
    {
      q: 'Do you support mobile for parents and students?',
      a: 'Yes. We build responsive web and mobile experiences so parents, teachers, and learners can access the right flows on the devices they already use.',
    },
    {
      q: 'How do education projects usually start?',
      a: 'We start with discovery: users, compliance constraints, and success metrics. Then a pilot or first release proves value before scaling modules.',
    },
  ];
  const faqs = ind.slug === 'education' ? educationFaqs : faqsFor(ind.title);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-violet-50/40 pointer-events-none" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-primary-gradient opacity-[0.03] blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <Reveal scale>
              <Link
                to="/industries"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-primary-600 mb-5 transition"
              >
                <ArrowLeft className="w-4 h-4" /> All industries
              </Link>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shadow-sm">
                  <Icon className="w-6 h-6" />
                </span>
                <p className="eyebrow !mb-0">{ind.title}</p>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-ink tracking-tight leading-[1.12] mb-4">
                Digital products for{' '}
                <span className="bg-clip-text text-transparent bg-primary-gradient">{ind.title}</span>
              </h1>
              <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-7 max-w-lg">
                {ind.desc}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/contact" className="btn-primary">
                  Discuss your project <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="#industry-inquiry" className="btn-outline">
                  Get a proposal
                </a>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.1}>
              <div className="rounded-2xl sm:rounded-3xl border border-gray-100 bg-white p-6 sm:p-8 shadow-elev relative overflow-hidden">
                <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-primary-100/60 blur-2xl pointer-events-none" />
                <Quote className="w-8 h-8 text-primary-300 mb-4 relative" />
                <p className="text-ink font-medium leading-relaxed mb-6 relative text-base sm:text-lg">
                  &ldquo;{ind.testimonial.quote}&rdquo;
                </p>
                <div className="relative flex items-center gap-3">
                  <span className="w-11 h-11 rounded-full bg-primary-gradient text-white font-bold flex items-center justify-center text-sm">
                    {ind.testimonial.name.charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink">{ind.testimonial.name}</p>
                    <p className="text-xs text-gray-500">{ind.testimonial.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-gray-100 bg-gray-50/70">
        <Stagger
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center"
          staggerDelay={0.06}
        >
          {[
            ['150+', 'Clients served'],
            ['10+', 'Years shipping'],
            ['98%', 'Satisfaction'],
            ['20+', 'Countries'],
          ].map(([n, l]) => (
            <StaggerItem key={l} hover>
              <p className="text-2xl sm:text-3xl font-extrabold text-ink">{n}</p>
              <p className="text-xs text-gray-500 mt-1">{l}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* What we deliver */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <Reveal className="mb-8 max-w-xl">
          <p className="eyebrow mb-2">Capabilities</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
            What we deliver in {ind.title}
          </h2>
        </Reveal>
        <Stagger className="grid sm:grid-cols-2 gap-3 sm:gap-4" staggerDelay={0.05}>
          {ind.points.map((p) => (
            <StaggerItem key={p} hover>
              <div className="flex gap-3 rounded-2xl border border-gray-100 bg-white p-4 sm:p-5 shadow-card h-full">
                <CheckCircle2 className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                <p className="text-sm font-semibold text-ink leading-relaxed">{p}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {ind.slug === 'education' && <EducationIndustrySections industry={ind} />}

      {/* Approach */}
      <section className="bg-[#f0f6fc] py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-10">
            <p className="eyebrow mb-2">How we work</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              A modern delivery approach
            </h2>
          </Reveal>
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" staggerDelay={0.06}>
            {approach.map((a) => {
              const AIcon = a.icon;
              return (
                <StaggerItem key={a.title} hover>
                  <div className="h-full rounded-2xl bg-white border border-gray-100 p-5 shadow-card">
                    <span className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-3">
                      <AIcon className="w-5 h-5" strokeWidth={1.75} />
                    </span>
                    <h3 className="font-bold text-ink mb-1.5 text-sm sm:text-base">{a.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{a.body}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* Challenges / outcomes split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <Reveal direction="right">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-4">
              Built for real {ind.title.toLowerCase()} constraints
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6">
              {ind.short} We combine product thinking with engineering discipline so your roadmap
              stays realistic — and your users feel the difference.
            </p>
            <ul className="space-y-3">
              {[
                'Stakeholder-aligned discovery',
                'UX that matches how your users actually work',
                'Integrations with the systems you already trust',
                'Handover and documentation your team can own',
              ].map((line) => (
                <li key={line} className="flex gap-2.5 text-sm font-medium text-ink">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 shrink-0" />
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal direction="left" delay={0.08}>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Users, label: 'User-centered', sub: 'Research & UX' },
                { icon: LineChart, label: 'Measurable', sub: 'Outcomes first' },
                { icon: Shield, label: 'Trusted', sub: 'Secure defaults' },
                { icon: Zap, label: 'Agile', sub: 'Iterative releases' },
              ].map((c) => {
                const CIcon = c.icon;
                return (
                  <div
                    key={c.label}
                    className="rounded-2xl border border-gray-100 bg-gray-50/80 p-4 sm:p-5 text-center hover:bg-white hover:shadow-card transition"
                  >
                    <span className="w-10 h-10 mx-auto rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-2">
                      <CIcon className="w-5 h-5" />
                    </span>
                    <p className="text-sm font-bold text-ink">{c.label}</p>
                    <p className="text-[11px] text-gray-500">{c.sub}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related services */}
      <section className="border-t border-gray-100 bg-gray-50/50 py-12 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <p className="eyebrow mb-1">Services</p>
              <h2 className="text-xl sm:text-2xl font-extrabold text-ink">
                Often paired with {ind.title} work
              </h2>
            </div>
            <Link to="/services" className="text-sm font-bold text-primary-600 inline-flex items-center gap-1">
              All services <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3" staggerDelay={0.04}>
            {relatedServices.map((s) => {
              const SIcon = resolveIcon(s.icon);
              return (
                <StaggerItem key={s.slug} hover>
                  <Link
                    to={`/${s.slug}`}
                    className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3.5 shadow-sm hover:shadow-card transition h-full"
                  >
                    <span className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${s.color}`}>
                      <SIcon className="w-4 h-4" />
                    </span>
                    <span className="text-sm font-semibold text-ink leading-snug">{s.title}</span>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* Mid CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <Reveal>
          <div className="rounded-2xl sm:rounded-3xl bg-ink text-white px-6 sm:px-10 py-8 sm:py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-primary-500/25 blur-2xl pointer-events-none" />
            <div className="relative">
              <h3 className="text-xl sm:text-2xl font-extrabold mb-2">
                Planning a {ind.title.toLowerCase()} product?
              </h3>
              <p className="text-white/60 text-sm max-w-md leading-relaxed">
                Tell us your goals and constraints — we will suggest a practical path and team shape.
              </p>
            </div>
            <Link to="/contact" className="relative btn-primary shrink-0">
              Talk to Cubixsol <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="bg-[#f0f6fc] py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-8">
            <p className="eyebrow mb-2">FAQ</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">Common questions</h2>
          </Reveal>
          <div className="space-y-2">
            {faqs.map((item, i) => {
              const open = faqOpen === i;
              return (
                <Reveal key={item.q} delay={i * 0.04}>
                  <div className="rounded-xl bg-white border border-gray-100 overflow-hidden shadow-sm">
                    <button
                      type="button"
                      onClick={() => setFaqOpen(open ? -1 : i)}
                      className="w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-4 text-left"
                    >
                      <span className="font-semibold text-ink text-sm sm:text-base">{item.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-primary-600 shrink-0 transition ${open ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {open && (
                      <div className="px-4 sm:px-5 pb-4 text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-3">
                        {item.a}
                      </div>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Other industries */}
      {others.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
          <Reveal className="mb-5">
            <h2 className="text-xl sm:text-2xl font-extrabold text-ink">Explore more industries</h2>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            {others.map((o) => {
              return (
                <Link
                  key={o.slug}
                  to={`/industries/${o.slug}`}
                  className="group rounded-2xl border border-gray-100/90 bg-white p-4 hover:shadow-card hover:border-primary-200 hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row gap-3 items-start sm:items-center"
                >
                  <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-50 to-cyan-50 border border-cyan-100/80 text-[#00a4d8] flex items-center justify-center shrink-0 group-hover:bg-gradient-to-br group-hover:from-[#00a4d8] group-hover:via-[#0284c7] group-hover:to-[#0369a1] group-hover:border-transparent group-hover:shadow-md group-hover:shadow-[#00a4d8]/30 group-hover:scale-105 group-hover:rotate-2 transition-all duration-300">
                    <DynamicIcon
                      icon={o.icon}
                      title={o.title}
                      className="w-6 h-6 object-contain text-[#00a4d8] group-hover:text-white group-hover:brightness-0 group-hover:invert transition-all duration-300"
                    />
                  </span>
                  <span className="font-bold text-ink text-sm leading-snug group-hover:text-[#00a4d8] transition-colors">{o.title}</span>

                </Link>
              );
            })}
          </div>

        </section>
      )}

      <div id="industry-inquiry">
        <ServiceInquiryForm defaultService={`${ind.title} project`} />
      </div>
      <CtaBanner />
    </div>
  );
}
