const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  heroImage: { type: String },
  title: { type: String, required: true },
  desc: { type: String },
  color: { type: String },
  gradient: { type: String },
  longDesc: { type: String },
  features: [{ type: String }],
  tech: [{ type: String }],
  outcomes: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
