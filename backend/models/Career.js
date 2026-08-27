const mongoose = require('mongoose');
const careerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  department: { type: String },
  location: { type: String },
  type: { type: String, default: 'Full-time' },
  description: { type: String },
  requirements: [{ type: String }],
  status: { type: String, default: 'Open' },
}, { timestamps: true });
module.exports = mongoose.model('Career', careerSchema);
