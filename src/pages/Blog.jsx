import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import CtaBanner from '../components/CtaBanner';
import { Search } from 'lucide-react';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';
import { apiFetch } from '../utils/api';
import { useSEO } from '../utils/seo';

function formatBlogDate(dateInput) {
  if (!dateInput) return 'Recently';
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) {
    return dateInput;
  }
  const day = d.getDate();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const month = months[d.getMonth()] || d.toLocaleString('en-US', { month: 'short' });
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

function calculateReadTime(post) {
  const text = `${post.content || ''} ${post.excerpt || ''} ${post.title || ''}`;
  const plainText = text.replace(/<[^>]*>/g, ' ').replace(/[#*_`~[\]]/g, ' ').trim();
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(2, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
}

function parseBlogTags(post) {
  const tags = [];
  if (Array.isArray(post.tags) && post.tags.length > 0) {
    tags.push(...post.tags);
  }
  if (typeof post.tag === 'string' && post.tag.trim()) {
    const split = post.tag.split(/[,|;]/).map((s) => s.trim().toLowerCase()).filter(Boolean);
    tags.push(...split);
  }
  if (
    typeof post.category === 'string' &&
    post.category.trim() &&
    !tags.some((t) => t.toLowerCase() === post.category.toLowerCase())
  ) {
    tags.unshift(post.category.trim().toLowerCase());
  }
  const unique = Array.from(new Set(tags));
  if (unique.length === 0) {
    return ['technology', 'software', 'insights'];
  }
  return unique.slice(0, 3);
}

export default function Blog() {
  const [pageData, setPageData] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState(() => {
    try {
      const cached = localStorage.getItem('cubixsol_blogs_cache');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (_) {}
    return [];
  });
  const [loading, setLoading] = useState(() => {
    try {
      const cached = localStorage.getItem('cubixsol_blogs_cache');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return false;
      }
    } catch (_) {}
    return true;
  });

  useSEO(pageData?.seo, {
    title: 'Our Blog | Insights, Ideas & Tech Trends | Cubixsol',
    description:
      'Explore practical thinking, tech insights, software architecture guides, and digital engineering updates from the Cubixsol team.',
    keywords:
      'technology blog, software engineering insights, custom software development blog, tech news, Cubixsol',
    canonicalUrl: 'https://cubixsol.com/blog',
  });

  useEffect(() => {
    apiFetch('pages/blog')
      .then((data) => {
        if (data) setPageData(data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    let cancelled = false;
    apiFetch('blogs')
      .then((data) => {
        if (cancelled) return;
        const list = Array.isArray(data)
          ? data.filter((p) => !p.status || p.status === 'Published')
          : [];

        const formatted = list.map((p) => {
          const author =
            p.author ||
            (typeof p.author === 'object' && p.author?.name ? p.author.name : 'Cubixsol Team');

          return {
            _id: p._id,
            title: p.title,
            slug: p.slug,
            category: p.category || p.tag || 'Technology',
            tag: p.tag || p.category || 'Tech',
            tags: parseBlogTags(p),
            author,
            readTime: calculateReadTime(p),
            date: formatBlogDate(p.date || p.createdAt),
            color: p.color || 'from-primary-700 to-indigo-900',
            excerpt: p.excerpt,
            coverImage: p.coverImage,
          };
        });

        setPosts(formatted);
        try {
          localStorage.setItem('cubixsol_blogs_cache', JSON.stringify(formatted));
        } catch (_) {}
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

  // Categories list
  const categories = useMemo(() => {
    const set = new Set();
    posts.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ['All', ...Array.from(set)];
  }, [posts]);

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchCat =
        activeCategory === 'All' ||
        (p.category && p.category.toLowerCase() === activeCategory.toLowerCase()) ||
        (p.tag && p.tag.toLowerCase() === activeCategory.toLowerCase());

      const matchQuery =
        !searchQuery.trim() ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.excerpt && p.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

      return matchCat && matchQuery;
    });
  }, [posts, activeCategory, searchQuery]);

  return (
    <div>
      <Breadcrumb current="Blog" />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {/* Header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-10">
          <p className="eyebrow mb-3">Our Blog</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-ink mb-4">
            Insights, Ideas &{' '}
            <span className="bg-clip-text text-transparent bg-primary-gradient">Industry News</span>
          </h1>
          <p className="text-gray-500">
            Practical thinking on technology, design, and growth from the Cubixsol team.
          </p>
        </Reveal>

        {/* Filter Tabs & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          {/* Categories */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActiveCategory(c)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  activeCategory === c
                    ? 'bg-primary-gradient text-white shadow-soft scale-[1.02]'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300 hover:text-primary-600 shadow-2xs'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-9.5 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary-300 transition"
            />
          </div>
        </div>

        {/* Blog Cards Grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white rounded-3xl overflow-hidden border border-gray-150 shadow-card animate-pulse h-96 flex flex-col"
              >
                <div className="h-48 bg-gray-100" />
                <div className="p-6 flex-1 flex flex-col gap-3">
                  <div className="h-3 bg-gray-200 rounded w-1/3 mx-auto" />
                  <div className="h-5 bg-gray-200 rounded w-4/5 mx-auto" />
                  <div className="h-4 bg-gray-100 rounded w-full mt-2" />
                  <div className="h-4 bg-gray-100 rounded w-2/3 mx-auto mt-auto" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-16 text-gray-500 bg-gray-50/50 rounded-3xl border border-gray-100 p-8">
            <p className="text-lg font-bold text-ink mb-1">No blog posts found</p>
            <p className="text-sm text-gray-400">Try selecting a different category or clearing your search.</p>
          </div>
        ) : (
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7" staggerDelay={0.06}>
            {filteredPosts.map((p) => (
              <StaggerItem key={p._id || p.slug || p.title}>
                <Link
                  to={p.slug ? `/blog/${p.slug}` : '/blog'}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-card hover:shadow-soft hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col group cursor-pointer"
                >
                  {/* Top Cover / Illustration Header */}
                  <div className="h-48 sm:h-52 w-full relative overflow-hidden bg-slate-50 flex items-center justify-center p-3 border-b border-gray-100/90">
                    {p.coverImage ? (
                      <img
                        src={p.coverImage}
                        alt={p.title}
                        className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[#00a4d8]/15 via-primary-500/10 to-indigo-500/15 flex items-center justify-center p-4 relative overflow-hidden border border-primary-100/40">
                        {/* Decorative Grid Pattern */}
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00a4d8_1px,transparent_1px)] [background-size:16px_16px]" />
                        <span className="text-[#00a4d8] font-extrabold text-xs tracking-wider uppercase px-3.5 py-1.5 rounded-xl bg-white/90 backdrop-blur-xs shadow-2xs border border-cyan-100 z-10">
                          {p.category || p.tag || 'Cubixsol Article'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Category Eyebrow in Cubixsol Cyan-Blue */}
                      <p className="text-center text-[11px] font-extrabold uppercase tracking-widest text-[#00a4d8] mb-2">
                        {p.category || p.tag || 'Technology'}
                      </p>

                      {/* Blog Title */}
                      <h3 className="text-center font-bold text-ink text-base sm:text-lg mb-2.5 leading-snug group-hover:text-primary-600 transition-colors line-clamp-2">
                        {p.title}
                      </h3>

                      {/* Excerpt */}
                      {p.excerpt && (
                        <p className="text-xs sm:text-sm text-gray-500 text-center leading-relaxed mb-4 line-clamp-3">
                          {p.excerpt}
                        </p>
                      )}

                      {/* Tags Pills List */}
                      {Array.isArray(p.tags) && p.tags.length > 0 && (
                        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-4">
                          {p.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[11px] font-medium text-gray-600 bg-gray-100/90 px-2.5 py-0.5 rounded-md border border-gray-200/60 group-hover:border-primary-200 group-hover:text-primary-700 transition-colors"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom Meta Row: Author, Read Time, Date */}
                    <div className="pt-3.5 border-t border-gray-100 mt-auto flex items-center justify-between text-xs text-gray-500 font-medium">
                      <span
                        className="font-semibold text-ink truncate max-w-[130px]"
                        title={p.author || 'Cubixsol Team'}
                      >
                        {p.author || 'Cubixsol Team'}
                      </span>
                      <div className="flex items-center gap-1.5 text-gray-400 shrink-0 text-[11px]">
                        <span>{p.readTime || '4 min read'}</span>
                        <span>·</span>
                        <span>{p.date}</span>
                      </div>
                    </div>
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
