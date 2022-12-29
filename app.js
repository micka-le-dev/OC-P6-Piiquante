const express = require('express')
const routerParDefaut = require('./routes/defaut')
const app = express()

app.use(routerParDefaut)

module.exports = app