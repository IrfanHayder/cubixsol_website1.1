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
      colorTheme: 'blue'
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
      colorTheme: 'blue'
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
      colorTheme: 'blue'
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
      colorTheme: 'blue'
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
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  // Interactive Simulator States
  const [simChannel, setSimChannel] = useState('airbnb');
  const [syncStatus, setSyncStatus] = useState({ state: 'synced', latency: '34ms', lastUpdated: 'Just now' });
  const [isSyncing, setIsSyncing] = useState(false);
  const [lockStatus, setLockStatus] = useState('locked');
  const [generatedPin, setGeneratedPin] = useState('849201');
  const [paymentCaptured, setPaymentCaptured] = useState(false);

  // Fetch dynamic content from Admin Dashboard API
  useEffect(() => {
    let isMounted = true;
    apiFetch('/api/services/hostify-integration')
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
    return () => { isMounted = false; };
  }, []);

  useSEO(data.seo, {
    title: data.title || 'Hostify Integration Services',
    description: data.desc || DEFAULT_DATA.heroDesc,
    keywords: data.seo?.keywords || 'Hostify integration, Hostify API, vacation rental PMS, Cubixsol',
    heroImage: data.heroImage,
  });

  const handleTriggerSync = (channelKey) => {
    setSimChannel(channelKey);
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncStatus({
        state: 'synced',
        latency: `${Math.floor(Math.random() * 25) + 20}ms`,
        lastUpdated: 'Just now'
      });
    }, 600);
  };

  const handleGenerateNewPin = () => {
    const randomPin = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedPin(randomPin);
    setLockStatus('generating');
    setTimeout(() => {
      setLockStatus('ready');
    }, 500);
  };

  const subServicesItems = data.subServicesItems || DEFAULT_DATA.subServicesItems;
  const coreSolutions = data.coreSolutions || DEFAULT_DATA.coreSolutions;
  const currentSolution = coreSolutions.find((s) => s.id === activeTab) || coreSolutions[0];
  const processSteps = data.serviceProcessSteps || DEFAULT_DATA.serviceProcessSteps;
  const whyChooseItems = data.whyChooseItems || DEFAULT_DATA.whyChooseItems;
  const faqs = data.faqs || DEFAULT_DATA.faqs;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 selection:bg-[#00a4d8]/30 selection:text-white relative overflow-hidden">
      
      {/* Background Glows and Grids */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#00a4d8]/15 to-transparent rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-gradient-to-bl from-[#0077b6]/15 to-transparent rounded-full blur-[130px]" />
        <div className="absolute bottom-10 left-1/3 w-[700px] h-[700px] bg-gradient-to-tr from-[#00a4d8]/10 to-transparent rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      <div className="relative z-10">
        
        {/* ========================================================================= */}
        {/* 1. HERO SECTION */}
        {/* ========================================================================= */}
        <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Breadcrumb */}
            <div className="mb-8">
              <Link
                to="/all-services"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-[#00a4d8] transition group"
              >
                <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
                Back to All Services
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              
              {/* Left Column: Hero Text */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Eyebrow badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/30 shadow-sm backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-[#00a4d8] animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#00a4d8]">
                    {data.heroEyebrow || 'HOSTIFY INTEGRATION SERVICES'}
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
                  Hostify Integration Services To <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00a4d8] via-[#38bdf8] to-[#0077b6]">Automate Vacation Rental</span> Operations
                </h1>

                {/* Description */}
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                  {data.heroDesc}
                </p>

                {/* Feature Bullet Badges */}
                <div className="pt-2 flex flex-wrap gap-2.5">
                  {(data.heroBadges || DEFAULT_DATA.heroBadges).map((badge, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs sm:text-sm font-medium text-slate-200 hover:border-[#00a4d8]/50 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#00a4d8] shrink-0" />
                      <span>{badge}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Action Buttons */}
                <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <button
                    onClick={() => openEstimateModal('Hostify Integration Services')}
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#00a4d8] to-[#0077b6] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#00a4d8]/25 hover:shadow-[#00a4d8]/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
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
                </div>

              </div>

              {/* Right Column: Interactive Live Architecture & Data Flow Visualizer */}
              <div className="lg:col-span-5">
                <div className="relative rounded-2xl bg-gradient-to-b from-slate-800/90 to-slate-900/90 border border-slate-700/80 p-5 sm:p-6 shadow-2xl backdrop-blur-xl">
                  
                  {/* Top Header Card */}
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-700/60">
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
                  <div className="space-y-3">
                    
                    {/* Node 1: OTA Channels (Airbnb / Vrbo / Booking) */}
                    <div
                      onClick={() => handleTriggerSync('airbnb')}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        simChannel === 'airbnb'
                          ? 'bg-[#00a4d8]/10 border-[#00a4d8]/60 shadow-md shadow-[#00a4d8]/10'
                          : 'bg-slate-800/60 border-slate-700 hover:border-slate-600'
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
                          ? 'bg-[#00a4d8]/10 border-[#00a4d8]/60 shadow-md shadow-[#00a4d8]/10'
                          : 'bg-slate-800/60 border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <CreditCard className="w-4 h-4 text-[#38bdf8]" />
                          <span className="text-xs font-bold text-slate-200">Payment Gateway & Accounting</span>
                        </div>
                        <span className="text-[10px] font-mono text-cyan-400">Auto Captures</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 pl-6.5">
                        Stripe deposit holds, scheduled payments & QuickBooks ledger sync
                      </p>
                    </div>

                    {/* Node 3: Smart Locks (Yale, RemoteLock) */}
                    <div
                      onClick={() => handleTriggerSync('smartlock')}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        simChannel === 'smartlock'
                          ? 'bg-[#00a4d8]/10 border-[#00a4d8]/60 shadow-md shadow-[#00a4d8]/10'
                          : 'bg-slate-800/60 border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <KeyRound className="w-4 h-4 text-amber-400" />
                          <span className="text-xs font-bold text-slate-200">Smart Lock Keyless Entry PINs</span>
                        </div>
                        <span className="text-[10px] font-mono text-amber-300">Time-Locked</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 pl-6.5">
                        Auto-generated door codes matching guest check-in / check-out times
                      </p>
                    </div>

                    {/* Node 4: Guest CRM & Automations */}
                    <div
                      onClick={() => handleTriggerSync('crm')}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        simChannel === 'crm'
                          ? 'bg-[#00a4d8]/10 border-[#00a4d8]/60 shadow-md shadow-[#00a4d8]/10'
                          : 'bg-slate-800/60 border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <Users className="w-4 h-4 text-purple-400" />
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
                  <div className="mt-4 pt-3.5 border-t border-slate-700/60 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-amber-400 animate-spin' : 'bg-emerald-400'}`} />
                      <span className="text-xs text-slate-300">
                        {isSyncing ? 'Simulating Hostify payload...' : 'All connected endpoints operational'}
                      </span>
                    </div>
                    <button
                      onClick={() => handleTriggerSync(simChannel)}
                      disabled={isSyncing}
                      className="px-3 py-1.5 rounded-lg bg-[#00a4d8]/20 hover:bg-[#00a4d8]/30 border border-[#00a4d8]/40 text-[#00a4d8] text-xs font-bold transition flex items-center gap-1.5"
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
        {/* 2. CONNECT HOSTIFY WITH YOUR BUSINESS APPLICATIONS (8 APPS GRID) */}
        {/* ========================================================================= */}
        <section className="py-20 lg:py-24 border-b border-slate-800/80 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/30 text-xs font-bold uppercase tracking-wider text-[#00a4d8]">
                <span>ECOSYSTEM INTEGRATIONS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                {data.subServicesTitle || 'Connect Hostify With Your Business Applications'}
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                {data.subServicesIntro || DEFAULT_DATA.subServicesIntro}
              </p>
            </div>

            {/* 8 Business Application Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {subServicesItems.map((item, idx) => (
                <div
                  key={idx}
                  className="group rounded-2xl bg-gradient-to-b from-slate-800/80 to-slate-900/90 border border-slate-700/70 p-6 flex flex-col justify-between hover:border-[#00a4d8]/50 hover:shadow-xl hover:shadow-[#00a4d8]/5 transition-all duration-300"
                >
                  <div>
                    
                    {/* Top Tag & Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#00a4d8]/10 text-[#00a4d8] border border-[#00a4d8]/20">
                        {item.tag || `MODULE 0${idx + 1}`}
                      </span>
                      <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-[#00a4d8] group-hover:scale-110 transition-transform">
                        <DynamicIcon name={item.icon || 'Share2'} className="w-4.5 h-4.5" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-base font-bold text-white group-hover:text-[#00a4d8] transition-colors leading-snug mb-2.5">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                      {item.desc}
                    </p>
                  </div>

                  {/* Pills */}
                  {item.pills && item.pills.length > 0 && (
                    <div className="pt-3 border-t border-slate-800 flex flex-wrap gap-1.5">
                      {item.pills.map((pill, pIdx) => (
                        <span
                          key={pIdx}
                          className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-800/90 text-slate-300 border border-slate-700/60"
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. SPECIALISED HOSTIFY INTEGRATION CAPABILITIES (CORE MODULES TABS) */}
        {/* ========================================================================= */}
        <section id="core-capabilities" className="py-20 lg:py-28 border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/30 text-xs font-bold uppercase tracking-wider text-[#00a4d8]">
                <span>CORE SPECIALIZATIONS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                {data.coreSolutionsTitle || 'Specialised Hostify Integration Capabilities'}
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                {data.coreSolutionsIntro || DEFAULT_DATA.coreSolutionsIntro}
              </p>
            </div>

            {/* Tab Buttons */}
            <div className="flex flex-wrap justify-center gap-2.5 mb-10">
              {coreSolutions.map((sol) => (
                <button
                  key={sol.id}
                  onClick={() => setActiveTab(sol.id)}
                  className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 flex items-center gap-2.5 border ${
                    activeTab === sol.id
                      ? 'bg-gradient-to-r from-[#00a4d8] to-[#0077b6] text-white border-transparent shadow-lg shadow-[#00a4d8]/20 scale-105'
                      : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <DynamicIcon name={sol.icon || 'Share2'} className="w-4 h-4" />
                  <span>{sol.title.replace('Hostify ', '')}</span>
                </button>
              ))}
            </div>

            {/* Active Tab Card Content */}
            {currentSolution && (
              <div className="rounded-3xl bg-gradient-to-b from-slate-800/90 to-slate-900 border border-slate-700 p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  
                  {/* Left Column: Deep Dive Info */}
                  <div className="lg:col-span-7 space-y-5">
                    
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#00a4d8]/10 text-[#00a4d8] border border-[#00a4d8]/30 text-xs font-bold uppercase tracking-wider">
                      <span>{currentSolution.badge || 'SPECIALIZED MODULE'}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                      {currentSolution.title}
                    </h3>

                    <p className="text-sm sm:text-base font-semibold text-[#00a4d8]">
                      {currentSolution.subtitle}
                    </p>

                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                      {currentSolution.desc}
                    </p>

                    {/* Features List */}
                    <div className="pt-3 space-y-2.5">
                      {currentSolution.features?.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full bg-[#00a4d8]/20 border border-[#00a4d8]/40 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-[#00a4d8]" />
                          </div>
                          <span className="text-xs sm:text-sm text-slate-200 font-medium leading-normal">
                            {feat}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={() => openEstimateModal(currentSolution.title)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00a4d8] to-[#0077b6] text-white font-bold text-sm shadow-md shadow-[#00a4d8]/20 hover:scale-[1.02] transition-transform"
                      >
                        <span>Request Custom {currentSolution.title.replace('Hostify ', '')} Scope</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>

                  {/* Right Column: Live Interactive Sandbox / Demo for the Selected Module */}
                  <div className="lg:col-span-5">
                    <div className="rounded-2xl bg-slate-900/90 border border-slate-700/80 p-6 space-y-5">
                      
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                        <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                          Interactive Live Demonstration
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00a4d8]/10 text-[#00a4d8] border border-[#00a4d8]/30">
                          SANDBOX
                        </span>
                      </div>

                      {/* Dynamic Interactive Widget Based on Active Tab */}
                      {activeTab === 'channel-management' && (
                        <div className="space-y-4">
                          <p className="text-xs text-slate-300">
                            Simulate real-time availability sync between Hostify and global OTAs:
                          </p>
                          <div className="space-y-2">
                            {['Airbnb', 'Booking.com', 'Vrbo'].map((ota) => (
                              <div key={ota} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                                <span className="text-xs font-bold text-white">{ota} Channel</span>
                                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                                  ✓ Synced in 32ms
                                </span>
                              </div>
                            ))}
                          </div>
                          <button
                            onClick={() => handleTriggerSync('channel')}
                            className="w-full py-2.5 rounded-xl bg-[#00a4d8]/20 hover:bg-[#00a4d8]/30 text-[#00a4d8] border border-[#00a4d8]/40 font-bold text-xs transition"
                          >
                            Trigger Mock Multi-Unit Reservation
                          </button>
                        </div>
                      )}

                      {activeTab === 'api-services' && (
                        <div className="space-y-3 font-mono text-xs">
                          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                            <span className="text-emerald-400">POST</span> /api/v1/hostify/webhook<br />
                            <span className="text-slate-500">{"{"}</span><br />
                            &nbsp;&nbsp;<span className="text-[#00a4d8]">"event"</span>: <span className="text-amber-300">"reservation.confirmed"</span>,<br />
                            &nbsp;&nbsp;<span className="text-[#00a4d8]">"property_id"</span>: <span className="text-purple-300">"HST-9402"</span>,<br />
                            &nbsp;&nbsp;<span className="text-[#00a4d8]">"guest_status"</span>: <span className="text-emerald-300">"verified_paid"</span><br />
                            <span className="text-slate-500">{"}"}</span>
                          </div>
                          <div className="text-[11px] font-sans text-slate-400">
                            High-frequency custom webhooks dispatched with guaranteed zero message drop.
                          </div>
                        </div>
                      )}

                      {activeTab === 'smart-locks' && (
                        <div className="space-y-4">
                          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-center space-y-2">
                            <span className="text-[11px] text-slate-400 uppercase font-bold">Automated Keyless Door PIN</span>
                            <div className="text-3xl font-mono font-extrabold text-[#00a4d8] tracking-widest">
                              {generatedPin}
                            </div>
                            <span className="text-[10px] text-emerald-400">Valid: Check-in (3:00 PM) → Check-out (11:00 AM)</span>
                          </div>
                          <button
                            onClick={handleGenerateNewPin}
                            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#00a4d8] to-[#0077b6] text-white font-bold text-xs transition shadow"
                          >
                            Generate New Smart Access Token
                          </button>
                        </div>
                      )}

                      {activeTab === 'payment-crm' && (
                        <div className="space-y-3">
                          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1.5">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-slate-300">Stripe Payment Hold ($500 Deposit):</span>
                              <span className="font-bold text-emerald-400 font-mono">AUTHORIZED</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-slate-300">HubSpot Guest Contact:</span>
                              <span className="font-bold text-purple-400 font-mono">TAGGED &amp; SYNCED</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-slate-300">QuickBooks Auto Invoice:</span>
                              <span className="font-bold text-[#00a4d8] font-mono">RECONCILED</span>
                            </div>
                          </div>
                          <p className="text-[11px] text-slate-400">
                            Complete end-to-end guest journey automation from payment capture to marketing segmentation.
                          </p>
                        </div>
                      )}

                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. OUR HOSTIFY INTEGRATION PROCESS (5 STRUCTURED STEPS) */}
        {/* ========================================================================= */}
        <section className="py-20 lg:py-28 border-b border-slate-800/80 bg-slate-900/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/30 text-xs font-bold uppercase tracking-wider text-[#00a4d8]">
                <span>METHODOLOGY</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                {data.serviceProcessTitle || 'Our Hostify Integration Process'}
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                {data.serviceProcessIntro || DEFAULT_DATA.serviceProcessIntro}
              </p>
            </div>

            {/* Process 5-Step Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
              {processSteps.map((step, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveProcessStep(idx)}
                  className={`rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                    activeProcessStep === idx
                      ? 'bg-gradient-to-b from-slate-800 to-slate-900 border-[#00a4d8] shadow-xl shadow-[#00a4d8]/10 scale-[1.02]'
                      : 'bg-slate-800/60 border-slate-700/70 hover:border-slate-600'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black font-mono text-[#00a4d8]">
                        {step.stepNumber || `0${idx + 1}`}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-slate-700/60 flex items-center justify-center text-[#00a4d8]">
                        <Workflow className="w-4 h-4" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-700/60 flex items-center gap-1.5 text-[11px] font-bold text-[#00a4d8]">
                    <span>Phase 0{idx + 1} Deliverable</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. WHY CHOOSE CUBIXSOL FOR HOSTIFY INTEGRATION */}
        {/* ========================================================================= */}
        <section className="py-20 lg:py-28 border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Why Choose Overview */}
              <div className="lg:col-span-6 space-y-6">
                
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/30 text-xs font-bold uppercase tracking-wider text-[#00a4d8]">
                  <span>WHY CUBIXSOL</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  {data.whyChooseTitle || 'Why Choose Cubixsol For Hostify Integration?'}
                </h2>

                <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  <p>
                    Cubixsol helps vacation rental companies improve their operational efficiency through custom Hostify integrations designed around real business challenges. Our developers focus on creating connections that simplify multi-property management, automate repetitive processes, and improve system communication.
                  </p>
                  <p>
                    We build Hostify solutions that support growing rental businesses by connecting booking channels, automation tools, payment systems, and customer management platforms. From API development, channel synchronisation and workflow automation, we create flexible integrations that match your business goals.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => openEstimateModal('Why Choose Cubixsol For Hostify Integration')}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00a4d8] to-[#0077b6] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#00a4d8]/25 hover:scale-[1.02] transition"
                  >
                    <span>Partner With Cubixsol Today</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

              {/* Right Column: 4 Value Pillars */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {whyChooseItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl bg-gradient-to-b from-slate-800/80 to-slate-900/90 border border-slate-700/80 p-6 space-y-3 hover:border-[#00a4d8]/50 hover:shadow-xl hover:shadow-[#00a4d8]/5 transition duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#00a4d8]/15 border border-[#00a4d8]/30 flex items-center justify-center text-[#00a4d8]">
                      {idx === 0 && <Sliders className="w-5 h-5" />}
                      {idx === 1 && <ShieldCheck className="w-5 h-5" />}
                      {idx === 2 && <Zap className="w-5 h-5" />}
                      {idx === 3 && <Award className="w-5 h-5" />}
                    </div>
                    <h3 className="text-base font-bold text-white leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. FREQUENTLY ASKED QUESTIONS (FAQ ACCORDION) */}
        {/* ========================================================================= */}
        <section className="py-20 lg:py-24 border-b border-slate-800/80 bg-slate-900/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center mb-14 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/30 text-xs font-bold uppercase tracking-wider text-[#00a4d8]">
                <span>GOT QUESTIONS?</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                Common questions about our Hostify PMS integration, custom API engineering, and automation solutions.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? 'bg-slate-800/90 border-[#00a4d8]/50 shadow-lg shadow-[#00a4d8]/5'
                        : 'bg-slate-800/50 border-slate-700/70 hover:border-slate-600'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white"
                    >
                      <span className="flex items-center gap-3">
                        <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? 'text-[#00a4d8]' : 'text-slate-400'}`} />
                        {faq.q}
                      </span>
                      <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#00a4d8]' : ''}`} />
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed pl-14 font-normal border-t border-slate-700/40 mt-1">
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
        {/* 7. HIGH-CONVERTING CTA BANNER */}
        {/* ========================================================================= */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CtaBanner
              eyebrow="READY TO TRANSFORM YOUR VACATION RENTAL OPERATIONS?"
              title="Automate Your Vacation Rental Business With Custom Hostify Integrations"
              desc="Speak with Cubixsol's PMS integration engineers today. We build seamless, reliable connections between Hostify, OTAs, smart locks, payment gateways, and CRMs."
              buttonText="Get Started With Hostify Integration"
              serviceName="Hostify Integration Services"
            />
          </div>
        </section>

      </div>

    </div>
  );
}
