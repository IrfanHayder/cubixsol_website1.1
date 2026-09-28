import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  Code2,
  ShieldCheck,
  Rocket,
  Compass,
} from 'lucide-react';
import Reveal from './Reveal';
import { FormatRichText } from '../utils/formatText';

// Fallback icons for different stages of the development cycle
const STEP_ICONS = [Compass, Layers, Code2, ShieldCheck, Rocket];

const DEFAULT_HIGHLIGHTS = [
  ['Project Goal Alignment', 'Technical Scope & Feasibility', 'Architecture & Roadmap'],
  ['Wireframing & Prototypes', 'UI/UX Design Systems', 'User Journey Mapping'],
  ['Frontend & Backend Coding', 'API Integrations & Database', 'Sprint Reviews & Demos'],
  ['QA & Performance Audits', 'Security & Cross-Browser Checks', 'Bug Fixing & Optimization'],
  ['Live Production Deployment', 'Monitoring & Stability Checks', 'Ongoing Maintenance & Support'],
];

export default function ProcessRoadmapStepper({
  steps = [],
  title = 'Our Structured Process',
  intro = '',
  eyebrow = 'Methodology',
}) {
  const [activeStep, setActiveStep] = useState(0);
  const totalSteps = steps.length;
  const containerRef = useRef(null);
  const tabsRef = useRef(null);

  if (!steps || steps.length === 0) return null;

  const current = steps[activeStep] || steps[0];
  const StepIcon = STEP_ICONS[activeStep % STEP_ICONS.length] || Sparkles;
  const highlights =
    Array.isArray(current.points) && current.points.length > 0
      ? current.points
      : DEFAULT_HIGHLIGHTS[activeStep % DEFAULT_HIGHLIGHTS.length] || [];

  const handleNext = () => {
    setActiveStep((prev) => (prev + 1) % totalSteps);
  };

  const handlePrev = () => {
    setActiveStep((prev) => (prev - 1 + totalSteps) % totalSteps);
  };

  // Scroll active tab into view on small screens
  useEffect(() => {
    if (tabsRef.current) {
      const activeTabEl = tabsRef.current.children[activeStep];
      if (activeTabEl) {
        activeTabEl.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [activeStep]);

  return (
    <section className="py-12 lg:py-18 border-t border-gray-100" ref={containerRef}>
      <div className="rounded-3xl bg-gradient-to-br from-slate-50/90 via-white to-sky-50/50 border border-gray-200/80 p-6 sm:p-8 lg:p-12 shadow-card relative overflow-hidden">
        {/* Top Decorative Gradient Line */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#00a4d8] via-primary-500 to-indigo-500" />

        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <Reveal className="max-w-2xl">
            <p className="eyebrow mb-2">{eyebrow}</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-3">
              {title}
            </h2>
            {intro && (
              <div className="text-sm sm:text-base text-gray-500 leading-relaxed">
                <FormatRichText text={intro} />
              </div>
            )}
          </Reveal>

          {/* Stepper Arrow Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-bold text-gray-400">
              Phase <strong className="text-[#00a4d8]">{String(activeStep + 1).padStart(2, '0')}</strong> / {String(totalSteps).padStart(2, '0')}
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous step"
                className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-gray-700 hover:text-[#00a4d8] hover:border-[#00a4d8] hover:shadow-2xs transition flex items-center justify-center cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next step"
                className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-gray-700 hover:text-[#00a4d8] hover:border-[#00a4d8] hover:shadow-2xs transition flex items-center justify-center cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Step Progress Timeline Tabs */}
        <div className="mb-8 overflow-hidden">
          <div
            ref={tabsRef}
            className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none no-scrollbar snap-x"
          >
            {steps.map((step, idx) => {
              const isActive = idx === activeStep;
              const isPassed = idx < activeStep;
              const stepNumber = step.stepNumber || String(idx + 1).padStart(2, '0');

              return (
                <button
                  key={step.title || idx}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`snap-start shrink-0 px-4 sm:px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2.5 cursor-pointer border ${
                    isActive
                      ? 'bg-gradient-to-r from-[#00a4d8] to-[#0284c7] text-white border-transparent shadow-md shadow-[#00a4d8]/25 scale-[1.02]'
                      : isPassed
                      ? 'bg-sky-50/80 text-[#00a4d8] border-cyan-100/80 hover:bg-sky-100/70'
                      : 'bg-white text-gray-600 border-gray-200/80 hover:border-[#00a4d8]/40 hover:text-[#00a4d8]'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-lg text-[11px] font-black flex items-center justify-center transition-colors ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : isPassed
                        ? 'bg-[#00a4d8]/15 text-[#00a4d8]'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {stepNumber}
                  </span>
                  <span className="whitespace-nowrap">{step.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Active Step Animated Showcase Box */}
        <div className="relative bg-white rounded-3xl border border-gray-200/90 shadow-card overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="p-6 sm:p-8 lg:p-10 grid lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Stage Info, Title & Deliverables */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 rounded-full bg-sky-50 border border-cyan-100 text-[#00a4d8] font-black text-xs uppercase tracking-wider">
                      Phase {String(activeStep + 1).padStart(2, '0')} of {String(totalSteps).padStart(2, '0')}
                    </span>
                    <span className="text-xs font-semibold text-gray-400">
                      Step {current.stepNumber || String(activeStep + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-ink mb-3 leading-snug">
                    {current.title}
                  </h3>

                  <div className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6">
                    <FormatRichText text={current.desc} />
                  </div>

                  {/* Highlights / Key Milestones */}
                  {highlights.length > 0 && (
                    <div className="mb-6">
                      <p className="text-xs font-extrabold uppercase tracking-wider text-gray-400 mb-3">
                        Key Milestones & Focus Areas
                      </p>
                      <div className="grid sm:grid-cols-2 gap-2.5">
                        {highlights.map((point, pIdx) => (
                          <div
                            key={pIdx}
                            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-50/80 border border-gray-100 text-xs sm:text-sm font-semibold text-ink"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#00a4d8] shrink-0" />
                            <span className="truncate">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Action / Next Step Link */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#00a4d8] hover:text-[#0284c7] hover:gap-3 transition-all cursor-pointer"
                  >
                    {activeStep === totalSteps - 1 ? 'Back to Phase 01' : 'Next: ' + (steps[(activeStep + 1) % totalSteps]?.title || 'Next Phase')}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-gray-400">
                    Step {activeStep + 1} of {totalSteps}
                  </span>
                </div>
              </div>

              {/* Right Column: Visual Stage Badge & Animation */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="w-full max-w-sm rounded-3xl bg-gradient-to-br from-sky-50 via-cyan-50/60 to-blue-50/80 border border-cyan-100/90 p-6 sm:p-8 flex flex-col items-center text-center relative overflow-hidden shadow-sm">
                  {/* Decorative Radial Background */}
                  <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#00a4d8_1px,transparent_1px)] [background-size:16px_16px]" />

                  {/* Icon Avatar */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-[#00a4d8] to-[#0284c7] text-white flex items-center justify-center shadow-lg shadow-[#00a4d8]/30 mb-5 relative z-10">
                    <StepIcon className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow" strokeWidth={1.5} />
                  </div>

                  {/* Large Number Badge */}
                  <span className="text-4xl sm:text-5xl font-black text-ink tracking-tight mb-1 relative z-10">
                    {current.stepNumber || String(activeStep + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xs font-bold text-[#00a4d8] uppercase tracking-widest mb-4 relative z-10">
                    {current.title}
                  </span>

                  {/* Progress Bar Indicator */}
                  <div className="w-full bg-gray-200/80 rounded-full h-2 overflow-hidden relative z-10">
                    <motion.div
                      className="bg-gradient-to-r from-[#00a4d8] to-[#0284c7] h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((activeStep + 1) / totalSteps) * 100}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                  <span className="text-[11px] text-gray-400 font-semibold mt-2 relative z-10">
                    {Math.round(((activeStep + 1) / totalSteps) * 100)}% Complete
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
