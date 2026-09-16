import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ShoppingBag, ShoppingCart, Sparkles, TrendingUp, ShieldCheck,
  CheckCircle2, ArrowRight, Zap, RefreshCw, Smartphone, Laptop,
  Globe, Users, Award, Cpu, Server, Lock, Layers, Sliders,
  HelpCircle, ChevronRight, Star, ExternalLink, Mail, MessageSquare,
  CreditCard, Search, Palette, Rocket, Store, PackageCheck, Repeat,
  ArrowUpRight, BarChart3, Gauge, Radio, Activity
} from 'lucide-react';
import { useEstimateModal } from '../context/EstimateModalContext';
import { apiFetch } from '../utils/api';
import { formatInline } from '../utils/formatText';
import Reveal, { Stagger, StaggerItem } from '../components/Reveal';
import CtaBanner from '../components/CtaBanner';
import DynamicIcon from '../components/DynamicIcon';
import { useSEO } from '../utils/seo';

// Default static data fallback in case API is delayed
const DEFAULT_DATA = {
  slug: 'shopify-development',
  title: 'Shopify Store Development',
  heroTitle: 'Shopify Store Development',
  desc: "Shopify is the premier eCommerce platform empowering businesses of all sizes to build, manage, and scale global online stores. Whether launching an ambitious startup or scaling an established brand, Shopify provides a rock-solid, secure, and user-friendly foundation to sell products worldwide.",
  longDesc: "At **Cubixsol**, we offer full-lifecycle **Shopify Development Services** designed to create seamless, high-converting, and attractive stores that captivate target customers. As a reliable Shopify development partner, we combine customized store development, responsive theme design, and bespoke app integrations to boost your store operations with attractive website design and advanced functionalities.",
  ctaPrimaryText: 'Talk to an Expert',
  ctaSecondaryText: 'Explore Shopify Services',
  features: [
    '1K+ Clients around the world',
    '30+ Award Winning',
    '97% Business Growth',
    '60+ Team Members',
  ],
  whyChooseTitle: 'Why Choose Cubixsol For Shopify Development',
  whyChooseIntro: 'We combine eCommerce strategy, pixel-perfect Liquid theme engineering, custom app development, and conversion rate optimization to build revenue-driving online stores.',
  whyChooseItems: [
    {
      title: '1K+ Clients around the world',
      desc: 'Trusted by global DTC brands, high-growth startups, and multi-channel retailers worldwide for scalable Shopify storefronts.',
    },
    {
      title: '30+ Award Winning',
      desc: 'Recognized internationally for exceptional UI/UX design, custom theme performance, and headless Shopify solutions.',
    },
    {
      title: '97% Business Growth',
      desc: 'Our clients experience record-breaking conversion improvements, faster page loads, and sustained sales momentum.',
    },
    {
      title: '60+ Team Members',
      desc: 'Dedicated Shopify experts, certified Liquid developers, full-stack engineers, and conversion rate specialists.',
    },
  ],
  serviceProcessTitle: 'How We Work On Shopify Development',
  serviceProcessIntro: 'Our proven 4-stage development methodology delivers pixel-perfect, revenue-driven storefronts on time and within budget.',
  serviceProcessSteps: [
    {
      stepNumber: '01',
      title: 'Consultation and discussing the requirement',
      desc: 'As such, you tell us what you expect from Shopify custom development for your business. We assess your needs and provide numerous options so that you can select the most effective and affordable solution.',
    },
    {
      stepNumber: '02',
      title: 'Timetable and price approval',
      desc: 'Together we finalize the plan, milestones, deadlines, and cost for your unique Shopify website development based on the number of hours needed to complete the project.',
    },
    {
      stepNumber: '03',
      title: 'Development and implementation',
      desc: 'We use a step-by-step development strategy to give initial results as quickly as feasible. You will be informed of each phase, the logical areas of functionality will be sent to the operational team only after approval by you.',
    },
    {
      stepNumber: '04',
      title: 'Warranty and post-release support',
      desc: 'The major purpose of all of our Shopify development services is to ensure that the project works as planned and generates cash for you, thus we accept inquiries and feedback even after the project is completed.',
    },
  ],
  subServicesTitle: 'Our Shopify Services',
  subServicesIntro: 'When you are building a new business, you need the custom Shopify development services that help you to grow your business online. At Cubixsol, we offer you the best Shopify services that cover the launch, customize, and growth of your Shopify eCommerce store online. Our Shopify custom development & design services include the customization of themes, app integration, and SEO optimization in the search engines to boost your business organically. Our team of top Shopify developers provides you the ongoing support to fix the issues that you face during live eCommerce store creation.',
  subServicesItems: [
    {
      title: 'Custom Shopify Theme Development',
      desc: 'An attractive Shopify ecommerce website development is the foundation of your business success. At Cubixsol, our custom Shopify theme development services focus on building an attractive, high-performance theme that meets your brand visibility and business goals. Our customized Shopify theme ensures your eCommerce store is more attractive and user-friendly. Our Shopify experts make your website efficient and make your site mobile-friendly.',
    },
    {
      title: 'Theme Customization',
      desc: 'If you already have a Shopify theme and want to increase the features and look, our theme customization services offer you the perfect solution. Our best Shopify developers upgrade the existing theme that match your business requirements and goals. Shopify themes come with the best customization options but do not optimize your store, expert modifications make your eCommerce store attractive. At Cubixsol, we ensure that your Shopify e-commerce store is responsive.',
    },
    {
      title: 'App Integrations',
      desc: "With seamless app integrations, you can easily increase your store's features. The Shopify app ecosystem includes many Shopify developer tools for advertising, payments, management of stocks, analytics, and customer service. However, integrating several apps while maintaining the performance of your store. Our web designer Shopify implements the Shopify ecommerce website design element that helps to improve user engagement and increase the best conversions.",
    },
    {
      title: 'Ongoing Support',
      desc: "Our team of Shopify experts, developers, focuses on integrating third-party apps and APIs to increase your business's features while maintaining the speed or security of your online business. If you require complex email marketing automation, AI-powered chatbots, social media sales channels, or CRM connection, we assure a smooth installation that fits into your business process.",
    },
    {
      title: 'Custom Shopify Apps',
      desc: 'Our Shopify app development and integration services enable businesses to create effective apps that enhance the performance of their Shopify store. We provide custom Shopify apps that meet unique requirements, such as automated inventory tracking, personalized discounts, price change, and a variety of platforms. We also integrate third-party apps, ensuring that they perform seamlessly with your Shopify store without slowing it down.',
    },
    {
      title: 'Shopify Migration Services',
      desc: 'If you want to move your store from a different platform to Shopify, our Shopify migration services will make the process go smoothly. Migration between systems such as WooCommerce, Magento, BigCommerce, or OpenCart might be difficult, but our staff can manage all that from product transfers to customer data migration, history of transactions, SEO retention, and design replication.',
    },
    {
      title: 'Shopify SEO & Performance Optimization',
      desc: "An effective Shopify store is only useful if it appears among the top search results and has quick-loading pages. Our Shopify SEO and performance optimization services boost your store's presence in search engines while providing an excellent user experience. We optimize site speed, simplify navigation and increase mobile responsiveness.",
    },
    {
      title: 'Shopify Dropshipping Store Setup',
      desc: 'Our professionals set up supplier integrations, product listings, payment gateways, and marketing tools to get your store ready for business. Whether you want to sell fashion, electronics, beauty products, or specialty items, we will create a professional Shopify store that is optimized for dropshipping success. Our dropshipping solutions allowing entrepreneurs to easily begin and expand a profitable online business.',
    },
  ],
  businessTypesTitle: 'Key Feature We Follow To Help You Succeed',
  businessTypesIntro: 'Our core development principles and performance safeguards guarantee superior shopper experience, high checkout conversion, and smooth store management.',
  businessTypesItems: [
    {
      title: 'Detailed Business Analysis',
      desc: 'Based on your specifications and desired outcome, we develop a well-thought-out strategy that includes an extensive awareness of the operations of every part.',
    },
    {
      title: 'User-Centered Design',
      desc: 'With a smart Shopify front-end development technique, we can make your new Shopify design attractive. Easy-to-use methodology eliminates the possibility of losing a consumer owing to an unattractive storefront.',
    },
    {
      title: 'Mobile-First Approach',
      desc: 'With the majority of eCommerce transactions occurring on mobile devices, our responsive Shopify architectures ensure blazing-fast mobile rendering, touch-optimized checkout, and zero layout shifts.',
    },
    {
      title: 'Ongoing Support and Consulting',
      desc: "Our Shopify development agency will always be here to assist you. Don't be afraid to ask questions or raise concerns — the more we know, the more reliable the result.",
    },
    {
      title: 'Proactive Maintenance Plans',
      desc: "Building an appealing Shopify store with your Shopify development partner is only the first step. Customers' needs are continuously changing, and we are ready to build on success.",
    },
    {
      title: 'Site Speed & Seo Optimization',
      desc: 'Optimisation is important for both search engines and consumers. With custom features, we add new ones without affecting the loading performance.',
    },
  ],
  supportedPlatforms: [
    { name: 'Shopify Plus', category: 'Enterprise eCommerce', icon: 'shopify plus' },
    { name: 'Klaviyo', category: 'Email & SMS Marketing', icon: 'klaviyo' },
    { name: 'Recharge', category: 'Subscription Billing', icon: 'recharge' },
    { name: 'Gorgias', category: 'Customer Support Helpdesk', icon: 'gorgias' },
    { name: 'Yotpo', category: 'Reviews & Loyalty', icon: 'yotpo' },
    { name: 'Stripe', category: 'Payment Gateway', icon: 'stripe' },
    { name: 'PageFly', category: 'Advanced Page Builder', icon: 'pagefly' },
    { name: 'Shogun', category: 'Visual Storefront Builder', icon: 'shogun' },
    { name: 'Loox', category: 'Photo Reviews', icon: 'loox' },
    { name: 'Judge.me', category: 'Product Reviews', icon: 'judge.me' },
  ],
  faqs: [
    {
      q: 'How can I calculate the cost of developing a Shopify website on my own?',
      a: 'To calculate the cost of developing a Shopify website, consider expenses like Shopify plan fees, theme costs, app subscriptions, domain, hosting, and potential development tools.',
    },
    {
      q: "What's the best way to find an experienced Shopify designer for my eCommerce business?",
      a: 'The best way to find an experienced Shopify designer is through freelance platforms (Upwork, Fiverr), Shopify Experts Marketplace, or agency directories specializing in eCommerce design.',
    },
    {
      q: 'What services do professional Shopify web design companies typically offer?',
      a: 'Professional Shopify web design companies typically offer services like custom theme design, store setup, app integration, SEO optimization, conversion rate optimization, and ongoing maintenance.',
    },
  ],
  ctaBannerEyebrow: 'E-COMMERCE EXCELLENCE',
  ctaBannerTitle: 'We create attractive and intuitive user experiences that enhance customer satisfaction and brand-seeking',
  ctaBannerDesc: 'Let our team of certified Shopify developers transform your online storefront into a high-converting, scalable eCommerce powerhouse.',
  ctaBannerButtonText: 'Talk to an Expert',
  ctaBannerButtonLink: '/contact#contact-form',
};

