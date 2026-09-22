const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
const mongoose = require('mongoose');
const Project = require('./models/Project');
require('dotenv').config({ path: './.env' });

const projectsToAdd = [
  {
    title: 'Lora Gene',
    category: 'E-Commerce',
    tag: 'E-Commerce',
    industry: 'Sustainable Fashion & Apparel',
    color: 'from-emerald-600 via-teal-600 to-green-700',
    url: 'https://loragene.com',
    client: 'Lora Gene',
    desc: 'Sustainable fashion and lifestyle e-commerce platform offering contemporary clothing and curated collections.',
    description: 'Sustainable fashion and lifestyle e-commerce platform offering contemporary clothing and curated collections.',
    year: '2024'
  },
  {
    title: 'Liverpool FC Store',
    category: 'E-Commerce',
    tag: 'E-Commerce',
    industry: 'Sports Merchandise & Apparel',
    color: 'from-red-600 via-rose-700 to-amber-700',
    url: 'https://store.liverpoolfc.com',
    client: 'Liverpool FC',
    desc: 'Official Liverpool FC online store offering authentic club merchandise, kits, clothing, accessories, and fan products.',
    description: 'Official Liverpool FC online store offering authentic club merchandise, kits, clothing, accessories, and fan products.',
    year: '2024'
  },
  {
    title: 'Barbour',
    category: 'E-Commerce',
    tag: 'E-Commerce',
    industry: 'Global Fashion & Lifestyle Heritage',
    color: 'from-amber-700 via-yellow-800 to-stone-900',
    url: 'https://barbour.com',
    client: 'Barbour',
    desc: 'Global fashion and lifestyle e-commerce platform featuring heritage clothing, outerwear, footwear, and accessories.',
    description: 'Global fashion and lifestyle e-commerce platform featuring heritage clothing, outerwear, footwear, and accessories.',
    year: '2024'
  },
  {
    title: 'Fred Perry',
    category: 'E-Commerce',
    tag: 'E-Commerce',
    industry: 'International Apparel & Sportswear',
    color: 'from-slate-800 via-indigo-900 to-blue-950',
    url: 'https://fredperry.com',
    client: 'Fred Perry',
    desc: 'International fashion e-commerce platform offering clothing, footwear, and accessories.',
    description: 'International fashion e-commerce platform offering clothing, footwear, and accessories.',
    year: '2024'
  },
  {
    title: 'Ossa Frames',
    category: 'E-Commerce',
    tag: 'E-Commerce',
    industry: 'Designer Eyewear & Optics',
    color: 'from-cyan-600 via-teal-600 to-blue-800',
    url: 'https://ossaframes.com',
    client: 'Ossa Frames',
    desc: 'Designer eyewear e-commerce platform offering sunglasses, eyeglasses, and premium frames.',
    description: 'Designer eyewear e-commerce platform offering sunglasses, eyeglasses, and premium frames.',
    year: '2024'
  },
  {
    title: 'TheGuideliner',
    category: 'E-Commerce',
    tag: 'E-Commerce',
    industry: 'Beauty & Cosmetics D2C',
    color: 'from-pink-600 via-rose-600 to-purple-700',
    url: 'https://theguideliner.com',
    client: 'TheGuideliner',
    desc: 'Beauty e-commerce brand focused on innovative eyeliner products and direct-to-consumer shopping.',
    description: 'Beauty e-commerce brand focused on innovative eyeliner products and direct-to-consumer shopping.',
    year: '2024'
  },
  {
    title: 'Zoe Boutique',
    category: 'E-Commerce',
    tag: 'E-Commerce',
    industry: 'Italian Luxury & Boutique Fashion',
    color: 'from-violet-600 via-purple-700 to-indigo-900',
    url: 'https://zoeboutique.it',
    client: 'Zoe Boutique Italy',
    desc: 'Italian fashion boutique offering curated collections through a modern online shopping experience.',
    description: 'Italian fashion boutique offering curated collections through a modern online shopping experience.',
    year: '2024'
  },
  {
    title: 'Minni Nest',
    category: 'E-Commerce',
    tag: 'E-Commerce',
    industry: 'Baby Products & Nursery Essentials',
    color: 'from-sky-500 via-teal-500 to-emerald-600',
    url: 'https://minninest.com',
    client: 'Minni Nest',
    desc: 'Baby-products e-commerce brand offering baby nests, cots, baskets, and sleeping essentials.',
    description: 'Baby-products e-commerce brand offering baby nests, cots, baskets, and sleeping essentials.',
    year: '2024'
  },
  {
    title: 'LORIS Parfum',
    category: 'E-Commerce',
    tag: 'E-Commerce',
    industry: 'Fragrances & Luxury Scents',
    color: 'from-fuchsia-600 via-purple-700 to-pink-800',
    url: 'https://lorisparfum.com',
    client: 'LORIS Parfum',
    desc: 'Fragrance e-commerce platform offering perfumes, personal-care products, room fragrances, and gift sets.',
    description: 'Fragrance e-commerce platform offering perfumes, personal-care products, room fragrances, and gift sets.',
    year: '2024'
  },
  {
    title: 'NuuTel',
    category: 'Web Development',
    tag: 'SaaS',
    industry: 'Telecommunications & Broadband Solutions',
    color: 'from-blue-600 via-indigo-600 to-cyan-700',
    url: 'https://nuutel.com',
    client: 'NuuTel Telecom',
    desc: 'Telecommunications platform providing residential, SME, and enterprise broadband connectivity solutions.',
    description: 'Telecommunications platform providing residential, SME, and enterprise broadband connectivity solutions.',
    year: '2024'
  }
];

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected.');

    for (const item of projectsToAdd) {
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
