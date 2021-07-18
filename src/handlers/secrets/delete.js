const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();
const secretTable = process.env.SECRET_TABLE;

exports.handler = async (event) => {
    const tableQuery = {
        TableName: secretTable,
        Key: {uri: event.pathParameters.secret}
    };

    await docClient.delete(tableQuery).promise();

    return {
        statusCode: 200,
        body: JSON.stringify({
            status: true
        })
    };
}
