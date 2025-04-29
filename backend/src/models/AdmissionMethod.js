const mongoose = require('mongoose');

const admissionMethodSchema = new mongoose.Schema({
  method_id: {
    type: String,
    required: true,
    unique: true
  },
  method_name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('AdmissionMethod', admissionMethodSchema);
