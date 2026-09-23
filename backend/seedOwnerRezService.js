const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {
  console.log('DNS setServers error (ignored):', e.message);
}

const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Service = require('./models/Service');

async function seedOwnerRez() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 15000 });
    console.log('Connected successfully to MongoDB Atlas.');

    const ownerRezData = {
      slug: 'ownerrez-integration',
      title: 'OwnerRez Integration Services',
      cardTitle: 'OwnerRez Integration',
      menuTitle: 'OwnerRez Integration',
      icon: 'KeyRound',
      color: 'text-[#0066cc] bg-[#0066cc]/10',
      gradient: 'from-[#0066cc] to-[#00c2cb]',
      heroEyebrow: 'OWNERREZ INTEGRATION SERVICES',
      heroSubtitle: 'Custom OwnerRez Integration Solutions For Vacation Rental Businesses',
      heroTitle: 'Custom OwnerRez Integration Solutions For Vacation Rental Businesses',
      heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&h=800&q=80',
      desc: 'Cubixsol provides professional OwnerRez integration services to help vacation rental companies connect their property management system with powerful business applications. Our developers create customised integrations that improve automation, simplify property operations, and allow different software platforms to communicate efficiently.',
      longDesc: 'Cubixsol provides professional OwnerRez integration services to help vacation rental companies connect their property management system with powerful business applications. Our developers create customised integrations that improve automation, simplify property operations, and allow different software platforms to communicate efficiently.',
      additionalParagraph: 'Modern rental businesses depend on multiple applications to manage reservations, payments, communication, and daily operations. Our integration solutions help create a centralised workflow where your systems exchange information accurately and efficiently. We develop OwnerRez integrations that connect your PMS with essential tools, including Airbnb, Vrbo, Booking.com, payment gateways, CRM systems, accounting software, smart locks, and marketing platforms.',
      heroPrimaryBtnText: 'Schedule An OwnerRez Consultation',
      heroSecondaryBtnText: 'Explore Solutions',
      ctaPrimaryText: 'Schedule An OwnerRez Consultation',
      ctaSecondaryText: 'Explore Solutions',
      features: [
        '2-Way Multi-Channel OTA Synchronisation',
        'Custom OwnerRez Open API Connections',
        'Automated Payment & Accounting Integrations',
        'CRM, Guest Messaging & Review Workflows',
        'Smart Lock & Contactless Entry Automation'
      ],
      heroBadges: [
        '2-Way Multi-Channel OTA Synchronisation',
        'Custom OwnerRez Open API Connections',
        'Automated Payment & Accounting Integrations',
        'CRM, Guest Messaging & Review Workflows',
        'Smart Lock & Contactless Entry Automation'
      ],

      // Section 1: Connect OwnerRez With Your Business Systems
      subServicesTitle: 'Connect OwnerRez With Your Business Systems',
      subServicesIntro: 'Modern rental businesses depend on multiple applications to manage reservations, payments, communication, and daily operations. Our integration solutions help create a centralised workflow where your systems exchange information accurately and efficiently. We develop OwnerRez integrations that connect your PMS with essential tools, including:',
      subServicesItems: [
        {
          icon: 'Share2',
          tag: 'RENTAL MARKETPLACES',
          title: 'Airbnb, Vrbo, Booking.com, and other rental marketplaces',
          desc: 'Accurate multi-channel synchronization keeping your calendars, rates, restrictions, and reservation updates aligned across all leading booking channels.',
          pills: ['Airbnb Direct Sync', 'Vrbo API Bridge', 'Booking.com Rates'],
          colorTheme: 'blue'
        },
        {
          icon: 'CreditCard',
          tag: 'PAYMENT GATEWAYS',
          title: 'Payment gateways and financial platforms',
          desc: 'Secure payment integrations with Stripe, Authorize.Net, and merchant gateways for automatic payment captures, security deposit holds, and split settlements.',
          pills: ['Stripe / Merchant Gateways', 'Security Deposit Holds', 'Card Tokenization'],
          colorTheme: 'cyan'
        },
        {
          icon: 'Users',
          tag: 'CRM & GUEST PROFILES',
          title: 'CRM systems for guest relationship management',
          desc: 'Unify OwnerRez reservation records with HubSpot, Salesforce, and CRM suites to consolidate guest history, preferences, and loyalty data.',
          pills: ['Guest Consolidation', 'Loyalty Tracking', 'HubSpot / Salesforce'],
          colorTheme: 'blue'
        },
        {
          icon: 'PieChart',
          tag: 'ACCOUNTING & FINANCE',
          title: 'Accounting software',
          desc: 'Synchronise reservation financials, local occupancy taxes, cleaning fees, and owner disbursements with QuickBooks, Xero, or bespoke financial tools.',
          pills: ['QuickBooks & Xero', 'Tax & Fee Splitting', 'Owner Statements'],
          colorTheme: 'cyan'
        },
        {
          icon: 'KeyRound',
          tag: 'SMART LOCKS & ACCESS',
          title: 'Smart lock and automation solutions',
          desc: 'Seamless connections with Yale, August, Schlage, and RemoteLock to automatically generate time-sensitive digital door PINs for frictionless check-in.',
          pills: ['Keyless Entry PINs', 'Automated Check-in', 'Access Logging'],
          colorTheme: 'blue'
        },
        {
          icon: 'Mail',
          tag: 'MARKETING & PROMOTIONS',
          title: 'Marketing platforms',
          desc: 'Connect automated email and SMS platforms (Mailchimp, Klaviyo, ActiveCampaign) to drive repeat direct bookings, upsells, and digital guidebooks.',
          pills: ['Email Drips', 'Repeat Booking Loops', 'Upsell Funnels'],
          colorTheme: 'cyan'
        },
        {
          icon: 'Code2',
          tag: 'CUSTOM BUSINESS APPS',
          title: 'Custom business applications',
          desc: 'Tailor-made backend bridges, custom webhook listeners, and bespoke endpoints built precisely for your unique operational requirements.',
          pills: ['Custom Webhooks', 'ERP Bridges', 'Proprietary Apps'],
          colorTheme: 'blue'
        }
      ],

      // Section 2: Core Solutions
      coreSolutionsTitle: 'Specialised OwnerRez Integration Capabilities',
      coreSolutionsIntro: 'Our specialized integration modules bridge OwnerRez with every operational touchpoint of your vacation rental ecosystem.',
      coreSolutions: [
        {
          id: 'channel-management',
          title: 'OwnerRez Channel Management Integration',
          subtitle: 'Reliable Synchronisation & Accurate Multi-Channel Availability',
          desc: 'Managing properties across different booking channels requires reliable synchronisation. Our experts connect OwnerRez with multiple platforms to maintain accurate reservation and availability data. A connected channel management system allows property managers to reduce manual updates and maintain consistent information across all platforms. Our channel integration services include:',
          icon: 'Share2',
          badge: 'CHANNEL SYNC',
          features: [
            'Real-time booking synchronisation across all OTA channels',
            'Instant calendar updates preventing double bookings and date overlaps',
            'Centralised listing information management and content distribution',
            'Secure guest data transfer and unified contact record creation',
            'Automated reservation status updates across connected marketplaces'
          ]
        },
        {
          id: 'api-services',
          title: 'OwnerRez API Integration Services',
          subtitle: 'Secure & Scalable API-Based Connections Architecture',
          desc: 'Cubixsol specialises in custom OwnerRez API integration solutions that allow businesses to connect external applications with their rental management system. Our developers create secure and scalable connections based on specific operational requirements. Our API integration services include:',
          icon: 'Code2',
          badge: 'CUSTOM API ENGINEERING',
          features: [
            'Custom software connections tailored to bespoke operational workflows',
            'High-frequency data synchronisation solutions with bidirectional webhooks',
            'Third-party application integration across CRM, ERP, and bespoke tools',
            'Automated workflow development triggered on reservation events',
            'Comprehensive API testing, rate-limit handling, and performance optimisation'
          ]
        },
        {
          id: 'payment-accounting',
          title: 'OwnerRez Payment And Accounting Integration',
          subtitle: 'Financial Accuracy & Automated Transaction Management',
          desc: 'Financial accuracy is important for successful vacation rental management. Cubixsol connects OwnerRez with payment and accounting platforms to simplify transaction management and reporting. Our integrations help businesses manage payments more effectively and maintain organised financial records. Our solutions support:',
          icon: 'CreditCard',
          badge: 'FINANCIAL & BILLING',
          features: [
            'Direct online payment processing with multi-currency support',
            'Automated billing workflows and scheduled payment captures',
            'Accounting software connections with QuickBooks, Xero, and enterprise tools',
            'Real-time revenue data synchronisation and ledger reconciliation',
            'Financial reporting automation delivering deep RevPAR and ADR metrics'
          ]
        },
        {
          id: 'crm-communication',
          title: 'OwnerRez CRM And Guest Communication Integration',
          subtitle: 'Timely Responses & Stronger Guest Relationships Throughout The Journey',
          desc: 'Guest relationships play a major role in vacation rental success. We integrate OwnerRez with CRM and communication tools to improve guest interactions throughout the rental journey. Connected communication systems provide timely responses and build stronger relationships with guests. Our solutions can include:',
          icon: 'MessageSquare',
          badge: 'GUEST MESSAGING & CRM',
          features: [
            'Automated guest messages sent via email, SMS, and WhatsApp',
            'Customer database synchronisation with unified stay histories',
            'Email marketing connections for targeted post-stay rebooking campaigns',
            'Follow-up automation and 5-star review collection request drips',
            'Personalized guest experience workflows with digital guidebook dispatching'
          ]
        },
        {
          id: 'smart-lock',
          title: 'OwnerRez Smart Lock Integration',
          subtitle: 'Self-Service Contactless Check-In & Automated Property Access',
          desc: 'Self-service check-in solutions provide convenience for guests and reduce operational workload. Cubixsol creates OwnerRez smart lock integrations that support automated property access. Our smart lock solutions include:',
          icon: 'KeyRound',
          badge: 'SMART LOCKS & IOT',
          features: [
            'Automated digital key management tied to reservation check-in/out dates',
            'Automated access code generation delivered via SMS and email',
            'Frictionless guest entry automation with ID verification checks',
            'Remote access control and real-time lock battery health monitoring',
            'Smart home connectivity across thermostats, noise sensors, and lights'
          ]
        }
      ],

      // Section 3: Process
      processTitle: 'Our OwnerRez Integration Process',
      processIntro: 'Cubixsol follows a professional process to develop successful OwnerRez integration solutions:',
      serviceProcessTitle: 'Our OwnerRez Integration Process',
      serviceProcessIntro: 'Cubixsol follows a professional process to develop successful OwnerRez integration solutions:',
      serviceProcessSteps: [
        {
          stepNumber: '01',
          title: 'Requirement Analysis',
          desc: 'Our team evaluates your business operations, existing tools, tech stack, and integration goals.',
          icon: 'Compass'
        },
        {
          stepNumber: '02',
          title: 'Solution Architecture',
          desc: 'We design a technical approach, API data mapping, and security protocols based on your required features.',
          icon: 'Workflow'
        },
        {
          stepNumber: '03',
          title: 'Development And Configuration',
          desc: 'Our developers build, test, and connect the required API bridges, webhooks, and secure system connections.',
          icon: 'Code2'
        },
        {
          stepNumber: '04',
          title: 'Testing And Deployment',
          desc: 'We check functionality, multi-channel calendar parity, security, and data accuracy before implementation.',
          icon: 'ShieldCheck'
        },
        {
          stepNumber: '05',
          title: 'Ongoing Support',
          desc: 'Our team provides technical assistance, monitoring, and proactive updates to maintain smooth system performance.',
          icon: 'RefreshCw'
        }
      ],

      // Section 4: Why Choose
      whyChooseTitle: 'Why Choose Cubixsol For OwnerRez Integration?',
      whyChooseIntro: 'Cubixsol creates OwnerRez integrations that focus on flexibility, customisation, and operational efficiency. Our team understands that every vacation rental business has different processes, reporting needs, and technology requirements.\n\nWe develop solutions that connect OwnerRez with your preferred tools while maintaining smooth data flow across your business systems. From custom API development to automation workflows and third-party connections, Cubixsol helps rental companies build a technology setup that supports long-term growth.',
      whyChooseItems: [
        {
          title: 'Dedicated OwnerRez & PMS Expertise',
          desc: 'Our engineers specialize in OwnerRez Open API, custom webhook pipelines, and vacation rental property automation.'
        },
        {
          title: 'Custom API Bridges & Webhooks',
          desc: 'Tailored backend connectors ensuring your PMS, ERP, and payment gateways communicate effortlessly with OwnerRez.'
        },
        {
          title: 'Zero Double-Booking Guarantee',
          desc: 'Sub-second synchronization logic ensuring calendar parity and accurate rate availability across all connected marketplaces.'
        },
        {
          title: 'Scalable For Growing Portfolios',
          desc: 'Architectures engineered to seamlessly handle multiple properties, automated security deposits, and multi-currency pricing.'
        },
        {
          title: 'End-to-End Workflow Automation',
          desc: 'Eliminate repetitive manual tasks by automating guest messaging, smart lock codes, and team turnover notifications.'
        },
        {
          title: 'Dedicated Post-Launch Support',
          desc: '24/7 system monitoring, proactive API version updates, and rapid engineering assistance for continuous uptime.'
        }
      ],

      // Section 5: FAQs
      faqTitle: 'Frequently Asked Questions',
      faqIntro: 'Got questions about integrating OwnerRez with your existing tools? Find clear answers below.',
      faqs: [
        {
          q: 'What OwnerRez integration services does Cubixsol provide?',
          a: 'Cubixsol develops custom OwnerRez integrations with booking platforms, payment systems, CRM tools, smart devices, accounting software, and business applications.'
        },
        {
          q: 'Can OwnerRez integrate with Airbnb and other booking channels?',
          a: 'Yes, OwnerRez supports connections with rental marketplaces, and Cubixsol can develop customised solutions for improved synchronisation.'
        },
        {
          q: 'Does Cubixsol offer OwnerRez API integration?',
          a: 'Yes, our developers build API-based integrations that connect OwnerRez with external platforms and applications.'
        },
        {
          q: 'Can OwnerRez connect with smart lock systems?',
          a: 'Yes, OwnerRez can integrate with smart access solutions to support automated check-in and property access management.'
        },
        {
          q: 'How does OwnerRez integration improve rental operations?',
          a: 'OwnerRez integration helps businesses automate workflows, improve data accuracy, and manage multiple rental processes more efficiently.'
        }
      ],

      // SEO
      seo: {
        metaTitle: 'OwnerRez Integration Services | Vacation Rental Automation | Cubixsol',
        metaDescription: 'Expert OwnerRez integration services by Cubixsol. Connect OwnerRez with Airbnb, Vrbo, smart locks, payment gateways, CRM, and custom APIs for automated rental management.',
        keywords: 'OwnerRez integration, OwnerRez API integration, OwnerRez channel manager, OwnerRez smart lock, PMS integration, vacation rental automation, Cubixsol',
        ogTitle: 'OwnerRez Integration Services | Vacation Rental Automation | Cubixsol',
        ogDescription: 'Connect OwnerRez with your rental channels, smart locks, payment gateways, and CRM into one seamless automated platform.',
        ogImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&h=800&q=80',
        canonicalUrl: 'https://cubixsol.com/ownerrez-integration'
      }
    };

    console.log('Upserting OwnerRez service in MongoDB...');
    const result = await Service.findOneAndUpdate(
      { slug: 'ownerrez-integration' },
      { $set: ownerRezData },
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
    );

    console.log('✅ Successfully seeded OwnerRez Integration Service:', result.slug);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding OwnerRez service:', error);
    process.exit(1);
  }
}

seedOwnerRez();
