const mongoose = require('mongoose');

const industrySchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  icon: { type: String },
  short: { type: String },
  desc: { type: String },
  points: [{ type: String }],
  testimonial: {
    quote: { type: String },
    name: { type: String },
    role: { type: String }
  },
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
