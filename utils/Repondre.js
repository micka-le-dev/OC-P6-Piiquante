const consoleLog = require('../var').consoleLog
const consoleLogBigBody = require('../var').consoleLogBigBody
const consoleErreur = require('../var').consoleErreur
const separateurFinReponse = require('../var').separateurFinReponse

exports.nonImplemented = (res, contextMessage) => {
    const error = new Error('Fonction non-implémentée : '+contextMessage)
    if( consoleErreur) {
        console.error('   Repond dans le constexte : '+contextMessage)
        console.error('      Repond avec le status : 500, Erreur du serveur')
        console.error('      Erreur du serveur : '+error)
        console.error(separateurFinReponse)
        console.error('')
    }
    res.status(500).json({ error })
}

exports.ErreurServeur = (res, error, contextMessage) => {
    if( consoleErreur) {
        console.error('   Repond dans le constexte : '+contextMessage)
        console.error('      Repond avec le status : 500, Erreur du serveur')
        console.error('      Erreur du serveur : '+error)
        console.error(separateurFinReponse)
        console.error('')
    }
    res.status(500).json({ error })
}


exports.ErreurAuthentification = (res) => {
    const message = 'Paire "email/mot de passe" incorrecte !'
    if( consoleLog ) {
        console.log('   Repond avec le status : 401, Erreur d\'authentification')
        console.log('      '+message)
        console.log(separateurFinReponse)
        console.log('')
    }
    res.status(401).json({ message })
}

exports.nonAuthorise = (res, error) => {
    if( consoleErreur ) {
        console.error('   Repond avec le status : 401, Erreur d\'authentification')
        console.error('Erreur d\'authentification : '+error)
        console.error(separateurFinReponse)
        console.error('')
    }
    res.status(401).json({ error })
}

exports.objet = (res, statusHTTP, objet) => {
    if( consoleLog ){
        console.log('   Repond avec le status : '+statusHTTP)
        if( consoleLogBigBody )
            console.log(objet)
        else if ( objet instanceof Array )
            console.log(`   Tableau de ${objet.length} objets.`)
        console.log(separateurFinReponse)
        console.log('')
    }
    res.status(statusHTTP).json(objet)
}

exports.message = (res, statusHTTP, message) => {
    if( consoleLog ){
        console.log('   Repond avec le status : '+statusHTTP)
        console.log('      '+message)
        console.log(separateurFinReponse)
        console.log('')
    }
    res.status(statusHTTP).json({ message })
}