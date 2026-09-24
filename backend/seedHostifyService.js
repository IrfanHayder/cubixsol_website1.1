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

async function seedHostify() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 15000 });
    console.log('Connected successfully to MongoDB Atlas.');

    const hostifyData = {
      slug: 'hostify-integration',
      title: 'Hostify Integration Services',
      cardTitle: 'Hostify Integration',
      menuTitle: 'Hostify Integration',
      icon: 'Building2',
      color: 'text-[#00a4d8] bg-[#00a4d8]/10',
      gradient: 'from-[#00a4d8] to-[#0077b6]',
      heroEyebrow: 'HOSTIFY INTEGRATION SERVICES',
      heroSubtitle: 'Hostify Integration Services To Automate Vacation Rental Operations',
      heroTitle: 'Hostify Integration Services To Automate Vacation Rental Operations',
      heroImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&h=800&q=80',
      desc: 'Cubixsol provides professional Hostify integration services to vacation rental businesses. We enhance Hostify functionality through custom integrations that connect your existing tools and support your specific business requirements. Our developers build customised integrations that improve reservation management, automate operational tasks, and create efficient workflows across different business applications.',
      longDesc: 'Cubixsol provides professional Hostify integration services to vacation rental businesses. We enhance Hostify functionality through custom integrations that connect your existing tools and support your specific business requirements. Our developers build customised integrations that improve reservation management, automate operational tasks, and create efficient workflows across different business applications.',
      additionalParagraph: 'Vacation rental companies often rely on multiple digital solutions to manage their operations. Our integration solutions allow different platforms to exchange information smoothly and create a more efficient rental management workflow. We develop Hostify integrations that connect your PMS with important business systems, including Airbnb, Booking.com, Vrbo, direct booking websites, payment gateways, CRM platforms, smart locks, accounting software, communication tools, and reporting applications.',
      heroPrimaryBtnText: 'Schedule A Hostify Consultation',
      heroSecondaryBtnText: 'Explore Hostify Capabilities',
      ctaPrimaryText: 'Schedule A Hostify Consultation',
      ctaSecondaryText: 'Explore Hostify Capabilities',
      features: [
        '2-Way Channel Synchronisation & OTA Bridges',
        'Custom Hostify API Development & Webhooks',
        'Automated Payment Gateway & CRM Connections',
        'Smart Lock Access & Keyless Check-in Automation',
        'Multi-Property Unified Operations & Reporting'
      ],
      heroBadges: [
        '2-Way Channel Synchronisation & OTA Bridges',
        'Custom Hostify API Development & Webhooks',
        'Automated Payment Gateway & CRM Connections',
        'Smart Lock Access & Keyless Check-in Automation',
        'Multi-Property Unified Operations & Reporting'
      ],

      // Section 1: Connect Hostify With Your Business Applications
      subServicesTitle: 'Connect Hostify With Your Business Applications',
      subServicesIntro: 'Vacation rental companies often rely on multiple digital solutions to manage their operations. Our integration solutions allow different platforms to exchange information smoothly and create a more efficient rental management workflow. We develop Hostify integrations that connect your PMS with important business systems, including:',
      subServicesItems: [
        {
          icon: 'Share2',
          tag: 'BOOKING CHANNELS',
          title: 'Airbnb, Booking.com, Vrbo, and other booking channels',
          desc: 'Synchronise rates, calendar availability, content, and instant reservations across all major global OTAs and booking channels in real-time.',
          pills: ['Airbnb Realtime Sync', 'Booking.com Rates', 'Vrbo Instant Booking'],
          colorTheme: 'cyan'
        },
        {
          icon: 'Globe',
          tag: 'DIRECT BOOKINGS',
          title: 'Direct booking websites',
          desc: 'Seamlessly link custom direct booking engines with Hostify to bypass OTA commission fees while keeping availability 100% unified.',
          pills: ['Custom Booking Engine', 'Commission-Free Flow', 'Instant Confirmation'],
          colorTheme: 'blue'
        },
        {
          icon: 'CreditCard',
          tag: 'FINANCIAL SETTLEMENTS',
          title: 'Payment gateways',
          desc: 'Connect secure payment processors (Stripe, Authorize.Net, PayPal) to automatically collect prepayments, balance settlements, and security deposits.',
          pills: ['Stripe Gateway', 'Automated Deposit Holds', 'Card Tokenization'],
          colorTheme: 'cyan'
        },
        {
          icon: 'Users',
          tag: 'GUEST RELATIONSHIPS',
          title: 'CRM platforms',
          desc: 'Consolidate guest profiles, stay histories, customer preferences, and lead nurturing pipelines with HubSpot, Salesforce, and modern CRMs.',
          pills: ['HubSpot / Salesforce', 'Guest History Consolidation', 'Loyalty Tracking'],
          colorTheme: 'blue'
        },
        {
          icon: 'KeyRound',
          tag: 'KEYLESS ENTRY',
          title: 'Smart lock systems',
          desc: 'Integrate smart access systems (Yale, Schlage, August, RemoteLock) to auto-generate time-bounded door PINs matching reservation check-in and check-out times.',
          pills: ['Automated Door PINs', 'RemoteLock / Yale', 'Contactless Guest Entry'],
          colorTheme: 'cyan'
        },
        {
          icon: 'PieChart',
          tag: 'ACCOUNTING & LEDGERS',
          title: 'Accounting software',
          desc: 'Synchronise payouts, cleaning fees, owner disbursements, and local tax records directly with QuickBooks, Xero, or custom accounting systems.',
          pills: ['QuickBooks & Xero', 'Tax Split Automations', 'Owner Payout Reports'],
          colorTheme: 'blue'
        },
        {
          icon: 'MessageSquare',
          tag: 'COMMUNICATION & OPS',
          title: 'Communication and automation tools',
          desc: 'Trigger automated WhatsApp, SMS, and email messages for pre-arrival instructions, mid-stay check-ins, review collection, and staff task dispatch.',
          pills: ['Automated Guest SMS', 'Staff Workflows', 'Review Generation'],
          colorTheme: 'cyan'
        },
        {
          icon: 'BarChart3',
          tag: 'PERFORMANCE ANALYTICS',
          title: 'Reporting applications',
          desc: 'Bridge Hostify data with business intelligence dashboards and reporting tools to track RevPAR, occupancy rates, and channel ROI in real-time.',
          pills: ['BI Dashboards', 'RevPAR & Occupancy', 'Multi-Unit Analytics'],
          colorTheme: 'blue'
        }
      ],

      // Section 2: Core Specialized Modules
      coreSolutionsTitle: 'Specialised Hostify Integration Capabilities',
      coreSolutionsIntro: 'Our specialized integration modules bridge Hostify with every operational touchpoint of your vacation rental business.',
      coreSolutions: [
        {
          id: 'channel-management',
          title: 'Hostify Channel Management Integration',
          subtitle: 'Unified Multi-Channel Synchronisation & Accurate Calendar Control',
          desc: 'Cubixsol helps businesses connect Hostify with external channels to maintain updated reservations, availability, and listing information. A connected channel management system helps property managers reduce manual updates and maintain consistent data across all platforms. Our channel integration services include:',
          icon: 'Share2',
          badge: 'CHANNEL SYNCHRONISATION',
          features: [
            'Reservation synchronisation.',
            'Calendar management.',
            'Listing updates.',
            'Guest information transfer.',
            'Booking status automation.'
          ]
        },
        {
          id: 'api-services',
          title: 'Hostify API Integration Services',
          subtitle: 'Secure API Architecture & Custom Bidirectional Data Bridges',
          desc: 'We provide custom Hostify API integration solutions that allow businesses to connect their preferred applications with their property management system. Our developers create secure API connections that support reliable data exchange. Our Hostify API services include:',
          icon: 'Terminal',
          badge: 'CUSTOM API ENGINEERING',
          features: [
            'Custom API development.',
            'Third-party software integration.',
            'Automated workflows.',
            'Data synchronisation.',
            'API testing and optimisation.'
          ]
        },
        {
          id: 'smart-locks',
          title: 'Hostify Smart Lock And Automation Integration',
          subtitle: 'Keyless Guest Entry, Automated PINs & Operational Notifications',
          desc: 'Automation improves property management by reducing repetitive tasks and improving guest convenience. Cubixsol connects Hostify with smart technologies to support modern rental operations. Our solutions allow rental businesses to provide smoother self-service experiences for guests. Our automation solutions include:',
          icon: 'KeyRound',
          badge: 'SMART AUTOMATION',
          features: [
            'Digital access management.',
            'Smart lock connectivity.',
            'Automated guest entry.',
            'Check-in workflow automation.',
            'Property notifications.'
          ]
        },
        {
          id: 'payment-crm',
          title: 'Hostify Payment And CRM Integration',
          subtitle: 'Automated Financial Settlements, Guest CRM & Transaction Tracking',
          desc: 'Cubixsol integrates Hostify with payment platforms and CRM systems to improve business organisation. Connected systems provide better visibility into customer relationships and financial activities. Our solutions support:',
          icon: 'CreditCard',
          badge: 'FINANCIAL & CRM',
          features: [
            'Payment gateway connections.',
            'Guest data management.',
            'CRM synchronisation.',
            'Marketing automation.',
            'Transaction tracking.'
          ]
        }
      ],

      // Section 3: Our Hostify Integration Process
      serviceProcessTitle: 'Our Hostify Integration Process',
      serviceProcessIntro: 'Cubixsol follows a structured process to deliver reliable Hostify integration solutions:',
      serviceProcessSteps: [
        {
          stepNumber: '01',
          title: 'Requirement Analysis',
          desc: 'Our team studies your business workflow, existing tools, and integration objectives.'
        },
        {
          stepNumber: '02',
          title: 'Technical Planning',
          desc: 'We design an integration strategy based on your required features.'
        },
        {
          stepNumber: '03',
          title: 'Development And Configuration',
          desc: 'Our developers create and configure secure system connections.'
        },
        {
          stepNumber: '04',
          title: 'Testing And Deployment',
          desc: 'We verify performance, security, and data accuracy before launch.'
        },
        {
          stepNumber: '05',
          title: 'Support And Maintenance',
          desc: 'Our team provides ongoing assistance after implementation.'
        }
      ],

      // Section 4: Why Choose Cubixsol For Hostify Integration
      whyChooseTitle: 'Why Choose Cubixsol For Hostify Integration?',
      whyChooseIntro: 'Cubixsol helps vacation rental companies improve their operational efficiency through custom Hostify integrations designed around real business challenges. Our developers focus on creating connections that simplify multi-property management, automate repetitive processes, and improve system communication.\n\nWe build Hostify solutions that support growing rental businesses by connecting booking channels, automation tools, payment systems, and customer management platforms. From API development, channel synchronisation and workflow automation, we create flexible integrations that match your business goals.',
      whyChooseItems: [
        {
          title: 'Custom-Tailored Integration Architecture',
          desc: 'Every integration is engineered around your exact property portfolio, third-party software stack, and unique operational workflows.'
        },
        {
          title: 'Zero Double-Booking Reliability',
          desc: 'Bidirectional high-speed synchronization ensures calendars, rates, and guest details update instantaneously across all OTAs.'
        },
        {
          title: 'Frictionless Guest Experience',
          desc: 'Automate keyless check-in PIN generation, automated SMS arrivals, and instant payment settlement for smooth 5-star stays.'
        },
        {
          title: 'Dedicated Engineering & Maintenance Support',
          desc: 'Our experienced engineers provide post-launch monitoring, security patches, and ongoing support for continuous uptime.'
        }
      ],

      // Section 5: FAQs
      faqs: [
        {
          q: 'What Hostify integration services does Cubixsol provide?',
          a: 'Cubixsol develops Hostify integrations with booking channels, payment platforms, CRM systems, smart devices, and other business applications.'
        },
        {
          q: 'Can Hostify integrate with Airbnb and other OTAs?',
          a: 'Yes, Hostify supports channel connections, and Cubixsol can create customised solutions for better synchronisation.'
        },
        {
          q: 'Does Cubixsol offer Hostify API integration?',
          a: 'Yes, our developers create API-based integrations that connect Hostify with external software systems.'
        },
        {
          q: 'Can Hostify connect with smart lock systems?',
          a: 'Yes, Hostify can integrate with smart access solutions for automated check-in and guest entry.'
        },
        {
          q: 'How does Hostify integration improve rental management?',
          a: 'Hostify integration reduces manual tasks, improves data accuracy, and helps businesses manage properties more efficiently.'
        }
      ],

      // SEO
      seo: {
        metaTitle: 'Hostify Integration Services | Vacation Rental PMS Automation | Cubixsol',
        metaDescription: 'Expert Hostify integration services by Cubixsol. Connect Hostify PMS with Airbnb, Vrbo, OTAs, payment gateways, CRMs, smart locks, and accounting software.',
        keywords: 'Hostify integration, Hostify API, vacation rental PMS integration, Hostify smart locks, Hostify CRM integration, property management system, Cubixsol',
        ogTitle: 'Hostify Integration Services | Cubixsol',
        ogDescription: 'Automate vacation rental operations with custom Hostify integrations. Multi-channel synchronization, API bridges, smart lock entry, and payment connections.',
        ogImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&h=800&q=80',
        canonicalUrl: 'https://cubixsol.com/hostify-integration'
      }
    };

    // 1. Upsert into MongoDB Service collection
    const updated = await Service.findOneAndUpdate(
      { slug: 'hostify-integration' },
      { $set: hostifyData },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log('✅ Successfully seeded Hostify Integration service in MongoDB Atlas:', updated.slug);

    // 2. Update seedData.json
    const seedJsonPath = path.join(__dirname, 'seedData.json');
    if (fs.existsSync(seedJsonPath)) {
      const seedData = JSON.parse(fs.readFileSync(seedJsonPath, 'utf-8'));
      const idx = seedData.initialServices.findIndex(s => s.slug === 'hostify-integration');
      if (idx >= 0) {
        seedData.initialServices[idx] = hostifyData;
      } else {
        seedData.initialServices.push(hostifyData);
      }
      fs.writeFileSync(seedJsonPath, JSON.stringify(seedData, null, 2), 'utf-8');
      console.log('✅ Successfully updated seedData.json with Hostify Integration service.');
    }

    const count = await Service.countDocuments();
    console.log(`Total services in MongoDB Atlas: ${count}`);

    await mongoose.disconnect();
    console.log('🔌 Disconnected cleanly from MongoDB.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding Hostify service:', err);
    process.exit(1);
  }
}

seedHostify();
