import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  BookOpen, Calendar, ShieldCheck, Cpu, ArrowRight, CheckCircle2,
  ChevronRight, TrendingUp, Sparkles, Database, MessageSquare,
  Mail, Layers, PhoneCall, ExternalLink, RefreshCw, BarChart3,
  HelpCircle, Star, Sliders, Workflow, Settings, Smartphone,
  Award, Target, Rocket, Globe, CreditCard, Share2, Terminal,
  Code2, Check, PieChart, GitBranch, Server, Lock, Unlock,
  DoorClosed, Key, Bell, Wifi, ArrowUpRight, Zap, Play,
  CheckCircle, ChevronDown, Laptop, Shield, Radio, Users, CheckSquare,
  Compass, MapPin, FileText, Send
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
  slug: 'hostfully-integration',
  title: 'Hostfully Integration Services',
  heroEyebrow: 'HOSTFULLY INTEGRATION SERVICES',
  heroTitle: 'Hostfully API Integration Services for Vacation Rentals',
  heroDesc: 'Cubixsol provides professional Hostfully integration services to help vacation rental companies connect their property management system with essential digital tools. Our developers create custom integrations that improve booking workflows, automate operations, and provide better control over guest management processes.',
  heroPrimaryBtnText: 'Schedule A Hostfully Consultation',
  heroSecondaryBtnText: 'Explore Architecture',
  heroBadges: [
    'Interactive Digital Guidebook & Guest Portal Sync',
    'Multi-Channel 2-Way Marketplace & OTA Parity',
    'Custom Hostfully Open API & Webhook Engineering',
    'Smart Lock Access Control & Automated Check-in',
  ],
  heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&h=800&q=80',

  // Section 1: Connect Hostfully With Your Existing Technology Stack
  subServicesTitle: 'Connect Hostfully With Your Existing Technology Stack',
  subServicesIntro: 'We develop Hostfully integration solutions that connect your PMS with the applications your vacation rental business already uses. These integrations help your systems work together and keep your operations more connected. Our team creates smooth data connections that reduce manual processes and improve operational efficiency. Our Hostfully integrations can connect with:',
  subServicesItems: [
    {
      icon: 'Share2',
      tag: 'MARKETPLACES & OTAs',
      title: 'Online Booking Platforms & Marketplaces',
      desc: 'Online booking platforms and rental marketplaces (Airbnb, Vrbo, Booking.com, Google Vacation Rentals) for real-time calendar availability, instant rates, and reservation parity.',
      pills: ['Airbnb & Vrbo Sync', 'Booking.com API', 'Google Rentals'],
      colorTheme: 'cyan',
    },
    {
      icon: 'Workflow',
      tag: 'GUEST RELATIONSHIPS',
      title: 'Customer Relationship Management',
      desc: 'Customer relationship management systems (HubSpot, Salesforce) for unified guest profiles, booking history aggregation, automated lead scoring, and loyalty campaigns.',
      pills: ['HubSpot / Salesforce', 'Guest History', 'Automated Lead Drips'],
      colorTheme: 'purple',
    },
    {
      icon: 'CreditCard',
      tag: 'FINANCIAL OPS',
      title: 'Payment Processing Solutions',
      desc: 'Payment processing solutions (Stripe, Adyen, PayPal) for PCI-compliant guest billing, automated damage deposit pre-authorizations, and transparent refund handling.',
      pills: ['Stripe & Adyen', 'Deposit Pre-Auth', 'Split Payouts'],
      colorTheme: 'cyan',
    },
    {
      icon: 'Lock',
      tag: 'SMART HARDWARE',
      title: 'Smart Home & Access Management Tools',
      desc: 'Smart home and access management tools (Yale, August, Schlage, RemoteLock, Minut, NoiseAware) for automated keyless access code creation and property monitoring.',
      pills: ['Smart Keyless Access', 'Noise Monitoring', 'Remote Climate'],
      colorTheme: 'purple',
    },
    {
      icon: 'PieChart',
      tag: 'ACCOUNTING & TAX',
      title: 'Accounting & Financial Software',
      desc: 'Accounting and financial software (QuickBooks, Xero) for automated owner statements, cleaning expense allocation, commission tracking, and tax reports.',
      pills: ['QuickBooks & Xero', 'Owner Statements', 'Tax Automation'],
      colorTheme: 'cyan',
    },
    {
      icon: 'MessageSquare',
      tag: 'COMMUNICATION & MARKETING',
      title: 'Communication & Marketing Platforms',
      desc: 'Communication and marketing platforms (Klaviyo, Mailchimp, Twilio SMS) for automated guest messaging, digital guidebook delivery, and review booster campaigns.',
      pills: ['Guidebook Delivery', 'SMS Broadcasts', 'Email Workflows'],
      colorTheme: 'purple',
    },
  ],

  // Section 2: Hostfully Booking Channel Integration
  businessTypesTitle: 'Hostfully Booking Channel Integration',
  businessTypesIntro: 'Property managers need accurate synchronisation across multiple booking platforms to manage reservations effectively. Cubixsol helps businesses integrate Hostfully with popular rental channels to maintain consistent information across different platforms. Our channel integration services support:',
  businessTypesItems: [
    {
      title: 'Reservation Synchronisation',
      desc: 'Real-time two-way data pipeline that captures new reservations, modifications, extensions, and cancellations instantly across all connected platforms.',
      metric: '< 1 sec',
      metricLabel: 'Sync Latency',
    },
    {
      title: 'Calendar Availability Updates',
      desc: 'Sub-second calendar availability updates across all distribution channels to eliminate double bookings and maximize occupancy.',
      metric: '100%',
      metricLabel: 'Parity Guarantee',
    },
    {
      title: 'Guest Information Transfer',
      desc: 'Automated transfer of guest profiles, verified contact details, arrival times, and special requests directly into Hostfully Central Calendar.',
      metric: '360°',
      metricLabel: 'Guest Profile',
    },
    {
      title: 'Property Listing Management',
      desc: 'Centralized multi-channel distribution for listing descriptions, photography, house rules, amenity tags, and check-in instructions.',
      metric: 'Multi-OTA',
      metricLabel: 'Instant Push',
    },
    {
      title: 'Booking Status Updates',
      desc: 'Automated status synchronization for pending payments, verified guest deposits, check-in completion, and post-departure turnover.',
      metric: 'Real-Time',
      metricLabel: 'Status Sync',
    },
  ],

  // Section 3: Hostfully API Integration Services
  techTitle: 'Hostfully API Integration Services',
  techDesc: 'Cubixsol provides custom Hostfully API integration solutions that allow businesses to connect their preferred applications with the PMS. Our developers design secure API connections that enable smooth communication between different software systems. Our Hostfully API services include:',
  tech: [
    'Custom software integrations',
    'Third-party application connections',
    'Automated data transfer solutions',
    'Workflow customisation',
    'API testing and optimisation',
  ],

  // Section 4: Hostfully Digital Guidebook Integration
  guidebookTitle: 'Hostfully Digital Guidebook Integration',
  guidebookIntro: 'Hostfully is known for its digital guidebook features that allow property managers to share useful information with guests. Cubixsol helps businesses connect Hostfully workflows with other communication and guest experience tools. Integration possibilities include:',
  guidebookItems: [
    {
      title: 'Automated Guest Information Delivery',
      desc: 'Automatically trigger personalized digital guidebook links via SMS & email upon confirmed booking or 24 hours prior to check-in.',
      icon: 'Send',
    },
    {
      title: 'Personalized Welcome Messages',
      desc: 'Dynamic guest greeting displaying guest name, reservation dates, check-in instructions, and customized host notes.',
      icon: 'MessageSquare',
    },
    {
      title: 'Property Instruction Sharing',
      desc: 'Interactive guides for WiFi passwords, HVAC climate controls, hot tub operation, parking instructions, and trash schedules.',
      icon: 'FileText',
    },
    {
      title: 'Guest Communication Automation',
      desc: 'Unified two-way messaging connecting digital guidebook inquiries directly to your team’s centralized inbox.',
      icon: 'Smartphone',
    },
    {
      title: 'Experience Management Solutions',
      desc: 'Upsell local tours, private chef bookings, early check-in fees, and concierge services directly through the guidebook interface.',
      icon: 'Compass',
    },
  ],

  // Section 5: Hostfully Smart Lock And Automation Integration
  smartLockTitle: 'Hostfully Smart Lock And Automation Integration',
  smartLockIntro: 'Automation improves the guest journey by reducing delays and simplifying property access. Cubixsol creates Hostfully integrations with smart home systems and automation platforms. Our solutions can support:',
  smartLockItems: [
    { title: 'Digital Key Generation', desc: 'Automatic 6-digit dynamic PIN code creation matched to exact reservation timestamps.' },
    { title: 'Automated Check-in Processes', desc: 'Self-service digital check-in with contactless entry and live arrival confirmation alerts.' },
    { title: 'Smart Lock Connections', desc: 'Seamless API bridging with Yale, August, Schlage, and RemoteLock hardware hubs.' },
    { title: 'Guest Access Management', desc: 'Auto-revocation of access codes at checkout time and flexible temporary codes for cleaners.' },
    { title: 'Property Automation Workflows', desc: 'Smart thermostat pre-conditioning before check-in and noise threshold monitoring.' },
  ],

  // Section 6: Hostfully Payment And CRM Integration
  paymentCrmTitle: 'Hostfully Payment And CRM Integration',
  paymentCrmIntro: 'Cubixsol connects Hostfully with payment platforms and CRM systems to create organised business operations. These integrations provide better management of financial data and guest relationships. Our services include connections with:',
  paymentCrmItems: [
    {
      title: 'Payment Gateways',
      desc: 'PCI-DSS compliant payment processing with Stripe, Adyen, and PayPal for credit cards, automated damage deposit holds, and split disbursements.',
      icon: 'CreditCard',
      tag: 'PAYMENT OPS',
    },
    {
      title: 'CRM Platforms',
      desc: 'Direct integration with HubSpot and Salesforce to track lifetime booking value, guest preferences, and VIP return guest loyalty.',
      icon: 'Workflow',
      tag: 'GUEST 360°',
    },
    {
      title: 'Email Marketing Systems',
      desc: 'Automated post-departure review requests, seasonal promotions, and newsletter campaigns via Klaviyo, Mailchimp, and ActiveCampaign.',
      icon: 'Mail',
      tag: 'MARKETING DRIPS',
    },
    {
      title: 'Accounting Applications',
      desc: 'Real-time synchronization of reservation revenues, channel commissions, cleaning fees, and owner payouts with QuickBooks & Xero.',
      icon: 'PieChart',
      tag: 'FINANCIAL SYNC',
    },
    {
      title: 'Business Reporting Tools',
      desc: 'Custom business intelligence dashboards (PowerBI, Tableau) for RevPAR tracking, average daily rate yield, and multi-unit occupancy.',
      icon: 'BarChart3',
      tag: 'ANALYTICS & BI',
    },
  ],

  // Section 7: Our Hostfully Integration Process
  serviceProcessTitle: 'Our Hostfully Integration Process',
  serviceProcessIntro: 'Cubixsol follows a clear development approach for every Hostfully integration project to deliver robust connectivity and reliable performance:',
  serviceProcessSteps: [
    {
      stepNumber: '01',
      title: 'Requirement Assessment',
      desc: 'Our team identifies your business goals, existing tools, property portfolio scale, and required integration features.',
      points: ['Portfolio Discovery', 'Tech Stack Auditing', 'Integration Scoping'],
    },
    {
      stepNumber: '02',
      title: 'Technical Planning',
      desc: 'We create a solution strategy, API mapping architecture, and webhook event schema based on your workflow and system requirements.',
      points: ['Architecture Blueprint', 'Webhook Event Mapping', 'Security & OAuth2 Setup'],
    },
    {
      stepNumber: '03',
      title: 'Integration Development',
      desc: 'Our developers build and configure the required connections, custom microservices, digital guidebook bridges, and automated sync pipelines.',
      points: ['Connector Development', 'Bidirectional Sync Engine', 'Fail-safe Retry Queues'],
    },
    {
      stepNumber: '04',
      title: 'Testing And Launch',
      desc: 'We evaluate performance, stress-test high concurrency webhook traffic, and deploy the completed integration with zero downtime.',
      points: ['End-to-End Sandbox Testing', 'Edge-case Validation', 'Zero-Downtime Go-Live'],
    },
    {
      stepNumber: '05',
      title: 'Ongoing Support',
      desc: 'Our team provides technical assistance, 24/7 uptime monitoring, Hostfully API version updates, and continuous optimization.',
      points: ['24/7 Priority Support', 'Proactive Uptime Monitoring', 'Continuous Feature Updates'],
    },
  ],

  // Section 8: Why Choose Cubixsol For Hostfully Integration?
  whyChooseTitle: 'Why Choose Cubixsol For Hostfully Integration?',
  whyChooseIntro: 'Cubixsol helps vacation rental businesses improve their technology infrastructure through custom PMS integration solutions. Our developers focus on creating secure, flexible, and business-focused integrations that connect different systems into one efficient workflow. Whether you need booking automation, API development, smart lock integration, or CRM connectivity, Cubixsol delivers custom Hostfully solutions that align with your business goals.',
  whyChooseItems: [
    {
      title: 'Deep PMS & Hostfully Ecosystem Mastery',
      desc: 'Expertise across Hostfully Property Management Platform, Digital Guidebooks, channel management, and guest experience workflows.',
      metric: '10+ Yrs',
      metricLabel: 'PMS Expertise',
    },
    {
      title: 'Enterprise Security & PCI Compliance',
      desc: 'Bank-grade TLS encryption, tokenized payment gateways, OAuth2 token rotation, and HMAC-verified webhook pipelines.',
      metric: '256-bit',
      metricLabel: 'Encryption',
    },
    {
      title: 'High-Throughput Scalable Architecture',
      desc: 'Engineered for high booking volume concurrency during peak seasons without dropped events or calendar sync delays.',
      metric: '99.99%',
      metricLabel: 'SLA Uptime',
    },
    {
      title: 'Custom Fit For Your Vacation Rental Workflow',
      desc: 'Tailored solutions whether managing boutique urban portfolios, luxury villas, or multi-destination rental operations.',
      metric: '100%',
      metricLabel: 'Custom Tailored',
    },
  ],

  // Section 9: Frequently Asked Questions
  faqs: [
    {
      q: 'What Hostfully integration services does Cubixsol provide?',
      a: 'Cubixsol develops custom Hostfully integrations with booking channels, payment platforms, CRM systems, automation tools, and other business applications.',
    },
    {
      q: 'Can Hostfully connect with Airbnb and other rental platforms?',
      a: 'Yes, Hostfully supports connections with rental marketplaces, and Cubixsol can create customised integration solutions.',
    },
    {
      q: 'Does Cubixsol offer Hostfully API integration?',
      a: 'Yes, our developers build API-based solutions that connect Hostfully with external software and business systems.',
    },
    {
      q: 'Can Hostfully integrate with smart lock systems?',
      a: 'Yes, Hostfully can connect with smart access solutions to support automated guest entry and property management.',
    },
    {
      q: 'How does Hostfully integration benefit vacation rental companies?',
      a: 'Hostfully integration improves workflow automation, reduces manual tasks, and helps businesses manage rental operations more effectively.',
    },
  ],

  seo: {
    metaTitle: 'Hostfully Integration Services | Custom API, Guidebook & Smart Lock Solutions | Cubixsol',
    metaDescription: 'Cubixsol provides professional Hostfully integration services. Connect Hostfully PMS with Airbnb, Vrbo, smart locks, digital guidebooks, CRMs & custom APIs.',
    keywords: 'Hostfully integration services, Hostfully API development, Hostfully digital guidebook integration, Hostfully channel manager, PMS integration vacation rentals',
  },
};

