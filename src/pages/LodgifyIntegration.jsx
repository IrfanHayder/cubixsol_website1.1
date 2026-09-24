import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Globe, Calendar, ShieldCheck, Cpu, ArrowRight, CheckCircle2,
  ChevronRight, TrendingUp, Sparkles, Database, MessageSquare,
  Mail, Layers, PhoneCall, ExternalLink, RefreshCw, BarChart3,
  HelpCircle, Star, Sliders, Workflow, Settings, Smartphone,
  Award, Target, Rocket, CreditCard, Share2, Terminal,
  Code2, Check, PieChart, GitBranch, Server, Lock, Unlock,
  DoorClosed, Key, Bell, Wifi, ArrowUpRight, Zap, Play,
  CheckCircle, ChevronDown, Building2, Laptop, Shield, Radio, Users,
  KeyRound, Compass, MonitorSmartphone, LayoutGrid, CheckSquare
} from 'lucide-react';
import { useEstimateModal } from '../context/EstimateModalContext';
import { apiFetch } from '../utils/api';
import { formatInline } from '../utils/formatText';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';
import CtaBanner from '../components/CtaBanner';
import DynamicIcon from '../components/DynamicIcon';
import { useSEO } from '../utils/seo';

// Default static data matching the document provided for Lodgify Integration Services
const DEFAULT_DATA = {
  slug: 'lodgify-integration',
  title: 'Lodgify Integration Services',
  heroEyebrow: 'LODGIFY INTEGRATION SERVICES',
  heroTitle: 'Lodgify Integration Solutions For Vacation Rental Automation',
  heroDesc: 'Cubixsol extends Lodgify functionality through reliable integrations to meet your business requirements. Our professional Lodgify integration services connect your booking platform with powerful digital tools. Our developers create customised integrations to improve reservation management, automate workflows, and enhance the guest experience.',
  heroPrimaryBtnText: 'Schedule A Lodgify Consultation',
  heroSecondaryBtnText: 'Explore Solutions',
  heroBadges: [
    '2-Way Channel & OTA Synchronisation',
    'Custom Lodgify API Integration',
    'Direct Booking Engine Connectivity',
    'Smart Lock & Access Automation',
    'Payment Gateway & CRM Integration'
  ],
  heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&h=800&q=80',

  // Section 1: Connect Lodgify With Your Business Applications
  subServicesTitle: 'Connect Lodgify With Your Business Applications',
  subServicesIntro: 'Vacation rental companies need different systems to manage bookings, payments, communication, and daily operations. Our integration services create a connected environment. We develop Lodgify integrations to connect your platform with essential business solutions, including:',
  subServicesItems: [
    {
      icon: 'Share2',
      tag: 'CHANNELS & OTAS',
      title: 'Airbnb, Booking.com, Vrbo, and Booking Channels',
      desc: 'Accurate multi-channel synchronization keeping your calendars, rates, restrictions, and reservation updates aligned across all leading booking channels.',
      pills: ['Airbnb Sync', 'Booking.com', 'Vrbo & Major OTAs'],
      colorTheme: 'blue'
    },
    {
      icon: 'Globe',
      tag: 'DIRECT BOOKINGS',
      title: 'Direct Booking Websites',
      desc: 'Connect your Lodgify booking engine directly to custom websites for direct guest reservations, instant quote calculations, and automated deposit handling.',
      pills: ['Custom Web Engine', 'Instant Booking', 'Zero Commission'],
      colorTheme: 'gold'
    },
    {
      icon: 'CreditCard',
      tag: 'PAYMENTS & BILLING',
      title: 'Payment Processing Platforms',
      desc: 'Secure payment integrations with Stripe, PayPal, and merchant gateways for automatic payment captures, damage deposit holds, and split settlements.',
      pills: ['Stripe & Merchant APIs', 'Security Deposits', 'Automated Receipts'],
      colorTheme: 'blue'
    },
    {
      icon: 'Users',
      tag: 'CRM & MARKETING',
      title: 'CRM and Marketing Automation Tools',
      desc: 'Integrate Lodgify with HubSpot, ActiveCampaign, and Mailchimp to capture guest contact details, build loyalty campaigns, and automate follow-ups.',
      pills: ['HubSpot / Klaviyo', 'Guest Segmentation', 'Repeat Booking Loops'],
      colorTheme: 'gold'
    },
    {
      icon: 'KeyRound',
      tag: 'SMART ACCESS & IOT',
      title: 'Smart Lock Systems',
      desc: 'Seamless connections with Yale, August, Schlage, and RemoteLock to automatically generate time-sensitive digital door PINs for frictionless check-in.',
      pills: ['Keyless Digital PINs', 'Automated Check-in', 'Access Logging'],
      colorTheme: 'blue'
    },
    {
      icon: 'PieChart',
      tag: 'FINANCE & ACCOUNTING',
      title: 'Accounting Applications',
      desc: 'Synchronise reservation financials, local occupancy taxes, cleaning fees, and owner disbursements with QuickBooks, Xero, or bespoke financial tools.',
      pills: ['QuickBooks / Xero', 'Tax & Fee Splitting', 'Owner Statements'],
      colorTheme: 'gold'
    },
    {
      icon: 'MessageSquare',
      tag: 'GUEST MESSAGING',
      title: 'Guest Communication Solutions',
      desc: 'Connect automated SMS, WhatsApp, and email delivery platforms to provide real-time booking confirmations, directions, and digital guidebooks.',
      pills: ['WhatsApp & SMS Drips', 'Digital Guidebooks', 'Real-time Alerts'],
      colorTheme: 'blue'
    }
  ],

  // Section 2: Core 6 Specialized Solution Modules
  coreSolutionsTitle: 'Specialised Lodgify Integration Capabilities',
  coreSolutionsIntro: 'Explore how our dedicated integration modules connect Lodgify to every critical layer of your property operations.',
  coreSolutions: [
    {
      id: 'channel-integration',
      title: 'Lodgify Airbnb And Channel Integration Services',
      subtitle: 'Accurate Multi-Channel Synchronization & Calendar Parity',
      desc: 'Managing listings across multiple rental channels requires accurate synchronisation. We integrate Lodgify with major booking platforms to maintain updated reservations, availability, and property information. Our channel integration solutions support:',
      icon: 'Share2',
      badge: 'CHANNELS & OTAS',
      features: [
        'Reservation synchronisation across all connected channels',
        'Real-time calendar updates to prevent double bookings',
        'Centralised listing management and content distribution',
        'Guest information transfer and contact record unification',
        'Automated booking workflows triggered on new reservations'
      ]
    },
    {
      id: 'api-development',
      title: 'Lodgify API Integration Development',
      subtitle: 'Secure API-Based Solutions For Advanced Software Connections',
      desc: 'We offer custom Lodgify API integration services for businesses that need advanced software connections. Our developers build secure API-based solutions that allow Lodgify to communicate with external applications. Our Lodgify API services include:',
      icon: 'Code2',
      badge: 'CUSTOM API ENGINEERING',
      features: [
        'Custom API development tailored to business operational requirements',
        'Third-party application integration across CRM, ERP, and bespoke software',
        'Reliable data synchronisation with bidirectional webhook handlers',
        'Intelligent workflow automation and event-driven pipelines',
        'Comprehensive API testing, rate-limit handling, and performance optimisation'
      ]
    },
    {
      id: 'direct-booking',
      title: 'Lodgify Direct Booking Website Integration',
      subtitle: 'Maximise Profit Margins With High-Converting Direct Channels',
      desc: 'Direct bookings help rental businesses build stronger customer relationships and reduce dependency on third-party platforms. Cubixsol creates Lodgify integrations that improve direct booking workflows. Our solutions can support:',
      icon: 'Globe',
      badge: 'DIRECT BOOKING ENGINE',
      features: [
        'Seamless website booking connections with custom frontends',
        'Automated reservation processing and real-time validation',
        'Instant availability synchronisation with zero latency',
        'Comprehensive guest data management and profile creation',
        'Secure online payment integration with multi-currency support'
      ]
    },
    {
      id: 'smart-lock-integration',
      title: 'Lodgify Smart Lock Integration',
      subtitle: 'Keyless Contactless Self-Check-in & Automated Access',
      desc: 'Smart access technology allows property managers to offer convenient self-check-in experiences. We connect Lodgify with smart lock systems to automate property access. Our smart lock integration services include:',
      icon: 'KeyRound',
      badge: 'SMART HARDWARE & IOT',
      features: [
        'Digital access code creation tied directly to reservation dates',
        'Automated guest entry and contactless self-check-in flows',
        'Check-in workflow automation with SMS/email code delivery',
        'Remote access management and lock battery health monitoring',
        'Smart device connectivity spanning locks, thermostats, and sensors'
      ]
    },
    {
      id: 'payment-crm-integration',
      title: 'Lodgify Payment And CRM Integration',
      subtitle: 'Unified Financial Transactions & Guest Relationship Management',
      desc: 'Effective payment management and customer communication are essential for rental success. We integrate Lodgify with payment platforms and CRM systems to organise business operations. Our integration solutions include:',
      icon: 'CreditCard',
      badge: 'FINANCIAL & CRM PIPELINES',
      features: [
        'Direct payment gateway connections with automated tokenization',
        'Real-time transaction synchronisation and bookkeeping reconciliation',
        'Guest profile management consolidating booking history and preferences',
        'Email marketing automation for pre-arrival and post-stay campaigns',
        'Customer relationship workflows driving repeat direct bookings'
      ]
    },
    {
      id: 'automation-workflow',
      title: 'Lodgify Automation And Workflow Integration',
      subtitle: 'Eliminate Repetitive Tasks & Boost Operational Efficiency',
      desc: 'Cubixsol helps rental businesses automate repetitive tasks by connecting Lodgify with different business tools. Automation solutions can improve efficiency and reduce administrative workload. Our workflow integrations support:',
      icon: 'Workflow',
      badge: 'AUTOMATION & WORKFLOWS',
      features: [
        'Automated guest notifications for confirmations, check-in, and check-out',
        'Instant reservation updates across housekeeping and maintenance teams',
        'Team alerts for urgent property maintenance or guest requests',
        'Automated customer follow-ups and 5-star review collection drips',
        'Operational task management and turnover schedule dispatching'
      ]
    }
  ],

  // Section 3: Process
  processTitle: 'Our Lodgify Integration Process',
  processIntro: 'Cubixsol follows a structured process to deliver successful Lodgify integration solutions:',
  processSteps: [
    {
      step: '01',
      title: 'Business Requirement Analysis',
      desc: 'Our team reviews your current systems, operational goals, existing software stack, and required integration features.',
      icon: 'Compass'
    },
    {
      step: '02',
      title: 'Integration Planning',
      desc: 'We design a technical roadmap, API schema mapping, and security architecture based on your operational workflow.',
      icon: 'Workflow'
    },
    {
      step: '03',
      title: 'Development And Setup',
      desc: 'Our developers build, test, and configure the required API bridges, webhooks, and secure system connections.',
      icon: 'Code2'
    },
    {
      step: '04',
      title: 'Testing And Deployment',
      desc: 'We verify end-to-end functionality, booking synchronisation, security, and data accuracy before launching.',
      icon: 'ShieldCheck'
    },
    {
      step: '05',
      title: 'Support And Maintenance',
      desc: 'Our team provides ongoing technical assistance, monitoring, and proactive updates after implementation.',
      icon: 'RefreshCw'
    }
  ],

  // Section 4: Why Choose
  whyChooseTitle: 'Why Choose Cubixsol For Lodgify Integration?',
  whyChooseIntro: 'We connect Lodgify with your website, booking channels, payment systems, and operational tools into one efficient workflow. Our solutions improve reservation accuracy, simplify daily tasks, and support the growth of your rental business.\n\nVacation rental businesses get more value from direct bookings, automation, and seamless guest experiences. Our team understands the needs of independent hosts and rental operators. We deliver Lodgify integrations that align with your business model and provide long-term flexibility.',
  whyChoosePoints: [
    {
      title: 'Full Hospitality Ecosystem Connectivity',
      desc: 'We integrate Lodgify with OTAs, payment gateways, smart locks, CRMs, and accounting platforms into one coherent pipeline.'
    },
    {
      title: 'Custom Lodgify API Engineering',
      desc: 'Tailor-made backend bridges, custom webhook listeners, and bespoke endpoints built precisely for your unique operational requirements.'
    },
    {
      title: 'Accurate Calendar & Rate Parity',
      desc: 'Bidirectional synchronization algorithms ensure zero double bookings and instant pricing updates across all channels.'
    },
    {
      title: 'Boosted Direct Bookings & Margins',
      desc: 'Custom direct booking engine integrations help you capture commission-free bookings while maintaining full Lodgify automation.'
    },
    {
      title: 'Frictionless Guest Check-In Experiences',
      desc: 'Automated smart lock PIN generation and digital guidebook dispatching provide five-star self-check-in experiences.'
    },
    {
      title: 'Dedicated Post-Launch Support',
      desc: 'Continuous monitoring, API version updates, and rapid engineering assistance to ensure your operations run seamlessly 24/7.'
    }
  ],

  // Section 5: FAQs
  faqTitle: 'Frequently Asked Questions',
  faqIntro: 'Got questions about integrating Lodgify with your existing tools? Find clear answers below.',
  faqs: [
    {
      q: 'What Lodgify integration services does Cubixsol provide?',
      a: 'Cubixsol develops Lodgify integrations with booking channels, payment systems, CRM platforms, smart devices, and other business applications.'
    },
    {
      q: 'Can Lodgify integrate with Airbnb and other OTAs?',
      a: 'Yes, Lodgify supports connections with major booking platforms, and Cubixsol can create customised integration solutions.'
    },
    {
      q: 'Does Cubixsol offer Lodgify API integration?',
      a: 'Yes, our developers create API-based integrations that connect Lodgify with external software systems.'
    },
    {
      q: 'Can Lodgify connect with smart lock solutions?',
      a: 'Yes, Lodgify can integrate with smart access systems to support automated guest entry and self-check-in.'
    },
    {
      q: 'How can Lodgify integration improve vacation rental management?',
      a: 'Lodgify integration helps businesses automate operations, synchronise data, and manage bookings more efficiently.'
    }
  ]
};

