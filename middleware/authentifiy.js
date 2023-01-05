const Token = require('../utils/token')
const Repondre = require('../utils/Repondre')
const log = require('../utils/logConsole')

module.exports = authentify = (req, res, next) => {
    delete req.auth
    try{
        const token = req.headers.authorization//+'jhg'//test un mauvais token
        req.auth = { userId: Token.decodeUserId(token) }
        log.log('Utilisateur ' + req.auth.userId+' authentifié.')
        next()
    }catch(err){
        Repondre.nonAuthorise(res,err)
    }
}