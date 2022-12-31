const consoleLog = true
const consoleErreur = true
/**
 * repond avec le status 500 et envoi l'error tel quel
 * @param {*} res
 * @param {Error} error
 * @param {string} contextMessage
 */
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

exports.newAccoutUser = (res) => {
    if( consoleLog ){
        console.log('Repond avec le status : 201, le compte utilisateur est créé !')
        console.log('---')
        console.log('')
    }
    res.status(201).json({ message: 'Compte utilisateur créé !' })
}

exports.ErreurAuthentification = (res) => {
    const error = new Error('Paire "email/mot de passe" incorrecte !')
    if( consoleErreur) {
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