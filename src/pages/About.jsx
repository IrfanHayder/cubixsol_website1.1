import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users2, Lightbulb, Target, ArrowRight, Quote, Gem, Shield, Rocket,
  ChevronLeft, ChevronRight, CheckCircle2, Sparkles, Award, TrendingUp,
  Globe2, Star, Clock, HeartHandshake, Code2, Compass
} from 'lucide-react';
import { values, team, processSteps } from '../data/content';
import Breadcrumb from '../components/Breadcrumb';
import CtaBanner from '../components/CtaBanner';
import TechStack from '../components/TechStack';
import JourneyPath from '../components/JourneyPath';
import { LinkedinIcon } from '../components/SocialIcons';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';
import WorkShowcase from '../components/WorkShowcase';

const safeValues = Array.isArray(values) ? values : [];
const safeTeam = Array.isArray(team) ? team : [];
const safeProcess = Array.isArray(processSteps) ? processSteps : [];

const stats = [
  { num: '150+', label: 'Happy Clients', desc: 'Across 20+ countries worldwide', icon: Users2 },
  { num: '200+', label: 'Projects Delivered', desc: 'Web, mobile & AI solutions', icon: Rocket },
  { num: '10+', label: 'Years of Experience', desc: 'Crafting digital products since 2015', icon: Award },
  { num: '98%', label: 'Client Satisfaction', desc: 'Consistent 5-star quality rating', icon: Star },
  { num: '20+', label: 'Countries Served', desc: 'Global digital footprint', icon: Globe2 },
];

const valueIcons = [Gem, Lightbulb, HeartHandshake, Shield, Rocket];

const milestones = [
  {
    year: '2015',
    title: 'Company Founded',
    desc: 'Started with a passionate core team of 3 engineers with a vision to build world-class digital products.',
    icon: Rocket,
  },
  {
    year: '2018',
    title: 'Global Expansion',
    desc: 'Expanded remote delivery across the US, UK, Europe, and UAE, delivering enterprise-grade web solutions.',
    icon: Globe2,
  },
  {
    year: '2021',
    title: 'AI & Cloud Practice',
    desc: 'Launched specialized AI workflows, chatbot engineering, and scalable AWS cloud consulting services.',
    icon: Code2,
  },
  {
    year: '2024+',
    title: '200+ Products Delivered',
    desc: 'Crossed 200+ successful client deployments with an industry-leading 98% satisfaction rate.',
    icon: Award,
  },
];

