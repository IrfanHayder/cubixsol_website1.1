import { Link } from 'react-router-dom';
import { ArrowRight, Lightbulb, ClipboardList, Code2, Rocket } from 'lucide-react';
import Reveal from './Reveal';

const steps = [
  {
    label: 'Strategy',
    icon: Lightbulb,
    img: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop&q=80',
    gradient: 'from-sky-400 to-primary-600',
  },
  {
    label: 'Planning',
    icon: ClipboardList,
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=400&fit=crop&q=80',
    gradient: 'from-primary-400 to-primary-700',
  },
  {
    label: 'Build',
    icon: Code2,
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop&q=80',
    gradient: 'from-cyan-500 to-primary-600',
  },
  {
    label: 'Our Work',
    icon: Rocket,
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&h=500&fit=crop&q=80',
    gradient: 'from-primary-500 to-primary-800',
    link: '/projects',
    size: 'lg',
  },
];

function StepCircle({ step, large = false }) {
  const Icon = step.icon;
  const size = large ? 'w-44 h-44 lg:w-52 lg:h-52' : 'w-28 h-28 lg:w-32 lg:h-32';
  const iconSize = large ? 'w-12 h-12' : 'w-8 h-8';

  return (
    <div
      className={`${size} rounded-full border-2 border-dashed border-primary-200 p-1.5 shadow-elev bg-white relative z-10`}
    >
      <div className={`w-full h-full rounded-full overflow-hidden relative bg-gradient-to-br ${step.gradient}`}>
        <img
          src={step.img}
          alt=""
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-70"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon className={`${iconSize} text-white drop-shadow-md`} strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}

export default function JourneyPath() {
  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden relative">
      <div className="absolute top-16 right-1/4 w-16 h-10 rounded-full bg-sky-100/60 blur-sm pointer-events-none" />
      <div className="absolute top-24 right-1/3 w-10 h-6 rounded-full bg-sky-50/80 blur-sm pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-14">
          <p className="eyebrow mb-3">How ideas become products</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
            From strategy to shipped work
          </h2>
        </Reveal>

        {/* Desktop */}
        <div className="hidden md:block relative">
          <svg
            className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-40 pointer-events-none"
            viewBox="0 0 1000 160"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M 40 80 Q 200 20, 320 80 T 560 80 T 800 60 T 960 90"
              stroke="#cbd5e1"
              strokeWidth="2"
              strokeDasharray="8 8"
            />
          </svg>

          <div className="relative flex items-end justify-between gap-4 px-4">
            {steps.map((step, i) => {
              const isLg = step.size === 'lg';
              return (
                <Reveal key={step.label} delay={i * 0.12} className="flex flex-col items-center">
                  <div className={isLg ? 'mb-2' : 'mb-3'}>
                    <StepCircle step={step} large={isLg} />
                  </div>
                  {step.link ? (
                    <Link
                      to={step.link}
                      className="mt-3 text-lg font-bold text-ink hover:text-primary-600 inline-flex items-center gap-1.5 transition"
                    >
                      {step.label} <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <p className="mt-3 text-base font-semibold text-gray-500">{step.label}</p>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden space-y-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.label} delay={i * 0.08} className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-primary-200 p-1 shadow-card bg-white shrink-0">
                  <div className={`w-full h-full rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center`}>
                    <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                  </div>
                </div>
                <div>
                  {step.link ? (
                    <Link
                      to={step.link}
                      className="font-bold text-ink hover:text-primary-600 inline-flex items-center gap-1"
                    >
                      {step.label} <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <p className="font-semibold text-gray-600">{step.label}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-0.5">Step {i + 1}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
