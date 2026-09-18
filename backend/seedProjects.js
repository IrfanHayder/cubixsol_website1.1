const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Project = require('./models/Project');

const projectsData = [
  {
    title: 'Sydney Dreams',
    url: 'https://sydneydreams.com.au',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'Sydney Dreams Australia',
    industry: 'Vacation Rental & Hospitality',
    year: '2024',
    desc: 'Sydney Dreams is a professional vacation rental website designed to showcase holiday properties and provide guests with detailed accommodation information. The platform combines a user-friendly property browsing experience with an integrated booking solution for managing reservations and guest stays.',
    description: 'Sydney Dreams is a professional vacation rental website designed to showcase holiday properties and provide guests with detailed accommodation information. The platform combines a user-friendly property browsing experience with an integrated booking solution for managing reservations and guest stays.',
    color: 'from-sky-500 to-blue-700',
  },
  {
    title: 'GoTo Poconos',
    url: 'https://gotopoconos.com',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'GoTo Poconos',
    industry: 'Vacation Rental & Travel',
    year: '2024',
    desc: 'GoTo Poconos is a vacation rental platform focused on showcasing properties across the Poconos region. The website provides an intuitive property discovery experience with detailed listings and a streamlined direct-booking workflow integrated with property management technology.',
    description: 'GoTo Poconos is a vacation rental platform focused on showcasing properties across the Poconos region. The website provides an intuitive property discovery experience with detailed listings and a streamlined direct-booking workflow integrated with property management technology.',
    color: 'from-emerald-500 to-teal-700',
  },
  {
    title: 'ADLIV',
    url: 'https://adliv.co.uk',
    category: 'Web Development',
    tag: 'SaaS',
    client: 'ADLIV UK',
    industry: 'Serviced Apartments & Property Management',
    year: '2024',
    desc: 'ADLIV is a modern short-term accommodation website built to showcase serviced apartments and rental properties. It provides visitors with detailed property information, amenities, locations and a convenient booking experience through an integrated property management system.',
    description: 'ADLIV is a modern short-term accommodation website built to showcase serviced apartments and rental properties. It provides visitors with detailed property information, amenities, locations and a convenient booking experience through an integrated property management system.',
    color: 'from-indigo-600 to-purple-700',
  },
  {
    title: 'Stay Seekers',
    url: 'https://stayseekers.co.uk',
    category: 'Web Development',
    tag: 'E-Commerce',
    client: 'Stay Seekers UK',
    industry: 'Holiday Accommodation',
    year: '2024',
    desc: 'Stay Seekers is a holiday rental website featuring a range of accommodation options for travelers. The platform focuses on easy property discovery, detailed accommodation pages, availability and a smooth booking journey for guests.',
    description: 'Stay Seekers is a holiday rental website featuring a range of accommodation options for travelers. The platform focuses on easy property discovery, detailed accommodation pages, availability and a smooth booking journey for guests.',
    color: 'from-rose-500 to-pink-600',
  },
  {
    title: 'Sage Vacations',
    url: 'https://sagevacations.net',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'Sage Vacations',
    industry: 'Vacation Rental & Stays',
    year: '2024',
    desc: 'Sage Vacations is a professional vacation rental website designed to showcase holiday homes and accommodation options. The website presents property details, amenities and locations while providing guests with a simple and convenient reservation experience.',
    description: 'Sage Vacations is a professional vacation rental website designed to showcase holiday homes and accommodation options. The website presents property details, amenities and locations while providing guests with a simple and convenient reservation experience.',
    color: 'from-teal-500 to-emerald-600',
  },
  {
    title: 'Open Air Homes',
    url: 'https://openairhomes.com',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'Open Air Homes California',
    industry: 'Luxury Vacation Rentals',
    year: '2024',
    desc: 'Open Air Homes is a vacation rental and property management platform focused on professionally managed homes and direct bookings. The website provides property discovery and booking functionality while connecting with a centralized property management ecosystem.',
    description: 'Open Air Homes is a vacation rental and property management platform focused on professionally managed homes and direct bookings. The website provides property discovery and booking functionality while connecting with a centralized property management ecosystem.',
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
    desc: 'Guest Cottage is a vacation rental website featuring a collection of holiday properties for short and extended stays. Visitors can explore individual properties, review accommodation details and use the integrated booking experience to plan their stay.',
    description: 'Guest Cottage is a vacation rental website featuring a collection of holiday properties for short and extended stays. Visitors can explore individual properties, review accommodation details and use the integrated booking experience to plan their stay.',
    color: 'from-amber-500 to-orange-600',
  },
  {
    title: 'Cur8 Residences',
    url: 'https://cur8residences.com',
    category: 'Web Development',
    tag: 'SaaS',
    client: 'Cur8 Residences',
    industry: 'Premium Accommodation & Booking Engine',
    year: '2024',
    desc: 'Cur8 Residences is a modern property rental platform designed to showcase premium accommodation and simplify the guest booking journey. The website combines property discovery, detailed listings and reservation functionality with integrated property management services.',
    description: 'Cur8 Residences is a modern property rental platform designed to showcase premium accommodation and simplify the guest booking journey. The website combines property discovery, detailed listings and reservation functionality with integrated property management services.',
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
    desc: 'Mountain Cabins is a vacation rental website focused on showcasing cabin and holiday accommodation. The platform presents property information and booking options while integrating with a property management system to support reservations and guest services.',
    description: 'Mountain Cabins is a vacation rental website focused on showcasing cabin and holiday accommodation. The platform presents property information and booking options while integrating with a property management system to support reservations and guest services.',
    color: 'from-emerald-700 to-stone-800',
  },
  {
    title: 'Ocean City Retreats',
    url: 'https://oceancityretreats.co.uk',
    category: 'Web Development',
    tag: 'Web Development',
    client: 'Ocean City Retreats UK',
    industry: 'Coastal Holiday Accommodation',
    year: '2024',
    desc: 'Ocean City Retreats is a UK-based holiday accommodation website featuring vacation properties for travelers. The platform allows visitors to explore available properties, view accommodation details and proceed through an integrated booking process.',
    description: 'Ocean City Retreats is a UK-based holiday accommodation website featuring vacation properties for travelers. The platform allows visitors to explore available properties, view accommodation details and proceed through an integrated booking process.',
    color: 'from-cyan-600 to-blue-800',
  },
];

async function seedProjects() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB.');

    // Delete existing projects and insert new 10 projects
    await Project.deleteMany({});
    console.log('Cleared existing projects in MongoDB.');

    const inserted = await Project.insertMany(projectsData);
    console.log(`✓ Successfully seeded ${inserted.length} projects in MongoDB.`);

    await mongoose.disconnect();
    console.log('Done.');
  } catch (err) {
    console.error('Error seeding projects:', err);
    process.exit(1);
  }
}

seedProjects();
