const AdmissionScore = require('../models/AdmissionScore');
const { handleAsync, createResponse } = require('../utils/crudOperations');

exports.getAllScores = handleAsync(async (req, res) => {
    try {
        const { examGroup, scoreRange, region, year, page = 1 } = req.query;
        const limit = 10; // Changed from 20 to 10
        const skip = (page - 1) * limit;

        let query = {};

        if (examGroup && examGroup !== 'all') {
            query.subject_group = examGroup;
        }

        if (scoreRange && scoreRange !== 'all') {
            switch (scoreRange) {
                case 'above25':
                    query.score = { $gt: 25 };
                    break;
                case '20to25':
                    query.score = { $gte: 20, $lte: 25 };
                    break;
                case '15to20':
                    query.score = { $gte: 15, $lt: 20 };
                    break;
            }
        }

        if (region && region !== 'all') {
            query.region = region;
        }

        if (year) {
            query.year = year;
        }

        const [totalScores, scores] = await Promise.all([
            AdmissionScore.countDocuments(query),
            AdmissionScore.find(query).limit(limit).skip(skip),
        ]);

        return res.json({
            success: true,
            data: scores,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.max(1, Math.ceil(totalScores / limit)),
                totalItems: totalScores,
                itemsPerPage: limit,
            },
            message: scores.length
                ? 'Lấy dữ liệu thành công'
                : 'Không tìm thấy kết quả phù hợp',
        });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({
            success: false,
            message: 'Có lỗi xảy ra khi truy vấn dữ liệu',
            error:
                process.env.NODE_ENV === 'development'
                    ? error.message
                    : undefined,
        });
    }
});

exports.getScoresByUniversity = handleAsync(async (req, res) => {
    const { schoolCode } = req.params;
    const scores = await AdmissionScore.find({ school_code: schoolCode });

    if (!scores.length) {
        return res
            .status(404)
            .json(createResponse(false, 'No scores found for this university'));
    }

    res.json(createResponse(true, 'Scores retrieved successfully', scores));
});

exports.getScoresByMajor = handleAsync(async (req, res) => {
    const { majorCode } = req.params;
    const scores = await AdmissionScore.find({
        $or: [{ major: majorCode }, { major_code: majorCode }],
    });

    if (!scores.length) {
        return res
            .status(404)
            .json(createResponse(false, 'No scores found for this major'));
    }

    res.json(createResponse(true, 'Scores retrieved successfully', scores));
});
