import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Reveal, { Stagger, StaggerItem } from './Reveal';
import DynamicIcon from './DynamicIcon';
import { useServices } from '../context/ServicesContext';

export default function ServicesShowcase() {

  const { services: allServices, loading } = useServices();
  const services = allServices.slice(0, 6);

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-sm font-medium text-gray-400 mb-3">Our services</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight leading-tight">
            {/* We optimize high-impact areas */}
            Custom Software Development
            <br className="hidden sm:block" />Company Services
            {/* of your digital product. */}
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-gray-600 text-base sm:text-sm leading-relaxed mb-3 mt-3 mx-auto lg:mx-0"
          >
            Our <strong>custom software development services</strong> give businesses the strategy, design, engineering, and technical support required to launch reliable digital products. Each solution is planned around your operational needs instead of forcing your business into a standard template

          </motion.p>
        </Reveal>

        {loading ? (
          <p className="text-center text-gray-500 py-10">Loading services...</p>
        ) : (
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7" staggerDelay={0.07}>
            {services.map((s) => (
              <StaggerItem key={s.slug || s.title}>
                <Link
                  to={`/${s.slug}`}
                  className="group relative bg-white rounded-3xl border border-gray-100 p-6 lg:p-7 shadow-card hover:shadow-elev hover:border-cyan-200 hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-sky-50 to-cyan-50 border border-cyan-100/90 text-[#00a4d8] flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-gradient-to-br group-hover:from-[#00a4d8] group-hover:to-[#0284c7] group-hover:text-white transition-all duration-300 shadow-sm">
                        <DynamicIcon icon={s.icon} title={s.title} className="w-5 h-5 object-contain" />
                      </span>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#00a4d8]">
                        {s.menuTitle || s.title}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-extrabold text-ink mb-2 group-hover:text-[#00a4d8] transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">
                      {s.desc}
                    </p>
                  </div>

                  <div>
                    {/* Real Service Image */}
                    <div className="relative mt-2 rounded-2xl overflow-hidden aspect-[16/10] shadow-sm group-hover:shadow-md transition-all duration-300">
                      {s.heroImage ? (
                        <img
                          src={s.heroImage}
                          alt={s.title}
                          className="w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out"
                          loading="lazy"
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${s.gradient || 'from-[#00a4d8] to-[#0369a1]'} flex items-center justify-center`}>
                          <DynamicIcon icon={s.icon} title={s.title} className="w-12 h-12 text-white/90" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#00a4d8] group-hover:text-[#0284c7] group-hover:gap-2 transition-all">
                        Learn more <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                      <span className="w-2 h-2 rounded-full bg-cyan-200 group-hover:bg-[#00a4d8] transition-colors" />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        )}


        <Reveal className="text-center mt-12">
          <p className="text-sm text-gray-400 mb-5">Build where it matters.</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-ink">
            {['100% Dedicated team', 'On-time delivery', 'Transparent process', 'Ongoing support'].map((t) => (
              <span key={t} className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
