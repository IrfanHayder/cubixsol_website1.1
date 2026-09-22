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

async function seedSmoobu() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 15000 });
    console.log('Connected successfully to MongoDB Atlas.');

    const smoobuData = {
      slug: 'smoobu-integration',
      title: 'Smoobu Integration Services',
      cardTitle: 'Smoobu Integration',
      menuTitle: 'Smoobu Integration',
      icon: 'Calendar',
      color: 'text-[#00a4d8] bg-[#00a4d8]/10',
      gradient: 'from-[#00a4d8] to-[#5d53a3]',
      heroSubtitle: 'Smoobu Integration Solutions For Vacation Rental Automation',
      heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&h=800&q=80',
      heroEyebrow: 'SMOOBU INTEGRATION SERVICES',
      heroTitle: 'Smoobu Integration Solutions For Vacation Rental Automation',
      heroDesc: 'Cubixsol enhances Smoobu functionality through custom integrations that support your specific operational goals. Our developers create customised integrations that improve booking management, automate repetitive tasks, and establish smooth communication between different business tools.',
      heroPrimaryBtnText: 'Schedule A Smoobu Consultation',
      heroSecondaryBtnText: 'Explore Solutions',
      heroBadges: [
        '2-Way Real-Time Channel Synchronisation',
        'Deep Airbnb & Booking.com API Pipelines',
        'Automated Keyless Smart Lock Workflows',
        'Custom CRM, Payment & Multi-Channel Connectors'
      ],
      short: 'Custom Smoobu integrations that improve booking synchronization, automate repetitive workflows, and unify your rental ecosystem.',
      desc: 'Cubixsol enhances Smoobu functionality through custom integrations that support your specific operational goals. Our developers create customised integrations that improve booking management, automate repetitive tasks, and establish smooth communication between different business tools.',
      points: [
        'Smoobu Channel Manager Integration & OTA Sync',
        'Smoobu Open API & Custom Webhook Architecture',
        'Deep Airbnb Two-Way Sync & Guest Messaging',
        'Automated Smart Lock & Digital Key Distribution',
        'Integrated CRM, Payment Gateways & Accounting',
        'Enterprise Multi-Unit Centralized Dashboard'
      ],

      // Section 1: Connect Smoobu Across Your Business Ecosystem
      subServicesTitle: 'Integrate Smoobu Across Your Business Ecosystem',
      subServicesIntro: 'Our integration services create a connected ecosystem where different platforms exchange information accurately and efficiently. We develop Smoobu integrations that connect your PMS with different software solutions, including:',
      subServicesItems: [
        {
          icon: 'Share2',
          tag: 'CHANNELS & OTAs',
          title: 'Rental Marketplaces & OTAs',
          desc: 'Airbnb, Booking.com, Vrbo, and other rental marketplaces with sub-second rate synchronization, unified booking logs, and instant calendar blockouts.',
          pills: ['Airbnb XML Sync', 'Booking.com API', 'Vrbo Instant Sync', 'Expedia Partner'],
          colorTheme: 'cyan'
        },
        {
          icon: 'Globe',
          tag: 'DIRECT ENGINE',
          title: 'Direct Booking Websites',
          desc: 'Custom-designed direct booking portals and booking engine widgets with embedded live Smoobu availability calendars and instant guest checkout.',
          pills: ['Custom Booking Engine', 'Zero Double Bookings', 'Live Availability Calendar'],
          colorTheme: 'purple'
        },
        {
          icon: 'CreditCard',
          tag: 'PAYMENTS & BILLING',
          title: 'Payment Processing Platforms',
          desc: 'Secure payment integrations with Stripe, PayPal, and regional gateways for automated guest deposits, security bonds, and recurring stay invoices.',
          pills: ['Stripe 3D Secure', 'Automated Deposit Holds', 'Multi-Currency Checkout'],
          colorTheme: 'cyan'
        },
        {
          icon: 'Users',
          tag: 'CRM & MARKETING',
          title: 'CRM & Marketing Systems',
          desc: 'Centralized guest relationship management tools, automated email campaigns, and customer retention workflows synced directly from stay histories.',
          pills: ['Guest Database Sync', 'Mailchimp / HubSpot', 'Automated Review Triggers'],
          colorTheme: 'purple'
        },
        {
          icon: 'Key',
          tag: 'SMART ACCESS',
          title: 'Smart Lock & Access Control Solutions',
          desc: 'Contactless check-in integrations with Nuki, August, Yale, and TTLock that auto-generate and SMS PIN codes synchronized with check-in/out hours.',
          pills: ['Nuki / August / Yale', 'Automated PIN Dispatch', 'Timed Guest Revocation'],
          colorTheme: 'cyan'
        },
        {
          icon: 'Receipt',
          tag: 'ACCOUNTING & REPORTING',
          title: 'Accounting & Reporting Applications',
          desc: 'Automated financial data pipelines connecting Smoobu with QuickBooks, Xero, and custom reporting BI dashboards for accurate tax and revenue tracking.',
          pills: ['QuickBooks / Xero Sync', 'Owner Payout Reports', 'Automated VAT / Tax Invoices'],
          colorTheme: 'purple'
        },
        {
          icon: 'MessageSquare',
          tag: 'COMMUNICATION',
          title: 'Communication Automation Tools',
          desc: 'Automated multi-channel messaging via WhatsApp, SMS, and email for pre-arrival forms, Wi-Fi guides, directions, and instant guest support.',
          pills: ['WhatsApp Business API', 'Twilio SMS Triggers', 'Automated Digital Guidebooks'],
          colorTheme: 'cyan'
        }
      ],

      // Core 5 Solutions
      coreSolutionsTitle: 'Comprehensive Smoobu Integration Capabilities',
      coreSolutionsIntro: 'Explore our specialized engineering modules designed to transform Smoobu into an automated, scalable hospitality platform.',
      coreSolutions: [
        {
          id: 'channel-manager',
          title: 'Smoobu Channel Manager Integration Services',
          subtitle: 'Unified Multi-Channel Synchronisation Across Global OTAs',
          desc: 'Managing several booking channels requires accurate synchronisation of reservations, availability, and pricing information. We connect Smoobu with multiple sales channels to maintain consistent rental data. Our channel integration solutions support:',
          icon: 'Layers',
          badge: 'CHANNEL MANAGER',
          features: [
            'Real-time reservation updates across all connected channels',
            'High-speed calendar synchronisation preventing overbookings',
            'Listing information and amenities management from one place',
            'Accurate guest data transfer and communication pipeline',
            'Automated availability coordination and minimum stay rules'
          ]
        },
        {
          id: 'api-development',
          title: 'Smoobu API Integration Services',
          subtitle: 'Custom Software & Webhook Pipelines via Smoobu Open API',
          desc: 'Our team provides custom Smoobu API integration solutions for businesses that require advanced connectivity between their PMS and external applications. Our developers build secure API connections that allow systems to communicate and exchange information. Our Smoobu API services include:',
          icon: 'Code2',
          badge: 'OPEN API ARCHITECTURE',
          features: [
            'Custom software integrations with legacy and cloud enterprise apps',
            'Third-party application connections via RESTful API & Webhooks',
            'Automated workflow development triggered by real-time booking events',
            'Bidirectional data synchronisation across property databases',
            'Comprehensive API configuration, load testing, and continuous maintenance'
          ]
        },
        {
          id: 'airbnb-integration',
          title: 'Smoobu Airbnb Integration Solutions',
          subtitle: 'Deep Synchronisation for Peak Vacation Rental Performance',
          desc: 'Airbnb is one of the most important platforms for vacation rental businesses. Cubixsol develops Smoobu Airbnb integration solutions that improve synchronisation between rental listings and management systems. Our services support:',
          icon: 'Share2',
          badge: 'AIRBNB SPECIALIZATION',
          features: [
            'Instant booking information and reservation status synchronisation',
            'Automated guest profile updates and ID verification checks',
            'Dynamic availability management and rate tier synchronisation',
            'Multi-calendar coordination across individual rooms or entire homes',
            'Automated property data updates, house rules, and check-in instructions'
          ]
        },
        {
          id: 'smart-lock',
          title: 'Smoobu Smart Lock & Automation Integration',
          subtitle: 'Keyless Guest Entry & IoT Property Automation',
          desc: 'Automated property access has become an important part of modern rental management. Cubixsol connects Smoobu with smart lock systems and automation tools to simplify guest entry processes. Our smart automation solutions include:',
          icon: 'Key',
          badge: 'SMART LOCK & IOT',
          features: [
            'Automated digital access code creation customized per booking',
            'Seamless self-check-in workflows with ID verification',
            'Smart device connectivity (thermostats, noise sensors, lights)',
            'Instant guest arrival and door-unlock notifications for hosts',
            'Remote property access control and staff maintenance access pass'
          ]
        },
        {
          id: 'crm-payment',
          title: 'Smoobu CRM & Payment Integration',
          subtitle: 'Organised Guest Relations, Automated Billing & Financial Insights',
          desc: 'Customer relationships and financial operations require organised systems. Cubixsol integrates Smoobu with CRM platforms, payment gateways, and business applications to improve management efficiency. Our solutions can connect Smoobu with:',
          icon: 'CreditCard',
          badge: 'CRM & PAYMENTS',
          features: [
            'CRM software for centralized guest relationship and history management',
            'Secure payment systems for automated booking and security deposit processing',
            'Email & SMS marketing tools for automated post-stay rebooking campaigns',
            'Accounting platforms for financial tracking, payouts, and bookkeeping',
            'Custom reporting systems for revenue analytics, ADR, and RevPAR business insights'
          ]
        }
      ],

      // 5 Step Process
      processTitle: 'Our Smoobu Integration Process',
      processIntro: 'Cubixsol follows a structured approach to develop successful Smoobu integrations:',
      processSteps: [
        {
          step: '01',
          title: 'Requirement Analysis',
          desc: 'Our team understands your business workflow, current tools, and integration objectives to map all required data flows.',
          badge: 'DISCOVERY'
        },
        {
          step: '02',
          title: 'Technical Planning',
          desc: 'We create an integration strategy based on your system requirements, API specifications, and security protocols.',
          badge: 'ARCHITECTURE'
        },
        {
          step: '03',
          title: 'Development And Setup',
          desc: 'Our developers build and configure the required connections, webhooks, middleware, and custom UI components.',
          badge: 'ENGINEERING'
        },
        {
          step: '04',
          title: 'Testing And Optimization',
          desc: 'We check data accuracy, performance, failover scenarios, and system reliability across all booking channels.',
          badge: 'QUALITY QA'
        },
        {
          step: '05',
          title: 'Deployment And Support',
          desc: 'We provide assistance after implementation to maintain smooth operations, monitoring, and ongoing updates.',
          badge: 'GO LIVE'
        }
      ],

      // Why Choose Cubixsol
      whyChooseTitle: 'Why Choose Cubixsol For Smoobu Integration?',
      whyChooseIntro: 'Cubixsol delivers custom PMS integration solutions. Our developers build secure and flexible integrations that simplify property management and improve workflow automation. Our Smoobu expertise covers Airbnb integration, API development, smart lock connectivity, payment gateways, and custom workflow automation. We build each solution around your business processes, technical setup, and growth goals.',
      whyChooseItems: [
        {
          title: 'Proven PMS & Channel Expertise',
          desc: 'Extensive hands-on experience integrating Smoobu with leading OTAs, direct booking engines, and hardware locks.',
          icon: 'Award'
        },
        {
          title: 'Zero Double-Booking Guarantee',
          desc: 'High-speed event-driven Webhook pipelines that synchronize calendars in real time across 200+ booking channels.',
          icon: 'ShieldCheck'
        },
        {
          title: 'Tailored Custom Integrations',
          desc: 'We engineer bespoke middleware and custom API bridges tailored specifically to your exact property workflows.',
          icon: 'Cpu'
        },
        {
          title: 'End-to-End Keyless Automation',
          desc: 'Frictionless guest check-ins with automated PIN code creation and synchronization with leading smart lock providers.',
          icon: 'Key'
        },
        {
          title: 'Enterprise Financial & CRM Sync',
          desc: 'Direct synchronization with Stripe, Xero, QuickBooks, and CRM platforms for automated billing and guest marketing.',
          icon: 'TrendingUp'
        },
        {
          title: 'Dedicated Engineering & Support',
          desc: 'Continuous monitoring, API version updates, and 24/7 technical support to keep your operations running smoothly.',
          icon: 'Sparkles'
        }
      ],

      // FAQs
      faqs: [
        {
          q: 'What Smoobu integration services does Cubixsol provide?',
          a: 'Cubixsol develops Smoobu integrations with booking platforms, payment solutions, CRM systems, smart devices, and other business applications to automate your entire vacation rental operations.'
        },
        {
          q: 'Can Smoobu integrate with Airbnb and other OTAs?',
          a: 'Yes, Smoobu supports connections with major booking channels (Airbnb, Booking.com, Vrbo, Expedia), and Cubixsol can help create customized 2-way integration workflows for real-time rates and availability.'
        },
        {
          q: 'Does Cubixsol offer Smoobu API integration?',
          a: 'Yes, our developers build API-based solutions that connect Smoobu with external software and business systems using the official Smoobu REST API and Webhooks.'
        },
        {
          q: 'Can Smoobu connect with smart lock systems?',
          a: 'Yes, Smoobu can work with smart access solutions (such as Nuki, August, Yale, TTLock, and RemoteLock) to support automated check-in and property access management.'
        },
        {
          q: 'How does Smoobu integration benefit vacation rental owners?',
          a: 'Smoobu integration reduces manual tasks, eliminates double-bookings, improves calendar synchronization, and helps property managers operate their rentals more efficiently while scaling their portfolio.'
        }
      ],

      seoTitle: 'Smoobu Integration Services | Vacation Rental PMS Automation | Cubixsol',
      seoDescription: 'Expert Smoobu integration services by Cubixsol. Connect Smoobu with Airbnb, Booking.com, smart locks, payment gateways, and custom APIs for automated property management.',
      seoKeywords: 'Smoobu integration, Smoobu API, Smoobu Airbnb integration, Smoobu channel manager, PMS integration, vacation rental automation, Cubixsol'
    };

    const result = await Service.findOneAndUpdate(
      { slug: 'smoobu-integration' },
      { $set: smoobuData },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log('Smoobu service successfully seeded/updated in MongoDB Atlas:');
    console.log(`_id: ${result._id}`);
    console.log(`slug: ${result.slug}`);
    console.log(`title: ${result.title}`);

    await mongoose.disconnect();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding Smoobu service:', err);
    process.exit(1);
  }
}

seedSmoobu();