export default function About() {
  const [teamIndex, setTeamIndex] = useState(0);
  const visible = 5;
  const canPrev = teamIndex > 0;
  const canNext = teamIndex + visible < safeTeam.length;

  return (
    <div className="bg-white overflow-hidden">
      <Breadcrumb current="About Us" />

      {/* HERO SECTION — Modern, High-Impact & Logo-Aligned */}
      <section className="relative pt-6 pb-16 lg:pt-10 lg:pb-24 overflow-hidden">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none z-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-[#00a4d8]/15 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-bl from-[#5d53a3]/12 to-[#1f62dd]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7">
              <Reveal direction="right">
                {/* Pill Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-sky-50 to-cyan-50 border border-cyan-200/80 text-[#00a4d8] text-xs font-extrabold uppercase tracking-widest mb-5 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#00a4d8] animate-pulse" />
                  <span>About Cubixsol Studio</span>
                </div>

                {/* Primary Heading */}
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.15] text-ink tracking-tight mb-5">
                  We Turn Bold Ideas Into Powerful{' '}
                  <span className="bg-clip-text text-transparent bg-[linear-gradient(135deg,#00a4d8_0%,#1f62dd_50%,#5d53a3_100%)]">
                    Digital Solutions
                  </span>
                </h1>

                {/* Subtitle Description */}
                <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
                  Cubixsol is a premier full-service digital engineering and technology partner. We empower startups, scale-ups, and global brands to automate operations, scale architectures, and dominate their markets through modern full-stack web, mobile, and AI-driven innovation.
                </p>

                {/* 3 Value Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-8">
                  {[
                    {
                      icon: Users2,
                      title: 'Client-Centric',
                      desc: 'Tailored sprint squads focused on your business ROI.',
                      color: 'from-sky-400 to-[#00a4d8]',
                    },
                    {
                      icon: Lightbulb,
                      title: 'AI & Innovation',
                      desc: 'Next-gen intelligence built into scalable workflows.',
                      color: 'from-[#00a4d8] to-[#1f62dd]',
                    },
                    {
                      icon: Target,
                      title: 'Measurable Impact',
                      desc: 'High velocity, clean code, and guaranteed uptime.',
                      color: 'from-[#1f62dd] to-[#5d53a3]',
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="group bg-white/90 backdrop-blur-xs border border-gray-100 hover:border-cyan-200 rounded-2xl p-4 shadow-xs hover:shadow-card hover:-translate-y-1 transition-all duration-300"
                      >
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white mb-3 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <h3 className="text-sm font-extrabold text-ink mb-1 group-hover:text-[#00a4d8] transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Action CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3.5">
                  <Link to="/contact" className="btn-primary shadow-lg shadow-sky-500/20">
                    Get in Touch <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link to="/projects" className="btn-outline">
                    Explore Our Work
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Right Visual Composition — Layered Glass & Floating Badges */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <Reveal direction="left" delay={0.15}>
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  {/* Outer Glowing Border Ring */}
                  <div className="relative rounded-[2rem] p-2 bg-gradient-to-tr from-[#00a4d8]/30 via-white/50 to-[#5d53a3]/30 shadow-2xl shadow-sky-900/10">
                    <div className="rounded-[1.6rem] overflow-hidden aspect-[4/3] sm:aspect-[1/1] lg:aspect-[4/3] relative group">
                      <img
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
                        alt="Cubixsol digital engineering team collaborating"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-60" />
                    </div>
                  </div>

                  {/* Floating Badge 1: 10+ Years Experience (Top-Left) */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -top-5 -left-3 sm:-left-6 bg-white/95 backdrop-blur-md border border-cyan-100 rounded-2xl p-3.5 sm:p-4 shadow-[0_15px_30px_-5px_rgba(0,164,216,0.2)] flex items-center gap-3 z-20"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00a4d8] to-[#1f62dd] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-ink">10+ Years</p>
                      <p className="text-[11px] text-gray-500">Excellence Since 2015</p>
                    </div>
                  </motion.div>

                  {/* Floating Badge 2: 98% Satisfaction & Projects (Bottom-Right) */}
                  <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                    className="absolute -bottom-6 -right-3 sm:-right-6 bg-white/95 backdrop-blur-md border border-cyan-100 rounded-2xl p-3.5 sm:p-4 shadow-[0_20px_35px_-5px_rgba(31,98,221,0.2)] z-20 max-w-[230px]"
                  >
                    <div className="flex items-center gap-1.5 mb-1.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-xs font-extrabold text-ink ml-1">98%</span>
                    </div>
                    <p className="text-xs font-extrabold text-ink leading-tight mb-0.5">
                      200+ Delivered Products
                    </p>
                    <p className="text-[11px] text-gray-500">
                      Trusted by founders worldwide
                    </p>
                  </motion.div>

                  {/* Floating Mission Quote Card */}
                  <div className="absolute -bottom-8 left-4 sm:left-6 right-16 sm:right-24 hidden sm:flex bg-white/95 backdrop-blur-md rounded-2xl shadow-soft border border-gray-100 p-3.5 items-center gap-3 z-10">
                    <Quote className="w-5 h-5 text-[#00a4d8] shrink-0" />
                    <p className="text-xs font-semibold text-ink leading-snug">
                      Simplifying technology, accelerating digital success.
                    </p>
                  </div>

                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* WORK SHOWCASE — Curved Fan Gallery */}
      <WorkShowcase />

      {/* STATS BAND — Modern Logo-Themed Metrics */}
      <section className="relative py-12 lg:py-16 bg-gradient-to-b from-sky-50/40 via-cyan-50/20 to-white border-y border-cyan-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Stagger
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 text-center"
            staggerDelay={0.08}
          >
            {stats.map((item) => {
              const Icon = item.icon;
              return (
                <StaggerItem key={item.label} hover>
                  <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 hover:border-cyan-200 shadow-xs hover:shadow-card hover:-translate-y-1 transition-all duration-300 h-full flex flex-col items-center justify-center">
                    <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#00a4d8] flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-1 bg-clip-text text-transparent bg-[linear-gradient(135deg,#00a4d8_0%,#1f62dd_100%)]">
                      {item.num}
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-ink mb-0.5">
                      {item.label}
                    </p>
                    <p className="text-[11px] text-gray-400 hidden sm:block">
                      {item.desc}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* STORY & MISSION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Narrative */}
          <div className="lg:col-span-6">
            <Reveal direction="right">
              <p className="eyebrow mb-3">Our Story</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-5 leading-tight">
                A Decade of Innovation, Engineering, and Proven Growth
              </h2>
              <p className="text-gray-600 mb-4 text-base leading-relaxed">
                Founded with a bold vision to bring agility, engineering elegance, and absolute simplicity together, Cubixsol has evolved into a global digital partner trusted by venture-backed startups and established enterprises.
              </p>
              <p className="text-gray-600 mb-6 text-base leading-relaxed">
                From high-performing web platforms and native mobile apps to autonomous AI workflows and enterprise cloud architectures, we build resilient, future-ready products designed to scale with your ambitions.
              </p>
              
              <ul className="space-y-3 mb-8">
                {[
                  'Strategic product engineering over standard templates',
                  '100% transparent sprint communication with daily visibility',
                  'Long-term technical stewardship and dedicated maintenance squads',
                  'Rigorous QA, automated testing, and security-first architectures',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm font-medium text-ink">
                    <span className="w-5 h-5 rounded-full bg-cyan-100/80 text-[#00a4d8] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-4">
                <Link to="/services" className="btn-primary">
                  Explore Our Services <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/contact" className="btn-outline">
                  Talk to Our Engineers
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right Mission & Vision Cards */}
          <div className="lg:col-span-6">
            <Reveal direction="left" delay={0.1} className="space-y-6">
              
              {/* Mission Card */}
              <div className="bg-gradient-to-br from-white via-white to-sky-50/50 rounded-3xl p-7 sm:p-8 border border-cyan-100/80 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-100/40 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00a4d8] to-[#1f62dd] text-white flex items-center justify-center shrink-0 shadow-md">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#00a4d8] bg-cyan-50 px-2.5 py-0.5 rounded-full">
                      Our Mission
                    </span>
                    <h3 className="text-xl font-extrabold text-ink mt-2 mb-2">
                      Empowering Digital Leaders
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      To simplify complex technology and engineer high-performance digital solutions that allow businesses to automate workflows, accelerate revenue, and lead their industries.
                    </p>
                  </div>
                </div>
              </div>

              {/* Vision Card */}
              <div className="bg-gradient-to-br from-white via-white to-purple-50/40 rounded-3xl p-7 sm:p-8 border border-purple-100/80 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100/30 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1f62dd] to-[#5d53a3] text-white flex items-center justify-center shrink-0 shadow-md">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#5d53a3] bg-purple-50 px-2.5 py-0.5 rounded-full">
                      Our Vision
                    </span>
                    <h3 className="text-xl font-extrabold text-ink mt-2 mb-2">
                      Global Benchmark for Digital Excellence
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      To be the world’s most trusted software innovation partner, recognized for exceptional craftsmanship, uncompromised honesty, and transformative client partnerships.
                    </p>
                  </div>
                </div>
              </div>

            </Reveal>
          </div>

        </div>
      </section>

      {/* MILESTONES — Interactive Evolutionary Timeline */}
      <section className="bg-gray-50/70 py-16 lg:py-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <p className="eyebrow mb-3">Milestones</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-3">
              Our Journey of Growth & Innovation
            </h2>
            <p className="text-gray-500 text-base">
              A decade-long timeline of milestones, breakthrough client launches, and technical evolution.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, i) => {
              const Icon = m.icon;
              return (
                <Reveal key={m.year} delay={i * 0.08} scale>
                  <div className="bg-white rounded-2xl border border-gray-100 hover:border-cyan-200 p-6 shadow-card hover:shadow-elev hover:-translate-y-1.5 transition-all duration-300 h-full relative flex flex-col justify-between group">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl lg:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-[linear-gradient(135deg,#00a4d8_0%,#1f62dd_100%)]">
                          {m.year}
                        </span>
                        <span className="w-9 h-9 rounded-xl bg-cyan-50 text-[#00a4d8] flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon className="w-4.5 h-4.5" />
                        </span>
                      </div>
                      <h3 className="font-extrabold text-ink text-lg mb-2 group-hover:text-[#00a4d8] transition-colors">
                        {m.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                        {m.desc}
                      </p>
                    </div>
                    <div className="mt-5 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-bold text-[#00a4d8]">
                      <span>Phase {i + 1}</span>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* JOURNEY VISUAL */}
      <JourneyPath />

      {/* VALUES — Core Operating Principles */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <p className="eyebrow mb-3">Our Core Values</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-3">
              The Guiding Principles Behind Every Line of Code
            </h2>
            <p className="text-gray-500 text-base">
              We believe strong principles build enduring digital solutions.
            </p>
          </Reveal>

          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5" staggerDelay={0.08}>
            {safeValues.map((v, i) => {
              const Icon = valueIcons[i] || Gem;
              return (
                <StaggerItem key={v.title} hover>
                  <div className="bg-white rounded-2xl border border-gray-100 hover:border-cyan-200 p-6 text-center h-full hover:-translate-y-2 hover:shadow-card transition-all duration-300 flex flex-col items-center justify-between group">
                    <div>
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-50 to-sky-100 text-[#00a4d8] flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-[#00a4d8] group-hover:to-[#1f62dd] group-hover:text-white transition-all duration-300 shadow-xs">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-extrabold text-ink text-base mb-2 group-hover:text-[#00a4d8] transition-colors">
                        {v.title}
                      </h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        {v.desc}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="bg-gray-50/60 py-16 lg:py-20 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <p className="eyebrow mb-3">How We Work</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-3">
              A Clear, Proven Path from Idea to Launch
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              Structured sprint cycles designed for transparency, agility, and on-time product release.
            </p>
          </Reveal>

          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4" staggerDelay={0.07}>
            {safeProcess.map((step) => (
              <StaggerItem key={step.step} hover>
                <div className="rounded-2xl border border-gray-100 bg-white p-5 h-full hover:border-cyan-300 hover:shadow-card transition-all flex flex-col justify-between group">
                  <div>
                    <div className="flex items-baseline gap-2.5 mb-2.5">
                      <span className="text-2xl font-extrabold text-cyan-500/80 tracking-tight shrink-0 group-hover:text-[#00a4d8] transition-colors">
                        {step.step}
                      </span>
                      <h3 className="font-bold text-ink text-sm sm:text-base leading-snug">
                        {step.title}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* TECH STACK */}
      <TechStack />

      {/* TEAM SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="eyebrow mb-3">Our Leadership & Team</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-3">
            Passionate Engineers, Designers & Problem Solvers
          </h2>
          <p className="text-gray-500 text-base">
            Meet the talented strategists, developers, and designers behind world-class digital products.
          </p>
        </div>

        <div className="relative">
          <div className="flex justify-end gap-2 mb-6">
            <button
              onClick={() => canPrev && setTeamIndex(teamIndex - 1)}
              aria-label="Previous Team Members"
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition ${
                canPrev ? 'border-gray-200 text-ink hover:border-[#00a4d8] hover:text-[#00a4d8]' : 'border-gray-100 text-gray-300 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => canNext && setTeamIndex(teamIndex + 1)}
              aria-label="Next Team Members"
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition ${
                canNext ? 'border-gray-200 text-ink hover:border-[#00a4d8] hover:text-[#00a4d8]' : 'border-gray-100 text-gray-300 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <Stagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6" staggerDelay={0.06}>
            {safeTeam.slice(teamIndex, teamIndex + visible).map((m) => (
              <StaggerItem key={m.name} hover>
                <div className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-cyan-200 text-center hover:-translate-y-1.5 hover:shadow-card transition-all duration-300 group">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-100 via-sky-100 to-indigo-100 mx-auto mb-4 flex items-center justify-center text-[#00a4d8] font-extrabold text-lg border-2 border-white shadow-sm group-hover:scale-105 transition-transform">
                    {m.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)}
                  </div>
                  <h3 className="font-extrabold text-ink text-sm sm:text-base group-hover:text-[#00a4d8] transition-colors">
                    {m.name}
                  </h3>
                  <p className="text-xs text-gray-400 mb-3">{m.role}</p>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${m.name} LinkedIn`}
                    className="inline-flex w-8 h-8 rounded-full bg-gray-50 items-center justify-center text-gray-400 hover:bg-cyan-50 hover:text-[#00a4d8] border border-gray-100 transition-colors"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5" />
                  </a>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA BANNER */}
      <CtaBanner />
    </div>
  );
}
