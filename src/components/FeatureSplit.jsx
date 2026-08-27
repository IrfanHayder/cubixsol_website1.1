import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Layers } from 'lucide-react';
import Reveal from './Reveal';

export default function FeatureSplit() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal direction="right">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-elev aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80"
                  alt="Mobile app design"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-5 -right-4 sm:right-6 bg-white rounded-2xl shadow-soft p-4 max-w-[200px]">
                <p className="text-xs font-bold text-ink">We develop application designs</p>
                <p className="text-[11px] text-gray-400 mt-1">Solid products, end to end</p>
              </div>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <p className="eyebrow mb-3">What we do</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight leading-tight mb-5">
              Our job is to create solid digital products
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              We combine product thinking, modern engineering and clean design so your app or platform
              feels fast, trustworthy and ready to grow.
            </p>

            <div className="space-y-5 mb-10">
              {[
                {
                  num: '01',
                  icon: Sparkles,
                  title: 'Creative ideas',
                  desc: 'Strategy workshops and UX flows that turn vague goals into clear product directions.',
                },
                {
                  num: '02',
                  icon: Layers,
                  title: 'Premium build quality',
                  desc: 'Scalable architecture, polished interfaces and rigorous QA before every launch.',
                },
              ].map((item) => (
                <div key={item.num} className="flex gap-4">
                  <span className="text-2xl font-extrabold text-primary-200 leading-none">{item.num}</span>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <item.icon className="w-4 h-4 text-primary-600" />
                      <h3 className="font-bold text-ink">{item.title}</h3>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/projects" className="btn-outline">
              Our portfolio <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
