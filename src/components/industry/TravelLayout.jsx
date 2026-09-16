import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plane, Compass, Map, Calendar, Hotel, CheckCircle2,
  Sparkles, Globe2, ArrowRight, ShieldCheck, Clock, Luggage,
  CreditCard, Network, Smartphone, Laptop, Cpu, Shield, RefreshCw
} from 'lucide-react';
import Reveal, { Stagger, StaggerItem } from '../Reveal';
import { formatInline } from '../../utils/formatText';

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

  // 1. Travel Software Solutions We Build
  const softwareTitle = industry.solutionsTitle || 'Travel Software Solutions We Build';
  const softwareSubtitle = industry.solutionsSubtitle || '';
  const softwareItems = Array.isArray(industry.solutionsItems) && industry.solutionsItems.length > 0
    ? industry.solutionsItems
    : [
        {
          title: 'Travel Booking Platforms',
          body: 'We develop booking platforms that allow travellers to search, compare, and reserve flights, hotels, tours, and other travel services. Custom booking systems can integrate payment gateways, availability management, and third-party APIs for smooth reservation experiences.',
        },
        {
          title: 'Travel Mobile Apps',
          body: 'Our travel app development services create mobile experiences that help users discover destinations, manage bookings, receive updates, and access travel services from anywhere. We build apps with intuitive interfaces and features that improve engagement throughout the customer journey.',
        },
        {
          title: 'Travel Management Software',
          body: 'Travel companies can streamline daily operations with custom management software that handles customer records, supplier coordination, itinerary planning, and reporting. These platforms provide better control over business workflows and operational data.',
        },
        {
          title: 'Hospitality Integration Solutions',
          body: 'We build software that connects travel platforms with hotels, airlines, payment providers, and external service systems. These integrations create synchronised workflows and improve accuracy across multiple travel operations.',
        },
      ];

  // 2. Built for Travel Industry Standards (Work Areas / Standards)
  const standardsTitle = industry.workAreasTitle || 'Built for Travel Industry Standards';
  const standardsItems = Array.isArray(industry.workAreas) && industry.workAreas.length > 0
    ? industry.workAreas
    : [
        {
          title: 'Secure Payment Integration',
          body: 'We develop travel platforms with secure payment integrations that support smooth transactions, multiple payment methods, and reliable checkout experiences for global travellers.',
        },
        {
          title: 'PMS & GDS Connectivity',
          body: 'Our travel solutions connect with Property Management Systems (PMS) and Global Distribution Systems (GDS) to synchronise availability, bookings, and travel inventory across platforms.',
        },
        {
          title: 'Multi-Currency & Global Support',
          body: 'We build travel software that supports multiple currencies, regional payment preferences, and international operations to serve customers across different markets.',
        },
        {
          title: 'Real-Time Data & API Integration',
          body: 'Our experts integrate real-time APIs for flights, hotels, transportation, and other travel services to provide accurate information and seamless user experiences.',
        },
      ];

  // 3. Why Travel & Hospitality Teams Choose Cubixsol
  const whyChooseTitle = industry.whyChooseTitle || 'Why Travel & Hospitality Teams Choose Cubixsol';
  const whyChooseItems = Array.isArray(industry.whyChooseItems) && industry.whyChooseItems.length > 0
    ? industry.whyChooseItems
    : (Array.isArray(industry.points) && industry.points.length > 0
        ? industry.points.map((p) => {
            if (typeof p === 'string') {
              const [t, ...d] = p.split('|');
              return { title: t.trim(), desc: d.join('|').trim() || 'Engineered for seamless guest satisfaction and high-speed booking performance.' };
            }
            return p;
          })
        : [
            { title: 'Custom-Built Travel Platforms', desc: 'Tailored booking engines and hospitality software designed around your workflows, multi-channel distribution, and guest experience requirements.' },
            { title: 'Enhanced Customer Experiences', desc: 'Intuitive, high-speed mobile and web interfaces that simplify reservations, itineraries, and contactless guest services.' },
            { title: 'Strong Security Practices', desc: 'Robust data protection, PCI-DSS compliance, and zero-trust safeguards for guest records and payment transactions.' },
            { title: 'Advanced Automation Features', desc: 'Automated itinerary dispatch, dynamic rate adjustments, cancellation handling, and channel manager sync.' },
            { title: 'Modern Technology Approach', desc: 'Cloud-native architectures, real-time caching, and sub-second API connectors for high-traffic peak seasons.' },
            { title: 'Long-Term Partnership Support', desc: 'Continuous technical maintenance, GDS/OTA API version updates, and dedicated engineering support.' },
          ]);

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

      {/* ✈️ 1. Travel Software Solutions We Build */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            <Plane className="w-3.5 h-3.5 text-cyan-600" />
            <span>Travel Tech Solutions</span>
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
            const icons = [Compass, Smartphone, Laptop, Network];
            const SIcon = icons[idx % icons.length];
            return (
              <StaggerItem key={item.title || idx}>
                <div className="p-6 sm:p-7 rounded-2xl bg-white border border-gray-100 shadow-card hover:shadow-elev hover:border-cyan-300 transition-all duration-300 h-full flex flex-col group">
                  <div className="flex items-center gap-3.5 mb-4">
                    <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-50 to-sky-50 border border-cyan-100 flex items-center justify-center text-cyan-600 group-hover:scale-110 transition-transform">
                      <SIcon className="w-6 h-6" />
                    </span>
                    <h3 className="font-extrabold text-ink text-lg sm:text-xl group-hover:text-cyan-700 transition-colors">
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

      {/* 🛡️ 2. Built for Travel Industry Standards */}
      <section className="bg-gradient-to-b from-[#061826] via-[#0b2942] to-[#04121f] text-white py-14 sm:py-20 border-y border-sky-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Security &amp; Connectivity</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-3">
              {standardsTitle}
            </h2>
            <p className="text-sky-100/75 text-sm sm:text-base leading-relaxed">
              Engineered with world-class security protocols, global distribution integrations, and fault-tolerant cloud systems.
            </p>
          </Reveal>

          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.05}>
            {standardsItems.map((item, idx) => {
              const standardIcons = [CreditCard, Globe2, Network, Clock];
              const StIcon = standardIcons[idx % standardIcons.length];
              return (
                <StaggerItem key={item.title || idx}>
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-300 h-full flex flex-col group">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <StIcon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-white text-lg mb-2 group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-sky-100/70 leading-relaxed flex-1">
                      {formatInline(item.body || item.desc || '')}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* 🏆 3. Why Travel & Hospitality Teams Choose Cubixsol */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" />
            <span>The Cubixsol Edge</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-3">
            {whyChooseTitle}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Partner with a team that combines deep travel industry insight with resilient engineering to deliver high-converting platforms.
          </p>
        </Reveal>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.05}>
          {whyChooseItems.map((item, idx) => {
            const icons = [Plane, Smartphone, ShieldCheck, Sparkles, Cpu, RefreshCw];
            const BIcon = icons[idx % icons.length];
            return (
              <StaggerItem key={item.title || idx}>
                <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-card hover:border-cyan-300 hover:shadow-elev transition-all duration-300 h-full flex flex-col group">
                  <div className="w-11 h-11 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <BIcon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-ink text-lg mb-2 group-hover:text-cyan-700 transition-colors">
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
      </section>

      {/* Case Studies (if any) */}
      {cases.length > 0 && (
        <section className="bg-[#061826] text-white py-14 rounded-3xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border border-sky-400/20">
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

      {/* Services Grid (if any) */}
      {services.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-3xl bg-cyan-50/60 border border-cyan-100">
            <h3 className="text-xl font-extrabold text-ink mb-6">Travel Engineering Capabilities</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {services.map((s) => (
                <div key={s} className="flex items-center gap-2.5 p-3 rounded-xl bg-white shadow-sm border border-cyan-100/60">
                  <CheckCircle2 className="w-4 h-4 text-cyan-700 shrink-0" />
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
