import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Reveal from './Reveal';

const faqs = [
  {
    q: 'What is an ecommerce AI chatbot?',
    a: 'An ecommerce AI chatbot is a software application designed to interact with website or app users in real time. It can provide 24/7 customer support, answer questions, recommend products, track engagement, and hand off complex issues to human agents when needed.',
  },
  {
    q: 'How can ecommerce chatbots enhance user experience?',
    a: 'They reduce wait times, guide shoppers to the right products, answer policy questions instantly, and keep conversations consistent across channels. A well-designed bot feels helpful rather than robotic and frees your team for higher-value support.',
  },
  {
    q: 'What is the timeframe for building an ecommerce chatbot?',
    a: 'A focused MVP can often ship in a few weeks, depending on integrations and language coverage. More advanced bots with deep CRM, catalog, and multilingual support typically take longer. We share a clear timeline after discovery.',
  },
  {
    q: 'What is the cost of developing an AI chatbot for ecommerce?',
    a: 'Cost depends on scope: channels, languages, integrations (store, CRM, helpdesk), and how much custom AI training you need. After a short discovery we provide a practical estimate aligned to your priorities.',
  },
  {
    q: 'Do ecommerce chatbots support multiple languages?',
    a: 'Yes. We can design multilingual flows and models so customers get support in the languages that matter for your markets, with consistent brand tone and escalation paths.',
  },
];

export default function ChatbotFaq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="py-14 lg:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
            Frequently Asked Questions
          </h2>
        </Reveal>

        <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-start justify-between gap-4 py-4 sm:py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-ink pr-2">
                    {i + 1}. {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 shrink-0 mt-0.5 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-primary-500' : ''
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
                      <p className="pb-5 text-sm text-gray-500 leading-relaxed pr-8">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
