import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plane, Compass, Map, Calendar, Hotel, CheckCircle2,
  Sparkles, Globe2, ArrowRight, ShieldCheck, Clock, Luggage
} from 'lucide-react';
import Reveal, { Stagger, StaggerItem } from '../Reveal';

export default function TravelLayout({ industry }) {
  const [activeTab, setActiveTab] = useState(0);

  const travelModules = [
    {
      id: 0,
      title: 'Multi-GDS & Hotel Inventory Aggregation',
      desc: 'Unified booking engine aggregating real-time inventory from Amadeus, Sabre, Travelport, and Hotelbeds with sub-second response times.',
      badge: 'GDS / NDC Certified',
      stat: '0.6s API Aggregation',
      features: ['Automated NDC fare family parsing', 'Multi-supplier deduplication & caching', 'Direct hotel PMS channel manager sync'],
    },
    {
      id: 1,
      title: 'Dynamic Packaging & Real-Time Pricing',
      desc: 'AI-driven dynamic bundling of flights, hotels, transfers, and activities with automated yield management and markup rules.',
      badge: 'Margin Optimization Engine',
      stat: '+28% Package Margin',
      features: ['Rule-based markup & commission engine', 'Real-time FX currency conversion', 'Multi-destination itinerary builder'],
    },
    {
      id: 2,
      title: 'Peak-Season Concurrency & Reliability',
      desc: 'High-availability infrastructure engineered to handle massive spikes during holiday sales, flash deals, and flight disruptions.',
      badge: 'High-Traffic Resilience',
      stat: '10k+ QPS Stress-Tested',
      features: ['Distributed Redis seat lock cache', 'Auto-scaling Kubernetes worker pods', 'Zero double-booking guarantee'],
    },
    {
      id: 3,
      title: 'Mobile Guest App & Digital Key Experience',
      desc: 'Native iOS & Android mobile companion apps with contactless mobile check-in, BLE digital room keys, and live flight status push alerts.',
      badge: 'Guest Experience Suite',
      stat: '4.9 Star App Rating',
      features: ['Offline-ready itinerary cards', 'Assa Abloy / Dormakaba BLE lock sync', 'In-app concierge chat & room service'],
    },
  ];

  const workAreas = industry.workAreas || [];
  const cases = industry.caseStudies || [];
  const services = industry.servicesWeOffer || [];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Interactive Travel Visual Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#061826] via-[#0b2942] to-[#04121f] text-white p-6 sm:p-10 lg:p-12 border border-sky-400/30 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute left-0 bottom-0 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-400/20 border border-sky-400/30 text-sky-300 text-xs font-semibold uppercase tracking-wider">
                <Plane className="w-3.5 h-3.5 text-sky-300 animate-pulse" /> Global Travel &amp; Hospitality Tech
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                High-Speed Booking Engines &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-rose-400">Guest Apps That Convert</span>
              </h2>
              <p className="text-sky-100/75 text-sm sm:text-base leading-relaxed">
                We design and build mission-critical travel booking engines, hotel guest portals, and airline API integrations that withstand extreme traffic demand and delight travelers worldwide.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-sky-400 font-extrabold text-xl sm:text-2xl">&lt; 0.6s</p>
                  <p className="text-[11px] text-sky-200/70 mt-0.5">GDS Search Speed</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-cyan-400 font-extrabold text-xl sm:text-2xl">100%</p>
                  <p className="text-[11px] text-sky-200/70 mt-0.5">Zero Double-Booking</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-rose-400 font-extrabold text-xl sm:text-2xl">99.99%</p>
                  <p className="text-[11px] text-sky-200/70 mt-0.5">Peak Availability</p>
                </div>
              </div>
            </div>

            {/* Interactive Travel Tabs */}
            <div className="lg:col-span-6 space-y-3">
              <div className="flex gap-2 border-b border-white/10 pb-3 overflow-x-auto no-scrollbar">
                {travelModules.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setActiveTab(m.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                      activeTab === m.id
                        ? 'bg-gradient-to-r from-sky-500 to-cyan-600 text-slate-950 shadow-md font-bold'
                        : 'bg-white/5 text-sky-200/70 hover:bg-white/10'
                    }`}
                  >
                    {m.title.split('&')[0]}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-2xl bg-black/50 border border-sky-400/30 p-6 backdrop-blur-md space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold bg-sky-400/20 text-sky-300 border border-sky-400/30">
                      {travelModules[activeTab].badge}
                    </span>
                    <span className="text-xs font-mono font-bold text-cyan-300">
                      {travelModules[activeTab].stat}
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-white">
                    {travelModules[activeTab].title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {travelModules[activeTab].desc}
                  </p>
                  <div className="space-y-2 pt-1">
                    {travelModules[activeTab].features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-xs text-sky-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
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
          <p className="eyebrow text-sky-600 mb-2">Travel Tech Capabilities</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
            Engineered for Modern Travel Brands
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: Globe2,
              title: 'Multi-Supplier GDS / NDC Connectors',
              desc: 'Seamless connections to Amadeus, Sabre, and direct NDC airline pipes with smart fallback routing.',
            },
            {
              icon: Compass,
              title: 'Dynamic Packaging Engines',
              desc: 'Automate flight + hotel + transfer bundle pricing with custom margin controls and real-time availability.',
            },
            {
              icon: Luggage,
              title: 'Guest Mobile Itinerary & Loyalty',
              desc: 'Offline flight updates, mobile room key cards, gate change push notifications, and points redemption.',
            },
            {
              icon: Hotel,
              title: 'PMS & Channel Manager Sync',
              desc: 'Bi-directional rate and inventory sync with Opera, Cloudbeds, Mews, and SiteMinder.',
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -4 }}
              className="p-5 rounded-2xl bg-white border border-gray-100 shadow-card hover:border-sky-300 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3">
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
            <p className="eyebrow text-sky-600 mb-2">Specialized Domains</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              Travel Platforms We Deliver
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
                className="p-6 rounded-2xl bg-sky-50/40 border border-sky-100 hover:bg-white hover:shadow-card hover:border-sky-300 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-lg bg-sky-600 text-white font-mono text-xs font-bold flex items-center justify-center">
                    0{idx + 1}
                  </span>
                  <h3 className="text-lg font-extrabold text-ink">{w.title}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{w.body}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Case Studies */}
      {cases.length > 0 && (
        <section className="bg-[#061826] text-white py-14 rounded-3xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <p className="text-sky-400 text-xs font-bold uppercase tracking-wider mb-2">Case Studies</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Travel Solutions Shipped by Cubixsol
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {cases.map((c) => (
              <div key={c.title} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-sky-400/40 transition">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {c.tags?.map((tag) => (
                    <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-300">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{c.title}</h3>
                <p className="text-xs text-sky-100/70 leading-relaxed">{c.result}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Services Grid */}
      {services.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-3xl bg-sky-50/60 border border-sky-100">
            <h3 className="text-xl font-extrabold text-ink mb-6">Travel Engineering Capabilities</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {services.map((s) => (
                <div key={s} className="flex items-center gap-2.5 p-3 rounded-xl bg-white shadow-sm border border-sky-100/60">
                  <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
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
