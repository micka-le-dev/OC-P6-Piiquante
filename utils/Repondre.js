const log = require('../utils/logConsole')

exports.nonImplemented = (res, contextMessage) => {
    const error = new Error('Fonction non-implémentée : '+contextMessage)
    log.erreur(500, error, contextMessage)
    res.status(500).json({ error: error+'' })
}

exports.ErreurServeur = (res, error, contextMessage) => {
    log.erreur(500, error, contextMessage)
    res.status(500).json({ error: error+'' })
}


exports.ErreurAuthentification = (res) => {
    const message = 'Paire "email/mot de passe" incorrecte !'
    log.reponse(401, message, 'message')
    res.status(401).json({ message })
}

exports.nonAuthorise = (res, error) => {
    log.reponse(401, error, 'erreur non-authorise')
    res.status(401).json({ error: error+'' })
}

exports.objet = (res, statusHTTP, objet, strNomObjet) => {
    log.reponse(statusHTTP, objet, strNomObjet)
    res.status(statusHTTP).json(objet)
}

exports.message = (res, statusHTTP, message) => {
    log.reponse(statusHTTP, message, 'message')
    res.status(statusHTTP).json({ message })
}