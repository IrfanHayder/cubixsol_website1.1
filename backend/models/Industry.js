const mongoose = require('mongoose');

const industrySchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  icon: { type: String },
  short: { type: String },
  desc: { type: String },
  points: [{ type: String }],
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
  workAreas: [{
    title: { type: String },
    body: { type: String }
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
  servicesWeOffer: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Industry', industrySchema);
