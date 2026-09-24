import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  KeyRound, Calendar, ShieldCheck, Cpu, ArrowRight, CheckCircle2,
  ChevronRight, TrendingUp, Sparkles, Database, MessageSquare,
  Mail, Layers, PhoneCall, ExternalLink, RefreshCw, BarChart3,
  HelpCircle, Star, Sliders, Workflow, Settings, Smartphone,
  Award, Target, Rocket, Globe, CreditCard, Share2, Terminal,
  Code2, Check, PieChart, GitBranch, Server, Lock, Unlock,
  DoorClosed, Key, Bell, Wifi, ArrowUpRight, Zap, Play,
  CheckCircle, ChevronDown, Building2, Laptop, Shield, Radio, Users,
  Bot
} from 'lucide-react';
import { useEstimateModal } from '../context/EstimateModalContext';
import { apiFetch } from '../utils/api';
import { formatInline } from '../utils/formatText';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';
import CtaBanner from '../components/CtaBanner';
import DynamicIcon from '../components/DynamicIcon';
import { useSEO } from '../utils/seo';

// Default static data matching the document provided for Jurny Integration Services
const DEFAULT_DATA = {
  slug: 'jurny-integration',
  title: 'Jurny Integration Services',
  heroEyebrow: 'JURNY INTEGRATION SERVICES',
  heroTitle: 'Jurny Integration Services For Modern Property Management',
  heroDesc: 'Cubixsol provides professional Jurny integration services to help property operators connect their rental management platform with advanced business applications. Our developers create custom integration solutions to improve automation, streamline guest management, and connect different systems into a unified operational workflow.',
  heroPrimaryBtnText: 'Schedule A Jurny Consultation',
  heroSecondaryBtnText: 'Explore Solutions',
  heroBadges: [
    '2-Way Multi-Channel OTA Sync',
    'Automated Smart Lock & Access Control',
    'Custom Jurny Open API Connections',
    'Automated Guest Messaging & Review Workflows',
    'Payment Gateway & CRM Integration'
  ],
  heroImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&h=800&q=80',

  // Section 1: Integrate Jurny With Your Existing Technology Stack
  subServicesTitle: 'Integrate Jurny With Your Existing Technology Stack',
  subServicesIntro: 'Our integration solutions allow businesses to synchronise important data and create smoother operational workflows. Our team builds Jurny integrations that connect your platform with essential business tools:',
  subServicesItems: [
    {
      icon: 'Share2',
      tag: 'CHANNELS & BOOKINGS',
      title: 'Online Booking Channels & Reservation Platforms',
      desc: 'Seamless connectivity with Airbnb, VRBO, Booking.com, and direct booking engines for real-time calendar synchronization, dynamic pricing, and zero double bookings.',
      pills: ['Airbnb & VRBO Sync', 'Booking Engines', 'Live Availability'],
      colorTheme: 'cyan'
    },
    {
      icon: 'CreditCard',
      tag: 'PAYMENTS & TRANSACTIONS',
      title: 'Payment Gateways & Financial Applications',
      desc: 'Secure payment gateway connections (Stripe, Adyen, PayPal) for automatic deposit processing, credit card tokenization, pre-authorization holds, and split disbursements.',
      pills: ['Stripe / Merchant Gateways', 'Automated Deposits', 'Card Tokenization'],
      colorTheme: 'purple'
    },
    {
      icon: 'Users',
      tag: 'CRM & GUEST PROFILES',
      title: 'Customer Relationship Management Systems',
      desc: 'Unified customer relationship management platforms to consolidate guest profiles, track loyalty history, manage preferences, and deliver personalized hospitality experiences.',
      pills: ['HubSpot / Salesforce Sync', 'Guest Profiles', 'Loyalty Tracking'],
      colorTheme: 'cyan'
    },
    {
      icon: 'KeyRound',
      tag: 'SMART ACCESS & IOT',
      title: 'Smart Locks & Property Automation Solutions',
      desc: 'Automated digital key generation and contactless check-in protocols connecting Jurny directly with Yale, Schlage, August, Salto, and smart IoT thermostats.',
      pills: ['Keyless Entry PINs', 'Remote Lock Control', 'Automated Check-in'],
      colorTheme: 'purple'
    },
    {
      icon: 'MessageSquare',
      tag: 'COMMUNICATION & SUPPORT',
      title: 'Guest Communication Platforms',
      desc: 'Automated multi-channel messaging platforms delivering instant booking confirmations, WhatsApp/SMS arrival details, digital guidebooks, and post-stay feedback prompts.',
      pills: ['WhatsApp & SMS Drips', 'Digital Guidebooks', 'Automated Responses'],
      colorTheme: 'cyan'
    },
    {
      icon: 'PieChart',
      tag: 'FINANCIAL REPORTING',
      title: 'Accounting & Reporting Software',
      desc: 'Automated financial data pipelines with QuickBooks, Xero, and enterprise reporting suites for real-time revenue recognition, expense tracking, and owner payouts.',
      pills: ['QuickBooks & Xero', 'Owner Statements', 'Revenue Analytics'],
      colorTheme: 'purple'
    },
    {
      icon: 'TrendingUp',
      tag: 'GROWTH & MARKETING',
      title: 'Marketing Automation Tools',
      desc: 'Targeted marketing automation tools connecting Jurny guest data with Mailchimp, Klaviyo, and ad networks for retargeting campaigns, newsletters, and direct-booking incentives.',
      pills: ['Email Campaign Sync', 'Review Boosters', 'Loyalty Retargeting'],
      colorTheme: 'cyan'
    }
  ],

  // Section 2: Core 4 Specialized Solution Modules
  coreSolutionsTitle: 'Comprehensive Jurny Integration Capabilities',
  coreSolutionsIntro: 'Our specialized integration modules bridge Jurny with every touchpoint of your hospitality and vacation rental ecosystem.',
  coreSolutions: [
    {
      id: 'booking-reservation',
      title: 'Jurny Booking And Reservation Integration',
      subtitle: 'Synchronized Booking Records & Real-Time Availability',
      desc: 'A connected reservation system allows property managers to reduce administrative tasks and maintain accurate booking records. We develop Jurny booking integrations that help businesses manage reservations, availability, and guest details effectively. Our reservation integration services include:',
      icon: 'Layers',
      badge: 'RESERVATIONS & CHANNELS',
      features: [
        'Booking synchronisation across all OTA channels in real-time',
        'Dynamic calendar management preventing overlapping bookings',
        'Secure guest data transfer and unified contact records',
        'Instant reservation status updates and payment state changes',
        'Comprehensive property information and rate synchronisation'
      ]
    },
    {
      id: 'api-services',
      title: 'Jurny API Integration Services',
      subtitle: 'Scalable & Secure API Connection Architecture',
      desc: 'We provide custom Jurny API integration solutions that allow businesses to connect external applications with their property management platform. Our developers design secure and scalable API connections based on operational requirements. Our Jurny API services include:',
      icon: 'Code2',
      badge: 'CUSTOM API ENGINEERING',
      features: [
        'Custom API development tailored to bespoke workflow logic',
        'Third-party software integration across ERP, CRM, and PMS tools',
        'High-frequency automated data exchange and bidirectional webhooks',
        'Custom operational workflow automation and trigger pipelines',
        'Comprehensive API testing, rate-limit management, and performance optimisation'
      ]
    },
    {
      id: 'smart-lock',
      title: 'Jurny Smart Lock And Access Control Integration',
      subtitle: 'Contactless Keyless Check-in & Hardware Automation',
      desc: 'Automated access solutions improve guest convenience and simplify property operations. We connect Jurny with smart lock technologies to support modern check-in experiences. Our smart access integration services include:',
      icon: 'Key',
      badge: 'HARDWARE & SMART LOCKS',
      features: [
        'Automated digital key generation with reservation-tied validities',
        'Automated entry management with instant lock & unlock logs',
        'Guest access scheduling synchronized with check-in/check-out hours',
        'Remote property control and smart device battery health monitoring',
        'Smart device connectivity spanning thermostats, noise sensors, and lights'
      ]
    },
    {
      id: 'guest-comm',
      title: 'Jurny Guest Communication Automation',
      subtitle: 'Instant Automated Guest Touchpoints & Feedback Loops',
      desc: 'Guest communication plays an important role in hospitality success. Our experts integrate Jurny with communication platforms to automate important guest interactions. Connected communication systems help businesses deliver faster responses and improve guest satisfaction. Our solutions can support:',
      icon: 'MessageSquare',
      badge: 'GUEST AUTOMATION',
      features: [
        'Automated booking confirmations sent immediately via email and SMS',
        'Interactive check-in instructions and dynamic Wi-Fi credential delivery',
        'Real-time guest notifications and stay-milestone updates',
        'Automated 5-star review request workflows triggered post-departure',
        'AI-driven customer support automation for instant FAQ resolution'
      ]
    },
    {
      id: 'payment-crm',
      title: 'Jurny Payment And CRM Integration',
      subtitle: 'Unified Financial Operations & Guest Intelligence',
      desc: 'Our developers enable businesses to connect Jurny with payment systems and CRM platforms to improve financial management and customer relationships. Our solutions provide better visibility into revenue operations and guest interactions. Our integration services include:',
      icon: 'CreditCard',
      badge: 'PAYMENT & CRM',
      features: [
        'Direct payment gateway connections with automatic tokenization',
        'Real-time transaction synchronisation and invoice reconciliation',
        'Comprehensive guest profile management and historical stay logs',
        'Automated CRM workflow automation for remarketing and upsells',
        'Business reporting integration delivering deep RevPAR and ADR metrics'
      ]
    }
  ],

  // Section 3: Process
  processTitle: 'Our Jurny Integration Process',
  processIntro: 'We follow a professional, battle-tested development approach for every Jurny integration project to ensure zero downtime and complete data precision.',
  processSteps: [
    {
      step: '01',
      title: 'Requirement Discovery',
      desc: 'Our team analyses your business model, existing applications, tech stack, and specific integration objectives.',
      icon: 'Compass'
    },
    {
      step: '02',
      title: 'Technical Planning',
      desc: 'We create a detailed integration architecture, API mapping, data-flow models, and security protocols based on your workflow requirements.',
      icon: 'Workflow'
    },
    {
      step: '03',
      title: 'Development And Configuration',
      desc: 'Our senior developers build custom API bridges, configure webhooks, connect databases, and configure secure system connections.',
      icon: 'Code2'
    },
    {
      step: '04',
      title: 'Testing And Deployment',
      desc: 'We rigorously test booking synchronicity, edge-case failovers, data accuracy, latency, and system performance before launch.',
      icon: 'ShieldCheck'
    },
    {
      step: '05',
      title: 'Support And Maintenance',
      desc: 'Our team provides continuous monitoring, API version updates, and ongoing assistance to maintain reliable integration performance.',
      icon: 'RefreshCw'
    }
  ],

  // Section 4: Why Choose Cubixsol
  whyChooseTitle: 'Why Choose Cubixsol For Jurny Integration?',
  whyChooseIntro: 'Cubixsol delivers customised PMS integration services for hospitality businesses that need better automation and system connectivity. Our developers create secure, scalable, and efficient solutions that improve daily property operations.',
  whyChoosePoints: [
    {
      title: 'Dedicated Jurny & PMS Expertise',
      desc: 'Our engineers specialize in modern property management APIs, multi-channel distribution networks, and hardware IoT protocols.'
    },
    {
      title: 'Bespoke Engineering Solutions',
      desc: 'We build tailored architectures matching your exact tech stack — from custom CRM mappings to smart lock integrations.'
    },
    {
      title: 'High Reliability & Zero Calendar Clashes',
      desc: 'Robust two-way synchronization algorithms ensure live calendar parity and zero double-booking occurrences across all OTAs.'
    },
    {
      title: 'End-to-End Delivery & Ongoing Support',
      desc: 'From initial architecture planning to post-launch maintenance, we ensure your operational infrastructure runs smoothly 24/7.'
    }
  ],

  // Section 5: FAQs
  faqsTitle: 'Frequently Asked Questions',
  faqsIntro: 'Find clear answers regarding our Jurny integration capabilities, API development, and deployment workflows.',
  faqs: [
    {
      q: 'What Jurny integration services does Cubixsol offer?',
      a: 'Cubixsol creates custom Jurny integrations with online booking platforms (Airbnb, VRBO, Booking.com), payment gateways (Stripe, Adyen), CRM systems (HubSpot, Salesforce), smart device access systems (Yale, Schlage, August), accounting tools (QuickBooks, Xero), and bespoke business applications.'
    },
    {
      q: 'Can Jurny integrate with external booking platforms?',
      a: 'Yes, Jurny can connect with different booking channels and direct website engines. Cubixsol develops customised bidirectional API solutions for real-time inventory, pricing, and reservation synchronisation.'
    },
    {
      q: 'Does Cubixsol provide Jurny API integration services?',
      a: 'Yes, our developers build secure, scalable API-based integrations and webhook listeners that connect Jurny with external custom software, ERPs, accounting portals, and business reporting tools.'
    },
    {
      q: 'Can Jurny connect with smart lock systems?',
      a: 'Yes, Jurny can integrate with smart lock and access control solutions to automatically generate time-restricted PIN codes upon booking confirmation, supporting completely keyless check-in and secure property entry.'
    },
    {
      q: 'How can Jurny integration improve rental operations?',
      a: 'Jurny integration helps hospitality businesses automate daily repetitive workflows, eliminate double-bookings, accelerate guest communication, streamline financial reconciliation, and manage multiple properties effortlessly from a centralized system.'
    }
  ]
};

