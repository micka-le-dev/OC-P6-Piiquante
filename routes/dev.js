const express = require('express')
const router = express.Router()

const devLog = require('../controllers/dev').devLog

router.use('', devLog)

module.exports = router