const bcrypt = require('bcrypt')
const User = require('../models/Users')
const repondreParUnMessage = require('../utils/modelResponse')
const Token = require('../utils/token')

function messageErreurNewCompte(res, err){
    repondreParUnMessage.resByMessage(res, 500, 'Erreur lors de la création du compte utilisateur !')
}

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then( hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            })
            user.save()
                .then( () => repondreParUnMessage.resByMessage(res, 201, 'Compte utilisateur créé !'))
                .catch( err => {
                    console.error('signup -> save : erreur !')
                    console.error(err)
                    messageErreurNewCompte(res)
                })
        })
        .catch( err => {
            console.error('signup -> bcrypt.hash : erreur !')
            console.error(err)
            messageErreurNewCompte(res)
        })

}


function messageErreurAuth(res){
    repondreParUnMessage.resByMessage(res, 401, 'Paire "email/mot de passe" incorrecte !')
}

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then( user => {
            if( user === null ){
                messageErreurAuth(res)
                return
            }
            bcrypt.compare(req.body.password, user.password)
                .then( valide => {
                    if( !valide ){
                        messageErreurAuth(res)
                        return
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: Token.newToken(user._id)
                    })
                })
                .catch( err => {
                    console.error('login -> bcrypt.compare : erreur !')
                    console.error(err)
                    repondreParUnMessage.resErreurServeur(res)
                 })
        })
        .catch( err => {
            console.error('login -> findOne : erreur !')
            console.error(err)
            repondreParUnMessage.resErreurServeur(res)
         })
}