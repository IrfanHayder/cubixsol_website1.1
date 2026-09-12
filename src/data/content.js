import {
  Globe, Code2, Smartphone, BrainCircuit, Cloud, ShoppingCart,
  LineChart, PenTool, Zap, ShieldCheck, Clock, Users2, Webhook, LayoutTemplate, Database, Palette,
  FileCode, Tablet, AppWindow, ServerCog, Boxes,
} from 'lucide-react';

export const services = [
  {
    icon: Globe,
    slug: 'web-development',
    heroImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&h=750&q=70',
    title: 'Web Development',
    desc: 'Fast, secure, and scalable websites built with modern technologies that convert visitors into customers.',
    color: 'text-blue-600 bg-blue-50',
    gradient: 'from-blue-500 to-cyan-600',
    longDesc: 'We design and develop high-performance websites and web apps that look sharp, load fast, and convert. From marketing sites to complex platforms, every build is responsive, SEO-ready and easy to maintain.',
    features: ['Responsive & mobile-first layouts', 'SEO-friendly architecture', 'CMS & headless options', 'Performance optimization', 'Secure authentication & APIs', 'Ongoing support & iterations'],
    tech: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind'],
    outcomes: ['Faster page loads', 'Higher conversion rates', 'Easier content updates'],
  },
  {
    icon: ServerCog,
    slug: 'laravel-development',
    heroImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1000&h=750&q=70',
    title: 'Laravel Development',
    desc: 'Powerful and scalable web applications using the Laravel PHP framework for complex business logic.',
    color: 'text-red-500 bg-red-50',
    gradient: 'from-red-500 to-rose-600',
    longDesc: 'Laravel is our go-to for robust backends and admin-heavy products. We build clean, tested APIs and dashboards that scale with your business logic without becoming a maintenance burden.',
    features: ['Custom admin panels', 'REST & GraphQL APIs', 'Queue jobs & scheduling', 'Multi-tenant apps', 'Payment integrations', 'Role-based access control'],
    tech: ['Laravel', 'PHP', 'MySQL', 'Redis', 'Vue'],
    outcomes: ['Reliable backends', 'Faster feature delivery', 'Lower long-term cost'],
  },
  {
    icon: Smartphone,
    slug: 'mobile-app-development',
    heroImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&h=750&q=70',
    title: 'Mobile App Development',
    desc: 'Cross-platform mobile apps for iOS & Android with excellent performance and polished UX.',
    color: 'text-emerald-600 bg-emerald-50',
    gradient: 'from-emerald-500 to-teal-600',
    longDesc: 'Native-feeling mobile apps for iOS and Android from a single codebase. We focus on smooth UX, offline support, and store-ready quality so you launch with confidence.',
    features: [
      'iOS App Development',
      'Android App Development',
      'React Native apps',
      'Flutter App Development',
      'Ionic App Development',
      'IoT-connected mobile experiences',
      'App Store & Play Store launch',
      'Ongoing maintenance & updates',
    ],
    tech: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase'],
    outcomes: ['One codebase, two platforms', 'Faster time-to-store', 'Consistent UX'],
  },
  {
    icon: Tablet,
    slug: 'ios-development',
    heroImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1000&h=750&q=70',
    title: 'iOS Development',
    desc: 'Native iPhone and iPad apps built with Swift and SwiftUI — fast, polished, and App Store ready.',
    color: 'text-slate-700 bg-slate-100',
    gradient: 'from-slate-700 to-sky-500',
    longDesc: 'We design and build native iOS applications that feel at home on iPhone and iPad. From SwiftUI interfaces to solid architecture, App Store submission and ongoing updates — your product gets the performance and polish Apple users expect.',
    features: [
      'Native Swift & SwiftUI apps',
      'UIKit when needed for complex UI',
      'App Store submission & review support',
      'Push notifications & deep linking',
      'In-app purchases & subscriptions',
      'iPad and multi-device layouts',
      'Core Data & CloudKit sync',
      'CI builds and TestFlight delivery',
    ],
    tech: ['Swift', 'SwiftUI', 'UIKit', 'Xcode', 'Firebase', 'Combine'],
    outcomes: [
      'Buttery-smooth native performance',
      'Faster App Store approval cycles',
      'Maintainable, modern Swift codebase',
    ],
  },
  {
    icon: AppWindow,
    slug: 'android-development',
    heroImage: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=1000&h=750&q=70',
    title: 'Android Development',
    desc: 'Native Android apps with Kotlin and Jetpack — Material Design, Play Store ready, built for performance.',
    color: 'text-emerald-600 bg-emerald-50',
    gradient: 'from-emerald-500 to-teal-600',
    longDesc: 'We build native Android applications that feel fast and familiar on phones and tablets. Kotlin, Jetpack libraries, Material Design, and a clear path to Google Play — so your product reaches billions of devices with the quality users expect.',
    features: [
      'Native Kotlin & Jetpack Compose',
      'Material Design 3 interfaces',
      'Google Play submission support',
      'Push notifications & deep links',
      'In-app billing & subscriptions',
      'Tablet and foldable-friendly layouts',
      'Room, WorkManager & modern architecture',
      'CI builds and internal testing tracks',
    ],
    tech: ['Kotlin', 'Jetpack Compose', 'Android Studio', 'Firebase', 'Material 3'],
    outcomes: [
      'Smooth native Android performance',
      'Faster Play Console releases',
      'Clean, maintainable Kotlin codebase',
    ],
  },
  {
    icon: BrainCircuit,
    slug: 'ai-development',
    heroImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1000&h=750&q=70',
    title: 'AI Development',
    desc: 'AI-powered solutions and automation that cut manual work and accelerate business growth.',
    color: 'text-primary-600 bg-primary-50',
    gradient: 'from-violet-500 to-primary-600',
    longDesc: 'We integrate practical AI into real workflows — chatbots, document intelligence, recommendations, and process automation that save hours every week without overengineering.',
    features: ['Custom GPT / LLM apps', 'Process automation', 'Document & data extraction', 'Recommendation systems', 'Internal AI copilots', 'Secure private deployments'],
    tech: ['OpenAI', 'Python', 'LangChain', 'Vector DBs', 'AWS'],
    outcomes: ['Less manual work', 'Faster decisions', 'New product capabilities'],
  },
  {
    icon: Cloud,
    slug: 'cloud-solutions',
    heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&h=750&q=70',
    title: 'Cloud Solutions',
    desc: 'Scalable cloud infrastructure and DevOps to ensure high availability and smooth deployments.',
    color: 'text-sky-600 bg-sky-50',
    gradient: 'from-sky-500 to-blue-600',
    longDesc: 'Infrastructure that grows with you. We set up cloud environments, CI/CD, monitoring and cost controls so releases are boring — in the best way.',
    features: ['AWS / Azure / GCP setup', 'CI/CD pipelines', 'Docker & Kubernetes', 'Monitoring & alerts', 'Cost optimization', 'Disaster recovery plans'],
    tech: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions'],
    outcomes: ['Faster deployments', 'Higher uptime', 'Predictable costs'],
  },
  {
    icon: Boxes,
    slug: 'devops',
    heroImage: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=1000&h=750&q=70',
    title: 'DevOps',
    desc: 'CI/CD, infrastructure as code, and reliable cloud operations that keep releases fast and systems stable.',
    color: 'text-cyan-600 bg-cyan-50',
    gradient: 'from-cyan-500 to-primary-600',
    longDesc: 'We help teams ship faster with less drama. From CI/CD pipelines and infrastructure as code to monitoring, security, and cloud cost control — Cubixsol builds the operational backbone so your product stays reliable as you grow.',
    features: [
      'CI/CD pipelines (GitHub Actions, GitLab CI, Jenkins)',
      'Infrastructure as Code (Terraform, CloudFormation)',
      'Containerization with Docker & Kubernetes',
      'Cloud setup on AWS, GCP, and Azure',
      'Monitoring, logging & alerting',
      'Security scanning & secrets management',
      'Automated testing in the pipeline',
      'Release strategies (blue/green, canary)',
    ],
    tech: ['Docker', 'Kubernetes', 'Terraform', 'AWS', 'GitHub Actions', 'Prometheus'],
    outcomes: [
      'Faster, safer releases',
      'Fewer production incidents',
      'Clearer visibility into system health',
    ],
  },
  {
    icon: PenTool,
    slug: 'ui-ux-design',
    heroImage: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=1000&h=750&q=70',
    title: 'UI/UX Design',
    desc: 'Beautiful, user-centered designs that deliver engaging experiences and higher conversion rates.',
    color: 'text-pink-500 bg-pink-50',
    gradient: 'from-pink-500 to-fuchsia-600',
    longDesc: 'Design that feels obvious to users and intentional to stakeholders. Research, wireframes, high-fidelity UI and design systems that developers can actually ship.',
    features: ['User research & flows', 'Wireframes & prototypes', 'High-fidelity UI kits', 'Design systems', 'Usability testing', 'Dev handoff support'],
    tech: ['Figma', 'FigJam', 'Principle', 'Storybook'],
    outcomes: ['Clearer product direction', 'Higher engagement', 'Smoother build process'],
  },
  {
    icon: ShoppingCart,
    slug: 'ecommerce-solutions',
    heroImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&h=750&q=70',
    title: 'E-Commerce Solutions',
    desc: 'High-converting e-commerce stores with seamless shopping experiences and smart upsells.',
    color: 'text-orange-500 bg-orange-50',
    gradient: 'from-orange-500 to-amber-600',
    longDesc: 'Stores built to sell — fast product pages, smooth checkout, smart upsells and integrations with the tools you already use for inventory, shipping and marketing.',
    features: ['Custom storefronts', 'Checkout optimization', 'Payment gateways', 'Inventory sync', 'Upsells & subscriptions', 'Analytics dashboards'],
    tech: ['Shopify', 'WooCommerce', 'Next.js', 'Stripe', 'Laravel'],
    outcomes: ['Higher AOV', 'Lower cart abandonment', 'Easier operations'],
  },
  {
    icon: LineChart,
    slug: 'digital-marketing',
    heroImage: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c1c9?auto=format&fit=crop&w=1000&h=750&q=70',
    title: 'Digital Marketing',
    desc: 'SEO, PPC, and social strategies that increase visibility and generate quality leads.',
    color: 'text-amber-600 bg-amber-50',
    gradient: 'from-amber-500 to-yellow-600',
    longDesc: 'Growth channels that compound. Technical SEO, paid campaigns and content systems aligned to your funnel — measured by leads and revenue, not vanity metrics.',
    features: [
      'Search Engine Optimization (SEO)',
      'Social Media Marketing',
      'Email Marketing',
      'PPC Advertising',
      'Content Writing',
      'Analytics & Reporting',
    ],
    tech: ['GA4', 'Search Console', 'Meta Ads', 'Google Ads', 'HubSpot'],
    outcomes: ['More qualified traffic', 'Lower cost per lead', 'Clear attribution'],
  },
  {
    icon: Webhook,
    slug: 'api-development',
    heroImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&h=750&q=70',
    title: 'API Development & Integration',
    desc: 'Secure APIs, PMS connections, and payment gateways that connect your product to the tools your business runs on.',
    color: 'text-indigo-600 bg-indigo-50',
    gradient: 'from-indigo-500 to-violet-600',
    longDesc: 'We design and integrate APIs that keep systems in sync — from custom REST and GraphQL services to property management systems and payment providers. Reliable, documented, and built for the load your product will see in production.',
    features: [
      'Custom REST & GraphQL API design',
      'API Integration with third-party platforms',
      'PMS Integration (property & booking systems)',
      'Payment Gateways (Stripe, PayPal, local providers)',
      'Webhooks, events & real-time sync',
      'Auth, rate limits & API security',
      'Documentation & developer portals',
      'Monitoring, retries & error handling',
    ],
    tech: ['Node.js', 'Python', 'REST', 'GraphQL', 'Stripe', 'OAuth'],
    outcomes: [
      'Systems that stay in sync',
      'Faster checkout and bookings',
      'Fewer manual handoffs between tools',
    ],
  },
  {
    icon: LayoutTemplate,
    slug: 'cms-development',
    heroImage: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1000&h=750&q=70',
    title: 'CMS & WordPress Development Services',
    desc: 'Give your team a website they can manage with confidence. Cubixsol’s wordpress development services help businesses launch, update, and grow websites with clear navigation, flexible content tools, and dependable functionality. From company websites to online stores, we build CMS solutions around your customers, publishing needs, and business goals.',
    color: 'text-violet-600 bg-violet-50',
    gradient: 'from-violet-500 to-purple-600',
    longDesc: 'Give your team a website they can manage with confidence. Cubixsol’s wordpress development services help businesses launch, update, and grow websites with clear navigation, flexible content tools, and dependable functionality. From company websites to online stores, we build CMS solutions around your customers, publishing needs, and business goals.',
    ctaPrimaryText: 'Start a Project',
    ctaSecondaryText: 'Get a Free Estimate',
    subServicesTitle: 'Our CMS Development Services',
    subServicesIntro: 'Choose a CMS solution that supports how your business publishes content, serves customers, and manages products. We shape each project around your workflows, design requirements, integrations, and plans for growth.',
    subServicesItems: [
      {
        title: 'WordPress Development',
        desc: 'We build responsive WordPress websites with reusable page layouts, organised navigation, and straightforward editing tools, giving your team control over routine content updates. Our work covers theme setup, plugin configuration, contact forms, and the page structures your business needs to present its services clearly.',
      },
      {
        title: 'Custom WordPress Development Services',
        desc: 'Our custom WordPress development services cover customised themes, plugins, content types, and integrations for requirements that standard configurations cannot fully address. We translate your publishing workflows and business rules into practical features, while keeping the administration experience understandable for the people managing the website.',
      },
      {
        title: 'Shopify Development Services',
        desc: 'Our Shopify development services help you launch or improve an online store with branded themes, clear product pages, and intuitive navigation. We configure collections, connect suitable apps, and refine the shopping journey so customers can explore products and move toward checkout with fewer obstacles.',
      },
      {
        title: 'Magento Web Development Services',
        desc: 'Our Magento web development services support stores with detailed catalogues, custom functionality, and connected business systems. We develop storefront features, configure product structures, and integrate inventory or order tools according to your operational requirements and the capabilities of your chosen setup.',
      },
      {
        title: 'Drupal Web Development Services',
        desc: 'Our Drupal web development services support websites that need structured content, defined user permissions, and coordinated publishing workflows. We organise content types, configure editorial roles, and develop custom features to help multiple contributors manage information consistently across larger or more complex websites.',
      },
      {
        title: 'Headless CMS Development',
        desc: 'We connect a CMS to a separate website frontend through APIs, giving you more control over how content appears across digital experiences. Your editors manage structured content centrally, while we build the presentation layer around your design and functionality requirements.',
      },
    ],
    techTitle: 'Technologies We Use',
    techDesc: 'We work with WordPress, Shopify, Magento, and Drupal, using PHP where the platform or custom backend requires it. For headless projects, we can build the frontend with Next.js and connect it to your CMS through APIs. We select the stack around your content model, integrations, hosting requirements, and maintenance capacity, so the technology fits your team’s practical needs.',
    tech: ['WordPress', 'Shopify', 'Magento', 'Drupal', 'PHP', 'Next.js'],
    serviceProcessTitle: 'Our CMS Development Process',
    serviceProcessIntro: 'Our five-step process keeps requirements, review points, and launch responsibilities clear from the beginning.',
    serviceProcessSteps: [
      {
        stepNumber: '01',
        title: 'Discover',
        desc: 'We review your goals, audience, existing website, content, and technical constraints to define the project scope.',
      },
      {
        stepNumber: '02',
        title: 'Plan',
        desc: 'We map the site structure, choose the platform, and agree on features, milestones, and responsibilities.',
      },
      {
        stepNumber: '03',
        title: 'Build',
        desc: 'We develop layouts, configure editing tools, and connect the integrations included in your scope.',
      },
      {
        stepNumber: '04',
        title: 'Test',
        desc: 'We check responsive layouts, content workflows, forms, integrations, and key user journeys before approval.',
      },
      {
        stepNumber: '05',
        title: 'Launch & Support',
        desc: 'We coordinate deployment, walk your team through content updates, and arrange the agreed support activities.',
      },
    ],
    whyChooseTitle: 'Why Choose Cubixsol',
    whyChooseIntro: 'We focus on the details that make a CMS project easier to review, launch, and manage.',
    whyChooseItems: [
      {
        title: 'Quality you can review',
        desc: 'We use agreed requirements and testing checkpoints to assess functionality, usability, and content management before launch.',
      },
      {
        title: 'A plan that supports on-time delivery',
        desc: 'We define milestones, track dependencies, and raise blockers early so you can make timely decisions.',
      },
      {
        title: 'Transparent communication',
        desc: 'We explain scope, progress, and proposed changes, including their likely effect on cost and scheduling.',
      },
      {
        title: 'Ongoing support',
        desc: 'We agree on maintenance responsibilities and support coverage, helping your team plan for updates, fixes, and future improvements.',
      },
    ],
    ctaBannerTitle: 'Ready to Start Your Project?',
    ctaBannerDesc: 'Make your website easier to manage and ready for your next stage of growth. Talk to Cubixsol about WordPress development services that fit your content, customers, and business priorities. Share your requirements to get a clear starting point.',
    ctaBannerButtonText: 'Start a Project',
    ctaBannerButtonLink: '/contact',
    faqs: [
      {
        q: 'How much does CMS development cost?',
        a: 'CMS development costs depend on the platform, design complexity, content volume, integrations, and custom features. We review your requirements before preparing an estimate that outlines the scope, deliverables, and any ongoing services.',
      },
      {
        q: 'How long does a CMS development project take?',
        a: 'The timeline depends on project scope, content readiness, integrations, and approval cycles. A straightforward website generally requires less work than a custom store or migration. We agree on milestones after reviewing your requirements.',
      },
      {
        q: 'Should I choose standard WordPress or custom WordPress development?',
        a: 'A standard theme and suitable plugins can cover common website requirements. Custom development makes sense when you need distinctive layouts, specialised workflows, or integrations that existing tools cannot adequately support. Both approaches use WordPress.',
      },
      {
        q: 'Do you provide CMS maintenance after launch?',
        a: 'We can arrange maintenance for updates, backups, compatibility checks, and issue resolution within an agreed support scope. Coverage depends on your platform and hosting setup, and we clarify responsibilities and response expectations before work begins.',
      },
      {
        q: 'Can you migrate my existing website to a new CMS?',
        a: 'Yes. We assess your content, media, URLs, and integrations before planning the migration. The scope can include content mapping, redirects, and post-launch checks to reduce disruption and help preserve access to existing pages.',
      },
    ],
  },
  {
    icon: FileCode,
    slug: 'php-development',
    heroImage: 'https://images.unsplash.com/photo-1599507593499-a69270d22dc9?auto=format&fit=crop&w=1000&h=750&q=70',
    title: 'PHP Development',
    desc: 'Laravel, CodeIgniter, CakePHP, and ongoing PHP maintenance for reliable backend systems.',
    color: 'text-purple-600 bg-purple-50',
    gradient: 'from-purple-500 to-indigo-600',
    longDesc: 'PHP still powers a huge share of the web. We build and maintain Laravel, CodeIgniter, and CakePHP applications with modern practices — secure, testable, and ready for the next phase of your product.',
    features: [
      'CakePHP Development',
      'Laravel Development',
      'CodeIgniter Development',
      'PHP Maintenance and Support',
      'Legacy modernization',
      'API backends in PHP',
      'Security hardening & upgrades',
      'Performance and caching',
    ],
    tech: ['PHP', 'Laravel', 'CodeIgniter', 'CakePHP', 'MySQL', 'Redis'],
    outcomes: [
      'Stable, maintainable backends',
      'Safer upgrades from legacy code',
      'Faster feature delivery on PHP stacks',
    ],
  },
  {
    icon: Database,
    slug: 'data-migration-services',
    heroImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&h=750&q=70',
    title: 'Data Migration',
    desc: 'Software, website, application, SEO, and database migrations with minimal downtime and clear validation.',
    color: 'text-sky-600 bg-sky-50',
    gradient: 'from-sky-500 to-blue-600',
    longDesc: 'Moving systems is risky when it is rushed. We plan and execute software, website, application, SEO, and database migrations with cutover plans, validation, and rollback options so your business keeps running.',
    features: [
      'Software Migration',
      'Website Migration',
      'Application Migration',
      'SEO Migration',
      'Database Migration',
      'Content and media transfer',
      'URL mapping & redirects',
      'Post-migration hypercare',
    ],
    tech: ['SQL', 'ETL', 'AWS', 'Scripts', 'CDN', 'Search Console'],
    outcomes: [
      'Lower migration risk',
      'Preserved SEO equity',
      'Verified data after cutover',
    ],
  },
  {
    icon: Palette,
    slug: 'graphic-design',
    heroImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1000&h=750&q=70',
    title: 'Graphic Designing',
    desc: 'UI/UX, web and mobile design, social creatives, branding, and illustration that support real products.',
    color: 'text-pink-600 bg-pink-50',
    gradient: 'from-pink-500 to-rose-600',
    longDesc: 'Design that ships with your product — interfaces, marketing visuals, and brand systems. We cover UI/UX, web and mobile layouts, social media design, branding and identity, and illustration support when campaigns need a distinctive look.',
    features: [
      'UI/UX Designing',
      'Web design',
      'Mobile app design',
      'Social Media Design',
      'Branding and Identity Design',
      '3D Illustrations',
      'Design systems & components',
      'Handoff-ready production files',
    ],
    tech: ['Figma', 'Adobe Suite', 'Framer', 'Principle', 'Illustrator'],
    outcomes: [
      'Clearer product interfaces',
      'Stronger brand consistency',
      'Faster design-to-dev handoff',
    ],
  },
];

