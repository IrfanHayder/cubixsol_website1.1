import { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import CtaBanner from '../components/CtaBanner';
import Reveal from '../components/Reveal';

import { apiFetch } from '../utils/api';

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setNotFound(false);

    apiFetch(`blogs/${slug}`)
      .catch(async () => {
        try {
          const list = await apiFetch('blogs');
          return Array.isArray(list) ? list.find((p) => p.slug === slug) : null;
        } catch {
          return null;
        }
      })
      .then((data) => {
        if (cancelled) return;
        if (data && data.title) {
          setPost(data);
        } else {
          setNotFound(true);
        }
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) {
          setNotFound(true);
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-gray-500">
        Loading post...
      </div>
    );
  }

  if (notFound || !post) {
    return <Navigate to="/blog" replace />;
  }

  const dateLabel =
    post.date ||
    (post.createdAt
      ? new Date(post.createdAt).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        })
      : '');

  return (
    <div>
      <Breadcrumb
        current={post.title}
        items={[{ label: 'Blog', to: '/blog' }]}
      />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        <Reveal>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-primary-600 mb-6 transition"
          >
            <ArrowLeft className="w-4 h-4" /> All posts
          </Link>

          <div className="flex flex-wrap gap-2 mb-4">
            {post.tag && (
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-primary-50 text-primary-700 border border-primary-100">
                <Tag className="w-3 h-3" /> {post.tag}
              </span>
            )}
            {post.category && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-600">
                {post.category}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight leading-tight mb-5">
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-8">
            {dateLabel && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4" /> {dateLabel}
              </span>
            )}
            {post.author && (
              <span className="inline-flex items-center gap-1.5">
                <User className="w-4 h-4" /> {post.author}
              </span>
            )}
          </div>

          {(post.coverImage || post.color) && (
            <div
              className={`rounded-2xl overflow-hidden mb-10 aspect-[16/9] bg-gradient-to-br ${post.color || 'from-primary-700 to-indigo-900'}`}
            >
              {post.coverImage ? (
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
          )}

          {post.excerpt && (
            <p className="text-lg text-gray-600 leading-relaxed mb-8 border-l-4 border-primary-400 pl-4 italic">
              {post.excerpt}
            </p>
          )}

          <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
            {post.content || 'No content yet.'}
          </div>
        </Reveal>
      </article>

      <CtaBanner />
    </div>
  );
}
