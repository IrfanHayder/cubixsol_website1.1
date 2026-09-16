require('dotenv').config();
const mongoose = require('mongoose');

async function updateIcons() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const updates = [
      { slug: 'travel', icon: '/uploads/media-1789563172794-101604180.svg' },
      { slug: 'saas', icon: '/uploads/media-1789563172794-630766494.svg' },
      { slug: 'healthcare', icon: '/uploads/media-1789563172793-99943126.svg' },
      { slug: 'fintech', icon: '/uploads/media-1789563172793-389883725.svg' },
      { slug: 'education', icon: '/uploads/media-1789563172792-808819694.svg' },
      { slug: 'ecommerce', icon: '/uploads/media-1789563172789-64334141.svg' },
      { slug: 'technology', icon: '/uploads/media-1788421050320-328223291.svg' },
      { slug: 'logistics', icon: '/uploads/media-1788421050308-313091127.svg' },
      { slug: 'real-estate', icon: '/uploads/media-1788421050310-764937006.svg' },
    ];

    for (const u of updates) {
      const res = await mongoose.connection.db.collection('industries').updateOne(
        { slug: u.slug },
        { $set: { icon: u.icon } }
      );
      console.log(`Industry [${u.slug}] icon updated -> ${u.icon} (matched: ${res.matchedCount}, modified: ${res.modifiedCount})`);
    }

    console.log('All industry icons updated successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error updating industry icons:', err);
    process.exit(1);
  }
}

updateIcons();
