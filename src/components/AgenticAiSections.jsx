import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Reveal from './Reveal';

const impactRows = [
  {
    area: 'Strategic Decision-Making',
    impact:
      'Agentic AI helps leaders make timely, data-backed decisions without waiting for manual inputs. It can adapt to real-world changes so strategies stay relevant.',
  },
  {
    area: 'Real-Time Intelligence',
    impact:
      'Instead of relying only on static datasets, agents can use live signals from customers, competitors, and operations so decisions reflect current conditions.',
  },
  {
    area: 'Autonomous Operations',
    impact:
      'Agents can manage complex workflows such as campaign optimization, performance tracking, and planning loops — reducing constant human supervision.',
  },
  {
    area: 'Operational Efficiency',
    impact:
      'By automating repetitive, data-heavy tasks, AI reduces error, speeds processes, and frees teams for higher-value work.',
  },
  {
    area: 'Customer Experience',
    impact:
      'Intelligent assistants deliver personalized, always-available support that improves satisfaction, retention, and loyalty.',
  },
  {
    area: 'Risk and Compliance Management',
    impact:
      'Systems can support anomaly detection, policy enforcement, and stronger accountability across operations.',
  },
];

const processSteps = [
  {
    num: '01',
    title: 'Discovery and Planning',
    desc: 'We define your objectives, user needs, and success metrics.',
    points: [
      'Analyzing workflows',
      'Identifying automation opportunities',
      'Defining performance benchmarks',
    ],
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&h=560&q=70',
  },
  {
    num: '02',
    title: 'Agent Architecture Design',
    desc: "We design the agent's reasoning and decision flow.",
    points: [
      'Outlining decision-making loops',
      'Selecting or developing the right models',
      'Establishing components and communication',
      'Defining context handling and action interfaces',
    ],
    image:
      'https://images.unsplash.com/photo-1639322537504-6427a16b0a28?auto=format&fit=crop&w=800&h=560&q=70',
  },
  {
    num: '03',
    title: 'Data Preparation and Training',
    desc: 'Our engineers prepare and train agents using high-quality data.',
    points: [
      'Preparing and structuring knowledge sources',
      'Setting up data ingestion and indexing pipelines',
      'Training / fine-tuning pipelines if necessary',
      'Implementing retrieval and context enrichment',
    ],
    image:
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&h=560&q=70',
  },
  {
    num: '04',
    title: 'Testing and Integration',
    desc: 'We test performance and connect agents to your systems.',
    points: ['Simulation testing', 'System compatibility', 'Secure API connections'],
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=560&q=70',
  },
  {
    num: '05',
    title: 'Launch and Improvement',
    desc: 'We monitor results and refine agent behavior post-deployment.',
    points: ['Performance tracking', 'Policy updates', 'Knowledge transfer'],
    image:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&h=560&q=70',
  },
];

function StepRow({ step, index }) {
  const reverse = index % 2 === 1;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const yImg = useTransform(scrollYProgress, [0, 1], [36, -36]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.45, 1, 1, 0.45]);

  return (
    <div
      ref={ref}
      className="relative grid lg:grid-cols-2 gap-8 lg:gap-14 items-center py-10 lg:py-12"
    >
      <motion.div
        style={{ y: yImg, opacity }}
        className={reverse ? 'lg:order-2' : 'lg:order-1'}
      >
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-elev aspect-[4/3] bg-gray-100">
          <img
            src={step.image}
            alt={step.title}
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            width={800}
            height={560}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
          <span className="absolute bottom-4 left-4 bg-white/95 text-ink text-xs font-bold px-3 py-1.5 rounded-full shadow">
            Step {step.num}
          </span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: reverse ? 24 : -24 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={reverse ? 'lg:order-1' : 'lg:order-2'}
      >
        <p className="text-xs font-bold tracking-widest uppercase text-primary-500 mb-2">
          Step {step.num.replace(/^0/, '')}
        </p>
        <h3 className="text-xl sm:text-2xl font-extrabold text-ink mb-2">{step.title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-4">{step.desc}</p>
        <p className="text-xs font-bold tracking-wide uppercase text-gray-400 mb-2">We work on</p>
        <ul className="space-y-2">
          {step.points.map((pt) => (
            <li key={pt} className="flex items-start gap-2.5 text-sm text-gray-600">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
              {pt}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export function AgenticAiImpact() {
  return (
    <section className="py-14 lg:py-18 bg-[#f0f6fc]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-4">
            Why Leaders Can&apos;t Ignore{' '}
            <span className="bg-clip-text text-transparent bg-primary-gradient">Agentic AI</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-3xl">
            GenAI can create ideas, content, and responses — but that is often where it stops. Agentic
            AI goes further: it acts, decides, and solves problems with more autonomy. For leaders,
            this is about organizations that sense change, respond faster, and grow with purpose.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="rounded-2xl overflow-hidden border border-primary-100 shadow-card bg-white">
            {/* header */}
            <div className="hidden sm:grid grid-cols-[minmax(140px,0.35fr)_1fr] bg-primary-gradient text-white">
              <div className="px-5 py-3.5 text-sm font-bold">Key Area</div>
              <div className="px-5 py-3.5 text-sm font-bold">How Agentic AI Creates Impact</div>
            </div>

            <div className="divide-y divide-gray-100">
              {impactRows.map((row, i) => (
                <div
                  key={row.area}
                  className={`grid sm:grid-cols-[minmax(140px,0.35fr)_1fr] ${
                    i % 2 === 1 ? 'bg-primary-50/40' : 'bg-white'
                  }`}
                >
                  <div className="px-5 py-4 text-sm font-bold text-ink border-b sm:border-b-0 border-gray-100 sm:border-r border-gray-50">
                    <span className="sm:hidden text-[10px] uppercase tracking-wide text-primary-500 font-bold block mb-1">
                      Key Area
                    </span>
                    {row.area}
                  </div>
                  <div className="px-5 py-4 text-sm text-gray-600 leading-relaxed">
                    <span className="sm:hidden text-[10px] uppercase tracking-wide text-primary-500 font-bold block mb-1">
                      Impact
                    </span>
                    {row.impact}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function AgenticAiProcess() {
  const lineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ['start center', 'end center'],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section className="relative py-14 lg:py-20 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-2xl mx-auto mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-3">
            Our Agentic AI{' '}
            <span className="bg-clip-text text-transparent bg-primary-gradient">
              Development Process
            </span>
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
            A collaborative process to design agentic systems that align with your business goals.
          </p>
        </Reveal>

        <div ref={lineRef} className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-gray-100">
            <motion.div
              className="absolute top-0 left-0 w-full bg-primary-gradient origin-top rounded-full"
              style={{ height: lineHeight }}
            />
          </div>
          <div className="hidden lg:flex absolute left-1/2 top-0 bottom-0 -translate-x-1/2 flex-col justify-around pointer-events-none py-16">
            {processSteps.map((s) => (
              <span
                key={s.num}
                className="w-3.5 h-3.5 rounded-full border-2 border-primary-500 bg-white shadow-sm"
              />
            ))}
          </div>

          <div>
            {processSteps.map((step, i) => (
              <StepRow key={step.num} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
