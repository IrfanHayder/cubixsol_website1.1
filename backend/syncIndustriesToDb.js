const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const Industry = require('./models/Industry');

// Complete rich industries dataset
const updatedIndustries = [
  {
    slug: 'education',
    title: 'Education',
    icon: 'GraduationCap',
    short: 'Learning platforms, school systems, and engagement tools.',
    desc: 'Cubixsol designs and builds digital products for schools, universities, and EdTech companies — from learner engagement and LMS features to parent communication and multi-institution content delivery.',
    points: [
      'Learning platforms & LMS modules',
      'School & parent communication apps',
      'Content delivery at scale',
      'Progress & completion analytics',
      'Assessment and quiz engines',
      'Role-based portals for staff and students',
    ],
    testimonial: {
      quote: 'Working with Cubixsol felt like gaining a product team, not just a vendor. They understood our learners and shipped with care.',
      name: 'Product Lead',
      role: 'EdTech scale-up',
    },
    workAreas: [
      {
        title: 'K-12 school systems',
        body: 'Attendance-friendly portals, parent messaging, announcements, and class updates that staff actually use day to day.',
      },
      {
        title: 'Higher education & training',
        body: 'Program catalogs, cohort management, and completion tracking across departments or partner institutions.',
      },
      {
        title: 'EdTech product teams',
        body: 'Feature delivery on your roadmap — onboarding, engagement loops, and analytics that improve retention.',
      },
      {
        title: 'Corporate L&D',
        body: 'Role-based learning paths, manager visibility, and content that fits how employees actually learn at work.',
      },
    ],
    productsBuilt: [
      { name: 'Schoolgram', slug: 'schoolgram', blurb: 'School communication suite for parents, teachers, and admin.' },
      { name: 'Image to Text', slug: 'image-to-text', blurb: 'OCR for worksheets, notes, and scanned materials.' },
      { name: 'JPG to PDF', slug: 'jpg-to-pdf', blurb: 'Bundle scans and images into shareable PDFs.' },
    ],
    caseStudies: [
      {
        title: 'Parent–school messaging platform',
        result: 'Real-time announcements and secure threads replaced scattered WhatsApp groups for a multi-campus school network.',
        tags: ['Mobile', 'Messaging', 'Admin portal'],
      },
      {
        title: 'Learner engagement product',
        result: 'Modular courses, quizzes, and progress dashboards shipped for an EdTech team scaling beyond their MVP.',
        tags: ['LMS', 'Analytics', 'Web app'],
      },
      {
        title: 'Multi-org learning catalog',
        result: 'Unified catalog and reporting so institutions could see completion without juggling spreadsheets.',
        tags: ['SaaS', 'Reporting', 'Roles'],
      },
    ],
    stats: [
      { value: '19+', label: 'years of proven market experience' },
      { value: '750+', label: 'experts in Engineering, Data, AI, Design & QA' },
      { value: '550+', label: 'partnerships spanning across six verticals' },
      { value: '80%', label: 'clients rate us better than others' },
    ],
    approachTitle: 'The Cubixsol Approach',
    approachItems: [
      {
        title: 'We Lead with Design',
        subtitle: 'Our team of designers, skilled in product design, UI/UX, and accessibility, create experiences that are:',
        points: [
          { heading: 'Timely', text: 'We design at the pace users need, with rapid learning and iteration built in.' },
          { heading: 'Useful', text: 'Success is measured by how easily users achieve their goals.' },
          { heading: 'Delightful', text: 'We create thoughtful experiences that feel worthwhile.' },
        ],
      },
      {
        title: 'We Leverage Open Source',
        subtitle: 'With thousands of contributions to dozens of open-source projects, we have deep expertise that translates into:',
        points: [
          { heading: 'Sovereignty', text: 'Avoid vendor lock-in and securely deploy on-premises or in private clouds.' },
          { heading: 'Flexibility', text: 'Customize source code and choose licensing that fits your requirements.' },
          { heading: 'Economy', text: 'Reduce hosting, maintenance, and development costs through free, adaptable, AI-ready open-source technologies at greater scale.' },
        ],
      },
      {
        title: 'We Accelerate with AI',
        subtitle: 'We have been working with generative AI for over a decade, applying it to:',
        points: [
          { heading: 'Build Smarter Software', text: 'We integrate agentic workflows using LangGraph, open-weight, and frontier models tailored to user needs, prioritizing sovereignty and adaptability.' },
          { heading: 'Build It Faster Than Ever', text: 'Our teams use Codex, Claude, and multi-agent workflows while managing security, performance, cost, and governance without compromising speed or quality.' },
        ],
      },
    ],
    solutionsTitle: 'Our EdTech Solutions',
    solutionsSubtitle: 'Purpose-built solutions for education organizations, backed by the cross-industry capabilities every technology team needs.',
    solutionsItems: [
      {
        title: 'Modern LMS Systems for Desktop and Mobile',
        body: 'We have deep expertise in best-in-class open-source learning management systems, including Open edX, Moodle, and Edly — our own Open edX fork designed for the enterprise. Every solution comes with self-hosting or managed hosting on AWS, GCP, Oracle, and Azure.',
      },
      {
        title: 'Accelerated Content Production',
        body: "We have world-class capability to produce learning content of every kind: videos, interactive activities, assessments, and AI-based evaluations. Our Edly division's Compose product delivers the fastest possible course authoring experience, driven by AI and letting creators author directly in all major LMSes, including Canvas and Blackboard.",
      },
      {
        title: 'Data Management, Analytics and ML',
        body: "Our data engineering team has deep expertise in edTech data standards like Caliper and xAPI. Understanding, warehousing, and analyzing this data, and building ML-based prediction and forecasting pipelines on top of it, is Cubixsol's forte.",
      },
    ],
    servicesWeOffer: [
      'Custom LMS and learning portals',
      'Mobile apps for students and parents',
      'Assessment and certification flows',
      'Integrations (SIS, payment, SSO)',
      'Analytics and admin dashboards',
      'UI/UX for education products',
    ],
  },
  {
    slug: 'healthcare',
    title: 'Healthcare',
    icon: 'HeartPulse',
    short: 'Secure patient experiences and clinical operations software.',
    desc: 'We design and engineer HIPAA-compliant healthcare software with privacy and reliability in mind — patient portals, scheduling, telehealth flows, and internal clinical tools that reduce friction for staff and patients.',
    points: [
      'HIPAA-compliant patient portals & apps',
      'WebRTC encrypted telehealth & video consults',
      'EHR/EMR integration via HL7 FHIR APIs',
      'E-prescriptions & digital pharmacy routing',
      'Clinical intake & automated triage workflows',
      'Role-based access & strict audit trails',
    ],
    testimonial: {
      quote: 'They balanced usability for clinicians with the compliance constraints we cannot ignore.',
      name: 'Operations Manager',
      role: 'Health services provider',
    },
    stats: [
      { value: '100%', label: 'HIPAA & HITECH Compliant by Default' },
      { value: '120k+', label: 'Patients Served on Cubixsol Systems' },
      { value: 'HL7 FHIR', label: 'Standardized v4 Interoperability' },
      { value: '0.8s', label: 'Real-Time EHR Record Synchronization' },
    ],
    approachTitle: 'The Cubixsol Approach to Healthcare',
    approachItems: [
      {
        title: 'We Engineer for Patient Safety & Trust',
        subtitle: 'Our digital health engineers and medical UX specialists create intuitive care experiences that are:',
        points: [
          { heading: 'Timely', text: 'Fast, frictionless patient intake, instant appointment scheduling, and rapid clinical alerts.' },
          { heading: 'Safe & Compliant', text: 'Zero-trust data vaults, end-to-end WebRTC encryption, and complete audit trails protecting PHI.' },
          { heading: 'Clinician-Friendly', text: 'Thoughtful workflows that reduce electronic documentation fatigue and clicks for providers.' },
        ],
      },
      {
        title: 'We Ensure Interoperability & Compliance',
        subtitle: 'With deep integration expertise across healthcare ecosystems, we ensure your software seamlessly connects:',
        points: [
          { heading: 'EHR & EMR Systems', text: 'Bi-directional integration with Epic, Cerner, Allscripts, and AthenaHealth via HL7 FHIR v4.' },
          { heading: 'Regulatory Standards', text: 'Guaranteed adherence to HIPAA, HITECH, FDA 21 CFR Part 11, and GDPR health privacy rules.' },
          { heading: 'Medical Device APIs', text: 'Stream real-time vitals and diagnostic telemetry from FDA-cleared remote patient monitoring (RPM) hardware.' },
        ],
      },
      {
        title: 'We Accelerate Clinical AI & Telehealth',
        subtitle: 'We integrate medical-grade intelligence and WebRTC communication into modern clinical products:',
        points: [
          { heading: 'Intelligent Symptom Triage', text: 'AI-assisted clinical questionnaires that route patients to appropriate care tiers.' },
          { heading: 'Sub-100ms HD Telehealth', text: 'Browser-based WebRTC video consultations with zero downloads and live vitals overlay.' },
          { heading: 'Automated Clinical Charting', text: 'AI-generated consultation summaries and ICD-10 diagnostic coding assistance.' },
        ],
      },
    ],
    solutionsTitle: 'Our Healthcare & Life Sciences Solutions',
    solutionsSubtitle: 'Enterprise-grade digital health platforms, clinical workflow automation, and EHR interoperability built for hospitals, clinics, and healthtech startups.',
    solutionsItems: [
      {
        title: 'Telehealth & Virtual Care Delivery Suites',
        body: 'We engineer HIPAA-compliant telehealth applications with WebRTC HD video, multi-party family consultations, in-call chat, screen sharing, and integrated digital prescription (e-Rx) dispatch. Works seamlessly on desktop browsers, iOS, and Android with zero installation required.',
      },
      {
        title: 'EHR / EMR Interoperability & FHIR Middleware',
        body: 'Connect modern wellness apps and patient portals with legacy hospital systems. We build robust HL7 v2/v3, C-CDA, and SMART on FHIR middleware pipelines that sync clinical notes, lab results, and patient demographics in sub-second intervals.',
      },
      {
        title: 'Remote Patient Monitoring (RPM) & Medical AI',
        body: 'Continuous care pipelines that ingest telemetry from Bluetooth and cellular medical devices (blood pressure cuffs, continuous glucose monitors, pulse oximeters). Includes automated threshold alert systems for nurse dispatch and ML-based early warning scoring.',
      },
    ],
    workAreas: [
      {
        title: 'Patient Engagement & Portals',
        body: 'Frictionless patient self-scheduling, pre-visit intake questionnaires, lab result viewing, and secure clinician messaging.',
      },
      {
        title: 'Telehealth & Virtual Care',
        body: 'Browser-based HD video consultation rooms with zero downloads, screen sharing, digital whiteboard, and live vitals telemetry.',
      },
      {
        title: 'Clinical Operations & Workflow',
        body: 'EHR-integrated staff dashboards that streamline nurse charting, patient room assignments, and diagnostic handoffs.',
      },
      {
        title: 'Remote Patient Monitoring (RPM)',
        body: 'IoT health device synchronization (blood pressure, glucose, pulse oximetry) with automated clinical threshold alert triggers.',
      },
    ],
    productsBuilt: [
      { name: 'MediConnect Telehealth', slug: 'mediconnect', blurb: 'Encrypted virtual clinic suite for outpatient care.' },
      { name: 'DocuCare Patient Portal', slug: 'docucare', blurb: 'Self-service patient appointment, charts, and billing access.' },
    ],
    caseStudies: [
      {
        title: 'Multi-Specialty Telehealth Platform',
        result: 'Built an encrypted WebRTC telehealth system handling 12,000+ monthly clinical consultations with 99.98% video reliability.',
        tags: ['WebRTC', 'HIPAA', 'Telehealth'],
      },
      {
        title: 'FHIR EHR Integration Pipeline',
        result: 'Unified legacy Cerner and Epic medical records into a single patient summary dashboard, cutting physician charting time by 32%.',
        tags: ['HL7 FHIR', 'EHR', 'Security'],
      },
      {
        title: 'Digital Patient Intake & Triage Suite',
        result: 'Replaced paper intake forms with contactless mobile check-in across 18 regional clinics, eliminating waiting room bottlenecks.',
        tags: ['Mobile UX', 'Triage', 'Portal'],
      },
    ],
    servicesWeOffer: [
      'Custom HIPAA-compliant web & mobile apps',
      'EHR / EMR interoperability (HL7 FHIR, SMART on FHIR)',
      'Encrypted telehealth & WebRTC video rooms',
      'Medical billing & insurance eligibility APIs',
      'Clinical workflow automation dashboards',
      'Healthcare UI/UX design & accessibility audits',
    ],
  },
  {
    slug: 'fintech',
    title: 'Finance & Fintech',
    icon: 'Landmark',
    short: 'Payments, dashboards, and compliant financial products.',
    desc: 'From customer-facing finance apps to internal risk and reporting tools, we help fintech and finance teams ship secure, auditable software that moves money and data with clarity.',
    points: [
      'PCI-DSS compliant payment & checkout flows',
      'Automated KYC / AML verification pipelines',
      'High-frequency ledger & reconciliation engines',
      'Open Banking & ISO 20022 messaging APIs',
      'Multi-currency digital wallet architectures',
      'Real-time fraud anomaly scoring & risk dashboards',
    ],
    testimonial: {
      quote: 'Cubixsol delivered a clean payment experience without cutting corners on controls.',
      name: 'CTO',
      role: 'Fintech startup',
    },
    stats: [
      { value: '< 25ms', label: 'Average Execution & Ledger Latency' },
      { value: '$250M+', label: 'Annual Processed Transaction Volume' },
      { value: '99.999%', label: 'Uptime SLA for Critical Core Services' },
      { value: 'PCI-DSS L1', label: 'Certified Bank-Grade Security Defaults' },
    ],
    approachTitle: 'The Cubixsol Approach to Fintech',
    approachItems: [
      {
        title: 'We Engineer for Financial Security & Trust',
        subtitle: 'Our financial systems architects and fintech engineers build payment products that are:',
        points: [
          { heading: 'Ultra-Fast', text: 'Sub-25ms API response times, instant transaction settlement, and distributed cache performance.' },
          { heading: 'Bank-Grade Secure', text: 'Hardware-level AES-256 encryption, zero-trust tokenization, and strict PCI-DSS Level 1 compliance.' },
          { heading: 'Frictionless UX', text: '1-click checkout experiences and biometric mobile authentication that maximize conversion.' },
        ],
      },
      {
        title: 'We Ensure Full Regulatory Compliance',
        subtitle: 'With deep integration experience across payment rails and open banking protocols, we ensure:',
        points: [
          { heading: 'Open Banking & ISO 20022', text: 'Interoperable APIs for Plaid, Stripe, Yodlee, SWIFT, and SEPA cross-border networks.' },
          { heading: 'Automated KYC & AML', text: 'Real-time biometric liveness checks, document verification, and sanction list screening.' },
          { heading: 'Immutable Audit Ledgers', text: 'Double-entry accounting systems with cryptographically verified transaction histories.' },
        ],
      },
      {
        title: 'We Accelerate with Real-Time AI & Risk Intelligence',
        subtitle: 'We embed predictive machine learning models directly into transaction processing pipelines:',
        points: [
          { heading: 'Real-Time Fraud Prevention', text: 'Zero-shot anomaly scoring that stops fraudulent transfers before settlement occurs.' },
          { heading: 'Dynamic Routing & Failover', text: 'Multi-processor smart routing that minimizes interchange fees and boosts authorization rates.' },
          { heading: 'Automated Underwriting', text: 'Instant credit decisioning algorithms that evaluate multi-source borrower risk.' },
        ],
      },
    ],
    solutionsTitle: 'Our Financial & Fintech Solutions',
    solutionsSubtitle: 'Institutional-grade payment gateways, digital wallets, core banking ledgers, and KYC pipelines designed to scale with complete reliability.',
    solutionsItems: [
      {
        title: 'Payment Orchestration & Checkout Engines',
        body: 'Multi-processor routing gateways with 3D Secure 2.2 authentication, recurring subscription billing, localized alternative payment methods (Apple Pay, Google Pay, Pix, iDEAL), and automated chargeback dispute resolution.',
      },
      {
        title: 'Neo-Banking & Digital Wallet Infrastructure',
        body: 'Full-featured digital banking applications with virtual/physical card issuance (Marqeta, Lithic), real-time P2P balance transfers, instant ACH/SEPA payments, and automated financial health analytics.',
      },
      {
        title: 'Core Ledgers, KYC & Risk Automation',
        body: 'High-throughput double-entry ledgers capable of handling 50,000+ operations/sec with automated multi-bank reconciliation, automated SAR filing, and real-time KYC/AML identity verification.',
      },
    ],
    workAreas: [
      {
        title: 'Payment Gateways & Checkout Orchestration',
        body: 'Smart routing across multiple payment processors (Stripe, Adyen, Braintree) with automatic fallbacks and 3D-Secure 2.2 support.',
      },
      {
        title: 'Neo-Banking & Digital Wallets',
        body: 'Virtual/physical debit card issuance (Marqeta/Lithic), account balances, P2P money transfers, and transaction categorization.',
      },
      {
        title: 'KYC, Identity & Compliance Workflows',
        body: 'Automated biometric liveness checks, document verification, AML sanctions screening, and audit trail record keeping.',
      },
      {
        title: 'Risk & Fraud Intelligence Dashboards',
        body: 'Machine learning velocity models, suspicious activity report (SAR) generation, and real-time transaction limits.',
      },
    ],
    productsBuilt: [
      { name: 'PayFlow Gateway', slug: 'payflow', blurb: 'Unified multi-currency payment checkout & tokenization engine.' },
      { name: 'LedgerPro', slug: 'ledgerpro', blurb: 'Double-entry accounting and automated transaction reconciliation.' },
    ],
    caseStudies: [
      {
        title: 'High-Volume Micro-Lending Engine',
        result: 'Engineered an automated credit underwriting API processing $45M+ in loan disbursements with sub-2-second decision latency.',
        tags: ['Credit Scoring', 'Microservices', 'Fintech'],
      },
      {
        title: 'Cross-Border B2B Payment Hub',
        result: 'Delivered an FX settlement platform supporting 28 currencies with automated SWIFT / SEPA routing and real-time reconciliation.',
        tags: ['FX Payments', 'ISO 20022', 'Multi-currency'],
      },
      {
        title: 'Embedded Neo-Bank Mobile Experience',
        result: 'Shipped a full-featured digital banking app with virtual cards and instant Apple Wallet / Google Pay provisioning in 4 months.',
        tags: ['Mobile Banking', 'Card Issuance', 'Security'],
      },
    ],
    servicesWeOffer: [
      'PCI-DSS compliant architecture design',
      'Payment processor integrations (Stripe, Adyen, Plaid)',
      'Digital wallet & ledger engineering',
      'KYC/AML identity verification flows',
      'Risk modeling & fraud detection portals',
      'Financial data visualization & analytics',
    ],
  },
  {
    slug: 'ecommerce',
    title: 'E-Commerce',
    icon: 'ShoppingCart',
    short: 'Stores, marketplaces, and conversion-focused commerce.',
    desc: 'We build high-converting storefronts, custom checkout, and commerce backends — with inventory, promotions, and analytics wired for growth.',
    points: [
      'Sub-second headless storefronts (Next.js, Remix, Hydrogen)',
      'High-converting 1-click checkout & payment gateways',
      'AI-driven product recommendations & visual search',
      'Multi-channel inventory & 3PL order routing sync',
      'Multi-vendor marketplace portals & vendor payouts',
      'Real-time customer lifetime value (LTV) & cart analytics',
    ],
    testimonial: {
      quote: 'Our conversion and ops visibility improved in the same release cycle.',
      name: 'Head of Digital',
      role: 'Retail brand',
    },
    workAreas: [
      {
        title: 'Headless Storefront Engineering',
        body: 'Custom storefronts built with Shopify Plus, MedusaJS, BigCommerce, or Commerce Layer for blazing speed and zero layout shift.',
      },
      {
        title: 'Checkout & Conversion Optimization',
        body: 'Custom cart drawers, 1-click Apple Pay/Google Pay checkout, auto-address verification, and personalized dynamic upsell modules.',
      },
      {
        title: 'Multi-Vendor Marketplaces',
        body: 'Vendor registration, automated commission splitting, individual merchant dashboards, and centralized catalog moderation.',
      },
      {
        title: 'OMS, ERP & 3PL Logistics Sync',
        body: 'Automated order routing across multiple fulfillment centers, inventory reconciliation with NetSuite/SAP, and automated return flows.',
      },
    ],
    productsBuilt: [
      { name: 'NovaStorefront', slug: 'novastorefront', blurb: 'Ultra-fast headless commerce framework with sub-0.5s TTFB.' },
      { name: 'CartBoost AI', slug: 'cartboost', blurb: 'Dynamic personalized checkout upsells and abandonment recovery.' },
    ],
    caseStudies: [
      {
        title: 'Global Direct-to-Consumer (DTC) Replatform',
        result: 'Migrated an omnichannel retail brand to headless Shopify Hydrogen, increasing mobile checkout conversions by 42% and boosting page speed to 98/100.',
        tags: ['Hydrogen', 'Shopify Plus', 'Conversion'],
      },
      {
        title: 'Multi-Vendor Artisan Marketplace',
        result: 'Built a marketplace connecting 450+ independent sellers with automated Stripe Connect payouts and unified shipping label generation.',
        tags: ['Marketplace', 'Stripe Connect', 'OMS'],
      },
      {
        title: 'High-Scale Flash Sale Infrastructure',
        result: 'Engineered auto-scaling backend architecture that handled 85,000 concurrent shoppers during Black Friday with zero checkout downtime.',
        tags: ['High Concurrency', 'Redis', 'Scale'],
      },
    ],
    servicesWeOffer: [
      'Headless commerce development (Shopify Plus, Medusa, Magento)',
      'Custom checkout & payment integrations',
      'Marketplace platform engineering',
      'Omnichannel inventory & ERP synchronization',
      'Conversion Rate Optimization (CRO) audits',
      'Mobile commerce apps (iOS & Android)',
    ],
  },
  {
    slug: 'real-estate',
    title: 'Real Estate',
    icon: 'Building2',
    short: 'Listings, portals, and property operations platforms.',
    desc: 'Property search, agent tools, and operations software for developers and agencies — fast listing experiences and reliable backend workflows.',
    points: [
      'Sub-minute MLS / IDX & RESO Web API synchronization',
      'Interactive spatial map search with Mapbox polygon filters',
      'Integrated 3D Matterport virtual tour & floor plan viewers',
      'Intelligent agent CRM & round-robin lead routing',
      'Digital offer management & e-signature closing vaults',
      'PMS integrations (Yardi, RealPage, AppFolio)',
    ],
    testimonial: {
      quote: 'Listings and leads finally lived in one system our agents actually use.',
      name: 'Sales Director',
      role: 'Property group',
    },
    stats: [
      { value: '< 60s', label: 'MLS & RESO Feed Synchronization Frequency' },
      { value: '+65%', label: 'Online Tour Booking & Lead Conversion Lift' },
      { value: '3.4x', label: 'Average On-Page Property Dwell Time' },
      { value: 'RESO API', label: 'Certified Real Estate Standard Standardized' },
    ],
    approachTitle: 'The Cubixsol Approach to Real Estate',
    approachItems: [
      {
        title: 'We Engineer for Spatial Immersion & Speed',
        subtitle: 'Our PropTech software engineers and real estate UX specialists craft listing platforms that are:',
        points: [
          { heading: 'Sub-Minute Sync', text: 'RESO Web API synchronization that reflects new listings and price cuts in under 60 seconds.' },
          { heading: 'Immersive Spatial UX', text: 'Embedded 3D Matterport virtual walkthroughs and Mapbox polygon spatial search.' },
          { heading: 'High-Converting Flow', text: 'Frictionless tour booking and automated SMS routing to local on-duty agents.' },
        ],
      },
      {
        title: 'We Ensure Full MLS & RESO Compliance',
        subtitle: 'With deep integration expertise across North American & global real estate feeds:',
        points: [
          { heading: 'RESO Web API Standard', text: 'Certified data pipelines ensuring accurate listing status, photos, and agent attribution.' },
          { heading: 'Fair Housing & WCAG 2.1', text: 'Built-in accessibility compliance, screen reader support, and equal housing opportunity notices.' },
          { heading: 'PMS Interoperability', text: 'Two-way synchronization with Yardi, RealPage, AppFolio, and Entrata property databases.' },
        ],
      },
      {
        title: 'We Accelerate Brokerage & Agent Conversions',
        subtitle: 'We build automated intelligence pipelines that convert casual website visitors into signed clients:',
        points: [
          { heading: 'Sub-45s Lead Routing', text: 'Round-robin agent assignment with instant push alerts that maximize lead response rates.' },
          { heading: 'Automated CMA Reports', text: 'Instant Comparative Market Analysis generation powered by live neighborhood comps.' },
          { heading: 'Digital Escrow Vaults', text: 'Secure digital offer submission, automated e-signatures, and transaction milestone tracking.' },
        ],
      },
    ],
    solutionsTitle: 'Our Real Estate & PropTech Solutions',
    solutionsSubtitle: 'Enterprise MLS listing portals, spatial map search engines, brokerage CRMs, and property management suites designed for modern agencies.',
    solutionsItems: [
      {
        title: 'MLS / IDX Search Portals & Interactive Map GIS',
        body: 'Custom polygon drawing search filters, commute-time radius calculations, school district boundary layers, automated price drop notifications, and high-speed image CDN delivery.',
      },
      {
        title: 'Brokerage CRM & Agent Round-Robin Automation',
        body: 'Automated lead qualification and routing engine with instant SMS alerts, showing calendar scheduling, agent commission pipelines, and digital transaction document vaults.',
      },
      {
        title: 'Property Management & Digital Tenant Onboarding',
        body: 'End-to-end tenant portals for online rent collection (ACH/Credit), digital lease execution, maintenance ticketing with photo uploads, and real-time landlord financial reporting.',
      },
    ],
    workAreas: [
      {
        title: 'MLS/IDX Listing Portals',
        body: 'High-speed property search portals with neighborhood school ratings, transit scores, tax history, and automated price alert notifications.',
      },
      {
        title: 'Interactive Spatial & Map Exploration',
        body: 'Custom polygon drawing search, commute time radius filters, and interactive 3D site plan maps for master-planned communities.',
      },
      {
        title: 'Agent CRM & Lead Automation',
        body: 'Automated lead scoring, instant SMS notifications to on-duty agents, showing calendar scheduling, and commission pipeline tracking.',
      },
      {
        title: 'Property Management & Tenant Portals',
        body: 'Online rent collection, digital lease signing, maintenance ticketing with photo uploads, and owner payout reporting.',
      },
    ],
    productsBuilt: [
      { name: 'PropView IDX', slug: 'propview', blurb: 'Blazing-fast MLS search engine with interactive map filtering.' },
      { name: 'LeasePilot', slug: 'leasepilot', blurb: 'Digital tenant onboarding, screening, and automated lease signing.' },
    ],
    caseStudies: [
      {
        title: 'Luxury Brokerage Web & Map Portal',
        result: 'Designed and built a custom RESO-compliant listing platform that drove a 65% increase in online tour bookings across 8 metropolitan markets.',
        tags: ['RESO API', 'Mapbox', 'PropTech'],
      },
      {
        title: 'Commercial Property Management Suite',
        result: 'Delivered an integrated tenant portal for 1.2M sq. ft. of commercial office space, automating lease renewals and maintenance tracking.',
        tags: ['PMS', 'Tenant Portal', 'SaaS'],
      },
      {
        title: 'Automated Real Estate Lead Router',
        result: 'Engineered an AI-assisted lead qualification and SMS dispatch engine that reduced agent response times from 3 hours to 45 seconds.',
        tags: ['CRM', 'Automation', 'SMS'],
      },
    ],
    servicesWeOffer: [
      'Custom MLS / IDX listing portal development',
      'Interactive Mapbox & GIS spatial search tools',
      'Virtual tour & 3D walkthrough integrations',
      'Real estate CRM & agent automation tools',
      'Property management software (PMS) sync',
      'Digital contract & escrow workflow systems',
    ],
  },
  {
    slug: 'saas',
    title: 'SaaS',
    icon: 'Cloud',
    short: 'Multi-tenant products built to onboard, retain, and scale.',
    desc: 'We partner with SaaS teams on product engineering — from MVP to scale — with solid tenancy, billing hooks, admin, and customer-facing UX.',
    points: [
      'Multi-tenant architecture with PostgreSQL Row-Level Security',
      'Metered, tiered & seat-based Stripe billing engines',
      'Enterprise SSO (SAML 2.0 / Okta / Azure AD) & SCIM sync',
      'Granular Role-Based Access Control (RBAC) matrices',
      'Feature flags, canary deployments & A/B test pipelines',
      'Full-stack telemetry & product adoption analytics',
    ],
    testimonial: {
      quote: 'They thought in product metrics, not just tickets closed.',
      name: 'Founder',
      role: 'B2B SaaS',
    },
    stats: [
      { value: '< 10 min', label: 'Average Customer Time-to-Value & Setup' },
      { value: '99.99%', label: 'Multi-Tenant Row-Level Data Isolation' },
      { value: 'SAML 2.0', label: 'Enterprise SSO & Automated SCIM Ready' },
      { value: '100%', label: 'SOC-2 & ISO 27001 Audit Trail Compliance' },
    ],
    approachTitle: 'The Cubixsol Approach to SaaS & Cloud Platforms',
    approachItems: [
      {
        title: 'We Architect for Multi-Tenancy & Isolation',
        subtitle: 'Our cloud architects and SaaS systems engineers build multi-tenant backends that are:',
        points: [
          { heading: 'Row-Level Secure', text: 'PostgreSQL RLS and schema isolation guaranteeing zero cross-tenant data leakage.' },
          { heading: 'Subdomain Automated', text: 'Instant dynamic DNS tenant routing (tenant.yourplatform.com) with automated TLS certificates.' },
          { heading: 'High-Throughput Pool', text: 'Tenant-aware connection pooling and Redis caching for sub-20ms database queries.' },
        ],
      },
      {
        title: 'We Implement Frictionless Monetization & Billing',
        subtitle: 'From product-led growth freemium models to complex enterprise contracts, we build:',
        points: [
          { heading: 'Stripe & Paddle Metering', text: 'Real-time usage aggregation, tiered seat management, and self-serve upgrade flows.' },
          { heading: 'Automated Dunning', text: 'Smart credit card retry logic and automated email recovery flows that reduce involuntary churn.' },
          { heading: 'Global Tax Compliance', text: 'Automated sales tax and VAT calculation via Stripe Tax and TaxJar integration.' },
        ],
      },
      {
        title: 'We Accelerate Product-Led Growth & Retention',
        subtitle: 'We embed behavioral analytics and activation loops directly into the application UX:',
        points: [
          { heading: 'Self-Serve Onboarding', text: 'Interactive product walkthroughs and checklist empty-states that cut time-to-value to minutes.' },
          { heading: 'Feature Flag Canary', text: 'LaunchDarkly and PostHog integration for progressive rollouts and zero-downtime releases.' },
          { heading: 'Enterprise Security Ready', text: 'One-click Okta, Azure AD, and Google Workspace SAML SSO with automated SCIM provisioning.' },
        ],
      },
    ],
    solutionsTitle: 'Our SaaS & Cloud Architecture Solutions',
    solutionsSubtitle: 'Enterprise multi-tenant microservices, automated subscription engines, SSO/SCIM security, and real-time product telemetry engineered to scale seamlessly.',
    solutionsItems: [
      {
        title: 'Multi-Tenant Cloud Infrastructure & PostgreSQL RLS',
        body: 'Distributed multi-tenant database clusters with Row-Level Security, custom tenant subdomains, automated database backup snapshots, and zero-downtime migrations.',
      },
      {
        title: 'Subscription Monetization, Stripe Billing & Usage Meters',
        body: 'Custom billing portals with seat allocation, metered API usage tracking, automated invoice generation, proration calculations, and self-serve tier upgrades.',
      },
      {
        title: 'Enterprise SSO, SAML 2.0 & Role-Based Access Control',
        body: 'Universal identity orchestration supporting Okta, Azure AD, Google Workspace, automated SCIM user provisioning, and granular RBAC permission matrices.',
      },
    ],
    workAreas: [
      {
        title: 'Multi-Tenant Backend Architecture',
        body: 'Scalable cloud infrastructure supporting isolated tenant data, custom subdomains, and automated tenant provisioning.',
      },
      {
        title: 'Billing, Subscriptions & Monetization',
        body: 'Complex pricing tier implementation, usage meters, self-serve upgrade flows, proration calculations, and automated dunning.',
      },
      {
        title: 'Enterprise Readiness & Security',
        body: 'SAML 2.0 SSO, audit logs, automated SCIM provisioning, IP allowlisting, and compliance export tooling for enterprise buyers.',
      },
      {
        title: 'Onboarding & Activation Loops',
        body: 'Frictionless self-serve onboarding wizards, interactive product tours, empty states, and behavioral trigger emails that lift Day-1 retention.',
      },
    ],
    productsBuilt: [
      { name: 'SaaSKit Pro', slug: 'saaskit', blurb: 'Production-ready multi-tenant SaaS starter with billing & auth.' },
      { name: 'TenantPulse', slug: 'tenantpulse', blurb: 'Product health scoring and churn prediction dashboard.' },
    ],
    caseStudies: [
      {
        title: 'B2B Workflow Automation SaaS',
        result: 'Architected and shipped a multi-tenant workflow SaaS from scratch to $1.2M ARR in 10 months with 99.99% system availability.',
        tags: ['Multi-Tenant', 'Stripe Billing', 'Node.js'],
      },
      {
        title: 'Enterprise SSO & Compliance Upgrade',
        result: 'Added Okta/Azure SAML SSO and SOC 2 audit logging to an existing SaaS platform, unblocking $800k in enterprise pipeline deals.',
        tags: ['SAML', 'Enterprise', 'Security'],
      },
      {
        title: 'Product-Led Growth (PLG) Onboarding Flow',
        result: 'Redesigned the self-serve signup and activation funnel, increasing free-to-paid conversion rate by 3.2x in 60 days.',
        tags: ['PLG', 'Onboarding', 'UX'],
      },
    ],
    servicesWeOffer: [
      'MVP architecture & rapid full-stack delivery',
      'Multi-tenant database design & security isolation',
      'Subscription billing & usage metering (Stripe/Paddle)',
      'Enterprise SSO & SCIM directory integration',
      'Feature flag & CI/CD pipeline setup',
      'Product UI/UX design & design systems',
    ],
  },
  {
    slug: 'logistics',
    title: 'Logistics',
    icon: 'Truck',
    short: 'Tracking, dispatch, and operations visibility on the move.',
    desc: 'Logistics software for dispatch, tracking, and partner coordination — mobile-friendly field tools and control-tower dashboards.',
    points: [
      'Real-time GPS telematics & fleet map tracking',
      'Dynamic multi-stop route optimization algorithms',
      'Mobile Electronic Proof of Delivery (ePOD) & scanning',
      'Geo-fencing alerts & automated micro-milestone updates',
      'TMS & WMS integrations (SAP, Oracle TM, Blue Yonder)',
      'Cold-chain IoT sensor telemetry & exception alerts',
    ],
    testimonial: {
      quote: 'Field and office teams finally saw the same status in real time.',
      name: 'Fleet Manager',
      role: 'Regional logistics',
    },
    workAreas: [
      {
        title: 'Dispatch & Fleet Management',
        body: 'Live fleet dispatch control towers, automated load assignment, driver shift scheduling, and hours-of-service compliance tracking.',
      },
      {
        title: 'Last-Mile Route Optimization',
        body: 'AI-driven routing that calculates optimal delivery sequences factoring in traffic, time windows, vehicle weight, and toll costs.',
      },
      {
        title: 'Driver Companion Mobile Apps',
        body: 'Turn-by-turn navigation, barcode scanning, digital signature capture, photo damage documentation, and instant offline sync.',
      },
      {
        title: 'Supply Chain Visibility & Customer Tracking',
        body: 'Branded live tracking pages for end recipients with live map pins, accurate ETAs, and automated SMS milestone updates.',
      },
    ],
    productsBuilt: [
      { name: 'FleetTower', slug: 'fleettower', blurb: 'Real-time fleet telematics, dispatch, and geo-fence tracking.' },
      { name: 'DeliverPass', slug: 'deliverpass', blurb: 'Contactless electronic proof of delivery (ePOD) mobile app.' },
    ],
    caseStudies: [
      {
        title: 'Regional Freight Dispatch & Telematics Hub',
        result: 'Deployed a real-time dispatch dashboard for 220+ commercial trucks, reducing deadhead miles by 19% and fuel costs by $140,000/yr.',
        tags: ['Telematics', 'GPS', 'Routing'],
      },
      {
        title: 'Last-Mile Delivery Driver Mobile App',
        result: 'Built an offline-first iOS/Android driver app with high-speed barcode scanning, cutting average stop time by 45 seconds per delivery.',
        tags: ['Mobile ePOD', 'Offline-First', 'Scanning'],
      },
      {
        title: 'End-to-End Customer Tracking Portal',
        result: 'Shipped a live customer delivery tracker handling 40,000+ daily package updates, reducing "Where Is My Order" support calls by 58%.',
        tags: ['Customer UX', 'Live Map', 'WebSockets'],
      },
    ],
    servicesWeOffer: [
      'Fleet tracking & dispatch portal development',
      'Route optimization & heuristic algorithms',
      'Driver mobile apps (ePOD, barcode scanning)',
      'TMS / WMS integration (SAP, Oracle, Blue Yonder)',
      'IoT sensor telematics & temperature monitoring',
      'Customer-facing real-time tracking experiences',
    ],
  },
  {
    slug: 'travel',
    title: 'Travel & Hospitality',
    icon: 'Plane',
    short: 'Booking journeys and guest experiences that convert.',
    desc: 'Booking flows, supplier integrations, and guest apps for travel and hospitality brands that need reliability at peak demand.',
    points: [
      'Multi-GDS & airline NDC aggregator APIs (Amadeus, Sabre)',
      'Dynamic packaging engines (Flights + Hotels + Activities)',
      'High-concurrency stress-tested booking infrastructure',
      'Mobile guest apps with BLE contactless room key access',
      'PMS & Channel Manager sync (Opera, Cloudbeds, Mews)',
      'Multi-currency pricing & automated loyalty rewards',
    ],
    testimonial: {
      quote: 'Peak season held up — and the booking UX stayed simple.',
      name: 'Digital Manager',
      role: 'Hospitality group',
    },
    workAreas: [
      {
        title: 'Flight & Hotel Booking Engines',
        body: 'High-speed flight search, fare matrix comparison, seat map selection, hotel room filtering, and instant PNR generation.',
      },
      {
        title: 'Dynamic Packaging & Yield Management',
        body: 'Automated bundle pricing algorithms combining flights, hotels, and excursions with customizable supplier commission markups.',
      },
      {
        title: 'Guest Experience & Mobile Room Keys',
        body: 'Native mobile guest apps supporting online check-in, Bluetooth digital door locks, in-app room service, and concierge chat.',
      },
      {
        title: 'Hospitality PMS & Channel Management',
        body: 'Real-time two-way synchronization of rates, availability, and guest profiles across Booking.com, Expedia, Airbnb, and direct booking channels.',
      },
    ],
    productsBuilt: [
      { name: 'VoyageEngine', slug: 'voyageengine', blurb: 'Sub-second multi-GDS flight and hotel aggregator engine.' },
      { name: 'StayKey Mobile', slug: 'staykey', blurb: 'Contactless guest check-in and BLE digital room key app.' },
    ],
    caseStudies: [
      {
        title: 'Global Tour Operator Booking Platform',
        result: 'Unified 14 supplier API feeds into a single dynamic package booking engine, increasing average booking value by 28%.',
        tags: ['GDS APIs', 'Dynamic Packaging', 'Scale'],
      },
      {
        title: 'Boutique Hotel Mobile Guest App',
        result: 'Shipped a contactless guest app with digital key access across 6 luxury properties, resulting in a 4.9/5 guest satisfaction score.',
        tags: ['BLE Key', 'Mobile App', 'Hospitality'],
      },
      {
        title: 'High-Traffic Flash Sale Travel Engine',
        result: 'Engineered auto-scaling booking infrastructure that processed 15,000 simultaneous booking checkouts during peak holiday season with 0 errors.',
        tags: ['High Concurrency', 'Redis Lock', 'Cloud'],
      },
    ],
    servicesWeOffer: [
      'Custom travel booking engine development',
      'GDS / NDC integrations (Amadeus, Sabre, Travelport)',
      'Dynamic packaging & revenue management software',
      'Hotel PMS & channel manager sync',
      'Mobile guest apps & digital key integration',
      'Travel loyalty program & points redemption engines',
    ],
  },
  {
    slug: 'technology',
    title: 'Technology',
    icon: 'Cpu',
    short: 'Platforms, developer tools, and internal tech products.',
    desc: 'For technology companies building platforms or internal tools, we embed as an engineering partner — architecture, delivery, and UI that matches product standards.',
    points: [
      'Internal Developer Platforms (IDP) on Kubernetes & Terraform',
      'High-throughput microservice & Kafka event bus backbones',
      'Distributed tracing & OpenTelemetry observability stacks',
      'Enterprise React & TypeScript design systems / component SDKs',
      'Zero-downtime CI/CD GitOps pipelines',
      'API gateway orchestration with gRPC & GraphQL',
    ],
    testimonial: {
      quote: 'They matched our engineering bar and moved at product speed.',
      name: 'VP Engineering',
      role: 'Tech company',
    },
    workAreas: [
      {
        title: 'Internal Developer Platforms & Tooling',
        body: 'Self-serve developer portals (Backstage), ephemeral preview environment spin-up, and standardized service scaffolding templates.',
      },
      {
        title: 'Event-Driven Microservice Architecture',
        body: 'Decoupled asynchronous event pipelines using Apache Kafka, RabbitMQ, and AWS SQS for resilient, high-volume data streams.',
      },
      {
        title: 'Design Systems & Component Libraries',
        body: 'Accessible, tokenized UI component libraries with automated Storybook testing, zero-runtime styling, and npm package publishing.',
      },
      {
        title: 'Observability, SRE & Cloud Infrastructure',
        body: 'Full-stack instrumentation with Prometheus, Grafana, OpenTelemetry, and Datadog to ensure 99.999% system availability.',
      },
    ],
    productsBuilt: [
      { name: 'DevScaffold CLI', slug: 'devscaffold', blurb: 'Internal CLI tool for spinning up microservices and preview environments in seconds.' },
      { name: 'CoreUI Design System', slug: 'coreui', blurb: 'Enterprise-grade React component library with WCAG 2.1 AA compliance.' },
    ],
    caseStudies: [
      {
        title: 'Internal Developer Platform Modernization',
        result: 'Architected a Kubernetes-based IDP that cut developer environment provisioning times from 2 days to 45 seconds for 180+ engineers.',
        tags: ['Kubernetes', 'IDP', 'DevOps'],
      },
      {
        title: 'High-Throughput Event Streaming Backbone',
        result: 'Designed a Kafka microservices pipeline processing 500,000+ events per second with sub-15ms message delivery latency.',
        tags: ['Kafka', 'gRPC', 'Distributed Systems'],
      },
      {
        title: 'Multi-Brand Enterprise Design System',
        result: 'Created a unified React/TypeScript design system deployed across 4 distinct SaaS products, reducing UI development cycles by 50%.',
        tags: ['Design System', 'React', 'Storybook'],
      },
    ],
    servicesWeOffer: [
      'Internal developer platform (IDP) engineering',
      'Event-driven architecture & microservices delivery',
      'Enterprise design systems & React component SDKs',
      'Cloud infrastructure as code (Terraform, AWS, GCP)',
      'API gateway & gRPC/GraphQL development',
      'Site Reliability Engineering (SRE) & observability setup',
    ],
  },
];

async function run() {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB:', mongoUri);
    await mongoose.connect(mongoUri);

    for (const ind of updatedIndustries) {
      await Industry.findOneAndUpdate(
        { slug: ind.slug },
        { $set: ind },
        { upsert: true, new: true }
      );
      console.log(`[✓] Synced industry: ${ind.title} (${ind.slug})`);
    }

    console.log('All 9 industries successfully synchronized in MongoDB!');
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error syncing industries:', err);
    process.exit(1);
  }
}

run();
