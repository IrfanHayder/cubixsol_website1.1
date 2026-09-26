import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Shield,
  Clock,
} from 'lucide-react';
import { apiFetch } from '../utils/api';

// Official WhatsApp Brand SVG Icon
function WhatsAppIcon({ className = 'w-6 h-6' }) {
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

// Clean phone string to pure international digits format
function sanitizePhone(rawPhone) {
  if (!rawPhone) return '923041100028';
  return String(rawPhone).replace(/[^\d]/g, '');
}

export default function WhatsAppWidget() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [isOpen, setIsOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [hasUnread, setHasUnread] = useState(true);
  const teaserTimerRef = useRef(null);
  const popupRef = useRef(null);

  // Load settings from server & local storage cache
  const loadSettings = () => {
    try {
      const cached = localStorage.getItem('cubixsol_whatsapp_widget_settings');
      if (cached) {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(cached) });
      }
    } catch (_) {}

    apiFetch('site-settings/whatsapp_widget')
      .then((data) => {
        if (data && typeof data === 'object') {
          const merged = { ...DEFAULT_SETTINGS, ...data };
          setSettings(merged);
          try {
            localStorage.setItem('cubixsol_whatsapp_widget_settings', JSON.stringify(merged));
          } catch (_) {}
        }
      })
      .catch((err) => {
        console.warn('WhatsApp widget: Using fallback settings', err.message);
      });
  };

  useEffect(() => {
    loadSettings();

    // Listen to admin update event for instantaneous preview
    const handleUpdate = (e) => {
      if (e.detail) {
        setSettings({ ...DEFAULT_SETTINGS, ...e.detail });
      } else {
        loadSettings();
      }
    };
    window.addEventListener('cubixsol_whatsapp_updated', handleUpdate);
    return () => window.removeEventListener('cubixsol_whatsapp_updated', handleUpdate);
  }, []);

  // Handle auto-open teaser bubble
  useEffect(() => {
    if (!settings.enabled) return;
    const delay = parseInt(settings.autoOpenDelay, 10);
    if (isNaN(delay) || delay <= 0) return;

    teaserTimerRef.current = setTimeout(() => {
      if (!hasInteracted && !isOpen) {
        setShowTeaser(true);
      }
    }, delay * 1000);

    return () => {
      if (teaserTimerRef.current) clearTimeout(teaserTimerRef.current);
    };
  }, [settings.enabled, settings.autoOpenDelay, hasInteracted, isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && popupRef.current && !popupRef.current.contains(e.target)) {
        // Only close if not clicking the toggle button
        const toggleBtn = document.getElementById('whatsapp-floating-toggle-btn');
        if (!toggleBtn || !toggleBtn.contains(e.target)) {
          setIsOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  if (!settings.enabled) {
    return null;
  }

  const cleanNumber = sanitizePhone(settings.phoneNumber);
  const isRight = settings.position !== 'bottom-left';

  const handleOpenWhatsApp = (customText = null) => {
    const textToSend = (customText || customInput.trim() || settings.defaultMessage || '').trim();
    const encoded = encodeURIComponent(textToSend);
    const url = `https://wa.me/${cleanNumber}${encoded ? `?text=${encoded}` : ''}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setHasInteracted(true);
    setShowTeaser(false);
    setHasUnread(false);
  };

  const handleToggleOpen = () => {
    setIsOpen((prev) => !prev);
    setShowTeaser(false);
    setHasInteracted(true);
    setHasUnread(false);
  };

  const handleQuickStarterClick = (starterText) => {
    handleOpenWhatsApp(starterText);
  };

  return (
    <div
      className={`fixed z-50 flex flex-col pointer-events-none ${
        isRight ? 'right-4 sm:right-6 bottom-5 sm:bottom-6 items-end' : 'left-4 sm:left-6 bottom-5 sm:bottom-6 items-start'
      }`}
    >
      {/* 1. TEASER TOAST / SPEECH BUBBLE */}
      <AnimatePresence>
        {showTeaser && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className={`pointer-events-auto mb-3 max-w-[280px] sm:max-w-xs bg-white text-ink rounded-2xl shadow-xl border border-gray-100 p-3.5 relative flex items-start gap-3 cursor-pointer group hover:shadow-2xl transition-shadow ${
              isRight ? 'origin-bottom-right' : 'origin-bottom-left'
            }`}
            onClick={handleToggleOpen}
          >
            <div className="w-9 h-9 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center shrink-0">
              <WhatsAppIcon className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-ink">{settings.displayName || 'Cubixsol Support'}</p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowTeaser(false);
                    setHasInteracted(true);
                  }}
                  className="p-1 -mr-1 -mt-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <X size={14} />
                </button>
              </div>
              <p className="text-[12px] text-gray-600 leading-snug mt-0.5 line-clamp-2">
                Need help with your project? Chat directly with our team on WhatsApp!
              </p>
              <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-1.5 group-hover:translate-x-0.5 transition-transform">
                <span>Start conversation</span>
                <ChevronRight size={13} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. CHAT WINDOW / POPUP CARD */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={popupRef}
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 20 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className={`pointer-events-auto mb-3 w-[calc(100vw-2rem)] sm:w-[380px] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[580px] ${
              isRight ? 'origin-bottom-right' : 'origin-bottom-left'
            }`}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#075E54] to-[#128C7E] text-white p-4 sm:p-5 relative flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative shrink-0">
                  {settings.avatar ? (
                    <img
                      src={settings.avatar}
                      alt={settings.displayName}
                      className="w-11 h-11 rounded-full object-cover border-2 border-white/40 shadow-sm"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white border-2 border-white/30 shadow-sm">
                      <WhatsAppIcon className="w-6 h-6 text-white" />
                    </div>
                  )}
                  {/* Pulse online dot */}
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#075E54] rounded-full shadow-xs">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
                  </span>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm sm:text-base font-bold text-white truncate leading-tight">
                      {settings.displayName || 'Cubixsol Support'}
                    </h3>
                    <CheckCircle2 size={15} className="text-emerald-300 shrink-0" title="Verified Business" />
                  </div>
                  <p className="text-[11px] sm:text-xs text-white/80 truncate mt-0.5 font-medium flex items-center gap-1">
                    <Clock size={11} className="shrink-0" />
                    {settings.agentTitle || 'Typically replies in minutes'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
                title="Close chat window"
              >
                <X size={19} />
              </button>
            </div>

            {/* Chat Body */}
            <div
              className="flex-1 overflow-y-auto p-4 sm:p-4.5 space-y-4 bg-[#f0f2f5]/80"
              style={{
                backgroundImage:
                  'radial-gradient(#128c7e10 1px, transparent 1px), radial-gradient(#075e5408 1px, #f8fafc 1px)',
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 10px 10px',
              }}
            >
              {/* Date stamp pill */}
              <div className="text-center">
                <span className="inline-block bg-white/90 shadow-2xs backdrop-blur-xs text-[10px] font-semibold uppercase tracking-wider text-gray-500 px-3 py-0.5 rounded-full border border-gray-100">
                  Today
                </span>
              </div>

              {/* Inbound Agent Message Bubble */}
              <div className="flex items-start gap-2.5 max-w-[90%]">
                <div className="bg-white rounded-2xl rounded-tl-xs p-3.5 shadow-sm border border-gray-100 text-ink relative">
                  <p className="text-xs sm:text-[13px] leading-relaxed text-gray-800 whitespace-pre-line font-medium">
                    {settings.welcomeMessage ||
                      '👋 Hello! Welcome to Cubixsol.\nHow can we help you with your web, app, or custom software project today?'}
                  </p>
                  <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-gray-400">
                    <span>Just now</span>
                    <span className="text-emerald-500 font-bold">✓✓</span>
                  </div>
                </div>
              </div>

              {/* Quick Prompt Starters (Chips) */}
              {Array.isArray(settings.quickStarters) && settings.quickStarters.length > 0 && (
                <div className="space-y-2 pt-1">
                  <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles size={12} className="text-emerald-600" />
                    Popular Questions
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {settings.quickStarters.map((starter, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleQuickStarterClick(starter)}
                        className="text-left text-xs sm:text-[12.5px] font-medium text-gray-700 bg-white hover:bg-emerald-50/80 hover:text-emerald-800 hover:border-emerald-200 border border-gray-200/90 rounded-xl px-3 py-2 transition-all shadow-2xs flex items-center justify-between group cursor-pointer"
                      >
                        <span className="truncate pr-2">{starter}</span>
                        <ChevronRight
                          size={14}
                          className="text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all shrink-0"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Chat Footer / Input Form */}
            <div className="p-3 sm:p-4 bg-white border-t border-gray-100 flex flex-col gap-2.5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleOpenWhatsApp();
                }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                    placeholder="Type your message here..."
                    className="w-full text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-ink outline-none focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/10 transition-all placeholder:text-gray-400"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-emerald-500 to-[#25D366] hover:from-emerald-600 hover:to-[#20bd5a] text-white p-2.5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center shrink-0 cursor-pointer active:scale-95"
                  title="Send message via WhatsApp"
                >
                  <Send size={16} />
                </button>
              </form>

              {/* Fast Direct Action Button */}
              <button
                type="button"
                onClick={() => handleOpenWhatsApp()}
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl shadow-md hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>{settings.buttonText || 'Chat on WhatsApp'}</span>
                <ExternalLink size={13} className="opacity-80" />
              </button>

              {/* Security Badge */}
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400">
                <Shield size={11} className="text-emerald-500" />
                <span>Encrypted & direct WhatsApp connection</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. MAIN FLOATING TOGGLE BUTTON */}
      <motion.button
        id="whatsapp-floating-toggle-btn"
        type="button"
        onClick={handleToggleOpen}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="pointer-events-auto relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#128C7E] via-[#25D366] to-[#2ce672] text-white shadow-2xl shadow-emerald-500/35 hover:shadow-emerald-500/50 flex items-center justify-center cursor-pointer border-2 border-white/80 transition-shadow focus:outline-none focus:ring-4 focus:ring-emerald-400/30 group"
        aria-label="Open WhatsApp live chat"
      >
        {/* Glow pulsing outer ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-30 animate-ping pointer-events-none" />

        {/* Dynamic Icon */}
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={26} className="text-white drop-shadow-xs" />
            </motion.div>
          ) : (
            <motion.div
              key="whatsapp"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-center"
            >
              <WhatsAppIcon className="w-8 h-8 sm:w-9 sm:h-9 text-white drop-shadow-md group-hover:scale-105 transition-transform" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Unread badge dot */}
        {hasUnread && !isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 border-2 border-white text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
            1
          </span>
        )}
      </motion.button>
    </div>
  );
}
