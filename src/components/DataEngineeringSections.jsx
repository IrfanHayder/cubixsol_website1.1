import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Reveal, { Stagger, StaggerItem } from './Reveal';
import { stats } from '../data/content';

const benefits = [
  {
    title: 'Reliable, Unified Data Pipelines',
    body: 'No more fragmented data slowing you down. We design and maintain pipelines that consolidate and organize your data so your teams can trust the information they use.',
  },
  {
    title: 'Teams Free From Grunt Work',
    body: 'Stop drowning in manual data prep. We automate the heavy lifting so your team spends time on strategy, not spreadsheets.',
  },
  {
    title: 'Compliance Without the Headache',
    body: 'Data governance and security do not have to be complicated. We help keep data secure, traceable, and audit-ready in line with industry expectations.',
  },
  {
    title: 'Scalability Without the Stress',
    body: 'Your business will not stand still, and neither should your data. We design systems that grow with you — without constant rebuilds.',
  },
  {
    title: 'Data That Drives Growth',
    body: 'With structured, reliable data, every initiative becomes measurable. We help you track performance, uncover opportunities, and invest where impact is real.',
  },
];

const faqs = [
  {
    q: 'How do you keep data safe and private in data engineering?',
    a: 'We take data security seriously. Information is protected with encryption, access controls, and practices aligned with common privacy expectations. We help track access, reduce exposure, and close gaps before they become risks.',
  },
  {
    q: 'Can you help with just part of my data engineering project?',
    a: 'Yes. Whether you need a single pipeline, a migration, or a full platform, we can engage for a focused scope or an end-to-end delivery — matched to your team and timeline.',
  },
  {
    q: 'What challenges do businesses face in data engineering?',
    a: 'Common issues include fragmented sources, unreliable pipelines, unclear ownership, slow reporting, and systems that do not scale. We address these with clear architecture, automation, and operational practices.',
  },
  {
    q: 'How can data engineering accelerate AI and analytics initiatives?',
    a: 'Clean, well-modeled, accessible data is the foundation for analytics and AI. Solid pipelines and warehouses reduce prep time so models and dashboards can ship faster and stay trustworthy.',
  },
  {
    q: 'How do you ensure data pipelines are reliable and scalable?',
    a: 'We design for monitoring, retries, idempotency, and clear ownership. Capacity and partitioning strategies are planned up front so growth does not mean constant firefighting.',
  },
];

function Accordion({ items, numbered = false }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-sky-100/80 shadow-sm overflow-hidden">
      {items.map((item, i) => {
        const isOpen = open === i;
        const isLast = i === items.length - 1;
        const title = item.title || item.q;
        const body = item.body || item.a;
        return (
          <div key={title} className={!isLast ? 'border-b border-sky-100' : ''}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="w-full flex items-center justify-between gap-3 px-4 sm:px-6 py-4 sm:py-5 text-left hover:bg-sky-50/40 transition-colors"
              aria-expanded={isOpen}
            >
              <span className="font-bold text-ink text-sm sm:text-base pr-2">
                {numbered ? `${i + 1}. ${title}` : title}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-primary-500 shrink-0 transition-transform duration-300 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-4 sm:px-6 pb-5 text-sm text-gray-500 leading-relaxed -mt-1">
                    {body}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export function DataEngineeringBenefits() {
  return (
    <section className="py-14 lg:py-20 bg-[#f0f6fc]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight">
            What You&apos;ll Get From{' '}
            <span className="bg-clip-text text-transparent bg-primary-gradient">Working With Us</span>
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <Accordion items={benefits} />
        </Reveal>
      </div>
    </section>
  );
}

export function DataEngineeringWhy() {
  const cards = [
    { value: '10+', label: 'Years building digital products' },
    { value: '200+', label: 'Projects delivered' },
    { value: '150+', label: 'Happy clients' },
    { value: '98%', label: 'Client satisfaction' },
  ];

  // prefer site stats if shape matches
  const display =
    Array.isArray(stats) && stats.length >= 4
      ? stats.slice(0, 4).map((s) => ({
          value: `${s.value}${s.suffix || ''}`,
          label: s.label,
        }))
      : cards;

  return (
    <section className="py-14 lg:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight">
            Why Choose Cubixsol for{' '}
            <span className="bg-clip-text text-transparent bg-primary-gradient">Data Engineering</span>
          </h2>
          <p className="text-sm text-gray-500 mt-3 max-w-2xl mx-auto">
            Practical architecture, reliable pipelines, and a team that ships — not slide decks alone.
          </p>
        </Reveal>

        <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4" staggerDelay={0.06}>
          {display.map((c) => (
            <StaggerItem key={c.label}>
              <div className="bg-primary-50/60 border border-primary-100 rounded-2xl p-5 sm:p-6 text-center h-full">
                <p className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-1">
                  {c.value}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 leading-snug">{c.label}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export function DataEngineeringFaq() {
  return (
    <section className="py-14 lg:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
            All the A&apos;s to your Q&apos;s
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
            {faqs.map((item, i) => (
              <FaqRow key={item.q} item={item} index={i} defaultOpen={i === 0} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FaqRow({ item, index, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-4 py-4 sm:py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-sm sm:text-base font-bold text-ink pr-2">{item.q}</span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 shrink-0 mt-0.5 transition-transform duration-300 ${
            open ? 'rotate-180 text-primary-500' : ''
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-gray-500 leading-relaxed pr-8">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
