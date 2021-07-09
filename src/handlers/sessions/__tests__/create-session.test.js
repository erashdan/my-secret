const lambda = require('../create.js');
const dynamodb = require('aws-sdk/clients/dynamodb');

jest.mock('uuid', () => {
    const v4 = '17790668-df61-11eb-ba80-0242ac130004'
    return {v4: jest.fn(() => v4),};
});

describe('Test create session', function () {
    let putSpy;

    beforeAll(() => {
        putSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'put');
    });

    afterAll(() => {
        putSpy.mockRestore();
    });

    it('should able to store the session id', async () => {
        const returnedItem = {
            uid: '17790668-df61-11eb-ba80-0242ac130004',
        };

        putSpy.mockReturnValue({
            promise: () => Promise.resolve(returnedItem)
        });

        const event = {
            httpMethod: 'POST'
        };

        const result = await lambda.handler(event);
        const expectedResult = {
            statusCode: 200,
            body: JSON.stringify(returnedItem)
        };

        expect(result).toEqual(expectedResult);
    });
});
