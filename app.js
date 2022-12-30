const express = require('express')
const mongoose = require('mongoose')

/** import des routes */
const defaultRoutes = require('./routes/defaut')
const devLog = require('./routes/dev')


mongoose.set('strictQuery', true)
mongoose.connect('mongodb+srv://go-fullstack-v3-fr:QCwY6hhLnLxTl1vN@oc-p6-cours--go-fullsta.gnfmyuh.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'))




const app = express()
app.use(express.json()) // parse l'objet requète
app.use(devLog) // log toute les requètes dans la console pour le développement


/** résoud l'erreur CORS */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})


/** chemins d'accès à l'API */
app.post('/api/auth', userRoutes)

module.exports = app