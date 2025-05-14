const mongoose = require('mongoose');

const SchoolDetailSchema = new mongoose.Schema(
    {
        school_code: {
            type: String,
            required: true,
            unique: true,
        },
        school_name: {
            type: String,
            required: true,
        },
        method_link: {
            type: String,
        },
        address: {
            type: String,
        },
        phones: [
            {
                type: String,
            },
        ],
        website: {
            type: String,
        },
        majors: [
            {
                subjects: [
                    {
                        type: String,
                    },
                ],
            },
        ],
    },
    {
        collection: 'schooldetail',
        timestamps: true,
    },
);

module.exports = mongoose.model('SchoolDetail', SchoolDetailSchema);
