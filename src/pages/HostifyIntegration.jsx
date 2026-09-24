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
  Network, Activity, Shuffle
} from 'lucide-react';
import { useEstimateModal } from '../context/EstimateModalContext';
import { apiFetch } from '../utils/api';
import { formatInline } from '../utils/formatText';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';
import CtaBanner from '../components/CtaBanner';
import DynamicIcon from '../components/DynamicIcon';
import { useSEO } from '../utils/seo';

// Default static fallback data matching the document provided for Hostify Integration Services
const DEFAULT_DATA = {
  slug: 'hostify-integration',
  title: 'Hostify Integration Services',
  heroEyebrow: 'HOSTIFY INTEGRATION SERVICES',
  heroTitle: 'Hostify Integration Services To Automate Vacation Rental Operations',
  heroDesc: 'Cubixsol provides professional Hostify integration services to vacation rental businesses. We enhance Hostify functionality through custom integrations that connect your existing tools and support your specific business requirements. Our developers build customised integrations that improve reservation management, automate operational tasks, and create efficient workflows across different business applications.',
  heroPrimaryBtnText: 'Schedule A Hostify Consultation',
  heroSecondaryBtnText: 'Explore Hostify Capabilities',
  heroBadges: [
    '2-Way Channel Synchronisation & OTA Bridges',
    'Custom Hostify API Development & Webhooks',
    'Automated Payment Gateway & CRM Connections',
    'Smart Lock Access & Keyless Check-in Automation',
    'Multi-Property Unified Operations & Reporting'
  ],
  heroImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&h=800&q=80',

  // Section 1: Connect Hostify With Your Business Applications
  subServicesTitle: 'Connect Hostify With Your Business Applications',
  subServicesIntro: 'Vacation rental companies often rely on multiple digital solutions to manage their operations. Our integration solutions allow different platforms to exchange information smoothly and create a more efficient rental management workflow. We develop Hostify integrations that connect your PMS with important business systems, including:',
  subServicesItems: [
    {
      icon: 'Share2',
      tag: 'BOOKING CHANNELS',
      title: 'Airbnb, Booking.com, Vrbo, and other booking channels',
      desc: 'Synchronise rates, calendar availability, content, and instant reservations across all major global OTAs and booking channels in real-time.',
      pills: ['Airbnb Realtime Sync', 'Booking.com Rates', 'Vrbo Instant Booking'],
      colorTheme: 'cyan'
    },
    {
      icon: 'Globe',
      tag: 'DIRECT BOOKINGS',
      title: 'Direct booking websites',
      desc: 'Seamlessly link custom direct booking engines with Hostify to bypass OTA commission fees while keeping availability 100% unified.',
      pills: ['Custom Booking Engine', 'Commission-Free Flow', 'Instant Confirmation'],
      colorTheme: 'purple'
    },
    {
      icon: 'CreditCard',
      tag: 'FINANCIAL SETTLEMENTS',
      title: 'Payment gateways',
      desc: 'Connect secure payment processors (Stripe, Authorize.Net, PayPal) to automatically collect prepayments, balance settlements, and security deposits.',
      pills: ['Stripe Gateway', 'Automated Deposit Holds', 'Card Tokenization'],
      colorTheme: 'cyan'
    },
    {
      icon: 'Users',
      tag: 'GUEST RELATIONSHIPS',
      title: 'CRM platforms',
      desc: 'Consolidate guest profiles, stay histories, customer preferences, and lead nurturing pipelines with HubSpot, Salesforce, and modern CRMs.',
      pills: ['HubSpot / Salesforce', 'Guest History Consolidation', 'Loyalty Tracking'],
      colorTheme: 'purple'
    },
    {
      icon: 'KeyRound',
      tag: 'KEYLESS ENTRY',
      title: 'Smart lock systems',
      desc: 'Integrate smart access systems (Yale, Schlage, August, RemoteLock) to auto-generate time-bounded door PINs matching reservation check-in and check-out times.',
      pills: ['Automated Door PINs', 'RemoteLock / Yale', 'Contactless Guest Entry'],
      colorTheme: 'cyan'
    },
    {
      icon: 'PieChart',
      tag: 'ACCOUNTING & LEDGERS',
      title: 'Accounting software',
      desc: 'Synchronise payouts, cleaning fees, owner disbursements, and local tax records directly with QuickBooks, Xero, or custom accounting systems.',
      pills: ['QuickBooks & Xero', 'Tax Split Automations', 'Owner Payout Reports'],
      colorTheme: 'purple'
    },
    {
      icon: 'MessageSquare',
      tag: 'COMMUNICATION & OPS',
      title: 'Communication and automation tools',
      desc: 'Trigger automated WhatsApp, SMS, and email messages for pre-arrival instructions, mid-stay check-ins, review collection, and staff task dispatch.',
      pills: ['Automated Guest SMS', 'Staff Workflows', 'Review Generation'],
      colorTheme: 'cyan'
    },
    {
      icon: 'BarChart3',
      tag: 'PERFORMANCE ANALYTICS',
      title: 'Reporting applications',
      desc: 'Bridge Hostify data with business intelligence dashboards and reporting tools to track RevPAR, occupancy rates, and channel ROI in real-time.',
      pills: ['BI Dashboards', 'RevPAR & Occupancy', 'Multi-Unit Analytics'],
      colorTheme: 'purple'
    }
  ],

  // Section 2: Core Specialized Modules
  coreSolutionsTitle: 'Specialised Hostify Integration Capabilities',
  coreSolutionsIntro: 'Our specialized integration modules bridge Hostify with every operational touchpoint of your vacation rental business.',
  coreSolutions: [
    {
      id: 'channel-management',
      title: 'Hostify Channel Management Integration',
      subtitle: 'Unified Multi-Channel Synchronisation & Accurate Calendar Control',
      desc: 'Cubixsol helps businesses connect Hostify with external channels to maintain updated reservations, availability, and listing information. A connected channel management system helps property managers reduce manual updates and maintain consistent data across all platforms. Our channel integration services include:',
      icon: 'Share2',
      badge: 'CHANNEL SYNCHRONISATION',
      features: [
        'Reservation synchronisation.',
        'Calendar management.',
        'Listing updates.',
        'Guest information transfer.',
        'Booking status automation.'
      ]
    },
    {
      id: 'api-services',
      title: 'Hostify API Integration Services',
      subtitle: 'Secure API Architecture & Custom Bidirectional Data Bridges',
      desc: 'We provide custom Hostify API integration solutions that allow businesses to connect their preferred applications with their property management system. Our developers create secure API connections that support reliable data exchange. Our Hostify API services include:',
      icon: 'Terminal',
      badge: 'CUSTOM API ENGINEERING',
      features: [
        'Custom API development.',
        'Third-party software integration.',
        'Automated workflows.',
        'Data synchronisation.',
        'API testing and optimisation.'
      ]
    },
    {
      id: 'smart-locks',
      title: 'Hostify Smart Lock And Automation Integration',
      subtitle: 'Keyless Guest Entry, Automated PINs & Operational Notifications',
      desc: 'Automation improves property management by reducing repetitive tasks and improving guest convenience. Cubixsol connects Hostify with smart technologies to support modern rental operations. Our solutions allow rental businesses to provide smoother self-service experiences for guests. Our automation solutions include:',
      icon: 'KeyRound',
      badge: 'SMART AUTOMATION',
      features: [
        'Digital access management.',
        'Smart lock connectivity.',
        'Automated guest entry.',
        'Check-in workflow automation.',
        'Property notifications.'
      ]
    },
    {
      id: 'payment-crm',
      title: 'Hostify Payment And CRM Integration',
      subtitle: 'Automated Financial Settlements, Guest CRM & Transaction Tracking',
      desc: 'Cubixsol integrates Hostify with payment platforms and CRM systems to improve business organisation. Connected systems provide better visibility into customer relationships and financial activities. Our solutions support:',
      icon: 'CreditCard',
      badge: 'FINANCIAL & CRM',
      features: [
        'Payment gateway connections.',
        'Guest data management.',
        'CRM synchronisation.',
        'Marketing automation.',
        'Transaction tracking.'
      ]
    }
  ],

  // Section 3: Our Hostify Integration Process
  serviceProcessTitle: 'Our Hostify Integration Process',
  serviceProcessIntro: 'Cubixsol follows a structured process to deliver reliable Hostify integration solutions:',
  serviceProcessSteps: [
    {
      stepNumber: '01',
      title: 'Requirement Analysis',
      desc: 'Our team studies your business workflow, existing tools, and integration objectives.'
    },
    {
      stepNumber: '02',
      title: 'Technical Planning',
      desc: 'We design an integration strategy based on your required features.'
    },
    {
      stepNumber: '03',
      title: 'Development And Configuration',
      desc: 'Our developers create and configure secure system connections.'
    },
    {
      stepNumber: '04',
      title: 'Testing And Deployment',
      desc: 'We verify performance, security, and data accuracy before launch.'
    },
    {
      stepNumber: '05',
      title: 'Support And Maintenance',
      desc: 'Our team provides ongoing assistance after implementation.'
    }
  ],

  // Section 4: Why Choose Cubixsol For Hostify Integration
  whyChooseTitle: 'Why Choose Cubixsol For Hostify Integration?',
  whyChooseIntro: 'Cubixsol helps vacation rental companies improve their operational efficiency through custom Hostify integrations designed around real business challenges. Our developers focus on creating connections that simplify multi-property management, automate repetitive processes, and improve system communication.\n\nWe build Hostify solutions that support growing rental businesses by connecting booking channels, automation tools, payment systems, and customer management platforms. From API development, channel synchronisation and workflow automation, we create flexible integrations that match your business goals.',
  whyChooseItems: [
    {
      title: 'Custom-Tailored Integration Architecture',
      desc: 'Every integration is engineered around your exact property portfolio, third-party software stack, and unique operational workflows.'
    },
    {
      title: 'Zero Double-Booking Reliability',
      desc: 'Bidirectional high-speed synchronization ensures calendars, rates, and guest details update instantaneously across all OTAs.'
    },
    {
      title: 'Frictionless Guest Experience',
      desc: 'Automate keyless check-in PIN generation, automated SMS arrivals, and instant payment settlement for smooth 5-star stays.'
    },
    {
      title: 'Dedicated Engineering & Maintenance Support',
      desc: 'Our experienced engineers provide post-launch monitoring, security patches, and ongoing support for continuous uptime.'
    }
  ],

  // Section 5: FAQs
  faqs: [
    {
      q: 'What Hostify integration services does Cubixsol provide?',
      a: 'Cubixsol develops Hostify integrations with booking channels, payment platforms, CRM systems, smart devices, and other business applications.'
    },
    {
      q: 'Can Hostify integrate with Airbnb and other OTAs?',
      a: 'Yes, Hostify supports channel connections, and Cubixsol can create customised solutions for better synchronisation.'
    },
    {
      q: 'Does Cubixsol offer Hostify API integration?',
      a: 'Yes, our developers create API-based integrations that connect Hostify with external software systems.'
    },
    {
      q: 'Can Hostify connect with smart lock systems?',
      a: 'Yes, Hostify can integrate with smart access solutions for automated check-in and guest entry.'
    },
    {
      q: 'How does Hostify integration improve rental management?',
      a: 'Hostify integration reduces manual tasks, improves data accuracy, and helps businesses manage properties more efficiently.'
    }
  ],

  // SEO
  seo: {
    metaTitle: 'Hostify Integration Services | Vacation Rental PMS Automation | Cubixsol',
    metaDescription: 'Expert Hostify integration services by Cubixsol. Connect Hostify PMS with Airbnb, Vrbo, OTAs, payment gateways, CRMs, smart locks, and accounting software.',
    keywords: 'Hostify integration, Hostify API, vacation rental PMS integration, Hostify smart locks, Hostify CRM integration, property management system, Cubixsol',
    ogTitle: 'Hostify Integration Services | Cubixsol',
    ogDescription: 'Automate vacation rental operations with custom Hostify integrations. Multi-channel synchronization, API bridges, smart lock entry, and payment connections.',
    ogImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&h=800&q=80',
    canonicalUrl: 'https://cubixsol.com/hostify-integration'
  }
};

