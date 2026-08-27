import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import Reveal from './Reveal';
import { solutionPractices } from '../data/solutionPractices';

export default function SolutionBestPractices({ slug }) {
  const data = solutionPractices[slug];
  const [openSet, setOpenSet] = useState(() => new Set([0]));

  if (!data) return null;

  const toggle = (i) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <section className="py-14 lg:py-20 bg-[#f0f6fc]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-4">
            {data.title.split(' ').slice(0, 2).join(' ').includes('Best') ? (
              <>
                <span className="text-primary-500">Best Practices</span>
                {data.title.replace(/^Best Practices/, '')}
              </>
            ) : (
              data.title
            )}
          </h2>
          {data.intro && (
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-2xl mx-auto">
              {data.intro}
            </p>
          )}
        </Reveal>

        <Reveal delay={0.08}>
          <div className="bg-white rounded-xl sm:rounded-2xl border border-sky-100/80 shadow-sm overflow-hidden">
            {data.items.map((item, i) => {
              const isOpen = openSet.has(i);
              const isLast = i === data.items.length - 1;
              return (
                <div key={item.title} className={!isLast ? 'border-b border-sky-100' : ''}>
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    className="w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 text-left hover:bg-sky-50/50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5" strokeWidth={1.75} />
                    </span>
                    <span className="flex-1 font-bold text-ink text-sm sm:text-base">
                      {item.title}
                    </span>
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
