const Token = require('../utils/token')
const Repondre = require('../utils/Repondre')
const consoleLog = require('../var').consoleLog

module.exports = authentify = (req, res, next) => {
    delete req.auth
    try{
        req.auth = { userId: Token.decodeUserId(req.headers.authorization) }
        if( consoleLog )
            console.log('   Utilisateur ' + req.auth.userId+' authentifié.')
        next()
    }catch(err){
        Repondre.nonAuthorise(res,err)
    }
}