const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const Industry = require('./models/Industry');

async function updateFintechContent() {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB:', mongoUri);
    await mongoose.connect(mongoUri);
    console.log('Connected.');

    const fintechData = {
      heroTitle: 'Fintech Software Development Services for Modern Financial Products',
      title: 'Banking & FinTech',
      slug: 'fintech',
      icon: 'Landmark',
      short: 'Cubixsol builds secure, scalable financial products through fintech software development services that align with your customers, workflows, and growth goals. We give fintech startups, payment providers, lenders, and financial businesses a clear path from complex ideas to reliable web and mobile experiences.',
      desc: 'Cubixsol builds secure, scalable financial products through fintech software development services that align with your customers, workflows, and growth goals. We give fintech startups, payment providers, lenders, and financial businesses a clear path from complex ideas to reliable web and mobile experiences.',
      ctaPrimaryText: 'Discuss Your Project',
      ctaPrimaryLink: '/contact',
      ctaSecondaryText: 'Get a Proposal',
      ctaSecondaryLink: '#estimate',
      ctaBannerButtonText: 'Start Your Fintech Project',
      ctaBannerButtonLink: '/contact',
      ctaBannerSecondaryButtonText: 'Get a Proposal',
      ctaBannerSecondaryButtonLink: '#estimate',
      trustPills: [
        '150+ Clients Served',
        '10+ Years Shipping Digital Products',
        '98% Client Satisfaction',
        '20+ Countries Served',
      ],
      points: [
        '150+ Clients Served',
        '10+ Years Shipping Digital Products',
        '98% Client Satisfaction',
        '20+ Countries Served',
      ],
      stats: [
        { value: '150+', label: 'Clients Served' },
        { value: '10+', label: 'Years Shipping Digital Products' },
        { value: '98%', label: 'Client Satisfaction' },
        { value: '20+', label: 'Countries Served' },
      ],
      solutionsTitle: 'Finance & Fintech Software We Build',
      solutionsSubtitle: 'We combine product strategy, user experience, software design, data, and security to simplify financial operations and give teams greater control.',
      solutionsItems: [
        {
          title: 'Payment Systems',
          body: 'Create payment gateways, checkout experiences, subscription payment systems, and payment orchestration platforms that connect to processors and alternative payment methods. Our team creates clear transaction journeys and robust APIs for smooth, reliable payment operations.',
        },
        {
          title: 'Fintech Apps',
          body: 'Our fintech mobile app services give businesses secure, intuitive applications for bank accounts, payments, credit, and personal finance. Each app can include secure login, alerts, transaction histories, account controls, and customer-support tools.',
        },
        {
          title: 'Digital Wallets',
          body: 'Create digital wallets that support account deposits, peer-to-peer transfers, multiple currencies, transaction categories, card links, and ledger-aware processes. Our team pairs simple user journeys with strong security and clear operational controls.',
        },
        {
          title: 'Trading Platforms',
          body: 'Create portfolio, market-data, order-management, and investment dashboards for users who need timely information and a clear view of their options. Secure APIs with clear documentation link market-data and execution services to each platform.',
        },
      ],
      workAreasTitle: 'Built for Finance & Fintech Standards',
      workAreas: [
        {
          title: 'PCI-DSS-Aware Architecture',
          body: 'Our architects design payment flows around security controls, secure data, and transaction integrity.',
        },
        {
          title: 'Encryption and Tokenisation',
          body: 'Encryption, tokenization, secure authentication, and controlled access protect sensitive information.',
        },
        {
          title: 'KYC and AML Workflow Support',
          body: 'Create customer enrollment and verification workflows for identity checks, document review, sanctions checks, and audit-ready records.',
        },
        {
          title: 'Secure APIs and Audit Controls',
          body: 'Authenticated APIs, permission controls, audit records, and system alerts give each system clear, traceable data flows.',
        },
      ],
      techTitle: 'Tech We Use',
      techItems: [
        {
          title: 'Node.js',
          desc: 'Node.js powers backend services and secure APIs with high-throughput event processing and real-time ledger settlement.',
        },
        {
          title: 'React',
          desc: 'React delivers dashboards, portals, and financial interfaces with sub-second responsiveness.',
        },
        {
          title: 'Stripe & Plaid',
          desc: 'Stripe, Plaid, and third-party financial integrations connect core product functions and banking rails.',
        },
        {
          title: 'AWS, Kotlin & Swift',
          desc: 'AWS provides cloud infrastructure, and Kotlin and Swift power mobile applications.',
        },
      ],
      whyChooseTitle: 'Why Choose Cubixsol for Fintech',
      whyChooseItems: [
        {
          title: 'Scalable',
          desc: 'Cloud-ready architecture engineered to process high-volume transactions and growing user bases.',
        },
        {
          title: 'Secure',
          desc: 'Protected data flows, zero-trust tokenization, and strict encryption safeguards.',
        },
        {
          title: 'Connected',
          desc: 'API-first integrations connecting core ledgers with global financial networks.',
        },
        {
          title: 'Reliable',
          desc: 'Tested and monitored releases with high uptime and real-time observability.',
        },
      ],
      ctaTitle: 'Ready to Build?',
      ctaDesc: 'Do you have a fintech idea? Partner with Cubixsol for fintech software development. Share your goals, and our team will map a practical path from discovery to launch.',
      faqs: [
        {
          q: 'What security and compliance measures should fintech software include?',
          a: 'Product scope, user roles, jurisdictions, and vendor relationships determine the required controls. Typical safeguards include encryption, strong authentication, role-based access, audit records, secure API controls, tokenization, system alerts, and PCI-DSS-aware payment flows. A qualified compliance adviser or independent audit may also be necessary.',
        },
        {
          q: 'How much do custom fintech software development services cost?',
          a: 'Project scope, integrations, platforms, data needs, security controls, and delivery timelines shape the total cost. A focused MVP needs a different budget than a multi-tenant platform for deposits, credit, or payments. Our team sets priorities and prepares a proposal after we assess your goals and technical requirements.',
        },
        {
          q: 'How long do fintech app development services take?',
          a: 'Product complexity determines the delivery timeline. A focused first release may take several weeks to a few months. More integrations, mobile applications, compliance workflows, and quality checks extend the schedule for a broader platform. Our team divides delivery into milestones, so your business can release valuable functions in stages.',
        },
        {
          q: 'Can you integrate Stripe, Plaid, and other payment or financial APIs?',
          a: 'Yes. Our team can connect payment processors, financial-data providers, identity-verification tools, bank services, ledger platforms, and other approved APIs. We assess authentication, webhooks, data mapping, error recovery, reconciliation, and system alerts so every connection performs reliably in live conditions.',
        },
        {
          q: 'Can fintech software scale as transaction volumes and users grow?',
          a: 'Yes. Our team prepares for growth through modular services, efficient data models, cloud infrastructure, background tasks, system observability, and staged performance checks. Expected traffic and transaction patterns determine the right architecture. Our goal is to support growth and preserve security, reliability, and user experience.',
        },
      ],
      seo: {
        metaTitle: 'Fintech Software Development Services | Cubixsol',
        metaDescription: 'Custom fintech software development for payment gateways, mobile banking apps, digital wallets, and trading platforms.',
        keywords: 'fintech software development, payment gateway development, digital wallet, trading platform, fintech mobile app',
      },
    };

    // Update MongoDB
    const res = await Industry.findOneAndUpdate(
      { slug: 'fintech' },
      { $set: fintechData },
      { upsert: true, new: true }
    );
    console.log('✓ Industry "fintech" updated in MongoDB successfully with trustPills and stats:', res.title);

    await mongoose.disconnect();
    console.log('Done.');
  } catch (err) {
    console.error('Error updating fintech content:', err);
    process.exit(1);
  }
}

updateFintechContent();
