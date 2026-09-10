import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layout,
  Cpu,
  Link2,
  Shield,
  MessageSquare,
  ChevronDown,
} from 'lucide-react';
import Reveal from './Reveal';

const practices = [
  {
    icon: Layout,
    title: 'Optimize the User Experience',
    body: 'An intuitive user experience is critical for the success of your ecommerce chatbot. We create interfaces that feel natural, follow a logical flow, and are easy to navigate — responsive across desktops, tablets, and smartphones.',
  },
  {
    icon: Cpu,
    title: 'Choose the Right Technology',
    body: 'Your ecommerce chatbot should understand linguistic nuances and human intent. We leverage modern NLP and AI tools that interpret queries accurately, including context and idioms, and design solutions that are scalable, fast, and able to learn from past interactions.',
  },
  {
    icon: Link2,
    title: 'Ensure Seamless Integration',
    body: 'The chatbot should work with your current systems and add value rather than disrupt them. We build chatbots that integrate with websites, mobile apps, CRMs, and other platforms so data stays consistent across every touchpoint.',
  },
  {
    icon: Shield,
    title: 'Focus on Data Security',
    body: 'Data security comes first in ecommerce chatbot development. We follow privacy requirements such as GDPR-minded practices, implement strong encryption to safeguard customer data, and support regular reviews so safety and compliance stay current.',
  },
  {
    icon: MessageSquare,
    title: 'Incorporate Feedback Mechanism',
    body: 'Collecting user feedback enables continuous improvement. We build feedback paths into the chatbot so customers can rate or comment easily — helping the experience evolve based on real usage and serve customers better over time.',
  },
];

export default function ChatbotBestPractices() {
  const [openSet, setOpenSet] = useState(() => new Set([0]));

  const toggle = (i) => {
    setOpenSet((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <section className="py-14 lg:py-20 bg-[#f0f6fc]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-4">
            <span className="text-primary-500">Best Practices</span> for Ecommerce Chatbot
            Development
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-2xl mx-auto">
            Chatbots can be tricky to develop and implement — especially with custom requests. These
            practices guide how we design, integrate, and improve ecommerce assistants that customers
            actually use.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="bg-white rounded-xl sm:rounded-2xl border border-sky-100/80 shadow-sm overflow-hidden">
            {practices.map((item, i) => {
              const Icon = item.icon;
              const isOpen = openSet.has(i);
              const isLast = i === practices.length - 1;
              return (
                <div key={item.title} className={!isLast ? 'border-b border-sky-100' : ''}>
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    className="w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 sm:py-5 text-left hover:bg-sky-50/50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                      <Icon className="w-4.5 h-4.5 sm:w-5 sm:h-5" strokeWidth={1.75} />
                    </span>
                    <span className="flex-1 font-bold text-ink text-sm sm:text-base">
                      {item.title}
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
                        <p className="px-4 sm:px-6 pb-5 pl-[3.75rem] sm:pl-[4.5rem] text-sm text-gray-500 leading-relaxed -mt-1">
                          {item.body}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
