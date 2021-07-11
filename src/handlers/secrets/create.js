const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();
const secretTable = process.env.SECRET_TABLE;
const cuid = require('cuid');
const {toLowerCase} = require('/opt/utils');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }

    event.headers = toLowerCase(event.headers)

    let body = JSON.parse(event.body)

    if (!event.headers['x-session-id']) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                errors: [{
                    key: 'x-session-id',
                    error: 'The session ID is missing.'
                }]
            })
        }
    }

    if (!body || !body.body) {
        return {
            statusCode: 422,
            body: JSON.stringify({
                errors: [{
                    key: 'body',
                    error: 'The body is required.'
                }]
            })
        }
    }

    const item = {
        uri: cuid(),
        body: body.body
    }

    await docClient.put({
        TableName: secretTable,
        Item: item
    }).promise();

    const response = {
        statusCode: 201,
        body: JSON.stringify(item)
    };

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);

    return response;
}
