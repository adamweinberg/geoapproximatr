const router = require('express').Router()
module.exports = router

// Add debugging middleware
router.use((req, res, next) => {
  console.log('API Router - Incoming request:', req.method, req.path, req.originalUrl);
  console.log('API Router - Headers:', req.headers);
  next();
});

router.use('/users', require('./users'))
router.use('/health', require('./health'))
router.use('/games', require('./games'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
