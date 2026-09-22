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

async function seedNewbook() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 15000 });
    console.log('Connected successfully to MongoDB Atlas.');

    const newbookData = {
      slug: 'newbook-integration',
      title: 'Newbook Integration Services',
      cardTitle: 'Newbook Integration',
      menuTitle: 'Newbook Integration',
      icon: 'Building2',
      color: 'text-[#00a4d8] bg-[#00a4d8]/10',
      gradient: 'from-[#00a4d8] to-[#5d53a3]',
      heroSubtitle: 'Custom Newbook Integration Solutions For Hospitality Businesses',
      heroImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&h=800&q=80',
      heroEyebrow: 'NEWBOOK INTEGRATION SERVICES',
      heroTitle: 'Custom Newbook Integration Solutions For Hospitality Businesses',
      heroDesc: 'Cubixsol provides professional Newbook integration services. We enhance Newbook capabilities through custom integrations to support business-specific requirements. Our developers create customised integrations that improve reservation management, automate daily workflows, and simplify communication between different software systems.',
      heroPrimaryBtnText: 'Schedule A Newbook Consultation',
      heroSecondaryBtnText: 'Explore Solutions',
      heroBadges: [
        'Multi-Property & Resort 2-Way Channel Sync',
        'Custom Newbook Open API & Webhook Bridges',
        'Automated Payment Gateways & Xero / QuickBooks Sync',
        'Guest CRM & Contactless Mobile Journey Workflows'
      ],
      short: 'Professional Newbook PMS integrations that streamline reservations, automate financial workflows, and connect essential hospitality tools.',
      desc: 'Cubixsol provides professional Newbook integration services. We enhance Newbook capabilities through custom integrations to support business-specific requirements. Our developers create customised integrations that improve reservation management, automate daily workflows, and simplify communication between different software systems.',
      points: [
        'Newbook Booking System Integration & Channel Sync',
        'Custom Newbook API Development & Webhooks',
        'Integrated Payment Processing & Accounting Sync',
        'Guest CRM & Automated Communication Workflows',
        'Smart Access & IoT Property Automation',
        'Enterprise Resort & Multi-Site Centralized Management'
      ],

      // Section 1: Connect Newbook With Your Essential Business Systems
      subServicesTitle: 'Connect Newbook With Your Essential Business Systems',
      subServicesIntro: 'Our integration solutions reduce manual administration. We develop Newbook integrations to connect your PMS with different platforms, including:',
      subServicesItems: [
        {
          icon: 'Share2',
          tag: 'BOOKING & OTAs',
          title: 'Booking Websites & Online Channels',
          desc: 'Booking websites and online reservation channels (Airbnb, Booking.com, Agoda, Expedia) for live 2-way rate distribution and inventory parity.',
          pills: ['OTA 2-Way Sync', 'Direct Booking Engines', 'Dynamic Tariff Rules'],
          colorTheme: 'cyan'
        },
        {
          icon: 'CreditCard',
          tag: 'PAYMENTS & BILLING',
          title: 'Payment Gateways & Transaction Platforms',
          desc: 'Payment gateways and transaction platforms (Stripe, Windcave, Square) for automated guest deposit collection, card tokenization, and recurring billing.',
          pills: ['PCI-DSS Gateways', 'Automated Deposits', 'Pre-Authorization Holds'],
          colorTheme: 'purple'
        },
        {
          icon: 'Users',
          tag: 'GUEST ENGAGEMENT',
          title: 'CRM & Guest Communication Systems',
          desc: 'CRM and guest communication systems for digital check-ins, automated SMS/email arrival notifications, upsells, and guest history tracking.',
          pills: ['Digital Check-in', 'Automated SMS/Email', 'Guest History Profiles'],
          colorTheme: 'cyan'
        },
        {
          icon: 'Receipt',
          tag: 'ACCOUNTING',
          title: 'Accounting & Financial Applications',
          desc: 'Accounting and financial applications (Xero, QuickBooks, MYOB) for automated daily reconciliation, ledger syncing, and tax reporting.',
          pills: ['Xero & QuickBooks', 'Daily Ledger Sync', 'Owner Settlement Reports'],
          colorTheme: 'purple'
        },
        {
          icon: 'TrendingUp',
          tag: 'MARKETING',
          title: 'Marketing Automation Tools',
          desc: 'Marketing automation tools connecting guest stays with ActiveCampaign, HubSpot, and Mailchimp for targeted promotional campaigns and loyalty rewards.',
          pills: ['HubSpot / Mailchimp Sync', 'Post-Stay Feedback', 'Loyalty Tier Sync'],
          colorTheme: 'cyan'
        },
        {
          icon: 'BarChart3',
          tag: 'ANALYTICS',
          title: 'Business Reporting Solutions',
          desc: 'Business reporting solutions integrating Newbook data into custom PowerBI or Google Looker dashboards for occupancy, RevPAR, and ADR analysis.',
          pills: ['Custom BI Dashboards', 'RevPAR & ADR Metrics', 'Multi-Site Reporting'],
          colorTheme: 'purple'
        },
        {
          icon: 'Key',
          tag: 'HARDWARE & IOT',
          title: 'Smart Property Management Systems',
          desc: 'Smart property management systems connecting digital key locks (Assa Abloy, Salto, Kaba), energy management, and gate control.',
          pills: ['Smart Lock Integration', 'Automated Boom Gates', 'Energy IoT Controls'],
          colorTheme: 'cyan'
        }
      ],

      // Core 4 Solutions
      coreSolutionsTitle: 'Comprehensive Newbook Integration Capabilities',
      coreSolutionsIntro: 'Explore our specialized engineering modules designed to transform Newbook into an integrated, high-efficiency hospitality ecosystem.',
      coreSolutions: [
        {
          id: 'booking-system',
          title: 'Newbook Booking System Integration',
          subtitle: 'Accurate Multi-Channel Synchronization & Real-Time Availability',
          desc: 'Managing reservations across different channels requires accurate data synchronisation. We integrate Newbook with booking platforms to maintain updated availability, reservations, and guest information. Our booking integration services include:',
          icon: 'Layers',
          badge: 'BOOKING SYSTEM',
          features: [
            'Reservation synchronisation across all connected channels in real-time',
            'Instant calendar availability updates preventing double-bookings',
            'Unified guest information management and profile consolidation',
            'Automated booking confirmations and digital booking vouchers',
            'Comprehensive property data and rate parity synchronisation'
          ]
        },
        {
          id: 'api-integration',
          title: 'Newbook API Integration Services',
          subtitle: 'Secure Custom API Bridges, Middleware & Event Webhooks',
          desc: 'Our experts develop custom Newbook API integrations to connect existing applications with the PMS. We build secure communication channels between Newbook and third-party systems. Our solutions support operational improvements and future expansion. Our API integration services include:',
          icon: 'Code2',
          badge: 'API & MIDDLEWARE',
          features: [
            'Custom API development tailored to your specific enterprise architecture',
            'External software connections with custom mobile apps and web portals',
            'Data transfer automation and real-time webhook event listeners',
            'Workflow customisation for check-in kiosks, POS, and housekeeping',
            'Rigorous API testing, stress simulation, and continuous optimisation'
          ]
        },
        {
          id: 'payment-accounting',
          title: 'Newbook Payment And Accounting Integration',
          subtitle: 'Seamless Transaction Processing, Daily Ledgers & Automated Invoicing',
          desc: 'Financial management becomes easier when we integrate Newbook with financial tools. These integrations provide better control over revenue and business operations. Our solutions support:',
          icon: 'CreditCard',
          badge: 'PAYMENTS & FINANCE',
          features: [
            'Online payment processing with 3-D Secure compliance and tokenization',
            'Invoice automation for guest folios, corporate accounts, and tour groups',
            'Direct accounting system connections (Xero, QuickBooks, Sage, MYOB)',
            'Transaction synchronisation and daily automated ledger reconciliation',
            'Custom financial reporting workflows and owner disbursement schedules'
          ]
        },
        {
          id: 'crm-communication',
          title: 'Newbook CRM And Guest Communication Integration',
          subtitle: 'Automated Guest Journeys, Marketing Campaigns & Stronger Loyalty',
          desc: 'Guest relationships are important for hospitality businesses. Cubixsol connects Newbook with CRM and communication platforms to improve guest engagement. Connected communication systems help businesses maintain stronger relationships with their guests. Our solutions can support:',
          icon: 'MessageSquare',
          badge: 'CRM & GUEST JOURNEY',
          features: [
            'Automated emails, SMS notifications, and pre-arrival questionnaires',
            'Guest database synchronisation for enriched customer preferences',
            'Marketing campaign connections with personalized promotional triggers',
            'Customer relationship management tailored to repeat guest retention',
            'Personalised communication workflows for special requests and feedback'
          ]
        }
      ],

      // 5 Step Process
      processTitle: 'Our Newbook Integration Process',
      processIntro: 'Cubixsol follows a structured process to deliver reliable Newbook integration solutions:',
      processSteps: [
        {
          step: '01',
          title: 'Requirement Analysis',
          desc: 'Our team studies your current systems, business goals, and integration requirements to map all operational data streams.',
          badge: 'DISCOVERY'
        },
        {
          step: '02',
          title: 'Solution Planning',
          desc: 'We design a technical approach and custom architecture that matches your operational needs and security standards.',
          badge: 'ARCHITECTURE'
        },
        {
          step: '03',
          title: 'Development And Integration',
          desc: 'Our developers build secure connections, webhook pipelines, and API bridges between Newbook and required platforms.',
          badge: 'ENGINEERING'
        },
        {
          step: '04',
          title: 'Testing And Deployment',
          desc: 'We verify performance, data accuracy, latency, and reliability before coordinating a smooth go-live deployment.',
          badge: 'QUALITY QA'
        },
        {
          step: '05',
          title: 'Support And Maintenance',
          desc: 'Our team provides ongoing technical assistance, monitoring, and regular updates after implementation.',
          badge: 'GO LIVE & SUPPORT'
        }
      ],

      // Why Choose Cubixsol
      whyChooseTitle: 'Why Choose Cubixsol For Newbook Integration?',
      whyChooseIntro: 'Cubixsol helps hospitality businesses improve their technology infrastructure through custom PMS integration solutions. Our developers focus on building secure, scalable, and efficient connections that simplify property management operations. From booking automation, payment integration, CRM connectivity, or custom API development, Cubixsol delivers Newbook integration solutions designed around your business objectives.',
      whyChooseItems: [
        {
          title: 'Enterprise Hospitality Expertise',
          desc: 'Proven experience delivering complex PMS integrations for resorts, hotel chains, holiday parks, and marinas.',
          icon: 'Award'
        },
        {
          title: 'Real-Time Parity & Zero Collisions',
          desc: 'High-speed event-driven synchronisation eliminating overbookings and guaranteeing rate accuracy across channels.',
          icon: 'ShieldCheck'
        },
        {
          title: 'Custom API Bridges & Webhooks',
          desc: 'Bespoke middleware that seamlessly connects Newbook with legacy internal software, modern apps, and hardware.',
          icon: 'Cpu'
        },
        {
          title: 'Automated Financial Operations',
          desc: 'Complete integration with payment gateways and major accounting software for touchless billing and reconciliation.',
          icon: 'CreditCard'
        },
        {
          title: 'End-to-End Guest Journey Automation',
          desc: 'Contactless check-ins, automated SMS access codes, and personalized marketing workflows that delight guests.',
          icon: 'Users'
        },
        {
          title: 'Continuous Support & SLA Backing',
          desc: 'Dedicated technical engineers providing proactive monitoring, API maintenance, and prompt troubleshooting.',
          icon: 'Sparkles'
        }
      ],

      // FAQs
      faqs: [
        {
          q: 'What Newbook integration services does Cubixsol provide?',
          a: 'Cubixsol develops Newbook integrations with booking platforms, payment systems, CRM tools, accounting software, and business applications.'
        },
        {
          q: 'Can Newbook integrate with third-party booking platforms?',
          a: 'Yes, Newbook can connect with external booking systems, and Cubixsol can develop customised integration solutions for 2-way real-time calendar and rate sync.'
        },
        {
          q: 'Does Cubixsol provide Newbook API integration?',
          a: 'Yes, our developers create API-based integrations that connect Newbook with external applications, web portals, mobile guest apps, and hardware.'
        },
        {
          q: 'Can Newbook integrate with payment gateways?',
          a: 'Yes, Newbook can connect with payment solutions (Stripe, Windcave, Square, and merchant gateways) to support secure transaction processing and tokenization.'
        },
        {
          q: 'How can Newbook integration improve business operations?',
          a: 'Newbook integration reduces manual work, improves data accuracy, eliminates booking discrepancies, and creates more efficient hospitality workflows.'
        }
      ],

      seoTitle: 'Newbook Integration Services | Hospitality PMS Solutions | Cubixsol',
      seoDescription: 'Expert Newbook PMS integration services by Cubixsol. Connect Newbook with booking channels, payment gateways, accounting systems, CRM tools, and custom APIs.',
      seoKeywords: 'Newbook integration, Newbook PMS, Newbook API, hospitality PMS integration, vacation rental automation, Cubixsol'
    };

    const result = await Service.findOneAndUpdate(
      { slug: 'newbook-integration' },
      { $set: newbookData },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log('Newbook service successfully seeded/updated in MongoDB Atlas:');
    console.log(`_id: ${result._id}`);
    console.log(`slug: ${result.slug}`);
    console.log(`title: ${result.title}`);

    await mongoose.disconnect();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding Newbook service:', err);
    process.exit(1);
  }
}

seedNewbook();
