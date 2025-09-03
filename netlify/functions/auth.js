const serverless = require('serverless-http');
const express = require('express');

// Initialize serverless database and models
require('../../server/db/serverless-index');

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

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ 
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

module.exports.handler = serverless(app);