export default function HostfullyIntegration() {
  const { openModal } = useEstimateModal();
  const [data, setData] = useState(DEFAULT_DATA);
  const [activeProcessStep, setActiveProcessStep] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  // Live Interactive Hostfully Digital Guidebook & PMS Simulator State
  const [simState, setSimState] = useState({
    bookingActive: true,
    channelSource: 'Airbnb Instant Booking',
    guestName: 'Sophia Montgomery',
    propertyName: 'Aspen Alpine Villa Suite #4',
    checkinDate: 'Oct 22 - Oct 27',
    guidebookLink: 'hostfully.guide/aspen-villa-4',
    wifiPass: 'AspenLuxury2026!',
    smartLockPin: '719302',
    guidebookStatus: 'Delivered via SMS & Email',
    depositHeld: '$500 Held via Stripe',
    lastEvent: 'New Airbnb booking processed. Digital Guidebook link and Smart Lock PIN 719302 dispatched to guest mobile.',
    isSyncing: false,
  });

  // SEO Metadata Hook
  useSEO(data?.seo, {
    title: data.title ? `${data.title} | Cubixsol` : 'Hostfully PMS Integration Services | Cubixsol',
    description: data.heroDesc || data.desc || 'Connect Hostfully with open API, digital guidebooks, smart locks, dynamic pricing, and custom guest journeys.',
    keywords: data.seo?.keywords || 'Hostfully integration, Hostfully PMS, digital guidebooks, smart locks, Cubixsol',
    canonicalUrl: 'https://cubixsol.com/hostfully-integration',
  });

  // Dynamic MongoDB Synchronization & Admin Dashboard Integration
  useEffect(() => {
    apiFetch('services/hostfully-integration')
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
        console.warn('Using default static Hostfully integration data:', err);
      });
  }, []);

  // Simulator actions
  const triggerMarketplaceBooking = () => {
    setSimState((prev) => ({ ...prev, isSyncing: true, lastEvent: 'Processing Hostfully webhook: reservation.created...' }));
    setTimeout(() => {
      const channels = ['Airbnb Marketplace', 'Vrbo Premier', 'Booking.com XML', 'Google Vacation Rentals', 'Hostfully Direct Site'];
      const guests = ['Charlotte Dubois', 'Liam Gallagher', 'Alexander Vance', 'Elena Rostova', 'Lucas Sterling'];
      const villas = ['Maui Oceanfront Villa #12', 'Scottsdale Luxury Retreat', 'Lake Tahoe Pine Lodge', 'Kyoto Zen Garden House'];
      const randomChannel = channels[Math.floor(Math.random() * channels.length)];
      const randomGuest = guests[Math.floor(Math.random() * guests.length)];
      const randomVilla = villas[Math.floor(Math.random() * villas.length)];
      const randomPin = Math.floor(100000 + Math.random() * 900000).toString();

      setSimState({
        bookingActive: true,
        channelSource: randomChannel,
        guestName: randomGuest,
        propertyName: randomVilla,
        checkinDate: 'Nov 10 - Nov 15',
        guidebookLink: 'hostfully.guide/luxury-suite',
        wifiPass: 'TahoePine5G!',
        smartLockPin: randomPin,
        guidebookStatus: 'Digital Guidebook Generated & Sent',
        depositHeld: '$600 Pre-Authorized',
        lastEvent: `New booking received via ${randomChannel} for ${randomGuest}. Hostfully Digital Guidebook & Keycode ${randomPin} pushed instantly.`,
        isSyncing: false,
      });
    }, 650);
  };

  const triggerGuidebookDelivery = () => {
    setSimState((prev) => ({
      ...prev,
      guidebookStatus: 'Live Guidebook Opened by Guest',
      lastEvent: `Guest ${prev.guestName} accessed Digital Guidebook: Viewed WiFi credentials, House Rules & clicked Local Coffee Guide.`,
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
                <span>{data.heroEyebrow || 'HOSTFULLY INTEGRATION SERVICES'}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </motion.div>

              {/* Main H1 Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.18]"
              >
                Hostfully API <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a4d8] via-cyan-300 to-[#5d53a3]">Integration Services</span> For Vacation Rentals
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
                  onClick={() => openModal({ service: 'Hostfully Integration Services' })}
                  className="btn-primary text-sm sm:text-base px-7 py-3.5"
                >
                  <span>{data.ctaPrimaryText || 'Schedule A Hostfully Consultation'}</span>
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

            {/* Right Column: Interactive Hostfully Digital Guidebook & PMS Simulator */}
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
                    <span className="text-xs font-mono text-slate-400 ml-1">hostfully_guidebook_engine.v2</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>GUIDEBOOK LIVE</span>
                  </div>
                </div>

                {/* Central Hostfully Digital Guidebook Showcase */}
                <div className="py-4 space-y-4">
                  {/* Property Banner */}
                  <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-mono tracking-wider text-[#00a4d8] font-bold">Active Listing</div>
                      <div className="text-sm font-semibold text-white">{simState.propertyName}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Current Guest</div>
                      <div className="text-xs font-semibold text-cyan-300">{simState.guestName}</div>
                    </div>
                  </div>

                  {/* Digital Guidebook Experience Mockup */}
                  <div className="p-3.5 rounded-xl bg-gradient-to-r from-slate-950 to-slate-900 border border-[#00a4d8]/40 space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-cyan-300 font-bold flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-[#00a4d8]" /> Hostfully Digital Guidebook
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">Delivered</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                      <div className="p-2 rounded-lg bg-black/60 border border-slate-800">
                        <div className="text-slate-400 text-[9px] uppercase">WiFi Network</div>
                        <div className="text-white font-bold truncate">{simState.wifiPass}</div>
                      </div>
                      <div className="p-2 rounded-lg bg-black/60 border border-slate-800">
                        <div className="text-slate-400 text-[9px] uppercase">Smart Lock Key</div>
                        <div className="text-cyan-300 font-bold">PIN: {simState.smartLockPin}</div>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-300 flex items-center justify-between">
                      <span className="text-slate-400">Guest Portal: <strong className="text-white font-mono text-[10px]">{simState.guidebookLink}</strong></span>
                      <span className="text-emerald-400 font-bold text-[10px]">{simState.depositHeld}</span>
                    </div>
                  </div>

                  {/* Live Terminal Output */}
                  <div className="p-3 rounded-xl bg-black/90 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-500 text-[10px]">
                      <Terminal className="w-3 h-3 text-[#00a4d8]" />
                      <span>LIVE HOSTFULLY EVENT STREAM</span>
                    </div>
                    <div className="text-cyan-300 text-[11px] leading-relaxed break-words">
                      {simState.isSyncing ? (
                        <span className="flex items-center gap-2 text-white">
                          <RefreshCw className="w-3 h-3 animate-spin text-[#00a4d8]" />
                          Processing Hostfully Open API sync event...
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
                      onClick={triggerMarketplaceBooking}
                      className="px-3 py-2 rounded-lg bg-[#00a4d8]/20 hover:bg-[#00a4d8]/30 border border-[#00a4d8]/40 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Simulate New Booking</span>
                    </button>

                    <button
                      type="button"
                      onClick={triggerGuidebookDelivery}
                      className="px-3 py-2 rounded-lg bg-[#5d53a3]/30 hover:bg-[#5d53a3]/40 border border-[#5d53a3]/50 text-purple-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-cyan-300" />
                      <span>Simulate Guest Guidebook Open</span>
                    </button>
                  </div>
                </div>

                {/* Footer Metrics */}
                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Open API Status: <strong className="text-emerald-400">Connected</strong></span>
                  <span>Guidebook Latency: <strong className="text-[#00a4d8]">&lt; 150ms</strong></span>
                  <span>Webhook Security: <strong className="text-[#a594f9]">HMAC-SHA256</strong></span>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 2. SECTION 1: CONNECT HOSTFULLY WITH YOUR EXISTING TECH STACK ================= */}
      <section className="py-20 md:py-24 bg-slate-50/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/20 text-[#00a4d8] text-xs font-bold uppercase tracking-wider">
              <Workflow className="w-3.5 h-3.5" />
              <span>ECOSYSTEM INTEGRATIONS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              {data.subServicesTitle || 'Connect Hostfully With Your Existing Technology Stack'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {data.subServicesIntro || 'We develop Hostfully integration solutions that connect your PMS with the applications your vacation rental business already uses. These integrations help your systems work together and keep your operations more connected. Our team creates smooth data connections that reduce manual processes and improve operational efficiency. Our Hostfully integrations can connect with:'}
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
                      {(item.pills || ['2-Way Sync', 'Automated', 'Hostfully API']).map((pill, pIdx) => (
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

      {/* ================= 3. SECTION 2: HOSTFULLY BOOKING CHANNEL INTEGRATION ================= */}
      <section className="py-20 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Text Details & Feature Breakdown */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/20 text-[#00a4d8] text-xs font-bold uppercase tracking-wider">
                <Share2 className="w-3.5 h-3.5" />
                <span>CHANNEL MANAGEMENT &amp; PARITY</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
                {data.businessTypesTitle || 'Hostfully Booking Channel Integration'}
              </h2>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {data.businessTypesIntro || 'Property managers need accurate synchronisation across multiple booking platforms to manage reservations effectively. Cubixsol helps businesses integrate Hostfully with popular rental channels to maintain consistent information across different platforms.'}
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

            {/* Right: Multi-Marketplace Availability & Parity Matrix */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl bg-gradient-to-br from-slate-950 via-[#071326] to-[#040e1c] border border-slate-800 p-6 sm:p-8 space-y-6 text-white shadow-xl">
                
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 text-[#00a4d8] animate-spin" />
                      Hostfully Marketplace Channel Hub
                    </h3>
                    <p className="text-xs text-slate-400">Two-way listing sync, live rates & booking status</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#00a4d8]/15 border border-[#00a4d8]/30 text-cyan-300 text-xs font-mono">
                    PARITY LIVE
                  </span>
                </div>

                {/* 4 Marketplace Status Cards */}
                <div className="space-y-3">
                  {[
                    { channel: 'Airbnb Preferred Partner', rate: '$520/night', status: 'Active Reservation Synced', sync: 'Calendar Blocked Instant', icon: 'Share2' },
                    { channel: 'Vrbo Direct Connection', rate: '$520/night', status: 'Rate Parity Enforced', sync: '0 Double Bookings', icon: 'Globe' },
                    { channel: 'Booking.com Premier XML', rate: '$520/night', status: 'Yield Rules Active', sync: 'Min Stay Synced', icon: 'Building2' },
                    { channel: 'Hostfully Direct Booking Site', rate: '$475/night', status: 'Direct Guest Checkout', sync: 'Stripe Pay & Guidebook', icon: 'BookOpen' },
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
                    <div className="text-lg font-bold text-white font-mono">0.2s</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Sync Speed</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="text-lg font-bold text-emerald-400 font-mono">0</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Overbookings</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                    <div className="text-lg font-bold text-[#00a4d8] font-mono">100%</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">Listing Accuracy</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 4. SECTION 3: HOSTFULLY API INTEGRATION SERVICES ================= */}
      <section className="py-20 md:py-24 bg-slate-50/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5d53a3]/10 border border-[#5d53a3]/20 text-[#5d53a3] text-xs font-bold uppercase tracking-wider">
              <Code2 className="w-3.5 h-3.5" />
              <span>CUSTOM DEVELOPER ARCHITECTURE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              {data.techTitle || 'Hostfully API Integration Services'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {data.techDesc || 'Cubixsol provides custom Hostfully API integration solutions that allow businesses to connect their preferred applications with the PMS. Our developers design secure API connections that enable smooth communication between different software systems.'}
            </p>
          </div>

          {/* 5 Core API Development Capabilities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6 mb-12">
            {[
              { title: 'Custom Software Integrations', desc: 'Bespoke microservices & endpoints connecting private dashboards directly with Hostfully PMS.', icon: Code2 },
              { title: 'Third-party Connections', desc: 'Seamless API bridging between Hostfully Open API and external CRMs, OTAs, POS, & accounting ledgers.', icon: Share2 },
              { title: 'Automated Data Transfer', desc: 'High-speed two-way data pipelines for guest records, occupancy metrics, financial ledgers, and rates.', icon: RefreshCw },
              { title: 'Workflow Customisation', desc: 'Serverless event triggers for auto-messaging, security deposit processing, and turnover dispatch.', icon: Zap },
              { title: 'API Testing & Optimisation', desc: 'Proactive API monitoring, OAuth2 token rotation, rate limit handling, and Hostaway version updates.', icon: Sparkles },
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

          {/* Interactive Hostfully Webhook Payload Viewer */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-950 via-[#071326] to-[#040e1c] border border-slate-800 p-5 sm:p-6 font-mono text-xs text-slate-300 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#00a4d8]/20 text-cyan-300 font-bold">POST /v1/hostfully/webhook</span>
                <span className="text-slate-400">event: lead.booked</span>
              </div>
              <div className="text-slate-400 text-[11px]">HMAC-SHA256 Verified</div>
            </div>
            <pre className="mt-4 overflow-x-auto text-[11px] sm:text-xs text-slate-300 leading-relaxed font-mono">
{`{
  "event": "lead.booked",
  "leadUid": "hf_lead_84920489a",
  "propertyUid": "hf_prop_aspen_04",
  "channel": "Airbnb",
  "guest": {
    "firstName": "Sophia",
    "lastName": "Montgomery",
    "email": "sophia.m@example.com",
    "phoneNumber": "+1 (555) 293-8472"
  },
  "stay": {
    "checkInDate": "2026-10-22T15:00:00Z",
    "checkOutDate": "2026-10-27T11:00:00Z",
    "totalAmount": 2600.00
  },
  "hostfullyAutomations": [
    { "service": "guidebook", "action": "generate_token", "link": "https://hostfully.guide/aspen-04?token=9284", "status": "DISPATCHED" },
    { "service": "smartlock", "action": "set_pin", "code": "719302", "status": "ACTIVE" },
    { "service": "quickbooks", "action": "record_revenue", "status": "SYNCED" }
  ]
}`}
            </pre>
          </div>

        </div>
      </section>

      {/* ================= 5. SECTION 4: HOSTFULLY DIGITAL GUIDEBOOK INTEGRATION ================= */}
      <section className="py-20 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/20 text-[#00a4d8] text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>SIGNATURE GUIDEBOOK ENGINE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              {data.guidebookTitle || 'Hostfully Digital Guidebook Integration'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {data.guidebookIntro || 'Hostfully is known for its digital guidebook features that allow property managers to share useful information with guests. Cubixsol helps businesses connect Hostfully workflows with other communication and guest experience tools. Integration possibilities include:'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {data.guidebookItems.map((item, idx) => {
              const IconComp = idx === 0 ? Send : idx === 1 ? MessageSquare : idx === 2 ? FileText : idx === 3 ? Smartphone : Compass;
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
                    <span>Hostfully Guidebook Sync</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= 6. SECTION 5: HOSTFULLY SMART LOCK & AUTOMATION INTEGRATION ================= */}
      <section className="py-20 md:py-24 bg-slate-50/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Smart Lock Feature Showcase */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5d53a3]/10 border border-[#5d53a3]/20 text-[#5d53a3] text-xs font-bold uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5" />
                <span>KEYLESS PROPERTY ACCESS</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
                {data.smartLockTitle || 'Hostfully Smart Lock And Automation Integration'}
              </h2>

              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {data.smartLockIntro || 'Automation improves the guest journey by reducing delays and simplifying property access. Cubixsol creates Hostfully integrations with smart home systems and automation platforms. Our solutions can support:'}
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
                  onClick={() => openModal({ service: 'Hostfully Smart Lock Integration' })}
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
                      <h3 className="text-base font-bold text-white">Hostfully Smart Access Hub</h3>
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
                    <span>Synchronized with Hostfully Check-In (3:00 PM) to Check-Out (11:00 AM)</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-1">
                    <div className="font-semibold text-white flex items-center gap-1.5">
                      <Wifi className="w-3.5 h-3.5 text-[#00a4d8]" />
                      <span>Remote Lock Control</span>
                    </div>
                    <div className="text-slate-400 text-[11px]">Instant unlock via Hostfully dashboard for maintenance or cleaners.</div>
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
                    onClick={triggerMarketplaceBooking}
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

      {/* ================= 7. SECTION 6: HOSTFULLY PAYMENT AND CRM INTEGRATION ================= */}
      <section className="py-20 md:py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/20 text-[#00a4d8] text-xs font-bold uppercase tracking-wider">
              <CreditCard className="w-3.5 h-3.5" />
              <span>FINANCIAL &amp; CRM PLATFORMS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              {data.paymentCrmTitle || 'Hostfully Payment And CRM Integration'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {data.paymentCrmIntro || 'Cubixsol connects Hostfully with payment platforms and CRM systems to create organised business operations. These integrations provide better management of financial data and guest relationships. Our services include connections with:'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {data.paymentCrmItems.map((item, idx) => {
              const IconComp = idx === 0 ? CreditCard : idx === 1 ? Workflow : idx === 2 ? Mail : idx === 3 ? PieChart : BarChart3;
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
                    <span>Hostfully Open API Data Sync</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ================= 8. SECTION 7: OUR HOSTFULLY INTEGRATION PROCESS ================= */}
      <section className="py-20 md:py-24 bg-slate-50/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5d53a3]/10 border border-[#5d53a3]/20 text-[#5d53a3] text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>STRUCTURED DELIVERY METHODOLOGY</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-ink tracking-tight">
              {data.serviceProcessTitle || 'Our Hostfully Integration Process'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {data.serviceProcessIntro || 'Cubixsol follows a clear development approach for every Hostfully integration project to deliver robust connectivity and reliable performance:'}
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
              {data.whyChooseTitle || 'Why Choose Cubixsol For Hostfully Integration?'}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {data.whyChooseIntro || 'Cubixsol helps vacation rental businesses improve their technology infrastructure through custom PMS integration solutions. Our developers focus on creating secure, flexible, and business-focused integrations that connect different systems into one efficient workflow.'}
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
              Clear answers on how we connect, automate, and scale your Hostfully vacation rental operations.
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
          title="Ready To Connect Hostfully With Your Existing Technology Stack?"
          desc="Whether you need multi-channel OTA synchronisation, interactive digital guidebook integration, smart lock access control, or custom API development, Cubixsol delivers Hostfully solutions designed around your requirements."
          buttonText="Schedule A Free Discovery Call"
          onClick={() => openModal({ service: 'Hostfully Integration Services' })}
        />
      </section>

    </div>
  );
}
