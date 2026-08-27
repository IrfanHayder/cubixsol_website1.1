import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Calculator, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { estimatorFeatures } from '../data/content';
import Reveal from './Reveal';

const BASE_COST = 3000;
const BASE_DAYS = 10;

export default function ProjectEstimator() {
  const [selected, setSelected] = useState(['auth', 'admin']);

  const toggle = (id) => {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  };

  const { cost, days } = useMemo(() => {
    const picked = estimatorFeatures.filter((f) => selected.includes(f.id));
    return {
      cost: BASE_COST + picked.reduce((sum, f) => sum + f.cost, 0),
      days: BASE_DAYS + picked.reduce((sum, f) => sum + f.days, 0),
    };
  }, [selected]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <Reveal className="text-center max-w-2xl mx-auto mb-12">
        <p className="eyebrow mb-3">Instant Estimate</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-ink mb-4">
          Get a Ballpark Project Estimate
        </h2>
        <p className="text-gray-500">
          Pick the features your project needs and see a rough cost & timeline instantly. No forms, no waiting.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-0 rounded-3xl border border-gray-100 shadow-soft overflow-hidden bg-white">
          <div className="p-8 sm:p-10">
            <p className="text-sm font-bold text-ink mb-5 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-primary-600" /> Select the features you need
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {estimatorFeatures.map((f) => {
                const active = selected.includes(f.id);
                return (
                  <button
                    key={f.id}
                    onClick={() => toggle(f.id)}
                    className={`text-left px-4 py-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                      active
                        ? 'border-primary-500 bg-primary-50 shadow-sm'
                        : 'border-gray-200 hover:border-primary-200'
                    }`}
                  >
                    <span>
                      <span className="block text-sm font-semibold text-ink">{f.label}</span>
                      <span className="block text-xs text-gray-400 mt-0.5">+${f.cost.toLocaleString()} · +{f.days}d</span>
                    </span>
                    <span
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-all ${
                        active ? 'bg-primary-600 border-primary-600' : 'border-gray-300'
                      }`}
                    >
                      {active && <Check className="w-3.5 h-3.5 text-white" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-primary-gradient p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-white/10" />
            <div className="relative z-10">
              <p className="text-primary-100 text-xs font-bold uppercase tracking-widest mb-6">Your Estimate</p>

              <p className="text-primary-100 text-sm mb-1">Estimated Investment</p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={cost}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="text-4xl font-extrabold text-white mb-6"
                >
                  ${cost.toLocaleString()}+
                </motion.p>
              </AnimatePresence>

              <p className="text-primary-100 text-sm mb-1">Estimated Timeline</p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={days}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="text-2xl font-bold text-white"
                >
                  ~{days} business days
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="relative z-10 mt-8">
              <p className="text-primary-100 text-xs mb-4">
                This is a rough guide — final scope is confirmed on a free discovery call.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-primary-700 font-semibold px-6 py-3 rounded-lg hover:bg-primary-50 transition w-full justify-center"
              >
                Get a Precise Quote <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
