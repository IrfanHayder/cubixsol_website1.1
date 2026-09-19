const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Service = require('./models/Service');
const PageContent = require('./models/PageContent');

const ghlData = {
  slug: 'ghl-automation',
  title: 'GoHighLevel Automation Services to Turn Leads into Revenue',
  menuTitle: 'GHL Automation',
  icon: 'Zap',
  color: 'text-red-500 bg-red-50',
  gradient: 'from-red-500 to-rose-600',
  heroEyebrow: 'GOHIGHLEVEL AUTOMATION SERVICES',
  heroTitle: 'GoHighLevel Automation Services to Turn Leads into Revenue',
  heroDesc: 'As a GoHighLevel automation agency, we handle GoHighLevel setup, integrations, and optimisation to help businesses manage leads faster and create consistent customer experiences. Our team creates complete GoHighLevel CRM marketing automation systems that connect lead capture, communication, pipelines, funnels, and reporting inside one powerful platform.',
  heroPrimaryBtnText: 'Book A Free Strategy Call',
  heroSecondaryBtnText: 'Explore Our Solutions',
  heroBadges: [
    'GoHighLevel Setup & Integrations',
    'Lead Capture & CRM Automation',
    'Marketing & Sales Pipelines',
    'End-to-End Reporting'
  ],
  heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&h=800&q=80',

  // Section 1: Why Businesses Choose Automation
  problemEyebrow: 'WHY BUSINESSES CHOOSE AUTOMATION',
  problemTitle: 'Your Leads Need A Complete Follow-Up System',
  problemDesc: 'A CRM alone cannot solve missed opportunities caused by delayed responses, disconnected platforms, and manual tasks. GoHighLevel CRM automation creates structured workflows that capture leads, trigger communication, and guide prospects through every stage of the buying journey.',
  problemCards: [
    {
      icon: 'Workflow',
      title: 'Capture Every Opportunity Automatically',
      desc: 'GoHighLevel workflow automation collects leads from websites, forms, ads, and campaigns while sending them into organised pipelines.',
    },
    {
      icon: 'MessageSquare',
      title: 'Respond To Customers Instantly',
      desc: 'GoHighLevel email automation and SMS automation create immediate conversations through emails, messages, reminders, and follow-ups.',
    },
    {
      icon: 'TrendingUp',
      title: 'Create Predictable Sales Operations',
      desc: 'GoHighLevel sales funnel automation organises prospects, deals, appointments, and sales activities into a clear process.',
    },
    {
      icon: 'BarChart3',
      title: 'Understand Your Growth Performance',
      desc: 'GoHighLevel automation features provide reports about campaigns, conversions, customer activity, and pipeline performance.',
    },
  ],

  // Section 2: Complete GoHighLevel Systems (6 Cards)
  capabilitiesEyebrow: 'OUR GOHIGHLEVEL SERVICES',
  capabilitiesTitle: 'Complete GoHighLevel Systems For Your Business Objectives',
  capabilitiesDesc: 'Every business requires a different automation strategy. Our GoHighLevel automation services combine CRM configuration, workflow development, integrations, and marketing systems to create a platform that supports growth.',
  capabilitiesCards: [
    {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'CRM Configuration',
      title: 'GHL CRM Setup & Account Configuration',
      desc: 'We configure GoHighLevel accounts with contacts, opportunities, custom fields, calendars, permissions, pipelines, and essential CRM settings.',
      pills: ['Contacts & Deals', 'Custom Fields', 'Pipelines & Calendars'],
    },
    {
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'Agency Solutions',
      title: 'GHL Subaccount Setup For Agencies',
      desc: 'We create organised subaccounts, snapshots, templates, and workflows that allow agencies to manage multiple clients efficiently.',
      pills: ['Subaccount Creation', 'Client Snapshots', 'Template Library'],
    },
    {
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'Funnel Building',
      title: 'GHL Funnel & Landing Page Automation',
      desc: 'We build sales funnels, landing pages, forms, and tracking systems that turn visitors into qualified leads.',
      pills: ['Sales Funnels', 'Landing Pages', 'Lead Forms & Tracking'],
    },
    {
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'Workflow Automation',
      title: 'GHL Workflow Automation',
      desc: 'We create automated customer journeys using triggers, campaigns, email sequences, appointment reminders, and follow-up actions.',
      pills: ['Trigger Actions', 'Email Sequences', 'Follow-Up Actions'],
    },
    {
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'Omnichannel Comms',
      title: 'GHL Communication Automation',
      desc: 'We implement GoHighLevel SMS automation, WhatsApp automation, Instagram DM automation, and missed call text-back automation to improve customer response.',
      pills: ['SMS & WhatsApp', 'Instagram DM', 'Missed Call Text-Back'],
    },
    {
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'Integrations & BI',
      title: 'CRM Integrations & Reporting',
      desc: 'We connect GoHighLevel with payment tools, advertising platforms, calendars, Zapier, Make, and external applications while creating performance dashboards.',
      pills: ['Zapier & Make', 'Payment Gateways', 'Dashboards & Reports'],
    },
  ],

  // Section 3: Interactive Problem Solver / Solutions
  fixFirstEyebrow: 'FIND THE RIGHT GOHIGHLEVEL SOLUTION',
  fixFirstTitle: 'Which Part Of Your Business Needs Automation First?',
  fixFirstDesc: 'A successful GoHighLevel implementation starts with identifying the biggest operational challenge and creating the right automation path.',
  fixFirstImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&h=600&q=80',
  fixFirstItems: [
    {
      id: 'marketing-leads',
      title: 'We Want More Leads From Marketing Campaigns',
      desc: 'Businesses that struggle with lead collection can use GoHighLevel marketing automation to capture enquiries and nurture prospects automatically.',
      tag: 'Lead Acquisition',
      solution: 'Lead Forms → CRM Pipeline → Automated Follow-Up → Appointment Booking',
    },
    {
      id: 'sales-management',
      title: 'We Need A Better Sales Management System',
      desc: 'Companies with growing sales teams can use GoHighLevel CRM automation to organise opportunities, track deals, and improve team coordination.',
      tag: 'Sales Velocity',
      solution: 'Opportunity Pipeline → Sales Workflows → Reporting Dashboard',
    },
    {
      id: 'account-improvement',
      title: 'Our Existing GoHighLevel Account Needs Improvement',
      desc: 'Businesses with confusing workflows or incomplete setups can rebuild their system through professional optimisation.',
      tag: 'Account Rebuild',
      solution: 'CRM Audit → Workflow Review → Automation Rebuild',
    },
    {
      id: 'agency-growth',
      title: 'We Need GoHighLevel For Agency Growth',
      desc: 'Marketing agencies can use GoHighLevel agency setup services to create repeatable systems for multiple clients.',
      tag: 'Agency Scaling',
      solution: 'Subaccounts → Snapshots → Templates → Client Automation',
    },
  ],

  // Section 4: Implementation Process
  processEyebrow: 'OUR IMPLEMENTATION PROCESS',
  processTitle: 'From Initial Setup To A Fully Automated Customer Journey',
  processDesc: 'Our process creates a reliable GoHighLevel system that matches your business workflow.',
  processSteps: [
    {
      step: '01',
      title: 'Business Workflow Analysis',
      desc: 'We review your sales process, customer journey, lead sources, and automation requirements.',
    },
    {
      step: '02',
      title: 'GoHighLevel Account Setup',
      desc: 'We configure CRM settings, domains, calendars, communication channels, and account preferences.',
    },
    {
      step: '03',
      title: 'Automation & Funnel Development',
      desc: 'We create workflows, campaigns, sales funnels, email sequences, SMS campaigns, and customer journeys.',
    },
    {
      step: '04',
      title: 'Testing Every Customer Path',
      desc: 'We check triggers, notifications, integrations, and automation steps before launching the system.',
    },
    {
      step: '05',
      title: 'Training & System Handover',
      desc: 'We provide documentation and guidance so your team can confidently manage your GoHighLevel platform.',
    },
  ],

  // Section 5: Engagement Models / Working Options
  modelsEyebrow: 'WORK WITH OUR GOHIGHLEVEL EXPERTS',
  modelsTitle: 'Flexible Options For Businesses And Agencies',
  modelsDesc: 'Different businesses need different levels of support. Our engagement models adapt to your automation requirements.',
  models: [
    {
      number: '1',
      title: 'Complete GoHighLevel Setup Project',
      desc: 'We build your complete CRM system with account configuration, pipelines, workflows, integrations, and documentation.',
      features: [
        'Complete Account Configuration',
        'Custom Fields & Opportunity Pipelines',
        'Multi-Branch Automated Workflows',
        'Platform & API Integrations',
        'Full Training & System Documentation',
      ],
      ctaText: 'Start Setup Project',
    },
    {
      number: '2',
      title: 'GoHighLevel Agency Implementation',
      desc: 'We support agencies with subaccount creation, snapshots, templates, and scalable automation systems.',
      features: [
        'Organised Subaccount Architecture',
        'Turnkey Niche Snapshots',
        'Client Onboarding Funnels & Forms',
        'Multi-Client Workflow Templates',
        'Scalable Agency Infrastructure',
      ],
      ctaText: 'Scale Your Agency',
      isPopular: true,
    },
    {
      number: '3',
      title: 'Continuous GoHighLevel Optimisation',
      desc: 'We improve existing systems through workflow updates, automation improvements, troubleshooting, and platform enhancements.',
      features: [
        'System & Workflow Performance Audit',
        'Continuous Automation Troubleshooting',
        'New Campaign & Sequence Setups',
        'Funnel & Conversion Refinement',
        'Priority Technical Support',
      ],
      ctaText: 'Optimize Existing Setup',
    },
  ],

  // Section 6: Platform Ecosystem / Supported Integrations
  spectrumEyebrow: 'PLATFORM ECOSYSTEM',
  spectrumTitle: 'GHL Integrations To Connect Your Entire Business',
  spectrumDesc: 'GoHighLevel becomes more powerful when connected with the tools your business already uses.',
  integrations: [
    { name: 'GoHighLevel CRM', category: 'Core Platform', desc: 'Centralized lead data, pipelines, contacts, and unified inbox.' },
    { name: 'Google Calendar', category: 'Scheduling', desc: 'Two-way sync for appointments, round-robin booking, and event reminders.' },
    { name: 'Payment Platforms', category: 'Payments', desc: 'Stripe, PayPal, and Authorize.net integration for deposits and checkouts.' },
    { name: 'Advertising Platforms', category: 'Ad Channels', desc: 'Facebook Lead Ads, Google Ads, and TikTok Ads direct webhook capture.' },
    { name: 'Email Marketing Tools', category: 'Outreach', desc: 'SMTP servers, Mailgun, SendGrid, and custom email delivery setup.' },
    { name: 'Zapier', category: 'Middleware', desc: 'Multi-step automation bridges connecting thousands of third-party apps.' },
    { name: 'Make', category: 'Advanced Logic', desc: 'Complex scenario automations, routers, data transformers, and webhooks.' },
    { name: 'Custom API Connections', category: 'Custom Tech', desc: 'REST APIs, custom webhook endpoints, SQL sync, and proprietary app hooks.' },
  ],

  // Section 7: Project Experience / Case Studies
  outcomesEyebrow: 'PROJECT EXPERIENCE',
  outcomesTitle: 'Automation Systems Built For Real Business Needs',
  outcomesDesc: 'Our GoHighLevel projects focus on creating practical systems that improve marketing, sales, and customer communication.',
  outcomeCards: [
    {
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=700&h=450&q=80',
      client: 'Lead Generation Automation Project',
      metric: '+310%',
      metricLabel: 'Increase in Booked Appointments',
      title: 'Multi-Channel Lead Generation & Instant Speed-to-Lead',
      desc: 'Constructed an automated speed-to-lead workflow triggering SMS within 60 seconds of ad form fills with automated calendar scheduling.',
      results: [
        'Instant 60-second multi-channel response',
        'Automated calendar booking and reminders',
        'Zero drop-off from paid ad inquiries',
      ],
    },
    {
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&h=450&q=80',
      client: '200+ Digital Projects Completed',
      metric: '200+',
      metricLabel: 'Digital Systems Delivered',
      title: 'Comprehensive CRM & Workflow Ecosystems',
      desc: 'Our experience includes CRM systems, automation workflows, marketing platforms, websites, and business technology solutions.',
      results: [
        'Full CRM architecture & database migrations',
        'Turnkey snapshot engineering for agencies',
        'Custom API endpoints & payment automations',
      ],
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=700&h=450&q=80',
      client: 'Turnkey Agency Deployment',
      metric: '4.5x',
      metricLabel: 'Faster Client Onboarding Capacity',
      title: 'Scalable Subaccount Snapshot Architecture',
      desc: 'Engineered modular snapshots allowing marketing agencies to provision complete subaccounts for new clients in under 5 minutes.',
      results: [
        '1-Click client subaccount deployment',
        'Pre-configured funnels, pipelines & tags',
        'Standardized agency delivery process',
      ],
    },
  ],

  // Section 8: Final CTA
  ctaEyebrow: "LET'S AUTOMATE YOUR GROWTH",
  ctaTitle: 'Ready To Build Your GoHighLevel Automation System?',
  ctaDesc: "Get expert guidance for your next project. Share your details and let's get started.",
  ctaButtonText: 'Get Your Free Consultation',

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
    metaTitle: 'GoHighLevel Automation Services to Turn Leads into Revenue | Cubixsol',
    metaDescription: 'Expert GoHighLevel (GHL) automation agency. Custom setups, integrations, CRM pipelines, instant speed-to-lead SMS, and subaccount snapshots.',
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
