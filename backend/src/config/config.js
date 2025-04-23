const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port: process.env.PORT || 5000,
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/career',
    jwtSecret: process.env.JWT_SECRET || 'your_secret_key',
    nodeEnv: process.env.NODE_ENV || 'development',
    jwtExpire: process.env.JWT_EXPIRE || '24h',
    saltRounds: parseInt(process.env.SALT_ROUNDS) || 10,
};
