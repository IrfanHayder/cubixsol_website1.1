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
  Network, Activity, Shuffle, Headphones
} from 'lucide-react';
import { useEstimateModal } from '../context/EstimateModalContext';
import { apiFetch } from '../utils/api';
import { formatInline } from '../utils/formatText';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';
import CtaBanner from '../components/CtaBanner';
import DynamicIcon from '../components/DynamicIcon';
import { useSEO } from '../utils/seo';

// Default static fallback data matching the document provided for Uplisting Integration Services
const DEFAULT_DATA = {
  slug: 'uplisting-integration',
  title: 'Uplisting Integration Services',
  heroEyebrow: 'UPLISTING INTEGRATION SERVICES',
  heroTitle: 'Custom Uplisting Integrations For Rental Business Automation',
  heroDesc: 'Cubixsol provides professional Uplisting integration services. We extend Uplisting capabilities through custom integrations that match your business processes and technology requirements. Our developers create customised integrations to improve guest communication, automate operational workflows, and simplify the management of multiple rental properties.',
  heroPrimaryBtnText: 'Schedule An Uplisting Consultation',
  heroSecondaryBtnText: 'Explore Uplisting Solutions',
  heroBadges: [
    'Multi-Channel OTA Availability & Rate Synchronization',
    'Custom Uplisting API Engineering & Webhook Pipelines',
    'Automated Guest Messaging & Unified Inbox Integration',
    'Keyless Smart Lock Access Code Creation Automation',
    'Payment Processing, CRM & Workflow Automation'
  ],
  heroImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&h=800&q=80',

  // Section 1: Connect Uplisting With Your Business Applications
  subServicesTitle: 'Connect Uplisting With Your Business Applications',
  subServicesIntro: 'Modern vacation rental operations require multiple systems. Our integration solutions create a unified workflow where important information moves smoothly between different systems. We connect your PMS with important business platforms, such as:',
  subServicesItems: [
    {
      icon: 'Share2',
      tag: 'BOOKING MARKETPLACES',
      title: 'Airbnb, Booking.com, Vrbo, and other booking marketplaces.',
      desc: 'Keep calendars, pricing rates, restrictions, and instant reservations synchronized in real time across major global booking channels without double bookings.',
      pills: ['Airbnb 2-Way Sync', 'Booking.com Rates', 'Vrbo Real-Time Bridge'],
      colorTheme: 'cyan'
    },
    {
      icon: 'CreditCard',
      tag: 'PAYMENT GATEWAYS',
      title: 'Payment processing systems.',
      desc: 'Integrate secure payment gateways to automate guest payment collections, damage deposit authorizations, and transaction settlements.',
      pills: ['Stripe & Merchant Pay', 'Security Deposit Holds', 'Card Tokenization'],
      colorTheme: 'purple'
    },
    {
      icon: 'Users',
      tag: 'GUEST CRM',
      title: 'CRM and guest management platforms.',
      desc: 'Bridge guest records and booking histories with HubSpot, Salesforce, and CRM suites to centralize contact histories and VIP loyalty profiles.',
      pills: ['HubSpot / Salesforce', 'Guest History Sync', 'Loyalty Tracking'],
      colorTheme: 'cyan'
    },
    {
      icon: 'KeyRound',
      tag: 'SMART LOCKS',
      title: 'Smart lock technologies.',
      desc: 'Connect digital access systems (Yale, Schlage, August, RemoteLock) to auto-generate time-bounded guest door PINs upon confirmed reservation.',
      pills: ['Automated PIN Codes', 'RemoteLock / Yale', 'Contactless Guest Entry'],
      colorTheme: 'purple'
    },
    {
      icon: 'PieChart',
      tag: 'ACCOUNTING',
      title: 'Accounting applications.',
      desc: 'Synchronise booking revenue, occupancy taxes, cleaning fees, and owner disbursements with QuickBooks, Xero, or custom financial ledgers.',
      pills: ['QuickBooks & Xero', 'Tax Splitting', 'Owner Statement Reports'],
      colorTheme: 'cyan'
    },
    {
      icon: 'MessageSquare',
      tag: 'COMMUNICATION TOOLS',
      title: 'Communication automation tools.',
      desc: 'Automate post-stay review requests, pre-arrival welcome guides, upsell email sequences, and SMS alerts via Klaviyo, Mailchimp, or Twilio.',
      pills: ['Guest SMS Workflows', 'Review Generation', 'Upsell Sequences'],
      colorTheme: 'purple'
    },
    {
      icon: 'BarChart3',
      tag: 'REPORTING & ANALYTICS',
      title: 'Reporting and analytics solutions.',
      desc: 'Consolidate multi-channel performance data, RevPAR, average daily rate (ADR), and channel ROI into unified business intelligence dashboards.',
      pills: ['BI Dashboards', 'RevPAR & ADR Trends', 'Occupancy Heatmaps'],
      colorTheme: 'cyan'
    },
    {
      icon: 'Cpu',
      tag: 'CUSTOM SOFTWARE',
      title: 'Custom business software.',
      desc: 'Connect proprietary internal software, custom booking apps, housekeeping schedules, and maintenance dispatch systems directly with Uplisting.',
      pills: ['Custom Webhooks', 'Bespoke Software Bridges', 'Operations Hub'],
      colorTheme: 'purple'
    }
  ],

  // Section 2: Core Specialized Modules
  coreSolutionsTitle: 'Core Uplisting Integration Solutions',
  coreSolutionsIntro: 'Our specialized integration modules bridge Uplisting with every operational touchpoint of your vacation rental business.',
  coreSolutions: [
    {
      id: 'channel-management',
      title: 'Uplisting Channel Management Integration',
      subtitle: 'Accurate Multi-OTA Synchronization & Unified Reservation Control',
      desc: 'We manage reservations across different channels, which requires accurate synchronisation of property data and availability. A connected channel system reduces administrative work and maintains consistent information across multiple platforms. Our channel integration services include:',
      icon: 'Share2',
      badge: 'CHANNEL MANAGEMENT',
      features: [
        'Reservation synchronisation.',
        'Calendar updates.',
        'Listing information management.',
        'Guest data exchange.',
        'Booking status automation.'
      ]
    },
    {
      id: 'api-services',
      title: 'Uplisting API Integration Services',
      subtitle: 'Flexible Infrastructure, Secure API Connections & Scalable Data Flow',
      desc: 'We design flexible solutions that allow businesses to improve their technology infrastructure and adapt to future requirements. Our developers build secure API connections that support efficient data exchange and automation. Our Uplisting API services include:',
      icon: 'Terminal',
      badge: 'API INTEGRATION',
      features: [
        'Custom API development.',
        'Third-party software integration.',
        'Automated workflow creation.',
        'Data synchronisation.',
        'API testing and optimisation.'
      ]
    },
    {
      id: 'guest-communication',
      title: 'Uplisting Guest Communication Integration',
      subtitle: 'Automated Guest Interactions, Timely Messaging & Elevated Experience',
      desc: 'Guest communication is an important part of successful vacation rental management. Cubixsol helps businesses integrate Uplisting with communication platforms to automate important guest interactions. Our integration solutions provide timely communication and improve the overall guest experience. Our communication solutions support:',
      icon: 'MessageSquare',
      badge: 'GUEST COMMUNICATION',
      features: [
        'Automated booking confirmations.',
        'Check-in instructions.',
        'Guest notifications.',
        'Review request automation.',
        'Customer support workflows.'
      ]
    },
    {
      id: 'smart-locks',
      title: 'Uplisting Smart Lock Integration',
      subtitle: 'Keyless Self-Service Access, Digital Code Generation & Hardware Sync',
      desc: 'Self-service access solutions allow guests to enter properties conveniently while reducing operational effort for managers. We connect Uplisting with smart lock systems to support automated property access. Our smart lock integration services include:',
      icon: 'KeyRound',
      badge: 'SMART HARDWARE',
      features: [
        'Digital access code generation.',
        'Guest entry automation.',
        'Remote access management.',
        'Smart device connectivity.',
        'Check-in workflow automation.'
      ]
    },
    {
      id: 'payment-crm',
      title: 'Uplisting Payment And CRM Integration',
      subtitle: 'Connected Financial Information, Customer Data & CRM Automations',
      desc: 'We help businesses connect Uplisting with payment platforms and CRM systems to improve financial management and guest relationship processes. Connected systems provide better organisation of financial information and customer data. Our integration services include:',
      icon: 'CreditCard',
      badge: 'PAYMENT & CRM',
      features: [
        'Payment gateway connections.',
        'Transaction synchronisation.',
        'Guest profile management.',
        'CRM automation.',
        'Marketing workflow integration.'
      ]
    },
    {
      id: 'workflow-automation',
      title: 'Uplisting Workflow Automation Solutions',
      subtitle: 'Reduced Repetitive Tasks, Team Task Updates & Operational Alerts',
      desc: 'Cubixsol creates automation solutions that reduce repetitive tasks and improve daily property operations. We connect Uplisting with different business tools to create efficient workflows. Our solutions allow property managers to focus on business growth and guest satisfaction. Automation possibilities include:',
      icon: 'Workflow',
      badge: 'WORKFLOW AUTOMATION',
      features: [
        'Automatic guest notifications.',
        'Team task updates.',
        'Reservation alerts.',
        'Property status updates.',
        'Operational reminders.'
      ]
    }
  ],

  // Section 3: Our Uplisting Integration Process
  serviceProcessTitle: 'Our Uplisting Integration Process',
  serviceProcessIntro: 'Cubixsol follows a structured approach to deliver reliable Uplisting integration solutions:',
  serviceProcessSteps: [
    {
      stepNumber: '01',
      title: 'Requirement Analysis',
      desc: 'Our team reviews your current workflow, business goals, and required integration features.'
    },
    {
      stepNumber: '02',
      title: 'Technical Planning',
      desc: 'We design an integration strategy based on your operational requirements.'
    },
    {
      stepNumber: '03',
      title: 'Development And Configuration',
      desc: 'Our developers build and configure secure system connections.'
    },
    {
      stepNumber: '04',
      title: 'Testing And Deployment',
      desc: 'We verify functionality, performance, and data accuracy before launch.'
    },
    {
      stepNumber: '05',
      title: 'Support And Maintenance',
      desc: 'Our team provides ongoing technical assistance after implementation.'
    }
  ],

  // Section 4: Why Choose Cubixsol For Uplisting Integration
  whyChooseTitle: 'Why Choose Cubixsol For Uplisting Integration?',
  whyChooseIntro: 'Cubixsol helps professional vacation rental managers improve efficiency through Uplisting integrations designed around guest experience and operational automation. Our team creates solutions that connect communication tools, booking platforms, smart technologies, and business applications into a smooth workflow.\n\nWe focus on building integrations that reduce manual tasks, improve response times, and support scalable property management operations.',
  whyChooseItems: [
    {
      title: 'Tailored PMS Architecture',
      desc: 'Custom engineered data bridges tailored to your exact property portfolio size, third-party software stack, and business model.'
    },
    {
      title: 'Zero Double-Booking Guarantee',
      desc: 'Sub-second bidirectional synchronization across Airbnb, Vrbo, Booking.com, and direct web engines.'
    },
    {
      title: 'Automated Guest Self-Check-in',
      desc: 'Dynamic, time-restricted smart lock PIN creation linked automatically to confirmed Uplisting reservation timestamps.'
    },
    {
      title: 'End-to-End Enterprise Support',
      desc: 'Continuous monitoring, webhook error handling, API version maintenance, and 24/7 technical oversight.'
    }
  ],

  // Section 5: FAQs
  faqs: [
    {
      q: 'What Uplisting integration services does Cubixsol provide?',
      a: 'Cubixsol develops Uplisting integrations with booking channels, payment systems, CRM platforms, smart devices, automation tools, and business applications.'
    },
    {
      q: 'Can Uplisting integrate with Airbnb and other booking platforms?',
      a: 'Yes, Uplisting supports connections with major rental marketplaces, and Cubixsol can create customised integration solutions.'
    },
    {
      q: 'Does Cubixsol provide Uplisting API integration?',
      a: 'Yes, our developers build API-based integrations that connect Uplisting with external software systems.'
    },
    {
      q: 'Can Uplisting connect with smart lock systems?',
      a: 'Yes, Uplisting can integrate with smart access solutions to support automated guest entry and self-check-in.'
    },
    {
      q: 'How does Uplisting integration improve rental management?',
      a: 'Uplisting integration helps businesses automate operations, improve guest communication, and manage multiple properties more efficiently.'
    }
  ],

  // SEO
  seo: {
    metaTitle: 'Uplisting Integration Services | Vacation Rental Automation | Cubixsol',
    metaDescription: 'Professional Uplisting integration services by Cubixsol. Connect Uplisting PMS with Airbnb, Vrbo, payment processing, smart locks, and CRMs.',
    keywords: 'Uplisting integration, Uplisting API development, vacation rental PMS integration, Uplisting smart locks, Uplisting guest communication, Cubixsol',
    ogTitle: 'Uplisting Integration Services | Cubixsol',
    ogDescription: 'Custom Uplisting integration solutions for vacation rental management. Multi-channel synchronization, API bridges, guest communication, and smart locks.',
    ogImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&h=800&q=80',
    canonicalUrl: 'https://cubixsol.com/uplisting-integration'
  }
};

