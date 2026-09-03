import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Reveal from './Reveal';

function formatText(text) {
  if (!text) return null;
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function CtaBanner({
  eyebrow = 'Have a Project in Mind?',
  title = 'Ready to Build Your Product? Let’s Talk',
  desc = 'Choose us as your custom software development company and move from idea to launch with a clear plan, experienced specialists, and dependable technical support.',
  buttonText = 'Get a Free Consultation',
  buttonLink = '/contact',
}) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#00a4d8] via-[#0284c7] to-[#0369a1] px-8 py-12 sm:px-14 sm:py-14 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-[#00a4d8]/20">
          <div className="absolute -right-10 -top-10 w-56 h-56 rounded-full bg-white/10 animate-float" />
          <div
            className="absolute right-24 bottom-0 w-24 h-24 rounded-2xl bg-white/10 rotate-12 animate-float"
            style={{ animationDelay: '1s' }}
          />
          <div className="relative z-10 max-w-xl">
            {eyebrow && (
              <p className="text-xs font-bold tracking-widest uppercase text-cyan-100 mb-2">
                {eyebrow}
              </p>
            )}
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 leading-tight">
              {title}
            </h3>
            {desc && (
              <p className="text-cyan-50 text-sm sm:text-base leading-relaxed">
                {formatText(desc)}
              </p>
            )}
          </div>
          <Link
            to={buttonLink || '/contact'}
            className="relative z-10 shrink-0 inline-flex items-center gap-2 bg-white text-[#00a4d8] font-bold px-7 py-3.5 rounded-2xl hover:bg-cyan-50 hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            {buttonText || 'Get a Free Consultation'} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

