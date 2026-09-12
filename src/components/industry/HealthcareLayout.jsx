import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  HeartPulse, Shield, Video, CalendarCheck, FileText, CheckCircle2,
  Stethoscope, Activity, Lock, ArrowRight, UserCheck, Sparkles,
  ClipboardList, Cpu, AlertCircle, Clock, Check, Layers, Users, Award
} from 'lucide-react';
import Reveal, { Stagger, StaggerItem } from '../Reveal';

const HEALTH_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&h=800&q=75',
  doctor: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=900&h=700&q=75',
  telehealth: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&h=700&q=75',
  lab: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=900&h=700&q=75',
  tablet: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=900&h=600&q=75',
  clinic: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&h=600&q=75',
};

const workVisual = [
  { img: HEALTH_IMAGES.telehealth, icon: Video, key: 0 },
  { img: HEALTH_IMAGES.doctor, icon: Stethoscope, key: 1 },
  { img: HEALTH_IMAGES.lab, icon: Activity, key: 2 },
  { img: HEALTH_IMAGES.clinic, icon: HeartPulse, key: 3 },
];

export default function HealthcareLayout({ industry }) {
  const [activeStep, setActiveStep] = useState(0);

  const approachTitle = industry.approachTitle || 'The Cubixsol Approach to Healthcare';
  const approachItems = industry.approachItems && industry.approachItems.length > 0 ? industry.approachItems : [
    {
      title: 'We Engineer for Patient Safety & Trust',
      subtitle: 'Our digital health engineers and medical UX specialists create intuitive care experiences that are:',
      points: [
        { heading: 'Timely', text: 'Fast, frictionless patient intake, instant appointment scheduling, and rapid clinical alerts.' },
        { heading: 'Safe & Compliant', text: 'Zero-trust data vaults, end-to-end WebRTC encryption, and complete audit trails protecting PHI.' },
        { heading: 'Clinician-Friendly', text: 'Thoughtful workflows that reduce electronic documentation fatigue and clicks for providers.' },
      ],
    },
    {
      title: 'We Ensure Interoperability & Compliance',
      subtitle: 'With deep integration expertise across healthcare ecosystems, we ensure your software seamlessly connects:',
      points: [
        { heading: 'EHR & EMR Systems', text: 'Bi-directional integration with Epic, Cerner, Allscripts, and AthenaHealth via HL7 FHIR v4.' },
        { heading: 'Regulatory Standards', text: 'Guaranteed adherence to HIPAA, HITECH, FDA 21 CFR Part 11, and GDPR health privacy rules.' },
        { heading: 'Medical Device APIs', text: 'Stream real-time vitals and diagnostic telemetry from FDA-cleared remote patient monitoring (RPM) hardware.' },
      ],
    },
    {
      title: 'We Accelerate Clinical AI & Telehealth',
      subtitle: 'We integrate medical-grade intelligence and WebRTC communication into modern clinical products:',
      points: [
        { heading: 'Intelligent Symptom Triage', text: 'AI-assisted clinical questionnaires that route patients to appropriate care tiers.' },
        { heading: 'Sub-100ms HD Telehealth', text: 'Browser-based WebRTC video consultations with zero downloads and live vitals overlay.' },
        { heading: 'Automated Clinical Charting', text: 'AI-generated consultation summaries and ICD-10 diagnostic coding assistance.' },
      ],
    },
  ];

  const solutionsTitle = industry.solutionsTitle || 'Our Healthcare & Life Sciences Solutions';
  const solutionsSubtitle = industry.solutionsSubtitle || 'Purpose-built digital health platforms, clinical workflow automation, and EHR interoperability backed by cross-industry technology capabilities.';
  const solutionsItems = industry.solutionsItems && industry.solutionsItems.length > 0 ? industry.solutionsItems : [
    {
      title: 'Telehealth & Virtual Care Delivery Suites',
      body: 'We engineer HIPAA-compliant telehealth applications with WebRTC HD video, multi-party family consultations, in-call chat, screen sharing, and integrated digital prescription (e-Rx) dispatch. Works seamlessly on desktop browsers, iOS, and Android with zero installation required.',
    },
    {
      title: 'EHR / EMR Interoperability & FHIR Middleware',
      body: 'Connect modern wellness apps and patient portals with legacy hospital systems. We build robust HL7 v2/v3, C-CDA, and SMART on FHIR middleware pipelines that sync clinical notes, lab results, and patient demographics in sub-second intervals.',
    },
    {
      title: 'Remote Patient Monitoring (RPM) & Medical AI',
      body: 'Continuous care pipelines that ingest telemetry from Bluetooth and cellular medical devices (blood pressure cuffs, continuous glucose monitors, pulse oximeters). Includes automated threshold alert systems for nurse dispatch and ML-based early warning scoring.',
    },
  ];

  const clinicalSteps = [
    {
      id: 0,
      title: 'Smart Patient Triage & Booking',
      desc: 'Intuitive self-service intake forms with AI-assisted symptom triage, real-time insurance eligibility checks, and doctor calendar synchronization.',
      badge: 'Zero Waiting Room Friction',
      icon: CalendarCheck,
      details: ['Automated 270/271 insurance verification', 'Intelligent appointment slot optimization', 'Automated SMS/WhatsApp appointment reminders'],
    },
    {
      id: 1,
      title: 'Encrypted HD Telehealth Room',
      desc: 'Browser-based WebRTC video consultations with zero downloads, end-to-end peer encryption, and real-time medical vitals overlay.',
      badge: 'HIPAA & WebRTC Encrypted',
      icon: Video,
      details: ['Sub-100ms ultra-low video latency', 'In-session clinical chart and lab review', 'AI-assisted medical call summary generator'],
    },
    {
      id: 2,
      title: 'EHR / EMR & FHIR Integration',
      desc: 'Bi-directional interoperability with Epic, Cerner, Allscripts, and AthenaHealth using standardized HL7 FHIR v4 API gateways.',
      badge: 'HL7 FHIR Interoperability',
      icon: FileText,
      details: ['Instant bi-directional clinical chart sync', 'Automated ICD-10 and SNOMED diagnostic tagging', 'Comprehensive access audit logs for compliance'],
    },
    {
      id: 3,
      title: 'Post-Care & E-Prescriptions',
      desc: 'Instant digital pharmacy routing (Surescripts), automated treatment adherence notifications, and continuous remote patient monitoring (RPM).',
      badge: 'Surescripts Certified Flow',
      icon: UserCheck,
      details: ['Direct e-prescription dispatch to 65,000+ pharmacies', 'Automated adherence tracking and check-in loops', 'Patient satisfaction & clinical outcome analytics'],
    },
  ];

  const workAreas = industry.workAreas || [];
  const products = industry.productsBuilt || [];
  const cases = industry.caseStudies || [];
  const services = industry.servicesWeOffer || [];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. The Approach Section (Matches Cubixsol Brand & Education Card Standard) */}
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

      {/* 2. Healthcare Solutions Section */}
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

      {/* 3. Clinical Visual Band */}
      <section className="relative overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-5">
          <Reveal className="lg:col-span-7" scale>
            <div className="relative rounded-3xl overflow-hidden aspect-[16/10] sm:aspect-[16/9] shadow-elev group">
              <motion.img
                src={HEALTH_IMAGES.hero}
                alt="Digital health clinician with tablet"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                initial={{ scale: 1.05 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-500/30 backdrop-blur-md text-primary-200 text-xs font-bold uppercase tracking-wider mb-2">
                  <HeartPulse className="w-3.5 h-3.5 text-brand-cyan animate-pulse" /> Digital Care &amp; Clinical Engineering
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white max-w-xl leading-snug">
                  Software that elevates patient outcomes — and gives clinicians time back
                </h2>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="relative rounded-2xl overflow-hidden min-h-[140px] shadow-card group">
              <img src={HEALTH_IMAGES.telehealth} alt="Telehealth consultation" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-ink/35" />
              <p className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold">
                Encrypted HD Telehealth Suites
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden min-h-[140px] shadow-card group">
              <img src={HEALTH_IMAGES.tablet} alt="EHR Clinical Charting" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-primary-950/40" />
              <p className="absolute bottom-3 left-3 right-3 text-white text-xs font-bold">
                EHR / FHIR Charting &amp; Portals
              </p>
            </div>
            <div className="col-span-2 rounded-2xl bg-gradient-to-br from-[#1a1a2e] via-[#241f48] to-[#122844] text-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-soft border border-primary-500/20">
              <div>
                <p className="text-xl sm:text-2xl font-extrabold">Healthcare-Ready Tech</p>
                <p className="text-white/75 text-xs sm:text-sm mt-1">
                  Discovery &rarr; Build &rarr; Launch for Clinics, Hospitals &amp; HealthTech
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

      {/* 4. Interactive Clinical Workflow & HD Telehealth Simulator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#1a1a2e] via-[#241f48] to-[#122844] text-white p-6 sm:p-10 lg:p-12 border border-primary-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 mb-8 sm:mb-12 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-500/20 border border-primary-400/30 text-primary-200 text-xs font-semibold uppercase tracking-wider mb-4">
              <HeartPulse className="w-3.5 h-3.5 animate-pulse text-brand-cyan" /> Patient-First Healthcare Engineering
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Interactive Clinical Journey &amp; Telehealth Flow
            </h2>
            <p className="text-white/80 text-sm sm:text-base mt-3">
              Explore how we design streamlined workflows that reduce clinical burnout and elevate patient outcomes.
            </p>
          </div>

          {/* Stepper Navigation */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {clinicalSteps.map((step) => {
              const StepIcon = step.icon;
              const isCurrent = activeStep === step.id;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`p-4 rounded-2xl text-left transition-all relative ${
                    isCurrent
                      ? 'bg-primary-500/25 border-2 border-brand-cyan shadow-lg shadow-primary-500/20'
                      : 'bg-white/5 border border-white/10 hover:bg-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isCurrent ? 'bg-primary-gradient text-white font-bold' : 'bg-white/10 text-primary-300'}`}>
                      <StepIcon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-primary-300">0{step.id + 1}</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold leading-snug line-clamp-2">{step.title}</h4>
                </button>
              );
            })}
          </div>

          {/* Active Step Showcase Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl bg-slate-950/80 border border-primary-500/30 p-6 sm:p-8 backdrop-blur-md grid md:grid-cols-12 gap-6 items-center"
            >
              <div className="md:col-span-7 space-y-4">
                <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-primary-500/20 text-brand-cyan border border-primary-400/30">
                  {clinicalSteps[activeStep].badge}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  {clinicalSteps[activeStep].title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {clinicalSteps[activeStep].desc}
                </p>
                <div className="space-y-2 pt-2">
                  {clinicalSteps[activeStep].details.map((d) => (
                    <div key={d} className="flex items-center gap-2 text-xs text-primary-200">
                      <CheckCircle2 className="w-4 h-4 text-brand-cyan shrink-0" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-5 p-5 rounded-xl bg-black/60 border border-primary-500/20 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-brand-cyan font-bold flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 animate-pulse text-rose-400" /> Vitals Telemetry
                  </span>
                  <span className="text-[10px] text-slate-400">Status: Encrypted</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Latency:</span>
                  <span className="text-brand-cyan font-bold">&lt; 45ms</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Data Protection:</span>
                  <span className="text-primary-300 font-bold">AES-256 / HIPAA Compliant</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>FHIR Interop:</span>
                  <span className="text-emerald-400 font-bold">HL7 v4 Ready</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 5. Compliance & Safety Guarantee Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="eyebrow mb-2">Compliance &amp; Privacy Guarantee</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
            Security That Meets Medical Industry Rigor
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: Shield,
              title: 'HIPAA & HITECH Compliant',
              desc: 'Rigorous administrative, physical, and technical safeguards embedded from line 1 of code.',
            },
            {
              icon: Lock,
              title: 'BAA Agreement Ready',
              desc: 'We sign standard Business Associate Agreements and maintain strict access audit logs.',
            },
            {
              icon: Activity,
              title: 'HL7 & FHIR Standard',
              desc: 'Seamless interoperability across legacy electronic health records and modern wellness apps.',
            },
            {
              icon: Stethoscope,
              title: 'Clinician-Driven UX',
              desc: 'Designed with actual doctors and nurses to eliminate documentation fatigue and clicks.',
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
            <p className="eyebrow mb-2">Clinical Capabilities</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-3">
              Built for Modern Clinical Workflows
            </h2>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
              From inpatient hospital systems to direct-to-consumer digital health startups — we engineer with medical compliance and physician ergonomics.
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
                      Clinical Focus {String(i + 1).padStart(2, '0')}
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

      {/* 7. Healthcare Products Suite */}
      {products.length > 0 && (
        <section className="relative py-12 lg:py-16 rounded-3xl max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#1a1a2e] via-[#241f48] to-[#122844] text-white">
          <div className="mb-8 max-w-xl">
            <p className="text-primary-300 text-xs font-bold tracking-widest uppercase mb-2">
              Clinical Products
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              Digital Health Products We Design &amp; Ship
            </h2>
            <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
              Tested in live clinical environments — encrypted telehealth, patient intake portals, and RPM telemetry.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p, idx) => {
              const imgs = [HEALTH_IMAGES.telehealth, HEALTH_IMAGES.tablet, HEALTH_IMAGES.lab];
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
              <p className="eyebrow mb-2">Clinical Track Record</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                Healthcare Solutions Shipped by Cubixsol
              </h2>
            </div>
            <Link to="/projects" className="text-sm font-bold text-primary-600 inline-flex items-center gap-1 hover:gap-2 transition-all">
              All projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {cases.map((c, i) => {
              const imgs = [HEALTH_IMAGES.doctor, HEALTH_IMAGES.telehealth, HEALTH_IMAGES.lab];
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

      {/* 9. Healthcare Engineering Services */}
      {services.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-3xl bg-primary-50/60 border border-primary-100">
            <h3 className="text-xl font-extrabold text-ink mb-6">Healthcare Engineering Capabilities</h3>
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
