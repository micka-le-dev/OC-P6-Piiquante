const express = require('express')
const authentify = require('../middleware/authentifiy')
const multer = require('../middleware/multer-conf')
const router = express.Router()

const sauceController = require('../controllers/sauce')

router.use( (req, res, next)=> {
    console.log('/api/sauces')
    console.log(req)
    console.log('---')
    next()
})


router.post('/', /*authentify, multer,*/ sauceController.createSauce)

module.exports = router