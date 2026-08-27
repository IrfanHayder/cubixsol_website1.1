import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import CtaBanner from '../components/CtaBanner';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-white">
      <Breadcrumb current="Our Products" />

      {/* Hero band */}
      <section className="relative overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-violet-50/40 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[40%] h-full bg-primary-gradient opacity-[0.04] blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <Reveal scale className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-primary-600 bg-primary-50 border border-primary-100 px-3 py-1.5 rounded-full mb-5">
              <Sparkles className="w-3.5 h-3.5" /> Product suite
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight leading-[1.1] mb-4">
              Products built to{' '}
              <span className="bg-clip-text text-transparent bg-primary-gradient">
                run real work
              </span>
            </h1>
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-xl">
              Platforms we design and ship — operations, hiring, learning, and customer insight —
              ready for teams that need clarity, not complexity.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Bento-style product grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {loading ? (
          <p className="text-center text-gray-500 py-16">Loading products...</p>
        ) : (
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5" staggerDelay={0.07}>
            {products.map((p, i) => {
              // first two larger on desktop
              const wide = i === 0 || i === 1;
              return (
                <StaggerItem
                  key={p.slug}
                  hover
                  className={wide ? 'lg:col-span-6' : 'lg:col-span-4'}
                >
                  <Link
                    to={`/products/${p.slug}`}
                    className="group relative flex flex-col h-full rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-100 bg-white shadow-card hover:shadow-elev transition-shadow duration-300"
                  >
                    <div
                      className={`relative overflow-hidden ${
                        wide ? 'aspect-[16/9] sm:aspect-[2/1]' : 'aspect-[16/10]'
                      } bg-gradient-to-br ${p.accent}`}
                    >
                      <motion.img
                        src={p.image}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = `https://picsum.photos/seed/${p.slug}/800/500`;
                        }}
                        alt={p.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        width={800}
                        height={500}
                        whileHover={{ scale: 1.06 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-ink/5 to-transparent opacity-80" />
                      <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/95 backdrop-blur text-ink text-[10px] sm:text-xs font-extrabold tracking-wide uppercase px-2.5 py-1 rounded-full shadow-sm">
                        {p.name}
                      </span>
                    </div>
                    <div className="p-4 sm:p-5 lg:p-6 flex flex-col flex-1">
                      <h2 className="text-base sm:text-lg font-extrabold text-ink leading-snug mb-2 group-hover:text-primary-700 transition-colors">
                        {p.title}
                      </h2>
                      <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1 line-clamp-3">
                        {p.desc}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-600 group-hover:gap-2.5 transition-all">
                        Discover More
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        )}
      </section>

      {/* Bottom CTA strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Reveal>
          <div className="rounded-2xl sm:rounded-3xl bg-ink text-white px-6 sm:px-10 py-8 sm:py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 overflow-hidden relative">
            <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-primary-500/20 blur-2xl pointer-events-none" />
            <div className="relative">
              <h3 className="text-xl sm:text-2xl font-extrabold mb-2">Need a custom product?</h3>
              <p className="text-white/60 text-sm max-w-md leading-relaxed">
                We also build bespoke platforms around your workflows — same craft, your brand.
              </p>
            </div>
            <Link to="/contact" className="relative btn-primary shrink-0">
              Start a conversation <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Reveal>
      </section>

      <CtaBanner />
    </div>
  );
}