export const whyChoose = [
  {
    icon: Users2,
    title: 'Experienced Product Team',
    desc: 'Work with developers, designers, QA specialists, and project managers who understand both technical delivery and product usability.',
  },
  {
    icon: Clock,
    title: 'On-Time Delivery',
    desc: 'Defined milestones, realistic schedules, and regular progress updates keep your project focused and reduce avoidable delays.',
  },
  {
    icon: Zap,
    title: 'Transparent Process',
    desc: 'You always know what the team is building, what has been completed, and what comes next. There are no hidden workflows or unclear handoffs.',
  },
  {
    icon: ShieldCheck,
    title: 'Ongoing Support',
    desc: 'Our offshore software development company model supports product maintenance, feature improvements, performance optimization, and technical growth after launch.',
  },
];

export const processSteps = [
  { step: '01', title: 'Discover', desc: 'We clarify your users, business goals, product requirements, technical challenges, budget, and measures of success.' },
  { step: '02', title: 'Plan', desc: 'Our team defines the feature scope, suitable technology, project roadmap, responsibilities, milestones, and delivery schedule.' },
  { step: '03', title: 'Design and Develop', desc: 'Designers create the user experience while developers build the product through structured, reviewable development cycles.' },
  { step: '04', title: 'Test and Launch', desc: 'We test functionality, usability, compatibility, security, and performance before preparing the product for release.' },
  { step: '05', title: 'Support and Grow', desc: 'After launch, we monitor the product, resolve issues, study feedback, and help you plan valuable new features.' },
];
export const process = processSteps;


