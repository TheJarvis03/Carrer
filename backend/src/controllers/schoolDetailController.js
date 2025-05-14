const SchoolDetail = require('../models/SchoolDetail');

const schoolDetailController = {
    // Get all school details
    getAll: async (req, res) => {
        try {
            console.log('Đang tải dữ liệu trường học...');
            const schoolDetails = await SchoolDetail.find();

            return res.status(200).json({
                success: true,
                message: schoolDetails.length
                    ? 'Lấy dữ liệu thành công'
                    : 'Không tìm thấy dữ liệu',
                data: schoolDetails || [],
            });
        } catch (error) {
            console.error('Lỗi khi tải dữ liệu:', error);
            return res.status(500).json({
                success: false,
                message: 'Lỗi server',
                data: [],
            });
        }
    },

    // Get school detail by code
    getByCode: async (req, res) => {
        try {
            const schoolDetail = await SchoolDetail.findOne({
                school_code: req.params.code,
            });

            if (!schoolDetail) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy thông tin trường học',
                });
            }

            return res.status(200).json({
                success: true,
                data: schoolDetail,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Lỗi server',
                error: error.message,
            });
        }
    },

    // Create new school detail
    create: async (req, res) => {
        try {
            const newSchool = new SchoolDetail(req.body);
            await newSchool.save();

            return res.status(201).json({
                success: true,
                data: newSchool,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Lỗi server',
                error: error.message,
            });
        }
    },

    // Update school detail
    update: async (req, res) => {
        try {
            const updatedSchool = await SchoolDetail.findOneAndUpdate(
                { school_code: req.params.code },
                req.body,
                { new: true },
            );

            if (!updatedSchool) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy thông tin trường học',
                });
            }

            return res.status(200).json({
                success: true,
                data: updatedSchool,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Lỗi server',
                error: error.message,
            });
        }
    },

    // Delete school detail
    delete: async (req, res) => {
        try {
            const deletedSchool = await SchoolDetail.findOneAndDelete({
                school_code: req.params.code,
            });

            if (!deletedSchool) {
                return res.status(404).json({
                    success: false,
                    message: 'Không tìm thấy thông tin trường học',
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

module.exports = schoolDetailController;
