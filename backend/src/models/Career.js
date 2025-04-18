const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
    career_name: { type: String, required: true },
    career_code: { type: String, required: true },
    description: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

careerSchema.pre('save', function(next) {
    this.updated_at = new Date();
    next();
});

module.exports = mongoose.model('Career', careerSchema);
