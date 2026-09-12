require('dotenv').config();
const mongoose = require('mongoose');
const Solution = require('./models/Solution');

async function updateVoiceCommerce() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB.');

    const updatePayload = {
      name: 'Voice Commerce',
      title: 'Voice Commerce',
      heroTitle: 'Voice Commerce Services for Modern Brands',
      group: 'E-Commerce',
      category: 'E-Commerce',
      desc: 'Our team creates voice experiences for product search, shopping, ordering, customer support, and repeat purchases. Each solution can support a new eCommerce product, an existing online store, or a wider customer experience project.',
      ctaPrimaryText: 'Book a Call',
      ctaPrimaryLink: '/contact',
      ctaSecondaryText: 'Get a Free Assessment',
      ctaSecondaryLink: '/contact',

      subServicesTitle: 'Our Voice Commerce Capabilities',
      subServicesIntro: 'Our team creates voice experiences for product search, shopping, ordering, customer support, and repeat purchases. Each solution can support a new eCommerce product, an existing online store, or a wider customer experience project.',
      subServicesItems: [
        {
          title: 'Voice Shopping',
          desc: 'Voice shopping lets customers search for products, check details, and complete common shopping tasks using spoken commands. We can support product search, recommendations, cart actions, order placement, and repeat purchases.\n\nRepeat ordering can also make regular purchases easier. Customers can use voice commands to find products they buy often and place another order without going through every shopping step.'
        },
        {
          title: 'Voice Assistants',
          desc: 'Our team develops voice experiences for platforms such as Alexa and Google. Voice commands can support product searches, order checks, product questions, and other common shopping requests.\n\nCustomers get another way to interact with your business without starting every task on a website or mobile app. Clear commands and simple responses help keep each interaction easy to follow.'
        },
        {
          title: 'Voice Search',
          desc: 'Voice search allows customers to find products and information through spoken requests. We can connect search features with your product catalogue, website, or eCommerce platform.\n\nSearch can cover product names, categories, prices, features, availability, and other store information. Customers can reach useful product details with fewer steps.'
        },
        {
          title: 'Integration',
          desc: 'Voice features work best when they connect with the systems your business already uses. Our developers can integrate voice experiences with eCommerce platforms, product databases, order systems, customer support tools, and other business software.\n\nBusinesses can also use our eCommerce development services when a wider online shopping solution is required. Conversational commerce can connect voice interactions with product discovery, customer questions, and shopping actions.'
        }
      ],

      useCasesTitle: 'Use Cases',
      useCasesIntro: 'Voice commerce can support practical shopping tasks across different industries. Customers can search for products, place orders, reorder regular purchases, check order details, and ask product-related questions through voice commands.\n\nHands-free shopping can help when typing or browsing is not convenient. Repeat ordering can also simplify purchases for products customers buy regularly. Businesses can use voice experiences for product discovery, order support, customer service, and other common interactions.',
      useCasesItems: [
        {
          title: 'Voice Shopping & Reordering',
          desc: 'Customers can search for products, place orders, and reorder regular purchases using spoken commands without manual browsing.'
        },
        {
          title: 'Order Support & Tracking',
          desc: 'Check order details, shipping status, and ask product-related questions through connected voice assistants.'
        },
        {
          title: 'Hands-Free Product Discovery',
          desc: 'Find products and explore catalogues when typing or browsing is not convenient, simplifying everyday shopping.'
        }
      ],

      techTitle: 'Tools & Tech',
      techDesc: 'Our voice technology stack can include Alexa Skills, Google Actions, and speech APIs. Tool selection depends on your required platforms, voice features, eCommerce system, product data, and customer journey.\n\nExisting APIs and business systems can also be connected when your project needs product information, order data, customer accounts, or other live business data.',
      tech: ['Alexa Skills', 'Google Actions', 'Speech APIs'],

      process: {
        title: 'How We Deliver',
        subtitle: 'Our structured process to discover, design, build, deploy, and refine voice commerce solutions.',
        steps: [
          {
            stepNumber: '01',
            title: 'Discover',
            desc: 'We begin by reviewing your business goals, products, customers, existing systems, required platforms, and voice features. Early planning helps define the main functions before development starts.',
            bullets: []
          },
          {
            stepNumber: '02',
            title: 'Design',
            desc: 'Our team plans voice commands, responses, user journeys, product searches, and shopping actions. Each flow focuses on simple conversations and clear steps for common customer tasks.',
            bullets: []
          },
          {
            stepNumber: '03',
            title: 'Build',
            desc: 'Developers create the voice experience and connect it with the required business systems. We develop each feature in clear stages and review key functions during development.',
            bullets: []
          },
          {
            stepNumber: '04',
            title: 'Deploy',
            desc: 'We test the solution across supported platforms and review voice commands, responses, integrations, and shopping flows before launch. Approved builds are prepared for deployment after testing is complete.',
            bullets: []
          },
          {
            stepNumber: '05',
            title: 'Monitor & Improve',
            desc: 'Post-launch support can include performance checks, issue resolution, updates, and new features. Usage data and customer feedback can help identify areas for future improvements.',
            bullets: []
          }
        ]
      },

      whyChooseTitle: 'Why Choose Cubixsol?',
      whyChooseIntro: '',
      whyChooseItems: [
        {
          title: 'Development Expertise',
          desc: 'Our team works across AI, eCommerce, application development, and system integration. We focus on useful voice features linked to real customer and business needs.'
        },
        {
          title: 'Security and Compliance',
          desc: 'Security remains part of the development process. We consider data access, user permissions, system connections, and relevant compliance needs when planning your solution.'
        },
        {
          title: 'Business Value',
          desc: 'Voice features can make common shopping tasks easier, support repeat purchases, and give customers another way to interact with your business. We focus on practical functions with clear business value.'
        },
        {
          title: 'Ongoing Support',
          desc: 'Our work can continue after launch through monitoring, bug fixes, updates, integration support, and new features. Ongoing technical support helps keep your voice experience reliable as your business needs change.\n\nBusinesses can also explore our AI solutions or connect voice features with AI chatbot support for broader customer service needs.'
        }
      ],

      ctaBannerEyebrow: 'READY TO GET STARTED?',
      ctaBannerTitle: 'Ready to Get Started?',
      ctaBannerDesc: 'Add **voice commerce** to your customer experience with a solution built around your business needs. Tell us what you want to offer through voice, and our team can help define the right development approach.',
      ctaBannerButtonText: 'Book a Call',
      ctaBannerButtonLink: '/contact',
      ctaBannerSecondaryButtonText: 'Get a Free Assessment',
      ctaBannerSecondaryButtonLink: '/contact',

      faqs: [
        {
          q: 'What is voice commerce?',
          a: 'Voice commerce allows customers to use spoken commands for shopping tasks such as product search, product information, ordering, reordering, and order updates. Businesses can offer these functions through voice assistants and connected digital systems.'
        },
        {
          q: 'How much does voice commerce development cost?',
          a: 'Cost depends on the number of features, supported platforms, integrations, and level of custom development required. A basic voice search feature usually requires less development than a complete shopping system with product search, ordering, customer accounts, and eCommerce integration. We review your requirements before providing an estimate.'
        },
        {
          q: 'Which voice platforms can Cubixsol support?',
          a: 'Cubixsol can develop voice experiences for platforms such as Alexa and Google, along with speech APIs and other required technologies. Platform selection depends on your customers, business systems, required features, and planned voice experience.'
        },
        {
          q: 'How long does voice commerce development take?',
          a: 'The timeline depends on project scope and technical requirements. A focused voice search feature may take less time than a complete solution involving product search, ordering, customer accounts, payments, and eCommerce integration. We provide a project timeline after reviewing your requirements.'
        },
        {
          q: 'What ROI can a business expect from voice commerce?',
          a: 'ROI depends on your products, customers, use cases, and customer adoption. Voice features can reduce steps in common shopping tasks, support repeat orders, and give customers another way to interact with your business. We can help define measurable goals for your voice commerce project before development starts.'
        }
      ]
    };

    const doc = await Solution.findOneAndUpdate(
      { slug: 'voice-commerce' },
      { $set: updatePayload },
      { new: true, upsert: true }
    );

    console.log('Successfully updated voice-commerce in MongoDB:', doc.title, doc.slug);
    process.exit(0);
  } catch (err) {
    console.error('Error updating voice-commerce:', err);
    process.exit(1);
  }
}

updateVoiceCommerce();
