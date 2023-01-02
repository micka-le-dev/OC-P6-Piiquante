const Repondre = require('../utils/Repondre')
const Sauce = require('../models/Sauces')
const dossierImagesSauces = require('../var').dossierImagesSauces

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

    console.log('new Sauce({')
    console.log(sauce)
    console.log('})')

    sauce.save()
        .then(() => Repondre.message(res, 201, 'Nouvelle sauce enregistrée !'))
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