export const projects = [
  { title: 'HomeHub', category: 'Web Development', desc: 'A real estate platform for buying, renting and selling properties with advanced search.', tag: 'Web Development', color: 'from-slate-800 to-slate-950' },
  { title: 'TaskFlow SaaS', category: 'SaaS', desc: 'A comprehensive project management SaaS for teams to plan, collaborate and deliver.', tag: 'SaaS', color: 'from-indigo-500 to-blue-600' },
  { title: 'Pawfect Foods', category: 'E-Commerce', desc: 'An e-commerce store for premium pet food and accessories with seamless shopping.', tag: 'E-Commerce', color: 'from-amber-200 to-orange-300' },
  { title: 'FinGo Mobile App', category: 'Mobile Apps', desc: 'A personal finance app for budgeting, tracking expenses and achieving financial goals.', tag: 'Mobile Apps', color: 'from-blue-600 to-cyan-500' },
  { title: 'InsightAI', category: 'AI Solutions', desc: 'AI-powered analytics platform that transforms data into actionable business insights.', tag: 'AI Solutions', color: 'from-slate-900 to-purple-950' },
  { title: 'MediCare Plus', category: 'Web Development', desc: 'A healthcare platform connecting patients with doctors and managing appointments.', tag: 'Healthcare', color: 'from-sky-100 to-blue-200' },
];

export const team = [
  { name: 'Noman Ghaffer', role: 'CEO & Founder' },
  { name: 'Usman Tariq', role: 'CTO' },
  { name: 'Ayesha Khan', role: 'UI/UX Director' },
  { name: 'Abdul Rehman', role: 'Lead Developer' },
  { name: 'Hina Batool', role: 'Project Manager' },
];

export const values = [
  { title: 'Integrity', desc: 'We do the right thing, always – with honesty and transparency.' },
  { title: 'Innovation', desc: 'We embrace new ideas and technologies to build smarter solutions.' },
  { title: 'Collaboration', desc: 'We work as one team with our clients to achieve success.' },
  { title: 'Quality', desc: 'We deliver reliable, secure, and high-quality digital products.' },
  { title: 'Excellence', desc: 'We strive for excellence in everything we do, every single day.' },
];

export const clients = ['MONAT', 'livestay', 'Bravö', 'LORIS', 'zoe', 'GUNNER', 'SUTIEXCAPE', 'zoeboutique'];

export const stats = [
  { value: 200, suffix: '+', label: 'Projects Delivered' },
  { value: 150, suffix: '+', label: 'Happy Clients' },
  { value: 10, suffix: '+', label: 'Years of Experience' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
];

export const testimonials = [
  {
    quote: 'Cubixsol felt less like a vendor and more like an extension of our own team. They shipped fast without cutting corners on quality.',
    name: 'Sarah Malik',
    role: 'Founder, HomeHub',
  },
  {
    quote: 'Their AI automation work cut our manual ops time by 40%. Communication was clear from kickoff to launch.',
    name: 'James Carter',
    role: 'COO, TaskFlow SaaS',
  },
  {
    quote: 'We came in with a rough idea and left with a polished, scalable product. The Cubixsol team asked the right questions early on.',
    name: 'Ayesha Raza',
    role: 'CEO, Pawfect Foods',
  },
  {
    quote: 'On-time, on-budget, and genuinely invested in our growth. Our conversion rate jumped within weeks of launch.',
    name: 'Daniel Osei',
    role: 'Marketing Director, FinGo',
  },
];

export const estimatorFeatures = [
  { id: 'auth', label: 'User Authentication', cost: 1200, days: 4 },
  { id: 'payments', label: 'Payments & Checkout', cost: 2200, days: 6 },
  { id: 'admin', label: 'Admin Dashboard', cost: 1800, days: 5 },
  { id: 'ai', label: 'AI / Automation Features', cost: 3000, days: 8 },
  { id: 'mobile', label: 'Companion Mobile App', cost: 4500, days: 12 },
  { id: 'integrations', label: '3rd-Party Integrations', cost: 1500, days: 4 },
];

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Blog', to: '/blog' },
  { label: 'Careers', to: '/careers' },
  { label: 'Contact Us', to: '/contact' },
];

export const faqs = [
  { q: 'How quickly will you respond to my inquiry?', a: 'We typically respond to all inquiries within 24 business hours. Urgent requests get prioritized the same day.' },
  { q: 'Do you offer free consultations?', a: 'Yes. We offer a free, no-obligation consultation to discuss goals, timeline, and whether we are the right fit.' },
  { q: 'Which engagement model should I choose?', a: 'If scope is clear, project-based works best. For ongoing product work, dedicated teams or staff augmentation are usually more efficient. We help you pick during the discovery call.' },
  { q: 'What does a typical timeline look like?', a: 'MVPs often ship in 6–12 weeks. Larger platforms take longer and are broken into milestones so you see progress early.' },
  { q: 'Can you help with ongoing support after delivery?', a: 'Yes. We offer maintenance and support packages — bug fixes, performance monitoring, and feature iterations.' },
  { q: 'Do you work with startups and enterprises?', a: 'Both. We have helped early-stage founders launch MVPs and larger teams scale existing products with dedicated squads.' },
];


