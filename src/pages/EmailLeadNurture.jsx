import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Mail, MessageSquare, Zap, Clock, Users, ArrowRight, CheckCircle2,
  ChevronRight, TrendingUp, Sparkles, ShieldCheck, Database, Calendar,
  Layers, PhoneCall, ExternalLink, RefreshCw, BarChart3, HelpCircle,
  Star, Sliders, Workflow, Cpu, Settings, Smartphone, Award, Target,
  Rocket, Globe, CreditCard, Share2, Terminal, Code2, Check, PieChart,
  GitBranch, Server, BrainCircuit, FileText, Send, CheckCircle
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
  slug: 'email-lead-nurture',
  title: 'Email Marketing Automation Services to Turn Subscribers Into Customers',
  heroEyebrow: 'EMAIL MARKETING AUTOMATION SERVICES',
  heroTitle: 'Email Marketing Automation Services to Turn Subscribers Into Customers',
  heroDesc: 'Our email marketing automation services build automated campaigns, personalised workflows, and strategic email journeys. We use advanced email marketing automation software, email marketing automation tools, and customer data to create campaigns that improve engagement, increase conversions, and support long-term business growth.',
  heroPrimaryBtnText: 'Book A Free Strategy Call',
  heroSecondaryBtnText: 'Explore Our Solutions',
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
  problemCards: [
    {
      icon: 'Users',
      title: 'Build Stronger Customer Relationships Automatically',
      desc: 'A lead nurturing email strategy helps businesses stay connected with potential customers through personalised messages, educational content, and targeted follow-ups.',
    },
    {
      icon: 'Clock',
      title: 'Follow Up With Leads At The Right Moment',
      desc: 'Email marketing automation workflows allow businesses to send relevant emails after specific actions such as form submissions, purchases, downloads, or website visits.',
    },
    {
      icon: 'Workflow',
      title: 'Create Consistent Marketing Campaigns',
      desc: 'Marketing email automation helps businesses manage campaigns without manually sending every message. Automated systems deliver the right content throughout the customer journey.',
    },
    {
      icon: 'BarChart3',
      title: 'Improve Campaign Performance Through Data',
      desc: 'Email marketing automation platforms provide valuable insights about opens, clicks, conversions, and customer behaviour. Businesses can optimise campaigns based on real performance data.',
    },
  ],

  // Section 2: Our Email Marketing Automation Services (6 Cards)
  capabilitiesEyebrow: 'OUR EMAIL MARKETING AUTOMATION SERVICES',
  capabilitiesTitle: 'Automated Email Systems Designed Around Your Business Goals',
  capabilitiesDesc: 'Every business requires a different communication strategy. Our email marketing automation services combine campaign planning, workflow development, customer segmentation, and automation technology to create effective email systems.',
  capabilitiesCards: [
    {
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'SYSTEM SETUP',
      title: 'Email Marketing Automation Setup',
      desc: 'We configure email marketing automation software with customer lists, audience segments, campaign structures, and essential automation settings.',
      pills: ['Platform Setup', 'List Architecture', 'DNS & SPF/DKIM'],
    },
    {
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'DRIP SEQUENCES',
      title: 'Email Drip Campaign Development',
      desc: 'We create strategic email drip campaigns that guide subscribers through planned communication sequences. Each drip campaign email delivers relevant information based on customer interests and actions.',
      pills: ['Behavior Triggers', 'Onboarding Drips', 'Cart Recovery'],
    },
    {
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'LEAD NURTURING',
      title: 'Lead Nurturing Email Campaigns',
      desc: 'Our lead nurturing services help businesses convert potential customers through personalised email sequences, educational content, and targeted follow-ups.',
      pills: ['Lead Scoring', 'Educational Series', 'Sales Handoff'],
    },
    {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'WORKFLOW DESIGN',
      title: 'Marketing Automation Workflow Creation',
      desc: 'We develop email marketing automation workflows that trigger messages based on customer behaviour, engagement levels, and business objectives.',
      pills: ['Conditional Logic', 'Branching Paths', 'Lifecycle Sync'],
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'DYNAMIC CONTENT',
      title: 'Email Campaign Personalisation',
      desc: 'We create customised email experiences using customer data, segmentation, dynamic content, and personalised messaging strategies.',
      pills: ['Dynamic Merges', 'Audience Tags', 'Custom Fields'],
    },
    {
      image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'INTEGRATIONS & OPS',
      title: 'Platform Integration And Optimisation',
      desc: 'We connect email marketing and automation systems with websites, CRM platforms, ecommerce stores, and business applications to create connected marketing operations.',
      pills: ['CRM Two-Way Sync', 'E-Commerce Connect', 'Live Webhooks'],
    },
  ],

  // Section 3: Select the Right Email Automation Strategy (Interactive Solver)
  fixFirstEyebrow: 'SELECT THE RIGHT EMAIL AUTOMATION STRATEGY',
  fixFirstTitle: 'Which Part Of Your Marketing Process Needs Automation?',
  fixFirstDesc: 'A successful email automation system starts with understanding your audience, business goals, and customer journey. The right approach creates better communication and stronger conversions.',
  fixFirstImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&h=600&q=80',
  fixFirstItems: [
    {
      id: 'qualified-leads',
      title: 'We Need More Qualified Leads',
      desc: 'Businesses focused on lead generation can use automated email campaigns to capture interest and guide prospects toward conversion.',
      tag: 'Lead Conversion',
      solution: 'Lead Capture Form → Email Sequence → Lead Nurturing Campaign → Sales Follow-Up',
    },
    {
      id: 'customer-engagement',
      title: 'We Want To Improve Customer Engagement',
      desc: 'Companies that need better customer communication can use personalised campaigns to maintain relationships and encourage repeat interactions.',
      tag: 'Customer Retention',
      solution: 'Customer Segmentation → Personalised Emails → Automated Follow-Ups → Engagement Tracking',
    },
    {
      id: 'drip-campaign',
      title: 'We Need A Complete Drip Campaign System',
      desc: 'Businesses with long customer journeys can use email drip campaign software to deliver planned messages over time.',
      tag: 'Automated Drips',
      solution: 'Audience Research → Drip Campaign Email Flow → Automation Triggers → Performance Analysis',
    },
    {
      id: 'wordpress-automation',
      title: 'We Need WordPress Email Automation',
      desc: 'Website owners can use WordPress email marketing automation solutions to connect website activities with automated communication.',
      tag: 'Web & CMS Sync',
      solution: 'WordPress Website → Subscriber Collection → Email Automation Workflow → Customer Journey',
    },
  ],

  // Section 4: Our Email Automation Implementation Process (5 Steps)
  processEyebrow: 'OUR EMAIL AUTOMATION IMPLEMENTATION PROCESS',
  processTitle: 'From Strategy Planning To Automated Campaign Launch',
  processDesc: 'Our process creates reliable email systems that match your marketing goals and customer expectations.',
  processSteps: [
    {
      step: '01',
      title: 'Marketing Strategy Analysis',
      desc: 'We review your audience, customer journey, existing campaigns, and business objectives before developing the automation plan.',
    },
    {
      step: '02',
      title: 'Campaign And Workflow Planning',
      desc: 'We design email sequences, customer segments, triggers, and communication paths that support your marketing strategy.',
    },
    {
      step: '03',
      title: 'Automation Setup And Integration',
      desc: 'We configure email platforms, connect required tools, and build automated workflows that manage customer communication.',
    },
    {
      step: '04',
      title: 'Testing Email Journeys',
      desc: 'We test campaign timing, automation triggers, email content, and user experiences before launching the system.',
    },
    {
      step: '05',
      title: 'Performance Improvement And Support',
      desc: 'We analyse campaign results and improve automation workflows to increase engagement and conversion opportunities.',
    },
  ],

  // Section 5: Work With Our Email Marketing Automation Experts (4 Solutions)
  modelsEyebrow: 'WORK WITH OUR EMAIL MARKETING AUTOMATION EXPERTS',
  modelsTitle: 'Flexible Solutions For Growing Businesses',
  modelsDesc: 'Different businesses require different levels of marketing automation support. Our team provides solutions based on your audience, goals, and existing technology setup.',
  models: [
    {
      number: '1',
      title: 'Complete Email Automation Project',
      desc: 'We build complete automation systems, including strategy, campaign development, workflow creation, integrations, and optimisation support.',
      features: [
        'End-to-End Email Architecture & List Setup',
        'Custom High-Converting Email Templates',
        'Multi-Trigger Automation Flow Design',
        'CRM & E-Commerce Integration & Testing',
      ],
      ctaText: 'Start Complete Project',
    },
    {
      number: '2',
      title: 'Email Drip Campaign Management',
      desc: 'We build and manage drip email campaigns that nurture subscribers and move prospects through the buying journey.',
      features: [
        'Automated Welcome & Lead Nurture Series',
        'Abandoned Cart & Re-engagement Sequences',
        'A/B Subject Line & Content Testing',
        'Deliverability & Inbox Placement Audits',
      ],
      ctaText: 'Build Drip Campaigns',
      isPopular: true,
    },
    {
      number: '3',
      title: 'Lead Nurturing Automation Services',
      desc: 'We create lead nurturing email marketing systems that help businesses build relationships and convert interested prospects.',
      features: [
        'Behavioral Lead Scoring & Dynamic Tagging',
        'Educational Content & Product Storylines',
        'Automated Sales Handoff Notifications',
        'CRM Deal Stage Movement Sync',
      ],
      ctaText: 'Build Nurture System',
    },
    {
      number: '4',
      title: 'Ongoing Email Marketing Optimisation',
      desc: 'We improve existing campaigns through better segmentation, automation updates, content improvements, and performance analysis.',
      features: [
        'Weekly Campaign Analytics & Open Rate Boost',
        'Audience Segment Hygiene & Re-targeting',
        'New Workflow Triggers & Sequence Refinements',
        'Dedicated Email Automation Specialists',
      ],
      ctaText: 'Get Ongoing Support',
    },
  ],

  // Section 6: Email Marketing Technology Ecosystem
  spectrumEyebrow: 'EMAIL MARKETING TECHNOLOGY ECOSYSTEM',
  spectrumTitle: 'Connect Your Email Platform With Essential Business Tools',
  spectrumDesc: 'Email marketing automation platforms work better when connected to the systems your business already uses.',
  integrations: [
    { name: 'Klaviyo & Mailchimp', icon: 'Mail', category: 'Email Platforms', desc: 'World-class email campaign building, subscriber list segmentation, and template automation.' },
    { name: 'ActiveCampaign & HubSpot', icon: 'Workflow', category: 'Automation & CRM', desc: 'Advanced conditional branching, automated lead scoring, and deal stage sync.' },
    { name: 'Shopify & WooCommerce', icon: 'CreditCard', category: 'E-Commerce', desc: 'Real-time order sync, abandoned cart reminders, and post-purchase review sequences.' },
    { name: 'WordPress & Webflow', icon: 'Globe', category: 'CMS & Websites', desc: 'Seamless opt-in forms, popup lead capture, and subscriber data streaming.' },
    { name: 'GoHighLevel (GHL)', icon: 'Zap', category: 'All-In-One CRM', desc: 'Omnichannel SMS & email pipelines, calendar bookings, and review follow-ups.' },
    { name: 'Zapier & Make.com', icon: 'Cpu', category: 'Data Pipelines', desc: 'Multi-app event triggers and custom webhook data synchronization.' },
    { name: 'Salesforce & Pipedrive', icon: 'Database', category: 'Sales Pipeline', desc: 'Automated contact logging, pipeline stage progression, and rep alerts.' },
    { name: 'Custom REST APIs & Webhooks', icon: 'Code2', category: 'Custom Tech', desc: 'Direct bi-directional data flow with private servers and proprietary apps.' },
  ],

  // Section 7: Project Experience
  outcomesEyebrow: 'PROJECT EXPERIENCE',
  outcomesTitle: 'Automated Email Systems Built For Business Growth',
  outcomesDesc: 'Our email automation projects focus on creating practical marketing systems that improve customer engagement, lead management, and revenue opportunities.',
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
        'Measurable conversion lifts across buyer journeys',
      ],
      isCaseStudy: true,
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
        '99.2% inbox deliverability with DKIM/SPF domain warming',
      ],
      isCaseStudy: false,
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
        'Reduced churn with proactive 30-day re-engagement drips',
      ],
      isCaseStudy: false,
    },
  ],

  // Section 8: FAQs
  faqs: [
    {
      q: 'What is email marketing automation and how does it work?',
      a: 'Email marketing automation uses predefined workflows, customer data, and triggers (such as signing up, downloading a resource, or abandoning a cart) to automatically send timely, personalised emails to the right person without manual intervention.',
    },
    {
      q: 'Which email automation platforms do you work with?',
      a: 'We work with all leading email and automation platforms including Klaviyo, ActiveCampaign, HubSpot, Mailchimp, GoHighLevel, Brevo, Omnisend, ConvertKit, and custom SMTP setups.',
    },
    {
      q: 'Can you integrate email automation with our website and CRM?',
      a: 'Yes. We seamlessly connect email automation platforms with WordPress, Shopify, WooCommerce, Webflow, custom React/Next.js sites, and CRMs like HubSpot, Salesforce, and GoHighLevel via APIs and webhooks.',
    },
    {
      q: 'How do you ensure our emails don’t land in spam folders?',
      a: 'We implement complete domain authentication (SPF, DKIM, DMARC, BIMI), conduct IP and domain warming, maintain strict list hygiene, clean inactive subscribers, and test content formatting for high inbox placement.',
    },
    {
      q: 'Can we manage and update this content from the Admin Dashboard?',
      a: 'Yes! All page text, services, process steps, engagement models, integrations, and FAQs are saved in MongoDB and can be managed directly from your Cubixsol Admin Dashboard.',
    },
  ],

  // Section 9: CTA Banner
  ctaEyebrow: 'START YOUR EMAIL AUTOMATION PROJECT',
  ctaTitle: 'Ready To Create A Smarter Email Marketing System?',
  ctaDesc: 'Get expert guidance for your next automation project. Share your requirements and discover how strategic email automation can improve your customer communication.',
  ctaButtonText: 'Get Your Free Consultation',

  // SEO Fields
  seo: {
    metaTitle: 'Email Marketing Automation Services to Turn Subscribers Into Customers | Cubixsol',
    metaDescription: 'Expert email marketing automation, lead nurturing drip campaigns, behavioral workflows, and CRM integrations to grow your business.',
    keywords: 'email marketing automation, email drip campaigns, lead nurturing email strategy, marketing automation workflows, email marketing company, Cubixsol',
  },
};

