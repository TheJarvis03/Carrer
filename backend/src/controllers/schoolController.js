const School = require('../models/School');

const schoolController = {
    getAllSchools: async (req, res) => {
        try {
            // Remove sorting to maintain insertion order
            const schools = await School.find({});

            const response = {
                success: true,
                data: schools,
                total: schools.length,
            };
            res.json(response);
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message,
            });
        }
    },

    getSchoolById: async (req, res) => {
        try {
            const school = await School.findOne({ school_id: req.params.id });
            if (!school) {
                return res.status(404).json({
                    success: false,
                    error: 'Không tìm thấy trường',
                });
            }
            res.json({
                success: true,
                data: school,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message,
            });
        }
    },

    createSchool: async (req, res) => {
        try {
            const {
                school_id,
                school_name,
                location,
                school_type,
                ownership,
                school_img,
            } = req.body;

            if (!school_id || !school_name || !location) {
                return res.status(400).json({
                    success: false,
                    error: 'Thiếu thông tin bắt buộc',
                });
            }

            const existingSchool = await School.findOne({ school_id });
            if (existingSchool) {
                return res.status(400).json({
                    success: false,
                    error: 'Mã trường đã tồn tại',
                });
            }

            const school = new School({
                school_id,
                school_name,
                location,
                school_type: school_type || 'Trường đại học',
                ownership: ownership || 'Công lập',
                school_img: school_img || '',
            });

            const savedSchool = await school.save();
            res.status(201).json({
                success: true,
                data: savedSchool,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                error: error.message,
            });
        }
    },

    updateSchool: async (req, res) => {
        try {
            const { school_id } = req.body;
            if (school_id) {
                const existingSchool = await School.findOne({
                    school_id,
                    _id: { $ne: req.params.id },
                });
                if (existingSchool) {
                    return res.status(400).json({
                        success: false,
                        error: 'Mã trường đã tồn tại',
                    });
                }
            }

            const updatedSchool = await School.findOneAndUpdate(
                { school_id: req.params.id },
                { ...req.body },
                { new: true },
            );

            if (!updatedSchool) {
                return res.status(404).json({
                    success: false,
                    error: 'Không tìm thấy trường',
                });
            }

            res.json({
                success: true,
                data: updatedSchool,
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                error: error.message,
            });
        }
    },

    deleteSchool: async (req, res) => {
        try {
            const deletedSchool = await School.findOneAndDelete({
                school_id: req.params.id,
            });

            if (!deletedSchool) {
                return res.status(404).json({
                    success: false,
                    error: 'Không tìm thấy trường',
                });
            }

            res.json({
                success: true,
                message: 'Xóa trường thành công',
                data: deletedSchool,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message,
            });
        }
    },

    searchSchools: async (req, res) => {
        try {
            const { q: query, type, region, ownership } = req.query;
            let filter = {};

            // Build filter based on query parameters
            if (query) {
                filter = {
                    $or: [
                        { school_name: { $regex: query, $options: 'i' } },
                        { school_id: { $regex: query, $options: 'i' } },
                        { location: { $regex: query, $options: 'i' } },
                    ],
                };
            }

            if (type && type !== 'all') {
                filter.school_type = type;
            }

            if (ownership && ownership !== 'all') {
                filter.ownership = ownership;
            }

            if (region && region !== 'all') {
                const regionKeywords = {
                    north: ['bắc', 'hà nội', 'hải phòng'],
                    central: ['trung', 'huế', 'đà nẵng'],
                    south: ['nam', 'hồ chí minh', 'cần thơ'],
                };

                const keywords = regionKeywords[region];
                if (keywords) {
                    filter.location = {
                        $regex: keywords.join('|'),
                        $options: 'i',
                    };
                }
            }

            // Use natural order from database
            const schools = await School.find(filter);

            res.json({
                success: true,
                data: schools,
                total: schools.length,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: error.message || 'Lỗi khi tìm kiếm trường',
            });
        }
    },
};

module.exports = schoolController;
