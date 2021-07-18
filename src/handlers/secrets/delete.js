const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();
const secretTable = process.env.SECRET_TABLE;
const responseObject = require('/opt/response')

exports.handler = async (event) => {
    let response = {}
    Object.assign(response, responseObject)

    try {
        const tableQuery = {
            TableName: secretTable,
            Key: {uri: event.pathParameters.secret}
        };

        await docClient.delete(tableQuery).promise();

        return response.handle({
            status: true
        })
    } catch (exception) {
        return response.handleException(exception)
    }
}
