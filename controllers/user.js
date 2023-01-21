const bcrypt = require('bcrypt')
const User = require('../models/Users')
const Repondre = require('../utils/Repondre')
const Token = require('../utils/token')
const log = require('../utils/logConsole')
const passwordIsComplexe = require('../utils/password').passwordIsComplexe


exports.signup = (req, res, next) => {
    const messageComplexiteMotDePasse = passwordIsComplexe(req.body.password )
    if( messageComplexiteMotDePasse === 'ok' )
    {
        bcrypt.hash(req.body.password, 10)
        .then( hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            })
            user.save()
            .then( () => Repondre.message(res, 201, 'Compte utilisateur créé !') )
            .catch( err => Repondre.ErreurServeur(res, err, 'signup -> save : erreur !') )
        })
        .catch( err => Repondre.ErreurServeur(res, err, 'signup -> bcrypt.hash : erreur !') )
    }
    else{
        // le mot de passe n'est pas assez complexe
        Repondre.motDePasseSimple(res, messageComplexiteMotDePasse)
    }

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
                    log.log('Connexion de l\'utilisateur '+user._id)
                    Repondre.objet(res, 200, {
                            userId: user._id,
                            token: Token.encodeUserId(user._id)
                        },
                        'token'
                    )
                })
                .catch( err => Repondre.ErreurServeur(res, err, 'login -> bcrypt.compare : erreur !') )
        })
        .catch( err => Repondre.ErreurServeur(res, err, 'login -> findOne : erreur !') )
}