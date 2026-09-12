import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Truck, Navigation, MapPin, Radio, Activity, CheckCircle2,
  Package, Clock, ShieldCheck, ArrowRight, Gauge, Layers, Cpu,
  RefreshCw, BarChart2
} from 'lucide-react';
import Reveal, { Stagger, StaggerItem } from '../Reveal';

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

  const workAreas = industry.workAreas || [];
  const cases = industry.caseStudies || [];
  const services = industry.servicesWeOffer || [];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Interactive Logistics Control Tower */}
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

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="eyebrow text-sky-600 mb-2">Logistics Technology Stack</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
            Visibility from Warehouse Shelf to Doorstep
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: Navigation,
              title: 'AI Multi-Stop Route Optimization',
              desc: 'Dynamic re-routing factoring in traffic conditions, time windows, and vehicle capacity constraints.',
            },
            {
              icon: MapPin,
              title: 'Geo-Fencing & Micro-Milestones',
              desc: 'Automated arrival alerts, gate pass generation, and dwell time tracking with sub-meter accuracy.',
            },
            {
              icon: Package,
              title: 'Digital Proof of Delivery (ePOD)',
              desc: 'Instant barcode scanning, photo capture, sign-on-glass, and automated customer SMS confirmation.',
            },
            {
              icon: Gauge,
              title: 'TMS & WMS Integration',
              desc: 'Seamless data sync with SAP, Oracle Transportation Management, Blue Yonder, and Manhattan Associates.',
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
            <p className="eyebrow text-sky-600 mb-2">Operations Focus</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              Logistics Software We Build
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
        <section className="bg-[#071326] text-white py-14 rounded-3xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

      {/* Services Grid */}
      {services.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-3xl bg-sky-50/60 border border-sky-100">
            <h3 className="text-xl font-extrabold text-ink mb-6">Logistics Engineering Offerings</h3>
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
