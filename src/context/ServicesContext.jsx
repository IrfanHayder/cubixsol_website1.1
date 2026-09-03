import { createContext, useContext, useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';

import { apiFetch } from '../utils/api';
import { services as defaultServices } from '../data/content';

const ServicesContext = createContext(null);

export function resolveIcon(icon) {
  try {
    let Comp = null;
    if (typeof icon === 'function') Comp = icon;
    else if (icon && typeof icon === 'object' && icon.$$typeof) Comp = icon;
    else if (typeof icon === 'string' && icon.trim()) {
      const isUrl =
        icon.startsWith('/uploads/') ||
        icon.startsWith('http://') ||
        icon.startsWith('https://') ||
        icon.startsWith('data:') ||
        icon.includes('/') ||
        /\.(svg|png|jpg|jpeg|webp|gif)($|\?)/i.test(icon);

      if (isUrl) {
        return function CustomImageIcon(props) {
          return (
            <img
              src={icon}
              alt=""
              {...props}
              className={`${props.className || 'w-6 h-6'} object-contain`}
              loading="lazy"
            />
          );
        };
      }
      Comp = LucideIcons[icon];
    }
    if (typeof Comp === 'function') return Comp;
    if (Comp && typeof Comp === 'object' && Comp.$$typeof) return Comp;
  } catch (_) {
    /* ignore */
  }
  return LucideIcons.Globe;
}


export function ServicesProvider({ children }) {
  const [services, setServices] = useState(defaultServices || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchServices = async () => {
    try {
      const data = await apiFetch('services');
      if (Array.isArray(data) && data.length > 0) {
        // Merge DB services with any defaults not in DB
        const dbSlugs = new Set(data.map((d) => d.slug));
        const merged = [...data, ...(defaultServices || []).filter((s) => !dbSlugs.has(s.slug))];
        setServices(merged);
      } else {
        setServices(defaultServices || []);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching services:', err);
      setServices(defaultServices || []);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <ServicesContext.Provider value={{ services, loading, error, refreshServices: fetchServices, resolveIcon }}>
      {children}
    </ServicesContext.Provider>
  );
}

export function useServices() {
  const ctx = useContext(ServicesContext);
  if (!ctx) throw new Error('useServices must be used within ServicesProvider');
  return ctx;
}
