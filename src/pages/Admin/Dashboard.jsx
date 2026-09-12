import { useState, useEffect, useCallback } from 'react';
import {
  Menu,
  Bell,
  Search,
  Plus,
  Calendar,
  TrendingUp,
  MessageSquare,
  Trash2,
  Edit2,
  Loader2,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import AdminSidebar from '../../components/Admin/AdminSidebar';
import AdminStats from '../../components/Admin/AdminStats';
import AdminTable from '../../components/Admin/AdminTable';
import AdminForm from '../../components/Admin/AdminForm';
import MediaManager from '../../components/Admin/MediaManager';
import ServicesPageEditor from '../../components/Admin/ServicesPageEditor';
import ContactPageEditor from '../../components/Admin/ContactPageEditor';
import IndustriesPageEditor from '../../components/Admin/IndustriesPageEditor';
import { useServices } from '../../context/ServicesContext';
import { API_BASE, apiFetch } from '../../utils/api';
import { parseCustomListItems, parseProcessSteps } from '../../utils/formatText';


/* -------------------- Toast Notification -------------------- */
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className={`fixed bottom-6 right-6 z-[999] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl text-white text-sm font-medium animate-in slide-in-from-right duration-300 ${type === 'success' ? 'bg-emerald-600' : 'bg-rose-600'
        }`}
    >
      {type === 'success' ? <CheckCircle size={18} /> : <XCircle size={18} />}
      {message}
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100">✕</button>
    </div>
  );
}

/* -------------------- Confirm Dialog -------------------- */
function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-sm w-full mx-4">
        <h3 className="text-lg font-bold text-ink mb-2">Confirm Delete</h3>
        <p className="text-sm text-gray-500 mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-ink/70 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl bg-rose-600 text-white text-sm font-semibold hover:bg-rose-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* -------------------- Status Badge -------------------- */
function StatusBadge({ status }) {
  const styles = {
    Published: 'bg-emerald-50 text-emerald-700',
    Active: 'bg-emerald-50 text-emerald-700',
    Open: 'bg-emerald-50 text-emerald-700',
    Draft: 'bg-amber-50 text-amber-700',
    Unread: 'bg-rose-50 text-rose-700',
    Read: 'bg-gray-100 text-gray-600',
    Completed: 'bg-blue-50 text-blue-700',
    'In Progress': 'bg-violet-50 text-violet-700',
    Closed: 'bg-gray-100 text-gray-500',
  };
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  );
}

/* ================== COMMON SEO FIELDS ================== */
const commonSeoFields = [
  { name: 'seo.metaTitle', label: 'SEO Meta Title', fullWidth: true, hint: 'Ideal: 50-60 characters.' },
  { name: 'seo.metaDescription', label: 'SEO Meta Description', type: 'textarea', rows: 2, fullWidth: true, hint: 'Ideal: 150-160 characters. Shown in Google results.' },
  { name: 'seo.keywords', label: 'SEO Keywords (comma separated)', fullWidth: true, hint: 'e.g. web development, React, Pakistan' },
  { name: 'seo.ogTitle', label: 'OG Title (Social Share Title)', fullWidth: true, hint: 'Shown on Facebook, WhatsApp, LinkedIn previews.' },
  { name: 'seo.ogDescription', label: 'OG Description (Social Share Desc)', type: 'textarea', rows: 2, fullWidth: true },
  { name: 'seo.ogImage', label: 'OG Image (Social Share Image)', type: 'image', fullWidth: true, hint: 'Recommended: 1200x630px image.' },
  { name: 'seo.canonicalUrl', label: 'Canonical URL', fullWidth: true, hint: 'Optional. Leave blank to auto-use page URL.' },
];

