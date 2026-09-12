import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu, Terminal, Server, GitBranch, Shield, Zap, CheckCircle2,
  Code2, Sparkles, Database, Layers, ArrowRight, Play, Copy
} from 'lucide-react';
import Reveal, { Stagger, StaggerItem } from '../Reveal';

export default function TechnologyLayout({ industry }) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const devPillars = [
    {
      id: 0,
      title: 'Internal Developer Platforms (IDP)',
      desc: 'Self-serve infrastructure orchestration on top of Kubernetes, Terraform, and AWS/GCP that enables engineering teams to spin up preview environments in seconds.',
      badge: 'GitOps & Kubernetes Native',
      stat: '&lt; 45s Ephemeral Env Spinup',
      points: ['Automated PR preview environments', 'Standardized service templates & scaffolding', 'Role-based cloud resource quota management'],
    },
    {
      id: 1,
      title: 'High-Throughput API Gateways & Event Bus',
      desc: 'Distributed event-driven architectures with Apache Kafka, RabbitMQ, and GraphQL/gRPC gateways handling millions of concurrent requests.',
      badge: 'Event-Driven Backbone',
      stat: '500k+ Messages/sec Throughput',
      points: ['Zero-copy gRPC microservice serialization', 'Dynamic rate limiting & DDoS mitigation', 'Schema registry & backward compatibility checks'],
    },
    {
      id: 2,
      title: 'Distributed Observability & Telemetry',
      desc: 'OpenTelemetry instrumentation, distributed tracing, automated anomaly alerting, and centralized log aggregation with Grafana & Datadog.',
      badge: 'Full-Stack Observability',
      stat: '100% Trace Coverage',
      points: ['End-to-end request correlation IDs', 'Automated latency regression detection', 'SLO / SLA alerting & error budget tracking'],
    },
    {
      id: 3,
      title: 'Enterprise Design Systems & Component SDKs',
      desc: 'Accessible, multi-brand React/TypeScript component libraries with automated Storybook visual regression testing and npm package distribution.',
      badge: 'Design System Engineering',
      stat: '100% WCAG 2.1 AA Compliant',
      points: ['Token-driven theme customization', 'Zero-runtime CSS with Tailwind/Vanilla', 'Automated semver release pipelines'],
    },
  ];

  const copyCommand = () => {
    navigator.clipboard?.writeText('npx @cubixsol/cli init platform-service --template=microservice');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const workAreas = industry.workAreas || [];
  const cases = industry.caseStudies || [];
  const services = industry.servicesWeOffer || [];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Interactive Terminal & DevPlatform Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#030712] via-[#091122] to-[#041a14] text-white p-6 sm:p-10 lg:p-12 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute left-0 bottom-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider">
                <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> Engineering-First Tech Partnerships
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
                Architecting High-Scale <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-300 to-sky-400">Developer Platforms &amp; Distributed Systems</span>
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
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

      {/* Feature Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="eyebrow text-cyan-600 mb-2">Platform Capabilities</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
            High-Scale Engineering Systems We Build
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {devPillars.map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -4 }}
              className="p-5 rounded-2xl bg-white border border-gray-100 shadow-card hover:border-cyan-300 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-50 text-cyan-700 border border-cyan-200 mb-3">
                  {item.badge}
                </span>
                <h3 className="font-bold text-ink text-base mb-1.5">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">{item.desc}</p>
              </div>
              <div className="pt-3 border-t border-gray-100 font-mono text-[11px] font-bold text-cyan-700">
                {item.stat}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Work Areas */}
      {workAreas.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <p className="eyebrow text-cyan-600 mb-2">Core Competencies</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              Technology &amp; Platform Domains
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {workAreas.map((w, idx) => (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-cyan-50/40 border border-cyan-100 hover:bg-white hover:shadow-card hover:border-cyan-300 transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-lg bg-cyan-700 text-white font-mono text-xs font-bold flex items-center justify-center">
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

      {/* Case Studies */}
      {cases.length > 0 && (
        <section className="bg-[#030712] text-white py-14 rounded-3xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <p className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">Delivered Platforms</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Technology Platforms Shipped by Cubixsol
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {cases.map((c) => (
              <div key={c.title} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {c.tags?.map((tag) => (
                    <span key={tag} className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
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

      {/* Services Grid */}
      {services.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-3xl bg-cyan-50/60 border border-cyan-100">
            <h3 className="text-xl font-extrabold text-ink mb-6">Platform Engineering Services</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {services.map((s) => (
                <div key={s} className="flex items-center gap-2.5 p-3 rounded-xl bg-white shadow-sm border border-cyan-100/60">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
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
