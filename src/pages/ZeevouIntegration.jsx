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
  DollarSign, FileCheck, Receipt, Landmark
} from 'lucide-react';
import { useEstimateModal } from '../context/EstimateModalContext';
import { apiFetch } from '../utils/api';
import { formatInline } from '../utils/formatText';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';
import CtaBanner from '../components/CtaBanner';
import DynamicIcon from '../components/DynamicIcon';
import { useSEO } from '../utils/seo';

// Default static data matching the document and modern PMS requirements
const DEFAULT_DATA = {
  slug: 'zeevou-integration',
  title: 'Zeevou Integration Services',
  heroEyebrow: 'ZEEVOU INTEGRATION SERVICES',
  heroTitle: 'Automate Property Management With Custom Zeevou Integrations',
  heroDesc: 'Cubixsol provides reliable Zeevou integration services to vacation rental businesses. They connect their platform with essential software systems. Our developers build customised integration solutions to simplify operations, improve automation, and create seamless communication between different business tools.',
  heroPrimaryBtnText: 'Schedule A Zeevou Consultation',
  heroSecondaryBtnText: 'Explore Architecture',
  heroBadges: [
    'Direct Booking Engine & 0% Commission Workflows',
    'Multi-Channel 2-Way Synchronization Across 200+ OTAs',
    'Automated Smart Lock & Digital Keyless Check-in',
    'Automated 3-D Secure Payments & Xero Accounting Sync',
  ],
  heroImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&h=800&q=80',

  // Section 1: Connect Zeevou With Your Business Applications
  subServicesTitle: 'Connect Zeevou With Your Business Applications',
  subServicesIntro: 'Our integration solutions help businesses create a connected technology environment that improves productivity and reduces operational complexity. We create Zeevou integrations that connect your PMS with important platforms, including:',
  subServicesItems: [
    {
      icon: 'Share2',
      tag: 'CHANNELS & OTAs',
      title: 'Online Travel Agencies & Booking Channels',
      desc: 'Online travel agencies and booking channels (Airbnb, Vrbo, Booking.com, Expedia) for real-time rates, multi-unit availability, and unified calendar management.',
      pills: ['Airbnb & Vrbo Sync', 'Booking.com API', 'Expedia Partner'],
      colorTheme: 'cyan',
    },
    {
      icon: 'Globe',
      tag: 'DIRECT ENGINE',
      title: 'Direct Booking Websites',
      desc: 'Direct booking websites and branded portals powered by Zeevou Direct to capture 0% commission direct bookings, automated guest vetting, and repeat stays.',
      pills: ['0% Commission Direct', 'Branded Booking Engine', 'Guest Vetting'],
      colorTheme: 'purple',
    },
    {
      icon: 'CreditCard',
      tag: 'PAYMENTS & SECURITY',
      title: 'Payment Processing Systems',
      desc: 'Payment processing systems (Stripe, 3-D Secure, Signable) for automated security deposits, fraud prevention, instant chargebacks handling, and digital ID checks.',
      pills: ['Stripe 3-D Secure', 'Deposit Pre-Auth', 'Digital Signatures'],
      colorTheme: 'cyan',
    },
    {
      icon: 'Workflow',
      tag: 'GUEST RELATIONSHIPS',
      title: 'Customer Relationship Management',
      desc: 'Customer relationship management platforms (HubSpot, Salesforce) for unified guest communication history, VIP guest segmentation, and repeat booking automations.',
      pills: ['HubSpot / Salesforce', 'Guest Lifetime Value', 'Automated Drips'],
      colorTheme: 'purple',
    },
    {
      icon: 'Lock',
      tag: 'SMART HARDWARE',
      title: 'Smart Lock & Property Automation Tools',
      desc: 'Smart lock and property automation tools (Yale, August, Schlage, RemoteLock, Minut) for automated time-restricted access codes and noise monitoring.',
      pills: ['Keyless Access PINs', 'Noise Monitoring', 'Remote Energy'],
      colorTheme: 'cyan',
    },
    {
      icon: 'PieChart',
      tag: 'ACCOUNTING & TAX',
      title: 'Accounting & Reporting Software',
      desc: 'Accounting and reporting software (Xero, QuickBooks) for automated invoice generation, owner statement calculations, VAT reporting, and cleaning expense logs.',
      pills: ['Xero & QuickBooks', 'Auto Invoicing', 'VAT & Tax Sync'],
      colorTheme: 'purple',
    },
    {
      icon: 'MessageSquare',
      tag: 'MARKETING & AUTOMATION',
      title: 'Marketing & Communication Applications',
      desc: 'Marketing and communication applications (Mailchimp, Klaviyo, WhatsApp API) for automated guest messaging, review booster triggers, and seasonal promotions.',
      pills: ['WhatsApp API Sync', 'Review Boosters', 'SMS Automation'],
      colorTheme: 'cyan',
    },
  ],

  // Section 2: Zeevou Booking Channel Integration Services
  businessTypesTitle: 'Zeevou Booking Channel Integration Services',
  businessTypesIntro: 'We develop Zeevou channel integrations that help property managers maintain accurate booking information across different platforms. A connected booking system allows businesses to manage multiple rental channels while maintaining consistent property information. Our solutions support:',
  businessTypesItems: [
    {
      title: 'Reservation Data Synchronisation',
      desc: 'Sub-second two-way booking flow that captures new reservations, modifications, cancellations, and extensions instantly across all distribution channels.',
      metric: '< 1 sec',
      metricLabel: 'Sync Speed',
    },
    {
      title: 'Availability and Calendar Updates',
      desc: 'Instant calendar parity across OTAs and direct websites to completely eliminate double bookings and maximize multi-unit occupancy.',
      metric: '100%',
      metricLabel: 'Parity Guarantee',
    },
    {
      title: 'Listing Information Management',
      desc: 'Centralized distribution of property descriptions, photos, house rules, pricing rules, and check-in instructions to all connected channels.',
      metric: '200+ OTAs',
      metricLabel: 'Channel Reach',
    },
    {
      title: 'Guest Detail Transfer',
      desc: 'Automated transfer of guest profiles, verified contact details, arrival times, and special requests directly into Zeevou Central Calendar.',
      metric: '360°',
      metricLabel: 'Guest Profile',
    },
    {
      title: 'Booking Status Automation',
      desc: 'Automated status triggers for ID verification completion, deposit holds, payment settlements, and turnover cleaning scheduling.',
      metric: 'Automated',
      metricLabel: 'Status Pipeline',
    },
  ],

  // Section 3: Zeevou API Integration Development
  techTitle: 'Zeevou API Integration Development',
  techDesc: 'Cubixsol offers custom Zeevou API integration services for businesses that need advanced software connectivity. Our developers build secure API-based solutions that let Zeevou communicate with external applications. Our Zeevou API integration services include:',
  tech: [
    'Custom application development',
    'Third-party software connections',
    'Automated workflow creation',
    'Data synchronisation solutions',
    'API testing and maintenance',
  ],

  // Section 4: Zeevou Direct Booking Integration
  directBookingTitle: 'Zeevou Direct Booking Integration',
  directBookingIntro: 'Direct bookings allow property businesses to reduce dependency on third-party marketplaces and build stronger customer relationships. Cubixsol helps connect Zeevou with direct booking platforms to create smoother reservation experiences. Our direct booking integration solutions support:',
  directBookingItems: [
    {
      title: 'Website Booking Connections',
      desc: 'Seamless iframe, custom React component, or Headless API booking engine embedded directly on your brand website.',
      icon: 'Globe',
    },
    {
      title: 'Automated Reservation Processing',
      desc: 'Instant real-time booking confirmation without manual host intervention, saving 15-20% in OTA commissions.',
      icon: 'Zap',
    },
    {
      title: 'Guest Information Management',
      desc: 'Direct collection of verified guest emails, phone numbers, and stay history for proprietary remarketing.',
      icon: 'Users',
    },
    {
      title: 'Availability Synchronisation',
      desc: 'Live availability blocks pushed immediately across all channels the exact moment a direct guest reserves.',
      icon: 'RefreshCw',
    },
    {
      title: 'Booking Confirmation Workflows',
      desc: 'Automated branded email confirmation, digital contract sign-off, and instant 3-D secure payment collection.',
      icon: 'FileCheck',
    },
  ],

  // Section 5: Zeevou Smart Lock And Automation Integration
  smartLockTitle: 'Zeevou Smart Lock And Automation Integration',
  smartLockIntro: 'Smart technology plays an important role in modern hospitality operations. Cubixsol connects Zeevou with smart lock systems and automation tools to support efficient property access management. Our solutions can include:',
  smartLockItems: [
    { title: 'Automated Access Code Creation', desc: 'Dynamic time-restricted 6-digit PIN codes generated strictly for reservation stay windows.' },
    { title: 'Digital Check-in Workflows', desc: 'Automated pre-arrival ID upload, digital rental agreement e-signature, and check-in confirmation.' },
    { title: 'Smart Property Connections', desc: 'Seamless API bridging with Yale, August, Schlage, and RemoteLock hardware controllers.' },
    { title: 'Guest Arrival Automation', desc: 'Real-time alert dispatch to property managers the second the guest unlocks the front door.' },
    { title: 'Remote Access Management', desc: 'Temporary access codes generated for housekeeping contractors, cleaners, and maintenance teams.' },
  ],

  // Section 6: Zeevou Payment And Accounting Integration
  paymentAccountingTitle: 'Zeevou Payment And Accounting Integration',
  paymentAccountingIntro: 'Financial management becomes easier when PMS platforms connect with payment and accounting systems. Cubixsol develops Zeevou integrations that organise transactions and financial information. Our services include:',
  paymentAccountingItems: [
    {
      title: 'Payment Gateway Connections',
      desc: 'PCI-DSS Level 1 compliant gateway integration with Stripe and 3-D Secure for automated payments and security deposit holds.',
      icon: 'CreditCard',
      tag: 'PAYMENT GATEWAYS',
    },
    {
      title: 'Invoice Automation',
      desc: 'Automatic generation and dispatch of branded VAT/GST tax invoices directly to guests and corporate clients.',
      icon: 'Receipt',
      tag: 'AUTO INVOICING',
    },
    {
      title: 'Accounting Software Integration',
      desc: 'Bi-directional transaction synchronization with Xero and QuickBooks Online for seamless bookkeeping without manual entries.',
      icon: 'Landmark',
      tag: 'XERO & QUICKBOOKS',
    },
    {
      title: 'Transaction Data Synchronisation',
      desc: 'Real-time reconciliation of nightly room rates, cleaning fees, channel commission deductions, and merchant fees.',
      icon: 'PieChart',
      tag: 'RECONCILIATION',
    },
    {
      title: 'Financial Reporting Solutions',
      desc: 'Automated monthly owner statements, yield management analytics, and multi-unit portfolio revenue reports.',
      icon: 'BarChart3',
      tag: 'FINANCIAL BI',
    },
  ],

  // Section 7: Our Zeevou Integration Process
  serviceProcessTitle: 'Our Zeevou Integration Process',
  serviceProcessIntro: 'Cubixsol follows a professional approach to deliver effective Zeevou integration solutions with zero downtime and reliable performance:',
  serviceProcessSteps: [
    {
      stepNumber: '01',
      title: 'Requirement Discovery',
      desc: 'Our team reviews your business model, property portfolio, software environment, and integration goals to design the optimal plan.',
      points: ['Portfolio Auditing', 'Tech Stack Evaluation', 'Milestone Roadmapping'],
    },
    {
      stepNumber: '02',
      title: 'Solution Design',
      desc: 'We prepare a technical plan, API mapping architecture, and webhook event schema based on your required features.',
      points: ['API Architecture Blueprint', 'Webhook Event Schemas', 'Security & Token Setup'],
    },
    {
      stepNumber: '03',
      title: 'Development And Configuration',
      desc: 'Our developers build the required custom connections, automation workflows, serverless event handlers, and data synchronization bridges.',
      points: ['Connector Development', 'Bidirectional Sync Engine', 'Fail-safe Retry Queues'],
    },
    {
      stepNumber: '04',
      title: 'Quality Testing',
      desc: 'We verify system performance, stress-test high concurrency webhook traffic, security compliance, and data accuracy before deployment.',
      points: ['End-to-End Sandbox Testing', 'Edge-case Validation', 'Zero-Downtime Rollout'],
    },
    {
      stepNumber: '05',
      title: 'Deployment And Support',
      desc: 'Our team assists with implementation, 24/7 uptime monitoring, Zeevou API updates, and ongoing technical requirements.',
      points: ['24/7 Priority Support', 'Proactive Uptime Monitoring', 'Continuous Feature Updates'],
    },
  ],

  // Section 8: Why Choose Cubixsol For Zeevou Integration?
  whyChooseTitle: 'Why Choose Cubixsol For Zeevou Integration?',
  whyChooseIntro: 'Cubixsol delivers customised PMS integration services for hospitality and vacation rental businesses. Our developers create secure, scalable, and efficient solutions to connect your systems and improve daily operations. Whether you need booking synchronisation, API development, direct booking integration, or automation solutions, Cubixsol provides Zeevou integrations designed around your business needs.',
  whyChooseItems: [
    {
      title: 'Deep PMS & Zeevou Architecture Mastery',
      desc: 'Specialized expertise across Zeevou Direct Bookings, channel management, 3-D secure guest vetting, and multi-unit hospitality ops.',
      metric: '10+ Yrs',
      metricLabel: 'PMS Expertise',
    },
    {
      title: 'Enterprise Security & 3-D Secure Compliance',
      desc: 'Bank-grade TLS encryption, PCI-DSS payment pathways, tokenized transactions, and automated guest ID verification checks.',
      metric: '256-bit',
      metricLabel: 'Encryption',
    },
    {
      title: 'High-Throughput Scalable Microservices',
      desc: 'Engineered for high booking volume concurrency during peak seasons without dropped webhooks or calendar sync lag.',
      metric: '99.99%',
      metricLabel: 'SLA Uptime',
    },
    {
      title: 'Direct Booking Revenue Maximization',
      desc: 'Bespoke booking engines that empower hosts to capture direct guest payments with 0% OTA commissions and automated invoices.',
      metric: '0% Fee',
      metricLabel: 'Direct Bookings',
    },
  ],

  // Section 9: Frequently Asked Questions
  faqs: [
    {
      q: 'What Zeevou integration services does Cubixsol provide?',
      a: 'Cubixsol creates custom Zeevou integrations with booking platforms, payment systems, CRM tools, smart devices, and other business applications.',
    },
    {
      q: 'Can Zeevou integrate with booking channels?',
      a: 'Yes, Zeevou can connect with different booking platforms, and Cubixsol can develop solutions to improve synchronisation and automation.',
    },
    {
      q: 'Does Cubixsol provide Zeevou API integration?',
      a: 'Yes, our developers create custom API integrations that connect Zeevou with external software systems.',
    },
    {
      q: 'Can Zeevou connect with smart lock systems?',
      a: 'Yes, Zeevou can integrate with smart access solutions to support automated entry and improved guest experiences.',
    },
    {
      q: 'How can Zeevou integration improve property management?',
      a: 'Zeevou integration helps businesses automate workflows, reduce manual processes, and manage rental operations more efficiently.',
    },
  ],

  seo: {
    metaTitle: 'Zeevou Integration Services | Custom API, Direct Booking & Channel Solutions | Cubixsol',
    metaDescription: 'Cubixsol provides expert Zeevou integration services. Connect Zeevou PMS with OTAs, direct booking websites, smart locks, Xero, and custom APIs.',
    keywords: 'Zeevou integration services, Zeevou API development, Zeevou direct booking integration, Zeevou channel manager, PMS integration vacation rentals',
  },
};

