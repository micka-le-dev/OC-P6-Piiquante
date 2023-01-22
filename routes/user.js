const express = require('express')
const router = express.Router()
const rateLimit = require('express-rate-limit')
const limiteTentativeConnexion = require('../var').limiteTentativeConnexion

const userController = require('../controllers/user')

const limiter = rateLimit({
	windowMs: limiteTentativeConnexion.intervaleEnMinutes * 60 * 1000,
	max: limiteTentativeConnexion.maxTentativeDansIntervale,
	standardHeaders: true,
	legacyHeaders: false
})


router.post('/signup', userController.signup)
router.post('/login', limiter, userController.login)

module.exports = router