const mongoose = require('mongoose');

const industrySchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  icon: { type: String },
  short: { type: String },
  desc: { type: String },
  points: [{ type: String }],
  trustPills: [{ type: String }],
  tagline: { type: String },
  stats: [{
    value: { type: String },
    label: { type: String }
  }],
  testimonial: {
    quote: { type: String },
    name: { type: String },
    role: { type: String }
  },
  approachTitle: { type: String },
  approachItems: [{
    title: { type: String },
    subtitle: { type: String },
    points: [{
      heading: { type: String },
      text: { type: String }
    }]
  }],
  solutionsTitle: { type: String },
  solutionsSubtitle: { type: String },
  solutionsItems: [{
    title: { type: String },
    body: { type: String }
  }],
  workAreasTitle: { type: String },
  workAreas: [{
    title: { type: String },
    body: { type: String }
  }],
  techTitle: { type: String },
  techItems: [{
    title: { type: String },
    desc: { type: String }
  }],
  whyChooseTitle: { type: String },
  whyChooseItems: [{
    title: { type: String },
    desc: { type: String }
  }],
  ctaTitle: { type: String },
  ctaDesc: { type: String },
  faqs: [{
    q: { type: String },
    a: { type: String }
  }],
  productsBuilt: [{
    name: { type: String },
    slug: { type: String },
    blurb: { type: String }
  }],
  caseStudies: [{
    title: { type: String },
    result: { type: String },
    tags: [{ type: String }]
  }],
  servicesWeOffer: [{ type: String }],
  heroTitle: { type: String },
  ctaPrimaryText: { type: String },
  ctaPrimaryLink: { type: String },
  ctaSecondaryText: { type: String },
  ctaSecondaryLink: { type: String },
  ctaBannerButtonText: { type: String },
  ctaBannerButtonLink: { type: String },
  ctaBannerSecondaryButtonText: { type: String },
  ctaBannerSecondaryButtonLink: { type: String },
  seo: {
    metaTitle: { type: String },
    metaDescription: { type: String },
    keywords: { type: String },
    ogTitle: { type: String },
    ogDescription: { type: String },
    ogImage: { type: String },
    canonicalUrl: { type: String },
    schema: { type: String },
    schemaMarkup: { type: String }
  },
}, { timestamps: true, strict: false });

module.exports = mongoose.model('Industry', industrySchema);
