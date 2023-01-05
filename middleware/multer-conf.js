const multer = require('multer')
const log = require('../utils/logConsole')
const dossier = require('../var').dossierImagesSauces

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

const supprExtension = nameFile => {
    const fragmentsNom = nameFile.split('.')
    fragmentsNom.pop()
    const newName = fragmentsNom.join('.')
    return newName
}

const storage = multer.diskStorage({
        destination: (req, file, callback) => { callback(null, dossier ) },
        filename: (req, file, callback) => {
                const name = supprExtension(''+file.originalname).replaceAll(' ', '_')
                const extension = MIME_TYPES[file.mimetype]
                const newName = name+'_'+Date.now()+'.'+extension
                log.log('multer : '+file.originalname+"  => "+dossier+'/'+newName)
                callback(null, newName)
            }
    })

module.exports = multer({ storage }).single('image')