import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Building,
  Terminal,
  Calendar,
  CreditCard,
  KeyRound,
  MessageSquare,
  TrendingUp,
  Share2,
  Globe,
  Users,
  PieChart,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  Clock,
  Server,
  Code2,
  Cpu,
  Lock,
  RefreshCw,
  Sliders,
  Send,
  Wifi,
  Smartphone,
  Check
} from 'lucide-react';
import DynamicIcon from '../components/DynamicIcon';
import { useEstimateModal } from '../context/EstimateModalContext';
import { apiFetch } from '../utils/api';
import { useSEO } from '../utils/seo';

// Default static fallback data (Exact word-for-word from document)
const defaultMewsData = {
  slug: 'mews-integration',
  title: 'Mews Integration Services',
  heroEyebrow: 'MEWS INTEGRATION SERVICES',
  heroTitle: 'Custom Mews Integration Solutions For Modern Hospitality Operations',
  heroSubtitle: 'Custom Mews Integration Solutions For Modern Hospitality Operations',
  desc: 'Cubixsol provides professional Mews integration services that help hotels, serviced apartments, and hospitality businesses connect their cloud property management system with advanced digital solutions. Our developers create customised integrations that improve automation, simplify operations, and enable seamless communication between different hospitality platforms.',
  additionalParagraph: 'Modern hospitality businesses require connected systems to manage guest services, reservations, and internal operations efficiently. We develop Mews integrations that connect your PMS with essential applications, including booking channels and online travel agencies, direct booking websites, payment platforms, CRM and guest engagement systems, smart locks and access control solutions, accounting software, revenue management platforms, and business intelligence tools.',
  heroPrimaryBtnText: 'Schedule A Mews Consultation',
  heroSecondaryBtnText: 'Explore Mews Solutions',
  subServicesTitle: 'Connect Mews With Your Hospitality Technology Stack',
  subServicesIntro: 'Modern hospitality businesses require connected systems to manage guest services, reservations, and internal operations efficiently. We develop Mews integrations that connect your PMS with essential applications, including:',
  subServicesItems: [
    {
      icon: 'Share2',
      tag: 'BOOKING CHANNELS & OTAS',
      title: 'Booking channels and online travel agencies.',
      desc: 'Seamless two-way distribution across global online travel agencies and channel managers with instant rate and inventory updates.',
      pills: ['Channel Distribution', 'Live Availability', 'Instant Sync'],
      colorTheme: 'cyan'
    },
    {
      icon: 'Globe',
      tag: 'DIRECT BOOKINGS',
      title: 'Direct booking websites.',
      desc: 'Connect custom booking engines and website reservation portals directly to Mews Commander for zero-commission direct bookings.',
      pills: ['Custom Web Engine', 'Direct Reservations', 'Zero Commission'],
      colorTheme: 'purple'
    },
    {
      icon: 'CreditCard',
      tag: 'PAYMENT GATEWAYS',
      title: 'Payment platforms.',
      desc: 'Integrate secure payment gateways with Mews Payments for automatic tokenization, scheduled payments, and terminal synchronization.',
      pills: ['Mews Payments', 'Automated Settlement', 'Card Tokenization'],
      colorTheme: 'cyan'
    },
    {
      icon: 'Users',
      tag: 'GUEST ENGAGEMENT',
      title: 'CRM and guest engagement systems.',
      desc: 'Sync guest profiles, preferences, and stay histories with CRM and automated guest messaging platforms for tailored communication.',
      pills: ['CRM Integration', 'Guest Profiles', 'Loyalty Tracking'],
      colorTheme: 'purple'
    },
    {
      icon: 'KeyRound',
      tag: 'SMART ACCESS',
      title: 'Smart locks and access control solutions.',
      desc: 'Automate digital key generation and pin delivery with keyless smart locks to enable seamless 24/7 self check-in.',
      pills: ['Digital Keycards', 'Keyless Self Check-in', 'Smart Locks'],
      colorTheme: 'cyan'
    },
    {
      icon: 'PieChart',
      tag: 'FINANCIAL LEDGERS',
      title: 'Accounting software.',
      desc: 'Synchronise daily revenue breakdowns, invoices, and payment payouts directly into enterprise accounting solutions.',
      pills: ['QuickBooks & Xero', 'Daily Payout Sync', 'Automated Ledger'],
      colorTheme: 'purple'
    },
    {
      icon: 'TrendingUp',
      tag: 'REVENUE MANAGEMENT',
      title: 'Revenue management platforms.',
      desc: 'Connect dynamic pricing algorithms and RMS platforms to automatically adjust rates based on demand and market occupancy.',
      pills: ['Dynamic Pricing', 'Demand Forecasting', 'Rate Automation'],
      colorTheme: 'cyan'
    },
    {
      icon: 'BarChart3',
      tag: 'ANALYTICS & BI',
      title: 'Business intelligence tools.',
      desc: 'Extract deep multi-property data from Mews into business intelligence dashboards for ADR, RevPAR, and operational reporting.',
      pills: ['BI Dashboards', 'RevPAR & ADR', 'Custom Reports'],
      colorTheme: 'purple'
    }
  ],
  coreSolutionsTitle: 'Core Mews Integration Solutions',
  coreSolutionsIntro: 'Our custom engineering services empower modern hotels and serviced apartments to unlock the full potential of Mews PMS.',
  coreSolutions: [
    {
      id: 'mews-api',
      title: 'Mews API Integration Services',
      subtitle: 'Open API Architecture, Custom Endpoints & Webhook Workflows',
      desc: 'Mews is built around an open API ecosystem that allows businesses to connect external applications and create customised workflows. We provide Mews API integration services that help businesses develop flexible and scalable solutions. Our Mews API services include:',
      icon: 'Terminal',
      badge: 'API SERVICES',
      features: [
        'Custom API development.',
        'Third-party application integration.',
        'Data synchronisation.',
        'Automated workflow creation.',
        'API optimisation and testing.'
      ]
    },
    {
      id: 'booking-reservation',
      title: 'Mews Booking And Reservation Integration',
      subtitle: 'Real-Time Channel Synchronization, Room Inventory & Guest Profiles',
      desc: 'Reservation management requires accurate communication between booking channels and property systems. We help connect Mews with external booking platforms to maintain updated availability, reservations, and guest information. Our reservation integration solutions support:',
      icon: 'Calendar',
      badge: 'RESERVATIONS',
      features: [
        'Real-time booking synchronisation.',
        'Room availability updates.',
        'Guest profile management.',
        'Reservation status tracking.',
        'Automated booking workflows.'
      ]
    },
    {
      id: 'payment-financial',
      title: 'Mews Payment And Financial Integration',
      subtitle: 'Automated Processing, Payment Gateways & Accounting Sync',
      desc: 'Payment processing is an important part of modern hotel operations. Connected financial systems help hospitality businesses improve accuracy and maintain better control over revenue operations. We connect Mews with payment platforms and financial systems to improve transaction management. Our payment integration services include:',
      icon: 'CreditCard',
      badge: 'FINANCIAL & PAYMENTS',
      features: [
        'Payment gateway connections.',
        'Automated payment processing.',
        'Transaction synchronisation.',
        'Billing workflow automation.',
        'Accounting system integration.'
      ]
    },
    {
      id: 'smart-lock-self-service',
      title: 'Mews Smart Lock And Self-Service Integration',
      subtitle: 'Digital Mobile Keys, Self Check-in Kiosks & Remote Access Control',
      desc: 'Technology-driven hotels increasingly use automated access solutions to improve guest convenience. These integrations help hotels provide flexible and convenient experiences while reducing front-desk workload. We integrate Mews with smart lock systems and self-service technologies. Our smart hospitality solutions include:',
      icon: 'KeyRound',
      badge: 'SMART HOSPITALITY',
      features: [
        'Digital key integration.',
        'Automated check-in workflows.',
        'Mobile guest access.',
        'Smart device connectivity.',
        'Remote access management.'
      ]
    },
    {
      id: 'crm-guest-experience',
      title: 'Mews CRM And Guest Experience Integration',
      subtitle: 'Automated Guest Messaging, Loyalty Programs & Tailored Stays',
      desc: 'Guest expectations continue to evolve, and personalised communication has become essential for hospitality businesses. We connect Mews with CRM and communication platforms to improve guest engagement. Our solutions support:',
      icon: 'MessageSquare',
      badge: 'GUEST ENGAGEMENT',
      features: [
        'Automated guest messaging.',
        'Customer profile synchronisation.',
        'Loyalty program connections.',
        'Marketing automation.',
        'Personalised guest workflows.'
      ]
    },
    {
      id: 'revenue-management',
      title: 'Mews Revenue Management Integration',
      subtitle: 'Dynamic Pricing Algorithms, Performance Dashboards & BI Sync',
      desc: 'Revenue optimisation requires accurate data from multiple systems. We help connect Mews with revenue management and analytics platforms to support better business decisions. Our solutions include:',
      icon: 'TrendingUp',
      badge: 'REVENUE OPTIMIZATION',
      features: [
        'Pricing system integration.',
        'Revenue data synchronisation.',
        'Performance reporting.',
        'Analytics dashboard connections.',
        'Business intelligence integration.'
      ]
    }
  ],
  serviceProcessTitle: 'Our Mews Integration Process',
  serviceProcessIntro: 'Cubixsol follows a structured approach to deliver successful Mews integration projects:',
  serviceProcessSteps: [
    {
      stepNumber: '01',
      title: 'Requirement Assessment:',
      desc: 'Our team analyses your hospitality operations, existing software, and integration objectives.'
    },
    {
      stepNumber: '02',
      title: 'Solution Architecture:',
      desc: 'We design a technical framework based on your business requirements.'
    },
    {
      stepNumber: '03',
      title: 'Development And Integration:',
      desc: 'Our developers build secure connections between Mews and selected platforms.'
    },
    {
      stepNumber: '04',
      title: 'Testing And Deployment:',
      desc: 'We verify system performance, security, and data accuracy.'
    },
    {
      stepNumber: '05',
      title: 'Support And Optimization:',
      desc: 'Our team provides ongoing assistance to maintain reliable integration performance.'
    }
  ],
  whyChooseTitle: 'Why Choose Cubixsol For Mews Integration?',
  whyChooseIntro: 'Cubixsol helps hospitality businesses take advantage of Mews’ open and flexible ecosystem through custom integration solutions. Our team focuses on building modern connections that improve automation, enhance guest experiences, and simplify hotel operations.\n\nWe develop Mews integrations that connect reservations, payments, smart technologies, CRM platforms, and business analytics into one efficient workflow. Whether you need API development, automation solutions, or third-party software connectivity, Cubixsol creates Mews integrations that support your operational goals and long-term growth.',
  faqs: [
    {
      q: 'What Mews Integration services does Cubixsol provide?',
      a: 'Cubixsol develops Mews integrations with booking platforms, payment systems, CRM tools, smart devices, revenue management platforms, and custom applications.'
    },
    {
      q: 'Can Mews integrate with third-party applications?',
      a: 'Yes, Mews supports an open API ecosystem, and Cubixsol can create customised integrations with external systems.'
    },
    {
      q: 'Does Cubixsol offer Mews API integration services?',
      a: 'Yes, our developers build API-based solutions that connect Mews with different business applications.'
    },
    {
      q: 'Can Mews integrate with smart lock systems?',
      a: 'Yes, Mews can connect with smart access solutions to support automated check-in and digital guest entry.'
    },
    {
      q: 'How can Mews integration improve hotel operations?',
      a: 'Mews integration helps automate workflows, improve data exchange, and create a more efficient hospitality management system.'
    }
  ],
  seo: {
    metaTitle: 'Mews Integration Services | Custom PMS Solutions | Cubixsol',
    metaDescription: 'Professional Mews PMS integration services by Cubixsol. Connect Mews with open APIs, smart locks, payment gateways, booking channels, and CRMs.',
    keywords: 'Mews integration, Mews PMS API, hotel cloud PMS integration, Mews Commander, smart locks integration, Cubixsol',
    ogTitle: 'Mews Integration Services | Cubixsol',
    ogDescription: 'Custom Mews integration solutions for modern hospitality operations. API development, smart locks, payment processing, and automated guest journeys.',
    ogImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&h=800&q=80',
    canonicalUrl: 'https://cubixsol.com/mews-integration'
  }
};

