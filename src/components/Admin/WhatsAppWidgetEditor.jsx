import { useState, useEffect } from 'react';
import {
  Save,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Smartphone,
  MessageSquare,
  Sparkles,
  ExternalLink,
  Plus,
  Trash2,
  Clock,
  Shield,
  Layers,
  Send,
  Loader2,
  Image as ImageIcon,
  Check,
  ChevronRight,
  Eye,
  Sliders,
} from 'lucide-react';
import { apiFetch } from '../../utils/api';
import MediaManager from './MediaManager';

// Official WhatsApp Brand SVG Icon
function WhatsAppIcon({ className = 'w-5 h-5' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.888 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.412z" />
    </svg>
  );
}

const DEFAULT_SETTINGS = {
  enabled: true,
  phoneNumber: '+92 304 1100028',
  displayName: 'Cubixsol Support',
  agentTitle: 'Online | Typically replies in minutes',
  avatar: '',
  welcomeMessage: '👋 Hello! Welcome to Cubixsol.\nHow can we help you with your web, app, or custom software project today?',
  defaultMessage: 'Hi Cubixsol team, I would like to discuss a project with you.',
  position: 'bottom-right',
  autoOpenDelay: 5,
  buttonText: 'Chat on WhatsApp',
  quickStarters: [
    '💼 Get a Quote for Web / App Development',
    '🤖 Custom AI & Automation Solutions',
    '🚀 Scale / Modernize Existing Platform',
    '📅 Book a 1-on-1 Consultation Call',
  ],
};

function sanitizePhone(rawPhone) {
  if (!rawPhone) return '923041100028';
  return String(rawPhone).replace(/[^\d]/g, '');
}

