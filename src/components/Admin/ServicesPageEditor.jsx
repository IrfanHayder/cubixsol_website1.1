import { useState, useEffect } from 'react';
import {
  Save,
  Plus,
  Trash2,
  HelpCircle,
  Sparkles,
  Layers,
  ShieldCheck,
  Building2,
  Users,
  CheckCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Loader2,
} from 'lucide-react';
import { API_BASE, apiFetch } from '../../utils/api';

export default function ServicesPageEditor({ showToast }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const [formData, setFormData] = useState({
    slug: 'services',
    title: 'Services',
    heroEyebrow: 'Our Services',
    heroTitle: 'Powerful digital solutions that drive real results',
    heroDesc:
      'Strategy, design, engineering and growth — under one roof. Pick a service to see how we deliver, or tell us your goal and we will map the right path.',
    heroButtonText: 'Get a Free Project Consultation',
    heroButtonLink: '/contact#contact-form',
    heroBadges: ['Modern stack', 'Scalable & secure', 'Transparent delivery'],

    processEyebrow: 'Our Process',
    processTitle: 'Our Proven Development Process',
    processIntro: '',
    processSteps: [
      {
        step: '01',
        title: 'Discover',
        desc: 'We clarify your business goals, users, requirements, technical constraints, budget, and success criteria.',
      },
      {
        step: '02',
        title: 'Plan',
        desc: 'Our team defines the scope, technology, architecture, priorities, milestones, and delivery roadmap.',
      },
      {
        step: '03',
        title: 'Design and Develop',
        desc: 'Designers create the user experience while developers build, review, and integrate each product component.',
      },
      {
        step: '04',
        title: 'Test and Launch',
        desc: 'We test functionality, usability, compatibility, security, and performance before managing a controlled deployment.',
      },
      {
        step: '05',
        title: 'Support',
        desc: 'After launch, we monitor performance, resolve issues, deliver updates, and help your product evolve.',
      },
    ],

    whyChooseEyebrow: 'Why Choose Us',
    whyChooseTitle: 'Why Businesses Choose Cubixsol',
    whyChooseIntro:
      'Businesses **outsource custom software development services** to us when they need specialized expertise without expanding every internal function. You can expect a clear scope, practical recommendations, visible progress, quality assurance, and continued post-launch support.',
    whyChooseItems: [
      {
        title: 'Business-first planning',
        desc: 'We connect technical decisions to user needs, operational requirements, and commercial goals.',
      },
      {
        title: 'Cross-functional expertise',
        desc: 'Developers, designers, QA specialists, consultants, and marketers collaborate throughout delivery.',
      },
      {
        title: 'Enterprise-ready thinking',
        desc: 'Our **custom enterprise software development services** prioritize scalability, integrations, maintainability, and long-term product performance.',
      },
      {
        title: 'Transparent execution',
        desc: 'Defined milestones, regular communication, testing, and documented feedback keep the project moving in the right direction.',
      },
    ],

    engagementEyebrow: 'Engagement Models',
    engagementTitle: 'Flexible Engagement Models, Including Staff Augmentation',
    engagementIntro: '',
    engagementItems: [
      {
        title: 'Project-Based Development',
        desc: 'Choose a defined scope, timeline, and delivery plan for a website, application, integration, migration, or digital campaign.',
      },
      {
        title: 'Dedicated Team',
        desc: 'Secure a consistent multidisciplinary team that works exclusively or primarily on your product and long-term roadmap.',
      },
      {
        title: 'Staff Augmentation Services',
        desc: 'Fill specific skill gaps, increase delivery capacity, or add specialists to an existing team while retaining direct project control.',
      },
      {
        title: 'MVP and Startup Development',
        desc: 'Validate an idea quickly with focused features, rapid feedback, controlled costs, and a roadmap for future product growth.',
      },
    ],

    industriesEyebrow: 'Industries',
    industriesTitle: 'Industries We Serve',
    industriesIntro:
      'Cubixsol adapts its technology and delivery approach to the workflows, users, and compliance needs of different sectors.',
    industriesItems: [
      {
        title: 'Education',
        desc: 'Learning platforms, student portals, and administrative systems',
      },
      {
        title: 'Travel',
        desc: 'Booking platforms, integrations, and customer applications',
      },
      {
        title: 'Healthcare',
        desc: 'Patient-facing tools and operational software',
      },
      {
        title: 'FinTech',
        desc: 'Secure financial platforms and payment integrations',
      },
      {
        title: 'E-commerce',
        desc: 'Online stores, marketplaces, and retail automation',
      },
      {
        title: 'SaaS',
        desc: 'Subscription platforms and cloud-based business products',
      },
    ],

    ctaEyebrow: 'Ready to Start?',
    ctaTitle: 'Ready to Start Your Project? Let’s Talk',
    ctaDesc:
      'Move from idea to execution with reliable **custom software development services** built around your users, operations, and growth plans.',
    ctaButtonText: 'Discuss Your Project',
    ctaButtonLink: '/contact',

    faqEyebrow: 'FAQ',
    faqTitle: 'Frequently Asked Questions',
    faqIntro: '',
    faqs: [
      {
        q: 'How much do custom software development services cost?',
        a: 'Cost depends on the project’s features, technical complexity, integrations, platforms, timeline, and team requirements. We review your scope before providing a customized estimate.',
      },
      {
        q: 'How long does a software development project take?',
        a: 'A focused MVP may take considerably less time than a multi-platform enterprise system. After discovery, we provide a roadmap with realistic phases, milestones, and delivery estimates.',
      },
      {
        q: 'Which Cubixsol service should I choose?',
        a: 'Start with the outcome, not the technology. Share the problem you need to solve, and our team will recommend the appropriate service, platform, and engagement model.',
      },
      {
        q: 'Does Cubixsol provide post-launch support?',
        a: 'Yes. Support can include issue resolution, performance monitoring, security updates, feature improvements, integrations, optimization, and ongoing product maintenance.',
      },
      {
        q: 'Do you work with both startups and enterprises?',
        a: 'Yes. Startups can use MVP development to validate ideas, while established businesses can engage Cubixsol for modernization, integrations, dedicated teams, and enterprise platforms.',
      },
      {
        q: 'How can I find custom software development services near me?',
        a: 'Location should not be your only selection criterion. Compare relevant experience, communication, technical capability, delivery process, and post-launch support. Our experts collaborate with clients through remote and regional teams.',
      },
    ],

    seo: {
      metaTitle: 'Software Development & IT Consulting Services | Cubixsol',
      metaDescription:
        'Explore Cubixsol’s full suite of custom web development, mobile apps, AI products, cloud DevOps, and UI/UX design services designed to scale your business.',
      keywords:
        'custom software development, web development, mobile apps, AI development, cloud devops, ui ux design, cubixsol services',
      ogTitle: 'Software Development & IT Consulting Services | Cubixsol',
      ogDescription:
        'Explore Cubixsol’s full suite of custom web development, mobile apps, AI products, cloud DevOps, and UI/UX design services designed to scale your business.',
      ogImage: '',
      canonicalUrl: '',
    },
  });

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await apiFetch('pages/services');
        if (res && res.slug) {
          setFormData((prev) => ({
            ...prev,
            ...res,
            heroBadges: Array.isArray(res.heroBadges)
              ? res.heroBadges
              : prev.heroBadges,
            processSteps: Array.isArray(res.processSteps)
              ? res.processSteps
              : prev.processSteps,
            whyChooseItems: Array.isArray(res.whyChooseItems)
              ? res.whyChooseItems
              : prev.whyChooseItems,
            engagementItems: Array.isArray(res.engagementItems)
              ? res.engagementItems
              : prev.engagementItems,
            industriesItems: Array.isArray(res.industriesItems)
              ? res.industriesItems
              : prev.industriesItems,
            faqs: Array.isArray(res.faqs) ? res.faqs : prev.faqs,
            seo: { ...prev.seo, ...(res.seo || {}) },
          }));
        }
      } catch (err) {
        console.error('Error loading services page content:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSeoChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      seo: { ...prev.seo, [field]: value },
    }));
  };

  // Process Steps helpers
  const handleStepChange = (index, field, value) => {
    setFormData((prev) => {
      const steps = [...prev.processSteps];
      steps[index] = { ...steps[index], [field]: value };
      return { ...prev, processSteps: steps };
    });
  };

  const addStep = () => {
    setFormData((prev) => {
      const nextNum = String(prev.processSteps.length + 1).padStart(2, '0');
      return {
        ...prev,
        processSteps: [
          ...prev.processSteps,
          { step: nextNum, title: '', desc: '' },
        ],
      };
    });
  };

  const removeStep = (index) => {
    setFormData((prev) => ({
      ...prev,
      processSteps: prev.processSteps.filter((_, i) => i !== index),
    }));
  };

  // Generic List item helpers (Why Choose, Engagement, Industries)
  const handleListItemChange = (listName, index, field, value) => {
    setFormData((prev) => {
      const list = [...prev[listName]];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, [listName]: list };
    });
  };

  const addListItem = (listName) => {
    setFormData((prev) => ({
      ...prev,
      [listName]: [...prev[listName], { title: '', desc: '' }],
    }));
  };

  const removeListItem = (listName, index) => {
    setFormData((prev) => ({
      ...prev,
      [listName]: prev[listName].filter((_, i) => i !== index),
    }));
  };

  // FAQ helpers
  const handleFaqChange = (index, field, value) => {
    setFormData((prev) => {
      const faqs = [...prev.faqs];
      faqs[index] = { ...faqs[index], [field]: value };
      return { ...prev, faqs };
    });
  };

  const addFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { q: '', a: '' }],
    }));
  };

  const removeFaq = (index) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    try {
      setSaving(true);
      const res = await fetch(`${API_BASE}/pages/services`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to save');
      }
      showToast('✅ Services page content saved successfully! Live on website.', 'success');
    } catch (err) {
      console.error(err);
      showToast(err.message || 'Error saving services page content', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
        <span className="text-sm font-medium">Loading Services Page Content...</span>
      </div>
    );
  }

  const sections = [
    { id: 'hero', label: '1. Hero & Header', icon: Sparkles },
    { id: 'process', label: '2. Proven Process', icon: Layers },
    { id: 'whyChoose', label: '3. Why Choose Us', icon: ShieldCheck },
    { id: 'engagement', label: '4. Engagement Models', icon: Users },
    { id: 'industries', label: '5. Industries We Serve', icon: Building2 },
    { id: 'cta', label: '6. CTA Banner', icon: CheckCircle },
    { id: 'faqs', label: '7. FAQs', icon: HelpCircle },
    { id: 'seo', label: '8. SEO Settings', icon: ExternalLink },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      {/* Top Header Bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sticky top-16 z-20 backdrop-blur-md bg-white/95">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-ink">Services Page Content Editor</h2>
            <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-500/20">
              LIVE /services
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Edit all titles, descriptions, processes, engagement models, industries, and FAQs shown on{' '}
            <a
              href="/services"
              target="_blank"
              rel="noreferrer"
              className="text-primary-600 font-semibold hover:underline inline-flex items-center gap-1"
            >
              /services <ExternalLink size={12} />
            </a>
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <a
            href="/services"
            target="_blank"
            rel="noreferrer"
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-ink/70 hover:bg-gray-50 transition"
          >
            Preview Live <ExternalLink size={14} />
          </a>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-primary-gradient text-white text-sm font-bold shadow-soft hover:shadow-elev transition disabled:opacity-50"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {sections.map((sec) => {
          const Icon = sec.icon;
          const isAct = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isAct
                  ? 'bg-primary-600 text-white shadow-soft'
                  : 'bg-white text-ink/70 border border-gray-100 hover:border-gray-200 hover:text-ink'
              }`}
            >
              <Icon size={14} />
              {sec.label}
            </button>
          );
        })}
      </div>

      {/* 1. HERO & HEADER */}
      {activeSection === 'hero' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 space-y-5 animate-in fade-in duration-200">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-base font-bold text-ink">Hero Section Content</h3>
            <p className="text-xs text-gray-400">The main banner at the top of the /services page.</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink/70 mb-1.5">Hero Eyebrow (Small Tag)</label>
            <input
              type="text"
              value={formData.heroEyebrow || ''}
              onChange={(e) => handleChange('heroEyebrow', e.target.value)}
              placeholder="e.g. Our Services"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-primary-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink/70 mb-1.5">Hero Main Title (H1 Heading)</label>
            <input
              type="text"
              value={formData.heroTitle || ''}
              onChange={(e) => handleChange('heroTitle', e.target.value)}
              placeholder="e.g. Powerful digital solutions that drive real results"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold focus:border-primary-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink/70 mb-1.5">Hero Description Paragraph</label>
            <textarea
              rows={3}
              value={formData.heroDesc || ''}
              onChange={(e) => handleChange('heroDesc', e.target.value)}
              placeholder="Intro paragraph below the heading..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-primary-500 outline-none"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4 p-4 rounded-xl bg-primary-50/50 border border-primary-100">
            <div>
              <label className="block text-xs font-semibold text-ink/70 mb-1.5">
                Hero CTA Button Text
              </label>
              <input
                type="text"
                value={formData.heroButtonText || ''}
                onChange={(e) => handleChange('heroButtonText', e.target.value)}
                placeholder="e.g. Get a Free Project Consultation"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium focus:border-primary-500 outline-none"
              />
              <p className="text-[11px] text-gray-400 mt-1">Text shown inside the Hero action button.</p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink/70 mb-1.5">
                Hero CTA Button Link
              </label>
              <input
                type="text"
                value={formData.heroButtonLink || ''}
                onChange={(e) => handleChange('heroButtonLink', e.target.value)}
                placeholder="e.g. /contact#contact-form or /contact"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-mono focus:border-primary-500 outline-none"
              />
              <p className="text-[11px] text-gray-400 mt-1">Target URL (links to contact page contact form).</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink/70 mb-1.5">
              Hero Badges (One badge per line)
            </label>
            <textarea
              rows={3}
              value={Array.isArray(formData.heroBadges) ? formData.heroBadges.join('\n') : ''}
              onChange={(e) =>
                handleChange(
                  'heroBadges',
                  e.target.value.split('\n').map((s) => s.trim()).filter(Boolean)
                )
              }
              placeholder="Modern stack&#10;Scalable & secure&#10;Transparent delivery"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-mono focus:border-primary-500 outline-none"
            />
          </div>
        </div>
      )}

      {/* 2. PROVEN PROCESS */}
      {activeSection === 'process' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-ink">Our Proven Development Process</h3>
              <p className="text-xs text-gray-400">Step-by-step process section with numbered cards.</p>
            </div>
            <button
              type="button"
              onClick={addStep}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-50 text-primary-600 text-xs font-bold hover:bg-primary-100 transition"
            >
              <Plus size={14} /> Add Step
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink/70 mb-1.5">Section Eyebrow</label>
              <input
                type="text"
                value={formData.processEyebrow || ''}
                onChange={(e) => handleChange('processEyebrow', e.target.value)}
                placeholder="e.g. Our Process"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-primary-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink/70 mb-1.5">Section Title</label>
              <input
                type="text"
                value={formData.processTitle || ''}
                onChange={(e) => handleChange('processTitle', e.target.value)}
                placeholder="e.g. Our Proven Development Process"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold focus:border-primary-500 outline-none"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-xs font-bold text-ink uppercase tracking-wider">
              Process Steps ({formData.processSteps.length})
            </label>
            {formData.processSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-primary-100 transition space-y-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary-100 text-primary-700 font-extrabold text-xs flex items-center justify-center shrink-0">
                    {step.step || String(idx + 1).padStart(2, '0')}
                  </span>
                  <input
                    type="text"
                    value={step.step || ''}
                    onChange={(e) => handleStepChange(idx, 'step', e.target.value)}
                    placeholder="Step # (e.g. 01)"
                    className="w-20 px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-center"
                  />
                  <input
                    type="text"
                    value={step.title || ''}
                    onChange={(e) => handleStepChange(idx, 'title', e.target.value)}
                    placeholder="Step Title (e.g. Discover)"
                    className="flex-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-bold"
                  />
                  <button
                    type="button"
                    onClick={() => removeStep(idx)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={step.desc || ''}
                  onChange={(e) => handleStepChange(idx, 'desc', e.target.value)}
                  placeholder="Step description details..."
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-600 focus:border-primary-500 outline-none"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. WHY CHOOSE US */}
      {activeSection === 'whyChoose' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-ink">Why Businesses Choose Cubixsol</h3>
              <p className="text-xs text-gray-400">Value proposition and key strengths.</p>
            </div>
            <button
              type="button"
              onClick={() => addListItem('whyChooseItems')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-50 text-primary-600 text-xs font-bold hover:bg-primary-100 transition"
            >
              <Plus size={14} /> Add Item
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink/70 mb-1.5">Section Eyebrow</label>
              <input
                type="text"
                value={formData.whyChooseEyebrow || ''}
                onChange={(e) => handleChange('whyChooseEyebrow', e.target.value)}
                placeholder="e.g. Why Choose Us"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-primary-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink/70 mb-1.5">Section Title</label>
              <input
                type="text"
                value={formData.whyChooseTitle || ''}
                onChange={(e) => handleChange('whyChooseTitle', e.target.value)}
                placeholder="e.g. Why Businesses Choose Cubixsol"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold focus:border-primary-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink/70 mb-1.5">Section Intro Text</label>
            <textarea
              rows={3}
              value={formData.whyChooseIntro || ''}
              onChange={(e) => handleChange('whyChooseIntro', e.target.value)}
              placeholder="Businesses outsource custom software development services to us when..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-primary-500 outline-none"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-xs font-bold text-ink uppercase tracking-wider">
              Items ({formData.whyChooseItems.length})
            </label>
            {formData.whyChooseItems.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-primary-100 transition space-y-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={item.title || ''}
                    onChange={(e) => handleListItemChange('whyChooseItems', idx, 'title', e.target.value)}
                    placeholder="Title (e.g. Business-first planning)"
                    className="flex-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-bold"
                  />
                  <button
                    type="button"
                    onClick={() => removeListItem('whyChooseItems', idx)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={item.desc || ''}
                  onChange={(e) => handleListItemChange('whyChooseItems', idx, 'desc', e.target.value)}
                  placeholder="Item description..."
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-600 focus:border-primary-500 outline-none"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. ENGAGEMENT MODELS */}
      {activeSection === 'engagement' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-ink">Flexible Engagement Models</h3>
              <p className="text-xs text-gray-400">Staff augmentation, dedicated teams, and project models.</p>
            </div>
            <button
              type="button"
              onClick={() => addListItem('engagementItems')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-50 text-primary-600 text-xs font-bold hover:bg-primary-100 transition"
            >
              <Plus size={14} /> Add Model
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink/70 mb-1.5">Section Eyebrow</label>
              <input
                type="text"
                value={formData.engagementEyebrow || ''}
                onChange={(e) => handleChange('engagementEyebrow', e.target.value)}
                placeholder="e.g. Engagement Models"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-primary-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink/70 mb-1.5">Section Title</label>
              <input
                type="text"
                value={formData.engagementTitle || ''}
                onChange={(e) => handleChange('engagementTitle', e.target.value)}
                placeholder="e.g. Flexible Engagement Models, Including Staff Augmentation"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold focus:border-primary-500 outline-none"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-xs font-bold text-ink uppercase tracking-wider">
              Models ({formData.engagementItems.length})
            </label>
            {formData.engagementItems.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-primary-100 transition space-y-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={item.title || ''}
                    onChange={(e) => handleListItemChange('engagementItems', idx, 'title', e.target.value)}
                    placeholder="Model Title (e.g. Project-Based Development)"
                    className="flex-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-bold"
                  />
                  <button
                    type="button"
                    onClick={() => removeListItem('engagementItems', idx)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={item.desc || ''}
                  onChange={(e) => handleListItemChange('engagementItems', idx, 'desc', e.target.value)}
                  placeholder="Model description..."
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-600 focus:border-primary-500 outline-none"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. INDUSTRIES WE SERVE */}
      {activeSection === 'industries' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-ink">Industries We Serve</h3>
              <p className="text-xs text-gray-400">Highlight sectors where you provide specialized software solutions.</p>
            </div>
            <button
              type="button"
              onClick={() => addListItem('industriesItems')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-50 text-primary-600 text-xs font-bold hover:bg-primary-100 transition"
            >
              <Plus size={14} /> Add Industry
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink/70 mb-1.5">Section Eyebrow</label>
              <input
                type="text"
                value={formData.industriesEyebrow || ''}
                onChange={(e) => handleChange('industriesEyebrow', e.target.value)}
                placeholder="e.g. Industries"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-primary-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink/70 mb-1.5">Section Title</label>
              <input
                type="text"
                value={formData.industriesTitle || ''}
                onChange={(e) => handleChange('industriesTitle', e.target.value)}
                placeholder="e.g. Industries We Serve"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold focus:border-primary-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink/70 mb-1.5">Section Intro Text</label>
            <textarea
              rows={2}
              value={formData.industriesIntro || ''}
              onChange={(e) => handleChange('industriesIntro', e.target.value)}
              placeholder="Cubixsol adapts its technology and delivery approach..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-primary-500 outline-none"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-xs font-bold text-ink uppercase tracking-wider">
              Industries ({formData.industriesItems.length})
            </label>
            <div className="grid sm:grid-cols-2 gap-3.5">
              {formData.industriesItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-primary-100 transition space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item.title || ''}
                      onChange={(e) => handleListItemChange('industriesItems', idx, 'title', e.target.value)}
                      placeholder="Industry Name (e.g. Education)"
                      className="flex-1 px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs font-bold"
                    />
                    <button
                      type="button"
                      onClick={() => removeListItem('industriesItems', idx)}
                      className="p-1 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={item.desc || ''}
                    onChange={(e) => handleListItemChange('industriesItems', idx, 'desc', e.target.value)}
                    placeholder="Brief description of solutions for this sector..."
                    className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 text-xs text-gray-600 focus:border-primary-500 outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. CTA BANNER */}
      {activeSection === 'cta' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 space-y-5 animate-in fade-in duration-200">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-base font-bold text-ink">Call To Action (CTA Banner)</h3>
            <p className="text-xs text-gray-400">Bottom conversion banner leading to contact/inquiry.</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink/70 mb-1.5">CTA Eyebrow</label>
            <input
              type="text"
              value={formData.ctaEyebrow || ''}
              onChange={(e) => handleChange('ctaEyebrow', e.target.value)}
              placeholder="e.g. Ready to Start?"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-primary-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink/70 mb-1.5">CTA Title</label>
            <input
              type="text"
              value={formData.ctaTitle || ''}
              onChange={(e) => handleChange('ctaTitle', e.target.value)}
              placeholder="e.g. Ready to Start Your Project? Let’s Talk"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold focus:border-primary-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink/70 mb-1.5">CTA Description</label>
            <textarea
              rows={3}
              value={formData.ctaDesc || ''}
              onChange={(e) => handleChange('ctaDesc', e.target.value)}
              placeholder="Move from idea to execution with reliable custom software development services..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-primary-500 outline-none"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink/70 mb-1.5">Button Text</label>
              <input
                type="text"
                value={formData.ctaButtonText || ''}
                onChange={(e) => handleChange('ctaButtonText', e.target.value)}
                placeholder="e.g. Discuss Your Project"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold focus:border-primary-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink/70 mb-1.5">Button Link</label>
              <input
                type="text"
                value={formData.ctaButtonLink || ''}
                onChange={(e) => handleChange('ctaButtonLink', e.target.value)}
                placeholder="e.g. /contact"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-primary-500 outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* 7. FAQS */}
      {activeSection === 'faqs' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-ink">Frequently Asked Questions (FAQs)</h3>
              <p className="text-xs text-gray-400">Questions and answers displayed in accordion format.</p>
            </div>
            <button
              type="button"
              onClick={addFaq}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-50 text-primary-600 text-xs font-bold hover:bg-primary-100 transition"
            >
              <Plus size={14} /> Add FAQ
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink/70 mb-1.5">Section Eyebrow</label>
              <input
                type="text"
                value={formData.faqEyebrow || ''}
                onChange={(e) => handleChange('faqEyebrow', e.target.value)}
                placeholder="e.g. FAQ"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-primary-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink/70 mb-1.5">Section Title</label>
              <input
                type="text"
                value={formData.faqTitle || ''}
                onChange={(e) => handleChange('faqTitle', e.target.value)}
                placeholder="e.g. Frequently Asked Questions"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold focus:border-primary-500 outline-none"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-xs font-bold text-ink uppercase tracking-wider">
              Questions & Answers ({formData.faqs.length})
            </label>
            {formData.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-primary-100 transition space-y-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={faq.q || ''}
                    onChange={(e) => handleFaqChange(idx, 'q', e.target.value)}
                    placeholder="Question (e.g. How much do custom software development services cost?)"
                    className="flex-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-bold"
                  />
                  <button
                    type="button"
                    onClick={() => removeFaq(idx)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={faq.a || ''}
                  onChange={(e) => handleFaqChange(idx, 'a', e.target.value)}
                  placeholder="Answer text..."
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-600 focus:border-primary-500 outline-none"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 8. SEO SETTINGS */}
      {activeSection === 'seo' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 space-y-5 animate-in fade-in duration-200">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-base font-bold text-ink">Services Page SEO & Social Meta</h3>
            <p className="text-xs text-gray-400">Search engine optimization and social sharing cards for /services.</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink/70 mb-1.5">Meta Title</label>
            <input
              type="text"
              value={formData.seo?.metaTitle || ''}
              onChange={(e) => handleSeoChange('metaTitle', e.target.value)}
              placeholder="e.g. Software Development & IT Consulting Services | Cubixsol"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-primary-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink/70 mb-1.5">Meta Description</label>
            <textarea
              rows={3}
              value={formData.seo?.metaDescription || ''}
              onChange={(e) => handleSeoChange('metaDescription', e.target.value)}
              placeholder="Meta description for search engine results..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-primary-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink/70 mb-1.5">Keywords (comma separated)</label>
            <input
              type="text"
              value={formData.seo?.keywords || ''}
              onChange={(e) => handleSeoChange('keywords', e.target.value)}
              placeholder="e.g. custom software development, web development, mobile apps"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-primary-500 outline-none"
            />
          </div>
        </div>
      )}
    </div>
  );
}
