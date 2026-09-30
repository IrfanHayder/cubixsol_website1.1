import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import CtaBanner from '../components/CtaBanner';
import { Search, X, Sparkles, Hash } from 'lucide-react';
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
  if (typeof post.tags === 'string' && post.tags.trim()) {
    const split = post.tags.split(/[,|;]/).map((s) => s.trim().toLowerCase()).filter(Boolean);
    tags.push(...split);
  }
  if (
    typeof post.category === 'string' &&
    post.category.trim() &&
    !tags.some((t) => t.toLowerCase() === post.category.toLowerCase())
  ) {
    tags.unshift(post.category.trim().toLowerCase());
  }

  // Keep only clean, short 1-2 word tags (no sentences/questions)
  const shortClean = tags
    .map((t) => t.trim().toLowerCase())
    .filter(
      (t) =>
        t.length >= 2 &&
        t.length <= 16 &&
        t.split(/\s+/).length <= 2 &&
        !t.includes('how to') &&
        !t.includes('2026') &&
        !t.includes('2025')
    );

  const unique = Array.from(new Set(shortClean));
  if (unique.length === 0) {
    return ['tech', 'software', 'cloud'];
  }
  return unique.slice(0, 3);
}

export default function Blog() {
  const [pageData, setPageData] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTopic, setActiveTopic] = useState(null);
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

  // Category counts and list
  const categoryCounts = useMemo(() => {
    const counts = { All: posts.length };
    posts.forEach((p) => {
      const cat = p.category || 'General';
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [posts]);

  const categories = useMemo(() => {
    const set = new Set();
    posts.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ['All', ...Array.from(set)];
  }, [posts]);

  // Clean, short 1-2 word topics list
  const allTopics = useMemo(() => {
    const defaultTopics = [
      'Web Dev',
      'Mobile',
      'AI & ML',
      'Cloud',
      'SaaS',
      'DevOps',
      'Fintech',
      'UI/UX',
      'APIs',
      'Security',
      'SEO',
      'Automation',
      'Ecommerce',
      'Database',
      'PMS',
      'React',
      'Node.js',
      'Design',
    ];

    const dynamicShortTags = new Set();
    posts.forEach((p) => {
      if (Array.isArray(p.tags)) {
        p.tags.forEach((t) => {
          if (typeof t === 'string') {
            const clean = t.trim().toLowerCase();
            const words = clean.split(/\s+/);
            if (
              clean.length >= 2 &&
              clean.length <= 15 &&
              words.length <= 2 &&
              !clean.includes('how to') &&
              !clean.includes('2026') &&
              !clean.includes('2025')
            ) {
              const formatted = words
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(' ');
              dynamicShortTags.add(formatted);
            }
          }
        });
      }
    });

    const merged = Array.from(new Set([...defaultTopics, ...dynamicShortTags]));
    return merged.slice(0, 18);
  }, [posts]);

  // Filtered posts based on category, topic, and search query
  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchCat =
        activeCategory === 'All' ||
        (p.category && p.category.toLowerCase() === activeCategory.toLowerCase()) ||
        (p.tag && p.tag.toLowerCase() === activeCategory.toLowerCase());

      const matchTopic =
        !activeTopic ||
        (() => {
          const tLower = activeTopic.toLowerCase();
          const cleanTokens = tLower.split(/[\s&/]+/).filter((w) => w.length > 2);

          if (
            p.tags &&
            p.tags.some((t) => {
              const tl = t.toLowerCase();
              return (
                tl.includes(tLower) ||
                tLower.includes(tl) ||
                cleanTokens.some((tok) => tl.includes(tok))
              );
            })
          ) {
            return true;
          }

          const combined = `${p.category || ''} ${p.title || ''} ${p.excerpt || ''}`.toLowerCase();
          if (combined.includes(tLower)) return true;
          return cleanTokens.some((tok) => combined.includes(tok));
        })();

      const matchQuery =
        !searchQuery.trim() ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.excerpt && p.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

      return matchCat && matchTopic && matchQuery;
    });
  }, [posts, activeCategory, activeTopic, searchQuery]);

  return (
    <div>
      <Breadcrumb current="Blog" />
      <section className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        {/* Header - Single-line heading */}
        <Reveal className="text-center max-w-4xl mx-auto mb-10">
          <p className="eyebrow mb-3">Our Blog</p>
          <h1 className="text-3xl sm:text-4xl md:text-[44px] lg:text-5xl font-extrabold text-ink mb-4 tracking-tight sm:whitespace-nowrap">
            Insights, Ideas &{' '}
            <span className="bg-clip-text text-transparent bg-primary-gradient">Industry News</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
            Practical thinking on technology, design, and growth from the Cubixsol team.
          </p>
        </Reveal>

        {/* Top Search Bar */}
        <div className="mb-10">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-full bg-white rounded-2xl border border-gray-200/90 shadow-2xs hover:border-[#00a4d8]/50 focus-within:border-[#00a4d8] focus-within:ring-2 focus-within:ring-[#00a4d8]/20 transition-all duration-200 flex items-center p-2 gap-2"
          >
            <div className="relative flex-1 flex items-center">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 pointer-events-none transition-colors" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH POSTS"
                className="w-full pl-12 pr-10 py-2.5 text-xs sm:text-sm font-semibold tracking-wider text-ink placeholder:text-gray-400 placeholder:font-normal bg-transparent focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="px-6 sm:px-8 py-2.5 rounded-xl bg-white border border-gray-200 text-xs sm:text-sm font-extrabold tracking-wider uppercase text-ink hover:text-[#00a4d8] hover:border-[#00a4d8] hover:shadow-2xs transition-all duration-200 shrink-0 cursor-pointer"
            >
              SEARCH
            </button>
          </form>
        </div>

        {/* Main 2-Column Section: Blog Posts & Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Blog Posts Grid */}
          <div className="lg:col-span-8 xl:col-span-9 order-2 lg:order-1">
            {/* Active Filters Bar if any filter is on */}
            {(activeCategory !== 'All' || activeTopic || searchQuery) && (
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3 bg-sky-50/60 border border-sky-100 rounded-2xl px-4 py-3">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-ink">
                  <span className="text-gray-500">Filtered by:</span>
                  {activeCategory !== 'All' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-[#00a4d8]/30 text-[#00a4d8] shadow-2xs">
                      Category: {activeCategory}
                      <button
                        type="button"
                        onClick={() => setActiveCategory('All')}
                        className="hover:text-red-500 cursor-pointer"
                        title="Remove category filter"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {activeTopic && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-[#00a4d8]/30 text-[#00a4d8] shadow-2xs">
                      Topic: #{activeTopic}
                      <button
                        type="button"
                        onClick={() => setActiveTopic(null)}
                        className="hover:text-red-500 cursor-pointer"
                        title="Remove topic filter"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {searchQuery && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-[#00a4d8]/30 text-[#00a4d8] shadow-2xs">
                      Search: &ldquo;{searchQuery}&rdquo;
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="hover:text-red-500 cursor-pointer"
                        title="Remove search query"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('All');
                    setActiveTopic(null);
                    setSearchQuery('');
                  }}
                  className="text-xs font-bold text-[#00a4d8] hover:text-[#0092c2] hover:underline cursor-pointer"
                >
                  Reset all filters
                </button>
              </div>
            )}

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div
                    key={n}
                    className="bg-white rounded-3xl overflow-hidden border border-gray-150 shadow-card animate-pulse h-96 flex flex-col"
                  >
                    <div className="h-48 bg-gray-100" />
                    <div className="p-6 flex-1 flex flex-col gap-3">
                      <div className="h-5 bg-gray-200 rounded w-4/5" />
                      <div className="h-4 bg-gray-100 rounded w-full mt-2" />
                      <div className="h-4 bg-gray-100 rounded w-2/3" />
                      <div className="h-4 bg-gray-100 rounded w-1/2 mt-auto" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-16 text-gray-500 bg-gray-50/50 rounded-3xl border border-gray-100 p-8">
                <p className="text-lg font-bold text-ink mb-1">No blog posts found</p>
                <p className="text-sm text-gray-400 mb-4">Try selecting a different topic or category, or clear your search.</p>
                <button
                  onClick={() => {
                    setActiveCategory('All');
                    setActiveTopic(null);
                    setSearchQuery('');
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#00a4d8] hover:bg-[#0092c2] transition shadow-xs cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <Stagger className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" staggerDelay={0.05}>
                {filteredPosts.map((p) => (
                  <StaggerItem key={p._id || p.slug || p.title}>
                    <Link
                      to={p.slug ? `/blog/${p.slug}` : '/blog'}
                      className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-card hover:shadow-soft hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col group cursor-pointer"
                    >
                      {/* Top Cover with Category Badge on Glass */}
                      <div className="h-48 sm:h-52 w-full relative overflow-hidden bg-slate-100 shrink-0 border-b border-gray-100">
                        {p.coverImage ? (
                          <img
                            src={p.coverImage}
                            alt={p.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#00a4d8]/15 via-primary-500/10 to-indigo-500/15 flex items-center justify-center p-4 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00a4d8_1px,transparent_1px)] [background-size:16px_16px]" />
                            <Sparkles className="w-8 h-8 text-[#00a4d8]/50" />
                          </div>
                        )}

                        {/* Category badge over the image with glass effect */}
                        <div className="absolute bottom-3 left-3 z-10">
                          <span className="inline-flex items-center px-3 py-1 rounded-xl text-[11px] font-extrabold uppercase tracking-wider text-[#00a4d8] bg-white/90 backdrop-blur-md border border-white/60 shadow-xs group-hover:bg-white transition-all duration-300">
                            {p.category || p.tag || 'Technology'}
                          </span>
                        </div>
                      </div>

                      {/* Card Content with Uniform Aligned Layout */}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          {/* Blog Title */}
                          <h3 className="text-left font-bold text-ink text-base sm:text-[17px] mb-2 leading-snug group-hover:text-[#00a4d8] transition-colors line-clamp-2 h-[3.1rem] flex items-start">
                            {p.title}
                          </h3>

                          {/* Excerpt */}
                          {p.excerpt ? (
                            <p className="text-left text-xs text-gray-500 leading-relaxed mb-3 line-clamp-3 h-[3.4rem] overflow-hidden">
                              {p.excerpt}
                            </p>
                          ) : (
                            <div className="h-[3.4rem] mb-3" />
                          )}

                          {/* Tags Pills Row (Short & neat) */}
                          {Array.isArray(p.tags) && p.tags.length > 0 ? (
                            <div className="flex flex-wrap items-center gap-1.5 mb-3.5 h-[1.75rem] overflow-hidden">
                              {p.tags.map((tag, tIdx) => {
                                const isTagActive = activeTopic && activeTopic.toLowerCase() === tag.toLowerCase();
                                return (
                                  <span
                                    key={tIdx}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      setActiveTopic(isTagActive ? null : tag);
                                    }}
                                    className={`text-[10.5px] font-medium px-2 py-0.5 rounded-md border transition-colors truncate max-w-[130px] cursor-pointer ${
                                      isTagActive
                                        ? 'bg-[#00a4d8] text-white border-[#00a4d8]'
                                        : 'bg-gray-100/90 text-gray-600 border-gray-200/60 hover:border-[#00a4d8]/40 hover:text-[#00a4d8]'
                                    }`}
                                  >
                                    #{tag}
                                  </span>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="h-[1.75rem] mb-3.5" />
                          )}
                        </div>

                        {/* Bottom Meta Row: Author, Read Time, Date */}
                        <div className="pt-3 border-t border-gray-100 mt-auto flex items-center justify-between text-xs text-gray-500 font-medium">
                          <span
                            className="font-semibold text-ink truncate max-w-[110px]"
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
          </div>

          {/* Right Column: Categories & Topics Sidebar */}
          <div className="lg:col-span-4 xl:col-span-3 order-1 lg:order-2 lg:sticky lg:top-24 space-y-6">
            {/* Categories Card */}
            <div className="bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-6 shadow-card">
              <h2 className="text-xs font-extrabold uppercase tracking-widest text-ink mb-4 pb-3 border-b border-gray-100">
                Categories
              </h2>

              {/* Everything / All Category Button */}
              <button
                type="button"
                onClick={() => setActiveCategory('All')}
                className={`w-full text-left px-4 py-3 rounded-2xl font-bold text-sm transition-all duration-200 flex items-center justify-between cursor-pointer mb-3.5 ${
                  activeCategory === 'All'
                    ? 'bg-[#00a4d8] text-white shadow-soft'
                    : 'bg-gray-50/90 text-gray-700 hover:bg-sky-50/60 hover:text-[#00a4d8]'
                }`}
              >
                <span>Everything</span>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${
                    activeCategory === 'All'
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-200/70 text-gray-600'
                  }`}
                >
                  {categoryCounts['All'] || 0}
                </span>
              </button>

              {/* Dynamic Category List */}
              <div className="space-y-1.5">
                {categories
                  .filter((c) => c !== 'All')
                  .map((c) => {
                    const isActive = activeCategory === c;
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setActiveCategory(c)}
                        className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm transition-all duration-200 flex items-center justify-between cursor-pointer ${
                          isActive
                            ? 'bg-[#00a4d8] text-white font-bold shadow-2xs'
                            : 'text-gray-600 hover:text-[#00a4d8] hover:bg-sky-50/60 font-medium'
                        }`}
                      >
                        <span className="truncate pr-2">{c}</span>
                        <span
                          className={`text-xs font-semibold shrink-0 ${
                            isActive ? 'text-white/90' : 'text-gray-400'
                          }`}
                        >
                          {categoryCounts[c] || 0}
                        </span>
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* TOPICS Card - Short & Clean 1-2 Word Chips */}
            <div className="bg-white rounded-3xl border border-gray-200/80 p-5 sm:p-6 shadow-card">
              <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-gray-100">
                <div className="flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-[#00a4d8]" />
                  <h2 className="text-xs font-extrabold uppercase tracking-widest text-ink">
                    Topics
                  </h2>
                </div>
                {activeTopic && (
                  <button
                    type="button"
                    onClick={() => setActiveTopic(null)}
                    className="text-[11px] font-bold text-[#00a4d8] hover:text-[#0092c2] hover:underline cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Compact Short Topics Chips List */}
              <div className="flex flex-wrap gap-1.5">
                {allTopics.map((topic) => {
                  const isActive = activeTopic === topic;
                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => setActiveTopic(isActive ? null : topic)}
                      className={`px-2.5 py-1 rounded-lg text-[11.5px] font-semibold transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-[#00a4d8] text-white shadow-soft scale-[1.02]'
                          : 'bg-gray-50/90 text-gray-600 hover:text-[#00a4d8] hover:bg-sky-50/80 border border-gray-200/70 hover:border-[#00a4d8]/40 hover:shadow-2xs'
                      }`}
                    >
                      {topic}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <CtaBanner />
    </div>
  );
}
