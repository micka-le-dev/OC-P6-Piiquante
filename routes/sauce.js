const express = require('express')
const authentify = require('../middleware/authentifiy')
const multer = require('../middleware/multer-conf')
const router = express.Router()

const sauceController = require('../controllers/sauce')

router.post('/', authentify, multer, sauceController.createSauce)

module.exports = router