const Token = require('../utils/token')
const Repondre = require('../utils/Repondre')
const consoleLog = require('../var').consoleLog

module.exports = authentify = (req, res, next) => {
    delete req.auth
    try{
        const token = req.headers.authorization//+'jhg'//test un mauvais token
        // if( consoleLog )
        //     console.log('   authentification du token : '+token)
        req.auth = { userId: Token.decodeUserId(token) }
        if( consoleLog )
            console.log('   Utilisateur ' + req.auth.userId+' authentifié.')
        next()
    }catch(err){
        Repondre.nonAuthorise(res,err)
    }
}