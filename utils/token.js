const jsonwebtoken = require('jsonwebtoken')
require('dotenv').config()


/**
 * @param {string} userId
 * @param {string} expiresIn
 * @returns {string} token
 */
exports.encodeUserId = ( userId, expiresIn = '24h') => {
    return jsonwebtoken.sign( { userId }, process.env.private_key_token, { expiresIn } )
}

/**
 * @param {string} token commence avec le mot clé "bearer"
 * @returns {string} userId
 */
exports.decodeUserId = ( token ) => {
    const framentsToken = token.split(' ')
    if( framentsToken[0] !== 'Bearer')
        throw new Error('Le token ne commence pas par le bon mot clé')

    const decodedToken = jsonwebtoken.verify(framentsToken[1], process.env.private_key_token)
    return decodedToken.userId
}