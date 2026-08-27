import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Plus, Minus, Database, Warehouse, Brain, Building2, Shield, LineChart, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Reveal, { Stagger, StaggerItem } from './Reveal';

const compareRows = [
  ['Table / storage format', 'Apache Iceberg–native; Delta/Hudi via UniForm', 'Delta Lake (Unity Catalog)', 'Native + Iceberg/Polaris support'],
  ['Governance & catalog', 'Master Catalog across DB, lakehouse & workbench', 'Unity Catalog', 'Horizon / Polaris Catalog'],
  ['Compute model', 'On-demand Spark + converged AI Database', 'Spark clusters (native)', 'Proprietary elastic compute'],
  ['AI / agent tooling', 'Agent Factory, Select AI (NL-to-SQL)', 'Mosaic AI, Unity Catalog AI', 'Cortex'],
  ['Multi-cloud', 'OCI, AWS, Azure, GCP, Exadata Cloud@Customer', 'AWS, Azure, GCP', 'AWS, Azure, GCP'],
  ['Security & compliance', 'HIPAA, SOC, ISO 27001, FedRAMP, PCI DSS', 'ISO 27001, SOC 2, HIPAA, PCI, FedRAMP', 'SOC 2, HIPAA & FedRAMP in dedicated regions'],
];

const expertise = [
  { title: 'OCI Cloud-Native Data Platforms', body: 'Design and operate data platforms on Oracle Cloud Infrastructure with secure networking, scalable storage, and cost-aware compute.' },
  { title: 'Oracle Exadata for High-Performance Workloads', body: 'Tune and migrate workloads that need Exadata-class performance for transactional and analytical mix.' },
  { title: 'Oracle Database Engineering', body: 'Schema design, performance, HA, and modernization paths for enterprise Oracle Database estates.' },
  { title: 'Real-Time Integration with GoldenGate', body: 'Change-data-capture and replication patterns so operational systems stay in sync with analytics platforms.' },
  { title: 'Oracle Database Appliance', body: 'Right-size appliance deployments and operational playbooks for mid-market and edge data centers.' },
  { title: 'AIDP Readiness & Architecture Assessment', body: 'Inventory current lakehouse and warehouse estates; map what belongs on AIDP versus federated access.' },
  { title: 'Databricks-to-AIDP Migration Engineering', body: 'Notebook, job, and catalog migration with validation gates — not lift-and-hope.' },
  { title: 'Snowflake–AIDP Interoperability', body: 'Federated and hybrid designs when Snowflake remains part of the landscape.' },
  { title: 'Data Lakehouse Architecture', body: 'Iceberg-oriented lakehouse patterns, governance, and workload isolation.' },
  { title: 'Petabyte-Scale Data Engineering', body: 'Pipelines, partitioning, and cost controls proven on large volumes.' },
];

const steps = [
  {
    title: 'Assess',
    body: 'Inventory your Databricks/Snowflake estate: notebooks, jobs, dependency chains, catalog schemas, and data volumes.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=500&q=70',
  },
  {
    title: 'Plan',
    body: 'Build a migration or integration roadmap sequenced by dependency and risk — what gets ported versus re-implemented.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&h=500&q=70',
  },
  {
    title: 'Migrate or Integrate',
    body: 'Port jobs, rewrite catalog DDL, or stand up federated access — using platform tooling where it fits and engineering where it does not.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&h=500&q=70',
  },
  {
    title: 'Verify',
    body: 'Validate every migrated job for correctness — outputs, logs, and performance against the source system, not just “it ran”.',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&h=500&q=70',
  },
  {
    title: 'Optimize',
    body: 'Tune performance, storage layout, and cost once workloads are live on the new architecture.',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&h=500&q=70',
  },
  {
    title: 'Support',
    body: 'Stay engaged post-launch so the platform keeps working as data volumes and use cases grow.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&h=500&q=70',
  },
];

