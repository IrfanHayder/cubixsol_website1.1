import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowDown, Sparkles } from 'lucide-react';

const orbitItems = [
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=200&h=200&q=70',
  },
  { type: 'solid', className: 'bg-primary-gradient', label: 'AI' },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=200&h=200&q=70',
  },
  { type: 'solid', className: 'bg-sky-400', label: 'UX' },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=200&h=200&q=70',
  },
  { type: 'solid', className: 'bg-ink', label: 'APP' },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=200&h=200&q=70',
  },
  { type: 'solid', className: 'bg-primary-600', label: 'WEB' },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=200&h=200&q=70',
  },
  { type: 'solid', className: 'bg-gradient-to-br from-primary-500 to-sky-400', label: '☁' },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=200&h=200&q=70',
  },
  { type: 'solid', className: 'bg-violet-500', label: '✦' },
];

const rotatingWords = ['Web apps', 'Mobile apps', 'AI systems', 'Cloud platforms', 'Product design'];

function OrbitCard({ item, size = 'md' }) {
  const dim =
    size === 'lg'
      ? 'w-14 h-14 sm:w-18 sm:h-18 md:w-22 md:h-22 lg:w-24 lg:h-24'
      : size === 'sm'
        ? 'w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14'
        : 'w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-[4.5rem] lg:h-[4.5rem]';

  return (
    <motion.div
      whileHover={{ scale: 1.12, zIndex: 20 }}
      className={`${dim} rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_12px_40px_-8px_rgba(26,26,46,0.25)] border border-white/50 bg-white cursor-default`}
    >
      {item.type === 'image' ? (
        <img
          src={item.src}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          width={200}
          height={200}
        />
      ) : (
        <div
          className={`w-full h-full flex items-center justify-center text-white font-extrabold text-xs sm:text-sm md:text-base ${item.className}`}
        >
          {item.label}
        </div>
      )}
    </motion.div>
  );
}

