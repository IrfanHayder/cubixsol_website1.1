const mongoose = require('mongoose');
const seoSchema = new mongoose.Schema({
  page: { type: String, required: true, unique: true },
  title: { type: String },
  description: { type: String },
  keywords: { type: String },
  ogImage: { type: String },
}, { timestamps: true });
module.exports = mongoose.model('SeoSetting', seoSchema);
