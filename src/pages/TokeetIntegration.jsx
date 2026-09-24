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

// Default static fallback data matching the document provided for Tokeet Integration Services
const DEFAULT_DATA = {
  slug: 'tokeet-integration',
  title: 'Tokeet Integration Services',
  heroEyebrow: 'TOKEET INTEGRATION SERVICES',
  heroTitle: 'Custom Tokeet Integration Solutions For Vacation Rental Management',
  heroDesc: 'Tokeet is a cloud-based property management system designed for vacation rental owners, hosts, and property managers. Our professional Tokeet integration services help vacation rental businesses connect their property management platform with advanced software solutions. We enhance Tokeet capabilities through custom integrations that connect essential business tools and create smoother operational workflows.',
  heroPrimaryBtnText: 'Schedule A Tokeet Consultation',
  heroSecondaryBtnText: 'Explore Tokeet Solutions',
  heroBadges: [
    'Multi-Channel OTA Availability & Rate Synchronization',
    'Custom Tokeet API Engineering & Webhook Pipelines',
    'Direct Booking Engine & Custom Storefront Connections',
    'Keyless Smart Lock Access Code Creation Automation',
    'Payment Gateway, CRM & Automated Guest Messaging'
  ],
  heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&h=800&q=80',

  // Section 1: Optimise Business Operations With Tokeet Integrations
  subServicesTitle: 'Optimise Business Operations With Tokeet Integrations',
  subServicesIntro: 'Managing vacation rentals requires coordination between multiple platforms. Our integration services create a connected technology environment where your systems share data accurately and improve overall productivity. We connect your PMS with important business applications, including:',
  subServicesItems: [
    {
      icon: 'Share2',
      tag: 'RENTAL CHANNELS',
      title: 'Airbnb, Booking.com, Vrbo, and other rental channels',
      desc: 'Keep calendars, pricing rates, restrictions, and instant bookings synchronized in real time across global rental channels without double bookings.',
      pills: ['Airbnb 2-Way Sync', 'Booking.com Rates', 'Vrbo Real-Time Bridge'],
      colorTheme: 'cyan'
    },
    {
      icon: 'Globe',
      tag: 'DIRECT BOOKINGS',
      title: 'Direct booking websites',
      desc: 'Connect custom booking platforms and direct websites with Tokeet to capture zero-commission direct bookings with live instant confirmations.',
      pills: ['Direct Engine Bridge', 'Commission-Free Flow', 'Live Availability'],
      colorTheme: 'blue'
    },
    {
      icon: 'CreditCard',
      tag: 'PAYMENT GATEWAYS',
      title: 'Payment gateways',
      desc: 'Integrate Stripe, PayPal, Authorize.Net, and merchant gateways to automate payment processing, damage deposit authorizations, and split settlements.',
      pills: ['Stripe & Merchant Pay', 'Security Deposit Holds', 'Card Tokenization'],
      colorTheme: 'cyan'
    },
    {
      icon: 'Users',
      tag: 'CRM PLATFORMS',
      title: 'CRM platforms',
      desc: 'Bridge Tokeet guest records with HubSpot, Salesforce, and CRM suites to centralize contact histories, guest preferences, and VIP loyalty profiles.',
      pills: ['HubSpot / Salesforce', 'Guest History Sync', 'Loyalty Tracking'],
      colorTheme: 'blue'
    },
    {
      icon: 'PieChart',
      tag: 'FINANCIAL LEDGERS',
      title: 'Accounting software',
      desc: 'Synchronise booking revenue, occupancy taxes, cleaning fees, and owner disbursements with QuickBooks, Xero, or custom financial systems.',
      pills: ['QuickBooks & Xero', 'Tax Splitting', 'Owner Statement Reports'],
      colorTheme: 'cyan'
    },
    {
      icon: 'KeyRound',
      tag: 'SMART LOCK ACCESS',
      title: 'Smart lock systems',
      desc: 'Connect digital access systems (Yale, Schlage, August, RemoteLock) to auto-generate time-bounded guest door PINs upon confirmed booking.',
      pills: ['Automated PIN Codes', 'RemoteLock / Yale', 'Contactless Guest Entry'],
      colorTheme: 'blue'
    },
    {
      icon: 'MessageSquare',
      tag: 'MARKETING AUTOMATION',
      title: 'Marketing automation tools',
      desc: 'Automate post-stay review requests, pre-arrival welcome guides, upsell email sequences, and SMS alerts via Klaviyo, Mailchimp, or Twilio.',
      pills: ['Guest SMS Workflows', 'Review Generation', 'Upsell Sequences'],
      colorTheme: 'cyan'
    },
    {
      icon: 'BarChart3',
      tag: 'ANALYTICS & BI',
      title: 'Reporting and analytics solutions',
      desc: 'Connect business intelligence tools and analytics suites to track RevPAR, ADR, multi-unit occupancy rates, and channel profitability.',
      pills: ['BI Dashboards', 'RevPAR & ADR Analytics', 'Multi-Unit Metrics'],
      colorTheme: 'blue'
    }
  ],

  // Section 2: Core Specialized Modules (5 Modules from Document)
  coreSolutionsTitle: 'Specialised Tokeet Integration Capabilities',
  coreSolutionsIntro: 'Our specialized integration modules bridge Tokeet with every operational touchpoint of your vacation rental management workflow.',
  coreSolutions: [
    {
      id: 'channel-management',
      title: 'Tokeet Channel Management Integration Services',
      subtitle: 'Accurate Multi-Channel Synchronisation & Listing Control',
      desc: 'Our specialists help businesses integrate Tokeet with booking platforms to maintain accurate availability, reservations, and property information. A properly connected channel system controls multiple listings more effectively. Our channel integration solutions include:',
      icon: 'Share2',
      badge: 'CHANNEL MANAGEMENT',
      features: [
        'Calendar synchronisation.',
        'Reservation updates.',
        'Listing information management.',
        'Guest data transfer.',
        'Automated booking workflows.'
      ]
    },
    {
      id: 'api-development',
      title: 'Tokeet API Integration Development',
      subtitle: 'Custom Scalable API Architecture & Webhook Connections',
      desc: 'We offer custom Tokeet API integration services to connect external applications with your property management platform. Our developers create secure and scalable API solutions based on your operational needs. Our Tokeet API services include:',
      icon: 'Terminal',
      badge: 'API DEVELOPMENT',
      features: [
        'Custom API development.',
        'Third-party application integration.',
        'Data synchronisation.',
        'Workflow automation.',
        'API testing and maintenance.'
      ]
    },
    {
      id: 'direct-booking',
      title: 'Tokeet Direct Booking Integration',
      subtitle: 'Direct Storefront Connections & Commission-Free Reservations',
      desc: 'Direct booking solutions allow property businesses to increase customer relationships and reduce dependency on external marketplaces. We help connect Tokeet with direct booking platforms for a smoother reservation experience. Our direct booking integration services support:',
      icon: 'Globe',
      badge: 'DIRECT BOOKINGS',
      features: [
        'Website booking connections.',
        'Automated reservation processing.',
        'Availability synchronisation.',
        'Guest information management.',
        'Online payment workflows.'
      ]
    },
    {
      id: 'smart-locks',
      title: 'Tokeet Smart Lock Integration',
      subtitle: 'Keyless Access, Self-Check-in & Automated Code Creation',
      desc: 'Smart access solutions improve guest convenience and simplify property management. Cubixsol connects Tokeet with smart lock systems to support automated access and self-check-in experiences. Our solutions help property managers reduce manual coordination and improve guest satisfaction. Our smart lock integration solutions include:',
      icon: 'KeyRound',
      badge: 'SMART LOCK ACCESS',
      features: [
        'Digital key management.',
        'Automated access code creation.',
        'Guest entry scheduling.',
        'Remote property access.',
        'Smart device connectivity.'
      ]
    },
    {
      id: 'payment-crm',
      title: 'Tokeet Payment And CRM Integration',
      subtitle: 'Automated Billing, CRM Database & Communication Workflows',
      desc: 'Efficient financial management and guest communication require connected business systems. Cubixsol integrates Tokeet with payment platforms and CRM solutions to streamline operations. Our integration services include:',
      icon: 'CreditCard',
      badge: 'PAYMENT & CRM',
      features: [
        'Payment gateway connections.',
        'Transaction synchronisation.',
        'Guest database management.',
        'Customer communication automation.',
        'Accounting software integration.'
      ]
    }
  ],

  // Section 3: Our Tokeet Integration Process
  serviceProcessTitle: 'Our Tokeet Integration Process',
  serviceProcessIntro: 'We follow a professional process to deliver successful Tokeet integration solutions:',
  serviceProcessSteps: [
    {
      stepNumber: '01',
      title: 'Business Requirement Analysis',
      desc: 'Our team identifies your operational challenges, existing software, and integration goals.'
    },
    {
      stepNumber: '02',
      title: 'Integration Planning',
      desc: 'We create a technical roadmap based on your required features and workflow.'
    },
    {
      stepNumber: '03',
      title: 'Development And Configuration',
      desc: 'Our developers build secure connections between Tokeet and selected applications.'
    },
    {
      stepNumber: '04',
      title: 'Testing And Deployment',
      desc: 'We validate system performance, data accuracy, and integration reliability.'
    },
    {
      stepNumber: '05',
      title: 'Support And Maintenance',
      desc: 'Our team provides continuous assistance after implementation.'
    }
  ],

  // Section 4: Why Choose Cubixsol For Tokeet Integration
  whyChooseTitle: 'Why Choose Cubixsol For Tokeet Integration?',
  whyChooseIntro: 'Cubixsol helps rental businesses maximise the value of Tokeet through customised integration solutions focused on automation and connectivity. Our team develops integrations that simplify daily management tasks and let property operators control different systems through a connected workflow.\n\nWe know that every rental business has different operational requirements. Our developers create Tokeet solutions that connect booking platforms, payment systems, customer tools, and automation services while maintaining reliable data flow. From API development to workflow automation, Cubixsol builds integrations that support efficient property management.',
  whyChooseItems: [
    {
      title: 'Custom-Built Integration Architecture',
      desc: 'Engineered specifically around your exact property portfolio, multi-channel distribution strategy, and tech stack.'
    },
    {
      title: 'Real-Time Synchronisation Reliability',
      desc: 'High-speed bidirectional sync prevents double-bookings, maintains rate parity, and unifies calendar availability.'
    },
    {
      title: 'Automated Frictionless Guest Journeys',
      desc: 'From instant keyless entry generation to automated payment collections and SMS communications.'
    },
    {
      title: 'Continuous Monitoring & Expert Support',
      desc: 'Our senior PMS engineers provide post-launch optimization, security patches, and ongoing system maintenance.'
    }
  ],

  // Section 5: FAQs
  faqs: [
    {
      q: 'What Tokeet integration services does Cubixsol provide?',
      a: 'Cubixsol develops Tokeet integrations with booking platforms, payment gateways, CRM systems, smart devices, accounting tools, and other applications.'
    },
    {
      q: 'Can Tokeet integrate with Airbnb and other rental channels?',
      a: 'Yes, Tokeet supports connections with multiple booking platforms, and Cubixsol can develop customised integration solutions.'
    },
    {
      q: 'Does Cubixsol offer Tokeet API integration?',
      a: 'Yes, our developers create API-based integrations that connect Tokeet with external business applications.'
    },
    {
      q: 'Can Tokeet connect with smart lock systems?',
      a: 'Yes, Tokeet can integrate with smart access solutions to support automated guest entry and self-check-in.'
    },
    {
      q: 'How does Tokeet integration improve vacation rental operations?',
      a: 'Tokeet integration helps businesses automate workflows, reduce manual processes, and manage rental operations more efficiently.'
    }
  ],

  // SEO
  seo: {
    metaTitle: 'Tokeet Integration Services | Custom Vacation Rental PMS Solutions | Cubixsol',
    metaDescription: 'Professional Tokeet integration services by Cubixsol. Connect Tokeet PMS with Airbnb, Vrbo, direct booking websites, payment gateways, smart locks, and CRMs.',
    keywords: 'Tokeet integration, Tokeet API development, vacation rental PMS integration, Tokeet smart locks, Tokeet channel management, Cubixsol',
    ogTitle: 'Tokeet Integration Services | Cubixsol',
    ogDescription: 'Custom Tokeet integration solutions for vacation rental management. Multi-channel synchronization, API bridges, smart locks, and automated workflows.',
    ogImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&h=800&q=80',
    canonicalUrl: 'https://cubixsol.com/tokeet-integration'
  }
};

