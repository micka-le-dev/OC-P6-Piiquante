
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


exports.devLog = (req, res, next) => {
    const options = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        fractionalSecondDigits: 3
    }
    const strDate = '['+ new Intl.DateTimeFormat('fr-FR', options).format(new Date()) +']'
    const strMethod = strStd( req.method.toUpperCase(), 7 )
    // console.log('')
    console.log(strDate + ' <- ' + strMethod + ' ' + req.url)
    console.log(req.headers)
    console.log('')
    next()
}