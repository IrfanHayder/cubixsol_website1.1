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

async function seedRentalsUnited() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 15000 });
    console.log('Connected successfully to MongoDB Atlas.');

    const rentalsUnitedData = {
      slug: 'rentals-united-integration',
      title: 'Rentals United Integration Services',
      cardTitle: 'Rentals United Integration',
      menuTitle: 'Rentals United Integration',
      icon: 'Network',
      color: 'text-[#00a88f] bg-[#00a88f]/10',
      gradient: 'from-[#00a88f] to-[#4338ca]',
      heroEyebrow: 'RENTALS UNITED INTEGRATION SERVICES',
      heroSubtitle: 'Custom Rentals United Integration Solutions For Vacation Rental Distribution',
      heroTitle: 'Custom Rentals United Integration Solutions For Vacation Rental Distribution',
      heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&h=800&q=80',
      desc: 'Cubixsol provides professional Rentals United integration services to help vacation rental businesses connect their distribution network with property management systems, booking platforms, and business applications. Our developers create customized integration solutions that improve listing management, automate reservation workflows, and simplify multi-channel operations.',
      longDesc: 'Cubixsol provides professional Rentals United integration services to help vacation rental businesses connect their distribution network with property management systems, booking platforms, and business applications. Our developers create customized integration solutions that improve listing management, automate reservation workflows, and simplify multi-channel operations.',
      additionalParagraph: 'Managing properties across multiple sales channels requires accurate data exchange between different systems. We develop Rentals United integrations that connect your distribution platform with essential business applications including property management systems, OTAs (Airbnb, Booking.com, Vrbo), direct booking websites, payment solutions, CRM platforms, accounting software, revenue management tools, and smart property technologies.',
      heroPrimaryBtnText: 'Schedule A Rentals United Consultation',
      heroSecondaryBtnText: 'Explore Solutions',
      ctaPrimaryText: 'Schedule A Rentals United Consultation',
      ctaSecondaryText: 'Explore Solutions',
      features: [
        '2-Way Multi-Channel OTA Synchronisation',
        'Custom Rentals United Open API Connections',
        'Seamless PMS & Enterprise Bridge Integrations',
        'Automated Booking & Payment Processing Workflows',
        'CRM, Guest Messaging & Revenue Management Sync'
      ],
      heroBadges: [
        '2-Way Multi-Channel OTA Synchronisation',
        'Custom Rentals United Open API Connections',
        'Seamless PMS & Enterprise Bridge Integrations',
        'Automated Booking & Payment Processing Workflows',
        'CRM, Guest Messaging & Revenue Management Sync'
      ],

      // Section 1: Connect Rentals United With Your Business Platforms
      subServicesTitle: 'Connect Rentals United With Your Business Platforms',
      subServicesIntro: 'Managing properties across multiple sales channels requires accurate data exchange between different systems. We develop Rentals United integrations that connect your distribution platform with essential business applications, including:',
      subServicesItems: [
        {
          icon: 'Building2',
          tag: 'PMS PLATFORMS',
          title: 'Property management systems',
          desc: 'Connect Rentals United with your core PMS to automatically sync property details, minimum stay rules, rates, calendars, and guest reservations in real time.',
          pills: ['Bidirectional Sync', 'Centralized Rates', 'Calendar Parity'],
          colorTheme: 'teal'
        },
        {
          icon: 'Share2',
          tag: 'CHANNELS & OTAS',
          title: 'Airbnb, Booking.com, Vrbo, and other OTAs',
          desc: 'Seamless connectivity with 60+ global OTAs and niche booking channels for unified listing distribution, dynamic rate updates, and zero double bookings.',
          pills: ['Airbnb Sync', 'Booking.com', 'Vrbo & 60+ Channels'],
          colorTheme: 'indigo'
        },
        {
          icon: 'Globe',
          tag: 'DIRECT BOOKINGS',
          title: 'Direct booking websites',
          desc: 'Bridge your direct booking websites with Rentals United inventory and availability engines to capture commission-free reservations automatically.',
          pills: ['Custom Booking Engine', 'Instant Calculation', 'Direct Checkout'],
          colorTheme: 'teal'
        },
        {
          icon: 'CreditCard',
          tag: 'PAYMENTS & TRANSACTIONS',
          title: 'Payment processing solutions',
          desc: 'Integrate secure payment gateways (Stripe, Adyen, PayPal) for automatic deposit captures, card validation, pre-authorizations, and payouts.',
          pills: ['Stripe / Merchant Gateways', 'Pre-Auth Holds', 'Card Tokenization'],
          colorTheme: 'indigo'
        },
        {
          icon: 'Users',
          tag: 'CRM & GUEST PROFILES',
          title: 'CRM platforms',
          desc: 'Unify Rentals United reservation records with HubSpot, Salesforce, and CRM suites to consolidate guest history, preferences, and loyalty data.',
          pills: ['Guest Consolidation', 'Loyalty Tracking', 'HubSpot / Salesforce'],
          colorTheme: 'teal'
        },
        {
          icon: 'PieChart',
          tag: 'ACCOUNTING & FINANCE',
          title: 'Accounting software',
          desc: 'Automate revenue recognition, sales tax calculations, channel commissions, and owner financial reporting with QuickBooks, Xero, and ERP tools.',
          pills: ['QuickBooks & Xero', 'Commission Tracking', 'Owner Statements'],
          colorTheme: 'indigo'
        },
        {
          icon: 'TrendingUp',
          tag: 'REVENUE OPTIMIZATION',
          title: 'Revenue management tools',
          desc: 'Connect dynamic pricing tools like PriceLabs, Wheelhouse, and Beyond Pricing to automatically push optimal rates across your distribution network.',
          pills: ['PriceLabs Sync', 'Dynamic Yields', 'Real-time Repricing'],
          colorTheme: 'teal'
        },
        {
          icon: 'KeyRound',
          tag: 'SMART IOT & HARDWARE',
          title: 'Smart property technologies',
          desc: 'Automate digital key creation and guest access control by integrating reservation milestones with smart lock systems and IoT devices.',
          pills: ['Keyless Entry PINs', 'Smart Access Control', 'IoT Automation'],
          colorTheme: 'indigo'
        }
      ],

      // Section 2: Core Solutions
      coreSolutionsTitle: 'Specialised Rentals United Integration Capabilities',
      coreSolutionsIntro: 'Our specialized integration modules bridge Rentals United with every operational touchpoint of your vacation rental distribution ecosystem.',
      coreSolutions: [
        {
          id: 'channel-management',
          title: 'Rentals United Channel Management Integration',
          subtitle: 'Accurate Multi-Marketplace Synchronisation & Global Reach',
          desc: 'Our experts create Rentals United channel integrations that help synchronise rental information across multiple booking platforms. Our connected channel solutions allow property managers to maintain accurate information across different marketplaces. Our channel management solutions support:',
          icon: 'Network',
          badge: 'CHANNEL DISTRIBUTION',
          features: [
            'Real-time listing synchronisation across 60+ global OTAs and niche channels',
            'Instant reservation updates and automated status modifications',
            'Dynamic availability management preventing overlapping calendar dates',
            'Comprehensive rate and inventory synchronisation with currency conversion',
            'Seamless guest information transfer and verified contact exchange'
          ]
        },
        {
          id: 'api-services',
          title: 'Rentals United API Integration Services',
          subtitle: 'Scalable & Secure API Connection Architecture',
          desc: 'We provide custom Rentals United API integration solutions for businesses. We build scalable solutions to support complex rental operations and evolving business requirements. Our developers create secure API-based connections that allow applications to exchange data efficiently. Our Rentals United API services include:',
          icon: 'Code2',
          badge: 'CUSTOM API ENGINEERING',
          features: [
            'Custom API development tailored to bespoke enterprise workflow logic',
            'Third-party platform integration spanning ERP, custom CRMs, and apps',
            'High-frequency automated data synchronisation via bidirectional webhooks',
            'Intelligent workflow automation pipelines triggered by reservation events',
            'Comprehensive API testing, rate-limit management, and performance optimisation'
          ]
        },
        {
          id: 'pms-integration',
          title: 'Rentals United PMS Integration Solutions',
          subtitle: 'Unified Operational Workflows & Synchronized Central Records',
          desc: 'Many property managers use separate PMS platforms to manage reservations, guests, and operations. We help connect Rentals United with property management systems to create smoother workflows. Our PMS integration services support:',
          icon: 'Building2',
          badge: 'PMS CONNECTIVITY',
          features: [
            'Two-way reservation synchronisation between Rentals United and your PMS',
            'Centralized property data management for descriptions, amenities, and photos',
            'Unified calendar coordination with sub-second parity guarantees',
            'Direct guest information exchange for frictionless check-in flows',
            'Automated operational updates across housekeeping and maintenance teams'
          ]
        },
        {
          id: 'booking-payment',
          title: 'Rentals United Booking And Payment Integration',
          subtitle: 'Streamlined Transaction Workflows & Automated Financial Processing',
          desc: 'A smooth booking experience requires reliable connections between distribution platforms and payment systems. We integrate Rentals United with booking and payment solutions to improve transaction workflows. Our services include:',
          icon: 'CreditCard',
          badge: 'PAYMENT & TRANSACTIONS',
          features: [
            'Secure online payment gateway integration with multi-currency support',
            'Booking confirmation automation dispatched instantly via email and SMS',
            'Real-time transaction data synchronisation and automatic ledger posting',
            'Customer information management consolidating historical payment records',
            'Comprehensive revenue tracking solutions and multi-channel yield insights'
          ]
        },
        {
          id: 'crm-automation',
          title: 'Rentals United CRM And Automation Integration',
          subtitle: 'Personalized Guest Engagement & Automated Operational Pipelines',
          desc: 'We connect Rentals United with CRM and automation platforms to improve communication and workflow management. Our integrations allow companies to improve guest engagement and manage operations more effectively. Our solutions can support:',
          icon: 'Workflow',
          badge: 'CRM & AUTOMATION',
          features: [
            'Automated guest notifications for pre-arrival instructions and post-stay follow-ups',
            'Bidirectional CRM data synchronisation with guest profile enrichment',
            'Intelligent marketing automation for targeted retargeting and repeat direct bookings',
            'Automated customer follow-up workflows and 5-star review request drips',
            'End-to-end business process automation eliminating manual administration'
          ]
        }
      ],

      // Section 3: Process
      processTitle: 'Our Rentals United Integration Process',
      processIntro: 'Cubixsol follows a structured process to deliver reliable Rentals United integration solutions:',
      serviceProcessTitle: 'Our Rentals United Integration Process',
      serviceProcessIntro: 'Cubixsol follows a structured process to deliver reliable Rentals United integration solutions:',
      serviceProcessSteps: [
        {
          stepNumber: '01',
          title: 'Business Requirement Analysis',
          desc: 'Our team evaluates your distribution goals, existing systems, channel network, and technical requirements.',
          icon: 'Compass'
        },
        {
          stepNumber: '02',
          title: 'Integration Planning',
          desc: 'We design a solution architecture, API data mapping, and security protocols based on your workflow and business objectives.',
          icon: 'Workflow'
        },
        {
          stepNumber: '03',
          title: 'Development And Configuration',
          desc: 'Our developers build, test, and configure the required API bridges, webhook handlers, and secure system connections.',
          icon: 'Code2'
        },
        {
          stepNumber: '04',
          title: 'Testing And Deployment',
          desc: 'We verify data accuracy, multi-channel calendar parity, security, and integration performance under peak loads.',
          icon: 'ShieldCheck'
        },
        {
          stepNumber: '05',
          title: 'Support And Maintenance',
          desc: 'Our team provides ongoing technical support, monitoring, and proactive updates after implementation.',
          icon: 'RefreshCw'
        }
      ],

      // Section 4: Why Choose
      whyChooseTitle: 'Why Choose Cubixsol For Rentals United Integration?',
      whyChooseIntro: 'Cubixsol helps vacation rental businesses improve their distribution capabilities through custom Rentals United integration solutions. Our team focuses on building reliable connections that simplify multi-channel management and improve operational visibility.\n\nWe understand the challenges of managing listings across different marketplaces. That\'s why we create integrations that support accurate data synchronisation, automated workflows, and scalable rental operations. Whether you need PMS connectivity, API development, channel automation, or custom software connections, Cubixsol delivers Rentals United solutions designed for your business needs.',
      whyChooseItems: [
        {
          title: 'Enterprise Multi-Channel Expertise',
          desc: 'Specialized engineers experienced in large-scale channel managers, OTA APIs, and high-frequency distribution architectures.'
        },
        {
          title: 'Custom API Bridges & Webhooks',
          desc: 'Tailored backend connectors ensuring your PMS, ERP, and payment gateways communicate effortlessly with Rentals United.'
        },
        {
          title: 'Zero Double-Booking Guarantee',
          desc: 'Sub-second synchronization logic ensuring calendar parity and accurate rate availability across all connected marketplaces.'
        },
        {
          title: 'Scalable For Growing Portfolios',
          desc: 'Architectures engineered to seamlessly handle thousands of units, multi-currency conversions, and dynamic seasonal pricing.'
        },
        {
          title: 'End-to-End Workflow Automation',
          desc: 'Eliminate repetitive manual tasks by automating guest messaging, payment authorizations, and team housekeeping alerts.'
        },
        {
          title: 'Dedicated Technical Support',
          desc: '24/7 system monitoring, proactive API version updates, and rapid engineering assistance for continuous uptime.'
        }
      ],

      // Section 5: FAQs
      faqTitle: 'Frequently Asked Questions',
      faqIntro: 'Got questions about integrating Rentals United with your existing platforms? Find clear answers below.',
      faqs: [
        {
          q: 'What Rentals United integration services does Cubixsol provide?',
          a: 'Cubixsol develops Rentals United integrations with PMS platforms, booking channels, payment systems, CRM tools, and other business applications.'
        },
        {
          q: 'Can Rentals United connect with Airbnb and other OTAs?',
          a: 'Yes, Rentals United supports connections with multiple booking channels, and Cubixsol can develop customized integration solutions.'
        },
        {
          q: 'Does Cubixsol provide Rentals United API integration?',
          a: 'Yes, our developers create API-based integrations that connect Rentals United with external software systems.'
        },
        {
          q: 'Can Rentals United integrate with property management systems?',
          a: 'Yes, Rentals United can connect with different PMS platforms to synchronise reservations, listings, and operational data.'
        },
        {
          q: 'How does Rentals United integration benefit vacation rental businesses?',
          a: 'Rentals United integration helps businesses manage multiple channels, automate workflows, and improve distribution efficiency.'
        }
      ],

      // SEO
      seo: {
        metaTitle: 'Rentals United Integration Services | Vacation Rental Distribution | Cubixsol',
        metaDescription: 'Expert Rentals United integration services by Cubixsol. Connect Rentals United with PMS platforms, Airbnb, Vrbo, Booking.com, payment gateways, CRM, and custom APIs.',
        keywords: 'Rentals United integration, Rentals United API, channel manager integration, PMS Rentals United, vacation rental distribution, Cubixsol',
        ogTitle: 'Rentals United Integration Services | Vacation Rental Distribution | Cubixsol',
        ogDescription: 'Connect Rentals United with your PMS, direct booking engine, payment gateways, and CRM into one synchronized global platform.',
        ogImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&h=800&q=80',
        canonicalUrl: 'https://cubixsol.com/rentals-united-integration'
      }
    };

    console.log('Upserting Rentals United service in MongoDB...');
    const result = await Service.findOneAndUpdate(
      { slug: 'rentals-united-integration' },
      { $set: rentalsUnitedData },
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
    );

    console.log('✅ Successfully seeded Rentals United Integration Service:', result.slug);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding Rentals United service:', error);
    process.exit(1);
  }
}

seedRentalsUnited();
