const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const serviceIconUpdates = {
  'zeevou-integration': '/uploads/media-1790256411370-963612701.svg',
  'smoobu-integration': '/uploads/media-1790256411370-701515684.svg',
  'newbook-integration': '/uploads/media-1790256411370-446173925.svg',
  'lodgify-integration': '/uploads/media-1790256411370-821016169.svg',
  'jurny-integration': '/uploads/media-1790256411370-530380833.svg',
  'hostfully-integration': '/uploads/media-1790256411370-597845009.svg',
  'guesty-integration': '/uploads/media-1790256411370-982399822.svg',
  'email-lead-nurture': '/uploads/media-1790256411370-60012062.svg',
  'cloud-solutions': '/uploads/media-1790256411370-956387268.svg',
  'ai-chatbots': '/uploads/media-1790256411369-320262416.svg',
  'mews-integration': '/uploads/media-1790253755536-799955685.svg',
  'opera-pms-integration': '/uploads/media-1790253755536-767535089.svg',
  'cloudbeds-integration': '/uploads/media-1790253755532-273691715.svg',
  'uplisting-integration': '/uploads/media-1790253755539-463139177.svg',
  'hostaway-integration': '/uploads/media-1790253755539-455557641.svg',
  'hostify-integration': '/uploads/media-1790253755535-639038145.svg',
  'ownerrez-integration': '/uploads/media-1790253755537-457611832.svg',
  'rentals-united-integration': '/uploads/media-1790253755537-228555983.svg',
  'tokeet-integration': '/uploads/media-1790253755539-480635918.svg',
  'ai-workflows': '/uploads/media-1789985455799-12328966.svg',
  'ghl-automation': '/uploads/media-1789985455803-66255124.svg',
  'hubspot-crm': '/uploads/media-1789985455803-524952504.svg',
  'shopify-development': '/uploads/media-1789727119631-452879393.svg',
  'pms-integration': '/uploads/media-1789727119629-286851325.svg',
};

async function updateServiceIcons() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    const Service = mongoose.connection.db.collection('services');

    for (const [slug, icon] of Object.entries(serviceIconUpdates)) {
      const res = await Service.updateOne(
        { slug },
        { $set: { icon } }
      );
      console.log(`Updated ${slug} -> ${icon} (matched: ${res.matchedCount}, modified: ${res.modifiedCount})`);
    }

    console.log('All service icons updated successfully in MongoDB Atlas.');
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error updating service icons:', err);
    process.exit(1);
  }
}

updateServiceIcons();
