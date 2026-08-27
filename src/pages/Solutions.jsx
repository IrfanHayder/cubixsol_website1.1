import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { solutionGroups } from '../data/content';
import Breadcrumb from '../components/Breadcrumb';
import CtaBanner from '../components/CtaBanner';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';

export default function Solutions() {
  const groups = Array.isArray(solutionGroups) ? solutionGroups : [];
  return (
    <div>
      <Breadcrumb current="Solutions" />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16">
        <Reveal className="max-w-2xl mb-12" scale>
          <p className="eyebrow mb-2">What we solve</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-4">
            Solutions for data, AI & commerce
          </h1>
          <p className="text-gray-500 leading-relaxed">
            Focused offerings that plug into your product roadmap — from data platforms to generative AI
            and high-converting commerce experiences.
          </p>
        </Reveal>

        <div className="space-y-14">
          {groups.map((group) => (
            <div key={group.title}>
              <Reveal>
                <h2 className="text-xl sm:text-2xl font-extrabold text-ink mb-6">{group.title}</h2>
              </Reveal>
              <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" staggerDelay={0.05}>
                {group.items.map((item) => (
                  <StaggerItem key={item.slug} hover>
                    <Link
                      to={`/solutions/${item.slug}`}
                      className="block h-full bg-white rounded-2xl border border-gray-100 p-5 shadow-card hover:shadow-elev hover:-translate-y-0.5 transition-all"
                    >
                      <h3 className="font-bold text-ink mb-1.5">{item.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed mb-3">{item.desc}</p>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600">
                        Learn more <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </Link>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          ))}
        </div>
      </section>
      <CtaBanner />
    </div>
  );
}