export default function EmailLeadNurture() {
  const { openModal } = useEstimateModal();
  const [data, setData] = useState(DEFAULT_DATA);
  const [selectedFix, setSelectedFix] = useState('qualified-leads');
  const [openFaq, setOpenFaq] = useState(0);

  // SEO Metadata Hook
  useSEO(
    data.seo?.metaTitle || data.title,
    data.seo?.metaDescription || data.heroDesc,
    data.seo?.keywords,
    data.heroImage
  );

  useEffect(() => {
    // Dynamic fetch from MongoDB (Service or PageContent)
    apiFetch('services/email-lead-nurture')
      .then((res) => {
        if (res && (res.title || res.heroTitle)) {
          // Normalize mapped fields from MongoDB Service schema if modified in Admin Dashboard
          const mappedProblemCards = res.problemCards || (res.whyChooseItems && res.whyChooseItems.length > 0
            ? res.whyChooseItems.map((item, idx) => ({
                icon: ['Users', 'Clock', 'Workflow', 'BarChart3'][idx % 4],
                title: item.title,
                desc: item.desc
              }))
            : null);

          const mappedCapabilitiesCards = res.capabilitiesCards || (res.subServicesItems && res.subServicesItems.length > 0
            ? res.subServicesItems.map((item, idx) => ({
                image: DEFAULT_DATA.capabilitiesCards[idx % DEFAULT_DATA.capabilitiesCards.length]?.image,
                tag: ['SYSTEM SETUP', 'DRIP SEQUENCES', 'LEAD NURTURING', 'WORKFLOW DESIGN', 'DYNAMIC CONTENT', 'INTEGRATIONS & OPS'][idx % 6],
                title: item.title,
                desc: item.desc,
                pills: DEFAULT_DATA.capabilitiesCards[idx % DEFAULT_DATA.capabilitiesCards.length]?.pills || ['Automation', 'Integrated', 'Personalised']
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
                category: p.category || 'Platform',
                icon: p.icon || 'Mail',
                desc: `Seamless real-time integration with ${p.name}.`
              }))
            : null);

          setData((prev) => ({
            ...prev,
            ...res,
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
        // Fallback to pages/email-lead-nurture
        apiFetch('pages/email-lead-nurture')
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
                  <Mail className="w-3.5 h-3.5 text-[#00a4d8] animate-pulse" />
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
                    onClick={() => openModal({ service: 'Email Marketing Automation' })}
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

            {/* Right Hero Visual / Interactive Mock Lifecycle Flow */}
            <div className="lg:col-span-5 relative">
              <Reveal delay={0.2} direction="left" duration={0.7} scale>
                <div className="relative rounded-3xl p-6 bg-gradient-to-br from-[#00a4d8]/10 via-indigo-50/40 to-sky-50/40 border border-[#00a4d8]/20 shadow-2xl shadow-[#00a4d8]/10 backdrop-blur-sm">
                  {/* Automation Pipeline Preview Box */}
                  <div className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-inner flex flex-col h-[380px]">
                    {/* Header */}
                    <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#00a4d8] to-[#5d53a3] flex items-center justify-center text-white text-xs font-bold shadow-md">
                          <Workflow className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white leading-tight">Lead Nurture Flow</p>
                          <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Active Campaign • 48.6% Open Rate
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] bg-slate-800 text-slate-300 font-semibold px-2 py-0.5 rounded border border-slate-700">
                        Auto Drip
                      </span>
                    </div>

                    {/* Flow Steps Preview */}
                    <div className="p-4 flex-1 space-y-3 overflow-hidden flex flex-col justify-center text-xs">
                      <div className="bg-slate-800/90 border border-slate-700/70 rounded-xl p-3 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#00a4d8]/20 text-cyan-300 flex items-center justify-center shrink-0">
                          <Users className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-bold text-xs truncate">1. Trigger: New Subscriber Joined</p>
                          <p className="text-[11px] text-slate-400 truncate">Website Opt-in Form → Tag: High Intent</p>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                          Instant
                        </span>
                      </div>

                      <div className="flex justify-center -my-1.5 text-slate-500">
                        <div className="w-0.5 h-3 bg-slate-700" />
                      </div>

                      <div className="bg-slate-800/90 border border-slate-700/70 rounded-xl p-3 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0">
                          <Mail className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-bold text-xs truncate">2. Send: Welcome & Value Delivery</p>
                          <p className="text-[11px] text-slate-400 truncate">Personalised greeting + Free strategy guide</p>
                        </div>
                        <span className="text-[10px] font-bold text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                          +0 Min
                        </span>
                      </div>

                      <div className="flex justify-center -my-1.5 text-slate-500">
                        <div className="w-0.5 h-3 bg-slate-700" />
                      </div>

                      <div className="bg-slate-800/90 border border-slate-700/70 rounded-xl p-3 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                          <TrendingUp className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-bold text-xs truncate">3. Conditional Action: Opened Link?</p>
                          <p className="text-[11px] text-slate-400 truncate">Move to Demo Booking Sequence → Notify CRM</p>
                        </div>
                        <span className="text-[10px] font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800">
                          +2 Days
                        </span>
                      </div>
                    </div>

                    {/* Bottom Status Bar */}
                    <div className="p-2.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs px-4">
                      <span className="text-slate-400">Total Subscribers: <strong className="text-white">12,450</strong></span>
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> 99.4% Inbox Delivery
                      </span>
                    </div>
                  </div>

                  {/* Floating Micro-Badges */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                    className="absolute -top-4 -right-4 bg-white rounded-2xl p-3 shadow-xl border border-sky-100 hidden sm:flex items-center gap-2 text-xs font-bold text-ink"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-extrabold text-sm">
                      200+
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
                      <p className="leading-tight">Instant Triggers</p>
                      <p className="text-[10px] text-gray-400 font-normal">Zero Lead Leakage</p>
                    </div>
                  </motion.div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== SECTION 1: WHY BUSINESSES NEED EMAIL AUTOMATION ===================== */}
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
                      <DynamicIcon name={card.icon || 'Mail'} className="w-6 h-6" />
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

      {/* ===================== SECTION 2: OUR EMAIL MARKETING AUTOMATION SERVICES (6 CARDS) ===================== */}
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

      {/* ===================== SECTION 3: SELECT THE RIGHT EMAIL AUTOMATION STRATEGY ===================== */}
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
                    alt="Email Automation Strategy Flow"
                    className="w-full h-64 object-cover rounded-xl"
                  />
                  <div className="p-4 bg-white">
                    <p className="text-xs font-bold text-[#00a4d8] uppercase tracking-wide">Recommended Strategy Flow</p>
                    <p className="text-sm font-bold text-ink mt-0.5">
                      {data.fixFirstItems?.find((f) => f.id === selectedFix)?.solution || 'Custom Automation Flow'}
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

      {/* ===================== SECTION 4: OUR EMAIL AUTOMATION IMPLEMENTATION PROCESS ===================== */}
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
                    onClick={() => openModal({ service: 'Email Automation Implementation Sprint' })}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#00a4d8] to-[#5d53a3] hover:from-[#0092c2] hover:to-[#4a4285] text-white font-bold text-sm inline-flex items-center justify-center gap-2 shadow-lg shadow-[#00a4d8]/25 transition-all duration-200 cursor-pointer"
                  >
                    <span>Start Automation Sprint</span>
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

      {/* ===================== SECTION 5: WORK WITH OUR EMAIL AUTOMATION EXPERTS ===================== */}
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
                    onClick={() => openModal({ service: `Email Automation: ${model.title}` })}
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

      {/* ===================== SECTION 6: EMAIL MARKETING TECHNOLOGY ECOSYSTEM ===================== */}
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
                        <DynamicIcon name={item.icon || 'Mail'} className="w-6 h-6" />
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
                    <span>Two-Way Data Sync</span>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ===================== SECTION 7: PROJECT EXPERIENCE & RESULTS ===================== */}
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

      {/* ===================== SECTION 9: FINAL CTA BANNER ===================== */}
      <CtaBanner
        eyebrow={data.ctaEyebrow || "START YOUR EMAIL AUTOMATION PROJECT"}
        title={data.ctaTitle || "Ready To Create A Smarter Email Marketing System?"}
        desc={data.ctaDesc || "Get expert guidance for your next automation project. Share your requirements and discover how strategic email automation can improve your customer communication."}
        primaryButtonText={data.ctaButtonText || "Get Your Free Consultation"}
        primaryButtonAction={() => openModal({ service: 'Email Marketing Consultation' })}
        secondaryButtonText="Explore Our Solutions"
        secondaryButtonLink="#solutions"
      />
    </div>
  );
}
