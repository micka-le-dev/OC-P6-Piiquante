const log = require('../utils/logConsole')




exports.devLog = (req, res, next) => {
    log.requete(req.method, req.url)
    next()
}