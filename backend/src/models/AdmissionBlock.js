const mongoose = require('mongoose');

const admissionBlockSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        subjects: [
            {
                type: String,
                required: true,
            },
        ],
        universityId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'University',
            required: true,
        },
        admissionMethodId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'AdmissionMethod',
            required: true,
        },
        minScore: {
            type: Number,
            required: true,
        },
        quota: {
            type: Number,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['active', 'inactive', 'completed'],
            default: 'active',
        },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('AdmissionBlock', admissionBlockSchema);
