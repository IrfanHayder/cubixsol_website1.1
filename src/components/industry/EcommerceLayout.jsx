import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart, Zap, TrendingUp, Sparkles, CheckCircle2,
  PackageCheck, ArrowRight, Smartphone, RefreshCw, BarChart3,
  CreditCard, Flame, Layers, Box
} from 'lucide-react';
import Reveal, { Stagger, StaggerItem } from '../Reveal';

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

  const workAreas = industry.workAreas || [];
  const cases = industry.caseStudies || [];
  const services = industry.servicesWeOffer || [];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Interactive E-Commerce Funnel Visualizer */}
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
                Whether powering multi-million dollar Black Friday rushes or bespoke marketplace ecosystems, our commerce engineering delivers lightning speeds, zero cart abandonment, and automated logistics.
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

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="eyebrow mb-2">Commerce Engineering</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
            Built for Modern Omnichannel Retailers
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: Zap,
              title: 'Headless Commerce Architecture',
              desc: 'Decoupled frontends with Shopify Plus, MedusaJS, Commerce Layer, and BigCommerce backends.',
            },
            {
              icon: CreditCard,
              title: 'Global Payment Gateways',
              desc: 'Seamless multi-currency checkout with local payment methods (iDEAL, Klarna, Pix, Alipay).',
            },
            {
              icon: Box,
              title: 'Automated 3PL & ERP Sync',
              desc: 'Real-time stock synchronization, automatic label printing, and multi-location tracking.',
            },
            {
              icon: TrendingUp,
              title: 'Conversion Funnel Analytics',
              desc: 'Custom GA4 / PostHog event instrumentation and checkout abandonment heatmapping.',
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -4 }}
              className="p-5 rounded-2xl bg-white border border-gray-100 shadow-card hover:border-primary-300 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-3">
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-ink text-base mb-1.5">{item.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Work Areas */}
      {workAreas.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="eyebrow mb-2">Where We Specialize</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              E-Commerce Product Capabilities
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {workAreas.map((w, idx) => (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-card hover:border-primary-200 transition-all group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-lg bg-primary-gradient text-white font-mono text-xs font-bold flex items-center justify-center">
                    0{idx + 1}
                  </span>
                  <h3 className="text-lg font-extrabold text-ink group-hover:text-primary-600 transition-colors">
                    {w.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{w.body}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Case Studies */}
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

      {/* Services Grid */}
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
