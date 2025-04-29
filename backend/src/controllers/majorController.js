const Major = require('../models/Major');
const { handleAsync, createResponse } = require('../utils/crudOperations');

exports.getAllMajors = handleAsync(async (req, res) => {
    const majorGroups = await Major.find().select('-__v').lean();

    if (!majorGroups?.length) {
        return res.status(404).json(createResponse(false, 'No major groups found'));
    }

    const formattedData = majorGroups.map(group => ({
        group_id: group.group_id,
        group_name: group.group_name,
        majors: group.majors || []
    }));

    return res.status(200).json(createResponse(true, 'Majors retrieved successfully', formattedData));
});

exports.createMajor = handleAsync(async (req, res) => {
    const savedMajorGroup = await Major.create(req.body);
    res.status(201).json(createResponse(true, 'Major group created successfully', savedMajorGroup));
});
