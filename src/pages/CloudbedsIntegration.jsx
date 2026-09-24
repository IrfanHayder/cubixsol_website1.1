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
  KeyRound, Compass, MonitorSmartphone, LayoutGrid, CheckSquare,
  Network, Activity, Shuffle, Headphones, Hotel, Cloud
} from 'lucide-react';
import { useEstimateModal } from '../context/EstimateModalContext';
import { apiFetch } from '../utils/api';
import { formatInline } from '../utils/formatText';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';
import CtaBanner from '../components/CtaBanner';
import DynamicIcon from '../components/DynamicIcon';
import { useSEO } from '../utils/seo';

// Default static fallback data matching the document provided for Cloudbeds Integration Services
const DEFAULT_DATA = {
  slug: 'cloudbeds-integration',
  title: 'Cloudbeds Integration Services',
  heroEyebrow: 'CLOUDBEDS INTEGRATION SERVICES',
  heroTitle: 'Custom Cloudbeds Integration Solutions For Hospitality Businesses',
  heroDesc: 'Cubixsol enhances your capabilities through custom Cloudbeds integrations built around your business requirements. We provide professional Cloudbeds integration services to help hotels, hostels, resorts, and accommodation providers to improve reservation management, automate operational workflows, and simplify communication between multiple hospitality systems.',
  heroPrimaryBtnText: 'Schedule A Cloudbeds Consultation',
  heroSecondaryBtnText: 'Explore Cloudbeds Solutions',
  heroBadges: [
    'Multi-Channel OTA Availability & Rate Synchronization',
    'Custom Cloudbeds API Engineering & Webhook Pipelines',
    'Direct Booking Engine & Custom Storefront Integration',
    'Automated Payment Gateways & Accounting Synchronization',
    'Smart Lock Access, Guest Experience & Workflow Automation'
  ],
  heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&h=800&q=80',

  // Section 1: Connect Cloudbeds With Your Hospitality Technology Stack
  subServicesTitle: 'Connect Cloudbeds With Your Hospitality Technology Stack',
  subServicesIntro: 'Modern hospitality businesses use different software solutions to manage reservations, payments, guest services, and operations. We develop Cloudbeds integrations that connect your PMS with essential applications, including:',
  subServicesItems: [
    {
      icon: 'Share2',
      tag: 'OTAs & CHANNELS',
      title: 'Online travel agencies such as Booking.com, Airbnb, and Expedia.',
      desc: 'Keep calendars, pricing rates, room restrictions, and instant bookings synchronized in real time across global OTAs without double bookings.',
      pills: ['Booking.com 2-Way Sync', 'Airbnb Rates', 'Expedia Real-Time Bridge'],
      colorTheme: 'cyan'
    },
    {
      icon: 'Globe',
      tag: 'DIRECT BOOKINGS',
      title: 'Direct booking websites.',
      desc: 'Connect custom booking platforms and direct websites with Cloudbeds to capture zero-commission direct bookings with live instant confirmations.',
      pills: ['Direct Engine Bridge', 'Commission-Free Flow', 'Live Availability'],
      colorTheme: 'purple'
    },
    {
      icon: 'CreditCard',
      tag: 'PAYMENT GATEWAYS',
      title: 'Payment gateways.',
      desc: 'Integrate Stripe, PayPal, Authorize.Net, and merchant gateways to automate payment processing, damage deposit authorizations, and settlements.',
      pills: ['Stripe & Merchant Pay', 'Security Deposit Holds', 'Card Tokenization'],
      colorTheme: 'cyan'
    },
    {
      icon: 'Users',
      tag: 'CRM PLATFORMS',
      title: 'CRM platforms.',
      desc: 'Bridge Cloudbeds guest records with HubSpot, Salesforce, and CRM suites to centralize contact histories, guest preferences, and VIP loyalty profiles.',
      pills: ['HubSpot / Salesforce', 'Guest History Sync', 'Loyalty Tracking'],
      colorTheme: 'purple'
    },
    {
      icon: 'PieChart',
      tag: 'ACCOUNTING',
      title: 'Accounting software.',
      desc: 'Synchronise booking revenue, occupancy taxes, cleaning fees, and disbursements with QuickBooks, Xero, or custom financial ledgers.',
      pills: ['QuickBooks & Xero', 'Tax Splitting', 'Financial Statement Reports'],
      colorTheme: 'cyan'
    },
    {
      icon: 'KeyRound',
      tag: 'SMART LOCK ACCESS',
      title: 'Smart lock and access systems.',
      desc: 'Connect digital access systems (Yale, Schlage, August, RemoteLock) to auto-generate time-bounded guest door PINs upon confirmed reservation.',
      pills: ['Automated PIN Codes', 'RemoteLock / Yale', 'Contactless Guest Entry'],
      colorTheme: 'purple'
    },
    {
      icon: 'MessageSquare',
      tag: 'GUEST ENGAGEMENT',
      title: 'Guest communication platforms.',
      desc: 'Automate post-stay review requests, pre-arrival welcome guides, upsell email sequences, and SMS alerts via Klaviyo, Mailchimp, or Twilio.',
      pills: ['Guest SMS Workflows', 'Review Generation', 'Upsell Sequences'],
      colorTheme: 'cyan'
    },
    {
      icon: 'BarChart3',
      tag: 'BUSINESS INTELLIGENCE',
      title: 'Business intelligence tools.',
      desc: 'Consolidate multi-channel performance data, RevPAR, average daily rate (ADR), and channel ROI into unified business intelligence dashboards.',
      pills: ['BI Dashboards', 'RevPAR & ADR Trends', 'Occupancy Heatmaps'],
      colorTheme: 'purple'
    }
  ],

  // Section 2: Core Specialized Modules
  coreSolutionsTitle: 'Core Cloudbeds Integration Solutions',
  coreSolutionsIntro: 'Our specialized integration modules bridge Cloudbeds with every operational touchpoint of your hospitality business.',
  coreSolutions: [
    {
      id: 'channel-manager',
      title: 'Cloudbeds Channel Manager Integration',
      subtitle: 'Accurate Multi-Channel Synchronization & Real-time Room Inventory Control',
      desc: 'Managing reservations across multiple booking channels requires accurate synchronisation. Our integrations help accommodation providers manage multiple sales channels while maintaining accurate booking information. Our channel integration services include:',
      icon: 'Share2',
      badge: 'CHANNEL MANAGEMENT',
      features: [
        'Reservation synchronisation.',
        'Room availability updates.',
        'Rate management.',
        'Guest data transfer.',
        'Listing information synchronisation.'
      ]
    },
    {
      id: 'api-services',
      title: 'Cloudbeds API Integration Services',
      subtitle: 'Custom API Architecture, Scalable Endpoints & Third-Party System Bridges',
      desc: 'We provide custom Cloudbeds API integration solutions that allow businesses to connect external applications with their property management system. Our developers build secure API-based connections that support reliable data exchange. Our Cloudbeds API services include:',
      icon: 'Terminal',
      badge: 'API DEVELOPMENT',
      features: [
        'Custom API development.',
        'Third-party software integration.',
        'Automated data workflows.',
        'System connectivity solutions.',
        'API testing and optimisation.'
      ]
    },
    {
      id: 'booking-engine',
      title: 'Cloudbeds Booking Engine Integration',
      subtitle: 'Zero-Commission Direct Bookings, Automated Processing & Live Parity',
      desc: 'Direct bookings help hotels and accommodation providers increase customer relationships and reduce dependency on external marketplaces. We help connect Cloudbeds with booking websites and reservation platforms. Our booking integration solutions support:',
      icon: 'Globe',
      badge: 'DIRECT BOOKING',
      features: [
        'Website reservation systems.',
        'Automated booking processing.',
        'Guest information management.',
        'Payment workflow integration.',
        'Availability synchronisation.'
      ]
    },
    {
      id: 'payment-accounting',
      title: 'Cloudbeds Payment And Accounting Integration',
      subtitle: 'Financial Accuracy, Automated Invoicing & Ledger Synchronization',
      desc: 'Financial accuracy is essential for hospitality operations. We connect Cloudbeds with payment systems and accounting platforms to simplify transaction management. Connected financial systems provide better control over payments and business performance. Our solutions include:',
      icon: 'CreditCard',
      badge: 'PAYMENT & ACCOUNTING',
      features: [
        'Payment gateway integration.',
        'Invoice automation.',
        'Financial data synchronisation.',
        'Accounting software connections.',
        'Revenue reporting workflows.'
      ]
    },
    {
      id: 'guest-experience',
      title: 'Cloudbeds Guest Experience And Automation Integration',
      subtitle: 'Personalized Customer Journeys, Digital Check-in & Review Generation',
      desc: 'Guest satisfaction depends on efficient communication and personalised services. We integrate Cloudbeds with guest engagement tools to improve the customer journey. These integrations help hospitality businesses provide better service throughout the guest lifecycle. Our solutions support:',
      icon: 'MessageSquare',
      badge: 'GUEST EXPERIENCE',
      features: [
        'Automated emails.',
        'Guest notifications.',
        'Digital check-in workflows.',
        'Customer relationship management.',
        'Feedback and review automation.'
      ]
    }
  ],

  // Section 3: Our Cloudbeds Integration Process
  serviceProcessTitle: 'Our Cloudbeds Integration Process',
  serviceProcessIntro: 'Cubixsol follows a structured approach to deliver successful Cloudbeds integration projects:',
  serviceProcessSteps: [
    {
      stepNumber: '01',
      title: 'Requirement Analysis',
      desc: 'Our team studies your hospitality operations, existing software, and integration goals.'
    },
    {
      stepNumber: '02',
      title: 'Solution Planning',
      desc: 'We design an integration roadmap based on your business requirements.'
    },
    {
      stepNumber: '03',
      title: 'Development And Configuration',
      desc: 'Our developers build secure connections between Cloudbeds and external platforms.'
    },
    {
      stepNumber: '04',
      title: 'Testing And Deployment',
      desc: 'We verify system performance, security, and data accuracy.'
    },
    {
      stepNumber: '05',
      title: 'Support And Maintenance',
      desc: 'Our team provides technical support after implementation.'
    }
  ],

  // Section 4: Why Choose Cubixsol For Cloudbeds Integration
  whyChooseTitle: 'Why Choose Cubixsol For Cloudbeds Integration?',
  whyChooseIntro: 'Cubixsol helps hospitality businesses unlock greater value from Cloudbeds through customised integration solutions. Our team understands the complexity of hotel operations and develops connections that improve reservation flow, guest communication, and operational efficiency.\n\nWe create Cloudbeds integrations that connect your entire hospitality ecosystem, from booking channels and payment systems to automation tools and reporting platforms. Our solutions are designed to help hotels and accommodation providers operate more efficiently while preparing their technology infrastructure for future growth.',
  whyChooseItems: [
    {
      title: 'Tailored Hospitality Architecture',
      desc: 'Custom engineered data bridges tailored to your exact property portfolio size, third-party software stack, and hospitality model.'
    },
    {
      title: 'Zero Double-Booking Guarantee',
      desc: 'Sub-second bidirectional synchronization across Airbnb, Vrbo, Booking.com, Expedia, and direct web engines.'
    },
    {
      title: 'Automated Guest Self-Check-in',
      desc: 'Dynamic, time-restricted smart lock PIN creation linked automatically to confirmed Cloudbeds reservation timestamps.'
    },
    {
      title: 'End-to-End Enterprise Support',
      desc: 'Continuous monitoring, webhook error handling, API version maintenance, and 24/7 technical oversight.'
    }
  ],

  // Section 5: FAQs
  faqs: [
    {
      q: 'What Cloudbeds integration services does Cubixsol provide?',
      a: 'Cubixsol develops Cloudbeds integrations with booking channels, payment systems, CRM platforms, accounting tools, smart devices, and custom applications.'
    },
    {
      q: 'Can Cloudbeds integrate with Airbnb and other OTAs?',
      a: 'Yes, Cloudbeds supports connections with multiple booking channels, and Cubixsol can create customised integration solutions.'
    },
    {
      q: 'Does Cubixsol provide Cloudbeds API integration?',
      a: 'Yes, our developers create API-based integrations that connect Cloudbeds with external business applications.'
    },
    {
      q: 'Can Cloudbeds integrate with payment gateways?',
      a: 'Yes, Cloudbeds can connect with payment solutions to support secure transaction processing.'
    },
    {
      q: 'How can Cloudbeds integration improve hotel operations?',
      a: 'Cloudbeds integration helps automate workflows, synchronise data, and improve overall hospitality management efficiency.'
    }
  ],

  // SEO
  seo: {
    metaTitle: 'Cloudbeds Integration Services | Custom Hospitality PMS Solutions | Cubixsol',
    metaDescription: 'Professional Cloudbeds integration services by Cubixsol. Connect Cloudbeds PMS with OTAs, direct booking websites, payment gateways, smart locks, and CRMs.',
    keywords: 'Cloudbeds integration, Cloudbeds API development, hotel PMS integration, Cloudbeds channel manager, Cloudbeds payment gateway, Cubixsol',
    ogTitle: 'Cloudbeds Integration Services | Cubixsol',
    ogDescription: 'Custom Cloudbeds integration solutions for hospitality businesses. Multi-channel synchronization, API bridges, guest experience, and automated workflows.',
    ogImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&h=800&q=80',
    canonicalUrl: 'https://cubixsol.com/cloudbeds-integration'
  }
};

