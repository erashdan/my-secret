const lambda = require('../delete.js');
const dynamodb = require('aws-sdk/clients/dynamodb');

describe('Test delete secret', function () {
    let deleteSpy;

    beforeAll(() => {
        deleteSpy = jest.spyOn(dynamodb.DocumentClient.prototype, 'delete');
    });

    afterAll(() => {
        deleteSpy.mockRestore();
    });

    // it('should return 404 if the uri not exists', async () => {
    //     let event = {
    //         "pathParameters": {
    //             "uri": "foobar"
    //         },
    //     }
    //
    //     deleteSpy.mockReturnValue({
    //         promise: () => Promise.resolve({})
    //     });
    //
    //     const result = await lambda.handler(event);
    //
    //     const expectedResult = {
    //         statusCode: 404,
    //         body: JSON.stringify({
    //             errors: [{
    //                 key: 'uri',
    //                 error: 'The URI is not exist.'
    //             }]
    //         })
    //     };
    //
    //     expect(result).toEqual(expectedResult);
    // })

    it('should return 200 if the uri is deleted', async () => {
        let event = {
            "pathParameters": {
                "uri": "foobar"
            },
        }

        deleteSpy.mockReturnValue({
            promise: () => Promise.resolve({})
        });

        const result = await lambda.handler(event);

        const expectedResult = {
            statusCode: 200,
            body: JSON.stringify({
                status: true
            })
        };

        expect(result).toEqual(expectedResult);
    })
});
