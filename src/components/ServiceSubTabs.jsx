import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Palette, Layout, Smartphone, MessageSquare, Boxes, Rocket, ChevronLeft, ChevronRight,
} from 'lucide-react';
import Reveal from './Reveal';

const tabs = [
  {
    id: 'branding',
    label: 'Branding',
    icon: Palette,
    title: 'Brand identity that sticks',
    desc: 'Logos, visual systems and guidelines that make your product recognizable across every touchpoint — web, mobile and marketing.',
    img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&h=450&q=70',
  },
  {
    id: 'ux',
    label: 'UX/UI Design',
    icon: Layout,
    title: 'UX & UI that convert',
    desc: 'Research-backed flows and polished interfaces. We map user journeys, wireframe, prototype and hand off developer-ready designs.',
    img: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&h=450&q=70',
  },
  {
    id: 'mobile-web',
    label: 'UI for Mobile and Web',
    icon: Smartphone,
    title: 'UI for Mobile and Web',
    desc: 'Looks matter. But so does function. We design interfaces that balance aesthetics with usability — a product that works well and looks great on every screen.',
    img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&h=450&q=70',
  },
  {
    id: 'consulting',
    label: 'UX/UI Consulting',
    icon: MessageSquare,
    title: 'UX/UI consulting',
    desc: 'Audits, workshops and design reviews for teams that need a second pair of expert eyes before they ship or redesign.',
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&h=450&q=70',
  },
  {
    id: 'product',
    label: 'Product Design',
    icon: Boxes,
    title: 'End-to-end product design',
    desc: 'From discovery to high-fidelity UI and design systems — one team owns the full product experience.',
    img: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=800&h=450&q=70',
  },
  {
    id: 'mvp',
    label: 'MVP Design',
    icon: Rocket,
    title: 'MVP design for startups',
    desc: 'Lean, focused design for your first version. Validate ideas quickly without sacrificing clarity or polish.',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&h=450&q=70',
  },
];

export default function ServiceSubTabs() {
  const [index, setIndex] = useState(2);
  const active = tabs[index];

  const go = (dir) => setIndex((i) => (i + dir + tabs.length) % tabs.length);

  return (
    <section className="bg-ink text-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            Our <span className="text-primary-400">UX/UI</span> Design Services
          </h2>
          <div className="mt-4 h-px w-full max-w-md bg-white/15" />
        </Reveal>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Tabs */}
          <div className="lg:col-span-4 space-y-2">
            {tabs.map((tab, i) => {
              const TabIcon = tab.icon;
              const isActive = i === index;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300 ${
                    isActive
                      ? 'bg-primary-500/25 text-white border border-primary-400/40'
                      : 'text-white/60 hover:bg-white/5 hover:text-white border border-transparent'
                  }`}
                >
                  <TabIcon className={`w-4.5 h-4.5 shrink-0 ${isActive ? 'text-primary-300' : ''}`} />
                  <span className="text-sm font-semibold">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-3">{active.title}</h3>
                <p className="text-white/65 text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
                  {active.desc}
                </p>
                <div className="rounded-2xl overflow-hidden shadow-elev aspect-[16/9] sm:aspect-[2/1] max-w-xl">
                  <img
                    src={active.img}
                    alt={active.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-2 mt-6">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous"
                className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next"
                className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-14 lg:mt-16 pt-8 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            ['50+', 'Design experts available'],
            ['200+', 'Interfaces shipped'],
            ['98%', 'Client satisfaction'],
            ['10+', 'Industries served'],
          ].map(([val, label]) => (
            <div key={label}>
              <p className="text-2xl sm:text-3xl font-extrabold text-white">{val}</p>
              <p className="text-xs text-white/50 mt-1 uppercase tracking-wide">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
