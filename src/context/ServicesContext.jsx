import { createContext, useContext, useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';

import { apiFetch } from '../utils/api';

const ServicesContext = createContext(null);

export function resolveIcon(icon) {
  try {
    let Comp = null;
    if (typeof icon === 'function') Comp = icon;
    else if (icon && typeof icon === 'object' && icon.$$typeof) Comp = icon;
    else if (typeof icon === 'string' && icon.trim()) Comp = LucideIcons[icon];
    if (typeof Comp === 'function') return Comp;
    if (Comp && typeof Comp === 'object' && Comp.$$typeof) return Comp;
  } catch (_) {
    /* ignore */
  }
  return LucideIcons.Globe;
}

export function ServicesProvider({ children }) {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const data = await apiFetch('services');
      setServices(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching services:', err);
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
