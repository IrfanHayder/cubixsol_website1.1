const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Industry = require('./models/Industry');

async function updateRealEstateContent() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('Connected.');

    const realEstateData = {
      heroTitle: 'Real Estate Software Development',
      title: 'Real Estate',
      slug: 'real-estate',
      icon: 'Building2',
      short: 'Cubixsol delivers real estate software development solutions that simplify property listings, sales, leasing, payments, and portfolio management through one connected platform.',
      desc: 'Cubixsol delivers **real estate software development** solutions that simplify property listings, sales, leasing, payments, and portfolio management through one connected platform. Our custom software supports real estate companies, agencies, property managers, and property owners with practical tools built around their workflows.',
      points: [
        'Real Estate Domain Expertise',
        'Secure Software Architecture',
        'Scalable Technology Architecture',
        'Transparent Project Delivery',
        'Seamless Third-Party Integrations',
        'Reliable Post-Launch Support',
      ],
      solutionsTitle: 'Real Estate Software We Build',
      solutionsSubtitle: 'Our real estate software development services build solutions that connect real estate businesses with buyers, sellers, tenants, agents, and property owners.',
      solutionsItems: [
        {
          title: 'Property Listing & Portal Software',
          body: `Property platforms give buyers and tenants a simple way to discover properties, compare options, and contact agents.

- **Listing platforms** let agents publish property details, photos, pricing, availability, and location information.
- **Property portals** connect buyers, sellers, landlords, tenants, and agents through searchable property marketplaces.
- **Property search features** let users filter listings by location, price, property type, size, amenities, and availability.`,
        },
        {
          title: 'Real Estate CRM & Management Software',
          body: `Real estate CRM and management systems organise customer relationships alongside property operations.

- **Real estate CRM software** helps agents track leads, client interactions, follow-ups, deals, and sales pipelines.
- **Property management software** supports rent collection, lease records, tenant communication, maintenance requests, and property records.
- **Administrative dashboards** give teams centralized access to clients, properties, transactions, tasks, and performance data.`,
        },
        {
          title: 'Real Estate App Development',
          body: `Our **real estate app development services** create mobile experiences to support property discovery, communication, transactions, and account management.

- **Property apps** let users browse listings, save properties, schedule visits, and contact agents from mobile devices.
- **Agent apps** provide tools for managing leads, appointments, listings, client communication, and property updates.
- **Owner and tenant apps** support rent payments, maintenance requests, lease information, notifications, and property communication.`,
        },
      ],
      workAreasTitle: 'Use Cases & Examples',
      workAreasIntro: 'Real estate businesses use custom software to manage property transactions, customer relationships, and rental operations.',
      workAreas: [
        {
          title: 'Property Marketplace Platform',
          body: 'A property marketplace connects buyers and tenants with property owners and agents through a searchable digital platform. Users can discover properties, compare listings, contact sellers, and schedule property visits from one place.',
        },
        {
          title: 'Real Estate Agent CRM',
          body: 'A real estate CRM gives agencies a centralised system for managing leads, clients, properties, and sales activities. Agents can track prospects from their first inquiry through property viewings, negotiations, and completed transactions.',
        },
        {
          title: 'Rental Management Software',
          body: 'A rental management app connects property owners, managers, and tenants through a single platform for daily rental operations. The solution simplifies rent collection, lease administration, maintenance requests, and tenant communication.',
        },
      ],
      techTitle: 'Technology Stack for Real Estate Software',
      techIntro: 'Our technology stack supports secure, scalable, and responsive real estate platforms across web and mobile devices. We selects technologies based on your product requirements, integrations, performance goals, and long-term growth.',
      techItems: [
        {
          title: 'React for Real Estate Web Applications',
          desc: 'React supports responsive interfaces for property portals, listing platforms, dashboards, and customer-facing web applications. Its component-based architecture allows teams to create consistent interfaces across complex real estate platforms.',
        },
        {
          title: 'Node.js for Backend Development',
          desc: 'Node.js provides a scalable backend for real estate platforms that manage users, listings, transactions, communications, and property data. Its event-driven architecture supports real-time features such as notifications, chat, and property updates.',
        },
        {
          title: 'Maps APIs for Property Location Features',
          desc: 'Maps APIs add location-based features to property platforms and mobile applications. Users can search properties by location, view listings on interactive maps, calculate distances, and explore nearby amenities.',
        },
        {
          title: 'Flutter for Real Estate Mobile Apps',
          desc: 'Flutter enables development of cross-platform real estate mobile applications from a shared codebase. Businesses can launch apps for Android and iOS with consistent interfaces and core functionality.',
        },
      ],
      whyChooseTitle: 'Why Real Estate Teams Choose Cubixsol',
      whyChooseItems: [
        {
          title: 'Real Estate Domain Expertise',
          desc: 'Deep industry experience building specialized platforms for property developers, brokerages, and managers.',
        },
        {
          title: 'Secure Software Architecture',
          desc: 'Enterprise-grade encryption, secure user authentication, and data privacy protecting every real estate deal.',
        },
        {
          title: 'Scalable Technology Architecture',
          desc: 'Cloud-native infrastructure designed to handle millions of listings, concurrent searches, and image media.',
        },
        {
          title: 'Transparent Project Delivery',
          desc: 'Agile sprints, milestone demos, clear timelines, and dedicated engineering pods for predictable delivery.',
        },
        {
          title: 'Seamless Third-Party Integrations',
          desc: 'Direct integration with MLS/IDX feeds, Maps APIs, payment processors, and property management systems.',
        },
        {
          title: 'Reliable Post-Launch Support',
          desc: 'Continuous monitoring, routine security patches, performance tuning, and ongoing feature enhancements.',
        },
      ],
      ctaTitle: 'Ready to Build Real Estate Software?',
      ctaDesc: 'Turn your property workflows into a secure, scalable digital platform with **real estate software development** from Cubixsol. Share your requirements with our team to discuss the right technology, features, integrations, and development approach for your project.',
      faqs: [
        {
          q: 'How Much Does Real Estate Software Development Cost?',
          a: 'The cost depends on your software type, feature set, integrations, design requirements, and platform choice. A basic property platform may require less investment than a large marketplace with CRM, payment, MLS, and management features. We can provide a project estimate after reviewing your requirements.',
        },
        {
          q: 'How Long Does It Take to Build Real Estate Software?',
          a: 'A real estate software project can take several weeks to several months, depending on its scope and complexity. A simple application may require less development time, while a feature-rich platform needs more time for integrations, testing, and deployment. We define milestones and timelines based on your project requirements.',
        },
        {
          q: 'Can You Integrate MLS With Real Estate Software?',
          a: 'Yes, we can integrate MLS data into real estate platforms through available MLS APIs and approved data access methods. MLS integration can support property listings, search, updates, and other relevant property information. Integration requirements depend on the MLS provider and the access rules that apply to your market.',
        },
        {
          q: 'Can You Build a Mobile Real Estate App?',
          a: 'Yes, we provide **real estate app development services** for businesses that need mobile applications on Android, iOS, or both platforms. Mobile apps can include property search, listings, user accounts, notifications, appointments, payments, and communication features. Flutter can support cross-platform development from a shared codebase.',
        },
        {
          q: 'Do You Provide Maintenance for Real Estate Software?',
          a: 'Yes, we provide post-launch maintenance and technical support for real estate software.',
        },
      ],
    };

    // Upsert Industry record
    const updated = await Industry.findOneAndUpdate(
      { slug: 'real-estate' },
      { $set: realEstateData },
      { upsert: true, new: true }
    );
    console.log('✓ Industry "real-estate" updated successfully in MongoDB:', updated.slug);

    await mongoose.disconnect();
    console.log('Done.');
  } catch (err) {
    console.error('Error updating real-estate content:', err);
    process.exit(1);
  }
}

updateRealEstateContent();
