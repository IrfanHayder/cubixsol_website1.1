import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Bot, MessageSquare, Zap, Clock, Users, ArrowRight, CheckCircle2,
  ChevronRight, TrendingUp, Sparkles, ShieldCheck, Database, Calendar,
  Mail, Layers, PhoneCall, ExternalLink, RefreshCw, BarChart3,
  HelpCircle, Star, Sliders, Workflow, Cpu, Settings, Smartphone,
  Award, Target, Rocket, Globe, CreditCard, Share2, Terminal, Code2,
  Check, PieChart, GitBranch, Server, BrainCircuit, FileText, Send,
  ShieldAlert, MessagesSquare, CheckCircle, Briefcase, ChevronDown
} from 'lucide-react';
import { useEstimateModal } from '../context/EstimateModalContext';
import { apiFetch } from '../utils/api';
import { formatInline } from '../utils/formatText';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';
import CtaBanner from '../components/CtaBanner';
import DynamicIcon from '../components/DynamicIcon';
import { useSEO } from '../utils/seo';

// Default static data matching the exact document content and design
const DEFAULT_DATA = {
  slug: 'ai-chatbots',
  title: 'AI Chatbot Development Services for Smarter Customer Experiences',
  heroEyebrow: 'AI CHATBOT DEVELOPMENT SERVICES',
  heroTitle: 'AI Chatbot Development Services for Smarter Customer Experiences',
  heroDesc: 'As an AI chatbot development company, we create intelligent chatbot solutions to automate conversations and improve customer support. Our team provides custom AI chatbot development services to connect websites, applications, customer service platforms, and business systems through advanced conversational technology.',
  heroPrimaryBtnText: 'Book A Free Discovery Call',
  heroSecondaryBtnText: 'Explore Our Work',
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
  problemCards: [
    {
      icon: 'Clock',
      title: 'Provide Instant Customer Assistance',
      desc: 'AI chatbot services allow businesses to answer customer questions immediately through websites, applications, and messaging platforms. Customers receive quick responses without waiting for support teams.',
    },
    {
      icon: 'Bot',
      title: 'Automate Repetitive Support Tasks',
      desc: 'A customer service AI chatbot manages common requests such as FAQs, product information, booking questions, and account support. Teams can focus on complex customer needs while automated systems manage routine conversations.',
    },
    {
      icon: 'Target',
      title: 'Improve Lead Qualification And Conversion',
      desc: 'AI chatbots for business help companies capture visitor information, understand customer intent, and guide potential buyers toward the next step in their journey.',
    },
    {
      icon: 'Users',
      title: 'Create Consistent Customer Experiences',
      desc: 'AI chatbot development solutions provide reliable communication across different channels. Businesses can maintain consistent responses, messaging, and support quality for every customer interaction.',
    },
  ],

  // Section 2: Our AI Chatbot Development Services (6 Cards)
  capabilitiesEyebrow: 'OUR AI CHATBOT DEVELOPMENT SERVICES',
  capabilitiesTitle: 'Intelligent Chatbot Systems Built Around Your Business Needs',
  capabilitiesDesc: 'Our AI chatbot development services combine conversational design, AI technology, integrations, and business workflows to create chatbot systems that support specific operational goals.',
  capabilitiesCards: [
    {
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'CUSTOMER SERVICE',
      title: 'AI Customer Service Chatbot Development',
      desc: 'We build AI customer service chatbot solutions that handle customer enquiries, provide instant answers, and connect users with human agents when advanced assistance is required.',
      pills: ['Instant Answers', 'Human Escalation', '24/7 Availability'],
    },
    {
      image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'WEBSITE ENGAGEMENT',
      title: 'Website AI Chatbot Development',
      desc: 'We create customer support AI chatbot services for websites that engage visitors, answer questions, collect leads, and improve website communication.',
      pills: ['Lead Capture', 'Visitor Engagement', 'Seamless Widget'],
    },
    {
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'CUSTOM ARCHITECTURE',
      title: 'Custom AI Chatbot Development Services',
      desc: 'We develop customised chatbot solutions based on your business processes, customer requirements, industry information, and communication goals.',
      pills: ['Bespoke Workflows', 'Industry Logic', 'Private Knowledge'],
    },
    {
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'MOBILE & APP',
      title: 'AI Chatbot App Development Services',
      desc: 'We create mobile chatbot applications that allow businesses to provide intelligent customer support through dedicated platforms and mobile experiences.',
      pills: ['iOS & Android', 'Dedicated UI', 'Push Notifications'],
    },
    {
      image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'ENTERPRISE SCALE',
      title: 'Enterprise AI Chatbot Development Service',
      desc: 'We design enterprise-level chatbot systems with advanced integrations, security requirements, business data connections, and scalable automation capabilities.',
      pills: ['Enterprise Security', 'Data Pipelines', 'High Volume'],
    },
    {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'INTEGRATIONS & OPS',
      title: 'AI Chatbot Integration And Optimisation',
      desc: 'We connect AI chatbots with CRM systems, knowledge bases, websites, applications, and existing business tools to create a connected communication ecosystem.',
      pills: ['CRM & Helpdesk Sync', 'API Pipelines', 'Continuous Tuning'],
    },
  ],

  // Section 3: Interactive Chatbot Problem Solver
  fixFirstEyebrow: 'CHOOSE THE RIGHT AI CHATBOT APPROACH',
  fixFirstTitle: 'Which Area Of Your Business Needs Intelligent Automation?',
  fixFirstDesc: 'A successful chatbot project starts with understanding your business objectives and selecting the right AI solution for your customers, teams, and workflows.',
  fixFirstImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&h=600&q=80',
  fixFirstItems: [
    {
      id: 'customer-support',
      title: 'We Need Better Customer Support Operations',
      desc: 'Businesses that receive repeated customer questions can use an AI customer service chatbot to automate responses and improve support availability.',
      tag: 'Support Operations',
      solution: 'Website Chatbot → Knowledge Base → Automated Responses → Human Support Connection',
    },
    {
      id: 'lead-generation',
      title: 'We Want To Generate And Qualify More Leads',
      desc: 'Companies focused on growth can use AI chatbot development solutions to engage website visitors and collect valuable customer information.',
      tag: 'Lead Qualification',
      solution: 'AI Chatbot → Lead Qualification → CRM Integration → Sales Follow-Up',
    },
    {
      id: 'custom-assistant',
      title: 'We Need A Custom Business Assistant',
      desc: 'Organisations with unique workflows can use custom AI chatbot development services to create an assistant trained around their products, services, and internal information.',
      tag: 'Custom Assistant',
      solution: 'Business Data → AI Training → Custom Chatbot → Workflow Automation',
    },
    {
      id: 'enterprise-automation',
      title: 'We Require Enterprise-Level Communication Automation',
      desc: 'Large organisations can use enterprise AI chatbot development services to manage customer interactions across multiple platforms.',
      tag: 'Enterprise Automation',
      solution: 'AI Platform → Business Systems Integration → Analytics → Continuous Improvement',
    },
  ],

  // Section 4: Implementation Process
  processEyebrow: 'OUR AI CHATBOT DEVELOPMENT PROCESS',
  processTitle: 'From Planning To A Fully Functional AI Assistant',
  processDesc: 'Our development approach creates reliable chatbot systems that match your business requirements and customer expectations.',
  processSteps: [
    {
      step: '01',
      title: 'Business Requirement Analysis',
      desc: 'We review your customer journey, communication challenges, business goals, and automation requirements before creating the chatbot strategy.',
    },
    {
      step: '02',
      title: 'Conversation Design And Planning',
      desc: 'We create chatbot conversations, user flows, response structures, and interaction paths that provide natural customer experiences.',
    },
    {
      step: '03',
      title: 'AI Development And System Integration',
      desc: 'We develop the chatbot, connect required platforms, integrate business data, and configure automation workflows.',
    },
    {
      step: '04',
      title: 'Testing Customer Interactions',
      desc: 'We test chatbot responses, user journeys, integrations, and performance to identify improvements before deployment.',
    },
    {
      step: '05',
      title: 'Deployment And Ongoing Enhancement',
      desc: 'We launch the chatbot system and provide optimisation support to improve accuracy, performance, and customer engagement.',
    },
  ],

  // Section 5: Work With Our AI Chatbot Development Experts (4 Models)
  modelsEyebrow: 'WORK WITH OUR AI CHATBOT DEVELOPMENT EXPERTS',
  modelsTitle: 'Flexible Chatbot Solutions For Different Business Requirements',
  modelsDesc: 'Businesses require different levels of automation support. Our AI chatbot development company provides solutions based on your goals, industry requirements, and technology needs.',
  models: [
    {
      number: '1',
      title: 'Complete AI Chatbot Development Project',
      desc: 'We create complete chatbot systems with strategy, design, development, integrations, testing, and deployment support.',
      features: [
        'End-to-End Chatbot Strategy & Architecture',
        'Custom Conversational UI & Widget Design',
        'Knowledge Base & LLM System Prompting',
        'Platform Testing & Complete Handover',
      ],
      ctaText: 'Start Chatbot Project',
    },
    {
      number: '2',
      title: 'Customer Support Automation Solution',
      desc: 'We build AI chatbots for customer service systems that reduce response times and improve customer communication.',
      features: [
        'Automated FAQ & Tier-1 Ticket Resolution',
        'Multi-Channel Web & Helpdesk Integration',
        'Seamless Human Agent Hand-off Protocols',
        '24/7 Availability with Sub-Second Responses',
      ],
      ctaText: 'Build Support Chatbot',
      isPopular: true,
    },
    {
      number: '3',
      title: 'Business AI Assistant Development',
      desc: 'We develop AI chatbot solutions that support internal operations, customer interactions, sales activities, and business workflows.',
      features: [
        'Internal Wiki & CRM Intelligence Connector',
        'Automated Lead Capture & Meeting Booking',
        'Custom Business Workflow Automations',
        'Role-Based Access & Data Privacy Controls',
      ],
      ctaText: 'Build Business Assistant',
    },
    {
      number: '4',
      title: 'Long-Term Chatbot Improvement Services',
      desc: 'We optimise existing chatbot systems through updates, performance improvements, new integrations, and enhanced conversational capabilities.',
      features: [
        'Continuous Conversation & Sentiment Audits',
        'Prompt Tuning & Knowledge Base Updates',
        'New Channel & API Integrations',
        'Dedicated AI Performance Engineering',
      ],
      ctaText: 'Get Chatbot Optimization',
    },
  ],

  // Section 6: Tools and Integrations
  spectrumEyebrow: 'AI CHATBOT TECHNOLOGY ECOSYSTEM',
  spectrumTitle: 'Chatbots Connected With Your Existing Business Platforms',
  spectrumDesc: 'AI chatbots become more effective when they work alongside the tools your business already uses.',
  integrations: [
    { name: 'OpenAI GPT-4o & Claude 3.5', icon: 'Bot', category: 'Foundation Models', desc: 'High-speed reasoning and natural language conversational intelligence.' },
    { name: 'WhatsApp Business API', icon: 'Smartphone', category: 'Messaging Platforms', desc: 'Engage billions of global customers on WhatsApp with verified business profile interactions.' },
    { name: 'HubSpot & Salesforce CRM', icon: 'Workflow', category: 'CRM Systems', desc: 'Real-time contact enrichment, deal creation, and conversation history logging.' },
    { name: 'Pinecone & Qdrant Vector DB', icon: 'Database', category: 'Knowledge & Vector Search', desc: 'Ultra-low latency semantic document search for accurate RAG knowledge retrieval.' },
    { name: 'Zendesk & Freshdesk', icon: 'MessageSquare', category: 'Helpdesk & Support', desc: 'Automatic ticket creation, status queries, and smooth escalation to human reps.' },
    { name: 'Shopify & WooCommerce', icon: 'CreditCard', category: 'E-Commerce Platforms', desc: 'Live product search, sizing assistant, cart recovery, and tracking updates.' },
    { name: 'Google Calendar & Calendly', icon: 'Calendar', category: 'Scheduling & Booking', desc: 'Real-time availability lookup and instant in-chat meeting confirmation.' },
    { name: 'Custom APIs & Webhooks', icon: 'Code2', category: 'Custom Business Systems', desc: 'Connect private databases, ERP software, and authentication services effortlessly.' },
  ],

  // Section 7: Project Experience
  outcomesEyebrow: 'PROJECT EXPERIENCE',
  outcomesTitle: 'AI Communication Systems Designed For Real Business Challenges',
  outcomesDesc: 'Our chatbot projects focus on creating practical solutions that improve customer service, lead management, and business communication.',
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
        'Zero hallucination accuracy with private business data',
      ],
      isCaseStudy: true,
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
        'Context-preserved live agent escalation',
      ],
      isCaseStudy: false,
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
        'Higher conversion rate on high-intent pages',
      ],
      isCaseStudy: false,
    },
  ],

  // Section 8: FAQs
  faqs: [
    {
      q: 'What is an AI chatbot and how does it help my business?',
      a: 'An AI chatbot uses natural language processing and modern machine learning models to understand customer questions, provide instant answers, collect information, qualify leads, and automate routine support tasks 24/7 across your website, apps, and messaging channels.',
    },
    {
      q: 'How does the chatbot connect with our existing CRM and tools?',
      a: 'We connect chatbots via REST APIs and secure webhooks to your existing systems such as HubSpot, Salesforce, Zendesk, WhatsApp Business, Slack, Google Calendar, and custom databases, ensuring real-time bi-directional data flow.',
    },
    {
      q: 'Can the chatbot transfer conversations to a human agent?',
      a: 'Yes. When an inquiry requires human intervention or reaches complex criteria, the chatbot seamlessly transfers the conversation along with full context, transcripts, and customer details to your live support team or helpdesk.',
    },
    {
      q: 'Can we manage and update chatbot content from our Admin Dashboard?',
      a: 'Yes! All chatbot copy, services, processes, packages, integrations, and FAQs can be viewed and updated directly from the Cubixsol Admin Dashboard, saving straight into MongoDB.',
    },
    {
      q: 'How long does an AI chatbot project typically take?',
      a: 'A standard custom chatbot implementation typically takes 1 to 2 weeks for planning, knowledge base connection, testing, and deployment. Enterprise multi-channel projects with deep custom integrations typically take 2 to 3 weeks.',
    },
  ],

  // Section 9: CTA Banner
  ctaEyebrow: 'START YOUR AI CHATBOT PROJECT',
  ctaTitle: 'Ready To Build An Intelligent Customer Communication System?',
  ctaDesc: 'Get expert guidance for your next AI chatbot development project. Share your requirements and discover how automation can improve your customer experience.',
  ctaButtonText: 'Get Your Free Consultation',

  // SEO Fields
  seo: {
    metaTitle: 'AI Chatbot Development Services for Smarter Customer Experiences | Cubixsol',
    metaDescription: 'Custom AI chatbot development services. Intelligent chatbot solutions to automate conversations, improve customer support, qualify leads, and connect enterprise systems.',
    keywords: 'AI chatbot development, customer service AI chatbot, website AI chatbot, intelligent conversational agents, AI chatbot company, Cubixsol',
  },
};

