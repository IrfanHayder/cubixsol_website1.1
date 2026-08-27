import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Reveal from './Reveal';

const panels = [
  {
    src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&h=800&q=70',
    label: 'Web platforms',
  },
  {
    src: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&h=800&q=70',
    label: 'Mobile apps',
  },
  {
    src: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&h=800&q=70',
    label: 'AI systems',
  },
  {
    src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=600&h=800&q=70',
    label: 'Product design',
  },
  {
    src: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=600&h=800&q=70',
    label: 'Cloud & DevOps',
  },
];

function Panel({ item, index, total }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-40, 40], [6, -6]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [-40, 40], [-6, 6]), { stiffness: 200, damping: 20 });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(e.clientX - (r.left + r.width / 2));
    my.set(e.clientY - (r.top + r.height / 2));
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  // slight fan rotation for depth
  const fan = (index - (total - 1) / 2) * 2.5;

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: rx, rotateY: ry, rotateZ: fan }}
      initial={{ opacity: 0, y: 48, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -12, scale: 1.03, zIndex: 10, rotateZ: 0 }}
      className="relative flex-shrink-0 w-[42vw] sm:w-[28vw] md:w-[18vw] max-w-[220px] min-w-[140px] aspect-[3/4] cursor-pointer"
    >
      {/* curved bottom via border-radius + overflow */}
      <div className="absolute inset-0 rounded-t-[1.25rem] rounded-b-[42%] sm:rounded-b-[46%] overflow-hidden shadow-[0_20px_50px_-12px_rgba(26,26,46,0.35)] border border-white/40">
        <img
          src={item.src}
          alt={item.label}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          width={600}
          height={800}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-80" />
        <span className="absolute bottom-6 sm:bottom-8 left-0 right-0 text-center text-white text-[11px] sm:text-xs font-bold tracking-wide px-2">
          {item.label}
        </span>
      </div>
    </motion.div>
  );
}

/**
 * Architecture-studio style curved work strip for About page.
 */
export default function WorkShowcase() {
  const stripRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: stripRef,
    offset: ['start end', 'end start'],
  });
  const x = useTransform(scrollYProgress, [0, 1], [24, -24]);

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 text-center mb-10 sm:mb-14">
        <Reveal scale>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight leading-[1.1] mb-4">
            Digital products
            <br className="hidden sm:block" />{' '}
            <span className="bg-clip-text text-transparent bg-primary-gradient">worth shipping</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-lg mx-auto leading-relaxed">
            The product you need has not been built by accident — we design, engineer, and launch with
            intent.
          </p>
        </Reveal>
      </div>

      {/* curved gallery strip */}
      <div ref={stripRef} className="relative px-2 sm:px-6 perspective-[1200px]">
        <motion.div
          style={{ x }}
          className="flex justify-center items-end gap-2 sm:gap-3 md:gap-4 max-w-6xl mx-auto"
        >
          {panels.map((item, i) => (
            <Panel key={item.label} item={item} index={i} total={panels.length} />
          ))}
        </motion.div>

        {/* soft floor shadow */}
        <div className="mx-auto mt-2 h-8 max-w-3xl bg-gradient-to-b from-primary-200/30 to-transparent blur-xl rounded-full pointer-events-none" />
      </div>

      <Reveal className="text-center mt-10 sm:mt-12 px-4">
        <p className="text-sm sm:text-base text-gray-500 max-w-xl mx-auto leading-relaxed mb-6">
          Web, mobile, AI, and cloud — built from your goals, not templates. Clear process, solid
          engineering, honest timelines.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to="/contact" className="btn-primary">
            Book a meeting <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/projects" className="btn-outline">
            See projects
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
