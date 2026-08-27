const mongoose = require('mongoose');

const solutionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  desc: { type: String },
  externalUrl: { type: String },
  group: { type: String },
  practices: {
    title: { type: String },
    intro: { type: String },
    items: [{
      title: { type: String },
      body: { type: String }
    }]
  }
}, { timestamps: true });

module.exports = mongoose.model('Solution', solutionSchema);