export const solutionGroups = [
  {
    title: 'Data Solutions',
    items: [
      { title: 'Data Engineering', slug: 'data-engineering', desc: 'Pipelines, warehouses, and reliable data platforms.' },
      { title: 'BI & Data Analytics', slug: 'bi-data-analytics', desc: 'Dashboards and insights that drive decisions.' },
      { title: 'Data Governance and Security', slug: 'data-governance-security', desc: 'Policies, access control, and data quality.' },
      { title: 'Data Migration', slug: 'data-migration', desc: 'Safe moves between systems with minimal downtime.' },
      { title: 'Data Scraping', slug: 'data-scraping', desc: 'Ethical collection and structuring of web data.' },
      { title: 'Oracle AI Data Platform', slug: 'oracle-aidp', desc: 'AIDP assessment, migration, and Oracle data platform engineering.' },
    ],
  },
  {
    title: 'Artificial Intelligence',
    items: [
      { title: 'Agentic AI', slug: 'agentic-ai', desc: 'Autonomous agents that plan and execute workflows.' },
      { title: 'Deep Learning', slug: 'deep-learning', desc: 'Models for vision, speech, and complex prediction.' },
      { title: 'Generative AI', slug: 'generative-ai', desc: 'LLMs and generative tools tailored to your domain.' },
      { title: 'Predictive Analysis', slug: 'predictive-analysis', desc: 'Forecasting demand, risk, and customer behavior.' },
      { title: 'Sentiment Analysis', slug: 'sentiment-analysis', desc: 'Understand customer voice at scale.' },
      { title: 'Data Science', slug: 'data-science', desc: 'Experimentation, modeling, and MLOps.' },
      { title: 'AI Consulting', slug: 'ai-consulting', desc: 'Strategy, readiness, and roadmap for AI adoption.' },
    ],
  },
  {
    title: 'E-Commerce',
    items: [
      { title: 'AI Chatbots & Customer Support', slug: 'ai-chatbots-support', desc: 'Conversational support that resolves and escalates smartly.' },
      { title: 'eCommerce Development', slug: 'ecommerce-development', desc: 'Storefronts built to convert and scale.' },
      { title: 'Voice Commerce', slug: 'voice-commerce', desc: 'Voice-driven shopping and ordering experiences.' },
      { title: 'Customer Segmentation', slug: 'customer-segmentation', desc: 'Smarter audiences for campaigns and personalization.' },
    ],
  },
  {
    title: 'Accessibility Tools',
    items: [
      { title: 'Image to Text', slug: 'image-to-text', desc: 'Free OCR — extract text from images in 200+ languages.', externalUrl: 'https://imagetotext.best/' },
      { title: 'Reescrever Texto', slug: 'reescrever-texto', desc: 'Rewrite and improve text for clarity and style.', externalUrl: 'https://reescrevertexto.io/' },
      { title: 'JPGA PDF', slug: 'jpg-a-pdf', desc: 'Convert JPG images to PDF quickly online.', externalUrl: 'https://jpgapdf.io/' },
      { title: 'JPG to PDF', slug: 'jpg-to-pdf', desc: 'Turn JPG files into polished PDF documents.', externalUrl: 'https://jpg2pdf.io/' },
      { title: 'AI SEO Auditor', slug: 'ai-seo-auditor', desc: 'AI-powered site audits for SEO, content, and technical health.', externalUrl: '/tools/ai-seo-auditor' },
    ],
  },
];

export const solutions = solutionGroups.flatMap((g) =>
  g.items.map((item) => ({ ...item, group: g.title }))
);


