import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { stats } from '../data/content';

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1.6, bounce: 0 });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    return spring.on('change', (latest) => {
      if (ref.current) ref.current.textContent = Math.round(latest).toString();
    });
  }, [spring]);

  return (
    <span className="inline-flex items-baseline">
      <span ref={ref}>0</span>
      <span>{suffix}</span>
    </span>
  );
}

export default function StatsCounter() {
  return (
    <section className="relative bg-primary-gradient py-14 overflow-hidden">
      <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-20 -right-10 w-72 h-72 rounded-full bg-white/10 blur-2xl" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="text-primary-100 text-xs sm:text-sm font-medium mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
