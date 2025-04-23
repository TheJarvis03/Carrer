const Major = require('../models/Major');

exports.getAllMajors = async (req, res) => {
    try {
        console.log('Fetching majors...');
        const majors = await Major.find({}).lean();
        console.log('Found majors:', majors);

        res.json({
            success: true,
            data: majors
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};
