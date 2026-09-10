import { useState, useEffect } from 'react';
import {
  Save,
  MapPin,
  Sparkles,
  Layers,
  ShieldCheck,
  CheckCircle,
  ExternalLink,
  Loader2,
  Clock,
  Users2,
  Plus,
  Trash2,
  Phone,
  Mail,
} from 'lucide-react';
import { API_BASE, apiFetch } from '../../utils/api';
import DynamicIcon from '../DynamicIcon';
import { formatMapEmbedUrl } from '../../utils/mapUrl';

export default function ContactPageEditor({ showToast }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('section');

  const [formData, setFormData] = useState({
    slug: 'contact',
    title: 'Contact Us',
    heroEyebrow: 'Get In Touch',
    heroTitle: "Let's Build Something Amazing Together",
    heroDesc:
      "Have a project in mind or need expert advice? We'd love to hear from you. Fill out the form and our team will get back to you as soon as possible.",
    contactSectionTitle: "We're Here to Help",
    contactSectionSubtitle:
      'Choose the best way to reach us. Our team is always ready to assist you.',
    mapEmbedUrl:
      'https://maps.google.com/maps?q=New%20York%2C%20NY&t=&z=13&ie=UTF8&iwloc=&output=embed',
    highlights: [
      { icon: 'Clock', title: 'Quick Response', desc: 'We reply within 24 hours' },
      { icon: 'Users2', title: 'Expert Support', desc: 'Get help from our experienced team' },
      { icon: 'ShieldCheck', title: 'Trusted Partner', desc: 'Your success is our priority' },
    ],
    seo: {
      metaTitle: 'Contact Us | Cubixsol',
      metaDescription:
        'Get in touch with Cubixsol. We build innovative software solutions, custom websites, and enterprise web applications.',
      keywords: 'contact cubixsol, hire developers, software agency contact',
    },
  });

  useEffect(() => {
    let cancelled = false;
    async function loadData() {
      try {
        setLoading(true);
        const data = await apiFetch('pages/contact');
        if (data && !cancelled) {
          setFormData((prev) => ({
            ...prev,
            ...data,
            highlights: Array.isArray(data.highlights) && data.highlights.length > 0
              ? data.highlights
              : prev.highlights,
            seo: {
              ...prev.seo,
              ...(data.seo || {}),
            },
          }));
        }
      } catch (err) {
        console.warn('Could not load existing contact page data:', err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    loadData();
    return () => {
      cancelled = true;
    };
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

  const handleHighlightChange = (idx, field, val) => {
    const list = [...(formData.highlights || [])];
    list[idx] = { ...list[idx], [field]: val };
    setFormData((prev) => ({ ...prev, highlights: list }));
  };

  const addHighlight = () => {
    const list = [...(formData.highlights || [])];
    list.push({ icon: 'ShieldCheck', title: 'New Highlight', desc: 'Description here' });
    setFormData((prev) => ({ ...prev, highlights: list }));
  };

  const removeHighlight = (idx) => {
    const list = [...(formData.highlights || [])];
    list.splice(idx, 1);
    setFormData((prev) => ({ ...prev, highlights: list }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/pages/contact`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Failed to update contact page content');
      }
      showToast('Contact Page content updated successfully in MongoDB!', 'success');
    } catch (err) {
      console.error(err);
      showToast(err.message || 'Error saving contact page content', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 gap-3 text-ink/60">
        <Loader2 size={24} className="animate-spin text-brand-purple" />
        <span>Loading Contact Page settings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-card">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-ink">Contact Page Content &amp; Map Settings</h2>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 uppercase">
              LIVE IN DB
            </span>
          </div>
          <p className="text-xs text-ink/50 mt-1">
            Manage section titles, subtitles, Google Map embed URL, hero texts, and highlights.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/contact"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-ink/70 bg-gray-100 hover:bg-gray-200/80 transition"
          >
            <ExternalLink size={14} />
            View Public Page
          </a>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-gradient text-white text-sm font-semibold shadow-soft hover:opacity-95 transition disabled:opacity-60"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('section')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
            activeTab === 'section'
              ? 'bg-primary-gradient text-white shadow-soft'
              : 'bg-white text-ink/70 hover:bg-gray-50 border border-gray-100'
          }`}
        >
          📍 Help Section &amp; Map
        </button>
        <button
          onClick={() => setActiveTab('hero')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
            activeTab === 'hero'
              ? 'bg-primary-gradient text-white shadow-soft'
              : 'bg-white text-ink/70 hover:bg-gray-50 border border-gray-100'
          }`}
        >
          ✨ Hero &amp; Highlights
        </button>
        <button
          onClick={() => setActiveTab('seo')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
            activeTab === 'seo'
              ? 'bg-primary-gradient text-white shadow-soft'
              : 'bg-white text-ink/70 hover:bg-gray-50 border border-gray-100'
          }`}
        >
          🔍 SEO Settings
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* TAB 1: HELP SECTION & MAP */}
        {activeTab === 'section' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 space-y-5">
              <h3 className="text-base font-bold text-ink flex items-center gap-2">
                <MapPin className="text-primary-600" size={18} />
                "We're Here to Help" Section Headings
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-ink mb-1.5">Section Title</label>
                  <input
                    type="text"
                    value={formData.contactSectionTitle || ''}
                    onChange={(e) => handleChange('contactSectionTitle', e.target.value)}
                    placeholder="We're Here to Help"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm focus:bg-white focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink mb-1.5">Section Subtitle</label>
                  <input
                    type="text"
                    value={formData.contactSectionSubtitle || ''}
                    onChange={(e) => handleChange('contactSectionSubtitle', e.target.value)}
                    placeholder="Choose the best way to reach us. Our team is always ready to assist you."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm focus:bg-white focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="text-base font-bold text-ink flex items-center gap-2">
                  <MapPin className="text-primary-600" size={18} />
                  Google Maps Location / Embed URL
                </h3>
                <span className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-md">
                  ✨ Auto-converts any Maps link, iframe tag, or city name
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1.5">
                  Location, Maps Link, or Embed Code
                </label>
                <input
                  type="text"
                  value={formData.mapEmbedUrl || ''}
                  onChange={(e) => handleChange('mapEmbedUrl', e.target.value)}
                  placeholder="e.g. United Kingdom OR London, UK OR https://www.google.com/maps/place/..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm font-mono text-xs focus:bg-white focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 outline-none"
                />
                <p className="text-[11px] text-gray-400 mt-1">
                  You can paste a full Google Maps share link, embed `&lt;iframe&gt;` code, or simply type a city/country name like <strong>United Kingdom</strong>, <strong>Dubai, UAE</strong>, or <strong>Lahore</strong>.
                </p>
              </div>

              {/* Live Map Preview */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-ink/70">Live Map Preview:</p>
                <div className="w-full h-64 rounded-xl overflow-hidden border border-gray-200 bg-gray-100 relative">
                  {formData.mapEmbedUrl ? (
                    <iframe
                      title="Contact location preview"
                      src={formatMapEmbedUrl(formData.mapEmbedUrl)}
                      className="w-full h-full border-0"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                      No map URL specified
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: HERO & HIGHLIGHTS */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 space-y-5">
              <h3 className="text-base font-bold text-ink flex items-center gap-2">
                <Sparkles className="text-brand-purple" size={18} />
                Contact Hero Section
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-ink mb-1.5">Hero Eyebrow</label>
                  <input
                    type="text"
                    value={formData.heroEyebrow || ''}
                    onChange={(e) => handleChange('heroEyebrow', e.target.value)}
                    placeholder="Get In Touch"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm focus:bg-white focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-ink mb-1.5">Hero Title</label>
                  <input
                    type="text"
                    value={formData.heroTitle || ''}
                    onChange={(e) => handleChange('heroTitle', e.target.value)}
                    placeholder="Let's Build Something Amazing Together"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm focus:bg-white focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-ink mb-1.5">
                    Hero Description / Paragraph
                  </label>
                  <textarea
                    rows={3}
                    value={formData.heroDesc || ''}
                    onChange={(e) => handleChange('heroDesc', e.target.value)}
                    placeholder="Have a project in mind or need expert advice?..."
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm focus:bg-white focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-ink flex items-center gap-2">
                    <ShieldCheck className="text-primary-600" size={18} />
                    Contact Highlights (3 feature badges)
                  </h3>
                  <p className="text-xs text-ink/50 mt-0.5">
                    Displayed directly beneath the hero text on the contact page.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={addHighlight}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-50 text-primary-600 text-xs font-bold hover:bg-primary-100 transition"
                >
                  <Plus size={14} /> Add Badge
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(formData.highlights || []).map((h, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-3 relative group"
                  >
                    <button
                      type="button"
                      onClick={() => removeHighlight(i)}
                      className="absolute top-2.5 right-2.5 p-1 rounded-md text-red-400 hover:text-red-600 hover:bg-red-50 transition"
                      title="Remove highlight"
                    >
                      <Trash2 size={14} />
                    </button>

                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-primary-600 shrink-0">
                        <DynamicIcon icon={h.icon || 'Clock'} className="w-4 h-4 text-primary-600" />
                      </div>
                      <input
                        type="text"
                        value={h.icon || ''}
                        onChange={(e) => handleHighlightChange(i, 'icon', e.target.value)}
                        placeholder="Icon (e.g. Clock, Users2, ShieldCheck)"
                        className="w-full px-2.5 py-1 text-xs rounded-lg border border-gray-200 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-ink/70 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={h.title || ''}
                        onChange={(e) => handleHighlightChange(i, 'title', e.target.value)}
                        placeholder="Quick Response"
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-gray-200 bg-white font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-ink/70 mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        value={h.desc || ''}
                        onChange={(e) => handleHighlightChange(i, 'desc', e.target.value)}
                        placeholder="We reply within 24 hours"
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-gray-200 bg-white text-ink/70"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SEO */}
        {activeTab === 'seo' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 space-y-5">
            <h3 className="text-base font-bold text-ink">Contact Page SEO &amp; Meta Tags</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-ink mb-1.5">Meta Title</label>
                <input
                  type="text"
                  value={formData.seo?.metaTitle || ''}
                  onChange={(e) => handleSeoChange('metaTitle', e.target.value)}
                  placeholder="Contact Us | Cubixsol"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm focus:bg-white focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-ink mb-1.5">Meta Description</label>
                <textarea
                  rows={2}
                  value={formData.seo?.metaDescription || ''}
                  onChange={(e) => handleSeoChange('metaDescription', e.target.value)}
                  placeholder="Get in touch with Cubixsol..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm focus:bg-white focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-ink mb-1.5">
                  Keywords (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.seo?.keywords || ''}
                  onChange={(e) => handleSeoChange('keywords', e.target.value)}
                  placeholder="contact, web development, support"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-sm focus:bg-white focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Bottom Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary-gradient text-white text-sm font-semibold shadow-soft hover:opacity-95 transition disabled:opacity-60"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
