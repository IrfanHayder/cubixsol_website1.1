import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Building2, Layers, ShoppingBag } from 'lucide-react';

// Brand SVGs for 100% pixel-perfect vector rendering
const BRAND_SVGS = {
  shopify: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
      <path d="M12 10v4" />
    </svg>
  ),
  'shopify plus': (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
      <path d="M12 12v3m-1.5-1.5h3" />
    </svg>
  ),
  klaviyo: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      <path d="M12 13v3" />
    </svg>
  ),
  recharge: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </svg>
  ),
  gorgias: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M8 9h8" />
      <path d="M8 13h6" />
    </svg>
  ),
  yotpo: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  ),
  stripe: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
      <path d="M6 15h2" />
      <path d="M10 15h4" />
    </svg>
  ),
  pagefly: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  shogun: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="20" y1="21" y2="21" />
      <line x1="4" x2="20" y1="14" y2="14" />
      <line x1="4" x2="20" y1="7" y2="7" />
      <circle cx="9" cy="7" r="2" />
      <circle cx="15" cy="14" r="2" />
      <circle cx="9" cy="21" r="2" />
    </svg>
  ),
  loox: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
    </svg>
  ),
  'judge.me': (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      <path d="m9 8 2 2 4-4" />
    </svg>
  ),
  judge: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      <path d="m9 8 2 2 4-4" />
    </svg>
  ),
  lodgify: (className) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.5z" />
      <path d="M9 22V12h6v10" />
      <circle cx="12" cy="8" r="1.5" fill="currentColor" />
    </svg>
  ),
};

const FALLBACK_NAME_MAP = {
  shopify: 'ShoppingBag',
  'shopify plus': 'ShoppingBag',
  klaviyo: 'Mail',
  recharge: 'RefreshCw',
  gorgias: 'MessageSquare',
  yotpo: 'Star',
  stripe: 'CreditCard',
  pagefly: 'Layers',
  shogun: 'Sliders',
  loox: 'Sparkles',
  judgeme: 'Award',
  'judge.me': 'Award',
  judge: 'Award',
  technology: 'Cpu',
  tech: 'Cpu',
  travel: 'Plane',
  hospitality: 'Plane',
  logistics: 'Truck',
  finance: 'Landmark',
  fintech: 'Landmark',
  healthcare: 'HeartPulse',
  health: 'HeartPulse',
  saas: 'Cloud',
  ecommerce: 'ShoppingBag',
  commerce: 'ShoppingBag',
  'real estate': 'Building2',
  realestate: 'Building2',
  education: 'GraduationCap',
  guesty: 'Hotel',
  hostaway: 'Home',
  hostfully: 'Compass',
  zeevou: 'Sparkles',
  smoobu: 'RefreshCw',
  newbook: 'BookOpen',
  hostify: 'Server',
  jurny: 'Bot',
  lodgify: 'Globe',
  ownerrez: 'KeyRound',
  'rentals united': 'Network',
  tokeet: 'CalendarCheck',
  uplisting: 'TrendingUp',
  cloudbeds: 'Cloud',
  opera: 'Database',
  mews: 'Boxes',
};

export default function DynamicIcon({
  icon,
  alt = '',
  className = 'w-6 h-6',
  fallbackName = 'Building2',
  title = '',
}) {
  const queryText = (icon || title || '').toLowerCase().trim();

  // 1. Direct custom Brand SVG check
  if (queryText) {
    for (const [brandKey, renderSvg] of Object.entries(BRAND_SVGS)) {
      if (queryText === brandKey || queryText.includes(brandKey)) {
        if (!icon?.startsWith?.('http') && !icon?.startsWith?.('/') && !icon?.startsWith?.('data:')) {
          return renderSvg(className);
        }
      }
    }
  }

  // 2. Direct Image / SVG URL check (from Admin media library or CDN)
  if (typeof icon === 'string') {
    const isUrl =
      icon.startsWith('/uploads/') ||
      icon.startsWith('http://') ||
      icon.startsWith('https://') ||
      icon.startsWith('data:') ||
      icon.includes('/') ||
      /\.(svg|png|jpg|jpeg|webp|gif)($|\?)/i.test(icon);

    if (isUrl) {
      return (
        <img
          src={icon}
          alt={alt || title || 'Icon'}
          className={`${className} object-contain`}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      );
    }

    // 3. Lucide exact component name match
    const LucideComponent = LucideIcons[icon];
    if (LucideComponent) {
      return <LucideComponent className={className} />;
    }
  }

  // 4. Fallback Name Map
  if (queryText) {
    for (const [key, iconName] of Object.entries(FALLBACK_NAME_MAP)) {
      if (queryText === key || queryText.includes(key)) {
        const Matched = LucideIcons[iconName];
        if (Matched && !icon?.startsWith?.('http') && !icon?.startsWith?.('/') && !icon?.startsWith?.('data:')) {
          return <Matched className={className} />;
        }
      }
    }
  }

  // 5. Function/React component passed directly
  if (typeof icon === 'function' || typeof icon === 'object') {
    const Component = icon;
    return <Component className={className} />;
  }

  const Fallback = LucideIcons[fallbackName] || Building2;
  return <Fallback className={className} />;
}
