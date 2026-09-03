import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import Reveal, { Stagger, StaggerItem } from './Reveal';
import { apiFetch } from '../utils/api';
import DynamicIcon from './DynamicIcon';

const fallbackIndustries = [
  {
    icon: '/uploads/media-1788421050320-328223291.svg',
    title: 'Technology',
    short: 'Platforms, developer tools, and internal tech products.',
    slug: 'technology',
  },
  {
    icon: '/uploads/media-1788421050341-423557658.svg',
    title: 'Travel & Hospitality',
    short: 'Booking journeys and guest experiences that convert.',
    slug: 'travel',
  },
  {
    icon: '/uploads/media-1788421050308-313091127.svg',
    title: 'Logistics',
    short: 'Tracking, dispatch, and operations visibility on the move.',
    slug: 'logistics',
  },
  {
    icon: '/uploads/media-1788421050295-842693555.svg',
    title: 'Finance & Fintech',
    short: 'Payments, dashboards, and compliant financial products.',
    slug: 'fintech',
  },
  {
    icon: '/uploads/media-1788421050303-234659715.svg',
    title: 'Healthcare',
    short: 'Secure patient experiences and clinical operations software.',
    slug: 'healthcare',
  },
  {
    icon: '/uploads/media-1788421050317-66609444.svg',
    title: 'SaaS',
    short: 'Multi-tenant products built to onboard, retain, and scale.',
    slug: 'saas',
  },
  {
    icon: '/uploads/media-1788421040721-524946062.svg',
    title: 'E-Commerce',
    short: 'Stores, marketplaces, and conversion-focused commerce.',
    slug: 'ecommerce',
  },
  {
    icon: '/uploads/media-1788421050310-764937006.svg',
    title: 'Real Estate',
    short: 'Listings, portals, and property operations platforms.',
    slug: 'real-estate',
  },
  {
    icon: '/uploads/media-1788421050282-718579643.svg',
    title: 'Education',
    short: 'Learning platforms, school systems, and engagement tools.',
    slug: 'education',
  },
];

export default function Industries() {
  const [industries, setIndustries] = useState(fallbackIndustries);

  useEffect(() => {
    let cancelled = false;
    apiFetch('industries')
      .then((data) => {
        if (!cancelled && Array.isArray(data) && data.length > 0) {
          setIndustries(data);
        }
      })
      .catch(() => { });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="relative bg-[#f8fafc] py-20 lg:py-28 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-0 right-1/4 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-100/80 px-3 py-1 rounded-full text-xs font-bold text-primary-700 mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-primary-500 animate-pulse" />
              <span>INDUSTRIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight">
              Industries We Serve
            </h2>
          </div>
          <p className="text-gray-600 max-w-xl text-sm lg:text-base leading-relaxed">
            We develop digital products for education, travel and hospitality, healthcare, FinTech, e-commerce, SaaS, and professional services. As a <strong>software development company for small businesses</strong> and growing organizations, we adapt each product’s functionality, integrations, security, and user experience to its industry and audience.
          </p>
        </Reveal>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6" staggerDelay={0.06}>
          {industries.map((ind) => {
            const descText = ind.short || ind.desc || '';
            const linkUrl = ind.slug ? `/industries/${ind.slug}` : '/industries';

            return (
              <StaggerItem key={ind.slug || ind.title}>
                <Link
                  to={linkUrl}
                  className="group relative bg-white rounded-3xl border border-gray-100/90 p-6 sm:p-7 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_22px_45px_-12px_rgba(0,164,216,0.15)] hover:border-cyan-200 hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col justify-between overflow-hidden"
                >
                  {/* Subtle top-right cyan glow decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-400/20 via-sky-400/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div>
                    {/* Icon container with brand cyan-blue gradient, larger size and smooth animation */}
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-50/80 border border-cyan-100/90 flex items-center justify-center mb-5 group-hover:bg-gradient-to-br group-hover:from-[#00a4d8] group-hover:via-[#0284c7] group-hover:to-[#0369a1] group-hover:border-transparent group-hover:shadow-xl group-hover:shadow-[#00a4d8]/35 group-hover:ring-4 group-hover:ring-cyan-100/70 group-hover:scale-110 group-hover:-translate-y-1 group-hover:rotate-2 transition-all duration-300 ease-out shrink-0 overflow-hidden">
                      {/* Ambient hover light reflection */}
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      <DynamicIcon
                        icon={ind.icon}
                        title={ind.title}
                        className="w-8 h-8 sm:w-9 sm:h-9 object-contain text-[#00a4d8] group-hover:text-white transition-all duration-300 ease-out group-hover:scale-115 group-hover:-rotate-2 group-hover:brightness-0 group-hover:invert group-hover:drop-shadow-[0_2px_8px_rgba(255,255,255,0.8)]"
                      />
                    </div>

                    <h3 className="font-extrabold text-ink text-lg sm:text-xl mb-2 group-hover:text-[#00a4d8] transition-colors duration-300">
                      {ind.title}
                    </h3>

                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                      {descText}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-gray-100/80 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#00a4d8] group-hover:text-[#0284c7] transition-colors">
                      Explore
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </span>

                    <span className="w-2 h-2 rounded-full bg-cyan-200 group-hover:bg-[#00a4d8] transition-colors" />
                  </div>
                </Link>

              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal className="text-center mt-12">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-ink text-white font-semibold px-7 py-3.5 rounded-full hover:bg-ink/90 shadow-elev hover:-translate-y-0.5 transition-all text-sm"
          >
            Tell us about your industry <ArrowRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
