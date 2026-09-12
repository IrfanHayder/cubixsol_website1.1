import { Link, useParams, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, CheckCircle2, ChevronDown,
  Sparkles, ShieldCheck, Activity, Terminal, Radio,
  Layers, Lock, Database, Building2, Plane, GraduationCap,
  Users, Check, ExternalLink, HelpCircle, MessageSquareQuote
} from 'lucide-react';
import { industries as defaultIndustries } from '../data/content';
import { useServices } from '../context/ServicesContext';
import { useEstimateModal } from '../context/EstimateModalContext';
import { apiFetch } from '../utils/api';
import { formatInline } from '../utils/formatText';
import CtaBanner from '../components/CtaBanner';
import ServiceInquiryForm from '../components/ServiceInquiryForm';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';
import DynamicIcon from '../components/DynamicIcon';

// Specialized Bespoke Layouts
import FintechLayout from '../components/industry/FintechLayout';
import HealthcareLayout from '../components/industry/HealthcareLayout';
import EcommerceLayout from '../components/industry/EcommerceLayout';
import LogisticsLayout from '../components/industry/LogisticsLayout';
import SaasLayout from '../components/industry/SaasLayout';
import RealEstateLayout from '../components/industry/RealEstateLayout';
import TravelLayout from '../components/industry/TravelLayout';
import TechnologyLayout from '../components/industry/TechnologyLayout';
import EducationLayout from '../components/industry/EducationLayout';

const industryThemes = {
  fintech: {
    gradient: 'from-slate-50 via-white to-blue-50/40',
    accentText: 'text-primary-600',
    badgeBg: 'bg-primary-50 text-primary-700 border-primary-200',
    heroButton: 'btn-primary',
    glow: 'bg-primary-500/10',
    isDarkHero: false,
    trustPills: ['PCI-DSS Level 1 Ready', 'ISO 20022 Open Banking', '< 18ms Ledger Latency'],
    stats: [
      ['< 25ms', 'API Execution Latency'],
      ['$250M+', 'Processed Volume'],
      ['99.999%', 'Uptime SLA'],
      ['SOC 2 / PCI', 'Compliant by Default'],
    ],
  },
  healthcare: {
    gradient: 'from-slate-50 via-white to-blue-50/40',
    accentText: 'text-primary-600',
    badgeBg: 'bg-primary-50 text-primary-700 border-primary-200',
    heroButton: 'btn-primary',
    glow: 'bg-primary-500/10',
    isDarkHero: false,
    trustPills: ['100% HIPAA & BAA Ready', 'HL7 FHIR v4 Certified', 'Encrypted WebRTC Telehealth'],
    stats: [
      ['100%', 'HIPAA / HITECH Compliant'],
      ['120k+', 'Patients Served'],
      ['HL7 / FHIR', 'Standard APIs'],
      ['0.8s', 'EHR Record Sync'],
    ],
  },
  ecommerce: {
    gradient: 'from-slate-50 via-white to-blue-50/40',
    accentText: 'text-primary-600',
    badgeBg: 'bg-primary-50 text-primary-700 border-primary-200',
    heroButton: 'btn-primary',
    glow: 'bg-primary-500/10',
    isDarkHero: false,
    trustPills: ['Sub-0.4s Headless TTFB', '+42% Mobile Checkout Lift', '99.99% Flash Sale Uptime'],
    stats: [
      ['+42%', 'Mobile Checkout Lift'],
      ['< 0.5s', 'Headless TTFB Latency'],
      ['$85M+', 'Annual GMV Powered'],
      ['99.99%', 'Flash Sale Resilience'],
    ],
  },
  logistics: {
    gradient: 'from-[#071326] via-[#092244] to-[#05172d]',
    accentText: 'text-sky-400',
    badgeBg: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
    heroButton: 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-500/20',
    glow: 'bg-sky-500/15',
    isDarkHero: true,
    trustPills: ['Sub-Meter GPS Telematics', 'AI Route Optimization', '100% Digital ePOD Sync'],
    stats: [
      ['1.4M+', 'Trips Dispatched'],
      ['-19%', 'Deadhead Fuel Savings'],
      ['3s', 'GPS Telematics Refresh'],
      ['100%', 'ePOD Digital Sync'],
    ],
  },
  saas: {
    gradient: 'from-slate-50 via-white to-blue-50/40',
    accentText: 'text-primary-600',
    badgeBg: 'bg-primary-50 text-primary-700 border-primary-200',
    heroButton: 'btn-primary',
    glow: 'bg-primary-500/10',
    isDarkHero: false,
    trustPills: ['PostgreSQL RLS Isolation', 'Stripe Metered Billing', 'SAML 2.0 Enterprise SSO'],
    stats: [
      ['< 10 min', 'Time-to-Value'],
      ['99.99%', 'Multi-Tenant Isolation'],
      ['SAML 2.0', 'Enterprise SSO Ready'],
      ['100%', 'Audit Trail Ready'],
    ],
  },
  'real-estate': {
    gradient: 'from-slate-50 via-white to-blue-50/40',
    accentText: 'text-primary-600',
    badgeBg: 'bg-primary-50 text-primary-700 border-primary-200',
    heroButton: 'btn-primary',
    glow: 'bg-primary-500/10',
    isDarkHero: false,
    trustPills: ['RESO Web API Certified', '< 60s MLS Feed Sync', '3D Matterport Embeds'],
    stats: [
      ['< 60s', 'MLS Sync Frequency'],
      ['+65%', 'Tour Booking Lift'],
      ['3.4x', 'On-Page Dwell Time'],
      ['RESO', 'Web API Standard'],
    ],
  },
  travel: {
    gradient: 'from-sky-50/60 via-cyan-50/40 to-blue-50/50',
    accentText: 'text-cyan-700',
    badgeBg: 'bg-cyan-50 text-cyan-800 border-cyan-200',
    heroButton: 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-500/20',
    glow: 'bg-cyan-500/10',
    isDarkHero: false,
    trustPills: ['Multi-GDS Fare Aggregation', 'Zero Booking Collision Locks', 'BLE Digital Room Keys'],
    stats: [
      ['< 0.6s', 'Multi-GDS Aggregation'],
      ['+28%', 'Package Margin Boost'],
      ['10k+ QPS', 'Stress-Tested'],
      ['4.9 / 5', 'Guest App Rating'],
    ],
  },
  technology: {
    gradient: 'from-[#030712] via-[#09152a] to-[#041a14]',
    accentText: 'text-cyan-400',
    badgeBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    heroButton: 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-500/20',
    glow: 'bg-cyan-500/15',
    isDarkHero: true,
    trustPills: ['Kubernetes IDP Scaffolding', '500k/s Kafka Event Stream', 'Zero-Downtime GitOps'],
    stats: [
      ['10x', 'Deployment Velocity'],
      ['< 15ms', 'Internal API Overhead'],
      ['500k/s', 'Kafka Event Stream'],
      ['99.999%', 'Zero Downtime'],
    ],
  },
  education: {
    gradient: 'from-slate-50 via-white to-blue-50/40',
    accentText: 'text-primary-600',
    badgeBg: 'bg-primary-50 text-primary-700 border-primary-200',
    heroButton: 'btn-primary',
    glow: 'bg-primary-500/10',
    isDarkHero: false,
    trustPills: ['Open edX & Moodle Fork', 'Caliper & xAPI Standards', 'AI Compose Studio'],
    stats: [
      ['19+', 'years of proven market experience'],
      ['750+', 'experts in Engineering, Data, AI, Design & QA'],
      ['550+', 'partnerships spanning across six verticals'],
      ['80%', 'clients rate us better than others'],
    ],
  },
};

