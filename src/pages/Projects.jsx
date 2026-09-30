import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, RefreshCw, Sparkles, TrendingUp, Users2 } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import CtaBanner from '../components/CtaBanner';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';
import { apiFetch } from '../utils/api';
import { projects as fallbackProjects } from '../data/content';

const filters = ['All Projects', 'Web Development', 'E-Commerce', 'SaaS', 'Telecommunications', 'Mobile Apps', 'AI Solutions'];
const GRADIENT_STYLES = [
  'linear-gradient(135deg, #0284c7 0%, #1e40af 100%)',
  'linear-gradient(135deg, #5d53a3 0%, #312e81 100%)',
  'linear-gradient(135deg, #059669 0%, #0f766e 100%)',
  'linear-gradient(135deg, #e11d48 0%, #9f1239 100%)',
  'linear-gradient(135deg, #00a4d8 0%, #0369a1 100%)',
  'linear-gradient(135deg, #d97706 0%, #c2410c 100%)',
  'linear-gradient(135deg, #7c3aed 0%, #4338ca 100%)',
  'linear-gradient(135deg, #0d9488 0%, #115e59 100%)',
  'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
  'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
  'linear-gradient(135deg, #c026d3 0%, #701a75 100%)',
  'linear-gradient(135deg, #ea580c 0%, #991b1b 100%)',
];

const getCardStyle = (idx) => ({
  background: GRADIENT_STYLES[idx % GRADIENT_STYLES.length],
});

const techs = ['Laravel', 'PHP', 'React', 'Next.js', 'Vue.js', 'Node.js', 'Flutter', 'AWS'];

