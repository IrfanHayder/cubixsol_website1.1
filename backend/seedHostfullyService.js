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

async function seedHostfully() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 15000 });
    console.log('Connected successfully to MongoDB Atlas.');

    const hostfullyData = {
      slug: 'hostfully-integration',
      title: 'Hostfully Integration Services',
      cardTitle: 'Hostfully Integration',
      menuTitle: 'Hostfully Integration',
      icon: 'BookOpen',
      color: 'text-[#00a4d8] bg-[#00a4d8]/10',
      gradient: 'from-[#00a4d8] to-[#5d53a3]',
      heroSubtitle: 'Hostfully API Integration Services for Vacation Rentals',
      heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&h=800&q=80',
      desc: 'Cubixsol provides professional Hostfully integration services to help vacation rental companies connect their property management system with essential digital tools.',
      longDesc: 'Cubixsol provides professional Hostfully integration services to help vacation rental companies connect their property management system with essential digital tools. Our developers create custom integrations that improve booking workflows, automate operations, and provide better control over guest management processes.',
      additionalParagraph: 'We develop Hostfully integration solutions that connect your PMS with the applications your vacation rental business already uses. These integrations help your systems work together and keep your operations more connected. Our team creates smooth data connections that reduce manual processes and improve operational efficiency across booking channels, CRMs, digital guidebooks, payment gateways, smart locks, and accounting software.',
      ctaPrimaryText: 'Schedule A Hostfully Consultation',
      ctaSecondaryText: 'Explore Integration Architecture',
      features: [
        'Interactive Digital Guidebook & Guest Portal Sync',
        'Multi-Channel 2-Way Marketplace & OTA Parity',
        'Custom Hostfully Open API & Webhook Engineering',
        'Smart Lock Access Control & Automated Check-in',
      ],

      // Section 1: Connect Hostfully With Your Existing Technology Stack
      subServicesTitle: 'Connect Hostfully With Your Existing Technology Stack',
      subServicesIntro: 'We develop Hostfully integration solutions that connect your PMS with the applications your vacation rental business already uses. These integrations help your systems work together and keep your operations more connected. Our team creates smooth data connections that reduce manual processes and improve operational efficiency. Our Hostfully integrations can connect with:',
      subServicesItems: [
        {
          title: 'Online Booking Platforms & Marketplaces',
          desc: 'Online booking platforms and rental marketplaces (Airbnb, Vrbo, Booking.com, Google Vacation Rentals) for real-time calendar availability, instant rates, and reservation parity.',
        },
        {
          title: 'Customer Relationship Management',
          desc: 'Customer relationship management systems (HubSpot, Salesforce) for unified guest profiles, booking history aggregation, automated lead scoring, and loyalty campaigns.',
        },
        {
          title: 'Payment Processing Solutions',
          desc: 'Payment processing solutions (Stripe, Adyen, PayPal) for PCI-compliant guest billing, automated damage deposit pre-authorizations, and transparent refund handling.',
        },
        {
          title: 'Smart Home & Access Management Tools',
          desc: 'Smart home and access management tools (Yale, August, Schlage, RemoteLock, Minut, NoiseAware) for automated keyless access code creation and property monitoring.',
        },
        {
          title: 'Accounting & Financial Software',
          desc: 'Accounting and financial software (QuickBooks, Xero) for automated owner statements, cleaning expense allocation, commission tracking, and tax reports.',
        },
        {
          title: 'Communication & Marketing Platforms',
          desc: 'Communication and marketing platforms (Klaviyo, Mailchimp, Twilio SMS) for automated guest messaging, digital guidebook delivery, and review booster campaigns.',
        },
      ],

      // Section 2: Hostfully Booking Channel Integration
      businessTypesTitle: 'Hostfully Booking Channel Integration',
      businessTypesIntro: 'Property managers need accurate synchronisation across multiple booking platforms to manage reservations effectively. Cubixsol helps businesses integrate Hostfully with popular rental channels to maintain consistent information across different platforms. Our channel integration services support:',
      businessTypesItems: [
        {
          title: 'Reservation Synchronisation',
          desc: 'Real-time two-way data pipeline that captures new reservations, modifications, extensions, and cancellations instantly across all connected platforms.',
        },
        {
          title: 'Calendar Availability Updates',
          desc: 'Sub-second calendar availability updates across all distribution channels to eliminate double bookings and maximize occupancy.',
        },
        {
          title: 'Guest Information Transfer',
          desc: 'Automated transfer of guest profiles, verified contact details, arrival times, and special requests directly into Hostfully Central Calendar.',
        },
        {
          title: 'Property Listing Management',
          desc: 'Centralized multi-channel distribution for listing descriptions, photography, house rules, amenity tags, and check-in instructions.',
        },
        {
          title: 'Booking Status Updates',
          desc: 'Automated status synchronization for pending payments, verified guest deposits, check-in completion, and post-departure turnover.',
        },
      ],

      // Section 3: Hostfully API Integration Services
      techTitle: 'Hostfully API Integration Services',
      techDesc: 'Cubixsol provides custom Hostfully API integration solutions that allow businesses to connect their preferred applications with the PMS. Our developers design secure API connections that enable smooth communication between different software systems. Our Hostfully API services include:',
      tech: [
        'Custom software integrations',
        'Third-party application connections',
        'Automated data transfer solutions',
        'Workflow customisation',
        'API testing and optimisation',
      ],

      // Section 4, 5, 6: Outcomes covering Digital Guidebooks, Smart Locks, Payments & CRM
      outcomes: [
        'Automated digital guidebook delivery and personalized welcome SMS on confirmation',
        'Property instruction sharing and digital house manual access for guests',
        'Digital key generation and automated check-in with smart lock connections',
        'Guest access management and remote property automation workflows',
        'Payment gateways for secure transactions and automated damage deposit holds',
        'CRM platforms for guest relationship management and loyalty retention',
        'Email marketing systems and business reporting tools for operational growth',
      ],

      // Section 7: Our Hostfully Integration Process
      serviceProcessTitle: 'Our Hostfully Integration Process',
      serviceProcessIntro: 'Cubixsol follows a clear development approach for every Hostfully integration project to deliver robust connectivity and reliable performance:',
      serviceProcessSteps: [
        {
          stepNumber: '01',
          title: 'Requirement Assessment',
          desc: 'Our team identifies your business goals, existing tools, property portfolio scale, and required integration features.',
          points: ['Portfolio Discovery', 'Tech Stack Auditing', 'Integration Scoping'],
        },
        {
          stepNumber: '02',
          title: 'Technical Planning',
          desc: 'We create a solution strategy, API mapping architecture, and webhook event schema based on your workflow and system requirements.',
          points: ['Architecture Blueprint', 'Webhook Event Mapping', 'Security & OAuth2 Setup'],
        },
        {
          stepNumber: '03',
          title: 'Integration Development',
          desc: 'Our developers build and configure the required connections, custom microservices, digital guidebook bridges, and automated sync pipelines.',
          points: ['Connector Development', 'Bidirectional Sync Engine', 'Fail-safe Retry Queues'],
        },
        {
          stepNumber: '04',
          title: 'Testing And Launch',
          desc: 'We evaluate performance, stress-test high concurrency webhook traffic, and deploy the completed integration with zero downtime.',
          points: ['End-to-End Sandbox Testing', 'Edge-case Validation', 'Zero-Downtime Go-Live'],
        },
        {
          stepNumber: '05',
          title: 'Ongoing Support',
          desc: 'Our team provides technical assistance, 24/7 uptime monitoring, Hostfully API version updates, and continuous optimization.',
          points: ['24/7 Priority Support', 'Proactive Uptime Monitoring', 'Continuous Feature Updates'],
        },
      ],

      // Section 8: Why Choose Cubixsol For Hostfully Integration?
      whyChooseTitle: 'Why Choose Cubixsol For Hostfully Integration?',
      whyChooseIntro: 'Cubixsol helps vacation rental businesses improve their technology infrastructure through custom PMS integration solutions. Our developers focus on creating secure, flexible, and business-focused integrations that connect different systems into one efficient workflow. Whether you need booking automation, API development, smart lock integration, or CRM connectivity, Cubixsol delivers custom Hostfully solutions that align with your business goals.',
      whyChooseItems: [
        {
          title: 'Deep PMS & Hostfully Ecosystem Mastery',
          desc: 'Expertise across Hostfully Property Management Platform, Digital Guidebooks, channel management, and guest experience workflows.',
        },
        {
          title: 'Enterprise Security & PCI Compliance',
          desc: 'Bank-grade TLS encryption, tokenized payment gateways, OAuth2 token rotation, and HMAC-verified webhook pipelines.',
        },
        {
          title: 'High-Throughput Scalable Architecture',
          desc: 'Engineered for high booking volume concurrency during peak seasons without dropped events or calendar sync delays.',
        },
        {
          title: 'Custom Fit For Your Vacation Rental Workflow',
          desc: 'Tailored solutions whether managing boutique urban portfolios, luxury villas, or multi-destination rental operations.',
        },
      ],

      // Section 9: Frequently Asked Questions
      faqs: [
        {
          q: 'What Hostfully integration services does Cubixsol provide?',
          a: 'Cubixsol develops custom Hostfully integrations with booking channels, payment platforms, CRM systems, automation tools, and other business applications.',
        },
        {
          q: 'Can Hostfully connect with Airbnb and other rental platforms?',
          a: 'Yes, Hostfully supports connections with rental marketplaces, and Cubixsol can create customised integration solutions.',
        },
        {
          q: 'Does Cubixsol offer Hostfully API integration?',
          a: 'Yes, our developers build API-based solutions that connect Hostfully with external software and business systems.',
        },
        {
          q: 'Can Hostfully integrate with smart lock systems?',
          a: 'Yes, Hostfully can connect with smart access solutions to support automated guest entry and property management.',
        },
        {
          q: 'How does Hostfully integration benefit vacation rental companies?',
          a: 'Hostfully integration improves workflow automation, reduces manual tasks, and helps businesses manage rental operations more effectively.',
        },
      ],

      seo: {
        metaTitle: 'Hostfully Integration Services | Custom API, Guidebook & Smart Lock Solutions | Cubixsol',
        metaDescription: 'Cubixsol provides professional Hostfully integration services. Connect Hostfully PMS with Airbnb, Vrbo, smart locks, digital guidebooks, CRMs & custom APIs.',
        keywords: 'Hostfully integration services, Hostfully API development, Hostfully digital guidebook integration, Hostfully channel manager, PMS integration vacation rentals',
        ogTitle: 'Hostfully Integration Services | Cubixsol',
        ogDescription: 'Custom Hostfully integration solutions for vacation rental businesses. Multi-channel sync, smart digital guidebooks, and custom API connections.',
      },
    };

    const updated = await Service.findOneAndUpdate(
      { slug: 'hostfully-integration' },
      { $set: hostfullyData },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log('Successfully seeded Hostfully Integration service:', updated._id, updated.slug);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding Hostfully Integration service:', err);
    process.exit(1);
  }
}

seedHostfully();
