import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '../data/content';
import Reveal from './Reveal';

const filters = ['All', 'Web Development', 'Mobile Apps', 'E-Commerce', 'SaaS', 'AI Solutions'];

export default function ProjectSlider() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.tag === activeFilter || p.category === activeFilter);

  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  return (
    <section className="bg-gray-50 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col items-center text-center mb-10">
          <p className="eyebrow mb-3">Our Work</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink mb-6">Featured Projects</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  activeFilter === f
                    ? 'bg-primary-gradient text-white shadow-soft'
                    : 'bg-white text-gray-500 border border-gray-200 hover:border-primary-300'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="relative">
          {/* nav arrows */}
          <button
            onClick={() => scroll(-1)}
            aria-label="Scroll projects left"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm hidden sm:flex items-center justify-center text-gray-500 hover:border-primary-300 hover:text-primary-600 transition"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll(1)}
            aria-label="Scroll projects right"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-20 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm hidden sm:flex items-center justify-center text-gray-500 hover:border-primary-300 hover:text-primary-600 transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filtered.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="snap-start shrink-0 w-[280px] sm:w-[300px]"
              >
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-card group hover:-translate-y-1.5 hover:shadow-soft transition-all duration-300 h-full">
                  <div
                    className={`h-40 bg-gradient-to-br ${p.color} flex items-end p-4 overflow-hidden relative`}
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    <span className="text-white/90 text-xs font-bold bg-black/20 px-2 py-1 rounded relative z-10">
                      {p.tag}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-ink mb-1">{p.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">{p.desc}</p>
                    <Link
                      to="/projects"
                      className="text-sm font-semibold text-primary-600 inline-flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      View Case Study <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <Reveal className="text-center mt-10" delay={0.1}>
          <Link to="/projects" className="btn-outline">
            View All Projects <ArrowRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