export default function AiChatbots() {
  const { openModal } = useEstimateModal();
  const [data, setData] = useState(DEFAULT_DATA);
  const [selectedFix, setSelectedFix] = useState('customer-support');
  const [openFaq, setOpenFaq] = useState(0);

  // SEO Metadata Hook
  useSEO(data?.seo, {
    title: data.title ? `${data.title} | Cubixsol` : 'AI Chatbot Development Services | Cubixsol',
    description: data.heroDesc || data.desc || 'Custom AI chatbot development services. Intelligent chatbot solutions to automate conversations, improve customer support, qualify leads, and connect enterprise systems.',
    keywords: data.seo?.keywords || 'AI chatbot development, customer service AI chatbot, website AI chatbot, intelligent conversational agents, AI chatbot company, Cubixsol',
    canonicalUrl: 'https://cubixsol.com/ai-chatbots',
  });

  useEffect(() => {
    // Dynamic fetch from MongoDB (Service or PageContent)
    apiFetch('services/ai-chatbots')
      .then((res) => {
        if (res && (res.title || res.heroTitle)) {
          // Normalize mapped fields from MongoDB Service schema if modified in Admin Dashboard
          const mappedProblemCards = res.problemCards || (res.whyChooseItems && res.whyChooseItems.length > 0
            ? res.whyChooseItems.map((item, idx) => ({
                icon: ['Clock', 'Bot', 'Target', 'Users'][idx % 4],
                title: item.title,
                desc: item.desc
              }))
            : null);

          const mappedCapabilitiesCards = res.capabilitiesCards || (res.subServicesItems && res.subServicesItems.length > 0
            ? res.subServicesItems.map((item, idx) => ({
                image: DEFAULT_DATA.capabilitiesCards[idx % DEFAULT_DATA.capabilitiesCards.length]?.image,
                tag: ['CUSTOMER SERVICE', 'WEBSITE ENGAGEMENT', 'CUSTOM ARCHITECTURE', 'MOBILE & APP', 'ENTERPRISE SCALE', 'INTEGRATIONS & OPS'][idx % 6],
                title: item.title,
                desc: item.desc,
                pills: DEFAULT_DATA.capabilitiesCards[idx % DEFAULT_DATA.capabilitiesCards.length]?.pills || ['AI Powered', 'Integrated', 'Automated']
              }))
            : null);

          const mappedProcessSteps = res.processSteps || (res.serviceProcessSteps && res.serviceProcessSteps.length > 0
            ? res.serviceProcessSteps.map((step) => ({
                step: step.stepNumber || step.step || '01',
                title: step.title,
                desc: step.desc
              }))
            : null);

          const mappedIntegrations = res.integrations || (res.supportedPlatforms && res.supportedPlatforms.length > 0
            ? res.supportedPlatforms.map((p) => ({
                name: p.name,
                category: p.category || 'Integration',
                icon: p.icon || 'Bot',
                desc: `Seamless real-time integration with ${p.name}.`
              }))
            : null);

          setData((prev) => ({
            ...prev,
            ...res,
            seo: res.seo || prev.seo,
            heroTitle: res.heroTitle || res.title || prev.heroTitle,

            heroDesc: res.heroDesc || res.longDesc || res.desc || prev.heroDesc,
            heroPrimaryBtnText: res.heroPrimaryBtnText || res.ctaPrimaryText || prev.heroPrimaryBtnText,
            heroSecondaryBtnText: res.heroSecondaryBtnText || res.ctaSecondaryText || prev.heroSecondaryBtnText,
            problemEyebrow: res.problemEyebrow || res.whyChooseEyebrow || prev.problemEyebrow,
            problemTitle: res.problemTitle || res.whyChooseTitle || prev.problemTitle,
            problemDesc: res.problemDesc || res.whyChooseIntro || prev.problemDesc,
            problemCards: mappedProblemCards || prev.problemCards,
            capabilitiesEyebrow: res.capabilitiesEyebrow || prev.capabilitiesEyebrow,
            capabilitiesTitle: res.capabilitiesTitle || res.subServicesTitle || prev.capabilitiesTitle,
            capabilitiesDesc: res.capabilitiesDesc || res.subServicesIntro || prev.capabilitiesDesc,
            capabilitiesCards: mappedCapabilitiesCards || prev.capabilitiesCards,
            fixFirstEyebrow: res.fixFirstEyebrow || prev.fixFirstEyebrow,
            fixFirstTitle: res.fixFirstTitle || res.businessTypesTitle || prev.fixFirstTitle,
            fixFirstDesc: res.fixFirstDesc || res.businessTypesIntro || prev.fixFirstDesc,
            fixFirstItems: res.fixFirstItems || prev.fixFirstItems,
            processEyebrow: res.processEyebrow || prev.processEyebrow,
            processTitle: res.processTitle || res.serviceProcessTitle || prev.processTitle,
            processDesc: res.processDesc || res.serviceProcessIntro || prev.processDesc,
            processSteps: mappedProcessSteps || prev.processSteps,
            modelsEyebrow: res.modelsEyebrow || prev.modelsEyebrow,
            modelsTitle: res.modelsTitle || res.pricingSectionTitle || prev.modelsTitle,
            modelsDesc: res.modelsDesc || res.pricingSectionText || prev.modelsDesc,
            models: res.models || prev.models,
            spectrumEyebrow: res.spectrumEyebrow || prev.spectrumEyebrow,
            spectrumTitle: res.spectrumTitle || res.techTitle || prev.spectrumTitle,
            spectrumDesc: res.spectrumDesc || res.techDesc || prev.spectrumDesc,
            integrations: mappedIntegrations || prev.integrations,
            outcomesEyebrow: res.outcomesEyebrow || prev.outcomesEyebrow,
            outcomesTitle: res.outcomesTitle || prev.outcomesTitle,
            outcomesDesc: res.outcomesDesc || prev.outcomesDesc,
            outcomeCards: res.outcomeCards || prev.outcomeCards,
            faqs: (res.faqs && res.faqs.length > 0) ? res.faqs : prev.faqs,
            ctaEyebrow: res.ctaEyebrow || res.ctaBannerEyebrow || prev.ctaEyebrow,
            ctaTitle: res.ctaTitle || res.ctaBannerTitle || prev.ctaTitle,
            ctaDesc: res.ctaDesc || res.ctaBannerDesc || prev.ctaDesc,
            ctaButtonText: res.ctaButtonText || res.ctaBannerButtonText || prev.ctaButtonText,
          }));
        }
      })
      .catch(() => {
        // Fallback to pages/ai-chatbots
        apiFetch('pages/ai-chatbots')
          .then((pageRes) => {
            if (pageRes && pageRes.content) {
              setData((prev) => ({ ...prev, ...pageRes.content }));
            }
          })
          .catch(() => {});
      });
  }, []);

  return (
    <div className="min-h-screen bg-white text-ink selection:bg-[#00a4d8] selection:text-white relative">
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-gradient-to-b from-sky-50/70 via-indigo-50/25 to-white border-b border-sky-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <Reveal direction="down" duration={0.6}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00a4d8]/10 border border-[#00a4d8]/20 text-[#00a4d8] text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
                  <Bot className="w-3.5 h-3.5 text-[#00a4d8] fill-[#00a4d8]/20 animate-pulse" />
                  <span>{data.heroEyebrow}</span>
                </div>
              </Reveal>

              <Reveal delay={0.1} duration={0.65}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink leading-[1.12] mb-6">
                  {formatInline(data.heroTitle)}
                </h1>
              </Reveal>

              <Reveal delay={0.2} duration={0.65}>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl font-normal">
                  {data.heroDesc}
                </p>
              </Reveal>

              {/* Action Buttons */}
              <Reveal delay={0.3} duration={0.65}>
                <div className="flex flex-wrap items-center gap-4 mb-10">
                  <motion.button
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openModal({ service: 'AI Chatbot Development' })}
                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#00a4d8] via-blue-600 to-[#5d53a3] hover:from-[#0092c2] hover:to-[#4a4285] shadow-lg shadow-[#00a4d8]/25 hover:shadow-[#00a4d8]/35 transition-all duration-300 text-base cursor-pointer"
                  >
                    <span>{data.heroPrimaryBtnText}</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>

                  <motion.a
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    href="#case-studies"
                    className="inline-flex items-center gap-2 px-6 py-4 rounded-xl font-semibold text-gray-700 bg-white border border-gray-200 hover:border-[#00a4d8]/40 hover:bg-sky-50/40 hover:text-[#00a4d8] shadow-sm transition-all duration-200 text-base"
                  >
                    <span>{data.heroSecondaryBtnText}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </motion.a>
                </div>
              </Reveal>

              {/* Trust Badges */}
              <Reveal delay={0.4} duration={0.65}>
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-6 border-t border-sky-100/80">
                  {data.heroBadges?.map((badge, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700">
                      <span className="w-2 h-2 rounded-full bg-[#00a4d8] shrink-0" />
                      <span>{badge}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right Hero Visual / Interactive Mock Chatbot Hub */}
            <div className="lg:col-span-5 relative">
              <Reveal delay={0.2} direction="left" duration={0.7} scale>
                <div className="relative rounded-3xl p-6 bg-gradient-to-br from-[#00a4d8]/10 via-indigo-50/40 to-sky-50/40 border border-[#00a4d8]/20 shadow-2xl shadow-[#00a4d8]/10 backdrop-blur-sm">
                  {/* Chatbot Interface Preview Box */}
                  <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-inner flex flex-col h-[380px]">
                    {/* Header */}
                    <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00a4d8] to-[#5d53a3] flex items-center justify-center text-white text-xs font-bold shadow-md">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white leading-tight">Cubix AI Chatbot</p>
                          <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online • &lt;1s Speed
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] bg-slate-800 text-slate-300 font-semibold px-2 py-0.5 rounded border border-slate-700">
                        Live Assistant
                      </span>
                    </div>

                    {/* Messages Flow */}
                    <div className="p-4 flex-1 space-y-3 overflow-hidden flex flex-col justify-end text-xs">
                      {/* Bot Message */}
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#00a4d8]/20 border border-[#00a4d8]/40 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
                          <Bot className="w-3.5 h-3.5" />
                        </div>
                        <div className="bg-slate-800 text-slate-200 p-2.5 rounded-2xl rounded-tl-sm max-w-[85%] border border-slate-700/60 leading-relaxed shadow-sm">
                          Hello! 👋 Welcome to Cubixsol. How can we help automate your customer conversations today?
                        </div>
                      </div>

                      {/* User Message */}
                      <div className="flex items-start justify-end gap-2">
                        <div className="bg-gradient-to-r from-[#00a4d8] to-blue-600 text-white p-2.5 rounded-2xl rounded-tr-sm max-w-[80%] leading-relaxed shadow-md font-medium">
                          Can the chatbot answer FAQs, capture leads, and connect with our CRM?
                        </div>
                      </div>

                      {/* Bot Response */}
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#00a4d8]/20 border border-[#00a4d8]/40 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
                          <Bot className="w-3.5 h-3.5" />
                        </div>
                        <div className="bg-slate-800 text-slate-200 p-2.5 rounded-2xl rounded-tl-sm max-w-[85%] border border-slate-700/60 leading-relaxed shadow-sm">
                          Absolutely! It delivers 24/7 instant answers, qualifies leads, and syncs directly with HubSpot, Salesforce & WhatsApp. 🚀
                        </div>
                      </div>
                    </div>

                    {/* Chat Input Bar */}
                    <div className="p-2.5 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
                      <div className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-slate-400 text-xs flex items-center justify-between">
                        <span>Type your message here...</span>
                        <Send className="w-3.5 h-3.5 text-[#00a4d8]" />
                      </div>
                    </div>
                  </div>

                  {/* Floating Micro-Badges */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                    className="absolute -top-4 -right-4 bg-white rounded-2xl p-3 shadow-xl border border-sky-100 hidden sm:flex items-center gap-2 text-xs font-bold text-ink"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-extrabold text-sm">
                      100+
                    </div>
                    <div>
                      <p className="leading-tight">Digital Projects</p>
                      <p className="text-[10px] text-gray-400 font-normal">Completed Worldwide</p>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.5 }}
                    className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-3 shadow-xl border border-sky-100 hidden sm:flex items-center gap-2 text-xs font-bold text-ink"
                  >
                    <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#00a4d8] flex items-center justify-center font-extrabold">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="leading-tight">Instant Support</p>
                      <p className="text-[10px] text-gray-400 font-normal">24/7 Availability</p>
                    </div>
                  </motion.div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== SECTION 1: WHY BUSINESSES INVEST IN AI CHATBOT SOLUTIONS ===================== */}
      <section className="py-20 bg-gray-50/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal direction="up" duration={0.6}>
              <p className="text-xs font-bold tracking-widest uppercase text-[#00a4d8] mb-3">{data.problemEyebrow}</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ink leading-tight mb-4">
                {data.problemTitle}
              </h2>
              <p className="text-base sm:text-lg text-gray-500 leading-relaxed">
                {data.problemDesc}
              </p>
            </Reveal>
          </div>

          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.08}>
            {data.problemCards?.map((card, idx) => (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 shadow-sm hover:shadow-soft hover:border-[#00a4d8]/30 transition-all duration-300 h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#00a4d8] mb-5">
                      <DynamicIcon name={card.icon || 'Bot'} className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-ink mb-2.5 leading-snug">{card.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ===================== SECTION 2: OUR AI CHATBOT DEVELOPMENT SERVICES (6 CARDS) ===================== */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal direction="up" duration={0.6}>
              <p className="text-xs font-bold tracking-widest uppercase text-[#00a4d8] mb-3">{data.capabilitiesEyebrow}</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink leading-tight mb-4">
                {data.capabilitiesTitle}
              </h2>
              <p className="text-base sm:text-lg text-gray-500 leading-relaxed">
                {data.capabilitiesDesc}
              </p>
            </Reveal>
          </div>

          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.08}>
            {data.capabilitiesCards?.map((item, idx) => (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.01, transition: { duration: 0.25 } }}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-card hover:shadow-soft hover:border-[#00a4d8]/30 transition-all duration-300 flex flex-col h-full group"
                >
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="text-[11px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-md">
                        {item.tag}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-ink mb-2.5 group-hover:text-[#00a4d8] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500 leading-relaxed mb-6">
                        {item.desc}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-4 border-t border-gray-100 mt-auto">
                      {item.pills?.map((pill, pIdx) => (
                        <span
                          key={pIdx}
                          className="text-[11px] font-semibold text-gray-600 bg-gray-50 border border-gray-200/80 px-2 py-0.5 rounded"
                        >
                          {pill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ===================== SECTION 3: CHOOSE THE RIGHT AI CHATBOT APPROACH (INTERACTIVE SOLVER) ===================== */}
      <section className="py-20 bg-gradient-to-b from-gray-50/80 via-sky-50/30 to-gray-50/80 border-y border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Graphic & Header */}
            <div className="lg:col-span-5">
              <Reveal direction="right" duration={0.65}>
                <p className="text-xs font-bold tracking-widest uppercase text-[#00a4d8] mb-3">{data.fixFirstEyebrow}</p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-ink leading-tight mb-4">
                  {data.fixFirstTitle}
                </h2>
                <p className="text-base text-gray-500 mb-8 leading-relaxed">
                  {data.fixFirstDesc}
                </p>

                <div className="relative rounded-2xl overflow-hidden border border-sky-100 shadow-md bg-white p-3">
                  <img
                    src={data.fixFirstImage}
                    alt="AI Chatbot Solution Approach"
                    className="w-full h-64 object-cover rounded-xl"
                  />
                  <div className="p-4 bg-white">
                    <p className="text-xs font-bold text-[#00a4d8] uppercase tracking-wide">Recommended Setup Flow</p>
                    <p className="text-sm font-bold text-ink mt-0.5">
                      {data.fixFirstItems?.find((f) => f.id === selectedFix)?.solution || 'Custom Chatbot Setup'}
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right Interactive Cards */}
            <div className="lg:col-span-7 space-y-4">
              {data.fixFirstItems?.map((item, idx) => {
                const isSelected = selectedFix === item.id;
                return (
                  <Reveal key={item.id || idx} delay={idx * 0.08} duration={0.5}>
                    <motion.div
                      whileHover={{ scale: 1.01, x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setSelectedFix(item.id)}
                      className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 border ${
                        isSelected
                          ? 'bg-white border-[#00a4d8] shadow-lg ring-2 ring-[#00a4d8]/20 translate-x-1'
                          : 'bg-white/80 border-gray-200 hover:border-[#00a4d8]/30 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2.5 mb-2">
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                isSelected ? 'bg-sky-100 text-[#00a4d8]' : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {item.tag}
                            </span>
                            <h3 className={`font-bold text-base sm:text-lg ${isSelected ? 'text-[#00a4d8]' : 'text-ink'}`}>
                              {item.title}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-500 leading-relaxed mb-3">
                            {item.desc}
                          </p>
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#00a4d8]">
                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                            <span>Recommended: {item.solution}</span>
                          </div>
                        </div>

                        <div className="shrink-0 mt-1">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center border transition ${
                              isSelected ? 'bg-[#00a4d8] border-[#00a4d8] text-white' : 'border-gray-300 text-transparent'
                            }`}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== SECTION 4: OUR AI CHATBOT DEVELOPMENT PROCESS ===================== */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Dark Blueprint Banner */}
            <div className="lg:col-span-5">
              <Reveal direction="right" duration={0.65}>
                <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-slate-900 via-[#0a192f] to-[#1e1b4b] text-white shadow-2xl relative overflow-hidden border border-slate-800">
                  <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#00a4d8]/20 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="w-12 h-12 rounded-2xl bg-[#00a4d8]/20 border border-[#00a4d8]/40 flex items-center justify-center text-cyan-300 mb-6">
                    <Target className="w-6 h-6" />
                  </div>

                  <p className="text-xs font-bold uppercase tracking-widest text-cyan-300 mb-3">{data.processEyebrow}</p>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-4">
                    {data.processTitle}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-8">
                    {data.processDesc}
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openModal({ service: 'AI Chatbot Development Sprint' })}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#00a4d8] to-[#5d53a3] hover:from-[#0092c2] hover:to-[#4a4285] text-white font-bold text-sm inline-flex items-center justify-center gap-2 shadow-lg shadow-[#00a4d8]/25 transition-all duration-200 cursor-pointer"
                  >
                    <span>Start Chatbot Sprint</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </Reveal>
            </div>

            {/* Right 5 Steps Timeline */}
            <div className="lg:col-span-7 space-y-5">
              {data.processSteps?.map((step, idx) => (
                <Reveal key={idx} delay={idx * 0.08} duration={0.5}>
                  <motion.div
                    whileHover={{ x: 6, transition: { duration: 0.2 } }}
                    className="flex items-start gap-5 p-5 rounded-2xl bg-gray-50/70 border border-gray-100 hover:bg-white hover:border-[#00a4d8]/30 hover:shadow-sm transition-all duration-200"
                  >
                    <span className="shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-sky-100 to-indigo-100 text-[#5d53a3] font-extrabold flex items-center justify-center text-base border border-sky-200">
                      {step.step}
                    </span>
                    <div>
                      <h4 className="font-bold text-ink text-base sm:text-lg mb-1">{step.title}</h4>
                      <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== SECTION 5: WORK WITH OUR AI CHATBOT EXPERTS (ENGAGEMENT MODELS) ===================== */}
      <section className="py-24 bg-gradient-to-b from-white via-sky-50/25 to-white border-y border-sky-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal direction="up" duration={0.6}>
              <p className="text-xs font-bold tracking-widest uppercase text-[#00a4d8] mb-3">{data.modelsEyebrow}</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink leading-tight mb-4">
                {data.modelsTitle}
              </h2>
              <p className="text-base sm:text-lg text-gray-500 leading-relaxed">
                {data.modelsDesc}
              </p>
            </Reveal>
          </div>

          <Stagger className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.08}>
            {data.models?.map((model, idx) => (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={{ y: -8, transition: { duration: 0.25 } }}
                  className={`rounded-3xl p-6 sm:p-7 border flex flex-col justify-between h-full relative transition-all duration-300 ${
                    model.isPopular
                      ? 'bg-white border-[#00a4d8] shadow-xl ring-2 ring-[#00a4d8]/20 -translate-y-2'
                      : 'bg-white border-gray-200/90 shadow-card hover:shadow-soft hover:border-[#00a4d8]/30'
                  }`}
                >
                  {model.isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="bg-gradient-to-r from-[#00a4d8] to-[#5d53a3] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                        Popular Choice
                      </span>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 text-[#00a4d8] font-extrabold text-lg flex items-center justify-center">
                        {model.number}
                      </span>
                    </div>

                    <h3 className="text-xl font-extrabold text-ink mb-3 leading-snug">{model.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed mb-6">{model.desc}</p>

                    <div className="pt-5 border-t border-gray-100 space-y-2.5 mb-6">
                      {model.features?.map((f, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-[#00a4d8] shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openModal({ service: `AI Chatbot: ${model.title}` })}
                    className={`w-full py-3 rounded-xl font-bold text-xs transition-all duration-200 cursor-pointer ${
                      model.isPopular
                        ? 'bg-gradient-to-r from-[#00a4d8] to-[#5d53a3] text-white hover:from-[#0092c2] hover:to-[#4a4285] shadow-md shadow-[#00a4d8]/25'
                        : 'bg-gray-100 text-ink hover:bg-sky-50 hover:text-[#00a4d8]'
                    }`}
                  >
                    {model.ctaText || 'Get Started'}
                  </motion.button>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ===================== SECTION 6: AI CHATBOT TECHNOLOGY ECOSYSTEM ===================== */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal direction="up" duration={0.6}>
              <p className="text-xs font-bold tracking-widest uppercase text-[#00a4d8] mb-3">{data.spectrumEyebrow}</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink leading-tight mb-4">
                {data.spectrumTitle}
              </h2>
              <p className="text-base sm:text-lg text-gray-500 leading-relaxed">
                {data.spectrumDesc}
              </p>
            </Reveal>
          </div>

          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.06}>
            {data.integrations?.map((item, idx) => (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
                  className="bg-gradient-to-br from-white via-sky-50/20 to-white rounded-2xl p-6 border border-gray-200/80 shadow-sm hover:shadow-md hover:border-[#00a4d8]/40 transition-all duration-300 flex flex-col justify-between h-full group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#00a4d8] group-hover:bg-gradient-to-r group-hover:from-[#00a4d8] group-hover:to-[#5d53a3] group-hover:text-white transition-colors duration-300">
                        <DynamicIcon name={item.icon || 'Bot'} className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#5d53a3] bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg text-ink mb-2 group-hover:text-[#00a4d8] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-xs font-semibold text-[#00a4d8]">
                    <Check className="w-3.5 h-3.5" />
                    <span>Two-Way Platform Connection</span>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ===================== SECTION 7: PROJECT EXPERIENCE & CASE STUDY ===================== */}
      <section id="case-studies" className="py-24 bg-gray-50/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal direction="up" duration={0.6}>
              <p className="text-xs font-bold tracking-widest uppercase text-[#00a4d8] mb-3">{data.outcomesEyebrow}</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink leading-tight mb-4">
                {data.outcomesTitle}
              </h2>
              <p className="text-base sm:text-lg text-gray-500 leading-relaxed">
                {data.outcomesDesc}
              </p>
            </Reveal>
          </div>

          <Stagger className="grid md:grid-cols-3 gap-8" staggerDelay={0.08}>
            {data.outcomeCards?.map((card, idx) => (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={{ y: -8, transition: { duration: 0.25 } }}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-card hover:shadow-soft hover:border-[#00a4d8]/30 transition-all duration-300 flex flex-col h-full"
                >
                  <div className="h-48 relative overflow-hidden bg-slate-900">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-[#00a4d8] to-[#5d53a3] text-white text-xs font-bold px-3 py-1 rounded-lg shadow-sm">
                      {card.client}
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="mb-4 flex items-baseline gap-2">
                        <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#00a4d8] to-[#5d53a3]">{card.metric}</span>
                        <p className="text-xs font-semibold text-gray-500">{card.metricLabel}</p>
                      </div>

                      <h3 className="font-bold text-lg text-ink mb-2.5 leading-snug">{card.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed mb-6">{card.desc}</p>

                      <div className="space-y-2 pt-4 border-t border-gray-100">
                        {card.results?.map((res, rIdx) => (
                          <div key={rIdx} className="flex items-center gap-2 text-xs font-medium text-gray-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00a4d8] shrink-0" />
                            <span>{res}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4">
                      <button
                        onClick={() => openModal({ service: `Case Study / Project: ${card.client}` })}
                        className="w-full py-2.5 rounded-xl border border-[#00a4d8]/30 text-[#00a4d8] font-bold text-xs hover:bg-sky-50 hover:border-[#00a4d8] transition cursor-pointer"
                      >
                        {card.isCaseStudy ? '(Case Study)' : 'Request Project Breakdown'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ===================== FAQS SECTION ===================== */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <Reveal direction="up" duration={0.6}>
              <p className="text-xs font-bold tracking-widest uppercase text-[#00a4d8] mb-3">FAQ</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ink">Frequently Asked Questions</h2>
            </Reveal>
          </div>

          <div className="space-y-4">
            {data.faqs?.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <Reveal key={idx} delay={idx * 0.05} duration={0.45}>
                  <div className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200">
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      className="w-full px-6 py-5 text-left font-bold text-ink flex items-center justify-between gap-4 hover:bg-gray-50/80 transition cursor-pointer"
                    >
                      <span className="text-base sm:text-lg">{faq.q}</span>
                      <ChevronRight
                        className={`w-5 h-5 text-[#00a4d8] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-90' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="px-6 pb-6 text-sm sm:text-base text-gray-500 leading-relaxed border-t border-gray-100 pt-4 bg-gray-50/40"
                        >
                          {faq.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== SECTION 8: FINAL CTA BANNER ===================== */}
      <CtaBanner
        eyebrow={data.ctaEyebrow || "START YOUR AI CHATBOT PROJECT"}
        title={data.ctaTitle || "Ready To Build An Intelligent Customer Communication System?"}
        desc={data.ctaDesc || "Get expert guidance for your next AI chatbot development project. Share your requirements and discover how automation can improve your customer experience."}
        primaryButtonText={data.ctaButtonText || "Get Your Free Consultation"}
        primaryButtonAction={() => openModal({ service: 'AI Chatbot Consultation' })}
        secondaryButtonText="Explore Our Work"
        secondaryButtonLink="#case-studies"
      />
    </div>
  );
}
