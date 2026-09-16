import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, ArrowRight, CheckCircle2, Lock, Zap, Activity,
  CreditCard, Landmark, RefreshCw, BarChart2, ShieldAlert,
  Fingerprint, Sparkles, TrendingUp, Layers, Terminal, Check,
  Smartphone, Wallet, LineChart, Shield, Server, Database, Globe2, Cpu
} from 'lucide-react';
import Reveal, { Stagger, StaggerItem } from '../Reveal';
import { formatInline } from '../../utils/formatText';

export default function FintechLayout({ industry }) {
  const [isSimulating, setIsSimulating] = useState(false);
  const [txStatus, setTxStatus] = useState({ state: 'idle', time: '18ms', auth: 'Authorized (3DS 2.2)' });

  const simulateTx = () => {
    setIsSimulating(true);
    setTxStatus({ state: 'processing', time: '...', auth: 'Verifying cryptographic signature...' });
    setTimeout(() => {
      setIsSimulating(false);
      setTxStatus({
        state: 'success',
        time: `${Math.floor(Math.random() * 15) + 12}ms`,
        auth: 'Tokenized & Settled (PCI-DSS L1)',
      });
    }, 900);
  };

  // 1. Finance & Fintech Software We Build
  const softwareTitle = industry.solutionsTitle || 'Finance & Fintech Software We Build';
  const softwareSubtitle = industry.solutionsSubtitle || 'We combine product strategy, user experience, software design, data, and security to simplify financial operations and give teams greater control.';
  const softwareItems = Array.isArray(industry.solutionsItems) && industry.solutionsItems.length > 0
    ? industry.solutionsItems
    : [
        {
          title: 'Payment Systems',
          body: 'Create payment gateways, checkout experiences, subscription payment systems, and payment orchestration platforms that connect to processors and alternative payment methods. Our team creates clear transaction journeys and robust APIs for smooth, reliable payment operations.',
        },
        {
          title: 'Fintech Apps',
          body: 'Our fintech mobile app services give businesses secure, intuitive applications for bank accounts, payments, credit, and personal finance. Each app can include secure login, alerts, transaction histories, account controls, and customer-support tools.',
        },
        {
          title: 'Digital Wallets',
          body: 'Create digital wallets that support account deposits, peer-to-peer transfers, multiple currencies, transaction categories, card links, and ledger-aware processes. Our team pairs simple user journeys with strong security and clear operational controls.',
        },
        {
          title: 'Trading Platforms',
          body: 'Create portfolio, market-data, order-management, and investment dashboards for users who need timely information and a clear view of their options. Secure APIs with clear documentation link market-data and execution services to each platform.',
        },
      ];

  // 2. Built for Finance & Fintech Standards (Work Areas / Standards)
  const standardsTitle = industry.workAreasTitle || 'Built for Finance & Fintech Standards';
  const standardsItems = Array.isArray(industry.workAreas) && industry.workAreas.length > 0
    ? industry.workAreas
    : [
        {
          title: 'PCI-DSS-Aware Architecture',
          body: 'Our architects design payment flows around security controls, secure data, and transaction integrity.',
        },
        {
          title: 'Encryption and Tokenisation',
          body: 'Encryption, tokenization, secure authentication, and controlled access protect sensitive information.',
        },
        {
          title: 'KYC and AML Workflow Support',
          body: 'Create customer enrollment and verification workflows for identity checks, document review, sanctions checks, and audit-ready records.',
        },
        {
          title: 'Secure APIs and Audit Controls',
          body: 'Authenticated APIs, permission controls, audit records, and system alerts give each system clear, traceable data flows.',
        },
      ];

  // 3. Tech We Use
  const techTitle = industry.techTitle || 'Tech We Use';
  const techItems = Array.isArray(industry.techItems) && industry.techItems.length > 0
    ? industry.techItems
    : [
        {
          title: 'Node.js',
          desc: 'Node.js powers high-throughput backend microservices and ultra-secure financial APIs with sub-second execution.',
        },
        {
          title: 'React & TypeScript',
          desc: 'React delivers interactive real-time dashboards, portals, and financial analytics interfaces with zero latency.',
        },
        {
          title: 'Stripe & Plaid',
          desc: 'Stripe, Plaid, and third-party financial integrations connect payment rails, bank accounts, and core product functions.',
        },
        {
          title: 'AWS, Kotlin & Swift',
          desc: 'AWS provides resilient cloud infrastructure, while native Kotlin and Swift power biometric mobile banking applications.',
        },
      ];

  // 4. Why Teams Choose Cubixsol / Core Pillars
  const whyChooseTitle = industry.whyChooseTitle || 'Why Choose Cubixsol for Fintech';
  const whyChooseItems = Array.isArray(industry.whyChooseItems) && industry.whyChooseItems.length > 0
    ? industry.whyChooseItems
    : (Array.isArray(industry.points) && industry.points.length > 0
        ? industry.points.map((p) => {
            if (typeof p === 'string') {
              const [t, ...d] = p.split('|');
              return { title: t.trim(), desc: d.join('|').trim() || 'Engineered for financial security and high-frequency performance.' };
            }
            return p;
          })
        : [
            { title: 'Scalable', desc: 'Cloud-ready architecture designed to scale seamlessly with transaction surges and user growth.' },
            { title: 'Secure', desc: 'Protected data flows, zero-trust tokenization, and end-to-end encryption for every transaction.' },
            { title: 'Connected', desc: 'API-first integrations linking core ledgers with open banking protocols and modern processors.' },
            { title: 'Reliable', desc: 'Tested and monitored releases with 99.999% uptime guarantees and real-time observability.' },
          ]);

  const cases = industry.caseStudies || [];
  const services = industry.servicesWeOffer || [];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 🚀 Interactive Live Transaction & Security Architecture Showcase */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#1a1a2e] via-[#241f48] to-[#122844] border border-primary-500/30 shadow-2xl p-6 sm:p-10 lg:p-12 overflow-hidden text-white relative">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-500/20 border border-primary-400/30 text-primary-200 text-xs font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 animate-pulse text-brand-cyan" /> Bank-Grade Architecture
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                High-Frequency, <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-primary-300 to-white">Zero-Compromise</span> Financial Software
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                From payment systems and digital wallets to trading platforms and KYC pipelines, we engineer institutional-grade fintech products that handle millions of transactions securely.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <p className="text-brand-cyan font-extrabold text-xl sm:text-2xl">&lt; 25ms</p>
                  <p className="text-xs text-slate-400 mt-0.5">Execution Latency</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <p className="text-primary-300 font-extrabold text-xl sm:text-2xl">99.999%</p>
                  <p className="text-xs text-slate-400 mt-0.5">Uptime SLA</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm col-span-2 sm:col-span-1">
                  <p className="text-white font-extrabold text-xl sm:text-2xl">PCI-DSS L1</p>
                  <p className="text-xs text-slate-400 mt-0.5">Certified Vaults</p>
                </div>
              </div>
            </div>

            {/* Interactive Live Financial Simulator Card */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl bg-slate-950/80 border border-primary-500/30 p-5 sm:p-6 shadow-xl backdrop-blur-md relative">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan animate-pulse" />
                    <span className="text-xs font-mono text-brand-cyan font-bold">API GATEWAY &bull; LIVE</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">TLS 1.3 / mTLS Enforced</span>
                </div>

                {/* Simulator visual cards */}
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-lg bg-black/50 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400">Payload Encryption:</span>
                    <span className="text-primary-200 font-semibold flex items-center gap-1">
                      <Lock className="w-3 h-3 text-brand-cyan" /> AES-256-GCM Hardware Token
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-black/50 border border-slate-800 flex items-center justify-between">
                    <span className="text-slate-400">Fraud Prevention Engine:</span>
                    <span className="text-primary-200 font-semibold flex items-center gap-1">
                      <Fingerprint className="w-3 h-3 text-brand-cyan" /> Real-time Anomaly ML Scoring
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/60 border border-primary-500/30 mt-4 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-sans font-semibold">Live Transaction Simulator</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        txStatus.state === 'processing' ? 'bg-amber-500/20 text-amber-300' : 'bg-primary-500/20 text-brand-cyan'
                      }`}>
                        {txStatus.state.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex justify-between">
                      <span>Latency: <strong className="text-white">{txStatus.time}</strong></span>
                      <span>Auth: <strong className="text-brand-cyan">{txStatus.auth}</strong></span>
                    </div>
                  </div>

                  <button
                    onClick={simulateTx}
                    disabled={isSimulating}
                    className="w-full mt-4 py-3 px-4 rounded-xl bg-primary-gradient hover:opacity-90 text-white font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg shadow-primary-500/20 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
                    {isSimulating ? 'Processing Transaction...' : 'Run Test Transaction Stream'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 💳 1. Finance & Fintech Software We Build */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary-700 border border-primary-200 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            <CreditCard className="w-3.5 h-3.5 text-primary-600" />
            <span>Fintech Engineering Capabilities</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-3">
            {softwareTitle}
          </h2>
          {softwareSubtitle && (
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {softwareSubtitle}
            </p>
          )}
        </Reveal>

        <Stagger className="grid sm:grid-cols-2 gap-6" staggerDelay={0.06}>
          {softwareItems.map((item, idx) => {
            const icons = [CreditCard, Smartphone, Wallet, LineChart];
            const SIcon = icons[idx % icons.length];
            return (
              <StaggerItem key={item.title || idx}>
                <div className="p-6 sm:p-7 rounded-2xl bg-white border border-gray-100 shadow-card hover:shadow-elev hover:border-primary-300 transition-all duration-300 h-full flex flex-col group">
                  <div className="flex items-center gap-3.5 mb-4">
                    <span className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-50 to-blue-50 border border-primary-100 flex items-center justify-center text-primary-600 group-hover:scale-110 transition-transform">
                      <SIcon className="w-6 h-6" />
                    </span>
                    <h3 className="font-extrabold text-ink text-lg sm:text-xl group-hover:text-primary-600 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">
                    {formatInline(item.body || item.desc || '')}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      {/* 🛡️ 2. Built for Finance & Fintech Standards */}
      <section className="bg-gradient-to-b from-[#1a1a2e] via-[#241f48] to-[#122844] text-white py-14 sm:py-20 border-y border-primary-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-500/20 text-primary-200 border border-primary-400/30 text-xs font-bold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-cyan" />
              <span>Compliance &amp; Data Protection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-3">
              {standardsTitle}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Every system is engineered around security controls, tokenization, and strict regulatory compliance.
            </p>
          </Reveal>

          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.05}>
            {standardsItems.map((item, idx) => {
              const standardIcons = [Lock, ShieldCheck, Fingerprint, ShieldAlert];
              const StIcon = standardIcons[idx % standardIcons.length];
              return (
                <StaggerItem key={item.title || idx}>
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-brand-cyan/50 hover:bg-white/10 transition-all duration-300 h-full flex flex-col group">
                    <div className="w-12 h-12 rounded-xl bg-primary-500/20 text-brand-cyan flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <StIcon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-white text-lg mb-2 group-hover:text-brand-cyan transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed flex-1">
                      {formatInline(item.body || item.desc || '')}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* ⚙️ 3. Tech We Use */}
      <section className="bg-slate-50/80 py-14 sm:py-20 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-primary-700 border border-primary-200 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
              <Cpu className="w-3.5 h-3.5 text-primary-600" />
              <span>Technology Stack</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-3">
              {techTitle}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Node.js, React, Stripe, Plaid, AWS, Kotlin, and Swift form a reliable stack for secure, scalable, user-friendly financial products.
            </p>
          </Reveal>

          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.05}>
            {techItems.map((tech, idx) => {
              const techIcons = [Server, Landmark, CreditCard, Smartphone];
              const TIcon = techIcons[idx % techIcons.length] || Cpu;
              return (
                <StaggerItem key={tech.title || idx}>
                  <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-card hover:border-primary-300 hover:shadow-elev transition-all duration-300 h-full flex flex-col group">
                    <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <TIcon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-ink text-lg mb-2 group-hover:text-primary-600 transition-colors">
                      {tech.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed flex-1">
                      {formatInline(tech.desc || '')}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* 🏆 4. Why Teams Choose Cubixsol */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary-700 border border-primary-200 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary-600" />
            <span>The Cubixsol Edge</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-3">
            {whyChooseTitle}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            We deliver fintech software that connects with essential systems, preserves data integrity, and scales with your business.
          </p>
        </Reveal>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.05}>
          {whyChooseItems.map((item, idx) => {
            const icons = [TrendingUp, ShieldCheck, Layers, RefreshCw];
            const BIcon = icons[idx % icons.length];
            return (
              <StaggerItem key={item.title || idx}>
                <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-card hover:border-primary-300 hover:shadow-elev transition-all duration-300 h-full flex flex-col group">
                  <div className="w-11 h-11 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <BIcon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-ink text-lg mb-2 group-hover:text-primary-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">
                    {formatInline(item.desc || '')}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      {/* Case Studies (if any) */}
      {cases.length > 0 && (
        <section className="bg-gradient-to-br from-[#1a1a2e] via-[#241f48] to-[#122844] text-white py-14 rounded-3xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border border-primary-500/20">
          <div className="max-w-3xl mb-10">
            <p className="text-primary-300 text-xs font-bold uppercase tracking-wider mb-2">Track Record</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Fintech Work We Have Shipped
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {cases.map((c) => (
              <div key={c.title} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-primary-400/40 transition">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {c.tags?.map((tag) => (
                    <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary-500/20 text-primary-200">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{c.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{c.result}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Services Grid (if any) */}
      {services.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-3xl bg-primary-50/60 border border-primary-100">
            <h3 className="text-xl font-extrabold text-ink mb-6">Fintech Engineering Services</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {services.map((s) => (
                <div key={s} className="flex items-center gap-2.5 p-3 rounded-xl bg-white shadow-sm border border-primary-100/60">
                  <CheckCircle2 className="w-4 h-4 text-primary-600 shrink-0" />
                  <span className="text-xs font-semibold text-ink">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
