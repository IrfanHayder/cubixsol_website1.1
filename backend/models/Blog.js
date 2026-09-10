const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String },
  content: { type: String },
  tag: { type: String },
  category: { type: String },
  author: { type: String },
  coverImage: { type: String },
  status: { type: String, default: 'Published' },
  date: { type: String },
  color: { type: String, default: 'from-primary-700 to-indigo-900' },

  // SEO Fields
  seo: {
    metaTitle:       { type: String },
    metaDescription: { type: String },
    keywords:        { type: String },
    ogTitle:         { type: String },
    ogDescription:   { type: String },
    ogImage:         { type: String },
    canonicalUrl:    { type: String },
  },
}, { timestamps: true });
module.exports = mongoose.model('Blog', blogSchema);
