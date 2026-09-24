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
  GitBranch, Server, CheckCircle
} from 'lucide-react';
import { useEstimateModal } from '../context/EstimateModalContext';
import { apiFetch } from '../utils/api';
import { formatInline } from '../utils/formatText';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';
import CtaBanner from '../components/CtaBanner';
import DynamicIcon from '../components/DynamicIcon';
import { useSEO } from '../utils/seo';

// Default static data matching the exact high-converting HubSpot CRM design
const DEFAULT_DATA = {
  slug: 'hubspot-crm',
  title: 'HubSpot CRM Automation Services to Connect Your Sales And Marketing Operations',
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

export default function HubSpotCrm() {
  const { openModal } = useEstimateModal();
  const [data, setData] = useState(DEFAULT_DATA);
  const [selectedFix, setSelectedFix] = useState('lead-management');
  const [openFaq, setOpenFaq] = useState(0);

  // SEO Metadata
  useSEO(data?.seo, {
    title: data.title ? `${data.title} | Cubixsol` : 'HubSpot CRM Automation & Setup Services | Cubixsol',
    description: data.heroDesc || data.desc || 'HubSpot CRM onboarding, custom pipeline automation, marketing hub setups, and bi-directional API integrations.',
    keywords: data.seo?.keywords || 'HubSpot CRM, HubSpot automation, HubSpot onboarding, CRM setup, Cubixsol',
    canonicalUrl: 'https://cubixsol.com/hubspot-crm',
  });

  useEffect(() => {
    // Dynamic fetch from MongoDB
    apiFetch('services/hubspot-crm')
      .then((res) => {
        if (res && (res.title || res.heroTitle)) {
          setData((prev) => ({
            ...prev,
            ...res,
            seo: res.seo || prev.seo,
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
        apiFetch('pages/hubspot-crm')
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
                  <Zap className="w-3.5 h-3.5 text-[#00a4d8] fill-[#00a4d8]/20 animate-pulse" />
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
                    onClick={() => openModal({ service: 'HubSpot CRM Automation' })}
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
                      alt="HubSpot CRM Automation Platform Hub"
                      className="w-full h-80 sm:h-96 object-cover opacity-90 hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6">
                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#00a4d8] to-[#5d53a3] text-white text-xs font-bold backdrop-blur-md shadow-md">
                          <Workflow className="w-4 h-4" />
                          <span>HubSpot Sales Hub Engine</span>
                        </div>
                        <span className="text-emerald-400 text-xs font-bold flex items-center gap-1 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          Two-Way Sync Active
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
                      +320%
                    </div>
                    <div>
                      <p className="leading-tight">Inbound Routing</p>
                      <p className="text-[10px] text-gray-400 font-normal">&lt;60s Speed to Lead</p>
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
                      <p className="leading-tight">Multi-Pipeline</p>
                      <p className="text-[10px] text-gray-400 font-normal">Deal Staging Sync</p>
                    </div>
                  </motion.div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== SECTION 1: WHY YOUR CRM NEEDS AUTOMATION ===================== */}
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

      {/* ===================== SECTION 2: OUR HUBSPOT AUTOMATION SOLUTIONS (6 CARDS) ===================== */}
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

      {/* ===================== SECTION 3: FIND YOUR RIGHT HUBSPOT AUTOMATION PATH ===================== */}
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
                    alt="Solve Your Bottlenecks with HubSpot CRM"
                    className="w-full h-64 object-cover rounded-xl"
                  />
                  <div className="p-4 bg-white">
                    <p className="text-xs font-bold text-[#00a4d8] uppercase tracking-wide">Selected Blueprint</p>
                    <p className="text-sm font-bold text-ink mt-0.5">
                      {data.fixFirstItems?.find((f) => f.id === selectedFix)?.solution || 'Custom Workflow Sprint'}
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
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Recommended Setup: {item.solution}</span>
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

      {/* ===================== SECTION 4: OUR IMPLEMENTATION PROCESS ===================== */}
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
                    onClick={() => openModal({ service: 'HubSpot Implementation Sprint' })}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#00a4d8] to-[#5d53a3] hover:from-[#0092c2] hover:to-[#4a4285] text-white font-bold text-sm inline-flex items-center justify-center gap-2 shadow-lg shadow-[#00a4d8]/25 transition-all duration-200 cursor-pointer"
                  >
                    <span>Start Implementation Sprint</span>
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

      {/* ===================== SECTION 5: WAYS TO WORK WITH OUR TEAM (3 MODELS) ===================== */}
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

          <Stagger className="grid md:grid-cols-3 gap-8" staggerDelay={0.1}>
            {data.models?.map((model, idx) => (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={{ y: -8, transition: { duration: 0.25 } }}
                  className={`rounded-3xl p-8 border flex flex-col justify-between h-full relative transition-all duration-300 ${
                    model.isPopular
                      ? 'bg-white border-[#00a4d8] shadow-xl ring-2 ring-[#00a4d8]/20 -translate-y-2'
                      : 'bg-white border-gray-200/90 shadow-card hover:shadow-soft hover:border-[#00a4d8]/30'
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
                    onClick={() => openModal({ service: `HubSpot: ${model.title}` })}
                    className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer ${
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

      {/* ===================== SECTION 6: TOOLS AND INTEGRATIONS ===================== */}
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
                        <DynamicIcon name={item.icon || 'Zap'} className="w-6 h-6" />
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
                    <span>Two-Way API & Webhook Sync</span>
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
                        onClick={() => openModal({ service: `Case Study: ${card.client}` })}
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
        eyebrow={data.ctaEyebrow || "LET'S AUTOMATE YOUR CRM"}
        title={data.ctaTitle || "Ready To Build A Smarter HubSpot CRM Automation System?"}
        desc={data.ctaDesc || "Ready to move forward? Share your project details and let's build the right plan for you."}
        primaryButtonText={data.ctaButtonText || "Book Your Consultation Today!"}
        primaryButtonAction={() => openModal({ service: 'HubSpot CRM Consultation' })}
        secondaryButtonText="Explore Solutions"
        secondaryButtonLink="#solutions"
      />
    </div>
  );
}
