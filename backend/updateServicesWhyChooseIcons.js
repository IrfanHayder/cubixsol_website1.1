require('dotenv').config();
const mongoose = require('mongoose');

async function updateServicesWhyChooseIcons() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const whyChooseItems = [
      {
        title: 'Business-first planning',
        desc: 'We connect technical decisions to user needs, operational requirements, and commercial goals.',
        icon: '/uploads/media-1789566441929-109737117.svg',
      },
      {
        title: 'Cross-functional expertise',
        desc: 'Developers, designers, QA specialists, consultants, and marketers collaborate throughout delivery.',
        icon: '/uploads/media-1789566441929-4433635.svg',
      },
      {
        title: 'Enterprise-ready thinking',
        desc: 'Our **custom enterprise software development services** prioritize scalability, integrations, maintainability, and long-term product performance.',
        icon: '/uploads/media-1789566441929-227301020.svg',
      },
      {
        title: 'Transparent execution',
        desc: 'Defined milestones, regular communication, testing, and documented feedback keep the project moving in the right direction.',
        icon: '/uploads/media-1789566441930-7622150.svg',
      },
    ];

    const res = await mongoose.connection.db.collection('pagecontents').updateOne(
      { slug: 'services' },
      { $set: { whyChooseItems } }
    );

    console.log(`PageContent [services] updated (matched: ${res.matchedCount}, modified: ${res.modifiedCount})`);
    process.exit(0);
  } catch (err) {
    console.error('Error updating services why choose icons:', err);
    process.exit(1);
  }
}

updateServicesWhyChooseIcons();