export default function LodgifyIntegration() {
  const { openEstimateModal } = useEstimateModal();
  const [data, setData] = useState(DEFAULT_DATA);
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [simState, setSimState] = useState({
    activeOta: 'Airbnb & Booking.com',
    status: 'Real-Time Sync Active',
    smartLockPin: '792415',
    isSyncing: false,
    latency: '118ms'
  });

  // SEO Hook
  useSEO(data?.seo, {
    title: 'Lodgify Integration Services | Vacation Rental Automation | Cubixsol',
    description: 'Expert Lodgify integration services by Cubixsol. Connect Lodgify with Airbnb, Vrbo, custom direct booking websites, smart locks, payment gateways, and CRM systems.',
    keywords: 'Lodgify integration, Lodgify API integration, Lodgify direct booking, vacation rental automation, Lodgify channel manager, smart lock Lodgify',
    canonicalUrl: 'https://cubixsol.com/lodgify-integration'
  });

  // Dynamic fetch from backend so changes in Admin Dashboard automatically update the page
  useEffect(() => {
    let isMounted = true;
    apiFetch('services/lodgify-integration')
      .then((res) => {
        if (!isMounted || !res) return;
        const apiData = res.service || res;
        if (apiData && (apiData.title || apiData.subServicesItems || apiData.coreSolutions)) {
          setData((prev) => ({
            ...prev,
            ...apiData,
            seo: apiData.seo || prev.seo,
            heroBadges: apiData.features && apiData.features.length ? apiData.features : (apiData.heroBadges || prev.heroBadges),

            subServicesItems: (apiData.subServicesItems && apiData.subServicesItems.length > 0)
              ? apiData.subServicesItems.map((item, idx) => ({
                  ...item,
                  icon: item.icon || (prev.subServicesItems[idx]?.icon || 'Globe'),
                  tag: item.tag || (prev.subServicesItems[idx]?.tag || 'INTEGRATION'),
                  pills: item.pills || (prev.subServicesItems[idx]?.pills || ['Lodgify Sync', 'Live Parity']),
                  colorTheme: idx % 2 === 0 ? 'blue' : 'gold'
                }))
              : prev.subServicesItems,
            coreSolutions: (apiData.coreSolutions && apiData.coreSolutions.length > 0)
              ? apiData.coreSolutions
              : (apiData.subServicesItems && apiData.subServicesItems.length > 0 && !prev.coreSolutions
                  ? apiData.subServicesItems.map((item, i) => ({
                      id: `module-${i}`,
                      title: item.title,
                      subtitle: item.subtitle || 'Automated Lodgify Connectivity',
                      desc: item.desc,
                      icon: item.icon || 'Layers',
                      badge: 'CAPABILITY',
                      features: item.features || []
                    }))
                  : prev.coreSolutions),
            processSteps: (apiData.serviceProcessSteps && apiData.serviceProcessSteps.length > 0)
              ? apiData.serviceProcessSteps.map((step, idx) => ({
                  step: step.stepNumber || `0${idx + 1}`,
                  title: step.title,
                  desc: step.desc,
                  icon: step.icon || (prev.processSteps[idx]?.icon || 'CheckCircle')
                }))
              : (apiData.processSteps || prev.processSteps),
            whyChoosePoints: (apiData.whyChooseItems && apiData.whyChooseItems.length > 0)
              ? apiData.whyChooseItems
              : (apiData.whyChoosePoints || prev.whyChoosePoints),
            faqs: (apiData.faqs && apiData.faqs.length > 0) ? apiData.faqs : prev.faqs
          }));
        }
      })
      .catch((err) => {
        console.warn('Using default static Lodgify integration data:', err.message);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const triggerSimSync = () => {
    setSimState(prev => ({ ...prev, isSyncing: true, status: 'Triggering Webhook Sync...' }));
    setTimeout(() => {
      const pins = ['492810', '830192', '792415', '194820', '651930'];
      const randomPin = pins[Math.floor(Math.random() * pins.length)];
      setSimState({
        activeOta: 'Airbnb, Vrbo & Direct Engine',
        status: 'Parity Verified • 0 Clashes',
        smartLockPin: randomPin,
        isSyncing: false,
        latency: `${Math.floor(80 + Math.random() * 40)}ms`
      });
    }, 800);
  };

  const coreModules = data.coreSolutions || DEFAULT_DATA.coreSolutions;
  const currentModule = coreModules[activeTab] || coreModules[0];

  return (
    <div className="min-h-screen bg-white text-ink selection:bg-[#00a4d8]/20 selection:text-[#00a4d8]">
      {/* ---------------------------------------------------- */}
      {/* 1. HERO SECTION (DARK LUXURY WITH LODGIFY BLUE & GOLD ACCENTS) */}
      {/* ---------------------------------------------------- */}
      <section className="relative pt-32 pb-20 lg:pt-36 lg:pb-28 bg-gradient-to-b from-[#0a1120] via-[#0f172a] to-[#080d19] text-white overflow-hidden">
        {/* Glow and Grid Mesh */}
        <div className="absolute inset-0 pointer-events-none opacity-25">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00a4d8] rounded-full blur-[140px]" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#f5a623] rounded-full blur-[140px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <Reveal>
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold tracking-widest uppercase text-[#00a4d8]">
                  <span className="w-2 h-2 rounded-full bg-[#f5a623] animate-pulse" />
                  {data.heroEyebrow || 'LODGIFY INTEGRATION SERVICES'}
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.14]">
                  {formatInline(data.heroTitle || 'Lodgify Integration Solutions For Vacation Rental Automation')}
                </h1>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                  {formatInline(data.heroDesc || data.longDesc || '')}
                </p>
              </Reveal>

              {/* Badges / Key Highlights */}
              <Reveal delay={0.3}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {(data.heroBadges || []).map((badge, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#f5a623] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-200 font-medium leading-snug">{badge}</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Action Buttons */}
              <Reveal delay={0.4}>
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <button
                    onClick={() => openEstimateModal('Lodgify Integration Consultation')}
                    className="btn-primary text-sm sm:text-base px-7 py-3.5 cursor-pointer"
                  >
                    <span>{data.heroPrimaryBtnText || 'Schedule A Lodgify Consultation'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href="#ecosystem"
                    className="px-6 py-3.5 rounded-lg font-semibold text-sm sm:text-base text-slate-200 bg-white/10 hover:bg-white/15 border border-white/20 transition-all flex items-center gap-2"
                  >
                    <span>{data.heroSecondaryBtnText || 'Explore Solutions'}</span>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Hero Visual Card (Lodgify Live Node Hub) */}
            <div className="lg:col-span-5">
              <Reveal delay={0.3}>
                <div className="relative rounded-2xl bg-gradient-to-b from-[#0a1628]/95 to-[#040e1c]/95 border border-[#00a4d8]/30 shadow-[0_10px_40px_rgba(0,164,216,0.15)] backdrop-blur-xl p-5 sm:p-6 overflow-hidden">
                  
                  {/* Top Bar */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      <span className="text-xs font-mono text-slate-400 ml-1">lodgify_sync_daemon</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      2-WAY LIVE
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="py-4 space-y-3.5">
                    
                    {/* Header Card */}
                    <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#00a4d8]/15 border border-[#00a4d8]/30 flex items-center justify-center text-[#00a4d8] font-bold">
                          <Globe className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-sm">Lodgify Unified Bridge</h3>
                          <p className="text-[11px] text-slate-400">Bidirectional Sync Engine</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-[#f5a623] font-bold bg-[#f5a623]/10 px-2 py-0.5 rounded">
                        {simState.latency}
                      </span>
                    </div>

                    {/* Nodes */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#00a4d8] font-bold flex items-center gap-1">
                            <Share2 className="w-3.5 h-3.5" /> Channels
                          </span>
                          <span className="text-[10px] text-emerald-400 font-mono">Live</span>
                        </div>
                        <div className="text-[11px] text-slate-300 font-mono truncate">{simState.activeOta}</div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#f5a623] font-bold flex items-center gap-1">
                            <KeyRound className="w-3.5 h-3.5" /> Smart Lock
                          </span>
                          <span className="text-[10px] text-amber-300 font-mono">PIN: {simState.smartLockPin}</span>
                        </div>
                        <div className="text-[11px] text-slate-300 font-mono">Auto Dispatched</div>
                      </div>
                    </div>

                    {/* Terminal status */}
                    <div className="p-3 rounded-xl bg-black/90 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-500 text-[10px]">
                        <Terminal className="w-3 h-3 text-[#00a4d8]" />
                        <span>LIVE EVENT MONITOR</span>
                      </div>
                      <div className="text-cyan-300 text-[11px] leading-relaxed">
                        {simState.isSyncing ? (
                          <span className="flex items-center gap-2 text-white">
                            <RefreshCw className="w-3 h-3 animate-spin text-[#00a4d8]" />
                            {simState.status}
                          </span>
                        ) : (
                          `> ${simState.status} • Zero calendar clash guarantee`
                        )}
                      </div>
                    </div>

                    {/* Interactive Button */}
                    <button
                      onClick={triggerSimSync}
                      disabled={simState.isSyncing}
                      className="w-full py-2.5 rounded-xl bg-[#00a4d8]/20 hover:bg-[#00a4d8]/30 border border-[#00a4d8]/40 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Simulate Lodgify 2-Way Event Sync</span>
                    </button>

                  </div>

                  {/* Footer */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Sync Reliability: <strong className="text-emerald-400">99.99%</strong></span>
                    <span>API Mode: <strong className="text-[#00a4d8]">REST & Webhooks</strong></span>
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 2. SECTION 1: CONNECT LODGIFY WITH BUSINESS APPS */}
      {/* ---------------------------------------------------- */}
      <section id="ecosystem" className="py-20 md:py-24 bg-slate-50/70 border-b border-gray-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/20 text-[#00a4d8] text-xs font-bold uppercase tracking-wider mb-4">
                <Workflow className="w-3.5 h-3.5" />
                <span>ECOSYSTEM CONNECTIVITY</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight mb-4">
                {formatInline(data.subServicesTitle || 'Connect Lodgify With Your Business Applications')}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {formatInline(data.subServicesIntro || '')}
              </p>
            </Reveal>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {(data.subServicesItems || []).map((item, idx) => {
              const isBlue = item.colorTheme === 'blue' || idx % 2 === 0;
              return (
                <StaggerItem key={idx}>
                  <div className="h-full bg-white hover:bg-white border border-gray-100 hover:border-[#00a4d8]/40 rounded-2xl p-6 sm:p-7 shadow-card hover:shadow-soft transition-all duration-300 group flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                          isBlue ? 'bg-[#00a4d8]/10 text-[#00a4d8]' : 'bg-[#f5a623]/10 text-[#f5a623]'
                        }`}>
                          <DynamicIcon icon={item.icon || 'Layers'} className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                          {item.tag || 'INTEGRATION'}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-ink mb-2 group-hover:text-[#00a4d8] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6 font-normal">
                        {item.desc}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-5 border-t border-gray-100">
                      {(item.pills || ['Lodgify API', 'Automation', 'Real-time']).map((pill, pIdx) => (
                        <span key={pIdx} className="text-[10px] font-semibold px-2.5 py-1 rounded-md bg-slate-50 border border-gray-200 text-slate-700">
                          {pill}
                        </span>
                      ))}
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 3. SECTION 2: SPECIALIZED CORE CAPABILITIES (TABS) */}
      {/* ---------------------------------------------------- */}
      <section id="solutions" className="py-20 md:py-24 bg-white border-b border-gray-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f5a623]/10 border border-[#f5a623]/20 text-[#f5a623] text-xs font-bold uppercase tracking-wider mb-4">
                <Cpu className="w-3.5 h-3.5" />
                <span>COMPREHENSIVE LODGIFY MODULES</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight mb-4">
                {formatInline(data.coreSolutionsTitle || 'Specialised Lodgify Integration Capabilities')}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {formatInline(data.coreSolutionsIntro || '')}
              </p>
            </Reveal>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {coreModules.map((mod, idx) => {
              const isSelected = activeTab === idx;
              return (
                <button
                  key={mod.id || idx}
                  onClick={() => setActiveTab(idx)}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-[#00a4d8] text-white shadow-md shadow-[#00a4d8]/20 scale-102'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <DynamicIcon icon={mod.icon || 'Check'} className="w-4 h-4" />
                  <span>{mod.title.replace('Lodgify ', '').replace(' Services', '')}</span>
                </button>
              );
            })}
          </div>

          {/* Active Tab Showcase Container */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentModule.id || activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl border border-gray-200 bg-slate-50/70 p-7 sm:p-10 shadow-card relative overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left: Content & Bullet points */}
                <div className="lg:col-span-7 space-y-5 text-left">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#00a4d8]/10 text-[#00a4d8] text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{currentModule.badge || 'LODGIFY CAPABILITY'}</span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-ink leading-tight">
                      {currentModule.title}
                    </h3>
                    {currentModule.subtitle && (
                      <p className="text-xs sm:text-sm font-semibold text-[#00a4d8] mt-1">
                        {currentModule.subtitle}
                      </p>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                    {formatInline(currentModule.desc || '')}
                  </p>

                  {/* Feature Checkpoints */}
                  <div className="space-y-2.5 pt-2">
                    {(currentModule.features || []).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-[#00a4d8]/15 flex items-center justify-center text-[#00a4d8] shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className="text-xs sm:text-sm text-slate-700 font-medium">
                          {formatInline(feat)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3">
                    <button
                      onClick={() => openEstimateModal(`Lodgify - ${currentModule.title}`)}
                      className="btn-primary text-xs sm:text-sm px-6 py-3 cursor-pointer inline-flex items-center gap-2"
                    >
                      <span>Inquire About {currentModule.title.split(' ')[1] || 'This Module'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Right: Technical Diagram Card */}
                <div className="lg:col-span-5">
                  <div className="rounded-xl bg-white border border-gray-200 p-5 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        <span className="text-xs font-mono text-gray-500 ml-1">lodgify_pipeline.ts</span>
                      </div>
                      <span className="text-[11px] font-mono text-[#00a4d8] font-bold">READY</span>
                    </div>

                    <div className="space-y-2 font-mono text-xs">
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-gray-100 flex items-center justify-between">
                        <span className="text-gray-500">API Endpoint:</span>
                        <span className="text-[#00a4d8] font-semibold">/api/v2/lodgify/bridge</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-gray-100 flex items-center justify-between">
                        <span className="text-gray-500">OTA Multi-Sync:</span>
                        <span className="text-emerald-600 font-semibold">100% Calendar Parity</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-gray-100 flex items-center justify-between">
                        <span className="text-gray-500">Smart Lock Hook:</span>
                        <span className="text-[#f5a623] font-semibold">PIN Auto Generated</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-gray-100 flex items-center justify-between">
                        <span className="text-gray-500">Payment Gateway:</span>
                        <span className="text-blue-600 font-semibold">Stripe / Merchant Linked</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-[#00a4d8]/5 border border-[#00a4d8]/20 flex items-center gap-2.5">
                      <ShieldCheck className="w-5 h-5 text-[#00a4d8] shrink-0" />
                      <p className="text-xs text-gray-600 font-sans leading-tight">
                        Encrypted payload transfer & automated webhook failover retries.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 4. SECTION 3: STRUCTURED INTEGRATION PROCESS */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-slate-50/70 border-b border-gray-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/20 text-[#00a4d8] text-xs font-bold uppercase tracking-wider mb-4">
                <Target className="w-3.5 h-3.5" />
                <span>STRUCTURED DELIVERY</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight mb-4">
                {formatInline(data.processTitle || 'Our Lodgify Integration Process')}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {formatInline(data.processIntro || 'Cubixsol follows a structured process to deliver successful Lodgify integration solutions:')}
              </p>
            </Reveal>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {(data.processSteps || DEFAULT_DATA.processSteps).map((step, idx) => (
              <StaggerItem key={idx}>
                <div className="h-full bg-white border border-gray-100 hover:border-[#00a4d8]/40 rounded-2xl p-6 shadow-card hover:shadow-soft transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-[#00a4d8]/30 group-hover:text-[#00a4d8] transition-colors font-mono">
                        {step.step || `0${idx + 1}`}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-[#00a4d8] group-hover:bg-[#00a4d8]/10 transition-colors">
                        <DynamicIcon icon={step.icon || 'Workflow'} className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-ink group-hover:text-[#00a4d8] transition-colors">
                      {step.title}
                    </h3>

                    <p className="text-xs text-gray-600 leading-relaxed font-normal">
                      {formatInline(step.desc || '')}
                    </p>
                  </div>

                  <div className="w-full h-1 rounded-full bg-slate-100 mt-5 overflow-hidden">
                    <div className="h-full bg-[#00a4d8] w-0 group-hover:w-full transition-all duration-500" />
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 5. SECTION 4: WHY CHOOSE CUBIXSOL FOR LODGIFY */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-white border-b border-gray-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#f5a623]/10 border border-[#f5a623]/20 text-[#f5a623] text-xs font-bold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5" />
                  <span>WHY CUBIXSOL</span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight leading-tight">
                  {formatInline(data.whyChooseTitle || 'Why Choose Cubixsol For Lodgify Integration?')}
                </h2>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                  {typeof data.whyChooseIntro === 'string' ? (
                    data.whyChooseIntro.split('\n\n').map((para, pIdx) => (
                      <p key={pIdx}>{formatInline(para)}</p>
                    ))
                  ) : (
                    <p>{formatInline(String(data.whyChooseIntro || ''))}</p>
                  )}
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="pt-2">
                  <button
                    onClick={() => openEstimateModal('Why Choose Lodgify')}
                    className="btn-primary text-sm px-6 py-3 cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>Discuss Your Lodgify Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </Reveal>
            </div>

            {/* Right Value Grid */}
            <div className="lg:col-span-7">
              <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(data.whyChoosePoints || DEFAULT_DATA.whyChoosePoints).map((point, idx) => (
                  <StaggerItem key={idx}>
                    <div className="h-full p-5 rounded-2xl bg-slate-50 border border-gray-100 hover:border-[#00a4d8]/40 transition-all duration-300 space-y-2.5 group shadow-sm hover:shadow-card">
                      <div className="w-9 h-9 rounded-xl bg-[#00a4d8]/10 border border-[#00a4d8]/20 flex items-center justify-center text-[#00a4d8] group-hover:bg-[#00a4d8] group-hover:text-white transition-colors">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-bold text-ink group-hover:text-[#00a4d8] transition-colors">
                        {point.title}
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed font-normal">
                        {formatInline(point.desc || '')}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 6. SECTION 5: FREQUENTLY ASKED QUESTIONS */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-slate-50/70 border-b border-gray-100 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-3">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/20 text-[#00a4d8] text-xs font-bold uppercase tracking-wider mb-2">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>FAQS</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
                {formatInline(data.faqTitle || 'Frequently Asked Questions')}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-sm text-gray-600 leading-relaxed font-normal">
                {data.faqIntro || 'Clear answers to common questions about our Lodgify integration and automation services.'}
              </p>
            </Reveal>
          </div>

          <div className="space-y-3.5">
            {(data.faqs || DEFAULT_DATA.faqs).map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-white border border-gray-200 overflow-hidden shadow-sm transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-ink hover:text-[#00a4d8] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#00a4d8] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden border-t border-gray-100"
                      >
                        <div className="p-5 text-xs sm:text-sm text-gray-600 leading-relaxed font-normal bg-slate-50/50">
                          {formatInline(faq.a)}
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

      {/* ---------------------------------------------------- */}
      {/* 7. CTA BANNER (STANDARD BRAND BANNER) */}
      {/* ---------------------------------------------------- */}
      <CtaBanner
        eyebrow="READY TO ELEVATE YOUR VACATION RENTALS?"
        title="Automate & Scale Your Lodgify Ecosystem With Cubixsol"
        subtitle="Connect Lodgify with your booking channels, smart locks, payment gateways, and CRM into one seamless automated platform."
        buttonText="Schedule A Lodgify Consultation"
        buttonLink="/contact"
        showChatButton={true}
      />
    </div>
  );
}
