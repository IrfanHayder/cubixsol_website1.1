require('dotenv').config();
const mongoose = require('mongoose');
const Solution = require('./models/Solution');

async function updateSentimentAnalysis() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB.');

    const updatePayload = {
      name: 'Sentiment Analysis',
      title: 'Sentiment Analysis',
      heroTitle: 'Sentiment Analysis Services & AI Solutions',
      group: 'Artificial Intelligence',
      category: 'Artificial Intelligence',
      desc: 'Businesses can receive thousands of customer messages across different channels. Manual review makes repeated issues harder to spot. Our solutions process large volumes of text and organise results around your business needs, data sources, and reporting requirements.',
      ctaPrimaryText: 'Book a Call',
      ctaPrimaryLink: '/contact',
      ctaSecondaryText: 'Get a Free Assessment',
      ctaSecondaryLink: '/contact',

      subServicesTitle: 'Our Sentiment Analysis Services and Capabilities',
      subServicesIntro: 'Businesses can receive thousands of customer messages across different channels. Manual review makes repeated issues harder to spot. Our solutions process large volumes of text and organise results around your business needs, data sources, and reporting requirements.',
      subServicesItems: [
        {
          title: 'Sentiment Analysis',
          desc: 'Our sentiment analysis solutions classify customer text as positive, negative, or neutral. Reviews, survey responses, support messages, product feedback, and other text can be processed based on your use case.\n\nAnalysis can work at the message, review, or topic level. Results help teams find repeated complaints and positive comments.'
        },
        {
          title: 'Text Analytics Services',
          desc: 'Our text analytics services help businesses find useful information across large collections of unstructured text. Analysis can cover keywords, topics, common phrases, customer concerns, and sentiment.\n\nResults can feed reports, dashboards, search tools, or internal workflows. Teams can compare feedback across products, services, or campaigns. Clear reporting helps teams act on findings instead of reviewing raw text alone. We can also connect results to existing workflows and business tools when needed.'
        },
        {
          title: 'NLP Pipelines and NLP Services',
          desc: 'Our NLP services support systems built to process human language. We develop NLP pipelines for text cleaning, classification, topic detection, entity recognition, and sentiment analysis.\n\nPipelines can connect with applications, databases, APIs, and existing business systems.'
        },
        {
          title: 'Social Listening',
          desc: 'Social listening helps businesses track public conversations about brands, products, services, or campaigns. Sentiment analysis can show how people respond to a launch, campaign, service issue, or product change.\n\nConversations can be grouped by sentiment, topic, or source for faster review.'
        }
      ],

      useCasesTitle: 'Use Cases',
      useCasesIntro: 'Sentiment analysis can support customer, support, product, and marketing teams.',
      useCasesItems: [
        {
          title: 'Voice of Customer',
          desc: 'Customer reviews, surveys, support messages, and product feedback can show what people like and where problems occur. Sentiment analysis helps teams find common opinions and recurring complaints.'
        },
        {
          title: 'Support Triage',
          desc: 'Support teams receive messages across email, chat, forms, and other channels. Sentiment analysis can flag negative or urgent conversations for earlier review. Repeated negative feedback can highlight service problems.'
        },
        {
          title: 'Brand Monitoring',
          desc: 'Businesses can monitor public opinions across reviews and social platforms. Results help teams see customer responses to campaigns, product releases, and service changes.'
        }
      ],

      techTitle: 'Tools & Tech',
      techDesc: 'Our technology stack can include Python, spaCy, transformers, and cloud NLP tools. Tool selection depends on language needs, data sources, security, integrations, and data volume.',
      tech: ['Python', 'spaCy', 'Transformers', 'Cloud NLP Tools'],

      process: {
        title: 'How We Deliver',
        subtitle: 'Our structured process to discover, design, build, deploy, and refine sentiment analysis solutions.',
        steps: [
          {
            stepNumber: '01',
            title: 'Discover',
            desc: 'We review your business goals, data sources, analysis needs, target users, and required outputs. Early planning helps define project scope.',
            bullets: []
          },
          {
            stepNumber: '02',
            title: 'Design',
            desc: 'Our team plans the data flow, NLP approach, model requirements, integrations, and reporting structure. Clear planning defines how the solution will process and present results.',
            bullets: []
          },
          {
            stepNumber: '03',
            title: 'Build',
            desc: 'Developers create the required NLP pipelines, sentiment models, data workflows, and integrations. Testing takes place during development before release.',
            bullets: []
          },
          {
            stepNumber: '04',
            title: 'Deploy',
            desc: 'We prepare the solution for deployment and connect it with required applications, databases, or cloud environments. Deployment follows agreed technical and security requirements.',
            bullets: []
          },
          {
            stepNumber: '05',
            title: 'Monitor and Improve',
            desc: 'Post-launch checks help identify model issues and data changes. Our team can update models, improve processing rules, and fix technical issues.',
            bullets: []
          }
        ]
      },

      whyChooseTitle: 'Why Choose Cubixsol?',
      whyChooseIntro: '',
      whyChooseItems: [
        {
          title: 'Practical AI Expertise',
          desc: 'Our team develops AI and language-based solutions for specific business needs. We review your data and goals before selecting tools or building the solution.'
        },
        {
          title: 'Security and Compliance',
          desc: 'We consider data access, storage, permissions, and security requirements during solution planning.'
        },
        {
          title: 'Clear Business Value',
          desc: 'Our solutions can reduce manual feedback review, identify customer concerns faster, and give teams clearer customer insights.'
        },
        {
          title: 'Ongoing Support',
          desc: 'Support can continue after deployment through technical fixes, model updates, and system improvements.'
        }
      ],

      ctaBannerEyebrow: 'READY TO GET STARTED?',
      ctaBannerTitle: 'Ready to Get Started?',
      ctaBannerDesc: 'Need **sentiment analysis services** for customer feedback, support data, reviews, or brand monitoring? Cubixsol can help you plan and develop a solution around your data, systems, and business goals. Speak with our team about your requirements and goals.',
      ctaBannerButtonText: 'Book a Call',
      ctaBannerButtonLink: '/contact',
      ctaBannerSecondaryButtonText: 'Get a Free Assessment',
      ctaBannerSecondaryButtonLink: '/contact',

      faqs: [
        {
          q: 'How much do sentiment analysis services cost?',
          a: 'Cost depends on data volume, data sources, required features, language support, integrations, model requirements, and deployment needs. A focused solution usually needs less development than a larger system with custom models, dashboards, and integrations. We review your requirements before providing an estimate.'
        },
        {
          q: 'How accurate is sentiment analysis?',
          a: 'Accuracy depends on data quality, language, context, model selection, and text type. Customer reviews may contain sarcasm, mixed opinions, short comments, or industry-specific terms. Testing with real business data helps measure results and identify areas for improvement.'
        },
        {
          q: 'Can sentiment analysis support multiple languages?',
          a: 'Yes. Language support depends on the languages, available models, data quality, and project requirements. Our team can review your language needs and select suitable NLP tools or models.'
        },
        {
          q: 'What data sources can sentiment analysis analyse?',
          a: 'Sentiment analysis can process customer reviews, survey responses, support conversations, emails, social media content, product feedback, and other text-based data. Available integrations depend on the systems and data sources used by your business.'
        },
        {
          q: 'How long does sentiment analysis development take?',
          a: 'Project timelines depend on data preparation, solution scope, data sources, language requirements, integrations, and model needs. A focused solution may take less time than a larger platform with custom workflows and multiple integrations. We provide a project timeline after reviewing your requirements.'
        }
      ]
    };

    const doc = await Solution.findOneAndUpdate(
      { slug: 'sentiment-analysis' },
      { $set: updatePayload },
      { new: true, upsert: true }
    );

    console.log('Successfully updated sentiment-analysis in MongoDB:', doc.title, doc.slug);
    process.exit(0);
  } catch (err) {
    console.error('Error updating sentiment-analysis:', err);
    process.exit(1);
  }
}

updateSentimentAnalysis();
