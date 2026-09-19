const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Service = require('./models/Service');

const automateServices = [
  {
    slug: 'ghl-automation',
    title: 'GHL Automation Services',
    menuTitle: 'GHL Automation',
    icon: 'Zap',
    color: 'text-red-500 bg-red-50',
    gradient: 'from-red-500 to-rose-600',
    heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&h=750&q=70',
    desc: 'Scale your agency and business operations with custom GoHighLevel (GHL) snapshot setups, pipeline automation, and multi-channel triggers.',
    longDesc: 'Cubixsol provides comprehensive GoHighLevel (GHL) automation services to help agencies, local businesses, and enterprise teams streamline operations. From custom sub-account setups and snapshot deployment to complex webhook integrations, appointment booking automations, and CRM workflows, we ensure your sales pipeline runs on autopilot.',
    features: [
      'Custom GHL Snapshot Setup & Deployment',
      'Multi-Stage Sales Pipeline Automation',
      'Automated SMS & Email Follow-Up Sequences',
      'Calendar & Appointment Booking Workflows',
      'Stripe & Payment Gateway Integrations',
      'Custom Webhooks & Zapier / Make Connectivity',
      'Sub-Account & Agency Client Onboarding',
      'Reputation Management & Review Automation'
    ],
    tech: ['GoHighLevel (GHL)', 'Zapier', 'Make.com', 'Webhooks', 'REST APIs', 'Twilio', 'Mailgun'],
    outcomes: [
      'Zero lead leakage with instant automated follow-ups',
      'Automated appointment bookings and calendar reminders',
      'Hundreds of hours saved in manual administrative tasks'
    ],
    faqs: [
      {
        q: 'What is GoHighLevel (GHL) automation?',
        a: 'GoHighLevel automation connects your CRM, email, SMS, funnels, calendars, and pipelines into automated workflows that trigger actions based on lead behavior, stage changes, or form submissions.'
      },
      {
        q: 'Can you build custom GHL snapshots for our agency or clients?',
        a: 'Yes, we design turnkey snapshots tailored to specific niches including custom funnels, trigger links, workflows, email templates, and calendar setups.'
      },
      {
        q: 'Do you integrate GHL with external platforms and custom APIs?',
        a: 'Yes, we connect GHL with external databases, custom web apps, Shopify, payment gateways, and third-party tools via webhooks and API integrations.'
      }
    ],
    seo: {
      metaTitle: 'GoHighLevel (GHL) Automation Services | Cubixsol',
      metaDescription: 'Expert GoHighLevel (GHL) workflow automation, snapshot deployment, and CRM integration services by Cubixsol.',
      keywords: 'GHL automation, GoHighLevel, CRM automation, agency snapshots, workflow automation'
    }
  },
  {
    slug: 'hubspot-crm',
    title: 'HubSpot CRM Setup & Automation Services',
    menuTitle: 'HubSpot CRM',
    icon: 'BarChart2',
    color: 'text-orange-500 bg-orange-50',
    gradient: 'from-orange-500 to-amber-600',
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&h=750&q=70',
    desc: 'Unlock full revenue potential with expert HubSpot CRM architecture, deal pipeline setup, lifecycle stages, and custom sales enablement.',
    longDesc: 'We help high-growth businesses optimize their sales and marketing operations through professional HubSpot CRM implementation. Our team configures custom properties, deal stages, automated lead routing, marketing hubs, and bespoke reporting dashboards to align your sales and marketing teams.',
    features: [
      'HubSpot CRM Configuration & Data Migration',
      'Deal Pipeline & Custom Lifecycle Stages',
      'Automated Lead Scoring & Sales Routing',
      'Marketing Hub & Sales Hub Integration',
      'Custom Reporting & Executive Dashboards',
      'HubSpot API & Third-Party App Integrations',
      'Email Sequence & Workflow Automation',
      'Sales Playbooks & Activity Tracking'
    ],
    tech: ['HubSpot CRM', 'HubSpot Marketing Hub', 'HubSpot Sales Hub', 'HubSpot API', 'Operations Hub'],
    outcomes: [
      'Unified visibility into the entire customer lifecycle',
      'Accelerated deal velocity and higher close rates',
      'Accurate multi-touch revenue attribution'
    ],
    faqs: [
      {
        q: 'How can HubSpot CRM improve our sales performance?',
        a: 'HubSpot centralizes contact data, automates repetitive sales outreach, tracks buyer engagements in real-time, and gives sales leaders clear visibility into pipeline velocity and revenue forecasts.'
      },
      {
        q: 'Can you migrate our data from another CRM to HubSpot?',
        a: 'Yes, we handle complete data cleansing, field mapping, and migration from Salesforce, Pipedrive, Zoho, or legacy systems without data loss.'
      }
    ],
    seo: {
      metaTitle: 'HubSpot CRM Consulting & Setup Services | Cubixsol',
      metaDescription: 'Maximize sales and revenue with certified HubSpot CRM setup, workflow automation, and custom integrations.',
      keywords: 'HubSpot CRM, CRM setup, deal pipeline, sales automation, marketing automation'
    }
  },
  {
    slug: 'ai-workflows',
    title: 'AI Workflows & Business Process Automation',
    menuTitle: 'AI Workflows',
    icon: 'BrainCircuit',
    color: 'text-indigo-600 bg-indigo-50',
    gradient: 'from-indigo-600 to-purple-700',
    heroImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&h=750&q=70',
    desc: 'Transform manual operations into intelligent, self-executing workflows using modern LLMs, automated agents, and intelligent document processing.',
    longDesc: 'Cubixsol builds enterprise-grade AI workflows that automate complex multi-step processes. From document analysis and automated data extraction to sentiment classification, report generation, and autonomous task routing, we embed AI intelligence directly into your existing software stack.',
    features: [
      'Autonomous AI Agent Orchestration',
      'Intelligent Document & Invoice Processing',
      'Automated Data Extraction & Synthesis',
      'LLM Prompt Engineering & Fine-Tuning',
      'Custom RAG (Retrieval-Augmented Generation) Systems',
      'Cross-Platform API & Database Automation',
      'Automated Content & Report Generation',
      'Real-Time Monitoring & Human-in-the-Loop Safeguards'
    ],
    tech: ['OpenAI GPT-4o', 'Claude 3.5 Sonnet', 'LangChain', 'LlamaIndex', 'Python', 'Vector DBs', 'Make / n8n'],
    outcomes: [
      'Over 80% reduction in document processing time',
      'Elimination of manual repetitive data entry errors',
      '24/7 autonomous workflow execution at scale'
    ],
    faqs: [
      {
        q: 'What is an AI workflow?',
        a: 'An AI workflow incorporates artificial intelligence models (such as LLMs or vision models) into automated pipelines to make intelligent decisions, extract structured data, classify information, or generate outputs without human intervention.'
      },
      {
        q: 'How secure is our company data when using AI workflows?',
        a: 'We implement strict enterprise-grade security protocols, private API endpoints, and data encryption to ensure proprietary business data is never used for public model training.'
      }
    ],
    seo: {
      metaTitle: 'AI Workflows & Process Automation Services | Cubixsol',
      metaDescription: 'Automate business processes with custom AI agent workflows, LLM orchestration, and smart document pipelines.',
      keywords: 'AI workflows, AI automation, LLM orchestration, intelligent process automation, RAG'
    }
  },
  {
    slug: 'ai-chatbots',
    title: 'Custom AI Chatbot Development & Agent Deployment',
    menuTitle: 'AI Chatbots',
    icon: 'Bot',
    color: 'text-sky-600 bg-sky-50',
    gradient: 'from-sky-500 to-blue-600',
    heroImage: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1000&h=750&q=70',
    desc: 'Deliver instant, 24/7 conversational support and qualify high-intent leads with custom AI chatbots trained on your business knowledge base.',
    longDesc: 'We develop and deploy custom AI chatbots that deliver human-grade conversations across your website, WhatsApp, Slack, and mobile apps. Powered by Retrieval-Augmented Generation (RAG) and connected to your CRM and booking systems, our chatbots answer complex queries, schedule meetings, and resolve support tickets instantly.',
    features: [
      'Custom Knowledge Base & Vector Search (RAG)',
      'Website, WhatsApp & Messenger Integrations',
      'Multi-Language Conversational Capabilities',
      'Automated Lead Qualification & CRM Sync',
      'Calendar Booking & Payment Handling',
      'Seamless Human Agent Hand-off',
      'Conversation Analytics & Sentiment Tracking',
      'Enterprise Security & Data Privacy Compliance'
    ],
    tech: ['OpenAI API', 'Pinecone / Qdrant', 'React / Web Components', 'WebSocket', 'Node.js', 'WhatsApp Business API'],
    outcomes: [
      'Instant <1s response time for all customer inquiries',
      'Up to 70% deflection of routine customer support tickets',
      'Substantial increase in website lead conversion rate'
    ],
    faqs: [
      {
        q: 'How does the AI chatbot know about my business?',
        a: 'We train the chatbot on your documentation, product manuals, FAQs, website content, and internal knowledge bases using vector embeddings so it provides accurate, brand-aligned answers.'
      },
      {
        q: 'Can the chatbot book appointments and collect payments?',
        a: 'Yes, we integrate chatbots with booking engines like Calendly / GHL calendars and payment gateways like Stripe for instant conversions.'
      }
    ],
    seo: {
      metaTitle: 'Custom AI Chatbot Development Services | Cubixsol',
      metaDescription: 'Deploy custom AI chatbots with RAG, vector search, WhatsApp and CRM integration for 24/7 customer engagement.',
      keywords: 'AI chatbots, custom chatbot, conversational AI, customer support bot, WhatsApp AI bot'
    }
  },
  {
    slug: 'email-lead-nurture',
    title: 'Email & Lead Nurture Automation Services',
    menuTitle: 'Email & Lead Nurture',
    icon: 'Mail',
    color: 'text-emerald-600 bg-emerald-50',
    gradient: 'from-emerald-500 to-teal-600',
    heroImage: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=1000&h=750&q=70',
    desc: 'Turn prospects into loyal customers with behavioral email drip campaigns, automated lead nurture journeys, and high-deliverability strategies.',
    longDesc: 'Cubixsol crafts data-driven email and lead nurture automation systems that engage leads at every stage of their buyer journey. From welcome series and re-engagement workflows to automated cart abandonment sequences and educational drip campaigns, we boost your conversions and maximize customer lifetime value.',
    features: [
      'Behavior-Triggered Dynamic Drip Sequences',
      'Advanced Audience Segmentation & Tagging',
      'High-Converting Copywriting & Responsive Design',
      'Lead Scoring & Stage Progression Triggers',
      'A/B Testing for Subject Lines & CTAs',
      'Domain Warmup & High Deliverability Setup',
      'CRM & E-Commerce Platform Synchronization',
      'In-Depth Open, Click & Conversion Analytics'
    ],
    tech: ['ActiveCampaign', 'Klaviyo', 'HubSpot', 'Mailchimp', 'Brevo', 'SendGrid', 'HTML Email Templates'],
    outcomes: [
      'Higher email deliverability and inbox placement',
      'Increased repeat purchase and conversion rates',
      'Consistent automated revenue generation on autopilot'
    ],
    faqs: [
      {
        q: 'What is lead nurture automation?',
        a: 'Lead nurture automation sends relevant, personalized email content to potential customers based on their interactions, interests, and stage in the sales funnel until they are ready to buy.'
      },
      {
        q: 'Which email platforms do you work with?',
        a: 'We work with all major platforms including Klaviyo, HubSpot, ActiveCampaign, Mailchimp, GoHighLevel, and custom transactional email providers like SendGrid and AWS SES.'
      }
    ],
    seo: {
      metaTitle: 'Email Marketing & Lead Nurture Automation | Cubixsol',
      metaDescription: 'Scale revenue with automated email nurture campaigns, behavioral triggers, Klaviyo, HubSpot, and ActiveCampaign workflows.',
      keywords: 'email marketing, lead nurture, drip campaign, email automation, Klaviyo, ActiveCampaign'
    }
  }
];

async function seedAutomateServices() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB.');

    for (const service of automateServices) {
      const result = await Service.findOneAndUpdate(
        { slug: service.slug },
        { $set: service },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      console.log(`✓ Synced service: ${service.menuTitle} (${service.slug})`);
    }

    console.log('Done seeding Automate services.');
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error seeding automate services:', err);
    process.exit(1);
  }
}

seedAutomateServices();
