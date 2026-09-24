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
  Network, Activity, Shuffle, Headphones, Hotel, Utensils
} from 'lucide-react';
import { useEstimateModal } from '../context/EstimateModalContext';
import { apiFetch } from '../utils/api';
import { formatInline } from '../utils/formatText';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';
import CtaBanner from '../components/CtaBanner';
import DynamicIcon from '../components/DynamicIcon';
import { useSEO } from '../utils/seo';

// Default static fallback data matching the document provided for Opera PMS Integration Services
const DEFAULT_DATA = {
  slug: 'opera-pms-integration',
  title: 'Opera PMS Integration Services',
  heroEyebrow: 'OPERA PMS INTEGRATION SERVICES',
  heroTitle: 'Custom Opera PMS Integration Solutions For Enterprise Hotels',
  heroDesc: 'Cubixsol provides professional Opera PMS integration services to help hotels and hospitality organisations connect their property management system with modern digital solutions. Opera PMS is a widely used hotel property management system. We develop Opera PMS capabilities through secure integrations to connect hotels with third-party platforms and business applications.',
  heroPrimaryBtnText: 'Schedule An Opera PMS Consultation',
  heroSecondaryBtnText: 'Explore Opera PMS Solutions',
  heroBadges: [
    'Enterprise Channel & Central Reservation System (CRS) Bridging',
    'Custom Opera PMS API Development & OWS / OXI Integration',
    'Restaurant POS Charge Posting & Departmental Folio Routing',
    'Automated Payment Gateways & Accounting Ledger Synchronization',
    'Digital Check-in, Keyless Door Access & Guest Loyalty Integration'
  ],
  heroImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&h=800&q=80',

  // Section 1: Connect Opera PMS With Your Hotel Technology Ecosystem
  subServicesTitle: 'Connect Opera PMS With Your Hotel Technology Ecosystem',
  subServicesIntro: 'Large hotels require multiple systems to manage guest services, financial operations, and daily activities. We develop Opera PMS integrations that connect your system with essential hospitality technologies, including:',
  subServicesItems: [
    {
      icon: 'Share2',
      tag: 'BOOKING PLATFORMS',
      title: 'Online travel agencies and booking platforms.',
      desc: 'Synchronise room availability, rates, and guest profiles in real time across global OTAs and booking channels.',
      pills: ['OTA 2-Way Sync', 'Live Rate Parity', 'Instant Availability'],
      colorTheme: 'cyan'
    },
    {
      icon: 'Network',
      tag: 'CENTRAL RESERVATIONS',
      title: 'Central reservation systems.',
      desc: 'Connect global distribution networks and CRS platforms directly with Opera PMS for unified multi-property inventory routing.',
      pills: ['GDS / CRS Bridge', 'Multi-Property Hub', 'Global Distribution'],
      colorTheme: 'purple'
    },
    {
      icon: 'CreditCard',
      tag: 'PAYMENT GATEWAYS',
      title: 'Payment gateways.',
      desc: 'Integrate secure payment processors to automate pre-authorizations, folio settlements, and card tokenization.',
      pills: ['Stripe & Merchant Pay', 'Pre-Auth Holds', 'Tokenized Security'],
      colorTheme: 'cyan'
    },
    {
      icon: 'Laptop',
      tag: 'POS SYSTEMS',
      title: 'Point of sale (POS) systems.',
      desc: 'Enable seamless room charge postings from restaurants, bars, spas, and outlets directly to guest folios in Opera.',
      pills: ['Restaurant POS Bridge', 'Room Charge Posting', 'Folio Routing'],
      colorTheme: 'purple'
    },
    {
      icon: 'Users',
      tag: 'CRM PLATFORMS',
      title: 'Customer relationship management platforms.',
      desc: 'Consolidate guest preferences, stay histories, and VIP loyalty profiles with enterprise CRM platforms.',
      pills: ['HubSpot / Salesforce', 'Guest History Sync', 'Loyalty Tracking'],
      colorTheme: 'cyan'
    },
    {
      icon: 'PieChart',
      tag: 'ACCOUNTING',
      title: 'Accounting software.',
      desc: 'Synchronise night audit totals, departmental revenue, taxes, and ledgers with enterprise accounting software.',
      pills: ['QuickBooks & SAP', 'Night Audit Sync', 'Tax Automations'],
      colorTheme: 'purple'
    },
    {
      icon: 'KeyRound',
      tag: 'ACCESS CONTROL',
      title: 'Door lock and access control systems.',
      desc: 'Connect RFID keycards and digital smart locks (Assa Abloy, VingCard, Salto) to automate guest room access.',
      pills: ['VingCard / Salto', 'Keyless Mobile Access', 'Automated Check-in'],
      colorTheme: 'cyan'
    },
    {
      icon: 'BarChart3',
      tag: 'BUSINESS INTELLIGENCE',
      title: 'Business intelligence solutions.',
      desc: 'Bridge Opera PMS data with BI analytics dashboards to track RevPAR, ADR, occupancy rates, and departmental profitability.',
      pills: ['BI Dashboards', 'RevPAR & ADR Trends', 'Occupancy Analytics'],
      colorTheme: 'purple'
    }
  ],

  // Section 2: Core Specialized Modules
  coreSolutionsTitle: 'Core Opera PMS Integration Solutions',
  coreSolutionsIntro: 'Our specialized integration modules bridge Opera PMS with every operational touchpoint of your hotel enterprise.',
  coreSolutions: [
    {
      id: 'channel-reservation',
      title: 'Opera PMS Channel And Reservation Integration',
      subtitle: 'Multi-Source Booking Synchronization & Centralized Inventory Control',
      desc: 'Hotels receive bookings from multiple sources, including direct websites, travel agencies, and online booking platforms. We help connect Opera PMS with reservation channels to maintain accurate booking information. Our reservation integration services include:',
      icon: 'Share2',
      badge: 'RESERVATION INTEGRATION',
      features: [
        'Reservation synchronisation.',
        'Room availability updates.',
        'Guest profile transfer.',
        'Rate and inventory management.',
        'Booking status automation.'
      ]
    },
    {
      id: 'api-services',
      title: 'Opera PMS API Integration Services',
      subtitle: 'Secure API Framework, Custom Data Bridges & OWS / OXI Connectivity',
      desc: 'We provide custom Opera PMS API integration solutions that allow hotels to connect their existing applications with their property management system. Our developers build secure and reliable integrations based on business requirements. Our Opera PMS API services include:',
      icon: 'Terminal',
      badge: 'API DEVELOPMENT',
      features: [
        'Custom API development.',
        'Third-party application connections.',
        'Data synchronisation solutions.',
        'Workflow automation.',
        'System integration testing.'
      ]
    },
    {
      id: 'pos-integration',
      title: 'Opera PMS POS Integration',
      subtitle: 'Seamless F&B Charge Posting, Guest Account Sync & Department Reporting',
      desc: 'Hotels often require smooth communication between front-office systems and restaurant or service operations. We integrate Opera PMS with POS platforms to improve billing accuracy and guest convenience. Our POS integration solutions support:',
      icon: 'Laptop',
      badge: 'POS & OUTLETS',
      features: [
        'Restaurant charge posting.',
        'Guest account synchronisation.',
        'Billing automation.',
        'Transaction data exchange.',
        'Department-level reporting.'
      ]
    },
    {
      id: 'payment-accounting',
      title: 'Opera PMS Payment And Accounting Integration',
      subtitle: 'Automated Billing Workflows, Invoice Management & Ledger Connectivity',
      desc: 'Financial management is a critical part of hotel operations. Connected financial systems help hotels maintain accurate records and improve revenue management processes. We connect Opera PMS with payment and accounting systems to improve transaction processing and reporting. Our solutions include:',
      icon: 'CreditCard',
      badge: 'FINANCIAL MANAGEMENT',
      features: [
        'Payment gateway integration.',
        'Automated billing workflows.',
        'Invoice management.',
        'Financial data synchronisation.',
        'Accounting software connectivity.'
      ]
    },
    {
      id: 'guest-experience',
      title: 'Opera PMS Guest Experience Integration',
      subtitle: 'Personalized Hospitality Services, Digital Check-in & Mobile Solutions',
      desc: 'Modern hotels use technology to improve guest satisfaction throughout the stay. We develop Opera PMS integrations that support personalised guest services and automated communication. Our guest experience solutions include:',
      icon: 'MessageSquare',
      badge: 'GUEST EXPERIENCE',
      features: [
        'Digital check-in systems.',
        'Guest messaging platforms.',
        'Loyalty program connections.',
        'Customer relationship management.',
        'Mobile hospitality solutions.'
      ]
    }
  ],

  // Section 3: Our Opera PMS Integration Process
  serviceProcessTitle: 'Our Opera PMS Integration Process',
  serviceProcessIntro: 'Cubixsol follows a professional approach to deliver reliable Opera PMS integration solutions:',
  serviceProcessSteps: [
    {
      stepNumber: '01',
      title: 'Requirement Analysis:',
      desc: 'Our team evaluates your hotel operations, existing systems, and integration objectives.'
    },
    {
      stepNumber: '02',
      title: 'Technical Architecture:',
      desc: 'We design a secure integration framework based on your business environment.'
    },
    {
      stepNumber: '03',
      title: 'Development And Configuration:',
      desc: 'Our developers build and configure the required system connections.'
    },
    {
      stepNumber: '04',
      title: 'Testing And Deployment:',
      desc: 'We verify performance, security, and data accuracy before implementation.'
    },
    {
      stepNumber: '05',
      title: 'Support And Maintenance:',
      desc: 'Our team provides ongoing technical support after deployment.'
    }
  ],

  // Section 4: Why Choose Cubixsol For Opera PMS Integration
  whyChooseTitle: 'Why Choose Cubixsol For Opera PMS Integration?',
  whyChooseIntro: 'Cubixsol delivers enterprise-focused Opera PMS integration solutions designed for hotels that require reliable system connectivity. Our developers understand the complexity of hospitality environments and build integrations to improve communication between front-office, financial, and operational systems.\n\nWe create solutions that connect Opera PMS with the technologies hotels rely on every day, including booking platforms, POS systems, payment tools, and guest service applications. Cubixsol focuses on secure development, smooth data exchange, and scalable integrations that support modern hotel operations.',
  whyChooseItems: [
    {
      title: 'Enterprise Hotel Architecture',
      desc: 'Custom engineered data bridges tailored to your exact property portfolio size, third-party software stack, and hospitality model.'
    },
    {
      title: 'Zero Double-Booking Guarantee',
      desc: 'Sub-second bidirectional synchronization across global OTAs, central reservation systems, and direct web engines.'
    },
    {
      title: 'Frictionless POS & Folio Routing',
      desc: 'Instant restaurant and spa charge posting mapped automatically to guest room folios with department-level auditing.'
    },
    {
      title: 'End-to-End Technical Support',
      desc: 'Continuous monitoring, webhook error handling, API version maintenance, and 24/7 technical oversight.'
    }
  ],

  // Section 5: FAQs
  faqs: [
    {
      q: 'What Opera PMS integration services does Cubixsol provide?',
      a: 'Cubixsol develops Opera PMS integrations with booking platforms, POS systems, payment gateways, CRM tools, accounting software, and other hospitality applications.'
    },
    {
      q: 'Can Opera PMS integrate with third-party hotel systems?',
      a: 'Yes, Opera PMS can connect with external platforms, and Cubixsol develops customised integration solutions based on hotel requirements.'
    },
    {
      q: 'Does Cubixsol provide Opera PMS API integration?',
      a: 'Yes, our developers create API-based integrations that connect Opera PMS with external applications and business systems.'
    },
    {
      q: 'Can Opera PMS integrate with POS systems?',
      a: 'Yes, Opera PMS can connect with POS solutions to synchronise guest charges, billing information, and operational data.'
    },
    {
      q: 'How does Opera PMS integration improve hotel management?',
      a: 'Opera PMS integration improves data accuracy, automates workflows, and helps hotels manage operations more efficiently.'
    }
  ],

  // SEO
  seo: {
    metaTitle: 'Opera PMS Integration Services | Enterprise Hotel Solutions | Cubixsol',
    metaDescription: 'Professional Opera PMS integration services by Cubixsol. Connect Opera PMS with POS systems, OTAs, payment gateways, access controls, and CRMs.',
    keywords: 'Opera PMS integration, Opera PMS API, hotel PMS integration, Opera POS integration, Oracle Opera PMS, Cubixsol',
    ogTitle: 'Opera PMS Integration Services | Cubixsol',
    ogDescription: 'Custom Opera PMS integration solutions for enterprise hotels. POS charge posting, channel synchronization, API bridges, and automated workflows.',
    ogImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&h=800&q=80',
    canonicalUrl: 'https://cubixsol.com/opera-pms-integration'
  }
};

