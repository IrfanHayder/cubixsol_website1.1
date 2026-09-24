import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Calendar, Building2, ShieldCheck, Cpu, ArrowRight, CheckCircle2,
  ChevronRight, TrendingUp, Sparkles, Database, MessageSquare,
  Mail, Layers, PhoneCall, ExternalLink, RefreshCw, BarChart3,
  HelpCircle, Star, Sliders, Workflow, Settings, Smartphone,
  Award, Target, Rocket, Globe, CreditCard, Share2, Terminal,
  Code2, Check, PieChart, GitBranch, Server, Lock, Unlock,
  DoorClosed, Key, Bell, Wifi, ArrowUpRight, Zap, Play,
  CheckCircle, ChevronDown, Laptop, Shield, Radio, Users, CheckSquare,
  DollarSign, FileCheck, Receipt, Landmark, RefreshCcw
} from 'lucide-react';
import { useEstimateModal } from '../context/EstimateModalContext';
import { apiFetch } from '../utils/api';
import { formatInline } from '../utils/formatText';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';
import CtaBanner from '../components/CtaBanner';
import DynamicIcon from '../components/DynamicIcon';
import { useSEO } from '../utils/seo';

// Default static data matching document for instant 0ms render
const DEFAULT_DATA = {
  slug: 'smoobu-integration',
  title: 'Smoobu Integration Services',
  heroEyebrow: 'SMOOBU INTEGRATION SERVICES',
  heroTitle: 'Smoobu Integration Solutions For Vacation Rental Automation',
  heroDesc: 'Cubixsol enhances Smoobu functionality through custom integrations that support your specific operational goals. Our developers create customised integrations that improve booking management, automate repetitive tasks, and establish smooth communication between different business tools.',
  heroPrimaryBtnText: 'Schedule A Smoobu Consultation',
  heroSecondaryBtnText: 'Explore Solutions',
  heroBadges: [
    '2-Way Real-Time Channel Synchronisation',
    'Deep Airbnb & Booking.com API Pipelines',
    'Automated Keyless Smart Lock Workflows',
    'Custom CRM, Payment & Multi-Channel Connectors'
  ],
  heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&h=800&q=80',

  // Section 1: Integrate Smoobu Across Your Business Ecosystem
  subServicesTitle: 'Integrate Smoobu Across Your Business Ecosystem',
  subServicesIntro: 'Our integration services create a connected ecosystem where different platforms exchange information accurately and efficiently. We develop Smoobu integrations that connect your PMS with different software solutions, including:',
  subServicesItems: [
    {
      icon: 'Share2',
      tag: 'CHANNELS & OTAs',
      title: 'Rental Marketplaces & OTAs',
      desc: 'Airbnb, Booking.com, Vrbo, and other rental marketplaces with sub-second rate synchronization, unified booking logs, and instant calendar blockouts.',
      pills: ['Airbnb XML Sync', 'Booking.com API', 'Vrbo Instant Sync', 'Expedia Partner'],
      colorTheme: 'cyan'
    },
    {
      icon: 'Globe',
      tag: 'DIRECT ENGINE',
      title: 'Direct Booking Websites',
      desc: 'Custom-designed direct booking portals and booking engine widgets with embedded live Smoobu availability calendars and instant guest checkout.',
      pills: ['Custom Booking Engine', 'Zero Double Bookings', 'Live Availability Calendar'],
      colorTheme: 'purple'
    },
    {
      icon: 'CreditCard',
      tag: 'PAYMENTS & BILLING',
      title: 'Payment Processing Platforms',
      desc: 'Secure payment integrations with Stripe, PayPal, and regional gateways for automated guest deposits, security bonds, and recurring stay invoices.',
      pills: ['Stripe 3D Secure', 'Automated Deposit Holds', 'Multi-Currency Checkout'],
      colorTheme: 'cyan'
    },
    {
      icon: 'Users',
      tag: 'CRM & MARKETING',
      title: 'CRM & Marketing Systems',
      desc: 'Centralized guest relationship management tools, automated email campaigns, and customer retention workflows synced directly from stay histories.',
      pills: ['Guest Database Sync', 'Mailchimp / HubSpot', 'Automated Review Triggers'],
      colorTheme: 'purple'
    },
    {
      icon: 'Key',
      tag: 'SMART ACCESS',
      title: 'Smart Lock & Access Control Solutions',
      desc: 'Contactless check-in integrations with Nuki, August, Yale, and TTLock that auto-generate and SMS PIN codes synchronized with check-in/out hours.',
      pills: ['Nuki / August / Yale', 'Automated PIN Dispatch', 'Timed Guest Revocation'],
      colorTheme: 'cyan'
    },
    {
      icon: 'Receipt',
      tag: 'ACCOUNTING & REPORTING',
      title: 'Accounting & Reporting Applications',
      desc: 'Automated financial data pipelines connecting Smoobu with QuickBooks, Xero, and custom reporting BI dashboards for accurate tax and revenue tracking.',
      pills: ['QuickBooks / Xero Sync', 'Owner Payout Reports', 'Automated VAT / Tax Invoices'],
      colorTheme: 'purple'
    },
    {
      icon: 'MessageSquare',
      tag: 'COMMUNICATION',
      title: 'Communication Automation Tools',
      desc: 'Automated multi-channel messaging via WhatsApp, SMS, and email for pre-arrival forms, Wi-Fi guides, directions, and instant guest support.',
      pills: ['WhatsApp Business API', 'Twilio SMS Triggers', 'Automated Digital Guidebooks'],
      colorTheme: 'cyan'
    }
  ],

  // Core 5 Solutions
  coreSolutionsTitle: 'Comprehensive Smoobu Integration Capabilities',
  coreSolutionsIntro: 'Explore our specialized engineering modules designed to transform Smoobu into an automated, scalable hospitality platform.',
  coreSolutions: [
    {
      id: 'channel-manager',
      title: 'Smoobu Channel Manager Integration Services',
      subtitle: 'Unified Multi-Channel Synchronisation Across Global OTAs',
      desc: 'Managing several booking channels requires accurate synchronisation of reservations, availability, and pricing information. We connect Smoobu with multiple sales channels to maintain consistent rental data. Our channel integration solutions support:',
      icon: 'Layers',
      badge: 'CHANNEL MANAGER',
      features: [
        'Real-time reservation updates across all connected channels',
        'High-speed calendar synchronisation preventing overbookings',
        'Listing information and amenities management from one place',
        'Accurate guest data transfer and communication pipeline',
        'Automated availability coordination and minimum stay rules'
      ]
    },
    {
      id: 'api-development',
      title: 'Smoobu API Integration Services',
      subtitle: 'Custom Software & Webhook Pipelines via Smoobu Open API',
      desc: 'Our team provides custom Smoobu API integration solutions for businesses that require advanced connectivity between their PMS and external applications. Our developers build secure API connections that allow systems to communicate and exchange information. Our Smoobu API services include:',
      icon: 'Code2',
      badge: 'OPEN API ARCHITECTURE',
      features: [
        'Custom software integrations with legacy and cloud enterprise apps',
        'Third-party application connections via RESTful API & Webhooks',
        'Automated workflow development triggered by real-time booking events',
        'Bidirectional data synchronisation across property databases',
        'Comprehensive API configuration, load testing, and continuous maintenance'
      ]
    },
    {
      id: 'airbnb-integration',
      title: 'Smoobu Airbnb Integration Solutions',
      subtitle: 'Deep Synchronisation for Peak Vacation Rental Performance',
      desc: 'Airbnb is one of the most important platforms for vacation rental businesses. Cubixsol develops Smoobu Airbnb integration solutions that improve synchronisation between rental listings and management systems. Our services support:',
      icon: 'Share2',
      badge: 'AIRBNB SPECIALIZATION',
      features: [
        'Instant booking information and reservation status synchronisation',
        'Automated guest profile updates and ID verification checks',
        'Dynamic availability management and rate tier synchronisation',
        'Multi-calendar coordination across individual rooms or entire homes',
        'Automated property data updates, house rules, and check-in instructions'
      ]
    },
    {
      id: 'smart-lock',
      title: 'Smoobu Smart Lock & Automation Integration',
      subtitle: 'Keyless Guest Entry & IoT Property Automation',
      desc: 'Automated property access has become an important part of modern rental management. Cubixsol connects Smoobu with smart lock systems and automation tools to simplify guest entry processes. Our smart automation solutions include:',
      icon: 'Key',
      badge: 'SMART LOCK & IOT',
      features: [
        'Automated digital access code creation customized per booking',
        'Seamless self-check-in workflows with ID verification',
        'Smart device connectivity (thermostats, noise sensors, lights)',
        'Instant guest arrival and door-unlock notifications for hosts',
        'Remote property access control and staff maintenance access pass'
      ]
    },
    {
      id: 'crm-payment',
      title: 'Smoobu CRM & Payment Integration',
      subtitle: 'Organised Guest Relations, Automated Billing & Financial Insights',
      desc: 'Customer relationships and financial operations require organised systems. Cubixsol integrates Smoobu with CRM platforms, payment gateways, and business applications to improve management efficiency. Our solutions can connect Smoobu with:',
      icon: 'CreditCard',
      badge: 'CRM & PAYMENTS',
      features: [
        'CRM software for centralized guest relationship and history management',
        'Secure payment systems for automated booking and security deposit processing',
        'Email & SMS marketing tools for automated post-stay rebooking campaigns',
        'Accounting platforms for financial tracking, payouts, and bookkeeping',
        'Custom reporting systems for revenue analytics, ADR, and RevPAR business insights'
      ]
    }
  ],

  // 5 Step Process
  processTitle: 'Our Smoobu Integration Process',
  processIntro: 'Cubixsol follows a structured approach to develop successful Smoobu integrations:',
  processSteps: [
    {
      step: '01',
      title: 'Requirement Analysis',
      desc: 'Our team understands your business workflow, current tools, and integration objectives to map all required data flows.',
      badge: 'DISCOVERY'
    },
    {
      step: '02',
      title: 'Technical Planning',
      desc: 'We create an integration strategy based on your system requirements, API specifications, and security protocols.',
      badge: 'ARCHITECTURE'
    },
    {
      step: '03',
      title: 'Development And Setup',
      desc: 'Our developers build and configure the required connections, webhooks, middleware, and custom UI components.',
      badge: 'ENGINEERING'
    },
    {
      step: '04',
      title: 'Testing And Optimization',
      desc: 'We check data accuracy, performance, failover scenarios, and system reliability across all booking channels.',
      badge: 'QUALITY QA'
    },
    {
      step: '05',
      title: 'Deployment And Support',
      desc: 'We provide assistance after implementation to maintain smooth operations, monitoring, and ongoing updates.',
      badge: 'GO LIVE'
    }
  ],

  // Why Choose Cubixsol
  whyChooseTitle: 'Why Choose Cubixsol For Smoobu Integration?',
  whyChooseIntro: 'Cubixsol delivers custom PMS integration solutions. Our developers build secure and flexible integrations that simplify property management and improve workflow automation. Our Smoobu expertise covers Airbnb integration, API development, smart lock connectivity, payment gateways, and custom workflow automation. We build each solution around your business processes, technical setup, and growth goals.',
  whyChooseItems: [
    {
      title: 'Proven PMS & Channel Expertise',
      desc: 'Extensive hands-on experience integrating Smoobu with leading OTAs, direct booking engines, and hardware locks.',
      icon: 'Award'
    },
    {
      title: 'Zero Double-Booking Guarantee',
      desc: 'High-speed event-driven Webhook pipelines that synchronize calendars in real time across 200+ booking channels.',
      icon: 'ShieldCheck'
    },
    {
      title: 'Tailored Custom Integrations',
      desc: 'We engineer bespoke middleware and custom API bridges tailored specifically to your exact property workflows.',
      icon: 'Cpu'
    },
    {
      title: 'End-to-End Keyless Automation',
      desc: 'Frictionless guest check-ins with automated PIN code creation and synchronization with leading smart lock providers.',
      icon: 'Key'
    },
    {
      title: 'Enterprise Financial & CRM Sync',
      desc: 'Direct synchronization with Stripe, Xero, QuickBooks, and CRM platforms for automated billing and guest marketing.',
      icon: 'TrendingUp'
    },
    {
      title: 'Dedicated Engineering & Support',
      desc: 'Continuous monitoring, API version updates, and 24/7 technical support to keep your operations running smoothly.',
      icon: 'Sparkles'
    }
  ],

  // FAQs
  faqs: [
    {
      q: 'What Smoobu integration services does Cubixsol provide?',
      a: 'Cubixsol develops Smoobu integrations with booking platforms, payment solutions, CRM systems, smart devices, and other business applications to automate your entire vacation rental operations.'
    },
    {
      q: 'Can Smoobu integrate with Airbnb and other OTAs?',
      a: 'Yes, Smoobu supports connections with major booking channels (Airbnb, Booking.com, Vrbo, Expedia), and Cubixsol can help create customized 2-way integration workflows for real-time rates and availability.'
    },
    {
      q: 'Does Cubixsol offer Smoobu API integration?',
      a: 'Yes, our developers build API-based solutions that connect Smoobu with external software and business systems using the official Smoobu REST API and Webhooks.'
    },
    {
      q: 'Can Smoobu connect with smart lock systems?',
      a: 'Yes, Smoobu can work with smart access solutions (such as Nuki, August, Yale, TTLock, and RemoteLock) to support automated check-in and property access management.'
    },
    {
      q: 'How does Smoobu integration benefit vacation rental owners?',
      a: 'Smoobu integration reduces manual tasks, eliminates double-bookings, improves calendar synchronization, and helps property managers operate their rentals more efficiently while scaling their portfolio.'
    }
  ],

  seoTitle: 'Smoobu Integration Services | Vacation Rental PMS Automation | Cubixsol',
  seoDescription: 'Expert Smoobu integration services by Cubixsol. Connect Smoobu with Airbnb, Booking.com, smart locks, payment gateways, and custom APIs for automated property management.',
  seoKeywords: 'Smoobu integration, Smoobu API, Smoobu Airbnb integration, Smoobu channel manager, PMS integration, vacation rental automation, Cubixsol'
};

