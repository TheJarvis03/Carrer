const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
  career_name: { type: String, required: true },
  career_code: { type: String, required: true, unique: true },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now }
});

careerSchema.pre('save', function(next) {
  this.update_at = new Date();
  next();
});

module.exports = mongoose.model('Career', careerSchema);
