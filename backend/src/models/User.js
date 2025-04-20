// User.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone_number: {
            type: String,
            maxLength: 10,
            trim: true,
        },
        role: {
            type: String,
            enum: ['student', 'university_student', 'parent', 'admin'],
            default: 'student',
        },
        full_name: {
            type: String,
            required: true,
        },
        date_of_birth: {
            type: Date,
        },
        gender: {
            type: Boolean, // 0: Female, 1: Male
            required: true,
        },
        preferences: {
            type: Map,
            of: [String], // Array of strings
            default: {
                majors: [],
                universities: [],
            },
        },
        is_active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    },
);

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });

const User = mongoose.model('User', userSchema);

module.exports = User;
