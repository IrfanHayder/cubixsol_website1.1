import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Sparkles, ExternalLink } from 'lucide-react';
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
    <div className="bg-white min-h-screen">
      {/* Breadcrumb Navigation */}
      <Breadcrumb current="Our Products" />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 pb-20 sm:pb-24">
        {/* Header Section with Brand Logo Gradient Curved Accent */}
        <Reveal direction="up" className="relative mb-10 sm:mb-14">
          <div className="relative pb-6 border-b border-gray-200/90">
            {/* Curved Logo Gradient Stroke on Top */}
            <div className="relative flex items-center mb-5">
              <div className="h-[3.5px] w-48 sm:w-80 bg-primary-gradient rounded-full shadow-sm" />
              <div className="hidden sm:block flex-1 h-[1px] bg-gradient-to-r from-gray-200 to-transparent" />
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-primary-600 bg-primary-50 border border-primary-100 px-3 py-1 rounded-full mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-[#00a4d8]" /> Product Suite & SaaS
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-ink tracking-tight leading-tight">
                  Selected works
                </h1>
                <p className="text-gray-500 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
                  Platforms, software suites, and intelligent digital products designed and shipped by Cubixsol.
                </p>
              </div>

              {/* Filter By Dropdown matching logo color scheme */}
              <div className="flex items-center gap-3 self-start md:self-end shrink-0 pt-2 md:pt-0">
                <span className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                  FILTER BY:
                </span>
                <div className="relative">
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="appearance-none bg-white hover:bg-gray-50 text-ink text-xs font-bold pl-3.5 pr-9 py-2.5 rounded-xl border border-gray-200 hover:border-[#00a4d8] focus:border-[#00a4d8] focus:ring-2 focus:ring-[#00a4d8]/15 outline-none transition cursor-pointer shadow-xs"
                  >
                    <option value="All">All Works</option>
                    <option value="Featured">Featured</option>
                    <option value="Enterprise">Enterprise & SaaS</option>
                    <option value="AI">AI & Automation</option>
                    <option value="Tools">Online Tools</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-[#00a4d8] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Products 4-Column Arched Grid */}
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
              <div className="group relative flex flex-col h-full rounded-t-[36px] sm:rounded-t-[42px] rounded-b-2xl overflow-hidden bg-white border border-gray-200/80 hover:border-[#00a4d8] shadow-card hover:shadow-elev hover:-translate-y-1 transition-all duration-300">
                {/* Upper Arched Image Container */}
                <div className="aspect-[4/3] w-full overflow-hidden relative bg-gray-100 rounded-t-[36px] sm:rounded-t-[42px]">
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
                  {/* Subtle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none" />

                  {isExternal && (
                    <span className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur border border-gray-200 flex items-center justify-center text-gray-700 group-hover:text-[#00a4d8] group-hover:border-[#00a4d8] transition-colors shadow-xs">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>

                {/* Lower Information Panel */}
                <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-white">
                  <div>
                    {/* Category Label */}
                    <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-1 truncate">
                      {meta.category}
                    </span>

                    {/* Product Name / Title */}
                    <h2 className="text-sm sm:text-base font-bold text-ink group-hover:text-[#00a4d8] transition-colors line-clamp-1">
                      {p.name}
                    </h2>
                  </div>

                  {/* Bottom Tags / Status matching reference */}
                  <div className="flex items-center justify-end gap-3 mt-3.5 pt-3 border-t border-gray-100">
                    {meta.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold text-[#00a4d8] tracking-wider uppercase"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00a4d8] shadow-xs" />
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
            <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-[#1a1a2e] text-white p-6 sm:p-10 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
              <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-[#00a4d8]/20 blur-3xl pointer-events-none" />
              <div className="relative max-w-xl">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-[#00a4d8] mb-2">
                  <Sparkles className="w-3.5 h-3.5" /> Bespoke Engineering
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2 leading-tight">
                  Need a custom software product built for your business?
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  We design, architect, and engineer dedicated web platforms, mobile apps, and SaaS solutions tailored to your exact workflows.
                </p>
              </div>
              <Link
                to="/contact"
                className="relative inline-flex items-center gap-2 bg-primary-gradient hover:opacity-95 text-white font-bold px-7 py-3.5 rounded-2xl transition-all duration-300 shadow-lg shadow-[#00a4d8]/25 shrink-0 cursor-pointer"
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
