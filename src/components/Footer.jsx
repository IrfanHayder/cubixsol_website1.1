import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';
import logo from '../assets/logo.svg';
import { useState } from 'react';
import { LinkedinIcon, FacebookIcon, TwitterIcon, InstagramIcon, GithubIcon } from './SocialIcons';

const columns = [
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Solutions', to: '/solutions' },
      { label: 'Our Products', to: '/products' },
      { label: 'Careers', to: '/careers' },
      { label: 'Blog', to: '/blog' },
      { label: 'Contact Us', to: '/contact' },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Web Development', to: '/services/web-development' },
      { label: 'Mobile App Development', to: '/services/mobile-app-development' },
      { label: 'Android Development', to: '/services/android-development' },
      { label: 'UI/UX Design', to: '/services/ui-ux-design' },
      { label: 'E-Commerce Solutions', to: '/services/ecommerce-solutions' },
      { label: 'Digital Marketing', to: '/services/digital-marketing' },
      { label: 'API Development & Integration', to: '/services/api-development' },
      { label: 'Data Migration', to: '/services/data-migration-services' },
      { label: 'Graphic Designing', to: '/services/graphic-design' },
    ],
  },
  {
    title: 'Our Solutions',
    links: [
      { label: 'AI & ML Solutions', to: '/solutions' },
      { label: 'Data Solutions', to: '/solutions' },
      { label: 'Agentic AI', to: '/solutions/agentic-ai' },
      { label: 'Data Engineering', to: '/solutions/data-engineering' },
      { label: 'eCommerce Development', to: '/solutions/ecommerce-development' },
      { label: 'AI Chatbots & Support', to: '/solutions/ai-chatbots-support' },
      { label: 'Oracle', to: '/solutions/oracle-aidp' },
      { label: 'Image to Text', to: '/products/image-to-text' },
      { label: 'JPG to PDF', to: '/products/jpg-to-pdf' },
      { label: 'AI SEO Auditor', to: '/tools/ai-seo-auditor' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'FAQs', to: '/contact' },
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms & Conditions', to: '/terms' },
      { label: 'Support', to: '/contact' },
    ],
  },
];

/** Real Cubixsol profiles only */
const awards = [
  {
    id: 'goodfirms',
    href: 'https://www.goodfirms.co/company/cubixsol',
    title: 'GoodFirms',
    sub: 'Company profile',
    style: 'goodfirms',
  },
  {
    id: 'clutch',
    href: 'https://clutch.co/profile/cubixsol',
    title: 'Clutch',
    sub: 'Verified profile',
    style: 'clutch',
  },
  {
    id: 'clutch-connections',
    href: 'https://clutch.co/profile/cubixsol#connections',
    title: 'Clutch',
    sub: 'Connections',
    style: 'clutch-gold',
  },
  {
    id: 'uk',
    href: 'https://find-and-update.company-information.service.gov.uk/company/16014685',
    title: 'Companies House',
    sub: 'UK · 16014685',
    style: 'uk',
  },
];

function AwardBadge({ award }) {
  const icons = {
    goodfirms: (
      <div className="w-[4.25rem] h-[4.25rem] rounded-xl bg-gradient-to-b from-[#4b8bff] to-[#1a56db] shadow-lg flex flex-col items-center justify-center text-white relative overflow-hidden">
        <span className="text-[10px] font-black tracking-tight z-10">GoodFirms</span>
        <span className="mt-1 text-[7px] font-bold bg-[#ff7a00] px-2 py-0.5 rounded-sm z-10">
          PARTNER
        </span>
        <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-full bg-white/10" />
      </div>
    ),
    clutch: (
      <div className="w-[4.25rem] h-[4.25rem] rounded-xl bg-[#16325c] shadow-lg flex flex-col items-center justify-center text-white border border-white/10">
        <span className="text-[8px] font-bold text-sky-300 tracking-wider">TOP</span>
        <span className="text-sm font-black tracking-tight">Clutch</span>
        <span className="text-[7px] text-white/60 mt-0.5">Profile</span>
      </div>
    ),
    'clutch-gold': (
      <div className="w-[4.25rem] h-[4.25rem] rounded-full bg-gradient-to-b from-[#f6d365] via-[#fda085] to-[#c77932] shadow-lg flex flex-col items-center justify-center text-[#1a1a2e] border-2 border-amber-200">
        <span className="text-[7px] font-black leading-none">Best of</span>
        <span className="text-[11px] font-black leading-tight">CLUTCH</span>
      </div>
    ),
    uk: (
      <div className="w-[4.25rem] h-[4.25rem] rounded-xl bg-white shadow-lg flex flex-col items-center justify-center border border-gray-200">
        <span className="text-[8px] font-black text-[#012169] text-center leading-tight px-1">
          Companies
          <br />
          House
        </span>
        <span className="mt-1 text-[8px] font-extrabold text-red-600 tracking-wide">UK</span>
      </div>
    ),
  };

  return (
    <a
      href={award.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center justify-center rounded-2xl bg-[#121a2b] border border-white/10 p-4 sm:p-5 min-h-[140px] sm:min-h-[150px] hover:border-primary-400/50 hover:-translate-y-1 hover:shadow-[0_12px_40px_-12px_rgba(59,130,246,0.35)] transition-all duration-300"
    >
      <div className="group-hover:scale-105 transition-transform duration-300">
        {icons[award.style]}
      </div>
      <span className="mt-3 text-xs sm:text-sm font-bold text-white text-center leading-tight">
        {award.title}
      </span>
      <span className="text-[10px] sm:text-[11px] text-white/50 text-center mt-1">
        {award.sub}
      </span>
    </a>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail('');
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-8">
          <div className="col-span-2">
            <Link to="/" className="inline-block mb-4">
              <img src={logo} alt="Cubixsol" className="h-10 w-auto object-contain" />
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-full">
              We help businesses grow, automate, and achieve long-term success through innovative
              digital solutions.
            </p>
            <div className="flex gap-3 mt-5">
              {[LinkedinIcon, FacebookIcon, TwitterIcon, InstagramIcon, GithubIcon].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label="social link"
                    className="w-9 h-9 rounded-full bg-gray-100 hover:bg-primary-100 hover:text-primary-600 flex items-center justify-center text-gray-500 transition"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                )
              )}
            </div>

            <div className="mt-8 w-full">
              <h4 className="text-xs font-bold uppercase tracking-wider text-ink mb-3">
                Newsletter
              </h4>
              <p className="text-sm text-gray-500 mb-3">
                Stay updated with our latest news and insights.
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2 w-full">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="shrink-0 w-11 h-11 rounded-lg bg-primary-gradient flex items-center justify-center text-white hover:opacity-90 transition"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              {sent && (
                <p className="text-xs text-emerald-600 mt-2 font-medium">
                  Subscribed! Thanks for joining.
                </p>
              )}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold uppercase tracking-wider text-ink mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-sm text-gray-500 hover:text-primary-600 transition"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Awards & Certifications */}
        <div className="mt-12 rounded-2xl sm:rounded-3xl bg-[#0b1220] px-4 sm:px-8 py-8 sm:py-10 border border-white/5">
          <h3 className="text-center text-lg sm:text-xl font-extrabold text-white mb-6 sm:mb-8 tracking-tight">
            Awards &amp; Certifications
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
            {awards.map((a) => (
              <AwardBadge key={a.id} award={a} />
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Cubixsol. All Rights Reserved.</p>
          <p className="text-xs text-center sm:text-right">
            Building reliable software for teams that ship.
          </p>
        </div>
      </div>
    </footer>
  );
}
