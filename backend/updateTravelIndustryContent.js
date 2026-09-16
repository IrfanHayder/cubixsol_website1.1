const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Industry = require('./models/Industry');

async function updateTravelContent() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('Connected.');

    const travelData = {
      heroTitle: 'Travel Software Development Company',
      title: 'Travel & Hospitality',
      slug: 'travel',
      icon: 'Plane',
      short: 'Cubixsol is a travel software development company that builds scalable digital solutions for travel businesses, agencies, and hospitality providers. We create custom platforms that simplify bookings, improve customer experiences, and optimise travel operations through modern technology.',
      desc: 'Cubixsol is a travel software development company that builds scalable digital solutions for travel businesses, agencies, and hospitality providers. We create custom platforms that simplify bookings, improve customer experiences, and optimise travel operations through modern technology.',
      ctaPrimaryText: 'Build Your Travel Solution',
      ctaPrimaryLink: '/contact',
      ctaSecondaryText: 'Get a free proposal',
      ctaSecondaryLink: '#estimate',
      ctaBannerButtonText: 'Start Your Travel Software Project Today',
      ctaBannerButtonLink: '/contact',
      ctaBannerSecondaryButtonText: 'Get a free proposal',
      ctaBannerSecondaryButtonLink: '#estimate',
      points: [
        'Custom-Built Travel Platforms',
        'Enhanced Customer Experiences',
        'Strong Security Practices',
        'Advanced Automation Features',
        'Modern Technology Approach',
        'Long-Term Partnership Support',
      ],
      solutionsTitle: 'Travel Software Solutions We Build',
      solutionsSubtitle: 'We develop custom travel and hospitality platforms that streamline bookings, empower travelers, and automate complex workflows.',
      solutionsItems: [
        {
          title: 'Travel Booking Platforms',
          body: 'We develop booking platforms that allow travellers to search, compare, and reserve flights, hotels, tours, and other travel services. Custom booking systems can integrate payment gateways, availability management, and third-party APIs for smooth reservation experiences.',
        },
        {
          title: 'Travel Mobile Apps',
          body: 'Our travel app development services create mobile experiences that help users discover destinations, manage bookings, receive updates, and access travel services from anywhere. We build apps with intuitive interfaces and features that improve engagement throughout the customer journey.',
        },
        {
          title: 'Travel Management Software',
          body: 'Travel companies can streamline daily operations with custom management software that handles customer records, supplier coordination, itinerary planning, and reporting. These platforms provide better control over business workflows and operational data.',
        },
        {
          title: 'Hospitality Integration Solutions',
          body: 'We build software that connects travel platforms with hotels, airlines, payment providers, and external service systems. These integrations create synchronised workflows and improve accuracy across multiple travel operations.',
        },
      ],
      workAreasTitle: 'Built for Travel Industry Standards',
      workAreas: [
        {
          title: 'Secure Payment Integration',
          body: 'We develop travel platforms with secure payment integrations that support smooth transactions, multiple payment methods, and reliable checkout experiences for global travellers.',
        },
        {
          title: 'PMS & GDS Connectivity',
          body: 'Our travel solutions connect with Property Management Systems (PMS) and Global Distribution Systems (GDS) to synchronise availability, bookings, and travel inventory across platforms.',
        },
        {
          title: 'Multi-Currency & Global Support',
          body: 'We build travel software that supports multiple currencies, regional payment preferences, and international operations to serve customers across different markets.',
        },
        {
          title: 'Real-Time Data & API Integration',
          body: 'Our experts integrate real-time APIs for flights, hotels, transportation, and other travel services to provide accurate information and seamless user experiences.',
        },
      ],
      whyChooseTitle: 'Why Travel & Hospitality Teams Choose Cubixsol',
      whyChooseItems: [
        {
          title: 'Custom-Built Travel Platforms',
          desc: 'Tailored booking engines and hospitality software designed around your workflows, multi-channel distribution, and guest experience requirements.',
        },
        {
          title: 'Enhanced Customer Experiences',
          desc: 'Intuitive, high-speed mobile and web interfaces that simplify reservations, itineraries, and contactless guest services.',
        },
        {
          title: 'Strong Security Practices',
          desc: 'Robust data protection, PCI-DSS compliance, and zero-trust safeguards for guest records and payment transactions.',
        },
        {
          title: 'Advanced Automation Features',
          desc: 'Automated itinerary dispatch, dynamic rate adjustments, cancellation handling, and channel manager sync.',
        },
        {
          title: 'Modern Technology Approach',
          desc: 'Cloud-native architectures, real-time caching, and sub-second API connectors for high-traffic peak seasons.',
        },
        {
          title: 'Long-Term Partnership Support',
          desc: 'Continuous technical maintenance, GDS/OTA API version updates, and dedicated engineering support.',
        },
      ],
      ctaTitle: 'Ready to Build Your Travel Software Solution?',
      ctaDesc: 'Partner with Cubixsol, a trusted travel software development company, to create secure and scalable platforms that improve bookings, automate operations, and deliver better traveller experiences. Our team builds custom travel solutions designed around your business objectives.',
      faqs: [
        {
          q: 'How much does travel software development cost?',
          a: 'The cost of travel software development depends on platform complexity, features, integrations, design requirements, and scalability needs. A basic booking application requires a different investment compared to a complete travel management platform with multiple integrations and automation features.',
        },
        {
          q: 'How long does travel app development take?',
          a: 'The development timeline depends on the scope, technology stack, and number of features involved. A focused travel application may require several weeks, while a complete platform with advanced booking systems, integrations, and custom workflows may require additional development time.',
        },
        {
          q: 'Can travel software integrate with existing booking systems and APIs?',
          a: 'Yes, custom travel solutions can connect with third-party APIs, payment gateways, airline systems, hotel platforms, CRM tools, and other business systems. These integrations allow travel companies to manage services efficiently through connected digital platforms.',
        },
        {
          q: 'Can custom travel platforms support business growth?',
          a: 'Yes, scalable travel software can support increasing users, transactions, and service expansion. We develop flexible architectures that allow businesses to add new features, integrations, and services as their requirements evolve.',
        },
        {
          q: 'What features should a travel booking system include?',
          a: 'A modern travel booking system can include search and filtering, real-time availability, online payments, booking management, customer profiles, notifications, reviews, and third-party integrations. The required features depend on the business model and customer journey.',
        },
      ],
      seo: {
        metaTitle: 'Travel Software Development Company | Cubixsol',
        metaDescription: 'Cubixsol is a travel software development company building booking platforms, mobile apps, and hospitality solutions.',
        keywords: 'travel software development, travel booking platform, travel app development, hospitality software',
      },
    };

    // Update or insert into MongoDB
    const res = await Industry.findOneAndUpdate(
      { slug: 'travel' },
      { $set: travelData },
      { upsert: true, new: true }
    );
    console.log('✓ Industry "travel" updated in MongoDB successfully:', res.title);

    await mongoose.disconnect();
    console.log('Done.');
  } catch (err) {
    console.error('Error updating travel content:', err);
    process.exit(1);
  }
}

updateTravelContent();
