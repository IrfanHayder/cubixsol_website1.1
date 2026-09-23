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

// Default static data matching the document provided for OwnerRez Integration Services
const DEFAULT_DATA = {
  slug: 'ownerrez-integration',
  title: 'OwnerRez Integration Services',
  heroEyebrow: 'OWNERREZ INTEGRATION SERVICES',
  heroTitle: 'Custom OwnerRez Integration Solutions For Vacation Rental Businesses',
  heroDesc: 'Cubixsol provides professional OwnerRez integration services to help vacation rental companies connect their property management system with powerful business applications. Our developers create customised integrations that improve automation, simplify property operations, and allow different software platforms to communicate efficiently.',
  heroPrimaryBtnText: 'Schedule An OwnerRez Consultation',
  heroSecondaryBtnText: 'Explore Solutions',
  heroBadges: [
    '2-Way Multi-Channel OTA Synchronisation',
    'Custom OwnerRez Open API Connections',
    'Automated Payment & Accounting Integrations',
    'CRM, Guest Messaging & Review Workflows',
    'Smart Lock & Contactless Entry Automation'
  ],
  heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&h=800&q=80',

  // Section 1: Connect OwnerRez With Your Business Systems
  subServicesTitle: 'Connect OwnerRez With Your Business Systems',
  subServicesIntro: 'Modern rental businesses depend on multiple applications to manage reservations, payments, communication, and daily operations. Our integration solutions help create a centralised workflow where your systems exchange information accurately and efficiently. We develop OwnerRez integrations that connect your PMS with essential tools, including:',
  subServicesItems: [
    {
      icon: 'Share2',
      tag: 'RENTAL MARKETPLACES',
      title: 'Airbnb, Vrbo, Booking.com, and rental marketplaces',
      desc: 'Accurate multi-channel synchronization keeping your calendars, rates, restrictions, and reservation updates aligned across all leading booking channels.',
      pills: ['Airbnb Direct Sync', 'Vrbo API Bridge', 'Booking.com Rates'],
      colorTheme: 'blue'
    },
    {
      icon: 'CreditCard',
      tag: 'PAYMENT GATEWAYS',
      title: 'Payment gateways and financial platforms',
      desc: 'Secure payment integrations with Stripe, Authorize.Net, and merchant gateways for automatic payment captures, security deposit holds, and split settlements.',
      pills: ['Stripe / Merchant Gateways', 'Security Deposit Holds', 'Card Tokenization'],
      colorTheme: 'cyan'
    },
    {
      icon: 'Users',
      tag: 'CRM & GUEST PROFILES',
      title: 'CRM systems for guest relationship management',
      desc: 'Unify OwnerRez reservation records with HubSpot, Salesforce, and CRM suites to consolidate guest history, preferences, and loyalty data.',
      pills: ['Guest Consolidation', 'Loyalty Tracking', 'HubSpot / Salesforce'],
      colorTheme: 'blue'
    },
    {
      icon: 'PieChart',
      tag: 'ACCOUNTING & FINANCE',
      title: 'Accounting software',
      desc: 'Synchronise reservation financials, local occupancy taxes, cleaning fees, and owner disbursements with QuickBooks, Xero, or bespoke financial tools.',
      pills: ['QuickBooks & Xero', 'Tax & Fee Splitting', 'Owner Statements'],
      colorTheme: 'cyan'
    },
    {
      icon: 'KeyRound',
      tag: 'SMART LOCKS & ACCESS',
      title: 'Smart lock and automation solutions',
      desc: 'Seamless connections with Yale, August, Schlage, and RemoteLock to automatically generate time-sensitive digital door PINs for frictionless check-in.',
      pills: ['Keyless Entry PINs', 'Automated Check-in', 'Access Logging'],
      colorTheme: 'blue'
    },
    {
      icon: 'Mail',
      tag: 'MARKETING & PROMOTIONS',
      title: 'Marketing platforms',
      desc: 'Connect automated email and SMS platforms (Mailchimp, Klaviyo, ActiveCampaign) to drive repeat direct bookings, upsells, and digital guidebooks.',
      pills: ['Email Drips', 'Repeat Booking Loops', 'Upsell Funnels'],
      colorTheme: 'cyan'
    },
    {
      icon: 'Code2',
      tag: 'CUSTOM BUSINESS APPS',
      title: 'Custom business applications',
      desc: 'Tailor-made backend bridges, custom webhook listeners, and bespoke endpoints built precisely for your unique operational requirements.',
      pills: ['Custom Webhooks', 'ERP Bridges', 'Proprietary Apps'],
      colorTheme: 'blue'
    }
  ],

  // Section 2: Core 5 Specialized Solution Modules
  coreSolutionsTitle: 'Specialised OwnerRez Integration Capabilities',
  coreSolutionsIntro: 'Our specialized integration modules bridge OwnerRez with every operational touchpoint of your vacation rental ecosystem.',
  coreSolutions: [
    {
      id: 'channel-management',
      title: 'OwnerRez Channel Management Integration',
      subtitle: 'Reliable Synchronisation & Accurate Multi-Channel Availability',
      desc: 'Managing properties across different booking channels requires reliable synchronisation. Our experts connect OwnerRez with multiple platforms to maintain accurate reservation and availability data. A connected channel management system allows property managers to reduce manual updates and maintain consistent information across all platforms. Our channel integration services include:',
      icon: 'Share2',
      badge: 'CHANNEL SYNC',
      features: [
        'Real-time booking synchronisation across all OTA channels',
        'Instant calendar updates preventing double bookings and date overlaps',
        'Centralised listing information management and content distribution',
        'Secure guest data transfer and unified contact record creation',
        'Automated reservation status updates across connected marketplaces'
      ]
    },
    {
      id: 'api-services',
      title: 'OwnerRez API Integration Services',
      subtitle: 'Secure & Scalable API-Based Connections Architecture',
      desc: 'Cubixsol specialises in custom OwnerRez API integration solutions that allow businesses to connect external applications with their rental management system. Our developers create secure and scalable connections based on specific operational requirements. Our API integration services include:',
      icon: 'Code2',
      badge: 'CUSTOM API ENGINEERING',
      features: [
        'Custom software connections tailored to bespoke operational workflows',
        'High-frequency data synchronisation solutions with bidirectional webhooks',
        'Third-party application integration across CRM, ERP, and bespoke tools',
        'Automated workflow development triggered on reservation events',
        'Comprehensive API testing, rate-limit handling, and performance optimisation'
      ]
    },
    {
      id: 'payment-accounting',
      title: 'OwnerRez Payment And Accounting Integration',
      subtitle: 'Financial Accuracy & Automated Transaction Management',
      desc: 'Financial accuracy is important for successful vacation rental management. Cubixsol connects OwnerRez with payment and accounting platforms to simplify transaction management and reporting. Our integrations help businesses manage payments more effectively and maintain organised financial records. Our solutions support:',
      icon: 'CreditCard',
      badge: 'FINANCIAL & BILLING',
      features: [
        'Direct online payment processing with multi-currency support',
        'Automated billing workflows and scheduled payment captures',
        'Accounting software connections with QuickBooks, Xero, and enterprise tools',
        'Real-time revenue data synchronisation and ledger reconciliation',
        'Financial reporting automation delivering deep RevPAR and ADR metrics'
      ]
    },
    {
      id: 'crm-communication',
      title: 'OwnerRez CRM And Guest Communication Integration',
      subtitle: 'Timely Responses & Stronger Guest Relationships Throughout The Journey',
      desc: 'Guest relationships play a major role in vacation rental success. We integrate OwnerRez with CRM and communication tools to improve guest interactions throughout the rental journey. Connected communication systems provide timely responses and build stronger relationships with guests. Our solutions can include:',
      icon: 'MessageSquare',
      badge: 'GUEST MESSAGING & CRM',
      features: [
        'Automated guest messages sent via email, SMS, and WhatsApp',
        'Customer database synchronisation with unified stay histories',
        'Email marketing connections for targeted post-stay rebooking campaigns',
        'Follow-up automation and 5-star review collection request drips',
        'Personalized guest experience workflows with digital guidebook dispatching'
      ]
    },
    {
      id: 'smart-lock',
      title: 'OwnerRez Smart Lock Integration',
      subtitle: 'Self-Service Contactless Check-In & Automated Property Access',
      desc: 'Self-service check-in solutions provide convenience for guests and reduce operational workload. Cubixsol creates OwnerRez smart lock integrations that support automated property access. Our smart lock solutions include:',
      icon: 'KeyRound',
      badge: 'SMART LOCKS & IOT',
      features: [
        'Automated digital key management tied to reservation check-in/out dates',
        'Automated access code generation delivered via SMS and email',
        'Frictionless guest entry automation with ID verification checks',
        'Remote access control and real-time lock battery health monitoring',
        'Smart home connectivity across thermostats, noise sensors, and lights'
      ]
    }
  ],

  // Section 3: Process
  processTitle: 'Our OwnerRez Integration Process',
  processIntro: 'Cubixsol follows a professional process to develop successful OwnerRez integration solutions:',
  processSteps: [
    {
      step: '01',
      title: 'Requirement Analysis',
      desc: 'Our team evaluates your business operations, existing tools, tech stack, and integration goals.',
      icon: 'Compass'
    },
    {
      step: '02',
      title: 'Solution Architecture',
      desc: 'We design a technical approach, API data mapping, and security protocols based on your required features.',
      icon: 'Workflow'
    },
    {
      step: '03',
      title: 'Development And Configuration',
      desc: 'Our developers build, test, and connect the required API bridges, webhooks, and secure system connections.',
      icon: 'Code2'
    },
    {
      step: '04',
      title: 'Testing And Deployment',
      desc: 'We check functionality, multi-channel calendar parity, security, and data accuracy before implementation.',
      icon: 'ShieldCheck'
    },
    {
      step: '05',
      title: 'Ongoing Support',
      desc: 'Our team provides technical assistance, monitoring, and proactive updates to maintain smooth system performance.',
      icon: 'RefreshCw'
    }
  ],

  // Section 4: Why Choose
  whyChooseTitle: 'Why Choose Cubixsol For OwnerRez Integration?',
  whyChooseIntro: 'Cubixsol creates OwnerRez integrations that focus on flexibility, customisation, and operational efficiency. Our team understands that every vacation rental business has different processes, reporting needs, and technology requirements.\n\nWe develop solutions that connect OwnerRez with your preferred tools while maintaining smooth data flow across your business systems. From custom API development to automation workflows and third-party connections, Cubixsol helps rental companies build a technology setup that supports long-term growth.',
  whyChoosePoints: [
    {
      title: 'Dedicated OwnerRez & PMS Expertise',
      desc: 'Our engineers specialize in OwnerRez Open API, custom webhook pipelines, and vacation rental property automation.'
    },
    {
      title: 'Custom API Bridges & Webhooks',
      desc: 'Tailored backend connectors ensuring your PMS, ERP, and payment gateways communicate effortlessly with OwnerRez.'
    },
    {
      title: 'Zero Double-Booking Guarantee',
      desc: 'Sub-second synchronization logic ensuring calendar parity and accurate rate availability across all connected marketplaces.'
    },
    {
      title: 'Scalable For Growing Portfolios',
      desc: 'Architectures engineered to seamlessly handle multiple properties, automated security deposits, and multi-currency pricing.'
    },
    {
      title: 'End-to-End Workflow Automation',
      desc: 'Eliminate repetitive manual tasks by automating guest messaging, smart lock codes, and team turnover notifications.'
    },
    {
      title: 'Dedicated Post-Launch Support',
      desc: '24/7 system monitoring, proactive API version updates, and rapid engineering assistance for continuous uptime.'
    }
  ],

  // Section 5: FAQs
  faqTitle: 'Frequently Asked Questions',
  faqIntro: 'Got questions about integrating OwnerRez with your existing tools? Find clear answers below.',
  faqs: [
    {
      q: 'What OwnerRez integration services does Cubixsol provide?',
      a: 'Cubixsol develops custom OwnerRez integrations with booking platforms, payment systems, CRM tools, smart devices, accounting software, and business applications.'
    },
    {
      q: 'Can OwnerRez integrate with Airbnb and other booking channels?',
      a: 'Yes, OwnerRez supports connections with rental marketplaces, and Cubixsol can develop customised solutions for improved synchronisation.'
    },
    {
      q: 'Does Cubixsol offer OwnerRez API integration?',
      a: 'Yes, our developers build API-based integrations that connect OwnerRez with external platforms and applications.'
    },
    {
      q: 'Can OwnerRez connect with smart lock systems?',
      a: 'Yes, OwnerRez can integrate with smart access solutions to support automated check-in and property access management.'
    },
    {
      q: 'How does OwnerRez integration improve rental operations?',
      a: 'OwnerRez integration helps businesses automate workflows, improve data accuracy, and manage multiple rental processes more efficiently.'
    }
  ]
};

