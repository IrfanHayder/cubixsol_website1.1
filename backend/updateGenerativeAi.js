require('dotenv').config();
const mongoose = require('mongoose');
const Solution = require('./models/Solution');

async function updateGenerativeAi() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB.');

    const updatePayload = {
      name: 'Generative AI',
      title: 'Generative AI Development Services for Business Applications',
      heroTitle: 'Generative AI Development Services for Business Applications',
      description: 'Generative AI uses advanced models to create content, answer questions, summarise information, and process business data. Businesses can use these capabilities to reduce repetitive work, improve access to knowledge, and add useful AI features to products and internal systems. Cubixsol develops AI solutions around specific business needs. Our team reviews users, workflows, data, existing software, and required features before choosing the right development approach.',
      ctaPrimaryText: 'Book a Call',
      ctaPrimaryLink: '/contact',
      ctaSecondaryText: 'Get a Free Assessment',
      ctaSecondaryLink: '/contact',

      subServicesTitle: 'Our Generative AI Capabilities',
      subServicesIntro: 'Our team develops applications for content creation, business knowledge, customer support, document processing, and other AI-powered workflows.',
      subServicesItems: [
        {
          title: 'LLM Apps',
          desc: 'Our LLM development services help businesses build applications using large language models for text generation, question answering, summarisation, research, and information processing. Applications can also include structured outputs, business rules, and user permissions where required.'
        },
        {
          title: 'Custom Chatbots',
          desc: 'AI chatbots can help customers find information, answer common questions, and interact with business services. Internal chatbots can also help employees access company information and documents. Clear response rules help keep conversations focused and useful for the intended audience.'
        },
        {
          title: 'Custom AI Development Services',
          desc: 'Custom AI development services help businesses add AI features around specific tasks and workflows. Solutions can support customer service, research, content work, document handling, internal operations, and product features. Our team reviews the process, then selects suitable models, tools, integrations, and data sources.'
        },
        {
          title: 'Content Generation',
          desc: 'Generative AI can help teams prepare product descriptions, email drafts, summaries, reports, and marketing content. AI can handle initial content work while human review remains part of the approval process. Cubixsol can add content generation features to internal platforms or customer-facing applications.'
        },
        {
          title: 'RAG and Knowledge Solutions',
          desc: 'RAG, or Retrieval-Augmented Generation, connects an AI application with selected business information. Users can ask questions and receive responses based on approved documents, knowledge bases, product information, or internal resources. Our developers can build RAG solutions with document processing, search, data retrieval, and response generation. This approach can also help keep answers connected to current business information stored in approved sources.'
        },
        {
          title: 'Fine-Tuning',
          desc: 'Fine-tuning can improve a model for a specific task when suitable training data is available. Cubixsol reviews the use case, data, model requirements, and expected results before recommending this approach.'
        }
      ],

      useCasesTitle: 'Use Cases',
      useCasesIntro: '',
      useCasesItems: [
        {
          title: 'Domain Copilots',
          desc: 'AI copilots can help employees search information, summarise documents, prepare drafts, and complete common tasks within a specific business area.'
        },
        {
          title: 'Document AI',
          desc: 'Document AI can process contracts, reports, forms, invoices, and other business files. AI can extract key details and create summaries across large document collections.'
        },
        {
          title: 'Content Automation',
          desc: 'Content automation can support repeated writing and editing tasks for marketing, product, sales, and support teams.'
        }
      ],

      techTitle: 'Tools & Tech',
      techDesc: 'Our Generative AI technology stack can include GPT, Claude, LangChain, vector databases, and RAG. AI models can connect with APIs, databases, business applications, and knowledge sources as required.',
      tech: ['GPT', 'Claude', 'LangChain', 'Vector Databases', 'RAG'],

      process: {
        title: 'How We Deliver',
        subtitle: 'Our structured process to discover, design, build, deploy, and refine generative AI solutions.',
        steps: [
          {
            stepNumber: '01',
            title: 'Discover',
            desc: 'We review your business goal, users, workflow, available data, existing systems, required features, and technical requirements. Discovery helps define project scope and suitable AI capabilities.',
            bullets: []
          },
          {
            stepNumber: '02',
            title: 'Design',
            desc: 'Our team plans the application flow, AI features, data sources, integrations, user experience, and technical structure before development begins.',
            bullets: []
          },
          {
            stepNumber: '03',
            title: 'Build',
            desc: 'Developers build the AI application and connect required models, data sources, APIs, and business systems.',
            bullets: []
          },
          {
            stepNumber: '04',
            title: 'Deploy',
            desc: 'We prepare the solution for its production environment after testing core features and integrations.',
            bullets: []
          },
          {
            stepNumber: '05',
            title: 'Monitor and Improve',
            desc: 'Our team can review response quality, system performance, user feedback, and technical issues after launch.',
            bullets: []
          }
        ]
      },

      whyChooseTitle: 'Why Choose Cubixsol?',
      whyChooseIntro: '',
      whyChooseItems: [
        {
          title: 'AI Development Expertise',
          desc: 'Our team works across Generative AI, LLM applications, chatbots, RAG, automation, and software integrations. We focus on practical applications with a clear business purpose.'
        },
        {
          title: 'Security and Data Controls',
          desc: 'AI solutions may work with company documents, customer information, and internal data. Our development approach considers access permissions, data handling, and relevant security requirements.'
        },
        {
          title: 'Focus on Business Value',
          desc: 'Cubixsol focuses on useful areas such as repetitive tasks, information access, content work, document processing, and customer support.'
        },
        {
          title: 'Ongoing Support',
          desc: 'Support can continue after deployment with monitoring, issue resolution, performance improvements, model updates, and new features as your application develops.'
        }
      ],

      ctaBannerEyebrow: 'READY TO GET STARTED?',
      ctaBannerTitle: 'Ready to Get Started?',
      ctaBannerDesc: 'Looking for **generative AI development services** for a product, workflow, or business application? Share your requirements with Cubixsol and discuss the right AI approach for your project solutions.',
      ctaBannerButtonText: 'Book a Call',
      ctaBannerButtonLink: '/contact',
      ctaBannerSecondaryButtonText: 'Get a Free Assessment',
      ctaBannerSecondaryButtonLink: '/contact',

      faqs: [
        {
          q: 'How much do generative AI development services cost?',
          a: 'Cost depends on features, AI model, data requirements, integrations, security needs, and project scope. Cubixsol reviews your requirements before preparing an estimate.'
        },
        {
          q: 'What data is needed for a Generative AI solution?',
          a: 'Projects may use company documents, product information, databases, knowledge bases, customer support content, or other approved sources. Our team can review available data before development.'
        },
        {
          q: 'How secure are Generative AI solutions?',
          a: 'Security depends on the model, data sources, infrastructure, integrations, and user access rules. Cubixsol considers data access, permissions, secure integrations, and relevant controls during development.'
        },
        {
          q: 'What is the difference between Generative AI and AI agents?',
          a: 'Generative AI can create content, answer questions, summarise information, and process requests. AI agents can also perform actions across multiple steps and interact with connected systems.'
        },
        {
          q: 'How long does Generative AI development take?',
          a: 'The timeline depends on project scope, data preparation, model requirements, integrations, testing, and features. A focused AI feature may take less time than a complete application with custom workflows and multiple system connections.'
        }
      ]
    };

    const doc = await Solution.findOneAndUpdate(
      { slug: 'generative-ai' },
      { $set: updatePayload },
      { new: true, upsert: true }
    );

    console.log('Successfully updated generative-ai in MongoDB:', doc.name, doc.slug);
    process.exit(0);
  } catch (err) {
    console.error('Error updating generative-ai:', err);
    process.exit(1);
  }
}

updateGenerativeAi();