export default function UplistingIntegration() {
  const { openEstimateModal } = useEstimateModal();
  const [data, setData] = useState(DEFAULT_DATA);
  const [activeTab, setActiveTab] = useState('channel-management');
  const [openFaq, setOpenFaq] = useState(null);

  // Interactive Simulator States
  const [simChannel, setSimChannel] = useState('airbnb');
  const [syncStatus, setSyncStatus] = useState({ state: 'synced', latency: '22ms', lastUpdated: 'Just now' });
  const [isSyncing, setIsSyncing] = useState(false);
  const [generatedPin, setGeneratedPin] = useState('581920');

  // Fetch dynamic content from Admin Dashboard API
  useEffect(() => {
    let isMounted = true;
    apiFetch('/api/services/uplisting-integration')
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
      const newPin = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedPin(newPin);
      setSyncStatus({
        state: 'synced',
        latency: `${Math.floor(15 + Math.random() * 20)}ms`,
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
                <span>{data.heroEyebrow || 'UPLISTING INTEGRATION SERVICES'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.18]"
              >
                Custom <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a4d8] via-cyan-300 to-[#5d53a3]">Uplisting Integrations</span> For Rental Business Automation
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
                  onClick={() => openEstimateModal('Uplisting Integration Services')}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#00a4d8] to-[#5d53a3] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#00a4d8]/25 hover:shadow-[#5d53a3]/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>{data.heroPrimaryBtnText || 'Schedule An Uplisting Consultation'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#core-capabilities"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 hover:text-white font-semibold text-sm sm:text-base border border-slate-700 transition"
                >
                  <span>{data.heroSecondaryBtnText || 'Explore Uplisting Solutions'}</span>
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
                      <Activity className="w-5 h-5 text-[#00a4d8]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Uplisting Automation Hub</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          SYNC ACTIVE
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">Multi-Channel Property Automation</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono text-slate-400">Latency: </span>
                    <span className="text-[11px] font-mono font-bold text-emerald-400">{syncStatus.latency}</span>
                  </div>
                </div>

                {/* Connected System Nodes Grid */}
                <div className="space-y-2.5">
                  
                  {/* Node 1: Booking Marketplaces */}
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
                        <span className="text-xs font-bold text-slate-200">Marketplaces (Airbnb, Booking.com, Vrbo)</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                        2-Way Sync
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 pl-6.5">
                      Real-time availability locks, dynamic rate sync & instant reservation transfer
                    </p>
                  </div>

                  {/* Node 2: Guest Communication */}
                  <div
                    onClick={() => handleTriggerSync('messaging')}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      simChannel === 'messaging'
                        ? 'bg-[#5d53a3]/20 border-[#5d53a3]/60 shadow-md shadow-[#5d53a3]/10'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <MessageSquare className="w-4 h-4 text-[#5d53a3]" />
                        <span className="text-xs font-bold text-slate-200">Guest Communication & Unified Inbox</span>
                      </div>
                      <span className="text-[10px] font-mono text-purple-300">Automated</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 pl-6.5">
                      Booking confirmations, check-in instructions & automated review requests
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
                        <span className="text-xs font-bold text-slate-200">Smart Lock PIN: {generatedPin}</span>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-300">Auto Generated</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 pl-6.5">
                      Dynamic self-service access codes pushed to guest upon confirmation
                    </p>
                  </div>

                  {/* Node 4: Payment & CRM */}
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
                        <span className="text-xs font-bold text-slate-200">Payment Gateways & CRM Integration</span>
                      </div>
                      <span className="text-[10px] font-mono text-purple-300">Stripe / CRM</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 pl-6.5">
                      Automatic payments, guest profile management & marketing automations
                    </p>
                  </div>

                </div>

                {/* Visualizer Simulator Action Bar */}
                <div className="mt-4 pt-3.5 border-t border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-amber-400 animate-spin' : 'bg-emerald-400'}`} />
                    <span className="text-xs text-slate-300">
                      {isSyncing ? 'Synchronizing Uplisting webhook payload...' : 'All connected endpoints verified'}
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
      {/* 2. SECTION 1: CONNECT UPLISTING WITH YOUR BUSINESS APPLICATIONS (8 APPS) */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-24 bg-slate-50/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/20 text-[#00a4d8] text-xs font-bold uppercase tracking-wider">
              <Workflow className="w-3.5 h-3.5 text-[#00a4d8]" />
              <span>ECOSYSTEM CONNECTIVITY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              {data.subServicesTitle || 'Connect Uplisting With Your Business Applications'}
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
                        {item.tag || `PLATFORM 0${idx + 1}`}
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
      {/* 3. SECTION 2: CORE UPLISTING INTEGRATION SOLUTIONS (INTERACTIVE TABS - 6 MODULES) */}
      {/* ========================================================================= */}
      <section id="core-capabilities" className="py-20 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5d53a3]/10 border border-[#5d53a3]/20 text-[#5d53a3] text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-[#5d53a3]" />
              <span>CORE PMS CAPABILITIES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              {data.coreSolutionsTitle || 'Core Uplisting Integration Solutions'}
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
                  <span>{currentModule.badge || 'UPLISTING MODULE'}</span>
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
                    onClick={() => openEstimateModal(`Uplisting - ${currentModule.title}`)}
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
                      UPLISTING_PIPELINE.json
                    </span>
                    <span className="text-emerald-400">200 OK</span>
                  </div>

                  <div className="space-y-1.5 text-slate-300 text-[11px]">
                    <div className="text-slate-500">// Cubixsol Uplisting Integration Gateway</div>
                    <div><span className="text-purple-400">"platform":</span> <span className="text-cyan-300">"Uplisting Cloud PMS"</span>,</div>
                    <div><span className="text-purple-400">"activeModule":</span> <span className="text-amber-300">"{currentModule.id}"</span>,</div>
                    <div><span className="text-purple-400">"status":</span> <span className="text-emerald-400">"PIPELINE_ACTIVE"</span>,</div>
                    <div><span className="text-purple-400">"latency":</span> <span className="text-emerald-400">"22ms"</span>,</div>
                    <div><span className="text-purple-400">"events":</span> <span className="text-slate-300">["reservation.synced", "message.sent", "pin.created"]</span></div>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                    <span>Target Engine: <strong className="text-white">Uplisting API</strong></span>
                    <span>Security: <strong className="text-cyan-300">OAuth 2.0 / SHA256</strong></span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SECTION 3: OUR UPLISTING INTEGRATION PROCESS (5 STEPS) */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-24 bg-slate-50/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/20 text-[#00a4d8] text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-[#00a4d8]" />
              <span>STRUCTURED PROCESS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              {data.serviceProcessTitle || 'Our Uplisting Integration Process'}
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
      {/* 5. SECTION 4: WHY CHOOSE CUBIXSOL FOR UPLISTING INTEGRATION */}
      {/* ========================================================================= */}
      <section className="py-20 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5d53a3]/10 border border-[#5d53a3]/20 text-[#5d53a3] text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-[#5d53a3]" />
              <span>THE CUBIXSOL ADVANTAGE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              {data.whyChooseTitle || 'Why Choose Cubixsol For Uplisting Integration?'}
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
              Answers to common questions about our custom Uplisting integration services.
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
        badge="UPLISTING INTEGRATION SPECIALISTS"
        title="Ready To Automate Your Rental Business With Uplisting?"
        description="Schedule a technical consultation to design custom API bridges, smart lock automations, guest communication, and multi-channel synchronization."
        primaryText="Schedule An Uplisting Consultation"
        secondaryText="Explore All PMS Integrations"
      />

    </div>
  );
}
