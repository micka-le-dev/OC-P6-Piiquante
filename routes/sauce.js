const express = require('express')
const authentify = require('../middleware/authentifiy')
const multer = require('../middleware/multer-conf')
const router = express.Router()

const sauceController = require('../controllers/sauce')



router.post('/', authentify, multer, sauceController.createSauce)
router.get('/', authentify, multer, sauceController.getAllSauces)
router.get('/:id', authentify, sauceController.getOneSauce)

module.exports = router