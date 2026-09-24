import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  KeyRound, Calendar, ShieldCheck, Cpu, ArrowRight, CheckCircle2,
  ChevronRight, TrendingUp, Sparkles, Database, MessageSquare,
  Mail, Layers, PhoneCall, ExternalLink, RefreshCw, BarChart3,
  HelpCircle, Star, Sliders, Workflow, Settings, Smartphone,
  Award, Target, Rocket, Globe, CreditCard, Share2, Terminal,
  Code2, Check, PieChart, GitBranch, Server, Lock, Unlock,
  DoorClosed, Key, Bell, Wifi, ArrowUpRight, Zap, Play,
  CheckCircle, ChevronDown, Building2, Laptop, Shield, Radio
} from 'lucide-react';
import { useEstimateModal } from '../context/EstimateModalContext';
import { apiFetch } from '../utils/api';
import { formatInline } from '../utils/formatText';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';
import CtaBanner from '../components/CtaBanner';
import DynamicIcon from '../components/DynamicIcon';
import { useSEO } from '../utils/seo';

// Default static data matching the document and modern PMS requirements
const DEFAULT_DATA = {
  slug: 'guesty-integration',
  title: 'Guesty Integration Services',
  heroEyebrow: 'GUESTY INTEGRATION SERVICES',
  heroTitle: 'Custom Guesty Integration Solutions For Vacation Rental Businesses',
  heroDesc: 'Cubixsol provides professional Guesty integration services that connect vacation rental platforms, business tools, and automation systems through secure API solutions. Our team builds custom connections that allow property managers to manage reservations, guest data, payments, communication tools, and smart property systems from one centralised workflow.',
  heroPrimaryBtnText: 'Schedule A Guesty Consultation',
  heroSecondaryBtnText: 'Explore Architecture',
  heroBadges: [
    'Real-time Multi-Channel Calendar Sync',
    'Automated Smart Lock Keyless Check-in',
    '2-Way Airbnb & OTA Reservation Bridging',
    'Automated Payment & Accounting Sync',
  ],
  heroImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&h=800&q=80',

  // Section 1: Connect Guesty With Your Essential Business Tools
  subServicesTitle: 'Connect Guesty With Your Essential Business Tools',
  subServicesIntro: 'A successful rental operation requires smooth communication between different platforms. Cubixsol creates Guesty integrations that connect your PMS with important business applications:',
  subServicesItems: [
    {
      icon: 'Share2',
      tag: 'CHANNELS & OTAs',
      title: 'Airbnb & Channel Synchronisation',
      desc: 'Airbnb and other booking channels for real-time reservation synchronisation, calendar parity, rate updates, and zero double bookings.',
      pills: ['Airbnb 2-Way Sync', 'VRBO & Booking.com', 'Instant Block'],
      colorTheme: 'cyan',
    },
    {
      icon: 'Workflow',
      tag: 'GUEST RELATIONSHIPS',
      title: 'CRM Platforms',
      desc: 'CRM platforms for organised guest information, unified messaging history, VIP guest segmentation, and repeat booking automation.',
      pills: ['HubSpot / Salesforce', 'Guest History', 'Automated Drips'],
      colorTheme: 'purple',
    },
    {
      icon: 'CreditCard',
      tag: 'FINANCIAL OPS',
      title: 'Payment Gateways',
      desc: 'Payment gateways like Stripe and Adyen for secure transaction processing, automatic security deposit pre-auth, and instant refund processing.',
      pills: ['Stripe & Adyen', 'Deposit Hold', 'Auto-Invoicing'],
      colorTheme: 'cyan',
    },
    {
      icon: 'KeyRound',
      tag: 'SMART HARDWARE',
      title: 'Smart Lock Systems',
      desc: 'Smart lock systems for automated property access, dynamic time-restricted PIN code generation upon reservation confirmation, and keyless check-in.',
      pills: ['Yale / Schlage / August', 'Dynamic PINs', 'Remote Access'],
      colorTheme: 'purple',
    },
    {
      icon: 'PieChart',
      tag: 'ACCOUNTING & TAX',
      title: 'Accounting Software',
      desc: 'Accounting software like QuickBooks and Xero for accurate financial records, automated owner payouts, cleaning fee tracking, and tax reporting.',
      pills: ['QuickBooks & Xero', 'Owner Payouts', 'Tax Automation'],
      colorTheme: 'cyan',
    },
    {
      icon: 'MessageSquare',
      tag: 'MARKETING & LOYALTY',
      title: 'Marketing Platforms',
      desc: 'Marketing platforms for guest engagement campaigns, automated 5-star review generation triggers, SMS updates, and re-engagement promotions.',
      pills: ['Klaviyo / Mailchimp', 'Review Boosters', 'SMS Broadcasts'],
      colorTheme: 'purple',
    },
  ],

  // Section 2: Guesty Airbnb Integration Services
  businessTypesTitle: 'Guesty Airbnb Integration Services',
  businessTypesIntro: 'Airbnb remains a major channel for vacation rental bookings. A reliable Guesty Airbnb integration allows property managers to synchronise reservations, availability, pricing, and guest details across both platforms. Our developers analyse your workflow and create solutions that reduce manual tasks and improve operational efficiency.',
  businessTypesItems: [
    {
      title: 'Real-time Booking Updates',
      desc: 'Instant 2-way data flow that captures guest booking modifications, cancellations, and extensions instantly across Guesty and Airbnb.',
      metric: '< 1 sec',
      metricLabel: 'Sync Latency',
    },
    {
      title: 'Calendar Synchronisation',
      desc: 'Sub-second calendar availability mirroring across all listings to ensure zero double-bookings across multiple distribution channels.',
      metric: '100%',
      metricLabel: 'Parity Guarantee',
    },
    {
      title: 'Automated Reservation Data Transfer',
      desc: 'Complete automated ingestion of guest counts, check-in timestamps, custom guest notes, and payout structures directly into Guesty.',
      metric: '0 Errors',
      metricLabel: 'Data Integrity',
    },
    {
      title: 'Guest Profile Management',
      desc: 'Unified guest identity resolution, past stay history, verified phone/email aggregation, and automated guest verification pipelines.',
      metric: '360°',
      metricLabel: 'Guest Profile',
    },
    {
      title: 'Property Information Updates',
      desc: 'Centralised listing content distribution including dynamic nightly pricing, house rules, amenity updates, and check-in guide dispatches.',
      metric: 'Multi-Unit',
      metricLabel: 'Bulk Push',
    },
  ],

  // Section 3: Guesty API Integration Development
  techTitle: 'Guesty API Integration Development',
  techDesc: 'Guesty provides API access that allows businesses to create custom connections with external applications. Cubixsol develops API-based solutions that allow your systems to exchange data securely. Our developers follow secure coding practices to create reliable solutions that support business growth.',
  tech: [
    'Custom API Development',
    'Third-party Software Connections',
    'Data Synchronisation Solutions',
    'Workflow Automation Systems',
    'Existing Integration Improvements',
  ],

  // Section 4: Guesty Smart Lock Integration
  outcomesTitle: 'Guesty Smart Lock Integration & Automated Keyless Check-in',
  outcomesIntro: 'Modern rental businesses use smart locks to provide convenient guest access without traditional keys. Cubixsol connects Guesty with smart lock systems to create smoother check-in experiences.',
  outcomesDesc: 'The solution allows property managers to provide flexible access options for guests across multiple locations.',
  outcomes: [
    'Automated access code creation based on check-in/check-out timestamps',
    'Guest arrival management with live unlock alerts for staff and managers',
    'Remote property access control for cleaning crews, maintenance, and guests',
    'Improved security processes with automated code revocation after checkout',
  ],

  // Section 5: Our Guesty Integration Process
  serviceProcessTitle: 'Our Guesty Integration Process',
  serviceProcessIntro: 'Cubixsol follows a structured development process for every Guesty project to ensure seamless connectivity, bulletproof security, and zero disruption to active reservations:',
  serviceProcessSteps: [
    {
      stepNumber: '01',
      title: 'Requirement Analysis',
      desc: 'Our team studies your business needs, existing PMS tools, listing setup, and desired automation outcomes to architect the optimal integration strategy.',
      points: ['Workflow Auditing', 'Tech Stack Evaluation', 'Milestone Roadmapping'],
    },
    {
      stepNumber: '02',
      title: 'API Planning',
      desc: 'Developers review available Guesty Open APIs, webhooks, and third-party endpoints to design the connection architecture and data mapping logic.',
      points: ['API Architecture Design', 'Webhook Event Schemas', 'Security & Auth Mapping'],
    },
    {
      stepNumber: '03',
      title: 'Development',
      desc: 'Our experts build and configure the required integration features, custom microservices, database bridges, and real-time syncing pipelines.',
      points: ['Custom Connector Build', 'Bidirectional Sync Engine', 'Fail-safe Retry Logic'],
    },
    {
      stepNumber: '04',
      title: 'Testing',
      desc: 'The solution passes detailed end-to-end checks, stress tests, edge-case simulation, and sandbox validation before deployment to live properties.',
      points: ['Edge-case Simulation', 'High-load Concurrency Testing', 'Live Data Verification'],
    },
    {
      stepNumber: '05',
      title: 'Support',
      desc: 'Cubixsol provides technical assistance, 24/7 uptime monitoring, API version migration support, and ongoing feature enhancements after project completion.',
      points: ['Proactive Monitoring', '24/7 Priority Support', 'Continuous Optimization'],
    },
  ],

  // Section 6: Why Choose Cubixsol For Guesty Integration?
  whyChooseTitle: 'Why Choose Cubixsol For Guesty Integration?',
  whyChooseIntro: 'Cubixsol combines software development expertise with PMS integration knowledge to create solutions for vacation rental companies. Our team focuses on secure connections, scalable architecture, and business-focused results.',
  whyChooseItems: [
    {
      title: 'Deep PMS & Guesty Domain Expertise',
      desc: 'We understand the unique complexities of vacation rental operations, multi-calendar synchronization, channel management, and guest communication.',
      metric: '10+ Yrs',
      metricLabel: 'PMS Experience',
    },
    {
      title: 'Enterprise Security & Compliance',
      desc: 'Bank-grade encryption, OAuth2 token rotation, PCI-DSS compliant payment pathways, and secure webhook validation for all connected systems.',
      metric: '256-bit',
      metricLabel: 'AES Encryption',
    },
    {
      title: 'Scalable Microservice Architecture',
      desc: 'Engineered to handle high booking volumes during peak tourist seasons without latency spikes, dropped webhooks, or calendar sync failures.',
      metric: '99.99%',
      metricLabel: 'SLA Uptime',
    },
    {
      title: 'Tailored To Your Exact Business Model',
      desc: 'Whether you manage 10 luxury villas or 1,000+ urban apartments, we build custom Guesty connections designed strictly around your specific workflows.',
      metric: '100%',
      metricLabel: 'Custom Fit',
    },
  ],

  // FAQs
  faqs: [
    {
      q: 'What is Guesty API integration and how does it help vacation rental managers?',
      a: 'Guesty API integration allows your Property Management System (PMS) to automatically communicate and exchange data with external tools such as Airbnb, VRBO, smart locks, payment gateways, and accounting platforms. This eliminates repetitive manual data entry, prevents double-bookings, automates check-ins, and creates a unified operational workflow.',
    },
    {
      q: 'How does Guesty Smart Lock integration work for guest check-in?',
      a: 'When a reservation is confirmed in Guesty, our integration automatically generates a unique 4-to-6 digit PIN code on your smart locks (e.g. Yale, Schlage, August, RemoteLock) that only activates at check-in time and automatically expires at check-out. The guest receives this code along with check-in instructions via automated SMS or email.',
    },
    {
      q: 'Can you integrate Guesty with accounting software like QuickBooks or Xero?',
      a: 'Yes. We build custom 2-way sync bridges that export reservation payouts, host fees, cleaning fees, and sales taxes from Guesty directly into QuickBooks or Xero, ensuring flawless financial books without manual bookkeeping.',
    },
    {
      q: 'Will integrating new tools disrupt our active bookings or current Guesty setup?',
      a: 'No. All integration pipelines are built and verified in sandbox environments with mock reservations first. We execute zero-downtime deployment with fail-safe retry mechanisms to ensure active bookings and calendar availabilities are never affected.',
    },
    {
      q: 'Can Cubixsol connect custom internal CRM or proprietary software with Guesty?',
      a: 'Yes. Guesty provides robust REST APIs and Webhook capabilities. Our senior backend engineers build bespoke API endpoints and serverless webhooks that connect any custom CRM, mobile application, or internal portal with Guesty.',
    },
  ],

  seo: {
    metaTitle: 'Guesty Integration Services | Custom Guesty API & Smart Lock Solutions | Cubixsol',
    metaDescription: 'Cubixsol provides expert Guesty integration services for vacation rentals. Connect Guesty with Airbnb, smart locks, CRMs, payment gateways & custom APIs.',
    keywords: 'Guesty integration services, Guesty API development, Guesty Airbnb integration, Guesty smart lock integration, PMS integration vacation rentals',
  },
};

