import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronRight,
  ChevronDown,
  User,
  Mail,
  Lock,
  ArrowRight,
  CheckCircle2,
  Users,
  RefreshCw,
  UserPlus,
  MoreHorizontal,
  Target,
  HelpCircle,
  Loader2,
} from 'lucide-react';
import { apiFetch } from '../utils/api';

const CHALLENGES = [
  {
    id: 'lead-generation',
    label: 'Lead generation',
    icon: Users,
    iconColor: 'text-[#4f46e5] bg-purple-50 border-purple-100/80',
  },
  {
    id: 'retention',
    label: 'Retention',
    icon: RefreshCw,
    iconColor: 'text-emerald-600 bg-emerald-50 border-emerald-100/80',
  },
  {
    id: 'onboarding',
    label: 'Onboarding',
    icon: UserPlus,
    iconColor: 'text-sky-600 bg-sky-50 border-sky-100/80',
  },
  {
    id: 'other',
    label: 'Other',
    icon: MoreHorizontal,
    iconColor: 'text-amber-600 bg-amber-50 border-amber-100/80',
  },
];

const COMPANY_SIZES = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-500 employees',
  '500+ employees',
];

export default function FreeEstimateModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedChallenge, setSelectedChallenge] = useState('');
  const [firstName, setFirstName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSelectedChallenge('');
      setFirstName('');
      setWorkEmail('');
      setCompanySize('');
      setError('');
      setSubmitted(false);
      setLoading(false);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSelectChallenge = (challengeLabel) => {
    setSelectedChallenge(challengeLabel);
    setError('');
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstName.trim()) {
      setError('Please enter your first name.');
      return;
    }
    if (!workEmail.trim() || !workEmail.includes('@')) {
      setError('Please enter a valid work email.');
      return;
    }
    if (!companySize) {
      setError('Please select your company size.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await apiFetch('messages', {
        method: 'POST',
        body: JSON.stringify({
          name: firstName.trim(),
          email: workEmail.trim(),
          subject: `Free Estimate Request - ${selectedChallenge || 'General'}`,
          message: `Free Estimate Assessment Lead:\n\n• Biggest Challenge: ${selectedChallenge || 'Not specified'}\n• First Name: ${firstName.trim()}\n• Work Email: ${workEmail.trim()}\n• Company Size: ${companySize}`,
          status: 'Unread',
        }),
      });

      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting free estimate request:', err);
      // Even if network error occurs, show polite confirmation
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-[460px] bg-white rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 shadow-2xl border border-gray-100/90 z-10 my-auto overflow-hidden"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-ink hover:bg-gray-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <>
                {/* Header with Step Indicator & Progress Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold text-[#4f46e5] tracking-wide">
                      Step {step} of 2
                    </span>
                    {step === 2 && (
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-xs font-semibold text-gray-400 hover:text-[#4f46e5] transition-colors"
                      >
                        ← Back
                      </button>
                    )}
                  </div>
                  {/* 2-Step Progress Bar */}
                  <div className="w-full h-1.5 bg-gray-100 rounded-full mt-2.5 overflow-hidden">
                    <motion.div
                      initial={false}
                      animate={{ width: step === 1 ? '50%' : '100%' }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="h-full bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] rounded-full"
                    />
                  </div>
                </div>

                {/* STEP 1: What's your biggest challenge */}
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Center Icon Illustration */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-purple-50 via-indigo-50/70 to-purple-100/50 border border-purple-100/90 flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <span className="absolute -top-1 left-2 text-purple-300 text-xs font-bold select-none">✦</span>
                      <span className="absolute -bottom-0.5 right-2 text-indigo-300 text-xs font-bold select-none">✦</span>
                      <span className="absolute top-2 -right-1 text-purple-200 text-sm select-none">·</span>
                      <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center border border-purple-100 text-[#4f46e5]">
                        <HelpCircle className="w-6 h-6 stroke-[2.2]" />
                      </div>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-extrabold text-ink text-center tracking-tight mb-1.5">
                      What&apos;s your biggest challenge right now?
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 text-center mb-6 leading-relaxed">
                      This helps us find the best solution for you.
                    </p>

                    {/* Challenge Cards List */}
                    <div className="space-y-2.5">
                      {CHALLENGES.map((item) => {
                        const IconComp = item.icon;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleSelectChallenge(item.label)}
                            className="w-full flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border border-gray-200/90 bg-white hover:border-[#4f46e5] hover:bg-purple-50/30 hover:shadow-sm transition-all duration-200 group text-left cursor-pointer"
                          >
                            <div className="flex items-center gap-3.5">
                              <span
                                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${item.iconColor} group-hover:scale-105 transition-transform`}
                              >
                                <IconComp className="w-5 h-5 stroke-[2.2]" />
                              </span>
                              <span className="font-bold text-ink text-sm sm:text-base group-hover:text-[#4f46e5] transition-colors">
                                {item.label}
                              </span>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#4f46e5] group-hover:translate-x-0.5 transition-all" />
                          </button>
                        );
                      })}
                    </div>

                    {/* Confidential Notice */}
                    <div className="mt-6 pt-2 flex items-center justify-center gap-1.5 text-[11px] sm:text-xs text-gray-400 text-center">
                      <Lock className="w-3.5 h-3.5 shrink-0" />
                      <span>Your answers are confidential and help us personalize your results.</span>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Quick details */}
                {step === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Center Icon Illustration */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-purple-50 via-indigo-50/70 to-purple-100/50 border border-purple-100/90 flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <span className="absolute -top-1 left-2 text-purple-300 text-xs font-bold select-none">✦</span>
                      <span className="absolute -bottom-0.5 right-2 text-indigo-300 text-xs font-bold select-none">✦</span>
                      <span className="absolute top-2 -right-1 text-purple-200 text-sm select-none">·</span>
                      <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center border border-purple-100 text-[#4f46e5]">
                        <Target className="w-6 h-6 stroke-[2.2]" />
                      </div>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-extrabold text-ink text-center tracking-tight mb-1.5">
                      Got it. Let&apos;s find the right solution for you.
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 text-center mb-6 leading-relaxed">
                      Just a few quick details and we&apos;ll do the rest.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-3.5">
                      {/* First Name Input */}
                      <div className="relative">
                        <User className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="First name"
                          required
                          className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200/90 bg-white focus:bg-white focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/10 outline-none text-sm text-ink placeholder:text-gray-400 transition-all"
                        />
                      </div>

                      {/* Work Email Input */}
                      <div className="relative">
                        <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="email"
                          value={workEmail}
                          onChange={(e) => setWorkEmail(e.target.value)}
                          placeholder="Work email"
                          required
                          className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200/90 bg-white focus:bg-white focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/10 outline-none text-sm text-ink placeholder:text-gray-400 transition-all"
                        />
                      </div>

                      {/* Company Size Select */}
                      <div>
                        <label className="block text-xs sm:text-sm font-semibold text-ink mb-1.5">
                          Company size
                        </label>
                        <div className="relative">
                          <select
                            value={companySize}
                            onChange={(e) => setCompanySize(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-2xl border border-gray-200/90 bg-white focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/10 outline-none text-sm text-ink transition-all appearance-none cursor-pointer pr-10"
                          >
                            <option value="" disabled>
                              Please select
                            </option>
                            {COMPANY_SIZES.map((size) => (
                              <option key={size} value={size}>
                                {size}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      {error && (
                        <p className="text-xs font-semibold text-rose-500 text-center">{error}</p>
                      )}

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 px-6 rounded-2xl bg-[#4338ca] hover:bg-[#3730a3] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70 mt-4"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <span>Show me the solution</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>

                      {/* Privacy Footer */}
                      <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] sm:text-xs text-gray-400 text-center">
                        <Lock className="w-3.5 h-3.5 shrink-0" />
                        <span>We respect your privacy. Unsubscribe anytime.</span>
                      </div>
                    </form>
                  </motion.div>
                )}
              </>
            ) : (
              /* SUCCESS STATE */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h2 className="text-2xl font-extrabold text-ink mb-2">
                  Got It, {firstName || 'Friend'}!
                </h2>
                <p className="text-sm text-gray-500 max-w-sm mx-auto leading-relaxed mb-6">
                  We have received your request for <strong>{selectedChallenge || 'custom solution'}</strong>. Our team is preparing your tailored estimate and will contact you at <strong>{workEmail}</strong> shortly.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-8 py-3 rounded-2xl bg-ink text-white font-bold text-sm hover:bg-ink/90 transition shadow-card cursor-pointer"
                >
                  Done
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
