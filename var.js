
exports.port = 3000


const intervalTentativeConnexion = 10 // en minute
const tempsDUneTentativeHumaine = 5 // en seconde
exports.limiteTentativeConnexion = {
    intervaleEnMinutes: intervalTentativeConnexion,
    maxTentativeDansIntervale: intervalTentativeConnexion*60 / tempsDUneTentativeHumaine
}

// option de log en console
exports.consoleLog = true
exports.consoleLogShort = false
exports.consoleLogBigBody = false
exports.consoleLogMethodOptions = false
exports.separateurFinReponse = '-----------------------------------------------------------------------'
exports.consoleErreur = true


const dossier = 'public'
const dossierImages = dossier+'/images'
const dossierImagesSauces = dossierImages+'/sauces'

exports.dossier = dossier
exports.dossierImages = dossierImages
exports.dossierImagesSauces = dossierImagesSauces
