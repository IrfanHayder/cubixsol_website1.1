import { Link } from 'react-router-dom';
import { Play, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';

export default function VideoCta() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-ink/75" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <Reveal>
          <button
            type="button"
            aria-label="Play showreel"
            className="mx-auto mb-8 w-16 h-16 rounded-full bg-white/15 backdrop-blur border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-primary-600 transition-all duration-300 group"
          >
            <Play className="w-6 h-6 fill-current ml-0.5 group-hover:scale-110 transition" />
          </button>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Relax — we will make it work
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Stressed about an idea, a deadline, or a complex product? Our team turns pressure into
            clear plans and shipped software.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/about"
              className="inline-flex items-center gap-2 bg-white text-ink font-semibold px-6 py-3 rounded-lg hover:bg-primary-50 transition"
            >
              Meet the team <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-white/40 text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition"
            >
              Start a project
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
