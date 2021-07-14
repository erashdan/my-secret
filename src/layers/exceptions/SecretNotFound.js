const ResponseException = require('./ResponseException')

class SecretNotFound extends ResponseException {
    statusCode = 404
    errorException = 'Secret URI not found'
}

module.exports = SecretNotFound
