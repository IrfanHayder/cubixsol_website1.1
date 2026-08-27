const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String },
  desc: { type: String },
  tag: { type: String },
  color: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
