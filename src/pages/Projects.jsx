import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, RefreshCw, Sparkles, TrendingUp, Users2 } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import CtaBanner from '../components/CtaBanner';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';
import { apiFetch } from '../utils/api';

const filters = ['All Projects', 'Web Development', 'Mobile Apps', 'E-Commerce', 'SaaS', 'AI Solutions'];
const techs = ['Laravel', 'PHP', 'React', 'Next.js', 'Vue.js', 'Node.js', 'Flutter', 'AWS'];

export default function Projects() {
  const [filter, setFilter] = useState('All Projects');
  const [visibleCount, setVisibleCount] = useState(6);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch('projects')
      .then(data => {
        setProjects(Array.isArray(data) ? data : []);
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

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
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
          <Reveal direction="left" delay={0.1} className="rounded-3xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-slate-800 to-primary-900 hidden md:flex items-center justify-center">
            <span className="text-white/80 font-bold text-lg">Portfolio Showcase</span>
          </Reveal>
        </div>
      </section>

      {/* FILTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => { setFilter(f); setVisibleCount(6); }}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
                filter === f ? 'bg-primary-gradient text-white' : 'bg-white text-gray-500 border border-gray-200 hover:border-primary-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {loading ? (
          <p className="text-center text-gray-500 py-16">Loading projects...</p>
        ) : shown.length === 0 ? (
          <p className="text-center text-gray-400 py-16">No projects found in this category yet.</p>
        ) : (
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.06}>
            {shown.map((p) => (
              <StaggerItem key={p.title}>
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-card group hover:-translate-y-1.5 hover:shadow-soft transition-all duration-300">
                  <div className={`h-44 bg-gradient-to-br ${p.color} flex items-start p-4`}>
                    <span className="text-white/90 text-xs font-bold bg-black/25 px-2.5 py-1 rounded">{p.tag}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-ink mb-1.5">{p.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">{p.desc}</p>
                    <Link to="/contact" className="text-sm font-semibold text-primary-600 inline-flex items-center gap-1">
                      View Case Study <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        )}

        {!loading && visibleCount < filtered.length && (
          <div className="text-center mt-10">
            <button onClick={() => setVisibleCount((v) => v + 6)} className="btn-outline">
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
