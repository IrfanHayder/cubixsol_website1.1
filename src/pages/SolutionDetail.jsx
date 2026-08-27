import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { solutions } from '../data/content';
import Breadcrumb from '../components/Breadcrumb';
import CtaBanner from '../components/CtaBanner';
import ServiceInquiryForm from '../components/ServiceInquiryForm';
import ChatbotBestPractices from '../components/ChatbotBestPractices';
import ChatbotSuccessStories from '../components/ChatbotSuccessStories';
import ChatbotFaq from '../components/ChatbotFaq';
import { AgenticAiImpact, AgenticAiProcess } from '../components/AgenticAiSections';
import { DataEngineeringBenefits, DataEngineeringWhy, DataEngineeringFaq } from '../components/DataEngineeringSections';
import SolutionBestPractices from '../components/SolutionBestPractices';
import {
  OracleAidpHero,
  OracleAidpIntro,
  OracleAidpCompare,
  OracleAidpExpertise,
  OracleAidpApproach,
  OracleAidpExtras,
} from '../components/OracleAidpSections';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';

export default function SolutionDetail() {
  const { slug } = useParams();
  const solution = solutions.find((s) => s.slug === slug);
  if (!solution) return <Navigate to="/solutions" replace />;

  const accessibilitySlugs = ['image-to-text', 'reescrever-texto', 'jpg-a-pdf', 'jpg-to-pdf'];
  if (accessibilitySlugs.includes(solution.slug)) {
    return <Navigate to={`/products/${solution.slug}`} replace />;
  }

  if (solution.slug === 'ai-seo-auditor') {
    return <Navigate to="/tools/ai-seo-auditor" replace />;
  }

  if (solution.slug === 'oracle-aidp') {
    return (
      <div className="bg-white">
        <OracleAidpHero />
        <OracleAidpIntro />
        <OracleAidpCompare />
        <OracleAidpExpertise />
        <OracleAidpApproach />
        <OracleAidpExtras />
        <div id="oracle-inquiry">
          <ServiceInquiryForm defaultService="Oracle AI Data Platform" />
        </div>
        <CtaBanner />
      </div>
    );
  }

  const related = solutions.filter((s) => s.group === solution.group && s.slug !== slug).slice(0, 3);

  const bullets = [
    'Discovery & requirements alignment',
    'Architecture and implementation plan',
    'Build, integrate, and test',
    'Launch support and iteration',
  ];

  return (
    <div>
      <Breadcrumb
        current={solution.title}
        items={[
          { label: 'Solutions', to: '/solutions' },
          { label: solution.group, to: '/solutions' },
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
          <p className="eyebrow mb-2">{solution.group}</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-4 max-w-2xl">
            {solution.title}
          </h1>
          <p className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
            {solution.desc} Cubixsol teams design and deliver this capability as part of a clear
            engagement — from discovery through production support.
          </p>
          <div className="flex flex-wrap gap-3 mb-12">
            <Link to="/contact" className="btn-primary">
              Talk to us <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/services" className="btn-outline">
              Browse services
            </Link>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <Reveal direction="right">
            <h2 className="text-xl font-extrabold text-ink mb-4">How we engage</h2>
            <Stagger className="space-y-3" staggerDelay={0.05}>
              {bullets.map((b) => (
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

        <div className="mt-10 -mx-4 sm:mx-0">
          <SolutionBestPractices slug={solution.slug} />
        </div>

        {solution.slug === 'ai-chatbots-support' && (
          <>
            <div className="-mx-4 sm:mx-0">
              <ChatbotSuccessStories />
            </div>
            <div className="-mx-4 sm:mx-0">
              <ChatbotFaq />
            </div>
          </>
        )}

        {solution.slug === 'agentic-ai' && (
          <>
            <div className="mt-4 -mx-4 sm:mx-0">
              <AgenticAiImpact />
            </div>
            <div className="-mx-4 sm:mx-0">
              <AgenticAiProcess />
            </div>
          </>
        )}

        {solution.slug === 'data-engineering' && (
          <>
            <div className="mt-4 -mx-4 sm:mx-0">
              <DataEngineeringBenefits />
            </div>
            <div className="-mx-4 sm:mx-0">
              <DataEngineeringWhy />
            </div>
            <div className="-mx-4 sm:mx-0">
              <DataEngineeringFaq />
            </div>
          </>
        )}

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-extrabold text-ink mb-5">More in {solution.group}</h2>
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
        <ServiceInquiryForm defaultService={solution.title} />
      </div>
      <CtaBanner />
    </div>
  );
}
