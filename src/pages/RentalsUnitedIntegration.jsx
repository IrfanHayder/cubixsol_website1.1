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

// Default static data matching the document provided for Rentals United Integration Services
const DEFAULT_DATA = {
  slug: 'rentals-united-integration',
  title: 'Rentals United Integration Services',
  heroEyebrow: 'RENTALS UNITED INTEGRATION SERVICES',
  heroTitle: 'Custom Rentals United Integration Solutions For Vacation Rental Distribution',
  heroDesc: 'Cubixsol provides professional Rentals United integration services to help vacation rental businesses connect their distribution network with property management systems, booking platforms, and business applications. Our developers create customized integration solutions that improve listing management, automate reservation workflows, and simplify multi-channel operations.',
  heroPrimaryBtnText: 'Schedule A Rentals United Consultation',
  heroSecondaryBtnText: 'Explore Solutions',
  heroBadges: [
    '2-Way Multi-Channel OTA Synchronisation',
    'Custom Rentals United Open API Connections',
    'Seamless PMS & Enterprise Bridge Integrations',
    'Automated Booking & Payment Processing Workflows',
    'CRM, Guest Messaging & Revenue Management Sync'
  ],
  heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&h=800&q=80',

  // Section 1: Connect Rentals United With Your Business Platforms
  subServicesTitle: 'Connect Rentals United With Your Business Platforms',
  subServicesIntro: 'Managing properties across multiple sales channels requires accurate data exchange between different systems. We develop Rentals United integrations that connect your distribution platform with essential business applications, including:',
  subServicesItems: [
    {
      icon: 'Building2',
      tag: 'PMS PLATFORMS',
      title: 'Property Management Systems',
      desc: 'Connect Rentals United with your core PMS to automatically sync property details, minimum stay rules, rates, calendars, and guest reservations in real time.',
      pills: ['Bidirectional Sync', 'Centralized Rates', 'Calendar Parity'],
      colorTheme: 'teal'
    },
    {
      icon: 'Share2',
      tag: 'CHANNELS & OTAS',
      title: 'Airbnb, Booking.com, Vrbo, and other OTAs',
      desc: 'Seamless connectivity with 60+ global OTAs and niche booking channels for unified listing distribution, dynamic rate updates, and zero double bookings.',
      pills: ['Airbnb Sync', 'Booking.com', 'Vrbo & 60+ Channels'],
      colorTheme: 'indigo'
    },
    {
      icon: 'Globe',
      tag: 'DIRECT BOOKINGS',
      title: 'Direct Booking Websites',
      desc: 'Bridge your direct booking websites with Rentals United inventory and availability engines to capture commission-free reservations automatically.',
      pills: ['Custom Booking Engine', 'Instant Calculation', 'Direct Checkout'],
      colorTheme: 'teal'
    },
    {
      icon: 'CreditCard',
      tag: 'PAYMENTS & TRANSACTIONS',
      title: 'Payment Processing Solutions',
      desc: 'Integrate secure payment gateways (Stripe, Adyen, PayPal) for automatic deposit captures, card validation, pre-authorizations, and payouts.',
      pills: ['Stripe / Merchant Gateways', 'Pre-Auth Holds', 'Card Tokenization'],
      colorTheme: 'indigo'
    },
    {
      icon: 'Users',
      tag: 'CRM & GUEST PROFILES',
      title: 'CRM Platforms',
      desc: 'Unify Rentals United reservation records with HubSpot, Salesforce, and CRM suites to consolidate guest history, preferences, and loyalty data.',
      pills: ['Guest Consolidation', 'Loyalty Tracking', 'HubSpot / Salesforce'],
      colorTheme: 'teal'
    },
    {
      icon: 'PieChart',
      tag: 'ACCOUNTING & FINANCE',
      title: 'Accounting Software',
      desc: 'Automate revenue recognition, sales tax calculations, channel commissions, and owner financial reporting with QuickBooks, Xero, and ERP tools.',
      pills: ['QuickBooks & Xero', 'Commission Tracking', 'Owner Statements'],
      colorTheme: 'indigo'
    },
    {
      icon: 'TrendingUp',
      tag: 'REVENUE OPTIMIZATION',
      title: 'Revenue Management Tools',
      desc: 'Connect dynamic pricing tools like PriceLabs, Wheelhouse, and Beyond Pricing to automatically push optimal rates across your distribution network.',
      pills: ['PriceLabs Sync', 'Dynamic Yields', 'Real-time Repricing'],
      colorTheme: 'teal'
    },
    {
      icon: 'KeyRound',
      tag: 'SMART IOT & HARDWARE',
      title: 'Smart Property Technologies',
      desc: 'Automate digital key creation and guest access control by integrating reservation milestones with smart lock systems and IoT devices.',
      pills: ['Keyless Entry PINs', 'Smart Access Control', 'IoT Automation'],
      colorTheme: 'indigo'
    }
  ],

  // Section 2: Core 5 Specialized Solution Modules
  coreSolutionsTitle: 'Specialised Rentals United Integration Capabilities',
  coreSolutionsIntro: 'Our specialized integration modules bridge Rentals United with every operational touchpoint of your vacation rental distribution ecosystem.',
  coreSolutions: [
    {
      id: 'channel-management',
      title: 'Rentals United Channel Management Integration',
      subtitle: 'Accurate Multi-Marketplace Synchronisation & Global Reach',
      desc: 'Our experts create Rentals United channel integrations that help synchronise rental information across multiple booking platforms. Our connected channel solutions allow property managers to maintain accurate information across different marketplaces. Our channel management solutions support:',
      icon: 'Network',
      badge: 'CHANNEL DISTRIBUTION',
      features: [
        'Real-time listing synchronisation across 60+ global OTAs and niche channels',
        'Instant reservation updates and automated status modifications',
        'Dynamic availability management preventing overlapping calendar dates',
        'Comprehensive rate and inventory synchronisation with currency conversion',
        'Seamless guest information transfer and verified contact exchange'
      ]
    },
    {
      id: 'api-services',
      title: 'Rentals United API Integration Services',
      subtitle: 'Scalable & Secure API Connection Architecture',
      desc: 'We provide custom Rentals United API integration solutions for businesses. We build scalable solutions to support complex rental operations and evolving business requirements. Our developers create secure API-based connections that allow applications to exchange data efficiently. Our Rentals United API services include:',
      icon: 'Code2',
      badge: 'CUSTOM API ENGINEERING',
      features: [
        'Custom API development tailored to bespoke enterprise workflow logic',
        'Third-party platform integration spanning ERP, custom CRMs, and apps',
        'High-frequency automated data synchronisation via bidirectional webhooks',
        'Intelligent workflow automation pipelines triggered by reservation events',
        'Comprehensive API testing, rate-limit management, and performance optimisation'
      ]
    },
    {
      id: 'pms-integration',
      title: 'Rentals United PMS Integration Solutions',
      subtitle: 'Unified Operational Workflows & Synchronized Central Records',
      desc: 'Many property managers use separate PMS platforms to manage reservations, guests, and operations. We help connect Rentals United with property management systems to create smoother workflows. Our PMS integration services support:',
      icon: 'Building2',
      badge: 'PMS CONNECTIVITY',
      features: [
        'Two-way reservation synchronisation between Rentals United and your PMS',
        'Centralized property data management for descriptions, amenities, and photos',
        'Unified calendar coordination with sub-second parity guarantees',
        'Direct guest information exchange for frictionless check-in flows',
        'Automated operational updates across housekeeping and maintenance teams'
      ]
    },
    {
      id: 'booking-payment',
      title: 'Rentals United Booking And Payment Integration',
      subtitle: 'Streamlined Transaction Workflows & Automated Financial Processing',
      desc: 'A smooth booking experience requires reliable connections between distribution platforms and payment systems. We integrate Rentals United with booking and payment solutions to improve transaction workflows. Our services include:',
      icon: 'CreditCard',
      badge: 'PAYMENT & TRANSACTIONS',
      features: [
        'Secure online payment gateway integration with multi-currency support',
        'Booking confirmation automation dispatched instantly via email and SMS',
        'Real-time transaction data synchronisation and automatic ledger posting',
        'Customer information management consolidating historical payment records',
        'Comprehensive revenue tracking solutions and multi-channel yield insights'
      ]
    },
    {
      id: 'crm-automation',
      title: 'Rentals United CRM And Automation Integration',
      subtitle: 'Personalized Guest Engagement & Automated Operational Pipelines',
      desc: 'We connect Rentals United with CRM and automation platforms to improve communication and workflow management. Our integrations allow companies to improve guest engagement and manage operations more effectively. Our solutions can support:',
      icon: 'Workflow',
      badge: 'CRM & AUTOMATION',
      features: [
        'Automated guest notifications for pre-arrival instructions and post-stay follow-ups',
        'Bidirectional CRM data synchronisation with guest profile enrichment',
        'Intelligent marketing automation for targeted retargeting and repeat direct bookings',
        'Automated customer follow-up workflows and 5-star review request drips',
        'End-to-end business process automation eliminating manual administration'
      ]
    }
  ],

  // Section 3: Process
  processTitle: 'Our Rentals United Integration Process',
  processIntro: 'Cubixsol follows a structured process to deliver reliable Rentals United integration solutions:',
  processSteps: [
    {
      step: '01',
      title: 'Business Requirement Analysis',
      desc: 'Our team evaluates your distribution goals, existing systems, channel network, and technical requirements.',
      icon: 'Compass'
    },
    {
      step: '02',
      title: 'Integration Planning',
      desc: 'We design a solution architecture, API data mapping, and security protocols based on your workflow and business objectives.',
      icon: 'Workflow'
    },
    {
      step: '03',
      title: 'Development And Configuration',
      desc: 'Our developers build, test, and configure the required API bridges, webhook handlers, and secure system connections.',
      icon: 'Code2'
    },
    {
      step: '04',
      title: 'Testing And Deployment',
      desc: 'We verify data accuracy, multi-channel calendar parity, security, and integration performance under peak loads.',
      icon: 'ShieldCheck'
    },
    {
      step: '05',
      title: 'Support And Maintenance',
      desc: 'Our team provides ongoing technical support, monitoring, and proactive updates after implementation.',
      icon: 'RefreshCw'
    }
  ],

  // Section 4: Why Choose
  whyChooseTitle: 'Why Choose Cubixsol For Rentals United Integration?',
  whyChooseIntro: 'Cubixsol helps vacation rental businesses improve their distribution capabilities through custom Rentals United integration solutions. Our team focuses on building reliable connections that simplify multi-channel management and improve operational visibility.\n\nWe understand the challenges of managing listings across different marketplaces. That\'s why we create integrations that support accurate data synchronisation, automated workflows, and scalable rental operations. Whether you need PMS connectivity, API development, channel automation, or custom software connections, Cubixsol delivers Rentals United solutions designed for your business needs.',
  whyChoosePoints: [
    {
      title: 'Enterprise Multi-Channel Expertise',
      desc: 'Specialized engineers experienced in large-scale channel managers, OTA APIs, and high-frequency distribution architectures.'
    },
    {
      title: 'Custom API Bridges & Webhooks',
      desc: 'Tailored backend connectors ensuring your PMS, ERP, and payment gateways communicate effortlessly with Rentals United.'
    },
    {
      title: 'Zero Double-Booking Guarantee',
      desc: 'Sub-second synchronization logic ensuring calendar parity and accurate rate availability across all connected marketplaces.'
    },
    {
      title: 'Scalable For Growing Portfolios',
      desc: 'Architectures engineered to seamlessly handle thousands of units, multi-currency conversions, and dynamic seasonal pricing.'
    },
    {
      title: 'End-to-End Workflow Automation',
      desc: 'Eliminate repetitive manual tasks by automating guest messaging, payment authorizations, and team housekeeping alerts.'
    },
    {
      title: 'Dedicated Technical Support',
      desc: '24/7 system monitoring, proactive API version updates, and rapid engineering assistance for continuous uptime.'
    }
  ],

  // Section 5: FAQs
  faqTitle: 'Frequently Asked Questions',
  faqIntro: 'Got questions about integrating Rentals United with your existing platforms? Find clear answers below.',
  faqs: [
    {
      q: 'What Rentals United integration services does Cubixsol provide?',
      a: 'Cubixsol develops Rentals United integrations with PMS platforms, booking channels, payment systems, CRM tools, and other business applications.'
    },
    {
      q: 'Can Rentals United connect with Airbnb and other OTAs?',
      a: 'Yes, Rentals United supports connections with multiple booking channels, and Cubixsol can develop customized integration solutions.'
    },
    {
      q: 'Does Cubixsol provide Rentals United API integration?',
      a: 'Yes, our developers create API-based integrations that connect Rentals United with external software systems.'
    },
    {
      q: 'Can Rentals United integrate with property management systems?',
      a: 'Yes, Rentals United can connect with different PMS platforms to synchronise reservations, listings, and operational data.'
    },
    {
      q: 'How does Rentals United integration benefit vacation rental businesses?',
      a: 'Rentals United integration helps businesses manage multiple channels, automate workflows, and improve distribution efficiency.'
    }
  ]
};