/* ================== SECTION CONFIGS ================== */
const SECTION_CONFIGS = {
  blogs: {
    label: 'Blog Posts',
    endpoint: 'blogs',
    columns: [
      { key: 'coverImage', label: 'Cover' },
      { key: 'title', label: 'Title' },
      { key: 'slug', label: 'Slug' },
      { key: 'tag', label: 'Tag' },
      { key: 'status', label: 'Status' },
    ],
    fields: [
      { name: 'title', label: 'Post Title', required: true, fullWidth: true },
      { name: 'slug', label: 'Slug (e.g. my-blog-post)', required: true },
      { name: 'category', label: 'Category', type: 'select', optionsFrom: 'categories' },
      { name: 'tag', label: 'Tag', type: 'select', optionsFrom: 'tags' },
      { name: 'author', label: 'Author', type: 'select', optionsFrom: 'authors' },
      {
        name: 'status', label: 'Status', type: 'select', options: [
          { value: 'Published', label: 'Published' },
          { value: 'Draft', label: 'Draft' },
        ]
      },
      { name: 'date', label: 'Publish Date (e.g. Jul 12, 2026)' },
      { name: 'coverImage', label: 'Cover Image', type: 'image', fullWidth: true },
      { name: 'color', label: 'Gradient (e.g. from-primary-700 to-indigo-900)' },
      { name: 'excerpt', label: 'Excerpt', type: 'textarea', fullWidth: true, rows: 2 },
      { name: 'content', label: 'Full Content', type: 'textarea', fullWidth: true, rows: 8 },
      ...commonSeoFields,
    ],
  },

  categories: {
    label: 'Categories',
    endpoint: 'categories',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'slug', label: 'Slug' },
      { key: 'description', label: 'Description' },
    ],
    fields: [
      { name: 'name', label: 'Category Name', required: true },
      { name: 'slug', label: 'Slug (e.g. technology)', required: true },
      { name: 'description', label: 'Description', type: 'textarea', fullWidth: true, rows: 3 },
    ],
  },
  tags: {
    label: 'Tags',
    endpoint: 'tags',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'slug', label: 'Slug' },
    ],
    fields: [
      { name: 'name', label: 'Tag Name', required: true },
      { name: 'slug', label: 'Slug (e.g. react)', required: true },
    ],
  },
  authors: {
    label: 'Authors',
    endpoint: 'authors',
    columns: [
      { key: 'avatar', label: 'Avatar' },
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Role' },
    ],
    fields: [
      { name: 'name', label: 'Author Name', required: true },
      { name: 'email', label: 'Email' },
      { name: 'role', label: 'Role (e.g. Editor, Writer)' },
      { name: 'avatar', label: 'Avatar / Photo', type: 'image', fullWidth: true },
      { name: 'bio', label: 'Bio', type: 'textarea', fullWidth: true, rows: 3 },
    ],
  },
  services: {
    label: 'Services',
    endpoint: 'services',
    columns: [
      { key: 'heroImage', label: 'Hero Image' },
      { key: 'title', label: 'Title' },
      { key: 'cardTitle', label: 'Card Title' },
      { key: 'menuTitle', label: 'Menu Title' },
      { key: 'slug', label: 'Slug' },
      { key: 'desc', label: 'Description' },
      { key: 'icon', label: 'Icon' },
    ],
    fields: [
      { name: 'title', label: 'Service Title (H1 Page Title)', required: true, fullWidth: true },
      { name: 'cardTitle', label: 'Service Card Title (Title shown on /services page card & cards grid)', fullWidth: true, hint: 'Short title for /services cards (e.g. Mobile App Development). Leave blank to use full Service Title.' },
      { name: 'menuTitle', label: 'Menu / Dropdown Title (Short name for Navbar e.g. E-Commerce Solutions, Graphic Design)', fullWidth: true, hint: 'Leave blank to use full Service Title in menu' },
      { name: 'slug', label: 'Slug (e.g. web-development)', required: true },
      { name: 'icon', label: 'Service Icon (Image/SVG from Media Library or Lucide Icon Name)', type: 'image', required: true, fullWidth: true, hint: 'Select an SVG/Image from Media Library, upload a new SVG file, or enter a Lucide icon name' },
      { name: 'color', label: 'Color Class (e.g. bg-blue-50 text-blue-600)' },
      { name: 'gradient', label: 'Gradient Classes (e.g. from-blue-500 to-cyan-600)' },
      { name: 'heroSubtitle', label: 'Hero Subtitle', fullWidth: true },
      { name: 'heroImage', label: 'Hero Image', type: 'image', fullWidth: true },
      { name: 'whyChooseImage', label: 'Why Choose Us Image', type: 'image', fullWidth: true },
      { name: 'desc', label: 'Short Description (Cards & Menu preview)', type: 'textarea', fullWidth: true, rows: 2 },
      { name: 'longDesc', label: 'Long Description (Hero intro)', type: 'textarea', fullWidth: true, rows: 4 },
      { name: 'additionalParagraph', label: 'Additional Intro Paragraph (Extended overview)', type: 'textarea', fullWidth: true, rows: 4 },
      { name: 'ctaPrimaryText', label: 'Primary CTA Button Text (e.g. Start Your Project)' },
      { name: 'ctaSecondaryText', label: 'Secondary CTA Button Text (e.g. See related work)' },
      { name: 'features', label: 'Capabilities (one per line)', type: 'textarea', fullWidth: true, rows: 4, isArray: true },
      { name: 'subServicesTitle', label: 'Sub-Services Section Title', fullWidth: true },
      { name: 'subServicesIntro', label: 'Sub-Services Intro Text', type: 'textarea', fullWidth: true, rows: 2 },
      { name: 'subServicesText', label: 'Sub-Services Items (Format: Title | Description, one per line)', type: 'textarea', fullWidth: true, rows: 6, isCustomArray: 'subServicesItems' },
      { name: 'whyChooseTitle', label: 'Why Choose Us Section Title', fullWidth: true },
      { name: 'whyChooseIntro', label: 'Why Choose Us Intro Text', type: 'textarea', fullWidth: true, rows: 2 },
      {
        name: 'whyChooseText',
        label: 'Why Choose Us Items (Format: Title | Description, one per line)',
        type: 'textarea',
        fullWidth: true,
        rows: 6,
        hint: 'Example: Performance-Focused Development | We use clean code, optimized assets, responsive layouts...',
        isCustomArray: 'whyChooseItems',
      },
      { name: 'serviceProcessTitle', label: 'Process Section Title', fullWidth: true },

      { name: 'serviceProcessIntro', label: 'Process Section Intro Text', type: 'textarea', fullWidth: true, rows: 2 },
      {
        name: 'serviceProcessText',
        label: 'Process Steps (Format: Step# | Title | Description | ImageURL (optional) | Points separated by ; (optional))',
        type: 'textarea',
        fullWidth: true,
        rows: 7,
        hint: 'Example: 01 | Assessment | We thoroughly analyze... | https://images.unsplash.com/... | SDLC Review; Infrastructure Assessment; Business Expectation Mapping',
        isCustomArray: 'serviceProcessSteps',
      },

      { name: 'businessTypesTitle', label: 'Business Types Section Title', fullWidth: true },
      { name: 'businessTypesIntro', label: 'Business Types Intro Text', type: 'textarea', fullWidth: true, rows: 2 },
      { name: 'businessTypesText', label: 'Business Types Items (Format: Title | Description, one per line)', type: 'textarea', fullWidth: true, rows: 5, isCustomArray: 'businessTypesItems' },
      { name: 'pricingSectionTitle', label: 'Pricing Section Title', fullWidth: true },
      { name: 'pricingSectionText', label: 'Pricing Section Text', type: 'textarea', fullWidth: true, rows: 3 },
      { name: 'techTitle', label: 'Tech Stack Section Title', fullWidth: true },
      { name: 'techDesc', label: 'Tech Stack Description', type: 'textarea', fullWidth: true, rows: 4 },
      { name: 'tech', label: 'Tech Stack (one per line)', type: 'textarea', fullWidth: true, rows: 3, isArray: true },
      { name: 'outcomes', label: 'Outcomes (one per line)', type: 'textarea', fullWidth: true, rows: 3, isArray: true },
      { name: 'faqsText', label: 'FAQs (Format: Question | Answer, one per line)', type: 'textarea', fullWidth: true, rows: 6, isCustomArray: 'faqs' },
      { name: 'ctaBannerEyebrow', label: 'Bottom Banner Eyebrow (e.g. READY TO GROW?)' },
      { name: 'ctaBannerTitle', label: 'Bottom Banner Title (e.g. Ready to Build Your Web App?)', fullWidth: true },
      { name: 'ctaBannerDesc', label: 'Bottom Banner Description', type: 'textarea', fullWidth: true, rows: 3 },
      { name: 'ctaBannerButtonText', label: 'Bottom Banner Button Text (e.g. Get a Free Consultation)' },
      { name: 'ctaBannerButtonLink', label: 'Bottom Banner Button Link (e.g. /contact or #service-inquiry)' },
      ...commonSeoFields,
    ],
  },

  products: {
    label: 'Products',
    endpoint: 'products',
    columns: [
      { key: 'image', label: 'Image' },
      { key: 'name', label: 'Name' },
      { key: 'title', label: 'Title' },
      { key: 'slug', label: 'Slug' },
      { key: 'category', label: 'Category' },
    ],
    fields: [
      { name: 'name', label: 'Product Name', required: true },
      { name: 'slug', label: 'Slug (e.g. my-product)', required: true },
      { name: 'title', label: 'Hero Title', fullWidth: true },
      { name: 'tagline', label: 'Tagline', fullWidth: true },
      { name: 'category', label: 'Category' },
      { name: 'accent', label: 'Accent (Tailwind gradient e.g. from-blue-500 to-cyan-400)' },
      { name: 'image', label: 'Product Image', type: 'image', fullWidth: true },
      { name: 'externalUrl', label: 'External URL' },
      { name: 'desc', label: 'Description', type: 'textarea', fullWidth: true, rows: 4 },
      ...commonSeoFields,
    ],
  },
  industries: {
    label: 'Industries',
    endpoint: 'industries',
    columns: [
      { key: 'title', label: 'Title' },
      { key: 'slug', label: 'Slug' },
      { key: 'icon', label: 'Icon' },
      { key: 'short', label: 'Short Description' },
    ],
    fields: [
      { name: 'title', label: 'Industry Name', required: true },
      { name: 'slug', label: 'Slug (e.g. education, healthcare, fintech)', required: true },
      { name: 'icon', label: 'Industry Icon (Image/SVG or Lucide Icon Name)', type: 'image', fullWidth: true, hint: 'Select an SVG/Image from Media Library or enter a Lucide icon name' },
      { name: 'short', label: 'Short Description', type: 'textarea', fullWidth: true, rows: 2 },
      { name: 'desc', label: 'Full Hero Description', type: 'textarea', fullWidth: true, rows: 4 },
      { name: 'points', label: 'Key Highlights & Points (one per line)', type: 'textarea', fullWidth: true, rows: 4, isArray: true },
      { name: 'servicesWeOffer', label: 'Services We Offer (one per line)', type: 'textarea', fullWidth: true, rows: 3, isArray: true },
      
      // Stats Strip
      {
        name: 'statsText',
        label: 'Hero Stats Strip (Format: Value | Label, one per line)',
        type: 'textarea',
        fullWidth: true,
        rows: 4,
        isCustomArray: 'industryStats',
        hint: 'Example:\n19+ | years of proven market experience\n750+ | experts in Engineering, Data, AI, Design & QA\n550+ | partnerships spanning across six verticals\n80% | clients rate us better than others',
      },

      // Approach Section
      { name: 'approachTitle', label: 'Approach Section Title (e.g. The Cubixsol Approach)', fullWidth: true },
      {
        name: 'approachItemsText',
        label: 'Approach Cards (Format: Title | Subtitle | Heading1: Text1; Heading2: Text2)',
        type: 'textarea',
        fullWidth: true,
        rows: 6,
        isCustomArray: 'industryApproach',
        hint: 'Example:\nWe Lead with Design | Our team of designers create experiences that are: | Timely: We design at the pace users need; Useful: Success is measured by goals; Delightful: We create thoughtful experiences\n\nWe Leverage Open Source | With thousands of contributions, we deliver: | Sovereignty: Avoid vendor lock-in; Flexibility: Customize source code; Economy: Reduce hosting and maintenance costs\n\nWe Accelerate with AI | We apply generative AI to: | Build Smarter Software: We integrate agentic workflows; Build It Faster Than Ever: Our teams use Claude and Codex',
      },

      // Solutions Section
      { name: 'solutionsTitle', label: 'Domain Solutions Title (e.g. Our EdTech Solutions)', fullWidth: true },
      { name: 'solutionsSubtitle', label: 'Domain Solutions Subtitle', type: 'textarea', fullWidth: true, rows: 2 },
      {
        name: 'solutionsItemsText',
        label: 'Domain Solutions Items (Format: Title | Description, one item per block/line)',
        type: 'textarea',
        fullWidth: true,
        rows: 6,
        isCustomArray: 'industrySolutions',
        hint: 'Example:\nModern LMS Systems for Desktop and Mobile | We have deep expertise in best-in-class open-source LMS systems including Open edX, Moodle, and Edly.\nAccelerated Content Production | We have world-class capability to produce learning content of every kind.\nData Management, Analytics and ML | Our data engineering team has deep expertise in edTech data standards like Caliper and xAPI.',
      },

      // Testimonial
      { name: 'testimonialQuote', label: 'Client Testimonial Quote', type: 'textarea', fullWidth: true, rows: 2 },
      { name: 'testimonialName', label: 'Testimonial Author Name' },
      { name: 'testimonialRole', label: 'Testimonial Author Role / Company' },

      ...commonSeoFields,
    ],
  },
  solutions: {
    label: 'Solutions',
    endpoint: 'solutions',
    columns: [
      { key: 'title', label: 'Title' },
      { key: 'group', label: 'Group / Category' },
      { key: 'slug', label: 'Slug' },
      { key: 'desc', label: 'Description' },
    ],
    fields: [
      { name: 'title', label: 'Solution Title (e.g. Agentic AI)', required: true, fullWidth: true },
      { name: 'slug', label: 'Slug (e.g. agentic-ai)', required: true },
      { name: 'group', label: 'Category / Group (e.g. Artificial Intelligence, Data Solutions, Cloud Solutions)', required: true },
      { name: 'desc', label: 'Hero Description / Overview', type: 'textarea', fullWidth: true, rows: 3 },
      { name: 'ctaPrimaryText', label: 'Primary CTA Button Text (e.g. Book a Call / Talk to us)' },
      { name: 'ctaPrimaryLink', label: 'Primary CTA Button Link (e.g. /contact)' },
      { name: 'ctaSecondaryText', label: 'Secondary CTA Button Text (e.g. Get a Free Assessment / Browse services)' },
      { name: 'ctaSecondaryLink', label: 'Secondary CTA Button Link (e.g. /services)' },
      {
        name: 'bullets',
        label: 'How We Engage Steps (one per line - leave empty to hide section)',
        type: 'textarea',
        fullWidth: true,
        rows: 4,
        isArray: true,
        hint: 'Example:\nDiscovery & requirements alignment\nArchitecture and implementation plan\nBuild, integrate, and test\nLaunch support and iteration',
      },

      // Sub-Services / Specialized Offerings Grid Section
      { name: 'subServicesTitle', label: 'Sub-Services Section Title (e.g. Our Agentic AI Development Services)', fullWidth: true },
      { name: 'subServicesIntro', label: 'Sub-Services Intro Text', type: 'textarea', fullWidth: true, rows: 2 },
      {
        name: 'subServicesText',
        label: 'Sub-Services Items (Format: Title | Description, one per line - leave empty to hide section)',
        type: 'textarea',
        fullWidth: true,
        rows: 6,
        hint: 'Example:\nAI Agent Development Services | We build AI agents for tasks such as answering questions, finding information...\nMulti-Agent Systems | Some workflows involve several different tasks...\nWorkflow Automation | We build AI-powered workflows for tasks that involve several steps...\nAgent Integration | We connect AI agents with the systems your business already uses.',
        isCustomArray: 'subServicesItems',
      },

      // Use Cases Section
      { name: 'useCasesTitle', label: 'Use Cases Section Title (e.g. Use Cases)', fullWidth: true },
      { name: 'useCasesIntro', label: 'Use Cases Intro Text', type: 'textarea', fullWidth: true, rows: 2 },
      {
        name: 'useCasesText',
        label: 'Use Cases Items (Format: Title | Description, one per line - leave empty to hide section)',
        type: 'textarea',
        fullWidth: true,
        rows: 6,
        hint: 'Example:\nSupport Automation | AI agents can answer common customer questions, search approved information, and handle routine support requests.\nResearch Agents | Research agents can collect information from approved sources, organise the results, and prepare summaries for review.\nOperations Copilots | Operations copilots can help employees find information, check data, complete routine tasks, and work across connected business systems.',
        isCustomArray: 'useCasesItems',
      },

      // Tools & Technologies Stack Section
      { name: 'techTitle', label: 'Tools & Tech Section Title (e.g. Tools & Tech)', fullWidth: true },
      { name: 'techDesc', label: 'Tools & Tech Description', type: 'textarea', fullWidth: true, rows: 3 },
      {
        name: 'tech',
        label: 'Technologies / Tools Badges (one per line - leave empty to hide)',
        type: 'textarea',
        fullWidth: true,
        rows: 4,
        isArray: true,
        hint: 'Example:\nLangChain\nLangGraph\nOpenAI\nVector Databases',
      },

      // How We Deliver / Development Process Section
      { name: 'processTitle', label: 'How We Deliver / Process Section Title (e.g. How We Deliver)', fullWidth: true },
      { name: 'processSubtitle', label: 'Process Section Subtitle / Intro Text', type: 'textarea', fullWidth: true, rows: 2 },
      {
        name: 'processStepsText',
        label: 'Process Steps (Format: Step# | Title | Description | ImageURL (optional) | Points separated by ; (optional))',
        type: 'textarea',
        fullWidth: true,
        rows: 7,
        hint: 'Example: 01 | Discover | We begin by reviewing the business goal, current workflow, tasks, data sources, existing systems, and required integrations. | https://... | Analyzing workflows; Defining performance benchmarks',
        isCustomArray: 'solutionProcessSteps',
      },

      // Why Choose Us Section
      { name: 'whyChooseTitle', label: 'Why Choose Us Section Title (e.g. Why Choose Cubixsol?)', fullWidth: true },
      { name: 'whyChooseIntro', label: 'Why Choose Us Intro Text', type: 'textarea', fullWidth: true, rows: 2 },
      {
        name: 'whyChooseText',
        label: 'Why Choose Us Items (Format: Title | Description, one per line - leave empty to hide section)',
        type: 'textarea',
        fullWidth: true,
        rows: 6,
        hint: 'Example:\nPractical AI Development | We start with the business task rather than the technology...\nSecurity & Compliance | AI agents can access business information...\nClear Business Value | We focus on areas such as reducing repeated manual work...\nOngoing Support | Your AI system may need updates after launch as your processes and tools change.',
        isCustomArray: 'whyChooseItems',
      },

      // Best Practices Section
      { name: 'practicesTitle', label: 'Best Practices Section Title', fullWidth: true, hint: 'e.g. Best Practices for Agentic AI' },
      { name: 'practicesIntro', label: 'Best Practices Intro Text', type: 'textarea', fullWidth: true, rows: 2 },
      {
        name: 'practicesItemsText',
        label: 'Best Practices Items (Format: Title | Body Description, one per line - leave empty to hide)',
        type: 'textarea',
        fullWidth: true,
        rows: 6,
        hint: 'Example: Clear Objectives & Boundaries | Agents know what success looks like and what they must never do, with human escalation paths.',
        isCustomArray: 'practicesItems',
      },

      // Impact Comparison Table Section
      { name: 'impactTitle', label: 'Impact Table Section Title', fullWidth: true, hint: "e.g. Why Leaders Can't Ignore Agentic AI" },
      { name: 'impactIntro', label: 'Impact Table Intro Text', type: 'textarea', fullWidth: true, rows: 2 },
      {
        name: 'impactRowsText',
        label: 'Impact Comparison Rows (Format: Key Area | How it Creates Impact, one per line - leave empty to hide)',
        type: 'textarea',
        fullWidth: true,
        rows: 6,
        hint: 'Example: Strategic Decision-Making | Agentic AI helps leaders make timely, data-backed decisions without waiting for manual inputs.',
        isCustomArray: 'impactRows',
      },

      // FAQs Section
      {
        name: 'faqsText',
        label: 'FAQs (Format: Question | Answer, one per line - leave empty to hide)',
        type: 'textarea',
        fullWidth: true,
        rows: 6,
        hint: 'Example: What is agentic AI? | Agentic AI is a type of AI that can work toward a defined goal and take several actions...',
        isCustomArray: 'faqs',
      },

      // Bottom CTA Banner Customization Section
      { name: 'ctaBannerEyebrow', label: 'Bottom Banner Eyebrow (e.g. GET STARTED)' },
      { name: 'ctaBannerTitle', label: 'Bottom Banner Title (e.g. Ready to Get Started?)', fullWidth: true },
      { name: 'ctaBannerDesc', label: 'Bottom Banner Description', type: 'textarea', fullWidth: true, rows: 3 },
      { name: 'ctaBannerButtonText', label: 'Primary Banner Button Text (e.g. Book a Call)' },
      { name: 'ctaBannerButtonLink', label: 'Primary Banner Button Link (e.g. /contact or #service-inquiry)' },
      { name: 'ctaBannerSecondaryButtonText', label: 'Secondary Banner Button Text (e.g. Get a Free Assessment)' },
      { name: 'ctaBannerSecondaryButtonLink', label: 'Secondary Banner Button Link (e.g. /contact)' },

      ...commonSeoFields,
    ],
  },
  projects: {
    label: 'Projects',
    endpoint: 'projects',
    columns: [
      { key: 'image', label: 'Image' },
      { key: 'title', label: 'Title' },
      { key: 'client', label: 'Client' },
      { key: 'industry', label: 'Industry' },
      { key: 'year', label: 'Year' },
    ],
    fields: [
      { name: 'title', label: 'Project Title', required: true, fullWidth: true },
      { name: 'client', label: 'Client Name', required: true },
      { name: 'industry', label: 'Industry', required: true },
      { name: 'year', label: 'Year' },
      { name: 'image', label: 'Project Screenshot / Image', type: 'image', fullWidth: true },
      { name: 'description', label: 'Description', type: 'textarea', fullWidth: true, rows: 5 },
      ...commonSeoFields,
    ],
  },

  testimonials: {
    label: 'Testimonials',
    endpoint: 'testimonials',
    columns: [
      { key: 'avatar', label: 'Avatar' },
      { key: 'name', label: 'Name' },
      { key: 'role', label: 'Role' },
      { key: 'company', label: 'Company' },
      { key: 'quote', label: 'Quote' },
    ],
    fields: [
      { name: 'name', label: 'Client Name', required: true },
      { name: 'role', label: 'Role / Title' },
      { name: 'company', label: 'Company' },
      { name: 'avatar', label: 'Avatar / Photo', type: 'image', fullWidth: true },
      { name: 'quote', label: 'Testimonial Quote', type: 'textarea', fullWidth: true, rows: 4, required: true },
    ],
  },

  messages: {
    label: 'Contact Messages',
    endpoint: 'messages',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'subject', label: 'Subject' },
      { key: 'status', label: 'Status' },
    ],
    fields: [
      { name: 'name', label: 'Name', required: true },
      { name: 'email', label: 'Email', required: true },
      { name: 'phone', label: 'Phone' },
      { name: 'subject', label: 'Subject' },
      {
        name: 'status', label: 'Status', type: 'select', options: [
          { value: 'Unread', label: 'Unread' },
          { value: 'Read', label: 'Read' },
        ]
      },
      { name: 'message', label: 'Message', type: 'textarea', fullWidth: true, rows: 5, required: true },
    ],
  },
  careers: {
    label: 'Careers',
    endpoint: 'careers',
    columns: [
      { key: 'title', label: 'Title' },
      { key: 'department', label: 'Department' },
      { key: 'location', label: 'Location' },
      { key: 'status', label: 'Status' },
    ],
    fields: [
      { name: 'title', label: 'Job Title', required: true, fullWidth: true },
      { name: 'department', label: 'Department' },
      { name: 'location', label: 'Location' },
      {
        name: 'type', label: 'Type', type: 'select', options: [
          { value: 'Full-time', label: 'Full-time' },
          { value: 'Part-time', label: 'Part-time' },
          { value: 'Contract', label: 'Contract' },
          { value: 'Remote', label: 'Remote' },
        ]
      },
      {
        name: 'status', label: 'Status', type: 'select', options: [
          { value: 'Open', label: 'Open' },
          { value: 'Closed', label: 'Closed' },
        ]
      },
      { name: 'description', label: 'Description', type: 'textarea', fullWidth: true, rows: 5 },
      { name: 'requirements', label: 'Requirements (one per line)', type: 'textarea', fullWidth: true, rows: 4, isArray: true },
    ],
  },
  media: {
    label: 'Media Library',
    endpoint: 'media',
    columns: [
      { key: 'url', label: 'Preview' },
      { key: 'title', label: 'Title' },
      { key: 'type', label: 'Type' },
      { key: 'url', label: 'URL' },
    ],
    fields: [
      { name: 'title', label: 'Title', required: true },
      {
        name: 'type', label: 'Type', type: 'select', options: [
          { value: 'image', label: 'Image' },
          { value: 'video', label: 'Video' },
          { value: 'file', label: 'File' },
        ]
      },
      { name: 'url', label: 'Media File', type: 'image', required: true, fullWidth: true },
      { name: 'alt', label: 'Alt Text', fullWidth: true },
    ],
  },
  seo: {
    label: 'SEO Settings',
    endpoint: 'seo',
    columns: [
      { key: 'page', label: 'Page' },
      { key: 'title', label: 'Meta Title' },
      { key: 'description', label: 'Meta Description' },
    ],
    fields: [
      { name: 'page', label: 'Page Path (e.g. /about, /services)', required: true },
      { name: 'title', label: 'Meta Title', fullWidth: true },
      { name: 'description', label: 'Meta Description', type: 'textarea', fullWidth: true, rows: 3 },
      { name: 'keywords', label: 'Keywords (comma separated)', fullWidth: true },
      { name: 'ogImage', label: 'OG Image', type: 'image', fullWidth: true },
    ],
  },
  'contact-info': {
    label: 'Contact Details',
    endpoint: 'contact-info',
    columns: [
      { key: 'icon', label: 'Icon' },
      { key: 'title', label: 'Title' },
      { key: 'desc', label: 'Details / Address' },
      { key: 'order', label: 'Order' },
      { key: 'status', label: 'Status' },
    ],
    fields: [
      { name: 'title', label: 'Card Title (e.g. Our Location, Email Us, Call Us, Working Hours)', required: true, fullWidth: true },
      { name: 'icon', label: 'Icon (Lucide Icon Name like MapPin, Mail, Phone, Clock or Media Image/SVG)', required: true, fullWidth: true, hint: 'Examples: MapPin, Mail, Phone, Clock, Headphones, MessageSquare, Globe, Building2 or select SVG from Media Library' },
      { name: 'desc', label: 'Details / Content (one item or address per line)', type: 'textarea', rows: 4, required: true, fullWidth: true, hint: 'Multi-line text supported. E.g. 123 Innovation Drive\nNew York, NY 10001, USA' },
      { name: 'link', label: 'Click Action Link (Optional)', fullWidth: true, hint: 'e.g. mailto:hello@cubixsol.com or tel:+12121234567 or https://maps.google.com/...' },
      { name: 'order', label: 'Display Order (1, 2, 3, 4...)', type: 'number' },
      {
        name: 'status', label: 'Status', type: 'select', options: [
          { value: 'Active', label: 'Active (Visible on website)' },
          { value: 'Draft', label: 'Draft (Hidden)' },
        ]
      },
    ],
  },
};