export default function TokeetIntegration() {
  const { openEstimateModal } = useEstimateModal();
  const [data, setData] = useState(DEFAULT_DATA);
  const [activeTab, setActiveTab] = useState('channel-management');
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const [openFaq, setOpenFaq] = useState(null);

  // Interactive Simulator States
  const [simChannel, setSimChannel] = useState('airbnb');
  const [syncStatus, setSyncStatus] = useState({ state: 'synced', latency: '28ms', lastUpdated: 'Just now' });
  const [isSyncing, setIsSyncing] = useState(false);
  const [generatedPin, setGeneratedPin] = useState('739104');
  const [directBookingSim, setDirectBookingSim] = useState({ state: 'idle', totalSaved: '$180' });

  // Fetch dynamic content from Admin Dashboard API
  useEffect(() => {
    let isMounted = true;
    apiFetch('/api/services/tokeet-integration')
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
    title: data.title || 'Tokeet Integration Services',
    description: data.desc || DEFAULT_DATA.heroDesc,
    keywords: data.seo?.keywords || 'Tokeet integration, Tokeet API, vacation rental PMS, Cubixsol',
    heroImage: data.heroImage,
  });

  const handleTriggerSync = (channelKey) => {
    setSimChannel(channelKey);
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncStatus({
        state: 'synced',
        latency: `${Math.floor(Math.random() * 20) + 18}ms`,
        lastUpdated: 'Just now'
      });
    }, 550);
  };

  const handleGenerateNewPin = () => {
    const randomPin = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedPin(randomPin);
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
                    {data.heroEyebrow || 'TOKEET INTEGRATION SERVICES'}
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
                  Custom Tokeet Integration Solutions For <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00a4d8] via-[#38bdf8] to-[#0077b6]">Vacation Rental Management</span>
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
                    onClick={() => openEstimateModal('Tokeet Integration Services')}
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#00a4d8] to-[#0077b6] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#00a4d8]/25 hover:shadow-[#00a4d8]/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <span>{data.heroPrimaryBtnText || 'Schedule A Tokeet Consultation'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <a
                    href="#core-capabilities"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 hover:text-white font-semibold text-sm sm:text-base border border-slate-700 transition"
                  >
                    <span>{data.heroSecondaryBtnText || 'Explore Tokeet Solutions'}</span>
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
                        <Sliders className="w-5 h-5 text-[#00a4d8]" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white flex items-center gap-2">
                          <span>Tokeet Engine Hub</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            LIVE
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">High-Performance PMS Pipeline</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-mono text-slate-400">Latency: </span>
                      <span className="text-[11px] font-mono font-bold text-emerald-400">{syncStatus.latency}</span>
                    </div>
                  </div>

                  {/* Connected System Nodes Grid */}
                  <div className="space-y-3">
                    
                    {/* Node 1: OTA Channels */}
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
                        Real-time rate parity, restriction updates & instant calendar sync
                      </p>
                    </div>

                    {/* Node 2: Direct Booking Storefront */}
                    <div
                      onClick={() => handleTriggerSync('direct')}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        simChannel === 'direct'
                          ? 'bg-[#00a4d8]/10 border-[#00a4d8]/60 shadow-md shadow-[#00a4d8]/10'
                          : 'bg-slate-800/60 border-slate-700 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <Globe className="w-4 h-4 text-[#38bdf8]" />
                          <span className="text-xs font-bold text-slate-200">Direct Booking Websites</span>
                        </div>
                        <span className="text-[10px] font-mono text-cyan-400">0% Commission</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 pl-6.5">
                        Seamless direct booking engine integration with live instant confirmation
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
                          <span className="text-xs font-bold text-slate-200">Smart Lock Access Code Generation</span>
                        </div>
                        <span className="text-[10px] font-mono text-amber-300">Time-Bounded</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 pl-6.5">
                        Automatic PIN creation matching guest check-in & check-out times
                      </p>
                    </div>

                    {/* Node 4: Payment & CRM Suite */}
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
                          <CreditCard className="w-4 h-4 text-purple-400" />
                          <span className="text-xs font-bold text-slate-200">Payment Gateway & CRM Hub</span>
                        </div>
                        <span className="text-[10px] font-mono text-purple-300">Stripe / HubSpot</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 pl-6.5">
                        Automated payment capture, QuickBooks sync & guest email drips
                      </p>
                    </div>

                  </div>

                  {/* Visualizer Simulator Action Bar */}
                  <div className="mt-4 pt-3.5 border-t border-slate-700/60 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-amber-400 animate-spin' : 'bg-emerald-400'}`} />
                      <span className="text-xs text-slate-300">
                        {isSyncing ? 'Simulating Tokeet event...' : 'All connected endpoints operational'}
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
        {/* 2. OPTIMISE BUSINESS OPERATIONS WITH TOKEET INTEGRATIONS (8 APPS GRID) */}
        {/* ========================================================================= */}
        <section className="py-20 lg:py-24 border-b border-slate-800/80 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/30 text-xs font-bold uppercase tracking-wider text-[#00a4d8]">
                <span>INTEGRATION ECOSYSTEM</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                {data.subServicesTitle || 'Optimise Business Operations With Tokeet Integrations'}
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
        {/* 3. SPECIALISED TOKEET INTEGRATION CAPABILITIES (5 CORE MODULES TABS) */}
        {/* ========================================================================= */}
        <section id="core-capabilities" className="py-20 lg:py-28 border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/30 text-xs font-bold uppercase tracking-wider text-[#00a4d8]">
                <span>SPECIALIZED CAPABILITIES</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                {data.coreSolutionsTitle || 'Specialised Tokeet Integration Capabilities'}
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
                  <span>{sol.title.replace('Tokeet ', '')}</span>
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
                        <span>Request Custom {currentSolution.title.replace('Tokeet ', '')} Scope</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                  </div>

                  {/* Right Column: Live Interactive Sandbox / Demo for the Selected Module */}
                  <div className="lg:col-span-5">
                    <div className="rounded-2xl bg-slate-900/90 border border-slate-700/80 p-6 space-y-5">
                      
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                        <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                          Interactive Live Sandbox
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00a4d8]/10 text-[#00a4d8] border border-[#00a4d8]/30">
                          LAB
                        </span>
                      </div>

                      {/* Dynamic Interactive Widget Based on Active Tab */}
                      {activeTab === 'channel-management' && (
                        <div className="space-y-4">
                          <p className="text-xs text-slate-300">
                            Simulate real-time availability sync across connected Tokeet channels:
                          </p>
                          <div className="space-y-2">
                            {['Airbnb Instant Sync', 'Booking.com Rates', 'Vrbo 2-Way Sync'].map((channel) => (
                              <div key={channel} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                                <span className="text-xs font-bold text-white">{channel}</span>
                                <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                                  ✓ Synced in 28ms
                                </span>
                              </div>
                            ))}
                          </div>
                          <button
                            onClick={() => handleTriggerSync('channel')}
                            className="w-full py-2.5 rounded-xl bg-[#00a4d8]/20 hover:bg-[#00a4d8]/30 text-[#00a4d8] border border-[#00a4d8]/40 font-bold text-xs transition"
                          >
                            Trigger Mock Tokeet Channel Event
                          </button>
                        </div>
                      )}

                      {activeTab === 'api-development' && (
                        <div className="space-y-3 font-mono text-xs">
                          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300">
                            <span className="text-emerald-400">POST</span> /api/v1/tokeet/webhook<br />
                            <span className="text-slate-500">{"{"}</span><br />
                            &nbsp;&nbsp;<span className="text-[#00a4d8]">"event"</span>: <span className="text-amber-300">"booking.created"</span>,<br />
                            &nbsp;&nbsp;<span className="text-[#00a4d8]">"rental_id"</span>: <span className="text-purple-300">"TKT-8841"</span>,<br />
                            &nbsp;&nbsp;<span className="text-[#00a4d8]">"payout_status"</span>: <span className="text-emerald-300">"scheduled"</span><br />
                            <span className="text-slate-500">{"}"}</span>
                          </div>
                          <div className="text-[11px] font-sans text-slate-400">
                            Scalable REST APIs and asynchronous webhooks built with strict rate-limit protection.
                          </div>
                        </div>
                      )}

                      {activeTab === 'direct-booking' && (
                        <div className="space-y-4">
                          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-slate-300">Direct Reservation Value:</span>
                              <span className="font-bold text-white font-mono">$1,200.00</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-slate-300">OTA Commission Saved (15%):</span>
                              <span className="font-bold text-emerald-400 font-mono">+$180.00 Saved</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-slate-300">Tokeet Calendar Sync:</span>
                              <span className="font-bold text-cyan-400 font-mono">AUTOMATED</span>
                            </div>
                          </div>
                          <p className="text-[11px] text-slate-400">
                            Custom direct booking websites connected directly into Tokeet with real-time checkout.
                          </p>
                        </div>
                      )}

                      {activeTab === 'smart-locks' && (
                        <div className="space-y-4">
                          <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-center space-y-2">
                            <span className="text-[11px] text-slate-400 uppercase font-bold">Auto-Generated Guest Access Code</span>
                            <div className="text-3xl font-mono font-extrabold text-[#00a4d8] tracking-widest">
                              {generatedPin}
                            </div>
                            <span className="text-[10px] text-emerald-400">Active: Check-in (3:00 PM) → Check-out (11:00 AM)</span>
                          </div>
                          <button
                            onClick={handleGenerateNewPin}
                            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#00a4d8] to-[#0077b6] text-white font-bold text-xs transition shadow"
                          >
                            Generate New Access Code
                          </button>
                        </div>
                      )}

                      {activeTab === 'payment-crm' && (
                        <div className="space-y-3">
                          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1.5">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-slate-300">Stripe Payment Gateway:</span>
                              <span className="font-bold text-emerald-400 font-mono">CAPTURED</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-slate-300">CRM Guest Profile:</span>
                              <span className="font-bold text-purple-400 font-mono">UPDATED</span>
                            </div>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-slate-300">QuickBooks Invoice:</span>
                              <span className="font-bold text-[#00a4d8] font-mono">SYNCHRONIZED</span>
                            </div>
                          </div>
                          <p className="text-[11px] text-slate-400">
                            Unified financial management and automated pre-stay/post-stay customer messaging.
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
        {/* 4. OUR TOKEET INTEGRATION PROCESS (5 STRUCTURED STEPS) */}
        {/* ========================================================================= */}
        <section className="py-20 lg:py-28 border-b border-slate-800/80 bg-slate-900/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/30 text-xs font-bold uppercase tracking-wider text-[#00a4d8]">
                <span>DELIVERY PROCESS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                {data.serviceProcessTitle || 'Our Tokeet Integration Process'}
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
                    <span>Stage 0{idx + 1} Deliverable</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. WHY CHOOSE CUBIXSOL FOR TOKEET INTEGRATION */}
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
                  {data.whyChooseTitle || 'Why Choose Cubixsol For Tokeet Integration?'}
                </h2>

                <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  <p>
                    Cubixsol helps rental businesses maximise the value of Tokeet through customised integration solutions focused on automation and connectivity. Our team develops integrations that simplify daily management tasks and let property operators control different systems through a connected workflow.
                  </p>
                  <p>
                    We know that every rental business has different operational requirements. Our developers create Tokeet solutions that connect booking platforms, payment systems, customer tools, and automation services while maintaining reliable data flow. From API development to workflow automation, Cubixsol builds integrations that support efficient property management.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => openEstimateModal('Why Choose Cubixsol For Tokeet Integration')}
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
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                Common questions about our Tokeet PMS integration, custom API engineering, and automation solutions.
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
              eyebrow="READY TO ELEVATE YOUR VACATION RENTAL OPERATIONS?"
              title="Scale Your Vacation Rental Business With Custom Tokeet Integrations"
              desc="Consult with Cubixsol's senior PMS integration engineers today. We engineer seamless, high-speed connections between Tokeet, OTAs, direct booking websites, smart locks, payment gateways, and CRMs."
              buttonText="Get Started With Tokeet Integration"
              serviceName="Tokeet Integration Services"
            />
          </div>
        </section>

      </div>

    </div>
  );
}
