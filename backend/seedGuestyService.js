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

async function seedGuesty() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 15000 });
    console.log('Connected successfully to MongoDB Atlas.');

    const guestyData = {
      slug: 'guesty-integration',
      title: 'Guesty Integration Services',
      cardTitle: 'Guesty Integration',
      menuTitle: 'Guesty Integration',
      icon: 'KeyRound',
      color: 'text-[#00a4d8] bg-[#00a4d8]/10',
      gradient: 'from-[#00a4d8] to-[#5d53a3]',
      heroSubtitle: 'Custom Guesty Integration Solutions For Vacation Rental Businesses',
      heroImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&h=800&q=80',
      desc: 'Cubixsol provides professional Guesty integration services that connect vacation rental platforms, business tools, and automation systems through secure API solutions.',
      longDesc: 'Cubixsol provides professional Guesty integration services that connect vacation rental platforms, business tools, and automation systems through secure API solutions. Our team builds custom connections that allow property managers to manage reservations, guest data, payments, communication tools, and smart property systems from one centralised workflow.',
      additionalParagraph: 'A successful rental operation requires smooth communication between different platforms. Cubixsol creates Guesty integrations that connect your PMS with important business applications including Airbnb, CRMs, payment gateways, smart locks, accounting software, and automated marketing platforms.',
      ctaPrimaryText: 'Schedule A Guesty Consultation',
      ctaSecondaryText: 'Explore Integration Architecture',
      features: [
        'Real-time Multi-Channel Calendar Sync',
        'Automated Smart Lock Keyless Check-in',
        '2-Way Airbnb & OTA Reservation Bridging',
        'Automated Payment & Accounting Sync',
      ],

      // Section 1: Connect Guesty With Your Essential Business Tools
      subServicesTitle: 'Connect Guesty With Your Essential Business Tools',
      subServicesIntro: 'A successful rental operation requires smooth communication between different platforms. Cubixsol creates Guesty integrations that connect your PMS with important business applications:',
      subServicesItems: [
        {
          title: 'Airbnb & Channel Synchronisation',
          desc: 'Airbnb and other booking channels for real-time reservation synchronisation, rate parity, and instant calendar blocking to eliminate double bookings.',
        },
        {
          title: 'CRM Platforms',
          desc: 'CRM platforms for organised guest information, automated segmentation, unified communication history, and repeat booking nurture flows.',
        },
        {
          title: 'Payment Gateways',
          desc: 'Payment gateways like Stripe and Adyen for secure transaction processing, automated security deposit holding, and instant guest refund handling.',
        },
        {
          title: 'Smart Lock Systems',
          desc: 'Smart lock systems for automated property access, dynamic PIN code generation upon reservation confirmation, and keyless check-in.',
        },
        {
          title: 'Accounting Software',
          desc: 'Accounting software like QuickBooks and Xero for accurate financial records, automated owner payouts, cleaning fee tracking, and tax reporting.',
        },
        {
          title: 'Marketing Platforms',
          desc: 'Marketing platforms for guest engagement campaigns, automated review generation triggers, SMS updates, and re-engagement promotions.',
        },
      ],

      // Section 2: Guesty Airbnb Integration Services
      businessTypesTitle: 'Guesty Airbnb Integration Services',
      businessTypesIntro: 'Airbnb remains a major channel for vacation rental bookings. A reliable Guesty Airbnb integration allows property managers to synchronise reservations, availability, pricing, and guest details across both platforms. Our developers analyse your workflow and create solutions that reduce manual tasks and improve operational efficiency.',
      businessTypesItems: [
        {
          title: 'Real-time Booking Updates',
          desc: 'Instant 2-way data flow that captures guest booking modifications, cancellations, and extensions instantly across Guesty and Airbnb.',
        },
        {
          title: 'Calendar Synchronisation',
          desc: 'Sub-second calendar availability mirroring across all listings to ensure zero double-bookings across multiple distribution channels.',
        },
        {
          title: 'Automated Reservation Data Transfer',
          desc: 'Complete automated ingestion of guest counts, check-in timestamps, custom guest notes, and payout structures directly into Guesty.',
        },
        {
          title: 'Guest Profile Management',
          desc: 'Unified guest identity resolution, past stay history, verified phone/email aggregation, and automated guest verification pipelines.',
        },
        {
          title: 'Property Information Updates',
          desc: 'Centralised listing content distribution including dynamic nightly pricing, house rules, amenity updates, and check-in guide dispatches.',
        },
      ],

      // Section 3: Guesty API Integration Development
      techTitle: 'Guesty API Integration Development',
      techDesc: 'Guesty provides API access that allows businesses to create custom connections with external applications. Cubixsol develops API-based solutions that allow your systems to exchange data securely. Our developers follow secure coding practices to create reliable solutions that support business growth.',
      tech: [
        'Custom API Development',
        'Third-party Software Connections',
        'Data Synchronisation Solutions',
        'Workflow Automation Systems',
        'Existing Integration Improvements',
      ],

      // Section 4: Guesty Smart Lock Integration
      outcomes: [
        'Automated access code creation based on check-in/check-out timestamps',
        'Guest arrival management with live unlock alerts for staff and managers',
        'Remote property access control for cleaning crews, maintenance, and guests',
        'Improved security processes with automated code revocation after checkout',
      ],

      // Section 5: Our Guesty Integration Process
      serviceProcessTitle: 'Our Guesty Integration Process',
      serviceProcessIntro: 'Cubixsol follows a structured development process for every Guesty project to ensure seamless connectivity, bulletproof security, and zero disruption to active reservations:',
      serviceProcessSteps: [
        {
          stepNumber: '01',
          title: 'Requirement Analysis',
          desc: 'Our team studies your business needs, existing PMS tools, listing setup, and desired automation outcomes to architect the optimal integration strategy.',
          points: ['Workflow Auditing', 'Tech Stack Evaluation', 'Milestone Roadmapping'],
        },
        {
          stepNumber: '02',
          title: 'API Planning',
          desc: 'Developers review available Guesty Open APIs, webhooks, and third-party endpoints to design the connection architecture and data mapping logic.',
          points: ['API Architecture Design', 'Webhook Event Schemas', 'Security & Auth Mapping'],
        },
        {
          stepNumber: '03',
          title: 'Development',
          desc: 'Our experts build and configure the required integration features, custom microservices, database bridges, and real-time syncing pipelines.',
          points: ['Custom Connector Build', 'Bidirectional Sync Engine', 'Fail-safe Retry Logic'],
        },
        {
          stepNumber: '04',
          title: 'Testing',
          desc: 'The solution passes detailed end-to-end checks, stress tests, edge-case simulation, and sandbox validation before deployment to live properties.',
          points: ['Edge-case Simulation', 'High-load Concurrency Testing', 'Live Data Verification'],
        },
        {
          stepNumber: '05',
          title: 'Support',
          desc: 'Cubixsol provides technical assistance, 24/7 uptime monitoring, API version migration support, and ongoing feature enhancements after project completion.',
          points: ['Proactive Monitoring', '24/7 Priority Support', 'Continuous Optimization'],
        },
      ],

      // Section 6: Why Choose Cubixsol For Guesty Integration?
      whyChooseTitle: 'Why Choose Cubixsol For Guesty Integration?',
      whyChooseIntro: 'Cubixsol combines software development expertise with PMS integration knowledge to create solutions for vacation rental companies. Our team focuses on secure connections, scalable architecture, and business-focused results.',
      whyChooseItems: [
        {
          title: 'Deep PMS & Guesty Domain Expertise',
          desc: 'We understand the unique complexities of vacation rental operations, multi-calendar synchronization, channel management, and guest communication.',
        },
        {
          title: 'Enterprise Security & Compliance',
          desc: 'Bank-grade encryption, OAuth2 token rotation, PCI-DSS compliant payment pathways, and secure webhook validation for all connected systems.',
        },
        {
          title: 'Scalable Microservice Architecture',
          desc: 'Engineered to handle high booking volumes during peak tourist seasons without latency spikes, dropped webhooks, or calendar sync failures.',
        },
        {
          title: 'Tailored To Your Exact Business Model',
          desc: 'Whether you manage 10 luxury villas or 1,000+ urban apartments, we build custom Guesty connections designed strictly around your specific workflows.',
        },
      ],

      faqs: [
        {
          q: 'What is Guesty API integration and how does it help vacation rental managers?',
          a: 'Guesty API integration allows your Property Management System (PMS) to automatically communicate and exchange data with external tools such as Airbnb, VRBO, smart locks, payment gateways, and accounting platforms. This eliminates repetitive manual data entry, prevents double-bookings, automates check-ins, and creates a unified operational workflow.',
        },
        {
          q: 'How does Guesty Smart Lock integration work for guest check-in?',
          a: 'When a reservation is confirmed in Guesty, our integration automatically generates a unique 4-to-6 digit PIN code on your smart locks (e.g. Yale, Schlage, August, RemoteLock) that only activates at check-in time and automatically expires at check-out. The guest receives this code along with check-in instructions via automated SMS or email.',
        },
        {
          q: 'Can you integrate Guesty with accounting software like QuickBooks or Xero?',
          a: 'Yes. We build custom 2-way sync bridges that export reservation payouts, host fees, cleaning fees, and sales taxes from Guesty directly into QuickBooks or Xero, ensuring flawless financial books without manual bookkeeping.',
        },
        {
          q: 'Will integrating new tools disrupt our active bookings or current Guesty setup?',
          a: 'No. All integration pipelines are built and verified in sandbox environments with mock reservations first. We execute zero-downtime deployment with fail-safe retry mechanisms to ensure active bookings and calendar availabilities are never affected.',
        },
        {
          q: 'Can Cubixsol connect custom internal CRM or proprietary software with Guesty?',
          a: 'Yes. Guesty provides robust REST APIs and Webhook capabilities. Our senior backend engineers build bespoke API endpoints and serverless webhooks that connect any custom CRM, mobile application, or internal portal with Guesty.',
        },
      ],

      seo: {
        metaTitle: 'Guesty Integration Services | Custom Guesty API & Smart Lock Solutions | Cubixsol',
        metaDescription: 'Cubixsol provides expert Guesty integration services for vacation rentals. Connect Guesty with Airbnb, smart locks, CRMs, payment gateways & custom APIs.',
        keywords: 'Guesty integration services, Guesty API development, Guesty Airbnb integration, Guesty smart lock integration, PMS integration vacation rentals',
        ogTitle: 'Guesty Integration Services | Cubixsol',
        ogDescription: 'Custom Guesty integration solutions for vacation rental businesses. Automated smart locks, 2-way Airbnb sync, and enterprise PMS API development.',
      },
    };

    const updated = await Service.findOneAndUpdate(
      { slug: 'guesty-integration' },
      { $set: guestyData },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log('Successfully seeded Guesty Integration service:', updated._id, updated.slug);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding Guesty Integration service:', err);
    process.exit(1);
  }
}

seedGuesty();
