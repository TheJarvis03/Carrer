const Major = require('../models/Major');
const { handleAsync, createResponse } = require('../utils/crudOperations');

exports.getAllMajors = handleAsync(async (req, res) => {
    const majorGroups = await Major.find().select('-__v').lean();

    if (!majorGroups?.length) {
        return res
            .status(404)
            .json(createResponse(false, 'No major groups found'));
    }

    // Flatten the structure for frontend consumption
    const flattenedMajors = majorGroups.reduce((acc, group) => {
        const majorsWithGroup = group.majors.map((major) => ({
            ...major,
            group_id: group.group_id,
            group_name: group.group_name,
        }));
        return [...acc, ...majorsWithGroup];
    }, []);

    return res.json({
        success: true,
        count: flattenedMajors.length,
        data: flattenedMajors,
    });
});

exports.createMajor = handleAsync(async (req, res) => {
    const savedMajorGroup = await Major.create(req.body);
    res.status(201).json(
        createResponse(
            true,
            'Major group created successfully',
            savedMajorGroup,
        ),
    );
});

exports.getMajorGroups = handleAsync(async (req, res) => {
    const majorGroups = await Major.find()
        .select('group_id group_name -_id')
        .lean();

    if (!majorGroups?.length) {
        return res
            .status(404)
            .json(createResponse(false, 'No major groups found'));
    }

    return res.json({
        success: true,
        data: majorGroups,
    });
});
