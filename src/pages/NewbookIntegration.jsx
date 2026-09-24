import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Building2, Calendar, ShieldCheck, Cpu, ArrowRight, CheckCircle2,
  ChevronRight, TrendingUp, Sparkles, Database, MessageSquare,
  Mail, Layers, PhoneCall, ExternalLink, RefreshCw, BarChart3,
  HelpCircle, Star, Sliders, Workflow, Settings, Smartphone,
  Award, Target, Rocket, Globe, CreditCard, Share2, Terminal,
  Code2, Check, PieChart, GitBranch, Server, Lock, Unlock,
  DoorClosed, Key, Bell, Wifi, ArrowUpRight, Zap, Play,
  CheckCircle, ChevronDown, Laptop, Shield, Radio, Users, CheckSquare,
  DollarSign, FileCheck, Receipt, Landmark, RefreshCcw, Compass, MapPin
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
  slug: 'newbook-integration',
  title: 'Newbook Integration Services',
  heroEyebrow: 'NEWBOOK INTEGRATION SERVICES',
  heroTitle: 'Custom Newbook Integration Solutions For Hospitality Businesses',
  heroDesc: 'Cubixsol provides professional Newbook integration services. We enhance Newbook capabilities through custom integrations to support business-specific requirements. Our developers create customised integrations that improve reservation management, automate daily workflows, and simplify communication between different software systems.',
  heroPrimaryBtnText: 'Schedule A Newbook Consultation',
  heroSecondaryBtnText: 'Explore Solutions',
  heroBadges: [
    'Multi-Property & Resort 2-Way Channel Sync',
    'Custom Newbook Open API & Webhook Bridges',
    'Automated Payment Gateways & Xero / QuickBooks Sync',
    'Guest CRM & Contactless Mobile Journey Workflows'
  ],
  heroImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&h=800&q=80',

  // Section 1: Connect Newbook With Your Essential Business Systems
  subServicesTitle: 'Connect Newbook With Your Essential Business Systems',
  subServicesIntro: 'Our integration solutions reduce manual administration. We develop Newbook integrations to connect your PMS with different platforms, including:',
  subServicesItems: [
    {
      icon: 'Share2',
      tag: 'BOOKING & OTAs',
      title: 'Booking Websites & Online Reservation Channels',
      desc: 'Booking websites and online reservation channels (Airbnb, Booking.com, Agoda, Expedia) for live 2-way rate distribution and inventory parity.',
      pills: ['OTA 2-Way Sync', 'Direct Booking Engines', 'Dynamic Tariff Rules'],
      colorTheme: 'cyan'
    },
    {
      icon: 'CreditCard',
      tag: 'PAYMENTS & BILLING',
      title: 'Payment Gateways & Transaction Platforms',
      desc: 'Payment gateways and transaction platforms (Stripe, Windcave, Square) for automated guest deposit collection, card tokenization, and recurring billing.',
      pills: ['PCI-DSS Gateways', 'Automated Deposits', 'Pre-Authorization Holds'],
      colorTheme: 'purple'
    },
    {
      icon: 'Users',
      tag: 'GUEST ENGAGEMENT',
      title: 'CRM & Guest Communication Systems',
      desc: 'CRM and guest communication systems for digital check-ins, automated SMS/email arrival notifications, upsells, and guest history tracking.',
      pills: ['Digital Check-in', 'Automated SMS/Email', 'Guest History Profiles'],
      colorTheme: 'cyan'
    },
    {
      icon: 'Receipt',
      tag: 'ACCOUNTING',
      title: 'Accounting & Financial Applications',
      desc: 'Accounting and financial applications (Xero, QuickBooks, MYOB) for automated daily reconciliation, ledger syncing, and tax reporting.',
      pills: ['Xero & QuickBooks', 'Daily Ledger Sync', 'Owner Settlement Reports'],
      colorTheme: 'purple'
    },
    {
      icon: 'TrendingUp',
      tag: 'MARKETING',
      title: 'Marketing Automation Tools',
      desc: 'Marketing automation tools connecting guest stays with ActiveCampaign, HubSpot, and Mailchimp for targeted promotional campaigns and loyalty rewards.',
      pills: ['HubSpot / Mailchimp Sync', 'Post-Stay Feedback', 'Loyalty Tier Sync'],
      colorTheme: 'cyan'
    },
    {
      icon: 'BarChart3',
      tag: 'ANALYTICS',
      title: 'Business Reporting Solutions',
      desc: 'Business reporting solutions integrating Newbook data into custom PowerBI or Google Looker dashboards for occupancy, RevPAR, and ADR analysis.',
      pills: ['Custom BI Dashboards', 'RevPAR & ADR Metrics', 'Multi-Site Reporting'],
      colorTheme: 'purple'
    },
    {
      icon: 'Key',
      tag: 'HARDWARE & IOT',
      title: 'Smart Property Management Systems',
      desc: 'Smart property management systems connecting digital key locks (Assa Abloy, Salto, Kaba), energy management, and gate control.',
      pills: ['Smart Lock Integration', 'Automated Boom Gates', 'Energy IoT Controls'],
      colorTheme: 'cyan'
    }
  ],

  // Core 4 Solutions
  coreSolutionsTitle: 'Comprehensive Newbook Integration Capabilities',
  coreSolutionsIntro: 'Explore our specialized engineering modules designed to transform Newbook into an integrated, high-efficiency hospitality ecosystem.',
  coreSolutions: [
    {
      id: 'booking-system',
      title: 'Newbook Booking System Integration',
      subtitle: 'Accurate Multi-Channel Synchronization & Real-Time Availability',
      desc: 'Managing reservations across different channels requires accurate data synchronisation. We integrate Newbook with booking platforms to maintain updated availability, reservations, and guest information. Our booking integration services include:',
      icon: 'Layers',
      badge: 'BOOKING SYSTEM',
      features: [
        'Reservation synchronisation across all connected channels in real-time',
        'Instant calendar availability updates preventing double-bookings',
        'Unified guest information management and profile consolidation',
        'Automated booking confirmations and digital booking vouchers',
        'Comprehensive property data and rate parity synchronisation'
      ]
    },
    {
      id: 'api-integration',
      title: 'Newbook API Integration Services',
      subtitle: 'Secure Custom API Bridges, Middleware & Event Webhooks',
      desc: 'Our experts develop custom Newbook API integrations to connect existing applications with the PMS. We build secure communication channels between Newbook and third-party systems. Our solutions support operational improvements and future expansion. Our API integration services include:',
      icon: 'Code2',
      badge: 'API & MIDDLEWARE',
      features: [
        'Custom API development tailored to your specific enterprise architecture',
        'External software connections with custom mobile apps and web portals',
        'Data transfer automation and real-time webhook event listeners',
        'Workflow customisation for check-in kiosks, POS, and housekeeping',
        'Rigorous API testing, stress simulation, and continuous optimisation'
      ]
    },
    {
      id: 'payment-accounting',
      title: 'Newbook Payment And Accounting Integration',
      subtitle: 'Seamless Transaction Processing, Daily Ledgers & Automated Invoicing',
      desc: 'Financial management becomes easier when we integrate Newbook with financial tools. These integrations provide better control over revenue and business operations. Our solutions support:',
      icon: 'CreditCard',
      badge: 'PAYMENTS & FINANCE',
      features: [
        'Online payment processing with 3-D Secure compliance and tokenization',
        'Invoice automation for guest folios, corporate accounts, and tour groups',
        'Direct accounting system connections (Xero, QuickBooks, Sage, MYOB)',
        'Transaction synchronisation and daily automated ledger reconciliation',
        'Custom financial reporting workflows and owner disbursement schedules'
      ]
    },
    {
      id: 'crm-communication',
      title: 'Newbook CRM And Guest Communication Integration',
      subtitle: 'Automated Guest Journeys, Marketing Campaigns & Stronger Loyalty',
      desc: 'Guest relationships are important for hospitality businesses. Cubixsol connects Newbook with CRM and communication platforms to improve guest engagement. Connected communication systems help businesses maintain stronger relationships with their guests. Our solutions can support:',
      icon: 'MessageSquare',
      badge: 'CRM & GUEST JOURNEY',
      features: [
        'Automated emails, SMS notifications, and pre-arrival questionnaires',
        'Guest database synchronisation for enriched customer preferences',
        'Marketing campaign connections with personalized promotional triggers',
        'Customer relationship management tailored to repeat guest retention',
        'Personalised communication workflows for special requests and feedback'
      ]
    }
  ],

  // 5 Step Process
  processTitle: 'Our Newbook Integration Process',
  processIntro: 'Cubixsol follows a structured process to deliver reliable Newbook integration solutions:',
  processSteps: [
    {
      step: '01',
      title: 'Requirement Analysis',
      desc: 'Our team studies your current systems, business goals, and integration requirements to map all operational data streams.',
      badge: 'DISCOVERY'
    },
    {
      step: '02',
      title: 'Solution Planning',
      desc: 'We design a technical approach and custom architecture that matches your operational needs and security standards.',
      badge: 'ARCHITECTURE'
    },
    {
      step: '03',
      title: 'Development And Integration',
      desc: 'Our developers build secure connections, webhook pipelines, and API bridges between Newbook and required platforms.',
      badge: 'ENGINEERING'
    },
    {
      step: '04',
      title: 'Testing And Deployment',
      desc: 'We verify performance, data accuracy, latency, and reliability before coordinating a smooth go-live deployment.',
      badge: 'QUALITY QA'
    },
    {
      step: '05',
      title: 'Support And Maintenance',
      desc: 'Our team provides ongoing technical assistance, monitoring, and regular updates after implementation.',
      badge: 'GO LIVE & SUPPORT'
    }
  ],

  // Why Choose Cubixsol
  whyChooseTitle: 'Why Choose Cubixsol For Newbook Integration?',
  whyChooseIntro: 'Cubixsol helps hospitality businesses improve their technology infrastructure through custom PMS integration solutions. Our developers focus on building secure, scalable, and efficient connections that simplify property management operations. From booking automation, payment integration, CRM connectivity, or custom API development, Cubixsol delivers Newbook integration solutions designed around your business objectives.',
  whyChooseItems: [
    {
      title: 'Enterprise Hospitality Expertise',
      desc: 'Proven experience delivering complex PMS integrations for resorts, hotel chains, holiday parks, and marinas.',
      icon: 'Award'
    },
    {
      title: 'Real-Time Parity & Zero Collisions',
      desc: 'High-speed event-driven synchronisation eliminating overbookings and guaranteeing rate accuracy across channels.',
      icon: 'ShieldCheck'
    },
    {
      title: 'Custom API Bridges & Webhooks',
      desc: 'Bespoke middleware that seamlessly connects Newbook with legacy internal software, modern apps, and hardware.',
      icon: 'Cpu'
    },
    {
      title: 'Automated Financial Operations',
      desc: 'Complete integration with payment gateways and major accounting software for touchless billing and reconciliation.',
      icon: 'CreditCard'
    },
    {
      title: 'End-to-End Guest Journey Automation',
      desc: 'Contactless check-ins, automated SMS access codes, and personalized marketing workflows that delight guests.',
      icon: 'Users'
    },
    {
      title: 'Continuous Support & SLA Backing',
      desc: 'Dedicated technical engineers providing proactive monitoring, API maintenance, and prompt troubleshooting.',
      icon: 'Sparkles'
    }
  ],

  // FAQs
  faqs: [
    {
      q: 'What Newbook integration services does Cubixsol provide?',
      a: 'Cubixsol develops Newbook integrations with booking platforms, payment systems, CRM tools, accounting software, and business applications.'
    },
    {
      q: 'Can Newbook integrate with third-party booking platforms?',
      a: 'Yes, Newbook can connect with external booking systems, and Cubixsol can develop customised integration solutions for 2-way real-time calendar and rate sync.'
    },
    {
      q: 'Does Cubixsol provide Newbook API integration?',
      a: 'Yes, our developers create API-based integrations that connect Newbook with external applications, web portals, mobile guest apps, and hardware.'
    },
    {
      q: 'Can Newbook integrate with payment gateways?',
      a: 'Yes, Newbook can connect with payment solutions (Stripe, Windcave, Square, and merchant gateways) to support secure transaction processing and tokenization.'
    },
    {
      q: 'How can Newbook integration improve business operations?',
      a: 'Newbook integration reduces manual work, improves data accuracy, eliminates booking discrepancies, and creates more efficient hospitality workflows.'
    }
  ],

  seoTitle: 'Newbook Integration Services | Hospitality PMS Solutions | Cubixsol',
  seoDescription: 'Expert Newbook PMS integration services by Cubixsol. Connect Newbook with booking channels, payment gateways, accounting systems, CRM tools, and custom APIs.',
  seoKeywords: 'Newbook integration, Newbook PMS, Newbook API, hospitality PMS integration, vacation rental automation, Cubixsol'
};

