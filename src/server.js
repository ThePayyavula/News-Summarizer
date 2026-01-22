/**
 * Express Server
 * Main application entry point
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { SERVER_CONFIG } = require('./config');
const apiRoutes = require('./routes/api');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, '../public')));

// API routes
app.use('/api', apiRoutes);

// Serve index.html for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

// Start server
const PORT = SERVER_CONFIG.port;
app.listen(PORT, () => {
  console.log(`\nServer running on http://localhost:${PORT}`);
});

module.exports = app;
