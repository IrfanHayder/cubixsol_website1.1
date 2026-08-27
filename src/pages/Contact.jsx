import { useState } from 'react';
import {
  Send, MapPin, Mail, Phone, Clock, Zap, Users2, ShieldCheck, Plus, Minus, CheckCircle2, MailPlus,
} from 'lucide-react';
import { faqs } from '../data/content';
import Breadcrumb from '../components/Breadcrumb';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';

const initialForm = { name: '', email: '', phone: '', service: '', subject: '', message: '' };

const serviceOptions = [
  'Web Development',
  'Laravel Development',
  'Mobile App Development',
  'AI Development',
  'Cloud Solutions',
  'UI/UX Design',
  'E-Commerce Solutions',
  'Digital Marketing',
  'Other / Not sure',
];

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Full name is required.';
    if (!form.email.trim()) errs.email = 'Email address is required.';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Enter a valid email address.';
    if (!form.service) errs.service = 'Please select a service.';
    if (!form.subject.trim()) errs.subject = 'Subject is required.';
    if (!form.message.trim()) errs.message = 'Message is required.';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
      setForm(initialForm);
    }
  };

  return (
    <div>
      <Breadcrumb current="Contact Us" />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 grid lg:grid-cols-2 gap-10">
        <Reveal direction="right">
          <p className="eyebrow mb-3">Get In Touch</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-ink mb-5">
            Let's Build Something <span className="bg-clip-text text-transparent bg-primary-gradient">Amazing Together</span>
          </h1>
          <p className="text-gray-500 mb-8">
            Have a project in mind or need expert advice? We'd love to hear from you. Fill out the form and our team will get back to you as soon as possible.
          </p>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              [Clock, 'Quick Response', 'We reply within 24 hours'],
              [Users2, 'Expert Support', 'Get help from our experienced team'],
              [ShieldCheck, 'Trusted Partner', 'Your success is our priority'],
            ].map(([Icon, title, desc]) => (
              <div key={title} className="flex flex-col gap-2">
                <span className="w-9 h-9 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center">
                  <Icon className="w-4.5 h-4.5" />
                </span>
                <p className="text-xs font-bold text-ink">{title}</p>
                <p className="text-xs text-gray-500 leading-snug">{desc}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal direction="left" delay={0.1} className="card">
          <h2 className="font-bold text-lg text-ink mb-5">Send Us a Message</h2>
          {submitted && (
            <div className="mb-5 flex items-center gap-2 bg-emerald-50 text-emerald-700 text-sm font-medium px-4 py-3 rounded-lg">
              <CheckCircle2 className="w-4 h-4 shrink-0" /> Thanks! Your message has been sent — we'll be in touch within 24 hours.
            </div>
          )}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full Name" required error={errors.name}>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Enter your full name"
                  className={inputClass(errors.name)} />
              </Field>
              <Field label="Email Address" required error={errors.email}>
                <input name="email" value={form.email} onChange={handleChange} placeholder="Enter your email"
                  className={inputClass(errors.email)} />
              </Field>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Phone Number" error={errors.phone}>
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="Enter your phone number"
                  className={inputClass(errors.phone)} />
              </Field>
              <Field label="Subject" required error={errors.subject}>
                <input name="subject" value={form.subject} onChange={handleChange} placeholder="What is this regarding?"
                  className={inputClass(errors.subject)} />
              </Field>
            </div>
            <Field label="Which service are you interested in?" required error={errors.service}>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className={inputClass(errors.service) + (form.service ? '' : ' text-gray-400')}
              >
                <option value="">Select a service...</option>
                {serviceOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>
            <Field label="Message" required error={errors.message}>
              <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Tell us about your project or inquiry..."
                className={inputClass(errors.message)} />
            </Field>
            <button type="submit" className="btn-primary w-full justify-center">
              Send Message <Send className="w-4 h-4" />
            </button>
            <p className="text-xs text-gray-400 text-center flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> We respect your privacy. Your information is safe with us.
            </p>
          </form>
        </Reveal>
      </section>

      {/* CONTACT INFO + MAP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 grid lg:grid-cols-2 gap-10">
        <Reveal direction="right">
          <h2 className="text-2xl font-extrabold text-ink mb-1">We're Here to Help</h2>
          <p className="text-gray-500 mb-6">Choose the best way to reach us. Our team is always ready to assist you.</p>
          <Stagger className="grid sm:grid-cols-2 gap-5" staggerDelay={0.08}>
            {[
              [MapPin, 'Our Location', '123 Innovation Drive, Suite 501\nNew York, NY 10001, USA'],
              [Mail, 'Email Us', 'hello@cubixsol.com\ninfo@cubixsol.com'],
              [Phone, 'Call Us', '+1 (212) 123-4567\n+1 (212) 987-6543'],
              [Clock, 'Working Hours', 'Mon - Fri: 9:00 AM - 6:00 PM\nSaturday - Sunday: Closed'],
            ].map(([Icon, title, desc]) => (
              <StaggerItem key={title}>
                <div className="card !p-5 h-full hover:-translate-y-1 hover:shadow-soft transition-all duration-300">
                  <span className="w-9 h-9 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center mb-3">
                    <Icon className="w-4.5 h-4.5" />
                  </span>
                  <p className="font-bold text-sm text-ink mb-1">{title}</p>
                  <p className="text-xs text-gray-500 whitespace-pre-line leading-relaxed">{desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Reveal>
        <Reveal direction="left" delay={0.1} className="rounded-2xl overflow-hidden border border-gray-100 shadow-card h-full min-h-[320px] bg-gray-100 relative">
          <iframe
            title="Cubixsol location map"
            className="w-full h-full min-h-[320px]"
            loading="lazy"
            src="https://maps.google.com/maps?q=New%20York%2C%20NY&t=&z=13&ie=UTF8&iwloc=&output=embed"
          />
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
          <Reveal direction="right">
            <p className="eyebrow mb-3">Have Questions?</p>
            <h2 className="text-3xl font-extrabold text-ink mb-6">Frequently Asked Questions</h2>
            <Stagger className="space-y-3" staggerDelay={0.06}>
              {faqs.map((f, i) => (
                <StaggerItem key={f.q}>
                <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <span className={`text-sm font-semibold ${openFaq === i ? 'text-primary-600' : 'text-ink'}`}>{f.q}</span>
                    {openFaq === i ? <Minus className="w-4 h-4 text-primary-600 shrink-0" /> : <Plus className="w-4 h-4 text-gray-400 shrink-0" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 text-sm text-gray-500 leading-relaxed">{f.a}</div>
                  )}
                </div>
                </StaggerItem>
              ))}
            </Stagger>
          </Reveal>
          <Reveal direction="left" delay={0.1} className="card text-center py-12">
            <span className="w-16 h-16 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mx-auto mb-5">
              <MailPlus className="w-8 h-8" />
            </span>
            <h3 className="text-xl font-extrabold text-ink mb-2">Ready to Start Your Project?</h3>
            <p className="text-gray-500 text-sm mb-6">Let's discuss how we can help bring your ideas to life.</p>
            <a href="#top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="btn-primary inline-flex">
              Get a Free Consultation <Send className="w-4 h-4" />
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function Field({ label, required, error, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-ink mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      {children}
      {error && <span className="block text-xs text-red-500 mt-1">{error}</span>}
    </label>
  );
}

function inputClass(error) {
  return `w-full px-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:ring-2 transition ${
    error ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:ring-primary-300'
  }`;
}
