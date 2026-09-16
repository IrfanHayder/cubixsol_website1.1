const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Industry = require('./models/Industry');

async function updateSaasContent() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB.');

    const saasData = {
      slug: 'saas',
      title: 'SaaS',
      icon: 'Cloud',
      heroTitle: 'SaaS Development Company for Scalable Digital Products',
      short: 'Our team develops SaaS platforms with modern architectures, intuitive user experiences, and flexible features that support long-term growth. From MVP development to complete SaaS ecosystems, we create solutions that help businesses launch faster and adapt to changing market needs.',
      desc: 'Our team develops SaaS platforms with modern architectures, intuitive user experiences, and flexible features that support long-term growth. From MVP development to complete SaaS ecosystems, we create solutions that help businesses launch faster and adapt to changing market needs.',
      ctaPrimaryText: 'Get a Free Proposal',
      ctaPrimaryLink: '#estimate',
      ctaSecondaryText: 'Build Your SaaS Product',
      ctaSecondaryLink: '/contact',
      ctaTitle: 'Ready to Build Your SaaS Product?',
      ctaDesc: 'Work with Cubixsol, a reliable saas development company delivering scalable software solutions for startups and enterprises. Our team can help turn your SaaS idea into a powerful digital product.',
      ctaBannerButtonText: 'Start Your SaaS Project Today',
      ctaBannerButtonLink: '/contact',
      points: [
        'SaaS MVP Development',
        'Multi-Tenant SaaS Architecture',
        'Subscription & Billing Systems',
        'SaaS Application Development',
        'Enterprise SaaS Applications',
        'Product-Led Growth Features',
      ],
      servicesWeOffer: [
        'SaaS MVP Development',
        'Multi-Tenant SaaS Architecture',
        'Subscription & Billing Systems',
        'SaaS Application Development',
        'Enterprise SaaS Applications',
        'Product-Led Growth Features',
      ],
      solutionsTitle: 'SaaS & Technology Software We Build',
      solutionsSubtitle: 'From MVP development to complete SaaS ecosystems, we build scalable platforms engineered for reliability, multi-tenancy, and rapid market validation.',
      solutionsItems: [
        {
          title: 'SaaS MVP Development',
          body: 'We build MVP solutions that transform ideas into functional SaaS products. Our MVP development process focuses on essential features, user validation, and faster market entry while creating a foundation for future growth.',
        },
        {
          title: 'Multi-Tenant SaaS Architecture',
          body: 'Our team builds multi-tenant SaaS platforms that let multiple customers use the same application securely. We design flexible architectures with efficient resource management, data separation, and scalable performance.',
        },
        {
          title: 'Subscription & Billing Systems',
          body: 'We create subscription-based platforms with integrated payment workflows, automated billing, pricing plans, and customer management features. Our solutions support flexible revenue models for SaaS businesses.',
        },
        {
          title: 'SaaS Application Development',
          body: 'Our SaaS application development services cover web platforms, enterprise solutions, and industry-specific software products. We build applications with reliable performance, modern interfaces, and cloud-ready infrastructure.',
        },
      ],
      workAreasTitle: 'SaaS Use Cases & Business Solutions',
      workAreas: [
        {
          title: 'B2B SaaS Platforms',
          body: 'We develop cloud-based SaaS solutions that help businesses automate operations, streamline workflows, and improve team collaboration through centralised platforms.',
        },
        {
          title: 'Vertical SaaS Solutions',
          body: 'Our experts create industry-specific SaaS applications designed around unique business processes, customer requirements, and specialised market needs.',
        },
        {
          title: 'Enterprise SaaS Applications',
          body: 'We create scalable enterprise solutions that support complex operations, multiple user roles, advanced reporting, and secure data management.',
        },
        {
          title: 'Customer Management Platforms',
          body: 'Our SaaS solutions help businesses manage customer relationships, improve communication, and deliver better experiences through organised digital workflows.',
        },
        {
          title: 'Internal Business Automation Tools',
          body: 'We build custom SaaS platforms that automate repetitive tasks, optimise internal processes, and improve productivity across different departments.',
        },
        {
          title: 'Product-Led Growth Features',
          body: 'We develop onboarding flows, analytics dashboards, self-service options, and engagement features that support user adoption and long-term SaaS growth.',
        },
      ],
      techTitle: 'Technologies We Use for SaaS Development',
      techItems: [
        {
          title: 'React & Modern Frontend Frameworks',
          desc: 'React and modern frontend frameworks for responsive user experiences.',
        },
        {
          title: 'Node.js & Backend Architecture',
          desc: 'Node.js and backend technologies for scalable application logic.',
        },
        {
          title: 'AWS Cloud Services',
          desc: 'AWS cloud services for reliable infrastructure.',
        },
        {
          title: 'PostgreSQL Databases',
          desc: 'PostgreSQL databases for secure and structured data management.',
        },
        {
          title: 'Stripe & Payment Gateways',
          desc: 'Stripe and payment APIs for subscription-based platforms.',
        },
      ],
      whyChooseTitle: 'Why SaaS Teams Choose Cubixsol',
      whyChooseItems: [
        {
          title: 'Experience With Modern SaaS Architecture',
          desc: 'Our developers understand SaaS requirements, including cloud infrastructure, subscription models, and scalable application design.',
        },
        {
          title: 'Flexible Development Approach',
          desc: 'We build solutions that adapt to changing business needs, new features, and increasing customer demands.',
        },
        {
          title: 'Security-Focused Solutions',
          desc: 'Our development process prioritizes secure coding practices, data protection, and reliable system performance.',
        },
        {
          title: 'Continuous Technical Support',
          desc: 'Cubixsol provides ongoing improvements, maintenance, and technical guidance after product launch.',
        },
      ],
      faqs: [
        {
          q: 'How much does SaaS development cost?',
          a: 'SaaS development costs depend on product complexity, features, integrations, design requirements, and technical architecture. An MVP requires a different budget compared with a large-scale SaaS platform with advanced features.',
        },
        {
          q: 'How long does it take to develop a SaaS MVP?',
          a: 'The timeline depends on the number of features, platform complexity, and testing requirements. A focused MVP can usually be developed within a few weeks to several months.',
        },
        {
          q: 'What is included in SaaS development services?',
          a: 'SaaS development services include product planning, UI/UX design, frontend and backend development, cloud deployment, integrations, testing, and post-launch support.',
        },
        {
          q: 'Can SaaS applications support multiple customers?',
          a: 'Yes, SaaS applications can use multi-tenant architecture to support multiple customers securely. Each customer receives separate access while sharing the same application infrastructure.',
        },
        {
          q: 'How does Cubixsol build scalable SaaS applications?',
          a: 'We use modular architecture, cloud infrastructure, optimised databases, and scalable development practices to create SaaS applications that support future growth.',
        },
      ],
      seo: {
        metaTitle: 'SaaS Development Company for Scalable Digital Products | Cubixsol',
        metaDescription: 'Expert SaaS development services for B2B, vertical, and enterprise SaaS platforms. Multi-tenant architecture, Stripe subscription billing, and cloud engineering.',
        keywords: 'saas development company, saas development services, multi-tenant saas architecture, saas mvp development, subscription billing software',
      },
    };

    const updated = await Industry.findOneAndUpdate(
      { slug: 'saas' },
      { $set: saasData },
      { upsert: true, new: true }
    );

    console.log('✓ Successfully updated "saas" Industry in MongoDB:', updated.title);
    await mongoose.disconnect();
    console.log('Done.');
  } catch (err) {
    console.error('Error updating SaaS industry content:', err);
    process.exit(1);
  }
}

updateSaasContent();
