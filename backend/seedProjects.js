/**
 * STANDALONE PRODUCTION SEED SCRIPT FOR ALL 49 PROJECTS
 * 
 * Usage:
 *   node seedProjects.js
 *   OR with a specific MongoDB URI:
 *   node seedProjects.js "mongodb+srv://username:password@cluster.mongodb.net/cubixsol"
 */

const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {}

const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Project = require('./models/Project');

const projectsData = [
  // ==========================================
  // Web Development (36 projects)
  // ==========================================
  {
    title: 'Holiday Lovers',
    url: 'https://holidaylovers.com',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'Holiday Lovers',
    industry: 'Vacation Rentals & Hospitality',
    year: '2024',
    desc: 'Premium holiday rentals offering villas, townhouses, and apartments for memorable stays in Comporta and Tróia.',
    description: 'Premium holiday rentals offering villas, townhouses, and apartments for memorable stays in Comporta and Tróia.',
    color: 'from-sky-500 to-blue-700',
  },
  {
    title: 'Vargas Vacation Ventures',
    url: 'https://vargasvacationventures.com',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'Vargas Vacation Ventures',
    industry: 'Family Vacation Rentals',
    year: '2024',
    desc: 'Family-focused vacation rentals offering spacious, comfortable homes and personalized guest experiences.',
    description: 'Family-focused vacation rentals offering spacious, comfortable homes and personalized guest experiences.',
    color: 'from-emerald-500 to-teal-700',
  },
  {
    title: 'Trawelltopia',
    url: 'https://trawelltopia.com',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'Trawelltopia',
    industry: 'Luxury Villas & Stays',
    year: '2024',
    desc: 'Premium villas in Croatia offering comfortable stays, direct booking, and personalized holiday support.',
    description: 'Premium villas in Croatia offering comfortable stays, direct booking, and personalized holiday support.',
    color: 'from-indigo-600 to-purple-700',
  },
  {
    title: 'Wellcome',
    url: 'https://wellcome.com.co',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'Wellcome',
    industry: 'Hospitality & Managed Stays',
    year: '2024',
    desc: 'Accommodation and hospitality services connecting travelers with professionally managed stays.',
    description: 'Accommodation and hospitality services connecting travelers with professionally managed stays.',
    color: 'from-rose-500 to-pink-600',
  },
  {
    title: 'Clark Anderson Properties',
    url: 'https://clarkandersonproperties.co.uk',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'Clark Anderson Properties',
    industry: 'Holiday Home Property Management',
    year: '2024',
    desc: 'Professionally managed holiday homes and accommodation across the UK, with direct booking and property management services.',
    description: 'Professionally managed holiday homes and accommodation across the UK, with direct booking and property management services.',
    color: 'from-teal-500 to-emerald-600',
  },
  {
    title: 'Elite Escapes',
    url: 'https://eliteescapes.travel',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'Elite Escapes',
    industry: 'Luxury Vacation Rentals',
    year: '2024',
    desc: 'Luxury vacation rentals offering premium properties and professionally managed holiday experiences.',
    description: 'Luxury vacation rentals offering premium properties and professionally managed holiday experiences.',
    color: 'from-blue-600 to-cyan-600',
  },
  {
    title: 'Huntington Beach Vacation Home',
    url: 'https://huntingtonbeachvacationhome.com',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'Huntington Beach Vacation Home',
    industry: 'Coastal Luxury Vacation Homes',
    year: '2024',
    desc: 'Luxury vacation homes near Huntington Beach, offering spacious stays with premium amenities.',
    description: 'Luxury vacation homes near Huntington Beach, offering spacious stays with premium amenities.',
    color: 'from-amber-500 to-orange-600',
  },
  {
    title: 'GoTo Poconos',
    url: 'https://gotopoconos.com',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'GoTo Poconos',
    industry: 'Vacation Rentals & Travel',
    year: '2024',
    desc: 'Vacation rentals in the Pocono Mountains offering comfortable stays for families and groups.',
    description: 'Vacation rentals in the Pocono Mountains offering comfortable stays for families and groups.',
    color: 'from-emerald-600 to-teal-800',
  },
  {
    title: 'Mod Retreats',
    url: 'https://modretreats.com',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'Mod Retreats',
    industry: 'Modern Vacation Homes',
    year: '2024',
    desc: 'Professionally managed vacation homes combining modern design, comfort, and convenient stays.',
    description: 'Professionally managed vacation homes combining modern design, comfort, and convenient stays.',
    color: 'from-violet-600 to-indigo-800',
  },
  {
    title: 'Your Family’s Place',
    url: 'https://yourfamilysplace.com',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'Your Family’s Place',
    industry: 'Family Vacation Rentals',
    year: '2024',
    desc: 'Family-friendly vacation rentals in Ohio offering spacious homes designed for multi-generational stays.',
    description: 'Family-friendly vacation rentals in Ohio offering spacious homes designed for multi-generational stays.',
    color: 'from-amber-600 to-orange-700',
  },
  {
    title: 'Madame Soussou',
    url: 'https://madame-soussou.co.uk',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'Madame Soussou',
    industry: 'Short-Term Stays & Accommodation',
    year: '2024',
    desc: 'Holiday accommodation offering carefully selected properties for comfortable short-term stays.',
    description: 'Holiday accommodation offering carefully selected properties for comfortable short-term stays.',
    color: 'from-pink-500 to-rose-700',
  },
  {
    title: 'Skyvillion',
    url: 'https://skyvillion.com',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'Skyvillion',
    industry: 'Serviced Apartments & Stays',
    year: '2024',
    desc: 'Serviced apartments and short-term accommodation offering comfortable stays and convenient locations.',
    description: 'Serviced apartments and short-term accommodation offering comfortable stays and convenient locations.',
    color: 'from-sky-600 to-blue-800',
  },
  {
    title: 'Stay Dunfermline',
    url: 'https://staydunfermline.com',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'Stay Dunfermline',
    industry: 'Serviced Apartments & Leisure',
    year: '2024',
    desc: 'Luxury self-catering serviced apartments in Dunfermline for leisure, business, and extended stays.',
    description: 'Luxury self-catering serviced apartments in Dunfermline for leisure, business, and extended stays.',
    color: 'from-indigo-700 to-purple-900',
  },
  {
    title: 'Yorkshire Coast Holiday Lets',
    url: 'https://yorkshirecoastholidaylets.co.uk',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'Yorkshire Coast Holiday Lets',
    industry: 'Coastal Holiday Accommodation',
    year: '2024',
    desc: 'Holiday rentals along the Yorkshire Coast offering comfortable stays for coastal breaks and family holidays.',
    description: 'Holiday rentals along the Yorkshire Coast offering comfortable stays for coastal breaks and family holidays.',
    color: 'from-teal-600 to-cyan-800',
  },
  {
    title: 'Hidden England Escapes',
    url: 'https://hiddenenglandescapes.com',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'Hidden England Escapes',
    industry: 'Unique Stays & Escapes',
    year: '2024',
    desc: 'Unique holiday accommodation offering distinctive stays and relaxing escapes across England.',
    description: 'Unique holiday accommodation offering distinctive stays and relaxing escapes across England.',
    color: 'from-emerald-700 to-green-900',
  },
  {
    title: 'The Good Butler',
    url: 'https://thegoodbutler.com',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'The Good Butler',
    industry: 'Hospitality & Guest Service',
    year: '2024',
    desc: 'Professionally managed holiday accommodation focused on quality stays and personalized guest service.',
    description: 'Professionally managed holiday accommodation focused on quality stays and personalized guest service.',
    color: 'from-amber-500 to-yellow-700',
  },
  {
    title: 'Simply Tarifa',
    url: 'https://simplytarifa.com',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'Simply Tarifa',
    industry: 'Beach & Holiday Rentals',
    year: '2024',
    desc: 'Holiday accommodation in Tarifa offering comfortable stays near beaches, attractions, and local experiences.',
    description: 'Holiday accommodation in Tarifa offering comfortable stays near beaches, attractions, and local experiences.',
    color: 'from-cyan-500 to-blue-700',
  },
  {
    title: 'The Mitchell Bondi',
    url: 'https://themitchellbondi.com.au',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'The Mitchell Bondi',
    industry: 'Beachside Accommodation',
    year: '2024',
    desc: 'Comfortable accommodation in Bondi, Sydney, offering convenient stays near the beach and local attractions.',
    description: 'Comfortable accommodation in Bondi, Sydney, offering convenient stays near the beach and local attractions.',
    color: 'from-blue-500 to-indigo-700',
  },
  {
    title: 'Stay Gateway',
    url: 'https://staygateway.com',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'Stay Gateway',
    industry: 'Short-Term Vacation Rentals',
    year: '2024',
    desc: 'Short-term accommodation and vacation rentals providing convenient and comfortable stays for travelers.',
    description: 'Short-term accommodation and vacation rentals providing convenient and comfortable stays for travelers.',
    color: 'from-purple-600 to-pink-700',
  },
  {
    title: 'Live Stay',
    url: 'https://livestay.co.uk',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'Live Stay',
    industry: 'Serviced Accommodation',
    year: '2024',
    desc: 'Short-term and serviced accommodation providing comfortable stays for leisure and business travelers.',
    description: 'Short-term and serviced accommodation providing comfortable stays for leisure and business travelers.',
    color: 'from-slate-700 to-zinc-900',
  },
  {
    title: 'Homestead Modern',
    url: 'https://homesteadmodern.com',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'Homestead Modern',
    industry: 'Distinctive Vacation Homes',
    year: '2024',
    desc: 'Modern vacation homes combining distinctive design, comfort, and memorable guest experiences.',
    description: 'Modern vacation homes combining distinctive design, comfort, and memorable guest experiences.',
    color: 'from-amber-700 to-stone-900',
  },
  {
    title: 'Luxury Property',
    url: 'https://luxuryproperty.com',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'Luxury Property',
    industry: 'Global Luxury Real Estate',
    year: '2024',
    desc: 'Global luxury real estate platform showcasing premium properties and exclusive destinations.',
    description: 'Global luxury real estate platform showcasing premium properties and exclusive destinations.',
    color: 'from-yellow-600 to-amber-800',
  },
  {
    title: 'Hvar Away',
    url: 'https://hvaraway.com',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'Hvar Away',
    industry: 'Island Villas & Holiday Stays',
    year: '2024',
    desc: 'Holiday accommodation in Hvar offering villas and properties for relaxing island stays.',
    description: 'Holiday accommodation in Hvar offering villas and properties for relaxing island stays.',
    color: 'from-teal-500 to-blue-700',
  },
  {
    title: 'Manzil',
    url: 'https://manzil.life',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'Manzil',
    industry: 'Curated Hospitality Experiences',
    year: '2024',
    desc: 'Curated hospitality and accommodation experiences offering comfortable stays in selected destinations.',
    description: 'Curated hospitality and accommodation experiences offering comfortable stays in selected destinations.',
    color: 'from-orange-500 to-rose-700',
  },
  {
    title: 'Burj Al Arab Jumeirah',
    url: 'https://jumeirah.com',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'Burj Al Arab Jumeirah',
    industry: 'Iconic Luxury Hospitality',
    year: '2024',
    desc: 'Iconic Dubai luxury hotel offering exceptional suites, fine dining, personalized service, and premium hospitality.',
    description: 'Iconic Dubai luxury hotel offering exceptional suites, fine dining, personalized service, and premium hospitality.',
    color: 'from-amber-600 to-yellow-800',
  },
  {
    title: 'Brighton Holiday Lets',
    url: 'https://brightonholidaylets.com',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'Brighton Holiday Lets',
    industry: 'Holiday Accommodation & Bookings',
    year: '2024',
    desc: 'Holiday accommodation in Brighton offering property listings and online booking options for travelers.',
    description: 'Holiday accommodation in Brighton offering property listings and online booking options for travelers.',
    color: 'from-amber-500 to-rose-600',
  },
  {
    title: 'Mt Buller Apartment Rentals',
    url: 'https://mtbuller.com.au',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'Mt Buller Apartment Rentals',
    industry: 'Alpine Holiday Accommodation',
    year: '2024',
    desc: 'Holiday apartment accommodation in the Mt Buller alpine region, helping visitors explore lodging options and plan their stays.',
    description: 'Holiday apartment accommodation in the Mt Buller alpine region, helping visitors explore lodging options and plan their stays.',
    color: 'from-indigo-600 to-cyan-700',
  },
  {
    title: 'Sydney Dreams',
    url: 'https://sydneydreams.com.au',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'Sydney Dreams',
    industry: 'Vacation Rental & Hospitality',
    year: '2024',
    desc: 'Professional vacation rental website showcasing holiday properties with detailed accommodation information and an integrated booking experience.',
    description: 'Professional vacation rental website showcasing holiday properties with detailed accommodation information and an integrated booking experience.',
    color: 'from-sky-500 to-blue-700',
  },
  {
    title: 'ADLIV',
    url: 'https://adliv.co.uk',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'ADLIV',
    industry: 'Serviced Apartments & Rentals',
    year: '2024',
    desc: 'Modern short-term accommodation website showcasing serviced apartments and rental properties with detailed information, amenities, locations, and booking functionality.',
    description: 'Modern short-term accommodation website showcasing serviced apartments and rental properties with detailed information, amenities, locations, and booking functionality.',
    color: 'from-indigo-600 to-purple-700',
  },
  {
    title: 'Stay Seekers',
    url: 'https://stayseekers.co.uk',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'Stay Seekers',
    industry: 'Holiday Rentals & Accommodation',
    year: '2024',
    desc: 'Holiday rental website featuring accommodation options with easy property discovery, detailed listings, availability, and a smooth booking journey.',
    description: 'Holiday rental website featuring accommodation options with easy property discovery, detailed listings, availability, and a smooth booking journey.',
    color: 'from-rose-500 to-pink-600',
  },
  {
    title: 'Sage Vacations',
    url: 'https://sagevacations.net',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'Sage Vacations',
    industry: 'Vacation Rentals & Stays',
    year: '2024',
    desc: 'Professional vacation rental website showcasing holiday homes with property details, amenities, locations, and convenient reservation options.',
    description: 'Professional vacation rental website showcasing holiday homes with property details, amenities, locations, and convenient reservation options.',
    color: 'from-teal-500 to-emerald-600',
  },
  {
    title: 'Open Air Homes',
    url: 'https://openairhomes.com',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'Open Air Homes',
    industry: 'Vacation Rental & Property Management',
    year: '2024',
    desc: 'Vacation rental and property management platform focused on professionally managed homes and direct bookings.',
    description: 'Vacation rental and property management platform focused on professionally managed homes and direct bookings.',
    color: 'from-blue-600 to-cyan-600',
  },
  {
    title: 'Guest Cottage',
    url: 'https://guestcottage.com',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'Guest Cottage',
    industry: 'Holiday & Extended Stays',
    year: '2024',
    desc: 'Vacation rental website featuring holiday properties for short and extended stays, with detailed listings and integrated booking functionality.',
    description: 'Vacation rental website featuring holiday properties for short and extended stays, with detailed listings and integrated booking functionality.',
    color: 'from-amber-500 to-orange-600',
  },
  {
    title: 'Cur8 Residences',
    url: 'https://cur8residences.com',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'Cur8 Residences',
    industry: 'Premium Accommodation & Booking',
    year: '2024',
    desc: 'Modern property rental platform showcasing premium accommodation with detailed listings, property discovery, and reservation functionality.',
    description: 'Modern property rental platform showcasing premium accommodation with detailed listings, property discovery, and reservation functionality.',
    color: 'from-violet-600 to-indigo-800',
  },
  {
    title: 'Mountain Cabins',
    url: 'https://mountaincab.wpenginepowered.com',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'Mountain Cabins',
    industry: 'Cabin & Holiday Accommodation',
    year: '2024',
    desc: 'Vacation rental website focused on cabin and holiday accommodation, with property information and booking options.',
    description: 'Vacation rental website focused on cabin and holiday accommodation, with property information and booking options.',
    color: 'from-emerald-700 to-stone-800',
  },
  {
    title: 'Ocean City Retreats',
    url: 'https://oceancityretreats.co.uk',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'Ocean City Retreats',
    industry: 'Coastal Holiday Accommodation',
    year: '2024',
    desc: 'UK-based holiday accommodation website featuring vacation properties with detailed listings and an integrated booking process.',
    description: 'UK-based holiday accommodation website featuring vacation properties with detailed listings and an integrated booking process.',
    color: 'from-cyan-600 to-blue-800',
  },

  // ==========================================
  // E-Commerce (9 projects)
  // ==========================================
  {
    title: 'Lora Gene',
    url: 'https://loragene.com',
    category: 'E-Commerce',
    tag: 'E-Commerce',
    client: 'Lora Gene',
    industry: 'Sustainable Fashion & Apparel',
    year: '2024',
    desc: 'Sustainable fashion and lifestyle e-commerce platform offering contemporary clothing and curated collections.',
    description: 'Sustainable fashion and lifestyle e-commerce platform offering contemporary clothing and curated collections.',
    color: 'from-emerald-600 to-green-700',
  },
  {
    title: 'Liverpool FC Store',
    url: 'https://store.liverpoolfc.com',
    category: 'E-Commerce',
    tag: 'E-Commerce',
    client: 'Liverpool FC',
    industry: 'Sports Merchandise & Apparel',
    year: '2024',
    desc: 'Official Liverpool FC online store offering authentic club merchandise, kits, clothing, accessories, and fan products.',
    description: 'Official Liverpool FC online store offering authentic club merchandise, kits, clothing, accessories, and fan products.',
    color: 'from-red-600 to-rose-700',
  },
  {
    title: 'Barbour',
    url: 'https://barbour.com',
    category: 'E-Commerce',
    tag: 'E-Commerce',
    client: 'Barbour',
    industry: 'Global Fashion & Lifestyle Heritage',
    year: '2024',
    desc: 'Global fashion and lifestyle e-commerce platform featuring heritage clothing, outerwear, footwear, and accessories.',
    description: 'Global fashion and lifestyle e-commerce platform featuring heritage clothing, outerwear, footwear, and accessories.',
    color: 'from-amber-700 to-stone-900',
  },
  {
    title: 'Fred Perry',
    url: 'https://fredperry.com',
    category: 'E-Commerce',
    tag: 'E-Commerce',
    client: 'Fred Perry',
    industry: 'International Fashion & Apparel',
    year: '2024',
    desc: 'International fashion e-commerce platform offering clothing, footwear, and accessories.',
    description: 'International fashion e-commerce platform offering clothing, footwear, and accessories.',
    color: 'from-slate-800 to-blue-950',
  },
  {
    title: 'Ossa Frames',
    url: 'https://ossaframes.com',
    category: 'E-Commerce',
    tag: 'E-Commerce',
    client: 'Ossa Frames',
    industry: 'Designer Eyewear & Optics',
    year: '2024',
    desc: 'Designer eyewear e-commerce platform offering sunglasses, eyeglasses, and premium frames.',
    description: 'Designer eyewear e-commerce platform offering sunglasses, eyeglasses, and premium frames.',
    color: 'from-cyan-600 to-blue-800',
  },
  {
    title: 'TheGuideliner',
    url: 'https://theguideliner.com',
    category: 'E-Commerce',
    tag: 'E-Commerce',
    client: 'TheGuideliner',
    industry: 'Beauty & Cosmetics D2C',
    year: '2024',
    desc: 'Beauty e-commerce brand focused on innovative eyeliner products and direct-to-consumer shopping.',
    description: 'Beauty e-commerce brand focused on innovative eyeliner products and direct-to-consumer shopping.',
    color: 'from-pink-600 to-purple-700',
  },
  {
    title: 'Zoe Boutique',
    url: 'https://zoeboutique.it',
    category: 'E-Commerce',
    tag: 'E-Commerce',
    client: 'Zoe Boutique',
    industry: 'Italian Fashion Boutique',
    year: '2024',
    desc: 'Italian fashion boutique offering curated collections through a modern online shopping experience.',
    description: 'Italian fashion boutique offering curated collections through a modern online shopping experience.',
    color: 'from-violet-600 to-indigo-900',
  },
  {
    title: 'Minni Nest',
    url: 'https://minninest.com',
    category: 'E-Commerce',
    tag: 'E-Commerce',
    client: 'Minni Nest',
    industry: 'Baby Products & Nursery Essentials',
    year: '2024',
    desc: 'Baby-products e-commerce brand offering baby nests, cots, baskets, and sleeping essentials.',
    description: 'Baby-products e-commerce brand offering baby nests, cots, baskets, and sleeping essentials.',
    color: 'from-sky-500 to-emerald-600',
  },
  {
    title: 'LORIS Parfum',
    url: 'https://lorisparfum.com',
    category: 'E-Commerce',
    tag: 'E-Commerce',
    client: 'LORIS Parfum',
    industry: 'Fragrances & Luxury Scents',
    year: '2024',
    desc: 'Fragrance e-commerce platform offering perfumes, personal-care products, room fragrances, and gift sets.',
    description: 'Fragrance e-commerce platform offering perfumes, personal-care products, room fragrances, and gift sets.',
    color: 'from-fuchsia-600 to-pink-800',
  },

  // ==========================================
  // SaaS (3 projects)
  // ==========================================
  {
    title: 'BnB Made Easy',
    url: 'https://bnbmadeeasy.com.au',
    category: 'SaaS',
    tag: 'SaaS',
    client: 'BnB Made Easy',
    industry: 'Property Management SaaS',
    year: '2024',
    desc: 'Short-term rental and property management services designed to simplify hosting and guest stays.',
    description: 'Short-term rental and property management services designed to simplify hosting and guest stays.',
    color: 'from-blue-600 to-indigo-800',
  },
  {
    title: 'EasyStay',
    url: 'https://easystay.io',
    category: 'SaaS',
    tag: 'SaaS',
    client: 'EasyStay',
    industry: 'Vacation Rental Solutions & SaaS',
    year: '2024',
    desc: 'Vacation rental solutions simplifying property management, bookings, and guest experiences.',
    description: 'Vacation rental solutions simplifying property management, bookings, and guest experiences.',
    color: 'from-emerald-600 to-teal-800',
  },
  {
    title: 'YouStay',
    url: 'https://youstay.co.za',
    category: 'SaaS',
    tag: 'SaaS',
    client: 'YouStay',
    industry: 'Property Management & Accommodation SaaS',
    year: '2024',
    desc: 'Property management and guest accommodation services helping property owners manage bookings, guest experiences, housekeeping, and property maintenance.',
    description: 'Property management and guest accommodation services helping property owners manage bookings, guest experiences, housekeeping, and property maintenance.',
    color: 'from-sky-600 to-cyan-800',
  },

  // ==========================================
  // Telecommunications / Other (1 project)
  // ==========================================
  {
    title: 'NuuTel',
    url: 'https://nuutel.com',
    category: 'Telecommunications',
    tag: 'Telecommunications',
    client: 'NuuTel Telecom',
    industry: 'Telecommunications & Broadband Solutions',
    year: '2024',
    desc: 'Telecommunications platform providing residential, SME, and enterprise broadband connectivity solutions.',
    description: 'Telecommunications platform providing residential, SME, and enterprise broadband connectivity solutions.',
    color: 'from-blue-600 to-cyan-700',
  }
];

