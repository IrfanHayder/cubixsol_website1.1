import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from './Reveal';

export default function CtaBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-primary-gradient animate-gradient px-8 py-12 sm:px-14 sm:py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="absolute -right-10 -top-10 w-56 h-56 rounded-full bg-white/10 animate-float" />
          <div className="absolute right-24 bottom-0 w-24 h-24 rounded-2xl bg-white/10 rotate-12 animate-float" style={{ animationDelay: '1s' }} />
          <div className="relative z-10 max-w-xl">
            <p className="text-xs font-bold tracking-widest uppercase text-primary-200 mb-2">Have a Project in Mind?</p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">Ready to Build Your Product? Let’s Talk</h3>
            <p className="text-primary-100 text-sm sm:text-base">Choose us as your <strong>custom software development company</strong> and move from idea to launch with a clear plan, experienced specialists, and dependable technical support.</p>
          </div>
          <Link to="/contact" className="relative z-10 shrink-0 inline-flex items-center gap-2 bg-white text-primary-700 font-semibold px-6 py-3 rounded-lg hover:bg-primary-50 hover:scale-105 transition-all">
            Get a Free Consultation <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
