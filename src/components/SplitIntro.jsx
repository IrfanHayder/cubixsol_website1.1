import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import Reveal from './Reveal';

export default function SplitIntro() {
  return (
    <section className="bg-gray-50 py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <Reveal className="lg:col-span-7" direction="right">
            <p className="eyebrow mb-3">Top quality</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight leading-tight mb-6">
              Our services make your work more productive
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-4">
              From strategy and design to engineering and growth, we deliver end-to-end digital solutions
              that reduce friction and unlock measurable results for your business.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              Whether you need a polished MVP, a scalable platform, or an AI-powered workflow —
              our team ships with clarity, speed and care.
            </p>
            <Link to="/services" className="btn-primary">
              Discover more <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>

          <Reveal className="lg:col-span-5" direction="left" delay={0.1}>
            <div className="bg-white rounded-3xl border border-gray-100 shadow-card p-8">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-11 h-11 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </span>
                <div>
                  <p className="font-bold text-ink">Open hours</p>
                  <p className="text-xs text-gray-400">We are happy to help you</p>
                </div>
              </div>
              <ul className="space-y-3 text-sm">
                {[
                  ['Mon – Fri', '9:00 AM – 6:00 PM'],
                  ['Saturday', '10:00 AM – 4:00 PM'],
                  ['Sunday', 'Closed'],
                ].map(([day, hours]) => (
                  <li
                    key={day}
                    className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0"
                  >
                    <span className="font-medium text-ink">{day}</span>
                    <span className="text-gray-500">{hours}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-gray-500 leading-relaxed">
                Welcome to Cubixsol — a creative technology partner ready to turn your ideas into
                reliable digital products.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