export default function OperaPmsIntegration() {
  const { openEstimateModal } = useEstimateModal();
  const [data, setData] = useState(DEFAULT_DATA);
  const [activeTab, setActiveTab] = useState('channel-reservation');
  const [openFaq, setOpenFaq] = useState(null);

  // Interactive Simulator States
  const [simChannel, setSimChannel] = useState('pos');
  const [syncStatus, setSyncStatus] = useState({ state: 'synced', latency: '19ms', lastUpdated: 'Just now' });
  const [isSyncing, setIsSyncing] = useState(false);
  const [guestFolio, setGuestFolio] = useState({ room: 'Suite 408', total: '$480.00', lastCharge: 'Restaurant $124.50' });

  // Fetch dynamic content from Admin Dashboard API
  useEffect(() => {
    let isMounted = true;
    apiFetch('/api/services/opera-pms-integration')
      .then((res) => {
        if (isMounted && res && res.slug) {
          setData((prev) => ({
            ...prev,
            ...res,
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

  useSEO({
    title: data.seo?.metaTitle || DEFAULT_DATA.seo.metaTitle,
    description: data.seo?.metaDescription || DEFAULT_DATA.seo.metaDescription,
    keywords: data.seo?.keywords || DEFAULT_DATA.seo.keywords,
    ogTitle: data.seo?.ogTitle || DEFAULT_DATA.seo.ogTitle,
    ogDescription: data.seo?.ogDescription || DEFAULT_DATA.seo.ogDescription,
    ogImage: data.seo?.ogImage || DEFAULT_DATA.seo.ogImage,
    canonicalUrl: data.seo?.canonicalUrl || DEFAULT_DATA.seo.canonicalUrl,
  });

  const handleTriggerSync = (channel) => {
    setSimChannel(channel);
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      const charges = ['Restaurant $145.00', 'Spa Treatment $210.00', 'Room Service $68.50', 'Lounge Bar $84.00'];
      const randomCharge = charges[Math.floor(Math.random() * charges.length)];
      setGuestFolio(prev => ({
        ...prev,
        lastCharge: randomCharge
      }));
      setSyncStatus({
        state: 'synced',
        latency: `${Math.floor(12 + Math.random() * 15)}ms`,
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
                <span>{data.heroEyebrow || 'OPERA PMS INTEGRATION SERVICES'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.18]"
              >
                Custom <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a4d8] via-cyan-300 to-[#5d53a3]">Opera PMS Integration</span> Solutions For Enterprise Hotels
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
                  onClick={() => openEstimateModal('Opera PMS Integration Services')}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#00a4d8] to-[#5d53a3] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#00a4d8]/25 hover:shadow-[#5d53a3]/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>{data.heroPrimaryBtnText || 'Schedule An Opera PMS Consultation'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#core-capabilities"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 hover:text-white font-semibold text-sm sm:text-base border border-slate-700 transition"
                >
                  <span>{data.heroSecondaryBtnText || 'Explore Opera PMS Solutions'}</span>
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
                    <div className="w-10 h-10 rounded-xl bg-[#00a4d8]/15 border border-[#00a4d8]/30 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-[#00a4d8]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Opera Central Gateway</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          ENTERPRISE
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">Oracle Opera OWS / OXI Interface</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono text-slate-400">Latency: </span>
                    <span className="text-[11px] font-mono font-bold text-emerald-400">{syncStatus.latency}</span>
                  </div>
                </div>

                {/* Connected System Nodes Grid */}
                <div className="space-y-2.5">
                  
                  {/* Node 1: POS Restaurant Charge Posting */}
                  <div
                    onClick={() => handleTriggerSync('pos')}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      simChannel === 'pos'
                        ? 'bg-[#00a4d8]/15 border-[#00a4d8]/60 shadow-md shadow-[#00a4d8]/10'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Laptop className="w-4 h-4 text-[#00a4d8]" />
                        <span className="text-xs font-bold text-slate-200">POS Outlets & Folio Charge Posting</span>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-300">Room Folio Sync</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 pl-6.5">
                      Last Charge: <strong className="text-cyan-300">{guestFolio.lastCharge}</strong> to {guestFolio.room}
                    </p>
                  </div>

                  {/* Node 2: CRS & Central Reservations */}
                  <div
                    onClick={() => handleTriggerSync('crs')}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      simChannel === 'crs'
                        ? 'bg-[#5d53a3]/20 border-[#5d53a3]/60 shadow-md shadow-[#5d53a3]/10'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Network className="w-4 h-4 text-[#5d53a3]" />
                        <span className="text-xs font-bold text-slate-200">CRS & Global Distribution Systems</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        GDS Parity
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 pl-6.5">
                      Central reservation inventory updates across all worldwide hotel channels
                    </p>
                  </div>

                  {/* Node 3: Door Locks & RFID Keycards */}
                  <div
                    onClick={() => handleTriggerSync('keycard')}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      simChannel === 'keycard'
                        ? 'bg-[#00a4d8]/15 border-[#00a4d8]/60 shadow-md shadow-[#00a4d8]/10'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <KeyRound className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs font-bold text-slate-200">VingCard / Salto Door Lock Interface</span>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-300">RFID Encoder</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 pl-6.5">
                      Automated keycard encoding and mobile digital key dispatch for {guestFolio.room}
                    </p>
                  </div>

                  {/* Node 4: Payment & Accounting */}
                  <div
                    onClick={() => handleTriggerSync('accounting')}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      simChannel === 'accounting'
                        ? 'bg-[#5d53a3]/20 border-[#5d53a3]/60 shadow-md shadow-[#5d53a3]/10'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <CreditCard className="w-4 h-4 text-[#5d53a3]" />
                        <span className="text-xs font-bold text-slate-200">Night Audit & Financial Ledgers</span>
                      </div>
                      <span className="text-[10px] font-mono text-purple-300">SAP / QuickBooks</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 pl-6.5">
                      Automated night audit transfer, tax ledger splits & revenue reporting
                    </p>
                  </div>

                </div>

                {/* Visualizer Simulator Action Bar */}
                <div className="mt-4 pt-3.5 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-amber-400 animate-spin' : 'bg-emerald-400'}`} />
                    <span className="text-xs text-slate-300">
                      {isSyncing ? 'Synchronizing Opera OXI payload...' : 'All connected endpoints operational'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleTriggerSync(simChannel)}
                    disabled={isSyncing}
                    className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#00a4d8] to-[#5d53a3] hover:opacity-95 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                  >
                    <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>Test Opera Sync</span>
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SECTION 1: CONNECT OPERA PMS WITH YOUR HOTEL TECHNOLOGY ECOSYSTEM */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-24 bg-slate-50/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/20 text-[#00a4d8] text-xs font-bold uppercase tracking-wider">
              <Workflow className="w-3.5 h-3.5 text-[#00a4d8]" />
              <span>HOTEL TECHNOLOGY ECOSYSTEM</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              {data.subServicesTitle || 'Connect Opera PMS With Your Hotel Technology Ecosystem'}
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
                        {item.tag || `SYSTEM 0${idx + 1}`}
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
      {/* 3. SECTION 2: CORE OPERA PMS INTEGRATION SOLUTIONS (5 MODULE TABS) */}
      {/* ========================================================================= */}
      <section id="core-capabilities" className="py-20 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5d53a3]/10 border border-[#5d53a3]/20 text-[#5d53a3] text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-[#5d53a3]" />
              <span>CORE ENTERPRISE MODULES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              {data.coreSolutionsTitle || 'Core Opera PMS Integration Solutions'}
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
                  <span>{currentModule.badge || 'OPERA MODULE'}</span>
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
                    onClick={() => openEstimateModal(`Opera PMS - ${currentModule.title}`)}
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
                      OPERA_INTERFACE_OXI.json
                    </span>
                    <span className="text-emerald-400">200 OK</span>
                  </div>

                  <div className="space-y-1.5 text-slate-300 text-[11px]">
                    <div className="text-slate-500">// Oracle Opera PMS Data Stream</div>
                    <div><span className="text-purple-400">"pmsSystem":</span> <span className="text-cyan-300">"Opera Enterprise 5.x / Cloud"</span>,</div>
                    <div><span className="text-purple-400">"activeModule":</span> <span className="text-amber-300">"{currentModule.id}"</span>,</div>
                    <div><span className="text-purple-400">"interface":</span> <span className="text-emerald-400">"OWS_OXI_ACTIVE"</span>,</div>
                    <div><span className="text-purple-400">"latency":</span> <span className="text-emerald-400">"19ms"</span>,</div>
                    <div><span className="text-purple-400">"events":</span> <span className="text-slate-300">["res.created", "pos.chargePosted", "nightAudit.synced"]</span></div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Host Architecture: <strong className="text-white">Oracle Hospitality</strong></span>
                    <span>Encryption: <strong className="text-cyan-300">PCI-DSS / TLS 1.3</strong></span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SECTION 3: OUR OPERA PMS INTEGRATION PROCESS (5 STEPS) */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-24 bg-slate-50/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/20 text-[#00a4d8] text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-[#00a4d8]" />
              <span>ENTERPRISE PROCESS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              {data.serviceProcessTitle || 'Our Opera PMS Integration Process'}
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
                    <span>Verified Milestone</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. SECTION 4: WHY CHOOSE CUBIXSOL FOR OPERA PMS INTEGRATION */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5d53a3]/10 border border-[#5d53a3]/20 text-[#5d53a3] text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-[#5d53a3]" />
              <span>THE CUBIXSOL ADVANTAGE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              {data.whyChooseTitle || 'Why Choose Cubixsol For Opera PMS Integration?'}
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
                    <span>Enterprise Uptime</span>
                    <strong className={isCyan ? 'text-[#00a4d8]' : 'text-[#5d53a3]'}>Mission-Critical 99.99%</strong>
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
              Answers to common questions about our custom Opera PMS integration services.
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
        badge="OPERA PMS INTEGRATION SPECIALISTS"
        title="Ready To Connect & Scale Your Opera PMS Infrastructure?"
        description="Schedule an enterprise consultation to design custom OWS/OXI bridges, POS integrations, payment gateways, and central reservation routing."
        primaryText="Schedule An Opera PMS Consultation"
        secondaryText="Explore All PMS Integrations"
      />

    </div>
  );
}
