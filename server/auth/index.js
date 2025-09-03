const router = require('express').Router()

// Use serverless models if available, fallback to regular models
let User;
try {
  const serverlessModels = require('../db/serverless-index').models;
  User = serverlessModels.User;
  console.log('Auth route using serverless models');
} catch {
  const regularModels = require('../db').models;
  User = regularModels.User;
  console.log('Auth route using regular models');
}

module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body)}); 
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const { username, password, firstName, lastName, countryOfOrigin } = req.body
    
    // Validate required fields
    if (!username || !password || !firstName || !lastName || !countryOfOrigin) {
      return res.status(400).send('All fields are required: username, password, firstName, lastName, countryOfOrigin')
    }
    
    const user = await User.create({
      username,
      password,
      firstName,
      lastName,
      countryOfOrigin
    })
    res.send({token: await user.generateToken()})
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else if (err.name === 'SequelizeValidationError') {
      res.status(400).send(err.errors[0].message)
    } else {
      next(err)
    }
  }
})

router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization))
  } catch (ex) {
    next(ex)
  }
})
