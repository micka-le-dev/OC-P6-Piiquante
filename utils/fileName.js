const dossierPublic = require('../var').dossier

exports.fileNameCompete = (urlFile) => dossierPublic+'/'+urlFile.split(dossierPublic+'/')[1]