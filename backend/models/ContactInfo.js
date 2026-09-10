const mongoose = require('mongoose');

const contactInfoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: { type: String, required: true },
    icon: { type: String, default: 'MapPin' },
    link: { type: String, default: '' },
    order: { type: Number, default: 0 },
    status: { type: String, enum: ['Active', 'Draft'], default: 'Active' },
  },
  { timestamps: true, strict: false }
);

module.exports = mongoose.model('ContactInfo', contactInfoSchema);
