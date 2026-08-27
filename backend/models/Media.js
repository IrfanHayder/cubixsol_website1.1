const mongoose = require('mongoose');
const mediaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, default: 'image' },
  alt: { type: String },
}, { timestamps: true });
module.exports = mongoose.model('Media', mediaSchema);
