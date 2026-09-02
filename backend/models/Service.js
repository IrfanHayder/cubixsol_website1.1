const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  heroImage: { type: String },
  title: { type: String, required: true },
  menuTitle: { type: String },
  desc: { type: String },
  color: { type: String },
  gradient: { type: String },
  longDesc: { type: String },
  features: [{ type: String }],
  tech: [{ type: String }],
  techTitle: { type: String },
  techDesc: { type: String },
  outcomes: [{ type: String }],
  faqs: [{
    q: { type: String },
    a: { type: String }
  }],
  whyChooseTitle: { type: String },
  whyChooseIntro: { type: String },
  whyChooseImage: { type: String },
  whyChooseItems: [{
    title: { type: String },
    desc: { type: String }
  }],
  serviceProcessTitle: { type: String },
  serviceProcessSteps: [{
    stepNumber: { type: String },
    title: { type: String },
    desc: { type: String }
  }],
  subServicesTitle: { type: String },
  subServicesIntro: { type: String },
  subServicesItems: [{
    title: { type: String },
    desc: { type: String }
  }],
  businessTypesTitle: { type: String },
  businessTypesIntro: { type: String },
  businessTypesItems: [{
    title: { type: String },
    desc: { type: String }
  }],
  pricingSectionTitle: { type: String },
  pricingSectionText: { type: String },
  heroSubtitle: { type: String },
  ctaPrimaryText: { type: String },
  ctaSecondaryText: { type: String },
  additionalParagraph: { type: String },
  ctaBannerEyebrow: { type: String },
  ctaBannerTitle: { type: String },
  ctaBannerDesc: { type: String },
  ctaBannerButtonText: { type: String },
  ctaBannerButtonLink: { type: String },
  // SEO Fields
  seo: {
    metaTitle:       { type: String },
    metaDescription: { type: String },
    keywords:        { type: String },
    ogTitle:         { type: String },
    ogDescription:   { type: String },
    ogImage:         { type: String },
    canonicalUrl:    { type: String },
  },
}, { timestamps: true, strict: false });

module.exports = mongoose.model('Service', serviceSchema);
