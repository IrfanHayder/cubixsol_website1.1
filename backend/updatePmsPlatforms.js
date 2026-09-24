const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const platforms = [
  { name: 'Guesty', category: 'Enterprise PMS', icon: '/uploads/media-1790253755534-374481749.svg' },
  { name: 'Hostaway', category: 'Vacation Rental PMS', icon: '/uploads/media-1790253755539-455557641.svg' },
  { name: 'Hostfully', category: 'Hospitality Platform', icon: '/uploads/media-1790253755535-515170169.svg' },
  { name: 'Zeevou', category: 'Direct Booking PMS', icon: '/uploads/media-1790253755551-838693003.svg' },
  { name: 'Smoobu', category: 'Channel Manager PMS', icon: '/uploads/media-1790253755538-48144611.svg' },
  { name: 'Newbook', category: 'Hotel & Park PMS', icon: '/uploads/media-1790253755536-955178959.svg' },
  { name: 'Hostify', category: 'All-in-One PMS', icon: '/uploads/media-1790253755535-639038145.svg' },
  { name: 'Jurny', category: 'AI Hospitality PMS', icon: '/uploads/media-1790253755535-527429420.svg' },
  { name: 'Lodgify', category: 'Short-Term Rental PMS', icon: '/uploads/media-1790253755536-885217759.svg' },
  { name: 'OwnerRez', category: 'Direct Channel PMS', icon: '/uploads/media-1790253755537-457611832.svg' },
  { name: 'Rentals United', category: 'Global OTA Hub', icon: '/uploads/media-1790253755537-228555983.svg' },
  { name: 'Tokeet', category: 'Multi-Calendar PMS', icon: '/uploads/media-1790253755539-480635918.svg' },
  { name: 'Uplisting', category: 'Automated PMS', icon: '/uploads/media-1790253755539-463139177.svg' },
  { name: 'Cloudbeds', category: 'Hotel Management System', icon: '/uploads/media-1790253755532-273691715.svg' },
  { name: 'Opera PMS', category: 'Oracle Hospitality', icon: '/uploads/media-1790253755536-767535089.svg' },
  { name: 'Mews', category: 'Cloud Hotel PMS', icon: '/uploads/media-1790253755536-799955685.svg' }
];

async function updatePms() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    const Service = mongoose.connection.db.collection('services');
    const updateRes = await Service.updateOne(
      { slug: 'pms-integration' },
      { $set: { supportedPlatforms: platforms } }
    );
    console.log('Update result:', updateRes);

    const updated = await Service.findOne({ slug: 'pms-integration' });
    console.log('Updated platforms count:', updated?.supportedPlatforms?.length);
    console.log('Platforms in DB:');
    updated?.supportedPlatforms?.forEach(p => console.log(` - ${p.name} (${p.category}): ${p.icon}`));
    
    await mongoose.disconnect();
    console.log('Done.');
  } catch (err) {
    console.error('Error updating PMS platforms:', err);
    process.exit(1);
  }
}

updatePms();
