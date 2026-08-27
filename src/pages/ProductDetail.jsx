import { Link, useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  ArrowLeft, ArrowRight, CheckCircle2, ChevronDown,
  Shield, Zap, Puzzle, BarChart3, Headphones, Lock,
} from 'lucide-react';
import { products } from '../data/content';
import CtaBanner from '../components/CtaBanner';
import ServiceInquiryForm from '../components/ServiceInquiryForm';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';

const themes = {
  navy: 'bg-[#0b1f4a]',
  orange: 'bg-gradient-to-br from-[#1a1a2e] via-[#2a1f3d] to-[#0d3d4d]',
  teal: 'bg-gradient-to-br from-[#0c2f2a] to-[#0b1f4a]',
  rose: 'bg-gradient-to-br from-[#2a1525] to-[#1a1a2e]',
  coral: 'bg-gradient-to-br from-[#2a1810] to-[#1a1a2e]',
  violet: 'bg-gradient-to-br from-[#1e1535] to-[#0b1f4a]',
  indigo: 'bg-gradient-to-br from-[#121a3a] to-[#0b1f4a]',
};

const featureIcons = [Zap, Puzzle, Shield, BarChart3, Lock, Headphones];

function ProductPrimaryCta({ product, className = 'btn-primary' }) {
  if (product?.externalUrl) {
    const external = /^https?:\/\//i.test(product.externalUrl);
    if (external) {
      return (
        <a
          href={product.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={className}
        >
          Open tool <ArrowRight className="w-4 h-4" />
        </a>
      );
    }
    return (
      <Link to={product.externalUrl} className={className}>
        Launch tool <ArrowRight className="w-4 h-4" />
      </Link>
    );
  }
  return (
    <Link to="/contact" className={className}>
      Request a demo <ArrowRight className="w-4 h-4" />
    </Link>
  );
}


function defaultFeatures(name) {
  return [
    { title: 'Fast onboarding', body: `Get ${name} running for your team without a long IT project.` },
    { title: 'Role-based access', body: 'Give each person only the modules and data they need.' },
    { title: 'Live visibility', body: 'Dashboards and alerts so nothing important stays hidden.' },
    { title: 'Flexible modules', body: 'Start small and turn on more capability as you grow.' },
    { title: 'Secure by default', body: 'Encryption in transit, sensible permissions, audit-friendly flows.' },
    { title: 'Human support', body: 'Cubixsol team behind the product when you need a hand.' },
  ];
}

function defaultIntegrations() {
  return ['Slack', 'Google Workspace', 'Microsoft 365', 'REST API', 'Webhooks', 'SSO / SAML'];
}

function defaultFaq(name) {
  return [
    {
      q: `Who is ${name} for?`,
      a: `${name} is built for teams that need clearer workflows and less tool-switching — from operations and HR to customer-facing units.`,
    },
    {
      q: 'How long does a pilot take?',
      a: 'Most teams can validate core value in a few weeks with a focused pilot scope, training, and success criteria agreed upfront.',
    },
    {
      q: 'Can it connect to our existing tools?',
      a: 'Yes. We support common workplace tools and can expose APIs/webhooks for custom systems in your stack.',
    },
    {
      q: 'Is our data secure?',
      a: 'Access is role-based, traffic is encrypted, and deployments follow Cubixsol security practices. Enterprise controls can be discussed per engagement.',
    },
  ];
}

function HeroDark({ product }) {
  const bg = themes[product.heroTheme] || themes.navy;
  return (
    <section className={`relative ${bg} text-white overflow-hidden`}>
      <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-400/30 via-transparent to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 sm:pb-20 lg:pb-28 text-center">
        <Reveal scale>
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/60 hover:text-white mb-6 transition"
          >
            <ArrowLeft className="w-4 h-4" /> All products
          </Link>
          <p className="text-primary-300 text-xs font-bold tracking-[0.2em] uppercase mb-4">
            {product.name}
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] max-w-4xl mx-auto mb-5">
            {product.title}
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            {product.tagline || product.desc}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <ProductPrimaryCta product={product} className="btn-primary shadow-lg shadow-primary-500/25" />
            <a
              href="#product-inquiry"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/25 text-white font-semibold hover:bg-white/10 transition"
            >
              Talk to sales
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.12} className="relative max-w-5xl mx-auto">
          <div className="absolute -inset-4 bg-primary-400/20 blur-3xl rounded-full pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-[16/9] bg-white/5"
          >
            <img src={product.image}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://picsum.photos/seed/${product.slug}/1200/750`;
              }} alt={product.name} className="w-full h-full object-cover" width={1200} height={675} />
          </motion.div>
        </Reveal>
      </div>
      <div className="h-12 sm:h-16 bg-white rounded-t-[50%_100%] scale-x-150 origin-bottom" />
    </section>
  );
}

