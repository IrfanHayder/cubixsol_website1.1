import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { whyChoose, clients } from '../data/content';
import CtaBanner from '../components/CtaBanner';
import Marquee from '../components/Marquee';
import StatsCounter from '../components/StatsCounter';
import Testimonials from '../components/Testimonials';
import ProjectEstimator from '../components/ProjectEstimator';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';
import HeroSlider from '../components/HeroSlider';
import ProjectSlider from '../components/ProjectSlider';
import ProcessSlider from '../components/ProcessSlider';
import ServicesShowcase from '../components/ServicesShowcase';
import EngagementModels from '../components/EngagementModels';
import Industries from '../components/Industries';
import TechStack from '../components/TechStack';
import FaqSection from '../components/FaqSection';
import JourneyPath from '../components/JourneyPath';
import AgencyStatement from '../components/AgencyStatement';
import SplitIntro from '../components/SplitIntro';
import VideoCta from '../components/VideoCta';
import FeatureSplit from '../components/FeatureSplit';

export default function Home() {
  return (
    <div>
      {/* 1. Full-bleed hero — Softic style */}
      <HeroSlider />

      {/* 2. Client logos */}
      <section className="bg-white py-12 border-b border-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold tracking-widest text-gray-400 uppercase mb-6">
            Trusted by 200+ Businesses Worldwide
          </p>
          <Marquee items={clients} speed={26} />
        </div>
      </section>

      {/* 3. Services productivity intro + open hours (Softic split) */}
      <SplitIntro />

      {/* 4. Large typographic statement */}
      <AgencyStatement />

      {/* 5. Services cards grid */}
      <ServicesShowcase />

      {/* 6. Video / team CTA band */}
      <VideoCta />

      {/* 7. Feature split — mobile/product focus */}
      <FeatureSplit />

      {/* 8. Big animated stats */}
      <StatsCounter />

      {/* 9. Projects / portfolio */}
      <ProjectSlider />

      {/* 10. Tech stack logos */}
      <TechStack />

      {/* 11. Industries */}
      <Industries />

      {/* 12. Journey path */}
      <JourneyPath />

      {/* 13. Process steps */}
      <ProcessSlider />

      {/* 14. Engagement models */}
      <EngagementModels />

      {/* 15. Why choose */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal direction="right">
            <p className="eyebrow mb-3">Why Choose Cubixsol?</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink mb-4 tracking-tight">
              We Deliver More Than Just Solutions
            </h2>
            <p className="text-gray-500 mb-6 text-lg">
              We are committed to quality, transparency, and long-term partnerships.
            </p>
            <Link to="/about" className="btn-primary">
              Let's Work Together <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
          <Stagger className="grid sm:grid-cols-2 gap-5" staggerDelay={0.1}>
            {whyChoose.map((w) => (
              <StaggerItem key={w.title} direction="left">
                <div className="bg-primary-50/70 rounded-2xl p-5 hover:bg-primary-50 hover:-translate-y-1 transition-all duration-300 border border-primary-100/50">
                  <span className="w-10 h-10 rounded-lg bg-white text-primary-600 flex items-center justify-center mb-3 shadow-sm">
                    <w.icon className="w-5 h-5" />
                  </span>
                  <h3 className="font-bold text-sm text-ink mb-1">{w.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{w.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* 16. Testimonials */}
      <Testimonials />

      {/* 17. FAQ */}
      <FaqSection />

      {/* 18. Estimator + CTA */}
      <ProjectEstimator />
      <CtaBanner />
    </div>
  );
}
