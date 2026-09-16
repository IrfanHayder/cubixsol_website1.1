import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ShoppingBag, ShoppingCart, Sparkles, TrendingUp, ShieldCheck,
  CheckCircle2, ArrowRight, Zap, RefreshCw, Smartphone, Laptop,
  Globe, Users, Award, Cpu, Server, Lock, Layers, Sliders,
  HelpCircle, ChevronRight, Star, ExternalLink, Mail, MessageSquare,
  CreditCard, Search, Palette, Rocket, Store, PackageCheck, Repeat,
  ArrowUpRight, BarChart3, Gauge
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
  cardTitle: 'Shopify Development',
  desc: 'Shopify is the best way for eCommerce stores for all types of businesses to build, manage, and grow their online stores. If you want to start a startup or establish a brand, Shopify offers a user-friendly, secure solution to selling your products worldwide. Suppose you are looking to create a user-friendly and attractive Shopify store. In that case, Cubixsol offers you the best Shopify Development Services that help to create a seamless, high conversion, and attractive Shopify store to grab the attention of target customers. Cubixsol is a reliable Shopify development partner, where we offer customized Shopify store development and Shopify app development services to boost your Shopify store operations with attractive Shopify website design and advanced functionalities.',
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
    { name: 'Shopify Plus', category: 'Enterprise eCommerce', icon: 'ShoppingBag' },
    { name: 'Klaviyo', category: 'Email & SMS Marketing', icon: 'Mail' },
    { name: 'Recharge', category: 'Subscription Billing', icon: 'RefreshCw' },
    { name: 'Gorgias', category: 'Customer Support Helpdesk', icon: 'MessageSquare' },
    { name: 'Yotpo', category: 'Reviews & Loyalty', icon: 'Star' },
    { name: 'Stripe', category: 'Payment Gateway', icon: 'CreditCard' },
    { name: 'PageFly', category: 'Advanced Page Builder', icon: 'Layers' },
    { name: 'Shogun', category: 'Visual Storefront Builder', icon: 'Sliders' },
    { name: 'Loox', category: 'Photo Reviews', icon: 'Sparkles' },
    { name: 'Judge.me', category: 'Product Reviews', icon: 'CheckCircle2' },
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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white relative overflow-hidden">
      {/* Dynamic Background Mesh Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-br from-emerald-600/15 via-teal-500/10 to-transparent blur-3xl" />
        <div className="absolute top-[35%] right-[-15%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-bl from-cyan-600/15 via-sky-500/10 to-transparent blur-3xl" />
        <div className="absolute bottom-[-10%] left-[20%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-tr from-emerald-800/10 via-emerald-600/5 to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10">
        {/* ================= HERO SECTION ================= */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Breadcrumb Strip */}
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-8">
            <Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <ChevronRight size={13} className="text-slate-600" />
            <Link to="/services" className="hover:text-emerald-400 transition-colors">Services</Link>
            <ChevronRight size={13} className="text-slate-600" />
            <span className="text-emerald-400 font-semibold">Shopify Store Development</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Hero Column */}
            <div className="lg:col-span-7 space-y-7">
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span>Certified Shopify Partner & eCommerce Engineers</span>
              </div>

              {/* Main H1 Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12]">
                Shopify Store <br />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                  Development
                </span>
              </h1>

              {/* Rich Description */}
              <div className="text-base sm:text-lg text-slate-300 leading-relaxed space-y-4 font-normal">
                {data.desc ? (
                  <p>{formatInline(data.desc, { linkClass: 'text-emerald-400 hover:text-emerald-300 underline font-medium' })}</p>
                ) : (
                  <p>{formatInline(DEFAULT_DATA.desc, { linkClass: 'text-emerald-400 hover:text-emerald-300 underline font-medium' })}</p>
                )}
              </div>

              {/* Action CTAs */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => openEstimateModal('Shopify Store Development')}
                  className="px-7 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-slate-950 font-bold text-base shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center gap-3 group cursor-pointer"
                >
                  <ShoppingBag size={20} className="text-slate-950 group-hover:rotate-6 transition-transform" />
                  <span>{data.ctaPrimaryText || 'Talk to an Expert'}</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="#services-matrix"
                  className="px-6 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-base border border-slate-700/80 hover:border-emerald-500/40 transition-all duration-300 backdrop-blur-md flex items-center gap-2"
                >
                  <span>{data.ctaSecondaryText || 'Explore Shopify Services'}</span>
                  <ChevronRight size={16} className="text-emerald-400" />
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>Shopify Online Store 2.0</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>Core Web Vitals 99+</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>Custom Liquid & Apps</span>
                </div>
              </div>
            </div>

            {/* Right Hero Column: Interactive Store Engine Visualizer */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl bg-slate-900/90 border border-slate-800/90 p-6 sm:p-7 shadow-2xl backdrop-blur-xl overflow-hidden group hover:border-emerald-500/40 transition-all duration-500">
                {/* Decorative glow */}
                <div className="absolute -top-24 -right-24 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Visualizer Top Bar */}
                <div className="flex items-center justify-between pb-5 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <Store size={19} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Shopify Performance Engine</span>
                        <span className="px-2 py-0.5 text-[10px] rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                          Live Active
                        </span>
                      </div>
                      <div className="text-xs text-slate-400">Cubixsol High-Speed Architecture</div>
                    </div>
                  </div>

                  <button
                    onClick={handleSimulateAudit}
                    disabled={isAuditing}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700 text-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    title="Run Store Performance Audit"
                  >
                    <RefreshCw size={13} className={isAuditing ? 'animate-spin text-emerald-400' : ''} />
                    <span className="hidden sm:inline">Speed Test</span>
                  </button>
                </div>

                {/* Score Gauges */}
                <div className="grid grid-cols-3 gap-3 my-5">
                  <div className="rounded-2xl bg-slate-950/80 border border-slate-800/80 p-3.5 text-center">
                    <div className="text-2xl font-black text-emerald-400">
                      {auditScore.speed}{typeof auditScore.speed === 'number' && <span className="text-xs text-slate-500 font-medium">/100</span>}
                    </div>
                    <div className="text-[11px] font-semibold text-slate-300 mt-1">Mobile Speed</div>
                    <div className="text-[10px] text-emerald-500 mt-0.5">0.35s TTFB</div>
                  </div>

                  <div className="rounded-2xl bg-slate-950/80 border border-slate-800/80 p-3.5 text-center">
                    <div className="text-2xl font-black text-cyan-400">
                      {auditScore.mobile}{typeof auditScore.mobile === 'number' && <span className="text-xs text-slate-500 font-medium">%</span>}
                    </div>
                    <div className="text-[11px] font-semibold text-slate-300 mt-1">Checkout UX</div>
                    <div className="text-[10px] text-cyan-400 mt-0.5">1-Click Fast Pay</div>
                  </div>

                  <div className="rounded-2xl bg-slate-950/80 border border-slate-800/80 p-3.5 text-center">
                    <div className="text-2xl font-black text-teal-400">
                      {auditScore.seo}{typeof auditScore.seo === 'number' && <span className="text-xs text-slate-500 font-medium">%</span>}
                    </div>
                    <div className="text-[11px] font-semibold text-slate-300 mt-1">SEO Schema</div>
                    <div className="text-[10px] text-teal-400 mt-0.5">Rich Snippets</div>
                  </div>
                </div>

                {/* Simulated Terminal / Store Status Output */}
                <div className="rounded-2xl bg-slate-950 border border-slate-800/80 p-4 space-y-2.5 font-mono text-xs">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800/60 pb-2">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Status: {auditScore.status}
                    </span>
                    <span className="text-slate-500">Shopify CLI v3.x</span>
                  </div>

                  <div className="space-y-1.5 pt-1 text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Theme Engine:</span>
                      <span className="text-emerald-300 font-semibold">Liquid 2.0 Modular</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">App Overhead:</span>
                      <span className="text-cyan-300">0% Layout Shift (Async)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Checkout API:</span>
                      <span className="text-slate-200">Shopify Cart & Checkout Ext.</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Multi-Currency:</span>
                      <span className="text-teal-300">Enabled (Shopify Markets)</span>
                    </div>
                  </div>
                </div>

                {/* Quick Action in Widget */}
                <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div className="text-xs text-slate-400">
                    Need a custom Shopify audit?
                  </div>
                  <button
                    type="button"
                    onClick={() => openEstimateModal('Shopify Store Audit')}
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <span>Get Free Audit</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= STATS STRIP ================= */}
        <section className="py-12 border-y border-slate-800/80 bg-slate-900/40 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {stats.map((st, i) => {
                const IconComponent = st.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 hover:bg-slate-900 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                        <IconComponent size={20} />
                      </div>
                      <span className="text-[11px] font-semibold tracking-wider uppercase text-emerald-400/90 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                        {st.highlight}
                      </span>
                    </div>
                    <div className="text-3xl sm:text-4xl font-black text-white tracking-tight group-hover:text-emerald-300 transition-colors">
                      {st.value}
                    </div>
                    <div className="text-sm font-medium text-slate-400 mt-1">
                      {st.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= SECTION 2: WHY CHOOSE CUBIXSOL ================= */}
        <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              Why Choose Us
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {data.whyChooseTitle || DEFAULT_DATA.whyChooseTitle}
            </h2>
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
              {data.whyChooseIntro || DEFAULT_DATA.whyChooseIntro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(data.whyChooseItems && data.whyChooseItems.length > 0 ? data.whyChooseItems : DEFAULT_DATA.whyChooseItems).map((item, idx) => {
              const icons = [Globe, Award, TrendingUp, Users];
              const ItemIcon = icons[idx % icons.length];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/90 p-7 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500/30 transition-all duration-300">
                      <ItemIcon size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="pt-6 border-t border-slate-800/60 mt-6 flex items-center text-xs font-semibold text-emerald-400 gap-1.5 group-hover:translate-x-1 transition-transform">
                    <span>Verified Success Pillar</span>
                    <CheckCircle2 size={14} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ================= INTERACTIVE SHOPIFY ARCHITECTURE STUDIO ================= */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-slate-900/60 via-slate-950 to-slate-900/60 border-y border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                Interactive Architecture Studio
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Modern Shopify Development Stacks
              </h2>
              <p className="text-slate-400 text-sm sm:text-base">
                Explore how we architect scalable, lightning-fast Shopify stores tailored to your business model.
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-10">
              {STORE_MODES.map((mode, i) => (
                <button
                  key={mode.id}
                  onClick={() => setActiveStoreMode(i)}
                  className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    activeStoreMode === i
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/20 scale-105'
                      : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  <span>{mode.name}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    activeStoreMode === i ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {mode.badge}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Mode Display Panel */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMode.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-6 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-semibold">
                      <Sparkles size={14} />
                      <span>{currentMode.badge}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                      {currentMode.name}
                    </h3>

                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                      {currentMode.desc}
                    </p>

                    <div className="space-y-3 pt-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Engineering Highlights:
                      </div>
                      {currentMode.highlights.map((hl, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm text-slate-200">
                          <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                            <CheckCircle2 size={14} />
                          </div>
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3">
                      <button
                        type="button"
                        onClick={() => openEstimateModal(`Shopify - ${currentMode.name}`)}
                        className="px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
                      >
                        <span>Build with {currentMode.name}</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-6">
                    <div className="rounded-2xl bg-slate-950 border border-slate-800 p-6 space-y-5">
                      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                        <span className="text-xs font-mono text-emerald-400">Benchmark Telemetry</span>
                        <span className="text-[11px] text-slate-500 font-mono">Lighthouse v11 Audit</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                          <div className="text-xs text-slate-400">Performance Index</div>
                          <div className="text-2xl font-black text-emerald-400 mt-1">{currentMode.metrics.speed}</div>
                          <div className="text-[10px] text-emerald-500/80 mt-1">Google Core Web Vitals Ready</div>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                          <div className="text-xs text-slate-400">Time To First Byte</div>
                          <div className="text-2xl font-black text-cyan-400 mt-1">{currentMode.metrics.ttfb}</div>
                          <div className="text-[10px] text-cyan-500/80 mt-1">Edge Cached via CDN</div>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                          <div className="text-xs text-slate-400">Conversion Rate Lift</div>
                          <div className="text-2xl font-black text-teal-400 mt-1">{currentMode.metrics.conversion}</div>
                          <div className="text-[10px] text-teal-500/80 mt-1">Frictionless Checkout</div>
                        </div>

                        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
                          <div className="text-xs text-slate-400">Mobile Responsiveness</div>
                          <div className="text-2xl font-black text-white mt-1">{currentMode.metrics.mobileScore}</div>
                          <div className="text-[10px] text-slate-400 mt-1">100% Fluid Breakpoints</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ================= SECTION 3: HOW WE WORK (PROCESS STEPS) ================= */}
        <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              Step-by-Step Delivery
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {data.serviceProcessTitle || DEFAULT_DATA.serviceProcessTitle}
            </h2>
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
              {data.serviceProcessIntro || DEFAULT_DATA.serviceProcessIntro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {processSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12 }}
                onClick={() => setActiveStep(idx)}
                className={`p-7 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  activeStep === idx
                    ? 'bg-slate-900 border-emerald-500 shadow-xl shadow-emerald-500/10 scale-[1.02]'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="space-y-4">
                  {/* Step Number Tag */}
                  <div className="flex items-center justify-between">
                    <span className={`text-2xl font-black font-mono ${
                      activeStep === idx ? 'text-emerald-400' : 'text-slate-600'
                    }`}>
                      {step.stepNumber || `0${idx + 1}`}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                      Phase {idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-slate-800/80 mt-6 flex items-center justify-between text-xs font-semibold">
                  <span className={activeStep === idx ? 'text-emerald-400' : 'text-slate-500'}>
                    {activeStep === idx ? 'Active Focus Phase' : 'Methodology Standard'}
                  </span>
                  <ArrowRight size={14} className={activeStep === idx ? 'text-emerald-400' : 'text-slate-600'} />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= SECTION 4: OUR SHOPIFY SERVICES (SUB-SERVICES MATRIX) ================= */}
        <section id="services-matrix" className="py-20 md:py-28 bg-slate-900/50 border-t border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                Full-Lifecycle Solutions
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                {data.subServicesTitle || DEFAULT_DATA.subServicesTitle}
              </h2>
              <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
                {data.subServicesIntro || DEFAULT_DATA.subServicesIntro}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {subServices.map((srv, idx) => {
                const IconComponent = SUB_SERVICE_ICONS[idx % SUB_SERVICE_ICONS.length];
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (idx % 4) * 0.1 }}
                    className="p-7 rounded-3xl bg-slate-950/80 border border-slate-800/90 hover:border-emerald-500/40 hover:bg-slate-900 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div className="space-y-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 transition-all duration-300">
                        <IconComponent size={22} />
                      </div>

                      <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                        {srv.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {srv.desc}
                      </p>
                    </div>

                    <div className="pt-6 border-t border-slate-800/70 mt-6 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => openEstimateModal(`Inquire: ${srv.title}`)}
                        className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 group-hover:translate-x-0.5 transition-transform cursor-pointer"
                      >
                        <span>Request Service</span>
                        <ArrowRight size={14} />
                      </button>
                      <span className="text-[11px] font-mono text-slate-600">0{idx + 1}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= SECTION 5: KEY FEATURES WE FOLLOW TO HELP YOU SUCCEED ================= */}
        <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
              Success Principles
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              {data.businessTypesTitle || DEFAULT_DATA.businessTypesTitle}
            </h2>
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
              {data.businessTypesIntro || DEFAULT_DATA.businessTypesIntro}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {keyFeatures.map((feat, idx) => {
              const FeatureIcon = FEATURE_ICONS[idx % FEATURE_ICONS.length];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className="p-7 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-transform">
                    <FeatureIcon size={22} />
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2.5">
                    {feat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {feat.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ================= SECTION 6: TRUSTED BRANDS & PARTNERS ================= */}
        <section className="py-16 md:py-24 border-t border-slate-800/80 bg-slate-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Trusted Brands & Ecosystem Partners
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm">
                Seamless API connectivity with top-tier marketing, billing, analytics, and logistics tools.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {platforms.map((p, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-emerald-500/40 hover:bg-slate-900 transition-all text-center flex flex-col items-center justify-center group"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all">
                    <DynamicIcon name={p.icon || 'Check'} size={20} fallback={ShoppingBag} />
                  </div>
                  <div className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {p.name}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {p.category}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SECTION 7: FREQUENTLY ASKED QUESTIONS ================= */}
        <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              Common Inquiries
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Find quick answers to the most common questions our users ask. Whether you need help with our services, products, or policies, this section provides clear and helpful information to guide you.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-slate-900 border-emerald-500/50 shadow-xl shadow-emerald-500/5'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="text-base sm:text-lg font-bold text-white">
                      {faq.q}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-emerald-500 text-slate-950 rotate-90' : 'bg-slate-800 text-slate-400'
                    }`}>
                      <ChevronRight size={18} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="px-6 pb-6 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-slate-800/80 pt-4"
                      >
                        {formatInline(faq.a, { linkClass: 'text-emerald-400 hover:text-emerald-300 underline font-medium' })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================= SECTION 8: BOTTOM CTA BANNER & VALUE PROP ================= */}
        <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/30 p-8 sm:p-12 lg:p-16 overflow-hidden text-center shadow-2xl">
            {/* Background Decorative Blur */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
                {data.ctaBannerEyebrow || DEFAULT_DATA.ctaBannerEyebrow}
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                {data.ctaBannerTitle || DEFAULT_DATA.ctaBannerTitle}
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {data.ctaBannerDesc || DEFAULT_DATA.ctaBannerDesc}
              </p>

              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <button
                  type="button"
                  onClick={() => openEstimateModal('Shopify Store Development - Bottom CTA')}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-black text-base shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex items-center gap-3 cursor-pointer"
                >
                  <ShoppingBag size={20} className="text-slate-950" />
                  <span>{data.ctaBannerButtonText || 'Talk to an Expert'}</span>
                  <ArrowRight size={18} />
                </button>

                <Link
                  to="/contact"
                  className="px-7 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-base border border-slate-700 hover:border-emerald-500/40 transition-all duration-300"
                >
                  Contact Our Team
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
