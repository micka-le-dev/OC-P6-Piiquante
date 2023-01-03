const Repondre = require('../utils/Repondre')
const Sauce = require('../models/Sauces')
const fs = require('fs')
const { consoleLog } = require('../var')
const publicFile = require('../utils/fileName')

exports.createSauce = (req, res, next) => {
    const sauceReq = JSON.parse(req.body.sauce)
    delete sauceReq._id
    delete sauceReq.userId

    const sauce = new Sauce({
        ...sauceReq,
        userId: req.auth.userId,
        imageUrl: publicFile.imageUrlSauce(req),
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
    if( ! req.auth.sauceOrigin ){
        Repondre.nonAuthorise(res,new Error("Utilisateur non-authorisé à modifier cette sauce !"))
        return
    }

    const sauceOrigin = req.auth.sauceOrigin
    const promesses = []

    let newSauce = {}

    if( req.file ){
        promesses.push( publicFile.deleteImageSauce(sauceOrigin.imageUrl) )
        newSauce = {
            ...JSON.parse(req.body.sauce),
            imageUrl: publicFile.imageUrlSauce(req)
        }
    }
    else{
        newSauce = { ...req.body }
    }
    newSauce._id = req.params.id
    newSauce.userId = req.auth.userId

    promesses.push( Sauce.updateOne({ _id: newSauce._id }, newSauce ) )

    Promise.all(promesses)
        .then(() => Repondre.message(res, 200, "Sauce mise à jour !" ))
        .catch(err => Repondre.ErreurServeur(res, err, 'modifySauce() => Sauce.updateOne'))
}

exports.deleteSauce = (req, res, next) => {
    try{
        const sauceOrigin = req.auth.sauceOrigin
        publicFile.deleteImageSauce(sauceOrigin.imageUrl)
            .then(() => {
                Sauce.deleteOne( { _id: sauceOrigin._id })
                    .then( () => Repondre.message(res, 200, `Sauce ${sauceOrigin._id} supprimée !`) )
                    .catch( err => Repondre.ErreurServeur(res, err, 'deleteSauce() => Sauce.deleteOne'))
            })
            .catch(err => Repondre.ErreurServeur(res, err, 'deleteSauce() => publicFile.deleteFile'))
    }
    catch(err){
        Repondre.ErreurServeur(res, err, 'deleteSauce() => try catch')
    }
}