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

async function seedZeevou() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 15000 });
    console.log('Connected successfully to MongoDB Atlas.');

    const zeevouData = {
      slug: 'zeevou-integration',
      title: 'Zeevou Integration Services',
      cardTitle: 'Zeevou Integration',
      menuTitle: 'Zeevou Integration',
      icon: 'Building2',
      color: 'text-[#00a4d8] bg-[#00a4d8]/10',
      gradient: 'from-[#00a4d8] to-[#5d53a3]',
      heroSubtitle: 'Automate Property Management With Custom Zeevou Integrations',
      heroImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&h=800&q=80',
      desc: 'Cubixsol provides reliable Zeevou integration services to vacation rental businesses. They connect their platform with essential software systems. Our developers build customised integration solutions to simplify operations, improve automation, and create seamless communication between different business tools.',
      longDesc: 'Cubixsol provides reliable Zeevou integration services to vacation rental businesses. They connect their platform with essential software systems. Our developers build customised integration solutions to simplify operations, improve automation, and create seamless communication between different business tools.',
      additionalParagraph: 'Our integration solutions help businesses create a connected technology environment that improves productivity and reduces operational complexity. We create Zeevou integrations that connect your PMS with OTAs, direct booking websites, payment processing, CRMs, smart locks, accounting software, and marketing platforms.',
      ctaPrimaryText: 'Schedule A Zeevou Consultation',
      ctaSecondaryText: 'Explore Integration Architecture',
      features: [
        'Direct Booking Engine & 0% Commission Workflows',
        'Multi-Channel 2-Way Synchronization Across 200+ OTAs',
        'Automated Smart Lock & Digital Keyless Check-in',
        'Automated 3-D Secure Payments & Xero Accounting Sync',
      ],

      // Section 1: Connect Zeevou With Your Business Applications
      subServicesTitle: 'Connect Zeevou With Your Business Applications',
      subServicesIntro: 'Our integration solutions help businesses create a connected technology environment that improves productivity and reduces operational complexity. We create Zeevou integrations that connect your PMS with important platforms, including:',
      subServicesItems: [
        {
          title: 'Online Travel Agencies & Booking Channels',
          desc: 'Online travel agencies and booking channels (Airbnb, Vrbo, Booking.com, Expedia) for real-time rates, multi-unit availability, and unified calendar management.',
        },
        {
          title: 'Direct Booking Websites',
          desc: 'Direct booking websites and branded portals powered by Zeevou Direct to capture 0% commission direct bookings, automated guest vetting, and repeat stays.',
        },
        {
          title: 'Payment Processing Systems',
          desc: 'Payment processing systems (Stripe, 3-D Secure, Signable) for automated security deposits, fraud prevention, instant chargebacks handling, and digital ID checks.',
        },
        {
          title: 'Customer Relationship Management',
          desc: 'Customer relationship management platforms (HubSpot, Salesforce) for unified guest communication history, VIP guest segmentation, and repeat booking automations.',
        },
        {
          title: 'Smart Lock & Property Automation Tools',
          desc: 'Smart lock and property automation tools (Yale, August, Schlage, RemoteLock, Minut) for automated time-restricted access codes and noise monitoring.',
        },
        {
          title: 'Accounting & Reporting Software',
          desc: 'Accounting and reporting software (Xero, QuickBooks) for automated invoice generation, owner statement calculations, VAT reporting, and cleaning expense logs.',
        },
        {
          title: 'Marketing & Communication Applications',
          desc: 'Marketing and communication applications (Mailchimp, Klaviyo, WhatsApp API) for automated guest messaging, review booster triggers, and seasonal promotions.',
        },
      ],

      // Section 2: Zeevou Booking Channel Integration Services
      businessTypesTitle: 'Zeevou Booking Channel Integration Services',
      businessTypesIntro: 'We develop Zeevou channel integrations that help property managers maintain accurate booking information across different platforms. A connected booking system allows businesses to manage multiple rental channels while maintaining consistent property information. Our solutions support:',
      businessTypesItems: [
        {
          title: 'Reservation Data Synchronisation',
          desc: 'Sub-second two-way booking flow that captures new reservations, modifications, cancellations, and extensions instantly across all distribution channels.',
        },
        {
          title: 'Availability and Calendar Updates',
          desc: 'Instant calendar parity across OTAs and direct websites to completely eliminate double bookings and maximize multi-unit occupancy.',
        },
        {
          title: 'Listing Information Management',
          desc: 'Centralized distribution of property descriptions, photos, house rules, pricing rules, and check-in instructions to all connected channels.',
        },
        {
          title: 'Guest Detail Transfer',
          desc: 'Automated transfer of guest profiles, verified contact details, arrival times, and special requests directly into Zeevou Central Calendar.',
        },
        {
          title: 'Booking Status Automation',
          desc: 'Automated status triggers for ID verification completion, deposit holds, payment settlements, and turnover cleaning scheduling.',
        },
      ],

      // Section 3: Zeevou API Integration Development
      techTitle: 'Zeevou API Integration Development',
      techDesc: 'Cubixsol offers custom Zeevou API integration services for businesses that need advanced software connectivity. Our developers build secure API-based solutions that let Zeevou communicate with external applications. Our Zeevou API integration services include:',
      tech: [
        'Custom application development',
        'Third-party software connections',
        'Automated workflow creation',
        'Data synchronisation solutions',
        'API testing and maintenance',
      ],

      // Section 4, 5, 6: Outcomes covering Direct Bookings, Smart Locks, Payments & Accounting
      outcomes: [
        'Direct booking website connections with automated reservation processing',
        'Automated 3-D secure guest vetting, digital signature collection, and ID verification',
        'Digital key generation and automated check-in with smart lock connections',
        'Automated access code creation and remote property access management',
        'Payment gateway connections and invoice automation with 100% PCI compliance',
        'Accounting software integration and financial reporting with Xero & QuickBooks',
        'Marketing automation workflows for repeat booking campaigns and 5-star reviews',
      ],

      // Section 7: Our Zeevou Integration Process
      serviceProcessTitle: 'Our Zeevou Integration Process',
      serviceProcessIntro: 'Cubixsol follows a professional approach to deliver effective Zeevou integration solutions with zero downtime and reliable performance:',
      serviceProcessSteps: [
        {
          stepNumber: '01',
          title: 'Requirement Discovery',
          desc: 'Our team reviews your business model, property portfolio, software environment, and integration goals to design the optimal plan.',
          points: ['Portfolio Auditing', 'Tech Stack Evaluation', 'Milestone Roadmapping'],
        },
        {
          stepNumber: '02',
          title: 'Solution Design',
          desc: 'We prepare a technical plan, API mapping architecture, and webhook event schema based on your required features.',
          points: ['API Architecture Blueprint', 'Webhook Event Schemas', 'Security & Token Setup'],
        },
        {
          stepNumber: '03',
          title: 'Development And Configuration',
          desc: 'Our developers build the required custom connections, automation workflows, serverless event handlers, and data synchronization bridges.',
          points: ['Connector Development', 'Bidirectional Sync Engine', 'Fail-safe Retry Queues'],
        },
        {
          stepNumber: '04',
          title: 'Quality Testing',
          desc: 'We verify system performance, stress-test high concurrency webhook traffic, security compliance, and data accuracy before deployment.',
          points: ['End-to-End Sandbox Testing', 'Edge-case Validation', 'Zero-Downtime Rollout'],
        },
        {
          stepNumber: '05',
          title: 'Deployment And Support',
          desc: 'Our team assists with implementation, 24/7 uptime monitoring, Zeevou API updates, and ongoing technical requirements.',
          points: ['24/7 Priority Support', 'Proactive Uptime Monitoring', 'Continuous Feature Updates'],
        },
      ],

      // Section 8: Why Choose Cubixsol For Zeevou Integration?
      whyChooseTitle: 'Why Choose Cubixsol For Zeevou Integration?',
      whyChooseIntro: 'Cubixsol delivers customised PMS integration services for hospitality and vacation rental businesses. Our developers create secure, scalable, and efficient solutions to connect your systems and improve daily operations. Whether you need booking synchronisation, API development, direct booking integration, or automation solutions, Cubixsol provides Zeevou integrations designed around your business needs.',
      whyChooseItems: [
        {
          title: 'Deep PMS & Zeevou Architecture Mastery',
          desc: 'Specialized expertise across Zeevou Direct Bookings, channel management, 3-D secure guest vetting, and multi-unit hospitality ops.',
          metric: '10+ Yrs',
          metricLabel: 'PMS Expertise',
        },
        {
          title: 'Enterprise Security & 3-D Secure Compliance',
          desc: 'Bank-grade TLS encryption, PCI-DSS payment pathways, tokenized transactions, and automated guest ID verification checks.',
          metric: '256-bit',
          metricLabel: 'Encryption',
        },
        {
          title: 'High-Throughput Scalable Microservices',
          desc: 'Engineered for high booking volume concurrency during peak seasons without dropped webhooks or calendar sync lag.',
          metric: '99.99%',
          metricLabel: 'SLA Uptime',
        },
        {
          title: 'Direct Booking Revenue Maximization',
          desc: 'Bespoke booking engines that empower hosts to capture direct guest payments with 0% OTA commissions and automated invoices.',
          metric: '0% Fee',
          metricLabel: 'Direct Bookings',
        },
      ],

      // Section 9: Frequently Asked Questions
      faqs: [
        {
          q: 'What Zeevou integration services does Cubixsol provide?',
          a: 'Cubixsol creates custom Zeevou integrations with booking platforms, payment systems, CRM tools, smart devices, and other business applications.',
        },
        {
          q: 'Can Zeevou integrate with booking channels?',
          a: 'Yes, Zeevou can connect with different booking platforms, and Cubixsol can develop solutions to improve synchronisation and automation.',
        },
        {
          q: 'Does Cubixsol provide Zeevou API integration?',
          a: 'Yes, our developers create custom API integrations that connect Zeevou with external software systems.',
        },
        {
          q: 'Can Zeevou connect with smart lock systems?',
          a: 'Yes, Zeevou can integrate with smart access solutions to support automated entry and improved guest experiences.',
        },
        {
          q: 'How can Zeevou integration improve property management?',
          a: 'Zeevou integration helps businesses automate workflows, reduce manual processes, and manage rental operations more efficiently.',
        },
      ],

      seo: {
        metaTitle: 'Zeevou Integration Services | Custom API, Direct Booking & Channel Solutions | Cubixsol',
        metaDescription: 'Cubixsol provides expert Zeevou integration services. Connect Zeevou PMS with OTAs, direct booking websites, smart locks, Xero, and custom APIs.',
        keywords: 'Zeevou integration services, Zeevou API development, Zeevou direct booking integration, Zeevou channel manager, PMS integration vacation rentals',
        ogTitle: 'Zeevou Integration Services | Cubixsol',
        ogDescription: 'Custom Zeevou integration solutions for vacation rental businesses. Multi-channel sync, 0% commission direct bookings, and custom API connections.',
      },
    };

    const updated = await Service.findOneAndUpdate(
      { slug: 'zeevou-integration' },
      { $set: zeevouData },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log('Successfully seeded Zeevou Integration service:', updated._id, updated.slug);
    process.exit(0);
  } catch (err) {
    console.error('Error seeding Zeevou Integration service:', err);
    process.exit(1);
  }
}

seedZeevou();
