import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';
import { solutionGroups, industries } from '../data/content';
import { useServices } from '../context/ServicesContext';

const serviceMenuGroups = [
  {
    title: 'Build & Apps',
    slugs: [
      'web-development',
      'mobile-app-development',
      'shopify-development',
      'ios-app-development',
      'ios-development',
      'ios',
      'android-app-development',
      'android-development',
      'android',
    ],
  },
  {
    title: 'Automate',
    slugs: [
      'ghl-automation',
      'hubspot-crm',
      'ai-workflows',
      'ai-chatbots',
      'email-lead-nurture',
      'email-and-lead-nurture',
    ],
  },
  {
    title: 'Engineering',
    slugs: [
      'laravel-development',
      'php-development',
      'cms-development',
      'pms-integration',
      'api-development-and-integration',
      'api-development',
      'api',
    ],
  },
  {
    title: 'Cloud & AI',
    slugs: [
      'cloud-solutions',
      'cloud',
      'devops',
      'data-migration-services',
      'data-migration',
      'ai-development',
    ],
  },
  {
    title: 'Design & Growth',
    slugs: [
      'graphic-designing',
      'graphic-design',
      'ecommerce-solutions',
      'ecommerce-development',
      'ecommerce',
      'digital-marketing',
      'ui-ux-designing',
      'ui-ux-design',
      'ui-ux',
      'uiux',
    ],
  },
];

import logo from '../assets/logo.svg';

