import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { processSteps as processStepsData } from '../data/content';
import Reveal from './Reveal';

const processSteps = Array.isArray(processStepsData) ? processStepsData : [];

export default function ProcessSlider() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const len = processSteps.length || 1;

  const go = (delta) => {
    if (!processSteps.length) return;
    setDir(delta);
    setIndex((i) => (i + delta + len) % len);
  };

  const current = processSteps[index] || {
    step: '01',
    title: 'Discover',
    desc: 'We understand your goals and requirements.',
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <Reveal className="text-center max-w-2xl mx-auto mb-12">
        <p className="eyebrow mb-3">How we work</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-ink mb-3">A simple, clear process</h2>
        <p className="text-gray-500 text-sm sm:text-base">
          From discovery to launch — transparent steps you can follow.
        </p>
      </Reveal>

      <div className="max-w-xl mx-auto">
        <div className="relative min-h-[160px] bg-white rounded-2xl border border-gray-100 shadow-card p-6 sm:p-8 text-center">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={current.step}
              custom={dir}
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.25 }}
            >
              <span className="text-3xl font-extrabold text-primary-200">{current.step}</span>
              <h3 className="text-xl font-bold text-ink mt-2 mb-2">{current.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{current.desc}</p>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous step"
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-2">
            {(processSteps.length ? processSteps : [current]).map((_, i) => (
              <button
                type="button"
                key={i}
                onClick={() => {
                  if (!processSteps.length) return;
                  setDir(i > index ? 1 : -1);
                  setIndex(i);
                }}
                className={`h-2 rounded-full transition-all ${
                  i === index ? 'w-6 bg-primary-600' : 'w-2 bg-gray-200'
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next step"
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
