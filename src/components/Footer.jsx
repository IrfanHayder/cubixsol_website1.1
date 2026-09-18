import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';
import logo from '../assets/logo.svg';
import { useState } from 'react';
import { LinkedinIcon, FacebookIcon, InstagramIcon, YoutubeIcon } from './SocialIcons';

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
      { label: 'Web Development', to: '/web-development' },
      { label: 'Mobile App Development', to: '/mobile-app-development' },
      { label: 'Android Development', to: '/android-development' },
      { label: 'UI/UX Design', to: '/ui-ux-design' },
      { label: 'E-Commerce Solutions', to: '/ecommerce-solutions' },
      { label: 'Digital Marketing', to: '/digital-marketing' },
      { label: 'API Development & Integration', to: '/api-development' },
      { label: 'Data Migration', to: '/data-migration-services' },
      { label: 'Graphic Designing', to: '/graphic-designing' },
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

const socialLinks = [
  { name: 'Facebook', href: 'https://www.facebook.com/CubixSol', icon: FacebookIcon },
  { name: 'Instagram', href: 'https://www.instagram.com/cubixsolution', icon: InstagramIcon },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/cubixsol', icon: LinkedinIcon },
  { name: 'YouTube', href: 'https://www.youtube.com/@Cubixsolution', icon: YoutubeIcon },
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
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2458ff] to-[#1541d4] shadow-xs flex flex-col items-center justify-center text-white shrink-0 relative overflow-hidden p-1">
        <svg className="w-4 h-4 mb-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2L20.66 7V17L12 22L3.34 17V7L12 2Z"
            fill="#1e40af"
            stroke="white"
            strokeWidth="1.2"
          />
          <path
            d="M10 8.5C8.07 8.5 6.5 10.07 6.5 12C6.5 13.93 8.07 15.5 10 15.5C11.5 15.5 12.78 14.56 13.26 13.24H10V11.24H15.15C15.22 11.49 15.25 11.74 15.25 12C15.25 14.9 12.9 17.25 10 17.25C7.1 17.25 4.75 14.9 4.75 12C4.75 9.1 7.1 6.75 10 6.75C11.45 6.75 12.76 7.34 13.71 8.29L12.47 9.53C11.84 8.9 10.97 8.5 10 8.5Z"
            fill="white"
          />
          <circle cx="18" cy="6" r="2" fill="#FF7A00" />
        </svg>
        <span className="text-[6.5px] font-black tracking-tight leading-none text-white">GoodFirms</span>
      </div>
    ),
    clutch: (
      <div className="w-10 h-10 rounded-xl bg-[#16325c] shadow-xs flex flex-col items-center justify-center text-white shrink-0 p-1">
        <svg className="w-4 h-4 mb-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="9.5" stroke="white" strokeWidth="1.2" />
          <path d="M12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.1 17 15.89 15.7 16.6 13.8L14.7 13.2C14.2 14.3 13.2 15.1 12 15.1C10.3 15.1 8.9 13.7 8.9 12C8.9 10.3 10.3 8.9 12 8.9C13.2 8.9 14.2 9.7 14.7 10.8L16.6 10.2C15.89 8.3 14.1 7 12 7Z" fill="white"/>
          <circle cx="12" cy="12" r="2.2" fill="#E44933"/>
        </svg>
        <span className="text-[6.5px] font-black tracking-tight leading-none text-white">Clutch</span>
      </div>
    ),
    'clutch-gold': (
      <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A] shadow-xs flex flex-col items-center justify-center border border-amber-300/80 shrink-0 p-1">
        <svg className="w-4 h-4 text-amber-600 mb-0.5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
        </svg>
        <span className="text-[6px] font-black tracking-tight leading-none text-amber-900 text-center">Top Clutch</span>
      </div>
    ),
    uk: (
      <div className="w-10 h-10 rounded-xl bg-white shadow-xs flex flex-col items-center justify-center border border-gray-200 shrink-0 p-1">
        <svg className="w-4 h-4 text-[#012169] mb-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M15 10v11M12 3l9 7H3z"/>
        </svg>
        <span className="text-[5.5px] font-black text-[#012169] leading-tight text-center">
          Companies
          <br />
          House
        </span>
      </div>
    ),
  };

  return (
    <a
      href={award.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col items-center justify-center rounded-xl bg-gray-50/80 hover:bg-white border border-gray-200/80 hover:border-primary-400 hover:shadow-md hover:-translate-y-0.5 p-2 transition-all duration-300"
      title={`${award.title} - ${award.sub}`}
    >
      <div className="group-hover:scale-105 transition-transform duration-300">
        {icons[award.style]}
      </div>
      <span className="mt-1.5 text-[10px] font-bold text-gray-800 group-hover:text-primary-600 text-center leading-tight truncate w-full transition-colors">
        {award.title}
      </span>
      <span className="text-[8.5px] text-gray-500 text-center leading-tight truncate w-full mt-0.5">
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

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-5">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    title={social.name}
                    className="w-9 h-9 rounded-full bg-gray-100 hover:bg-primary-100 hover:text-primary-600 flex items-center justify-center text-gray-500 transition"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>

            {/* Awards & Certifications Badges under Social Icons */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <p className="text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2.5">
                Awards &amp; Certifications
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {awards.map((a) => (
                  <AwardBadge key={a.id} award={a} />
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6 w-full">
              <h4 className="text-xs font-bold uppercase tracking-wider text-ink mb-2">
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

        <div className="mt-12 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Cubixsol. All Rights Reserved.</p>
          <p className="text-xs text-center sm:text-right">
            Building reliable software for teams that ship.
          </p>
        </div>
      </div>
    </footer>
  );
}
