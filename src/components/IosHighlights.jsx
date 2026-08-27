import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Smartphone,
  Gauge,
  Shield,
  AppWindow,
  Layers,
  Rocket,
  ChevronDown,
} from 'lucide-react';
import Reveal from './Reveal';

const items = [
  {
    icon: Smartphone,
    title: 'Native Swift & SwiftUI',
    body: 'We build with modern Swift and SwiftUI so your app feels at home on iPhone and iPad — with smooth animations, system fonts, and platform patterns users already understand.',
  },
  {
    icon: Gauge,
    title: 'Performance first',
    body: 'Lightweight view hierarchies, efficient networking, and careful memory use. Apps stay responsive under real-world conditions, not just demo data.',
  },
  {
    icon: AppWindow,
    title: 'App Store ready',
    body: 'Guidelines, privacy labels, screenshots, and TestFlight builds handled with you. We support submission and help clear common review blockers.',
  },
  {
    icon: Layers,
    title: 'Architecture that scales',
    body: 'Clear module boundaries, testable layers, and patterns that let you add features without rewriting the core — from MVP to multi-year product.',
  },
  {
    icon: Shield,
    title: 'Security & privacy',
    body: 'Keychain, biometric auth, encrypted storage, and careful handling of user data so you meet Apple’s expectations and your users’ trust.',
  },
  {
    icon: Rocket,
    title: 'Ship with CI & TestFlight',
    body: 'Automated builds, versioning, and TestFlight distribution so your team can review builds quickly and release with confidence.',
  },
];

export default function IosHighlights() {
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
    <section className="py-14 lg:py-20 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-8 sm:mb-10">
          <p className="eyebrow mb-2">iOS craft</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-4">
            How we build{' '}
            <span className="bg-clip-text text-transparent bg-primary-gradient">great iOS apps</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-2xl mx-auto">
            Native quality, clear process, and App Store–aware delivery — so your product feels premium
            from first launch to every update.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
            {items.map((item, i) => {
              const Icon = item.icon;
              const isOpen = openSet.has(i);
              const isLast = i === items.length - 1;
              return (
                <div key={item.title} className={!isLast ? 'border-b border-slate-100' : ''}>
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    className="w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 text-left hover:bg-slate-50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
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
