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
                index: {
                    type: String,
                },
                major_code: {
                    type: String,
                },
                major_name: {
                    type: String,
                },
                quota: {
                    type: String,
                },
                admission_methods: [
                    {
                        type: String,
                    },
                ],
                subject: {
                    type: String,
                },
            },
        ],
    },
    {
        collection: 'schooldetail',
        timestamps: true,
    },
);

module.exports = mongoose.model('SchoolDetail', SchoolDetailSchema);
