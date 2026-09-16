const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Industry = require('./models/Industry');

async function updateLogisticsContent() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('Connected.');

    const logisticsData = {
      heroTitle: 'Logistics Software Development Solutions Built for Smarter Operations',
      title: 'Logistics & Supply Chain',
      slug: 'logistics',
      icon: 'Truck',
      short: 'We optimise transportation, inventory, and supply chain processes with custom logistics software development solutions designed for modern businesses. We build scalable platforms that improve shipment visibility, automate workflows, enhance fleet performance, and support data-driven decisions across logistics operations.',
      desc: 'We optimise transportation, inventory, and supply chain processes with custom logistics software development solutions designed for modern businesses. We build scalable platforms that improve shipment visibility, automate workflows, enhance fleet performance, and support data-driven decisions across logistics operations.',
      ctaPrimaryText: 'Discuss Your Logistics Project',
      ctaPrimaryLink: '/contact',
      ctaSecondaryText: 'Get a Free Consultation',
      ctaSecondaryLink: '#estimate',
      ctaBannerButtonText: 'Start Your Logistics Project',
      ctaBannerButtonLink: '/contact',
      ctaBannerSecondaryButtonText: 'Get Cost Estimate',
      ctaBannerSecondaryButtonLink: '#estimate',
      points: [
        'Custom-Built Logistics Solutions',
        'Scalable Technology Solutions',
        'Seamless Integration Capabilities',
        'Real-Time Data Insights',
        'Flexible Cloud-Based Solutions',
        'Long-Term Technology Partnership',
      ],
      solutionsTitle: 'Logistics Software We Build',
      solutionsSubtitle: 'We engineer end-to-end logistics platforms that digitize workflows, improve driver productivity, and provide real-time shipment transparency.',
      solutionsItems: [
        {
          title: 'Fleet Management Software',
          body: 'Our fleet management software development solutions help businesses monitor vehicles, drivers, and routes in real time. We create systems with GPS tracking, maintenance alerts, fuel monitoring, and performance analytics. Businesses can improve fleet efficiency and reduce operational costs through better visibility.',
        },
        {
          title: 'Dispatch and Tracking Software',
          body: 'We develop dispatch and tracking platforms that simplify shipment coordination and delivery management. Real-time updates allow teams to assign tasks, track orders, and improve delivery accuracy. Our solutions support faster communication between drivers, customers, and operations teams.',
        },
        {
          title: 'Warehouse Management Software',
          body: 'Our warehouse management solutions optimise inventory control, order processing, and storage operations. We build systems that improve stock visibility, automate workflows, and reduce manual errors. Companies can manage warehouse activities with greater speed and accuracy.',
        },
        {
          title: 'Logistics Mobile Apps',
          body: 'We build logistics mobile apps that connect drivers, managers, and customers through convenient digital tools. Apps can include delivery tracking, notifications, digital proof of delivery, and order updates. Our custom solutions improve accessibility and create smoother logistics experiences.',
        },
      ],
      workAreasTitle: 'Built for Logistics Standards',
      workAreas: [
        {
          title: 'Real-Time Tracking and Visibility',
          body: 'Our logistics platforms provide real-time tracking for shipments, vehicles, and delivery operations. Businesses gain complete visibility into movement, status updates, and operational performance.',
        },
        {
          title: 'Smooth System Integrations',
          body: 'We build logistics software that connects with essential systems such as ELD, ERP, TMS, and third-party APIs. These integrations create smooth data flow across logistics operations.',
        },
        {
          title: 'Reliable and Scalable Infrastructure',
          body: 'Our solutions are designed for high performance, security, and reliability. Scalable architecture supports growing fleets, increasing shipments, and expanding business needs.',
        },
        {
          title: 'Data-Driven Logistics Management',
          body: 'Advanced analytics and reporting features provide valuable insights into routes, costs, and delivery performance. Businesses can use real-time data to improve efficiency and decision-making.',
        },
      ],
      whyChooseTitle: 'Why Logistics Teams Choose Cubixsol',
      whyChooseItems: [
        {
          title: 'Custom-Built Logistics Solutions',
          desc: 'We engineer custom logistics platforms shaped specifically around your fleet size, dispatch workflows, and operational requirements.',
        },
        {
          title: 'Scalable Technology Solutions',
          desc: 'High-throughput cloud architecture engineered to process telemetry, live GPS coordinates, and high-frequency dispatch updates.',
        },
        {
          title: 'Seamless Integration Capabilities',
          desc: 'Frictionless integration with existing ELD hardware, ERP systems (SAP, NetSuite), TMS platforms, and mapping APIs.',
        },
        {
          title: 'Real-Time Data Insights',
          desc: 'Actionable live dashboards, automated driver scorecards, fuel optimization algorithms, and delivery tracking metrics.',
        },
        {
          title: 'Flexible Cloud-Based Solutions',
          desc: 'Resilient cloud infrastructure with enterprise-grade security, automated backups, and 99.99% uptime guarantees.',
        },
        {
          title: 'Long-Term Technology Partnership',
          desc: 'Ongoing post-launch technical support, continuous system enhancements, security patches, and platform scaling support.',
        },
      ],
      ctaTitle: 'Ready to Build Your Logistics Solution?',
      ctaDesc: 'Transform your operations with reliable logistics software development solutions designed around your business goals.',
      faqs: [
        {
          q: 'How much does logistics software development cost?',
          a: 'The cost of logistics software development depends on project scope, features, integrations, platforms, and customisation requirements. A basic logistics application requires less investment than a complete platform with fleet management, tracking, analytics, and enterprise integrations.',
        },
        {
          q: 'How long does it take to develop custom logistics software?',
          a: 'Development timelines depend on software complexity, required features, and testing needs. A focused logistics solution may take a few months, while advanced platforms with multiple integrations require a longer development cycle.',
        },
        {
          q: 'Can logistics software provide real-time shipment and vehicle tracking?',
          a: 'Yes, logistics software can include real-time tracking features through GPS, IoT devices, and connected systems. Businesses can monitor vehicle locations, delivery progress, and shipment status through centralised dashboards.',
        },
        {
          q: 'Can logistics software integrate with existing ERP and ELD systems?',
          a: 'Yes, custom solutions can connect with ERP, ELD, TMS, payment systems, and other third-party platforms. Integrations allow businesses to synchronise data and improve workflow efficiency.',
        },
        {
          q: 'Is custom logistics software scalable for growing businesses?',
          a: 'Yes, scalable architecture allows logistics software to support increasing users, vehicles, shipments, and operational demands. A well-designed platform can expand with business growth without major system changes.',
        },
      ],
    };

    // Update MongoDB
    const res = await Industry.findOneAndUpdate(
      { slug: 'logistics' },
      { $set: logisticsData },
      { upsert: true, new: true }
    );
    console.log('✓ Industry "logistics" updated in MongoDB successfully.');

    await mongoose.disconnect();
    console.log('Done.');
  } catch (err) {
    console.error('Error updating logistics content:', err);
    process.exit(1);
  }
}

updateLogisticsContent();
