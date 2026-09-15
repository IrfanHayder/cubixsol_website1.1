import { useState, useEffect } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronDown, Sparkles, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { solutions as staticSolutions } from '../data/content';
import Breadcrumb from '../components/Breadcrumb';
import CtaBanner from '../components/CtaBanner';
import ServiceInquiryForm from '../components/ServiceInquiryForm';
import { AgenticAiImpact, AgenticAiProcess } from '../components/AgenticAiSections';
import SolutionBestPractices from '../components/SolutionBestPractices';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';
import { apiFetch } from '../utils/api';
import { useSEO } from '../utils/seo';

function SolutionFaqSection({ faqs, solutionTitle }) {
  const [openFaq, setOpenFaq] = useState(null);
  if (!Array.isArray(faqs) || faqs.length === 0) return null;

  return (
    <section className="py-14 lg:py-20 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-10">
          <p className="eyebrow mb-2">FAQ</p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Everything you need to know about our {solutionTitle} solution.
          </p>
        </Reveal>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={faq.q || idx}
                className="rounded-2xl border border-gray-200/80 bg-white overflow-hidden transition-all duration-200 hover:border-cyan-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left font-bold text-ink hover:text-[#00a4d8] transition-colors"
                >
                  <span className="text-base sm:text-lg">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#00a4d8]' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-gray-100 pt-3">
                        {faq.a}
                      </div>
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

export default function SolutionDetail() {
  const { slug } = useParams();
  const fallback = staticSolutions.find((s) => s.slug === slug);
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setNotFound(false);

    async function loadSolution() {
      try {
        const live = await apiFetch(`solutions/${slug}`);
        if (cancelled) return;
        if (live && live.slug) {
          setSolution(live);
          setLoading(false);
        } else if (fallback) {
          setSolution(fallback);
          setLoading(false);
        } else {
          setNotFound(true);
          setLoading(false);
        }
      } catch (_) {
        if (cancelled) return;
        if (fallback) {
          setSolution(fallback);
        } else {
          setNotFound(true);
        }
        setLoading(false);
      }
    }
    loadSolution();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  useSEO(solution?.seo, {
    title: solution?.title ? `${solution.title} | Cubixsol Solutions` : undefined,
    description: solution?.desc || solution?.description,
    keywords: `${solution?.title || ''}, ${solution?.group || solution?.category || ''}, Cubixsol solutions`,
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-gray-400">
        <div className="w-9 h-9 border-3 border-gray-200 border-t-[#00a4d8] rounded-full animate-spin" />
        <span className="text-sm font-medium text-gray-500">Loading solution...</span>
      </div>
    );
  }

  if (notFound || !solution) return <Navigate to="/solutions" replace />;

  const currentSolution = solution;

  const accessibilitySlugs = ['image-to-text', 'reescrever-texto', 'jpg-a-pdf', 'jpg-to-pdf'];
  if (accessibilitySlugs.includes(currentSolution.slug)) {
    return <Navigate to={`/products/${currentSolution.slug}`} replace />;
  }

  if (currentSolution.slug === 'ai-seo-auditor') {
    return <Navigate to="/tools/ai-seo-auditor" replace />;
  }


  const related = staticSolutions
    .filter((s) => s.group === currentSolution.group && s.slug !== slug)
    .slice(0, 3);

  const hasBullets = Array.isArray(currentSolution.bullets) && currentSolution.bullets.length > 0;
  const hasSubServices = Array.isArray(currentSolution.subServicesItems) && currentSolution.subServicesItems.length > 0;
  const hasUseCases = Array.isArray(currentSolution.useCasesItems) && currentSolution.useCasesItems.length > 0;
  const hasTech = Boolean(currentSolution.techDesc || (Array.isArray(currentSolution.tech) && currentSolution.tech.length > 0));
  const hasWhyChoose = Array.isArray(currentSolution.whyChooseItems) && currentSolution.whyChooseItems.length > 0;
  const hasPractices = Array.isArray(currentSolution.practices?.items) && currentSolution.practices.items.length > 0;
  const hasCustomImpact = Array.isArray(currentSolution.impact?.rows) && currentSolution.impact.rows.length > 0;
  const hasCustomProcess = Array.isArray(currentSolution.process?.steps) && currentSolution.process.steps.length > 0;
  const hasCustomFaqs = Array.isArray(currentSolution.faqs) && currentSolution.faqs.length > 0;

  return (
    <div>
      <Breadcrumb
        current={currentSolution.heroTitle || currentSolution.title || currentSolution.name}
        items={[
          { label: 'Solutions', to: '/solutions' },
          { label: currentSolution.group || currentSolution.category || 'Solutions', to: '/solutions' },
        ]}
      />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-14">
        <Reveal scale>
          <Link
            to="/solutions"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-primary-600 mb-6 transition"
          >
            <ArrowLeft className="w-4 h-4" /> All solutions
          </Link>
          <p className="eyebrow mb-2">{currentSolution.group || currentSolution.category || 'Solution'}</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-4 max-w-3xl">
            {currentSolution.heroTitle || currentSolution.title || currentSolution.name}
          </h1>
          {(currentSolution.description || currentSolution.desc) && (
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-3xl mb-8">
              {currentSolution.description || currentSolution.desc}
            </p>
          )}
          <div className="flex flex-wrap gap-3 mb-12">
            <Link
              to={currentSolution.ctaPrimaryLink || '/contact'}
              className="btn-primary"
            >
              {currentSolution.ctaPrimaryText || 'Talk to us'} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to={currentSolution.ctaSecondaryLink || '/services'}
              className="btn-outline"
            >
              {currentSolution.ctaSecondaryText || 'Browse services'}
            </Link>
          </div>
        </Reveal>

        {/* How We Engage Section (Only if admin added bullets) */}
        {hasBullets && (
          <div className="grid lg:grid-cols-2 gap-10 items-start mb-12">
            <Reveal direction="right">
              <h2 className="text-xl font-extrabold text-ink mb-4">How we engage</h2>
              <Stagger className="space-y-3" staggerDelay={0.05}>
                {currentSolution.bullets.map((b) => (
                  <StaggerItem key={b}>
                    <div className="flex gap-3 bg-white rounded-xl border border-gray-100 p-4 shadow-card">
                      <CheckCircle2 className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                      <p className="text-sm font-medium text-ink">{b}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </Reveal>
            <Reveal direction="left" delay={0.1}>
              <div className="rounded-2xl bg-primary-50/60 border border-primary-100 p-6 sm:p-8">
                <h3 className="font-extrabold text-ink mb-2">Need this in your roadmap?</h3>
                <p className="text-sm text-gray-500 mb-5 leading-relaxed">
                  Share your goals and constraints — we will outline a practical path, stack recommendations,
                  and a realistic timeline.
                </p>
                <Link to="/contact" className="btn-primary">
                  Start a conversation <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        )}

        {/* Sub-Services / Offerings Section (Only if admin added subServicesItems) */}
        {hasSubServices && (
          <section className="py-12 lg:py-16 border-t border-gray-100/90 -mx-4 sm:mx-0 px-4 sm:px-0">
            <Reveal className="max-w-3xl mb-10">
              <p className="eyebrow mb-2">Capabilities &amp; Scope</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-3">
                {currentSolution.subServicesTitle || `Our ${currentSolution.title} Services`}
              </h2>
              {currentSolution.subServicesIntro && (
                <p className="text-gray-500 text-base leading-relaxed">
                  {currentSolution.subServicesIntro}
                </p>
              )}
            </Reveal>

            <Stagger className="grid sm:grid-cols-2 gap-5 lg:gap-6" staggerDelay={0.06}>
              {currentSolution.subServicesItems.map((item, idx) => (
                <StaggerItem key={item.title || idx} hover>
                  <div className="group relative bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_-10px_rgba(0,164,216,0.12)] hover:border-cyan-200 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between">
                    <div>
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-sky-50 to-cyan-50 border border-cyan-100/80 flex items-center justify-center text-[#00a4d8] font-black text-sm mb-5 group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-[#00a4d8] group-hover:to-[#0284c7] group-hover:text-white transition-all duration-300">
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                      <h3 className="font-extrabold text-ink text-lg sm:text-xl mb-3 group-hover:text-[#00a4d8] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </section>
        )}

        {/* Use Cases Section (Only if admin added useCasesItems) */}
        {hasUseCases && (
          <section className="py-12 lg:py-16 border-t border-gray-100/90 -mx-4 sm:mx-0 px-4 sm:px-0">
            <Reveal className="max-w-3xl mb-10">
              <p className="eyebrow mb-2">Real-World Applications</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-3">
                {currentSolution.useCasesTitle || 'Use Cases'}
              </h2>
              {currentSolution.useCasesIntro && (
                <p className="text-gray-500 text-base leading-relaxed">
                  {currentSolution.useCasesIntro}
                </p>
              )}
            </Reveal>

            <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.06}>
              {currentSolution.useCasesItems.map((item, idx) => (
                <StaggerItem key={item.title || idx} hover>
                  <div className="group relative bg-white rounded-3xl border border-gray-100 p-6 sm:p-7 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_-10px_rgba(0,164,216,0.12)] hover:border-cyan-200 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between">
                    <div>
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-sky-50 to-cyan-50 border border-cyan-100/80 flex items-center justify-center text-[#00a4d8] font-black text-sm mb-5 group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-[#00a4d8] group-hover:to-[#0284c7] group-hover:text-white transition-all duration-300">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <h3 className="font-extrabold text-ink text-lg sm:text-xl mb-2.5 group-hover:text-[#00a4d8] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </section>
        )}

        {/* Tools & Tech Stack Section (Only if admin added techDesc or tech items) */}
        {hasTech && (
          <section className="py-12 lg:py-16 border-t border-gray-100/90 -mx-4 sm:mx-0 px-4 sm:px-0">
            <Reveal>
              <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 text-white p-8 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden">
                {/* Background glow ornaments */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#00a4d8]/15 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/3" />

                <div className="relative z-10 grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-center">
                  <div>
                    <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2">Technology &amp; Architecture</p>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-4">
                      {currentSolution.techTitle || 'Tools & Tech'}
                    </h2>
                    {currentSolution.techDesc && (
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                        {currentSolution.techDesc}
                      </p>
                    )}
                  </div>

                  {Array.isArray(currentSolution.tech) && currentSolution.tech.length > 0 && (
                    <div className="flex flex-wrap gap-3 items-center justify-start lg:justify-end">
                      {currentSolution.tech.map((tool, idx) => (
                        <div
                          key={tool || idx}
                          className="px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-white font-bold text-sm sm:text-base shadow-sm hover:border-cyan-400/60 hover:bg-white/15 hover:scale-105 transition-all duration-300 flex items-center gap-2.5"
                        >
                          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                          {tool}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          </section>
        )}

        {/* Best Practices Section (Only if admin added practices) */}
        {hasPractices && (
          <div className="mt-6 -mx-4 sm:mx-0">
            <SolutionBestPractices
              slug={currentSolution.slug}
              practicesData={currentSolution.practices}
              solutionTitle={currentSolution.title}
            />
          </div>
        )}



        {/* Impact Comparison Table (Only if admin added impact rows) */}
        {hasCustomImpact && (
          <div className="mt-6 -mx-4 sm:mx-0">
            <AgenticAiImpact
              impactData={currentSolution.impact}
              solutionTitle={currentSolution.title}
            />
          </div>
        )}

        {/* Process Roadmap Section (Only if admin added process steps) */}
        {hasCustomProcess && (
          <div className="-mx-4 sm:mx-0">
            <AgenticAiProcess
              processData={currentSolution.process}
              solutionTitle={currentSolution.title}
            />
          </div>
        )}

        {/* Why Choose Us Section (Only if admin added whyChooseItems) */}
        {hasWhyChoose && (
          <section className="py-12 lg:py-16 border-t border-gray-100/90 -mx-4 sm:mx-0 px-4 sm:px-0">
            <Reveal className="max-w-3xl mb-10">
              <p className="eyebrow mb-2">Why Partner With Us</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-3">
                {currentSolution.whyChooseTitle || 'Why Choose Cubixsol?'}
              </h2>
              {currentSolution.whyChooseIntro && (
                <p className="text-gray-500 text-base leading-relaxed">
                  {currentSolution.whyChooseIntro}
                </p>
              )}
            </Reveal>

            <Stagger className="grid sm:grid-cols-2 gap-6" staggerDelay={0.06}>
              {currentSolution.whyChooseItems.map((item, idx) => (
                <StaggerItem key={item.title || idx} hover>
                  <div className="group relative bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_-10px_rgba(0,164,216,0.12)] hover:border-cyan-200 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between">
                    <div>
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-50 to-sky-50 border border-cyan-100/80 flex items-center justify-center text-[#00a4d8] font-black text-sm mb-5 group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-[#00a4d8] group-hover:to-[#0284c7] group-hover:text-white transition-all duration-300">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <h3 className="font-extrabold text-ink text-lg sm:text-xl mb-3 group-hover:text-[#00a4d8] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </section>
        )}



        {/* Dynamic Solution FAQs Section (Only if admin added faqs) */}
        {hasCustomFaqs && (
          <div className="-mx-4 sm:mx-0">
            <SolutionFaqSection faqs={currentSolution.faqs} solutionTitle={currentSolution.title} />
          </div>
        )}

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-extrabold text-ink mb-5">
              More in {currentSolution.group || currentSolution.category}
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/solutions/${r.slug}`}
                  className="bg-white rounded-2xl border border-gray-100 p-5 shadow-card hover:shadow-elev transition"
                >
                  <h3 className="font-bold text-ink mb-1">{r.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{r.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
      <div id="service-inquiry">
        <ServiceInquiryForm defaultService={currentSolution.title} />
      </div>
      <CtaBanner
        eyebrow={currentSolution.ctaBannerEyebrow || 'READY TO GET STARTED?'}
        title={currentSolution.ctaBannerTitle || 'Ready to Get Started?'}
        desc={
          currentSolution.ctaBannerDesc ||
          `Start with a clear business use case and build it with **${currentSolution.title.toLowerCase()}** from Cubixsol. Book a call to discuss your workflow, required integrations, and the tasks you want your AI system to handle.`
        }
        buttonText={currentSolution.ctaBannerButtonText || currentSolution.ctaPrimaryText || 'Book a Call'}
        buttonLink={currentSolution.ctaBannerButtonLink || currentSolution.ctaPrimaryLink || '/contact'}
        secondaryButtonText={currentSolution.ctaBannerSecondaryButtonText || currentSolution.ctaSecondaryText || 'Get a Free Assessment'}
        secondaryButtonLink={currentSolution.ctaBannerSecondaryButtonLink || currentSolution.ctaSecondaryLink || '/contact'}
      />
    </div>
  );
}