export default function WhatsAppWidgetEditor({ showToast }) {
  const [formData, setFormData] = useState(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newStarterText, setNewStarterText] = useState('');
  const [showMediaModal, setShowMediaModal] = useState(false);
  const [previewTab, setPreviewTab] = useState('open'); // 'open' | 'closed'

  // Fetch current settings from backend
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    apiFetch('site-settings/whatsapp_widget')
      .then((data) => {
        if (cancelled) return;
        if (data && typeof data === 'object') {
          setFormData({
            ...DEFAULT_SETTINGS,
            ...data,
            quickStarters: Array.isArray(data.quickStarters)
              ? data.quickStarters
              : DEFAULT_SETTINGS.quickStarters,
          });
        }
      })
      .catch((err) => {
        console.warn('Could not load WhatsApp settings, using defaults:', err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddStarter = () => {
    if (!newStarterText.trim()) return;
    const updated = [...(formData.quickStarters || []), newStarterText.trim()];
    handleChange('quickStarters', updated);
    setNewStarterText('');
  };

  const handleRemoveStarter = (index) => {
    const updated = (formData.quickStarters || []).filter((_, i) => i !== index);
    handleChange('quickStarters', updated);
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all WhatsApp widget settings to recommended defaults?')) {
      setFormData(DEFAULT_SETTINGS);
      showToast?.('Settings reset to defaults. Click Save to apply.', 'info');
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/site-settings/whatsapp_widget', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: formData }),
      });

      if (!res.ok) {
        throw new Error('Failed to save settings to server');
      }

      // Update local storage cache
      try {
        localStorage.setItem('cubixsol_whatsapp_widget_settings', JSON.stringify(formData));
        // Broadcast custom event so active tabs update immediately
        window.dispatchEvent(
          new CustomEvent('cubixsol_whatsapp_updated', { detail: formData })
        );
      } catch (_) {}

      showToast?.('✅ WhatsApp Widget settings saved successfully!', 'success');
    } catch (err) {
      console.error('Error saving WhatsApp settings:', err);
      showToast?.(err.message || 'Failed to save settings', 'error');
    } finally {
      setSaving(false);
    }
  };

  const cleanPhone = sanitizePhone(formData.phoneNumber);
  const testWhatsAppUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    formData.defaultMessage || ''
  )}`;

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-3">
        <Loader2 className="animate-spin text-emerald-600" size={32} />
        <p className="text-sm font-medium text-gray-500">Loading WhatsApp widget settings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#075E54] via-[#128C7E] to-[#25D366] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-bold uppercase tracking-wider mb-2.5">
            <WhatsAppIcon className="w-4 h-4 text-emerald-300" />
            <span>Live Communication Suite</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            WhatsApp Floating Widget Manager
          </h2>
          <p className="text-sm text-white/85 mt-2 leading-relaxed">
            Configure your website's live WhatsApp button, interactive chat window, welcome messages,
            and quick conversation starters. All changes apply across the website in real-time.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold backdrop-blur-xs transition flex items-center gap-2 cursor-pointer border border-white/20"
          >
            <RotateCcw size={14} />
            Reset Defaults
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-white text-[#075E54] hover:bg-white/90 text-xs font-bold shadow-lg transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            <span>{saving ? 'Saving...' : 'Save Settings'}</span>
          </button>
        </div>

        {/* Decorative background watermark */}
        <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 opacity-10 pointer-events-none">
          <WhatsAppIcon className="w-72 h-72 text-white" />
        </div>
      </div>

      {/* Main Grid: Form (Left) & Real-time Live Preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* ================= LEFT: FORM SETTINGS (7 Cols) ================= */}
        <div className="lg:col-span-7 space-y-5">
          {/* Card 1: Master Switch & Position */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Sliders size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-ink">Widget Status & Placement</h3>
                  <p className="text-xs text-gray-400">Control visibility and screen position</p>
                </div>
              </div>

              {/* Master Switch */}
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.enabled}
                  onChange={(e) => handleChange('enabled', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-12 h-6.5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                <span className="ml-2.5 text-xs font-bold text-ink">
                  {formData.enabled ? '🟢 Enabled' : '⚪ Disabled'}
                </span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-bold text-ink mb-1">Widget Position</label>
                <select
                  value={formData.position}
                  onChange={(e) => handleChange('position', e.target.value)}
                  className="w-full text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-emerald-500 focus:bg-white transition"
                >
                  <option value="bottom-right">Bottom Right (Recommended)</option>
                  <option value="bottom-left">Bottom Left</option>
                </select>
                <p className="text-[11px] text-gray-400 mt-1">Screen corner where button appears</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">
                  Auto-Open Greeting Delay (Seconds)
                </label>
                <input
                  type="number"
                  min="0"
                  max="60"
                  value={formData.autoOpenDelay}
                  onChange={(e) => handleChange('autoOpenDelay', parseInt(e.target.value, 10) || 0)}
                  className="w-full text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-emerald-500 focus:bg-white transition"
                  placeholder="5"
                />
                <p className="text-[11px] text-gray-400 mt-1">
                  Set to 0 to disable auto-popup speech bubble
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: WhatsApp Phone & Message */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-card space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <Smartphone size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-ink">WhatsApp Connection</h3>
                <p className="text-xs text-gray-400">Destination phone number and default message</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-ink">WhatsApp Phone Number *</label>
                <a
                  href={testWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold text-emerald-600 hover:underline flex items-center gap-1"
                >
                  <span>Test Link</span>
                  <ExternalLink size={11} />
                </a>
              </div>
              <input
                type="text"
                value={formData.phoneNumber}
                onChange={(e) => handleChange('phoneNumber', e.target.value)}
                placeholder="+92 304 1100028"
                className="w-full text-xs font-mono bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 outline-none focus:border-emerald-500 focus:bg-white transition"
              />
              <div className="flex items-center justify-between text-[11px] text-gray-400 mt-1">
                <span>Include country code (e.g. +92 for PK, +44 for UK, +1 for US)</span>
                <span className="font-mono text-emerald-700 font-semibold">wa.me/{cleanPhone}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink mb-1">
                Default Pre-filled Message
              </label>
              <textarea
                rows={2}
                value={formData.defaultMessage}
                onChange={(e) => handleChange('defaultMessage', e.target.value)}
                placeholder="Hi Cubixsol team, I would like to discuss a project with you."
                className="w-full text-xs bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:border-emerald-500 focus:bg-white transition"
              />
              <p className="text-[11px] text-gray-400 mt-1">
                This text will be automatically typed in the visitor's WhatsApp when they click chat.
              </p>
            </div>
          </div>

          {/* Card 3: Agent & Chat Window Branding */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-card space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <MessageSquare size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-ink">Agent & Chat Window Content</h3>
                <p className="text-xs text-gray-400">Customize the look and greeting inside the popup</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-ink mb-1">Agent / Display Name</label>
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) => handleChange('displayName', e.target.value)}
                  placeholder="Cubixsol Support"
                  className="w-full text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-emerald-500 focus:bg-white transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-ink mb-1">Status / Subtitle</label>
                <input
                  type="text"
                  value={formData.agentTitle}
                  onChange={(e) => handleChange('agentTitle', e.target.value)}
                  placeholder="Online | Typically replies in minutes"
                  className="w-full text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-emerald-500 focus:bg-white transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink mb-1">
                Agent Avatar Image URL (Optional)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={formData.avatar}
                  onChange={(e) => handleChange('avatar', e.target.value)}
                  placeholder="Paste image URL or choose from media..."
                  className="flex-1 text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-emerald-500 focus:bg-white transition"
                />
                <button
                  type="button"
                  onClick={() => setShowMediaModal(true)}
                  className="px-3 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-ink text-xs font-semibold flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <ImageIcon size={14} />
                  <span>Media</span>
                </button>
              </div>
              <p className="text-[11px] text-gray-400 mt-1">Leave empty to use official WhatsApp logo avatar</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-ink mb-1">
                Welcome Greeting Bubble (Inside Chat)
              </label>
              <textarea
                rows={3}
                value={formData.welcomeMessage}
                onChange={(e) => handleChange('welcomeMessage', e.target.value)}
                placeholder="👋 Hello! Welcome to Cubixsol. How can we help you today?"
                className="w-full text-xs bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:border-emerald-500 focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-ink mb-1">CTA Button Text</label>
              <input
                type="text"
                value={formData.buttonText}
                onChange={(e) => handleChange('buttonText', e.target.value)}
                placeholder="Chat on WhatsApp"
                className="w-full text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-emerald-500 focus:bg-white transition"
              />
            </div>
          </div>

          {/* Card 4: Quick Reply Questions (Chips) */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 shadow-card space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-ink">Quick Inquiry Starters (Chips)</h3>
                  <p className="text-xs text-gray-400">1-click starter questions for visitors</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                {formData.quickStarters?.length || 0} questions
              </span>
            </div>

            <div className="space-y-2">
              {(formData.quickStarters || []).map((starter, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-2 p-2.5 bg-gray-50 rounded-xl border border-gray-200/80 text-xs font-medium text-gray-700"
                >
                  <span className="truncate flex-1">{starter}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveStarter(index)}
                    className="p-1 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-white transition shrink-0"
                    title="Delete question"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}

              {/* Add New Starter */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="text"
                  value={newStarterText}
                  onChange={(e) => setNewStarterText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddStarter();
                    }
                  }}
                  placeholder="e.g. 📱 Need iOS & Android Mobile App"
                  className="flex-1 text-xs bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 outline-none focus:border-emerald-500 focus:bg-white transition"
                />
                <button
                  type="button"
                  onClick={handleAddStarter}
                  disabled={!newStarterText.trim()}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition flex items-center gap-1 shrink-0 cursor-pointer disabled:opacity-40"
                >
                  <Plus size={14} />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT: INTERACTIVE LIVE PREVIEW (5 Cols) ================= */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 space-y-4">
            {/* Preview Toolbar */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-card flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye size={16} className="text-emerald-600" />
                <span className="text-xs font-bold text-ink">Interactive Real-time Preview</span>
              </div>
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setPreviewTab('open')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                    previewTab === 'open'
                      ? 'bg-white text-emerald-700 shadow-xs'
                      : 'text-gray-500 hover:text-ink'
                  }`}
                >
                  Chat Open
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab('closed')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                    previewTab === 'closed'
                      ? 'bg-white text-emerald-700 shadow-xs'
                      : 'text-gray-500 hover:text-ink'
                  }`}
                >
                  Button Only
                </button>
              </div>
            </div>

            {/* Preview Viewport Canvas */}
            <div
              className="w-full bg-[#eef2f6] rounded-3xl border-2 border-gray-200 p-6 min-h-[580px] flex flex-col justify-end items-end relative overflow-hidden shadow-inner"
              style={{
                backgroundImage:
                  'linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            >
              {/* Fake website preview watermark */}
              <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none opacity-40">
                <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold">
                  CS
                </div>
                <span className="text-xs font-bold text-gray-600 font-mono">cubixsol.com Preview</span>
              </div>

              {!formData.enabled ? (
                <div className="m-auto text-center p-6 bg-white/80 backdrop-blur-xs rounded-2xl border border-gray-200 shadow-sm max-w-xs">
                  <AlertCircle size={28} className="text-amber-500 mx-auto mb-2" />
                  <p className="text-xs font-bold text-ink">Widget is Disabled</p>
                  <p className="text-[11px] text-gray-500 mt-1">
                    Toggle the status switch on the left to show the WhatsApp widget on your website.
                  </p>
                </div>
              ) : (
                <div
                  className={`w-full flex flex-col ${
                    formData.position === 'bottom-left' ? 'items-start' : 'items-end'
                  }`}
                >
                  {/* Chat Dialog Preview */}
                  {previewTab === 'open' && (
                    <div className="w-full max-w-[340px] bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden mb-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
                      {/* Preview Header */}
                      <div className="bg-gradient-to-r from-[#075E54] to-[#128C7E] text-white p-4 flex items-center justify-between">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="relative shrink-0">
                            {formData.avatar ? (
                              <img
                                src={formData.avatar}
                                alt="Agent"
                                className="w-10 h-10 rounded-full object-cover border-2 border-white/40"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white border-2 border-white/30">
                                <WhatsAppIcon className="w-5 h-5 text-white" />
                              </div>
                            )}
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#075E54] rounded-full" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1">
                              <p className="text-xs font-bold text-white truncate">
                                {formData.displayName || 'Cubixsol Support'}
                              </p>
                              <CheckCircle2 size={13} className="text-emerald-300 shrink-0" />
                            </div>
                            <p className="text-[10px] text-white/80 truncate">
                              {formData.agentTitle || 'Online | Typically replies in minutes'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Preview Body */}
                      <div
                        className="p-3.5 space-y-3 bg-[#f0f2f5]/90 max-h-[300px] overflow-y-auto"
                        style={{
                          backgroundImage:
                            'radial-gradient(#128c7e10 1px, transparent 1px), radial-gradient(#075e5408 1px, #f8fafc 1px)',
                          backgroundSize: '16px 16px',
                        }}
                      >
                        <div className="text-center">
                          <span className="inline-block bg-white text-[9px] font-semibold text-gray-500 px-2.5 py-0.5 rounded-full border border-gray-100 shadow-2xs">
                            Today
                          </span>
                        </div>

                        {/* Inbound Agent Message */}
                        <div className="bg-white rounded-2xl rounded-tl-xs p-3 text-xs leading-relaxed text-gray-800 shadow-2xs border border-gray-100 whitespace-pre-line font-medium">
                          {formData.welcomeMessage ||
                            '👋 Hello! Welcome to Cubixsol. How can we help you today?'}
                          <div className="text-right text-[9px] text-gray-400 mt-1">Just now ✓✓</div>
                        </div>

                        {/* Starter chips */}
                        {Array.isArray(formData.quickStarters) && formData.quickStarters.length > 0 && (
                          <div className="space-y-1.5 pt-1">
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                              Popular Questions
                            </p>
                            {formData.quickStarters.map((starter, i) => (
                              <div
                                key={i}
                                className="text-left text-[11px] font-medium text-gray-700 bg-white hover:bg-emerald-50 border border-gray-200 rounded-xl px-2.5 py-1.5 flex items-center justify-between transition shadow-2xs cursor-pointer"
                              >
                                <span className="truncate pr-1">{starter}</span>
                                <ChevronRight size={12} className="text-gray-400 shrink-0" />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Preview Footer */}
                      <div className="p-3 bg-white border-t border-gray-100 space-y-2">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="text"
                            readOnly
                            value={formData.defaultMessage || ''}
                            placeholder="Type a message..."
                            className="flex-1 text-[11px] bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1.5 text-gray-600 outline-none"
                          />
                          <div className="bg-emerald-500 text-white p-1.5 rounded-xl flex items-center justify-center">
                            <Send size={13} />
                          </div>
                        </div>
                        <div className="bg-[#25D366] text-white text-center font-bold text-xs py-2 rounded-xl flex items-center justify-center gap-1.5 shadow-sm">
                          <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
                          <span>{formData.buttonText || 'Chat on WhatsApp'}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Floating Action Button */}
                  <div className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#2ce672] text-white shadow-2xl flex items-center justify-center cursor-pointer border-2 border-white hover:scale-105 transition-transform">
                    <WhatsAppIcon className="w-8 h-8 text-white drop-shadow-sm" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 border-2 border-white rounded-full text-white text-[9px] font-bold flex items-center justify-center">
                      1
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Save Reminder Card */}
            <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-100 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <p className="text-xs text-emerald-900 font-medium">
                  Ready to deploy these settings to your website?
                </p>
              </div>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer disabled:opacity-50"
              >
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                <span>{saving ? 'Saving...' : 'Save Settings'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Media Manager Modal for selecting avatar */}
      {showMediaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <h3 className="text-lg font-bold text-ink flex items-center gap-2">
                <ImageIcon size={20} className="text-emerald-600" />
                Select Avatar from Media Library
              </h3>
              <button
                type="button"
                onClick={() => setShowMediaModal(false)}
                className="p-1.5 rounded-xl hover:bg-gray-100 text-gray-500"
              >
                ✕
              </button>
            </div>
            <MediaManager
              showToast={showToast}
              onSelectMedia={(item) => {
                if (item?.url) {
                  handleChange('avatar', item.url);
                  setShowMediaModal(false);
                  showToast?.('Avatar selected!', 'success');
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
