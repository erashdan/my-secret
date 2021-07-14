let response = {
    statusCode: 200,
    headers: {
        'accept': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*'
    },
    body: {},

    handle(body = null) {
        if (body !== null) {
            this.body = body
        }

        return {
            statusCode: this.statusCode,
            headers: this.headers,
            body: JSON.stringify(this.body)
        }
    },

    handleException(exception) {
        this.statusCode = exception.statusCode
        this.body = {
            errors: [
                exception.errorMessage
            ]
        }

        return this.handle()
    }
}

module.exports = response