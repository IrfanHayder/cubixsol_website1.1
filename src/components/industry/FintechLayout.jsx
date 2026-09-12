import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, ArrowRight, CheckCircle2, Lock, Zap, Activity,
  CreditCard, Landmark, RefreshCw, BarChart2, ShieldAlert,
  Fingerprint, Sparkles, TrendingUp, Layers, Terminal, Check
} from 'lucide-react';
import Reveal, { Stagger, StaggerItem } from '../Reveal';

const FINTECH_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&h=800&q=75',
  card: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=900&h=700&q=75',
  dashboard: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=900&h=700&q=75',
  mobile: 'https://images.unsplash.com/photo-1556742049-0a67e557b640?auto=format&fit=crop&w=900&h=700&q=75',
  trading: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&h=600&q=75',
  office: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&h=600&q=75',
};

const workVisual = [
  { img: FINTECH_IMAGES.card, icon: CreditCard, key: 0 },
  { img: FINTECH_IMAGES.dashboard, icon: Landmark, key: 1 },
  { img: FINTECH_IMAGES.mobile, icon: Zap, key: 2 },
  { img: FINTECH_IMAGES.trading, icon: BarChart2, key: 3 },
];

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

  const approachTitle = industry.approachTitle || 'The Cubixsol Approach to Fintech';
  const approachItems = industry.approachItems && industry.approachItems.length > 0 ? industry.approachItems : [
    {
      title: 'We Engineer for Financial Security & Trust',
      subtitle: 'Our financial systems architects and fintech engineers build payment products that are:',
      points: [
        { heading: 'Ultra-Fast', text: 'Sub-25ms API response times, instant transaction settlement, and distributed cache performance.' },
        { heading: 'Bank-Grade Secure', text: 'Hardware-level AES-256 encryption, zero-trust tokenization, and strict PCI-DSS Level 1 compliance.' },
        { heading: 'Frictionless UX', text: '1-click checkout experiences and biometric mobile authentication that maximize conversion.' },
      ],
    },
    {
      title: 'We Ensure Full Regulatory Compliance',
      subtitle: 'With deep integration experience across payment rails and open banking protocols, we ensure:',
      points: [
        { heading: 'Open Banking & ISO 20022', text: 'Interoperable APIs for Plaid, Stripe, Yodlee, SWIFT, and SEPA cross-border networks.' },
        { heading: 'Automated KYC & AML', text: 'Real-time biometric liveness checks, document verification, and sanction list screening.' },
        { heading: 'Immutable Audit Ledgers', text: 'Double-entry accounting systems with cryptographically verified transaction histories.' },
      ],
    },
    {
      title: 'We Accelerate with Real-Time AI & Risk Intelligence',
      subtitle: 'We embed predictive machine learning models directly into transaction processing pipelines:',
      points: [
        { heading: 'Real-Time Fraud Prevention', text: 'Zero-shot anomaly scoring that stops fraudulent transfers before settlement occurs.' },
        { heading: 'Dynamic Routing & Failover', text: 'Multi-processor smart routing that minimizes interchange fees and boosts authorization rates.' },
        { heading: 'Automated Underwriting', text: 'Instant credit decisioning algorithms that evaluate multi-source borrower risk.' },
      ],
    },
  ];

  const solutionsTitle = industry.solutionsTitle || 'Our Financial & Fintech Solutions';
  const solutionsSubtitle = industry.solutionsSubtitle || 'Institutional-grade payment gateways, digital wallets, core banking ledgers, and KYC pipelines designed to scale with complete reliability.';
  const solutionsItems = industry.solutionsItems && industry.solutionsItems.length > 0 ? industry.solutionsItems : [
    {
      title: 'Payment Orchestration & Checkout Engines',
      body: 'Multi-processor routing gateways with 3D Secure 2.2 authentication, recurring subscription billing, localized alternative payment methods (Apple Pay, Google Pay, Pix, iDEAL), and automated chargeback dispute resolution.',
    },
    {
      title: 'Neo-Banking & Digital Wallet Infrastructure',
      body: 'Full-featured digital banking applications with virtual/physical card issuance (Marqeta, Lithic), real-time P2P balance transfers, instant ACH/SEPA payments, and automated financial health analytics.',
    },
    {
      title: 'Core Ledgers, KYC & Risk Automation',
      body: 'High-throughput double-entry ledgers capable of handling 50,000+ operations/sec with automated multi-bank reconciliation, automated SAR filing, and real-time KYC/AML identity verification.',
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
        <Reveal className="mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight">
            {approachTitle}
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {approachItems.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-2xl bg-[#f4f7fa] border border-slate-200/80 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Red Accent Top Indicator Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#e11d48]" />

              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-extrabold text-ink tracking-tight pt-1">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                    {item.subtitle}
                  </p>
                )}

                <div className="space-y-3.5 pt-2">
                  {item.points && item.points.map((pt, pIdx) => (
                    <div key={pIdx} className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                      <strong className="font-extrabold text-ink block mb-0.5">{pt.heading}</strong>
                      <span className="text-gray-600 text-xs sm:text-sm">{pt.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 2. Fintech Solutions Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-8 sm:mb-10 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-2">
            {solutionsTitle}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            {solutionsSubtitle}
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {solutionsItems.map((sol, idx) => (
            <motion.div
              key={sol.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-2xl bg-[#f4f7fa] border border-slate-200/80 p-6 sm:p-8 flex flex-col justify-start relative overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Red Accent Top Indicator Bar */}
              <div className="w-12 h-1 bg-[#e11d48] rounded-full mb-4" />

              <h3 className="text-lg sm:text-xl font-extrabold text-ink tracking-tight mb-3">
                {sol.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {sol.body}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Financial Visual Band */}
      <section className="relative overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-5">
          <Reveal className="lg:col-span-7" scale>
            <div className="relative rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] shadow-elev group">
              <motion.img
                src={FINTECH_IMAGES.hero}
                alt="Fintech digital payments and charts"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                initial={{ scale: 1.05 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-500/30 backdrop-blur-md text-primary-200 text-xs font-bold uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-cyan" /> Institutional Fintech Engineering
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white max-w-xl leading-snug">
                  Software that handles millions of transactions — with microsecond precision
                </h2>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="relative rounded-2xl overflow-hidden min-h-[140px] shadow-card group">
              <img src={FINTECH_IMAGES.card} alt="Card issuing" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-ink/35" />
              <p className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold">
                Virtual &amp; Physical Card Issuing
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden min-h-[140px] shadow-card group">
              <img src={FINTECH_IMAGES.trading} alt="Trading ledgers" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-primary-950/40" />
              <p className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold">
                High-Frequency Ledgers &amp; FX
              </p>
            </div>
            <div className="col-span-2 rounded-2xl bg-gradient-to-br from-[#1a1a2e] via-[#241f48] to-[#122844] text-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-soft border border-primary-500/20">
              <div>
                <p className="text-xl sm:text-2xl font-extrabold">Fintech-Ready Tech</p>
                <p className="text-white/75 text-xs sm:text-sm mt-1">
                  Discovery &rarr; Build &rarr; Launch for Neo-Banks, Payments &amp; WealthTech
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-primary-700 font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl hover:bg-primary-50 transition shrink-0 shadow"
              >
                Talk to us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Live Transaction & Security Architecture Simulator */}
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
                From micro-lending algorithms and neo-banking engines to PCI-DSS compliant checkout pipelines, we engineer institutional-grade fintech products that handle millions of transactions securely.
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

      {/* 5. Security & Regulatory Compliance Matrix */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="eyebrow mb-2">Security &amp; Regulatory Compliance</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
            Engineered for Strict Financial Protocols
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Every line of code complies with strict international financial security standards.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: Lock,
              title: 'PCI-DSS Level 1',
              desc: 'End-to-end tokenization, vaulting, and secure PAN handling without storing sensitive CVVs.',
            },
            {
              icon: Fingerprint,
              title: 'KYC / AML Pipelines',
              desc: 'Biometric liveness detection, government ID verification, and sanction list screening integrations.',
            },
            {
              icon: Landmark,
              title: 'Open Banking & ISO 20022',
              desc: 'Seamless aggregation and messaging compliance with Plaid, Stripe, Yodlee, and Swift networks.',
            },
            {
              icon: ShieldAlert,
              title: 'Real-Time Fraud Radar',
              desc: 'Multi-factor velocity checks, device fingerprinting, and risk-based step-up authentication.',
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -4 }}
              className="p-5 rounded-2xl bg-white border border-gray-100 shadow-card hover:border-primary-300 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-3">
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-ink text-base mb-1.5">{item.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. Work Areas with Alternating Layout */}
      {workAreas.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="eyebrow mb-2">Core Competencies</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-3">
              Fintech Product Domains We Build
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
              From high-frequency payments to internal risk intelligence — we engineer secure, auditable software that moves money and data with clarity.
            </p>
          </div>
          <div className="space-y-8 lg:space-y-12">
            {workAreas.map((w, i) => {
              const vis = workVisual[i % workVisual.length];
              const Icon = vis.icon;
              const flip = i % 2 === 1;
              return (
                <motion.div
                  key={w.title}
                  className={`grid lg:grid-cols-2 gap-6 lg:gap-10 items-center ${
                    flip ? 'lg:[&>*:first-child]:order-2' : ''
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/11] shadow-elev group">
                    <img
                      src={vis.img}
                      alt={w.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-xl bg-white/95 text-primary-600 flex items-center justify-center shadow">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className={flip ? 'lg:pr-4' : 'lg:pl-4'}>
                    <p className="text-xs font-bold tracking-widest uppercase text-primary-600 mb-2">
                      Fintech Focus {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-ink mb-3">{w.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-5">{w.body}</p>
                    <ul className="space-y-2">
                      {(industry.points || []).slice(i, i + 2).map((pt) => (
                        <li key={pt} className="flex gap-2 text-xs sm:text-sm font-medium text-ink">
                          <CheckCircle2 className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}

      {/* 7. Fintech Products Suite */}
      {products.length > 0 && (
        <section className="relative py-12 lg:py-16 rounded-3xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1a1a2e] via-[#241f48] to-[#122844] text-white">
          <div className="mb-8 max-w-xl">
            <p className="text-primary-300 text-xs font-bold tracking-widest uppercase mb-2">
              Our Products
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              Fintech Products We Design &amp; Ship
            </h2>
            <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
              Tested for high concurrency — checkout gateways, double-entry accounting ledgers, and KYC automation.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p, idx) => {
              const imgs = [FINTECH_IMAGES.card, FINTECH_IMAGES.dashboard, FINTECH_IMAGES.mobile];
              return (
                <div
                  key={p.slug || p.name}
                  className="group block h-full rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-primary-400/40 transition"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={imgs[idx % imgs.length]}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-wide text-primary-300 mb-1">
                      {p.name}
                    </p>
                    <p className="text-xs text-white/80 leading-relaxed mb-3">{p.blurb}</p>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-300 group-hover:gap-2.5 transition-all"
                    >
                      Request Architecture Demo <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 8. Case Studies */}
      {cases.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2">Track Record</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                Fintech Work We Have Shipped
              </h2>
            </div>
            <Link to="/projects" className="text-sm font-bold text-primary-600 inline-flex items-center gap-1 hover:gap-2 transition-all">
              All projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {cases.map((c, i) => {
              const imgs = [FINTECH_IMAGES.mobile, FINTECH_IMAGES.dashboard, FINTECH_IMAGES.trading];
              return (
                <article key={c.title} className="h-full rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-card hover:shadow-elev transition flex flex-col">
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img
                      src={imgs[i % imgs.length]}
                      alt={c.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {c.tags?.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-primary-50 text-primary-800 border border-primary-200 shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-extrabold text-ink mb-2 text-sm sm:text-base leading-snug">{c.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed flex-1">{c.result}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* 9. Services Grid */}
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
