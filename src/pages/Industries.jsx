import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import CtaBanner from '../components/CtaBanner';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';
import DynamicIcon from '../components/DynamicIcon';
import { apiFetch } from '../utils/api';

export default function Industries() {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch('industries')
      .then(data => {
        setIndustries(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching industries:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-violet-50/30 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <Reveal scale className="max-w-2xl">
            <p className="eyebrow mb-3">Where we deliver</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4">
              Industries we serve
            </h1>
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed">
              Domain-aware engineering for education, health, finance, commerce, and more — same
              craft, context that fits your market.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {loading ? (
          <div className="text-center py-16 text-gray-500">Loading industries...</div>
        ) : industries.length === 0 ? (
          <div className="text-center py-16 text-gray-400">No industries found.</div>
        ) : (
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6" staggerDelay={0.05}>
            {industries.map((ind) => {
              return (
                <StaggerItem key={ind.slug} hover>
                  <Link
                    to={`/industries/${ind.slug}`}
                    className="group relative flex flex-col h-full rounded-3xl border border-gray-100/90 bg-white p-6 sm:p-7 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_22px_45px_-12px_rgba(0,164,216,0.15)] hover:border-cyan-200 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden justify-between"
                  >
                    <div>
                      {/* Icon container with brand cyan-blue gradient, larger size and smooth animation */}
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-50/80 border border-cyan-100/90 flex items-center justify-center mb-5 group-hover:bg-gradient-to-br group-hover:from-[#00a4d8] group-hover:via-[#0284c7] group-hover:to-[#0369a1] group-hover:border-transparent group-hover:shadow-xl group-hover:shadow-[#00a4d8]/35 group-hover:ring-4 group-hover:ring-cyan-100/70 group-hover:scale-110 group-hover:-translate-y-1 group-hover:rotate-2 transition-all duration-300 ease-out shrink-0 overflow-hidden">
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        <DynamicIcon
                          icon={ind.icon}
                          title={ind.title}
                          className="w-8 h-8 sm:w-9 sm:h-9 object-contain text-[#00a4d8] group-hover:text-white transition-all duration-300 ease-out group-hover:scale-115 group-hover:-rotate-2 group-hover:brightness-0 group-hover:invert group-hover:drop-shadow-[0_2px_8px_rgba(255,255,255,0.8)]"
                        />
                      </div>

                      <h2 className="text-lg sm:text-xl font-extrabold text-ink mb-2 group-hover:text-[#00a4d8] transition-colors duration-300">
                        {ind.title}
                      </h2>
                      <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-4 line-clamp-3">
                        {ind.short || ind.desc}
                      </p>
                    </div>

                    <div className="pt-5 border-t border-gray-100/80 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#00a4d8] group-hover:text-[#0284c7] group-hover:gap-2 transition-all">
                        Discover more <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                      <span className="w-2 h-2 rounded-full bg-cyan-200 group-hover:bg-[#00a4d8] transition-colors" />
                    </div>
                  </Link>

                </StaggerItem>
              );
            })}
          </Stagger>
        )}
      </section>
      <CtaBanner />
    </div>
  );
}

