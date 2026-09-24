import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Building2, Key, Calendar, CreditCard, DollarSign, Star,
  CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Layers,
  RefreshCw, Smartphone, Laptop, Globe, Users, Award,
  TrendingUp, Cpu, Server, Lock, Radio, Activity, ChevronRight,
  Zap, Check, Sliders, ExternalLink, HelpCircle
} from 'lucide-react';
import { useEstimateModal } from '../context/EstimateModalContext';
import { apiFetch } from '../utils/api';
import { formatInline } from '../utils/formatText';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';
import CtaBanner from '../components/CtaBanner';
import DynamicIcon from '../components/DynamicIcon';
import { useSEO } from '../utils/seo';

export default function PmsIntegration() {
  const { openEstimateModal } = useEstimateModal();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useSEO(data?.seo, {
    title: data?.title ? `${data.title} | Cubixsol` : 'Property Management System (PMS) Integration Services | Cubixsol',
    description: data?.desc || data?.longDesc || 'Connect Opera, Cloudbeds, Guesty, Hostaway, Mews, Zeevou, Smoobu & more with 2-way OTAs, smart locks, payment gateways, and custom direct booking systems.',
    keywords: 'PMS integration, hotel PMS API, vacation rental PMS, Guesty integration, Opera PMS integration, Cloudbeds integration, Cubixsol',
    canonicalUrl: 'https://cubixsol.com/pms-integration',
  });

  const [activePmsSimulator, setActivePmsSimulator] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState({
    state: 'synced',
    time: '0.4s',
    rate: '$240/night (Synced across 14 channels)',
  });

  const pmsChannels = [
    {
      id: 0,
      name: 'Guesty & Hostaway Hub',
      type: 'Multi-Channel Distribution',
      activeSync: 'Airbnb, VRBO, Booking.com, Expedia',
      latency: '0.38s',
      status: 'Real-Time Webhook Active',
      stat: '100% Rate Parity',
    },
    {
      id: 1,
      name: 'Opera PMS & Cloudbeds Enterprise',
      type: 'Hotel Core Ledger & Front Desk',
      activeSync: 'Room Folios, Housekeeping, Guest Profiles',
      latency: '0.24s',
      status: 'Bi-Directional PMS Pipe Active',
      stat: 'Zero Overbooking',
    },
    {
      id: 2,
      name: 'Hostfully, Zeevou & Smoobu',
      type: 'Vacation Rental Automation',
      activeSync: 'Unified Inbox, Guest Guidebooks, Cleaning Dispatch',
      latency: '0.51s',
      status: 'Automated Messaging Live',
      stat: '5-Star Guest Flow',
    },
    {
      id: 3,
      name: 'OwnerRez, Lodgify & Rentals United',
      type: 'Direct Booking & Dynamic Yield',
      activeSync: 'Stripe Escrow, Security Deposits, Rental Agreements',
      latency: '0.42s',
      status: 'PCI-DSS Token Vault Linked',
      stat: '+34% Direct Margin',
    },
  ];

  const handleSimulateSync = () => {
    setIsSyncing(true);
    setSyncStatus({ state: 'syncing', time: '...', rate: 'Syncing availability & rate matrix...' });
    setTimeout(() => {
      setIsSyncing(false);
      setSyncStatus({
        state: 'synced',
        time: `${(Math.random() * 0.3 + 0.2).toFixed(2)}s`,
        rate: `$${Math.floor(Math.random() * 80 + 220)}/night (Synced across all connected OTAs)`,
      });
    }, 750);
  };

  useEffect(() => {
    let cancelled = false;
    // Check local cache for 0ms load
    try {
      const cached = localStorage.getItem('cubixsol_pms_integration_cache');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed) {
          setData(parsed);
          setLoading(false);
        }
      }
    } catch (_) {}

    // Fetch from API
    apiFetch('services/pms-integration')
      .then((res) => {
        if (!cancelled && res && res.title) {
          setData(res);
          try {
            localStorage.setItem('cubixsol_pms_integration_cache', JSON.stringify(res));
          } catch (_) {}
          setLoading(false);
        }
      })
      .catch(() => {
        // Try page endpoint
        apiFetch('pages/pms-integration')
          .then((pageRes) => {
            if (!cancelled && pageRes) {
              setData(pageRes);
              setLoading(false);
            }
          })
          .catch(() => {
            if (!cancelled) setLoading(false);
          });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Process Steps Data
  const processSteps = [
    {
      stepNumber: '01',
      title: 'Consultation',
      desc: 'This phase allows experts to define the optimum PMS integration solutions for your needs. For a smooth integration, our professionals will handle any technological or safety issues that may arise.',
    },
    {
      stepNumber: '02',
      title: 'Planning',
      desc: "In the planning phase, we create a comprehensive integration plan based on your requirements. It entails defining the task's scope, selecting suitable PMSs rental, and developing timelines. We establish critical milestones to maintain consistency with your business operations and system development.",
    },
    {
      stepNumber: '03',
      title: 'Implementation',
      desc: 'When the plan of action is approved, we start the integration process. Our expertise will integrate your present systems with the suitable PMS rentals, ensuring that data transfers safely and quickly. We manage all of the back work, allowing your business activities to continue uninterrupted.',
    },
    {
      stepNumber: '04',
      title: 'Testing',
      desc: 'Before moving live, we thoroughly test the integration to ensure that everything functions properly. This includes tests for operation, optimization of performance, and safety inspections to guarantee that the PMS operates as intended.',
    },
    {
      stepNumber: '05',
      title: 'Deployment',
      desc: 'After successful testing, we will begin integrating the PMS rental into your existing system. Once tested, we deploy the system into your live environment. Every module is fully functional, from the key management system for property management to payment and booking synchronization.',
    },
  ];

  // Core PMS Services Data
  const pmsServices = [
    {
      icon: Calendar,
      title: 'Booking engine / Channel Manager',
      desc: 'Channel executives assist hotels in managing their online distribution by connecting them to various online platforms and their online booking sites. Hotels can use a channel manager to modify inventory and rates throughout the PMS integrations system. Connecting your PMS systems with channel manager and PMS integration solutions such as online travel agents (OTAs) or channel administrators saves valuable time by providing central control over stock, pricing, and bookings.',
      badge: 'Multi-OTA Sync',
    },
    {
      icon: Key,
      title: 'Room Access / Keyless Access Solution',
      desc: 'Keyless entry systems with our key management system for property management allow visitors to open their hotel entrances without using a genuine key. Rather, visitors enter an authorization code or mobile key from their smartphone. Connecting your PMS to access-to-space solutions like smart keycards simplifies check-in and access control significantly, eliminating manual front-desk keycard encoding.',
      badge: 'BLE & Smart Lock Sync',
    },
    {
      icon: TrendingUp,
      title: 'Revenue Management System',
      desc: 'A revenue management system forecasts traveler habits and demand by using previous information, market trends, and live indicators. With this information, hotels determine the best price for rooms to maximize profits. Two-way connectivity between your PMS and revenue management software enables precise forecasting, dynamic nightly rate adjustments, and real-time inventory pricing optimization.',
      badge: 'Dynamic Yield & Pricing',
    },
    {
      icon: CreditCard,
      title: 'Payment Processing Network',
      desc: 'A payment processing network enables hotels and property managers to take credit card payments smoothly. Linking your PMS with a secure payment gateway makes bookings and departures at the reception desk seamless. After guests enter payment information, transactions are transmitted to the payment handling network and invoices in the PMS are promptly updated in real time.',
      badge: 'PCI-DSS Payment Rails',
    },
    {
      icon: Laptop,
      title: 'POS System Integration',
      desc: 'Point-of-sale (POS) systems allow hotel and resort staff to handle reservations for rooms or collect transactions for onsite amenities like restaurants, bars, and spas. By connecting your PMS and POS systems, amenity expenses can be charged to guest room folios automatically, decreasing human error and streamlining guest checkout.',
      badge: 'Front Desk & Amenities',
    },
    {
      icon: Star,
      title: 'Guest Review Plug-In',
      desc: 'Guest Review Plug-In services provide an easy way to collect, organize, and display feedback from guests directly on property management systems (PMS). The system enables hotel businesses to track and present guest experiences, improving online reputation and attracting new guests with real-time feedback synchronization across booking channels.',
      badge: 'Automated Guest Feedback',
    },
  ];

  // Supported Platforms Ecosystem
  const defaultPlatforms = [
    { name: 'Guesty', category: 'Enterprise PMS', icon: '/uploads/media-1790253755534-374481749.svg' },
    { name: 'Hostaway', category: 'Vacation Rental PMS', icon: '/uploads/media-1790253755539-455557641.svg' },
    { name: 'Hostfully', category: 'Hospitality Platform', icon: '/uploads/media-1790253755535-515170169.svg' },
    { name: 'Zeevou', category: 'Direct Booking PMS', icon: '/uploads/media-1790253755551-838693003.svg' },
    { name: 'Smoobu', category: 'Channel Manager PMS', icon: '/uploads/media-1790253755538-48144611.svg' },
    { name: 'Newbook', category: 'Hotel & Park PMS', icon: '/uploads/media-1790253755536-955178959.svg' },
    { name: 'Hostify', category: 'All-in-One PMS', icon: '/uploads/media-1790253755535-639038145.svg' },
    { name: 'Jurny', category: 'AI Hospitality PMS', icon: '/uploads/media-1790253755535-527429420.svg' },
    { name: 'Lodgify', category: 'Short-Term Rental PMS', icon: '/uploads/media-1790253755536-885217759.svg' },
    { name: 'OwnerRez', category: 'Direct Channel PMS', icon: '/uploads/media-1790253755537-457611832.svg' },
    { name: 'Rentals United', category: 'Global OTA Hub', icon: '/uploads/media-1790253755537-228555983.svg' },
    { name: 'Tokeet', category: 'Multi-Calendar PMS', icon: '/uploads/media-1790253755539-480635918.svg' },
    { name: 'Uplisting', category: 'Automated PMS', icon: '/uploads/media-1790253755539-463139177.svg' },
    { name: 'Cloudbeds', category: 'Hotel Management System', icon: '/uploads/media-1790253755532-273691715.svg' },
    { name: 'Opera PMS', category: 'Oracle Hospitality', icon: '/uploads/media-1790253755536-767535089.svg' },
    { name: 'Mews', category: 'Cloud Hotel PMS', icon: '/uploads/media-1790253755536-799955685.svg' },
  ];

  const supportedPlatforms = (data?.supportedPlatforms && data.supportedPlatforms.length > 0)
    ? data.supportedPlatforms
    : defaultPlatforms;

  // Featured Industries
  const featuredIndustries = [
    { title: 'Banking & Financial', desc: 'Escrow payment gateways & automated merchant accounts' },
    { title: 'Health Care & Telehealth', desc: 'Secure medical stay lodgings & HIPAA compliance' },
    { title: 'Insurance & Claims', desc: 'Automated policy coverage & security deposit hold verification' },
    { title: 'Logistics & Supply', desc: 'Corporate crew housing & extended dispatch lodging' },
    { title: 'Manufacturing', desc: 'Industrial workforce accommodation management' },
    { title: 'Energy & Infrastructure', desc: 'Remote site camp booking & automated room allocation' },
    { title: 'Platform Orchestration', desc: 'Multi-vendor API connectors & microservice middleware' },
    { title: 'Investment & REITs', desc: 'Portfolio yield analytics & centralized NOI dashboards' },
    { title: 'Lending & Credit', desc: 'Mortgage-backed rental underwriting & cashflow feeds' },
  ];

  // Default FAQs
  const defaultFaqs = [
    {
      q: 'What is a PMS integration, and why is it important?',
      a: 'A Property Management System (PMS) integration connects your PMS with other software solutions like payment gateways, booking engines, and keyless entry systems. This integration centralizes operations, reduces manual work, ensures accurate data flow between systems, and improves efficiency – helping you manage bookings, payments, guest access, and more from one platform.',
    },
    {
      q: 'How does PMS integration work?',
      a: 'PMS integration works by seamlessly exchanging and updating data between your PMS and connected systems. For example, when a booking is made through an online travel agent, the information flows directly into your PMS, which then updates availability and rates across all platforms automatically – eliminating the need for manual updates and minimizing errors.',
    },
    {
      q: 'Which systems can Cubixsol integrate with my PMS?',
      a: 'Cubixsol can integrate your PMS with a wide range of solutions, including:\n\n• Booking engines & channel managers\n• Keyless room access systems\n• Revenue management software\n• Payment processing networks\n• POS systems\n• Guest review plug-ins\n\nThis ensures that all aspects of your property – from reservations to guest feedback – are efficiently managed.',
    },
  ];

  const faqs = (data?.faqs && data.faqs.length > 0) ? data.faqs : defaultFaqs;

  return (
    <div className="bg-white min-h-screen">
      {/* 🌟 1. Bespoke Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 bg-gradient-to-br from-slate-950 via-[#071326] to-[#040e1c] text-white">
        <div className="absolute right-0 top-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link
              to="/all-services"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition group"
            >
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" /> Back to Services
            </Link>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Copy with Generous Spacing */}
            <div className="lg:col-span-6">
              <Reveal scale>
                <div className="flex flex-col space-y-6 sm:space-y-7">
                  {/* Eyebrow Badge */}
                  <div>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-300 text-xs font-bold uppercase tracking-wider shadow-sm">
                      <Radio className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
                      <span>Enterprise PMS Integration &amp; API Engineering</span>
                    </div>
                  </div>

                  {/* Main Title */}
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.22]">
                    Property Management <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-white">Systems Integration</span>
                  </h1>

                  {/* Paragraphs with Clear Separation */}
                  <div className="space-y-4 sm:space-y-5">
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                      Property Management Systems are software programs that enable landlords and property managers to optimize and manage their properties' regular tasks. PMSs work with <strong className="text-white font-semibold">CMS software</strong> to give an extensive range of features and capabilities for managing and tracking rental contracts, landlord information, repair requests, finances, and others. PMS rentals streamline everything from guest check-in to financial tracking, providing a centralized system that boosts operational efficiency.
                    </p>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal bg-white/[0.04] border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-sm">
                      <strong className="text-white font-semibold">Property management systems (PMS)</strong> control all property elements, including tenants' onboarding process, rent collection, upkeep arrangements, and monitoring. They can also provide analytics and reports that will assist homeowners and managers in making smart choices about the properties they own.
                    </p>
                  </div>

                  {/* Hero CTA Buttons */}
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm shadow-lg shadow-sky-500/25 transition-all hover:scale-[1.02]"
                    >
                      <span>Get API Developers</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <button
                      onClick={openEstimateModal}
                      type="button"
                      className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all backdrop-blur-sm hover:scale-[1.02]"
                    >
                      <Sparkles className="w-4 h-4 text-sky-300" />
                      <span>Get a Proposal</span>
                    </button>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right: Live Interactive PMS Sync Telemetry Node */}
            <div className="lg:col-span-6">
              <Reveal direction="left" delay={0.1}>
                <div className="rounded-3xl bg-slate-900/90 border border-sky-500/30 p-6 sm:p-7 shadow-2xl backdrop-blur-xl relative">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-xs font-mono text-sky-300 font-bold">PMS INTEGRATION HUB &bull; LIVE</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                      Two-Way Sync 100%
                    </span>
                  </div>

                  {/* Channel Selector */}
                  <div className="space-y-2.5 mb-5">
                    <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      Connected PMS Ecosystems:
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {pmsChannels.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setActivePmsSimulator(c.id)}
                          className={`p-2.5 rounded-xl text-left border transition-all text-xs font-sans ${
                            activePmsSimulator === c.id
                              ? 'bg-sky-500/20 border-sky-400 text-white font-bold'
                              : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          <p className="font-semibold truncate">{c.name.split('&')[0]}</p>
                          <p className="text-[10px] text-sky-300/80 font-mono mt-0.5">{c.stat}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Live Telemetry Display */}
                  <div className="rounded-2xl bg-black/50 border border-slate-800 p-4 space-y-3 font-mono text-xs">
                    <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
                      <span className="text-slate-400 font-sans font-semibold">Active Integration Pipe:</span>
                      <span className="text-sky-300 font-bold">{pmsChannels[activePmsSimulator].type}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 text-[11px]">
                      <div className="p-2.5 rounded-lg bg-white/5 border border-slate-800">
                        <p className="text-slate-400 text-[10px]">SYNC PIPELINE</p>
                        <p className="text-white font-sans font-medium mt-0.5 truncate">{pmsChannels[activePmsSimulator].activeSync}</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white/5 border border-slate-800">
                        <p className="text-slate-400 text-[10px]">API LATENCY</p>
                        <p className="text-emerald-400 font-bold mt-0.5">{pmsChannels[activePmsSimulator].latency}</p>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-sky-950/40 border border-sky-500/30 flex justify-between items-center text-[11px]">
                      <div className="flex items-center gap-1.5 text-sky-200">
                        <Activity className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
                        <span>{syncStatus.rate}</span>
                      </div>
                      <span className="text-[10px] text-sky-400 font-bold">{syncStatus.time}</span>
                    </div>

                    <button
                      onClick={handleSimulateSync}
                      disabled={isSyncing}
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:opacity-90 text-white font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition disabled:opacity-50"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                      {isSyncing ? 'Synchronizing Rates & Keys...' : 'Test Real-Time PMS Sync Stream'}
                    </button>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 📊 2. Why Choose Cubixsol For PMS Integration (Stats Strip) */}
      <section className="border-y border-gray-200/80 bg-slate-50/80 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              Why Choose Cubixsol For PMS Integration
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Proven integration engineering backed by global delivery, deep API expertise, and high-uptime connectivity.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 text-center">
            <div className="px-3 sm:px-4 py-2">
              <p className="text-3xl sm:text-5xl font-extrabold text-sky-600 tracking-tight">1K+</p>
              <p className="text-xs sm:text-sm text-gray-700 font-semibold mt-1.5">Clients around the world</p>
            </div>
            <div className="px-3 sm:px-4 py-2">
              <p className="text-3xl sm:text-5xl font-extrabold text-ink tracking-tight">30+</p>
              <p className="text-xs sm:text-sm text-gray-700 font-semibold mt-1.5">Award Winning</p>
            </div>
            <div className="px-3 sm:px-4 py-2">
              <p className="text-3xl sm:text-5xl font-extrabold text-emerald-600 tracking-tight">97%</p>
              <p className="text-xs sm:text-sm text-gray-700 font-semibold mt-1.5">Business Growth</p>
            </div>
            <div className="px-3 sm:px-4 py-2">
              <p className="text-3xl sm:text-5xl font-extrabold text-indigo-600 tracking-tight">60+</p>
              <p className="text-xs sm:text-sm text-gray-700 font-semibold mt-1.5">Team Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🛣️ 3. Organized Strategy For PMS Integration (Process Roadmap) */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            <Layers className="w-3.5 h-3.5 text-sky-600" />
            <span>Our Process</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-3">
            Organized Strategy For PMS Integration
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Our structured 5-phase execution ensures safe data migrations, minimal disruption to active reservations, and reliable go-live delivery.
          </p>
        </Reveal>

        <div className="relative">
          {/* Progress Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 -translate-y-12 z-0 opacity-20" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {processSteps.map((step, idx) => (
              <motion.div
                key={step.stepNumber}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="rounded-2xl bg-white border border-gray-100 p-6 shadow-card hover:shadow-elev hover:border-sky-300 transition-all duration-300 flex flex-col justify-between group h-full"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-100 flex items-center justify-center font-mono font-extrabold text-sky-600 text-sm group-hover:scale-110 transition-transform">
                      {step.stepNumber}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600/70">
                      Phase {idx + 1}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-ink text-lg mb-2 group-hover:text-sky-600 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🏨 4. Our PMS Integration Services (Core Capabilities) */}
      <section className="bg-gradient-to-b from-[#071326] via-[#0b213f] to-[#040e1c] text-white py-16 sm:py-24 border-y border-sky-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-bold uppercase tracking-wider mb-3">
              <Building2 className="w-3.5 h-3.5 text-sky-400" />
              <span>Full-Spectrum Solutions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-4">
              Our PMS Integration Services
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Many options stand out if you're looking for complete property management software to help you optimize the vacation rental business. Industry leaders such as <strong className="text-white font-semibold">Guesty, Hostaway, Hostfully, Zeevou, Smoobu, Lodgify, OwnerRez, Rentals United, Tokeet, Uplisting, Cloudbeds, and Opera</strong> provide comprehensive solutions for booking, guest communication, payment processing, keyless access, and smooth multi-property monitoring.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pmsServices.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 hover:border-sky-400/50 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-sky-400/20 text-sky-300 border border-sky-400/30 font-bold">
                        {service.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-white mb-2.5 group-hover:text-sky-300 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      {service.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 🌐 5. Supported PMS Ecosystem & Platforms */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            <Cpu className="w-3.5 h-3.5 text-sky-600" />
            <span>Integrations Ecosystem</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-3">
            Supported Property Management Platforms
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            We build custom two-way APIs and webhooks for all top-tier PMS and vacation rental platforms.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
          {supportedPlatforms.map((p, idx) => (
            <motion.div
              key={p.name || idx}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="p-5 rounded-2xl bg-gradient-to-b from-white to-slate-50/80 border border-slate-200/80 hover:border-sky-400 hover:shadow-lg hover:shadow-sky-500/10 transition-all text-center flex flex-col justify-center items-center group relative overflow-hidden"
            >
              <div className="w-14 h-14 rounded-2xl bg-sky-50/70 border border-sky-100 flex items-center justify-center mb-3 group-hover:scale-105 group-hover:bg-white group-hover:border-sky-300 group-hover:shadow-md transition-all duration-300 shadow-sm p-2.5">
                <DynamicIcon
                  icon={p.icon || p.name}
                  alt={p.name}
                  title={p.name}
                  className="w-8 h-8 text-sky-600 group-hover:text-sky-700 transition-colors duration-300 object-contain"
                  fallbackName="Building2"
                />
              </div>
              <p className="font-bold text-ink text-sm sm:text-base group-hover:text-sky-600 transition-colors tracking-tight">
                {p.name}
              </p>
              <p className="text-[11px] font-medium text-slate-500 mt-1 line-clamp-1">
                {p.category || 'PMS Integration'}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🏢 6. Featured Industries & Cross-Domain Application */}
      <section className="bg-slate-50/70 py-16 sm:py-24 border-y border-gray-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-sky-700 border border-sky-200 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
              <Globe className="w-3.5 h-3.5 text-sky-600" />
              <span>Multi-Sector Integration</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-3">
              Featured Industries
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Cubixsol offers IT solutions and services designed for several industries to boost operational efficiency and security.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredIndustries.map((ind, idx) => (
              <motion.div
                key={ind.title}
                whileHover={{ y: -2 }}
                className="p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-sky-300 hover:shadow-card transition-all flex items-start gap-3.5"
              >
                <span className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 font-mono font-bold text-xs">
                  0{idx + 1}
                </span>
                <div>
                  <h3 className="font-bold text-ink text-sm sm:text-base">{ind.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{ind.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ❓ 7. Frequently Asked Questions Section */}
      <section className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
            <span>Common Questions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Find quick answers to the most common questions our users ask. Whether you need help with our services, products, or policies, this section provides clear and helpful information to guide you.
          </p>
        </Reveal>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <motion.div
                key={faq.q || idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-sky-300 shadow-md shadow-sky-500/5'
                    : 'bg-slate-50/70 border-gray-200/80 hover:bg-white hover:border-gray-300'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  type="button"
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 cursor-pointer select-none"
                >
                  <span className="font-bold text-ink text-base sm:text-lg">
                    {faq.q}
                  </span>
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-sky-600 text-white rotate-180'
                        : 'bg-white border border-gray-200 text-gray-500'
                    }`}
                  >
                    <ChevronRight className="w-4 h-4 rotate-90" />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-gray-100 mt-1">
                        {faq.a.includes('•') ? (
                          <div className="space-y-3 pt-2">
                            {faq.a.split('\n\n').map((paragraph, pIdx) => {
                              if (paragraph.includes('•')) {
                                const bulletLines = paragraph.split('\n').filter(Boolean);
                                return (
                                  <ul key={pIdx} className="space-y-1.5 pl-2 my-2">
                                    {bulletLines.map((line, lIdx) => (
                                      <li key={lIdx} className="flex items-start gap-2.5 text-slate-700">
                                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 shrink-0" />
                                        <span>{line.replace(/^[•\-\*]\s*/, '')}</span>
                                      </li>
                                    ))}
                                  </ul>
                                );
                              }
                              return <p key={pIdx}>{paragraph}</p>;
                            })}
                          </div>
                        ) : (
                          <p className="pt-2">{faq.a}</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 🚀 8. Bottom Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <CtaBanner
          eyebrow="READY TO SCALE YOUR PROPERTY OPERATIONS?"
          title="Ready to Build Your Custom PMS Integration Solution?"
          desc="Partner with Cubixsol to connect your PMS, channel managers, keyless access systems, and payment gateways with maximum security and speed."
          primaryAction={{
            label: 'Get API Developers',
            to: '/contact',
          }}
          secondaryAction={{
            label: 'Get a Proposal',
            onClick: openEstimateModal,
          }}
        />
      </section>
    </div>
  );
}
