import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, Mail } from 'lucide-react';
import ServiceInquiryForm from '../components/ServiceInquiryForm';
import CtaBanner from '../components/CtaBanner';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';

const highlights = [
  { icon: Shield, title: 'Data protection', body: 'We collect only what we need to deliver services and respond to inquiries.' },
  { icon: Lock, title: 'Secure handling', body: 'Access is limited to authorized team members with a legitimate need.' },
  { icon: Eye, title: 'Transparency', body: 'You can ask what we hold about you and request corrections or deletion where applicable.' },
  { icon: Mail, title: 'Contact', body: 'Privacy questions can be sent to our team via the form below or Contact page.' },
];

const sections = [
  {
    title: '1. Who we are',
    body: 'Cubixsol provides software development, digital products, and related consulting services. This Privacy Policy explains how we handle personal information when you use our website, contact us, or engage our services.',
  },
  {
    title: '2. Information we collect',
    body: 'We may collect identity and contact details (such as name, email, phone, company), project information you share in forms, technical data (IP address, browser type, device), and usage data from analytics tools if enabled. We do not knowingly collect data from children under 16.',
  },
  {
    title: '3. How we use information',
    body: 'We use information to respond to inquiries, deliver and improve services, send relevant project updates you request, maintain security, and meet legal obligations. We do not sell your personal information.',
  },
  {
    title: '4. Legal bases',
    body: 'Where applicable, we process data based on contract performance, legitimate interests (such as improving our site and securing systems), consent (for optional marketing), and legal requirements.',
  },
  {
    title: '5. Sharing',
    body: 'We may share data with trusted processors (hosting, email, analytics) under agreements that protect your information, or when required by law. We do not authorize third parties to use your data for their own unrelated marketing.',
  },
  {
    title: '6. Retention',
    body: 'We keep personal data only as long as needed for the purposes described, including legal, accounting, or reporting requirements, then delete or anonymize it where feasible.',
  },
  {
    title: '7. Your rights',
    body: 'Depending on your location, you may have rights to access, correct, delete, restrict, or object to certain processing, and to withdraw consent. Contact us to exercise these rights. You may also lodge a complaint with a supervisory authority where applicable.',
  },
  {
    title: '8. Cookies',
    body: 'Our site may use essential cookies for functionality and optional analytics cookies to understand traffic. You can control cookies through your browser settings.',
  },
  {
    title: '9. International transfers',
    body: 'If data is processed outside your country, we take steps designed to provide appropriate safeguards consistent with applicable law.',
  },
  {
    title: '10. Updates',
    body: 'We may update this policy from time to time. The “Last updated” date at the top will change when we do. Continued use of the site after updates constitutes acceptance of the revised policy where permitted by law.',
  },
];

export default function Privacy() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-violet-50/40 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <Reveal scale className="max-w-2xl">
            <p className="eyebrow mb-3">Legal</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-2">
              How Cubixsol collects, uses, and protects personal information.
            </p>
            <p className="text-sm text-gray-400">Last updated: August 12, 2026</p>
          </Reveal>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12" staggerDelay={0.06}>
          {highlights.map((h) => {
            const Icon = h.icon;
            return (
              <StaggerItem key={h.title} hover>
                <div className="h-full rounded-2xl border border-gray-100 bg-gray-50/60 p-5">
                  <span className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </span>
                  <h2 className="font-bold text-ink text-sm mb-1">{h.title}</h2>
                  <p className="text-xs text-gray-500 leading-relaxed">{h.body}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        <div className="max-w-3xl mx-auto space-y-8">
          {sections.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.03}>
              <article className="rounded-2xl border border-gray-100 bg-white p-5 sm:p-6 shadow-card">
                <h2 className="text-lg font-extrabold text-ink mb-2">{s.title}</h2>
                <p className="text-sm text-gray-500 leading-relaxed">{s.body}</p>
              </article>
            </Reveal>
          ))}
          <Reveal>
            <p className="text-sm text-gray-500">
              Related:{' '}
              <Link to="/terms" className="font-semibold text-primary-600 hover:underline">
                Terms &amp; Conditions
              </Link>
              {' · '}
              <Link to="/contact" className="font-semibold text-primary-600 hover:underline">
                Contact Us
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      <div id="inquiry">
        <ServiceInquiryForm defaultService="Privacy inquiry" />
      </div>
      <CtaBanner />
    </div>
  );
}
