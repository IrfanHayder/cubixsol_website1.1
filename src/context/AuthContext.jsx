import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Demo credentials – change these as needed
const ADMIN_EMAIL = 'admin@cubixsol.com';
const ADMIN_PASSWORD = 'admin123';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore session from localStorage
    try {
      const saved = localStorage.getItem('cubixsol_admin');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.email && parsed?.token) {
          setUser(parsed);
        }
      }
    } catch {
      localStorage.removeItem('cubixsol_admin');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Simulate network delay
      setTimeout(() => {
        if (
          email.trim().toLowerCase() === ADMIN_EMAIL &&
          password === ADMIN_PASSWORD
        ) {
          const session = {
            email: ADMIN_EMAIL,
            name: 'Admin',
            role: 'admin',
            token: 'cs_' + Math.random().toString(36).slice(2) + Date.now().toString(36),
            loggedInAt: new Date().toISOString(),
          };
          localStorage.setItem('cubixsol_admin', JSON.stringify(session));
          setUser(session);
          resolve(session);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 600);
    });
  };

  const logout = () => {
    localStorage.removeItem('cubixsol_admin');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
