import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  GraduationCap, BookOpen, School, Users, BarChart3,
  Smartphone, Shield, CheckCircle2, ArrowRight, Sparkles,
  Layers, MessageSquare, Award, FileText, Cpu, Check,
  Laptop, Video, ShieldCheck, Database, Lock, Clock, Globe
} from 'lucide-react';
import Reveal, { Stagger, StaggerItem } from '../Reveal';
import { formatInline } from '../../utils/formatText';

const EDU_ICONS = [GraduationCap, Laptop, Users, Cpu, BookOpen, School, Layers, Award];

export default function EducationLayout({ industry }) {
  // 1. Education Software We Build Section
  const softwareTitle = industry.solutionsTitle || 'Education Software We Build';
  const softwareSubtitle = industry.solutionsSubtitle || 'We develop secure, reliable, and user-friendly education software solutions that simplify academic workflows and enhance digital learning.';
  const softwareItems = Array.isArray(industry.solutionsItems) && industry.solutionsItems.length > 0
    ? industry.solutionsItems
    : [
        {
          title: 'LMS Development',
          body: 'Cubixsol provides LMS development services for schools, universities, and training organisations that need complete control over digital learning environments. We develop custom LMS platforms with course management, student tracking, assessments, reporting dashboards, and collaboration features.',
        },
        {
          title: 'eLearning Platform Development',
          body: 'Our eLearning software development solutions help businesses and institutions deliver engaging online education experiences. We create platforms with interactive lessons, video learning, quizzes, certifications, and personalised learning paths that improve knowledge delivery.',
        },
        {
          title: 'Student Portals and Learning Dashboards',
          body: 'We build student portals that provide easy access to courses, assignments, grades, schedules, and communication tools. Educators and learners receive dedicated dashboards that improve visibility and simplify academic interactions.',
        },
        {
          title: 'EdTech Software Solutions',
          body: 'Cubixsol delivers edtech software development services for startups and established education companies. We create innovative platforms such as virtual classrooms, AI-powered learning tools, tutoring systems, and education marketplaces.',
        },
      ];

  // 2. Built for Education Standards (Compliance & Standards)
  const standardsTitle = industry.approachTitle || 'Built for Education Standards';
  const standardsSubtitle = industry.approachSubtitle || 'Cubixsol develops education platforms with security, accessibility, and compliance requirements';
  const standardsItems = Array.isArray(industry.approachItems) && industry.approachItems.length > 0
    ? industry.approachItems
    : [
        {
          title: 'FERPA-Aware Data Protection',
          subtitle: 'Cubixsol creates education platforms with privacy-focused architecture designed around academic compliance.',
          points: [
            { heading: 'Access Controls', text: 'We develop systems with secure access controls to protect educational records.' },
            { heading: 'Role-Based Permissions', text: 'Our platforms support role-based permissions for students, teachers, and administrators.' },
            { heading: 'Privacy Management', text: 'We follow privacy-focused practices for managing sensitive academic information.' },
          ],
        },
        {
          title: 'WCAG Accessibility Compliance',
          subtitle: 'Cubixsol builds inclusive digital learning interfaces that serve all students.',
          points: [
            { heading: 'Universal Interfaces', text: 'We create accessible interfaces that support diverse learner requirements.' },
            { heading: 'Adaptable Structures', text: 'Our platforms include user-friendly navigation and adaptable content structures.' },
            { heading: 'Continuous Auditing', text: 'We consider accessibility standards throughout the design and development process.' },
          ],
        },
        {
          title: 'Student Data Privacy & Security',
          subtitle: 'We implement robust protections for learner privacy and communications.',
          points: [
            { heading: 'Encrypted Storage', text: 'We protect student information through secure data storage and communication practices.' },
            { heading: 'Minor Privacy Controls', text: 'Our solutions support privacy controls for managing minors\' educational data.' },
            { heading: 'Safe Environments', text: 'We build trusted platforms that promote safe digital learning environments.' },
          ],
        },
        {
          title: 'Secure & Reliable Education Infrastructure',
          subtitle: 'High-availability cloud architectures built for campus-wide scale.',
          points: [
            { heading: 'Scalable Scaling', text: 'We develop scalable platforms that support growing users and learning content.' },
            { heading: 'Tool Integrations', text: 'Our solutions integrate securely with third-party education tools and services.' },
            { heading: 'Long-Term Reliability', text: 'We provide reliable architectures designed for long-term performance.' },
          ],
        },
      ];

  // 3. Use Cases & Examples
  const useCasesTitle = industry.workAreasTitle || 'Use Cases & Examples';
  const useCasesItems = Array.isArray(industry.workAreas) && industry.workAreas.length > 0
    ? industry.workAreas
    : [
        {
          title: 'Online Course Platforms',
          body: 'We create online course platforms that allow educators and organisations to publish content, manage learners, conduct assessments, and track progress through a centralised system.',
        },
        {
          title: 'University Learning Management Systems',
          body: 'Higher education institutions can use custom LMS solutions to manage courses, virtual classrooms, assignments, grading, and student engagement across multiple departments.',
        },
        {
          title: 'Corporate Training Platforms',
          body: 'Organisations can launch employee learning platforms with certification programs, skill tracking, and professional development resources.',
        },
      ];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Education Software We Build Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-10 sm:mb-14 text-center max-w-3xl mx-auto">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-50 text-primary-700 border border-primary-200 mb-3 shadow-sm">
            EdTech Capabilities
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
            const Icon = EDU_ICONS[idx % EDU_ICONS.length];
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
                  <span>Explore Features</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 2. Built for Education Standards (Standards / Approach Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-10 sm:mb-14 text-center max-w-3xl mx-auto">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-primary-50 text-primary-700 border border-primary-200 mb-3 shadow-sm">
            Security &amp; Compliance
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
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
    </div>
  );
}
