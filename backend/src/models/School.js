const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
    school_id: { 
        type: String, 
        required: [true, 'School ID is required'],
        unique: true,
        trim: true
    },
    school_name: { 
        type: String, 
        required: [true, 'School name is required'],
        trim: true
    },
    location: { 
        type: String, 
        required: [true, 'Location is required'],
        trim: true
    },
    school_type: { 
        type: String, 
        required: [true, 'School type is required'],
        enum: ['public', 'private', 'international']
    },
    ownership: { 
        type: String, 
        required: [true, 'Ownership is required'],
        trim: true
    }
}, {
    timestamps: true
});

// Add index for better query performance
schoolSchema.index({ school_id: 1 });

module.exports = mongoose.model('School', schoolSchema);
