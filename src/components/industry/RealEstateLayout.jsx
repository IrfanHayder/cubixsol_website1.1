import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Building2, Home, MapPin, KeyRound, Search, CheckCircle2,
  Users, Sparkles, FileCheck, Layers, ArrowRight, Eye,
  Compass, Map, ShieldCheck, Zap, RefreshCw, Smartphone,
  Sliders, Database, Check
} from 'lucide-react';
import Reveal, { Stagger, StaggerItem } from '../Reveal';

const REALESTATE_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&h=800&q=75',
  luxury: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&h=700&q=75',
  spatial: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&h=700&q=75',
  commercial: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&h=700&q=75',
  smartHome: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=900&h=600&q=75',
};

const workVisual = [
  { img: REALESTATE_IMAGES.luxury, icon: Home, key: 0, label: 'Residential MLS' },
  { img: REALESTATE_IMAGES.spatial, icon: Eye, key: 1, label: '3D Spatial Staging' },
  { img: REALESTATE_IMAGES.commercial, icon: Building2, key: 2, label: 'Commercial Asset PMS' },
  { img: REALESTATE_IMAGES.smartHome, icon: Compass, key: 3, label: 'GIS & Map Exploration' },
];

export default function RealEstateLayout({ industry }) {
  const [activeTab, setActiveTab] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [syncState, setSyncState] = useState({
    status: 'Synced & Indexed',
    count: '24,850 active listings',
    latency: '42ms',
    resoStatus: 'RESO 2.0 Web API Verified'
  });

  const runSyncSim = () => {
    setIsSimulating(true);
    setSyncState({
      status: 'Ingesting MLS Feeds...',
      count: 'Parsing RETS / RESO JSON streams...',
      latency: '...',
      resoStatus: 'Validating Geocodes & Media CDN...'
    });
    setTimeout(() => {
      setIsSimulating(false);
      setSyncState({
        status: 'Synced & Indexed',
        count: `${(24800 + Math.floor(Math.random() * 100)).toLocaleString()} active listings`,
        latency: `${Math.floor(Math.random() * 15) + 32}ms`,
        resoStatus: 'RESO 2.0 Web API Verified'
      });
    }, 850);
  };

  const approachTitle = industry.approachTitle || 'The Cubixsol Approach to Real Estate';
  const approachItems = industry.approachItems && industry.approachItems.length > 0 ? industry.approachItems : [
    {
      title: 'We Engineer High-Speed MLS & Spatial Portals',
      subtitle: 'Our PropTech software engineers and cloud architects build real estate search portals that are:',
      points: [
        { heading: 'Sub-Second Fast', text: 'Real-time RESO Web API data sync with sub-60ms faceted property filtering and instant map marker rendering.' },
        { heading: 'Immersive & Spatial', text: 'Matterport 3D virtual tour embeds, interactive floor plan overlays, and AI-powered virtual staging.' },
        { heading: 'High-Converting', text: 'AI lead qualification chatbots, instant agent routing, and SMS showing schedules that maximize buyer inquiries.' },
      ],
    },
    {
      title: 'We Power Intelligent Brokerage Automation',
      subtitle: 'From single brokerages to national MLS aggregators, we engineer backend platforms that ensure:',
      points: [
        { heading: 'Seamless MLS Aggregation', text: 'Normalized ingestion from RETS and RESO Web APIs across multiple regional boards with auto-deduplication.' },
        { heading: 'Automated CRM & Lead Routing', text: 'Rule-based buyer round-robins, commission split calculators, and automated property alert notifications.' },
        { heading: 'Digital Escrow & E-Sign', text: 'DocuSign and HelloSign integrated digital offer drafting with audit-ready transaction vaults.' },
      ],
    },
    {
      title: 'We Modernize Property Management & Assets',
      subtitle: 'We bridge commercial and residential asset management with enterprise cloud infrastructure:',
      points: [
        { heading: 'PMS Integrations', text: 'Deep bi-directional sync with Yardi, RealPage, Buildium, and AppFolio for tenant billing and lease tracking.' },
        { heading: 'GIS & Urban Intelligence', text: 'Custom Mapbox polygon boundary drawing, neighborhood transit heatmaps, and school rating overlays.' },
        { heading: 'IoT & Smart Access', text: 'Smart lock integration for self-guided agentless property viewings and digital access logging.' },
      ],
    },
  ];

  const solutionsTitle = industry.solutionsTitle || 'Our Real Estate & PropTech Solutions';
  const solutionsSubtitle = industry.solutionsSubtitle || 'High-performance property search engines, automated broker CRMs, 3D spatial tour viewers, and PMS integrations built for modern real estate enterprises.';
  const solutionsItems = industry.solutionsItems && industry.solutionsItems.length > 0 ? industry.solutionsItems : [
    {
      title: 'RESO / MLS Real Estate Search Portals',
      body: 'Sub-second faceted search engines with Mapbox polygon geofencing, automated property tax data enrichment, school district boundaries, and automated buyer alert notifications.',
    },
    {
      title: 'Interactive 3D Virtual Staging & Spatial Tours',
      body: 'Ultra-fast 3D Matterport tour embeds, virtual staging engines, panoramic 360-degree aerial views, and architectural floor plan interactive hotspots.',
    },
    {
      title: 'Broker CRM, PMS & Digital Closing Engines',
      body: 'Agent lead routing pipelines, commission tracking, bi-directional Yardi/RealPage property management sync, and DocuSign-integrated digital escrow closing workflows.',
    },
  ];

  const proptechModules = [
    {
      id: 0,
      name: 'RESO Fast-Sync Engine',
      badge: 'RESO 2.0 & RETS Bridge',
      desc: 'High-throughput ingestion pipeline normalizing multi-board MLS feeds with automated image optimization, deduplication, and instant Elasticsearch indexing.',
      features: ['Automated property tax & school data enrichment', 'Sub-60s MLS feed latency to live search', 'WebP/AVIF CDN media optimization'],
      stats: { label: 'Sync Latency', value: '< 60s' },
      codeSnippet: `// RESO Web API Stream Worker
const feed = await resoClient.stream({
  filter: "ModificationTimestamp gt 2026-09-12T00:00:00Z",
  expand: ["Media", "Rooms", "TaxHistory"],
  select: ["ListingId", "StandardStatus", "ListPrice", "GeoLocation"]
});
await elasticSearch.bulkUpsert(normalizeRESO(feed));`,
    },
    {
      id: 1,
      name: '3D Spatial Staging & Tours',
      badge: 'Matterport & WebGL SDK',
      desc: 'Immersive spatial exploration engine supporting 360-degree virtual walkthroughs, room measurement tools, and instant AI-assisted interior restaging.',
      features: ['3.4x higher on-page dwell time', 'Interactive hotspot & floor plan integration', 'Zero-lag mobile WebGL rendering'],
      stats: { label: 'Dwell Time', value: '3.4x Lift' },
      codeSnippet: `// 3D Spatial Tour Initializer
const viewer = new MatterportViewer({
  modelId: "prop_98412_penthouse",
  enableDollhouse: true,
  interactiveHotspots: ["Kitchen Island", "Master Suite Balcony"],
  onMeasurement: (dim) => crm.logInterest(dim)
});`,
    },
    {
      id: 2,
      name: 'Mapbox GIS Geofenced Search',
      badge: 'Custom Polygon Search',
      desc: 'Ultra-fast spatial mapping engine enabling prospective buyers to draw custom boundary polygons, analyze commute heatmaps, and view walking scores.',
      features: ['Mapbox GL custom polygon drawing', 'Transit & school district heatmap layers', 'Vector-tile marker clustering for 100k+ listings'],
      stats: { label: 'Map FPS', value: '60 FPS' },
      codeSnippet: `// Spatial Polygon Query
const boundary = mapbox.draw.getSelectedPolygon();
const listings = await spatialQuery.within({
  geometry: boundary.geometry,
  filters: { minBed: 3, maxPrice: 1200000 },
  sort: "proximity_to_transit"
});`,
    },
    {
      id: 3,
      name: 'Digital Closing & Escrow Vault',
      badge: 'DocuSign & Escrow Ledger',
      desc: 'End-to-end encrypted transaction room with automated purchase agreement generation, e-signatures, earnest money tracking, and compliance audit logs.',
      features: ['DocuSign / HelloSign automated workflows', 'Audit-ready escrow milestone tracking', 'SOC-2 compliant document encryption'],
      stats: { label: 'Closing Time', value: '5 Days Faster' },
      codeSnippet: `// Smart Escrow Closing Pipeline
const deal = await escrowVault.initiate({
  offerId: "OFF_8820",
  earnestMoney: 50000,
  signers: [buyer.email, seller.email, broker.email],
  webhook: "https://api.cubixsol.com/v1/escrow/notify"
});`,
    },
  ];

  const workAreas = industry.workAreas || [];
  const products = industry.productsBuilt || [];
  const cases = industry.caseStudies || [];
  const services = industry.servicesWeOffer || [];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. The Approach Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-50 text-primary-700 border border-primary-200 mb-3">
            Strategic Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
            {approachTitle}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {approachItems.map((item, idx) => (
            <motion.div
              key={item.title || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-7 sm:p-8 border border-gray-100 shadow-card hover:border-primary-300 hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                {/* Red Indicator Stripe as per design system */}
                <div className="h-1.5 w-16 bg-red-600 rounded-full mb-6" />
                <h3 className="text-xl font-bold text-ink mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  {item.subtitle}
                </p>
                <div className="space-y-4">
                  {item.points?.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-600 mt-2 shrink-0" />
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                        <strong className="text-ink font-semibold">{pt.heading}:</strong>{' '}
                        {pt.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 2. Solutions Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-50 text-primary-700 border border-primary-200 mb-3">
            PropTech Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-4">
            {solutionsTitle}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            {solutionsSubtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {solutionsItems.map((sol, idx) => (
            <motion.div
              key={sol.title || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-card hover:border-primary-300 hover:shadow-xl transition-all flex flex-col overflow-hidden group"
            >
              {/* Top Accent Gradient Bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-[#00a4d8] to-[#5d53a3]" />
              <div className="p-7 sm:p-8 flex-1 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  {idx === 0 ? <Search className="w-6 h-6" /> : idx === 1 ? <Eye className="w-6 h-6" /> : <FileCheck className="w-6 h-6" />}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-ink mb-3 group-hover:text-primary-600 transition-colors">
                  {sol.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-1">
                  {sol.body}
                </p>
                <div className="pt-4 border-t border-gray-100 flex items-center text-xs font-bold text-primary-600 group-hover:text-primary-700">
                  <span>Explore Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. PropTech Spatial Visual Band */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-primary-100/60 bg-gradient-to-br from-slate-900 via-[#1a1a2e] to-[#241f48] text-white p-8 sm:p-12">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00a4d8]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#5d53a3]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-wider text-[#00a4d8]">
                <Sparkles className="w-3.5 h-3.5 text-[#00a4d8]" /> Spatial &amp; Architectural Tech
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white">
                Next-Gen Platforms for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a4d8] to-purple-300">Brokers, Buyers &amp; Asset Managers</span>
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Whether deploying multi-board MLS search engines, 3D Matterport virtual staging, or automated property management ledgers, our systems are built for 99.99% uptime and instant query speeds.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 border border-white/15 text-xs font-semibold text-white">
                  <Check className="w-4 h-4 text-[#00a4d8]" /> RESO 2.0 Web API
                </div>
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 border border-white/15 text-xs font-semibold text-white">
                  <Check className="w-4 h-4 text-[#00a4d8]" /> 3D Matterport SDK
                </div>
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 border border-white/15 text-xs font-semibold text-white">
                  <Check className="w-4 h-4 text-[#00a4d8]" /> Mapbox Polygon GIS
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-3 sm:gap-4">
              {workVisual.map((item) => (
                <div
                  key={item.key}
                  className="relative group rounded-2xl overflow-hidden border border-white/10 bg-white/5 aspect-[4/3] shadow-lg"
                >
                  <img
                    src={item.img}
                    alt={item.label}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-3.5 sm:p-4">
                    <div className="flex items-center gap-2 text-white font-bold text-xs sm:text-sm">
                      <div className="w-6 h-6 rounded-lg bg-primary-600/80 backdrop-blur-sm flex items-center justify-center shrink-0">
                        <item.icon className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="truncate">{item.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive PropTech Architecture & Live Simulation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#1a1a2e] via-[#241f48] to-[#121824] rounded-3xl p-6 sm:p-10 lg:p-12 text-white border border-primary-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00a4d8]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#5d53a3]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00a4d8]/20 border border-[#00a4d8]/40 text-[#00a4d8] text-xs font-semibold mb-2">
                  <Database className="w-3.5 h-3.5" /> Interactive PropTech Simulator
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  High-Performance Real Estate Engine Architecture
                </h3>
              </div>
              <button
                onClick={runSyncSim}
                disabled={isSimulating}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00a4d8] to-[#5d53a3] hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-lg transition-all active:scale-95 disabled:opacity-60"
              >
                <RefreshCw className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
                <span>{isSimulating ? 'Syncing Feeds...' : 'Simulate Live MLS Feed Sync'}</span>
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
              {proptechModules.map((mod) => {
                const isActive = activeTab === mod.id;
                return (
                  <button
                    key={mod.id}
                    onClick={() => setActiveTab(mod.id)}
                    className={`p-3 sm:p-4 rounded-xl text-left border transition-all flex flex-col justify-between ${
                      isActive
                        ? 'bg-white/15 border-[#00a4d8] shadow-lg text-white'
                        : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold truncate">{mod.name}</span>
                      <span className="text-[10px] font-mono font-bold text-[#00a4d8]">0{mod.id + 1}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 truncate">{mod.badge}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Tab Showcase */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid lg:grid-cols-12 gap-6 items-center bg-black/40 rounded-2xl border border-white/10 p-6 backdrop-blur-md"
              >
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded text-xs font-bold bg-[#00a4d8]/20 text-[#00a4d8] border border-[#00a4d8]/30">
                      {proptechModules[activeTab].badge}
                    </span>
                    <span className="text-xs font-mono font-bold text-purple-300">
                      Metric: {proptechModules[activeTab].stats.value}
                    </span>
                  </div>
                  <h4 className="text-xl font-extrabold text-white">
                    {proptechModules[activeTab].name}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {proptechModules[activeTab].desc}
                  </p>
                  <div className="space-y-2 pt-2">
                    {proptechModules[activeTab].features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-200">
                        <CheckCircle2 className="w-4 h-4 text-[#00a4d8] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Code & Live Status Pane */}
                <div className="lg:col-span-6 space-y-3">
                  <div className="bg-[#0f172a] rounded-xl border border-white/10 p-4 font-mono text-xs text-gray-300 overflow-x-auto shadow-inner">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[11px] text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
                        <span className="ml-2 font-bold text-gray-200">cubixsol-proptech-core.ts</span>
                      </span>
                      <span className="text-[#00a4d8]">{proptechModules[activeTab].stats.label}</span>
                    </div>
                    <pre className="text-[11px] sm:text-xs text-cyan-300 leading-relaxed">
                      {proptechModules[activeTab].codeSnippet}
                    </pre>
                  </div>

                  {/* Live Telemetry Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-gray-400 text-[10px]">Status</p>
                      <p className="font-bold text-[#00a4d8] truncate">{syncState.status}</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-gray-400 text-[10px]">Indexed Listings</p>
                      <p className="font-bold text-white truncate">{syncState.count}</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-gray-400 text-[10px]">Search Latency</p>
                      <p className="font-bold text-green-400 truncate">{syncState.latency}</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-gray-400 text-[10px]">Compliance</p>
                      <p className="font-bold text-purple-300 truncate">{syncState.resoStatus}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 5. Real Estate Standards & Compliance Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-50 text-primary-700 border border-primary-200 mb-3">
            Standards &amp; Integrations
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
            Certified PropTech &amp; Brokerage Integrations
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: 'RESO Web API 2.0 & RETS',
              desc: 'Official certified data dictionaries for multi-board MLS listing sync and broker syndication.',
              badge: 'MLS Verified',
            },
            {
              title: 'Matterport & 3D WebGL SDK',
              desc: 'High-res spatial viewer embedding with interactive measuring tools and virtual staging hooks.',
              badge: 'Spatial Certified',
            },
            {
              title: 'Mapbox GL GIS Engine',
              desc: 'Sub-second polygon boundary search, transit routing, and neighborhood walkability indexing.',
              badge: 'GIS Mapping',
            },
            {
              title: 'DocuSign & HelloSign E-Sign',
              desc: 'Standardized digital offer generation with automated signature routing and escrow compliance.',
              badge: 'E-Sign Validated',
            },
            {
              title: 'PMS: Yardi, RealPage & AppFolio',
              desc: 'Bi-directional tenant accounting, lease lifecycle sync, and rent collection webhooks.',
              badge: 'PMS Integrated',
            },
            {
              title: 'SOC-2 & Escrow Audit Vault',
              desc: 'Encrypted document repositories with tamper-evident audit trails for real estate transactions.',
              badge: 'Bank-Grade Security',
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -3 }}
              className="p-5 rounded-2xl bg-white border border-gray-100 shadow-card hover:border-primary-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-primary-50 text-primary-700 border border-primary-200">
                    {item.badge}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-primary-600" />
                </div>
                <h3 className="font-bold text-ink text-base mb-1.5">{item.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. Work Areas / Specialized Domains */}
      {workAreas.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-50 text-primary-700 border border-primary-200 mb-3">
              Specialized Domains
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              Real Estate Platforms We Deliver
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {workAreas.map((w, idx) => (
              <motion.div
                key={w.title || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 sm:p-7 rounded-2xl bg-white border border-gray-100 shadow-card hover:border-primary-300 hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#00a4d8] to-[#5d53a3] text-white font-mono text-xs font-bold flex items-center justify-center shadow-md">
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

      {/* 7. Products Built & Case Studies */}
      {(products.length > 0 || cases.length > 0) && (
        <section className="bg-gradient-to-br from-[#1a1a2e] via-[#241f48] to-[#121824] text-white py-14 rounded-3xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border border-primary-500/20 shadow-2xl">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00a4d8]/20 border border-[#00a4d8]/30 text-[#00a4d8] text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Proven Track Record
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              PropTech Platforms Built by Cubixsol
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {(cases.length > 0 ? cases : products).map((c, idx) => (
              <div
                key={c.title || idx}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00a4d8]/50 transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {c.tags?.map((tag) => (
                      <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00a4d8]/20 text-[#00a4d8] border border-[#00a4d8]/30">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{c.title}</h3>
                  <p className="text-xs text-gray-300 leading-relaxed mb-4">
                    {c.result || c.description}
                  </p>
                </div>
                {c.metrics && (
                  <div className="pt-3 border-t border-white/10 text-xs font-mono font-bold text-green-400">
                    {c.metrics}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. Services Grid */}
      {services.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-primary-50/50 border border-primary-200/80">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-primary-700 border border-primary-200 mb-2">
                End-to-End Capabilities
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-ink">
                Full-Lifecycle Real Estate Engineering Services
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {services.map((s) => (
                <div
                  key={s}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white shadow-sm border border-primary-200/60 hover:border-primary-400 transition"
                >
                  <div className="w-6 h-6 rounded-lg bg-primary-600 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-ink">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
