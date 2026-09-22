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

async function seedHostaway() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 15000 });
    console.log('Connected successfully to MongoDB Atlas.');

    const hostawayData = {
      slug: 'hostaway-integration',
      title: 'Hostaway Integration Services',
      cardTitle: 'Hostaway Integration',
      menuTitle: 'Hostaway Integration',
      icon: 'Building2',
      color: 'text-[#00a4d8] bg-[#00a4d8]/10',
      gradient: 'from-[#00a4d8] to-[#5d53a3]',
      heroSubtitle: 'Scalable Hostaway Integration Solutions for Vacation Rental Management',
      heroImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&h=800&q=80',
      desc: 'Cubixsol provides advanced Hostaway integration services that help vacation rental companies connect their property management systems with essential business applications.',
      longDesc: 'Cubixsol provides advanced Hostaway integration services that help vacation rental companies connect their property management systems with essential business applications. Our developers create custom solutions that improve reservation management, automate daily operations, and simplify communication between multiple platforms.',
      additionalParagraph: 'Our integration solutions help reduce repetitive tasks, improve accuracy, and create a smoother workflow for property management teams. We develop Hostaway integrations that allow seamless data exchange between your PMS and booking channels (Airbnb, Vrbo, Booking.com), CRMs, payment gateways, smart locks, accounting software, and marketing automation tools.',
      ctaPrimaryText: 'Schedule A Hostaway Consultation',
      ctaSecondaryText: 'Explore Integration Architecture',
      features: [
        'Multi-Channel 2-Way Sync (Airbnb, Vrbo, Booking.com)',
        'Smart Automation & Digital Guest Check-in Workflows',
        'Custom Hostaway REST & Webhook API Development',
        'Automated Payment Gateways & CRM Integration',
      ],

      // Section 1: Integrate Hostaway With Your Essential Business Tools
      subServicesTitle: 'Integrate Hostaway With Your Essential Business Tools',
      subServicesIntro: 'Our integration solutions help reduce repetitive tasks, improve accuracy, and create a smoother workflow for property management teams. We develop Hostaway integrations that allow seamless data exchange between your PMS and other platforms, including:',
      subServicesItems: [
        {
          title: 'Booking Channels & OTAs',
          desc: 'Booking channels such as Airbnb, Vrbo, Booking.com, and direct booking engines for real-time reservation synchronisation, instant calendar blocking, and rate parity.',
        },
        {
          title: 'Customer Relationship Management',
          desc: 'Customer relationship management systems (HubSpot, Salesforce) for organised guest information, unified communication logs, VIP tagging, and repeat stay marketing.',
        },
        {
          title: 'Payment Processing Platforms',
          desc: 'Payment processing platforms (Stripe, Adyen, Authorize.net) for secure credit card processing, automated damage deposit pre-authorisation, and instant guest refund handling.',
        },
        {
          title: 'Smart Home & Access Control',
          desc: 'Smart home and access control solutions (Yale, August, Schlage, RemoteLock, Minut, NoiseAware) for automated keyless access codes and noise monitoring.',
        },
        {
          title: 'Accounting & Reporting Applications',
          desc: 'Accounting and reporting applications (QuickBooks, Xero) for accurate financial records, automated owner payouts, cleaning fee tracking, and tax compliance.',
        },
        {
          title: 'Marketing Automation Tools',
          desc: 'Marketing automation tools (Klaviyo, Mailchimp, ActiveCampaign) for guest engagement campaigns, automated review request triggers, and SMS notifications.',
        },
      ],

      // Section 2: Hostaway Channel Integration Services
      businessTypesTitle: 'Hostaway Channel Integration Services',
      businessTypesIntro: 'Property managers depend on multiple booking channels to increase reservations and reach more guests. Cubixsol creates Hostaway channel integrations that synchronise important rental data across different platforms. A properly connected channel system helps prevent booking conflicts and allows managers to maintain consistent information across all platforms.',
      businessTypesItems: [
        {
          title: 'Reservation Synchronisation',
          desc: 'Sub-second two-way booking data flow that updates newly confirmed reservations, cancellations, and length-of-stay changes across all channels.',
        },
        {
          title: 'Availability Updates',
          desc: 'Instant calendar availability mirroring across Airbnb, Vrbo, Booking.com, and direct websites to completely eliminate double bookings.',
        },
        {
          title: 'Rate Management',
          desc: 'Centralised dynamic nightly pricing, seasonal markup rules, minimum stay restrictions, and promotional discounts across all distribution endpoints.',
        },
        {
          title: 'Guest Information Transfer',
          desc: 'Complete automated ingestion of guest profiles, verified phone numbers, check-in requests, special inquiries, and payout records into Hostaway.',
        },
        {
          title: 'Listing Data Synchronisation',
          desc: 'Unified multi-unit listing synchronization including photos, house rules, amenity updates, check-in instructions, and cancellation policies.',
        },
      ],

      // Section 3: Hostaway API Integration Development
      techTitle: 'Hostaway API Integration Development',
      techDesc: 'Hostaway offers API capabilities that enable businesses to connect their preferred applications with the PMS. Cubixsol provides custom Hostaway API integration services to build flexible and scalable connections. Our developers design secure solutions that allow your software environment to communicate efficiently with Hostaway.',
      tech: [
        'Custom application integration',
        'Data synchronization between systems',
        'Automated workflow creation',
        'Third-party platform connections',
        'API optimization and maintenance',
      ],

      // Section 4 & 5: Smart Automation, Payments & CRM Outcomes
      outcomes: [
        'Automated guest messaging via unified inbox, SMS, and WhatsApp triggers',
        'Digital check-in workflows with automated ID verification and digital agreements',
        'Smart lock connectivity with time-restricted 6-digit access code generation',
        'Task notifications and auto-dispatch for housekeeping and maintenance staff',
        'Operational alerts for noise threshold spikes, early check-ins, and late check-outs',
        'Payment gateways for secure automated transactions and security deposit holds',
        'CRM systems for 360-degree guest relationship management and lifetime value tracking',
        'Accounting tools for automated owner statements, expense allocation, and tax reports',
      ],

      // Section 6: Our Hostaway Integration Process
      serviceProcessTitle: 'Our Hostaway Integration Process',
      serviceProcessIntro: 'Cubixsol follows a professional approach to deliver successful Hostaway integration projects with zero downtime and reliable performance:',
      serviceProcessSteps: [
        {
          stepNumber: '01',
          title: 'Business Analysis',
          desc: 'Our team reviews your current systems, vacation rental portfolio, operational challenges, and integration goals to define the optimal roadmap.',
          points: ['Portfolio Auditing', 'Tech Stack Evaluation', 'Milestone Scoping'],
        },
        {
          stepNumber: '02',
          title: 'Solution Planning',
          desc: 'We create a comprehensive technical roadmap, data mapping architecture, and webhook event schema based on your required features.',
          points: ['API Architecture Blueprint', 'Webhook Event Schemas', 'Security & Token Rotation'],
        },
        {
          stepNumber: '03',
          title: 'Development And Configuration',
          desc: 'Our developers build the required custom connections, automation workflows, serverless event handlers, and data synchronization bridges.',
          points: ['Custom Connector Build', 'Bidirectional Sync Engine', 'Fail-safe Retry Queues'],
        },
        {
          stepNumber: '04',
          title: 'Testing And Deployment',
          desc: 'We verify system performance, stress-test high concurrency webhook loads, and validate mock booking scenarios before live rollout.',
          points: ['End-to-End Edge Case Testing', 'Concurrency Verification', 'Zero-Downtime Rollout'],
        },
        {
          stepNumber: '05',
          title: 'Technical Support',
          desc: 'We assist to maintain reliable integration performance, 24/7 uptime monitoring, Hostaway API updates, and ongoing enhancements.',
          points: ['24/7 Priority Support', 'Proactive Uptime Monitoring', 'API Lifecycle Maintenance'],
        },
      ],

      // Section 7: Why Choose Cubixsol For Hostaway Integration?
      whyChooseTitle: 'Why Choose Cubixsol For Hostaway Integration?',
      whyChooseIntro: 'Cubixsol delivers customised PMS integration solutions for vacation rental businesses that need better automation and system connectivity. Our developers focus on creating secure, scalable, and efficient integrations that support business growth. We help you connect Hostaway with booking channels, APIs, automation tools, and third-party software to support your unique operational needs.',
      whyChooseItems: [
        {
          title: 'Deep PMS & Hostaway Architecture Mastery',
          desc: 'Decade of engineering experience with multi-channel PMS architectures, OTAs, guest messaging pipelines, and smart lock ecosystems.',
        },
        {
          title: 'Enterprise Security & PCI Compliance',
          desc: 'End-to-end TLS encryption, OAuth2 token rotation, PCI-DSS compliant payment pathways, and secure webhook validation.',
        },
        {
          title: 'High-Throughput Scalability',
          desc: 'Serverless microservices built to handle massive seasonal booking spikes across thousands of listings without dropped events.',
        },
        {
          title: 'Bespoke Business Workflow Tailoring',
          desc: 'Every connector and automation is engineered specifically to match your operational requirements, owner reporting rules, and guest touchpoints.',
        },
      ],

      // Section 8: Frequently Asked Questions
      faqs: [
        {
          q: 'What Hostaway integration services does Cubixsol offer?',
          a: 'Cubixsol provides custom Hostaway integrations with booking channels, payment systems, CRM platforms, smart tools, and business applications.',
        },
        {
          q: 'Can Hostaway integrate with Airbnb and other OTAs?',
          a: 'Yes, Hostaway supports connections with major booking channels, and Cubixsol can help configure and customize these integrations.',
        },
        {
          q: 'Does Cubixsol develop custom Hostaway API solutions?',
          a: 'Yes, our developers create API-based integrations that connect Hostaway with external software and business systems.',
        },
        {
          q: 'Can Hostaway be connected with smart lock systems?',
          a: 'Yes, Hostaway can integrate with smart access solutions to support automated entry and improved guest experiences.',
        },
        {
          q: 'How can Hostaway integration improve rental management?',
          a: 'Hostaway integration reduces manual work, improves data accuracy, and helps property managers operate multiple systems through connected workflows.',
        },
      ],

      seo: {
        metaTitle: 'Hostaway Integration Services | Scalable PMS API & Channel Solutions | Cubixsol',
        metaDescription: 'Cubixsol provides expert Hostaway integration services. Connect Hostaway with Airbnb, Vrbo, Booking.com, smart locks, CRMs, and custom APIs.',
        keywords: 'Hostaway integration services, Hostaway API development, Hostaway channel manager integration, Hostaway smart lock, PMS integration vacation rentals',
        ogTitle: 'Hostaway Integration Services | Cubixsol',
        ogDescription: 'Scalable Hostaway integration solutions for vacation rental management. Multi-channel sync, smart automations, and custom API connections.',
      },
    };

    const updated = await Service.findOneAndUpdate(
      { slug: 'hostaway-integration' },
      { $set: hostawayData },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log('Successfully seeded Hostaway Integration service:', updated._id, updated.slug);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding Hostaway Integration service:', err);
    process.exit(1);
  }
}

seedHostaway();
