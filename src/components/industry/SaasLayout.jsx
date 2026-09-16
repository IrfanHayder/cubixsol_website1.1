import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cloud, Server, Layers, Key, CreditCard, CheckCircle2,
  Zap, Code2, Users, Database, Terminal, Shield, ArrowRight,
  TrendingUp, Sparkles, Sliders, RefreshCw, Lock, Check,
  ShieldCheck, Activity, Cpu, Rocket, Boxes, Laptop, Globe,
  Building2
} from 'lucide-react';
import Reveal, { Stagger, StaggerItem } from '../Reveal';
import { formatInline } from '../../utils/formatText';

const SAAS_IMAGES = {
  cloud: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&h=700&q=75',
  dashboard: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&h=700&q=75',
  collaboration: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&h=700&q=75',
  devtools: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=900&h=600&q=75',
};

const workVisual = [
  { img: SAAS_IMAGES.cloud, icon: Database, key: 0, label: 'PostgreSQL Multi-Tenancy' },
  { img: SAAS_IMAGES.dashboard, icon: CreditCard, key: 1, label: 'Metered Billing & Usage' },
  { img: SAAS_IMAGES.collaboration, icon: Key, key: 2, label: 'Enterprise SSO & SCIM' },
  { img: SAAS_IMAGES.devtools, icon: Sliders, key: 3, label: 'Feature Flags & Telemetry' },
];

