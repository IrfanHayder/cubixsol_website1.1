const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Industry = require('./models/Industry');
const Service = require('./models/Service');

async function updateEcommerceContent() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('Connected.');

    const ecommerceData = {
      heroTitle: 'E-Commerce Development Services for Growing Businesses',
      title: 'E-Commerce',
      slug: 'ecommerce',
      icon: 'ShoppingCart',
      short: 'Cubixsol provides e-commerce development services to build secure, scalable, and conversion-focused digital commerce experiences. Our team develops custom stores, Shopify solutions, B2B commerce platforms, and e-commerce apps designed around your products, customers, and business goals.',
      desc: 'Cubixsol provides e-commerce development services to build secure, scalable, and conversion-focused digital commerce experiences. Our team develops custom stores, Shopify solutions, B2B commerce platforms, and e-commerce apps designed around your products, customers, and business goals.',
      points: [
        'Custom E-Commerce Stores & Multi-Vendor Marketplaces',
        'Shopify & WooCommerce Custom Theme & App Development',
        'B2B Wholesale Portals with Custom Pricing & Approval Flows',
        'Mobile Commerce Apps (iOS & Android) with 1-Click Checkout',
        'Stripe, PayPal, Apple Pay & Multi-Currency Payment Integrations',
        'High-Performance Headless Storefronts (Next.js & Hydrogen)',
      ],
      solutionsTitle: 'E-Commerce Software We Build',
      solutionsSubtitle: 'We develop tailor-made digital commerce solutions that drive sales, streamline operations, and deliver flawless customer experiences across devices.',
      solutionsItems: [
        {
          title: 'Custom E-Commerce Stores',
          body: 'We create custom e-commerce stores for businesses that need functionality beyond standard templates. Our solutions can support custom product catalogues, customer accounts, promotions, inventory workflows, third-party integrations, and unique purchasing journeys. Each store can align with your brand and operational requirements.',
        },
        {
          title: 'Shopify Development Services',
          body: 'Our Shopify development services launch, customise, and expand Shopify stores without sacrificing user experience or performance. We can customise storefronts, integrate essential apps, improve product pages, and create features that support specific business requirements. Shopify also provides a practical foundation for brands that want a flexible platform without managing the entire infrastructure themselves.',
        },
        {
          title: 'B2B E-Commerce Development',
          body: 'B2B ecommerce development services focus on the complex purchasing requirements of wholesalers, manufacturers, distributors, and enterprise sellers. Our experts can build features such as account-based pricing, bulk orders, customer-specific catalogues, approval workflows, recurring purchases, and business account management. The result is a commerce experience that simplifies purchasing for professional buyers.',
        },
        {
          title: 'E-Commerce App Development',
          body: 'E-commerce app development services extend your store experience to mobile customers. We can develop mobile commerce applications with product discovery, personalised accounts, secure payments, order tracking, push notifications, and other features that support repeat purchases. A well-structured app can give customers a convenient channel for browsing and purchasing products.',
        },
      ],
      techTitle: 'Tech We Use',
      techItems: [
        {
          title: 'Shopify',
          desc: 'Shopify supports fast, flexible store development. We customise themes, storefronts, apps, and integrations to create branded shopping experiences with reliable product management, payments, and third-party functionality.',
        },
        {
          title: 'WooCommerce',
          desc: 'WooCommerce offers flexible store development through WordPress. Our team builds customised stores with product catalogues, payment gateways, integrations, and features that support unique business requirements and customer experiences.',
        },
        {
          title: 'Next.js',
          desc: 'Next.js enables fast, scalable e-commerce websites with modern architecture. We use it for responsive storefronts, dynamic product pages, optimised performance, API integrations, and customised commerce functionality.',
        },
        {
          title: 'Stripe',
          desc: 'Stripe provides secure payment infrastructure for e-commerce platforms. We integrate Stripe for card payments, subscriptions, refunds, checkout experiences, and transaction workflows across online stores and applications.',
        },
      ],
      workAreasTitle: 'E-Commerce Use Cases & Examples',
      workAreas: [
        {
          title: 'D2C E-Commerce Stores',
          body: 'Direct-to-consumer brands can use custom commerce experiences to showcase products, manage customer accounts, support promotions, and create frictionless purchasing journeys.',
        },
        {
          title: 'B2B Commerce Portals',
          body: 'B2B businesses can provide buyers with personalised catalogues, negotiated pricing, bulk ordering, account management, and streamlined repeat purchasing.',
        },
        {
          title: 'E-Commerce Marketplaces',
          body: 'Marketplace businesses can connect multiple sellers with customers through product listings, seller accounts, payment workflows, order management, and centralised administration.',
        },
      ],
      whyChooseTitle: 'Why E-Commerce Teams Choose Cubixsol',
      whyChooseItems: [
        {
          title: 'E-Commerce Expertise',
          desc: 'Our team understands D2C, B2B, marketplace, payment, and customer experience requirements.',
        },
        {
          title: 'Custom Solutions',
          desc: 'We develop e-commerce platforms around your business model, workflows, customers, and growth objectives.',
        },
        {
          title: 'Security-Focused Development',
          desc: 'Our developers use secure practices and trusted payment integrations to protect commerce transactions.',
        },
        {
          title: 'Scalable Architecture',
          desc: 'Our solutions support growing traffic, larger catalogues, increased orders, and evolving business requirements.',
        },
        {
          title: 'Reliable Delivery',
          desc: 'Clear planning, regular communication, and structured development support a smooth path from requirements to launch.',
        },
        {
          title: 'Ongoing Support',
          desc: 'Our team provides technical support, improvements, integrations, and platform enhancements after your e-commerce solution goes live.',
        },
      ],
      ctaTitle: 'Ready to Build Your E-Commerce Platform?',
      ctaDesc: 'Cubixsol delivers e-commerce development services for D2C brands, B2B companies, marketplaces, and growing digital businesses. Talk to our e-commerce development team today and turn your commerce requirements into a scalable digital solution.',
      faqs: [
        {
          q: 'How much do e-commerce development services cost?',
          a: 'E-commerce development costs depend on platform choice, design requirements, integrations, functionality, and project complexity. A basic Shopify store can require less development work than a custom B2B platform or marketplace. We can assess your requirements and provide a project-specific estimate.',
        },
        {
          q: 'How long does e-commerce development take?',
          a: 'Development timelines vary according to the scope and technology stack. A standard store can reach launch faster than a custom platform with complex integrations, workflows, and business logic. A defined project scope allows the development team to provide a more accurate timeline.',
        },
        {
          q: 'Is Shopify better than custom e-commerce development?',
          a: 'Shopify can suit businesses that want a reliable commerce platform with faster deployment and a broad ecosystem of apps and integrations. Custom development can suit businesses with specialised workflows, complex integrations, or functionality that standard platforms cannot provide easily. The right choice depends on your business model, budget, technical requirements, and growth plans.',
        },
        {
          q: 'Can you integrate payment gateways into an e-commerce platform?',
          a: 'Yes. We can integrate payment gateways such as Stripe and other suitable providers into e-commerce platforms. Payment integration can support secure transactions, multiple payment methods, refunds, subscriptions, and other requirements based on the selected provider.',
        },
        {
          q: 'Can an e-commerce platform scale as the business grows?',
          a: 'A scalable architecture can support higher traffic, larger product catalogues, increased transaction volumes, and additional integrations. We consider performance, infrastructure, database architecture, APIs, and platform capabilities during development to support future growth.',
        },
      ],
    };

    // 1. Update Industry record
    await Industry.findOneAndUpdate(
      { slug: 'ecommerce' },
      { $set: ecommerceData },
      { upsert: true, new: true }
    );
    console.log('✓ Industry "ecommerce" updated successfully.');

    // 2. Also update Service record for ecommerce-solutions so both routes stay perfectly synced
    await Service.findOneAndUpdate(
      { slug: 'ecommerce-solutions' },
      {
        $set: {
          title: 'E-Commerce Development Services for Growing Businesses',
          cardTitle: 'E-Commerce Solutions',
          menuTitle: 'E-Commerce Solutions',
          desc: 'Cubixsol provides e-commerce development services to build secure, scalable, and conversion-focused digital commerce experiences. Our team develops custom stores, Shopify solutions, B2B commerce platforms, and e-commerce apps designed around your products, customers, and business goals.',
          longDesc: 'Cubixsol provides e-commerce development services to build secure, scalable, and conversion-focused digital commerce experiences. Our team develops custom stores, Shopify solutions, B2B commerce platforms, and e-commerce apps designed around your products, customers, and business goals.',
          subServicesTitle: 'E-Commerce Software We Build',
          subServicesIntro: 'We develop tailor-made digital commerce solutions that drive sales, streamline operations, and deliver flawless customer experiences across devices.',
          subServicesItems: ecommerceData.solutionsItems.map(s => ({ title: s.title, desc: s.body })),
          techTitle: 'Tech We Use',
          techDesc: 'We choose modern, proven e-commerce technologies and payment architectures tailored to your store scale, catalog complexity, and performance goals.',
          tech: ['Shopify', 'WooCommerce', 'Next.js', 'Stripe', 'React', 'Node.js', 'PostgreSQL', 'AWS'],
          businessTypesTitle: 'E-Commerce Use Cases & Examples',
          businessTypesIntro: 'Tailored digital commerce architectures for consumer brands, enterprise wholesalers, and multi-vendor marketplaces.',
          businessTypesItems: ecommerceData.workAreas.map(w => ({ title: w.title, desc: w.body })),
          whyChooseTitle: 'Why E-Commerce Teams Choose Cubixsol',
          whyChooseIntro: 'We combine commerce strategy with high-performance engineering to build stores that scale reliably.',
          whyChooseItems: ecommerceData.whyChooseItems,
          ctaBannerTitle: 'Ready to Build Your E-Commerce Platform?',
          ctaBannerDesc: 'Cubixsol delivers e-commerce development services for D2C brands, B2B companies, marketplaces, and growing digital businesses. Talk to our e-commerce development team today and turn your commerce requirements into a scalable digital solution.',
          faqs: ecommerceData.faqs,
        }
      },
      { upsert: true, new: true }
    );
    console.log('✓ Service "ecommerce-solutions" updated successfully.');

    await mongoose.disconnect();
    console.log('Done.');
  } catch (err) {
    console.error('Error updating ecommerce content:', err);
    process.exit(1);
  }
}

updateEcommerceContent();
