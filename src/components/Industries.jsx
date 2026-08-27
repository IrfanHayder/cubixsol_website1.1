import { Link } from 'react-router-dom';
import {
  GraduationCap, Plane, HeartPulse, Landmark, ShoppingBag, Cpu, ArrowRight,
} from 'lucide-react';
import Reveal, { Stagger, StaggerItem } from './Reveal';

const industries = [
  {
    icon: GraduationCap,
    title: 'Education',
    desc: 'Learning platforms, LMS, and student portals that scale with institutions.',
  },
  {
    icon: Plane,
    title: 'Travel & Hospitality',
    desc: 'Booking engines, itinerary tools, and guest experience apps.',
  },
  {
    icon: HeartPulse,
    title: 'Healthcare',
    desc: 'HIPAA-aware portals, telemedicine, and practice management systems.',
  },
  {
    icon: Landmark,
    title: 'Finance & FinTech',
    desc: 'Secure dashboards, payment flows, and data-driven financial products.',
  },
  {
    icon: ShoppingBag,
    title: 'E-Commerce',
    desc: 'High-converting stores, custom checkouts, and growth-focused UX.',
  },
  {
    icon: Cpu,
    title: 'SaaS & Technology',
    desc: 'Multi-tenant platforms, admin tools, and product-led growth features.',
  },
];

export default function Industries() {
  return (
    <section className="bg-gray-50 py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <p className="eyebrow mb-3">Industries</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
              Domain experience that speeds delivery
            </h2>
          </div>
          <p className="text-gray-500 max-w-md text-sm lg:text-base">
            We’ve shipped products across regulated and high-growth verticals — so we speak your language from day one.
          </p>
        </Reveal>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" staggerDelay={0.07}>
          {industries.map((ind) => (
            <StaggerItem key={ind.title}>
              <div className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-card hover:shadow-elev hover:-translate-y-1 transition-all duration-300 h-full">
                <span className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4 group-hover:bg-primary-gradient group-hover:text-white transition-all">
                  <ind.icon className="w-6 h-6" />
                </span>
                <h3 className="font-bold text-ink text-lg mb-2">{ind.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{ind.desc}</p>
              </div>
            </StaggerItem>
          ))}
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
