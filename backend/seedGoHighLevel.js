const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Service = require('./models/Service');
const PageContent = require('./models/PageContent');

const ghlData = {
  slug: 'ghl-automation',
  title: 'GoHighLevel (GHL) Automation Services',
  menuTitle: 'GHL Automation',
  icon: 'Zap',
  color: 'text-red-500 bg-red-50',
  gradient: 'from-red-500 to-rose-600',
  heroEyebrow: 'GOHIGHLEVEL AUTOMATION SERVICES',
  heroTitle: 'Turn missed leads into automated follow-ups & booked conversations',
  heroDesc: 'Cubixsol designs and deploys custom GoHighLevel (GHL) workflows, snapshots, pipelines, and integrations that scale your operations without expanding headcounts.',
  heroPrimaryBtnText: 'Book a Discovery Call',
  heroSecondaryBtnText: 'View Case Studies',
  heroBadges: ['★ 4.9/5 Client Rating', '500+ Automated Workflows', 'HighLevel Certified Partner'],
  heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&h=800&q=80',

  // Problem Section
  problemEyebrow: 'WHERE REVENUE LEAKS',
  problemTitle: 'Most leads are lost after the first contact, not before it',
  problemDesc: 'Without automation, response times drag, follow-ups drop, and valuable prospect interest cools down before a sales rep even dials.',
  problemCards: [
    {
      icon: 'Clock',
      title: 'Delayed Response Times',
      desc: 'Leads go cold within 5 minutes. Without automated instant SMS/email triggers, speed-to-lead drops by over 80%.',
    },
    {
      icon: 'Users',
      title: 'Manual Pipeline Drag',
      desc: 'Sales reps waste up to 4 hours daily manually copying contacts, logging calls, and typing repetitive messages instead of closing.',
    },
    {
      icon: 'Layers',
      title: 'Disconnected Tools',
      desc: 'Funnels, calendar links, and CRM tools that do not talk to each other cause dropped prospects and missed revenue.',
    },
    {
      icon: 'TrendingUp',
      title: 'No Follow-Up Persistence',
      desc: 'Over 70% of conversions happen on follow-up 4 to 8, yet most businesses abandon leads after just 1 or 2 attempts.',
    },
  ],

  // Capabilities Grid (6 Cards)
  capabilitiesEyebrow: 'WHAT WE BUILD',
  capabilitiesTitle: 'GHL systems that connect funnels, CRM and automation seamlessly',
  capabilitiesDesc: 'Modular, reliable architectures built to convert traffic into booked calls and ongoing revenue.',
  capabilitiesCards: [
    {
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'Agency Scalability',
      title: 'Turnkey Agency Snapshots',
      desc: 'Pre-built, niche-specific funnels, custom fields, trigger links, and email/SMS workflows ready for 1-click sub-account deployment.',
      pills: ['Custom Values', '1-Click Deploy', 'Funnels & Triggers'],
    },
    {
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'Speed to Lead',
      title: 'Automated Multi-Channel Follow-ups',
      desc: 'Behavior-driven sequences across SMS, email, WhatsApp, and ringless voicemail drops timed perfectly around prospect engagement.',
      pills: ['Instant SMS Triggers', 'Drip Sequences', 'Smart Delays'],
    },
    {
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'Zero No-Shows',
      title: 'Smart Calendar & Booking Funnels',
      desc: 'Frictionless scheduling with automatic timezone detection, deposit collection, round-robin staff distribution, and automated reminders.',
      pills: ['Round-Robin Routing', 'Stripe Deposit', 'SMS Confirmations'],
    },
    {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'Custom Connectivity',
      title: 'Custom Webhook & API Integrations',
      desc: 'Connect HighLevel with Stripe, Shopify, WordPress, Zapier, Make, custom databases, and proprietary SaaS platforms.',
      pills: ['Two-Way Sync', 'Custom Webhooks', 'REST APIs'],
    },
    {
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'Sales Velocity',
      title: 'Pipeline & Deal Stage Automation',
      desc: 'Visual drag-and-drop pipelines with automated status progression, task assignments, team notifications, and revenue tracking.',
      pills: ['Automated Tasks', 'Deal Stages', 'Revenue Tracking'],
    },
    {
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'Social Proof',
      title: 'Review & Reputation Management',
      desc: 'Automated post-purchase review requests on Google, Trustpilot, and Facebook to systematically build dominant social proof.',
      pills: ['Google Reviews', 'Review Gate Filter', 'SMS Invitations'],
    },
  ],

  // Interactive Problem Solver Section
  fixFirstEyebrow: 'SOLVE YOUR BIGGEST BOTTLENECK',
  fixFirstTitle: 'What do you need GHL to fix first?',
  fixFirstDesc: 'Whether you want to automate agency client onboarding or supercharge inbound sales conversion, we tailor the exact automation setup for your goals.',
  fixFirstImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&h=600&q=80',
  fixFirstItems: [
    {
      id: 'appointments',
      title: 'I need more booked appointments',
      desc: 'Deploy instant speed-to-lead SMS within 60 seconds of form fill, automated calendar reminders, and automated no-show rebooking sequences.',
      tag: 'Instant Setup',
      solution: 'Automated Speed-to-Lead + Smart Calendar',
    },
    {
      id: 'agency',
      title: 'I want to onboard agency clients faster',
      desc: 'Master snapshot architecture that clones complete client setups in 1 click, with automated onboarding intake forms and custom values mapping.',
      tag: 'Scale Agency',
      solution: '1-Click Turnkey Snapshot System',
    },
    {
      id: 'crm',
      title: 'Our CRM data is chaotic & messy',
      desc: 'Complete audit and restructuring of custom fields, tag architectures, duplicate management, and clean stage transitions.',
      tag: 'Data Cleanup',
      solution: 'Full Pipeline & Tag Restructuring',
    },
    {
      id: 'reactivation',
      title: 'We need to reactivate past cold leads',
      desc: 'Run targeted, high-converting 9-word email & SMS reactivation campaigns that generate immediate qualified pipeline from existing databases.',
      tag: 'Fast ROI',
      solution: 'Database Reactivation Engine',
    },
  ],

  // Process / Roadmap Section
  processEyebrow: 'HOW WE WORK',
  processTitle: 'From scattered leads to a working automation system',
  processDesc: 'A structured 5-step engineering sprint from architecture audit to live deployment.',
  processSteps: [
    {
      step: '01',
      title: 'Audit & Architecture',
      desc: 'We map your existing lead sources, tools, bottlenecks, and design a custom end-to-end automation blueprint.',
    },
    {
      step: '02',
      title: 'Snapshot Build & Setup',
      desc: 'Configure custom fields, pipelines, calendar routing, user roles, phone numbers, and email/SMS compliance.',
    },
    {
      step: '03',
      title: 'Workflow Engineering',
      desc: 'Build multi-branch trigger workflows, smart delays, conditional logic, dynamic custom values, and notification webhooks.',
    },
    {
      step: '04',
      title: 'Integration & Testing',
      desc: 'Connect payment gateways, ad accounts, webhooks, and perform rigorous end-to-end sandbox testing.',
    },
    {
      step: '05',
      title: 'Go-Live & Team Training',
      desc: 'Seamless production launch, domain verification, and step-by-step video SOP documentation for your team.',
    },
  ],

  // Engagement / Working Models (3 Cards)
  modelsEyebrow: 'COLLABORATION MODELS',
  modelsTitle: 'Three ways to work with us on GHL',
  modelsDesc: 'Choose the level of support that best fits your agency, business size, or technical requirements.',
  models: [
    {
      number: '1',
      title: 'Custom Build Sprint',
      desc: 'For businesses that need a complete, bespoke GHL automation system built and launched from scratch with zero tech headaches.',
      features: [
        'Bespoke Architecture Design',
        'Custom Funnels & Pipelines',
        'Multi-Channel Workflows',
        '3rd-Party Integrations',
        'Team Handover & Training',
      ],
      ctaText: 'Start Build Sprint',
    },
    {
      number: '2',
      title: 'Dedicated Monthly Retainer',
      desc: 'For growing businesses that want ongoing automation improvements, new campaigns, and continuous technical management.',
      features: [
        'Continuous Workflow Optimization',
        'A/B Testing & Funnel Refinement',
        'New Campaign Setup',
        'Priority Technical Support',
        'Monthly Strategy Reviews',
      ],
      ctaText: 'Explore Retainers',
      isPopular: true,
    },
    {
      number: '3',
      title: 'White-Label Agency Partner',
      desc: 'For marketing agencies that want to deliver high-ticket GHL setups and sub-accounts to clients under their own brand.',
      features: [
        'Turnkey Client Snapshots',
        'Sub-Account Provisioning',
        'White-Label Onboarding',
        'Custom Webhooks & APIs',
        'Behind-The-Scenes Tech Team',
      ],
      ctaText: 'Partner With Us',
    },
  ],

  // Spectrum / Features Tabs
  spectrumEyebrow: 'ALL-IN-ONE AUTOMATION',
  spectrumTitle: 'Everything needed to capture, nurture and track leads',
  spectrumDesc: 'We utilize every capability inside and outside the HighLevel ecosystem to create seamless customer experiences.',
  spectrumTabs: [
    { id: 'funnels', label: 'Funnels', title: 'High-Converting Landing Pages & Forms', desc: 'Custom branded landing pages, multi-step forms, and popups engineered for maximum conversion.' },
    { id: 'crm', label: 'CRM', title: 'Smart Pipelines & Contact Management', desc: 'Centralize every lead interaction, conversation history, notes, and tasks in a clean unified view.' },
    { id: 'automation', label: 'Automation', title: 'Intelligent Multi-Branch Workflows', desc: 'Automate repetitive tasks with conditional if/else logic, webhook triggers, and automated follow-ups.' },
    { id: 'marketing', label: 'Marketing', title: 'Multi-Channel Outreach & Drips', desc: 'Engage prospects on SMS, Email, WhatsApp, and Voice with automated personalization.' },
    { id: 'tracking', label: 'Tracking', title: 'Attribution & Revenue Dashboards', desc: 'Track exactly which ad channels, keywords, and campaigns generate closed deals and revenue.' },
  ],

  // Case Studies / Real Outcomes (3 Cards)
  outcomesEyebrow: 'PROVEN TRACK RECORD',
  outcomesTitle: 'Real work, real clients, real measurable outcomes',
  outcomesDesc: 'Explore how we helped businesses scale bookings and automate operations with GoHighLevel.',
  outcomeCards: [
    {
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=700&h=450&q=80',
      client: 'Dental & Aesthetics Clinic',
      metric: '+310%',
      metricLabel: 'Increase in Booked Appointments',
      title: 'Automated Speed-to-Lead & Smart SMS Booking Funnel',
      desc: 'Replaced manual phone call follow-ups with instant 60-second SMS triggers and automated calendar scheduling, eliminating lead drop-off completely.',
      results: ['Response time reduced from 4 hours to 45 seconds', 'Zero calendar no-shows with automated SMS reminders', '94% automated booking rate'],
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=700&h=450&q=80',
      client: 'B2B Growth Agency',
      metric: '4.5x',
      metricLabel: 'Faster Client Onboarding Capacity',
      title: 'Master Turnkey Agency Snapshot Architecture',
      desc: 'Built custom niche snapshots that allowed the agency to deploy complete sub-accounts for new clients in under 5 minutes with zero manual setup.',
      results: ['Onboarding time slashed from 3 days to 5 minutes', 'Scaled from 20 to 110+ active agency clients', 'Zero setup bugs across accounts'],
    },
    {
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&h=450&q=80',
      client: 'Home Services Network',
      metric: '$140K',
      metricLabel: 'Revenue from Cold Database Reactivation',
      title: 'Conversational 9-Word SMS Reactivation Campaign',
      desc: 'Designed dynamic behavioral SMS campaigns that revived 12,000 inactive leads into active estimates and closed contracts within 30 days.',
      results: ['28% response rate from cold leads', 'Over 180 qualified estimates booked', '64x ROI in first 3 weeks'],
    },
  ],

  // FAQs
  faqs: [
    {
      q: 'What is GoHighLevel (GHL) automation and how does it help my business?',
      a: 'GoHighLevel is an all-in-one sales and marketing automation platform. It combines CRM, funnels, email marketing, SMS campaigns, calendar booking, call tracking, and pipeline management into a single system so your entire sales workflow runs on autopilot without manual repetitive work.',
    },
    {
      q: 'Can you build custom GHL snapshots for our agency or specific niche?',
      a: 'Yes! We specialize in creating turnkey, niche-specific snapshots with pre-configured funnels, custom fields, trigger links, SMS/email sequences, and workflows ready to deploy to sub-accounts in 1 click.',
    },
    {
      q: 'Do you connect GHL with third-party tools like Shopify, Stripe, or custom APIs?',
      a: 'Absolutely. We build custom webhooks and API bridges connecting GoHighLevel to Shopify, WooCommerce, Stripe, Zapier, Make.com, MySQL/PostgreSQL databases, and proprietary web applications.',
    },
    {
      q: 'How quickly can our GHL automation system be launched?',
      a: 'A standard custom build sprint typically takes 1 to 2 weeks from architecture audit to live deployment. For complex enterprise builds or extensive custom integrations, we deliver within 2 to 3 weeks with full milestone testing.',
    },
    {
      q: 'Do you provide training and documentation after the system is built?',
      a: 'Yes. Every project includes comprehensive Loom video walkthroughs, written SOP documentation, and a live handover session to ensure your team operates the system with complete confidence.',
    },
  ],

  seo: {
    metaTitle: 'GoHighLevel (GHL) Automation Services | Cubixsol',
    metaDescription: 'Expert GoHighLevel (GHL) automation services. Custom snapshots, CRM pipelines, instant speed-to-lead SMS, and API integrations.',
    keywords: 'GoHighLevel automation, GHL consultant, HighLevel snapshot, CRM automation, speed to lead, workflow automation',
  },
};

async function seedGoHighLevel() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB.');

    // Upsert into Service model
    await Service.findOneAndUpdate(
      { slug: 'ghl-automation' },
      { $set: ghlData },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log('✓ Synced ghl-automation in Service collection.');

    // Upsert into PageContent model for both slugs
    await PageContent.findOneAndUpdate(
      { slug: 'gohighlevel-automation' },
      {
        $set: {
          slug: 'gohighlevel-automation',
          title: 'GoHighLevel Automation Services',
          content: ghlData,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log('✓ Synced gohighlevel-automation in PageContent collection.');

    await PageContent.findOneAndUpdate(
      { slug: 'ghl-automation' },
      {
        $set: {
          slug: 'ghl-automation',
          title: 'GoHighLevel Automation Services',
          content: ghlData,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log('✓ Synced ghl-automation in PageContent collection.');

    console.log('Done seeding GoHighLevel data.');
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error seeding GoHighLevel data:', err);
    process.exit(1);
  }
}

seedGoHighLevel();