export default function MewsIntegration() {
  const { openEstimateModal } = useEstimateModal();
  const [data, setData] = useState(defaultMewsData);
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  // SEO Hook
  useSEO(data?.seo, {
    title: 'Mews Integration Services | Custom PMS Solutions | Cubixsol',
    description: 'Professional Mews PMS integration services by Cubixsol. Connect Mews with open APIs, smart locks, payment gateways, booking channels, and CRMs.',
    keywords: 'Mews integration, Mews PMS API, hotel cloud PMS integration, Mews Commander, smart locks integration, Cubixsol',
    ogTitle: 'Mews Integration Services | Cubixsol',
    ogDescription: 'Custom Mews integration solutions for modern hospitality operations.',
    ogImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&h=800&q=80',
    canonicalUrl: 'https://cubixsol.com/mews-integration'
  });


  // Live Terminal interactive simulator state
  const [liveStreamIndex, setLiveStreamIndex] = useState(0);
  const [streamActive, setStreamActive] = useState(true);

  const terminalEvents = [
    {
      event: 'POST /api/connector/v1/reservations/add',
      status: '200 OK',
      time: '0.018s',
      guest: 'Eleanor Vance',
      room: 'Penthouse Suite 402',
      pms: 'Mews Commander',
      action: 'Reservation Synced + Key Pin Dispatched'
    },
    {
      event: 'WEBHOOK: payment.captured',
      status: '200 OK',
      time: '0.024s',
      guest: 'Marcus Sterling',
      room: 'Deluxe Studio 108',
      pms: 'Mews Payments',
      action: 'Folio Settled & Tokenized via Stripe'
    },
    {
      event: 'POST /api/connector/v1/commands/sendKey',
      status: '200 OK',
      time: '0.012s',
      guest: 'Sophia Chen',
      room: 'Executive Loft 305',
      pms: 'Smart Lock IoT Bridge',
      action: 'Mobile Key BLE Access Activated'
    },
    {
      event: 'WEBHOOK: rate.updated.rms',
      status: '200 OK',
      time: '0.015s',
      guest: 'Dynamic Yield Engine',
      room: 'All Property Inventory',
      pms: 'Revenue Manager Bridge',
      action: 'Live ADR Adjusted to €285 (+14% Demand)'
    }
  ];

  useEffect(() => {
    let interval;
    if (streamActive) {
      interval = setInterval(() => {
        setLiveStreamIndex((prev) => (prev + 1) % terminalEvents.length);
      }, 3200);
    }
    return () => clearInterval(interval);
  }, [streamActive]);

  useEffect(() => {
    let isMounted = true;
    apiFetch('services/mews-integration')
      .then((res) => {
        if (isMounted && res && res.slug) {
          setData((prev) => ({
            ...prev,
            ...res,
            seo: res.seo || prev.seo
          }));
        }
      })
      .catch((err) => {
        console.log('Using static fallback for Mews Integration:', err?.message);
      });

    return () => {
      isMounted = false;
    };
  }, []);


  const currentEvent = terminalEvents[liveStreamIndex];

  return (
    <div className="min-h-screen bg-[#07080d] text-slate-100 font-sans selection:bg-[#00a4d8]/30 selection:text-[#00a4d8] overflow-x-hidden">
      {/* ─────────────────────────────────────────────────────────────
          1. HERO SECTION (100% Unique Mews Open API Architecture UI)
         ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 overflow-hidden">
        {/* Ambient Brand Color Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#00a4d8]/15 via-[#5d53a3]/20 to-transparent blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute -top-10 right-10 w-96 h-96 bg-[#5d53a3]/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#00a4d8]/10 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-[#00a4d8]/30 backdrop-blur-md shadow-[0_0_15px_rgba(0,164,216,0.15)]">
                <span className="w-2 h-2 rounded-full bg-[#00a4d8] animate-pulse" />
                <span className="text-xs font-bold tracking-widest text-[#00a4d8] uppercase">
                  {data.heroEyebrow || 'MEWS INTEGRATION SERVICES'}
                </span>
                <span className="text-slate-600">|</span>
                <span className="text-xs font-semibold text-slate-300">Open API & Smart Hospitality</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.9rem] font-extrabold tracking-tight text-white leading-[1.15]">
                Custom <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a4d8] via-[#38bdf8] to-[#5d53a3]">Mews Integration Solutions</span> For Modern Hospitality Operations
              </h1>

              {/* Main Paragraph Description */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                {data.desc}
              </p>

              {/* Additional Paragraph */}
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-sm text-slate-300 leading-relaxed backdrop-blur-sm">
                <p className="font-light">
                  {data.additionalParagraph}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={openEstimateModal}
                  className="px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#00a4d8] to-[#5d53a3] hover:from-[#0093c2] hover:to-[#504691] transition-all duration-300 shadow-[0_4px_25px_rgba(0,164,216,0.3)] hover:shadow-[0_6px_30px_rgba(93,83,163,0.4)] flex items-center gap-2 group cursor-pointer"
                >
                  <span>{data.heroPrimaryBtnText || 'Schedule A Mews Consultation'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="#mews-solutions"
                  className="px-6 py-3.5 rounded-xl font-bold text-sm text-slate-200 bg-slate-900/90 border border-slate-700/80 hover:border-[#00a4d8]/60 hover:text-white transition-all duration-300 flex items-center gap-2"
                >
                  <span>{data.heroSecondaryBtnText || 'Explore Mews Solutions'}</span>
                  <ChevronDown className="w-4 h-4 text-[#00a4d8]" />
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-800/80">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#00a4d8]" />
                  <span className="text-xs text-slate-400 font-medium">Mews Open API Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#5d53a3]" />
                  <span className="text-xs text-slate-400 font-medium">Sub-Second Sync</span>
                </div>
                <div className="flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-[#00a4d8]" />
                  <span className="text-xs text-slate-400 font-medium">Smart Lock Automation</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Visualizer Column: Live Mews Commander & Webhook Terminal */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-[#0d0e17] border border-slate-700/80 shadow-[0_10px_40px_rgba(0,0,0,0.6)] p-5 overflow-hidden backdrop-blur-xl">
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                    <span className="ml-2 text-xs font-mono text-slate-400 font-semibold flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-[#00a4d8]" />
                      mews-cloud-gateway.cubixsol.io
                    </span>
                  </div>
                  <button
                    onClick={() => setStreamActive(!streamActive)}
                    title={streamActive ? 'Pause stream' : 'Resume stream'}
                    className={`text-[10px] px-2.5 py-1 rounded font-mono font-bold flex items-center gap-1 transition-all cursor-pointer ${
                      streamActive
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${streamActive ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
                    {streamActive ? 'LIVE STREAM' : 'PAUSED'}
                  </button>
                </div>

                {/* Active Event Payload Card */}
                <div className="mt-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#00a4d8] font-bold flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5" />
                      EVENT INSPECTOR
                    </span>
                    <span className="text-slate-400 text-[10px] font-semibold">{currentEvent.time}</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-black/60 border border-slate-800/80 text-slate-200">
                    <div className="text-[11px] text-emerald-400 font-bold mb-1">{currentEvent.event}</div>
                    <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400">
                      <div><span className="text-slate-500">Target PMS:</span> {currentEvent.pms}</div>
                      <div><span className="text-slate-500">Status:</span> <span className="text-emerald-400 font-bold">{currentEvent.status}</span></div>
                      <div><span className="text-slate-500">Guest:</span> {currentEvent.guest}</div>
                      <div><span className="text-slate-500">Inventory:</span> {currentEvent.room}</div>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-300 flex items-center gap-1.5 bg-slate-800/40 p-2 rounded">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00a4d8] shrink-0" />
                    <span><strong className="text-white">Action:</strong> {currentEvent.action}</span>
                  </div>
                </div>

                {/* Live Architecture Nodes Visual */}
                <div className="mt-4 pt-3 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center text-[11px]">
                  <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800">
                    <Share2 className="w-4 h-4 mx-auto text-[#00a4d8] mb-1" />
                    <div className="font-bold text-white text-[10px]">OTAs & Engine</div>
                    <div className="text-[9px] text-emerald-400 font-mono">2-Way Sync</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#5d53a3]/15 border border-[#5d53a3]/30">
                    <Building className="w-4 h-4 mx-auto text-[#5d53a3] mb-1" />
                    <div className="font-bold text-white text-[10px]">Mews Commander</div>
                    <div className="text-[9px] text-[#00a4d8] font-mono">Cloud PMS Core</div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800">
                    <KeyRound className="w-4 h-4 mx-auto text-[#00a4d8] mb-1" />
                    <div className="font-bold text-white text-[10px]">Smart Locks</div>
                    <div className="text-[9px] text-emerald-400 font-mono">IoT Keys Live</div>
                  </div>
                </div>

                {/* Event Selector Indicator */}
                <div className="mt-4 flex items-center justify-between pt-2">
                  <div className="text-[10px] text-slate-400 font-mono">Cycle Stream Events:</div>
                  <div className="flex gap-1.5">
                    {terminalEvents.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setLiveStreamIndex(i)}
                        className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                          i === liveStreamIndex ? 'bg-[#00a4d8] w-5' : 'bg-slate-700 hover:bg-slate-500'
                        }`}
                        title={`Select event ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          2. SECTION 1: Connect Mews With Your Hospitality Technology Stack
         ───────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#0a0b12] border-b border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/20 text-[#00a4d8] text-xs font-bold tracking-wider uppercase">
              <Layers className="w-3.5 h-3.5" />
              INTEGRATED HOSPITALITY ECOSYSTEM
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              {data.subServicesTitle}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {data.subServicesIntro}
            </p>
          </div>

          {/* 8-Grid Technology Stack Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.subServicesItems && data.subServicesItems.map((item, idx) => {
              const isCyan = item.colorTheme === 'cyan' || idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className="group relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0d0e17] border border-slate-800 hover:border-[#00a4d8]/50 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_10px_30px_rgba(0,164,216,0.15)] flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Icon & Tag */}
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        isCyan
                          ? 'bg-[#00a4d8]/10 text-[#00a4d8] group-hover:bg-[#00a4d8] group-hover:text-white'
                          : 'bg-[#5d53a3]/10 text-[#5d53a3] group-hover:bg-[#5d53a3] group-hover:text-white'
                      }`}>
                        <DynamicIcon name={item.icon} className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono tracking-wider font-bold text-slate-400 group-hover:text-slate-200">
                        {item.tag || `MODULE 0${idx + 1}`}
                      </span>
                    </div>

                    {/* Exact Title from Document */}
                    <h3 className="text-base font-bold text-white group-hover:text-[#00a4d8] transition-colors leading-snug">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Feature Pills */}
                  {item.pills && (
                    <div className="pt-4 mt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                      {item.pills.map((pill, pIdx) => (
                        <span
                          key={pIdx}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-800/70 text-slate-300 group-hover:bg-[#00a4d8]/10 group-hover:text-[#00a4d8] transition-colors"
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          3. SECTION 2: 6 Core Specialized Modules (Interactive Switcher)
         ───────────────────────────────────────────────────────────── */}
      <section id="mews-solutions" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#07080d] border-b border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5d53a3]/15 border border-[#5d53a3]/30 text-[#9b8fff] text-xs font-bold tracking-wider uppercase">
              <Code2 className="w-3.5 h-3.5" />
              SPECIALIZED INTEGRATION MODULES
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              {data.coreSolutionsTitle || 'Core Mews Integration Solutions'}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {data.coreSolutionsIntro || 'Our custom engineering services empower modern hotels and serviced apartments to unlock the full potential of Mews PMS.'}
            </p>
          </div>

          {/* Module Selector Buttons Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
            {data.coreSolutions && data.coreSolutions.map((sol, index) => {
              const active = activeTab === index;
              return (
                <button
                  key={sol.id || index}
                  onClick={() => setActiveTab(index)}
                  className={`p-4 rounded-xl text-left transition-all duration-300 flex flex-col justify-between border cursor-pointer ${
                    active
                      ? 'bg-gradient-to-b from-[#00a4d8]/20 to-[#5d53a3]/20 border-[#00a4d8] shadow-[0_0_20px_rgba(0,164,216,0.2)]'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-3">
                    <div className={`p-2 rounded-lg ${
                      active ? 'bg-[#00a4d8] text-white' : 'bg-slate-800 text-slate-400'
                    }`}>
                      <DynamicIcon name={sol.icon} className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">0{index + 1}</span>
                  </div>
                  <div className={`text-xs font-bold leading-tight ${active ? 'text-white' : 'text-slate-300'}`}>
                    {sol.title.replace('Mews ', '')}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Module Detailed View */}
          {data.coreSolutions && data.coreSolutions[activeTab] && (
            <div className="rounded-3xl bg-gradient-to-br from-[#0e0f1a] to-[#0a0b12] border border-slate-800 p-8 sm:p-10 lg:p-12 relative overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
              {/* Background ambient element */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#00a4d8]/5 blur-3xl pointer-events-none rounded-full" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* Left Detail Content */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00a4d8]/10 text-[#00a4d8] text-xs font-bold font-mono tracking-wider uppercase border border-[#00a4d8]/20">
                    <DynamicIcon name={data.coreSolutions[activeTab].icon} className="w-3.5 h-3.5" />
                    {data.coreSolutions[activeTab].badge || 'MODULE DETAIL'}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                    {data.coreSolutions[activeTab].title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {data.coreSolutions[activeTab].desc}
                  </p>

                  {/* Word-for-Word Features Bullets */}
                  <div className="space-y-3 pt-2">
                    <div className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider">
                      Included Capabilities & Solutions:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {data.coreSolutions[activeTab].features.map((feat, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-[#00a4d8]/30 transition-colors"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#00a4d8] shrink-0 mt-0.5" />
                          <span className="text-xs font-semibold text-slate-200 leading-tight">
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Consultation CTA */}
                  <div className="pt-4 flex items-center gap-4">
                    <button
                      type="button"
                      onClick={openEstimateModal}
                      className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#00a4d8] to-[#5d53a3] hover:brightness-110 transition-all cursor-pointer flex items-center gap-2"
                    >
                      <span>Deploy {data.coreSolutions[activeTab].title.replace('Mews ', '')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Right Interactive Telemetry & Flow Card */}
                <div className="lg:col-span-5">
                  <div className="rounded-2xl bg-black/70 border border-slate-800 p-6 space-y-4 font-mono text-xs">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <span className="text-slate-400 font-bold flex items-center gap-2">
                        <Server className="w-4 h-4 text-[#5d53a3]" />
                        ARCHITECTURE PIPELINE
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                        ACTIVE V1.0
                      </span>
                    </div>

                    {/* Step-by-step pipeline demonstration */}
                    <div className="space-y-3 text-[11px]">
                      <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="text-slate-400 text-[10px]">INBOUND REQUEST</div>
                          <div className="text-white font-bold">Hospitality Event Trigger</div>
                        </div>
                        <span className="text-[#00a4d8] font-bold">HTTPS POST</span>
                      </div>

                      <div className="flex justify-center text-slate-600">
                        <ChevronDown className="w-4 h-4 text-[#00a4d8] animate-bounce" />
                      </div>

                      <div className="p-3 rounded-lg bg-[#5d53a3]/15 border border-[#5d53a3]/30 flex items-center justify-between">
                        <div>
                          <div className="text-slate-400 text-[10px]">CUBIXSOL INTEGRATION HUB</div>
                          <div className="text-white font-bold">Payload Transformation & Auth</div>
                        </div>
                        <span className="text-[#9b8fff] font-bold">OAUTH2 / JWT</span>
                      </div>

                      <div className="flex justify-center text-slate-600">
                        <ChevronDown className="w-4 h-4 text-[#5d53a3] animate-bounce" />
                      </div>

                      <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                        <div>
                          <div className="text-slate-400 text-[10px]">MEWS PMS CLOUD</div>
                          <div className="text-white font-bold">Commander PMS State Committed</div>
                        </div>
                        <span className="text-emerald-400 font-bold">SYNC 200</span>
                      </div>
                    </div>

                    <div className="pt-2 text-[10px] text-slate-400 flex items-center justify-between">
                      <span>Sync Latency: &lt;15ms</span>
                      <span className="text-emerald-400 font-bold">Zero Double-Bookings</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          4. SECTION 3: Our Mews Integration Process (5 Steps)
         ───────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#0a0b12] border-b border-slate-800/80 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/20 text-[#00a4d8] text-xs font-bold tracking-wider uppercase">
              <Clock className="w-3.5 h-3.5" />
              STRUCTURED LIFECYCLE
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              {data.serviceProcessTitle || 'Our Mews Integration Process'}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {data.serviceProcessIntro || 'Cubixsol follows a structured approach to deliver successful Mews integration projects:'}
            </p>
          </div>

          {/* 5-Step Process Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {data.serviceProcessSteps && data.serviceProcessSteps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0e0f17] border border-slate-800 hover:border-[#00a4d8]/50 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_10px_25px_rgba(0,164,216,0.15)] group"
                >
                  {/* Step Number Top */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`text-2xl font-black font-mono tracking-wider ${
                        isEven ? 'text-[#00a4d8]' : 'text-[#5d53a3]'
                      }`}>
                        {step.stepNumber}
                      </span>
                      <span className="w-2 h-2 rounded-full bg-slate-700 group-hover:bg-[#00a4d8] transition-colors" />
                    </div>

                    {/* Step Title */}
                    <h3 className="text-base font-bold text-white group-hover:text-[#00a4d8] transition-colors leading-snug">
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* Bottom Indicator */}
                  <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>PHASE 0{idx + 1}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 group-hover:text-[#00a4d8] transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          5. SECTION 4: Why Choose Cubixsol For Mews Integration?
         ───────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#07080d] border-b border-slate-800/80 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[300px] bg-[#5d53a3]/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5d53a3]/15 border border-[#5d53a3]/30 text-[#9b8fff] text-xs font-bold tracking-wider uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                ENTERPRISE HOSPITALITY VALUE
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {data.whyChooseTitle}
              </h2>

              {/* Exact Paragraphs from Document */}
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  Cubixsol helps hospitality businesses take advantage of Mews’ open and flexible ecosystem through custom integration solutions. Our team focuses on building modern connections that improve automation, enhance guest experiences, and simplify hotel operations.
                </p>
                <p>
                  We develop Mews integrations that connect reservations, payments, smart technologies, CRM platforms, and business analytics into one efficient workflow. Whether you need API development, automation solutions, or third-party software connectivity, Cubixsol creates Mews integrations that support your operational goals and long-term growth.
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={openEstimateModal}
                  className="px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#00a4d8] to-[#5d53a3] hover:brightness-110 transition-all shadow-[0_4px_20px_rgba(0,164,216,0.3)] flex items-center gap-2 cursor-pointer"
                >
                  <span>Consult Our Mews Integration Specialists</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Engineering Pillars Column */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0e0f17] border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#00a4d8]/10 text-[#00a4d8] flex items-center justify-center">
                  <Terminal className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">Open API Specialization</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Deep engineering experience with Mews Open API, WebSocket events, and Commander integrations.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0e0f17] border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#5d53a3]/10 text-[#5d53a3] flex items-center justify-center">
                  <KeyRound className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">Automated Guest Journeys</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  End-to-end self-service flows from pre-stay web check-in to mobile smart lock pin generation and digital checkout.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0e0f17] border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#5d53a3]/10 text-[#5d53a3] flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">Unified Hospitality Stack</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Bridging front-desk, payment terminals, revenue engines, and back-office accounting into one frictionless ecosystem.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0e0f17] border border-slate-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#00a4d8]/10 text-[#00a4d8] flex items-center justify-center">
                  <Activity className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">Ongoing Monitoring & Support</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Proactive API rate limit optimization, error-handling webhooks, and round-the-clock technical maintenance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          6. SECTION 5: Frequently Asked Questions (Accordion)
         ───────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#0a0b12] border-b border-slate-800/80 relative">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/20 text-[#00a4d8] text-xs font-bold tracking-wider uppercase">
              <MessageSquare className="w-3.5 h-3.5" />
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {data.faqs && data.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-slate-900/90 border-[#00a4d8]/40 shadow-[0_4px_20px_rgba(0,164,216,0.1)]'
                      : 'bg-slate-900/50 border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-bold text-sm sm:text-base text-white">
                      {faq.q}
                    </span>
                    <div className={`p-1.5 rounded-lg shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-[#00a4d8] text-white rotate-180' : 'bg-slate-800 text-slate-400'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/60 font-light">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ─────────────────────────────────────────────────────────────
          7. BOTTOM CTA CONVERSION BANNER
         ───────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#07080d] to-[#040508] relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-[#101223] to-slate-900 border border-slate-700 p-8 sm:p-12 shadow-[0_15px_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
            {/* Glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00a4d8]/20 blur-3xl pointer-events-none rounded-full" />

            <div className="space-y-6 relative z-10">
              <span className="px-4 py-1.5 rounded-full bg-[#00a4d8]/10 text-[#00a4d8] text-xs font-bold tracking-widest uppercase border border-[#00a4d8]/30">
                MEWS INTEGRATION PARTNERSHIP
              </span>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight max-w-2xl mx-auto">
                Ready to Connect Mews With Your Hospitality Technology Stack?
              </h2>

              <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                Connect with Cubixsol's PMS integration architects today to design and deploy custom API integrations for your properties.
              </p>

              <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={openEstimateModal}
                  className="px-8 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#00a4d8] to-[#5d53a3] hover:brightness-110 transition-all shadow-[0_4px_25px_rgba(0,164,216,0.35)] flex items-center gap-2 cursor-pointer"
                >
                  <span>Schedule A Mews Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  to="/contact"
                  className="px-7 py-4 rounded-xl font-bold text-sm text-slate-200 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-all"
                >
                  Contact Engineering Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
