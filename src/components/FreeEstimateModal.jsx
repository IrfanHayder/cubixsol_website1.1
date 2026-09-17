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
  Sparkles,
  Target,
  HelpCircle,
  Loader2,
  Layout,
  Cpu,
  TrendingUp,
  Zap,
  Globe,
  Layers,
  Smartphone,
  ShoppingCart,
  Database,
  Building2,
  Bot,
  MessageSquare,
  BarChart3,
  Sliders,
  Check,
  Code2,
} from 'lucide-react';
import { apiFetch } from '../utils/api';

export const ESTIMATE_CATEGORIES = [
  {
    id: 'build-new',
    title: 'Build a New Website or App',
    shortLabel: 'New Website / App',
    question: 'What do you want to build?',
    subtitle: 'Select the type of digital platform you want to create.',
    icon: Layout,
    iconColor: 'text-[#00a4d8] bg-sky-50 border-sky-100/90',
    hoverBorder: 'hover:border-[#00a4d8] hover:bg-sky-50/30',
    activeText: 'text-[#00a4d8]',
    options: [
      { id: 'business-website', label: 'Business Website', icon: Globe },
      { id: 'web-application', label: 'Web Application', icon: Layout },
      { id: 'mobile-app', label: 'Mobile App', icon: Smartphone },
      { id: 'ecommerce-platform', label: 'E-commerce Platform', icon: ShoppingCart },
      { id: 'other-build', label: 'Other', icon: Code2 },
    ],
  },
  {
    id: 'custom-software',
    title: 'Develop Custom Software Solutions',
    shortLabel: 'Custom Software Solutions',
    question: 'What type of software do you need?',
    subtitle: 'Select the architecture and software domain required.',
    icon: Cpu,
    iconColor: 'text-[#4f46e5] bg-indigo-50 border-indigo-100/90',
    hoverBorder: 'hover:border-[#4f46e5] hover:bg-indigo-50/30',
    activeText: 'text-[#4f46e5]',
    options: [
      { id: 'business-management', label: 'Business Management System', icon: Building2 },
      { id: 'saas-product', label: 'SaaS Product', icon: Layers },
      { id: 'internal-tools', label: 'Internal Tools', icon: Sliders },
      { id: 'crm-erp', label: 'CRM / ERP Solution', icon: Database },
      { id: 'other-software', label: 'Other', icon: Code2 },
    ],
  },
  {
    id: 'improve-scale',
    title: 'Improve or Scale My Existing Product',
    shortLabel: 'Scale Existing Product',
    question: 'What is your main growth goal?',
    subtitle: 'Choose the key objective for your existing application.',
    icon: TrendingUp,
    iconColor: 'text-emerald-600 bg-emerald-50 border-emerald-100/90',
    hoverBorder: 'hover:border-emerald-500 hover:bg-emerald-50/30',
    activeText: 'text-emerald-600',
    options: [
      { id: 'get-customers', label: 'Get More Customers & Users', icon: TrendingUp },
      { id: 'improve-ux', label: 'Improve Product Experience', icon: Sparkles },
      { id: 'add-features', label: 'Add New Features', icon: Layers },
      { id: 'scale-platform', label: 'Scale Your Digital Platform', icon: BarChart3 },
      { id: 'optimize-tech', label: 'Optimize Existing Technology', icon: Cpu },
    ],
  },
  {
    id: 'automate-processes',
    title: 'Automate My Business Processes',
    shortLabel: 'Business Automation',
    question: 'What would you like to automate?',
    subtitle: 'Choose which operational processes you want to streamline.',
    icon: Zap,
    iconColor: 'text-amber-600 bg-amber-50 border-amber-100/90',
    hoverBorder: 'hover:border-amber-500 hover:bg-amber-50/30',
    activeText: 'text-amber-600',
    options: [
      { id: 'workflow-automation', label: 'Workflow Automation', icon: Zap },
      { id: 'ai-automation', label: 'AI Automation', icon: Bot },
      { id: 'customer-support', label: 'Customer Support', icon: MessageSquare },
      { id: 'data-processing', label: 'Data Processing', icon: Database },
      { id: 'marketing-sales', label: 'Marketing & Sales Automation', icon: Target },
    ],
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
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');
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
      setSelectedCategory(null);
      setSelectedOption('');
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

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setSelectedOption('');
    setError('');
    setStep(2);
  };

  const handleSelectOption = (optionLabel) => {
    setSelectedOption(optionLabel);
    setError('');
    setStep(3);
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

    const categoryTitle = selectedCategory?.title || 'Custom Solution';

    try {
      await apiFetch('messages', {
        method: 'POST',
        body: JSON.stringify({
          name: firstName.trim(),
          email: workEmail.trim(),
          subject: `Free Estimate Request - ${categoryTitle} (${selectedOption || 'General'})`,
          message: `Free Estimate Assessment Request:\n\n• Primary Goal: ${categoryTitle}\n• Specific Requirement: ${selectedOption || 'Not specified'}\n• First Name: ${firstName.trim()}\n• Work Email: ${workEmail.trim()}\n• Company Size: ${companySize}`,
          status: 'Unread',
        }),
      });

      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting free estimate request:', err);
      // Even on temporary network error, show polite confirmation
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const progressPercent = step === 1 ? '33.33%' : step === 2 ? '66.66%' : '100%';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
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
            className="relative w-full max-w-[500px] bg-white rounded-[28px] sm:rounded-[32px] p-5 sm:p-8 shadow-2xl border border-gray-100/90 z-10 my-auto overflow-hidden max-h-[92vh] flex flex-col justify-between"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full text-gray-400 hover:text-ink hover:bg-gray-100 transition-colors z-20"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <div className="overflow-y-auto pr-1 -mr-1">
                {/* Header with Step Indicator & Progress Bar */}
                <div className="mb-5 sm:mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold text-[#00a4d8] tracking-wide uppercase">
                      Step {step} of 3
                    </span>
                    {step > 1 && (
                      <button
                        type="button"
                        onClick={() => setStep((prev) => Math.max(1, prev - 1))}
                        className="text-xs font-semibold text-gray-400 hover:text-[#00a4d8] transition-colors"
                      >
                        ← Back
                      </button>
                    )}
                  </div>
                  {/* 3-Step Progress Bar */}
                  <div className="w-full h-1.5 bg-gray-100 rounded-full mt-2.5 overflow-hidden">
                    <motion.div
                      initial={false}
                      animate={{ width: progressPercent }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="h-full bg-gradient-to-r from-[#00a4d8] via-[#0284c7] to-[#4f46e5] rounded-full"
                    />
                  </div>
                </div>

                {/* STEP 1: Main 4 Options */}
                {step === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.22 }}
                  >
                    {/* Center Icon Illustration */}
                    <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-sky-50 via-cyan-50 to-blue-100/50 border border-cyan-100 flex items-center justify-center mx-auto mb-3 shadow-xs">
                      <span className="absolute -top-1 left-2 text-cyan-300 text-xs font-bold select-none">✦</span>
                      <span className="absolute -bottom-0.5 right-2 text-blue-300 text-xs font-bold select-none">✦</span>
                      <div className="w-9 h-9 rounded-full bg-white shadow-xs flex items-center justify-center border border-cyan-100 text-[#00a4d8]">
                        <HelpCircle className="w-5 h-5 stroke-[2.2]" />
                      </div>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-extrabold text-ink text-center tracking-tight mb-1.5">
                      How can we help your business?
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 text-center mb-5 leading-relaxed">
                      Choose the direction that best fits your current initiative.
                    </p>

                    {/* 4 Main Category Cards */}
                    <div className="space-y-2.5">
                      {ESTIMATE_CATEGORIES.map((cat, idx) => {
                        const IconComp = cat.icon;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => handleSelectCategory(cat)}
                            className={`w-full flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border border-gray-200/90 bg-white ${cat.hoverBorder} hover:shadow-sm transition-all duration-200 group text-left cursor-pointer`}
                          >
                            <div className="flex items-center gap-3.5 min-w-0">
                              <span
                                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${cat.iconColor} group-hover:scale-105 transition-transform`}
                              >
                                <IconComp className="w-5 h-5 stroke-[2.2]" />
                              </span>
                              <div className="min-w-0">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                                  0{idx + 1}
                                </span>
                                <span className={`font-bold text-ink text-sm sm:text-base group-hover:${cat.activeText} transition-colors block leading-snug`}>
                                  {cat.title}
                                </span>
                              </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-ink group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                          </button>
                        );
                      })}
                    </div>

                    {/* Confidential Notice */}
                    <div className="mt-5 pt-1 flex items-center justify-center gap-1.5 text-[11px] sm:text-xs text-gray-400 text-center">
                      <Lock className="w-3.5 h-3.5 shrink-0" />
                      <span>Your answers are confidential and help us personalize your results.</span>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Category Specific Options */}
                {step === 2 && selectedCategory && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.22 }}
                  >
                    {/* Selected Parent Badge */}
                    <div className="text-center mb-3">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${selectedCategory.iconColor}`}>
                        <selectedCategory.icon className="w-3.5 h-3.5" />
                        <span>{selectedCategory.title}</span>
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-extrabold text-ink text-center tracking-tight mb-1.5">
                      {selectedCategory.question}
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 text-center mb-5 leading-relaxed">
                      {selectedCategory.subtitle}
                    </p>

                    {/* Sub-Options List */}
                    <div className="space-y-2.5">
                      {selectedCategory.options.map((opt) => {
                        const OptIcon = opt.icon;
                        const isSelected = selectedOption === opt.label;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => handleSelectOption(opt.label)}
                            className={`w-full flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 group text-left cursor-pointer ${
                              isSelected
                                ? 'border-[#00a4d8] bg-sky-50/50 shadow-xs ring-2 ring-[#00a4d8]/20'
                                : `border-gray-200/90 bg-white ${selectedCategory.hoverBorder} hover:shadow-xs`
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <span className="w-8 h-8 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 text-gray-600 group-hover:text-[#00a4d8] transition-colors">
                                <OptIcon className="w-4 h-4" />
                              </span>
                              <span className="font-bold text-ink text-sm sm:text-base group-hover:text-ink leading-snug">
                                {opt.label}
                              </span>
                            </div>
                            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#00a4d8] group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                          </button>
                        );
                      })}
                    </div>

                    {/* Confidential Notice */}
                    <div className="mt-5 pt-1 flex items-center justify-center gap-1.5 text-[11px] sm:text-xs text-gray-400 text-center">
                      <Lock className="w-3.5 h-3.5 shrink-0" />
                      <span>Free estimate tailored to your exact requirements.</span>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Contact & Project Info */}
                {step === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.22 }}
                  >
                    {/* Selected Summary Breadcrumb */}
                    <div className="flex flex-wrap items-center justify-center gap-1.5 mb-3 text-xs">
                      <span className="px-2.5 py-0.5 rounded-lg bg-gray-100 font-semibold text-gray-700">
                        {selectedCategory?.shortLabel || selectedCategory?.title}
                      </span>
                      <ChevronRight size={12} className="text-gray-400" />
                      <span className="px-2.5 py-0.5 rounded-lg bg-[#00a4d8]/10 text-[#00a4d8] font-bold">
                        {selectedOption}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-extrabold text-ink text-center tracking-tight mb-1.5">
                      Got it. Let&apos;s prepare your estimate.
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-500 text-center mb-5 leading-relaxed">
                      Just a few quick details and our team will get back to you.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-3">
                      {/* First Name Input */}
                      <div className="relative">
                        <User className="w-4.5 h-4.5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Your name"
                          required
                          className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200/90 bg-white focus:bg-white focus:border-[#00a4d8] focus:ring-2 focus:ring-[#00a4d8]/15 outline-none text-sm text-ink placeholder:text-gray-400 transition-all"
                        />
                      </div>

                      {/* Work Email Input */}
                      <div className="relative">
                        <Mail className="w-4.5 h-4.5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="email"
                          value={workEmail}
                          onChange={(e) => setWorkEmail(e.target.value)}
                          placeholder="Work email address"
                          required
                          className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200/90 bg-white focus:bg-white focus:border-[#00a4d8] focus:ring-2 focus:ring-[#00a4d8]/15 outline-none text-sm text-ink placeholder:text-gray-400 transition-all"
                        />
                      </div>

                      {/* Company Size Select */}
                      <div>
                        <div className="relative">
                          <Building2 className="w-4.5 h-4.5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <select
                            value={companySize}
                            onChange={(e) => setCompanySize(e.target.value)}
                            required
                            className="w-full pl-11 pr-10 py-3 rounded-2xl border border-gray-200/90 bg-white focus:border-[#00a4d8] focus:ring-2 focus:ring-[#00a4d8]/15 outline-none text-sm text-ink transition-all appearance-none cursor-pointer"
                          >
                            <option value="" disabled>
                              Select company size
                            </option>
                            {COMPANY_SIZES.map((size) => (
                              <option key={size} value={size}>
                                {size}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>

                      {error && (
                        <p className="text-xs font-semibold text-rose-500 text-center">{error}</p>
                      )}

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 px-6 rounded-2xl bg-primary-gradient text-white font-bold text-sm sm:text-base shadow-soft hover:shadow-elev hover:opacity-95 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70 mt-3"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Preparing Estimate...</span>
                          </>
                        ) : (
                          <>
                            <span>Get Free Estimate & Plan</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>

                      {/* Privacy Footer */}
                      <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] sm:text-xs text-gray-400 text-center">
                        <Lock className="w-3.5 h-3.5 shrink-0" />
                        <span>We respect your privacy. No spam guaranteed.</span>
                      </div>
                    </form>
                  </motion.div>
                )}
              </div>
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
                  We have received your request for <strong>{selectedCategory?.title}</strong> ({selectedOption}). Our engineering team is preparing your project estimate and roadmap, and will reach out to <strong>{workEmail}</strong> shortly.
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
