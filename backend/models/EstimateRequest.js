const mongoose = require('mongoose');

const estimateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  category: { type: String, required: true },
  requirement: { type: String },
  source: { type: String },
  subject: { type: String },
  message: { type: String },
  status: { type: String, default: 'Unread' }, // 'Unread', 'Contacted', 'In Progress', 'Closed'
}, { timestamps: true, strict: false });

module.exports = mongoose.model('EstimateRequest', estimateSchema);
