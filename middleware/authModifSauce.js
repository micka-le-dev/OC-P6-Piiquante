const Sauce = require('../models/Sauces')
const log = require('../utils/logConsole')
const Repondre = require('../utils/Repondre')


module.exports = authModifSauce = (req, res, next) => {
    log.log('authModifSauce : '+req.params.id)
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            if( req.auth.userId !== sauce.userId ){
                delete req.auth.sauceOrigin
                Repondre.nonAuthorise(res,new Error("Utilisateur non-authorisé à modifier cette sauce !"))
            }
            else{
                req.auth.sauceOrigin = sauce
                next()
            }
        })
        .catch(err => Repondre.ErreurServeur(res, err, 'deleteSauce() => Sauce.find'))
}