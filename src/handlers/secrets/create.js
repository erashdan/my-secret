const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();
const secretTable = process.env.SECRET_TABLE;
const cuid = require('cuid');
const {toLowerCase} = require('/opt/utils');

exports.handler = async (event) => {
    event.headers = toLowerCase(event.headers)

    let body = JSON.parse(event.body)

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
