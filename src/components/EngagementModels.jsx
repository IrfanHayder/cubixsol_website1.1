import { Link } from 'react-router-dom';
import { Users, UserPlus, Briefcase, Rocket, ArrowRight } from 'lucide-react';
import Reveal, { Stagger, StaggerItem } from './Reveal';
import DynamicIcon from './DynamicIcon';

const models = [
  {
    icon: '/uploads/media-1789561953441-462599001.svg',
    fallbackIcon: Briefcase,
    title: 'Project-Based Development',
    desc: 'Choose a defined scope, schedule, and budget for a complete software project managed by an experienced team.',
    points: ['Fixed budget & timeline', 'Dedicated project manager', 'Full delivery ownership'],
  },
  {
    icon: '/uploads/media-1789561953440-395086681.svg',
    fallbackIcon: Users,
    title: 'Dedicated Development Team',
    desc: 'Add a stable, long-term team that works exclusively on your product and adapts as your priorities change.',
    points: ['Monthly engagement', 'Shared tools & rituals', 'Scale up or down anytime'],
  },
  {
    icon: '/uploads/media-1789561953441-522401966.svg',
    fallbackIcon: UserPlus,
    title: 'Staff Augmentation',
    desc: (
      <>
        Our <strong>staff augmentation services</strong> help you add developers, designers, QA engineers, or other specialists to your existing team. These <strong>staff augmentation services</strong> provide extra technical capacity while you retain control of daily priorities.
      </>
    ),
    points: ['Vetted specialists', 'Fast onboarding', 'Flexible duration'],
  },
  {
    icon: '/uploads/media-1789561953441-738702052.svg',
    fallbackIcon: Rocket,
    title: 'MVP and Startup Model',
    desc: 'Start with product discovery, essential features, rapid development, and a launch plan designed for early validation and future investment.',
    points: ['Lean scope', 'Rapid iterations', 'Investor-ready quality'],
  },
];

export default function EngagementModels() {
  return (
    <section className="bg-ink text-white py-14 lg:py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold tracking-widest uppercase text-primary-300 mb-3">
            Engagement Models
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 text-white">
            Hire a Dedicated Development Team
          </h2>
          <p className="text-white/70 text-base sm:text-lg leading-relaxed">
            Choose an engagement model, internal resources, budget, and product stage. Business owners who want to <strong>hire dedicated development team</strong> talent can access our specialists without managing a lengthy recruitment process.
          </p>
        </Reveal>

        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.08}>
          {models.map((m) => (
            <StaggerItem key={m.title}>
              <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-7 hover:bg-white/10 hover:border-primary-400/50 transition-all duration-300 flex flex-col justify-between group hover:shadow-xl hover:shadow-primary-500/5">
                <div>
                  <span className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/[0.07] border border-white/10 flex items-center justify-center p-3 mb-5 group-hover:scale-105 group-hover:bg-white/10 group-hover:border-primary-400/40 transition-all duration-300 shadow-sm">
                    <DynamicIcon
                      icon={m.icon}
                      title={m.title}
                      className="w-full h-full object-contain"
                      fallbackName="Briefcase"
                    />
                  </span>
                  <h3 className="font-bold text-lg sm:text-xl text-white mb-2.5 group-hover:text-primary-300 transition-colors">
                    {m.title}
                  </h3>
                  <p className="text-sm text-white/65 leading-relaxed font-normal">
                    {m.desc}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="text-center mt-12">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-400 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-primary-500/25 transition-all hover:scale-[1.02]"
          >
            <span>Discuss the right model</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
