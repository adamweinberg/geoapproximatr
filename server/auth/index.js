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
    console.log('Login attempt for user:', req.body.username);
    const token = await User.authenticate(req.body);
    console.log('Login successful, sending token');
    res.send({ token }); 
  } catch (err) {
    console.error('Login error:', err);
    next(err);
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    console.log('Signup attempt:', req.body);
    const { username, password, firstName, lastName, countryOfOrigin } = req.body
    
    // Validate required fields
    if (!username || !password || !firstName || !lastName || !countryOfOrigin) {
      console.log('Validation failed: missing required fields');
      return res.status(400).send('All fields are required: username, password, firstName, lastName, countryOfOrigin')
    }
    
    console.log('Creating user...');
    const user = await User.create({
      username,
      password,
      firstName,
      lastName,
      countryOfOrigin
    });
    console.log('User created successfully:', user.id);
    
    console.log('Generating token...');
    const token = await user.generateToken();
    console.log('Token generated, sending response');
    res.send({token});
  } catch (err) {
    console.error('Signup error:', err);
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
    console.log('Me request with token:', req.headers.authorization);
    const user = await User.findByToken(req.headers.authorization);
    console.log('User found:', user.id);
    res.send(user);
  } catch (ex) {
    console.error('Me error:', ex);
    next(ex);
  }
})
