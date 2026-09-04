import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Reveal, { Stagger, StaggerItem } from './Reveal';

const steps = [
  {
    num: '01',
    title: 'Assessment',
    desc: 'We thoroughly analyze your requirements and evaluate your existing IT architecture and workflows to ensure the best outcomes.',
    points: [
      'Software Development Lifecycle (SDLC) Review',
      'Infrastructure & IT Resource Assessment',
      'Business Expectation Mapping',
      'Capability & Constraint Analysis',
      'DevOps Strategy Development',
    ],
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=560&q=70',
  },
  {
    num: '02',
    title: 'Roadmap',
    desc: 'During this phase, we create a detailed roadmap that serves as the foundation for implementing your DevOps project.',
    points: [
      'Containerization Strategy',
      'CI/CD Pipeline Design',
      'Test Automation Integration',
      'IaC & Configuration Management',
      'Monitoring Architecture',
      'Security & Compliance Guidelines',
      'DevOps Challenge Analysis & Solutions',
    ],
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&h=560&q=70',
  },
  {
    num: '03',
    title: 'Execution',
    desc: 'We implement the roadmap with a focus on aligning teams, automating workflows, and ensuring stability across your DevOps environment.',
    points: [
      'CI/CD Pipeline Setup',
      'Test Automation Deployment',
      'IaC Implementation',
      'Team Enablement & Tool Training',
      'DevOps Process Setup',
      'Tool Chain Integration',
    ],
    image:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&h=560&q=70',
  },
  {
    num: '04',
    title: 'Optimization',
    desc: 'We continuously monitor system performance and make adjustments to ensure the solution aligns with your goals and delivers optimal results.',
    points: [
      'Performance Tuning',
      'Auto-scaling & Load Management',
      'Release Cycle Acceleration',
      'Monitoring & Alerting Setup',
      'Security & Compliance Enhancements',
    ],
    image:
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&h=560&q=70',
  },
  {
    num: '05',
    title: 'Support',
    desc: 'We provide ongoing support to ensure your DevOps ecosystem remains operational, stable, and in sync with your business goals.',
    points: [
      'Infrastructure Operability Support',
      'Change Implementation',
      'Load Distribution Management',
      'Environment Scaling & Maintenance',
    ],
    image:
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&h=560&q=70',
  },
];

function formatText(text) {
  if (!text) return null;
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

function StepRow({ step, index }) {
  const reverse = index % 2 === 1;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const yImg = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);

  const stepNumber = step.stepNumber || step.num || `0${index + 1}`;
  const points = Array.isArray(step.points) ? step.points : [];

  return (
    <div ref={ref} className="relative grid lg:grid-cols-2 gap-8 lg:gap-14 items-center py-10 lg:py-14">
      {/* Image */}
      <motion.div
        style={{ y: yImg, opacity }}
        className={`${reverse ? 'lg:order-2' : 'lg:order-1'}`}
      >
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-elev aspect-[4/3] bg-gray-100 border border-gray-100">
          {step.image ? (
            <img
              src={step.image}
              alt={step.title}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              width={800}
              height={560}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-sky-50 to-cyan-100/60 flex items-center justify-center p-8 text-center">
              <span className="text-4xl font-black text-[#00a4d8]/40">Step {stepNumber}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent pointer-events-none" />
          <span className="absolute bottom-4 left-4 bg-white/95 backdrop-blur text-ink text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
            Step {stepNumber}
          </span>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: reverse ? 24 : -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`${reverse ? 'lg:order-1' : 'lg:order-2'}`}
      >
        <p className="text-xs font-bold tracking-widest uppercase text-[#00a4d8] mb-2">
          Step {stepNumber.replace(/^0+/, '') || index + 1}
        </p>
        <h3 className="text-xl sm:text-2xl font-extrabold text-ink mb-3">{step.title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-5">{formatText(step.desc)}</p>
        {points.length > 0 && (
          <>
            <p className="text-xs font-bold tracking-wide uppercase text-gray-400 mb-2">We work on</p>
            <ul className="space-y-2">
              {points.map((pt) => (
                <li key={pt} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#00a4d8] shrink-0" />
                  <span>{formatText(pt)}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default function DevOpsProcess({
  steps: passedSteps = [],
  title = 'Our 5-step Process',
  intro = 'A structured path from assessment to ongoing support after deployment — so releases stay fast and systems stay stable.',
}) {
  const lineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ['start center', 'end center'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const activeSteps = Array.isArray(passedSteps) && passedSteps.length > 0 ? passedSteps : steps;


  return (
    <section className="relative py-14 lg:py-20 bg-white overflow-hidden border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-10 lg:mb-14">
          <p className="eyebrow mb-2">How we deliver</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-4">
            {formatText(title)}
          </h2>
          {intro && (
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
              {formatText(intro)}
            </p>
          )}
        </Reveal>

        {/* Timeline */}
        <div ref={lineRef} className="relative">
          {/* vertical line — desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-gray-100">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#00a4d8] to-[#0284c7] origin-top rounded-full"
              style={{ height: lineHeight }}
            />
          </div>

          {/* dots on center line */}
          <div className="hidden lg:flex absolute left-1/2 top-0 bottom-0 -translate-x-1/2 flex-col justify-around pointer-events-none py-16">
            {activeSteps.map((s, idx) => (
              <span
                key={s.stepNumber || s.num || idx}
                className="w-3.5 h-3.5 rounded-full border-2 border-[#00a4d8] bg-white shadow-sm"
              />
            ))}
          </div>

          <div className="space-y-2 lg:space-y-0">
            {activeSteps.map((step, i) => (
              <StepRow key={step.stepNumber || step.num || i} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

