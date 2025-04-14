const express = require('express');
const cors = require('cors');
const path = require('path');
const config = require('./config');
const connectDB = require('./config/db');
const routes = require('./routes');

const app = express();

// Error handling for database connection
connectDB().catch((err) => {
  console.error('Database connection error:', err);
});

// CORS and middleware
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

// Static file serving
app.use(express.static(path.join(__dirname, '../public')));
app.use('/images', express.static(path.join(__dirname, '../public/images')));

// API routes
app.use(express.json());
app.use('/api', routes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

module.exports = app;
