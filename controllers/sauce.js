const Repondre = require('../utils/Repondre')
const Sauce = require('../models/Sauces')
const publicFile = require('../utils/fileName')
const log = require('../utils/logConsole')



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
        .then(sauces => Repondre.objet(res, 200, sauces, 'sauces'))
        .catch(err => Repondre.ErreurServeur(res, err, 'getAllSauces() => Sauce.find'))
}



exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => Repondre.objet(res, 200, sauce, 'sauce'))
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



/**
 * @param {Sauce} sauce
 * @param {string} userId
 * @param {number} like
 * @returns {Sauce}
 */
function updateLikeDislike(sauce, userId, like){
    const indexLike = sauce.usersLiked.findIndex( elem => elem === userId)
    const indexDislike = sauce.usersDisliked.findIndex( elem => elem === userId)

    // supprime userId de usersLiked et usersDisliked si besoin
    if( indexLike >= 0){
        if( like <= 0 ){
            sauce.usersLiked.splice(indexLike, 1)
            sauce.likes -= 1
        }
    }
    if( indexDislike >= 0){
        if( like >= 0 ){
            sauce.usersDisliked.splice(indexDislike, 1)
            sauce.dislikes -= 1
        }
    }


    if( like >= 1 && indexLike <= -1 ){
        sauce.usersLiked.push(userId)
        sauce.likes += 1
    }
    else if( like <= -1 && indexDislike <= -1 ){
        sauce.usersDisliked.push(userId)
        sauce.dislikes += 1
    }

    return sauce
}

exports.likeSauce = (req, res, next) => {

    let actionUser
    switch(req.body.like){
        case -1: actionUser = 'dislike'
            break
        case 1: actionUser = 'like'
            break
        case 0: actionUser = 'annule son like/dislike'
            break
    }
    log.log('L\'utilisateur '+actionUser)

    Sauce.findOne({ _id: req.params.id })
        .then( sauce => {
            const newSauce = updateLikeDislike(sauce, req.auth.userId, req.body.like*1)

            Sauce.updateOne({ _id: newSauce._id }, newSauce )
                .then(() => Repondre.message(res, 200, 'Modification du like/dislike enregistrée !') )
                .catch( err => Repondre.ErreurServeur(res, err, 'likeSauce() => Sauce.updateOne') )
        })
        .catch( err => Repondre.ErreurServeur(res, err, 'likeSauce() => Sauce.findOne'))

}