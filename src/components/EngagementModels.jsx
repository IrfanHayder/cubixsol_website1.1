import { Link } from 'react-router-dom';
import { Users, UserPlus, Briefcase, Rocket, ArrowRight } from 'lucide-react';
import Reveal, { Stagger, StaggerItem } from './Reveal';

const models = [
  {
    icon: Briefcase,
    title: 'Project-Based Development',
    desc: 'Choose a defined scope, schedule, and budget for a complete software project managed by an experienced team.',
    points: ['Fixed budget & timeline', 'Dedicated project manager', 'Full delivery ownership'],
  },
  {
    icon: Users,
    title: 'Dedicated Development Team',
    desc: 'Add a stable, long-term team that works exclusively on your product and adapts as your priorities change.',
    points: ['Monthly engagement', 'Shared tools & rituals', 'Scale up or down anytime'],
  },
  {
    icon: UserPlus,
    title: 'Staff Augmentation',
    desc: (
      <>
        Our <strong>staff augmentation services</strong> help you add developers, designers, QA engineers, or other specialists to your existing team. These <strong>staff augmentation services</strong> provide extra technical capacity while you retain control of daily priorities.
      </>
    ),
    points: ['Vetted specialists', 'Fast onboarding', 'Flexible duration'],
  },
  {
    icon: Rocket,
    title: 'MVP and Startup Model',
    desc: 'Start with product discovery, essential features, rapid development, and a launch plan designed for early validation and future investment.',
    points: ['Lean scope', 'Rapid iterations', 'Investor-ready quality'],
  },
];

export default function EngagementModels() {
  return (
    <section className="bg-ink text-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs font-bold tracking-widest uppercase text-primary-300 mb-3">
            Engagement Models
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
            Hire a Dedicated Development Team
          </h2>
          <p className="text-white/60 text-lg">
            Choose an engagement model, internal resources, budget, and product stage. Business owners who want to <strong>hire dedicated development team</strong> talent can access our specialists without managing a lengthy recruitment process.
          </p>
        </Reveal>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.08}>
          {models.map((m) => (
            <StaggerItem key={m.title}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 hover:border-primary-400/40 transition-all duration-300">
                <span className="w-11 h-11 rounded-xl bg-primary-500/20 text-primary-300 flex items-center justify-center mb-4">
                  <m.icon className="w-5 h-5" />
                </span>
                <h3 className="font-bold text-lg mb-2">{m.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed mb-4">{m.desc}</p>
                {/* <ul className="space-y-1.5">
                  {m.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-xs text-white/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-400 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul> */}
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="text-center mt-12">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-400 text-white font-semibold px-7 py-3.5 rounded-lg transition"
          >
            Discuss the right model <ArrowRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
