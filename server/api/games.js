const router = require('express').Router()
// Use serverless models if available, fallback to regular models
let Game, User;
try {
  const serverlessModels = require('../db/serverless-index').models;
  Game = serverlessModels.Game;
  User = serverlessModels.User;
  console.log('Games route using serverless models');
} catch {
  const regularModels = require('../db').models;
  Game = regularModels.Game;
  User = regularModels.User;
  console.log('Games route using regular models');
}

const { Op } = require('sequelize')
module.exports = router

// Global high scores - no authentication required
router.get('/global/all-time', async (req, res, next) => {
  try {
    const games = await Game.findAll({
      include: [{
        model: User,
        attributes: ['username']
      }],
      order: [['totalScore', 'DESC']],
      limit: 20
    })
    res.json(games)
  } catch (err) {
    next(err)
  }
})

router.get('/global/30-days', async (req, res, next) => {
  try {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const games = await Game.findAll({
      include: [{
        model: User,
        attributes: ['username']
      }],
      where: {
        completedAt: {
          [Op.gte]: thirtyDaysAgo
        }
      },
      order: [['totalScore', 'DESC']],
      limit: 20
    })
    res.json(games)
  } catch (err) {
    next(err)
  }
})

router.get('/global/24-hours', async (req, res, next) => {
  try {
    const twentyFourHoursAgo = new Date()
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24)
    
    const games = await Game.findAll({
      include: [{
        model: User,
        attributes: ['username']
      }],
      where: {
        completedAt: {
          [Op.gte]: twentyFourHoursAgo
        }
      },
      order: [['totalScore', 'DESC']],
      limit: 20
    })
    res.json(games)
  } catch (err) {
    next(err)
  }
})

// Middleware to require authentication
const requireAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    if (!token) {
      return res.status(401).json({ error: 'No token provided' })
    }
    const user = await User.findByToken(token)
    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' })
  }
}

// Save a completed game
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { totalScore, rounds, distances, scores } = req.body
    
    console.log('Saving game for user:', req.user.id, {
      totalScore,
      roundsCount: rounds?.length,
      distancesCount: distances?.length,
      scoresCount: scores?.length
    });
    
    // Calculate game statistics
    const averageScore = Math.round(totalScore / scores.length)
    const bestRound = Math.max(...scores)
    const worstRound = Math.min(...scores)
    
    const game = await Game.create({
      userId: req.user.id,
      totalScore,
      averageScore,
      bestRound,
      worstRound,
      rounds,
      distances,
      scores
    })
    
    console.log('Game saved successfully:', game.id);
    res.status(201).json(game)
  } catch (err) {
    next(err)
  }
})

// Get user's top 5 high scores
router.get('/high-scores', requireAuth, async (req, res, next) => {
  try {
    const games = await Game.findAll({
      where: { userId: req.user.id },
      order: [['totalScore', 'DESC']],
      limit: 5
    })
    res.json(games)
  } catch (err) {
    next(err)
  }
})

// Get user's last 5 games
router.get('/recent', requireAuth, async (req, res, next) => {
  try {
    const games = await Game.findAll({
      where: { userId: req.user.id },
      order: [['completedAt', 'DESC']],
      limit: 5
    })
    res.json(games)
  } catch (err) {
    next(err)
  }
})

// Get a specific game by ID (only if user owns it)
router.get('/:id', requireAuth, async (req, res, next) => {
  try {
    const game = await Game.findOne({
      where: { 
        id: req.params.id,
        userId: req.user.id 
      }
    })
    
    if (!game) {
      return res.status(404).json({ error: 'Game not found' })
    }
    
    res.json(game)
  } catch (err) {
    next(err)
  }
})