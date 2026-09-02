const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema(
  {
    q: { type: String, required: true },
    a: { type: String, required: true },
    category: { type: String, default: 'General' },
  },
  { timestamps: true, strict: false }
);

module.exports = mongoose.model('Faq', faqSchema);
