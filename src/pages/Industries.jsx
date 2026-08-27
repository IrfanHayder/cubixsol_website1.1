import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useState, useEffect } from 'react';
import CtaBanner from '../components/CtaBanner';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';

export default function Industries() {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/industries')
      .then(res => res.json())
      .then(data => {
        setIndustries(data);
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
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5" staggerDelay={0.05}>
            {industries.map((ind) => {
              const Icon = Icons[ind.icon] || Icons.Building2;
              return (
                <StaggerItem key={ind.slug} hover>
                  <Link
                    to={`/industries/${ind.slug}`}
                    className="group flex flex-col h-full rounded-2xl border border-gray-100 bg-white p-5 sm:p-6 shadow-card hover:shadow-elev hover:border-primary-100 transition"
                  >
                    <span className="w-11 h-11 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4 group-hover:bg-primary-gradient group-hover:text-white transition">
                      <Icon className="w-5 h-5" />
                    </span>
                    <h2 className="text-lg font-extrabold text-ink mb-2">{ind.title}</h2>
                    <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-4">{ind.short}</p>
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-primary-600 group-hover:gap-2 transition-all">
                      Discover more <ArrowRight className="w-4 h-4" />
                    </span>
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
