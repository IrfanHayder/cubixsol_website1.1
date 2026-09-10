import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, Lock, Mail, Loader2, ShieldCheck } from 'lucide-react';

export default function AdminLogin() {
  const { login, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Already logged in → go to dashboard
  if (!authLoading && isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login(email, password);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0f0e1a] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-brand-cyan animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0e1a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-brand-purple/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-brand-cyan/15 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-purple/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-primary-gradient flex items-center justify-center text-white text-lg font-bold shadow-soft mb-4">
              CS
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Cubixsol Admin</h1>
            <p className="text-sm text-white/50 mt-1.5 flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-brand-cyan" />
              Secure admin access
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@cubixsol.com"
                  required
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none transition-all text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30"
                />
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-primary-gradient text-white font-semibold text-sm shadow-soft hover:opacity-95 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In to Dashboard'
              )}
            </button>
          </form>

          {/* Demo hint */}
          <div className="mt-6 pt-5 border-t border-white/10">
            <p className="text-[11px] text-white/40 text-center leading-relaxed">
              Demo credentials<br />
              <span className="text-white/60 font-medium">admin@cubixsol.com</span>
              {' · '}
              <span className="text-white/60 font-medium">admin123</span>
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-white/30 mt-6">
          © {new Date().getFullYear()} Cubixsol. All rights reserved.
        </p>
      </div>
    </div>
  );
}
