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

async function seedUplisting() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 15000 });
    console.log('Connected successfully to MongoDB Atlas.');

    const uplistingData = {
      slug: 'uplisting-integration',
      title: 'Uplisting Integration Services',
      cardTitle: 'Uplisting Integration',
      menuTitle: 'Uplisting Integration',
      icon: 'Activity',
      color: 'text-[#00a4d8] bg-[#00a4d8]/10',
      gradient: 'from-[#00a4d8] to-[#5d53a3]',
      heroEyebrow: 'UPLISTING INTEGRATION SERVICES',
      heroSubtitle: 'Custom Uplisting Integrations For Rental Business Automation',
      heroTitle: 'Custom Uplisting Integrations For Rental Business Automation',
      heroImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&h=800&q=80',
      desc: 'Cubixsol provides professional Uplisting integration services. We extend Uplisting capabilities through custom integrations that match your business processes and technology requirements. Our developers create customised integrations to improve guest communication, automate operational workflows, and simplify the management of multiple rental properties.',
      longDesc: 'Cubixsol provides professional Uplisting integration services. We extend Uplisting capabilities through custom integrations that match your business processes and technology requirements. Our developers create customised integrations to improve guest communication, automate operational workflows, and simplify the management of multiple rental properties.',
      additionalParagraph: 'Modern vacation rental operations require multiple systems. Our integration solutions create a unified workflow where important information moves smoothly between different systems. We connect your PMS with important business platforms, such as Airbnb, Booking.com, Vrbo, payment processing systems, CRM and guest management platforms, smart lock technologies, accounting applications, communication automation tools, reporting and analytics solutions, and custom business software.',
      heroPrimaryBtnText: 'Schedule An Uplisting Consultation',
      heroSecondaryBtnText: 'Explore Uplisting Solutions',
      ctaPrimaryText: 'Schedule An Uplisting Consultation',
      ctaSecondaryText: 'Explore Uplisting Solutions',
      features: [
        'Multi-Channel OTA Availability & Rate Synchronization',
        'Custom Uplisting API Engineering & Webhook Pipelines',
        'Automated Guest Messaging & Unified Inbox Integration',
        'Keyless Smart Lock Access Code Creation Automation',
        'Payment Processing, CRM & Workflow Automation'
      ],
      heroBadges: [
        'Multi-Channel OTA Availability & Rate Synchronization',
        'Custom Uplisting API Engineering & Webhook Pipelines',
        'Automated Guest Messaging & Unified Inbox Integration',
        'Keyless Smart Lock Access Code Creation Automation',
        'Payment Processing, CRM & Workflow Automation'
      ],

      // Section 1: Connect Uplisting With Your Business Applications
      subServicesTitle: 'Connect Uplisting With Your Business Applications',
      subServicesIntro: 'Modern vacation rental operations require multiple systems. Our integration solutions create a unified workflow where important information moves smoothly between different systems. We connect your PMS with important business platforms, such as:',
      subServicesItems: [
        {
          icon: 'Share2',
          tag: 'BOOKING MARKETPLACES',
          title: 'Airbnb, Booking.com, Vrbo, and other booking marketplaces.',
          desc: 'Keep calendars, pricing rates, restrictions, and instant reservations synchronized in real time across major global booking channels without double bookings.',
          pills: ['Airbnb 2-Way Sync', 'Booking.com Rates', 'Vrbo Real-Time Bridge'],
          colorTheme: 'cyan'
        },
        {
          icon: 'CreditCard',
          tag: 'PAYMENT GATEWAYS',
          title: 'Payment processing systems.',
          desc: 'Integrate secure payment gateways to automate guest payment collections, damage deposit authorizations, and transaction settlements.',
          pills: ['Stripe & Merchant Pay', 'Security Deposit Holds', 'Card Tokenization'],
          colorTheme: 'purple'
        },
        {
          icon: 'Users',
          tag: 'GUEST CRM',
          title: 'CRM and guest management platforms.',
          desc: 'Bridge guest records and booking histories with HubSpot, Salesforce, and CRM suites to centralize contact histories and VIP loyalty profiles.',
          pills: ['HubSpot / Salesforce', 'Guest History Sync', 'Loyalty Tracking'],
          colorTheme: 'cyan'
        },
        {
          icon: 'KeyRound',
          tag: 'SMART LOCKS',
          title: 'Smart lock technologies.',
          desc: 'Connect digital access systems (Yale, Schlage, August, RemoteLock) to auto-generate time-bounded guest door PINs upon confirmed reservation.',
          pills: ['Automated PIN Codes', 'RemoteLock / Yale', 'Contactless Guest Entry'],
          colorTheme: 'purple'
        },
        {
          icon: 'PieChart',
          tag: 'ACCOUNTING',
          title: 'Accounting applications.',
          desc: 'Synchronise booking revenue, occupancy taxes, cleaning fees, and owner disbursements with QuickBooks, Xero, or custom financial ledgers.',
          pills: ['QuickBooks & Xero', 'Tax Splitting', 'Owner Statement Reports'],
          colorTheme: 'cyan'
        },
        {
          icon: 'MessageSquare',
          tag: 'COMMUNICATION TOOLS',
          title: 'Communication automation tools.',
          desc: 'Automate post-stay review requests, pre-arrival welcome guides, upsell email sequences, and SMS alerts via Klaviyo, Mailchimp, or Twilio.',
          pills: ['Guest SMS Workflows', 'Review Generation', 'Upsell Sequences'],
          colorTheme: 'purple'
        },
        {
          icon: 'BarChart3',
          tag: 'REPORTING & ANALYTICS',
          title: 'Reporting and analytics solutions.',
          desc: 'Consolidate multi-channel performance data, RevPAR, average daily rate (ADR), and channel ROI into unified business intelligence dashboards.',
          pills: ['BI Dashboards', 'RevPAR & ADR Trends', 'Occupancy Heatmaps'],
          colorTheme: 'cyan'
        },
        {
          icon: 'Cpu',
          tag: 'CUSTOM SOFTWARE',
          title: 'Custom business software.',
          desc: 'Connect proprietary internal software, custom booking apps, housekeeping schedules, and maintenance dispatch systems directly with Uplisting.',
          pills: ['Custom Webhooks', 'Bespoke Software Bridges', 'Operations Hub'],
          colorTheme: 'purple'
        }
      ],

      // Section 2: Core Specialized Modules
      coreSolutionsTitle: 'Core Uplisting Integration Solutions',
      coreSolutionsIntro: 'Our specialized integration modules bridge Uplisting with every operational touchpoint of your vacation rental business.',
      coreSolutions: [
        {
          id: 'channel-management',
          title: 'Uplisting Channel Management Integration',
          subtitle: 'Accurate Multi-OTA Synchronization & Unified Reservation Control',
          desc: 'We manage reservations across different channels, which requires accurate synchronisation of property data and availability. A connected channel system reduces administrative work and maintains consistent information across multiple platforms. Our channel integration services include:',
          icon: 'Share2',
          badge: 'CHANNEL MANAGEMENT',
          features: [
            'Reservation synchronisation.',
            'Calendar updates.',
            'Listing information management.',
            'Guest data exchange.',
            'Booking status automation.'
          ]
        },
        {
          id: 'api-services',
          title: 'Uplisting API Integration Services',
          subtitle: 'Flexible Infrastructure, Secure API Connections & Scalable Data Flow',
          desc: 'We design flexible solutions that allow businesses to improve their technology infrastructure and adapt to future requirements. Our developers build secure API connections that support efficient data exchange and automation. Our Uplisting API services include:',
          icon: 'Terminal',
          badge: 'API INTEGRATION',
          features: [
            'Custom API development.',
            'Third-party software integration.',
            'Automated workflow creation.',
            'Data synchronisation.',
            'API testing and optimisation.'
          ]
        },
        {
          id: 'guest-communication',
          title: 'Uplisting Guest Communication Integration',
          subtitle: 'Automated Guest Interactions, Timely Messaging & Elevated Experience',
          desc: 'Guest communication is an important part of successful vacation rental management. Cubixsol helps businesses integrate Uplisting with communication platforms to automate important guest interactions. Our integration solutions provide timely communication and improve the overall guest experience. Our communication solutions support:',
          icon: 'MessageSquare',
          badge: 'GUEST COMMUNICATION',
          features: [
            'Automated booking confirmations.',
            'Check-in instructions.',
            'Guest notifications.',
            'Review request automation.',
            'Customer support workflows.'
          ]
        },
        {
          id: 'smart-locks',
          title: 'Uplisting Smart Lock Integration',
          subtitle: 'Keyless Self-Service Access, Digital Code Generation & Hardware Sync',
          desc: 'Self-service access solutions allow guests to enter properties conveniently while reducing operational effort for managers. We connect Uplisting with smart lock systems to support automated property access. Our smart lock integration services include:',
          icon: 'KeyRound',
          badge: 'SMART HARDWARE',
          features: [
            'Digital access code generation.',
            'Guest entry automation.',
            'Remote access management.',
            'Smart device connectivity.',
            'Check-in workflow automation.'
          ]
        },
        {
          id: 'payment-crm',
          title: 'Uplisting Payment And CRM Integration',
          subtitle: 'Connected Financial Information, Customer Data & CRM Automations',
          desc: 'We help businesses connect Uplisting with payment platforms and CRM systems to improve financial management and guest relationship processes. Connected systems provide better organisation of financial information and customer data. Our integration services include:',
          icon: 'CreditCard',
          badge: 'PAYMENT & CRM',
          features: [
            'Payment gateway connections.',
            'Transaction synchronisation.',
            'Guest profile management.',
            'CRM automation.',
            'Marketing workflow integration.'
          ]
        },
        {
          id: 'workflow-automation',
          title: 'Uplisting Workflow Automation Solutions',
          subtitle: 'Reduced Repetitive Tasks, Team Task Updates & Operational Alerts',
          desc: 'Cubixsol creates automation solutions that reduce repetitive tasks and improve daily property operations. We connect Uplisting with different business tools to create efficient workflows. Our solutions allow property managers to focus on business growth and guest satisfaction. Automation possibilities include:',
          icon: 'Workflow',
          badge: 'WORKFLOW AUTOMATION',
          features: [
            'Automatic guest notifications.',
            'Team task updates.',
            'Reservation alerts.',
            'Property status updates.',
            'Operational reminders.'
          ]
        }
      ],

      // Section 3: Our Uplisting Integration Process
      serviceProcessTitle: 'Our Uplisting Integration Process',
      serviceProcessIntro: 'Cubixsol follows a structured approach to deliver reliable Uplisting integration solutions:',
      serviceProcessSteps: [
        {
          stepNumber: '01',
          title: 'Requirement Analysis',
          desc: 'Our team reviews your current workflow, business goals, and required integration features.'
        },
        {
          stepNumber: '02',
          title: 'Technical Planning',
          desc: 'We design an integration strategy based on your operational requirements.'
        },
        {
          stepNumber: '03',
          title: 'Development And Configuration',
          desc: 'Our developers build and configure secure system connections.'
        },
        {
          stepNumber: '04',
          title: 'Testing And Deployment',
          desc: 'We verify functionality, performance, and data accuracy before launch.'
        },
        {
          stepNumber: '05',
          title: 'Support And Maintenance',
          desc: 'Our team provides ongoing technical assistance after implementation.'
        }
      ],

      // Section 4: Why Choose Cubixsol For Uplisting Integration
      whyChooseTitle: 'Why Choose Cubixsol For Uplisting Integration?',
      whyChooseIntro: 'Cubixsol helps professional vacation rental managers improve efficiency through Uplisting integrations designed around guest experience and operational automation. Our team creates solutions that connect communication tools, booking platforms, smart technologies, and business applications into a smooth workflow.\n\nWe focus on building integrations that reduce manual tasks, improve response times, and support scalable property management operations.',
      whyChooseItems: [
        {
          title: 'Tailored PMS Architecture',
          desc: 'Custom engineered data bridges tailored to your exact property portfolio size, third-party software stack, and business model.'
        },
        {
          title: 'Zero Double-Booking Guarantee',
          desc: 'Sub-second bidirectional synchronization across Airbnb, Vrbo, Booking.com, and direct web engines.'
        },
        {
          title: 'Automated Guest Self-Check-in',
          desc: 'Dynamic, time-restricted smart lock PIN creation linked automatically to confirmed Uplisting reservation timestamps.'
        },
        {
          title: 'End-to-End Enterprise Support',
          desc: 'Continuous monitoring, webhook error handling, API version maintenance, and 24/7 technical oversight.'
        }
      ],

      // Section 5: FAQs
      faqs: [
        {
          q: 'What Uplisting integration services does Cubixsol provide?',
          a: 'Cubixsol develops Uplisting integrations with booking channels, payment systems, CRM platforms, smart devices, automation tools, and business applications.'
        },
        {
          q: 'Can Uplisting integrate with Airbnb and other booking platforms?',
          a: 'Yes, Uplisting supports connections with major rental marketplaces, and Cubixsol can create customised integration solutions.'
        },
        {
          q: 'Does Cubixsol provide Uplisting API integration?',
          a: 'Yes, our developers build API-based integrations that connect Uplisting with external software systems.'
        },
        {
          q: 'Can Uplisting connect with smart lock systems?',
          a: 'Yes, Uplisting can integrate with smart access solutions to support automated guest entry and self-check-in.'
        },
        {
          q: 'How does Uplisting integration improve rental management?',
          a: 'Uplisting integration helps businesses automate operations, improve guest communication, and manage multiple properties more efficiently.'
        }
      ],

      // SEO
      seo: {
        metaTitle: 'Uplisting Integration Services | Vacation Rental Automation | Cubixsol',
        metaDescription: 'Professional Uplisting integration services by Cubixsol. Connect Uplisting PMS with Airbnb, Vrbo, payment processing, smart locks, and CRMs.',
        keywords: 'Uplisting integration, Uplisting API development, vacation rental PMS integration, Uplisting smart locks, Uplisting guest communication, Cubixsol',
        ogTitle: 'Uplisting Integration Services | Cubixsol',
        ogDescription: 'Custom Uplisting integration solutions for vacation rental management. Multi-channel synchronization, API bridges, guest communication, and smart locks.',
        ogImage: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&h=800&q=80',
        canonicalUrl: 'https://cubixsol.com/uplisting-integration'
      }
    };

    // 1. Upsert into MongoDB Service collection
    const updated = await Service.findOneAndUpdate(
      { slug: 'uplisting-integration' },
      { $set: uplistingData },
      { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
    );
    console.log('✅ Successfully seeded Uplisting Integration service in MongoDB Atlas:', updated.slug);

    // 2. Update seedData.json
    const seedJsonPath = path.join(__dirname, 'seedData.json');
    if (fs.existsSync(seedJsonPath)) {
      const seedData = JSON.parse(fs.readFileSync(seedJsonPath, 'utf-8'));
      const idx = seedData.initialServices.findIndex(s => s.slug === 'uplisting-integration');
      if (idx >= 0) {
        seedData.initialServices[idx] = uplistingData;
      } else {
        seedData.initialServices.push(uplistingData);
      }
      fs.writeFileSync(seedJsonPath, JSON.stringify(seedData, null, 2), 'utf-8');
      console.log('✅ Successfully updated seedData.json with Uplisting Integration service.');
    }

    const count = await Service.countDocuments();
    console.log(`Total services in MongoDB Atlas: ${count}`);

    await mongoose.disconnect();
    console.log('🔌 Disconnected cleanly from MongoDB.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding Uplisting service:', err);
    process.exit(1);
  }
}

seedUplisting();
