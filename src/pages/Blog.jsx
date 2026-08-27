import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import CtaBanner from '../components/CtaBanner';
import { ArrowRight } from 'lucide-react';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';
import { apiFetch } from '../utils/api';

const fallbackPosts = [
  { title: 'How AI Is Reshaping Digital Product Development', tag: 'AI', date: 'Jul 12, 2026', color: 'from-primary-700 to-indigo-900', slug: 'ai-reshaping-digital-product' },
  { title: '5 Signs Your Business Needs a Cloud Migration', tag: 'Cloud', date: 'Jun 28, 2026', color: 'from-sky-600 to-blue-800', slug: 'cloud-migration-signs' },
  { title: 'Laravel vs Node.js: Choosing the Right Backend', tag: 'Web Development', date: 'Jun 09, 2026', color: 'from-red-500 to-orange-600', slug: 'laravel-vs-nodejs' },
  { title: 'Designing Mobile Apps People Actually Enjoy Using', tag: 'UI/UX', date: 'May 22, 2026', color: 'from-pink-500 to-rose-600', slug: 'mobile-app-design' },
  { title: "A Founder's Guide to Scaling an E-Commerce Store", tag: 'E-Commerce', date: 'May 03, 2026', color: 'from-amber-500 to-orange-500', slug: 'ecommerce-scaling-guide' },
  { title: 'Why Client-Centric Delivery Wins Long-Term Partners', tag: 'Company', date: 'Apr 18, 2026', color: 'from-emerald-500 to-teal-700', slug: 'client-centric-delivery' },
];

export default function Blog() {
  const [posts, setPosts] = useState(fallbackPosts);

  useEffect(() => {
    let cancelled = false;
    apiFetch('blogs')
      .catch(() => [])
      .then((data) => {
        if (cancelled) return;
        const list = Array.isArray(data)
          ? data.filter((p) => !p.status || p.status === 'Published')
          : [];
        if (list.length > 0) {
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
        }
      })
      .catch(() => {});
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
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.07}>
          {posts.map((p) => (
            <StaggerItem key={p.slug || p.title}>
              <Link
                to={p.slug ? `/blog/${p.slug}` : '/blog'}
                className="block bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-card hover:-translate-y-1.5 hover:shadow-soft transition-all duration-300 h-full flex flex-col"
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
                  <h3 className="font-bold text-ink mb-3 leading-snug group-hover:text-primary-600">
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
      </section>
      <CtaBanner />
    </div>
  );
}
