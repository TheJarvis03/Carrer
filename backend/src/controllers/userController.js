// userController.js

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config');

const registerUser = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const salt = await bcrypt.genSalt(config.saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      config.jwtSecret,
      {
        expiresIn: config.jwtExpire,
      },
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in user' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
