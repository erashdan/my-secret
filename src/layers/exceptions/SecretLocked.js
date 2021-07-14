const ResponseException = require('./ResponseException')

class SecretLocked extends ResponseException {
    statusCode = 204
    errorMessage = 'The secret is deleted'
}

module.exports = SecretLocked
