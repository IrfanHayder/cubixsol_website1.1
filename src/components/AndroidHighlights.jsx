import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Smartphone,
  Gauge,
  Shield,
  Store,
  Layers,
  Rocket,
  ChevronDown,
} from 'lucide-react';
import Reveal from './Reveal';

const items = [
  {
    icon: Smartphone,
    title: 'Native Kotlin & Compose',
    body: 'Modern Kotlin and Jetpack Compose for interfaces that feel at home on Android — Material Design, smooth motion, and platform patterns users already know.',
  },
  {
    icon: Gauge,
    title: 'Performance on real devices',
    body: 'Efficient lists, careful background work, and lean networking so apps stay responsive across a wide range of phones and OS versions.',
  },
  {
    icon: Store,
    title: 'Google Play ready',
    body: 'Store listing, privacy forms, signing, and internal/open testing tracks. We help you ship through Play Console with fewer surprises.',
  },
  {
    icon: Layers,
    title: 'Architecture that grows',
    body: 'Clear modules, recommended Jetpack patterns, and testable layers so you can add features without rewriting the foundation.',
  },
  {
    icon: Shield,
    title: 'Security by default',
    body: 'Encrypted storage, secure auth flows, and careful handling of tokens and user data aligned with Play policies and user trust.',
  },
  {
    icon: Rocket,
    title: 'CI and release tracks',
    body: 'Automated builds and staged rollouts so your team can test quickly and release to production with confidence.',
  },
];

export default function AndroidHighlights() {
  const [openSet, setOpenSet] = useState(() => new Set([0]));

  const toggle = (i) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <section className="py-14 lg:py-20 bg-emerald-50/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-8 sm:mb-10">
          <p className="eyebrow mb-2">Android craft</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-4">
            How we build{' '}
            <span className="bg-clip-text text-transparent bg-primary-gradient">great Android apps</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-2xl mx-auto">
            Native quality, Material Design, and Play-aware delivery — so your product feels solid from
            first install to every update.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="bg-white rounded-xl sm:rounded-2xl border border-emerald-100/80 shadow-card overflow-hidden">
            {items.map((item, i) => {
              const Icon = item.icon;
              const isOpen = openSet.has(i);
              const isLast = i === items.length - 1;
              return (
                <div key={item.title} className={!isLast ? 'border-b border-emerald-50' : ''}>
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    className="w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 text-left hover:bg-emerald-50/50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5" strokeWidth={1.75} />
                    </span>
                    <span className="flex-1 font-bold text-ink text-sm sm:text-base">{item.title}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-primary-500 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 sm:px-6 pb-5 pl-[3.75rem] sm:pl-[4.5rem] text-sm text-gray-500 leading-relaxed -mt-1">
                          {item.body}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
