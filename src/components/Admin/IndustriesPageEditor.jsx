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
  CheckCircle,
  ExternalLink,
  Loader2,
  Layers2,
  FileText,
} from 'lucide-react';
import { API_BASE, apiFetch } from '../../utils/api';

export default function IndustriesPageEditor({ showToast, onNavigateToIndustriesTable }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const [formData, setFormData] = useState({
    slug: 'industries',
    title: 'Industries',
    heroEyebrow: 'Where we deliver',
    heroTitle: 'Industry-Specific Software Development Services',
    heroDesc:
      'Cubixsol provides **industry software development services** to address the operational demands, customer expectations, and technical requirements of your market. We understand your domain and combine that knowledge with product strategy, design, engineering, and system integration to build powerful software that achieves your business goals.',
    heroButtonText: 'Discuss Your Project',
    heroButtonLink: '/contact',
    heroBadges: [
      'Domain-Aware Engineering',
      'Regulated Compliance (HIPAA, PCI DSS)',
      'Modern Scalable Architecture',
      'Custom Third-Party Integrations',
    ],

    builtAroundEyebrow: 'Tailored Solutions',
    builtAroundTitle: 'Software Built Around Your Industry',
    builtAroundDesc:
      'Every industry faces distinct challenges, which is why we develop industry-specific software to address them. We develop each product based on the industry’s users, processes, integrations, security risks, and regulatory requirements. Our specialists deliver industry-focused software solutions across eight key verticals to modernize outdated systems, improve customer experiences, and support future growth.',
    builtAroundPoints: [
      {
        title: 'User & Workflow Centric',
        desc: 'Tailored to the specific daily operating workflows of your teams and end users.',
      },
      {
        title: 'Security & Regulatory Compliance',
        desc: 'Built-in protection adhering to HIPAA, PCI DSS, SOC 2, and data privacy regulations.',
      },
      {
        title: 'API & Legacy System Integration',
        desc: 'Interoperable connections with CRM, ERP, payment gateways, and core platforms.',
      },
      {
        title: 'Scalable Cloud Architecture',
        desc: 'Engineered for high traffic volume, fault tolerance, and zero-downtime operations.',
      },
    ],

    industriesSectionEyebrow: 'Industries We Serve',
    industriesSectionTitle: 'Industries We Serve',
    industriesSectionIntro:
      'Our teams combine technical expertise with practical industry knowledge. From regulated healthcare platforms to high-traffic ecommerce stores, we build reliable digital products around the way each business operates.',

    domainExpertiseEyebrow: 'Strategic Advantage',
    domainExpertiseTitle: 'Why Domain Expertise Matters',
    domainExpertiseParagraphs: [
      'Software development decisions carry different consequences in every industry. A healthcare platform must protect sensitive patient information, while a fintech product must secure financial transactions. E-commerce and travel platforms must process heavy traffic without disrupting the customer journey.',
      'We consider industry-specific requirements from the beginning. We assess user roles, business workflows, system dependencies, data security, and relevant standards such as HIPAA and PCI DSS where applicable. Our approach reduces avoidable rework, supports faster decision-making, and produces software suited to real operating conditions rather than generic assumptions.',
    ],
    domainExpertisePillars: [
      {
        title: 'Context-Driven Architecture',
        desc: 'Technical decisions tailored to actual industry constraints and user requirements.',
      },
      {
        title: 'Security & Compliance from Day 1',
        desc: 'Built with strict industry standards such as HIPAA, PCI DSS, and data privacy laws.',
      },
      {
        title: 'Zero Rework & Fast Delivery',
        desc: 'Clear understanding of industry workflows prevents costly revisions and speeds rollout.',
      },
    ],

    ctaEyebrow: "Let's Collaborate",
    ctaTitle: 'Let’s Build Something Amazing Together',
    ctaDesc:
      'Turn your industry knowledge into a digital product that works for your customers and operations. Partner with Cubixsol to plan, design, develop, and scale software built around your market.',
    ctaButtonText: 'Start Your Project',
    ctaButtonLink: '/contact',

    faqEyebrow: 'FAQ',
    faqTitle: 'Frequently Asked Questions',
    faqIntro:
      'Explore answers to key questions about our industry-specific software development capabilities.',
    faqs: [
      {
        q: 'Does Cubixsol have experience with industry-specific software?',
        a: "Yes. We build software for healthcare, SaaS, fintech, logistics, real estate, education, ecommerce, and travel businesses. We design the development process around each industry's users, workflows, and technical requirements.",
      },
      {
        q: 'Can you integrate the software with our existing systems?',
        a: 'Yes. We can connect your product with CRM, ERP, payment, accounting, analytics, inventory, communication, and other third-party platforms through available APIs or custom integrations.',
      },
      {
        q: 'Can we review relevant project examples?',
        a: 'Yes. Share your industry and project requirements with our team. We will present the most relevant work, capabilities, or technical approach based on your product goals and confidentiality restrictions.',
      },
    ],

    seo: {
      metaTitle: 'Industry-Specific Software Development Services | Cubixsol',
      metaDescription:
        'Cubixsol provides industry software development services across healthcare, SaaS, fintech, logistics, real estate, education, ecommerce, and travel.',
      keywords:
        'industry software development, healthcare software, fintech software, saas development, logistics software, real estate software, ecommerce software, education software, travel software, cubixsol',
      ogTitle: 'Industry-Specific Software Development Services | Cubixsol',
      ogDescription:
        'Cubixsol provides industry software development services across healthcare, SaaS, fintech, logistics, real estate, education, ecommerce, and travel.',
      ogImage: '',
      canonicalUrl: '',
    },
  });

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await apiFetch('pages/industries');
        if (res && res.slug) {
          setFormData((prev) => ({
            ...prev,
            ...res,
            heroBadges: Array.isArray(res.heroBadges) ? res.heroBadges : prev.heroBadges,
            builtAroundPoints: Array.isArray(res.builtAroundPoints)
              ? res.builtAroundPoints
              : prev.builtAroundPoints,
            domainExpertiseParagraphs: Array.isArray(res.domainExpertiseParagraphs)
              ? res.domainExpertiseParagraphs
              : prev.domainExpertiseParagraphs,
            domainExpertisePillars: Array.isArray(res.domainExpertisePillars)
              ? res.domainExpertisePillars
              : prev.domainExpertisePillars,
            faqs: Array.isArray(res.faqs) && res.faqs.length > 0 ? res.faqs : prev.faqs,
            seo: { ...prev.seo, ...(res.seo || {}) },
          }));
        }
      } catch (err) {
        console.error('Error loading industries page content:', err);
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

  // Generic List item helpers (Built Around Points, Domain Pillars)
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

  // Paragraph array helper
  const handleParagraphChange = (index, value) => {
    setFormData((prev) => {
      const paras = [...prev.domainExpertiseParagraphs];
      paras[index] = value;
      return { ...prev, domainExpertiseParagraphs: paras };
    });
  };

  const addParagraph = () => {
    setFormData((prev) => ({
      ...prev,
      domainExpertiseParagraphs: [...prev.domainExpertiseParagraphs, ''],
    }));
  };

  const removeParagraph = (index) => {
    setFormData((prev) => ({
      ...prev,
      domainExpertiseParagraphs: prev.domainExpertiseParagraphs.filter((_, i) => i !== index),
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
      const res = await fetch(`${API_BASE}/pages/industries`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to save');
      }
      showToast('✅ Industries page content saved successfully! Live on website.', 'success');
    } catch (err) {
      console.error(err);
      showToast(err.message || 'Error saving industries page content', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-400">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
        <span className="text-sm font-medium">Loading Industries Page Content...</span>
      </div>
    );
  }

  const sections = [
    { id: 'hero', label: '1. Hero & Header', icon: Sparkles },
    { id: 'builtAround', label: '2. Software Built Around', icon: Layers },
    { id: 'industries', label: '3. Industries We Serve', icon: Building2 },
    { id: 'domainExpertise', label: '4. Domain Expertise', icon: ShieldCheck },
    { id: 'cta', label: '5. CTA Banner', icon: CheckCircle },
    { id: 'faqs', label: '6. FAQs', icon: HelpCircle },
    { id: 'seo', label: '7. SEO Settings', icon: ExternalLink },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      {/* Top Header Bar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sticky top-16 z-20 backdrop-blur-md bg-white/95">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-ink">Industries Page Content Editor</h2>
            <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-500/20">
              LIVE /industries
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Edit all headings, intro paragraphs, domain expertise, CTA, and FAQs shown on{' '}
            <a
              href="/industries"
              target="_blank"
              rel="noreferrer"
              className="text-primary-600 font-semibold hover:underline inline-flex items-center gap-1"
            >
              /industries <ExternalLink size={12} />
            </a>
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <a
            href="/industries"
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
            <p className="text-xs text-gray-400">The main banner at the top of the /industries page.</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink/70 mb-1.5">
              Hero Eyebrow (Small Tag)
            </label>
            <input
              type="text"
              value={formData.heroEyebrow || ''}
              onChange={(e) => handleChange('heroEyebrow', e.target.value)}
              placeholder="e.g. Where we deliver"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-primary-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink/70 mb-1.5">
              Hero Main Title (H1 Heading)
            </label>
            <input
              type="text"
              value={formData.heroTitle || ''}
              onChange={(e) => handleChange('heroTitle', e.target.value)}
              placeholder="e.g. Industry-Specific Software Development Services"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold focus:border-primary-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink/70 mb-1.5">
              Hero Description Paragraph
            </label>
            <textarea
              rows={4}
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
                placeholder="e.g. Discuss Your Project"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium focus:border-primary-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink/70 mb-1.5">
                Hero CTA Button Link
              </label>
              <input
                type="text"
                value={formData.heroButtonLink || ''}
                onChange={(e) => handleChange('heroButtonLink', e.target.value)}
                placeholder="e.g. /contact"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-mono focus:border-primary-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink/70 mb-1.5">
              Hero Badges (One badge per line)
            </label>
            <textarea
              rows={4}
              value={Array.isArray(formData.heroBadges) ? formData.heroBadges.join('\n') : ''}
              onChange={(e) =>
                handleChange(
                  'heroBadges',
                  e.target.value.split('\n').map((s) => s.trim()).filter(Boolean)
                )
              }
              placeholder="Domain-Aware Engineering&#10;Regulated Compliance (HIPAA, PCI DSS)&#10;Modern Scalable Architecture&#10;Custom Third-Party Integrations"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-mono focus:border-primary-500 outline-none"
            />
          </div>
        </div>
      )}

      {/* 2. BUILT AROUND YOUR INDUSTRY */}
      {activeSection === 'builtAround' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-ink">Software Built Around Your Industry</h3>
              <p className="text-xs text-gray-400">
                Detailed industry-focus statement and core value pillars.
              </p>
            </div>
            <button
              type="button"
              onClick={() => addListItem('builtAroundPoints')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-50 text-primary-600 text-xs font-bold hover:bg-primary-100 transition"
            >
              <Plus size={14} /> Add Value Point
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink/70 mb-1.5">Section Eyebrow</label>
              <input
                type="text"
                value={formData.builtAroundEyebrow || ''}
                onChange={(e) => handleChange('builtAroundEyebrow', e.target.value)}
                placeholder="e.g. Tailored Solutions"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-primary-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink/70 mb-1.5">Section Title</label>
              <input
                type="text"
                value={formData.builtAroundTitle || ''}
                onChange={(e) => handleChange('builtAroundTitle', e.target.value)}
                placeholder="e.g. Software Built Around Your Industry"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold focus:border-primary-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink/70 mb-1.5">
              Section Main Paragraph
            </label>
            <textarea
              rows={4}
              value={formData.builtAroundDesc || ''}
              onChange={(e) => handleChange('builtAroundDesc', e.target.value)}
              placeholder="Every industry faces distinct challenges, which is why we develop industry-specific software to address them..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-primary-500 outline-none"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-xs font-bold text-ink uppercase tracking-wider">
              Core Highlights & Value Points ({formData.builtAroundPoints?.length || 0})
            </label>
            {(formData.builtAroundPoints || []).map((pt, idx) => (
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
                    value={pt.title || ''}
                    onChange={(e) =>
                      handleListItemChange('builtAroundPoints', idx, 'title', e.target.value)
                    }
                    placeholder="Point Title (e.g. User & Workflow Centric)"
                    className="flex-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-bold"
                  />
                  <button
                    type="button"
                    onClick={() => removeListItem('builtAroundPoints', idx)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={pt.desc || ''}
                  onChange={(e) =>
                    handleListItemChange('builtAroundPoints', idx, 'desc', e.target.value)
                  }
                  placeholder="Point details and explanation..."
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-600 focus:border-primary-500 outline-none"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. INDUSTRIES WE SERVE SECTION */}
      {activeSection === 'industries' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 space-y-6 animate-in fade-in duration-200">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-base font-bold text-ink">Industries We Serve Section</h3>
            <p className="text-xs text-gray-400">
              The heading and intro shown above the 8 industry cards grid.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink/70 mb-1.5">Section Eyebrow</label>
              <input
                type="text"
                value={formData.industriesSectionEyebrow || ''}
                onChange={(e) => handleChange('industriesSectionEyebrow', e.target.value)}
                placeholder="e.g. Industries We Serve"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-primary-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink/70 mb-1.5">Section Title</label>
              <input
                type="text"
                value={formData.industriesSectionTitle || ''}
                onChange={(e) => handleChange('industriesSectionTitle', e.target.value)}
                placeholder="e.g. Industries We Serve"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold focus:border-primary-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink/70 mb-1.5">
              Section Intro Text
            </label>
            <textarea
              rows={3}
              value={formData.industriesSectionIntro || ''}
              onChange={(e) => handleChange('industriesSectionIntro', e.target.value)}
              placeholder="Our teams combine technical expertise with practical industry knowledge. From regulated healthcare platforms to high-traffic ecommerce stores..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-primary-500 outline-none"
            />
          </div>

          <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-xs font-bold text-sky-900">Manage Individual Industry Records</h4>
              <p className="text-[11px] text-sky-700 mt-0.5">
                To edit, add, or customize individual industry icons, slugs, points, and case studies, use the Industries Database Table.
              </p>
            </div>
            {onNavigateToIndustriesTable && (
              <button
                type="button"
                onClick={onNavigateToIndustriesTable}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-600 text-white text-xs font-bold hover:bg-sky-700 transition shrink-0"
              >
                <Building2 size={14} /> Open Industries Table
              </button>
            )}
          </div>
        </div>
      )}

      {/* 4. WHY DOMAIN EXPERTISE MATTERS */}
      {activeSection === 'domainExpertise' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-ink">Why Domain Expertise Matters</h3>
              <p className="text-xs text-gray-400">
                Industry-specific considerations, compliance, and why generic approaches fail.
              </p>
            </div>
            <button
              type="button"
              onClick={addParagraph}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-50 text-primary-600 text-xs font-bold hover:bg-primary-100 transition"
            >
              <Plus size={14} /> Add Paragraph
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink/70 mb-1.5">Section Eyebrow</label>
              <input
                type="text"
                value={formData.domainExpertiseEyebrow || ''}
                onChange={(e) => handleChange('domainExpertiseEyebrow', e.target.value)}
                placeholder="e.g. Strategic Advantage"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-primary-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink/70 mb-1.5">Section Title</label>
              <input
                type="text"
                value={formData.domainExpertiseTitle || ''}
                onChange={(e) => handleChange('domainExpertiseTitle', e.target.value)}
                placeholder="e.g. Why Domain Expertise Matters"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold focus:border-primary-500 outline-none"
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-xs font-bold text-ink uppercase tracking-wider">
              Content Paragraphs ({formData.domainExpertiseParagraphs?.length || 0})
            </label>
            {(formData.domainExpertiseParagraphs || []).map((pText, idx) => (
              <div key={idx} className="relative">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-gray-500">Paragraph {idx + 1}</span>
                  {(formData.domainExpertiseParagraphs?.length || 0) > 1 && (
                    <button
                      type="button"
                      onClick={() => removeParagraph(idx)}
                      className="text-xs text-rose-500 hover:underline inline-flex items-center gap-1"
                    >
                      <Trash2 size={12} /> Remove
                    </button>
                  )}
                </div>
                <textarea
                  rows={3}
                  value={pText || ''}
                  onChange={(e) => handleParagraphChange(idx, e.target.value)}
                  placeholder={`Paragraph ${idx + 1} content...`}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-primary-500 outline-none"
                />
              </div>
            ))}
          </div>

          {/* Pillars */}
          <div className="pt-4 border-t border-gray-100 space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-ink uppercase tracking-wider">
                Strategic Pillars ({formData.domainExpertisePillars?.length || 0})
              </label>
              <button
                type="button"
                onClick={() => addListItem('domainExpertisePillars')}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary-50 text-primary-600 text-xs font-bold hover:bg-primary-100 transition"
              >
                <Plus size={13} /> Add Pillar
              </button>
            </div>

            {(formData.domainExpertisePillars || []).map((pil, idx) => (
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
                    value={pil.title || ''}
                    onChange={(e) =>
                      handleListItemChange('domainExpertisePillars', idx, 'title', e.target.value)
                    }
                    placeholder="Pillar Title (e.g. Industry Compliance)"
                    className="flex-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-bold"
                  />
                  <button
                    type="button"
                    onClick={() => removeListItem('domainExpertisePillars', idx)}
                    className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={pil.desc || ''}
                  onChange={(e) =>
                    handleListItemChange('domainExpertisePillars', idx, 'desc', e.target.value)
                  }
                  placeholder="Pillar description..."
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 text-xs text-gray-600 focus:border-primary-500 outline-none"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. CTA BANNER */}
      {activeSection === 'cta' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 space-y-5 animate-in fade-in duration-200">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-base font-bold text-ink">Bottom Call-to-Action Banner</h3>
            <p className="text-xs text-gray-400">The high-impact banner near the footer.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink/70 mb-1.5">Banner Eyebrow</label>
              <input
                type="text"
                value={formData.ctaEyebrow || ''}
                onChange={(e) => handleChange('ctaEyebrow', e.target.value)}
                placeholder="e.g. Let's Collaborate"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-primary-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink/70 mb-1.5">Banner Title</label>
              <input
                type="text"
                value={formData.ctaTitle || ''}
                onChange={(e) => handleChange('ctaTitle', e.target.value)}
                placeholder="e.g. Let’s Build Something Amazing Together"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold focus:border-primary-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink/70 mb-1.5">
              Banner Description
            </label>
            <textarea
              rows={3}
              value={formData.ctaDesc || ''}
              onChange={(e) => handleChange('ctaDesc', e.target.value)}
              placeholder="Turn your industry knowledge into a digital product..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-primary-500 outline-none"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4 p-4 rounded-xl bg-primary-50/50 border border-primary-100">
            <div>
              <label className="block text-xs font-semibold text-ink/70 mb-1.5">
                CTA Button Text
              </label>
              <input
                type="text"
                value={formData.ctaButtonText || ''}
                onChange={(e) => handleChange('ctaButtonText', e.target.value)}
                placeholder="e.g. Start Your Project"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-medium focus:border-primary-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink/70 mb-1.5">
                CTA Button Link
              </label>
              <input
                type="text"
                value={formData.ctaButtonLink || ''}
                onChange={(e) => handleChange('ctaButtonLink', e.target.value)}
                placeholder="e.g. /contact"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-mono focus:border-primary-500 outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* 6. FAQS */}
      {activeSection === 'faqs' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-ink">Frequently Asked Questions</h3>
              <p className="text-xs text-gray-400">
                Manage all Q&As displayed on the Industries page.
              </p>
            </div>
            <button
              type="button"
              onClick={addFaq}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary-50 text-primary-600 text-xs font-bold hover:bg-primary-100 transition"
            >
              <Plus size={14} /> Add New FAQ
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

          <div>
            <label className="block text-xs font-semibold text-ink/70 mb-1.5">
              Section Intro Text (Optional)
            </label>
            <input
              type="text"
              value={formData.faqIntro || ''}
              onChange={(e) => handleChange('faqIntro', e.target.value)}
              placeholder="e.g. Explore answers to key questions about our industry software development services."
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-primary-500 outline-none"
            />
          </div>

          <div className="space-y-4">
            <label className="block text-xs font-bold text-ink uppercase tracking-wider">
              Questions & Answers ({formData.faqs.length})
            </label>
            {formData.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-primary-100 hover:shadow-sm transition space-y-3"
              >
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-primary-100 text-primary-700 font-extrabold text-xs flex items-center justify-center shrink-0 mt-1">
                    Q{idx + 1}
                  </span>
                  <div className="flex-1 space-y-3">
                    <input
                      type="text"
                      value={faq.q || ''}
                      onChange={(e) => handleFaqChange(idx, 'q', e.target.value)}
                      placeholder="Question text..."
                      className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm font-bold focus:border-primary-500 outline-none bg-white"
                    />
                    <textarea
                      rows={3}
                      value={faq.a || ''}
                      onChange={(e) => handleFaqChange(idx, 'a', e.target.value)}
                      placeholder="Answer text..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-gray-700 focus:border-primary-500 outline-none bg-white leading-relaxed"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFaq(idx)}
                    className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition mt-1"
                    title="Delete Question"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. SEO SETTINGS */}
      {activeSection === 'seo' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 space-y-5 animate-in fade-in duration-200">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-base font-bold text-ink">SEO & Social Meta Settings</h3>
            <p className="text-xs text-gray-400">
              Manage meta titles, descriptions, and search rankings for /industries.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink/70 mb-1.5">Meta Title</label>
            <input
              type="text"
              value={formData.seo?.metaTitle || ''}
              onChange={(e) => handleSeoChange('metaTitle', e.target.value)}
              placeholder="Industry-Specific Software Development Services | Cubixsol"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold focus:border-primary-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink/70 mb-1.5">
              Meta Description
            </label>
            <textarea
              rows={3}
              value={formData.seo?.metaDescription || ''}
              onChange={(e) => handleSeoChange('metaDescription', e.target.value)}
              placeholder="Cubixsol provides industry software development services across healthcare, SaaS, fintech, logistics..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-primary-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink/70 mb-1.5">
              Keywords (comma-separated)
            </label>
            <input
              type="text"
              value={formData.seo?.keywords || ''}
              onChange={(e) => handleSeoChange('keywords', e.target.value)}
              placeholder="industry software, healthcare software, fintech, saas, logistics"
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-primary-500 outline-none"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-ink/70 mb-1.5">
                OG Social Title
              </label>
              <input
                type="text"
                value={formData.seo?.ogTitle || ''}
                onChange={(e) => handleSeoChange('ogTitle', e.target.value)}
                placeholder="Industry-Specific Software Development Services | Cubixsol"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-primary-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink/70 mb-1.5">
                OG Image URL
              </label>
              <input
                type="text"
                value={formData.seo?.ogImage || ''}
                onChange={(e) => handleSeoChange('ogImage', e.target.value)}
                placeholder="/uploads/og-industries.jpg"
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-mono focus:border-primary-500 outline-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
