const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema(
    {
        school_id: {
            type: String,
            required: [true, 'Mã trường là bắt buộc'],
            unique: true,
            trim: true,
        },
        school_name: {
            type: String,
            required: [true, 'Tên trường là bắt buộc'],
            trim: true,
        },
        location: {
            type: String,
            required: [true, 'Địa điểm là bắt buộc'],
            trim: true,
        },
        school_type: {
            type: String,
            required: [true, 'Loại trường là bắt buộc'],
            enum: [
                'Đại học',
                'Học viện',
                'Trường đại học',
                'Viện nghiên cứu',
                'Cao đẳng',
            ],
            default: 'Trường đại học',
        },
        ownership: {
            type: String,
            required: [true, 'Loại hình là bắt buộc'],
            enum: ['Công lập', 'Tư thục', 'Dân lập', 'Nước ngoài'],
            default: 'Công lập',
        },
        school_img: {
            type: String,
            required: false,
            default: '',
        },
    },
    {
        timestamps: true,
    },
);

// Add index for better query performance
schoolSchema.index({ school_id: 1 });

module.exports = mongoose.model('School', schoolSchema);
