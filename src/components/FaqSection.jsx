import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowRight, MessageSquareQuote, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { faqs } from '../data/content';
import Reveal from './Reveal';
import { useEstimateModal } from '../context/EstimateModalContext';

export default function FaqSection() {
  const [open, setOpen] = useState(0);
  const { openEstimateModal } = useEstimateModal();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-18">
      <div className="grid lg:grid-cols-5 gap-10 lg:gap-12 items-start">
        {/* Left Column: Heading + Interactive Help & Support Card */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Reveal>
            <p className="eyebrow mb-3">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-4">
              Questions, answered
            </h2>
            <p className="text-gray-500 leading-relaxed text-sm sm:text-base">
              Straight answers about how we work, timelines, and what to expect when you partner with Cubixsol.
            </p>
          </Reveal>

          {/* Interactive Help & Contact Box */}
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-sky-50/40 to-cyan-50/60 border border-cyan-200/70 p-6 sm:p-7 shadow-card hover:shadow-elev transition-all duration-300 group">
              {/* Background decorative ambient glow */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#00a4d8]/20 to-[#5d53a3]/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00a4d8] to-[#0284c7] text-white flex items-center justify-center shadow-md shadow-[#00a4d8]/25 group-hover:scale-105 transition-transform">
                  <MessageSquareQuote className="w-6 h-6" />
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-[11px] font-bold text-emerald-600 tracking-wide uppercase">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Fast Response
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-extrabold text-ink mb-2">
                Still have questions?
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mb-5">
                Can't find the answer you're looking for? Our solutions experts are here to help clarify your project requirements.
              </p>

              {/* Quick Trust Points */}
              <div className="space-y-2 mb-6 border-y border-cyan-100/70 py-3.5">
                <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                  <Zap className="w-4 h-4 text-[#00a4d8] shrink-0" />
                  <span>Typically responds in &lt; 15 minutes</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-600">
                  <ShieldCheck className="w-4 h-4 text-[#00a4d8] shrink-0" />
                  <span>Free consultation with NDA protection</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => openEstimateModal('FAQ Section - General Inquiry')}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#00a4d8] to-[#0284c7] text-white text-xs sm:text-sm font-bold shadow-md shadow-[#00a4d8]/20 hover:shadow-lg hover:shadow-[#00a4d8]/30 hover:brightness-105 active:scale-95 transition-all duration-200"
                >
                  <span>Ask a Question</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-ink text-xs sm:text-sm font-semibold hover:border-[#00a4d8] hover:text-[#00a4d8] hover:bg-sky-50/50 transition-all duration-200"
                >
                  <span>Contact Us</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column: FAQ Accordion List */}
        <div className="lg:col-span-3 space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 0.05}>
                <div
                  className={`rounded-2xl border transition-all duration-300 ${
                    isOpen ? 'border-[#00a4d8]/40 bg-gradient-to-r from-sky-50/40 to-cyan-50/20 shadow-card' : 'border-gray-100 bg-white hover:border-cyan-100'
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left group"
                    aria-expanded={isOpen}
                  >
                    <span className={`font-bold text-sm sm:text-base transition-colors ${isOpen ? 'text-[#00a4d8]' : 'text-ink group-hover:text-[#00a4d8]'}`}>
                      {item.q}
                    </span>
                    <span
                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isOpen ? 'bg-[#00a4d8] text-white shadow-sm shadow-[#00a4d8]/30' : 'bg-gray-100 text-gray-500 group-hover:bg-cyan-50 group-hover:text-[#00a4d8]'
                      }`}
                    >
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm text-gray-500 leading-relaxed border-t border-cyan-50/80 pt-3">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
