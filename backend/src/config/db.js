const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
    try {
        console.log('Connecting to MongoDB career database...');
        await mongoose.connect(config.mongoURI);
        console.log('MongoDB career database connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