export default function HeroSlider() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setWordIndex((i) => (i + 1) % rotatingWords.length), 2600);
    return () => clearInterval(id);
  }, []);

  const positions = useMemo(() => {
    const n = orbitItems.length;
    return orbitItems.map((item, i) => {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      return { item, angle, size: i % 3 === 0 ? 'lg' : i % 2 === 0 ? 'md' : 'sm' };
    });
  }, []);

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden bg-[#ebe6df]">
      {/* ambient glow */}
      <div className="pointer-events-none absolute top-[15%] left-[10%] w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-primary-400/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[10%] right-[8%] w-72 sm:w-[28rem] h-72 sm:h-[28rem] rounded-full bg-sky-400/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,520px)] h-[min(90vw,520px)] rounded-full border border-primary-300/20" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(70vw,380px)] h-[min(70vw,380px)] rounded-full border border-dashed border-primary-400/15" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          {/* Left */}
          <div className="lg:col-span-4 order-2 lg:order-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 bg-white/70 backdrop-blur border border-white/80 text-ink text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm mb-5"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary-500" />
              <span>Cubixsol Studio</span>
              <span className="w-1 h-1 rounded-full bg-primary-400" />
              <span className="text-gray-500">Since 2014</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-gray-600 text-base sm:text-lg leading-relaxed mb-3 font-bold max-w-sm mx-auto lg:mx-0"
            >
              {/* Designing digital products for human connection — that scale with your business. */}
              Custom Software Development Company for Startups & Growing Businesses

            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-gray-600 text-base sm:text-sm leading-relaxed mb-3 max-w-sm mx-auto lg:mx-0"
            >
              Cubixsol is a <strong>custom software development company for startups</strong>  and growing businesses ready to turn bold ideas into dependable digital products. From strategy and design to launch and continuous improvement, we create scalable web, mobile, cloud, and AI products shaped around your users, goals, and budget.

            </motion.p>

            {/* rotating capability line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="h-7 mb-6 flex items-center justify-center lg:justify-start gap-1.5 text-sm font-semibold text-ink"
            >
              <span className="text-gray-400 font-medium">We build</span>
              <span className="relative inline-block min-w-[7.5rem] h-6 overflow-hidden text-left">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={rotatingWords[wordIndex]}
                    initial={{ y: 18, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -18, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="absolute left-0 bg-clip-text text-transparent bg-primary-gradient"
                  >
                    {rotatingWords[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8"
            >
              <Link
                to="/services"
                className="inline-flex items-center gap-2 bg-ink text-white font-semibold px-6 py-3 rounded-full hover:bg-ink/90 transition shadow-elev"
              >
                {/* Find out how*/}Get a Free Estimate  <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-ink font-semibold px-6 py-3 rounded-full border border-gray-200/80 hover:border-primary-300 hover:shadow-card transition"
              >
                Start a project
              </Link>
            </motion.div>

            {/* mini stats */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex flex-wrap justify-center lg:justify-start gap-5 sm:gap-6"
            >
              {[
                ['200+', 'Projects'],
                ['150+', 'Clients'],
                ['98%', 'Client Satisfaction'],
              ].map(([val, label]) => (
                <div key={label} className="text-center lg:text-left">
                  <p className="text-lg sm:text-xl font-extrabold text-ink tracking-tight">{val}</p>
                  <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Orbit */}
          <div className="lg:col-span-8 order-1 lg:order-2">
            <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[420px] md:max-w-[500px] lg:max-w-[560px] aspect-square">
              {/* soft pulsing core glow */}
              <motion.div
                className="absolute inset-[18%] rounded-full bg-primary-gradient opacity-[0.07] blur-2xl"
                animate={{ scale: [1, 1.08, 1], opacity: [0.06, 0.12, 0.06] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* orbit ring decoration */}
              <div className="absolute inset-[8%] rounded-full border border-white/40 shadow-[inset_0_0_60px_rgba(255,255,255,0.4)]" />

              {/* rotating cards */}
              <motion.div
                className="absolute inset-0"
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
              >
                {positions.map(({ item, angle, size }, i) => {
                  const rx = 43;
                  const ry = 41;
                  const x = 50 + rx * Math.cos(angle);
                  const y = 50 + ry * Math.sin(angle);
                  return (
                    <div
                      key={i}
                      className="absolute"
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
                      >
                        {/* gentle float per card */}
                        <motion.div
                          animate={{ y: [0, -6, 0] }}
                          transition={{
                            duration: 3 + (i % 4) * 0.4,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: i * 0.15,
                          }}
                        >
                          <OrbitCard item={item} size={size} />
                        </motion.div>
                      </motion.div>
                    </div>
                  );
                })}
              </motion.div>

              {/* center title */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none z-10 px-3">
                <motion.h1
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-black text-ink leading-[0.92] tracking-tight drop-shadow-sm"
                >
                  DIGITAL
                  <br />
                  PRODUCTS
                  <br />
                  <span className="bg-clip-text text-transparent bg-primary-gradient">
                    &amp; CODE
                  </span>
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mt-3 sm:mt-4 inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-white/90 rounded-full px-3 py-1 shadow-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] sm:text-xs font-semibold text-gray-600">
                    Available for new projects
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* bottom meta */}
      <div className="absolute bottom-5 left-0 right-0 z-10 px-4 sm:px-8 flex items-end justify-between pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="hidden sm:flex items-center gap-2 text-gray-400 text-xs font-medium"
        >
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </motion.span>
          Scroll to explore
        </motion.div>
        <div className="hidden sm:flex gap-2 pointer-events-auto ml-auto">
          <span className="bg-white/75 backdrop-blur text-ink text-[11px] font-semibold px-3 py-1.5 rounded-lg shadow-sm border border-white/60">
            Remote-first
          </span>
          <span className="bg-white/75 backdrop-blur text-ink text-[11px] font-semibold px-3 py-1.5 rounded-lg shadow-sm border border-white/60">
            Global clients
          </span>
        </div>
      </div>
    </section>
  );
}