export const products = [
  /* —— Platform products (demo / portfolio) —— */
  {
    slug: 'workstream',
    name: 'Workstream',
    title: 'The All-in-One Management Tool Built for Enterprise Needs',
    tagline: 'Simplify workflows by 50%, boost communication, and empower employees — one platform.',
    desc: 'Streamline team operations and approvals with customizable workflows and real-time tracking.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&h=750&q=80',
    accent: 'from-blue-100 to-sky-50',
    heroTheme: 'navy',
    layout: 'B',
    stats: [['50%', 'Less process friction'], ['2x', 'Faster approvals'], ['1', 'Source of truth']],
    challenges: [
      { title: 'Drowning in paperwork?', body: 'Leave, expenses, and training requests pile up across tools and inboxes.' },
      { title: 'Unclear ownership', body: 'Teams chase updates instead of shipping work.' },
      { title: 'Tool sprawl', body: 'HR, ops, and finance each run a different stack — nothing talks.' },
    ],
    answers: [
      { title: 'Cost efficiency', body: 'One modular suite covers HR and ops workflows so you are not paying for five partial tools.' },
      { title: 'Security & access', body: 'SSO-ready design with role-based access for every module.' },
      { title: 'Scalability', body: 'Turn modules on as you grow — from leave and expenses to training and analytics.' },
    ],
    steps: [
      { title: 'Effortless setup', body: 'Sign in, invite teams, and go — no heavy configuration theater.' },
      { title: 'Modular features', body: 'Pick project logs, training, leave, expenses, and more.' },
      { title: 'Streamlined workflow', body: 'Automate repetitive approvals and reminders.' },
      { title: 'Powerful insights', body: 'See capacity, bottlenecks, and completion in one place.' },
    ],
  },
  {
    slug: 'hirestream',
    name: 'Hirestream',
    title: 'Recruitment Automation Tool',
    tagline: 'Pipelines that move candidates forward — not spreadsheets that stall them.',
    desc: 'Automate hiring pipelines, reduce manual effort, and make smarter recruitment decisions.',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&h=750&q=80',
    accent: 'from-cyan-100 to-teal-50',
    heroTheme: 'teal',
    layout: 'C',
    stats: [['3x', 'Faster shortlists'], ['60%', 'Less admin'], ['1 view', 'Every role']],
    challenges: [
      { title: 'Lost candidates', body: 'Applications scatter across inboxes and job boards.' },
      { title: 'Inconsistent process', body: 'Every recruiter runs a different pipeline.' },
      { title: 'Weak decisions', body: 'Hiring managers lack structured feedback and history.' },
    ],
    steps: [
      { title: 'Intake roles', body: 'Structured requisitions with scorecards.' },
      { title: 'Source & screen', body: 'Central applications and collaborative notes.' },
      { title: 'Interview loops', body: 'Schedules, feedback, and stage gates.' },
      { title: 'Offer & onboard', body: 'Clean handoff to HR with full history.' },
    ],
  },
  {
    slug: 'fix-alert',
    name: 'FixAlert',
    title: 'Real-time Maintenance Reporting',
    tagline: 'Report issues. Dispatch teams. Close the loop — from any site.',
    desc: 'Instantly report and resolve infrastructure issues with a centralized, mobile-friendly system.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=750&q=80',
    accent: 'from-orange-100 to-amber-50',
    heroTheme: 'orange',
    layout: 'A',
    stats: [['40%', 'Faster response'], ['2x', 'Issues closed'], ['1 app', 'Field + office']],
    challenges: [
      { title: 'Scattered tickets', body: 'Issues live in chats, email, and spreadsheets — nothing is the source of truth.' },
      { title: 'Slow handoffs', body: 'Field teams wait on unclear ownership while downtime grows.' },
      { title: 'No visibility', body: 'Managers cannot see open work, SLAs, or recurring problem sites.' },
    ],
    steps: [
      { title: 'Capture on site', body: 'Mobile report with photos, location, and priority in seconds.' },
      { title: 'Route smartly', body: 'Auto-assign by skill, zone, or severity.' },
      { title: 'Resolve & verify', body: 'Close with evidence and optional sign-off.' },
      { title: 'Learn patterns', body: 'Dashboards show hotspots and repeat failures.' },
    ],
  },
  {
    slug: 'schoolgram',
    name: 'Schoolgram',
    title: 'School Communication Suite',
    tagline: 'Parents informed. Staff aligned. One secure channel for the whole school.',
    desc: 'Bridge the gap between schools and parents with secure, real-time messaging and announcements.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&h=750&q=80',
    accent: 'from-violet-100 to-purple-50',
    heroTheme: 'violet',
    layout: 'B',
    stats: [['Real-time', 'Updates'], ['Secure', 'Messaging'], ['School-wide', 'Reach']],
    challenges: [
      { title: 'Missed messages', body: 'Important updates get buried in group chats.' },
      { title: 'Fragmented channels', body: 'SMS, email, and paper notices never stay in sync.' },
      { title: 'Trust & privacy', body: 'Schools need controlled, auditable communication.' },
    ],
    answers: [
      { title: 'One inbox', body: 'Announcements, class updates, and alerts in a single app experience.' },
      { title: 'Role-based access', body: 'Teachers, admin, and parents see only what they should.' },
      { title: 'Attendance-friendly', body: 'Works alongside how schools already operate day to day.' },
    ],
    steps: [
      { title: 'Onboard school', body: 'Classes, roles, and parent links.' },
      { title: 'Broadcast clearly', body: 'Targeted announcements with read signals.' },
      { title: 'Message safely', body: 'Threaded, moderated conversations.' },
      { title: 'Stay aligned', body: 'Calendar and event reminders built in.' },
    ],
  },
  /* —— Accessibility tools (live products) —— */
  {
    slug: 'image-to-text',
    name: 'Image to Text',
    title: 'Free Online OCR — Extract Text from Images',
    tagline: 'Upload an image, get editable text. 200+ languages, privacy-first, no signup.',
    desc: 'Professional OCR that converts JPG, PNG, PDF, HEIC and 70+ formats into accurate, editable text. Free, no registration, files auto-deleted after recognition.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&h=750&q=80',
    accent: 'from-sky-100 to-blue-50',
    heroTheme: 'navy',
    layout: 'B',
    externalUrl: 'https://imagetotext.best/',
    category: 'accessibility',
    stats: [['200+', 'Languages'], ['70+', 'Formats'], ['99%', 'OCR accuracy']],
    challenges: [
      { title: 'Locked text in images', body: 'Screenshots and scans are hard to copy, search, or edit.' },
      { title: 'Privacy concerns', body: 'Many OCR tools keep your uploads longer than you expect.' },
      { title: 'Language limits', body: 'Global teams need more than English-only recognition.' },
    ],
    steps: [
      { title: 'Upload image', body: 'Drag, browse, or paste — JPG, PNG, PDF, HEIC and more.' },
      { title: 'AI recognition', body: 'OCR runs with multi-language detection.' },
      { title: 'Copy or download', body: 'Get clean text in seconds.' },
      { title: 'Auto cleanup', body: 'Files are removed after processing for privacy.' },
    ],
  },
  {
    slug: 'reescrever-texto',
    name: 'Reescrever Texto',
    title: 'Rewrite Text for Clarity and Style',
    tagline: 'Improve tone, readability, and structure without losing your meaning.',
    desc: 'Online text rewriting tool to refine drafts, simplify language, and produce clearer copy for work, study, or publishing.',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&h=750&q=80',
    accent: 'from-violet-100 to-purple-50',
    heroTheme: 'violet',
    layout: 'A',
    externalUrl: 'https://reescrevertexto.io/',
    category: 'accessibility',
    stats: [['Fast', 'Rewrites'], ['Clear', 'Tone control'], ['Web', 'Ready']],
    challenges: [
      { title: 'Rough drafts', body: 'Ideas are there, but wording is hard to polish by hand.' },
      { title: 'Inconsistent voice', body: 'Emails, posts, and docs need a consistent style.' },
      { title: 'Time pressure', body: 'Rewriting from scratch slows every delivery.' },
    ],
    steps: [
      { title: 'Paste your text', body: 'Drop in the paragraph or document section you want improved.' },
      { title: 'Rewrite', body: 'Generate a clearer version while keeping intent.' },
      { title: 'Adjust', body: 'Tweak until the tone fits your audience.' },
      { title: 'Use anywhere', body: 'Copy into docs, CMS, or chat.' },
    ],
  },
  {
    slug: 'jpg-a-pdf',
    name: 'JPGA PDF',
    title: 'Convert JPG Images to PDF Online',
    tagline: 'Fast JPG → PDF conversion in the browser — simple and reliable.',
    desc: 'Turn one or more JPG images into a clean PDF document. Ideal for forms, scans, and sharing files that need a universal format.',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=1200&h=750&q=80',
    accent: 'from-orange-100 to-amber-50',
    heroTheme: 'orange',
    layout: 'C',
    externalUrl: 'https://jpgapdf.io/',
    category: 'accessibility',
    stats: [['JPG', 'to PDF'], ['Quick', 'Export'], ['No', 'Install']],
    challenges: [
      { title: 'Format friction', body: 'Recipients ask for PDF while you only have JPGs.' },
      { title: 'Desktop software', body: 'Installing converters for a one-off task is overkill.' },
      { title: 'Quality loss', body: 'Poor tools squash image quality in the PDF.' },
    ],
    steps: [
      { title: 'Select JPG', body: 'Upload the image(s) you want in the PDF.' },
      { title: 'Convert', body: 'Generate a PDF in moments.' },
      { title: 'Download', body: 'Save and share the file anywhere.' },
      { title: 'Done', body: 'No account required for standard use.' },
    ],
  },
  {
    slug: 'jpg-to-pdf',
    name: 'JPG to PDF',
    title: 'JPG to PDF Converter',
    tagline: 'Reliable image-to-PDF for documents, scans, and photo sets.',
    desc: 'Convert JPG files into PDF documents online — built for everyday document workflows and multi-page needs.',
    image: 'https://images.unsplash.com/photo-1568667256549-094345857347?auto=format&fit=crop&w=1200&h=750&q=80',
    accent: 'from-cyan-100 to-teal-50',
    heroTheme: 'teal',
    layout: 'A',
    externalUrl: 'https://jpg2pdf.io/',
    category: 'accessibility',
    stats: [['Multi', 'Page ready'], ['Clean', 'Output'], ['Free', 'Start']],
    challenges: [
      { title: 'Scattered images', body: 'Related scans stay as separate JPGs instead of one file.' },
      { title: 'Sharing limits', body: 'Some portals only accept PDF uploads.' },
      { title: 'Print workflows', body: 'Printing mixed JPGs is messy without a single PDF.' },
    ],
    steps: [
      { title: 'Upload JPGs', body: 'Add the images that belong in one document.' },
      { title: 'Order & convert', body: 'Build the PDF in the sequence you need.' },
      { title: 'Download PDF', body: 'Get a shareable, printable file.' },
      { title: 'Reuse', body: 'Come back anytime you need another conversion.' },
    ],
  },
  {
    slug: 'ai-seo-auditor',
    name: 'AI SEO Auditor',
    title: 'AI-Powered SEO Auditor',
    tagline: 'Scan your site for SEO issues, content gaps, and technical fixes — guided by AI.',
    desc: 'Cubixsol AI SEO Auditor reviews pages for technical SEO, on-page signals, and prioritised recommendations so teams know what to fix first.',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&h=750&q=80',
    accent: 'from-emerald-100 to-teal-50',
    heroTheme: 'teal',
    layout: 'B',
    externalUrl: '/tools/ai-seo-auditor',
    category: 'accessibility',
    stats: [
      ['AI', 'Page analysis'],
      ['Clear', 'Priorities'],
      ['Action', 'Checklists'],
    ],
    challenges: [
      { title: 'Unknown issues', body: 'Rankings slip while technical and content problems stay buried.' },
      { title: 'Noisy reports', body: 'Generic audit tools dump hundreds of alerts with little prioritisation.' },
      { title: 'Slow iteration', body: 'Teams need a short list of high-impact fixes, not a 50-page PDF.' },
    ],
    steps: [
      { title: 'Enter your URL', body: 'Point the auditor at the site or key landing pages.' },
      { title: 'AI scan', body: 'Technical, content, and on-page signals are evaluated together.' },
      { title: 'Prioritised report', body: 'See what matters most — severity and effort side by side.' },
      { title: 'Fix & recheck', body: 'Work the checklist and re-run to confirm progress.' },
    ],
  },
];


