const MajorDetail = require('../models/MajorDetail');

const majorDetailController = {
    // Get all major details
    getAll: async (req, res) => {
        try {
            console.log('Đang tải dữ liệu ngành học...');
            const majorDetails = await MajorDetail.find({}).lean();

            if (!majorDetails || majorDetails.length === 0) {
                console.log('Không tìm thấy dữ liệu ngành học');
                return res.status(200).json({
                    success: true,
                    message: 'Không tìm thấy dữ liệu',
                    data: [],
                });
            }

            console.log(`Tìm thấy ${majorDetails.length} ngành học`);
            return res.status(200).json({
                success: true,
                count: majorDetails.length,
                data: majorDetails,
            });
        } catch (error) {
            console.error('Lỗi khi tải dữ liệu:', error);
            return res.status(500).json({
                success: false,
                message: 'Lỗi server',
                error: error.message,
            });
        }
    },

    // Get major detail by code
    getByCode: async (req, res) => {
        try {
            const majorCode = req.params.code;
            // Tìm theo cả majorCode và major_code để đảm bảo lấy đúng dữ liệu
            const majorDetail = await MajorDetail.findOne({
                $or: [
                    { majorCode: majorCode },
                    { major_code: majorCode },
                    { code: majorCode },
                ],
            }).lean();

            if (!majorDetail) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy thông tin ngành học',
                });
            }

            // Chuẩn hóa dữ liệu trả về cho frontend
            return res.status(200).json({
                success: true,
                data: {
                    major_id: majorDetail._id,
                    major_code:
                        majorDetail.majorCode ||
                        majorDetail.major_code ||
                        majorDetail.code ||
                        '',
                    major_name:
                        majorDetail.majorName ||
                        majorDetail.major_name ||
                        majorDetail.name ||
                        '',
                    description: majorDetail.description || '',
                    job_opportunities:
                        majorDetail.jobOpportunities ||
                        majorDetail.job_opportunities ||
                        '',
                    salary_range:
                        majorDetail.salaryRange ||
                        majorDetail.salary_range ||
                        majorDetail.salary ||
                        '',
                    exam_groups:
                        majorDetail.examGroups || majorDetail.exam_groups || [],
                    // Thêm các trường khác nếu cần
                },
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Lỗi server',
                error: error.message,
            });
        }
    },

    // Create new major detail
    create: async (req, res) => {
        try {
            const {
                majorCode,
                majorName,
                description,
                jobOpportunities,
                salaryRange,
            } = req.body;

            const newMajorDetail = new MajorDetail({
                majorCode,
                majorName,
                description,
                jobOpportunities,
                salaryRange,
            });

            const saved = await newMajorDetail.save();

            return res.status(201).json({
                success: true,
                data: saved,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Lỗi server',
                error: error.message,
            });
        }
    },

    // Update major detail
    update: async (req, res) => {
        try {
            const majorCode = req.params.code;
            const updatedMajorDetail = await MajorDetail.findOneAndUpdate(
                { majorCode },
                req.body,
                { new: true },
            );

            if (!updatedMajorDetail) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy thông tin ngành học',
                });
            }

            return res.status(200).json({
                success: true,
                data: updatedMajorDetail,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Lỗi server',
                error: error.message,
            });
        }
    },

    // Delete major detail
    delete: async (req, res) => {
        try {
            const majorCode = req.params.code;
            const deletedMajorDetail = await MajorDetail.findOneAndDelete({
                majorCode,
            });

            if (!deletedMajorDetail) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy thông tin ngành học',
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Xóa thành công',
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Lỗi server',
                error: error.message,
            });
        }
    },
};

module.exports = majorDetailController;
