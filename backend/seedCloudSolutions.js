const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Service = require('./models/Service');
const PageContent = require('./models/PageContent');

async function seedCloudSolutions() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB.');

    const cloudServiceData = {
      slug: 'cloud-solutions',
      title: 'Cloud Consulting & Solutions for Your Business',
      cardTitle: 'Cloud Solutions',
      menuTitle: 'Cloud Solutions',
      icon: 'Cloud',
      color: 'text-sky-600 bg-sky-50',
      gradient: 'from-sky-500 to-blue-600',
      heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&h=800&q=75',
      desc: 'Cubixsol provides **cloud consulting services** to help businesses plan, build, migrate, and manage reliable cloud environments. Our team helps you assess your current infrastructure, select suitable cloud technologies, improve performance, and support secure applications. We work across cloud strategy, migration, AWS, Kubernetes, security, and infrastructure management.',
      longDesc: 'Cubixsol provides **cloud consulting services** to help businesses plan, build, migrate, and manage reliable cloud environments. Our team helps you assess your current infrastructure, select suitable cloud technologies, improve performance, and support secure applications. We work across cloud strategy, migration, AWS, Kubernetes, security, and infrastructure management.',
      ctaPrimaryText: 'Start a Project',
      ctaSecondaryText: 'Free Estimate',
      features: [
        'Cloud Strategy & Assessment',
        'Seamless Cloud Migration',
        'AWS & Kubernetes Architecture',
        'Zero-Downtime Migration Planning',
        'Enterprise Cloud Security & Access Control',
        'Ongoing Cloud Optimization & Support',
      ],

      // Sub Services
      subServicesTitle: 'Our Cloud Consulting Services',
      subServicesIntro: 'Our team provides practical cloud services for businesses at different stages of their cloud journey. We can help you plan a new cloud environment, move existing workloads, improve infrastructure, or address specific cloud requirements.',
      subServicesItems: [
        {
          title: 'Cloud Consulting',
          desc: 'Our **cloud consulting services** help businesses assess their current infrastructure and plan a suitable cloud strategy. We review applications, workloads, infrastructure, technical requirements, and business goals to recommend a practical approach. Our team can also identify areas where performance, scalability, reliability, or cloud costs can be improved.',
        },
        {
          title: 'Cloud Migration Services',
          desc: 'Our **cloud migration services** help businesses move applications, workloads, and data to the cloud. We assess the existing environment, identify migration requirements, and create a clear plan for each stage. Careful planning and testing can help reduce service disruption and make the move more manageable.',
        },
        {
          title: 'AWS Consulting Services',
          desc: 'Our **AWS consulting services** support businesses with cloud architecture, infrastructure setup, deployment, optimisation, and ongoing improvements. We help create AWS environments for applications and workloads while considering performance, security, reliability, and scalability.',
        },
        {
          title: 'Kubernetes Consulting Services',
          desc: 'Our **Kubernetes consulting services** help businesses manage containerised applications and improve application deployment. We can help set up and manage Kubernetes environments, support scaling, and improve the way applications run across cloud infrastructure.',
        },
        {
          title: 'Cloud Security',
          desc: 'Cloud security is an important part of every cloud environment. Our team helps businesses improve protection for infrastructure, applications, and data through suitable access controls, data protection, monitoring, and security practices. Security requirements are considered during planning and implementation.',
        },
      ],

      // Tech Stack
      techTitle: 'Technologies We Use',
      techDesc: 'We work with widely used cloud and infrastructure technologies, including **AWS, Azure, Google Cloud Platform (GCP), Docker, Kubernetes, and Terraform**. The technology used for a project depends on its infrastructure, applications, technical requirements, and business goals.',
      tech: ['AWS', 'Azure', 'Google Cloud Platform (GCP)', 'Docker', 'Kubernetes', 'Terraform'],

      // Interactive Process Steps (DevOpsProcess Component)
      serviceProcessTitle: 'Our Cloud Solutions Process',
      serviceProcessIntro: 'A clear process helps keep cloud projects organised and gives you a better view of each project stage. Cubixsol follows five main steps from initial discovery through launch and support.',
      serviceProcessSteps: [
        {
          stepNumber: '01',
          title: 'Discover',
          desc: 'We start by reviewing your existing infrastructure, applications, workloads, business goals, and technical challenges. This gives our team a clear understanding of your current environment and project needs.',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&h=560&q=70',
          points: [],
        },
        {
          stepNumber: '02',
          title: 'Plan',
          desc: 'We create a practical cloud plan based on your requirements. The plan can cover cloud architecture, technology selection, migration needs, security, project priorities, and the steps required for implementation.',
          image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&h=560&q=70',
          points: [],
        },
        {
          stepNumber: '03',
          title: 'Build',
          desc: 'Our team develops or configures the required cloud infrastructure and services based on the approved plan. We focus on reliable setup, suitable configurations, and the requirements defined during the planning stage.',
          image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&h=560&q=70',
          points: [],
        },
        {
          stepNumber: '04',
          title: 'Test',
          desc: 'We test the cloud environment before launch. Testing can cover performance, reliability, security, configuration, and deployment to identify issues before the system becomes fully operational.',
          image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&h=560&q=70',
          points: [],
        },
        {
          stepNumber: '05',
          title: 'Launch & Support',
          desc: 'Once testing is complete, we launch the cloud solution. Our support can continue after launch to help monitor the environment, resolve issues, improve performance, and support changes as your applications and requirements grow.',
          image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&h=560&q=70',
          points: [],
        },
      ],

      // Why Choose Cubixsol
      whyChooseTitle: 'Why Choose Cubixsol?',
      whyChooseIntro: 'A successful cloud project needs clear planning, reliable implementation, open communication, and support after launch. Cubixsol focuses on each part of the project to help businesses build and maintain dependable cloud environments.',
      whyChooseItems: [
        {
          title: 'Quality-Focused Delivery',
          desc: 'We focus on reliable infrastructure, suitable technologies, and clear project requirements. Each part of the work is planned around the needs of your applications and cloud environment.',
        },
        {
          title: 'On-Time Delivery',
          desc: 'Clear planning and defined project stages help keep work organised. We set priorities and milestones so you have a clear view of project progress from discovery through launch.',
        },
        {
          title: 'Transparent Communication',
          desc: 'We keep communication simple and clear throughout the project. You receive updates on progress, requirements, issues, and upcoming work, so you know what is happening at each stage.',
        },
        {
          title: 'Ongoing Support',
          desc: 'Cloud infrastructure can need updates, optimisation, monitoring, and technical support after launch. Our team can continue working with you to maintain and improve your cloud environment as your needs change.',
        },
      ],

      // Bottom CTA Banner
      ctaBannerEyebrow: 'SCALE WITH CONFIDENCE',
      ctaBannerTitle: 'Ready to Start Your Project?',
      ctaBannerDesc: 'Improve your cloud infrastructure with practical cloud consulting services from Cubixsol. If you need cloud planning, migration, AWS support, Kubernetes consulting, DevOps, security, or ongoing cloud support, our team can help you plan and deliver the right solution.',
      ctaBannerButtonText: 'Start Your Project',
      ctaBannerButtonLink: '/contact',
      ctaBannerSecondaryButtonText: 'Free Estimate',
      ctaBannerSecondaryButtonLink: '/contact',

      // FAQs
      faqs: [
        {
          q: 'How much do cloud migration services cost?',
          a: 'Cloud migration costs depend on your current infrastructure, applications, data, cloud platform, and project complexity. Cubixsol can review your environment and provide an estimate based on your specific migration requirements.',
        },
        {
          q: 'How long does a cloud migration take?',
          a: 'Migration time depends on the number of applications, amount of data, infrastructure complexity, and migration method. Smaller projects may take less time, while larger environments can require more planning, testing, and staged migration.',
        },
        {
          q: 'AWS vs Azure: Which is better for my business?',
          a: 'The right platform depends on your applications, existing systems, technical needs, budget, and plans. Our team can review your requirements and help you select a suitable cloud platform.',
        },
        {
          q: 'How do you keep cloud environments secure?',
          a: 'We consider security during cloud planning, setup, and implementation. Our approach can include access controls, data protection, monitoring, secure configurations, and other measures based on your infrastructure and application requirements.',
        },
        {
          q: 'Can you migrate applications without downtime?',
          a: 'Some applications can be migrated with little or no downtime, but the approach depends on the application, infrastructure, dependencies, and migration method. We review your environment first and recommend a migration plan designed to reduce disruption.',
        },
      ],

      // SEO
      seo: {
        metaTitle: 'Cloud Consulting Services | Cubixsol',
        metaDescription: 'Cubixsol offers cloud consulting, migration & DevOps — scalable, secure AWS infrastructure with high availability. Get a free cloud assessment.',
        keywords: 'cloud consulting services, cloud migration, AWS consulting, kubernetes consulting, cloud security, cubixsol',
        ogTitle: 'Cloud Consulting Services | Cubixsol',
        ogDescription: 'Cubixsol offers cloud consulting, migration & DevOps — scalable, secure AWS infrastructure with high availability. Get a free cloud assessment.',
        ogImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&h=750&q=70',
        canonicalUrl: '',
      },
    };

    // Upsert into Service collection
    const updatedService = await Service.findOneAndUpdate(
      { slug: 'cloud-solutions' },
      { $set: cloudServiceData },
      { upsert: true, new: true }
    );
    console.log('✓ Service "cloud-solutions" updated in MongoDB successfully:', updatedService.title);

    // Upsert into PageContent collection
    await PageContent.findOneAndUpdate(
      { slug: 'cloud-solutions' },
      {
        $set: {
          slug: 'cloud-solutions',
          title: 'Cloud Consulting & Solutions for Your Business',
          heroTitle: 'Cloud Consulting & Solutions for Your Business',
          heroDesc: cloudServiceData.desc,
          content: cloudServiceData.longDesc,
        },
      },
      { upsert: true }
    );
    console.log('✓ PageContent "cloud-solutions" updated in MongoDB successfully.');

    await mongoose.disconnect();
    console.log('Done.');
  } catch (err) {
    console.error('Error seeding Cloud Solutions:', err);
    process.exit(1);
  }
}

seedCloudSolutions();
