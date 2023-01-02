const Repondre = require('../utils/Repondre')

exports.createSauce = (req, res, next) => {
    Repondre.ErreurServeur(res, new Error('Contrôleur non-implémenté : createSauce'), 'createSauce')
    // Repondre.message(res, 201, 'Nouvelle sauce enregistrée !')
}