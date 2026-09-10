const mongoose = require('mongoose');
const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  bio: { type: String },
  avatar: { type: String },
  role: { type: String },
}, { timestamps: true });
module.exports = mongoose.model('Author', authorSchema);
