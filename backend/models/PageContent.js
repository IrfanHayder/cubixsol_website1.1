const mongoose = require('mongoose');

const pageContentSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String },
    heroEyebrow: { type: String },
    heroTitle: { type: String },
    heroDesc: { type: String },
    heroButtonText: { type: String },
    heroButtonLink: { type: String },
    heroBadges: [{ type: String }],

    processEyebrow: { type: String },
    processTitle: { type: String },
    processIntro: { type: String },
    processSteps: [
      {
        step: { type: String },
        title: { type: String },
        desc: { type: String },
      },
    ],

    whyChooseEyebrow: { type: String },
    whyChooseTitle: { type: String },
    whyChooseIntro: { type: String },
    whyChooseItems: [
      {
        title: { type: String },
        desc: { type: String },
      },
    ],

    engagementEyebrow: { type: String },
    engagementTitle: { type: String },
    engagementIntro: { type: String },
    engagementItems: [
      {
        title: { type: String },
        desc: { type: String },
      },
    ],

    industriesEyebrow: { type: String },
    industriesTitle: { type: String },
    industriesIntro: { type: String },
    industriesItems: [
      {
        title: { type: String },
        desc: { type: String },
      },
    ],

    ctaEyebrow: { type: String },
    ctaTitle: { type: String },
    ctaDesc: { type: String },
    ctaButtonText: { type: String },
    ctaButtonLink: { type: String },

    faqEyebrow: { type: String },
    faqTitle: { type: String },
    faqIntro: { type: String },
    faqs: [
      {
        q: { type: String },
        a: { type: String },
      },
    ],

    seo: {
      metaTitle: { type: String },
      metaDescription: { type: String },
      keywords: { type: String },
      ogTitle: { type: String },
      ogDescription: { type: String },
      ogImage: { type: String },
      canonicalUrl: { type: String },
    },
  },
  { timestamps: true, strict: false }
);

module.exports = mongoose.model('PageContent', pageContentSchema);
