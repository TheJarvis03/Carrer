const mongoose = require('mongoose');

const majorSchema = new mongoose.Schema(
    {
        _id: String,
        group_id: String,
        group_name: String,
        majors: [
            {
                major_id: String,
                major_code: String,
                major_name: String,
                description: String,
            },
        ],
    },
    {
        collection: 'majors',
        timestamps: true,
    },
);

module.exports = mongoose.model('Major', majorSchema);
