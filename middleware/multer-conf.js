const multer = require('multer')

const dossier = 'images'

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

const storage = multer.diskStorage({
        destination: (req, file, callback) => { callback(null, dossier ) },
        filename: (req, file, callback) => {
                const name = file.originalname.replaceAll(' ', '_')
                const extension = MIME_TYPES[file.mimetype]
                callback(null, name+'_'+Date.now()+'.'+extension)
            }
    })

module.exports = multer({ storage }).single('image')