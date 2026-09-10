const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, default: 'image' },
  alt: { type: String, default: '' },
  size: { type: Number },
  mimetype: { type: String },
}, { timestamps: true, strict: false });

module.exports = mongoose.model('Media', mediaSchema);