const domainFaqs = {
  fintech: [
    {
      q: 'How do you ensure PCI-DSS compliance and financial data security?',
      a: 'We implement zero-trust architecture, tokenization at the edge (via Stripe/Adyen/Plaid), hardware-level encryption (AES-256-GCM), and strict audit logging. Sensitive cardholder PAN data is never stored on our application servers.',
    },
    {
      q: 'Can you integrate with existing core banking or ledger systems?',
      a: 'Yes. We frequently integrate with legacy AS400, FIS, Fiserv, Jack Henry, and modern open banking APIs using ISO 20022 messaging standards and secure mTLS authentication.',
    },
    {
      q: 'How do you prevent fraud and handle chargeback disputes?',
      a: 'We embed real-time machine learning velocity checks, 3D Secure 2.2 authentication, fingerprint anomaly scoring, and automated dispute response workflows.',
    },
    {
      q: 'What is the standard delivery timeline for a fintech MVP?',
      a: 'A production-grade fintech MVP with payments, KYC onboarding, and ledger reconciliation typically takes 8 to 14 weeks from discovery to sandbox testing and live launch.',
    },
  ],
  healthcare: [
    {
      q: 'Do you sign HIPAA Business Associate Agreements (BAAs)?',
      a: 'Yes. We sign standard BAAs with healthcare providers, institutions, and digital health startups. All infrastructure, databases, and third-party APIs comply with HIPAA/HITECH security rules.',
    },
    {
      q: 'How do your solutions integrate with Epic, Cerner, or AthenaHealth?',
      a: 'We build interoperable HL7 FHIR (Fast Healthcare Interoperability Resources) and SMART on FHIR connectors that allow bi-directional clinical charting, appointment synchronization, and lab result streaming.',
    },
    {
      q: 'Is video consultation software browser-based or requires downloads?',
      a: 'Our telehealth solutions are 100% web-based using encrypted WebRTC. Patients and doctors can connect instantly from mobile or desktop with zero downloads required.',
    },
    {
      q: 'Can you handle medical billing and insurance verification?',
      a: 'Yes. We integrate with clearinghouses (Change Healthcare, Availity, Waystar) for automated 270/271 real-time insurance eligibility checks and 837 claims generation.',
    },
  ],
  ecommerce: [
    {
      q: 'What headless commerce frameworks do you specialize in?',
      a: 'We specialize in Next.js, Remix, Shopify Hydrogen, MedusaJS, BigCommerce, and Commerce Layer, coupled with Algolia search and Sanity/Storyblok CMS for ultra-fast storefront performance.',
    },
    {
      q: 'How do you optimize mobile checkout conversion rates?',
      a: 'We design 1-click checkout flows with Apple Pay, Google Pay, auto-address verification, sticky cart drawers, and zero layout shift, proven to increase mobile conversions by 30–45%.',
    },
    {
      q: 'Can you sync inventory with multiple 3PLs and physical stores?',
      a: 'Yes. We engineer unified Order Management Systems (OMS) that synchronize real-time stock across Amazon, Shopify, physical POS, and ERPs like NetSuite or SAP.',
    },
    {
      q: 'How do your platforms handle high-concurrency flash sales (e.g. Black Friday)?',
      a: 'We leverage Redis-backed inventory queuing, edge caching (Cloudflare/Fastly), and auto-scaling serverless containers stress-tested to handle 100,000+ simultaneous shoppers without crashing.',
    },
  ],
  logistics: [
    {
      q: 'How accurate is your real-time vehicle GPS tracking?',
      a: 'Our telematics engines ingest GPS and sensor coordinates every 2 to 5 seconds via WebSockets and MQTT protocols, providing accurate sub-meter map pins and live traffic-aware ETAs.',
    },
    {
      q: 'Can drivers use the mobile application in areas with zero cell signal?',
      a: 'Yes. We build offline-first mobile applications with local SQLite sync. Drivers can scan barcodes, capture e-signatures, and take delivery photos offline; data automatically reconciles once connectivity is restored.',
    },
    {
      q: 'Does your software optimize multi-stop delivery routes?',
      a: 'Yes. We utilize advanced heuristic vehicle routing algorithms (VRP) that calculate the most fuel-efficient sequence considering delivery time windows, cargo capacity, and vehicle weight restrictions.',
    },
    {
      q: 'Can your platform integrate with our existing TMS or ERP?',
      a: 'We have direct integration experience with SAP Transportation Management, Oracle OTM, Blue Yonder, Manhattan Associates, and custom legacy EDI feeds (EDI 204, 214, 210).',
    },
  ],
  saas: [
    {
      q: 'How do you implement multi-tenancy and data isolation?',
      a: 'We implement tenant isolation using PostgreSQL Row-Level Security (RLS) or separate database schemas, ensuring absolute data privacy and zero cross-tenant contamination.',
    },
    {
      q: 'Can you build custom subscription and usage-based billing?',
      a: 'Yes. We integrate Stripe Billing, LemonSqueezy, or Paddle for complex pricing models including seat-based tiers, metered API usage, volume discounts, add-ons, and automated proration.',
    },
    {
      q: 'How do you make SaaS products enterprise-ready for Fortune 500 buyers?',
      a: 'We incorporate SAML 2.0 / Okta SSO, SCIM automated user provisioning, detailed audit trail logs, custom roles & permissions (RBAC), and IP allowlisting.',
    },
    {
      q: 'Do you help with onboarding and product-led growth (PLG)?',
      a: 'Yes. We design interactive onboarding checklists, empty state templates, contextual product tooltips, and analytics pipelines (PostHog / Mixpanel) that maximize Day-1 user activation.',
    },
  ],
  'real-estate': [
    {
      q: 'How fast do MLS and IDX listings update on the website?',
      a: 'Our RESO Web API synchronization engine updates listing data, price changes, and pending statuses in under 60 seconds from the MLS feed broadcast.',
    },
    {
      q: 'Can users search for properties using interactive map polygons?',
      a: 'Yes. We integrate Mapbox GIS layers allowing buyers to draw custom boundary polygons, filter by school district ratings, or visualize commute-time isochrones.',
    },
    {
      q: 'How does your lead routing work for multi-agent brokerages?',
      a: 'Leads are automatically scored and routed based on agent availability, property price bracket, language, or geographic territory via instant SMS alerts and CRM sync.',
    },
    {
      q: 'Can 3D virtual tours (Matterport) be embedded seamlessly?',
      a: 'Yes. We provide native responsive embeds for Matterport, Kuula, and custom 360-degree spatial viewers with fast lazy-loading to protect page speed.',
    },
  ],
  travel: [
    {
      q: 'Which Global Distribution Systems (GDS) and APIs do you integrate with?',
      a: 'We integrate with Amadeus, Sabre, Travelport, Hotelbeds, direct airline NDC APIs, and aggregators like Duffel and Paxport.',
    },
    {
      q: 'How do you prevent double-bookings during peak search surges?',
      a: 'We utilize distributed Redis locking mechanisms and synchronized availability validation pipelines that verify inventory in real-time before issuing PNRs.',
    },
    {
      q: 'Can your booking engine handle dynamic flight + hotel vacation packaging?',
      a: 'Yes. Our dynamic packaging algorithms combine disparate supplier feeds into unified packages with custom margin markup rules and multi-currency conversions.',
    },
    {
      q: 'Do you support mobile check-in and digital room keys?',
      a: 'Yes. We build iOS and Android mobile guest apps that connect with Assa Abloy, Dormakaba, and Salto BLE door lock SDKs for contactless room access.',
    },
  ],
  technology: [
    {
      q: 'How does your engineering team collaborate with our in-house tech leads?',
      a: 'We embed directly into your sprint cycles, Slack channels, and Git repositories. We work as a unified agile pod with shared code reviews, architecture RFCs, and CI/CD pipelines.',
    },
    {
      q: 'Can you help us build an Internal Developer Platform (IDP)?',
      a: 'Yes. We design IDPs using Kubernetes, Terraform, Backstage, and GitHub Actions to allow your engineers to self-serve preview environments and spin up microservices in seconds.',
    },
    {
      q: 'What is your approach to system reliability and observability?',
      a: 'We instrument OpenTelemetry, Grafana, Prometheus, and Datadog across all microservices, establishing automated alerts, SLO/SLA tracking, and zero-downtime canary deployment gates.',
    },
    {
      q: 'Can you build custom React component SDKs and Design Systems?',
      a: 'Yes. We build accessible, tokenized React & TypeScript component libraries published to private or public npm registries with automated Storybook visual testing.',
    },
  ],
  education: [
    {
      q: 'Have you built education products and LMS platforms before?',
      a: 'Yes. We ship education-focused digital products, accessibility tools, quiz engines, and school communication suites used by thousands of students and teachers daily.',
    },
    {
      q: 'Can you integrate with our existing SIS or LMS (Canvas, Blackboard)?',
      a: 'Yes. We build integrations using LTI (Learning Tools Interoperability) standards, REST APIs, and Single Sign-On (SSO) for seamless institutional interoperability.',
    },
    {
      q: 'Do you support mobile experiences for parents and students?',
      a: 'Yes. We build responsive web and native iOS/Android apps tailored for students, teachers, and parents with push notifications, grade viewing, and assignment submissions.',
    },
    {
      q: 'How do education projects typically start?',
      a: 'We start with a discovery phase assessing pedagogy, compliance (FERPA/COPPA), and stakeholder goals, followed by rapid prototyping and pilot rollouts.',
    },
  ],
};

