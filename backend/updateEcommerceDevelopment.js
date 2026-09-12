require('dotenv').config();
const mongoose = require('mongoose');
const Solution = require('./models/Solution');

async function updateEcommerce() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB.');

    const updatePayload = {
      name: 'eCommerce Development',
      title: 'eCommerce Development Services',
      heroTitle: 'eCommerce Development Services',
      description: 'Storefronts and online commerce platforms built to convert visitors into customers and scale with your business growth. We build custom stores, Shopify experiences, headless setups, and B2B portals tailored to your operational workflows.',
      ctaPrimaryText: 'Book a Call',
      ctaPrimaryLink: '/contact',
      ctaSecondaryText: 'Request a Free Estimate',
      ctaSecondaryLink: '/contact',

      subServicesTitle: 'Our eCommerce Development Solution Capabilities',
      subServicesIntro: 'Our eCommerce development team builds online stores and commerce platforms for different business models.',
      subServicesItems: [
        {
          title: 'Custom eCommerce Store Development',
          desc: 'We build custom eCommerce stores around specific products, customer journeys, business processes, and technical requirements. Custom development suits businesses that need features beyond standard platform options. Our developers can connect payment systems, inventory tools, shipping services, customer platforms, and other business systems.'
        },
        {
          title: 'Shopify Development Services',
          desc: 'Shopify provides a flexible platform for businesses that want to launch or improve an online store. Our Shopify development services include store setup, theme customisation, feature development, payment integration, third-party apps, and platform improvements.'
        },
        {
          title: 'B2B eCommerce Development Services',
          desc: 'B2B businesses often need different buying features from standard retail stores. Customers may require business accounts, customer-specific pricing, bulk orders, repeat purchases, approval steps, or access to selected products. Our b2b ecommerce development services support these requirements through dedicated commerce portals and buying experiences. We can connect the platform with existing business systems and organise features around your sales process.'
        },
        {
          title: 'Headless Commerce Development',
          desc: 'Headless commerce separates the customer-facing interface from the commerce system behind it. This approach can suit businesses that need greater front-end control, custom shopping experiences, or connections across multiple digital channels. Our developers assess features, integrations, and performance needs before recommending a headless approach.'
        }
      ],

      useCasesTitle: 'Use Cases',
      useCasesIntro: '',
      useCasesItems: [
        {
          title: 'New Store Launch',
          desc: 'Launching a new online store requires the right platform, store structure, product setup, payment options, and customer journey. Cubixsol can develop the core commerce experience, connect required systems, and prepare the store for launch.'
        },
        {
          title: 'eCommerce Replatforming',
          desc: 'An existing platform may become difficult to manage or lack required features. Our team can move your store to a more suitable platform while rebuilding key functions and connecting essential integrations.'
        },
        {
          title: 'B2B Commerce Portals',
          desc: 'B2B customers often place larger orders and follow different buying processes. A dedicated commerce portal can support business accounts, bulk ordering, custom pricing, repeat purchases, and customer-specific requirements.'
        }
      ],

      techTitle: 'Tools & Tech',
      techDesc: 'Our eCommerce technology stack includes Shopify, WooCommerce, Next.js, and Stripe. We select tools according to the store model, required features, integrations, performance needs, and maintenance requirements.',
      tech: ['Shopify', 'WooCommerce', 'Next.js', 'Stripe'],

      process: {
        title: 'Our eCommerce Development Process',
        subtitle: 'Our structured process to discover, design, build, deploy, and scale successful eCommerce storefronts.',
        steps: [
          {
            stepNumber: '01',
            title: 'Discover',
            desc: 'We review your products, customers, business goals, current platform, required features, integrations, and technical requirements. Early discovery helps define the project scope.',
            bullets: []
          },
          {
            stepNumber: '02',
            title: 'Design',
            desc: 'Our team plans the store structure, user journeys, interface, navigation, product pages, and checkout experience. Design decisions focus on a clear and easy shopping process.',
            bullets: []
          },
          {
            stepNumber: '03',
            title: 'Build',
            desc: 'Developers build the agreed features and connect platforms, payment services, APIs, and business systems. Development takes place in structured stages.',
            bullets: []
          },
          {
            stepNumber: '04',
            title: 'Deploy',
            desc: 'We test product pages, navigation, forms, payments, customer accounts, checkout, and integrations before launch. We resolve identified issues before deployment.',
            bullets: []
          },
          {
            stepNumber: '05',
            title: 'Monitor and Improve',
            desc: 'Post-launch support can include bug fixes, platform updates, performance improvements, new features, and integration changes as your business requirements change.',
            bullets: []
          }
        ]
      },

      whyChooseTitle: 'Why Choose Cubixsol?',
      whyChooseIntro: '',
      whyChooseItems: [
        {
          title: 'eCommerce Development Expertise',
          desc: 'We focus on the business requirements behind each project and ongoing technical support for your store. Our team considers the store structure, customer journey, features, integrations, and platform needs before development begins.'
        },
        {
          title: 'Security and Compliance',
          desc: 'Secure payment handling and responsible data practices are important parts of eCommerce development. We use suitable platforms, payment services, and development practices to support secure transactions.'
        },
        {
          title: 'Focus on Business Value',
          desc: 'An eCommerce platform should support customers and internal business teams. We focus on useful features, simple shopping journeys, reliable functions, and integrations that support daily business needs.'
        },
        {
          title: 'Ongoing Technical Support',
          desc: 'Our support can continue after the store goes live through updates, bug fixes, new features, and performance improvements.'
        }
      ],

      ctaBannerEyebrow: 'READY TO GET STARTED?',
      ctaBannerTitle: 'Ready to Get Started?',
      ctaBannerDesc: 'Build or improve your online store with reliable **ecommerce development services** from Cubixsol. Tell us about your products, business goals, and technical requirements, and our team will help define the right development approach.',
      ctaBannerButtonText: 'Start Your eCommerce Project',
      ctaBannerButtonLink: '/contact',
      ctaBannerSecondaryButtonText: 'Request a Free Estimate',
      ctaBannerSecondaryButtonLink: '/contact',

      faqs: [
        {
          q: 'How much does eCommerce development cost?',
          a: 'eCommerce development costs depend on the platform, features, design, integrations, payment setup, and project scope. A basic store generally requires less work than a custom platform with B2B features or multiple integrations.'
        },
        {
          q: 'How long does it take to build an eCommerce website?',
          a: 'The timeline depends on the store size, platform, features, integrations, content, and testing requirements. A simple store can take less time than a custom B2B platform or large replatforming project.'
        },
        {
          q: 'Should I choose Shopify or custom eCommerce development?',
          a: 'Shopify can suit businesses looking for an established platform with room for customisation. Custom development can suit businesses with specific workflows or advanced requirements. We recommend an approach after reviewing your business and technical needs.'
        },
        {
          q: 'Which payment options can you integrate?',
          a: 'Payment options depend on your market, platform, and business requirements. Stripe is one payment option we can integrate where suitable. Our team can review your payment needs and connect the required service.'
        },
        {
          q: 'Can you scale an eCommerce platform as my business grows?',
          a: 'Yes. Platform selection, system structure, integrations, hosting, and development choices affect future growth. We consider current and future requirements when planning an eCommerce solution. Post-launch work can add features and integrations as your business expands.'
        }
      ]
    };

    const doc = await Solution.findOneAndUpdate(
      { slug: 'ecommerce-development' },
      { $set: updatePayload },
      { new: true, upsert: true }
    );

    console.log('Successfully updated ecommerce-development in MongoDB:', doc.name, doc.slug);
    process.exit(0);
  } catch (err) {
    console.error('Error updating ecommerce-development:', err);
    process.exit(1);
  }
}

updateEcommerce();