// Interactive visualizer mock modes
const STORE_MODES = [
  {
    id: 'theme2',
    name: 'Online Store 2.0 Theme',
    badge: 'Liquid Engine',
    desc: 'Modular JSON-template architecture with sections everywhere, zero layout-shift, and sub-second page loads.',
    metrics: { speed: '99/100', ttfb: '120ms', conversion: '+38%', mobileScore: '100%' },
    highlights: ['Dynamic Drag-and-Drop Sections', 'Custom Liquid & App Blocks', 'Native Predictive Search']
  },
  {
    id: 'headless',
    name: 'Headless Hydrogen & Oxygen',
    badge: 'Next-Gen Speed',
    desc: 'React-powered ultra-fast frontend built on Shopify Hydrogen and globally edge-cached via Oxygen hosting.',
    metrics: { speed: '100/100', ttfb: '45ms', conversion: '+52%', mobileScore: '100%' },
    highlights: ['Sub-50ms Edge Rendering', 'GraphQL Storefront API', 'Unrestricted Custom Frontend UX']
  },
  {
    id: 'apps',
    name: 'Custom App & API Integrations',
    badge: 'Private Apps',
    desc: 'Bespoke Node.js & Remix private Shopify apps with real-time webhooks, ERP connections, and custom pricing logic.',
    metrics: { speed: '99/100', ttfb: '180ms', conversion: '+44%', mobileScore: '98%' },
    highlights: ['Custom Pricing & Tiered Discounts', 'Automated Warehouse & ERP Sync', 'Secure Shopify Webhooks']
  },
  {
    id: 'b2b',
    name: 'B2B Wholesale & Multi-Currency',
    badge: 'Shopify Plus',
    desc: 'International market expansions with multi-currency checkout, localized taxation, and custom B2B buyer portals.',
    metrics: { speed: '98/100', ttfb: '140ms', conversion: '+65%', mobileScore: '99%' },
    highlights: ['Multi-Currency & Geolocation Routing', 'Company Profiles & Net-Terms', 'Automated Wholesale Catalogs']
  },
];

