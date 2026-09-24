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

async function seedTokeet() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 15000 });
    console.log('Connected successfully to MongoDB Atlas.');

    const tokeetData = {
      slug: 'tokeet-integration',
      title: 'Tokeet Integration Services',
      cardTitle: 'Tokeet Integration',
      menuTitle: 'Tokeet Integration',
      icon: 'Sliders',
      color: 'text-[#00a4d8] bg-[#00a4d8]/10',
      gradient: 'from-[#00a4d8] to-[#0077b6]',
      heroEyebrow: 'TOKEET INTEGRATION SERVICES',
      heroSubtitle: 'Custom Tokeet Integration Solutions For Vacation Rental Management',
      heroTitle: 'Custom Tokeet Integration Solutions For Vacation Rental Management',
      heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&h=800&q=80',
      desc: 'Tokeet is a cloud-based property management system designed for vacation rental owners, hosts, and property managers. Our professional Tokeet integration services help vacation rental businesses connect their property management platform with advanced software solutions. We enhance Tokeet capabilities through custom integrations that connect essential business tools and create smoother operational workflows.',
      longDesc: 'Tokeet is a cloud-based property management system designed for vacation rental owners, hosts, and property managers. Our professional Tokeet integration services help vacation rental businesses connect their property management platform with advanced software solutions. We enhance Tokeet capabilities through custom integrations that connect essential business tools and create smoother operational workflows.',
      additionalParagraph: 'Managing vacation rentals requires coordination between multiple platforms. Our integration services create a connected technology environment where your systems share data accurately and improve overall productivity. We connect your PMS with important business applications, including Airbnb, Booking.com, Vrbo, direct booking websites, payment gateways, CRM platforms, accounting software, smart locks, marketing automation tools, and reporting analytics solutions.',
      heroPrimaryBtnText: 'Schedule A Tokeet Consultation',
      heroSecondaryBtnText: 'Explore Tokeet Solutions',
      ctaPrimaryText: 'Schedule A Tokeet Consultation',
      ctaSecondaryText: 'Explore Tokeet Solutions',
      features: [
        'Multi-Channel OTA Availability & Rate Synchronization',
        'Custom Tokeet API Engineering & Webhook Pipelines',
        'Direct Booking Engine & Custom Storefront Connections',
        'Keyless Smart Lock Access Code Creation Automation',
        'Payment Gateway, CRM & Automated Guest Messaging'
      ],
      heroBadges: [
        'Multi-Channel OTA Availability & Rate Synchronization',
        'Custom Tokeet API Engineering & Webhook Pipelines',
        'Direct Booking Engine & Custom Storefront Connections',
        'Keyless Smart Lock Access Code Creation Automation',
        'Payment Gateway, CRM & Automated Guest Messaging'
      ],

      // Section 1: Optimise Business Operations With Tokeet Integrations
      subServicesTitle: 'Optimise Business Operations With Tokeet Integrations',
      subServicesIntro: 'Managing vacation rentals requires coordination between multiple platforms. Our integration services create a connected technology environment where your systems share data accurately and improve overall productivity. We connect your PMS with important business applications, including:',
      subServicesItems: [
        {
          icon: 'Share2',
          tag: 'RENTAL CHANNELS',
          title: 'Airbnb, Booking.com, Vrbo, and other rental channels',
          desc: 'Keep calendars, pricing rates, restrictions, and instant bookings synchronized in real time across global rental channels without double bookings.',
          pills: ['Airbnb 2-Way Sync', 'Booking.com Rates', 'Vrbo Real-Time Bridge'],
          colorTheme: 'cyan'
        },
        {
          icon: 'Globe',
          tag: 'DIRECT BOOKINGS',
          title: 'Direct booking websites',
          desc: 'Connect custom booking platforms and direct websites with Tokeet to capture zero-commission direct bookings with live instant confirmations.',
          pills: ['Direct Engine Bridge', 'Commission-Free Flow', 'Live Availability'],
          colorTheme: 'blue'
        },
        {
          icon: 'CreditCard',
          tag: 'PAYMENT GATEWAYS',
          title: 'Payment gateways',
          desc: 'Integrate Stripe, PayPal, Authorize.Net, and merchant gateways to automate payment processing, damage deposit authorizations, and split settlements.',
          pills: ['Stripe & Merchant Pay', 'Security Deposit Holds', 'Card Tokenization'],
          colorTheme: 'cyan'
        },
        {
          icon: 'Users',
          tag: 'CRM PLATFORMS',
          title: 'CRM platforms',
          desc: 'Bridge Tokeet guest records with HubSpot, Salesforce, and CRM suites to centralize contact histories, guest preferences, and VIP loyalty profiles.',
          pills: ['HubSpot / Salesforce', 'Guest History Sync', 'Loyalty Tracking'],
          colorTheme: 'blue'
        },
        {
          icon: 'PieChart',
          tag: 'FINANCIAL LEDGERS',
          title: 'Accounting software',
          desc: 'Synchronise booking revenue, occupancy taxes, cleaning fees, and owner disbursements with QuickBooks, Xero, or custom financial systems.',
          pills: ['QuickBooks & Xero', 'Tax Splitting', 'Owner Statement Reports'],
          colorTheme: 'cyan'
        },
        {
          icon: 'KeyRound',
          tag: 'SMART LOCK ACCESS',
          title: 'Smart lock systems',
          desc: 'Connect digital access systems (Yale, Schlage, August, RemoteLock) to auto-generate time-bounded guest door PINs upon confirmed booking.',
          pills: ['Automated PIN Codes', 'RemoteLock / Yale', 'Contactless Guest Entry'],
          colorTheme: 'blue'
        },
        {
          icon: 'MessageSquare',
          tag: 'MARKETING AUTOMATION',
          title: 'Marketing automation tools',
          desc: 'Automate post-stay review requests, pre-arrival welcome guides, upsell email sequences, and SMS alerts via Klaviyo, Mailchimp, or Twilio.',
          pills: ['Guest SMS Workflows', 'Review Generation', 'Upsell Sequences'],
          colorTheme: 'cyan'
        },
        {
          icon: 'BarChart3',
          tag: 'ANALYTICS & BI',
          title: 'Reporting and analytics solutions',
          desc: 'Connect business intelligence tools and analytics suites to track RevPAR, ADR, multi-unit occupancy rates, and channel profitability.',
          pills: ['BI Dashboards', 'RevPAR & ADR Analytics', 'Multi-Unit Metrics'],
          colorTheme: 'blue'
        }
      ],

      // Section 2: Core Specialized Modules (5 Modules from Document)
      coreSolutionsTitle: 'Specialised Tokeet Integration Capabilities',
      coreSolutionsIntro: 'Our specialized integration modules bridge Tokeet with every operational touchpoint of your vacation rental management workflow.',
      coreSolutions: [
        {
          id: 'channel-management',
          title: 'Tokeet Channel Management Integration Services',
          subtitle: 'Accurate Multi-Channel Synchronisation & Listing Control',
          desc: 'Our specialists help businesses integrate Tokeet with booking platforms to maintain accurate availability, reservations, and property information. A properly connected channel system controls multiple listings more effectively. Our channel integration solutions include:',
          icon: 'Share2',
          badge: 'CHANNEL MANAGEMENT',
          features: [
            'Calendar synchronisation.',
            'Reservation updates.',
            'Listing information management.',
            'Guest data transfer.',
            'Automated booking workflows.'
          ]
        },
        {
          id: 'api-development',
          title: 'Tokeet API Integration Development',
          subtitle: 'Custom Scalable API Architecture & Webhook Connections',
          desc: 'We offer custom Tokeet API integration services to connect external applications with your property management platform. Our developers create secure and scalable API solutions based on your operational needs. Our Tokeet API services include:',
          icon: 'Terminal',
          badge: 'API DEVELOPMENT',
          features: [
            'Custom API development.',
            'Third-party application integration.',
            'Data synchronisation.',
            'Workflow automation.',
            'API testing and maintenance.'
          ]
        },
        {
          id: 'direct-booking',
          title: 'Tokeet Direct Booking Integration',
          subtitle: 'Direct Storefront Connections & Commission-Free Reservations',
          desc: 'Direct booking solutions allow property businesses to increase customer relationships and reduce dependency on external marketplaces. We help connect Tokeet with direct booking platforms for a smoother reservation experience. Our direct booking integration services support:',
          icon: 'Globe',
          badge: 'DIRECT BOOKINGS',
          features: [
            'Website booking connections.',
            'Automated reservation processing.',
            'Availability synchronisation.',
            'Guest information management.',
            'Online payment workflows.'
          ]
        },
        {
          id: 'smart-locks',
          title: 'Tokeet Smart Lock Integration',
          subtitle: 'Keyless Access, Self-Check-in & Automated Code Creation',
          desc: 'Smart access solutions improve guest convenience and simplify property management. Cubixsol connects Tokeet with smart lock systems to support automated access and self-check-in experiences. Our solutions help property managers reduce manual coordination and improve guest satisfaction. Our smart lock integration solutions include:',
          icon: 'KeyRound',
          badge: 'SMART LOCK ACCESS',
          features: [
            'Digital key management.',
            'Automated access code creation.',
            'Guest entry scheduling.',
            'Remote property access.',
            'Smart device connectivity.'
          ]
        },
        {
          id: 'payment-crm',
          title: 'Tokeet Payment And CRM Integration',
          subtitle: 'Automated Billing, CRM Database & Communication Workflows',
          desc: 'Efficient financial management and guest communication require connected business systems. Cubixsol integrates Tokeet with payment platforms and CRM solutions to streamline operations. Our integration services include:',
          icon: 'CreditCard',
          badge: 'PAYMENT & CRM',
          features: [
            'Payment gateway connections.',
            'Transaction synchronisation.',
            'Guest database management.',
            'Customer communication automation.',
            'Accounting software integration.'
          ]
        }
      ],

      // Section 3: Our Tokeet Integration Process
      serviceProcessTitle: 'Our Tokeet Integration Process',
      serviceProcessIntro: 'We follow a professional process to deliver successful Tokeet integration solutions:',
      serviceProcessSteps: [
        {
          stepNumber: '01',
          title: 'Business Requirement Analysis',
          desc: 'Our team identifies your operational challenges, existing software, and integration goals.'
        },
        {
          stepNumber: '02',
          title: 'Integration Planning',
          desc: 'We create a technical roadmap based on your required features and workflow.'
        },
        {
          stepNumber: '03',
          title: 'Development And Configuration',
          desc: 'Our developers build secure connections between Tokeet and selected applications.'
        },
        {
          stepNumber: '04',
          title: 'Testing And Deployment',
          desc: 'We validate system performance, data accuracy, and integration reliability.'
        },
        {
          stepNumber: '05',
          title: 'Support And Maintenance',
          desc: 'Our team provides continuous assistance after implementation.'
        }
      ],

      // Section 4: Why Choose Cubixsol For Tokeet Integration
      whyChooseTitle: 'Why Choose Cubixsol For Tokeet Integration?',
      whyChooseIntro: 'Cubixsol helps rental businesses maximise the value of Tokeet through customised integration solutions focused on automation and connectivity. Our team develops integrations that simplify daily management tasks and let property operators control different systems through a connected workflow.\n\nWe know that every rental business has different operational requirements. Our developers create Tokeet solutions that connect booking platforms, payment systems, customer tools, and automation services while maintaining reliable data flow. From API development to workflow automation, Cubixsol builds integrations that support efficient property management.',
      whyChooseItems: [
        {
          title: 'Custom-Built Integration Architecture',
          desc: 'Engineered specifically around your exact property portfolio, multi-channel distribution strategy, and tech stack.'
        },
        {
          title: 'Real-Time Synchronisation Reliability',
          desc: 'High-speed bidirectional sync prevents double-bookings, maintains rate parity, and unifies calendar availability.'
        },
        {
          title: 'Automated Frictionless Guest Journeys',
          desc: 'From instant keyless entry generation to automated payment collections and SMS communications.'
        },
        {
          title: 'Continuous Monitoring & Expert Support',
          desc: 'Our senior PMS engineers provide post-launch optimization, security patches, and ongoing system maintenance.'
        }
      ],

      // Section 5: FAQs
      faqs: [
        {
          q: 'What Tokeet integration services does Cubixsol provide?',
          a: 'Cubixsol develops Tokeet integrations with booking platforms, payment gateways, CRM systems, smart devices, accounting tools, and other applications.'
        },
        {
          q: 'Can Tokeet integrate with Airbnb and other rental channels?',
          a: 'Yes, Tokeet supports connections with multiple booking platforms, and Cubixsol can develop customised integration solutions.'
        },
        {
          q: 'Does Cubixsol offer Tokeet API integration?',
          a: 'Yes, our developers create API-based integrations that connect Tokeet with external business applications.'
        },
        {
          q: 'Can Tokeet connect with smart lock systems?',
          a: 'Yes, Tokeet can integrate with smart access solutions to support automated guest entry and self-check-in.'
        },
        {
          q: 'How does Tokeet integration improve vacation rental operations?',
          a: 'Tokeet integration helps businesses automate workflows, reduce manual processes, and manage rental operations more efficiently.'
        }
      ],

      // SEO
      seo: {
        metaTitle: 'Tokeet Integration Services | Custom Vacation Rental PMS Solutions | Cubixsol',
        metaDescription: 'Professional Tokeet integration services by Cubixsol. Connect Tokeet PMS with Airbnb, Vrbo, direct booking websites, payment gateways, smart locks, and CRMs.',
        keywords: 'Tokeet integration, Tokeet API development, vacation rental PMS integration, Tokeet smart locks, Tokeet channel management, Cubixsol',
        ogTitle: 'Tokeet Integration Services | Cubixsol',
        ogDescription: 'Custom Tokeet integration solutions for vacation rental management. Multi-channel synchronization, API bridges, smart locks, and automated workflows.',
        ogImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&h=800&q=80',
        canonicalUrl: 'https://cubixsol.com/tokeet-integration'
      }
    };

    // 1. Upsert into MongoDB Service collection
    const updated = await Service.findOneAndUpdate(
      { slug: 'tokeet-integration' },
      { $set: tokeetData },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log('✅ Successfully seeded Tokeet Integration service in MongoDB Atlas:', updated.slug);

    // 2. Update seedData.json
    const seedJsonPath = path.join(__dirname, 'seedData.json');
    if (fs.existsSync(seedJsonPath)) {
      const seedData = JSON.parse(fs.readFileSync(seedJsonPath, 'utf-8'));
      const idx = seedData.initialServices.findIndex(s => s.slug === 'tokeet-integration');
      if (idx >= 0) {
        seedData.initialServices[idx] = tokeetData;
      } else {
        seedData.initialServices.push(tokeetData);
      }
      fs.writeFileSync(seedJsonPath, JSON.stringify(seedData, null, 2), 'utf-8');
      console.log('✅ Successfully updated seedData.json with Tokeet Integration service.');
    }

    const count = await Service.countDocuments();
    console.log(`Total services in MongoDB Atlas: ${count}`);

    await mongoose.disconnect();
    console.log('🔌 Disconnected cleanly from MongoDB.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding Tokeet service:', err);
    process.exit(1);
  }
}

seedTokeet();
