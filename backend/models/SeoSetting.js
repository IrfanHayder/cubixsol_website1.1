const mongoose = require('mongoose');
const seoSchema = new mongoose.Schema({
  page: { type: String, required: true, unique: true },
  title: { type: String },
  description: { type: String },
  keywords: { type: String },
  ogImage: { type: String },
  schema: { type: String },
  schemaMarkup: { type: String },
}, { timestamps: true, strict: false });
module.exports = mongoose.model('SeoSetting', seoSchema);
