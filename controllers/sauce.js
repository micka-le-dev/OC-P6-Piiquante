const Repondre = require('../utils/Repondre')
const Sauce = require('../models/Sauces')
const dossierImagesSauces = require('../var').dossierImagesSauces
const fs = require('fs')
const { consoleLog } = require('../var')
const fileNameCompete = require('../utils/fileName').fileNameCompete

exports.createSauce = (req, res, next) => {
    const sauceReq = JSON.parse(req.body.sauce)
    delete sauceReq._id
    delete sauceReq.userId

    const sauce = new Sauce({
        ...sauceReq,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/${dossierImagesSauces}/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    })

    sauce.save()
        .then(() => Repondre.message(res, 201, 'Nouvelle sauce enregistrée : '+ sauce._id +' !'))
        .catch(err => Repondre.ErreurServeur(res,err,'createSauce() => sauce.save'))
}

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => Repondre.objet(res, 200, sauces))
        .catch(err => Repondre.ErreurServeur(res, err, 'getAllSauces() => Sauce.find'))
}

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => Repondre.objet(res, 200, sauce))
        .catch(err => Repondre.ErreurServeur(res, err, 'getAllSauces() => Sauce.find'))
}

exports.modifySauce = (req, res, next) => {
    Repondre.nonImplemented(res, 'contrôleur modifySauce')
}

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => {
            if( req.auth.userId !== sauce.userId ){
                Repondre.nonAuthorise(res,new Error("Utilisateur non-authorisé à supprimer cette sauce !"))
                return
            }
            const pathFileComplete = fileNameCompete(sauce.imageUrl)
            if( consoleLog )
                console.log('   Va supprimer '+pathFileComplete)
            fs.unlink( pathFileComplete, () => {
                Sauce.deleteOne( { _id: req.params.id })
                    .then( () => Repondre.message(res, 200, `Sauce ${req.params.id} supprimée !`) )
                    .catch( err => Repondre.ErreurServeur(res, err, 'deleteSauce() => Sauce.deleteOne'))
            } )
        })
        .catch(err => Repondre.ErreurServeur(res, err, 'deleteSauce() => Sauce.find'))
}