export default function ZeevouIntegration() {
  const { openModal } = useEstimateModal();
  const [data, setData] = useState(DEFAULT_DATA);
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  // Live Interactive Zeevou Direct Booking & 0% Commission Simulator State
  const [simState, setSimState] = useState({
    bookingActive: true,
    channelSource: 'Zeevou Direct Booking Engine (0% Fee)',
    guestName: 'Alexander Vance',
    propertyName: 'Mayfair Luxury Penthouse Suite',
    checkinDate: 'Nov 12 - Nov 17',
    totalPrice: '$3,200',
    otaCommissionSaved: '$480 Saved (0% OTA Fee)',
    smartLockPin: '694820',
    guestVettingStatus: '3-D Secure Verified & Signed',
    xeroInvoiceStatus: 'Invoice #ZV-8492 Synced to Xero',
    lastEvent: 'Direct booking confirmed via Zeevou Engine. $480 in OTA commissions saved. Smart Lock PIN 694820 dispatched.',
    isSyncing: false,
  });

  // SEO Metadata Hook
  useSEO(
    data.seo?.metaTitle || data.title,
    data.seo?.metaDescription || data.heroDesc,
    data.seo?.keywords,
    data.heroImage
  );

  // Dynamic MongoDB Synchronization & Admin Dashboard Integration
  useEffect(() => {
    apiFetch('services/zeevou-integration')
      .then((res) => {
        if (res && (res.title || res.heroSubtitle || res.desc)) {
          setData((prev) => ({
            ...prev,
            ...res,
            title: res.title || prev.title,
            heroTitle: res.heroSubtitle || res.title || prev.heroTitle,
            heroDesc: res.longDesc || res.desc || prev.heroDesc,
            subServicesTitle: res.subServicesTitle || prev.subServicesTitle,
            subServicesIntro: res.subServicesIntro || prev.subServicesIntro,
            subServicesItems: res.subServicesItems?.length > 0
              ? res.subServicesItems.map((item, idx) => ({
                  ...prev.subServicesItems[idx % prev.subServicesItems.length],
                  title: item.title,
                  desc: item.desc,
                }))
              : prev.subServicesItems,
            businessTypesTitle: res.businessTypesTitle || prev.businessTypesTitle,
            businessTypesIntro: res.businessTypesIntro || prev.businessTypesIntro,
            businessTypesItems: res.businessTypesItems?.length > 0
              ? res.businessTypesItems.map((item, idx) => ({
                  ...prev.businessTypesItems[idx % prev.businessTypesItems.length],
                  title: item.title,
                  desc: item.desc,
                }))
              : prev.businessTypesItems,
            techTitle: res.techTitle || prev.techTitle,
            techDesc: res.techDesc || prev.techDesc,
            tech: res.tech?.length > 0 ? res.tech : prev.tech,
            serviceProcessTitle: res.serviceProcessTitle || prev.serviceProcessTitle,
            serviceProcessIntro: res.serviceProcessIntro || prev.serviceProcessIntro,
            serviceProcessSteps: res.serviceProcessSteps?.length > 0
              ? res.serviceProcessSteps.map((s, idx) => ({
                  stepNumber: s.stepNumber || `0${idx + 1}`,
                  title: s.title,
                  desc: s.desc,
                  points: s.points || prev.serviceProcessSteps[idx % prev.serviceProcessSteps.length]?.points || [],
                }))
              : prev.serviceProcessSteps,
            whyChooseTitle: res.whyChooseTitle || prev.whyChooseTitle,
            whyChooseIntro: res.whyChooseIntro || prev.whyChooseIntro,
            whyChooseItems: res.whyChooseItems?.length > 0
              ? res.whyChooseItems.map((w, idx) => ({
                  ...prev.whyChooseItems[idx % prev.whyChooseItems.length],
                  title: w.title,
                  desc: w.desc,
                }))
              : prev.whyChooseItems,
            faqs: res.faqs?.length > 0 ? res.faqs : prev.faqs,
          }));
        }
      })
      .catch((err) => {
        console.warn('Using default static Zeevou integration data:', err);
      });
  }, []);

  // Simulator actions
  const triggerDirectBooking = () => {
    setSimState((prev) => ({ ...prev, isSyncing: true, lastEvent: 'Processing Direct Booking via Zeevou Engine...' }));
    setTimeout(() => {
      const guests = ['Lady Evelyn Cross', 'Marcus Brody', 'Clara Henderson', 'Liam Gallagher', 'Victoria Sterling'];
      const properties = ['Kensington Royal Townhouse #3', 'Edinburgh Old Town Suite', 'Cotswolds Country Manor', 'Canary Wharf Executive Flat'];
      const randomGuest = guests[Math.floor(Math.random() * guests.length)];
      const randomProp = properties[Math.floor(Math.random() * properties.length)];
      const randomPin = Math.floor(100000 + Math.random() * 900000).toString();
      const randomInv = Math.floor(8000 + Math.random() * 2000).toString();

      setSimState({
        bookingActive: true,
        channelSource: 'Zeevou Direct (0% Commission)',
        guestName: randomGuest,
        propertyName: randomProp,
        checkinDate: 'Dec 01 - Dec 06',
        totalPrice: '$2,950',
        otaCommissionSaved: '$442 Saved (0% OTA Fee)',
        smartLockPin: randomPin,
        guestVettingStatus: '3-D Secure ID Verified & Digital Agreement Signed',
        xeroInvoiceStatus: `Invoice #ZV-${randomInv} Synced to Xero`,
        lastEvent: `Direct booking received for ${randomGuest}. 0% commission deducted. Automated VAT invoice created & Smart Lock code ${randomPin} generated.`,
        isSyncing: false,
      });
    }, 650);
  };

  const triggerGuestVetting = () => {
    setSimState((prev) => ({
      ...prev,
      guestVettingStatus: 'Guest Passport Verified via 3-D Secure + $500 Deposit Pre-Auth',
      lastEvent: `Zeevou Security: 3-D Secure verification passed for ${prev.guestName}. Security deposit held. Digital key enabled.`,
    }));
  };

  return (
    <div className="min-h-screen bg-white text-ink selection:bg-[#00a4d8] selection:text-white overflow-x-hidden font-sans">
      
      {/* ================= 1. HERO SECTION (Cubixsol Midnight & Brand Cyan/Purple Theme) ================= */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 bg-gradient-to-br from-slate-950 via-[#071326] to-[#040e1c] text-white">
        
        {/* Brand Glow Meshes (Cyan #00a4d8 & Purple #5d53a3) */}
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#00a4d8]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-[#5d53a3]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link
              to="/all-services"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition group"
            >
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" /> Back to Services
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
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00a4d8]/15 border border-[#00a4d8]/30 text-cyan-300 text-xs font-bold uppercase tracking-wider shadow-sm backdrop-blur-sm"
              >
                <Radio className="w-3.5 h-3.5 text-[#00a4d8] animate-pulse" />
                <span>{data.heroEyebrow || 'ZEEVOU INTEGRATION SERVICES'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </motion.div>

              {/* Main H1 Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.18]"
              >
                Automate Property Management With <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a4d8] via-cyan-300 to-[#5d53a3]">Custom Zeevou Integrations</span>
              </motion.h1>

              {/* Hero Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal"
              >
                {data.heroDesc}
              </motion.p>

              {/* Trust Badges Grid */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2"
              >
                {data.heroBadges.map((badge, idx) => (
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

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-wrap items-center gap-4 pt-4"
              >
                <button
                  type="button"
                  onClick={() => openModal({ service: 'Zeevou Integration Services' })}
                  className="btn-primary text-sm sm:text-base px-7 py-3.5"
                >
                  <span>{data.ctaPrimaryText || 'Schedule A Zeevou Consultation'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#simulation-section"
                  className="px-6 py-3.5 rounded-lg font-semibold text-sm sm:text-base text-slate-200 bg-white/10 hover:bg-white/15 border border-white/20 transition-all flex items-center gap-2"
                >
                  <Cpu className="w-4 h-4 text-[#00a4d8]" />
                  <span>Explore Live Architecture</span>
                </a>
              </motion.div>
            </div>

            {/* Right Column: Interactive Zeevou Direct Booking & 0% Commission Simulator */}
            <div className="lg:col-span-5" id="simulation-section">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative rounded-2xl bg-gradient-to-b from-[#0a1628]/95 to-[#040e1c]/95 border border-[#00a4d8]/30 shadow-[0_10px_40px_rgba(0,164,216,0.15)] backdrop-blur-xl p-5 sm:p-6 overflow-hidden"
              >
                {/* Header of Visualizer */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-xs font-mono text-slate-400 ml-1">zeevou_direct_engine.v2</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>0% COMMISSION REVOLUTION</span>
                  </div>
                </div>

                {/* Central Zeevou Hub */}
                <div className="py-4 space-y-4">
                  {/* Property Banner */}
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-mono tracking-wider text-[#00a4d8] font-bold">Active Listing</div>
                      <div className="text-sm font-semibold text-white">{simState.propertyName}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Channel Source</div>
                      <div className="text-xs font-bold text-emerald-400">{simState.channelSource}</div>
                    </div>
                  </div>

                  {/* 4 Connected Nodes Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    
                    {/* Node 1: Direct Commission Saved */}
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <DollarSign className="w-3.5 h-3.5" /> Host Savings
                        </span>
                        <span className="text-[10px] text-emerald-400 font-mono">0% Fee</span>
                      </div>
                      <div className="text-[11px] text-white font-mono font-bold">{simState.otaCommissionSaved}</div>
                    </div>

                    {/* Node 2: Smart Lock PIN */}
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#a594f9] font-bold flex items-center gap-1">
                          <Lock className="w-3 h-3 text-[#5d53a3]" /> Keyless PIN
                        </span>
                        <span className="text-[10px] text-cyan-300 font-mono">{simState.smartLockPin}</span>
                      </div>
                      <div className="text-[11px] text-slate-300 font-mono">Zeevou Smart Lock</div>
                    </div>

                    {/* Node 3: 3-D Secure Vetting */}
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-cyan-300 font-bold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-[#00a4d8]" /> Guest Vetting
                        </span>
                        <span className="text-[10px] text-emerald-400 font-mono">3-D Secure</span>
                      </div>
                      <div className="text-[11px] text-slate-300 font-mono truncate">{simState.guestName}</div>
                    </div>

                    {/* Node 4: Xero Accounting Sync */}
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#00a4d8] font-bold flex items-center gap-1">
                          <Landmark className="w-3.5 h-3.5 text-[#00a4d8]" /> Accounting
                        </span>
                        <span className="text-[10px] text-cyan-300 font-mono">Xero Live</span>
                      </div>
                      <div className="text-[11px] text-slate-300 font-mono truncate">{simState.xeroInvoiceStatus}</div>
                    </div>
                  </div>

                  {/* Live Terminal Output */}
                  <div className="p-3 rounded-xl bg-black/90 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-500 text-[10px]">
                      <Terminal className="w-3 h-3 text-[#00a4d8]" />
                      <span>LIVE ZEEVOU EVENT STREAM</span>
                    </div>
                    <div className="text-cyan-300 text-[11px] leading-relaxed break-words">
                      {simState.isSyncing ? (
                        <span className="flex items-center gap-2 text-white">
                          <RefreshCw className="w-3 h-3 animate-spin text-[#00a4d8]" />
                          Processing Zeevou Direct Booking API payload...
                        </span>
                      ) : (
                        `> ${simState.lastEvent}`
                      )}
                    </div>
                  </div>

                  {/* Simulation Controls */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      type="button"
                      disabled={simState.isSyncing}
                      onClick={triggerDirectBooking}
                      className="px-3 py-2 rounded-lg bg-[#00a4d8]/20 hover:bg-[#00a4d8]/30 border border-[#00a4d8]/40 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Simulate Direct 0% Booking</span>
                    </button>

                    <button
                      type="button"
                      onClick={triggerGuestVetting}
                      className="px-3 py-2 rounded-lg bg-[#5d53a3]/30 hover:bg-[#5d53a3]/40 border border-[#5d53a3]/50 text-purple-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-300" />
                      <span>Execute 3-D Secure Vetting</span>
                    </button>
                  </div>
                </div>

                {/* Footer Metrics */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Channel Parity: <strong className="text-emerald-400">200+ OTAs Synced</strong></span>
                  <span>OTA Commission: <strong className="text-emerald-400">0% on Direct</strong></span>
                  <span>API Security: <strong className="text-[#a594f9]">PCI-DSS Level 1</strong></span>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 2. SECTION 1: CONNECT ZEEVOU WITH YOUR BUSINESS APPLICATIONS ================= */}
      <section className="py-20 md:py-24 bg-slate-50/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/20 text-[#00a4d8] text-xs font-bold uppercase tracking-wider">
              <Workflow className="w-3.5 h-3.5" />
              <span>ECOSYSTEM INTEGRATIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              {data.subServicesTitle || 'Connect Zeevou With Your Business Applications'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {data.subServicesIntro || 'Our integration solutions help businesses create a connected technology environment that improves productivity and reduces operational complexity. We create Zeevou integrations that connect your PMS with important platforms, including:'}
            </p>
          </div>

          {/* 7 High-Converting Cards in Clean Brand White Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.subServicesItems.map((item, idx) => {
              const IconComp = idx === 0 ? Share2 : idx === 1 ? Globe : idx === 2 ? CreditCard : idx === 3 ? Workflow : idx === 4 ? Lock : idx === 5 ? PieChart : MessageSquare;
              const isCyan = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="group relative rounded-2xl bg-white border border-gray-100 hover:border-[#00a4d8]/40 shadow-card hover:shadow-soft p-6 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                        isCyan ? 'bg-[#00a4d8]/10 text-[#00a4d8]' : 'bg-[#5d53a3]/10 text-[#5d53a3]'
                      }`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        {item.tag || `MODULE 0${idx + 1}`}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-ink group-hover:text-[#00a4d8] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-2 font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-5 mt-5 border-t border-gray-100">
                    <div className="flex flex-wrap gap-1.5">
                      {(item.pills || ['2-Way Sync', 'Automated', 'Zeevou API']).map((pill, pIdx) => (
                        <span
                          key={pIdx}
                          className="text-[10px] font-semibold px-2.5 py-1 rounded-md bg-slate-50 border border-gray-200 text-slate-700"
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= 3. SECTION 2: ZEEVOU BOOKING CHANNEL INTEGRATION SERVICES ================= */}
      <section className="py-20 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Text Details & Feature Breakdown */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/20 text-[#00a4d8] text-xs font-bold uppercase tracking-wider">
                <Share2 className="w-3.5 h-3.5" />
                <span>200+ OTA CHANNEL SYNCHRONIZATION</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
                {data.businessTypesTitle || 'Zeevou Booking Channel Integration Services'}
              </h2>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {data.businessTypesIntro || 'We develop Zeevou channel integrations that help property managers maintain accurate booking information across different platforms. A connected booking system allows businesses to manage multiple rental channels while maintaining consistent property information.'}
              </p>

              <div className="space-y-3 pt-2">
                {data.businessTypesItems.map((feature, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50/80 border border-gray-200/80 hover:border-[#00a4d8]/40 transition-colors flex items-start gap-3.5"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#00a4d8]/15 border border-[#00a4d8]/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-[#00a4d8]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm sm:text-base font-bold text-ink">{feature.title}</h4>
                        {feature.metric && (
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white text-[#00a4d8] border border-[#00a4d8]/30 font-bold">
                            {feature.metric}
                          </span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Zeevou Channel Parity Matrix */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl bg-gradient-to-br from-slate-950 via-[#071326] to-[#040e1c] border border-slate-800 p-6 sm:p-8 space-y-6 text-white shadow-xl">
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 text-[#00a4d8] animate-spin" />
                      Zeevou 2-Way Channel Parity Hub
                    </h3>
                    <p className="text-xs text-slate-400">Direct booking priority + 200+ OTA calendar sync</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#00a4d8]/15 border border-[#00a4d8]/30 text-cyan-300 text-xs font-mono">
                    200+ OTAs
                  </span>
                </div>

                {/* Channel Matrix */}
                <div className="space-y-3">
                  {[
                    { channel: 'Zeevou Direct Booking Engine', rate: '$580/night', status: '0% OTA Fee (Host Keeps 100%)', sync: '3-D Secure Verified', isHighlight: true },
                    { channel: 'Airbnb Superhost XML', rate: '$640/night', status: 'Rate Markup Enforced', sync: 'Calendar Blocked Instant' },
                    { channel: 'Vrbo Direct Connection', rate: '$640/night', status: 'Two-Way Availability Sync', sync: '0 Double Bookings' },
                    { channel: 'Booking.com Premier Partner', rate: '$640/night', status: 'Automated Guest Messaging', sync: 'Instant Check-in Code' },
                  ].map((ota, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
                        ota.isHighlight
                          ? 'bg-gradient-to-r from-[#00a4d8]/20 to-[#5d53a3]/20 border-[#00a4d8]/50'
                          : 'bg-slate-900/80 border-slate-800'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${ota.isHighlight ? 'bg-emerald-400 animate-ping' : 'bg-[#00a4d8]'}`} />
                          <span className="text-xs sm:text-sm font-semibold text-white">{ota.channel}</span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{ota.status} &bull; <span className="text-[#00a4d8] font-mono font-bold">{ota.rate}</span></div>
                      </div>
                      <div className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-mono bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{ota.sync}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Benchmark Metrics */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800">
                  <div className="text-center p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="text-lg font-bold text-white font-mono">0.3s</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Sync Latency</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="text-lg font-bold text-emerald-400 font-mono">0%</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Direct Booking Fee</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="text-lg font-bold text-[#00a4d8] font-mono">100%</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Parity Reliability</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 4. SECTION 3: ZEEVOU API INTEGRATION DEVELOPMENT ================= */}
      <section className="py-20 md:py-24 bg-slate-50/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5d53a3]/10 border border-[#5d53a3]/20 text-[#5d53a3] text-xs font-bold uppercase tracking-wider">
              <Code2 className="w-3.5 h-3.5" />
              <span>CUSTOM DEVELOPER ARCHITECTURE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              {data.techTitle || 'Zeevou API Integration Development'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {data.techDesc || 'Cubixsol offers custom Zeevou API integration services for businesses that need advanced software connectivity. Our developers build secure API-based solutions that let Zeevou communicate with external applications.'}
            </p>
          </div>

          {/* 5 Core API Development Capabilities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 mb-12">
            {[
              { title: 'Custom App Development', desc: 'Bespoke booking portals, mobile apps, and host dashboards connected via Zeevou Open REST API.', icon: Code2 },
              { title: 'Third-party Connections', desc: 'Seamless API bridging between Zeevou and external CRMs, OTAs, POS hardware, & Xero ledgers.', icon: Share2 },
              { title: 'Automated Workflow Creation', desc: 'Serverless event triggers for auto-messaging, security deposit processing, and turnover dispatch.', icon: Zap },
              { title: 'Data Synchronisation', desc: 'High-speed two-way data pipelines for guest records, occupancy metrics, financial ledgers, and rates.', icon: RefreshCw },
              { title: 'API Testing & Maintenance', desc: 'Proactive API monitoring, OAuth2 token rotation, rate limit handling, and Zeevou version updates.', icon: Sparkles },
            ].map((srv, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-gray-100 hover:border-[#00a4d8]/40 shadow-card hover:shadow-soft transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-[#00a4d8]/10 border border-[#00a4d8]/20 flex items-center justify-center text-[#00a4d8] mb-4">
                    <srv.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-ink">{srv.title}</h3>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">{srv.desc}</p>
                </div>
                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center text-[11px] font-bold text-[#00a4d8]">
                  <span>Guaranteed SLA</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Zeevou Webhook Payload Viewer */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-950 via-[#071326] to-[#040e1c] border border-slate-800 p-5 sm:p-6 font-mono text-xs text-slate-300 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#00a4d8]/20 text-cyan-300 font-bold">POST /v1/zeevou/webhook</span>
                <span className="text-slate-400">event: booking.confirmed</span>
              </div>
              <div className="text-slate-400 text-[11px]">3-D Secure HMAC Verified</div>
            </div>
            <pre className="mt-4 overflow-x-auto text-[11px] sm:text-xs text-slate-300 leading-relaxed font-mono">
{`{
  "event": "booking.confirmed",
  "bookingUid": "zv_book_94821038x",
  "unitId": "unit_mayfair_penthouse_01",
  "channelType": "DIRECT_BOOKING_WEBSITE",
  "channelCommission": 0.00,
  "guest": {
    "fullName": "Alexander Vance",
    "email": "alexander.v@example.com",
    "phone": "+44 20 7946 0912",
    "vettingStatus": "3D_SECURE_PASSED"
  },
  "financials": {
    "totalAmount": 3200.00,
    "currency": "GBP",
    "vatAmount": 533.33,
    "damageDepositPreAuth": 500.00
  },
  "zeevouAutomations": [
    { "target": "smartlock", "action": "set_pin_code", "pin": "694820", "status": "ACTIVE" },
    { "target": "xero", "action": "create_sales_invoice", "invoiceNumber": "INV-ZV-8492", "status": "SYNCED" },
    { "target": "housekeeping", "action": "schedule_turnover", "status": "DISPATCHED" }
  ]
}`}
            </pre>
          </div>

        </div>
      </section>

      {/* ================= 5. SECTION 4: ZEEVOU DIRECT BOOKING INTEGRATION ================= */}
      <section className="py-20 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/20 text-[#00a4d8] text-xs font-bold uppercase tracking-wider">
              <Globe className="w-3.5 h-3.5" />
              <span>DIRECT BOOKING REVOLUTION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              {data.directBookingTitle || 'Zeevou Direct Booking Integration'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {data.directBookingIntro || 'Direct bookings allow property businesses to reduce dependency on third-party marketplaces and build stronger customer relationships. Cubixsol helps connect Zeevou with direct booking platforms to create smoother reservation experiences.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {data.directBookingItems.map((item, idx) => {
              const IconComp = idx === 0 ? Globe : idx === 1 ? Zap : idx === 2 ? Users : idx === 3 ? RefreshCw : FileCheck;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-50/80 border border-gray-200/80 hover:border-[#00a4d8]/40 shadow-card transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-[#00a4d8]/10 border border-[#00a4d8]/20 flex items-center justify-center text-[#00a4d8]">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-ink">{item.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed font-normal">{item.desc}</p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-gray-200 flex items-center gap-1.5 text-[11px] font-semibold text-[#00a4d8]">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>0% Fee Direct Booking</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= 6. SECTION 5: ZEEVOU SMART LOCK AND AUTOMATION INTEGRATION ================= */}
      <section className="py-20 md:py-24 bg-slate-50/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Smart Lock Feature Showcase */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5d53a3]/10 border border-[#5d53a3]/20 text-[#5d53a3] text-xs font-bold uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5" />
                <span>KEYLESS ACCESS &amp; SMART OPERATIONS</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
                {data.smartLockTitle || 'Zeevou Smart Lock And Automation Integration'}
              </h2>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {data.smartLockIntro || 'Smart technology plays an important role in modern hospitality operations. Cubixsol connects Zeevou with smart lock systems and automation tools to support efficient property access management.'}
              </p>

              <div className="space-y-3 pt-2">
                {data.smartLockItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-gray-200/80 hover:border-[#00a4d8]/40 shadow-card transition-colors"
                  >
                    <div className="w-6 h-6 rounded-lg bg-[#00a4d8]/15 border border-[#00a4d8]/30 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-[#00a4d8]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-ink">{item.title}</h4>
                      <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => openModal({ service: 'Zeevou Smart Lock Integration' })}
                  className="btn-primary text-sm px-6 py-3"
                >
                  <span>Connect Your Smart Locks</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Smart Lock Visualizer */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-[#071326] to-[#040e1c] border border-[#00a4d8]/30 p-6 sm:p-8 space-y-6 shadow-xl text-white">
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#00a4d8]/20 border border-[#00a4d8]/40 flex items-center justify-center text-cyan-300">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Zeevou Keyless Access Hub</h3>
                      <p className="text-xs text-slate-400">Yale &bull; August &bull; Schlage &bull; RemoteLock</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#00a4d8]/15 text-cyan-300 text-xs font-mono border border-[#00a4d8]/30 font-bold">
                    CONNECTED
                  </span>
                </div>

                {/* Keypad UI */}
                <div className="p-6 rounded-2xl bg-black/60 border border-slate-800 text-center space-y-4">
                  <div className="text-xs uppercase font-mono text-slate-400">Automated Dynamic PIN Code</div>
                  <div className="inline-block px-6 py-3 rounded-xl bg-slate-900 border border-[#00a4d8]/40 font-mono text-3xl font-black text-cyan-300 tracking-[0.3em] shadow-inner">
                    {simState.smartLockPin}
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Synchronized with Zeevou 3-D Secure Check-In Time</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-1">
                    <div className="font-semibold text-white flex items-center gap-1.5">
                      <Wifi className="w-3.5 h-3.5 text-[#00a4d8]" />
                      <span>Remote Lock Control</span>
                    </div>
                    <div className="text-slate-400 text-[11px]">Instant unlock via Zeevou dashboard for maintenance or cleaners.</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-1">
                    <div className="font-semibold text-white flex items-center gap-1.5">
                      <Bell className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Arrival Alerts</span>
                    </div>
                    <div className="text-slate-400 text-[11px]">Instant alert sent when guest enters PIN code at property entrance.</div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={triggerDirectBooking}
                    className="w-full py-3 rounded-lg font-bold text-xs sm:text-sm bg-primary-gradient hover:opacity-95 text-white flex items-center justify-center gap-2 transition-all shadow-soft"
                  >
                    <RefreshCw className={`w-4 h-4 ${simState.isSyncing ? 'animate-spin' : ''}`} />
                    <span>Generate New Guest PIN Code</span>
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 7. SECTION 6: ZEEVOU PAYMENT AND ACCOUNTING INTEGRATION ================= */}
      <section className="py-20 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/20 text-[#00a4d8] text-xs font-bold uppercase tracking-wider">
              <CreditCard className="w-3.5 h-3.5" />
              <span>FINANCIAL &amp; ACCOUNTING PLATFORMS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              {data.paymentAccountingTitle || 'Zeevou Payment And Accounting Integration'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {data.paymentAccountingIntro || 'Financial management becomes easier when PMS platforms connect with payment and accounting systems. Cubixsol develops Zeevou integrations that organise transactions and financial information.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {data.paymentAccountingItems.map((item, idx) => {
              const IconComp = idx === 0 ? CreditCard : idx === 1 ? Receipt : idx === 2 ? Landmark : idx === 3 ? PieChart : BarChart3;
              const isCyan = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-7 rounded-2xl bg-slate-50/80 border border-gray-200/80 hover:border-[#00a4d8]/40 shadow-card transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isCyan ? 'bg-[#00a4d8]/10 text-[#00a4d8]' : 'bg-[#5d53a3]/10 text-[#5d53a3]'
                      }`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-full bg-white text-slate-700 border border-gray-200">
                        {item.tag}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-ink">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed font-normal">{item.desc}</p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-200 flex items-center gap-2 text-xs font-semibold text-[#00a4d8]">
                    <CheckCircle className="w-4 h-4" />
                    <span>Zeevou Financial Data Bridge</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= 8. SECTION 7: OUR ZEEVOU INTEGRATION PROCESS ================= */}
      <section className="py-20 md:py-24 bg-slate-50/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5d53a3]/10 border border-[#5d53a3]/20 text-[#5d53a3] text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>STRUCTURED DELIVERY METHODOLOGY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              {data.serviceProcessTitle || 'Our Zeevou Integration Process'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {data.serviceProcessIntro || 'Cubixsol follows a professional approach to deliver effective Zeevou integration solutions with zero downtime and reliable performance:'}
            </p>
          </div>

          {/* 5-Step Process Timeline Pathway in Clean Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6">
            {data.serviceProcessSteps.map((step, idx) => (
              <motion.div
                key={idx}
                onClick={() => setActiveProcessStep(idx)}
                whileHover={{ y: -4 }}
                className={`cursor-pointer rounded-2xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between border ${
                  activeProcessStep === idx
                    ? 'bg-white border-[#00a4d8] shadow-soft'
                    : 'bg-white border-gray-100 shadow-card hover:border-[#00a4d8]/40'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00a4d8] to-[#5d53a3]">
                      {step.stepNumber || `0${idx + 1}`}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${activeProcessStep === idx ? 'bg-[#00a4d8] animate-ping' : 'bg-slate-300'}`} />
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-ink">{step.title}</h3>
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed font-normal">{step.desc}</p>
                  </div>
                </div>

                {step.points && step.points.length > 0 && (
                  <div className="pt-4 mt-4 border-t border-gray-100 space-y-1.5">
                    {step.points.map((p, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-1.5 text-[11px] font-medium text-slate-700">
                        <Check className="w-3 h-3 text-[#00a4d8] shrink-0" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= 9. SECTION 8: WHY CHOOSE CUBIXSOL ================= */}
      <section className="py-20 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/20 text-[#00a4d8] text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>PMS SPECIALISTS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              {data.whyChooseTitle || 'Why Choose Cubixsol For Zeevou Integration?'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {data.whyChooseIntro || 'Cubixsol delivers customised PMS integration services for hospitality and vacation rental businesses. Our developers create secure, scalable, and efficient solutions to connect your systems and improve daily operations.'}
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {data.whyChooseItems.map((item, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-slate-50/80 border border-gray-200/80 hover:border-[#00a4d8]/40 shadow-card transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#00a4d8]/10 border border-[#00a4d8]/20 flex items-center justify-center text-[#00a4d8]">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    {item.metric && (
                      <div className="text-right">
                        <div className="text-xl font-extrabold text-ink font-mono">{item.metric}</div>
                        <div className="text-[10px] uppercase font-mono text-gray-500 font-bold">{item.metricLabel}</div>
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-ink">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed font-normal">{item.desc}</p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-200 flex items-center gap-2 text-xs font-semibold text-[#00a4d8]">
                  <CheckCircle className="w-4 h-4" />
                  <span>Production-Grade Vacation Rental Architecture</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= 10. SECTION 9: FAQS ================= */}
      <section className="py-20 md:py-24 bg-slate-50/70 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/20 text-[#00a4d8] text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Clear answers on how we connect, automate, and scale your Zeevou vacation rental operations.
            </p>
          </div>

          <div className="space-y-4">
            {data.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-gray-200/80 shadow-card overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4"
                  >
                    <span className="text-sm sm:text-base font-bold text-ink">{faq.q}</span>
                    <ChevronDown className={`w-5 h-5 text-[#00a4d8] shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4 font-normal">
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

      {/* ================= 11. SECTION 10: BRAND CTA BANNER ================= */}
      <section className="py-12 md:py-16">
        <CtaBanner
          eyebrow="SCALE YOUR VACATION RENTAL PORTFOLIO"
          title="Ready To Connect Zeevou With Your Business Applications?"
          desc="Whether you need 0% commission direct booking integration, multi-channel 2-way sync across 200+ OTAs, automated smart locks, or custom API development, Cubixsol delivers solutions designed around your unique requirements."
          buttonText="Schedule A Free Discovery Call"
          onClick={() => openModal({ service: 'Zeevou Integration Services' })}
        />
      </section>

    </div>
  );
}
