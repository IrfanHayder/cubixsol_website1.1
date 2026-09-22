const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Service = require('./models/Service');
const PageContent = require('./models/PageContent');

const emailLeadNurtureData = {
  slug: 'email-lead-nurture',
  title: 'Email Marketing Automation Services to Turn Subscribers Into Customers',
  cardTitle: 'Email & Lead Nurture',
  menuTitle: 'Email & Lead Nurture',
  icon: 'Mail',
  color: 'text-[#00a4d8] bg-sky-50',
  gradient: 'from-[#00a4d8] to-[#5d53a3]',

  // Hero Section
  heroEyebrow: 'EMAIL MARKETING AUTOMATION SERVICES',
  heroTitle: 'Email Marketing Automation Services to Turn Subscribers Into Customers',
  heroSubtitle: 'Build automated campaigns, personalised workflows, and strategic email journeys.',
  heroDesc: 'Our email marketing automation services build automated campaigns, personalised workflows, and strategic email journeys. We use advanced email marketing automation software, email marketing automation tools, and customer data to create campaigns that improve engagement, increase conversions, and support long-term business growth.',
  longDesc: 'Our email marketing automation services build automated campaigns, personalised workflows, and strategic email journeys. We use advanced email marketing automation software, email marketing automation tools, and customer data to create campaigns that improve engagement, increase conversions, and support long-term business growth.',
  desc: 'Automated email marketing campaigns, behavioral drip sequences, and strategic lead nurturing journeys that convert subscribers into long-term customers.',
  heroPrimaryBtnText: 'Book A Free Strategy Call',
  heroSecondaryBtnText: 'Explore Our Solutions',
  ctaPrimaryText: 'Book A Free Strategy Call',
  ctaSecondaryText: 'Explore Our Solutions',
  heroBadges: [
    'Automated Drip Sequences & Trigger Workflows',
    'Customer Segmentation & Dynamic Personalisation',
    'High Deliverability & CRM Two-Way Sync',
    'Full Lifecycle & Revenue Analytics'
  ],
  heroImage: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=1200&h=800&q=80',

  // Section 1: Why Businesses Need Email Automation
  problemEyebrow: 'WHY BUSINESSES NEED EMAIL AUTOMATION',
  problemTitle: 'Your Customers Need Timely And Relevant Communication',
  problemDesc: 'Manual email campaigns often create inconsistent messaging, missed opportunities, and limited customer engagement. Email marketing automation allows businesses to create structured communication systems that send personalised messages based on customer actions, interests, and journey stages.',
  whyChooseTitle: 'Your Customers Need Timely And Relevant Communication',
  whyChooseIntro: 'Manual email campaigns often create inconsistent messaging, missed opportunities, and limited customer engagement. Email marketing automation allows businesses to create structured communication systems that send personalised messages based on customer actions, interests, and journey stages.',
  whyChooseItems: [
    {
      title: 'Build Stronger Customer Relationships Automatically',
      desc: 'A lead nurturing email strategy helps businesses stay connected with potential customers through personalised messages, educational content, and targeted follow-ups.'
    },
    {
      title: 'Follow Up With Leads At The Right Moment',
      desc: 'Email marketing automation workflows allow businesses to send relevant emails after specific actions such as form submissions, purchases, downloads, or website visits.'
    },
    {
      title: 'Create Consistent Marketing Campaigns',
      desc: 'Marketing email automation helps businesses manage campaigns without manually sending every message. Automated systems deliver the right content throughout the customer journey.'
    },
    {
      title: 'Improve Campaign Performance Through Data',
      desc: 'Email marketing automation platforms provide valuable insights about opens, clicks, conversions, and customer behaviour. Businesses can optimise campaigns based on real performance data.'
    }
  ],
  problemCards: [
    {
      icon: 'Users',
      title: 'Build Stronger Customer Relationships Automatically',
      desc: 'A lead nurturing email strategy helps businesses stay connected with potential customers through personalised messages, educational content, and targeted follow-ups.'
    },
    {
      icon: 'Clock',
      title: 'Follow Up With Leads At The Right Moment',
      desc: 'Email marketing automation workflows allow businesses to send relevant emails after specific actions such as form submissions, purchases, downloads, or website visits.'
    },
    {
      icon: 'Workflow',
      title: 'Create Consistent Marketing Campaigns',
      desc: 'Marketing email automation helps businesses manage campaigns without manually sending every message. Automated systems deliver the right content throughout the customer journey.'
    },
    {
      icon: 'BarChart3',
      title: 'Improve Campaign Performance Through Data',
      desc: 'Email marketing automation platforms provide valuable insights about opens, clicks, conversions, and customer behaviour. Businesses can optimise campaigns based on real performance data.'
    }
  ],

  // Section 2: Our Email Marketing Automation Services (6 Cards)
  capabilitiesEyebrow: 'OUR EMAIL MARKETING AUTOMATION SERVICES',
  capabilitiesTitle: 'Automated Email Systems Designed Around Your Business Goals',
  capabilitiesDesc: 'Every business requires a different communication strategy. Our email marketing automation services combine campaign planning, workflow development, customer segmentation, and automation technology to create effective email systems.',
  subServicesTitle: 'Automated Email Systems Designed Around Your Business Goals',
  subServicesIntro: 'Every business requires a different communication strategy. Our email marketing automation services combine campaign planning, workflow development, customer segmentation, and automation technology to create effective email systems.',
  subServicesItems: [
    {
      title: 'Email Marketing Automation Setup',
      desc: 'We configure email marketing automation software with customer lists, audience segments, campaign structures, and essential automation settings.'
    },
    {
      title: 'Email Drip Campaign Development',
      desc: 'We create strategic email drip campaigns that guide subscribers through planned communication sequences. Each drip campaign email delivers relevant information based on customer interests and actions.'
    },
    {
      title: 'Lead Nurturing Email Campaigns',
      desc: 'Our lead nurturing services help businesses convert potential customers through personalised email sequences, educational content, and targeted follow-ups.'
    },
    {
      title: 'Marketing Automation Workflow Creation',
      desc: 'We develop email marketing automation workflows that trigger messages based on customer behaviour, engagement levels, and business objectives.'
    },
    {
      title: 'Email Campaign Personalisation',
      desc: 'We create customised email experiences using customer data, segmentation, dynamic content, and personalised messaging strategies.'
    },
    {
      title: 'Platform Integration And Optimisation',
      desc: 'We connect email marketing and automation systems with websites, CRM platforms, ecommerce stores, and business applications to create connected marketing operations.'
    }
  ],
  capabilitiesCards: [
    {
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'SYSTEM SETUP',
      title: 'Email Marketing Automation Setup',
      desc: 'We configure email marketing automation software with customer lists, audience segments, campaign structures, and essential automation settings.',
      pills: ['Platform Setup', 'List Architecture', 'DNS & SPF/DKIM']
    },
    {
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'DRIP SEQUENCES',
      title: 'Email Drip Campaign Development',
      desc: 'We create strategic email drip campaigns that guide subscribers through planned communication sequences. Each drip campaign email delivers relevant information based on customer interests and actions.',
      pills: ['Behavior Triggers', 'Onboarding Drips', 'Cart Recovery']
    },
    {
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'LEAD NURTURING',
      title: 'Lead Nurturing Email Campaigns',
      desc: 'Our lead nurturing services help businesses convert potential customers through personalised email sequences, educational content, and targeted follow-ups.',
      pills: ['Lead Scoring', 'Educational Series', 'Sales Handoff']
    },
    {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'WORKFLOW DESIGN',
      title: 'Marketing Automation Workflow Creation',
      desc: 'We develop email marketing automation workflows that trigger messages based on customer behaviour, engagement levels, and business objectives.',
      pills: ['Conditional Logic', 'Branching Paths', 'Lifecycle Sync']
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'DYNAMIC CONTENT',
      title: 'Email Campaign Personalisation',
      desc: 'We create customised email experiences using customer data, segmentation, dynamic content, and personalised messaging strategies.',
      pills: ['Dynamic Merges', 'Audience Tags', 'Custom Fields']
    },
    {
      image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'INTEGRATIONS & OPS',
      title: 'Platform Integration And Optimisation',
      desc: 'We connect email marketing and automation systems with websites, CRM platforms, ecommerce stores, and business applications to create connected marketing operations.',
      pills: ['CRM Two-Way Sync', 'E-Commerce Connect', 'Live Webhooks']
    }
  ],

  // Section 3: Select the Right Email Automation Strategy (Interactive Solver)
  fixFirstEyebrow: 'SELECT THE RIGHT EMAIL AUTOMATION STRATEGY',
  fixFirstTitle: 'Which Part Of Your Marketing Process Needs Automation?',
  fixFirstDesc: 'A successful email automation system starts with understanding your audience, business goals, and customer journey. The right approach creates better communication and stronger conversions.',
  businessTypesTitle: 'Which Part Of Your Marketing Process Needs Automation?',
  businessTypesIntro: 'A successful email automation system starts with understanding your audience, business goals, and customer journey. The right approach creates better communication and stronger conversions.',
  businessTypesItems: [
    {
      title: 'We Need More Qualified Leads',
      desc: 'Businesses focused on lead generation can use automated email campaigns to capture interest and guide prospects toward conversion. Recommended Setup: Lead Capture Form → Email Sequence → Lead Nurturing Campaign → Sales Follow-Up'
    },
    {
      title: 'We Want To Improve Customer Engagement',
      desc: 'Companies that need better customer communication can use personalised campaigns to maintain relationships and encourage repeat interactions. Recommended Setup: Customer Segmentation → Personalised Emails → Automated Follow-Ups → Engagement Tracking'
    },
    {
      title: 'We Need A Complete Drip Campaign System',
      desc: 'Businesses with long customer journeys can use email drip campaign software to deliver planned messages over time. Recommended Setup: Audience Research → Drip Campaign Email Flow → Automation Triggers → Performance Analysis'
    },
    {
      title: 'We Need WordPress Email Automation',
      desc: 'Website owners can use WordPress email marketing automation solutions to connect website activities with automated communication. Recommended Setup: WordPress Website → Subscriber Collection → Email Automation Workflow → Customer Journey'
    }
  ],
  fixFirstImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&h=600&q=80',
  fixFirstItems: [
    {
      id: 'qualified-leads',
      title: 'We Need More Qualified Leads',
      desc: 'Businesses focused on lead generation can use automated email campaigns to capture interest and guide prospects toward conversion.',
      tag: 'Lead Conversion',
      solution: 'Lead Capture Form → Email Sequence → Lead Nurturing Campaign → Sales Follow-Up'
    },
    {
      id: 'customer-engagement',
      title: 'We Want To Improve Customer Engagement',
      desc: 'Companies that need better customer communication can use personalised campaigns to maintain relationships and encourage repeat interactions.',
      tag: 'Customer Retention',
      solution: 'Customer Segmentation → Personalised Emails → Automated Follow-Ups → Engagement Tracking'
    },
    {
      id: 'drip-campaign',
      title: 'We Need A Complete Drip Campaign System',
      desc: 'Businesses with long customer journeys can use email drip campaign software to deliver planned messages over time.',
      tag: 'Automated Drips',
      solution: 'Audience Research → Drip Campaign Email Flow → Automation Triggers → Performance Analysis'
    },
    {
      id: 'wordpress-automation',
      title: 'We Need WordPress Email Automation',
      desc: 'Website owners can use WordPress email marketing automation solutions to connect website activities with automated communication.',
      tag: 'Web & CMS Sync',
      solution: 'WordPress Website → Subscriber Collection → Email Automation Workflow → Customer Journey'
    }
  ],

  // Section 4: Our Email Automation Implementation Process
  processEyebrow: 'OUR EMAIL AUTOMATION IMPLEMENTATION PROCESS',
  processTitle: 'From Strategy Planning To Automated Campaign Launch',
  processDesc: 'Our process creates reliable email systems that match your marketing goals and customer expectations.',
  serviceProcessTitle: 'From Strategy Planning To Automated Campaign Launch',
  serviceProcessIntro: 'Our process creates reliable email systems that match your marketing goals and customer expectations.',
  serviceProcessSteps: [
    {
      stepNumber: '01',
      title: 'Marketing Strategy Analysis',
      desc: 'We review your audience, customer journey, existing campaigns, and business objectives before developing the automation plan.'
    },
    {
      stepNumber: '02',
      title: 'Campaign And Workflow Planning',
      desc: 'We design email sequences, customer segments, triggers, and communication paths that support your marketing strategy.'
    },
    {
      stepNumber: '03',
      title: 'Automation Setup And Integration',
      desc: 'We configure email platforms, connect required tools, and build automated workflows that manage customer communication.'
    },
    {
      stepNumber: '04',
      title: 'Testing Email Journeys',
      desc: 'We test campaign timing, automation triggers, email content, and user experiences before launching the system.'
    },
    {
      stepNumber: '05',
      title: 'Performance Improvement And Support',
      desc: 'We analyse campaign results and improve automation workflows to increase engagement and conversion opportunities.'
    }
  ],
  processSteps: [
    {
      step: '01',
      title: 'Marketing Strategy Analysis',
      desc: 'We review your audience, customer journey, existing campaigns, and business objectives before developing the automation plan.'
    },
    {
      step: '02',
      title: 'Campaign And Workflow Planning',
      desc: 'We design email sequences, customer segments, triggers, and communication paths that support your marketing strategy.'
    },
    {
      step: '03',
      title: 'Automation Setup And Integration',
      desc: 'We configure email platforms, connect required tools, and build automated workflows that manage customer communication.'
    },
    {
      step: '04',
      title: 'Testing Email Journeys',
      desc: 'We test campaign timing, automation triggers, email content, and user experiences before launching the system.'
    },
    {
      step: '05',
      title: 'Performance Improvement And Support',
      desc: 'We analyse campaign results and improve automation workflows to increase engagement and conversion opportunities.'
    }
  ],

  // Section 5: Work With Our Email Marketing Automation Experts (4 Solutions)
  modelsEyebrow: 'WORK WITH OUR EMAIL MARKETING AUTOMATION EXPERTS',
  modelsTitle: 'Flexible Solutions For Growing Businesses',
  modelsDesc: 'Different businesses require different levels of marketing automation support. Our team provides solutions based on your audience, goals, and existing technology setup.',
  pricingSectionTitle: 'Flexible Solutions For Growing Businesses',
  pricingSectionText: 'Different businesses require different levels of marketing automation support. Our team provides solutions based on your audience, goals, and existing technology setup.',
  models: [
    {
      number: '1',
      title: 'Complete Email Automation Project',
      desc: 'We build complete automation systems, including strategy, campaign development, workflow creation, integrations, and optimisation support.',
      features: [
        'End-to-End Email Architecture & List Setup',
        'Custom High-Converting Email Templates',
        'Multi-Trigger Automation Flow Design',
        'CRM & E-Commerce Integration & Testing'
      ],
      ctaText: 'Start Complete Project'
    },
    {
      number: '2',
      title: 'Email Drip Campaign Management',
      desc: 'We build and manage drip email campaigns that nurture subscribers and move prospects through the buying journey.',
      features: [
        'Automated Welcome & Lead Nurture Series',
        'Abandoned Cart & Re-engagement Sequences',
        'A/B Subject Line & Content Testing',
        'Deliverability & Inbox Placement Audits'
      ],
      ctaText: 'Build Drip Campaigns',
      isPopular: true
    },
    {
      number: '3',
      title: 'Lead Nurturing Automation Services',
      desc: 'We create lead nurturing email marketing systems that help businesses build relationships and convert interested prospects.',
      features: [
        'Behavioral Lead Scoring & Dynamic Tagging',
        'Educational Content & Product Storylines',
        'Automated Sales Handoff Notifications',
        'CRM Deal Stage Movement Sync'
      ],
      ctaText: 'Build Nurture System'
    },
    {
      number: '4',
      title: 'Ongoing Email Marketing Optimisation',
      desc: 'We improve existing campaigns through better segmentation, automation updates, content improvements, and performance analysis.',
      features: [
        'Weekly Campaign Analytics & Open Rate Boost',
        'Audience Segment Hygiene & Re-targeting',
        'New Workflow Triggers & Sequence Refinements',
        'Dedicated Email Automation Specialists'
      ],
      ctaText: 'Get Ongoing Support'
    }
  ],

  // Section 6: Email Marketing Technology Ecosystem
  spectrumEyebrow: 'EMAIL MARKETING TECHNOLOGY ECOSYSTEM',
  spectrumTitle: 'Connect Your Email Platform With Essential Business Tools',
  spectrumDesc: 'Email marketing automation platforms work better when connected to the systems your business already uses.',
  techTitle: 'Connect Your Email Platform With Essential Business Tools',
  techDesc: 'Email marketing automation platforms work better when connected to the systems your business already uses.',
  tech: ['Klaviyo', 'ActiveCampaign', 'HubSpot', 'Mailchimp', 'GoHighLevel', 'WordPress', 'Shopify', 'Zapier'],
  supportedPlatforms: [
    { name: 'Klaviyo & Mailchimp', category: 'Email Platforms', icon: 'Mail' },
    { name: 'ActiveCampaign & HubSpot', category: 'Marketing Automation & CRM', icon: 'Workflow' },
    { name: 'Shopify & WooCommerce', category: 'E-Commerce Stores', icon: 'CreditCard' },
    { name: 'WordPress & Webflow', category: 'CMS & Landing Pages', icon: 'Globe' },
    { name: 'GoHighLevel (GHL)', category: 'Agency Automation', icon: 'Zap' },
    { name: 'Zapier & Make.com', category: 'Integration Pipelines', icon: 'Cpu' },
    { name: 'Salesforce & Pipedrive', category: 'Sales CRMs', icon: 'Database' },
    { name: 'Custom REST APIs & Webhooks', category: 'Custom Systems', icon: 'Code2' }
  ],
  integrations: [
    { name: 'Klaviyo & Mailchimp', icon: 'Mail', category: 'Email Platforms', desc: 'World-class email campaign building, subscriber list segmentation, and template automation.' },
    { name: 'ActiveCampaign & HubSpot', icon: 'Workflow', category: 'Automation & CRM', desc: 'Advanced conditional branching, automated lead scoring, and deal stage sync.' },
    { name: 'Shopify & WooCommerce', icon: 'CreditCard', category: 'E-Commerce', desc: 'Real-time order sync, abandoned cart reminders, and post-purchase review sequences.' },
    { name: 'WordPress & Webflow', icon: 'Globe', category: 'CMS & Websites', desc: 'Seamless opt-in forms, popup lead capture, and subscriber data streaming.' },
    { name: 'GoHighLevel (GHL)', icon: 'Zap', category: 'All-In-One CRM', desc: 'Omnichannel SMS & email pipelines, calendar bookings, and review follow-ups.' },
    { name: 'Zapier & Make.com', icon: 'Cpu', category: 'Data Pipelines', desc: 'Multi-app event triggers and custom webhook data synchronization.' },
    { name: 'Salesforce & Pipedrive', icon: 'Database', category: 'Sales Pipeline', desc: 'Automated contact logging, pipeline stage progression, and rep alerts.' },
    { name: 'Custom REST APIs & Webhooks', icon: 'Code2', category: 'Custom Tech', desc: 'Direct bi-directional data flow with private servers and proprietary apps.' }
  ],

  // Section 7: Project Experience & Case Study
  outcomesEyebrow: 'PROJECT EXPERIENCE',
  outcomesTitle: 'Automated Email Systems Built For Business Growth',
  outcomesDesc: 'Our email automation projects focus on creating practical marketing systems that improve customer engagement, lead management, and revenue opportunities.',
  outcomes: [
    '200+ Digital Projects Completed across email automation, CRM, web, and marketing platforms',
    'Measurable conversion lift and revenue per subscriber increase',
    'Consistent inbox deliverability and high sender reputation scores'
  ],
  outcomeCards: [
    {
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=700&h=450&q=80',
      client: 'Lead Nurturing Campaign Project',
      metric: '200+',
      metricLabel: 'Digital Projects Completed',
      title: 'Automated Email Systems Built For Business Growth',
      desc: 'Our experience includes websites, automation systems, CRM platforms, AI solutions, and digital technology projects designed for modern businesses.',
      results: [
        'Dynamic behavioral drip sequences & lead warming',
        'High deliverability, list hygiene & CRM two-way sync',
        'Measurable conversion lifts across buyer journeys'
      ],
      isCaseStudy: true
    },
    {
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&h=450&q=80',
      client: 'DTC E-Commerce Lifecycle Automation',
      metric: '38%',
      metricLabel: 'Email-Attributed Revenue',
      title: 'Full-Funnel Klaviyo Flow Architecture',
      desc: 'Designed dynamic abandoned cart, browse abandonment, post-purchase replenishment, and VIP customer reward sequences.',
      results: [
        '38% of total monthly store revenue driven by automated flows',
        '4.2x increase in repeat customer purchase rate',
        '99.2% inbox deliverability with DKIM/SPF domain warming'
      ],
      isCaseStudy: false
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=700&h=450&q=80',
      client: 'B2B SaaS Lead Scoring & Onboarding',
      metric: '4.1x',
      metricLabel: 'Trial to Paid Conversion Lift',
      title: 'Automated In-App Event & Email Sequence',
      desc: 'Triggered milestone-based onboarding tips and sales consultation triggers based on product usage and feature adoption.',
      results: [
        '4.1x higher free trial to paid subscription conversion',
        'Automated sales rep notification when high-intent actions occur',
        'Reduced churn with proactive 30-day re-engagement drips'
      ],
      isCaseStudy: false
    }
  ],

  // FAQs
  faqs: [
    {
      q: 'What is email marketing automation and how does it work?',
      a: 'Email marketing automation uses predefined workflows, customer data, and triggers (such as signing up, downloading a resource, or abandoning a cart) to automatically send timely, personalised emails to the right person without manual intervention.'
    },
    {
      q: 'Which email automation platforms do you work with?',
      a: 'We work with all leading email and automation platforms including Klaviyo, ActiveCampaign, HubSpot, Mailchimp, GoHighLevel, Brevo, Omnisend, ConvertKit, and custom SMTP setups.'
    },
    {
      q: 'Can you integrate email automation with our website and CRM?',
      a: 'Yes. We seamlessly connect email automation platforms with WordPress, Shopify, WooCommerce, Webflow, custom React/Next.js sites, and CRMs like HubSpot, Salesforce, and GoHighLevel via APIs and webhooks.'
    },
    {
      q: 'How do you ensure our emails don’t land in spam folders?',
      a: 'We implement complete domain authentication (SPF, DKIM, DMARC, BIMI), conduct IP and domain warming, maintain strict list hygiene, clean inactive subscribers, and test content formatting for high inbox placement.'
    },
    {
      q: 'Can we manage and update this content from the Admin Dashboard?',
      a: 'Yes! All page text, services, process steps, engagement models, integrations, and FAQs are saved in MongoDB and can be managed directly from your Cubixsol Admin Dashboard.'
    }
  ],

  // Section 8: Final CTA Banner
  ctaEyebrow: 'START YOUR EMAIL AUTOMATION PROJECT',
  ctaTitle: 'Ready To Create A Smarter Email Marketing System?',
  ctaDesc: 'Get expert guidance for your next automation project. Share your requirements and discover how strategic email automation can improve your customer communication.',
  ctaButtonText: 'Get Your Free Consultation',
  ctaBannerEyebrow: 'START YOUR EMAIL AUTOMATION PROJECT',
  ctaBannerTitle: 'Ready To Create A Smarter Email Marketing System?',
  ctaBannerDesc: 'Get expert guidance for your next automation project. Share your requirements and discover how strategic email automation can improve your customer communication.',
  ctaBannerButtonText: 'Get Your Free Consultation',
  ctaBannerButtonLink: '/contact',

  // SEO Fields
  seo: {
    metaTitle: 'Email Marketing Automation Services to Turn Subscribers Into Customers | Cubixsol',
    metaDescription: 'Expert email marketing automation, lead nurturing drip campaigns, behavioral workflows, and CRM integrations to grow your business.',
    keywords: 'email marketing automation, email drip campaigns, lead nurturing email strategy, marketing automation workflows, email marketing company, Cubixsol',
    ogTitle: 'Email Marketing Automation Services to Turn Subscribers Into Customers',
    ogDescription: 'Turn subscribers into loyal customers with intelligent email marketing automation and lead nurturing workflows by Cubixsol.',
  },
};

async function seedEmailLeadNurture() {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB at:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully.');

    // 1. Seed into Service collection
    const updatedService = await Service.findOneAndUpdate(
      { slug: 'email-lead-nurture' },
      { $set: emailLeadNurtureData },
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
    );
    console.log('Successfully seeded Service for email-lead-nurture:', updatedService.slug);

    // 2. Seed into PageContent collection
    const updatedPage = await PageContent.findOneAndUpdate(
      { slug: 'email-lead-nurture' },
      { $set: { title: emailLeadNurtureData.title, content: emailLeadNurtureData } },
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
    );
    console.log('Successfully seeded PageContent for email-lead-nurture:', updatedPage.slug);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding email-lead-nurture:', error);
    process.exit(1);
  }
}

seedEmailLeadNurture();