export default function SmoobuIntegration() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [activeTab, setActiveTab] = useState('channel-manager');
  const [openFaq, setOpenFaq] = useState(null);
  const [simActiveOta, setSimActiveOta] = useState('Airbnb');
  const [simSyncStatus, setSimSyncStatus] = useState('Synchronized');
  const [simLockStatus, setSimLockStatus] = useState('Secured');
  const [simPin, setSimPin] = useState('849204');
  const [copiedCode, setCopiedCode] = useState(false);
  const { openModal } = useEstimateModal();

  useSEO(data?.seo, {
    title: data.seoTitle || 'Smoobu Integration Services | Cubixsol',
    description: data.seoDescription || 'Expert Smoobu PMS integration services.',
    keywords: data.seoKeywords || 'Smoobu integration, PMS integration, Cubixsol',
    canonicalUrl: 'https://cubixsol.com/smoobu-integration'
  });

  useEffect(() => {
    let isMounted = true;
    apiFetch('services/smoobu-integration')
      .then((res) => {
        if (isMounted && res && res.title) {
          setData((prev) => ({
            ...prev,
            ...res,
            seo: res.seo || prev.seo,
          }));
        }
      })
      .catch((err) => {
        console.log('Using default Smoobu integration dataset:', err.message);
      });
    return () => {
      isMounted = false;
    };
  }, []);


  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const currentSolution =
    data.coreSolutions?.find((s) => s.id === activeTab) ||
    data.coreSolutions?.[0] ||
    DEFAULT_DATA.coreSolutions[0];

  const handleSimulateSync = (otaName) => {
    setSimActiveOta(otaName);
    setSimSyncStatus('Syncing...');
    setTimeout(() => {
      setSimSyncStatus('Synchronized • 0ms Delay');
    }, 600);
  };

  const handleGeneratePin = () => {
    const randomPin = Math.floor(100000 + Math.random() * 900000).toString();
    setSimPin(randomPin);
    setSimLockStatus('Generated & Dispatched via SMS');
    setTimeout(() => {
      setSimLockStatus('Active for Stay (Check-in 15:00)');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-white text-ink selection:bg-[#00a4d8]/20 selection:text-[#5d53a3]">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-36 lg:pb-28 bg-gradient-to-b from-[#1a1a2e] via-[#16162a] to-[#121224] text-white overflow-hidden">
        {/* Abstract Glow and Grid Mesh */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00a4d8] rounded-full blur-[140px]" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#5d53a3] rounded-full blur-[140px]" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)`,
              backgroundSize: '32px 32px'
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold tracking-widest uppercase text-[#00a4d8]">
                <span className="w-2 h-2 rounded-full bg-[#00a4d8] animate-pulse" />
                {data.heroEyebrow || 'SMOOBU INTEGRATION SERVICES'}
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-white">
                {data.heroTitle}
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                {data.heroDesc}
              </p>

              {/* Hero Badges */}
              {data.heroBadges && data.heroBadges.length > 0 && (
                <div className="grid sm:grid-cols-2 gap-2.5 pt-2">
                  {data.heroBadges.map((badge, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-slate-200 bg-white/5 border border-white/10 rounded-xl px-3 py-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#00a4d8] shrink-0" />
                      <span>{badge}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={openModal}
                  className="btn-primary"
                >
                  <span>{data.heroPrimaryBtnText || 'Schedule A Smoobu Consultation'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#ecosystem"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-sm transition border border-white/20 shadow-sm"
                >
                  <span>{data.heroSecondaryBtnText || 'Explore Solutions'}</span>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </a>
              </div>
            </div>

            {/* Right Interactive Architecture Hero Console */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-white/[0.04] backdrop-blur-xl border border-white/15 p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden">
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400/80" />
                    <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
                    <span className="w-3 h-3 rounded-full bg-green-400/80" />
                    <span className="text-[11px] font-mono text-slate-400 ml-2">smoobu_sync_engine.v2</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#00a4d8]/20 text-[#00a4d8] border border-[#00a4d8]/40">
                    LIVE PIPELINE
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Central Node Visualizer */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-400">PMS Core Engine</span>
                      <span className="text-[#00a4d8] flex items-center gap-1">
                        <Radio className="w-3 h-3 animate-ping" />
                        Smoobu REST API v2
                      </span>
                    </div>

                    {/* Sync Progress Bar */}
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#00a4d8] to-[#5d53a3]"
                        animate={{ width: ['20%', '100%', '20%'] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                      <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                        <p className="text-[10px] text-slate-400">Sync Latency</p>
                        <p className="text-xs font-bold text-white font-mono">&lt; 0.8s</p>
                      </div>
                      <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                        <p className="text-[10px] text-slate-400">OTA Channels</p>
                        <p className="text-xs font-bold text-white font-mono">200+ Active</p>
                      </div>
                      <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                        <p className="text-[10px] text-slate-400">Double Bookings</p>
                        <p className="text-xs font-bold text-emerald-400 font-mono">0.00%</p>
                      </div>
                    </div>
                  </div>

                  {/* Connected Integrations Pills */}
                  <div className="space-y-2">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Connected Live Endpoints
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-200">
                        <Share2 className="w-4 h-4 text-[#00a4d8]" />
                        <span>Airbnb XML 2-Way</span>
                      </div>
                      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-200">
                        <Globe className="w-4 h-4 text-[#5d53a3]" />
                        <span>Booking.com API</span>
                      </div>
                      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-200">
                        <Key className="w-4 h-4 text-[#00a4d8]" />
                        <span>Smart Lock Webhook</span>
                      </div>
                      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-200">
                        <CreditCard className="w-4 h-4 text-[#5d53a3]" />
                        <span>Stripe & Xero Sync</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Trust Note */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    PCI-DSS Compliant & ISO 27001
                  </span>
                  <span className="font-mono text-[#00a4d8]">Status: 200 OK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION 1: INTEGRATE SMOOBU ACROSS YOUR BUSINESS ECOSYSTEM */}
      <section id="ecosystem" className="py-20 lg:py-28 bg-slate-50/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00a4d8]/10 text-[#00a4d8] text-xs font-bold tracking-widest uppercase">
              <Workflow className="w-3.5 h-3.5" />
              INTEGRATION ECOSYSTEM
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1a2e] tracking-tight">
              {data.subServicesTitle}
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              {data.subServicesIntro}
            </p>
          </div>

          {/* 7 Interactive Ecosystem Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {data.subServicesItems?.map((item, idx) => {
              const isPurple = item.colorTheme === 'purple' || idx % 2 === 1;
              return (
                <div
                  key={idx}
                  className="group bg-white rounded-2xl p-7 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-10px_rgba(0,164,216,0.12)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Header with Icon and Tag */}
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          isPurple
                            ? 'bg-[#5d53a3]/10 text-[#5d53a3] group-hover:bg-[#5d53a3] group-hover:text-white'
                            : 'bg-[#00a4d8]/10 text-[#00a4d8] group-hover:bg-[#00a4d8] group-hover:text-white'
                        } transition-colors duration-300`}
                      >
                        <DynamicIcon name={item.icon} className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-extrabold tracking-wider px-2.5 py-1 rounded-md uppercase bg-slate-100 text-gray-600">
                        {item.tag}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-[#1a1a2e] group-hover:text-[#00a4d8] transition-colors">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Pills */}
                  {item.pills && item.pills.length > 0 && (
                    <div className="mt-6 pt-4 border-t border-gray-100 flex flex-wrap gap-1.5">
                      {item.pills.map((pill, pIdx) => (
                        <span
                          key={pIdx}
                          className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-slate-50 text-slate-700 border border-slate-200/60"
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

      {/* 3. INTERACTIVE FEATURE STUDIO (5 CORE CAPABILITIES WITH LIVE SIMULATOR) */}
      <section className="py-20 lg:py-28 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5d53a3]/10 text-[#5d53a3] text-xs font-bold tracking-widest uppercase">
              <Code2 className="w-3.5 h-3.5" />
              SPECIALIZED CAPABILITIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1a2e] tracking-tight">
              {data.coreSolutionsTitle}
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              {data.coreSolutionsIntro}
            </p>
          </div>

          {/* Interactive Tabs Header */}
          <div className="flex items-center justify-center overflow-x-auto pb-4 gap-2 sm:gap-3 no-scrollbar mb-10">
            {data.coreSolutions?.map((sol) => {
              const active = activeTab === sol.id;
              return (
                <button
                  key={sol.id}
                  onClick={() => setActiveTab(sol.id)}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all whitespace-nowrap flex items-center gap-2 ${
                    active
                      ? 'bg-gradient-to-r from-[#00a4d8] to-[#5d53a3] text-white shadow-md shadow-[#00a4d8]/20 scale-105'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <DynamicIcon name={sol.icon} className="w-4 h-4" />
                  <span>{sol.badge || sol.title}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Box */}
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-10 border border-gray-200/80 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.06)]">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Details */}
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#00a4d8]/10 text-[#00a4d8] text-xs font-black uppercase">
                  {currentSolution.badge}
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1a1a2e] leading-snug">
                  {currentSolution.title}
                </h3>

                <p className="text-xs sm:text-sm font-semibold text-[#5d53a3]">
                  {currentSolution.subtitle}
                </p>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {currentSolution.desc}
                </p>

                {/* Feature Bullet List */}
                {currentSolution.features && currentSolution.features.length > 0 && (
                  <div className="space-y-2.5 pt-2">
                    {currentSolution.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-[#00a4d8]/15 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 text-[#00a4d8]" />
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-slate-700">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={openModal}
                    className="btn-primary inline-flex items-center gap-2 text-xs sm:text-sm"
                  >
                    <span>Request Custom Smoobu Module</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Live Interactive Simulator */}
              <div className="lg:col-span-6">
                <div className="bg-slate-900 rounded-2xl p-6 text-white border border-slate-800 shadow-2xl space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono">
                    <span className="text-slate-400 flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-[#00a4d8]" />
                      interactive_smoobu_studio
                    </span>
                    <span className="text-emerald-400 font-bold">STATE: ONLINE</span>
                  </div>

                  {activeTab === 'channel-manager' && (
                    <div className="space-y-4">
                      <p className="text-xs text-slate-300">
                        Simulate real-time multi-channel calendar sync:
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {['Airbnb', 'Booking.com', 'Vrbo'].map((ota) => (
                          <button
                            key={ota}
                            onClick={() => handleSimulateSync(ota)}
                            className={`p-2.5 rounded-xl text-xs font-bold border transition text-center ${
                              simActiveOta === ota
                                ? 'bg-[#00a4d8] text-white border-[#00a4d8]'
                                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                            }`}
                          >
                            Sync {ota}
                          </button>
                        ))}
                      </div>

                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
                        <div className="flex justify-between text-slate-400">
                          <span>Target Channel:</span>
                          <span className="text-[#00a4d8]">{simActiveOta}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Webhook Response:</span>
                          <span className="text-emerald-400 font-bold">{simSyncStatus}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Rate Consistency:</span>
                          <span className="text-white">100% Guaranteed</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'api-development' && (
                    <div className="space-y-3">
                      <p className="text-xs text-slate-300 font-mono">
                        Smoobu REST API v2 Payload Preview:
                      </p>
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-[#00a4d8] overflow-x-auto">
                        <pre>{`POST /api/v2/rates/synchronize
{
  "apartmentId": 84920,
  "dateFrom": "2026-10-01",
  "dateTo": "2026-10-07",
  "price": 245.00,
  "currency": "EUR",
  "minStay": 2,
  "channels": ["airbnb", "booking", "vrbo"]
}`}</pre>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        ⚡ Webhook payload processed in 42ms via Cubixsol API Gateway.
                      </p>
                    </div>
                  )}

                  {activeTab === 'airbnb-integration' && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-300 font-bold">Airbnb Instant Booking Sync</span>
                          <span className="text-emerald-400 font-mono">2-Way Connected</span>
                        </div>
                        <div className="space-y-2 text-xs text-slate-400">
                          <p className="flex items-center justify-between">
                            <span>Calendar Availability:</span>
                            <span className="text-white font-mono">Auto-Block Synced</span>
                          </p>
                          <p className="flex items-center justify-between">
                            <span>Guest Pre-Arrival Form:</span>
                            <span className="text-white font-mono">Dispatched</span>
                          </p>
                          <p className="flex items-center justify-between">
                            <span>Cleaning Task Generation:</span>
                            <span className="text-[#00a4d8] font-mono">Automated</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'smart-lock' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-300 font-mono">Nuki / Yale / TTLock Simulator:</span>
                        <button
                          onClick={handleGeneratePin}
                          className="px-3 py-1 rounded bg-[#00a4d8] text-white text-xs font-bold hover:bg-[#00a4d8]/90 transition"
                        >
                          Generate PIN
                        </button>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 font-mono text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Generated Guest PIN:</span>
                          <span className="text-xl font-bold text-amber-400 tracking-widest">{simPin}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Lock Status:</span>
                          <span className="text-emerald-400">{simLockStatus}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Access Window:</span>
                          <span className="text-white">Check-in 15:00 → Checkout 11:00</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'crm-payment' && (
                    <div className="space-y-3 font-mono text-xs">
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                        <div className="flex justify-between text-slate-300 font-bold">
                          <span>Stripe & Xero Live Pipeline</span>
                          <span className="text-emerald-400">Auto-Reconciliation</span>
                        </div>
                        <div className="pt-2 border-t border-slate-800 space-y-1.5 text-slate-400 text-[11px]">
                          <div className="flex justify-between">
                            <span>Guest Stay Total:</span>
                            <span className="text-white">€1,470.00</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Security Deposit Auth:</span>
                            <span className="text-white">€300.00 (Held)</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Xero Invoice #8921:</span>
                            <span className="text-[#00a4d8]">Matched & Closed</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR SMOOBU INTEGRATION PROCESS (5 STEPS) */}
      <section className="py-20 lg:py-28 bg-slate-50/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00a4d8]/10 text-[#00a4d8] text-xs font-bold tracking-widest uppercase">
              <Layers className="w-3.5 h-3.5" />
              EXECUTION ROADMAP
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1a2e] tracking-tight">
              {data.processTitle}
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              {data.processIntro}
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {data.processSteps?.map((step, idx) => (
              <div
                key={idx}
                className="relative bg-white rounded-2xl p-6 border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_30px_-8px_rgba(0,164,216,0.15)] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-[#00a4d8] font-mono group-hover:scale-110 transition-transform">
                      {step.step}
                    </span>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-slate-100 text-gray-600 uppercase">
                      {step.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#1a1a2e] mb-2 group-hover:text-[#00a4d8] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-[#5d53a3]">
                  <span>Step {idx + 1} of 5</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-1 group-hover:text-[#00a4d8] transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE CUBIXSOL FOR SMOOBU INTEGRATION */}
      <section className="py-20 lg:py-28 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5d53a3]/10 text-[#5d53a3] text-xs font-bold tracking-widest uppercase">
              <Award className="w-3.5 h-3.5" />
              ENTERPRISE ADVANTAGE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1a2e] tracking-tight">
              {data.whyChooseTitle}
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              {data.whyChooseIntro}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {data.whyChooseItems?.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50/80 rounded-2xl p-7 border border-gray-200/80 hover:bg-white hover:border-[#00a4d8]/40 hover:shadow-[0_20px_40px_-15px_rgba(0,164,216,0.12)] transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00a4d8]/15 to-[#5d53a3]/15 text-[#00a4d8] group-hover:from-[#00a4d8] group-hover:to-[#5d53a3] group-hover:text-white flex items-center justify-center transition-all duration-300">
                    <DynamicIcon name={item.icon || 'Check'} className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1a1a2e] group-hover:text-[#00a4d8] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FREQUENTLY ASKED QUESTIONS */}
      <section className="py-20 lg:py-28 bg-slate-50/70 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00a4d8]/10 text-[#00a4d8] text-xs font-bold tracking-widest uppercase">
              <HelpCircle className="w-3.5 h-3.5" />
              GOT QUESTIONS?
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1a2e] tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {data.faqs?.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden transition shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-[#1a1a2e] hover:text-[#00a4d8] transition"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#00a4d8]' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-5 pt-1 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-100">
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

      {/* 7. CTA BANNER */}
      <CtaBanner
        eyebrow="READY TO AUTOMATE YOUR SMOOBU PMS?"
        title="Connect Smoobu With Your Entire Vacation Rental Tech Stack"
        description="Speak with our PMS integration architects to discuss real-time OTA synchronization, custom open API connections, and automated smart lock workflows."
        primaryButtonText="Schedule Your Smoobu Consultation"
        primaryButtonLink="/contact"
        secondaryButtonText="Explore All PMS Solutions"
        secondaryButtonLink="/pms-integration"
      />
    </div>
  );
}
