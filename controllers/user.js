const bcrypt = require('bcrypt')
const User = require('../models/Users')
const Repondre = require('../utils/Repondre')
const Token = require('../utils/token')


exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then( hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            })
            user.save()
                .then( () => Repondre.message(res, 201, 'Compte utilisateur créé !'))
                .catch( err => {
                    Repondre.ErreurServeur(res, err, 'signup -> save : erreur !')
                })
        })
        .catch( err => {
            Repondre.ErreurServeur(res, err, 'signup -> bcrypt.hash : erreur !')
        })

}


exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then( user => {
            if( user === null ){
                Repondre.ErreurAuthentification(res)
                return
            }
            bcrypt.compare(req.body.password, user.password)
                .then( valide => {
                    if( !valide ){
                        Repondre.ErreurAuthentification(res)
                        return
                    }
                    Repondre.objet(res, 200, {
                        userId: user._id,
                        token: Token.encodeUserId(user._id)
                    })
                })
                .catch( err => {
                    Repondre.ErreurServeur(res, err, 'login -> bcrypt.compare : erreur !')
                 })
        })
        .catch( err => {
            Repondre.ErreurServeur(res, err, 'login -> findOne : erreur !')
         })
}