export const industries = [
  {
    slug: 'education',
    title: 'Education',
    icon: 'GraduationCap',
    short: 'Learning platforms, school systems, and engagement tools.',
    desc: 'Cubixsol designs and builds digital products for schools, universities, and EdTech companies — from learner engagement and LMS features to parent communication and multi-institution content delivery.',
    points: [
      'Learning platforms & LMS modules',
      'School & parent communication apps',
      'Content delivery at scale',
      'Progress & completion analytics',
      'Assessment and quiz engines',
      'Role-based portals for staff and students',
    ],
    testimonial: {
      quote: 'Working with Cubixsol felt like gaining a product team, not just a vendor. They understood our learners and shipped with care.',
      name: 'Product Lead',
      role: 'EdTech scale-up',
    },
    workAreas: [
      {
        title: 'K-12 school systems',
        body: 'Attendance-friendly portals, parent messaging, announcements, and class updates that staff actually use day to day.',
      },
      {
        title: 'Higher education & training',
        body: 'Program catalogs, cohort management, and completion tracking across departments or partner institutions.',
      },
      {
        title: 'EdTech product teams',
        body: 'Feature delivery on your roadmap — onboarding, engagement loops, and analytics that improve retention.',
      },
      {
        title: 'Corporate L&D',
        body: 'Role-based learning paths, manager visibility, and content that fits how employees actually learn at work.',
      },
    ],
    productsBuilt: [
      { name: 'Schoolgram', slug: 'schoolgram', blurb: 'School communication suite for parents, teachers, and admin.' },
      { name: 'Image to Text', slug: 'image-to-text', blurb: 'OCR for worksheets, notes, and scanned materials.' },
      { name: 'JPG to PDF', slug: 'jpg-to-pdf', blurb: 'Bundle scans and images into shareable PDFs.' },
    ],
    caseStudies: [
      {
        title: 'Parent–school messaging platform',
        result: 'Real-time announcements and secure threads replaced scattered WhatsApp groups for a multi-campus school network.',
        tags: ['Mobile', 'Messaging', 'Admin portal'],
      },
      {
        title: 'Learner engagement product',
        result: 'Modular courses, quizzes, and progress dashboards shipped for an EdTech team scaling beyond their MVP.',
        tags: ['LMS', 'Analytics', 'Web app'],
      },
      {
        title: 'Multi-org learning catalog',
        result: 'Unified catalog and reporting so institutions could see completion without juggling spreadsheets.',
        tags: ['SaaS', 'Reporting', 'Roles'],
      },
    ],
    stats: [
      { value: '19+', label: 'years of proven market experience' },
      { value: '750+', label: 'experts in Engineering, Data, AI, Design & QA' },
      { value: '550+', label: 'partnerships spanning across six verticals' },
      { value: '80%', label: 'clients rate us better than others' },
    ],
    approachTitle: 'The Cubixsol Approach',
    approachItems: [
      {
        title: 'We Lead with Design',
        subtitle: 'Our team of designers, skilled in product design, UI/UX, and accessibility, create experiences that are:',
        points: [
          { heading: 'Timely', text: 'We design at the pace users need, with rapid learning and iteration built in.' },
          { heading: 'Useful', text: 'Success is measured by how easily users achieve their goals.' },
          { heading: 'Delightful', text: 'We create thoughtful experiences that feel worthwhile.' },
        ],
      },
      {
        title: 'We Leverage Open Source',
        subtitle: 'With thousands of contributions to dozens of open-source projects, we have deep expertise that translates into:',
        points: [
          { heading: 'Sovereignty', text: 'Avoid vendor lock-in and securely deploy on-premises or in private clouds.' },
          { heading: 'Flexibility', text: 'Customize source code and choose licensing that fits your requirements.' },
          { heading: 'Economy', text: 'Reduce hosting, maintenance, and development costs through free, adaptable, AI-ready open-source technologies at greater scale.' },
        ],
      },
      {
        title: 'We Accelerate with AI',
        subtitle: 'We have been working with generative AI for over a decade, applying it to:',
        points: [
          { heading: 'Build Smarter Software', text: 'We integrate agentic workflows using LangGraph, open-weight, and frontier models tailored to user needs, prioritizing sovereignty and adaptability.' },
          { heading: 'Build It Faster Than Ever', text: 'Our teams use Codex, Claude, and multi-agent workflows while managing security, performance, cost, and governance without compromising speed or quality.' },
        ],
      },
    ],
    solutionsTitle: 'Our EdTech Solutions',
    solutionsSubtitle: 'Purpose-built solutions for education organizations, backed by the cross-industry capabilities every technology team needs.',
    solutionsItems: [
      {
        title: 'Modern LMS Systems for Desktop and Mobile',
        body: 'We have deep expertise in best-in-class open-source learning management systems, including Open edX, Moodle, and Edly — our own Open edX fork designed for the enterprise. Every solution comes with self-hosting or managed hosting on AWS, GCP, Oracle, and Azure.',
      },
      {
        title: 'Accelerated Content Production',
        body: "We have world-class capability to produce learning content of every kind: videos, interactive activities, assessments, and AI-based evaluations. Our Edly division's Compose product delivers the fastest possible course authoring experience, driven by AI and letting creators author directly in all major LMSes, including Canvas and Blackboard.",
      },
      {
        title: 'Data Management, Analytics and ML',
        body: "Our data engineering team has deep expertise in edTech data standards like Caliper and xAPI. Understanding, warehousing, and analyzing this data, and building ML-based prediction and forecasting pipelines on top of it, is Cubixsol's forte.",
      },
    ],
    servicesWeOffer: [
      'Custom LMS and learning portals',
      'Mobile apps for students and parents',
      'Assessment and certification flows',
      'Integrations (SIS, payment, SSO)',
      'Analytics and admin dashboards',
      'UI/UX for education products',
    ],
  },

  {
    slug: 'healthcare',
    title: 'Healthcare',
    icon: 'HeartPulse',
    short: 'Secure patient experiences and clinical operations software.',
    desc: 'We design and engineer healthcare software with privacy and reliability in mind — patient portals, scheduling, telehealth flows, and internal clinical tools that reduce friction for staff and patients.',
    points: [
      'HIPAA-compliant patient portals & apps',
      'WebRTC encrypted telehealth & video consults',
      'EHR/EMR integration via HL7 FHIR APIs',
      'E-prescriptions & digital pharmacy routing',
      'Clinical intake & automated triage workflows',
      'Role-based access & strict audit trails',
    ],
    testimonial: {
      quote: 'They balanced usability for clinicians with the compliance constraints we cannot ignore.',
      name: 'Operations Manager',
      role: 'Health services provider',
    },
    workAreas: [
      {
        title: 'Patient Engagement & Portals',
        body: 'Frictionless patient self-scheduling, pre-visit intake questionnaires, lab result viewing, and secure clinician messaging.',
      },
      {
        title: 'Telehealth & Virtual Care',
        body: 'Browser-based HD video consultation rooms with zero downloads, screen sharing, digital whiteboard, and live vitals telemetry.',
      },
      {
        title: 'Clinical Operations & Workflow',
        body: 'EHR-integrated staff dashboards that streamline nurse charting, patient room assignments, and diagnostic handoffs.',
      },
      {
        title: 'Remote Patient Monitoring (RPM)',
        body: 'IoT health device synchronization (blood pressure, glucose, pulse oximetry) with automated clinical threshold alert triggers.',
      },
    ],
    productsBuilt: [
      { name: 'MediConnect Telehealth', slug: 'mediconnect', blurb: 'Encrypted virtual clinic suite for outpatient care.' },
      { name: 'DocuCare Patient Portal', slug: 'docucare', blurb: 'Self-service patient appointment, charts, and billing access.' },
    ],
    caseStudies: [
      {
        title: 'Multi-Specialty Telehealth Platform',
        result: 'Built an encrypted WebRTC telehealth system handling 12,000+ monthly clinical consultations with 99.98% video reliability.',
        tags: ['WebRTC', 'HIPAA', 'Telehealth'],
      },
      {
        title: 'FHIR EHR Integration Pipeline',
        result: 'Unified legacy Cerner and Epic medical records into a single patient summary dashboard, cutting physician charting time by 32%.',
        tags: ['HL7 FHIR', 'EHR', 'Security'],
      },
      {
        title: 'Digital Patient Intake & Triage Suite',
        result: 'Replaced paper intake forms with contactless mobile check-in across 18 regional clinics, eliminating waiting room bottlenecks.',
        tags: ['Mobile UX', 'Triage', 'Portal'],
      },
    ],
    servicesWeOffer: [
      'Custom HIPAA-compliant web & mobile apps',
      'EHR / EMR interoperability (HL7 FHIR, SMART on FHIR)',
      'Encrypted telehealth & WebRTC video rooms',
      'Medical billing & insurance eligibility APIs',
      'Clinical workflow automation dashboards',
      'Healthcare UI/UX design & accessibility audits',
    ],
  },

  {
    slug: 'fintech',
    title: 'Finance & Fintech',
    icon: 'Landmark',
    short: 'Payments, dashboards, and compliant financial products.',
    desc: 'From customer-facing finance apps to internal risk and reporting tools, we help fintech and finance teams ship secure, auditable software that moves money and data with clarity.',
    points: [
      'PCI-DSS compliant payment & checkout flows',
      'Automated KYC / AML verification pipelines',
      'High-frequency ledger & reconciliation engines',
      'Open Banking & ISO 20022 messaging APIs',
      'Multi-currency digital wallet architectures',
      'Real-time fraud anomaly scoring & risk dashboards',
    ],
    testimonial: {
      quote: 'Cubixsol delivered a clean payment experience without cutting corners on controls.',
      name: 'CTO',
      role: 'Fintech startup',
    },
    workAreas: [
      {
        title: 'Payment Gateways & Checkout Orchestration',
        body: 'Smart routing across multiple payment processors (Stripe, Adyen, Braintree) with automatic fallbacks and 3D-Secure 2.2 support.',
      },
      {
        title: 'Neo-Banking & Digital Wallets',
        body: 'Virtual/physical debit card issuance (Marqeta/Lithic), account balances, P2P money transfers, and transaction categorization.',
      },
      {
        title: 'KYC, Identity & Compliance Workflows',
        body: 'Automated biometric liveness checks, document verification, AML sanctions screening, and audit trail record keeping.',
      },
      {
        title: 'Risk & Fraud Intelligence Dashboards',
        body: 'Machine learning velocity models, suspicious activity report (SAR) generation, and real-time transaction limits.',
      },
    ],
    productsBuilt: [
      { name: 'PayFlow Gateway', slug: 'payflow', blurb: 'Unified multi-currency payment checkout & tokenization engine.' },
      { name: 'LedgerPro', slug: 'ledgerpro', blurb: 'Double-entry accounting and automated transaction reconciliation.' },
    ],
    caseStudies: [
      {
        title: 'High-Volume Micro-Lending Engine',
        result: 'Engineered an automated credit underwriting API processing $45M+ in loan disbursements with sub-2-second decision latency.',
        tags: ['Credit Scoring', 'Microservices', 'Fintech'],
      },
      {
        title: 'Cross-Border B2B Payment Hub',
        result: 'Delivered an FX settlement platform supporting 28 currencies with automated SWIFT / SEPA routing and real-time reconciliation.',
        tags: ['FX Payments', 'ISO 20022', 'Multi-currency'],
      },
      {
        title: 'Embedded Neo-Bank Mobile Experience',
        result: 'Shipped a full-featured digital banking app with virtual cards and instant Apple Wallet / Google Pay provisioning in 4 months.',
        tags: ['Mobile Banking', 'Card Issuance', 'Security'],
      },
    ],
    servicesWeOffer: [
      'PCI-DSS compliant architecture design',
      'Payment processor integrations (Stripe, Adyen, Plaid)',
      'Digital wallet & ledger engineering',
      'KYC/AML identity verification flows',
      'Risk modeling & fraud detection portals',
      'Financial data visualization & analytics',
    ],
  },

  {
    slug: 'ecommerce',
    title: 'E-Commerce',
    icon: 'ShoppingCart',
    short: 'Stores, marketplaces, and conversion-focused commerce.',
    desc: 'We build high-converting storefronts, custom checkout, and commerce backends — with inventory, promotions, and analytics wired for growth.',
    points: [
      'Sub-second headless storefronts (Next.js, Remix, Hydrogen)',
      'High-converting 1-click checkout & payment gateways',
      'AI-driven product recommendations & visual search',
      'Multi-channel inventory & 3PL order routing sync',
      'Multi-vendor marketplace portals & vendor payouts',
      'Real-time customer lifetime value (LTV) & cart analytics',
    ],
    testimonial: {
      quote: 'Our conversion and ops visibility improved in the same release cycle.',
      name: 'Head of Digital',
      role: 'Retail brand',
    },
    workAreas: [
      {
        title: 'Headless Storefront Engineering',
        body: 'Custom storefronts built with Shopify Plus, MedusaJS, BigCommerce, or Commerce Layer for blazing speed and zero layout shift.',
      },
      {
        title: 'Checkout & Conversion Optimization',
        body: 'Custom cart drawers, 1-click Apple Pay/Google Pay checkout, auto-address verification, and personalized dynamic upsell modules.',
      },
      {
        title: 'Multi-Vendor Marketplaces',
        body: 'Vendor registration, automated commission splitting, individual merchant dashboards, and centralized catalog moderation.',
      },
      {
        title: 'OMS, ERP & 3PL Logistics Sync',
        body: 'Automated order routing across multiple fulfillment centers, inventory reconciliation with NetSuite/SAP, and automated return flows.',
      },
    ],
    productsBuilt: [
      { name: 'NovaStorefront', slug: 'novastorefront', blurb: 'Ultra-fast headless commerce framework with sub-0.5s TTFB.' },
      { name: 'CartBoost AI', slug: 'cartboost', blurb: 'Dynamic personalized checkout upsells and abandonment recovery.' },
    ],
    caseStudies: [
      {
        title: 'Global Direct-to-Consumer (DTC) Replatform',
        result: 'Migrated an omnichannel retail brand to headless Shopify Hydrogen, increasing mobile checkout conversions by 42% and boosting page speed to 98/100.',
        tags: ['Hydrogen', 'Shopify Plus', 'Conversion'],
      },
      {
        title: 'Multi-Vendor Artisan Marketplace',
        result: 'Built a marketplace connecting 450+ independent sellers with automated Stripe Connect payouts and unified shipping label generation.',
        tags: ['Marketplace', 'Stripe Connect', 'OMS'],
      },
      {
        title: 'High-Scale Flash Sale Infrastructure',
        result: 'Engineered auto-scaling backend architecture that handled 85,000 concurrent shoppers during Black Friday with zero checkout downtime.',
        tags: ['High Concurrency', 'Redis', 'Scale'],
      },
    ],
    servicesWeOffer: [
      'Headless commerce development (Shopify Plus, Medusa, Magento)',
      'Custom checkout & payment integrations',
      'Marketplace platform engineering',
      'Omnichannel inventory & ERP synchronization',
      'Conversion Rate Optimization (CRO) audits',
      'Mobile commerce apps (iOS & Android)',
    ],
  },

  {
    slug: 'real-estate',
    title: 'Real Estate',
    icon: 'Building2',
    short: 'Listings, portals, and property operations platforms.',
    desc: 'Property search, agent tools, and operations software for developers and agencies — fast listing experiences and reliable backend workflows.',
    points: [
      'Sub-minute MLS / IDX & RESO Web API synchronization',
      'Interactive spatial map search with Mapbox polygon filters',
      'Integrated 3D Matterport virtual tour & floor plan viewers',
      'Intelligent agent CRM & round-robin lead routing',
      'Digital offer management & e-signature closing vaults',
      'PMS integrations (Yardi, RealPage, AppFolio)',
    ],
    testimonial: {
      quote: 'Listings and leads finally lived in one system our agents actually use.',
      name: 'Sales Director',
      role: 'Property group',
    },
    workAreas: [
      {
        title: 'MLS/IDX Listing Portals',
        body: 'High-speed property search portals with neighborhood school ratings, transit scores, tax history, and automated price alert notifications.',
      },
      {
        title: 'Interactive Spatial & Map Exploration',
        body: 'Custom polygon drawing search, commute time radius filters, and interactive 3D site plan maps for master-planned communities.',
      },
      {
        title: 'Agent CRM & Lead Automation',
        body: 'Automated lead scoring, instant SMS notifications to on-duty agents, showing calendar scheduling, and commission pipeline tracking.',
      },
      {
        title: 'Property Management & Tenant Portals',
        body: 'Online rent collection, digital lease signing, maintenance ticketing with photo uploads, and owner payout reporting.',
      },
    ],
    productsBuilt: [
      { name: 'PropView IDX', slug: 'propview', blurb: 'Blazing-fast MLS search engine with interactive map filtering.' },
      { name: 'LeasePilot', slug: 'leasepilot', blurb: 'Digital tenant onboarding, screening, and automated lease signing.' },
    ],
    caseStudies: [
      {
        title: 'Luxury Brokerage Web & Map Portal',
        result: 'Designed and built a custom RESO-compliant listing platform that drove a 65% increase in online tour bookings across 8 metropolitan markets.',
        tags: ['RESO API', 'Mapbox', 'PropTech'],
      },
      {
        title: 'Commercial Property Management Suite',
        result: 'Delivered an integrated tenant portal for 1.2M sq. ft. of commercial office space, automating lease renewals and maintenance tracking.',
        tags: ['PMS', 'Tenant Portal', 'SaaS'],
      },
      {
        title: 'Automated Real Estate Lead Router',
        result: 'Engineered an AI-assisted lead qualification and SMS dispatch engine that reduced agent response times from 3 hours to 45 seconds.',
        tags: ['CRM', 'Automation', 'SMS'],
      },
    ],
    servicesWeOffer: [
      'Custom MLS / IDX listing portal development',
      'Interactive Mapbox & GIS spatial search tools',
      'Virtual tour & 3D walkthrough integrations',
      'Real estate CRM & agent automation tools',
      'Property management software (PMS) sync',
      'Digital contract & escrow workflow systems',
    ],
  },

  {
    slug: 'saas',
    title: 'SaaS',
    icon: 'Cloud',
    short: 'Multi-tenant products built to onboard, retain, and scale.',
    desc: 'We partner with SaaS teams on product engineering — from MVP to scale — with solid tenancy, billing hooks, admin, and customer-facing UX.',
    points: [
      'Multi-tenant architecture with PostgreSQL Row-Level Security',
      'Metered, tiered & seat-based Stripe billing engines',
      'Enterprise SSO (SAML 2.0 / Okta / Azure AD) & SCIM sync',
      'Granular Role-Based Access Control (RBAC) matrices',
      'Feature flags, canary deployments & A/B test pipelines',
      'Full-stack telemetry & product adoption analytics',
    ],
    testimonial: {
      quote: 'They thought in product metrics, not just tickets closed.',
      name: 'Founder',
      role: 'B2B SaaS',
    },
    workAreas: [
      {
        title: 'Multi-Tenant Backend Architecture',
        body: 'Scalable cloud infrastructure supporting isolated tenant data, custom subdomains, and automated tenant provisioning.',
      },
      {
        title: 'Billing, Subscriptions & Monetization',
        body: 'Complex pricing tier implementation, usage meters, self-serve upgrade flows, proration calculations, and automated dunning.',
      },
      {
        title: 'Enterprise Readiness & Security',
        body: 'SAML 2.0 SSO, audit logs, automated SCIM provisioning, IP allowlisting, and compliance export tooling for enterprise buyers.',
      },
      {
        title: 'Onboarding & Activation Loops',
        body: 'Frictionless self-serve onboarding wizards, interactive product tours, empty states, and behavioral trigger emails that lift Day-1 retention.',
      },
    ],
    productsBuilt: [
      { name: 'SaaSKit Pro', slug: 'saaskit', blurb: 'Production-ready multi-tenant SaaS starter with billing & auth.' },
      { name: 'TenantPulse', slug: 'tenantpulse', blurb: 'Product health scoring and churn prediction dashboard.' },
    ],
    caseStudies: [
      {
        title: 'B2B Workflow Automation SaaS',
        result: 'Architected and shipped a multi-tenant workflow SaaS from scratch to $1.2M ARR in 10 months with 99.99% system availability.',
        tags: ['Multi-Tenant', 'Stripe Billing', 'Node.js'],
      },
      {
        title: 'Enterprise SSO & Compliance Upgrade',
        result: 'Added Okta/Azure SAML SSO and SOC 2 audit logging to an existing SaaS platform, unblocking $800k in enterprise pipeline deals.',
        tags: ['SAML', 'Enterprise', 'Security'],
      },
      {
        title: 'Product-Led Growth (PLG) Onboarding Flow',
        result: 'Redesigned the self-serve signup and activation funnel, increasing free-to-paid conversion rate by 3.2x in 60 days.',
        tags: ['PLG', 'Onboarding', 'UX'],
      },
    ],
    servicesWeOffer: [
      'MVP architecture & rapid full-stack delivery',
      'Multi-tenant database design & security isolation',
      'Subscription billing & usage metering (Stripe/Paddle)',
      'Enterprise SSO & SCIM directory integration',
      'Feature flag & CI/CD pipeline setup',
      'Product UI/UX design & design systems',
    ],
  },

  {
    slug: 'logistics',
    title: 'Logistics',
    icon: 'Truck',
    short: 'Tracking, dispatch, and operations visibility on the move.',
    desc: 'Logistics software for dispatch, tracking, and partner coordination — mobile-friendly field tools and control-tower dashboards.',
    points: [
      'Real-time GPS telematics & fleet map tracking',
      'Dynamic multi-stop route optimization algorithms',
      'Mobile Electronic Proof of Delivery (ePOD) & scanning',
      'Geo-fencing alerts & automated micro-milestone updates',
      'TMS & WMS integrations (SAP, Oracle TM, Blue Yonder)',
      'Cold-chain IoT sensor telemetry & exception alerts',
    ],
    testimonial: {
      quote: 'Field and office teams finally saw the same status in real time.',
      name: 'Fleet Manager',
      role: 'Regional logistics',
    },
    workAreas: [
      {
        title: 'Dispatch & Fleet Management',
        body: 'Live fleet dispatch control towers, automated load assignment, driver shift scheduling, and hours-of-service compliance tracking.',
      },
      {
        title: 'Last-Mile Route Optimization',
        body: 'AI-driven routing that calculates optimal delivery sequences factoring in traffic, time windows, vehicle weight, and toll costs.',
      },
      {
        title: 'Driver Companion Mobile Apps',
        body: 'Turn-by-turn navigation, barcode scanning, digital signature capture, photo damage documentation, and instant offline sync.',
      },
      {
        title: 'Supply Chain Visibility & Customer Tracking',
        body: 'Branded live tracking pages for end recipients with live map pins, accurate ETAs, and automated SMS milestone updates.',
      },
    ],
    productsBuilt: [
      { name: 'FleetTower', slug: 'fleettower', blurb: 'Real-time fleet telematics, dispatch, and geo-fence tracking.' },
      { name: 'DeliverPass', slug: 'deliverpass', blurb: 'Contactless electronic proof of delivery (ePOD) mobile app.' },
    ],
    caseStudies: [
      {
        title: 'Regional Freight Dispatch & Telematics Hub',
        result: 'Deployed a real-time dispatch dashboard for 220+ commercial trucks, reducing deadhead miles by 19% and fuel costs by $140,000/yr.',
        tags: ['Telematics', 'GPS', 'Routing'],
      },
      {
        title: 'Last-Mile Delivery Driver Mobile App',
        result: 'Built an offline-first iOS/Android driver app with high-speed barcode scanning, cutting average stop time by 45 seconds per delivery.',
        tags: ['Mobile ePOD', 'Offline-First', 'Scanning'],
      },
      {
        title: 'End-to-End Customer Tracking Portal',
        result: 'Shipped a live customer delivery tracker handling 40,000+ daily package updates, reducing "Where Is My Order" support calls by 58%.',
        tags: ['Customer UX', 'Live Map', 'WebSockets'],
      },
    ],
    servicesWeOffer: [
      'Fleet tracking & dispatch portal development',
      'Route optimization & heuristic algorithms',
      'Driver mobile apps (ePOD, barcode scanning)',
      'TMS / WMS integration (SAP, Oracle, Blue Yonder)',
      'IoT sensor telematics & temperature monitoring',
      'Customer-facing real-time tracking experiences',
    ],
  },

  {
    slug: 'travel',
    title: 'Travel & Hospitality',
    icon: 'Plane',
    short: 'Booking journeys and guest experiences that convert.',
    desc: 'Booking flows, supplier integrations, and guest apps for travel and hospitality brands that need reliability at peak demand.',
    points: [
      'Multi-GDS & airline NDC aggregator APIs (Amadeus, Sabre)',
      'Dynamic packaging engines (Flights + Hotels + Activities)',
      'High-concurrency stress-tested booking infrastructure',
      'Mobile guest apps with BLE contactless room key access',
      'PMS & Channel Manager sync (Opera, Cloudbeds, Mews)',
      'Multi-currency pricing & automated loyalty rewards',
    ],
    testimonial: {
      quote: 'Peak season held up — and the booking UX stayed simple.',
      name: 'Digital Manager',
      role: 'Hospitality group',
    },
    workAreas: [
      {
        title: 'Flight & Hotel Booking Engines',
        body: 'High-speed flight search, fare matrix comparison, seat map selection, hotel room filtering, and instant PNR generation.',
      },
      {
        title: 'Dynamic Packaging & Yield Management',
        body: 'Automated bundle pricing algorithms combining flights, hotels, and excursions with customizable supplier commission markups.',
      },
      {
        title: 'Guest Experience & Mobile Room Keys',
        body: 'Native mobile guest apps supporting online check-in, Bluetooth digital door locks, in-app room service, and concierge chat.',
      },
      {
        title: 'Hospitality PMS & Channel Management',
        body: 'Real-time two-way synchronization of rates, availability, and guest profiles across Booking.com, Expedia, Airbnb, and direct booking channels.',
      },
    ],
    productsBuilt: [
      { name: 'VoyageEngine', slug: 'voyageengine', blurb: 'Sub-second multi-GDS flight and hotel aggregator engine.' },
      { name: 'StayKey Mobile', slug: 'staykey', blurb: 'Contactless guest check-in and BLE digital room key app.' },
    ],
    caseStudies: [
      {
        title: 'Global Tour Operator Booking Platform',
        result: 'Unified 14 supplier API feeds into a single dynamic package booking engine, increasing average booking value by 28%.',
        tags: ['GDS APIs', 'Dynamic Packaging', 'Scale'],
      },
      {
        title: 'Boutique Hotel Mobile Guest App',
        result: 'Shipped a contactless guest app with digital key access across 6 luxury properties, resulting in a 4.9/5 guest satisfaction score.',
        tags: ['BLE Key', 'Mobile App', 'Hospitality'],
      },
      {
        title: 'High-Traffic Flash Sale Travel Engine',
        result: 'Engineered auto-scaling booking infrastructure that processed 15,000 simultaneous booking checkouts during peak holiday season with 0 errors.',
        tags: ['High Concurrency', 'Redis Lock', 'Cloud'],
      },
    ],
    servicesWeOffer: [
      'Custom travel booking engine development',
      'GDS / NDC integrations (Amadeus, Sabre, Travelport)',
      'Dynamic packaging & revenue management software',
      'Hotel PMS & channel manager sync',
      'Mobile guest apps & digital key integration',
      'Travel loyalty program & points redemption engines',
    ],
  },

  {
    slug: 'technology',
    title: 'Technology',
    icon: 'Cpu',
    short: 'Platforms, developer tools, and internal tech products.',
    desc: 'For technology companies building platforms or internal tools, we embed as an engineering partner — architecture, delivery, and UI that matches product standards.',
    points: [
      'Internal Developer Platforms (IDP) on Kubernetes & Terraform',
      'High-throughput microservice & Kafka event bus backbones',
      'Distributed tracing & OpenTelemetry observability stacks',
      'Enterprise React & TypeScript design systems / component SDKs',
      'Zero-downtime CI/CD GitOps pipelines',
      'API gateway orchestration with gRPC & GraphQL',
    ],
    testimonial: {
      quote: 'They matched our engineering bar and moved at product speed.',
      name: 'VP Engineering',
      role: 'Tech company',
    },
    workAreas: [
      {
        title: 'Internal Developer Platforms & Tooling',
        body: 'Self-serve developer portals (Backstage), ephemeral preview environment spin-up, and standardized service scaffolding templates.',
      },
      {
        title: 'Event-Driven Microservice Architecture',
        body: 'Decoupled asynchronous event pipelines using Apache Kafka, RabbitMQ, and AWS SQS for resilient, high-volume data streams.',
      },
      {
        title: 'Design Systems & Component Libraries',
        body: 'Accessible, tokenized UI component libraries with automated Storybook testing, zero-runtime styling, and npm package publishing.',
      },
      {
        title: 'Observability, SRE & Cloud Infrastructure',
        body: 'Full-stack instrumentation with Prometheus, Grafana, OpenTelemetry, and Datadog to ensure 99.999% system availability.',
      },
    ],
    productsBuilt: [
      { name: 'DevScaffold CLI', slug: 'devscaffold', blurb: 'Internal CLI tool for spinning up microservices and preview environments in seconds.' },
      { name: 'CoreUI Design System', slug: 'coreui', blurb: 'Enterprise-grade React component library with WCAG 2.1 AA compliance.' },
    ],
    caseStudies: [
      {
        title: 'Internal Developer Platform Modernization',
        result: 'Architected a Kubernetes-based IDP that cut developer environment provisioning times from 2 days to 45 seconds for 180+ engineers.',
        tags: ['Kubernetes', 'IDP', 'DevOps'],
      },
      {
        title: 'High-Throughput Event Streaming Backbone',
        result: 'Designed a Kafka microservices pipeline processing 500,000+ events per second with sub-15ms message delivery latency.',
        tags: ['Kafka', 'gRPC', 'Distributed Systems'],
      },
      {
        title: 'Multi-Brand Enterprise Design System',
        result: 'Created a unified React/TypeScript design system deployed across 4 distinct SaaS products, reducing UI development cycles by 50%.',
        tags: ['Design System', 'React', 'Storybook'],
      },
    ],
    servicesWeOffer: [
      'Internal developer platform (IDP) engineering',
      'Event-driven architecture & microservices delivery',
      'Enterprise design systems & React component SDKs',
      'Cloud infrastructure as code (Terraform, AWS, GCP)',
      'API gateway & gRPC/GraphQL development',
      'Site Reliability Engineering (SRE) & observability setup',
    ],
  },
];
