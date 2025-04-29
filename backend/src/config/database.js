const mongoose = require('mongoose');

// Set strictQuery to true to suppress the warning
mongoose.set('strictQuery', true);

const url = 'mongodb://localhost:27017/career';

const connectDB = async () => {
    try {
        await mongoose.connect(url);
        console.log('MongoDB Connected Successfully');
    } catch (err) {
        console.error('MongoDB Connection Error:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
