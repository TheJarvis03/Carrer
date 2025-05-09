const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = {
    jwtSecret: 'your-secret-key',
};

const authMiddleware = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ error: 'Vui lòng đăng nhập' });
        }

        // Verify token
        const decoded = jwt.verify(token, config.jwtSecret);

        // Find user
        const user = await User.findOne({ _id: decoded.id }).select(
            '-password',
        );

        if (!user) {
            return res.status(404).json({ error: 'Không tìm thấy người dùng' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Auth Error:', error);
        res.status(401).json({ error: 'Token không hợp lệ' });
    }
};

module.exports = authMiddleware;
