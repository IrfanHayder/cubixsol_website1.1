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

async function seedLodgify() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 15000 });
    console.log('Connected successfully to MongoDB Atlas.');

    const lodgifyData = {
      slug: 'lodgify-integration',
      title: 'Lodgify Integration Services',
      cardTitle: 'Lodgify Integration',
      menuTitle: 'Lodgify Integration',
      icon: 'Globe',
      color: 'text-[#00a4d8] bg-[#00a4d8]/10',
      gradient: 'from-[#00a4d8] to-[#f5a623]',
      heroEyebrow: 'LODGIFY INTEGRATION SERVICES',
      heroSubtitle: 'Lodgify Integration Solutions For Vacation Rental Automation',
      heroTitle: 'Lodgify Integration Solutions For Vacation Rental Automation',
      heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&h=800&q=80',
      desc: 'Cubixsol extends Lodgify functionality through reliable integrations to meet your business requirements. Our professional Lodgify integration services connect your booking platform with powerful digital tools. Our developers create customised integrations to improve reservation management, automate workflows, and enhance the guest experience.',
      longDesc: 'Cubixsol extends Lodgify functionality through reliable integrations to meet your business requirements. Our professional Lodgify integration services connect your booking platform with powerful digital tools. Our developers create customised integrations to improve reservation management, automate workflows, and enhance the guest experience.',
      additionalParagraph: 'Vacation rental companies need different systems to manage bookings, payments, communication, and daily operations. Our integration services create a connected environment. We develop Lodgify integrations to connect your platform with essential business solutions including booking channels, direct booking engines, payment gateways, CRM and marketing tools, smart locks, and accounting software.',
      heroPrimaryBtnText: 'Schedule A Lodgify Consultation',
      heroSecondaryBtnText: 'Explore Solutions',
      ctaPrimaryText: 'Schedule A Lodgify Consultation',
      ctaSecondaryText: 'Explore Solutions',
      features: [
        '2-Way Channel & OTA Synchronisation',
        'Custom Lodgify API Integration',
        'Direct Booking Engine Connectivity',
        'Smart Lock & Access Automation',
        'Payment Gateway & CRM Integration'
      ],
      heroBadges: [
        '2-Way Channel & OTA Synchronisation',
        'Custom Lodgify API Integration',
        'Direct Booking Engine Connectivity',
        'Smart Lock & Access Automation',
        'Payment Gateway & CRM Integration'
      ],

      // Section 1: Connect Lodgify With Your Business Applications
      subServicesTitle: 'Connect Lodgify With Your Business Applications',
      subServicesIntro: 'Vacation rental companies need different systems to manage bookings, payments, communication, and daily operations. Our integration services create a connected environment. We develop Lodgify integrations to connect your platform with essential business solutions, including:',
      subServicesItems: [
        {
          icon: 'Share2',
          tag: 'CHANNELS & OTAS',
          title: 'Airbnb, Booking.com, Vrbo, and other booking channels',
          desc: 'Accurate multi-channel synchronization keeping your calendars, rates, restrictions, and reservation updates aligned across all leading booking channels.',
          pills: ['Airbnb Sync', 'Booking.com', 'Vrbo & Major OTAs'],
          colorTheme: 'gold'
        },
        {
          icon: 'Globe',
          tag: 'DIRECT BOOKINGS',
          title: 'Direct booking websites',
          desc: 'Connect your Lodgify booking engine directly to custom websites for direct guest reservations, instant quote calculations, and automated deposit handling.',
          pills: ['Custom Web Engine', 'Instant Booking', 'Zero Commission'],
          colorTheme: 'navy'
        },
        {
          icon: 'CreditCard',
          tag: 'PAYMENTS & BILLING',
          title: 'Payment processing platforms',
          desc: 'Secure payment integrations with Stripe, PayPal, and merchant gateways for automatic payment captures, damage deposit holds, and split settlements.',
          pills: ['Stripe & Merchant APIs', 'Security Deposits', 'Automated Receipts'],
          colorTheme: 'gold'
        },
        {
          icon: 'Users',
          tag: 'CRM & MARKETING',
          title: 'CRM and marketing automation tools',
          desc: 'Integrate Lodgify with HubSpot, ActiveCampaign, and Mailchimp to capture guest contact details, build loyalty campaigns, and automate follow-ups.',
          pills: ['HubSpot / Klaviyo', 'Guest Segmentation', 'Repeat Booking Loops'],
          colorTheme: 'navy'
        },
        {
          icon: 'KeyRound',
          tag: 'SMART ACCESS & IOT',
          title: 'Smart lock systems',
          desc: 'Seamless connections with Yale, August, Schlage, and RemoteLock to automatically generate time-sensitive digital door PINs for frictionless check-in.',
          pills: ['Keyless Digital PINs', 'Automated Check-in', 'Access Logging'],
          colorTheme: 'gold'
        },
        {
          icon: 'PieChart',
          tag: 'FINANCE & ACCOUNTING',
          title: 'Accounting applications',
          desc: 'Synchronise reservation financials, local occupancy taxes, cleaning fees, and owner disbursements with QuickBooks, Xero, or bespoke financial tools.',
          pills: ['QuickBooks / Xero', 'Tax & Fee Splitting', 'Owner Statements'],
          colorTheme: 'navy'
        },
        {
          icon: 'MessageSquare',
          tag: 'GUEST MESSAGING',
          title: 'Guest communication solutions',
          desc: 'Connect automated SMS, WhatsApp, and email delivery platforms to provide real-time booking confirmations, directions, and digital guidebooks.',
          pills: ['WhatsApp & SMS Drips', 'Digital Guidebooks', 'Real-time Alerts'],
          colorTheme: 'gold'
        }
      ],

      // Section 2: Core Solutions
      coreSolutionsTitle: 'Specialised Lodgify Integration Capabilities',
      coreSolutionsIntro: 'Explore how our dedicated integration modules connect Lodgify to every critical layer of your property operations.',
      coreSolutions: [
        {
          id: 'channel-integration',
          title: 'Lodgify Airbnb And Channel Integration Services',
          subtitle: 'Accurate Multi-Channel Synchronization & Calendar Parity',
          desc: 'Managing listings across multiple rental channels requires accurate synchronisation. We integrate Lodgify with major booking platforms to maintain updated reservations, availability, and property information. Our channel integration solutions support:',
          icon: 'Share2',
          badge: 'CHANNELS & OTAS',
          features: [
            'Reservation synchronisation across all connected channels',
            'Real-time calendar updates to prevent double bookings',
            'Centralised listing management and content distribution',
            'Guest information transfer and contact record unification',
            'Automated booking workflows triggered on new reservations'
          ]
        },
        {
          id: 'api-development',
          title: 'Lodgify API Integration Development',
          subtitle: 'Secure API-Based Solutions For Advanced Software Connections',
          desc: 'We offer custom Lodgify API integration services for businesses that need advanced software connections. Our developers build secure API-based solutions that allow Lodgify to communicate with external applications. Our Lodgify API services include:',
          icon: 'Code2',
          badge: 'CUSTOM API ENGINEERING',
          features: [
            'Custom API development tailored to business operational requirements',
            'Third-party application integration across CRM, ERP, and bespoke software',
            'Reliable data synchronisation with bidirectional webhook handlers',
            'Intelligent workflow automation and event-driven pipelines',
            'Comprehensive API testing, rate-limit handling, and performance optimisation'
          ]
        },
        {
          id: 'direct-booking',
          title: 'Lodgify Direct Booking Website Integration',
          subtitle: 'Maximise Profit Margins With High-Converting Direct Channels',
          desc: 'Direct bookings help rental businesses build stronger customer relationships and reduce dependency on third-party platforms. Cubixsol creates Lodgify integrations that improve direct booking workflows. Our solutions can support:',
          icon: 'Globe',
          badge: 'DIRECT BOOKING ENGINE',
          features: [
            'Seamless website booking connections with custom frontends',
            'Automated reservation processing and real-time validation',
            'Instant availability synchronisation with zero latency',
            'Comprehensive guest data management and profile creation',
            'Secure online payment integration with multi-currency support'
          ]
        },
        {
          id: 'smart-lock-integration',
          title: 'Lodgify Smart Lock Integration',
          subtitle: 'Keyless Contactless Self-Check-in & Automated Access',
          desc: 'Smart access technology allows property managers to offer convenient self-check-in experiences. We connect Lodgify with smart lock systems to automate property access. Our smart lock integration services include:',
          icon: 'KeyRound',
          badge: 'SMART HARDWARE & IOT',
          features: [
            'Digital access code creation tied directly to reservation dates',
            'Automated guest entry and contactless self-check-in flows',
            'Check-in workflow automation with SMS/email code delivery',
            'Remote access management and lock battery health monitoring',
            'Smart device connectivity spanning locks, thermostats, and sensors'
          ]
        },
        {
          id: 'payment-crm-integration',
          title: 'Lodgify Payment And CRM Integration',
          subtitle: 'Unified Financial Transactions & Guest Relationship Management',
          desc: 'Effective payment management and customer communication are essential for rental success. We integrate Lodgify with payment platforms and CRM systems to organise business operations. Our integration solutions include:',
          icon: 'CreditCard',
          badge: 'FINANCIAL & CRM PIPELINES',
          features: [
            'Direct payment gateway connections with automated tokenization',
            'Real-time transaction synchronisation and bookkeeping reconciliation',
            'Guest profile management consolidating booking history and preferences',
            'Email marketing automation for pre-arrival and post-stay campaigns',
            'Customer relationship workflows driving repeat direct bookings'
          ]
        },
        {
          id: 'automation-workflow',
          title: 'Lodgify Automation And Workflow Integration',
          subtitle: 'Eliminate Repetitive Tasks & Boost Operational Efficiency',
          desc: 'Cubixsol helps rental businesses automate repetitive tasks by connecting Lodgify with different business tools. Automation solutions can improve efficiency and reduce administrative workload. Our workflow integrations support:',
          icon: 'Workflow',
          badge: 'AUTOMATION & WORKFLOWS',
          features: [
            'Automated guest notifications for confirmations, check-in, and check-out',
            'Instant reservation updates across housekeeping and maintenance teams',
            'Team alerts for urgent property maintenance or guest requests',
            'Automated customer follow-ups and 5-star review collection drips',
            'Operational task management and turnover schedule dispatching'
          ]
        }
      ],

      // Section 3: Process
      processTitle: 'Our Lodgify Integration Process',
      processIntro: 'Cubixsol follows a structured process to deliver successful Lodgify integration solutions:',
      serviceProcessTitle: 'Our Lodgify Integration Process',
      serviceProcessIntro: 'Cubixsol follows a structured process to deliver successful Lodgify integration solutions:',
      serviceProcessSteps: [
        {
          stepNumber: '01',
          title: 'Business Requirement Analysis',
          desc: 'Our team reviews your current systems, operational goals, existing software stack, and required integration features.',
          icon: 'Compass'
        },
        {
          stepNumber: '02',
          title: 'Integration Planning',
          desc: 'We design a technical roadmap, API schema mapping, and security architecture based on your operational workflow.',
          icon: 'Workflow'
        },
        {
          stepNumber: '03',
          title: 'Development And Setup',
          desc: 'Our developers build, test, and configure the required API bridges, webhooks, and secure system connections.',
          icon: 'Code2'
        },
        {
          stepNumber: '04',
          title: 'Testing And Deployment',
          desc: 'We verify end-to-end functionality, booking synchronisation, security, and data accuracy before launching.',
          icon: 'ShieldCheck'
        },
        {
          stepNumber: '05',
          title: 'Support And Maintenance',
          desc: 'Our team provides ongoing technical assistance, monitoring, and proactive updates after implementation.',
          icon: 'RefreshCw'
        }
      ],

      // Section 4: Why Choose
      whyChooseTitle: 'Why Choose Cubixsol For Lodgify Integration?',
      whyChooseIntro: 'We connect Lodgify with your website, booking channels, payment systems, and operational tools into one efficient workflow. Our solutions improve reservation accuracy, simplify daily tasks, and support the growth of your rental business.\n\nVacation rental businesses get more value from direct bookings, automation, and seamless guest experiences. Our team understands the needs of independent hosts and rental operators. We deliver Lodgify integrations that align with your business model and provide long-term flexibility.',
      whyChooseItems: [
        {
          title: 'Full Hospitality Ecosystem Connectivity',
          desc: 'We integrate Lodgify with OTAs, payment gateways, smart locks, CRMs, and accounting platforms into one coherent pipeline.'
        },
        {
          title: 'Custom Lodgify API Engineering',
          desc: 'Tailor-made backend bridges, custom webhook listeners, and bespoke endpoints built precisely for your unique operational requirements.'
        },
        {
          title: 'Accurate Calendar & Rate Parity',
          desc: 'Bidirectional synchronization algorithms ensure zero double bookings and instant pricing updates across all channels.'
        },
        {
          title: 'Boosted Direct Bookings & Margins',
          desc: 'Custom direct booking engine integrations help you capture commission-free bookings while maintaining full Lodgify automation.'
        },
        {
          title: 'Frictionless Guest Check-In Experiences',
          desc: 'Automated smart lock PIN generation and digital guidebook dispatching provide five-star self-check-in experiences.'
        },
        {
          title: 'Dedicated Post-Launch Support',
          desc: 'Continuous monitoring, API version updates, and rapid engineering assistance to ensure your operations run seamlessly 24/7.'
        }
      ],

      // Section 5: FAQs
      faqTitle: 'Frequently Asked Questions',
      faqIntro: 'Clear answers to common questions about our Lodgify integration and automation services.',
      faqs: [
        {
          q: 'What Lodgify integration services does Cubixsol provide?',
          a: 'Cubixsol develops Lodgify integrations with booking channels, payment systems, CRM platforms, smart devices, and other business applications.'
        },
        {
          q: 'Can Lodgify integrate with Airbnb and other OTAs?',
          a: 'Yes, Lodgify supports connections with major booking platforms, and Cubixsol can create customised integration solutions.'
        },
        {
          q: 'Does Cubixsol offer Lodgify API integration?',
          a: 'Yes, our developers create API-based integrations that connect Lodgify with external software systems.'
        },
        {
          q: 'Can Lodgify connect with smart lock solutions?',
          a: 'Yes, Lodgify can integrate with smart access systems to support automated guest entry and self-check-in.'
        },
        {
          q: 'How can Lodgify integration improve vacation rental management?',
          a: 'Lodgify integration helps businesses automate operations, synchronise data, and manage bookings more efficiently.'
        }
      ],

      // SEO
      seo: {
        metaTitle: 'Lodgify Integration Services | Vacation Rental Automation | Cubixsol',
        metaDescription: 'Expert Lodgify integration services by Cubixsol. Connect Lodgify with Airbnb, Vrbo, custom direct booking websites, smart locks, payment gateways, and CRM systems.',
        keywords: 'Lodgify integration, Lodgify API integration, Lodgify direct booking, vacation rental automation, Lodgify channel manager, smart lock Lodgify',
        ogTitle: 'Lodgify Integration Services | Vacation Rental Automation | Cubixsol',
        ogDescription: 'Extend Lodgify functionality through custom integrations, API connectors, OTA channel synchronization, and smart lock automation.',
        ogImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&h=800&q=80',
        canonicalUrl: 'https://cubixsol.com/lodgify-integration'
      }
    };

    console.log('Upserting Lodgify service in MongoDB...');
    const result = await Service.findOneAndUpdate(
      { slug: 'lodgify-integration' },
      { $set: lodgifyData },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log('✅ Successfully seeded Lodgify Integration Service:', result.slug);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding Lodgify service:', error);
    process.exit(1);
  }
}

seedLodgify();
