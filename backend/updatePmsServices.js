const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const subServices = [
  {
    icon: '/uploads/media-1790255189682-850620447.svg',
    title: 'Booking engine / Channel Manager',
    desc: 'Channel executives assist hotels in managing their online distribution by connecting them to various online platforms and their online booking sites. Hotels can use a channel manager to modify inventory and rates throughout the PMS integrations system. Connecting your PMS systems with channel manager and PMS integration solutions such as online travel agents (OTAs) or channel administrators saves valuable time by providing central control over stock, pricing, and bookings.',
    badge: 'Multi-OTA Sync',
  },
  {
    icon: '/uploads/media-1790255189683-273829124.svg',
    title: 'Room Access / Keyless Access Solution',
    desc: 'Keyless entry systems with our key management system for property management allow visitors to open their hotel entrances without using a genuine key. Rather, visitors enter an authorization code or mobile key from their smartphone. Connecting your PMS to access-to-space solutions like smart keycards simplifies check-in and access control significantly, eliminating manual front-desk keycard encoding.',
    badge: 'BLE & Smart Lock Sync',
  },
  {
    icon: '/uploads/media-1790255189683-793511854.svg',
    title: 'Revenue Management System',
    desc: 'A revenue management system forecasts traveler habits and demand by using previous information, market trends, and live indicators. With this information, hotels determine the best price for rooms to maximize profits. Two-way connectivity between your PMS and revenue management software enables precise forecasting, dynamic nightly rate adjustments, and real-time inventory pricing optimization.',
    badge: 'Dynamic Yield & Pricing',
  },
  {
    icon: '/uploads/media-1790255189683-537471180.svg',
    title: 'Payment Processing Network',
    desc: 'A payment processing network enables hotels and property managers to take credit card payments smoothly. Linking your PMS with a secure payment gateway makes bookings and departures at the reception desk seamless. After guests enter payment information, transactions are transmitted to the payment handling network and invoices in the PMS are promptly updated in real time.',
    badge: 'PCI-DSS Payment Rails',
  },
  {
    icon: '/uploads/media-1790255189683-626229220.svg',
    title: 'POS System Integration',
    desc: 'Point-of-sale (POS) systems allow hotel and resort staff to handle reservations for rooms or collect transactions for onsite amenities like restaurants, bars, and spas. By connecting your PMS and POS systems, amenity expenses can be charged to guest room folios automatically, decreasing human error and streamlining guest checkout.',
    badge: 'Front Desk & Amenities',
  },
  {
    icon: '/uploads/media-1790255189682-348056118.svg',
    title: 'Guest Review Plug-In',
    desc: 'Guest Review Plug-In services provide an easy way to collect, organize, and display feedback from guests directly on property management systems (PMS). The system enables hotel businesses to track and present guest experiences, improving online reputation and attracting new guests with real-time feedback synchronization across booking channels.',
    badge: 'Automated Guest Feedback',
  },
];

async function updatePmsServices() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    const Service = mongoose.connection.db.collection('services');
    const updateRes = await Service.updateOne(
      { slug: 'pms-integration' },
      {
        $set: {
          subServicesTitle: 'Our PMS Integration Services',
          subServicesIntro: "Many options stand out if you're looking for complete property management software to help you optimize the vacation rental business. Industry leaders such as Guesty, Hostaway, Hostfully, Zeevou, Smoobu, Lodgify, OwnerRez, Rentals United, Tokeet, Uplisting, Cloudbeds, and Opera provide comprehensive solutions for booking, guest communication, payment processing, keyless access, and smooth multi-property monitoring.",
          subServicesItems: subServices,
        }
      }
    );
    console.log('Update result:', updateRes);

    const updated = await Service.findOne({ slug: 'pms-integration' });
    console.log('Updated subServicesItems count:', updated?.subServicesItems?.length);
    updated?.subServicesItems?.forEach(s => console.log(` - ${s.title} [${s.badge}]: ${s.icon}`));
    
    await mongoose.disconnect();
    console.log('Done.');
  } catch (err) {
    console.error('Error updating PMS subServices:', err);
    process.exit(1);
  }
}

updatePmsServices();
