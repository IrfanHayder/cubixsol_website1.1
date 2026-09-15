import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Truck, Navigation, MapPin, Radio, Activity, CheckCircle2,
  Package, Clock, ShieldCheck, ArrowRight, Gauge, Layers, Cpu,
  RefreshCw, BarChart2, Check, Smartphone, Box, Shield, Server,
  Database, Network, Zap, Anchor
} from 'lucide-react';
import Reveal, { Stagger, StaggerItem } from '../Reveal';
import { formatInline } from '../../utils/formatText';

export default function LogisticsLayout({ industry }) {
  const [selectedVehicle, setSelectedVehicle] = useState(0);

  const fleetUnits = [
    {
      id: 0,
      unit: 'Fleet Alpha #408',
      driver: 'Marcus Vance',
      route: 'Chicago Hub ➔ Dallas Fulfillment Center',
      status: 'In Transit',
      speed: '64 mph',
      eta: '3 hrs 12 mins',
      temp: '-18°C (Cold Chain OK)',
      telematics: 'Zero Harsh Braking Recorded',
      color: 'text-emerald-400',
    },
    {
      id: 1,
      unit: 'Cargo Van #112',
      driver: 'Elena Rostova',
      route: 'Dallas Hub ➔ Last-Mile Micro Depot',
      status: 'Approaching Geo-fence',
      speed: '38 mph',
      eta: '22 mins',
      temp: 'Ambient (21°C)',
      telematics: 'Auto Proof-of-Delivery Ready',
      color: 'text-cyan-400',
    },
    {
      id: 2,
      unit: 'Freight Carrier #904',
      driver: 'David Chen',
      route: 'Long Beach Port ➔ Phoenix Cross-Dock',
      status: 'Route Optimized (Traffic Bypass)',
      speed: '58 mph',
      eta: '4 hrs 45 mins',
      temp: 'Ambient',
      telematics: 'Fuel Savings +18% on Dynamic Route',
      color: 'text-amber-400',
    },
  ];

  // 1. Software We Build
  const softwareTitle = industry.solutionsTitle || 'Logistics Software We Build';
  const softwareSubtitle = industry.solutionsSubtitle || '';
  const softwareItems = Array.isArray(industry.solutionsItems) && industry.solutionsItems.length > 0
    ? industry.solutionsItems
    : [
        {
          title: 'Fleet Management Software',
          body: 'Our fleet management software development solutions help businesses monitor vehicles, drivers, and routes in real time. We create systems with GPS tracking, maintenance alerts, fuel monitoring, and performance analytics. Businesses can improve fleet efficiency and reduce operational costs through better visibility.',
        },
        {
          title: 'Dispatch and Tracking Software',
          body: 'We develop dispatch and tracking platforms that simplify shipment coordination and delivery management. Real-time updates allow teams to assign tasks, track orders, and improve delivery accuracy. Our solutions support faster communication between drivers, customers, and operations teams.',
        },
        {
          title: 'Warehouse Management Software',
          body: 'Our warehouse management solutions optimise inventory control, order processing, and storage operations. We build systems that improve stock visibility, automate workflows, and reduce manual errors. Companies can manage warehouse activities with greater speed and accuracy.',
        },
        {
          title: 'Logistics Mobile Apps',
          body: 'We build logistics mobile apps that connect drivers, managers, and customers through convenient digital tools. Apps can include delivery tracking, notifications, digital proof of delivery, and order updates. Our custom solutions improve accessibility and create smoother logistics experiences.',
        },
      ];

  // 2. Built for Logistics Standards (Work Areas / Standards)
  const standardsTitle = industry.workAreasTitle || 'Built for Logistics Standards';
  const standardsItems = Array.isArray(industry.workAreas) && industry.workAreas.length > 0
    ? industry.workAreas
    : [
        {
          title: 'Real-Time Tracking and Visibility',
          body: 'Our logistics platforms provide real-time tracking for shipments, vehicles, and delivery operations. Businesses gain complete visibility into movement, status updates, and operational performance.',
        },
        {
          title: 'Smooth System Integrations',
          body: 'We build logistics software that connects with essential systems such as ELD, ERP, TMS, and third-party APIs. These integrations create smooth data flow across logistics operations.',
        },
        {
          title: 'Reliable and Scalable Infrastructure',
          body: 'Our solutions are designed for high performance, security, and reliability. Scalable architecture supports growing fleets, increasing shipments, and expanding business needs.',
        },
        {
          title: 'Data-Driven Logistics Management',
          body: 'Advanced analytics and reporting features provide valuable insights into routes, costs, and delivery performance. Businesses can use real-time data to improve efficiency and decision-making.',
        },
      ];

  // 3. Why Logistics Teams Choose Cubixsol
  const whyChooseTitle = industry.whyChooseTitle || 'Why Logistics Teams Choose Cubixsol';
  const whyChooseItems = Array.isArray(industry.whyChooseItems) && industry.whyChooseItems.length > 0
    ? industry.whyChooseItems
    : (Array.isArray(industry.points) && industry.points.length > 0
        ? industry.points.map((p) => {
            if (typeof p === 'string') {
              const [t, ...d] = p.split('|');
              return { title: t.trim(), desc: d.join('|').trim() || 'Engineered for operational excellence and high-frequency telematics.' };
            }
            return p;
          })
        : [
            { title: 'Custom-Built Logistics Solutions', desc: 'Tailored architecture designed around your fleet size, dispatch workflows, and operational requirements.' },
            { title: 'Scalable Technology Solutions', desc: 'Engineered to handle high-frequency telematics and expanding shipment volumes.' },
            { title: 'Seamless Integration Capabilities', desc: 'Frictionless connection with ELD, ERP, TMS, and existing dispatch platforms.' },
            { title: 'Real-Time Data Insights', desc: 'Actionable telematics, route optimization, and live delivery analytics.' },
            { title: 'Flexible Cloud-Based Solutions', desc: 'Secure, resilient cloud infrastructure with high uptime and disaster recovery.' },
            { title: 'Long-Term Technology Partnership', desc: 'Continuous maintenance, feature expansion, and dedicated technical support.' },
          ]);

  const cases = industry.caseStudies || [];
  const services = industry.servicesWeOffer || [];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 📡 Interactive Logistics Control Tower */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#071326] via-[#0c1f3d] to-[#040e1c] text-white p-6 sm:p-10 lg:p-12 border border-sky-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute left-0 bottom-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-sky-500/20 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/20 border border-sky-500/30 text-sky-300 text-xs font-semibold uppercase tracking-wider mb-2">
                <Radio className="w-3.5 h-3.5 text-sky-400 animate-pulse" /> Live Telematics &amp; Control Tower
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                Supply Chain &amp; Fleet Command Center
              </h2>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-sky-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span>GPS UPDATE INTERVAL: 3 SECONDS</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Fleet Selector */}
            <div className="lg:col-span-5 space-y-3">
              <p className="text-xs font-mono text-sky-400 font-bold uppercase tracking-wider mb-2">
                Active Telematics Units
              </p>
              {fleetUnits.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedVehicle(item.id)}
                  className={`w-full p-4 rounded-2xl text-left transition-all border ${
                    selectedVehicle === item.id
                      ? 'bg-sky-500/20 border-sky-400 shadow-lg shadow-sky-500/20'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-bold text-white text-sm">{item.unit}</span>
                    <span className={`text-xs font-mono font-bold ${item.color}`}>{item.status}</span>
                  </div>
                  <p className="text-xs text-slate-300 truncate">{item.route}</p>
                </button>
              ))}
            </div>

            {/* Live Telematics Screen */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedVehicle}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl bg-slate-900/90 border border-sky-500/30 p-6 backdrop-blur-md space-y-4 font-mono text-xs"
                >
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <span className="text-sky-300 font-bold font-sans text-base">
                      {fleetUnits[selectedVehicle].unit}
                    </span>
                    <span className="text-slate-400">Driver: <strong className="text-white">{fleetUnits[selectedVehicle].driver}</strong></span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-black/40 border border-slate-800">
                      <p className="text-slate-400 text-[10px]">CURRENT SPEED</p>
                      <p className="text-sky-400 text-base font-bold mt-1">{fleetUnits[selectedVehicle].speed}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-black/40 border border-slate-800">
                      <p className="text-slate-400 text-[10px]">ESTIMATED TIME TO ARRIVAL</p>
                      <p className="text-emerald-400 text-base font-bold mt-1">{fleetUnits[selectedVehicle].eta}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-black/40 border border-slate-800 col-span-2 sm:col-span-1">
                      <p className="text-slate-400 text-[10px]">SENSOR PAYLOAD</p>
                      <p className="text-white text-xs font-bold mt-1 truncate">{fleetUnits[selectedVehicle].temp}</p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-sky-950/40 border border-sky-500/30 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sky-200">
                      <Activity className="w-4 h-4 text-sky-400 animate-pulse" />
                      <span>{fleetUnits[selectedVehicle].telematics}</span>
                    </div>
                    <span className="text-[10px] text-sky-400 font-bold">100% HEALTH</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 🚛 1. Logistics Software We Build */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            <Truck className="w-3.5 h-3.5 text-sky-600" />
            <span>Operational Capabilities</span>
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
            const icons = [Truck, Navigation, Box, Smartphone];
            const LIcon = icons[idx % icons.length];
            return (
              <StaggerItem key={item.title || idx}>
                <div className="p-6 sm:p-7 rounded-2xl bg-white border border-gray-100 shadow-card hover:shadow-elev hover:border-sky-300 transition-all duration-300 h-full flex flex-col group">
                  <div className="flex items-center gap-3.5 mb-4">
                    <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-100 flex items-center justify-center text-sky-600 group-hover:scale-110 transition-transform">
                      <LIcon className="w-6 h-6" />
                    </span>
                    <h3 className="font-extrabold text-ink text-lg sm:text-xl group-hover:text-sky-600 transition-colors">
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

      {/* 🛡️ 2. Built for Logistics Standards */}
      <section className="bg-gradient-to-b from-slate-900 via-[#071326] to-slate-900 text-white py-14 sm:py-20 border-y border-sky-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>Reliability &amp; Architecture</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-3">
              {standardsTitle}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Engineered with modern protocols, fault tolerance, and secure integrations to keep your supply chain running without disruption.
            </p>
          </Reveal>

          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.05}>
            {standardsItems.map((item, idx) => {
              const standardIcons = [Radio, Network, Server, BarChart2];
              const SIcon = standardIcons[idx % standardIcons.length];
              return (
                <StaggerItem key={item.title || idx}>
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-sky-400/50 hover:bg-white/10 transition-all duration-300 h-full flex flex-col group">
                    <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <SIcon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-white text-lg mb-2 group-hover:text-sky-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed flex-1">
                      {formatInline(item.body || item.desc || '')}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* 🏆 3. Why Logistics Teams Choose Cubixsol */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
            <span>The Cubixsol Edge</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-3">
            {whyChooseTitle}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            We deliver enterprise-grade logistics platforms that eliminate operational blind spots, automate workflows, and reduce delivery delays.
          </p>
        </Reveal>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.05}>
          {whyChooseItems.map((item, idx) => {
            const icons = [Truck, Cpu, Network, Activity, Server, RefreshCw];
            const BIcon = icons[idx % icons.length];
            return (
              <StaggerItem key={item.title || idx}>
                <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-card hover:border-sky-300 hover:shadow-elev transition-all duration-300 h-full flex flex-col group">
                  <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <BIcon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-ink text-lg mb-2 group-hover:text-sky-600 transition-colors">
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
        <section className="bg-[#071326] text-white py-14 rounded-3xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border border-sky-500/20">
          <div className="max-w-3xl mb-10">
            <p className="text-sky-400 text-xs font-bold uppercase tracking-wider mb-2">Operational Results</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Logistics Projects Shipped by Cubixsol
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
          <div className="p-8 rounded-3xl bg-sky-50/60 border border-sky-100">
            <h3 className="text-xl font-extrabold text-ink mb-6">Logistics Engineering Capabilities</h3>
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
