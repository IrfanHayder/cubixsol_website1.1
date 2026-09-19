import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Zap, Clock, Users, ArrowRight, CheckCircle2, ChevronRight,
  TrendingUp, Sparkles, ShieldCheck, Database, Calendar,
  MessageSquare, Mail, Layers, PhoneCall, ExternalLink,
  Bot, RefreshCw, BarChart3, HelpCircle, Star, Sliders,
  Workflow, Cpu, Settings, Smartphone, Award, Target, Rocket
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
  title: 'GoHighLevel (GHL) Automation Services',
  heroEyebrow: 'GOHIGHLEVEL AUTOMATION SERVICES',
  heroTitle: 'Turn missed leads into automated follow-ups & booked conversations',
  heroDesc: 'Cubixsol designs and deploys custom GoHighLevel (GHL) workflows, snapshots, pipelines, and integrations that scale your operations without expanding headcounts.',
  heroPrimaryBtnText: 'Book a Discovery Call',
  heroSecondaryBtnText: 'View Case Studies',
  heroBadges: ['★ 4.9/5 Client Rating', '500+ Automated Workflows', 'HighLevel Certified Partner'],
  heroImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&h=800&q=80',

  // Problem Section
  problemEyebrow: 'WHERE REVENUE LEAKS',
  problemTitle: 'Most leads are lost after the first contact, not before it',
  problemDesc: 'Without automation, response times drag, follow-ups drop, and valuable prospect interest cools down before a sales rep even dials.',
  problemCards: [
    {
      icon: 'Clock',
      title: 'Delayed Response Times',
      desc: 'Leads go cold within 5 minutes. Without automated instant SMS/email triggers, speed-to-lead drops by over 80%.',
    },
    {
      icon: 'Users',
      title: 'Manual Pipeline Drag',
      desc: 'Sales reps waste up to 4 hours daily manually copying contacts, logging calls, and typing repetitive messages instead of closing.',
    },
    {
      icon: 'Layers',
      title: 'Disconnected Tools',
      desc: 'Funnels, calendar links, and CRM tools that do not talk to each other cause dropped prospects and missed revenue.',
    },
    {
      icon: 'TrendingUp',
      title: 'No Follow-Up Persistence',
      desc: 'Over 70% of conversions happen on follow-up 4 to 8, yet most businesses abandon leads after just 1 or 2 attempts.',
    },
  ],

  // Capabilities Grid (6 Cards)
  capabilitiesEyebrow: 'WHAT WE BUILD',
  capabilitiesTitle: 'GHL systems that connect funnels, CRM and automation seamlessly',
  capabilitiesDesc: 'Modular, reliable architectures built to convert traffic into booked calls and ongoing revenue.',
  capabilitiesCards: [
    {
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'Agency Scalability',
      title: 'Turnkey Agency Snapshots',
      desc: 'Pre-built, niche-specific funnels, custom fields, trigger links, and email/SMS workflows ready for 1-click sub-account deployment.',
      pills: ['Custom Values', '1-Click Deploy', 'Funnels & Triggers'],
    },
    {
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'Speed to Lead',
      title: 'Automated Multi-Channel Follow-ups',
      desc: 'Behavior-driven sequences across SMS, email, WhatsApp, and ringless voicemail drops timed perfectly around prospect engagement.',
      pills: ['Instant SMS Triggers', 'Drip Sequences', 'Smart Delays'],
    },
    {
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'Zero No-Shows',
      title: 'Smart Calendar & Booking Funnels',
      desc: 'Frictionless scheduling with automatic timezone detection, deposit collection, round-robin staff distribution, and automated reminders.',
      pills: ['Round-Robin Routing', 'Stripe Deposit', 'SMS Confirmations'],
    },
    {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'Custom Connectivity',
      title: 'Custom Webhook & API Integrations',
      desc: 'Connect HighLevel with Stripe, Shopify, WordPress, Zapier, Make, custom databases, and proprietary SaaS platforms.',
      pills: ['Two-Way Sync', 'Custom Webhooks', 'REST APIs'],
    },
    {
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'Sales Velocity',
      title: 'Pipeline & Deal Stage Automation',
      desc: 'Visual drag-and-drop pipelines with automated status progression, task assignments, team notifications, and revenue tracking.',
      pills: ['Automated Tasks', 'Deal Stages', 'Revenue Tracking'],
    },
    {
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'Social Proof',
      title: 'Review & Reputation Management',
      desc: 'Automated post-purchase review requests on Google, Trustpilot, and Facebook to systematically build dominant social proof.',
      pills: ['Google Reviews', 'Review Gate Filter', 'SMS Invitations'],
    },
  ],

  // Interactive Problem Solver Section
  fixFirstEyebrow: 'SOLVE YOUR BIGGEST BOTTLENECK',
  fixFirstTitle: 'What do you need GHL to fix first?',
  fixFirstDesc: 'Whether you want to automate agency client onboarding or supercharge inbound sales conversion, we tailor the exact automation setup for your goals.',
  fixFirstImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&h=600&q=80',
  fixFirstItems: [
    {
      id: 'appointments',
      title: 'I need more booked appointments',
      desc: 'Deploy instant speed-to-lead SMS within 60 seconds of form fill, automated calendar reminders, and automated no-show rebooking sequences.',
      tag: 'Instant Setup',
      solution: 'Automated Speed-to-Lead + Smart Calendar',
    },
    {
      id: 'agency',
      title: 'I want to onboard agency clients faster',
      desc: 'Master snapshot architecture that clones complete client setups in 1 click, with automated onboarding intake forms and custom values mapping.',
      tag: 'Scale Agency',
      solution: '1-Click Turnkey Snapshot System',
    },
    {
      id: 'crm',
      title: 'Our CRM data is chaotic & messy',
      desc: 'Complete audit and restructuring of custom fields, tag architectures, duplicate management, and clean stage transitions.',
      tag: 'Data Cleanup',
      solution: 'Full Pipeline & Tag Restructuring',
    },
    {
      id: 'reactivation',
      title: 'We need to reactivate past cold leads',
      desc: 'Run targeted, high-converting 9-word email & SMS reactivation campaigns that generate immediate qualified pipeline from existing databases.',
      tag: 'Fast ROI',
      solution: 'Database Reactivation Engine',
    },
  ],

  // Process / Roadmap Section
  processEyebrow: 'HOW WE WORK',
  processTitle: 'From scattered leads to a working automation system',
  processDesc: 'A structured 5-step engineering sprint from architecture audit to live deployment.',
  processSteps: [
    {
      step: '01',
      title: 'Audit & Architecture',
      desc: 'We map your existing lead sources, tools, bottlenecks, and design a custom end-to-end automation blueprint.',
    },
    {
      step: '02',
      title: 'Snapshot Build & Setup',
      desc: 'Configure custom fields, pipelines, calendar routing, user roles, phone numbers, and email/SMS compliance.',
    },
    {
      step: '03',
      title: 'Workflow Engineering',
      desc: 'Build multi-branch trigger workflows, smart delays, conditional logic, dynamic custom values, and notification webhooks.',
    },
    {
      step: '04',
      title: 'Integration & Testing',
      desc: 'Connect payment gateways, ad accounts, webhooks, and perform rigorous end-to-end sandbox testing.',
    },
    {
      step: '05',
      title: 'Go-Live & Team Training',
      desc: 'Seamless production launch, domain verification, and step-by-step video SOP documentation for your team.',
    },
  ],

  // Engagement / Working Models (3 Cards)
  modelsEyebrow: 'COLLABORATION MODELS',
  modelsTitle: 'Three ways to work with us on GHL',
  modelsDesc: 'Choose the level of support that best fits your agency, business size, or technical requirements.',
  models: [
    {
      number: '1',
      title: 'Custom Build Sprint',
      desc: 'For businesses that need a complete, bespoke GHL automation system built and launched from scratch with zero tech headaches.',
      features: [
        'Bespoke Architecture Design',
        'Custom Funnels & Pipelines',
        'Multi-Channel Workflows',
        '3rd-Party Integrations',
        'Team Handover & Training',
      ],
      ctaText: 'Start Build Sprint',
    },
    {
      number: '2',
      title: 'Dedicated Monthly Retainer',
      desc: 'For growing businesses that want ongoing automation improvements, new campaigns, and continuous technical management.',
      features: [
        'Continuous Workflow Optimization',
        'A/B Testing & Funnel Refinement',
        'New Campaign Setup',
        'Priority Technical Support',
        'Monthly Strategy Reviews',
      ],
      ctaText: 'Explore Retainers',
      isPopular: true,
    },
    {
      number: '3',
      title: 'White-Label Agency Partner',
      desc: 'For marketing agencies that want to deliver high-ticket GHL setups and sub-accounts to clients under their own brand.',
      features: [
        'Turnkey Client Snapshots',
        'Sub-Account Provisioning',
        'White-Label Onboarding',
        'Custom Webhooks & APIs',
        'Behind-The-Scenes Tech Team',
      ],
      ctaText: 'Partner With Us',
    },
  ],

  // Spectrum / Features Tabs
  spectrumEyebrow: 'ALL-IN-ONE AUTOMATION',
  spectrumTitle: 'Everything needed to capture, nurture and track leads',
  spectrumDesc: 'We utilize every capability inside and outside the HighLevel ecosystem to create seamless customer experiences.',
  spectrumTabs: [
    { id: 'funnels', label: 'Funnels', title: 'High-Converting Landing Pages & Forms', desc: 'Custom branded landing pages, multi-step forms, and popups engineered for maximum conversion.' },
    { id: 'crm', label: 'CRM', title: 'Smart Pipelines & Contact Management', desc: 'Centralize every lead interaction, conversation history, notes, and tasks in a clean unified view.' },
    { id: 'automation', label: 'Automation', title: 'Intelligent Multi-Branch Workflows', desc: 'Automate repetitive tasks with conditional if/else logic, webhook triggers, and automated follow-ups.' },
    { id: 'marketing', label: 'Marketing', title: 'Multi-Channel Outreach & Drips', desc: 'Engage prospects on SMS, Email, WhatsApp, and Voice with automated personalization.' },
    { id: 'tracking', label: 'Tracking', title: 'Attribution & Revenue Dashboards', desc: 'Track exactly which ad channels, keywords, and campaigns generate closed deals and revenue.' },
  ],

  // Case Studies / Real Outcomes (3 Cards)
  outcomesEyebrow: 'PROVEN TRACK RECORD',
  outcomesTitle: 'Real work, real clients, real measurable outcomes',
  outcomesDesc: 'Explore how we helped businesses scale bookings and automate operations with GoHighLevel.',
  outcomeCards: [
    {
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=700&h=450&q=80',
      client: 'Dental & Aesthetics Clinic',
      metric: '+310%',
      metricLabel: 'Increase in Booked Appointments',
      title: 'Automated Speed-to-Lead & Smart SMS Booking Funnel',
      desc: 'Replaced manual phone call follow-ups with instant 60-second SMS triggers and automated calendar scheduling, eliminating lead drop-off completely.',
      results: ['Response time reduced from 4 hours to 45 seconds', 'Zero calendar no-shows with automated SMS reminders', '94% automated booking rate'],
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=700&h=450&q=80',
      client: 'B2B Growth Agency',
      metric: '4.5x',
      metricLabel: 'Faster Client Onboarding Capacity',
      title: 'Master Turnkey Agency Snapshot Architecture',
      desc: 'Built custom niche snapshots that allowed the agency to deploy complete sub-accounts for new clients in under 5 minutes with zero manual setup.',
      results: ['Onboarding time slashed from 3 days to 5 minutes', 'Scaled from 20 to 110+ active agency clients', 'Zero setup bugs across accounts'],
    },
    {
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&h=450&q=80',
      client: 'Home Services Network',
      metric: '$140K',
      metricLabel: 'Revenue from Cold Database Reactivation',
      title: 'Conversational 9-Word SMS Reactivation Campaign',
      desc: 'Designed dynamic behavioral SMS campaigns that revived 12,000 inactive leads into active estimates and closed contracts within 30 days.',
      results: ['28% response rate from cold leads', 'Over 180 qualified estimates booked', '64x ROI in first 3 weeks'],
    },
  ],

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
    metaTitle: 'GoHighLevel (GHL) Automation Services | Cubixsol',
    metaDescription: 'Expert GoHighLevel (GHL) automation services. Custom snapshots, CRM pipelines, instant speed-to-lead SMS, and API integrations.',
    keywords: 'GoHighLevel automation, GHL consultant, HighLevel snapshot, CRM automation, speed to lead, workflow automation',
  },
};

