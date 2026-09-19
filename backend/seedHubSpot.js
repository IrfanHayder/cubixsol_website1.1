const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Service = require('./models/Service');
const PageContent = require('./models/PageContent');

const hubspotData = {
  slug: 'hubspot-crm',
  title: 'HubSpot CRM Automation Services to Connect Your Sales And Marketing Operations',
  menuTitle: 'HubSpot CRM',
  icon: 'Zap',
  color: 'text-orange-500 bg-orange-50',
  gradient: 'from-orange-500 to-amber-600',
  heroEyebrow: 'HUBSPOT CRM AUTOMATION SERVICES',
  heroTitle: 'HubSpot CRM Automation Services to Connect Your Sales And Marketing Operations',
  heroDesc: 'Our HubSpot CRM automation services create customised systems with automated workflows, sales pipelines, integrations, and reporting dashboards that organise leads and improve customer management.',
  heroPrimaryBtnText: 'Book A Discovery Call',
  heroSecondaryBtnText: 'View Our Work',
  heroBadges: [
    'Automated Workflows & Deal Pipelines',
    'Custom Integrations & Dashboards',
    'Lead Capture & Marketing Automation',
    'Lifecycle & Revenue Reporting'
  ],
  heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&h=800&q=80',

  // Section 1: Why Your CRM Needs Automation
  problemEyebrow: 'WHY YOUR CRM NEEDS AUTOMATION',
  problemTitle: 'Manual Sales Processes Create Gaps That Automation Can Solve',
  problemDesc: 'Manual processes often create delays between lead generation, customer communication, and sales conversion. Teams may lose valuable opportunities, but businesses can manage leads more effectively through centralised data, automated communication, and clear sales processes. A properly configured CRM provides teams with better control over customer relationships and future opportunities.',
  problemCards: [
    {
      icon: 'Workflow',
      title: 'Capture Every Opportunity Automatically',
      desc: 'HubSpot CRM automation collects leads from different channels and organises customer information in one place. Automated forms, lifecycle stages, and lead assignment workflows help teams manage enquiries without missing important opportunities. A structured CRM system creates consistent processes for capturing, categorising, and moving prospects through the sales journey.',
    },
    {
      icon: 'MessageSquare',
      title: 'Create Faster Customer Responses',
      desc: 'HubSpot CRM workflow automation can trigger emails, notifications, reminders, and internal tasks based on customer actions. Automated responses allow sales teams to connect with prospects at the right moment while maintaining consistent communication.',
    },
    {
      icon: 'TrendingUp',
      title: 'Build A Structured Sales Pipeline',
      desc: 'HubSpot CRM sales automation features help businesses create deal stages, automate sales tasks, assign ownership, and track progress from initial contact to final conversion. Sales teams can follow consistent processes while managers gain clearer pipeline insights.',
    },
    {
      icon: 'BarChart3',
      title: 'Understand Performance With Better Data',
      desc: 'HubSpot CRM marketing automation features provide dashboards that track campaign results, lead sources, customer engagement, conversion rates, and revenue opportunities. Data-driven insights allow teams to identify successful strategies and improve future decisions.',
    },
  ],

  // Section 2: Our HubSpot Automation Solutions (6 Cards)
  capabilitiesEyebrow: 'OUR HUBSPOT AUTOMATION SOLUTIONS',
  capabilitiesTitle: 'Customised HubSpot Automation Systems Built Around Your Business Workflow',
  capabilitiesDesc: 'Our HubSpot CRM automation solutions focus on creating systems that match your operations instead of forcing your team into standard workflows. We configure HubSpot CRM, develop automated workflows, connect essential platforms, and create reporting systems that support long-term growth.',
  capabilitiesCards: [
    {
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'CRM Setup & Structure',
      title: 'HubSpot CRM Setup And Custom Configuration',
      desc: 'We configure HubSpot accounts, contacts, companies, custom properties, lifecycle stages, user permissions, and essential CRM settings. Our setup process creates a clean data structure that allows teams to manage customer information efficiently and prepare the platform for advanced automation.',
      pills: ['Custom Properties', 'Lifecycle Stages', 'User Permissions'],
    },
    {
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'Sales Architecture',
      title: 'Sales Pipeline Architecture',
      desc: 'We build customised HubSpot deal pipelines with sales stages, automation triggers, task assignments, and ownership rules. The system creates a clear process for tracking deals, improving team coordination, and maintaining accurate sales forecasts.',
      pills: ['Deal Pipelines', 'Sales Stages', 'Forecast Tracking'],
    },
    {
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'Lead Gen & Nurture',
      title: 'Lead Capture And Marketing Automation Setup',
      desc: 'We create HubSpot forms, landing page connections, tracking systems, segmentation rules, and nurturing workflows. Our HubSpot CRM and marketing automation solutions help businesses capture leads, organise customer data, and create personalised communication journeys.',
      pills: ['Smart Forms', 'Segmentation Rules', 'Nurturing Drips'],
    },
    {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'Workflow Automation',
      title: 'Advanced Workflow Automation',
      desc: 'We develop HubSpot CRM workflow automation systems that manage email sequences, lifecycle updates, internal alerts, customer journeys, and re-engagement campaigns. Each workflow follows specific business rules to create consistent customer experiences.',
      pills: ['Email Sequences', 'Internal Alerts', 'Re-engagement'],
    },
    {
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'Integrations & APIs',
      title: 'HubSpot Integration And Data Connections',
      desc: 'Businesses rely on multiple platforms to manage advertising, payments, scheduling, and customer communication. We connect HubSpot with tools such as Google Ads, Meta Ads, Zapier, Make, Calendly, Stripe, and custom APIs.',
      pills: ['Google & Meta Ads', 'Stripe & Calendly', 'Zapier & Make'],
    },
    {
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'BI & Reporting',
      title: 'CRM Dashboards And Revenue Reporting',
      desc: 'We create HubSpot dashboards that track pipeline value, campaign performance, conversion rates, sales activity, and customer engagement. Accurate reporting gives teams practical insights into business performance and future opportunities.',
      pills: ['Pipeline Value', 'Conversion Rates', 'Revenue Attribution'],
    },
  ],

  // Section 3: Find Your Right HubSpot Automation Path
  fixFirstEyebrow: 'FIND YOUR RIGHT HUBSPOT AUTOMATION PATH',
  fixFirstTitle: 'Which HubSpot Solution Matches Your Current Business Challenge?',
  fixFirstDesc: 'Our HubSpot automation agency evaluates your current workflow, identifies areas for improvement, and builds automation solutions that support your business objectives. The right setup can improve lead management, sales visibility, team collaboration, and customer communication.',
  fixFirstImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&h=600&q=80',
  fixFirstItems: [
    {
      id: 'lead-management',
      title: 'We Need Better Lead Management',
      desc: 'HubSpot CRM marketing automation creates a structured system for capturing leads, segmenting contacts, and maintaining communication throughout the buying journey. Automated workflows help teams deliver timely follow-ups and guide prospects toward conversion.',
      tag: 'Lead Capture',
      solution: 'HubSpot Forms → Lead Workflow → Automated Follow-Up → Meeting Booking',
    },
    {
      id: 'sales-operations',
      title: 'We Need More Control Over Sales Operations',
      desc: 'HubSpot CRM sales automation features create organised deal stages, automated tasks, sales sequences, and reporting systems that support better sales management. A customised sales process allows teams to track opportunities and maintain consistent follow-up activities.',
      tag: 'Sales Control',
      solution: 'HubSpot Pipeline → Sales Automation → Reporting Dashboard',
    },
    {
      id: 'setup-improvement',
      title: 'Our Existing HubSpot Setup Needs Improvement',
      desc: 'We review existing HubSpot accounts, identify automation issues, clean unnecessary data, and optimise workflows. Our optimisation process improves system performance and creates a more reliable CRM environment.',
      tag: 'CRM Rebuild',
      solution: 'HubSpot Audit → Automation Review → System Optimisation',
    },
    {
      id: 'scalable-crm',
      title: 'We Need A Scalable CRM For Our Team',
      desc: 'We design HubSpot environments with structured workflows, user permissions, reporting dashboards, and automation rules. A scalable CRM setup allows departments to work together through a unified customer management system.',
      tag: 'Team Scale',
      solution: 'HubSpot Setup → Team Workflows → Advanced Reporting',
    },
  ],

  // Section 4: Implementation Process
  processEyebrow: 'OUR IMPLEMENTATION PROCESS',
  processTitle: 'From CRM Planning To Complete HubSpot Automation Deployment',
  processDesc: 'Our implementation process connects business requirements with practical CRM solutions. We analyse existing operations, configure HubSpot features, build automation systems, and test every process before deployment.',
  processSteps: [
    {
      step: '01',
      title: 'Business Process Analysis',
      desc: 'We analyse sales processes, lead sources, customer journeys, existing platforms, and team responsibilities. Our analysis identifies automation opportunities and creates a roadmap for your HubSpot implementation.',
    },
    {
      step: '02',
      title: 'CRM Structure And Technical Setup',
      desc: 'We configure HubSpot settings, user permissions, email systems, domains, integrations, and essential account features. Proper configuration creates a reliable environment for workflows, communication, and reporting.',
    },
    {
      step: '03',
      title: 'Workflow And Automation Development',
      desc: 'We build HubSpot workflows, sales sequences, pipeline automation, lead routing systems, and communication triggers based on your requirements. Each automation process follows your business rules and operational goals.',
    },
    {
      step: '04',
      title: 'Testing And Performance Review',
      desc: 'We review automation triggers, email communication, integrations, data movement, and reporting accuracy. Testing identifies potential issues and confirms that every CRM process performs correctly.',
    },
    {
      step: '05',
      title: 'Training And Continuous Optimisation',
      desc: 'We provide documentation, system guidance, and training support after implementation. Our team also supports future improvements by optimising workflows and adapting the system as your business grows.',
    },
  ],

  // Section 5: Ways To Work With Our Team (3 Models)
  modelsEyebrow: 'WAYS TO WORK WITH OUR TEAM',
  modelsTitle: 'Flexible HubSpot Automation Services For Different Business Needs',
  modelsDesc: 'Businesses require different levels of CRM support depending on their goals, internal resources, and technical requirements. Our HubSpot automation services provide flexible options for complete implementations, team support, and ongoing improvements.',
  models: [
    {
      number: '1',
      title: 'Complete HubSpot CRM Implementation',
      desc: 'A complete HubSpot CRM implementation provides businesses with a ready-to-use automation system. We handle CRM configuration, pipeline creation, workflow development, integrations, dashboards, and documentation.',
      features: [
        'Full Account & Properties Configuration',
        'Custom Sales & Deal Pipelines',
        'Multi-Branch Automated Workflows',
        'Platform & Form Integrations',
        'Executive Dashboards & Documentation',
      ],
      ctaText: 'Start Implementation',
    },
    {
      number: '2',
      title: 'HubSpot Support For Growing Teams',
      desc: 'We support businesses with workflow improvements, process optimisation, user configuration, and automation enhancements. Our implementation support helps teams maintain organised operations as customer volume increases.',
      features: [
        'Workflow Optimization & Enhancements',
        'Sales Process & User Configuration',
        'Pipeline Stage Refinements',
        'Team Operations Support',
        'Scalable Workflow Architecture',
      ],
      ctaText: 'Get Team Support',
      isPopular: true,
    },
    {
      number: '3',
      title: 'Ongoing CRM Automation Management',
      desc: 'Our ongoing support services include workflow adjustments, integration maintenance, reporting improvements, and automation optimisation. Continuous management keeps your HubSpot environment aligned with changing business needs.',
      features: [
        'Continuous Workflow Adjustments',
        'Integration Maintenance & Monitoring',
        'Advanced Reporting Improvements',
        'Ongoing Automation Optimisation',
        'Priority Technical Guidance',
      ],
      ctaText: 'Start CRM Management',
    },
  ],

  // Section 6: Tools and Integrations
  spectrumEyebrow: 'TOOLS AND INTEGRATIONS',
  spectrumTitle: 'Connect HubSpot With The Tools Your Business Already Uses',
  spectrumDesc: 'Modern businesses use multiple platforms to manage marketing, sales, payments, scheduling, and customer relationships. A connected technology ecosystem allows information to move efficiently between different systems. Our HubSpot CRM integration with marketing automation connects essential platforms to create a unified workflow.',
  integrations: [
    { name: 'Google Ads & Meta Ads', icon: 'Target', category: 'Ad Channels', desc: 'Sync offline conversions and inbound lead capture directly into HubSpot CRM.' },
    { name: 'Google & Outlook Calendar', icon: 'Calendar', category: 'Scheduling', desc: 'Two-way calendar sync, automated meeting scheduling, and reminder triggers.' },
    { name: 'Stripe & Payment Gateways', icon: 'CreditCard', category: 'Payments', desc: 'Connect billing platforms, invoices, customer subscriptions, and revenue tracking.' },
    { name: 'Calendly & Booking Tools', icon: 'Clock', category: 'Appointments', desc: 'Automated round-robin meeting scheduling and instant rep notification.' },
    { name: 'Zapier & Make', icon: 'Zap', category: 'Middleware', desc: 'Connect thousands of external cloud apps with multi-step logic and routers.' },
    { name: 'Slack & Team Chat', icon: 'MessageSquare', category: 'Alerts', desc: 'Real-time deal stage notifications, lead alerts, and task updates.' },
    { name: 'Custom REST APIs', icon: 'Code2', category: 'Custom Tech', desc: 'Private app integrations, webhook endpoints, and database synchronization.' },
    { name: 'HubSpot CRM Platform', icon: 'Workflow', category: 'Core Hub', desc: 'Unified database for contacts, deals, tickets, and automated customer journeys.' },
  ],

  // Section 7: Project Experience and Results
  outcomesEyebrow: 'PROJECT EXPERIENCE AND RESULTS',
  outcomesTitle: 'HubSpot Automation Projects Built For Real Business Challenges',
  outcomesDesc: 'Successful CRM automation requires practical solutions based on real operational problems. Our projects focus on improving customer management, reducing manual work, and creating systems that support measurable business outcomes.',
  outcomeCards: [
    {
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=700&h=450&q=80',
      client: 'HubSpot Automation Case Study',
      metric: '+320%',
      metricLabel: 'Faster Inbound Lead Processing',
      title: 'Automated Lead Qualification & Multi-Channel Nurture',
      desc: 'Engineered an end-to-end HubSpot workflow system capturing multi-channel inquiries and routing qualified leads to sales reps in under 60 seconds.',
      results: [
        'Automated lead qualification & segmentation',
        'Instant notifications and task triggers',
        'Structured deal pipeline stage progression',
      ],
      isCaseStudy: true,
    },
    {
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&h=450&q=80',
      client: '100+ CRM Automation Projects Completed',
      metric: '100+',
      metricLabel: 'Projects Delivered',
      title: 'Scalable CRM Environments & Automation Systems',
      desc: 'We build HubSpot environments that support efficient operations, better customer relationships, and scalable growth.',
      results: [
        'Complete HubSpot CRM configurations',
        'Custom workflow and trigger automations',
        'Connected technology & API ecosystems',
      ],
      isCaseStudy: false,
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=700&h=450&q=80',
      client: 'Enterprise Sales Architecture',
      metric: '4.8x',
      metricLabel: 'Pipeline Visibility & Forecasting',
      title: 'Custom Deal Governance & Revenue Dashboards',
      desc: 'Designed multi-tier pipeline architectures with mandatory property governance and automated management reporting dashboards.',
      results: [
        'Standardized rep sales workflows',
        'Accurate real-time revenue forecasts',
        'Eliminated manual CRM data entry drag',
      ],
      isCaseStudy: false,
    },
  ],

  // Section 8: Final CTA
  ctaEyebrow: "LET'S AUTOMATE YOUR CRM",
  ctaTitle: 'Ready To Build A Smarter HubSpot CRM Automation System?',
  ctaDesc: "Ready to move forward? Share your project details and let's build the right plan for you.",
  ctaButtonText: 'Book Your Consultation Today!',

  // FAQs
  faqs: [
    {
      q: 'How does HubSpot CRM automation help my business?',
      a: 'HubSpot CRM automation eliminates manual data entry, routes leads instantly to sales reps, triggers personalized follow-up sequences, and provides clear visibility across your sales pipeline and marketing campaigns.',
    },
    {
      q: 'Can you configure custom properties, deal stages, and lifecycle stages?',
      a: 'Yes. We customize your entire HubSpot data schema, including custom contact/company/deal properties, mandatory stage requirements, automated status transitions, and custom object architectures.',
    },
    {
      q: 'Do you integrate HubSpot with external tools like Google Ads, Stripe, and Calendly?',
      a: 'Yes. We connect HubSpot with advertising platforms, payment processors, scheduling tools, Zapier, Make, and proprietary web applications via webhooks and REST APIs.',
    },
    {
      q: 'How long does a full HubSpot setup or optimization project take?',
      a: 'A standard custom setup sprint typically takes between 1 to 2 weeks. For larger enterprise setups with complex integrations, delivery takes 2 to 3 weeks with full testing and documentation.',
    },
    {
      q: 'Do you provide training and documentation for our team?',
      a: 'Yes. Every project includes comprehensive SOP video walkthroughs, written guides, and live handover sessions to ensure your team operates HubSpot with complete confidence.',
    },
  ],

  seo: {
    metaTitle: 'HubSpot CRM Automation Services to Connect Sales & Marketing | Cubixsol',
    metaDescription: 'Custom HubSpot CRM automation services. Workflows, sales pipeline architecture, lead capture, integrations, and revenue reporting dashboards.',
    keywords: 'HubSpot CRM automation, HubSpot setup, sales pipeline architecture, marketing automation, HubSpot integrations, CRM consultant',
  },
};

async function seedHubSpot() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB.');

    // Upsert into Service model
    await Service.findOneAndUpdate(
      { slug: 'hubspot-crm' },
      { $set: hubspotData },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log('✓ Synced hubspot-crm in Service collection.');

    // Upsert into PageContent model for both slugs
    await PageContent.findOneAndUpdate(
      { slug: 'hubspot-crm' },
      {
        $set: {
          slug: 'hubspot-crm',
          title: 'HubSpot CRM Automation Services',
          content: hubspotData,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log('✓ Synced hubspot-crm in PageContent collection.');

    await PageContent.findOneAndUpdate(
      { slug: 'hubspot-automation' },
      {
        $set: {
          slug: 'hubspot-automation',
          title: 'HubSpot CRM Automation Services',
          content: hubspotData,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log('✓ Synced hubspot-automation in PageContent collection.');

    console.log('Done seeding HubSpot CRM data.');
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error seeding HubSpot CRM data:', err);
    process.exit(1);
  }
}

seedHubSpot();
