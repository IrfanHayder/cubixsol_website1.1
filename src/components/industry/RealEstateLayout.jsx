import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Building2, Home, MapPin, KeyRound, Search, CheckCircle2,
  Users, Sparkles, FileCheck, Layers, ArrowRight, Eye,
  Compass, Map, ShieldCheck, Zap, RefreshCw, Smartphone,
  Sliders, Database, Check, Cpu, Code2, Server, Globe, Laptop
} from 'lucide-react';
import Reveal, { Stagger, StaggerItem } from '../Reveal';
import { formatInline, FormatRichText } from '../../utils/formatText';

export default function RealEstateLayout({ industry = {} }) {
  // 1. Software We Build
  const softwareTitle = industry.solutionsTitle || 'Real Estate Software We Build';
  const softwareSubtitle =
    industry.solutionsSubtitle ||
    'Our real estate software development services build solutions that connect real estate businesses with buyers, sellers, tenants, agents, and property owners.';

  const softwareItems = Array.isArray(industry.solutionsItems) && industry.solutionsItems.length > 0
    ? industry.solutionsItems
    : [
        {
          title: 'Property Listing & Portal Software',
          body: `Property platforms give buyers and tenants a simple way to discover properties, compare options, and contact agents.

- **Listing platforms** let agents publish property details, photos, pricing, availability, and location information.
- **Property portals** connect buyers, sellers, landlords, tenants, and agents through searchable property marketplaces.
- **Property search features** let users filter listings by location, price, property type, size, amenities, and availability.`,
        },
        {
          title: 'Real Estate CRM & Management Software',
          body: `Real estate CRM and management systems organise customer relationships alongside property operations.

- **Real estate CRM software** helps agents track leads, client interactions, follow-ups, deals, and sales pipelines.
- **Property management software** supports rent collection, lease records, tenant communication, maintenance requests, and property records.
- **Administrative dashboards** give teams centralized access to clients, properties, transactions, tasks, and performance data.`,
        },
        {
          title: 'Real Estate App Development',
          body: `Our **real estate app development services** create mobile experiences to support property discovery, communication, transactions, and account management.

- **Property apps** let users browse listings, save properties, schedule visits, and contact agents from mobile devices.
- **Agent apps** provide tools for managing leads, appointments, listings, client communication, and property updates.
- **Owner and tenant apps** support rent payments, maintenance requests, lease information, notifications, and property communication.`,
        },
      ];

  // 2. Use Cases & Examples
  const useCasesTitle = industry.workAreasTitle || 'Use Cases & Examples';
  const useCasesIntro =
    industry.workAreasIntro ||
    'Real estate businesses use custom software to manage property transactions, customer relationships, and rental operations.';

  const useCasesItems = Array.isArray(industry.workAreas) && industry.workAreas.length > 0
    ? industry.workAreas
    : [
        {
          title: 'Property Marketplace Platform',
          body: 'A property marketplace connects buyers and tenants with property owners and agents through a searchable digital platform. Users can discover properties, compare listings, contact sellers, and schedule property visits from one place.',
        },
        {
          title: 'Real Estate Agent CRM',
          body: 'A real estate CRM gives agencies a centralised system for managing leads, clients, properties, and sales activities. Agents can track prospects from their first inquiry through property viewings, negotiations, and completed transactions.',
        },
        {
          title: 'Rental Management Software',
          body: 'A rental management app connects property owners, managers, and tenants through a single platform for daily rental operations. The solution simplifies rent collection, lease administration, maintenance requests, and tenant communication.',
        },
      ];

  // 3. Tech Stack
  const techTitle = industry.techTitle || 'Technology Stack for Real Estate Software';
  const techIntro =
    industry.techIntro ||
    'Our technology stack supports secure, scalable, and responsive real estate platforms across web and mobile devices. We selects technologies based on your product requirements, integrations, performance goals, and long-term growth.';

  const techItems = Array.isArray(industry.techItems) && industry.techItems.length > 0
    ? industry.techItems
    : [
        {
          title: 'React for Real Estate Web Applications',
          desc: 'React supports responsive interfaces for property portals, listing platforms, dashboards, and customer-facing web applications. Its component-based architecture allows teams to create consistent interfaces across complex real estate platforms.',
        },
        {
          title: 'Node.js for Backend Development',
          desc: 'Node.js provides a scalable backend for real estate platforms that manage users, listings, transactions, communications, and property data. Its event-driven architecture supports real-time features such as notifications, chat, and property updates.',
        },
        {
          title: 'Maps APIs for Property Location Features',
          desc: 'Maps APIs add location-based features to property platforms and mobile applications. Users can search properties by location, view listings on interactive maps, calculate distances, and explore nearby amenities.',
        },
        {
          title: 'Flutter for Real Estate Mobile Apps',
          desc: 'Flutter enables development of cross-platform real estate mobile applications from a shared codebase. Businesses can launch apps for Android and iOS with consistent interfaces and core functionality.',
        },
      ];

  // 4. Why Choose Us
  const whyChooseTitle = industry.whyChooseTitle || 'Why Real Estate Teams Choose Cubixsol';
  const whyChooseItems = Array.isArray(industry.whyChooseItems) && industry.whyChooseItems.length > 0
    ? industry.whyChooseItems
    : [
        { title: 'Real Estate Domain Expertise', desc: 'Deep industry experience building specialized platforms for property developers, brokerages, and managers.' },
        { title: 'Secure Software Architecture', desc: 'Enterprise-grade encryption, secure user authentication, and data privacy protecting every real estate deal.' },
        { title: 'Scalable Technology Architecture', desc: 'Cloud-native infrastructure designed to handle millions of listings, concurrent searches, and image media.' },
        { title: 'Transparent Project Delivery', desc: 'Agile sprints, milestone demos, clear timelines, and dedicated engineering pods for predictable delivery.' },
        { title: 'Seamless Third-Party Integrations', desc: 'Direct integration with MLS/IDX feeds, Maps APIs, payment processors, and property management systems.' },
        { title: 'Reliable Post-Launch Support', desc: 'Continuous monitoring, routine security patches, performance tuning, and ongoing feature enhancements.' },
      ];

  const softwareIcons = [Search, Sliders, Smartphone, Building2, KeyRound];
  const techIcons = [Laptop, Server, MapPin, Smartphone];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 🏢 1. Real Estate Software We Build */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary-700 border border-primary-200 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            <Building2 className="w-3.5 h-3.5 text-primary-600" />
            <span>PropTech Capabilities</span>
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

        <Stagger className="grid md:grid-cols-3 gap-6 sm:gap-8" staggerDelay={0.08}>
          {softwareItems.map((item, idx) => {
            const SIcon = softwareIcons[idx % softwareIcons.length] || Building2;
            return (
              <StaggerItem key={item.title || idx}>
                <div className="p-7 sm:p-8 rounded-2xl bg-white border border-gray-100 shadow-card hover:border-primary-300 hover:shadow-elev transition-all duration-300 h-full flex flex-col group relative overflow-hidden">
                  {/* Top Subtle Red/Cyan Accent Line */}
                  <div className="h-1 w-12 bg-red-600 rounded-full mb-6 group-hover:w-20 transition-all duration-300" />

                  <div className="flex items-center gap-3.5 mb-5">
                    <span className="w-11 h-11 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300 shrink-0">
                      <SIcon className="w-5 h-5" />
                    </span>
                    <h3 className="font-extrabold text-ink text-lg sm:text-xl group-hover:text-primary-600 transition-colors leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <div className="text-sm text-gray-600 leading-relaxed flex-1 space-y-4">
                    <FormatRichText
                      text={item.body || item.desc || ''}
                      itemClassName="text-sm text-gray-600"
                      strongClass="font-bold text-ink"
                      bulletColor="bg-primary-600"
                    />
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      {/* 🗺️ 2. Use Cases & Examples */}
      <section className="bg-slate-50/80 py-14 sm:py-20 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-primary-700 border border-primary-200 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
              <Layers className="w-3.5 h-3.5 text-primary-600" />
              <span>Real Estate Solutions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-3">
              {useCasesTitle}
            </h2>
            {useCasesIntro && (
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                {useCasesIntro}
              </p>
            )}
          </Reveal>

          <Stagger className="grid md:grid-cols-3 gap-6 sm:gap-8" staggerDelay={0.07}>
            {useCasesItems.map((u, idx) => (
              <StaggerItem key={u.title || idx}>
                <div className="p-7 sm:p-8 rounded-2xl bg-white border border-gray-100 shadow-card hover:border-primary-300 hover:shadow-elev transition-all duration-300 h-full flex flex-col group">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#00a4d8] to-[#5d53a3] text-white font-mono text-xs font-extrabold flex items-center justify-center shadow-sm shrink-0">
                      0{idx + 1}
                    </span>
                    <h3 className="font-extrabold text-ink text-lg group-hover:text-primary-600 transition-colors">
                      {u.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed flex-1">
                    {formatInline(u.body || u.desc || '')}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ⚙️ 3. Technology Stack for Real Estate Software */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary-700 border border-primary-200 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            <Cpu className="w-3.5 h-3.5 text-primary-600" />
            <span>Architecture &amp; Stacks</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-3">
            {techTitle}
          </h2>
          {techIntro && (
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {techIntro}
            </p>
          )}
        </Reveal>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.06}>
          {techItems.map((tech, idx) => {
            const TIcon = techIcons[idx % techIcons.length] || Code2;
            return (
              <StaggerItem key={tech.title || idx}>
                <div className="p-6 sm:p-7 rounded-2xl bg-white border border-gray-100 shadow-card hover:border-primary-300 hover:shadow-elev transition-all duration-300 h-full flex flex-col group">
                  <div className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <TIcon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-ink text-base sm:text-lg mb-2 group-hover:text-primary-600 transition-colors leading-snug">
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
      </section>

      {/* 🛡️ 4. Why Real Estate Teams Choose Cubixsol */}
      <section className="bg-gradient-to-b from-white via-primary-50/20 to-white py-14 sm:py-20 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-50 text-primary-700 border border-primary-200 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-primary-600" />
              <span>Proven Partnership</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-3">
              {whyChooseTitle}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              We engineer dependable PropTech and real estate software built around your operational workflows and business objectives.
            </p>
          </Reveal>

          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.05}>
            {whyChooseItems.map((item, idx) => {
              const icons = [Building2, ShieldCheck, Server, Sparkles, Layers, RefreshCw];
              const BIcon = icons[idx % icons.length];
              return (
                <StaggerItem key={item.title || idx}>
                  <div className="p-6 sm:p-7 rounded-2xl bg-white border border-gray-100 shadow-card hover:border-primary-300 hover:shadow-elev transition-all duration-300 h-full flex flex-col group">
                    <div className="w-11 h-11 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shrink-0">
                      <BIcon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-ink text-base sm:text-lg mb-2 group-hover:text-primary-600 transition-colors">
                      {item.title}
                    </h3>
                    {item.desc && (
                      <p className="text-sm text-gray-600 leading-relaxed flex-1">
                        {formatInline(item.desc)}
                      </p>
                    )}
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>
    </div>
  );
}
