// User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            unique: true,
            required: true,
        },
        username: {
            type: String,
            unique: true,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        is_active: {
            type: Boolean,
            default: true,
        },
        role: {
            type: String,
            default: 'user',
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('User', userSchema);
