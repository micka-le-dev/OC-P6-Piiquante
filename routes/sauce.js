const express = require('express')
const authentify = require('../middleware/authentifiy')
const authModifSauce = require('../middleware/authModifSauce')
const multer = require('../middleware/multer-conf')
const router = express.Router()

const sauceController = require('../controllers/sauce')



router.post('/', authentify, multer, sauceController.createSauce)
router.get('/', authentify, sauceController.getAllSauces)
router.get('/:id', authentify, sauceController.getOneSauce)
router.put('/:id', authentify, authModifSauce, multer, sauceController.modifySauce)
router.delete('/:id', authentify, authModifSauce, sauceController.deleteSauce)
router.post('/:id/like', authentify, sauceController.likeSauce)

module.exports = router