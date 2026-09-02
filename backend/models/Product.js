const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  title: { type: String },
  tagline: { type: String },
  desc: { type: String },
  image: { type: String },
  accent: { type: String },
  heroTheme: { type: String },
  layout: { type: String },
  externalUrl: { type: String },
  category: { type: String },
  stats: [[{ type: String }]],
  challenges: [{
    title: { type: String },
    body: { type: String }
  }],
  answers: [{
    title: { type: String },
    body: { type: String }
  }],
  steps: [{
    title: { type: String },
    body: { type: String }
  }]
}, { timestamps: true, strict: false });

module.exports = mongoose.model('Product', productSchema);
