const varServeur = require('../var')

function strDate(){
    const options = {
        // hour: "numeric",
        minute: "numeric",
        second: "numeric",
        // fractionalSecondDigits: 3
    }
    return '[ '+ new Intl.DateTimeFormat('fr-FR', options).format(new Date()) +' ]'
}
function resume(object){
    if ( object instanceof Array ){
        const strLignes = []
        strLignes.push( `Tableau de ${object.length} ${object.heat?'sauces':'objets'}.` )
        object.forEach(sauce => strLignes.push('    sauce '+sauce._id+', '+sauce.name))
        return strLignes.join("\n")
    }
    return ''+object
}
function resumeOneLigne(objet, strNomObjet){
    if( strNomObjet === 'message')
        return 'message : '+objet
    if( strNomObjet === 'sauce' )
        return 'sauce ' +objet._id+' : '+objet.name
    if( objet instanceof Array && strNomObjet === 'sauces')
        return `Tableau de ${objet.length} sauces.`
    if( objet instanceof Array)
        return `Tableau de ${objet.length} objets.`
    if( strNomObjet === 'token')
        return 'userId '+objet.userId+', token *****************'
    return strNomObjet+' : '+objet
}
function nbLignes(str){
    return str.split("\n" ).length
}
const force = (message) => console.log(strDate() + ' - ' + message)
const forceErreur = (message) => console.error(strDate() + ' - ' + message)

const logObjet = (object, strNameObject='objet') => {
    if( ! varServeur.consoleLog )
        return

    if( strNameObject === 'message'){
        force('message : '+object)
        return
    }
    if( object instanceof Error ){
        force(strNameObject+' - '+object)
        return
    }
    if( varServeur.consoleLogShort ){
        force(strNameObject+' => '+resume(object))
        return
    }
    const strdate = strDate()
    console.log(strdate+' - début '+strNameObject)

    if( !varServeur.consoleLogBigBody && nbLignes(object+'') > 15 )
        console.log(resume(object))
    else
        console.log(object)
    console.log(strdate+' - fin '+strNameObject)
}

exports.force = force
exports.log = (message) => {
    if( varServeur.consoleLog )
        console.log(strDate() + ' - ' + message)
}
exports.reponse = (statusHTTP, objet, strNomObjet='objet') => {
    if( !varServeur.consoleLog )
        return

    if( varServeur.consoleLogShort )
        force('Répond ('+statusHTTP+') '+resumeOneLigne(objet, strNomObjet))
    else{
        force('Répond ('+statusHTTP+')')
        logObjet(objet,strNomObjet)
    }
    // console.log(varServeur.separateurFinReponse)
    console.log('')
    if( ! varServeur.consoleLog )
        return
    console.log('')
}

exports.error = forceErreur
exports.erreur = (statusHTTP, error, contextMessage) => {
    if( varServeur.consoleErreur ) {
        forceErreur('------')
        forceErreur('Repond dans le constexte : '+contextMessage)
        forceErreur('Repond avec le status : '+statusHTTP)
        forceErreur(''+error)
        forceErreur('fin de réponse')
        forceErreur('------')
        forceErreur('détail de l\'erreur')
        console.error(error)
        console.error(varServeur.separateurFinReponse)
        console.error('')
        console.error('')
    }
}

/**
 * standardise la longueur d'un string
 * @param {string} str
 * @param {number} finalLength
 * @returns {string} // str de longueur finalLength avec des espaces devant
 */
function strStd(str, finalLength){
    while(str.length < finalLength)
        str = ' '+str
    return str
}
exports.requete = (method, url) => {
    if( !varServeur.consoleLog )
        return

    const strMethod = strStd( method.toUpperCase(), 7 )

    if( varServeur.consoleLogMethodOptions || strMethod !== 'OPTIONS' )
        console.log(strDate() + ' <- ' + strMethod + ' ' + url)
}