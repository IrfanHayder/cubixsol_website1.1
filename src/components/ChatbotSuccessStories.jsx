import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Reveal from './Reveal';

const stories = [
  {
    id: 'retail-bot',
    tab: 'ShopFlow',
    industry: 'Retail',
    title: 'What is ShopFlow?',
    summary:
      'Cubixsol partnered with a growing ecommerce brand to launch an AI support and product-discovery chatbot. The bot handles order status, returns FAQs, and guided recommendations — reducing ticket volume while improving conversion on key collections.',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&h=700&q=70',
    tech: ['React', 'Node.js', 'OpenAI', 'Shopify'],
  },
  {
    id: 'support-hub',
    tab: 'SupportHub',
    industry: 'SaaS',
    title: 'What is SupportHub?',
    summary:
      'A multi-channel assistant for a SaaS help center that answers product questions, creates tickets, and escalates to humans with full context. Response times dropped and CSAT improved without growing the support headcount overnight.',
    img: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=900&h=700&q=70',
    tech: ['Next.js', 'Python', 'RAG', 'Zendesk'],
  },
  {
    id: 'cart-assist',
    tab: 'CartAssist',
    industry: 'Ecommerce',
    title: 'What is CartAssist?',
    summary:
      'An on-site chatbot focused on cart recovery and sizing guidance. It answers fit questions, suggests alternatives, and nudges incomplete checkouts with clear, helpful prompts instead of aggressive popups.',
    img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&h=700&q=70',
    tech: ['TypeScript', 'LLM', 'Segment', 'Stripe'],
  },
];

export default function ChatbotSuccessStories() {
  const [active, setActive] = useState(0);
  const current = stories[active];

  return (
    <section className="py-14 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-8 lg:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight">
            Cubixsol{' '}
            <span className="bg-clip-text text-transparent bg-primary-gradient">Success Stories</span>
          </h2>
          <p className="text-sm text-gray-500 mt-2 max-w-xl mx-auto">
            Selected work in conversational commerce and AI customer support.
          </p>
        </Reveal>

        <Reveal>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {stories.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setActive(i)}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  active === i
                    ? 'bg-primary-gradient text-white shadow-soft'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-200 hover:text-primary-700'
                }`}
              >
                {s.tab}
              </button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid lg:grid-cols-2 rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-100 shadow-elev bg-white"
          >
            <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[340px] bg-gray-100">
              <img
                src={current.img}
                alt={current.tab}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                width={900}
                height={700}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 bg-white/95 text-ink text-xs font-bold px-3 py-1.5 rounded-full">
                {current.industry}
              </span>
            </div>

            <div className="bg-ink text-white p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
              <span className="inline-flex self-start text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-primary-500/30 text-primary-200 border border-primary-400/30 mb-4">
                Case study
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold mb-2">{current.title}</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-6">{current.summary}</p>
              <p className="text-xs font-bold tracking-widest uppercase text-white/40 mb-3">
                Technologies
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {current.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-[11px] font-semibold text-white/90"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 self-start bg-primary-gradient text-white font-semibold text-sm px-5 py-2.5 rounded-lg hover:opacity-95 transition"
              >
                View case study <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
