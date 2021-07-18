const ResponseException = require('./ResponseException')

class SecretLocked extends ResponseException {
    statusCode = 422
    errorMessage = 'One of the fields are empty'

    setMessage(message) {
        this.errorMessage = message
    }
}

module.exports = SecretLocked