export default function JurnyIntegration() {
  const { openEstimateModal } = useEstimateModal();
  const [data, setData] = useState(DEFAULT_DATA);
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  // Live Simulation state
  const [simState, setSimState] = useState({
    status: 'Synced',
    latency: '140ms',
    activeOta: 'Airbnb & VRBO',
    smartLockPin: '739218',
    isSyncing: false
  });

  useSEO(data?.seo, {
    title: `${data.title || 'Jurny Integration Services'} | Cubixsol`,
    description: data.heroDesc || data.desc || 'Custom Jurny integration solutions for vacation rentals, smart lock automation, and multi-channel synchronization.',
    keywords: 'Jurny integration, Jurny API, smart locks Jurny, PMS integration, vacation rental automation, Jurny Airbnb sync, hospitality technology',
    canonicalUrl: 'https://cubixsol.com/jurny-integration'
  });

  useEffect(() => {
    let isMounted = true;
    apiFetch('services/jurny-integration')
      .then(res => {
        if (!isMounted || !res) return;
        const apiData = res.service || res.data || res;
        if (apiData && (apiData.title || apiData.slug)) {
          setData(prev => ({
            ...prev,
            ...apiData,
            seo: apiData.seo || prev.seo,
          }));
        }
      })
      .catch(() => {});
    return () => { isMounted = false; };
  }, []);


  const triggerSimSync = () => {
    setSimState(prev => ({ ...prev, isSyncing: true, status: 'Syncing payload...' }));
    setTimeout(() => {
      const newPin = Math.floor(100000 + Math.random() * 900000).toString();
      setSimState({
        status: '2-Way Active Synchronized',
        latency: `${Math.floor(Math.random() * 60 + 110)}ms`,
        activeOta: 'Airbnb, VRBO, Booking.com',
        smartLockPin: newPin,
        isSyncing: false
      });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-white text-ink selection:bg-primary-500/20 selection:text-primary-700 font-sans">
      
      {/* ================= 1. HERO SECTION (PREMIUM DARK GRADIENT) ================= */}
      <section className="relative pt-32 pb-20 lg:pt-36 lg:pb-28 bg-gradient-to-b from-[#1a1a2e] via-[#16162a] to-[#121224] text-white overflow-hidden">
        {/* Glowing Background Orbs */}
        <div className="absolute inset-0 pointer-events-none opacity-25">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00a4d8] rounded-full blur-[140px]" />
          <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-[#5d53a3] rounded-full blur-[140px]" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)`,
              backgroundSize: '32px 32px'
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Text & Badges */}
            <div className="lg:col-span-7 space-y-7">
              <Reveal>
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold tracking-widest uppercase text-[#00a4d8]">
                  <span className="w-2 h-2 rounded-full bg-[#00a4d8] animate-pulse" />
                  {data.heroEyebrow || 'JURNY INTEGRATION SERVICES'}
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.14]">
                  {formatInline(data.heroTitle)}
                </h1>
              </Reveal>

              <Reveal delay={0.2}>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                  {formatInline(data.heroDesc)}
                </p>
              </Reveal>

              {/* Badges / Key Highlights */}
              <Reveal delay={0.3}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {(data.heroBadges || []).map((badge, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 bg-white/5 border border-white/10 rounded-xl p-3 backdrop-blur-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#00a4d8] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-200 font-medium leading-snug">{badge}</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Action Buttons */}
              <Reveal delay={0.4}>
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <button
                    onClick={openEstimateModal}
                    className="btn-primary text-sm sm:text-base px-7 py-3.5"
                  >
                    <span>{data.heroPrimaryBtnText || 'Schedule A Jurny Consultation'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href="#solutions"
                    className="px-6 py-3.5 rounded-lg font-semibold text-sm sm:text-base text-slate-200 bg-white/10 hover:bg-white/15 border border-white/20 transition-all flex items-center gap-2"
                  >
                    <span>{data.heroSecondaryBtnText || 'Explore Solutions'}</span>
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Right Column: Hero Visual Card (Jurny PMS Live Node) */}
            <div className="lg:col-span-5">
              <Reveal delay={0.3}>
                <div className="relative rounded-2xl bg-gradient-to-b from-[#0a1628]/95 to-[#040e1c]/95 border border-[#00a4d8]/30 shadow-[0_10px_40px_rgba(0,164,216,0.15)] backdrop-blur-xl p-5 sm:p-6 overflow-hidden">
                  
                  {/* Top Bar */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      <span className="text-xs font-mono text-slate-400 ml-1">jurny_gateway_daemon</span>
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
                        <div className="w-9 h-9 rounded-lg bg-[#00a4d8]/10 border border-[#00a4d8]/30 flex items-center justify-center text-[#00a4d8] font-bold">
                          <Building2 className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-sm">Jurny Unified PMS Bridge</h3>
                          <p className="text-[11px] text-slate-400">Bidirectional Sync Engine</p>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-[#00a4d8] font-bold bg-[#00a4d8]/10 px-2 py-0.5 rounded">
                        {simState.latency}
                      </span>
                    </div>

                    {/* Nodes */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#00a4d8] font-bold flex items-center gap-1">
                            <Share2 className="w-3.5 h-3.5" /> OTAs Sync
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
                      <span>Simulate Jurny 2-Way Event Sync</span>
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

      {/* ================= 2. SECTION 1: CONNECT JURNY WITH YOUR EXISTING TECH STACK ================= */}
      <section className="py-20 md:py-24 bg-slate-50/70 border-b border-gray-100 relative">
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
                {formatInline(data.subServicesTitle)}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {formatInline(data.subServicesIntro)}
              </p>
            </Reveal>
          </div>

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {(data.subServicesItems || []).map((item, idx) => {
              const isCyan = item.colorTheme === 'cyan' || idx % 2 === 0;
              return (
                <StaggerItem key={idx}>
                  <div className="h-full bg-white hover:bg-white border border-gray-100 hover:border-[#00a4d8]/40 rounded-2xl p-6 sm:p-7 shadow-card hover:shadow-soft transition-all duration-300 group flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                          isCyan ? 'bg-[#00a4d8]/10 text-[#00a4d8]' : 'bg-[#5d53a3]/10 text-[#5d53a3]'
                        }`}>
                          <DynamicIcon name={item.icon} className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                          {item.tag}
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
                      {(item.pills || []).map((pill, pIdx) => (
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

      {/* ================= 3. SECTION 2: CORE DETAILED INTEGRATION CAPABILITIES (TABS) ================= */}
      <section id="solutions" className="py-20 md:py-24 bg-white border-b border-gray-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5d53a3]/10 border border-[#5d53a3]/20 text-[#5d53a3] text-xs font-bold uppercase tracking-wider mb-4">
                <Cpu className="w-3.5 h-3.5" />
                <span>COMPREHENSIVE ENGINEERING MODULES</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight mb-4">
                {formatInline(data.coreSolutionsTitle)}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {formatInline(data.coreSolutionsIntro)}
              </p>
            </Reveal>
          </div>

          {/* Navigation Pill Tabs */}
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-12">
            {(data.coreSolutions || []).map((sol, idx) => (
              <button
                key={sol.id || idx}
                onClick={() => setActiveTab(idx)}
                className={`px-4 sm:px-5 py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  activeTab === idx
                    ? 'bg-gradient-to-r from-[#00a4d8] to-[#5d53a3] text-white shadow-soft font-bold'
                    : 'bg-slate-50 hover:bg-slate-100 text-gray-600 hover:text-ink border border-gray-200'
                }`}
              >
                <DynamicIcon name={sol.icon} className="w-4 h-4" />
                <span>{sol.title.replace('Jurny ', '')}</span>
              </button>
            ))}
          </div>

          {/* Active Tab Panel */}
          {data.coreSolutions && data.coreSolutions[activeTab] && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-50/80 border border-gray-200 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-card"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Content side */}
                  <div className="lg:col-span-7 space-y-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-[#00a4d8]/10 text-[#00a4d8] border border-[#00a4d8]/20">
                      {data.coreSolutions[activeTab].badge}
                    </div>

                    <div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-ink mb-1">
                        {data.coreSolutions[activeTab].title}
                      </h3>
                      <p className="text-sm font-semibold text-[#00a4d8]">
                        {data.coreSolutions[activeTab].subtitle}
                      </p>
                    </div>

                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                      {data.coreSolutions[activeTab].desc}
                    </p>

                    <div className="space-y-2.5 pt-2">
                      {data.coreSolutions[activeTab].features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-[#00a4d8] shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-gray-700 font-medium">{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={openEstimateModal}
                        className="btn-primary text-sm px-6 py-3 cursor-pointer"
                      >
                        <span>Integrate This Module</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Visual side (Dark Console Box) */}
                  <div className="lg:col-span-5">
                    <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 p-6 border border-slate-800 shadow-xl space-y-4 text-white">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                        <span className="text-xs font-mono text-slate-400">STATUS: READY</span>
                        <span className="text-xs font-mono text-cyan-300">API v2.0 CONNECTED</span>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                        <div className="text-[11px] text-slate-400 font-medium">Target Ecosystem</div>
                        <div className="text-sm font-bold text-white flex items-center justify-between">
                          <span>Jurny Cloud Engine</span>
                          <span className="text-emerald-400 text-xs">● Synchronized</span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                        <div className="text-[11px] text-slate-400 font-medium">Integration Protocol</div>
                        <div className="text-xs font-mono text-cyan-300 break-all">
                          REST API / Webhooks / WebSocket 2-Way
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
                        <div className="text-[11px] text-slate-400 font-medium">Security & Compliance</div>
                        <div className="text-xs text-slate-300">
                          TLS 1.3 Encryption, OAuth 2.0 Auth, Rate-Limit Safeguards
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      {/* ================= 4. SECTION 3: SYSTEMATIC INTEGRATION PROCESS ================= */}
      <section className="py-20 md:py-24 bg-slate-50/70 border-b border-gray-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/20 text-[#00a4d8] text-xs font-bold uppercase tracking-wider mb-4">
                <Workflow className="w-3.5 h-3.5" />
                <span>SYSTEMATIC METHODOLOGY</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight mb-4">
                {formatInline(data.processTitle)}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {formatInline(data.processIntro)}
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {(data.processSteps || []).map((step, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="h-full bg-white border border-gray-100 hover:border-[#00a4d8]/40 rounded-2xl p-6 shadow-card hover:shadow-soft transition-all duration-300 flex flex-col justify-between group">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-extrabold text-[#00a4d8] font-mono">
                        {step.step}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-gray-100 flex items-center justify-center text-[#5d53a3] group-hover:scale-110 transition-transform">
                        <DynamicIcon name={step.icon} className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="text-base font-bold text-ink mb-2 group-hover:text-[#00a4d8] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 5. SECTION 4: WHY CHOOSE CUBIXSOL ================= */}
      <section className="py-20 md:py-24 bg-white border-b border-gray-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <Reveal>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5d53a3]/10 border border-[#5d53a3]/20 text-[#5d53a3] text-xs font-bold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5" />
                  <span>ENGINEERING EXCELLENCE</span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight leading-tight">
                  {formatInline(data.whyChooseTitle)}
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
                  {formatInline(data.whyChooseIntro)}
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <button
                  onClick={openEstimateModal}
                  className="btn-primary text-sm px-7 py-3.5 cursor-pointer"
                >
                  <span>Talk To A PMS Architect</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Reveal>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {(data.whyChoosePoints || []).map((point, idx) => (
                <Reveal key={idx} delay={idx * 0.1}>
                  <div className="p-6 rounded-2xl bg-slate-50/80 border border-gray-100 hover:border-[#00a4d8]/30 shadow-card hover:shadow-soft transition-all duration-300 h-full flex flex-col justify-start group">
                    <div className="w-10 h-10 rounded-xl bg-[#00a4d8]/10 border border-[#00a4d8]/20 flex items-center justify-center text-[#00a4d8] mb-4 group-hover:scale-110 transition-transform">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-ink mb-2 group-hover:text-[#00a4d8] transition-colors">
                      {point.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                      {point.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ================= 6. SECTION 5: FAQS (ACCORDION) ================= */}
      <section className="py-20 md:py-24 bg-slate-50/70 border-b border-gray-100 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/20 text-[#00a4d8] text-xs font-bold uppercase tracking-wider mb-4">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>GOT QUESTIONS?</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight mb-4">
                {formatInline(data.faqsTitle)}
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {formatInline(data.faqsIntro)}
              </p>
            </Reveal>
          </div>

          <div className="space-y-4">
            {(data.faqs || []).map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <Reveal key={idx} delay={idx * 0.05}>
                  <div className="border border-gray-200 bg-white hover:border-[#00a4d8]/40 rounded-2xl overflow-hidden shadow-card transition-colors">
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className="text-sm sm:text-base font-bold text-ink">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#00a4d8] shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4 font-normal">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 7. CTA BANNER ================= */}
      <CtaBanner
        title="Ready To Connect Jurny With Your Hospitality Stack?"
        subtitle="Let Cubixsol engineer high-performance integrations, automated check-in workflows, and seamless channel sync for your properties."
        btnText="Schedule A Jurny Consultation"
      />

    </div>
  );
}
