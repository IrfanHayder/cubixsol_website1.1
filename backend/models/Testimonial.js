const mongoose = require('mongoose');
const testimonialSchema = new mongoose.Schema({
  quote: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String },
  company: { type: String },
  avatar: { type: String },
}, { timestamps: true, strict: false });
module.exports = mongoose.model('Testimonial', testimonialSchema);
