import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Zap, Clock, Users, ArrowRight, CheckCircle2, ChevronRight,
  TrendingUp, Sparkles, ShieldCheck, Database, Calendar,
  MessageSquare, Mail, Layers, PhoneCall, ExternalLink,
  Bot, RefreshCw, BarChart3, HelpCircle, Star, Sliders,
  Workflow, Cpu, Settings, Smartphone, Award, Target, Rocket,
  Globe, CreditCard, Share2, Terminal, Code2, Check, PieChart,
  GitBranch, Server, BrainCircuit, FileText
} from 'lucide-react';
import { useEstimateModal } from '../context/EstimateModalContext';
import { apiFetch } from '../utils/api';
import { formatInline } from '../utils/formatText';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';
import CtaBanner from '../components/CtaBanner';
import DynamicIcon from '../components/DynamicIcon';
import { useSEO } from '../utils/seo';

// Default static data matching the exact high-converting AI Workflows design
const DEFAULT_DATA = {
  slug: 'ai-workflows',
  title: 'AI Workflow Automation Services to Transform Business Operations With Intelligent Systems',
  heroEyebrow: 'AI WORKFLOW AUTOMATION SERVICES',
  heroTitle: 'AI Workflow Automation Services to Transform Business Operations With Intelligent Systems',
  heroDesc: 'Our AI workflow automation services help organisations automate complex processes through intelligent workflows, AI agents, and advanced automation solutions. We provide smarter systems to manage repetitive tasks, improve efficiency, and create connected workflows.',
  heroPrimaryBtnText: 'Get Started With AI Automation',
  heroSecondaryBtnText: 'Schedule A Consultation',
  heroBadges: [
    'Intelligent Workflows & AI Agents',
    'AI Marketing & Process Automation',
    'Agentic Workflow Implementation',
    'AI Tools Integration & Monitoring'
  ],
  heroImage: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&h=800&q=80',

  // Section 1: Why Your Business Needs AI-Powered Workflows
  problemEyebrow: 'WHY YOUR BUSINESS NEEDS AI-POWERED WORKFLOWS',
  problemTitle: 'Manual Business Processes Create Gaps That Intelligent Automation Can Solve',
  problemDesc: 'Our AI business process automation solutions help organisations replace inefficient workflows with intelligent systems. Businesses can use AI workflows to automate tasks, connect platforms, analyse information, and create smoother operations across departments.',
  problemCards: [
    {
      icon: 'Workflow',
      title: 'Automate Repetitive Operations',
      desc: 'AI workflows allow businesses to automate routine processes such as data management, task assignments, notifications, and information processing. Intelligent systems reduce manual workload and create consistent processes across teams.',
    },
    {
      icon: 'MessageSquare',
      title: 'Create Faster Responses',
      desc: 'AI automation workflow solutions improve response times through automated messages, notifications, customer interactions, and internal alerts. Businesses can create connected communication systems that respond quickly to changing requirements.',
    },
    {
      icon: 'Cpu',
      title: 'Build Smarter Operations',
      desc: 'AI agent workflows allow businesses to create intelligent systems that analyse information and complete multi-step tasks. AI agents support customer operations, research activities, workflow execution, and internal processes.',
    },
    {
      icon: 'BarChart3',
      title: 'Improve Business Decisions',
      desc: 'Advanced AI workflow automation tools collect operational insights from connected systems. Businesses can analyse workflow performance, monitor results, and identify opportunities to improve processes.',
    },
  ],

  // Section 2: Our AI Workflow Automation Solutions (6 Cards)
  capabilitiesEyebrow: 'OUR AI WORKFLOW AUTOMATION SOLUTIONS',
  capabilitiesTitle: 'Customised AI Automation Systems Built Around Your Business Processes',
  capabilitiesDesc: 'Every organisation follows different workflows, tools, and operational requirements. Our AI workflow automation services create customised systems that match your business structure and objectives. We combine AI technologies, automation platforms, and integrations to build efficient digital processes.',
  capabilitiesCards: [
    {
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'AI AUTOMATION STRATEGY',
      title: 'AI Workflow Strategy And Process Configuration',
      desc: 'Our experts analyse existing business operations and identify opportunities for AI for business automation. We create automation roadmaps that define suitable workflows, technologies, and implementation approaches. The strategy phase includes process analysis, workflow planning, automation opportunities, and technical recommendations for building effective AI systems.',
      pills: ['Process Analysis', 'Automation Roadmaps', 'Technical Recommendations'],
    },
    {
      image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'AI AGENT SOLUTIONS',
      title: 'AI Agent Development For Business Operations',
      desc: 'Our AI agents for business process automation create automated solutions that manage workflows, process information, and perform actions based on business rules. We develop AI agent workflows that support customer service, internal operations, data analysis, and business process management.',
      pills: ['Customer Service Agents', 'Internal Operations', 'Data Analysis Tasks'],
    },
    {
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'MARKETING AUTOMATION',
      title: 'AI Marketing Workflow Automation Setup',
      desc: 'Our AI marketing workflows automate lead management, customer segmentation, campaign actions, and personalised communication. We connect marketing platforms with intelligent automation systems to create organised and effective customer engagement processes.',
      pills: ['Lead Management', 'Customer Segmentation', 'Personalised Outreach'],
    },
    {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'AGENTIC AUTOMATION',
      title: 'Advanced Agentic Workflow Implementation',
      desc: 'Our AI agentic workflows combine AI capabilities with automation logic to create intelligent processes. We develop agentic workflows in AI that support autonomous task execution, smart decision-making, and advanced business operations.',
      pills: ['Autonomous Execution', 'Smart Decision-Making', 'Advanced Operations'],
    },
    {
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'SYSTEM INTEGRATIONS',
      title: 'AI Tools Integration And System Connectivity',
      desc: 'Businesses use different platforms to manage daily operations. Our AI workflow automation tools connect CRMs, databases, communication platforms, APIs, and third-party applications. Integrated systems create smooth data exchange and allow businesses to manage operations through connected automation environments.',
      pills: ['CRM & DB Connectors', 'API Integration', 'Data Exchange'],
    },
    {
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'PERFORMANCE INSIGHTS',
      title: 'AI Automation Monitoring And Performance Reporting',
      desc: 'Automation performance requires regular analysis and optimisation. Our systems track workflow activities, measure results, and provide insights into operational performance. Businesses can evaluate their workflow automation AI systems and improve processes through data-based optimisation.',
      pills: ['Activity Tracking', 'Operational Metrics', 'Continuous Optimisation'],
    },
  ],

  // Section 3: Find The Right AI Automation Approach For Your Business
  fixFirstEyebrow: 'FIND THE RIGHT AI AUTOMATION APPROACH FOR YOUR BUSINESS',
  fixFirstTitle: 'Which AI Workflow Solution Matches Your Current Business Challenge?',
  fixFirstDesc: 'Every business faces different operational challenges that require the right automation approach. Our AI workflow automation services focus on identifying business requirements and creating solutions that match existing processes, technology systems, and growth objectives.',
  fixFirstImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&h=600&q=80',
  fixFirstItems: [
    {
      id: 'reduce-manual-tasks',
      title: 'We Need To Reduce Manual Business Tasks',
      desc: 'Businesses that manage repetitive tasks manually often experience slower operations and reduced productivity. Our AI automation for business solutions automates routine activities such as data processing, task management, notifications, and information handling. Intelligent workflows allow teams to spend more time on strategic activities while automated systems manage repetitive operations consistently.',
      tag: 'Manual Task Reduction',
      solution: 'AI Workflow Analysis → Process Automation → Intelligent Task Execution',
    },
    {
      id: 'customer-marketing-ops',
      title: 'We Need Smarter Customer And Marketing Operations',
      desc: 'Our AI marketing workflows automate customer journeys through intelligent segmentation, personalised communication, and automated follow-up processes. Businesses can connect their marketing platforms with AI systems to create organised customer experiences and improve operational efficiency.',
      tag: 'Marketing & Customer Ops',
      solution: 'AI Marketing Workflows → Customer Automation → Performance Tracking',
    },
    {
      id: 'existing-setup-improvement',
      title: 'Our Existing AI Automation Setup Needs Improvement',
      desc: 'We review current workflows, identify limitations, and upgrade systems with advanced automation capabilities. Our workflow automation services include workflow analysis, AI integration, process improvements, and technical optimisation.',
      tag: 'Workflow Upgrade',
      solution: 'Workflow Audit → Automation Review → AI System Optimisation',
    },
    {
      id: 'scalable-ai-systems',
      title: 'We Need Scalable AI Systems For Our Team',
      desc: 'Our enterprise AI workflow automation solutions create scalable frameworks that connect teams, applications, and business processes. We build advanced automation environments using AI agent workflows and intelligent systems that support long-term business expansion.',
      tag: 'Enterprise Scale',
      solution: 'AI Strategy → Agentic Workflows → Enterprise Automation Framework',
    },
  ],

  // Section 4: Our AI Automation Implementation Process
  processEyebrow: 'OUR AI AUTOMATION IMPLEMENTATION PROCESS',
  processTitle: 'From Business Planning To Complete AI Workflow Deployment',
  processDesc: 'Our implementation process creates reliable AI workflows that connect business goals with intelligent automation. Our team evaluates existing operations, designs automation strategies, develops AI solutions, integrates systems, and reviews performance before deployment.',
  processSteps: [
    {
      step: '01',
      title: 'Business Process Analysis',
      desc: 'The first stage focuses on understanding business operations, existing workflows, and automation opportunities. Our team studies current processes, identifies repetitive activities, and defines areas where AI business process automation can create improvements.',
    },
    {
      step: '02',
      title: 'AI System Structure And Technical Setup',
      desc: 'Our experts configure AI platforms, connect business applications, and prepare the required infrastructure. The setup process includes selecting suitable AI workflow automation tools, creating integrations, and establishing reliable data connections.',
    },
    {
      step: '03',
      title: 'Workflow Development And AI Agent Configuration',
      desc: 'Our team develops intelligent workflows that automate business processes and connect different systems. We create AI agent workflows that perform tasks, analyse information, and support automated decision processes.',
    },
    {
      step: '04',
      title: 'Testing And Performance Review',
      desc: 'Testing validates workflow accuracy, system connections, and automation performance before launch. Our team reviews AI responses, workflow actions, integrations, and reporting systems. The review process identifies improvement areas and creates dependable automation solutions.',
    },
    {
      step: '05',
      title: 'Training And Continuous AI Optimisation',
      desc: 'Successful automation requires proper team adoption and regular improvements. Our team provides workflow documentation, technical guidance, and optimisation support. Continuous updates improve the performance of your AI automation workflow systems as business requirements evolve.',
    },
  ],

  // Section 5: Ways To Work With Our AI Automation Team (3 Models)
  modelsEyebrow: 'WAYS TO WORK WITH OUR AI AUTOMATION TEAM',
  modelsTitle: 'Flexible AI Workflow Automation Services For Different Business Needs',
  modelsDesc: 'Our flexible engagement options allow businesses to choose complete implementation, optimisation support, or ongoing management services. Our AI workflow automation services adapt to different industries, operational requirements, and technology environments.',
  models: [
    {
      number: '1',
      title: 'Complete AI Workflow Automation Implementation',
      desc: 'Our complete implementation service covers strategy development, workflow creation, AI integration, testing, and deployment. We design automation systems that connect business processes with intelligent technology.',
      features: [
        'End-to-End Strategy Development',
        'Intelligent Workflow Creation',
        'AI Agent & Tool Integration',
        'Rigorous Validation & Testing',
        'Complete Handover & Documentation',
      ],
      ctaText: 'Start Full Implementation',
    },
    {
      number: '2',
      title: 'AI Automation Support For Growing Teams',
      desc: 'Our support services improve existing workflows, add new AI capabilities, and optimise business processes. Our team assists organisations that want to expand their AI automation workflow systems without replacing their existing technology environment.',
      features: [
        'Existing Workflow Enhancements',
        'New AI Capabilities Integration',
        'Business Process Optimization',
        'Platform Extension & Scaling',
        'Dedicated Team Guidance',
      ],
      ctaText: 'Get Team Support',
      isPopular: true,
    },
    {
      number: '3',
      title: 'Ongoing AI Workflow Management And Optimization',
      desc: 'Our ongoing management service monitors workflows, improves automation performance, and updates AI processes. Businesses can maximise the value of their AI workflow automation tools through regular optimisation and technical support.',
      features: [
        'Continuous Workflow Monitoring',
        'Automation Performance Tuning',
        'AI Model & Prompt Updates',
        'Technical Troubleshooting',
        'Regular Strategy Reviews',
      ],
      ctaText: 'Start Ongoing Management',
    },
  ],

  // Section 6: AI Tools And Business Integrations
  spectrumEyebrow: 'AI TOOLS AND BUSINESS INTEGRATIONS',
  spectrumTitle: 'Connect AI Workflows With The Tools Your Business Already Uses',
  spectrumDesc: 'Our AI workflows integrate seamlessly with your existing cloud tools, databases, CRMs, and APIs.',
  integrations: [
    { name: 'OpenAI & Claude LLMs', icon: 'Bot', category: 'Foundation Models', desc: 'State-of-the-art AI models for multi-step reasoning, natural language parsing, and generation.' },
    { name: 'LangChain & Agent Tools', icon: 'Workflow', category: 'Agent Frameworks', desc: 'Autonomous agent frameworks with memory, custom tools, and self-correcting logic.' },
    { name: 'Pinecone & Vector DBs', icon: 'Database', category: 'Vector Databases', desc: 'Enterprise semantic search and RAG knowledge retrieval across proprietary datasets.' },
    { name: 'Make & n8n Orchestrator', icon: 'Zap', category: 'Workflow Engines', desc: 'Multi-branch scenario orchestration connecting hundreds of business endpoints.' },
    { name: 'PostgreSQL & Snowflake', icon: 'Server', category: 'Data Warehouses', desc: 'Secure database extraction, automated SQL analysis, and structured reporting.' },
    { name: 'HubSpot & Salesforce', icon: 'Layers', category: 'CRM Platforms', desc: 'Automate contact triage, deal stage progression, and AI customer record enrichment.' },
    { name: 'Stripe & Billing Systems', icon: 'CreditCard', category: 'Financial Systems', desc: 'Automate invoice data extraction, payment reconciliation, and transaction alerts.' },
    { name: 'Custom Webhooks & REST APIs', icon: 'Code2', category: 'Custom Tech', desc: 'Custom microservice bridges, webhook receivers, and internal software connectors.' },
  ],

  // Section 7: Project Experience And Results
  outcomesEyebrow: 'PROJECT EXPERIENCE AND RESULTS',
  outcomesTitle: 'AI Workflow Projects Built For Real Business Challenges',
  outcomesDesc: 'Successful AI automation requires practical solutions based on real operational problems. Our projects focus on improving customer management, reducing manual work, and creating systems that support measurable business outcomes.',
  outcomeCards: [
    {
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=700&h=450&q=80',
      client: 'AI Workflow Automation Case Study',
      metric: '94%',
      metricLabel: 'Manual Processing Time Saved',
      title: 'Autonomous Data Processing & Intelligent Document Workflow',
      desc: 'Constructed an end-to-end AI automation workflow that parses multi-channel inquiries and unstructured documents into structured business pipelines.',
      results: [
        'Automated routine document & task handling',
        'Instant multi-channel notifications and alerts',
        'Zero manual data entry errors across systems',
      ],
      isCaseStudy: true,
    },
    {
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&h=450&q=80',
      client: '100+ CRM & AI Automation Projects Completed',
      metric: '100+',
      metricLabel: 'Projects Delivered',
      title: 'Scalable Automation Environments & Connected Workflows',
      desc: 'We build HubSpot and AI environments that support efficient operations, better customer relationships, and scalable growth.',
      results: [
        'Custom AI agent and workflow deployments',
        'Seamless CRM, database & API integrations',
        'Measurable business productivity gains',
      ],
      isCaseStudy: false,
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=700&h=450&q=80',
      client: 'Enterprise AI Marketing & Operations',
      metric: '8.5x',
      metricLabel: 'Faster Workflow Execution',
      title: 'Agentic Workflow & Marketing Automation Setup',
      desc: 'Engineered multi-agent workflows that coordinate customer segmentation, personalized communication, and real-time operational reporting.',
      results: [
        'Automated customer journey personalization',
        'Real-time operational reporting and metrics',
        'Scalable framework for business expansion',
      ],
      isCaseStudy: false,
    },
  ],

  // Section 8: Final CTA
  ctaEyebrow: "LET'S AUTOMATE YOUR BUSINESS WITH AI",
  ctaTitle: 'Ready To Build A Smarter AI Workflow Automation System?',
  ctaDesc: "Ready to move forward? Share your project details and let's build the right plan for you.",
  ctaButtonText: 'Book Your Consultation Today!',

  // FAQs
  faqs: [
    {
      q: 'What is AI workflow automation and how does it help my business?',
      a: 'AI workflow automation combines machine learning, AI agents, and workflow triggers to automate complex, multi-step business processes that previously required manual human effort. It reduces operational overhead, speeds up response times, and eliminates data entry bottlenecks.',
    },
    {
      q: 'How do AI agents differ from traditional rule-based automations?',
      a: 'While traditional automations follow static if-then rules, AI agents can understand unstructured data, reason through multi-step goals, use external tools and APIs dynamically, and handle edge cases adaptively.',
    },
    {
      q: 'Can AI workflows integrate with our existing CRMs and software?',
      a: 'Yes. We connect AI workflows directly with HubSpot, Salesforce, PostgreSQL, Snowflake, Stripe, Slack, and proprietary applications via REST APIs and webhooks.',
    },
    {
      q: 'How long does an AI workflow implementation take?',
      a: 'A standard custom AI workflow implementation sprint typically takes 2 to 3 weeks from business process analysis to live deployment and team training.',
    },
    {
      q: 'How do you ensure data privacy and system reliability?',
      a: 'We implement zero-retention enterprise API boundaries, role-based access control, automated testing guardrails, and human-in-the-loop fallback to guarantee high accuracy and complete data confidentiality.',
    },
  ],

  seo: {
    metaTitle: 'AI Workflow Automation Services | Cubixsol',
    metaDescription: 'AI workflow automation services. Transform business operations with intelligent workflows, AI agents, automated marketing, and connected system integrations.',
    keywords: 'AI workflow automation, AI agents, business process automation, agentic workflows, AI marketing automation, workflow automation tools',
  },
};

