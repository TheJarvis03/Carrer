const mongoose = require('mongoose');

const majorSchema = new mongoose.Schema(
    {
        group_id: {
            type: String,
            required: [true, 'Mã khối ngành là bắt buộc'],
            trim: true,
        },
        group_name: {
            type: String,
            required: [true, 'Tên khối ngành là bắt buộc'],
            trim: true,
        },
        majors: [
            {
                major_code: {
                    type: String,
                    required: [true, 'Mã ngành là bắt buộc'],
                    trim: true,
                },
                major_name: {
                    type: String,
                    required: [true, 'Tên ngành là bắt buộc'],
                    trim: true,
                },
            },
        ],
    },
    {
        collection: 'majors',
        timestamps: true,
    },
);

// Add indexes for better query performance
majorSchema.index({ group_id: 1 });
majorSchema.index({ 'majors.major_code': 1 });

module.exports = mongoose.model('Major', majorSchema);
