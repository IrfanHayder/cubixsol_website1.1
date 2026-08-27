import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import Reveal from './Reveal';
import { useServices } from '../context/ServicesContext';

const budgets = [
  'Under $5,000',
  '$5,000 – $15,000',
  '$15,000 – $50,000',
  '$50,000+',
  'Not sure yet',
];

export default function ServiceInquiryForm({ defaultService = '' }) {
  const { services } = useServices();
  const [form, setForm] = useState({
    name: '',
    email: '',
    service: defaultService,
    phone: '',
    message: '',
    budget: '',
    nda: false,
  });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = 'Required';
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Valid email required';
    if (!form.message.trim()) errs.message = 'Required';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSent(true);
    setForm({
      name: '',
      email: '',
      service: defaultService,
      phone: '',
      message: '',
      budget: '',
      nda: false,
    });
  };

  const field =
    'w-full bg-transparent border-0 border-b border-gray-200 focus:border-primary-500 focus:ring-0 outline-none py-2.5 text-sm text-ink placeholder:text-gray-400 transition';

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden shadow-elev border border-gray-100">
          {/* Left visual */}
          <Reveal direction="right" className="relative min-h-[280px] lg:min-h-full bg-primary-gradient p-8 sm:p-12 flex flex-col justify-center">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%]">
                {[1, 2, 3, 4].map((r) => (
                  <div
                    key={r}
                    className="absolute inset-0 rounded-full border border-white/25"
                    style={{ margin: `${r * 8}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-3">
                Have questions? Let&apos;s talk.
              </h2>
              <p className="text-white/80 text-sm sm:text-base max-w-sm">
                Tell us about your project. We typically respond within 24 business hours with a clear next step.
              </p>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal direction="left" delay={0.08} className="bg-white p-6 sm:p-10 lg:p-12">
            {sent && (
              <div className="mb-6 flex items-center gap-2 bg-emerald-50 text-emerald-700 text-sm font-medium px-4 py-3 rounded-xl">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                Thanks — we&apos;ll be in touch soon.
              </div>
            )}
            <form onSubmit={submit} className="space-y-6" noValidate>
              <div className="grid sm:grid-cols-2 gap-6">
                <label className="block">
                  <span className="text-xs font-semibold text-gray-500">Your name *</span>
                  <input
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    className={field}
                    placeholder="Full name"
                  />
                  {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
                </label>
                <label className="block">
                  <span className="text-xs font-semibold text-gray-500">Your email *</span>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    className={field}
                    placeholder="you@company.com"
                  />
                  {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
                </label>
              </div>

              <label className="block">
                <span className="text-xs font-semibold text-gray-500">Service</span>
                <select name="service" value={form.service} onChange={onChange} className={field + ' cursor-pointer'}>
                  <option value="">Select a service...</option>
                  {services.map((s) => (
                    <option key={s.slug} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="text-xs font-semibold text-gray-500">Phone</span>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  className={field}
                  placeholder="+92 3xx xxxxxxx"
                />
              </label>

              <label className="block">
                <span className="text-xs font-semibold text-gray-500">Please describe your project *</span>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  rows={3}
                  className={field + ' resize-none'}
                  placeholder="Goals, timeline, anything useful..."
                />
                {errors.message && <span className="text-xs text-red-500">{errors.message}</span>}
              </label>

              <label className="block">
                <span className="text-xs font-semibold text-gray-500">What is your budget?</span>
                <select name="budget" value={form.budget} onChange={onChange} className={field + ' cursor-pointer'}>
                  <option value="">Select budget range...</option>
                  {budgets.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  name="nda"
                  checked={form.nda}
                  onChange={onChange}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                Request NDA
              </label>

              <button type="submit" className="btn-primary">
                Book a free discovery call <Send className="w-4 h-4" />
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