/* -------------------- Bespoke Hero Visual Showcase Component -------------------- */
function IndustryHeroVisual({ slug, ind }) {
  if (slug === 'education') {
    return (
      <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-ink tracking-wide">EdTech Learning Engine</span>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-primary-50 text-primary-700 border border-primary-200">
            Open edX &bull; Moodle &bull; Edly
          </span>
        </div>
        <div className="space-y-3.5 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <span className="text-gray-500 font-medium">Course Completion Rate:</span>
            <span className="text-primary-700 font-extrabold text-sm">94.8% (Top Decile)</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <span className="text-gray-500 font-medium">Authoring Acceleration:</span>
            <span className="text-emerald-700 font-extrabold text-sm">AI Compose Studio</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <span className="text-gray-500 font-medium">Standard Compliance:</span>
            <span className="text-indigo-700 font-extrabold text-sm">Caliper &bull; xAPI &bull; LTI 1.3</span>
          </div>
        </div>
      </div>
    );
  }

  if (slug === 'healthcare') {
    return (
      <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xl text-slate-800 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <span className="text-primary-700 font-bold text-xs flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary-500 animate-pulse" /> Clinical Telehealth Node
          </span>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-primary-50 text-primary-700 border border-primary-200">
            HIPAA Verified
          </span>
        </div>
        <div className="space-y-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
            <span className="text-slate-600 font-medium">Video Encryption:</span>
            <span className="text-primary-700 font-bold">WebRTC End-to-End</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
            <span className="text-slate-600 font-medium">Interoperability:</span>
            <span className="text-primary-700 font-bold">HL7 FHIR v4 Certified</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
            <span className="text-slate-600 font-medium">Care Protocol:</span>
            <span className="text-primary-700 font-bold">BAA Agreement Active</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
            <span className="text-slate-600 font-medium">Vitals Ingestion Latency:</span>
            <span className="text-emerald-700 font-bold">&lt; 45ms Telemetry</span>
          </div>
        </div>
      </div>
    );
  }

  if (slug === 'fintech') {
    return (
      <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xl text-slate-800 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <span className="text-primary-700 font-bold text-xs flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan animate-pulse" />
            Financial Transaction Node
          </span>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-primary-50 text-primary-700 border border-primary-200">
            PCI-DSS L1 Ready
          </span>
        </div>
        <div className="space-y-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
            <span className="text-slate-600 font-medium">Security Vault:</span>
            <span className="text-primary-700 font-bold">PCI-DSS Level 1 Vault</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
            <span className="text-slate-600 font-medium">Execution Latency:</span>
            <span className="text-primary-700 font-bold">&lt; 18ms Real-Time</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
            <span className="text-slate-600 font-medium">Fraud Engine:</span>
            <span className="text-primary-700 font-bold">Zero-Shot ML Anomaly</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
            <span className="text-slate-600 font-medium">Ledger Messaging:</span>
            <span className="text-emerald-700 font-bold">ISO 20022 Standard</span>
          </div>
        </div>
      </div>
    );
  }

  if (slug === 'ecommerce') {
    return (
      <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xl text-slate-800 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <span className="text-primary-700 font-bold text-xs flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-cyan" /> Headless Commerce Accelerator
          </span>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-primary-50 text-primary-700 border border-primary-200">
            Next.js &bull; Shopify Plus
          </span>
        </div>
        <div className="space-y-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
            <span className="text-slate-600 font-medium">Mobile Conversion Lift:</span>
            <span className="text-primary-700 font-extrabold">+42% Boost</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
            <span className="text-slate-600 font-medium">Edge TTFB Speed:</span>
            <span className="text-primary-700 font-extrabold">&lt; 0.4s Global</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
            <span className="text-slate-600 font-medium">Flash Sale Peak Uptime:</span>
            <span className="text-emerald-700 font-extrabold">99.99% Guaranteed</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
            <span className="text-slate-600 font-medium">Cart Checkout Flow:</span>
            <span className="text-primary-700 font-extrabold">1-Click Express Pay</span>
          </div>
        </div>
      </div>
    );
  }

  if (slug === 'logistics') {
    return (
      <div className="rounded-3xl bg-[#09152a] border border-sky-500/30 p-6 sm:p-8 shadow-2xl text-white font-mono text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <span className="text-sky-400 font-bold flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
            LIVE FLEET DISPATCH RADAR
          </span>
          <span className="text-slate-400 text-[10px]">MQTT / WebSocket</span>
        </div>
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-black/40 border border-slate-800 flex justify-between items-center">
            <span className="text-slate-400">GPS Refresh Rate:</span>
            <span className="text-sky-300 font-bold">3s Real-Time</span>
          </div>
          <div className="p-3 rounded-xl bg-black/40 border border-slate-800 flex justify-between items-center">
            <span className="text-slate-400">Route Efficiency:</span>
            <span className="text-emerald-400 font-bold">-19% Deadhead Fuel</span>
          </div>
          <div className="p-3 rounded-xl bg-black/40 border border-slate-800 flex justify-between items-center">
            <span className="text-slate-400">Proof of Delivery:</span>
            <span className="text-sky-300 font-bold">100% Offline ePOD Sync</span>
          </div>
        </div>
      </div>
    );
  }

  if (slug === 'saas') {
    return (
      <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xl text-slate-800 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <span className="text-primary-700 font-bold text-xs flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan animate-pulse" />
            MULTI-TENANT CLOUD NODE
          </span>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-primary-50 text-primary-700 border border-primary-200">
            PostgreSQL RLS
          </span>
        </div>
        <div className="space-y-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
            <span className="text-slate-600 font-medium">Tenant Isolation:</span>
            <span className="text-primary-700 font-extrabold">99.99% Row-Level</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
            <span className="text-slate-600 font-medium">Billing Engine:</span>
            <span className="text-emerald-700 font-extrabold">Stripe Metered Usage</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
            <span className="text-slate-600 font-medium">Enterprise Auth:</span>
            <span className="text-primary-700 font-extrabold">SAML 2.0 / Okta SSO</span>
          </div>
        </div>
      </div>
    );
  }

  if (slug === 'real-estate') {
    return (
      <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xl text-slate-800 relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
          <span className="text-primary-700 font-bold text-xs flex items-center gap-2">
            <Building2 className="w-4 h-4 text-brand-cyan" /> PropTech MLS Sync Engine
          </span>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-primary-50 text-primary-700 border border-primary-200">
            RESO Web API
          </span>
        </div>
        <div className="space-y-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
            <span className="text-slate-600 font-medium">MLS Feed Sync:</span>
            <span className="text-primary-700 font-extrabold">&lt; 60s Frequency</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
            <span className="text-slate-600 font-medium">Tour Booking Lift:</span>
            <span className="text-emerald-700 font-extrabold">+65% Conversion</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex justify-between items-center">
            <span className="text-slate-600 font-medium">3D Spatial Walkthrough:</span>
            <span className="text-primary-700 font-extrabold">Matterport &bull; Mapbox</span>
          </div>
        </div>
      </div>
    );
  }

  if (slug === 'travel') {
    return (
      <div className="rounded-3xl bg-white border border-cyan-200/90 p-6 sm:p-8 shadow-xl text-slate-800">
        <div className="flex items-center justify-between border-b border-cyan-100 pb-4 mb-4">
          <span className="text-cyan-700 font-bold text-xs flex items-center gap-2">
            <Plane className="w-4 h-4 text-cyan-600" /> Multi-GDS Booking Engine
          </span>
          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200">
            Amadeus &bull; Sabre
          </span>
        </div>
        <div className="space-y-3 text-xs">
          <div className="p-3 rounded-xl bg-cyan-50/40 border border-cyan-100 flex justify-between items-center">
            <span className="text-gray-600 font-medium">Fare Search Speed:</span>
            <span className="text-cyan-700 font-extrabold">&lt; 0.6s Multi-Supplier</span>
          </div>
          <div className="p-3 rounded-xl bg-cyan-50/40 border border-cyan-100 flex justify-between items-center">
            <span className="text-gray-600 font-medium">Double-Booking Risk:</span>
            <span className="text-emerald-700 font-extrabold">0% (Redis Locks)</span>
          </div>
          <div className="p-3 rounded-xl bg-cyan-50/40 border border-cyan-100 flex justify-between items-center">
            <span className="text-gray-600 font-medium">Guest Key Delivery:</span>
            <span className="text-cyan-700 font-extrabold">BLE Contactless Pass</span>
          </div>
        </div>
      </div>
    );
  }

  if (slug === 'technology') {
    return (
      <div className="rounded-3xl bg-[#050b14] border border-cyan-500/30 p-6 sm:p-8 shadow-2xl text-white font-mono text-xs">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
          <span className="text-cyan-400 font-bold flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-400" /> DEVPLATFORM EVENT BUS
          </span>
          <span className="text-slate-400 text-[10px]">Kafka &bull; K8s</span>
        </div>
        <div className="space-y-3">
          <div className="p-3 rounded-xl bg-black/40 border border-slate-800 flex justify-between items-center">
            <span className="text-slate-400">Event Throughput:</span>
            <span className="text-emerald-400 font-bold">500k/s Kafka Stream</span>
          </div>
          <div className="p-3 rounded-xl bg-black/40 border border-slate-800 flex justify-between items-center">
            <span className="text-slate-400">Internal API Overhead:</span>
            <span className="text-cyan-300 font-bold">&lt; 15ms gRPC</span>
          </div>
          <div className="p-3 rounded-xl bg-black/40 border border-slate-800 flex justify-between items-center">
            <span className="text-slate-400">System Availability:</span>
            <span className="text-emerald-400 font-bold">99.999% SLA</span>
          </div>
        </div>
      </div>
    );
  }

  // Default Quote Fallback
  return (
    <div className="rounded-3xl border border-gray-100/90 bg-white/95 backdrop-blur-md p-6 sm:p-8 shadow-xl relative overflow-hidden">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2.5 h-2.5 rounded-full bg-primary-500" />
        <span className="text-xs font-bold text-ink uppercase tracking-wider">{ind.title} Product Suite</span>
      </div>
      <p className="text-ink font-medium leading-relaxed mb-6 text-sm sm:text-base italic">
        &ldquo;{ind.testimonial?.quote || 'Cubixsol delivered exactly what our product roadmap needed with domain precision and high speed.'}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <span className="w-10 h-10 rounded-full bg-primary-gradient text-white font-bold flex items-center justify-center text-sm shadow">
          {(ind.testimonial?.name || 'P').charAt(0)}
        </span>
        <div>
          <p className="text-sm font-bold text-ink">{ind.testimonial?.name || 'Client Lead'}</p>
          <p className="text-xs text-gray-500">{ind.testimonial?.role || `${ind.title} Director`}</p>
        </div>
      </div>
    </div>
  );
}

