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
  CheckCircle, ChevronDown, Laptop, Shield, Radio, Users, CheckSquare
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
  slug: 'hostaway-integration',
  title: 'Hostaway Integration Services',
  heroEyebrow: 'HOSTAWAY INTEGRATION SERVICES',
  heroTitle: 'Scalable Hostaway Integration Solutions for Vacation Rental Management',
  heroDesc: 'Cubixsol provides advanced Hostaway integration services that help vacation rental companies connect their property management systems with essential business applications. Our developers create custom solutions that improve reservation management, automate daily operations, and simplify communication between multiple platforms.',
  heroPrimaryBtnText: 'Schedule A Hostaway Consultation',
  heroSecondaryBtnText: 'Explore Architecture',
  heroBadges: [
    'Multi-Channel 2-Way Sync (Airbnb, Vrbo, Booking.com)',
    'Smart Automation & Digital Guest Check-in Workflows',
    'Custom Hostaway REST & Webhook API Development',
    'Automated Payment Gateways & CRM Integration',
  ],
  heroImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&h=800&q=80',

  // Section 1: Integrate Hostaway With Your Essential Business Tools
  subServicesTitle: 'Integrate Hostaway With Your Essential Business Tools',
  subServicesIntro: 'Our integration solutions help reduce repetitive tasks, improve accuracy, and create a smoother workflow for property management teams. We develop Hostaway integrations that allow seamless data exchange between your PMS and other platforms, including:',
  subServicesItems: [
    {
      icon: 'Share2',
      tag: 'CHANNELS & OTAs',
      title: 'Booking Channels & OTAs',
      desc: 'Booking channels such as Airbnb, Vrbo, Booking.com, and direct booking engines for real-time reservation synchronisation, instant calendar blocking, and rate parity.',
      pills: ['Airbnb & Vrbo Sync', 'Booking.com API', 'Instant Calendar Block'],
      colorTheme: 'cyan',
    },
    {
      icon: 'Workflow',
      tag: 'GUEST RELATIONSHIPS',
      title: 'Customer Relationship Management',
      desc: 'Customer relationship management systems (HubSpot, Salesforce) for organised guest information, unified communication logs, VIP tagging, and repeat stay marketing.',
      pills: ['HubSpot / Salesforce', 'Guest History', 'Automated Lead Drips'],
      colorTheme: 'purple',
    },
    {
      icon: 'CreditCard',
      tag: 'FINANCIAL OPS',
      title: 'Payment Processing Platforms',
      desc: 'Payment processing platforms (Stripe, Adyen, Authorize.net) for secure credit card processing, automated damage deposit pre-authorisation, and instant guest refund handling.',
      pills: ['Stripe & Adyen', 'Deposit Pre-Auth', 'Automated Invoicing'],
      colorTheme: 'cyan',
    },
    {
      icon: 'Lock',
      tag: 'SMART HARDWARE',
      title: 'Smart Home & Access Control',
      desc: 'Smart home and access control solutions (Yale, August, Schlage, RemoteLock, Minut, NoiseAware) for automated keyless access codes and noise monitoring.',
      pills: ['Smart Keyless Access', 'Noise Monitoring', 'Remote Climate'],
      colorTheme: 'purple',
    },
    {
      icon: 'PieChart',
      tag: 'ACCOUNTING & TAX',
      title: 'Accounting & Reporting Applications',
      desc: 'Accounting and reporting applications (QuickBooks, Xero) for accurate financial records, automated owner payouts, cleaning fee tracking, and tax compliance.',
      pills: ['QuickBooks & Xero', 'Owner Statements', 'Tax Automation'],
      colorTheme: 'cyan',
    },
    {
      icon: 'MessageSquare',
      tag: 'MARKETING & AUTOMATION',
      title: 'Marketing Automation Tools',
      desc: 'Marketing automation tools (Klaviyo, Mailchimp, ActiveCampaign) for guest engagement campaigns, automated review request triggers, and SMS notifications.',
      pills: ['Review Automation', 'SMS Broadcasts', 'Email Workflows'],
      colorTheme: 'purple',
    },
  ],

  // Section 2: Hostaway Channel Integration Services
  businessTypesTitle: 'Hostaway Channel Integration Services',
  businessTypesIntro: 'Property managers depend on multiple booking channels to increase reservations and reach more guests. Cubixsol creates Hostaway channel integrations that synchronise important rental data across different platforms. A properly connected channel system helps prevent booking conflicts and allows managers to maintain consistent information across all platforms.',
  businessTypesItems: [
    {
      title: 'Reservation Synchronisation',
      desc: 'Sub-second two-way booking data flow that updates newly confirmed reservations, cancellations, and length-of-stay changes across all channels.',
      metric: '< 1 sec',
      metricLabel: 'Sync Speed',
    },
    {
      title: 'Availability Updates',
      desc: 'Instant calendar availability mirroring across Airbnb, Vrbo, Booking.com, and direct websites to completely eliminate double bookings.',
      metric: '100%',
      metricLabel: 'Parity Guarantee',
    },
    {
      title: 'Rate Management',
      desc: 'Centralised dynamic nightly pricing, seasonal markup rules, minimum stay restrictions, and promotional discounts across all distribution endpoints.',
      metric: 'Live Dynamic',
      metricLabel: 'Yield Pricing',
    },
    {
      title: 'Guest Information Transfer',
      desc: 'Complete automated ingestion of guest profiles, verified phone numbers, check-in requests, special inquiries, and payout records into Hostaway.',
      metric: '360°',
      metricLabel: 'Guest Profile',
    },
    {
      title: 'Listing Data Synchronisation',
      desc: 'Unified multi-unit listing synchronization including photos, house rules, amenity updates, check-in instructions, and cancellation policies.',
      metric: 'Multi-OTA',
      metricLabel: 'Instant Push',
    },
  ],

  // Section 3: Hostaway API Integration Development
  techTitle: 'Hostaway API Integration Development',
  techDesc: 'Hostaway offers API capabilities that enable businesses to connect their preferred applications with the PMS. Cubixsol provides custom Hostaway API integration services to build flexible and scalable connections. Our developers design secure solutions that allow your software environment to communicate efficiently with Hostaway.',
  tech: [
    'Custom application integration',
    'Data synchronization between systems',
    'Automated workflow creation',
    'Third-party platform connections',
    'API optimization and maintenance',
  ],

  // Section 4: Hostaway Smart Automation Integration
  smartAutomationTitle: 'Hostaway Smart Automation Integration',
  smartAutomationIntro: 'Automation plays an important role in modern vacation rental operations. Cubixsol helps businesses connect Hostaway with automation tools that improve guest experiences and simplify property management. Our automation solutions can include:',
  smartAutomationItems: [
    {
      title: 'Automated Guest Messaging',
      desc: 'Unified multi-channel auto-messaging across Airbnb chat, SMS, email, and WhatsApp triggered by reservation stages.',
      icon: 'MessageSquare',
    },
    {
      title: 'Digital Check-in Workflows',
      desc: 'Automated guest pre-arrival forms, ID verification collection, digital rental agreements, and custom check-in guides.',
      icon: 'CheckSquare',
    },
    {
      title: 'Smart Lock Connectivity',
      desc: 'Automated time-restricted PIN code generation synced directly with guest reservation dates and check-out times.',
      icon: 'Lock',
    },
    {
      title: 'Task Notifications',
      desc: 'Automated job dispatch and task scheduling for housekeeping crews, maintenance contractors, and turnover inspections.',
      icon: 'Bell',
    },
    {
      title: 'Operational Alerts',
      desc: 'Real-time alerts for noise threshold spikes, early check-in requests, late departures, and critical hardware status.',
      icon: 'Wifi',
    },
  ],

  // Section 5: Hostaway Payment And CRM Integration
  paymentCrmTitle: 'Hostaway Payment And CRM Integration',
  paymentCrmIntro: 'Guest payments and customer relationships are important parts of rental operations. Cubixsol integrates Hostaway with payment solutions and CRM platforms to create organised business workflows. Our services can connect Hostaway with:',
  paymentCrmItems: [
    {
      title: 'Payment Gateways for Secure Transactions',
      desc: 'Seamless integration with Stripe, Adyen, and PayPal for PCI-compliant payments, security deposit holds, and split payouts.',
      icon: 'CreditCard',
      tag: 'FINANCIAL SECURITY',
    },
    {
      title: 'CRM Systems for Guest Relationship Management',
      desc: 'Bi-directional synchronization with HubSpot and Salesforce to track lifetime booking value, guest preferences, and VIP history.',
      icon: 'Workflow',
      tag: 'GUEST 360°',
    },
    {
      title: 'Email Marketing Platforms for Customer Engagement',
      desc: 'Automated post-stay review generation drips, re-booking promotions, and seasonal newsletter campaigns via Klaviyo & Mailchimp.',
      icon: 'Mail',
      tag: 'REPEAT REVENUE',
    },
    {
      title: 'Accounting Tools for Financial Tracking',
      desc: 'Automated export of gross rental income, channel fees, cleaning expense allocations, and tax reporting into QuickBooks & Xero.',
      icon: 'PieChart',
      tag: 'AUTOMATED BOOKS',
    },
  ],

  // Section 6: Our Hostaway Integration Process
  serviceProcessTitle: 'Our Hostaway Integration Process',
  serviceProcessIntro: 'Cubixsol follows a professional approach to deliver successful Hostaway integration projects with zero downtime and reliable performance:',
  serviceProcessSteps: [
    {
      stepNumber: '01',
      title: 'Business Analysis',
      desc: 'Our team reviews your current systems, vacation rental portfolio, operational challenges, and integration goals to define the optimal roadmap.',
      points: ['Portfolio Auditing', 'Tech Stack Evaluation', 'Milestone Scoping'],
    },
    {
      stepNumber: '02',
      title: 'Solution Planning',
      desc: 'We create a comprehensive technical roadmap, data mapping architecture, and webhook event schema based on your required features.',
      points: ['API Architecture Blueprint', 'Webhook Event Schemas', 'Security & Token Rotation'],
    },
    {
      stepNumber: '03',
      title: 'Development And Configuration',
      desc: 'Our developers build the required custom connections, automation workflows, serverless event handlers, and data synchronization bridges.',
      points: ['Custom Connector Build', 'Bidirectional Sync Engine', 'Fail-safe Retry Queues'],
    },
    {
      stepNumber: '04',
      title: 'Testing And Deployment',
      desc: 'We verify system performance, stress-test high concurrency webhook loads, and validate mock booking scenarios before live rollout.',
      points: ['End-to-End Edge Case Testing', 'Concurrency Verification', 'Zero-Downtime Rollout'],
    },
    {
      stepNumber: '05',
      title: 'Technical Support',
      desc: 'We assist to maintain reliable integration performance, 24/7 uptime monitoring, Hostaway API updates, and ongoing enhancements.',
      points: ['24/7 Priority Support', 'Proactive Uptime Monitoring', 'API Lifecycle Maintenance'],
    },
  ],

  // Section 7: Why Choose Cubixsol For Hostaway Integration?
  whyChooseTitle: 'Why Choose Cubixsol For Hostaway Integration?',
  whyChooseIntro: 'Cubixsol delivers customised PMS integration solutions for vacation rental businesses that need better automation and system connectivity. Our developers focus on creating secure, scalable, and efficient integrations that support business growth. We help you connect Hostaway with booking channels, APIs, automation tools, and third-party software to support your unique operational needs.',
  whyChooseItems: [
    {
      title: 'Deep PMS & Hostaway Architecture Mastery',
      desc: 'Decade of engineering experience with multi-channel PMS architectures, OTAs, guest messaging pipelines, and smart lock ecosystems.',
      metric: '10+ Yrs',
      metricLabel: 'PMS Expertise',
    },
    {
      title: 'Enterprise Security & PCI Compliance',
      desc: 'End-to-end TLS encryption, OAuth2 token rotation, PCI-DSS compliant payment pathways, and secure webhook validation.',
      metric: '256-bit',
      metricLabel: 'Encryption',
    },
    {
      title: 'High-Throughput Scalability',
      desc: 'Serverless microservices built to handle massive seasonal booking spikes across thousands of listings without dropped events.',
      metric: '99.99%',
      metricLabel: 'SLA Uptime',
    },
    {
      title: 'Bespoke Business Workflow Tailoring',
      desc: 'Every connector and automation is engineered specifically to match your operational requirements, owner reporting rules, and guest touchpoints.',
      metric: '100%',
      metricLabel: 'Custom Tailored',
    },
  ],

  // Section 8: Frequently Asked Questions
  faqs: [
    {
      q: 'What Hostaway integration services does Cubixsol offer?',
      a: 'Cubixsol provides custom Hostaway integrations with booking channels, payment systems, CRM platforms, smart tools, and business applications.',
    },
    {
      q: 'Can Hostaway integrate with Airbnb and other OTAs?',
      a: 'Yes, Hostaway supports connections with major booking channels, and Cubixsol can help configure and customize these integrations.',
    },
    {
      q: 'Does Cubixsol develop custom Hostaway API solutions?',
      a: 'Yes, our developers create API-based integrations that connect Hostaway with external software and business systems.',
    },
    {
      q: 'Can Hostaway be connected with smart lock systems?',
      a: 'Yes, Hostaway can integrate with smart access solutions to support automated entry and improved guest experiences.',
    },
    {
      q: 'How can Hostaway integration improve rental management?',
      a: 'Hostaway integration reduces manual work, improves data accuracy, and helps property managers operate multiple systems through connected workflows.',
    },
  ],

  seo: {
    metaTitle: 'Hostaway Integration Services | Scalable PMS API & Channel Solutions | Cubixsol',
    metaDescription: 'Cubixsol provides expert Hostaway integration services. Connect Hostaway with Airbnb, Vrbo, Booking.com, smart locks, CRMs, and custom APIs.',
    keywords: 'Hostaway integration services, Hostaway API development, Hostaway channel manager integration, Hostaway smart lock, PMS integration vacation rentals',
  },
};

