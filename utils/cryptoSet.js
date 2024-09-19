var crypto = require('crypto');
var CryptoJS = require('crypto-js');
require('dotenv').config()

function generateResetToken() {
    return crypto.randomBytes(32).toString('hex')
}

function encodeToken(token) {
    return CryptoJS.AES.encrypt(token, process.env.ENCRYPTION_KEY).toString()
}

module.exports = {
    generateResetToken,
    encodeToken
}