// Bespoke Hero Headlines Helper Function
function getHeroHeadline(slug, title, theme) {
  switch (slug) {
    case 'healthcare':
      return (
        <>
          HIPAA-Compliant <span className={theme.accentText}>Digital Health</span> &amp; Clinical Software
        </>
      );
    case 'education':
      return (
        <>
          Digital Products &amp; Platforms for <span className="text-primary-600">Education &amp; EdTech</span>
        </>
      );
    case 'fintech':
      return (
        <>
          Secure <span className={theme.accentText}>Financial Infrastructure</span> &amp; Neo-Banking
        </>
      );
    case 'ecommerce':
      return (
        <>
          High-Converting <span className={theme.accentText}>Headless Commerce</span> &amp; Retail
        </>
      );
    case 'logistics':
      return (
        <>
          Real-Time <span className={theme.accentText}>Fleet Telematics</span> &amp; Logistics Control
        </>
      );
    case 'saas':
      return (
        <>
          Scalable <span className={theme.accentText}>Multi-Tenant Architecture</span> &amp; SaaS
        </>
      );
    case 'real-estate':
      return (
        <>
          Next-Gen <span className={theme.accentText}>PropTech Ecosystems</span> &amp; MLS Feeds
        </>
      );
    case 'travel':
      return (
        <>
          Sub-Second <span className={theme.accentText}>Travel Booking Engines</span> &amp; GDS
        </>
      );
    case 'technology':
      return (
        <>
          Mission-Critical <span className={theme.accentText}>Developer Platforms</span> &amp; Cloud
        </>
      );
    default:
      return (
        <>
          Modern Software &amp; Digital Products for <span className={theme.accentText}>{title}</span>
        </>
      );
  }
}