export default function CloudbedsIntegration() {
  const { openEstimateModal } = useEstimateModal();
  const [data, setData] = useState(DEFAULT_DATA);
  const [activeTab, setActiveTab] = useState('channel-manager');
  const [openFaq, setOpenFaq] = useState(null);

  // Interactive Simulator States
  const [simChannel, setSimChannel] = useState('booking');
  const [syncStatus, setSyncStatus] = useState({ state: 'synced', latency: '24ms', lastUpdated: 'Just now' });
  const [isSyncing, setIsSyncing] = useState(false);
  const [generatedPin, setGeneratedPin] = useState('629104');

  // Fetch dynamic content from Admin Dashboard API
  useEffect(() => {
    let isMounted = true;
    apiFetch('services/cloudbeds-integration')
      .then((res) => {
        if (isMounted && res && res.slug) {
          setData((prev) => ({
            ...prev,
            ...res,
            seo: res.seo || prev.seo,
            heroBadges: res.heroBadges?.length ? res.heroBadges : prev.heroBadges,
            subServicesItems: res.subServicesItems?.length ? res.subServicesItems : prev.subServicesItems,
            coreSolutions: res.coreSolutions?.length ? res.coreSolutions : prev.coreSolutions,
            serviceProcessSteps: res.serviceProcessSteps?.length ? res.serviceProcessSteps : prev.serviceProcessSteps,
            whyChooseItems: res.whyChooseItems?.length ? res.whyChooseItems : prev.whyChooseItems,
            faqs: res.faqs?.length ? res.faqs : prev.faqs,
          }));
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  useSEO(data?.seo, DEFAULT_DATA?.seo);


  const handleTriggerSync = (channel) => {
    setSimChannel(channel);
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      const newPin = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedPin(newPin);
      setSyncStatus({
        state: 'synced',
        latency: `${Math.floor(16 + Math.random() * 20)}ms`,
        lastUpdated: 'Just now'
      });
    }, 600);
  };

  const coreModules = data.coreSolutions || DEFAULT_DATA.coreSolutions;
  const currentModule = coreModules.find((m) => m.id === activeTab) || coreModules[0];
  const subServicesItems = data.subServicesItems || DEFAULT_DATA.subServicesItems;
  const processSteps = data.serviceProcessSteps || DEFAULT_DATA.serviceProcessSteps;
  const whyChooseItems = data.whyChooseItems || DEFAULT_DATA.whyChooseItems;
  const faqs = data.faqs || DEFAULT_DATA.faqs;

  return (
    <div className="min-h-screen bg-white text-ink selection:bg-[#00a4d8] selection:text-white overflow-x-hidden font-sans">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (LUXURY DARK MIDNIGHT WITH CUBIXSOL CYAN & PURPLE) */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 bg-gradient-to-br from-slate-950 via-[#071326] to-[#040e1c] text-white border-b border-slate-800/80">
        
        {/* Brand Glow Meshes (Cyan #00a4d8 & Purple #5d53a3) */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#00a4d8]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-[#5d53a3]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link
              to="/all-services"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-cyan-300 transition group"
            >
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform text-[#00a4d8]" />
              Back to Services
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
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00a4d8]/15 border border-[#00a4d8]/30 text-cyan-300 text-xs font-bold uppercase tracking-wider shadow-sm backdrop-blur-sm"
              >
                <Radio className="w-3.5 h-3.5 text-[#00a4d8] animate-pulse" />
                <span>{data.heroEyebrow || 'CLOUDBEDS INTEGRATION SERVICES'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.18]"
              >
                Custom <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a4d8] via-cyan-300 to-[#5d53a3]">Cloudbeds Integration</span> Solutions For Hospitality Businesses
              </motion.h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal max-w-2xl"
              >
                {data.heroDesc}
              </motion.p>

              {/* Feature Bullet Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2"
              >
                {(data.heroBadges || DEFAULT_DATA.heroBadges).map((badge, idx) => (
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

              {/* CTA Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
              >
                <button
                  onClick={() => openEstimateModal('Cloudbeds Integration Services')}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#00a4d8] to-[#5d53a3] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#00a4d8]/25 hover:shadow-[#5d53a3]/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>{data.heroPrimaryBtnText || 'Schedule A Cloudbeds Consultation'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#core-capabilities"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 hover:text-white font-semibold text-sm sm:text-base border border-slate-700 transition"
                >
                  <span>{data.heroSecondaryBtnText || 'Explore Cloudbeds Solutions'}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </a>
              </motion.div>

            </div>

            {/* Right Column: Interactive Live Architecture & Data Flow Visualizer */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/95 to-slate-950/95 border border-slate-700/80 p-5 sm:p-6 shadow-2xl backdrop-blur-xl">
                
                {/* Top Header Card */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#5d53a3]/20 border border-[#5d53a3]/40 flex items-center justify-center">
                      <Cloud className="w-5 h-5 text-[#a594f9]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Cloudbeds Engine Core</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          LIVE SYNC
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">Unified Hospitality Technology Network</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono text-slate-400">Latency: </span>
                    <span className="text-[11px] font-mono font-bold text-emerald-400">{syncStatus.latency}</span>
                  </div>
                </div>

                {/* Connected System Nodes Grid */}
                <div className="space-y-2.5">
                  
                  {/* Node 1: OTAs & Channels */}
                  <div
                    onClick={() => handleTriggerSync('booking')}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      simChannel === 'booking'
                        ? 'bg-[#00a4d8]/15 border-[#00a4d8]/60 shadow-md shadow-[#00a4d8]/10'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Share2 className="w-4 h-4 text-[#00a4d8]" />
                        <span className="text-xs font-bold text-slate-200">OTAs (Booking.com, Airbnb, Expedia)</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        2-Way Sync
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 pl-6.5">
                      Real-time inventory lock, room availability updates & instant rate parity
                    </p>
                  </div>

                  {/* Node 2: Direct Booking Engine */}
                  <div
                    onClick={() => handleTriggerSync('direct')}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      simChannel === 'direct'
                        ? 'bg-[#5d53a3]/20 border-[#5d53a3]/60 shadow-md shadow-[#5d53a3]/10'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Globe className="w-4 h-4 text-[#5d53a3]" />
                        <span className="text-xs font-bold text-slate-200">Direct Booking Engine & Website</span>
                      </div>
                      <span className="text-[10px] font-mono text-purple-300">Commission-Free</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 pl-6.5">
                      Direct website checkout, automated processing & instant guest confirmation
                    </p>
                  </div>

                  {/* Node 3: Smart Locks & Access */}
                  <div
                    onClick={() => handleTriggerSync('smartlock')}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      simChannel === 'smartlock'
                        ? 'bg-[#00a4d8]/15 border-[#00a4d8]/60 shadow-md shadow-[#00a4d8]/10'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <KeyRound className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs font-bold text-slate-200">Smart Lock Door Access PIN: {generatedPin}</span>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-300">Generated</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 pl-6.5">
                      Automated keyless entry PIN generation mapped to check-in/out timestamps
                    </p>
                  </div>

                  {/* Node 4: Payment & Accounting */}
                  <div
                    onClick={() => handleTriggerSync('payment')}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      simChannel === 'payment'
                        ? 'bg-[#5d53a3]/20 border-[#5d53a3]/60 shadow-md shadow-[#5d53a3]/10'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <CreditCard className="w-4 h-4 text-[#5d53a3]" />
                        <span className="text-xs font-bold text-slate-200">Payment Gateways & Accounting Ledgers</span>
                      </div>
                      <span className="text-[10px] font-mono text-purple-300">Auto Invoicing</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 pl-6.5">
                      Stripe payment pre-authorizations, automated invoicing & QuickBooks sync
                    </p>
                  </div>

                </div>

                {/* Visualizer Simulator Action Bar */}
                <div className="mt-4 pt-3.5 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-amber-400 animate-spin' : 'bg-emerald-400'}`} />
                    <span className="text-xs text-slate-300">
                      {isSyncing ? 'Synchronizing Cloudbeds API payload...' : 'All connected systems operational'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleTriggerSync(simChannel)}
                    disabled={isSyncing}
                    className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#00a4d8] to-[#5d53a3] hover:opacity-95 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                  >
                    <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>Trigger Sync</span>
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SECTION 1: CONNECT CLOUDBEDS WITH YOUR HOSPITALITY TECHNOLOGY STACK */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-24 bg-slate-50/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/20 text-[#00a4d8] text-xs font-bold uppercase tracking-wider">
              <Workflow className="w-3.5 h-3.5 text-[#00a4d8]" />
              <span>HOSPITALITY TECHNOLOGY STACK</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              {data.subServicesTitle || 'Connect Cloudbeds With Your Hospitality Technology Stack'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {data.subServicesIntro || DEFAULT_DATA.subServicesIntro}
            </p>
          </div>

          {/* 8 Business Application Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subServicesItems.map((item, idx) => {
              const isCyan = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="group rounded-2xl bg-white border border-gray-100 hover:border-[#00a4d8]/40 shadow-card hover:shadow-soft p-6 flex flex-col justify-between transition-all duration-300"
                >
                  <div className="space-y-3.5">
                    {/* Top Tag & Icon */}
                    <div className="flex items-center justify-between">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                        isCyan ? 'bg-[#00a4d8]/10 text-[#00a4d8]' : 'bg-[#5d53a3]/10 text-[#5d53a3]'
                      }`}>
                        <DynamicIcon name={item.icon || 'Share2'} className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200 uppercase">
                        {item.tag || `STACK 0${idx + 1}`}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-ink group-hover:text-[#00a4d8] transition-colors leading-snug">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Pills */}
                  {item.pills && item.pills.length > 0 && (
                    <div className="pt-4 mt-4 border-t border-gray-100 flex flex-wrap gap-1.5">
                      {item.pills.map((pill, pIdx) => (
                        <span
                          key={pIdx}
                          className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-50 border border-gray-200 text-slate-700"
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SECTION 2: CORE CLOUDBEDS INTEGRATION SOLUTIONS (5 MODULE TABS) */}
      {/* ========================================================================= */}
      <section id="core-capabilities" className="py-20 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5d53a3]/10 border border-[#5d53a3]/20 text-[#5d53a3] text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-[#5d53a3]" />
              <span>CORE PMS CAPABILITIES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              {data.coreSolutionsTitle || 'Core Cloudbeds Integration Solutions'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {data.coreSolutionsIntro || DEFAULT_DATA.coreSolutionsIntro}
            </p>
          </div>

          {/* Module Selector Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
            {coreModules.map((module) => {
              const isActive = activeTab === module.id;
              return (
                <button
                  key={module.id}
                  onClick={() => setActiveTab(module.id)}
                  className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#00a4d8] to-[#5d53a3] text-white shadow-soft scale-105'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-gray-200'
                  }`}
                >
                  <DynamicIcon name={module.icon || 'Layers'} className="w-4 h-4" />
                  <span>{module.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Module Showcase Card */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-950 via-[#071326] to-[#040e1c] border border-slate-800 p-6 sm:p-10 text-white shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Details & Feature Checklist */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00a4d8]/15 border border-[#00a4d8]/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                  <span>{currentModule.badge || 'CLOUDBEDS MODULE'}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {currentModule.title}
                </h3>

                <p className="text-xs sm:text-sm font-semibold text-cyan-300">
                  {currentModule.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {currentModule.desc}
                </p>

                {/* Features List */}
                <div className="space-y-2.5 pt-2">
                  {currentModule.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-md bg-[#00a4d8]/20 border border-[#00a4d8]/40 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-cyan-300" />
                      </div>
                      <span className="text-xs sm:text-sm text-slate-200 font-medium leading-normal">{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => openEstimateModal(`Cloudbeds - ${currentModule.title}`)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00a4d8] to-[#5d53a3] text-white font-bold text-xs sm:text-sm hover:opacity-95 shadow-soft transition"
                  >
                    <span>Integrate This Module</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: Live Terminal Visualizer */}
              <div className="lg:col-span-5">
                <div className="rounded-xl bg-slate-900/90 border border-slate-700/70 p-5 space-y-4 font-mono text-xs shadow-inner">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-[11px] text-slate-400">
                    <span className="flex items-center gap-2 text-cyan-300">
                      <Terminal className="w-3.5 h-3.5" />
                      CLOUDBEDS_PIPELINE.json
                    </span>
                    <span className="text-emerald-400">200 OK</span>
                  </div>

                  <div className="space-y-1.5 text-slate-300 text-[11px]">
                    <div className="text-slate-500">// Cubixsol Cloudbeds Integration Gateway</div>
                    <div><span className="text-purple-400">"platform":</span> <span className="text-cyan-300">"Cloudbeds PMS"</span>,</div>
                    <div><span className="text-purple-400">"activeModule":</span> <span className="text-amber-300">"{currentModule.id}"</span>,</div>
                    <div><span className="text-purple-400">"status":</span> <span className="text-emerald-400">"CONNECTED"</span>,</div>
                    <div><span className="text-purple-400">"latency":</span> <span className="text-emerald-400">"24ms"</span>,</div>
                    <div><span className="text-purple-400">"webhooks":</span> <span className="text-slate-300">["reservation.created", "rate.synchronized", "guest.checkedIn"]</span></div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Target PMS: <strong className="text-white">Cloudbeds API v1.2</strong></span>
                    <span>Security: <strong className="text-cyan-300">OAuth 2.0 / SHA256</strong></span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SECTION 3: OUR CLOUDBEDS INTEGRATION PROCESS (5 STEPS) */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-24 bg-slate-50/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/20 text-[#00a4d8] text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-[#00a4d8]" />
              <span>STRUCTURED PROCESS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              {data.serviceProcessTitle || 'Our Cloudbeds Integration Process'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {data.serviceProcessIntro || DEFAULT_DATA.serviceProcessIntro}
            </p>
          </div>

          {/* 5-Step Process Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {processSteps.map((step, idx) => {
              const isCyan = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl bg-white border border-gray-100 hover:border-[#00a4d8]/40 shadow-card hover:shadow-soft p-6 flex flex-col justify-between transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-mono font-extrabold px-2.5 py-1 rounded-md ${
                        isCyan ? 'bg-[#00a4d8]/10 text-[#00a4d8]' : 'bg-[#5d53a3]/10 text-[#5d53a3]'
                      }`}>
                        PHASE {step.stepNumber || `0${idx + 1}`}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-ink group-hover:text-[#00a4d8] transition-colors">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                    <CheckCircle className={`w-3.5 h-3.5 ${isCyan ? 'text-[#00a4d8]' : 'text-[#5d53a3]'}`} />
                    <span>Milestone Completed</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SECTION 4: WHY CHOOSE CUBIXSOL FOR CLOUDBEDS INTEGRATION */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5d53a3]/10 border border-[#5d53a3]/20 text-[#5d53a3] text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-[#5d53a3]" />
              <span>THE CUBIXSOL ADVANTAGE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              {data.whyChooseTitle || 'Why Choose Cubixsol For Cloudbeds Integration?'}
            </h2>
            <div className="text-sm sm:text-base text-gray-600 leading-relaxed space-y-3">
              {(data.whyChooseIntro || DEFAULT_DATA.whyChooseIntro).split('\n\n').map((para, pIdx) => (
                <p key={pIdx}>{para}</p>
              ))}
            </div>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseItems.map((item, idx) => {
              const isCyan = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-2xl bg-white border border-gray-100 hover:border-[#00a4d8]/40 shadow-card hover:shadow-soft p-6 flex flex-col justify-between transition-all duration-300"
                >
                  <div className="space-y-3.5">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                      isCyan ? 'bg-[#00a4d8]/10 text-[#00a4d8]' : 'bg-[#5d53a3]/10 text-[#5d53a3]'
                    }`}>
                      {idx === 0 && <Sliders className="w-5 h-5" />}
                      {idx === 1 && <ShieldCheck className="w-5 h-5" />}
                      {idx === 2 && <Sparkles className="w-5 h-5" />}
                      {idx === 3 && <Headphones className="w-5 h-5" />}
                    </div>

                    <h3 className="text-base font-bold text-ink leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-[11px] font-semibold text-slate-500">
                    <span>Platform Reliability</span>
                    <strong className={isCyan ? 'text-[#00a4d8]' : 'text-[#5d53a3]'}>Enterprise 99.9%</strong>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. SECTION 5: FREQUENTLY ASKED QUESTIONS */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-24 bg-slate-50/70 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/20 text-[#00a4d8] text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5 text-[#00a4d8]" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Answers to common questions about our custom Cloudbeds integration services.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-3.5">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'bg-white border-[#00a4d8]/40 shadow-soft'
                      : 'bg-white border-gray-100 hover:border-gray-200 shadow-card'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4"
                  >
                    <span className={`text-sm sm:text-base font-bold transition-colors ${isOpen ? 'text-[#00a4d8]' : 'text-ink'}`}>
                      {faq.q}
                    </span>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-[#00a4d8]/10 text-[#00a4d8] rotate-180' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
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

      {/* ========================================================================= */}
      {/* 7. CTA BANNER */}
      {/* ========================================================================= */}
      <CtaBanner
        badge="CLOUDBEDS INTEGRATION SPECIALISTS"
        title="Ready To Modernize Your Hospitality Stack With Cloudbeds?"
        description="Schedule a technical consultation to design custom API bridges, booking engine integrations, smart locks, and multi-channel synchronization."
        primaryText="Schedule A Cloudbeds Consultation"
        secondaryText="Explore All PMS Integrations"
      />

    </div>
  );
}
