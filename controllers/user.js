const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')


exports.signup = (req, res, next) => {

}


function messageErreurAuth(res){
    return res.status(401).json({ message: 'Paire "email/mot de passe" incorrecte !' })
}

exports.login = (req, res, next) => {
    
}