export default function Navbar() {
  const { services, resolveIcon } = useServices();

  const serviceBySlug = {};
  services.forEach((s) => {
    if (s && s.slug) {
      serviceBySlug[s.slug] = s;
      if (s.slug === 'ghl-automation') {
        serviceBySlug['ghl-automation'] = s;
      }
      if (s.slug === 'hubspot-crm') {
        serviceBySlug['hubspot-crm'] = s;
      }
      if (s.slug === 'ai-workflows') {
        serviceBySlug['ai-workflows'] = s;
      }
      if (s.slug === 'ai-chatbots') {
        serviceBySlug['ai-chatbots'] = s;
      }
      if (s.slug === 'email-lead-nurture' || s.slug === 'email-and-lead-nurture') {
        serviceBySlug['email-lead-nurture'] = s;
        serviceBySlug['email-and-lead-nurture'] = s;
      }
      if (s.slug === 'graphic-designing' || s.slug === 'graphic-design') {
        serviceBySlug['graphic-design'] = s;
        serviceBySlug['graphic-designing'] = s;
      }
      if (s.slug === 'ecommerce-solutions' || s.slug === 'ecommerce') {
        serviceBySlug['ecommerce'] = s;
        serviceBySlug['ecommerce-development'] = s;
        serviceBySlug['ecommerce-solutions'] = s;
      }
      if (s.slug === 'data-migration-services' || s.slug === 'data-migration') {
        serviceBySlug['data-migration'] = s;
        serviceBySlug['data-migration-services'] = s;
      }
      if (s.slug === 'android-app-development' || s.slug === 'android-development' || s.slug === 'android') {
        serviceBySlug['android'] = s;
        serviceBySlug['android-app-development'] = s;
        serviceBySlug['android-development'] = s;
      }
      if (s.slug === 'ios-app-development' || s.slug === 'ios-development' || s.slug === 'ios') {
        serviceBySlug['ios'] = s;
        serviceBySlug['ios-app-development'] = s;
        serviceBySlug['ios-development'] = s;
      }
      if (s.slug === 'api-development-and-integration' || s.slug === 'api-development' || s.slug === 'api') {
        serviceBySlug['api'] = s;
        serviceBySlug['api-development'] = s;
        serviceBySlug['api-development-and-integration'] = s;
      }
      if (s.slug === 'ui-ux-designing' || s.slug === 'ui-ux' || s.slug === 'ui-ux-design' || s.slug === 'uiux') {
        serviceBySlug['ui-ux'] = s;
        serviceBySlug['ui-ux-design'] = s;
        serviceBySlug['ui-ux-designing'] = s;
        serviceBySlug['uiux'] = s;
      }
    }
  });

  const dynamicMenuGroups = services.length > 0 ? (() => {
    const matchedSlugs = new Set();
    const groups = serviceMenuGroups.map(group => {
      const list = [];
      group.slugs.forEach(slug => {
        const found = serviceBySlug[slug];
        if (found && !matchedSlugs.has(found.slug)) {
          matchedSlugs.add(found.slug);
          list.push(found);
        }
      });
      return {
        ...group,
        servicesList: list
      };
    });

    const uncategorized = services.filter(s => s && s.slug && !matchedSlugs.has(s.slug));
    uncategorized.forEach((s) => {
      const slug = (s.slug || '').toLowerCase();
      const title = (s.title || '').toLowerCase();
      if (slug.includes('ghl') || slug.includes('hubspot') || slug.includes('workflow') || slug.includes('chatbot') || slug.includes('nurture') || slug.includes('automate') || title.includes('automate') || title.includes('ghl') || title.includes('hubspot') || title.includes('crm') || title.includes('nurture')) {
        const targetGroup = groups.find(g => g.title.toLowerCase().includes('automate')) || groups[1];
        targetGroup.servicesList.push(s);
      } else if (slug.includes('android') || slug.includes('ios') || slug.includes('mobile') || slug.includes('web') || slug.includes('shopify') || title.includes('android') || title.includes('ios') || title.includes('mobile') || title.includes('shopify')) {
        const targetGroup = groups.find(g => g.title.includes('Build')) || groups[0];
        targetGroup.servicesList.push(s);
      } else if (slug.includes('ui-ux') || slug.includes('uiux') || slug.includes('graphic') || slug.includes('ecommerce') || slug.includes('marketing') || title.includes('ui/ux') || title.includes('graphic') || title.includes('marketing')) {
        const targetGroup = groups.find(g => g.title.includes('Design')) || groups[groups.length - 1];
        targetGroup.servicesList.push(s);
      } else if (slug.includes('cloud') || slug.includes('devops') || slug.includes('data-migration') || slug.includes('ai-') || title.includes('cloud') || title.includes('devops') || title.includes('ai ')) {
        const targetGroup = groups.find(g => g.title.includes('Cloud')) || groups[3];
        targetGroup.servicesList.push(s);
      } else {
        const targetGroup = groups.find(g => g.title.includes('Engineering')) || groups[2];
        targetGroup.servicesList.push(s);
      }
    });

    return groups;
  })() : serviceMenuGroups.map(group => ({
    ...group,
    servicesList: group.slugs.map(slug => serviceBySlug[slug]).filter(Boolean)
  }));

  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [navIndustries, setNavIndustries] = useState(() => {
    try {
      const cached = localStorage.getItem('cubixsol_industries_list_cache');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (_) {}
    return industries;
  });
  const [activeIndustry, setActiveIndustry] = useState(industries[0]?.slug || 'education');
  const [mobileIndustries, setMobileIndustries] = useState(false);
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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
              onMouseEnter={() => {
                setServicesOpen(true);
                setSolutionsOpen(false);
                setIndustriesOpen(false);
              }}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <NavLink to="/all-services" className={linkClass}>
                <span className="flex items-center gap-1">
                  Services <ChevronDown className="w-3.5 h-3.5" />
                </span>
              </NavLink>
              {servicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[min(96vw,1200px)]">
                  <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-5 sm:p-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
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
                                      <IconComponent className="w-4.5 h-4.5 object-contain" />
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
                        to="/all-services"
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
                        {(navIndustries || industries).map((ind) => (
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
                        const allList = (navIndustries && navIndustries.length > 0) ? navIndustries : industries;
                        const ind = allList.find((i) => i.slug === activeIndustry) || allList[0] || industries[0];
                        if (!ind) return null;
                        const points = Array.isArray(ind.points) && ind.points.length > 0
                          ? ind.points
                          : (Array.isArray(ind.trustPills) && ind.trustPills.length > 0 ? ind.trustPills : []);
                        return (
                          <div>
                            <p className="text-sm font-bold text-ink mb-1">{ind.title}</p>
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">{ind.desc || ind.short || ''}</p>
                            {points.length > 0 && (
                              <ul className="grid sm:grid-cols-2 gap-2 mb-4">
                                {points.slice(0, 4).map((pt) => (
                                  <li key={pt} className="text-xs font-medium text-ink flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1.5 shrink-0" />
                                    <span className="line-clamp-1">{pt}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                            {ind.testimonial && ind.testimonial.quote && (
                              <div className="rounded-xl bg-primary-50/60 border border-primary-100 p-3.5 mb-4">
                                <p className="text-xs text-ink/80 leading-relaxed italic mb-1">
                                  &ldquo;{ind.testimonial.quote}&rdquo;
                                </p>
                                {ind.testimonial.name && <p className="text-[11px] font-bold text-ink">{ind.testimonial.name}</p>}
                                {ind.testimonial.role && <p className="text-[10px] text-gray-500">{ind.testimonial.role}</p>}
                              </div>
                            )}
                            <NavLink
                              to={`/industries/${ind.slug}`}
                              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary-600 hover:gap-2 transition-all"
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

            <NavLink to="/products" className={linkClass}>
              Our Products
            </NavLink>

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
                    to="/all-services"
                    onClick={() => setOpen(false)}
                    className="block px-3 py-2 text-sm text-primary-600 font-semibold"
                  >
                    All services
                  </NavLink>
                  {services.map((s) => {
                    const IconComponent = resolveIcon(s.icon);
                    return (
                      <NavLink
                        key={s.slug}
                        to={`/${s.slug}`}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50/50 rounded-lg transition"
                      >
                        <span className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${s.color || 'text-primary-600 bg-primary-50'}`}>
                          <IconComponent className="w-3.5 h-3.5 object-contain" />
                        </span>
                        <span>{s.menuTitle || s.title}</span>
                      </NavLink>
                    );
                  })}

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
                  {(navIndustries || industries).map((ind) => (
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

              <NavLink
                to="/products"
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-3 rounded-lg text-sm font-semibold ${
                    isActive ? 'bg-primary-50 text-primary-600' : 'text-ink/80'
                  }`
                }
              >
                Our Products
              </NavLink>

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
