const AdmissionScore = require('../models/AdmissionScore');
const { handleAsync } = require('../utils/crudOperations');

exports.getAllScores = async (req, res) => {
    try {
        console.log('Getting admission scores...');
        const scores = await AdmissionScore.find({});
        console.log(`Found ${scores.length} scores`);
        res.json({
            success: true,
            count: scores.length,
            data: scores
        });
    } catch (error) {
        console.error('Error getting scores:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getScoresByUniversity = handleAsync(async (req, res) => {
  const { universityId } = req.params;
  const scores = await AdmissionScore.find({ university: universityId });
  res.json(scores);
});

exports.getScoresByMajor = handleAsync(async (req, res) => {
  const { majorId } = req.params;
  const scores = await AdmissionScore.find({ 
    $or: [
      { major: majorId },
      { major_code: majorId }
    ]
  });
  res.json(scores);
});
