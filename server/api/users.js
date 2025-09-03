const router = require('express').Router()
const { models: { User, Game }} = require('../db')
const jwt = require('jsonwebtoken')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/profile', async (req, res, next) => {
  try {
    const token = req.headers.authorization
    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }

    const { id } = await jwt.verify(token, process.env.JWT)
    const user = await User.findByPk(id)
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const { firstName, lastName, countryOfOrigin } = req.body

    // Validate required fields cannot be empty
    if (!firstName || !lastName || !countryOfOrigin) {
      return res.status(400).json({ 
        message: 'First name, last name, and country of origin are required and cannot be empty' 
      })
    }

    // Update user (username is no longer editable)
    await user.update({
      firstName,
      lastName,
      countryOfOrigin
    })

    // Return updated user (without password)
    const updatedUser = await User.findByPk(id, {
      attributes: ['id', 'username', 'firstName', 'lastName', 'countryOfOrigin']
    })
    
    res.json(updatedUser)
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' })
    }
    next(err)
  }
})

router.get('/stats', async (req, res, next) => {
  try {
    const token = req.headers.authorization
    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }

    const { id } = await jwt.verify(token, process.env.JWT)
    const user = await User.findByPk(id)
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const gameCount = await Game.count({
      where: { userId: id }
    })

    // Get highest score
    const highestScoreGame = await Game.findOne({
      where: { userId: id },
      order: [['totalScore', 'DESC']],
      attributes: ['totalScore']
    })

    const highestScore = highestScoreGame ? highestScoreGame.totalScore : 0

    res.json({ gameCount, highestScore })
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' })
    }
    next(err)
  }
})

router.delete('/account', async (req, res, next) => {
  try {
    const token = req.headers.authorization
    if (!token) {
      return res.status(401).json({ message: 'No token provided' })
    }

    const { id } = await jwt.verify(token, process.env.JWT)
    const user = await User.findByPk(id)
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Delete all user's games first (cascade)
    await Game.destroy({
      where: { userId: id }
    })

    // Delete the user
    await user.destroy()

    res.json({ message: 'Account deleted successfully' })
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' })
    }
    next(err)
  }
})