// Sub-services icons mapping
const SUB_SERVICE_ICONS = [
  Palette, Sliders, Layers, RefreshCw, Cpu, Repeat, Search, Store
];

// Key features icons mapping
const FEATURE_ICONS = [
  BarChart3, Palette, Smartphone, MessageSquare, ShieldCheck, Gauge
];

export default function ShopifyDevelopment() {
  const { openEstimateModal } = useEstimateModal();
  const [data, setData] = useState(DEFAULT_DATA);
  const [activeStoreMode, setActiveStoreMode] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditScore, setAuditScore] = useState({ speed: 99, mobile: 98, seo: 100, status: 'Store Optimized & Fast' });

  // SEO
  useSEO({
    title: data?.seo?.metaTitle || 'Shopify Store Development Services | Cubixsol',
    description: data?.seo?.metaDescription || data?.desc?.substring(0, 160),
    keywords: data?.seo?.keywords || 'Shopify development, custom Shopify store, Shopify theme development, Shopify app integration',
  });

  const handleSimulateAudit = () => {
    setIsAuditing(true);
    setAuditScore({ speed: '...', mobile: '...', seo: '...', status: 'Running Core Web Vitals audit...' });
    setTimeout(() => {
      setIsAuditing(false);
      setAuditScore({
        speed: 99,
        mobile: 98,
        seo: 100,
        status: 'Audit Completed: 99/100 Mobile Performance Score'
      });
    }, 700);
  };

  useEffect(() => {
    let isMounted = true;
    apiFetch('services/shopify-development')
      .then((res) => {
        if (isMounted && res && (res.title || res.subServicesItems)) {
          setData((prev) => ({ ...prev, ...res }));
        }
      })
      .catch(() => {
        apiFetch('pages/shopify-development')
          .then((pageRes) => {
            if (isMounted && pageRes && pageRes.title) {
              setData((prev) => ({ ...prev, ...pageRes }));
            }
          })
          .catch(() => {});
      });
    return () => { isMounted = false; };
  }, []);

  const stats = [
    { value: '1K+', label: 'Clients around the world', icon: Globe, highlight: 'Global Footprint' },
    { value: '30+', label: 'Award Winning Stores', icon: Award, highlight: 'Design Excellence' },
    { value: '97%', label: 'Average Business Growth', icon: TrendingUp, highlight: 'Revenue Lift' },
    { value: '60+', label: 'Shopify Specialists', icon: Users, highlight: 'Dedicated Team' },
  ];

  const subServices = data.subServicesItems && data.subServicesItems.length > 0
    ? data.subServicesItems
    : DEFAULT_DATA.subServicesItems;

  const processSteps = data.serviceProcessSteps && data.serviceProcessSteps.length > 0
    ? data.serviceProcessSteps
    : DEFAULT_DATA.serviceProcessSteps;

  const keyFeatures = data.businessTypesItems && data.businessTypesItems.length > 0
    ? data.businessTypesItems
    : DEFAULT_DATA.businessTypesItems;

  const faqs = data.faqs && data.faqs.length > 0 ? data.faqs : DEFAULT_DATA.faqs;

  const platforms = data.supportedPlatforms && data.supportedPlatforms.length > 0
    ? data.supportedPlatforms
    : DEFAULT_DATA.supportedPlatforms;

  const currentMode = STORE_MODES[activeStoreMode] || STORE_MODES[0];

  return (
    <div className="min-h-screen bg-white text-ink font-sans selection:bg-[#00a4d8] selection:text-white relative">
      {/* ================= HERO SECTION (Cubixsol Midnight & Cyan Mesh) ================= */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 bg-gradient-to-br from-slate-950 via-[#071326] to-[#040e1c] text-white">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#00a4d8]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute left-0 bottom-0 w-96 h-96 bg-primary-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition group"
            >
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" /> Back to Services
            </Link>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-6">
              <Reveal scale>
                <div className="flex flex-col space-y-6 sm:space-y-7">
                  {/* Eyebrow Badge */}
                  <div>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#00a4d8]/15 border border-[#00a4d8]/30 text-cyan-300 text-xs font-bold uppercase tracking-wider shadow-sm backdrop-blur-sm">
                      <Radio className="w-3.5 h-3.5 text-[#00a4d8] animate-pulse" />
                      <span>Certified Shopify Partner &amp; eCommerce Engineering</span>
                    </div>
                  </div>

                  {/* Main Title */}
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.2]">
                    Shopify Store <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a4d8] via-cyan-300 to-white">Development</span>
                  </h1>

                  {/* Paragraphs with Clear Separation */}
                  {(() => {
                    const rawDesc = data.desc || DEFAULT_DATA.desc || '';
                    const paragraphs = rawDesc.split(/\n\n+/).map((p) => p.trim()).filter(Boolean);
                    const lead = paragraphs[0] || rawDesc;
                    const callout =
                      paragraphs.length > 1
                        ? paragraphs.slice(1).join('\n\n')
                        : data.longDesc || data.additionalParagraph || DEFAULT_DATA.longDesc;
                    return (
                      <div className="space-y-4 sm:space-y-5">
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-normal">
                          {formatInline(lead, {
                            linkClass: 'text-[#00a4d8] hover:text-cyan-300 underline font-semibold',
                            strongClass: 'text-white font-bold',
                          })}
                        </p>
                        {callout && (
                          <div className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal bg-white/[0.04] border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-sm">
                            {formatInline(callout, {
                              linkClass: 'text-[#00a4d8] hover:text-cyan-300 underline font-semibold',
                              strongClass: 'text-white font-bold',
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })()}

                  {/* Trust Highlights Badges */}
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-300 pt-1">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#00a4d8] shrink-0" />
                      <span>Online Store 2.0 Themes</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#00a4d8] shrink-0" />
                      <span>Sub-Second Performance</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#00a4d8] shrink-0" />
                      <span>Custom Apps &amp; ERP Sync</span>
                    </div>
                  </div>

                  {/* Hero CTA Buttons */}
                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() => openEstimateModal('Shopify Store Development')}
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00a4d8] to-blue-600 hover:opacity-95 text-white font-bold text-sm shadow-lg shadow-[#00a4d8]/25 transition-all hover:scale-[1.02] cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>{data.ctaPrimaryText || 'Talk to an Expert'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <a
                      href="#services-matrix"
                      className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all backdrop-blur-sm hover:scale-[1.02]"
                    >
                      <Sparkles className="w-4 h-4 text-cyan-300" />
                      <span>{data.ctaSecondaryText || 'Explore Shopify Services'}</span>
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right: Live Interactive Shopify Performance Telemetry Node */}
            <div className="lg:col-span-6">
              <Reveal direction="left" delay={0.1}>
                <div className="rounded-3xl bg-slate-900/90 border border-[#00a4d8]/30 p-6 sm:p-7 shadow-2xl backdrop-blur-xl relative">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#00a4d8] animate-ping" />
                      <span className="text-xs font-mono text-cyan-300 font-bold">SHOPIFY ARCHITECTURE HUB &bull; LIVE</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00a4d8]/20 text-cyan-300 border border-[#00a4d8]/30">
                      Store 2.0 Engine
                    </span>
                  </div>

                  {/* Mode Selector */}
                  <div className="space-y-2.5 mb-5">
                    <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                      Shopify Architecture Frameworks:
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {STORE_MODES.map((mode, i) => (
                        <button
                          key={mode.id}
                          onClick={() => setActiveStoreMode(i)}
                          className={`p-2.5 rounded-xl text-left border transition-all text-xs font-sans cursor-pointer ${
                            activeStoreMode === i
                              ? 'bg-[#00a4d8]/20 border-[#00a4d8] text-white font-bold'
                              : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          <p className="font-semibold truncate">{mode.name}</p>
                          <p className="text-[10px] text-cyan-300/80 font-mono mt-0.5">{mode.badge}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Telemetry Display */}
                  <div className="rounded-2xl bg-black/50 border border-slate-800 p-4 space-y-3 font-mono text-xs">
                    <div className="flex justify-between items-center border-b border-slate-800/80 pb-2">
                      <span className="text-slate-400 font-sans font-semibold">Active Framework:</span>
                      <span className="text-cyan-300 font-bold">{currentMode.name}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 text-[11px]">
                      <div className="p-2.5 rounded-lg bg-white/5 border border-slate-800">
                        <p className="text-slate-400 text-[10px]">SPEED INDEX</p>
                        <p className="text-[#00a4d8] font-bold mt-0.5">{currentMode.metrics.speed}</p>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white/5 border border-slate-800">
                        <p className="text-slate-400 text-[10px]">CONVERSION LIFT</p>
                        <p className="text-emerald-400 font-bold mt-0.5">{currentMode.metrics.conversion}</p>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-sky-950/40 border border-[#00a4d8]/30 flex justify-between items-center text-[11px]">
                      <div className="flex items-center gap-1.5 text-cyan-200">
                        <Activity className="w-3.5 h-3.5 text-[#00a4d8] animate-pulse" />
                        <span className="truncate">{auditScore.status}</span>
                      </div>
                      <span className="text-[10px] text-[#00a4d8] font-bold shrink-0">{currentMode.metrics.ttfb}</span>
                    </div>

                    <button
                      onClick={handleSimulateAudit}
                      disabled={isAuditing}
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#00a4d8] to-blue-600 hover:opacity-90 text-white font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin' : ''}`} />
                      {isAuditing ? 'Testing Core Web Vitals...' : 'Test Real-Time Shopify Speed Audit'}
                    </button>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. WHY CHOOSE CUBIXSOL (Stats Strip) ================= */}
      <section className="border-y border-gray-200/80 bg-slate-50/80 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              {data.whyChooseTitle || DEFAULT_DATA.whyChooseTitle}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {data.whyChooseIntro || DEFAULT_DATA.whyChooseIntro}
            </p>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 text-center">
            <div className="px-3 sm:px-4 py-2">
              <p className="text-3xl sm:text-5xl font-extrabold text-[#00a4d8] tracking-tight">1K+</p>
              <p className="text-xs sm:text-sm text-gray-700 font-semibold mt-1.5">Clients around the world</p>
            </div>
            <div className="px-3 sm:px-4 py-2">
              <p className="text-3xl sm:text-5xl font-extrabold text-ink tracking-tight">30+</p>
              <p className="text-xs sm:text-sm text-gray-700 font-semibold mt-1.5">Award Winning</p>
            </div>
            <div className="px-3 sm:px-4 py-2">
              <p className="text-3xl sm:text-5xl font-extrabold text-emerald-600 tracking-tight">97%</p>
              <p className="text-xs sm:text-sm text-gray-700 font-semibold mt-1.5">Business Growth</p>
            </div>
            <div className="px-3 sm:px-4 py-2">
              <p className="text-3xl sm:text-5xl font-extrabold text-blue-600 tracking-tight">60+</p>
              <p className="text-xs sm:text-sm text-gray-700 font-semibold mt-1.5">Team Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. WHY CHOOSE CARDS MATRIX ================= */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(data.whyChooseItems && data.whyChooseItems.length > 0 ? data.whyChooseItems : DEFAULT_DATA.whyChooseItems).map((item, idx) => {
            const icons = [Globe, Award, TrendingUp, Users];
            const ItemIcon = icons[idx % icons.length];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-2xl bg-white border border-gray-200/90 p-6 sm:p-7 shadow-sm hover:border-[#00a4d8]/60 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-3.5">
                  <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#00a4d8] group-hover:scale-110 group-hover:bg-[#00a4d8] group-hover:text-white transition-all duration-300">
                    <ItemIcon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-ink group-hover:text-[#00a4d8] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-5 border-t border-gray-100 mt-5 flex items-center text-xs font-semibold text-[#00a4d8] gap-1.5">
                  <span>Verified Capability</span>
                  <CheckCircle2 size={14} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ================= 4. HOW WE WORK (PROCESS ROADMAP) ================= */}
      <section className="py-16 sm:py-24 bg-slate-50/80 border-y border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 text-[#00a4d8] border border-sky-200 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
              <Layers className="w-3.5 h-3.5 text-[#00a4d8]" />
              <span>Step-by-Step Delivery</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-3">
              {data.serviceProcessTitle || DEFAULT_DATA.serviceProcessTitle}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {data.serviceProcessIntro || DEFAULT_DATA.serviceProcessIntro}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setActiveStep(idx)}
                className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  activeStep === idx
                    ? 'bg-white border-[#00a4d8] shadow-lg shadow-[#00a4d8]/10 ring-2 ring-[#00a4d8]/20'
                    : 'bg-white border-gray-200/90 hover:border-gray-300 shadow-sm'
                }`}
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className={`text-2xl font-black font-mono ${
                      activeStep === idx ? 'text-[#00a4d8]' : 'text-gray-300'
                    }`}>
                      {step.stepNumber || `0${idx + 1}`}
                    </span>
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Phase {idx + 1}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-ink leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-5 border-t border-gray-100 mt-5 flex items-center justify-between text-xs font-semibold">
                  <span className={activeStep === idx ? 'text-[#00a4d8]' : 'text-gray-400'}>
                    {activeStep === idx ? 'Selected Phase' : 'Roadmap Standard'}
                  </span>
                  <ArrowRight size={14} className={activeStep === idx ? 'text-[#00a4d8]' : 'text-gray-400'} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 5. OUR SHOPIFY SERVICES (SUB-SERVICES MATRIX) ================= */}
      <section id="services-matrix" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 text-[#00a4d8] border border-sky-200 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
            <ShoppingBag className="w-3.5 h-3.5 text-[#00a4d8]" />
            <span>Full-Lifecycle Solutions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-3">
            {data.subServicesTitle || DEFAULT_DATA.subServicesTitle}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            {data.subServicesIntro || DEFAULT_DATA.subServicesIntro}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {subServices.map((srv, idx) => {
            const IconComponent = SUB_SERVICE_ICONS[idx % SUB_SERVICE_ICONS.length];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 4) * 0.08 }}
                className="p-6 sm:p-7 rounded-2xl bg-white border border-gray-200/90 hover:border-[#00a4d8]/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-3.5">
                  <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#00a4d8] group-hover:scale-110 group-hover:bg-[#00a4d8] group-hover:text-white transition-all duration-300">
                    <IconComponent size={22} />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-ink group-hover:text-[#00a4d8] transition-colors leading-snug">
                    {srv.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {srv.desc}
                  </p>
                </div>

                <div className="pt-5 border-t border-gray-100 mt-5 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => openEstimateModal(`Inquire: ${srv.title}`)}
                    className="text-xs font-bold text-[#00a4d8] hover:text-[#0284c7] flex items-center gap-1.5 group-hover:translate-x-0.5 transition-transform cursor-pointer"
                  >
                    <span>Request Service</span>
                    <ArrowRight size={14} />
                  </button>
                  <span className="text-[11px] font-mono text-gray-400">0{idx + 1}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ================= 6. KEY FEATURES WE FOLLOW TO HELP YOU SUCCEED ================= */}
      <section className="py-16 sm:py-24 bg-slate-50/80 border-t border-gray-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 text-[#00a4d8] border border-sky-200 text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#00a4d8]" />
              <span>Success Principles</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-3">
              {data.businessTypesTitle || DEFAULT_DATA.businessTypesTitle}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {data.businessTypesIntro || DEFAULT_DATA.businessTypesIntro}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {keyFeatures.map((feat, idx) => {
              const FeatureIcon = FEATURE_ICONS[idx % FEATURE_ICONS.length];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="p-6 sm:p-7 rounded-2xl bg-white border border-gray-200/90 hover:border-[#00a4d8]/60 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-[#00a4d8] mb-4 group-hover:scale-110 group-hover:bg-[#00a4d8] group-hover:text-white transition-all">
                    <FeatureIcon size={22} />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-ink group-hover:text-[#00a4d8] transition-colors mb-2">
                    {feat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {feat.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 7. TRUSTED BRANDS & PARTNERS ================= */}
      <section className="py-16 sm:py-20 border-t border-gray-200/80 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
              Trusted Brands &amp; Ecosystem Partners
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm">
              Seamless API connectivity with top-tier marketing, billing, analytics, and logistics tools.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {platforms.map((p, i) => (
              <div
                key={i}
                className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-gray-200/80 hover:border-[#00a4d8]/50 hover:bg-white hover:shadow-md transition-all text-center flex flex-col items-center justify-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-gray-200/80 flex items-center justify-center text-[#00a4d8] mb-2.5 group-hover:scale-110 group-hover:bg-[#00a4d8] group-hover:text-white transition-all shadow-xs">
                  <DynamicIcon icon={p.icon} title={p.name} className="w-5 h-5 transition-colors" fallbackName="ShoppingBag" />
                </div>
                <div className="text-xs sm:text-sm font-bold text-ink group-hover:text-[#00a4d8] transition-colors">
                  {p.name}
                </div>
                <div className="text-[10px] sm:text-[11px] text-gray-400 mt-0.5">
                  {p.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 8. FREQUENTLY ASKED QUESTIONS ================= */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 text-[#00a4d8] border border-sky-200 text-xs font-bold uppercase tracking-wider shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-[#00a4d8]" />
            <span>Common Inquiries</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Find quick answers to the most common questions our users ask. Whether you need help with our services, products, or policies, this section provides clear and helpful information to guide you.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-sky-50/40 border-[#00a4d8]/60 shadow-md'
                    : 'bg-white border-gray-200/90 hover:border-gray-300'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-ink">
                    {faq.q}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'bg-[#00a4d8] text-white rotate-90' : 'bg-gray-100 text-gray-500'
                  }`}>
                    <ChevronRight size={16} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3.5"
                    >
                      {formatInline(faq.a, { linkClass: 'text-[#00a4d8] hover:text-[#0284c7] underline font-semibold' })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= 9. BOTTOM CTA BANNER & VALUE PROP ================= */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-[#071326] to-[#040e1c] border border-sky-500/30 p-8 sm:p-12 lg:p-16 overflow-hidden text-center shadow-2xl text-white">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00a4d8]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00a4d8]/20 text-cyan-300 text-xs font-bold uppercase tracking-wider border border-[#00a4d8]/30">
              {data.ctaBannerEyebrow || DEFAULT_DATA.ctaBannerEyebrow}
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              {data.ctaBannerTitle || DEFAULT_DATA.ctaBannerTitle}
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              {data.ctaBannerDesc || DEFAULT_DATA.ctaBannerDesc}
            </p>

            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <button
                type="button"
                onClick={() => openEstimateModal('Shopify Store Development - Bottom CTA')}
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#00a4d8] to-blue-600 hover:opacity-95 text-white font-bold text-sm shadow-xl shadow-[#00a4d8]/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-2.5 cursor-pointer"
              >
                <ShoppingBag size={18} />
                <span>{data.ctaBannerButtonText || 'Talk to an Expert'}</span>
                <ArrowRight size={16} />
              </button>

              <Link
                to="/contact"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all backdrop-blur-sm hover:scale-[1.02]"
              >
                Contact Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
