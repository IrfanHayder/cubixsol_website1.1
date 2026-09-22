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

async function seedJurny() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 15000 });
    console.log('Connected successfully to MongoDB Atlas.');

    const jurnyData = {
      slug: 'jurny-integration',
      title: 'Jurny Integration Services',
      cardTitle: 'Jurny Integration',
      menuTitle: 'Jurny Integration',
      icon: 'Building2',
      color: 'text-[#00a4d8] bg-[#00a4d8]/10',
      gradient: 'from-[#00a4d8] to-[#5d53a3]',
      heroEyebrow: 'JURNY INTEGRATION SERVICES',
      heroSubtitle: 'Jurny Integration Services For Modern Property Management',
      heroTitle: 'Jurny Integration Services For Modern Property Management',
      heroImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&h=800&q=80',
      desc: 'Cubixsol provides professional Jurny integration services to help property operators connect their rental management platform with advanced business applications.',
      longDesc: 'Cubixsol provides professional Jurny integration services to help property operators connect their rental management platform with advanced business applications. Our developers create custom integration solutions to improve automation, streamline guest management, and connect different systems into a unified operational workflow.',
      additionalParagraph: 'Our integration solutions allow businesses to synchronise important data and create smoother operational workflows. Our team builds Jurny integrations that connect your platform with essential business tools including online booking channels, payment gateways, CRM systems, smart locks, communication tools, and accounting software.',
      heroPrimaryBtnText: 'Schedule A Jurny Consultation',
      heroSecondaryBtnText: 'Explore Solutions',
      ctaPrimaryText: 'Schedule A Jurny Consultation',
      ctaSecondaryText: 'Explore Solutions',
      features: [
        '2-Way Multi-Channel OTA Sync',
        'Automated Smart Lock & Access Control',
        'Custom Jurny Open API Connections',
        'Automated Guest Messaging & Review Workflows',
        'Payment Gateway & CRM Integration'
      ],
      heroBadges: [
        '2-Way Multi-Channel OTA Sync',
        'Automated Smart Lock & Access Control',
        'Custom Jurny Open API Connections',
        'Automated Guest Messaging & Review Workflows',
        'Payment Gateway & CRM Integration'
      ],

      // Section 1: Connect Jurny With Essential Tools
      subServicesTitle: 'Integrate Jurny With Your Existing Technology Stack',
      subServicesIntro: 'Our integration solutions allow businesses to synchronise important data and create smoother operational workflows. Our team builds Jurny integrations that connect your platform with essential business tools:',
      subServicesItems: [
        {
          icon: 'Share2',
          tag: 'CHANNELS & BOOKINGS',
          title: 'Online Booking Channels & Reservation Platforms',
          desc: 'Seamless connectivity with Airbnb, VRBO, Booking.com, and direct booking engines for real-time calendar synchronization, dynamic pricing, and zero double bookings.',
          pills: ['Airbnb & VRBO Sync', 'Booking Engines', 'Live Availability'],
          colorTheme: 'cyan'
        },
        {
          icon: 'CreditCard',
          tag: 'PAYMENTS & TRANSACTIONS',
          title: 'Payment Gateways & Financial Applications',
          desc: 'Secure payment gateway connections (Stripe, Adyen, PayPal) for automatic deposit processing, credit card tokenization, pre-authorization holds, and split disbursements.',
          pills: ['Stripe / Merchant Gateways', 'Automated Deposits', 'Card Tokenization'],
          colorTheme: 'purple'
        },
        {
          icon: 'Users',
          tag: 'CRM & GUEST PROFILES',
          title: 'Customer Relationship Management Systems',
          desc: 'Unified customer relationship management platforms to consolidate guest profiles, track loyalty history, manage preferences, and deliver personalized hospitality experiences.',
          pills: ['HubSpot / Salesforce Sync', 'Guest Profiles', 'Loyalty Tracking'],
          colorTheme: 'cyan'
        },
        {
          icon: 'KeyRound',
          tag: 'SMART ACCESS & IOT',
          title: 'Smart Locks & Property Automation Solutions',
          desc: 'Automated digital key generation and contactless check-in protocols connecting Jurny directly with Yale, Schlage, August, Salto, and smart IoT thermostats.',
          pills: ['Keyless Entry PINs', 'Remote Lock Control', 'Automated Check-in'],
          colorTheme: 'purple'
        },
        {
          icon: 'MessageSquare',
          tag: 'COMMUNICATION & SUPPORT',
          title: 'Guest Communication Platforms',
          desc: 'Automated multi-channel messaging platforms delivering instant booking confirmations, WhatsApp/SMS arrival details, digital guidebooks, and post-stay feedback prompts.',
          pills: ['WhatsApp & SMS Drips', 'Digital Guidebooks', 'Automated Responses'],
          colorTheme: 'cyan'
        },
        {
          icon: 'PieChart',
          tag: 'FINANCIAL REPORTING',
          title: 'Accounting & Reporting Software',
          desc: 'Automated financial data pipelines with QuickBooks, Xero, and enterprise reporting suites for real-time revenue recognition, expense tracking, and owner payouts.',
          pills: ['QuickBooks & Xero', 'Owner Statements', 'Revenue Analytics'],
          colorTheme: 'purple'
        },
        {
          icon: 'TrendingUp',
          tag: 'GROWTH & MARKETING',
          title: 'Marketing Automation Tools',
          desc: 'Targeted marketing automation tools connecting Jurny guest data with Mailchimp, Klaviyo, and ad networks for retargeting campaigns, newsletters, and direct-booking incentives.',
          pills: ['Email Campaign Sync', 'Review Boosters', 'Loyalty Retargeting'],
          colorTheme: 'cyan'
        }
      ],

      // Section 2: Core Solutions
      coreSolutionsTitle: 'Comprehensive Jurny Integration Capabilities',
      coreSolutionsIntro: 'Our specialized integration modules bridge Jurny with every touchpoint of your hospitality and vacation rental ecosystem.',
      coreSolutions: [
        {
          id: 'booking-reservation',
          title: 'Jurny Booking And Reservation Integration',
          subtitle: 'Synchronized Booking Records & Real-Time Availability',
          desc: 'A connected reservation system allows property managers to reduce administrative tasks and maintain accurate booking records. We develop Jurny booking integrations that help businesses manage reservations, availability, and guest details effectively.',
          icon: 'Layers',
          badge: 'RESERVATIONS & CHANNELS',
          features: [
            'Booking synchronisation across all OTA channels in real-time',
            'Dynamic calendar management preventing overlapping bookings',
            'Secure guest data transfer and unified contact records',
            'Instant reservation status updates and payment state changes',
            'Comprehensive property information and rate synchronisation'
          ]
        },
        {
          id: 'api-services',
          title: 'Jurny API Integration Services',
          subtitle: 'Scalable & Secure API Connection Architecture',
          desc: 'We provide custom Jurny API integration solutions that allow businesses to connect external applications with their property management platform. Our developers design secure and scalable API connections based on operational requirements.',
          icon: 'Code2',
          badge: 'CUSTOM API ENGINEERING',
          features: [
            'Custom API development tailored to bespoke workflow logic',
            'Third-party software integration across ERP, CRM, and PMS tools',
            'High-frequency automated data exchange and bidirectional webhooks',
            'Custom operational workflow automation and trigger pipelines',
            'Comprehensive API testing, rate-limit management, and performance optimisation'
          ]
        },
        {
          id: 'smart-lock',
          title: 'Jurny Smart Lock And Access Control Integration',
          subtitle: 'Contactless Keyless Check-in & Hardware Automation',
          desc: 'Automated access solutions improve guest convenience and simplify property operations. We connect Jurny with smart lock technologies to support modern check-in experiences.',
          icon: 'Key',
          badge: 'HARDWARE & SMART LOCKS',
          features: [
            'Automated digital key generation with reservation-tied validities',
            'Automated entry management with instant lock & unlock logs',
            'Guest access scheduling synchronized with check-in/check-out hours',
            'Remote property control and smart device battery health monitoring',
            'Smart device connectivity spanning thermostats, noise sensors, and lights'
          ]
        },
        {
          id: 'guest-comm',
          title: 'Jurny Guest Communication Automation',
          subtitle: 'Instant Automated Guest Touchpoints & Feedback Loops',
          desc: 'Guest communication plays an important role in hospitality success. Our experts integrate Jurny with communication platforms to automate important guest interactions.',
          icon: 'MessageSquare',
          badge: 'GUEST AUTOMATION',
          features: [
            'Automated booking confirmations sent immediately via email and SMS',
            'Interactive check-in instructions and dynamic Wi-Fi credential delivery',
            'Real-time guest notifications and stay-milestone updates',
            'Automated 5-star review request workflows triggered post-departure',
            'AI-driven customer support automation for instant FAQ resolution'
          ]
        },
        {
          id: 'payment-crm',
          title: 'Jurny Payment And CRM Integration',
          subtitle: 'Unified Financial Operations & Guest Intelligence',
          desc: 'Our developers enable businesses to connect Jurny with payment systems and CRM platforms to improve financial management and customer relationships.',
          icon: 'CreditCard',
          badge: 'PAYMENT & CRM',
          features: [
            'Direct payment gateway connections with automatic tokenization',
            'Real-time transaction synchronisation and invoice reconciliation',
            'Comprehensive guest profile management and historical stay logs',
            'Automated CRM workflow automation for remarketing and upsells',
            'Business reporting integration delivering deep RevPAR and ADR metrics'
          ]
        }
      ],

      // Section 3: Process
      processTitle: 'Our Jurny Integration Process',
      processIntro: 'We follow a professional, battle-tested development approach for every Jurny integration project to ensure zero downtime and complete data precision.',
      processSteps: [
        {
          step: '01',
          title: 'Requirement Discovery',
          desc: 'Our team analyses your business model, existing applications, tech stack, and specific integration objectives.',
          icon: 'Compass'
        },
        {
          step: '02',
          title: 'Technical Planning',
          desc: 'We create a detailed integration architecture, API mapping, data-flow models, and security protocols based on your workflow requirements.',
          icon: 'Workflow'
        },
        {
          step: '03',
          title: 'Development And Configuration',
          desc: 'Our senior developers build custom API bridges, configure webhooks, connect databases, and configure secure system connections.',
          icon: 'Code2'
        },
        {
          step: '04',
          title: 'Testing And Deployment',
          desc: 'We rigorously test booking synchronicity, edge-case failovers, data accuracy, latency, and system performance before launch.',
          icon: 'ShieldCheck'
        },
        {
          step: '05',
          title: 'Support And Maintenance',
          desc: 'Our team provides continuous monitoring, API version updates, and ongoing assistance to maintain reliable integration performance.',
          icon: 'RefreshCw'
        }
      ],

      // Section 4: Why Choose
      whyChooseTitle: 'Why Choose Cubixsol For Jurny Integration?',
      whyChooseIntro: 'Cubixsol delivers customised PMS integration services for hospitality businesses that need better automation and system connectivity. Our developers create secure, scalable, and efficient solutions that improve daily property operations.',
      whyChoosePoints: [
        {
          title: 'Dedicated Jurny & PMS Expertise',
          desc: 'Our engineers specialize in modern property management APIs, multi-channel distribution networks, and hardware IoT protocols.'
        },
        {
          title: 'Bespoke Engineering Solutions',
          desc: 'We build tailored architectures matching your exact tech stack — from custom CRM mappings to smart lock integrations.'
        },
        {
          title: 'High Reliability & Zero Calendar Clashes',
          desc: 'Robust two-way synchronization algorithms ensure live calendar parity and zero double-booking occurrences across all OTAs.'
        },
        {
          title: 'End-to-End Delivery & Ongoing Support',
          desc: 'From initial architecture planning to post-launch maintenance, we ensure your operational infrastructure runs smoothly 24/7.'
        }
      ],

      // Section 5: FAQs
      faqs: [
        {
          q: 'What Jurny integration services does Cubixsol offer?',
          a: 'Cubixsol creates custom Jurny integrations with online booking platforms (Airbnb, VRBO, Booking.com), payment gateways (Stripe, Adyen), CRM systems (HubSpot, Salesforce), smart device access systems (Yale, Schlage, August), accounting tools (QuickBooks, Xero), and bespoke business applications.'
        },
        {
          q: 'Can Jurny integrate with external booking platforms?',
          a: 'Yes, Jurny can connect with different booking channels and direct website engines. Cubixsol develops customised bidirectional API solutions for real-time inventory, pricing, and reservation synchronisation.'
        },
        {
          q: 'Does Cubixsol provide Jurny API integration services?',
          a: 'Yes, our developers build secure, scalable API-based integrations and webhook listeners that connect Jurny with external custom software, ERPs, accounting portals, and business reporting tools.'
        },
        {
          q: 'Can Jurny connect with smart lock systems?',
          a: 'Yes, Jurny can integrate with smart lock and access control solutions to automatically generate time-restricted PIN codes upon booking confirmation, supporting completely keyless check-in and secure property entry.'
        },
        {
          q: 'How can Jurny integration improve rental operations?',
          a: 'Jurny integration helps hospitality businesses automate daily repetitive workflows, eliminate double-bookings, accelerate guest communication, streamline financial reconciliation, and manage multiple properties effortlessly from a centralized system.'
        }
      ],

      seo: {
        metaTitle: 'Jurny Integration Services | Custom Jurny API & Smart Lock Solutions | Cubixsol',
        metaDescription: 'Cubixsol provides expert Jurny integration services for vacation rentals. Connect Jurny with Airbnb, smart locks, CRMs, payment gateways & custom APIs.',
        keywords: 'Jurny integration services, Jurny API development, Jurny Airbnb integration, Jurny smart lock integration, PMS integration vacation rentals',
        ogTitle: 'Jurny Integration Services | Cubixsol',
        ogDescription: 'Custom Jurny integration solutions for vacation rental businesses. Automated smart locks, 2-way Airbnb sync, and enterprise PMS API development.'
      }
    };

    const updated = await Service.findOneAndUpdate(
      { slug: 'jurny-integration' },
      { $set: jurnyData },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log('Successfully seeded Jurny Integration service:', updated._id, updated.slug);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding Jurny Integration service:', err);
    process.exit(1);
  }
}

seedJurny();
