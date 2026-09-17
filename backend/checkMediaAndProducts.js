const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const Media = require('./models/Media');

async function check() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cubixsol');
  const media = await Media.find({}).sort({ createdAt: -1 });
  console.log('--- ALL MEDIA ITEMS ---');
  media.forEach(m => console.log(`${m.title} => ${m.url}`));
  await mongoose.disconnect();
}
check();