export default function AiWorkflows() {
  const { openModal } = useEstimateModal();
  const [data, setData] = useState(DEFAULT_DATA);
  const [selectedFix, setSelectedFix] = useState('reduce-manual-tasks');
  const [openFaq, setOpenFaq] = useState(0);

  // SEO Metadata
  useSEO(
    data.seo?.metaTitle || data.title,
    data.seo?.metaDescription || data.heroDesc,
    data.seo?.keywords,
    data.heroImage
  );

  useEffect(() => {
    // Dynamic fetch from MongoDB
    apiFetch('services/ai-workflows')
      .then((res) => {
        if (res && (res.title || res.heroTitle)) {
          setData((prev) => ({
            ...prev,
            ...res,
            problemCards: res.problemCards || prev.problemCards,
            capabilitiesCards: res.capabilitiesCards || prev.capabilitiesCards,
            fixFirstItems: res.fixFirstItems || prev.fixFirstItems,
            processSteps: res.processSteps || prev.processSteps,
            models: res.models || prev.models,
            integrations: res.integrations || prev.integrations,
            outcomeCards: res.outcomeCards || prev.outcomeCards,
            faqs: res.faqs || prev.faqs,
          }));
        }
      })
      .catch(() => {
        // Fallback to pageContent if available
        apiFetch('pages/ai-workflows')
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
                    onClick={() => openModal({ service: 'AI Workflow Automation' })}
                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#00a4d8] via-blue-600 to-[#5d53a3] hover:from-[#0092c2] hover:to-[#4a4285] shadow-lg shadow-[#00a4d8]/25 hover:shadow-[#00a4d8]/35 transition-all duration-300 text-base cursor-pointer"
                  >
                    <span>{data.heroPrimaryBtnText}</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>

                  <motion.a
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    href="#solutions"
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

            {/* Right Hero Visual / Isometric Platform Hub with Floating Badges */}
            <div className="lg:col-span-5 relative">
              <Reveal delay={0.2} direction="left" duration={0.7} scale>
                <div className="relative rounded-3xl p-6 bg-gradient-to-br from-[#00a4d8]/10 via-indigo-50/40 to-sky-50/40 border border-[#00a4d8]/20 shadow-2xl shadow-[#00a4d8]/10 backdrop-blur-sm">
                  <div className="relative rounded-2xl overflow-hidden shadow-inner bg-slate-900 border border-slate-800">
                    <img
                      src={data.heroImage}
                      alt="AI Workflow Automation Platform Hub"
                      className="w-full h-80 sm:h-96 object-cover opacity-90 hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6">
                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#00a4d8] to-[#5d53a3] text-white text-xs font-bold backdrop-blur-md shadow-md">
                          <BrainCircuit className="w-4 h-4" />
                          <span>Autonomous Agent Pipeline</span>
                        </div>
                        <span className="text-emerald-400 text-xs font-bold flex items-center gap-1 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          Multi-Model Active
                        </span>
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
                      94%
                    </div>
                    <div>
                      <p className="leading-tight">Manual Time Saved</p>
                      <p className="text-[10px] text-gray-400 font-normal">Intelligent IDP Extract</p>
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
                      <p className="leading-tight">&lt;30s Execution</p>
                      <p className="text-[10px] text-gray-400 font-normal">LLM Pipeline Orchestration</p>
                    </div>
                  </motion.div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== SECTION 1: WHY YOUR BUSINESS NEEDS AI-POWERED WORKFLOWS ===================== */}
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
                  className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#00a4d8]/40 transition-all duration-300 h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#00a4d8] mb-5">
                      <DynamicIcon name={card.icon} className="w-6 h-6" />
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

      {/* ===================== SECTION 2: OUR AI WORKFLOW AUTOMATION SOLUTIONS (6 CARDS) ===================== */}
      <section id="solutions" className="py-24 bg-white">
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
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-card hover:shadow-soft hover:border-[#00a4d8]/40 transition-all duration-300 flex flex-col h-full group"
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

      {/* ===================== SECTION 3: FIND THE RIGHT AI AUTOMATION APPROACH ===================== */}
      <section className="py-20 bg-gradient-to-b from-gray-50/80 via-sky-50/20 to-gray-50/80 border-y border-gray-200/60">
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
                    alt="Solve Your Bottlenecks with AI Workflows"
                    className="w-full h-64 object-cover rounded-xl"
                  />
                  <div className="p-4 bg-white">
                    <p className="text-xs font-bold text-[#00a4d8] uppercase tracking-wide">Selected Architecture</p>
                    <p className="text-sm font-bold text-ink mt-0.5">
                      {data.fixFirstItems?.find((f) => f.id === selectedFix)?.solution || 'Custom AI Agent Workflow'}
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
                  <Reveal key={item.id} delay={idx * 0.08} duration={0.5}>
                    <motion.div
                      whileHover={{ scale: 1.01, x: 4 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setSelectedFix(item.id)}
                      className={`cursor-pointer rounded-2xl p-6 transition-all duration-300 border ${
                        isSelected
                          ? 'bg-white border-[#00a4d8] shadow-lg ring-2 ring-[#00a4d8]/20 translate-x-1'
                          : 'bg-white/80 border-gray-200 hover:border-[#00a4d8]/40 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2.5 mb-2">
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                isSelected ? 'bg-[#00a4d8]/10 text-[#00a4d8]' : 'bg-gray-100 text-gray-600'
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
                            <CheckCircle2 className="w-4 h-4" />
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

      {/* ===================== SECTION 4: OUR AI AUTOMATION IMPLEMENTATION PROCESS ===================== */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Dark Blueprint Banner */}
            <div className="lg:col-span-5">
              <Reveal direction="right" duration={0.65}>
                <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-slate-950 via-[#071326] to-[#040e1c] text-white shadow-2xl relative overflow-hidden border border-slate-800">
                  <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#00a4d8]/20 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="w-12 h-12 rounded-2xl bg-[#00a4d8]/20 border border-[#00a4d8]/40 flex items-center justify-center text-[#00a4d8] mb-6">
                    <Target className="w-6 h-6" />
                  </div>

                  <p className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">{data.processEyebrow}</p>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-4">
                    {data.processTitle}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-8">
                    {data.processDesc}
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openModal({ service: 'AI Workflow Implementation Sprint' })}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#00a4d8] to-[#5d53a3] hover:opacity-95 text-white font-bold text-sm inline-flex items-center justify-center gap-2 shadow-lg shadow-[#00a4d8]/25 transition-all duration-200 cursor-pointer"
                  >
                    <span>Start AI Workflow Sprint</span>
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
                    className="flex items-start gap-5 p-5 rounded-2xl bg-gray-50/70 border border-gray-100 hover:bg-white hover:border-[#00a4d8]/40 hover:shadow-sm transition-all duration-200"
                  >
                    <span className="shrink-0 w-11 h-11 rounded-xl bg-sky-50 text-[#00a4d8] font-extrabold flex items-center justify-center text-base border border-sky-100">
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

      {/* ===================== SECTION 5: WAYS TO WORK WITH OUR AI AUTOMATION TEAM ===================== */}
      <section className="py-24 bg-gradient-to-b from-white via-sky-50/20 to-white border-y border-sky-100/60">
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

          <Stagger className="grid md:grid-cols-3 gap-8" staggerDelay={0.1}>
            {data.models?.map((model, idx) => (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={{ y: -8, transition: { duration: 0.25 } }}
                  className={`rounded-3xl p-8 border flex flex-col justify-between h-full relative transition-all duration-300 ${
                    model.isPopular
                      ? 'bg-white border-[#00a4d8] shadow-xl ring-2 ring-[#00a4d8]/20 -translate-y-2'
                      : 'bg-white border-gray-200/90 shadow-card hover:shadow-soft hover:border-[#00a4d8]/40'
                  }`}
                >
                  {model.isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="bg-gradient-to-r from-[#00a4d8] to-[#5d53a3] text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 text-[#00a4d8] font-extrabold text-lg flex items-center justify-center">
                        {model.number}
                      </span>
                    </div>

                    <h3 className="text-2xl font-extrabold text-ink mb-3">{model.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-6">{model.desc}</p>

                    <div className="pt-6 border-t border-gray-100 space-y-3 mb-8">
                      {model.features?.map((f, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-[#00a4d8] shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openModal({ service: `AI Workflow: ${model.title}` })}
                    className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer ${
                      model.isPopular
                        ? 'bg-gradient-to-r from-[#00a4d8] to-[#5d53a3] text-white hover:opacity-95 shadow-md shadow-[#00a4d8]/25'
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

      {/* ===================== SECTION 6: AI TOOLS AND BUSINESS INTEGRATIONS ===================== */}
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
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#00a4d8] bg-sky-50 border border-sky-100 px-2 py-0.5 rounded">
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
                    <span>Native Agent &amp; Pipeline Sync</span>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ===================== SECTION 7: PROJECT EXPERIENCE AND RESULTS ===================== */}
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
                  className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-card hover:shadow-soft hover:border-[#00a4d8]/40 transition-all duration-300 flex flex-col h-full"
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
                        <span className="text-3xl font-extrabold text-[#00a4d8]">{card.metric}</span>
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
                        onClick={() => openModal({ service: `Case Study: ${card.client}` })}
                        className="w-full py-2.5 rounded-xl border border-[#00a4d8]/40 text-[#00a4d8] font-bold text-xs hover:bg-[#00a4d8]/10 transition cursor-pointer"
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
        eyebrow={data.ctaEyebrow || "LET'S AUTOMATE YOUR BUSINESS WITH AI"}
        title={data.ctaTitle || "Ready To Build A Smarter AI Workflow Automation System?"}
        desc={data.ctaDesc || "Ready to move forward? Share your project details and let's build the right plan for you."}
        primaryButtonText={data.ctaButtonText || "Book Your Consultation Today!"}
        primaryButtonAction={() => openModal({ service: 'AI Workflow Consultation' })}
        secondaryButtonText="Explore Solutions"
        secondaryButtonLink="#solutions"
      />
    </div>
  );
}
