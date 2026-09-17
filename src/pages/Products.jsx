import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles, Filter, ExternalLink } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import CtaBanner from '../components/CtaBanner';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';
import { products as fallbackProducts } from '../data/content';
import { apiFetch } from '../utils/api';

const PRODUCT_META = {
  'workstream': {
    category: 'ENTERPRISE OPERATIONS',
    tags: ['DESIGN', 'BUILD'],
    filterGroup: 'enterprise',
    featured: true,
  },
  'hirestream': {
    category: 'RECRUITMENT AUTOMATION',
    tags: ['DESIGN', 'BUILD'],
    filterGroup: 'enterprise',
    featured: true,
  },
  'fix-alert': {
    category: 'MAINTENANCE REPORTING',
    tags: ['DESIGN', 'BUILD'],
    filterGroup: 'enterprise',
    featured: true,
  },
  'schoolgram': {
    category: 'SCHOOL COMMUNICATION',
    tags: ['DESIGN', 'BUILD'],
    filterGroup: 'enterprise',
    featured: true,
  },
  'image-to-text': {
    category: 'FREE ONLINE OCR',
    tags: ['DESIGN', 'BUILD'],
    filterGroup: 'tools',
    featured: false,
  },
  'reescrever-texto': {
    category: 'AI TEXT REWRITER',
    tags: ['DESIGN', 'BUILD'],
    filterGroup: 'ai',
    featured: false,
  },
  'jpg-a-pdf': {
    category: 'CONVERT JPG TO PDF',
    tags: ['DESIGN', 'BUILD'],
    filterGroup: 'tools',
    featured: false,
  },
  'jpg-to-pdf': {
    category: 'JPG TO PDF CONVERTER',
    tags: ['DESIGN', 'BUILD'],
    filterGroup: 'tools',
    featured: false,
  },
  'ai-seo-auditor': {
    category: 'AI-POWERED SEO AUDITOR',
    tags: ['DESIGN', 'BUILD'],
    filterGroup: 'ai',
    featured: true,
  },
};

