import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, CheckCircle2, BookOpen, School, Users, BarChart3,
  Smartphone, Shield, GraduationCap, MessageSquare, Layers,
} from 'lucide-react';
import Reveal, { Stagger, StaggerItem } from './Reveal';

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

const capabilityIcons = [BookOpen, School, Users, BarChart3, Smartphone, Shield];

export default function EducationIndustrySections({ industry }) {
  const workAreas = industry.workAreas || [];
  const products = industry.productsBuilt || [];
  const cases = industry.caseStudies || [];
  const services = industry.servicesWeOffer || [];

  return (
    <>
      {/* Visual band */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="grid lg:grid-cols-12 gap-4 sm:gap-5">
            <Reveal className="lg:col-span-7" scale>
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] shadow-elev">
                <motion.img
                  src={IMAGES.hero}
                  alt="Students collaborating"
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.08 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
                  <p className="text-primary-300 text-xs font-bold tracking-widest uppercase mb-2">
                    Education technology
                  </p>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white max-w-lg leading-snug">
                    Platforms that help learners finish — and institutions stay in control
                  </h2>
                </div>
              </div>
            </Reveal>
            <div className="lg:col-span-5 grid grid-cols-2 gap-4 sm:gap-5">
              <Reveal delay={0.08} className="col-span-2 sm:col-span-1">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-auto sm:h-full min-h-[140px] shadow-card">
                  <img src={IMAGES.tablet} alt="Learning on tablet" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-ink/25" />
                  <p className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold">
                    Parent & learner apps
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.14} className="col-span-2 sm:col-span-1">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-auto sm:h-full min-h-[140px] shadow-card">
                  <img src={IMAGES.library} alt="Digital learning" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-primary-900/30" />
                  <p className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold">
                    Content & catalogs
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.2} className="col-span-2">
                <div className="rounded-2xl bg-primary-gradient text-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-soft">
                  <div>
                    <p className="text-2xl sm:text-3xl font-extrabold">Education-ready</p>
                    <p className="text-white/75 text-sm mt-1">
                      Discovery → build → launch for schools & EdTech
                    </p>
                  </div>
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-white text-primary-700 font-bold text-sm px-5 py-2.5 rounded-lg hover:bg-primary-50 transition shrink-0"
                  >
                    Talk to us <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Work areas with images */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <Reveal className="max-w-2xl mb-10">
          <p className="eyebrow mb-2">Where we engage</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-3">
            Built for real education environments
          </h2>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
            From campus operations to product-led EdTech — we match engineering to how teachers,
            parents, and learners actually work.
          </p>
        </Reveal>
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
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/11] shadow-elev group">
                  <img
                    src={vis.img}
                    alt={w.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-white/95 text-primary-600 flex items-center justify-center shadow">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <div className={flip ? 'lg:pr-4' : 'lg:pl-4'}>
                  <p className="text-xs font-bold tracking-widest uppercase text-primary-600 mb-2">
                    Focus {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-ink mb-3">{w.title}</h3>
                  <p className="text-gray-500 leading-relaxed mb-5">{w.body}</p>
                  <ul className="space-y-2">
                    {(industry.points || []).slice(i, i + 2).map((pt) => (
                      <li key={pt} className="flex gap-2 text-sm font-medium text-ink">
                        <CheckCircle2 className="w-4.5 h-4.5 text-primary-500 shrink-0 mt-0.5" />
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

      {/* Products */}
      {products.length > 0 && (
        <section className="relative py-12 lg:py-16 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0b1f4a] via-[#121a3a] to-[#1e1535]" />
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-400/40 via-transparent to-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal className="mb-8 text-white max-w-xl">
              <p className="text-primary-300 text-xs font-bold tracking-widest uppercase mb-2">
                Our products
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
                Education products we design &amp; ship
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                Live in our product suite — school communication, learner engagement, and multi-org learning.
              </p>
            </Reveal>
            <Stagger className="grid sm:grid-cols-3 gap-4" staggerDelay={0.08}>
              {products.map((p, idx) => {
                const imgs = [IMAGES.tablet, IMAGES.laptop, IMAGES.library];
                return (
                  <StaggerItem key={p.slug} hover>
                    <Link
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
                        <p className="text-[11px] font-bold uppercase tracking-wide text-primary-300 mb-1">
                          {p.name}
                        </p>
                        <p className="text-sm text-white/80 leading-relaxed mb-3">{p.blurb}</p>
                        <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-300 group-hover:gap-2.5 transition-all">
                          View product <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </Link>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>
      )}

      {/* Cases */}
      {cases.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <Reveal className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2">Track record</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                Education work we have shipped
              </h2>
            </div>
            <Link to="/projects" className="text-sm font-bold text-primary-600 inline-flex items-center gap-1">
              All projects <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
          <Stagger className="grid md:grid-cols-3 gap-5" staggerDelay={0.07}>
            {cases.map((c, i) => {
              const imgs = [IMAGES.students, IMAGES.laptop, IMAGES.classroom];
              return (
                <StaggerItem key={c.title} hover>
                  <article className="h-full rounded-2xl sm:rounded-3xl border border-gray-100 bg-white overflow-hidden shadow-card hover:shadow-elev transition flex flex-col">
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img
                        src={imgs[i % imgs.length]}
                        alt={c.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        {c.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full bg-white/95 text-ink shadow-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-extrabold text-ink mb-2 text-base leading-snug">{c.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed flex-1">{c.result}</p>
                    </div>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </section>
      )}

      {/* Services grid */}
      {services.length > 0 && (
        <section className="bg-gray-50 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-10 items-center mb-10">
              <Reveal direction="right">
                <p className="eyebrow mb-2">Capabilities</p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-3">
                  What we can build for your education roadmap
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  Full-stack delivery — design, engineering, integrations, and handover your team can own.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/contact" className="btn-primary">
                    Start a project <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link to="/services" className="btn-outline">
                    View services
                  </Link>
                </div>
              </Reveal>
              <Reveal direction="left" delay={0.08}>
                <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/11] shadow-elev">
                  <img src={IMAGES.collab} alt="Team collaboration" className="w-full h-full object-cover" />
                </div>
              </Reveal>
            </div>
            <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3" staggerDelay={0.05}>
              {services.map((s, i) => {
                const Icon = capabilityIcons[i % capabilityIcons.length];
                return (
                  <StaggerItem key={s} hover>
                    <div className="flex gap-3 items-center rounded-xl border border-gray-100 bg-white p-4 shadow-sm h-full">
                      <span className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </span>
                      <p className="text-sm font-semibold text-ink leading-snug">{s}</p>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </div>
        </section>
      )}
    </>
  );
}
