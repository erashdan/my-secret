const lambda = require('../create.js');
const dynamodb = require('aws-sdk/clients/dynamodb');
jest.mock('cuid')
const cuid = require('cuid')

describe('Test create secret', function () {
    let putSpy;

    beforeAll(() => {
        putSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'put');
    });

    afterAll(() => {
        putSpy.mockRestore();
    });

    it('should return 422 if the body is empty', async () => {
        let event = {
            httpMethod: 'POST',
            headers: {'x-session-id': '12345-88823-231231'},
            body: JSON.stringify({})
        }

        const result = await lambda.handler(event);

        const expectedResult = {
            statusCode: 422,
            body: JSON.stringify({
                errors: [{
                    key: 'body',
                    error: 'The body is required.'
                }]
            })
        };

        expect(result).toEqual(expectedResult);
    })

    it('should return 400 if the x-session-id is empty', async () => {
        let event = {
            httpMethod: 'POST',
            headers: {},
            body: JSON.stringify({
                'body': 'My Secret !'
            })
        }

        const result = await lambda.handler(event);

        const expectedResult = {
            statusCode: 400,
            body: JSON.stringify({
                errors: [{
                    key: 'x-session-id',
                    error: 'The session ID is missing.'
                }]
            })
        };
        expect(result).toEqual(expectedResult);
    })

    it('should store the secret', async () => {
        let event = {
            httpMethod: 'POST',
            headers: {'x-session-id': '12345-88823-231231'},
            body: JSON.stringify({
                'body': 'My Secret !'
            })
        }

        cuid.mockImplementation(() => 'my-uri-test');
        putSpy.mockReturnValue({
            promise: () => Promise.resolve({})
        });

        const result = await lambda.handler(event);

        const expectedResult = {
            statusCode: 201,
            body: JSON.stringify({
                'uri': 'my-uri-test'
            })
        };
        expect(result).toEqual(expectedResult);
    });
});
