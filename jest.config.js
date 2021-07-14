module.exports = {
    testMatch: ['<rootDir>/**/**/?(*.)(spec|test).js'],

    moduleNameMapper: {
        '^/opt/utils': "<rootDir>/src/layers/functions/utils",
        '^/opt/response': "<rootDir>/src/layers/functions/response",
        '^/opt/ResponseException': "<rootDir>/src/layers/exceptions/ResponseException",
        '^/opt/SecretNotFound': "<rootDir>/src/layers/exceptions/SecretNotFound",
        '^/opt/SecretLocked': "<rootDir>/src/layers/exceptions/SecretLocked",
    },
    modulePaths: [
        "<rootDir>/src/layers/dependencies/nodejs/node_modules/"
    ]
}
