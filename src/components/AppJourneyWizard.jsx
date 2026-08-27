import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Quote } from 'lucide-react';
import Reveal from './Reveal';

const STEPS = [
  'App Type',
  'Define Functionality',
  'Target User Base and Monetization',
  'App Version and Platform',
  'Design and Timeline',
  'Contact Information',
];

const APP_TYPES = [
  'Finance (Banking, Lending, Insurance, etc.)',
  'Travel (Booking, Ticketing, Scheduling, etc.)',
  'Social Networking',
  'On-demand Service Marketplace App',
  'AI Assistant App',
  'Healthcare (Telemedicine, Patient Management, Wellness, etc.)',
  'IoT (Device Control / Monitoring Apps)',
  'Corporate App (Productivity, BI, Field Service, Partner App, etc.)',
  'E-commerce (Store, E-catalogue, Marketplace, etc.)',
  'Communication (Messenger, VoIP, etc.)',
  'Education (Mobile Learning, Training App, etc.)',
  'On-demand Transportation App',
  'Other',
];

const CORE_FEATURES = [
  'User accounts & authentication',
  'Search & discovery',
  'Bookings / scheduling',
  'Payments & checkout',
  'Push notifications',
  'In-app chat / support',
  'Reviews & ratings',
  'Analytics & reporting',
  'Admin / vendor panel needs',
  'Maps & location',
  'Multilingual support',
  'Other',
];

const EXTRA_FEATURES = [
  'Real-time updates',
  'Subscriptions / memberships',
  'Loyalty & discounts',
  'Offline mode',
  'Biometric login',
  'Social login',
  'Third-party API integrations',
  'Advanced analytics',
  'CMS-driven content',
  'Other',
];

const USER_BASE = [
  '1–100 users',
  '100–1,000 users',
  '1,000–10,000 users',
  '10,000–100,000 users',
  '100,000–500,000 users',
  '500,000–1,000,000 users',
  'Over 1,000,000 users',
];

const MONETIZATION = [
  "I don't plan to monetize my app",
  'Ads',
  'Subscription',
  'Percent from transaction cost',
  'Paid installation',
  'Freemium (optional in-app purchases)',
  'Other',
];

const APP_VERSION = [
  'MVP now, a full release version later',
  'MVP only',
  'A full-release version',
];

const PLATFORMS = ['Both iOS and Android', 'iOS', 'Android'];

const DEV_OPTIONS = [
  'I need consultation on native vs. cross-platform',
  'Cross-platform (one app for iOS and Android)',
  'Native iOS and native Android apps',
  'Native iOS only',
  'Native Android only',
];

const HAS_WEB = [
  'Yes, but I plan to update it soon',
  'Yes, it is fully updated',
  'No, and I need help creating one',
  "No, and I don't plan to have one in the near future",
];

const BACKEND = [
  'Yes',
  'No, I want a separate back end for my mobile app',
  'I want Cubixsol to guide me',
];

const UX_STATUS = [
  'Yes',
  "No, but I'm planning to contact a dedicated design agency",
  "No, I'll need assistance with the design",
];

const DEADLINE = [
  '1–3 months',
  '3–6 months',
  '6–12 months',
  '12+ months',
  "No, I don't",
];

const BUDGETS = [
  'Under $5,000',
  '$5,000 – $15,000',
  '$15,000 – $50,000',
  '$50,000 – $100,000',
  '$100,000+',
  'Not sure yet',
];

const initial = {
  appType: '',
  coreFeatures: [],
  extraFeatures: [],
  userBase: '',
  monetization: '',
  appVersion: '',
  platforms: '',
  devOption: '',
  hasWeb: '',
  backend: '',
  uxStatus: '',
  deadline: '',
  name: '',
  company: '',
  phone: '',
  email: '',
  budget: '',
};

