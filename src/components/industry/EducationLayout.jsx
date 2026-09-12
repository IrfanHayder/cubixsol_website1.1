import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  GraduationCap, BookOpen, School, Users, BarChart3,
  Smartphone, Shield, CheckCircle2, ArrowRight, Sparkles,
  Layers, MessageSquare, Award, FileText, Cpu, Check
} from 'lucide-react';
import Reveal, { Stagger, StaggerItem } from '../Reveal';

const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&h=800&q=75',
  classroom: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&h=700&q=75',
  students: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&h=700&q=75',
  laptop: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&h=700&q=75',
  library: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=900&h=600&q=75',
  tablet: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&h=600&q=75',
  collab: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=900&h=600&q=75',
};

const workVisual = [
  { img: IMAGES.classroom, icon: School, key: 0 },
  { img: IMAGES.students, icon: GraduationCap, key: 1 },
  { img: IMAGES.laptop, icon: Layers, key: 2 },
  { img: IMAGES.collab, icon: Users, key: 3 },
];

export default function EducationLayout({ industry }) {
  const approachTitle = industry.approachTitle || 'The Cubixsol Approach';
  const approachItems = industry.approachItems && industry.approachItems.length > 0 ? industry.approachItems : [
    {
      title: 'We Lead with Design',
      subtitle: 'Our team of designers, skilled in product design, UI/UX, and accessibility, create experiences that are:',
      points: [
        { heading: 'Timely', text: 'We design at the pace users need, with rapid learning and iteration built in.' },
        { heading: 'Useful', text: 'Success is measured by how easily users achieve their goals.' },
        { heading: 'Delightful', text: 'We create thoughtful experiences that feel worthwhile.' },
      ],
    },
    {
      title: 'We Leverage Open Source',
      subtitle: 'With thousands of contributions to dozens of open-source projects, we have deep expertise that translates into:',
      points: [
        { heading: 'Sovereignty', text: 'Avoid vendor lock-in and securely deploy on-premises or in private clouds.' },
        { heading: 'Flexibility', text: 'Customize source code and choose licensing that fits your requirements.' },
        { heading: 'Economy', text: 'Reduce hosting, maintenance, and development costs through free, adaptable, AI-ready open-source technologies at greater scale.' },
      ],
    },
    {
      title: 'We Accelerate with AI',
      subtitle: 'We have been working with generative AI for over a decade, applying it to:',
      points: [
        { heading: 'Build Smarter Software', text: 'We integrate agentic workflows using LangGraph, open-weight, and frontier models tailored to user needs, prioritizing sovereignty and adaptability.' },
        { heading: 'Build It Faster Than Ever', text: 'Our teams use Codex, Claude, and multi-agent workflows while managing security, performance, cost, and governance without compromising speed or quality.' },
      ],
    },
  ];

  const solutionsTitle = industry.solutionsTitle || 'Our EdTech Solutions';
  const solutionsSubtitle = industry.solutionsSubtitle || 'Purpose-built solutions for education organizations, backed by the cross-industry capabilities every technology team needs.';
  const solutionsItems = industry.solutionsItems && industry.solutionsItems.length > 0 ? industry.solutionsItems : [
    {
      title: 'Modern LMS Systems for Desktop and Mobile',
      body: 'We have deep expertise in best-in-class open-source learning management systems, including Open edX, Moodle, and Edly — our own Open edX fork designed for the enterprise. Every solution comes with self-hosting or managed hosting on AWS, GCP, Oracle, and Azure.',
    },
    {
      title: 'Accelerated Content Production',
      body: 'We have world-class capability to produce learning content of every kind: videos, interactive activities, assessments, and AI-based evaluations. Our Compose product delivers the fastest possible course authoring experience, driven by AI and letting creators author directly in all major LMSes, including Canvas and Blackboard.',
    },
    {
      title: 'Data Management, Analytics and ML',
      body: "Our data engineering team has deep expertise in edTech data standards like Caliper and xAPI. Understanding, warehousing, and analyzing this data, and building ML-based prediction and forecasting pipelines on top of it, is Cubixsol's forte.",
    },
  ];

  const workAreas = industry.workAreas || [];
  const products = industry.productsBuilt || [];
  const cases = industry.caseStudies || [];
  const services = industry.servicesWeOffer || [];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. The Approach Section (Exact Match to Design with Red/Accent Top Stripe) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight">
            {approachTitle}
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {approachItems.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-2xl bg-[#f4f7fa] border border-slate-200/80 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Red Accent Top Indicator Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#e11d48]" />

              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-extrabold text-ink tracking-tight pt-1">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                    {item.subtitle}
                  </p>
                )}

                <div className="space-y-3.5 pt-2">
                  {item.points && item.points.map((pt, pIdx) => (
                    <div key={pIdx} className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                      <strong className="font-extrabold text-ink block mb-0.5">{pt.heading}</strong>
                      <span className="text-gray-600 text-xs sm:text-sm">{pt.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 2. EdTech Solutions Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-8 sm:mb-10 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-2">
            {solutionsTitle}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            {solutionsSubtitle}
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {solutionsItems.map((sol, idx) => (
            <motion.div
              key={sol.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-2xl bg-[#f4f7fa] border border-slate-200/80 p-6 sm:p-8 flex flex-col justify-start relative overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Red Accent Top Indicator Bar */}
              <div className="w-12 h-1 bg-[#e11d48] rounded-full mb-4" />

              <h3 className="text-lg sm:text-xl font-extrabold text-ink tracking-tight mb-3">
                {sol.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {sol.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Education Visual Band */}
      <section className="relative overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-5">
          <Reveal className="lg:col-span-7" scale>
            <div className="relative rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] shadow-elev group">
              <motion.img
                src={IMAGES.hero}
                alt="Students collaborating"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                initial={{ scale: 1.05 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-500/30 backdrop-blur-md text-primary-200 text-xs font-bold uppercase tracking-wider mb-2">
                  <GraduationCap className="w-3.5 h-3.5" /> Next-Gen Learning Platforms
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white max-w-xl leading-snug">
                  Platforms that help learners finish — and institutions stay in control
                </h2>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="relative rounded-2xl overflow-hidden min-h-[140px] shadow-card group">
              <img src={IMAGES.tablet} alt="Learning on tablet" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-ink/30" />
              <p className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold">
                Parent &amp; Learner Mobile Apps
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden min-h-[140px] shadow-card group">
              <img src={IMAGES.library} alt="Digital learning" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-primary-900/30" />
              <p className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold">
                Digital Course Catalogs &amp; LMS
              </p>
            </div>
            <div className="col-span-2 rounded-2xl bg-gradient-to-br from-indigo-900 via-primary-900 to-violet-950 text-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-soft">
              <div>
                <p className="text-xl sm:text-2xl font-extrabold">Education-Ready Tech</p>
                <p className="text-white/75 text-xs sm:text-sm mt-1">
                  Discovery &rarr; Build &rarr; Launch for K-12, Universities &amp; EdTech
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary-700 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl hover:bg-primary-50 transition shrink-0 shadow"
              >
                Talk to us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Work Areas with alternating layout */}
      {workAreas.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="eyebrow mb-2">Where We Engage</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-3">
              Built for Real Education Environments
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
              From campus operations to product-led EdTech — we match engineering to how teachers,
              parents, and learners actually interact.
            </p>
          </div>
          <div className="space-y-8 lg:space-y-12">
            {workAreas.map((w, i) => {
              const vis = workVisual[i % workVisual.length];
              const Icon = vis.icon;
              const flip = i % 2 === 1;
              return (
                <motion.div
                  key={w.title}
                  className={`grid lg:grid-cols-2 gap-6 lg:gap-10 items-center ${
                    flip ? 'lg:[&>*:first-child]:order-2' : ''
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/11] shadow-elev group">
                    <img
                      src={vis.img}
                      alt={w.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-white/95 text-primary-600 flex items-center justify-center shadow">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className={flip ? 'lg:pr-4' : 'lg:pl-4'}>
                    <p className="text-xs font-bold tracking-widest uppercase text-primary-600 mb-2">
                      Focus {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-ink mb-3">{w.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-5">{w.body}</p>
                    <ul className="space-y-2">
                      {(industry.points || []).slice(i, i + 2).map((pt) => (
                        <li key={pt} className="flex gap-2 text-xs sm:text-sm font-medium text-ink">
                          <CheckCircle2 className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {/* 5. Products */}
      {products.length > 0 && (
        <section className="relative py-12 lg:py-16 rounded-3xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0b1f4a] via-[#121a3a] to-[#1e1535] text-white">
          <div className="mb-8 max-w-xl">
            <p className="text-primary-300 text-xs font-bold tracking-widest uppercase mb-2">
              Our Products
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              Education Products We Design &amp; Ship
            </h2>
            <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
              Live in our product suite — school communication, learner engagement, and OCR tools.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {products.map((p, idx) => {
              const imgs = [IMAGES.tablet, IMAGES.laptop, IMAGES.library];
              return (
                <Link
                  key={p.slug}
                  to={`/products/${p.slug}`}
                  className="group block h-full rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-primary-400/40 transition"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={imgs[idx % imgs.length]}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-wide text-primary-300 mb-1">
                      {p.name}
                    </p>
                    <p className="text-xs text-white/80 leading-relaxed mb-3">{p.blurb}</p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-300 group-hover:gap-2.5 transition-all">
                      View product <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* 6. Case Studies */}
      {cases.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2">Track Record</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                Education Work We Have Shipped
              </h2>
            </div>
            <Link to="/projects" className="text-sm font-bold text-primary-600 inline-flex items-center gap-1">
              All projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {cases.map((c, i) => {
              const imgs = [IMAGES.students, IMAGES.laptop, IMAGES.classroom];
              return (
                <article key={c.title} className="h-full rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-card hover:shadow-elev transition flex flex-col">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img
                      src={imgs[i % imgs.length]}
                      alt={c.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {c.tags?.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-white/95 text-ink shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-extrabold text-ink mb-2 text-sm sm:text-base leading-snug">{c.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed flex-1">{c.result}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* 7. Services Grid */}
      {services.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-3xl bg-indigo-50/50 border border-indigo-100">
            <h3 className="text-xl font-extrabold text-ink mb-6">Education Engineering Services</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {services.map((s) => (
                <div key={s} className="flex items-center gap-2.5 p-3 rounded-xl bg-white shadow-sm border border-indigo-100/60">
                  <CheckCircle2 className="w-4 h-4 text-primary-600 shrink-0" />
                  <span className="text-xs font-semibold text-ink">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
