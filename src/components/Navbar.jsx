import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { solutionGroups, products, industries } from '../data/content';
import { useServices } from '../context/ServicesContext';

const serviceMenuGroups = [
  {
    title: 'Build & Apps',
    slugs: [
      'web-development',
      'mobile-app-development',
      'ios-development',
      'android-development',
    ],
  },
  {
    title: 'Engineering',
    slugs: [
      'laravel-development',
      'php-development',
      'api-development',
      'cms-development',
    ],
  },
  {
    title: 'Cloud & AI',
    slugs: [
      'cloud-solutions',
      'devops',
      'data-migration-services',
      'ai-development',
    ],
  },
  {
    title: 'Design & Growth',
    slugs: [
      'ui-ux-design',
      'graphic-design',
      'ecommerce-solutions',
      'digital-marketing',
    ],
  },
];

import logo from '../assets/logo.svg';

export default function Navbar() {
  const { services, resolveIcon } = useServices();
  const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s]));

  const dynamicMenuGroups = services.length > 0 ? (() => {
    const predefinedSlugs = new Set(serviceMenuGroups.flatMap(g => g.slugs));
    const uncategorizedServices = services.filter(s => s && s.slug && !predefinedSlugs.has(s.slug));

    const groups = serviceMenuGroups.map(group => ({
      ...group,
      servicesList: group.slugs.map(slug => serviceBySlug[slug]).filter(Boolean)
    }));

    uncategorizedServices.forEach((s, idx) => {
      const groupIdx = idx % groups.length;
      groups[groupIdx].servicesList.push(s);
    });

    return groups;
  })() : serviceMenuGroups.map(group => ({
    ...group,
    servicesList: group.slugs.map(slug => serviceBySlug[slug]).filter(Boolean)
  }));
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [activeIndustry, setActiveIndustry] = useState(industries[0]?.slug || 'education');
  const [mobileIndustries, setMobileIndustries] = useState(false);
  const [mobileProducts, setMobileProducts] = useState(false);
  const [mobileSolutions, setMobileSolutions] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const transparent = isHome && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
    setSolutionsOpen(false);
    setProductsOpen(false);
    setIndustriesOpen(false);
  }, [pathname]);

  const linkClass = ({ isActive }) =>
    `text-sm font-semibold transition-colors ${
      isActive
        ? 'text-primary-600'
        : transparent
          ? 'text-ink/70 hover:text-ink'
          : 'text-ink/80 hover:text-primary-600'
    }`;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        transparent
          ? 'bg-transparent border-transparent'
          : 'bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? 'h-16' : 'h-20'
          }`}
        >
          <NavLink to="/" className="flex items-center shrink-0">
            <img src={logo} alt="Cubixsol" className="h-8 sm:h-9 w-auto object-contain" />
          </NavLink>

          <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
            <NavLink to="/" className={linkClass} end>
              Home
            </NavLink>
            <NavLink to="/about" className={linkClass}>
              About Us
            </NavLink>

            {/* Services */}
            <div
              className="relative"
              onMouseEnter={() => {
                setServicesOpen(true);
                setSolutionsOpen(false);
                setProductsOpen(false);
                setIndustriesOpen(false);
              }}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <NavLink to="/services" className={linkClass}>
                <span className="flex items-center gap-1">
                  Services <ChevronDown className="w-3.5 h-3.5" />
                </span>
              </NavLink>
              {servicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[min(96vw,900px)]">
                  <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-4 sm:p-5">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
                      {dynamicMenuGroups.map((group) => (
                        <div key={group.title}>
                          <p className="text-[10px] font-bold tracking-widest uppercase text-primary-600 mb-2.5 pb-2 border-b border-primary-100">
                            {group.title}
                          </p>
                          <ul className="space-y-0.5">
                            {group.servicesList.map((s) => {
                              if (!s) return null;
                              const IconComponent = resolveIcon(s.icon);
                              return (
                                <li key={s.slug}>
                                  <NavLink
                                    to={`/${s.slug}`}
                                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-primary-50 transition group"
                                  >
                                    <span
                                      className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${s.color || 'text-primary-600 bg-primary-50'}`}
                                    >
                                      <IconComponent className="w-3.5 h-3.5" />
                                    </span>
                                    <span className="text-[12px] font-semibold text-ink group-hover:text-primary-700 leading-snug">
                                      {s.menuTitle || s.title}
                                    </span>

                                  </NavLink>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                      <NavLink
                        to="/services"
                        className="text-sm font-semibold text-primary-600 inline-flex items-center gap-1 hover:gap-2 transition-all"
                      >
                        View all services <ArrowRight className="w-4 h-4" />
                      </NavLink>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Solutions mega menu */}
            <div
              className="relative"
              onMouseEnter={() => {
                setSolutionsOpen(true);
                setServicesOpen(false);
                setProductsOpen(false);
                setIndustriesOpen(false);
              }}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <NavLink to="/solutions" className={linkClass}>
                <span className="flex items-center gap-1">
                  Solutions <ChevronDown className="w-3.5 h-3.5" />
                </span>
              </NavLink>
              {solutionsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[min(96vw,920px)]">
                  <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-5 sm:p-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
                      {solutionGroups.map((group) => (
                        <div key={group.title}>
                          <p className="text-xs font-bold tracking-widest uppercase text-primary-600 mb-3 pb-2 border-b border-primary-100">
                            {group.title}
                          </p>
                          <ul className="space-y-1">
                            {group.items.map((item) => (
                              <li key={item.slug}>
                                {item.externalUrl ? (
                                  /^https?:\/\//i.test(item.externalUrl) ? (
                                    <a
                                      href={item.externalUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="block text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg px-2 py-1.5 transition"
                                    >
                                      {item.title}
                                    </a>
                                  ) : (
                                    <NavLink
                                      to={item.externalUrl}
                                      className="block text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg px-2 py-1.5 transition"
                                    >
                                      {item.title}
                                    </NavLink>
                                  )
                                ) : (
                                  <NavLink
                                    to={`/solutions/${item.slug}`}
                                    className="block text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg px-2 py-1.5 transition"
                                  >
                                    {item.title}
                                  </NavLink>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 pt-4 border-t border-gray-100 flex justify-end">
                      <NavLink
                        to="/solutions"
                        className="text-sm font-semibold text-primary-600 inline-flex items-center gap-1 hover:gap-2 transition-all"
                      >
                        View all solutions <ArrowRight className="w-4 h-4" />
                      </NavLink>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Industries mega menu */}
            <div
              className="relative"
              onMouseEnter={() => {
                setIndustriesOpen(true);
                setServicesOpen(false);
                setSolutionsOpen(false);
                setProductsOpen(false);
              }}
              onMouseLeave={() => setIndustriesOpen(false)}
            >
              <NavLink to="/industries" className={linkClass}>
                <span className="flex items-center gap-1">
                  Industries <ChevronDown className="w-3.5 h-3.5" />
                </span>
              </NavLink>
              {industriesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[min(96vw,860px)]">
                  <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden grid md:grid-cols-[220px_1fr]">
                    <div className="bg-gray-50/90 border-r border-gray-100 p-3">
                      <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 px-2 mb-2">
                        Industries
                      </p>
                      <ul className="space-y-0.5">
                        {industries.map((ind) => (
                          <li key={ind.slug}>
                            <button
                              type="button"
                              onMouseEnter={() => setActiveIndustry(ind.slug)}
                              onClick={() => setActiveIndustry(ind.slug)}
                              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition flex items-center justify-between ${
                                activeIndustry === ind.slug
                                  ? 'bg-white text-primary-700 shadow-sm'
                                  : 'text-ink/80 hover:bg-white/80'
                              }`}
                            >
                              {ind.title}
                              <ChevronDown className="w-3.5 h-3.5 -rotate-90 opacity-40" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-5 sm:p-6">
                      {(() => {
                        const ind = industries.find((i) => i.slug === activeIndustry) || industries[0];
                        if (!ind) return null;
                        return (
                          <div>
                            <p className="text-sm text-gray-600 leading-relaxed mb-4">{ind.desc}</p>
                            <ul className="grid sm:grid-cols-2 gap-2 mb-5">
                              {ind.points.map((pt) => (
                                <li key={pt} className="text-xs font-medium text-ink flex gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 shrink-0" />
                                  {pt}
                                </li>
                              ))}
                            </ul>
                            <div className="rounded-xl bg-primary-50/60 border border-primary-100 p-4 mb-5">
                              <p className="text-sm text-ink/80 leading-relaxed italic mb-2">
                                &ldquo;{ind.testimonial.quote}&rdquo;
                              </p>
                              <p className="text-xs font-bold text-ink">{ind.testimonial.name}</p>
                              <p className="text-[11px] text-gray-500">{ind.testimonial.role}</p>
                            </div>
                            <NavLink
                              to={`/industries/${ind.slug}`}
                              className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-600 hover:gap-2 transition-all"
                            >
                              Discover More <ArrowRight className="w-4 h-4" />
                            </NavLink>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Our Products mega menu */}
            <div
              className="relative"
              onMouseEnter={() => {
                setProductsOpen(true);
                setServicesOpen(false);
                setSolutionsOpen(false);
                setIndustriesOpen(false);
              }}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <NavLink to="/products" className={linkClass}>
                <span className="flex items-center gap-1">
                  Our Products <ChevronDown className="w-3.5 h-3.5" />
                </span>
              </NavLink>
              {productsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[min(96vw,920px)]">
                  <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-4 sm:p-5">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                      {products.slice(0, 7).map((p) => (
                        <NavLink
                          key={p.slug}
                          to={`/products/${p.slug}`}
                          className="group flex flex-col rounded-xl border border-gray-100 overflow-hidden hover:border-primary-200 hover:shadow-card transition bg-white"
                        >
                          <div className={`aspect-[16/10] bg-gradient-to-br ${p.accent} overflow-hidden`}>
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                              loading="lazy"
                              width={400}
                              height={250}
                            />
                          </div>
                          <div className="p-2.5 sm:p-3 flex-1 flex flex-col">
                            <span className="text-[10px] font-bold uppercase tracking-wide text-primary-600 mb-0.5">
                              {p.name}
                            </span>
                            <span className="text-[12px] font-bold text-ink leading-snug line-clamp-2 mb-1">
                              {p.title}
                            </span>
                            <span className="text-[11px] text-gray-500 leading-snug line-clamp-2 mb-2 flex-1">
                              {p.desc}
                            </span>
                            <span className="text-[11px] font-semibold text-primary-600">
                              Discover More →
                            </span>
                          </div>
                        </NavLink>
                      ))}
                      <NavLink
                        to="/products"
                        className="flex items-center justify-center rounded-xl border-2 border-dashed border-primary-200 bg-primary-50/40 hover:bg-primary-50 text-primary-700 font-semibold text-sm min-h-[140px] transition"
                      >
                        View All Products →
                      </NavLink>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <NavLink to="/projects" className={linkClass}>
              Projects
            </NavLink>
            <NavLink to="/blog" className={linkClass}>
              Blog
            </NavLink>
          </nav>

          <div className="hidden lg:block">
            <NavLink
              to="/contact"
              className={
                transparent
                  ? 'inline-flex items-center gap-2 bg-white text-primary-700 font-semibold px-5 py-2.5 rounded-lg hover:bg-primary-50 transition shadow-sm'
                  : 'btn-primary'
              }
            >
              Contact Us <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>

          <button
            className="lg:hidden p-2 text-ink"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden border-t border-gray-100 bg-white overflow-hidden max-h-[calc(100svh-4rem)] overflow-y-auto"
          >
            <nav className="flex flex-col px-4 py-4 gap-0.5">
              <NavLink
                to="/"
                end
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-3 rounded-lg text-sm font-semibold ${
                    isActive ? 'bg-primary-50 text-primary-600' : 'text-ink/80'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/about"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-3 rounded-lg text-sm font-semibold ${
                    isActive ? 'bg-primary-50 text-primary-600' : 'text-ink/80'
                  }`
                }
              >
                About Us
              </NavLink>

              {/* Mobile Services accordion */}
              <button
                type="button"
                onClick={() => setMobileServices((v) => !v)}
                className="flex items-center justify-between px-3 py-3 rounded-lg text-sm font-semibold text-ink/80 w-full text-left"
              >
                Services
                <ChevronDown
                  className={`w-4 h-4 transition ${mobileServices ? 'rotate-180' : ''}`}
                />
              </button>
              {mobileServices && (
                <div className="pl-3 pb-2 space-y-0.5">
                  <NavLink
                    to="/services"
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2 text-sm text-primary-600 font-semibold"
                  >
                    All services
                  </NavLink>
                  {services.map((s) => (
                    <NavLink
                      key={s.slug}
                      to={`/${s.slug}`}
                      onClick={() => setOpen(false)}
                      className="block px-3 py-2 text-sm text-gray-600"
                    >
                      {s.menuTitle || s.title}
                    </NavLink>
                  ))}

                </div>
              )}

              {/* Mobile Solutions accordion */}
              <button
                type="button"
                onClick={() => setMobileSolutions((v) => !v)}
                className="flex items-center justify-between px-3 py-3 rounded-lg text-sm font-semibold text-ink/80 w-full text-left"
              >
                Solutions
                <ChevronDown
                  className={`w-4 h-4 transition ${mobileSolutions ? 'rotate-180' : ''}`}
                />
              </button>
              {mobileSolutions && (
                <div className="pl-3 pb-2 space-y-3">
                  <NavLink
                    to="/solutions"
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2 text-sm text-primary-600 font-semibold"
                  >
                    All solutions
                  </NavLink>
                  {solutionGroups.map((group) => (
                    <div key={group.title}>
                      <p className="px-3 text-[10px] font-bold tracking-widest uppercase text-primary-500 mb-1">
                        {group.title}
                      </p>
                      {group.items.map((item) =>
                        item.externalUrl ? (
                          /^https?:\/\//i.test(item.externalUrl) ? (
                            <a
                              key={item.slug}
                              href={item.externalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setOpen(false)}
                              className="block px-3 py-1.5 text-sm text-gray-600"
                            >
                              {item.title}
                            </a>
                          ) : (
                            <NavLink
                              key={item.slug}
                              to={item.externalUrl}
                              onClick={() => setOpen(false)}
                              className="block px-3 py-1.5 text-sm text-gray-600"
                            >
                              {item.title}
                            </NavLink>
                          )
                        ) : (
                          <NavLink
                            key={item.slug}
                            to={`/solutions/${item.slug}`}
                            onClick={() => setOpen(false)}
                            className="block px-3 py-1.5 text-sm text-gray-600"
                          >
                            {item.title}
                          </NavLink>
                        )
                      )}
                    </div>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={() => setMobileIndustries((v) => !v)}
                className="flex items-center justify-between px-3 py-3 rounded-lg text-sm font-semibold text-ink/80 w-full text-left"
              >
                Industries
                <ChevronDown
                  className={`w-4 h-4 transition ${mobileIndustries ? 'rotate-180' : ''}`}
                />
              </button>
              {mobileIndustries && (
                <div className="pl-3 pb-2 space-y-0.5">
                  <NavLink to="/industries" onClick={() => setOpen(false)} className="block px-3 py-2 text-sm text-primary-600 font-semibold">
                    All industries
                  </NavLink>
                  {industries.map((ind) => (
                    <NavLink
                      key={ind.slug}
                      to={`/industries/${ind.slug}`}
                      onClick={() => setOpen(false)}
                      className="block px-3 py-2 text-sm text-gray-600"
                    >
                      {ind.title}
                    </NavLink>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={() => setMobileProducts((v) => !v)}
                className="flex items-center justify-between px-3 py-3 rounded-lg text-sm font-semibold text-ink/80 w-full text-left"
              >
                Our Products
                <ChevronDown
                  className={`w-4 h-4 transition ${mobileProducts ? 'rotate-180' : ''}`}
                />
              </button>
              {mobileProducts && (
                <div className="pl-3 pb-2 space-y-0.5">
                  <NavLink
                    to="/products"
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2 text-sm text-primary-600 font-semibold"
                  >
                    All products
                  </NavLink>
                  {products.map((p) => (
                    <NavLink
                      key={p.slug}
                      to={`/products/${p.slug}`}
                      onClick={() => setOpen(false)}
                      className="block px-3 py-2 text-sm text-gray-600"
                    >
                      {p.name}
                    </NavLink>
                  ))}
                </div>
              )}

              {[
                ['Projects', '/projects'],
                ['Blog', '/blog'],
              ].map(([label, to]) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-3 rounded-lg text-sm font-semibold ${
                      isActive ? 'bg-primary-50 text-primary-600' : 'text-ink/80'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}

              <NavLink
                to="/contact"
                onClick={() => setOpen(false)}
                className="btn-primary justify-center mt-2"
              >
                Get a Free Consultation <ArrowRight className="w-4 h-4" />
              </NavLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
