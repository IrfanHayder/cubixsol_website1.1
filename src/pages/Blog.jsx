import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import CtaBanner from '../components/CtaBanner';
import { ArrowRight } from 'lucide-react';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';
import { apiFetch } from '../utils/api';


export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    apiFetch('blogs')
      .then((data) => {
        if (cancelled) return;
        const list = Array.isArray(data)
          ? data.filter((p) => !p.status || p.status === 'Published')
          : [];
        setPosts(
          list.map((p) => ({
            title: p.title,
            slug: p.slug,
            tag: p.tag || p.category || 'Blog',
            date:
              p.date ||
              (p.createdAt
                ? new Date(p.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })
                : ''),
            color: p.color || 'from-primary-700 to-indigo-900',
            excerpt: p.excerpt,
            coverImage: p.coverImage,
          }))
        );
      })
      .catch(() => {
        if (!cancelled) setPosts([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      <Breadcrumb current="Blog" />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <p className="eyebrow mb-3">Our Blog</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-ink mb-4">
            Insights, Ideas &{' '}
            <span className="bg-clip-text text-transparent bg-primary-gradient">Industry News</span>
          </h1>
          <p className="text-gray-500">
            Practical thinking on technology, design, and growth from the Cubixsol team.
          </p>
        </Reveal>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-card animate-pulse h-80 flex flex-col"
              >
                <div className="h-40 bg-gray-200" />
                <div className="p-5 flex-1 flex flex-col gap-3">
                  <div className="h-3 bg-gray-200 rounded w-1/4" />
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-full mt-auto" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg font-semibold mb-2">No blog posts found</p>
            <p className="text-sm">Check back later for new insights and updates.</p>
          </div>
        ) : (
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.07}>
            {posts.map((p) => (
              <StaggerItem key={p.slug || p.title}>
                <Link
                  to={p.slug ? `/blog/${p.slug}` : '/blog'}
                  className="block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-card hover:-translate-y-1.5 hover:shadow-soft transition-all duration-300 h-full flex flex-col group"
                >
                  <div
                    className={`h-40 bg-gradient-to-br ${p.color} flex items-end p-4 relative`}
                    style={
                      p.coverImage
                        ? {
                            backgroundImage: `url(${p.coverImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }
                        : undefined
                    }
                  >
                    <span className="text-white/90 text-xs font-bold bg-black/25 px-2.5 py-1 rounded backdrop-blur-sm">
                      {p.tag}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <p className="text-xs text-gray-400 mb-2">{p.date}</p>
                    <h3 className="font-bold text-ink mb-3 leading-snug group-hover:text-primary-600 transition-colors">
                      {p.title}
                    </h3>
                    {p.excerpt && (
                      <p className="text-sm text-gray-500 mb-3 line-clamp-2 flex-1">{p.excerpt}</p>
                    )}
                    <span className="text-sm font-semibold text-primary-600 inline-flex items-center gap-1 mt-auto">
                      Read More <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </section>
      <CtaBanner />
    </div>
  );
}
