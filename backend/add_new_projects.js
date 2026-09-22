const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
const mongoose = require('mongoose');
const path = require('path');
const Project = require('./models/Project');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const newProjects = [
  {
    title: 'YouStay',
    category: 'Web Development',
    tag: 'Web Development',
    industry: 'Property Management & Accommodation',
    color: 'from-sky-600 via-cyan-600 to-blue-700',
    url: 'https://youstay.co.za',
    client: 'YouStay South Africa',
    desc: 'YouStay provides property management and guest accommodation services, helping property owners manage bookings, guest experiences, housekeeping, and property maintenance.',
    description: 'YouStay provides property management and guest accommodation services, helping property owners manage bookings, guest experiences, housekeeping, and property maintenance.',
    year: '2024'
  },
  {
    title: 'Brighton Holiday Lets',
    category: 'Web Development',
    tag: 'Web Development',
    industry: 'Holiday Accommodation & Direct Bookings',
    color: 'from-amber-500 via-orange-600 to-rose-600',
    url: 'https://brightonholidaylets.com',
    client: 'Brighton Holiday Lets UK',
    desc: 'Brighton Holiday Lets offers holiday accommodation in Brighton, with property listings and online booking options for guests planning a stay.',
    description: 'Brighton Holiday Lets offers holiday accommodation in Brighton, with property listings and online booking options for guests planning a stay.',
    year: '2024'
  },
  {
    title: 'Mt Buller Apartment Rentals',
    category: 'Web Development',
    tag: 'Web Development',
    industry: 'Alpine Holiday & Apartment Accommodation',
    color: 'from-indigo-600 via-blue-600 to-cyan-700',
    url: 'https://mtbuller.com.au',
    client: 'Mt Buller Apartment Rentals Australia',
    desc: 'Mt Buller Apartment Rentals provides information about holiday apartments in the Mt Buller alpine region, helping visitors explore accommodation options and plan their stay.',
    description: 'Mt Buller Apartment Rentals provides information about holiday apartments in the Mt Buller alpine region, helping visitors explore accommodation options and plan their stay.',
    year: '2024'
  }
];

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected.');

    for (const item of newProjects) {
      const existing = await Project.findOne({ title: item.title });
      if (existing) {
        Object.assign(existing, item);
        await existing.save();
        console.log('Updated existing project:', item.title);
      } else {
        await Project.create(item);
        console.log('Created new project:', item.title);
      }
    }

    const all = await Project.find({});
    console.log('Total projects in DB now:', all.length);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

run();
