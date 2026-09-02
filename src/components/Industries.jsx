import { Link } from 'react-router-dom';
import {
  GraduationCap, Plane, HeartPulse, Landmark, ShoppingBag, Cpu, ArrowRight,
} from 'lucide-react';
import * as Icons from 'lucide-react';
import { useState, useEffect } from 'react';
import Reveal, { Stagger, StaggerItem } from './Reveal';
import { apiFetch } from '../utils/api';

const fallbackIndustries = [
  {
    icon: 'GraduationCap',
    title: 'Education',
    short: 'Learning platforms, LMS, and student portals that scale with institutions.',
    slug: 'education',
  },
  {
    icon: 'Plane',
    title: 'Travel & Hospitality',
    short: 'Booking engines, itinerary tools, and guest experience apps.',
    slug: 'travel-hospitality',
  },
  {
    icon: 'HeartPulse',
    title: 'Healthcare',
    short: 'HIPAA-aware portals, telemedicine, and practice management systems.',
    slug: 'healthcare',
  },
  {
    icon: 'Landmark',
    title: 'Finance & FinTech',
    short: 'Secure dashboards, payment flows, and data-driven financial products.',
    slug: 'finance-fintech',
  },
  {
    icon: 'ShoppingBag',
    title: 'E-Commerce',
    short: 'High-converting stores, custom checkouts, and growth-focused UX.',
    slug: 'ecommerce',
  },
  {
    icon: 'Cpu',
    title: 'SaaS & Technology',
    short: 'Multi-tenant platforms, admin tools, and product-led growth features.',
    slug: 'saas-technology',
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
    <section className="bg-gray-50 py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <p className="eyebrow mb-3">Industries</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
              Industries We Serve
            </h2>
          </div>
          <p className="text-gray-500 max-w-xl text-sm lg:text-base">
            We develop digital products for education, travel and hospitality, healthcare, FinTech, e-commerce, SaaS, and professional services. As a <strong>software development company for small businesses</strong> and growing organizations, we adapt each product’s functionality, integrations, security, and user experience to its industry and audience.
          </p>
        </Reveal>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.07}>
          {industries.map((ind) => {
            const Icon = (typeof ind.icon === 'string' ? Icons[ind.icon] : ind.icon) || Icons.Building2;
            const descText = ind.short || ind.desc || '';
            const linkUrl = ind.slug ? `/industries/${ind.slug}` : '/industries';

            return (
              <StaggerItem key={ind.slug || ind.title}>
                <Link
                  to={linkUrl}
                  className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-card hover:shadow-elev hover:-translate-y-1 transition-all duration-300 h-full flex flex-col"
                >
                  <span className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4 group-hover:bg-primary-gradient group-hover:text-white transition-all shrink-0">
                    <Icon className="w-6 h-6" />
                  </span>
                  <h3 className="font-bold text-ink text-lg mb-2">{ind.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1">{descText}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-primary-600 mt-4 group-hover:gap-2 transition-all">
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal className="text-center mt-10">
          <Link to="/contact" className="btn-outline">
            Tell us about your industry <ArrowRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