export default function GoHighLevelAutomation() {
  const { openModal } = useEstimateModal();
  const [data, setData] = useState(DEFAULT_DATA);
  const [activeTab, setActiveTab] = useState('funnels');
  const [selectedFix, setSelectedFix] = useState('appointments');
  const [openFaq, setOpenFaq] = useState(0);

  // SEO Metadata
  useSEO(
    data.seo?.metaTitle || data.title,
    data.seo?.metaDescription || data.heroDesc,
    data.seo?.keywords,
    data.heroImage
  );

  useEffect(() => {
    // Attempt dynamic fetch from MongoDB
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
            spectrumTabs: res.spectrumTabs || prev.spectrumTabs,
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
                    className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-700 hover:to-red-800 shadow-lg shadow-rose-500/25 hover:shadow-rose-500/35 transition-all duration-300 text-base"
                  >
                    <span>{data.heroPrimaryBtnText}</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>

                  <motion.a
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    href="#case-studies"
                    className="inline-flex items-center gap-2 px-6 py-4 rounded-xl font-semibold text-gray-700 bg-white border border-gray-200 hover:border-rose-300 hover:bg-rose-50/50 hover:text-rose-700 shadow-sm transition-all duration-200 text-base"
                  >
                    <span>{data.heroSecondaryBtnText}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </motion.a>
                </div>
              </Reveal>

              {/* Trust Badges */}
              <Reveal delay={0.4} duration={0.65}>
                <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-rose-100/80">
                  {data.heroBadges?.map((badge, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-600">
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

                  {/* Floating Scroll Micro-Badges */}
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

      {/* ===================== PROBLEM / AGITATION SECTION ===================== */}
      <section className="py-20 bg-gray-50/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal direction="up" duration={0.6}>
              <p className="text-xs font-bold tracking-widest uppercase text-rose-600 mb-3">{data.problemEyebrow}</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ink leading-tight mb-4">
                {data.problemTitle}
              </h2>
              <p className="text-base sm:text-lg text-gray-500">
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

      {/* ===================== CAPABILITIES GRID SECTION (6 CARDS) ===================== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal direction="up" duration={0.6}>
              <p className="text-xs font-bold tracking-widest uppercase text-rose-600 mb-3">{data.capabilitiesEyebrow}</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink leading-tight mb-4">
                {data.capabilitiesTitle}
              </h2>
              <p className="text-base sm:text-lg text-gray-500">
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

      {/* ===================== INTERACTIVE PROBLEM SOLVER ("What do you need GHL to fix first?") ===================== */}
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
                    <p className="text-xs font-bold text-rose-600 uppercase tracking-wide">Selected Focus Area</p>
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
                            <span>Recommended: {item.solution}</span>
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

      {/* ===================== IMPLEMENTATION ROADMAP SECTION ===================== */}
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
                    onClick={() => openModal({ service: 'GoHighLevel Automation Sprint' })}
                    className="w-full py-3.5 px-6 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm inline-flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 transition-all duration-200"
                  >
                    <span>Start Automation Sprint</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </Reveal>
            </div>

            {/* Right 5 Steps Timeline with Staggered Scroll Reveal */}
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

      {/* ===================== THREE WAYS TO WORK WITH US (MODELS) ===================== */}
      <section className="py-24 bg-gradient-to-b from-white via-rose-50/25 to-white border-y border-rose-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal direction="up" duration={0.6}>
              <p className="text-xs font-bold tracking-widest uppercase text-rose-600 mb-3">{data.modelsEyebrow}</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink leading-tight mb-4">
                {data.modelsTitle}
              </h2>
              <p className="text-base sm:text-lg text-gray-500">
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
                    className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200 ${
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

      {/* ===================== FEATURE SPECTRUM TABS SECTION ===================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Reveal direction="up" duration={0.6}>
              <p className="text-xs font-bold tracking-widest uppercase text-rose-600 mb-3">{data.spectrumEyebrow}</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ink leading-tight mb-4">
                {data.spectrumTitle}
              </h2>
              <p className="text-base text-gray-500">
                {data.spectrumDesc}
              </p>
            </Reveal>
          </div>

          {/* Tab Buttons with Animated layoutId Indicator */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
            {data.spectrumTabs?.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                    isActive ? 'text-white' : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeGhlTab"
                      className="absolute inset-0 bg-rose-600 rounded-xl shadow-md shadow-rose-600/20"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Display with AnimatePresence */}
          <div className="bg-gradient-to-br from-rose-50/50 to-amber-50/30 rounded-3xl p-8 sm:p-12 border border-rose-100 overflow-hidden">
            <AnimatePresence mode="wait">
              {data.spectrumTabs
                ?.filter((t) => t.id === activeTab)
                .map((current) => (
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35 }}
                    className="grid md:grid-cols-2 gap-8 items-center"
                  >
                    <div>
                      <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">Capability Highlight</span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-ink mt-1 mb-4">{current.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-base mb-6">{current.desc}</p>
                      <button
                        onClick={() => openModal({ service: `GHL Feature: ${current.label}` })}
                        className="inline-flex items-center gap-2 text-rose-600 font-bold hover:text-rose-700 transition"
                      >
                        <span>Explore this module</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="rounded-2xl bg-white p-6 border border-rose-100 shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
                          <Sliders className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-ink">Built for Scale</p>
                          <p className="text-xs text-gray-400">Production-Ready Standards</p>
                        </div>
                      </div>
                      <ul className="space-y-2.5 text-xs sm:text-sm text-gray-600">
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" /> Enterprise data encryption & GDPR/HIPAA compliance</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" /> Sub-50ms trigger execution via HighLevel webhooks</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" /> Modular snapshot deployment with variable parameters</li>
                      </ul>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ===================== CASE STUDIES / REAL OUTCOMES SECTION ===================== */}
      <section id="case-studies" className="py-24 bg-gray-50/60 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Reveal direction="up" duration={0.6}>
              <p className="text-xs font-bold tracking-widest uppercase text-rose-600 mb-3">{data.outcomesEyebrow}</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink leading-tight mb-4">
                {data.outcomesTitle}
              </h2>
              <p className="text-base sm:text-lg text-gray-500">
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
                      <div className="mb-4">
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
                        onClick={() => openModal({ service: `Case Study: ${card.client}` })}
                        className="w-full py-2.5 rounded-xl border border-rose-200 text-rose-600 font-bold text-xs hover:bg-rose-50 transition"
                      >
                        Request Case Study Breakdown
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
                      className="w-full px-6 py-5 text-left font-bold text-ink flex items-center justify-between gap-4 hover:bg-gray-50/80 transition"
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

      {/* ===================== BOTTOM CTA BANNER ===================== */}
      <CtaBanner
        eyebrow="READY TO AUTOMATE YOUR REVENUE?"
        title="Ready to discuss your next website, app or automation project?"
        desc="Book a free discovery call with our GoHighLevel specialists to map out your custom automation roadmap."
        primaryButtonText="Book a Discovery Call"
        primaryButtonAction={() => openModal({ service: 'GoHighLevel Automation Discovery' })}
        secondaryButtonText="Start a Project"
        secondaryButtonLink="/contact"
      />
    </div>
  );
}

