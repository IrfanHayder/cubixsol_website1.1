const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const Service = require('./models/Service');

const cmsServiceData = {
  title: "CMS & WordPress Development Services",
  desc: "Give your team a website they can manage with confidence. Cubixsol’s wordpress development services help businesses launch, update, and grow websites with clear navigation, flexible content tools, and dependable functionality. From company websites to online stores, we build CMS solutions around your customers, publishing needs, and business goals.",
  longDesc: "Give your team a website they can manage with confidence. Cubixsol’s wordpress development services help businesses launch, update, and grow websites with clear navigation, flexible content tools, and dependable functionality. From company websites to online stores, we build CMS solutions around your customers, publishing needs, and business goals.",
  ctaPrimaryText: "Start a Project",
  ctaSecondaryText: "Get a Free Estimate",
  
  subServicesTitle: "Our CMS Development Services",
  subServicesIntro: "Choose a CMS solution that supports how your business publishes content, serves customers, and manages products. We shape each project around your workflows, design requirements, integrations, and plans for growth.",
  subServicesItems: [
    {
      title: "WordPress Development",
      desc: "We build responsive WordPress websites with reusable page layouts, organised navigation, and straightforward editing tools, giving your team control over routine content updates. Our work covers theme setup, plugin configuration, contact forms, and the page structures your business needs to present its services clearly."
    },
    {
      title: "Custom WordPress Development Services",
      desc: "Our custom WordPress development services cover customised themes, plugins, content types, and integrations for requirements that standard configurations cannot fully address. We translate your publishing workflows and business rules into practical features, while keeping the administration experience understandable for the people managing the website."
    },
    {
      title: "Shopify Development Services",
      desc: "Our Shopify development services help you launch or improve an online store with branded themes, clear product pages, and intuitive navigation. We configure collections, connect suitable apps, and refine the shopping journey so customers can explore products and move toward checkout with fewer obstacles."
    },
    {
      title: "Magento Web Development Services",
      desc: "Our Magento web development services support stores with detailed catalogues, custom functionality, and connected business systems. We develop storefront features, configure product structures, and integrate inventory or order tools according to your operational requirements and the capabilities of your chosen setup."
    },
    {
      title: "Drupal Web Development Services",
      desc: "Our Drupal web development services support websites that need structured content, defined user permissions, and coordinated publishing workflows. We organise content types, configure editorial roles, and develop custom features to help multiple contributors manage information consistently across larger or more complex websites."
    },
    {
      title: "Headless CMS Development",
      desc: "We connect a CMS to a separate website frontend through APIs, giving you more control over how content appears across digital experiences. Your editors manage structured content centrally, while we build the presentation layer around your design and functionality requirements."
    }
  ],

  techTitle: "Technologies We Use",
  techDesc: "We work with WordPress, Shopify, Magento, and Drupal, using PHP where the platform or custom backend requires it. For headless projects, we can build the frontend with Next.js and connect it to your CMS through APIs. We select the stack around your content model, integrations, hosting requirements, and maintenance capacity, so the technology fits your team’s practical needs.",
  tech: [
    "WordPress",
    "Shopify",
    "Magento",
    "Drupal",
    "PHP",
    "Next.js"
  ],

  serviceProcessTitle: "Our CMS Development Process",
  serviceProcessIntro: "Our five-step process keeps requirements, review points, and launch responsibilities clear from the beginning.",
  serviceProcessSteps: [
    {
      stepNumber: "01",
      title: "Discover",
      desc: "We review your goals, audience, existing website, content, and technical constraints to define the project scope."
    },
    {
      stepNumber: "02",
      title: "Plan",
      desc: "We map the site structure, choose the platform, and agree on features, milestones, and responsibilities."
    },
    {
      stepNumber: "03",
      title: "Build",
      desc: "We develop layouts, configure editing tools, and connect the integrations included in your scope."
    },
    {
      stepNumber: "04",
      title: "Test",
      desc: "We check responsive layouts, content workflows, forms, integrations, and key user journeys before approval."
    },
    {
      stepNumber: "05",
      title: "Launch & Support",
      desc: "We coordinate deployment, walk your team through content updates, and arrange the agreed support activities."
    }
  ],

  whyChooseTitle: "Why Choose Cubixsol",
  whyChooseIntro: "We focus on the details that make a CMS project easier to review, launch, and manage.",
  whyChooseItems: [
    {
      title: "Quality you can review",
      desc: "We use agreed requirements and testing checkpoints to assess functionality, usability, and content management before launch."
    },
    {
      title: "A plan that supports on-time delivery",
      desc: "We define milestones, track dependencies, and raise blockers early so you can make timely decisions."
    },
    {
      title: "Transparent communication",
      desc: "We explain scope, progress, and proposed changes, including their likely effect on cost and scheduling."
    },
    {
      title: "Ongoing support",
      desc: "We agree on maintenance responsibilities and support coverage, helping your team plan for updates, fixes, and future improvements."
    }
  ],

  ctaBannerTitle: "Ready to Start Your Project?",
  ctaBannerDesc: "Make your website easier to manage and ready for your next stage of growth. Talk to Cubixsol about WordPress development services that fit your content, customers, and business priorities. Share your requirements to get a clear starting point.",
  ctaBannerButtonText: "Start a Project",
  ctaBannerButtonLink: "/contact",

  faqs: [
    {
      q: "How much does CMS development cost?",
      a: "CMS development costs depend on the platform, design complexity, content volume, integrations, and custom features. We review your requirements before preparing an estimate that outlines the scope, deliverables, and any ongoing services."
    },
    {
      q: "How long does a CMS development project take?",
      a: "The timeline depends on project scope, content readiness, integrations, and approval cycles. A straightforward website generally requires less work than a custom store or migration. We agree on milestones after reviewing your requirements."
    },
    {
      q: "Should I choose standard WordPress or custom WordPress development?",
      a: "A standard theme and suitable plugins can cover common website requirements. Custom development makes sense when you need distinctive layouts, specialised workflows, or integrations that existing tools cannot adequately support. Both approaches use WordPress."
    },
    {
      q: "Do you provide CMS maintenance after launch?",
      a: "We can arrange maintenance for updates, backups, compatibility checks, and issue resolution within an agreed support scope. Coverage depends on your platform and hosting setup, and we clarify responsibilities and response expectations before work begins."
    },
    {
      q: "Can you migrate my existing website to a new CMS?",
      a: "Yes. We assess your content, media, URLs, and integrations before planning the migration. The scope can include content mapping, redirects, and post-launch checks to reduce disruption and help preserve access to existing pages."
    }
  ],

  cardTitle: "CMS & WordPress Development",
  menuTitle: "CMS & WordPress Development"
};

async function run() {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/cubixsol';
    console.log('Connecting to MongoDB:', mongoUri);
    await mongoose.connect(mongoUri);

    const updated = await Service.findOneAndUpdate(
      { slug: 'cms-development' },
      { $set: cmsServiceData },
      { upsert: true, new: true }
    );

    console.log('[✓] Updated cms-development service successfully:', updated.title);
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error updating CMS service:', err);
    process.exit(1);
  }
}

run();