export function OracleAidpHero() {
  return (
    <section className="relative bg-[#0b1f4a] text-white overflow-hidden">
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-500/40 via-transparent to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24 grid lg:grid-cols-2 gap-10 items-center">
        <Reveal scale>
          <p className="text-primary-300 text-xs font-bold tracking-[0.2em] uppercase mb-4">
            Data Solutions · Oracle
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.12] mb-5">
            Engineering success with{' '}
            <span className="text-primary-300">Oracle AI Data Platform</span>
          </h1>
          <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-8 max-w-xl">
            Oracle&apos;s AI Data Platform (AIDP) gives enterprises another path to unify data and AI —
            alongside Databricks and Snowflake estates many already run. Cubixsol helps you assess,
            migrate, integrate, and operate AIDP with the same engineering discipline we bring to
            modern data platforms.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="btn-primary">
              Let&apos;s build with Oracle <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#oracle-inquiry"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/25 text-white font-semibold hover:bg-white/10 transition"
            >
              Talk to an engineer
            </a>
          </div>
        </Reveal>
        <Reveal direction="left" delay={0.1} className="relative">
          <div className="relative mx-auto max-w-md">
            <div className="absolute inset-0 bg-primary-500/20 blur-3xl rounded-full" />
            <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-6 sm:p-8 text-center">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-primary-gradient flex items-center justify-center mb-4 shadow-lg">
                <Database className="w-10 h-10 text-white" />
              </div>
              <p className="text-2xl font-extrabold tracking-tight">AIDP</p>
              <p className="text-sm text-white/60 mt-1">AI Data Platform</p>
              <p className="text-xs text-primary-300 font-bold mt-4 tracking-widest uppercase">Oracle ecosystem</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function OracleAidpIntro() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
      <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <Reveal direction="right">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-5">
            Oracle enters the AI data race with AIDP
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-gray-500 leading-relaxed">
            <p>
              Enterprises already run serious data and AI workloads on Databricks and Snowflake.
              AIDP is Oracle&apos;s converged answer — database, lakehouse, and AI workbench in one
              platform story.
            </p>
            <p>
              Cubixsol helps you understand what changes if you adopt AIDP, integrate it with what
              you already operate, or plan a measured migration — without hype, with engineering rigor.
            </p>
            <p>
              Whether the goal is OCI-native platforms, Exadata performance, GoldenGate pipelines, or
              AIDP readiness, we bring hands-on data engineering across Oracle&apos;s stack.
            </p>
          </div>
        </Reveal>
        <Reveal direction="left" delay={0.08}>
          <div className="rounded-2xl border border-primary-100 bg-primary-50/40 p-6 sm:p-8">
            <p className="text-center text-xs font-bold tracking-widest uppercase text-primary-600 mb-6">
              AIDP building blocks
            </p>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                [Database, 'Database'],
                [Warehouse, 'Lakehouse'],
                [Brain, 'AI Workbench'],
              ].map(([Ic, label]) => (
                <div key={label} className="rounded-xl bg-white border border-gray-100 p-3 text-center shadow-sm">
                  <Ic className="w-6 h-6 text-primary-600 mx-auto mb-1.5" />
                  <p className="text-[11px] font-bold text-ink">{label}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                [Building2, 'Enterprise apps'],
                [Shield, 'Governance'],
                [LineChart, 'Analytics'],
                [Sparkles, 'AI innovation'],
              ].map(([Ic, label]) => (
                <div key={label} className="text-center p-2">
                  <Ic className="w-5 h-5 text-primary-500 mx-auto mb-1" />
                  <p className="text-[10px] font-semibold text-gray-600 leading-tight">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function OracleAidpCompare() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <Reveal className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-2">
          Oracle AIDP: the real difference
        </h2>
        <p className="text-sm text-gray-500">
          A practical view of how AIDP compares on storage, governance, compute, AI, and compliance.
        </p>
      </Reveal>
      <Reveal>
        <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-card">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="bg-primary-gradient text-white">
                {['Features', 'Oracle AIDP', 'Databricks', 'Snowflake'].map((h) => (
                  <th key={h} className="px-4 py-3.5 font-bold text-xs sm:text-sm">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compareRows.map((row, i) => (
                <tr key={row[0]} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  {row.map((cell, j) => (
                    <td
                      key={j}
                      className={`px-4 py-3.5 align-top leading-snug ${
                        j === 0 ? 'font-semibold text-ink whitespace-nowrap' : 'text-gray-600'
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </section>
  );
}

export function OracleAidpExpertise() {
  const [open, setOpen] = useState(null);
  return (
    <section className="bg-[#0b1f4a] text-white py-14 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Cubixsol Oracle AIDP &amp; platform expertise
          </h2>
          <p className="text-white/65 text-sm sm:text-base leading-relaxed">
            We help organizations modernize and scale data platforms on Oracle technologies — from
            OCI and Exadata to GoldenGate and AIDP. Deep data engineering across the stack, old and new.
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-2 gap-3">
          {expertise.map((item, i) => {
            const isOpen = open === i;
            const num = String(i + 1).padStart(2, '0');
            return (
              <div key={item.title} className="rounded-xl bg-white/5 border border-white/10 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left hover:bg-white/5 transition"
                >
                  <span className="text-sm font-semibold">
                    <span className="text-primary-300 mr-2">{num}.</span>
                    {item.title}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 text-primary-300"
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-4 pb-4 text-sm text-white/60 leading-relaxed border-t border-white/5 pt-3">
                        {item.body}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function OracleAidpApproach() {
  return (
    <section className="bg-white py-14 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal scale className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-2">
            Our approach to Oracle AI Data Platform engineering
          </h2>
          <p className="text-sm text-gray-500">
            Whether you are moving workloads onto AIDP or building a federated bridge to it, the
            engineering discipline stays the same.
          </p>
        </Reveal>

        <div className="relative max-w-5xl mx-auto">
          {/* vertical line */}
          <motion.div
            className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-primary-100 sm:-translate-x-1/2 origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="space-y-14 sm:space-y-20">
            {steps.map((step, i) => {
              const imageLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.title}
                  className="relative grid sm:grid-cols-2 gap-6 sm:gap-10 items-center"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* dot on center line */}
                  <motion.span
                    className="absolute left-4 sm:left-1/2 top-0 sm:top-1/2 z-10 w-3.5 h-3.5 sm:w-4 sm:h-4 -translate-x-1/2 sm:-translate-y-1/2 rounded-full bg-primary-500 ring-4 ring-primary-100"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 280, damping: 16, delay: 0.15 }}
                  />

                  {/* Image */}
                  <motion.div
                    className={`pl-10 sm:pl-0 ${imageLeft ? 'sm:pr-12' : 'sm:pl-12 sm:order-2'}`}
                    initial={{ opacity: 0, x: imageLeft ? -36 : 36 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="rounded-2xl overflow-hidden shadow-elev aspect-[16/10] bg-gray-100">
                      <motion.img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  </motion.div>

                  {/* Text — always full width of its column, no clip */}
                  <motion.div
                    className={`pl-10 sm:pl-0 ${imageLeft ? 'sm:pl-12' : 'sm:pr-12 sm:order-1 sm:text-right'}`}
                    initial={{ opacity: 0, x: imageLeft ? 36 : -36 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p className="text-xs font-bold tracking-widest uppercase text-primary-600 mb-1">
                      Step {i + 1}
                    </p>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-ink mb-2">{step.title}</h3>
                    <p className={`text-sm text-gray-500 leading-relaxed ${imageLeft ? '' : 'sm:ml-auto'} max-w-md`}>
                      {step.body}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export function OracleAidpExtras() {
  return (
    <section className="bg-gray-50 py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-8 max-w-2xl">
          <h2 className="text-2xl font-extrabold text-ink mb-2">Why teams bring Cubixsol in</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Platform choices are expensive to reverse. We focus on evidence, reversible steps, and
            operational reality — not slide-ware.
          </p>
        </Reveal>
        <Stagger className="grid sm:grid-cols-3 gap-4" staggerDelay={0.06}>
          {[
            ['Clear assessment', 'Know what you have before you move it — jobs, cost, risk, and owners.'],
            ['Hybrid-friendly', 'Keep Snowflake or Databricks where they win; bridge to AIDP where Oracle fits.'],
            ['After go-live', 'Optimization and support so the platform stays healthy as volume grows.'],
          ].map(([t, b]) => (
            <StaggerItem key={t} hover>
              <div className="h-full rounded-2xl bg-white border border-gray-100 p-5 shadow-card">
                <h3 className="font-bold text-ink mb-2">{t}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{b}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
