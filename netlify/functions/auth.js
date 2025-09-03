const serverless = require('serverless-http');
const express = require('express');

console.log('=== AUTH FUNCTION STARTING ===');

try {
  // Initialize serverless database and models
  require('../../server/db/serverless-index');
  console.log('Serverless database initialized successfully');
} catch (error) {
  console.error('Failed to initialize serverless database:', error);
  throw error;
}

try {
  const authRouter = require('../../server/auth');
  console.log('Auth router loaded successfully');
} catch (error) {
  console.error('Failed to load auth router:', error);
  throw error;
}

const authRouter = require('../../server/auth');

const app = express();

// Middleware
app.use(express.json());

// Add logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`, req.query, req.body);
  next();
});

// Strip /api prefix from the path since Netlify redirects include it
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    req.url = req.url.replace('/api', '') || '/';
    console.log('Stripped /api prefix, new path:', req.path);
  }
  next();
});

// Auth routes
app.use('/', authRouter);

// 404 handler
app.use((req, res) => {
  console.log('404 - Route not found:', req.method, req.path);
  res.status(404).json({ error: 'Route not found', path: req.path, method: req.method });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error in auth function:', err);
  res.status(err.status || 500).json({ 
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
});

console.log('Auth function setup complete');
module.exports.handler = serverless(app);