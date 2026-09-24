const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const pmsProcessSteps = [
  {
    stepNumber: '01',
    title: 'Consultation',
    desc: 'This phase allows experts to define the optimum PMS integration solutions for your needs. For a smooth integration, our professionals will handle any technological or safety issues that may arise.',
    image: '/uploads/media-1790257307933-564950446.svg',
    icon: '/uploads/media-1790257307933-564950446.svg',
    points: [],
  },
  {
    stepNumber: '02',
    title: 'Planning',
    desc: "In the planning phase, we create a comprehensive integration plan based on your requirements. It entails defining the task's scope, selecting suitable PMSs rental, and developing timelines. We establish critical milestones to maintain consistency with your business operations and system development.",
    image: '/uploads/media-1790257307933-360229398.svg',
    icon: '/uploads/media-1790257307933-360229398.svg',
    points: [],
  },
  {
    stepNumber: '03',
    title: 'Implementation',
    desc: 'When the plan of action is approved, we start the integration process. Our expertise will integrate your present systems with the suitable PMS rentals, ensuring that data transfers safely and quickly. We manage all of the back work, allowing your business activities to continue uninterrupted.',
    image: '/uploads/media-1790257307933-25615094.svg',
    icon: '/uploads/media-1790257307933-25615094.svg',
    points: [],
  },
  {
    stepNumber: '04',
    title: 'Testing',
    desc: 'Before moving live, we thoroughly test the integration to ensure that everything functions properly. This includes tests for operation, optimization of performance, and safety inspections to guarantee that the PMS operates as intended.',
    image: '/uploads/media-1790257307934-884499517.svg',
    icon: '/uploads/media-1790257307934-884499517.svg',
    points: [],
  },
  {
    stepNumber: '05',
    title: 'Deployment',
    desc: 'After successful testing, we will begin integrating the PMS rental into your existing system. Once tested, we deploy the system into your live environment. Every module is fully functional, from the key management system for property management to payment and booking synchronization.',
    image: '/uploads/media-1790257307933-424705272.svg',
    icon: '/uploads/media-1790257307933-424705272.svg',
    points: [],
  },
];

const servicesPageProcessSteps = [
  {
    step: '01',
    title: 'Discover',
    desc: 'We clarify your business goals, users, requirements, technical constraints, budget, and success criteria.',
    icon: '/uploads/media-1790257307933-564950446.svg',
    image: '/uploads/media-1790257307933-564950446.svg',
  },
  {
    step: '02',
    title: 'Plan',
    desc: 'Our team defines the scope, technology, architecture, priorities, milestones, and delivery roadmap.',
    icon: '/uploads/media-1790257307933-360229398.svg',
    image: '/uploads/media-1790257307933-360229398.svg',
  },
  {
    step: '03',
    title: 'Design and Develop',
    desc: 'Designers create the user experience while developers build, review, and integrate each product component.',
    icon: '/uploads/media-1790257307933-25615094.svg',
    image: '/uploads/media-1790257307933-25615094.svg',
  },
  {
    step: '04',
    title: 'Test and Launch',
    desc: 'We test functionality, usability, compatibility, security, and performance before managing a controlled deployment.',
    icon: '/uploads/media-1790257307934-884499517.svg',
    image: '/uploads/media-1790257307934-884499517.svg',
  },
  {
    step: '05',
    title: 'Support',
    desc: 'After launch, we monitor performance, resolve issues, deliver updates, and help your product evolve.',
    icon: '/uploads/media-1790257307933-424705272.svg',
    image: '/uploads/media-1790257307933-424705272.svg',
  },
];

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const Service = mongoose.connection.db.collection('services');
    const pmsRes = await Service.updateOne(
      { slug: 'pms-integration' },
      { $set: { serviceProcessSteps: pmsProcessSteps } }
    );
    console.log('PMS Service process steps updated:', pmsRes);

    const PageContent = mongoose.connection.db.collection('pagecontents');
    const pageRes = await PageContent.updateOne(
      { slug: 'services' },
      { $set: { processSteps: servicesPageProcessSteps } }
    );
    console.log('PageContent services process steps updated:', pageRes);

    await mongoose.disconnect();
    console.log('Done.');
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

run();
