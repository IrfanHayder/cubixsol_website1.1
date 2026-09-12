require('dotenv').config();
const mongoose = require('mongoose');
const Solution = require('./models/Solution');

async function updateOracleAidp() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB.');

    const updatePayload = {
      name: 'Oracle AI Data Platform',
      title: 'Oracle AI Data Platform',
      heroTitle: 'Oracle AI Data Platform Services',
      group: 'Data Solutions',
      category: 'Data Solutions',
      desc: 'Cubixsol provides Oracle AI Data Platform services for businesses planning a new data platform or improving an existing Oracle setup. Our team can support assessment, migration, engineering, and ongoing platform support based on your current systems and business goals.',
      ctaPrimaryText: 'Book a Call',
      ctaPrimaryLink: '/contact',
      ctaSecondaryText: 'Get a Free Assessment',
      ctaSecondaryLink: '/contact',

      subServicesTitle: 'Our Oracle AI Data Platform Capabilities',
      subServicesIntro: 'Cubixsol provides Oracle AI Data Platform services for businesses planning a new data platform or improving an existing Oracle setup. Our team can support assessment, migration, engineering, and ongoing platform support based on your current systems and business goals.',
      subServicesItems: [
        {
          title: 'AIDP Assessment and Oracle Consulting Services',
          desc: 'Our Oracle consulting services start with a review of your current data setup, Oracle environment, business goals, and technical needs. We assess your readiness for AIDP and identify the work required for adoption. You receive a clear view of the current setup, key requirements, and recommended next steps.'
        },
        {
          title: 'Oracle Migration',
          desc: 'Our team helps move Oracle data and workloads into the required Oracle environment. We review data sources, system connections, dependencies, and migration needs before planning. Testing helps check data accuracy and system performance before deployment.'
        },
        {
          title: 'Data Platform Engineering',
          desc: 'We build data platform components based on your business requirements and existing systems. Our work can include data architecture, data integration, data pipelines, and connections between business systems. We organise the platform so your team can manage data more easily and support future analytics and AI projects.'
        },
        {
          title: 'Support and Optimisation',
          desc: 'Post-deployment support helps keep your Oracle data platform stable and useful. Our team can monitor platform performance, troubleshoot issues, review system changes, and make required improvements. Support can also cover updates and changes as your data requirements grow.'
        }
      ],

      useCasesTitle: 'Use Cases',
      useCasesIntro: 'Oracle AI Data Platform can support businesses with different data and modernisation needs.',
      useCasesItems: [
        {
          title: 'Oracle Modernisation',
          desc: 'Improve an existing Oracle data environment with a more organised platform, better data connections, and support for current business needs.'
        },
        {
          title: 'AIDP Adoption',
          desc: 'Prepare your business for Oracle AI Data Platform adoption with an assessment of your current systems, data, technical requirements, and implementation needs.'
        },
        {
          title: 'Data Platform Build',
          desc: 'Build a new data platform for business data, analytics, and AI projects. Cubixsol can help define the platform structure, connect required data sources, and build the core components.'
        }
      ],

      techTitle: 'Tools & Tech',
      techDesc: 'Our Oracle technology stack includes Oracle Cloud, Oracle AI Data Platform (AIDP), and Oracle Cloud Infrastructure (OCI). We select the required tools based on your data sources, existing Oracle systems, integration needs, security requirements, and project goals.',
      tech: ['Oracle Cloud', 'Oracle AI Data Platform (AIDP)', 'Oracle Cloud Infrastructure (OCI)'],

      process: {
        title: 'How We Deliver',
        subtitle: 'Our structured delivery process to review, design, engineer, deploy, and support your Oracle AI Data Platform.',
        steps: [
          {
            stepNumber: '01',
            title: 'Discover',
            desc: 'We review your business goals, current Oracle environment, data sources, workloads, integrations, and technical requirements. Early discovery helps define the project scope and identify the main work required.',
            bullets: []
          },
          {
            stepNumber: '02',
            title: 'Design',
            desc: 'Our team plans the platform structure, required integrations, migration approach, technical setup, and delivery stages. Clear planning helps your team understand what will be built and how the work will progress.',
            bullets: []
          },
          {
            stepNumber: '03',
            title: 'Build',
            desc: 'Our developers and data engineers build the required platform components, data connections, and workflows. We review progress during development to keep the work aligned with the agreed requirements.',
            bullets: []
          },
          {
            stepNumber: '04',
            title: 'Deploy',
            desc: 'We complete testing and prepare the platform for deployment. Our team checks integrations, data movement, system performance, and key functions before moving the solution into the target environment.',
            bullets: []
          },
          {
            stepNumber: '05',
            title: 'Monitor & Improve',
            desc: 'Post-launch support can include platform monitoring, issue resolution, performance checks, updates, and improvements. Our team can continue working on the platform as your business adds new data sources, workloads, or AI requirements.',
            bullets: []
          }
        ]
      },

      whyChooseTitle: 'Why Choose Cubixsol?',
      whyChooseIntro: '',
      whyChooseItems: [
        {
          title: 'Practical Oracle Expertise',
          desc: 'Our team starts with your existing environment and business requirements before planning the work. We review your data setup, technical needs, integrations, and project goals to define a clear implementation approach.'
        },
        {
          title: 'Security and Compliance',
          desc: 'Security requirements form part of the platform planning process. We consider data access, system connections, infrastructure, and business requirements when designing and implementing your Oracle data environment.'
        },
        {
          title: 'Business-Focused Results',
          desc: 'We focus on platform work with a clear business purpose. A well-planned data platform can make data easier to manage, support modernisation, and give analytics and AI projects a stronger technical base.'
        },
        {
          title: 'Ongoing Support',
          desc: 'Our support continues beyond the initial deployment when required. We can help with monitoring, technical issues, performance improvements, updates, and new platform requirements as your business needs change.'
        }
      ],

      ctaBannerEyebrow: 'READY TO GET STARTED?',
      ctaBannerTitle: 'Ready to Get Started?',
      ctaBannerDesc: 'Build a reliable **oracle data platform** with Cubixsol. Share your Oracle environment, data needs, and project goals with our team. We can help you plan the right approach for assessment, migration, engineering, and ongoing support.',
      ctaBannerButtonText: 'Book a Call',
      ctaBannerButtonLink: '/contact',
      ctaBannerSecondaryButtonText: 'Get a Free Assessment',
      ctaBannerSecondaryButtonLink: '/contact',

      faqs: [
        {
          q: 'What is Oracle AI Data Platform?',
          a: 'Oracle AI Data Platform is an Oracle platform for working with business data and supporting modern analytics and AI needs. Cubixsol helps businesses assess their current environment, plan AIDP adoption, build data platform components, and support the platform after deployment.'
        },
        {
          q: 'How much does Oracle AI Data Platform cost?',
          a: 'Cost depends on the project scope, data volume, existing Oracle environment, migration needs, integrations, technical requirements, and support needs. Cubixsol reviews these factors before defining the project scope and preparing an estimate.'
        },
        {
          q: 'How long does Oracle migration take?',
          a: 'Migration time depends on data volume, workload size, system connections, integrations, testing needs, and the current Oracle environment. Cubixsol reviews the existing setup first and creates a project plan based on the required migration work.'
        },
        {
          q: 'What are the prerequisites for Oracle AI Data Platform?',
          a: 'Prerequisites depend on the planned setup. Your team may need details about existing Oracle systems, data sources, workloads, integrations, security requirements, and business goals. An AIDP assessment can help identify the technical requirements before development starts.'
        },
        {
          q: 'Does Cubixsol provide ongoing support?',
          a: 'Yes. Cubixsol can provide ongoing support for platform monitoring, issue resolution, performance improvements, updates, and technical changes. Support can continue after deployment as your data environment and business requirements develop.'
        }
      ]
    };

    const doc = await Solution.findOneAndUpdate(
      { slug: 'oracle-aidp' },
      { $set: updatePayload },
      { new: true, upsert: true }
    );

    console.log('Successfully updated oracle-aidp in MongoDB:', doc.title, doc.slug);
    process.exit(0);
  } catch (err) {
    console.error('Error updating oracle-aidp:', err);
    process.exit(1);
  }
}

updateOracleAidp();
