// userController.js

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = {
    saltRounds: 10,
    jwtSecret: 'your-secret-key',
    jwtExpire: '24h'
};

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ 
            $or: [{ username }, { email }] 
        });

        if (existingUser) {
            return res.status(400).json({ 
                error: existingUser.username === username 
                    ? 'Tên đăng nhập đã tồn tại'
                    : 'Email đã được sử dụng'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                error: 'Mật khẩu phải có ít nhất 6 ký tự'
            });
        }

        const salt = await bcrypt.genSalt(config.saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const user_id = 'us' + Math.floor(Math.random() * 100000).toString().padStart(2, '0');

        const newUser = new User({
            user_id,
            username,
            email,
            password: hashedPassword,
            is_active: true
        });

        await newUser.save();
        res.status(201).json({ success: true, user_id });
    } catch (error) {
        res.status(500).json({ 
            error: 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.'
        });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ 
                error: 'Tên đăng nhập hoặc mật khẩu không chính xác' 
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ 
                error: 'Tên đăng nhập hoặc mật khẩu không chính xác' 
            });
        }

        if (!user.is_active) {
            return res.status(403).json({ 
                error: 'Tài khoản của bạn đã bị vô hiệu hóa' 
            });
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            config.jwtSecret,
            { expiresIn: config.jwtExpire }
        );

        res.status(200).json({ 
            success: true,
            token,
            user: {
                username: user.username,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ 
            error: 'Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.' 
        });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user profile' });
    }
};

const updateUserProfile = async (req, res) => {
    const updateFields = {
        ...req.body,
        password: undefined // Ensure password can't be updated through this endpoint
    };

    try {
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: updateFields },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error updating user profile' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile
};
