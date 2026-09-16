const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Service = require('./models/Service');
const PageContent = require('./models/PageContent');

async function seedPms() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB.');

    const pmsServiceData = {
      slug: 'pms-integration',
      title: 'Property Management Systems Integration',
      cardTitle: 'PMS Integration',
      menuTitle: 'PMS Integration',
      icon: 'Building2',
      color: 'text-sky-600 bg-sky-50',
      gradient: 'from-sky-500 to-blue-600',
      heroImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&h=800&q=75',
      desc: "Property Management Systems are software programs that enable landlords and property managers to optimize and manage their properties' regular tasks. PMSs work with CMS software to give an extensive range of features and capabilities for managing and tracking rental contracts, landlord information, repair requests, finances, and others. PMS rentals streamline everything from guest check-in to financial tracking, providing a centralized system that boosts operational efficiency.",
      longDesc: "Property management systems (PMS) control all property elements, including tenants' onboarding process, rent collection, upkeep arrangements, and monitoring. They can also provide analytics and reports that will assist homeowners and managers in making smart choices about the properties they own.",
      ctaPrimaryText: 'Get API Developers',
      ctaSecondaryText: 'Get a Proposal',
      features: [
        '1K+ Clients around the world',
        '30+ Award Winning Integrations',
        '97% Business Growth Rate',
        '60+ Expert Team Members',
      ],
      whyChooseTitle: 'Why Choose Cubixsol For PMS Integration',
      whyChooseIntro: 'Proven integration engineering backed by global delivery, deep API expertise, and high-uptime connectivity.',
      whyChooseItems: [
        {
          title: '1K+ Clients Worldwide',
          desc: 'Trusted by vacation rental managers, boutique hotels, and global property portfolios.',
        },
        {
          title: '30+ Industry Awards',
          desc: 'Recognized for high-speed API aggregation and robust PMS sync architectures.',
        },
        {
          title: '97% Business Growth',
          desc: 'Clients experience significant uplift in direct bookings, automated guest workflows, and lower operational overhead.',
        },
        {
          title: '60+ Senior Engineers',
          desc: 'Specialized API developers experienced across all major PMS platforms and channel managers.',
        },
      ],
      serviceProcessTitle: 'Organized Strategy For PMS Integration',
      serviceProcessIntro: 'Our structured 5-phase execution ensures safe data migrations, minimal disruption to active reservations, and reliable go-live delivery.',
      serviceProcessSteps: [
        {
          stepNumber: '01',
          title: 'Consultation',
          desc: 'This phase allows experts to define the optimum PMS integration solutions for your needs. For a smooth integration, our professionals will handle any technological or safety issues that may arise.',
        },
        {
          stepNumber: '02',
          title: 'Planning',
          desc: "In the planning phase, we create a comprehensive integration plan based on your requirements. It entails defining the task's scope, selecting suitable PMSs rental, and developing timelines. We establish critical milestones to maintain consistency with your business operations and system development.",
        },
        {
          stepNumber: '03',
          title: 'Implementation',
          desc: 'When the plan of action is approved, we start the integration process. Our expertise will integrate your present systems with the suitable PMS rentals, ensuring that data transfers safely and quickly. We manage all of the back work, allowing your business activities to continue uninterrupted.',
        },
        {
          stepNumber: '04',
          title: 'Testing',
          desc: 'Before moving live, we thoroughly test the integration to ensure that everything functions properly. This includes tests for operation, optimization of performance, and safety inspections to guarantee that the PMS operates as intended.',
        },
        {
          stepNumber: '05',
          title: 'Deployment',
          desc: 'After successful testing, we will begin integrating the PMS rental into your existing system. Once tested, we deploy the system into your live environment. Every module is fully functional, from the key management system for property management to payment and booking synchronization.',
        },
      ],
      subServicesTitle: 'Our PMS Integration Services',
      subServicesIntro: "Many options stand out if you're looking for complete property management software to help you optimize the vacation rental business. Industry leaders like Guesty, Hostaway, Hostfully, Zeevou, Smoobu, Lodgify, OwnerRez, Rentals United, Tokeet, Uplisting, Cloudbeds, and Opera provide comprehensive solutions for booking, guest communication, payment processing, keyless access, and smooth multi-property monitoring.",
      subServicesItems: [
        {
          title: 'Booking engine / Channel Manager',
          desc: 'Channel executives assist hotels in managing their online distribution by connecting them to various online platforms and their online booking sites. Hotels can use a channel manager to modify inventory and rates throughout the PMS integrations system. Connecting your PMS systems with channel manager and PMS integration solutions saves valuable time by providing central control over stock, pricing, and bookings.',
        },
        {
          title: 'Room Access / Keyless Access Solution',
          desc: 'Keyless entry systems with our key management system for property management allow visitors to open their hotel entrances without using a genuine key. Rather, visitors enter an authorization code or mobile key from their smartphone. Connecting your PMS to access-to-space solutions like smart keycards simplifies check-in and access control significantly, eliminating manual front-desk keycard encoding.',
        },
        {
          title: 'Revenue Management System',
          desc: 'A revenue management system forecasts traveler habits and demand by using previous information, market trends, and live indicators. With this information, hotels determine the best price for rooms to maximize profits. Two-way connectivity between your PMS and revenue management software enables precise forecasting, dynamic nightly rate adjustments, and real-time inventory pricing optimization.',
        },
        {
          title: 'Payment Processing Network',
          desc: 'A payment processing network enables hotels and property managers to take credit card payments smoothly. Linking your PMS with a secure payment gateway makes bookings and departures at the reception desk seamless. After guests enter payment information, transactions are transmitted to the payment handling network and invoices in the PMS are promptly updated in real time.',
        },
        {
          title: 'POS System Integration',
          desc: 'Point-of-sale (POS) systems allow hotel and resort staff to handle reservations for rooms or collect transactions for onsite amenities like restaurants, bars, and spas. By connecting your PMS and POS systems, amenity expenses can be charged to guest room folios automatically, decreasing human error and streamlining guest checkout.',
        },
        {
          title: 'Guest Review Plug-In',
          desc: 'Guest Review Plug-In services provide an easy way to collect, organize, and display feedback from guests directly on property management systems (PMS). The system enables hotel businesses to track and present guest experiences, improving online reputation and attracting new guests with real-time feedback synchronization across booking channels.',
        },
      ],
      tech: ['Guesty API', 'Hostaway', 'Opera PMS', 'Cloudbeds', 'Stripe', 'Node.js', 'Webhooks', 'REST APIs'],
      techTitle: 'Supported Property Management Platforms & Ecosystem',
      techDesc: 'We build custom two-way APIs and webhooks for all top-tier PMS and vacation rental platforms including Guesty, Hostaway, Hostfully, Zeevou, Smoobu, Newbook, Hostify, Jurny, Lodgify, OwnerRez, Rentals United, Tokeet, Uplisting, Cloudbeds, Opera PMS, and Mews.',
      supportedPlatforms: [
        { name: 'Guesty', category: 'Enterprise PMS', icon: 'Hotel' },
        { name: 'Hostaway', category: 'Vacation Rental PMS', icon: 'Home' },
        { name: 'Hostfully', category: 'Hospitality Platform', icon: 'Compass' },
        { name: 'Zeevou', category: 'Direct Booking PMS', icon: 'Sparkles' },
        { name: 'Smoobu', category: 'Channel Manager PMS', icon: 'RefreshCw' },
        { name: 'Newbook', category: 'Hotel & Park PMS', icon: 'BookOpen' },
        { name: 'Hostify', category: 'All-in-One PMS', icon: 'Server' },
        { name: 'Jurny', category: 'AI Hospitality PMS', icon: 'Bot' },
        { name: 'Lodgify', category: 'Short-Term Rental PMS', icon: 'Globe' },
        { name: 'OwnerRez', category: 'Direct Channel PMS', icon: 'KeyRound' },
        { name: 'Rentals United', category: 'Global OTA Hub', icon: 'Network' },
        { name: 'Tokeet', category: 'Multi-Calendar PMS', icon: 'CalendarCheck' },
        { name: 'Uplisting', category: 'Automated PMS', icon: 'TrendingUp' },
        { name: 'Cloudbeds', category: 'Hotel Management System', icon: 'Cloud' },
        { name: 'Opera PMS', category: 'Oracle Hospitality', icon: 'Database' },
        { name: 'Mews', category: 'Cloud Hotel PMS', icon: 'Boxes' },
      ],
      faqs: [
        {
          q: 'What is a PMS integration, and why is it important?',
          a: 'A Property Management System (PMS) integration connects your PMS with other software solutions like payment gateways, booking engines, and keyless entry systems. This integration centralizes operations, reduces manual work, ensures accurate data flow between systems, and improves efficiency – helping you manage bookings, payments, guest access, and more from one platform.',
        },
        {
          q: 'How does PMS integration work?',
          a: 'PMS integration works by seamlessly exchanging and updating data between your PMS and connected systems. For example, when a booking is made through an online travel agent, the information flows directly into your PMS, which then updates availability and rates across all platforms automatically – eliminating the need for manual updates and minimizing errors.',
        },
        {
          q: 'Which systems can Cubixsol integrate with my PMS?',
          a: 'Cubixsol can integrate your PMS with a wide range of solutions, including:\n\n• Booking engines & channel managers\n• Keyless room access systems\n• Revenue management software\n• Payment processing networks\n• POS systems\n• Guest review plug-ins\n\nThis ensures that all aspects of your property – from reservations to guest feedback – are efficiently managed.',
        },
      ],
      seo: {
        metaTitle: 'Property Management Systems (PMS) Integration Services | Cubixsol',
        metaDescription: 'Expert PMS integration services for Guesty, Hostaway, Cloudbeds, Opera, and custom channel managers, keyless access, and payment workflows.',
        keywords: 'PMS integration, property management systems, guesty integration, hostaway api, channel manager sync, keyless access pms',
      },
    };

    // Upsert into Service collection
    const updatedService = await Service.findOneAndUpdate(
      { slug: 'pms-integration' },
      { $set: pmsServiceData },
      { upsert: true, new: true }
    );
    console.log('✓ Service "pms-integration" updated in MongoDB successfully:', updatedService.title);

    // Upsert into PageContent collection
    await PageContent.findOneAndUpdate(
      { slug: 'pms-integration' },
      {
        $set: {
          slug: 'pms-integration',
          title: 'Property Management Systems Integration',
          heroTitle: 'Property Management Systems Integration',
          heroDesc: pmsServiceData.desc,
          content: pmsServiceData.longDesc,
        },
      },
      { upsert: true }
    );
    console.log('✓ PageContent "pms-integration" updated in MongoDB successfully.');

    await mongoose.disconnect();
    console.log('Done.');
  } catch (err) {
    console.error('Error seeding PMS integration:', err);
    process.exit(1);
  }
}

seedPms();
