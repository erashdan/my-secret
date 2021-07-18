const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();
const secretTable = process.env.SECRET_TABLE;

exports.handler = async (event) => {
    const tableQuery = {
        TableName: secretTable,
        Key: {uri: event.pathParameters.secret}
    };

    const data = await docClient.get(tableQuery).promise();

    if (!data.Item) {
        return {
            statusCode: 404,
            body: JSON.stringify({
                errors: [{
                    key: 'uri',
                    error: 'The URI is not exist.'
                }]
            })
        }
    }

    const item = data.Item;

    if (item.body === '') {
        return {
            statusCode: 204,
            body: JSON.stringify({})
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            status: true
        })
    };
}
