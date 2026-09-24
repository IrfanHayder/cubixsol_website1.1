const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {
  console.log('DNS setServers error (ignored):', e.message);
}

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Service = require('./models/Service');

async function seedCloudbeds() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 15000 });
    console.log('Connected successfully to MongoDB Atlas.');

    const cloudbedsData = {
      slug: 'cloudbeds-integration',
      title: 'Cloudbeds Integration Services',
      cardTitle: 'Cloudbeds Integration',
      menuTitle: 'Cloudbeds Integration',
      icon: 'Cloud',
      color: 'text-[#5d53a3] bg-[#5d53a3]/10',
      gradient: 'from-[#00a4d8] to-[#5d53a3]',
      heroEyebrow: 'CLOUDBEDS INTEGRATION SERVICES',
      heroSubtitle: 'Custom Cloudbeds Integration Solutions For Hospitality Businesses',
      heroTitle: 'Custom Cloudbeds Integration Solutions For Hospitality Businesses',
      heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&h=800&q=80',
      desc: 'Cubixsol enhances your capabilities through custom Cloudbeds integrations built around your business requirements. We provide professional Cloudbeds integration services to help hotels, hostels, resorts, and accommodation providers to improve reservation management, automate operational workflows, and simplify communication between multiple hospitality systems.',
      longDesc: 'Cubixsol enhances your capabilities through custom Cloudbeds integrations built around your business requirements. We provide professional Cloudbeds integration services to help hotels, hostels, resorts, and accommodation providers to improve reservation management, automate operational workflows, and simplify communication between multiple hospitality systems.',
      additionalParagraph: 'Modern hospitality businesses use different software solutions to manage reservations, payments, guest services, and operations. We develop Cloudbeds integrations that connect your PMS with essential applications, including online travel agencies such as Booking.com, Airbnb, and Expedia, direct booking websites, payment gateways, CRM platforms, accounting software, smart lock and access systems, guest communication platforms, and business intelligence tools.',
      heroPrimaryBtnText: 'Schedule A Cloudbeds Consultation',
      heroSecondaryBtnText: 'Explore Cloudbeds Solutions',
      ctaPrimaryText: 'Schedule A Cloudbeds Consultation',
      ctaSecondaryText: 'Explore Cloudbeds Solutions',
      features: [
        'Multi-Channel OTA Availability & Rate Synchronization',
        'Custom Cloudbeds API Engineering & Webhook Pipelines',
        'Direct Booking Engine & Custom Storefront Integration',
        'Automated Payment Gateways & Accounting Synchronization',
        'Smart Lock Access, Guest Experience & Workflow Automation'
      ],
      heroBadges: [
        'Multi-Channel OTA Availability & Rate Synchronization',
        'Custom Cloudbeds API Engineering & Webhook Pipelines',
        'Direct Booking Engine & Custom Storefront Integration',
        'Automated Payment Gateways & Accounting Synchronization',
        'Smart Lock Access, Guest Experience & Workflow Automation'
      ],

      // Section 1: Connect Cloudbeds With Your Hospitality Technology Stack
      subServicesTitle: 'Connect Cloudbeds With Your Hospitality Technology Stack',
      subServicesIntro: 'Modern hospitality businesses use different software solutions to manage reservations, payments, guest services, and operations. We develop Cloudbeds integrations that connect your PMS with essential applications, including:',
      subServicesItems: [
        {
          icon: 'Share2',
          tag: 'OTAs & CHANNELS',
          title: 'Online travel agencies such as Booking.com, Airbnb, and Expedia.',
          desc: 'Keep calendars, pricing rates, room restrictions, and instant bookings synchronized in real time across global OTAs without double bookings.',
          pills: ['Booking.com 2-Way Sync', 'Airbnb Rates', 'Expedia Real-Time Bridge'],
          colorTheme: 'cyan'
        },
        {
          icon: 'Globe',
          tag: 'DIRECT BOOKINGS',
          title: 'Direct booking websites.',
          desc: 'Connect custom booking platforms and direct websites with Cloudbeds to capture zero-commission direct bookings with live instant confirmations.',
          pills: ['Direct Engine Bridge', 'Commission-Free Flow', 'Live Availability'],
          colorTheme: 'purple'
        },
        {
          icon: 'CreditCard',
          tag: 'PAYMENT GATEWAYS',
          title: 'Payment gateways.',
          desc: 'Integrate Stripe, PayPal, Authorize.Net, and merchant gateways to automate payment processing, damage deposit authorizations, and settlements.',
          pills: ['Stripe & Merchant Pay', 'Security Deposit Holds', 'Card Tokenization'],
          colorTheme: 'cyan'
        },
        {
          icon: 'Users',
          tag: 'CRM PLATFORMS',
          title: 'CRM platforms.',
          desc: 'Bridge Cloudbeds guest records with HubSpot, Salesforce, and CRM suites to centralize contact histories, guest preferences, and VIP loyalty profiles.',
          pills: ['HubSpot / Salesforce', 'Guest History Sync', 'Loyalty Tracking'],
          colorTheme: 'purple'
        },
        {
          icon: 'PieChart',
          tag: 'ACCOUNTING',
          title: 'Accounting software.',
          desc: 'Synchronise booking revenue, occupancy taxes, cleaning fees, and disbursements with QuickBooks, Xero, or custom financial ledgers.',
          pills: ['QuickBooks & Xero', 'Tax Splitting', 'Financial Statement Reports'],
          colorTheme: 'cyan'
        },
        {
          icon: 'KeyRound',
          tag: 'SMART LOCK ACCESS',
          title: 'Smart lock and access systems.',
          desc: 'Connect digital access systems (Yale, Schlage, August, RemoteLock) to auto-generate time-bounded guest door PINs upon confirmed reservation.',
          pills: ['Automated PIN Codes', 'RemoteLock / Yale', 'Contactless Guest Entry'],
          colorTheme: 'purple'
        },
        {
          icon: 'MessageSquare',
          tag: 'GUEST ENGAGEMENT',
          title: 'Guest communication platforms.',
          desc: 'Automate post-stay review requests, pre-arrival welcome guides, upsell email sequences, and SMS alerts via Klaviyo, Mailchimp, or Twilio.',
          pills: ['Guest SMS Workflows', 'Review Generation', 'Upsell Sequences'],
          colorTheme: 'cyan'
        },
        {
          icon: 'BarChart3',
          tag: 'BUSINESS INTELLIGENCE',
          title: 'Business intelligence tools.',
          desc: 'Consolidate multi-channel performance data, RevPAR, average daily rate (ADR), and channel ROI into unified business intelligence dashboards.',
          pills: ['BI Dashboards', 'RevPAR & ADR Trends', 'Occupancy Heatmaps'],
          colorTheme: 'purple'
        }
      ],

      // Section 2: Core Specialized Modules
      coreSolutionsTitle: 'Core Cloudbeds Integration Solutions',
      coreSolutionsIntro: 'Our specialized integration modules bridge Cloudbeds with every operational touchpoint of your hospitality business.',
      coreSolutions: [
        {
          id: 'channel-manager',
          title: 'Cloudbeds Channel Manager Integration',
          subtitle: 'Accurate Multi-Channel Synchronization & Real-time Room Inventory Control',
          desc: 'Managing reservations across multiple booking channels requires accurate synchronisation. Our integrations help accommodation providers manage multiple sales channels while maintaining accurate booking information. Our channel integration services include:',
          icon: 'Share2',
          badge: 'CHANNEL MANAGEMENT',
          features: [
            'Reservation synchronisation.',
            'Room availability updates.',
            'Rate management.',
            'Guest data transfer.',
            'Listing information synchronisation.'
          ]
        },
        {
          id: 'api-services',
          title: 'Cloudbeds API Integration Services',
          subtitle: 'Custom API Architecture, Scalable Endpoints & Third-Party System Bridges',
          desc: 'We provide custom Cloudbeds API integration solutions that allow businesses to connect external applications with their property management system. Our developers build secure API-based connections that support reliable data exchange. Our Cloudbeds API services include:',
          icon: 'Terminal',
          badge: 'API DEVELOPMENT',
          features: [
            'Custom API development.',
            'Third-party software integration.',
            'Automated data workflows.',
            'System connectivity solutions.',
            'API testing and optimisation.'
          ]
        },
        {
          id: 'booking-engine',
          title: 'Cloudbeds Booking Engine Integration',
          subtitle: 'Zero-Commission Direct Bookings, Automated Processing & Live Parity',
          desc: 'Direct bookings help hotels and accommodation providers increase customer relationships and reduce dependency on external marketplaces. We help connect Cloudbeds with booking websites and reservation platforms. Our booking integration solutions support:',
          icon: 'Globe',
          badge: 'DIRECT BOOKING',
          features: [
            'Website reservation systems.',
            'Automated booking processing.',
            'Guest information management.',
            'Payment workflow integration.',
            'Availability synchronisation.'
          ]
        },
        {
          id: 'payment-accounting',
          title: 'Cloudbeds Payment And Accounting Integration',
          subtitle: 'Financial Accuracy, Automated Invoicing & Ledger Synchronization',
          desc: 'Financial accuracy is essential for hospitality operations. We connect Cloudbeds with payment systems and accounting platforms to simplify transaction management. Connected financial systems provide better control over payments and business performance. Our solutions include:',
          icon: 'CreditCard',
          badge: 'PAYMENT & ACCOUNTING',
          features: [
            'Payment gateway integration.',
            'Invoice automation.',
            'Financial data synchronisation.',
            'Accounting software connections.',
            'Revenue reporting workflows.'
          ]
        },
        {
          id: 'guest-experience',
          title: 'Cloudbeds Guest Experience And Automation Integration',
          subtitle: 'Personalized Customer Journeys, Digital Check-in & Review Generation',
          desc: 'Guest satisfaction depends on efficient communication and personalised services. We integrate Cloudbeds with guest engagement tools to improve the customer journey. These integrations help hospitality businesses provide better service throughout the guest lifecycle. Our solutions support:',
          icon: 'MessageSquare',
          badge: 'GUEST EXPERIENCE',
          features: [
            'Automated emails.',
            'Guest notifications.',
            'Digital check-in workflows.',
            'Customer relationship management.',
            'Feedback and review automation.'
          ]
        }
      ],

      // Section 3: Our Cloudbeds Integration Process
      serviceProcessTitle: 'Our Cloudbeds Integration Process',
      serviceProcessIntro: 'Cubixsol follows a structured approach to deliver successful Cloudbeds integration projects:',
      serviceProcessSteps: [
        {
          stepNumber: '01',
          title: 'Requirement Analysis',
          desc: 'Our team studies your hospitality operations, existing software, and integration goals.'
        },
        {
          stepNumber: '02',
          title: 'Solution Planning',
          desc: 'We design an integration roadmap based on your business requirements.'
        },
        {
          stepNumber: '03',
          title: 'Development And Configuration',
          desc: 'Our developers build secure connections between Cloudbeds and external platforms.'
        },
        {
          stepNumber: '04',
          title: 'Testing And Deployment',
          desc: 'We verify system performance, security, and data accuracy.'
        },
        {
          stepNumber: '05',
          title: 'Support And Maintenance',
          desc: 'Our team provides technical support after implementation.'
        }
      ],

      // Section 4: Why Choose Cubixsol For Cloudbeds Integration
      whyChooseTitle: 'Why Choose Cubixsol For Cloudbeds Integration?',
      whyChooseIntro: 'Cubixsol helps hospitality businesses unlock greater value from Cloudbeds through customised integration solutions. Our team understands the complexity of hotel operations and develops connections that improve reservation flow, guest communication, and operational efficiency.\n\nWe create Cloudbeds integrations that connect your entire hospitality ecosystem, from booking channels and payment systems to automation tools and reporting platforms. Our solutions are designed to help hotels and accommodation providers operate more efficiently while preparing their technology infrastructure for future growth.',
      whyChooseItems: [
        {
          title: 'Tailored Hospitality Architecture',
          desc: 'Custom engineered data bridges tailored to your exact property portfolio size, third-party software stack, and hospitality model.'
        },
        {
          title: 'Zero Double-Booking Guarantee',
          desc: 'Sub-second bidirectional synchronization across Airbnb, Vrbo, Booking.com, Expedia, and direct web engines.'
        },
        {
          title: 'Automated Guest Self-Check-in',
          desc: 'Dynamic, time-restricted smart lock PIN creation linked automatically to confirmed Cloudbeds reservation timestamps.'
        },
        {
          title: 'End-to-End Enterprise Support',
          desc: 'Continuous monitoring, webhook error handling, API version maintenance, and 24/7 technical oversight.'
        }
      ],

      // Section 5: FAQs
      faqs: [
        {
          q: 'What Cloudbeds integration services does Cubixsol provide?',
          a: 'Cubixsol develops Cloudbeds integrations with booking channels, payment systems, CRM platforms, accounting tools, smart devices, and custom applications.'
        },
        {
          q: 'Can Cloudbeds integrate with Airbnb and other OTAs?',
          a: 'Yes, Cloudbeds supports connections with multiple booking channels, and Cubixsol can create customised integration solutions.'
        },
        {
          q: 'Does Cubixsol provide Cloudbeds API integration?',
          a: 'Yes, our developers create API-based integrations that connect Cloudbeds with external business applications.'
        },
        {
          q: 'Can Cloudbeds integrate with payment gateways?',
          a: 'Yes, Cloudbeds can connect with payment solutions to support secure transaction processing.'
        },
        {
          q: 'How can Cloudbeds integration improve hotel operations?',
          a: 'Cloudbeds integration helps automate workflows, synchronise data, and improve overall hospitality management efficiency.'
        }
      ],

      // SEO
      seo: {
        metaTitle: 'Cloudbeds Integration Services | Custom Hospitality PMS Solutions | Cubixsol',
        metaDescription: 'Professional Cloudbeds integration services by Cubixsol. Connect Cloudbeds PMS with OTAs, direct booking websites, payment gateways, smart locks, and CRMs.',
        keywords: 'Cloudbeds integration, Cloudbeds API development, hotel PMS integration, Cloudbeds channel manager, Cloudbeds payment gateway, Cubixsol',
        ogTitle: 'Cloudbeds Integration Services | Cubixsol',
        ogDescription: 'Custom Cloudbeds integration solutions for hospitality businesses. Multi-channel synchronization, API bridges, guest experience, and automated workflows.',
        ogImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&h=800&q=80',
        canonicalUrl: 'https://cubixsol.com/cloudbeds-integration'
      }
    };

    // 1. Upsert into MongoDB Service collection
    const updated = await Service.findOneAndUpdate(
      { slug: 'cloudbeds-integration' },
      { $set: cloudbedsData },
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
    );
    console.log('✅ Successfully seeded Cloudbeds Integration service in MongoDB Atlas:', updated.slug);

    // 2. Update seedData.json
    const seedJsonPath = path.join(__dirname, 'seedData.json');
    if (fs.existsSync(seedJsonPath)) {
      const seedData = JSON.parse(fs.readFileSync(seedJsonPath, 'utf-8'));
      const idx = seedData.initialServices.findIndex(s => s.slug === 'cloudbeds-integration');
      if (idx >= 0) {
        seedData.initialServices[idx] = cloudbedsData;
      } else {
        seedData.initialServices.push(cloudbedsData);
      }
      fs.writeFileSync(seedJsonPath, JSON.stringify(seedData, null, 2), 'utf-8');
      console.log('✅ Successfully updated seedData.json with Cloudbeds Integration service.');
    }

    const count = await Service.countDocuments();
    console.log(`Total services in MongoDB Atlas: ${count}`);

    await mongoose.disconnect();
    console.log('🔌 Disconnected cleanly from MongoDB.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding Cloudbeds service:', err);
    process.exit(1);
  }
}

seedCloudbeds();
