const dossierPublic = require('../var').dossier
const dossierImagesSauces = require('../var').dossierImagesSauces
const fs = require('fs')

function deleteFile(filename) {
    const promesse = new Promise((resolve, reject) => {
        try{
            fs.unlinkSync(filename)
            resolve()
        }catch( err ){
            reject(err)
        }
    })
    return promesse
}

exports.deleteImageSauce = (imageUrl) => deleteFile(dossierPublic+'/'+imageUrl.split(dossierPublic+'/')[1])
exports.imageUrlSauce = (req) => `${req.protocol}://${req.get('host')}/${dossierImagesSauces}/${req.file.filename}`