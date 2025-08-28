const serverless = require('serverless-http');
const express = require('express');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

// Initialize serverless database and models
require('../../server/db/serverless-index');

const authRouter = require('../../server/auth');

const app = express();

// Middleware
app.use(express.json());

// Auth routes
app.use('/', authRouter);

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ 
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

module.exports.handler = serverless(app);