import * as LucideIcons from 'lucide-react';
import { Building2, Layers } from 'lucide-react';

const FALLBACK_NAME_MAP = {
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
  const queryText = (icon || title || '').toLowerCase();
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

    const LucideComponent = LucideIcons[icon];
    if (LucideComponent) {
      return <LucideComponent className={className} />;
    }
  }

  if (typeof icon === 'function' || typeof icon === 'object') {
    const Component = icon;
    return <Component className={className} />;
  }

  const Fallback = LucideIcons[fallbackName] || Building2;
  return <Fallback className={className} />;
}
