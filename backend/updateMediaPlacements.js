const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {}

const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Service = require('./models/Service');
const Project = require('./models/Project');

async function updateMedia() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB.');

    // 1. Update Services with new PMS Logos/Graphics
    const serviceUpdates = [
      { slug: 'mews-integration', image: '/uploads/media-1790748296741-57653095.png' },
      { slug: 'opera-pms-integration', image: '/uploads/media-1790748296742-584517457.png' },
      { slug: 'cloudbeds-integration', image: '/uploads/media-1790748296739-445424829.png' },
      { slug: 'uplisting-integration', image: '/uploads/media-1790748296758-307692385.png' },
      { slug: 'tokeet-integration', image: '/uploads/media-1790748296757-168543588.png' },
      { slug: 'hostify-integration', image: '/uploads/media-1790748296741-290076763.png' }
    ];

    for (const item of serviceUpdates) {
      const res = await Service.findOneAndUpdate(
        { slug: item.slug },
        { $set: { heroImage: item.image, image: item.image } },
        { new: true }
      );
      if (res) {
        console.log(`✓ Updated Service [${item.slug}] image -> ${item.image}`);
      } else {
        console.log(`⚠ Service not found for slug: ${item.slug}`);
      }
    }

    // 2. Update Projects if matching titles exist
    const projectUpdates = [
      { titleRegex: /Manzil/i, image: '/uploads/media-1790430431254-189612641.png' },
      { titleRegex: /EasyStay/i, image: '/uploads/media-1790430431246-804009780.png' },
      { titleRegex: /Burj Al Arab/i, image: '/uploads/media-1790430431235-890529222.png' },
      { titleRegex: /BnB Made Easy/i, image: '/uploads/media-1790430431224-806187781.png' }
    ];

    for (const p of projectUpdates) {
      const doc = await Project.findOneAndUpdate(
        { title: p.titleRegex },
        { $set: { image: p.image, coverImage: p.image } },
        { new: true }
      );
      if (doc) {
        console.log(`✓ Updated Project [${doc.title}] image -> ${p.image}`);
      }
    }

    // 3. Update seedData.json to maintain consistency
    const seedJsonPath = path.join(__dirname, 'seedData.json');
    if (fs.existsSync(seedJsonPath)) {
      const raw = fs.readFileSync(seedJsonPath, 'utf8');
      const seedData = JSON.parse(raw);
      if (Array.isArray(seedData.initialServices)) {
        seedData.initialServices.forEach((s) => {
          const match = serviceUpdates.find((u) => u.slug === s.slug);
          if (match) {
            s.heroImage = match.image;
            s.image = match.image;
          }
        });
      }
      fs.writeFileSync(seedJsonPath, JSON.stringify(seedData, null, 2), 'utf8');
      console.log('✓ Updated seedData.json with new image paths');
    }

    console.log('====================================================');
    console.log('🎉 ALL IMAGES UPDATED SUCCESSFULLY IN DATABASE!');
    console.log('====================================================');
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error updating media:', err);
    process.exit(1);
  }
}

updateMedia();
