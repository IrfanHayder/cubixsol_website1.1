const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Service = require('./models/Service');
const PageContent = require('./models/PageContent');

const aiWorkflowsData = {
  slug: 'ai-workflows',
  title: 'AI Workflow Automation Services to Transform Business Operations With Intelligent Systems',
  menuTitle: 'AI Workflows',
  icon: 'Bot',
  color: 'text-purple-600 bg-purple-50',
  gradient: 'from-purple-600 via-indigo-600 to-violet-600',
  heroEyebrow: 'AI WORKFLOW AUTOMATION SERVICES',
  heroTitle: 'AI Workflow Automation Services to Transform Business Operations With Intelligent Systems',
  heroDesc: 'Our AI workflow automation services help organisations automate complex processes through intelligent workflows, AI agents, and advanced automation solutions. We provide smarter systems to manage repetitive tasks, improve efficiency, and create connected workflows.',
  heroPrimaryBtnText: 'Get Started With AI Automation',
  heroSecondaryBtnText: 'Schedule A Consultation',
  heroBadges: [
    'Intelligent Workflows & AI Agents',
    'AI Marketing & Process Automation',
    'Agentic Workflow Implementation',
    'AI Tools Integration & Monitoring'
  ],
  heroImage: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&h=800&q=80',

  // Section 1: Why Your Business Needs AI-Powered Workflows
  problemEyebrow: 'WHY YOUR BUSINESS NEEDS AI-POWERED WORKFLOWS',
  problemTitle: 'Manual Business Processes Create Gaps That Intelligent Automation Can Solve',
  problemDesc: 'Our AI business process automation solutions help organisations replace inefficient workflows with intelligent systems. Businesses can use AI workflows to automate tasks, connect platforms, analyse information, and create smoother operations across departments.',
  problemCards: [
    {
      icon: 'Workflow',
      title: 'Automate Repetitive Operations',
      desc: 'AI workflows allow businesses to automate routine processes such as data management, task assignments, notifications, and information processing. Intelligent systems reduce manual workload and create consistent processes across teams.',
    },
    {
      icon: 'MessageSquare',
      title: 'Create Faster Responses',
      desc: 'AI automation workflow solutions improve response times through automated messages, notifications, customer interactions, and internal alerts. Businesses can create connected communication systems that respond quickly to changing requirements.',
    },
    {
      icon: 'Cpu',
      title: 'Build Smarter Operations',
      desc: 'AI agent workflows allow businesses to create intelligent systems that analyse information and complete multi-step tasks. AI agents support customer operations, research activities, workflow execution, and internal processes.',
    },
    {
      icon: 'BarChart3',
      title: 'Improve Business Decisions',
      desc: 'Advanced AI workflow automation tools collect operational insights from connected systems. Businesses can analyse workflow performance, monitor results, and identify opportunities to improve processes.',
    },
  ],

  // Section 2: Our AI Workflow Automation Solutions (6 Cards)
  capabilitiesEyebrow: 'OUR AI WORKFLOW AUTOMATION SOLUTIONS',
  capabilitiesTitle: 'Customised AI Automation Systems Built Around Your Business Processes',
  capabilitiesDesc: 'Every organisation follows different workflows, tools, and operational requirements. Our AI workflow automation services create customised systems that match your business structure and objectives. We combine AI technologies, automation platforms, and integrations to build efficient digital processes.',
  capabilitiesCards: [
    {
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'AI AUTOMATION STRATEGY',
      title: 'AI Workflow Strategy And Process Configuration',
      desc: 'Our experts analyse existing business operations and identify opportunities for AI for business automation. We create automation roadmaps that define suitable workflows, technologies, and implementation approaches. The strategy phase includes process analysis, workflow planning, automation opportunities, and technical recommendations for building effective AI systems.',
      pills: ['Process Analysis', 'Automation Roadmaps', 'Technical Recommendations'],
    },
    {
      image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'AI AGENT SOLUTIONS',
      title: 'AI Agent Development For Business Operations',
      desc: 'Our AI agents for business process automation create automated solutions that manage workflows, process information, and perform actions based on business rules. We develop AI agent workflows that support customer service, internal operations, data analysis, and business process management.',
      pills: ['Customer Service Agents', 'Internal Operations', 'Data Analysis Tasks'],
    },
    {
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'MARKETING AUTOMATION',
      title: 'AI Marketing Workflow Automation Setup',
      desc: 'Our AI marketing workflows automate lead management, customer segmentation, campaign actions, and personalised communication. We connect marketing platforms with intelligent automation systems to create organised and effective customer engagement processes.',
      pills: ['Lead Management', 'Customer Segmentation', 'Personalised Outreach'],
    },
    {
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'AGENTIC AUTOMATION',
      title: 'Advanced Agentic Workflow Implementation',
      desc: 'Our AI agentic workflows combine AI capabilities with automation logic to create intelligent processes. We develop agentic workflows in AI that support autonomous task execution, smart decision-making, and advanced business operations.',
      pills: ['Autonomous Execution', 'Smart Decision-Making', 'Advanced Operations'],
    },
    {
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'SYSTEM INTEGRATIONS',
      title: 'AI Tools Integration And System Connectivity',
      desc: 'Businesses use different platforms to manage daily operations. Our AI workflow automation tools connect CRMs, databases, communication platforms, APIs, and third-party applications. Integrated systems create smooth data exchange and allow businesses to manage operations through connected automation environments.',
      pills: ['CRM & DB Connectors', 'API Integration', 'Data Exchange'],
    },
    {
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&h=450&q=80',
      tag: 'PERFORMANCE INSIGHTS',
      title: 'AI Automation Monitoring And Performance Reporting',
      desc: 'Automation performance requires regular analysis and optimisation. Our systems track workflow activities, measure results, and provide insights into operational performance. Businesses can evaluate their workflow automation AI systems and improve processes through data-based optimisation.',
      pills: ['Activity Tracking', 'Operational Metrics', 'Continuous Optimisation'],
    },
  ],

  // Section 3: Find The Right AI Automation Approach For Your Business
  fixFirstEyebrow: 'FIND THE RIGHT AI AUTOMATION APPROACH FOR YOUR BUSINESS',
  fixFirstTitle: 'Which AI Workflow Solution Matches Your Current Business Challenge?',
  fixFirstDesc: 'Every business faces different operational challenges that require the right automation approach. Our AI workflow automation services focus on identifying business requirements and creating solutions that match existing processes, technology systems, and growth objectives.',
  fixFirstImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&h=600&q=80',
  fixFirstItems: [
    {
      id: 'reduce-manual-tasks',
      title: 'We Need To Reduce Manual Business Tasks',
      desc: 'Businesses that manage repetitive tasks manually often experience slower operations and reduced productivity. Our AI automation for business solutions automates routine activities such as data processing, task management, notifications, and information handling. Intelligent workflows allow teams to spend more time on strategic activities while automated systems manage repetitive operations consistently.',
      tag: 'Manual Task Reduction',
      solution: 'AI Workflow Analysis → Process Automation → Intelligent Task Execution',
    },
    {
      id: 'customer-marketing-ops',
      title: 'We Need Smarter Customer And Marketing Operations',
      desc: 'Our AI marketing workflows automate customer journeys through intelligent segmentation, personalised communication, and automated follow-up processes. Businesses can connect their marketing platforms with AI systems to create organised customer experiences and improve operational efficiency.',
      tag: 'Marketing & Customer Ops',
      solution: 'AI Marketing Workflows → Customer Automation → Performance Tracking',
    },
    {
      id: 'existing-setup-improvement',
      title: 'Our Existing AI Automation Setup Needs Improvement',
      desc: 'We review current workflows, identify limitations, and upgrade systems with advanced automation capabilities. Our workflow automation services include workflow analysis, AI integration, process improvements, and technical optimisation.',
      tag: 'Workflow Upgrade',
      solution: 'Workflow Audit → Automation Review → AI System Optimisation',
    },
    {
      id: 'scalable-ai-systems',
      title: 'We Need Scalable AI Systems For Our Team',
      desc: 'Our enterprise AI workflow automation solutions create scalable frameworks that connect teams, applications, and business processes. We build advanced automation environments using AI agent workflows and intelligent systems that support long-term business expansion.',
      tag: 'Enterprise Scale',
      solution: 'AI Strategy → Agentic Workflows → Enterprise Automation Framework',
    },
  ],

  // Section 4: Our AI Automation Implementation Process
  processEyebrow: 'OUR AI AUTOMATION IMPLEMENTATION PROCESS',
  processTitle: 'From Business Planning To Complete AI Workflow Deployment',
  processDesc: 'Our implementation process creates reliable AI workflows that connect business goals with intelligent automation. Our team evaluates existing operations, designs automation strategies, develops AI solutions, integrates systems, and reviews performance before deployment.',
  processSteps: [
    {
      step: '01',
      title: 'Business Process Analysis',
      desc: 'The first stage focuses on understanding business operations, existing workflows, and automation opportunities. Our team studies current processes, identifies repetitive activities, and defines areas where AI business process automation can create improvements.',
    },
    {
      step: '02',
      title: 'AI System Structure And Technical Setup',
      desc: 'Our experts configure AI platforms, connect business applications, and prepare the required infrastructure. The setup process includes selecting suitable AI workflow automation tools, creating integrations, and establishing reliable data connections.',
    },
    {
      step: '03',
      title: 'Workflow Development And AI Agent Configuration',
      desc: 'Our team develops intelligent workflows that automate business processes and connect different systems. We create AI agent workflows that perform tasks, analyse information, and support automated decision processes.',
    },
    {
      step: '04',
      title: 'Testing And Performance Review',
      desc: 'Testing validates workflow accuracy, system connections, and automation performance before launch. Our team reviews AI responses, workflow actions, integrations, and reporting systems. The review process identifies improvement areas and creates dependable automation solutions.',
    },
    {
      step: '05',
      title: 'Training And Continuous AI Optimisation',
      desc: 'Successful automation requires proper team adoption and regular improvements. Our team provides workflow documentation, technical guidance, and optimisation support. Continuous updates improve the performance of your AI automation workflow systems as business requirements evolve.',
    },
  ],

  // Section 5: Ways To Work With Our AI Automation Team (3 Models)
  modelsEyebrow: 'WAYS TO WORK WITH OUR AI AUTOMATION TEAM',
  modelsTitle: 'Flexible AI Workflow Automation Services For Different Business Needs',
  modelsDesc: 'Our flexible engagement options allow businesses to choose complete implementation, optimisation support, or ongoing management services. Our AI workflow automation services adapt to different industries, operational requirements, and technology environments.',
  models: [
    {
      number: '1',
      title: 'Complete AI Workflow Automation Implementation',
      desc: 'Our complete implementation service covers strategy development, workflow creation, AI integration, testing, and deployment. We design automation systems that connect business processes with intelligent technology.',
      features: [
        'End-to-End Strategy Development',
        'Intelligent Workflow Creation',
        'AI Agent & Tool Integration',
        'Rigorous Validation & Testing',
        'Complete Handover & Documentation',
      ],
      ctaText: 'Start Full Implementation',
    },
    {
      number: '2',
      title: 'AI Automation Support For Growing Teams',
      desc: 'Our support services improve existing workflows, add new AI capabilities, and optimise business processes. Our team assists organisations that want to expand their AI automation workflow systems without replacing their existing technology environment.',
      features: [
        'Existing Workflow Enhancements',
        'New AI Capabilities Integration',
        'Business Process Optimization',
        'Platform Extension & Scaling',
        'Dedicated Team Guidance',
      ],
      ctaText: 'Get Team Support',
      isPopular: true,
    },
    {
      number: '3',
      title: 'Ongoing AI Workflow Management And Optimization',
      desc: 'Our ongoing management service monitors workflows, improves automation performance, and updates AI processes. Businesses can maximise the value of their AI workflow automation tools through regular optimisation and technical support.',
      features: [
        'Continuous Workflow Monitoring',
        'Automation Performance Tuning',
        'AI Model & Prompt Updates',
        'Technical Troubleshooting',
        'Regular Strategy Reviews',
      ],
      ctaText: 'Start Ongoing Management',
    },
  ],

  // Section 6: AI Tools And Business Integrations
  spectrumEyebrow: 'AI TOOLS AND BUSINESS INTEGRATIONS',
  spectrumTitle: 'Connect AI Automation With The Tools Your Business Already Uses',
  spectrumDesc: 'We integrate AI solutions with CRMs, marketing platforms, communication applications, databases, payment systems, and custom software. These connections allow businesses to automate information flow, improve collaboration, and create efficient digital operations.',
  integrations: [
    { name: 'CRMs & Marketing Platforms', icon: 'Layers', category: 'Customer Ops', desc: 'HubSpot, Salesforce, and ActiveCampaign direct synchronization and lead scoring.' },
    { name: 'OpenAI & Claude LLMs', icon: 'Bot', category: 'Foundation Models', desc: 'State-of-the-art AI models for multi-step reasoning, natural language parsing, and generation.' },
    { name: 'Communication Applications', icon: 'MessageSquare', category: 'Messaging', desc: 'Slack, Microsoft Teams, WhatsApp, and Twilio automated alert pipelines.' },
    { name: 'Databases & Data Lakes', icon: 'Server', category: 'Data Stores', desc: 'PostgreSQL, MySQL, Snowflake, and Pinecone vector database connectors.' },
    { name: 'Payment & Billing Systems', icon: 'CreditCard', category: 'Financial', desc: 'Stripe, PayPal, QuickBooks automated invoice generation and transaction alerts.' },
    { name: 'Make & n8n Orchestrators', icon: 'Zap', category: 'Workflow Engines', desc: 'Multi-branch scenario orchestration connecting hundreds of business endpoints.' },
    { name: 'LangChain & Agent Tools', icon: 'Workflow', category: 'Agent Frameworks', desc: 'Autonomous agent frameworks with memory, custom tools, and self-correcting logic.' },
    { name: 'Custom REST APIs & Software', icon: 'Code2', category: 'Custom Tech', desc: 'Private app integrations, webhook receivers, and internal software connectors.' },
  ],

  // Section 7: AI Automation Project Experience And Results
  outcomesEyebrow: 'AI AUTOMATION PROJECT EXPERIENCE AND RESULTS',
  outcomesTitle: 'AI Workflow Automation Projects Built For Real Business Challenges',
  outcomesDesc: 'Our AI workflow automation services focus on creating solutions that improve efficiency, connect business processes, and support smarter decision-making. Our experience includes AI-powered workflows, intelligent agents, system integrations, and customised automation frameworks designed around specific business requirements.',
  outcomeCards: [
    {
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=700&h=450&q=80',
      client: 'AI Workflow Automation Case Study',
      metric: '94%',
      metricLabel: 'Manual Processing Time Saved',
      title: 'Autonomous Data Processing & Intelligent Document Workflow',
      desc: 'Constructed an end-to-end AI automation workflow that parses multi-channel inquiries and unstructured documents into structured business pipelines.',
      results: [
        'Automated routine document & task handling',
        'Instant multi-channel notifications and alerts',
        'Zero manual data entry errors across systems',
      ],
      isCaseStudy: true,
    },
    {
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&h=450&q=80',
      client: '100+ AI Automation Workflows Developed For Businesses',
      metric: '100+',
      metricLabel: 'Workflows Developed',
      title: 'Scalable Automation Environments & Connected Workflows',
      desc: 'We build AI-powered workflows, intelligent agents, system integrations, and customised automation frameworks designed around specific business requirements.',
      results: [
        'Custom AI agent and workflow deployments',
        'Seamless CRM, database & API integrations',
        'Measurable business productivity gains',
      ],
      isCaseStudy: false,
    },
    {
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=700&h=450&q=80',
      client: 'Enterprise AI Marketing & Operations',
      metric: '8.5x',
      metricLabel: 'Faster Workflow Execution',
      title: 'Agentic Workflow & Marketing Automation Setup',
      desc: 'Engineered multi-agent workflows that coordinate customer segmentation, personalized communication, and real-time operational reporting.',
      results: [
        'Automated customer journey personalization',
        'Real-time operational reporting and metrics',
        'Scalable framework for business expansion',
      ],
      isCaseStudy: false,
    },
  ],

  // Section 8: Final CTA
  ctaEyebrow: 'START YOUR AI AUTOMATION JOURNEY',
  ctaTitle: 'Ready To Build A Smarter AI Workflow Automation System?',
  ctaDesc: "Have a project in mind? Share the details and let's find the right way forward.",
  ctaButtonText: 'Send Project Requirements',
  ctaSecondaryBtnText: 'Book a Discovery Call',

  // FAQs
  faqs: [
    {
      q: 'What is AI workflow automation and how does it help my business?',
      a: 'AI workflow automation combines machine learning, AI agents, and workflow triggers to automate complex, multi-step business processes that previously required manual human effort. It reduces operational overhead, speeds up response times, and eliminates data entry bottlenecks.',
    },
    {
      q: 'How do AI agents differ from traditional rule-based automations?',
      a: 'While traditional automations follow static if-then rules, AI agents can understand unstructured data, reason through multi-step goals, use external tools and APIs dynamically, and handle edge cases adaptively.',
    },
    {
      q: 'Can AI workflows integrate with our existing CRMs and software?',
      a: 'We integrate AI solutions with CRMs, marketing platforms, communication applications, databases, payment systems, and custom software to create a connected and unified workflow.',
    },
    {
      q: 'How long does an AI workflow implementation take?',
      a: 'A standard custom AI workflow implementation sprint typically takes 2 to 3 weeks from business process analysis to live deployment and team training.',
    },
    {
      q: 'How do you ensure data privacy and system reliability?',
      a: 'We implement zero-retention enterprise API boundaries, role-based access control, automated testing guardrails, and human-in-the-loop fallback to guarantee high accuracy and complete data confidentiality.',
    },
  ],

  seo: {
    metaTitle: 'AI Workflow Automation Services | Cubixsol',
    metaDescription: 'AI workflow automation services. Transform business operations with intelligent workflows, AI agents, automated marketing, and connected system integrations.',
    keywords: 'AI workflow automation, AI agents, business process automation, agentic workflows, AI marketing automation, workflow automation tools',
  },
};

async function seedAiWorkflows() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB.');

    // Upsert into Service model
    await Service.findOneAndUpdate(
      { slug: 'ai-workflows' },
      { $set: aiWorkflowsData },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log('✓ Synced ai-workflows in Service collection.');

    // Upsert into PageContent model for both slugs
    await PageContent.findOneAndUpdate(
      { slug: 'ai-workflows' },
      {
        $set: {
          slug: 'ai-workflows',
          title: 'AI Workflow Automation Services',
          content: aiWorkflowsData,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log('✓ Synced ai-workflows in PageContent collection.');

    await PageContent.findOneAndUpdate(
      { slug: 'ai-workflow-automation' },
      {
        $set: {
          slug: 'ai-workflow-automation',
          title: 'AI Workflow Automation Services',
          content: aiWorkflowsData,
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    console.log('✓ Synced ai-workflow-automation in PageContent collection.');

    console.log('Done seeding AI Workflows data.');
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error seeding AI Workflows data:', err);
    process.exit(1);
  }
}

seedAiWorkflows();
