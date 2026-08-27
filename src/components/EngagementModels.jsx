import { Link } from 'react-router-dom';
import { Users, UserPlus, Briefcase, Rocket, ArrowRight } from 'lucide-react';
import Reveal, { Stagger, StaggerItem } from './Reveal';

const models = [
  {
    icon: Briefcase,
    title: 'Project-Based',
    desc: 'Fixed scope, clear milestones, and predictable pricing. Ideal when requirements are well-defined.',
    points: ['Fixed budget & timeline', 'Dedicated project manager', 'Full delivery ownership'],
  },
  {
    icon: Users,
    title: 'Dedicated Team',
    desc: 'A long-term team that works as an extension of yours — aligned to your roadmap and culture.',
    points: ['Monthly engagement', 'Shared tools & rituals', 'Scale up or down anytime'],
  },
  {
    icon: UserPlus,
    title: 'Staff Augmentation',
    desc: 'Plug skilled engineers into your existing squad to accelerate delivery without hiring overhead.',
    points: ['Vetted specialists', 'Fast onboarding', 'Flexible duration'],
  },
  {
    icon: Rocket,
    title: 'MVP & Startup',
    desc: 'From idea to launch-ready product. We help founders validate, build, and ship the first version.',
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
            Work with us the way that fits you
          </h2>
          <p className="text-white/60 text-lg">
            Flexible partnerships designed around your goals, timeline, and team structure.
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
                <ul className="space-y-1.5">
                  {m.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-xs text-white/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-400 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
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
