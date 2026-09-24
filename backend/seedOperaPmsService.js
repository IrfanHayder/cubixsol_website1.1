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

async function seedOperaPms() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 15000 });
    console.log('Connected successfully to MongoDB Atlas.');

    const operaData = {
      slug: 'opera-pms-integration',
      title: 'Opera PMS Integration Services',
      cardTitle: 'Opera PMS Integration',
      menuTitle: 'Opera PMS Integration',
      icon: 'Building2',
      color: 'text-[#00a4d8] bg-[#00a4d8]/10',
      gradient: 'from-[#00a4d8] to-[#5d53a3]',
      heroEyebrow: 'OPERA PMS INTEGRATION SERVICES',
      heroSubtitle: 'Custom Opera PMS Integration Solutions For Enterprise Hotels',
      heroTitle: 'Custom Opera PMS Integration Solutions For Enterprise Hotels',
      heroImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&h=800&q=80',
      desc: 'Cubixsol provides professional Opera PMS integration services to help hotels and hospitality organisations connect their property management system with modern digital solutions. Opera PMS is a widely used hotel property management system. We develop Opera PMS capabilities through secure integrations to connect hotels with third-party platforms and business applications.',
      longDesc: 'Cubixsol provides professional Opera PMS integration services to help hotels and hospitality organisations connect their property management system with modern digital solutions. Opera PMS is a widely used hotel property management system. We develop Opera PMS capabilities through secure integrations to connect hotels with third-party platforms and business applications.',
      additionalParagraph: 'Large hotels require multiple systems to manage guest services, financial operations, and daily activities. We develop Opera PMS integrations that connect your system with essential hospitality technologies, including online travel agencies and booking platforms, central reservation systems, payment gateways, point of sale (POS) systems, customer relationship management platforms, accounting software, door lock and access control systems, and business intelligence solutions.',
      heroPrimaryBtnText: 'Schedule An Opera PMS Consultation',
      heroSecondaryBtnText: 'Explore Opera PMS Solutions',
      ctaPrimaryText: 'Schedule An Opera PMS Consultation',
      ctaSecondaryText: 'Explore Opera PMS Solutions',
      features: [
        'Enterprise Channel & Central Reservation System (CRS) Bridging',
        'Custom Opera PMS API Development & OWS / OXI Integration',
        'Restaurant POS Charge Posting & Departmental Folio Routing',
        'Automated Payment Gateways & Accounting Ledger Synchronization',
        'Digital Check-in, Keyless Door Access & Guest Loyalty Integration'
      ],
      heroBadges: [
        'Enterprise Channel & Central Reservation System (CRS) Bridging',
        'Custom Opera PMS API Development & OWS / OXI Integration',
        'Restaurant POS Charge Posting & Departmental Folio Routing',
        'Automated Payment Gateways & Accounting Ledger Synchronization',
        'Digital Check-in, Keyless Door Access & Guest Loyalty Integration'
      ],

      // Section 1: Connect Opera PMS With Your Hotel Technology Ecosystem
      subServicesTitle: 'Connect Opera PMS With Your Hotel Technology Ecosystem',
      subServicesIntro: 'Large hotels require multiple systems to manage guest services, financial operations, and daily activities. We develop Opera PMS integrations that connect your system with essential hospitality technologies, including:',
      subServicesItems: [
        {
          icon: 'Share2',
          tag: 'BOOKING PLATFORMS',
          title: 'Online travel agencies and booking platforms.',
          desc: 'Synchronise room availability, rates, and guest profiles in real time across global OTAs and booking channels.',
          pills: ['OTA 2-Way Sync', 'Live Rate Parity', 'Instant Availability'],
          colorTheme: 'cyan'
        },
        {
          icon: 'Network',
          tag: 'CENTRAL RESERVATIONS',
          title: 'Central reservation systems.',
          desc: 'Connect global distribution networks and CRS platforms directly with Opera PMS for unified multi-property inventory routing.',
          pills: ['GDS / CRS Bridge', 'Multi-Property Hub', 'Global Distribution'],
          colorTheme: 'purple'
        },
        {
          icon: 'CreditCard',
          tag: 'PAYMENT GATEWAYS',
          title: 'Payment gateways.',
          desc: 'Integrate secure payment processors to automate pre-authorizations, folio settlements, and card tokenization.',
          pills: ['Stripe & Merchant Pay', 'Pre-Auth Holds', 'Tokenized Security'],
          colorTheme: 'cyan'
        },
        {
          icon: 'Laptop',
          tag: 'POS SYSTEMS',
          title: 'Point of sale (POS) systems.',
          desc: 'Enable seamless room charge postings from restaurants, bars, spas, and outlets directly to guest folios in Opera.',
          pills: ['Restaurant POS Bridge', 'Room Charge Posting', 'Folio Routing'],
          colorTheme: 'purple'
        },
        {
          icon: 'Users',
          tag: 'CRM PLATFORMS',
          title: 'Customer relationship management platforms.',
          desc: 'Consolidate guest preferences, stay histories, and VIP loyalty profiles with enterprise CRM platforms.',
          pills: ['HubSpot / Salesforce', 'Guest History Sync', 'Loyalty Tracking'],
          colorTheme: 'cyan'
        },
        {
          icon: 'PieChart',
          tag: 'ACCOUNTING',
          title: 'Accounting software.',
          desc: 'Synchronise night audit totals, departmental revenue, taxes, and ledgers with enterprise accounting software.',
          pills: ['QuickBooks & SAP', 'Night Audit Sync', 'Tax Automations'],
          colorTheme: 'purple'
        },
        {
          icon: 'KeyRound',
          tag: 'ACCESS CONTROL',
          title: 'Door lock and access control systems.',
          desc: 'Connect RFID keycards and digital smart locks (Assa Abloy, VingCard, Salto) to automate guest room access.',
          pills: ['VingCard / Salto', 'Keyless Mobile Access', 'Automated Check-in'],
          colorTheme: 'cyan'
        },
        {
          icon: 'BarChart3',
          tag: 'BUSINESS INTELLIGENCE',
          title: 'Business intelligence solutions.',
          desc: 'Bridge Opera PMS data with BI analytics dashboards to track RevPAR, ADR, occupancy rates, and departmental profitability.',
          pills: ['BI Dashboards', 'RevPAR & ADR Trends', 'Occupancy Analytics'],
          colorTheme: 'purple'
        }
      ],

      // Section 2: Core Specialized Modules
      coreSolutionsTitle: 'Core Opera PMS Integration Solutions',
      coreSolutionsIntro: 'Our specialized integration modules bridge Opera PMS with every operational touchpoint of your hotel enterprise.',
      coreSolutions: [
        {
          id: 'channel-reservation',
          title: 'Opera PMS Channel And Reservation Integration',
          subtitle: 'Multi-Source Booking Synchronization & Centralized Inventory Control',
          desc: 'Hotels receive bookings from multiple sources, including direct websites, travel agencies, and online booking platforms. We help connect Opera PMS with reservation channels to maintain accurate booking information. Our reservation integration services include:',
          icon: 'Share2',
          badge: 'RESERVATION INTEGRATION',
          features: [
            'Reservation synchronisation.',
            'Room availability updates.',
            'Guest profile transfer.',
            'Rate and inventory management.',
            'Booking status automation.'
          ]
        },
        {
          id: 'api-services',
          title: 'Opera PMS API Integration Services',
          subtitle: 'Secure API Framework, Custom Data Bridges & OWS / OXI Connectivity',
          desc: 'We provide custom Opera PMS API integration solutions that allow hotels to connect their existing applications with their property management system. Our developers build secure and reliable integrations based on business requirements. Our Opera PMS API services include:',
          icon: 'Terminal',
          badge: 'API DEVELOPMENT',
          features: [
            'Custom API development.',
            'Third-party application connections.',
            'Data synchronisation solutions.',
            'Workflow automation.',
            'System integration testing.'
          ]
        },
        {
          id: 'pos-integration',
          title: 'Opera PMS POS Integration',
          subtitle: 'Seamless F&B Charge Posting, Guest Account Sync & Department Reporting',
          desc: 'Hotels often require smooth communication between front-office systems and restaurant or service operations. We integrate Opera PMS with POS platforms to improve billing accuracy and guest convenience. Our POS integration solutions support:',
          icon: 'Laptop',
          badge: 'POS & OUTLETS',
          features: [
            'Restaurant charge posting.',
            'Guest account synchronisation.',
            'Billing automation.',
            'Transaction data exchange.',
            'Department-level reporting.'
          ]
        },
        {
          id: 'payment-accounting',
          title: 'Opera PMS Payment And Accounting Integration',
          subtitle: 'Automated Billing Workflows, Invoice Management & Ledger Connectivity',
          desc: 'Financial management is a critical part of hotel operations. Connected financial systems help hotels maintain accurate records and improve revenue management processes. We connect Opera PMS with payment and accounting systems to improve transaction processing and reporting. Our solutions include:',
          icon: 'CreditCard',
          badge: 'FINANCIAL MANAGEMENT',
          features: [
            'Payment gateway integration.',
            'Automated billing workflows.',
            'Invoice management.',
            'Financial data synchronisation.',
            'Accounting software connectivity.'
          ]
        },
        {
          id: 'guest-experience',
          title: 'Opera PMS Guest Experience Integration',
          subtitle: 'Personalized Hospitality Services, Digital Check-in & Mobile Solutions',
          desc: 'Modern hotels use technology to improve guest satisfaction throughout the stay. We develop Opera PMS integrations that support personalised guest services and automated communication. Our guest experience solutions include:',
          icon: 'MessageSquare',
          badge: 'GUEST EXPERIENCE',
          features: [
            'Digital check-in systems.',
            'Guest messaging platforms.',
            'Loyalty program connections.',
            'Customer relationship management.',
            'Mobile hospitality solutions.'
          ]
        }
      ],

      // Section 3: Our Opera PMS Integration Process
      serviceProcessTitle: 'Our Opera PMS Integration Process',
      serviceProcessIntro: 'Cubixsol follows a professional approach to deliver reliable Opera PMS integration solutions:',
      serviceProcessSteps: [
        {
          stepNumber: '01',
          title: 'Requirement Analysis:',
          desc: 'Our team evaluates your hotel operations, existing systems, and integration objectives.'
        },
        {
          stepNumber: '02',
          title: 'Technical Architecture:',
          desc: 'We design a secure integration framework based on your business environment.'
        },
        {
          stepNumber: '03',
          title: 'Development And Configuration:',
          desc: 'Our developers build and configure the required system connections.'
        },
        {
          stepNumber: '04',
          title: 'Testing And Deployment:',
          desc: 'We verify performance, security, and data accuracy before implementation.'
        },
        {
          stepNumber: '05',
          title: 'Support And Maintenance:',
          desc: 'Our team provides ongoing technical support after deployment.'
        }
      ],

      // Section 4: Why Choose Cubixsol For Opera PMS Integration
      whyChooseTitle: 'Why Choose Cubixsol For Opera PMS Integration?',
      whyChooseIntro: 'Cubixsol delivers enterprise-focused Opera PMS integration solutions designed for hotels that require reliable system connectivity. Our developers understand the complexity of hospitality environments and build integrations to improve communication between front-office, financial, and operational systems.\n\nWe create solutions that connect Opera PMS with the technologies hotels rely on every day, including booking platforms, POS systems, payment tools, and guest service applications. Cubixsol focuses on secure development, smooth data exchange, and scalable integrations that support modern hotel operations.',
      whyChooseItems: [
        {
          title: 'Enterprise Hotel Architecture',
          desc: 'Custom engineered data bridges tailored to your exact property portfolio size, third-party software stack, and hospitality model.'
        },
        {
          title: 'Zero Double-Booking Guarantee',
          desc: 'Sub-second bidirectional synchronization across global OTAs, central reservation systems, and direct web engines.'
        },
        {
          title: 'Frictionless POS & Folio Routing',
          desc: 'Instant restaurant and spa charge posting mapped automatically to guest room folios with department-level auditing.'
        },
        {
          title: 'End-to-End Technical Support',
          desc: 'Continuous monitoring, webhook error handling, API version maintenance, and 24/7 technical oversight.'
        }
      ],

      // Section 5: FAQs
      faqs: [
        {
          q: 'What Opera PMS integration services does Cubixsol provide?',
          a: 'Cubixsol develops Opera PMS integrations with booking platforms, POS systems, payment gateways, CRM tools, accounting software, and other hospitality applications.'
        },
        {
          q: 'Can Opera PMS integrate with third-party hotel systems?',
          a: 'Yes, Opera PMS can connect with external platforms, and Cubixsol develops customised integration solutions based on hotel requirements.'
        },
        {
          q: 'Does Cubixsol provide Opera PMS API integration?',
          a: 'Yes, our developers create API-based integrations that connect Opera PMS with external applications and business systems.'
        },
        {
          q: 'Can Opera PMS integrate with POS systems?',
          a: 'Yes, Opera PMS can connect with POS solutions to synchronise guest charges, billing information, and operational data.'
        },
        {
          q: 'How does Opera PMS integration improve hotel management?',
          a: 'Opera PMS integration improves data accuracy, automates workflows, and helps hotels manage operations more efficiently.'
        }
      ],

      // SEO
      seo: {
        metaTitle: 'Opera PMS Integration Services | Enterprise Hotel Solutions | Cubixsol',
        metaDescription: 'Professional Opera PMS integration services by Cubixsol. Connect Opera PMS with POS systems, OTAs, payment gateways, access controls, and CRMs.',
        keywords: 'Opera PMS integration, Opera PMS API, hotel PMS integration, Opera POS integration, Oracle Opera PMS, Cubixsol',
        ogTitle: 'Opera PMS Integration Services | Cubixsol',
        ogDescription: 'Custom Opera PMS integration solutions for enterprise hotels. POS charge posting, channel synchronization, API bridges, and automated workflows.',
        ogImage: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&h=800&q=80',
        canonicalUrl: 'https://cubixsol.com/opera-pms-integration'
      }
    };

    // 1. Upsert into MongoDB Service collection
    const updated = await Service.findOneAndUpdate(
      { slug: 'opera-pms-integration' },
      { $set: operaData },
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
    );
    console.log('✅ Successfully seeded Opera PMS Integration service in MongoDB Atlas:', updated.slug);

    // 2. Update seedData.json
    const seedJsonPath = path.join(__dirname, 'seedData.json');
    if (fs.existsSync(seedJsonPath)) {
      const seedData = JSON.parse(fs.readFileSync(seedJsonPath, 'utf-8'));
      const idx = seedData.initialServices.findIndex(s => s.slug === 'opera-pms-integration');
      if (idx >= 0) {
        seedData.initialServices[idx] = operaData;
      } else {
        seedData.initialServices.push(operaData);
      }
      fs.writeFileSync(seedJsonPath, JSON.stringify(seedData, null, 2), 'utf-8');
      console.log('✅ Successfully updated seedData.json with Opera PMS Integration service.');
    }

    const count = await Service.countDocuments();
    console.log(`Total services in MongoDB Atlas: ${count}`);

    await mongoose.disconnect();
    console.log('🔌 Disconnected cleanly from MongoDB.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding Opera PMS service:', err);
    process.exit(1);
  }
}

seedOperaPms();
