import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, RefreshCw, Sparkles, TrendingUp, Users2 } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import CtaBanner from '../components/CtaBanner';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';
import { apiFetch } from '../utils/api';

const filters = ['All Projects', 'Web Development', 'Mobile Apps', 'E-Commerce', 'SaaS', 'AI Solutions'];
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
  const [visibleCount, setVisibleCount] = useState(8);
  const [projects, setProjects] = useState(() => {
    try {
      const cached = localStorage.getItem('cubixsol_projects_cache');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (_) {}
    return [];
  });
  const [loading, setLoading] = useState(() => {
    try {
      const cached = localStorage.getItem('cubixsol_projects_cache');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return false;
      }
    } catch (_) {}
    return true;
  });

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
            <p className="text-gray-500 mb-6">
              Explore our portfolio of successful digital solutions that help businesses grow, engage, and achieve their goals.
            </p>
            <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-500">
              <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-primary-600" /> Innovative Solutions</span>
              <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4 text-primary-600" /> Measurable Impact</span>
              <span className="flex items-center gap-1.5"><Users2 className="w-4 h-4 text-primary-600" /> Client Satisfaction</span>
            </div>
          </Reveal>
          <Reveal direction="left" delay={0.1} className="rounded-3xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-slate-800 to-primary-900 hidden md:flex items-center justify-center shadow-md">
            <span className="text-white/80 font-bold text-lg">Portfolio Showcase</span>
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
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition shadow-xs ${
                filter === f ? 'bg-primary-gradient text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200/80 hover:border-primary-300 hover:text-primary-600'
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
            {shown.map((p, idx) => (
              <StaggerItem key={p._id || p.slug || p.title || idx}>
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-card hover:shadow-soft hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full group">
                  {/* Card Header with Vibrant Gradient */}
                  <div
                    style={getCardStyle(idx)}
                    className="h-40 flex flex-col justify-between p-4 relative overflow-hidden shrink-0"
                  >
                    <div className="flex items-center justify-between gap-1.5 z-10">
                      <span className="text-white text-[11px] font-extrabold bg-black/35 backdrop-blur-md px-2.5 py-0.5 rounded-md shadow-xs">
                        {p.tag || p.category || 'Web Development'}
                      </span>
                      {p.industry && (
                        <span className="text-white/90 text-[10px] font-semibold bg-white/20 backdrop-blur-md px-2 py-0.5 rounded line-clamp-1 max-w-[130px] text-right">
                          {p.industry}
                        </span>
                      )}
                    </div>
                    <div className="z-10">
                      <h4 className="text-white text-lg sm:text-xl font-bold tracking-tight drop-shadow-sm line-clamp-1">
                        {p.title}
                      </h4>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-ink text-base sm:text-lg mb-1.5 group-hover:text-primary-600 transition-colors line-clamp-1">
                        {p.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">
                        {p.desc || p.description}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-gray-100 mt-auto">
                      {p.url ? (
                        <a
                          href={p.url.startsWith('http') ? p.url : `https://${p.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs sm:text-sm font-bold text-primary-600 hover:text-primary-700 inline-flex items-center gap-1.5 transition group-hover:underline"
                        >
                          Visit Website <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <Link to="/contact" className="text-xs sm:text-sm font-bold text-primary-600 inline-flex items-center gap-1">
                          View Case Study <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        )}

        {!loading && visibleCount < filtered.length && (
          <div className="text-center mt-12">
            <button onClick={() => setVisibleCount((v) => v + 8)} className="btn-outline">
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
