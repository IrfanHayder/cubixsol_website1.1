const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Industry = require('./models/Industry');

async function updateTechnologyContent() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB.');

    const technologyData = {
      slug: 'technology',
      title: 'Technology',
      icon: 'Cpu',
      heroTitle: 'Custom Software Development for Tech Companies',
      short: 'Technology companies need software solutions that support innovation, improve operations, and adapt to changing market demands. Cubixsol is a custom software development company that builds secure, scalable, and high-performance applications for technology-driven businesses.',
      desc: 'Technology companies need software solutions that support innovation, improve operations, and adapt to changing market demands. Cubixsol is a custom software development company that builds secure, scalable, and high-performance applications for technology-driven businesses.',
      ctaPrimaryText: 'Get a Free Proposal',
      ctaPrimaryLink: '#estimate',
      ctaSecondaryText: 'Discuss your project',
      ctaSecondaryLink: '/contact',
      ctaTitle: 'Ready to Build Your Custom Software Solution?',
      ctaDesc: 'Cubixsol helps businesses create secure, scalable, and future-ready software products. Partner with our team to develop solutions designed around your technology goals.',
      ctaBannerButtonText: 'Start Your Software Project Today',
      ctaBannerButtonLink: '/contact',
      points: [
        'Startup Software Development',
        'Digital Transformation Solutions',
        'AI & Automation Software',
        'Mobile & Web Applications',
        'Cloud-Based Software Development',
        'Enterprise Software Solutions',
      ],
      servicesWeOffer: [
        'Startup Software Development',
        'Digital Transformation Solutions',
        'AI & Automation Software',
        'Mobile & Web Applications',
        'Cloud-Based Software Development',
        'Enterprise Software Solutions',
      ],
      solutionsTitle: 'Software Solutions Designed for Technology Companies',
      solutionsSubtitle: 'We work as a technology partner that understands complex development needs, from MVP creation for startups to advanced platforms for growing enterprises.',
      solutionsItems: [
        {
          title: 'Product Development & MVP Solutions',
          body: 'We help technology companies convert concepts into functional digital products. Our team develops MVPs that validate ideas, test market demand, and create a foundation for future growth.',
        },
        {
          title: 'SaaS Platform Development',
          body: 'We build scalable SaaS applications with flexible architectures, user management systems, subscription models, and cloud-based infrastructure. Our solutions support businesses that need reliable software products for multiple users and markets.',
        },
        {
          title: 'Enterprise Software Development',
          body: 'Large organisations require software that connects teams, manages complex processes, and integrates with existing systems. Our experts develop enterprise platforms that improve efficiency, security, and operational control.',
        },
        {
          title: 'Cloud-Based Application Development',
          body: 'Cloud technology enables businesses to access flexible and scalable infrastructure. We develop cloud applications that support performance, reliability, and seamless expansion as business requirements grow.',
        },
      ],
      workAreasTitle: 'Built for Modern Technology Standards',
      workAreas: [
        {
          title: 'Scalable Software Architecture',
          body: 'Our development approach focuses on flexible architectures that support future updates, increased users, and evolving business requirements.',
        },
        {
          title: 'Secure Development Practices',
          body: 'Security remains a core part of our development process. We apply industry-standard practices for data protection, authentication, access control, and application reliability.',
        },
        {
          title: 'Seamless API & System Integration',
          body: 'Modern technology platforms often depend on multiple services. We build and connect APIs that allow applications, databases, and third-party tools to work together efficiently.',
        },
        {
          title: 'Performance-Focused Engineering',
          body: 'Fast and responsive software creates better user experiences. Our team optimizes applications for speed, stability, and consistent performance across different platforms.',
        },
      ],
      whyChooseTitle: 'Why Tech Companies Choose Cubixsol',
      whyChooseItems: [
        {
          title: 'Full Lifecycle Engineering',
          desc: 'From initial architecture and rapid prototyping to production deployment and 24/7 observability.',
        },
        {
          title: 'Enterprise-Grade Security',
          desc: 'Built-in security compliance, RBAC, OAuth2/OIDC, and automated vulnerability scanning.',
        },
        {
          title: 'High-Throughput Performance',
          desc: 'Optimized microservices, distributed caching with Redis, and zero-downtime CI/CD delivery pipelines.',
        },
      ],
      faqs: [
        {
          q: 'What does a custom software development company do?',
          a: 'A custom software development company creates software solutions based on specific business requirements instead of using ready-made products. The development process includes planning, design, coding, testing, deployment, and ongoing improvements.',
        },
        {
          q: 'How much do custom software development services cost?',
          a: 'The cost depends on project complexity, features, integrations, platforms, and development requirements. A simple MVP requires a different investment compared with a large enterprise software platform.',
        },
        {
          q: 'How long does custom software development take?',
          a: 'Development timelines vary according to scope, technology requirements, and product complexity. Smaller applications may take several weeks, while advanced platforms require longer development cycles.',
        },
        {
          q: 'Does Cubixsol work with startups?',
          a: 'Yes, we work as a software development company for startups by helping founders transform ideas into functional products, validate concepts, and build scalable solutions.',
        },
        {
          q: 'Can custom software integrate with existing systems?',
          a: 'Yes, custom software can connect with existing platforms through APIs, databases, cloud services, and third-party integrations to improve workflow efficiency.',
        },
      ],
      seo: {
        metaTitle: 'Custom Software Development for Tech Companies | Cubixsol',
        metaDescription: 'Custom software development services for technology companies, startups, and enterprises. Scalable cloud architectures, SaaS, and API integrations.',
        keywords: 'custom software development for tech companies, tech software company, saas platform development, mvp development, enterprise technology solutions',
      },
    };

    const updated = await Industry.findOneAndUpdate(
      { slug: 'technology' },
      { $set: technologyData },
      { upsert: true, new: true }
    );

    console.log('✓ Successfully updated "technology" Industry in MongoDB:', updated.title);
    await mongoose.disconnect();
    console.log('Done.');
  } catch (err) {
    console.error('Error updating technology industry content:', err);
    process.exit(1);
  }
}

updateTechnologyContent();
