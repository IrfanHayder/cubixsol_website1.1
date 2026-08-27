import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users2, Lightbulb, Target, ArrowRight, Quote, Gem, Shield, Rocket,
  ChevronLeft, ChevronRight, CheckCircle2,
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
  ['150+', 'Happy Clients'],
  ['200+', 'Projects Delivered'],
  ['10+', 'Years of Experience'],
  ['98%', 'Client Satisfaction'],
  ['20+', 'Countries Served'],
];

const valueIcons = [Gem, Lightbulb, Users2, Shield, Rocket];

const milestones = [
  { year: '2015', title: 'Founded', desc: 'Started with a small team and a big vision for digital products.' },
  { year: '2018', title: 'Global clients', desc: 'Expanded delivery across the US, Europe, and the Middle East.' },
  { year: '2021', title: 'AI practice', desc: 'Launched dedicated AI & automation services for growth teams.' },
  { year: '2024', title: '200+ projects', desc: 'Crossed 200 delivered products with 98% client satisfaction.' },
];

export default function About() {
  const [teamIndex, setTeamIndex] = useState(0);
  const visible = 5;
  const canPrev = teamIndex > 0;
  const canNext = teamIndex + visible < safeTeam.length;

  return (
    <div>
      <Breadcrumb current="About Us" />

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal direction="right" scale>
            <p className="eyebrow mb-3">About Cubixsol</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-ink mb-5">
              We Turn Ideas Into Powerful{' '}
              <span className="bg-clip-text text-transparent bg-primary-gradient">Digital Solutions</span>
            </h1>
            <p className="text-gray-500 mb-8 text-lg">
              Cubixsol is a full-service digital transformation company. We help startups, enterprises, and global brands automate, scale, and succeed with modern technologies and AI-powered innovation.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                [Users2, 'Client-Focused', 'Your goals are our top priority.'],
                [Lightbulb, 'Innovation-Driven', 'We build future-ready solutions.'],
                [Target, 'Results-Oriented', 'We deliver measurable business impact.'],
              ].map(([Icon, title, desc]) => (
                <div key={title} className="flex flex-col gap-2">
                  <span className="w-9 h-9 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
                    <Icon className="w-4.5 h-4.5" />
                  </span>
                  <p className="text-xs font-bold text-ink">{title}</p>
                  <p className="text-xs text-gray-500 leading-snug">{desc}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.1} className="relative">
            <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-elev">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=80"
                alt="Cubixsol team collaborating"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-6 right-6 bg-white rounded-2xl shadow-soft p-5 flex items-start gap-3">
              <Quote className="w-6 h-6 text-primary-500 shrink-0" />
              <p className="text-sm font-medium text-ink leading-relaxed">
                Our mission is to simplify technology and empower businesses to achieve more with digital excellence.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WORK SHOWCASE — curved gallery */}
      <WorkShowcase />

      {/* STATS */}
      <section className="bg-primary-50/60 py-12">
        <Stagger
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-5 gap-8 text-center"
          staggerDelay={0.08}
        >
          {stats.map(([num, label]) => (
            <StaggerItem key={label} hover>
              <p className="text-3xl font-extrabold text-ink">{num}</p>
              <p className="text-xs text-gray-500 mt-1">{label}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* STORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Reveal direction="right">
            <p className="eyebrow mb-3">Our Story</p>
            <h2 className="text-3xl font-extrabold text-ink mb-4 leading-snug">
              A Passion for Technology. A Commitment to Excellence.
            </h2>
            <p className="text-gray-500 mb-4 leading-relaxed">
              Founded with a vision to bring innovation and simplicity together, Cubixsol has grown into a trusted digital partner for businesses worldwide.
            </p>
            <p className="text-gray-500 mb-6 leading-relaxed">
              From custom web and mobile apps to AI solutions and cloud services, we build reliable, scalable, and future-ready products that drive growth and create lasting impact.
            </p>
            <ul className="space-y-2 mb-8">
              {[
                'Product thinking, not just code delivery',
                'Transparent communication every step of the way',
                'Long-term partnerships over one-off projects',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-ink">
                  <CheckCircle2 className="w-4 h-4 text-primary-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link to="/services" className="btn-primary">
              Explore Our Services <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
          <Reveal direction="left" delay={0.1} className="relative">
            <div className="rounded-3xl overflow-hidden aspect-[4/3] shadow-elev">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=80"
                alt="Working session"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-4 bg-white rounded-2xl shadow-soft p-5 max-w-[240px] flex items-start gap-3">
              <span className="w-9 h-9 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                <Target className="w-4.5 h-4.5" />
              </span>
              <div>
                <p className="text-sm font-bold text-ink">Our Mission</p>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Empower businesses with innovative digital solutions that drive growth.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-xl mx-auto mb-12">
            <p className="eyebrow mb-3">Milestones</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink">Our journey so far</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, i) => (
              <Reveal key={m.year} delay={i * 0.08} scale>
                <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-card h-full relative">
                  <span className="text-primary-600 font-extrabold text-2xl">{m.year}</span>
                  <h3 className="font-bold text-ink mt-2 mb-1">{m.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{m.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY VISUAL */}
      <JourneyPath />

      {/* VALUES */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-xl mx-auto mb-12">
            <p className="eyebrow mb-3">Our Values</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-ink mb-3">The Principles That Guide Us</h2>
            <p className="text-gray-500">We believe strong values build strong solutions.</p>
          </Reveal>
          <Stagger className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5" staggerDelay={0.08}>
            {safeValues.map((v, i) => {
              const Icon = valueIcons[i] || Gem;
              return (
                <StaggerItem key={v.title} hover>
                  <div className="card text-center h-full hover:-translate-y-1.5 hover:shadow-soft transition-all duration-300">
                    <span className="w-12 h-12 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-5 h-5" />
                    </span>
                    <h3 className="font-bold text-ink mb-1.5">{v.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{v.desc}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* PROCESS MINI */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Reveal className="text-center max-w-xl mx-auto mb-12">
          <p className="eyebrow mb-3">How we work</p>
          <h2 className="text-3xl font-extrabold text-ink">A clear path from idea to launch</h2>
        </Reveal>
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4" staggerDelay={0.07}>
          {safeProcess.map((step) => (
            <StaggerItem key={step.step} hover>
              <div className="rounded-2xl border border-gray-100 bg-white p-5 h-full hover:border-primary-200 hover:shadow-card transition">
                <span className="text-2xl font-extrabold text-primary-200">{step.step}</span>
                <h3 className="font-bold text-ink mt-2 mb-1">{step.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* TECH */}
      <TechStack />

      {/* TEAM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-10">
          <p className="eyebrow mb-3">Our Team</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-ink mb-3">
            Experts. Innovators. Problem Solvers.
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            A talented team of developers, designers, strategists, and innovators working together to build digital success stories.
          </p>
        </div>

        <div className="relative">
          <div className="flex justify-end gap-2 mb-6">
            <button
              onClick={() => canPrev && setTeamIndex(teamIndex - 1)}
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition ${
                canPrev ? 'border-gray-200 text-ink hover:border-primary-400' : 'border-gray-100 text-gray-300 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => canNext && setTeamIndex(teamIndex + 1)}
              className={`w-9 h-9 rounded-full border flex items-center justify-center transition ${
                canNext ? 'border-gray-200 text-ink hover:border-primary-400' : 'border-gray-100 text-gray-300 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <Stagger className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6" staggerDelay={0.06}>
            {safeTeam.slice(teamIndex, teamIndex + visible).map((m) => (
              <StaggerItem key={m.name} hover>
                <div className="text-center hover:-translate-y-1 transition-transform duration-300">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 mx-auto mb-4 flex items-center justify-center text-primary-700 font-extrabold text-xl">
                    {m.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)}
                  </div>
                  <p className="font-bold text-ink text-sm">{m.name}</p>
                  <p className="text-xs text-gray-400 mb-2">{m.role}</p>
                  <a
                    href="#"
                    className="inline-flex w-7 h-7 rounded-full bg-gray-100 items-center justify-center text-gray-500 hover:bg-primary-100 hover:text-primary-600 transition"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5" />
                  </a>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}