export default function Projects() {
  const [filter, setFilter] = useState('All Projects');
  const [visibleCount, setVisibleCount] = useState(12);
  const [projects, setProjects] = useState(() => {
    try {
      const cached = localStorage.getItem('cubixsol_projects_cache');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (_) {}
    return Array.isArray(fallbackProjects) ? fallbackProjects : [];
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiFetch('projects')
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
          try {
            localStorage.setItem('cubixsol_projects_cache', JSON.stringify(data));
          } catch (_) {}
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching projects:', err);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    if (filter === 'All Projects') return projects;
    return projects.filter((p) => p.tag === filter || p.category === filter);
  }, [filter, projects]);

  const shown = filtered.slice(0, visibleCount);

  return (
    <div>
      <Breadcrumb current="Projects" />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <Reveal direction="right">
            <p className="eyebrow mb-3">Our Projects</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-ink mb-5">
              Real Projects. <span className="bg-clip-text text-transparent bg-primary-gradient">Real Results.</span>
            </h1>
            <div className="space-y-4 text-gray-500 mb-6 leading-relaxed text-sm sm:text-base">
              <p>
                Explore our diverse portfolio of enterprise web applications, custom software platforms, SaaS systems, and scalable mobile apps.
              </p>
              <p>
                At Cubixsol, our multidisciplinary team combines cutting-edge full-stack engineering, intuitive UI/UX design, and AI automation to deliver high-impact digital solutions that streamline complex workflows, accelerate user acquisition, and drive measurable revenue growth for fast-scaling startups and global enterprises.
              </p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-500">
              <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-[#00a4d8]" /> Innovative Solutions</span>
              <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4 text-[#00a4d8]" /> Measurable Impact</span>
              <span className="flex items-center gap-1.5"><Users2 className="w-4 h-4 text-[#00a4d8]" /> Client Satisfaction</span>
            </div>
          </Reveal>
          <Reveal direction="left" delay={0.1} className="rounded-3xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 p-6 sm:p-8 hidden md:flex flex-col justify-between shadow-soft border border-slate-700/50 relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00a4d8]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center justify-between z-10">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#00a4d8] bg-[#00a4d8]/10 px-3 py-1 rounded-lg border border-[#00a4d8]/20">
                Portfolio Showcase
              </span>
              <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Live Projects
              </span>
            </div>

            <div className="my-auto z-10">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                Engineering Digital Excellence
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md">
                From scalable cloud architectures to intelligent web & mobile applications, discover how we build scalable digital products for forward-thinking businesses.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-700/60 z-10">
              <div>
                <p className="text-xl sm:text-2xl font-black text-white">49+</p>
                <p className="text-[11px] text-slate-400 font-medium">Projects Done</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#00a4d8]">99%</p>
                <p className="text-[11px] text-slate-400 font-medium">Satisfaction</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-emerald-400">15+</p>
                <p className="text-[11px] text-slate-400 font-medium">Industries</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FILTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => { setFilter(f); setVisibleCount(8); }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition shadow-xs cursor-pointer ${
                filter === f ? 'bg-gradient-to-r from-[#00a4d8] to-[#0284c7] text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200/80 hover:border-[#00a4d8] hover:text-[#00a4d8]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>


      {/* GRID: 4 COLUMNS ON XL/2XL, 3 ON LG, 2 ON SM, 1 ON MOBILE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {loading ? (
          <p className="text-center text-gray-500 py-16">Loading projects...</p>
        ) : shown.length === 0 ? (
          <p className="text-center text-gray-400 py-16">No projects found in this category yet.</p>
        ) : (
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6" staggerDelay={0.04}>
            {shown.map((p, idx) => {
              const rawUrl = p.url || p.link || p.externalUrl || p.website || p.websiteUrl;
              const isExternal = rawUrl && (rawUrl.startsWith('http://') || rawUrl.startsWith('https://') || rawUrl.includes('.'));
              const targetUrl = isExternal
                ? (rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`)
                : (rawUrl || '/contact');

              const CardContent = (
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-card hover:shadow-[0_20px_40px_-10px_rgba(0,164,216,0.18)] hover:border-cyan-300 hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full group cursor-pointer">
                  {/* Card Header with Image or Vibrant Gradient */}
                  <div
                    style={!p.image ? getCardStyle(idx) : undefined}
                    className="h-44 flex flex-col justify-between p-4 relative overflow-hidden shrink-0 bg-slate-900"
                  >
                    {p.image && (
                      <img
                        src={p.image}
                        alt={p.title}
                        className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    )}
                    {/* Contrast Gradient Overlay */}
                    <div
                      className={`absolute inset-0 pointer-events-none ${
                        p.image
                          ? 'bg-gradient-to-t from-black/85 via-black/35 to-black/40'
                          : 'bg-gradient-to-t from-black/25 via-transparent to-transparent'
                      }`}
                    />

                    <div className="flex items-center justify-between gap-1.5 z-10">
                      <span className="text-white text-[11px] font-extrabold bg-black/50 backdrop-blur-md px-3 py-1 rounded-full shadow-xs border border-white/15">
                        {p.tag || p.category || 'Web Development'}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {p.industry && (
                        <p className="text-[11px] font-bold tracking-wider text-[#00a4d8] uppercase mb-1 line-clamp-1">
                          {p.industry}
                        </p>
                      )}
                      <h3 className="font-bold text-ink text-base sm:text-lg mb-1.5 group-hover:text-[#00a4d8] transition-colors line-clamp-1">
                        {p.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">
                        {p.desc || p.description}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-gray-100 mt-auto flex items-center justify-between">
                      {rawUrl ? (
                        <span className="text-xs sm:text-sm font-bold text-[#00a4d8] group-hover:text-[#0284c7] inline-flex items-center gap-1.5 transition group-hover:underline">
                          Visit Website <ExternalLink className="w-3.5 h-3.5" />
                        </span>
                      ) : (
                        <span className="text-xs sm:text-sm font-bold text-[#00a4d8] group-hover:text-[#0284c7] inline-flex items-center gap-1 transition group-hover:underline">
                          View Case Study <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );


              return (
                <StaggerItem key={p._id || p.slug || p.title || idx}>
                  {isExternal ? (
                    <a
                      href={targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full no-underline"
                      title={`Open ${p.title} website`}
                    >
                      {CardContent}
                    </a>
                  ) : (
                    <Link
                      to={targetUrl}
                      className="block h-full no-underline"
                      title={`View ${p.title}`}
                    >
                      {CardContent}
                    </Link>
                  )}
                </StaggerItem>
              );
            })}
          </Stagger>
        )}

        {!loading && visibleCount < filtered.length && (
          <div className="text-center mt-12">
            <button onClick={() => setVisibleCount((v) => v + 12)} className="btn-outline">
              Load More Projects <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* TECH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Reveal className="bg-gray-50 rounded-3xl p-8 sm:p-10 grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="eyebrow mb-3">Technologies We Work With</p>
            <p className="text-gray-500 mb-6">Using the best technologies to build exceptional solutions.</p>
            <div className="flex flex-wrap gap-4">
              {techs.map((t) => (
                <span key={t} className="px-3 py-1.5 bg-white rounded-lg text-sm font-semibold text-gray-600 border border-gray-200">{t}</span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 text-center">
            {[['200+', 'Projects Delivered'], ['150+', 'Happy Clients'], ['98%', 'Client Satisfaction']].map(([num, label]) => (
              <div key={label}>
                <p className="text-3xl font-extrabold text-ink">{num}</p>
                <p className="text-xs text-gray-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <CtaBanner />
    </div>
  );
}
