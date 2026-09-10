const mongoose = require('mongoose');

const solutionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  desc: { type: String },
  category: { type: String },
  group: { type: String },
  externalUrl: { type: String },
  bullets: [{ type: String }],
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
  faqs: [{
    q: { type: String },
    a: { type: String }
  }]
}, { timestamps: true, strict: false });

module.exports = mongoose.model('Solution', solutionSchema);
