import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Cloud, Server, Layers, Key, CreditCard, CheckCircle2,
  Zap, Code2, Users, Database, Terminal, Shield, ArrowRight,
  TrendingUp, Sparkles, Sliders, RefreshCw, Lock, Check,
  ShieldCheck, Activity, Cpu
} from 'lucide-react';
import Reveal, { Stagger, StaggerItem } from '../Reveal';

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

  const approachTitle = industry.approachTitle || 'The Cubixsol Approach to SaaS & Cloud Platforms';
  const approachItems = industry.approachItems && industry.approachItems.length > 0 ? industry.approachItems : [
    {
      title: 'We Architect for Multi-Tenancy & Isolation',
      subtitle: 'Our cloud architects and SaaS systems engineers build multi-tenant backends that are:',
      points: [
        { heading: 'Row-Level Secure', text: 'PostgreSQL RLS and schema isolation guaranteeing zero cross-tenant data leakage.' },
        { heading: 'Subdomain Automated', text: 'Instant dynamic DNS tenant routing (tenant.yourplatform.com) with automated TLS certificates.' },
        { heading: 'High-Throughput Pool', text: 'Tenant-aware connection pooling and Redis caching for sub-20ms database queries.' },
      ],
    },
    {
      title: 'We Implement Frictionless Monetization & Billing',
      subtitle: 'From product-led growth freemium models to complex enterprise contracts, we build:',
      points: [
        { heading: 'Stripe & Paddle Metering', text: 'Real-time usage aggregation, tiered seat management, and self-serve upgrade flows.' },
        { heading: 'Automated Dunning', text: 'Smart credit card retry logic and automated email recovery flows that reduce involuntary churn.' },
        { heading: 'Global Tax Compliance', text: 'Automated sales tax and VAT calculation via Stripe Tax and TaxJar integration.' },
      ],
    },
    {
      title: 'We Accelerate Product-Led Growth & Retention',
      subtitle: 'We embed behavioral analytics and activation loops directly into the application UX:',
      points: [
        { heading: 'Self-Serve Onboarding', text: 'Interactive product walkthroughs and checklist empty-states that cut time-to-value to minutes.' },
        { heading: 'Feature Flag Canary', text: 'LaunchDarkly and PostHog integration for progressive rollouts and zero-downtime releases.' },
        { heading: 'Enterprise Security Ready', text: 'One-click Okta, Azure AD, and Google Workspace SAML SSO with automated SCIM provisioning.' },
      ],
    },
  ];

  const solutionsTitle = industry.solutionsTitle || 'Our SaaS & Cloud Architecture Solutions';
  const solutionsSubtitle = industry.solutionsSubtitle || 'Enterprise multi-tenant microservices, automated subscription engines, SSO/SCIM security, and real-time product telemetry engineered to scale seamlessly.';
  const solutionsItems = industry.solutionsItems && industry.solutionsItems.length > 0 ? industry.solutionsItems : [
    {
      title: 'Multi-Tenant Cloud Infrastructure & PostgreSQL RLS',
      body: 'Distributed multi-tenant database clusters with Row-Level Security, custom tenant subdomains, automated database backup snapshots, and zero-downtime migrations.',
    },
    {
      title: 'Subscription Monetization, Stripe Billing & Usage Meters',
      body: 'Custom billing portals with seat allocation, metered API usage tracking, automated invoice generation, proration calculations, and self-serve tier upgrades.',
    },
    {
      title: 'Enterprise SSO, SAML 2.0 & Role-Based Access Control',
      body: 'Universal identity orchestration supporting Okta, Azure AD, Google Workspace, automated SCIM user provisioning, and granular RBAC permission matrices.',
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

  const workAreas = industry.workAreas || [];
  const products = industry.productsBuilt || [];
  const cases = industry.caseStudies || [];
  const services = industry.servicesWeOffer || [];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. The Approach Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-50 text-primary-700 border border-primary-200 mb-3">
            Strategic Methodology
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight">
            {approachTitle}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {approachItems.map((item, idx) => (
            <motion.div
              key={item.title || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-2xl p-7 sm:p-8 border border-gray-100 shadow-card hover:border-primary-300 hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                {/* Red Indicator Stripe as per design system */}
                <div className="h-1.5 w-16 bg-red-600 rounded-full mb-6" />
                <h3 className="text-xl font-bold text-ink mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  {item.subtitle}
                </p>
                <div className="space-y-4">
                  {item.points?.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-600 mt-2 shrink-0" />
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                        <strong className="text-ink font-semibold">{pt.heading}:</strong>{' '}
                        {pt.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 2. Solutions Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-50 text-primary-700 border border-primary-200 mb-3">
            SaaS Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-4">
            {solutionsTitle}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            {solutionsSubtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {solutionsItems.map((sol, idx) => (
            <motion.div
              key={sol.title || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-card hover:border-primary-300 hover:shadow-xl transition-all flex flex-col overflow-hidden group"
            >
              {/* Top Accent Gradient Bar */}
              <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-[#00a4d8] to-[#5d53a3]" />
              <div className="p-7 sm:p-8 flex-1 flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  {idx === 0 ? <Database className="w-6 h-6" /> : idx === 1 ? <CreditCard className="w-6 h-6" /> : <Key className="w-6 h-6" />}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-ink mb-3 group-hover:text-primary-600 transition-colors">
                  {sol.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-1">
                  {sol.body}
                </p>
                <div className="pt-4 border-t border-gray-100 flex items-center text-xs font-bold text-primary-600 group-hover:text-primary-700">
                  <span>Explore Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. SaaS High Impact Visual Band */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-primary-100/60 bg-gradient-to-br from-slate-900 via-[#1a1a2e] to-[#241f48] text-white p-8 sm:p-12">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#00a4d8]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#5d53a3]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold uppercase tracking-wider text-[#00a4d8]">
                <Sparkles className="w-3.5 h-3.5 text-[#00a4d8]" /> Multi-Tenant Cloud Engineering
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white">
                Engineered to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a4d8] to-purple-300">Onboard, Retain &amp; Scale</span>
              </h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                From initial zero-to-one MVP launch to self-serve enterprise billing, automated Okta SAML SSO, and high-velocity product iterations, we build software foundations that support millions in ARR.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 border border-white/15 text-xs font-semibold text-white">
                  <Check className="w-4 h-4 text-[#00a4d8]" /> PostgreSQL RLS
                </div>
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 border border-white/15 text-xs font-semibold text-white">
                  <Check className="w-4 h-4 text-[#00a4d8]" /> Stripe Metered API
                </div>
                <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 border border-white/15 text-xs font-semibold text-white">
                  <Check className="w-4 h-4 text-[#00a4d8]" /> SAML 2.0 / SCIM
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-3 sm:gap-4">
              {workVisual.map((item) => (
                <div
                  key={item.key}
                  className="relative group rounded-2xl overflow-hidden border border-white/10 bg-white/5 aspect-[4/3] shadow-lg"
                >
                  <img
                    src={item.img}
                    alt={item.label}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-3.5 sm:p-4">
                    <div className="flex items-center gap-2 text-white font-bold text-xs sm:text-sm">
                      <div className="w-6 h-6 rounded-lg bg-primary-600/80 backdrop-blur-sm flex items-center justify-center shrink-0">
                        <item.icon className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="truncate">{item.label}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Multi-Tenant Architecture & Telemetry Simulator */}
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

      {/* 5. SaaS Standards & Security Compliance Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-50 text-primary-700 border border-primary-200 mb-3">
            Standards &amp; Frameworks
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
            Enterprise SaaS Compliance &amp; Integrations
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: 'PostgreSQL Row-Level Security',
              desc: 'Cryptographic schema and row isolation ensuring zero cross-tenant data bleed across multi-tenant databases.',
              badge: 'Data Security',
            },
            {
              title: 'Stripe Billing & Tax Engine',
              desc: 'Automated recurring billing, tiered seat allocation, usage meters, and global tax compliance calculation.',
              badge: 'Monetization',
            },
            {
              title: 'Okta & Azure AD SAML 2.0',
              desc: 'Enterprise identity federation with automated SCIM user provisioning, group mapping, and SSO enforcement.',
              badge: 'Enterprise Auth',
            },
            {
              title: 'SOC 2 Type II & ISO 27001',
              desc: 'Tamper-evident audit trails, role-based access control (RBAC), and encryption at rest and in transit.',
              badge: 'Compliance',
            },
            {
              title: 'LaunchDarkly & PostHog Flags',
              desc: 'Dynamic feature management, gradual canary rollouts, and real-time user engagement telemetry.',
              badge: 'DevOps & Flags',
            },
            {
              title: 'OpenTelemetry & Prometheus',
              desc: 'Distributed request tracing, custom SLI/SLA metric collection, and automated incident alert webhooks.',
              badge: 'Observability',
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -3 }}
              className="p-5 rounded-2xl bg-white border border-gray-100 shadow-card hover:border-primary-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-primary-50 text-primary-700 border border-primary-200">
                    {item.badge}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-primary-600" />
                </div>
                <h3 className="font-bold text-ink text-base mb-1.5">{item.title}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. Work Areas / Specialized Domains */}
      {workAreas.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center max-w-2xl mx-auto">
            <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-50 text-primary-700 border border-primary-200 mb-3">
              Specialized Domains
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              SaaS Solutions We Deliver
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {workAreas.map((w, idx) => (
              <motion.div
                key={w.title || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 sm:p-7 rounded-2xl bg-white border border-gray-100 shadow-card hover:border-primary-300 hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#00a4d8] to-[#5d53a3] text-white font-mono text-xs font-bold flex items-center justify-center shadow-md">
                    0{idx + 1}
                  </span>
                  <h3 className="text-lg font-extrabold text-ink">{w.title}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{w.body}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* 7. Products Built & Case Studies */}
      {(products.length > 0 || cases.length > 0) && (
        <section className="bg-gradient-to-br from-[#1a1a2e] via-[#241f48] to-[#121824] text-white py-14 rounded-3xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border border-primary-500/20 shadow-2xl">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00a4d8]/20 border border-[#00a4d8]/30 text-[#00a4d8] text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Proven Track Record
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              SaaS Platforms Built by Cubixsol
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {(cases.length > 0 ? cases : products).map((c, idx) => (
              <div
                key={c.title || idx}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#00a4d8]/50 transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {c.tags?.map((tag) => (
                      <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00a4d8]/20 text-[#00a4d8] border border-[#00a4d8]/30">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{c.title}</h3>
                  <p className="text-xs text-gray-300 leading-relaxed mb-4">
                    {c.result || c.description}
                  </p>
                </div>
                {c.metrics && (
                  <div className="pt-3 border-t border-white/10 text-xs font-mono font-bold text-green-400">
                    {c.metrics}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. Services Grid */}
      {services.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-primary-50/50 border border-primary-200/80">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white text-primary-700 border border-primary-200 mb-2">
                End-to-End Capabilities
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-ink">
                Full-Lifecycle SaaS Engineering Services
              </h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {services.map((s) => (
                <div
                  key={s}
                  className="flex items-center gap-3 p-3.5 rounded-xl bg-white shadow-sm border border-primary-200/60 hover:border-primary-400 transition"
                >
                  <div className="w-6 h-6 rounded-lg bg-primary-600 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-ink">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
