const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Service = require('./models/Service');
const PageContent = require('./models/PageContent');

const chatbotData = {
  slug: 'ai-chatbots',
  title: 'AI Chatbot Development Services for Smarter Customer Experiences',
  cardTitle: 'AI Chatbots',
  menuTitle: 'AI Chatbots',
  icon: 'Bot',
  color: 'text-[#00a4d8] bg-sky-50',
  gradient: 'from-[#00a4d8] to-[#5d53a3]',
  
  // Hero Section
  heroEyebrow: 'AI CHATBOT DEVELOPMENT SERVICES',
  heroTitle: 'AI Chatbot Development Services for Smarter Customer Experiences',
  heroSubtitle: 'Intelligent chatbot systems that automate conversations, improve customer support, and connect with your business systems.',
  heroDesc: 'As an AI chatbot development company, we create intelligent chatbot solutions to automate conversations and improve customer support. Our team provides custom AI chatbot development services to connect websites, applications, customer service platforms, and business systems through advanced conversational technology.',
  longDesc: 'As an AI chatbot development company, we create intelligent chatbot solutions to automate conversations and improve customer support. Our team provides custom AI chatbot development services to connect websites, applications, customer service platforms, and business systems through advanced conversational technology.',
  desc: 'We build intelligent AI chatbots for customer support, lead qualification, and enterprise automation across websites, mobile apps, and messaging platforms.',
  heroPrimaryBtnText: 'Book A Free Discovery Call',
  heroSecondaryBtnText: 'Explore Our Work',
  ctaPrimaryText: 'Book A Free Discovery Call',
  ctaSecondaryText: 'Explore Our Work',
  heroBadges: [
    'Instant 24/7 Customer Assistance',
    'Multi-Channel Web, App & CRM Sync',
    'Zero Hallucination Knowledge Base',
    'Enterprise Automation & Scalability'
  ],
  heroImage: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&h=800&q=80',

  // Section 1: Why Businesses Invest in AI Chatbot Solutions
  problemEyebrow: 'WHY BUSINESSES INVEST IN AI CHATBOT SOLUTIONS',
  problemTitle: 'Customers Expect Faster And More Personal Support',
  problemDesc: 'Traditional customer support systems often struggle with delayed responses, repetitive questions, and limited availability. An AI chatbot for customer service creates a faster communication channel that answers customer queries, collects information, and guides users through every interaction.',
  whyChooseTitle: 'Customers Expect Faster And More Personal Support',
  whyChooseIntro: 'Traditional customer support systems often struggle with delayed responses, repetitive questions, and limited availability. An AI chatbot for customer service creates a faster communication channel that answers customer queries, collects information, and guides users through every interaction.',
  whyChooseItems: [
    {
      title: 'Provide Instant Customer Assistance',
      desc: 'AI chatbot services allow businesses to answer customer questions immediately through websites, applications, and messaging platforms. Customers receive quick responses without waiting for support teams.'
    },
    {
      title: 'Automate Repetitive Support Tasks',
      desc: 'A customer service AI chatbot manages common requests such as FAQs, product information, booking questions, and account support. Teams can focus on complex customer needs while automated systems manage routine conversations.'
    },
    {
      title: 'Improve Lead Qualification And Conversion',
      desc: 'AI chatbots for business help companies capture visitor information, understand customer intent, and guide potential buyers toward the next step in their journey.'
    },
    {
      title: 'Create Consistent Customer Experiences',
      desc: 'AI chatbot development solutions provide reliable communication across different channels. Businesses can maintain consistent responses, messaging, and support quality for every customer interaction.'
    }
  ],
  problemCards: [
    {
      icon: 'Clock',
      title: 'Provide Instant Customer Assistance',
      desc: 'AI chatbot services allow businesses to answer customer questions immediately through websites, applications, and messaging platforms. Customers receive quick responses without waiting for support teams.'
    },
    {
      icon: 'Bot',
      title: 'Automate Repetitive Support Tasks',
      desc: 'A customer service AI chatbot manages common requests such as FAQs, product information, booking questions, and account support. Teams can focus on complex customer needs while automated systems manage routine conversations.'
    },
    {
      icon: 'Target',
      title: 'Improve Lead Qualification And Conversion',
      desc: 'AI chatbots for business help companies capture visitor information, understand customer intent, and guide potential buyers toward the next step in their journey.'
    },
    {
      icon: 'Users',
      title: 'Create Consistent Customer Experiences',
      desc: 'AI chatbot development solutions provide reliable communication across different channels. Businesses can maintain consistent responses, messaging, and support quality for every customer interaction.'
    }
  ],

  // Section 2: Our AI Chatbot Development Services
  capabilitiesEyebrow: 'OUR AI CHATBOT DEVELOPMENT SERVICES',
  capabilitiesTitle: 'Intelligent Chatbot Systems Built Around Your Business Needs',
  capabilitiesDesc: 'Our AI chatbot development services combine conversational design, AI technology, integrations, and business workflows to create chatbot systems that support specific operational goals.',
  subServicesTitle: 'Intelligent Chatbot Systems Built Around Your Business Needs',
  subServicesIntro: 'Our AI chatbot development services combine conversational design, AI technology, integrations, and business workflows to create chatbot systems that support specific operational goals.',
  subServicesItems: [
    {
      title: 'AI Customer Service Chatbot Development',
      desc: 'We build AI customer service chatbot solutions that handle customer enquiries, provide instant answers, and connect users with human agents when advanced assistance is required.'
    },
    {
      title: 'Website AI Chatbot Development',
      desc: 'We create customer support AI chatbot services for websites that engage visitors, answer questions, collect leads, and improve website communication.'
    },
    {
      title: 'Custom AI Chatbot Development Services',
      desc: 'We develop customised chatbot solutions based on your business processes, customer requirements, industry information, and communication goals.'
    },
    {
      title: 'AI Chatbot App Development Services',
      desc: 'We create mobile chatbot applications that allow businesses to provide intelligent customer support through dedicated platforms and mobile experiences.'
    },
    {
      title: 'Enterprise AI Chatbot Development Service',
      desc: 'We design enterprise-level chatbot systems with advanced integrations, security requirements, business data connections, and scalable automation capabilities.'
    },
    {
      title: 'AI Chatbot Integration And Optimisation',
      desc: 'We connect AI chatbots with CRM systems, knowledge bases, websites, applications, and existing business tools to create a connected communication ecosystem.'
    }
  ],
  capabilitiesCards: [
    {
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'CUSTOMER SERVICE',
      title: 'AI Customer Service Chatbot Development',
      desc: 'We build AI customer service chatbot solutions that handle customer enquiries, provide instant answers, and connect users with human agents when advanced assistance is required.',
      pills: ['Instant Answers', 'Human Escalation', '24/7 Availability']
    },
    {
      image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'WEBSITE ENGAGEMENT',
      title: 'Website AI Chatbot Development',
      desc: 'We create customer support AI chatbot services for websites that engage visitors, answer questions, collect leads, and improve website communication.',
      pills: ['Lead Capture', 'Visitor Engagement', 'Seamless Widget']
    },
    {
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'CUSTOM ARCHITECTURE',
      title: 'Custom AI Chatbot Development Services',
      desc: 'We develop customised chatbot solutions based on your business processes, customer requirements, industry information, and communication goals.',
      pills: ['Bespoke Workflows', 'Industry Logic', 'Private Knowledge']
    },
    {
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'MOBILE & APP',
      title: 'AI Chatbot App Development Services',
      desc: 'We create mobile chatbot applications that allow businesses to provide intelligent customer support through dedicated platforms and mobile experiences.',
      pills: ['iOS & Android', 'Dedicated UI', 'Push Notifications']
    },
    {
      image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'ENTERPRISE SCALE',
      title: 'Enterprise AI Chatbot Development Service',
      desc: 'We design enterprise-level chatbot systems with advanced integrations, security requirements, business data connections, and scalable automation capabilities.',
      pills: ['Enterprise Security', 'Data Pipelines', 'High Volume']
    },
    {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'INTEGRATIONS & OPS',
      title: 'AI Chatbot Integration And Optimisation',
      desc: 'We connect AI chatbots with CRM systems, knowledge bases, websites, applications, and existing business tools to create a connected communication ecosystem.',
      pills: ['CRM & Helpdesk Sync', 'API Pipelines', 'Continuous Tuning']
    }
  ],

  // Section 3: Choose the Right AI Chatbot Approach (Interactive Solver)
  fixFirstEyebrow: 'CHOOSE THE RIGHT AI CHATBOT APPROACH',
  fixFirstTitle: 'Which Area Of Your Business Needs Intelligent Automation?',
  fixFirstDesc: 'A successful chatbot project starts with understanding your business objectives and selecting the right AI solution for your customers, teams, and workflows.',
  businessTypesTitle: 'Which Area Of Your Business Needs Intelligent Automation?',
  businessTypesIntro: 'A successful chatbot project starts with understanding your business objectives and selecting the right AI solution for your customers, teams, and workflows.',
  businessTypesItems: [
    {
      title: 'We Need Better Customer Support Operations',
      desc: 'Businesses that receive repeated customer questions can use an AI customer service chatbot to automate responses and improve support availability. Recommended Setup: Website Chatbot → Knowledge Base → Automated Responses → Human Support Connection'
    },
    {
      title: 'We Want To Generate And Qualify More Leads',
      desc: 'Companies focused on growth can use AI chatbot development solutions to engage website visitors and collect valuable customer information. Recommended Setup: AI Chatbot → Lead Qualification → CRM Integration → Sales Follow-Up'
    },
    {
      title: 'We Need A Custom Business Assistant',
      desc: 'Organisations with unique workflows can use custom AI chatbot development services to create an assistant trained around their products, services, and internal information. Recommended Setup: Business Data → AI Training → Custom Chatbot → Workflow Automation'
    },
    {
      title: 'We Require Enterprise-Level Communication Automation',
      desc: 'Large organisations can use enterprise AI chatbot development services to manage customer interactions across multiple platforms. Recommended Setup: AI Platform → Business Systems Integration → Analytics → Continuous Improvement'
    }
  ],
  fixFirstImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&h=600&q=80',
  fixFirstItems: [
    {
      id: 'customer-support',
      title: 'We Need Better Customer Support Operations',
      desc: 'Businesses that receive repeated customer questions can use an AI customer service chatbot to automate responses and improve support availability.',
      tag: 'Support Operations',
      solution: 'Website Chatbot → Knowledge Base → Automated Responses → Human Support Connection'
    },
    {
      id: 'lead-generation',
      title: 'We Want To Generate And Qualify More Leads',
      desc: 'Companies focused on growth can use AI chatbot development solutions to engage website visitors and collect valuable customer information.',
      tag: 'Lead Qualification',
      solution: 'AI Chatbot → Lead Qualification → CRM Integration → Sales Follow-Up'
    },
    {
      id: 'custom-assistant',
      title: 'We Need A Custom Business Assistant',
      desc: 'Organisations with unique workflows can use custom AI chatbot development services to create an assistant trained around their products, services, and internal information.',
      tag: 'Custom Assistant',
      solution: 'Business Data → AI Training → Custom Chatbot → Workflow Automation'
    },
    {
      id: 'enterprise-automation',
      title: 'We Require Enterprise-Level Communication Automation',
      desc: 'Large organisations can use enterprise AI chatbot development services to manage customer interactions across multiple platforms.',
      tag: 'Enterprise Automation',
      solution: 'AI Platform → Business Systems Integration → Analytics → Continuous Improvement'
    }
  ],

  // Section 4: Our AI Chatbot Development Process
  processEyebrow: 'OUR AI CHATBOT DEVELOPMENT PROCESS',
  processTitle: 'From Planning To A Fully Functional AI Assistant',
  processDesc: 'Our development approach creates reliable chatbot systems that match your business requirements and customer expectations.',
  serviceProcessTitle: 'From Planning To A Fully Functional AI Assistant',
  serviceProcessIntro: 'Our development approach creates reliable chatbot systems that match your business requirements and customer expectations.',
  serviceProcessSteps: [
    {
      stepNumber: '01',
      title: 'Business Requirement Analysis',
      desc: 'We review your customer journey, communication challenges, business goals, and automation requirements before creating the chatbot strategy.'
    },
    {
      stepNumber: '02',
      title: 'Conversation Design And Planning',
      desc: 'We create chatbot conversations, user flows, response structures, and interaction paths that provide natural customer experiences.'
    },
    {
      stepNumber: '03',
      title: 'AI Development And System Integration',
      desc: 'We develop the chatbot, connect required platforms, integrate business data, and configure automation workflows.'
    },
    {
      stepNumber: '04',
      title: 'Testing Customer Interactions',
      desc: 'We test chatbot responses, user journeys, integrations, and performance to identify improvements before deployment.'
    },
    {
      stepNumber: '05',
      title: 'Deployment And Ongoing Enhancement',
      desc: 'We launch the chatbot system and provide optimisation support to improve accuracy, performance, and customer engagement.'
    }
  ],
  processSteps: [
    {
      step: '01',
      title: 'Business Requirement Analysis',
      desc: 'We review your customer journey, communication challenges, business goals, and automation requirements before creating the chatbot strategy.'
    },
    {
      step: '02',
      title: 'Conversation Design And Planning',
      desc: 'We create chatbot conversations, user flows, response structures, and interaction paths that provide natural customer experiences.'
    },
    {
      step: '03',
      title: 'AI Development And System Integration',
      desc: 'We develop the chatbot, connect required platforms, integrate business data, and configure automation workflows.'
    },
    {
      step: '04',
      title: 'Testing Customer Interactions',
      desc: 'We test chatbot responses, user journeys, integrations, and performance to identify improvements before deployment.'
    },
    {
      step: '05',
      title: 'Deployment And Ongoing Enhancement',
      desc: 'We launch the chatbot system and provide optimisation support to improve accuracy, performance, and customer engagement.'
    }
  ],

  // Section 5: Work With Our AI Chatbot Development Experts (Engagement Models)
  modelsEyebrow: 'WORK WITH OUR AI CHATBOT DEVELOPMENT EXPERTS',
  modelsTitle: 'Flexible Chatbot Solutions For Different Business Requirements',
  modelsDesc: 'Businesses require different levels of automation support. Our AI chatbot development company provides solutions based on your goals, industry requirements, and technology needs.',
  pricingSectionTitle: 'Flexible Chatbot Solutions For Different Business Requirements',
  pricingSectionText: 'Businesses require different levels of automation support. Our AI chatbot development company provides solutions based on your goals, industry requirements, and technology needs.',
  models: [
    {
      number: '1',
      title: 'Complete AI Chatbot Development Project',
      desc: 'We create complete chatbot systems with strategy, design, development, integrations, testing, and deployment support.',
      features: [
        'End-to-End Chatbot Strategy & Architecture',
        'Custom Conversational UI & Widget Design',
        'Knowledge Base & LLM System Prompting',
        'Platform Testing & Complete Handover'
      ],
      ctaText: 'Start Chatbot Project'
    },
    {
      number: '2',
      title: 'Customer Support Automation Solution',
      desc: 'We build AI chatbots for customer service systems that reduce response times and improve customer communication.',
      features: [
        'Automated FAQ & Tier-1 Ticket Resolution',
        'Multi-Channel Web & Helpdesk Integration',
        'Seamless Human Agent Hand-off Protocols',
        '24/7 Availability with Sub-Second Responses'
      ],
      ctaText: 'Build Support Chatbot',
      isPopular: true
    },
    {
      number: '3',
      title: 'Business AI Assistant Development',
      desc: 'We develop AI chatbot solutions that support internal operations, customer interactions, sales activities, and business workflows.',
      features: [
        'Internal Wiki & CRM Intelligence Connector',
        'Automated Lead Capture & Meeting Booking',
        'Custom Business Workflow Automations',
        'Role-Based Access & Data Privacy Controls'
      ],
      ctaText: 'Build Business Assistant'
    },
    {
      number: '4',
      title: 'Long-Term Chatbot Improvement Services',
      desc: 'We optimise existing chatbot systems through updates, performance improvements, new integrations, and enhanced conversational capabilities.',
      features: [
        'Continuous Conversation & Sentiment Audits',
        'Prompt Tuning & Knowledge Base Updates',
        'New Channel & API Integrations',
        'Dedicated AI Performance Engineering'
      ],
      ctaText: 'Get Chatbot Optimization'
    }
  ],

  // Section 6: AI Chatbot Technology Ecosystem
  spectrumEyebrow: 'AI CHATBOT TECHNOLOGY ECOSYSTEM',
  spectrumTitle: 'Chatbots Connected With Your Existing Business Platforms',
  spectrumDesc: 'AI chatbots become more effective when they work alongside the tools your business already uses.',
  techTitle: 'Chatbots Connected With Your Existing Business Platforms',
  techDesc: 'AI chatbots become more effective when they work alongside the tools your business already uses.',
  tech: ['OpenAI GPT-4o', 'Claude 3.5', 'WhatsApp API', 'HubSpot', 'Salesforce', 'Pinecone', 'Zendesk', 'Shopify'],
  supportedPlatforms: [
    { name: 'OpenAI GPT-4o & Claude 3.5', category: 'Foundation Models', icon: 'Bot' },
    { name: 'WhatsApp Business API', category: 'Messaging Platforms', icon: 'Smartphone' },
    { name: 'HubSpot & Salesforce CRM', category: 'CRM Systems', icon: 'Workflow' },
    { name: 'Pinecone & Qdrant Vector DB', category: 'Knowledge & Vector Search', icon: 'Database' },
    { name: 'Zendesk & Freshdesk', category: 'Helpdesk & Support', icon: 'MessageSquare' },
    { name: 'Shopify & WooCommerce', category: 'E-Commerce Platforms', icon: 'CreditCard' },
    { name: 'Google Calendar & Calendly', category: 'Scheduling & Booking', icon: 'Calendar' },
    { name: 'Custom APIs & Webhooks', category: 'Custom Business Systems', icon: 'Code2' }
  ],
  integrations: [
    { name: 'OpenAI GPT-4o & Claude 3.5', icon: 'Bot', category: 'Foundation Models', desc: 'High-speed reasoning and natural language conversational intelligence.' },
    { name: 'WhatsApp Business API', icon: 'Smartphone', category: 'Messaging Platforms', desc: 'Engage billions of global customers on WhatsApp with verified business profile interactions.' },
    { name: 'HubSpot & Salesforce CRM', icon: 'Workflow', category: 'CRM Systems', desc: 'Real-time contact enrichment, deal creation, and conversation history logging.' },
    { name: 'Pinecone & Qdrant Vector DB', icon: 'Database', category: 'Knowledge & Vector Search', desc: 'Ultra-low latency semantic document search for accurate RAG knowledge retrieval.' },
    { name: 'Zendesk & Freshdesk', icon: 'MessageSquare', category: 'Helpdesk & Support', desc: 'Automatic ticket creation, status queries, and smooth escalation to human reps.' },
    { name: 'Shopify & WooCommerce', icon: 'CreditCard', category: 'E-Commerce Platforms', desc: 'Live product search, sizing assistant, cart recovery, and tracking updates.' },
    { name: 'Google Calendar & Calendly', icon: 'Calendar', category: 'Scheduling & Booking', desc: 'Real-time availability lookup and instant in-chat meeting confirmation.' },
    { name: 'Custom APIs & Webhooks', icon: 'Code2', category: 'Custom Business Systems', desc: 'Connect private databases, ERP software, and authentication services effortlessly.' }
  ],

  // Section 7: Project Experience & Case Study
  outcomesEyebrow: 'PROJECT EXPERIENCE',
  outcomesTitle: 'AI Communication Systems Designed For Real Business Challenges',
  outcomesDesc: 'Our chatbot projects focus on creating practical solutions that improve customer service, lead management, and business communication.',
  outcomes: [
    '100+ Digital Projects Completed across web, automation, CRM, and AI platforms',
    'Intelligent tier-1 support ticket deflection with sub-second response times',
    'Seamless omnichannel sync across website, WhatsApp, and CRM helpdesks'
  ],
  outcomeCards: [
    {
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=700&h=450&q=80',
      client: 'Customer Support Chatbot Project',
      metric: '100+',
      metricLabel: 'Digital Projects Completed',
      title: 'AI Communication Systems Designed For Real Business Challenges',
      desc: 'Our experience includes websites, automation systems, CRM platforms, AI solutions, and digital technology projects designed for modern businesses.',
      results: [
        'Automated ticket deflection and faster response times',
        'Seamless integration across CRM, web, and support desks',
        'Zero hallucination accuracy with private business data'
      ],
      isCaseStudy: true
    },
    {
      image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=700&h=450&q=80',
      client: 'B2B SaaS Help Center Assistant',
      metric: '70%',
      metricLabel: 'Routine Inquiries Automated',
      title: 'Knowledge Base Support & Triage Bot',
      desc: 'Connected product documentation and internal wikis to resolve common user inquiries and route complex issues directly to specialists.',
      results: [
        '70% first-contact resolution for common inquiries',
        '24/7 global support coverage across time zones',
        'Context-preserved live agent escalation'
      ],
      isCaseStudy: false
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=700&h=450&q=80',
      client: 'Multi-Channel Sales & Qualification Bot',
      metric: '3.5x',
      metricLabel: 'Increase in Qualified Leads',
      title: 'Inbound Qualification & Scheduling Bot',
      desc: 'Engages inbound traffic on website and WhatsApp to qualify buyer requirements and schedule discovery calls directly into sales calendars.',
      results: [
        'Instant prospect qualification without human wait time',
        'Automatic 2-way synchronization with CRM pipeline',
        'Higher conversion rate on high-intent pages'
      ],
      isCaseStudy: false
    }
  ],

  // FAQs
  faqs: [
    {
      q: 'What is an AI chatbot and how does it help my business?',
      a: 'An AI chatbot uses natural language processing and modern machine learning models to understand customer questions, provide instant answers, collect information, qualify leads, and automate routine support tasks 24/7 across your website, apps, and messaging channels.'
    },
    {
      q: 'How does the chatbot connect with our existing CRM and tools?',
      a: 'We connect chatbots via REST APIs and secure webhooks to your existing systems such as HubSpot, Salesforce, Zendesk, WhatsApp Business, Slack, Google Calendar, and custom databases, ensuring real-time bi-directional data flow.'
    },
    {
      q: 'Can the chatbot transfer conversations to a human agent?',
      a: 'Yes. When an inquiry requires human intervention or reaches complex criteria, the chatbot seamlessly transfers the conversation along with full context, transcripts, and customer details to your live support team or helpdesk.'
    },
    {
      q: 'Can we manage and update chatbot content from our Admin Dashboard?',
      a: 'Yes! All chatbot copy, services, processes, packages, integrations, and FAQs can be viewed and updated directly from the Cubixsol Admin Dashboard, saving straight into MongoDB.'
    },
    {
      q: 'How long does an AI chatbot project typically take?',
      a: 'A standard custom chatbot implementation typically takes 1 to 2 weeks for planning, knowledge base connection, testing, and deployment. Enterprise multi-channel projects with deep custom integrations typically take 2 to 3 weeks.'
    }
  ],

  // Section 8: Final CTA Banner
  ctaEyebrow: 'START YOUR AI CHATBOT PROJECT',
  ctaTitle: 'Ready To Build An Intelligent Customer Communication System?',
  ctaDesc: 'Get expert guidance for your next AI chatbot development project. Share your requirements and discover how automation can improve your customer experience.',
  ctaButtonText: 'Get Your Free Consultation',
  ctaBannerEyebrow: 'START YOUR AI CHATBOT PROJECT',
  ctaBannerTitle: 'Ready To Build An Intelligent Customer Communication System?',
  ctaBannerDesc: 'Get expert guidance for your next AI chatbot development project. Share your requirements and discover how automation can improve your customer experience.',
  ctaBannerButtonText: 'Get Your Free Consultation',
  ctaBannerButtonLink: '/contact',

  // SEO Fields
  seo: {
    metaTitle: 'AI Chatbot Development Services for Smarter Customer Experiences | Cubixsol',
    metaDescription: 'Custom AI chatbot development services. Intelligent chatbot solutions to automate conversations, improve customer support, qualify leads, and connect enterprise systems.',
    keywords: 'AI chatbot development, customer service AI chatbot, website AI chatbot, intelligent conversational agents, AI chatbot company, Cubixsol',
    ogTitle: 'AI Chatbot Development Services for Smarter Customer Experiences',
    ogDescription: 'Automate conversations and improve customer support with custom AI chatbot development services by Cubixsol.',
  },
};

async function seedChatbots() {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB at:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully.');

    // 1. Seed into Service collection
    const updatedService = await Service.findOneAndUpdate(
      { slug: 'ai-chatbots' },
      { $set: chatbotData },
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
    );
    console.log('Successfully seeded Service for ai-chatbots:', updatedService.slug);

    // 2. Seed into PageContent collection
    const updatedPage = await PageContent.findOneAndUpdate(
      { slug: 'ai-chatbots' },
      { $set: { title: chatbotData.title, content: chatbotData } },
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
    );
    console.log('Successfully seeded PageContent for ai-chatbots:', updatedPage.slug);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding ai-chatbots:', error);
    process.exit(1);
  }
}

seedChatbots();
