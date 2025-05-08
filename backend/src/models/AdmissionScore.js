const mongoose = require('mongoose');

const admissionScoreSchema = new mongoose.Schema({
    university: {
        type: String,
        required: true,
    },
    major_code: {
        type: String,
        required: true,
    },
    subject_group: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('AdmissionScore', admissionScoreSchema);
