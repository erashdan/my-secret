const ResponseException = require('../../exceptions/ResponseException')

class MockException extends ResponseException {
    statusCode = 999
    errorMessage = 'Ops there\'s an error'
}

module.exports = MockException
