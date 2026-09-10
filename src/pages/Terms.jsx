import { Link } from 'react-router-dom';
import { FileText, Scale, AlertTriangle, Handshake } from 'lucide-react';
import ServiceInquiryForm from '../components/ServiceInquiryForm';
import CtaBanner from '../components/CtaBanner';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';

const highlights = [
  { icon: FileText, title: 'Clear scope', body: 'Project work is defined in proposals or statements of work agreed with you.' },
  { icon: Scale, title: 'Fair use', body: 'You agree to use our site and services lawfully and without harming others.' },
  { icon: Handshake, title: 'IP & delivery', body: 'Ownership of deliverables is set in your contract; portfolio rights may apply as agreed.' },
  { icon: AlertTriangle, title: 'Limits', body: 'Liability and warranties are limited as described below and in your signed agreement.' },
];

const sections = [
  {
    title: '1. Agreement',
    body: 'By accessing the Cubixsol website or engaging our services, you agree to these Terms & Conditions and our Privacy Policy. If you do not agree, please do not use the site or services. Separate written contracts control specific project engagements.',
  },
  {
    title: '2. Services',
    body: 'Cubixsol offers software design, development, products, and consulting. Descriptions on the website are informational. Binding scope, fees, timelines, and acceptance criteria are defined in proposals, statements of work, or contracts signed by both parties.',
  },
  {
    title: '3. Accounts & communication',
    body: 'You are responsible for the accuracy of information you provide. You agree not to misuse forms, spam our team, or attempt unauthorized access to systems or data.',
  },
  {
    title: '4. Intellectual property',
    body: 'Website content, branding, and materials owned by Cubixsol remain our property unless transferred in writing. Client materials you provide remain yours. Custom deliverables ownership follows the applicable contract. You grant us a limited right to showcase non-confidential work in our portfolio unless otherwise agreed.',
  },
  {
    title: '5. Acceptable use',
    body: 'You may not use our site or services to violate law, infringe rights, distribute malware, or interfere with infrastructure. We may suspend access where we reasonably believe terms are breached.',
  },
  {
    title: '6. Third-party services',
    body: 'Our site or products may link to third-party tools. We are not responsible for their content, policies, or availability. Use of third-party services is subject to their terms.',
  },
  {
    title: '7. Warranties & disclaimers',
    body: 'The website is provided “as is” without warranties of uninterrupted or error-free operation. Project warranties, if any, are only those expressly stated in your signed agreement.',
  },
  {
    title: '8. Limitation of liability',
    body: 'To the maximum extent permitted by law, Cubixsol is not liable for indirect, incidental, special, or consequential damages arising from use of the site or services. Total liability for website use is limited as allowed by law; project liability is governed by the relevant contract.',
  },
  {
    title: '9. Indemnity',
    body: 'You agree to indemnify Cubixsol against claims arising from your misuse of the site, your content, or your breach of these terms, except to the extent caused by our proven negligence or willful misconduct.',
  },
  {
    title: '10. Governing law',
    body: 'These terms are governed by the laws applicable to Cubixsol’s principal place of business, without regard to conflict-of-law rules, unless your contract specifies otherwise. Courts of competent jurisdiction in that venue shall have exclusive jurisdiction, subject to mandatory consumer protections where they apply.',
  },
  {
    title: '11. Changes',
    body: 'We may update these Terms periodically. The “Last updated” date will change when we do. Material changes to active paid contracts require agreement as set out in that contract.',
  },
  {
    title: '12. Contact',
    body: 'Questions about these Terms can be sent via the inquiry form below or our Contact page.',
  },
];

export default function Terms() {
  return (
    <div className="bg-white">
      <section className="relative overflow-hidden border-b border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 via-white to-primary-50 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <Reveal scale className="max-w-2xl">
            <p className="eyebrow mb-3">Legal</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4">
              Terms &amp; Conditions
            </h1>
            <p className="text-gray-500 text-base sm:text-lg leading-relaxed mb-2">
              The rules that apply when you use Cubixsol’s website and services.
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
              <Link to="/privacy" className="font-semibold text-primary-600 hover:underline">
                Privacy Policy
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
        <ServiceInquiryForm defaultService="Terms inquiry" />
      </div>
      <CtaBanner />
    </div>
  );
}
