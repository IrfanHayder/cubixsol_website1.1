import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Reveal from './Reveal';

/* Front = real photo or solid; back = alternate photo / solid */
const tiles = [
  {
    id: 1,
    front: {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=500&h=500&q=70',
    },
    back: {
      type: 'solid',
      className: 'bg-primary-gradient',
      label: 'UX Research',
    },
  },
  {
    id: 2,
    front: {
      type: 'solid',
      className: 'bg-primary-500',
      label: 'Research',
    },
    back: {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=500&h=500&q=70',
    },
  },
  {
    id: 3,
    front: {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=500&h=500&q=70',
    },
    back: {
      type: 'solid',
      className: 'bg-sky-400',
      label: 'UI Systems',
    },
  },
  {
    id: 4,
    front: {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&h=500&q=70',
    },
    back: {
      type: 'solid',
      className: 'bg-primary-600',
      label: 'Prototypes',
    },
  },
  {
    id: 5,
    front: {
      type: 'solid',
      className: 'bg-primary-600',
      label: 'UI',
    },
    back: {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&h=500&q=70',
    },
  },
  {
    id: 6,
    front: {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=500&h=500&q=70',
    },
    back: {
      type: 'solid',
      className: 'bg-gradient-to-br from-primary-500 to-sky-500',
      label: 'Design Lab',
    },
  },
];

function Face({ face }) {
  if (face.type === 'image') {
    return (
      <img
        src={face.src}
        alt=""
        className="w-full h-full object-cover"
        loading="lazy"
        decoding="async"
        width={500}
        height={500}
      />
    );
  }
  return (
    <div className={`w-full h-full flex items-center justify-center text-white ${face.className}`}>
      <span className="text-base sm:text-xl font-extrabold px-2 text-center">{face.label}</span>
    </div>
  );
}

function FlipTile({ tile, delay = 0 }) {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      const id = setInterval(() => setFlipped((f) => !f), 4000);
      return () => clearInterval(id);
    }, delay * 500);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div className="relative aspect-square rounded-2xl [perspective:1000px]">
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 [transform-style:preserve-3d]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <Face face={tile.front} />
        </div>
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <Face face={tile.back} />
        </div>
      </motion.div>
    </div>
  );
}

export default function DesignLabFlip() {
  return (
    <section className="bg-[#0f1225] text-white py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal direction="right">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight mb-5">
              Meet our in-house design practice
            </h2>
            <p className="text-white/65 leading-relaxed mb-4 text-sm sm:text-base">
              A close-knit product design team focused on research, experience and collaboration.
              We help startups and growing companies identify user needs, solve hard problems, and
              ship interfaces people actually enjoy using.
            </p>
            <p className="text-white/65 leading-relaxed mb-8 text-sm sm:text-base">
              Every project is treated as a real-world challenge — not a checklist. Great design is
              about solving human problems while hitting business goals.
            </p>
            <blockquote className="border-l-2 border-primary-400 pl-4 text-white/80 italic text-sm sm:text-base">
              On time? Check. Within budget? Check. But what&apos;s the point if no one likes it?
              Great design isn&apos;t about ticking boxes — it&apos;s about solving real problems.
            </blockquote>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {tiles.map((tile, i) => (
                <FlipTile key={tile.id} tile={tile} delay={i} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