function HeroSplit({ product }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-14">
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <Reveal scale>
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-primary-600 mb-5 transition"
          >
            <ArrowLeft className="w-4 h-4" /> All products
          </Link>
          <span className="eyebrow">{product.name}</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight leading-tight mb-4 mt-2">
            {product.title}
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-6">{product.tagline || product.desc}</p>
          <div className="flex flex-wrap gap-3">
            <ProductPrimaryCta product={product} />
            <a href="#product-inquiry" className="btn-outline">
              Get in touch
            </a>
          </div>
        </Reveal>
        <Reveal direction="left" delay={0.1}>
          <div className={`rounded-3xl overflow-hidden shadow-elev aspect-[16/11] bg-gradient-to-br ${product.accent}`}>
            <img src={product.image}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://picsum.photos/seed/${product.slug}/1200/750`;
              }} alt={product.name} className="w-full h-full object-cover" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function HeroBand({ product }) {
  return (
    <section className="relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-r ${product.accent}`} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
        <Reveal scale>
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink/60 hover:text-primary-600 mb-4 transition"
          >
            <ArrowLeft className="w-4 h-4" /> All products
          </Link>
          <p className="text-xs font-bold tracking-widest uppercase text-primary-700 mb-2">{product.name}</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4">
            {product.title}
          </h1>
          <p className="text-ink/70 text-lg max-w-lg mb-6">{product.tagline || product.desc}</p>
          <ProductPrimaryCta product={product} />
        </Reveal>
        <Reveal direction="left">
          <div className="rounded-2xl overflow-hidden shadow-elev border border-white/80 aspect-[4/3] rotate-1 hover:rotate-0 transition-transform duration-500">
            <img src={product.image}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://picsum.photos/seed/${product.slug}/1200/750`;
              }} alt={product.name} className="w-full h-full object-cover" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StatsRow({ stats }) {
  if (!stats?.length) return null;
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-2 mb-12 relative z-10">
      <Stagger className="grid grid-cols-3 gap-3 sm:gap-4" staggerDelay={0.06}>
        {stats.map(([num, label]) => (
          <StaggerItem key={label} hover>
            <div className="rounded-2xl bg-white border border-gray-100 shadow-card p-4 sm:p-6 text-center">
              <p className="text-xl sm:text-3xl font-extrabold text-ink">{num}</p>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-1 font-medium">{label}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

function FeaturesGrid({ product }) {
  const items = product.productFeatures || defaultFeatures(product.name);
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <Reveal className="text-center max-w-2xl mx-auto mb-10">
        <p className="eyebrow mb-2">Capabilities</p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
          Everything you need to run {product.name}
        </h2>
      </Reveal>
      <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" staggerDelay={0.05}>
        {items.map((f, i) => {
          const Icon = featureIcons[i % featureIcons.length];
          return (
            <StaggerItem key={f.title} hover>
              <div className="h-full rounded-2xl border border-gray-100 bg-white p-5 shadow-card hover:border-primary-100 transition">
                <span className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" strokeWidth={1.75} />
                </span>
                <h3 className="font-bold text-ink mb-1.5">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.body}</p>
              </div>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}

function ChallengesList({ product }) {
  if (!product.challenges?.length) return null;
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <Reveal direction="right">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-2">
            Struggling with <span className="text-primary-600">everyday challenges?</span>
          </h2>
          <p className="text-lg font-semibold text-ink mb-6">{product.name} has your back</p>
          <div className="space-y-5">
            {product.challenges.map((c) => (
              <div key={c.title} className="rounded-xl border border-gray-100 bg-gray-50/80 p-4">
                <h3 className="font-bold text-ink mb-1">{c.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal direction="left" delay={0.08}>
          <div className={`rounded-3xl overflow-hidden shadow-elev aspect-[4/3] bg-gradient-to-br ${product.accent}`}>
            <img src={product.image}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://picsum.photos/seed/${product.slug}/1200/750`;
              }} alt="" className="w-full h-full object-cover opacity-90" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AnswersBlock({ product }) {
  if (!product.answers?.length) return null;
  return (
    <section className="bg-gray-50 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <Reveal direction="right" className="order-2 lg:order-1">
            <div className="rounded-3xl bg-white border border-gray-100 shadow-card p-2 overflow-hidden">
              <img src={product.image}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = `https://picsum.photos/seed/${product.slug}/1200/750`;
              }} alt="" className="rounded-2xl w-full aspect-[16/11] object-cover" />
            </div>
          </Reveal>
          <Reveal direction="left" className="order-1 lg:order-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink mb-2">
              Worried about common <span className="text-primary-600">performance issues?</span>
            </h2>
            <p className="font-semibold text-ink mb-6">We&apos;ve got the answers.</p>
            <div className="space-y-5">
              {product.answers.map((a) => (
                <div key={a.title}>
                  <h3 className="font-bold text-ink mb-1">{a.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{a.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function StepsDark({ product }) {
  if (!product.steps?.length) return null;
  return (
    <section className="bg-[#0b1f4a] text-white py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2">It&apos;s as easy as 1, 2, 3!</h2>
          <p className="text-primary-300 text-sm font-medium">
            {product.steps.length} steps to get value from {product.name}
          </p>
        </Reveal>
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4" staggerDelay={0.08}>
          {product.steps.map((s, i) => (
            <StaggerItem key={s.title} hover>
              <div className="rounded-2xl bg-white/5 border border-white/10 p-5 h-full hover:bg-white/10 transition">
                <span className="text-primary-300 text-xs font-bold tracking-widest">STEP {i + 1}</span>
                <h3 className="font-bold text-lg mt-2 mb-2">{s.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{s.body}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function StepsLight({ product }) {
  if (!product.steps?.length) return null;
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <Reveal className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">How it works</h2>
      </Reveal>
      <Stagger className="grid sm:grid-cols-2 gap-4" staggerDelay={0.06}>
        {product.steps.map((s, i) => (
          <StaggerItem key={s.title} hover>
            <div className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-card h-full">
              <span className="w-10 h-10 rounded-xl bg-primary-gradient text-white font-extrabold flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <div>
                <h3 className="font-bold text-ink mb-1">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{s.body}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

function IntegrationsBar({ product }) {
  const items = product.integrations || defaultIntegrations();
  return (
    <section className="border-y border-gray-100 bg-gray-50/80 py-12 lg:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-8">
          <p className="eyebrow mb-2">Ecosystem</p>
          <h2 className="text-xl sm:text-2xl font-extrabold text-ink">
            Plays well with your stack
          </h2>
        </Reveal>
        <Stagger className="flex flex-wrap justify-center gap-2.5 sm:gap-3" staggerDelay={0.04}>
          {items.map((name) => (
            <StaggerItem key={name}>
              <span className="inline-flex px-4 py-2.5 rounded-full bg-white border border-gray-200 text-sm font-semibold text-ink shadow-sm">
                {name}
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function SocialProof({ product }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <div className="grid lg:grid-cols-3 gap-4">
        <Reveal className="lg:col-span-1">
          <div className="h-full rounded-2xl bg-primary-gradient text-white p-6 sm:p-8 flex flex-col justify-center">
            <p className="text-4xl font-extrabold mb-2">98%</p>
            <p className="text-white/80 text-sm leading-relaxed">
              Pilot teams report clearer ownership of work after adopting {product.name}.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-2">
          <div className="h-full rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 shadow-card">
            <p className="text-lg sm:text-xl font-medium text-ink leading-relaxed mb-4">
              “We finally stopped chasing updates in chat. {product.name} gave us one place to see
              status and act on it.”
            </p>
            <p className="text-sm font-bold text-ink">Operations lead</p>
            <p className="text-xs text-gray-500">Mid-market customer pilot</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FaqSection({ product }) {
  const items = product.faq || defaultFaq(product.name);
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-[#f0f6fc] py-12 lg:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-8">
          <p className="eyebrow mb-2">FAQ</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink">Questions, answered</h2>
        </Reveal>
        <div className="space-y-2">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 0.04}>
                <div className="rounded-xl bg-white border border-gray-100 overflow-hidden shadow-sm">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-4 text-left"
                  >
                    <span className="font-semibold text-ink text-sm sm:text-base">{item.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-primary-600 shrink-0 transition ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-4 text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MidCta({ product }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Reveal>
        <div className="rounded-2xl sm:rounded-3xl bg-ink text-white px-6 sm:px-10 py-8 sm:py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-primary-500/25 blur-2xl pointer-events-none" />
          <div className="relative">
            <h3 className="text-xl sm:text-2xl font-extrabold mb-2">See {product.name} on your workflow</h3>
            <p className="text-white/60 text-sm max-w-md leading-relaxed">
              Share your process — we will outline a practical pilot and what success looks like in 30 days.
            </p>
          </div>
          <Link to="/contact" className="relative btn-primary shrink-0">
            Book a walkthrough <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

function ChecklistBand({ product }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Reveal>
        <div className="rounded-3xl border border-primary-100 bg-primary-50/50 p-6 sm:p-10 grid sm:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-ink mb-3">
              What you get with {product.name}
            </h2>
            <ul className="space-y-2.5">
              {[
                'Guided pilot and onboarding',
                'Role-based access controls',
                'Integration path for your stack',
                'Roadmap shaped by real users',
              ].map((line) => (
                <li key={line} className="flex gap-2 text-sm font-medium text-ink">
                  <CheckCircle2 className="w-5 h-5 text-primary-500 shrink-0" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center sm:text-right">
            <Link to="/contact" className="btn-primary">
              Book a walkthrough <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default function ProductDetail() {
  const { slug } = useParams();
  const product = products.find((p) => p.slug === slug);
  if (!product) return <Navigate to="/products" replace />;

  const layout = product.layout || 'A';
  const related = products.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="bg-white">
      {layout === 'B' && <HeroDark product={product} />}
      {layout === 'A' && (
        <>
          <HeroSplit product={product} />
          <StatsRow stats={product.stats} />
        </>
      )}
      {layout === 'C' && (
        <>
          <HeroBand product={product} />
          <StatsRow stats={product.stats} />
        </>
      )}
      {layout === 'B' && <StatsRow stats={product.stats} />}

      <FeaturesGrid product={product} />
      <ChallengesList product={product} />

      {(layout === 'B' || layout === 'C') && <AnswersBlock product={product} />}

      {layout === 'B' ? <StepsDark product={product} /> : <StepsLight product={product} />}

      <IntegrationsBar product={product} />
      <SocialProof product={product} />

      {layout !== 'B' && <ChecklistBand product={product} />}
      <MidCta product={product} />
      <FaqSection product={product} />

      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-100">
          <h2 className="text-xl font-extrabold text-ink mb-5">More products</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {related.map((r) => (
              <Link
                key={r.slug}
                to={`/products/${r.slug}`}
                className="rounded-2xl border border-gray-100 overflow-hidden hover:shadow-card transition group"
              >
                <div className={`aspect-[16/10] bg-gradient-to-br ${r.accent}`}>
                  <img
                    src={r.image}
                    alt={r.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <p className="text-[10px] font-bold uppercase text-primary-600">{r.name}</p>
                  <p className="text-sm font-bold text-ink">{r.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div id="product-inquiry">
        <ServiceInquiryForm defaultService={product.name} />
      </div>
      <CtaBanner />
    </div>
  );
}