export default function GuestyIntegration() {
  const { openModal } = useEstimateModal();
  const [data, setData] = useState(DEFAULT_DATA);
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  // Live Interactive Smart Lock & PMS Simulator States
  const [simState, setSimState] = useState({
    bookingActive: true,
    guestName: 'Sophia Montgomery',
    propertyName: 'Aspen Luxury Chalet #4',
    pinCode: '849201',
    lockStatus: 'Locked (Secure)',
    airbnbSync: 'Synchronized',
    payoutStatus: 'Captured ($1,850)',
    cleaningAlert: 'Scheduled for 11:00 AM Checkout',
    lastEvent: 'Guest checked in at 3:14 PM via Smart Pin',
    isSyncing: false,
  });

  // SEO Metadata Hook
  useSEO(data?.seo, {
    title: data.title ? `${data.title} | Cubixsol` : 'Guesty PMS Integration Services | Cubixsol',
    description: data.heroDesc || data.desc || 'Seamlessly connect Guesty with Airbnb, smart locks, payment gateways, cleaning dispatch, and custom direct booking platforms.',
    keywords: data.seo?.keywords || 'Guesty integration, Guesty PMS, PMS API development, Cubixsol',
    canonicalUrl: 'https://cubixsol.com/guesty-integration',
  });

  // Dynamic MongoDB Synchronization & Admin Dashboard Integration
  useEffect(() => {
    apiFetch('services/guesty-integration')
      .then((res) => {
        if (res && (res.title || res.heroSubtitle || res.desc)) {
          setData((prev) => ({
            ...prev,
            ...res,
            seo: res.seo || prev.seo,
            title: res.title || prev.title,
            heroTitle: res.heroSubtitle || res.title || prev.heroTitle,
            heroDesc: res.longDesc || res.desc || prev.heroDesc,
            subServicesTitle: res.subServicesTitle || prev.subServicesTitle,

            subServicesIntro: res.subServicesIntro || prev.subServicesIntro,
            subServicesItems: res.subServicesItems?.length > 0
              ? res.subServicesItems.map((item, idx) => ({
                  ...prev.subServicesItems[idx % prev.subServicesItems.length],
                  title: item.title,
                  desc: item.desc,
                }))
              : prev.subServicesItems,
            businessTypesTitle: res.businessTypesTitle || prev.businessTypesTitle,
            businessTypesIntro: res.businessTypesIntro || prev.businessTypesIntro,
            businessTypesItems: res.businessTypesItems?.length > 0
              ? res.businessTypesItems.map((item, idx) => ({
                  ...prev.businessTypesItems[idx % prev.businessTypesItems.length],
                  title: item.title,
                  desc: item.desc,
                }))
              : prev.businessTypesItems,
            techTitle: res.techTitle || prev.techTitle,
            techDesc: res.techDesc || prev.techDesc,
            tech: res.tech?.length > 0 ? res.tech : prev.tech,
            outcomes: res.outcomes?.length > 0 ? res.outcomes : prev.outcomes,
            serviceProcessTitle: res.serviceProcessTitle || prev.serviceProcessTitle,
            serviceProcessIntro: res.serviceProcessIntro || prev.serviceProcessIntro,
            serviceProcessSteps: res.serviceProcessSteps?.length > 0
              ? res.serviceProcessSteps.map((s, idx) => ({
                  stepNumber: s.stepNumber || `0${idx + 1}`,
                  title: s.title,
                  desc: s.desc,
                  points: s.points || prev.serviceProcessSteps[idx % prev.serviceProcessSteps.length]?.points || [],
                }))
              : prev.serviceProcessSteps,
            whyChooseTitle: res.whyChooseTitle || prev.whyChooseTitle,
            whyChooseIntro: res.whyChooseIntro || prev.whyChooseIntro,
            whyChooseItems: res.whyChooseItems?.length > 0
              ? res.whyChooseItems.map((w, idx) => ({
                  ...prev.whyChooseItems[idx % prev.whyChooseItems.length],
                  title: w.title,
                  desc: w.desc,
                }))
              : prev.whyChooseItems,
            faqs: res.faqs?.length > 0 ? res.faqs : prev.faqs,
          }));
        }
      })
      .catch((err) => {
        console.warn('Using default static Guesty integration data:', err);
      });
  }, []);

  // Simulator actions
  const triggerNewBooking = () => {
    setSimState((prev) => ({ ...prev, isSyncing: true, lastEvent: 'Processing new Airbnb reservation webhook...' }));
    setTimeout(() => {
      const randomPin = Math.floor(100000 + Math.random() * 900000).toString();
      const guestNames = ['Alexander Vance', 'Elena Rostova', 'Marcus Brody', 'Clara Henderson', 'Liam O\'Connor'];
      const nextGuest = guestNames[Math.floor(Math.random() * guestNames.length)];
      setSimState({
        bookingActive: true,
        guestName: nextGuest,
        propertyName: 'Oceanfront Villa Suite #12',
        pinCode: randomPin,
        lockStatus: 'Code Generated & Synced',
        airbnbSync: 'Live 2-Way Synced',
        payoutStatus: 'Deposit Held ($2,400)',
        cleaningAlert: 'Auto-Dispatched to Housekeeping App',
        lastEvent: `Reservation confirmed for ${nextGuest}. Smart Lock PIN ${randomPin} pushed to guest mobile.`,
        isSyncing: false,
      });
    }, 700);
  };

  const toggleLockState = () => {
    setSimState((prev) => ({
      ...prev,
      lockStatus: prev.lockStatus === 'Unlocked' ? 'Locked (Secure)' : 'Unlocked',
      lastEvent: prev.lockStatus === 'Unlocked'
        ? 'Smart Lock engaged. Guesty occupancy status updated.'
        : `Smart Lock unlocked by guest ${prev.guestName} with PIN ${prev.pinCode}. Welcome SMS triggered!`,
    }));
  };

  return (
    <div className="min-h-screen bg-white text-ink selection:bg-[#00a4d8] selection:text-white overflow-x-hidden font-sans">
      
      {/* ================= 1. HERO SECTION (Cubixsol Midnight & Brand Cyan/Purple Theme) ================= */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 bg-gradient-to-br from-slate-950 via-[#071326] to-[#040e1c] text-white">
        
        {/* Brand Glow Meshes (Cyan #00a4d8 & Purple #5d53a3) */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#00a4d8]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-[#5d53a3]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link
              to="/all-services"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition group"
            >
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" /> Back to Services
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Eyebrow badge matching Logo Colors */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00a4d8]/15 border border-[#00a4d8]/30 text-cyan-300 text-xs font-bold uppercase tracking-wider shadow-sm backdrop-blur-sm"
              >
                <Radio className="w-3.5 h-3.5 text-[#00a4d8] animate-pulse" />
                <span>{data.heroEyebrow || 'GUESTY INTEGRATION SERVICES'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </motion.div>

              {/* Main H1 Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.18]"
              >
                Custom <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a4d8] via-cyan-300 to-[#5d53a3]">Guesty Integration</span> Solutions For Vacation Rentals
              </motion.h1>

              {/* Hero Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal"
              >
                {data.heroDesc}
              </motion.p>

              {/* Trust Badges Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2"
              >
                {data.heroBadges.map((badge, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-sm hover:border-[#00a4d8]/40 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-lg bg-[#00a4d8]/15 border border-[#00a4d8]/30 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-300" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-slate-200">{badge}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap items-center gap-4 pt-4"
              >
                <button
                  type="button"
                  onClick={() => openModal({ service: 'Guesty Integration Services' })}
                  className="btn-primary text-sm sm:text-base px-7 py-3.5"
                >
                  <span>{data.ctaPrimaryText || 'Schedule A Guesty Consultation'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#simulation-section"
                  className="px-6 py-3.5 rounded-lg font-semibold text-sm sm:text-base text-slate-200 bg-white/10 hover:bg-white/15 border border-white/20 transition-all flex items-center gap-2"
                >
                  <Cpu className="w-4 h-4 text-[#00a4d8]" />
                  <span>Explore Live Architecture</span>
                </a>
              </motion.div>
            </div>

            {/* Right Column: Interactive PMS Live Sync Visualizer */}
            <div className="lg:col-span-5" id="simulation-section">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative rounded-2xl bg-gradient-to-b from-[#0a1628]/95 to-[#040e1c]/95 border border-[#00a4d8]/30 shadow-[0_10px_40px_rgba(0,164,216,0.15)] backdrop-blur-xl p-5 sm:p-6 overflow-hidden"
              >
                {/* Header of Visualizer */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-xs font-mono text-slate-400 ml-1">guesty_sync_daemon.v2</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>2-WAY ACTIVE</span>
                  </div>
                </div>

                {/* Central Guesty Engine Hub */}
                <div className="py-4 space-y-4">
                  {/* Property Banner */}
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-mono tracking-wider text-[#00a4d8] font-bold">Active PMS Property</div>
                      <div className="text-sm font-semibold text-white">{simState.propertyName}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Current Guest</div>
                      <div className="text-xs font-medium text-slate-200">{simState.guestName}</div>
                    </div>
                  </div>

                  {/* 4 Connected Nodes Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    
                    {/* Node 1: Airbnb Calendar */}
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-cyan-400 font-bold flex items-center gap-1">
                          <Share2 className="w-3 h-3 text-[#00a4d8]" /> Airbnb
                        </span>
                        <span className="text-[10px] text-emerald-400 font-mono">Synced</span>
                      </div>
                      <div className="text-[11px] text-slate-300 font-mono">{simState.airbnbSync}</div>
                    </div>

                    {/* Node 2: Smart Lock Status */}
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#a594f9] font-bold flex items-center gap-1">
                          <KeyRound className="w-3 h-3 text-[#5d53a3]" /> Smart Lock
                        </span>
                        <span className="text-[10px] text-cyan-300 font-mono">PIN: {simState.pinCode}</span>
                      </div>
                      <div className="text-[11px] text-slate-300 font-mono">{simState.lockStatus}</div>
                    </div>

                    {/* Node 3: Payment Payout */}
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <CreditCard className="w-3 h-3" /> Stripe Gateway
                        </span>
                        <span className="text-[10px] text-emerald-400 font-mono">Captured</span>
                      </div>
                      <div className="text-[11px] text-slate-300 font-mono">{simState.payoutStatus}</div>
                    </div>

                    {/* Node 4: Operations & Turnover */}
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#00a4d8] font-bold flex items-center gap-1">
                          <Building2 className="w-3 h-3" /> Operations
                        </span>
                        <span className="text-[10px] text-cyan-300 font-mono">Ready</span>
                      </div>
                      <div className="text-[11px] text-slate-300 font-mono truncate">{simState.cleaningAlert}</div>
                    </div>
                  </div>

                  {/* Live Terminal Output */}
                  <div className="p-3 rounded-xl bg-black/90 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-500 text-[10px]">
                      <Terminal className="w-3 h-3 text-[#00a4d8]" />
                      <span>LIVE WEBHOOK STREAM</span>
                    </div>
                    <div className="text-cyan-300 text-[11px] leading-relaxed break-words">
                      {simState.isSyncing ? (
                        <span className="flex items-center gap-2 text-white">
                          <RefreshCw className="w-3 h-3 animate-spin text-[#00a4d8]" />
                          Processing Guesty API payload...
                        </span>
                      ) : (
                        `> ${simState.lastEvent}`
                      )}
                    </div>
                  </div>

                  {/* Simulation Controls */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      disabled={simState.isSyncing}
                      onClick={triggerNewBooking}
                      className="px-3 py-2 rounded-lg bg-[#00a4d8]/20 hover:bg-[#00a4d8]/30 border border-[#00a4d8]/40 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Simulate New Booking</span>
                    </button>

                    <button
                      type="button"
                      onClick={toggleLockState}
                      className="px-3 py-2 rounded-lg bg-[#5d53a3]/30 hover:bg-[#5d53a3]/40 border border-[#5d53a3]/50 text-purple-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      {simState.lockStatus.includes('Unlocked') ? (
                        <>
                          <Lock className="w-3.5 h-3.5 text-rose-400" />
                          <span>Engage Smart Lock</span>
                        </>
                      ) : (
                        <>
                          <Unlock className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Trigger Guest Unlock</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Footer Metrics */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>API Uptime: <strong className="text-emerald-400">99.99%</strong></span>
                  <span>Payload Latency: <strong className="text-[#00a4d8]">&lt; 180ms</strong></span>
                  <span>Sync Mode: <strong className="text-[#a594f9]">Bidirectional</strong></span>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 2. SECTION 1: CONNECT GUESTY WITH ESSENTIAL BUSINESS TOOLS ================= */}
      <section className="py-20 md:py-24 bg-slate-50/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/20 text-[#00a4d8] text-xs font-bold uppercase tracking-wider">
              <Workflow className="w-3.5 h-3.5" />
              <span>ECOSYSTEM INTEGRATIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              {data.subServicesTitle || 'Connect Guesty With Your Essential Business Tools'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {data.subServicesIntro || 'A successful rental operation requires smooth communication between different platforms. Cubixsol creates Guesty integrations that connect your PMS with important business applications:'}
            </p>
          </div>

          {/* 6 High-Converting Cards in Clean Brand White Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {data.subServicesItems.map((item, idx) => {
              const IconComp = idx === 0 ? Share2 : idx === 1 ? Workflow : idx === 2 ? CreditCard : idx === 3 ? KeyRound : idx === 4 ? PieChart : MessageSquare;
              const isCyan = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="group relative rounded-2xl bg-white border border-gray-100 hover:border-[#00a4d8]/40 shadow-card hover:shadow-soft p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                        isCyan ? 'bg-[#00a4d8]/10 text-[#00a4d8]' : 'bg-[#5d53a3]/10 text-[#5d53a3]'
                      }`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        {item.tag || `MODULE 0${idx + 1}`}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-ink group-hover:text-[#00a4d8] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-2 font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-gray-100">
                    <div className="flex flex-wrap gap-1.5">
                      {(item.pills || ['2-Way Sync', 'Automated', 'Enterprise API']).map((pill, pIdx) => (
                        <span
                          key={pIdx}
                          className="text-[10px] font-semibold px-2.5 py-1 rounded-md bg-slate-50 border border-gray-200 text-slate-700"
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= 3. SECTION 2: GUESTY AIRBNB INTEGRATION SERVICES ================= */}
      <section className="py-20 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Text Details & Feature Breakdown */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/20 text-[#00a4d8] text-xs font-bold uppercase tracking-wider">
                <Share2 className="w-3.5 h-3.5" />
                <span>BIDIRECTIONAL CHANNEL SYNC</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
                {data.businessTypesTitle || 'Guesty Airbnb Integration Services'}
              </h2>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {data.businessTypesIntro || 'Airbnb remains a major channel for vacation rental bookings. A reliable Guesty Airbnb integration allows property managers to synchronise reservations, availability, pricing, and guest details across both platforms. Our developers analyse your workflow and create solutions that reduce manual tasks and improve operational efficiency.'}
              </p>

              <div className="space-y-3 pt-2">
                {data.businessTypesItems.map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50/80 border border-gray-200/80 hover:border-[#00a4d8]/40 transition-colors flex items-start gap-3.5"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#00a4d8]/15 border border-[#00a4d8]/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-[#00a4d8]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm sm:text-base font-bold text-ink">{feature.title}</h4>
                        {feature.metric && (
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white text-[#00a4d8] border border-[#00a4d8]/30 font-bold">
                            {feature.metric}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Modern 2-Way Sync Engine Mockup */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl bg-gradient-to-br from-slate-950 via-[#071326] to-[#040e1c] border border-slate-800 p-6 sm:p-8 space-y-6 text-white shadow-xl">
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 text-[#00a4d8] animate-spin" />
                      Guesty &harr; Airbnb Multi-Listing Bridge
                    </h3>
                    <p className="text-xs text-slate-400">Zero-latency event synchronization pipeline</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#00a4d8]/15 border border-[#00a4d8]/30 text-cyan-300 text-xs font-mono">
                    ONLINE
                  </span>
                </div>

                {/* Listing Visual Matrix */}
                <div className="space-y-3">
                  {[
                    { id: 'GB-904', name: 'Downtown Penthouse #402', rate: '$420/night', status: 'Booked on Airbnb', sync: 'Calendar Blocked on Guesty' },
                    { id: 'GB-905', name: 'Malibu Coastal Retreat', rate: '$950/night', status: 'Guest Check-in Complete', sync: 'Smart Lock Active' },
                    { id: 'GB-906', name: 'Vail Ski Chalet 2A', rate: '$610/night', status: 'Rate Parity Updated', sync: 'Dynamic Pricing Live' },
                  ].map((listing, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-slate-500">{listing.id}</span>
                          <span className="text-xs sm:text-sm font-semibold text-white">{listing.name}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{listing.status} &bull; <span className="text-[#00a4d8] font-mono font-bold">{listing.rate}</span></div>
                      </div>
                      <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-mono bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{listing.sync}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Micro Benchmark Stats */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800">
                  <div className="text-center p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="text-lg font-bold text-white font-mono">0.4s</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Avg Sync Speed</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="text-lg font-bold text-emerald-400 font-mono">0</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Overbookings</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="text-lg font-bold text-[#00a4d8] font-mono">100%</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Rate Accuracy</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 4. SECTION 3: GUESTY API INTEGRATION DEVELOPMENT ================= */}
      <section className="py-20 md:py-24 bg-slate-50/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5d53a3]/10 border border-[#5d53a3]/20 text-[#5d53a3] text-xs font-bold uppercase tracking-wider">
              <Code2 className="w-3.5 h-3.5" />
              <span>CUSTOM DEVELOPER ARCHITECTURE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              {data.techTitle || 'Guesty API Integration Development'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {data.techDesc || 'Guesty provides API access that allows businesses to create custom connections with external applications. Cubixsol develops API-based solutions that allow your systems to exchange data securely. Our developers follow secure coding practices to create reliable solutions that support business growth.'}
            </p>
          </div>

          {/* 5 Core API Development Capabilities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 mb-12">
            {[
              { title: 'Custom API Development', desc: 'Bespoke microservices & REST/GraphQL endpoints designed strictly for your proprietary business tools.', icon: Code2 },
              { title: 'Third-party Connections', desc: 'Seamless API bridging between Guesty Open API and external CRMs, OTAs, POS, & accounting ledgers.', icon: Share2 },
              { title: 'Data Synchronisation', desc: 'High-throughput bi-directional data pipelines with idempotency keys and error recovery queues.', icon: RefreshCw },
              { title: 'Workflow Automation', desc: 'Serverless event triggers for auto-messaging, security deposit processing, and turnover dispatch.', icon: Zap },
              { title: 'Integration Improvements', desc: 'Refactoring legacy connectors to modern Guesty V2 API standards to reduce latency and eliminate bugs.', icon: Sparkles },
            ].map((srv, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-gray-100 hover:border-[#00a4d8]/40 shadow-card hover:shadow-soft transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#00a4d8]/10 border border-[#00a4d8]/20 flex items-center justify-center text-[#00a4d8] mb-4">
                    <srv.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-ink">{srv.title}</h3>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">{srv.desc}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center text-[11px] font-bold text-[#00a4d8]">
                  <span>Guaranteed SLA</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Guesty Webhook Payload Viewer */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-950 via-[#071326] to-[#040e1c] border border-slate-800 p-5 sm:p-6 font-mono text-xs text-slate-300 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#00a4d8]/20 text-cyan-300 font-bold">POST /v2/guesty/webhook</span>
                <span className="text-slate-400">event: reservation.created</span>
              </div>
              <div className="text-slate-400 text-[11px]">HMAC-SHA256 Verified</div>
            </div>
            <pre className="mt-4 overflow-x-auto text-[11px] sm:text-xs text-slate-300 leading-relaxed font-mono">
{`{
  "event": "reservation.created",
  "reservationId": "res_9847291a8",
  "listingId": "listing_aspen_04",
  "guest": {
    "name": "Sophia Montgomery",
    "phone": "+1 (555) 019-2834",
    "email": "sophia.m@example.com"
  },
  "dates": {
    "checkIn": "2026-10-12T15:00:00Z",
    "checkOut": "2026-10-16T11:00:00Z"
  },
  "automatedActions": [
    { "target": "smartlock", "action": "generate_pin", "code": "849201", "status": "ACTIVE" },
    { "target": "stripe", "action": "preauth_deposit", "amount": 500, "status": "HELD" },
    { "target": "quickbooks", "action": "sync_invoice", "status": "RECORDED" }
  ]
}`}
            </pre>
          </div>

        </div>
      </section>

      {/* ================= 5. SECTION 4: GUESTY SMART LOCK INTEGRATION ================= */}
      <section className="py-20 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Smart Lock Interactive Simulator Widget */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-[#071326] to-[#040e1c] border border-[#00a4d8]/30 p-6 sm:p-8 space-y-6 shadow-xl text-white">
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#00a4d8]/20 border border-[#00a4d8]/40 flex items-center justify-center text-cyan-300">
                      <KeyRound className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Guesty Smart Lock Engine</h3>
                      <p className="text-xs text-slate-400">August / Yale / Schlage / RemoteLock Hub</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#00a4d8]/15 text-cyan-300 text-xs font-mono border border-[#00a4d8]/30 font-bold">
                    KEYLESS ACCESS
                  </span>
                </div>

                {/* Interactive Keypad UI */}
                <div className="p-6 rounded-2xl bg-black/60 border border-slate-800 text-center space-y-4">
                  <div className="text-xs uppercase font-mono text-slate-400">Automated Dynamic PIN Code</div>
                  <div className="inline-block px-6 py-3 rounded-xl bg-slate-900 border border-[#00a4d8]/40 font-mono text-3xl font-black text-cyan-300 tracking-[0.3em] shadow-inner">
                    {simState.pinCode}
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Valid from 3:00 PM Check-In to 11:00 AM Check-Out</span>
                  </div>
                </div>

                {/* 4 Feature Highlights in Lock Simulator */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-1">
                    <div className="font-semibold text-white flex items-center gap-1.5">
                      <Wifi className="w-3.5 h-3.5 text-[#00a4d8]" />
                      <span>Remote Lock Control</span>
                    </div>
                    <div className="text-slate-400 text-[11px]">Instant unlock via Guesty dashboard for cleaners or maintenance.</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-1">
                    <div className="font-semibold text-white flex items-center gap-1.5">
                      <Bell className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Arrival Notification</span>
                    </div>
                    <div className="text-slate-400 text-[11px]">Instant alert sent when guest enters PIN code at front door.</div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={triggerNewBooking}
                    className="w-full py-3 rounded-lg font-bold text-xs sm:text-sm bg-primary-gradient hover:opacity-95 text-white flex items-center justify-center gap-2 transition-all shadow-soft"
                  >
                    <RefreshCw className={`w-4 h-4 ${simState.isSyncing ? 'animate-spin' : ''}`} />
                    <span>Generate New Guest PIN Code</span>
                  </button>
                </div>

              </div>
            </div>

            {/* Right: Smart Lock Content */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/20 text-[#00a4d8] text-xs font-bold uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5" />
                <span>KEYLESS PROPERTY AUTOMATION</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
                Guesty Smart Lock Integration
              </h2>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Modern rental businesses use smart locks to provide convenient guest access without traditional keys. Cubixsol connects Guesty with smart lock systems to create smoother check-in experiences.
              </p>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                The solution allows property managers to provide flexible access options for guests across multiple locations. Smart lock integration can support:
              </p>

              <div className="space-y-3 pt-2">
                {data.outcomes.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-50 border border-gray-200/80 hover:border-[#00a4d8]/40 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-lg bg-[#00a4d8]/15 border border-[#00a4d8]/30 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-[#00a4d8]" />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-ink">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => openModal({ service: 'Guesty Smart Lock Integration' })}
                  className="btn-primary text-sm px-6 py-3"
                >
                  <span>Connect Your Smart Locks</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ================= 6. SECTION 5: OUR GUESTY INTEGRATION PROCESS ================= */}
      <section className="py-20 md:py-24 bg-slate-50/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5d53a3]/10 border border-[#5d53a3]/20 text-[#5d53a3] text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>STRUCTURED DELIVERY METHODOLOGY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              {data.serviceProcessTitle || 'Our Guesty Integration Process'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {data.serviceProcessIntro || 'Cubixsol follows a structured development process for every Guesty project to ensure seamless connectivity, bulletproof security, and zero disruption to active reservations:'}
            </p>
          </div>

          {/* 5-Step Process Timeline Pathway in Clean Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6">
            {data.serviceProcessSteps.map((step, idx) => (
              <motion.div
                key={idx}
                onClick={() => setActiveProcessStep(idx)}
                whileHover={{ y: -4 }}
                className={`cursor-pointer rounded-2xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between border ${
                  activeProcessStep === idx
                    ? 'bg-white border-[#00a4d8] shadow-soft'
                    : 'bg-white border-gray-100 shadow-card hover:border-[#00a4d8]/40'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00a4d8] to-[#5d53a3]">
                      {step.stepNumber || `0${idx + 1}`}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${activeProcessStep === idx ? 'bg-[#00a4d8] animate-ping' : 'bg-slate-300'}`} />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-ink">{step.title}</h3>
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed font-normal">{step.desc}</p>
                  </div>
                </div>

                {step.points && step.points.length > 0 && (
                  <div className="pt-4 mt-4 border-t border-gray-100 space-y-1.5">
                    {step.points.map((p, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-1.5 text-[11px] font-medium text-slate-700">
                        <Check className="w-3 h-3 text-[#00a4d8] shrink-0" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= 7. SECTION 6: WHY CHOOSE CUBIXSOL ================= */}
      <section className="py-20 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/20 text-[#00a4d8] text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>PMS SPECIALISTS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              {data.whyChooseTitle || 'Why Choose Cubixsol For Guesty Integration?'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {data.whyChooseIntro || 'Cubixsol combines software development expertise with PMS integration knowledge to create solutions for vacation rental companies. Our team focuses on secure connections, scalable architecture, and business-focused results.'}
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {data.whyChooseItems.map((item, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-slate-50/80 border border-gray-200/80 hover:border-[#00a4d8]/40 shadow-card transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#00a4d8]/10 border border-[#00a4d8]/20 flex items-center justify-center text-[#00a4d8]">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    {item.metric && (
                      <div className="text-right">
                        <div className="text-xl font-extrabold text-ink font-mono">{item.metric}</div>
                        <div className="text-[10px] uppercase font-mono text-gray-500 font-bold">{item.metricLabel}</div>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-ink">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed font-normal">{item.desc}</p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-200 flex items-center gap-2 text-xs font-semibold text-[#00a4d8]">
                  <CheckCircle className="w-4 h-4" />
                  <span>Production-Grade Vacation Rental Architecture</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= 8. SECTION 7: FAQS ================= */}
      <section className="py-20 md:py-24 bg-slate-50/70 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/20 text-[#00a4d8] text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              Got Questions About Guesty Integration?
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Clear answers on how we connect, automate, and safeguard your vacation rental operations.
            </p>
          </div>

          <div className="space-y-4">
            {data.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-gray-200/80 shadow-card overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4"
                  >
                    <span className="text-sm sm:text-base font-bold text-ink">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-[#00a4d8] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4 font-normal">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= 9. SECTION 8: BRAND CTA BANNER ================= */}
      <section className="py-12 md:py-16">
        <CtaBanner
          eyebrow="SCALE YOUR VACATION RENTAL PORTFOLIO"
          title="Ready To Connect Guesty With Your Favorite Business Tools?"
          desc="Whether you need 2-way Airbnb synchronisation, automated smart lock check-in, CRM connectivity, or custom API development, Cubixsol delivers Guesty solutions designed around your requirements."
          buttonText="Schedule A Free Discovery Call"
          onClick={() => openModal({ service: 'Guesty Integration Services' })}
        />
      </section>

    </div>
  );
}
