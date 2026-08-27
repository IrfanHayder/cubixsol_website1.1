import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { projects } from '../data/content';
import Reveal from './Reveal';

/* Map service slug → project categories / keywords */
const serviceProjectMap = {
  'web-development': ['Web Development', 'SaaS', 'Healthcare'],
  'laravel-development': ['Web Development', 'SaaS', 'Healthcare'],
  'mobile-app-development': ['Mobile Apps'],
  'ios-development': ['Mobile Apps'],
  'android-development': ['Mobile Apps'],
  'ai-development': ['AI Solutions'],
  'cloud-solutions': ['SaaS', 'Web Development'],
  'devops': ['SaaS', 'Web Development'],
  'ui-ux-design': ['Web Development', 'Mobile Apps', 'SaaS'],
  'ecommerce-solutions': ['E-Commerce'],
  'api-development': ['SaaS', 'Web Development'],
  'digital-marketing': ['E-Commerce', 'SaaS'],
};

const fallbackImgs = [
  'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&h=600&q=70',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&h=600&q=70',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&h=600&q=70',
  'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&h=600&q=70',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&h=600&q=70',
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&h=600&q=70',
];

export default function SuccessStories({ serviceSlug, serviceTitle }) {
  const stories = useMemo(() => {
    try {
      const cats = serviceProjectMap[serviceSlug] || [];
      const all = Array.isArray(projects) ? projects : [];
      let list = all.filter((p) => cats.includes(p.category) || cats.includes(p.tag));
      if (list.length < 2) list = all.slice(0, 4);
      return list.map((p, i) => ({
        ...p,
        img: fallbackImgs[i % fallbackImgs.length],
        industry: p.tag || p.category,
        summary:
          (p.desc || '') +
          ' Our team delivered design, engineering and launch support tailored to their goals.',
      }));
    } catch {
      return [];
    }
  }, [serviceSlug]);

  const [active, setActive] = useState(0);
  const safeActive = stories.length ? Math.min(active, stories.length - 1) : 0;
  const current = stories[safeActive] || stories[0];

  if (!current || stories.length === 0) return null;

  return (
    <section id="success-stories" className="py-14 lg:py-20 scroll-mt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-8 lg:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight">
            Cubixsol{' '}
            <span className="bg-clip-text text-transparent bg-primary-gradient">Success Stories</span>
          </h2>
          <p className="text-sm text-gray-500 mt-2 max-w-xl mx-auto">
            Selected work related to {serviceTitle || 'this service'}.
          </p>
        </Reveal>

        {/* Tabs */}
        <Reveal>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {stories.map((s, i) => (
              <button
                key={s.title}
                type="button"
                onClick={() => setActive(i)}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  active === i
                    ? 'bg-primary-gradient text-white shadow-soft'
                    : 'bg-gray-100 text-gray-600 hover:bg-primary-50 hover:text-primary-700'
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid lg:grid-cols-2 rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-100 shadow-elev"
          >
            {/* Image */}
            <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[360px] bg-gray-100">
              <img
                src={current.img}
                alt={current.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width={800}
                height={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 bg-white/95 text-ink text-xs font-bold px-3 py-1.5 rounded-full">
                {current.industry}
              </span>
            </div>

            {/* Content */}
            <div className="bg-ink text-white p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
              <span className="inline-flex self-start text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-primary-500/30 text-primary-200 border border-primary-400/30 mb-4">
                {current.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold mb-2">What is {current.title}?</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-6">{current.summary}</p>

              <p className="text-xs font-bold tracking-widest uppercase text-white/40 mb-3">
                Technologies
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {(current.tech || ['React', 'Node.js', 'AWS']).slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="w-9 h-9 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-[10px] font-bold text-white/90"
                    title={t}
                  >
                    {String(t).slice(0, 3)}
                  </span>
                ))}
              </div>

              <Link
                to="/projects"
                className="inline-flex items-center gap-2 self-start bg-primary-gradient text-white font-semibold text-sm px-5 py-2.5 rounded-lg hover:opacity-95 transition"
              >
                View case study <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