export default function NewbookIntegration() {
  const [data, setData] = useState(DEFAULT_DATA);
  const [activeTab, setActiveTab] = useState('booking-system');
  const [openFaq, setOpenFaq] = useState(null);
  const [simReservationChannel, setSimReservationChannel] = useState('Direct Booking');
  const [simResStatus, setSimResStatus] = useState('Instant Sync Complete');
  const [simFolioAmount, setSimFolioAmount] = useState(850);
  const [simGuestJourneyStep, setSimGuestJourneyStep] = useState('Pre-Arrival SMS Sent');
  const { openModal } = useEstimateModal();

  useSEO(data?.seo, {
    title: data.seoTitle || 'Newbook Integration Services | Cubixsol',
    description: data.seoDescription || 'Custom Newbook PMS integration solutions.',
    keywords: data.seoKeywords || 'Newbook integration, Newbook API, Cubixsol',
    canonicalUrl: 'https://cubixsol.com/newbook-integration'
  });

  useEffect(() => {
    let isMounted = true;
    apiFetch('services/newbook-integration')
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
        console.log('Using default Newbook integration dataset:', err.message);
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

  const handleSimulateReservation = (channel) => {
    setSimReservationChannel(channel);
    setSimResStatus('Processing Webhook...');
    setTimeout(() => {
      setSimResStatus('Synced to Newbook Core & Multi-Calendar (24ms)');
    }, 500);
  };

  const handleJourneyTrigger = (stepName) => {
    setSimGuestJourneyStep(stepName);
  };

  return (
    <div className="min-h-screen bg-white text-ink selection:bg-[#00a4d8]/20 selection:text-[#5d53a3]">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-36 lg:pb-28 bg-gradient-to-b from-[#1a1a2e] via-[#16162a] to-[#121224] text-white overflow-hidden">
        {/* Ambient Glows */}
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
                {data.heroEyebrow || 'NEWBOOK INTEGRATION SERVICES'}
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-white">
                {data.heroTitle}
              </h1>

              {/* Description */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                {data.heroDesc}
              </p>

              {/* Badges */}
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
                  <span>{data.heroPrimaryBtnText || 'Schedule A Newbook Consultation'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#systems"
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
                    <span className="text-[11px] font-mono text-slate-400 ml-2">newbook_cluster.enterprise</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#00a4d8]/20 text-[#00a4d8] border border-[#00a4d8]/40">
                    2-WAY ACTIVE
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Central Node Visualizer */}
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-3">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-400">Hospitality Core Engine</span>
                      <span className="text-[#00a4d8] flex items-center gap-1">
                        <Radio className="w-3 h-3 animate-ping" />
                        Newbook REST & SOAP API
                      </span>
                    </div>

                    {/* Sync Progress Bar */}
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#00a4d8] to-[#5d53a3]"
                        animate={{ width: ['20%', '100%', '20%'] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                      <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                        <p className="text-[10px] text-slate-400">Sync Latency</p>
                        <p className="text-xs font-bold text-white font-mono">&lt; 0.5s</p>
                      </div>
                      <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                        <p className="text-[10px] text-slate-400">Property Scale</p>
                        <p className="text-xs font-bold text-white font-mono">Multi-Site</p>
                      </div>
                      <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                        <p className="text-[10px] text-slate-400">Reconciliation</p>
                        <p className="text-xs font-bold text-emerald-400 font-mono">100% Match</p>
                      </div>
                    </div>
                  </div>

                  {/* Connected Integrations Grid */}
                  <div className="space-y-2">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Synchronized Ecosystem
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-200">
                        <Share2 className="w-4 h-4 text-[#00a4d8]" />
                        <span>Channel Manager Hub</span>
                      </div>
                      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-200">
                        <CreditCard className="w-4 h-4 text-[#5d53a3]" />
                        <span>Stripe & Windcave</span>
                      </div>
                      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-200">
                        <Receipt className="w-4 h-4 text-[#00a4d8]" />
                        <span>Xero & QuickBooks</span>
                      </div>
                      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-200">
                        <Key className="w-4 h-4 text-[#5d53a3]" />
                        <span>Salto / Assa Abloy</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Trust Note */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    High-Concurrency Enterprise SLA
                  </span>
                  <span className="font-mono text-[#00a4d8]">Status: Operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION 1: CONNECT NEWBOOK WITH ESSENTIAL BUSINESS SYSTEMS */}
      <section id="systems" className="py-20 lg:py-28 bg-slate-50/70 border-b border-gray-100">
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

          {/* 7 Essential System Cards Grid */}
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

      {/* 3. INTERACTIVE FEATURE STUDIO (4 CORE CAPABILITIES WITH LIVE SIMULATOR) */}
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

          {/* Tabs */}
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
                    <span>Request Custom Newbook Architecture</span>
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
                      newbook_live_orchestrator
                    </span>
                    <span className="text-emerald-400 font-bold">ACTIVE</span>
                  </div>

                  {activeTab === 'booking-system' && (
                    <div className="space-y-4">
                      <p className="text-xs text-slate-300">
                        Test real-time channel reservation sync:
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {['Direct Booking', 'Airbnb XML', 'Booking.com'].map((chan) => (
                          <button
                            key={chan}
                            onClick={() => handleSimulateReservation(chan)}
                            className={`p-2.5 rounded-xl text-xs font-bold border transition text-center ${
                              simReservationChannel === chan
                                ? 'bg-[#00a4d8] text-white border-[#00a4d8]'
                                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                            }`}
                          >
                            {chan}
                          </button>
                        ))}
                      </div>

                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs">
                        <div className="flex justify-between text-slate-400">
                          <span>Origin Channel:</span>
                          <span className="text-[#00a4d8]">{simReservationChannel}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Sync Status:</span>
                          <span className="text-emerald-400 font-bold">{simResStatus}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Inventory Protection:</span>
                          <span className="text-white">Active Parity Guarantee</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'api-integration' && (
                    <div className="space-y-3">
                      <p className="text-xs text-slate-300 font-mono">
                        Newbook REST/XML API Payload Preview:
                      </p>
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-[#00a4d8] overflow-x-auto">
                        <pre>{`POST /api/newbook/v3/reservations/create
{
  "siteId": "RESORT-NORTH-402",
  "category": "Deluxe Beachfront Villa",
  "arrivalDate": "2026-11-15",
  "departureDate": "2026-11-20",
  "adults": 2,
  "ratePlan": "FLEX-DIRECT-2026",
  "totalAmount": 1450.00,
  "currency": "AUD"
}`}</pre>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        ⚡ Webhook payload processed with zero drop rate across all endpoints.
                      </p>
                    </div>
                  )}

                  {activeTab === 'payment-accounting' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-300 font-bold">Stripe & Xero Settlement Engine</span>
                        <span className="text-emerald-400 font-mono">Reconciled</span>
                      </div>
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 font-mono text-xs">
                        <div className="flex justify-between text-slate-400">
                          <span>Guest Folio Balance:</span>
                          <span className="text-white font-bold">${simFolioAmount}.00</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Gateway Pre-Auth Token:</span>
                          <span className="text-[#00a4d8]">tok_nb_984129x8</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Xero Invoice Sync:</span>
                          <span className="text-emerald-400">Auto-Matched to GL 4010</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'crm-communication' && (
                    <div className="space-y-3">
                      <p className="text-xs text-slate-300">
                        Automated Guest Lifecycle Simulator:
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {['Pre-Arrival SMS', 'Check-In PIN', 'Post-Stay Review'].map((step) => (
                          <button
                            key={step}
                            onClick={() => handleJourneyTrigger(step)}
                            className={`p-2 rounded-xl text-[11px] font-bold border transition text-center ${
                              simGuestJourneyStep === step
                                ? 'bg-[#5d53a3] text-white border-[#5d53a3]'
                                : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700'
                            }`}
                          >
                            {step}
                          </button>
                        ))}
                      </div>

                      <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 font-mono text-xs">
                        <div className="flex justify-between text-slate-400">
                          <span>Journey Event:</span>
                          <span className="text-white font-bold">{simGuestJourneyStep}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Channel Route:</span>
                          <span className="text-[#00a4d8]">Twilio SMS + SendGrid</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>Guest Open Rate:</span>
                          <span className="text-emerald-400">98.4%</span>
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

      {/* 4. OUR NEWBOOK INTEGRATION PROCESS (5 STEPS) */}
      <section className="py-20 lg:py-28 bg-slate-50/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00a4d8]/10 text-[#00a4d8] text-xs font-bold tracking-widest uppercase">
              <Layers className="w-3.5 h-3.5" />
              STRUCTURED DELIVERY
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
                  <span>Phase {idx + 1} of 5</span>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-1 group-hover:text-[#00a4d8] transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE CUBIXSOL FOR NEWBOOK INTEGRATION */}
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
        eyebrow="READY TO ELEVATE YOUR NEWBOOK ECOSYSTEM?"
        title="Transform Newbook Into An Automated Hospitality Platform"
        description="Speak with our dedicated PMS integration specialists to connect online channels, automated billing, smart keyless hardware, and custom enterprise portals."
        primaryButtonText="Schedule Your Newbook Consultation"
        primaryButtonLink="/contact"
        secondaryButtonText="Explore All PMS Solutions"
        secondaryButtonLink="/pms-integration"
      />
    </div>
  );
}
