const express = require('express')
const router = express.Router()

const reponseParDefaut = require('../controllers/defaut').reponseParDefaut

router.use('', reponseParDefaut)

module.exports = router