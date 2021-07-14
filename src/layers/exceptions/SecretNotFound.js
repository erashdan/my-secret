const ResponseException = require('./ResponseException')

class SecretNotFound extends ResponseException {
    statusCode = 404
    errorMessage = 'The URI is not exist'
}

module.exports = SecretNotFound