function RadioGroup({ name, options, value, onChange }) {
  return (
    <div className="space-y-2.5">
      {options.map((opt) => (
        <label key={opt} className="flex items-start gap-2.5 cursor-pointer group">
          <input
            type="radio"
            name={name}
            checked={value === opt}
            onChange={() => onChange(opt)}
            className="mt-1 text-primary-600 focus:ring-primary-500 border-gray-300"
          />
          <span className="text-sm text-gray-600 group-hover:text-ink transition">{opt}</span>
        </label>
      ))}
    </div>
  );
}

function CheckGroup({ options, values, onToggle }) {
  return (
    <div className="space-y-2.5">
      {options.map((opt) => (
        <label key={opt} className="flex items-start gap-2.5 cursor-pointer group">
          <input
            type="checkbox"
            checked={values.includes(opt)}
            onChange={() => onToggle(opt)}
            className="mt-1 rounded text-primary-600 focus:ring-primary-500 border-gray-300"
          />
          <span className="text-sm text-gray-600 group-hover:text-ink transition">{opt}</span>
        </label>
      ))}
    </div>
  );
}

/**
 * Multi-step app discovery wizard for Mobile / iOS / Android service pages.
 */
export default function AppJourneyWizard({ serviceTitle = 'Mobile App Development' }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(initial);
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  const shortName = useMemo(() => {
    if (/ios/i.test(serviceTitle)) return 'iOS App Development';
    if (/android/i.test(serviceTitle)) return 'Android App Development';
    return 'Mobile App Development';
  }, [serviceTitle]);

  const setField = (key, value) => setData((d) => ({ ...d, [key]: value }));

  const toggleArr = (key, opt) => {
    setData((d) => {
      const arr = d[key];
      return {
        ...d,
        [key]: arr.includes(opt) ? arr.filter((x) => x !== opt) : [...arr, opt],
      };
    });
  };

  const validateStep = () => {
    const e = {};
    if (step === 0 && !data.appType) e.appType = 'Please select an app type';
    if (step === 1 && data.coreFeatures.length === 0 && data.extraFeatures.length === 0) {
      e.features = 'Select at least one feature';
    }
    if (step === 2) {
      if (!data.userBase) e.userBase = 'Please select target user base';
      if (!data.monetization) e.monetization = 'Please select monetization strategy';
    }
    if (step === 3) {
      if (!data.appVersion) e.appVersion = 'Please select app version';
      if (!data.platforms) e.platforms = 'Please select platform';
      if (!data.devOption) e.devOption = 'Please select development option';
      if (!data.hasWeb) e.hasWeb = 'Please select an option';
      if (!data.backend) e.backend = 'Please select an option';
    }
    if (step === 4) {
      if (!data.uxStatus) e.uxStatus = 'Please select UX/UI status';
      if (!data.deadline) e.deadline = 'Please select a timeline';
    }
    if (step === 5) {
      if (!data.name.trim()) e.name = 'Required';
      if (!data.company.trim()) e.company = 'Required';
      if (!data.phone.trim()) e.phone = 'Required';
      if (!data.email.trim() || !/^\S+@\S+\.\S+$/.test(data.email)) e.email = 'Valid email required';
      if (!data.budget) e.budget = 'Required';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const canProceed = (() => {
    if (step === 0) return !!data.appType;
    if (step === 1) return data.coreFeatures.length > 0 || data.extraFeatures.length > 0;
    if (step === 2) return !!data.userBase && !!data.monetization;
    if (step === 3)
      return (
        !!data.appVersion &&
        !!data.platforms &&
        !!data.devOption &&
        !!data.hasWeb &&
        !!data.backend
      );
    if (step === 4) return !!data.uxStatus && !!data.deadline;
    if (step === 5)
      return (
        !!data.name.trim() &&
        !!data.company.trim() &&
        !!data.phone.trim() &&
        /^\S+@\S+\.\S+$/.test(data.email) &&
        !!data.budget
      );
    return true;
  })();

  const next = () => {
    if (!validateStep()) return;
    if (step < STEPS.length - 1) setStep((s) => s + 1);
    else {
      setDone(true);
    }
  };

  const back = () => setStep((s) => Math.max(0, s - 1));
  const skip = () => setStep((s) => Math.min(STEPS.length - 1, s + 1));

  const field =
    'w-full bg-transparent border-0 border-b border-gray-200 focus:border-primary-500 focus:ring-0 outline-none py-2.5 text-sm text-ink placeholder:text-gray-400 transition';

  return (
    <section className="py-14 lg:py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-3">
            Start your{' '}
            <span className="bg-clip-text text-transparent bg-primary-gradient">{shortName}</span>{' '}
            Journey
          </h2>
          <p className="text-sm sm:text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Complete the form below to help us understand your app requirements. This enables us to
            provide a tailored solution that meets your specific needs.
          </p>
        </Reveal>

        {/* Stepper — no horizontal scrollbar */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center justify-between gap-0 max-w-2xl mx-auto px-1">
            {STEPS.map((label, i) => (
              <div key={label} className="flex items-center flex-1 last:flex-none">
                <button
                  type="button"
                  onClick={() => i < step && setStep(i)}
                  className="flex flex-col items-center gap-1"
                  title={label}
                >
                  <span
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition ${
                      i < step
                        ? 'bg-primary-gradient text-white border-transparent'
                        : i === step
                          ? 'border-primary-500 text-primary-600 bg-primary-50'
                          : 'border-gray-200 text-gray-400 bg-white'
                    }`}
                  >
                    {i < step ? <Check className="w-3.5 h-3.5" /> : i + 1}
                  </span>
                  <span
                    className={`hidden sm:block text-[10px] font-semibold text-center leading-tight max-w-[4.5rem] ${
                      i <= step ? 'text-primary-600' : 'text-gray-400'
                    }`}
                  >
                    {label.split(' ')[0]}
                  </span>
                </button>
                {i < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-1 sm:mx-2 rounded-full ${
                      i < step ? 'bg-primary-400' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-400 mt-3 sm:hidden">
            Step {step + 1} of {STEPS.length}: {STEPS[step]}
          </p>
        </div>

        <Reveal>
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-card p-5 sm:p-8 lg:p-10">
            {done ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-extrabold text-ink mb-2">Thank you!</h3>
                <p className="text-gray-500 text-sm max-w-md mx-auto mb-6">
                  We received your {shortName.toLowerCase()} brief. Our team will review it and get
                  back to you within one business day.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setDone(false);
                    setStep(0);
                    setData(initial);
                  }}
                  className="btn-outline"
                >
                  Submit another brief
                </button>
              </div>
            ) : (
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.28 }}
                  >
                    {/* STEP 0 — App type */}
                    {step === 0 && (
                      <div className="grid lg:grid-cols-2 gap-8 items-start">
                        <div>
                          <label className="block text-sm font-bold text-ink mb-3">
                            Select App Type:
                          </label>
                          <select
                            value={data.appType}
                            onChange={(e) => setField('appType', e.target.value)}
                            className={field + ' cursor-pointer'}
                          >
                            <option value="">Select the Type of App You Want</option>
                            {APP_TYPES.map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                          {errors.appType && (
                            <p className="text-xs text-red-500 mt-2">{errors.appType}</p>
                          )}
                        </div>
                        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gray-100 hidden sm:block">
                          <img
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=70"
                            alt=""
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur rounded-xl p-3 shadow-card">
                            <div className="flex gap-2 items-start">
                              <Quote className="w-4 h-4 text-primary-500 shrink-0 mt-0.5" />
                              <div>
                                <p className="text-xs text-gray-600 leading-relaxed">
                                  Cubixsol helps teams turn product ideas into shipped mobile
                                  experiences — clear process, solid engineering, and honest timelines.
                                </p>
                                <p className="text-[11px] font-bold text-ink mt-1.5">Cubixsol team</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 1 — Features */}
                    {step === 1 && (
                      <div>
                        <div className="grid sm:grid-cols-2 gap-8">
                          <div>
                            <h3 className="text-sm font-bold text-ink mb-4">
                              Select the core functionalities you want:
                            </h3>
                            <CheckGroup
                              options={CORE_FEATURES}
                              values={data.coreFeatures}
                              onToggle={(o) => toggleArr('coreFeatures', o)}
                            />
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-ink mb-4">
                              Select any additional features:
                            </h3>
                            <CheckGroup
                              options={EXTRA_FEATURES}
                              values={data.extraFeatures}
                              onToggle={(o) => toggleArr('extraFeatures', o)}
                            />
                          </div>
                        </div>
                        {errors.features && (
                          <p className="text-xs text-red-500 mt-4">{errors.features}</p>
                        )}
                      </div>
                    )}

                    {/* STEP 2 — Users & monetization */}
                    {step === 2 && (
                      <div className="grid sm:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-sm font-bold text-ink mb-4">
                            How large is your target user base?
                          </h3>
                          <RadioGroup
                            name="userBase"
                            options={USER_BASE}
                            value={data.userBase}
                            onChange={(v) => setField('userBase', v)}
                          />
                          {errors.userBase && (
                            <p className="text-xs text-red-500 mt-2">{errors.userBase}</p>
                          )}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-ink mb-4">
                            What is your planned monetization strategy?
                          </h3>
                          <RadioGroup
                            name="monetization"
                            options={MONETIZATION}
                            value={data.monetization}
                            onChange={(v) => setField('monetization', v)}
                          />
                          {errors.monetization && (
                            <p className="text-xs text-red-500 mt-2">{errors.monetization}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* STEP 3 — Version & platform */}
                    {step === 3 && (
                      <div className="grid sm:grid-cols-2 gap-8">
                        <div className="space-y-8">
                          <div>
                            <h3 className="text-sm font-bold text-ink mb-4">
                              Which app version do you need?
                            </h3>
                            <RadioGroup
                              name="appVersion"
                              options={APP_VERSION}
                              value={data.appVersion}
                              onChange={(v) => setField('appVersion', v)}
                            />
                            {errors.appVersion && (
                              <p className="text-xs text-red-500 mt-2">{errors.appVersion}</p>
                            )}
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-ink mb-4">
                              What platforms do you plan to target?
                            </h3>
                            <RadioGroup
                              name="platforms"
                              options={PLATFORMS}
                              value={data.platforms}
                              onChange={(v) => setField('platforms', v)}
                            />
                            {errors.platforms && (
                              <p className="text-xs text-red-500 mt-2">{errors.platforms}</p>
                            )}
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-ink mb-4">
                              What development option are you interested in?
                            </h3>
                            <RadioGroup
                              name="devOption"
                              options={DEV_OPTIONS}
                              value={data.devOption}
                              onChange={(v) => setField('devOption', v)}
                            />
                            {errors.devOption && (
                              <p className="text-xs text-red-500 mt-2">{errors.devOption}</p>
                            )}
                          </div>
                        </div>
                        <div className="space-y-8">
                          <div>
                            <h3 className="text-sm font-bold text-ink mb-4">
                              Do you have a complementing web-based solution?
                            </h3>
                            <RadioGroup
                              name="hasWeb"
                              options={HAS_WEB}
                              value={data.hasWeb}
                              onChange={(v) => setField('hasWeb', v)}
                            />
                            {errors.hasWeb && (
                              <p className="text-xs text-red-500 mt-2">{errors.hasWeb}</p>
                            )}
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-ink mb-4">
                              Do you plan to integrate the mobile app with a backend?
                            </h3>
                            <RadioGroup
                              name="backend"
                              options={BACKEND}
                              value={data.backend}
                              onChange={(v) => setField('backend', v)}
                            />
                            {errors.backend && (
                              <p className="text-xs text-red-500 mt-2">{errors.backend}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* STEP 4 — Design & timeline */}
                    {step === 4 && (
                      <div className="grid sm:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-sm font-bold text-ink mb-4">
                            Do you already have finalized UX and/or UI samples?
                          </h3>
                          <RadioGroup
                            name="uxStatus"
                            options={UX_STATUS}
                            value={data.uxStatus}
                            onChange={(v) => setField('uxStatus', v)}
                          />
                          {errors.uxStatus && (
                            <p className="text-xs text-red-500 mt-2">{errors.uxStatus}</p>
                          )}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-ink mb-4">
                            Do you have a deadline for your project?
                          </h3>
                          <RadioGroup
                            name="deadline"
                            options={DEADLINE}
                            value={data.deadline}
                            onChange={(v) => setField('deadline', v)}
                          />
                          {errors.deadline && (
                            <p className="text-xs text-red-500 mt-2">{errors.deadline}</p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* STEP 5 — Contact */}
                    {step === 5 && (
                      <div>
                        <h3 className="text-sm font-bold text-ink mb-6">
                          Please provide your contact information.
                        </h3>
                        <div className="grid sm:grid-cols-2 gap-6">
                          <label className="block">
                            <span className="text-xs font-semibold text-gray-500">Full Name</span>
                            <input
                              className={field}
                              value={data.name}
                              onChange={(e) => setField('name', e.target.value)}
                              placeholder="Your name"
                            />
                            {errors.name && (
                              <span className="text-xs text-red-500">{errors.name}</span>
                            )}
                          </label>
                          <label className="block">
                            <span className="text-xs font-semibold text-gray-500">Company Name</span>
                            <input
                              className={field}
                              value={data.company}
                              onChange={(e) => setField('company', e.target.value)}
                              placeholder="Company"
                            />
                            {errors.company && (
                              <span className="text-xs text-red-500">{errors.company}</span>
                            )}
                          </label>
                          <label className="block">
                            <span className="text-xs font-semibold text-gray-500">Phone</span>
                            <input
                              className={field}
                              value={data.phone}
                              onChange={(e) => setField('phone', e.target.value)}
                              placeholder="+92 3xx xxxxxxx"
                            />
                            {errors.phone && (
                              <span className="text-xs text-red-500">{errors.phone}</span>
                            )}
                          </label>
                          <label className="block">
                            <span className="text-xs font-semibold text-gray-500">Email</span>
                            <input
                              type="email"
                              className={field}
                              value={data.email}
                              onChange={(e) => setField('email', e.target.value)}
                              placeholder="you@company.com"
                            />
                            {errors.email && (
                              <span className="text-xs text-red-500">{errors.email}</span>
                            )}
                          </label>
                          <label className="block sm:col-span-2">
                            <span className="text-xs font-semibold text-gray-500">
                              What is your budget?
                            </span>
                            <select
                              className={field + ' cursor-pointer'}
                              value={data.budget}
                              onChange={(e) => setField('budget', e.target.value)}
                            >
                              <option value="">Select budget range...</option>
                              {BUDGETS.map((b) => (
                                <option key={b} value={b}>
                                  {b}
                                </option>
                              ))}
                            </select>
                            {errors.budget && (
                              <span className="text-xs text-red-500">{errors.budget}</span>
                            )}
                          </label>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Actions */}
                <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    {step > 0 && (
                      <button
                        type="button"
                        onClick={back}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-ink transition"
                      >
                        <ArrowLeft className="w-4 h-4" /> Back
                      </button>
                    )}
                  </div>
                  <div className="flex gap-2 sm:gap-3 ml-auto">

                    <button
                      type="button"
                      onClick={next}
                      disabled={!canProceed}
                      className={`btn-primary !py-2.5 ${
                        !canProceed ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''
                      }`}
                    >
                      {step === STEPS.length - 1 ? (
                        'Submit'
                      ) : (
                        <>
                          Next <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