export default function OwnerRezIntegration() {
  const { openEstimateModal } = useEstimateModal();
  const [data, setData] = useState(DEFAULT_DATA);
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [simState, setSimState] = useState({
    activeOta: 'Airbnb, Vrbo & Booking.com',
    status: 'OwnerRez Direct Sync Active',
    smartLockPin: '824910',
    isSyncing: false,
    latency: '112ms'
  });

  // SEO Hook
  useSEO({
    title: 'OwnerRez Integration Services | Vacation Rental Automation | Cubixsol',
    description: 'Expert OwnerRez integration services by Cubixsol. Connect OwnerRez with Airbnb, Vrbo, smart locks, payment gateways, CRM, and custom APIs for automated rental management.',
    keywords: 'OwnerRez integration, OwnerRez API integration, OwnerRez channel manager, OwnerRez smart lock, PMS integration, vacation rental automation, Cubixsol',
    canonical: 'https://cubixsol.com/ownerrez-integration'
  });

  // Dynamic fetch from backend so changes in Admin Dashboard automatically update the page
  useEffect(() => {
    let isMounted = true;
    apiFetch('/api/services/slug/ownerrez-integration')
      .then((res) => {
        if (!isMounted || !res) return;
        const apiData = res.service || res;
        if (apiData && (apiData.title || apiData.subServicesItems || apiData.coreSolutions)) {
          setData((prev) => ({
            ...prev,
            ...apiData,
            heroBadges: apiData.features && apiData.features.length ? apiData.features : (apiData.heroBadges || prev.heroBadges),
            subServicesItems: (apiData.subServicesItems && apiData.subServicesItems.length > 0)
              ? apiData.subServicesItems.map((item, idx) => ({
                  ...item,
                  icon: item.icon || (prev.subServicesItems[idx]?.icon || 'Globe'),
                  tag: item.tag || (prev.subServicesItems[idx]?.tag || 'INTEGRATION'),
                  pills: item.pills || (prev.subServicesItems[idx]?.pills || ['OwnerRez Sync', 'Live Parity']),
                  colorTheme: idx % 2 === 0 ? 'blue' : 'cyan'
                }))
              : prev.subServicesItems,
            coreSolutions: (apiData.coreSolutions && apiData.coreSolutions.length > 0)
              ? apiData.coreSolutions
              : (apiData.subServicesItems && apiData.subServicesItems.length > 0 && !prev.coreSolutions
                  ? apiData.subServicesItems.map((item, i) => ({
                      id: `module-${i}`,
                      title: item.title,
                      subtitle: item.subtitle || 'Automated OwnerRez Connectivity',
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
        console.warn('Using default static OwnerRez integration data:', err.message);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const triggerSimSync = () => {
    setSimState(prev => ({ ...prev, isSyncing: true, status: 'Triggering OwnerRez Webhook Event...' }));
    setTimeout(() => {
      const pins = ['582914', '918230', '824910', '304918', '719283'];
      const randomPin = pins[Math.floor(Math.random() * pins.length)];
      setSimState({
        activeOta: 'Airbnb, Vrbo & Direct Booking',
        status: 'Parity Verified • 0 Calendar Clashes',
        smartLockPin: randomPin,
        isSyncing: false,
        latency: `${Math.floor(75 + Math.random() * 35)}ms`
      });
    }, 850);
  };

  const coreModules = data.coreSolutions || DEFAULT_DATA.coreSolutions;
  const currentModule = coreModules[activeTab] || coreModules[0];

  return (
    <div className="min-h-screen bg-white text-ink selection:bg-[#0066cc]/20 selection:text-[#0066cc]">
      {/* ---------------------------------------------------- */}
      {/* 1. HERO SECTION (DARK LUXURY WITH OWNERREZ ROYAL BLUE & CYAN ACCENTS) */}
      {/* ---------------------------------------------------- */}
      <section className="relative pt-32 pb-20 lg:pt-36 lg:pb-28 bg-gradient-to-b from-[#091122] via-[#0f1d38] to-[#070e1c] text-white overflow-hidden">
        {/* Glow and Grid Mesh */}
        <div className="absolute inset-0 pointer-events-none opacity-25">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0066cc] rounded-full blur-[140px]" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#00c2cb] rounded-full blur-[140px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <Reveal>
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold tracking-widest uppercase text-[#38bdf8]">
                  <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-pulse" />
                  {data.heroEyebrow || 'OWNERREZ INTEGRATION SERVICES'}
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.14]">
                  {formatInline(data.heroTitle || 'Custom OwnerRez Integration Solutions For Vacation Rental Businesses')}
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
                      <CheckCircle2 className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-200 font-medium leading-snug">{badge}</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Action Buttons */}
              <Reveal delay={0.4}>
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <button
                    onClick={() => openEstimateModal('OwnerRez Integration Consultation')}
                    className="btn-primary text-sm sm:text-base px-7 py-3.5 cursor-pointer"
                  >
                    <span>{data.heroPrimaryBtnText || 'Schedule An OwnerRez Consultation'}</span>
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

            {/* Right Column: Hero Visual Card (OwnerRez Live PMS Node Hub) */}
            <div className="lg:col-span-5">
              <Reveal delay={0.3}>
                <div className="relative rounded-2xl bg-gradient-to-b from-[#0a1830]/95 to-[#040e20]/95 border border-[#0066cc]/30 shadow-[0_10px_40px_rgba(0,102,204,0.18)] backdrop-blur-xl p-5 sm:p-6 overflow-hidden">
                  
                  {/* Top Bar */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      <span className="text-xs font-mono text-slate-400 ml-1">ownerrez_pms_daemon</span>
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
                        <div className="w-9 h-9 rounded-lg bg-[#0066cc]/15 border border-[#0066cc]/30 flex items-center justify-center text-[#38bdf8] font-bold">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-sm">OwnerRez Unified Bridge</h3>
                          <p className="text-[11px] text-slate-400">Direct Channel & PMS Engine</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-[#38bdf8] font-bold bg-[#0066cc]/15 px-2 py-0.5 rounded border border-[#0066cc]/30">
                        {simState.latency}
                      </span>
                    </div>

                    {/* Nodes */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#38bdf8] font-bold flex items-center gap-1">
                            <Share2 className="w-3.5 h-3.5" /> OTAs & Direct
                          </span>
                          <span className="text-[10px] text-emerald-400 font-mono">Live</span>
                        </div>
                        <div className="text-[11px] text-slate-300 font-mono truncate">{simState.activeOta}</div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#a594f9] font-bold flex items-center gap-1">
                            <KeyRound className="w-3.5 h-3.5" /> Smart Lock
                          </span>
                          <span className="text-[10px] text-cyan-300 font-mono">PIN: {simState.smartLockPin}</span>
                        </div>
                        <div className="text-[11px] text-slate-300 font-mono">Auto Dispatched</div>
                      </div>
                    </div>

                    {/* Terminal status */}
                    <div className="p-3 rounded-xl bg-black/90 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-500 text-[10px]">
                        <Terminal className="w-3 h-3 text-[#38bdf8]" />
                        <span>LIVE INVENTORY MONITOR</span>
                      </div>
                      <div className="text-cyan-300 text-[11px] leading-relaxed">
                        {simState.isSyncing ? (
                          <span className="flex items-center gap-2 text-white">
                            <RefreshCw className="w-3 h-3 animate-spin text-[#38bdf8]" />
                            {simState.status}
                          </span>
                        ) : (
                          `> ${simState.status} • Zero rate disparities`
                        )}
                      </div>
                    </div>

                    {/* Interactive Button */}
                    <button
                      onClick={triggerSimSync}
                      disabled={simState.isSyncing}
                      className="w-full py-2.5 rounded-xl bg-[#0066cc]/20 hover:bg-[#0066cc]/30 border border-[#0066cc]/40 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Simulate OwnerRez 2-Way Event Sync</span>
                    </button>

                  </div>

                  {/* Footer */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Sync Reliability: <strong className="text-emerald-400">99.99%</strong></span>
                    <span>API Mode: <strong className="text-[#38bdf8]">REST, Webhooks & OAuth</strong></span>
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 2. SECTION 1: CONNECT OWNERREZ WITH BUSINESS SYSTEMS */}
      {/* ---------------------------------------------------- */}
      <section id="ecosystem" className="py-20 md:py-24 bg-slate-50/70 border-b border-gray-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0066cc]/10 border border-[#0066cc]/20 text-[#0066cc] text-xs font-bold uppercase tracking-wider mb-4">
                <Workflow className="w-3.5 h-3.5" />
                <span>ECOSYSTEM CONNECTIVITY</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight mb-4">
                {formatInline(data.subServicesTitle || 'Connect OwnerRez With Your Business Systems')}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {formatInline(data.subServicesIntro || '')}
              </p>
            </Reveal>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {(data.subServicesItems || []).map((item, idx) => {
              const isBlue = item.colorTheme === 'blue' || idx % 2 === 0;
              return (
                <StaggerItem key={idx}>
                  <div className="h-full bg-white hover:bg-white border border-gray-100 hover:border-[#0066cc]/40 rounded-2xl p-6 shadow-card hover:shadow-soft transition-all duration-300 group flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                          isBlue ? 'bg-[#0066cc]/10 text-[#0066cc]' : 'bg-[#00c2cb]/10 text-[#00a8b2]'
                        }`}>
                          <DynamicIcon icon={item.icon || 'Layers'} className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                          {item.tag || 'INTEGRATION'}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-ink mb-2 group-hover:text-[#0066cc] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-5 font-normal">
                        {item.desc}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-100">
                      {(item.pills || ['OwnerRez Sync', 'Automation', 'Real-time']).map((pill, pIdx) => (
                        <span key={pIdx} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-50 border border-gray-200 text-slate-700">
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0066cc]/10 border border-[#0066cc]/20 text-[#0066cc] text-xs font-bold uppercase tracking-wider mb-4">
                <Cpu className="w-3.5 h-3.5" />
                <span>COMPREHENSIVE OWNERREZ MODULES</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight mb-4">
                {formatInline(data.coreSolutionsTitle || 'Specialised OwnerRez Integration Capabilities')}
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
                      ? 'bg-[#0066cc] text-white shadow-md shadow-[#0066cc]/20 scale-102'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <DynamicIcon icon={mod.icon || 'Check'} className="w-4 h-4" />
                  <span>{mod.title.replace('OwnerRez ', '').replace(' Integration', '')}</span>
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
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#0066cc]/10 text-[#0066cc] text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{currentModule.badge || 'OWNERREZ CAPABILITY'}</span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-ink leading-tight">
                      {currentModule.title}
                    </h3>
                    {currentModule.subtitle && (
                      <p className="text-xs sm:text-sm font-semibold text-[#0066cc] mt-1">
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
                        <div className="w-4 h-4 rounded-full bg-[#0066cc]/15 flex items-center justify-center text-[#0066cc] shrink-0 mt-0.5">
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
                      onClick={() => openEstimateModal(`OwnerRez - ${currentModule.title}`)}
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
                        <span className="text-xs font-mono text-gray-500 ml-1">ownerrez_gateway.ts</span>
                      </div>
                      <span className="text-[11px] font-mono text-[#0066cc] font-bold">SYNCHRONIZED</span>
                    </div>

                    <div className="space-y-2 font-mono text-xs">
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-gray-100 flex items-center justify-between">
                        <span className="text-gray-500">API Endpoint:</span>
                        <span className="text-[#0066cc] font-semibold">/api/v2/ownerrez/sync</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-gray-100 flex items-center justify-between">
                        <span className="text-gray-500">Channel Parity:</span>
                        <span className="text-emerald-600 font-semibold">100% Guaranteed</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-gray-100 flex items-center justify-between">
                        <span className="text-gray-500">Smart Lock Token:</span>
                        <span className="text-cyan-600 font-semibold">Auto Generated PIN</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-gray-100 flex items-center justify-between">
                        <span className="text-gray-500">Payment Webhook:</span>
                        <span className="text-blue-600 font-semibold">Security Deposit Hold</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-[#0066cc]/5 border border-[#0066cc]/20 flex items-center gap-2.5">
                      <ShieldCheck className="w-5 h-5 text-[#0066cc] shrink-0" />
                      <p className="text-xs text-gray-600 font-sans leading-tight">
                        Encrypted payload validation, automated rate parity, and instant guest messaging triggers.
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0066cc]/10 border border-[#0066cc]/20 text-[#0066cc] text-xs font-bold uppercase tracking-wider mb-4">
                <Target className="w-3.5 h-3.5" />
                <span>STRUCTURED DELIVERY</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight mb-4">
                {formatInline(data.processTitle || 'Our OwnerRez Integration Process')}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {formatInline(data.processIntro || 'Cubixsol follows a professional process to develop successful OwnerRez integration solutions:')}
              </p>
            </Reveal>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {(data.processSteps || DEFAULT_DATA.processSteps).map((step, idx) => (
              <StaggerItem key={idx}>
                <div className="h-full bg-white border border-gray-100 hover:border-[#0066cc]/40 rounded-2xl p-6 shadow-card hover:shadow-soft transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-[#0066cc]/30 group-hover:text-[#0066cc] transition-colors font-mono">
                        {step.step || `0${idx + 1}`}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-[#0066cc] group-hover:bg-[#0066cc]/10 transition-colors">
                        <DynamicIcon icon={step.icon || 'Workflow'} className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-ink group-hover:text-[#0066cc] transition-colors">
                      {step.title}
                    </h3>

                    <p className="text-xs text-gray-600 leading-relaxed font-normal">
                      {formatInline(step.desc || '')}
                    </p>
                  </div>

                  <div className="w-full h-1 rounded-full bg-slate-100 mt-5 overflow-hidden">
                    <div className="h-full bg-[#0066cc] w-0 group-hover:w-full transition-all duration-500" />
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 5. SECTION 4: WHY CHOOSE CUBIXSOL FOR OWNERREZ */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-white border-b border-gray-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0066cc]/10 border border-[#0066cc]/20 text-[#0066cc] text-xs font-bold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5" />
                  <span>WHY CUBIXSOL</span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight leading-tight">
                  {formatInline(data.whyChooseTitle || 'Why Choose Cubixsol For OwnerRez Integration?')}
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
                    onClick={() => openEstimateModal('Why Choose OwnerRez')}
                    className="btn-primary text-sm px-6 py-3 cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>Discuss Your OwnerRez Project</span>
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
                    <div className="h-full p-5 rounded-2xl bg-slate-50 border border-gray-100 hover:border-[#0066cc]/40 transition-all duration-300 space-y-2.5 group shadow-sm hover:shadow-card">
                      <div className="w-9 h-9 rounded-xl bg-[#0066cc]/10 border border-[#0066cc]/20 flex items-center justify-center text-[#0066cc] group-hover:bg-[#0066cc] group-hover:text-white transition-colors">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-bold text-ink group-hover:text-[#0066cc] transition-colors">
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0066cc]/10 border border-[#0066cc]/20 text-[#0066cc] text-xs font-bold uppercase tracking-wider mb-2">
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
                {data.faqIntro || 'Clear answers to common questions about our OwnerRez integration and automation services.'}
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
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-ink hover:text-[#0066cc] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#0066cc] shrink-0 transition-transform duration-300 ${
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
        eyebrow="READY TO ELEVATE YOUR OWNERREZ OPERATIONS?"
        title="Automate & Scale Your Vacation Rentals With Custom OwnerRez Integrations"
        subtitle="Connect OwnerRez with your rental channels, smart locks, payment gateways, and CRM into one seamless automated platform."
        buttonText="Schedule An OwnerRez Consultation"
        buttonLink="/contact"
        showChatButton={true}
      />
    </div>
  );
}
