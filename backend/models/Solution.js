const mongoose = require('mongoose');

const solutionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  desc: { type: String },
  heroSubtitle: { type: String },
  category: { type: String },
  group: { type: String },
  externalUrl: { type: String },
  ctaPrimaryText: { type: String },
  ctaPrimaryLink: { type: String },
  ctaSecondaryText: { type: String },
  ctaSecondaryLink: { type: String },
  bullets: [{ type: String }],
  subServicesTitle: { type: String },
  subServicesIntro: { type: String },
  subServicesItems: [{
    title: { type: String },
    desc: { type: String }
  }],
  useCasesTitle: { type: String },
  useCasesIntro: { type: String },
  useCasesItems: [{
    title: { type: String },
    desc: { type: String }
  }],
  techTitle: { type: String },
  techDesc: { type: String },
  tech: [{ type: String }],
  practices: {
    title: { type: String },
    intro: { type: String },
    items: [{
      title: { type: String },
      body: { type: String }
    }]
  },
  impact: {
    title: { type: String },
    intro: { type: String },
    rows: [{
      area: { type: String },
      impact: { type: String }
    }]
  },
  process: {
    title: { type: String },
    subtitle: { type: String },
    steps: [{
      stepNumber: { type: String },
      title: { type: String },
      desc: { type: String },
      bullets: [{ type: String }],
      image: { type: String }
    }]
  },
  whyChooseTitle: { type: String },
  whyChooseIntro: { type: String },
  whyChooseItems: [{
    title: { type: String },
    desc: { type: String }
  }],
  ctaBannerEyebrow: { type: String },
  ctaBannerTitle: { type: String },
  ctaBannerDesc: { type: String },
  ctaBannerButtonText: { type: String },
  ctaBannerButtonLink: { type: String },
  ctaBannerSecondaryButtonText: { type: String },
  ctaBannerSecondaryButtonLink: { type: String },
  faqs: [{
    q: { type: String },
    a: { type: String }
  }],
  seo: {
    metaTitle: { type: String },
    metaDescription: { type: String },
    keywords: { type: String },
    ogTitle: { type: String },
    ogDescription: { type: String },
    ogImage: { type: String },
    canonicalUrl: { type: String }
  }
}, { timestamps: true, strict: false });

module.exports = mongoose.model('Solution', solutionSchema);
