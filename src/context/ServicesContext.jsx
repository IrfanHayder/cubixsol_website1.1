import { createContext, useContext, useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { apiFetch } from '../utils/api';


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
  // Read cache from localStorage on initial render for instant 0ms load with zero flicker
  const [services, setServices] = useState(() => {
    try {
      const cached = localStorage.getItem('cubixsol_services_cache');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (_) {}
    return [];
  });

  const [loading, setLoading] = useState(() => {
    try {
      const cached = localStorage.getItem('cubixsol_services_cache');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return false;
      }
    } catch (_) {}
    return true;
  });

  const [error, setError] = useState(null);

  const fetchServices = async () => {
    try {
      const data = await apiFetch('services');
      if (Array.isArray(data) && data.length > 0) {
        setServices(data);
        try {
          localStorage.setItem('cubixsol_services_cache', JSON.stringify(data));
        } catch (_) {}
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching services from MongoDB:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <ServicesContext.Provider
      value={{ services, loading, error, refreshServices: fetchServices, resolveIcon }}
    >
      {children}
    </ServicesContext.Provider>
  );
}


export function useServices() {
  const ctx = useContext(ServicesContext);
  if (!ctx) throw new Error('useServices must be used within ServicesProvider');
  return ctx;
}
