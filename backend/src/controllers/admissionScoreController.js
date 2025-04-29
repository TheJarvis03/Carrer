const AdmissionScore = require('../models/AdmissionScore');
const { handleAsync, createResponse } = require('../utils/crudOperations');

exports.getAllScores = handleAsync(async (req, res) => {
    const scores = await AdmissionScore.find({});
    res.json(createResponse(true, 'Scores retrieved successfully', {
        count: scores.length,
        data: scores
    }));
});

exports.getScoresByUniversity = handleAsync(async (req, res) => {
    const { universityId } = req.params;
    const scores = await AdmissionScore.find({ university: universityId });
    
    if (!scores.length) {
        return res.status(404).json(createResponse(false, 'No scores found for this university'));
    }
    
    res.json(createResponse(true, 'Scores retrieved successfully', scores));
});

exports.getScoresByMajor = handleAsync(async (req, res) => {
    const { majorId } = req.params;
    const scores = await AdmissionScore.find({ 
        $or: [{ major: majorId }, { major_code: majorId }]
    });

    if (!scores.length) {
        return res.status(404).json(createResponse(false, 'No scores found for this major'));
    }

    res.json(createResponse(true, 'Scores retrieved successfully', scores));
});
