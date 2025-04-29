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

app.use('/api', routes);

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ success: false, message: err.message });
});

module.exports = app;