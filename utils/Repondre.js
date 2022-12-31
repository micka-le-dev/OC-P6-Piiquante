const consoleLog = require('../var').consoleLog
const consoleErreur = require('../var').consoleErreur

exports.ErreurServeur = (res, error, contextMessage) => {
    if( consoleErreur) {
        console.error(contextMessage)
        console.error('Repond avec le status : 500, Erreur du serveur')
        console.error(error)
        console.error('---')
        console.error('')
    }
    res.status(500).json({ error })
}


exports.ErreurAuthentification = (res) => {
    const message = 'Paire "email/mot de passe" incorrecte !'
    if( consoleLog ) {
        console.log('Repond avec le status : 401, Erreur d\'authentification')
        console.log(message)
        console.log('---')
        console.log('')
    }
    res.status(401).json({ message })
}

exports.nonAuthorise = (res, error) => {
    if( consoleErreur ) {
        console.error('Repond avec le status : 401, Erreur d\'authentification')
        console.error(error)
        console.error('---')
        console.error('')
    }
    res.status(401).json({ error })
}

exports.objet = (res, statusHTTP, objet) => {
    if( consoleLog ){
        console.log('Repond avec le status : '+statusHTTP)
        console.log(objet)
        console.log('---')
        console.log('')
    }
    res.status(statusHTTP).json(objet)
}

exports.message = (res, statusHTTP, message) => {
    if( consoleLog ){
        console.log('Repond avec le status : '+statusHTTP)
        console.log(message)
        console.log('---')
        console.log('')
    }
    res.status(statusHTTP).json({ message })
}