export default function IndustryDetail() {
  const { slug } = useParams();
  const { services, resolveIcon } = useServices();
  const { openEstimateModal } = useEstimateModal();
  const [faqOpen, setFaqOpen] = useState(0);

  const [industryData, setIndustryData] = useState(null);
  const [allIndustries, setAllIndustries] = useState(defaultIndustries);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchIndustryData = async () => {
      setLoading(true);
      try {
        const [singleInd, list] = await Promise.all([
          apiFetch(`industries/${slug}`).catch(() => null),
          apiFetch('industries').catch(() => defaultIndustries),
        ]);

        if (isMounted) {
          if (Array.isArray(list) && list.length > 0) {
            setAllIndustries(list);
          }
          if (singleInd && singleInd.title) {
            setIndustryData(singleInd);
          } else {
            const fallback = defaultIndustries.find((i) => i.slug === slug);
            setIndustryData(fallback || null);
          }
        }
      } catch (err) {
        if (isMounted) {
          const fallback = defaultIndustries.find((i) => i.slug === slug);
          setIndustryData(fallback || null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchIndustryData();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const ind = industryData || defaultIndustries.find((i) => i.slug === slug);
  if (!ind && !loading) return <Navigate to="/industries" replace />;
  if (!ind) return <div className="min-h-screen bg-white" />;

  const theme = industryThemes[ind.slug] || industryThemes.education;
  const others = allIndustries.filter((i) => i.slug !== slug).slice(0, 4);
  const relatedServices = services.slice(0, 6);
  const faqs = domainFaqs[ind.slug] || domainFaqs.education;
  const statsList = (ind.stats && ind.stats.length > 0) ? ind.stats.map(s => [s.value, s.label]) : theme.stats;
  const trustPills = theme.trustPills || [];

  // Render bespoke layout per industry
  const renderBespokeLayout = () => {
    switch (ind.slug) {
      case 'fintech':
        return <FintechLayout industry={ind} />;
      case 'healthcare':
        return <HealthcareLayout industry={ind} />;
      case 'ecommerce':
        return <EcommerceLayout industry={ind} />;
      case 'logistics':
        return <LogisticsLayout industry={ind} />;
      case 'saas':
        return <SaasLayout industry={ind} />;
      case 'real-estate':
        return <RealEstateLayout industry={ind} />;
      case 'travel':
        return <TravelLayout industry={ind} />;
      case 'technology':
        return <TechnologyLayout industry={ind} />;
      case 'education':
      default:
        return <EducationLayout industry={ind} />;
    }
  };

  const isDarkHero = theme.isDarkHero;

  return (
    <div className="bg-white min-h-screen">
      {/* 🌟 Dynamic Bespoke Hero Section per Industry */}
      <section className={`relative overflow-hidden pt-10 pb-16 sm:pt-14 sm:pb-22 lg:pb-24 ${isDarkHero ? 'bg-slate-950 text-white' : 'bg-white text-ink'}`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} pointer-events-none opacity-90`} />
        <div className={`absolute right-0 top-0 w-1/2 h-full ${theme.glow} blur-3xl pointer-events-none`} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link
              to="/industries"
              className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold transition ${
                isDarkHero ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-primary-600'
              }`}
            >
              <ArrowLeft className="w-4 h-4" /> All Industries
            </Link>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <div className="lg:col-span-7 space-y-6">
              <Reveal scale>
                <div className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider mb-2 backdrop-blur-sm shadow-sm ${theme.badgeBg}`}>
                  <DynamicIcon icon={ind.icon} title={ind.title} className="w-4 h-4 object-contain" />
                  <span>{ind.title} Industry Solutions</span>
                </div>

                {/* Open, Readable Heading with generous line height and non-cramped typography */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-normal leading-[1.25] sm:leading-[1.2] lg:leading-[1.18] mb-6">
                  {getHeroHeadline(ind.slug, ind.title, theme)}
                </h1>

                <p className={`text-base sm:text-lg leading-relaxed sm:leading-8 mb-8 max-w-2xl font-normal ${
                  isDarkHero ? 'text-slate-300' : 'text-gray-600'
                }`}>
                  {formatInline(ind.desc)}
                </p>

                <div className="flex flex-wrap items-center gap-3.5 pt-1">
                  <Link to="/contact" className={`btn-primary flex items-center gap-2 shadow-md ${theme.heroButton}`}>
                    Discuss Your Project <ArrowRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={openEstimateModal}
                    type="button"
                    className={`btn-outline flex items-center gap-2 ${
                      isDarkHero
                        ? 'border-slate-700 bg-white/5 text-white hover:bg-white/10 hover:border-white/30'
                        : 'border-gray-300 bg-white text-ink hover:border-primary-500'
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-primary-500" /> Get Free Estimate
                  </button>
                </div>

                {/* Trust Verification Badges */}
                {trustPills.length > 0 && (
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-4 text-xs font-semibold">
                    {trustPills.map((pill, pIdx) => (
                      <div key={pIdx} className={`flex items-center gap-1.5 ${isDarkHero ? 'text-slate-400' : 'text-slate-500'}`}>
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{pill}</span>
                      </div>
                    ))}
                  </div>
                )}
              </Reveal>
            </div>

            {/* Right Side Visual Engine */}
            <div className="lg:col-span-5">
              <Reveal direction="left" delay={0.1}>
                <IndustryHeroVisual slug={ind.slug} ind={ind} />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 📊 Stats Strip with Clean Vertical Separators */}
      <section className="border-y border-gray-200/80 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 text-center">
            {statsList.map(([n, l], idx) => (
              <div key={idx} className="px-3 sm:px-4 py-2">
                <p className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">{n}</p>
                <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1.5 leading-snug">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🛠️ Bespoke Industry Layout Engine (e.g. Approach, Solutions, Simulators) */}
      <div className="py-12 sm:py-16">
        {renderBespokeLayout()}
      </div>

      {/* 🔗 Related Services */}
      <section className="border-t border-gray-100 bg-gray-50/60 py-14 lg:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="eyebrow mb-1">Capabilities</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                Often Paired with {ind.title} Software
              </h2>
            </div>
            <Link to="/services" className="text-sm font-bold text-primary-600 inline-flex items-center gap-1 hover:gap-2 transition-all">
              All services <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" staggerDelay={0.04}>
            {relatedServices.map((s) => {
              const SIcon = resolveIcon(s.icon);
              return (
                <StaggerItem key={s.slug} hover>
                  <Link
                    to={`/${s.slug}`}
                    className="flex items-center gap-3.5 rounded-2xl border border-gray-100 bg-white p-4.5 shadow-sm hover:shadow-card hover:border-primary-200 transition h-full group"
                  >
                    <span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${s.color} group-hover:scale-110 transition-transform`}>
                      <SIcon className="w-5 h-5" />
                    </span>
                    <span className="text-sm font-bold text-ink leading-snug group-hover:text-primary-600 transition-colors">
                      {s.title}
                    </span>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* 🚀 Mid Consultation CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        <Reveal>
          <div className="rounded-3xl bg-ink text-white px-6 sm:px-12 py-10 sm:py-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative overflow-hidden shadow-2xl">
            <div className="absolute -right-10 -top-10 w-64 h-64 rounded-full bg-primary-500/20 blur-3xl pointer-events-none" />
            <div className="relative space-y-2.5">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-primary-300">
                Ready to Build?
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                Planning a custom {ind.title.toLowerCase()} software project?
              </h3>
              <p className="text-white/70 text-sm sm:text-base max-w-xl leading-relaxed">
                Connect directly with our senior software architects. We will evaluate your technical requirements, constraints, and provide an actionable scope roadmap.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3.5 relative shrink-0">
              <Link to="/contact" className="btn-primary">
                Book Consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={openEstimateModal}
                type="button"
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition"
              >
                Get Cost Estimate
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ❓ FAQ Section */}
      <section className="bg-gradient-to-b from-slate-50/80 via-white to-slate-50/60 py-16 lg:py-24 border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary-700 border border-primary-200 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
              <HelpCircle className="w-3.5 h-3.5 text-primary-600" />
              <span>{ind.title} Insights &amp; FAQs</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Key considerations and technical answers when planning custom {ind.title.toLowerCase()} software solutions.
            </p>
          </Reveal>

          <div className="space-y-4">
            {faqs.map((item, i) => {
              const open = faqOpen === i;
              return (
                <Reveal key={item.q} delay={i * 0.04}>
                  <div
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      open
                        ? 'border-primary-300 bg-white shadow-lg ring-1 ring-primary-500/20'
                        : 'border-gray-200/80 bg-white hover:border-primary-200 hover:shadow-md'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setFaqOpen(open ? -1 : i)}
                      className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left group transition-colors"
                      aria-expanded={open}
                    >
                      <div className="flex items-center gap-3.5 sm:gap-4 flex-1">
                        <span
                          className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 transition-all ${
                            open
                              ? 'bg-gradient-to-r from-[#00a4d8] to-[#5d53a3] text-white shadow-sm'
                              : 'bg-primary-50 text-primary-700 group-hover:bg-primary-100'
                          }`}
                        >
                          0{i + 1}
                        </span>
                        <span
                          className={`font-bold text-base sm:text-lg transition-colors leading-snug ${
                            open ? 'text-primary-700' : 'text-ink group-hover:text-primary-600'
                          }`}
                        >
                          {item.q}
                        </span>
                      </div>
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                          open
                            ? 'bg-primary-50 text-primary-600 rotate-180'
                            : 'bg-gray-100 text-gray-500 group-hover:bg-primary-50 group-hover:text-primary-600'
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </span>
                    </button>
                    <AnimatePresence>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeInOut' }}
                        >
                          <div className="px-5 sm:px-6 pb-6 pt-2 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-gray-100 pl-16 sm:pl-18">
                            {formatInline(item.a, { strongClass: 'font-bold text-ink' })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Bottom Interactive Help Widget */}
          <Reveal delay={0.2} className="mt-10 sm:mt-12">
            <div className="rounded-2xl bg-white border border-gray-200/80 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center shrink-0 shadow-inner">
                  <MessageSquareQuote className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-ink">Have a specific {ind.title.toLowerCase()} question?</h4>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                    Our senior solutions architects are available to review your technical requirements.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
                <Link to="/contact" className="btn-primary text-xs py-2.5 px-4 shadow-sm w-full sm:w-auto text-center">
                  Ask an Architect
                </Link>
                <button
                  onClick={openEstimateModal}
                  className="btn-outline text-xs py-2.5 px-4 w-full sm:w-auto text-center"
                >
                  Get Estimate
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 🌐 Explore More Industries */}
      {others.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <Reveal className="mb-6 flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-extrabold text-ink">Explore Other Industries We Serve</h2>
            <Link to="/industries" className="text-sm font-bold text-primary-600 hover:underline">
              View all &rarr;
            </Link>
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {others.map((o) => (
              <Link
                key={o.slug}
                to={`/industries/${o.slug}`}
                className="group rounded-2xl border border-gray-100 bg-white p-4.5 hover:shadow-card hover:border-primary-200 hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row gap-3 items-start sm:items-center"
              >
                <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-50 to-cyan-50 border border-cyan-100 text-[#00a4d8] flex items-center justify-center shrink-0 group-hover:bg-gradient-to-br group-hover:from-[#00a4d8] group-hover:to-[#0369a1] group-hover:border-transparent group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
                  <DynamicIcon
                    icon={o.icon}
                    title={o.title}
                    className="w-6 h-6 object-contain text-[#00a4d8] group-hover:text-white group-hover:brightness-0 group-hover:invert transition-all duration-300"
                  />
                </span>
                <span className="font-bold text-ink text-sm leading-snug group-hover:text-[#00a4d8] transition-colors">
                  {o.title}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Inquiry Form */}
      <div id="industry-inquiry">
        <ServiceInquiryForm defaultService={`${ind.title} project`} />
      </div>
      <CtaBanner />
    </div>
  );
}