export default function HostifyIntegration() {
  const { openEstimateModal } = useEstimateModal();
  const [data, setData] = useState(DEFAULT_DATA);
  const [activeTab, setActiveTab] = useState('channel-management');
  const [openFaq, setOpenFaq] = useState(null);

  // Interactive Simulator States
  const [simChannel, setSimChannel] = useState('airbnb');
  const [syncStatus, setSyncStatus] = useState({ state: 'synced', latency: '34ms', lastUpdated: 'Just now' });
  const [isSyncing, setIsSyncing] = useState(false);
  const [lockStatus, setLockStatus] = useState('locked');
  const [generatedPin, setGeneratedPin] = useState('849201');

  // Fetch dynamic content from Admin Dashboard API
  useEffect(() => {
    let isMounted = true;
    apiFetch('services/hostify-integration')
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
        latency: `${Math.floor(20 + Math.random() * 25)}ms`,
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
                <span>{data.heroEyebrow || 'HOSTIFY INTEGRATION SERVICES'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.18]"
              >
                Hostify Integration Services To <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a4d8] via-cyan-300 to-[#5d53a3]">Automate Vacation Rental</span> Operations
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
                  onClick={() => openEstimateModal('Hostify Integration Services')}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#00a4d8] to-[#5d53a3] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#00a4d8]/25 hover:shadow-[#5d53a3]/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>{data.heroPrimaryBtnText || 'Schedule A Hostify Consultation'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#core-capabilities"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 hover:text-white font-semibold text-sm sm:text-base border border-slate-700 transition"
                >
                  <span>{data.heroSecondaryBtnText || 'Explore Hostify Capabilities'}</span>
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
                        <span>Hostify Engine Hub</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          LIVE
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">Bidirectional 2-Way PMS Bridge</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono text-slate-400">Latency: </span>
                    <span className="text-[11px] font-mono font-bold text-emerald-400">{syncStatus.latency}</span>
                  </div>
                </div>

                {/* Connected System Nodes Grid */}
                <div className="space-y-2.5">
                  
                  {/* Node 1: OTA Channels */}
                  <div
                    onClick={() => handleTriggerSync('airbnb')}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      simChannel === 'airbnb'
                        ? 'bg-[#00a4d8]/15 border-[#00a4d8]/60 shadow-md shadow-[#00a4d8]/10'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Share2 className="w-4 h-4 text-[#00a4d8]" />
                        <span className="text-xs font-bold text-slate-200">OTA Channels (Airbnb, Booking.com, Vrbo)</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        2-Way Sync
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 pl-6.5">
                      Instant calendar, rate restrictions & reservation auto-transfer
                    </p>
                  </div>

                  {/* Node 2: Payment Gateway (Stripe) */}
                  <div
                    onClick={() => handleTriggerSync('stripe')}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      simChannel === 'stripe'
                        ? 'bg-[#5d53a3]/20 border-[#5d53a3]/60 shadow-md shadow-[#5d53a3]/10'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <CreditCard className="w-4 h-4 text-[#5d53a3]" />
                        <span className="text-xs font-bold text-slate-200">Payment Gateway & Accounting</span>
                      </div>
                      <span className="text-[10px] font-mono text-purple-300">Auto Captures</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 pl-6.5">
                      Stripe deposit holds, scheduled payments & QuickBooks ledger sync
                    </p>
                  </div>

                  {/* Node 3: Smart Locks */}
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
                        <span className="text-xs font-bold text-slate-200">Smart Lock Keyless Entry PIN: {generatedPin}</span>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-300">Active</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 pl-6.5">
                      Auto-generated door codes matching guest check-in & check-out times
                    </p>
                  </div>

                  {/* Node 4: Guest CRM & Automations */}
                  <div
                    onClick={() => handleTriggerSync('crm')}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      simChannel === 'crm'
                        ? 'bg-[#5d53a3]/20 border-[#5d53a3]/60 shadow-md shadow-[#5d53a3]/10'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Users className="w-4 h-4 text-[#5d53a3]" />
                        <span className="text-xs font-bold text-slate-200">CRM & Automated Guest Messaging</span>
                      </div>
                      <span className="text-[10px] font-mono text-purple-300">HubSpot / SMS</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 pl-6.5">
                      Pre-arrival workflows, WhatsApp guidebooks & review requests
                    </p>
                  </div>

                </div>

                {/* Visualizer Simulator Action Bar */}
                <div className="mt-4 pt-3.5 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-amber-400 animate-spin' : 'bg-emerald-400'}`} />
                    <span className="text-xs text-slate-300">
                      {isSyncing ? 'Simulating Hostify payload...' : 'All connected endpoints operational'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleTriggerSync(simChannel)}
                    disabled={isSyncing}
                    className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#00a4d8] to-[#5d53a3] hover:opacity-95 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                  >
                    <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>Test Sync</span>
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SECTION 1: CONNECT HOSTIFY WITH YOUR BUSINESS APPLICATIONS (8 APPS) */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-24 bg-slate-50/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/20 text-[#00a4d8] text-xs font-bold uppercase tracking-wider">
              <Workflow className="w-3.5 h-3.5 text-[#00a4d8]" />
              <span>ECOSYSTEM INTEGRATIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              {data.subServicesTitle || 'Connect Hostify With Your Business Applications'}
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
                        {item.tag || `APP 0${idx + 1}`}
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
      {/* 3. SECTION 2: SPECIALISED HOSTIFY CAPABILITIES (INTERACTIVE TABS) */}
      {/* ========================================================================= */}
      <section id="core-capabilities" className="py-20 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5d53a3]/10 border border-[#5d53a3]/20 text-[#5d53a3] text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-[#5d53a3]" />
              <span>CORE SPECIALIZATIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              {data.coreSolutionsTitle || 'Specialised Hostify Integration Capabilities'}
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
                  <span>{currentModule.badge || 'MODULE DETAIL'}</span>
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
                    onClick={() => openEstimateModal(`Hostify - ${currentModule.title}`)}
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
                      HOSTIFY_PIPELINE.json
                    </span>
                    <span className="text-emerald-400">200 OK</span>
                  </div>

                  <div className="space-y-1.5 text-slate-300 text-[11px]">
                    <div className="text-slate-500">// Cubixsol Hostify API Bridge Event</div>
                    <div><span className="text-purple-400">"service":</span> <span className="text-cyan-300">"Hostify Integration"</span>,</div>
                    <div><span className="text-purple-400">"activeModule":</span> <span className="text-amber-300">"{currentModule.id}"</span>,</div>
                    <div><span className="text-purple-400">"status":</span> <span className="text-emerald-400">"CONNECTED"</span>,</div>
                    <div><span className="text-purple-400">"latency":</span> <span className="text-emerald-400">"28ms"</span>,</div>
                    <div><span className="text-purple-400">"webhooks":</span> <span className="text-slate-300">["reservation.created", "calendar.sync", "doorlock.pin"]</span></div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Target PMS: <strong className="text-white">Hostify Cloud</strong></span>
                    <span>Security: <strong className="text-cyan-300">OAuth2.0 / SHA256</strong></span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SECTION 3: OUR HOSTIFY INTEGRATION PROCESS (5 STEPS) */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-24 bg-slate-50/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/20 text-[#00a4d8] text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-[#00a4d8]" />
              <span>DELIVERY ROADMAP</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              {data.serviceProcessTitle || 'Our Hostify Integration Process'}
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
                        STEP {step.stepNumber || `0${idx + 1}`}
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
      {/* 5. SECTION 4: WHY CHOOSE CUBIXSOL FOR HOSTIFY INTEGRATION */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5d53a3]/10 border border-[#5d53a3]/20 text-[#5d53a3] text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-[#5d53a3]" />
              <span>THE CUBIXSOL ADVANTAGE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              {data.whyChooseTitle || 'Why Choose Cubixsol For Hostify Integration?'}
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
                      {idx === 3 && <HeadphonesIcon className="w-5 h-5" />}
                    </div>

                    <h3 className="text-base font-bold text-ink leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between text-[11px] font-semibold text-slate-500">
                    <span>Performance Rating</span>
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
              Everything You Need To Know
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Clear answers to your Hostify vacation rental integration questions.
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
        badge="HOSTIFY INTEGRATION EXPERTS"
        title="Ready To Automate Your Vacation Rentals With Hostify?"
        description="Let Cubixsol build custom bidirectional integrations for booking channels, smart locks, payment gateways, and CRMs."
        primaryText="Schedule A Hostify Consultation"
        secondaryText="Contact Our Engineering Team"
      />

    </div>
  );
}

// Fallback icon helper
function HeadphonesIcon(props) {
  return <Headphones {...props} />;
}
import { Headphones } from 'lucide-react';
