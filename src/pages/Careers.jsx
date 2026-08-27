import { useState, useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import CtaBanner from '../components/CtaBanner';
import { ArrowRight, MapPin, Briefcase } from 'lucide-react';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';

const fallbackOpenings = [
  { title: 'Senior Laravel Developer', type: 'Full-time', location: 'Remote / New York' },
  { title: 'React Frontend Engineer', type: 'Full-time', location: 'Remote' },
  { title: 'AI/ML Engineer', type: 'Full-time', location: 'Remote / New York' },
  { title: 'UI/UX Designer', type: 'Full-time', location: 'Remote' },
  { title: 'Project Manager', type: 'Full-time', location: 'New York, NY' },
  { title: 'DevOps Engineer', type: 'Contract', location: 'Remote' },
];

const perks = [
  ['Remote-first culture', 'Work from anywhere with flexible hours.'],
  ['Health & wellness', 'Comprehensive health coverage for you and your family.'],
  ['Growth budget', 'Annual budget for courses, conferences, and certifications.'],
  ['Paid time off', 'Generous PTO to rest and recharge.'],
];

export default function Careers() {
  const [openings, setOpenings] = useState(fallbackOpenings);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/careers')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (cancelled) return;
        const list = Array.isArray(data)
          ? data.filter((j) => !j.status || j.status === 'Open')
          : [];
        if (list.length > 0) {
          setOpenings(
            list.map((j) => ({
              title: j.title,
              type: j.type || 'Full-time',
              location: j.location || 'Remote',
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
      <Breadcrumb current="Careers" />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 text-center">
        <Reveal>
          <p className="eyebrow mb-3">Careers</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-ink mb-4 max-w-2xl mx-auto">
            Build Your Career With{' '}
            <span className="bg-clip-text text-transparent bg-primary-gradient">Cubixsol</span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            We're always looking for talented, curious people who want to build meaningful digital
            products.
          </p>
        </Reveal>
      </section>

      <section className="bg-gray-50 py-16">
        <Stagger
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          staggerDelay={0.08}
        >
          {perks.map(([title, desc]) => (
            <StaggerItem key={title}>
              <div className="card h-full hover:-translate-y-1 hover:shadow-soft transition-all duration-300">
                <h3 className="font-bold text-ink mb-1.5">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Reveal className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink mb-2">Open positions</h2>
          <p className="text-gray-500 text-sm">Join a team that ships quality work and treats people well.</p>
        </Reveal>
        <Stagger className="space-y-4" staggerDelay={0.06}>
          {openings.map((job) => (
            <StaggerItem key={job.title}>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-2xl border border-gray-100 bg-white shadow-card hover:shadow-elev transition-shadow">
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-ink text-lg mb-1">{job.title}</h3>
                  <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                    <span className="inline-flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5" /> {job.type}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" /> {job.location}
                    </span>
                  </div>
                </div>
                <a href="/contact" className="btn-primary shrink-0 text-sm">
                  Apply <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>
      <CtaBanner />
    </div>
  );
}