async function seedProjects(customUri) {
  const startTime = Date.now();
  try {
    const mongoUri = customUri || process.argv[2] || process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    const safeUri = mongoUri.includes('@') ? 'mongodb+srv://****:****@' + mongoUri.split('@')[1] : mongoUri;
    
    console.log('====================================================');
    console.log('🚀 SEEDING 49 CATEGORIZED PROJECTS TO MONGODB');
    console.log('====================================================');
    console.log('📡 Connecting to MongoDB:', safeUri);

    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 20000 });
    console.log('✅ Connected successfully to MongoDB.\n');

    let updated = 0;
    let created = 0;

    for (const p of projectsData) {
      const existing = await Project.findOne({ title: p.title });
      if (existing) {
        Object.assign(existing, p);
        await existing.save();
        updated++;
      } else {
        await Project.create(p);
        created++;
      }
    }

    const total = await Project.countDocuments();
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log('----------------------------------------------------');
    console.log(`✓ Created: ${created}`);
    console.log(`✓ Updated: ${updated}`);
    console.log(`✓ Total Projects in DB: ${total}`);
    console.log(`🎉 Done in ${elapsed}s!`);
    console.log('====================================================');

    await mongoose.disconnect();
    console.log('🔌 Disconnected cleanly from MongoDB.');
    return { created, updated, total };
  } catch (err) {
    console.error('❌ Error seeding projects:', err);
    process.exit(1);
  }
}

if (require.main === module) {
  seedProjects();
}

module.exports = { projectsData, seedProjects };
