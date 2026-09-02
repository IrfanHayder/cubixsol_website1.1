import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Reveal, { Stagger, StaggerItem } from './Reveal';
import { useServices } from '../context/ServicesContext';

/* Floating mini UI mock for each service type */
function ServiceVisual({ title }) {
  const base = 'absolute rounded-xl border border-gray-100 bg-white shadow-elev';

  if (title.includes('Web') || title.includes('Laravel')) {
    return (
      <div className="relative h-36 mt-4">
        <div className={`${base} left-2 top-2 w-[70%] p-2.5 rotate-[-3deg] z-10`}>
          <div className="h-1.5 w-12 bg-primary-200 rounded mb-2" />
          <div className="space-y-1.5">
            <div className="h-1.5 bg-gray-100 rounded w-full" />
            <div className="h-1.5 bg-gray-100 rounded w-4/5" />
            <div className="h-8 bg-primary-50 rounded-md mt-2" />
          </div>
        </div>
        <div className={`${base} right-1 bottom-0 w-[55%] p-2 rotate-[4deg]`}>
          <div className="flex gap-1 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-red-300" />
            <span className="w-2 h-2 rounded-full bg-amber-300" />
            <span className="w-2 h-2 rounded-full bg-emerald-300" />
          </div>
          <div className="h-10 bg-gradient-to-br from-primary-100 to-primary-50 rounded" />
        </div>
      </div>
    );
  }

  if (title.includes('Mobile')) {
    return (
      <div className="relative h-36 mt-4 flex justify-center">
        <div className="w-20 h-32 rounded-2xl border-[3px] border-ink bg-white shadow-elev p-1.5">
          <div className="h-full rounded-xl bg-gradient-to-b from-primary-50 to-white p-2 space-y-1.5">
            <div className="w-8 h-1 bg-gray-200 rounded mx-auto mb-2" />
            <div className="h-2 bg-primary-200 rounded w-3/4" />
            <div className="h-2 bg-gray-100 rounded w-full" />
            <div className="h-8 bg-primary-100 rounded-lg mt-2" />
            <div className="grid grid-cols-2 gap-1 mt-1">
              <div className="h-5 bg-gray-50 rounded" />
              <div className="h-5 bg-gray-50 rounded" />
            </div>
          </div>
        </div>
        <div className={`${base} -right-1 top-4 w-16 p-1.5 rotate-[8deg] text-[8px] font-semibold text-ink`}>
          App Store
        </div>
      </div>
    );
  }

  if (title.includes('AI')) {
    return (
      <div className="relative h-36 mt-4">
        <div className={`${base} inset-x-3 top-2 p-3`}>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-6 rounded-lg bg-primary-100" />
            <div className="h-2 bg-gray-100 rounded w-20" />
          </div>
          {[72, 88, 55].map((pct, i) => (
            <div key={i} className="mb-2">
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary-gradient rounded-full" style={{ width: `${pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (title.includes('E-Commerce') || title.includes('Marketing')) {
    return (
      <div className="relative h-36 mt-4">
        <div className={`${base} left-1 top-1 w-[48%] p-2 rotate-[-4deg] z-10`}>
          <div className="aspect-square bg-gradient-to-br from-amber-50 to-orange-100 rounded-lg mb-1.5" />
          <div className="h-1.5 bg-gray-100 rounded w-full" />
          <div className="h-1.5 bg-primary-200 rounded w-1/2 mt-1" />
        </div>
        <div className={`${base} right-1 bottom-1 w-[52%] p-2 rotate-[3deg]`}>
          <div className="h-12 bg-primary-50 rounded-lg mb-1.5 flex items-center justify-center">
            <span className="text-[9px] font-bold text-primary-600">ADD TO CART</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded w-3/4" />
        </div>
      </div>
    );
  }

  if (title.includes('Cloud')) {
    return (
      <div className="relative h-36 mt-4 flex items-center justify-center">
        <div className={`${base} w-[80%] p-3`}>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="h-8 rounded-lg bg-primary-50 border border-primary-100" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // UI/UX default
  return (
    <div className="relative h-36 mt-4">
      <div className={`${base} left-2 top-2 w-[60%] p-2 rotate-[-2deg] z-10`}>
        <div className="flex gap-1 mb-2">
          <div className="w-6 h-6 rounded-full bg-primary-100" />
          <div className="flex-1 space-y-1 pt-1">
            <div className="h-1.5 bg-gray-100 rounded w-full" />
            <div className="h-1.5 bg-gray-100 rounded w-2/3" />
          </div>
        </div>
        <div className="h-10 bg-gradient-to-r from-primary-50 to-pink-50 rounded-lg" />
      </div>
      <div className={`${base} right-2 bottom-0 w-[45%] p-2 rotate-[5deg]`}>
        <div className="grid grid-cols-2 gap-1">
          <div className="aspect-square bg-primary-50 rounded" />
          <div className="aspect-square bg-gray-50 rounded" />
        </div>
      </div>
    </div>
  );
}

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
              <StaggerItem key={s.title}>
                <div className="group relative bg-white rounded-3xl border border-gray-100 p-6 lg:p-7 shadow-card hover:shadow-elev hover:-translate-y-1 transition-all duration-400 h-full flex flex-col overflow-hidden">
                  <h3 className="text-lg font-bold text-ink mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-2 flex-1">{s.desc}</p>
                  <ServiceVisual title={s.title} />
                  <Link
                    to={`/${s.slug}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
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
