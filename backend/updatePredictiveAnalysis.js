require('dotenv').config();
const mongoose = require('mongoose');
const Solution = require('./models/Solution');

async function updatePredictiveAnalysis() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB.');

    const updatePayload = {
      name: 'Predictive Analysis',
      title: 'Predictive Analysis',
      heroTitle: 'Predictive Analysis Services for Business Growth',
      group: 'Artificial Intelligence',
      category: 'Artificial Intelligence',
      desc: 'Our predictive analytics team builds solutions around specific business goals, available data, and existing workflows. Each capability can support a new analytics project, an existing data environment, or a wider business intelligence initiative.',
      ctaPrimaryText: 'Book a Call',
      ctaPrimaryLink: '/contact',
      ctaSecondaryText: 'Get a Free Assessment',
      ctaSecondaryLink: '/contact',

      subServicesTitle: 'Our Predictive Analysis Capabilities',
      subServicesIntro: 'Our predictive analytics team builds solutions around specific business goals, available data, and existing workflows. Each capability can support a new analytics project, an existing data environment, or a wider business intelligence initiative.',
      subServicesItems: [
        {
          title: 'Demand Forecasting',
          desc: 'Our demand forecasting services help businesses estimate future demand using historical sales, customer activity, seasonal trends, and other relevant data. Forecasts can support inventory planning, sales targets, staffing, and resource allocation.\n\nOur team reviews the available data and selects a suitable modelling approach for the business case. Regular model checks can also help keep forecasts useful as demand patterns change.'
        },
        {
          title: 'Risk Modeling',
          desc: 'Our predictive modeling services help businesses assess possible risks using historical patterns and relevant business data. Models can support risk scoring, early risk identification, and faster review of high-risk cases.\n\nWe consider the business process, available data, and required output before building the model. Results can then be connected with existing workflows to support faster risk-related decisions.'
        },
        {
          title: 'Churn Prediction',
          desc: 'Customer churn can affect revenue, retention, and long-term customer value. Our churn prediction solutions identify behaviour patterns linked with customers who may leave a product or service.\n\nTeams can use these insights to identify higher-risk customer groups and plan suitable retention actions. Model inputs can include customer activity, purchase history, service usage, and other relevant records.'
        },
        {
          title: 'Recommendation',
          desc: 'Recommendation solutions help businesses present relevant products, services, or content based on customer behaviour and preferences. Our team develops models around available customer data and the type of recommendation your platform needs.\n\nRecommendations can support product discovery, customer engagement, and sales across websites, applications, and other digital platforms. We also consider system integration requirements during development.'
        }
      ],

      useCasesTitle: 'Use Cases',
      useCasesIntro: 'Predictive analytics can support business decisions across sales, customer management, and risk control.',
      useCasesItems: [
        {
          title: 'Sales Forecasting',
          desc: 'Sales teams can use historical sales data and other business signals to estimate future results. Forecasts can support sales targets, revenue planning, stock decisions, and resource allocation.'
        },
        {
          title: 'Churn Reduction',
          desc: 'Customer behaviour data can help identify users with a higher likelihood of leaving. Teams can use these signals to prioritise retention work and take action before customer loss occurs.'
        },
        {
          title: 'Fraud and Risk Scoring',
          desc: 'Predictive models can review transaction, account, or activity data to identify patterns linked with higher risk. Risk scores can help teams focus reviews on cases requiring closer attention.'
        }
      ],

      techTitle: 'Tools & Tech',
      techDesc: 'Our technology stack includes Python, scikit-learn, XGBoost, and cloud ML tools. We select technologies based on the model requirements, data environment, performance needs, deployment plans, and existing systems.\n\nPython supports model development and data processing, while scikit-learn and XGBoost provide tools for building and testing machine learning models. Cloud ML environments can support scalable deployment and ongoing model management.',
      tech: ['Python', 'scikit-learn', 'XGBoost', 'Cloud ML Tools'],

      process: {
        title: 'How We Deliver Predictive Analytics Projects',
        subtitle: 'Our structured process to discover, design, build, deploy, and refine predictive analytics solutions.',
        steps: [
          {
            stepNumber: '01',
            title: 'Discover',
            desc: 'We begin by defining the business goal, prediction requirements, available data, existing systems, and key project needs. Early discovery helps the team establish a clear scope before development begins.',
            bullets: []
          },
          {
            stepNumber: '02',
            title: 'Design',
            desc: 'Our team reviews the data and selects a suitable modelling approach. We also plan data preparation, model testing, system integration, deployment, and project milestones.',
            bullets: []
          },
          {
            stepNumber: '03',
            title: 'Build',
            desc: 'Developers prepare the data, build predictive models, and test their performance. The team reviews results against the agreed business goals and makes required improvements during development.',
            bullets: []
          },
          {
            stepNumber: '04',
            title: 'Deploy',
            desc: 'Once the model meets the required performance level, we prepare it for deployment. Our team can connect the solution with relevant applications, databases, cloud platforms, or existing business workflows.',
            bullets: []
          },
          {
            stepNumber: '05',
            title: 'Monitor & Improve',
            desc: 'Predictive models need regular checks as data and business conditions change. We monitor model performance and can update the solution when new data, changing patterns, or business requirements call for improvements.',
            bullets: []
          }
        ]
      },

      whyChooseTitle: 'Why Choose Cubixsol?',
      whyChooseIntro: '',
      whyChooseItems: [
        {
          title: 'Practical Analytics Expertise',
          desc: 'Our team focuses on business problems rather than building models without a clear purpose. We connect predictive analytics with specific goals such as sales forecasting, customer retention, risk scoring, and demand planning.'
        },
        {
          title: 'Secure Data Handling',
          desc: 'Data security is considered throughout the project. We review data access, storage, system connections, and other security requirements during planning and implementation.'
        },
        {
          title: 'Focus on Business Value',
          desc: 'Useful predictions should support better decisions. We define clear project goals and performance measures so your team can assess how the solution supports planning, risk control, customer management, or other business priorities.'
        },
        {
          title: 'Ongoing Support',
          desc: 'Support can continue after deployment through model monitoring, performance checks, updates, and technical improvements. Our team can also help adjust the solution as your data and business requirements change.'
        }
      ],

      ctaBannerEyebrow: 'READY TO GET STARTED?',
      ctaBannerTitle: 'Ready to Get Started?',
      ctaBannerDesc: 'Turn your business data into useful insights with **predictive analytics services** from Cubixsol. Share your goals, data environment, and project requirements with our team to discuss the right solution.',
      ctaBannerButtonText: 'Book a Call',
      ctaBannerButtonLink: '/contact',
      ctaBannerSecondaryButtonText: 'Get a Free Assessment',
      ctaBannerSecondaryButtonLink: '/contact',

      faqs: [
        {
          q: 'How much do predictive analytics services cost?',
          a: 'Cost depends on the project scope, data sources, model complexity, integrations, deployment requirements, and ongoing support needs. We review your requirements first and define a suitable project scope before providing an estimate.'
        },
        {
          q: 'What data is needed for predictive analytics?',
          a: 'Data requirements depend on the prediction goal. Common sources include sales records, customer activity, transaction history, product information, and operational data. Our team reviews your available data to identify what can support the planned model.'
        },
        {
          q: 'How accurate are predictive models?',
          a: 'Model accuracy depends on data quality, the amount of useful historical data, model selection, testing, and changing business conditions. We test model performance before deployment and monitor results after launch.'
        },
        {
          q: 'How long does a predictive analytics project take?',
          a: 'Project timelines depend on data readiness, solution scope, model complexity, integrations, and deployment needs. A focused project can require less time than a larger solution involving several data sources and business systems. We define milestones after reviewing the project requirements.'
        },
        {
          q: 'Can predictive analytics integrate with existing systems?',
          a: 'Yes. Predictive models can connect with existing databases, applications, cloud platforms, and business workflows. We review your current systems during the planning stage and select an integration approach based on the project requirements.'
        }
      ]
    };

    const doc = await Solution.findOneAndUpdate(
      { slug: 'predictive-analysis' },
      { $set: updatePayload },
      { new: true, upsert: true }
    );

    console.log('Successfully updated predictive-analysis in MongoDB:', doc.title, doc.slug);
    process.exit(0);
  } catch (err) {
    console.error('Error updating predictive-analysis:', err);
    process.exit(1);
  }
}

updatePredictiveAnalysis();
