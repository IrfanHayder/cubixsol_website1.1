const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  type: { type: String, default: 'Contact Form' }, // 'Free Estimate' or 'Contact Form'
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  subject: { type: String },
  category: { type: String },
  requirement: { type: String },
  source: { type: String },
  message: { type: String, required: true },
  status: { type: String, default: 'Unread' }, // 'Unread', 'Read', 'Contacted', 'In Progress', 'Closed'
}, { timestamps: true, strict: false });

module.exports = mongoose.model('ContactMessage', messageSchema);

