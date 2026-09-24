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

async function seedMews() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 15000 });
    console.log('Connected successfully to MongoDB Atlas.');

    const mewsData = {
      slug: 'mews-integration',
      title: 'Mews Integration Services',
      cardTitle: 'Mews Integration',
      menuTitle: 'Mews Integration',
      icon: 'Building',
      color: 'text-[#5d53a3] bg-[#5d53a3]/10',
      gradient: 'from-[#00a4d8] to-[#5d53a3]',
      heroEyebrow: 'MEWS INTEGRATION SERVICES',
      heroSubtitle: 'Custom Mews Integration Solutions For Modern Hospitality Operations',
      heroTitle: 'Custom Mews Integration Solutions For Modern Hospitality Operations',
      heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&h=800&q=80',
      desc: 'Cubixsol provides professional Mews integration services that help hotels, serviced apartments, and hospitality businesses connect their cloud property management system with advanced digital solutions. Our developers create customised integrations that improve automation, simplify operations, and enable seamless communication between different hospitality platforms.',
      longDesc: 'Cubixsol provides professional Mews integration services that help hotels, serviced apartments, and hospitality businesses connect their cloud property management system with advanced digital solutions. Our developers create customised integrations that improve automation, simplify operations, and enable seamless communication between different hospitality platforms.',
      additionalParagraph: 'Modern hospitality businesses require connected systems to manage guest services, reservations, and internal operations efficiently. We develop Mews integrations that connect your PMS with essential applications, including booking channels and online travel agencies, direct booking websites, payment platforms, CRM and guest engagement systems, smart locks and access control solutions, accounting software, revenue management platforms, and business intelligence tools.',
      heroPrimaryBtnText: 'Schedule A Mews Consultation',
      heroSecondaryBtnText: 'Explore Mews Solutions',
      ctaPrimaryText: 'Schedule A Mews Consultation',
      ctaSecondaryText: 'Explore Mews Solutions',
      features: [
        'Open Mews Open API & Webhook Architecture Integration',
        'Real-Time Booking & Multi-Channel Availability Synchronisation',
        'Automated Payment Gateway & Financial Ledger Connectivity',
        'Smart Lock, Mobile Key & Digital Self Check-in Workflows',
        'CRM, Loyalty & Dynamic Revenue Management System Bridges'
      ],
      heroBadges: [
        'Open Mews Open API & Webhook Architecture Integration',
        'Real-Time Booking & Multi-Channel Availability Synchronisation',
        'Automated Payment Gateway & Financial Ledger Connectivity',
        'Smart Lock, Mobile Key & Digital Self Check-in Workflows',
        'CRM, Loyalty & Dynamic Revenue Management System Bridges'
      ],

      // Section 1: Connect Mews With Your Hospitality Technology Stack
      subServicesTitle: 'Connect Mews With Your Hospitality Technology Stack',
      subServicesIntro: 'Modern hospitality businesses require connected systems to manage guest services, reservations, and internal operations efficiently. We develop Mews integrations that connect your PMS with essential applications, including:',
      subServicesItems: [
        {
          icon: 'Share2',
          tag: 'BOOKING CHANNELS & OTAS',
          title: 'Booking channels and online travel agencies.',
          desc: 'Seamless two-way distribution across global online travel agencies and channel managers with instant rate and inventory updates.',
          pills: ['Channel Distribution', 'Live Availability', 'Instant Sync'],
          colorTheme: 'cyan'
        },
        {
          icon: 'Globe',
          tag: 'DIRECT BOOKINGS',
          title: 'Direct booking websites.',
          desc: 'Connect custom booking engines and website reservation portals directly to Mews Commander for zero-commission direct bookings.',
          pills: ['Custom Web Engine', 'Direct Reservations', 'Zero Commission'],
          colorTheme: 'purple'
        },
        {
          icon: 'CreditCard',
          tag: 'PAYMENT GATEWAYS',
          title: 'Payment platforms.',
          desc: 'Integrate secure payment gateways with Mews Payments for automatic tokenization, scheduled payments, and terminal synchronization.',
          pills: ['Mews Payments', 'Automated Settlement', 'Card Tokenization'],
          colorTheme: 'cyan'
        },
        {
          icon: 'Users',
          tag: 'GUEST ENGAGEMENT',
          title: 'CRM and guest engagement systems.',
          desc: 'Sync guest profiles, preferences, and stay histories with CRM and automated guest messaging platforms for tailored communication.',
          pills: ['CRM Integration', 'Guest Profiles', 'Loyalty Tracking'],
          colorTheme: 'purple'
        },
        {
          icon: 'KeyRound',
          tag: 'SMART ACCESS',
          title: 'Smart locks and access control solutions.',
          desc: 'Automate digital key generation and pin delivery with keyless smart locks to enable seamless 24/7 self check-in.',
          pills: ['Digital Keycards', 'Keyless Self Check-in', 'Smart Locks'],
          colorTheme: 'cyan'
        },
        {
          icon: 'PieChart',
          tag: 'FINANCIAL LEDGERS',
          title: 'Accounting software.',
          desc: 'Synchronise daily revenue breakdowns, invoices, and payment payouts directly into enterprise accounting solutions.',
          pills: ['QuickBooks & Xero', 'Daily Payout Sync', 'Automated Ledger'],
          colorTheme: 'purple'
        },
        {
          icon: 'TrendingUp',
          tag: 'REVENUE MANAGEMENT',
          title: 'Revenue management platforms.',
          desc: 'Connect dynamic pricing algorithms and RMS platforms to automatically adjust rates based on demand and market occupancy.',
          pills: ['Dynamic Pricing', 'Demand Forecasting', 'Rate Automation'],
          colorTheme: 'cyan'
        },
        {
          icon: 'BarChart3',
          tag: 'ANALYTICS & BI',
          title: 'Business intelligence tools.',
          desc: 'Extract deep multi-property data from Mews into business intelligence dashboards for ADR, RevPAR, and operational reporting.',
          pills: ['BI Dashboards', 'RevPAR & ADR', 'Custom Reports'],
          colorTheme: 'purple'
        }
      ],

      // Section 2: Core Specialized Modules (6 Modules)
      coreSolutionsTitle: 'Core Mews Integration Solutions',
      coreSolutionsIntro: 'Our custom engineering services empower modern hotels and serviced apartments to unlock the full potential of Mews PMS.',
      coreSolutions: [
        {
          id: 'mews-api',
          title: 'Mews API Integration Services',
          subtitle: 'Open API Architecture, Custom Endpoints & Webhook Workflows',
          desc: 'Mews is built around an open API ecosystem that allows businesses to connect external applications and create customised workflows. We provide Mews API integration services that help businesses develop flexible and scalable solutions. Our Mews API services include:',
          icon: 'Terminal',
          badge: 'API SERVICES',
          features: [
            'Custom API development.',
            'Third-party application integration.',
            'Data synchronisation.',
            'Automated workflow creation.',
            'API optimisation and testing.'
          ]
        },
        {
          id: 'booking-reservation',
          title: 'Mews Booking And Reservation Integration',
          subtitle: 'Real-Time Channel Synchronization, Room Inventory & Guest Profiles',
          desc: 'Reservation management requires accurate communication between booking channels and property systems. We help connect Mews with external booking platforms to maintain updated availability, reservations, and guest information. Our reservation integration solutions support:',
          icon: 'Calendar',
          badge: 'RESERVATIONS',
          features: [
            'Real-time booking synchronisation.',
            'Room availability updates.',
            'Guest profile management.',
            'Reservation status tracking.',
            'Automated booking workflows.'
          ]
        },
        {
          id: 'payment-financial',
          title: 'Mews Payment And Financial Integration',
          subtitle: 'Automated Processing, Payment Gateways & Accounting Sync',
          desc: 'Payment processing is an important part of modern hotel operations. Connected financial systems help hospitality businesses improve accuracy and maintain better control over revenue operations. We connect Mews with payment platforms and financial systems to improve transaction management. Our payment integration services include:',
          icon: 'CreditCard',
          badge: 'FINANCIAL & PAYMENTS',
          features: [
            'Payment gateway connections.',
            'Automated payment processing.',
            'Transaction synchronisation.',
            'Billing workflow automation.',
            'Accounting system integration.'
          ]
        },
        {
          id: 'smart-lock-self-service',
          title: 'Mews Smart Lock And Self-Service Integration',
          subtitle: 'Digital Mobile Keys, Self Check-in Kiosks & Remote Access Control',
          desc: 'Technology-driven hotels increasingly use automated access solutions to improve guest convenience. These integrations help hotels provide flexible and convenient experiences while reducing front-desk workload. We integrate Mews with smart lock systems and self-service technologies. Our smart hospitality solutions include:',
          icon: 'KeyRound',
          badge: 'SMART HOSPITALITY',
          features: [
            'Digital key integration.',
            'Automated check-in workflows.',
            'Mobile guest access.',
            'Smart device connectivity.',
            'Remote access management.'
          ]
        },
        {
          id: 'crm-guest-experience',
          title: 'Mews CRM And Guest Experience Integration',
          subtitle: 'Automated Guest Messaging, Loyalty Programs & Tailored Stays',
          desc: 'Guest expectations continue to evolve, and personalised communication has become essential for hospitality businesses. We connect Mews with CRM and communication platforms to improve guest engagement. Our solutions support:',
          icon: 'MessageSquare',
          badge: 'GUEST ENGAGEMENT',
          features: [
            'Automated guest messaging.',
            'Customer profile synchronisation.',
            'Loyalty program connections.',
            'Marketing automation.',
            'Personalised guest workflows.'
          ]
        },
        {
          id: 'revenue-management',
          title: 'Mews Revenue Management Integration',
          subtitle: 'Dynamic Pricing Algorithms, Performance Dashboards & BI Sync',
          desc: 'Revenue optimisation requires accurate data from multiple systems. We help connect Mews with revenue management and analytics platforms to support better business decisions. Our solutions include:',
          icon: 'TrendingUp',
          badge: 'REVENUE OPTIMIZATION',
          features: [
            'Pricing system integration.',
            'Revenue data synchronisation.',
            'Performance reporting.',
            'Analytics dashboard connections.',
            'Business intelligence integration.'
          ]
        }
      ],

      // Section 3: Our Mews Integration Process
      serviceProcessTitle: 'Our Mews Integration Process',
      serviceProcessIntro: 'Cubixsol follows a structured approach to deliver successful Mews integration projects:',
      serviceProcessSteps: [
        {
          stepNumber: '01',
          title: 'Requirement Assessment:',
          desc: 'Our team analyses your hospitality operations, existing software, and integration objectives.'
        },
        {
          stepNumber: '02',
          title: 'Solution Architecture:',
          desc: 'We design a technical framework based on your business requirements.'
        },
        {
          stepNumber: '03',
          title: 'Development And Integration:',
          desc: 'Our developers build secure connections between Mews and selected platforms.'
        },
        {
          stepNumber: '04',
          title: 'Testing And Deployment:',
          desc: 'We verify system performance, security, and data accuracy.'
        },
        {
          stepNumber: '05',
          title: 'Support And Optimization:',
          desc: 'Our team provides ongoing assistance to maintain reliable integration performance.'
        }
      ],

      // Section 4: Why Choose Cubixsol For Mews Integration
      whyChooseTitle: 'Why Choose Cubixsol For Mews Integration?',
      whyChooseIntro: 'Cubixsol helps hospitality businesses take advantage of Mews’ open and flexible ecosystem through custom integration solutions. Our team focuses on building modern connections that improve automation, enhance guest experiences, and simplify hotel operations.\n\nWe develop Mews integrations that connect reservations, payments, smart technologies, CRM platforms, and business analytics into one efficient workflow. Whether you need API development, automation solutions, or third-party software connectivity, Cubixsol creates Mews integrations that support your operational goals and long-term growth.',
      whyChooseItems: [
        {
          title: 'Open API Specialization',
          desc: 'Deep engineering experience with Mews Open API, WebSocket events, and Commander integrations.'
        },
        {
          title: 'Automated Guest Journeys',
          desc: 'End-to-end self-service flows from pre-stay web check-in to mobile smart lock pin generation and digital checkout.'
        },
        {
          title: 'Unified Hospitality Stack',
          desc: 'Bridging front-desk, payment terminals, revenue engines, and back-office accounting into one frictionless ecosystem.'
        },
        {
          title: 'Ongoing Monitoring & Support',
          desc: 'Proactive API rate limit optimization, error-handling webhooks, and round-the-clock technical maintenance.'
        }
      ],

      // Section 5: FAQs
      faqs: [
        {
          q: 'What Mews Integration services does Cubixsol provide?',
          a: 'Cubixsol develops Mews integrations with booking platforms, payment systems, CRM tools, smart devices, revenue management platforms, and custom applications.'
        },
        {
          q: 'Can Mews integrate with third-party applications?',
          a: 'Yes, Mews supports an open API ecosystem, and Cubixsol can create customised integrations with external systems.'
        },
        {
          q: 'Does Cubixsol offer Mews API integration services?',
          a: 'Yes, our developers build API-based solutions that connect Mews with different business applications.'
        },
        {
          q: 'Can Mews integrate with smart lock systems?',
          a: 'Yes, Mews can connect with smart access solutions to support automated check-in and digital guest entry.'
        },
        {
          q: 'How can Mews integration improve hotel operations?',
          a: 'Mews integration helps automate workflows, improve data exchange, and create a more efficient hospitality management system.'
        }
      ],

      // SEO
      seo: {
        metaTitle: 'Mews Integration Services | Custom PMS Solutions | Cubixsol',
        metaDescription: 'Professional Mews PMS integration services by Cubixsol. Connect Mews with open APIs, smart locks, payment gateways, booking channels, and CRMs.',
        keywords: 'Mews integration, Mews PMS API, hotel cloud PMS integration, Mews Commander, smart locks integration, Cubixsol',
        ogTitle: 'Mews Integration Services | Cubixsol',
        ogDescription: 'Custom Mews integration solutions for modern hospitality operations. API development, smart locks, payment processing, and automated guest journeys.',
        ogImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&h=800&q=80',
        canonicalUrl: 'https://cubixsol.com/mews-integration'
      }
    };

    // 1. Upsert into MongoDB Service collection
    const updated = await Service.findOneAndUpdate(
      { slug: 'mews-integration' },
      { $set: mewsData },
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
    );
    console.log('✅ Successfully seeded Mews Integration service in MongoDB Atlas:', updated.slug);

    // 2. Update seedData.json
    const seedJsonPath = path.join(__dirname, 'seedData.json');
    if (fs.existsSync(seedJsonPath)) {
      const seedData = JSON.parse(fs.readFileSync(seedJsonPath, 'utf-8'));
      const idx = seedData.initialServices.findIndex(s => s.slug === 'mews-integration');
      if (idx >= 0) {
        seedData.initialServices[idx] = mewsData;
      } else {
        seedData.initialServices.push(mewsData);
      }
      fs.writeFileSync(seedJsonPath, JSON.stringify(seedData, null, 2), 'utf-8');
      console.log('✅ Successfully updated seedData.json with Mews Integration service.');
    }

    const count = await Service.countDocuments();
    console.log(`Total services in MongoDB Atlas: ${count}`);

    await mongoose.disconnect();
    console.log('🔌 Disconnected cleanly from MongoDB.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding Mews service:', err);
    process.exit(1);
  }
}

seedMews();
