const lambda = require('../view.js');
const dynamodb = require('aws-sdk/clients/dynamodb');

describe('Test view secret', function () {
    let getSpy;

    beforeAll(() => {
        getSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'get');
    });

    afterAll(() => {
        getSpy.mockRestore();
    });

    it('should return 404 if the uri not exists', async () => {
        let event = {
            "pathParameters": {
                "uri": "foobar1"
            },
        }

        getSpy.mockReturnValue({
            promise: () => Promise.resolve({})
        });

        const result = await lambda.handler(event);

        const expectedResult = {
            statusCode: 404,
            headers: {
                'accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': '*'
            },
            body: JSON.stringify({
                errors: [
                    'The URI is not exist'
                ]
            })
        };

        expect(result).toEqual(expectedResult);
    })

    it('should return 204 if the uri is destroyed', async () => {
        let event = {
            "pathParameters": {
                "uri": "foobar1"
            },
        }

        getSpy.mockReturnValue({
            promise: () => Promise.resolve({
                Item: {
                    uri: 'foobar',
                    body: ''
                }
            })
        });

        const result = await lambda.handler(event);

        const expectedResult = {
            statusCode: 204,
            headers: {
                'accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': '*'
            },
            body: JSON.stringify({
                errors: [
                    'The secret is deleted'
                ]
            })
        };

        expect(result).toEqual(expectedResult);
    })

    it('should return 200 if the uri is valid', async () => {
        let event = {
            "pathParameters": {
                "uri": "foobar"
            },
        }

        getSpy.mockReturnValue({
            promise: () => Promise.resolve({
                Item: {
                    uri: 'foobar',
                    body: 'hello from secret world'
                }
            })
        });

        const result = await lambda.handler(event);

        const expectedResult = {
            statusCode: 200,
            headers: {
                'accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
                'Access-Control-Allow-Methods': '*'
            },
            body: JSON.stringify({
                body: 'hello from secret world'
            })
        };

        expect(result).toEqual(expectedResult);
    })
});