export default function RentalsUnitedIntegration() {
  const { openEstimateModal } = useEstimateModal();
  const [data, setData] = useState(DEFAULT_DATA);
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [simState, setSimState] = useState({
    activeOta: 'Airbnb, Vrbo & Booking.com',
    status: 'Global Channel Sync Active',
    pmsStatus: 'Two-Way Connected',
    isSyncing: false,
    latency: '104ms',
    connectedChannels: 62
  });

  // SEO Hook
  useSEO(data?.seo, {
    title: 'Rentals United Integration Services | Vacation Rental Distribution | Cubixsol',
    description: 'Expert Rentals United integration services by Cubixsol. Connect Rentals United with PMS platforms, Airbnb, Vrbo, Booking.com, payment gateways, CRM, and custom APIs.',
    keywords: 'Rentals United integration, Rentals United API, channel manager integration, PMS Rentals United, vacation rental distribution, Cubixsol',
    canonicalUrl: 'https://cubixsol.com/rentals-united-integration'
  });

  // Dynamic fetch from backend so changes in Admin Dashboard automatically update the page
  useEffect(() => {
    let isMounted = true;
    apiFetch('services/rentals-united-integration')
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
                  icon: item.icon || (prev.subServicesItems[idx]?.icon || 'Network'),
                  tag: item.tag || (prev.subServicesItems[idx]?.tag || 'INTEGRATION'),
                  pills: item.pills || (prev.subServicesItems[idx]?.pills || ['RU Sync', 'Live Parity']),
                  colorTheme: idx % 2 === 0 ? 'teal' : 'indigo'
                }))
              : prev.subServicesItems,
            coreSolutions: (apiData.coreSolutions && apiData.coreSolutions.length > 0)
              ? apiData.coreSolutions
              : (apiData.subServicesItems && apiData.subServicesItems.length > 0 && !prev.coreSolutions
                  ? apiData.subServicesItems.map((item, i) => ({
                      id: `module-${i}`,
                      title: item.title,
                      subtitle: item.subtitle || 'Automated Rentals United Connectivity',
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
        console.warn('Using default static Rentals United integration data:', err.message);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const triggerSimSync = () => {
    setSimState(prev => ({ ...prev, isSyncing: true, status: 'Broadcasting Multi-Channel Webhooks...' }));
    setTimeout(() => {
      setSimState({
        activeOta: '62 Global OTAs & Direct Engine',
        status: 'Parity Verified Across All Channels',
        pmsStatus: 'PMS Ledger Synchronized',
        isSyncing: false,
        latency: `${Math.floor(75 + Math.random() * 35)}ms`,
        connectedChannels: 62
      });
    }, 850);
  };

  const coreModules = data.coreSolutions || DEFAULT_DATA.coreSolutions;
  const currentModule = coreModules[activeTab] || coreModules[0];

  return (
    <div className="min-h-screen bg-white text-ink selection:bg-[#00a88f]/20 selection:text-[#00a88f]">
      {/* ---------------------------------------------------- */}
      {/* 1. HERO SECTION (DARK LUXURY WITH RENTALS UNITED TEAL & INDIGO ACCENTS) */}
      {/* ---------------------------------------------------- */}
      <section className="relative pt-32 pb-20 lg:pt-36 lg:pb-28 bg-gradient-to-b from-[#08121e] via-[#0f1d2e] to-[#091422] text-white overflow-hidden">
        {/* Glow and Grid Mesh */}
        <div className="absolute inset-0 pointer-events-none opacity-25">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00a88f] rounded-full blur-[140px]" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#4338ca] rounded-full blur-[140px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <Reveal>
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold tracking-widest uppercase text-[#00d2b4]">
                  <span className="w-2 h-2 rounded-full bg-[#00d2b4] animate-pulse" />
                  {data.heroEyebrow || 'RENTALS UNITED INTEGRATION SERVICES'}
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.14]">
                  {formatInline(data.heroTitle || 'Custom Rentals United Integration Solutions For Vacation Rental Distribution')}
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
                      <CheckCircle2 className="w-4 h-4 text-[#00d2b4] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-200 font-medium leading-snug">{badge}</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Action Buttons */}
              <Reveal delay={0.4}>
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <button
                    onClick={() => openEstimateModal('Rentals United Integration Consultation')}
                    className="btn-primary text-sm sm:text-base px-7 py-3.5 cursor-pointer"
                  >
                    <span>{data.heroPrimaryBtnText || 'Schedule A Rentals United Consultation'}</span>
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

            {/* Right Column: Hero Visual Card (Rentals United Live Distribution Hub) */}
            <div className="lg:col-span-5">
              <Reveal delay={0.3}>
                <div className="relative rounded-2xl bg-gradient-to-b from-[#081829]/95 to-[#040e1a]/95 border border-[#00a88f]/30 shadow-[0_10px_40px_rgba(0,168,143,0.18)] backdrop-blur-xl p-5 sm:p-6 overflow-hidden">
                  
                  {/* Top Bar */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      <span className="text-xs font-mono text-slate-400 ml-1">ru_distribution_daemon</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      60+ CHANNELS
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="py-4 space-y-3.5">
                    
                    {/* Header Card */}
                    <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#00a88f]/15 border border-[#00a88f]/30 flex items-center justify-center text-[#00d2b4] font-bold">
                          <Network className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-sm">Rentals United Global Bridge</h3>
                          <p className="text-[11px] text-slate-400">High-Frequency Channel Router</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-[#00d2b4] font-bold bg-[#00a88f]/15 px-2 py-0.5 rounded border border-[#00a88f]/30">
                        {simState.latency}
                      </span>
                    </div>

                    {/* Nodes */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#00d2b4] font-bold flex items-center gap-1">
                            <Share2 className="w-3.5 h-3.5" /> Multi-OTAs
                          </span>
                          <span className="text-[10px] text-emerald-400 font-mono">60+ Active</span>
                        </div>
                        <div className="text-[11px] text-slate-300 font-mono truncate">{simState.activeOta}</div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-indigo-400 font-bold flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5" /> PMS Bridge
                          </span>
                          <span className="text-[10px] text-indigo-300 font-mono">2-Way Sync</span>
                        </div>
                        <div className="text-[11px] text-slate-300 font-mono">{simState.pmsStatus}</div>
                      </div>
                    </div>

                    {/* Terminal status */}
                    <div className="p-3 rounded-xl bg-black/90 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-500 text-[10px]">
                        <Terminal className="w-3 h-3 text-[#00d2b4]" />
                        <span>LIVE INVENTORY ROUTER</span>
                      </div>
                      <div className="text-[#00d2b4] text-[11px] leading-relaxed">
                        {simState.isSyncing ? (
                          <span className="flex items-center gap-2 text-white">
                            <RefreshCw className="w-3 h-3 animate-spin text-[#00d2b4]" />
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
                      className="w-full py-2.5 rounded-xl bg-[#00a88f]/20 hover:bg-[#00a88f]/30 border border-[#00a88f]/40 text-[#00d2b4] text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Simulate Rentals United Distribution Sync</span>
                    </button>

                  </div>

                  {/* Footer */}
                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Channel Reliability: <strong className="text-emerald-400">99.99%</strong></span>
                    <span>API Mode: <strong className="text-[#00d2b4]">REST, SOAP & Webhooks</strong></span>
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 2. SECTION 1: CONNECT RENTALS UNITED WITH BUSINESS PLATFORMS */}
      {/* ---------------------------------------------------- */}
      <section id="ecosystem" className="py-20 md:py-24 bg-slate-50/70 border-b border-gray-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a88f]/10 border border-[#00a88f]/20 text-[#00a88f] text-xs font-bold uppercase tracking-wider mb-4">
                <Workflow className="w-3.5 h-3.5" />
                <span>ECOSYSTEM CONNECTIVITY</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight mb-4">
                {formatInline(data.subServicesTitle || 'Connect Rentals United With Your Business Platforms')}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {formatInline(data.subServicesIntro || '')}
              </p>
            </Reveal>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(data.subServicesItems || []).map((item, idx) => {
              const isTeal = item.colorTheme === 'teal' || idx % 2 === 0;
              return (
                <StaggerItem key={idx}>
                  <div className="h-full bg-white hover:bg-white border border-gray-100 hover:border-[#00a88f]/40 rounded-2xl p-6 shadow-card hover:shadow-soft transition-all duration-300 group flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                          isTeal ? 'bg-[#00a88f]/10 text-[#00a88f]' : 'bg-[#4338ca]/10 text-[#4338ca]'
                        }`}>
                          <DynamicIcon icon={item.icon || 'Network'} className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                          {item.tag || 'INTEGRATION'}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-ink mb-2 group-hover:text-[#00a88f] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-5 font-normal">
                        {item.desc}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-100">
                      {(item.pills || ['RU Sync', 'Automation', 'Real-time']).map((pill, pIdx) => (
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4338ca]/10 border border-[#4338ca]/20 text-[#4338ca] text-xs font-bold uppercase tracking-wider mb-4">
                <Cpu className="w-3.5 h-3.5" />
                <span>COMPREHENSIVE RENTALS UNITED MODULES</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight mb-4">
                {formatInline(data.coreSolutionsTitle || 'Specialised Rentals United Integration Capabilities')}
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
                      ? 'bg-[#00a88f] text-white shadow-md shadow-[#00a88f]/20 scale-102'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <DynamicIcon icon={mod.icon || 'Check'} className="w-4 h-4" />
                  <span>{mod.title.replace('Rentals United ', '').replace(' Integration', '')}</span>
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
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#00a88f]/10 text-[#00a88f] text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{currentModule.badge || 'RU CAPABILITY'}</span>
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-ink leading-tight">
                      {currentModule.title}
                    </h3>
                    {currentModule.subtitle && (
                      <p className="text-xs sm:text-sm font-semibold text-[#00a88f] mt-1">
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
                        <div className="w-4 h-4 rounded-full bg-[#00a88f]/15 flex items-center justify-center text-[#00a88f] shrink-0 mt-0.5">
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
                      onClick={() => openEstimateModal(`Rentals United - ${currentModule.title}`)}
                      className="btn-primary text-xs sm:text-sm px-6 py-3 cursor-pointer inline-flex items-center gap-2"
                    >
                      <span>Inquire About {currentModule.title.split(' ')[2] || 'This Module'}</span>
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
                        <span className="text-xs font-mono text-gray-500 ml-1">ru_channel_matrix.ts</span>
                      </div>
                      <span className="text-[11px] font-mono text-[#00a88f] font-bold">OPERATIONAL</span>
                    </div>

                    <div className="space-y-2 font-mono text-xs">
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-gray-100 flex items-center justify-between">
                        <span className="text-gray-500">Distribution Endpoint:</span>
                        <span className="text-[#00a88f] font-semibold">/api/v1/ru/channels/sync</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-gray-100 flex items-center justify-between">
                        <span className="text-gray-500">OTA Network Parity:</span>
                        <span className="text-emerald-600 font-semibold">60+ Channels Locked</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-gray-100 flex items-center justify-between">
                        <span className="text-gray-500">PMS Two-Way Bridge:</span>
                        <span className="text-indigo-600 font-semibold">Active Bi-directional</span>
                      </div>
                      <div className="p-2.5 rounded-lg bg-slate-50 border border-gray-100 flex items-center justify-between">
                        <span className="text-gray-500">Payment Webhooks:</span>
                        <span className="text-cyan-600 font-semibold">Instant Tokenization</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-lg bg-[#00a88f]/5 border border-[#00a88f]/20 flex items-center gap-2.5">
                      <ShieldCheck className="w-5 h-5 text-[#00a88f] shrink-0" />
                      <p className="text-xs text-gray-600 font-sans leading-tight">
                        High-throughput XML/REST sync with automated retry fallbacks and zero calendar clashes.
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a88f]/10 border border-[#00a88f]/20 text-[#00a88f] text-xs font-bold uppercase tracking-wider mb-4">
                <Target className="w-3.5 h-3.5" />
                <span>STRUCTURED DELIVERY</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight mb-4">
                {formatInline(data.processTitle || 'Our Rentals United Integration Process')}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {formatInline(data.processIntro || 'Cubixsol follows a structured process to deliver reliable Rentals United integration solutions:')}
              </p>
            </Reveal>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {(data.processSteps || DEFAULT_DATA.processSteps).map((step, idx) => (
              <StaggerItem key={idx}>
                <div className="h-full bg-white border border-gray-100 hover:border-[#00a88f]/40 rounded-2xl p-6 shadow-card hover:shadow-soft transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-[#00a88f]/30 group-hover:text-[#00a88f] transition-colors font-mono">
                        {step.step || `0${idx + 1}`}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-[#00a88f] group-hover:bg-[#00a88f]/10 transition-colors">
                        <DynamicIcon icon={step.icon || 'Workflow'} className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-ink group-hover:text-[#00a88f] transition-colors">
                      {step.title}
                    </h3>

                    <p className="text-xs text-gray-600 leading-relaxed font-normal">
                      {formatInline(step.desc || '')}
                    </p>
                  </div>

                  <div className="w-full h-1 rounded-full bg-slate-100 mt-5 overflow-hidden">
                    <div className="h-full bg-[#00a88f] w-0 group-hover:w-full transition-all duration-500" />
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 5. SECTION 4: WHY CHOOSE CUBIXSOL FOR RENTALS UNITED */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 md:py-24 bg-white border-b border-gray-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a88f]/10 border border-[#00a88f]/20 text-[#00a88f] text-xs font-bold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5" />
                  <span>WHY CUBIXSOL</span>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight leading-tight">
                  {formatInline(data.whyChooseTitle || 'Why Choose Cubixsol For Rentals United Integration?')}
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
                    onClick={() => openEstimateModal('Why Choose Rentals United')}
                    className="btn-primary text-sm px-6 py-3 cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>Discuss Your Distribution Architecture</span>
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
                    <div className="h-full p-5 rounded-2xl bg-slate-50 border border-gray-100 hover:border-[#00a88f]/40 transition-all duration-300 space-y-2.5 group shadow-sm hover:shadow-card">
                      <div className="w-9 h-9 rounded-xl bg-[#00a88f]/10 border border-[#00a88f]/20 flex items-center justify-center text-[#00a88f] group-hover:bg-[#00a88f] group-hover:text-white transition-colors">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-bold text-ink group-hover:text-[#00a88f] transition-colors">
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a88f]/10 border border-[#00a88f]/20 text-[#00a88f] text-xs font-bold uppercase tracking-wider mb-2">
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
                {data.faqIntro || 'Clear answers to common questions about our Rentals United integration and distribution services.'}
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
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-ink hover:text-[#00a88f] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#00a88f] shrink-0 transition-transform duration-300 ${
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
        eyebrow="READY TO MAXIMIZE YOUR DISTRIBUTION NETWORK?"
        title="Scale Multi-Channel Bookings With Custom Rentals United Integrations"
        subtitle="Connect Rentals United with your PMS, direct booking engine, payment gateways, and CRM into one synchronized global platform."
        buttonText="Schedule A Rentals United Consultation"
        buttonLink="/contact"
        showChatButton={true}
      />
    </div>
  );
}
