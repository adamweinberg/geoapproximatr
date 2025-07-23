const router = require('express').Router()
const { db } = require('../db')
module.exports = router

// Health check endpoint to debug database connection
router.get('/', async (req, res, next) => {
  try {
    // Test database connection
    await db.authenticate()
    
    // Check if tables exist
    const [results] = await db.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `)
    
    res.json({
      status: 'OK',
      database: 'Connected',
      tables: results.map(r => r.table_name),
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        DATABASE_URL: process.env.DATABASE_URL ? 'Set' : 'Missing',
        NETLIFY_DATABASE_URL: process.env.NETLIFY_DATABASE_URL ? 'Set' : 'Missing',
        JWT: process.env.JWT ? 'Set' : 'Missing'
      }
    })
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      error: error.message,
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        DATABASE_URL: process.env.DATABASE_URL ? 'Set' : 'Missing',
        NETLIFY_DATABASE_URL: process.env.NETLIFY_DATABASE_URL ? 'Set' : 'Missing',
        JWT: process.env.JWT ? 'Set' : 'Missing'
      }
    })
  }
})