const express = require('express')
const log = require('./utils/logConsole')
const path = require('path')
const dossierPublic = require('./var').dossier

/** import des routers */
const userRoutes = require('./routes/user')
const sauceRoutes = require('./routes/sauce')





const app = express()
app.use(express.json()) // parse l'objet requète
app.use((req, res, next) => {
    // log toute les requêtes dans la console pour le développement
    log.requete(req.method, req.url)
    next()
})


/** résoud l'erreur CORS */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})


/** chemins d'accès à l'API */
app.use('/api/auth', userRoutes)
app.use('/api/sauces', sauceRoutes)
app.use('/'+dossierPublic, express.static(path.join(__dirname, dossierPublic )))

module.exports = app