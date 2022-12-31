const jsonwebtoken = require('jsonwebtoken')

const privateKey = 'gtUy94P2LFy2SEo74AkEfaLfruXXEh'

/**
 * @param {string} userId
 * @param {string} expiresIn
 * @returns {string} token
 */
exports.encodeUserId = ( userId, expiresIn = '24h') => {
    return jsonwebtoken.sign( { userId }, privateKey, { expiresIn } )
}

/**
 * @param {string} token commence avec le mot clé "bearer"
 * @returns {string} userId
 */
exports.decodeUserId = ( token ) => {
    const framentsToken = token.split(' ')
    if( framentsToken[0] !== 'Bearer')
        throw new Error('Le token ne commence pas par le bon mot clé')

    const decodedToken = jsonwebtoken.verify(framentsToken[1], privateKey)
    return decodedToken.userId
}