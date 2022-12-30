
exports.resByMessage = (res, statusHTTP, message) => {
    console.log('res status : '+ statusHTTP+', "'+message+'"')
    res.status(statusHTTP).json({ message })
}
exports.resErreurServeur = (res) => {
    console.log('res status : 500, Erreur du serveur')
    res.status(500).json({ message: 'Erreur du serveur' })
}