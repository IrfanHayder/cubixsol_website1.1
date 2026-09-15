import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart, Zap, TrendingUp, Sparkles, CheckCircle2,
  PackageCheck, ArrowRight, Smartphone, RefreshCw, BarChart3,
  CreditCard, Flame, Layers, Box, ShieldCheck, Shield, Server,
  Lock, Cpu, Users, Building2, Store, DollarSign
} from 'lucide-react';
import Reveal, { Stagger, StaggerItem } from '../Reveal';
import { formatInline } from '../../utils/formatText';

export default function EcommerceLayout({ industry }) {
  const [activeTab, setActiveTab] = useState(0);

  const commercePillars = [
    {
      id: 0,
      title: 'Headless Storefronts & Edge Speed',
      desc: 'Sub-second page transitions, dynamic SSR/ISR, and global edge caching built with Next.js, Remix, and Shopify Hydrogen.',
      stat: '0.4s',
      statLabel: 'Global TTFB Latency',
      features: ['Core Web Vitals 95+ score', 'Instant instant search & facet filters', 'Offline-first Progressive Web App (PWA)'],
    },
    {
      id: 1,
      title: 'AI Product Recommendations & Search',
      desc: 'Predictive upsells, automated bundle matching, and hyper-personalized search ranking that dramatically lift Average Order Value (AOV).',
      stat: '+34%',
      statLabel: 'Higher AOV Boost',
      features: ['Real-time user intent parsing', 'Dynamic cross-sell cart drawers', 'Visual search & similarity algorithms'],
    },
    {
      id: 2,
      title: '1-Click Frictionless Checkout',
      desc: 'Stripe, Apple Pay, Google Pay, PayPal, and BNPL (Klarna/Afterpay) integrations with address auto-complete and zero cart dropoff.',
      stat: '+42%',
      statLabel: 'Mobile Conversion Rate',
      features: ['Address auto-verification API', '1-click biometric payment', 'Dynamic currency & tax geo-calculation'],
    },
    {
      id: 3,
      title: 'Omnichannel OMS & Inventory Sync',
      desc: 'Unified inventory across physical stores, Amazon, TikTok Shop, and multiple 3PL warehouses with automated replenishment alerts.',
      stat: '100%',
      statLabel: 'Real-time Stock Accuracy',
      features: ['Multi-warehouse routing algorithms', 'ERP sync (NetSuite, SAP, Katana)', 'Automated return & refund workflows'],
    },
  ];

  // 1. Software We Build
  const softwareTitle = industry.solutionsTitle || 'E-Commerce Software We Build';
  const softwareSubtitle = industry.solutionsSubtitle || '';
  const softwareItems = Array.isArray(industry.solutionsItems) && industry.solutionsItems.length > 0
    ? industry.solutionsItems
    : [
        {
          title: 'Custom E-Commerce Stores',
          body: 'We create custom e-commerce stores for businesses that need functionality beyond standard templates. Our solutions can support custom product catalogues, customer accounts, promotions, inventory workflows, third-party integrations, and unique purchasing journeys. Each store can align with your brand and operational requirements.',
        },
        {
          title: 'Shopify Development Services',
          body: 'Our Shopify development services launch, customise, and expand Shopify stores without sacrificing user experience or performance. We can customise storefronts, integrate essential apps, improve product pages, and create features that support specific business requirements. Shopify also provides a practical foundation for brands that want a flexible platform without managing the entire infrastructure themselves.',
        },
        {
          title: 'B2B E-Commerce Development',
          body: 'B2B ecommerce development services focus on the complex purchasing requirements of wholesalers, manufacturers, distributors, and enterprise sellers. Our experts can build features such as account-based pricing, bulk orders, customer-specific catalogues, approval workflows, recurring purchases, and business account management. The result is a commerce experience that simplifies purchasing for professional buyers.',
        },
        {
          title: 'E-Commerce App Development',
          body: 'E-commerce app development services extend your store experience to mobile customers. We can develop mobile commerce applications with product discovery, personalised accounts, secure payments, order tracking, push notifications, and other features that support repeat purchases. A well-structured app can give customers a convenient channel for browsing and purchasing products.',
        },
      ];

  // 2. Tech We Use
  const techTitle = industry.techTitle || 'Tech We Use';
  const techItems = Array.isArray(industry.techItems) && industry.techItems.length > 0
    ? industry.techItems
    : [
        {
          title: 'Shopify',
          desc: 'Shopify supports fast, flexible store development. We customise themes, storefronts, apps, and integrations to create branded shopping experiences with reliable product management, payments, and third-party functionality.',
        },
        {
          title: 'WooCommerce',
          desc: 'WooCommerce offers flexible store development through WordPress. Our team builds customised stores with product catalogues, payment gateways, integrations, and features that support unique business requirements and customer experiences.',
        },
        {
          title: 'Next.js',
          desc: 'Next.js enables fast, scalable e-commerce websites with modern architecture. We use it for responsive storefronts, dynamic product pages, optimised performance, API integrations, and customised commerce functionality.',
        },
        {
          title: 'Stripe',
          desc: 'Stripe provides secure payment infrastructure for e-commerce platforms. We integrate Stripe for card payments, subscriptions, refunds, checkout experiences, and transaction workflows across online stores and applications.',
        },
      ];

  // 3. Use Cases & Examples
  const useCasesTitle = industry.workAreasTitle || 'E-Commerce Use Cases & Examples';
  const useCasesItems = Array.isArray(industry.workAreas) && industry.workAreas.length > 0
    ? industry.workAreas
    : [
        {
          title: 'D2C E-Commerce Stores',
          body: 'Direct-to-consumer brands can use custom commerce experiences to showcase products, manage customer accounts, support promotions, and create frictionless purchasing journeys.',
        },
        {
          title: 'B2B Commerce Portals',
          body: 'B2B businesses can provide buyers with personalised catalogues, negotiated pricing, bulk ordering, account management, and streamlined repeat purchasing.',
        },
        {
          title: 'E-Commerce Marketplaces',
          body: 'Marketplace businesses can connect multiple sellers with customers through product listings, seller accounts, payment workflows, order management, and centralised administration.',
        },
      ];

  // 4. Why Teams Choose Cubixsol
  const whyChooseTitle = industry.whyChooseTitle || 'Why E-Commerce Teams Choose Cubixsol';
  const whyChooseItems = Array.isArray(industry.whyChooseItems) && industry.whyChooseItems.length > 0
    ? industry.whyChooseItems
    : [
        {
          title: 'E-Commerce Expertise',
          desc: 'Our team understands D2C, B2B, marketplace, payment, and customer experience requirements.',
        },
        {
          title: 'Custom Solutions',
          desc: 'We develop e-commerce platforms around your business model, workflows, customers, and growth objectives.',
        },
        {
          title: 'Security-Focused Development',
          desc: 'Our developers use secure practices and trusted payment integrations to protect commerce transactions.',
        },
        {
          title: 'Scalable Architecture',
          desc: 'Our solutions support growing traffic, larger catalogues, increased orders, and evolving business requirements.',
        },
        {
          title: 'Reliable Delivery',
          desc: 'Clear planning, regular communication, and structured development support a smooth path from requirements to launch.',
        },
        {
          title: 'Ongoing Support',
          desc: 'Our team provides technical support, improvements, integrations, and platform enhancements after your e-commerce solution goes live.',
        },
      ];

  const cases = industry.caseStudies || [];
  const services = industry.servicesWeOffer || [];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 🚀 Interactive E-Commerce Architecture Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#1a1a2e] via-[#241f48] to-[#122844] text-white p-6 sm:p-10 lg:p-12 border border-primary-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute left-0 bottom-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/20 border border-primary-400/30 text-primary-200 text-xs font-semibold uppercase tracking-wider">
                <Flame className="w-3.5 h-3.5 text-brand-cyan" /> High-Conversion Retail Architecture
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                High-Volume Commerce Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-primary-300 to-white">Peak Traffic &amp; Sales</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Whether powering multi-million dollar flash sales or bespoke marketplace ecosystems, our commerce engineering delivers lightning speeds, zero cart abandonment, and automated logistics.
              </p>

              {/* Conversion Stats */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-brand-cyan font-extrabold text-xl sm:text-2xl">+42%</p>
                  <p className="text-[11px] text-slate-300 mt-0.5">Mobile Checkout</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-primary-300 font-extrabold text-xl sm:text-2xl">&lt; 0.5s</p>
                  <p className="text-[11px] text-slate-300 mt-0.5">Page Load Time</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-white font-extrabold text-xl sm:text-2xl">99.99%</p>
                  <p className="text-[11px] text-slate-300 mt-0.5">Peak Uptime</p>
                </div>
              </div>
            </div>

            {/* Interactive Commerce Pillars */}
            <div className="lg:col-span-6 space-y-3">
              <div className="flex gap-2 border-b border-white/10 pb-3 overflow-x-auto no-scrollbar">
                {commercePillars.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setActiveTab(p.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                      activeTab === p.id
                        ? 'bg-primary-gradient text-white shadow-md'
                        : 'bg-white/5 text-primary-200/70 hover:bg-white/10'
                    }`}
                  >
                    {p.title.split('&')[0]}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-2xl bg-black/50 border border-primary-500/30 p-6 backdrop-blur-md space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-extrabold text-white">
                      {commercePillars[activeTab].title}
                    </h3>
                    <div className="text-right">
                      <span className="text-xl font-extrabold text-brand-cyan font-mono">
                        {commercePillars[activeTab].stat}
                      </span>
                      <p className="text-[10px] text-primary-200/70">{commercePillars[activeTab].statLabel}</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {commercePillars[activeTab].desc}
                  </p>
                  <div className="space-y-2 pt-1">
                    {commercePillars[activeTab].features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-xs text-primary-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 🛒 1. E-Commerce Software We Build */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary-700 border border-primary-200 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            <Store className="w-3.5 h-3.5 text-primary-600" />
            <span>Commerce Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-3">
            {softwareTitle}
          </h2>
          {softwareSubtitle && (
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {softwareSubtitle}
            </p>
          )}
        </Reveal>

        <Stagger className="grid sm:grid-cols-2 gap-6" staggerDelay={0.06}>
          {softwareItems.map((item, idx) => {
            const icons = [Store, ShoppingCart, Building2, Smartphone];
            const SIcon = icons[idx % icons.length];
            return (
              <StaggerItem key={item.title || idx}>
                <div className="p-6 sm:p-7 rounded-2xl bg-white border border-gray-100 shadow-card hover:shadow-elev hover:border-primary-200 transition-all duration-300 h-full flex flex-col group">
                  <div className="flex items-center gap-3.5 mb-4">
                    <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-50 to-blue-50 border border-primary-100 flex items-center justify-center text-primary-600 group-hover:scale-110 transition-transform">
                      <SIcon className="w-6 h-6" />
                    </span>
                    <h3 className="font-extrabold text-ink text-lg sm:text-xl group-hover:text-primary-600 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">
                    {formatInline(item.body || item.desc || '')}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      {/* ⚙️ 2. Tech We Use */}
      <section className="bg-slate-50/80 py-14 sm:py-20 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-primary-700 border border-primary-200 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
              <Cpu className="w-3.5 h-3.5 text-primary-600" />
              <span>Technology Stack</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-3">
              {techTitle}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              We select dependable, scalable technologies that fit your product requirements, support maintainability, and deliver high performance.
            </p>
          </Reveal>

          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.05}>
            {techItems.map((tech, idx) => {
              const techIcons = [ShoppingBag, Store, Zap, CreditCard];
              const TIcon = techIcons[idx % techIcons.length] || Box;
              return (
                <StaggerItem key={tech.title || idx}>
                  <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-card hover:border-primary-300 hover:shadow-elev transition-all duration-300 h-full flex flex-col group">
                    <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <TIcon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-ink text-lg mb-2 group-hover:text-primary-600 transition-colors">
                      {tech.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed flex-1">
                      {formatInline(tech.desc || '')}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* 📦 3. E-Commerce Use Cases & Examples */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary-700 border border-primary-200 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            <Layers className="w-3.5 h-3.5 text-primary-600" />
            <span>Market Segments</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-3">
            {useCasesTitle}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Tailored architecture models engineered for retail brands, wholesale enterprises, and high-scale multi-vendor marketplaces.
          </p>
        </Reveal>

        <Stagger className="grid md:grid-cols-3 gap-6" staggerDelay={0.06}>
          {useCasesItems.map((u, idx) => (
            <StaggerItem key={u.title || idx}>
              <div className="p-7 rounded-2xl bg-white border border-gray-100 shadow-card hover:border-primary-300 hover:shadow-elev transition-all duration-300 h-full flex flex-col group">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-9 h-9 rounded-xl bg-primary-gradient text-white font-mono text-xs font-extrabold flex items-center justify-center shadow-sm">
                    0{idx + 1}
                  </span>
                  <h3 className="font-extrabold text-ink text-lg group-hover:text-primary-600 transition-colors">
                    {u.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">
                  {formatInline(u.body || u.desc || '')}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* 🏆 4. Why E-Commerce Teams Choose Cubixsol */}
      <section className="bg-gradient-to-b from-white via-primary-50/30 to-white py-14 sm:py-20 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary-700 border border-primary-200 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-primary-600" />
              <span>The Cubixsol Difference</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-3">
              {whyChooseTitle}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              We combine deep commerce experience with secure engineering practices to deliver digital platforms built to scale.
            </p>
          </Reveal>

          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.05}>
            {whyChooseItems.map((item, idx) => {
              const icons = [Store, Cpu, ShieldCheck, TrendingUp, CheckCircle2, RefreshCw];
              const BIcon = icons[idx % icons.length];
              return (
                <StaggerItem key={item.title || idx}>
                  <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-card hover:border-primary-300 hover:shadow-elev transition-all duration-300 h-full flex flex-col group">
                    <div className="w-11 h-11 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <BIcon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-ink text-lg mb-2 group-hover:text-primary-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed flex-1">
                      {formatInline(item.desc || '')}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* Case Studies (if any) */}
      {cases.length > 0 && (
        <section className="bg-gradient-to-br from-[#1a1a2e] via-[#241f48] to-[#122844] text-white py-14 rounded-3xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border border-primary-500/20">
          <div className="max-w-3xl mb-10">
            <p className="text-primary-300 text-xs font-bold uppercase tracking-wider mb-2">Commerce Impact</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              E-Commerce Platforms Shipped by Cubixsol
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {cases.map((c) => (
              <div key={c.title} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary-400/40 transition">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {c.tags?.map((tag) => (
                    <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary-500/20 text-primary-200">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{c.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{c.result}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Services Grid (if any) */}
      {services.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-3xl bg-primary-50/60 border border-primary-100">
            <h3 className="text-xl font-extrabold text-ink mb-6">E-Commerce Engineering Capabilities</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {services.map((s) => (
                <div key={s} className="flex items-center gap-2.5 p-3 rounded-xl bg-white shadow-sm border border-primary-100/60">
                  <CheckCircle2 className="w-4 h-4 text-primary-600 shrink-0" />
                  <span className="text-xs font-semibold text-ink">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