/* ================== DB SECTION COMPONENT ================== */
function DbSection({ sectionKey, showToast }) {
  const config = SECTION_CONFIGS[sectionKey];
  const { refreshServices } = useServices();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [formMode, setFormMode] = useState('add');
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [relatedOptions, setRelatedOptions] = useState({});

  // Convert array fields to/from newline format
  const parseArrayFields = (values) => {
    const parsed = { ...values };
    (config.fields || []).forEach((f) => {
      if (f.isArray && typeof parsed[f.name] === 'string') {
        parsed[f.name] = parsed[f.name]
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean);
      }
      if (f.isCustomArray && typeof parsed[f.name] === 'string') {
        if (f.isCustomArray === 'serviceProcessSteps') {
          parsed.serviceProcessSteps = parseProcessSteps(parsed[f.name]);
        } else if (f.isCustomArray === 'solutionProcessSteps') {
          const steps = parseProcessSteps(parsed[f.name]);
          parsed.process = parsed.process || {};
          parsed.process.steps = steps.map((s) => ({
            stepNumber: s.stepNumber,
            title: s.title,
            desc: s.desc,
            image: s.image,
            bullets: Array.isArray(s.points) ? s.points : [],
          }));
        } else if (f.isCustomArray === 'practicesItems') {
          parsed.practices = parsed.practices || {};
          parsed.practices.items = parseCustomListItems(parsed[f.name]).map((i) => ({
            title: i.title,
            body: i.desc,
          }));
        } else if (f.isCustomArray === 'impactRows') {
          parsed.impact = parsed.impact || {};
          parsed.impact.rows = parseCustomListItems(parsed[f.name]).map((i) => ({
            area: i.title,
            impact: i.desc,
          }));        } else if (f.isCustomArray === 'industryStats') {
          parsed.stats = parseCustomListItems(parsed[f.name]).map((i) => ({
            value: i.title,
            label: i.desc,
          }));
        } else if (f.isCustomArray === 'industrySolutions') {
          parsed.solutionsItems = parseCustomListItems(parsed[f.name]).map((i) => ({
            title: i.title,
            body: i.desc,
          }));
        } else if (f.isCustomArray === 'industryApproach') {
          parsed.approachItems = (parsed[f.name] || '')
            .split('\n\n')
            .map((block) => {
              const parts = block.split('|').map((s) => s.trim());
              const title = parts[0] || '';
              const subtitle = parts[1] || '';
              const ptsRaw = parts[2] || '';
              const points = ptsRaw
                .split(';')
                .map((p) => {
                  const [h, ...t] = p.split(':');
                  return { heading: (h || '').trim(), text: (t.join(':') || '').trim() };
                })
                .filter((p) => p.heading);
              return { title, subtitle, points };
            })
            .filter((i) => i.title);
        } else if (f.isCustomArray === 'faqs') {
          parsed.faqs = parseCustomListItems(parsed[f.name]).map((i) => ({
            q: i.title,
            a: i.desc,
          }));
        } else {
          parsed[f.isCustomArray] = parseCustomListItems(parsed[f.name]);
        }
      }
    });

    // Handle nested objects for Solutions
    if (parsed.practicesTitle !== undefined || parsed.practicesIntro !== undefined) {
      parsed.practices = parsed.practices || {};
      if (parsed.practicesTitle !== undefined) parsed.practices.title = parsed.practicesTitle;
      if (parsed.practicesIntro !== undefined) parsed.practices.intro = parsed.practicesIntro;
    }
    if (parsed.impactTitle !== undefined || parsed.impactIntro !== undefined) {
      parsed.impact = parsed.impact || {};
      if (parsed.impactTitle !== undefined) parsed.impact.title = parsed.impactTitle;
      if (parsed.impactIntro !== undefined) parsed.impact.intro = parsed.impactIntro;
    }
    if (parsed.processTitle !== undefined || parsed.processSubtitle !== undefined) {
      parsed.process = parsed.process || {};
      if (parsed.processTitle !== undefined) parsed.process.title = parsed.processTitle;
      if (parsed.processSubtitle !== undefined) parsed.process.subtitle = parsed.processSubtitle;
    }

    // Handle nested testimonial for Industries
    if (parsed.testimonialQuote !== undefined || parsed.testimonialName !== undefined || parsed.testimonialRole !== undefined) {
      parsed.testimonial = {
        quote: parsed.testimonialQuote || '',
        name: parsed.testimonialName || '',
        role: parsed.testimonialRole || '',
      };
    }

    return parsed;
  };

  const stringifyArrayFields = (item) => {
    const stringified = { ...item };

    // Unpack nested solution fields for the edit form
    if (stringified.practices) {
      if (stringified.practices.title) stringified.practicesTitle = stringified.practices.title;
      if (stringified.practices.intro) stringified.practicesIntro = stringified.practices.intro;
      if (Array.isArray(stringified.practices.items)) {
        stringified.practicesItemsText = stringified.practices.items
          .map((i) => `${i.title} | ${i.body || i.desc || ''}`)
          .join('\n\n');
      }
    }
    if (stringified.impact) {
      if (stringified.impact.title) stringified.impactTitle = stringified.impact.title;
      if (stringified.impact.intro) stringified.impactIntro = stringified.impact.intro;
      if (Array.isArray(stringified.impact.rows)) {
        stringified.impactRowsText = stringified.impact.rows
          .map((i) => `${i.area} | ${i.impact}`)
          .join('\n\n');
      }
    }
    if (stringified.process) {
      if (stringified.process.title) stringified.processTitle = stringified.process.title;
      if (stringified.process.subtitle) stringified.processSubtitle = stringified.process.subtitle;
      if (Array.isArray(stringified.process.steps)) {
        stringified.processStepsText = stringified.process.steps
          .map((i) => {
            const stepNum = i.stepNumber || i.num || '01';
            const title = i.title || '';
            const desc = i.desc || '';
            const image = i.image || '';
            const points = Array.isArray(i.bullets || i.points) ? (i.bullets || i.points).join('; ') : '';
            if (image || points) {
              return `${stepNum} | ${title} | ${desc} | ${image} | ${points}`;
            }
            return `${stepNum} | ${title} | ${desc}`;
          })
          .join('\n\n');
      }
    }
    if (Array.isArray(stringified.faqs) && stringified.faqs.length > 0) {
      stringified.faqsText = stringified.faqs.map((i) => `${i.q} | ${i.a}`).join('\n\n');
    }

    // Unpack Industry custom arrays
    if (Array.isArray(stringified.stats) && stringified.stats.length > 0) {
      stringified.statsText = stringified.stats.map((s) => `${s.value} | ${s.label}`).join('\n');
    }
    if (Array.isArray(stringified.solutionsItems) && stringified.solutionsItems.length > 0) {
      stringified.solutionsItemsText = stringified.solutionsItems.map((s) => `${s.title} | ${s.body}`).join('\n\n');
    }
    if (Array.isArray(stringified.approachItems) && stringified.approachItems.length > 0) {
      stringified.approachItemsText = stringified.approachItems
        .map((a) => {
          const pts = (a.points || []).map((p) => `${p.heading}: ${p.text}`).join('; ');
          return `${a.title} | ${a.subtitle || ''} | ${pts}`;
        })
        .join('\n\n');
    }
    if (stringified.testimonial) {
      stringified.testimonialQuote = stringified.testimonial.quote || '';
      stringified.testimonialName = stringified.testimonial.name || '';
      stringified.testimonialRole = stringified.testimonial.role || '';
    }

    (config.fields || []).forEach((f) => {
      if (f.isArray && Array.isArray(stringified[f.name])) {
        stringified[f.name] = stringified[f.name].join('\n');
      }
      if (f.isCustomArray) {
        const arr = stringified[f.isCustomArray];
        if (Array.isArray(arr) && arr.length > 0) {
          if (f.isCustomArray === 'faqs') {
            stringified[f.name] = arr.map((i) => `${i.q} | ${i.a}`).join('\n\n');
          } else if (f.isCustomArray === 'serviceProcessSteps') {
            stringified[f.name] = arr
              .map((i) => {
                const stepNum = i.stepNumber || '01';
                const title = i.title || '';
                const desc = i.desc || '';
                const image = i.image || '';
                const points = Array.isArray(i.points) ? i.points.join('; ') : '';
                if (image || points) {
                  return `${stepNum} | ${title} | ${desc} | ${image} | ${points}`;
                }
                return `${stepNum} | ${title} | ${desc}`;
              })
              .join('\n\n');
          } else {
            stringified[f.name] = arr.map((i) => `${i.title} | ${i.desc}`).join('\n\n');
          }
        }
      }
    });
    return stringified;
  };



  const fetchData = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const json = await apiFetch(config.endpoint);
      setData(Array.isArray(json) ? json : []);
      setFetchError(null);
    } catch (err) {
      console.error(err);
      setFetchError(err.message || 'Failed to load data from server');
      showToast(err.message ? `Failed to load data: ${err.message}` : 'Failed to load data. Is backend running?', 'error');
    } finally {
      setLoading(false);
    }
  }, [config.endpoint, showToast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Load dropdown options for blogs (categories, tags, authors)
  useEffect(() => {
    const needs = (config.fields || [])
      .filter((f) => f.optionsFrom)
      .map((f) => f.optionsFrom);
    if (needs.length === 0) return;
    let cancelled = false;
    Promise.all(
      needs.map(async (endpoint) => {
        try {
          const json = await apiFetch(endpoint);
          return [endpoint, Array.isArray(json) ? json : []];
        } catch {
          return [endpoint, []];
        }
      })
    ).then((pairs) => {
      if (cancelled) return;
      const map = {};
      pairs.forEach(([key, list]) => {
        map[key] = list.map((item) => ({
          value: item.name || item.title || item.slug || '',
          label: item.name || item.title || item.slug || '',
        })).filter((o) => o.value);
      });
      setRelatedOptions(map);
    });
    return () => {
      cancelled = true;
    };
  }, [config.fields, sectionKey]);

  // Build fields with dynamic select options
  const formFields = (config.fields || []).map((f) => {
    if (f.optionsFrom && relatedOptions[f.optionsFrom]) {
      return { ...f, type: 'select', options: relatedOptions[f.optionsFrom] };
    }
    return f;
  });

  const openAddForm = () => {
    setFormValues({});
    setFormMode('add');
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (row) => {
    setFormValues(stringifyArrayFields(row));
    setFormMode('edit');
    setEditingId(row._id);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setFormValues({});
    setEditingId(null);
  };

  const handleSubmit = async (values) => {
    setSaving(true);
    try {
      const payload = parseArrayFields(values);
      let res;
      if (formMode === 'add') {
        res = await fetch(`${API_BASE}/${config.endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API_BASE}/${config.endpoint}/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || 'Failed to save');
      }

      showToast(
        formMode === 'add'
          ? `✅ ${config.label.slice(0, -1)} added successfully! Now showing on website.`
          : `✅ ${config.label.slice(0, -1)} updated successfully!`,
        'success'
      );
      closeForm();
      fetchData();
      if (sectionKey === 'services') {
        refreshServices();
      }
    } catch (err) {
      showToast(err.message || 'Error saving. Check required fields.', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = (row) => {
    setConfirmDelete(row);
  };

  const confirmDeleteAction = async () => {
    if (!confirmDelete) return;
    try {
      const res = await fetch(`${API_BASE}/${config.endpoint}/${confirmDelete._id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete');
      showToast(`${config.label.slice(0, -1)} deleted successfully.`, 'success');
      fetchData();
      if (sectionKey === 'services') {
        refreshServices();
      }
    } catch (err) {
      console.error(err);
      showToast('Error deleting item.', 'error');
    } finally {
      setConfirmDelete(null);
    }
  };

  return (
    <div className="space-y-5">
      {confirmDelete && (
        <ConfirmDialog
          message={`Are you sure you want to delete "${confirmDelete.title || confirmDelete.name}"? This will remove it from the website.`}
          onConfirm={confirmDeleteAction}
          onCancel={() => setConfirmDelete(null)}
        />
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-ink">{config.label}</h2>
          <p className="text-sm text-gray-400 mt-0.5">
            Changes here appear on the website instantly.
          </p>
        </div>
        {!showForm && (
          <button
            onClick={openAddForm}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-gradient text-white text-sm font-semibold shadow-soft hover:opacity-95 transition-opacity"
          >
            <Plus size={16} />
            Add New {config.label.slice(0, -1)}
          </button>
        )}
      </div>

      {showForm ? (
        <AdminForm
          title={formMode === 'add' ? `Add New ${config.label.slice(0, -1)}` : `Edit ${config.label.slice(0, -1)}`}
          fields={formFields}
          values={formValues}
          onChange={(name, value) => setFormValues(prev => ({ ...prev, [name]: value }))}
          onSubmit={handleSubmit}
          onCancel={closeForm}
          submitLabel={saving ? 'Saving...' : formMode === 'add' ? 'Save & Publish' : 'Update'}
          disabled={saving}
        />
      ) : (
        <>
          {loading ? (
            <div className="flex items-center justify-center py-16 gap-3 text-gray-400">
              <Loader2 size={20} className="animate-spin" />
              Loading {config.label.toLowerCase()}...
            </div>
          ) : fetchError ? (
            <div className="text-center py-12 px-6 bg-rose-50/70 rounded-2xl border border-rose-200 shadow-card">
              <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600">
                <AlertCircle size={24} />
              </div>
              <h3 className="text-base font-bold text-rose-950">Failed to connect to backend server</h3>
              <p className="text-rose-700 text-sm mt-1 max-w-md mx-auto">{fetchError}</p>
              <div className="mt-4 p-3 bg-white/80 border border-rose-200 rounded-xl text-xs text-gray-600 max-w-md mx-auto text-left">
                <p className="font-semibold text-gray-800 mb-1">💡 How to fix:</p>
                <p>Run both frontend &amp; backend together using terminal command:</p>
                <code className="block mt-1 bg-gray-900 text-emerald-400 p-2 rounded-lg font-mono">
                  npm run dev
                </code>
              </div>
              <button
                onClick={fetchData}
                className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold shadow-soft transition"
              >
                <RefreshCw size={15} /> Retry Loading Data
              </button>
            </div>
          ) : data.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-card">
              <p className="text-gray-400 text-sm">No {config.label.toLowerCase()} yet.</p>
              <button
                onClick={openAddForm}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-gradient text-white text-sm font-semibold"
              >
                <Plus size={16} /> Add First {config.label.slice(0, -1)}
              </button>
            </div>
          ) : (
            <AdminTable
              columns={config.columns}
              data={data}
              onEdit={openEditForm}
              onDelete={handleDelete}
            />
          )}
        </>
      )}
    </div>
  );
}

/* ================== DASHBOARD OVERVIEW ================== */
const messages = [
  { id: 1, name: 'Ahmed Hassan', email: 'ahmed@example.com', subject: 'Project Inquiry - Mobile App', date: '21 Aug 2026', status: 'Unread' },
  { id: 2, name: 'Lisa Wong', email: 'lisa@techcorp.com', subject: 'Partnership Proposal', date: '20 Aug 2026', status: 'Read' },
  { id: 3, name: 'Omar Farooq', email: 'omar@startup.io', subject: 'AI Solution Quote', date: '19 Aug 2026', status: 'Unread' },
];

function DashboardOverview({ showToast, onNavigate }) {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    apiFetch('stats')
      .then(setStats)
      .catch(() => { });
  }, []);

  return (
    <div className="space-y-6">
      <AdminStats liveStats={stats} onNavigate={onNavigate} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-ink flex items-center gap-2">
              <TrendingUp size={18} className="text-brand-cyan" />
              Engagement Overview
            </h3>
            <span className="text-xs text-ink/50">Last 6 months</span>
          </div>
          <div className="h-52 flex items-end gap-3 px-2">
            {[30, 45, 70, 95, 60, 40].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-brand-purple to-brand-cyan opacity-80"
                  style={{ height: `${h}%` }}
                />
                <span className="text-[10px] text-ink/40">{['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
          <h3 className="font-bold text-ink mb-4 flex items-center gap-2">
            <MessageSquare size={18} className="text-brand-purple" />
            Recent Messages
          </h3>
          <div className="space-y-3">
            {messages.map(m => (
              <div key={m.id} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-8 h-8 rounded-full bg-primary-100 text-brand-purple flex items-center justify-center text-xs font-bold shrink-0">
                  {m.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-ink truncate">{m.name}</p>
                  <p className="text-xs text-ink/50 truncate">{m.subject}</p>
                </div>
                {m.status === 'Unread' && <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-1.5" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
        <h3 className="font-bold text-ink mb-4">Quick Actions — Manage Website Content</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {Object.entries(SECTION_CONFIGS).map(([key, cfg]) => (
            <button
              key={key}
              type="button"
              onClick={() => onNavigate?.(key)}
              className="flex flex-col items-center gap-2 p-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-primary-50 hover:border-primary-100 hover:shadow-sm transition cursor-pointer text-center group"
            >
              <span className="text-2xl font-extrabold text-primary-600 group-hover:scale-110 transition-transform">+</span>
              <span className="text-xs font-semibold text-ink">Add {cfg.label.slice(0, -1)}</span>
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-3">
          💡 Tip: When you add or edit items here, they instantly appear on the live website from the database.
        </p>
      </div>
    </div>
  );
}

/* ================== MAIN DASHBOARD ================== */
export default function AdminDashboard() {
  const [active, setActive] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  const dbSections = Object.keys(SECTION_CONFIGS);

  return (
    <div className="min-h-screen bg-[#f4f5f9] flex">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <AdminSidebar
        active={active}
        setActive={(id) => {
          setActive(id);
        }}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main content */}
      <div className="flex-1 lg:ml-64 min-h-screen flex flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 sm:px-6 py-3.5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl hover:bg-gray-100 text-ink/70"
              >
                <Menu size={20} />
              </button>
              <div>
                <h1 className="text-lg font-bold text-ink capitalize">
                  {active === 'dashboard' ? 'Dashboard Overview' : active.replace('-', ' ')}
                </h1>
                <p className="text-xs text-ink/50 hidden sm:block">
                  {dbSections.includes(active)
                    ? '🔴 Live — changes save directly to database & appear on website'
                    : 'Welcome back, Admin 👋'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 border border-gray-100 w-64">
                <Search size={16} className="text-ink/40" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent text-sm outline-none flex-1 text-ink placeholder:text-ink/40"
                />
              </div>
              <button className="relative p-2.5 rounded-xl hover:bg-gray-100 text-ink/60">
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
              </button>
              <div className="hidden sm:flex items-center gap-2 text-xs text-ink/50 bg-gray-50 px-3 py-2 rounded-xl">
                <Calendar size={14} />
                {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {active === 'dashboard' ? (
            <DashboardOverview showToast={showToast} onNavigate={setActive} />
          ) : active === 'media' ? (
            <MediaManager showToast={showToast} />
          ) : active === 'services-page' ? (
            <ServicesPageEditor showToast={showToast} />
          ) : active === 'contact-page' ? (
            <ContactPageEditor showToast={showToast} />
          ) : active === 'industries-page' ? (
            <IndustriesPageEditor
              showToast={showToast}
              onNavigateToIndustriesTable={() => setActive('industries')}
            />
          ) : dbSections.includes(active) ? (
            <DbSection key={active} sectionKey={active} showToast={showToast} />
          ) : (
            <div className="text-center py-20 text-gray-400">Section coming soon...</div>
          )}
        </main>

      </div>
    </div>
  );
}
