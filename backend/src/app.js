const express = require('express');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');
const connectDB = require('./config/db');

const app = express();
connectDB().catch(err => console.error('DB error:', err));

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Add logging middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, {
        query: req.query,
        body: req.body
    });
    next();
});

// API routes
app.use('/api', routes);


// Error handling
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'API endpoint not found'
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

module.exports = app;