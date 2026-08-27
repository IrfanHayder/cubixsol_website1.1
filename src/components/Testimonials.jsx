import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../data/content';
import Reveal from './Reveal';

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (delta) => {
    setDir(delta);
    setIndex((i) => (i + delta + testimonials.length) % testimonials.length);
  };

  const t = testimonials[index];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <Reveal className="text-center max-w-2xl mx-auto mb-12">
        <p className="eyebrow mb-3">Testimonials</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-ink mb-4">What Our Clients Say</h2>
        <p className="text-gray-500">Real feedback from businesses we've helped build, scale, and succeed.</p>
      </Reveal>

      <div className="relative max-w-3xl mx-auto">
        <div className="card !p-8 sm:!p-12 text-center overflow-hidden relative min-h-[240px] flex items-center justify-center">
          <Quote className="w-10 h-10 text-primary-100 absolute top-6 left-6" />
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={index}
              custom={dir}
              initial={{ opacity: 0, x: dir > 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir > 0 ? -40 : 40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-lg sm:text-xl text-ink font-medium leading-relaxed mb-6">"{t.quote}"</p>
              <p className="font-bold text-ink">{t.name}</p>
              <p className="text-sm text-gray-400">{t.role}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:border-primary-300 hover:text-primary-600 transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDir(i > index ? 1 : -1); setIndex(i); }}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-primary-600' : 'w-2 bg-gray-200'}`}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:border-primary-300 hover:text-primary-600 transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