export default function Products() {
  const [filter, setFilter] = useState('All');
  const [productsList, setProductsList] = useState(() => {
    try {
      const cached = localStorage.getItem('cubixsol_products_cache');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (_) {}
    return fallbackProducts || [];
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiFetch('products')
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProductsList(data);
          try {
            localStorage.setItem('cubixsol_products_cache', JSON.stringify(data));
          } catch (_) {}
        }
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
      });
  }, []);

  const filteredProducts = useMemo(() => {
    if (filter === 'All') return productsList;
    if (filter === 'Featured') {
      return productsList.filter((p) => PRODUCT_META[p.slug]?.featured);
    }
    if (filter === 'Enterprise') {
      return productsList.filter(
        (p) => PRODUCT_META[p.slug]?.filterGroup === 'enterprise' || p.category === 'enterprise'
      );
    }
    if (filter === 'AI') {
      return productsList.filter(
        (p) =>
          PRODUCT_META[p.slug]?.filterGroup === 'ai' ||
          (p.slug && p.slug.includes('ai')) ||
          p.category === 'ai'
      );
    }
    if (filter === 'Tools') {
      return productsList.filter(
        (p) =>
          PRODUCT_META[p.slug]?.filterGroup === 'tools' ||
          p.category === 'accessibility' ||
          p.externalUrl
      );
    }
    return productsList;
  }, [filter, productsList]);

  return (
    <div className="bg-[#0b1220] min-h-screen text-slate-100 selection:bg-[#00a4d8] selection:text-white">
      {/* Top Breadcrumb */}
      <div className="border-b border-slate-800/60 pb-3">
        <Breadcrumb current="Our Products" dark={true} />
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-20 sm:pb-24">
        {/* Header Section with Decorative Curved Accent Line */}
        <Reveal direction="up" className="relative mb-10 sm:mb-14">
          {/* Glowing Top Frame Line */}
          <div className="relative pb-6 border-b border-slate-800/80">
            {/* Curved Neon Accent Stroke */}
            <div className="relative flex items-center mb-5">
              <div className="h-[3px] w-48 sm:w-80 bg-gradient-to-r from-[#00a4d8] via-[#0284c7] to-transparent rounded-full shadow-[0_0_12px_rgba(0,164,216,0.6)]" />
              <div className="hidden sm:block flex-1 h-[1px] bg-gradient-to-r from-slate-800 to-transparent" />
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-[#00a4d8] mb-2">
                  <Sparkles className="w-3.5 h-3.5" /> Product Suite & SaaS
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Selected works
                </h1>
                <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                  Platforms, software suites, and intelligent digital products designed and shipped by Cubixsol.
                </p>
              </div>

              {/* Filter By Dropdown */}
              <div className="flex items-center gap-3 self-start md:self-end shrink-0 pt-2 md:pt-0">
                <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                  FILTER BY:
                </span>
                <div className="relative">
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="appearance-none bg-[#121c2d] hover:bg-[#162338] text-white text-xs font-bold pl-3.5 pr-9 py-2.5 rounded-xl border border-slate-700/80 hover:border-[#00a4d8] focus:border-[#00a4d8] focus:ring-2 focus:ring-[#00a4d8]/20 outline-none transition cursor-pointer shadow-sm"
                  >
                    <option value="All" className="bg-[#121c2d] text-white">All Works</option>
                    <option value="Featured" className="bg-[#121c2d] text-white">Featured</option>
                    <option value="Enterprise" className="bg-[#121c2d] text-white">Enterprise & SaaS</option>
                    <option value="AI" className="bg-[#121c2d] text-white">AI & Automation</option>
                    <option value="Tools" className="bg-[#121c2d] text-white">Online Tools</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-[#00a4d8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Products 4-Column Grid */}
        <Stagger
          key={filter}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6"
          staggerDelay={0.05}
        >
          {filteredProducts.map((p) => {
            const meta = PRODUCT_META[p.slug] || {
              category: p.tagline || 'SOFTWARE SOLUTION',
              tags: ['DESIGN', 'BUILD'],
            };

            const isExternal = p.externalUrl && /^https?:\/\//i.test(p.externalUrl);

            const CardBody = (
              <div className="group relative flex flex-col h-full rounded-t-[34px] sm:rounded-t-[40px] rounded-b-2xl overflow-hidden bg-[#111928] border border-slate-800/90 hover:border-[#00a4d8]/80 hover:shadow-[0_12px_32px_rgba(0,164,216,0.18)] transition-all duration-300">
                {/* Upper Arch Image Container */}
                <div className="aspect-[4/3] w-full overflow-hidden relative bg-slate-900 rounded-t-[34px] sm:rounded-t-[40px]">
                  <img
                    src={p.image}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = `https://picsum.photos/seed/${p.slug}/800/600`;
                    }}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                  {/* Subtle Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111928] via-slate-950/20 to-transparent opacity-70 pointer-events-none" />

                  {isExternal && (
                    <span className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-slate-900/80 backdrop-blur border border-slate-700/80 flex items-center justify-center text-slate-300 group-hover:text-[#00a4d8] group-hover:border-[#00a4d8] transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>

                {/* Lower Information Panel */}
                <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-[#111928]">
                  <div>
                    {/* Category Label */}
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1 truncate">
                      {meta.category}
                    </span>

                    {/* Product Name / Title */}
                    <h2 className="text-sm sm:text-base font-bold text-white group-hover:text-[#00a4d8] transition-colors line-clamp-1">
                      {p.name}
                    </h2>
                  </div>

                  {/* Bottom Tags / Status */}
                  <div className="flex items-center justify-end gap-3 mt-3.5 pt-3 border-t border-slate-800/70">
                    {meta.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-[#00a4d8] tracking-wider uppercase"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00a4d8] shadow-[0_0_6px_rgba(0,164,216,0.8)]" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );

            return (
              <StaggerItem key={p.slug} hover className="h-full">
                {isExternal ? (
                  <a
                    href={p.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full cursor-pointer focus:outline-none"
                  >
                    {CardBody}
                  </a>
                ) : (
                  <Link
                    to={p.externalUrl ? p.externalUrl : `/products/${p.slug}`}
                    className="block h-full cursor-pointer focus:outline-none"
                  >
                    {CardBody}
                  </Link>
                )}
              </StaggerItem>
            );
          })}
        </Stagger>

        {/* Custom Solution Callout Box */}
        <div className="mt-16 sm:mt-20">
          <Reveal>
            <div className="rounded-3xl bg-gradient-to-br from-[#121c2d] to-[#0d1624] border border-slate-800/90 p-6 sm:p-10 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
              <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-[#00a4d8]/10 blur-3xl pointer-events-none" />
              <div className="relative max-w-xl">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-[#00a4d8] mb-2">
                  <Sparkles className="w-3.5 h-3.5" /> Bespoke Engineering
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2 leading-tight">
                  Need a custom software product built for your business?
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  We design, architect, and engineer dedicated web platforms, mobile apps, and SaaS solutions tailored to your exact workflows.
                </p>
              </div>
              <Link
                to="/contact"
                className="relative inline-flex items-center gap-2 bg-[#00a4d8] hover:bg-[#0284c7] text-white font-bold px-6 py-3.5 rounded-2xl transition-all duration-300 shadow-lg shadow-[#00a4d8]/25 shrink-0 cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </main>

      {/* Global CTA Banner */}
      <CtaBanner />
    </div>
  );
}
