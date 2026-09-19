import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Zap, Clock, Users, ArrowRight, CheckCircle2, ChevronRight,
  TrendingUp, Sparkles, ShieldCheck, Database, Calendar,
  MessageSquare, Mail, Layers, PhoneCall, ExternalLink,
  Bot, RefreshCw, BarChart3, HelpCircle, Star, Sliders,
  Workflow, Cpu, Settings, Smartphone, Award, Target, Rocket,
  Globe, CreditCard, Share2, Terminal, Code2, Check
} from 'lucide-react';
import { useEstimateModal } from '../context/EstimateModalContext';
import { apiFetch } from '../utils/api';
import { formatInline } from '../utils/formatText';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';
import CtaBanner from '../components/CtaBanner';
import DynamicIcon from '../components/DynamicIcon';
import { useSEO } from '../utils/seo';

// Default static data matching the exact high-converting GoHighLevel design
const DEFAULT_DATA = {
  slug: 'ghl-automation',
  title: 'GoHighLevel Automation Services to Turn Leads into Revenue',
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

  // Section 3: Interactive Problem Solver Section
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

  // Section 4: Process / Roadmap Section
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

  // Section 5: Engagement / Working Models (3 Cards)
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

  // Section 6: Platform Ecosystem
  spectrumEyebrow: 'PLATFORM ECOSYSTEM',
  spectrumTitle: 'GHL Integrations To Connect Your Entire Business',
  spectrumDesc: 'GoHighLevel becomes more powerful when connected with the tools your business already uses.',
  integrations: [
    { name: 'GoHighLevel CRM', icon: 'Workflow', category: 'Core Platform', desc: 'Centralized lead data, pipelines, contacts, and unified conversation inbox.' },
    { name: 'Google Calendar', icon: 'Calendar', category: 'Scheduling', desc: 'Two-way sync for appointments, round-robin booking, and event reminders.' },
    { name: 'Payment Platforms', icon: 'CreditCard', category: 'Payments', desc: 'Stripe, PayPal, and Authorize.net integration for deposits and checkouts.' },
    { name: 'Advertising Platforms', icon: 'Target', category: 'Ad Channels', desc: 'Facebook Lead Ads, Google Ads, and TikTok Ads direct webhook capture.' },
    { name: 'Email Marketing Tools', icon: 'Mail', category: 'Outreach', desc: 'SMTP servers, Mailgun, SendGrid, and custom email delivery setup.' },
    { name: 'Zapier', icon: 'Zap', category: 'Middleware', desc: 'Multi-step automation bridges connecting thousands of third-party apps.' },
    { name: 'Make', icon: 'Sliders', category: 'Advanced Logic', desc: 'Complex scenario automations, routers, data transformers, and webhooks.' },
    { name: 'Custom API Connections', icon: 'Code2', category: 'Custom Tech', desc: 'REST APIs, custom webhook endpoints, SQL sync, and proprietary app hooks.' },
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
      isCaseStudy: true,
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
      isCaseStudy: false,
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
      isCaseStudy: false,
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

export default function GoHighLevelAutomation() {
  const { openModal } = useEstimateModal();
  const [data, setData] = useState(DEFAULT_DATA);
  const [selectedFix, setSelectedFix] = useState('marketing-leads');
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
    apiFetch('services/ghl-automation')
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
        apiFetch('pages/gohighlevel-automation')
          .then((pageRes) => {
            if (pageRes && pageRes.content) {
              setData((prev) => ({ ...prev, ...pageRes.content }));
            }
          })
          .catch(() => {});
      });
  }, []);

  return (
    <div className="min-h-screen bg-white text-ink selection:bg-rose-500 selection:text-white relative">
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-gradient-to-b from-rose-50/70 via-white to-white border-b border-rose-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <Reveal direction="down" duration={0.6}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/80 border border-rose-200 text-rose-700 text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
                  <Zap className="w-3.5 h-3.5 text-rose-600 fill-rose-600 animate-pulse" />
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
                    onClick={() => openModal({ service: 'GoHighLevel Automation' })}
                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-700 hover:to-red-800 shadow-lg shadow-rose-500/25 hover:shadow-rose-500/35 transition-all duration-300 text-base cursor-pointer"
                  >
                    <span>{data.heroPrimaryBtnText}</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>

                  <motion.a
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    href="#solutions"
                    className="inline-flex items-center gap-2 px-6 py-4 rounded-xl font-semibold text-gray-700 bg-white border border-gray-200 hover:border-rose-300 hover:bg-rose-50/50 hover:text-rose-700 shadow-sm transition-all duration-200 text-base"
                  >
                    <span>{data.heroSecondaryBtnText}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </motion.a>
                </div>
              </Reveal>

              {/* Trust Badges */}
              <Reveal delay={0.4} duration={0.65}>
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-6 border-t border-rose-100/80">
                  {data.heroBadges?.map((badge, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700">
                      <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                      <span>{badge}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right Hero Visual / Isometric Platform Hub with Floating Badges */}
            <div className="lg:col-span-5 relative">
              <Reveal delay={0.2} direction="left" duration={0.7} scale>
                <div className="relative rounded-3xl p-6 bg-gradient-to-br from-rose-500/10 via-rose-50 to-amber-50/40 border border-rose-200/80 shadow-2xl shadow-rose-500/10 backdrop-blur-sm">
                  <div className="relative rounded-2xl overflow-hidden shadow-inner bg-slate-900 border border-slate-800">
                    <img
                      src={data.heroImage}
                      alt="GoHighLevel Automation Platform Hub"
                      className="w-full h-80 sm:h-96 object-cover opacity-90 hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6">
                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-rose-600/90 text-white text-xs font-bold backdrop-blur-md">
                          <Workflow className="w-4 h-4" />
                          <span>GHL Multi-Trigger Automation</span>
                        </div>
                        <span className="text-emerald-400 text-xs font-bold flex items-center gap-1 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                          Live Sync Active
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Floating Micro-Badges */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                    className="absolute -top-4 -right-4 bg-white rounded-2xl p-3 shadow-xl border border-rose-100 hidden sm:flex items-center gap-2 text-xs font-bold text-ink"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-extrabold text-sm">
                      +310%
                    </div>
                    <div>
                      <p className="leading-tight">Booked Calls</p>
                      <p className="text-[10px] text-gray-400 font-normal">Auto-Speed-to-Lead</p>
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.5 }}
                    className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-3 shadow-xl border border-rose-100 hidden sm:flex items-center gap-2 text-xs font-bold text-ink"
                  >
                    <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center font-extrabold">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="leading-tight">60s Response</p>
                      <p className="text-[10px] text-gray-400 font-normal">SMS + Email Drip</p>
                    </div>
                  </motion.div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== SECTION 1: WHY BUSINESSES CHOOSE AUTOMATION ===================== */}
      <section className="py-20 bg-gray-50/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal direction="up" duration={0.6}>
              <p className="text-xs font-bold tracking-widest uppercase text-rose-600 mb-3">{data.problemEyebrow}</p>
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
                  className="bg-white rounded-2xl p-6 sm:p-7 border border-gray-100 shadow-sm hover:shadow-md hover:border-rose-200 transition-all duration-300 h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 mb-5">
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

      {/* ===================== SECTION 2: OUR GOHIGHLEVEL SERVICES (6 CARDS) ===================== */}
      <section id="solutions" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal direction="up" duration={0.6}>
              <p className="text-xs font-bold tracking-widest uppercase text-rose-600 mb-3">{data.capabilitiesEyebrow}</p>
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
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-card hover:shadow-soft hover:border-rose-200 transition-all duration-300 flex flex-col h-full group"
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
                      <h3 className="text-xl font-bold text-ink mb-2.5 group-hover:text-rose-600 transition-colors">
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

      {/* ===================== SECTION 3: FIND THE RIGHT GOHIGHLEVEL SOLUTION ===================== */}
      <section className="py-20 bg-gradient-to-b from-gray-50/80 via-rose-50/30 to-gray-50/80 border-y border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Graphic & Header */}
            <div className="lg:col-span-5">
              <Reveal direction="right" duration={0.65}>
                <p className="text-xs font-bold tracking-widest uppercase text-rose-600 mb-3">{data.fixFirstEyebrow}</p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-ink leading-tight mb-4">
                  {data.fixFirstTitle}
                </h2>
                <p className="text-base text-gray-500 mb-8 leading-relaxed">
                  {data.fixFirstDesc}
                </p>

                <div className="relative rounded-2xl overflow-hidden border border-rose-100 shadow-md bg-white p-3">
                  <img
                    src={data.fixFirstImage}
                    alt="Solve Your Bottlenecks with GoHighLevel"
                    className="w-full h-64 object-cover rounded-xl"
                  />
                  <div className="p-4 bg-white">
                    <p className="text-xs font-bold text-rose-600 uppercase tracking-wide">Selected Blueprint</p>
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
                          ? 'bg-white border-rose-500 shadow-lg ring-2 ring-rose-500/20 translate-x-1'
                          : 'bg-white/80 border-gray-200 hover:border-rose-200 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2.5 mb-2">
                            <span
                              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                                isSelected ? 'bg-rose-100 text-rose-700' : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {item.tag}
                            </span>
                            <h3 className={`font-bold text-base sm:text-lg ${isSelected ? 'text-rose-700' : 'text-ink'}`}>
                              {item.title}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-500 leading-relaxed mb-3">
                            {item.desc}
                          </p>
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-600">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Recommended Setup: {item.solution}</span>
                          </div>
                        </div>

                        <div className="shrink-0 mt-1">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center border transition ${
                              isSelected ? 'bg-rose-600 border-rose-600 text-white' : 'border-gray-300 text-transparent'
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
                <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white shadow-2xl relative overflow-hidden border border-slate-800">
                  <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400 mb-6">
                    <Target className="w-6 h-6" />
                  </div>

                  <p className="text-xs font-bold uppercase tracking-widest text-rose-400 mb-3">{data.processEyebrow}</p>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-4">
                    {data.processTitle}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-8">
                    {data.processDesc}
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openModal({ service: 'GoHighLevel Implementation Sprint' })}
                    className="w-full py-3.5 px-6 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm inline-flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 transition-all duration-200 cursor-pointer"
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
                    className="flex items-start gap-5 p-5 rounded-2xl bg-gray-50/70 border border-gray-100 hover:bg-white hover:border-rose-200 hover:shadow-sm transition-all duration-200"
                  >
                    <span className="shrink-0 w-11 h-11 rounded-xl bg-rose-100 text-rose-700 font-extrabold flex items-center justify-center text-base border border-rose-200">
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

      {/* ===================== SECTION 5: WORK WITH OUR GOHIGHLEVEL EXPERTS (MODELS) ===================== */}
      <section className="py-24 bg-gradient-to-b from-white via-rose-50/25 to-white border-y border-rose-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal direction="up" duration={0.6}>
              <p className="text-xs font-bold tracking-widest uppercase text-rose-600 mb-3">{data.modelsEyebrow}</p>
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
                      ? 'bg-white border-rose-500 shadow-xl ring-2 ring-rose-500/20 -translate-y-2'
                      : 'bg-white border-gray-200/90 shadow-card hover:shadow-soft hover:border-rose-200'
                  }`}
                >
                  {model.isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="bg-rose-600 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 font-extrabold text-lg flex items-center justify-center">
                        {model.number}
                      </span>
                    </div>

                    <h3 className="text-2xl font-extrabold text-ink mb-3">{model.title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-6">{model.desc}</p>

                    <div className="pt-6 border-t border-gray-100 space-y-3 mb-8">
                      {model.features?.map((f, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => openModal({ service: `GoHighLevel: ${model.title}` })}
                    className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer ${
                      model.isPopular
                        ? 'bg-rose-600 text-white hover:bg-rose-700 shadow-md shadow-rose-600/25'
                        : 'bg-gray-100 text-ink hover:bg-rose-50 hover:text-rose-700'
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

      {/* ===================== SECTION 6: PLATFORM ECOSYSTEM & INTEGRATIONS ===================== */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal direction="up" duration={0.6}>
              <p className="text-xs font-bold tracking-widest uppercase text-rose-600 mb-3">{data.spectrumEyebrow}</p>
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
                  className="bg-gradient-to-br from-white via-rose-50/30 to-white rounded-2xl p-6 border border-gray-200/80 shadow-sm hover:shadow-md hover:border-rose-300 transition-all duration-300 flex flex-col justify-between h-full group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors duration-300">
                        <DynamicIcon name={item.icon || 'Zap'} className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-100/70 px-2 py-0.5 rounded">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg text-ink mb-2 group-hover:text-rose-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-xs font-semibold text-rose-600">
                    <Check className="w-3.5 h-3.5" />
                    <span>Native Sync & Webhook Ready</span>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ===================== SECTION 7: PROJECT EXPERIENCE & CASE STUDIES ===================== */}
      <section id="case-studies" className="py-24 bg-gray-50/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal direction="up" duration={0.6}>
              <p className="text-xs font-bold tracking-widest uppercase text-rose-600 mb-3">{data.outcomesEyebrow}</p>
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
                  className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-card hover:shadow-soft hover:border-rose-200 transition-all duration-300 flex flex-col h-full"
                >
                  <div className="h-48 relative overflow-hidden bg-slate-900">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-rose-600 text-white text-xs font-bold px-3 py-1 rounded-lg shadow-sm">
                      {card.client}
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="mb-4 flex items-baseline gap-2">
                        <span className="text-3xl font-extrabold text-rose-600">{card.metric}</span>
                        <p className="text-xs font-semibold text-gray-500">{card.metricLabel}</p>
                      </div>

                      <h3 className="font-bold text-lg text-ink mb-2.5 leading-snug">{card.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed mb-6">{card.desc}</p>

                      <div className="space-y-2 pt-4 border-t border-gray-100">
                        {card.results?.map((res, rIdx) => (
                          <div key={rIdx} className="flex items-center gap-2 text-xs font-medium text-gray-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                            <span>{res}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4">
                      <button
                        onClick={() => openModal({ service: `Project Experience: ${card.client}` })}
                        className="w-full py-2.5 rounded-xl border border-rose-200 text-rose-600 font-bold text-xs hover:bg-rose-50 transition cursor-pointer"
                      >
                        {card.isCaseStudy ? '(Case study)' : 'Request Project Breakdown'}
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
              <p className="text-xs font-bold tracking-widest uppercase text-rose-600 mb-3">FAQ</p>
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
                        className={`w-5 h-5 text-rose-600 shrink-0 transition-transform duration-200 ${
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
        eyebrow={data.ctaEyebrow || "LET'S AUTOMATE YOUR GROWTH"}
        title={data.ctaTitle || "Ready To Build Your GoHighLevel Automation System?"}
        desc={data.ctaDesc || "Get expert guidance for your next project. Share your details and let's get started."}
        primaryButtonText={data.ctaButtonText || "Get Your Free Consultation"}
        primaryButtonAction={() => openModal({ service: 'GoHighLevel Consultation' })}
        secondaryButtonText="Explore Solutions"
        secondaryButtonLink="#solutions"
      />
    </div>
  );
}
