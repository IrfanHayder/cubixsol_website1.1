import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  HeartPulse, Shield, Video, CalendarCheck, FileText, CheckCircle2,
  Stethoscope, Activity, Lock, ArrowRight, UserCheck, Sparkles,
  ClipboardList, Cpu, AlertCircle, Clock, Check, Layers, Users, Award,
  Database, Building2, ShieldCheck
} from 'lucide-react';
import Reveal, { Stagger, StaggerItem } from '../Reveal';
import { formatInline } from '../../utils/formatText';

const HEALTH_ICONS = [Users, Video, FileText, Building2, Activity, HeartPulse, Stethoscope, ShieldCheck];

export default function HealthcareLayout({ industry }) {
  // 1. Software We Build Section
  const softwareTitle = industry.solutionsTitle || 'Healthcare Software We Build';
  const softwareSubtitle = industry.solutionsSubtitle || 'We develop secure, reliable, and user-friendly healthcare software solutions that simplify clinical workflows and improve patient care.';
  const softwareItems = Array.isArray(industry.solutionsItems) && industry.solutionsItems.length > 0
    ? industry.solutionsItems
    : [
        {
          title: 'Patient Portals',
          body: 'Cubixsol develops secure patient portals that connect individuals with healthcare providers through convenient digital experiences. Patients can access appointments, medical records, prescriptions, test results, and healthcare information from a centralized platform. Our solutions improve communication between patients and providers through secure messaging, notifications, and personalized healthcare access.',
        },
        {
          title: 'Telemedicine Apps',
          body: 'Our telemedicine app development services enable healthcare organizations to provide remote consultations through secure and reliable digital platforms. Cubixsol builds telehealth applications with features such as video consultations, appointment scheduling, patient management, and virtual follow-ups. These solutions help clinics, hospitals, and healthcare professionals expand access to care beyond traditional facilities.',
        },
        {
          title: 'EHR/EMR Software Development',
          body: 'Cubixsol provides EHR software development solutions that help healthcare organizations manage electronic health records efficiently. We build customized systems for storing patient information, clinical documentation, medical histories, and healthcare data. Our EHR solutions support integrations with existing healthcare platforms through modern healthcare standards while maintaining secure data management.',
        },
        {
          title: 'Practice Management Software',
          body: 'Cubixsol creates practice management software that simplifies administrative and operational workflows for healthcare providers. Our platforms support appointment management, billing processes, staff coordination, and daily clinic operations through streamlined digital tools. Custom dashboards provide healthcare teams with better visibility and control over their practice activities.',
        },
      ];

  // 2. Built for Healthcare Standards (Approach / Standards)
  const standardsTitle = industry.approachTitle || 'Built for Healthcare Standards';
  const standardsSubtitle = industry.approachSubtitle || 'Cubixsol develops healthcare software with security-focused practices that support privacy, compliance requirements, and reliable data management.';
  const standardsItems = Array.isArray(industry.approachItems) && industry.approachItems.length > 0
    ? industry.approachItems
    : [
        {
          title: 'HIPAA-Aware Healthcare Solutions',
          subtitle: 'Cubixsol builds healthcare applications with privacy-focused architecture designed around HIPAA requirements.',
          points: [
            { heading: 'Data Protection', text: 'Our solutions protect sensitive patient information through secure data handling practices.' },
            { heading: 'Controlled Access', text: 'Healthcare platforms are designed with controlled access and user authentication features.' },
            { heading: 'Lifecycle Privacy', text: 'Development processes consider healthcare privacy standards throughout the software lifecycle.' },
          ],
        },
        {
          title: 'Data Encryption & PHI Protection',
          subtitle: 'Cubixsol prioritises data security through encryption methods that protect protected health information (PHI).',
          points: [
            { heading: 'Encrypted Storage', text: 'Patient data is secured through encrypted storage and secure data transmission.' },
            { heading: 'Exposure Controls', text: 'Access controls limit sensitive information exposure to authorised users.' },
            { heading: 'Risk Reduction', text: 'Healthcare applications are designed to reduce risks associated with unauthorised data access.' },
          ],
        },
        {
          title: 'Audit Trails & Secure Monitoring',
          subtitle: 'Cubixsol creates healthcare systems with tracking capabilities that improve transparency and accountability.',
          points: [
            { heading: 'Activity Logs', text: 'Audit trails record important user activities and system changes.' },
            { heading: 'Usage Visibility', text: 'Monitoring features provide visibility into data access and application usage.' },
            { heading: 'Secure Logging', text: 'Secure logging supports better management of healthcare information workflows.' },
          ],
        },
      ];

  // 3. Use Cases & Examples
  const useCasesTitle = industry.workAreasTitle || 'Use Cases & Examples';
  const useCasesItems = Array.isArray(industry.workAreas) && industry.workAreas.length > 0
    ? industry.workAreas
    : [
        {
          title: 'Telehealth Platforms',
          body: 'Cubixsol builds telehealth platforms that connect patients with healthcare professionals through virtual consultations, scheduling systems, and secure communication tools.',
        },
        {
          title: 'Appointment Management Systems',
          body: 'Healthcare organizations can manage appointments, reminders, cancellations, and patient interactions through customized scheduling solutions.',
        },
        {
          title: 'Patient Engagement Applications',
          body: 'We develop patient-focused applications that improve communication, provide health resources, and support continuous engagement outside clinical visits.',
        },
      ];

  // 4. Why Healthcare Teams Choose Cubixsol
  const whyChooseTitle = industry.whyChooseTitle || 'Why Healthcare Teams Choose Cubixsol';
  const whyChooseItems = Array.isArray(industry.whyChooseItems) && industry.whyChooseItems.length > 0
    ? industry.whyChooseItems
    : [
        {
          title: 'Healthcare-Focused Development Approach',
          desc: 'Cubixsol creates software solutions based on healthcare workflows, user needs, and operational requirements.',
        },
        {
          title: 'Security-First Engineering',
          desc: 'Our development process prioritises secure architecture, data protection, and reliable system performance.',
        },
        {
          title: 'Scalable Technology Solutions',
          desc: 'We build healthcare platforms that support future growth, additional users, and expanding service requirements.',
        },
        {
          title: 'Long-Term Technical Support',
          desc: 'Cubixsol provides ongoing improvements, maintenance, and technical support after software deployment.',
        },
      ];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Software We Build Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-10 sm:mb-14 text-center max-w-3xl mx-auto">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-50 text-primary-700 border border-primary-200 mb-3 shadow-sm">
            Clinical Solutions
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-3">
            {softwareTitle}
          </h2>
          {softwareSubtitle && (
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {softwareSubtitle}
            </p>
          )}
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {softwareItems.map((item, idx) => {
            const Icon = HEALTH_ICONS[idx % HEALTH_ICONS.length];
            return (
              <motion.div
                key={item.title || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="rounded-3xl bg-white border border-gray-100 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-card hover:border-primary-300 hover:shadow-elev transition-all group"
              >
                <div className="h-1.5 w-16 bg-gradient-to-r from-[#00a4d8] to-[#5d53a3] rounded-full mb-6" />
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mb-5 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-ink mb-3 group-hover:text-primary-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {formatInline(item.body || item.desc || '')}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center text-xs font-bold text-primary-600 group-hover:text-primary-700">
                  <span>Explore Architecture</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 2. Built for Healthcare Standards (Approach / Standards Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-10 sm:mb-14 text-center max-w-3xl mx-auto">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-50 text-primary-700 border border-primary-200 mb-3 shadow-sm">
            Compliance &amp; Reliability
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-3">
            {standardsTitle}
          </h2>
          {standardsSubtitle && (
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {standardsSubtitle}
            </p>
          )}
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {standardsItems.map((item, idx) => (
            <motion.div
              key={item.title || idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="rounded-3xl bg-white border border-gray-100 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-card hover:border-primary-300 hover:shadow-elev transition-all group"
            >
              <div className="h-1.5 w-16 bg-[#00a4d8] rounded-full mb-6" />

              <div className="space-y-4">
                <h3 className="text-lg sm:text-xl font-extrabold text-ink tracking-tight pt-1 group-hover:text-primary-700 transition-colors">
                  {item.title}
                </h3>
                {item.subtitle && (
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                    {item.subtitle}
                  </p>
                )}

                {item.points && item.points.length > 0 && (
                  <div className="space-y-3 pt-2">
                    {item.points.map((pt, pIdx) => (
                      <div key={pIdx} className="text-xs sm:text-sm text-gray-700 leading-relaxed flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-600 mt-2 shrink-0" />
                        <div>
                          {pt.heading && <strong className="font-bold text-ink inline">{pt.heading}: </strong>}
                          <span className="text-gray-600 text-xs sm:text-sm">{pt.text || pt}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Use Cases & Examples */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-10 sm:mb-14 text-center max-w-3xl mx-auto">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-50 text-primary-700 border border-primary-200 mb-3 shadow-sm">
            Practical Applications
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight">
            {useCasesTitle}
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCasesItems.map((item, idx) => (
            <motion.div
              key={item.title || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-gray-100 shadow-card hover:border-primary-300 hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#00a4d8] to-[#5d53a3] text-white font-mono text-sm font-bold flex items-center justify-center shadow-md mb-4 group-hover:scale-105 transition-transform">
                  0{idx + 1}
                </span>
                <h3 className="text-lg font-bold text-ink mb-2.5 group-hover:text-primary-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {formatInline(item.body || item.desc || '')}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Why Healthcare Teams Choose Cubixsol */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-10 sm:mb-14 text-center max-w-3xl mx-auto">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-50 text-primary-700 border border-primary-200 mb-3 shadow-sm">
            Why Choose Us
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight">
            {whyChooseTitle}
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseItems.map((item, idx) => (
            <motion.div
              key={item.title || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-gray-100 shadow-card hover:border-primary-300 hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-ink mb-2 group-hover:text-primary-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {formatInline(item.desc || item.body || '')}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
