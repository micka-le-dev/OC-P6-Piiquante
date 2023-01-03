const Sauce = require('../models/Sauces')
const consoleLog = require('../var').consoleLog


module.exports = authModifSauce = (req, res, next) => {
    if( consoleLog )
        console.log('   authModifSauce : '+req.params.id)
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