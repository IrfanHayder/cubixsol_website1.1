import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu, Terminal, Server, GitBranch, Shield, Zap, CheckCircle2,
  Code2, Sparkles, Database, Layers, ArrowRight, Play, Copy,
  Cloud, Lock, Network, BarChart3, Rocket, RefreshCw, Smartphone
} from 'lucide-react';
import Reveal, { Stagger, StaggerItem } from '../Reveal';
import { formatInline } from '../../utils/formatText';

export default function TechnologyLayout({ industry }) {
  const [copied, setCopied] = useState(false);

  // 1. Software Solutions Designed for Technology Companies
  const solutionsTitle = industry.solutionsTitle || 'Software Solutions Designed for Technology Companies';
  const solutionsSubtitle = industry.solutionsSubtitle || 'We work as a technology partner that understands complex development needs, from MVP creation for startups to advanced platforms for growing enterprises.';
  const solutionsItems = Array.isArray(industry.solutionsItems) && industry.solutionsItems.length > 0
    ? industry.solutionsItems
    : [
        {
          title: 'Product Development & MVP Solutions',
          body: 'We help technology companies convert concepts into functional digital products. Our team develops MVPs that validate ideas, test market demand, and create a foundation for future growth.',
        },
        {
          title: 'SaaS Platform Development',
          body: 'We build scalable SaaS applications with flexible architectures, user management systems, subscription models, and cloud-based infrastructure. Our solutions support businesses that need reliable software products for multiple users and markets.',
        },
        {
          title: 'Enterprise Software Development',
          body: 'Large organisations require software that connects teams, manages complex processes, and integrates with existing systems. Our experts develop enterprise platforms that improve efficiency, security, and operational control.',
        },
        {
          title: 'Cloud-Based Application Development',
          body: 'Cloud technology enables businesses to access flexible and scalable infrastructure. We develop cloud applications that support performance, reliability, and seamless expansion as business requirements grow.',
        },
      ];

  // 2. Built for Modern Technology Standards (Work Areas / Standards)
  const standardsTitle = industry.workAreasTitle || 'Built for Modern Technology Standards';
  const standardsItems = Array.isArray(industry.workAreas) && industry.workAreas.length > 0
    ? industry.workAreas
    : [
        {
          title: 'Scalable Software Architecture',
          body: 'Our development approach focuses on flexible architectures that support future updates, increased users, and evolving business requirements.',
        },
        {
          title: 'Secure Development Practices',
          body: 'Security remains a core part of our development process. We apply industry-standard practices for data protection, authentication, access control, and application reliability.',
        },
        {
          title: 'Seamless API & System Integration',
          body: 'Modern technology platforms often depend on multiple services. We build and connect APIs that allow applications, databases, and third-party tools to work together efficiently.',
        },
        {
          title: 'Performance-Focused Engineering',
          body: 'Fast and responsive software creates better user experiences. Our team optimizes applications for speed, stability, and consistent performance across different platforms.',
        },
      ];

  // 3. Custom Software Solutions We Offer
  const customSolutions = Array.isArray(industry.servicesWeOffer) && industry.servicesWeOffer.length > 0
    ? industry.servicesWeOffer
    : (Array.isArray(industry.points) && industry.points.length > 0
        ? industry.points
        : [
            'Startup Software Development',
            'Digital Transformation Solutions',
            'AI & Automation Software',
            'Mobile & Web Applications',
            'Cloud-Based Software Development',
            'Enterprise Software Solutions',
          ]);

  const copyCommand = () => {
    navigator.clipboard?.writeText('npx @cubixsol/cli init platform-service --template=microservice');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const solutionIcons = [Rocket, Layers, Server, Cloud];
  const standardIcons = [Cpu, Shield, Network, Zap];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 💻 1. Interactive Terminal & DevPlatform Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#030712] via-[#091122] to-[#041a14] text-white p-6 sm:p-10 lg:p-12 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute left-0 bottom-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
                <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> Engineering-First Tech Partnerships
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                Architecting High-Scale <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-300 to-sky-400">Developer Platforms &amp; Distributed Systems</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                We embed directly alongside your principal architects and engineering teams to accelerate platform delivery, optimize microservice architectures, and build developer tools that developers love.
              </p>

              {/* Benchmarks */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-cyan-400 font-extrabold text-xl sm:text-2xl">10x</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Deployment Velocity</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-emerald-400 font-extrabold text-xl sm:text-2xl">&lt; 15ms</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">API Overhead</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-sky-400 font-extrabold text-xl sm:text-2xl">99.999%</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">Zero Downtime</p>
                </div>
              </div>
            </div>

            {/* Interactive Terminal Simulator */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl bg-black/90 border border-cyan-500/30 shadow-2xl overflow-hidden font-mono text-xs">
                <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-slate-400 text-[11px]">cubixsol-platform-cli</span>
                  </div>
                  <button
                    onClick={copyCommand}
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-cyan-300 transition"
                  >
                    <Copy className="w-3 h-3" />
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <span className="text-cyan-400 font-bold">$</span>
                    <span>cubixsol deploy --cluster=us-east-1 --canary=10%</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">
                    [✓] Generating zero-downtime service topology...<br />
                    [✓] Connecting to Kafka event bus (broker-01.live.net)...<br />
                    [✓] Synthesizing gRPC schema contracts (v2.4.0)...<br />
                    [✓] OpenTelemetry trace agents healthy (0 regressions).
                  </p>
                  <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 flex items-center justify-between">
                    <span>DEPLOYMENT STATUS: CANARY 100% HEALTHY</span>
                    <span className="text-cyan-300 font-bold">LATENCY: 8ms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🚀 2. Software Solutions Designed for Technology Companies */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>Tailored Solutions</span>
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
                className="p-7 rounded-2xl bg-white border border-gray-100 shadow-card hover:border-cyan-300 hover:shadow-elev transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-50 to-sky-50 border border-cyan-100 flex items-center justify-center mb-5 text-cyan-600 group-hover:scale-110 group-hover:bg-cyan-600 group-hover:text-white transition-all duration-300 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-ink mb-3 group-hover:text-cyan-600 transition-colors">
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

      {/* 🛡️ 3. Built for Modern Technology Standards (Work Areas) */}
      <section className="bg-slate-50/70 py-16 sm:py-24 border-y border-gray-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-cyan-700 border border-cyan-200 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
              <Shield className="w-3.5 h-3.5 text-cyan-600" />
              <span>Engineering Excellence</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-3">
              {standardsTitle}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              We engineer custom software systems aligned with modern enterprise standards for reliability, security, and velocity.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {standardsItems.map((item, idx) => {
              const Icon = standardIcons[idx % standardIcons.length];
              return (
                <motion.div
                  key={item.title || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="p-7 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-cyan-300 hover:shadow-card transition-all"
                >
                  <div className="flex items-center gap-3.5 mb-3">
                    <span className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 border border-cyan-100 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5" />
                    </span>
                    <h3 className="text-lg font-extrabold text-ink">{item.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed font-normal">
                    {formatInline(item.body || item.desc || '')}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 📦 4. Custom Software Solutions We Offer */}
      {customSolutions.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-cyan-50/70 via-sky-50/40 to-white border border-cyan-100/80 shadow-sm">
            <div className="max-w-3xl mb-8">
              <span className="text-xs font-bold text-cyan-600 uppercase tracking-wider block mb-1">
                Custom Offerings
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                Custom Software Solutions We Offer
              </h3>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                Comprehensive digital engineering services tailored for high-growth tech firms and digital-first organizations.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {customSolutions.map((s, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3.5 p-4 rounded-xl bg-white border border-cyan-100 shadow-sm hover:border-cyan-300 hover:shadow-card transition-all"
                >
                  <span className="w-7 h-7 rounded-lg bg-cyan-100/60 text-cyan-700 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-cyan-600" />
                  </span>
                  <span className="text-sm font-bold text-ink leading-snug">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
