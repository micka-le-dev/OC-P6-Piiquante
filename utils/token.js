const jsonwebtoken = require('jsonwebtoken')

const privateKey = 'gtUy94P2LFy2SEo74AkEfaLfruXXEh'

/**
 * @param {string} userId
 * @param {string} expiresIn
 * @returns {string} token
 */
exports.newToken = ( userId, expiresIn = '24h') => {
    return jsonwebtoken.sign( { userId }, privateKey, { expiresIn } )
}

