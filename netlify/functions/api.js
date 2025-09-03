const serverless = require('serverless-http');
const express = require('express');

console.log('=== API FUNCTION STARTING ===');
console.log('Environment variables available:');
console.log('- NETLIFY_DATABASE_URL:', !!process.env.NETLIFY_DATABASE_URL);
console.log('- DATABASE_URL:', !!process.env.DATABASE_URL);
console.log('- REACT_APP_API_KEY:', !!process.env.REACT_APP_API_KEY);

try {
  // Initialize serverless database and models
  require('../../server/db/serverless-index');
  console.log('Serverless database initialized successfully');
} catch (error) {
  console.error('Failed to initialize serverless database:', error);
  throw error;
}

try {
  const apiRouter = require('../../server/api');
  console.log('API router loaded successfully');
} catch (error) {
  console.error('Failed to load API router:', error);
  throw error;
}

const apiRouter = require('../../server/api');

const app = express();

// Middleware
app.use(express.json());

// Add logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.query, req.body);
  next();
});

// API routes
app.use('/', apiRouter);

// 404 handler
app.use((req, res) => {
  console.log('404 - Route not found:', req.method, req.path);
  res.status(404).json({ error: 'Route not found', path: req.path, method: req.method });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error in API function:', err);
  res.status(err.status || 500).json({ 
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
});

console.log('API function setup complete');
module.exports.handler = serverless(app);