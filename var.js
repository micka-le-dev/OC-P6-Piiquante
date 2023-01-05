
exports.beginConnectMongoDB = false
exports.port = process.env.PORT || 3000

exports.consoleErreur = true
exports.consoleLog = true
exports.consoleLogShort = true
exports.consoleLogMethodOptions = false
exports.consoleLogBigBody = false
exports.separateurFinReponse = '-----------------------------------------------------------------------'


const dossier = 'public'
const dossierImages = dossier+'/images'
const dossierImagesSauces = dossierImages+'/sauces'

exports.dossier = dossier
exports.dossierImages = dossierImages
exports.dossierImagesSauces = dossierImagesSauces