export default function HostawayIntegration() {
  const { openModal } = useEstimateModal();
  const [data, setData] = useState(DEFAULT_DATA);
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  // Live Interactive Hostaway Multi-Channel Orchestration Hub Simulator State
  const [simState, setSimState] = useState({
    bookingActive: true,
    channelSource: 'Airbnb Instant Book',
    guestName: 'Julian Sterling',
    propertyName: 'Palm Springs Modern Villa #7',
    checkinDate: 'Oct 14 - Oct 19',
    rateNightly: '$540 / night',
    syncStatus: 'All 4 OTAs Synced',
    smartLockPin: '582914',
    depositHeld: '$500 (Stripe Pre-Auth)',
    workflowStep: 'Guest Verified & PIN Dispatched',
    lastEvent: 'Airbnb reservation confirmed. Calendar blocked across Vrbo, Booking.com & Direct Engine in 0.3s.',
    isSyncing: false,
  });

  // SEO Metadata Hook
  useSEO(data?.seo, {
    title: data.title ? `${data.title} | Cubixsol` : 'Hostaway PMS Integration Services | Cubixsol',
    description: data.heroDesc || data.desc || 'Connect Hostaway with Airbnb, Vrbo, smart locks, payment gateways, and unified messaging for vacation rentals.',
    keywords: data.seo?.keywords || 'Hostaway integration, Hostaway PMS, vacation rental API, Cubixsol',
    canonicalUrl: 'https://cubixsol.com/hostaway-integration',
  });

  // Dynamic MongoDB Synchronization & Admin Dashboard Integration
  useEffect(() => {
    apiFetch('services/hostaway-integration')
      .then((res) => {
        if (res && (res.title || res.heroSubtitle || res.desc)) {
          setData((prev) => ({
            ...prev,
            ...res,
            seo: res.seo || prev.seo,
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
        console.warn('Using default static Hostaway integration data:', err);
      });
  }, []);

  // Simulator actions
  const triggerMultiOtaBooking = () => {
    setSimState((prev) => ({ ...prev, isSyncing: true, lastEvent: 'Broadcasting OTA webhook across Hostaway Channel Manager...' }));
    setTimeout(() => {
      const channels = ['Vrbo Instant Booking', 'Booking.com Premier', 'Direct Website Engine', 'Airbnb Superhost'];
      const guests = ['Eleanor Vance', 'Marcus Aurelius', 'Charlotte Dubois', 'Liam Gallagher', 'Sophia Patel'];
      const villas = ['Aspen Grand Chalet #2', 'Miami South Beach Loft', 'Maui Luxury Oceanfront Suite', 'London Knightsbridge Mews'];
      const randomChannel = channels[Math.floor(Math.random() * channels.length)];
      const randomGuest = guests[Math.floor(Math.random() * guests.length)];
      const randomVilla = villas[Math.floor(Math.random() * villas.length)];
      const randomPin = Math.floor(100000 + Math.random() * 900000).toString();

      setSimState({
        bookingActive: true,
        channelSource: randomChannel,
        guestName: randomGuest,
        propertyName: randomVilla,
        checkinDate: 'Nov 02 - Nov 07',
        rateNightly: '$680 / night',
        syncStatus: '4 OTAs Synced in 0.28s',
        smartLockPin: randomPin,
        depositHeld: '$600 (Pre-Authorized)',
        workflowStep: 'Digital Check-in Guide Dispatched via SMS',
        lastEvent: `New booking received via ${randomChannel} for ${randomGuest}. Instant calendar parity updated across all OTAs.`,
        isSyncing: false,
      });
    }, 650);
  };

  const triggerDigitalCheckin = () => {
    setSimState((prev) => ({
      ...prev,
      workflowStep: 'Guest completed online ID verification & signed digital agreement',
      lastEvent: `Hostaway Smart Automation: Smart Lock PIN ${prev.smartLockPin} activated for ${prev.guestName}. Housekeeping scheduled.`,
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
                <span>{data.heroEyebrow || 'HOSTAWAY INTEGRATION SERVICES'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </motion.div>

              {/* Main H1 Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.18]"
              >
                Scalable <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a4d8] via-cyan-300 to-[#5d53a3]">Hostaway Integration</span> Solutions For Vacation Rentals
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
                  onClick={() => openModal({ service: 'Hostaway Integration Services' })}
                  className="btn-primary text-sm sm:text-base px-7 py-3.5"
                >
                  <span>{data.ctaPrimaryText || 'Schedule A Hostaway Consultation'}</span>
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

            {/* Right Column: Interactive Hostaway Multi-Channel Orchestration Visualizer */}
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
                    <span className="text-xs font-mono text-slate-400 ml-1">hostaway_channel_hub.v3</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>PARITY ACTIVE</span>
                  </div>
                </div>

                {/* Central Hostaway Engine Hub */}
                <div className="py-4 space-y-4">
                  {/* Property Banner */}
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-mono tracking-wider text-[#00a4d8] font-bold">Active Listing</div>
                      <div className="text-sm font-semibold text-white">{simState.propertyName}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Source OTA</div>
                      <div className="text-xs font-semibold text-cyan-300">{simState.channelSource}</div>
                    </div>
                  </div>

                  {/* 4 Connected Nodes Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    
                    {/* Node 1: Multi-OTA Sync */}
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-cyan-400 font-bold flex items-center gap-1">
                          <Share2 className="w-3 h-3 text-[#00a4d8]" /> Channels
                        </span>
                        <span className="text-[10px] text-emerald-400 font-mono">Synced</span>
                      </div>
                      <div className="text-[11px] text-slate-300 font-mono">{simState.syncStatus}</div>
                    </div>

                    {/* Node 2: Smart Lock PIN */}
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#a594f9] font-bold flex items-center gap-1">
                          <Lock className="w-3 h-3 text-[#5d53a3]" /> Keyless PIN
                        </span>
                        <span className="text-[10px] text-cyan-300 font-mono">{simState.smartLockPin}</span>
                      </div>
                      <div className="text-[11px] text-slate-300 font-mono">Time-Restricted Active</div>
                    </div>

                    {/* Node 3: Payment & Deposit */}
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <CreditCard className="w-3 h-3" /> Stripe Hold
                        </span>
                        <span className="text-[10px] text-emerald-400 font-mono">Secured</span>
                      </div>
                      <div className="text-[11px] text-slate-300 font-mono">{simState.depositHeld}</div>
                    </div>

                    {/* Node 4: Guest CRM & Workflow */}
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#00a4d8] font-bold flex items-center gap-1">
                          <Workflow className="w-3 h-3" /> CRM Pipeline
                        </span>
                        <span className="text-[10px] text-cyan-300 font-mono">HubSpot</span>
                      </div>
                      <div className="text-[11px] text-slate-300 font-mono truncate">{simState.guestName}</div>
                    </div>
                  </div>

                  {/* Live Terminal Output */}
                  <div className="p-3 rounded-xl bg-black/90 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-500 text-[10px]">
                      <Terminal className="w-3 h-3 text-[#00a4d8]" />
                      <span>LIVE HOSTAWAY EVENT STREAM</span>
                    </div>
                    <div className="text-cyan-300 text-[11px] leading-relaxed break-words">
                      {simState.isSyncing ? (
                        <span className="flex items-center gap-2 text-white">
                          <RefreshCw className="w-3 h-3 animate-spin text-[#00a4d8]" />
                          Broadcasting Hostaway webhook across OTA network...
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
                      onClick={triggerMultiOtaBooking}
                      className="px-3 py-2 rounded-lg bg-[#00a4d8]/20 hover:bg-[#00a4d8]/30 border border-[#00a4d8]/40 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Simulate OTA Booking</span>
                    </button>

                    <button
                      type="button"
                      onClick={triggerDigitalCheckin}
                      className="px-3 py-2 rounded-lg bg-[#5d53a3]/30 hover:bg-[#5d53a3]/40 border border-[#5d53a3]/50 text-purple-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <CheckSquare className="w-3.5 h-3.5 text-cyan-300" />
                      <span>Trigger Digital Check-in</span>
                    </button>
                  </div>
                </div>

                {/* Footer Metrics */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Channel Parity: <strong className="text-emerald-400">100% Guaranteed</strong></span>
                  <span>Webhook Latency: <strong className="text-[#00a4d8]">&lt; 190ms</strong></span>
                  <span>Sync Type: <strong className="text-[#a594f9]">Direct Open API</strong></span>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 2. SECTION 1: INTEGRATE HOSTAWAY WITH ESSENTIAL BUSINESS TOOLS ================= */}
      <section className="py-20 md:py-24 bg-slate-50/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/20 text-[#00a4d8] text-xs font-bold uppercase tracking-wider">
              <Workflow className="w-3.5 h-3.5" />
              <span>ECOSYSTEM INTEGRATIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              {data.subServicesTitle || 'Integrate Hostaway With Your Essential Business Tools'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {data.subServicesIntro || 'Our integration solutions help reduce repetitive tasks, improve accuracy, and create a smoother workflow for property management teams. We develop Hostaway integrations that allow seamless data exchange between your PMS and other platforms, including:'}
            </p>
          </div>

          {/* 6 High-Converting Cards in Clean Brand White Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {data.subServicesItems.map((item, idx) => {
              const IconComp = idx === 0 ? Share2 : idx === 1 ? Workflow : idx === 2 ? CreditCard : idx === 3 ? Lock : idx === 4 ? PieChart : MessageSquare;
              const isCyan = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="group relative rounded-2xl bg-white border border-gray-100 hover:border-[#00a4d8]/40 shadow-card hover:shadow-soft p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between"
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
                      <h3 className="text-lg sm:text-xl font-bold text-ink group-hover:text-[#00a4d8] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-2 font-normal">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-gray-100">
                    <div className="flex flex-wrap gap-1.5">
                      {(item.pills || ['2-Way Sync', 'Automated', 'Hostaway API']).map((pill, pIdx) => (
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

      {/* ================= 3. SECTION 2: HOSTAWAY CHANNEL INTEGRATION SERVICES ================= */}
      <section className="py-20 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Text Details & Feature Breakdown */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/20 text-[#00a4d8] text-xs font-bold uppercase tracking-wider">
                <Share2 className="w-3.5 h-3.5" />
                <span>MULTI-CHANNEL SYNCHRONIZATION</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
                {data.businessTypesTitle || 'Hostaway Channel Integration Services'}
              </h2>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {data.businessTypesIntro || 'Property managers depend on multiple booking channels to increase reservations and reach more guests. Cubixsol creates Hostaway channel integrations that synchronise important rental data across different platforms.'}
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

            {/* Right: Multi-Channel Availability & Rate Parity Matrix Mockup */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl bg-gradient-to-br from-slate-950 via-[#071326] to-[#040e1c] border border-slate-800 p-6 sm:p-8 space-y-6 text-white shadow-xl">
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 text-[#00a4d8] animate-spin" />
                      Hostaway Multi-OTA Parity Engine
                    </h3>
                    <p className="text-xs text-slate-400">Real-time availability, rates & guest transfer</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#00a4d8]/15 border border-[#00a4d8]/30 text-cyan-300 text-xs font-mono">
                    LIVE PARITY
                  </span>
                </div>

                {/* 4 OTA Status Cards */}
                <div className="space-y-3">
                  {[
                    { channel: 'Airbnb Superhost API', rate: '$540/night', status: 'Active Reservation', sync: 'Calendar Blocked Instant', icon: 'Share2' },
                    { channel: 'Vrbo Premier Partner', rate: '$540/night', status: 'Parity Synced', sync: '0 Overbooking Flag', icon: 'Building2' },
                    { channel: 'Booking.com Direct XML', rate: '$540/night', status: 'Yield Pricing Live', sync: 'Min Stay Enforced', icon: 'Globe' },
                    { channel: 'Direct Booking Engine', rate: '$490/night (0% Fee)', status: 'Instant Confirmation', sync: 'Stripe Pay Active', icon: 'CreditCard' },
                  ].map((ota, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#00a4d8] animate-pulse" />
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
                    <div className="text-lg font-bold text-emerald-400 font-mono">0</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Calendar Conflicts</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="text-lg font-bold text-[#00a4d8] font-mono">100%</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Rate Accuracy</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 4. SECTION 3: HOSTAWAY API INTEGRATION DEVELOPMENT ================= */}
      <section className="py-20 md:py-24 bg-slate-50/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5d53a3]/10 border border-[#5d53a3]/20 text-[#5d53a3] text-xs font-bold uppercase tracking-wider">
              <Code2 className="w-3.5 h-3.5" />
              <span>CUSTOM DEVELOPER ARCHITECTURE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              {data.techTitle || 'Hostaway API Integration Development'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {data.techDesc || 'Hostaway offers API capabilities that enable businesses to connect their preferred applications with the PMS. Cubixsol provides custom Hostaway API integration services to build flexible and scalable connections. Our developers design secure solutions that allow your software environment to communicate efficiently with Hostaway.'}
            </p>
          </div>

          {/* 5 Core API Development Capabilities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 mb-12">
            {[
              { title: 'Custom App Integration', desc: 'Connect internal portals, custom booking engines, and owner dashboards directly via Hostaway REST API.', icon: Code2 },
              { title: 'Data Synchronization', desc: 'High-speed two-way data pipelines for guest records, occupancy metrics, financial ledgers, and rates.', icon: RefreshCw },
              { title: 'Automated Workflow Creation', desc: 'Serverless event triggers for auto-messaging, security deposit processing, and turnover dispatch.', icon: Zap },
              { title: 'Third-party Connections', desc: 'Seamless API bridging with external CRMs, OTAs, POS hardware, smart home sensors, & accounting ledgers.', icon: Share2 },
              { title: 'API Optimization & Maintenance', desc: 'Proactive API monitoring, OAuth2 token rotation, rate limit handling, and Hostaway version updates.', icon: Sparkles },
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

          {/* Interactive Hostaway Webhook Payload Viewer */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-950 via-[#071326] to-[#040e1c] border border-slate-800 p-5 sm:p-6 font-mono text-xs text-slate-300 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#00a4d8]/20 text-cyan-300 font-bold">POST /v1/hostaway/webhook</span>
                <span className="text-slate-400">event: reservation.inserted</span>
              </div>
              <div className="text-slate-400 text-[11px]">HMAC-SHA256 Verified</div>
            </div>
            <pre className="mt-4 overflow-x-auto text-[11px] sm:text-xs text-slate-300 leading-relaxed font-mono">
{`{
  "event": "reservation.inserted",
  "reservationId": "hst_91823901b",
  "channelName": "Airbnb",
  "listingId": "listing_palm_springs_07",
  "guest": {
    "name": "Julian Sterling",
    "phone": "+1 (555) 392-1092",
    "email": "julian.sterling@example.com",
    "numberOfGuests": 4
  },
  "financials": {
    "totalPrice": 2700.00,
    "currency": "USD",
    "cleaningFee": 250.00,
    "depositStatus": "HELD"
  },
  "hostawayAutomations": [
    { "target": "smartlock", "action": "generate_code", "pin": "582914", "status": "ACTIVE" },
    { "target": "unified_inbox", "action": "send_welcome_sms", "status": "SENT" },
    { "target": "quickbooks", "action": "create_invoice", "status": "SYNCED" }
  ]
}`}
            </pre>
          </div>

        </div>
      </section>

      {/* ================= 5. SECTION 4: HOSTAWAY SMART AUTOMATION INTEGRATION ================= */}
      <section className="py-20 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/20 text-[#00a4d8] text-xs font-bold uppercase tracking-wider">
              <Zap className="w-3.5 h-3.5" />
              <span>GUEST EXPERIENCE &amp; OPERATIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              {data.smartAutomationTitle || 'Hostaway Smart Automation Integration'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {data.smartAutomationIntro || 'Automation plays an important role in modern vacation rental operations. Cubixsol helps businesses connect Hostaway with automation tools that improve guest experiences and simplify property management. Our automation solutions can include:'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {data.smartAutomationItems.map((auto, idx) => {
              const IconComp = idx === 0 ? MessageSquare : idx === 1 ? CheckSquare : idx === 2 ? Lock : idx === 3 ? Bell : Wifi;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-50/80 border border-gray-200/80 hover:border-[#00a4d8]/40 shadow-card transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-[#00a4d8]/10 border border-[#00a4d8]/20 flex items-center justify-center text-[#00a4d8]">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-ink">{auto.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed font-normal">{auto.desc}</p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-gray-200 flex items-center gap-1.5 text-[11px] font-semibold text-[#00a4d8]">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Active Automation</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= 6. SECTION 5: HOSTAWAY PAYMENT AND CRM INTEGRATION ================= */}
      <section className="py-20 md:py-24 bg-slate-50/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5d53a3]/10 border border-[#5d53a3]/20 text-[#5d53a3] text-xs font-bold uppercase tracking-wider">
              <CreditCard className="w-3.5 h-3.5" />
              <span>FINANCIAL &amp; CRM PLATFORMS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              {data.paymentCrmTitle || 'Hostaway Payment And CRM Integration'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {data.paymentCrmIntro || 'Guest payments and customer relationships are important parts of rental operations. Cubixsol integrates Hostaway with payment solutions and CRM platforms to create organised business workflows. Our services can connect Hostaway with:'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {data.paymentCrmItems.map((item, idx) => {
              const IconComp = idx === 0 ? CreditCard : idx === 1 ? Workflow : idx === 2 ? Mail : PieChart;
              const isCyan = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-100 hover:border-[#00a4d8]/40 shadow-card hover:shadow-soft transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        isCyan ? 'bg-[#00a4d8]/10 text-[#00a4d8]' : 'bg-[#5d53a3]/10 text-[#5d53a3]'
                      }`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-mono font-bold tracking-wider px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        {item.tag}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-ink">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed font-normal">{item.desc}</p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-100 flex items-center gap-2 text-xs font-semibold text-[#00a4d8]">
                    <CheckCircle className="w-4 h-4" />
                    <span>Secure Hostaway Open API Synchronization</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= 7. SECTION 6: OUR HOSTAWAY INTEGRATION PROCESS ================= */}
      <section className="py-20 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/20 text-[#00a4d8] text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>STRUCTURED DELIVERY METHODOLOGY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              {data.serviceProcessTitle || 'Our Hostaway Integration Process'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {data.serviceProcessIntro || 'Cubixsol follows a professional approach to deliver successful Hostaway integration projects with zero downtime and reliable performance:'}
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

      {/* ================= 8. SECTION 7: WHY CHOOSE CUBIXSOL ================= */}
      <section className="py-20 md:py-24 bg-slate-50/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/20 text-[#00a4d8] text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>PMS SPECIALISTS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              {data.whyChooseTitle || 'Why Choose Cubixsol For Hostaway Integration?'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {data.whyChooseIntro || 'Cubixsol delivers customised PMS integration solutions for vacation rental businesses that need better automation and system connectivity. Our developers focus on creating secure, scalable, and efficient integrations that support business growth. We help you connect Hostaway with booking channels, APIs, automation tools, and third-party software to support your unique operational needs.'}
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {data.whyChooseItems.map((item, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-100 hover:border-[#00a4d8]/40 shadow-card transition-all duration-300 flex flex-col justify-between"
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

                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center gap-2 text-xs font-semibold text-[#00a4d8]">
                  <CheckCircle className="w-4 h-4" />
                  <span>Production-Grade Vacation Rental Architecture</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= 9. SECTION 8: FAQS ================= */}
      <section className="py-20 md:py-24 bg-white border-b border-gray-100">
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
              Clear answers on how we connect, automate, and scale your Hostaway vacation rental operations.
            </p>
          </div>

          <div className="space-y-4">
            {data.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-slate-50/80 border border-gray-200/80 shadow-card overflow-hidden transition-colors"
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
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-200/60 pt-4 font-normal">
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

      {/* ================= 10. SECTION 9: BRAND CTA BANNER ================= */}
      <section className="py-12 md:py-16">
        <CtaBanner
          eyebrow="SCALE YOUR VACATION RENTAL PORTFOLIO"
          title="Ready To Connect Hostaway With Your Essential Business Tools?"
          desc="Whether you need multi-channel OTA synchronisation, smart automation workflows, CRM connectivity, or custom Hostaway API development, Cubixsol delivers solutions designed around your unique requirements."
          buttonText="Schedule A Free Discovery Call"
          onClick={() => openModal({ service: 'Hostaway Integration Services' })}
        />
      </section>

    </div>
  );
}
