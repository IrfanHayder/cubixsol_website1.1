require('dotenv').config();
const mongoose = require('mongoose');
const Solution = require('./models/Solution');

async function updateDeepLearning() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB.');

    const updatePayload = {
      name: 'Deep Learning Development Services',
      title: 'Deep Learning Development Services',
      heroTitle: 'Deep Learning Development Services',
      description: 'Turn complex data into practical AI solutions with reliable deep learning services from Cubixsol. Our team develops deep learning models for computer vision, speech and audio, prediction, and other AI applications. We handle model development, training, testing, deployment, and ongoing improvements based on your project requirements.',
      ctaPrimaryText: 'Book a Call',
      ctaPrimaryLink: '/contact',
      ctaSecondaryText: 'Get a Free Assessment',
      ctaSecondaryLink: '/contact',

      subServicesTitle: 'Our Deep Learning Services',
      subServicesIntro: 'Our deep learning team develops AI solutions for new products, existing applications, and business systems. Each service can support a specific AI feature or form part of a complete deep learning project.',
      subServicesItems: [
        {
          title: 'Computer Vision Development Services',
          desc: 'We develop computer vision solutions for applications that need to process and understand images or video. Use cases can include image recognition, object detection, visual inspection, document analysis, and other image-based tasks. Our developers select the model and processing approach according to the type of visual data, required output, application setup, and expected performance.'
        },
        {
          title: 'Speech and Audio Development',
          desc: 'Deep learning can help applications recognise, classify, and process speech and other audio data. We develop solutions for speech recognition, audio classification, transcription, and audio analysis based on the required use case. Our team considers the type of audio, expected output, data available for training, and how the model will work inside your application.'
        },
        {
          title: 'Deep Learning Model Training',
          desc: 'Model training forms a key part of deep learning development. We prepare relevant data, train the selected model, test its results, and make improvements based on performance. Our developers can work on classification, recognition, prediction, and other tasks where a model needs to learn patterns from data. Testing helps identify areas where the model needs further training or changes.'
        },
        {
          title: 'MLOps',
          desc: 'A trained model still needs proper management after development. Our MLOps services support deployment, monitoring, testing, model updates, and performance checks. We can help connect models with production systems and keep track of how they perform as new data enters the system. Regular checks also make it easier to identify issues and plan model updates.'
        }
      ],

      useCasesTitle: 'Deep Learning Use Cases',
      useCasesIntro: 'Deep learning can support business applications where software needs to process large amounts of data or identify patterns that are difficult to handle through fixed rules.',
      useCasesItems: [
        {
          title: 'Image Recognition',
          desc: 'Image recognition allows software to identify and classify visual information. Businesses can use it to recognise products, objects, documents, or other items in images.'
        },
        {
          title: 'Defect Detection',
          desc: 'Defect detection can help businesses inspect products through images or video. A trained model can identify visible issues and flag items for further review, helping teams improve quality checks.'
        },
        {
          title: 'Forecasting',
          desc: 'Deep learning models can analyse historical data and identify patterns linked to future results. Businesses can use forecasting for demand, sales, stock levels, and other areas where past data can support planning. Projects can also combine deep learning with machine learning development services when prediction, classification, automation, or data analysis requires different model types.'
        }
      ],

      techTitle: 'Tools & Technology',
      techDesc: 'Our deep learning technology stack includes PyTorch, TensorFlow, OpenCV, and CUDA. PyTorch and TensorFlow support model development and training, while OpenCV supports image and video processing. CUDA can support GPU-based deep learning workloads. We select technologies according to the model, data, application requirements, processing needs, and deployment environment.',
      tech: ['PyTorch', 'TensorFlow', 'OpenCV', 'CUDA'],

      process: {
        title: 'How We Deliver Deep Learning Projects',
        subtitle: 'Our structured methodology to discover, design, build, deploy, and maintain deep learning AI systems.',
        steps: [
          {
            stepNumber: '01',
            title: 'Discover',
            desc: 'We begin by understanding the business goal, required AI task, available data, current software, users, and technical requirements. Early discovery helps define what the model needs to achieve before development starts.',
            bullets: []
          },
          {
            stepNumber: '02',
            title: 'Design',
            desc: 'Our team defines the model approach, data requirements, system setup, integrations, and development stages. We also plan how the model will work with your existing application or business system.',
            bullets: []
          },
          {
            stepNumber: '03',
            title: 'Build',
            desc: 'Developers prepare the data, build the model, and train it for the required task. We test the model during development and review its results against the project requirements.',
            bullets: []
          },
          {
            stepNumber: '04',
            title: 'Deploy',
            desc: 'Once the model meets the agreed requirements, we connect it with the required application, platform, or business system. Deployment also covers the setup needed to run the model in its intended environment.',
            bullets: []
          },
          {
            stepNumber: '05',
            title: 'Monitor and Improve',
            desc: 'Model performance can change as new data becomes available. We monitor results, review performance, resolve issues, and support retraining or model updates when required.',
            bullets: []
          }
        ]
      },

      whyChooseTitle: 'Why Choose Cubixsol?',
      whyChooseIntro: '',
      whyChooseItems: [
        {
          title: 'Deep Learning Expertise',
          desc: 'Our team works across computer vision, speech and audio, model training, and MLOps. We can support individual AI features or complete deep learning projects from development through deployment.'
        },
        {
          title: 'Security and Compliance',
          desc: 'We consider data access, system security, and project requirements during development. Our team can account for your data handling and system needs when planning the solution.'
        },
        {
          title: 'Focus on Business Results',
          desc: 'Deep learning should solve a clear business problem. We focus on practical use cases such as image recognition, quality checks, speech processing, forecasting, and other tasks where AI can support your business.'
        },
        {
          title: 'Ongoing Support',
          desc: 'Our support can continue after deployment. We can help monitor model performance, resolve technical issues, update models, and make changes as your application and data requirements develop.'
        }
      ],

      ctaBannerEyebrow: 'READY TO GET STARTED?',
      ctaBannerTitle: 'Ready to Get Started?',
      ctaBannerDesc: 'Build a deep learning solution around your business requirements with Cubixsol. Share your project goals, current system, or AI use case with our team, and we can discuss the right development approach.',
      ctaBannerButtonText: 'Start Your Deep Learning Project',
      ctaBannerButtonLink: '/contact',
      ctaBannerSecondaryButtonText: 'Request a Free Assessment',
      ctaBannerSecondaryButtonLink: '/contact',

      faqs: [
        {
          q: 'How much do deep learning services cost?',
          a: 'Deep learning project costs depend on the model type, data requirements, project scope, integrations, testing, and deployment needs. A computer vision model may have different requirements from a forecasting or speech solution. We review the project requirements before providing an estimate.'
        },
        {
          q: 'What data is needed for a deep learning project?',
          a: 'Data requirements depend on the AI task. Image recognition projects may require relevant images, while forecasting projects may need historical business data. Data quality, volume, and labelling can also affect model training and testing.'
        },
        {
          q: 'How long does deep learning development take?',
          a: 'Project timelines depend on the scope, data readiness, model complexity, testing requirements, and system integrations. A small proof-of-concept can take less time than a production system with multiple features and integrations. We define the expected timeline after reviewing the project requirements.'
        },
        {
          q: 'How accurate can a deep learning model be?',
          a: 'Model accuracy depends on factors such as data quality, data volume, model selection, training, testing, and the task itself. We test model performance during development and make improvements where results do not meet the agreed requirements.'
        },
        {
          q: 'Can you deploy a deep learning model into an existing application?',
          a: 'Yes. We can connect a trained model with an existing application, website, platform, or business system. The integration approach depends on your current technology, model requirements, and how users need to access the AI feature.'
        }
      ]
    };

    const doc = await Solution.findOneAndUpdate(
      { slug: 'deep-learning' },
      { $set: updatePayload },
      { new: true, upsert: true }
    );

    console.log('Successfully updated deep-learning in MongoDB:', doc.name, doc.slug);
    process.exit(0);
  } catch (err) {
    console.error('Error updating deep-learning:', err);
    process.exit(1);
  }
}

updateDeepLearning();
