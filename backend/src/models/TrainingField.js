const mongoose = require('mongoose');

const trainingFieldSchema = new mongoose.Schema({
  field_name: { type: String, required: true },
  field_code: { type: String, required: true },
  description: { type: String },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

trainingFieldSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

module.exports = mongoose.model('TrainingField', trainingFieldSchema);
