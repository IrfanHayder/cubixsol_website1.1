const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Service = require('./models/Service');
const PageContent = require('./models/PageContent');

async function seedShopifyDevelopment() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB.');

    const shopifyServiceData = {
      slug: 'shopify-development',
      title: 'Shopify Store Development',
      cardTitle: 'Shopify Development',
      menuTitle: 'Shopify Development',
      icon: 'ShoppingBag',
      color: 'text-emerald-600 bg-emerald-50',
      gradient: 'from-emerald-500 to-teal-600',
      heroImage: 'https://images.unsplash.com/photo-1556742049-0a67e55722c0?auto=format&fit=crop&w=1200&h=800&q=75',
      desc: "Shopify is the premier eCommerce platform empowering businesses of all sizes to build, manage, and scale global online stores. Whether launching an ambitious startup or scaling an established brand, Shopify provides a rock-solid, secure, and user-friendly foundation to sell products worldwide.",
      longDesc: "At **Cubixsol**, we offer full-lifecycle **Shopify Development Services** designed to create seamless, high-converting, and attractive stores that captivate target customers. As a reliable Shopify development partner, we combine customized store development, responsive theme design, and bespoke app integrations to boost your store operations with attractive website design and advanced functionalities.",
      ctaPrimaryText: 'Talk to an Expert',
      ctaSecondaryText: 'Explore Shopify Services',
      features: [
        '1K+ Clients around the world',
        '30+ Award Winning',
        '97% Business Growth',
        '60+ Team Members',
      ],
      whyChooseTitle: 'Why Choose Cubixsol For Shopify Development',
      whyChooseIntro: 'We combine eCommerce strategy, pixel-perfect Liquid theme engineering, custom app development, and conversion rate optimization to build revenue-driving online stores.',
      whyChooseItems: [
        {
          title: '1K+ Clients around the world',
          desc: 'Trusted by global DTC brands, high-growth startups, and multi-channel retailers worldwide for scalable Shopify storefronts.',
        },
        {
          title: '30+ Award Winning',
          desc: 'Recognized internationally for exceptional UI/UX design, custom theme performance, and headless Shopify solutions.',
        },
        {
          title: '97% Business Growth',
          desc: 'Our clients experience record-breaking conversion improvements, faster page loads, and sustained sales momentum.',
        },
        {
          title: '60+ Team Members',
          desc: 'Dedicated Shopify experts, certified Liquid developers, full-stack engineers, and conversion rate specialists.',
        },
      ],
      serviceProcessTitle: 'How We Work On Shopify Development',
      serviceProcessIntro: 'Our proven 4-stage development methodology delivers pixel-perfect, revenue-driven storefronts on time and within budget.',
      serviceProcessSteps: [
        {
          stepNumber: '01',
          title: 'Consultation and discussing the requirement',
          desc: 'As such, you tell us what you expect from Shopify custom development for your business. We assess your needs and provide numerous options so that you can select the most effective and affordable solution.',
        },
        {
          stepNumber: '02',
          title: 'Timetable and price approval',
          desc: 'Together we finalize the plan, milestones, deadlines, and cost for your unique Shopify website development based on the number of hours needed to complete the project.',
        },
        {
          stepNumber: '03',
          title: 'Development and implementation',
          desc: 'We use a step-by-step development strategy to give initial results as quickly as feasible. You will be informed of each phase, the logical areas of functionality will be sent to the operational team only after approval by you.',
        },
        {
          stepNumber: '04',
          title: 'Warranty and post-release support',
          desc: 'The major purpose of all of our Shopify development services is to ensure that the project works as planned and generates cash for you, thus we accept inquiries and feedback even after the project is completed.',
        },
      ],
      subServicesTitle: 'Our Shopify Services',
      subServicesIntro: 'When you are building a new business, you need the custom Shopify development services that help you to grow your business online. At Cubixsol, we offer you the best Shopify services that cover the launch, customize, and growth of your Shopify eCommerce store online. Our Shopify custom development & design services include the customization of themes, app integration, and SEO optimization in the search engines to boost your business organically. Our team of top Shopify developers provides you the ongoing support to fix the issues that you face during live eCommerce store creation.',
      subServicesItems: [
        {
          title: 'Custom Shopify Theme Development',
          desc: 'An attractive Shopify ecommerce website development is the foundation of your business success. At Cubixsol, our custom Shopify theme development services focus on building an attractive, high-performance theme that meets your brand visibility and business goals. Our customized Shopify theme ensures your eCommerce store is more attractive and user-friendly. Our Shopify experts make your website efficient and make your site mobile-friendly.',
        },
        {
          title: 'Theme Customization',
          desc: 'If you already have a Shopify theme and want to increase the features and look, our theme customization services offer you the perfect solution. Our best Shopify developers upgrade the existing theme that match your business requirements and goals. Shopify themes come with the best customization options but do not optimize your store, expert modifications make your eCommerce store attractive. At Cubixsol, we ensure that your Shopify e-commerce store is responsive.',
        },
        {
          title: 'App Integrations',
          desc: "With seamless app integrations, you can easily increase your store's features. The Shopify app ecosystem includes many Shopify developer tools for advertising, payments, management of stocks, analytics, and customer service. However, integrating several apps while maintaining the performance of your store. Our web designer Shopify implements the Shopify ecommerce website design element that helps to improve user engagement and increase the best conversions.",
        },
        {
          title: 'Ongoing Support',
          desc: "Our team of Shopify experts, developers, focuses on integrating third-party apps and APIs to increase your business's features while maintaining the speed or security of your online business. If you require complex email marketing automation, AI-powered chatbots, social media sales channels, or CRM connection, we assure a smooth installation that fits into your business process.",
        },
        {
          title: 'Custom Shopify Apps',
          desc: 'Our Shopify app development and integration services enable businesses to create effective apps that enhance the performance of their Shopify store. We provide custom Shopify apps that meet unique requirements, such as automated inventory tracking, personalized discounts, price change, and a variety of platforms. We also integrate third-party apps, ensuring that they perform seamlessly with your Shopify store without slowing it down.',
        },
        {
          title: 'Shopify Migration Services',
          desc: 'If you want to move your store from a different platform to Shopify, our Shopify migration services will make the process go smoothly. Migration between systems such as WooCommerce, Magento, BigCommerce, or OpenCart might be difficult, but our staff can manage all that from product transfers to customer data migration, history of transactions, SEO retention, and design replication.',
        },
        {
          title: 'Shopify SEO & Performance Optimization',
          desc: "An effective Shopify store is only useful if it appears among the top search results and has quick-loading pages. Our Shopify SEO and performance optimization services boost your store's presence in search engines while providing an excellent user experience. We optimize site speed, simplify navigation and increase mobile responsiveness.",
        },
        {
          title: 'Shopify Dropshipping Store Setup',
          desc: 'Our professionals set up supplier integrations, product listings, payment gateways, and marketing tools to get your store ready for business. Whether you want to sell fashion, electronics, beauty products, or specialty items, we will create a professional Shopify store that is optimized for dropshipping success. Our dropshipping solutions allowing entrepreneurs to easily begin and expand a profitable online business.',
        },
      ],
      businessTypesTitle: 'Key Feature We Follow To Help You Succeed',
      businessTypesIntro: 'Our core development principles and performance safeguards guarantee superior shopper experience, high checkout conversion, and smooth store management.',
      businessTypesItems: [
        {
          title: 'Detailed Business Analysis',
          desc: 'Based on your specifications and desired outcome, we develop a well-thought-out strategy that includes an extensive awareness of the operations of every part.',
        },
        {
          title: 'User-Centered Design',
          desc: 'With a smart Shopify front-end development technique, we can make your new Shopify design attractive. Easy-to-use methodology eliminates the possibility of losing a consumer owing to an unattractive storefront.',
        },
        {
          title: 'Mobile-First Approach',
          desc: 'With the majority of eCommerce transactions occurring on mobile devices, our responsive Shopify architectures ensure blazing-fast mobile rendering, touch-optimized checkout, and zero layout shifts.',
        },
        {
          title: 'Ongoing Support and Consulting',
          desc: "Our Shopify development agency will always be here to assist you. Don't be afraid to ask questions or raise concerns — the more we know, the more reliable the result.",
        },
        {
          title: 'Proactive Maintenance Plans',
          desc: "Building an appealing Shopify store with your Shopify development partner is only the first step. Customers' needs are continuously changing, and we are ready to build on success.",
        },
        {
          title: 'Site Speed & Seo Optimization',
          desc: 'Optimisation is important for both search engines and consumers. With custom features, we add new ones without affecting the loading performance.',
        },
      ],
      tech: ['Shopify Plus', 'Liquid Engine', 'Hydrogen & Oxygen', 'Storefront API', 'GraphQL', 'Tailwind CSS', 'Klaviyo', 'Recharge', 'Stripe', 'Node.js'],
      techTitle: 'Trusted Brands, Integrations & Ecosystem',
      techDesc: 'We integrate with leading eCommerce tools, payment processors, and marketing automation platforms to build high-converting shopping experiences.',
      supportedPlatforms: [
        { name: 'Shopify Plus', category: 'Enterprise eCommerce', icon: 'shopify plus' },
        { name: 'Klaviyo', category: 'Email & SMS Marketing', icon: 'klaviyo' },
        { name: 'Recharge', category: 'Subscription Billing', icon: 'recharge' },
        { name: 'Gorgias', category: 'Customer Support Helpdesk', icon: 'gorgias' },
        { name: 'Yotpo', category: 'Reviews & Loyalty', icon: 'yotpo' },
        { name: 'Stripe', category: 'Payment Gateway', icon: 'stripe' },
        { name: 'PageFly', category: 'Advanced Page Builder', icon: 'pagefly' },
        { name: 'Shogun', category: 'Visual Storefront Builder', icon: 'shogun' },
        { name: 'Loox', category: 'Photo Reviews', icon: 'loox' },
        { name: 'Judge.me', category: 'Product Reviews', icon: 'judge.me' },
      ],
      faqs: [
        {
          q: 'How can I calculate the cost of developing a Shopify website on my own?',
          a: 'To calculate the cost of developing a Shopify website, consider expenses like Shopify plan fees, theme costs, app subscriptions, domain, hosting, and potential development tools.',
        },
        {
          q: "What's the best way to find an experienced Shopify designer for my eCommerce business?",
          a: 'The best way to find an experienced Shopify designer is through freelance platforms (Upwork, Fiverr), Shopify Experts Marketplace, or agency directories specializing in eCommerce design.',
        },
        {
          q: 'What services do professional Shopify web design companies typically offer?',
          a: 'Professional Shopify web design companies typically offer services like custom theme design, store setup, app integration, SEO optimization, conversion rate optimization, and ongoing maintenance.',
        },
      ],
      ctaBannerEyebrow: 'E-COMMERCE EXCELLENCE',
      ctaBannerTitle: 'We create attractive and intuitive user experiences that enhance customer satisfaction and brand-seeking',
      ctaBannerDesc: 'Let our team of certified Shopify developers transform your online storefront into a high-converting, scalable eCommerce powerhouse.',
      ctaBannerButtonText: 'Talk to an Expert',
      ctaBannerButtonLink: '/contact#contact-form',
      seo: {
        metaTitle: 'Shopify Store Development Services | Custom Shopify Developers | Cubixsol',
        metaDescription: 'Expert Shopify store development, custom theme development, app integrations, migration, and performance optimization by Cubixsol.',
        keywords: 'Shopify development, custom Shopify store, Shopify theme development, Shopify app integration, Shopify migration, eCommerce developers',
      },
    };

    // Upsert into Service collection
    const updatedService = await Service.findOneAndUpdate(
      { slug: 'shopify-development' },
      { $set: shopifyServiceData },
      { upsert: true, new: true }
    );
    console.log('✓ Service "shopify-development" updated in MongoDB successfully:', updatedService.title);

    // Upsert into PageContent collection
    await PageContent.findOneAndUpdate(
      { slug: 'shopify-development' },
      {
        $set: {
          slug: 'shopify-development',
          title: 'Shopify Store Development',
          heroTitle: 'Shopify Store Development',
          heroDesc: shopifyServiceData.desc,
          content: shopifyServiceData.longDesc,
        },
      },
      { upsert: true }
    );
    console.log('✓ PageContent "shopify-development" updated in MongoDB successfully.');

    await mongoose.disconnect();
    console.log('Done.');
  } catch (err) {
    console.error('Error seeding Shopify development:', err);
    process.exit(1);
  }
}

seedShopifyDevelopment();
