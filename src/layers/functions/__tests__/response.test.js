const MockException = require('./MockException')
const response = require('../response');

describe('Test response object', function () {

    it('it should return 200 status code by default', async () => {
        response.init()

        let actualResponse = response.handle()

        const exceptedResponse = {
            statusCode: 200,
            headers: {
                'accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': '*'
            },
            body: JSON.stringify({})
        }

        expect(actualResponse).toEqual(exceptedResponse);
    })

    it('it can handle ResponseException', async () => {
        response.init()

        let actualResponse = {}

        try {
            throw new MockException()
        } catch (exception) {
            actualResponse = response.handleException(exception)
        }

        const exceptedResponse = {
            statusCode: 999,
            headers: {
                'accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': '*'
            },
            body: JSON.stringify({
                errors: [
                    'Ops there\'s an error'
                ]
            })
        }

        expect(actualResponse).toEqual(exceptedResponse);
    })

    it('should return a response with filled body', async () => {
        response.init()

        let actualResponse = response.handle({
            name: 'Emad Rashdan',
            telephone: '+123456789'
        })

        const exceptedResponse = {
            statusCode: 200,
            headers: {
                'accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': '*'
            },
            body: JSON.stringify({
                name: 'Emad Rashdan',
                telephone: '+123456789'
            })
        }

        expect(actualResponse).toEqual(exceptedResponse);
    })
});