export default function SaasLayout({ industry }) {
  const [activeLayer, setActiveLayer] = useState(0);
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [tenantState, setTenantState] = useState({
    status: 'Provisioned & Live',
    tenantId: 'tenant_enterprise_492',
    isolation: '100% RLS Isolated',
    latency: '14ms',
    sso: 'Okta SAML 2.0 Active'
  });

  const runProvisioningSim = () => {
    setIsProvisioning(true);
    setTenantState({
      status: 'Spooling Tenant Pod...',
      tenantId: `tenant_${Math.random().toString(36).substring(2, 8)}`,
      isolation: 'Allocating RLS Namespace...',
      latency: '...',
      sso: 'Binding SAML Metadata...'
    });
    setTimeout(() => {
      setIsProvisioning(false);
      setTenantState({
        status: 'Provisioned & Live',
        tenantId: `tenant_prod_${Math.floor(Math.random() * 800) + 100}`,
        isolation: '100% RLS Isolated',
        latency: `${Math.floor(Math.random() * 10) + 12}ms`,
        sso: 'Okta SAML 2.0 Active'
      });
    }, 850);
  };

  // 1. SaaS & Technology Software We Build
  const solutionsTitle = industry.solutionsTitle || 'SaaS & Technology Software We Build';
  const solutionsSubtitle = industry.solutionsSubtitle || 'From MVP development to complete SaaS ecosystems, we create solutions that help businesses launch faster and adapt to changing market needs.';
  const solutionsItems = Array.isArray(industry.solutionsItems) && industry.solutionsItems.length > 0
    ? industry.solutionsItems
    : [
        {
          title: 'SaaS MVP Development',
          body: 'We build MVP solutions that transform ideas into functional SaaS products. Our MVP development process focuses on essential features, user validation, and faster market entry while creating a foundation for future growth.',
        },
        {
          title: 'Multi-Tenant SaaS Architecture',
          body: 'Our team builds multi-tenant SaaS platforms that let multiple customers use the same application securely. We design flexible architectures with efficient resource management, data separation, and scalable performance.',
        },
        {
          title: 'Subscription & Billing Systems',
          body: 'We create subscription-based platforms with integrated payment workflows, automated billing, pricing plans, and customer management features. Our solutions support flexible revenue models for SaaS businesses.',
        },
        {
          title: 'SaaS Application Development',
          body: 'Our SaaS application development services cover web platforms, enterprise solutions, and industry-specific software products. We build applications with reliable performance, modern interfaces, and cloud-ready infrastructure.',
        },
      ];

  // 2. SaaS Use Cases & Business Solutions (Work Areas)
  const workAreasTitle = industry.workAreasTitle || 'SaaS Use Cases & Business Solutions';
  const workAreas = Array.isArray(industry.workAreas) && industry.workAreas.length > 0
    ? industry.workAreas
    : [
        {
          title: 'B2B SaaS Platforms',
          body: 'We develop cloud-based SaaS solutions that help businesses automate operations, streamline workflows, and improve team collaboration through centralised platforms.',
        },
        {
          title: 'Vertical SaaS Solutions',
          body: 'Our experts create industry-specific SaaS applications designed around unique business processes, customer requirements, and specialised market needs.',
        },
        {
          title: 'Enterprise SaaS Applications',
          body: 'We create scalable enterprise solutions that support complex operations, multiple user roles, advanced reporting, and secure data management.',
        },
        {
          title: 'Customer Management Platforms',
          body: 'Our SaaS solutions help businesses manage customer relationships, improve communication, and deliver better experiences through organised digital workflows.',
        },
        {
          title: 'Internal Business Automation Tools',
          body: 'We build custom SaaS platforms that automate repetitive tasks, optimise internal processes, and improve productivity across different departments.',
        },
        {
          title: 'Product-Led Growth Features',
          body: 'We develop onboarding flows, analytics dashboards, self-service options, and engagement features that support user adoption and long-term SaaS growth.',
        },
      ];

  // 3. Technologies We Use for SaaS Development (Tech Stack)
  const techTitle = industry.techTitle || 'Technologies We Use for SaaS Development';
  const techItems = Array.isArray(industry.techItems) && industry.techItems.length > 0
    ? industry.techItems
    : [
        {
          title: 'React & Modern Frontend Frameworks',
          desc: 'React and modern frontend frameworks for responsive user experiences.',
        },
        {
          title: 'Node.js & Backend Architecture',
          desc: 'Node.js and backend technologies for scalable application logic.',
        },
        {
          title: 'AWS Cloud Services',
          desc: 'AWS cloud services for reliable infrastructure.',
        },
        {
          title: 'PostgreSQL Databases',
          desc: 'PostgreSQL databases for secure and structured data management.',
        },
        {
          title: 'Stripe & Payment Gateways',
          desc: 'Stripe and payment APIs for subscription-based platforms.',
        },
      ];

  // 4. Why SaaS Teams Choose Cubixsol
  const whyChooseTitle = industry.whyChooseTitle || 'Why SaaS Teams Choose Cubixsol';
  const whyChooseItems = Array.isArray(industry.whyChooseItems) && industry.whyChooseItems.length > 0
    ? industry.whyChooseItems
    : [
        {
          title: 'Experience With Modern SaaS Architecture',
          desc: 'Our developers understand SaaS requirements, including cloud infrastructure, subscription models, and scalable application design.',
        },
        {
          title: 'Flexible Development Approach',
          desc: 'We build solutions that adapt to changing business needs, new features, and increasing customer demands.',
        },
        {
          title: 'Security-Focused Solutions',
          desc: 'Our development process prioritizes secure coding practices, data protection, and reliable system performance.',
        },
        {
          title: 'Continuous Technical Support',
          desc: 'Cubixsol provides ongoing improvements, maintenance, and technical guidance after product launch.',
        },
      ];

  const architectureLayers = [
    {
      id: 0,
      title: 'Tenant Isolation & Row-Level Security',
      badge: 'Database Isolation Layer',
      icon: Database,
      desc: 'Encrypted schema isolation with PostgreSQL RLS (Row Level Security) and tenant-aware connection pooling, ensuring strict data boundaries without dedicated server overhead.',
      points: ['PostgreSQL RLS security policies', 'Automated tenant backup snapshotting', 'Subdomain routing (tenant.app.com)'],
      stats: { label: 'Isolation Guarantee', value: '100% RLS' },
      codeSnippet: `// PostgreSQL Row Level Security (RLS) Policy
ALTER TABLE organization_workspaces ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_policy ON organization_workspaces
  FOR ALL
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid);

// Connection Pool Middleware
await db.$setTenantContext(req.session.tenantId);`,
    },
    {
      id: 1,
      title: 'Metered Billing & Stripe Usage Hooks',
      badge: 'Revenue Infrastructure',
      icon: CreditCard,
      desc: 'Scalable subscription billing engine supporting tiered seat allocation, automated API credit consumption meters, proration handling, and self-serve enterprise checkout.',
      points: ['Real-time usage aggregation worker', 'Stripe Tax & automated invoice delivery', 'Automated dunning email recovery flows'],
      stats: { label: 'Billing Accuracy', value: '99.999%' },
      codeSnippet: `// Stripe Metered Usage Reporter
await stripe.subscriptionItems.createUsageRecord(
  subscriptionItemId,
  {
    quantity: event.apiCallsCount,
    timestamp: Math.floor(Date.now() / 1000),
    action: 'increment'
  }
);`,
    },
    {
      id: 2,
      title: 'Enterprise SSO, SAML 2.0 & SCIM Sync',
      badge: 'Enterprise Security',
      icon: Key,
      desc: 'One-click enterprise identity federation supporting Okta, Azure AD, and Google Workspace, complete with automated SCIM user provisioning and role-based access control (RBAC).',
      points: ['SAML 2.0 & OpenID Connect endpoints', 'SCIM 2.0 auto-provisioning & de-provisioning', 'Tamper-evident audit trail activity logs'],
      stats: { label: 'Enterprise Ready', value: 'SOC 2 Ready' },
      codeSnippet: `// Enterprise SAML SSO Assertion Consumer
const user = await samlClient.validateAssertion(req.body.SAMLResponse);
const tenantUser = await scimService.provisionUser({
  email: user.nameID,
  roles: user.attributes.groups,
  tenantId: req.tenant.id
});`,
    },
    {
      id: 3,
      title: 'Real-time Telemetry & Feature Flags',
      badge: 'Product Operations',
      icon: Sliders,
      desc: 'Granular feature flagging and canary deployment pipelines with LaunchDarkly, PostHog, and OpenTelemetry for zero-downtime progressive rollouts and retention analytics.',
      points: ['Zero-downtime canary deployments', 'Instant user segment targeting & A/B testing', 'Distributed tracing via OpenTelemetry'],
      stats: { label: 'Rollout Safety', value: 'Zero-Downtime' },
      codeSnippet: `// Progressive Feature Flag Evaluation
const isEnabled = await launchDarkly.variation(
  'enterprise-ai-copilot',
  { key: user.id, custom: { plan: tenant.planTier } },
  false
);
if (isEnabled) telemetry.track('ai_copilot_activated');`,
    },
  ];

  const solutionIcons = [Rocket, Boxes, CreditCard, Laptop];
  const useCaseIcons = [Building2, Layers, ShieldCheck, Users, RefreshCw, TrendingUp];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 🚀 1. SaaS & Technology Software We Build */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary-700 border border-primary-200 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-primary-600" />
            <span>SaaS Solutions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-3">
            {solutionsTitle}
          </h2>
          {solutionsSubtitle && (
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {formatInline(solutionsSubtitle)}
            </p>
          )}
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {solutionsItems.map((item, idx) => {
            const Icon = solutionIcons[idx % solutionIcons.length];
            return (
              <motion.div
                key={item.title || idx}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="p-7 rounded-2xl bg-white border border-gray-100 shadow-card hover:border-primary-300 hover:shadow-elev transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-50 to-blue-50 border border-primary-100 flex items-center justify-center mb-5 text-primary-600 group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-ink mb-3 group-hover:text-primary-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed font-normal">
                    {formatInline(item.body || item.desc || '')}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 💻 2. Interactive Multi-Tenant Architecture Simulator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#1a1a2e] via-[#241f48] to-[#121824] rounded-3xl p-6 sm:p-10 lg:p-12 text-white border border-primary-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00a4d8]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#5d53a3]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00a4d8]/20 border border-[#00a4d8]/40 text-[#00a4d8] text-xs font-semibold mb-2">
                  <Cloud className="w-3.5 h-3.5" /> Interactive SaaS Architecture Simulator
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  High-Availability SaaS Multi-Tenant Engine
                </h3>
              </div>
              <button
                onClick={runProvisioningSim}
                disabled={isProvisioning}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#00a4d8] to-[#5d53a3] hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-lg transition-all active:scale-95 disabled:opacity-60"
              >
                <RefreshCw className={`w-4 h-4 ${isProvisioning ? 'animate-spin' : ''}`} />
                <span>{isProvisioning ? 'Provisioning Tenant...' : 'Simulate New Tenant Provisioning'}</span>
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
              {architectureLayers.map((mod) => {
                const isActive = activeLayer === mod.id;
                return (
                  <button
                    key={mod.id}
                    onClick={() => setActiveLayer(mod.id)}
                    className={`p-3 sm:p-4 rounded-xl text-left border transition-all flex flex-col justify-between ${
                      isActive
                        ? 'bg-white/15 border-[#00a4d8] shadow-lg text-white'
                        : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold truncate">{mod.title.split('&')[0]}</span>
                      <span className="text-[10px] font-mono font-bold text-[#00a4d8]">0{mod.id + 1}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 truncate">{mod.badge}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Tab Showcase */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLayer}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid lg:grid-cols-12 gap-6 items-center bg-black/40 rounded-2xl border border-white/10 p-6 backdrop-blur-md"
              >
                <div className="lg:col-span-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded text-xs font-bold bg-[#00a4d8]/20 text-[#00a4d8] border border-[#00a4d8]/30">
                      {architectureLayers[activeLayer].badge}
                    </span>
                    <span className="text-xs font-mono font-bold text-purple-300">
                      Guarantee: {architectureLayers[activeLayer].stats.value}
                    </span>
                  </div>
                  <h4 className="text-xl font-extrabold text-white">
                    {architectureLayers[activeLayer].title}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {architectureLayers[activeLayer].desc}
                  </p>
                  <div className="space-y-2 pt-2">
                    {architectureLayers[activeLayer].points.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-200">
                        <CheckCircle2 className="w-4 h-4 text-[#00a4d8] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Code & Live Status Pane */}
                <div className="lg:col-span-6 space-y-3">
                  <div className="bg-[#0f172a] rounded-xl border border-white/10 p-4 font-mono text-xs text-gray-300 overflow-x-auto shadow-inner">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[11px] text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block" />
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
                        <span className="ml-2 font-bold text-gray-200">cubixsol-saas-core.ts</span>
                      </span>
                      <span className="text-[#00a4d8]">{architectureLayers[activeLayer].stats.label}</span>
                    </div>
                    <pre className="text-[11px] sm:text-xs text-cyan-300 leading-relaxed">
                      {architectureLayers[activeLayer].codeSnippet}
                    </pre>
                  </div>

                  {/* Live Telemetry Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-gray-400 text-[10px]">Status</p>
                      <p className="font-bold text-[#00a4d8] truncate">{tenantState.status}</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-gray-400 text-[10px]">Tenant ID</p>
                      <p className="font-bold text-white truncate">{tenantState.tenantId}</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-gray-400 text-[10px]">Query Latency</p>
                      <p className="font-bold text-green-400 truncate">{tenantState.latency}</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-gray-400 text-[10px]">Identity / SSO</p>
                      <p className="font-bold text-purple-300 truncate">{tenantState.sso}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 🏢 3. SaaS Use Cases & Business Solutions (Work Areas) */}
      <section className="bg-slate-50/70 py-16 sm:py-24 border-y border-gray-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-primary-700 border border-primary-200 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
              <Boxes className="w-3.5 h-3.5 text-primary-600" />
              <span>Use Cases &amp; Solutions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-3">
              {workAreasTitle}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Tailored SaaS product engineering designed around real business operations and commercial scalability.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workAreas.map((w, idx) => {
              const Icon = useCaseIcons[idx % useCaseIcons.length];
              return (
                <motion.div
                  key={w.title || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="p-7 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-primary-300 hover:shadow-card transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3.5 mb-4">
                      <span className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 border border-primary-100 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </span>
                      <h3 className="text-lg font-bold text-ink leading-snug">{w.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed font-normal">
                      {formatInline(w.body || w.desc || '')}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ⚙️ 4. Technologies We Use for SaaS Development (Tech Stack) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-primary-50/70 via-blue-50/40 to-white border border-primary-100/80 shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold text-primary-600 uppercase tracking-wider block mb-1">
              Tech Stack
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              {techTitle}
            </h3>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              We use modern technology stacks to create dependable, performant SaaS products.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {techItems.map((tech, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white border border-primary-100 shadow-sm hover:border-primary-300 hover:shadow-card transition-all"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-7 h-7 rounded-lg bg-primary-100/60 text-primary-700 flex items-center justify-center shrink-0">
                    <Code2 className="w-4 h-4 text-primary-600" />
                  </span>
                  <h4 className="font-bold text-ink text-sm sm:text-base">{tech.title}</h4>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🏆 5. Why SaaS Teams Choose Cubixsol */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary-700 border border-primary-200 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-primary-600" />
            <span>Why Cubixsol</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-3">
            {whyChooseTitle}
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {whyChooseItems.map((item, idx) => (
            <motion.div
              key={item.title || idx}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-2xl bg-white border border-gray-100 shadow-card hover:border-primary-300 hover:shadow-elev transition-all flex flex-col justify-between"
            >
              <div>
                <span className="w-8 h-8 rounded-lg bg-primary-50 text-primary-600 font-mono font-bold text-xs flex items-center justify-center mb-4 border border-primary-100">
                  0{idx + 1}
                </span>
                <h3 className="font-bold text-ink text-base mb-2">{item.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed font-normal">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
